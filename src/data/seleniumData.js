// seleniumData.js — Selenium WebDriver tam öğrenme sayfası
// Java + Python + TypeScript, 10 bölüm
import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

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
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Selenium 4 mimarisinde tarayıcılarla iletişim kurmak için benimsenen resmi standart nedir?",
            "en": "What is the official standard adopted by Selenium 4 architecture for browser communication?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "JSON Wire Protocol",
                        "en": "JSON Wire Protocol"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "W3C WebDriver Protocol",
                        "en": "W3C WebDriver Protocol"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "REST API",
                        "en": "REST API"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "WebSocket API",
                        "en": "WebSocket API"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Selenium 4, tarayıcılarla etkileşim için W3C WebDriver protokolünü zorunlu kılmıştır. Bu, farklı tarayıcılar ve sürücüler arasında tutarlı bir iletişim sağlar.",
            "en": "Selenium 4 has mandated the W3C WebDriver protocol for interacting with browsers. This ensures consistent communication across different browsers and drivers."
      }
}
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
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Selenium 4 öncesinde (Selenium 3) kullanılan temel iletişim protokolü hangisidir?",
            "en": "Which communication protocol was the primary standard before Selenium 4 (in Selenium 3)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "JSON Wire Protocol",
                        "en": "JSON Wire Protocol"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "W3C WebDriver Protocol",
                        "en": "W3C WebDriver Protocol"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "SOAP",
                        "en": "SOAP"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "gRPC",
                        "en": "gRPC"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Selenium 3 sürümünde tarayıcı sürücüleri JSON Wire Protocol kullanıyordu. Selenium 4 ile bu protokol terk edilerek W3C standardına geçilmiştir.",
            "en": "In the Selenium 3 version, browser drivers utilized the JSON Wire Protocol. With Selenium 4, this protocol was abandoned in favor of the W3C standard."
      }
}
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
      {
        type: 'quiz',
        question: 'Selenium 4.6 ve sonrası sürümlerde ChromeDriver\'ı kim otomatik yönetir?',
        options: [
          { id: 'a', text: 'Maven' },
          { id: 'b', text: 'Selenium Manager' },
          { id: 'c', text: 'WebDriverManager kütüphanesi' },
          { id: 'd', text: 'npm' },
        ],
        correct: 'b',
        explanation: 'Selenium 4.6\'dan itibaren Selenium Manager, yüklü Chrome sürümünü tespit edip uyumlu ChromeDriver\'ı otomatik indirir — eski projelerde kullanılan WebDriverManager kütüphanesine artık gerek yoktur.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Selenium 4.6 ile tanıtılan ve dış bağımlılıklara (örneğin WebDriverManager) ihtiyacı ortadan kaldıran otomatik sürücü yönetim aracının adı nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Chrome DevTools"
            },
            {
                  "id": "b",
                  "text": "Selenium Manager"
            },
            {
                  "id": "c",
                  "text": "Selenium Grid"
            },
            {
                  "id": "d",
                  "text": "Docker Integration"
            }
      ],
      "correct": "b",
      "explanation": "Selenium 4.6 sürümünde gelen 'Selenium Manager' özelliği, tarayıcı sürücülerinin (ChromeDriver, GeckoDriver vb.) otomatik olarak indirilmesini ve yapılandırılmasını yöneterek geliştiriciyi manuel sürücü yönetimi yükünden kurtarır."
}
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
      {
        type: 'quiz',
        question: 'From Selenium 4.6 onward, what automatically manages ChromeDriver?',
        options: [
          { id: 'a', text: 'Maven' },
          { id: 'b', text: 'Selenium Manager' },
          { id: 'c', text: 'The WebDriverManager library' },
          { id: 'd', text: 'npm' },
        ],
        correct: 'b',
        explanation: 'Since Selenium 4.6, Selenium Manager detects your installed Chrome version and downloads a matching ChromeDriver automatically — the older WebDriverManager library is no longer needed.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Starting with Selenium 4.6, which built-in feature handles browser driver binaries automatically, eliminating the need for external dependencies?",
      "options": [
            {
                  "id": "a",
                  "text": "Gradle"
            },
            {
                  "id": "b",
                  "text": "The WebDriverManager binary tool"
            },
            {
                  "id": "c",
                  "text": "Selenium Manager"
            },
            {
                  "id": "d",
                  "text": "Auto-driver-configurator"
            }
      ],
      "correct": "c",
      "explanation": "Selenium Manager is the native binary included with Selenium 4.6+ that automatically detects the browser version and provisions the correct driver, replacing external libraries like WebDriverManager."
}
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
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Test otomasyonu performansını optimize etmek için hangi locator tipi her zaman tercih edilmelidir?",
            "en": "Which locator type should always be preferred to optimize test automation performance?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "By.CSS_SELECTOR — cssSelector(\".submit-button\")"
            },
            {
                  "id": "b",
                  "text": "By.ID — id=\"submit-button\""
            },
            {
                  "id": "c",
                  "text": "By.LINK_TEXT — linkText(\"Submit\")"
            },
            {
                  "id": "d",
                  "text": "By.XPATH — //button[@id=\"submit-button\"]"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "By.ID kullanımı, tarayıcının DOM üzerinde doğrudan erişim sağlaması ve benzersiz olması nedeniyle en hızlı ve en kararlı yöntemdir. XPath veya CSS seçiciler daha karmaşık tarama süreçleri gerektirir.",
            "en": "Using By.ID is the fastest and most stable method because it allows the browser to perform a direct lookup on the DOM and guarantees uniqueness. XPath or CSS selectors require more complex parsing processes."
      }
}
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
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "en": "Why is 'By.ID' considered the superior choice for element location compared to other strategies?",
            "tr": "Neden 'By.ID' diğer stratejilere kıyasla element konumlandırma için daha üstün bir seçenek olarak kabul edilir?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "It supports complex query language features.",
                  "tr": "Karmaşık sorgu dili özelliklerini destekler."
            },
            {
                  "id": "b",
                  "text": "It provides the most readable code for developers.",
                  "tr": "Geliştiriciler için en okunabilir kodu sağlar."
            },
            {
                  "id": "c",
                  "text": "It provides the most efficient lookup performance (O(1)) and enforces uniqueness.",
                  "tr": "En verimli arama performansını (O(1)) sağlar ve benzersizliği zorunlu kılar."
            },
            {
                  "id": "d",
                  "text": "It is the only locator that works in all browsers.",
                  "tr": "Tüm tarayıcılarda çalışan tek locator türüdür."
            }
      ],
      "correct": "c",
      "explanation": {
            "en": "By.ID is preferred because HTML standards mandate unique IDs, allowing browsers to perform high-speed lookups with O(1) time complexity.",
            "tr": "By.ID tercih edilir çünkü HTML standartları benzersiz ID'leri zorunlu kılar, bu da tarayıcıların O(1) zaman karmaşıklığı ile yüksek hızlı arama yapmasına olanak tanır."
      }
}
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
      {
        type: 'simulation',
        icon: '🖱️',
        color: '#7c3aed',
        title: { tr: 'Drag & Drop — Canlı Simülasyon', en: 'Drag & Drop — Live Simulation' },
        scenario: 'drag-drop',
        description: {
          tr: '"▶ Sürükle!" butonuna tıkla ve dragstart → drag → dragenter → dragover → drop → dragend event zincirini canlı izle. Sağ panelde DOM olayları ateşleniyor.',
          en: 'Click "▶ Drag!" and watch the dragstart → drag → dragenter → dragover → drop → dragend event chain fire in real time. DOM events light up on the right.',
        },
        code: `// Java — Drag & Drop (Actions API)
import org.openqa.selenium.interactions.Actions;

WebDriver driver  = new ChromeDriver();
Actions   actions = new Actions(driver);

WebElement source = driver.findElement(By.id("dragSource"));
WebElement target = driver.findElement(By.id("dropTarget"));

// Yöntem 1: Direkt dragAndDrop
actions.dragAndDrop(source, target).perform();

// Yöntem 2: Manuel adımlar (bazı siteler için)
actions.clickAndHold(source)     // kaynak üzerinde fareyi bas
       .moveToElement(target)    // hedefe sür
       .release()                // bırak
       .perform();

// Python eşdeğeri:
// ActionChains(driver).drag_and_drop(source, target).perform()`,
        language: 'java',
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
          { id: 'd', text: { tr: 'Select sınıfı', en: 'Select class' } },
        ],
        correct: 'b',
        explanation: { tr: 'Hover için Actions sınıfı kullanılır: new Actions(driver).moveToElement(element).perform(). Python\'da ActionChains, TypeScript\'te driver.actions() kullanılır. WebElement\'in doğrudan hover() metodu yoktur.', en: 'The Actions class is used for hover: new Actions(driver).moveToElement(element).perform(). Python uses ActionChains, TypeScript uses driver.actions(). WebElement has no direct hover() method.' },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium Java'da belirli bir elementin üzerine fare imlecini getirmek (mouse hover) için kullanılan etkileşim sınıfı hangisidir?",
            "en": "Which interaction class is used in Selenium Java to move the mouse cursor over a specific element (mouse hover)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "InteractionManager"
            },
            {
                  "id": "b",
                  "text": "Actions"
            },
            {
                  "id": "c",
                  "text": "MouseController"
            },
            {
                  "id": "d",
                  "text": "Robot class"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Fare hareketleri gibi karmaşık etkileşimler için Actions sınıfı kullanılır. 'moveToElement()' metodu, fareyi elementin üzerine getirmek için kullanılır ve 'perform()' ile işlem yürütülür.",
            "en": "The Actions class is used for complex interactions like mouse movements. The 'moveToElement()' method is used to hover over an element, and 'perform()' is called to execute the sequence."
      }
}
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
      {
        type: 'quiz',
        question: { tr: 'Bir sayfa üzerinde hover (fare üstüne getirme) işlemi için hangi sınıf kullanılır (Java)?', en: 'Which class is used for hover (mouse over) operations in Java Selenium?' },
        options: [
          { id: 'a', text: 'WebElement.hover()' },
          { id: 'b', text: 'Actions (org.openqa.selenium.interactions.Actions)' },
          { id: 'c', text: 'JavascriptExecutor' },
          { id: 'd', text: { tr: 'Select sınıfı', en: 'Select class' } },
        ],
        correct: 'b',
        explanation: { tr: 'Hover için Actions sınıfı kullanılır: new Actions(driver).moveToElement(element).perform(). Python\'da ActionChains, TypeScript\'te driver.actions() kullanılır. WebElement\'in doğrudan hover() metodu yoktur.', en: 'The Actions class is used for hover: new Actions(driver).moveToElement(element).perform(). Python uses ActionChains, TypeScript uses driver.actions(). WebElement has no direct hover() method.' },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium Java'da belirli bir elementin üzerine fare imlecini getirmek (mouse hover) için kullanılan etkileşim sınıfı hangisidir?",
            "en": "Which interaction class is used in Selenium Java to move the mouse cursor over a specific element (mouse hover)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "InteractionManager"
            },
            {
                  "id": "b",
                  "text": "Actions"
            },
            {
                  "id": "c",
                  "text": "MouseController"
            },
            {
                  "id": "d",
                  "text": "Robot class"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Fare hareketleri gibi karmaşık etkileşimler için Actions sınıfı kullanılır. 'moveToElement()' metodu, fareyi elementin üzerine getirmek için kullanılır ve 'perform()' ile işlem yürütülür.",
            "en": "The Actions class is used for complex interactions like mouse movements. The 'moveToElement()' method is used to hover over an element, and 'perform()' is called to execute the sequence."
      }
}
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
        type: 'animated-timeline',
        title: { tr: 'Wait Türleri — Zaman Çizelgesi Animasyonu', en: 'Wait Types — Animated Timeline' },
        description: {
          tr: '▶ Oynat\'a bas: üç farklı wait stratejisinin aynı koşulda (element DOM\'a giriyor) ne kadar farklı süre harcadığını canlı gör. Barlar gerçek zamanlama oranıyla dolar.',
          en: '▶ Press Play: watch how three wait strategies perform under the same condition (element entering DOM). Bars fill proportionally to real durations.',
        },
        tracks: [
          {
            label: 'Thread.sleep(5s)',
            labelEn: 'Thread.sleep(5s)',
            duration: 5000,
            color: '#ef4444',
            badge: { tr: '❌ Her zaman 5s bekler — element 1.8s\'de hazır olsa bile', en: '❌ Always waits 5s — even if element is ready at 1.8s' },
            detail: { tr: 'Sabit, koşulsuz bekleme. Test süresini gereksiz uzatır.', en: 'Fixed, unconditional sleep. Bloats test suite time.' },
          },
          {
            label: 'Implicit Wait (max 10s)',
            labelEn: 'Implicit Wait (max 10s)',
            duration: 2300,
            color: '#f59e0b',
            badge: { tr: '⚠️ ~2.3s — element gelince durur ama tüm findElement\'leri etkiler', en: '⚠️ ~2.3s — stops when element arrives, but affects every findElement' },
            detail: { tr: 'Global timeout. Başka elementler için yavaşlatıcı olabilir.', en: 'Global timeout. Can slow down unrelated lookups.' },
          },
          {
            label: 'Explicit Wait (visibility koşulu)',
            labelEn: 'Explicit Wait (visibility condition)',
            duration: 1800,
            color: '#10b981',
            badge: { tr: '✅ ~1.8s — tam koşul sağlanınca durur, sadece bu element için', en: '✅ ~1.8s — stops exactly when condition met, scoped to this element' },
            detail: { tr: 'En verimli yöntem. Sadece ihtiyaç duyulan noktada bekler.', en: 'Most efficient. Waits only where needed.' },
          },
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
      
        retryQuestion: {
      "question": {
            "tr": "Bir web sayfasında işlemin tamamlandığını gösteren 'loading' katmanının DOM'dan tamamen kalkmasını beklemek için hangi WebDriverWait koşulu kullanılmalıdır?",
            "en": "Which WebDriverWait condition should be used to wait for a 'loading' overlay to be completely removed from the DOM in a web page?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "ExpectedConditions.attributeToBeNotEmpty()"
            },
            {
                  "id": "b",
                  "text": "ExpectedConditions.invisibilityOfElementLocated()"
            },
            {
                  "id": "c",
                  "text": "ExpectedConditions.elementToBeSelected()"
            },
            {
                  "id": "d",
                  "text": "ExpectedConditions.frameToBeAvailableAndSwitchToIt()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "ExpectedConditions.invisibilityOfElementLocated(), belirtilen lokatörün artık görünür olmadığında veya DOM'da bulunmadığında true döner. Bu, yükleme ekranları veya spinnerlar için en uygun yöntemdir.",
            "en": "ExpectedConditions.invisibilityOfElementLocated() returns true when the element located by the locator is no longer visible or present in the DOM. This is the most suitable method for handling loading screens or spinners."
      }
}
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
      {
        type: 'animated-timeline',
        title: { tr: 'Wait Türleri — Zaman Çizelgesi Animasyonu', en: 'Wait Types — Animated Timeline' },
        description: {
          tr: '▶ Oynat\'a bas: üç farklı wait stratejisinin aynı koşulda ne kadar farklı süre harcadığını canlı gör.',
          en: '▶ Press Play: watch how three wait strategies perform under the same condition (element entering DOM). Bars fill proportionally to real durations.',
        },
        tracks: [
          {
            label: 'Thread.sleep(5s)',
            labelEn: 'Thread.sleep(5s)',
            duration: 5000,
            color: '#ef4444',
            badge: { tr: '❌ Her zaman 5s bekler', en: '❌ Always waits 5s — even if element is ready at 1.8s' },
            detail: { tr: 'Sabit, koşulsuz bekleme.', en: 'Fixed, unconditional sleep. Bloats test suite time.' },
          },
          {
            label: 'Implicit Wait (max 10s)',
            labelEn: 'Implicit Wait (max 10s)',
            duration: 2300,
            color: '#f59e0b',
            badge: { tr: '⚠️ ~2.3s — element gelince durur', en: '⚠️ ~2.3s — stops when element arrives, but affects every findElement' },
            detail: { tr: 'Global timeout.', en: 'Global timeout. Can slow down unrelated lookups.' },
          },
          {
            label: 'Explicit Wait (visibility condition)',
            labelEn: 'Explicit Wait (visibility condition)',
            duration: 1800,
            color: '#10b981',
            badge: { tr: '✅ ~1.8s — tam koşul sağlanınca durur', en: '✅ ~1.8s — stops exactly when condition met, scoped to this element' },
            detail: { tr: 'En verimli yöntem.', en: 'Most efficient. Waits only where needed.' },
          },
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
      
        retryQuestion: {
      "question": {
            "tr": "Selenium'da sayfa üzerinde bir bildirim (toast) mesajının ekrandan kalkmasını beklemek için en uygun ExpectedCondition hangisidir?",
            "en": "Which ExpectedCondition is the most appropriate to wait for a notification (toast) message to be removed from the screen in Selenium?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "EC.elementToBeClickable()"
            },
            {
                  "id": "b",
                  "text": "EC.invisibilityOfElementLocated()"
            },
            {
                  "id": "c",
                  "text": "EC.visibilityOfElementLocated()"
            },
            {
                  "id": "d",
                  "text": "EC.frameToBeAvailableAndSwitchToIt()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "EC.invisibilityOfElementLocated(), bir öğenin DOM'dan kaldırılmasını veya görünmez hale gelmesini beklemek için kullanılır. Bildirim mesajlarının (toast) kaybolması için beklemek bu metodun temel kullanım alanlarından biridir.",
            "en": "EC.invisibilityOfElementLocated() is used to wait for an element to be removed from the DOM or become invisible. Waiting for temporary notification messages (toasts) to disappear is a primary use case for this method."
      }
}
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
      {
        type: 'simulation',
        icon: '🪟',
        color: '#3b82f6',
        title: { tr: 'Alert / Confirm / Prompt — İnteraktif Simülasyon', en: 'Alert / Confirm / Prompt — Interactive Simulation' },
        scenario: 'alert-sim',
        description: {
          tr: 'Sol panelde 3 butona tıklayarak window.alert(), window.confirm() ve window.prompt() dialog\'larını simüle et. Sağ panelde Selenium\'un her dialog için hangi kodu çalıştırdığını canlı izle.',
          en: 'Click the 3 buttons on the left to simulate window.alert(), window.confirm() and window.prompt() dialogs. Watch the Selenium code light up on the right in real time.',
        },
        code: `// Java — Tüm Alert Türleri
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// 1. window.alert() — sadece OK butonu
driver.findElement(By.id("alertBtn")).click();
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
String msg = alert.getText();         // "Kayıt tamamlandı!"
alert.accept();                       // OK tıklar

// 2. window.confirm() — OK veya Cancel
driver.findElement(By.id("confirmBtn")).click();
Alert confirm = wait.until(ExpectedConditions.alertIsPresent());
confirm.accept();                     // OK → true döner
// confirm.dismiss();                 // Cancel → false döner

// 3. window.prompt() — metin girişi
driver.findElement(By.id("promptBtn")).click();
Alert prompt = wait.until(ExpectedConditions.alertIsPresent());
prompt.sendKeys("testuser");          // input'a yaz
prompt.accept();                      // OK → "testuser" döner

// Python eşdeğerleri:
// alert = wait.until(EC.alert_is_present())
// alert.accept() / alert.dismiss() / alert.send_keys("text")`,
        language: 'java',
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
      {
        type: 'simulation',
        icon: '🗂️',
        color: '#3b82f6',
        title: { tr: 'Multiple Windows — Pencere/Sekme Geçişi', en: 'Multiple Windows — Tab/Window Switching' },
        scenario: 'multi-window',
        description: {
          tr: '"Yeni Sekme Aç" butonuna tıkla ve Selenium\'un getWindowHandles() ile tüm sekmeleri nasıl algılayıp switchTo().window() ile geçtiğini adım adım izle.',
          en: 'Click "Open New Tab" and watch how Selenium detects all tabs with getWindowHandles() then switches with switchTo().window() step by step.',
        },
        code: `// Java — Multiple Window/Tab Yönetimi
// Adım 1: Ana pencere handle'ını kaydet (ZORUNLU!)
String mainWindow = driver.getWindowHandle();

// Adım 2: Yeni sekme açan linke tıkla
driver.findElement(By.id("newTabLink")).click();

// Adım 3: Tüm handle'ları al — {CDwindow-001, CDwindow-002}
Set<String> allHandles = driver.getWindowHandles();

// Adım 4: Yeni sekmeye geç
for (String handle : allHandles) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);   // ← yeni sekme
        break;
    }
}

// Adım 5: Yeni sekmede çalış
System.out.println(driver.getTitle()); // yeni sekme başlığı
driver.close();                        // yeni sekmeyi kapat

// Adım 6: Ana sekmeye dön (ZORUNLU — yoksa NoSuchWindowException!)
driver.switchTo().window(mainWindow);`,
        language: 'java',
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
      
        retryQuestion: {
      "question": {
            "tr": "İç içe geçmiş iframe yapılarında, üzerinde çalıştığınız alt iframe'den bir üstteki kapsayıcı çerçeveye geçiş yapmak için hangi metot tercih edilmelidir?",
            "en": "Which method should be used to switch from a nested iframe to its immediate parent frame?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "driver.switchTo().parentFrame()"
            },
            {
                  "id": "b",
                  "text": "driver.switchTo().defaultContent()"
            },
            {
                  "id": "c",
                  "text": "driver.switchTo().activeElement()"
            },
            {
                  "id": "d",
                  "text": "driver.navigate().refresh()"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "driver.switchTo().parentFrame(), kontrolü mevcut iframe'in bir üstündeki (parent) iframe'e aktarır. Eğer tüm hiyerarşiden çıkıp ana sayfaya dönmek isteseydiniz defaultContent() kullanırdınız.",
            "en": "driver.switchTo().parentFrame() shifts the control to the immediate parent of the current iframe. If you wanted to exit the entire hierarchy and return to the main page, you would use defaultContent()."
      }
}
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
      
        retryQuestion: {
      "question": {
            "tr": "Bir sayfadaki iframe içerisine girip işlem yaptıktan sonra Selenium'un tekrar ana sayfa (top-level page) üzerinde işlem yapabilmesi için hangi komut gereklidir?",
            "en": "Which command is required for Selenium to be able to interact with the top-level page again after entering and performing actions within an iframe?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "driver.switchTo().frame(0)"
            },
            {
                  "id": "b",
                  "text": "driver.switchTo().parentFrame()"
            },
            {
                  "id": "c",
                  "text": "driver.switchTo().defaultContent()"
            },
            {
                  "id": "d",
                  "text": "driver.switchTo().window()"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "iframe içine girildiğinde WebDriver odağı o çerçeveye kilitlenir. Ana sayfaya geri dönüp oradaki elementleri bulabilmek için driver.switchTo().defaultContent() metodunu kullanarak odak sıfırlanmalıdır.",
            "en": "When switching into an iframe, the WebDriver's focus is locked to that frame. To return to the main page and locate elements outside the iframe, you must reset the focus using driver.switchTo().defaultContent()."
      }
}
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
          { id: 'a', text: { tr: 'Sadece Chrome\'da çalışır', en: 'Only works in Chrome' } },
          { id: 'b', text: { tr: 'Çok dil desteği (Java, Python, C#, JS, Ruby) ve olgunluk (20 yıl)', en: 'Multi-language support (Java, Python, C#, JS, Ruby) and maturity (20 years)' } },
          { id: 'c', text: { tr: 'Yalnızca JavaScript testleri için uygundur', en: 'Suitable only for JavaScript tests' } },
          { id: 'd', text: 'Auto-wait built-in gelir' },
        ],
        correct: 'b',
        explanation: { tr: 'Selenium\'un en büyük avantajı Java dahil 6+ dil desteği, 20 yıllık olgunluk, geniş topluluk ve her tarayıcıda çalışabilmesidir. Özellikle Java ağırlıklı QA ekiplerinin tercihi olmaya devam etmektedir.', en: 'Selenium\'s biggest advantage is support for 6+ languages including Java, 20 years of maturity, a large community, and compatibility with all browsers. It remains the go-to choice for Java-heavy QA teams.' },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium'u modern test otomasyon projelerinde hala popüler kılan temel faktör nedir?",
            "en": "What is the primary factor that keeps Selenium popular in modern test automation projects?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Tarayıcıya özel yerel sürücülerin olmaması",
                        "en": "Lack of browser-specific native drivers"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Geniş dil desteği, zengin ekosistem ve uzun yıllara dayanan endüstriyel deneyim",
                        "en": "Broad language support, rich ecosystem, and years of industrial experience"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Tüm web elementleri için otomatik bekleme süresi sunması",
                        "en": "Built-in automatic wait for all web elements"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece kurumsal şirketler tarafından geliştiriliyor olması",
                        "en": "Being developed exclusively by corporate companies"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Selenium, 20 yılı aşkın süredir piyasada olması, Java, Python ve C# gibi pek çok dille entegre çalışabilmesi ve devasa bir topluluk desteğine sahip olması sayesinde en çok tercih edilen araçlardan biri olmaya devam etmektedir.",
            "en": "Selenium remains one of the most preferred tools due to its 20+ years of presence in the market, its ability to integrate with many languages like Java, Python, and C#, and its massive community support."
      }
}
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
      {
        type: 'quiz',
        question: { tr: 'Selenium\'un en büyük avantajı hangisidir?', en: "What is Selenium's biggest advantage?" },
        options: [
          { id: 'a', text: { tr: 'Sadece Chrome\'da çalışır', en: 'Only works in Chrome' } },
          { id: 'b', text: { tr: 'Çok dil desteği (Java, Python, C#, JS, Ruby) ve olgunluk (20 yıl)', en: 'Multi-language support (Java, Python, C#, JS, Ruby) and maturity (20 years)' } },
          { id: 'c', text: { tr: 'Yalnızca JavaScript testleri için uygundur', en: 'Suitable only for JavaScript tests' } },
          { id: 'd', text: 'Auto-wait built-in gelir' },
        ],
        correct: 'b',
        explanation: { tr: 'Selenium\'un en büyük avantajı Java dahil 6+ dil desteği, 20 yıllık olgunluk, geniş topluluk ve her tarayıcıda çalışabilmesidir. Özellikle Java ağırlıklı QA ekiplerinin tercihi olmaya devam etmektedir.', en: "Selenium's biggest advantage is support for 6+ languages including Java, 20 years of maturity, a large community, and compatibility with all browsers. It remains the go-to choice for Java-heavy QA teams." },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium otomasyon aracının yazılım test dünyasındaki en güçlü yönü nedir?",
            "en": "What is the greatest strength of the Selenium automation tool in the software testing world?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Sadece mobil tarayıcıları desteklemesi",
                        "en": "Support only for mobile browsers"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Çeşitli programlama dillerine uyumluluk, köklü geçmiş ve geniş kütüphane desteği",
                        "en": "Compatibility with various programming languages, established history, and wide library support"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Testleri kendiliğinden paralel çalıştırması",
                        "en": "Running tests in parallel automatically"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Kurulum gerektirmeyen taşınabilir yapı",
                        "en": "Portable structure that does not require installation"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Selenium'un uzun soluklu başarısının sırrı, farklı programlama dillerine sunduğu esnek adaptasyon ve 20 yıllık köklü geçmişi ile oluşan geniş topluluk desteğidir.",
            "en": "The secret to Selenium's long-term success is its flexible adaptation to different programming languages and the massive community support built over its 20-year established history."
      }
}
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
      {
        type: 'quiz',
        question: 'TestNG\'de her test metodundan ÖNCE çalışan annotation hangisidir?',
        options: [
          { id: 'a', text: '@BeforeSuite' },
          { id: 'b', text: '@BeforeClass' },
          { id: 'c', text: '@BeforeMethod' },
          { id: 'd', text: '@AfterMethod' },
        ],
        correct: 'c',
        explanation: '@BeforeMethod her @Test metodundan önce çalışır (JUnit\'teki @BeforeEach karşılığı). @BeforeClass sınıf başına bir kez, @BeforeSuite ise tüm suite için bir kez çalışır.',
      
        retryQuestion: {
      "question": "TestNG framework'ünde, test sınıfı içindeki tüm test metotlarından SONRA bir kez çalışacak olan annotation hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "@AfterSuite"
            },
            {
                  "id": "b",
                  "text": "@AfterClass"
            },
            {
                  "id": "c",
                  "text": "@AfterMethod"
            },
            {
                  "id": "d",
                  "text": "@AfterTest"
            }
      ],
      "correct": "b",
      "explanation": "@AfterClass annotation'ı, o sınıf içerisindeki tüm @Test metotları tamamlandıktan sonra bir kez çalışır. @AfterMethod her metodun sonunda, @AfterSuite ise tüm test paketi bittiğinde çalışır."
}
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
      {
        type: 'quiz',
        question: 'Which TestNG annotation runs BEFORE every test method?',
        options: [
          { id: 'a', text: '@BeforeSuite' },
          { id: 'b', text: '@BeforeClass' },
          { id: 'c', text: '@BeforeMethod' },
          { id: 'd', text: '@AfterMethod' },
        ],
        correct: 'c',
        explanation: '@BeforeMethod runs before every @Test method (equivalent to JUnit\'s @BeforeEach). @BeforeClass runs once per class, @BeforeSuite once for the whole suite.',
      
        retryQuestion: {
      "question": "Which TestNG annotation is executed only once before all test methods in the current class?",
      "options": [
            {
                  "id": "a",
                  "text": "@BeforeTest"
            },
            {
                  "id": "b",
                  "text": "@BeforeClass"
            },
            {
                  "id": "c",
                  "text": "@BeforeMethod"
            },
            {
                  "id": "d",
                  "text": "@BeforeGroups"
            }
      ],
      "correct": "b",
      "explanation": "@BeforeClass runs once before the first test method in the current class is invoked. In contrast, @BeforeMethod runs before every single @Test method, and @BeforeTest runs before all methods in the <test> tag of the XML suite."
}
},
    ],
  },
}

// ─── S8: CDP & BIDI ──────────────────────────────────────────────────────────
const s8 = {
  tr: {
    title: '🌐 Chrome DevTools (CDP) & WebDriver BiDi',
    blocks: [
      {
        type: 'simple-box', emoji: '📡',
        content: 'Selenium 4\'e kadar test kodumuz tarayıcıya sadece "şuna tıkla, bunu yaz" diyordu ve tarayıcıdan anlık haber alamıyordu. WebDriver BiDi (çift yönlü telsiz gibi) ve CDP sayesinde artık tarayıcının iç dünyasını (konsol hataları, ağ istekleri, konum bilgisi) canlı dinleyip kontrol edebiliyoruz.',
      },
      {
        type: 'text',
        content: 'Selenium 4 ile birlikte tarayıcıyla çift yönlü iletişim kurabilen WebSocket tabanlı W3C WebDriver BiDi protokolü ve Chrome DevTools Protokolü (CDP) entegrasyonu gelmiştir. Bu sayede test kodumuz tarayıcıdaki olayları anlık olarak dinleyebilir, ağ isteklerini manipüle edebilir ve tarayıcı davranışlarını değiştirebilir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java ile BiDi & CDP Kullanımı:',
        content: 'Java\'da CDP için `driver.getDevTools()` üzerinden session başlatılır. BiDi için ise `LogInspector` veya `NetworkInterceptor` gibi üst seviye sınıflar kullanılarak WebSocket bağlantısı yönetilir. Bu, Playwright\'ın en güçlü yönü olan event-driven yapıyı Selenium\'a kazandırır.',
      },
      {
        type: 'heading', text: '1. Console Log & JS Exception Dinleme'
      },
      {
        type: 'text',
        content: 'Tarayıcıda oluşan JavaScript hatalarını veya `console.log` çıktılarını gerçek zamanlı yakalamak için Selenium 4 BiDi `LogInspector` kullanılır. Bu, UI testleri çalışırken arka planda sinsi JS hatalarının yakalanmasını sağlar.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Console Log Dinleme',
        code: `import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v125.log.Log;

ChromeDriver driver = new ChromeDriver();
DevTools devTools = driver.getDevTools();
devTools.createSession();

// CDP ile konsol loglarını dinle
devTools.send(Log.enable());
devTools.addListener(Log.entryAdded(), logEntry -> {
    System.out.println("Console Log: " + logEntry.getText());
    System.out.println("Level: " + logEntry.getLevel());
});

driver.get("https://example.com");`,
      },
      {
        type: 'heading', text: '2. Network Interception (API Mocking)'
      },
      {
        type: 'text',
        content: 'NetworkInterceptor yardımıyla tarayıcıdan giden HTTP istekleri ve gelen yanıtlar durdurulabilir (intercept). Bu sayede API\'leri taklit edebilir (mock), giden header\'ları değiştirebilir veya Basic Authentication pencerelerini otomatik geçebiliriz.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — API Mocking (NetworkInterceptor)',
        code: `import org.openqa.selenium.devtools.NetworkInterceptor;
import org.openqa.selenium.remote.http.Route;
import org.openqa.selenium.remote.http.HttpResponse;
import static org.openqa.selenium.remote.http.Contents.utf8String;

// API isteğini yakala ve mock yanıt dön
try (NetworkInterceptor interceptor = new NetworkInterceptor(
        driver,
        Route.matching(req -> req.getUri().contains("/api/user"))
             .to(() -> req -> new HttpResponse()
                 .setStatus(200)
                 .addHeader("Content-Type", "application/json")
                 .setContent(utf8String("{\\"name\\": \\"Mocked User\\", \\"role\\": \\"QA\\"}"))))) {

    driver.get("https://example.com/profile");
    // Sayfada mock verilerin göründüğünü doğrula
}`,
      },
      {
        type: 'heading', text: '3. Geolocation & Device Emulation'
      },
      {
        type: 'text',
        content: 'CDP komutları doğrudan çalıştırılarak tarayıcının GPS konumu değiştirilebilir (Geolocation Override) veya farklı mobil cihaz ekran boyutları simüle edilebilir (Device Emulation).',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Konum Değiştirme (CDP)',
        code: `import java.util.Map;
import org.openqa.selenium.chrome.ChromeDriver;

ChromeDriver driver = new ChromeDriver();
// Paris koordinatları
Map<String, Object> coordinates = Map.of(
    "latitude", 48.8566,
    "longitude", 2.3522,
    "accuracy", 1
);

driver.executeCdpCommand("Emulation.setGeolocationOverride", coordinates);
driver.get("https://www.google.com/maps");`,
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-bidi-cdp',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumBidiPractice',
        title: { tr: 'Pratik: CDP ile Console Listener Ekle', en: 'Practice: Add Console Listener with CDP' },
        description: {
            tr: 'Selenium 4 Java projesinde CDP ile console loglarını dinlemek için komutları doğru sıraya koyun.',
            en: 'Order the commands to listen to console logs using CDP in a Selenium 4 Java project.'
        },
        steps: [
            { code: 'ChromeDriver driver = new ChromeDriver();', desc: { tr: 'Tarayıcıyı başlat', en: 'Start the browser' } },
            { code: 'DevTools devTools = driver.getDevTools();', desc: { tr: 'DevTools nesnesini al', en: 'Get DevTools object' } },
            { code: 'devTools.createSession();', desc: { tr: 'CDP oturumu oluştur', en: 'Create CDP session' } },
            { code: 'devTools.send(Log.enable());', desc: { tr: 'Log dinlemeyi aktif et', en: 'Enable log listening' } },
            { code: 'devTools.addListener(Log.entryAdded(), entry -> System.out.println(entry.getText()));', desc: { tr: 'Log eklenme olayını dinle', en: 'Add listener for log entry' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! CDP console listener\'ı başarıyla kurdunuz. Artık tarayıcıdaki tüm JS hataları test raporunuza eklenecektir.',
            en: '✓ Congratulations! You successfully set up the CDP console listener. All JS errors in the browser will now be captured in your test report.'
        }
      },
      {
        type: 'quiz',
        question: 'WebDriver BiDi protokolü tarayıcıyla hangi iletişim türünü kullanır?',
        options: [
          { id: 'a', text: 'Tek yönlü HTTP istekleri' },
          { id: 'b', text: 'WebSocket tabanlı çift yönlü iletişim' },
          { id: 'c', text: 'FTP' },
          { id: 'd', text: 'gRPC' },
        ],
        correct: 'b',
        explanation: 'BiDi, "bidirectional" (çift yönlü) anlamına gelir — WebSocket üzerinden tarayıcıyla anlık, çift yönlü iletişim kurar. Bu sayede console log\'ları veya network isteklerini canlı dinleyebiliriz, klasik HTTP request-response modelinin aksine.',
      
        retryQuestion: {
      "question": {
            "tr": "WebDriver BiDi protokolü, klasik HTTP tabanlı komutların aksine hangi avantajı sağlar?",
            "en": "What advantage does the WebDriver BiDi protocol provide over classic HTTP-based commands?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Daha hızlı dosya transferi",
                        "en": "Faster file transfer"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Tarayıcı olaylarını gerçek zamanlı dinleme",
                        "en": "Real-time listening of browser events"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Daha güvenli şifreleme",
                        "en": "More secure encryption"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Daha düşük bellek kullanımı",
                        "en": "Lower memory usage"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "BiDi (Bidirectional), tarayıcıya sadece komut göndermekle kalmaz, aynı zamanda tarayıcıdan gelen olayları (loglar, network verileri vb.) eş zamanlı (real-time) dinlemenize olanak tanır. HTTP modelinde istemci bir şey sormadan sunucu cevap veremez, WebSocket ise bu engeli kaldırır.",
            "en": "BiDi (Bidirectional) allows not only sending commands but also listening to events (logs, network traffic, etc.) from the browser in real-time. In the HTTP model, the server cannot respond unless the client initiates a request, whereas WebSocket removes this limitation."
      }
}
},
    ],
  },
  en: {
    title: '🌐 Chrome DevTools (CDP) & WebDriver BiDi',
    blocks: [
      {
        type: 'simple-box', emoji: '📡',
        content: 'Before Selenium 4, our test code could only tell the browser "click this, type that" without hearing back in real time. Thanks to WebDriver BiDi (like a two-way radio) and CDP, we can now listen to and control the browser\'s internal state (console errors, network requests, geolocation) dynamically.',
      },
      {
        type: 'text',
        content: 'Selenium 4 introduces the W3C WebDriver BiDi protocol and Chrome DevTools Protocol (CDP) integrations, allowing bidirectional WebSocket communication. This enables your test code to listen to browser events, intercept network requests, and modify browser behaviors in real time.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'CDP & BiDi in Java:',
        content: 'In Java, CDP sessions are initialized via `driver.getDevTools()`. For BiDi, high-level helper classes like `LogInspector` or `NetworkInterceptor` manage the WebSocket connection automatically, closing the gap with Playwright\'s event-driven architecture.',
      },
      {
        type: 'heading', text: '1. Console Log & JS Exception Listening'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Console Log Listener',
        code: `import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v125.log.Log;

ChromeDriver driver = new ChromeDriver();
DevTools devTools = driver.getDevTools();
devTools.createSession();

devTools.send(Log.enable());
devTools.addListener(Log.entryAdded(), logEntry -> {
    System.out.println("Console Log: " + logEntry.getText());
    System.out.println("Level: " + logEntry.getLevel());
});

driver.get("https://example.com");`,
      },
      {
        type: 'heading', text: '2. Network Interception (API Mocking)'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — API Mocking with NetworkInterceptor',
        code: `import org.openqa.selenium.devtools.NetworkInterceptor;
import org.openqa.selenium.remote.http.Route;
import org.openqa.selenium.remote.http.HttpResponse;
import static org.openqa.selenium.remote.http.Contents.utf8String;

try (NetworkInterceptor interceptor = new NetworkInterceptor(
        driver,
        Route.matching(req -> req.getUri().contains("/api/user"))
             .to(() -> req -> new HttpResponse()
                 .setStatus(200)
                 .addHeader("Content-Type", "application/json")
                 .setContent(utf8String("{\\"name\\": \\"Mocked User\\", \\"role\\": \\"QA\\"}"))))) {

    driver.get("https://example.com/profile");
}`,
      },
      {
        type: 'heading', text: '3. Geolocation & Device Emulation'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Override Geolocation via CDP',
        code: `import java.util.Map;
import org.openqa.selenium.chrome.ChromeDriver;

Map<String, Object> coordinates = Map.of(
    "latitude", 48.8566,
    "longitude", 2.3522,
    "accuracy", 1
);

driver.executeCdpCommand("Emulation.setGeolocationOverride", coordinates);
driver.get("https://www.google.com/maps");`,
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-bidi-cdp',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumBidiPractice',
        title: { tr: 'Pratik: CDP ile Console Listener Ekle', en: 'Practice: Add Console Listener with CDP' },
        description: {
            tr: 'Selenium 4 Java projesinde CDP ile console loglarını dinlemek için komutları doğru sıraya koyun.',
            en: 'Order the commands to listen to console logs using CDP in a Selenium 4 Java project.'
        },
        steps: [
            { code: 'ChromeDriver driver = new ChromeDriver();', desc: { tr: 'Tarayıcıyı başlat', en: 'Start the browser' } },
            { code: 'DevTools devTools = driver.getDevTools();', desc: { tr: 'DevTools nesnesini al', en: 'Get DevTools object' } },
            { code: 'devTools.createSession();', desc: { tr: 'CDP oturumu oluştur', en: 'Create CDP session' } },
            { code: 'devTools.send(Log.enable());', desc: { tr: 'Log dinlemeyi aktif et', en: 'Enable log listening' } },
            { code: 'devTools.addListener(Log.entryAdded(), entry -> System.out.println(entry.getText()));', desc: { tr: 'Log eklenme olayını dinle', en: 'Add listener for log entry' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! CDP console listener\'ı başarıyla kurdunuz. Artık tarayıcıdaki tüm JS hataları test raporunuza eklenecektir.',
            en: '✓ Congratulations! You successfully set up the CDP console listener. All JS errors in the browser will now be captured in your test report.'
        }
      },
      {
        type: 'quiz',
        question: 'What kind of communication does the WebDriver BiDi protocol use with the browser?',
        options: [
          { id: 'a', text: 'One-way HTTP requests' },
          { id: 'b', text: 'Bidirectional WebSocket communication' },
          { id: 'c', text: 'FTP' },
          { id: 'd', text: 'gRPC' },
        ],
        correct: 'b',
        explanation: 'BiDi stands for "bidirectional" — it uses WebSocket for real-time, two-way communication with the browser, letting you listen to console logs or network requests live, unlike the classic HTTP request-response model.',
      
        retryQuestion: {
      "question": "If you want to receive push notifications from the browser about console errors while a script is running, which protocol enables this functionality?",
      "options": [
            {
                  "id": "a",
                  "text": "REST API"
            },
            {
                  "id": "b",
                  "text": "WebDriver BiDi"
            },
            {
                  "id": "c",
                  "text": "Legacy WebDriver JSON Wire Protocol"
            },
            {
                  "id": "d",
                  "text": "gRPC"
            }
      ],
      "correct": "b",
      "explanation": "The WebDriver BiDi protocol is specifically designed for bidirectional communication using WebSockets. This allows the browser to send data back to the automation client (like console logs or network events) without the client explicitly requesting it, which is not possible with older, request-response based protocols."
}
},
    ],
  },
}

// ─── S9: VIRTUAL AUTHENTICATOR & ADVANCED FEATURES ───────────────────────────
const s9 = {
  tr: {
    title: '🔐 Sanal Auth & Gelişmiş Özellikler',
    blocks: [
      {
        type: 'simple-box', emoji: '🔑',
        content: 'Biyometrik parmak izi okuyucuları veya USB güvenlik anahtarlarını (Passkey) Selenium testinde nasıl kullanırsınız? Gerçek bir insan gibi parmak izi basamayacağımıza göre, Selenium 4 bize sanal bir doğrulayıcı (Virtual Authenticator) oluşturup şifresiz giriş senaryolarını test etme imkanı sunar.',
      },
      {
        type: 'text',
        content: 'Selenium 4, WebAuthn (Passkeys, FIDO2) testlerini desteklemek için Virtual Authenticator API sunar. Ayrıca tarayıcı pencerelerini PDF olarak kaydetmeyi sağlayan Print API\'si ve hassas mouse-wheel/stylus eylemleri için Pen & Wheel Actions API\'si bu sürümle gelen diğer gelişmiş özelliklerdir.',
      },
      {
        type: 'heading', text: '1. Virtual Authenticator (WebAuthn / Passkeys)'
      },
      {
        type: 'text',
        content: 'Sanal bir kimlik doğrulayıcı ekleyerek iki adımlı güvenlik (2FA) veya Passkey giriş akışlarını simüle edebiliriz. Java\'da `HasVirtualAuthenticator` arayüzü ile yönetilir.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Virtual Authenticator Kurulumu',
        code: `import org.openqa.selenium.virtualauthenticator.HasVirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticatorOptions;

HasVirtualAuthenticator authDriver = (HasVirtualAuthenticator) driver;
VirtualAuthenticatorOptions options = new VirtualAuthenticatorOptions();
options.setProtocol(VirtualAuthenticatorOptions.Protocol.CTAP2)
       .setTransport(VirtualAuthenticatorOptions.Transport.USB)
       .setHasUserVerification(true)
       .setIsUserVerified(true);

// Sanal kimlik doğrulayıcı oluştur
VirtualAuthenticator authenticator = authDriver.addVirtualAuthenticator(options);

driver.get("https://webauthn.io");
// Passkey kaydı ve giriş işlemlerini yap...
authDriver.removeVirtualAuthenticator(authenticator);`,
      },
      {
        type: 'heading', text: '2. Print Page (Headless PDF Kaydetme)'
      },
      {
        type: 'text',
        content: 'Fatura, makbuz veya rapor sayfalarını PDF formatında yazdırmak ve doğrulamak için `PrintsPage` arayüzü kullanılır. Bu özellik tarayıcının headless (ekransız) modda çalışmasını gerektirir.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Sayfayı PDF Olarak Kaydetme',
        code: `import org.openqa.selenium.print.PrintOptions;
import org.openqa.selenium.PrintsPage;
import org.openqa.selenium.Pdf;
import java.nio.file.Files;
import java.nio.file.Paths;

// Headless modda ChromeOptions ayarlanmalıdır!
PrintsPage printer = (PrintsPage) driver;
PrintOptions printOptions = new PrintOptions();
printOptions.setPageRanges("1-2"); // Sadece ilk iki sayfayı yazdır

Pdf pdf = printer.print(printOptions);
Files.write(Paths.get("fatura.pdf"), Base64.getDecoder().decode(pdf.getContent()));`,
      },
      {
        type: 'heading', text: '3. Pen & Wheel Actions (Hassas Kaydırma)'
      },
      {
        type: 'text',
        content: 'Actions API ile artık farenin tekerleğini (scroll wheel) veya dijital kalemi (pen/stylus) simüle edebilirsiniz. Belirli bir piksel miktarında veya elemente göre scroll işlemleri yapılabilir.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Wheel Scroll & Pen Input',
        code: `import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.interactions.WheelInput;

// Sayfayı bir elementten itibaren 200 piksel aşağı kaydır
WheelInput.ScrollOrigin scrollOrigin = WheelInput.ScrollOrigin.fromElement(footerElement);
new Actions(driver)
    .scrollFromOrigin(scrollOrigin, 0, 200)
    .perform();`,
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-virtual-auth',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumVirtualAuthPractice',
        title: { tr: 'Pratik: Sayfa PDF Çıktısı Alma', en: 'Practice: Get Page PDF Output' },
        description: {
            tr: 'Selenium 4 projesinde bir web sayfasını PDF olarak kaydetmek için adımları doğru sıraya koyun.',
            en: 'Order the steps to print a web page to PDF in a Selenium 4 project.'
        },
        steps: [
            { code: 'PrintsPage printer = (PrintsPage) driver;', desc: { tr: 'Sürücüyü PrintsPage tipine cast et', en: 'Cast driver to PrintsPage' } },
            { code: 'PrintOptions options = new PrintOptions();', desc: { tr: 'Yazdırma seçeneklerini oluştur', en: 'Create PrintOptions' } },
            { code: 'options.setPageRanges("1");', desc: { tr: 'İlk sayfayı basmak için filtre koy', en: 'Set range to print first page' } },
            { code: 'Pdf pdf = printer.print(options);', desc: { tr: 'PDF çıktısı üret', en: 'Generate PDF output' } },
            { code: 'Files.write(Paths.get("test.pdf"), Base64.getDecoder().decode(pdf.getContent()));', desc: { tr: 'PDF dosyasını diske yaz', en: 'Write PDF to disk' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Print API adımlarını başarıyla sıraladınız. Artık fatura sayfalarını otomatik test edebilirsiniz.',
            en: '✓ Congratulations! You correctly ordered the Print API steps. You can now test invoice pages automatically.'
        }
      },
      {
        type: 'quiz',
        question: 'Bir web sayfasını headless modda PDF olarak kaydetmek için hangi arayüz kullanılır?',
        options: [
          { id: 'a', text: 'HasVirtualAuthenticator' },
          { id: 'b', text: 'PrintsPage' },
          { id: 'c', text: 'WheelInput' },
          { id: 'd', text: 'NetworkInterceptor' },
        ],
        correct: 'b',
        explanation: 'PrintsPage arayüzünün print() metodu sayfayı PDF formatında dışa aktarır ve headless (ekransız) tarayıcı modu gerektirir. HasVirtualAuthenticator ise WebAuthn/Passkey testleri için kullanılır.',
      
        retryQuestion: {
      "question": "Headless tarayıcıda bir web sayfasının görüntüsünü veya PDF çıktısını almak için kullanılan spesifik arayüz hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "TakeScreenshot"
            },
            {
                  "id": "b",
                  "text": "PrintsPage"
            },
            {
                  "id": "c",
                  "text": "BrowserContext"
            },
            {
                  "id": "d",
                  "text": "DevToolsSession"
            }
      ],
      "correct": "b",
      "explanation": "PrintsPage arayüzü, web sayfalarını PDF'e yazdırmak için gerekli olan print() metodunu sağlar. Diğer seçenekler ekran görüntüsü alma veya oturum yönetimi ile ilgilidir, PDF dışa aktarma fonksiyonuna sahip değildir."
}
},
    ],
  },
  en: {
    title: '🔐 Virtual Authenticator & Advanced Features',
    blocks: [
      {
        type: 'simple-box', emoji: '🔑',
        content: 'How do you test biometric fingerprint scanners or USB security keys (Passkeys) in a Selenium test? Since we can\'t press a physical fingerprint reader on a CI server, Selenium 4 allows us to add a Virtual Authenticator to mock these passwordless login flows.',
      },
      {
        type: 'text',
        content: 'Selenium 4 introduces the Virtual Authenticator API to support WebAuthn (Passkeys, FIDO2) testing. It also features a new Print API for saving pages as PDFs, and Pen & Wheel Actions for advanced stylus and scroll-wheel gestures.',
      },
      {
        type: 'heading', text: '1. Virtual Authenticator (WebAuthn / Passkeys)'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Setting up a Virtual Authenticator',
        code: `import org.openqa.selenium.virtualauthenticator.HasVirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticatorOptions;

HasVirtualAuthenticator authDriver = (HasVirtualAuthenticator) driver;
VirtualAuthenticatorOptions options = new VirtualAuthenticatorOptions();
options.setProtocol(VirtualAuthenticatorOptions.Protocol.CTAP2)
       .setTransport(VirtualAuthenticatorOptions.Transport.USB)
       .setHasUserVerification(true)
       .setIsUserVerified(true);

VirtualAuthenticator authenticator = authDriver.addVirtualAuthenticator(options);
driver.get("https://webauthn.io");
// Perform passkey registration/login tests...
authDriver.removeVirtualAuthenticator(authenticator);`,
      },
      {
        type: 'heading', text: '2. Print Page (Headless PDF Export)'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Saving Page to PDF',
        code: `import org.openqa.selenium.print.PrintOptions;
import org.openqa.selenium.PrintsPage;
import org.openqa.selenium.Pdf;
import java.nio.file.Files;
import java.nio.file.Paths;

// Note: Requires headless mode configuration in ChromeOptions!
PrintsPage printer = (PrintsPage) driver;
PrintOptions printOptions = new PrintOptions();
printOptions.setPageRanges("1-2");

Pdf pdf = printer.print(printOptions);
Files.write(Paths.get("invoice.pdf"), Base64.getDecoder().decode(pdf.getContent()));`,
      },
      {
        type: 'heading', text: '3. Pen & Wheel Actions (Precise Scrolling)'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Wheel Scroll Gestures',
        code: `import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.interactions.WheelInput;

WheelInput.ScrollOrigin scrollOrigin = WheelInput.ScrollOrigin.fromElement(footerElement);
new Actions(driver)
    .scrollFromOrigin(scrollOrigin, 0, 200)
    .perform();`,
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-virtual-auth',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumVirtualAuthPractice',
        title: { tr: 'Pratik: Sayfa PDF Çıktısı Alma', en: 'Practice: Get Page PDF Output' },
        description: {
            tr: 'Selenium 4 projesinde bir web sayfasını PDF olarak kaydetmek için adımları doğru sıraya koyun.',
            en: 'Order the steps to print a web page to PDF in a Selenium 4 project.'
        },
        steps: [
            { code: 'PrintsPage printer = (PrintsPage) driver;', desc: { tr: 'Sürücüyü PrintsPage tipine cast et', en: 'Cast driver to PrintsPage' } },
            { code: 'PrintOptions options = new PrintOptions();', desc: { tr: 'Yazdırma seçeneklerini oluştur', en: 'Create PrintOptions' } },
            { code: 'options.setPageRanges("1");', desc: { tr: 'İlk sayfayı basmak için filtre koy', en: 'Set range to print first page' } },
            { code: 'Pdf pdf = printer.print(options);', desc: { tr: 'PDF çıktısı üret', en: 'Generate PDF output' } },
            { code: 'Files.write(Paths.get("test.pdf"), Base64.getDecoder().decode(pdf.getContent()));', desc: { tr: 'PDF dosyasını diske yaz', en: 'Write PDF to disk' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Print API adımlarını başarıyla sıraladınız. Artık fatura sayfalarını otomatik test edebilirsiniz.',
            en: '✓ Congratulations! You correctly ordered the Print API steps. You can now test invoice pages automatically.'
        }
      },
      {
        type: 'quiz',
        question: 'Which interface is used to save a web page as a PDF in headless mode?',
        options: [
          { id: 'a', text: 'HasVirtualAuthenticator' },
          { id: 'b', text: 'PrintsPage' },
          { id: 'c', text: 'WheelInput' },
          { id: 'd', text: 'NetworkInterceptor' },
        ],
        correct: 'b',
        explanation: 'The PrintsPage interface\'s print() method exports the page as a PDF and requires headless browser mode. HasVirtualAuthenticator, by contrast, is used for WebAuthn/Passkey testing.',
      
        retryQuestion: {
      "question": "Which interface allows you to invoke the printing functionality of a browser to generate a PDF document?",
      "options": [
            {
                  "id": "a",
                  "text": "PageRenderer"
            },
            {
                  "id": "b",
                  "text": "PrintsPage"
            },
            {
                  "id": "c",
                  "text": "PdfConverter"
            },
            {
                  "id": "d",
                  "text": "DocumentHandler"
            }
      ],
      "correct": "b",
      "explanation": "The PrintsPage interface is specifically designed to handle print operations, including exporting web content to PDF files. Other options provided are not standard interfaces for this specific browser automation capability."
}
},
    ],
  },
}

// ─── S10: SELENIUM IDE ───────────────────────────────────────────────────────
const s10 = {
  tr: {
    title: '🖥️ Selenium IDE — Kayıt & Oynatmanın Ötesi',
    blocks: [
      {
        type: 'simple-box', emoji: '🎥',
        content: 'Selenium IDE, test yazmayı bilmeyenlerin kullandığı basit bir tarayıcı eklentisinden ibaret değildir. Kayıt & oynatmanın ötesinde, içinde if-else koşulları, döngüler kurabilir, testleri komut satırından paralel çalıştırabilir ve bunları doğrudan Java JUnit koduna dönüştürebilirsiniz.',
      },
      {
        type: 'text',
        content: 'Selenium IDE, Chrome ve Firefox eklentisi olarak hızlı prototipleme sağlayan bir araçtır. Komut-Hedef-Değer yapısıyla çalışır. Gelişmiş control flow (koşul ve döngüler) desteğine sahiptir ve testlerin `.side` formatında kaydedilip çalıştırılmasına izin verir.',
      },
      {
        type: 'heading', text: '1. Selenium IDE Komut Yapısı'
      },
      {
        type: 'table',
        headers: ['Komut', 'Hedef (Target)', 'Değer (Value)', 'Açıklama'],
        rows: [
            ['open', '/login', '', 'Belirtilen URL\'i açar.'],
            ['click', 'id=submit-btn', '', 'Elemente tıklar.'],
            ['type', 'name=email', 'qa@example.com', 'Metin alanına veri yazar.'],
            ['assertText', 'css=.title', 'Dashboard', 'Metnin eşleştiğini doğrular (fail durumunda durur).'],
            ['verifyElementPresent', 'id=logo', '', 'Elementin sayfada olduğunu kontrol eder (durmaz).'],
        ],
      },
      {
        type: 'heading', text: '2. Control Flow (Koşul ve Döngüler)'
      },
      {
        type: 'text',
        content: 'IDE içinde `if`, `else if`, `else`, `end` komutlarıyla koşullu dallanmalar yapabilir; `times`, `while`, `forEach` ile tekrarlayan döngü testleri kurgulayabilirsiniz. Bu özellik, karmaşık senaryoları kod yazmadan çözmeyi kolaylaştırır.',
      },
      {
        type: 'heading', text: '3. Command Line Runner (selenium-side-runner)'
      },
      {
        type: 'text',
        content: 'Kaydedilen `.side` test dosyalarını Node.js tabanlı `selenium-side-runner` yardımıyla Jenkins üzerinde veya yerelde headless (ekransız) ve paralel olarak çalıştırabilirsiniz.',
      },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Command Line Runner Kurulum ve Çalıştırma',
        code: `# Eklenti ve runner\'ı npm ile kur
npm install -g selenium-side-runner
npm install -g chromedriver

# Test dosyasını paralel 4 thread ile çalıştır
selenium-side-runner -c "browserName=chrome" -w 4 projem.side`,
      },
      {
        type: 'heading', text: '4. Kod Olarak Dışa Aktarma (Code Export)'
      },
      {
        type: 'text',
        content: 'IDE\'de kaydettiğiniz adımları sağ tıklayıp "Export" diyerek Java (JUnit/TestNG), Python (pytest) veya JavaScript formatında temiz bir WebDriver koduna dönüştürebilirsiniz. Bu, POM mimarisine başlarken şablon kod oluşturmak için mükemmeldir.',
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-ide-flow',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumIdePractice',
        title: { tr: 'Pratik: Selenium IDE Control Flow', en: 'Practice: Selenium IDE Control Flow' },
        description: {
            tr: 'Selenium IDE içinde bir if-else koşullu doğrulama akışı oluşturmak için komutları doğru sıraya koyun.',
            en: 'Order the commands to create an if-else validation flow in Selenium IDE.'
        },
        steps: [
            { code: 'open | /dashboard', desc: { tr: 'Dashboard sayfasını aç', en: 'Open dashboard page' } },
            { code: 'if | ${isLoggedIn} === true', desc: { tr: 'Eğer giriş başarılı ise koşulunu aç', en: 'Open if condition' } },
            { code: 'assertText | css=.username | QA Admin', desc: { tr: 'Kullanıcı adını doğrula', en: 'Verify username' } },
            { code: 'else', desc: { tr: 'Giriş yapılmadıysa', en: 'Else condition' } },
            { code: 'assertElementPresent | id=login-button', desc: { tr: 'Giriş butonunun orada olduğunu doğrula', en: 'Verify login button present' } },
            { code: 'end', desc: { tr: 'Koşulu kapat', en: 'End condition' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Selenium IDE control flow mantığını doğru şekilde kurdunuz. IDE artık sadece kayıt cihazı değil!',
            en: '✓ Congratulations! You correctly set up the Selenium IDE control flow. The IDE is no longer just a recorder!'
        }
      },
      {
        type: 'quiz',
        question: 'Selenium IDE\'de "assertText" komutu başarısız olursa ne olur?',
        options: [
          { id: 'a', text: 'Test durur (fail olur)' },
          { id: 'b', text: 'Test devam eder ama loglar' },
          { id: 'c', text: 'Hiçbir şey olmaz' },
          { id: 'd', text: 'Tarayıcı kapanır' },
        ],
        correct: 'a',
        explanation: 'assertText başarısız olursa test hemen durur (fail). "verifyElementPresent" gibi verify* komutları ise başarısız olsa bile testi durdurmaz, sadece kaydeder — fark budur.',
      
        retryQuestion: {
      "question": "Selenium IDE'de \"verifyText\" komutu ile \"assertText\" komutu arasındaki temel fark nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "assertText başarısız olursa test yürütmeyi durdurur, verifyText devam eder"
            },
            {
                  "id": "b",
                  "text": "verifyText başarısız olursa tarayıcıyı anında kapatır"
            },
            {
                  "id": "c",
                  "text": "İkisi arasında hiçbir fark yoktur"
            },
            {
                  "id": "d",
                  "text": "assertText sadece loglama yapar, verifyText testi durdurur"
            }
      ],
      "correct": "a",
      "explanation": "assert* komutları kritik kontroller içindir ve bir hata durumunda testi anında durdurur (fail). verify* komutları ise testin hata alsa bile çalışmaya devam etmesini sağlar, sadece hata kaydı oluşturur."
}
},
    ],
  },
  en: {
    title: '🖥️ Selenium IDE — Beyond Record & Playback',
    blocks: [
      {
        type: 'simple-box', emoji: '🎥',
        content: 'Selenium IDE is not just a simple recorder for non-technical users. Beyond recording, it supports conditional execution (if-else), loops, running tests in parallel via CLI, and exporting steps directly to clean JUnit/TestNG Java code.',
      },
      {
        type: 'text',
        content: 'Selenium IDE is a Chrome/Firefox extension enabling fast prototyping. Using a Command-Target-Value structure, it features advanced control flows and exports code formats like Java, Python, and JavaScript.',
      },
      {
        type: 'heading', text: '1. Selenium IDE Command Structure'
      },
      {
        type: 'table',
        headers: ['Command', 'Target', 'Value', 'Description'],
        rows: [
            ['open', '/login', '', 'Opens the specified URL.'],
            ['click', 'id=submit-btn', '', 'Clicks on the element.'],
            ['type', 'name=email', 'qa@example.com', 'Types text into input field.'],
            ['assertText', 'css=.title', 'Dashboard', 'Asserts text matches (fails immediately if false).'],
            ['verifyElementPresent', 'id=logo', '', 'Verifies element is present (doesn\'t stop test execution).'],
        ],
      },
      {
        type: 'heading', text: '2. Control Flow (Conditions & Loops)'
      },
      {
        type: 'text',
        content: 'Inside the IDE, you can create conditional branches using `if`, `else if`, `else`, `end` commands, and repeating loops with `times`, `while`, and `forEach` without writing a single line of script.',
      },
      {
        type: 'heading', text: '3. Command Line Runner (selenium-side-runner)'
      },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Runner Setup & Execution',
        code: `# Install via npm globally
npm install -g selenium-side-runner
npm install -g chromedriver

# Run side file in parallel with 4 workers
selenium-side-runner -c "browserName=chrome" -w 4 project.side`,
      },
      {
        type: 'heading', text: '4. Code Export capabilities'
      },
      {
        type: 'text',
        content: 'You can right-click any suite in the IDE and choose "Export" to export your test scripts into Java (JUnit/TestNG), Python (pytest), or JavaScript code. This creates excellent boilerplate template code to start with.',
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-ide-flow',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumIdePractice',
        title: { tr: 'Pratik: Selenium IDE Control Flow', en: 'Practice: Selenium IDE Control Flow' },
        description: {
            tr: 'Selenium IDE içinde bir if-else koşullu doğrulama akışı oluşturmak için komutları doğru sıraya koyun.',
            en: 'Order the commands to create an if-else validation flow in Selenium IDE.'
        },
        steps: [
            { code: 'open | /dashboard', desc: { tr: 'Dashboard sayfasını aç', en: 'Open dashboard page' } },
            { code: 'if | ${isLoggedIn} === true', desc: { tr: 'Eğer giriş başarılı ise koşulunu aç', en: 'Open if condition' } },
            { code: 'assertText | css=.username | QA Admin', desc: { tr: 'Kullanıcı adını doğrula', en: 'Verify username' } },
            { code: 'else', desc: { tr: 'Giriş yapılmadıysa', en: 'Else condition' } },
            { code: 'assertElementPresent | id=login-button', desc: { tr: 'Giriş butonunun orada olduğunu doğrula', en: 'Verify login button present' } },
            { code: 'end', desc: { tr: 'Koşulu kapat', en: 'End condition' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Selenium IDE control flow mantığını doğru şekilde kurdunuz. IDE artık sadece kayıt cihazı değil!',
            en: '✓ Congratulations! You correctly set up the Selenium IDE control flow. The IDE is no longer just a recorder!'
        }
      },
      {
        type: 'quiz',
        question: 'What happens if the "assertText" command fails in Selenium IDE?',
        options: [
          { id: 'a', text: 'The test stops immediately (fails)' },
          { id: 'b', text: 'The test continues but logs it' },
          { id: 'c', text: 'Nothing happens' },
          { id: 'd', text: 'The browser closes' },
        ],
        correct: 'a',
        explanation: 'If assertText fails, the test stops immediately. verify* commands like verifyElementPresent, on the other hand, do NOT stop the test even on failure — that\'s the key difference.',
      
        retryQuestion: {
      "question": "What is the primary difference between using 'assertElementPresent' and 'verifyElementPresent' in Selenium IDE?",
      "options": [
            {
                  "id": "a",
                  "text": "Both commands stop the test if they fail."
            },
            {
                  "id": "b",
                  "text": "assertElementPresent stops execution on failure, while verifyElementPresent continues."
            },
            {
                  "id": "c",
                  "text": "verifyElementPresent stops execution on failure, while assertElementPresent continues."
            },
            {
                  "id": "d",
                  "text": "Neither command stops the test regardless of the outcome."
            }
      ],
      "correct": "b",
      "explanation": "In Selenium IDE, 'assert' commands are fatal; if the assertion fails, the test stops immediately. 'verify' commands are non-fatal, meaning the test will log the failure but continue to execute the remaining steps."
}
},
    ],
  },
}

// ─── S11: SELENIUM GRID 4 ────────────────────────────────────────────────────
const s11 = {
  tr: {
    title: '🌐 Selenium Grid 4 & Dağıtık Otomasyon',
    blocks: [
      {
        type: 'simple-box', emoji: '🚢',
        content: '100 adet testi tek bir bilgisayarda sırayla çalıştırmak saatler sürer. Selenium Grid 4, testleri bir limandaki konteynerler gibi farklı işletim sistemleri (Linux, Windows, macOS) ve tarayıcılara (Chrome, Firefox, Safari) paralel olarak dağıtıp saniyeler içinde koşturan filo komutanıdır.',
      },
      {
        type: 'text',
        content: 'Selenium Grid 4, testleri farklı makinelerde (Nodes) paralel olarak çalıştırmayı sağlayan dağıtık bir altyapıdır. Hub/Node modelinin ötesine geçerek mikroservis mimarisine kavuşmuştur. Docker ve Kubernetes entegrasyonu sayesinde dinamik olarak browser ayağa kaldırıp kapatabilir.',
      },
      {
        type: 'heading', text: '1. Grid 4 Mikroservis Mimarisi'
      },
      {
        type: 'grid', cols: 3,
        items: [
            { icon: '🚦', label: 'Router', desc: 'İsteklerin giriş noktasıdır. Gelen test taleplerini doğru bileşenlere yönlendirir.' },
            { icon: '🗂️', label: 'Distributor', desc: 'Kuyruktaki istekleri alır ve uygun özelliklere sahip boş Node\'lara dağıtır.' },
            { icon: '🗺️', label: 'Session Map', desc: 'Hangi test session\'ının hangi Node üzerinde çalıştığı eşleşmesini tutar.' },
            { icon: '📥', label: 'Session Queue', desc: 'Aynı anda çalışamayacak kadar çok test geldiğinde istekleri kuyrukta bekletir.' },
            { icon: '🚌', label: 'Event Bus', desc: 'Bileşenlerin asenkron olarak haberleştiği WebSocket tabanlı mesaj hattıdır.' },
            { icon: '💻', label: 'Node', desc: 'Testlerin üzerinde koştuğu, tarayıcılara ev sahipliği yapan gerçek veya sanal makinedir.' },
        ],
      },
      {
        type: 'heading', text: '2. Grid Çalışma Modları'
      },
      {
        type: 'table',
        headers: ['Mod', 'Nasıl Çalışır?', 'Kullanım Amacı'],
        rows: [
            ['Standalone', 'Tüm bileşenler tek bir JAR dosyasında, tek proseste çalışır.', 'Yerel denemeler, küçük ölçekli testler.'],
            ['Hub & Node', 'Bileşenler Hub (Router/Distributor vb.) ve Node olarak ikiye bölünür.', 'Orta ölçekli ekipler, birkaç fiziksel makine.'],
            ['Distributed', '6 bileşenin tamamı ayrı sunucularda veya Docker\'da mikroservis olarak ayağa kalkar.', 'Büyük ölçekli bulut altyapıları, yüksek paralel yükler.'],
        ],
      },
      {
        type: 'heading', text: '3. Docker & Dynamic Grid Kurulumu'
      },
      {
        type: 'text',
        content: 'Dynamic Grid modu, test isteği geldiğinde Docker daemon\'a bağlanıp anında temiz bir Chrome/Firefox konteyneri oluşturur, testi çalıştırır ve test bittiğinde bu konteyneri imha eder. Bu, kaynak israfını ve "flaky" testleri tamamen önler.',
      },
      {
        type: 'code', language: 'yaml',
        label: 'docker-compose.yml — Selenium Grid 4 Hub & Node Altyapısı',
        code: `version: "3"
services:
  selenium-hub:
    image: selenium/hub:4.25.0
    container_name: selenium-hub
    ports:
      - "4444:4444"

  chrome-node:
    image: selenium/node-chrome:4.25.0
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4`,
      },
      {
        type: 'heading', text: '4. RemoteWebDriver ile Grid\'e Bağlanma'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — RemoteWebDriver İle Grid\'de Çalıştırma',
        code: `import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.net.URL;

ChromeOptions options = new ChromeOptions();
// Grid 4 standardı olarak capabilities options ile gönderilir
options.setPlatformName("LINUX");
options.setBrowserVersion("125.0");

WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"), 
    options
);

driver.get("https://learnqa.dev");
driver.quit();`,
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-grid-architecture',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumGridPractice',
        title: { tr: 'Pratik: RemoteWebDriver Grid Bağlantısı', en: 'Practice: RemoteWebDriver Grid Connection' },
        description: {
            tr: 'Bir Java automation projesinde testleri Selenium Grid üzerinde çalıştırmak için komutları doğru sıraya koyun.',
            en: 'Order the commands to run tests on Selenium Grid using RemoteWebDriver in a Java project.'
        },
        steps: [
            { code: 'ChromeOptions options = new ChromeOptions();', desc: { tr: 'Tarayıcı seçeneklerini tanımla', en: 'Define browser options' } },
            { code: 'options.setPlatformName("Linux");', desc: { tr: 'Çalıştırılacak platform işletim sistemini seç', en: 'Set execution platform OS' } },
            { code: 'URL gridUrl = new URL("http://localhost:4444/wd/hub");', desc: { tr: 'Selenium Grid URL adresini tanımla', en: 'Define Selenium Grid URL' } },
            { code: 'WebDriver driver = new RemoteWebDriver(gridUrl, options);', desc: { tr: 'RemoteWebDriver ile oturumu başlat', en: 'Start session with RemoteWebDriver' } },
            { code: 'driver.get("https://learnqa.dev");', desc: { tr: 'Test adımlarını koştur', en: 'Run test steps' } },
            { code: 'driver.quit();', desc: { tr: 'Oturumu kapat ve kaynakları temizle', en: 'Close session and clean resources' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Grid üzerinde RemoteWebDriver oturumu açma adımlarını başarıyla sıraladınız. Artık paralel testlere hazırsınız.',
            en: '✓ Congratulations! You correctly ordered the RemoteWebDriver session steps on the Grid. You are ready for parallel testing.'
        }
      },
      {
        type: 'quiz',
        question: 'Selenium Grid 4 mimarisinde kuyruktaki istekleri alıp uygun Node\'lara dağıtan bileşen hangisidir?',
        options: [
          { id: 'a', text: 'Router' },
          { id: 'b', text: 'Distributor' },
          { id: 'c', text: 'Session Map' },
          { id: 'd', text: 'Event Bus' },
        ],
        correct: 'b',
        explanation: 'Distributor, kuyruktaki test isteklerini alıp uygun özelliklere (browser, OS) sahip boş Node\'lara dağıtır. Router gelen istekleri doğru bileşene yönlendirir, Session Map ise hangi session\'ın hangi Node\'da çalıştığını takip eder.',
      
        retryQuestion: {
      "question": "Selenium Grid 4 mimarisinde hangi bileşen, aktif olan test oturumlarını ve bunların hangi Node üzerinde çalıştığını takip ederek Session ID ile Node eşleşmesini sağlar?",
      "options": [
            {
                  "id": "a",
                  "text": "Distributor"
            },
            {
                  "id": "b",
                  "text": "Router"
            },
            {
                  "id": "c",
                  "text": "Session Map"
            },
            {
                  "id": "d",
                  "text": "Node"
            }
      ],
      "correct": "c",
      "explanation": "Session Map, Selenium Grid 4'te oturum ID'lerini ve bu oturumların hangi Node üzerinde çalıştığını kayıt altında tutan bileşendir. Distributor sadece dağıtımı yaparken, Session Map yürütülen oturumların durumunu yönetir."
}
},
    ],
  },
  en: {
    title: '🌐 Selenium Grid 4 & Distributed Automation',
    blocks: [
      {
        type: 'simple-box', emoji: '🚢',
        content: 'Running 100 E2E tests on a single machine sequentially takes hours. Selenium Grid 4 distributes tests across various OS platforms (Linux, Windows, macOS) and browsers (Chrome, Firefox, Safari) in parallel like shipping containers at a port, completing runs in seconds.',
      },
      {
        type: 'text',
        content: 'Selenium Grid 4 is a distributed execution infrastructure. Redesigned into a microservices architecture, it supports scalable parallel executions and Docker/Kubernetes dynamic browser containerization.',
      },
      {
        type: 'heading', text: '1. Grid 4 Microservices Architecture'
      },
      {
        type: 'grid', cols: 3,
        items: [
            { icon: '🚦', label: 'Router', desc: 'The single entry point. Routes incoming test requests to correct components.' },
            { icon: '🗂️', label: 'Distributor', desc: 'Receives pending requests from the queue and assigns them to free Nodes.' },
            { icon: '🗺️', label: 'Session Map', desc: 'Tracks which test session is executing on which physical/virtual Node.' },
            { icon: '📥', label: 'Session Queue', desc: 'Queues up incoming requests if execution limits are saturated.' },
            { icon: '🚌', label: 'Event Bus', desc: 'A WebSocket-based communication line where Grid components talk asynchronously.' },
            { icon: '💻', label: 'Node', desc: 'The execution host hosting actual browsers and executing driver instructions.' },
        ],
      },
      {
        type: 'heading', text: '2. Grid Execution Modes'
      },
      {
        type: 'table',
        headers: ['Mode', 'How It Works?', 'Best Used For'],
        rows: [
            ['Standalone', 'All components run inside a single process from a single JAR file.', 'Local testing and quick experiments.'],
            ['Hub & Node', 'Split into a central Hub process (Router/Distributor) and one or more Nodes.', 'Medium-scale teams using dedicated execution hosts.'],
            ['Distributed', 'All 6 microservice components run as completely isolated processes/containers.', 'Large enterprise setups running massive parallel test loads.'],
        ],
      },
      {
        type: 'heading', text: '3. Docker & Dynamic Grid'
      },
      {
        type: 'text',
        content: 'In Dynamic Grid mode, the Distributor connects directly to a Docker daemon. When a test request arrives, it spins up a fresh, clean browser container, executes the test, and immediately destroys it upon completion, preventing cross-test pollution.',
      },
      {
        type: 'code', language: 'yaml',
        label: 'docker-compose.yml — Selenium Grid 4 Hub & Node Setup',
        code: `version: "3"
services:
  selenium-hub:
    image: selenium/hub:4.25.0
    container_name: selenium-hub
    ports:
      - "4444:4444"

  chrome-node:
    image: selenium/node-chrome:4.25.0
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4`,
      },
      {
        type: 'heading', text: '4. RemoteWebDriver Code Integration'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — RemoteWebDriver Grid Connection',
        code: `import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.net.URL;

ChromeOptions options = new ChromeOptions();
options.setPlatformName("LINUX");
options.setBrowserVersion("125.0");

WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"), 
    options
);

driver.get("https://learnqa.dev");
driver.quit();`,
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-grid-architecture',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumGridPractice',
        title: { tr: 'Pratik: RemoteWebDriver Grid Bağlantısı', en: 'Practice: RemoteWebDriver Grid Connection' },
        description: {
            tr: 'Bir Java automation projesinde testleri Selenium Grid üzerinde çalıştırmak için komutları doğru sıraya koyun.',
            en: 'Order the commands to run tests on Selenium Grid using RemoteWebDriver in a Java project.'
        },
        steps: [
            { code: 'ChromeOptions options = new ChromeOptions();', desc: { tr: 'Tarayıcı seçeneklerini tanımla', en: 'Define browser options' } },
            { code: 'options.setPlatformName("Linux");', desc: { tr: 'Çalıştırılacak platform işletim sistemini seç', en: 'Set execution platform OS' } },
            { code: 'URL gridUrl = new URL("http://localhost:4444/wd/hub");', desc: { tr: 'Selenium Grid URL adresini tanımla', en: 'Define Selenium Grid URL' } },
            { code: 'WebDriver driver = new RemoteWebDriver(gridUrl, options);', desc: { tr: 'RemoteWebDriver ile oturumu başlat', en: 'Start session with RemoteWebDriver' } },
            { code: 'driver.get("https://learnqa.dev");', desc: { tr: 'Test adımlarını koştur', en: 'Run test steps' } },
            { code: 'driver.quit();', desc: { tr: 'Oturumu kapat ve kaynakları temizle', en: 'Close session and clean resources' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Grid üzerinde RemoteWebDriver oturumu açma adımlarını başarıyla sıraladınız. Artık paralel testlere hazırsınız.',
            en: '✓ Congratulations! You correctly ordered the RemoteWebDriver session steps on the Grid. You are ready for parallel testing.'
        }
      },
      {
        type: 'quiz',
        question: 'In the Selenium Grid 4 architecture, which component takes queued requests and assigns them to suitable Nodes?',
        options: [
          { id: 'a', text: 'Router' },
          { id: 'b', text: 'Distributor' },
          { id: 'c', text: 'Session Map' },
          { id: 'd', text: 'Event Bus' },
        ],
        correct: 'b',
        explanation: 'The Distributor takes queued test requests and assigns them to free Nodes with matching capabilities (browser, OS). The Router directs incoming requests to the right component, while Session Map tracks which session runs on which Node.',
      
        retryQuestion: {
      "question": "In the Selenium Grid 4 architecture, which component is responsible for receiving the incoming HTTP requests from the client and forwarding them to the appropriate component?",
      "options": [
            {
                  "id": "a",
                  "text": "Router"
            },
            {
                  "id": "b",
                  "text": "Distributor"
            },
            {
                  "id": "c",
                  "text": "Node"
            },
            {
                  "id": "d",
                  "text": "Event Bus"
            }
      ],
      "correct": "a",
      "explanation": "The Router acts as the entry point for all incoming requests in Selenium Grid 4. It inspects the request and directs it to the Distributor (if it's a new session request) or to the Session Map (if it's an existing session request)."
}
},
    ],
  },
}

// ─── S12: YAYGIN HATALAR (Eski S8) ───────────────────────────────────────────
const s12 = {
  tr: {
    title: '🚨 Yaygın Hatalar & Çözümleri',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Selenium öğrenirken herkes aynı hataları yapar. Bu bölüm en sık karşılaşılan 10 hatayı ve çözümlerini içerir — copy-paste yapıp gerçek hata mesajınızla karşılaştırabilirsiniz.',
      },
      {
        type: 'error-dictionary',
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
      {
        type: 'quiz',
        question: 'Bir React/Vue (SPA) uygulamasında DOM sürekli güncellendiği için en sık karşılaşılan exception hangisidir?',
        options: [
          { id: 'a', text: 'NoSuchElementException' },
          { id: 'b', text: 'StaleElementReferenceException' },
          { id: 'c', text: 'InvalidSelectorException' },
          { id: 'd', text: 'NoSuchWindowException' },
        ],
        correct: 'b',
        explanation: 'StaleElementReferenceException, bir element referans alındıktan SONRA DOM değiştiğinde (SPA\'larda sık) oluşur. Çözüm: elementi her kullanmadan önce yeniden bulmak.',
      
        retryQuestion: {
      "question": "React veya Vue gibi dinamik web uygulamalarında, bir sayfa yenilemesi veya render işlemi sırasında elementin referansının geçersiz kalması sonucu oluşan hata hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "TimeoutException"
            },
            {
                  "id": "b",
                  "text": "StaleElementReferenceException"
            },
            {
                  "id": "c",
                  "text": "ElementNotVisibleException"
            },
            {
                  "id": "d",
                  "text": "SessionNotCreatedException"
            }
      ],
      "correct": "b",
      "explanation": "StaleElementReferenceException, WebDriver'ın yakaladığı bir elementin DOM'dan kaldırılması veya tekrar render edilmesi durumunda ortaya çıkar. SPA projelerinde bileşenler sürekli güncellendiği için bu durumla sıkça karşılaşılır; çözüm elementi kullanmadan önce tekrar locate etmektir."
}
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
        type: 'error-dictionary',
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
      {
        type: 'quiz',
        question: 'Which exception is most common in a React/Vue (SPA) app because the DOM updates constantly?',
        options: [
          { id: 'a', text: 'NoSuchElementException' },
          { id: 'b', text: 'StaleElementReferenceException' },
          { id: 'c', text: 'InvalidSelectorException' },
          { id: 'd', text: 'NoSuchWindowException' },
        ],
        correct: 'b',
        explanation: 'StaleElementReferenceException occurs when the DOM changes AFTER an element reference was captured (common in SPAs). The fix: re-find the element right before each use.',
      
        retryQuestion: {
      "question": "When testing a dynamic SPA, why would Selenium throw a 'StaleElementReferenceException' even if the element was correctly located a moment ago?",
      "options": [
            {
                  "id": "a",
                  "text": "Because the driver lost connection to the browser."
            },
            {
                  "id": "b",
                  "text": "Because the element was detached or re-rendered in the DOM after the initial lookup."
            },
            {
                  "id": "c",
                  "text": "Because the CSS selector provided is syntactically incorrect."
            },
            {
                  "id": "d",
                  "text": "Because the page is taking too long to load initial assets."
            }
      ],
      "correct": "b",
      "explanation": "A StaleElementReferenceException indicates that the element reference held by the driver is no longer valid because the underlying DOM node was updated or replaced by the framework (React/Vue). You must refresh the reference by re-locating the element."
}
},
    ],
  },
}

// ─── S13: MÜLAKAT SORULARI (50 SORU) (Eski S9) ───────────────────────────────
const s13 = {
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
            analogy: { tr: 'Bu durum Java tarafında asenkron doldurulan bir nesneyi çok erken okumaya benzer. Kod satırı doğru yerde olabilir ama veri henüz gelmemiştir; Selenium\'da da locator doğru olsa bile element o anda henüz erişilebilir olmayabilir.', en: 'This is like reading an asynchronously populated object too early in Java. The line of code may be correct, but the data has not arrived yet; in Selenium, the locator may also be correct while the element is still not accessible at that moment.' },
            keyPoints: [
              { tr: 'İlk ayrım: locator yanlış mı, yoksa element henüz hazır değil mi?', en: 'First distinction: is the locator wrong, or is the element simply not ready yet?' },
              { tr: 'Hazırlık sinyalini isimlendir: visible, clickable ya da iframe context değişimi.', en: 'Name the readiness signal clearly: visible, clickable, or an iframe context switch.' },
              { tr: 'Timeout artırmak tek başına çözüm değildir; doğru wait condition ile birlikte düşünülmelidir.', en: 'Increasing the timeout alone is not a fix; it must be paired with the right wait condition.' },
            ],
            tip: { tr: 'Mülakatta cevabı şu sırayla ver: problemi timing diye sınıflandır, hangi wait condition\'ı seçeceğini söyle, sonra bunu nasıl doğruladığını ekle.', en: 'In the interview, answer in this order: classify it as a timing issue, state which wait condition you would choose, then explain how you verified the fix.' },
          },
          {
            level: 'basic',
            q: { tr: 'Java\'da By.id, By.cssSelector ve By.xpath arasındaki performans farkını açıklayın. Hangisini ne zaman tercih edersiniz?', en: 'Explain the performance difference between By.id, By.cssSelector, and By.xpath in Java. When do you prefer each?' },
            a: { tr: 'By.id en hızlıdır çünkü tarayıcılar document.getElementById() ile O(1) lookup yapar. By.cssSelector ikinci sırada, modern tarayıcıların selector engine\'i CSS query\'leri native olarak optimize eder. By.xpath en yavaşıdır çünkü DOM\'un tamamını traverse edebilir. Tercih sırası: 1) ID varsa By.id, 2) yoksa By.cssSelector, 3) gerektiğinde By.xpath (üst-alt ilişkisi veya metin arama). Java\'da By.xpath("//button[text()=\'Login\']") gibi metin aramaları için XPath kaçınılmazdır.', en: 'By.id is fastest — O(1) via document.getElementById(). By.cssSelector is second — the browser’s selector engine natively optimizes CSS queries. By.xpath is slowest — it can traverse the entire DOM. Preference order: 1) By.id if ID exists, 2) By.cssSelector otherwise, 3) By.xpath only when necessary (parent-child relationship or text search).' },
            analogy: { tr: 'Bu seçim Java koleksiyonlarında `Map` varken gereksiz yere tüm `List`i dolaşmaya benzer. Doğrudan anahtarla bulabiliyorsan `By.id`, biraz daha esnek filtre gerekiyorsa `cssSelector`, gerçekten ağaç ilişkisi ya da metin gerekiyorsa `xpath` seçersin.', en: 'This choice is like iterating over an entire Java `List` when a `Map` lookup is available. If a direct key exists, use `By.id`; if you need a more flexible filter, use `cssSelector`; if you truly need tree relationships or text, use `xpath`.' },
            keyPoints: [
              { tr: 'Tercih sırasını ezber değil gerekçe ile anlat.', en: 'Explain the preference order with reasoning, not memorization.' },
              { tr: 'XPath kötü değildir; sadece daha güçlü ve daha pahalı bir araçtır.', en: 'XPath is not bad; it is simply a more powerful and more expensive tool.' },
              { tr: 'En olgun cevap performans, okunabilirlik ve bakım maliyetini birlikte tartar.', en: 'The most mature answer weighs performance, readability, and maintenance cost together.' },
            ],
            tip: { tr: '“Her zaman XPath kullanmam” demek yerine, hangi durumda mecburen XPath seçtiğini de söylersen cevap güçlenir.', en: 'Instead of just saying “I do not always use XPath,” strengthen the answer by giving a case where XPath is genuinely the right choice.' },
          },
          {
            level: 'basic',
            q: { tr: 'sendKeys() ile type() arasındaki fark nedir? JavaScript inject ile sendKeys() arasında ne tercih edersiniz?', en: 'What is the difference between sendKeys() and JavaScript injection for typing? Which do you prefer?' },
            a: { tr: 'sendKeys() gerçek klavye olayları (keydown, keypress, keyup) tetikler — bu daha gerçekçidir ve event listener\'lar tetiklenir. JavaScript ile değer atama (arguments[0].value=\'text\') ise event tetiklemez, sadece DOM değerini değiştirir. JavaScript tercih edilmesi gereken durumlar: element hidden veya disabled iken, React controlled input\'larda sendKeys() bazen çalışmaz (onChange tetiklenmez), date picker gibi native JS bileşenleri. Best practice: önce sendKeys() dene, çalışmazsa JS fallback kullan.', en: 'sendKeys() triggers real keyboard events (keydown, keypress, keyup) — more realistic and triggers event listeners. JavaScript value injection changes the DOM value without firing events. Use JS when: element is hidden/disabled, React controlled inputs where sendKeys() may not trigger onChange, or native date pickers. Best practice: try sendKeys() first, fall back to JS.' },
            analogy: { tr: 'Bu fark, Java\'da setter metodunu çağırmak ile reflection kullanıp alanı doğrudan değiştirmek arasındaki farka benzer. Setter iş kurallarını ve yan etkileri çalıştırır; doğrudan atama ise değeri değiştirir ama yaşam döngüsünü atlayabilir.', en: 'This is like the difference between calling a setter in Java and mutating a field directly with reflection. A setter runs business rules and side effects; direct mutation changes the value but can skip the lifecycle.' },
            keyPoints: [
              { tr: 'Önce gerçek kullanıcı davranışını taklit eden yolu tercih et.', en: 'Prefer the path that best mimics real user behavior first.' },
              { tr: 'JS inject bir hile değil; zor bileşenlerde kontrollü bir fallback\'tir.', en: 'JS injection is not automatically a hack; it is a controlled fallback for difficult components.' },
              { tr: 'Cevapta event tetiklenmesi farkını özellikle vurgula.', en: 'Make sure to emphasize the event-triggering difference in your answer.' },
            ],
            tip: { tr: '“Önce sendKeys, sonra gerekirse JS fallback” yaklaşımı mülakatta hem gerçekçilik hem pragmatizm gösterir.', en: '“sendKeys first, JS fallback if needed” shows both realism and pragmatism in an interview.' },
          },
          {
            level: 'basic',
            q: { tr: 'driver.close() ile driver.quit() arasındaki fark nedir? Testlerde hangisini ne zaman kullanmalısınız?', en: 'What is the difference between driver.close() and driver.quit()? When should each be used in tests?' },
            a: { tr: 'driver.close() yalnızca aktif (focused) tarayıcı penceresini kapatır ama WebDriver session\'ı ve diğer pencereleri açık bırakır. driver.quit() ise tüm pencereleri kapatır ve WebDriver session\'ını tamamen sonlandırır. Test teardown\'da (AfterMethod/after) her zaman driver.quit() kullanın, aksi takdirde süreç bellekte kalır. @AfterMethod\'da driver != null kontrolü yapın: ChromeDriver process crash\'i yakalamak için if (driver != null) driver.quit() yazın.', en: 'driver.close() closes only the active window but keeps the WebDriver session and other windows open. driver.quit() closes all windows and terminates the entire WebDriver session. Always use driver.quit() in test teardown (@AfterMethod/after), otherwise the process remains in memory. Add null check: if (driver != null) driver.quit().' },
            analogy: { tr: 'Bu, Java\'da tek bir `Closeable.close()` çağrısı ile yalnızca o kaynağı kapatmak ve `try-with-resources` sonunda kapsamdaki tüm kaynakların kapanması arasındaki farka benzer. `close()` aktif pencereyi kapatır; `quit()` ise tüm tarayıcı oturumunu temizler.', en: 'This is like the difference between calling `close()` on a single `Closeable` and letting `try-with-resources` close every resource in scope. `close()` shuts the active window; `quit()` cleans up the entire browser session.' },
            keyPoints: [
              { tr: 'close aktif pencereyi kapatır, quit tüm session\'ı bitirir.', en: 'close ends the active window; quit ends the whole session.' },
              { tr: 'Teardown cevabında kaynak temizliğini merkeze koy.', en: 'Put resource cleanup at the center of your teardown answer.' },
              { tr: 'Orphan browser process ve memory leak riski iyi bir artı detaydır.', en: 'Orphan browser processes and memory leaks are strong extra details to mention.' },
            ],
            tip: { tr: 'Bunu sadece tanım olarak bırakma; `quit()` çağrılmazsa CI ajanında neden problem biriktiğini de söyle.', en: 'Do not leave this as a definition only; explain why skipping `quit()` causes problems to pile up on a CI agent.' },
          },
          {
            level: 'basic',
            q: { tr: 'Implicit Wait ve Explicit Wait\'i aynı anda kullanabilir misiniz? Ne gibi sorunlara yol açar?', en: 'Can you use Implicit Wait and Explicit Wait together? What problems can this cause?' },
            a: { tr: 'Teknik olarak kullanabilirsiniz ama KESİNLİKLE tavsiye edilmez. İkisi birlikte kullanıldığında, Explicit Wait\'in beklediği süre + Implicit Wait\'in beklediği süre toplanabilir ve beklenmedik uzun timeout\'lara yol açar. Örnek: Implicit 10sn + Explicit 15sn beklediğinizde bazı durumlarda 25sn bekliyorsunuz. Selenium resmi dokümantasyonu "mixing waits is not recommended" diyor. Best practice: Yalnızca Explicit Wait kullanın, Implicit Wait\'i sıfıra ayarlayın.', en: 'Technically yes, but it is strongly NOT recommended. When used together, timeouts can compound — Implicit + Explicit wait times can add up leading to unexpected long waits. Example: 10s implicit + 15s explicit can result in 25s wait. Selenium docs explicitly say "mixing waits is not recommended." Best practice: use only Explicit Wait and set Implicit Wait to zero.' },
            analogy: { tr: 'Java\'da aynı işi hem dışarıdan timeout ile sarıp hem de içeride ikinci bir bloklayıcı bekleme koymaya benzer. Toplam bekleme süresi kağıt üzerinde basit görünür ama çalışma anında öngörülemez hale gelir.', en: 'This is like wrapping the same Java operation with an outer timeout while also placing another blocking wait inside. On paper the waits look simple, but at runtime the total behavior becomes unpredictable.' },
            keyPoints: [
              { tr: 'Asıl problem çalışması değil, bekleme süresinin öngörülemez olmasıdır.', en: 'The real problem is not whether it works, but that the wait duration becomes unpredictable.' },
              { tr: 'Selenium dokümantasyonundaki tavsiyeyi anmak cevabı güçlendirir.', en: 'Referencing Selenium’s own recommendation makes the answer stronger.' },
              { tr: 'Temiz yaklaşım: implicit sıfır, explicit bilinçli seçim.', en: 'Clean approach: implicit zero, explicit deliberate choice.' },
            ],
            tip: { tr: 'Rakamlı örnek ver: “10 saniye + 15 saniye bazen 25 saniyelik davranış üretiyor” dediğinde problem çok daha somut anlaşılır.', en: 'Give a numeric example: saying “10 seconds + 15 seconds can behave like a 25-second wait” makes the problem much more concrete.' },
          },
          {
            level: 'basic',
            q: { tr: 'Select dropdown\'da "option" elementinin hem ID\'si hem de value\'su olmadığında nasıl seçim yaparsınız?', en: 'How do you select an option from a dropdown when neither the option ID nor value is available?' },
            a: { tr: 'Select sınıfının 3 yöntemi var: selectByVisibleText() görünen metne göre seçer — en yaygın yöntem. selectByValue() value attribute\'una göre seçer. selectByIndex() sırasına göre seçer (0\'dan başlar). Value ve ID yoksa, selectByVisibleText("Türkiye") kullanılır. Eğer custom dropdown ise (div/ul ile yapılmış), Actions ile click yapıp listeden element seçmek gerekir. Python\'da select_by_visible_text(), TypeScript\'te sendKeys() ile görünen metin yazılır.', en: 'The Select class has 3 methods: selectByVisibleText() selects by visible text — most common. selectByValue() uses the value attribute. selectByIndex() uses position (0-based). When neither value nor ID exists, use selectByVisibleText("Turkey"). For custom dropdowns (div/ul based), use Actions to click and select from the list. Python: select_by_visible_text(), TypeScript: sendKeys() with visible text.' },
            analogy: { tr: 'Bu, Java enum değerini teknik anahtarla değil kullanıcıya görünen label ile eşleştirmeye benzer. Güvenilir bir ID yoksa, sözleşme olarak elde kalan tek şey visible text olur.', en: 'This is like matching a Java enum not by a technical key but by the user-facing label. If there is no reliable ID, the visible text becomes the only contract left.' },
            keyPoints: [
              { tr: 'Önce bunun gerçek `<select>` mi yoksa custom component mi olduğunu ayır.', en: 'First separate whether this is a real `<select>` or a custom component.' },
              { tr: 'Native select için visible text en doğal çözümdür.', en: 'For a native select, visible text is the most natural solution.' },
              { tr: 'Custom dropdown sorusunda `Select` sınıfının çalışmayacağını özellikle söyle.', en: 'In a custom dropdown answer, explicitly say that the `Select` class will not work.' },
            ],
            tip: { tr: '“Önce DOM tipini kontrol ederim” dersen, ezber araç listesi değil teşhis odaklı düşündüğünü göstermiş olursun.', en: 'Saying “I first check the DOM type” shows diagnostic thinking instead of just reciting tools.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir checkbox\'ın işaretli olup olmadığını kontrol edip, eğer işaretli değilse işaretlemek için nasıl kod yazarsınız?', en: 'How do you check if a checkbox is checked and click it only if it\'s not already checked?' },
            a: { tr: 'element.isSelected() metodu checkbox, radio button ve select option\'ları için true/false döndürür. Java\'da: WebElement cb = driver.findElement(By.id("agree")); if (!cb.isSelected()) { cb.click(); } — bu pattern idempotent test yazmanızı sağlar ve test iki kez çalışsa bile aynı sonucu verir. Python\'da is_selected(), TypeScript\'te isSelected() kullanılır. Boolean durumu get_attribute("checked") ile de kontrol edilebilir.', en: 'element.isSelected() returns true/false for checkboxes, radio buttons, and select options. Java: WebElement cb = driver.findElement(By.id("agree")); if (!cb.isSelected()) { cb.click(); } — this pattern makes tests idempotent. Python: is_selected(), TypeScript: isSelected(). Boolean state can also be checked via get_attribute("checked").' },
            analogy: { tr: 'Bu, Java\'da `if (!list.contains(x)) list.add(x)` yazıp aynı elemanı iki kez eklemeyi önlemeye benzer — testin tekrar çalıştırılsa bile checkbox\'ı gereksiz yere tekrar tıklamamasını sağlarsın.', en: 'This is like writing `if (!list.contains(x)) list.add(x)` in Java to avoid adding the same item twice — you make sure the checkbox isn\'t clicked again unnecessarily even if the test reruns.' },
            keyPoints: [
              { tr: 'isSelected() sadece checkbox/radio/option için anlamlıdır, normal butonlar için kullanılmaz.', en: 'isSelected() is only meaningful for checkbox/radio/option elements, not regular buttons.' },
              { tr: 'Önce durumu oku, sonra aksiyon al — körlemesine click() atma.', en: 'Read the state first, then act — don\'t blindly click().' },
              { tr: 'Bu pattern test\'i tekrar çalıştırılabilir (idempotent) yapar, CI\'da yeniden deneme sırasında hata önler.', en: 'This pattern makes the test idempotent and prevents errors when CI retries it.' },
            ],
            tip: { tr: 'Cevaba sadece metod adını söylemekle başlama; neden önce kontrol ettiğini (gereksiz state değişikliğini önlemek için) açıkla.', en: 'Don\'t just name the method — explain why you check first (to avoid an unnecessary state change).' },
          },
          {
            level: 'basic',
            q: { tr: 'Tarayıcıda birden fazla sekme açıldığında Selenium bu sekmeleri nasıl yönetir?', en: 'How does Selenium manage multiple browser tabs when they are open?' },
            a: { tr: 'Her pencere/sekmenin benzersiz bir "window handle" (String UUID) vardır. driver.getWindowHandles() tüm handle\'ları Set<String> olarak döndürür; driver.getWindowHandle() aktif pencereyi döndürür. Yeni sekmeye geçmek için döngüde mevcut handle\'ı atla ve diğerine switchTo().window(handle) yap. Selenium 4\'te driver.switchTo().newWindow(WindowType.TAB) ile programatik sekme açılabilir. Test sonunda her zaman açılan sekmeleri kapatıp ana pencereye dönün.', en: 'Each window/tab has a unique "window handle" (String UUID). driver.getWindowHandles() returns all handles as Set<String>; driver.getWindowHandle() returns the current window. To switch to a new tab, iterate handles, skip the current one, and call switchTo().window(handle). Selenium 4 allows programmatic new tabs via switchTo().newWindow(WindowType.TAB). Always close opened tabs and return to main window at test end.' },
            analogy: { tr: 'Window handle\'lar, Java\'da `Set<String>` içinde tuttuğun ID\'lere benzer — her pencerenin kendine özgü bir kimliği var ve doğru pencereye geçmek için o ID\'yi bulup `switchTo()` ile odağı değiştirirsin.', en: 'Window handles are like IDs stored in a Java `Set<String>` — each window has its own identity, and switching focus means finding the right ID and calling `switchTo()`.' },
            keyPoints: [
              { tr: 'Yeni sekme açıldığında driver\'ın odağı otomatik değişmez, manuel switchTo() gerekir.', en: 'Opening a new tab doesn\'t move the driver\'s focus automatically — you must call switchTo() manually.' },
              { tr: 'Mevcut handle\'ı bilmeden döngüde kaybolmamak için getWindowHandle() ile başlangıç noktasını kaydet.', en: 'Save the starting handle with getWindowHandle() before looping so you don\'t lose track.' },
              { tr: 'İş bitince ana pencereye dönmeyi unutma, yoksa sonraki adımlar yanlış sekmede çalışır.', en: 'Remember to switch back to the main window when done, otherwise later steps run in the wrong tab.' },
            ],
            tip: { tr: 'Senaryoyu somutlaştır: "Login sonrası yeni sekmede açılan fatura PDF\'ini doğrulamam gerekiyordu" gibi gerçek bir örnek ver.', en: 'Make it concrete: give a real example like "I needed to verify an invoice PDF that opened in a new tab after login."' },
          },
          {
            level: 'basic',
            q: { tr: 'Selenium ile ekran görüntüsü almak için hangi arayüz kullanılır ve nasıl uygulanır?', en: 'Which interface is used for taking screenshots in Selenium and how is it implemented?' },
            a: { tr: 'TakesScreenshot arayüzü kullanılır. WebDriver\'ı cast etmek gerekir: TakesScreenshot ts = (TakesScreenshot) driver; File screenshot = ts.getScreenshotAs(OutputType.FILE); FileUtils.copyFile(screenshot, new File("test.png")). Python\'da driver.save_screenshot("test.png") veya driver.get_screenshot_as_file("test.png"). TypeScript\'te driver.takeScreenshot() Base64 string döndürür, fs ile dosyaya yazılır. Test hata verdiğinde otomatik ekran görüntüsü için @AfterMethod\'da try-catch kullanılır.', en: 'The TakesScreenshot interface is used. Cast WebDriver: TakesScreenshot ts = (TakesScreenshot) driver; File screenshot = ts.getScreenshotAs(OutputType.FILE); FileUtils.copyFile(screenshot, new File("test.png")). Python: driver.save_screenshot("test.png"). TypeScript: driver.takeScreenshot() returns Base64 string, write with fs. For auto-screenshot on failure, use try-catch in @AfterMethod.' },
            analogy: { tr: 'Bu, Java\'da bir interface\'i implement eden sınıfı cast edip özel bir yeteneğini kullanmaya benzer — WebDriver\'ı `TakesScreenshot`\'a cast edince ekstra bir yetenek (ekran görüntüsü alma) ortaya çıkar.', en: 'This is like casting a Java object to an interface it implements to access an extra capability — casting WebDriver to `TakesScreenshot` unlocks the screenshot ability.' },
            keyPoints: [
              { tr: 'Her WebDriver implementasyonu bu interface\'i destekler, ama yine de cast etmen gerekir.', en: 'Every WebDriver implementation supports this interface, but you still need to cast to it.' },
              { tr: 'En değerli kullanım anı: test FAIL olduğunda otomatik ekran görüntüsü almak.', en: 'The most valuable use is capturing a screenshot automatically when a test fails.' },
              { tr: 'Ekran görüntüsünü raporlama aracına (Allure, ExtentReports) eklemek hata analizini hızlandırır.', en: 'Attaching the screenshot to a reporting tool (Allure, ExtentReports) speeds up failure analysis.' },
            ],
            tip: { tr: 'Sadece sözdizimini ezbere söyleme; bunu neden @AfterMethod\'da try-catch içinde tetiklediğini de anlat.', en: 'Don\'t just recite syntax — explain why you trigger this inside a try-catch in @AfterMethod.' },
          },
          {
            level: 'basic',
            q: { tr: 'JavaScript\'i Selenium testinizde çalıştırmanız gereken 3 farklı durum örneği verin.', en: 'Give 3 different situations where you need to execute JavaScript in your Selenium test.' },
            a: { tr: '1) Scroll: element viewport dışındaysa js.executeScript("arguments[0].scrollIntoView(true)", el) — Actions.moveToElement() MoveTargetOutOfBoundsException verebilir. 2) Gizli element: display:none olan elemente tıklamak: js.executeScript("arguments[0].click()", hiddenEl) — normal click() ElementNotInteractableException verir. 3) Input değeri: Date picker veya readonly input\'a değer atama: js.executeScript("arguments[0].value=\'2024-01-15\'", dateInput) — sendKeys() native takvimi açabilir. 4) Ekstra: Sayfa hazır mı kontrol: (String)js.executeScript("return document.readyState") == "complete".', en: '1) Scroll: js.executeScript("arguments[0].scrollIntoView(true)", el) when element is outside viewport. 2) Hidden element: js.executeScript("arguments[0].click()", hiddenEl) when normal click() throws ElementNotInteractableException. 3) Input value: js.executeScript("arguments[0].value=\'2024-01-15\'", dateInput) for date pickers or readonly inputs. 4) Bonus: Page ready check: (String)js.executeScript("return document.readyState") == "complete".' },
            analogy: { tr: 'Bu, Java\'da normal yoldan ulaşamadığın bir private field\'a reflection ile erişmeye benzer — Selenium\'un standart API\'si yetmediğinde JavaScript executor bir arka kapı görevi görür.', en: 'This is like using reflection in Java to reach a private field you can\'t access normally — when Selenium\'s standard API isn\'t enough, the JavaScript executor acts as a back door.' },
            keyPoints: [
              { tr: 'JS\'e başvurmak son çare olmalı, ilk tercih her zaman native Selenium metodlarıdır.', en: 'JS should be the last resort — native Selenium methods are always the first choice.' },
              { tr: 'Her JS kullanımını yorum satırıyla "neden gerekti" diye not almak takım arkadaşına yardımcı olur.', en: 'Comment every JS usage with "why it was needed" to help teammates.' },
              { tr: 'JS ile yapılan etkileşim gerçek kullanıcı davranışını taklit etmez, bunu raporda/PR\'da belirt.', en: 'JS-driven interaction doesn\'t mimic real user behavior — flag this in your report/PR.' },
            ],
            tip: { tr: 'Üç örneği ezbere sıralama yerine, her birinin "normal yöntem neden çalışmadı" kısmını anlat — bu mülakatta analiz yeteneğini gösterir.', en: 'Instead of reciting three examples, explain for each why the normal method failed first — this shows analytical thinking in the interview.' },
          },
          {
            level: 'basic',
            q: { tr: 'Cookie ile giriş yaparak test süresini nasıl kısaltırsınız? Hangi senaryolarda bunu kullanırsınız?', en: 'How do you shorten test time by using cookies for login? In which scenarios do you use this?' },
            a: { tr: 'Login ekranından geçmeden direkt oturumu cookie olarak enjekte edersiniz. Önce normal giriş yapıp session cookie\'yi alın: driver.manage().getCookieNamed("session"). Sonraki testlerde: driver.get(baseUrl) → driver.manage().addCookie(savedCookie) → driver.navigate().refresh(). Bu yöntem her test için UI login\'i atlar ve test süresini 5-10 saniye kısaltır. Uygun senaryolar: hesap gerektiren sayfalarda negatif test, checkout, profil gibi authenticated sayfalar. Sınırlamalar: cookie expire süresi, HTTPS sitelerde secure flag.', en: 'Instead of going through the login screen, inject a session cookie directly. First do a normal login and capture: driver.manage().getCookieNamed("session"). Then for subsequent tests: driver.get(baseUrl) → driver.manage().addCookie(savedCookie) → driver.navigate().refresh(). This skips UI login for each test and saves 5-10 seconds. Good for: authenticated pages like checkout, profile, account settings. Limitations: cookie expiry, secure flag on HTTPS sites.' },
            analogy: { tr: 'Bu, Java\'da her istekte yeniden kimlik doğrulamak yerine bir kez alınan JWT token\'ı header\'a koyup tekrar kullanmaya benzer — login akışını her seferinde baştan koşturmak yerine oturumu "hazır" olarak enjekte edersin.', en: 'This is like reusing a JWT token in a header instead of re-authenticating on every request in Java — instead of running the full login flow every time, you inject a session that\'s already "ready."' },
            keyPoints: [
              { tr: 'Bu yöntem login akışını test etmez, sadece login SONRASI senaryoları hızlandırır.', en: 'This doesn\'t test the login flow itself — it only speeds up post-login scenarios.' },
              { tr: 'Login\'in kendisini en az bir yerde UI üzerinden gerçek şekilde de test etmeyi unutma.', en: 'Don\'t forget to still test the actual login flow through the UI at least once.' },
              { tr: 'Cookie\'nin expire süresine dikkat et, expired cookie ile testler anlamsız şekilde fail eder.', en: 'Watch the cookie expiry — an expired cookie causes confusing test failures.' },
            ],
            tip: { tr: '"Her testte login akışını koşturmak gereksiz risk ve zaman kaybı" diyerek neden bu optimizasyonu yaptığını gerekçelendir.', en: 'Justify the optimization by saying running the login flow on every test is unnecessary risk and wasted time.' },
          },
          {
            level: 'basic',
            q: { tr: 'getText() boş string döndürürse ne yaparsınız? Bu durumun yaygın sebepleri nelerdir?', en: 'What do you do when getText() returns an empty string? What are common causes?' },
            a: { tr: 'getText() boş döndürmesinin başlıca nedenleri: 1) Element görünmüyor (hidden): getInnerText yalnızca visible elementi döndürür. Çözüm: getAttribute("textContent") veya getAttribute("innerHTML") kullan. 2) Element henüz yüklenmemiş: Explicit Wait ekle. 3) Shadow DOM: shadowRoot içindeki elementler normal getText() ile alınamaz, JS executeScript gerekir. 4) Dinamik içerik: text AJAX sonrası geliyor olabilir. Kontrol yöntemi: getAttribute("innerText") dene, getText() ile karşılaştır.', en: 'Common causes: 1) Element is hidden: getText() returns empty for non-visible elements. Fix: use getAttribute("textContent") or getAttribute("innerHTML"). 2) Element not loaded yet: add Explicit Wait. 3) Shadow DOM: elements inside shadowRoot cannot be accessed by normal getText(), JS is required. 4) Dynamic content: text may arrive after AJAX. Diagnostic: try getAttribute("innerText") and compare with getText().' },
            analogy: { tr: 'Bu, Java\'da bir objenin `toString()`\'inin boş dönmesi gibi — sorun objenin yokluğu değil, henüz beklediğin state\'e ulaşmamış olmasıdır.', en: 'This is like a Java object\'s `toString()` returning empty — the issue isn\'t that the object is missing, it\'s that it hasn\'t reached the expected state yet.' },
            keyPoints: [
              { tr: 'getText() sadece görünür (visible) içeriği döndürür, bu en sık unutulan kuraldır.', en: 'getText() only returns visible content — this is the most commonly forgotten rule.' },
              { tr: 'Sebebi tahmin etmeden önce getAttribute(\'textContent\') ile karşılaştırarak teşhis koy.', en: 'Diagnose before guessing — compare with getAttribute(\'textContent\') first.' },
              { tr: 'Shadow DOM ihtimalini de unutma, normal getText() oraya giremez.', en: 'Don\'t forget Shadow DOM — normal getText() can\'t reach inside it.' },
            ],
            tip: { tr: 'Doğrudan "bug var" deme; önce hangi ihtimali nasıl elediğini anlatarak sistematik debug yaklaşımını göster.', en: 'Don\'t jump to "it\'s a bug" — show your systematic debugging by explaining which possibility you ruled out first.' },
          },
          {
            level: 'basic',
            q: { tr: 'Selenium testlerinde Page Object Model (POM) neden kullanılır? Onsuz ne gibi sorunlar çıkar?', en: 'Why is Page Object Model (POM) used in Selenium tests? What problems occur without it?' },
            a: { tr: 'POM olmadan her test dosyasına locator hardcode yazılır. Bir element\'in ID\'si değişirse onlarca test dosyasını düzenlemeniz gerekir (maintenance hell). POM ile her sayfanın bir class\'ı olur, locator\'lar tek yerde tanımlanır. Test metodları UI detaylarına değil, iş mantığına odaklanır: loginPage.login(email, pass) gibi. Java\'da Pages klasörü altında LoginPage, CartPage gibi class\'lar, Python\'da aynı pattern. Avantajlar: test okunabilirliği, DRY prensibi, tek nokta değişiklik, takım çalışması kolaylığı.', en: 'Without POM, locators are hardcoded in every test file. If one element ID changes, dozens of files need updating (maintenance hell). With POM, each page has a class and locators are defined in one place. Test methods focus on business logic, not UI details: loginPage.login(email, pass). Structure: Pages folder with LoginPage, CartPage, etc. Benefits: readability, DRY principle, single point of change, team collaboration.' },
            analogy: { tr: 'Bu, Java\'da her yerde aynı SQL string\'ini hardcode etmek yerine bir Repository/DAO katmanı yazmaya benzer — değişiklik tek bir yerde yapılır, her yeri tek tek düzeltmen gerekmez.', en: 'This is like writing a Repository/DAO layer in Java instead of hardcoding the same SQL string everywhere — a change happens in one place instead of fixing every call site.' },
            keyPoints: [
              { tr: 'POM\'un asıl kazancı "az kod" değil, "değişikliğin tek noktada yönetilmesi"dir.', en: 'POM\'s real value isn\'t "less code" — it\'s that change is managed from a single point.' },
              { tr: 'Test metodu UI detayını değil, iş senaryosunu okunaklı şekilde anlatmalı.', en: 'A test method should read like a business scenario, not expose UI details.' },
              { tr: 'POM olmadan büyüyen bir proje genelde 6 ay sonra "kimse locator\'ları değiştirmeye cesaret edemiyor" noktasına gelir.', en: 'Without POM, a growing project often reaches a point in 6 months where nobody dares to touch the locators.' },
            ],
            tip: { tr: 'Soyut "best practice" demek yerine, POM olmadan yaşadığın somut bir bakım sorununu örnek ver.', en: 'Instead of an abstract "best practice" answer, give a concrete maintenance pain you experienced without POM.' },
          },
          {
            level: 'basic',
            q: { tr: 'Selenium\'da headless modda Chrome çalıştırmak için ne yaparsınız? CI/CD\'de neden önemlidir?', en: 'How do you run Chrome in headless mode with Selenium? Why is it important in CI/CD?' },
            a: { tr: 'Java\'da ChromeOptions options = new ChromeOptions(); options.addArguments("--headless"); driver = new ChromeDriver(options). Python\'da options.add_argument("--headless"). TypeScript\'te builder.withCapabilities({browserName:"chrome", "goog:chromeOptions":{args:["--headless"]}}). CI/CD\'de önemli çünkü: 1) Linux sunucularda display yok, headless olmadan hata alınır 2) Daha hızlı çalışır 3) Kaynak tüketimi az. Not: --headless=new (Headless Shell) Chrome 112+ için önerilen.', en: 'Java: ChromeOptions options = new ChromeOptions(); options.addArguments("--headless"); driver = new ChromeDriver(options). Python: options.add_argument("--headless"). Important for CI/CD because: 1) Linux servers have no display — headless mode is required 2) Faster execution 3) Lower resource consumption. Note: --headless=new (Headless Shell) is recommended for Chrome 112+.' },
            analogy: { tr: 'Bu, Java\'da bir GUI uygulamasını sunucuda `-Djava.awt.headless=true` ile ekran olmadan çalıştırmaya benzer — tarayıcı motoru çalışır ama görsel render katmanı devre dışıdır.', en: 'This is like running a Java GUI app on a server with `-Djava.awt.headless=true` — the engine still runs, but the visual rendering layer is disabled.' },
            keyPoints: [
              { tr: 'Headless sadece hız için değil, display\'i olmayan Linux CI sunucularında zorunluluktur.', en: 'Headless isn\'t just for speed — it\'s mandatory on Linux CI servers with no display.' },
              { tr: 'Headless ve headful modda davranış farkı çıkabilir (örn. boyut/scroll), önemli testleri ikisinde de doğrula.', en: 'Headless and headful modes can behave differently (e.g. size/scroll) — verify important tests in both.' },
              { tr: 'Yeni --headless=new modu eski moddan daha güvenilir, eski projelerde flag\'i kontrol et.', en: 'The newer --headless=new flag is more reliable than the old mode — check this in legacy projects.' },
            ],
            tip: { tr: '"Hızlı çalışır" demekle yetinme; "sunucuda display olmadığı için zorunlu" kısmını mutlaka vurgula.', en: 'Don\'t stop at "it\'s faster" — make sure to emphasize it\'s mandatory because servers have no display.' },
          },
          {
            level: 'basic',
            q: { tr: 'XPath\'de absolute ve relative XPath arasındaki fark nedir? Hangisi neden tercih edilir?', en: 'What is the difference between absolute and relative XPath? Which is preferred and why?' },
            a: { tr: 'Absolute XPath: /html/body/div[1]/form/input[2] — kök\'ten (html) tam yolu verir. Herhangi bir DOM değişikliğinde kırılır. Relative XPath: //input[@id="username"] — herhangi bir yerden başlar, daha esnek. Absolute XPath ASLA kullanılmamalıdır çünkü: DOM\'a yeni bir div eklenirse tüm path kayar, Bootstrap/React gibi framework\'ler sıkça DOM değiştirir. Relative tercih edilmeli: //button[text()="Login"], //div[@class="form"]//input[@type="email"].', en: 'Absolute XPath: /html/body/div[1]/form/input[2] — full path from root. Breaks on any DOM change. Relative XPath: //input[@id="username"] — starts from anywhere, more flexible. Never use absolute XPath because: adding a new div shifts the entire path, frameworks like Bootstrap/React frequently change DOM. Always use relative: //button[text()="Login"], //div[@class="form"]//input[@type="email"].' },
            analogy: { tr: 'Bu, Java\'da bir dosyayı mutlak path (`C:\\Users\\...`) ile değil relative path ile referans vermeye benzer — yapı değiştiğinde mutlak yol her zaman kırılır, relative yol esnekliğini korur.', en: 'This is like referencing a file with a relative path instead of an absolute one (`C:\\Users\\...`) in Java — when the structure changes, the absolute path always breaks while the relative one stays flexible.' },
            keyPoints: [
              { tr: 'Absolute XPath\'i hiçbir zaman production test koduna yazma, sadece DevTools\'ta hızlı kontrol için kullan.', en: 'Never put absolute XPath in production test code — use it only for quick checks in DevTools.' },
              { tr: 'Relative XPath\'i bir attribute veya text ile anchor\'lamak en stabil yöntemdir.', en: 'Anchoring relative XPath to an attribute or text is the most stable approach.' },
              { tr: 'React/Bootstrap gibi framework\'ler DOM\'u sık değiştirir, bu yüzden esneklik kritik hale gelir.', en: 'Frameworks like React/Bootstrap change the DOM frequently, which makes flexibility critical.' },
            ],
            tip: { tr: '"Asla absolute kullanmam" yerine "neden kırıldığını" somut bir örnekle (yeni bir div eklendi, path kaydı) anlat.', en: 'Instead of just saying "I never use absolute," explain concretely why it breaks (a new div was added, the path shifted).' },
          },
          // INTERMEDIATE (20 soru)
          {
            level: 'intermediate',
            q: { tr: 'CI/CD pipeline\'ında Selenium testleriniz sabah başarılı, öğlen başarısız oluyor. Olası nedenleri ve debug stratejinizi anlatın.', en: 'Your Selenium tests pass in the morning CI/CD but fail at noon. What are possible causes and your debug strategy?' },
            a: { tr: 'Bu "flaky test" klasik senaryosudur. Olası nedenler: 1) Test verisi kirliliği — sabah taze veritabanı, öğlen başkası veri değiştirdi. 2) Zamana bağlı testler — sabah 9\'da çalışan "bugünün tarihi" kontrolü öğlen farklı. 3) Paralel çakışma — aynı hesabı kullanan testler birbirini etkiliyor. 4) Timeout yetersizliği — öğlen trafik yoğunluğunda sayfa daha yavaş. Debug stratejisi: screenshot on failure, video kaydı, test log\'larını detaylı incele, local\'de aynı saatte çalıştır.', en: 'This is the classic "flaky test" scenario. Possible causes: 1) Test data pollution — fresh DB in morning, others changed data by noon. 2) Time-dependent tests — "today\'s date" check works at 9am but not noon. 3) Parallel conflicts — tests sharing the same account interfere. 4) Insufficient timeouts — pages are slower under noon traffic. Debug strategy: screenshot on failure, video recording, detailed log analysis, reproduce at same time of day locally.' },
            analogy: { tr: 'Bu, Java\'da production\'da ara sıra patlayan ama local\'de hiç tetiklenmeyen bir race condition bug\'ına benzer — sorunun kodda değil, koşullarda (zamanlama, paylaşılan state) gizli olduğunu kabul edip ona göre avlanman gerekir.', en: 'This is like a race-condition bug in Java that occasionally crashes in production but never reproduces locally — you have to accept the problem hides in conditions (timing, shared state), not in the code itself, and hunt accordingly.' },
            keyPoints: [
              { tr: 'İlk refleks "kod bozuldu" değil, "hangi koşul değişti" olmalı.', en: 'Your first instinct should be "what condition changed", not "the code broke".' },
              { tr: 'Paylaşılan test verisi ve paralel testler arasındaki etkileşim en sık gözden kaçan sebeptir.', en: 'Shared test data and interaction between parallel tests is the most commonly overlooked cause.' },
              { tr: 'Tek seferlik tekrar deneme (retry) sorunu çözmez, sadece saklar — kök nedeni bulmaktan vazgeçirmemeli.', en: 'A one-off retry doesn\'t fix the problem, it just hides it — it shouldn\'t replace finding the root cause.' },
            ],
            tip: { tr: 'Senior bir cevap "flaky" demekle yetinmez; hangi kanıtları (log, zaman damgası, paralel run sayısı) toplayarak teşhis koyduğunu anlatır.', en: 'A senior-level answer doesn\'t stop at "flaky" — it explains which evidence (logs, timestamps, parallel run count) was gathered to diagnose it.' },
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
            analogy: { tr: 'Bu, Java\'da bir Collection\'ı iterate ederken aynı anda başka bir thread\'in onu modifiye etmesine (ConcurrentModificationException) benzer — DOM, React tarafından arka planda yeniden render edildiği için elindeki referans artık geçersiz oluyor.', en: 'This is like another thread modifying a Collection while you iterate it in Java (ConcurrentModificationException) — the DOM gets re-rendered by React in the background, so the reference you\'re holding becomes invalid.' },
            keyPoints: [
              { tr: 'Retry mekanizması semptomu tedavi eder; asıl çözüm her kullanımdan hemen önce elementi tazelemektir.', en: 'The retry mechanism treats the symptom; the real fix is re-fetching the element right before each use.' },
              { tr: 'Sonsuz retry yazma, sınırlı deneme sayısı ve son denemede gerçek hatayı fırlatma şart.', en: 'Never retry infinitely — cap the attempts and rethrow the real exception on the last try.' },
              { tr: 'Bu hata SPA\'larda (React/Angular/Vue) normaldir, statik sayfalarda görürsen başka bir sorun var demektir.', en: 'This exception is expected in SPAs (React/Angular/Vue) — seeing it on a static page signals a different problem.' },
            ],
            tip: { tr: 'Kod yazmadan önce "neden stale oluyor" diye kök nedeni açıkla, mülakatçı sadece retry pattern\'ini değil anlayışını ölçer.', en: 'Before writing code, explain why the element goes stale — the interviewer is assessing understanding, not just the retry pattern.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'React/Vue uygulamasında input\'a sendKeys() ile veri girince onChange event tetiklenmiyor. Nasıl çözersiniz?', en: 'sendKeys() doesn\'t trigger onChange in a React/Vue input. How do you solve this?' },
            a: { tr: 'React controlled component\'lerde sendKeys() bazen React\'ın synthetic event sistemini bypass eder. Çözümler: 1) Önce input\'u tıkla, sonra her karakteri ayrı ayrı gönder: element.click(); for (char c : text.toCharArray()) { element.sendKeys(String.valueOf(c)); } 2) Actions API: new Actions(driver).click(el).sendKeys(el, text).perform() 3) JS ile React event tetikle: executeScript("var el=arguments[0]; el.value=arguments[1]; el.dispatchEvent(new Event(\'input\',{bubbles:true}))", el, text) 4) Python: ActionChains kullan.',
            analogy: { tr: 'Bu fark, Java\'da setter metodunu çağırmak ile reflection kullanıp alanı doğrudan değiştirmek arasındaki farka benzer. Setter iş kurallarını ve yan etkileri çalıştırır; doğrudan atama ise değeri değiştirir ama yaşam döngüsünü atlayabilir.', en: 'This is like the difference between calling a setter in Java and mutating a field directly with reflection. A setter runs business rules and side effects; direct mutation changes the value but can skip the lifecycle.' },
            keyPoints: [
              { tr: 'Önce gerçek sebebi anla: sendKeys() DOM value\'sunu değiştiriyor ama React\'ın kendi event sistemi bunu yakalamıyor.', en: 'Understand the real cause first: sendKeys() changes the DOM value, but React\'s own event system doesn\'t catch it.' },
              { tr: 'Çözüm hiyerarşisi var: önce karakter karakter sendKeys dene, olmazsa Actions API, son çare JS dispatchEvent.', en: 'There\'s a solution hierarchy: try character-by-character sendKeys first, then Actions API, JS dispatchEvent as last resort.' },
              { tr: 'JS ile value atayıp event tetiklemeden bırakmak React state\'ini senkronsuz bırakır, testin kendisini yanıltıcı yapar.', en: 'Setting the value via JS without dispatching the event leaves React\'s state out of sync, making the test misleading.' },
            ],
            tip: { tr: 'Bu soruda framework\'ün neden direnç gösterdiğini (controlled component, synthetic event) anlatmak, sadece çözümü ezberlemekten çok daha değerli.', en: 'Explaining why the framework resists (controlled component, synthetic events) is far more valuable than just reciting the fix.' },
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
            analogy: { tr: 'Bu, Java\'da "benim makinemde çalışıyor" klasik sorununa benzer — fark genelde kodda değil, ortam farkında (JVM versiyonu, classpath, network) saklıdır; Grid\'de de ortamı (Docker network, Node capability) sorgulaman gerekir.', en: 'This is the classic Java "it works on my machine" problem — the difference usually hides in the environment (JVM version, classpath, network), not the code; with Grid you need to interrogate the environment (Docker network, Node capabilities) the same way.' },
            keyPoints: [
              { tr: 'Önce session\'ın Grid\'e gerçekten ulaştığını doğrula, sonra hangi Node\'a yönlendiğine bak.', en: 'First confirm the session actually reaches the Grid, then check which Node it\'s routed to.' },
              { tr: 'Local dosya path\'leri (screenshot, download) Grid Node\'unda geçersizdir — bu çok sık atlanan bir detay.', en: 'Local file paths (screenshot, download) are invalid inside the Grid Node — this is a frequently missed detail.' },
              { tr: 'VNC/noVNC ile canlı izlemek, log okumaktan çok daha hızlı teşhis sağlar.', en: 'Watching live via VNC/noVNC diagnoses far faster than reading logs alone.' },
            ],
            tip: { tr: 'Debug sürecini sıralı anlat: önce Grid console, sonra capabilities, sonra network — rastgele deneme değil metodolojik yaklaşım gösterir.', en: 'Walk through the debug process in order: Grid console, then capabilities, then network — this shows a methodical approach, not random guessing.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir ödeme sayfasını test ediyorsunuz ve Stripe iframe içinde kart numarası alanı var. Nasıl yaklaşırsınız?', en: 'You\'re testing a payment page with Stripe card number field inside an iframe. What is your approach?' },
            a: { tr: 'Stripe, kart numarası alanını güvenlik için iframe içine koyar. Yaklaşım: 1) iframe\'i bul: driver.findElement(By.cssSelector("iframe[name*=\'stripe\']")) 2) switchTo().frame(stripeIframe) 3) input alanını bul ve doldur: driver.findElement(By.name("cardnumber")).sendKeys("4111111111111111") 4) driver.switchTo().defaultContent() ile ana sayfaya dön 5) Diğer Stripe fieldları (expiry, CVV) için aynı iframe\'e tekrar gir. Dikkat: Stripe production iframe\'lerde otomasyon kısıtlıyor — test ortamı için Stripe\'ın test modu URL\'lerini kullanın.' },
            analogy: { tr: 'Bu, Java\'da bir mikroservisin kendi güvenlik sınırı (sandbox) içinde çalışıp, ana uygulamanın ona doğrudan erişemediği bir senaryoya benzer — iframe de tarayıcıda aynı izolasyonu sağlar, önce o sınıra `switchTo()` ile "girmen" gerekir.', en: 'This is like a microservice running inside its own security sandbox that the main app can\'t reach directly in Java — an iframe creates the same isolation in the browser, and you must "enter" that boundary with `switchTo()` first.' },
            keyPoints: [
              { tr: 'Her Stripe field\'ı (kart no, expiry, cvv) ayrı bir iframe olabilir — her birine ayrı ayrı switchTo() yapman gerekebilir.', en: 'Each Stripe field (card number, expiry, cvv) can be its own iframe — you may need to switchTo() each one separately.' },
              { tr: 'Ana sayfaya defaultContent() ile dönmeyi unutursan, sonraki adımlar elementi bulamaz.', en: 'Forgetting to return with defaultContent() means the next steps won\'t find their elements.' },
              { tr: 'Gerçek kart bilgisi asla kullanılmaz, Stripe\'ın resmi test kartları (4242...) ile çalışılır.', en: 'Never use real card data — work with Stripe\'s official test cards (4242...).' },
            ],
            tip: { tr: 'Üçüncü parti ödeme widget\'larının güvenlik amaçlı izole edildiğini bilmek, sadece switchTo() syntax\'ını bilmekten daha güçlü bir cevaptır.', en: 'Knowing that third-party payment widgets are isolated for security reasons is a stronger answer than just knowing the switchTo() syntax.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Test izolasyonunu sağlamak için her testten önce veritabanını sıfırlamak yerine hangi Selenium yaklaşımlarını kullanabilirsiniz?', en: 'Instead of resetting the database before each test, what Selenium-level approaches can you use for test isolation?' },
            a: { tr: '1) Her test kendi test kullanıcısını oluşturur (timestamp bazlı unique email) — paralel çakışmayı önler. 2) Cookie injection ile login — her test fresh oturum açar. 3) API önce kurulum, Selenium sadece UI doğrulama: API ile veri oluştur, UI ile kontrol et. 4) Test veri factory: TestNG DataProvider veya pytest fixtures ile unique veri üret. 5) Soft delete: testler veri silerken gerçekten silmez, is_deleted=true flag koyar. Bu yöntemler DB reset olmadan test izolasyonu sağlar.' },
            analogy: { tr: 'Bu, Java\'da her test metodunun kendi unique test verisini (örn. UUID bazlı) üretmesine benzer — izolasyonu ortamdan değil, verinin kendisinden sağlarsın.', en: 'This is like having each Java test method generate its own unique test data (e.g. UUID-based) instead of spinning up a fresh database per test — isolation comes from the data itself, not the environment.' },
            keyPoints: [
              { tr: 'Unique veri (timestamp/UUID) en ucuz ve en yaygın izolasyon yöntemidir.', en: 'Unique data (timestamp/UUID) is the cheapest and most common isolation method.' },
              { tr: 'API ile setup yapıp UI ile sadece doğrulamak, testi hem hızlandırır hem kırılganlığı azaltır.', en: 'Setting up via API and verifying only through the UI both speeds up the test and reduces fragility.' },
              { tr: 'Soft delete gibi yaklaşımlar, paralel testlerin birbirinin verisini fiziksel olarak silmesini engeller.', en: 'Approaches like soft delete prevent parallel tests from physically deleting each other\'s data.' },
            ],
            tip: { tr: 'DB reset\'in neden pahalı/yavaş olduğunu (paralel testlerde kilitlenme, CI süresi) açıklayarak alternatiflerin gerekçesini güçlendir.', en: 'Strengthen your answer by explaining why DB resets are expensive/slow (locking under parallel tests, CI time) — that\'s the reason for the alternatives.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Python\'da Selenium testlerini pytest ile çalıştırıyorsunuz. fixture scope\'larını (function/class/module/session) nasıl kullanırsınız?', en: 'You run Selenium tests with pytest in Python. How do you use fixture scopes (function/class/module/session)?' },
            a: { tr: 'Scope seçimi kritiktir: scope="function" (default) — her test için yeni driver, tam izolasyon, yavaş. scope="class" — aynı class\'taki testler driver\'ı paylaşır, test sırası önemli. scope="module" — aynı dosyadaki tüm testler paylaşır. scope="session" — tüm test oturumu boyunca tek driver, EN HIZLI ama izolasyon yok, test sırasına bağımlı. Best practice: Login gibi pahalı setup\'lar için session scope, kritik izolasyon gerektiren testler için function scope. conftest.py\'da @pytest.fixture(scope="function") def driver(): yield webdriver.Chrome() olarak tanımlanır.' },
            analogy: { tr: 'Bu, Java\'da Spring\'in bean scope\'larına (`prototype` vs `singleton`) benzer — function scope her seferinde yeni bir nesne üretir (izole ama yavaş), session scope tek bir paylaşılan nesne tutar (hızlı ama izolasyon riskli).', en: 'This is like Spring\'s bean scopes in Java (`prototype` vs `singleton`) — function scope creates a fresh instance every time (isolated but slow), session scope keeps one shared instance (fast but risks isolation).' },
            keyPoints: [
              { tr: 'Scope seçimi bir performans/izolasyon dengesidir, "her zaman doğru" bir tercih yoktur.', en: 'Scope choice is a performance/isolation trade-off — there\'s no universally "correct" option.' },
              { tr: 'session scope kullanıyorsan testler arası state sızıntısına karşı ekstra dikkatli olmalısın.', en: 'If you use session scope, you must be extra careful about state leaking between tests.' },
              { tr: 'Pahalı setup\'lar (login, browser açma) için geniş scope, kritik izolasyon gereken testler için dar scope mantıklıdır.', en: 'Wide scope makes sense for expensive setup (login, browser launch); narrow scope makes sense when isolation is critical.' },
            ],
            tip: { tr: 'Hangi scope\'u ne zaman seçtiğini somut bir örnekle anlat: "login fixture\'ı session, sepete ürün ekleme testi function scope kullandım" gibi.', en: 'Give a concrete example of when you chose which scope: "I used session scope for the login fixture, function scope for the add-to-cart test."' },
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
            analogy: { tr: 'Bu, Java\'da bir koleksiyonu (`List<WebElement>`) dolaşıp her elemanı bir DTO\'ya dönüştürüp dışarıya (Excel/CSV) yazmaya benzer — Selenium burada sadece veri kaynağı, asıl iş bir dönüşüm/export pipeline\'ı.', en: 'This is like iterating a Java collection (`List<WebElement>`), mapping each item to a DTO, and exporting it (Excel/CSV) — Selenium is just the data source here, the real work is a transform/export pipeline.' },
            keyPoints: [
              { tr: 'Dropdown dinamikse (AJAX ile dolan), okumadan önce dolmasını bekleyen bir wait şart.', en: 'If the dropdown is dynamic (AJAX-populated), you must wait for it to fill before reading.' },
              { tr: 'Excel yazma işi Selenium\'un değil, Apache POI gibi bir kütüphanenin sorumluluğudur — sorumlulukları ayır.', en: 'Writing the Excel file isn\'t Selenium\'s job — that\'s a library like Apache POI\'s responsibility. Separate the concerns.' },
              { tr: 'Bu tür script\'ler genelde tek seferlik veri çıkarma ihtiyacından doğar, regression suite\'in parçası olmamalı.', en: 'These scripts usually come from a one-off data-extraction need — they shouldn\'t be part of the regression suite.' },
            ],
            tip: { tr: 'Sadece "Select.getOptions() kullanırım" deme; verinin nereye/niçin export edildiğini de sorgulayarak iş ihtiyacını anladığını göster.', en: 'Don\'t just say "I\'d use Select.getOptions()" — show you understand the business need by asking where/why the data is exported.' },
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
            analogy: { tr: 'Bu, Java\'da paylaşılan bir static field yerine `ThreadLocal` kullanarak her thread\'in kendi kopyasına sahip olmasına benzer — WebDriver paylaşılırsa testler birbirinin tarayıcısını manipüle eder, ThreadLocal bunu engeller.', en: 'This is like using `ThreadLocal` in Java instead of a shared static field so each thread gets its own copy — if WebDriver is shared, tests manipulate each other\'s browser; ThreadLocal prevents that.' },
            keyPoints: [
              { tr: 'Paralel testlerde en sık yapılan hata, WebDriver\'ı static (paylaşılan) field olarak tutmaktır.', en: 'The most common mistake in parallel testing is keeping WebDriver as a shared static field.' },
              { tr: 'Thread safety sadece driver\'da değil, test datasında da sağlanmalı — aynı kullanıcıyı iki thread kullanmamalı.', en: 'Thread safety isn\'t just about the driver — test data needs it too; two threads shouldn\'t share the same user.' },
              { tr: 'driver.remove() çağırmadan thread pool\'u kapatmak, eski referansların bellekte kalmasına (leak) yol açar.', en: 'Closing the thread pool without calling driver.remove() leaves stale references in memory (a leak).' },
            ],
            tip: { tr: 'ThreadLocal\'ı sadece syntax olarak değil, "neden static driver paralel testte felaket olur" diye anlatarak gerekçelendir.', en: 'Justify ThreadLocal not just as syntax, but by explaining why a static driver is a disaster in parallel tests.' },
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
            analogy: { tr: 'Bu, Java\'da bir sınıfın `private` iç sınıfına dışarıdan doğrudan erişememene benzer — Shadow DOM da bilinçli bir encapsulation\'dır, içine girmek için resmi bir "kapı" (getShadowRoot()) kullanman gerekir.', en: 'This is like not being able to reach a Java class\'s `private` inner class from outside — Shadow DOM is deliberate encapsulation too, and you need an official "door" (getShadowRoot()) to get in.' },
            keyPoints: [
              { tr: 'Shadow DOM bir bug değil, web component\'lerin bilinçli izolasyon tasarımıdır.', en: 'Shadow DOM isn\'t a bug — it\'s a deliberate isolation design in web components.' },
              { tr: 'İç içe (nested) shadow root\'larda her seviye için ayrı ayrı getShadowRoot() çağrılması gerekir.', en: 'For nested shadow roots, getShadowRoot() must be called separately at each level.' },
              { tr: 'Selenium 4 öncesi JS executor\'a muhtaç kalan bu işlem artık native API ile daha güvenilir.', en: 'What used to require a JS executor before Selenium 4 is now more reliable with the native API.' },
            ],
            tip: { tr: '"Element bulunamıyor" hatasını gördüğünde ilk şüphe noktalarından birinin Shadow DOM olduğunu söylemek deneyimini gösterir.', en: 'Mentioning Shadow DOM as one of your first suspects when "element not found" appears shows real experience.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Dosya yükleme işlemini Selenium ile nasıl test edersiniz? Upload butonu JavaScript ile yapılandırılmışsa ne yaparsınız?', en: 'How do you test file upload with Selenium? What if the upload button is built with JavaScript?' },
            a: { tr: 'Native input[type="file"] için: driver.findElement(By.id("fileInput")).sendKeys("/path/to/file.jpg") — tarayıcı dialog açılmaz, direkt dosya yolu girilir. Robot class (popup açılırsa): Robot robot = new Robot(); StringSelection ss = new StringSelection("/path/file"); Clipboard.setContents(ss, null); robot.keyPress(KeyEvent.VK_ENTER). Custom JS upload button: önce input elementini görünür yap: js.executeScript("arguments[0].style.display=\'block\'", hiddenInput); sonra sendKeys. Python\'da aynı, driver.find_element(By.ID, "fileInput").send_keys("/path/file.jpg").' },
            analogy: { tr: 'Bu, Java\'da bir dosya akışını (`FileInputStream`) doğrudan açıp okumak yerine, üzerine gereksiz bir UI katmanı (dialog) eklemeye benzer — Selenium\'da native input\'a sendKeys() ile path vermek, tarayıcı dialog\'unu hiç açmadan aynı işi yapar.', en: 'This is like opening and reading a file stream (`FileInputStream`) directly in Java instead of wrapping it with an unnecessary UI layer (a dialog) — sending the path via sendKeys() to a native input does the same job without ever opening the browser dialog.' },
            keyPoints: [
              { tr: 'input[type=file] her zaman gizli (hidden) olsa bile sendKeys() doğrudan çalışır, görünür olması gerekmez.', en: 'sendKeys() works directly on input[type=file] even when it\'s hidden — visibility isn\'t required.' },
              { tr: 'Eğer custom JS bir buton dosya seçtiriyorsa, asıl native input\'u DOM\'da bulup ona dokunmak gerekir.', en: 'If a custom JS button drives file selection, you need to locate the underlying native input and target that directly.' },
              { tr: 'OS dialog\'u açan senaryolar (nadiren) Robot class gibi tarayıcı dışı bir araç gerektirir, bu son çaredir.', en: 'Scenarios that genuinely open an OS dialog (rare) require a non-browser tool like the Robot class — this is a last resort.' },
            ],
            tip: { tr: '"Selenium tarayıcı dışı pencerelere dokunamaz" prensibini açıklarsan, neden native input\'u hedeflediğini gerekçelendirmiş olursun.', en: 'Explaining the principle "Selenium can\'t touch windows outside the browser" justifies why you target the native input directly.' },
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
            analogy: { tr: 'Bu, Java\'da normal API yetmediğinde JVM\'in kendi debug/profiling arayüzüne (JMX) bağlanmaya benzer — CDP de tarayıcının iç mekanizmalarına (network, geolocation, console) WebDriver\'ın standart API\'sinden daha derin erişim sağlar.', en: 'This is like connecting to the JVM\'s own debug/profiling interface (JMX) in Java when the normal API isn\'t enough — CDP gives deeper access to the browser\'s internals (network, geolocation, console) than WebDriver\'s standard API.' },
            keyPoints: [
              { tr: 'CDP, Selenium\'un resmi API\'sinin yetersiz kaldığı "tarayıcıya özel" senaryolar için bir genişletmedir.', en: 'CDP is an extension for "browser-specific" scenarios where Selenium\'s official API falls short.' },
              { tr: 'Network throttling gibi senaryolar gerçek performans testi değildir, sadece kullanıcı deneyimini simüle eder.', en: 'Scenarios like network throttling aren\'t real performance testing — they only simulate user experience.' },
              { tr: 'CDP yalnızca Chromium tabanlı tarayıcılarda çalışır, Firefox/Safari\'de aynı şekilde davranmaz.', en: 'CDP only works on Chromium-based browsers — it doesn\'t behave the same way in Firefox/Safari.' },
            ],
            tip: { tr: 'Hangi senaryoda standart Selenium API\'sinin neden yetersiz kaldığını anlatmak, listeyi ezbere saymaktan daha güçlü bir cevap oluşturur.', en: 'Explaining why the standard Selenium API falls short in a given scenario makes a far stronger answer than reciting the list from memory.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Uzun çalışan bir Selenium test suite\'inde memory leak önlemek için hangi pratikleri uygularsınız?', en: 'What practices do you apply to prevent memory leaks in long-running Selenium test suites?' },
            a: { tr: '1) Her test sonrası driver.quit() — process hayatta kalmasın. @AfterMethod finally bloğunda. 2) ThreadLocal driver temizleme: driver.remove() çağır. 3) implicitlyWait süresini makul tut — 30+ saniye heap\'i şişirir. 4) Screenshot\'ları sınırlı tut — büyük PNG dosyaları bellek doldurur. 5) Tarayıcı profil cache\'ini temizle: ChromeOptions ile --disable-gpu, --no-sandbox, --disable-extensions. 6) Parallel thread sayısını CPU core sayısından fazla tutma. 7) JVM heap monitoring: Jenkins\'te GC log aktifleştir.' },
            analogy: { tr: 'Bu, Java\'da her `Connection`\'ı `try-with-resources` ile kapatmazsan connection pool\'un zamanla tükenmesine benzer — her driver.quit() atlanan test, arkasında bir orphan tarayıcı process\'i bırakır ve bellek zamanla dolar.', en: 'This is like a connection pool exhausting over time if you don\'t close every `Connection` with `try-with-resources` in Java — every skipped driver.quit() leaves an orphan browser process behind, and memory fills up over time.' },
            keyPoints: [
              { tr: 'Tek bir testin quit() atlaması önemsiz görünür, ama 1000 testlik suite\'te bu birikir ve CI ajanını çökertir.', en: 'One test skipping quit() seems trivial, but across a 1000-test suite it accumulates and can crash the CI agent.' },
              { tr: 'finally bloğunda quit() çağırmak, test ortasında exception fırlasa bile temizliği garanti eder.', en: 'Calling quit() in a finally block guarantees cleanup even if an exception is thrown mid-test.' },
              { tr: 'Screenshot/log gibi yan ürünleri de sınırlamazsan, disk/bellek baskısı sadece browser\'dan değil bu dosyalardan da gelir.', en: 'If you don\'t also limit side artifacts like screenshots/logs, memory/disk pressure comes from those files too, not just the browser.' },
            ],
            tip: { tr: 'Tek bir önlemle yetinme; "driver temizliği + kaynak limiti + paralellik kontrolü" üçlüsünü birlikte anlat, bu senior bakış açısı gösterir.', en: 'Don\'t settle for one fix — cover the trio of driver cleanup, resource limits, and parallelism control together; that shows a senior perspective.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Selenium ile API test yapmak mümkün mü? Evet ise ne zaman mantıklı olur?', en: 'Is it possible to do API testing with Selenium? If yes, when does it make sense?' },
            a: { tr: 'Selenium tarayıcı otomasyonu için tasarlanmıştır, REST API için değil. Ancak bazı durumlar mantıklı: 1) API\'yi tetikleyip UI\'da sonucu doğrulama: REST Assured/requests ile API çağrısı yapıp, Selenium ile UI\'da değişikliği kontrol et. 2) Oturum setup: API login yapıp session token\'ı cookie olarak Selenium\'a enjekte et. 3) Test verisi oluşturma: Selenium testinden önce API ile data oluştur. Saf API test için Selenium kullanılmamalı — REST Assured (Java), requests/pytest (Python) daha uygundur.' },
            analogy: { tr: 'Bu, Java\'da bir işi yapmak için yanlış aracı (örneğin saf SQL yerine ORM\'i raw query motoru gibi kullanmak) zorlamaya benzer — Selenium tarayıcı otomasyonu için tasarlandı, API testi için REST Assured gibi doğru aracı seçmek gerekir.', en: 'This is like forcing the wrong tool for a job in Java (e.g. using an ORM as a raw query engine instead of plain SQL) — Selenium was built for browser automation, and API testing calls for the right tool, like REST Assured.' },
            keyPoints: [
              { tr: 'Selenium\'u API testi için kullanmak değil, API\'yi Selenium testini HIZLANDIRMAK için kullanmak doğru yaklaşımdır.', en: 'The right approach isn\'t using Selenium for API testing — it\'s using the API to SPEED UP the Selenium test.' },
              { tr: 'API ile setup + UI ile doğrulama kombinasyonu, hem hız hem gerçekçilik kazandırır.', en: 'Combining API setup with UI verification gives you both speed and realism.' },
              { tr: 'Bu ayrımı bilmemek, mülakatta "araçların ne için var olduğunu anlamıyor" izlenimi yaratır.', en: 'Not knowing this distinction signals in an interview that you don\'t understand what each tool is for.' },
            ],
            tip: { tr: 'Doğrudan "hayır kullanmam" demek yerine, "evet ama sadece şu sınırlı amaçla" diyerek nüanslı bir cevap ver.', en: 'Instead of a flat "no, I wouldn\'t," give a nuanced answer: "yes, but only for this limited purpose."' },
          },
          {
            level: 'intermediate',
            q: { tr: 'pytest-selenium veya selenium-wire gibi eklentiler ne işe yarar? Projede nasıl kullandınız?', en: 'What are pytest-selenium and selenium-wire plugins useful for? How have you used them in projects?' },
            a: { tr: 'pytest-selenium: driver fixture\'larını otomatik yönetir, browser=chrome parametresiyle CLI\'dan browser seçilir, Sauce Labs/BrowserStack entegrasyonu. selenium-wire: Selenium\'u proxy olarak kullanıp HTTP istek/cevaplarını intercept eder, request header/body inceleme, response mock, network log analizi. Kullanım örneği: selenium-wire ile API token capture: driver.requests ile token yakalanır, başka testte kullanılır. Ayrıca selenium-stealth: bot detection bypass için.' },
            analogy: { tr: 'Bu, Java\'da Spring Boot\'un sana hazır auto-configuration sağlaması gibi — pytest-selenium driver yönetimini senin yerine yapar, selenium-wire ise bir proxy/interceptor (Java\'daki servlet filter\'a benzer) gibi davranıp trafiği araya girip inceler.', en: 'This is like Spring Boot giving you ready-made auto-configuration in Java — pytest-selenium manages the driver for you, while selenium-wire acts like a proxy/interceptor (similar to a Java servlet filter) that inspects traffic in between.' },
            keyPoints: [
              { tr: 'Bu eklentiler "zorunlu" değil, tekrar eden boilerplate\'i azaltan kolaylıklardır.', en: 'These plugins aren\'t mandatory — they\'re conveniences that reduce repetitive boilerplate.' },
              { tr: 'selenium-wire ile network seviyesinde doğrulama yapmak, UI\'dan "görünmeyen" hataları (yanlış API çağrısı) yakalamanı sağlar.', en: 'Verifying at the network level with selenium-wire lets you catch errors invisible from the UI (wrong API calls).' },
              { tr: 'Eklenti seçimi proje ihtiyacına göre değişir; her projede otomatik kullanmak yerine ihtiyacı gerekçelendir.', en: 'Plugin choice depends on project needs — justify the need instead of using them automatically everywhere.' },
            ],
            tip: { tr: 'Somut bir kullanım anlatmak ("token\'ı network trafiğinden yakaladım ve başka testte kullandım") genel tanımdan çok daha ikna edicidir.', en: 'Describing a concrete use ("I captured a token from network traffic and reused it in another test") is far more convincing than a generic definition.' },
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
            analogy: { tr: 'Bu, Java\'da bir `List<Row>` üzerinde stream().filter() ile belirli bir koşulu sağlayan satırı bulmaya benzer — burada filtre koşulu Selenium\'da metin karşılaştırmasıyla yapılır, ama mantık birebir aynıdır.', en: 'This is like using stream().filter() over a Java `List<Row>` to find the row matching a condition — here the filter condition is a text comparison in Selenium, but the logic is identical.' },
            keyPoints: [
              { tr: 'findElements ile satırları çekmeden önce tablonun tamamen yüklendiğinden emin olmak gerekir (özellikle sayfalama varsa).', en: 'Make sure the table is fully loaded before pulling rows with findElements, especially if pagination exists.' },
              { tr: 'Sütun index\'ini hardcode etmek kırılgandır; mümkünse header text\'inden index\'i dinamik bul.', en: 'Hardcoding the column index is fragile — find the index dynamically from the header text when possible.' },
              { tr: 'Eşleşen satır bulununca döngüden çıkmak (break) gereksiz iterasyonu önler.', en: 'Breaking out of the loop once a match is found avoids unnecessary iteration.' },
            ],
            tip: { tr: 'Kod yazmadan önce "tablo dinamik mi, sayfalanmış mı" diye soru sormak, gerçek dünya tecrübeni gösterir.', en: 'Asking "is the table dynamic, is it paginated" before writing code shows real-world experience.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'ExtentReports veya Allure ile Selenium test raporu nasıl oluşturulur? Neleri içermeli?', en: 'How do you generate a Selenium test report with ExtentReports or Allure? What should it include?' },
            a: { tr: 'Allure (önerilen): @Attachment ile screenshot, @Step ile adım loglama, @Severity ile önceliklendirme. Maven\'da allure-testng dependency + allure:report komut. Rapor içermeli: test adı, başarı/başarısızlık, süre, hata mesajı + stack trace, başarısız testin ekran görüntüsü, test parametreleri. ExtentReports: ExtentHtmlReporter + ExtentTest.addScreenCaptureFromPath. @AfterMethod\'da başarısız testleri yakala: ITestResult result ile status kontrolü. CI\'da: Jenkins Allure plugin ile otomatik rapor yayınlama.' },
            analogy: { tr: 'Bu, Java\'da loglama için sadece `System.out.println()` yerine yapılandırılmış bir logging framework\'ü (SLF4J/Logback) kullanmaya benzer — ham konsol çıktısı yerine aranabilir, filtrelenebilir, paylaşılabilir bir rapor üretirsin.', en: 'This is like using a structured logging framework (SLF4J/Logback) in Java instead of plain `System.out.println()` — instead of raw console output, you produce a searchable, filterable, shareable report.' },
            keyPoints: [
              { tr: 'Raporun değeri sadece pass/fail göstermek değil, hatayı hızlıca teşhis etmeyi (screenshot+stacktrace) sağlamaktır.', en: 'A report\'s value isn\'t just showing pass/fail — it\'s enabling fast diagnosis with screenshot + stack trace.' },
              { tr: '@Step gibi adım loglama, hangi adımda fail olduğunu test kodunu açmadan anlamanı sağlar.', en: 'Step logging like @Step lets you see exactly where it failed without opening the test code.' },
              { tr: 'CI entegrasyonu (Jenkins Allure plugin) raporu herkesin erişebileceği bir yere taşır, sadece local\'de kalmaz.', en: 'CI integration (Jenkins Allure plugin) makes the report accessible to everyone, not just local.' },
            ],
            tip: { tr: '"Rapor güzel görünür" demek yerine, raporun bir hatayı debug ederken sana ne kadar zaman kazandırdığını anlat.', en: 'Instead of saying "the report looks nice," explain how much debugging time the report actually saved you.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'BrowserStack veya Sauce Labs gibi cloud platformlarda Selenium testleri nasıl çalıştırılır?', en: 'How do you run Selenium tests on cloud platforms like BrowserStack or Sauce Labs?' },
            a: { tr: 'RemoteWebDriver\'ı cloud platform URL\'ine yönlendirirsiniz. BrowserStack: URL = "https://username:key@hub-cloud.browserstack.com/wd/hub". Capabilities\'e platformName, browserName, browserVersion, os, os_version eklenir. BrowserStack Automate dashboard\'da video kayıt, screenshot, log otomatik gelir. Sauce Labs: benzer pattern, "sauce:options" namespace. Avantajlar: gerçek cihaz/browser çeşitliliği, paralel test, lokal test için tunnel (BrowserStack Local). Dikkat: credential\'ları environment variable olarak saklayın, kaynak koda yazmayın.' },
            analogy: { tr: 'Bu, Java\'da local makinede çalıştırmak yerine kodu bir cloud build sunucusuna (Jenkins agent) göndermeye benzer — RemoteWebDriver, capabilities ile "şu tarayıcı/işletim sistemini istiyorum" diyerek isteği uzak bir makineye yönlendirir.', en: 'This is like sending code to a cloud build server (a Jenkins agent) instead of running it locally in Java — RemoteWebDriver uses capabilities to say "I want this browser/OS" and routes the request to a remote machine.' },
            keyPoints: [
              { tr: 'Cloud platformların asıl değeri gerçek cihaz/browser çeşitliliğidir, local\'de bunu kurmak pratik değildir.', en: 'The real value of cloud platforms is real device/browser variety — setting this up locally isn\'t practical.' },
              { tr: 'Credential\'ları kod içine yazmak ciddi bir güvenlik hatasıdır, environment variable kullanılmalı.', en: 'Hardcoding credentials in code is a serious security mistake — use environment variables.' },
              { tr: 'Yerel ortamı test etmek istiyorsan (localhost) bir tunnel (BrowserStack Local) kurman gerekir.', en: 'If you need to test a local environment (localhost), you need a tunnel (BrowserStack Local).' },
            ],
            tip: { tr: '"Neden cloud kullanırım" sorusuna sadece "çeşitlilik" deme; maliyet/bakım trade-off\'unu da değerlendirdiğini göster.', en: 'When asked why you\'d use cloud, don\'t just say "variety" — show you\'ve also weighed the cost/maintenance trade-off.' },
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
            analogy: { tr: 'Bu, Java\'da checked exception fırlatabilen bir metodu try-catch ile sarmana benzer — TypeScript\'te her Selenium çağrısı bir Promise olduğu için, hatayı yakalamazsan uygulama sessizce "unhandled rejection" ile çöker.', en: 'This is like wrapping a method that throws a checked exception in try-catch in Java — since every Selenium call in TypeScript is a Promise, failing to catch it silently crashes the app with an "unhandled rejection".' },
            keyPoints: [
              { tr: 'finally bloğunda driver.quit() çağırmak, Java\'daki try-finally ile aynı garantiyi sağlar.', en: 'Calling driver.quit() in a finally block gives the same guarantee as try-finally in Java.' },
              { tr: 'Hata fırlatıldığında ek bağlam (screenshot, hangi adımda olduğu) eklemek debug\'ı çok hızlandırır.', en: 'Attaching extra context (screenshot, which step) when rethrowing speeds up debugging enormously.' },
              { tr: 'await unutmak en sık hatadır — Promise resolve olmadan bir sonraki satıra geçilir ve test yanıltıcı şekilde "geçer".', en: 'Forgetting await is the most common mistake — execution moves on before the Promise resolves, and the test misleadingly "passes".' },
            ],
            tip: { tr: 'Sadece try-catch söylemekle yetinme; "await unutulursa ne olur" sorusunu da öngörerek cevabını derinleştir.', en: 'Don\'t stop at try-catch — deepen your answer by anticipating "what happens if await is forgotten".' },
          },
          // ADVANCED (15 soru)
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerinde test piramidi nasıl uygulanır? 1000 E2E testiniz var ve çok yavaş — nasıl optimize edersiniz?', en: 'How do you apply the test pyramid with Selenium? You have 1000 E2E tests and they\'re very slow — how do you optimize?' },
            a: { tr: 'Test piramidi pratiği: Unit testler (hızlı) → Integration testler → E2E (az, kritik path). Optimizasyon stratejileri: 1) Paralel çalıştırma: TestNG thread-count="8", pytest-xdist -n 8. 2) Cookie ile login: UI login\'i bypass et, her test 5-10sn kazanır. 3) API setup + UI verify: test data\'yı API ile oluştur, sadece UI\'ı doğrula. 4) Headless mode: ~30% hız artışı. 5) Selective run: @Tag ile smoke/regression ayır, PR\'da smoke, gece regression. 6) Test data factory: unique veri ile DB reset ihtiyacını azalt. 7) Grid: 8 thread ile 1000 test 8x hızlı.' },
            analogy: { tr: 'Bu, Java\'da monolitik bir entegrasyon test paketini mikroservis mimarisine göre yeniden katmanlandırmaya benzer — sorun "testleri hızlandırmak" değil, "yanlış katmanda fazla test biriktirmiş olmak"tır.', en: 'This is like re-layering a monolithic integration test suite to match a microservice architecture in Java — the real problem isn\'t "making tests faster", it\'s "having accumulated too many tests at the wrong layer".' },
            keyPoints: [
              { tr: 'İlk soru hız değil, "bu 1000 testin kaçı gerçekten E2E olmak zorunda" olmalıdır.', en: 'The first question shouldn\'t be speed — it should be "how many of these 1000 tests truly need to be E2E".' },
              { tr: 'Paralellik ve cookie-login gibi taktikler önemli ama mimari sorunu çözmez, sadece semptomu hafifletir.', en: 'Tactics like parallelism and cookie-login matter, but they don\'t fix the architectural issue — they only ease the symptom.' },
              { tr: 'Smoke/regression ayrımı, her PR\'da 1000 testi koşturmak zorunda kalmadan hızlı geri bildirim sağlar.', en: 'Splitting smoke/regression gives fast feedback without running all 1000 tests on every PR.' },
            ],
            tip: { tr: 'Senior cevap önce mimari teşhis koyar (piramidi neden bozuk), sonra taktiksel optimizasyonları sıralar — sırayı tersine çevirme.', en: 'A senior answer diagnoses the architecture first (why the pyramid is inverted), then lists tactical optimizations — don\'t reverse that order.' },
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
            analogy: { tr: 'Bu, Java\'da iki obje arasında `equals()` yerine alan alan (`assertEquals` her field için) karşılaştırma yapmaya benzer — burada karşılaştırılan şey kod değil piksel, ama prensip aynı: küçük, kabul edilebilir farkları tolere eden bir eşitlik tanımı kurman gerekir.', en: 'This is like comparing objects field-by-field with `assertEquals` instead of relying on `equals()` in Java — here you\'re comparing pixels instead of code, but the principle is the same: you need an equality definition that tolerates small, acceptable differences.' },
            keyPoints: [
              { tr: 'En büyük risk false positive\'lerdir — dinamik içerik (tarih, sayaç) maskelenmezse her run fail eder ve ekip raporu görmezden gelmeye başlar.', en: 'The biggest risk is false positives — if dynamic content (date, counters) isn\'t masked, every run fails and the team starts ignoring the report.' },
              { tr: 'Element-level screenshot, full-page\'e göre daha az kırılgandır çünkü sayfanın geri kalanındaki değişikliklerden etkilenmez.', en: 'Element-level screenshots are less fragile than full-page ones because they aren\'t affected by unrelated page changes.' },
              { tr: 'Tolerans eşiği (threshold) çok düşükse her font-rendering farkında fail eder, çok yüksekse gerçek regresyonu kaçırır.', en: 'Too low a threshold fails on every font-rendering difference; too high a threshold misses real regressions.' },
            ],
            tip: { tr: 'Aracı (Applitools/AShot) saymakla yetinme; "false positive\'i nasıl yönettiğini" anlatmak bu konuda gerçek tecrübe olduğunu gösterir.', en: 'Don\'t just name tools (Applitools/AShot) — explaining how you manage false positives proves real hands-on experience.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerini Kubernetes\'te çalıştırmak için nasıl bir mimari kurarsınız?', en: 'What architecture do you set up to run Selenium tests in Kubernetes?' },
            a: { tr: 'Selenium Grid 4 + Kubernetes: 1) Helm chart ile Selenium Grid deploy: helm install selenium-grid docker-selenium/selenium-grid. 2) Hub bir deployment, Chrome/Firefox node\'ları ayrı deployment. 3) HorizontalPodAutoscaler: test sayısına göre node\'ları scale et. 4) Job/CronJob: test suite\'i Kubernetes Job olarak çalıştır. 5) Persistent Volume: screenshot ve report\'ları sakla. 6) Ingress: Grid console\'u expose et. Alternatif: Zalenium (Docker/K8s için Grid + video kaydı). Avantaj: otomatik scale-out, cost efficiency, izolasyon.' },
            analogy: { tr: 'Bu, Java\'da bir uygulamayı sabit sunucu sayısıyla değil, talebe göre otomatik ölçeklenen bir mimariyle (Kubernetes Deployment + HPA) çalıştırmaya benzer — Selenium Grid\'i de aynı elastik mantıkla, sabit değil talebe göre büyüyen bir altyapı olarak tasarlarsın.', en: 'This is like running a Java app with an architecture that auto-scales on demand (Kubernetes Deployment + HPA) instead of a fixed server count — you design Selenium Grid the same elastic way, growing with demand instead of staying fixed.' },
            keyPoints: [
              { tr: 'Hub ve node\'ları ayrı deployment olarak tutmak, node\'ları talebe göre bağımsız ölçeklendirmeyi sağlar.', en: 'Keeping Hub and nodes as separate deployments lets you scale nodes independently based on demand.' },
              { tr: 'Persistent Volume olmadan pod yeniden başladığında tüm screenshot/report kaybolur — bu sık atlanan bir tasarım hatasıdır.', en: 'Without a Persistent Volume, all screenshots/reports vanish when a pod restarts — a commonly missed design flaw.' },
              { tr: 'Maliyet kontrolü için node sayısını sınırsız scale etmek yerine bir üst limit (max replicas) koymak gerekir.', en: 'For cost control, you need an upper limit (max replicas) instead of scaling nodes without bound.' },
            ],
            tip: { tr: 'Sadece Helm komutunu söylemek yetmez; "neden K8s, neden statik Grid değil" sorusuna maliyet/elastiklik açısından cevap ver.', en: 'Reciting the Helm command isn\'t enough — answer "why K8s, why not a static Grid" from a cost/elasticity perspective.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testleri production ortamında çalıştırmak güvenli midir? Hangi önlemleri alırsınız?', en: 'Is it safe to run Selenium tests in production? What precautions do you take?' },
            a: { tr: 'Production\'da Selenium yalnızca read-only smoke test senaryolarında makuldür. Önlemler: 1) Yalnızca GET işlemleri — hiçbir yazma/silme operasyonu. 2) Ayrı test hesabı: production\'da özel test@company.com hesabı. 3) Rate limiting: production\'da arka arkaya request atmayı sınırlandır. 4) Synthetic monitoring: Datadog Synthetics, AWS CloudWatch Synthetics gibi managed çözümler tercih edin. 5) Canary deployment: production\'a tam Selenium suite çalıştırma, yalnızca kritik health check. 6) İzinler: DBA/DevOps onayı olmadan production DB\'e dokunan test yapma.' },
            analogy: { tr: 'Bu, Java\'da production veritabanına sadece read-replica üzerinden, asla write yapmadan sorgu atmaya benzer — production\'da Selenium çalıştırmak da aynı disiplini gerektirir: sadece gözlem, asla mutasyon.', en: 'This is like querying a production database only through a read-replica, never writing, in Java — running Selenium in production demands the same discipline: observation only, never mutation.' },
            keyPoints: [
              { tr: 'Yazma/silme riski olan her adım production\'da otomatik koşturulmamalı, bu kural istisnasızdır.', en: 'Any step with write/delete risk should never run automatically in production — this rule has no exceptions.' },
              { tr: 'Managed synthetic monitoring araçları (Datadog, CloudWatch Synthetics) bu riski sıfıra indiren daha olgun bir tercihtir.', en: 'Managed synthetic monitoring tools (Datadog, CloudWatch Synthetics) are a more mature choice that reduces this risk to zero.' },
              { tr: 'Production testi, regression suite\'in küçültülmüş hali değil, tamamen ayrı ve minimal bir health-check setidir.', en: 'Production testing isn\'t a shrunk-down regression suite — it\'s a completely separate, minimal health-check set.' },
            ],
            tip: { tr: '"Evet ama çok sınırlı koşullarda" diyerek nüanslı cevap ver; "asla yapmam" veya "her zaman yaparım" gibi uç cevaplardan kaçın.', en: 'Give a nuanced answer — "yes, but under very limited conditions" — avoid extreme answers like "never" or "always".' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium ile test etmesi zor olan özellikler nelerdir? Bunlar için hangi alternatif stratejileri kullanırsınız?', en: 'What features are difficult to test with Selenium? What alternative strategies do you use for them?' },
            a: { tr: 'Zor senaryolar ve çözümler: 1) Gerçek zamanlı WebSocket (chat, fiyat güncellemesi): Selenium WebSocket\'i doğrudan izleyemez — Selenium Grid + CDP ya da ayrı WebSocket client. 2) CAPTCHA: test ortamında bypass et veya reCAPTCHA test key kullan. 3) Dosya indirme doğrulaması: ChromeOptions ile download dizini belirle, dosya var mı kontrol et. 4) Email doğrulama: Mailhog, Mailtrap gibi fake SMTP kullan. 5) Push notification: service worker ile mock. 6) 2FA/OTP: test ortamında bypass et veya TOTP secret ile kod üret. 7) Performance: Selenium performans test için değil — JMeter/k6 kullan.' },
            analogy: { tr: 'Bu, Java\'da her problemi tek bir framework\'le (örn. sadece JPA ile) çözmeye çalışmaya benzer — bazı problemler o aracın tasarım sınırlarının dışındadır, doğru yaklaşım "zorlamak" değil "doğru aracı seçmek"tir.', en: 'This is like trying to solve every problem with a single framework (say, JPA alone) in Java — some problems sit outside that tool\'s design boundary; the right move isn\'t forcing it, it\'s picking the right tool.' },
            keyPoints: [
              { tr: 'Her "zor" senaryo için önce "bu gerçekten Selenium\'un işi mi" diye sormak, gereksiz karmaşıklığı önler.', en: 'For every "hard" scenario, asking "is this really Selenium\'s job" first prevents unnecessary complexity.' },
              { tr: 'WebSocket, performans, CAPTCHA gibi konular ayrı uzmanlık alanlarıdır — bunları Selenium\'a zorlamak kırılgan testler üretir.', en: 'WebSocket, performance, CAPTCHA are separate specialties — forcing them into Selenium produces brittle tests.' },
              { tr: 'Test ortamında bypass mekanizmaları (test key, fake SMTP) kurmak, üretim güvenliğini bozmadan test edilebilirliği artırır.', en: 'Setting up bypass mechanisms in test environments (test keys, fake SMTP) increases testability without compromising production security.' },
            ],
            tip: { tr: 'Listeyi ezbere saymak yerine, hangi senaryoda "Selenium\'u zorlamayı bıraktığını ve doğru aracı seçtiğini" anlatan bir örnek ver.', en: 'Instead of reciting the list, give an example of when you stopped forcing Selenium and picked the right tool instead.' },
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
            analogy: { tr: 'Bu, Java\'da production config\'i değil, environment-specific profile\'ları (`application-test.yml`) kullanmaya benzer — gerçekçi ama izole, üretim verisine asla dokunmayan bir veri katmanı kurarsın.', en: 'This is like using environment-specific profiles (`application-test.yml`) instead of production config in Java — you build a data layer that\'s realistic but isolated, never touching production data.' },
            keyPoints: [
              { tr: 'Faker gibi araçlar "rastgele" değil "gerçekçi ama sahte" veri üretir — locale\'e duyarlı olması (TR isim/adres) önemlidir.', en: 'Tools like Faker generate data that\'s "realistic but fake", not random — locale awareness (TR names/addresses) matters.' },
              { tr: 'Builder pattern, test verisini okunabilir ve değiştirilebilir tutar — her testte aynı uzun setup kodunu tekrar etmezsin.', en: 'The builder pattern keeps test data readable and adjustable — you don\'t repeat the same long setup code in every test.' },
              { tr: 'Veri temizliği (cleanup) atlanırsa, test veritabanı zamanla şişer ve testler birbirini etkilemeye başlar.', en: 'Skipping cleanup lets the test database bloat over time, and tests start interfering with each other.' },
            ],
            tip: { tr: '"Faker kullanırım" demekle yetinme; veri yaşam döngüsünü (üretim → kullanım → temizlik) bir bütün olarak anlat.', en: 'Don\'t stop at "I use Faker" — describe the full data lifecycle (creation → use → cleanup) as one coherent story.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium WebDriver Protocol (W3C) ile JSON Wire Protocol arasındaki teknik farkları açıklayın. Bu fark testlerinizi nasıl etkiler?', en: 'Explain the technical differences between W3C WebDriver Protocol and JSON Wire Protocol. How does this affect your tests?' },
            a: { tr: 'JSON Wire Protocol: Selenium\'un kendi tanımladığı HTTP API, tarayıcı sürücülerinin kendi davranışları vardı, standart değildi. W3C WebDriver (RFC 7234): IETF standardı, tüm tarayıcı sürücülerinin aynı davranışı göstermesini zorunlu kılar. Pratik etkiler: 1) Selenium 4 W3C\'dir — eski Desired Capabilities API kaldırıldı, Options (ChromeOptions/FirefoxOptions) kullanılmalı. 2) Actions API yeniden yazıldı — W3C actions daha tutarlı. 3) Relative locators yalnızca W3C\'de mevcut. 4) BrowserStack/Sauce Labs W3C capabilities namespace gerektirir.' },
            analogy: { tr: 'Bu, Java\'da JDBC sürücülerinin standartlaşmadan önce her veritabanı için farklı davranmasına, sonra ortak bir spesifikasyona (JDBC API) bağlanmasına benzer — W3C standardı da her tarayıcı sürücüsünün aynı sözleşmeye uymasını zorunlu kılar.', en: 'This is like JDBC drivers behaving differently per database before standardization, then converging on a common spec (the JDBC API) in Java — the W3C standard forces every browser driver to honor the same contract the same way.' },
            keyPoints: [
              { tr: 'Bu fark akademik değil pratiktir: eski Desired Capabilities kodu Selenium 4\'te çalışmayabilir.', en: 'This difference isn\'t academic — old Desired Capabilities code may not work in Selenium 4.' },
              { tr: 'Standart sayesinde farklı tarayıcı sürücüleri artık tutarlı davranır, bu da cross-browser testleri daha güvenilir kılar.', en: 'Thanks to the standard, different browser drivers now behave consistently, making cross-browser tests more reliable.' },
              { tr: 'Relative locator gibi yeni özellikler doğrudan bu standardizasyonun bir sonucudur.', en: 'New features like relative locators are a direct result of this standardization.' },
            ],
            tip: { tr: 'Tarih/protokol bilgisini ezbere anlatmak yerine, "bu yüzden eski projeyi Selenium 4\'e yükseltirken şunlar kırıldı" gibi pratik bir etki anlat.', en: 'Instead of reciting protocol history, describe a practical impact: "this is why upgrading the old project to Selenium 4 broke these things."' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerinde flaky test oranını %5\'in altına düşürmek için hangi sistematik yaklaşımı izlersiniz?', en: 'What systematic approach do you follow to bring flaky test rate below 5% in Selenium tests?' },
            a: { tr: 'Sistematik yaklaşım: 1) Flaky test tracking: her CI çalıştırmasında fail/pass oranını logla, %80 altı pass rate = flaky. 2) Root cause kategorileri: timing, test data, selector, environment, test interaction. 3) Timing: tüm Thread.sleep() kaldır, EC ile değiştir. 4) Selector stability: ID > CSS > XPath; DOM\'a bağımlı absolute XPath kaldır. 5) Test izolasyonu: her test kendi verisini oluşturur, ortak veri kullanmaz. 6) Retry mekanizması: @Retry annotation (TestNG) ile 1 kez otomatik retry. 7) Environment stability: Docker ile deterministik test ortamı. 8) Review: flaky testleri tüm PR pipeline\'ında zorunlu geç.' },
            analogy: { tr: 'Bu, Java\'da production\'daki hataları rastgele fix etmek yerine bir hata izleme/sınıflandırma sistemi (Sentry, kategori bazlı triage) kurmaya benzer — flaky testleri tek tek "tahminle" düzeltmek yerine, sistematik olarak izleyip kök neden kategorisine göre çözersin.', en: 'This is like setting up an error-tracking/triage system (Sentry, category-based) in Java instead of randomly patching production bugs — instead of fixing flaky tests one by one by guessing, you track them systematically and fix by root-cause category.' },
            keyPoints: [
              { tr: 'Ölçmeden iyileştirme olmaz — önce hangi testlerin ne sıklıkla flaky olduğunu veri ile takip etmek şart.', en: 'You can\'t improve what you don\'t measure — tracking which tests flake and how often is the first step.' },
              { tr: 'Retry mekanizması bir güvenlik ağıdır, asla kök neden analizinin yerine geçmemelidir.', en: 'A retry mechanism is a safety net — it should never replace root-cause analysis.' },
              { tr: 'Flaky testleri PR pipeline\'ında zorunlu geçirmek (quarantine), ekibin onlara güvenini kaybetmesini önler.', en: 'Quarantining flaky tests from blocking the PR pipeline prevents the team from losing trust in the suite.' },
            ],
            tip: { tr: '%5 gibi somut bir hedef verildiğinde, bunu nasıl ölçtüğünü (dashboard, pass rate metriği) anlatmak cevabı inandırıcı kılar.', en: 'When given a concrete target like 5%, explaining how you\'d measure it (a dashboard, pass-rate metric) makes the answer credible.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Büyük bir e-ticaret projesinde Selenium test mimarisini sıfırdan tasarlayın. Hangi kararları verirsiniz?', en: 'Design Selenium test architecture from scratch for a large e-commerce project. What decisions do you make?' },
            a: { tr: 'Mimari kararlar: 1) Framework: Java + TestNG + Maven (ekip Java biliyor). 2) Pattern: Page Object Model + Page Factory (@FindBy annotations). 3) Test runner: TestNG XML suite, tag\'lar: @Test(groups={"smoke","regression"}). 4) Raporlama: Allure Reports + Slack entegrasyonu. 5) Driver yönetimi: ThreadLocal WebDriver, DriverFactory class. 6) Config: properties dosyası + environment variable override. 7) CI/CD: Jenkins multibranch pipeline, PR\'da smoke, gece regression. 8) Grid: Selenium Grid 4 + Docker, 10 paralel node. 9) Data: Faker + REST API setup. 10) Monitoring: flaky test dashboard, Grafana.' },
            analogy: { tr: 'Bu, Java\'da yeni bir mikroservis projesine sıfırdan mimari kararlar (framework, katmanlama, CI/CD, monitoring) vermeye birebir benzer — test otomasyonu da kendi başına bir yazılım projesidir, aynı mimari disiplinle ele alınmalıdır.', en: 'This is exactly like making architecture decisions from scratch for a new microservice project in Java (framework, layering, CI/CD, monitoring) — test automation is a software project in its own right and deserves the same architectural discipline.' },
            keyPoints: [
              { tr: 'İlk karar teknoloji değil, ekibin mevcut yetkinliğidir — ekip Java biliyorsa Python\'a zorlamak yanlış bir başlangıçtır.', en: 'The first decision isn\'t technology — it\'s the team\'s existing skill set; forcing Python on a Java-skilled team is the wrong start.' },
              { tr: 'Raporlama ve monitoring\'i sona bırakmak yaygın bir hatadır, flaky test dashboard\'u en başından planlanmalı.', en: 'Leaving reporting and monitoring for last is a common mistake — a flaky test dashboard should be planned from day one.' },
              { tr: 'Paralel altyapı (Grid/Docker) ölçeklenebilirlik kararıdır, sayı sonradan büyük maliyetle değiştirilir.', en: 'Parallel infrastructure (Grid/Docker) is a scalability decision — changing it later is costly.' },
            ],
            tip: { tr: 'Tüm kararları tek tek saymak yerine, hangi sırayla karar verdiğini (önce ekip, sonra pattern, sonra altyapı) anlatmak mimari olgunluk gösterir.', en: 'Instead of just listing decisions, explaining the order you made them in (team first, then pattern, then infrastructure) shows architectural maturity.' },
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
            analogy: { tr: 'Bu, Java\'da bir mikroservisi yatay ölçeklendirmek için tek instance yerine birden fazla replica çalıştırmaya (load balancer arkasında) benzer — Hub bir load balancer gibi davranır, Node\'lar ise ölçeklenen worker\'lardır.', en: 'This is like horizontally scaling a Java microservice by running multiple replicas behind a load balancer instead of one instance — the Hub behaves like a load balancer, and Nodes are the scaling workers.' },
            keyPoints: [
              { tr: 'shm_size ayarını unutmak Chrome\'un crash etmesine yol açan sık karşılaşılan bir Docker hatasıdır.', en: 'Forgetting the shm_size setting is a common Docker mistake that causes Chrome to crash.' },
              { tr: 'Node sayısını --scale ile artırmak kolaydır ama gerçek darboğaz genelde host makinenin CPU/RAM\'idir.', en: 'Scaling node count with --scale is easy, but the real bottleneck is usually the host machine\'s CPU/RAM.' },
              { tr: 'Event bus ayarlarının (host/port) Hub ile Node arasında doğru eşleşmemesi, sessizce session oluşturamamaya yol açar.', en: 'Mismatched event bus settings (host/port) between Hub and Node silently prevent sessions from being created.' },
            ],
            tip: { tr: 'docker-compose dosyasını ezbere yazmak yerine, ölçeklendirirken karşılaştığın gerçek bir darboğazı (RAM, network) anlatmak deneyimini kanıtlar.', en: 'Instead of reciting the docker-compose file, describing a real bottleneck you hit while scaling (RAM, network) proves hands-on experience.' },
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
            analogy: { tr: 'Bu, Java\'da bir profiling aracını (JProfiler) yük testi aracı (JMeter) yerine kullanmaya benzer — profiling sana tek bir akış hakkında bilgi verir ama sistemin yük altındaki davranışını ölçmez; Selenium da aynı sınırlamayı taşır.', en: 'This is like using a profiling tool (JProfiler) instead of a load-testing tool (JMeter) in Java — profiling tells you about a single flow but doesn\'t measure system behavior under load; Selenium carries the same limitation.' },
            keyPoints: [
              { tr: 'Selenium tek bir kullanıcının deneyimini ölçer, JMeter/k6 ise yüzlerce eşzamanlı kullanıcıyı simüle eder — ikisi farklı sorulara cevap verir.', en: 'Selenium measures a single user\'s experience; JMeter/k6 simulates hundreds of concurrent users — they answer different questions.' },
              { tr: 'Network throttling gerçek performans verisi değil, kullanıcı deneyimi simülasyonudur, bunu karıştırmamak gerekir.', en: 'Network throttling isn\'t real performance data — it\'s a UX simulation; don\'t conflate the two.' },
              { tr: 'Navigation Timing API gibi metrikler tek seferlik sayfa yükleme bilgisi verir, sistemik darboğazı göstermez.', en: 'Metrics like the Navigation Timing API give one-off page-load info — they don\'t reveal systemic bottlenecks.' },
            ],
            tip: { tr: '"Selenium performans testi yapamaz" demekle yetinme; hangi sınırlı bilgiyi yine de verebileceğini (Synthetic monitoring) ekleyerek dengeli bir cevap ver.', en: 'Don\'t stop at "Selenium can\'t do performance testing" — balance it by adding what limited insight it can still provide (synthetic monitoring).' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium 4\'ün BiDi (Bidirectional) protokol desteği nedir? Gelecekte Selenium\'u nasıl etkiler?', en: 'What is Selenium 4\'s BiDi (Bidirectional) protocol support? How will it affect Selenium\'s future?' },
            a: { tr: 'WebDriver BiDi, W3C\'nin yeni standartıdır. Mevcut WebDriver HTTP protokolü request-response tabanlıdır (tek yönlü). BiDi, WebSocket üzerinden çift yönlü iletişim sağlar. Anlık event streaming: console log, network event, DOM mutation — Playwright\'ın zaten desteklediği özellikler. Pratik kullanım: console.error dinleme, network request/response intercept, element tıklandığında event. Selenium 4.3+ ile Chrome BiDi desteklenir. Gelecekte Selenium ile Playwright arasındaki fark kapanacak: auto-wait, native event streaming, daha stabil testler.' },
            analogy: { tr: 'Bu, Java\'da senkron HTTP request-response yerine WebSocket ile çift yönlü, anlık event akışına geçmeye benzer — BiDi de WebDriver\'ı "sor-cevap al" modelinden "anlık olay dinle" modeline taşıyor.', en: 'This is like moving from synchronous HTTP request-response to a bidirectional, real-time WebSocket event stream in Java — BiDi moves WebDriver from an "ask-and-wait" model to a "listen for live events" model.' },
            keyPoints: [
              { tr: 'Bu, Playwright\'ın zaten sahip olduğu native event mimarisine Selenium\'un yetişme çabasıdır.', en: 'This is Selenium\'s effort to catch up to the native event architecture Playwright already had.' },
              { tr: 'Anlık console/network event dinleme, polling tabanlı yaklaşımlardan çok daha verimli ve gerçek zamanlıdır.', en: 'Real-time console/network event listening is far more efficient and timely than polling-based approaches.' },
              { tr: 'Bu özellik henüz olgunlaşma aşamasında; tüm tarayıcılarda aynı seviyede desteklenmiyor olabilir.', en: 'This feature is still maturing — it may not be supported at the same level across all browsers.' },
            ],
            tip: { tr: 'Sadece "yenilik" demek yerine, bunun Selenium\'u Playwright\'a neden yakınlaştırdığını teknik olarak (auto-wait, event streaming) açıkla.', en: 'Don\'t just say "it\'s new" — explain technically why it brings Selenium closer to Playwright (auto-wait, event streaming).' },
          },
          {
            level: 'advanced',
            q: { tr: 'Projenizde Selenium\'dan Playwright\'a geçişe karar verdiniz. Migration planını ve dikkat edilecek noktaları anlatın.', en: 'You\'ve decided to migrate from Selenium to Playwright in your project. Describe the migration plan and key considerations.' },
            a: { tr: 'Migration planı: 1) Audit: kaç test var, hangi browser, hangi dil, özel Selenium özelliği (Grid, CDP) var mı? 2) Pilot: 20-30 kritik test Playwright\'a çevir, karşılaştır. 3) Paralel çalıştırma: hem Selenium hem Playwright çalıştır, sonuçları karşılaştır. 4) Kademeli geçiş: modül modül — Login → Checkout → Admin. Teknik dönüşümler: By.id("x") → page.locator("#x"), WebDriverWait → auto-wait (silinir!), switchTo().frame() → frameLocator(), Actions → locator.hover(). Dikkat: Playwright Java\x27da erken stage, Python/TS daha stabil. TestNG → @playwright/test (TS için). Timeline: 100 test için 2-4 hafta.' },
            analogy: { tr: 'Bu, Java\'da eski bir framework\'ten (örn. Struts\'tan Spring\'e) kademeli geçiş yapmaya benzer — big-bang rewrite riskli ve maliyetlidir, modül modül paralel çalıştırarak güveni adım adım kazanırsın.', en: 'This is like a gradual migration from an old framework to a new one (say, Struts to Spring) in Java — a big-bang rewrite is risky and costly; you build confidence module by module while running both in parallel.' },
            keyPoints: [
              { tr: 'İlk adım kod yazmak değil, mevcut suite\'in envanterini çıkarmaktır — kaç test, hangi özel Selenium bağımlılığı var.', en: 'The first step isn\'t writing code — it\'s inventorying the existing suite: how many tests, which special Selenium dependencies exist.' },
              { tr: 'WebDriverWait\'in tamamen kalkması (Playwright\'ın auto-wait\'i) hem bir kazanç hem ekip için bir zihniyet değişikliğidir.', en: 'WebDriverWait disappearing entirely (Playwright\'s auto-wait) is both a gain and a mindset shift for the team.' },
              { tr: 'Pilot aşamada sonuçları karşılaştırmadan tüm suite\'i geçirmek, gizli regresyonları gözden kaçırma riski taşır.', en: 'Migrating the whole suite without comparing results in the pilot phase risks missing hidden regressions.' },
            ],
            tip: { tr: 'Migration\'ı tek seferlik bir "değiştirme" değil, riskleri yöneten bir proje olarak anlat — pilot, paralel çalıştırma, kademeli geçiş sırasını vurgula.', en: 'Frame the migration not as a one-shot "swap" but as a risk-managed project — emphasize the pilot, parallel-run, gradual-rollout sequence.' },
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
            analogy: { tr: 'Bu, Java\'da statik kod analizi araçlarını (SonarQube) build pipeline\'ına entegre edip kalite kapısı (quality gate) koymaya benzer — axe-core de erişilebilirlik ihlallerini otomatik tarayıp CI\'da bir kalite kapısı oluşturur.', en: 'This is like integrating static analysis tools (SonarQube) into a build pipeline with a quality gate in Java — axe-core does the same for accessibility, automatically scanning violations and forming a CI quality gate.' },
            keyPoints: [
              { tr: 'Her ihlali aynı ciddiyette ele almak yanlıştır; critical/serious mutlaka fail etmeli, minor genelde uyarı düzeyinde kalabilir.', en: 'Treating every violation with equal severity is wrong — critical/serious should fail the build, minor can often stay a warning.' },
              { tr: 'Accessibility testi UI testlerinin yanına "ek" bir adım olarak eklenir, ayrı bir test suite olarak yönetilmemelidir.', en: 'Accessibility testing is added as an extra step alongside UI tests — it shouldn\'t be managed as a separate test suite.' },
              { tr: 'WCAG seviyesini (AA genelde yeterli) projeye göre seçmek, gereksiz sıkı kurallarla ekibi boğmamak için önemlidir.', en: 'Choosing the WCAG level (AA is usually enough) based on the project matters so you don\'t overwhelm the team with overly strict rules.' },
            ],
            tip: { tr: '"axe-core kullanırım" demekle yetinme; hangi ihlal seviyesini neden fail ettiğini gerekçelendirerek pragmatik bir denge kurduğunu göster.', en: 'Don\'t stop at "I use axe-core" — justify which violation levels you fail and why, showing a pragmatic balance.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Page Object Model (POM) ile Page Factory arasındaki fark nedir? Yeni bir projede hangisini seçerdiniz, neden?', en: 'What is the difference between Page Object Model (POM) and Page Factory? Which would you choose for a new project, and why?' },
            a: { tr: 'POM bir tasarım desenidir: her sayfa için locator\'ları ve aksiyonları bir class içinde toplarsınız, element bulma kodu @Test metodlarına sızmaz. Page Factory ise Java\'ya özgü bir yardımcı katmandır (@FindBy annotation\'ları + PageFactory.initElements()) — element\'leri lazy olarak başlatır, findElement() çağrısını annotation\'a taşır. Yani Page Factory, POM\'u Java\'da daha az boilerplate ile uygulamanın bir yoludur; Python/TS\'de POM kullanılır ama Page Factory karşılığı yoktur.', en: 'POM is a design pattern: you group locators and actions for each page into a class so element-finding code never leaks into @Test methods. Page Factory is a Java-specific helper layer (@FindBy annotations + PageFactory.initElements()) that lazily initializes elements, moving the findElement() call into the annotation. So Page Factory is one way to implement POM in Java with less boilerplate; Python/TS use POM but have no Page Factory equivalent.' },
            analogy: { tr: 'Bu, Java\'da bir interface\'i (POM deseni) elle implement etmek yerine Spring\'in @Autowired ile dependency injection yapmasına benzer — Page Factory da element bulma işini annotation\'a devredip elle yazılan kodu azaltır.', en: 'This is like Spring\'s @Autowired doing dependency injection instead of manually implementing an interface (the POM pattern) — Page Factory hands element lookup to an annotation and removes hand-written boilerplate.' },
            keyPoints: [
              { tr: 'POM bir desen, Page Factory ise o deseni Java\'da uygulamanın bir aracıdır — birbirinin alternatifi değildir.', en: 'POM is a pattern; Page Factory is a tool for implementing that pattern in Java — they are not alternatives to each other.' },
              { tr: 'Page Factory\'nin lazy initialization\'ı, sayfa henüz yüklenmeden element referansı almayı güvenli hale getirir.', en: 'Page Factory\'s lazy initialization makes it safe to hold element references before the page has fully loaded.' },
              { tr: 'Python/TS ekiplerinde POM hâlâ kullanılır, sadece annotation tabanlı kısayol (Page Factory) yoktur — elementler constructor\'da veya fonksiyonla tanımlanır.', en: 'Python/TS teams still use POM, they just lack the annotation-based shortcut (Page Factory) — elements are defined in the constructor or via a function instead.' },
            ],
            tip: { tr: '"POM kullanıyorum" demekle yetinme; Page Factory\'nin POM\'un bir parçası mı yoksa POM\'a alternatif mi olduğunu net ayırt ettiğini göster.', en: 'Don\'t stop at "I use POM" — clearly distinguish whether Page Factory is part of POM or an alternative to it.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerini Docker container içinde headless modda çalıştırırken karşılaştığınız tipik sorunlar nelerdir, nasıl çözersiniz?', en: 'What typical problems do you face running Selenium tests headless inside a Docker container, and how do you solve them?' },
            a: { tr: 'En sık görülenler: 1) Eksik sistem kütüphaneleri (libnss3, libgconf-2-4) — Chrome container içinde açılmaz, base image olarak selenium/standalone-chrome kullanmak en güvenlisi. 2) /dev/shm boyutu küçük olduğu için Chrome crash eder — docker run --shm-size=2g veya --disable-dev-shm-usage flag\'i. 3) Font eksikliği — ekran görüntülerinde Türkçe karakterler kutu çıkar, fonts-liberation paketini ekleyin. 4) Viewport/headless farklılığı — bazı CSS media query\'leri headless\'ta farklı render olur, --window-size=1920,1080 sabitleyin. 5) Root kullanıcıyla çalıştırma --no-sandbox gerektirir, güvenlik açısından dikkatli kullanılmalı.', en: 'Most common: 1) Missing system libraries (libnss3, libgconf-2-4) — Chrome won\'t launch in the container; using selenium/standalone-chrome as the base image is safest. 2) Small /dev/shm size crashes Chrome — use docker run --shm-size=2g or the --disable-dev-shm-usage flag. 3) Missing fonts — screenshots show boxes instead of non-Latin characters; add the fonts-liberation package. 4) Viewport/headless rendering differences — some CSS media queries render differently headless; pin --window-size=1920,1080. 5) Running as root requires --no-sandbox, which should be used carefully from a security standpoint.' },
            code: `# Dockerfile — headless Chrome için tipik kurulum\nFROM selenium/standalone-chrome:latest\nENV SCREEN_WIDTH=1920 SCREEN_HEIGHT=1080\n# /dev/shm sorunini onlemek icin docker run komutunda:\n# docker run --shm-size=2g -v $(pwd):/tests selenium/standalone-chrome`,
            analogy: { tr: 'Bu, Java uygulamanızı minimal bir Alpine container\'a koyup eksik native kütüphaneler (glibc, fontconfig) yüzünden runtime\'da patlamasına benzer — tarayıcı da bir "uygulama"dır ve container\'ın ona ihtiyacı olan işletim sistemi parçalarını sağlaması gerekir.', en: 'This is like deploying a Java app into a minimal Alpine container and having it crash at runtime due to missing native libraries (glibc, fontconfig) — the browser is also an "application" and the container must supply the OS pieces it needs.' },
            keyPoints: [
              { tr: 'Sıfırdan image kurmak yerine resmi selenium/standalone-* image\'larından başlamak, eksik kütüphane sorunlarının çoğunu ortadan kaldırır.', en: 'Starting from the official selenium/standalone-* images instead of building from scratch eliminates most missing-library problems.' },
              { tr: '/dev/shm sorunu headless container\'larda en sık görülen ama en az bilinen crash sebebidir — log\'da "Chrome crashed" görürseniz önce bunu kontrol edin.', en: 'The /dev/shm issue is the most common yet least-known crash cause in headless containers — if logs show "Chrome crashed," check this first.' },
              { tr: 'Viewport boyutunu sabitlememek, headful makinede geçen testlerin CI\'da farklı render nedeniyle kırılmasına yol açabilir.', en: 'Not pinning the viewport size can make tests that pass on a headful machine break in CI due to different rendering.' },
            ],
            tip: { tr: 'Sadece flag listesi sayma; "/dev/shm" ve font sorununu neden headless\'a özgü olduğunu açıklayarak deneyimli olduğunu göster.', en: 'Don\'t just list flags — explain why the /dev/shm and font issues are specific to headless mode to show real experience.' },
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
          { level: 'basic', q: { en: 'Your web form test sometimes throws NoSuchElementException but the page looks fine manually. What could be the cause?' }, a: { en: 'The most common cause is a timing issue. Even if the page appears ready, DOM elements may be added later by JavaScript. Solution: use WebDriverWait + ExpectedConditions instead of Thread.sleep(). Also check for iframes — call switchTo().frame() first. Another cause: CI/CD runs slower than local, increase the timeout.' }, analogy: { en: 'This is like reading an asynchronously populated object too early in Java. The line of code may be correct, but the data has not arrived yet; in Selenium, the locator may also be correct while the element is still not accessible at that moment.' }, keyPoints: [{ en: 'First distinction: is the locator wrong, or is the element simply not ready yet?' }, { en: 'Name the readiness signal clearly: visible, clickable, or an iframe context switch.' }, { en: 'Increasing the timeout alone is not a fix; it must be paired with the right wait condition.' }], tip: { en: 'In the interview, answer in this order: classify it as a timing issue, state which wait condition you would choose, then explain how you verified the fix.' } },
          { level: 'basic', q: { en: 'Explain the performance difference between By.id, By.cssSelector, and By.xpath. When do you prefer each?' }, a: { en: 'By.id is fastest (O(1) getElementById). By.cssSelector is second — the browser’s selector engine natively optimizes CSS queries. By.xpath is slowest — it can traverse the entire DOM. Priority: 1) By.id, 2) By.cssSelector, 3) By.xpath only when necessary.' }, analogy: { en: 'This choice is like iterating over an entire Java `List` when a `Map` lookup is available. If a direct key exists, use `By.id`; if you need a more flexible filter, use `cssSelector`; if you truly need tree relationships or text, use `xpath`.' }, keyPoints: [{ en: 'Explain the preference order with reasoning, not memorization.' }, { en: 'XPath is not bad; it is simply a more powerful and more expensive tool.' }, { en: 'The most mature answer weighs performance, readability, and maintenance cost together.' }], tip: { en: 'Instead of just saying “I do not always use XPath,” strengthen the answer by giving a case where XPath is genuinely the right choice.' } },
          { level: 'basic', q: { en: 'What is the difference between sendKeys() and JavaScript value injection?' }, a: { en: 'sendKeys() triggers real keyboard events (keydown, keypress, keyup). JavaScript value injection just changes the DOM value without firing events. Use JS when: element is hidden/disabled, React controlled inputs where onChange isn\'t triggered, or native date pickers.' }, analogy: { en: 'This is like the difference between calling a setter in Java and mutating a field directly with reflection. A setter runs business rules and side effects; direct mutation changes the value but can skip the lifecycle.' }, keyPoints: [{ en: 'Prefer the path that best mimics real user behavior first.' }, { en: 'JS injection is not automatically a hack; it is a controlled fallback for difficult components.' }, { en: 'Make sure to emphasize the event-triggering difference in your answer.' }], tip: { en: '“sendKeys first, JS fallback if needed” shows both realism and pragmatism in an interview.' } },
          { level: 'basic', q: { en: 'What is the difference between driver.close() and driver.quit()?' }, a: { en: 'driver.close() closes only the active window but keeps the WebDriver session open. driver.quit() closes all windows and terminates the entire session. Always use driver.quit() in teardown; add null check: if (driver != null) driver.quit().' }, analogy: { en: 'This is like the difference between calling `close()` on a single `Closeable` and letting `try-with-resources` close every resource in scope. `close()` shuts the active window; `quit()` cleans up the entire browser session.' }, keyPoints: [{ en: 'close ends the active window; quit ends the whole session.' }, { en: 'Put resource cleanup at the center of your teardown answer.' }, { en: 'Orphan browser processes and memory leaks are strong extra details to mention.' }], tip: { en: 'Do not leave this as a definition only; explain why skipping `quit()` causes problems to pile up on a CI agent.' } },
          { level: 'basic', q: { en: 'Can you use Implicit Wait and Explicit Wait together? What problems can this cause?' }, a: { en: 'Technically yes but strongly NOT recommended. Timeouts can compound — Implicit + Explicit can add up, causing unexpected long waits. Selenium docs say "mixing waits is not recommended." Best practice: use only Explicit Wait and set Implicit Wait to zero.' }, analogy: { en: 'This is like wrapping the same Java operation with an outer timeout while also placing another blocking wait inside. On paper the waits look simple, but at runtime the total behavior becomes unpredictable.' }, keyPoints: [{ en: 'The real problem is not whether it works, but that the wait duration becomes unpredictable.' }, { en: 'Referencing Selenium’s own recommendation makes the answer stronger.' }, { en: 'Clean approach: implicit zero, explicit deliberate choice.' }], tip: { en: 'Give a numeric example: saying “10 seconds + 15 seconds can behave like a 25-second wait” makes the problem much more concrete.' } },
          { level: 'basic', q: { en: 'How do you select a dropdown option when neither ID nor value is available?' }, a: { en: 'Select class has 3 methods: selectByVisibleText(), selectByValue(), selectByIndex(). When neither ID nor value exists, use selectByVisibleText("Turkey"). For custom dropdowns (div/ul based), use Actions to click and select from list.' }, analogy: { en: 'This is like matching a Java enum not by a technical key but by the user-facing label. If there is no reliable ID, the visible text becomes the only contract left.' }, keyPoints: [{ en: 'First separate whether this is a real `<select>` or a custom component.' }, { en: 'For a native select, visible text is the most natural solution.' }, { en: 'In a custom dropdown answer, explicitly say that the `Select` class will not work.' }], tip: { en: 'Saying “I first check the DOM type” shows diagnostic thinking instead of just reciting tools.' } },
          { level: 'basic', q: { en: 'How do you check if a checkbox is checked and click it only if it\'s unchecked?' }, a: { en: 'element.isSelected() returns true/false for checkboxes, radio buttons, and select options. Pattern: if (!cb.isSelected()) { cb.click(); } — makes tests idempotent.' }, analogy: { en: 'This is like writing `if (!list.contains(x)) list.add(x)` in Java to avoid adding the same item twice — you make sure the checkbox isn\'t clicked again unnecessarily even if the test reruns.' }, keyPoints: [{ en: 'isSelected() is only meaningful for checkbox/radio/option elements, not regular buttons.' }, { en: 'Read the state first, then act — don\'t blindly click().' }, { en: 'This pattern makes the test idempotent and prevents errors when CI retries it.' }], tip: { en: 'Don\'t just name the method — explain why you check first (to avoid an unnecessary state change).' } },
          { level: 'basic', q: { en: 'How does Selenium manage multiple browser tabs?' }, a: { en: 'Each window/tab has a unique window handle. driver.getWindowHandles() returns all handles; driver.getWindowHandle() returns the current. To switch: iterate handles, skip current, call switchTo().window(handle). Selenium 4: switchTo().newWindow(WindowType.TAB) opens a programmatic new tab.' }, analogy: { en: 'Window handles are like IDs stored in a Java `Set<String>` — each window has its own identity, and switching focus means finding the right ID and calling `switchTo()`.' }, keyPoints: [{ en: 'Opening a new tab doesn\'t move the driver\'s focus automatically — you must call switchTo() manually.' }, { en: 'Save the starting handle with getWindowHandle() before looping so you don\'t lose track.' }, { en: 'Remember to switch back to the main window when done, otherwise later steps run in the wrong tab.' }], tip: { en: 'Make it concrete: give a real example like "I needed to verify an invoice PDF that opened in a new tab after login."' } },
          { level: 'basic', q: { en: 'Which interface is used for screenshots in Selenium?' }, a: { en: 'TakesScreenshot interface. Cast WebDriver: ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE). Python: driver.save_screenshot("test.png"). TypeScript: driver.takeScreenshot() returns Base64.' }, analogy: { en: 'This is like casting a Java object to an interface it implements to access an extra capability — casting WebDriver to `TakesScreenshot` unlocks the screenshot ability.' }, keyPoints: [{ en: 'Every WebDriver implementation supports this interface, but you still need to cast to it.' }, { en: 'The most valuable use is capturing a screenshot automatically when a test fails.' }, { en: 'Attaching the screenshot to a reporting tool (Allure, ExtentReports) speeds up failure analysis.' }], tip: { en: 'Don\'t just recite syntax — explain why you trigger this inside a try-catch in @AfterMethod.' } },
          { level: 'basic', q: { en: 'Give 3 situations where you need to execute JavaScript in Selenium.' }, a: { en: '1) Scroll into view — scrollIntoView(true). 2) Click hidden element — arguments[0].click(). 3) Set input value — arguments[0].value=\'2024-01-15\' for date pickers.' }, analogy: { en: 'This is like using reflection in Java to reach a private field you can\'t access normally — when Selenium\'s standard API isn\'t enough, the JavaScript executor acts as a back door.' }, keyPoints: [{ en: 'JS should be the last resort — native Selenium methods are always the first choice.' }, { en: 'Comment every JS usage with "why it was needed" to help teammates.' }, { en: 'JS-driven interaction doesn\'t mimic real user behavior — flag this in your report/PR.' }], tip: { en: 'Instead of reciting three examples, explain for each why the normal method failed first — this shows analytical thinking in the interview.' } },
          { level: 'basic', q: { en: 'How do you shorten test time by using cookies for login?' }, a: { en: 'Capture the session cookie after a real login, then inject it in subsequent tests: driver.manage().addCookie(savedCookie) + driver.navigate().refresh(). Saves 5-10 seconds per test.' }, analogy: { en: 'This is like reusing a JWT token in a header instead of re-authenticating on every request in Java — instead of running the full login flow every time, you inject a session that\'s already "ready."' }, keyPoints: [{ en: 'This doesn\'t test the login flow itself — it only speeds up post-login scenarios.' }, { en: 'Don\'t forget to still test the actual login flow through the UI at least once.' }, { en: 'Watch the cookie expiry — an expired cookie causes confusing test failures.' }], tip: { en: 'Justify the optimization by saying running the login flow on every test is unnecessary risk and wasted time.' } },
          { level: 'basic', q: { en: 'What do you do when getText() returns an empty string?' }, a: { en: 'Common causes: 1) Element is hidden — use getAttribute("textContent"). 2) Element not loaded — add Explicit Wait. 3) Shadow DOM — use JS. 4) Dynamic content — text arrives after AJAX.' }, analogy: { en: 'This is like a Java object\'s `toString()` returning empty — the issue isn\'t that the object is missing, it\'s that it hasn\'t reached the expected state yet.' }, keyPoints: [{ en: 'getText() only returns visible content — this is the most commonly forgotten rule.' }, { en: 'Diagnose before guessing — compare with getAttribute(\'textContent\') first.' }, { en: 'Don\'t forget Shadow DOM — normal getText() can\'t reach inside it.' }], tip: { en: 'Don\'t jump to "it\'s a bug" — show your systematic debugging by explaining which possibility you ruled out first.' } },
          { level: 'basic', q: { en: 'Why is Page Object Model (POM) used in Selenium?' }, a: { en: 'Without POM, locators are hardcoded everywhere. POM centralizes locators in page classes, making maintenance easy — one change fixes all tests that use that element. Tests focus on business logic, not UI details.' }, analogy: { en: 'This is like writing a Repository/DAO layer in Java instead of hardcoding the same SQL string everywhere — a change happens in one place instead of fixing every call site.' }, keyPoints: [{ en: 'POM\'s real value isn\'t "less code" — it\'s that change is managed from a single point.' }, { en: 'A test method should read like a business scenario, not expose UI details.' }, { en: 'Without POM, a growing project often reaches a point in 6 months where nobody dares to touch the locators.' }], tip: { en: 'Instead of an abstract "best practice" answer, give a concrete maintenance pain you experienced without POM.' } },
          { level: 'basic', q: { en: 'How do you run Chrome in headless mode? Why is it important in CI/CD?' }, a: { en: 'options.addArguments("--headless"). Important for CI/CD: Linux servers have no display, headless is required. Also faster and uses less resources.' }, analogy: { en: 'This is like running a Java GUI app on a server with `-Djava.awt.headless=true` — the engine still runs, but the visual rendering layer is disabled.' }, keyPoints: [{ en: 'Headless isn\'t just for speed — it\'s mandatory on Linux CI servers with no display.' }, { en: 'Headless and headful modes can behave differently (e.g. size/scroll) — verify important tests in both.' }, { en: 'The newer --headless=new flag is more reliable than the old mode — check this in legacy projects.' }], tip: { en: 'Don\'t stop at "it\'s faster" — make sure to emphasize it\'s mandatory because servers have no display.' } },
          { level: 'basic', q: { en: 'What is the difference between absolute and relative XPath?' }, a: { en: 'Absolute XPath: /html/body/div[1]/form — full path from root, breaks on any DOM change. Relative XPath: //input[@id="username"] — starts from anywhere, more flexible. Never use absolute XPath.' }, analogy: { en: 'This is like referencing a file with a relative path instead of an absolute one (`C:\\Users\\...`) in Java — when the structure changes, the absolute path always breaks while the relative one stays flexible.' }, keyPoints: [{ en: 'Never put absolute XPath in production test code — use it only for quick checks in DevTools.' }, { en: 'Anchoring relative XPath to an attribute or text is the most stable approach.' }, { en: 'Frameworks like React/Bootstrap change the DOM frequently, which makes flexibility critical.' }], tip: { en: 'Instead of just saying "I never use absolute," explain concretely why it breaks (a new div was added, the path shifted).' } },
          { level: 'intermediate', q: { en: 'Your CI/CD Selenium tests pass in the morning but fail at noon. What are possible causes?' }, a: { en: '1) Test data pollution — fresh DB morning, changed by noon. 2) Time-dependent tests. 3) Parallel conflicts. 4) Insufficient timeouts (pages slower under load). Debug: screenshot on failure, detailed logs, reproduce at same time locally.' }, analogy: { en: 'This is like a race-condition bug in Java that occasionally crashes in production but never reproduces locally — you have to accept the problem hides in conditions (timing, shared state), not in the code itself, and hunt accordingly.' }, keyPoints: [{ en: 'Your first instinct should be "what condition changed", not "the code broke".' }, { en: 'Shared test data and interaction between parallel tests is the most commonly overlooked cause.' }, { en: 'A one-off retry doesn\'t fix the problem, it just hides it — it shouldn\'t replace finding the root cause.' }], tip: { en: 'A senior-level answer doesn\'t stop at "flaky" — it explains which evidence (logs, timestamps, parallel run count) was gathered to diagnose it.' } },
          { level: 'intermediate', q: { en: 'How do you write a retry mechanism for StaleElementReferenceException?' }, a: { en: 'Re-find the element on each use and retry on exception. Common in SPA apps (React/Vue).', code: `// Java retry
public static void clickWithRetry(WebDriver driver, By locator, int retries) {
    for (int i = 0; i < retries; i++) {
        try { driver.findElement(locator).click(); return; }
        catch (StaleElementReferenceException e) {
            if (i == retries - 1) throw e;
        }
    }
}` }, analogy: { en: 'This is like another thread modifying a Collection while you iterate it in Java (ConcurrentModificationException) — the DOM gets re-rendered by React in the background, so the reference you\'re holding becomes invalid.' }, keyPoints: [{ en: 'The retry mechanism treats the symptom; the real fix is re-fetching the element right before each use.' }, { en: 'Never retry infinitely — cap the attempts and rethrow the real exception on the last try.' }, { en: 'This exception is expected in SPAs (React/Angular/Vue) — seeing it on a static page signals a different problem.' }], tip: { en: 'Before writing code, explain why the element goes stale — the interviewer is assessing understanding, not just the retry pattern.' } },
          { level: 'intermediate', q: { en: 'sendKeys() doesn\'t trigger onChange in a React/Vue input. How do you solve this?' }, a: { en: 'React controlled components may not fire onChange with sendKeys(). Solutions: 1) Use Actions API: actions.click(el).sendKeys(el, text).perform(). 2) JS dispatch input event: el.dispatchEvent(new Event("input",{bubbles:true})). 3) Send characters one by one.' }, analogy: { en: 'This is like the difference between calling a setter in Java and mutating a field directly with reflection. A setter runs business rules and side effects; direct mutation changes the value but can skip the lifecycle.' }, keyPoints: [{ en: 'Understand the real cause first: sendKeys() changes the DOM value, but React\'s own event system doesn\'t catch it.' }, { en: 'There\'s a solution hierarchy: try character-by-character sendKeys first, then Actions API, JS dispatchEvent as last resort.' }, { en: 'Setting the value via JS without dispatching the event leaves React\'s state out of sync, making the test misleading.' }], tip: { en: 'Explaining why the framework resists (controlled component, synthetic events) is far more valuable than just reciting the fix.' } },
          { level: 'intermediate', q: { en: 'How do you debug Selenium Grid tests that work locally but fail on Grid?' }, a: { en: '1) Check Grid console at localhost:4444/ui — is session created? 2) Use VNC/noVNC for live viewing. 3) Verify capabilities match. 4) Check Docker network hostname resolution. 5) Screenshots are created on Node, not local path.' }, analogy: { en: 'This is the classic Java "it works on my machine" problem — the difference usually hides in the environment (JVM version, classpath, network), not the code; with Grid you need to interrogate the environment (Docker network, Node capabilities) the same way.' }, keyPoints: [{ en: 'First confirm the session actually reaches the Grid, then check which Node it\'s routed to.' }, { en: 'Local file paths (screenshot, download) are invalid inside the Grid Node — this is a frequently missed detail.' }, { en: 'Watching live via VNC/noVNC diagnoses far faster than reading logs alone.' }], tip: { en: 'Walk through the debug process in order: Grid console, then capabilities, then network — this shows a methodical approach, not random guessing.' } },
          { level: 'intermediate', q: { en: 'How do you handle Stripe iframe in a payment page test?' }, a: { en: 'Find iframe: driver.findElement(By.cssSelector("iframe[name*=\'stripe\']")). Switch: switchTo().frame(stripeIframe). Fill card field: findElement(By.name("cardnumber")).sendKeys("4111111111111111"). Return: switchTo().defaultContent(). Repeat for expiry/CVV iframes.' }, analogy: { en: 'This is like a microservice running inside its own security sandbox that the main app can\'t reach directly in Java — an iframe creates the same isolation in the browser, and you must "enter" that boundary with `switchTo()` first.' }, keyPoints: [{ en: 'Each Stripe field (card number, expiry, cvv) can be its own iframe — you may need to switchTo() each one separately.' }, { en: 'Forgetting to return with defaultContent() means the next steps won\'t find their elements.' }, { en: 'Never use real card data — work with Stripe\'s official test cards (4242...).' }], tip: { en: 'Knowing that third-party payment widgets are isolated for security reasons is a stronger answer than just knowing the switchTo() syntax.' } },
          { level: 'intermediate', q: { en: 'What Selenium-level approaches ensure test isolation without resetting the database?' }, a: { en: '1) Each test creates its own unique user (timestamp-based email). 2) Cookie injection for login. 3) API setup + UI verification. 4) Test data factory with unique data. 5) Soft delete pattern.' }, analogy: { en: 'This is like having each Java test method generate its own unique test data (e.g. UUID-based) instead of spinning up a fresh database per test — isolation comes from the data itself, not the environment.' }, keyPoints: [{ en: 'Unique data (timestamp/UUID) is the cheapest and most common isolation method.' }, { en: 'Setting up via API and verifying only through the UI both speeds up the test and reduces fragility.' }, { en: 'Approaches like soft delete prevent parallel tests from physically deleting each other\'s data.' }], tip: { en: 'Strengthen your answer by explaining why DB resets are expensive/slow (locking under parallel tests, CI time) — that\'s the reason for the alternatives.' } },
          { level: 'intermediate', q: { en: 'How do you use pytest fixture scopes in Selenium?' }, a: { en: 'scope="function": new driver per test (full isolation, slow). scope="class": shared within class. scope="module": shared within file. scope="session": single driver for entire run (fastest, no isolation). Best: function for critical isolation, session for expensive setup.' }, analogy: { en: 'This is like Spring\'s bean scopes in Java (`prototype` vs `singleton`) — function scope creates a fresh instance every time (isolated but slow), session scope keeps one shared instance (fast but risks isolation).' }, keyPoints: [{ en: 'Scope choice is a performance/isolation trade-off — there\'s no universally "correct" option.' }, { en: 'If you use session scope, you must be extra careful about state leaking between tests.' }, { en: 'Wide scope makes sense for expensive setup (login, browser launch); narrow scope makes sense when isolation is critical.' }], tip: { en: 'Give a concrete example of when you chose which scope: "I used session scope for the login fixture, function scope for the add-to-cart test."' } },
          { level: 'intermediate', q: { en: 'How do you read all dropdown options and write to Excel in Java?' }, a: { en: 'Select select = new Select(el); List<WebElement> options = select.getOptions(); Then use Apache POI: XSSFWorkbook, createSheet, createRow, createCell with getText() and getAttribute("value") for each option.' }, analogy: { en: 'This is like iterating a Java collection (`List<WebElement>`), mapping each item to a DTO, and exporting it (Excel/CSV) — Selenium is just the data source here, the real work is a transform/export pipeline.' }, keyPoints: [{ en: 'If the dropdown is dynamic (AJAX-populated), you must wait for it to fill before reading.' }, { en: 'Writing the Excel file isn\'t Selenium\'s job — that\'s a library like Apache POI\'s responsibility. Separate the concerns.' }, { en: 'These scripts usually come from a one-off data-extraction need — they shouldn\'t be part of the regression suite.' }], tip: { en: 'Don\'t just say "I\'d use Select.getOptions()" — show you understand the business need by asking where/why the data is exported.' } },
          { level: 'intermediate', q: { en: 'How do you configure parallel test execution in TestNG with thread safety?' }, a: { en: 'testng.xml: <suite parallel="methods" thread-count="4">. Thread safety: use ThreadLocal<WebDriver>. Each thread gets its own driver instance. @BeforeMethod sets, @AfterMethod quits and removes.', code: `private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
public static WebDriver getDriver() { return driver.get(); }` }, analogy: { en: 'This is like using `ThreadLocal` in Java instead of a shared static field so each thread gets its own copy — if WebDriver is shared, tests manipulate each other\'s browser; ThreadLocal prevents that.' }, keyPoints: [{ en: 'The most common mistake in parallel testing is keeping WebDriver as a shared static field.' }, { en: 'Thread safety isn\'t just about the driver — test data needs it too; two threads shouldn\'t share the same user.' }, { en: 'Closing the thread pool without calling driver.remove() leaves stale references in memory (a leak).' }], tip: { en: 'Justify ThreadLocal not just as syntax, but by explaining why a static driver is a disaster in parallel tests.' } },
          { level: 'intermediate', q: { en: 'Your Selenium test can\'t find a Shadow DOM element. What is Shadow DOM and how do you access it?' }, a: { en: 'Shadow DOM is a hidden DOM subtree in web components. Normal findElement() can\'t access it. Selenium 4: shadowHost.getShadowRoot().findElement(By.css("input")). Older: JS executeScript("return arguments[0].shadowRoot", shadowHost).' }, analogy: { en: 'This is like not being able to reach a Java class\'s `private` inner class from outside — Shadow DOM is deliberate encapsulation too, and you need an official "door" (getShadowRoot()) to get in.' }, keyPoints: [{ en: 'Shadow DOM isn\'t a bug — it\'s a deliberate isolation design in web components.' }, { en: 'For nested shadow roots, getShadowRoot() must be called separately at each level.' }, { en: 'What used to require a JS executor before Selenium 4 is now more reliable with the native API.' }], tip: { en: 'Mentioning Shadow DOM as one of your first suspects when "element not found" appears shows real experience.' } },
          { level: 'intermediate', q: { en: 'How do you test file upload? What if the button is custom JavaScript?' }, a: { en: 'Native input[type="file"]: sendKeys("/path/to/file.jpg") — no dialog needed. Custom JS button: make input visible via JS, then sendKeys. Robot class for OS file dialog. Python: find_element(By.ID, "fileInput").send_keys("/path/file").' }, analogy: { en: 'This is like opening and reading a file stream (`FileInputStream`) directly in Java instead of wrapping it with an unnecessary UI layer (a dialog) — sending the path via sendKeys() to a native input does the same job without ever opening the browser dialog.' }, keyPoints: [{ en: 'sendKeys() works directly on input[type=file] even when it\'s hidden — visibility isn\'t required.' }, { en: 'If a custom JS button drives file selection, you need to locate the underlying native input and target that directly.' }, { en: 'Scenarios that genuinely open an OS dialog (rare) require a non-browser tool like the Robot class — this is a last resort.' }], tip: { en: 'Explaining the principle "Selenium can\'t touch windows outside the browser" justifies why you target the native input directly.' } },
          { level: 'intermediate', q: { en: 'How do you use Chrome DevTools Protocol (CDP) with Selenium 4?' }, a: { en: 'Use executeCdpCommand(). Scenarios: network throttling, geolocation override, basic auth, console log capture, request intercept.', code: `((ChromeDriver)driver).executeCdpCommand("Emulation.setGeolocationOverride",
    Map.of("latitude", 41.0, "longitude", 28.9, "accuracy", 1));` }, analogy: { en: 'This is like connecting to the JVM\'s own debug/profiling interface (JMX) in Java when the normal API isn\'t enough — CDP gives deeper access to the browser\'s internals (network, geolocation, console) than WebDriver\'s standard API.' }, keyPoints: [{ en: 'CDP is an extension for "browser-specific" scenarios where Selenium\'s official API falls short.' }, { en: 'Scenarios like network throttling aren\'t real performance testing — they only simulate user experience.' }, { en: 'CDP only works on Chromium-based browsers — it doesn\'t behave the same way in Firefox/Safari.' }], tip: { en: 'Explaining why the standard Selenium API falls short in a given scenario makes a far stronger answer than reciting the list from memory.' } },
          { level: 'intermediate', q: { en: 'What practices prevent memory leaks in long-running Selenium test suites?' }, a: { en: '1) driver.quit() in finally block after every test. 2) ThreadLocal.remove() call. 3) Reasonable implicitlyWait. 4) Limit screenshot storage. 5) Chrome flags: --disable-gpu, --no-sandbox, --disable-extensions. 6) Don\'t exceed CPU cores for parallel threads.' }, analogy: { en: 'This is like a connection pool exhausting over time if you don\'t close every `Connection` with `try-with-resources` in Java — every skipped driver.quit() leaves an orphan browser process behind, and memory fills up over time.' }, keyPoints: [{ en: 'One test skipping quit() seems trivial, but across a 1000-test suite it accumulates and can crash the CI agent.' }, { en: 'Calling quit() in a finally block guarantees cleanup even if an exception is thrown mid-test.' }, { en: 'If you don\'t also limit side artifacts like screenshots/logs, memory/disk pressure comes from those files too, not just the browser.' }], tip: { en: 'Don\'t settle for one fix — cover the trio of driver cleanup, resource limits, and parallelism control together; that shows a senior perspective.' } },
          { level: 'intermediate', q: { en: 'Is it possible to do API testing with Selenium? When does it make sense?' }, a: { en: 'Selenium is for browser automation, not API testing. But hybrid approach: use API to set up test data, then Selenium to verify UI. Or inject session token from API login into Selenium via cookies. Pure API testing: use REST Assured (Java) or requests/pytest (Python).' }, analogy: { en: 'This is like forcing the wrong tool for a job in Java (e.g. using an ORM as a raw query engine instead of plain SQL) — Selenium was built for browser automation, and API testing calls for the right tool, like REST Assured.' }, keyPoints: [{ en: 'The right approach isn\'t using Selenium for API testing — it\'s using the API to SPEED UP the Selenium test.' }, { en: 'Combining API setup with UI verification gives you both speed and realism.' }, { en: 'Not knowing this distinction signals in an interview that you don\'t understand what each tool is for.' }], tip: { en: 'Instead of a flat "no, I wouldn\'t," give a nuanced answer: "yes, but only for this limited purpose."' } },
          { level: 'intermediate', q: { en: 'How do you write code to find a table row by column value and click it?' }, a: { en: 'Iterate all rows, for each row get cells by tagName("td"), check cell text, click target cell.', code: `List<WebElement> rows = driver.findElements(By.cssSelector("table tbody tr"));
for (WebElement row : rows) {
    List<WebElement> cells = row.findElements(By.tagName("td"));
    if (cells.size() > 1 && cells.get(1).getText().equals("Active")) {
        cells.get(0).click(); break;
    }
}` }, analogy: { en: 'This is like using stream().filter() over a Java `List<Row>` to find the row matching a condition — here the filter condition is a text comparison in Selenium, but the logic is identical.' }, keyPoints: [{ en: 'Make sure the table is fully loaded before pulling rows with findElements, especially if pagination exists.' }, { en: 'Hardcoding the column index is fragile — find the index dynamically from the header text when possible.' }, { en: 'Breaking out of the loop once a match is found avoids unnecessary iteration.' }], tip: { en: 'Asking "is the table dynamic, is it paginated" before writing code shows real-world experience.' } },
          { level: 'intermediate', q: { en: 'How do you generate test reports with Allure? What should they include?' }, a: { en: '@Attachment for screenshots, @Step for step logging, @Severity for priority. Report must include: test name, pass/fail, duration, error message + stack trace, screenshot on failure, test parameters.' }, analogy: { en: 'This is like using a structured logging framework (SLF4J/Logback) in Java instead of plain `System.out.println()` — instead of raw console output, you produce a searchable, filterable, shareable report.' }, keyPoints: [{ en: 'A report\'s value isn\'t just showing pass/fail — it\'s enabling fast diagnosis with screenshot + stack trace.' }, { en: 'Step logging like @Step lets you see exactly where it failed without opening the test code.' }, { en: 'CI integration (Jenkins Allure plugin) makes the report accessible to everyone, not just local.' }], tip: { en: 'Instead of saying "the report looks nice," explain how much debugging time the report actually saved you.' } },
          { level: 'intermediate', q: { en: 'How do you run Selenium tests on BrowserStack or Sauce Labs?' }, a: { en: 'Use RemoteWebDriver with cloud URL: new RemoteWebDriver(new URL("https://user:key@hub-cloud.browserstack.com/wd/hub"), options). Add capabilities: platformName, browserVersion, os. Cloud dashboards auto-provide video, screenshots, logs.' }, analogy: { en: 'This is like sending code to a cloud build server (a Jenkins agent) instead of running it locally in Java — RemoteWebDriver uses capabilities to say "I want this browser/OS" and routes the request to a remote machine.' }, keyPoints: [{ en: 'The real value of cloud platforms is real device/browser variety — setting this up locally isn\'t practical.' }, { en: 'Hardcoding credentials in code is a serious security mistake — use environment variables.' }, { en: 'If you need to test a local environment (localhost), you need a tunnel (BrowserStack Local).' }], tip: { en: 'When asked why you\'d use cloud, don\'t just say "variety" — show you\'ve also weighed the cost/maintenance trade-off.' } },
          { level: 'intermediate', q: { en: 'How do you handle errors with async/await in TypeScript Selenium?' }, a: { en: 'Wrap in try-catch, always call driver.quit() in finally. Use driver.wait(until.elementLocated(), ms) for timeouts. Capture screenshot on error.', code: `try {
  const el = await driver.wait(until.elementLocated(By.id('btn')), 10000);
  await el.click();
} catch (e: any) {
  const img = await driver.takeScreenshot();
  fs.writeFileSync('error.png', img, 'base64');
  throw e;
} finally {
  await driver.quit();
}` }, analogy: { en: 'This is like wrapping a method that throws a checked exception in try-catch in Java — since every Selenium call in TypeScript is a Promise, failing to catch it silently crashes the app with an "unhandled rejection".' }, keyPoints: [{ en: 'Calling driver.quit() in a finally block gives the same guarantee as try-finally in Java.' }, { en: 'Attaching extra context (screenshot, which step) when rethrowing speeds up debugging enormously.' }, { en: 'Forgetting await is the most common mistake — execution moves on before the Promise resolves, and the test misleadingly "passes".' }], tip: { en: 'Don\'t stop at try-catch — deepen your answer by anticipating "what happens if await is forgotten".' } },
          { level: 'advanced', q: { en: 'You have 1000 E2E tests and they\'re very slow. How do you optimize?' }, a: { en: '1) Parallel execution: TestNG thread-count=8, pytest-xdist -n8. 2) Cookie login bypass. 3) API setup + UI verify only. 4) Headless mode (~30% faster). 5) Tag-based selective run: smoke on PR, regression nightly. 6) Selenium Grid with 8+ nodes.' }, analogy: { en: 'This is like re-layering a monolithic integration test suite to match a microservice architecture in Java — the real problem isn\'t "making tests faster", it\'s "having accumulated too many tests at the wrong layer".' }, keyPoints: [{ en: 'The first question shouldn\'t be speed — it should be "how many of these 1000 tests truly need to be E2E".' }, { en: 'Tactics like parallelism and cookie-login matter, but they don\'t fix the architectural issue — they only ease the symptom.' }, { en: 'Splitting smoke/regression gives fast feedback without running all 1000 tests on every PR.' }], tip: { en: 'A senior answer diagnoses the architecture first (why the pyramid is inverted), then lists tactical optimizations — don\'t reverse that order.' } },
          { level: 'advanced', q: { en: 'How do you perform visual regression testing with Selenium?' }, a: { en: 'Tools: Applitools Eyes (AI-based), AShot + ImageDiff (open source), percy.io. Strategy: baseline screenshot per element, compare on each run, mask dynamic content (dates, counters), 1-2% pixel tolerance threshold.', code: `Screenshot shot = new AShot().takeScreenshot(driver);
BufferedImage baseline = ImageIO.read(new File("baseline.png"));
ImageDiff diff = new ImageDiffer().makeDiff(baseline, shot.getImage());
Assert.assertFalse(diff.hasDiff(), "Visual regression!");` }, analogy: { en: 'This is like comparing objects field-by-field with `assertEquals` instead of relying on `equals()` in Java — here you\'re comparing pixels instead of code, but the principle is the same: you need an equality definition that tolerates small, acceptable differences.' }, keyPoints: [{ en: 'The biggest risk is false positives — if dynamic content (date, counters) isn\'t masked, every run fails and the team starts ignoring the report.' }, { en: 'Element-level screenshots are less fragile than full-page ones because they aren\'t affected by unrelated page changes.' }, { en: 'Too low a threshold fails on every font-rendering difference; too high a threshold misses real regressions.' }], tip: { en: 'Don\'t just name tools (Applitools/AShot) — explaining how you manage false positives proves real hands-on experience.' } },
          { level: 'advanced', q: { en: 'What architecture do you set up for Selenium in Kubernetes?' }, a: { en: 'Selenium Grid 4 + Helm chart. Hub as deployment, Chrome/Firefox nodes as separate deployments. HorizontalPodAutoscaler for auto-scaling. Kubernetes Job for test suite runs. PersistentVolume for reports. Ingress to expose Grid console.' }, analogy: { en: 'This is like running a Java app with an architecture that auto-scales on demand (Kubernetes Deployment + HPA) instead of a fixed server count — you design Selenium Grid the same elastic way, growing with demand instead of staying fixed.' }, keyPoints: [{ en: 'Keeping Hub and nodes as separate deployments lets you scale nodes independently based on demand.' }, { en: 'Without a Persistent Volume, all screenshots/reports vanish when a pod restarts — a commonly missed design flaw.' }, { en: 'For cost control, you need an upper limit (max replicas) instead of scaling nodes without bound.' }], tip: { en: 'Reciting the Helm command isn\'t enough — answer "why K8s, why not a static Grid" from a cost/elasticity perspective.' } },
          { level: 'advanced', q: { en: 'Is it safe to run Selenium tests in production? What precautions?' }, a: { en: 'Only safe for read-only smoke tests. Precautions: 1) No write/delete operations. 2) Dedicated test account. 3) Rate limiting. 4) Prefer managed solutions: Datadog Synthetics, AWS CloudWatch Synthetics. 5) Never touch production DB without DBA approval.' }, analogy: { en: 'This is like querying a production database only through a read-replica, never writing, in Java — running Selenium in production demands the same discipline: observation only, never mutation.' }, keyPoints: [{ en: 'Any step with write/delete risk should never run automatically in production — this rule has no exceptions.' }, { en: 'Managed synthetic monitoring tools (Datadog, CloudWatch Synthetics) are a more mature choice that reduces this risk to zero.' }, { en: 'Production testing isn\'t a shrunk-down regression suite — it\'s a completely separate, minimal health-check set.' }], tip: { en: 'Give a nuanced answer — "yes, but under very limited conditions" — avoid extreme answers like "never" or "always".' } },
          { level: 'advanced', q: { en: 'What features are difficult to test with Selenium and what alternatives do you use?' }, a: { en: '1) WebSocket: use CDP or separate WS client. 2) CAPTCHA: bypass in test env or use reCAPTCHA test key. 3) File download: set download dir via ChromeOptions. 4) Email: use Mailhog/Mailtrap. 5) 2FA: bypass or generate TOTP. 6) Performance: use JMeter/k6 instead.' }, analogy: { en: 'This is like trying to solve every problem with a single framework (say, JPA alone) in Java — some problems sit outside that tool\'s design boundary; the right move isn\'t forcing it, it\'s picking the right tool.' }, keyPoints: [{ en: 'For every "hard" scenario, asking "is this really Selenium\'s job" first prevents unnecessary complexity.' }, { en: 'WebSocket, performance, CAPTCHA are separate specialties — forcing them into Selenium produces brittle tests.' }, { en: 'Setting up bypass mechanisms in test environments (test keys, fake SMTP) increases testability without compromising production security.' }], tip: { en: 'Instead of reciting the list, give an example of when you stopped forcing Selenium and picked the right tool instead.' } },
          { level: 'advanced', q: { en: 'How do you organize test data management without using production data?' }, a: { en: '1) Faker library for realistic fake data. 2) Builder pattern for test objects. 3) DB seeding before suite. 4) Timestamp-based unique data per test. 5) Cleanup after tests. 6) Environment-specific config files.', code: `Faker faker = new Faker(new Locale("en"));
String email = faker.internet().emailAddress();` }, analogy: { en: 'This is like using environment-specific profiles (`application-test.yml`) instead of production config in Java — you build a data layer that\'s realistic but isolated, never touching production data.' }, keyPoints: [{ en: 'Tools like Faker generate data that\'s "realistic but fake", not random — locale awareness (TR names/addresses) matters.' }, { en: 'The builder pattern keeps test data readable and adjustable — you don\'t repeat the same long setup code in every test.' }, { en: 'Skipping cleanup lets the test database bloat over time, and tests start interfering with each other.' }], tip: { en: 'Don\'t stop at "I use Faker" — describe the full data lifecycle (creation → use → cleanup) as one coherent story.' } },
          { level: 'advanced', q: { en: 'Explain the technical differences between W3C WebDriver Protocol and JSON Wire Protocol.' }, a: { en: 'JSON Wire Protocol: Selenium\'s own HTTP API, non-standard, inconsistent browser behavior. W3C WebDriver: IETF standard, all drivers must behave identically. Practical impact: Selenium 4 uses W3C — Desired Capabilities removed, use Options classes. Actions API rewritten. Relative locators only in W3C.' }, analogy: { en: 'This is like JDBC drivers behaving differently per database before standardization, then converging on a common spec (the JDBC API) in Java — the W3C standard forces every browser driver to honor the same contract the same way.' }, keyPoints: [{ en: 'This difference isn\'t academic — old Desired Capabilities code may not work in Selenium 4.' }, { en: 'Thanks to the standard, different browser drivers now behave consistently, making cross-browser tests more reliable.' }, { en: 'New features like relative locators are a direct result of this standardization.' }], tip: { en: 'Instead of reciting protocol history, describe a practical impact: "this is why upgrading the old project to Selenium 4 broke these things."' } },
          { level: 'advanced', q: { en: 'What systematic approach brings flaky test rate below 5%?' }, a: { en: '1) Track flaky tests: log pass rate per CI run, <80% = flaky. 2) Root cause categorization: timing, data, selector, environment. 3) Remove all Thread.sleep(). 4) Fix brittle selectors (ID > CSS > XPath). 5) Test isolation: unique data per test. 6) @Retry annotation for auto-retry. 7) Docker for deterministic environment.' }, analogy: { en: 'This is like setting up an error-tracking/triage system (Sentry, category-based) in Java instead of randomly patching production bugs — instead of fixing flaky tests one by one by guessing, you track them systematically and fix by root-cause category.' }, keyPoints: [{ en: 'You can\'t improve what you don\'t measure — tracking which tests flake and how often is the first step.' }, { en: 'A retry mechanism is a safety net — it should never replace root-cause analysis.' }, { en: 'Quarantining flaky tests from blocking the PR pipeline prevents the team from losing trust in the suite.' }], tip: { en: 'When given a concrete target like 5%, explaining how you\'d measure it (a dashboard, pass-rate metric) makes the answer credible.' } },
          { level: 'advanced', q: { en: 'Design Selenium test architecture from scratch for a large e-commerce project.' }, a: { en: 'Decisions: 1) Java + TestNG + Maven. 2) POM + Page Factory. 3) TestNG XML with smoke/regression groups. 4) Allure Reports + Slack. 5) ThreadLocal WebDriver DriverFactory. 6) Properties + env variable config. 7) Jenkins CI: smoke on PR, regression nightly. 8) Grid 4 + Docker, 10 parallel nodes. 9) Faker + REST API setup. 10) Flaky test dashboard.' }, analogy: { en: 'This is exactly like making architecture decisions from scratch for a new microservice project in Java (framework, layering, CI/CD, monitoring) — test automation is a software project in its own right and deserves the same architectural discipline.' }, keyPoints: [{ en: 'The first decision isn\'t technology — it\'s the team\'s existing skill set; forcing Python on a Java-skilled team is the wrong start.' }, { en: 'Leaving reporting and monitoring for last is a common mistake — a flaky test dashboard should be planned from day one.' }, { en: 'Parallel infrastructure (Grid/Docker) is a scalability decision — changing it later is costly.' }], tip: { en: 'Instead of just listing decisions, explaining the order you made them in (team first, then pattern, then infrastructure) shows architectural maturity.' } },
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
      replicas: 4` }, analogy: { en: 'This is like horizontally scaling a Java microservice by running multiple replicas behind a load balancer instead of one instance — the Hub behaves like a load balancer, and Nodes are the scaling workers.' }, keyPoints: [{ en: 'Forgetting the shm_size setting is a common Docker mistake that causes Chrome to crash.' }, { en: 'Scaling node count with --scale is easy, but the real bottleneck is usually the host machine\'s CPU/RAM.' }, { en: 'Mismatched event bus settings (host/port) between Hub and Node silently prevent sessions from being created.' }], tip: { en: 'Instead of reciting the docker-compose file, describing a real bottleneck you hit while scaling (RAM, network) proves hands-on experience.' } },
          { level: 'advanced', q: { en: 'How do you apply network throttling and performance metrics with Selenium?' }, a: { en: 'Use CDP for network throttling: emulateNetworkConditions. Navigation Timing API via JS for page load metrics. Synthetic monitoring: measure critical page load times, assert against SLAs.', code: `chrome.executeCdpCommand("Network.emulateNetworkConditions", Map.of(
    "offline", false, "latency", 100,
    "downloadThroughput", 750*1024/8,
    "uploadThroughput", 250*1024/8
));` }, analogy: { en: 'This is like using a profiling tool (JProfiler) instead of a load-testing tool (JMeter) in Java — profiling tells you about a single flow but doesn\'t measure system behavior under load; Selenium carries the same limitation.' }, keyPoints: [{ en: 'Selenium measures a single user\'s experience; JMeter/k6 simulates hundreds of concurrent users — they answer different questions.' }, { en: 'Network throttling isn\'t real performance data — it\'s a UX simulation; don\'t conflate the two.' }, { en: 'Metrics like the Navigation Timing API give one-off page-load info — they don\'t reveal systemic bottlenecks.' }], tip: { en: 'Don\'t stop at "Selenium can\'t do performance testing" — balance it by adding what limited insight it can still provide (synthetic monitoring).' } },
          { level: 'advanced', q: { en: 'What is Selenium 4\'s BiDi protocol and how will it affect Selenium\'s future?' }, a: { en: 'WebDriver BiDi is the new W3C standard enabling bidirectional WebSocket communication. Current HTTP protocol is request-response only. BiDi enables real-time event streaming: console logs, network events, DOM mutations — features Playwright already has. Chrome BiDi supported in Selenium 4.3+. Will close the gap with Playwright.' }, analogy: { en: 'This is like moving from synchronous HTTP request-response to a bidirectional, real-time WebSocket event stream in Java — BiDi moves WebDriver from an "ask-and-wait" model to a "listen for live events" model.' }, keyPoints: [{ en: 'This is Selenium\'s effort to catch up to the native event architecture Playwright already had.' }, { en: 'Real-time console/network event listening is far more efficient and timely than polling-based approaches.' }, { en: 'This feature is still maturing — it may not be supported at the same level across all browsers.' }], tip: { en: 'Don\'t just say "it\'s new" — explain technically why it brings Selenium closer to Playwright (auto-wait, event streaming).' } },
          { level: 'advanced', q: { en: 'Describe your migration plan from Selenium to Playwright.' }, a: { en: '1) Audit: count tests, browsers, languages, special Selenium features. 2) Pilot: migrate 20-30 critical tests. 3) Run both in parallel, compare results. 4) Module-by-module migration. Technical conversions: By.id("x") → page.locator("#x"), remove all WebDriverWait (auto-wait), switchTo().frame() → frameLocator().' }, analogy: { en: 'This is like a gradual migration from an old framework to a new one (say, Struts to Spring) in Java — a big-bang rewrite is risky and costly; you build confidence module by module while running both in parallel.' }, keyPoints: [{ en: 'The first step isn\'t writing code — it\'s inventorying the existing suite: how many tests, which special Selenium dependencies exist.' }, { en: 'WebDriverWait disappearing entirely (Playwright\'s auto-wait) is both a gain and a mindset shift for the team.' }, { en: 'Migrating the whole suite without comparing results in the pilot phase risks missing hidden regressions.' }], tip: { en: 'Frame the migration not as a one-shot "swap" but as a risk-managed project — emphasize the pilot, parallel-run, gradual-rollout sequence.' } },
          { level: 'advanced', q: { en: 'How do you integrate accessibility testing into Selenium tests?' }, a: { en: 'Use axe-core: axe-selenium-java (Java), axe-selenium-python (Python). AxeBuilder analyzes page, returns WCAG violations. In CI: fail on critical/serious violations. Filter by WCAG 2.1 AA level.', code: `Results results = new AxeBuilder().analyze(driver);
List<Rule> violations = results.getViolations();
Assert.assertEquals(violations.size(), 0, "Accessibility violations found!");` }, analogy: { en: 'This is like integrating static analysis tools (SonarQube) into a build pipeline with a quality gate in Java — axe-core does the same for accessibility, automatically scanning violations and forming a CI quality gate.' }, keyPoints: [{ en: 'Treating every violation with equal severity is wrong — critical/serious should fail the build, minor can often stay a warning.' }, { en: 'Accessibility testing is added as an extra step alongside UI tests — it shouldn\'t be managed as a separate test suite.' }, { en: 'Choosing the WCAG level (AA is usually enough) based on the project matters so you don\'t overwhelm the team with overly strict rules.' }], tip: { en: 'Don\'t stop at "I use axe-core" — justify which violation levels you fail and why, showing a pragmatic balance.' } },
          { level: 'intermediate', q: { en: 'What is the difference between Page Object Model (POM) and Page Factory? Which would you choose for a new project?' }, a: { en: 'POM is a design pattern: you group locators and actions for each page into a class so element-finding code never leaks into @Test methods. Page Factory is a Java-specific helper layer (@FindBy annotations + PageFactory.initElements()) that lazily initializes elements. So Page Factory is one way to implement POM in Java with less boilerplate; Python/TS use POM but have no Page Factory equivalent — elements are just defined in the constructor.' }, analogy: { en: 'This is like Spring\'s @Autowired doing dependency injection instead of manually implementing an interface (the POM pattern) — Page Factory hands element lookup to an annotation and removes hand-written boilerplate.' }, keyPoints: [{ en: 'POM is a pattern; Page Factory is a tool for implementing it in Java — they are not alternatives to each other.' }, { en: 'Page Factory\'s lazy initialization makes it safe to hold element references before the page has fully loaded.' }, { en: 'Python/TS teams still use POM, they just lack the annotation-based shortcut.' }], tip: { en: 'Don\'t stop at "I use POM" — clearly state whether Page Factory is part of POM or an alternative to it.' } },
          { level: 'intermediate', q: { en: 'How do you set up automatic retry for flaky Selenium tests, and when does this approach mask a real bug?' }, a: { en: 'In TestNG, implement IRetryAnalyzer and attach it via @Test(retryAnalyzer=...) or a listener that applies it to every test. Limit retries to 1-2 — more than that just hides instability. The danger: if a test fails due to a genuine race condition or a real regression, retry can make it pass on attempt 2 and the bug ships unnoticed. Always log retry counts and review tests that retry often — frequent retries are a signal to fix the root cause, not the retry policy.' }, analogy: { en: 'This is like a Java HTTP client silently retrying a failed request — convenient for transient network blips, but if the server is actually returning a 500 due to a bug, blind retrying just delays discovering the real problem.' }, keyPoints: [{ en: 'A retry policy is a safety net for flakiness, not a substitute for fixing unstable locators or timing issues.' }, { en: 'Tracking which tests retry frequently turns the mechanism into a flaky-test detector instead of a way to hide them.' }, { en: 'Retrying more than 1-2 times rarely helps — if it still fails after 2 tries, it is very likely a real bug.' }], tip: { en: 'Don\'t present retry as a fix — present it as a mitigation paired with a process for investigating tests that retry often.' } },
          { level: 'advanced', q: { en: 'What typical problems do you face running Selenium tests headless inside a Docker container, and how do you solve them?' }, a: { en: 'Most common: 1) Missing system libraries (libnss3, libgconf-2-4) — Chrome won\'t launch; using the official selenium/standalone-chrome image as the base is safest. 2) Small /dev/shm size crashes Chrome — use docker run --shm-size=2g or --disable-dev-shm-usage. 3) Missing fonts — screenshots show boxes instead of non-Latin characters; add fonts-liberation. 4) Headless rendering differs from headful for some CSS media queries — pin --window-size=1920,1080. 5) Running as root requires --no-sandbox, which needs careful security review.', code: `# Dockerfile snippet for headless Chrome\nFROM selenium/standalone-chrome:latest\nENV SCREEN_WIDTH=1920 SCREEN_HEIGHT=1080\n# docker run --shm-size=2g -v $(pwd):/tests selenium/standalone-chrome` }, analogy: { en: 'This is like deploying a Java app into a minimal Alpine container and having it crash at runtime due to missing native libraries (glibc, fontconfig) — the browser is also an "application" and the container must supply the OS pieces it needs.' }, keyPoints: [{ en: 'Starting from the official selenium/standalone-* images instead of building from scratch eliminates most missing-library problems.' }, { en: 'The /dev/shm issue is the most common yet least-known crash cause in headless containers.' }, { en: 'Not pinning the viewport size can make tests that pass on a headful machine break in CI due to different rendering.' }], tip: { en: 'Don\'t just list flags — explain why /dev/shm and fonts are headless-specific issues to show real experience.' } },
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
      intro: 'Selenium\'u sıfırdan öğren: kurulum, locators, aksiyonlar, wait stratejileri, frameler, CDP & BiDi, sanal doğrulayıcılar, Selenium IDE, Grid 4, yaygın hatalar ve 50 mülakat sorusu.',
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
      '🌐 CDP & BiDi',
      '🔐 Sanal Auth & PDF',
      '🖥️ Selenium IDE',
      '🌐 Grid 4 & Dağıtık',
      '🚨 Yaygın Hatalar',
      '💼 Mülakat Soruları',
    ],
    sections: [s0.tr, s1.tr, s2.tr, s3.tr, s4.tr, s5.tr, s6.tr, s7.tr, s8.tr, s9.tr, s10.tr, s11.tr, s12.tr, s13.tr],
  },
  en: {
    hero: {
      title: '🟢 Selenium WebDriver',
      subtitle: 'Java · Python · TypeScript — Complete Learning Guide',
      intro: 'Learn Selenium from scratch: installation, locators, actions, wait strategies, frames, CDP & BiDi, virtual authenticators, Selenium IDE, Grid 4, common errors, and 50 interview questions.',
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
      '🌐 CDP & BiDi',
      '🔐 Virtual Auth & PDF',
      '🖥️ Selenium IDE',
      '🌐 Grid 4 & Distributed',
      '🚨 Common Errors',
      '💼 Interview Questions',
    ],
    sections: [s0.en, s1.en, s2.en, s3.en, s4.en, s5.en, s6.en, s7.en, s8.en, s9.en, s10.en, s11.en, s12.en, s13.en],
  },
}

fillMissingCodeTrios(seleniumData, 'selenium')



