// seleniumData.js — Selenium WebDriver tam öğrenme sayfası
// Java + Python + TypeScript, 10 bölüm

// ─── S0: GİRİŞ ───────────────────────────────────────────────────────────────
const s0 = {
  tr: {
    title: '🟢 Selenium Nedir? Nasıl Çalışır?',
    blocks: [
      {
        type: 'simple-box', emoji: '🤖',
        content: 'Selenium\'u bir "robot asistan" olarak düşünün. Siz ona "şu butona tıkla, şu kutuya şunu yaz" diyorsunuz. O da gerçek bir insan gibi tarayıcıyı açıp bu işlemleri yapıyor. Tek fark: bu asistan hiç yorulmuyor, dakikada yüzlerce işlem yapıyor ve gece 3\'te bile çalışıyor.',
      },
      {
        type: 'text',
        content: 'Selenium, web tarayıcılarını programatik olarak kontrol etmek için kullanılan açık kaynaklı bir test otomasyon çerçevesidir. 2004\'te Jason Huggins tarafından geliştirilmiş, bugün dünya genelinde en yaygın kullanılan web otomasyon aracıdır. Java\'da RemoteWebDriver arayüzüyle çalışır; Python ve TypeScript\'te de aynı WebDriver konseptini kullanır.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Java\'da WebDriver driver = new ChromeDriver() yazıp driver.findElement(By.id("user")).sendKeys("admin") yapıyordun. Python\'da driver = webdriver.Chrome() ve driver.find_element(By.ID, "user").send_keys("admin") var. TypeScript\'te de aynı WebDriver API\'si, sadece JS/TS sözdizimi farklı.',
      },
      {
        type: 'heading', text: { tr: 'Selenium Bileşenleri', en: 'Selenium Components' },
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '🚗', label: 'WebDriver', desc: 'Tarayıcıyı doğrudan kontrol eden ana API. ChromeDriver, GeckoDriver, EdgeDriver gibi sürücülerle çalışır.' },
          { icon: '🌐', label: 'Selenium Grid', desc: 'Testleri paralel olarak birden fazla makine/tarayıcıda çalıştırmak için dağıtık altyapı.' },
          { icon: '🖥️', label: 'Selenium IDE', desc: 'Tarayıcı eklentisi; kayıt/oynatma özelliğiyle manuel test adımlarını otomatik kaydeder.' },
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Selenium WebDriver Çalışma Akışı',
        steps: [
          { num: 1, label: 'Test Kodu', desc: 'Java / Python / TS', highlight: true },
          { num: 2, label: 'WebDriver API', desc: 'Selenium Client' },
          { num: 3, label: 'Browser Driver', desc: 'ChromeDriver / GeckoDriver', highlight: true },
          { num: 4, label: 'Browser', desc: 'Chrome / Firefox / Edge' },
          { num: 5, label: 'Web Sayfası', desc: 'DOM & JavaScript', highlight: true },
        ],
      },
      {
        type: 'table',
        headers: ['Özellik', 'Selenium 3', 'Selenium 4'],
        rows: [
          ['Protocol', 'JSON Wire Protocol', 'W3C WebDriver (standart)'],
          ['Relative Locators', '❌', '✅ above(), below(), near()'],
          ['Chrome DevTools', '❌', '✅ CDP entegrasyonu'],
          ['Grid', 'Standalone/Hub/Node', 'Selenium Grid 4 (dağıtık)'],
          ['Yeni Pencere/Tab', 'Karmaşık', '✅ switchTo().newWindow()'],
          ['Screenshot', 'Yalnızca görünür alan', '✅ Full-page screenshot'],
          ['Firefox Profil', 'FirefoxProfile', '✅ FirefoxOptions'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Selenium 4\'te hangi protokol kullanılır?', en: 'Which protocol does Selenium 4 use?' },
        options: [
          { id: 'a', text: 'JSON Wire Protocol' },
          { id: 'b', text: 'W3C WebDriver Protocol' },
          { id: 'c', text: 'HTTP/2' },
          { id: 'd', text: 'WebSocket' },
        ],
        correct: 'b',
        explanation: { tr: 'Selenium 4, W3C WebDriver standart protokolüne geçmiştir. Selenium 3\'teki JSON Wire Protocol artık kullanılmamaktadır. Bu değişiklik, tüm tarayıcı sürücülerinin standart bir API\'yi takip etmesini sağlar.', en: 'Selenium 4 switched to the W3C WebDriver standard protocol. The JSON Wire Protocol used in Selenium 3 is no longer used. This change ensures all browser drivers follow a standard API.' },
      },
    ],
  },
  en: {
    title: '🟢 What is Selenium? How Does It Work?',
    blocks: [
      {
        type: 'simple-box', emoji: '🤖',
        content: 'Think of Selenium as a "robot assistant." You tell it "click this button, type this in that box." It opens the browser and does these things just like a human would. The difference: this assistant never gets tired, can do hundreds of actions per minute, and works at 3am without complaint.',
      },
      {
        type: 'text',
        content: 'Selenium is an open-source test automation framework for controlling web browsers programmatically. Created by Jason Huggins in 2004, it is the most widely used web automation tool worldwide. It works with the RemoteWebDriver interface in Java and uses the same WebDriver concept in Python and TypeScript.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In Java you wrote WebDriver driver = new ChromeDriver() and driver.findElement(By.id("user")).sendKeys("admin"). In Python it\'s driver = webdriver.Chrome() and driver.find_element(By.ID, "user").send_keys("admin"). In TypeScript the same WebDriver API applies, just different JS/TS syntax.',
      },
      {
        type: 'heading', text: 'Selenium Components',
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '🚗', label: 'WebDriver', desc: 'The core API that directly controls the browser. Works with ChromeDriver, GeckoDriver, EdgeDriver drivers.' },
          { icon: '🌐', label: 'Selenium Grid', desc: 'Distributed infrastructure for running tests in parallel across multiple machines/browsers.' },
          { icon: '🖥️', label: 'Selenium IDE', desc: 'Browser extension with record/playback feature that automatically records manual test steps.' },
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Selenium WebDriver Flow',
        steps: [
          { num: 1, label: 'Test Code', desc: 'Java / Python / TS', highlight: true },
          { num: 2, label: 'WebDriver API', desc: 'Selenium Client' },
          { num: 3, label: 'Browser Driver', desc: 'ChromeDriver / GeckoDriver', highlight: true },
          { num: 4, label: 'Browser', desc: 'Chrome / Firefox / Edge' },
          { num: 5, label: 'Web Page', desc: 'DOM & JavaScript', highlight: true },
        ],
      },
      {
        type: 'table',
        headers: ['Feature', 'Selenium 3', 'Selenium 4'],
        rows: [
          ['Protocol', 'JSON Wire Protocol', 'W3C WebDriver (standard)'],
          ['Relative Locators', '❌', '✅ above(), below(), near()'],
          ['Chrome DevTools', '❌', '✅ CDP integration'],
          ['Grid', 'Standalone/Hub/Node', 'Selenium Grid 4 (distributed)'],
          ['New Window/Tab', 'Complex', '✅ switchTo().newWindow()'],
          ['Screenshot', 'Visible area only', '✅ Full-page screenshot'],
          ['Firefox Profile', 'FirefoxProfile', '✅ FirefoxOptions'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Which protocol does Selenium 4 use?', en: 'Which protocol does Selenium 4 use?' },
        options: [
          { id: 'a', text: 'JSON Wire Protocol' },
          { id: 'b', text: 'W3C WebDriver Protocol' },
          { id: 'c', text: 'HTTP/2' },
          { id: 'd', text: 'WebSocket' },
        ],
        correct: 'b',
        explanation: { tr: 'Selenium 4 switched to the W3C WebDriver standard protocol. The JSON Wire Protocol from Selenium 3 is no longer used.', en: 'Selenium 4 switched to the W3C WebDriver standard protocol. The JSON Wire Protocol from Selenium 3 is no longer used.' },
      },
    ],
  },
}

// ─── S1: KURULUM ──────────────────────────────────────────────────────────────
const s1 = {
  tr: {
    title: '⚙️ Kurulum — Java, Python, TypeScript',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Kurulum şöyle: tarayıcın zaten var (Chrome). Sürücüyü (ChromeDriver) yüklemen gerekiyor — bu, Selenium\'un tarayıcıyla konuşmasını sağlayan çevirmen. Selenium 4\'te "Selenium Manager" bunu otomatik yapıyor.',
      },
      { type: 'heading', text: '1️⃣ Java ile Selenium Kurulumu' },
      {
        type: 'text',
        content: 'Maven veya Gradle projesi oluşturup pom.xml\'e bağımlılık ekliyoruz. Selenium 4.x\'te ChromeDriver otomatik yönetilir.',
      },
      {
        type: 'code', language: 'xml',
        label: 'pom.xml — Maven Bağımlılığı',
        code: `<!-- pom.xml -->
<dependencies>
  <!-- Selenium WebDriver -->
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.25.0</version>
  </dependency>
  <!-- TestNG (test runner) -->
  <dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.10.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
      },
      {
        type: 'code', language: 'java',
        label: 'Java — İlk Selenium Testi',
        code: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class FirstTest {
    public static void main(String[] args) {
        // Selenium 4: ChromeDriver otomatik indirilir
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");
        System.out.println("Başlık: " + driver.getTitle());
        driver.quit(); // Tarayıcıyı kapat
    }
}`,
        expected: 'Başlık: Google',
      },
      { type: 'heading', text: '2️⃣ Python ile Selenium Kurulumu' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Python Kurulum',
        code: `# Python yükle (eğer yoksa)
# Windows: winget install Python.Python.3
# Mac:     brew install python
# Linux:   sudo apt install python3 python3-pip

# Selenium kütüphanesini yükle
pip install selenium

# Doğrulama
python -c "import selenium; print(selenium.__version__)"`,
        expected: '4.25.0',
      },
      {
        type: 'code', language: 'python',
        label: 'Python — İlk Selenium Testi',
        code: `from selenium import webdriver
from selenium.webdriver.common.by import By

# Selenium 4: ChromeDriver otomatik indirilir (Selenium Manager)
driver = webdriver.Chrome()
driver.get("https://www.google.com")
print("Başlık:", driver.title)
driver.quit()  # Her zaman kapat!`,
        expected: 'Başlık: Google',
      },
      { type: 'heading', text: '3️⃣ TypeScript ile Selenium Kurulumu' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Node.js / TypeScript Kurulum',
        code: `# Node.js yükle (eğer yoksa)
# Windows: winget install OpenJS.NodeJS.LTS
# Mac:     brew install node
# Linux:   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash - && sudo apt install nodejs

# Proje oluştur
mkdir selenium-ts && cd selenium-ts
npm init -y

# Gerekli paketleri yükle
npm install selenium-webdriver
npm install --save-dev typescript @types/node @types/selenium-webdriver ts-node

# tsconfig.json oluştur
npx tsc --init`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — İlk Selenium Testi (first-test.ts)',
        code: `import { Builder, Browser, By } from 'selenium-webdriver';

async function main() {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .build();

  try {
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    console.log('Başlık:', title);
  } finally {
    await driver.quit(); // finally bloğunda her zaman kapat
  }
}

main();`,
        expected: 'Başlık: Google',
      },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — TypeScript testi çalıştır',
        code: `npx ts-node first-test.ts`,
      },
      { type: 'heading', text: '✅ Kurulum Doğrulama' },
      {
        type: 'visual', variant: 'flow', title: 'Kurulum Akışı',
        steps: [
          { num: 1, label: 'Chrome', desc: 'Tarayıcı kurulu', highlight: false },
          { num: 2, label: 'Selenium Pkg', desc: 'pip / maven / npm', highlight: true },
          { num: 3, label: 'Selenium Mgr', desc: 'ChromeDriver otomatik', highlight: false },
          { num: 4, label: 'İlk Test', desc: 'driver.get(url)', highlight: true },
          { num: 5, label: '✅ Hazır', desc: 'Tarayıcı açıldı', highlight: false },
        ],
      },
      {
        type: 'callout', color: 'green', emoji: '✅',
        title: 'Selenium Manager (Selenium 4.6+)',
        content: 'Selenium 4.6\'dan itibaren ChromeDriver, GeckoDriver gibi sürücüleri artık manuel indirmek gerekmiyor. Selenium Manager hangi Chrome sürümünüzün yüklü olduğunu tespit edip uyumlu ChromeDriver\'ı otomatik indiriyor.',
      },
      {
        type: 'callout', color: 'orange', emoji: '⚠️',
        title: 'Eski Yöntem — WebDriverManager (Java)',
        content: 'Selenium 4.6 öncesi projelerde io.github.bonigarcia:webdrivermanager kütüphanesi kullanılıyordu: WebDriverManager.chromedriver().setup(). Yeni projelerde buna gerek yok.',
      },
    ],
  },
  en: {
    title: '⚙️ Installation — Java, Python, TypeScript',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Installation is simple: you already have Chrome. You need the driver (ChromeDriver) — it\'s the translator that lets Selenium talk to the browser. In Selenium 4, "Selenium Manager" handles this automatically.',
      },
      { type: 'heading', text: '1️⃣ Java Selenium Setup' },
      {
        type: 'code', language: 'xml',
        label: 'pom.xml — Maven Dependency',
        code: `<!-- pom.xml -->
<dependencies>
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.25.0</version>
  </dependency>
  <dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.10.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
      },
      {
        type: 'code', language: 'java',
        label: 'Java — First Selenium Test',
        code: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class FirstTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver(); // Selenium 4: auto driver
        driver.get("https://www.google.com");
        System.out.println("Title: " + driver.getTitle());
        driver.quit();
    }
}`,
        expected: 'Title: Google',
      },
      { type: 'heading', text: '2️⃣ Python Selenium Setup' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Python Install',
        code: `pip install selenium
python -c "import selenium; print(selenium.__version__)"`,
        expected: '4.25.0',
      },
      {
        type: 'code', language: 'python',
        label: 'Python — First Selenium Test',
        code: `from selenium import webdriver

driver = webdriver.Chrome()  # Selenium Manager handles driver
driver.get("https://www.google.com")
print("Title:", driver.title)
driver.quit()`,
        expected: 'Title: Google',
      },
      { type: 'heading', text: '3️⃣ TypeScript Selenium Setup' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Node.js / TypeScript Install',
        code: `npm install selenium-webdriver
npm install --save-dev typescript @types/node @types/selenium-webdriver ts-node`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — First Selenium Test',
        code: `import { Builder, Browser } from 'selenium-webdriver';

async function main() {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('https://www.google.com');
    console.log('Title:', await driver.getTitle());
  } finally {
    await driver.quit();
  }
}
main();`,
        expected: 'Title: Google',
      },
    ],
  },
}

// ─── S2: LOCATORS ─────────────────────────────────────────────────────────────
const s2 = {
  tr: {
    title: '🎯 Locators — Element Bulma Stratejileri',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: 'Locator, sayfadaki bir elementi bulmak için kullandığınız "adres" gibidir. Tıpkı posta adresi gibi: "İstanbul, Kadıköy, Moda Caddesi No:5" — ne kadar spesifik olursa, o kadar doğru bulursunuz. Locator ne kadar özgün olursa, test o kadar güvenilir olur.',
      },
      { type: 'heading', text: 'Locator Türleri — Hızlı Karşılaştırma' },
      {
        type: 'table',
        headers: ['Locator', 'Kullanım', 'Hız', 'Güvenilirlik', 'Ne Zaman Kullan?'],
        rows: [
          ['By.ID', 'By.id("loginBtn")', '⚡⚡⚡', '⭐⭐⭐⭐⭐', 'ID benzersizse — her zaman ilk tercih'],
          ['By.NAME', 'By.name("username")', '⚡⚡⚡', '⭐⭐⭐⭐', 'Form input\'larında'],
          ['By.CSS_SELECTOR', 'By.cssSelector(".btn")', '⚡⚡⚡', '⭐⭐⭐⭐', 'Modern projelerde, XPath\'ten hızlı'],
          ['By.XPATH', 'By.xpath("//div[@id]")', '⚡⚡', '⭐⭐⭐', 'Diğerleri yetersiz kalınca'],
          ['By.CLASS_NAME', 'By.className("active")', '⚡⚡', '⭐⭐', 'Tek class, birden fazla elemente dikkat'],
          ['By.LINK_TEXT', 'By.linkText("Giriş Yap")', '⚡⚡', '⭐⭐⭐', 'Yalnızca &lt;a&gt; tagları için'],
          ['By.PARTIAL_LINK_TEXT', 'By.partialLinkText("Giriş")', '⚡⚡', '⭐⭐', 'Link metni dinamikse'],
          ['By.TAG_NAME', 'By.tagName("h1")', '⚡', '⭐', 'Çok nadir, genelde birden fazla eleman döner'],
        ],
      },
      { type: 'heading', text: '1. By.ID — En Güvenilir Locator' },
      {
        type: 'code', language: 'java',
        label: 'Java — By.ID',
        code: `// HTML: <input id="username" type="text" />
WebElement input = driver.findElement(By.id("username"));
input.sendKeys("admin");

// Selenium 4: $ kısayolu da kullanılabilir
WebElement btn = driver.findElement(By.id("loginBtn"));
btn.click();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — By.ID',
        code: `from selenium.webdriver.common.by import By

# HTML: <input id="username" type="text" />
input_el = driver.find_element(By.ID, "username")
input_el.send_keys("admin")

btn = driver.find_element(By.ID, "loginBtn")
btn.click()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — By.ID',
        code: `import { By } from 'selenium-webdriver';

// HTML: <input id="username" type="text" />
const input = await driver.findElement(By.id('username'));
await input.sendKeys('admin');

const btn = await driver.findElement(By.id('loginBtn'));
await btn.click();`,
      },
      { type: 'heading', text: '2. By.CSS_SELECTOR — Modern & Hızlı' },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'CSS Selector, JavaScript/CSS\'te de kullandığın sözdizimi: "#id", ".class", "tag[attr=val]". Java\'da By.cssSelector("..."), Python\'da By.CSS_SELECTOR, TypeScript\'te By.css("...") şeklinde kullanılır.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — CSS Selector Örnekleri',
        code: `// ID ile → #loginBtn
driver.findElement(By.cssSelector("#loginBtn")).click();

// Class ile → .submit-btn
driver.findElement(By.cssSelector(".submit-btn")).click();

// Attribute ile → input[type='email']
driver.findElement(By.cssSelector("input[type='email']")).sendKeys("test@test.com");

// Child selector → div.form > input
driver.findElement(By.cssSelector("div.form > input")).sendKeys("test");

// Nth-child → ul li:nth-child(2)
driver.findElement(By.cssSelector("ul li:nth-child(2)")).click();

// Başlangıç ile → a[href^='https']
driver.findElement(By.cssSelector("a[href^='https']")).click();

// İçerik ile → input[placeholder*='ara']
driver.findElement(By.cssSelector("input[placeholder*='ara']")).sendKeys("ürün");`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — CSS Selector',
        code: `# ID
driver.find_element(By.CSS_SELECTOR, "#loginBtn").click()

# Class
driver.find_element(By.CSS_SELECTOR, ".submit-btn").click()

# Attribute
driver.find_element(By.CSS_SELECTOR, "input[type='email']").send_keys("test@test.com")

# Nth child
driver.find_element(By.CSS_SELECTOR, "ul li:nth-child(2)").click()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — CSS Selector',
        code: `// ID
await (await driver.findElement(By.css('#loginBtn'))).click();

// Attribute
await (await driver.findElement(By.css("input[type='email']"))).sendKeys('test@test.com');

// Nth child
await (await driver.findElement(By.css('ul li:nth-child(2)'))).click();`,
      },
      { type: 'heading', text: '3. By.XPATH — En Güçlü Locator' },
      {
        type: 'callout', color: 'purple', emoji: '🔎',
        title: 'XPath Ne Zaman Kullanılır?',
        content: 'XPath, ID veya CSS ile bulamadığınız durumlarda, üst elementi bilerek alt elementi bulmak istediğinizde veya metin içeriğine göre eleman bulmak istediğinizde kullanılır. Ancak DOM değişikliklerine karşı kırılgan olabilir.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — XPath Örnekleri',
        code: `// Absolute XPath (KULLANMA — kırılgan!)
// /html/body/div[1]/form/input[2]

// Relative XPath (KULLAN)
// Attribute ile
driver.findElement(By.xpath("//input[@id='username']")).sendKeys("admin");
driver.findElement(By.xpath("//button[@type='submit']")).click();

// Metin ile (tam eşleşme)
driver.findElement(By.xpath("//button[text()='Giriş Yap']")).click();

// Metin içeriyorsa (contains)
driver.findElement(By.xpath("//button[contains(text(),'Giriş')]")).click();

// Attribute içeriyorsa
driver.findElement(By.xpath("//div[contains(@class,'active')]")).click();

// Üst-alt ilişki (parent → child)
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input")).sendKeys("test@test.com");

// Ancestor (alt → üst)
driver.findElement(By.xpath("//input[@id='search']/ancestor::form")).submit();

// Birden fazla koşul (AND)
driver.findElement(By.xpath("//input[@type='text' and @name='user']")).sendKeys("admin");`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — XPath',
        code: `# Attribute ile
driver.find_element(By.XPATH, "//input[@id='username']").send_keys("admin")

# Metin içeren
driver.find_element(By.XPATH, "//button[contains(text(),'Giriş')]").click()

# Following sibling
driver.find_element(By.XPATH, "//label[text()='Email']/following-sibling::input").send_keys("test@test.com")

# AND koşulu
driver.find_element(By.XPATH, "//input[@type='text' and @name='user']").send_keys("admin")`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — XPath',
        code: `// Attribute ile
await (await driver.findElement(By.xpath("//input[@id='username']"))).sendKeys('admin');

// Metin içeren
await (await driver.findElement(By.xpath("//button[contains(text(),'Login')]"))).click();

// Following sibling
const emailInput = await driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));
await emailInput.sendKeys('test@test.com');`,
      },
      { type: 'heading', text: '4. Selenium 4 — Relative Locators' },
      {
        type: 'callout', color: 'green', emoji: '✨',
        title: 'Selenium 4 Yeni Özellik!',
        content: 'Selenium 4 ile gelen relative locator\'lar, bir elementi diğerinin konumuna göre bulmanızı sağlar: above(), below(), toLeftOf(), toRightOf(), near(). Dinamik DOM\'da çok işe yarar.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Selenium 4 Relative Locators',
        code: `import static org.openqa.selenium.support.locators.RelativeLocator.*;

// "Email" label'ının altındaki ilk input
WebElement emailInput = driver.findElement(
    with(By.tagName("input")).below(By.id("emailLabel"))
);

// Submit butonunun solundaki iptal butonu
WebElement cancelBtn = driver.findElement(
    with(By.tagName("button")).toLeftOf(By.id("submitBtn"))
);

// "Ad" input'una 50px yakın herhangi bir element
WebElement nearby = driver.findElement(
    with(By.tagName("input")).near(By.id("nameInput"))
);`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Relative Locators',
        code: `from selenium.webdriver.support.relative_locator import locate_with

# "Email" label'ının altındaki input
email_input = driver.find_element(
    locate_with(By.TAG_NAME, "input").below({By.ID: "emailLabel"})
)

# Submit butonunun solundaki buton
cancel_btn = driver.find_element(
    locate_with(By.TAG_NAME, "button").to_left_of({By.ID: "submitBtn"})
)`,
      },
      { type: 'heading', text: '5. findElements — Birden Fazla Element' },
      {
        type: 'code', language: 'java',
        label: 'Java — findElements (liste döndürür)',
        code: `// Tüm <li> elementlerini bul
List<WebElement> listItems = driver.findElements(By.tagName("li"));
System.out.println("Toplam item: " + listItems.size());

// Her birini yazdır
for (WebElement item : listItems) {
    System.out.println(item.getText());
}

// Tüm linkler
List<WebElement> links = driver.findElements(By.tagName("a"));
for (WebElement link : links) {
    System.out.println(link.getAttribute("href"));
}`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — find_elements',
        code: `# Tüm li elementleri
items = driver.find_elements(By.TAG_NAME, "li")
print(f"Toplam: {len(items)}")

for item in items:
    print(item.text)

# Tüm linkler
links = driver.find_elements(By.TAG_NAME, "a")
for link in links:
    print(link.get_attribute("href"))`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — findElements',
        code: `// Tüm li elementleri
const items = await driver.findElements(By.tagName('li'));
console.log('Toplam:', items.length);

for (const item of items) {
  console.log(await item.getText());
}

// Tüm linkler
const links = await driver.findElements(By.tagName('a'));
for (const link of links) {
  console.log(await link.getAttribute('href'));
}`,
      },
      {
        type: 'quiz',
        question: { tr: 'Aşağıdaki locator türlerinden hangisi en hızlı ve güvenilirdir?', en: 'Which locator type is the fastest and most reliable?' },
        options: [
          { id: 'a', text: 'By.XPATH — //div[contains(@class,"btn")]' },
          { id: 'b', text: 'By.ID — id="loginBtn"' },
          { id: 'c', text: 'By.TAG_NAME — tagName("button")' },
          { id: 'd', text: 'By.CLASS_NAME — className("active")' },
        ],
        correct: 'b',
        explanation: { tr: 'By.ID en hızlı ve en güvenilir locator\'dır çünkü ID sayfa içinde benzersiz olmalıdır (HTML standardı) ve tarayıcılar ID aramasını O(1) ile yapar. XPath ise en yavaş ve kırılgandır.', en: 'By.ID is the fastest and most reliable locator because IDs should be unique within a page (HTML standard) and browsers perform ID lookups in O(1). XPath is the slowest and most brittle.' },
      },
    ],
  },
  en: {
    title: '🎯 Locators — Element Finding Strategies',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: 'A locator is like an "address" for finding an element on the page. Just like a postal address: the more specific it is, the more accurately you find what you\'re looking for. The more unique a locator, the more reliable the test.',
      },
      { type: 'heading', text: 'Locator Types — Quick Comparison' },
      {
        type: 'table',
        headers: ['Locator', 'Usage', 'Speed', 'Reliability', 'When to Use?'],
        rows: [
          ['By.ID', 'By.id("loginBtn")', '⚡⚡⚡', '⭐⭐⭐⭐⭐', 'If ID is unique — always first choice'],
          ['By.NAME', 'By.name("username")', '⚡⚡⚡', '⭐⭐⭐⭐', 'For form inputs'],
          ['By.CSS_SELECTOR', 'By.cssSelector(".btn")', '⚡⚡⚡', '⭐⭐⭐⭐', 'Modern projects, faster than XPath'],
          ['By.XPATH', 'By.xpath("//div[@id]")', '⚡⚡', '⭐⭐⭐', 'When other strategies are insufficient'],
          ['By.CLASS_NAME', 'By.className("active")', '⚡⚡', '⭐⭐', 'Single class; beware of multiple matches'],
          ['By.LINK_TEXT', 'By.linkText("Login")', '⚡⚡', '⭐⭐⭐', 'Only for &lt;a&gt; tags'],
          ['By.PARTIAL_LINK_TEXT', 'By.partialLinkText("Log")', '⚡⚡', '⭐⭐', 'When link text is dynamic'],
          ['By.TAG_NAME', 'By.tagName("h1")', '⚡', '⭐', 'Rarely; usually returns multiple elements'],
        ],
      },
      { type: 'heading', text: '1. By.ID — Most Reliable Locator' },
      {
        type: 'code', language: 'java',
        label: 'Java — By.ID',
        code: `// HTML: <input id="username" type="text" />
WebElement input = driver.findElement(By.id("username"));
input.sendKeys("admin");

WebElement btn = driver.findElement(By.id("loginBtn"));
btn.click();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — By.ID',
        code: `from selenium.webdriver.common.by import By

input_el = driver.find_element(By.ID, "username")
input_el.send_keys("admin")

btn = driver.find_element(By.ID, "loginBtn")
btn.click()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — By.ID',
        code: `import { By } from 'selenium-webdriver';

const input = await driver.findElement(By.id('username'));
await input.sendKeys('admin');

const btn = await driver.findElement(By.id('loginBtn'));
await btn.click();`,
      },
      { type: 'heading', text: '2. By.CSS_SELECTOR — Modern & Fast' },
      {
        type: 'code', language: 'java',
        label: 'Java — CSS Selector Examples',
        code: `driver.findElement(By.cssSelector("#loginBtn")).click();           // ID
driver.findElement(By.cssSelector(".submit-btn")).click();         // Class
driver.findElement(By.cssSelector("input[type='email']")).sendKeys("test@test.com"); // Attr
driver.findElement(By.cssSelector("ul li:nth-child(2)")).click(); // Nth child
driver.findElement(By.cssSelector("a[href^='https']")).click();   // Starts with
driver.findElement(By.cssSelector("input[placeholder*='search']")).sendKeys("query"); // Contains`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — CSS Selector',
        code: `driver.find_element(By.CSS_SELECTOR, "#loginBtn").click()
driver.find_element(By.CSS_SELECTOR, ".submit-btn").click()
driver.find_element(By.CSS_SELECTOR, "input[type='email']").send_keys("test@test.com")
driver.find_element(By.CSS_SELECTOR, "ul li:nth-child(2)").click()`,
      },
      { type: 'heading', text: '3. By.XPATH — Most Powerful' },
      {
        type: 'code', language: 'java',
        label: 'Java — XPath Examples',
        code: `// Attribute
driver.findElement(By.xpath("//input[@id='username']")).sendKeys("admin");

// Exact text match
driver.findElement(By.xpath("//button[text()='Login']")).click();

// Contains text
driver.findElement(By.xpath("//button[contains(text(),'Log')]")).click();

// Contains attribute
driver.findElement(By.xpath("//div[contains(@class,'active')]")).click();

// Following sibling
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input")).sendKeys("test@test.com");

// AND condition
driver.findElement(By.xpath("//input[@type='text' and @name='user']")).sendKeys("admin");`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — XPath',
        code: `driver.find_element(By.XPATH, "//input[@id='username']").send_keys("admin")
driver.find_element(By.XPATH, "//button[contains(text(),'Login')]").click()
driver.find_element(By.XPATH, "//label[text()='Email']/following-sibling::input").send_keys("test@test.com")`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — XPath',
        code: `await (await driver.findElement(By.xpath("//input[@id='username']"))).sendKeys('admin');
await (await driver.findElement(By.xpath("//button[contains(text(),'Login')]"))).click();`,
      },
      {
        type: 'quiz',
        question: { en: 'Which locator type is the fastest and most reliable?', tr: 'Which locator type is the fastest and most reliable?' },
        options: [
          { id: 'a', text: 'By.XPATH — //div[contains(@class,"btn")]' },
          { id: 'b', text: 'By.ID — id="loginBtn"' },
          { id: 'c', text: 'By.TAG_NAME — tagName("button")' },
          { id: 'd', text: 'By.CLASS_NAME — className("active")' },
        ],
        correct: 'b',
        explanation: { en: 'By.ID is the fastest and most reliable because IDs should be unique in a page and browsers perform ID lookups in O(1). XPath is the slowest and most brittle.', tr: 'By.ID en hızlı ve güvenilirdir çünkü ID benzersiz olmalı ve tarayıcı O(1) ile arar.' },
      },
    ],
  },
}

// ─── S3: ACTIONS ─────────────────────────────────────────────────────────────
const s3 = {
  tr: {
    title: '⚡ Aksiyonlar — Tüm Kullanıcı Eylemleri',
    blocks: [
      {
        type: 'simple-box', emoji: '🕹️',
        content: 'Aksiyonlar, tarayıcıda bir kullanıcının yapabileceği her şeydir: tıklama, yazma, kaydırma, sürükleme, sağ tık. Selenium bu eylemlerin tamamını kod ile yapabilir — aynı bir insan gibi ama çok daha hızlı.',
      },
      { type: 'heading', text: '1. Temel Aksiyonlar (Click, Type, Clear, Submit)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Temel Aksiyonlar',
        code: `WebDriver driver = new ChromeDriver();
driver.get("https://example.com/login");

WebElement username = driver.findElement(By.id("username"));
WebElement password = driver.findElement(By.id("password"));
WebElement loginBtn  = driver.findElement(By.id("loginBtn"));

// 1. Metin yaz
username.sendKeys("admin");
password.sendKeys("secret123");

// 2. Tıkla
loginBtn.click();

// 3. Metni temizle ve yeniden yaz
username.clear();
username.sendKeys("newuser");

// 4. Form submit (Enter gibi)
username.submit();

// 5. Element metni oku
String text = driver.findElement(By.id("welcome")).getText();
System.out.println(text); // "Hoş geldiniz, admin!"

// 6. Attribute oku
String href = driver.findElement(By.id("homeLink")).getAttribute("href");
System.out.println(href); // "https://example.com/"

// 7. CSS property oku
String color = driver.findElement(By.id("title")).getCssValue("color");

// 8. Element görünür mü?
boolean visible = driver.findElement(By.id("loader")).isDisplayed();
boolean enabled = driver.findElement(By.id("submitBtn")).isEnabled();
boolean selected = driver.findElement(By.id("rememberMe")).isSelected();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Temel Aksiyonlar',
        code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/login")

username = driver.find_element(By.ID, "username")
password = driver.find_element(By.ID, "password")
login_btn = driver.find_element(By.ID, "loginBtn")

# Metin yaz
username.send_keys("admin")
password.send_keys("secret123")

# Tıkla
login_btn.click()

# Temizle ve yeniden yaz
username.clear()
username.send_keys("newuser")

# Metin oku
text = driver.find_element(By.ID, "welcome").text
print(text)  # "Hoş geldiniz, admin!"

# Attribute oku
href = driver.find_element(By.ID, "homeLink").get_attribute("href")

# Görünürlük kontrol
visible = driver.find_element(By.ID, "loader").is_displayed()
enabled = driver.find_element(By.ID, "submitBtn").is_enabled()
selected = driver.find_element(By.ID, "rememberMe").is_selected()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Temel Aksiyonlar',
        code: `import { Builder, Browser, By } from 'selenium-webdriver';

const driver = await new Builder().forBrowser(Browser.CHROME).build();
await driver.get('https://example.com/login');

const username = await driver.findElement(By.id('username'));
const password = await driver.findElement(By.id('password'));
const loginBtn  = await driver.findElement(By.id('loginBtn'));

// Metin yaz & tıkla
await username.sendKeys('admin');
await password.sendKeys('secret123');
await loginBtn.click();

// Temizle & yeniden yaz
await username.clear();
await username.sendKeys('newuser');

// Metin oku
const text = await driver.findElement(By.id('welcome')).then(e => e.getText());
console.log(text);

// Attribute oku
const href = await (await driver.findElement(By.id('homeLink'))).getAttribute('href');

// Görünürlük
const visible = await (await driver.findElement(By.id('loader'))).isDisplayed();
const enabled = await (await driver.findElement(By.id('submitBtn'))).isEnabled();`,
      },
      { type: 'heading', text: '2. Klavye Aksiyonları (Keys)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Klavye Tuşları',
        code: `import org.openqa.selenium.Keys;

WebElement searchBox = driver.findElement(By.id("search"));

// Enter tuşu
searchBox.sendKeys("Selenium", Keys.ENTER);

// Tab tuşu (bir sonraki alana geç)
driver.findElement(By.id("username")).sendKeys("admin", Keys.TAB);

// Ctrl+A (tümünü seç) + Delete
searchBox.sendKeys(Keys.CONTROL + "a");
searchBox.sendKeys(Keys.DELETE);

// Ctrl+C / Ctrl+V
searchBox.sendKeys(Keys.CONTROL + "c"); // Kopyala
driver.findElement(By.id("target")).sendKeys(Keys.CONTROL + "v"); // Yapıştır

// Escape tuşu
driver.findElement(By.id("modal")).sendKeys(Keys.ESCAPE);

// F5 (sayfa yenile)
driver.findElement(By.tagName("body")).sendKeys(Keys.F5);

// Aşağı ok (dropdown için)
driver.findElement(By.id("dropdown")).sendKeys(Keys.ARROW_DOWN);
driver.findElement(By.id("dropdown")).sendKeys(Keys.ARROW_DOWN);
driver.findElement(By.id("dropdown")).sendKeys(Keys.ENTER);`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Klavye Tuşları',
        code: `from selenium.webdriver.common.keys import Keys

search = driver.find_element(By.ID, "search")

# Enter
search.send_keys("Selenium", Keys.ENTER)

# Tab
driver.find_element(By.ID, "username").send_keys("admin", Keys.TAB)

# Ctrl+A + Delete
search.send_keys(Keys.CONTROL + "a")
search.send_keys(Keys.DELETE)

# Escape
driver.find_element(By.ID, "modal").send_keys(Keys.ESCAPE)`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Klavye Tuşları',
        code: `import { Key } from 'selenium-webdriver';

const search = await driver.findElement(By.id('search'));

// Enter
await search.sendKeys('Selenium', Key.RETURN);

// Tab
await (await driver.findElement(By.id('username'))).sendKeys('admin', Key.TAB);

// Ctrl+A + Delete
await search.sendKeys(Key.chord(Key.CONTROL, 'a'));
await search.sendKeys(Key.DELETE);`,
      },
      { type: 'heading', text: '3. Actions API — Fare & Gelişmiş Aksiyonlar' },
      {
        type: 'callout', color: 'purple', emoji: '🖱️',
        title: 'Actions API Nedir?',
        content: 'Basit click() ile yapılamayan işlemler için Actions API kullanılır: hover (fare üstüne getirme), sağ tık, çift tık, drag & drop, fare hareketi. Java\'da Actions sınıfı, Python\'da ActionChains, TypeScript\'te actions() kullanılır.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Actions API',
        code: `import org.openqa.selenium.interactions.Actions;

Actions actions = new Actions(driver);

// 1. Hover (Fare üstüne getir)
WebElement menu = driver.findElement(By.id("navMenu"));
actions.moveToElement(menu).perform();

// 2. Çift tıklama
WebElement item = driver.findElement(By.id("editableCell"));
actions.doubleClick(item).perform();

// 3. Sağ tıklama (Context Menu)
WebElement file = driver.findElement(By.id("fileItem"));
actions.contextClick(file).perform();

// 4. Drag & Drop
WebElement source = driver.findElement(By.id("dragSource"));
WebElement target = driver.findElement(By.id("dropTarget"));
actions.dragAndDrop(source, target).perform();

// 5. Koordinat ile sürükle
actions.dragAndDropBy(source, 200, 0).perform(); // 200px sağa

// 6. Zincir (birden fazla aksiyon)
actions.moveToElement(menu)
       .click()
       .sendKeys("metin")
       .build()
       .perform();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — ActionChains',
        code: `from selenium.webdriver.common.action_chains import ActionChains

actions = ActionChains(driver)

# Hover
menu = driver.find_element(By.ID, "navMenu")
actions.move_to_element(menu).perform()

# Çift tıklama
item = driver.find_element(By.ID, "editableCell")
actions.double_click(item).perform()

# Sağ tıklama
file_el = driver.find_element(By.ID, "fileItem")
actions.context_click(file_el).perform()

# Drag & Drop
source = driver.find_element(By.ID, "dragSource")
target = driver.find_element(By.ID, "dropTarget")
actions.drag_and_drop(source, target).perform()

# Zincir
actions.move_to_element(menu) \
       .click() \
       .send_keys("metin") \
       .perform()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Actions',
        code: `const actions = driver.actions({ async: true });

const menu = await driver.findElement(By.id('navMenu'));

// Hover
await actions.move({ origin: menu }).perform();

// Çift tıklama
const item = await driver.findElement(By.id('editableCell'));
await actions.doubleClick(item).perform();

// Sağ tıklama
const file = await driver.findElement(By.id('fileItem'));
await actions.contextClick(file).perform();

// Drag & Drop
const source = await driver.findElement(By.id('dragSource'));
const target = await driver.findElement(By.id('dropTarget'));
await actions.dragAndDrop(source, target).perform();`,
      },
      { type: 'heading', text: '4. JavaScript Executor' },
      {
        type: 'code', language: 'java',
        label: 'Java — JavascriptExecutor',
        code: `import org.openqa.selenium.JavascriptExecutor;

JavascriptExecutor js = (JavascriptExecutor) driver;

// Sayfayı aşağı kaydır
js.executeScript("window.scrollBy(0, 500);");

// En aşağı git
js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

// Element'e kaydır
WebElement el = driver.findElement(By.id("footer"));
js.executeScript("arguments[0].scrollIntoView(true);", el);

// Gizli elemente tıkla (görünür olmayan)
WebElement hidden = driver.findElement(By.id("hiddenBtn"));
js.executeScript("arguments[0].click();", hidden);

// Değer ata (sendKeys çalışmıyorsa)
WebElement input = driver.findElement(By.id("datepicker"));
js.executeScript("arguments[0].value='2024-01-15';", input);

// Sayfa başlığını oku
String title = (String) js.executeScript("return document.title;");`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — JavaScript Execute',
        code: `# Aşağı kaydır
driver.execute_script("window.scrollBy(0, 500);")

# En aşağı git
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

# Element'e kaydır
el = driver.find_element(By.ID, "footer")
driver.execute_script("arguments[0].scrollIntoView(true);", el)

# Gizli elemente tıkla
hidden = driver.find_element(By.ID, "hiddenBtn")
driver.execute_script("arguments[0].click();", hidden)

# Değer ata
input_el = driver.find_element(By.ID, "datepicker")
driver.execute_script("arguments[0].value='2024-01-15';", input_el)`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — JavaScript Execute',
        code: `// Aşağı kaydır
await driver.executeScript('window.scrollBy(0, 500);');

// En aşağı git
await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');

// Element'e kaydır
const el = await driver.findElement(By.id('footer'));
await driver.executeScript('arguments[0].scrollIntoView(true);', el);

// Gizli eleme tıkla
const hidden = await driver.findElement(By.id('hiddenBtn'));
await driver.executeScript('arguments[0].click();', hidden);`,
      },
      { type: 'heading', text: '5. Select Dropdown (Açılır Liste)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Select Dropdown',
        code: `import org.openqa.selenium.support.ui.Select;

WebElement dropdown = driver.findElement(By.id("country"));
Select select = new Select(dropdown);

// Görünen metin ile seç
select.selectByVisibleText("Türkiye");

// Value attribute ile seç
select.selectByValue("TR");

// Index ile seç (0'dan başlar)
select.selectByIndex(2);

// Seçili option'ı oku
String selected = select.getFirstSelectedOption().getText();
System.out.println("Seçili: " + selected);

// Tüm seçenekleri listele
List<WebElement> options = select.getOptions();
for (WebElement opt : options) {
    System.out.println(opt.getText());
}

// Çoklu seçim (multiple select için)
select.selectByVisibleText("İstanbul");
select.selectByVisibleText("Ankara");`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Select Dropdown',
        code: `from selenium.webdriver.support.ui import Select

dropdown = driver.find_element(By.ID, "country")
select = Select(dropdown)

# Metin ile seç
select.select_by_visible_text("Türkiye")

# Value ile seç
select.select_by_value("TR")

# Index ile seç
select.select_by_index(2)

# Seçili option
selected = select.first_selected_option.text
print(f"Seçili: {selected}")

# Tüm seçenekler
for opt in select.options:
    print(opt.text)`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Select Dropdown',
        code: `// TypeScript'te Select helper yok; JS kullanırız
const dropdown = await driver.findElement(By.id('country'));

// Value ile seç
await dropdown.sendKeys('Türkiye');

// Veya JS ile
await driver.executeScript(
  "arguments[0].value = arguments[1];",
  dropdown, "TR"
);

// Tüm options
const options = await driver.findElements(By.css('#country option'));
for (const opt of options) {
  console.log(await opt.getText());
}`,
      },
      { type: 'heading', text: '6. Tarayıcı Navigasyonu' },
      {
        type: 'code', language: 'java',
        label: 'Java — Navigasyon',
        code: `// URL'ye git
driver.get("https://example.com");
driver.navigate().to("https://example.com/login");

// Geri & İleri
driver.navigate().back();
driver.navigate().forward();

// Sayfayı yenile
driver.navigate().refresh();

// Pencereyi büyüt/küçüt
driver.manage().window().maximize();
driver.manage().window().minimize();
driver.manage().window().fullscreen();

// Özel boyut
driver.manage().window().setSize(new Dimension(1280, 800));

// Başlık & URL
System.out.println(driver.getTitle());
System.out.println(driver.getCurrentUrl());

// Sayfa kaynağı
String source = driver.getPageSource();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Navigasyon',
        code: `# URL'ye git
driver.get("https://example.com")

# Geri & İleri
driver.back()
driver.forward()

# Yenile
driver.refresh()

# Tam ekran
driver.maximize_window()
driver.minimize_window()

# Özel boyut
driver.set_window_size(1280, 800)

# Başlık & URL
print(driver.title)
print(driver.current_url)`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Navigasyon',
        code: `await driver.get('https://example.com');
await driver.navigate().back();
await driver.navigate().forward();
await driver.navigate().refresh();

await driver.manage().window().maximize();
await driver.manage().window().setSize(1280, 800);

console.log(await driver.getTitle());
console.log(await driver.getCurrentUrl());`,
      },
      { type: 'heading', text: '7. Screenshot Alma' },
      {
        type: 'code', language: 'java',
        label: 'Java — Screenshot',
        code: `import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import java.io.File;
import org.apache.commons.io.FileUtils;

// Tam sayfa ekran görüntüsü
File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(screenshot, new File("screenshot.png"));

// Element screenshot
WebElement element = driver.findElement(By.id("chart"));
File elemShot = element.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(elemShot, new File("element.png"));

// Base64 olarak (CI/CD için)
String base64 = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Screenshot',
        code: `# Tam sayfa
driver.save_screenshot("screenshot.png")

# Ya da:
from selenium.webdriver.common.by import By
screenshot = driver.get_screenshot_as_file("screenshot.png")

# Element screenshot
element = driver.find_element(By.ID, "chart")
element.screenshot("element.png")

# Base64
base64_str = driver.get_screenshot_as_base64()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Screenshot',
        code: `import * as fs from 'fs';

// Base64'ten dosyaya kaydet
const img = await driver.takeScreenshot();
fs.writeFileSync('screenshot.png', img, 'base64');

// Element screenshot
const element = await driver.findElement(By.id('chart'));
const elemImg = await element.takeScreenshot();
fs.writeFileSync('element.png', elemImg, 'base64');`,
      },
      {
        type: 'quiz',
        question: { tr: 'Bir sayfa üzerinde hover (fare üstüne getirme) işlemi için hangi sınıf kullanılır (Java)?', en: 'Which class is used for hover (mouse over) operations in Java Selenium?' },
        options: [
          { id: 'a', text: 'WebElement.hover()' },
          { id: 'b', text: 'Actions (org.openqa.selenium.interactions.Actions)' },
          { id: 'c', text: 'JavascriptExecutor' },
          { id: 'd', text: 'Select sınıfı' },
        ],
        correct: 'b',
        explanation: { tr: 'Hover için Actions sınıfı kullanılır: new Actions(driver).moveToElement(element).perform(). Python\'da ActionChains, TypeScript\'te driver.actions() kullanılır. WebElement\'in doğrudan hover() metodu yoktur.', en: 'The Actions class is used for hover: new Actions(driver).moveToElement(element).perform(). Python uses ActionChains, TypeScript uses driver.actions(). WebElement has no direct hover() method.' },
      },
    ],
  },
  en: {
    title: '⚡ Actions — All User Interactions',
    blocks: [
      {
        type: 'simple-box', emoji: '🕹️',
        content: 'Actions are everything a user can do in a browser: clicking, typing, scrolling, dragging, right-clicking. Selenium can do all of these with code — just like a human but much faster.',
      },
      { type: 'heading', text: '1. Basic Actions (Click, Type, Clear, Submit)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Basic Actions',
        code: `WebElement username = driver.findElement(By.id("username"));
username.sendKeys("admin");        // Type
username.clear();                  // Clear
username.submit();                 // Submit form

String text = driver.findElement(By.id("msg")).getText();
String attr = driver.findElement(By.id("link")).getAttribute("href");
boolean visible = username.isDisplayed();
boolean enabled = username.isEnabled();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Basic Actions',
        code: `username = driver.find_element(By.ID, "username")
username.send_keys("admin")    # Type
username.clear()               # Clear
username.submit()              # Submit

text = driver.find_element(By.ID, "msg").text
attr = driver.find_element(By.ID, "link").get_attribute("href")
visible = username.is_displayed()`,
      },
      { type: 'heading', text: '2. Keyboard Actions (Keys)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Keyboard Keys',
        code: `import org.openqa.selenium.Keys;
searchBox.sendKeys("Selenium", Keys.ENTER);
driver.findElement(By.id("user")).sendKeys("admin", Keys.TAB);
searchBox.sendKeys(Keys.CONTROL + "a");  // Select all
searchBox.sendKeys(Keys.DELETE);          // Delete`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Keyboard Keys',
        code: `from selenium.webdriver.common.keys import Keys
search.send_keys("Selenium", Keys.ENTER)
driver.find_element(By.ID, "user").send_keys("admin", Keys.TAB)
search.send_keys(Keys.CONTROL + "a")
search.send_keys(Keys.DELETE)`,
      },
      { type: 'heading', text: '3. Actions API — Mouse & Advanced' },
      {
        type: 'code', language: 'java',
        label: 'Java — Actions API',
        code: `Actions actions = new Actions(driver);
actions.moveToElement(menu).perform();           // Hover
actions.doubleClick(item).perform();             // Double click
actions.contextClick(file).perform();            // Right click
actions.dragAndDrop(source, target).perform();   // Drag & Drop
actions.dragAndDropBy(source, 200, 0).perform(); // Drag by offset`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — ActionChains',
        code: `from selenium.webdriver.common.action_chains import ActionChains
actions = ActionChains(driver)
actions.move_to_element(menu).perform()         # Hover
actions.double_click(item).perform()            # Double click
actions.context_click(file_el).perform()        # Right click
actions.drag_and_drop(source, target).perform() # Drag & Drop`,
      },
      { type: 'heading', text: '4. JavaScript Executor' },
      {
        type: 'code', language: 'java',
        label: 'Java — JavascriptExecutor',
        code: `JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("window.scrollBy(0, 500);");
js.executeScript("arguments[0].scrollIntoView(true);", element);
js.executeScript("arguments[0].click();", hiddenElement);
js.executeScript("arguments[0].value='2024-01-15';", dateInput);`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — execute_script',
        code: `driver.execute_script("window.scrollBy(0, 500);")
driver.execute_script("arguments[0].scrollIntoView(true);", el)
driver.execute_script("arguments[0].click();", hidden)`,
      },
      { type: 'heading', text: '5. Select Dropdown' },
      {
        type: 'code', language: 'java',
        label: 'Java — Select',
        code: `Select select = new Select(driver.findElement(By.id("country")));
select.selectByVisibleText("Turkey");
select.selectByValue("TR");
select.selectByIndex(2);
String selected = select.getFirstSelectedOption().getText();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Select',
        code: `from selenium.webdriver.support.ui import Select
select = Select(driver.find_element(By.ID, "country"))
select.select_by_visible_text("Turkey")
select.select_by_value("TR")
select.select_by_index(2)`,
      },
    ],
  },
}

// ─── S4: WAIT STRATEJİLERİ ────────────────────────────────────────────────────
const s4 = {
  tr: {
    title: '⏳ Wait Stratejileri — Bekleme Yöntemleri',
    blocks: [
      {
        type: 'simple-box', emoji: '⏰',
        content: 'Web sayfaları an anda yüklenmez — sunucudan veri gelir, JavaScript çalışır, animasyonlar biter. "Wait" stratejisi, Selenium\'un sabırsızca hata vermesi yerine sabırla beklemesidir. Tıpkı bir kırmızı ışıkta bekleyip yeşile geçince geçen araba gibi.',
      },
      { type: 'heading', text: 'Wait Türleri Karşılaştırma' },
      {
        type: 'table',
        headers: ['Tür', 'Nasıl Çalışır?', 'Ne Zaman Kullanılır?', 'Tavsiye'],
        rows: [
          ['Thread.sleep()', 'Sabit süre bekler', 'Hiçbir zaman!', '❌ KULLANMA'],
          ['Implicit Wait', 'Tüm findElement için global timeout', 'Basit projelerde geçici çözüm', '⚠️ Dikkatli kullan'],
          ['Explicit Wait', 'Belirli bir koşul sağlanana kadar bekler', 'Production testlerinde', '✅ EN İYİ YOL'],
          ['Fluent Wait', 'Explicit wait + polling interval + ignore exceptions', 'Karmaşık async senaryolarda', '✅ İleri seviye'],
        ],
      },
      {
        type: 'simulation',
        icon: '⏳',
        color: '#7c3aed',
        title: { tr: 'Implicit Wait — Canlı Demo', en: 'Implicit Wait — Live Demo' },
        scenario: 'implicit-wait',
        description: {
          tr: 'Sol tarafta "Element Bul" butonlarına tıklayarak Implicit Wait\'in etkisini canlı görün. Sağda zaman çizelgesi gerçek zamanlı güncellenir.',
          en: 'Click the "Find Element" buttons on the left to see Implicit Wait in action. The timeline on the right updates in real time.',
        },
        code: `// Java — Implicit Wait kurulumu
WebDriver driver = new ChromeDriver();

// Bir kez ayarla, tüm findElement için geçerli
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

driver.get("https://example.com");

// Bu satır, element yoksa 10sn ye kadar bekler; sonra hata verir
WebElement btn = driver.findElement(By.id("submitBtn")); // 0-10s bekler
btn.click();

// Python eşdeğeri:
// driver.implicitly_wait(10)
// driver.find_element(By.ID, "submitBtn")`,
        language: 'java',
      },
      {
        type: 'simulation',
        icon: '✅',
        color: '#059669',
        title: { tr: 'Explicit Wait — WebDriverWait Simülasyonu', en: 'Explicit Wait — WebDriverWait Simulation' },
        scenario: 'explicit-wait',
        description: {
          tr: '"Veriyi Yükle" butonuna tıkla → Spinner görünür → WebDriverWait element\'i bekler → #result DOM\'a gelir → Test devam eder. Sağda DOM ağacı canlı değişir.',
          en: 'Click "Load Data" → Spinner appears → WebDriverWait polls for element → #result enters DOM → Test continues. Watch the DOM tree update on the right.',
        },
        code: `// Java — Explicit Wait (En İyi Yöntem)
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Butona tıkla → API isteği gönderilir
driver.findElement(By.id("load-btn")).click();

// Sadece #result görünür olana kadar bekle (max 10s)
WebElement result = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("result"))
);

// Python eşdeğeri:
// wait = WebDriverWait(driver, 10)
// result = wait.until(EC.visibility_of_element_located((By.ID, "result")))

System.out.println("Ürün: " + result.getText());`,
        language: 'java',
      },
      { type: 'heading', text: '1. Implicit Wait — Global Bekleme' },
      {
        type: 'code', language: 'java',
        label: 'Java — Implicit Wait',
        code: `import java.time.Duration;

WebDriver driver = new ChromeDriver();

// Tüm findElement çağrıları için max 10 saniye bekle
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

driver.get("https://example.com");

// Bu findElement, element yoksa 10sn bekleyecek
WebElement btn = driver.findElement(By.id("submitBtn"));
btn.click();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Implicit Wait',
        code: `from selenium import webdriver

driver = webdriver.Chrome()

# Tüm find_element için max 10 saniye bekle
driver.implicitly_wait(10)

driver.get("https://example.com")
btn = driver.find_element(By.ID, "submitBtn")  # max 10sn bekler
btn.click()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Implicit Wait',
        code: `import { until } from 'selenium-webdriver';

// Implicit wait
await driver.manage().setTimeouts({ implicit: 10000 }); // ms

const btn = await driver.findElement(By.id('submitBtn'));
await btn.click();`,
      },
      { type: 'heading', text: '2. Explicit Wait — En İyi Yöntem' },
      {
        type: 'callout', color: 'green', emoji: '✅',
        title: 'Explicit Wait — Best Practice',
        content: 'Explicit Wait, belirli bir koşul gerçekleşene kadar bekler. WebDriverWait + ExpectedConditions kombinasyonu kullanılır. Implicit Wait\'ten üstündür çünkü her element için farklı süre ve koşul tanımlayabilirsiniz.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Explicit Wait (WebDriverWait)',
        code: `import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// 1. Element görünür olana kadar bekle
WebElement btn = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("submitBtn"))
);
btn.click();

// 2. Element tıklanabilir olana kadar bekle (en yaygın!)
WebElement link = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("homeLink"))
);
link.click();

// 3. Element DOM'da var olana kadar bekle
WebElement loader = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("loader"))
);

// 4. Element kaybolana kadar bekle
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("spinner")));

// 5. Metin içerene kadar bekle
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.id("status"), "Başarılı"
));

// 6. URL değişene kadar bekle
wait.until(ExpectedConditions.urlContains("/dashboard"));

// 7. Başlık değişene kadar bekle
wait.until(ExpectedConditions.titleContains("Dashboard"));

// 8. Alert çıkana kadar bekle
wait.until(ExpectedConditions.alertIsPresent());`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Explicit Wait',
        code: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

wait = WebDriverWait(driver, 15)  # max 15 saniye

# Element görünür olana kadar bekle
btn = wait.until(EC.visibility_of_element_located((By.ID, "submitBtn")))
btn.click()

# Element tıklanabilir olana kadar bekle
link = wait.until(EC.element_to_be_clickable((By.ID, "homeLink")))
link.click()

# Element kaybolana kadar bekle
wait.until(EC.invisibility_of_element_located((By.ID, "spinner")))

# Metin içerene kadar bekle
wait.until(EC.text_to_be_present_in_element((By.ID, "status"), "Başarılı"))

# URL değişene kadar bekle
wait.until(EC.url_contains("/dashboard"))

# Alert çıkana kadar bekle
wait.until(EC.alert_is_present())`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Explicit Wait',
        code: `import { until, By } from 'selenium-webdriver';

// Element görünür olana kadar bekle
const btn = await driver.wait(
  until.elementIsVisible(await driver.findElement(By.id('submitBtn'))),
  15000 // 15 saniye
);
await btn.click();

// Element tıklanabilir olana kadar bekle
const link = await driver.wait(
  until.elementIsEnabled(await driver.findElement(By.id('homeLink'))),
  15000
);
await link.click();

// URL değişene kadar bekle
await driver.wait(until.urlContains('/dashboard'), 15000);

// Başlık değişene kadar bekle
await driver.wait(until.titleContains('Dashboard'), 15000);`,
      },
      { type: 'heading', text: '3. Fluent Wait — İleri Seviye' },
      {
        type: 'code', language: 'java',
        label: 'Java — Fluent Wait',
        code: `import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.NoSuchElementException;
import java.util.function.Function;

FluentWait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))     // Maksimum bekleme
    .pollingEvery(Duration.ofMillis(500))     // Her 500ms kontrol et
    .ignoring(NoSuchElementException.class); // Bu hatayı ignore et

WebElement element = fluentWait.until(
    driver -> driver.findElement(By.id("dynamicElement"))
);

// Lambda ile özel koşul
boolean result = fluentWait.until(driver -> {
    String text = driver.findElement(By.id("status")).getText();
    return text.equals("Yüklendi");
});`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — WebDriverWait (Fluent benzeri)',
        code: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException

# Polling interval ve ignore ile
wait = WebDriverWait(
    driver,
    timeout=30,
    poll_frequency=0.5,  # Her 500ms kontrol et
    ignored_exceptions=[NoSuchElementException, StaleElementReferenceException]
)

element = wait.until(
    EC.presence_of_element_located((By.ID, "dynamicElement"))
)

# Lambda ile özel koşul
result = wait.until(
    lambda d: d.find_element(By.ID, "status").text == "Yüklendi"
)`,
      },
      {
        type: 'callout', color: 'red', emoji: '❌',
        title: 'Thread.sleep() Kullanma!',
        content: 'Thread.sleep(3000) veya time.sleep(3) GİBİ sabit beklemeler KULLANMA. Neden? 1) Test yavaşlar — eleman 0.5sn\'de hazır olsa bile 3sn bekleriz. 2) Güvenilmez — eleman 3sn\'de hazır olmazsa yine hata alırız. Bunun yerine her zaman Explicit Wait kullan.',
      },
      {
        type: 'quiz',
        question: { tr: 'Selenium\'da bir spinner (yükleniyor ikonu) kaybolana kadar beklemek için hangi ExpectedCondition kullanılır?', en: 'Which ExpectedCondition is used to wait for a spinner to disappear in Selenium?' },
        options: [
          { id: 'a', text: 'EC.visibilityOfElementLocated()' },
          { id: 'b', text: 'EC.presenceOfElementLocated()' },
          { id: 'c', text: 'EC.invisibilityOfElementLocated()' },
          { id: 'd', text: 'EC.elementToBeClickable()' },
        ],
        correct: 'c',
        explanation: { tr: 'EC.invisibilityOfElementLocated() veya Python\'da EC.invisibility_of_element_located() — element DOM\'dan kaybolana veya gizlenene kadar bekler. Yükleme animasyonlarının bitmesini beklemek için idealdir.', en: 'EC.invisibilityOfElementLocated() (Java) or EC.invisibility_of_element_located() (Python) waits until the element is no longer visible or no longer present in the DOM. Perfect for waiting for loading spinners to disappear.' },
      },
    ],
  },
  en: {
    title: '⏳ Wait Strategies — Handling Timing Issues',
    blocks: [
      {
        type: 'simple-box', emoji: '⏰',
        content: 'Web pages don\'t load instantly — data comes from the server, JavaScript runs, animations complete. A "wait" strategy is Selenium patiently waiting instead of immediately failing. Like a car waiting at a red light and going when it turns green.',
      },
      { type: 'heading', text: 'Wait Types Comparison' },
      {
        type: 'table',
        headers: ['Type', 'How It Works', 'When to Use', 'Recommendation'],
        rows: [
          ['Thread.sleep()', 'Fixed time wait', 'Never!', '❌ AVOID'],
          ['Implicit Wait', 'Global timeout for all findElements', 'Simple projects only', '⚠️ Use carefully'],
          ['Explicit Wait', 'Waits for a specific condition', 'In all production tests', '✅ BEST PRACTICE'],
          ['Fluent Wait', 'Explicit + polling interval + ignore exceptions', 'Complex async scenarios', '✅ Advanced'],
        ],
      },
      { type: 'heading', text: '1. Implicit Wait' },
      {
        type: 'code', language: 'java',
        label: 'Java — Implicit Wait',
        code: `driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
WebElement btn = driver.findElement(By.id("submitBtn")); // waits up to 10s`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Implicit Wait',
        code: `driver.implicitly_wait(10)
btn = driver.find_element(By.ID, "submitBtn")  # waits up to 10s`,
      },
      { type: 'heading', text: '2. Explicit Wait — Best Practice' },
      {
        type: 'code', language: 'java',
        label: 'Java — Explicit Wait',
        code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Wait for element to be clickable
WebElement btn = wait.until(EC.elementToBeClickable(By.id("submitBtn")));
btn.click();

// Wait for element to disappear
wait.until(EC.invisibilityOfElementLocated(By.id("spinner")));

// Wait for URL to change
wait.until(EC.urlContains("/dashboard"));`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Explicit Wait',
        code: `wait = WebDriverWait(driver, 15)

btn = wait.until(EC.element_to_be_clickable((By.ID, "submitBtn")))
btn.click()

wait.until(EC.invisibility_of_element_located((By.ID, "spinner")))
wait.until(EC.url_contains("/dashboard"))`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Explicit Wait',
        code: `const btn = await driver.wait(
  until.elementIsEnabled(await driver.findElement(By.id('submitBtn'))),
  15000
);
await btn.click();

await driver.wait(until.urlContains('/dashboard'), 15000);`,
      },
    ],
  },
}

// ─── S5: FRAMES, ALERTS, WINDOWS ─────────────────────────────────────────────
const s5 = {
  tr: {
    title: '🪟 Frames, Alert & Çoklu Pencere Yönetimi',
    blocks: [
      {
        type: 'simple-box', emoji: '🖼️',
        content: 'iframe, sayfa içinde ayrı bir küçük sayfa gibidir — tıpkı büyük bir kitabın içinde ayrı bir broşür olması gibi. Alert ise tarayıcının sizi durduran bir uyarı ekranıdır. Ayrı pencereler ise bilgisayarda birden fazla tarayıcı sekmesi açmak gibi — Selenium\'un hangisinde olduğunu takip etmesi gerekir.',
      },
      { type: 'heading', text: '1. Alert / Confirm / Prompt Yönetimi' },
      {
        type: 'code', language: 'java',
        label: 'Java — Alert Yönetimi',
        code: `import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// 1. Alert bekle ve kabul et (OK tıkla)
driver.findElement(By.id("alertBtn")).click();
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
System.out.println("Alert metni: " + alert.getText());
alert.accept(); // OK / Kabul Et

// 2. Confirm → Reddet (Cancel)
driver.findElement(By.id("confirmBtn")).click();
Alert confirm = wait.until(ExpectedConditions.alertIsPresent());
confirm.dismiss(); // Cancel / Reddet

// 3. Prompt → Metin gir
driver.findElement(By.id("promptBtn")).click();
Alert prompt = wait.until(ExpectedConditions.alertIsPresent());
prompt.sendKeys("test kullanıcısı");
prompt.accept();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Alert Yönetimi',
        code: `from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

wait = WebDriverWait(driver, 10)

# Alert kabul et
driver.find_element(By.ID, "alertBtn").click()
alert = wait.until(EC.alert_is_present())
print("Alert metni:", alert.text)
alert.accept()  # OK

# Confirm reddet
driver.find_element(By.ID, "confirmBtn").click()
confirm = wait.until(EC.alert_is_present())
confirm.dismiss()  # Cancel

# Prompt metin gir
driver.find_element(By.ID, "promptBtn").click()
prompt = wait.until(EC.alert_is_present())
prompt.send_keys("test kullanıcısı")
prompt.accept()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Alert',
        code: `import { until } from 'selenium-webdriver';

await (await driver.findElement(By.id('alertBtn'))).click();
const alert = await driver.wait(until.alertIsPresent(), 10000);
console.log('Alert:', await alert.getText());
await alert.accept();

// Confirm → dismiss
await (await driver.findElement(By.id('confirmBtn'))).click();
const confirm = await driver.wait(until.alertIsPresent(), 10000);
await confirm.dismiss();`,
      },
      { type: 'heading', text: '2. iframe Yönetimi' },
      {
        type: 'simulation',
        icon: '🖼️',
        color: '#f59e0b',
        title: { tr: 'iframe Nerede? — Sayfa İçinde Tespit Et!', en: 'Where Is the iframe? — Detect on Page!' },
        scenario: 'iframe-detection',
        description: {
          tr: '"iframe\'leri Tara" → sayfadaki tüm iframe\'ler sarı/mavi kenarlıkla vurgulanır, "📌 iframe[0]" etiketi belirir. Ardından "switchTo().frame(0)" ile içine gir ve Selenium\'un artık iframe\'i gördüğünü izle.',
          en: 'Click "Scan for iframes" → all iframes get highlighted with colored borders and "📌 iframe[0]" labels. Then enter with "switchTo().frame(0)" and watch Selenium now seeing inside.',
        },
        code: `// ─── ADIM 1: Sayfadaki iframe sayısını öğren ───────────────────────
List<WebElement> iframes = driver.findElements(By.tagName("iframe"));
System.out.println("Toplam iframe: " + iframes.size()); // → 2

// ─── ADIM 2: Index ile iframe'e geç (0'dan başlar) ───────────────
driver.switchTo().frame(0);               // ← Stripe ödeme formu
// Artık iframe içindeki elementleri bulabilirsin!
driver.findElement(By.id("card-number")).sendKeys("4242 4242 4242 4242");

// ─── ADIM 3: Ana sayfaya geri dön ────────────────────────────────
driver.switchTo().defaultContent();       // ← ZORUNLU! Unutma!

// ─── ALTERNATİF: Name/ID ile geç ────────────────────────────────
driver.switchTo().frame("paymentFrame");  // name="paymentFrame"

// ─── Python eşdeğeri ─────────────────────────────────────────────
// iframes = driver.find_elements(By.TAG_NAME, "iframe")
// driver.switch_to.frame(0)
// driver.switch_to.default_content()`,
        language: 'java',
      },
      {
        type: 'simulation',
        icon: '🕶️',
        color: '#7c3aed',
        title: { tr: 'Shadow DOM — X-Ray Gözlüğüyle Gör!', en: 'Shadow DOM — See With X-Ray Vision!' },
        scenario: 'shadow-dom-xray',
        description: {
          tr: '"Normal findElement()" → NoSuchElementException! Çünkü şifre kutusu gizli bir Shadow DOM içinde. "X-Ray + shadowRoot" ile perdeyi kaldır, gizli DOM\'u aç ve elementi bul.',
          en: 'Click "Normal findElement()" → NoSuchElementException! The password field hides inside Shadow DOM. Use "X-Ray + shadowRoot" to pierce through and find it.',
        },
        code: `// ─── NORMAL YÖNTEM — BAŞARISIZ ──────────────────────────────────
// driver.findElement(By.id("pwd"))  ← NoSuchElementException!
// Shadow DOM içindeki elemente direkt erişilemez!

// ─── DOĞRU YÖNTEM: Selenium 4 + getShadowRoot() ──────────────────
// Adım 1: Shadow Host'u bul (normal DOM'da)
WebElement shadowHost = driver.findElement(By.cssSelector("my-password-input"));

// Adım 2: Shadow Root'u al (perdeyi kaldır)
SearchContext shadowRoot = shadowHost.getShadowRoot();

// Adım 3: Shadow Root içinde elementi bul
WebElement pwdInput = shadowRoot.findElement(By.cssSelector("input#pwd"));
pwdInput.sendKeys("myPassword123");

// ─── Eski Yöntem (Selenium 3 / JS Executor) ──────────────────────
// WebElement shadowRoot = (WebElement) ((JavascriptExecutor) driver)
//     .executeScript("return arguments[0].shadowRoot", shadowHost);

// ─── Python — Selenium 4 ──────────────────────────────────────────
// shadow_host = driver.find_element(By.CSS_SELECTOR, "my-password-input")
// shadow_root = shadow_host.shadow_root   # Selenium 4
// pwd = shadow_root.find_element(By.CSS_SELECTOR, "input#pwd")`,
        language: 'java',
      },
      {
        type: 'callout', color: 'purple', emoji: '🖼️',
        title: 'iframe Nedir?',
        content: 'iframe (Inline Frame), sayfa içinde başka bir HTML belgesi gömülü olması durumudur. Reklam blokları, ödeme formları (Stripe, PayPal), video embed\'leri genellikle iframe içindedir. Selenium\'un iframe içine "geçmesi" gerekir, yoksa element bulunamaz.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — iframe Yönetimi',
        code: `// 1. Index ile geç (0\'dan başlar)
driver.switchTo().frame(0);
driver.findElement(By.id("iframeBtn")).click();
driver.switchTo().defaultContent(); // Ana sayfaya dön

// 2. Name/ID ile geç
driver.switchTo().frame("paymentFrame");
driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
driver.switchTo().defaultContent();

// 3. WebElement ile geç
WebElement frame = driver.findElement(By.cssSelector("iframe.payment"));
driver.switchTo().frame(frame);
driver.findElement(By.id("cvv")).sendKeys("123");
driver.switchTo().parentFrame(); // Bir üst frame'e dön

// 4. İç içe iframe
driver.switchTo().frame("outerFrame");
driver.switchTo().frame("innerFrame");
driver.findElement(By.id("deepElement")).click();
driver.switchTo().defaultContent(); // En dıştaki sayfaya dön`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — iframe',
        code: `# Index ile
driver.switch_to.frame(0)
driver.find_element(By.ID, "iframeBtn").click()
driver.switch_to.default_content()  # Ana sayfaya dön

# Name/ID ile
driver.switch_to.frame("paymentFrame")
driver.find_element(By.ID, "cardNumber").send_keys("4111111111111111")
driver.switch_to.default_content()

# WebElement ile
frame = driver.find_element(By.CSS_SELECTOR, "iframe.payment")
driver.switch_to.frame(frame)
driver.find_element(By.ID, "cvv").send_keys("123")
driver.switch_to.parent_frame()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — iframe',
        code: `// Index ile
await driver.switchTo().frame(0);
await (await driver.findElement(By.id('iframeBtn'))).click();
await driver.switchTo().defaultContent();

// WebElement ile
const frame = await driver.findElement(By.css('iframe.payment'));
await driver.switchTo().frame(frame);
await (await driver.findElement(By.id('cardNumber'))).sendKeys('4111111111111111');
await driver.switchTo().parentFrame();`,
      },
      { type: 'heading', text: '3. Çoklu Pencere/Sekme Yönetimi' },
      {
        type: 'code', language: 'java',
        label: 'Java — Pencere/Sekme Yönetimi',
        code: `// Ana pencere handle'ını kaydet
String mainWindow = driver.getWindowHandle();
System.out.println("Ana pencere: " + mainWindow);

// Yeni sekme açan linke tıkla
driver.findElement(By.id("newTabLink")).click();

// Tüm pencere handle'larını al
Set<String> allWindows = driver.getWindowHandles();

// Yeni pencereye geç
for (String handle : allWindows) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);
        break;
    }
}

System.out.println("Yeni pencere başlığı: " + driver.getTitle());
driver.findElement(By.id("closeBtn")).click();

// Ana pencereye dön
driver.switchTo().window(mainWindow);
System.out.println("Ana pencere başlığı: " + driver.getTitle());

// Selenium 4: Programatik yeni sekme/pencere aç
driver.switchTo().newWindow(WindowType.TAB);   // Yeni sekme
driver.switchTo().newWindow(WindowType.WINDOW); // Yeni pencere
driver.get("https://example.com");`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Pencere Yönetimi',
        code: `# Ana pencere handle
main_window = driver.current_window_handle
print(f"Ana pencere: {main_window}")

# Yeni sekme açan link
driver.find_element(By.ID, "newTabLink").click()

# Yeni pencereye geç
all_windows = driver.window_handles
for handle in all_windows:
    if handle != main_window:
        driver.switch_to.window(handle)
        break

print(f"Yeni başlık: {driver.title}")
driver.close()  # Bu pencereyi kapat

# Ana pencereye dön
driver.switch_to.window(main_window)

# Selenium 4: Programatik yeni sekme
driver.switch_to.new_window("tab")
driver.get("https://example.com")`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Window Management',
        code: `// Ana pencere handle
const mainWindow = await driver.getWindowHandle();

await (await driver.findElement(By.id('newTabLink'))).click();

// Tüm pencereler
const allWindows = await driver.getAllWindowHandles();

// Yeni pencereye geç
for (const handle of allWindows) {
  if (handle !== mainWindow) {
    await driver.switchTo().window(handle);
    break;
  }
}

console.log('Yeni başlık:', await driver.getTitle());
await driver.close();

// Ana pencereye dön
await driver.switchTo().window(mainWindow);`,
      },
      { type: 'heading', text: '4. Cookie Yönetimi' },
      {
        type: 'code', language: 'java',
        label: 'Java — Cookies',
        code: `// Cookie ekle
Cookie cookie = new Cookie("sessionToken", "abc123xyz");
driver.manage().addCookie(cookie);

// Tüm cookie'leri oku
Set<Cookie> cookies = driver.manage().getCookies();
for (Cookie c : cookies) {
    System.out.println(c.getName() + " = " + c.getValue());
}

// Belirli cookie'yi oku
Cookie session = driver.manage().getCookieNamed("sessionToken");
System.out.println("Session: " + session.getValue());

// Cookie sil
driver.manage().deleteCookieNamed("sessionToken");
driver.manage().deleteAllCookies();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Cookies',
        code: `# Cookie ekle
driver.add_cookie({"name": "sessionToken", "value": "abc123xyz"})

# Tüm cookies
for cookie in driver.get_cookies():
    print(f"{cookie['name']} = {cookie['value']}")

# Belirli cookie
session = driver.get_cookie("sessionToken")
print(f"Session: {session['value']}")

# Sil
driver.delete_cookie("sessionToken")
driver.delete_all_cookies()`,
      },
      {
        type: 'quiz',
        question: { tr: 'Bir iframe içindeki elemana eriştikten sonra ana sayfaya dönmek için hangi metot kullanılır?', en: 'Which method is used to return to the main page after accessing an element inside an iframe?' },
        options: [
          { id: 'a', text: 'driver.switchTo().mainFrame()' },
          { id: 'b', text: 'driver.navigate().back()' },
          { id: 'c', text: 'driver.switchTo().defaultContent()' },
          { id: 'd', text: 'driver.switchTo().parentFrame()' },
        ],
        correct: 'c',
        explanation: { tr: 'driver.switchTo().defaultContent() (Java), driver.switch_to.default_content() (Python) — ana sayfa bağlamına döner. parentFrame() ise bir üst iframe\'e döner (iç içe iframe durumunda). Testi bitirince her zaman defaultContent() çağırın.', en: 'driver.switchTo().defaultContent() returns to the top-level page context. parentFrame() goes one level up (for nested iframes). Always call defaultContent() when finished with an iframe.' },
      },
      {
        type: 'simulation',
        icon: '🕶️',
        color: '#7c3aed',
        title: { tr: 'Shadow DOM — İnteraktif Keşif', en: 'Shadow DOM — Interactive Explorer' },
        scenario: 'shadow-dom',
        description: {
          tr: 'Sağdaki adım butonlarına tıklayarak Shadow DOM\'un katmanlarını keşfet: önce Host element\'i bul, sonra Shadow Root\'u aç, son olarak hedef elementi yakala.',
          en: 'Click the step buttons to explore Shadow DOM layers: find the Host element, pierce the Shadow Root, then locate the target element inside.',
        },
        code: `// Selenium 4 — Shadow DOM Erişimi
WebElement shadowHost = driver.findElement(By.cssSelector("my-custom-button"));

// getShadowRoot() → Selenium 4 ile gelen özellik
SearchContext shadowRoot = shadowHost.getShadowRoot();

// Shadow root içindeki elementi bul
WebElement innerBtn = shadowRoot.findElement(By.cssSelector(".inner-btn"));
innerBtn.click();

// Eski yöntem (Selenium 3 / JS):
// WebElement shadowRoot = (WebElement) ((JavascriptExecutor) driver)
//     .executeScript("return arguments[0].shadowRoot", shadowHost);
// WebElement innerBtn = shadowRoot.findElement(By.cssSelector(".inner-btn"));

// Python — Selenium 4:
// shadow_root = shadow_host.shadow_root
// inner_btn = shadow_root.find_element(By.CSS_SELECTOR, ".inner-btn")`,
        language: 'java',
      },
    ],
  },
  en: {
    title: '🪟 Frames, Alerts & Multiple Windows',
    blocks: [
      {
        type: 'simple-box', emoji: '🖼️',
        content: 'An iframe is like a mini page within a page — like a brochure inside a book. An alert is a browser warning that stops you. Multiple windows are like having several browser tabs open — Selenium needs to track which one it\'s on.',
      },
      { type: 'heading', text: '1. Alert / Confirm / Prompt' },
      {
        type: 'code', language: 'java',
        label: 'Java — Alert Handling',
        code: `// Accept alert
driver.findElement(By.id("alertBtn")).click();
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
System.out.println(alert.getText());
alert.accept(); // OK

// Dismiss confirm
driver.findElement(By.id("confirmBtn")).click();
wait.until(ExpectedConditions.alertIsPresent()).dismiss();

// Prompt input
driver.findElement(By.id("promptBtn")).click();
Alert prompt = wait.until(ExpectedConditions.alertIsPresent());
prompt.sendKeys("test user");
prompt.accept();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Alert Handling',
        code: `driver.find_element(By.ID, "alertBtn").click()
alert = wait.until(EC.alert_is_present())
print(alert.text)
alert.accept()

driver.find_element(By.ID, "confirmBtn").click()
wait.until(EC.alert_is_present()).dismiss()`,
      },
      { type: 'heading', text: '2. iframe Management' },
      {
        type: 'code', language: 'java',
        label: 'Java — iframe',
        code: `driver.switchTo().frame("paymentFrame");
driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
driver.switchTo().defaultContent(); // Back to main page`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — iframe',
        code: `driver.switch_to.frame("paymentFrame")
driver.find_element(By.ID, "cardNumber").send_keys("4111111111111111")
driver.switch_to.default_content()`,
      },
      { type: 'heading', text: '3. Multiple Windows/Tabs' },
      {
        type: 'code', language: 'java',
        label: 'Java — Window Management',
        code: `String mainWindow = driver.getWindowHandle();
driver.findElement(By.id("newTabLink")).click();
for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);
        break;
    }
}
driver.close();
driver.switchTo().window(mainWindow);`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Window Management',
        code: `main_window = driver.current_window_handle
driver.find_element(By.ID, "newTabLink").click()
for handle in driver.window_handles:
    if handle != main_window:
        driver.switch_to.window(handle)
        break
driver.close()
driver.switch_to.window(main_window)`,
      },
    ],
  },
}

// ─── S6: GERÇEK HAYAT ─────────────────────────────────────────────────────────
const s6 = {
  tr: {
    title: '🛠️ Gerçek Hayat — E-Commerce Test Senaryosu',
    blocks: [
      {
        type: 'simple-box', emoji: '🛒',
        content: 'Teorik bilgi yeterli değil — gerçek bir projede Selenium nasıl kullanılır? Bir e-ticaret sitesinde "kullanıcı giriş yapar, ürün arar, sepete ekler, ödeme yapar" senaryosunu uçtan uca test edelim.',
      },
      {
        type: 'callout', color: 'blue', emoji: '🎯',
        title: 'Senaryo: automationexercise.com E2E Testi',
        content: 'automationexercise.com, Selenium pratiği için tasarlanmış ücretsiz bir test sitesidir. Aşağıdaki senaryoyu gerçek tarayıcıda çalıştırabilirsiniz.',
      },
      { type: 'heading', text: 'Java — Page Object Model ile E2E Test' },
      {
        type: 'code', language: 'java',
        label: 'Java — LoginPage.java (Page Object)',
        code: `// Page Object Model: her sayfa ayrı class
public class LoginPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators
    private By emailField    = By.cssSelector("input[data-qa='login-email']");
    private By passwordField = By.cssSelector("input[data-qa='login-password']");
    private By loginButton   = By.cssSelector("button[data-qa='login-button']");
    private By errorMessage  = By.cssSelector("p.text-danger");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public void enterEmail(String email) {
        wait.until(EC.visibilityOfElementLocated(emailField)).sendKeys(email);
    }

    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }

    public void clickLogin() {
        driver.findElement(loginButton).click();
    }

    public String getErrorMessage() {
        return wait.until(EC.visibilityOfElementLocated(errorMessage)).getText();
    }

    // Page method: tam işlem
    public void login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickLogin();
    }
}`,
      },
      {
        type: 'code', language: 'java',
        label: 'Java — E2E Test Senaryosu',
        code: `import org.testng.annotations.*;
import org.testng.Assert;

public class ECommerceTest {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get("https://automationexercise.com");
        loginPage = new LoginPage(driver);
    }

    @Test
    public void testSuccessfulLogin() {
        // 1. Login sayfasına git
        driver.findElement(By.cssSelector("a[href='/login']")).click();

        // 2. Giriş yap
        loginPage.login("test@test.com", "password123");

        // 3. Başarılı giriş doğrula
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement loggedIn = wait.until(
            EC.visibilityOfElementLocated(By.cssSelector("li:has(a[href='/logout'])"))
        );
        Assert.assertTrue(loggedIn.isDisplayed(), "Kullanıcı giriş yapamadı!");
    }

    @Test
    public void testAddToCart() {
        // 1. Ürün sayfasına git
        driver.get("https://automationexercise.com/products");

        // 2. İlk ürünü sepete ekle
        driver.findElement(By.cssSelector(".add-to-cart")).click();

        // 3. Modal confirm
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(EC.visibilityOfElementLocated(By.id("cartModal")));

        driver.findElement(By.cssSelector("button.continue-shopping")).click();

        // 4. Sepet ikonunu kontrol et
        String cartCount = driver.findElement(By.cssSelector(".cart-icon span")).getText();
        Assert.assertEquals(cartCount, "1", "Sepet boş!");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}`,
      },
      { type: 'heading', text: 'Python — Pytest + Selenium E2E Test' },
      {
        type: 'code', language: 'python',
        label: 'Python — conftest.py (Pytest Fixtures)',
        code: `# conftest.py
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

@pytest.fixture(scope="function")
def driver():
    """Her test için yeni Chrome instance"""
    options = Options()
    # options.add_argument("--headless")  # CI için headless
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1280,800")

    chrome_driver = webdriver.Chrome(options=options)
    chrome_driver.implicitly_wait(10)
    yield chrome_driver
    chrome_driver.quit()  # Her test sonrası kapat`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — test_ecommerce.py',
        code: `# test_ecommerce.py
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://automationexercise.com"

class TestECommerce:
    def test_homepage_loads(self, driver):
        """Anasayfa yükleniyor mu?"""
        driver.get(BASE_URL)
        assert "Automation Exercise" in driver.title

    def test_login_success(self, driver):
        """Başarılı giriş testi"""
        driver.get(f"{BASE_URL}/login")

        wait = WebDriverWait(driver, 15)

        # Email ve şifre gir
        wait.until(EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "input[data-qa='login-email']")
        )).send_keys("test@test.com")

        driver.find_element(By.CSS_SELECTOR, "input[data-qa='login-password']").send_keys("password123")
        driver.find_element(By.CSS_SELECTOR, "button[data-qa='login-button']").click()

        # Giriş başarılı mı?
        logout_link = wait.until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "a[href='/logout']"))
        )
        assert logout_link.is_displayed(), "Login başarısız!"

    def test_search_product(self, driver):
        """Ürün arama testi"""
        driver.get(f"{BASE_URL}/products")

        wait = WebDriverWait(driver, 10)
        search_box = wait.until(
            EC.visibility_of_element_located((By.ID, "search_product"))
        )
        search_box.send_keys("Top")
        driver.find_element(By.ID, "submit_search").click()

        # Arama sonuçları geldi mi?
        results = wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".productinfo"))
        )
        assert len(results) > 0, "Hiç ürün bulunamadı!"
        print(f"Bulunan ürün sayısı: {len(results)}")

    def test_add_to_cart(self, driver):
        """Sepete ekleme testi"""
        driver.get(f"{BASE_URL}/product_details/1")

        wait = WebDriverWait(driver, 10)

        # Adet seç
        qty = driver.find_element(By.ID, "quantity")
        qty.clear()
        qty.send_keys("2")

        # Sepete ekle
        driver.find_element(By.CSS_SELECTOR, "button.cart").click()

        # Modal açıldı mı?
        modal = wait.until(
            EC.visibility_of_element_located((By.ID, "cartModal"))
        )
        assert modal.is_displayed(), "Modal açılmadı!"`,
      },
      { type: 'heading', text: 'TypeScript — Mocha + Selenium E2E Test' },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — ecommerce.test.ts',
        code: `import { Builder, Browser, By, until } from 'selenium-webdriver';
import { describe, it, before, after } from 'mocha';
import { strict as assert } from 'assert';

const BASE_URL = 'https://automationexercise.com';

describe('E-Commerce Tests', function () {
  this.timeout(30000); // Test timeout: 30s
  let driver: any;

  before(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
  });

  after(async () => {
    await driver.quit();
  });

  it('Homepage loads correctly', async () => {
    await driver.get(BASE_URL);
    const title = await driver.getTitle();
    assert.ok(title.includes('Automation Exercise'), 'Title mismatch');
  });

  it('Login successfully', async () => {
    await driver.get(\`\${BASE_URL}/login\`);

    const emailInput = await driver.wait(
      until.elementLocated(By.css("input[data-qa='login-email']")),
      15000
    );
    await emailInput.sendKeys('test@test.com');
    await (await driver.findElement(By.css("input[data-qa='login-password']"))).sendKeys('password123');
    await (await driver.findElement(By.css("button[data-qa='login-button']"))).click();

    const logoutLink = await driver.wait(
      until.elementLocated(By.css("a[href='/logout']")),
      10000
    );
    assert.ok(await logoutLink.isDisplayed(), 'Login failed!');
  });

  it('Search for a product', async () => {
    await driver.get(\`\${BASE_URL}/products\`);

    const searchBox = await driver.wait(
      until.elementLocated(By.id('search_product')),
      10000
    );
    await searchBox.sendKeys('Top');
    await (await driver.findElement(By.id('submit_search'))).click();

    const results = await driver.findElements(By.css('.productinfo'));
    assert.ok(results.length > 0, 'No products found!');
    console.log(\`Found \${results.length} products\`);
  });
});`,
      },
      { type: 'heading', text: 'Selenium vs Playwright vs Cypress — Karşılaştırma' },
      {
        type: 'table',
        headers: ['Özellik', 'Selenium', 'Playwright', 'Cypress'],
        rows: [
          ['Dil Desteği', 'Java, Python, C#, JS, Ruby', 'TS/JS, Python, Java, C#', 'JS/TS'],
          ['Tarayıcı', 'Chrome, FF, Safari, Edge, IE', 'Chromium, FF, WebKit', 'Chrome, FF, Edge'],
          ['Auto-Wait', '❌ Manuel', '✅ Built-in', '✅ Built-in'],
          ['Network Mock', '❌ Ek araç', '✅ Built-in', '✅ Built-in'],
          ['Paralel Test', 'Grid gerekir', '✅ Built-in', 'Cypress Cloud (ücretli)'],
          ['iframe Desteği', '✅ İyi', '✅ İyi', '⚠️ Sınırlı'],
          ['Java Entegrasyonu', '✅ Native', '✅ Client library', '❌ Yok'],
          ['Headless', '✅', '✅', '✅'],
          ['Olgunluk', '⭐⭐⭐⭐⭐ (20 yıl)', '⭐⭐⭐⭐ (4 yıl)', '⭐⭐⭐⭐ (7 yıl)'],
          ['Ne Zaman Tercih Et?', 'Java projelerde, cross-browser, legacy', 'Yeni projeler, multi-browser', 'Frontend-only, JS/TS ekipler'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Selenium\'un en büyük avantajı hangisidir?', en: 'What is Selenium\'s biggest advantage?' },
        options: [
          { id: 'a', text: 'Sadece Chrome\'da çalışır' },
          { id: 'b', text: 'Çok dil desteği (Java, Python, C#, JS, Ruby) ve olgunluk (20 yıl)' },
          { id: 'c', text: 'Yalnızca JavaScript testleri için uygundur' },
          { id: 'd', text: 'Auto-wait built-in gelir' },
        ],
        correct: 'b',
        explanation: { tr: 'Selenium\'un en büyük avantajı Java dahil 6+ dil desteği, 20 yıllık olgunluk, geniş topluluk ve her tarayıcıda çalışabilmesidir. Özellikle Java ağırlıklı QA ekiplerinin tercihi olmaya devam etmektedir.', en: 'Selenium\'s biggest advantage is support for 6+ languages including Java, 20 years of maturity, a large community, and compatibility with all browsers. It remains the go-to choice for Java-heavy QA teams.' },
      },
    ],
  },
  en: {
    title: '🛠️ Real World — E-Commerce Test Scenario',
    blocks: [
      {
        type: 'simple-box', emoji: '🛒',
        content: 'Theory isn\'t enough — how is Selenium used in a real project? Let\'s test an e-commerce site end-to-end: user logs in, searches for a product, adds to cart, and checks out.',
      },
      { type: 'heading', text: 'Java — E2E Test with Page Object Model' },
      {
        type: 'code', language: 'java',
        label: 'Java — E2E Test',
        code: `@Test
public void testSuccessfulLogin() {
    driver.findElement(By.cssSelector("a[href='/login']")).click();
    loginPage.login("test@test.com", "password123");
    WebElement loggedIn = wait.until(EC.visibilityOfElementLocated(
        By.cssSelector("a[href='/logout']")
    ));
    Assert.assertTrue(loggedIn.isDisplayed());
}`,
      },
      { type: 'heading', text: 'Python — Pytest + Selenium E2E' },
      {
        type: 'code', language: 'python',
        label: 'Python — E2E Test',
        code: `def test_login_success(driver):
    driver.get("https://automationexercise.com/login")
    wait = WebDriverWait(driver, 15)
    wait.until(EC.visibility_of_element_located(
        (By.CSS_SELECTOR, "input[data-qa='login-email']")
    )).send_keys("test@test.com")
    driver.find_element(By.CSS_SELECTOR, "input[data-qa='login-password']").send_keys("password123")
    driver.find_element(By.CSS_SELECTOR, "button[data-qa='login-button']").click()
    logout = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "a[href='/logout']")))
    assert logout.is_displayed()`,
      },
      { type: 'heading', text: 'Selenium vs Playwright vs Cypress' },
      {
        type: 'table',
        headers: ['Feature', 'Selenium', 'Playwright', 'Cypress'],
        rows: [
          ['Languages', 'Java, Python, C#, JS, Ruby', 'TS/JS, Python, Java, C#', 'JS/TS only'],
          ['Browsers', 'Chrome, FF, Safari, Edge, IE', 'Chromium, FF, WebKit', 'Chrome, FF, Edge'],
          ['Auto-Wait', '❌ Manual', '✅ Built-in', '✅ Built-in'],
          ['Network Mock', '❌ Extra tool', '✅ Built-in', '✅ Built-in'],
          ['Java Integration', '✅ Native', '✅ Client library', '❌ None'],
          ['Best For', 'Java projects, cross-browser, legacy', 'New projects, multi-browser', 'Frontend-only, JS/TS teams'],
        ],
      },
    ],
  },
}

// ─── S7: EKOSİSTEM ───────────────────────────────────────────────────────────
const s7 = {
  tr: {
    title: '🔗 Ekosistem — TestNG, Maven, Jenkins, Grid',
    blocks: [
      {
        type: 'simple-box', emoji: '🏗️',
        content: 'Selenium tek başına sadece tarayıcıyı kontrol eder. Gerçek bir proje için diğer araçlara ihtiyaç var: TestNG testleri organize eder (JUnit gibi), Maven bağımlılıkları yönetir (Gradle gibi), Jenkins otomatik çalıştırır (CI/CD), Grid paralel çalıştırır.',
      },
      { type: 'heading', text: 'Selenium Ekosistem Haritası' },
      {
        type: 'visual', variant: 'boxes',
        title: 'Selenium Ekosistemi',
        items: [
          { icon: '🐍', label: 'pytest/unittest', desc: 'Python test runner' },
          { arrow: true },
          { icon: '🟢', label: 'Selenium', desc: 'Browser control', highlight: true },
          { arrow: true },
          { icon: '🌐', label: 'Chrome/FF', desc: 'Gerçek tarayıcı' },
          { icon: '🔧', label: 'Maven/Gradle', desc: 'Build & deps' },
          { arrow: true },
          { icon: '☕', label: 'TestNG/JUnit', desc: 'Java test runner' },
          { arrow: true },
          { icon: '🤖', label: 'Jenkins/GitHub Actions', desc: 'CI/CD' },
          { icon: '📊', label: 'Allure/ExtentReports', desc: 'Raporlama' },
          { arrow: true },
          { icon: '☁️', label: 'Selenium Grid', desc: 'Paralel & remote' },
          { arrow: true },
          { icon: '🖥️', label: 'Farklı OS/Browser', desc: 'Cross-platform' },
        ],
        note: 'Her araç birbirini tamamlar — Selenium sadece ortadaki parça.',
      },
      { type: 'heading', text: '1. TestNG — Java Test Runner' },
      {
        type: 'table',
        headers: ['TestNG Annotation', 'Ne Yapar?', 'JUnit Karşılığı'],
        rows: [
          ['@BeforeSuite', 'Tüm testlerden önce bir kez', '@BeforeAll (JUnit 5)'],
          ['@BeforeClass', 'Her class öncesi bir kez', '@BeforeAll'],
          ['@BeforeMethod', 'Her test metodu öncesi', '@BeforeEach'],
          ['@Test', 'Test metodu', '@Test'],
          ['@AfterMethod', 'Her test sonrası', '@AfterEach'],
          ['@AfterClass', 'Her class sonrası bir kez', '@AfterAll'],
          ['@AfterSuite', 'Tüm testlerden sonra bir kez', '@AfterAll'],
          ['@DataProvider', 'Parametrik test verisi', '@ParameterizedTest'],
        ],
      },
      {
        type: 'code', language: 'java',
        label: 'Java — TestNG Örneği',
        code: `import org.testng.annotations.*;
import org.testng.Assert;

public class LoginTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeClass
    public void setUpClass() {
        System.out.println("Test sınıfı başlıyor...");
    }

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @Test(priority = 1, description = "Başarılı giriş testi")
    public void testValidLogin() {
        driver.get("https://automationexercise.com/login");
        driver.findElement(By.cssSelector("input[data-qa='login-email']")).sendKeys("test@test.com");
        driver.findElement(By.cssSelector("input[data-qa='login-password']")).sendKeys("password123");
        driver.findElement(By.cssSelector("button[data-qa='login-button']")).click();
        Assert.assertTrue(driver.getCurrentUrl().contains("/"), "Giriş başarısız!");
    }

    @Test(priority = 2, dataProvider = "loginData", description = "Parametrik giriş testi")
    public void testLoginWithDataProvider(String email, String password, boolean expected) {
        driver.get("https://automationexercise.com/login");
        driver.findElement(By.cssSelector("input[data-qa='login-email']")).sendKeys(email);
        driver.findElement(By.cssSelector("input[data-qa='login-password']")).sendKeys(password);
        driver.findElement(By.cssSelector("button[data-qa='login-button']")).click();
        // assert expected result
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            { "test@test.com", "password123", true },
            { "wrong@test.com", "wrong", false },
            { "", "", false }
        };
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}`,
      },
      { type: 'heading', text: '2. Selenium Grid — Paralel & Uzak Testler' },
      {
        type: 'callout', color: 'blue', emoji: '🌐',
        title: 'Selenium Grid Nedir?',
        content: 'Selenium Grid, testleri aynı anda birden fazla makine ve tarayıcıda çalıştırmanızı sağlar. Hub (koordinatör) ve Node (çalıştırıcı) mimarisi kullanır. Selenium 4 Grid 4 ile dağıtık yapı daha da basitleşti.',
      },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Selenium Grid 4 Kurulum',
        code: `# Selenium Grid JAR indir (tek dosya!)
curl -L -o selenium-server.jar https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.25.0/selenium-server-4.25.0.jar

# Hub başlat
java -jar selenium-server.jar hub

# Node başlat (başka terminalde veya makinede)
java -jar selenium-server.jar node --hub http://localhost:4444`,
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Grid\'e Bağlan (RemoteWebDriver)',
        code: `import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.net.URL;

ChromeOptions options = new ChromeOptions();
options.addArguments("--headless");

WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"),
    options
);

driver.get("https://example.com");
System.out.println(driver.getTitle());
driver.quit();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Grid',
        code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless")

driver = webdriver.Remote(
    command_executor="http://localhost:4444/wd/hub",
    options=options
)

driver.get("https://example.com")
print(driver.title)
driver.quit()`,
      },
      { type: 'heading', text: '3. GitHub Actions CI/CD Entegrasyonu' },
      {
        type: 'code', language: 'yaml',
        label: '.github/workflows/selenium.yml',
        code: `name: Selenium Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  selenium-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Java
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Set up Chrome
        uses: browser-actions/setup-chrome@latest

      - name: Run Selenium Tests
        run: mvn test -Dheadless=true

      - name: Upload Test Reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-reports
          path: target/surefire-reports/`,
      },
    ],
  },
  en: {
    title: '🔗 Ecosystem — TestNG, Maven, Jenkins, Grid',
    blocks: [
      {
        type: 'simple-box', emoji: '🏗️',
        content: 'Selenium alone just controls the browser. A real project needs more: TestNG organizes tests (like JUnit), Maven manages dependencies (like Gradle), Jenkins runs them automatically (CI/CD), Grid runs them in parallel.',
      },
      { type: 'heading', text: 'TestNG Annotations' },
      {
        type: 'table',
        headers: ['TestNG', 'What It Does', 'JUnit Equivalent'],
        rows: [
          ['@BeforeMethod', 'Before each test method', '@BeforeEach'],
          ['@Test', 'Test method', '@Test'],
          ['@AfterMethod', 'After each test method', '@AfterEach'],
          ['@DataProvider', 'Parameterized test data', '@ParameterizedTest'],
        ],
      },
      { type: 'heading', text: 'Selenium Grid — Parallel & Remote Tests' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Selenium Grid 4',
        code: `java -jar selenium-server.jar hub
java -jar selenium-server.jar node --hub http://localhost:4444`,
      },
      {
        type: 'code', language: 'java',
        label: 'Java — RemoteWebDriver',
        code: `WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"),
    new ChromeOptions()
);`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Remote Grid',
        code: `driver = webdriver.Remote(
    command_executor="http://localhost:4444/wd/hub",
    options=Options()
)`,
      },
    ],
  },
}

// ─── S8: YAYGIN HATALAR ───────────────────────────────────────────────────────
const s8 = {
  tr: {
    title: '🚨 Yaygın Hatalar & Çözümleri',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Selenium öğrenirken herkes aynı hataları yapar. Bu bölüm en sık karşılaşılan 10 hatayı ve çözümlerini içerir — copy-paste yapıp gerçek hata mesajınızla karşılaştırabilirsiniz.',
      },
      {
        type: 'error-dict',
        framework: 'Selenium WebDriver',
        errors: [
          {
            error: 'NoSuchElementException',
            fullMessage: 'org.openqa.selenium.NoSuchElementException: no such element: Unable to locate element: {"method":"id","selector":"loginBtn"}',
            cause: { tr: 'Element DOM\'da yok veya henüz yüklenmemiş. Yanlış locator veya iframe içinde aramak gibi durumlar.', en: 'Element not in DOM or not yet loaded. Wrong locator or looking inside iframe.' },
            solution: { tr: '1) Locator\'ı DevTools\'da test et: document.querySelector("#loginBtn") \n2) Explicit Wait ekle: wait.until(EC.presenceOfElementLocated(By.id("loginBtn")))\n3) İframe içindeyse önce switchTo().frame() yap', en: '1) Test locator in DevTools\n2) Add explicit wait\n3) If in iframe, switchTo().frame() first' },
            codeWrong: `driver.findElement(By.id("loginBtn")).click(); // Sayfa yüklenmeden`,
            codeFixed: `wait.until(EC.elementToBeClickable(By.id("loginBtn"))).click();`,
          },
          {
            error: 'StaleElementReferenceException',
            fullMessage: 'org.openqa.selenium.StaleElementReferenceException: stale element reference: element is not attached to the page document',
            cause: { tr: 'Element DOM\'a referans alındıktan sonra sayfa yenilendi veya DOM değişti. Özellikle SPA (React/Vue) uygulamalarda sık görülür.', en: 'Page refreshed or DOM changed after element reference was captured. Common in SPA apps (React/Vue).' },
            solution: { tr: '1) Element\'i her kullanmadan önce yeniden bul\n2) Try-catch ile StaleElementReferenceException yakala ve yeniden dene\n3) WebDriverWait ile element stabil olana kadar bekle', en: '1) Re-find element before each use\n2) Catch StaleElementReferenceException and retry\n3) Wait for element stability' },
            codeWrong: `WebElement btn = driver.findElement(By.id("btn"));
driver.navigate().refresh(); // DOM değişti!
btn.click(); // HATA!`,
            codeFixed: `driver.navigate().refresh();
wait.until(EC.elementToBeClickable(By.id("btn"))).click(); // Yeniden bul`,
          },
          {
            error: 'ElementNotInteractableException',
            fullMessage: 'org.openqa.selenium.ElementNotInteractableException: element not interactable',
            cause: { tr: 'Element DOM\'da var ama görünmez veya başka bir element önünde. display:none, opacity:0, z-index gibi CSS sorunları.', en: 'Element exists in DOM but is invisible or blocked. CSS issues: display:none, opacity:0, z-index.' },
            solution: { tr: '1) Element görünür olana kadar bekle: EC.visibilityOfElementLocated\n2) Scroll ile görünür alana getir: js.executeScript("arguments[0].scrollIntoView(true)", el)\n3) Gerçekten etkileşilemiyor ise JS ile tıkla: js.executeScript("arguments[0].click()", el)', en: '1) Wait for visibility\n2) Scroll into view\n3) Click via JavaScript if truly not interactable' },
            codeWrong: `driver.findElement(By.id("hiddenBtn")).click();`,
            codeFixed: `WebElement el = wait.until(EC.visibilityOfElementLocated(By.id("hiddenBtn")));
el.click();
// Ya da JS ile:
js.executeScript("arguments[0].click();", el);`,
          },
          {
            error: 'TimeoutException',
            fullMessage: 'org.openqa.selenium.TimeoutException: Expected condition failed: waiting for visibility of element located by By.id: spinner (tried for 15 second(s))',
            cause: { tr: 'Explicit Wait süresi doldu ama beklenen koşul gerçekleşmedi. Yavaş ağ, hatalı locator veya sayfa yapısı değişti.', en: 'Explicit Wait timed out. Slow network, wrong locator, or page structure changed.' },
            solution: { tr: '1) Bekleme süresini artır: Duration.ofSeconds(30)\n2) Locator\'ı doğru gir, sayfada gerçekten var mı kontrol et\n3) Network sekmesinde sayfanın ne zaman hazır olduğunu izle', en: '1) Increase timeout\n2) Verify locator is correct\n3) Monitor Network tab for when page is ready' },
            codeWrong: `wait.until(EC.visibilityOfElementLocated(By.id("spnner"))); // Yazım hatası!`,
            codeFixed: `wait.until(EC.invisibilityOfElementLocated(By.id("spinner"))); // Kaybolmasını bekle`,
          },
          {
            error: 'WebDriverException: Chrome not reachable',
            fullMessage: 'org.openqa.selenium.WebDriverException: chrome not reachable (Session info: chrome=xx.x)',
            cause: { tr: 'ChromeDriver ve Chrome versiyonları uyumsuz. Selenium Manager\'ın kullanılmadığı eski projelerde yaygındır.', en: 'ChromeDriver and Chrome version mismatch. Common in old projects not using Selenium Manager.' },
            solution: { tr: '1) Selenium 4.6+ kullanıyorsanız Selenium Manager otomatik çözer\n2) webdrivermanager kullanıyorsanız güncelleyin: WebDriverManager.chromedriver().setup()\n3) Chrome ve ChromeDriver sürümlerini manuel eşleştirin', en: '1) Use Selenium 4.6+ — Selenium Manager auto-handles it\n2) Update webdrivermanager\n3) Manually match Chrome and ChromeDriver versions' },
          },
          {
            error: 'SessionNotCreatedException',
            fullMessage: 'org.openqa.selenium.SessionNotCreatedException: Could not start a new session. Response code 500. Message: session not created: This version of ChromeDriver only supports Chrome version XX',
            cause: { tr: 'ChromeDriver sürümü mevcut Chrome tarayıcısıyla uyumsuz.', en: 'ChromeDriver version is incompatible with the installed Chrome browser.' },
            solution: { tr: '1) Selenium 4.6+ ile Selenium Manager\'ı etkinleştirin\n2) https://chromedriver.chromium.org/downloads adresinden uyumlu versiyonu indirin\n3) Java: System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver")', en: '1) Enable Selenium Manager with Selenium 4.6+\n2) Download matching version from chromedriver.chromium.org\n3) Set system property manually' },
          },
          {
            error: 'MoveTargetOutOfBoundsException',
            fullMessage: 'org.openqa.selenium.interactions.MoveTargetOutOfBoundsException: (0, 2000) is out of bounds of viewport width (1280) and height (800)',
            cause: { tr: 'Actions.moveToElement() ile ulaşılmaya çalışılan element görünür viewport dışında.', en: 'Element targeted by Actions.moveToElement() is outside the visible viewport.' },
            solution: { tr: '1) Önce elemana scroll ile git: js.executeScript("arguments[0].scrollIntoView(true)", el)\n2) Tarayıcı penceresini büyüt: driver.manage().window().maximize()', en: '1) Scroll to element first\n2) Maximize browser window' },
            codeWrong: `new Actions(driver).moveToElement(el).click().perform(); // Viewport dışı!`,
            codeFixed: `js.executeScript("arguments[0].scrollIntoView(true);", el);
new Actions(driver).moveToElement(el).click().perform();`,
          },
          {
            error: 'UnexpectedAlertPresentException',
            fullMessage: 'org.openqa.selenium.UnexpectedAlertPresentException: unexpected alert open: {Alert text : Are you sure?}',
            cause: { tr: 'Başka bir aksiyon yaparken sayfa alert açtı ve Selenium\'u durdurdu.', en: 'An unexpected alert appeared while performing another action, blocking Selenium.' },
            solution: { tr: '1) Testi önce alert\'i handle edecek şekilde düzenle\n2) UnexpectedAlertBehaviour capability ile ignore et (önerilmez)', en: '1) Restructure test to handle alert before it appears\n2) Use UnexpectedAlertBehaviour capability to ignore (not recommended)' },
            codeFixed: `// Alert beklenen durumda: önce accept et
try {
    Alert alert = driver.switchTo().alert();
    alert.accept();
} catch (NoAlertPresentException e) {
    // Alert yoksa devam et
}`,
          },
          {
            error: 'NoSuchWindowException',
            fullMessage: 'org.openqa.selenium.NoSuchWindowException: no such window: target window already closed',
            cause: { tr: 'Geçiş yapılan pencere kapanmış veya handle geçersiz hale gelmiş.', en: 'The window switched to has been closed or handle is no longer valid.' },
            solution: { tr: '1) Pencereyi kapatmadan önce ana pencereye geri dön\n2) driver.getWindowHandles() ile aktif pencereleri listele', en: '1) Switch back to main window before closing\n2) List active windows with driver.getWindowHandles()' },
            codeFixed: `// Yeni pencereyi kapat, ana pencereye dön
driver.close(); // Aktif pencereyi kapat
driver.switchTo().window(mainWindowHandle); // Ana pencereye dön`,
          },
          {
            error: 'InvalidSelectorException',
            fullMessage: 'org.openqa.selenium.InvalidSelectorException: invalid selector: An invalid or illegal selector was specified',
            cause: { tr: 'CSS Selector veya XPath sözdizimi hatalı.', en: 'Invalid CSS Selector or XPath syntax.' },
            solution: { tr: '1) CSS: DevTools Console\'da document.querySelector("selector") dene\n2) XPath: DevTools Console\'da $x("//xpath") dene\n3) Özel karakter içeren CSS\'te escape kullan', en: '1) Test CSS in DevTools: document.querySelector("selector")\n2) Test XPath in DevTools: $x("//xpath")\n3) Escape special characters in CSS' },
            codeWrong: `driver.findElement(By.cssSelector("input[type=text]")); // Tırnak eksik
driver.findElement(By.xpath("//button[text()=Login]")); // Tırnak eksik`,
            codeFixed: `driver.findElement(By.cssSelector("input[type='text']")); // Tırnak ekle
driver.findElement(By.xpath("//button[text()='Login']")); // Tırnak ekle`,
          },
        ],
      },
    ],
  },
  en: {
    title: '🚨 Common Errors & Solutions',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Everyone hits the same errors when learning Selenium. This section covers the 10 most common errors with real error messages and solutions — copy-paste to match your error.',
      },
      {
        type: 'error-dict',
        framework: 'Selenium WebDriver',
        errors: [
          {
            error: 'NoSuchElementException',
            fullMessage: 'Unable to locate element: {"method":"id","selector":"loginBtn"}',
            cause: { en: 'Element not in DOM or not yet loaded. Wrong locator or inside an iframe.' },
            solution: { en: '1) Test locator in DevTools: document.querySelector("#loginBtn")\n2) Add explicit wait: wait.until(EC.presenceOfElementLocated(By.id("loginBtn")))\n3) If inside iframe, call switchTo().frame() first' },
            codeWrong: `driver.findElement(By.id("loginBtn")).click(); // Before page loads`,
            codeFixed: `wait.until(EC.elementToBeClickable(By.id("loginBtn"))).click();`,
          },
          {
            error: 'StaleElementReferenceException',
            fullMessage: 'stale element reference: element is not attached to the page document',
            cause: { en: 'DOM changed after element reference was captured. Common in React/Vue SPAs.' },
            solution: { en: '1) Re-find element before each use\n2) Catch and retry on StaleElementReferenceException\n3) Wait for element stability' },
            codeFixed: `driver.navigate().refresh();
wait.until(EC.elementToBeClickable(By.id("btn"))).click(); // Re-find`,
          },
          {
            error: 'ElementNotInteractableException',
            fullMessage: 'element not interactable',
            cause: { en: 'Element exists but is invisible or blocked by another element.' },
            solution: { en: '1) Wait for visibility\n2) Scroll into view\n3) Click via JavaScript' },
            codeFixed: `WebElement el = wait.until(EC.visibilityOfElementLocated(By.id("btn")));
el.click();`,
          },
          {
            error: 'TimeoutException',
            fullMessage: 'Expected condition failed after 15 second(s)',
            cause: { en: 'Condition never met within timeout. Wrong locator or slow network.' },
            solution: { en: '1) Increase timeout\n2) Verify locator is correct\n3) Check Network tab' },
          },
          {
            error: 'SessionNotCreatedException',
            fullMessage: 'ChromeDriver only supports Chrome version XX',
            cause: { en: 'ChromeDriver version mismatch with installed Chrome.' },
            solution: { en: '1) Use Selenium 4.6+ (Selenium Manager auto-handles)\n2) Download matching ChromeDriver version' },
          },
          {
            error: 'NoSuchWindowException',
            fullMessage: 'no such window: target window already closed',
            cause: { en: 'Window was closed or handle is no longer valid.' },
            solution: { en: '1) Switch back to main window before closing\n2) List active windows with driver.getWindowHandles()' },
          },
          {
            error: 'InvalidSelectorException',
            fullMessage: 'invalid selector specified',
            cause: { en: 'Invalid CSS Selector or XPath syntax.' },
            solution: { en: '1) Test CSS in DevTools: document.querySelector("selector")\n2) Test XPath: $x("//xpath")\n3) Escape special characters' },
          },
          {
            error: 'UnexpectedAlertPresentException',
            fullMessage: 'unexpected alert open: {Alert text: Are you sure?}',
            cause: { en: 'An unexpected alert appeared and blocked Selenium.' },
            solution: { en: '1) Handle alert in your test flow\n2) Use try-catch to dismiss unexpected alerts' },
          },
        ],
      },
    ],
  },
}

// ─── S9: MÜLAKAT SORULARI (50 SORU) ──────────────────────────────────────────
const s9 = {
  tr: {
    title: '💼 Mülakat Soruları — 50 Soru (Basic/Intermediate/Advanced)',
    blocks: [
      {
        type: 'simple-box', emoji: '🎓',
        content: 'Mülakatta "Selenium nedir?" sorusu yerine "Production\'da şu hatayla karşılaştın, ne yaparsın?" sorusu sorulur. Bu 50 soru, gerçek iş hayatından senaryolar içeriyor.',
      },
      {
        type: 'interview-questions',
        topic: 'Selenium WebDriver',
        questions: [
          // BASIC (15 soru)
          {
            level: 'basic',
            q: { tr: 'Bir web formunu test ediyorsunuz ve testiniz bazen "NoSuchElementException" veriyor ama sayfayı elle açtığınızda her şey normal görünüyor. Nedeni ne olabilir?', en: 'Your web form test sometimes throws NoSuchElementException but the page looks fine when opened manually. What could be the cause?' },
            a: { tr: 'Bu hatanın en yaygın sebebi timing (zamanlama) sorunudur. Sayfa görsel olarak hazır görünse bile DOM elementleri JavaScript tarafından sonradan ekleniyor olabilir. Çözüm: Thread.sleep() yerine WebDriverWait + ExpectedConditions.visibilityOfElementLocated() veya elementToBeClickable() kullanın. Java\'da FluentWait ile polling interval da belirleyebilirsiniz. Ikinci olası sebep iframe: element bir iframe içindeyse önce driver.switchTo().frame() yapılmalıdır. Üçüncü sebep: farklı ağ hızları — CI/CD ortamında lokal makineden daha yavaş olabilir, timeout süresini artırın.', en: 'The most common cause is a timing issue. Even if the page appears visually ready, DOM elements may be added later by JavaScript. Solution: use WebDriverWait + ExpectedConditions instead of Thread.sleep(). Also check for iframes — call switchTo().frame() first. Another cause: CI/CD runs slower than local, so increase the timeout.' },
          },
          {
            level: 'basic',
            q: { tr: 'Java\'da By.id, By.cssSelector ve By.xpath arasındaki performans farkını açıklayın. Hangisini ne zaman tercih edersiniz?', en: 'Explain the performance difference between By.id, By.cssSelector, and By.xpath in Java. When do you prefer each?' },
            a: { tr: 'By.id en hızlıdır çünkü tarayıcılar document.getElementById() ile O(1) lookup yapar. By.cssSelector ikinci sırada, modern tarayıcı motoru (V8/Blink) CSS query\'leri native olarak optimize eder. By.xpath en yavaşıdır çünkü DOM\'un tamamını traverse edebilir. Tercih sırası: 1) ID varsa By.id, 2) yoksa By.cssSelector, 3) gerektiğinde By.xpath (üst-alt ilişkisi veya metin arama). Java\'da By.xpath("//button[text()=\'Login\']") gibi metin aramaları için XPath kaçınılmazdır.', en: 'By.id is fastest — O(1) via document.getElementById(). By.cssSelector is second — browsers natively optimize CSS queries. By.xpath is slowest — can traverse the entire DOM. Preference order: 1) By.id if ID exists, 2) By.cssSelector otherwise, 3) By.xpath only when necessary (parent-child relationship or text search).' },
          },
          {
            level: 'basic',
            q: { tr: 'sendKeys() ile type() arasındaki fark nedir? JavaScript inject ile sendKeys() arasında ne tercih edersiniz?', en: 'What is the difference between sendKeys() and JavaScript injection for typing? Which do you prefer?' },
            a: { tr: 'sendKeys() gerçek klavye olayları (keydown, keypress, keyup) tetikler — bu daha gerçekçidir ve event listener\'lar tetiklenir. JavaScript ile değer atama (arguments[0].value=\'text\') ise event tetiklemez, sadece DOM değerini değiştirir. JavaScript tercih edilmesi gereken durumlar: element hidden veya disabled iken, React controlled input\'larda sendKeys() bazen çalışmaz (onChange tetiklenmez), date picker gibi native JS bileşenleri. Best practice: önce sendKeys() dene, çalışmazsa JS fallback kullan.', en: 'sendKeys() triggers real keyboard events (keydown, keypress, keyup) — more realistic and triggers event listeners. JavaScript value injection changes the DOM value without firing events. Use JS when: element is hidden/disabled, React controlled inputs where sendKeys() may not trigger onChange, or native date pickers. Best practice: try sendKeys() first, fall back to JS.' },
          },
          {
            level: 'basic',
            q: { tr: 'driver.close() ile driver.quit() arasındaki fark nedir? Testlerde hangisini ne zaman kullanmalısınız?', en: 'What is the difference between driver.close() and driver.quit()? When should each be used in tests?' },
            a: { tr: 'driver.close() yalnızca aktif (focused) tarayıcı penceresini kapatır ama WebDriver session\'ı ve diğer pencereleri açık bırakır. driver.quit() ise tüm pencereleri kapatır ve WebDriver session\'ını tamamen sonlandırır. Test teardown\'da (AfterMethod/after) her zaman driver.quit() kullanın, aksi takdirde süreç bellekte kalır. @AfterMethod\'da driver != null kontrolü yapın: ChromeDriver process crash\'i yakalamak için if (driver != null) driver.quit() yazın.', en: 'driver.close() closes only the active window but keeps the WebDriver session and other windows open. driver.quit() closes all windows and terminates the entire WebDriver session. Always use driver.quit() in test teardown (@AfterMethod/after), otherwise the process remains in memory. Add null check: if (driver != null) driver.quit().' },
          },
          {
            level: 'basic',
            q: { tr: 'Implicit Wait ve Explicit Wait\'i aynı anda kullanabilir misiniz? Ne gibi sorunlara yol açar?', en: 'Can you use Implicit Wait and Explicit Wait together? What problems can this cause?' },
            a: { tr: 'Teknik olarak kullanabilirsiniz ama KESİNLİKLE tavsiye edilmez. İkisi birlikte kullanıldığında, Explicit Wait\'in beklediği süre + Implicit Wait\'in beklediği süre toplanabilir ve beklenmedik uzun timeout\'lara yol açar. Örnek: Implicit 10sn + Explicit 15sn beklediğinizde bazı durumlarda 25sn bekliyorsunuz. Selenium resmi dokümantasyonu "mixing waits is not recommended" diyor. Best practice: Yalnızca Explicit Wait kullanın, Implicit Wait\'i sıfıra ayarlayın.', en: 'Technically yes, but it is strongly NOT recommended. When used together, timeouts can compound — Implicit + Explicit wait times can add up leading to unexpected long waits. Example: 10s implicit + 15s explicit can result in 25s wait. Selenium docs explicitly say "mixing waits is not recommended." Best practice: use only Explicit Wait and set Implicit Wait to zero.' },
          },
          {
            level: 'basic',
            q: { tr: 'Select dropdown\'da "option" elementinin hem ID\'si hem de value\'su olmadığında nasıl seçim yaparsınız?', en: 'How do you select an option from a dropdown when neither the option ID nor value is available?' },
            a: { tr: 'Select sınıfının 3 yöntemi var: selectByVisibleText() görünen metne göre seçer — en yaygın yöntem. selectByValue() value attribute\'una göre seçer. selectByIndex() sırasına göre seçer (0\'dan başlar). Value ve ID yoksa, selectByVisibleText("Türkiye") kullanılır. Eğer custom dropdown ise (div/ul ile yapılmış), Actions ile click yapıp listeden element seçmek gerekir. Python\'da select_by_visible_text(), TypeScript\'te sendKeys() ile görünen metin yazılır.', en: 'The Select class has 3 methods: selectByVisibleText() selects by visible text — most common. selectByValue() uses the value attribute. selectByIndex() uses position (0-based). When neither value nor ID exists, use selectByVisibleText("Turkey"). For custom dropdowns (div/ul based), use Actions to click and select from the list. Python: select_by_visible_text(), TypeScript: sendKeys() with visible text.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir checkbox\'ın işaretli olup olmadığını kontrol edip, eğer işaretli değilse işaretlemek için nasıl kod yazarsınız?', en: 'How do you check if a checkbox is checked and click it only if it\'s not already checked?' },
            a: { tr: 'element.isSelected() metodu checkbox, radio button ve select option\'ları için true/false döndürür. Java\'da: WebElement cb = driver.findElement(By.id("agree")); if (!cb.isSelected()) { cb.click(); } — bu pattern idempotent test yazmanızı sağlar ve test iki kez çalışsa bile aynı sonucu verir. Python\'da is_selected(), TypeScript\'te isSelected() kullanılır. Boolean durumu get_attribute("checked") ile de kontrol edilebilir.', en: 'element.isSelected() returns true/false for checkboxes, radio buttons, and select options. Java: WebElement cb = driver.findElement(By.id("agree")); if (!cb.isSelected()) { cb.click(); } — this pattern makes tests idempotent. Python: is_selected(), TypeScript: isSelected(). Boolean state can also be checked via get_attribute("checked").' },
          },
          {
            level: 'basic',
            q: { tr: 'Tarayıcıda birden fazla sekme açıldığında Selenium bu sekmeleri nasıl yönetir?', en: 'How does Selenium manage multiple browser tabs when they are open?' },
            a: { tr: 'Her pencere/sekmenin benzersiz bir "window handle" (String UUID) vardır. driver.getWindowHandles() tüm handle\'ları Set<String> olarak döndürür; driver.getWindowHandle() aktif pencereyi döndürür. Yeni sekmeye geçmek için döngüde mevcut handle\'ı atla ve diğerine switchTo().window(handle) yap. Selenium 4\'te driver.switchTo().newWindow(WindowType.TAB) ile programatik sekme açılabilir. Test sonunda her zaman açılan sekmeleri kapatıp ana pencereye dönün.', en: 'Each window/tab has a unique "window handle" (String UUID). driver.getWindowHandles() returns all handles as Set<String>; driver.getWindowHandle() returns the current window. To switch to a new tab, iterate handles, skip the current one, and call switchTo().window(handle). Selenium 4 allows programmatic new tabs via switchTo().newWindow(WindowType.TAB). Always close opened tabs and return to main window at test end.' },
          },
          {
            level: 'basic',
            q: { tr: 'Selenium ile ekran görüntüsü almak için hangi arayüz kullanılır ve nasıl uygulanır?', en: 'Which interface is used for taking screenshots in Selenium and how is it implemented?' },
            a: { tr: 'TakesScreenshot arayüzü kullanılır. WebDriver\'ı cast etmek gerekir: TakesScreenshot ts = (TakesScreenshot) driver; File screenshot = ts.getScreenshotAs(OutputType.FILE); FileUtils.copyFile(screenshot, new File("test.png")). Python\'da driver.save_screenshot("test.png") veya driver.get_screenshot_as_file("test.png"). TypeScript\'te driver.takeScreenshot() Base64 string döndürür, fs ile dosyaya yazılır. Test hata verdiğinde otomatik ekran görüntüsü için @AfterMethod\'da try-catch kullanılır.', en: 'The TakesScreenshot interface is used. Cast WebDriver: TakesScreenshot ts = (TakesScreenshot) driver; File screenshot = ts.getScreenshotAs(OutputType.FILE); FileUtils.copyFile(screenshot, new File("test.png")). Python: driver.save_screenshot("test.png"). TypeScript: driver.takeScreenshot() returns Base64 string, write with fs. For auto-screenshot on failure, use try-catch in @AfterMethod.' },
          },
          {
            level: 'basic',
            q: { tr: 'JavaScript\'i Selenium testinizde çalıştırmanız gereken 3 farklı durum örneği verin.', en: 'Give 3 different situations where you need to execute JavaScript in your Selenium test.' },
            a: { tr: '1) Scroll: element viewport dışındaysa js.executeScript("arguments[0].scrollIntoView(true)", el) — Actions.moveToElement() MoveTargetOutOfBoundsException verebilir. 2) Gizli element: display:none olan elemente tıklamak: js.executeScript("arguments[0].click()", hiddenEl) — normal click() ElementNotInteractableException verir. 3) Input değeri: Date picker veya readonly input\'a değer atama: js.executeScript("arguments[0].value=\'2024-01-15\'", dateInput) — sendKeys() native takvimi açabilir. 4) Ekstra: Sayfa hazır mı kontrol: (String)js.executeScript("return document.readyState") == "complete".', en: '1) Scroll: js.executeScript("arguments[0].scrollIntoView(true)", el) when element is outside viewport. 2) Hidden element: js.executeScript("arguments[0].click()", hiddenEl) when normal click() throws ElementNotInteractableException. 3) Input value: js.executeScript("arguments[0].value=\'2024-01-15\'", dateInput) for date pickers or readonly inputs. 4) Bonus: Page ready check: (String)js.executeScript("return document.readyState") == "complete".' },
          },
          {
            level: 'basic',
            q: { tr: 'Cookie ile giriş yaparak test süresini nasıl kısaltırsınız? Hangi senaryolarda bunu kullanırsınız?', en: 'How do you shorten test time by using cookies for login? In which scenarios do you use this?' },
            a: { tr: 'Login ekranından geçmeden direkt oturumu cookie olarak enjekte edersiniz. Önce normal giriş yapıp session cookie\'yi alın: driver.manage().getCookieNamed("session"). Sonraki testlerde: driver.get(baseUrl) → driver.manage().addCookie(savedCookie) → driver.navigate().refresh(). Bu yöntem her test için UI login\'i atlar ve test süresini 5-10 saniye kısaltır. Uygun senaryolar: hesap gerektiren sayfalarda negatif test, checkout, profil gibi authenticated sayfalar. Sınırlamalar: cookie expire süresi, HTTPS sitelerde secure flag.', en: 'Instead of going through the login screen, inject a session cookie directly. First do a normal login and capture: driver.manage().getCookieNamed("session"). Then for subsequent tests: driver.get(baseUrl) → driver.manage().addCookie(savedCookie) → driver.navigate().refresh(). This skips UI login for each test and saves 5-10 seconds. Good for: authenticated pages like checkout, profile, account settings. Limitations: cookie expiry, secure flag on HTTPS sites.' },
          },
          {
            level: 'basic',
            q: { tr: 'getText() boş string döndürürse ne yaparsınız? Bu durumun yaygın sebepleri nelerdir?', en: 'What do you do when getText() returns an empty string? What are common causes?' },
            a: { tr: 'getText() boş döndürmesinin başlıca nedenleri: 1) Element görünmüyor (hidden): getInnerText yalnızca visible elementi döndürür. Çözüm: getAttribute("textContent") veya getAttribute("innerHTML") kullan. 2) Element henüz yüklenmemiş: Explicit Wait ekle. 3) Shadow DOM: shadowRoot içindeki elementler normal getText() ile alınamaz, JS executeScript gerekir. 4) Dinamik içerik: text AJAX sonrası geliyor olabilir. Kontrol yöntemi: getAttribute("innerText") dene, getText() ile karşılaştır.', en: 'Common causes: 1) Element is hidden: getText() returns empty for non-visible elements. Fix: use getAttribute("textContent") or getAttribute("innerHTML"). 2) Element not loaded yet: add Explicit Wait. 3) Shadow DOM: elements inside shadowRoot cannot be accessed by normal getText(), JS is required. 4) Dynamic content: text may arrive after AJAX. Diagnostic: try getAttribute("innerText") and compare with getText().' },
          },
          {
            level: 'basic',
            q: { tr: 'Selenium testlerinde Page Object Model (POM) neden kullanılır? Onsuz ne gibi sorunlar çıkar?', en: 'Why is Page Object Model (POM) used in Selenium tests? What problems occur without it?' },
            a: { tr: 'POM olmadan her test dosyasına locator hardcode yazılır. Bir element\'in ID\'si değişirse onlarca test dosyasını düzenlemeniz gerekir (maintenance hell). POM ile her sayfanın bir class\'ı olur, locator\'lar tek yerde tanımlanır. Test metodları UI detaylarına değil, iş mantığına odaklanır: loginPage.login(email, pass) gibi. Java\'da Pages klasörü altında LoginPage, CartPage gibi class\'lar, Python\'da aynı pattern. Avantajlar: test okunabilirliği, DRY prensibi, tek nokta değişiklik, takım çalışması kolaylığı.', en: 'Without POM, locators are hardcoded in every test file. If one element ID changes, dozens of files need updating (maintenance hell). With POM, each page has a class and locators are defined in one place. Test methods focus on business logic, not UI details: loginPage.login(email, pass). Structure: Pages folder with LoginPage, CartPage, etc. Benefits: readability, DRY principle, single point of change, team collaboration.' },
          },
          {
            level: 'basic',
            q: { tr: 'Selenium\'da headless modda Chrome çalıştırmak için ne yaparsınız? CI/CD\'de neden önemlidir?', en: 'How do you run Chrome in headless mode with Selenium? Why is it important in CI/CD?' },
            a: { tr: 'Java\'da ChromeOptions options = new ChromeOptions(); options.addArguments("--headless"); driver = new ChromeDriver(options). Python\'da options.add_argument("--headless"). TypeScript\'te builder.withCapabilities({browserName:"chrome", "goog:chromeOptions":{args:["--headless"]}}). CI/CD\'de önemli çünkü: 1) Linux sunucularda display yok, headless olmadan hata alınır 2) Daha hızlı çalışır 3) Kaynak tüketimi az. Not: --headless=new (Headless Shell) Chrome 112+ için önerilen.', en: 'Java: ChromeOptions options = new ChromeOptions(); options.addArguments("--headless"); driver = new ChromeDriver(options). Python: options.add_argument("--headless"). Important for CI/CD because: 1) Linux servers have no display — headless mode is required 2) Faster execution 3) Lower resource consumption. Note: --headless=new (Headless Shell) is recommended for Chrome 112+.' },
          },
          {
            level: 'basic',
            q: { tr: 'XPath\'de absolute ve relative XPath arasındaki fark nedir? Hangisi neden tercih edilir?', en: 'What is the difference between absolute and relative XPath? Which is preferred and why?' },
            a: { tr: 'Absolute XPath: /html/body/div[1]/form/input[2] — kök\'ten (html) tam yolu verir. Herhangi bir DOM değişikliğinde kırılır. Relative XPath: //input[@id="username"] — herhangi bir yerden başlar, daha esnek. Absolute XPath ASLA kullanılmamalıdır çünkü: DOM\'a yeni bir div eklenirse tüm path kayar, Bootstrap/React gibi framework\'ler sıkça DOM değiştirir. Relative tercih edilmeli: //button[text()="Login"], //div[@class="form"]//input[@type="email"].', en: 'Absolute XPath: /html/body/div[1]/form/input[2] — full path from root. Breaks on any DOM change. Relative XPath: //input[@id="username"] — starts from anywhere, more flexible. Never use absolute XPath because: adding a new div shifts the entire path, frameworks like Bootstrap/React frequently change DOM. Always use relative: //button[text()="Login"], //div[@class="form"]//input[@type="email"].' },
          },
          // INTERMEDIATE (20 soru)
          {
            level: 'intermediate',
            q: { tr: 'CI/CD pipeline\'ında Selenium testleriniz sabah başarılı, öğlen başarısız oluyor. Olası nedenleri ve debug stratejinizi anlatın.', en: 'Your Selenium tests pass in the morning CI/CD but fail at noon. What are possible causes and your debug strategy?' },
            a: { tr: 'Bu "flaky test" klasik senaryosudur. Olası nedenler: 1) Test verisi kirliliği — sabah taze veritabanı, öğlen başkası veri değiştirdi. 2) Zamana bağlı testler — sabah 9\'da çalışan "bugünün tarihi" kontrolü öğlen farklı. 3) Paralel çakışma — aynı hesabı kullanan testler birbirini etkiliyor. 4) Timeout yetersizliği — öğlen trafik yoğunluğunda sayfa daha yavaş. Debug stratejisi: screenshot on failure, video kaydı, test log\'larını detaylı incele, local\'de aynı saatte çalıştır.', en: 'This is the classic "flaky test" scenario. Possible causes: 1) Test data pollution — fresh DB in morning, others changed data by noon. 2) Time-dependent tests — "today\'s date" check works at 9am but not noon. 3) Parallel conflicts — tests sharing the same account interfere. 4) Insufficient timeouts — pages are slower under noon traffic. Debug strategy: screenshot on failure, video recording, detailed log analysis, reproduce at same time of day locally.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'StaleElementReferenceException\'ı handle etmek için retry mekanizması nasıl yazılır? Java ve Python\'da gösterin.', en: 'How do you write a retry mechanism for StaleElementReferenceException? Show in Java and Python.' },
            a: { tr: 'Bu hata SPA (React/Vue) uygulamalarda çok yaygındır. Çözüm: element\'i her kullanmadan önce yeniden bul ve try-catch ile retry yap.',
            code: `// Java — Retry helper
public static void clickWithRetry(WebDriver driver, By locator, int retries) {
    for (int i = 0; i < retries; i++) {
        try {
            driver.findElement(locator).click();
            return; // Başarılı, çık
        } catch (StaleElementReferenceException e) {
            if (i == retries - 1) throw e; // Son denemede fırlat
            // Kısa bekle ve yeniden dene
        }
    }
}

// Python
def click_with_retry(driver, locator, retries=3):
    for i in range(retries):
        try:
            driver.find_element(*locator).click()
            return
        except StaleElementReferenceException:
            if i == retries - 1:
                raise
            time.sleep(0.5)` },
          },
          {
            level: 'intermediate',
            q: { tr: 'React/Vue uygulamasında input\'a sendKeys() ile veri girince onChange event tetiklenmiyor. Nasıl çözersiniz?', en: 'sendKeys() doesn\'t trigger onChange in a React/Vue input. How do you solve this?' },
            a: { tr: 'React controlled component\'lerde sendKeys() bazen React\'ın synthetic event sistemini bypass eder. Çözümler: 1) Önce input\'u tıkla, sonra her karakteri ayrı ayrı gönder: element.click(); for (char c : text.toCharArray()) { element.sendKeys(String.valueOf(c)); } 2) Actions API: new Actions(driver).click(el).sendKeys(el, text).perform() 3) JS ile React event tetikle: executeScript("var el=arguments[0]; el.value=arguments[1]; el.dispatchEvent(new Event(\'input\',{bubbles:true}))", el, text) 4) Python: ActionChains kullan.',
            code: `// Java — React input için
Actions actions = new Actions(driver);
actions.click(inputElement)
       .sendKeys(inputElement, "text")
       .perform();

// Python
from selenium.webdriver.common.action_chains import ActionChains
ActionChains(driver).click(input_el).send_keys("text").perform()` },
          },
          {
            level: 'intermediate',
            q: { tr: 'Selenium Grid\'i konfigüre edip Docker ile çalıştırdınız. Testler Grid\'de hata veriyor ama localde çalışıyor. Nasıl debug edersiniz?', en: 'You set up Selenium Grid with Docker and tests fail on Grid but work locally. How do you debug?' },
            a: { tr: 'Grid debug için sıralı yaklaşım: 1) Grid console\'a bağlan: http://localhost:4444/ui — session yaratılıyor mu, hangi Node\'a gidiyor? 2) VNC veya noVNC ekranını izle: selenium/node-chrome-debug image ile canlı izleme. 3) RemoteWebDriver capabilities\'i doğrula: platformName, browserVersion eşleşiyor mu? 4) Ağ sorunları: Docker container\'lar arası hostname çözümlemesi. 5) Shared path: screenshot ve dosyaların Grid node\'da oluştuğunu unutmayın, local path geçerli değil. 6) Selenium Grid log\'larını incele: --log-level DEBUG ile başlatın.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir ödeme sayfasını test ediyorsunuz ve Stripe iframe içinde kart numarası alanı var. Nasıl yaklaşırsınız?', en: 'You\'re testing a payment page with Stripe card number field inside an iframe. What is your approach?' },
            a: { tr: 'Stripe, kart numarası alanını güvenlik için iframe içine koyar. Yaklaşım: 1) iframe\'i bul: driver.findElement(By.cssSelector("iframe[name*=\'stripe\']")) 2) switchTo().frame(stripeIframe) 3) input alanını bul ve doldur: driver.findElement(By.name("cardnumber")).sendKeys("4111111111111111") 4) driver.switchTo().defaultContent() ile ana sayfaya dön 5) Diğer Stripe fieldları (expiry, CVV) için aynı iframe\'e tekrar gir. Dikkat: Stripe production iframe\'lerde otomasyon kısıtlıyor — test ortamı için Stripe\'ın test modu URL\'lerini kullanın.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Test izolasyonunu sağlamak için her testten önce veritabanını sıfırlamak yerine hangi Selenium yaklaşımlarını kullanabilirsiniz?', en: 'Instead of resetting the database before each test, what Selenium-level approaches can you use for test isolation?' },
            a: { tr: '1) Her test kendi test kullanıcısını oluşturur (timestamp bazlı unique email) — paralel çakışmayı önler. 2) Cookie injection ile login — her test fresh oturum açar. 3) API önce kurulum, Selenium sadece UI doğrulama: API ile veri oluştur, UI ile kontrol et. 4) Test veri factory: TestNG DataProvider veya pytest fixtures ile unique veri üret. 5) Soft delete: testler veri silerken gerçekten silmez, is_deleted=true flag koyar. Bu yöntemler DB reset olmadan test izolasyonu sağlar.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Python\'da Selenium testlerini pytest ile çalıştırıyorsunuz. fixture scope\'larını (function/class/module/session) nasıl kullanırsınız?', en: 'You run Selenium tests with pytest in Python. How do you use fixture scopes (function/class/module/session)?' },
            a: { tr: 'Scope seçimi kritiktir: scope="function" (default) — her test için yeni driver, tam izolasyon, yavaş. scope="class" — aynı class\'taki testler driver\'ı paylaşır, test sırası önemli. scope="module" — aynı dosyadaki tüm testler paylaşır. scope="session" — tüm test oturumu boyunca tek driver, EN HIZLI ama izolasyon yok, test sırasına bağımlı. Best practice: Login gibi pahalı setup\'lar için session scope, kritik izolasyon gerektiren testler için function scope. conftest.py\'da @pytest.fixture(scope="function") def driver(): yield webdriver.Chrome() olarak tanımlanır.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Dinamik olarak değişen bir dropdown\'ın tüm seçeneklerini okuyup bir Excel\'e yazmak istiyorsunuz. Java\'da nasıl yaparsınız?', en: 'You want to read all options from a dynamically changing dropdown and write them to Excel in Java. How?' },
            a: { tr: 'Select wrapper + Apache POI kombinasyonu: Select select = new Select(driver.findElement(By.id("country"))); List<WebElement> options = select.getOptions(); Apache POI ile Excel: Workbook wb = new XSSFWorkbook(); Sheet sheet = wb.createSheet("Options"); options.forEach((opt, i) -> { Row row = sheet.createRow(i); row.createCell(0).setCellValue(opt.getText()); row.createCell(1).setCellValue(opt.getAttribute("value")); }); wb.write(new FileOutputStream("options.xlsx")). Dinamik dropdown\'da (AJAX): önce trigger elementine tıkla, dropdown açılana kadar bekle, sonra oku.',
            code: `Select select = new Select(driver.findElement(By.id("country")));
List<WebElement> options = select.getOptions();
for (WebElement opt : options) {
    System.out.printf("Text: %s, Value: %s%n",
        opt.getText(), opt.getAttribute("value"));
}` },
          },
          {
            level: 'intermediate',
            q: { tr: 'TestNG\'de paralel test çalıştırma nasıl konfigüre edilir? Thread safety nasıl sağlanır?', en: 'How do you configure parallel test execution in TestNG? How do you ensure thread safety?' },
            a: { tr: 'testng.xml\'de: <suite parallel="methods" thread-count="4"> veya parallel="classes". Thread safety için en kritik nokta: WebDriver\'ı ThreadLocal ile yönet. Her thread\'in kendi driver instance\'ı olmalı: private static ThreadLocal<WebDriver> driverHolder = new ThreadLocal<>();. @BeforeMethod\'da driverHolder.set(new ChromeDriver()), @AfterMethod\'da driverHolder.get().quit(). Page Object\'lerde driver parametreli constructor kullan. Test data\'sını da thread-safe yönet: her thread kendi kullanıcı datasını kullansın.',
            code: `// ThreadLocal WebDriver
public class DriverManager {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    public static WebDriver getDriver() { return driver.get(); }
    public static void setDriver(WebDriver d) { driver.set(d); }
    public static void quit() { driver.get().quit(); driver.remove(); }
}` },
          },
          {
            level: 'intermediate',
            q: { tr: 'Selenium testiniz bir shadow DOM elementi bulamıyor. Shadow DOM nedir ve nasıl erişirsiniz?', en: 'Your Selenium test can\'t find a Shadow DOM element. What is Shadow DOM and how do you access it?' },
            a: { tr: 'Shadow DOM, web component\'lerinde gizlenmiş bir DOM alt ağacıdır. Normal driver.findElement() Shadow Root\'un içine giremez. Selenium 4 ile: WebElement shadowHost = driver.findElement(By.cssSelector("my-component")); SearchContext shadowRoot = shadowHost.getShadowRoot(); WebElement innerEl = shadowRoot.findElement(By.cssSelector("input")); Eski yöntem (JS): WebElement shadowRoot = (WebElement) js.executeScript("return arguments[0].shadowRoot", shadowHost); Birden fazla iç içe shadow: her seviye için aynı işlemi tekrarlayın.',
            code: `// Selenium 4 — Shadow DOM
WebElement shadowHost = driver.findElement(By.cssSelector("my-input"));
SearchContext shadowRoot = shadowHost.getShadowRoot();
WebElement input = shadowRoot.findElement(By.cssSelector("input"));
input.sendKeys("test");` },
          },
          {
            level: 'intermediate',
            q: { tr: 'Dosya yükleme işlemini Selenium ile nasıl test edersiniz? Upload butonu JavaScript ile yapılandırılmışsa ne yaparsınız?', en: 'How do you test file upload with Selenium? What if the upload button is built with JavaScript?' },
            a: { tr: 'Native input[type="file"] için: driver.findElement(By.id("fileInput")).sendKeys("/path/to/file.jpg") — tarayıcı dialog açılmaz, direkt dosya yolu girilir. Robot class (popup açılırsa): Robot robot = new Robot(); StringSelection ss = new StringSelection("/path/file"); Clipboard.setContents(ss, null); robot.keyPress(KeyEvent.VK_ENTER). Custom JS upload button: önce input elementini görünür yap: js.executeScript("arguments[0].style.display=\'block\'", hiddenInput); sonra sendKeys. Python\'da aynı, driver.find_element(By.ID, "fileInput").send_keys("/path/file.jpg").' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Selenium 4 ile Chrome DevTools Protocol (CDP) nasıl kullanılır? Hangi senaryolarda işe yarar?', en: 'How do you use Chrome DevTools Protocol (CDP) with Selenium 4? In which scenarios is it useful?' },
            a: { tr: 'Selenium 4, WebSocket üzerinden CDP komutları gönderme imkânı sağlar. Kullanım senaryoları: 1) Network throttling: NetworkConditions ile 3G simülasyonu. 2) Geolocation override: Harita testleri için konumu taklit et. 3) Basic Auth popup: credentials direkt CDP ile gönder. 4) Console log yakalama: LoggingPreferences ile JS hataları topla. 5) Request intercept: API call mock et.',
            code: `// Java — CDP ile Geolocation
((ChromeDriver)driver).executeCdpCommand(
    "Emulation.setGeolocationOverride",
    Map.of("latitude", 41.0082, "longitude", 28.9784, "accuracy", 1)
);` },
          },
          {
            level: 'intermediate',
            q: { tr: 'Uzun çalışan bir Selenium test suite\'inde memory leak önlemek için hangi pratikleri uygularsınız?', en: 'What practices do you apply to prevent memory leaks in long-running Selenium test suites?' },
            a: { tr: '1) Her test sonrası driver.quit() — process hayatta kalmasın. @AfterMethod finally bloğunda. 2) ThreadLocal driver temizleme: driver.remove() çağır. 3) implicitlyWait süresini makul tut — 30+ saniye heap\'i şişirir. 4) Screenshot\'ları sınırlı tut — büyük PNG dosyaları bellek doldurur. 5) Tarayıcı profil cache\'ini temizle: ChromeOptions ile --disable-gpu, --no-sandbox, --disable-extensions. 6) Parallel thread sayısını CPU core sayısından fazla tutma. 7) JVM heap monitoring: Jenkins\'te GC log aktifleştir.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Selenium ile API test yapmak mümkün mü? Evet ise ne zaman mantıklı olur?', en: 'Is it possible to do API testing with Selenium? If yes, when does it make sense?' },
            a: { tr: 'Selenium tarayıcı otomasyonu için tasarlanmıştır, REST API için değil. Ancak bazı durumlar mantıklı: 1) API\'yi tetikleyip UI\'da sonucu doğrulama: REST Assured/requests ile API çağrısı yapıp, Selenium ile UI\'da değişikliği kontrol et. 2) Oturum setup: API login yapıp session token\'ı cookie olarak Selenium\'a enjekte et. 3) Test verisi oluşturma: Selenium testinden önce API ile data oluştur. Saf API test için Selenium kullanılmamalı — REST Assured (Java), requests/pytest (Python) daha uygundur.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'pytest-selenium veya selenium-wire gibi eklentiler ne işe yarar? Projede nasıl kullandınız?', en: 'What are pytest-selenium and selenium-wire plugins useful for? How have you used them in projects?' },
            a: { tr: 'pytest-selenium: driver fixture\'larını otomatik yönetir, browser=chrome parametresiyle CLI\'dan browser seçilir, Sauce Labs/BrowserStack entegrasyonu. selenium-wire: Selenium\'u proxy olarak kullanıp HTTP istek/cevaplarını intercept eder, request header/body inceleme, response mock, network log analizi. Kullanım örneği: selenium-wire ile API token capture: driver.requests ile token yakalanır, başka testte kullanılır. Ayrıca selenium-stealth: bot detection bypass için.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir tablonun tüm satırlarını okuyup belirli bir sütundaki değere göre bir satıra tıklamak için nasıl kod yazarsınız?', en: 'How do you write code to read all table rows and click on a row based on a specific column value?' },
            a: { tr: 'Tablo iterasyonu için findElements + getText kombinasyonu kullanılır.',
            code: `// Java — Tabloda satır bul ve tıkla
List<WebElement> rows = driver.findElements(By.cssSelector("table tbody tr"));
for (WebElement row : rows) {
    List<WebElement> cells = row.findElements(By.tagName("td"));
    // 2. sütun (index 1) "Aktif" ise tıkla
    if (cells.size() > 1 && cells.get(1).getText().equals("Aktif")) {
        cells.get(0).click(); // 1. sütuna tıkla
        break;
    }
}

# Python
rows = driver.find_elements(By.CSS_SELECTOR, "table tbody tr")
for row in rows:
    cells = row.find_elements(By.TAG_NAME, "td")
    if len(cells) > 1 and cells[1].text == "Aktif":
        cells[0].click()
        break` },
          },
          {
            level: 'intermediate',
            q: { tr: 'ExtentReports veya Allure ile Selenium test raporu nasıl oluşturulur? Neleri içermeli?', en: 'How do you generate a Selenium test report with ExtentReports or Allure? What should it include?' },
            a: { tr: 'Allure (önerilen): @Attachment ile screenshot, @Step ile adım loglama, @Severity ile önceliklendirme. Maven\'da allure-testng dependency + allure:report komut. Rapor içermeli: test adı, başarı/başarısızlık, süre, hata mesajı + stack trace, başarısız testin ekran görüntüsü, test parametreleri. ExtentReports: ExtentHtmlReporter + ExtentTest.addScreenCaptureFromPath. @AfterMethod\'da başarısız testleri yakala: ITestResult result ile status kontrolü. CI\'da: Jenkins Allure plugin ile otomatik rapor yayınlama.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'BrowserStack veya Sauce Labs gibi cloud platformlarda Selenium testleri nasıl çalıştırılır?', en: 'How do you run Selenium tests on cloud platforms like BrowserStack or Sauce Labs?' },
            a: { tr: 'RemoteWebDriver\'ı cloud platform URL\'ine yönlendirirsiniz. BrowserStack: URL = "https://username:key@hub-cloud.browserstack.com/wd/hub". Capabilities\'e platformName, browserName, browserVersion, os, os_version eklenir. BrowserStack Automate dashboard\'da video kayıt, screenshot, log otomatik gelir. Sauce Labs: benzer pattern, "sauce:options" namespace. Avantajlar: gerçek cihaz/browser çeşitliliği, paralel test, lokal test için tunnel (BrowserStack Local). Dikkat: credential\'ları environment variable olarak saklayın, kaynak koda yazmayın.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'TypeScript\'te Selenium WebDriver ile async/await kullanırken hata yönetimini nasıl yaparsınız?', en: 'How do you handle errors when using async/await with Selenium WebDriver in TypeScript?' },
            a: { tr: 'TypeScript\'te tüm Selenium metodları Promise döndürür, await ile kullanılır. Hata yönetimi: try-catch bloğu. finally bloğunda driver.quit() her zaman çağırılır. Belirli hata tiplerini yakalamak için error.name veya error.constructor.name kontrol edilir. Timeout hataları için driver.wait(until.elementLocated(locator), ms) ile sarmalanır. Test framework entegrasyonu için mocha/jest\'te async it() blokları kullanılır.',
            code: `async function safeClick(driver: any, locator: any) {
  try {
    const el = await driver.wait(until.elementLocated(locator), 10000);
    await driver.wait(until.elementIsVisible(el), 5000);
    await el.click();
  } catch (error: any) {
    console.error('Click failed:', error.message);
    const img = await driver.takeScreenshot();
    fs.writeFileSync('error.png', img, 'base64');
    throw error;
  }
}` },
          },
          // ADVANCED (15 soru)
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerinde test piramidi nasıl uygulanır? 1000 E2E testiniz var ve çok yavaş — nasıl optimize edersiniz?', en: 'How do you apply the test pyramid with Selenium? You have 1000 E2E tests and they\'re very slow — how do you optimize?' },
            a: { tr: 'Test piramidi pratiği: Unit testler (hızlı) → Integration testler → E2E (az, kritik path). Optimizasyon stratejileri: 1) Paralel çalıştırma: TestNG thread-count="8", pytest-xdist -n 8. 2) Cookie ile login: UI login\'i bypass et, her test 5-10sn kazanır. 3) API setup + UI verify: test data\'yı API ile oluştur, sadece UI\'ı doğrula. 4) Headless mode: ~30% hız artışı. 5) Selective run: @Tag ile smoke/regression ayır, PR\'da smoke, gece regression. 6) Test data factory: unique veri ile DB reset ihtiyacını azalt. 7) Grid: 8 thread ile 1000 test 8x hızlı.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium ile visual regression testing nasıl yapılır? Screenshot karşılaştırma stratejinizi anlatın.', en: 'How do you perform visual regression testing with Selenium? Describe your screenshot comparison strategy.' },
            a: { tr: 'Visual regression: baseline screenshot alınır, her testte yeni screenshot ile karşılaştırılır. Araçlar: Applitools Eyes (AI bazlı, en güçlü), Selenium + AShot + ImageDiff (açık kaynak), percy.io CI entegrasyonu. Strateji: 1) Full page vs element-level screenshot — element daha stabil. 2) Dynamic content masking: tarih, sayaç gibi değişen alanları maskele. 3) Threshold tolerance: %1-2 piksel farkını ignore et. 4) Cross-browser: Chrome ve Firefox\'ta ayrı baseline. Implementasyon: AShot ile sayfayı capture, ImageIO.read ile baseline yükle, pixel diff hesapla, eşiği aşarsa fail.',
            code: `// Java — AShot ile screenshot karşılaştırma
Screenshot screenshot = new AShot()
    .shootingStrategy(ShootingStrategies.viewportPasting(100))
    .takeScreenshot(driver);

BufferedImage baseline = ImageIO.read(new File("baseline.png"));
ImageDiffer differ = new ImageDiffer();
ImageDiff diff = differ.makeDiff(baseline, screenshot.getImage());
Assert.assertFalse(diff.hasDiff(), "Visual regression detected!");` },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerini Kubernetes\'te çalıştırmak için nasıl bir mimari kurarsınız?', en: 'What architecture do you set up to run Selenium tests in Kubernetes?' },
            a: { tr: 'Selenium Grid 4 + Kubernetes: 1) Helm chart ile Selenium Grid deploy: helm install selenium-grid docker-selenium/selenium-grid. 2) Hub bir deployment, Chrome/Firefox node\'ları ayrı deployment. 3) HorizontalPodAutoscaler: test sayısına göre node\'ları scale et. 4) Job/CronJob: test suite\'i Kubernetes Job olarak çalıştır. 5) Persistent Volume: screenshot ve report\'ları sakla. 6) Ingress: Grid console\'u expose et. Alternatif: Zalenium (Docker/K8s için Grid + video kaydı). Avantaj: otomatik scale-out, cost efficiency, izolasyon.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testleri production ortamında çalıştırmak güvenli midir? Hangi önlemleri alırsınız?', en: 'Is it safe to run Selenium tests in production? What precautions do you take?' },
            a: { tr: 'Production\'da Selenium yalnızca read-only smoke test senaryolarında makuldür. Önlemler: 1) Yalnızca GET işlemleri — hiçbir yazma/silme operasyonu. 2) Ayrı test hesabı: production\'da özel test@company.com hesabı. 3) Rate limiting: production\'da arka arkaya request atmayı sınırlandır. 4) Synthetic monitoring: Datadog Synthetics, AWS CloudWatch Synthetics gibi managed çözümler tercih edin. 5) Canary deployment: production\'a tam Selenium suite çalıştırma, yalnızca kritik health check. 6) İzinler: DBA/DevOps onayı olmadan production DB\'e dokunan test yapma.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium ile test etmesi zor olan özellikler nelerdir? Bunlar için hangi alternatif stratejileri kullanırsınız?', en: 'What features are difficult to test with Selenium? What alternative strategies do you use for them?' },
            a: { tr: 'Zor senaryolar ve çözümler: 1) Gerçek zamanlı WebSocket (chat, fiyat güncellemesi): Selenium WebSocket\'i doğrudan izleyemez — Selenium Grid + CDP ya da ayrı WebSocket client. 2) CAPTCHA: test ortamında bypass et veya reCAPTCHA test key kullan. 3) Dosya indirme doğrulaması: ChromeOptions ile download dizini belirle, dosya var mı kontrol et. 4) Email doğrulama: Mailhog, Mailtrap gibi fake SMTP kullan. 5) Push notification: service worker ile mock. 6) 2FA/OTP: test ortamında bypass et veya TOTP secret ile kod üret. 7) Performance: Selenium performans test için değil — JMeter/k6 kullan.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium\'da test verisi yönetimini (test data management) nasıl organize edersiniz? Production verisini nasıl kullanmadan testleri gerçekçi yaparsiniz?', en: 'How do you organize test data management in Selenium? How do you make tests realistic without using production data?' },
            a: { tr: 'Stratejiler: 1) Faker kütüphanesi (Java: datafaker, Python: faker): gerçekçi ama sahte isim/email/adres üret. 2) Builder pattern: test objelerini fluent API ile oluştur: new UserBuilder().withEmail(faker.email()).withRole("admin").build(). 3) Database seeding: test suite başlamadan önce seed script çalıştır. 4) Test-specific data: her testin kendi unique verisini oluştur (timestamp bazlı). 5) Data cleanup: @AfterClass veya @AfterSuite\'te oluşturulan test verilerini temizle. 6) Environment-specific data: prod/staging/test için ayrı config dosyaları.',
            code: `// Java — Faker ile test data
import com.github.javafaker.Faker;
Faker faker = new Faker(new Locale("tr"));
String email = faker.internet().emailAddress();
String name = faker.name().fullName();
String phone = faker.phoneNumber().phoneNumber();` },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium WebDriver Protocol (W3C) ile JSON Wire Protocol arasındaki teknik farkları açıklayın. Bu fark testlerinizi nasıl etkiler?', en: 'Explain the technical differences between W3C WebDriver Protocol and JSON Wire Protocol. How does this affect your tests?' },
            a: { tr: 'JSON Wire Protocol: Selenium\'un kendi tanımladığı HTTP API, tarayıcı sürücülerinin kendi davranışları vardı, standart değildi. W3C WebDriver (RFC 7234): IETF standardı, tüm tarayıcı sürücülerinin aynı davranışı göstermesini zorunlu kılar. Pratik etkiler: 1) Selenium 4 W3C\'dir — eski Desired Capabilities API kaldırıldı, Options (ChromeOptions/FirefoxOptions) kullanılmalı. 2) Actions API yeniden yazıldı — W3C actions daha tutarlı. 3) Relative locators yalnızca W3C\'de mevcut. 4) BrowserStack/Sauce Labs W3C capabilities namespace gerektirir.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerinde flaky test oranını %5\'in altına düşürmek için hangi sistematik yaklaşımı izlersiniz?', en: 'What systematic approach do you follow to bring flaky test rate below 5% in Selenium tests?' },
            a: { tr: 'Sistematik yaklaşım: 1) Flaky test tracking: her CI çalıştırmasında fail/pass oranını logla, %80 altı pass rate = flaky. 2) Root cause kategorileri: timing, test data, selector, environment, test interaction. 3) Timing: tüm Thread.sleep() kaldır, EC ile değiştir. 4) Selector stability: ID > CSS > XPath; DOM\'a bağımlı absolute XPath kaldır. 5) Test izolasyonu: her test kendi verisini oluşturur, ortak veri kullanmaz. 6) Retry mekanizması: @Retry annotation (TestNG) ile 1 kez otomatik retry. 7) Environment stability: Docker ile deterministik test ortamı. 8) Review: flaky testleri tüm PR pipeline\'ında zorunlu geç.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Büyük bir e-ticaret projesinde Selenium test mimarisini sıfırdan tasarlayın. Hangi kararları verirsiniz?', en: 'Design Selenium test architecture from scratch for a large e-commerce project. What decisions do you make?' },
            a: { tr: 'Mimari kararlar: 1) Framework: Java + TestNG + Maven (ekip Java biliyor). 2) Pattern: Page Object Model + Page Factory (@FindBy annotations). 3) Test runner: TestNG XML suite, tag\'lar: @Test(groups={"smoke","regression"}). 4) Raporlama: Allure Reports + Slack entegrasyonu. 5) Driver yönetimi: ThreadLocal WebDriver, DriverFactory class. 6) Config: properties dosyası + environment variable override. 7) CI/CD: Jenkins multibranch pipeline, PR\'da smoke, gece regression. 8) Grid: Selenium Grid 4 + Docker, 10 paralel node. 9) Data: Faker + REST API setup. 10) Monitoring: flaky test dashboard, Grafana.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium Grid ile Docker Compose kurulumunu yapın ve ölçeklenebilir bir paralel test altyapısı oluşturun.', en: 'Set up Selenium Grid with Docker Compose and create a scalable parallel test infrastructure.' },
            a: { tr: 'docker-compose.yml ile minimum kurulum:',
            code: `# docker-compose.yml
version: "3.8"
services:
  selenium-hub:
    image: selenium/hub:4.25.0
    ports:
      - "4442:4442"
      - "4443:4443"
      - "4444:4444"

  chrome:
    image: selenium/node-chrome:4.25.0
    shm_size: 2gb
    depends_on: [selenium-hub]
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    deploy:
      replicas: 4  # 4 paralel Chrome

  firefox:
    image: selenium/node-firefox:4.25.0
    shm_size: 2gb
    depends_on: [selenium-hub]
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443

# docker-compose up -d --scale chrome=8` },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium ile performans testi yapılabilir mi? CDN simülasyonu ve network throttling nasıl uygulanır?', en: 'Can Selenium be used for performance testing? How do you apply CDN simulation and network throttling?' },
            a: { tr: 'Selenium performans testi için tasarlanmamıştır (JMeter/k6 tercih edilmeli). Ancak sınırlı performans bilgisi elde edilebilir: 1) Chrome CDP ile network throttling: NetworkConditions preset (3G, 4G, offline). 2) Navigation Timing API: js.executeScript("return JSON.stringify(window.performance.timing)") ile sayfa yükleme metrikleri. 3) Synthetic monitoring: kritik sayfa yüklenme sürelerini ölç, SLA\'yı assertion ile kontrol et. 4) Memory leak: CDP ile JS heap snapshot al.',
            code: `// Java — CDP Network Throttling
ChromeDriver chrome = (ChromeDriver) driver;
chrome.executeCdpCommand("Network.emulateNetworkConditions", Map.of(
    "offline", false,
    "latency", 100,  // 100ms latency
    "downloadThroughput", 750 * 1024 / 8,  // 750 kb/s
    "uploadThroughput", 250 * 1024 / 8
));` },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium 4\'ün BiDi (Bidirectional) protokol desteği nedir? Gelecekte Selenium\'u nasıl etkiler?', en: 'What is Selenium 4\'s BiDi (Bidirectional) protocol support? How will it affect Selenium\'s future?' },
            a: { tr: 'WebDriver BiDi, W3C\'nin yeni standartıdır. Mevcut WebDriver HTTP protokolü request-response tabanlıdır (tek yönlü). BiDi, WebSocket üzerinden çift yönlü iletişim sağlar. Anlık event streaming: console log, network event, DOM mutation — Playwright\'ın zaten desteklediği özellikler. Pratik kullanım: console.error dinleme, network request/response intercept, element tıklandığında event. Selenium 4.3+ ile Chrome BiDi desteklenir. Gelecekte Selenium ile Playwright arasındaki fark kapanacak: auto-wait, native event streaming, daha stabil testler.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Projenizde Selenium\'dan Playwright\'a geçişe karar verdiniz. Migration planını ve dikkat edilecek noktaları anlatın.', en: 'You\'ve decided to migrate from Selenium to Playwright in your project. Describe the migration plan and key considerations.' },
            a: { tr: 'Migration planı: 1) Audit: kaç test var, hangi browser, hangi dil, özel Selenium özelliği (Grid, CDP) var mı? 2) Pilot: 20-30 kritik test Playwright\'a çevir, karşılaştır. 3) Paralel çalıştırma: hem Selenium hem Playwright çalıştır, sonuçları karşılaştır. 4) Kademeli geçiş: modül modül — Login → Checkout → Admin. Teknik dönüşümler: By.id("x") → page.locator("#x"), WebDriverWait → auto-wait (silinir!), switchTo().frame() → frameLocator(), Actions → locator.hover(). Dikkat: Playwright Java\x27da erken stage, Python/TS daha stabil. TestNG → @playwright/test (TS için). Timeline: 100 test için 2-4 hafta.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerinde accessibility (erişilebilirlik) testini nasıl entegre edersiniz?', en: 'How do you integrate accessibility testing into your Selenium tests?' },
            a: { tr: 'Axe-core kütüphanesi en yaygın yöntemdir. Java: axe-selenium-java bağımlılığı, Python: axe-selenium-python. Kullanım: AxeBuilder ile sayfa analiz edilir, ihlaller (violations) raporlanır. WCAG 2.1 AA/AAA seviyesine göre filtre yapılır. CI entegrasyonu: violations.size() > 0 ise test fail — tüm WCAG ihlallerini violation olarak logla. İmpact seviyeleri: critical, serious, moderate, minor — critical/serious\'ı mutlaka fail et.',
            code: `// Java — Axe ile Accessibility Test
import com.deque.html.axecore.selenium.AxeBuilder;
Results results = new AxeBuilder().analyze(driver);
List<Rule> violations = results.getViolations();
violations.forEach(v ->
    System.out.printf("WCAG Violation: %s — %s%n", v.getId(), v.getDescription())
);
Assert.assertEquals(violations.size(), 0, "Erişilebilirlik ihlali var!");` },
          },
        ],
      },
    ],
  },
  en: {
    title: '💼 Interview Questions — 50 Questions (Basic/Intermediate/Advanced)',
    blocks: [
      {
        type: 'simple-box', emoji: '🎓',
        content: 'Real interviews don\'t ask "what is Selenium?" — they ask "You hit this error in production, what do you do?" These 50 questions cover real-world scenarios.',
      },
      {
        type: 'interview-questions',
        topic: 'Selenium WebDriver',
        questions: [
          { level: 'basic', q: { en: 'Your web form test sometimes throws NoSuchElementException but the page looks fine manually. What could be the cause?' }, a: { en: 'The most common cause is a timing issue. Even if the page appears ready, DOM elements may be added later by JavaScript. Solution: use WebDriverWait + ExpectedConditions instead of Thread.sleep(). Also check for iframes — call switchTo().frame() first. Another cause: CI/CD runs slower than local, increase the timeout.' } },
          { level: 'basic', q: { en: 'Explain the performance difference between By.id, By.cssSelector, and By.xpath. When do you prefer each?' }, a: { en: 'By.id is fastest (O(1) getElementById). By.cssSelector is second — browsers natively optimize CSS queries. By.xpath is slowest — can traverse the entire DOM. Priority: 1) By.id, 2) By.cssSelector, 3) By.xpath only when necessary.' } },
          { level: 'basic', q: { en: 'What is the difference between sendKeys() and JavaScript value injection?' }, a: { en: 'sendKeys() triggers real keyboard events (keydown, keypress, keyup). JavaScript value injection just changes the DOM value without firing events. Use JS when: element is hidden/disabled, React controlled inputs where onChange isn\'t triggered, or native date pickers.' } },
          { level: 'basic', q: { en: 'What is the difference between driver.close() and driver.quit()?' }, a: { en: 'driver.close() closes only the active window but keeps the WebDriver session open. driver.quit() closes all windows and terminates the entire session. Always use driver.quit() in teardown; add null check: if (driver != null) driver.quit().' } },
          { level: 'basic', q: { en: 'Can you use Implicit Wait and Explicit Wait together? What problems can this cause?' }, a: { en: 'Technically yes but strongly NOT recommended. Timeouts can compound — Implicit + Explicit can add up, causing unexpected long waits. Selenium docs say "mixing waits is not recommended." Best practice: use only Explicit Wait and set Implicit Wait to zero.' } },
          { level: 'basic', q: { en: 'How do you select a dropdown option when neither ID nor value is available?' }, a: { en: 'Select class has 3 methods: selectByVisibleText(), selectByValue(), selectByIndex(). When neither ID nor value exists, use selectByVisibleText("Turkey"). For custom dropdowns (div/ul based), use Actions to click and select from list.' } },
          { level: 'basic', q: { en: 'How do you check if a checkbox is checked and click it only if it\'s unchecked?' }, a: { en: 'element.isSelected() returns true/false for checkboxes, radio buttons, and select options. Pattern: if (!cb.isSelected()) { cb.click(); } — makes tests idempotent.' } },
          { level: 'basic', q: { en: 'How does Selenium manage multiple browser tabs?' }, a: { en: 'Each window/tab has a unique window handle. driver.getWindowHandles() returns all handles; driver.getWindowHandle() returns the current. To switch: iterate handles, skip current, call switchTo().window(handle). Selenium 4: switchTo().newWindow(WindowType.TAB) opens a programmatic new tab.' } },
          { level: 'basic', q: { en: 'Which interface is used for screenshots in Selenium?' }, a: { en: 'TakesScreenshot interface. Cast WebDriver: ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE). Python: driver.save_screenshot("test.png"). TypeScript: driver.takeScreenshot() returns Base64.' } },
          { level: 'basic', q: { en: 'Give 3 situations where you need to execute JavaScript in Selenium.' }, a: { en: '1) Scroll into view — scrollIntoView(true). 2) Click hidden element — arguments[0].click(). 3) Set input value — arguments[0].value=\'2024-01-15\' for date pickers.' } },
          { level: 'basic', q: { en: 'How do you shorten test time by using cookies for login?' }, a: { en: 'Capture the session cookie after a real login, then inject it in subsequent tests: driver.manage().addCookie(savedCookie) + driver.navigate().refresh(). Saves 5-10 seconds per test.' } },
          { level: 'basic', q: { en: 'What do you do when getText() returns an empty string?' }, a: { en: 'Common causes: 1) Element is hidden — use getAttribute("textContent"). 2) Element not loaded — add Explicit Wait. 3) Shadow DOM — use JS. 4) Dynamic content — text arrives after AJAX.' } },
          { level: 'basic', q: { en: 'Why is Page Object Model (POM) used in Selenium?' }, a: { en: 'Without POM, locators are hardcoded everywhere. POM centralizes locators in page classes, making maintenance easy — one change fixes all tests that use that element. Tests focus on business logic, not UI details.' } },
          { level: 'basic', q: { en: 'How do you run Chrome in headless mode? Why is it important in CI/CD?' }, a: { en: 'options.addArguments("--headless"). Important for CI/CD: Linux servers have no display, headless is required. Also faster and uses less resources.' } },
          { level: 'basic', q: { en: 'What is the difference between absolute and relative XPath?' }, a: { en: 'Absolute XPath: /html/body/div[1]/form — full path from root, breaks on any DOM change. Relative XPath: //input[@id="username"] — starts from anywhere, more flexible. Never use absolute XPath.' } },
          { level: 'intermediate', q: { en: 'Your CI/CD Selenium tests pass in the morning but fail at noon. What are possible causes?' }, a: { en: '1) Test data pollution — fresh DB morning, changed by noon. 2) Time-dependent tests. 3) Parallel conflicts. 4) Insufficient timeouts (pages slower under load). Debug: screenshot on failure, detailed logs, reproduce at same time locally.' } },
          { level: 'intermediate', q: { en: 'How do you write a retry mechanism for StaleElementReferenceException?' }, a: { en: 'Re-find the element on each use and retry on exception. Common in SPA apps (React/Vue).', code: `// Java retry
public static void clickWithRetry(WebDriver driver, By locator, int retries) {
    for (int i = 0; i < retries; i++) {
        try { driver.findElement(locator).click(); return; }
        catch (StaleElementReferenceException e) {
            if (i == retries - 1) throw e;
        }
    }
}` } },
          { level: 'intermediate', q: { en: 'sendKeys() doesn\'t trigger onChange in a React/Vue input. How do you solve this?' }, a: { en: 'React controlled components may not fire onChange with sendKeys(). Solutions: 1) Use Actions API: actions.click(el).sendKeys(el, text).perform(). 2) JS dispatch input event: el.dispatchEvent(new Event("input",{bubbles:true})). 3) Send characters one by one.' } },
          { level: 'intermediate', q: { en: 'How do you debug Selenium Grid tests that work locally but fail on Grid?' }, a: { en: '1) Check Grid console at localhost:4444/ui — is session created? 2) Use VNC/noVNC for live viewing. 3) Verify capabilities match. 4) Check Docker network hostname resolution. 5) Screenshots are created on Node, not local path.' } },
          { level: 'intermediate', q: { en: 'How do you handle Stripe iframe in a payment page test?' }, a: { en: 'Find iframe: driver.findElement(By.cssSelector("iframe[name*=\'stripe\']")). Switch: switchTo().frame(stripeIframe). Fill card field: findElement(By.name("cardnumber")).sendKeys("4111111111111111"). Return: switchTo().defaultContent(). Repeat for expiry/CVV iframes.' } },
          { level: 'intermediate', q: { en: 'What Selenium-level approaches ensure test isolation without resetting the database?' }, a: { en: '1) Each test creates its own unique user (timestamp-based email). 2) Cookie injection for login. 3) API setup + UI verification. 4) Test data factory with unique data. 5) Soft delete pattern.' } },
          { level: 'intermediate', q: { en: 'How do you use pytest fixture scopes in Selenium?' }, a: { en: 'scope="function": new driver per test (full isolation, slow). scope="class": shared within class. scope="module": shared within file. scope="session": single driver for entire run (fastest, no isolation). Best: function for critical isolation, session for expensive setup.' } },
          { level: 'intermediate', q: { en: 'How do you read all dropdown options and write to Excel in Java?' }, a: { en: 'Select select = new Select(el); List<WebElement> options = select.getOptions(); Then use Apache POI: XSSFWorkbook, createSheet, createRow, createCell with getText() and getAttribute("value") for each option.' } },
          { level: 'intermediate', q: { en: 'How do you configure parallel test execution in TestNG with thread safety?' }, a: { en: 'testng.xml: <suite parallel="methods" thread-count="4">. Thread safety: use ThreadLocal<WebDriver>. Each thread gets its own driver instance. @BeforeMethod sets, @AfterMethod quits and removes.', code: `private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
public static WebDriver getDriver() { return driver.get(); }` } },
          { level: 'intermediate', q: { en: 'Your Selenium test can\'t find a Shadow DOM element. What is Shadow DOM and how do you access it?' }, a: { en: 'Shadow DOM is a hidden DOM subtree in web components. Normal findElement() can\'t access it. Selenium 4: shadowHost.getShadowRoot().findElement(By.css("input")). Older: JS executeScript("return arguments[0].shadowRoot", shadowHost).' } },
          { level: 'intermediate', q: { en: 'How do you test file upload? What if the button is custom JavaScript?' }, a: { en: 'Native input[type="file"]: sendKeys("/path/to/file.jpg") — no dialog needed. Custom JS button: make input visible via JS, then sendKeys. Robot class for OS file dialog. Python: find_element(By.ID, "fileInput").send_keys("/path/file").' } },
          { level: 'intermediate', q: { en: 'How do you use Chrome DevTools Protocol (CDP) with Selenium 4?' }, a: { en: 'Use executeCdpCommand(). Scenarios: network throttling, geolocation override, basic auth, console log capture, request intercept.', code: `((ChromeDriver)driver).executeCdpCommand("Emulation.setGeolocationOverride",
    Map.of("latitude", 41.0, "longitude", 28.9, "accuracy", 1));` } },
          { level: 'intermediate', q: { en: 'What practices prevent memory leaks in long-running Selenium test suites?' }, a: { en: '1) driver.quit() in finally block after every test. 2) ThreadLocal.remove() call. 3) Reasonable implicitlyWait. 4) Limit screenshot storage. 5) Chrome flags: --disable-gpu, --no-sandbox, --disable-extensions. 6) Don\'t exceed CPU cores for parallel threads.' } },
          { level: 'intermediate', q: { en: 'Is it possible to do API testing with Selenium? When does it make sense?' }, a: { en: 'Selenium is for browser automation, not API testing. But hybrid approach: use API to set up test data, then Selenium to verify UI. Or inject session token from API login into Selenium via cookies. Pure API testing: use REST Assured (Java) or requests/pytest (Python).' } },
          { level: 'intermediate', q: { en: 'How do you write code to find a table row by column value and click it?' }, a: { en: 'Iterate all rows, for each row get cells by tagName("td"), check cell text, click target cell.', code: `List<WebElement> rows = driver.findElements(By.cssSelector("table tbody tr"));
for (WebElement row : rows) {
    List<WebElement> cells = row.findElements(By.tagName("td"));
    if (cells.size() > 1 && cells.get(1).getText().equals("Active")) {
        cells.get(0).click(); break;
    }
}` } },
          { level: 'intermediate', q: { en: 'How do you generate test reports with Allure? What should they include?' }, a: { en: '@Attachment for screenshots, @Step for step logging, @Severity for priority. Report must include: test name, pass/fail, duration, error message + stack trace, screenshot on failure, test parameters.' } },
          { level: 'intermediate', q: { en: 'How do you run Selenium tests on BrowserStack or Sauce Labs?' }, a: { en: 'Use RemoteWebDriver with cloud URL: new RemoteWebDriver(new URL("https://user:key@hub-cloud.browserstack.com/wd/hub"), options). Add capabilities: platformName, browserVersion, os. Cloud dashboards auto-provide video, screenshots, logs.' } },
          { level: 'intermediate', q: { en: 'How do you handle errors with async/await in TypeScript Selenium?' }, a: { en: 'Wrap in try-catch, always call driver.quit() in finally. Use driver.wait(until.elementLocated(), ms) for timeouts. Capture screenshot on error.', code: `try {
  const el = await driver.wait(until.elementLocated(By.id('btn')), 10000);
  await el.click();
} catch (e: any) {
  const img = await driver.takeScreenshot();
  fs.writeFileSync('error.png', img, 'base64');
  throw e;
} finally {
  await driver.quit();
}` } },
          { level: 'advanced', q: { en: 'You have 1000 E2E tests and they\'re very slow. How do you optimize?' }, a: { en: '1) Parallel execution: TestNG thread-count=8, pytest-xdist -n8. 2) Cookie login bypass. 3) API setup + UI verify only. 4) Headless mode (~30% faster). 5) Tag-based selective run: smoke on PR, regression nightly. 6) Selenium Grid with 8+ nodes.' } },
          { level: 'advanced', q: { en: 'How do you perform visual regression testing with Selenium?' }, a: { en: 'Tools: Applitools Eyes (AI-based), AShot + ImageDiff (open source), percy.io. Strategy: baseline screenshot per element, compare on each run, mask dynamic content (dates, counters), 1-2% pixel tolerance threshold.', code: `Screenshot shot = new AShot().takeScreenshot(driver);
BufferedImage baseline = ImageIO.read(new File("baseline.png"));
ImageDiff diff = new ImageDiffer().makeDiff(baseline, shot.getImage());
Assert.assertFalse(diff.hasDiff(), "Visual regression!");` } },
          { level: 'advanced', q: { en: 'What architecture do you set up for Selenium in Kubernetes?' }, a: { en: 'Selenium Grid 4 + Helm chart. Hub as deployment, Chrome/Firefox nodes as separate deployments. HorizontalPodAutoscaler for auto-scaling. Kubernetes Job for test suite runs. PersistentVolume for reports. Ingress to expose Grid console.' } },
          { level: 'advanced', q: { en: 'Is it safe to run Selenium tests in production? What precautions?' }, a: { en: 'Only safe for read-only smoke tests. Precautions: 1) No write/delete operations. 2) Dedicated test account. 3) Rate limiting. 4) Prefer managed solutions: Datadog Synthetics, AWS CloudWatch Synthetics. 5) Never touch production DB without DBA approval.' } },
          { level: 'advanced', q: { en: 'What features are difficult to test with Selenium and what alternatives do you use?' }, a: { en: '1) WebSocket: use CDP or separate WS client. 2) CAPTCHA: bypass in test env or use reCAPTCHA test key. 3) File download: set download dir via ChromeOptions. 4) Email: use Mailhog/Mailtrap. 5) 2FA: bypass or generate TOTP. 6) Performance: use JMeter/k6 instead.' } },
          { level: 'advanced', q: { en: 'How do you organize test data management without using production data?' }, a: { en: '1) Faker library for realistic fake data. 2) Builder pattern for test objects. 3) DB seeding before suite. 4) Timestamp-based unique data per test. 5) Cleanup after tests. 6) Environment-specific config files.', code: `Faker faker = new Faker(new Locale("en"));
String email = faker.internet().emailAddress();` } },
          { level: 'advanced', q: { en: 'Explain the technical differences between W3C WebDriver Protocol and JSON Wire Protocol.' }, a: { en: 'JSON Wire Protocol: Selenium\'s own HTTP API, non-standard, inconsistent browser behavior. W3C WebDriver: IETF standard, all drivers must behave identically. Practical impact: Selenium 4 uses W3C — Desired Capabilities removed, use Options classes. Actions API rewritten. Relative locators only in W3C.' } },
          { level: 'advanced', q: { en: 'What systematic approach brings flaky test rate below 5%?' }, a: { en: '1) Track flaky tests: log pass rate per CI run, <80% = flaky. 2) Root cause categorization: timing, data, selector, environment. 3) Remove all Thread.sleep(). 4) Fix brittle selectors (ID > CSS > XPath). 5) Test isolation: unique data per test. 6) @Retry annotation for auto-retry. 7) Docker for deterministic environment.' } },
          { level: 'advanced', q: { en: 'Design Selenium test architecture from scratch for a large e-commerce project.' }, a: { en: 'Decisions: 1) Java + TestNG + Maven. 2) POM + Page Factory. 3) TestNG XML with smoke/regression groups. 4) Allure Reports + Slack. 5) ThreadLocal WebDriver DriverFactory. 6) Properties + env variable config. 7) Jenkins CI: smoke on PR, regression nightly. 8) Grid 4 + Docker, 10 parallel nodes. 9) Faker + REST API setup. 10) Flaky test dashboard.' } },
          { level: 'advanced', q: { en: 'Set up Selenium Grid with Docker Compose for scalable parallel testing.' }, a: { en: 'Hub + Chrome/Firefox nodes. Use deploy.replicas for scaling. shm_size: 2gb for stability.', code: `version: "3.8"
services:
  selenium-hub:
    image: selenium/hub:4.25.0
    ports: ["4444:4444"]
  chrome:
    image: selenium/node-chrome:4.25.0
    shm_size: 2gb
    depends_on: [selenium-hub]
    deploy:
      replicas: 4` } },
          { level: 'advanced', q: { en: 'How do you apply network throttling and performance metrics with Selenium?' }, a: { en: 'Use CDP for network throttling: emulateNetworkConditions. Navigation Timing API via JS for page load metrics. Synthetic monitoring: measure critical page load times, assert against SLAs.', code: `chrome.executeCdpCommand("Network.emulateNetworkConditions", Map.of(
    "offline", false, "latency", 100,
    "downloadThroughput", 750*1024/8,
    "uploadThroughput", 250*1024/8
));` } },
          { level: 'advanced', q: { en: 'What is Selenium 4\'s BiDi protocol and how will it affect Selenium\'s future?' }, a: { en: 'WebDriver BiDi is the new W3C standard enabling bidirectional WebSocket communication. Current HTTP protocol is request-response only. BiDi enables real-time event streaming: console logs, network events, DOM mutations — features Playwright already has. Chrome BiDi supported in Selenium 4.3+. Will close the gap with Playwright.' } },
          { level: 'advanced', q: { en: 'Describe your migration plan from Selenium to Playwright.' }, a: { en: '1) Audit: count tests, browsers, languages, special Selenium features. 2) Pilot: migrate 20-30 critical tests. 3) Run both in parallel, compare results. 4) Module-by-module migration. Technical conversions: By.id("x") → page.locator("#x"), remove all WebDriverWait (auto-wait), switchTo().frame() → frameLocator().' } },
          { level: 'advanced', q: { en: 'How do you integrate accessibility testing into Selenium tests?' }, a: { en: 'Use axe-core: axe-selenium-java (Java), axe-selenium-python (Python). AxeBuilder analyzes page, returns WCAG violations. In CI: fail on critical/serious violations. Filter by WCAG 2.1 AA level.', code: `Results results = new AxeBuilder().analyze(driver);
List<Rule> violations = results.getViolations();
Assert.assertEquals(violations.size(), 0, "Accessibility violations found!");` } },
        ],
      },
    ],
  },
}

// ─── EXPORT — TopicPage formatı: { tr: { hero, tabs, sections }, en: {...} } ──
export const seleniumData = {
  tr: {
    hero: {
      title: '🟢 Selenium WebDriver',
      subtitle: 'Java · Python · TypeScript — Tam Öğrenme Kılavuzu',
      intro: 'Selenium\'u sıfırdan öğren: kurulum, locators, aksiyonlar, wait stratejileri, frameler, gerçek hayat senaryoları ve 50 mülakat sorusu. Java, Python ve TypeScript\'te tüm örnekler.',
    },
    tabs: [
      '🌐 Giriş',
      '⚙️ Kurulum',
      '🎯 Locators',
      '⚡ Aksiyonlar',
      '⏳ Wait',
      '🪟 Frames & Alert',
      '🛠️ Gerçek Hayat',
      '🔗 Ekosistem',
      '🚨 Yaygın Hatalar',
      '💼 Mülakat Soruları',
    ],
    sections: [s0.tr, s1.tr, s2.tr, s3.tr, s4.tr, s5.tr, s6.tr, s7.tr, s8.tr, s9.tr],
  },
  en: {
    hero: {
      title: '🟢 Selenium WebDriver',
      subtitle: 'Java · Python · TypeScript — Complete Learning Guide',
      intro: 'Learn Selenium from scratch: installation, locators, actions, wait strategies, frames, real-world scenarios, and 50 interview questions. All examples in Java, Python, and TypeScript.',
    },
    tabs: [
      '🌐 Introduction',
      '⚙️ Installation',
      '🎯 Locators',
      '⚡ Actions',
      '⏳ Wait Strategies',
      '🪟 Frames & Alerts',
      '🛠️ Real World',
      '🔗 Ecosystem',
      '🚨 Common Errors',
      '💼 Interview Questions',
    ],
    sections: [s0.en, s1.en, s2.en, s3.en, s4.en, s5.en, s6.en, s7.en, s8.en, s9.en],
  },
}



