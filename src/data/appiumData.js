// appiumData.js — Appium 3.x Mobil Test Otomasyonu
// Her bölüm ayrı const ile tanımlanır, en altta birleştirilir.

// ─── SECTION 0: GİRİŞ & MİMARİ ──────────────────────────────────────────────
const section0 = {
  tr: {
    title: '🎯 Appium Nedir? Mimari Nasıl Çalışır?',
    blocks: [
      {
        type: 'simple-box',
        emoji: '📺',
        content: 'Appium\'u bir uzaktan kumanda sistemi gibi düşünün — ama tek bir TV için değil, her üretici kendi dilini konuşan binlerce farklı model için. Test kodunuz uzaktan kumandadır; Appium Server ise evrensel tercüman: aynı "kanalı değiştir" komutunu hem Samsung\'un UIAutomator2\'sinin, hem Apple\'ın XCUITest\'inin anlayacağı platforma özgü dile çevirir. Peki Selenium zaten web testleri için yeterliyken neden Appium\'a ayrıca ihtiyaç var? Çünkü mobil ekranda "butona tıkla" demek, HTML DOM\'unda bir element bulmakla aynı şey değildir — cihazın işletim sistemi, erişilebilirlik ağacını ve native UI hiyerarşisini bambaşka bir protokolle sunar, ve bunu HTTP üzerinden konuşturmak için köklü farklı bir köprü gerekir. Java\'daki `RemoteWebDriver extends WebDriver` interface kalıtımını biliyorsanız şunu görün: `AppiumDriver extends RemoteWebDriver` — aynı `findElement`, `click`, `sendKeys` metodları, sadece arkada UIAutomator2 ya da XCUITest var. QA açısından kritik olan: üretimde bir mobil checkout akışı sessizce bozulduğunda, bunu CI pipeline\'ında otomatik yakalamak için Appium olmadan gerçek cihaz davranışını test edemezsiniz — emülatör simüle eder, gerçek cihaz ancak Appium ile CI\'da doğrular.',
      },
      {
        type: 'text',
        content: 'Appium, iOS ve Android mobil uygulamalarını gerçek cihaz veya emülatör üzerinde otomatik test etmek için açık kaynaklı bir araçtır. 2012\'de başlatılan Appium, W3C WebDriver protokolünü temel alır. Java\'da Selenium\'u biliyorsanız, Appium\'u "mobil Selenium" olarak düşünebilirsiniz: aynı API, farklı hedef platform.',
      },
      { type: 'heading', text: 'Client-Server Mimarisi' },
      {
        type: 'visual',
        variant: 'flow',
        title: 'Appium Çalışma Akışı',
        steps: [
          { num: 1, label: 'Test Kodu', desc: 'Java / TypeScript', highlight: true },
          { num: 2, label: 'HTTP Request', desc: 'W3C WebDriver' },
          { num: 3, label: 'Appium Server', desc: 'Port 4723', highlight: true },
          { num: 4, label: 'UIAutomator2', desc: 'Android Driver' },
          { num: 5, label: 'Uygulama', desc: 'Gerçek/Emülatör', highlight: true },
        ],
      },
      {
        type: 'callout',
        color: 'blue',
        emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Java\'da RemoteWebDriver ile Selenium Grid\'e bağlandığını düşün. Appium\'da da aynı mantık var: AppiumDriver extends RemoteWebDriver. URL olarak Appium Server adresi (http://127.0.0.1:4723) verilir. Tek fark, browser yerine mobil uygulama hedeflenir.',
      },
      { type: 'heading', text: 'Appium 2 vs Appium 3 — Kritik Farklar' },
      {
        type: 'table',
        headers: ['Özellik', 'Appium 2', 'Appium 3'],
        rows: [
          ['Node.js minimum', 'Node 14+', 'Node 20.19+ (LTS zorunlu)'],
          ['Capability prefix', 'Bazıları prefix\'siz çalışırdı', '"appium:" prefix ZORUNLU'],
          ['Sessions endpoint', 'GET /sessions', 'GET /appium/sessions'],
          ['Driver yönetimi', 'Dahili (built-in)', 'Plugin tabanlı (ayrı kurulum)'],
          ['adb_shell flag', 'adb_shell', 'uiautomator2:adb_shell'],
          ['Log maskeleme', 'Yok', '--log-filters desteği'],
          ['Security default', 'Permissive', 'Strict (--allow-insecure gerekir)'],
        ],
      },
      {
        type: 'callout',
        color: 'orange',
        emoji: '⚠️',
        title: 'Breaking Change — Capability Prefix',
        content: 'Appium 2\'de "appPackage", "appActivity" gibi capability\'ler prefix\'siz çalışıyordu. Appium 3\'te bunlar artık "appium:appPackage", "appium:appActivity" şeklinde yazılmalıdır. Sadece W3C standart olanlar (platformName, deviceName) prefix almaz.',
      },
      { type: 'heading', text: 'Native, Hybrid ve Web Uygulama' },
      {
        type: 'grid',
        cols: 3,
        items: [
          { icon: '📱', label: 'Native', desc: 'Swift/Kotlin ile yazılmış. UIAutomator2/XCUITest doğrudan kontrol eder. En hızlı.' },
          { icon: '🌐', label: 'Web (WebView)', desc: 'Uygulamada gömülü web içeriği. ChromeDriver gerekir. Selenium locator\'ları çalışır.' },
          { icon: '🔀', label: 'Hybrid', desc: 'Hem native hem WebView. Context switching: NATIVE_APP ↔ WEBVIEW_xxx gerekir.' },
        ],
      },
      {
        type: 'quiz',
        question: 'Appium 3\'te "appPackage" capability\'si nasıl yazılmalıdır?',
        options: [
          { id: 'a', text: 'appPackage: "com.example.app"' },
          { id: 'b', text: '"appium:appPackage": "com.example.app"' },
          { id: 'c', text: '"package": "com.example.app"' },
          { id: 'd', text: 'appium_appPackage: "com.example.app"' },
        ],
        correct: 'b',
        explanation: 'Appium 3\'te tüm Appium-specific capability\'ler "appium:" prefix alır. platformName, deviceName gibi W3C standart olanlar prefix almaz. Bu, Appium 2\'den 3\'e geçişte en sık yapılan hatadır.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Appium 3'te \"appActivity\" capability'si nasıl tanımlanmalıdır?",
      "options": [
            {
                  "id": "a",
                  "text": "appActivity: \".MainActivity\""
            },
            {
                  "id": "b",
                  "text": "\"appium:appActivity\": \".MainActivity\""
            },
            {
                  "id": "c",
                  "text": "\"activity\": \".MainActivity\""
            },
            {
                  "id": "d",
                  "text": "appium_activity: \".MainActivity\""
            }
      ],
      "correct": "b",
      "explanation": "Appium 3 ve üzerindeki W3C standartlarına uygun şekilde, özel Appium yetenekleri (appium-specific capabilities) her zaman 'appium:' ön eki ile kullanılmalıdır. appActivity, W3C standardı olmadığından 'appium:' ön ekini alması zorunludur."
}
},
      {
        type: 'quiz',
        question: 'Appium\'un WebDriver protokolünü kullanmasının en büyük avantajı nedir?',
        options: [
          { id: 'a', text: 'Sadece Android desteklenir' },
          { id: 'b', text: 'Selenium API ile aynı, hem web hem mobil test aynı framework\'te' },
          { id: 'c', text: 'Sadece emülatörde çalışır' },
          { id: 'd', text: 'Java ile kullanılamaz' },
        ],
        correct: 'b',
        explanation: 'WebDriver (W3C) protokolü sayesinde Appium, Selenium ile aynı temel API\'ı paylaşır. Java\'da Selenium bilen biri AppiumDriver\'ı çok hızlı öğrenir. JUnit/TestNG gibi framework\'ler hem web hem mobil testlerde kullanılabilir.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Appium'un WebDriver standardını temel almasının QA otomasyon süreçlerine sağladığı temel katkı nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Mobil testleri sadece Python ile yapabilmek"
            },
            {
                  "id": "b",
                  "text": "Selenium altyapısı sayesinde kod tekrarını önleyip ortak kütüphaneler kullanabilmek"
            },
            {
                  "id": "c",
                  "text": "Cihazlarda fiziksel bir bağlantıya ihtiyaç duymamak"
            },
            {
                  "id": "d",
                  "text": "Testlerin sadece yerel makinede çalışmasını sağlamak"
            },
            {
                  "id": "e",
                  "text": ""
            }
      ],
      "correct": "b",
      "explanation": "WebDriver protokolü, Appium'un Selenium ile aynı arayüzleri paylaşmasını sağlar. Bu sayede otomasyon mühendisleri, web projelerinde kullandıkları Page Object Model (POM) yapısını ve yardımcı kütüphaneleri mobil test süreçlerine kolayca adapte edebilirler."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-setup',
        topic: 'Appium Temelleri',
        questions: [
          {
            level: 'basic',
            q: 'Appium nedir ve ne için kullanılır?',
            a: 'Appium, iOS ve Android mobil uygulamaları için açık kaynaklı test otomasyon framework\'üdür. Gerçek cihaz veya emülatör/simülatör üzerinde native, hybrid ve web uygulamaları test edebilir. W3C WebDriver protokolünü kullanır, bu nedenle Selenium API\'ı ile uyumludur ve aynı dil binding\'lerini (Java, Python, JS) destekler.',
          },
          {
            level: 'basic',
            q: 'Appium\'un client-server mimarisi nasıl çalışır?',
            a: 'Test kodu (client) → HTTP JSON isteği → Appium Server (port 4723) → Platform driver (UIAutomator2 Android, XCUITest iOS) → Gerçek uygulama. Java\'da RemoteWebDriver\'ın mobil versiyonu olarak düşünebilirsiniz. Her aksiyonu (tıklama, metin girme) HTTP üzerinden JSON komutları olarak gönderirsiniz.',
          },
          {
            level: 'basic',
            q: 'Native, Hybrid ve Web uygulama arasındaki fark nedir? Test perspektifinden nasıl ayrışır?',
            a: 'Native: Swift/Kotlin ile platform-specific yazılmış, UIAutomator2/XCUITest ile kontrol edilir. Hybrid: React Native/Ionic gibi framework, WebView içerir, context switch gerekir (driver.context("WEBVIEW_xxx")). Web: Tarayıcıda çalışan site, ChromeDriver gerekir, Selenium locator\'ları çalışır. Mülakatta context switching kavramını bilmek önemlidir.',
          },
          {
            level: 'intermediate',
            q: 'Appium 2 ve Appium 3 arasındaki en kritik farklar nelerdir?',
            a: '1) Node.js 20.19+ zorunluluğu (Appium 2\'de 14+). 2) Tüm Appium-specific capability\'lere "appium:" prefix zorunlu. 3) Sessions endpoint değişti: /sessions → /appium/sessions. 4) Feature flag prefix: adb_shell → uiautomator2:adb_shell. 5) Security varsayılanı daha strict. Bu farklar Appium 2 kodlarının doğrudan çalışmayacağını gösterir.',
          },
          {
            level: 'intermediate',
            q: 'UIAutomator2 driver nedir, neden ayrı kurulur?',
            a: 'UIAutomator2, Google\'ın Android UI test framework\'üdür. Appium bunu Android cihazlarla iletişim köprüsü olarak kullanır. Appium 3\'te driver\'lar plugin sistemiyle ayrı kurulur: "appium driver install uiautomator2". Bu mimari, Appium core\'u hafif tutar ve her driver\'ın bağımsız güncellenmesini sağlar. iOS için XCUITest driver ayrı kurulur.',
          },
        ],
      },
    ],
  },
  en: {
    title: '🎯 What is Appium? How Does the Architecture Work?',
    blocks: [
      {
        type: 'simple-box',
        emoji: '📺',
        content: 'Think of Appium as a universal translator for a world where every TV brand speaks a completely different language — your test code is the remote, but Appium Server is the interpreter that converts "press channel up" into the exact native command Samsung\'s UIAutomator2 or Apple\'s XCUITest understands. But if Selenium already handles web testing, why do we need yet another tool that literally opens a mobile app? Because tapping a button on a mobile screen is not the same as clicking an HTML element in a DOM — the OS exposes its UI through an accessibility tree with a fundamentally different structure, and bridging that to HTTP WebDriver commands requires a dedicated protocol layer. If you know Java\'s `RemoteWebDriver extends WebDriver` inheritance, see this: `AppiumDriver extends RemoteWebDriver` — the exact same `findElement`, `click`, `sendKeys` interface, with UIAutomator2 or XCUITest behind it instead of a browser driver. The critical QA truth: when a mobile checkout flow silently breaks in production, you cannot automatically catch it in a CI pipeline without Appium — emulators simulate, real devices connected via Appium verify.',
      },
      {
        type: 'text',
        content: 'Appium is an open-source tool for automating iOS and Android mobile applications on real devices or emulators. Started in 2012, Appium is based on the W3C WebDriver protocol. If you know Selenium for Java, think of Appium as "mobile Selenium": same API, different target platform.',
      },
      { type: 'heading', text: 'Client-Server Architecture' },
      {
        type: 'visual',
        variant: 'flow',
        title: 'Appium Workflow',
        steps: [
          { num: 1, label: 'Test Code', desc: 'Java / TypeScript', highlight: true },
          { num: 2, label: 'HTTP Request', desc: 'W3C WebDriver' },
          { num: 3, label: 'Appium Server', desc: 'Port 4723', highlight: true },
          { num: 4, label: 'UIAutomator2', desc: 'Android Driver' },
          { num: 5, label: 'App', desc: 'Real/Emulator', highlight: true },
        ],
      },
      {
        type: 'callout',
        color: 'blue',
        emoji: '☕',
        title: 'If You Know Java:',
        content: 'Think of connecting to Selenium Grid with RemoteWebDriver in Java. Appium works the same way: AppiumDriver extends RemoteWebDriver. Provide the Appium Server URL (http://127.0.0.1:4723). The only difference is targeting a mobile app instead of a browser.',
      },
      { type: 'heading', text: 'Appium 2 vs Appium 3 — Key Differences' },
      {
        type: 'table',
        headers: ['Feature', 'Appium 2', 'Appium 3'],
        rows: [
          ['Node.js minimum', 'Node 14+', 'Node 20.19+ (LTS required)'],
          ['Capability prefix', 'Some worked without prefix', '"appium:" prefix REQUIRED'],
          ['Sessions endpoint', 'GET /sessions', 'GET /appium/sessions'],
          ['Driver management', 'Built-in', 'Plugin-based (separate install)'],
          ['adb_shell flag', 'adb_shell', 'uiautomator2:adb_shell'],
          ['Log masking', 'None', '--log-filters support'],
          ['Security default', 'Permissive', 'Strict (--allow-insecure required)'],
        ],
      },
      {
        type: 'callout',
        color: 'orange',
        emoji: '⚠️',
        title: 'Breaking Change — Capability Prefix',
        content: 'In Appium 2, capabilities like "appPackage" and "appActivity" worked without prefix. In Appium 3, they must be written as "appium:appPackage", "appium:appActivity". Only W3C standard ones (platformName, deviceName) are prefix-free.',
      },
      { type: 'heading', text: 'Native, Hybrid and Web Apps' },
      {
        type: 'grid',
        cols: 3,
        items: [
          { icon: '📱', label: 'Native', desc: 'Written in Swift/Kotlin. UIAutomator2/XCUITest controls directly. Best performance.' },
          { icon: '🌐', label: 'Web (WebView)', desc: 'Embedded web content. Needs ChromeDriver. Selenium locators work.' },
          { icon: '🔀', label: 'Hybrid', desc: 'Both native + WebView. Context switching: NATIVE_APP ↔ WEBVIEW_xxx.' },
        ],
      },
      {
        type: 'quiz',
        question: 'How should the "appPackage" capability be written in Appium 3?',
        options: [
          { id: 'a', text: 'appPackage: "com.example.app"' },
          { id: 'b', text: '"appium:appPackage": "com.example.app"' },
          { id: 'c', text: '"package": "com.example.app"' },
          { id: 'd', text: 'appium_appPackage: "com.example.app"' },
        ],
        correct: 'b',
        explanation: 'In Appium 3, all Appium-specific capabilities must have the "appium:" prefix. W3C standard ones (platformName, deviceName) do not need a prefix. This is the most common mistake when migrating from Appium 2.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "What is the correct way to specify the \"automationName\" capability in Appium 3?",
      "options": [
            {
                  "id": "a",
                  "text": "automationName: \"UiAutomator2\""
            },
            {
                  "id": "b",
                  "text": "\"appium:automationName\": \"UiAutomator2\""
            },
            {
                  "id": "c",
                  "text": "\"name\": \"UiAutomator2\""
            },
            {
                  "id": "d",
                  "text": "appium_automationName: \"UiAutomator2\""
            }
      ],
      "correct": "b",
      "explanation": "Consistent with Appium 3 standards, any capability that is not part of the standard W3C spec must be prefixed with 'appium:'. Since 'automationName' is specific to the Appium driver, it must be declared as 'appium:automationName'."
}
},
      {
        type: 'quiz',
        question: 'What is the biggest advantage of Appium using the WebDriver protocol?',
        options: [
          { id: 'a', text: 'It runs faster' },
          { id: 'b', text: 'It supports the same language bindings as Selenium (Java, Python, JS) and existing WebDriver knowledge transfers directly' },
          { id: 'c', text: 'It only works on Android' },
          { id: 'd', text: 'It doesn\'t need a server' },
        ],
        correct: 'b',
        explanation: 'Since Appium uses W3C WebDriver protocol, existing Selenium knowledge is fully reusable. Java\'s java-client extends Selenium\'s RemoteWebDriver. WebdriverIO is the same framework used for both web and mobile testing. This is why QA engineers who know Selenium can quickly learn Appium.',
      
        retryQuestion: {
      "question": "Why is the use of the W3C WebDriver protocol considered a significant architectural benefit for Appium?",
      "options": [
            {
                  "id": "a",
                  "text": "It eliminates the need for any automation tools"
            },
            {
                  "id": "b",
                  "text": "It allows developers to use familiar Selenium-based APIs, libraries, and design patterns across mobile and web platforms"
            },
            {
                  "id": "c",
                  "text": "It makes the Appium server optional for running tests"
            },
            {
                  "id": "d",
                  "text": "It exclusively optimizes performance for native iOS applications"
            }
      ],
      "correct": "b",
      "explanation": "Because Appium leverages the standardized W3C WebDriver protocol, the automation logic is decoupled from the platform specifics. This means testers can reuse their existing proficiency in Selenium and common test automation frameworks, ensuring a consistent development experience regardless of the target platform (web or mobile)."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-locators',
        topic: 'Appium Fundamentals',
        questions: [
          {
            level: 'basic',
            q: 'What is Appium and what is it used for?',
            a: 'Appium is an open-source test automation framework for iOS and Android mobile applications. It can test native, hybrid, and web apps on real devices or emulators/simulators. Uses W3C WebDriver protocol, so it is compatible with Selenium API and supports same language bindings (Java, Python, JS).',
          },
          {
            level: 'basic',
            q: 'How does Appium\'s client-server architecture work?',
            a: 'Test code (client) → HTTP JSON request → Appium Server (port 4723) → Platform driver (UIAutomator2 for Android, XCUITest for iOS) → Real app. Think of it as the mobile version of RemoteWebDriver in Java. Every action (click, type) is sent as JSON commands over HTTP.',
          },
          {
            level: 'intermediate',
            q: 'What are the most critical differences between Appium 2 and Appium 3?',
            a: '1) Node.js 20.19+ required (Appium 2 needed 14+). 2) "appium:" prefix mandatory for all Appium-specific capabilities. 3) Sessions endpoint changed: /sessions → /appium/sessions. 4) Feature flag prefix: adb_shell → uiautomator2:adb_shell. 5) Stricter security defaults. These differences mean Appium 2 code will not run directly.',
          },
        ],
      },
    ],
  },
}

// ─── SECTION 1: KURULUM ──────────────────────────────────────────────────────
const section1 = {
  tr: {
    title: '⚙️ Adım Adım Kurulum (Appium 3.x)',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🍳',
        content: 'Appium kurulumunu bir aşçı mutfağı kurmak gibi düşünün — ve buradaki sıra gerçekten hayati, tıpkı önce gaz hattını bağlamadan ocağı çalıştırmaya çalışmak gibi: önce enerji kaynağını (Java JDK + JAVA_HOME) kurmadan Android SDK çalışmaz, Android SDK olmadan ADB komutları bulunamaz, ADB olmadan UIAutomator2 cihaza bağlanamaz, UIAutomator2 olmadan Appium Server başlatılsa bile teste başlayamazsınız. Peki Maven veya Gradle ile Java projenizi zaten yönetiyorsanız neden ayrıca Node.js kurmanız gerekiyor? Çünkü Appium Server\'ın kendisi Node.js ile yazılmıştır — Java test kodunuz sadece HTTP client, asıl sunucu Node.js prosesidir. Java\'da Maven bağımlılıklarını doğru sıraya koymanız gerektiği gibi, burada da sistem bağımlılıklarını doğru sıraya kurmak zorundasınız: JDK → Android SDK → Node.js → Appium → UIAutomator2 driver. QA açısından kritik olan: bu zincirden herhangi biri eksik veya yanlış versiyonda olursa, CI/CD pipeline\'ınız "başlatılamadı" hatasıyla sessizce çöker ve gerçek test sonuçları yerine ortam hataları görürsünüz.',
      },
      { type: 'heading', text: '1. Ön Gereksinimler — Node.js & JDK' },
      {
        type: 'code',
        language: 'bash',
        label: 'Windows — Node.js 20+ ve JDK 21 Kurulumu',
        code: `# Node.js 20 LTS (winget ile)
winget install OpenJS.NodeJS.LTS
node --version   # v20.x.x görünmeli

# JDK 21 (Microsoft OpenJDK)
winget install Microsoft.OpenJDK.21
java -version    # openjdk 21.x.x görünmeli

# JAVA_HOME environment variable
[System.Environment]::SetEnvironmentVariable(
  "JAVA_HOME",
  "C:\\Program Files\\Microsoft\\jdk-21",
  "Machine"
)`,
      },
      {
        type: 'code',
        language: 'bash',
        label: 'Mac — Homebrew ile Kurulum',
        code: `# Homebrew yoksa önce kur
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 20
brew install node@20
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc

# JDK 21 (Eclipse Temurin)
brew install --cask temurin@21
export JAVA_HOME=$(/usr/libexec/java_home -v 21)`,
      },
      {
        type: 'code',
        language: 'bash',
        label: 'Linux (Ubuntu/Debian)',
        code: `# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# JDK 21
sudo apt-get install -y openjdk-21-jdk

# Verify
node --version && java -version`,
      },
      { type: 'heading', text: '2. Android SDK — ANDROID_HOME' },
      {
        type: 'code',
        language: 'bash',
        label: 'Android Studio ile SDK Kurulumu',
        code: `# Android Studio indir: https://developer.android.com/studio
# Kurulum sonrası: SDK Manager > SDK Tools > "Android SDK Command-line Tools" seç → Uygula

# Windows — Environment Variables (PowerShell olarak çalıştır)
[System.Environment]::SetEnvironmentVariable(
  "ANDROID_HOME",
  "$env:LOCALAPPDATA\\Android\\Sdk",
  "Machine"
)
$path = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")
[System.Environment]::SetEnvironmentVariable(
  "PATH",
  "$path;$env:LOCALAPPDATA\\Android\\Sdk\\platform-tools;$env:LOCALAPPDATA\\Android\\Sdk\\emulator",
  "Machine"
)

# Mac/Linux — ~/.zshrc veya ~/.bashrc dosyasına ekle
export ANDROID_HOME=$HOME/Library/Android/sdk   # Mac
# export ANDROID_HOME=$HOME/Android/Sdk          # Linux
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

# Doğrulama
adb version   # Android Debug Bridge version 1.x.x görünmeli`,
      },
      { type: 'heading', text: '3. Appium Server Kurulumu' },
      {
        type: 'code',
        language: 'bash',
        label: 'Appium 3.x Global Kurulum',
        code: `# Global kurulum
npm install -g appium

# Versiyon kontrolü (3.x.x görünmeli)
appium --version

# UIAutomator2 driver kurulumu (Android için zorunlu)
appium driver install uiautomator2

# XCUITest driver kurulumu (iOS için — sadece Mac'te)
appium driver install xcuitest

# Kurulu driver'ları listele
appium driver list --installed

# Appium server'ı başlat
appium
# Output: Appium REST http interface listener started on http://127.0.0.1:4723`,
      },
      { type: 'heading', text: '4. Appium Doctor — Kurulum Doğrulama' },
      {
        type: 'code',
        language: 'bash',
        label: 'Appium Doctor Kurulumu ve Çalıştırma',
        code: `# Kurulum
npm install -g @appium/doctor

# Android ortamını kontrol et
appium-doctor --android

# Beklenen çıktı (✔ yeşil olmalı):
# ✔ Node.js is installed at /usr/local/bin/node
# ✔ Node.js version is 20.x.x
# ✔ ANDROID_HOME is set to /Users/user/Library/Android/sdk
# ✔ JAVA_HOME is set to /Library/Java/JavaVirtualMachines/...
# ✔ adb exists at /Users/user/Library/Android/sdk/platform-tools/adb
# ✔ android executable exists at ...
# ✔ 'UiAutomator2' driver is installed

# iOS ortamını kontrol et (sadece Mac)
appium-doctor --ios`,
      },
      { type: 'heading', text: '5. Emülatör Oluşturma ve Başlatma' },
      {
        type: 'code',
        language: 'bash',
        label: 'AVD (Android Virtual Device) Oluşturma',
        code: `# Android Studio > Device Manager > Create Device
# Alternatif: komut satırından

# Mevcut emülatörleri listele
emulator -list-avds

# Emülatörü başlat (AVD adını kullan)
emulator -avd Pixel_7_API_33 -no-snapshot-load

# Bağlı cihazları kontrol et
adb devices
# Çıktı:
# List of devices attached
# emulator-5554   device   ← bu görünmeli`,
      },
      { type: 'heading', text: '6. Java Projesi Kurulumu (Maven)' },
      {
        type: 'code',
        language: 'xml',
        label: 'pom.xml — Appium Java Client Bağımlılıkları',
        code: `<dependencies>
    <!-- Appium Java Client 9.x (Appium 3 ile uyumlu) -->
    <dependency>
        <groupId>io.appium</groupId>
        <artifactId>java-client</artifactId>
        <version>9.3.0</version>
    </dependency>

    <!-- Selenium (Appium java-client ile birlikte gelir ama explicit ekle) -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.21.0</version>
    </dependency>

    <!-- JUnit 5 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>
    </dependency>

    <!-- TestNG (alternatif) -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.10.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>`,
      },
      { type: 'heading', text: '7. TypeScript Projesi Kurulumu (WebdriverIO)' },
      {
        type: 'code',
        language: 'bash',
        label: 'WebdriverIO + Appium TypeScript Kurulumu',
        code: `# Yeni proje oluştur
mkdir appium-ts-project && cd appium-ts-project
npm init -y

# WebdriverIO CLI ile kurulum
npm install -D @wdio/cli

# Wizard çalıştır (Appium seçenekleri gelecek)
npx wdio config

# Manuel kurulum alternatifte:
npm install -D webdriverio @wdio/local-runner @wdio/mocha-framework
npm install -D @wdio/spec-reporter wdio-appium-service
npm install -D typescript ts-node @types/node

# Versiyon kontrolü
npx wdio --version`,
      },
      {
        type: 'callout',
        color: 'green',
        emoji: '✅',
        title: 'Kurulum Başarı Kontrol Listesi',
        content: 'node --version → 20.x.x | java -version → 21.x | adb devices → emülatör görünür | appium --version → 3.x.x | appium driver list --installed → uiautomator2 görünür | appium-doctor --android → tüm ✔ işaretleri yeşil',
      },
      {
        type: 'quiz',
        question: 'Android testleri için Appium driver kurma komutu hangisidir?',
        options: [
          { id: 'a', text: 'npm install appium-uiautomator2-driver' },
          { id: 'b', text: 'appium driver install uiautomator2' },
          { id: 'c', text: 'appium install android' },
          { id: 'd', text: 'appium plugin add uiautomator2' },
        ],
        correct: 'b',
        explanation: 'Appium 3\'te driver\'lar "appium driver install <isim>" komutuyla ayrı kurulur. UIAutomator2 Android için, XCUITest iOS için zorunludur. Bu plugin mimarisi, Appium 2\'deki dahili driver yapısından farklıdır.',
      
        retryQuestion: {
      "question": "iOS testleri için bir XCUITest driver kurulum komutu aşağıdakilerden hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "npm install appium-ios-driver"
            },
            {
                  "id": "b",
                  "text": "appium driver install xcuitest"
            },
            {
                  "id": "c",
                  "text": "appium add driver ios"
            },
            {
                  "id": "d",
                  "text": "appium plugin install xcuitest"
            }
      ],
      "correct": "b",
      "explanation": "Appium 2.x ve sonrası sürümlerde driver yönetimi komut satırı üzerinden yapılır. iOS platformunda otomasyon yapabilmek için Apple'ın XCUITest framework'ünü kullanan 'xcuitest' driver'ının 'appium driver install xcuitest' komutu ile yüklenmesi gerekmektedir."
}
},
      {
        type: 'quiz',
        question: 'Appium kurulumu sonrası "ANDROID_HOME is not set" hatası alıyorsunuz. Ne yapmalısınız?',
        options: [
          { id: 'a', text: 'Appium\'u yeniden kur' },
          { id: 'b', text: 'ANDROID_HOME environment variable\'ını Android SDK yoluna set et ve terminali yeniden başlat' },
          { id: 'c', text: 'Node.js\'i güncelle' },
          { id: 'd', text: 'Android Studio\'yu sil ve yeniden yükle' },
        ],
        correct: 'b',
        explanation: 'ANDROID_HOME, Appium\'un Android SDK\'yı nerede bulacağını söyleyen environment variable\'dır. Değer genellikle ~/Library/Android/sdk (Mac), %LOCALAPPDATA%\\Android\\Sdk (Windows) yolunu göstermeli. Değişiklik için terminali/IDE\'yi yeniden başlatmak şarttır.',
      
        retryQuestion: {
      "question": "Appium testlerini çalıştırırken \"JAVA_HOME is not set\" hatası alıyorsanız, bu sorunu çözmek için en doğru yaklaşım nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Appium Inspector'ı tekrar yükleyin"
            },
            {
                  "id": "b",
                  "text": "Sistem ortam değişkenlerine (Environment Variables) Java JDK kurulum dizinini ekleyin ve terminal oturumunu yenileyin"
            },
            {
                  "id": "c",
                  "text": "Node.js sürümünü düşürün"
            },
            {
                  "id": "d",
                  "text": "Android SDK yolunu kaldırın"
            }
      ],
      "correct": "b",
      "explanation": "Appium ve Android SDK bileşenleri, Java derleyicisine ihtiyaç duyarlar. JAVA_HOME değişkeni, işletim sistemine Java'nın hangi dizinde kurulu olduğunu bildirir. Bu tanımlama yapılmadığında, Appium gerekli Java bağımlılıklarını yürütemez ve hata verir. Değişikliğin geçerli olması için ilgili kabuk (shell) veya IDE'nin yeniden başlatılması gereklidir."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-gestures',
        topic: 'Appium Kurulum',
        questions: [
          {
            level: 'basic',
            q: 'Appium kurulumu için hangi ön gereksinimler zorunludur?',
            a: '1) Node.js 20.19+ (Appium 3 için zorunlu, Appium bir Node.js uygulamasıdır). 2) JDK 11+ (Java client için, UIAutomator2 için). 3) Android SDK (ANDROID_HOME doğru set edilmeli). 4) adb (Android Debug Bridge) PATH\'de olmalı. 5) AVD veya gerçek cihaz. iOS için ek olarak: Xcode, xcode-select --install gerekir.',
          },
          {
            level: 'basic',
            q: 'Appium Doctor ne işe yarar?',
            a: 'Appium Doctor (@appium/doctor), kurulumunuzun doğru yapılandırılıp yapılandırılmadığını kontrol eden bir CLI aracıdır. "appium-doctor --android" çalıştırıldığında Node.js, JAVA_HOME, ANDROID_HOME, adb, emulator yolları, driver kurulumu gibi her şeyi kontrol eder ve kırmızı/yeşil işaretlerle rapor verir. Sorun gidermede ilk başvurulacak araçtır.',
          },
          {
            level: 'intermediate',
            q: 'Appium 3\'te UIAutomator2 driver neden ayrı kurulur? Bu mimarinin avantajı nedir?',
            a: 'Appium 3 plugin tabanlı mimari kullanır. Her platform driver\'ı (UIAutomator2, XCUITest, Espresso) bağımsız bir npm paketi olarak yayınlanır. Avantajları: 1) Appium core\'u hafif kalır. 2) Her driver bağımsız versiyonlanır ve güncellenir. 3) Kullanmayacağınız driver\'ları kurmazsınız. 4) Özel driver yazıp yayınlayabilirsiniz. Dezavantaj: Kurulum adımı fazlalaştı.',
          },
        ],
      },
    ],
  },
  en: {
    title: '⚙️ Step-by-Step Installation (Appium 3.x)',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🍳',
        content: 'Think of Appium setup like equipping a professional kitchen — the order is life-or-death, just like you cannot ignite a stove before the gas line is connected: without JDK + JAVA_HOME, Android SDK tools cannot run; without Android SDK, ADB cannot find devices; without ADB, UIAutomator2 cannot bridge to the device; without UIAutomator2, even a running Appium Server cannot start a session. But if you already manage a Java project with Maven or Gradle, why do you need to install Node.js separately? Because Appium Server itself is written in Node.js — your Java test code is only the HTTP client, the actual server is a Node.js process. Just as you must order Maven dependencies correctly, here you must install system dependencies in sequence: JDK → Android SDK → Node.js → Appium → UIAutomator2 driver. The critical QA truth: if any link in this chain is missing or on the wrong version, your CI/CD pipeline fails silently with an "environment not ready" error — you get no test results, just setup noise that masks real bugs.',
      },
      { type: 'heading', text: '1. Prerequisites — Node.js & JDK' },
      {
        type: 'code',
        language: 'bash',
        label: 'Windows — Node.js 20+ and JDK 21',
        code: `# Node.js 20 LTS (via winget)
winget install OpenJS.NodeJS.LTS
node --version   # should show v20.x.x

# JDK 21 (Microsoft OpenJDK)
winget install Microsoft.OpenJDK.21
java -version    # should show openjdk 21.x.x

# JAVA_HOME environment variable
[System.Environment]::SetEnvironmentVariable(
  "JAVA_HOME",
  "C:\\Program Files\\Microsoft\\jdk-21",
  "Machine"
)`,
      },
      {
        type: 'code',
        language: 'bash',
        label: 'Mac — Homebrew Installation',
        code: `# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 20
brew install node@20
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc

# JDK 21 (Eclipse Temurin)
brew install --cask temurin@21
export JAVA_HOME=$(/usr/libexec/java_home -v 21)`,
      },
      {
        type: 'code',
        language: 'bash',
        label: 'Linux (Ubuntu/Debian)',
        code: `# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# JDK 21
sudo apt-get install -y openjdk-21-jdk

# Verify
node --version && java -version`,
      },
      { type: 'heading', text: '2. Android SDK — ANDROID_HOME' },
      {
        type: 'code',
        language: 'bash',
        label: 'Android SDK Setup & Environment Variables',
        code: `# Install Android Studio from https://developer.android.com/studio
# After install: SDK Manager > SDK Tools > "Android SDK Command-line Tools" → Apply

# Windows — Environment Variables (run PowerShell as Admin)
[System.Environment]::SetEnvironmentVariable(
  "ANDROID_HOME",
  "$env:LOCALAPPDATA\\Android\\Sdk",
  "Machine"
)
$path = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")
[System.Environment]::SetEnvironmentVariable(
  "PATH",
  "$path;$env:LOCALAPPDATA\\Android\\Sdk\\platform-tools;$env:LOCALAPPDATA\\Android\\Sdk\\emulator",
  "Machine"
)

# Mac/Linux — add to ~/.zshrc or ~/.bashrc
export ANDROID_HOME=$HOME/Library/Android/sdk   # Mac
# export ANDROID_HOME=$HOME/Android/Sdk          # Linux
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

# Verify
adb version   # Android Debug Bridge version 1.x.x`,
      },
      { type: 'heading', text: '3. Appium Server Installation' },
      {
        type: 'code',
        language: 'bash',
        label: 'Install Appium 3.x and UIAutomator2 Driver',
        code: `# Global install
npm install -g appium
appium --version   # should show 3.x.x

# Install UIAutomator2 driver (required for Android)
appium driver install uiautomator2

# Install XCUITest driver (required for iOS — Mac only)
appium driver install xcuitest

# List installed drivers
appium driver list --installed

# Start Appium server
appium
# Output: Appium REST http interface listener started on http://127.0.0.1:4723`,
      },
      { type: 'heading', text: '4. Appium Doctor — Verify Setup' },
      {
        type: 'code',
        language: 'bash',
        label: 'Appium Doctor Installation and Usage',
        code: `npm install -g @appium/doctor
appium-doctor --android

# Expected output (all ✔ green):
# ✔ Node.js is installed at /usr/local/bin/node
# ✔ Node.js version is 20.x.x
# ✔ ANDROID_HOME is set to /Users/user/Library/Android/sdk
# ✔ JAVA_HOME is set to /Library/Java/JavaVirtualMachines/...
# ✔ adb exists at .../platform-tools/adb
# ✔ android executable exists at ...
# ✔ 'UiAutomator2' driver is installed

# iOS check (Mac only)
appium-doctor --ios`,
      },
      { type: 'heading', text: '5. Create and Start Emulator' },
      {
        type: 'code',
        language: 'bash',
        label: 'AVD (Android Virtual Device) Setup',
        code: `# Create emulator via Android Studio > Device Manager > Create Device
# Alternatively via command line:

# List existing emulators
emulator -list-avds

# Start emulator (use your AVD name)
emulator -avd Pixel_7_API_33 -no-snapshot-load

# Check connected devices
adb devices
# Output:
# List of devices attached
# emulator-5554   device   ← this should appear`,
      },
      { type: 'heading', text: '6. Java Project Setup (Maven)' },
      {
        type: 'code',
        language: 'xml',
        label: 'pom.xml — Appium Java Client Dependencies',
        code: `<dependencies>
    <!-- Appium Java Client 9.x (compatible with Appium 3) -->
    <dependency>
        <groupId>io.appium</groupId>
        <artifactId>java-client</artifactId>
        <version>9.3.0</version>
    </dependency>

    <!-- Selenium (comes with java-client but add explicitly) -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.21.0</version>
    </dependency>

    <!-- JUnit 5 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>
    </dependency>

    <!-- TestNG (alternative) -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.10.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>`,
      },
      { type: 'heading', text: '7. TypeScript Project Setup (WebdriverIO)' },
      {
        type: 'code',
        language: 'bash',
        label: 'WebdriverIO + Appium TypeScript Setup',
        code: `# Create new project
mkdir appium-ts-project && cd appium-ts-project
npm init -y

# WebdriverIO CLI (recommended)
npm install -D @wdio/cli
npx wdio config   # Wizard — select Appium options

# Manual installation alternative:
npm install -D webdriverio @wdio/local-runner @wdio/mocha-framework
npm install -D @wdio/spec-reporter wdio-appium-service
npm install -D typescript ts-node @types/node

# Verify
npx wdio --version`,
      },
      {
        type: 'callout',
        color: 'green',
        emoji: '✅',
        title: 'Setup Success Checklist',
        content: 'node --version → 20.x.x | java -version → 21.x | adb devices → emulator visible | appium --version → 3.x.x | appium driver list --installed → uiautomator2 visible | appium-doctor --android → all ✔ green marks',
      },
      {
        type: 'quiz',
        question: 'Which command installs the Android driver for Appium?',
        options: [
          { id: 'a', text: 'npm install appium-uiautomator2-driver' },
          { id: 'b', text: 'appium driver install uiautomator2' },
          { id: 'c', text: 'appium install android' },
          { id: 'd', text: 'appium plugin add uiautomator2' },
        ],
        correct: 'b',
        explanation: 'In Appium 3, drivers are installed separately with "appium driver install <name>". UIAutomator2 is required for Android, XCUITest for iOS. This plugin architecture differs from Appium 2\'s built-in driver structure.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Which command is used to install the XCUITest driver for iOS in Appium?",
      "options": [
            {
                  "id": "a",
                  "text": "appium plugin install xcuitest"
            },
            {
                  "id": "b",
                  "text": "npm install appium-xcuitest-driver"
            },
            {
                  "id": "c",
                  "text": "appium driver install xcuitest"
            },
            {
                  "id": "d",
                  "text": "appium install ios"
            }
      ],
      "correct": "c",
      "explanation": "Appium's CLI utilizes the 'appium driver install <driver-name>' command to manage its driver ecosystem. For iOS automation, the xcuitest driver must be installed using this command to allow Appium to interface with Apple's XCUITest framework."
}
},
      {
        type: 'quiz',
        question: 'You get "ANDROID_HOME is not set" after Appium installation. What should you do?',
        options: [
          { id: 'a', text: 'Reinstall Appium' },
          { id: 'b', text: 'Set the ANDROID_HOME environment variable to the Android SDK path and restart your terminal' },
          { id: 'c', text: 'Update Node.js' },
          { id: 'd', text: 'Uninstall and reinstall Android Studio' },
        ],
        correct: 'b',
        explanation: 'ANDROID_HOME tells Appium where to find the Android SDK. The value should point to ~/Library/Android/sdk (Mac), %LOCALAPPDATA%\\Android\\Sdk (Windows). You must restart the terminal/IDE after setting the variable for changes to take effect.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Appium throws 'JAVA_HOME is not set'. What is the most effective solution?",
      "options": [
            {
                  "id": "a",
                  "text": "Install a newer version of Appium Server"
            },
            {
                  "id": "b",
                  "text": "Set the JAVA_HOME environment variable to the path of your JDK and source your profile or restart your terminal"
            },
            {
                  "id": "c",
                  "text": "Add the Android SDK path to your PATH variable"
            },
            {
                  "id": "d",
                  "text": "Clear the Appium temporary files folder"
            }
      ],
      "correct": "b",
      "explanation": "Many Appium components, such as the Android SDK tools and Appium server itself, rely on the JAVA_HOME variable to locate the Java Runtime Environment. Setting this variable system-wide ensures consistent behavior across all terminal sessions."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-sync',
        topic: 'Appium Installation',
        questions: [
          {
            level: 'basic',
            q: 'What are the mandatory prerequisites for Appium installation?',
            a: '1) Node.js 20.19+ (Appium 3 requires it — Appium is a Node.js app). 2) JDK 11+ (for Java client and UIAutomator2). 3) Android SDK (ANDROID_HOME must be set correctly). 4) adb (Android Debug Bridge) must be in PATH. 5) AVD or real device. For iOS: additionally Xcode and xcode-select --install.',
          },
          {
            level: 'basic',
            q: 'What does Appium Doctor do?',
            a: 'Appium Doctor (@appium/doctor) is a CLI tool that checks whether your setup is correctly configured. Running "appium-doctor --android" verifies Node.js, JAVA_HOME, ANDROID_HOME, adb, emulator paths, and driver installation, then reports each with green/red marks. It is the first tool to use when troubleshooting setup issues.',
          },
          {
            level: 'intermediate',
            q: 'Why is the UIAutomator2 driver installed separately in Appium 3? What are the advantages of this architecture?',
            a: 'Appium 3 uses a plugin-based architecture. Each platform driver (UIAutomator2, XCUITest, Espresso) is an independent npm package. Advantages: 1) Core stays lightweight. 2) Each driver has independent versioning and updates. 3) You only install drivers you need. 4) You can write and publish custom drivers. Tradeoff: one extra installation step compared to Appium 2.',
          },
        ],
      },
    ],
  },
}

// ─── SECTION 2: CAPABILITIES & WDIO.CONF.TS ──────────────────────────────────
const section2 = {
  tr: {
    title: '🔧 Desired Capabilities & wdio.conf.ts',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🚕',
        content: 'Capabilities\'i bir taksi şoförüne verdiğiniz iş emri gibi düşünün — ve bu emir sadece "nereye git" değil, "hangi araçla, hangi yoldan, hangi müşteriyle" gibi çok boyutlu bir bağlam paketidir: `platformName: Android`, `deviceName: emulator-5554`, `appium:app: /apk/app.apk`, `appium:automationName: UiAutomator2`. Peki Java\'da basit bir `ChromeOptions` veya `DesiredCapabilities` yazarken bu kadar detay gerekmiyordu — neden Appium\'da bu kadar fazla parametre var? Çünkü bir tarayıcı her makinede aynı şekilde başlarken, mobil ortam son derece parçalı: aynı Android sürümü farklı cihazlarda farklı davranır, aynı APK farklı mimarilerde (ARM vs x86) farklı kurulur, ve Appium\'un doğru driver\'ı devreye alabilmesi için tüm bu bağlamı önceden bilmesi gerekir. Java\'daki `DesiredCapabilities` ile kıyaslamanın tam yeri burası: Appium 3\'te W3C standardı gereği, `appPackage` veya `appActivity` gibi Appium\'a özgü her capability artık `"appium:"` prefix\'iyle gönderilmelidir — tıpkı Java\'da vendor-specific annotation\'ların özel package altında olması gibi. QA açısından kritik olan: yanlış ya da eksik bir capability ile başlatılan test, CI\'da "session açılamadı" hatasıyla düşer ve hangi parametrenin yanlış olduğunu logdan okumak saatler alabilir.',
      },
      { type: 'heading', text: 'Appium 3 Capability Prefix Kuralı' },
      {
        type: 'table',
        headers: ['Capability', 'Tip', 'Appium 2', 'Appium 3'],
        rows: [
          ['platformName', 'W3C Standart', 'platformName', 'platformName ✓'],
          ['deviceName', 'W3C Standart', 'deviceName', 'deviceName ✓'],
          ['automationName', 'Appium-specific', 'automationName', '"appium:automationName" ⚠️'],
          ['appPackage', 'Appium-specific', 'appPackage', '"appium:appPackage" ⚠️'],
          ['appActivity', 'Appium-specific', 'appActivity', '"appium:appActivity" ⚠️'],
          ['noReset', 'Appium-specific', 'noReset', '"appium:noReset" ⚠️'],
          ['adb_shell', 'Driver-specific', 'adb_shell', '"uiautomator2:adb_shell" ⚠️'],
          ['autoGrantPermissions', 'Appium-specific', 'autoGrantPermissions', '"appium:autoGrantPermissions" ⚠️'],
        ],
      },
      { type: 'heading', text: 'Java — UiAutomator2Options (Önerilen)' },
      {
        type: 'code',
        language: 'java',
        label: 'Java — Appium 3.x Capabilities (Type-Safe)',
        code: `import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import java.net.URL;
import java.time.Duration;

public class AppiumConfig {

    // Appium 3 ile uyumlu driver oluşturma
    public static AndroidDriver createDriver() throws Exception {

        UiAutomator2Options options = new UiAutomator2Options()
            // W3C Standart (prefix yok)
            .setPlatformName("Android")
            .setDeviceName("emulator-5554")
            .setPlatformVersion("13.0")

            // Appium-specific (java-client otomatik prefix ekler)
            .setAutomationName("UiAutomator2")
            .setApp("/Users/user/apps/automation-exercise.apk")
            // APK kuruluysa package + activity kullan
            .setAppPackage("com.example.automationexercise")
            .setAppActivity(".MainActivity")

            // Davranış ayarları
            .setNoReset(false)          // Her testte uygulamayı sıfırla
            .setFullReset(false)        // true = uygulamayı sil ve tekrar kur
            .setAutoGrantPermissions(true)  // Android izinlerini otomatik ver
            .setNewCommandTimeout(Duration.ofSeconds(60));

        // Appium 3: Port 4723 varsayılan (Appium 2'de 4723 veya 4444)
        URL appiumServerUrl = new URL("http://127.0.0.1:4723");
        return new AndroidDriver(appiumServerUrl, options);
    }

    // iOS için XCUITestOptions (Mac'te çalışır)
    public static void createIOSDriver() throws Exception {
        // io.appium.java_client.ios.options.XCUITestOptions options
        // .setDeviceName("iPhone 15 Simulator")
        // .setPlatformVersion("17.0")
        // .setApp("/path/to/app.app")
    }
}`,
      },
      { type: 'heading', text: 'TypeScript — wdio.conf.ts (WebdriverIO)' },
      {
        type: 'code',
        language: 'typescript',
        label: 'wdio.conf.ts — Tam Konfigürasyon',
        code: `import { Options } from '@wdio/types'
import path from 'path'

export const config: Options.Testrunner = {
    // Runner ayarları
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: { transpileOnly: true, project: './tsconfig.json' },
    },

    // Test dosyaları
    specs: ['./tests/**/*.spec.ts'],
    exclude: [],

    // Paralel çalıştırma
    maxInstances: 1,  // Mobilde genellikle 1 (cihaz başına)

    capabilities: [{
        // W3C Standart — prefix yok
        platformName: 'Android',

        // Appium-specific — "appium:" prefix ZORUNLU (Appium 3)
        'appium:deviceName': 'emulator-5554',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',

        // APK yolu (mutlak yol)
        'appium:app': path.resolve('./apps/automation-exercise.apk'),
        // Kuruluysa package + activity kullan (app yerine)
        // 'appium:appPackage': 'com.example.automationexercise',
        // 'appium:appActivity': '.MainActivity',

        // Davranış ayarları
        'appium:noReset': false,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 60,

        // Appium 3: uiautomator2-specific flag (eski: adb_shell)
        'uiautomator2:adb_shell': true,
    }],

    // Appium server ayarları (wdio-appium-service)
    services: [
        ['appium', {
            command: 'appium',
            args: {
                port: 4723,
                // Güvenlik: hangi tehlikeli özellikler izinli
                allowInsecure: ['adb_shell', 'chromedriver_autodownload'],
                log: './logs/appium.log',
                loglevel: 'info',
            },
        }],
    ],

    // Test framework
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,  // Mobil testlerde süre uzun olabilir
    },

    reporters: [
        'spec',
        ['allure', { outputDir: './allure-results' }],
    ],

    // Hooks
    before: async () => {
        // Her test öncesi global setup
    },
    after: async () => {
        // Her test sonrası cleanup
    },
}`,
      },
      { type: 'heading', text: 'noReset / fullReset / fastReset Farkı' },
      {
        type: 'table',
        headers: ['Ayar', 'Davranış', 'Ne Zaman Kullan'],
        rows: [
          ['noReset: false (varsayılan)', 'Uygulama verisini sil, uygulamayı silme', 'Her test temiz başlasın ama kurulum hızlı olsun'],
          ['noReset: true', 'Hiçbir şey sıfırlama', 'Testler arası state korunacaksa (E2E zinciri)'],
          ['fullReset: true', 'Uygulamayı tamamen kaldır ve yeniden kur', 'İlk kurulum testi veya temiz ortam garantisi'],
          ['fastReset: true (default)', 'Sadece uygulama verisini sil (adb clear)', 'Hızlı reset istiyorsanız'],
        ],
      },
      {
        type: 'callout',
        color: 'blue',
        emoji: '☕',
        title: 'Java Analojisi:',
        content: 'noReset:true = Selenium testinde önceki cookie\'leri temizlemeden devam etmek gibi. noReset:false = Her testte driver.manage().deleteAllCookies() çağırmak gibi. fullReset:true = Tarayıcıyı kapatıp yeni bir oturum başlatmak gibi.',
      },
      {
        type: 'quiz',
        question: 'TypeScript\'te "appPackage" capability\'sini Appium 3 ile nasıl yazmalısınız?',
        options: [
          { id: 'a', text: 'appPackage: "com.example.app"' },
          { id: 'b', text: '"appium:appPackage": "com.example.app"' },
          { id: 'c', text: 'capabilities.appPackage = "com.example.app"' },
          { id: 'd', text: 'desired_capabilities.appPackage = "com.example.app"' },
        ],
        correct: 'b',
        explanation: 'WebdriverIO capabilities objesinde Appium-specific capability\'ler string key olarak "appium:" prefix ile yazılır. Java\'da UiAutomator2Options builder pattern bu prefix\'i otomatik ekler, ama TypeScript\'te manuel eklemeniz gerekir.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "TypeScript projesinde Appium 3 kullanılırken 'automationName' capability'si nasıl tanımlanmalıdır?",
      "options": [
            {
                  "id": "a",
                  "text": "automationName: 'UiAutomator2'"
            },
            {
                  "id": "b",
                  "text": "'appium:automationName': 'UiAutomator2'"
            },
            {
                  "id": "c",
                  "text": "capabilities.set('automationName', 'UiAutomator2')"
            },
            {
                  "id": "d",
                  "text": "desiredCapabilities['automationName'] = 'UiAutomator2'"
            }
      ],
      "correct": "b",
      "explanation": "Appium 2 ve 3 standartlarında, tüm standart dışı (Appium-specific) capability'lerin W3C uyumluluğu için 'appium:' ön ekiyle tanımlanması zorunludur. TypeScript ile yapılandırma objesi oluştururken bu anahtarı string olarak bu önek ile sağlamalısınız."
}
},
      {
        type: 'quiz',
        question: 'noReset: true ile noReset: false arasındaki temel fark nedir?',
        options: [
          { id: 'a', text: 'noReset: true uygulamayı daha hızlı başlatır' },
          { id: 'b', text: 'noReset: true uygulama verisini/state\'ini korur, noReset: false her seferinde temizler' },
          { id: 'c', text: 'noReset: false uygulamayı kaldırır' },
          { id: 'd', text: 'Herhangi bir fark yoktur' },
        ],
        correct: 'b',
        explanation: 'noReset: true olduğunda test bitiminde uygulama cache, login state, local storage korunur. noReset: false (varsayılan) ile bu veriler temizlenir. E2E senaryolarında bazen state korumak gerekir (login bir kez yapılır, sonraki testler devam eder).',
      
        retryQuestion: {
      "question": "Appium'da fullReset ile noReset arasındaki temel ayrım nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "fullReset uygulama hızını artırır, noReset azaltır"
            },
            {
                  "id": "b",
                  "text": "noReset verileri korur, fullReset ise uygulamayı tamamen kaldırıp yeniden yükler"
            },
            {
                  "id": "c",
                  "text": "noReset her testte uygulama önbelleğini siler"
            },
            {
                  "id": "d",
                  "text": "Bu ayarlar sadece Android üzerinde çalışır, iOS'te etkisi yoktur"
            }
      ],
      "correct": "b",
      "explanation": "noReset: true, uygulama verilerini ve oturumu koruyarak hızlı test döngüsü sağlar. fullReset: true ise testi başlatmadan önce uygulamayı cihazdan tamamen kaldırıp yeniden kurar, bu da temiz bir ortam oluşturur."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-pageobject',
        topic: 'Desired Capabilities',
        questions: [
          {
            level: 'basic',
            q: 'Desired Capabilities nedir ve neden gereklidir?',
            a: 'Desired Capabilities, Appium\'a test oturumu açmadan önce gönderilen konfigürasyon parametreleridir. Hangi cihazda, hangi platform versiyonunda, hangi uygulamayı, hangi otomasyon engine\'i ile test edeceğinizi belirtirler. Eksik veya hatalı capability = session açılamaz veya yanlış cihaza bağlanılır.',
          },
          {
            level: 'intermediate',
            q: 'Appium 3\'te hangi capability\'ler "appium:" prefix alır, hangileri almaz?',
            a: 'W3C WebDriver standardında tanımlı olanlar (platformName, browserName, browserVersion, acceptInsecureCerts, pageLoadStrategy, proxy, timeouts) prefix almaz. Appium\'a özgü olanlar (automationName, app, appPackage, appActivity, noReset, fullReset, autoGrantPermissions vb.) "appium:" prefix alır. Driver-specific olanlar ise driver adını prefix olarak alır: "uiautomator2:adb_shell".',
          },
          {
            level: 'advanced',
            q: 'Parallel test çalıştırırken (birden fazla cihaz) capabilities nasıl yapılandırılır?',
            a: 'wdio.conf.ts\'de maxInstances değeri artırılır ve her capability farklı udid/deviceName ile tanımlanır. Her instance ayrı bir Appium session açar. Gerçek cihazlarda udid zorunludur (adb devices ile bulunur). Emülatörlerde port çakışması önlemek için --port flag\'i ile farklı portlarda Appium server başlatılır veya tek server birden fazla session yönetir (systemPort capability\'si farklı set edilir).',
            code: `// wdio.conf.ts — Paralel Cihaz Konfigürasyonu
capabilities: [
  {
    platformName: 'Android',
    'appium:deviceName': 'emulator-5554',
    'appium:udid': 'emulator-5554',
    'appium:systemPort': 8200,  // Her cihaz farklı port
  },
  {
    platformName: 'Android',
    'appium:deviceName': 'emulator-5556',
    'appium:udid': 'emulator-5556',
    'appium:systemPort': 8201,
  },
]`,
          },
        ],
      },
    ],
  },
  en: {
    title: '🔧 Desired Capabilities & wdio.conf.ts',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🚕',
        content: 'Think of capabilities as a multi-dimensional work order for a taxi dispatcher — not just "where to go" but which vehicle, which route, which passenger: `platformName: Android`, `deviceName: emulator-5554`, `appium:app: /apk/app.apk`, `appium:automationName: UiAutomator2`. But when you write a simple `ChromeOptions` in Java you don\'t need this many parameters — so why does Appium demand so much context upfront? Because a browser starts identically on every machine, while the mobile environment is massively fragmented: the same Android version behaves differently across devices, the same APK installs differently on ARM vs x86 architectures, and Appium must know the full context before it can select and initialize the right driver. This is exactly where the comparison with Java\'s `DesiredCapabilities` lands: in Appium 3, W3C standard requires that all Appium-specific capabilities like `appPackage` or `appActivity` are sent with the `"appium:"` prefix — just like vendor-specific annotations live under dedicated packages in Java. The critical QA truth: a test launched with a wrong or missing capability fails in CI with "session not created" — and reading which parameter was wrong from the logs can cost hours of debugging time.',
      },
      { type: 'heading', text: 'Appium 3 Capability Prefix Rule' },
      {
        type: 'table',
        headers: ['Capability', 'Type', 'Appium 2', 'Appium 3'],
        rows: [
          ['platformName', 'W3C Standard', 'platformName', 'platformName ✓'],
          ['deviceName', 'W3C Standard', 'deviceName', 'deviceName ✓'],
          ['automationName', 'Appium-specific', 'automationName', '"appium:automationName" ⚠️'],
          ['appPackage', 'Appium-specific', 'appPackage', '"appium:appPackage" ⚠️'],
          ['appActivity', 'Appium-specific', 'appActivity', '"appium:appActivity" ⚠️'],
          ['noReset', 'Appium-specific', 'noReset', '"appium:noReset" ⚠️'],
          ['adb_shell', 'Driver-specific', 'adb_shell', '"uiautomator2:adb_shell" ⚠️'],
          ['autoGrantPermissions', 'Appium-specific', 'autoGrantPermissions', '"appium:autoGrantPermissions" ⚠️'],
        ],
      },
      { type: 'heading', text: 'Java — UiAutomator2Options (Recommended)' },
      {
        type: 'code',
        language: 'java',
        label: 'Java — Appium 3.x Capabilities (Type-Safe)',
        code: `import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import java.net.URL;
import java.time.Duration;

public class AppiumConfig {

    public static AndroidDriver createDriver() throws Exception {

        UiAutomator2Options options = new UiAutomator2Options()
            // W3C Standard (no prefix)
            .setPlatformName("Android")
            .setDeviceName("emulator-5554")
            .setPlatformVersion("13.0")

            // Appium-specific (java-client adds prefix automatically)
            .setAutomationName("UiAutomator2")
            .setApp("/Users/user/apps/automation-exercise.apk")
            // If APK is already installed, use package + activity instead
            .setAppPackage("com.example.automationexercise")
            .setAppActivity(".MainActivity")

            // Behavior settings
            .setNoReset(false)          // Reset app data each test
            .setFullReset(false)        // true = uninstall and reinstall
            .setAutoGrantPermissions(true)
            .setNewCommandTimeout(Duration.ofSeconds(60));

        // Appium 3: Port 4723 is default
        URL appiumServerUrl = new URL("http://127.0.0.1:4723");
        return new AndroidDriver(appiumServerUrl, options);
    }
}`,
      },
      { type: 'heading', text: 'TypeScript — wdio.conf.ts (WebdriverIO)' },
      {
        type: 'code',
        language: 'typescript',
        label: 'wdio.conf.ts — Full Configuration',
        code: `import { Options } from '@wdio/types'
import path from 'path'

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: { transpileOnly: true, project: './tsconfig.json' },
    },

    specs: ['./tests/**/*.spec.ts'],
    exclude: [],

    maxInstances: 1,  // Usually 1 for mobile (per device)

    capabilities: [{
        // W3C Standard — no prefix
        platformName: 'Android',

        // Appium-specific — "appium:" prefix REQUIRED (Appium 3)
        'appium:deviceName': 'emulator-5554',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',

        // APK path (absolute path)
        'appium:app': path.resolve('./apps/automation-exercise.apk'),

        // Behavior settings
        'appium:noReset': false,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 60,

        // Appium 3: uiautomator2-specific flag (old: adb_shell)
        'uiautomator2:adb_shell': true,
    }],

    services: [
        ['appium', {
            command: 'appium',
            args: {
                port: 4723,
                allowInsecure: ['adb_shell', 'chromedriver_autodownload'],
                log: './logs/appium.log',
                loglevel: 'info',
            },
        }],
    ],

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
    },

    reporters: [
        'spec',
        ['allure', { outputDir: './allure-results' }],
    ],
}`,
      },
      { type: 'heading', text: 'noReset / fullReset / fastReset Difference' },
      {
        type: 'table',
        headers: ['Setting', 'Behavior', 'When to Use'],
        rows: [
          ['noReset: false (default)', 'Clear app data, keep app installed', 'Each test starts clean but installation is fast'],
          ['noReset: true', 'Preserve everything', 'State must persist between tests (E2E chain)'],
          ['fullReset: true', 'Completely uninstall and reinstall', 'First install test or guaranteed clean state'],
          ['fastReset: true (default)', 'Clear app data only (adb clear)', 'When you want fast reset'],
        ],
      },
      {
        type: 'callout',
        color: 'blue',
        emoji: '☕',
        title: 'Java Analogy:',
        content: 'noReset: true = continuing without clearing cookies between Selenium tests. noReset: false = calling driver.manage().deleteAllCookies() before each test. fullReset: true = closing the browser and starting a new session entirely.',
      },
      {
        type: 'quiz',
        question: 'How should "appPackage" be written in Appium 3 (TypeScript)?',
        options: [
          { id: 'a', text: 'appPackage: "com.example.app"' },
          { id: 'b', text: '"appium:appPackage": "com.example.app"' },
          { id: 'c', text: 'capabilities.appPackage = "com.example.app"' },
          { id: 'd', text: 'desired_capabilities.appPackage = "com.example.app"' },
        ],
        correct: 'b',
        explanation: 'In TypeScript WebdriverIO, Appium-specific capabilities must be written as string keys with "appium:" prefix. Java\'s UiAutomator2Options builder adds this prefix automatically.',
      
        retryQuestion: {
      "question": "Which of the following is the correct way to define \"automationName\" in WebdriverIO capabilities using Appium 3?",
      "options": [
            {
                  "id": "a",
                  "text": "automationName: \"UiAutomator2\""
            },
            {
                  "id": "b",
                  "text": "\"appium:automationName\": \"UiAutomator2\""
            },
            {
                  "id": "c",
                  "text": "capabilities.set(\"automationName\", \"UiAutomator2\")"
            },
            {
                  "id": "d",
                  "text": "appiumOptions.automationName = \"UiAutomator2\""
            }
      ],
      "correct": "b",
      "explanation": "In modern Appium (2.0+), capabilities must be namespaced. Using the \"appium:\" prefix ensures that the driver properly interprets vendor-specific capabilities like automationName, deviceName, or platformVersion."
}
},
      {
        type: 'quiz',
        question: 'What is the difference between noReset: true and noReset: false?',
        options: [
          { id: 'a', text: 'noReset: true makes the app start faster' },
          { id: 'b', text: 'noReset: true preserves app data/state, noReset: false clears it each time' },
          { id: 'c', text: 'noReset: false uninstalls the app' },
          { id: 'd', text: 'There is no difference' },
        ],
        correct: 'b',
        explanation: 'With noReset: true, app cache, login state, and local storage are preserved after the test. noReset: false (default) clears these. In E2E scenarios you sometimes need to preserve state (login once, subsequent tests continue). fullReset: true goes even further by uninstalling the app completely.',
      
        retryQuestion: {
      "question": "What happens if you set noReset: false in your Appium configuration?",
      "options": [
            {
                  "id": "a",
                  "text": "The app will not launch at all"
            },
            {
                  "id": "b",
                  "text": "The app state, such as login sessions and local cache, is cleared before the session starts"
            },
            {
                  "id": "c",
                  "text": "The app will be updated to the latest version automatically"
            },
            {
                  "id": "d",
                  "text": "The test will run significantly faster because it skips the reset process"
            }
      ],
      "correct": "b",
      "explanation": "By default (noReset: false), Appium cleans the app's internal data directories or reinstalls the app to ensure that each test starts from a clean slate, preventing test contamination from previous runs."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-ci',
        topic: 'Desired Capabilities',
        questions: [
          {
            level: 'basic',
            q: 'What are Desired Capabilities and why are they required?',
            a: 'Desired Capabilities are configuration parameters sent to Appium before opening a test session. They specify which device, platform version, application, and automation engine to use. Missing or incorrect capabilities = session cannot open or connects to wrong device.',
          },
          {
            level: 'intermediate',
            q: 'Which capabilities require the "appium:" prefix in Appium 3?',
            a: 'W3C WebDriver standard ones (platformName, browserName, timeouts) do NOT need a prefix. Appium-specific ones (automationName, app, appPackage, appActivity, noReset, fullReset, autoGrantPermissions) need "appium:" prefix. Driver-specific ones use driver name as prefix: "uiautomator2:adb_shell".',
          },
          {
            level: 'advanced',
            q: 'How are capabilities configured for parallel testing across multiple devices?',
            a: 'Increase maxInstances in wdio.conf.ts and define each capability with a different udid/deviceName. Each instance opens a separate Appium session. For real devices, udid is mandatory (found via adb devices). To prevent port conflicts on emulators, set different systemPort for each session (8200, 8201...) and start Appium with different ports or let one server manage multiple sessions.',
            code: `// wdio.conf.ts — Parallel Device Configuration
capabilities: [
  {
    platformName: 'Android',
    'appium:deviceName': 'emulator-5554',
    'appium:udid': 'emulator-5554',
    'appium:systemPort': 8200,
  },
  {
    platformName: 'Android',
    'appium:deviceName': 'emulator-5556',
    'appium:udid': 'emulator-5556',
    'appium:systemPort': 8201,
  },
]`,
          },
        ],
      },
    ],
  },
}

// ─── SECTION 3: LOCATOR STRATEJİLERİ & POM ───────────────────────────────────
const section3 = {
  tr: {
    title: '🔍 Locator Stratejileri & Page Object Model',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🗺️',
        content: 'Mobil element locator\'larını bir şehir adres sistemi gibi düşünün: `resource-id` kapı numarası gibi çalışır — doğrudan ve benzersiz, "Atatürk Bulvarı 42, Daire 3" gibi. `accessibility id` ise bina ismi gibi: "Merkez Postanesi" herkesçe bilinir ve platform değişse bile genellikle geçerli kalır. `xpath` ise "çarşıdan çıkıp sola dön, ikinci blokta kahvecinin yanındaki bina" tarifi gibi — her zaman bir yere ulaşırsınız ama yol tarifi uzun, kırılgan ve yavaş. Peki `By.id()` veya `By.cssSelector()` ile çalışmaya alışmış bir Selenium geliştiricisi neden `MobileBy.AccessibilityId()` öğrenmek zorunda? Çünkü native mobile UI\'da HTML id veya CSS class yoktur — aksine accessibility tree node\'ları, content-desc alanları ve UI hiyerarşisi üzerinden element tanımlanır; bu, Selenium\'un web locator sistemiyle aynı kavramsal çerçevede ama tamamen farklı teknik gerçekliktir. Java\'da `By.id("loginButton")` yazarken DOM\'daki `id` attribute\'unu hedefliyorsunuz; Appium\'da `MobileBy.AccessibilityId("loginButton")` ise UIAutomator2\'nin görünürlük ağacındaki `content-desc`\'i hedefler. QA açısından kritik olan: xpath\'e bağımlı testler, UI\'daki en küçük hiyerarşi değişikliğinde (buton bir `LinearLayout`\'un içine taşındı gibi) kırılır ve flaky test alarmlarıyla CI pipeline\'ınız gürültüye boğulur.',
      },
      { type: 'heading', text: 'Locator Stratejileri Karşılaştırması' },
      {
        type: 'table',
        headers: ['Strateji', 'Öncelik', 'Hız', 'Güvenilirlik', 'Örnek Kullanım'],
        rows: [
          ['id (resource-id)', '⭐ 1. tercih', '⚡ En hızlı', '✅ Yüksek', 'com.example:id/btn_login'],
          ['accessibility id', '⭐ 2. tercih', '⚡ Hızlı', '✅ Yüksek', '"Login Button"'],
          ['-android uiautomator', '⭐ 3. tercih', '🟡 Orta', '✅ İyi', 'UiSelector().text("Giriş")'],
          ['class name', '4. tercih', '🟡 Orta', '⚠️ Orta', 'android.widget.Button'],
          ['xpath', '⚠️ Son çare', '🐢 En yavaş', '⚠️ Kırılgan', '//android.widget.Button[@text=\'Login\']'],
          ['-android datamatcher', 'Espresso driver', '⚡ Hızlı', '✅ İyi', 'hasDescendant(withText(...))'],
        ],
      },
      { type: 'heading', text: 'Java — Tüm Locator Stratejileri' },
      {
        type: 'code',
        language: 'java',
        label: 'Java — AppiumBy ile Locator Örnekleri',
        code: `import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.WebElement;

public class LocatorExamples {
    private AndroidDriver driver;

    // 1. ID (resource-id) — EN HIZLI, EN GÜVENİLİR
    public WebElement findById() {
        return driver.findElement(
            AppiumBy.id("com.example.automationexercise:id/btn_add_to_cart")
        );
    }

    // 2. Accessibility ID — TalkBack / VoiceOver için de gerekli
    public WebElement findByAccessibility() {
        return driver.findElement(
            AppiumBy.accessibilityId("Add to Cart Button")
        );
    }

    // 3. UIAutomator2 — güçlü native selector
    public WebElement findByUiSelector() {
        return driver.findElement(
            AppiumBy.androidUIAutomator(
                "new UiSelector().text(\"Sepete Ekle\").className(\"android.widget.Button\")"
            )
        );
    }

    // 4. UIAutomator — metin içeriyor (contains benzeri)
    public WebElement findByTextContains() {
        return driver.findElement(
            AppiumBy.androidUIAutomator(
                "new UiSelector().textContains(\"Ekle\")"
            )
        );
    }

    // 5. Kaydırarak element bulma (scroll)
    public WebElement scrollAndFind(String productName) {
        return driver.findElement(
            AppiumBy.androidUIAutomator(
                "new UiScrollable(new UiSelector().scrollable(true))" +
                ".scrollIntoView(new UiSelector().text(\"" + productName + "\"))"
            )
        );
    }

    // 6. XPath — son çare, yavaş!
    public WebElement findByXPath() {
        return driver.findElement(
            AppiumBy.xpath("//android.widget.Button[@text='Sepete Ekle']")
        );
    }

    // 7. Class Name
    public WebElement findByClass() {
        return driver.findElement(
            AppiumBy.className("android.widget.EditText")
        );
    }
}`,
      },
      { type: 'heading', text: 'TypeScript — WebdriverIO Locator Sözdizimi' },
      {
        type: 'code',
        language: 'typescript',
        label: 'TypeScript — WebdriverIO Locator Örnekleri',
        code: `import { $ } from '@wdio/globals'

class LocatorExamples {
    // 1. Accessibility ID — tilde (~) shorthand
    get loginButton() {
        return $('~Login Button')
    }

    // 2. ID (resource-id) — android= prefix
    get searchInput() {
        return $('android=new UiSelector().resourceId("com.example.automationexercise:id/et_search")')
    }

    // 3. UIAutomator2 — metin ile
    get addToCartBtn() {
        return $('android=new UiSelector().text("Sepete Ekle").className("android.widget.Button")')
    }

    // 4. XPath
    get productTitle() {
        return $('//android.widget.TextView[@resource-id="com.example:id/tv_product_name"]')
    }

    // 5. Kaydırarak bulma
    async scrollToElement(text: string) {
        return $(
            \`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("\${text}"))\`
        )
    }

    // 6. Index ile (aynı class'tan N'inci element)
    get secondProduct() {
        return $$('android.widget.LinearLayout')[1]  // 0-indexed
    }
}`,
      },
      { type: 'heading', text: 'Appium Inspector ile Locator Bulma' },
      {
        type: 'list',
        icon: '🔍',
        title: 'Appium Inspector Kullanımı:',
        items: [
          'appium --plugins=appium-inspector-plugin komutuyla server başlat',
          'Appium Inspector uygulamasını aç (ya da GitHub\'dan standalone indir)',
          'Remote Host: 127.0.0.1, Port: 4723, Path: / olarak ayarla',
          'Capabilities JSON\'ını yapıştır ve "Start Session" tıkla',
          'Cihaz ekranında bir elemana tıkla → sağda XML görünür',
          'resource-id → AppiumBy.id(), content-desc → AppiumBy.accessibilityId() kullan',
        ],
      },
      {
        type: 'callout',
        color: 'blue',
        emoji: '☕',
        title: 'Java Biliyorsan — Selenium vs Appium Locator Farkı',
        content: 'Selenium\'da By.id("loginBtn") kullanırsın. Appium\'da AppiumBy.id("com.example:id/loginBtn") kullanırsın — fark: package name prefix zorunlu! Selenium\'da By.xpath("//button") yerine Appium\'da //android.widget.Button yazman gerekir (Android widget class adları farklı).',
      },
      { type: 'heading', text: 'Page Object Model (POM) Tasarım Deseni' },
      {
        type: 'simple-box',
        emoji: '📖',
        content: 'Page Object Model\'i bir IKEA kataloğu olarak düşünün — ama sadece ürün listesi değil, her odanın kendi düzeni, ölçüleri ve montaj kurallarıyla ayrı bir bölüm: LoginPage sadece giriş ekranının element\'lerini ve aksiyonlarını bilir, HomeScreen kendi navigasyon öğelerini, ProductPage ise ürün detay aksiyonlarını. Test senaryonuz bu sayfaların hazır metodlarını çağırarak hikayeyi anlatır — `loginPage.enterCredentials()`, `homePage.searchProduct()` — kendi locator\'ını hiç yazmaz. Peki Appium testlerini zaten çalıştırabiliyorsanız neden POM katmanına yatırım yapmak gerekiyor? Çünkü mobil UI\'lar sık değişir: uygulamanın yeni bir sürümünde "Giriş Yap" butonu yeni bir `resource-id` alabilir ve bu değişiklik locator\'ı kullanan her test dosyasını tek tek kırar — POM olmadan. POM ile sadece `LoginPage.java` dosyasındaki tek bir satırı değiştirirsiniz. Java\'daki `@FindBy(id = "loginBtn")` + `PageFactory.initElements()` kalıbını biliyorsanız, Appium POM\'u neredeyse aynıdır — fark yalnızca `AppiumDriver` kullanmanız ve locator\'ların `MobileBy` veya `AppiumBy` ile tanımlanmasıdır. QA açısından kritik olan: POM olmayan Appium projesinde bir locator değişikliği domino etkisiyle onlarca testi kırabilir ve sprint teslimatını bloke eder.',
      },
      { type: 'heading', text: 'Java — Tam POM Örneği' },
      {
        type: 'code',
        language: 'java',
        label: 'Java — LoginPage.java (POM)',
        code: `import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPage {
    private final AndroidDriver driver;
    private final WebDriverWait wait;

    // @AndroidFindBy annotation — Appium PageFactory
    @AndroidFindBy(id = "com.example.automationexercise:id/et_email")
    private WebElement emailInput;

    @AndroidFindBy(id = "com.example.automationexercise:id/et_password")
    private WebElement passwordInput;

    @AndroidFindBy(accessibility = "Login Button")
    private WebElement loginButton;

    @AndroidFindBy(id = "com.example.automationexercise:id/tv_error_msg")
    private WebElement errorMessage;

    public LoginPage(AndroidDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        PageFactory.initElements(new AppiumFieldDecorator(driver), this);
    }

    public LoginPage typeEmail(String email) {
        wait.until(ExpectedConditions.visibilityOf(emailInput));
        emailInput.clear();
        emailInput.sendKeys(email);
        return this;  // Method chaining
    }

    public LoginPage typePassword(String password) {
        passwordInput.clear();
        passwordInput.sendKeys(password);
        return this;
    }

    public HomePage tapLogin() {
        loginButton.click();
        return new HomePage(driver);
    }

    public String getError() {
        wait.until(ExpectedConditions.visibilityOf(errorMessage));
        return errorMessage.getText();
    }

    public boolean isLoginButtonEnabled() {
        return loginButton.isEnabled();
    }
}`,
      },
      {
        type: 'code',
        language: 'java',
        label: 'Java — LoginTest.java (JUnit 5)',
        code: `import org.junit.jupiter.api.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class LoginTest extends BaseTest {  // BaseTest driver setup içerir

    private LoginPage loginPage;

    @BeforeEach
    void openLogin() {
        loginPage = new LoginPage(driver);
    }

    @Test
    @Order(1)
    @DisplayName("Geçerli credentials ile giriş başarılı")
    void validLoginSucceeds() {
        HomePage home = loginPage
            .typeEmail("test@example.com")
            .typePassword("Test1234!")
            .tapLogin();

        Assertions.assertTrue(home.isVisible(), "Anasayfa görünmeli");
    }

    @Test
    @Order(2)
    @DisplayName("Yanlış şifre ile hata mesajı gösterilir")
    void wrongPasswordShowsError() {
        loginPage.typeEmail("test@example.com")
                 .typePassword("yanlisSifre");
        loginPage.tapLogin();

        String error = loginPage.getError();
        Assertions.assertEquals("Email veya şifre hatalı!", error);
    }
}`,
      },
      { type: 'heading', text: 'TypeScript — POM Örneği' },
      {
        type: 'code',
        language: 'typescript',
        label: 'TypeScript — login.page.ts',
        code: `import { $ } from '@wdio/globals'

class LoginPage {
    // Locator tanımları (getter = lazy evaluation)
    get emailInput()   { return $('~Email Input') }
    get passwordInput(){ return $('~Password Input') }
    get loginButton()  { return $('~Login Button') }
    get errorMessage() { return $('android=new UiSelector().resourceId("com.example.automationexercise:id/tv_error_msg")') }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.waitForDisplayed({ timeout: 15000 })
        await this.emailInput.clearValue()
        await this.emailInput.setValue(email)
        await this.passwordInput.clearValue()
        await this.passwordInput.setValue(password)
        await this.loginButton.click()
    }

    async getErrorText(): Promise<string> {
        await this.errorMessage.waitForDisplayed({ timeout: 5000 })
        return this.errorMessage.getText()
    }

    async isLoginButtonEnabled(): Promise<boolean> {
        return this.loginButton.isEnabled()
    }
}

export default new LoginPage()`,
      },
      {
        type: 'code',
        language: 'typescript',
        label: 'TypeScript — login.spec.ts',
        code: `import loginPage from '../pageobjects/login.page'
import homePage from '../pageobjects/home.page'

describe('Login Akışı', () => {
    it('Geçerli credentials ile giriş başarılı olur', async () => {
        await loginPage.login('test@example.com', 'Test1234!')
        await expect(homePage.welcomeText).toBeDisplayed()
    })

    it('Yanlış şifre hata mesajı gösterir', async () => {
        await loginPage.login('test@example.com', 'yanlis')
        const error = await loginPage.getErrorText()
        expect(error).toContain('hatalı')
    })
})`,
      },
      {
        type: 'quiz',
        question: 'Aşağıdaki locator stratejilerinden hangisi en yüksek performansı sağlar?',
        options: [
          { id: 'a', text: 'XPath — //android.widget.Button[@text="Login"]' },
          { id: 'b', text: 'Class Name — android.widget.Button' },
          { id: 'c', text: 'ID — com.example.app:id/btn_login' },
          { id: 'd', text: 'UIAutomator — new UiSelector().text("Login")' },
        ],
        correct: 'c',
        explanation: 'ID (resource-id) en hızlı ve en güvenilir locator stratejisidir çünkü Android doğrudan ID üzerinden arama yapar. XPath DOM traversal yaptığı için en yavaştır. UIAutomator2 çok güçlüdür ama biraz daha yavaş. ID bulunamadığında Accessibility ID tercih edilmeli.',
      
        retryQuestion: {
      "question": "Appium mobil otomasyonunda testlerinizin en kararlı ve hızlı çalışması için aşağıdaki locator yöntemlerinden hangisini birincil tercih etmelisiniz?",
      "options": [
            {
                  "id": "a",
                  "text": "XPath — //android.widget.EditText[@resource-id='email']"
            },
            {
                  "id": "b",
                  "text": "Accessibility ID — email_input"
            },
            {
                  "id": "c",
                  "text": "Android UIAutomator — new UiSelector().className('android.widget.EditText')"
            },
            {
                  "id": "d",
                  "text": "Class Name — android.widget.EditText"
            }
      ],
      "correct": "b",
      "explanation": "Accessibility ID (iOS'te accessibility identifier, Android'de content-description), framework seviyesinde en hızlı sonuç veren ve platform bağımsızlığı sunan yöntemdir. ID (resource-id) de çok hızlıdır, ancak Accessibility ID özellikle platformlar arası geçişlerde tercih edilir. XPath ise DOM ağacını taradığı için performans açısından en maliyetli yöntemdir."
}
},
      {
        type: 'quiz',
        question: 'TypeScript WebdriverIO\'da $("~Login") ne anlama gelir?',
        options: [
          { id: 'a', text: 'XPath ile "Login" metnini arar' },
          { id: 'b', text: 'Accessibility ID ile "Login" elementini bulur' },
          { id: 'c', text: 'ID ile resource-id "Login" elementini bulur' },
          { id: 'd', text: 'CSS selector ile "Login" class\'ını bulur' },
        ],
        correct: 'b',
        explanation: 'WebdriverIO\'da tilde (~) prefix Accessibility ID anlamına gelir. $("~Login") = driver.findElement(AppiumBy.accessibilityId("Login")) ile eşdeğerdir. Bu kısaltma sadece WebdriverIO\'ya özgüdür; Java\'da AppiumBy.accessibilityId() açıkça yazılır.',
      
        retryQuestion: {
      "question": "WebdriverIO'da $(\"#submit_button\") kullanımı ile $(\"~submit_button\") kullanımı arasındaki temel fark nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Her ikisi de aynı şekilde çalışır, sadece sözdizimi farkıdır."
            },
            {
                  "id": "b",
                  "text": "# işareti class, ~ işareti ID arar."
            },
            {
                  "id": "c",
                  "text": "# işareti resource-id ararken, ~ işareti accessibility id arar."
            },
            {
                  "id": "d",
                  "text": "~ işareti sadece CSS selector'lar için kullanılır."
            }
      ],
      "correct": "c",
      "explanation": "WebdriverIO'da # karakteri CSS veya ID (resource-id) ile eşleşirken, ~ karakteri Appium'un accessibilityId stratejisini temsil eder. Accessibility ID'ler, hem Android'deki content-description hem de iOS'teki accessibility identifier alanlarını hedeflediği için cross-platform projelerde daha sürdürülebilir bir yöntemdir."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-en',
        topic: 'Locator & POM',
        questions: [
          {
            level: 'basic',
            q: 'Appium\'da hangi locator stratejisini tercih edersiniz ve neden?',
            a: 'Öncelik sırasıyla: 1) ID (resource-id) — en hızlı, XML layout\'ta developer tarafından set edilir. 2) Accessibility ID (content-desc) — TalkBack için de gerekli, hızlı. 3) UIAutomator2 UiSelector — çok güçlü, native Android API. 4) XPath — sadece başka seçenek yoksa; DOM traversal yaptığı için en yavaş ve refactoring\'e karşı kırılgan.',
          },
          {
            level: 'intermediate',
            q: 'Page Object Model mobil testlerde neden önemlidir?',
            a: 'Mobil uygulamalar sık güncellendiğinden (yeni release, UI değişikliği) locator\'lar çabuk eskir. POM olmadan tüm testleri güncellemek zorunda kalırsınız. POM ile sadece ilgili page class\'ı güncellenir. Ayrıca test senaryoları daha okunabilir ve bakımı kolay olur. Selenium\'da kullandığınız POM ile aynı prensipler geçerlidir.',
          },
          {
            level: 'advanced',
            q: 'Dinamik elementlerde (ID her seferinde değişiyor) nasıl locator yazarsınız?',
            a: 'Dinamik ID\'lerde alternatifler: 1) textContains() veya textMatches() ile metin kullan: new UiSelector().textContains("Ekle"). 2) Index ile: new UiSelector().className("Button").instance(0). 3) Parent-child ilişkisi: XPath ile //LinearLayout[.//TextView[@text="Ürün"]]/Button. 4) AccessibilityId kullan (genellikle daha stabil). En iyi çözüm: developer\'dan stable ID veya content-desc eklemesini isteyin.',
          },
        ],
      },
      {
        type: 'simulation',
        icon: '🔍',
        color: '#7c3aed',
        title: { tr: 'Appium Inspector — Canlı Element Tespiti', en: 'Appium Inspector — Live Element Detection' },
        scenario: 'appium-element-detection',
        description: {
          tr: '"▶ Tara" butonuna bas: Appium Inspector uygulamayı tararken element ağacının (source XML) nasıl oluştuğunu canlı izle, sonra önerilen locator\'ı gör.',
          en: 'Click "▶ Scan": watch the element tree (source XML) build live as Appium Inspector scans the app, then see the suggested locator.',
        },
        code: `// Java — Appium ile element bulma (öncelik sırasıyla)
AppiumDriver driver = new AndroidDriver(
    new URL("http://127.0.0.1:4723"), capabilities);

// 1) resource-id (en hızlı, en güvenilir)
WebElement email = driver.findElement(
    AppiumBy.id("com.example:id/et_email"));

// 2) accessibility id (TalkBack için de gerekli)
WebElement search = driver.findElement(
    AppiumBy.accessibilityId("Search products"));

// 3) UIAutomator2 selector (native Android API)
WebElement addBtn = driver.findElement(
    AppiumBy.androidUIAutomator(
        "new UiSelector().text(\\"Add to Cart\\")"));

// 4) XPath — yalnızca son çare (en yavaş, en kırılgan)
WebElement title = driver.findElement(
    AppiumBy.xpath("//android.widget.TextView[@text='Login']"));`,
      },
    ],
  },
  en: {
    title: '🔍 Locator Strategies & Page Object Model',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🗺️',
        content: 'Think of mobile element locators as a city addressing system: `resource-id` works like a door number — direct and unique, like "42 Main Street, Apt 3." `accessibility id` is like a building name — "Central Post Office" is universally known and usually survives platform changes. `xpath` is like giving directions by landmarks — "leave the market, turn left, second block, building next to the coffee shop" — you always arrive eventually, but the route is long, fragile, and slow. But if you\'re used to `By.id()` or `By.cssSelector()` in Selenium, why must you learn `MobileBy.AccessibilityId()` at all? Because native mobile UI has no HTML IDs or CSS classes — instead, elements are identified through accessibility tree nodes, content-desc fields, and UI hierarchy; same conceptual framework as Selenium\'s locator system, completely different technical reality. In Java Selenium, `By.id("loginButton")` targets the `id` attribute in the DOM; in Appium, `MobileBy.AccessibilityId("loginButton")` targets the `content-desc` in UIAutomator2\'s visibility tree. The critical QA truth: tests that rely on xpath break with the smallest UI hierarchy change — one button moved inside a `LinearLayout` — and flaky test alarms drown your CI pipeline in noise while the real bugs go undetected.',
      },
      { type: 'heading', text: 'Locator Strategies Comparison' },
      {
        type: 'table',
        headers: ['Strategy', 'Priority', 'Speed', 'Reliability', 'Example'],
        rows: [
          ['id (resource-id)', '⭐ 1st choice', '⚡ Fastest', '✅ High', 'com.example:id/btn_login'],
          ['accessibility id', '⭐ 2nd choice', '⚡ Fast', '✅ High', '"Login Button"'],
          ['-android uiautomator', '⭐ 3rd choice', '🟡 Medium', '✅ Good', 'UiSelector().text("Login")'],
          ['class name', '4th choice', '🟡 Medium', '⚠️ Medium', 'android.widget.Button'],
          ['xpath', '⚠️ Last resort', '🐢 Slowest', '⚠️ Fragile', '//android.widget.Button[@text=\'Login\']'],
          ['-android datamatcher', 'Espresso driver', '⚡ Fast', '✅ Good', 'hasDescendant(withText(...))'],
        ],
      },
      { type: 'heading', text: 'Java — All Locator Strategies' },
      {
        type: 'code',
        language: 'java',
        label: 'Java — AppiumBy Locator Examples',
        code: `import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.WebElement;

public class LocatorExamples {
    private AndroidDriver driver;

    // 1. ID (resource-id) — FASTEST, MOST RELIABLE
    public WebElement findById() {
        return driver.findElement(
            AppiumBy.id("com.example.automationexercise:id/btn_add_to_cart")
        );
    }

    // 2. Accessibility ID — also needed for TalkBack / VoiceOver
    public WebElement findByAccessibility() {
        return driver.findElement(
            AppiumBy.accessibilityId("Add to Cart Button")
        );
    }

    // 3. UIAutomator2 — powerful native selector
    public WebElement findByUiSelector() {
        return driver.findElement(
            AppiumBy.androidUIAutomator(
                "new UiSelector().text(\\"Add to Cart\\").className(\\"android.widget.Button\\")"
            )
        );
    }

    // 4. UIAutomator — text contains (like contains)
    public WebElement findByTextContains() {
        return driver.findElement(
            AppiumBy.androidUIAutomator(
                "new UiSelector().textContains(\\"Add\\")"
            )
        );
    }

    // 5. Scroll to find element
    public WebElement scrollAndFind(String productName) {
        return driver.findElement(
            AppiumBy.androidUIAutomator(
                "new UiScrollable(new UiSelector().scrollable(true))" +
                ".scrollIntoView(new UiSelector().text(\\"" + productName + "\\"))"
            )
        );
    }

    // 6. XPath — last resort, slow!
    public WebElement findByXPath() {
        return driver.findElement(
            AppiumBy.xpath("//android.widget.Button[@text='Add to Cart']")
        );
    }

    // 7. Class Name
    public WebElement findByClass() {
        return driver.findElement(
            AppiumBy.className("android.widget.EditText")
        );
    }
}`,
      },
      { type: 'heading', text: 'TypeScript — WebdriverIO Locator Syntax' },
      {
        type: 'code',
        language: 'typescript',
        label: 'TypeScript — WebdriverIO Locator Examples',
        code: `import { $ } from '@wdio/globals'

class LocatorExamples {
    // 1. Accessibility ID — tilde (~) shorthand
    get loginButton() {
        return $('~Login Button')
    }

    // 2. ID (resource-id) — android= prefix
    get searchInput() {
        return $('android=new UiSelector().resourceId("com.example.automationexercise:id/et_search")')
    }

    // 3. UIAutomator2 — by text
    get addToCartBtn() {
        return $('android=new UiSelector().text("Add to Cart").className("android.widget.Button")')
    }

    // 4. XPath
    get productTitle() {
        return $('//android.widget.TextView[@resource-id="com.example:id/tv_product_name"]')
    }

    // 5. Scroll to find
    async scrollToElement(text: string) {
        return $(
            \`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("\${text}"))\`
        )
    }

    // 6. By index (Nth element of same class)
    get secondProduct() {
        return $$('android.widget.LinearLayout')[1]  // 0-indexed
    }
}`,
      },
      { type: 'heading', text: 'Finding Locators with Appium Inspector' },
      {
        type: 'list',
        icon: '🔍',
        title: 'Appium Inspector Usage:',
        items: [
          'Start server with: appium --plugins=appium-inspector-plugin',
          'Open Appium Inspector app (or download standalone from GitHub)',
          'Set: Remote Host: 127.0.0.1, Port: 4723, Path: /',
          'Paste your Capabilities JSON and click "Start Session"',
          'Tap an element on the device screen → XML appears on the right',
          'resource-id → use AppiumBy.id(), content-desc → use AppiumBy.accessibilityId()',
        ],
      },
      {
        type: 'callout',
        color: 'blue',
        emoji: '☕',
        title: 'If You Know Java — Selenium vs Appium Locator Difference',
        content: 'In Selenium you use By.id("loginBtn"). In Appium you use AppiumBy.id("com.example:id/loginBtn") — difference: package name prefix is required! Instead of By.xpath("//button") in Selenium, in Appium you must write //android.widget.Button (Android widget class names are different).',
      },
      { type: 'heading', text: 'Page Object Model (POM) Design Pattern' },
      {
        type: 'simple-box',
        emoji: '📖',
        content: 'Think of Page Object Model like an IKEA catalog — but not just a product list; each room has its own section with dimensions, layout, and assembly rules: LoginPage knows only the login screen\'s elements and actions, HomeScreen owns its own navigation items, ProductPage holds the product detail actions. Your test scenarios call these pages\' ready-made methods to tell the story — `loginPage.enterCredentials()`, `homePage.searchProduct()` — without ever writing their own locators. But if your Appium tests are already running, why invest in a POM layer at all? Because mobile UIs change frequently: a new app release might give the "Login" button a new `resource-id`, and without POM that single locator change breaks every test file that references it directly. With POM, you change exactly one line in `LoginPage.java`. If you know the Java `@FindBy(id = "loginBtn")` + `PageFactory.initElements()` pattern, Appium POM is nearly identical — the only difference is using `AppiumDriver` and defining locators with `MobileBy` or `AppiumBy`. The critical QA truth: in an Appium project without POM, one locator change can trigger a domino effect that breaks dozens of tests and blocks your sprint delivery.',
      },
      { type: 'heading', text: 'Java — Full POM Example' },
      {
        type: 'code',
        language: 'java',
        label: 'Java — LoginPage.java (POM)',
        code: `import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPage {
    private final AndroidDriver driver;
    private final WebDriverWait wait;

    // @AndroidFindBy annotation — Appium PageFactory
    @AndroidFindBy(id = "com.example.automationexercise:id/et_email")
    private WebElement emailInput;

    @AndroidFindBy(id = "com.example.automationexercise:id/et_password")
    private WebElement passwordInput;

    @AndroidFindBy(accessibility = "Login Button")
    private WebElement loginButton;

    @AndroidFindBy(id = "com.example.automationexercise:id/tv_error_msg")
    private WebElement errorMessage;

    public LoginPage(AndroidDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        PageFactory.initElements(new AppiumFieldDecorator(driver), this);
    }

    public LoginPage typeEmail(String email) {
        wait.until(ExpectedConditions.visibilityOf(emailInput));
        emailInput.clear();
        emailInput.sendKeys(email);
        return this;  // Method chaining
    }

    public LoginPage typePassword(String password) {
        passwordInput.clear();
        passwordInput.sendKeys(password);
        return this;
    }

    public HomePage tapLogin() {
        loginButton.click();
        return new HomePage(driver);
    }

    public String getError() {
        wait.until(ExpectedConditions.visibilityOf(errorMessage));
        return errorMessage.getText();
    }

    public boolean isLoginButtonEnabled() {
        return loginButton.isEnabled();
    }
}`,
      },
      {
        type: 'code',
        language: 'java',
        label: 'Java — LoginTest.java (JUnit 5)',
        code: `import org.junit.jupiter.api.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class LoginTest extends BaseTest {  // BaseTest contains driver setup

    private LoginPage loginPage;

    @BeforeEach
    void openLogin() {
        loginPage = new LoginPage(driver);
    }

    @Test
    @Order(1)
    @DisplayName("Login succeeds with valid credentials")
    void validLoginSucceeds() {
        HomePage home = loginPage
            .typeEmail("test@example.com")
            .typePassword("Test1234!")
            .tapLogin();

        Assertions.assertTrue(home.isVisible(), "Home page should be visible");
    }

    @Test
    @Order(2)
    @DisplayName("Error message shown with wrong password")
    void wrongPasswordShowsError() {
        loginPage.typeEmail("test@example.com")
                 .typePassword("wrongPassword");
        loginPage.tapLogin();

        String error = loginPage.getError();
        Assertions.assertEquals("Invalid email or password!", error);
    }
}`,
      },
      { type: 'heading', text: 'TypeScript — POM Example' },
      {
        type: 'code',
        language: 'typescript',
        label: 'TypeScript — login.page.ts',
        code: `import { $ } from '@wdio/globals'

class LoginPage {
    // Locator definitions (getter = lazy evaluation)
    get emailInput()   { return $('~Email Input') }
    get passwordInput(){ return $('~Password Input') }
    get loginButton()  { return $('~Login Button') }
    get errorMessage() { return $('android=new UiSelector().resourceId("com.example.automationexercise:id/tv_error_msg")') }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.waitForDisplayed({ timeout: 15000 })
        await this.emailInput.clearValue()
        await this.emailInput.setValue(email)
        await this.passwordInput.clearValue()
        await this.passwordInput.setValue(password)
        await this.loginButton.click()
    }

    async getErrorText(): Promise<string> {
        await this.errorMessage.waitForDisplayed({ timeout: 5000 })
        return this.errorMessage.getText()
    }

    async isLoginButtonEnabled(): Promise<boolean> {
        return this.loginButton.isEnabled()
    }
}

export default new LoginPage()`,
      },
      {
        type: 'code',
        language: 'typescript',
        label: 'TypeScript — login.spec.ts',
        code: `import loginPage from '../pageobjects/login.page'
import homePage from '../pageobjects/home.page'

describe('Login Flow', () => {
    it('Login succeeds with valid credentials', async () => {
        await loginPage.login('test@example.com', 'Test1234!')
        await expect(homePage.welcomeText).toBeDisplayed()
    })

    it('Wrong password shows error message', async () => {
        await loginPage.login('test@example.com', 'wrong')
        const error = await loginPage.getErrorText()
        expect(error).toContain('Invalid')
    })
})`,
      },
      {
        type: 'quiz',
        question: 'Which locator strategy provides the highest performance in Appium?',
        options: [
          { id: 'a', text: 'XPath — //android.widget.Button[@text="Login"]' },
          { id: 'b', text: 'Class Name — android.widget.Button' },
          { id: 'c', text: 'ID — com.example.app:id/btn_login' },
          { id: 'd', text: 'UIAutomator — new UiSelector().text("Login")' },
        ],
        correct: 'c',
        explanation: 'ID (resource-id) is the fastest and most reliable locator strategy because Android searches directly by ID. XPath is slowest due to DOM traversal. UIAutomator2 is powerful but slightly slower. When ID is not available, prefer Accessibility ID.',
      
        retryQuestion: {
      "question": "Which of the following locator strategies is considered the best practice for cross-platform Appium automation in terms of performance and maintainability?",
      "options": [
            {
                  "id": "a",
                  "text": "XPath — //*[@text='Submit']"
            },
            {
                  "id": "b",
                  "text": "Class Name — android.widget.TextView"
            },
            {
                  "id": "c",
                  "text": "Accessibility ID — submit_btn"
            },
            {
                  "id": "d",
                  "text": "UIAutomator — new UiSelector().resourceId('btn_id')"
            }
      ],
      "correct": "c",
      "explanation": "Accessibility ID is the recommended locator strategy because it is high-performance and works identically on both iOS and Android if the developer provides the same accessibility identifier on both platforms. XPath should be avoided whenever possible as it is slow and brittle. UIAutomator and ID are specific to Android, limiting code reusability."
}
},
      {
        type: 'quiz',
        question: 'What does $("~Login") mean in TypeScript WebdriverIO?',
        options: [
          { id: 'a', text: 'Searches for "Login" text with XPath' },
          { id: 'b', text: 'Finds element with Accessibility ID "Login"' },
          { id: 'c', text: 'Finds element with resource-id "Login"' },
          { id: 'd', text: 'Finds element with CSS selector "Login"' },
        ],
        correct: 'b',
        explanation: 'In WebdriverIO, the tilde (~) prefix means Accessibility ID. $("~Login") is equivalent to driver.findElement(AppiumBy.accessibilityId("Login")). This shorthand is WebdriverIO-specific; in Java you write AppiumBy.accessibilityId() explicitly.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "What does $(\"#submit-btn\") signify when using WebdriverIO with TypeScript?",
      "options": [
            {
                  "id": "a",
                  "text": "Locates an element with accessibility ID \"submit-btn\""
            },
            {
                  "id": "b",
                  "text": "Locates an element with CSS selector \"#submit-btn\""
            },
            {
                  "id": "c",
                  "text": "Locates an element by text content \"submit-btn\""
            },
            {
                  "id": "d",
                  "text": "Locates an element with ID \"submit-btn\" using XPath"
            }
      ],
      "correct": "b",
      "explanation": "In WebdriverIO, if a selector string starts with '#', it is treated as a CSS selector. This is standard behavior for the WebdriverIO selector engine, mapping directly to CSS-based element lookups for web or hybrid applications."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-en',
        topic: 'Locator & POM',
        questions: [
          {
            level: 'basic',
            q: 'Which locator strategy do you prefer in Appium and why?',
            a: 'Priority order: 1) ID (resource-id) — fastest, set by developers in XML layout. 2) Accessibility ID (content-desc) — also needed for TalkBack, fast. 3) UIAutomator2 UiSelector — very powerful, native Android API. 4) XPath — only as last resort; DOM traversal makes it slowest and brittle against refactoring.',
          },
          {
            level: 'intermediate',
            q: 'Why is Page Object Model important in mobile testing?',
            a: 'Mobile apps update frequently (new releases, UI changes), so locators become stale quickly. Without POM you have to update all tests when UI changes. With POM, only the relevant page class is updated. Test scenarios also become more readable and maintainable. The same POM principles you use in Selenium apply here.',
          },
          {
            level: 'advanced',
            q: 'How do you write locators for dynamic elements where the ID changes each time?',
            a: 'Options for dynamic IDs: 1) textContains() or textMatches(): new UiSelector().textContains("Add"). 2) By index: new UiSelector().className("Button").instance(0). 3) Parent-child relationship: XPath //LinearLayout[.//TextView[@text="Product"]]/Button. 4) Use AccessibilityId (usually more stable). Best solution: ask the developer to add stable IDs or content-desc.',
          },
        ],
      },
      {
        type: 'simulation',
        icon: '🔍',
        color: '#7c3aed',
        title: { tr: 'Appium Inspector — Canlı Element Tespiti', en: 'Appium Inspector — Live Element Detection' },
        scenario: 'appium-element-detection',
        description: {
          tr: '"▶ Tara" butonuna bas: Appium Inspector uygulamayı tararken element ağacının (source XML) nasıl oluştuğunu canlı izle, sonra önerilen locator\'ı gör.',
          en: 'Click "▶ Scan": watch the element tree (source XML) build live as Appium Inspector scans the app, then see the suggested locator.',
        },
        code: `// Java — finding elements with Appium (priority order)
AppiumDriver driver = new AndroidDriver(
    new URL("http://127.0.0.1:4723"), capabilities);

// 1) resource-id (fastest, most reliable)
WebElement email = driver.findElement(
    AppiumBy.id("com.example:id/et_email"));

// 2) accessibility id (also needed for TalkBack)
WebElement search = driver.findElement(
    AppiumBy.accessibilityId("Search products"));

// 3) UIAutomator2 selector (native Android API)
WebElement addBtn = driver.findElement(
    AppiumBy.androidUIAutomator(
        "new UiSelector().text(\\"Add to Cart\\")"));

// 4) XPath — last resort only (slowest, most brittle)
WebElement title = driver.findElement(
    AppiumBy.xpath("//android.widget.TextView[@text='Login']"));`,
      },
    ],
  },
}

// ─── SECTION 4: GERÇEK SENARYO ───────────────────────────────────────────────
const section4 = {
  tr: {
    title: '🧪 Gerçek Senaryo — Ürün Arama & Sepete Ekleme',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🛒',
        content: 'Bu bölümde Automation Exercise uygulamasını Android emülatörde açıp tam bir E2E akışı test edeceğiz: Uygulama başlat → Ürün ara → Detaya git → Sepete ekle → Sepeti doğrula. Java (JUnit 5 + Appium) ve TypeScript (WebdriverIO) ile tam test dosyaları yazıyoruz.',
      },
      { type: 'heading', text: 'Test Senaryosu & Proje Yapısı' },
      {
        type: 'file-tree',
        title: 'Proje Klasör Yapısı',
        tree: `appium-project/
├── pom.xml (Java) / package.json (TS)
├── src/
│   ├── main/java/
│   │   └── pages/
│   │       ├── BasePage.java       ← Ortak wait metodları
│   │       ├── HomePage.java       ← Ana sayfa
│   │       ├── SearchPage.java     ← Arama sonuçları
│   │       ├── ProductPage.java    ← Ürün detay
│   │       └── CartPage.java       ← Sepet
│   └── test/java/
│       ├── BaseTest.java           ← Driver setup/teardown
│       └── ProductSearchTest.java  ← Test senaryosu
├── tests/ (TypeScript)
│   ├── pageobjects/
│   │   ├── home.page.ts
│   │   ├── search.page.ts
│   │   ├── product.page.ts
│   │   └── cart.page.ts
│   └── specs/
│       └── product-search.spec.ts
├── wdio.conf.ts
└── apps/
    └── automation-exercise.apk`,
        note: 'BasePage ortak wait, scroll, screenshot metodlarını içerir. Test sınıfları sadece iş mantığına odaklanır.',
      },
      { type: 'heading', text: 'Java — BaseTest (Driver Setup)' },
      {
        type: 'code',
        language: 'java',
        label: 'BaseTest.java — JUnit 5 ile Appium Driver Yönetimi',
        code: `import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import java.net.URL;
import java.time.Duration;

public class BaseTest {
    protected static AndroidDriver driver;

    @BeforeAll
    static void setUp() throws Exception {
        UiAutomator2Options options = new UiAutomator2Options()
            .setPlatformName("Android")
            .setDeviceName("emulator-5554")
            .setAppPackage("com.automationexercise.app")
            .setAppActivity(".activities.MainActivity")
            .setNoReset(false)
            .setAutoGrantPermissions(true)
            .setNewCommandTimeout(Duration.ofSeconds(60));

        driver = new AndroidDriver(
            new URL("http://127.0.0.1:4723"), options
        );
        driver.manage().timeouts()
              .implicitlyWait(Duration.ofSeconds(10));
    }

    @AfterAll
    static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
      },
      { type: 'heading', text: 'Java — Tam E2E Test Dosyası' },
      {
        type: 'code',
        language: 'java',
        label: 'ProductSearchTest.java — Tam Senaryo',
        code: `import io.appium.java_client.AppiumBy;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProductSearchTest extends BaseTest {

    private static WebDriverWait wait;

    @BeforeAll
    static void initWait() {
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // ── Adım 1: Ana sayfa yükleniyor ──────────────────────────────
    @Test @Order(1)
    @DisplayName("Ana sayfa başarıyla yüklenir")
    void homePageLoads() {
        WebElement logo = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/iv_logo")
        ));
        Assertions.assertTrue(logo.isDisplayed(), "Logo görünmeli");
    }

    // ── Adım 2: Arama yapılıyor ───────────────────────────────────
    @Test @Order(2)
    @DisplayName("'Blue Top' ürünü aranır, sonuç gelir")
    void searchReturnsResults() {
        // Arama ikonuna tıkla
        driver.findElement(AppiumBy.accessibilityId("Search")).click();

        // Arama kutusuna yaz
        WebElement searchBox = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/et_search")
        ));
        searchBox.sendKeys("Blue Top");

        // Klavyede "Ara" tuşuna bas
        driver.findElement(AppiumBy.id("com.automationexercise.app:id/btn_search")).click();

        // Sonuç listesi görünmeli
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/rv_products")
        ));

        List<WebElement> results = driver.findElements(
            AppiumBy.id("com.automationexercise.app:id/item_product")
        );
        Assertions.assertTrue(results.size() > 0, "En az 1 ürün gelmeli");
    }

    // ── Adım 3: Ürün detayına git ────────────────────────────────
    @Test @Order(3)
    @DisplayName("İlk ürüne tıklanır, detay sayfası açılır")
    void productDetailOpens() {
        // İlk ürüne tıkla
        driver.findElements(
            AppiumBy.id("com.automationexercise.app:id/item_product")
        ).get(0).click();

        // Ürün adı görünmeli
        WebElement productName = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/tv_product_name")
        ));
        Assertions.assertNotNull(productName.getText());
        Assertions.assertFalse(productName.getText().isEmpty());

        // Fiyat görünmeli
        WebElement price = driver.findElement(
            AppiumBy.id("com.automationexercise.app:id/tv_price")
        );
        Assertions.assertTrue(price.isDisplayed(), "Fiyat görünmeli");
    }

    // ── Adım 4: Sepete ekle ──────────────────────────────────────
    @Test @Order(4)
    @DisplayName("Ürün sepete eklenir")
    void addToCartSucceeds() {
        // Miktarı 2 yap
        WebElement qtyInput = driver.findElement(
            AppiumBy.id("com.automationexercise.app:id/et_quantity")
        );
        qtyInput.clear();
        qtyInput.sendKeys("2");

        // Sepete ekle butonuna bas
        driver.findElement(
            AppiumBy.accessibilityId("Add to Cart")
        ).click();

        // Başarı dialog'u görünmeli
        WebElement successMsg = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.androidUIAutomator("new UiSelector().textContains(\"Added\")")
        ));
        Assertions.assertTrue(successMsg.isDisplayed());

        // "Continue Shopping" veya "View Cart" seç
        driver.findElement(
            AppiumBy.androidUIAutomator("new UiSelector().text(\"View Cart\")")
        ).click();
    }

    // ── Adım 5: Sepeti doğrula ───────────────────────────────────
    @Test @Order(5)
    @DisplayName("Sepet sayfası doğrulanır")
    void cartIsCorrect() {
        // Sepet öğesi görünmeli
        WebElement cartItem = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/ll_cart_item")
        ));
        Assertions.assertTrue(cartItem.isDisplayed());

        // Miktar 2 olmalı
        WebElement qty = driver.findElement(
            AppiumBy.id("com.automationexercise.app:id/tv_quantity")
        );
        Assertions.assertEquals("2", qty.getText());
    }
}`,
      },
      { type: 'heading', text: 'TypeScript — Tam E2E Spec Dosyası' },
      {
        type: 'code',
        language: 'typescript',
        label: 'product-search.spec.ts — WebdriverIO ile Tam Senaryo',
        code: `import { browser, $, $$ } from '@wdio/globals'

// Page Object'ler
class HomePage {
    get logo()        { return $('~App Logo') }
    get searchIcon()  { return $('~Search') }
    get cartBadge()   { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/tv_cart_count")') }

    async getCartCount(): Promise<number> {
        const text = await this.cartBadge.getText()
        return parseInt(text, 10)
    }
    async openSearch() { await this.searchIcon.click() }
}

class SearchPage {
    get searchInput()  { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/et_search")') }
    get searchButton() { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/btn_search")') }
    get productItems() { return $$('android=new UiSelector().resourceId("com.automationexercise.app:id/item_product")') }

    async search(term: string) {
        await this.searchInput.waitForDisplayed({ timeout: 10000 })
        await this.searchInput.setValue(term)
        await this.searchButton.click()
    }
    async clickFirst() {
        const items = await this.productItems
        await items[0].click()
    }
}

class ProductPage {
    get productName()    { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/tv_product_name")') }
    get price()          { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/tv_price")') }
    get quantityInput()  { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/et_quantity")') }
    get addToCartBtn()   { return $('~Add to Cart') }
    get viewCartBtn()    { return $('android=new UiSelector().text("View Cart")') }

    async addToCart(qty = 1) {
        await this.quantityInput.clearValue()
        await this.quantityInput.setValue(String(qty))
        await this.addToCartBtn.click()
        await this.viewCartBtn.waitForDisplayed({ timeout: 5000 })
        await this.viewCartBtn.click()
    }
}

class CartPage {
    get cartItems()    { return $$('android=new UiSelector().resourceId("com.automationexercise.app:id/ll_cart_item")') }
    get quantityText() { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/tv_quantity")') }
}

// ── Test Senaryosu ────────────────────────────────────────────────
const homePage    = new HomePage()
const searchPage  = new SearchPage()
const productPage = new ProductPage()
const cartPage    = new CartPage()

describe('Automation Exercise — E2E Ürün Akışı', () => {

    before(async () => {
        await browser.pause(2000) // Uygulama açılış animasyonu
    })

    it('Ana sayfa yüklenir', async () => {
        await expect(homePage.logo).toBeDisplayed()
    })

    it('"Blue Top" araması sonuç döndürür', async () => {
        await homePage.openSearch()
        await searchPage.search('Blue Top')

        const results = await searchPage.productItems
        expect(results.length).toBeGreaterThan(0)
    })

    it('İlk ürünün detay sayfası açılır', async () => {
        await searchPage.clickFirst()

        await expect(productPage.productName).toBeDisplayed()
        await expect(productPage.price).toBeDisplayed()

        const name = await productPage.productName.getText()
        expect(name.length).toBeGreaterThan(0)
    })

    it('Ürün sepete eklenir (miktar: 2)', async () => {
        await productPage.addToCart(2)

        // Sepet sayfasına geçildi
        const items = await cartPage.cartItems
        expect(items.length).toBe(1)

        const qty = await cartPage.quantityText.getText()
        expect(qty).toBe('2')
    })

    after(async () => {
        await browser.reloadSession()
    })
})`,
      },
      {
        type: 'callout',
        color: 'green',
        emoji: '💡',
        title: 'Explicit Wait — Flaky Test Önleme',
        content: 'Mobil testlerde en sık hata "element not found" — element henüz yüklenmemiştir. Java\'da WebDriverWait + ExpectedConditions kullanın. TypeScript\'te waitForDisplayed({ timeout: 10000 }) veya waitForEnabled() metodlarını tercih edin. implicitlyWait her yerde beklediği için testleri yavaşlatır; explicit wait daha akıllıcadır.',
      },
      {
        type: 'quiz',
        question: 'Mobil testlerde "flaky test" (bazen geçip bazen başarısız olan test) için en yaygın sebep nedir?',
        options: [
          { id: 'a', text: 'Yanlış APK yolu' },
          { id: 'b', text: 'Explicit wait kullanılmaması — element henüz yüklenmeden tıklanıyor' },
          { id: 'c', text: 'Java versiyonu uyumsuzluğu' },
          { id: 'd', text: 'UIAutomator2 driver versiyonu' },
        ],
        correct: 'b',
        explanation: 'Mobil uygulamalar ağ isteği, animasyon ve async loading yaptığından elementler hemen ekranda olmayabilir. Explicit wait olmadan kodun devam etmesi "NoSuchElementException" veya "ElementNotInteractableException" verir. WebDriverWait + ExpectedConditions (Java) veya waitForDisplayed (TS) bunu çözer.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Mobil testlerde testlerin kararsız (flaky) çalışmasının ana nedeni genellikle nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Test cihazının ekran parlaklığının düşük olması"
            },
            {
                  "id": "b",
                  "text": "İnternet bağlantısının kesilmesi"
            },
            {
                  "id": "c",
                  "text": "Test betiğinin elementin görünürlüğünü beklemeden işleme geçmesi (synchronization issue)"
            },
            {
                  "id": "d",
                  "text": "Test projesinde kullanılan IDE ayarları"
            }
      ],
      "correct": "c",
      "explanation": "Mobil uygulamalarda UI elementlerinin DOM üzerinde hazır olması zaman alır. Eğer test kodu, element henüz oluşmadan etkileşime girmeye çalışırsa, uygulama durumuna göre test bazen başarılı olur bazen hata verir. Bu durumu düzeltmek için bekletme mekanizmalarının (wait) doğru kullanımı hayati önem taşır."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-en',
        topic: 'E2E Test Senaryosu',
        questions: [
          {
            level: 'basic',
            q: 'Appium testinde implicit wait ile explicit wait arasındaki fark nedir?',
            a: 'Implicit wait tüm findElement çağrıları için global bir bekleme süresi ayarlar. Explicit wait ise belirli bir koşul için bekler (görünür olana kadar, tıklanabilir olana kadar). Implicit wait kullanmak testleri yavaşlatabilir ve gerçek hataları maskeleyebilir. Best practice: implicit wait\'i 0 bırak, her kritik adımda explicit wait kullan.',
          },
          {
            level: 'intermediate',
            q: 'Hybrid uygulamada WebView içindeki elemana nasıl erişirsiniz?',
            a: 'Context switching gerekir. Önce mevcut context\'leri listele: driver.getContextHandles(). Sonra WebView context\'ine geç: driver.context("WEBVIEW_com.example.app"). Artık Selenium locator\'ları (By.cssSelector, By.xpath) çalışır. Native\'e dönmek için: driver.context("NATIVE_APP"). Java\'da: ((AppiumDriver)driver).context("WEBVIEW_xxx")',
            code: `// Java — Context Switching
Set<String> contexts = driver.getContextHandles();
// Çıktı: [NATIVE_APP, WEBVIEW_com.example.app]
driver.context("WEBVIEW_com.example.app");
driver.findElement(By.cssSelector("#loginBtn")).click(); // Web selector!
driver.context("NATIVE_APP"); // Native'e dön`,
          },
          {
            level: 'advanced',
            q: 'Test sonuçlarının CI/CD (Jenkins) ortamında güvenilir çalışması için neler yapılmalıdır?',
            a: 'CI/CD\'de dikkat edilmesi gerekenler: 1) Headless emülatör başlatma: emulator -avd Pixel_7 -no-window -no-snapshot. 2) Appium server\'ı arka planda başlat ve hazır olduğunu kontrol et. 3) Port çakışmalarını önle: --port flag\'i. 4) Allure/Extent gibi raporlama aracı ekle. 5) Test parallelization için birden fazla emülatör veya cloud device farm (BrowserStack, Sauce Labs) kullan. 6) Test verilerini DB\'den al, hardcode\'dan kaçın.',
          },
        ],
      },
      {
        type: 'simulation',
        icon: '👆',
        color: '#3b82f6',
        title: { tr: 'Mobil Swipe — Touch Action Simülasyonu', en: 'Mobile Swipe — Touch Action Simulation' },
        scenario: 'appium-swipe',
        description: {
          tr: '"▶ Swipe" butonuna bas ve W3C Actions API\'nin parmak dokunuşunu (pointerDown → move → pointerUp) nasıl koordinatlara çevirip listeyi kaydırdığını izle.',
          en: 'Click "▶ Swipe" and watch how the W3C Actions API turns a finger touch (pointerDown → move → pointerUp) into coordinates that scroll the list.',
        },
        code: `// Java — W3C Actions API ile Swipe (Appium 3.x)
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence swipe = new Sequence(finger, 0);

swipe.addAction(finger.createPointerMove(
    Duration.ZERO, PointerInput.Origin.viewport(), 540, 1600));
swipe.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
swipe.addAction(finger.createPointerMove(
    Duration.ofMillis(600), PointerInput.Origin.viewport(), 540, 400));
swipe.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

driver.perform(Collections.singletonList(swipe));

// Kısayol: W3C tabanlı yardımcı metod
// new TouchAction(driver).press(...).waitAction(...).moveTo(...).release().perform(); // ESKİ API, artık kullanılmıyor`,
      },
    ],
  },
  en: {
    title: '🧪 Real Scenario — Product Search & Add to Cart',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🛒',
        content: 'In this section we will open the Automation Exercise app on an Android emulator and run a complete E2E flow: Launch app → Search product → View detail → Add to cart → Verify cart. Full test files in both Java (JUnit 5 + Appium) and TypeScript (WebdriverIO).',
      },
      { type: 'heading', text: 'Test Scenario & Project Structure' },
      {
        type: 'file-tree',
        title: 'Project Folder Structure',
        tree: `appium-project/
├── pom.xml (Java) / package.json (TS)
├── src/
│   ├── main/java/
│   │   └── pages/
│   │       ├── BasePage.java       ← Common wait methods
│   │       ├── HomePage.java       ← Home screen
│   │       ├── SearchPage.java     ← Search results
│   │       ├── ProductPage.java    ← Product detail
│   │       └── CartPage.java       ← Shopping cart
│   └── test/java/
│       ├── BaseTest.java           ← Driver setup/teardown
│       └── ProductSearchTest.java  ← Test scenario
├── tests/ (TypeScript)
│   ├── pageobjects/
│   │   ├── home.page.ts
│   │   ├── search.page.ts
│   │   ├── product.page.ts
│   │   └── cart.page.ts
│   └── specs/
│       └── product-search.spec.ts
├── wdio.conf.ts
└── apps/
    └── automation-exercise.apk`,
        note: 'BasePage contains common wait, scroll, screenshot methods. Test classes focus only on business logic.',
      },
      { type: 'heading', text: 'Java — BaseTest (Driver Setup)' },
      {
        type: 'code',
        language: 'java',
        label: 'BaseTest.java — Appium Driver Management with JUnit 5',
        code: `import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import java.net.URL;
import java.time.Duration;

public class BaseTest {
    protected static AndroidDriver driver;

    @BeforeAll
    static void setUp() throws Exception {
        UiAutomator2Options options = new UiAutomator2Options()
            .setPlatformName("Android")
            .setDeviceName("emulator-5554")
            .setAppPackage("com.automationexercise.app")
            .setAppActivity(".activities.MainActivity")
            .setNoReset(false)
            .setAutoGrantPermissions(true)
            .setNewCommandTimeout(Duration.ofSeconds(60));

        driver = new AndroidDriver(
            new URL("http://127.0.0.1:4723"), options
        );
        driver.manage().timeouts()
              .implicitlyWait(Duration.ofSeconds(10));
    }

    @AfterAll
    static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
      },
      { type: 'heading', text: 'Java — Full E2E Test File' },
      {
        type: 'code',
        language: 'java',
        label: 'ProductSearchTest.java — Complete Scenario',
        code: `import io.appium.java_client.AppiumBy;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProductSearchTest extends BaseTest {

    private static WebDriverWait wait;

    @BeforeAll
    static void initWait() {
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // ── Step 1: Home page loads ──────────────────────────────────
    @Test @Order(1)
    @DisplayName("Home page loads successfully")
    void homePageLoads() {
        WebElement logo = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/iv_logo")
        ));
        Assertions.assertTrue(logo.isDisplayed(), "Logo should be visible");
    }

    // ── Step 2: Search ──────────────────────────────────────────
    @Test @Order(2)
    @DisplayName("'Blue Top' search returns results")
    void searchReturnsResults() {
        // Tap search icon
        driver.findElement(AppiumBy.accessibilityId("Search")).click();

        // Type in search box
        WebElement searchBox = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/et_search")
        ));
        searchBox.sendKeys("Blue Top");

        // Press Search button on keyboard
        driver.findElement(AppiumBy.id("com.automationexercise.app:id/btn_search")).click();

        // Results list should appear
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/rv_products")
        ));

        List<WebElement> results = driver.findElements(
            AppiumBy.id("com.automationexercise.app:id/item_product")
        );
        Assertions.assertTrue(results.size() > 0, "At least 1 product should appear");
    }

    // ── Step 3: Open product detail ─────────────────────────────
    @Test @Order(3)
    @DisplayName("Tap first product, detail page opens")
    void productDetailOpens() {
        // Tap first product
        driver.findElements(
            AppiumBy.id("com.automationexercise.app:id/item_product")
        ).get(0).click();

        // Product name should be visible
        WebElement productName = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/tv_product_name")
        ));
        Assertions.assertNotNull(productName.getText());
        Assertions.assertFalse(productName.getText().isEmpty());

        // Price should be visible
        WebElement price = driver.findElement(
            AppiumBy.id("com.automationexercise.app:id/tv_price")
        );
        Assertions.assertTrue(price.isDisplayed(), "Price should be visible");
    }

    // ── Step 4: Add to cart ─────────────────────────────────────
    @Test @Order(4)
    @DisplayName("Product is added to cart")
    void addToCartSucceeds() {
        // Set quantity to 2
        WebElement qtyInput = driver.findElement(
            AppiumBy.id("com.automationexercise.app:id/et_quantity")
        );
        qtyInput.clear();
        qtyInput.sendKeys("2");

        // Tap Add to Cart button
        driver.findElement(
            AppiumBy.accessibilityId("Add to Cart")
        ).click();

        // Success dialog should appear
        WebElement successMsg = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.androidUIAutomator("new UiSelector().textContains(\\"Added\\")")
        ));
        Assertions.assertTrue(successMsg.isDisplayed());

        // Choose "View Cart"
        driver.findElement(
            AppiumBy.androidUIAutomator("new UiSelector().text(\\"View Cart\\")")
        ).click();
    }

    // ── Step 5: Verify cart ─────────────────────────────────────
    @Test @Order(5)
    @DisplayName("Cart page is verified")
    void cartIsCorrect() {
        // Cart item should be visible
        WebElement cartItem = wait.until(ExpectedConditions.visibilityOfElementLocated(
            AppiumBy.id("com.automationexercise.app:id/ll_cart_item")
        ));
        Assertions.assertTrue(cartItem.isDisplayed());

        // Quantity should be 2
        WebElement qty = driver.findElement(
            AppiumBy.id("com.automationexercise.app:id/tv_quantity")
        );
        Assertions.assertEquals("2", qty.getText());
    }
}`,
      },
      { type: 'heading', text: 'TypeScript — Full E2E Spec File' },
      {
        type: 'code',
        language: 'typescript',
        label: 'product-search.spec.ts — Full Scenario with WebdriverIO',
        code: `import { browser, $, $$ } from '@wdio/globals'

// Page Objects (inline for readability)
class HomePage {
    get logo()        { return $('~App Logo') }
    get searchIcon()  { return $('~Search') }
    get cartBadge()   { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/tv_cart_count")') }

    async getCartCount(): Promise<number> {
        const text = await this.cartBadge.getText()
        return parseInt(text, 10)
    }
    async openSearch() { await this.searchIcon.click() }
}

class SearchPage {
    get searchInput()  { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/et_search")') }
    get searchButton() { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/btn_search")') }
    get productItems() { return $$('android=new UiSelector().resourceId("com.automationexercise.app:id/item_product")') }

    async search(term: string) {
        await this.searchInput.waitForDisplayed({ timeout: 10000 })
        await this.searchInput.setValue(term)
        await this.searchButton.click()
    }
    async clickFirst() {
        const items = await this.productItems
        await items[0].click()
    }
}

class ProductPage {
    get productName()    { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/tv_product_name")') }
    get price()          { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/tv_price")') }
    get quantityInput()  { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/et_quantity")') }
    get addToCartBtn()   { return $('~Add to Cart') }
    get viewCartBtn()    { return $('android=new UiSelector().text("View Cart")') }

    async addToCart(qty = 1) {
        await this.quantityInput.clearValue()
        await this.quantityInput.setValue(String(qty))
        await this.addToCartBtn.click()
        await this.viewCartBtn.waitForDisplayed({ timeout: 5000 })
        await this.viewCartBtn.click()
    }
}

class CartPage {
    get cartItems()    { return $$('android=new UiSelector().resourceId("com.automationexercise.app:id/ll_cart_item")') }
    get quantityText() { return $('android=new UiSelector().resourceId("com.automationexercise.app:id/tv_quantity")') }
}

// ── Test Scenario ──────────────────────────────────────────────────
const homePage    = new HomePage()
const searchPage  = new SearchPage()
const productPage = new ProductPage()
const cartPage    = new CartPage()

describe('Automation Exercise — E2E Product Flow', () => {

    before(async () => {
        await browser.pause(2000) // App launch animation
    })

    it('Home page loads', async () => {
        await expect(homePage.logo).toBeDisplayed()
    })

    it('"Blue Top" search returns results', async () => {
        await homePage.openSearch()
        await searchPage.search('Blue Top')

        const results = await searchPage.productItems
        expect(results.length).toBeGreaterThan(0)
    })

    it('First product detail page opens', async () => {
        await searchPage.clickFirst()

        await expect(productPage.productName).toBeDisplayed()
        await expect(productPage.price).toBeDisplayed()

        const name = await productPage.productName.getText()
        expect(name.length).toBeGreaterThan(0)
    })

    it('Product is added to cart (quantity: 2)', async () => {
        await productPage.addToCart(2)

        // Navigated to cart page
        const items = await cartPage.cartItems
        expect(items.length).toBe(1)

        const qty = await cartPage.quantityText.getText()
        expect(qty).toBe('2')
    })

    after(async () => {
        await browser.reloadSession()
    })
})`,
      },
      {
        type: 'callout',
        color: 'green',
        emoji: '💡',
        title: 'Explicit Wait — Preventing Flaky Tests',
        content: 'In mobile tests, the most common error is "element not found" — element hasn\'t loaded yet. In Java: use WebDriverWait + ExpectedConditions. In TypeScript: use waitForDisplayed({ timeout: 10000 }) or waitForEnabled(). implicitlyWait slows down all tests because it waits everywhere; explicit wait is smarter.',
      },
      {
        type: 'quiz',
        question: 'What is the most common cause of "flaky tests" (sometimes passing, sometimes failing) in mobile testing?',
        options: [
          { id: 'a', text: 'Wrong APK path' },
          { id: 'b', text: 'No explicit wait — clicking element before it has loaded' },
          { id: 'c', text: 'Java version mismatch' },
          { id: 'd', text: 'UIAutomator2 driver version' },
        ],
        correct: 'b',
        explanation: 'Mobile apps make network requests, animations and async loading — elements may not be on screen immediately. Without explicit wait, proceeding causes NoSuchElementException or ElementNotInteractableException. WebDriverWait + ExpectedConditions (Java) or waitForDisplayed (TS) solves this.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Which strategy is recommended to eliminate non-deterministic behavior in mobile automated tests caused by network latency?",
      "options": [
            {
                  "id": "a",
                  "text": "Use static sleep commands to pause execution"
            },
            {
                  "id": "b",
                  "text": "Implement synchronization by waiting for element visibility or conditions"
            },
            {
                  "id": "c",
                  "text": "Increase the test script execution speed"
            },
            {
                  "id": "d",
                  "text": "Restart the mobile device after every test case"
            }
      ],
      "correct": "b",
      "explanation": "Network latency is unpredictable in mobile environments. Relying on fixed sleep times is fragile. Instead, implementing explicit waits (like `waitForDisplayed` or `FluentWait`) ensures the test script synchronizes with the actual state of the application, eliminating race conditions."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-errors-en',
        topic: 'E2E Test Scenario',
        questions: [
          {
            level: 'basic',
            q: 'What is the difference between implicit wait and explicit wait in Appium?',
            a: 'Implicit wait sets a global wait time for all findElement calls. Explicit wait waits for a specific condition (until visible, until clickable). Using implicit wait can slow down tests and mask real errors. Best practice: set implicit wait to 0, use explicit wait at each critical step.',
          },
          {
            level: 'intermediate',
            q: 'How do you access elements inside a WebView in a hybrid app?',
            a: 'Context switching is required. First list available contexts: driver.getContextHandles(). Then switch to WebView context: driver.context("WEBVIEW_com.example.app"). Now Selenium locators (By.cssSelector, By.xpath) work. To go back: driver.context("NATIVE_APP"). In Java: ((AppiumDriver)driver).context("WEBVIEW_xxx")',
            code: `// Java — Context Switching
Set<String> contexts = driver.getContextHandles();
// Output: [NATIVE_APP, WEBVIEW_com.example.app]
driver.context("WEBVIEW_com.example.app");
driver.findElement(By.cssSelector("#loginBtn")).click(); // Web selector works!
driver.context("NATIVE_APP"); // Back to native`,
          },
          {
            level: 'advanced',
            q: 'What is needed to make test results reliably run in a CI/CD (Jenkins) environment?',
            a: 'CI/CD considerations: 1) Start headless emulator: emulator -avd Pixel_7 -no-window -no-snapshot. 2) Start Appium server in background and verify it\'s ready. 3) Prevent port conflicts with --port flag. 4) Add reporting tools like Allure/Extent. 5) For test parallelization use multiple emulators or cloud device farm (BrowserStack, Sauce Labs). 6) Fetch test data from DB, avoid hardcoding.',
          },
        ],
      },
      {
        type: 'simulation',
        icon: '👆',
        color: '#3b82f6',
        title: { tr: 'Mobil Swipe — Touch Action Simülasyonu', en: 'Mobile Swipe — Touch Action Simulation' },
        scenario: 'appium-swipe',
        description: {
          tr: '"▶ Swipe" butonuna bas ve W3C Actions API\'nin parmak dokunuşunu (pointerDown → move → pointerUp) nasıl koordinatlara çevirip listeyi kaydırdığını izle.',
          en: 'Click "▶ Swipe" and watch how the W3C Actions API turns a finger touch (pointerDown → move → pointerUp) into coordinates that scroll the list.',
        },
        code: `// Java — Swipe with W3C Actions API (Appium 3.x)
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence swipe = new Sequence(finger, 0);

swipe.addAction(finger.createPointerMove(
    Duration.ZERO, PointerInput.Origin.viewport(), 540, 1600));
swipe.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
swipe.addAction(finger.createPointerMove(
    Duration.ofMillis(600), PointerInput.Origin.viewport(), 540, 400));
swipe.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

driver.perform(Collections.singletonList(swipe));

// Shortcut: old TouchAction API is deprecated, use W3C Actions instead
// new TouchAction(driver).press(...).waitAction(...).moveTo(...).release().perform(); // DEPRECATED`,
      },
    ],
  },
}

// ─── SECTION 5: YAYGIN HATALAR ───────────────────────────────────────────────
const section5 = {
  tr: {
    title: '🚨 Yaygın Hatalar & Çözümleri',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔧',
        content: 'Appium hataları ilk bakışta korkutucu görünür ama hepsinin belirli bir sebebi ve kesin çözümü vardır. Bu bölümdeki hataları bir kere gördüğünüzde bir daha aynı tuzağa düşmezsiniz. Her hata için: neden olur → nasıl çözülür → doğru kod nasıl yazılır.',
      },
      {
        type: 'error-dictionary',
          relatedTopicId: 'appium-errors-en',
        framework: 'Appium 3.x',
        errors: [
          {
            error: 'SecurityFeatureFlagNotEnabledError',
            fullMessage: 'An unknown server-side error occurred while processing the command. Original error: Security feature "adb_shell" is not enabled',
            cause: { tr: 'Appium 3 güvenlik bayraklarını varsayılan olarak devre dışı bırakır. "adb_shell" gibi güvenlik gerektiren feature\'lar açıkça izin verilmedikçe çalışmaz.', en: 'Appium 3 disables security features by default. Features like "adb_shell" require explicit permission.' },
            solution: { tr: 'Appium server başlatılırken --allow-insecure flag\'i eklenmeli ya da wdio.conf.ts\'de allowInsecure dizisine eklenmeli.', en: 'Add --allow-insecure flag when starting Appium server, or add to allowInsecure array in wdio.conf.ts.' },
            codeWrong: `# Yanlış: Sadece appium başlat
appium`,
            codeFixed: `# Doğru: --allow-insecure ile başlat
appium --allow-insecure=adb_shell,chromedriver_autodownload

# wdio.conf.ts'de:
services: [['appium', {
  args: { allowInsecure: ['adb_shell', 'chromedriver_autodownload'] }
}]]`,
          },
          {
            error: 'NoSuchElementException',
            fullMessage: 'org.openqa.selenium.NoSuchElementException: An element could not be located on the page using the given search parameters',
            cause: { tr: 'Element henüz DOM\'da yok (async yükleme), locator yanlış, yanlış context (native vs webview), element görünür ama tıklanamaz.', en: 'Element not yet in DOM (async loading), wrong locator, wrong context, element visible but not interactable.' },
            solution: { tr: 'Explicit wait ekle, Appium Inspector ile locator doğrula, context\'i kontrol et, element scrollable alanda mı kontrol et.', en: 'Add explicit wait, verify locator with Appium Inspector, check context, check if element is in scrollable area.' },
            codeWrong: `// Yanlış: Wait yok, element henüz yüklenmemiş olabilir
driver.findElement(AppiumBy.id("com.example:id/btn_login")).click();`,
            codeFixed: `// Doğru: Explicit wait ile bekle
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
WebElement btn = wait.until(
    ExpectedConditions.elementToBeClickable(
        AppiumBy.id("com.example:id/btn_login")
    )
);
btn.click();`,
          },
          {
            error: 'SessionNotCreatedException',
            fullMessage: 'org.openqa.selenium.SessionNotCreatedException: Unable to create a new remote session',
            cause: { tr: 'Appium server çalışmıyor, yanlış port, emülatör başlatılmamış veya bağlı değil, capability hatalı (örn. appPackage yok).', en: 'Appium server not running, wrong port, emulator not started/connected, wrong capabilities.' },
            solution: { tr: '1) appium server çalışıyor mu kontrol et. 2) adb devices ile emülatör bağlı mı kontrol et. 3) appium-doctor --android çalıştır. 4) URL ve port numarasını kontrol et.', en: '1) Check if appium server is running. 2) Check adb devices for connected emulator. 3) Run appium-doctor --android. 4) Check URL and port number.' },
            codeWrong: `// Yanlış: Emülatör başlatılmadan test çalıştırma
// Önce emülatörü başlatmadınız!
AndroidDriver driver = new AndroidDriver(
    new URL("http://127.0.0.1:4723"), options
);`,
            codeFixed: `# Sırayla yapılmalı:
# 1. Emülatörü başlat
emulator -avd Pixel_7_API_33 &
adb wait-for-device

# 2. Appium server başlat
appium &

# 3. Sonra testi çalıştır
mvn test`,
          },
          {
            error: 'InvalidArgumentException: appium:prefix missing',
            fullMessage: 'Appium 3: "appPackage" is not a valid W3C capability — did you mean "appium:appPackage"?',
            cause: { tr: 'Appium 2\'den kalma kod Appium 3 ile çalıştırılıyor. Appium-specific capability\'lere "appium:" prefix eklenmemiş.', en: 'Code written for Appium 2 running on Appium 3. Appium-specific capabilities missing "appium:" prefix.' },
            solution: { tr: 'Tüm Appium-specific capability\'lere "appium:" prefix ekle. W3C standart olanlar (platformName, deviceName) prefix almaz.', en: 'Add "appium:" prefix to all Appium-specific capabilities. W3C standard ones (platformName, deviceName) do not need prefix.' },
            codeWrong: `// Appium 2 kodu — Appium 3'te çalışmaz!
DesiredCapabilities caps = new DesiredCapabilities();
caps.setCapability("appPackage", "com.example.app");   // ❌
caps.setCapability("appActivity", ".MainActivity");     // ❌
caps.setCapability("automationName", "UiAutomator2");  // ❌`,
            codeFixed: `// Appium 3 — UiAutomator2Options kullan (prefix otomatik eklenir)
UiAutomator2Options options = new UiAutomator2Options()
    .setAppPackage("com.example.app")       // ✅ otomatik "appium:" ekler
    .setAppActivity(".MainActivity")         // ✅
    .setAutomationName("UiAutomator2");     // ✅`,
          },
          {
            error: 'ADB Connection / ANDROID_HOME Error',
            fullMessage: 'Error: ANDROID_HOME is not set or "adb" not found in PATH',
            cause: { tr: 'ANDROID_HOME environment variable tanımlanmamış veya yanlış dizini gösteriyor. PATH\'de adb yok.', en: 'ANDROID_HOME environment variable not set or pointing to wrong directory. adb not in PATH.' },
            solution: { tr: 'ANDROID_HOME\'u Android SDK klasörüne set et. Platform-tools klasörünü PATH\'e ekle. Terminal/IDE\'yi yeniden başlat. appium-doctor --android ile doğrula.', en: 'Set ANDROID_HOME to Android SDK folder. Add platform-tools to PATH. Restart terminal/IDE. Verify with appium-doctor --android.' },
            codeWrong: `# Kontrol: adb bulunamıyor
$ adb devices
bash: adb: command not found`,
            codeFixed: `# Mac/Linux: ~/.zshrc veya ~/.bashrc dosyasına ekle
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

# Windows (PowerShell admin olarak):
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME","$env:LOCALAPPDATA\\Android\\Sdk","Machine")

# Sonra terminali yeniden başlat ve test et:
adb devices   # emülatör görünmeli`,
          },
          {
            error: 'CI/CD Jenkins: No display / emulator error',
            fullMessage: 'WARN: Emulator requires display. Try -no-window flag or Xvfb.',
            cause: { tr: 'Jenkins çoğunlukla headless sunucularda çalışır (display yok). Android emülatörü varsayılan olarak GUI gerektirir.', en: 'Jenkins usually runs on headless servers (no display). Android emulator requires GUI by default.' },
            solution: { tr: '-no-window ve -no-audio flag\'leri ile emülatörü headless başlat. Alternatif: cloud device farm (BrowserStack, Sauce Labs) kullan.', en: 'Start emulator headless with -no-window and -no-audio flags. Alternative: use cloud device farm (BrowserStack, Sauce Labs).' },
            codeWrong: `// Jenkins pipeline'da yanlış:
sh 'emulator -avd Pixel_7_API_33'  // GUI gerektirir, Jenkins'te başarısız`,
            codeFixed: `// Jenkins pipeline'da doğru (Jenkinsfile):
stage('Start Emulator') {
    steps {
        sh '''
            emulator -avd Pixel_7_API_33 \\
                -no-window -no-audio -no-snapshot-load \\
                -gpu swiftshader_indirect &
            adb wait-for-device shell getprop sys.boot_completed
        '''
    }
}
stage('Run Appium Tests') {
    steps {
        sh 'appium &'
        sh 'sleep 5'  // server hazır olsun
        sh 'mvn test -Dsurefire.failIfNoSpecifiedTests=false'
    }
}`,
          },
        ],
      },
      { type: 'heading', text: 'Hızlı Hata Tanı Tablosu' },
      {
        type: 'table',
        headers: ['Hata Mesajı (kısa)', 'İlk Kontrol', 'Hızlı Çözüm'],
        rows: [
          ['NoSuchElementException', 'Explicit wait var mı?', 'WebDriverWait + visibilityOf ekle'],
          ['SessionNotCreatedException', 'adb devices çıktısı?', 'Önce emülatör başlat, sonra Appium'],
          ['SecurityFeatureFlagNotEnabled', '--allow-insecure var mı?', 'appium --allow-insecure=adb_shell'],
          ['InvalidArgumentException prefix', 'Appium versiyonu?', '"appium:" prefix ekle'],
          ['ANDROID_HOME not set', 'env variable set mi?', 'Export et, terminali yeniden başlat'],
          ['Connection refused 4723', 'Appium server çalışıyor mu?', 'appium komutu ile başlat'],
          ['StaleElementReferenceException', 'Element DOM\'dan kalktı mı?', 'findElement tekrar çağır'],
        ],
      },
      {
        type: 'quiz',
        question: '"Security feature flag is not enabled" hatasının çözümü nedir?',
        options: [
          { id: 'a', text: 'Appium\'u yeniden kur' },
          { id: 'b', text: 'appium --allow-insecure=adb_shell ile server başlat' },
          { id: 'c', text: 'ANDROID_HOME değişkenini düzelt' },
          { id: 'd', text: 'Node.js güncelle' },
        ],
        correct: 'b',
        explanation: 'Appium 3 güvenlik açısından varsayılan olarak kısıtlayıcıdır. adb_shell, chromedriver_autodownload gibi feature\'lar için --allow-insecure flag\'i gereklidir. wdio.conf.ts\'de services altında allowInsecure array\'ine eklenebilir. Üretimde sadece gerçekten gerekli olan feature\'lar izin listesine eklenmeli.',
      
        retryQuestion: {
      "question": "Appium testlerinde 'chromedriver_autodownload' özelliğini kullanırken karşılaşılan \"Security feature flag is not enabled\" hatasını gidermek için hangi yöntem izlenmelidir?",
      "options": [
            {
                  "id": "a",
                  "text": "Appium driverlarını güncelle"
            },
            {
                  "id": "b",
                  "text": "--allow-insecure=chromedriver_autodownload bayrağı ile server'ı çalıştır"
            },
            {
                  "id": "c",
                  "text": "JAVA_HOME yolunu kontrol et"
            },
            {
                  "id": "d",
                  "text": "Cihazın USB hata ayıklama modunu kapat"
            }
      ],
      "correct": "b",
      "explanation": "Appium, güvenlik gerekçesiyle belirli gelişmiş komutları varsayılan olarak devre dışı bırakır. ChromeDriver'ın otomatik indirilmesi gibi özellikler, risk oluşturabileceği için --allow-insecure flag'i ile açıkça izin verilmesini gerektirir."
}
},
      {
        type: 'quiz',
        question: 'StaleElementReferenceException alındığında ne yapılmalıdır?',
        options: [
          { id: 'a', text: 'Uygulamayı yeniden başlat' },
          { id: 'b', text: 'Element DOM\'dan kalkmış — findElement tekrar çağırarak taze referans al' },
          { id: 'c', text: 'XPath locator kullan' },
          { id: 'd', text: 'Thread.sleep ekle' },
        ],
        correct: 'b',
        explanation: 'StaleElementReferenceException, önceden bulunan bir elemana atıfta bulunulduğunda ancak o element artık DOM\'da olmadığında oluşur (sayfa yenilendi, animation, RecyclerView). Çözüm: findElement\'i tekrar çağırarak taze referans almak. POM getter\'lar bunu otomatik çözer çünkü her seferinde yeni element bulur.',
      
        retryQuestion: {
      "question": "Sayfa yenilenmesi veya dinamik içerik güncellenmesi sırasında \"StaleElementReferenceException\" hatası alınıyorsa, en doğru yaklaşım nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Test betiğine daha uzun bekleme süreleri (implicit wait) eklemek"
            },
            {
                  "id": "b",
                  "text": "Elemente erişmeye çalışmadan önce elemanı tekrar findElement metoduyla bulmak"
            },
            {
                  "id": "c",
                  "text": "Testi try-catch bloğuna alıp uygulamayı kapatıp açmak"
            },
            {
                  "id": "d",
                  "text": "Locator stratejisini CSS Selector yerine XPath olarak değiştirmek"
            }
      ],
      "correct": "b",
      "explanation": "StaleElementReferenceException, referans alınan elementin artık DOM üzerinde bulunmadığını gösterir. DOM yapısı değiştiği için, elementin güncel referansını almak adına findElement komutunu tekrar çalıştırmak hatayı kalıcı olarak çözer."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-tr-setup',
        topic: 'Hata Ayıklama',
        questions: [
          {
            level: 'basic',
            q: 'Appium testiniz "Unable to connect to server" hatası verdiğinde ilk ne yaparsınız?',
            a: '1) Appium server\'ın çalışıp çalışmadığını kontrol et: http://127.0.0.1:4723/status adresini tarayıcıda aç, {"status":0} görünmeli. 2) Port numarasını doğrula (4723 mi kullanılıyor?). 3) Emülatörün çalışıp çalışmadığını kontrol et: adb devices. 4) Firewall\'ın portu bloklayıp bloklamadığını kontrol et.',
          },
          {
            level: 'intermediate',
            q: 'Appium Inspector\'da element bulunuyor ama testte bulunamıyor. Sebebi ne olabilir?',
            a: '1) Zamanlama sorunu: Inspector\'da element statik haldeyken testte dinamik yükleniyor olabilir. 2) Context sorunu: Inspector native context\'teyken test WebView context\'inde çalışıyor olabilir (veya tersi). 3) Locator sorunu: resource-id uygulamanın farklı build\'ında değişmiş olabilir. 4) Screen orientation: Inspector\'da portrait, testte landscape mode. 5) Cihaz farkı: farklı Android versiyonu veya ekran boyutu.',
          },
          {
            level: 'advanced',
            q: 'Flaky testleri sistematik olarak nasıl azaltırsınız?',
            a: '1) Her critical step\'te explicit wait kullan (implicit wait\'i 0\'a set et). 2) Sleep kullanma, koşula dayalı bekle. 3) Test verilerini izole et (her test kendi verisini oluşturur). 4) Retry mekanizması ekle (WebdriverIO\'da maxInstances + retry config). 5) Screenshot on failure (debug için). 6) Appium log seviyesini debug\'a al ve analiz et. 7) Test ortamını izole et (diğer uygulamalar background\'da olmasın).',
          },
        ],
      },
    ],
  },
  en: {
    title: '🚨 Common Errors & Solutions',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔧',
        content: 'Appium errors look scary at first but each has a specific cause and definite solution. Once you\'ve seen these errors, you won\'t fall into the same traps again. For each error: why it happens → how to fix → correct code.',
      },
      {
        type: 'error-dictionary',
          relatedTopicId: 'appium-errors-tr',
        framework: 'Appium 3.x',
        errors: [
          {
            error: 'SecurityFeatureFlagNotEnabledError',
            fullMessage: 'An unknown server-side error occurred while processing the command. Original error: Security feature "adb_shell" is not enabled',
            cause: { tr: 'Appium 3 güvenlik bayraklarını varsayılan olarak devre dışı bırakır.', en: 'Appium 3 disables security features by default. Features like "adb_shell" require explicit permission to use.' },
            solution: { tr: '--allow-insecure flag\'i ekle.', en: 'Add --allow-insecure flag when starting Appium server, or add to allowInsecure array in wdio.conf.ts.' },
            codeWrong: `# Wrong: Start appium with no flags
appium`,
            codeFixed: `# Correct: Start with --allow-insecure
appium --allow-insecure=adb_shell,chromedriver_autodownload

# In wdio.conf.ts:
services: [['appium', {
  args: { allowInsecure: ['adb_shell', 'chromedriver_autodownload'] }
}]]`,
          },
          {
            error: 'NoSuchElementException',
            fullMessage: 'org.openqa.selenium.NoSuchElementException: An element could not be located on the page using the given search parameters',
            cause: { tr: 'Element henüz DOM\'da yok (async yükleme), locator yanlış, yanlış context (native vs webview), element görünür ama tıklanamaz.', en: 'Element not yet in DOM (async loading), wrong locator, wrong context (native vs webview), element visible but not interactable.' },
            solution: { tr: 'Explicit wait ekle, Appium Inspector ile locator doğrula, context\'i kontrol et.', en: 'Add explicit wait, verify locator with Appium Inspector, check context, check if element is in scrollable area.' },
            codeWrong: `// Wrong: No wait — element may not be loaded yet
driver.findElement(AppiumBy.id("com.example:id/btn_login")).click();`,
            codeFixed: `// Correct: Use explicit wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
WebElement btn = wait.until(
    ExpectedConditions.elementToBeClickable(
        AppiumBy.id("com.example:id/btn_login")
    )
);
btn.click();`,
          },
          {
            error: 'SessionNotCreatedException',
            fullMessage: 'org.openqa.selenium.SessionNotCreatedException: Unable to create a new remote session',
            cause: { tr: 'Appium server çalışmıyor, yanlış port, emülatör başlatılmamış, capability hatalı.', en: 'Appium server not running, wrong port, emulator not started or connected, wrong capabilities (e.g. missing appPackage).' },
            solution: { tr: '1) appium server çalışıyor mu kontrol et. 2) adb devices ile emülatör bağlı mı kontrol et. 3) appium-doctor --android çalıştır.', en: '1) Check if appium server is running. 2) Check adb devices for connected emulator. 3) Run appium-doctor --android. 4) Verify URL and port number.' },
            codeWrong: `// Wrong: Running test without starting emulator first!
AndroidDriver driver = new AndroidDriver(
    new URL("http://127.0.0.1:4723"), options
);`,
            codeFixed: `# Do in this order:
# 1. Start emulator
emulator -avd Pixel_7_API_33 &
adb wait-for-device

# 2. Start Appium server
appium &

# 3. Then run tests
mvn test`,
          },
          {
            error: 'InvalidArgumentException: appium:prefix missing',
            fullMessage: 'Appium 3: "appPackage" is not a valid W3C capability — did you mean "appium:appPackage"?',
            cause: { tr: 'Appium 2\'den kalma kod Appium 3 ile çalıştırılıyor.', en: 'Code written for Appium 2 running on Appium 3. Appium-specific capabilities missing "appium:" prefix.' },
            solution: { tr: 'Tüm Appium-specific capability\'lere "appium:" prefix ekle.', en: 'Add "appium:" prefix to all Appium-specific capabilities. W3C standard ones (platformName, deviceName) do not need prefix.' },
            codeWrong: `// Appium 2 code — doesn't work in Appium 3!
DesiredCapabilities caps = new DesiredCapabilities();
caps.setCapability("appPackage", "com.example.app");   // ❌
caps.setCapability("appActivity", ".MainActivity");     // ❌
caps.setCapability("automationName", "UiAutomator2");  // ❌`,
            codeFixed: `// Appium 3 — use UiAutomator2Options (prefix added automatically)
UiAutomator2Options options = new UiAutomator2Options()
    .setAppPackage("com.example.app")       // ✅ auto-adds "appium:"
    .setAppActivity(".MainActivity")         // ✅
    .setAutomationName("UiAutomator2");     // ✅`,
          },
          {
            error: 'ADB Connection / ANDROID_HOME Error',
            fullMessage: 'Error: ANDROID_HOME is not set or "adb" not found in PATH',
            cause: { tr: 'ANDROID_HOME environment variable tanımlanmamış veya yanlış dizini gösteriyor.', en: 'ANDROID_HOME environment variable not set or pointing to wrong directory. adb not in PATH.' },
            solution: { tr: 'ANDROID_HOME\'u Android SDK klasörüne set et, platform-tools\'u PATH\'e ekle.', en: 'Set ANDROID_HOME to Android SDK folder. Add platform-tools to PATH. Restart terminal/IDE. Verify with appium-doctor --android.' },
            codeWrong: `# Check: adb not found
$ adb devices
bash: adb: command not found`,
            codeFixed: `# Mac/Linux: Add to ~/.zshrc or ~/.bashrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

# Windows (PowerShell as admin):
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME","$env:LOCALAPPDATA\\Android\\Sdk","Machine")

# Then restart terminal and test:
adb devices   # emulator should appear`,
          },
          {
            error: 'CI/CD Jenkins: No display / emulator error',
            fullMessage: 'WARN: Emulator requires display. Try -no-window flag or Xvfb.',
            cause: { tr: 'Jenkins çoğunlukla headless sunucularda çalışır (display yok). Android emülatörü varsayılan olarak GUI gerektirir.', en: 'Jenkins usually runs on headless servers (no display). Android emulator requires GUI by default.' },
            solution: { tr: '-no-window ve -no-audio flag\'leri ile emülatörü headless başlat.', en: 'Start emulator headless with -no-window and -no-audio flags. Alternative: use cloud device farm (BrowserStack, Sauce Labs).' },
            codeWrong: `// Wrong in Jenkins pipeline:
sh 'emulator -avd Pixel_7_API_33'  // Requires GUI, fails on Jenkins`,
            codeFixed: `// Correct in Jenkins pipeline (Jenkinsfile):
stage('Start Emulator') {
    steps {
        sh '''
            emulator -avd Pixel_7_API_33 \\
                -no-window -no-audio -no-snapshot-load \\
                -gpu swiftshader_indirect &
            adb wait-for-device shell getprop sys.boot_completed
        '''
    }
}
stage('Run Appium Tests') {
    steps {
        sh 'appium &'
        sh 'sleep 5'  // wait for server to be ready
        sh 'mvn test -Dsurefire.failIfNoSpecifiedTests=false'
    }
}`,
          },
        ],
      },
      { type: 'heading', text: 'Quick Diagnosis Table' },
      {
        type: 'table',
        headers: ['Error (short)', 'First Check', 'Quick Fix'],
        rows: [
          ['NoSuchElementException', 'Is explicit wait present?', 'Add WebDriverWait + visibilityOf'],
          ['SessionNotCreatedException', 'adb devices output?', 'Start emulator first, then Appium'],
          ['SecurityFeatureFlagNotEnabled', '--allow-insecure present?', 'appium --allow-insecure=adb_shell'],
          ['InvalidArgumentException prefix', 'Appium version?', 'Add "appium:" prefix'],
          ['ANDROID_HOME not set', 'env variable set?', 'Export it, restart terminal'],
          ['Connection refused 4723', 'Is Appium server running?', 'Start with appium command'],
          ['StaleElementReferenceException', 'Did element leave DOM?', 'Call findElement again'],
        ],
      },
      {
        type: 'quiz',
        question: 'What is the solution to "Security feature flag is not enabled" error?',
        options: [
          { id: 'a', text: 'Reinstall Appium' },
          { id: 'b', text: 'Start server with: appium --allow-insecure=adb_shell' },
          { id: 'c', text: 'Fix ANDROID_HOME variable' },
          { id: 'd', text: 'Update Node.js' },
        ],
        correct: 'b',
        explanation: 'Appium 3 is restrictive by default for security. Features like adb_shell and chromedriver_autodownload require the --allow-insecure flag. In wdio.conf.ts, add to the allowInsecure array under services. In production, only add actually needed features to the allow list.',
      
        retryQuestion: {
      "question": "Which configuration step is necessary when encountering a \"Security feature flag is not enabled\" error while trying to execute shell commands via Appium?",
      "options": [
            {
                  "id": "a",
                  "text": "Enable Developer Mode on the emulator"
            },
            {
                  "id": "b",
                  "text": "Add 'adb_shell' to the allow-insecure list in Appium server arguments"
            },
            {
                  "id": "c",
                  "text": "Upgrade the Appium inspector tool"
            },
            {
                  "id": "d",
                  "text": "Clear the Appium cache folder"
            }
      ],
      "correct": "b",
      "explanation": "To maintain a secure environment, Appium blocks potentially dangerous commands by default. Adding specific features like 'adb_shell' to the allow-insecure list explicitly authorizes the server to execute those commands."
}
},
      {
        type: 'quiz',
        question: 'What should you do when StaleElementReferenceException occurs?',
        options: [
          { id: 'a', text: 'Restart the application' },
          { id: 'b', text: 'Element left DOM — call findElement again to get fresh reference' },
          { id: 'c', text: 'Use XPath locator' },
          { id: 'd', text: 'Add Thread.sleep' },
        ],
        correct: 'b',
        explanation: 'StaleElementReferenceException occurs when referencing a previously found element that is no longer in the DOM (page refreshed, animation, RecyclerView). Solution: call findElement again to get a fresh reference. POM getters solve this automatically because they find a new element each time.',
      
        retryQuestion: {
      "question": "What is the recommended way to handle a StaleElementReferenceException in Selenium automation?",
      "options": [
            {
                  "id": "a",
                  "text": "Clear the browser cache and cookies"
            },
            {
                  "id": "b",
                  "text": "Re-locate the element using findElement before performing the next action"
            },
            {
                  "id": "c",
                  "text": "Set a higher value for the implicit wait"
            },
            {
                  "id": "d",
                  "text": "Change the locator strategy from CSS to ID"
            }
      ],
      "correct": "b",
      "explanation": "StaleElementReferenceException indicates the DOM has changed, rendering your existing element reference invalid. To fix this, you must re-identify the element using the driver instance, ensuring you have the updated reference to the new element node."
}
},
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-tr',
        topic: 'Debugging',
        questions: [
          {
            level: 'basic',
            q: 'What do you do first when your Appium test throws "Unable to connect to server"?',
            a: '1) Check if Appium server is running: open http://127.0.0.1:4723/status in browser — should show {"status":0}. 2) Verify port number (is 4723 being used?). 3) Check if emulator is running: adb devices. 4) Check if firewall is blocking the port.',
          },
          {
            level: 'intermediate',
            q: 'Element is found in Appium Inspector but not found in tests. What could be the cause?',
            a: '1) Timing issue: static in Inspector but dynamically loaded in tests. 2) Context issue: Inspector in native context but test in WebView context (or vice versa). 3) Locator issue: resource-id changed in a different build. 4) Screen orientation: Inspector in portrait, test in landscape. 5) Device difference: different Android version or screen size.',
          },
          {
            level: 'advanced',
            q: 'How do you systematically reduce flaky tests?',
            a: '1) Use explicit wait at every critical step (set implicit wait to 0). 2) Never use sleep, wait on conditions instead. 3) Isolate test data (each test creates its own data). 4) Add retry mechanism (WebdriverIO: specFileRetries: 2). 5) Screenshot on failure (for debugging). 6) Set Appium log level to debug and analyze. 7) Isolate test environment (no other apps in background).',
          },
        ],
      },
    ],
  },
}

// ─── SECTION 6: 50 MÜLAKAT SORUSU ────────────────────────────────────────────
const section6 = {
  tr: {
    title: '💼 50 Soruluk Kapsamlı Mülakat Simülasyonu',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎯',
        content: 'Bu bölümde 50 mülakat sorusu kademeli zorlukta verilmiştir: 1-15 Temel, 16-35 Orta, 36-50 İleri Seviye. Her soruya tıklayarak cevabı görün. Gerçek mülakata hazırlanmak için kendinizi sınayın: önce cevabı kendiniz düşünün, sonra açın.',
      },
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-tr',
        topic: 'Temel Sorular (1–15)',
        questions: [
          { level: 'basic', q: '1. Appium nedir ve hangi platformları destekler?', a: 'Appium, iOS, Android ve Windows masaüstü uygulamalarını test etmek için açık kaynaklı bir otomasyon aracıdır. W3C WebDriver protokolünü kullanır. Gerçek cihaz, emülatör (Android) ve simülatör (iOS) üzerinde çalışır. Java, Python, JavaScript, Ruby gibi birden fazla dili destekler.' },
          { level: 'basic', q: '2. Selenium ile Appium arasındaki temel fark nedir?', a: 'Selenium web tarayıcılarını, Appium ise mobil uygulamaları (native, hybrid, web) test eder. Her ikisi de WebDriver protokolünü kullanır. Appium\'da ek olarak platform-specific driver (UIAutomator2, XCUITest) ve mobil cihaz yönetimi gerekir. Appium\'un Java client\'ı (java-client) Selenium\'u extend eder.' },
          { level: 'basic', q: '3. UIAutomator2 nedir?', a: 'UIAutomator2, Google\'ın geliştirdiği Android UI test framework\'üdür. Appium\'un Android uygulamalarıyla iletişim kurmasını sağlayan köprüdür. "appium driver install uiautomator2" ile ayrı kurulur. Alternatif Android driver\'ları: Espresso (daha hızlı, unit test entegrasyonu), UIAutomator1 (eski).' },
          { level: 'basic', q: '4. XCUITest nedir?', a: 'XCUITest, Apple\'ın iOS uygulamaları için geliştirdiği UI test framework\'üdür. Appium iOS testlerinde bu framework\'ü kullanır. Sadece macOS\'ta çalışır. "appium driver install xcuitest" ile kurulur. Gerçek iOS cihaz testleri için Apple Developer hesabı ve code signing gerekebilir.' },
          { level: 'basic', q: '5. Desired Capabilities ne için kullanılır?', a: 'Desired Capabilities, Appium\'a test oturumu başlatmadan önce gönderilen konfigürasyon parametreleridir: hangi platformda (Android/iOS), hangi cihazda, hangi uygulamayı, hangi otomasyon engine\'i ile test edeceğimizi belirtir. Appium 3\'te Appium-specific olanlar "appium:" prefix alır.' },
          { level: 'basic', q: '6. Appium Server hangi port\'ta çalışır?', a: 'Varsayılan port 4723\'tür. --port flag\'i ile değiştirilebilir: "appium --port 4724". Birden fazla Appium server çalıştırırken (paralel test) farklı portlar kullanılır. Appium 3\'te status endpoint: http://127.0.0.1:4723/status' },
          { level: 'basic', q: '7. "appium driver list --installed" komutu ne gösterir?', a: 'Sisteme kurulu Appium driver\'larını listeler. Örnek çıktı: uiautomator2@3.x.x, xcuitest@7.x.x. Bu komut, hangi platformları test edebileceğinizi gösterir. Driver kuruluysa test çalıştırılabilir, değilse "driver not found" hatası alınır.' },
          { level: 'basic', q: '8. adb nedir ve Appium ile ilişkisi nedir?', a: 'adb (Android Debug Bridge), Android cihaz/emülatörüyle iletişim kuran komut satırı aracıdır. Uygulama yükleme/kaldırma, log alma, shell komutları çalıştırma gibi işlemler yapar. Appium, Android testlerinde arka planda adb kullanır. "adb devices" komutu bağlı cihazları listeler.' },
          { level: 'basic', q: '9. Appium Inspector ne işe yarar?', a: 'Appium Inspector, mobil uygulama ekranının XML yapısını görselleştiren ve element locator\'larını bulmaya yarayan bir araçtır. Ekrandaki herhangi bir elemana tıkladığınızda resource-id, content-desc, class name gibi locator bilgilerini gösterir. Appium 3\'te plugin olarak veya standalone uygulama olarak kullanılır.' },
          { level: 'basic', q: '10. noReset, fullReset, fastReset capability\'leri ne anlama gelir?', a: 'noReset: true = test bitiminde uygulama verisini korur. noReset: false (varsayılan) = uygulama verisini siler. fullReset: true = uygulamayı tamamen kaldırır ve yeniden kurar (en temiz ama en yavaş). fastReset: uygulama verisini adb pm clear ile temizler, uygulamayı kaldırmaz.' },
          { level: 'basic', q: '11. Appium 3\'te capability\'lerde "appium:" prefix neden zorunlu oldu?', a: 'W3C WebDriver standardı, vendor-specific capability\'lerin bir prefix ile ayrılmasını zorunlu kılar. Appium 2\'de bu kural esnek uygulanıyordu. Appium 3 ile W3C uyumluluğu sıkılaştırıldı. Tüm Appium-specific capability\'ler artık "appium:" prefix almalı. Bu, farklı vendor\'ların capability\'lerinin çakışmasını önler.' },
          { level: 'basic', q: '12. Appium client ve Appium server arasındaki iletişim nasıl gerçekleşir?', a: 'HTTP/HTTPS protokolü üzerinden JSON Wire Protocol (W3C WebDriver) kullanılır. Test kodu HTTP POST/GET istekleri gönderir (örn. POST /session, POST /session/{id}/element). Server bu istekleri platform driver\'ına iletir. Her session\'ın benzersiz bir session ID\'si vardır.' },
          { level: 'basic', q: '13. Gerçek cihaz ile emülatör/simülatör arasındaki test farkı nedir?', a: 'Gerçek cihaz: Gerçek performans, sensörler (GPS, kamera), ağ koşulları çalışır; ancak pahalı ve yönetimi zor. Emülatör: Ucuz, paralel çalıştırılabilir, farklı Android versiyonları kolay; ancak gerçek donanımı simüle edemez, bazı sensörler (fingerprint, NFC) sınırlı. CI/CD\'de genellikle emülatör tercih edilir.' },
          { level: 'basic', q: '14. Appium\'da implicit wait ve explicit wait nasıl kullanılır?', a: 'Implicit wait: driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10)); — tüm findElement çağrıları için global bekleme. Explicit wait: WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15)); wait.until(ExpectedConditions.visibilityOf(element)); — belirli koşul için bekleme. Best practice: implicit wait\'i 0 bırak, explicit wait kullan.' },
          { level: 'basic', q: '15. Appium testlerinde POM (Page Object Model) neden kullanılmalıdır?', a: 'POM, test bakımını kolaylaştırır. Uygulama UI değiştiğinde sadece ilgili page class güncellenmelidir, tüm testler değil. Kod tekrarını azaltır. Test senaryoları daha okunabilir ve iş mantığına odaklanır. Locator\'lar merkezi yerde tanımlanır. Selenium\'daki PageFactory pattern Appium\'da da (AppiumFieldDecorator ile) kullanılabilir.' },
        ],
      },
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-tr',
        topic: 'Orta Seviye Sorular (16–35)',
        questions: [
          { level: 'intermediate', q: '16. Context switching nedir? Hybrid uygulamada nasıl yapılır?', a: 'Hybrid uygulamalar hem native UI hem de WebView içerir. Context switching, test kodunun native ve web context arasında geçiş yapmasını sağlar. Java: Set<String> contexts = driver.getContextHandles(); // [NATIVE_APP, WEBVIEW_xxx] driver.context("WEBVIEW_xxx"); // Web elementlere erişim driver.context("NATIVE_APP"); // Geri dön', code: `// Java
Set<String> ctx = driver.getContextHandles();
driver.context("WEBVIEW_com.example.app");
driver.findElement(By.cssSelector("#loginBtn")).click();
driver.context("NATIVE_APP");` },
          { level: 'intermediate', q: '17. TouchAction ve W3C Actions API farkı nedir?', a: 'TouchAction Appium 1/2\'nin eski API\'ıdır, Appium 3\'te deprecated. W3C Actions API, pointer actions için standart W3C implementasyonudur. Appium 3\'te PointerInput kullanılır. TypeScript\'te: driver.action("pointer").move({x, y}).down().up().perform(); Java\'da: Actions actions = new Actions(driver); actions.clickAndHold(element).moveByOffset(100,0).release().perform();', code: `// Java — W3C Actions (Appium 3)
Actions actions = new Actions(driver);
WebElement slider = driver.findElement(AppiumBy.id("com.ex:id/slider"));
actions.clickAndHold(slider).moveByOffset(200, 0).release().perform();` },
          { level: 'intermediate', q: '18. Appium\'da swipe nasıl yapılır?', a: 'W3C Actions API ile yapılır. Başlangıç ve bitiş koordinatları hesaplanır. Java: Actions ile PointerInput. TypeScript/WebdriverIO: driver.touchAction veya browser.action(). Alternatif: UIAutomator2\'nin UiScrollable ile scroll yapılabilir (koordinat hesaplamadan).', code: `// Java — Swipe (Aşağıdan Yukarı)
Dimension size = driver.manage().window().getSize();
int startX = size.width / 2;
int startY = (int)(size.height * 0.8);
int endY   = (int)(size.height * 0.2);
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence swipe = new Sequence(finger, 1)
    .addAction(finger.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), startX, startY))
    .addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()))
    .addAction(finger.createPointerMove(Duration.ofMillis(600), PointerInput.Origin.viewport(), startX, endY))
    .addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
driver.perform(Arrays.asList(swipe));` },
          { level: 'intermediate', q: '19. Pinch ve Zoom hareketleri nasıl yapılır?', a: 'W3C Actions API ile iki farklı parmak hareketi aynı anda gerçekleştirilir (multi-touch). İki PointerInput (finger1, finger2) oluşturulur; pinch için içe doğru, zoom için dışa doğru hareket ettirilir. Selenium Actions ile paralel sequence\'ler çalıştırılır.', code: `// Java — Pinch (Yaklaştır)
PointerInput f1 = new PointerInput(PointerInput.Kind.TOUCH, "f1");
PointerInput f2 = new PointerInput(PointerInput.Kind.TOUCH, "f2");
Sequence pinch1 = new Sequence(f1, 0)
    .addAction(f1.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), 400, 300))
    .addAction(f1.createPointerDown(PointerInput.MouseButton.LEFT.asArg()))
    .addAction(f1.createPointerMove(Duration.ofMillis(500), PointerInput.Origin.viewport(), 300, 400))
    .addAction(f1.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
// f2 için ters yön...
driver.perform(Arrays.asList(pinch1, /* pinch2 */));` },
          { level: 'intermediate', q: '20. Appium\'da ekran görüntüsü (screenshot) nasıl alınır?', a: 'Appium driver TakesScreenshot interface\'ini implement eder. Java: File src = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE); FileUtils.copyFile(src, new File("screenshot.png")); TypeScript/WebdriverIO: await browser.saveScreenshot("./screenshot.png"); CI/CD\'de başarısız testlerde otomatik screenshot almak için @AfterEach hook kullanılır.', code: `// Java — After hook'ta screenshot
@AfterEach
void screenshotOnFailure(TestInfo info) {
    File src = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
    FileUtils.copyFile(src, new File("screenshots/" + info.getDisplayName() + ".png"));
}` },
          { level: 'intermediate', q: '21. Appium\'da deep link nedir ve nasıl kullanılır?', a: 'Deep link, uygulamayı belirli bir ekranı doğrudan açmak için kullanılan URL şemasıdır (örn. myapp://product/123). Test süresini kısaltır — her teste giriş yapmak yerine direkt ürün sayfasına atlanır. Java: driver.get("myapp://cart"); TypeScript: driver.url("myapp://cart"); veya adb shell am start ile açılabilir.', code: `// Java — Deep Link
driver.get("automationexercise://product/1");
// Alternatif: adb ile
driver.executeScript("mobile: deepLink", Map.of(
    "url", "automationexercise://product/1",
    "package", "com.automationexercise.app"
));` },
          { level: 'intermediate', q: '22. Appium\'da klavye nasıl kapatılır?', a: 'Java: driver.hideKeyboard(); — tüm platformlarda çalışır. iOS\'ta bazen ek gesture gerekir. Alternatif: driver.pressKey(new KeyEvent(AndroidKey.BACK)); TypeScript: await driver.hideKeyboard(); veya await $("~done_button").click(); Klavyenin açık olup olmadığı: driver.isKeyboardShown()' },
          { level: 'intermediate', q: '23. Appium testlerinde başarısız olan testi nasıl yeniden çalıştırırsınız (retry)?', a: 'Java/TestNG: @Test(retryAnalyzer = RetryAnalyzer.class) ile retry mekanizması eklenir. Java/JUnit5: @RepeatedTest(3) veya custom extension. TypeScript/WebdriverIO: wdio.conf.ts\'de specFileRetries: 2 ayarı. CI/CD\'de test başarısız olursa pipeline tekrar tetiklenebilir. En önemli: flaky testlerin kök sebebini bulun, retry maskelemez.' },
          { level: 'intermediate', q: '24. Appium testlerinde test datası nasıl yönetilir?', a: 'Test verisi izole edilmeli: Her test kendi verisini oluşturmalı veya API ile sıfırlamalı. Sabit (hardcode) değerler yerine constants/properties dosyası. Data-driven testing için TestNG DataProvider, JUnit5 @ParameterizedTest veya CSV/Excel. Test sonrası cleanup: test oluşturduğu veriyi silmeli (teardown hook\'ta API çağrısı).' },
          { level: 'intermediate', q: '25. Appium Server log\'larını nasıl analiz edersiniz?', a: 'Appium log\'ları JSON Wire Protocol isteklerini gösterir. --log ./appium.log ile dosyaya yaz. --loglevel debug ile detaylı log al. Log\'da aranacaklar: "error", "fail", "not found". Her HTTP request/response görünür: POST /session, POST /element, POST /click. Başarısız komutlarda "value": {"error": "..."} bölümüne bak.' },
          { level: 'intermediate', q: '26. Cloud device farm nedir? Neden kullanılır?', a: 'BrowserStack, Sauce Labs, AWS Device Farm gibi servisler gerçek fiziksel cihazları bulut üzerinden test etmenizi sağlar. Avantajlar: 1) Yüzlerce gerçek cihaz/OS kombinasyonu. 2) CI/CD entegrasyonu. 3) Paralel test çalıştırma. 4) Cihaz yönetimi yok. Dezavantaj: Maliyet. Sadece Appium Server URL\'ini değiştirerek kullanılır: https://hub.browserstack.com/wd/hub' },
          { level: 'intermediate', q: '27. Appium\'da uygulama kurulu değilse otomatik nasıl kurulur?', a: '"appium:app" capability\'sine APK/IPA dosyasının mutlak yolunu veya URL\'sini ver. Her session başlangıcında Appium uygulamayı kurar. noReset: false ile uygulama verisi silinir ama uygulama silinmez. fullReset: true ile uygulama kaldırılır ve yeniden kurulur. Uygulama zaten kuruluysa appPackage+appActivity daha hızlıdır (kurulum atlanır).' },
          { level: 'intermediate', q: '28. Appium\'da permission (izin) yönetimi nasıl yapılır?', a: '"appium:autoGrantPermissions": true ile tüm izinler otomatik verilir (Android). iOS\'ta autoAcceptAlerts: true ile alert\'lere otomatik "Allow" tıklanır. Manuel: driver.executeScript("mobile: changePermissions", Map.of("permissions", "READ_CONTACTS", "action", "grant", "appPackage", "com.example")); Test başlamadan önce adb komutuyla da izin verilebilir.' },
          { level: 'intermediate', q: '29. Appium ile performans testi yapılabilir mi?', a: 'Evet, sınırlı düzeyde. driver.getPerformanceData(packageName, dataType, timeout); — CPU, memory, battery, network verisi alınır. Daha kapsamlı performans testi için: Firebase Performance Monitoring, Android Profiler, Perfecto. Appium performans testinden çok fonksiyonel test aracıdır; JMeter veya k6 gibi araçlar yük testi için daha uygun.' },
          { level: 'intermediate', q: '30. Appium testlerinde Allure raporu nasıl entegre edilir?', a: 'Maven: allure-junit5 veya allure-testng dependency. wdio.conf.ts: reporters: [["allure", {outputDir: "./allure-results"}]]. Test adımları için: @Step("Giriş yap") annotation. Başarısız testlerde screenshot eklenir. CI/CD: Allure serveri veya GitHub Pages\'e publish edilir. Rapor: allure serve ./allure-results komutuyla açılır.' },
          { level: 'intermediate', q: '31. Appium 3\'te GET /sessions yerine neden GET /appium/sessions kullanılıyor?', a: 'W3C WebDriver standardı /sessions endpoint\'ini tanımlamaz, bu Appium-specific bir endpoint\'ti. Appium 3, W3C standartlarına uyumu sıkılaştırdı ve Appium-specific endpoint\'leri /appium/ altına taşıdı. Bu, farklı WebDriver implementasyonlarıyla uyumu artırır ve namespace çakışmalarını önler. Mevcut oturumları listelemek için: GET http://localhost:4723/appium/sessions' },
          { level: 'intermediate', q: '32. Appium\'da element\'in görünür ama tıklanamaz olması (ElementNotInteractableException) nasıl çözülür?', a: '1) Explicit wait: wait.until(ExpectedConditions.elementToBeClickable(element)); 2) Element başka elementin altında mı? Scroll veya dismiss overlay. 3) Keyboard açık mı? driver.hideKeyboard() çağır. 4) JavaScript ile tıkla: ((JavascriptExecutor)driver).executeScript("arguments[0].click()", element); 5) Koordinata göre tıkla: actions.moveToElement(element).click().perform();' },
          { level: 'intermediate', q: '33. Appium testlerinde bağımsız test (test isolation) nasıl sağlanır?', a: 'Her test bağımsız çalışmalı (başka testin sonucuna bağlı olmamalı). Yöntemler: 1) @BeforeEach\'de driver yeniden başlat veya uygulamayı sıfırla. 2) Test verisini API ile oluştur/temizle. 3) noReset: false ile uygulama verisi her testte temizlenir. 4) Deep link ile doğrudan teste ait ekrana git. 5) loginPage.login() gibi shared step\'ler için helper class.' },
          { level: 'intermediate', q: '34. Appium\'da birden fazla element bulunduğunda nasıl seçilir?', a: 'findElements() (çoğul) listeyi döndürür. Java: List<WebElement> items = driver.findElements(AppiumBy.id("item")); items.get(0).click(); TypeScript: const items = await $$("~Product"); await items[2].click(); Belirli metin için: items.stream().filter(e -> e.getText().contains("Blue Top")).findFirst()' },
          { level: 'intermediate', q: '35. Appium 3\'te log maskeleme (log filtering) nasıl yapılır?', a: 'Hassas bilgilerin (şifre, token) log\'larda görünmesini engellemek için Appium 3 log filtering desteği sunar. --log-filters flag\'i ile regex pattern belirtilir. Örnek: --log-filters "password=*****". wdio.conf.ts: args: { logFilters: [{ text: "password", value: "*****" }] }. Güvenlik testi veya compliance gereksinimlerinde önemlidir.' },
        ],
      },
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-tr',
        topic: 'İleri Seviye Sorular (36–50)',
        questions: [
          { level: 'advanced', q: '36. Appium Grid ile paralel test nasıl kurulur?', a: 'Selenium Grid 4 + Appium node\'ları ile kurulur. Her node farklı cihaz/emülatör bağlar. Grid Hub merkezi koordinasyon sağlar. Alternatif: wdio.conf.ts\'de maxInstances artır + her capability farklı udid. Cloud çözüm: BrowserStack Automate, LambdaTest. systemPort capability farklı set edilmeli (8200, 8201...) — her Appium session kendi port\'unu kullanır.', code: `// wdio.conf.ts — Parallel (2 emülatör)
capabilities: [
  { platformName: 'Android', 'appium:udid': 'emulator-5554', 'appium:systemPort': 8200 },
  { platformName: 'Android', 'appium:udid': 'emulator-5556', 'appium:systemPort': 8201 },
]` },
          { level: 'advanced', q: '37. Appium ile API mock nasıl yapılır?', a: 'Appium\'un doğrudan mock desteği yoktur. Yaklaşımlar: 1) WireMock veya MockServer ile gerçek backend mock\'la (Java). 2) Charles Proxy / Proxyman ile network traffic intercept. 3) Uygulamada test modunu etkinleştir (backend flag). 4) iOS\'ta XCUITest proxy desteği kullanılabilir. 5) PolyFuzz, Caproxy gibi araçlar. Öneri: API test ortamı kurun, staging environment kullanın.' },
          { level: 'advanced', q: '38. Appium\'da özel komut (custom command) nasıl yazılır?', a: 'driver.executeScript("mobile: <commandName>", args) ile Appium mobile: prefix\'li komutlar çalıştırılabilir. Kendi custom command\'ınız için Appium plugin sistemi kullanılır. Örnek built-in mobile commands: mobile: scroll, mobile: swipe, mobile: tap, mobile: deepLink, mobile: changePermissions. Java: driver.executeScript("mobile: scroll", Map.of("direction", "down", "percent", 0.5));', code: `// Java — mobile: komutları
driver.executeScript("mobile: scroll", Map.of(
    "direction", "down", "percent", 0.75
));
driver.executeScript("mobile: tap", Map.of(
    "x", 200, "y", 500
));
driver.executeScript("mobile: backgroundApp", Map.of("seconds", 3));` },
          { level: 'advanced', q: '39. Appium\'da uygulama state (ön plan/arka plan) nasıl yönetilir?', a: 'Uygulamayı arka plana at: driver.runAppInBackground(Duration.ofSeconds(3)); Uygulamayı ön plana getir: driver.activateApp("com.example.app"); Uygulama state\'ini kontrol et: driver.queryAppState("com.example.app"); — NOT_INSTALLED, NOT_RUNNING, RUNNING_IN_BACKGROUND, RUNNING_IN_FOREGROUND. iOS\'ta bu tam olarak çalışır, Android\'de bazı kısıtlamalar var.', code: `// Java — App State
driver.runAppInBackground(Duration.ofSeconds(3));
// Uyku notification testi gibi senaryolar için
ApplicationState state = driver.queryAppState("com.example.app");
Assertions.assertEquals(ApplicationState.RUNNING_IN_FOREGROUND, state);` },
          { level: 'advanced', q: '40. Appium ile push notification testi nasıl yapılır?', a: 'Gerçek push notification testi zordur. Yaklaşımlar: 1) adb shell ile fake notification gönder: adb shell am broadcast -a FCM_RECEIVE_EVENT. 2) Deep link ile notification\'ın açacağı ekrana doğrudan git. 3) iOS: XCUITest ile notification simulation. 4) BrowserStack Real Device + Firebase ile gerçek push test. 5) Mock backend\'den notification tetikle ve UI\'daki değişimi test et.' },
          { level: 'advanced', q: '41. Appium testlerini CI/CD pipeline\'ına (Jenkins) nasıl entegre edersiniz?', a: 'Jenkins Pipeline (Jenkinsfile): 1) Headless emülatör başlat (-no-window). 2) Appium server başlat (arka planda). 3) Testleri çalıştır (mvn test veya npx wdio). 4) Allure/JUnit raporu yayınla. 5) Emülatör ve Appium\'u durdur. Docker ile: android-emulator Docker image kullanılabilir. Cloud: Jenkins → BrowserStack entegrasyonu en pratik CI çözümüdür.', code: `// Jenkinsfile
pipeline {
    agent any
    stages {
        stage('Start Emulator') {
            steps {
                sh 'emulator -avd Pixel_7 -no-window -no-audio &'
                sh 'adb wait-for-device'
                sh 'sleep 30'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'appium &'
                sh 'sleep 5'
                sh 'mvn test'
            }
        }
        stage('Report') {
            steps { publishHTML([...]) }
        }
    }
}` },
          { level: 'advanced', q: '42. Appium\'da görüntü karşılaştırma (image comparison) nasıl yapılır?', a: 'Appium 3\'te @appium/images-plugin gerekir: "appium plugin install --source=npm @appium/images-plugin". Bazı element bulma: AppiumBy.image(base64EncodedTemplate). Piksel bazlı karşılaştırma için: Ashot, Applitools Eyes, Percy gibi visual regression araçları. Java: driver.findElementByImage(base64Image) — element görüntüsüyle eşleşen elementi bulur.' },
          { level: 'advanced', q: '43. Appium\'da network koşullarını simüle etmek mümkün müdür?', a: 'Android emülatörde ağ koşulları simüle edilebilir: adb shell emu network speed gsm/hsdpa/lte — ağ hızını düşürür. adb shell emu network delay 1000 — latency ekler. iOS Simulator\'da Network Link Conditioner kullanılır. Appium mobile: command\'ları ile de bazı ağ ayarları yapılabilir. Gerçek cihazda: Charles Proxy ile bandwidth throttle.' },
          { level: 'advanced', q: '44. Appium\'da OTP (SMS) veya 2FA testi nasıl yapılır?', a: 'Gerçek SMS: Twilio API ile SMS alınır, test kodu API\'ı polling yaparak OTP\'yi okur ve girer. Android emülatörde: adb emu sms send <phoneNumber> <message> ile fake SMS. iOS Simulator\'da: Kod mesajları Simulator\'ın Messages uygulamasına gönderilir. En iyi yöntem: Test ortamında static OTP (ör. 123456) kullanmak, production\'da bypass etmek.' },
          { level: 'advanced', q: '45. Appium Driver geliştirmek mümkün müdür? Nasıl?', a: 'Evet. Appium 3\'ün plugin mimarisi custom driver yazmaya izin verir. BaseDriver\'ı extend ederek yeni platform desteği eklenebilir. npm paketi olarak yayınlanır ve "appium driver install --source=npm my-custom-driver" ile kurulur. Örnek: Flutter uygulamaları için flutter-driver, Windows masaüstü için WinAppDriver Appium adapter.' },
          { level: 'advanced', q: '46. Appium testlerinde memory leak nasıl tespit edilir?', a: 'driver.getPerformanceData(appPackage, "memoryinfo", 5) ile anlık memory snapshot. Birden fazla ölçüm alarak trend analizi yapılır. Android Studio Profiler ile daha detaylı analiz. Appium\'da memory leak testi sınırlıdır — LeakCanary (Android), Instruments (iOS) gibi native araçlar daha iyidir. Test süreci: Senaryo N kez tekrarlanır, memory değeri lineer artıyorsa leak var demektir.' },
          { level: 'advanced', q: '47. Flaky testleri root cause analizi ile nasıl çözersiniz?', a: '1) Test\'i 10-20 kez çalıştır, başarısızlık pattern\'ini bul. 2) Appium log\'larını incele: tam hata mesajı nerede? 3) Screenshot ve video kaydı ekle (wdio: addCommand ile). 4) Timing issue mi? — explicit wait ekle. 5) Data dependency mi? — test isolation kontrol et. 6) Environment issue mi? — CI/CD ortamını local ile karşılaştır. 7) UI değişikliği mi? — inspector ile locator doğrula.' },
          { level: 'advanced', q: '48. Appium testlerini TypeScript\'te tip güvenli (type-safe) nasıl yazarsınız?', a: 'WebdriverIO + TypeScript kombinasyonu en iyi tip desteğini verir. @wdio/types paketi tüm tipleri sağlar. Page Object\'lerde return type\'lar açıkça belirtilmeli. async/await ile Promise tiplemesi. Custom commands için type augmentation: declare namespace WebdriverIO { interface Browser { myCustomCmd(): Promise<void> } }. tsconfig.json\'da strict: true kullanın.', code: `// TypeScript — Type-safe POM
class ProductPage {
    async getPrice(): Promise<number> {
        const text: string = await this.priceEl.getText()
        return parseFloat(text.replace('$', ''))
    }
    async addToCart(qty: number = 1): Promise<CartPage> {
        await this.quantityInput.setValue(String(qty))
        await this.addToCartBtn.click()
        return new CartPage()
    }
}` },
          { level: 'advanced', q: '49. Appium ile erişilebilirlik (accessibility) testi nasıl yapılır?', a: 'Android: Accessibility ID (content-desc) locator\'ları kullanarak erişilebilirlik attribute\'larını doğrula. accessibility scanner integration: driver.executeScript("mobile: accessibilityScan"); iOS: XCUITest\'in erişilebilirlik desteğiyle. Google Accessibility Scanner Android uygulamasını Appium ile çalıştırıp sonuçları parse etmek mümkün. WCAG kriterleri için: contrast ratio, touch target boyutu, screen reader uyumluluğu test edilir.' },
          { level: 'advanced', q: '50. Appium 3 migration stratejisi — Appium 2\'den 3\'e geçiş nasıl yapılır?', a: 'Adım adım migration: 1) Node.js 20.19+\'e güncelle. 2) "npm install -g appium" ile Appium 3 kur. 3) "appium driver install uiautomator2" driver\'ı kur. 4) Tüm Appium-specific capability\'lere "appium:" prefix ekle (automationName → appium:automationName). 5) DesiredCapabilities yerine UiAutomator2Options kullan. 6) /sessions yerine /appium/sessions endpoint\'ini kullan. 7) TouchAction yerine W3C Actions API kullan. 8) Feature flag prefix\'lerini güncelle (adb_shell → uiautomator2:adb_shell). 9) Test suite\'ini çalıştır ve hataları tek tek çöz.' },
        ],
      },
    ],
  },
  en: {
    title: '💼 50-Question Comprehensive Interview Simulation',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎯',
        content: 'This section contains 50 interview questions in increasing difficulty: 1-15 Basic, 16-35 Intermediate, 36-50 Advanced. Click each question to reveal the answer. Challenge yourself: think of the answer first, then check.',
      },
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-tr',
        topic: 'Basic Questions (1–15)',
        questions: [
          { level: 'basic', q: '1. What is Appium and which platforms does it support?', a: 'Appium is an open-source automation tool for testing iOS, Android, and Windows desktop applications. It uses W3C WebDriver protocol. Works on real devices, emulators (Android), and simulators (iOS). Supports Java, Python, JavaScript, Ruby and other language bindings.' },
          { level: 'basic', q: '2. What is the fundamental difference between Selenium and Appium?', a: 'Selenium tests web browsers, Appium tests mobile apps (native, hybrid, web). Both use WebDriver protocol. Appium additionally requires a platform-specific driver (UIAutomator2, XCUITest) and mobile device management. Appium\'s Java client (java-client) extends Selenium.' },
          { level: 'basic', q: '3. What is UIAutomator2?', a: 'UIAutomator2 is Google\'s Android UI test framework. It\'s the bridge that lets Appium communicate with Android apps. Installed separately: "appium driver install uiautomator2". Alternative Android drivers: Espresso (faster, unit test integration), UIAutomator1 (older).' },
          { level: 'basic', q: '4. What is XCUITest?', a: 'XCUITest is Apple\'s UI test framework for iOS apps. Appium uses this framework for iOS tests. Only works on macOS. Install with: "appium driver install xcuitest". Testing on real iOS devices may require an Apple Developer account and code signing.' },
          { level: 'basic', q: '5. What are Desired Capabilities used for?', a: 'Desired Capabilities are configuration parameters sent to Appium before starting a test session: which platform (Android/iOS), which device, which app, and which automation engine to use. In Appium 3, Appium-specific ones require the "appium:" prefix.' },
          { level: 'basic', q: '6. What port does the Appium Server run on?', a: 'Default port is 4723. Can be changed with --port flag: "appium --port 4724". When running multiple Appium servers (parallel tests) different ports are used. Appium 3 status endpoint: http://127.0.0.1:4723/status' },
          { level: 'basic', q: '7. What does "appium driver list --installed" show?', a: 'Lists Appium drivers installed on the system. Example output: uiautomator2@3.x.x, xcuitest@7.x.x. Shows which platforms you can test. If a driver is installed, tests can run; otherwise you get "driver not found" error.' },
          { level: 'basic', q: '8. What is adb and how does it relate to Appium?', a: 'adb (Android Debug Bridge) is the command-line tool for communicating with Android devices/emulators. It installs/removes apps, captures logs, runs shell commands. Appium uses adb in the background for Android tests. "adb devices" lists connected devices.' },
          { level: 'basic', q: '9. What is Appium Inspector for?', a: 'Appium Inspector is a tool that visualizes the XML structure of mobile app screens and helps find element locators. Clicking any element on screen shows its resource-id, content-desc, class name and other locator info. In Appium 3 it\'s used as a plugin or standalone app.' },
          { level: 'basic', q: '10. What do noReset, fullReset, fastReset capabilities mean?', a: 'noReset: true = preserves app data after test. noReset: false (default) = clears app data. fullReset: true = completely uninstalls and reinstalls the app (cleanest but slowest). fastReset: clears app data with adb pm clear, doesn\'t uninstall.' },
          { level: 'basic', q: '11. Why did Appium 3 make the "appium:" prefix mandatory for capabilities?', a: 'W3C WebDriver standard requires vendor-specific capabilities to be namespaced with a prefix. Appium 2 applied this loosely. Appium 3 tightened W3C compliance. All Appium-specific capabilities now need "appium:" prefix. This prevents capability name collisions between different vendors.' },
          { level: 'basic', q: '12. How does communication between Appium client and server work?', a: 'Uses HTTP/HTTPS with JSON Wire Protocol (W3C WebDriver). Test code sends HTTP POST/GET requests (e.g. POST /session, POST /session/{id}/element). Server forwards these to the platform driver. Each session has a unique session ID.' },
          { level: 'basic', q: '13. What is the difference between testing on real device vs emulator/simulator?', a: 'Real device: real performance, sensors (GPS, camera), network conditions work; but expensive and hard to manage. Emulator: cheap, can run in parallel, different Android versions easily available; but cannot simulate real hardware, some sensors (fingerprint, NFC) are limited. CI/CD usually prefers emulators.' },
          { level: 'basic', q: '14. How do you use implicit wait and explicit wait in Appium?', a: 'Implicit wait: driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10)); — global wait for all findElement calls. Explicit wait: WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15)); wait.until(ExpectedConditions.visibilityOf(element)); — waits for specific condition. Best practice: keep implicit wait at 0, use explicit wait.' },
          { level: 'basic', q: '15. Why should POM (Page Object Model) be used in Appium tests?', a: 'POM eases maintenance. When UI changes, only the page class needs updating, not all tests. Reduces code duplication. Test scenarios are more readable and focused on business logic. Locators are centralized. Selenium\'s PageFactory pattern works in Appium too (with AppiumFieldDecorator).' },
        ],
      },
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-tr',
        topic: 'Intermediate Questions (16–35)',
        questions: [
          { level: 'intermediate', q: '16. What is context switching? How is it done in hybrid apps?', a: 'Hybrid apps contain both native UI and WebView. Context switching lets test code move between them. Java: Set<String> contexts = driver.getContextHandles(); // [NATIVE_APP, WEBVIEW_xxx] driver.context("WEBVIEW_xxx"); // Access web elements driver.context("NATIVE_APP"); // Go back', code: `// Java
Set<String> ctx = driver.getContextHandles();
driver.context("WEBVIEW_com.example.app");
driver.findElement(By.cssSelector("#loginBtn")).click();
driver.context("NATIVE_APP");` },
          { level: 'intermediate', q: '17. What is the difference between TouchAction and W3C Actions API?', a: 'TouchAction is the old API from Appium 1/2, deprecated in Appium 3. W3C Actions API is the standard W3C implementation for pointer actions. Appium 3 uses PointerInput. TypeScript: driver.action("pointer").move({x, y}).down().up().perform(); Java: use Actions class with clickAndHold, moveByOffset, release.', code: `// Java — W3C Actions (Appium 3)
Actions actions = new Actions(driver);
WebElement slider = driver.findElement(AppiumBy.id("com.ex:id/slider"));
actions.clickAndHold(slider).moveByOffset(200, 0).release().perform();` },
          { level: 'intermediate', q: '18. How do you perform a swipe in Appium?', a: 'Use W3C Actions API. Calculate start and end coordinates. Java: use PointerInput and Sequence. TypeScript/WebdriverIO: use driver.action() or browser.action(). Alternative: UIAutomator2\'s UiScrollable for scrolling without coordinate calculation.', code: `// Java — Swipe (Bottom to Top)
Dimension size = driver.manage().window().getSize();
int startX = size.width / 2;
int startY = (int)(size.height * 0.8);
int endY   = (int)(size.height * 0.2);
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence swipe = new Sequence(finger, 1)
    .addAction(finger.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), startX, startY))
    .addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()))
    .addAction(finger.createPointerMove(Duration.ofMillis(600), PointerInput.Origin.viewport(), startX, endY))
    .addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
driver.perform(Arrays.asList(swipe));` },
          { level: 'intermediate', q: '19. How do you perform pinch and zoom gestures?', a: 'Use W3C Actions API with two simultaneous finger movements (multi-touch). Create two PointerInput objects (finger1, finger2); move inward for pinch, outward for zoom. Run parallel sequences with Selenium Actions.', code: `// Java — Pinch (Zoom Out)
PointerInput f1 = new PointerInput(PointerInput.Kind.TOUCH, "f1");
PointerInput f2 = new PointerInput(PointerInput.Kind.TOUCH, "f2");
Sequence pinch1 = new Sequence(f1, 0)
    .addAction(f1.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), 400, 300))
    .addAction(f1.createPointerDown(PointerInput.MouseButton.LEFT.asArg()))
    .addAction(f1.createPointerMove(Duration.ofMillis(500), PointerInput.Origin.viewport(), 300, 400))
    .addAction(f1.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
// f2 in opposite direction...
driver.perform(Arrays.asList(pinch1, /* pinch2 */));` },
          { level: 'intermediate', q: '20. How do you take a screenshot in Appium?', a: 'Appium driver implements TakesScreenshot interface. Java: File src = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE); FileUtils.copyFile(src, new File("screenshot.png")); TypeScript/WebdriverIO: await browser.saveScreenshot("./screenshot.png"); Use @AfterEach hook to auto-capture screenshots on failure in CI/CD.', code: `// Java — Screenshot in After hook
@AfterEach
void screenshotOnFailure(TestInfo info) {
    File src = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
    FileUtils.copyFile(src, new File("screenshots/" + info.getDisplayName() + ".png"));
}` },
          { level: 'intermediate', q: '21. What is a deep link in Appium and how is it used?', a: 'A deep link is a URL scheme that directly opens a specific screen of the app (e.g. myapp://product/123). Shortens test time — jump directly to product page instead of logging in each time. Java: driver.get("myapp://cart"); TypeScript: driver.url("myapp://cart"); or open via adb shell am start.', code: `// Java — Deep Link
driver.get("automationexercise://product/1");
// Alternative: via adb
driver.executeScript("mobile: deepLink", Map.of(
    "url", "automationexercise://product/1",
    "package", "com.automationexercise.app"
));` },
          { level: 'intermediate', q: '22. How do you dismiss the keyboard in Appium?', a: 'Java: driver.hideKeyboard(); — works on all platforms. iOS sometimes needs an additional gesture. Alternative: driver.pressKey(new KeyEvent(AndroidKey.BACK)); TypeScript: await driver.hideKeyboard(); or await $("~done_button").click(); Check if keyboard is open: driver.isKeyboardShown()' },
          { level: 'intermediate', q: '23. How do you retry a failing test in Appium (retry mechanism)?', a: 'Java/TestNG: add retry with @Test(retryAnalyzer = RetryAnalyzer.class). Java/JUnit5: @RepeatedTest(3) or custom extension. TypeScript/WebdriverIO: specFileRetries: 2 in wdio.conf.ts. CI/CD: pipeline can re-trigger on failure. Most importantly: find the root cause of flaky tests — retry just masks them.' },
          { level: 'intermediate', q: '24. How is test data managed in Appium tests?', a: 'Test data should be isolated: each test should create its own data or reset via API. Use constants/properties files instead of hardcoded values. For data-driven testing: TestNG DataProvider, JUnit5 @ParameterizedTest, or CSV/Excel. Post-test cleanup: tests should delete data they created (API call in teardown hook).' },
          { level: 'intermediate', q: '25. How do you analyze Appium Server logs?', a: 'Appium logs show JSON Wire Protocol requests. Write to file with --log ./appium.log. Get detailed logs with --loglevel debug. Look for: "error", "fail", "not found". Each HTTP request/response appears: POST /session, POST /element, POST /click. For failed commands look at "value": {"error": "..."} section.' },
          { level: 'intermediate', q: '26. What is a cloud device farm? Why is it used?', a: 'Services like BrowserStack, Sauce Labs, AWS Device Farm let you test on real physical devices via the cloud. Advantages: 1) Hundreds of real device/OS combinations. 2) CI/CD integration. 3) Parallel test execution. 4) No device management needed. Disadvantage: Cost. Use by just changing Appium Server URL: https://hub.browserstack.com/wd/hub' },
          { level: 'intermediate', q: '27. How is the app automatically installed if not present in Appium?', a: 'Give the absolute path or URL of the APK/IPA to "appium:app" capability. Appium installs the app at each session start. With noReset: false app data is cleared but app stays installed. With fullReset: true app is uninstalled and reinstalled. If app is already installed, appPackage+appActivity is faster (skips installation).' },
          { level: 'intermediate', q: '28. How are permissions managed in Appium?', a: '"appium:autoGrantPermissions": true auto-grants all permissions on Android. iOS: autoAcceptAlerts: true auto-clicks "Allow" on alerts. Manual: driver.executeScript("mobile: changePermissions", Map.of("permissions", "READ_CONTACTS", "action", "grant", "appPackage", "com.example")); Permissions can also be granted via adb command before test starts.' },
          { level: 'intermediate', q: '29. Can performance testing be done with Appium?', a: 'Yes, to a limited extent. driver.getPerformanceData(packageName, dataType, timeout); gets CPU, memory, battery, network data. For more comprehensive performance testing: Firebase Performance Monitoring, Android Profiler, Perfecto. Appium is primarily a functional test tool; JMeter or k6 are more suitable for load testing.' },
          { level: 'intermediate', q: '30. How do you integrate Allure reporting with Appium?', a: 'Maven: allure-junit5 or allure-testng dependency. wdio.conf.ts: reporters: [["allure", {outputDir: "./allure-results"}]]. For test steps: @Step("Login") annotation. Screenshots are added on failure. CI/CD: publish to Allure server or GitHub Pages. View report: allure serve ./allure-results command.' },
          { level: 'intermediate', q: '31. Why does Appium 3 use GET /appium/sessions instead of GET /sessions?', a: 'W3C WebDriver standard doesn\'t define the /sessions endpoint — it was Appium-specific. Appium 3 tightened W3C compliance and moved Appium-specific endpoints under /appium/. This improves compatibility with different WebDriver implementations and prevents namespace conflicts. List current sessions: GET http://localhost:4723/appium/sessions' },
          { level: 'intermediate', q: '32. How is ElementNotInteractableException (element visible but not clickable) resolved?', a: '1) Explicit wait: wait.until(ExpectedConditions.elementToBeClickable(element)); 2) Is element covered by another element? Scroll or dismiss overlay. 3) Is keyboard open? Call driver.hideKeyboard(). 4) Click via JavaScript: ((JavascriptExecutor)driver).executeScript("arguments[0].click()", element); 5) Click by coordinates: actions.moveToElement(element).click().perform();' },
          { level: 'intermediate', q: '33. How is test isolation achieved in Appium tests?', a: 'Each test should be independent (not depend on another test\'s result). Methods: 1) Restart driver or reset app in @BeforeEach. 2) Create/clean test data via API. 3) With noReset: false app data is cleared each test. 4) Use deep link to go directly to the test\'s screen. 5) Helper classes for shared steps like loginPage.login().' },
          { level: 'intermediate', q: '34. How do you select when multiple elements are found in Appium?', a: 'findElements() (plural) returns a list. Java: List<WebElement> items = driver.findElements(AppiumBy.id("item")); items.get(0).click(); TypeScript: const items = await $$("~Product"); await items[2].click(); For specific text: items.stream().filter(e -> e.getText().contains("Blue Top")).findFirst()' },
          { level: 'intermediate', q: '35. How does log filtering work in Appium 3?', a: 'Appium 3 supports log filtering to prevent sensitive data (passwords, tokens) from appearing in logs. Use --log-filters flag with regex patterns. Example: --log-filters "password=*****". In wdio.conf.ts: args: { logFilters: [{ text: "password", value: "*****" }] }. Important for security testing or compliance requirements.' },
        ],
      },
      {
        type: 'interview-questions',
          relatedTopicId: 'appium-interview-tr',
        topic: 'Advanced Questions (36–50)',
        questions: [
          { level: 'advanced', q: '36. How do you set up Appium Grid for parallel testing?', a: 'Set up with Selenium Grid 4 + Appium nodes. Each node connects a different device/emulator. Grid Hub provides central coordination. Alternative: increase maxInstances in wdio.conf.ts + each capability has different udid. Cloud solution: BrowserStack Automate, LambdaTest. systemPort capability must differ (8200, 8201...) — each Appium session uses its own port.', code: `// wdio.conf.ts — Parallel (2 emulators)
capabilities: [
  { platformName: 'Android', 'appium:udid': 'emulator-5554', 'appium:systemPort': 8200 },
  { platformName: 'Android', 'appium:udid': 'emulator-5556', 'appium:systemPort': 8201 },
]` },
          { level: 'advanced', q: '37. How do you mock APIs with Appium?', a: 'Appium has no direct mock support. Approaches: 1) Mock real backend with WireMock or MockServer (Java). 2) Intercept network traffic with Charles Proxy / Proxyman. 3) Enable test mode in app (backend flag). 4) iOS: XCUITest proxy support. 5) Tools like PolyFuzz, Caproxy. Recommendation: set up API test environment, use staging environment.' },
          { level: 'advanced', q: '38. How do you write custom commands (mobile: commands) in Appium?', a: 'Run Appium mobile: prefix commands with driver.executeScript("mobile: <commandName>", args). For your own custom commands use the Appium plugin system. Example built-in mobile commands: mobile:scroll, mobile:swipe, mobile:tap, mobile:deepLink, mobile:changePermissions. Java: driver.executeScript("mobile: scroll", Map.of("direction", "down", "percent", 0.5));', code: `// Java — mobile: commands
driver.executeScript("mobile: scroll", Map.of(
    "direction", "down", "percent", 0.75
));
driver.executeScript("mobile: tap", Map.of(
    "x", 200, "y", 500
));
driver.executeScript("mobile: backgroundApp", Map.of("seconds", 3));` },
          { level: 'advanced', q: '39. How do you manage app state (foreground/background) in Appium?', a: 'Send app to background: driver.runAppInBackground(Duration.ofSeconds(3)); Bring app to foreground: driver.activateApp("com.example.app"); Check app state: driver.queryAppState("com.example.app"); — NOT_INSTALLED, NOT_RUNNING, RUNNING_IN_BACKGROUND, RUNNING_IN_FOREGROUND. Works fully on iOS; some Android restrictions apply.', code: `// Java — App State
driver.runAppInBackground(Duration.ofSeconds(3));
// Useful for scenarios like sleep notification testing
ApplicationState state = driver.queryAppState("com.example.app");
Assertions.assertEquals(ApplicationState.RUNNING_IN_FOREGROUND, state);` },
          { level: 'advanced', q: '40. How do you test push notifications with Appium?', a: 'Real push notification testing is hard. Approaches: 1) Send fake notification via adb shell: adb shell am broadcast -a FCM_RECEIVE_EVENT. 2) Use deep link to directly open the screen that notification would open. 3) iOS: XCUITest notification simulation. 4) BrowserStack Real Device + Firebase for real push test. 5) Mock backend triggers notification, test UI changes.' },
          { level: 'advanced', q: '41. How do you integrate Appium tests into a CI/CD pipeline (Jenkins)?', a: 'Jenkins Pipeline (Jenkinsfile): 1) Start headless emulator (-no-window). 2) Start Appium server in background. 3) Run tests (mvn test or npx wdio). 4) Publish Allure/JUnit report. 5) Stop emulator and Appium. With Docker: use android-emulator Docker image. Cloud: Jenkins → BrowserStack integration is the most practical CI solution.', code: `// Jenkinsfile
pipeline {
    agent any
    stages {
        stage('Start Emulator') {
            steps {
                sh 'emulator -avd Pixel_7 -no-window -no-audio &'
                sh 'adb wait-for-device'
                sh 'sleep 30'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'appium &'
                sh 'sleep 5'
                sh 'mvn test'
            }
        }
        stage('Report') {
            steps { publishHTML([allowMissing: false, reportDir: 'target/site/allure-maven-plugin', reportFiles: 'index.html', reportName: 'Allure Report']) }
        }
    }
}` },
          { level: 'advanced', q: '42. How do you do image comparison in Appium?', a: 'Appium 3 requires @appium/images-plugin: "appium plugin install --source=npm @appium/images-plugin". Element finding by image: AppiumBy.image(base64EncodedTemplate). For pixel-based comparison: Ashot, Applitools Eyes, Percy for visual regression. Java: driver.findElementByImage(base64Image) — finds element matching image.' },
          { level: 'advanced', q: '43. Is it possible to simulate network conditions in Appium?', a: 'Android emulator network conditions can be simulated: adb shell emu network speed gsm/hsdpa/lte — reduces network speed. adb shell emu network delay 1000 — adds latency. iOS Simulator: use Network Link Conditioner. Some network settings can also be changed via Appium mobile: commands. Real devices: bandwidth throttle with Charles Proxy.' },
          { level: 'advanced', q: '44. How do you test OTP (SMS) or 2FA with Appium?', a: 'Real SMS: Receive via Twilio API, test code polls API to read OTP and enters it. Android emulator: adb emu sms send <phoneNumber> <message> for fake SMS. iOS Simulator: messages sent to Simulator\'s Messages app. Best method: Use static OTP in test environment (e.g. 123456), bypass in production.' },
          { level: 'advanced', q: '45. Is it possible to develop a custom Appium Driver? How?', a: 'Yes. Appium 3\'s plugin architecture allows writing custom drivers. Extend BaseDriver to add new platform support. Published as npm package and installed with "appium driver install --source=npm my-custom-driver". Examples: flutter-driver for Flutter apps, WinAppDriver Appium adapter for Windows desktop.' },
          { level: 'advanced', q: '46. How do you detect memory leaks in Appium tests?', a: 'driver.getPerformanceData(appPackage, "memoryinfo", 5) for instant memory snapshot. Take multiple measurements and analyze trend. More detailed analysis with Android Studio Profiler. Memory leak testing is limited in Appium — native tools like LeakCanary (Android), Instruments (iOS) are better. Test process: repeat scenario N times, if memory increases linearly, there\'s a leak.' },
          { level: 'advanced', q: '47. How do you resolve flaky tests with root cause analysis?', a: '1) Run test 10-20 times, find failure pattern. 2) Examine Appium logs: exactly where is the error? 3) Add screenshot and video recording. 4) Timing issue? — add explicit wait. 5) Data dependency? — check test isolation. 6) Environment issue? — compare CI/CD with local. 7) UI change? — verify locator with Inspector.' },
          { level: 'advanced', q: '48. How do you write type-safe Appium tests in TypeScript?', a: 'WebdriverIO + TypeScript gives the best type support. @wdio/types provides all types. Explicitly declare return types in Page Objects. async/await for Promise typing. Custom commands via type augmentation: declare namespace WebdriverIO { interface Browser { myCustomCmd(): Promise<void> } }. Use strict: true in tsconfig.json.', code: `// TypeScript — Type-safe POM
class ProductPage {
    async getPrice(): Promise<number> {
        const text: string = await this.priceEl.getText()
        return parseFloat(text.replace('$', ''))
    }
    async addToCart(qty: number = 1): Promise<CartPage> {
        await this.quantityInput.setValue(String(qty))
        await this.addToCartBtn.click()
        return new CartPage()
    }
}` },
          { level: 'advanced', q: '49. How do you do accessibility testing with Appium?', a: 'Android: Verify accessibility attributes using Accessibility ID (content-desc) locators. Accessibility scanner integration: driver.executeScript("mobile: accessibilityScan"); iOS: With XCUITest accessibility support. Can run Google Accessibility Scanner Android app with Appium and parse results. For WCAG criteria: test contrast ratio, touch target size, screen reader compatibility.' },
          { level: 'advanced', q: '50. Appium 3 migration strategy — how do you migrate from Appium 2 to 3?', a: 'Step-by-step migration: 1) Update Node.js to 20.19+. 2) Install Appium 3 with "npm install -g appium". 3) Install drivers with "appium driver install uiautomator2". 4) Add "appium:" prefix to all Appium-specific capabilities (automationName → appium:automationName). 5) Use UiAutomator2Options instead of DesiredCapabilities. 6) Use /appium/sessions endpoint instead of /sessions. 7) Replace TouchAction with W3C Actions API. 8) Update feature flag prefixes (adb_shell → uiautomator2:adb_shell). 9) Run test suite and fix errors one by one.' },
        ],
      },
    ],
  },
}

export { section0, section1, section2, section3, section4, section5, section6 }

// ─── FINAL ASSEMBLY ───────────────────────────────────────────────────────────
const buildLang = (lang) => ({
  hero: {
    tr: {
      title: '📱 Appium 3.x',
      subtitle: 'Mobil Test Otomasyonu — Sıfırdan Mülakata',
      intro: 'Appium 3.x ile Android ve iOS uygulamalarını test etmeyi öğrenin. Client-server mimarisi, UIAutomator2, Desired Capabilities, Page Object Model ve gerçek dünya senaryolarıyla mülakat seviyesine gelin.',
    },
    en: {
      title: '📱 Appium 3.x',
      subtitle: 'Mobile Test Automation — Zero to Interview',
      intro: 'Learn to test Android and iOS apps with Appium 3.x. Master client-server architecture, UIAutomator2, Desired Capabilities, Page Object Model, and real-world scenarios to reach interview level.',
    },
  }[lang],
  tabs: {
    tr: ['🎯 Giriş & Mimari', '⚙️ Kurulum', '🔧 Capabilities', '🔍 Locator & POM', '🧪 Gerçek Senaryo', '🚨 Yaygın Hatalar', '💼 50 Mülakat Sorusu'],
    en: ['🎯 Intro & Architecture', '⚙️ Installation', '🔧 Capabilities', '🔍 Locator & POM', '🧪 Real Scenario', '🚨 Common Errors', '💼 50 Interview Questions'],
  }[lang],
  sections: [section0, section1, section2, section3, section4, section5, section6].map(s => s[lang]),
})

export const appiumData = {
  tr: buildLang('tr'),
  en: buildLang('en'),
}
