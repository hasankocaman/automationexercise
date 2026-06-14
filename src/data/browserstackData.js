// browserstackData.js — BrowserStack Bulut Test Platformu
// Part 1: Section 0 (Giriş) · Section 1 (Kurulum) · Section 2 (Selenium) · Section 3 (Playwright)
// Part 2: Section 4 (Gerçek Hayat) · Section 5 (Ekosistem) · Section 6 (Hatalar) · Section 7 (Mülakat)

// ─── SECTION 0: GİRİŞ & MİMARİ ──────────────────────────────────────────────
const section0 = {
  title: { tr: '☁️ BrowserStack Nedir? Mimari Nasıl Çalışır?', en: '☁️ What is BrowserStack? How Does the Architecture Work?' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🖥️',
      content: {
        tr: 'BrowserStack\'i bir "kiralık test laboratuvarı" gibi düşün. Normalde 50 farklı tarayıcı ve telefonu kendin satın almak zorunda kalırsın. BrowserStack bunları bulutta hazır tutar; sen sadece internet üzerinden bağlanır, testini çalıştırır, ekran görüntüsünü alır ve gidersin. Masraf yok, bakım yok.',
        en: 'Think of BrowserStack as a "rented test lab." Normally you\'d have to buy 50 different browsers and phones yourself. BrowserStack keeps them ready in the cloud; you just connect over the internet, run your test, take screenshots, and leave. No hardware cost, no maintenance.'
      }
    },
    {
      type: 'text',
      content: {
        tr: 'BrowserStack, gerçek tarayıcılar ve gerçek mobil cihazlar üzerinde web ile mobil uygulama testleri yapmanızı sağlayan bulut tabanlı bir test platformudur. 2011\'de kurulan platform; Automate (Selenium/WebDriver), App Automate (Appium), Live (manuel), Percy (görsel) ve Accessibility gibi modüller sunar. Java\'da Selenium Grid kullandıysanız BrowserStack\'i "Selenium Grid as a Service" olarak düşünebilirsiniz: kendi altyapınızı kurmak yerine BrowserStack\'in altyapısını kullanırsınız.',
        en: 'BrowserStack is a cloud-based testing platform that lets you test web and mobile applications on real browsers and real mobile devices. Founded in 2011, the platform offers modules like Automate (Selenium/WebDriver), App Automate (Appium), Live (manual), Percy (visual), and Accessibility. If you\'ve used Selenium Grid in Java, think of BrowserStack as "Selenium Grid as a Service": instead of setting up your own infrastructure, you use BrowserStack\'s.'
      }
    },
    {
      type: 'heading',
      text: { tr: 'Temel Modüller', en: 'Core Modules' }
    },
    {
      type: 'grid',
      cols: 3,
      items: [
        { icon: '🤖', label: { tr: 'Automate', en: 'Automate' }, desc: { tr: 'Selenium & WebDriver testleri. Gerçek tarayıcıda çalışır.', en: 'Selenium & WebDriver tests. Runs on real browsers.' } },
        { icon: '📱', label: { tr: 'App Automate', en: 'App Automate' }, desc: { tr: 'Appium ile iOS/Android uygulama testleri.', en: 'iOS/Android app tests with Appium.' } },
        { icon: '👀', label: { tr: 'Live', en: 'Live' }, desc: { tr: 'Manuel interaktif test — gerçek cihazda web\'de gezin.', en: 'Manual interactive testing — browse the web on real devices.' } },
        { icon: '🎨', label: { tr: 'Percy', en: 'Percy' }, desc: { tr: 'Görsel regresyon testi. Piksel farkı yakalamak için.', en: 'Visual regression testing. Catches pixel-level differences.' } },
        { icon: '♿', label: { tr: 'Accessibility', en: 'Accessibility' }, desc: { tr: 'WCAG uyumluluk taraması.', en: 'WCAG compliance scanning.' } },
        { icon: '⚡', label: { tr: 'Turboscale', en: 'Turboscale' }, desc: { tr: 'Binlerce paralel test için ölçeklenebilir grid.', en: 'Scalable grid for thousands of parallel tests.' } }
      ]
    },
    {
      type: 'heading',
      text: { tr: 'BrowserStack Nasıl Çalışır? (Mimari)', en: 'How BrowserStack Works (Architecture)' }
    },
    {
      type: 'visual',
      variant: 'flow',
      title: { tr: 'BrowserStack Automate Akışı', en: 'BrowserStack Automate Flow' },
      steps: [
        { num: 1, label: { tr: 'Test Kodu', en: 'Test Code' }, desc: { tr: 'Java/Python/TS', en: 'Java/Python/TS' }, highlight: true },
        { num: 2, label: 'HTTPS', desc: { tr: 'W3C WebDriver', en: 'W3C WebDriver' } },
        { num: 3, label: { tr: 'BS Hub', en: 'BS Hub' }, desc: { tr: 'hub.browserstack.com', en: 'hub.browserstack.com' }, highlight: true },
        { num: 4, label: { tr: 'Gerçek Tarayıcı', en: 'Real Browser' }, desc: { tr: 'Chrome/Safari/FF', en: 'Chrome/Safari/FF' } },
        { num: 5, label: { tr: 'Sonuç', en: 'Result' }, desc: { tr: 'Video + Log', en: 'Video + Log' }, highlight: true }
      ]
    },
    {
      type: 'callout',
      color: 'blue',
      emoji: '☕',
      title: { tr: 'Java Biliyorsan:', en: 'If You Know Java:' },
      content: {
        tr: 'Java\'da Selenium Grid kullanırken RemoteWebDriver\'a GridHub URL\'si verirdiniz (http://hub:4444/wd/hub). BrowserStack\'te de aynısını yaparsınız, farkı URL\'in BrowserStack sunucusuna işaret etmesidir: https://USERNAME:ACCESS_KEY@hub.browserstack.com/wd/hub. Authentication bilgileriniz URL\'e embed edilir.',
        en: 'When using Selenium Grid in Java, you\'d give RemoteWebDriver the GridHub URL (http://hub:4444/wd/hub). With BrowserStack you do exactly the same, the difference is the URL points to BrowserStack servers: https://USERNAME:ACCESS_KEY@hub.browserstack.com/wd/hub. Your authentication credentials are embedded in the URL.'
      }
    },
    {
      type: 'heading',
      text: { tr: 'Capability Sistemi', en: 'Capability System' }
    },
    {
      type: 'text',
      content: {
        tr: 'BrowserStack\'te hangi tarayıcı, işletim sistemi ve cihazın kullanılacağını "capabilities" (özellikler) ile belirtirsiniz. Bu sistem Java\'daki DesiredCapabilities veya W3C Options sınıflarına tamamen benzer.',
        en: 'In BrowserStack, you specify which browser, OS, and device to use through "capabilities." This system is directly analogous to Java\'s DesiredCapabilities or W3C Options classes.'
      }
    },
    {
      type: 'code',
      language: 'Python',
      content: {
        tr: '# BrowserStack capability örneği (Python + Selenium)',
        en: '# BrowserStack capability example (Python + Selenium)'
      },
      code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()                          # Chrome options oluştur

# BrowserStack W3C capability'leri
bstack_options = {
    "userName": "YOUR_USERNAME",             # BS kullanıcı adı
    "accessKey": "YOUR_ACCESS_KEY",          # BS erişim anahtarı
    "browserName": "Chrome",                 # Tarayıcı: Chrome/Firefox/Safari/Edge
    "browserVersion": "latest",              # Sürüm: "latest" veya "120.0"
    "os": "Windows",                         # OS: Windows/OS X
    "osVersion": "11",                       # OS sürümü
    "sessionName": "Login Test",             # Dashboard'da görünecek isim
    "buildName": "Sprint-42",                # Build grubu
}

options.set_capability("bstack:options", bstack_options)  # BS'e gönder

driver = webdriver.Remote(
    command_executor="https://hub.browserstack.com/wd/hub",  # BS hub URL'i
    options=options
)

driver.get("https://example.com")           # Test URL'ine git
print(driver.title)                         # Sayfa başlığını yazdır
driver.quit()                               # Oturumu kapat`
    },
    {
      type: 'quiz',
      question: {
        tr: 'BrowserStack\'e bağlanırken RemoteWebDriver URL\'inde ne bulunur?',
        en: 'What is included in the RemoteWebDriver URL when connecting to BrowserStack?'
      },
      options: [
        { id: 'a', text: { tr: 'Sadece hub adresi', en: 'Only the hub address' } },
        { id: 'b', text: 'USERNAME:ACCESS_KEY@hub.browserstack.com' },
        { id: 'c', text: { tr: 'API token header olarak gönderilir', en: 'API token is sent as a header' } },
        { id: 'd', text: { tr: 'Şifre gerekmez', en: 'No password required' } }
      ],
      correct: 'b',
      explanation: {
        tr: 'BrowserStack URL\'i şu formattadır: https://USERNAME:ACCESS_KEY@hub.browserstack.com/wd/hub. Kullanıcı adı ve erişim anahtarı doğrudan URL\'e gömülür. Bu, Java\'daki RemoteWebDriver ile aynı mekanizmadır.',
        en: 'The BrowserStack URL format is: https://USERNAME:ACCESS_KEY@hub.browserstack.com/wd/hub. The username and access key are embedded directly in the URL. This is the same mechanism as RemoteWebDriver in Java.'
      }
    }
  ]
}

// ─── SECTION 1: KURULUM ──────────────────────────────────────────────────────
const section1 = {
  title: { tr: '⚙️ Kurulum & Hesap Ayarları', en: '⚙️ Setup & Account Configuration' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔑',
      content: {
        tr: 'BrowserStack kurulumu iki parçadan oluşur: hesap oluşturmak (web tarayıcısından) ve Python/pip ile SDK\'yı kurmak. Bilgisayarına hiçbir tarayıcı driver\'ı kurman gerekmez — BrowserStack bunu bulutta halleder.',
        en: 'BrowserStack setup has two parts: creating an account (from a web browser) and installing the SDK via Python/pip. You don\'t need to install any browser drivers on your computer — BrowserStack handles this in the cloud.'
      }
    },
    {
      type: 'heading',
      text: { tr: 'Adım 1 — Hesap & API Key', en: 'Step 1 — Account & API Key' }
    },
    {
      type: 'steps',
      items: [
        { label: { tr: 'Kayıt Ol', en: 'Sign Up' }, desc: { tr: 'browserstack.com → "Free Trial" butonuna tıkla. 100 Automate dakika ücretsiz.', en: 'browserstack.com → click "Free Trial". 100 free Automate minutes.' } },
        { label: { tr: 'API Key Al', en: 'Get API Key' }, desc: { tr: 'Dashboard → Account → Settings → Username ve Access Key\'i kopyala.', en: 'Dashboard → Account → Settings → Copy your Username and Access Key.' } },
        { label: { tr: 'Ortam Değişkeni', en: 'Environment Variable' }, desc: { tr: 'Güvenlik için KEY\'i .env dosyasına veya CI/CD secret\'a koy, koda yazma.', en: 'For security, put the KEY in a .env file or CI/CD secret — never hardcode it.' } }
      ]
    },
    {
      type: 'heading',
      text: { tr: 'Adım 2 — Python SDK Kurulumu', en: 'Step 2 — Python SDK Installation' }
    },
    {
      type: 'installation',
      steps: [
        {
          cmd: 'python -m venv venv',
          cmd_mac: 'python3 -m venv venv',
          explanation: {
            tr: 'Sanal ortam oluştur. "venv" klasörü bu dizinde belirir.',
            en: 'Create a virtual environment. A "venv" folder appears in this directory.'
          }
        },
        {
          cmd: 'venv\\Scripts\\activate',
          cmd_mac: 'source venv/bin/activate',
          explanation: {
            tr: 'Sanal ortamı aktif et. Terminalde (venv) yazısı görünmelidir.',
            en: 'Activate the virtual environment. You should see (venv) in the terminal.'
          }
        },
        {
          cmd: 'pip install browserstack-sdk selenium pytest',
          cmd_mac: 'pip3 install browserstack-sdk selenium pytest',
          explanation: {
            tr: 'BrowserStack SDK, Selenium ve pytest\'i yükle. SDK tüm bağlantıyı otomatik yönetir.',
            en: 'Install BrowserStack SDK, Selenium, and pytest. The SDK manages all connections automatically.'
          }
        },
        {
          cmd: 'browserstack-sdk --version',
          explanation: {
            tr: 'Kurulumu doğrula. Sürüm numarası görünmelidir.',
            en: 'Verify installation. A version number should appear.'
          }
        }
      ]
    },
    {
      type: 'heading',
      text: { tr: 'Adım 3 — browserstack.yml Yapılandırma', en: 'Step 3 — browserstack.yml Configuration' }
    },
    {
      type: 'text',
      content: {
        tr: 'BrowserStack SDK, proje kökünde bir browserstack.yml dosyası okur. Bu dosya Java\'daki testng.xml veya pytest.ini\'ye benzer — hangi tarayıcılarda, kaç paralel test çalışacağını tanımlar.',
        en: 'BrowserStack SDK reads a browserstack.yml file at the project root. This file is similar to testng.xml or pytest.ini in Java — it defines which browsers to test on and how many parallel tests to run.'
      }
    },
    {
      type: 'code',
      language: 'YAML',
      content: { tr: '# browserstack.yml — proje köküne koy', en: '# browserstack.yml — place at project root' },
      code: `userName: YOUR_BROWSERSTACK_USERNAME        # BS Dashboard'dan al
accessKey: YOUR_BROWSERSTACK_ACCESS_KEY     # BS Dashboard'dan al

buildName: "My Project Build"               # Dashboard'da görünecek build adı
projectName: "QA Automation"               # Proje adı

browsers:
  - browserName: Chrome                    # 1. tarayıcı
    browserVersion: latest
    os: Windows
    osVersion: 11

  - browserName: Firefox                   # 2. tarayıcı (paralel çalışır)
    browserVersion: latest
    os: OS X
    osVersion: Sonoma

  - browserName: Safari                    # 3. tarayıcı
    browserVersion: 17.0
    os: OS X
    osVersion: Sonoma

parallelsPerPlatform: 1                    # Her OS'te kaç paralel test
browserstackLocal: false                   # Localhost test için true yap`
    },
    {
      type: 'heading',
      text: { tr: 'Adım 4 — Ortam Değişkenleri (.env)', en: 'Step 4 — Environment Variables (.env)' }
    },
    {
      type: 'code',
      language: 'Bash',
      content: { tr: '# .env dosyası (asla git\'e commit etme!)', en: '# .env file (never commit to git!)' },
      code: `# .env — Proje kökünde oluştur
BROWSERSTACK_USERNAME=your_username         # BS kullanıcı adı
BROWSERSTACK_ACCESS_KEY=your_access_key    # BS erişim anahtarı

# Python kodunda kullanım:
# import os
# username = os.environ["BROWSERSTACK_USERNAME"]`
    },
    {
      type: 'callout',
      color: 'orange',
      emoji: '⚠️',
      title: { tr: 'Güvenlik Uyarısı', en: 'Security Warning' },
      content: {
        tr: 'ACCESS_KEY\'i asla kaynak koduna yazmayın. .gitignore\'a .env ekleyin. CI/CD\'de GitHub Actions Secrets veya Jenkins Credentials kullanın. Anahtarınız sızdıysa BrowserStack Dashboard\'dan derhal yenileyin.',
        en: 'Never write the ACCESS_KEY directly in source code. Add .env to .gitignore. Use GitHub Actions Secrets or Jenkins Credentials in CI/CD. If your key is leaked, immediately regenerate it from the BrowserStack Dashboard.'
      }
    },
    {
      type: 'heading',
      text: { tr: 'Local Testing — Localhost\'u BrowserStack\'e Açma', en: 'Local Testing — Exposing Localhost to BrowserStack' }
    },
    {
      type: 'text',
      content: {
        tr: 'Geliştirme ortamınızdaki localhost\'u BrowserStack\'ten test etmek için BrowserStack Local binary\'sini çalıştırmanız gerekir. Bu binary, yerel makineniz ile BS sunucuları arasında şifreli bir tünel açar.',
        en: 'To test your localhost development environment from BrowserStack, you need to run the BrowserStack Local binary. This binary opens an encrypted tunnel between your local machine and BS servers.'
      }
    },
    {
      type: 'installation',
      steps: [
        {
          cmd: 'pip install browserstack-local',
          explanation: { tr: 'BS Local Python paketi kur.', en: 'Install BS Local Python package.' }
        },
        {
          cmd: 'BrowserStackLocal --key YOUR_ACCESS_KEY',
          explanation: { tr: 'Tüneli başlat. "You can now access your local server(s)..." mesajı görünmeli.', en: 'Start the tunnel. You should see "You can now access your local server(s)..." message.' }
        }
      ]
    },
    {
      type: 'quiz',
      question: {
        tr: 'browserstack.yml dosyasında "parallelsPerPlatform: 2" ve 3 tarayıcı tanımladıysanız, toplam kaç paralel test slotu kullanılır?',
        en: 'If you set "parallelsPerPlatform: 2" and defined 3 browsers in browserstack.yml, how many parallel test slots are used in total?'
      },
      options: [
        { id: 'a', text: '2' },
        { id: 'b', text: '3' },
        { id: 'c', text: '6' },
        { id: 'd', text: '1' }
      ],
      correct: 'c',
      explanation: {
        tr: 'parallelsPerPlatform x tarayıcı sayısı = 2 x 3 = 6 paralel slot. Her tarayıcı için ayrı ayrı 2 paralel test çalışır. Plan limitiniz bu sayıyı karşılamalıdır.',
        en: 'parallelsPerPlatform × browser count = 2 × 3 = 6 parallel slots. Two parallel tests run for each browser separately. Your plan limit must accommodate this number.'
      }
    }
  ]
}

// ─── SECTION 2: SELENIUM İLE BROWSERSTACK ────────────────────────────────────
const section2 = {
  title: { tr: '🔗 Selenium ile BrowserStack Entegrasyonu', en: '🔗 BrowserStack Integration with Selenium' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🤖',
      content: {
        tr: 'Selenium testini BrowserStack\'e taşımak, bir mektubun posta adresini değiştirmek gibidir. Mektup (test kodu) aynı kalır, sadece gideceği adres değişir (yerel ChromeDriver yerine BrowserStack hub\'ı).',
        en: 'Moving a Selenium test to BrowserStack is like changing the postal address of a letter. The letter (test code) stays the same; only the destination address changes (instead of local ChromeDriver, it points to the BrowserStack hub).'
      }
    },
    {
      type: 'heading',
      text: { tr: 'SDK ile Otomatik Entegrasyon (Önerilen)', en: 'Automatic Integration with SDK (Recommended)' }
    },
    {
      type: 'text',
      content: {
        tr: 'BrowserStack SDK, mevcut Selenium test kodunuza **hiç dokunmadan** testleri buluta taşır. SDK, pytest çalışırken araya girerek WebDriver bağlantısını otomatik olarak BrowserStack\'e yönlendirir. Java\'daki TestNG listener mantığına benzer.',
        en: 'The BrowserStack SDK moves tests to the cloud **without touching** your existing Selenium test code. The SDK intercepts pytest at runtime and automatically redirects WebDriver connections to BrowserStack. Similar to TestNG listener logic in Java.'
      }
    },
    {
      type: 'code',
      language: 'Python',
      content: { tr: '# test_login.py — Mevcut Selenium testiniz (DEĞİŞTİRME)', en: '# test_login.py — Your existing Selenium test (DO NOT CHANGE)' },
      code: `import pytest
from selenium import webdriver                    # Normal Selenium import
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture
def driver():
    """WebDriver fixture — SDK bu oluşturma sürecini otomatik yönetir"""
    options = webdriver.ChromeOptions()           # Normal Chrome options
    driver = webdriver.Chrome(options=options)    # Yerel ChromeDriver gibi görünür
    yield driver                                  # Testi çalıştır
    driver.quit()                                 # Temizlik yap

def test_login_page(driver):
    """Login sayfası başlık kontrolü"""
    driver.get("https://example.com/login")       # Siteye git
    title = driver.title                          # Başlığı al
    assert "Login" in title, f"Başlık yanlış: {title}"  # Doğrula`
    },
    {
      type: 'code',
      language: 'Bash',
      content: { tr: '# SDK ile çalıştır — test kodu değişmedi', en: '# Run with SDK — test code unchanged' },
      code: `# browserstack.yml dosyasının bulunduğu dizinde çalıştır
browserstack-sdk pytest test_login.py -v

# Paralel çalıştırmak için
browserstack-sdk pytest tests/ -v --tb=short`
    },
    {
      type: 'heading',
      text: { tr: 'Manuel Entegrasyon (SDK Olmadan)', en: 'Manual Integration (Without SDK)' }
    },
    {
      type: 'text',
      content: {
        tr: 'SDK kullanmak istemiyorsanız, RemoteWebDriver ile doğrudan BrowserStack\'e bağlanabilirsiniz. Bu yaklaşım Java\'daki RemoteWebDriver kullanımıyla birebir aynıdır.',
        en: 'If you don\'t want to use the SDK, you can connect directly to BrowserStack via RemoteWebDriver. This approach is identical to RemoteWebDriver usage in Java.'
      }
    },
    {
      type: 'code',
      language: 'Python',
      content: { tr: '# Manuel RemoteWebDriver bağlantısı', en: '# Manual RemoteWebDriver connection' },
      code: `import os
from selenium import webdriver

def get_bs_driver(test_name: str):
    """BrowserStack RemoteWebDriver oluşturan factory fonksiyon"""

    bs_options = {
        "userName": os.environ["BROWSERSTACK_USERNAME"],    # Env'den oku
        "accessKey": os.environ["BROWSERSTACK_ACCESS_KEY"],
        "os": "Windows",
        "osVersion": "11",
        "sessionName": test_name,                          # Dashboard'da görünür
        "buildName": "Regression-Sprint42",
        "networkLogs": True,                               # Ağ loglarını kaydet
        "consoleLogs": "errors",                           # Sadece hataları logla
        "video": True,                                     # Video kaydı aç
    }

    options = webdriver.ChromeOptions()
    options.browser_version = "latest"                     # Son sürüm Chrome
    options.set_capability("bstack:options", bs_options)   # BS özelliklerini ekle

    driver = webdriver.Remote(
        command_executor="https://hub.browserstack.com/wd/hub",  # BS hub
        options=options
    )
    return driver

# Kullanım
driver = get_bs_driver("Checkout Flow Test")
driver.get("https://shop.example.com")
print(driver.title)
driver.quit()`
    },
    {
      type: 'heading',
      text: { tr: 'Test Sonucu İşaretleme (Pass/Fail)', en: 'Marking Test Results (Pass/Fail)' }
    },
    {
      type: 'text',
      content: {
        tr: 'BrowserStack, testin geçip geçmediğini otomatik algılayamaz. Test sonucunu JavaScript executor ile bildirmeniz gerekir. Bu olmadan dashboard\'da tüm testler "Unknown" olarak görünür.',
        en: 'BrowserStack cannot automatically detect whether a test passed or failed. You need to report the result via JavaScript executor. Without this, all tests appear as "Unknown" in the dashboard.'
      }
    },
    {
      type: 'code',
      language: 'Python',
      content: { tr: '# Test sonucunu BrowserStack\'e bildir', en: '# Report test result to BrowserStack' },
      code: `import pytest
from selenium import webdriver

@pytest.fixture
def driver(request):
    """Pass/Fail işaretlemeli driver fixture"""
    # ... driver kurulumu ...
    options = webdriver.ChromeOptions()
    options.set_capability("bstack:options", {
        "userName": "USER", "accessKey": "KEY"
    })
    driver = webdriver.Remote(
        command_executor="https://hub.browserstack.com/wd/hub",
        options=options
    )
    yield driver

    # Test bitti — sonucu BrowserStack'e bildir
    test_result = "passed" if not request.node.rep_call.failed else "failed"
    reason = ""
    if request.node.rep_call.failed:
        reason = str(request.node.rep_call.longrepr)[:200]  # Hata mesajı

    # JavaScript executor ile BS API'yi çağır
    driver.execute_script(
        f'browserstack_executor: {{"action": "setSessionStatus", '
        f'"arguments": {{"status": "{test_result}", "reason": "{reason}"}}}}'
    )
    driver.quit()

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """pytest hook — test sonucunu fixture'a taşı"""
    outcome = yield
    rep = outcome.get_result()
    setattr(item, "rep_" + rep.when, rep)  # request.node.rep_call'u doldur`
    },
    {
      type: 'java-compare',
      topic: 'RemoteWebDriver',
      why: {
        tr: 'Java\'da Selenium Grid için RemoteWebDriver kullanırdınız. BrowserStack da aynı protokolü kullanır, sadece URL farklıdır.',
        en: 'In Java, you used RemoteWebDriver for Selenium Grid. BrowserStack uses the same protocol, just with a different URL.'
      },
      java: `// Java — Selenium Grid
DesiredCapabilities caps = new DesiredCapabilities();
caps.setCapability("browserName", "chrome");
caps.setCapability("os", "Windows");
caps.setCapability("os_version", "11");

WebDriver driver = new RemoteWebDriver(
    new URL("https://USER:KEY@hub.browserstack.com/wd/hub"),
    caps
);`,
      python: `# Python — BrowserStack (aynı mantık)
options = webdriver.ChromeOptions()
options.set_capability("bstack:options", {
    "userName": "USER",
    "accessKey": "KEY",
    "os": "Windows",
    "osVersion": "11",
})

driver = webdriver.Remote(
    command_executor="https://hub.browserstack.com/wd/hub",
    options=options
)`,
      note: { tr: 'URL formatı aynı: USERNAME:KEY@hub. Java\'dan Python\'a geçiş çok kolay.', en: 'URL format is the same: USERNAME:KEY@hub. Transition from Java to Python is straightforward.' }
    },
    {
      type: 'quiz',
      question: {
        tr: 'BrowserStack dashboard\'unda test durumu "Unknown" olarak görünüyorsa ne yapmalısın?',
        en: 'If the test status shows as "Unknown" on the BrowserStack dashboard, what should you do?'
      },
      options: [
        { id: 'a', text: { tr: 'Testi tekrar çalıştır', en: 'Re-run the test' } },
        { id: 'b', text: { tr: 'JavaScript executor ile setSessionStatus çağır', en: 'Call setSessionStatus via JavaScript executor' } },
        { id: 'c', text: { tr: 'ACCESS_KEY\'i değiştir', en: 'Change the ACCESS_KEY' } },
        { id: 'd', text: { tr: 'browserstack.yml\'i sil', en: 'Delete browserstack.yml' } }
      ],
      correct: 'b',
      explanation: {
        tr: 'BrowserStack, testin geçip geçmediğini kendisi bilemez. Test kodunuzda driver.execute_script("browserstack_executor: {action: setSessionStatus, arguments: {status: passed/failed}}") ile sonucu bildirmeniz gerekir. SDK kullanırsanız bu otomatik yapılır.',
        en: 'BrowserStack cannot determine whether a test passed or failed on its own. You need to report the result in your test code via driver.execute_script("browserstack_executor: {action: setSessionStatus, arguments: {status: passed/failed}}"). If you use the SDK, this is done automatically.'
      }
    }
  ]
}

// ─── SECTION 3: PLAYWRIGHT İLE BROWSERSTACK ──────────────────────────────────
const section3 = {
  title: { tr: '🎭 Playwright ile BrowserStack Entegrasyonu', en: '🎭 BrowserStack Integration with Playwright' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🎭',
      content: {
        tr: 'Playwright testlerini BrowserStack\'e taşımak da aynı "adres değiştirme" mantığıyla çalışır. Playwright, CDP (Chrome DevTools Protocol) üzerinden bağlanır. SDK bu bağlantıyı otomatik yönetir — test kodunuzda tek satır değişiklik gerekmez.',
        en: 'Moving Playwright tests to BrowserStack works the same "change the address" logic. Playwright connects via CDP (Chrome DevTools Protocol). The SDK manages this connection automatically — not a single line change in your test code.'
      }
    },
    {
      type: 'heading',
      text: { tr: 'Playwright SDK Kurulumu', en: 'Playwright SDK Setup' }
    },
    {
      type: 'installation',
      steps: [
        {
          cmd: 'pip install browserstack-sdk playwright pytest-playwright',
          explanation: { tr: 'BS SDK, Playwright ve pytest-playwright\'i kur.', en: 'Install BS SDK, Playwright, and pytest-playwright.' }
        },
        {
          cmd: 'playwright install chromium',
          explanation: { tr: 'Playwright tarayıcılarını indir (yerel geliştirme için).', en: 'Download Playwright browsers (for local development).' }
        }
      ]
    },
    {
      type: 'heading',
      text: { tr: 'browserstack.yml — Playwright Yapılandırması', en: 'browserstack.yml — Playwright Configuration' }
    },
    {
      type: 'code',
      language: 'YAML',
      content: { tr: '# Playwright için browserstack.yml', en: '# browserstack.yml for Playwright' },
      code: `userName: YOUR_USERNAME
accessKey: YOUR_ACCESS_KEY

buildName: "Playwright E2E Suite"
projectName: "E-Commerce Tests"

browsers:
  - browserName: chrome                    # Playwright destekli: chrome/edge/playwright-chromium
    browserVersion: latest
    os: Windows
    osVersion: 11

  - browserName: playwright-webkit         # Safari engine (sadece BS'te)
    browserVersion: latest
    os: OS X
    osVersion: Sonoma

  - browserName: playwright-firefox        # Firefox engine
    browserVersion: latest
    os: Windows
    osVersion: 11

parallelsPerPlatform: 2
framework: playwright                      # Playwright olduğunu belirt
playwrightVersion: 1.40.0                 # Playwright sürümü`
    },
    {
      type: 'heading',
      text: { tr: 'Playwright Test Kodu — Değişiklik Yok', en: 'Playwright Test Code — No Changes Needed' }
    },
    {
      type: 'code',
      language: 'Python',
      content: { tr: '# test_search.py — Normal Playwright testi, değiştirilmez', en: '# test_search.py — Normal Playwright test, no modifications' },
      code: `import pytest
from playwright.sync_api import Page, expect

def test_search_product(page: Page):
    """E-ticaret ürün arama testi"""
    page.goto("https://shop.example.com")              # Ana sayfaya git
    page.get_by_placeholder("Ürün ara...").fill("laptop")  # Arama kutusunu doldur
    page.get_by_role("button", name="Ara").click()    # Ara butonuna tıkla

    # Sonuçların yüklenmesini bekle
    expect(page.locator(".product-card")).to_have_count_greater_than(0)

    # İlk ürüne tıkla
    page.locator(".product-card").first.click()

    # Ürün detay sayfasında olduğumuzu doğrula
    expect(page).to_have_url(r".*product.*")
    expect(page.locator("h1")).to_be_visible()

def test_add_to_cart(page: Page):
    """Sepete ekleme testi"""
    page.goto("https://shop.example.com/product/1")
    page.get_by_role("button", name="Sepete Ekle").click()
    expect(page.locator(".cart-count")).to_have_text("1")  # Sepette 1 ürün`
    },
    {
      type: 'code',
      language: 'Bash',
      content: { tr: '# SDK ile Playwright testlerini BS\'te çalıştır', en: '# Run Playwright tests on BS with SDK' },
      code: `# Tüm testleri BS'te çalıştır
browserstack-sdk pytest tests/ -v

# Belirli bir test dosyasını çalıştır
browserstack-sdk pytest tests/test_search.py -v -k "test_search_product"

# Paralel mod (browserstack.yml'deki ayarlar devreye girer)
browserstack-sdk pytest tests/ -n auto`
    },
    {
      type: 'heading',
      text: { tr: 'Playwright vs Selenium — BrowserStack\'te Farklar', en: 'Playwright vs Selenium — Differences on BrowserStack' }
    },
    {
      type: 'table',
      headers: [
        { tr: 'Özellik', en: 'Feature' },
        'Selenium + BrowserStack',
        'Playwright + BrowserStack'
      ],
      rows: [
        ['Bağlantı', 'W3C WebDriver', 'CDP (Chrome DevTools Protocol)'],
        [{ tr: 'Driver kurulumu', en: 'Driver setup' }, { tr: 'ChromeDriver gerekir (SDK halleder)', en: 'Requires ChromeDriver (SDK handles)' }, { tr: 'Driver yok, doğrudan tarayıcı', en: 'No driver, direct browser control' }],
        [{ tr: 'Otomatik bekleme', en: 'Auto wait' }, { tr: 'Manuel WebDriverWait gerekir', en: 'Manual WebDriverWait required' }, { tr: 'Dahili auto-wait', en: 'Built-in auto-wait' }],
        [{ tr: 'iOS Safari', en: 'iOS Safari' }, { tr: 'Gerçek cihaz gerekir', en: 'Requires real device' }, { tr: 'playwright-webkit (simüle)', en: 'playwright-webkit (simulated)' }],
        [{ tr: 'Video kayıt', en: 'Video recording' }, { tr: 'BS altyapısı', en: 'BS infrastructure' }, { tr: 'BS altyapısı', en: 'BS infrastructure' }]
      ]
    },
    {
      type: 'callout',
      color: 'green',
      emoji: '✅',
      title: { tr: 'Ne Zaman Playwright + BrowserStack?', en: 'When to Use Playwright + BrowserStack?' },
      content: {
        tr: 'Yeni bir proje başlatıyorsanız ve cross-browser testine ihtiyaç duyuyorsanız Playwright + BrowserStack ideal kombinasyondur. Playwright\'ın dahili auto-wait\'i yazılacak test kodu miktarını azaltır. Eski Selenium projeniz varsa SDK ile dokunmadan BS\'e taşıyabilirsiniz.',
        en: 'If you\'re starting a new project and need cross-browser testing, Playwright + BrowserStack is the ideal combination. Playwright\'s built-in auto-wait reduces the amount of test code to write. If you have an existing Selenium project, you can move it to BS without touching it using the SDK.'
      }
    },
    {
      type: 'quiz',
      question: {
        tr: 'Playwright testlerini BrowserStack\'te çalıştırmak için test kodunda ne değiştirilmesi gerekir?',
        en: 'What needs to be changed in the test code to run Playwright tests on BrowserStack?'
      },
      options: [
        { id: 'a', text: { tr: 'Her test fonksiyonuna @browserstack decorator\'ü eklenmeli', en: 'Add @browserstack decorator to every test function' } },
        { id: 'b', text: { tr: 'Hiçbir şey — SDK her şeyi yönetir', en: 'Nothing — the SDK handles everything' } },
        { id: 'c', text: { tr: 'browser.connect() URL\'i değiştirilmeli', en: 'Change the browser.connect() URL' } },
        { id: 'd', text: { tr: 'pytest fixture\'ları yeniden yazılmalı', en: 'Rewrite pytest fixtures' } }
      ],
      correct: 'b',
      explanation: {
        tr: 'BrowserStack SDK, pytest çalışma zamanında araya girerek Playwright\'ın tarayıcı bağlantısını otomatik olarak BrowserStack\'e yönlendirir. Test kodunuzda hiçbir değişiklik yapmanıza gerek yoktur. Sadece browserstack-sdk pytest komutuyla çalıştırmanız yeterlidir.',
        en: 'The BrowserStack SDK intercepts pytest at runtime and automatically redirects Playwright\'s browser connection to BrowserStack. You don\'t need to change anything in your test code. Just run it with the browserstack-sdk pytest command.'
      }
    }
  ]
}

// ─── SECTION 4: GERÇEK HAYAT ─────────────────────────────────────────────────
const section4 = {
  title: { tr: '🛠️ Gerçek Hayat Kullanımı', en: '🛠️ Real World Usage' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🏪',
      content: {
        tr: 'Diyelim ki 200 ülkede satış yapan bir e-ticaret sitesinin QA mühendisisiniz. Safari\'de checkout düzgün görünüyor mu? Galaxy S23\'te butonlar tıklanabiliyor mu? BrowserStack, kendi cep telefonunuzu almadan bu soruları yanıtlamanızı sağlar.',
        en: 'Say you\'re a QA engineer for an e-commerce site selling in 200 countries. Does checkout look correct in Safari? Are buttons tappable on Galaxy S23? BrowserStack lets you answer these questions without buying the phones yourself.'
      }
    },
    {
      type: 'heading',
      text: { tr: 'Senaryo: CI/CD Pipeline\'a Entegrasyon', en: 'Scenario: CI/CD Pipeline Integration' }
    },
    {
      type: 'visual',
      variant: 'flow',
      title: { tr: 'GitHub Actions + BrowserStack Akışı', en: 'GitHub Actions + BrowserStack Flow' },
      steps: [
        { num: 1, label: 'Git Push', desc: { tr: 'Developer kodu iter', en: 'Developer pushes code' }, highlight: true },
        { num: 2, label: 'GitHub Actions', desc: { tr: 'Workflow tetiklenir', en: 'Workflow triggered' } },
        { num: 3, label: 'BS Automate', desc: { tr: '5 tarayıcı paralel', en: '5 browsers parallel' }, highlight: true },
        { num: 4, label: { tr: 'Sonuç', en: 'Result' }, desc: { tr: 'Pass/Fail + Video', en: 'Pass/Fail + Video' } },
        { num: 5, label: 'PR Check', desc: { tr: 'Merge/Block', en: 'Merge/Block' }, highlight: true }
      ]
    },
    {
      type: 'code',
      language: 'YAML',
      content: { tr: '# .github/workflows/browserstack.yml', en: '# .github/workflows/browserstack.yml' },
      code: `name: BrowserStack Cross-Browser Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  browserstack-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4             # Kodu çek

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: pip install -r requirements.txt  # Bağımlılıkları yükle

      - name: Run BrowserStack Tests
        env:
          BROWSERSTACK_USERNAME: \${{ secrets.BS_USERNAME }}    # GitHub Secret
          BROWSERSTACK_ACCESS_KEY: \${{ secrets.BS_ACCESS_KEY }}
        run: browserstack-sdk pytest tests/ -v --tb=short`
    },
    {
      type: 'heading',
      text: { tr: 'BrowserStack vs Rakipler', en: 'BrowserStack vs Competitors' }
    },
    {
      type: 'table',
      headers: [{ tr: 'Özellik', en: 'Feature' }, 'BrowserStack', 'Sauce Labs', 'LambdaTest'],
      rows: [
        [{ tr: 'Gerçek cihaz', en: 'Real devices' }, '✅ 3000+ cihaz', '✅ 800+ cihaz', '✅ 3000+ cihaz'],
        [{ tr: 'Ücretsiz plan', en: 'Free plan' }, '✅ 100 dk/ay', '❌ Yok', '✅ 100 dk/ay'],
        ['Percy (görsel test)', '✅ Dahili', '❌ Ayrı ürün', '✅ Smart UI'],
        [{ tr: 'Türkiye sunucusu', en: 'Turkey server' }, '❌', '❌', '❌'],
        ['Selenium + Playwright', '✅ Her ikisi', '✅ Her ikisi', '✅ Her ikisi'],
        [{ tr: 'Fiyat (aylık)', en: 'Price (monthly)' }, '$399+', '$499+', '$199+']
      ]
    },
    {
      type: 'callout',
      color: 'blue',
      emoji: '💡',
      title: { tr: 'Ne Zaman BrowserStack Tercih Et?', en: 'When to Choose BrowserStack?' },
      content: {
        tr: 'Safari/iOS testleri kritikse (BrowserStack\'in gerçek iPhone filosu rakipsiz), Percy ile görsel regresyon istiyorsanız ve ekibiniz hem Selenium hem Playwright kullanıyorsa BrowserStack en doğal seçimdir.',
        en: 'If Safari/iOS testing is critical (BrowserStack\'s real iPhone fleet is unmatched), you want visual regression with Percy, and your team uses both Selenium and Playwright, BrowserStack is the most natural choice.'
      }
    },
    {
      type: 'quiz',
      question: {
        tr: 'BrowserStack\'in Sauce Labs\'a karşı en güçlü avantajı nedir?',
        en: 'What is BrowserStack\'s strongest advantage over Sauce Labs?'
      },
      options: [
        { id: 'a', text: { tr: 'Daha ucuz', en: 'Cheaper price' } },
        { id: 'b', text: { tr: 'Percy görsel test + daha büyük gerçek cihaz filosu', en: 'Percy visual testing + larger real device fleet' } },
        { id: 'c', text: { tr: 'Sadece Selenium destekler', en: 'Only supports Selenium' } },
        { id: 'd', text: { tr: 'Açık kaynak', en: 'Open source' } }
      ],
      correct: 'b',
      explanation: {
        tr: 'BrowserStack, Percy görsel regresyon aracını bünyesinde barındırır ve 3000+ gerçek cihaz filosuna sahiptir. Özellikle iOS/Safari testi için gerçek iPhone ve iPad\'lere erişim sağlaması kritik bir avantajdır.',
        en: 'BrowserStack includes Percy visual regression tool and has a fleet of 3000+ real devices. Access to real iPhones and iPads for iOS/Safari testing is a critical advantage.'
      }
    }
  ]
}

// ─── SECTION 5: EKOSİSTEM ────────────────────────────────────────────────────
const section5 = {
  title: { tr: '🔗 Ekosistem & Entegrasyonlar', en: '🔗 Ecosystem & Integrations' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🧩',
      content: {
        tr: 'BrowserStack tek başına bir araç değil, bir ekosistemdir. Tıpkı Lego parçaları gibi; Jenkins ile bağlarsın, GitHub Actions\'a takarsın, Jira\'ya bağlarsın — hepsi birbirine kilitlenir.',
        en: 'BrowserStack is not just a tool, it\'s an ecosystem. Like Lego pieces; connect it to Jenkins, plug it into GitHub Actions, link it to Jira — they all lock together.'
      }
    },
    {
      type: 'heading',
      text: { tr: 'BrowserStack Ürün Ailesi', en: 'BrowserStack Product Family' }
    },
    {
      type: 'grid',
      cols: 2,
      items: [
        { icon: '🤖', label: 'Automate', desc: { tr: 'Selenium/WebDriver ile web testleri. 3000+ tarayıcı/OS kombinasyonu.', en: 'Web tests with Selenium/WebDriver. 3000+ browser/OS combinations.' } },
        { icon: '📱', label: 'App Automate', desc: { tr: 'Appium ile iOS/Android native app testleri. 3000+ gerçek cihaz.', en: 'iOS/Android native app tests with Appium. 3000+ real devices.' } },
        { icon: '👁️', label: 'Live', desc: { tr: 'Manuel interaktif test. Gerçek tarayıcıda canlı kontrol.', en: 'Manual interactive testing. Live control on real browsers.' } },
        { icon: '🎨', label: 'Percy', desc: { tr: 'Görsel regresyon. Her PR\'da piksel farkı yakalanır.', en: 'Visual regression. Pixel differences caught on every PR.' } },
        { icon: '♿', label: 'Accessibility', desc: { tr: 'WCAG 2.1/2.2 taraması. ADA compliance kontrolü.', en: 'WCAG 2.1/2.2 scanning. ADA compliance checks.' } },
        { icon: '⚡', label: 'Automate TurboScale', desc: { tr: 'Büyük enterprise için sınırsız paralel test slotu.', en: 'Unlimited parallel test slots for large enterprise.' } }
      ]
    },
    {
      type: 'heading',
      text: { tr: 'Popüler Entegrasyonlar', en: 'Popular Integrations' }
    },
    {
      type: 'table',
      headers: [{ tr: 'Araç', en: 'Tool' }, { tr: 'Entegrasyon Tipi', en: 'Integration Type' }, { tr: 'Ne Sağlar?', en: 'What Does It Provide?' }],
      rows: [
        ['GitHub Actions', 'CI/CD', { tr: 'Her push\'ta otomatik test', en: 'Automatic test on every push' }],
        ['Jenkins', 'CI/CD', { tr: 'Pipeline\'a BS plugin entegrasyonu', en: 'BS plugin integration into pipeline' }],
        ['Jira', { tr: 'Hata Takip', en: 'Bug Tracking' }, { tr: 'Başarısız test otomatik Jira ticket açar', en: 'Failed test auto-creates Jira ticket' }],
        ['Slack', { tr: 'Bildirim', en: 'Notification' }, { tr: 'Test sonuçları Slack\'e gönderilir', en: 'Test results sent to Slack' }],
        ['Allure', { tr: 'Raporlama', en: 'Reporting' }, { tr: 'BS + Allure = zengin HTML rapor', en: 'BS + Allure = rich HTML report' }],
        ['Docker', 'Container', { tr: 'Test ortamı container\'da, BS bulutta', en: 'Test env in container, BS in cloud' }]
      ]
    },
    {
      type: 'heading',
      text: { tr: 'Percy — Görsel Regresyon Entegrasyonu', en: 'Percy — Visual Regression Integration' }
    },
    {
      type: 'code',
      language: 'Python',
      content: { tr: '# Percy ile görsel snapshot testi', en: '# Visual snapshot testing with Percy' },
      code: `from percy import percy_snapshot          # Percy Python paketi
from selenium import webdriver

driver = webdriver.Remote(               # BS bağlantısı
    command_executor="https://hub.browserstack.com/wd/hub",
    options=options
)

driver.get("https://shop.example.com")  # Sayfaya git
percy_snapshot(driver, "Homepage")      # Snapshot al — Percy karşılaştırır

driver.get("https://shop.example.com/cart")
percy_snapshot(driver, "Cart Page")     # 2. snapshot

driver.quit()`
    },
    {
      type: 'quiz',
      question: {
        tr: 'Bir QA mühendisi her PR\'da görsel değişiklikleri otomatik yakalamak istiyor. Hangi BrowserStack ürünü kullanmalı?',
        en: 'A QA engineer wants to automatically catch visual changes on every PR. Which BrowserStack product should they use?'
      },
      options: [
        { id: 'a', text: 'BrowserStack Live' },
        { id: 'b', text: 'Percy' },
        { id: 'c', text: 'App Automate' },
        { id: 'd', text: 'Accessibility' }
      ],
      correct: 'b',
      explanation: {
        tr: 'Percy, her PR\'da sayfanın görsel snapshot\'larını alır ve önceki onaylı snapshot ile piksel bazında karşılaştırır. CSS değişiklikleri, font farklılıkları gibi görsel regresyonları otomatik yakalar.',
        en: 'Percy takes visual snapshots of pages on every PR and compares them pixel-by-pixel with the previously approved snapshot. It automatically catches visual regressions like CSS changes and font differences.'
      }
    }
  ]
}

// ─── SECTION 6: YAYGIN HATALAR ───────────────────────────────────────────────
const section6 = {
  title: { tr: '🚨 Yaygın Hatalar & Çözümleri', en: '🚨 Common Errors & Solutions' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔧',
      content: {
        tr: 'BrowserStack\'te karşılaşılan hataların çoğu ya kimlik doğrulama sorunlarından ya da capability yanlış yazımından kaynaklanır. Her hata için terminal çıktısını ve BS Dashboard loglarını birlikte incele.',
        en: 'Most errors on BrowserStack originate from authentication issues or misconfigured capabilities. For each error, examine both the terminal output and BrowserStack Dashboard logs together.'
      }
    },
    {
      type: 'error-dictionary',
      framework: 'BrowserStack',
      errors: [
        {
          error: 'Invalid Credentials',
          fullMessage: 'BrowserStack Error: Invalid credentials. Username/Access Key is incorrect.',
          cause: { tr: 'USERNAME veya ACCESS_KEY yanlış girilmiş ya da env değişkeni okunamamış.', en: 'USERNAME or ACCESS_KEY entered incorrectly, or env variable could not be read.' },
          solution: { tr: '1) BS Dashboard → Account → Settings\'den KEY\'i kopyala. 2) os.environ ile KEY\'in okunduğunu print ile doğrula. 3) .env dosyasında boşluk veya tırnak işareti olmadığını kontrol et.', en: '1) Copy KEY from BS Dashboard → Account → Settings. 2) Verify with print that KEY is being read via os.environ. 3) Check .env file for spaces or quotes.' },
          codeWrong: `# YANLIŞ — Sabit kodlanmış ve yanlış key
driver = webdriver.Remote(
    command_executor="https://wrong_user:wrong_key@hub.browserstack.com/wd/hub"
)`,
          codeFixed: `# DOĞRU — Env'den oku
import os
username = os.environ["BROWSERSTACK_USERNAME"]    # Env'den al
access_key = os.environ["BROWSERSTACK_ACCESS_KEY"]
url = f"https://{username}:{access_key}@hub.browserstack.com/wd/hub"
driver = webdriver.Remote(command_executor=url, options=options)`
        },
        {
          error: 'Session Not Created',
          fullMessage: 'WebDriverException: Message: Session not created. Capabilities did not match.',
          cause: { tr: 'os, osVersion veya browserVersion değerleri geçersiz. BrowserStack tüm kombinasyonları desteklemez.', en: 'os, osVersion, or browserVersion values are invalid. BrowserStack doesn\'t support all combinations.' },
          solution: { tr: '1) BS Capabilities Generator\'ü kullan: browserstack.com/automate/capabilities. 2) os + osVersion kombinasyonlarını kontrol et (ör. "OS X" + "Sonoma" doğru, "MacOS" + "Sonoma" yanlış).', en: '1) Use the BS Capabilities Generator: browserstack.com/automate/capabilities. 2) Check os + osVersion combinations (e.g., "OS X" + "Sonoma" correct, "MacOS" + "Sonoma" wrong).' },
          codeWrong: `# YANLIŞ — Yanlış OS adı
bstack_options = {
    "os": "MacOS",           # Yanlış! "OS X" olmalı
    "osVersion": "Sonoma",
}`,
          codeFixed: `# DOĞRU — BS Capabilities Generator'dan alınan değer
bstack_options = {
    "os": "OS X",            # Doğru format
    "osVersion": "Sonoma",
    "browserName": "Safari",
    "browserVersion": "17.0",
}`
        },
        {
          error: 'Parallel Limit Exceeded',
          fullMessage: 'BrowserStack Error: You have exceeded the allowed number of parallel sessions.',
          cause: { tr: 'Plan limitinden fazla paralel test çalıştırılmaya çalışıldı. Free plan sadece 1 paralel session sunar.', en: 'Tried to run more parallel tests than the plan limit. Free plan offers only 1 parallel session.' },
          solution: { tr: '1) browserstack.yml\'de parallelsPerPlatform değerini plan limitine göre ayarla. 2) BS Dashboard → Plan\'dan mevcut limiti kontrol et. 3) Testleri sıralı çalıştırmak için -n 1 kullan.', en: '1) Set parallelsPerPlatform in browserstack.yml according to plan limit. 2) Check current limit from BS Dashboard → Plan. 3) Use -n 1 to run tests sequentially.' },
          codeWrong: `# browserstack.yml — Limit aşımı
parallelsPerPlatform: 10   # Free plan'da sadece 1 izinli`,
          codeFixed: `# browserstack.yml — Plan limitine uygun
parallelsPerPlatform: 1    # Free plan için
# Paid plan'da daha yüksek değer girebilirsin`
        },
        {
          error: 'TimeoutException (Session Timeout)',
          fullMessage: 'urllib3.exceptions.MaxRetryError: Session timed out. Inactivity detected for 90 seconds.',
          cause: { tr: 'Test 90 saniye boyunca herhangi bir WebDriver komutu göndermedi. BS otomatik olarak session\'ı sonlandırdı.', en: 'Test didn\'t send any WebDriver command for 90 seconds. BS automatically terminated the session.' },
          solution: { tr: '1) Uzun sleep() çağrılarını WebDriverWait ile değiştir. 2) BS Dashboard\'dan hangi adımda timeout olduğunu videoda izle. 3) idleTimeout capability ile süreyi uzat (max 300s).', en: '1) Replace long sleep() calls with WebDriverWait. 2) Watch the video in BS Dashboard to see which step timed out. 3) Extend the timeout using idleTimeout capability (max 300s).' },
          codeWrong: `# YANLIŞ — Uzun sleep test'i dondurur
import time
driver.get("https://example.com")
time.sleep(120)   # 90s limit aşıldı, BS session'ı keser`,
          codeFixed: `# DOĞRU — Explicit wait kullan
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver.get("https://example.com")
wait = WebDriverWait(driver, 30)   # Max 30s bekle
element = wait.until(EC.visibility_of_element_located((By.ID, "result")))`
        },
        {
          error: 'Local Binary Not Running',
          fullMessage: 'BrowserStack Error: We could not connect to your local server. Please ensure BrowserStackLocal binary is running.',
          cause: { tr: 'browserstackLocal: true capability aktifken BrowserStack Local binary çalışmıyor.', en: 'BrowserStack Local binary is not running while browserstackLocal: true capability is active.' },
          solution: { tr: '1) Ayrı terminal\'de BrowserStackLocal --key ACCESS_KEY komutunu çalıştır. 2) "You can now access your local server(s)" mesajını bekle. 3) Sonra testleri çalıştır.', en: '1) Run BrowserStackLocal --key ACCESS_KEY in a separate terminal. 2) Wait for the "You can now access your local server(s)" message. 3) Then run the tests.' },
          codeWrong: `# browserstack.yml — Local açık ama binary yok
browserstackLocal: true   # Binary çalışmazsa bağlantı hatası`,
          codeFixed: `# Terminal 1:
# BrowserStackLocal --key YOUR_ACCESS_KEY

# Terminal 2 (binary çalışınca):
# browserstack-sdk pytest tests/`
        },
        {
          error: 'NoSuchElementException on Real Device',
          fullMessage: 'selenium.common.exceptions.NoSuchElementException: no such element: Unable to locate element',
          cause: { tr: 'Gerçek cihazda sayfa yüklenme süresi yerel ortamdan farklı. Element henüz yüklenmemişken aranıyor.', en: 'Page load time differs on real device from local environment. Element is searched before it\'s loaded.' },
          solution: { tr: '1) Her find_element öncesine explicit wait ekle. 2) BS Dashboard\'da video\'yu izle — element gerçekten sayfada var mı? 3) Locator\'ın cihaza özel CSS değişikliklerinden etkilenip etkilenmediğini kontrol et.', en: '1) Add explicit wait before every find_element. 2) Watch the video in BS Dashboard — is the element actually on the page? 3) Check if the locator is affected by device-specific CSS changes.' },
          codeWrong: `driver.find_element(By.ID, "submit-btn").click()   # Wait yok`,
          codeFixed: `wait = WebDriverWait(driver, 15)
btn = wait.until(EC.element_to_be_clickable((By.ID, "submit-btn")))
btn.click()`
        },
        {
          error: 'Build Not Found',
          fullMessage: 'BrowserStack Error: Build "Sprint-42" not found or has expired.',
          cause: { tr: 'BS\'te build\'lar varsayılan olarak 60 gün sonra silinir. Eski bir build\'e referans veriliyor.', en: 'Builds on BS are deleted after 60 days by default. A reference is made to an old build.' },
          solution: { tr: '1) buildName\'i dinamik yapın: f"Build-{datetime.now().strftime(\'%Y%m%d-%H%M\')}". 2) Build\'i arşivlemek için BS Dashboard\'u kullanın. 3) CI\'da build ID otomatik üretin.', en: '1) Make buildName dynamic: f"Build-{datetime.now().strftime(\'%Y%m%d-%H%M\')}". 2) Use BS Dashboard to archive builds. 3) Auto-generate build ID in CI.' },
          codeWrong: `bstack_options = {
    "buildName": "Sprint-42"   # Sabit isim — 60 gün sonra silinir
}`,
          codeFixed: `from datetime import datetime
bstack_options = {
    "buildName": f"Build-{datetime.now().strftime('%Y%m%d-%H%M')}"  # Dinamik
}`
        },
        {
          error: 'Certificate Error (HTTPS)',
          fullMessage: 'net::ERR_CERT_AUTHORITY_INVALID or SSL certificate error on real device',
          cause: { tr: 'Self-signed sertifika kullanan staging ortamı gerçek cihazda güvenilmez olarak işaretleniyor.', en: 'Staging environment with self-signed certificate is marked as untrusted on the real device.' },
          solution: { tr: '1) capability\'e "acceptSslCerts": true ekle. 2) BrowserStack Local binary ile tünelden geçirerek sertifika sorununu atla. 3) Staging için geçerli bir SSL sertifikası al (Let\'s Encrypt).', en: '1) Add "acceptSslCerts": true to capabilities. 2) Bypass certificate issues by tunneling through BrowserStack Local binary. 3) Get a valid SSL certificate for staging (Let\'s Encrypt).' },
          codeWrong: `# Sertifika kabulü eksik
bstack_options = { "os": "Windows", "osVersion": "11" }`,
          codeFixed: `bstack_options = {
    "os": "Windows",
    "osVersion": "11",
    "acceptSslCerts": True,      # Self-signed sertifikayı kabul et
    "browserstackLocal": True,   # Lokal tünel üzerinden git
}`
        }
      ]
    }
  ]
}

// ─── SECTION 7: MÜLAKAT SORULARI (50 SORU) ───────────────────────────────────
const section7 = {
  title: { tr: '💼 Mülakat Soruları (50 Soru)', en: '💼 Interview Questions (50 Questions)' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🎯',
      content: {
        tr: 'BrowserStack mülakat soruları genellikle "Neden BrowserStack kullandınız?" ile başlar ama devamında "Paralel testleri nasıl yönettiniz?", "Flaky test probleminizi nasıl çözdünüz?" gibi senaryo bazlı sorulara geçer.',
        en: 'BrowserStack interview questions usually start with "Why did you use BrowserStack?" but continue with scenario-based questions like "How did you manage parallel tests?" and "How did you solve flaky test problems?"'
      }
    },
    {
      type: 'interview-questions',
      topic: 'BrowserStack',
      questions: [
        // ── BASIC (15) ──
        {
          level: 'basic',
          q: { tr: 'Bir projede BrowserStack\'i tercih ettiğinizde bunu şirketinize nasıl gerekçelendirdiniz?', en: 'When you chose BrowserStack for a project, how did you justify this to your company?' },
          a: { tr: 'BrowserStack\'i tercih etmemin temel gerekçesi altyapı maliyetiydi. 50 farklı tarayıcı/cihaz kombinasyonu için gerçek donanım almak ve bakımını yapmak, BrowserStack aboneliğinden çok daha pahalıya geliyor. Ek olarak, Selenium Grid\'i kendi kurup yönetmek DevOps ekibine yük bindirirken BrowserStack bu sorumluluğu kaldırıyor. Java\'da Selenium Grid kurduğumuzda hub/node yönetimi için ciddi zaman harcardık; BrowserStack bunu sıfıra indiriyor.', en: 'My main justification for choosing BrowserStack was infrastructure cost. Buying and maintaining real hardware for 50 different browser/device combinations is far more expensive than a BrowserStack subscription. Additionally, setting up and managing your own Selenium Grid puts a burden on the DevOps team, which BrowserStack eliminates. When we set up Selenium Grid in Java, we spent significant time managing hub/node; BrowserStack reduces this to zero.' }
        },
        {
          level: 'basic',
          q: { tr: 'BrowserStack Automate ile App Automate arasındaki fark nedir, hangisini ne zaman kullanırsınız?', en: 'What is the difference between BrowserStack Automate and App Automate, when do you use which?' },
          a: { tr: 'Automate, web tarayıcısı testleri için kullanılır — Selenium veya Playwright ile masaüstü/mobil tarayıcıları test edersiniz. App Automate ise iOS ve Android\'de native uygulama testleri için — Appium kullanırsınız. E-ticaret web sitem için Automate, mobil uygulaması için App Automate kullandım. Java analojisi: Automate = WebDriver, App Automate = AppiumDriver.', en: 'Automate is for web browser testing — you test desktop/mobile browsers with Selenium or Playwright. App Automate is for native app testing on iOS and Android — you use Appium. I used Automate for my e-commerce website and App Automate for its mobile app. Java analogy: Automate = WebDriver, App Automate = AppiumDriver.' }
        },
        {
          level: 'basic',
          q: { tr: 'BrowserStack\'te bir testi çalıştırdığınızda dashboard\'da "Unknown" görünüyorsa ne yaparsınız?', en: 'When you run a test on BrowserStack and the dashboard shows "Unknown", what do you do?' },
          a: { tr: '"Unknown" durumu, BrowserStack\'in test sonucunu bilemediği anlamına gelir. Çözüm olarak driver.execute_script ile setSessionStatus JavaScript executor komutunu çağırıyorum: passed veya failed değerini ve açıklamasını gönderiyorum. BrowserStack SDK kullanılıyorsa bu otomatik yapılır. Sonucu doğrulamak için BS Dashboard → Sessions\'dan video ve logları inceliyorum.', en: '"Unknown" status means BrowserStack doesn\'t know the test result. As a solution, I call the setSessionStatus JavaScript executor command via driver.execute_script: sending the passed or failed value and description. If using the BrowserStack SDK, this is done automatically. To verify the result, I examine the video and logs from BS Dashboard → Sessions.' }
        },
        {
          level: 'basic',
          q: { tr: 'ACCESS_KEY\'i kaynak koduna yazmak neden tehlikelidir ve alternatifi nedir?', en: 'Why is writing the ACCESS_KEY directly in source code dangerous, and what is the alternative?' },
          a: { tr: 'Kaynak koduna yazılan ACCESS_KEY, git geçmişinde sonsuza kadar kalır — repo public yapılırsa veya sızarsa BrowserStack hesabına yetkisiz erişim sağlanabilir. Alternatif olarak .env dosyası ve os.environ kullanılır, .gitignore\'a .env eklenir. CI/CD\'de GitHub Actions Secrets veya Jenkins Credentials tercih edilir. Java\'da da aynı prensip: properties dosyası System.getenv() ile okunur.', en: 'An ACCESS_KEY written in source code stays in git history forever — if the repo becomes public or is leaked, unauthorized access to the BrowserStack account becomes possible. The alternative is using a .env file and os.environ, with .env added to .gitignore. In CI/CD, GitHub Actions Secrets or Jenkins Credentials are preferred. The same principle applies in Java: properties file is read with System.getenv().' }
        },
        {
          level: 'basic',
          q: { tr: 'BrowserStack Local ne için kullanılır, hangi senaryolarda şarttır?', en: 'What is BrowserStack Local used for, and in which scenarios is it mandatory?' },
          a: { tr: 'BrowserStack Local, yerel makinenizdeki veya iç ağdaki sunucuları BrowserStack\'e açan şifreli bir tünel kurar. Staging ortamı veya localhost gibi internet\'e kapalı adresleri test etmek için şarttır. BrowserStackLocal binary\'yi başlatıp browserstackLocal: true capability\'sini ekleyerek etkinleştiriyorsunuz. CI/CD\'de de binary\'yi pipeline\'da başlatmanız gerekiyor.', en: 'BrowserStack Local creates an encrypted tunnel that exposes your local machine or internal network servers to BrowserStack. It\'s mandatory for testing staging environments or localhost addresses that aren\'t accessible from the internet. You activate it by starting the BrowserStackLocal binary and adding the browserstackLocal: true capability. In CI/CD, you also need to start the binary in the pipeline.' }
        },
        {
          level: 'basic',
          q: { tr: 'Percy ile görsel regresyon testini açıklar mısınız? Hangi tür değişiklikleri yakalar?', en: 'Can you explain visual regression testing with Percy? What kinds of changes does it catch?' },
          a: { tr: 'Percy, her test çalışmasında sayfanın piksel bazlı snapshot\'ını alır ve önceki onaylı snapshot ile karşılaştırır. CSS değişiklikleri, font farklılıkları, misaligned elementler, renk hataları ve layout kaymaları gibi "gözle görülebilir ama assertion yazılmayan" değişiklikleri yakalar. PR\'da "BS Percy" check\'i görünür; reviewer farkı görüntüleyip onaylar ya da reddeder.', en: 'Percy takes a pixel-level snapshot of the page at each test run and compares it with the previously approved snapshot. It catches "visually visible but not assertion-covered" changes like CSS changes, font differences, misaligned elements, color errors, and layout shifts. The "BS Percy" check appears on PRs; the reviewer views the diff and approves or rejects it.' }
        },
        {
          level: 'basic',
          q: { tr: 'browserstack.yml dosyasında "browsers" dizisini 3 tarayıcıyla tanımladınızda ne olur?', en: 'What happens when you define the "browsers" array with 3 browsers in browserstack.yml?' },
          a: { tr: 'Her test senaryosu 3 tarayıcının hepsinde çalışır. parallelsPerPlatform değerine göre aynı anda çalışan test sayısı belirlenir. Örneğin 5 test ve 3 tarayıcı varsa toplamda 15 session açılır. Bu, Java\'da TestNG cross-browser matrix\'ine benzer; fark BrowserStack\'in altyapıyı sağlamasıdır.', en: 'Every test scenario runs on all 3 browsers. The number of tests running simultaneously is determined by the parallelsPerPlatform value. For example, with 5 tests and 3 browsers, 15 sessions are opened in total. This is similar to the TestNG cross-browser matrix in Java; the difference is that BrowserStack provides the infrastructure.' }
        },
        {
          level: 'basic',
          q: { tr: 'BrowserStack Automate\'te bir testin video kaydını nasıl alırsınız ve ne zaman izlersiniz?', en: 'How do you get a video recording of a test in BrowserStack Automate, and when do you watch it?' },
          a: { tr: 'bstack:options içinde "video": True capability\'sini ekleyerek veya browserstack.yml\'de etkinleştirerek video kaydını açarsınız. Test bittikten sonra BS Dashboard → Sessions → ilgili session → Video sekmesinden izleyebilirsiniz. En çok yerel ortamda geçen ama BS\'te başarısız olan flaky testleri debuglarken ve gerçek cihazda timing sorunlarını analiz ederken kullanıyorum.', en: 'You enable video recording by adding the "video": True capability inside bstack:options, or by enabling it in browserstack.yml. After the test finishes, you can watch it from BS Dashboard → Sessions → relevant session → Video tab. I use it most when debugging flaky tests that pass locally but fail on BS, and when analyzing timing issues on real devices.' }
        },
        {
          level: 'basic',
          q: { tr: 'Ücretsiz BrowserStack planının kısıtlamaları nelerdir?', en: 'What are the limitations of the free BrowserStack plan?' },
          a: { tr: 'Ücretsiz plan ayda 100 dakika Automate süresi ve 1 paralel session sunar. Gerçek mobil cihaz erişimi sınırlıdır, Percy ücretsiz 5000 screenshot/ay içerir. Bu kısıtlamalar küçük projeler veya PoC için yeterliyken, büyük regresyon suite\'leri için yetersiz kalır. Takımlar genellikle Automate başlangıç planıyla ($399/ay) başlar.', en: 'The free plan offers 100 minutes of Automate time per month and 1 parallel session. Real mobile device access is limited; Percy includes 5000 screenshots/month for free. These limitations are sufficient for small projects or PoC, but insufficient for large regression suites. Teams generally start with the Automate starter plan ($399/month).' }
        },
        {
          level: 'basic',
          q: { tr: 'BrowserStack SDK kullanmanın manuel RemoteWebDriver bağlantısına göre avantajları nelerdir?', en: 'What are the advantages of using the BrowserStack SDK over manual RemoteWebDriver connection?' },
          a: { tr: 'SDK kullanımının üç büyük avantajı var: 1) Test kodunuza hiç dokunmadan BS\'e taşırsınız — mevcut Selenium/Playwright kodu çalışır. 2) Pass/Fail durumu otomatik raporlanır, JavaScript executor eklemeniz gerekmez. 3) Hata logları ve BS Dashboard entegrasyonu otomatik yapılır. Manuel bağlantı ise daha fazla kontrol isteyenler ve özel capability\'ler gereken durumlar için tercih edilir.', en: 'SDK usage has three major advantages: 1) You move to BS without touching your test code — existing Selenium/Playwright code works. 2) Pass/Fail status is automatically reported, no need to add JavaScript executor. 3) Error logs and BS Dashboard integration are done automatically. Manual connection is preferred for those who want more control and for situations requiring custom capabilities.' }
        },
        {
          level: 'basic',
          q: { tr: 'BrowserStack\'te iOS Safari testinin önemi nedir? Lokal olarak nasıl taklit edilir?', en: 'Why is iOS Safari testing important on BrowserStack? How is it simulated locally?' },
          a: { tr: 'iOS Safari, masaüstü Safari\'den farklı bir WebKit engine\'i kullanır ve yalnızca Apple cihazlarda çalışır. Lokal olarak simüle edilmesi çok zordur: macOS üzerinde Xcode Simulator ile kısmi taklit mümkünse de gerçek cihaz davranışından farklı olabilir. BrowserStack\'in gerçek iPhone ve iPad filosu, iOS Safari hatalarını gerçek donanımda yakalamanızı sağlar. Web sitelerinin yaklaşık %25\'i mobil Safari ile açıldığından bu testler kritiktir.', en: 'iOS Safari uses a different WebKit engine from desktop Safari and only runs on Apple devices. Simulating it locally is very difficult: partial simulation is possible with Xcode Simulator on macOS but may differ from real device behavior. BrowserStack\'s real iPhone and iPad fleet lets you catch iOS Safari bugs on real hardware. Since approximately 25% of websites are opened with mobile Safari, these tests are critical.' }
        },
        {
          level: 'basic',
          q: { tr: 'buildName ve sessionName capability\'lerini neden kullanmalısınız?', en: 'Why should you use the buildName and sessionName capabilities?' },
          a: { tr: 'buildName, birden fazla session\'ı mantıksal olarak gruplandırır — "Sprint-42 Regression" gibi bir isimle dashboard\'da kolayca filtreleyebilirsiniz. sessionName, her bir test session\'ına açıklayıcı bir ad verir ("Login Test", "Checkout Flow") ve başarısız session\'ları hızlıca tespit etmenizi sağlar. Bunlar olmadan dashboard\'da yüzlerce isimsiz session arasında arama yapmak zorunda kalırsınız.', en: 'buildName logically groups multiple sessions together — you can easily filter in the dashboard with a name like "Sprint-42 Regression." sessionName gives each test session a descriptive name ("Login Test", "Checkout Flow") and allows you to quickly identify failing sessions. Without these, you\'d have to search through hundreds of unnamed sessions in the dashboard.' }
        },
        {
          level: 'basic',
          q: { tr: 'Selenium testini BrowserStack\'e taşıdığınızda test kodunda ne değiştirilmesi gerekir?', en: 'When moving a Selenium test to BrowserStack, what needs to be changed in the test code?' },
          a: { tr: 'SDK kullanılıyorsa: hiçbir şey. Test kodu tamamen aynı kalır, sadece browserstack-sdk komutuyla çalıştırırsınız. Manuel bağlantıda ise: WebDriver oluşturma kısmını RemoteWebDriver ile değiştirirsiniz ve bstack:options capability\'lerini eklersiniz. Test mantığı (click, assert, wait) değişmez. Bu, Java\'da TestNG XML\'inden Selenium Grid\'e taşımayla aynı mantıktır.', en: 'If using SDK: nothing. The test code remains exactly the same, you just run it with the browserstack-sdk command. With manual connection: you replace the WebDriver creation part with RemoteWebDriver and add bstack:options capabilities. The test logic (click, assert, wait) doesn\'t change. This is the same logic as moving from TestNG XML to Selenium Grid in Java.' }
        },
        {
          level: 'basic',
          q: { tr: 'BrowserStack Dashboard\'unda bir başarısız testi debug etmek için hangi bilgilere bakarsınız?', en: 'What information do you look at in the BrowserStack Dashboard to debug a failing test?' },
          a: { tr: 'Sırasıyla şu kaynaklara bakıyorum: 1) Video kaydı — görsel olarak neyin yanlış gittiğini görürüm. 2) Text Logs — WebDriver komutlarının sırasını ve hata mesajını gösterir. 3) Network Logs — API çağrıları başarısız mıydı? 4) Console Logs — JavaScript hatası var mıydı? 5) Screenshots — her adımın ekran görüntüleri. Video genellikle en hızlı sorun tespiti sağlar.', en: 'I look at these sources in order: 1) Video recording — I visually see what went wrong. 2) Text Logs — shows the sequence of WebDriver commands and the error message. 3) Network Logs — were API calls failing? 4) Console Logs — were there JavaScript errors? 5) Screenshots — screenshots of each step. Video usually provides the fastest problem identification.' }
        },
        {
          level: 'basic',
          q: { tr: 'BrowserStack\'te Accessibility testini nasıl çalıştırırsınız?', en: 'How do you run Accessibility tests on BrowserStack?' },
          a: { tr: 'BrowserStack Accessibility Testing, Selenium test kodunuza birkaç satır ekleyerek WCAG 2.1/2.2 uyumluluğunu kontrol eder. capability\'e "accessibilityTesting": True eklendiğinde BS her sayfayı otomatik tarar ve ihlalleri dashboard\'da listeler. Ayrıca standalone Accessibility Automation modülü, URL listesi vererek tüm site taraması yapmanızı da sağlar.', en: 'BrowserStack Accessibility Testing checks WCAG 2.1/2.2 compliance by adding a few lines to your Selenium test code. When "accessibilityTesting": True is added to capabilities, BS automatically scans each page and lists violations in the dashboard. The standalone Accessibility Automation module also lets you scan an entire site by providing a URL list.' }
        },

        // ── INTERMEDIATE (20) ──
        {
          level: 'intermediate',
          q: { tr: 'Production deployment sonrası BrowserStack\'te otomatik smoke test nasıl kurulur?', en: 'How do you set up automatic smoke tests on BrowserStack after production deployment?' },
          a: { tr: 'CD pipeline\'ın son adımına BS Automate tetikleyicisi eklenebilir. GitHub Actions\'da deploy-to-prod job\'ından sonra ayrı bir smoke-test job çalışır: BROWSERSTACK_USERNAME/ACCESS_KEY secret\'ları inject edilir, pytest tests/smoke/ komutunu browserstack-sdk üzerinden çalıştırır. Testler başarısız olursa pipeline fail etmeli ve alerting sistemi (Slack/PagerDuty) tetiklenmelidir. Bu Java\'daki Maven lifecycle\'da post-integration-test fazına benzer.', en: 'A BS Automate trigger can be added to the last step of the CD pipeline. In GitHub Actions, a separate smoke-test job runs after the deploy-to-prod job: BS_USERNAME/ACCESS_KEY secrets are injected, it runs pytest tests/smoke/ via browserstack-sdk. If tests fail, the pipeline should fail and alerting systems (Slack/PagerDuty) should be triggered. This is similar to the post-integration-test phase in Maven lifecycle in Java.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'te flaky (kararsız) testlerle nasıl başa çıkarsınız?', en: 'How do you handle flaky (unstable) tests on BrowserStack?' },
          a: { tr: 'Flaky testleri BS Dashboard\'da "Flaky" olarak etiketleyerek takip ediyorum. Çözüm adımları: 1) Video kaydından timing sorununu tespit et. 2) Tüm sleep() çağrılarını WebDriverWait ile değiştir. 3) Locator\'ı sağlamlaştır — dinamik ID yerine data-testid kullan. 4) BS\'nin "Mark as Flaky" özelliğiyle bu testleri CI\'da gecici olarak blocklamadan çalıştır. 5) Gerçek bir bug ise JIRA\'ya ticket aç. Java\'da TestNG retry analyzer kullandığımız mantığın aynısı.', en: 'I track flaky tests by labeling them as "Flaky" in the BS Dashboard. Resolution steps: 1) Identify the timing issue from video recording. 2) Replace all sleep() calls with WebDriverWait. 3) Strengthen the locator — use data-testid instead of dynamic ID. 4) Use BS\'s "Mark as Flaky" feature to run these tests temporarily without blocking CI. 5) If it\'s a real bug, open a JIRA ticket. Same logic as TestNG retry analyzer in Java.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'Büyük bir regression suite\'ini BrowserStack\'te nasıl optimize edersiniz (hız ve maliyet)?', en: 'How do you optimize a large regression suite on BrowserStack (speed and cost)?' },
          a: { tr: 'Üç strateji kullanıyorum: 1) Paralel test sayısını artır — plana göre parallelsPerPlatform yükselt. 2) Test önem sırasına göre ayır: kritik yollar her PR\'da, tam regression haftalık çalışır. 3) BrowserStack\'in "Smart Testing" özelliği, değişiklikten etkilenebilecek testleri tahmin eder ve önce onları çalıştırır. Maliyet için: geceleri çalışan uzun testler yerine peak saatlerinde kısa smoke testler çalıştırın. Java\'da da aynı prioritization yapılır — @Priority annotation ile.', en: 'I use three strategies: 1) Increase parallel test count — raise parallelsPerPlatform according to plan. 2) Separate tests by importance: critical paths on every PR, full regression weekly. 3) BrowserStack\'s "Smart Testing" feature predicts which tests might be affected by changes and runs those first. For cost: run short smoke tests during peak hours instead of long tests that run at night. The same prioritization is done in Java — with @Priority annotation.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'i Jira ile entegre ettiğinizde iş akışı nasıl değişir?', en: 'How does the workflow change when you integrate BrowserStack with Jira?' },
          a: { tr: 'BS-Jira entegrasyonu sayesinde başarısız testler otomatik olarak Jira ticket\'ı açar: BS session URL\'i, video linki ve hata mesajı ticket\'a eklenir. Developer bu bağlantıya tıklayarak doğrudan BS Dashboard\'da testi izleyebilir. Ayrıca mevcut Jira bug\'larına BS test session\'larını linkleyerek "bu bug bu testle yakalandı" ilişkisini kurabilirsiniz. Test yönetimi için BS ve Jira arasında bidirectional traceability sağlanmış olur.', en: 'With BS-Jira integration, failing tests automatically open Jira tickets: the BS session URL, video link, and error message are added to the ticket. Developers can click this link to watch the test directly in the BS Dashboard. You can also link existing Jira bugs to BS test sessions to establish "this bug was caught by this test" relationships. This provides bidirectional traceability between BS and Jira for test management.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'Bir test yerel ortamda geçiyor ama BrowserStack\'te başarısız oluyor. Debug sürecinizi anlatın.', en: 'A test passes locally but fails on BrowserStack. Walk me through your debug process.' },
          a: { tr: 'Debug süreci: 1) BS Dashboard\'da video\'yu izle — hangi adımda hata var? 2) Console Logs ve Network Logs\'a bak — JS/API hatası var mı? 3) Capability farklılığını kontrol et — hangi OS/browser\'da başarısız? Sadece Safari\'de mi? 4) Timing sorunu mu? Yerel ortamda sayfa daha hızlı yükleniyor olabilir — explicit wait ekle. 5) BrowserStack Local kullanılıyorsa tünel bağlantısını doğrula. 6) Aynı tarayıcı sürümünü yerel ortamda da test et. Genellikle timing veya sertifika sorunu çıkıyor.', en: 'Debug process: 1) Watch the video in BS Dashboard — at which step does the error occur? 2) Check Console Logs and Network Logs — are there JS/API errors? 3) Check capability differences — which OS/browser is failing? Only on Safari? 4) Is it a timing issue? The page might load faster in local environment — add explicit wait. 5) If using BrowserStack Local, verify tunnel connection. 6) Test the same browser version locally. Usually timing or certificate issues come up.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'te mobil responsive testini nasıl otomatikleştirirsiniz?', en: 'How do you automate mobile responsive testing on BrowserStack?' },
          a: { tr: 'İki yöntem kullanıyorum: 1) Gerçek mobil cihaz testi — App Automate veya Automate\'te gerçek iOS/Android cihazlarında web testleri. 2) Farklı ekran boyutları — Selenium\'da driver.set_window_size() veya Playwright\'da viewport ayarı. Önemli kırılma noktaları (320px, 768px, 1024px, 1440px) için ayrı test senaryoları yazıyorum. Percy ile görsel farklılıkları her viewport\'ta otomatik yakalıyorum.', en: 'I use two methods: 1) Real mobile device testing — web tests on real iOS/Android devices in App Automate or Automate. 2) Different screen sizes — driver.set_window_size() in Selenium or viewport setting in Playwright. I write separate test scenarios for important breakpoints (320px, 768px, 1024px, 1440px). I automatically catch visual differences at every viewport with Percy.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'te network throttling (ağ kısıtlaması) nasıl kullanılır ve ne işe yarar?', en: 'How is network throttling used on BrowserStack and what is it useful for?' },
          a: { tr: 'bstack:options\'a "networkLogs": True ve "networkProfile": "2G/3G/4G" ekleyerek ağ koşullarını simüle edebilirsiniz. Bu, mobil kullanıcıların deneyimini test etmek için kritiktir — 3G bağlantıda sayfa 10 saniyede yükleniyor mu, timeout\'lar yeterince uzun mu? Kullanım senaryosu: yavaş ağda skeleton loader doğru çalışıyor mu? Image lazy loading düzgün mü? Bu testler yavaş internet bölgelerindeki kullanıcı sorunlarını production\'a çıkmadan yakalar.', en: 'You can simulate network conditions by adding "networkLogs": True and "networkProfile": "2G/3G/4G" to bstack:options. This is critical for testing the experience of mobile users — does the page load in 10 seconds on 3G, are timeouts long enough? Use case: does the skeleton loader work correctly on a slow network? Is image lazy loading working properly? These tests catch user problems in slow internet regions before they reach production.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'te test raporlamasını nasıl yapılandırırsınız? Allure entegrasyonu nasıl çalışır?', en: 'How do you configure test reporting on BrowserStack? How does Allure integration work?' },
          a: { tr: 'BS Dashboard kendi raporlamasını sunar ama Allure ile daha zengin raporlar üretmek mümkün. pytest-allure paketi ile her testin step\'leri, ekran görüntüleri ve BS session URL\'i Allure\'a aktarılır. allure-pytest eklentisi ile BS session link\'ini allure.link() decorator\'üyle teste bağlıyorum. CI\'da allure-report generate komutuyla HTML rapor üretilir ve artifact olarak saklanır. Bu raporu test manager veya product owner\'a gösteriyorum.', en: 'BS Dashboard offers its own reporting, but richer reports can be generated with Allure. With the pytest-allure package, each test\'s steps, screenshots, and BS session URLs are exported to Allure. I link the BS session link to the test with the allure.link() decorator using the allure-pytest plugin. In CI, an HTML report is generated with the allure-report generate command and stored as an artifact. I show this report to the test manager or product owner.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'Bir takımda birden fazla developer BrowserStack kullanıyorsa session\'ları nasıl ayırt edersiniz?', en: 'If multiple developers on a team use BrowserStack, how do you distinguish sessions?' },
          a: { tr: 'buildName\'e branch veya developer adı ekliyorum: "feature/checkout-John-20240315". sessionName\'e de test adı yanında developer\'ın initials\'ini koyuyorum. Ayrıca BS Dashboard\'da proje bazlı filtreleme yapılabilir — her branch veya ticket için ayrı projectName kullanmak iyi pratiktir. CI/CD\'de bu değerleri otomatik olarak git branch adından üretebilirsiniz: BUILD_NAME = os.environ.get("GITHUB_REF_NAME", "local").', en: 'I add the branch or developer name to buildName: "feature/checkout-John-20240315". I also put the developer\'s initials next to the test name in sessionName. Additionally, project-based filtering can be done in the BS Dashboard — using separate projectName for each branch or ticket is good practice. In CI/CD, you can automatically generate these values from the git branch name: BUILD_NAME = os.environ.get("GITHUB_REF_NAME", "local").' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'te cross-browser testinde karşılaştığınız en zorlu sorunu anlatın.', en: 'Describe the most challenging cross-browser testing issue you encountered on BrowserStack.' },
          a: { tr: 'En zorlu sorun Safari\'ye özgü CSS Grid davranışıydı. Chrome ve Firefox\'ta checkout sayfası mükemmel görünürken Safari\'de bir kolon üst üste geliyordu. BS\'te gerçek iPhone 14 ve iPad Pro ile testi çalıştırıp video kaydını geliştirme ekibine gönderdim. Percy ile de görsel diff açıkça ortadaydı. Sorun, Safari\'nin bir CSS Grid özelliğini farklı yorumlamasından kaynaklanıyordu — prefixed CSS ekleyerek çözdük. BS olmadan bu sorunu production\'da yakalamak kaçınılmazdı.', en: 'The most challenging issue was Safari-specific CSS Grid behavior. While the checkout page looked perfect in Chrome and Firefox, a column was overlapping in Safari. I ran the test with a real iPhone 14 and iPad Pro on BS and sent the video recording to the development team. The visual diff with Percy was also clearly visible. The issue stemmed from Safari interpreting a CSS Grid feature differently — we fixed it by adding prefixed CSS. Without BS, catching this problem in production would have been unavoidable.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack Smart Testing özelliği nasıl çalışır ve zaman/maliyet tasarrufu sağlar mı?', en: 'How does BrowserStack Smart Testing work and does it save time/cost?' },
          a: { tr: 'Smart Testing (Intelligent Test Orchestration), kod değişikliklerinizi analiz ederek hangi testlerin etkilenebileceğini tahmin eder. Bunları önce çalıştırır, etkilenmeyenleri sona bırakır veya atlar. Pratikte bir checkout değişikliği yaptığınızda sadece checkout testleri önce çalışır. Benim deneyimimde %40-60 arası zaman tasarrufu sağladı. Java\'daki Maven Surefire\'ın partial test execution özelliğine benzer ama daha akıllı.', en: 'Smart Testing (Intelligent Test Orchestration) analyzes your code changes to predict which tests might be affected. It runs those first, leaving or skipping the unaffected ones for later. In practice, when you make a checkout change, only checkout tests run first. In my experience, it provided 40-60% time savings. Similar to Maven Surefire\'s partial test execution in Java, but smarter.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'te bir gerçek cihaz testi başlattığınızda ama cihaz müsait değilse ne yaparsınız?', en: 'When you start a real device test on BrowserStack but the device is unavailable, what do you do?' },
          a: { tr: 'BS cihaz müsaitlik durumunu real-time gösterir. Cihaz meşgulse: 1) Aynı OS versiyonundaki farklı cihaz modeli seçilebilir (örn. iPhone 14 Pro yerine iPhone 14). 2) browserstack.yml\'de birden fazla cihaz tanımlarsanız BS otomatik uygun olanı seçer. 3) Sabah saatleri (ABD mesai öncesi) gerçek cihazlar genellikle daha erişilebilir oluyor. 4) Enterprise plan, dedicated device kütlesi sunar.', en: 'BS shows device availability in real-time. If a device is busy: 1) A different device model with the same OS version can be selected (e.g., iPhone 14 instead of iPhone 14 Pro). 2) If you define multiple devices in browserstack.yml, BS automatically selects an available one. 3) Real devices are generally more accessible in the morning hours (before US business hours). 4) Enterprise plans offer a dedicated device pool.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'te API testleri yapılabilir mi? Hangi senaryolarda faydalıdır?', en: 'Can API tests be done on BrowserStack? In which scenarios are they useful?' },
          a: { tr: 'BrowserStack, core olarak UI/browser testleri için tasarlanmıştır — API testleri için değil. Ancak BrowserStack içinde çalışan Selenium testiniz API çağrıları yapabilir ve network loglarından API response\'larını izleyebilirsiniz. Gerçek kullanım senaryosu: UI testi sırasında Network Logs\'ta API\'ın doğru payload döndürüp döndürmediğini kontrol etmek. Saf API testleri için Postman veya REST Assured daha uygun araçlardır.', en: 'BrowserStack is designed for UI/browser tests at its core — not for API tests. However, Selenium tests running inside BrowserStack can make API calls, and you can monitor API responses from network logs. Real use case: checking whether the API returns the correct payload in Network Logs during a UI test. For pure API tests, Postman or REST Assured are more appropriate tools.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack kullanırken takım içi test verisi yönetimini nasıl yapıyorsunuz?', en: 'How do you manage test data within the team when using BrowserStack?' },
          a: { tr: 'Test verisi yönetimi için: 1) Her paralel test için izole test kullanıcı hesapları (user_1@test.com, user_2@test.com) oluşturulur — paralel testler çakışmasın diye. 2) Test öncesi API çağrısıyla temiz veri kurulur (setup fixture). 3) BS Local tünel üzerinden test ortamı veritabanı resetlenir. 4) pytest fixture\'larında scope=\'session\' yerine scope=\'function\' kullanılır — testler birbirini kirletmez. Java\'daki @BeforeMethod / @AfterMethod mantığının aynısı.', en: 'For test data management: 1) Isolated test user accounts are created for each parallel test (user_1@test.com, user_2@test.com) — so parallel tests don\'t conflict. 2) Clean data is set up via API call before tests (setup fixture). 3) The test environment database is reset via BS Local tunnel. 4) scope=\'function\' is used instead of scope=\'session\' in pytest fixtures — tests don\'t pollute each other. Same logic as @BeforeMethod / @AfterMethod in Java.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack Automate API\'ını test otomasyon framework\'ünüze nasıl entegre edersiniz?', en: 'How do you integrate the BrowserStack Automate REST API into your test automation framework?' },
          a: { tr: 'BrowserStack\'in REST API\'ı ile session yönetimi, build analizi ve test raporlaması yapılabilir. Örneğin test bittikten sonra requests kütüphanesiyle GET /automate/builds.json ile tüm build\'leri çekip kendi raporlama sistemimize entegre ediyorum. POST /automate/sessions/{session_id}.json ile session status\'ü programatik güncelleme yapılabilir. Bu Java\'da OkHttp veya RestAssured ile BS API\'ı çağırmaya eşdeğerdir.', en: 'BrowserStack\'s REST API can be used for session management, build analysis, and test reporting. For example, after tests finish, I fetch all builds with GET /automate/builds.json using the requests library and integrate them into our own reporting system. Session status can be updated programmatically with POST /automate/sessions/{session_id}.json. This is equivalent to calling the BS API with OkHttp or RestAssured in Java.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'Playwright testlerinde BrowserStack\'in webkit (Safari) desteği gerçek Safari\'den ne kadar farklıdır?', en: 'How different is BrowserStack\'s webkit (Safari) support in Playwright tests from real Safari?' },
          a: { tr: 'Playwright\'ın playwright-webkit motoru gerçek Safari değil, aynı WebKit engine üzerine inşa edilmiş bir test tarayıcısıdır. Temel farklılıklar: 1) iOS-specific davranışları (touch events, rubber band scroll) farklı olabilir. 2) Font rendering farkları. 3) Bazı Safari extension/setting davranışları eksik. Production kalitesinde iOS Safari testi için BrowserStack\'teki gerçek iPhone/iPad cihazları hâlâ gereklidir. Playwright webkit, hızlı geliştirme aşamasında yeterli; kritik iOS testleri için gerçek cihaz şart.', en: 'Playwright\'s playwright-webkit engine is not real Safari; it\'s a test browser built on the same WebKit engine. Key differences: 1) iOS-specific behaviors (touch events, rubber band scroll) may differ. 2) Font rendering differences. 3) Some Safari extension/setting behaviors are missing. For production-quality iOS Safari testing, real iPhone/iPad devices on BrowserStack are still necessary. Playwright webkit is sufficient during rapid development; for critical iOS tests, real devices are mandatory.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'te test session\'ı aniden kesilirse (session dropped) ne yaparsınız?', en: 'If a test session suddenly drops on BrowserStack (session dropped), what do you do?' },
          a: { tr: 'Session drop nedenleri: network instability, 90s inactivity timeout veya memory sorunları. Çözüm adımları: 1) BS Dashboard → Sessions → Error Details\'e bak. 2) Inactivity timeout ise idleTimeout capability\'yi artır (max 300s). 3) Network sorunu ise retry mekanizması ekle: Tenacity kütüphanesi ile @retry decorator kullan. 4) BS Status Page\'i kontrol et — platform tarafında sorun var mı? 5) memory-intensive testleri küçük parçalara böl. Java\'da da aynı yaklaşım: @Retry annotation ile WebDriver yeniden başlatma.', en: 'Session drop causes: network instability, 90s inactivity timeout, or memory issues. Resolution steps: 1) Check BS Dashboard → Sessions → Error Details. 2) If inactivity timeout, increase idleTimeout capability (max 300s). 3) If network issue, add retry mechanism: use @retry decorator with Tenacity library. 4) Check BS Status Page — is there a platform-side issue? 5) Break memory-intensive tests into smaller pieces. Same approach in Java: restarting WebDriver with @Retry annotation.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack\'te farklı dil/encoding\'de içerik testi nasıl yapılır?', en: 'How do you test content in different languages/encodings on BrowserStack?' },
          a: { tr: 'Uluslararasılaştırma (i18n) testi için: 1) BS\'te farklı OS locale ayarlarıyla cihaz başlatılabilir. 2) Arapça, Japonca gibi RTL/multibyte dil testleri için gerçek cihaz şarttır — emülatör font sorunları yaratabilir. 3) XPath ile Türkçe/Arapça içerik assertion\'ı yaparken encoding dikkat: //h1[contains(text(),\'Ürün\')] şeklinde direkt string kullanın. 4) Ekran görüntüleri Percy ile görsel olarak doğrulanır. Bu testler özellikle global e-ticaret projelerinde kritiktir.', en: 'For internationalization (i18n) testing: 1) Devices can be started with different OS locale settings on BS. 2) Real devices are essential for RTL/multibyte language tests like Arabic and Japanese — emulators may create font issues. 3) When making assertions with Turkish/Arabic content via XPath, watch encoding: use direct string like //h1[contains(text(),\'Product\')]. 4) Screenshots are visually verified with Percy. These tests are critical especially in global e-commerce projects.' }
        },
        {
          level: 'intermediate',
          q: { tr: 'BrowserStack planınız dolduğunda (dakika limiti aşıldığında) testler nasıl etkilenir?', en: 'When your BrowserStack plan runs out (minute limit exceeded), how are tests affected?' },
          a: { tr: 'Dakika limiti aşıldığında BS yeni session açılmasını engeller — mevcut çalışan testler tamamlanır ama yeni test başlatılamaz. CI pipeline bu durumda "quota exceeded" hatasıyla fail eder. Önlem olarak: 1) BS Dashboard\'da kullanım uyarısını %80\'de alacak şekilde alert kur. 2) Dakika tüketimini minimize etmek için sadece kritik tarayıcılarda test çalıştır. 3) Aylık limiti takip eden bir monitoring scripti yaz. Java ile de aynı durum: BS REST API\'dan kullanım bilgisi çekilir.', en: 'When the minute limit is exceeded, BS prevents new sessions from being opened — currently running tests complete but new tests can\'t start. CI pipeline fails with "quota exceeded" error. Prevention: 1) Set up an alert in BS Dashboard to notify at 80% usage. 2) Run tests only on critical browsers to minimize minute consumption. 3) Write a monitoring script that tracks monthly limits. Same situation with Java: usage information is pulled from BS REST API.' }
        },

        // ── ADVANCED (15) ──
        {
          level: 'advanced',
          q: { tr: 'BrowserStack\'in mimarisini Selenium Grid ile karşılaştırın. Hangisini ne zaman tercih edersiniz?', en: 'Compare BrowserStack\'s architecture with Selenium Grid. When do you prefer which?' },
          a: { tr: 'Selenium Grid\'de hub/node\'ları kendiniz yönetirsiniz — ölçeklendirme, bakım, driver güncellemeleri DevOps sorumluluğundadır. BrowserStack\'te bu altyapı tamamen abstracted\'tır. Grid avantajları: veri gizliliği (on-premise), sınırsız çalıştırma maliyeti yok, özel enterprise gereksinimleri. BS avantajları: sıfır altyapı yükü, 3000+ gerçek cihaz, otomatik driver yönetimi, Percy/Accessibility modülleri. Karar: verilerin cloud\'a çıkmaması zorunluysa Grid; hız ve ölçek öncelikliyse BS. Hybrid yaklaşım da mümkün: iç ağ testleri Grid\'de, cross-browser testleri BS\'te.', en: 'In Selenium Grid, you manage hub/nodes yourself — scaling, maintenance, driver updates are DevOps responsibilities. In BrowserStack, this infrastructure is completely abstracted. Grid advantages: data privacy (on-premise), no unlimited run cost, special enterprise requirements. BS advantages: zero infrastructure burden, 3000+ real devices, automatic driver management, Percy/Accessibility modules. Decision: if data must not leave the cloud, Grid; if speed and scale are priorities, BS. A hybrid approach is also possible: internal network tests on Grid, cross-browser tests on BS.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack\'te 500+ test içeren bir regression suite\'ini nasıl mimarize edersiniz?', en: 'How would you architect a regression suite with 500+ tests on BrowserStack?' },
          a: { tr: 'Mimari kararlar: 1) Test gruplama — smoke (50 test, her PR), sanity (150 test, günde 2x), full regression (500+ test, haftalık/gece). 2) Paralel strateji — pytest-xdist + BS parallelsPerPlatform kombinasyonu. 3) Page Object Model ile bakımı kolaylaştır. 4) Shared fixture\'lar — session scope\'lu driver kurulumu. 5) Test veri izolasyonu — her test kendi kullanıcısıyla. 6) BS Smart Testing ile etkilenen testler önce çalışır. 7) Allure + BS entegrasyonu ile zengin raporlama. Java\'daki TestNG suite XML\'inin data-driven karşılığı.', en: 'Architecture decisions: 1) Test grouping — smoke (50 tests, every PR), sanity (150 tests, 2x daily), full regression (500+ tests, weekly/nightly). 2) Parallel strategy — pytest-xdist + BS parallelsPerPlatform combination. 3) Page Object Model for maintainability. 4) Shared fixtures — session-scoped driver setup. 5) Test data isolation — each test with its own user. 6) Affected tests run first with BS Smart Testing. 7) Rich reporting with Allure + BS integration. Data-driven counterpart of TestNG suite XML in Java.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack kullanımında GDPR ve veri gizliliği açısından dikkat edilmesi gerekenler nelerdir?', en: 'What should be considered in terms of GDPR and data privacy when using BrowserStack?' },
          a: { tr: 'BrowserStack, kullanıcı verilerini cloud sunucularından geçirir — bu GDPR kapsamında dikkat gerektirir. Önlemler: 1) Gerçek kullanıcı verisi (PII) testlerde kullanma — anonim/sentetik veri üret. 2) Test credentials\'ları gerçek production hesabı olmamalı. 3) BS\'in EU data residency seçeneğini kullan (verinin AB\'de kalması için). 4) Video/log saklama süresini BS Dashboard\'dan minimize et. 5) BS DPA (Data Processing Agreement) imzalayın. GDPR ihlali durumunda hem şirket hem de QA mühendisi sorumlu tutulabilir.', en: 'BrowserStack passes user data through cloud servers — this requires attention under GDPR. Measures: 1) Don\'t use real user data (PII) in tests — generate anonymous/synthetic data. 2) Test credentials shouldn\'t be real production accounts. 3) Use BS\'s EU data residency option (to keep data in the EU). 4) Minimize video/log retention period from BS Dashboard. 5) Sign the BS DPA (Data Processing Agreement). In case of GDPR violation, both the company and the QA engineer can be held responsible.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack\'te yüksek maliyetli gerçek cihaz testlerini nasıl optimize edersiniz?', en: 'How do you optimize expensive real device tests on BrowserStack?' },
          a: { tr: 'Maliyet optimizasyonu için katmanlı strateji: 1) Simülatör/emülatör ile ilk round — tarayıcı tabanlı BS testleri gerçek cihazdan daha ucuz. 2) Gerçek cihazı sadece kritik senaryolar için rezerve et (iOS Safari, ödeme akışı). 3) Device matrix\'ini daralt — her OS versiyonu yerine en popüler 3-5 kombinasyon. 4) Paralel çalıştırmayla test süresini kısalt — daha az dakika = daha az maliyet. 5) BS\'in on-demand pricing yerine monthly plan tercih et (yüksek kullanımda %60 tasarruf). 6) Test bazlı ROI hesapla: geciktirilen bir production bug\'ı BS maliyetinin kaç katı?', en: 'Layered strategy for cost optimization: 1) First round with simulator/emulator — browser-based BS tests are cheaper than real devices. 2) Reserve real devices only for critical scenarios (iOS Safari, payment flow). 3) Narrow the device matrix — 3-5 most popular combinations instead of every OS version. 4) Reduce test duration with parallel execution — less minutes = less cost. 5) Prefer monthly plan over BS\'s on-demand pricing (60% savings with high usage). 6) Calculate ROI per test: how many times the BS cost is a delayed production bug?' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack Automate Enterprise özelliklerini küçük bir startup\'ın ihtiyaçlarıyla nasıl karşılaştırırsınız?', en: 'How do you compare BrowserStack Automate Enterprise features with the needs of a small startup?' },
          a: { tr: 'Enterprise özellikleri: dedicated device pool, SSO/SAML, custom retention, SLA garantisi, IP whitelist, on-premise agent. Startup için genellikle bunların hiçbiri gerekli değil — Team planı ($399/ay, 5 paralel) yeterli. Enterprise\'ın kritik olduğu durumlar: 1) Finansal/sağlık sektörü — SOC2/HIPAA compliance zorunlu. 2) 50+ kişilik QA takımı — kullanıcı yönetimi ve SSO şart. 3) Günde 1000+ test — dedicated pool ile slot garantisi. Startup\'ta ROI odaklı düşün: BS bedeli, bir QA mühendisinin manuel cross-browser test zamanının çok altında.', en: 'Enterprise features: dedicated device pool, SSO/SAML, custom retention, SLA guarantee, IP whitelist, on-premise agent. Startups generally don\'t need any of these — Team plan ($399/month, 5 parallel) is sufficient. When Enterprise becomes critical: 1) Financial/health sector — SOC2/HIPAA compliance mandatory. 2) 50+ person QA team — user management and SSO essential. 3) 1000+ tests daily — slot guarantee with dedicated pool. Think ROI-focused for startup: BS cost is well below the manual cross-browser test time of one QA engineer.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack ile zero-downtime deployment doğrulama stratejisi nasıl kurulur?', en: 'How do you set up a zero-downtime deployment verification strategy with BrowserStack?' },
          a: { tr: 'Strateji: 1) Blue-green deployment\'da yeni (green) ortam canlıya alınmadan önce BS smoke suite çalıştır. 2) Selenium Grid yerine BS Local ile green ortamın internal URL\'ine erişilir. 3) Testler başarılıysa load balancer green\'e yönlendirilir, başarısızsa rollback tetiklenir. 4) Deployment sonrası critical path testleri production\'da da çalışır (canary monitoring). 5) BS\'in API\'ı üzerinden CI/CD pipeline\'a "deploy lock" mekanizması kurulur — testler çalışırken yeni deployment engellenir. Java\'da da aynı pattern: Maven Failsafe plugin + post-deploy verify.',  en: 'Strategy: 1) In blue-green deployment, run BS smoke suite before the new (green) environment goes live. 2) Access the green environment\'s internal URL with BS Local instead of Selenium Grid. 3) If tests pass, the load balancer is directed to green; if they fail, rollback is triggered. 4) Critical path tests also run in production after deployment (canary monitoring). 5) A "deploy lock" mechanism is set up in the CI/CD pipeline via BS\'s API — new deployments are blocked while tests are running. Same pattern in Java: Maven Failsafe plugin + post-deploy verify.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack\'te görsel regresyon (Percy) eşiğini nasıl kalibre edersiniz — false positive\'leri nasıl azaltırsınız?', en: 'How do you calibrate the visual regression (Percy) threshold on BrowserStack — how do you reduce false positives?' },
          a: { tr: 'Percy false positive\'ler genellikle dinamik içerik (tarih, kullanıcı adı, reklam), anti-aliasing farkları veya font rendering değişimlerinden kaynaklanır. Azaltma teknikleri: 1) percy_snapshot öncesinde dinamik içeriği statik veriye dönüştür veya gizle (driver.execute_script). 2) Percy Dashboard\'da perceptual diff threshold\'u ayarla (0-2% tolerans genellikle iyi çalışır). 3) Ignore regions tanımla — reklam alanları, animated banner\'lar için. 4) Storybook entegrasyonu ile component bazlı snapshot — sayfa bazlı yerine daha stabil. 5) Snapshot baseline\'ı her sprint başında güncelle — stale baseline false positive artırır.', en: 'Percy false positives usually come from dynamic content (dates, usernames, ads), anti-aliasing differences, or font rendering changes. Reduction techniques: 1) Before percy_snapshot, convert or hide dynamic content to static data (driver.execute_script). 2) Adjust perceptual diff threshold in Percy Dashboard (0-2% tolerance usually works well). 3) Define ignore regions — for ad areas, animated banners. 4) Component-based snapshot with Storybook integration — more stable than page-based. 5) Update snapshot baseline at the start of every sprint — stale baseline increases false positives.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack olmadan kurabileceğiniz bir self-hosted çözüm BrowserStack\'e kıyasla ne zaman daha mantıklıdır?', en: 'When is a self-hosted solution you could build without BrowserStack more sensible compared to BrowserStack?' },
          a: { tr: 'Self-hosted çözüm (Selenium Grid + Docker + Zalenium/Moon) şu durumlarda mantıklıdır: 1) Veri gizliliği zorunluluğu — testlerin dışarı çıkmaması gereken finansal/sağlık projeleri. 2) Çok yüksek test hacmi — aylık 10.000+ dakika BS maliyeti server maliyetini aşıyorsa. 3) Özel enterprise gereksinimleri — BS\'in karşılamadığı compliance gereksinimleri. 4) DevOps kapasitesi mevcut — altyapıyı yönetecek takım var. BS\'in avantajı kaybolduğu durum: gerçek iOS/macOS testi — BS\'siz bunu kendi altyapında kurmak Apple\'ın kısıtlamaları nedeniyle çok zor. Hibrit: web testleri self-hosted, iOS testleri BS.', en: 'Self-hosted solution (Selenium Grid + Docker + Zalenium/Moon) makes sense when: 1) Data privacy mandate — financial/health projects where tests must not leave the network. 2) Very high test volume — when monthly 10,000+ minute BS cost exceeds server cost. 3) Special enterprise requirements — compliance requirements BS doesn\'t meet. 4) DevOps capacity available — team exists to manage infrastructure. When BS\'s advantage disappears: real iOS/macOS testing — building this without BS on your own infrastructure is very difficult due to Apple\'s restrictions. Hybrid: web tests self-hosted, iOS tests on BS.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack\'in test sonuçlarını makine öğrenmesiyle analiz etmek için nasıl bir sistem kurarsınız?', en: 'How would you build a system to analyze BrowserStack test results with machine learning?' },
          a: { tr: 'BS REST API\'dan raw test verisi (duration, status, error messages, capabilities) çekilir. Zaman serisi analizi ile hangi testlerin flaky olduğunu predict edebilirsiniz. Pratik yaklaşım: 1) BS API\'dan son 30 günlük build\'leri çek. 2) Her testin pass/fail oranını hesapla — %80 altı = flaky candidate. 3) Hata mesajlarını cluster\'la (timeout, element not found, session drop) — her cluster için farklı önlem. 4) Test süresi anomalisi tespit et — normalde 30s olan test 5 dakikaya çıkarsa uyarı. 5) scikit-learn veya basit istatistiksel modeller yeterli — derin öğrenme gerekmez. Java\'da da aynısı yapılabilir: BS REST API + Spring Batch.', en: 'Raw test data (duration, status, error messages, capabilities) is pulled from BS REST API. Time series analysis can predict which tests are flaky. Practical approach: 1) Pull last 30 days of builds from BS API. 2) Calculate each test\'s pass/fail rate — below 80% = flaky candidate. 3) Cluster error messages (timeout, element not found, session drop) — different measures for each cluster. 4) Detect test duration anomalies — alert when a test normally taking 30s stretches to 5 minutes. 5) scikit-learn or simple statistical models are sufficient — deep learning not needed. Same can be done in Java: BS REST API + Spring Batch.' }
        },
        {
          level: 'advanced',
          q: { tr: 'Multi-region uygulamasında BrowserStack testlerini nasıl koordine edersiniz?', en: 'How do you coordinate BrowserStack tests for a multi-region application?' },
          a: { tr: 'Multi-region koordinasyon: 1) Her region için ayrı BS Local tüneli — TR, EU, US region\'ları için ayrı binary instance. 2) pytest parametrize ile region listesi üzerinde testleri çalıştır: @pytest.mark.parametrize("base_url", ["tr.app.com", "eu.app.com", "us.app.com"]). 3) buildName\'e region bilgisi ekle: "US-Region-Sprint42". 4) Region\'a özel capability\'ler: ABD testleri için "os": "Windows" + "geoLocation": "US". 5) BS Dashboard\'da region bazlı filtreleme yapabilmek için sessionName convention belirle. Java\'daki TestNG DataProvider + multi-suite paralel yaklaşımının karşılığı.', en: 'Multi-region coordination: 1) Separate BS Local tunnel for each region — separate binary instances for TR, EU, US regions. 2) Run tests over region list with pytest parametrize: @pytest.mark.parametrize("base_url", ["tr.app.com", "eu.app.com", "us.app.com"]). 3) Add region info to buildName: "US-Region-Sprint42". 4) Region-specific capabilities: "os": "Windows" + "geoLocation": "US" for US tests. 5) Define sessionName convention to filter by region in BS Dashboard. Counterpart of TestNG DataProvider + multi-suite parallel approach in Java.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack\'te shadow DOM testlerinde karşılaşılan özel zorluklar nelerdir?', en: 'What are the specific challenges encountered in shadow DOM testing on BrowserStack?' },
          a: { tr: 'Shadow DOM testleri BS\'te ek zorluk içerir çünkü bazı tarayıcılar shadow root erişimini farklı ele alır. Chrome\'da driver.execute_script("return arguments[0].shadowRoot", host_element) ile shadow root\'a erişebilirsiniz. Safari\'de aynı yaklaşım çalışmayabilir — CSS seçiciler de shadow boundary\'yi geçemez. Playwright, pierce locator ile shadow DOM\'u daha doğal ele alır. BS\'te Safari shadow DOM testleri için: 1) Gerçek iPhone/Mac cihaz kullan. 2) JavaScript executor ile shadow root\'u doğrudan manipüle et. 3) Playwright webkit ile aynı testi BS\'te çalıştır — karşılaştır. BS video\'sundan hangi adımda shadow element bulunamadığını tespit et.', en: 'Shadow DOM tests contain additional difficulty on BS because some browsers handle shadow root access differently. In Chrome, you can access shadow root with driver.execute_script("return arguments[0].shadowRoot", host_element). The same approach may not work in Safari — CSS selectors also can\'t cross shadow boundaries. Playwright handles shadow DOM more naturally with pierce locator. For Safari shadow DOM tests on BS: 1) Use real iPhone/Mac device. 2) Directly manipulate shadow root with JavaScript executor. 3) Run the same test with Playwright webkit on BS — compare. Identify at which step the shadow element couldn\'t be found from BS video.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack session\'larını kendi takım dashboard\'unuza nasıl entegre edersiniz?', en: 'How do you integrate BrowserStack sessions into your own team dashboard?' },
          a: { tr: 'BS REST API entegrasyonu: GET /automate/builds.json endpoint\'inden build listesi, GET /automate/builds/{id}/sessions.json ile session detayları çekilir. Python Flask veya FastAPI ile internal dashboard API\'ı yazılır. Frontend\'de build bazlı pass/fail grafikleri, en çok başarısız olan test listesi, ortalama test süresi trendi gösterilir. Webhook kurularak her test tamamlandığında BS → dashboard güncellenir. Bu dashboard\'u CI/CD\'nin yanı sıra weekly QA review toplantılarında da kullanıyoruz. Java\'da da REST API çağrısı aynı: HttpClient veya Feign client ile.', en: 'BS REST API integration: build list from GET /automate/builds.json endpoint, session details with GET /automate/builds/{id}/sessions.json. Internal dashboard API is written with Python Flask or FastAPI. Frontend shows build-based pass/fail charts, most frequently failing test list, average test duration trend. A webhook is set up to update dashboard → BS whenever a test completes. We use this dashboard in weekly QA review meetings in addition to CI/CD. Same REST API call in Java: with HttpClient or Feign client.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack\'te test güvenilirliğini (reliability) artırmak için framework seviyesinde hangi önlemleri alırsınız?', en: 'What framework-level measures do you take to increase test reliability on BrowserStack?' },
          a: { tr: 'Framework seviyesinde güvenilirlik önlemleri: 1) Retry mekanizması — tenacity kütüphanesiyle başarısız testler 1-2 kez yeniden çalışır (ama flaky test=bug kaydı). 2) Screenshot on failure — conftest.py\'de @pytest.hookimpl ile her hata sonrası otomatik screenshot. 3) Explicit wait standardizasyonu — tüm element beklemeleri için merkezi wait factory. 4) Session cleanup — driver.quit() her durumda çalışır, yield fixture\'da. 5) Capability validation — başlangıçta geçersiz capability erken yakalanır. 6) Test izolasyonu — her test DB reset + fresh login. 7) BS markup API ile her adım etiketlenir — video\'da adım adım görünür.', en: 'Framework-level reliability measures: 1) Retry mechanism — failed tests retry 1-2 times with tenacity library (but flaky test = bug record). 2) Screenshot on failure — automatic screenshot after each error with @pytest.hookimpl in conftest.py. 3) Explicit wait standardization — central wait factory for all element waiting. 4) Session cleanup — driver.quit() runs in all circumstances, in yield fixture. 5) Capability validation — invalid capabilities caught early at startup. 6) Test isolation — DB reset + fresh login for each test. 7) Each step labeled with BS markup API — visible step by step in video.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack\'i kullanan büyük bir takımda test ownership ve governance nasıl yönetilir?', en: 'How do you manage test ownership and governance in a large team using BrowserStack?' },
          a: { tr: 'Governance modeli: 1) BS sub-accounts — her takım kendi BS sub-account\'ında çalışır, merkezi billing ile. 2) Project naming convention — [Takım]-[Uygulama]-[Ortam] formatı: "Backend-Shop-Staging". 3) Tag sistemi — @critical, @smoke, @regression etiketleriyle test kategorilendirme. 4) Test ownership — her test dosyasına team owner metadata\'sı (pytest marker ile). 5) Failed test triage — haftalık rotation: her hafta farklı bir engineer başarısız testleri analiz eder. 6) BS quota per team — her takıma aylık dakika kotası, aşımda alert. Java\'daki TestNG group system ile paralel yürütme yönetiminin enterprise versiyonu.', en: 'Governance model: 1) BS sub-accounts — each team works in their own BS sub-account with centralized billing. 2) Project naming convention — [Team]-[App]-[Environment] format: "Backend-Shop-Staging". 3) Tag system — test categorization with @critical, @smoke, @regression labels. 4) Test ownership — team owner metadata for each test file (with pytest marker). 5) Failed test triage — weekly rotation: a different engineer analyzes failing tests each week. 6) BS quota per team — monthly minute quota per team, alert on excess. Enterprise version of parallel execution management with TestNG group system in Java.' }
        },
        {
          level: 'advanced',
          q: { tr: 'BrowserStack Automate\'i sıfırdan enterprise ölçeğinde kurmak için plan hazırlayın.', en: 'Prepare a plan to set up BrowserStack Automate from scratch at enterprise scale.' },
          a: { tr: 'Enterprise kurulum planı: Hafta 1 — Hesap kurulumu: BS Enterprise kontrat, sub-accounts, SSO entegrasyonu, IP whitelist. Hafta 2 — Framework kurulumu: pytest + browserstack-sdk, Page Object Model, merkezi fixture\'lar, capability matrix (20+ browser/OS kombinasyonu). Hafta 3 — CI/CD entegrasyonu: GitHub Actions workflow, Jenkins pipeline, secret yönetimi. Hafta 4 — Test yazımı: smoke (50), sanity (200), regression (500+). Hafta 5-6 — Optimizasyon: paralel strateji, Smart Testing, Percy görsel testler, Allure raporlama. Hafta 7-8 — Governance: quota yönetimi, team onboarding, test ownership, haftalık review süreci. Bu süreç Java\'daki Maven + TestNG + Grid enterprise kurulumunun cloud versiyonudur.', en: 'Enterprise setup plan: Week 1 — Account setup: BS Enterprise contract, sub-accounts, SSO integration, IP whitelist. Week 2 — Framework setup: pytest + browserstack-sdk, Page Object Model, central fixtures, capability matrix (20+ browser/OS combinations). Week 3 — CI/CD integration: GitHub Actions workflow, Jenkins pipeline, secret management. Week 4 — Test writing: smoke (50), sanity (200), regression (500+). Weeks 5-6 — Optimization: parallel strategy, Smart Testing, Percy visual tests, Allure reporting. Weeks 7-8 — Governance: quota management, team onboarding, test ownership, weekly review process. This process is the cloud version of Maven + TestNG + Grid enterprise setup in Java.' }
        }
      ]
    }
  ]
}

// ─── FINAL EXPORT ─────────────────────────────────────────────────────────────
export const browserstackData = {
  tr: {
    hero: {
      title: '☁️ BrowserStack',
      subtitle: 'Gerçek tarayıcılar, gerçek cihazlar — bulutta cross-browser test platformu',
      intro: 'BrowserStack, 3000+ gerçek tarayıcı ve mobil cihazda Selenium, Playwright ve Appium testleri çalıştırmanızı sağlayan bulut tabanlı test platformudur. Kendi altyapınızı kurmadan iOS Safari, Android Chrome gibi kritik kombinasyonları test edin.'
    },
    tabs: [
      '☁️ Nedir?',
      '⚙️ Kurulum',
      '🔗 Selenium',
      '🎭 Playwright',
      '🛠️ Gerçek Hayat',
      '🔗 Ekosistem',
      '🚨 Yaygın Hatalar',
      '💼 Mülakat'
    ],
    sections: [section0, section1, section2, section3, section4, section5, section6, section7]
  },
  en: {
    hero: {
      title: '☁️ BrowserStack',
      subtitle: 'Real browsers, real devices — cloud-based cross-browser testing platform',
      intro: 'BrowserStack is a cloud-based testing platform that lets you run Selenium, Playwright, and Appium tests on 3000+ real browsers and mobile devices. Test critical combinations like iOS Safari and Android Chrome without setting up your own infrastructure.'
    },
    tabs: [
      '☁️ What Is It?',
      '⚙️ Setup',
      '🔗 Selenium',
      '🎭 Playwright',
      '🛠️ Real World',
      '🔗 Ecosystem',
      '🚨 Common Errors',
      '💼 Interview'
    ],
    sections: [section0, section1, section2, section3, section4, section5, section6, section7]
  }
}
