// JavaScript Learning Platform Data
// Fully bilingual structure for TopicPage renderer

const sections = [
  // ─────────────────────────────────────────────
  // SECTION 0 — Intro & Why JS
  // ─────────────────────────────────────────────
  {
    title: { tr: "JavaScript Nedir?", en: "What is JavaScript?" },
    blocks: [
      {
        type: "css-animation",
        kind: "intro",
        label: { tr: "JavaScript — Web'in Evrensel Dili", en: "JavaScript — The Universal Language of the Web" }
      },
      {
        type: "simple-box",
        emoji: "🚀",
        content: {
          tr: "JavaScript, web sayfalarını canlı, hareketli ve etkileşimli hale getiren sihirli bir motordur. Tıpkı LEGO parçalarının bir araya gelip hareket edebilen trenlere veya robotlara dönüşmesi gibi, JavaScript de HTML sayfalarını canlandırır.",
          en: "JavaScript is the magic engine that makes web pages alive, dynamic, and interactive. Just like LEGO blocks coming together to build trains and robots that actually move, JavaScript breathes life into HTML pages."
        }
      },
      {
        type: "heading",
        content: { tr: "Neden Test Otomasyonu İçin JavaScript?", en: "Why JavaScript for Test Automation?" }
      },
      {
        type: "text",
        content: {
          tr: "Playwright, Cypress gibi modern test otomasyon kütüphaneleri JavaScript ve TypeScript üzerinde yerel olarak çalışır. Web tarayıcıları doğrudan JavaScript anladığından, testlerinizi tarayıcı motoruyla aynı dilde yazmak size muazzam bir hız ve kontrol kazandırır.",
          en: "Modern test automation frameworks like Playwright and Cypress run natively on JavaScript and TypeScript. Because web browsers understand JavaScript directly, writing tests in the browser's native language gives you incredible speed and control."
        }
      },
      {
        type: "grid",
        cols: 3,
        items: [
          {
            icon: "⚡",
            label: { tr: "Tarayıcı Dostu", en: "Browser Native" },
            desc: { tr: "Tarayıcı motoruyla doğrudan konuşun; ekstra sürücü katmanlarına gerek duymaz.", en: "Speak directly to the browser engine; no extra driver layers needed." }
          },
          {
            icon: "🎭",
            label: { tr: "Playwright & Cypress", en: "First-Class Frameworks" },
            desc: { tr: "Modern test otomasyon dünyasının iki dev kütüphanesini ana dilinde kullanın.", en: "Use two of the biggest modern test automation libraries in their language." }
          },
          {
            icon: "🔄",
            label: { tr: "Asenkron Yapı", en: "Asynchronous Power" },
            desc: { tr: "Aynı anda birden fazla işi yapabilen asenkron model sayesinde ultra hızlı testler çalıştırın.", en: "Run ultra-fast tests thanks to the asynchronous model that handles multiple tasks at once." }
          }
        ]
      },
      {
        type: "table",
        headers: [
          { tr: "Özellik", en: "Feature" },
          { tr: "Java", en: "Java" },
          { tr: "JavaScript", en: "JavaScript" }
        ],
        rows: [
          [
            { tr: "Tip Sistemi", en: "Type System" },
            { tr: "Statik Tipli (Strict)", en: "Static (Strict)" },
            { tr: "Dinamik Tipli (Esnek)", en: "Dynamic (Flexible)" }
          ],
          [
            { tr: "Çalışma Modeli", en: "Execution Model" },
            { tr: "Çoklu İş Parçacığı (Threads)", en: "Multi-threaded" },
            { tr: "Tek İş Parçacığı + Event Loop", en: "Single-threaded + Event Loop" }
          ],
          [
            { tr: "Öğrenme Eğrisi", en: "Learning Curve" },
            { tr: "Orta / Yüksek", en: "Medium / High" },
            { tr: "Düşük / Orta", en: "Low / Medium" }
          ]
        ]
      },
      {
        type: "editor",
        lang: "javascript",
        height: "150px",
        defaultCode: {
          tr: `// JavaScript ile ilk kodunuzu çalıştırın!
console.log("LearnQA.dev'e Hoş Geldiniz!");

let x = 10;
let y = 20;
console.log("Toplam Sonuç:", x + y);`,
          en: `// Run your first JavaScript code!
console.log("Welcome to LearnQA.dev!");

let x = 10;
let y = 20;
console.log("Total Sum:", x + y);`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "JavaScript'in tarayıcıdaki otomasyon testlerinde Java'ya göre en büyük avantajı nedir?",
          en: "What is JavaScript's biggest advantage over Java in browser automation testing?"
        },
        options: [
          { id: "a", text: { tr: "Daha fazla bellek tüketmesi", en: "Consuming more memory" } },
          { id: "b", text: { tr: "Tarayıcı motorlarında doğrudan (natively) çalışabilmesi", en: "Running natively inside browser engines" } },
          { id: "c", text: { tr: "Sadece Windows üzerinde çalışabilmesi", en: "Running only on Windows" } },
          { id: "d", text: { tr: "Derleme süresinin çok uzun olması", en: "Having very long compile times" } }
        ],
        correct: "b",
        explanation: {
          tr: "Web tarayıcıları doğrudan JavaScript çalıştırır. Test kodunu JavaScript ile yazdığınızda tarayıcı içi nesnelere erişmek, DOM manipülasyonu yapmak ve Playwright/Cypress gibi araçları çalıştırmak çok daha hızlı ve pürüzsüz olur.",
          en: "Web browsers run JavaScript natively. Writing tests in JS makes accessing in-browser objects, DOM manipulation, and running tools like Playwright or Cypress much faster and smoother."
        },
        retryQuestion: {
          question: {
            tr: "JavaScript'te konsola çıktı yazdırmak veya log basmak için hangi fonksiyon kullanılır?",
            en: "Which function is used to print outputs or logs to the console in JavaScript?"
          },
          options: [
            { id: "a", text: "System.out.println()" },
            { id: "b", text: "print()" },
            { id: "c", text: "console.log()" },
            { id: "d", text: "Write-Output" }
          ],
          correct: "c",
          explanation: {
            tr: "JavaScript'te konsola çıktı yazdırmak için `console.log()` kullanılır. Bu, Java'daki `System.out.println()` fonksiyonunun doğrudan karşılığıdır.",
            en: "In JavaScript, `console.log()` is used to print logs to the console. It is the direct equivalent of Java's `System.out.println()`."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript, TV kumandası gibi çalışır: HTML sayfan televizyonun kendisi, CSS kanalları değiştirmek, JavaScript ise sesini kısıp büyütmek, kanalı değiştirmek ve kapatmak gibi gerçek zamanlı komutları veren kumandadır.",
          en: "Think of JavaScript as a TV remote: HTML is the television itself, CSS changes how it looks, and JavaScript gives you real-time control — turning up volume, changing channels, switching it on and off dynamically."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript web'in tek canlı dili oldu? Çünkü 1995'te Netscape, tarayıcıların kodu çalıştırmasını sağlayan tek dili seçmek zorundaydı. Java çok ağır, Python tarayıcıda yoktu — Brendan Eich 10 günde JavaScript'i yarattı. Bugün değiştirmenin maliyeti astronomik, bu yüzden her tarayıcı hâlâ JS çalıştırıyor.",
          en: "Why did JavaScript become the only living language of the web? In 1995 Netscape needed exactly ONE language browsers could run. Java was too heavy, Python had no browser runtime — Brendan Eich built JavaScript in 10 days. The migration cost to change it now is astronomical, so every browser still runs JS."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript hem frontend hem backend'de çalışıyor? Çünkü 2009'da Ryan Dahl, Chrome'un V8 JavaScript motorunu tarayıcı dışına taşıdı ve Node.js'i yarattı. V8 motoru artık dosya sistemi, ağ, işletim sistemi ile iletişim kurabiliyor. Yani öğrendiğin aynı dil, iki farklı ortamda çalışıyor.",
          en: "Why does JavaScript run both frontend AND backend? In 2009 Ryan Dahl extracted Chrome's V8 JS engine from the browser and built Node.js. V8 now talks to file systems, networks, and the OS. The exact same language you learn runs in two completely different environments."
        }
      },
      {
        type: "quiz",
        question: { tr: "JavaScript'te `typeof null` ifadesinin sonucu nedir?", en: "What does `typeof null` return in JavaScript?" },
        options: [
          { id: "a", text: { tr: "\"null\"", en: "\"null\"" } },
          { id: "b", text: { tr: "\"undefined\"", en: "\"undefined\"" } },
          { id: "c", text: { tr: "\"object\"", en: "\"object\"" } },
          { id: "d", text: { tr: "\"string\"", en: "\"string\"" } }
        ],
        correct: "c",
        explanation: { tr: "`typeof null` ifadesi tarihsel bir hata nedeniyle `\"object\"` döndürür. Bu, JavaScript'in 1.0 versiyonundan gelen ve geriye dönük uyumluluk nedeniyle düzeltilemeyen bilinen bir hatadır.", en: "`typeof null` returns `\"object\"` due to a historical bug from JavaScript 1.0. It cannot be fixed because too many websites depend on this broken behavior — a perfect example of the cost of backwards compatibility." },
        retryQuestion: {
          question: { tr: "JavaScript'i diğer dillerden ayıran en temel özelliği nedir?", en: "What is the most fundamental feature that distinguishes JavaScript from most other languages?" },
          options: [
            { id: "a", text: { tr: "Nesne yönelimli olması", en: "Object-oriented" } },
            { id: "b", text: { tr: "Tarayıcıda çalışan tek dil", en: "Only language running natively in browsers" } },
            { id: "c", text: { tr: "Derlenen bir dil olması", en: "Being a compiled language" } },
            { id: "d", text: { tr: "Tip güvenli olması", en: "Being type-safe" } }
          ],
          correct: "b",
          explanation: { tr: "JavaScript, tarayıcılarda doğal olarak çalışan tek dildir. Bu benzersiz konumu onu web geliştirmenin zorunlu bir parçası yapar.", en: "JavaScript is the only language that runs natively in all web browsers — this unique position makes it an unavoidable part of web development." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain to someone who has never heard of JavaScript why it is used for test automation and how it differs from Java. No jargon!",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript'i hiç duymamış birine neden test otomasyonu için kullanıldığını ve Java'dan ne farkı olduğunu anlat. Teknik terim kullanma!",
        keywords: [
              ["tarayıcı", "browser"],
              ["browser", "fast"],
              ["hız", "direct"],
              ["direkt", "playwright"],
              ["playwright", "cypress"],
              ["cypress", "async"],
              ["asenkron", "native"],
              ["native", "modern"],
              ["modern", "runs"],
              ["çalıştırır", "engine"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 1 — Installation & Setup
  // ─────────────────────────────────────────────
  {
    title: { tr: "Kurulum & Setup", en: "Installation & Setup" },
    blocks: [
      {
        type: "css-animation",
        kind: "install",
        label: { tr: "Terminal — Node.js Kurulum Akışı", en: "Terminal — Node.js Installation Flow" }
      },
      {
        type: "heading",
        content: { tr: "Adım 1: Node.js Kurulumu", en: "Step 1: Install Node.js" }
      },
      {
        type: "text",
        content: {
          tr: "JavaScript tarayıcı dışında Node.js motoru sayesinde çalışır. Node.js bilgisayarınıza yüklendiğinde npm (Node Package Manager) de otomatik kurulur. Node.js, V8 motorunun bilgisayarımızda koşan sürümüdür.",
          en: "JavaScript runs outside the browser thanks to the Node.js runtime. When you install Node.js on your computer, npm (Node Package Manager) is automatically installed as well. Node.js is basically Chrome's V8 engine packaged to run locally on your system."
        }
      },
      {
        type: "code",
        language: "bash",
        label: { tr: "Windows (PowerShell / CMD)", en: "Windows (PowerShell / CMD)" },
        content: {
          tr: `# 1. Node.js LTS indir: https://nodejs.org → Windows Installer (.msi)
# 2. Kurulumdan sonra yeni terminal aç ve doğrula:
node --version   # Beklenen: v22.x.x
npm --version    # Beklenen: 10.x.x

# 3. İlk test
node -e "console.log('Node.js çalışıyor!')"
# Beklenen çıktı: Node.js çalışıyor!

# 4. Proje klasörü oluştur
mkdir my-qa-project && cd my-qa-project
npm init -y
# Beklenen: package.json dosyası oluşturuldu`,
          en: `# 1. Download Node.js LTS: https://nodejs.org → Windows Installer (.msi)
# 2. Open a new terminal after install and verify:
node --version   # Expected: v22.x.x
npm --version    # Expected: 10.x.x

# 3. Quick test
node -e "console.log('Node.js is running!')"
# Expected output: Node.js is running!

# 4. Create a project folder
mkdir my-qa-project && cd my-qa-project
npm init -y
# Expected: package.json file created`
        }
      },
      {
        type: "code",
        language: "bash",
        label: { tr: "macOS (Homebrew)", en: "macOS (Homebrew)" },
        content: {
          tr: `# 1. Homebrew yüklü değilse önce yükle:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Node.js LTS kur
brew install node
# Beklenen: Node.js ve npm birlikte kurulur

# 3. Doğrulama
node --version   # v22.x.x
npm --version    # 10.x.x

# 4. Versiyon yöneticisi (Önerilen — birden fazla proje için)
brew install nvm
nvm install --lts
nvm use --lts`,
          en: `# 1. Install Homebrew if not installed:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Node.js LTS
brew install node
# Expected: Node.js and npm installed together

# 3. Verify
node --version   # v22.x.x
npm --version    # 10.x.x

# 4. Version manager (Recommended — for multiple projects)
brew install nvm
nvm install --lts
nvm use --lts`
        }
      },
      {
        type: "code",
        language: "bash",
        label: { tr: "Linux (Ubuntu/Debian)", en: "Linux (Ubuntu/Debian)" },
        content: {
          tr: `# 1. NodeSource deposunu ekle ve Node.js kur
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
# Beklenen: "Processing triggers for man-db..."

# 2. Doğrulama
node --version   # v22.x.x
npm --version    # 10.x.x

# 3. Global paket izin sorunu varsa (npm EACCES)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# ~/.profile veya ~/.bashrc'ye ekle:
# export PATH=~/.npm-global/bin:$PATH`,
          en: `# 1. Add NodeSource repo and install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
# Expected: "Processing triggers for man-db..."

# 2. Verify
node --version   # v22.x.x
npm --version    # 10.x.x

# 3. Fix global package permission error (npm EACCES)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# Add to ~/.profile or ~/.bashrc:
# export PATH=~/.npm-global/bin:$PATH`
        }
      },
      {
        type: "code",
        language: "bash",
        label: { tr: "Playwright Projesi Kurulumu (Tüm OS)", en: "Playwright Project Setup (All OS)" },
        content: {
          tr: `# Yeni Playwright projesi oluştur
npm init playwright@latest

# Beklenen sorular:
# > Where to put your end-to-end tests? tests/
# > Add a GitHub Actions workflow? (y/N) N (şimdilik)
# > Install Playwright browsers? (Y/n) Y

# Kurulum sonrası doğrulama
npx playwright --version        # Playwright v1.x.x
npx playwright test --list      # Test dosyalarını listeler

# İlk testi çalıştır
npx playwright test
# Beklenen çıktı: X passed (Xm Xs)`,
          en: `# Create a new Playwright project
npm init playwright@latest

# Expected prompts:
# > Where to put your end-to-end tests? tests/
# > Add a GitHub Actions workflow? (y/N) N (for now)
# > Install Playwright browsers? (Y/n) Y

# Verify after setup
npx playwright --version        # Playwright v1.x.x
npx playwright test --list      # Lists all test files

# Run first test
npx playwright test
# Expected output: X passed (Xm Xs)`
        }
      },
      {
        type: "installation",
        title: { tr: "Hızlı Kontrol Listesi", en: "Quick Verification Checklist" },
        steps: [
          {
            cmd: "node --version",
            explanation: {
              tr: "Node.js sürümünü kontrol eder. v18+ LTS sürümü gereklidir. Çıktı örneği: v22.4.0",
              en: "Checks Node.js version. v18+ LTS required. Expected output: v22.4.0"
            }
          },
          {
            cmd: "npm --version",
            explanation: {
              tr: "npm paket yöneticisi sürümünü kontrol eder. Çıktı örneği: 10.8.1",
              en: "Checks npm package manager version. Expected output: 10.8.1"
            }
          },
          {
            cmd: "node -e \"console.log('JS OK')\"",
            explanation: {
              tr: "Node.js'nin düzgün çalıştığını doğrular. Çıktı: JS OK",
              en: "Verifies Node.js is running correctly. Expected output: JS OK"
            }
          },
          {
            cmd: "npx playwright --version",
            explanation: {
              tr: "Playwright kuruluysa sürümünü gösterir. Çıktı örneği: Version 1.48.0",
              en: "Shows Playwright version if installed. Expected output: Version 1.48.0"
            }
          }
        ]
      },
      {
        type: "quiz",
        question: {
          tr: "JavaScript kütüphanelerini (Playwright vb.) projeye eklemek için hangi aracı kullanırız?",
          en: "Which tool do we use to add JavaScript libraries (like Playwright) to our project?"
        },
        options: [
          { id: "a", text: "Maven (pom.xml)" },
          { id: "b", text: "pip install" },
          { id: "c", text: { tr: "npm (Node Package Manager)", en: "npm (Node Package Manager)" } },
          { id: "d", text: "Gradle" }
        ],
        correct: "c",
        explanation: {
          tr: "npm, Node.js ekosisteminin bağımlılık yöneticisidir. Java'daki Maven/pom.xml neyse, Node.js dünyasında da package.json ve npm odur.",
          en: "npm is the dependency manager of the Node.js ecosystem. What Maven/pom.xml is to Java, package.json and npm are to Node.js."
        },
        retryQuestion: {
          question: {
            tr: "Node.js nedir?",
            en: "What is Node.js?"
          },
          options: [
            { id: "a", text: { tr: "Bir tarayıcı eklentisidir", en: "A browser plugin" } },
            { id: "b", text: { tr: "JavaScript'i tarayıcı dışında (sunucu/local) çalıştırma ortamıdır", en: "A runtime to run JavaScript outside the browser" } },
            { id: "c", text: { tr: "Yeni bir veri tabanı türüdür", en: "A new type of database" } },
            { id: "d", text: { tr: "Sadece CSS yazmak için kullanılır", en: "Used only for writing CSS" } }
          ],
          correct: "b",
          explanation: {
            tr: "Node.js, Google Chrome'un V8 motorunu temel alarak JavaScript kodlarının sunucularda veya bilgisayarınızda (local) bağımsız olarak çalışabilmesini sağlar.",
            en: "Node.js builds on Google Chrome's V8 engine to let JavaScript run standalone on servers or local machines."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "npm (Node Package Manager), bir yazılım süpermarketi gibi çalışır. `npm install axios` yazdığında, marketten hazır bir ürün alıp kendi projenin rafına koyuyorsun. `package.json` ise alışveriş listendir — hangi ürünlerin hangi versiyonunu aldığını kaydeder.",
          en: "npm (Node Package Manager) works like a software supermarket. When you run `npm install axios`, you're picking a ready-made product off the shelf and adding it to your project. `package.json` is your shopping list — it records exactly which product versions you need."
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`node_modules` klasörü, satın aldığın tüm ürünlerin deposudur. Çok büyür (yüzlerce MB), bu yüzden `.gitignore`'a eklenir — çünkü arkadaşın projeyi klonladığında `npm install` komutuyla o depoyu anında yeniden oluşturabilir.",
          en: "The `node_modules` folder is the warehouse that stores every purchased product. It gets huge (hundreds of MB), so it goes in `.gitignore` — because when a colleague clones the project, `npm install` instantly rebuilds the whole warehouse from scratch."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Node.js kurmak, LEGO fabrikasını satın almak gibidir. Fabrika olmadan LEGO parçası üretemezsin; Node.js olmadan JavaScript kodunu bilgisayarında çalıştıramazsın. npm ise fabrikadan parça sipariş etmeni sağlayan katalogdur.",
          en: "Installing Node.js is like buying the LEGO factory. Without the factory you cannot produce LEGO pieces; without Node.js you cannot run JavaScript on your computer. npm is the parts catalogue that lets you order pieces from the factory."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`package.json` içindeki `\"dependencies\"` listesi, bir LEGO setinin parça listesi gibidir. Her kutunun içinde hangi parçanın kaç adet bulunduğunu söyler. `npm install` bu listeyi okuyup her parçayı otomatik olarak sipariş eder.",
          en: "The `\"dependencies\"` list in `package.json` is like the parts inventory inside a LEGO set box. It tells you exactly which pieces and how many you need. Running `npm install` reads this list and automatically orders every part."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden Node.js'e ihtiyaç var? Tarayıcıdaki JavaScript dosya sistemine, ağ soketlerine veya işletim sistemi kaynaklarına erişemez — güvenlik kısıtlaması. Node.js bu kısıtlamaları kaldırarak JavaScript'i sunucu tarafında çalıştırabilir hale getirir. Playwright testlerin bu yüzden Node.js gerektirir.",
          en: "Why do we need Node.js? Browser JavaScript cannot access the file system, network sockets, or OS resources — for security reasons. Node.js removes those restrictions and lets JavaScript run server-side. This is exactly why your Playwright tests require Node.js."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `npm install --save-dev` ile `npm install` farklı? `--save-dev` (veya `-D`) ile kurulan paketler sadece geliştirme ortamında kullanılır, production'a gitmez. Playwright, Jest, ESLint gibi test araçları `devDependencies`'e gider — son kullanıcıya bu araçlar gönderilmez.",
          en: "Why is `npm install --save-dev` different from `npm install`? Packages installed with `--save-dev` (or `-D`) are development-only tools — they never go to production. Playwright, Jest, ESLint belong in `devDependencies` because end-users don't need test runners and linters."
        }
      },
      {
        type: "quiz",
        question: { tr: "`package.json` dosyasındaki bağımlılıkları yeniden yüklemek için hangi komut kullanılır?", en: "Which command reinstalls all dependencies listed in `package.json`?" },
        options: [
          { id: "a", text: { tr: "`node install`", en: "`node install`" } },
          { id: "b", text: { tr: "`npm run build`", en: "`npm run build`" } },
          { id: "c", text: { tr: "`npm install`", en: "`npm install`" } },
          { id: "d", text: { tr: "`node_modules install`", en: "`node_modules install`" } }
        ],
        correct: "c",
        explanation: { tr: "`npm install` komutu, `package.json` dosyasındaki tüm bağımlılıkları okuyarak `node_modules` klasörüne yükler. Klonlanan bir projede her zaman önce bu komut çalıştırılır.", en: "`npm install` reads every dependency listed in `package.json` and installs them all into `node_modules`. Always run this first after cloning a project." },
        retryQuestion: {
          question: { tr: "`npm init -y` komutu ne yapar?", en: "What does `npm init -y` do?" },
          options: [
            { id: "a", text: "Node.js günceller / Updates Node.js" },
            { id: "b", text: { tr: "Tüm soruları otomatik \"evet\" ile geçip package.json oluşturur", en: "Creates package.json with all defaults automatically" } },
            { id: "c", text: "Projeyi siler / Deletes the project" },
            { id: "d", text: "npm'i günceller / Updates npm" }
          ],
          correct: "b",
          explanation: { tr: "`npm init -y` tüm yapılandırma sorularını otomatik varsayılan değerlerle yanıtlayarak bir `package.json` dosyası oluşturur.", en: "`npm init -y` answers all configuration questions with default values and instantly creates a `package.json` file — `-y` means \"yes to all\"." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: What is Node.js and why do we need to install it? What does npm do? How does it relate to Maven in Java?",
        promptTr: "🤖 Mini Kahraman Soruyor: Node.js nedir ve neden bilgisayarımıza kurmak zorundayız? npm ise ne işe yarar? Java'daki Maven ile nasıl bir bağlantısı var?",
        keywords: [
              ["motor", "engine"],
              ["çalıştırma", "runtime"],
              ["dışında", "outside"],
              ["paket", "package"],
              ["bağımlılık", "dependency"],
              ["tarayıcı", "browser"],
              "npm",
              ["kurulum", "install"],
              ["yönetici", "manager"],
              ["proje", "project"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 2 — Variables & Operators
  // ─────────────────────────────────────────────
  {
    title: { tr: "Değişkenler & Operatörler", en: "Variables & Operators" },
    blocks: [
      {
        type: "simple-box",
        emoji: "📦",
        content: {
          tr: "JavaScript'te üç farklı oyuncak kutusu (lego sepeti) vardır. 'var' sepetinin altı deliktir ve içindeki sırlar dışarı sızabilir (hoisting/global scope). 'let' ve 'const' sepetleri ise kapaklı ve korumalı kalelerdir. 'const' sepetine koyduğunuz bir oyuncağın rengi ise bir daha asla değiştirilemez!",
          en: "In JavaScript, there are three types of toy baskets. The 'var' basket is leaky at the bottom (hoisting/global scope), while 'let' and 'const' are secure, covered castles. A toy placed in 'const' can never have its color changed!"
        }
      },
      {
        type: "js-variables-visual"
      },
      {
        type: "heading",
        content: { tr: "var, let, const Farkları", en: "Differences between var, let, and const" }
      },
      {
        type: "table",
        headers: [
          { tr: "Özellik", en: "Feature" },
          { tr: "var", en: "var" },
          { tr: "let", en: "let" },
          { tr: "const", en: "const" }
        ],
        rows: [
          [
            { tr: "Scope (Kapsam)", en: "Scope" },
            { tr: "Function Scope (Sızabilir)", en: "Function Scope" },
            { tr: "Block Scope (Korumalı)", en: "Block Scope" },
            { tr: "Block Scope (Korumalı)", en: "Block Scope" }
          ],
          [
            { tr: "Yeniden Atama", en: "Re-assignment" },
            { tr: "Serbest (Evet)", en: "Allowed (Yes)" },
            { tr: "Serbest (Evet)", en: "Allowed (Yes)" },
            { tr: "Yasak (Hata verir)", en: "Forbidden (Throws error)" }
          ],
          [
            { tr: "Hoisting (Yukarı çekme)", en: "Hoisting" },
            { tr: "Tanımsız (undefined) sızar", en: "undefined leaks" },
            { tr: "Erişilemez (Temporal Dead Zone)", en: "Temporal Dead Zone" },
            { tr: "Erişilemez (Temporal Dead Zone)", en: "Temporal Dead Zone" }
          ]
        ]
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Değişkenlerin ve karşılaştırmaların farklarını inceleyin!
let score = 95;
const player = "Lego Hero";
// player = "New Hero"; // Bu satırın başındaki yorum işaretini kaldırırsanız hata verir!

let a = 5;
let b = "5";
console.log("== (Gevşek Eşitlik):", a == b);  // true
console.log("=== (Sıkı Eşitlik):", a === b); // false`,
          en: `// Examine variable scopes and strict comparison operators!
let score = 95;
const player = "Lego Hero";
// player = "New Hero"; // Uncommenting this line will crash the program!

let a = 5;
let b = "5";
console.log("== (Loose Equality):", a == b);   // true
console.log("=== (Strict Equality):", a === b); // false`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Aşağıdakilerden hangisi `const` ile tanımlanmış bir değişkene yeni bir değer atamaya çalışırsa oluşur?",
          en: "What happens if you try to reassign a new value to a `const` variable?"
        },
        options: [
          { id: "a", text: { tr: "Değişken otomatik olarak 'let'e dönüşür", en: "The variable converts to 'let' automatically" } },
          { id: "b", text: { tr: "JavaScript sessizce işlemi görmezden gelir", en: "JavaScript silently ignores the operation" } },
          { id: "c", text: { tr: "TypeError hatası fırlatılır (Çalışma zamanında)", en: "A TypeError is thrown at runtime" } },
          { id: "d", text: { tr: "Değişkenin değeri 0 olur", en: "The variable becomes 0" } }
        ],
        correct: "c",
        explanation: {
          tr: "`const` (constant - sabit), tanımlandıktan sonra yeniden atama (re-assignment) yapılamayan değişken türüdür. Yeniden atama denemesi `TypeError: Assignment to constant variable.` hatasına yol açar.",
          en: "`const` (constant) variables cannot be reassigned after declaration. Attempting to do so throws `TypeError: Assignment to constant variable.`"
        },
        retryQuestion: {
          question: {
            tr: "Hoisting (Yukarı Çekme) durumunda `var` ile `let` arasındaki en büyük fark nedir?",
            en: "What is the biggest difference in hoisting between `var` and `let`?"
          },
          options: [
            { id: "a", text: { tr: "`var` değişkenleri hata fırlatır, `let` undefined döner", en: "`var` throws an error, `let` returns undefined" } },
            { id: "b", text: { tr: "`var` 'undefined' değerle yukarı çekilirken, `let` tanımlanana kadar Temporal Dead Zone'da kalır (hata fırlatır)", en: "`var` is hoisted with 'undefined', while `let` stays in Temporal Dead Zone (throws error) until defined" } },
            { id: "c", text: { tr: "`let` global scope sızıntısı yapar", en: "`let` leaks global scope variables" } },
            { id: "d", text: { tr: "Hiçbir fark yoktur", en: "There is no difference" } }
          ],
          correct: "b",
          explanation: {
            tr: "`var` ile tanımlanan değişkenler kod bloğunun tepesine çekilir ve atanmadan önce okunduğunda `undefined` döndürür. `let` ve `const` ise Temporal Dead Zone'da (TDZ) kalır ve atanmadan erişilirse `ReferenceError` fırlatır.",
            en: "`var` variables are hoisted to the top of their scope and return `undefined` if accessed before initialization. `let` and `const` remain in the Temporal Dead Zone (TDZ) and throw `ReferenceError` if accessed before declaration."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`const` bir kiralık kasaya konulan eşyaya benzer: içine bir kez koyarsın, bir daha değiştiremezsin. `let` ise beyaz tahta gibidir: yazabilir, silebilir, tekrar yazabilirsin. `var` ise birden fazla kişinin aynı anda kullandığı ortak bir klasör — kim ne yazdı belli olmaz.",
          en: "`const` is like an item locked in a safety deposit box: you put it in once and cannot change it. `let` is a whiteboard — you can write, erase, and rewrite freely. `var` is a shared folder that everyone on the team can edit simultaneously — you never know who changed what."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `var` kullanımdan kalktı? `var` ile tanımlanan değişkenler, tanımlandıkları bloğu değil, içinde oldukları fonksiyonu veya global kapsamı doldurur (function scope). Bu, `for` döngüsü içindeki `var i`'nin döngü dışında da erişilebilir kalmasına yol açar — beklenmeyen bug'lara zemin hazırlar. `let` bu sorunu block scope ile çözdü.",
          en: "Why did `var` fall out of use? Variables declared with `var` belong to the enclosing function or global scope — not the block they're in. So `var i` inside a `for` loop is still accessible outside the loop, creating unexpected bugs. `let` solved this with proper block scoping."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `const` varsayılan tercih olmalı? Kodu okurken bir değişkenin `const` olduğunu gördüğünde, o değerin hiçbir zaman yeniden atanmayacağını garanti altına alırsın. Bu, debug sürecini kolaylaştırır — değer nereden değişti diye aramak zorunda kalmazsın. `let` yalnızca değerin gerçekten değişmesi gerektiğinde kullanılır.",
          en: "Why should `const` be the default? When you read code and see `const`, you are guaranteed that variable will never be reassigned — it makes debugging dramatically easier. You never need to trace where a value changed. Use `let` only when you genuinely need reassignment."
        }
      },
      {
        type: "quiz",
        question: { tr: "Aşağıdaki kod çalıştırıldığında ne olur?\n```js\nconst arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);\n```", en: "What happens when this code runs?\n```js\nconst arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);\n```" },
        options: [
          { id: "a", text: { tr: "Hata verir — const değiştirilemez", en: "Throws an error — const cannot be changed" } },
          { id: "b", text: { tr: "`[1, 2, 3, 4]` yazdırır — referans sabittir ama içerik değiştirilebilir", en: "Prints `[1, 2, 3, 4]` — the reference is fixed but contents can mutate" } },
          { id: "c", text: { tr: "`[1, 2, 3]` yazdırır — push çalışmaz", en: "Prints `[1, 2, 3]` — push has no effect" } },
          { id: "d", text: { tr: "`undefined` yazdırır", en: "Prints `undefined`" } }
        ],
        correct: "b",
        explanation: { tr: "`const` yalnızca değişkenin yeniden atanmasını (reassignment) engeller, nesne veya dizinin içeriğinin değiştirilmesini (mutation) engellemez. `arr = [5]` yazsaydın hata alırdın; ama `arr.push(4)` mevcut dizinin içeriğini değiştirir, bu izin verilir.", en: "`const` only prevents reassignment of the variable itself, not mutation of the object or array it points to. `arr = [5]` would throw; but `arr.push(4)` mutates the existing array's contents — that is allowed." },
        retryQuestion: {
          question: { tr: "Hangi keyword yalnızca tanımlandığı blok içinde geçerlidir (block-scoped)?", en: "Which keyword is block-scoped — only accessible within the block where it is declared?" },
          options: [
            { id: "a", text: "var" },
            { id: "b", text: "let ve const / let and const" },
            { id: "c", text: "function" },
            { id: "d", text: "global" }
          ],
          correct: "b",
          explanation: { tr: "`let` ve `const` block-scoped'dır: `if`, `for`, `while` gibi bloklar içinde tanımlandıklarında sadece o blok içinde erişilebilirler.", en: "`let` and `const` are block-scoped: declared inside an `if`, `for`, or `while` block, they are only accessible within that exact block." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: How would you explain var, let, and const to someone who has never written code? Can you also connect const to Java's final keyword?",
        promptTr: "🤖 Mini Kahraman Soruyor: var, let ve const'u hiç kod yazmamış birine anlatmak zorunda kalsan nasıl açıklardın? Java'daki final anahtar kelimesiyle const arasındaki bağlantıyı da kurabilir misin?",
        keywords: [
              ["kutu", "box"],
              ["sabit", "fixed"],
              ["kilitli", "locked"],
              ["değiştirilemez", "cannot"],
              ["kapsam", "scope"],
              ["blok", "block"],
              ["sızdırır", "leaks"],
              "const",
              "let",
              "var"
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 3 — Data Types & Functions
  // ─────────────────────────────────────────────
  {
    title: { tr: "Veri Tipleri & Fonksiyonlar", en: "Data Types & Functions" },
    blocks: [
      {
        type: "css-animation",
        kind: "datatypes",
        label: { tr: "Primitive (Stack) vs Reference (Heap) Tipleri", en: "Primitive (Stack) vs Reference (Heap) Types" }
      },
      {
        type: "simple-box",
        emoji: "📊",
        content: {
          tr: "JavaScript veri tipleri iki gruba ayrılır: Primitive tipler (String, Number, Boolean, Null, Undefined, Symbol, BigInt) küçük LEGO parçaları gibidir — tek başlarına değer taşırlar. Reference tipler (Object, Array, Function) ise birden fazla parçanın bir arada durduğu robotlardır. Fonksiyonlar, bir düğmeye basıldığında çalışan otomatik fabrikalardır.",
          en: "JavaScript types split into two groups: Primitive types (String, Number, Boolean, Null, Undefined, Symbol, BigInt) are single LEGO bricks holding a value on their own. Reference types (Object, Array, Function) are assembled robots made of many bricks. Functions are automatic factories that run a task every time a button is pressed."
        }
      },
      {
        type: "heading",
        content: { tr: "Primitive Tipler — 7 Temel Yapı Taşı", en: "Primitive Types — 7 Building Blocks" }
      },
      {
        type: "table",
        headers: [
          { tr: "Tip", en: "Type" },
          { tr: "Örnek Değer", en: "Example Value" },
          { tr: "typeof Sonucu", en: "typeof Result" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          ["String",  `"hello"`,      `"string"`,    "String"],
          ["Number",  "42 / 3.14",    `"number"`,    "int / double"],
          ["Boolean", "true / false", `"boolean"`,   "boolean"],
          ["Undefined", "undefined",  `"undefined"`, { tr: "Yok (null benzeri)", en: "N/A (similar to null)" }],
          ["Null",    "null",         `"object"` ,   { tr: "null (dikkat: typeof hatası!)", en: "null (watch out: typeof bug!)" }],
          ["Symbol",  "Symbol('id')", `"symbol"`,    { tr: "Yok (JS özgün)", en: "N/A (JS-specific)" }],
          ["BigInt",  "9007n",        `"bigint"`,    "long / BigInteger"]
        ]
      },
      {
        type: "heading",
        content: { tr: "3 Farklı Fonksiyon Yazım Biçimi", en: "3 Ways to Write Functions" }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Function Declaration vs Expression vs Arrow", en: "Function Declaration vs Expression vs Arrow" },
        content: {
          tr: `// ─── 1. Function Declaration (Bildirim) ──────────────────────
// Java'daki public static void / String methodName() gibi
// Hoisting: tanımlanmadan ÖNCE çağrılabilir
function add(a, b) {
  return a + b;
}
console.log(add(3, 5)); // 8

// ─── 2. Function Expression (İfade) ──────────────────────────
// Değişkene atanır; hoisting OLMAZ
const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(4, 6)); // 24

// ─── 3. Arrow Function (ES6) ──────────────────────────────────
// Kısa sözdizimi; 'this' bağlamını DEVRALmaz (önemli fark!)
const divide = (a, b) => a / b;           // tek satır → return örtük
const greet  = name => \`Merhaba, \${name}!\`; // tek parametre → parantez opsiyonel

console.log(divide(10, 2)); // 5
console.log(greet("Hasan")); // Merhaba, Hasan!`,
          en: `// ─── 1. Function Declaration ─────────────────────────────────
// Like Java's public static void / String methodName()
// Hoisting: callable BEFORE it is defined
function add(a, b) {
  return a + b;
}
console.log(add(3, 5)); // 8

// ─── 2. Function Expression ───────────────────────────────────
// Assigned to a variable; NO hoisting
const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(4, 6)); // 24

// ─── 3. Arrow Function (ES6) ──────────────────────────────────
// Concise syntax; does NOT inherit its own 'this' (key difference!)
const divide = (a, b) => a / b;           // single line → implicit return
const greet  = name => \`Hello, \${name}!\`; // single param → parentheses optional

console.log(divide(10, 2)); // 5
console.log(greet("Hasan")); // Hello, Hasan!`
        }
      },
      {
        type: "table",
        headers: [
          { tr: "Özellik", en: "Feature" },
          { tr: "Function Declaration", en: "Function Declaration" },
          { tr: "Function Expression", en: "Function Expression" },
          { tr: "Arrow Function", en: "Arrow Function" }
        ],
        rows: [
          [
            { tr: "Hoisting (Yukarı çekilir mi?)", en: "Hoisting?" },
            { tr: "✅ Evet", en: "✅ Yes" },
            { tr: "❌ Hayır", en: "❌ No" },
            { tr: "❌ Hayır", en: "❌ No" }
          ],
          [
            { tr: "this bağlamı", en: "this binding" },
            { tr: "Kendi 'this'i var", en: "Has own 'this'" },
            { tr: "Kendi 'this'i var", en: "Has own 'this'" },
            { tr: "Üst kapsamdan devralır", en: "Inherits from outer scope" }
          ],
          [
            { tr: "Sözdizimi kısalığı", en: "Conciseness" },
            { tr: "Uzun", en: "Verbose" },
            { tr: "Orta", en: "Medium" },
            { tr: "✅ En kısa", en: "✅ Shortest" }
          ],
          [
            { tr: "Kullanım alanı", en: "Best use case" },
            { tr: "Genel helper fonksiyonlar", en: "General helper functions" },
            { tr: "Callback, değişken atama", en: "Callbacks, variable assignment" },
            { tr: "Array metodları (.map, .filter)", en: "Array methods (.map, .filter)" }
          ]
        ]
      },
      {
        type: "heading",
        content: { tr: "Fonksiyon & Nesne Tanımlama — Kendin Dene", en: "Functions & Objects — Try It Yourself" }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Fonksiyon ve nesne kullanımı!
const robot = {
  name: "Buster",
  role: "QA Tester",
  greet: function() {
    return "Merhaba, ben " + this.name + ", göreve hazırım!";
  }
};
console.log(robot.greet());

// Arrow function ile test sonucu özeti
const summarize = (passed, failed) =>
  \`✅ \${passed} Başarılı | ❌ \${failed} Başarısız | Toplam: \${passed + failed}\`;

console.log(summarize(12, 3));

// typeof ile tip kontrolü
console.log(typeof "test", typeof 42, typeof true, typeof undefined, typeof null);`,
          en: `// Functions and object usage!
const robot = {
  name: "Buster",
  role: "QA Tester",
  greet: function() {
    return "Hi, I am " + this.name + ", ready for action!";
  }
};
console.log(robot.greet());

// Arrow function for test summary
const summarize = (passed, failed) =>
  \`✅ \${passed} Passed | ❌ \${failed} Failed | Total: \${passed + failed}\`;

console.log(summarize(12, 3));

// typeof type check
console.log(typeof "test", typeof 42, typeof true, typeof undefined, typeof null);`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te tanımlanmış ama henüz değer atanmamış bir değişkenin veri tipi (ve değeri) nedir?",
          en: "What is the type (and value) of a declared variable that has not been initialized with a value yet?"
        },
        options: [
          { id: "a", text: "null" },
          { id: "b", text: "undefined" },
          { id: "c", text: "void" },
          { id: "d", text: "empty" }
        ],
        correct: "b",
        explanation: {
          tr: "JavaScript'te tanımlanmış ama henüz atanmamış değişkenler varsayılan olarak `undefined` veri tipine ve değerine sahip olurlar. Java'da böyle bir durum derleme hatası verirken, JavaScript bu durumu geçerli bir değer (`undefined`) olarak kabul eder.",
          en: "In JavaScript, variables declared but not assigned default to type and value `undefined`. Unlike Java which would throw a compile error, JavaScript treats this as a valid state with the `undefined` value."
        },
        retryQuestion: {
          question: {
            tr: "JavaScript'te `typeof null` ifadesinin döndürdüğü değer nedir? Bu neden beklenmedik bir sonuçtur?",
            en: "What does `typeof null` return in JavaScript, and why is this surprising?"
          },
          options: [
            { id: "a", text: `"null"` },
            { id: "b", text: `"undefined"` },
            { id: "c", text: `"object"` },
            { id: "d", text: `"none"` }
          ],
          correct: "c",
          explanation: {
            tr: "`typeof null` beklenmedik şekilde `'object'` döner. Bu, JavaScript'in ilk sürümlerinden gelen tarihi bir bug olup geriye dönük uyumluluk için düzeltilmemiştir. Null kontrolü için `=== null` kullanılmalıdır.",
            en: "`typeof null` unexpectedly returns `'object'`. This is a historical bug from the first JavaScript release, kept unfixed for backward compatibility. Always use `=== null` to check for null values."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Arrow function ile normal function arasındaki en kritik fark hangisidir?",
          en: "What is the most critical difference between an arrow function and a regular function?"
        },
        options: [
          { id: "a", text: { tr: "Arrow function daha yavaş çalışır", en: "Arrow functions are slower" } },
          { id: "b", text: { tr: "Arrow function kendi 'this' bağlamına sahip değildir; üst kapsamdan devralır", en: "Arrow functions do not have their own 'this'; they inherit it from the enclosing scope" } },
          { id: "c", text: { tr: "Arrow function sadece number döndürebilir", en: "Arrow functions can only return numbers" } },
          { id: "d", text: { tr: "Arrow function parametre alamaz", en: "Arrow functions cannot accept parameters" } }
        ],
        correct: "b",
        explanation: {
          tr: "Normal fonksiyonlar çağrıldıkları bağlama göre kendi `this`'ini oluşturur. Arrow function'lar ise `this`'i tanımlandıkları dış kapsam (lexical scope) üzerinden devralır. Bu fark özellikle class metotlarında ve event listener'larda kritik önem taşır.",
          en: "Regular functions create their own `this` based on how they are called. Arrow functions inherit `this` from the outer (lexical) scope where they are defined. This distinction is critical in class methods and event listeners."
        },
        retryQuestion: {
          question: {
            tr: "Aşağıdaki hangi fonksiyon tanımı hoisting sayesinde tanımlanmadan önce çağrılabilir?",
            en: "Which of the following function definitions can be called before it appears in the code due to hoisting?"
          },
          options: [
            { id: "a", text: "const fn = () => {}" },
            { id: "b", text: "const fn = function() {}" },
            { id: "c", text: "function fn() {}" },
            { id: "d", text: { tr: "Hiçbiri hoisting'e tabi değildir", en: "None of them are hoisted" } }
          ],
          correct: "c",
          explanation: {
            tr: "Yalnızca `function` anahtar kelimesiyle yazılan Function Declaration'lar hoisting'e tabidir ve tanım satırından önce çağrılabilir. `const`, `let` veya `var` ile tanımlanan Function Expression ve Arrow Function'lar hoisting'den yararlanamaz.",
            en: "Only classic `function` keyword declarations are fully hoisted and callable before their definition line. Function Expressions and Arrow Functions assigned to `const`, `let`, or `var` are NOT hoisted."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript'teki 7 temel veri tipi, mutfaktaki farklı kap türleri gibidir: `number` ölçüm kabı, `string` etiket bandı, `boolean` açık/kapalı düğmesi, `null` kasıtlı boş bırakılan raf, `undefined` henüz konulmamış raf, `object` içine her şey konulabilen kutu, `symbol` eşsiz barkod.",
          en: "The 7 primitive types in JavaScript are like different kitchen containers: `number` is a measuring cup, `string` is a label tape, `boolean` is an on/off switch, `null` is a deliberately empty shelf, `undefined` is a shelf nothing has been placed on yet, `object` is a box holding anything, `symbol` is a unique barcode."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript'te `==` ve `===` ikisi birden var? `==` (loose equality) önce tipleri zorla dönüştürür, sonra karşılaştırır: `\"5\" == 5` → `true`. `===` (strict equality) hem değeri hem tipi kontrol eder: `\"5\" === 5` → `false`. Test otomasyonunda her zaman `===` kullanılır — tip farkından kaynaklanan sessiz bug'ları önler.",
          en: "Why does JavaScript have both `==` and `===`? `==` (loose equality) coerces types first: `\"5\" == 5` → `true`. `===` (strict equality) checks both value AND type: `\"5\" === 5` → `false`. In test automation, always use `===` — loose equality hides type-mismatch bugs that only surface at runtime."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `NaN === NaN` false döndürür? `NaN` (Not a Number), geçersiz bir matematiksel işlemin sonucudur — ve geçersiz bir sonuç başka geçersiz bir sonuçla eşit olamaz. Bu yüzden JavaScript `NaN`'ı kendisiyle eşit saymaz. `isNaN()` veya `Number.isNaN()` ile kontrol etmek gerekir.",
          en: "Why does `NaN === NaN` return false? `NaN` (Not a Number) is the result of an invalid math operation — and one invalid result cannot logically equal another. So JavaScript says NaN is not even equal to itself. Use `isNaN()` or `Number.isNaN()` to check for it."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: How many data types exist in JavaScript and what analogy would you use? How would you explain arrow functions vs regular functions to your neighbor?",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript'te kaç çeşit veri tipi var ve onları nasıl bir benzetmeyle anlatırsın? Arrow function ile normal function arasındaki farkı komşuna anlatmak zorunda kalsaydın ne derdin?",
        keywords: [
              ["tip", "type"],
              "primitive",
              ["değer", "value"],
              ["fonksiyon", "function"],
              ["fabrika", "factory"],
              "this",
              "arrow",
              ["ok", "block"],
              ["parça", "brick"],
              ["çalıştır", "runs"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 4 — Strings & Numbers
  // ─────────────────────────────────────────────
  {
    title: { tr: "String & Sayı & Matematik", en: "String, Numbers & Math" },
    blocks: [
      {
        type: "css-animation",
        kind: "strings",
        label: { tr: "Template Literal Birleştirme Animasyonu", en: "Template Literal Concatenation Animation" }
      },
      {
        type: "simple-box",
        emoji: "🔤",
        content: {
          tr: "Web otomasyonunda yazı ve sayılarla oynamak çok yaygındır. Elementlerin metinlerini okuruz, keseriz, sayılara dönüştürürüz ve doğrularız. `Template Literals` (ters tırnaklar) sayesinde dinamik test kodları ve seçicileri birleştirmek artık çocuk oyuncağı! Java'daki `String.format()` yerine JS'te `` `Merhaba ${isim}` `` kullanılır.",
          en: "Manipulating strings and numbers is highly common in web test automation. We scrape texts, slice them, parse numbers, and make assertions. Template Literals (backticks) replace Java's `String.format()` — just write `` `Hello ${name}` `` and you're done!"
        }
      },
      {
        type: "heading",
        content: { tr: "En Sık Kullanılan String Metotları", en: "Most Used String Methods" }
      },
      {
        type: "table",
        headers: [
          { tr: "Metot", en: "Method" },
          { tr: "Ne Yapar?", en: "What it does" },
          { tr: "Örnek", en: "Example" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          [".trim()",        { tr: "Baştaki ve sondaki boşlukları siler", en: "Removes leading and trailing spaces" }, `"  hi  ".trim()  → "hi"`,           ".strip()"],
          [".includes()",    { tr: "Alt metin içerip içermediğini kontrol eder", en: "Checks if substring exists" },     `"hello".includes("ell") → true`,    ".contains()"],
          [".startsWith()",  { tr: "Belirtilen metinle başlayıp başlamadığı", en: "Checks prefix match" },              `"Passed".startsWith("P") → true`,   ".startsWith()"],
          [".endsWith()",    { tr: "Belirtilen metinle bitip bitmediği", en: "Checks suffix match" },                   `"test.js".endsWith(".js") → true`,  ".endsWith()"],
          [".toUpperCase()", { tr: "Tüm harfleri büyük yapar", en: "Converts to uppercase" },                           `"hello".toUpperCase() → "HELLO"`,   ".toUpperCase()"],
          [".toLowerCase()", { tr: "Tüm harfleri küçük yapar", en: "Converts to lowercase" },                           `"HELLO".toLowerCase() → "hello"`,   ".toLowerCase()"],
          [".replace()",     { tr: "İlk eşleşmeyi değiştirir", en: "Replaces first match" },                            `"a-b-c".replace("-","/") → "a/b-c"`, ".replace() / replaceFirst()"],
          [".replaceAll()",  { tr: "Tüm eşleşmeleri değiştirir", en: "Replaces all matches" },                          `"a-b-c".replaceAll("-","/") → "a/b/c"`, ".replace()"],
          [".split()",       { tr: "Ayırıcıya göre diziye böler", en: "Splits by separator into array" },               `"a,b,c".split(",") → ["a","b","c"]`, ".split()"],
          [".slice()",       { tr: "Başlangıç-bitiş index ile alt metin alır", en: "Extracts substring by index range" }, `"hello".slice(1,3) → "el"`,        ".substring()"],
          [".indexOf()",     { tr: "Alt metnin ilk index'ini döner", en: "Returns first occurrence index" },             `"hello".indexOf("l") → 2`,          ".indexOf()"],
          [".padStart()",    { tr: "Soldan karakter ekleyerek uzunluğa tamamlar", en: "Pads string from start to length" }, `"5".padStart(3,"0") → "005"`,    { tr: "Yok (String.format ile)", en: "N/A (String.format)" }]
        ]
      },
      {
        type: "heading",
        content: { tr: "Number & Math Metotları", en: "Number & Math Methods" }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Sayı Dönüşümleri ve Math Nesnesi", en: "Number Conversions and Math Object" },
        content: {
          tr: `// ─── String → Number dönüşümleri ────────────────────────────
let strNum = "42";
console.log(Number(strNum));      // 42     ← güvenli dönüşüm
console.log(parseInt("42px"));   // 42     ← sayıyı parse eder, sonrasını atar
console.log(parseFloat("3.14")); // 3.14
console.log(+"99");               // 99     ← unary + operatörü (kısa yol)
console.log(Number("hello"));    // NaN    ← geçersiz dönüşüm

// ─── Number metodları ─────────────────────────────────────────
let price = 19.9876;
console.log(price.toFixed(2));         // "19.99" — ondalık yuvarlama (string döner!)
console.log(Number.isNaN(NaN));        // true
console.log(Number.isFinite(1/0));     // false (Infinity)
console.log(Number.isInteger(42.0));   // true

// ─── Math nesnesi ────────────────────────────────────────────
console.log(Math.round(4.6));   // 5
console.log(Math.floor(4.9));   // 4   ← aşağı yuvarla
console.log(Math.ceil(4.1));    // 5   ← yukarı yuvarla
console.log(Math.abs(-15));     // 15  ← mutlak değer
console.log(Math.max(1,9,3));   // 9
console.log(Math.min(1,9,3));   // 1
console.log(Math.random());     // 0–1 arası rastgele sayı
console.log(Math.sqrt(16));     // 4`,
          en: `// ─── String → Number conversions ────────────────────────────
let strNum = "42";
console.log(Number(strNum));      // 42     ← safe conversion
console.log(parseInt("42px"));   // 42     ← parses number, drops rest
console.log(parseFloat("3.14")); // 3.14
console.log(+"99");               // 99     ← unary + shorthand
console.log(Number("hello"));    // NaN    ← invalid conversion

// ─── Number methods ───────────────────────────────────────────
let price = 19.9876;
console.log(price.toFixed(2));         // "19.99" — decimal rounding (returns string!)
console.log(Number.isNaN(NaN));        // true
console.log(Number.isFinite(1/0));     // false (Infinity)
console.log(Number.isInteger(42.0));   // true

// ─── Math object ─────────────────────────────────────────────
console.log(Math.round(4.6));   // 5
console.log(Math.floor(4.9));   // 4   ← floor (round down)
console.log(Math.ceil(4.1));    // 5   ← ceil (round up)
console.log(Math.abs(-15));     // 15  ← absolute value
console.log(Math.max(1,9,3));   // 9
console.log(Math.min(1,9,3));   // 1
console.log(Math.random());     // random number between 0–1
console.log(Math.sqrt(16));     // 4`
        }
      },
      {
        type: "heading",
        content: { tr: "Template Literals & String Metotları — Kendin Dene", en: "Template Literals & String Methods — Try It Yourself" }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "200px",
        defaultCode: {
          tr: `// String manipülasyonu ve Template Literals!
let locatorName = "submit-btn";
let xpath = \`//button[@id="\${locatorName}"]\`;
console.log("Xpath:", xpath);

let rawText = "  Rapor: 15 Passed  ";
let cleanText = rawText.trim();
console.log("Temiz Metin:", cleanText);
console.log("Passed içeriyor mu?:", cleanText.includes("Passed"));
console.log("Büyük harf:", cleanText.toUpperCase());
console.log("Parçalar:", cleanText.split(": ")); // ["Rapor", "15 Passed"]`,
          en: `// String manipulation and Template Literals!
let locatorName = "submit-btn";
let xpath = \`//button[@id="\${locatorName}"]\`;
console.log("Computed Xpath:", xpath);

let rawText = "  Report: 15 Passed  ";
let cleanText = rawText.trim();
console.log("Cleaned Text:", cleanText);
console.log("Contains 'Passed'?:", cleanText.includes("Passed"));
console.log("Uppercase:", cleanText.toUpperCase());
console.log("Split parts:", cleanText.split(": ")); // ["Report", "15 Passed"]`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir string ifadenin karakter uzunluğunu almak için hangi özellik (property) kullanılır?",
          en: "Which property is used to get the character length of a string?"
        },
        options: [
          { id: "a", text: "size()" },
          { id: "b", text: "length()" },
          { id: "c", text: "length" },
          { id: "d", text: "count" }
        ],
        correct: "c",
        explanation: {
          tr: "JavaScript'te string'lerin uzunluğunu almak için `length` salt okunur özelliği (property) kullanılır. Java'daki `.length()` metotunun aksine JS'te parantez kullanılmaz — çünkü `length` bir metot değil, doğrudan bir özellik (property) alanıdır.",
          en: "In JavaScript, `length` is a read-only property (not a method). Unlike Java's `.length()` which uses parentheses, JS string `.length` has no parentheses because it is a property, not a function call."
        },
        retryQuestion: {
          question: {
            tr: "Ters tırnaklar (backticks) ile tanımlanan, satırlar arası geçişe izin veren ve `${değişken}` entegrasyonu sağlayan ES6 özelliği nedir?",
            en: "What is the ES6 feature called that uses backticks, supports multi-line strings, and allows embedding expressions via `${variable}`?"
          },
          options: [
            { id: "a", text: "String Concatenation" },
            { id: "b", text: "Template Literals" },
            { id: "c", text: "Interpolated Strings" },
            { id: "d", text: "JSON Strings" }
          ],
          correct: "b",
          explanation: {
            tr: "Template Literals, JavaScript'te ters tırnaklar (`` ` ``) kullanılarak dinamik metinler oluşturulmasını sağlayan ve otomasyonda dinamik seçiciler için vazgeçilmez olan bir özelliktir. Java'daki `String.format(\"Merhaba %s\", isim)` karşılığıdır.",
            en: "Template Literals use backticks (`` ` ``) for dynamic string building and are essential for writing dynamic locators in automation. They are the JS equivalent of Java's `String.format(\"Hello %s\", name)`."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Otomasyon testinde element metnini okuduk: `'  Login Başarılı  '`. Sadece içeriği almak, tüm harfleri küçük yapmak ve 'başarılı' içerip içermediğini kontrol etmek için doğru method zinciri hangisidir?",
          en: "In an automation test we scraped: `'  Login Successful  '`. Which method chain trims spaces, lowercases, and checks if it contains 'successful'?"
        },
        options: [
          { id: "a", text: `text.strip().lower().has("successful")` },
          { id: "b", text: `text.trim().toLowerCase().includes("successful")` },
          { id: "c", text: `text.clean().toLower().contains("successful")` },
          { id: "d", text: `text.trimAll().lowerCase().search("successful")` }
        ],
        correct: "b",
        explanation: {
          tr: "JavaScript'te doğru zincir: `.trim()` boşlukları temizler → `.toLowerCase()` küçük harfe çevirir → `.includes()` içerip içermediğini kontrol eder. Bu 3 metot otomasyon assertion adımlarında sıkça birlikte kullanılır.",
          en: "The correct JavaScript chain: `.trim()` removes spaces → `.toLowerCase()` converts to lowercase → `.includes()` checks for substring. These 3 methods are frequently chained together in automation assertion steps."
        },
        retryQuestion: {
          question: {
            tr: "`Number('42abc')` ve `parseInt('42abc')` ifadelerinin döndürdüğü değerler nelerdir?",
            en: "What do `Number('42abc')` and `parseInt('42abc')` return respectively?"
          },
          options: [
            { id: "a", text: { tr: "İkisi de 42 döner", en: "Both return 42" } },
            { id: "b", text: { tr: "NaN ve NaN", en: "NaN and NaN" } },
            { id: "c", text: { tr: "NaN ve 42", en: "NaN and 42" } },
            { id: "d", text: { tr: "42 ve NaN", en: "42 and NaN" } }
          ],
          correct: "c",
          explanation: {
            tr: "`Number('42abc')` geçersiz format nedeniyle `NaN` döner. `parseInt('42abc')` ise baştaki sayıyı parse eder ve kalan geçersiz karakterleri yoksayarak `42` döner. Bu fark API yanıtlarından sayı parse ederken kritik önem taşır.",
            en: "`Number('42abc')` returns `NaN` because the full string is not a valid number. `parseInt('42abc')` parses the leading numeric portion and ignores the rest, returning `42`. This difference matters when parsing numbers from API responses."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "Template literal'ler (backtick strings), bir doldurulan form gibi çalışır: boşluklar önceden belirlenir, değerler çalışma zamanında yerlerine otomatik girer. `\"Merhaba \" + name + \"!\"` yazmak yerine ``Merhaba ${name}!`` yazmak, hem okunabilirliği artırır hem de hata payını azaltır.",
          en: "Template literals (backtick strings) work like a pre-formatted form: the blanks are defined in advance and values automatically fill in at runtime. Writing ``Hello ${name}!`` instead of `\"Hello \" + name + \"!\"` is cleaner, more readable, and far less error-prone with complex strings."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Düşün ki birçok LEGO parçasını bir araya getirerek büyük bir yapı oluşturuyorsun. Eskiden `+` operatörüyle string birleştirme, parçaları tek tek elle yapıştırmak gibiydi. Template literal ise tüm parçaların yerini önceden işaretlenmiş bir şablon — sadece parçaları takıyorsun.",
          en: "Imagine assembling many LEGO pieces into a large structure. Old-style string concatenation with `+` was like gluing pieces together one by one by hand. Template literals are a pre-marked template — you just snap the pieces into their designated slots."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "JavaScript'te `parseInt()` ve `parseFloat()`, standart olmayan LEGO parçalarını standart bağlantı noktasına dönüştüren adaptörler gibidir: `\"42\"` string'ini `42` sayısına çevirir, böylece matematik işlemlerinde kullanılabilir hale getirir.",
          en: "In JavaScript, `parseInt()` and `parseFloat()` are like adapters that convert non-standard LEGO pieces to fit standard connectors: they turn the string `\"42\"` into the number `42` so it can be used in math operations."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `\"5\" + 3` ile `\"5\" - 3` farklı sonuçlar verir? `+` operatörü, string varlığında string birleştirme olarak davranır: `\"53\"`. `-` operatörü ise sadece matematiksel çıkarma yapar, stringleri önce sayıya zorla çevirir: `2`. Bu asimetri, JavaScript'in dinamik tiplemesinin yan etkisidir.",
          en: "Why does `\"5\" + 3` give different results than `\"5\" - 3`? The `+` operator performs string concatenation when a string is present: `\"53\"`. The `-` operator only does subtraction — it coerces both sides to numbers first: `2`. This asymmetry is a side effect of JavaScript's dynamic typing."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden string metodları (`toUpperCase`, `slice`, `includes`) primitive string'lerde çalışıyor? Çünkü JavaScript, bir metod çağrıldığında geçici olarak string'i `String` nesnesine sarar (autoboxing), metodu çalıştırır, sonra geçici nesneyi siler. Bu işlem gizlice gerçekleşir — Java'daki primitive wrapper'larla aynı mantık.",
          en: "Why do string methods (`toUpperCase`, `slice`, `includes`) work on primitive strings? Because JavaScript temporarily wraps the string in a `String` object when you call a method (autoboxing), runs the method, then discards the wrapper. This happens invisibly — the same concept as Java's primitive wrapper classes."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain why we use template literals and describe your 3 favorite string methods with a testing scenario. No technical language!",
        promptTr: "🤖 Mini Kahraman Soruyor: Template literal'leri neden kullandığımızı ve en sevdiğin 3 string metodunu bir otomasyon senaryosuyla birleştirerek anlat. Hiç teknik olmayan bir dille!",
        keywords: [
              ["birleştir", "combine"],
              "trim",
              ["büyük", "upper"],
              ["küçük", "lower"],
              ["içeriyor", "contains"],
              ["dinamik", "dynamic"],
              ["metin", "text"],
              "template",
              "includes",
              "replace"
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 5 — Array Methods
  // ─────────────────────────────────────────────
  {
    title: { tr: "Array Metotları (map, filter)", en: "Array Methods (map, filter)" },
    blocks: [
      {
        type: "css-animation",
        kind: "arrays",
        label: { tr: ".filter() Pipeline — Çift Sayıları Eler", en: ".filter() Pipeline — Eliminates Even Numbers" }
      },
      {
        type: "simple-box",
        emoji: "🍎",
        content: {
          tr: "JavaScript dizileri (arrays) son derece akıllıdır! Dizideki meyveleri robota soktuğumuzda `map()` hepsini dondurmaya dönüştürür. `filter()` ise sadece çürük olmayan taze meyveleri seçip ayıklar. `reduce()` ise tüm meyveleri tek bir büyük meyve suyuna sıkıp sıkıştırır!",
          en: "JavaScript arrays are super smart! When you pass fruits through a robot, `map()` converts each fruit into ice cream. `filter()` picks and keeps only the fresh fruits. `reduce()` squeezes all fruits into one giant cup of juice!"
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Array map & filter Örnekleri", en: "Array map & filter Examples" },
        content: {
          tr: `const fruits = ['🍎', '🍏', '🍊', '🍍'];

// 1. map() ile her meyveyi meyve suyuna dönüştür
const juices = fruits.map(fruit => fruit + '🥤');
console.log(juices); // ['🍎🥤', '🍏🥤', '🍊🥤', '🍍🥤']

// 2. filter() ile sadece elma olanları seç
const apples = fruits.filter(fruit => fruit === '🍎' || fruit === '🍏');
console.log(apples); // ['🍎', '🍏']`,
          en: `const fruits = ['🍎', '🍏', '🍊', '🍍'];

// 1. map() — transform each fruit into juice
const juices = fruits.map(fruit => fruit + '🥤');
console.log(juices); // ['🍎🥤', '🍏🥤', '🍊🥤', '🍍🥤']

// 2. filter() — keep only apples
const apples = fruits.filter(fruit => fruit === '🍎' || fruit === '🍏');
console.log(apples); // ['🍎', '🍏']`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Array (Dizi) metotlarını kendiniz deneyin!
const testResults = [
  { id: 1, name: "Login Test", status: "passed" },
  { id: 2, name: "Payment Test", status: "failed" },
  { id: 3, name: "Signup Test", status: "passed" }
];

// Sadece 'passed' durumundaki testleri filtrele
const passedTests = testResults.filter(test => test.status === "passed");
console.log("Başarılı Testler:", passedTests);

// Testlerin sadece isimlerini içeren yeni bir dizi oluştur (map)
const testNames = testResults.map(test => test.name);
console.log("Test İsimleri:", testNames);`,
          en: `// Try running array iteration methods!
const testResults = [
  { id: 1, name: "Login Test", status: "passed" },
  { id: 2, name: "Payment Test", status: "failed" },
  { id: 3, name: "Signup Test", status: "passed" }
];

// Filter out only the passed tests
const passedTests = testResults.filter(test => test.status === "passed");
console.log("Passed Tests:", passedTests);

// Map array to names only
const testNames = testResults.map(test => test.name);
console.log("Test Names:", testNames);`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Eldeki test sonuçları dizisinde sadece 'passed' durumunda olan testleri ayıklamak için hangi array metodu kullanılmalıdır?",
          en: "Which array method should be used to filter only 'passed' tests from a test results array?"
        },
        options: [
          { id: "a", text: "map()" },
          { id: "b", text: "filter()" },
          { id: "c", text: "reduce()" },
          { id: "d", text: "forEach()" }
        ],
        correct: "b",
        explanation: {
          tr: "`filter()` metodu, sağlanan koşulu geçen tüm öğelerle yeni bir dizi oluşturur. Otomasyonda başarılı testleri listelemek, boş değerleri temizlemek veya belirli elementleri ayıklamak için sıkça kullanılır.",
          en: "`filter()` creates a new array filled with elements that pass the test provided by the function. It is widely used in automation to list successful tests, clean empty values, or screen elements."
        },
        retryQuestion: {
          question: {
            tr: "`map()` metodunun temel amacı nedir?",
            en: "What is the primary purpose of the `map()` method?"
          },
          options: [
            { id: "a", text: { tr: "Diziden bazı elemanları silmek", en: "Deleting some elements from the array" } },
            { id: "b", text: { tr: "Her dizi elemanını dönüştürüp (transform) aynı uzunlukta yeni bir dizi oluşturmak", en: "Transforming every element to return a new array of the exact same length" } },
            { id: "c", text: { tr: "Diziyi ters çevirmek", en: "Reversing the array" } },
            { id: "d", text: { tr: "Diziyi tek bir değere indirgemek", en: "Reducing the array to a single value" } }
          ],
          correct: "b",
          explanation: {
            tr: "`map()` dizideki her eleman üzerinde bir fonksiyon çalıştırır ve bu fonksiyonun döndürdüğü sonuçlardan oluşan, orijinal diziyle aynı uzunlukta YENİ bir dizi üretir.",
            en: "`map()` runs a function on every element in the array and returns a NEW array of the exact same length, containing the returned results."
          }
        }
      },
      {
        type: "heading",
        content: { tr: "Genişletilmiş Array API — reduce, find, sort, flat ve diğerleri", en: "Extended Array API — reduce, find, sort, flat and more" }
      },
      {
        type: "table",
        headers: [
          { tr: "Metot", en: "Method" },
          { tr: "Dönüş Değeri", en: "Returns" },
          { tr: "QA Kullanımı", en: "QA Usage" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          ["reduce(fn, init)",   { tr: "Tek birikmiş değer", en: "Single accumulated value" },         { tr: "Toplam süre, hata sayısı", en: "Total duration, error count" },          "stream().reduce()"],
          ["find(fn)",           { tr: "İlk eşleşen eleman (undefined yoksa)", en: "First match (undefined if none)" },     { tr: "İlk başarısız test", en: "First failed test" },                   "stream().findFirst()"],
          ["findIndex(fn)",      { tr: "İlk eşleşmenin index'i (-1 yoksa)", en: "Index of first match (-1 if none)" },     { tr: "Listede element pozisyonu", en: "Element position in list" },    "IntStream.indexOf"],
          ["some(fn)",           { tr: "Boolean — en az biri eşleşirse true", en: "Boolean — true if at least one matches" }, { tr: "Herhangi başarısız test var mı?", en: "Any failed test?" },   "stream().anyMatch()"],
          ["every(fn)",          { tr: "Boolean — hepsi eşleşirse true", en: "Boolean — true if all match" },   { tr: "Tüm testler geçti mi?", en: "Did all tests pass?" },              "stream().allMatch()"],
          ["includes(val)",      { tr: "Boolean — değer var mı?", en: "Boolean — does value exist?" },         { tr: "Hata listesinde spesifik hata var mı?", en: "Is specific error in list?" }, "List.contains()"],
          ["sort(fn)",           { tr: "Orijinali yerinde sıralar", en: "Sorts in-place, mutates original" }, { tr: "Testleri süreye göre sırala", en: "Sort tests by duration" },         "Collections.sort()"],
          ["flat(depth)",        { tr: "İç içe diziyi düzleştirir", en: "Flattens nested array" },              { tr: "İç içe test gruplarını düzleştir", en: "Flatten nested test groups" }, "stream().flatMap()"],
          ["flatMap(fn)",        { tr: "map + flat(1) birleşimi", en: "map + flat(1) combined" },              { tr: "Her testten sub-step dizileri üret", en: "Produce sub-step arrays per test" }, "stream().flatMap()"],
          ["forEach(fn)",        { tr: "undefined (side-effect için)", en: "undefined (for side effects)" }, { tr: "Her test için log yaz", en: "Write log for each test" },           "forEach / for-each loop"]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "reduce, find, some, every, sort — QA Örnekleri", en: "reduce, find, some, every, sort — QA Examples" },
        content: {
          tr: `const tests = [
  { name: 'Login',   status: 'passed',  durationMs: 1200 },
  { name: 'Payment', status: 'failed',  durationMs: 3400 },
  { name: 'Signup',  status: 'passed',  durationMs: 900  },
  { name: 'Logout',  status: 'passed',  durationMs: 400  },
];

// ─── reduce(): Toplam süreyi hesapla ─────────────────────────
// Java: stream().mapToInt(t -> t.durationMs).sum()
const totalMs = tests.reduce((acc, t) => acc + t.durationMs, 0);
console.log('Toplam süre:', totalMs + 'ms');   // 5900ms

// ─── find(): İlk başarısız testi bul ─────────────────────────
// Java: stream().filter(t -> t.status.equals("failed")).findFirst()
const firstFail = tests.find(t => t.status === 'failed');
console.log('İlk hata:', firstFail?.name);     // 'Payment'

// ─── some(): Herhangi başarısız test var mı? ─────────────────
// Java: stream().anyMatch(t -> "failed".equals(t.status))
const hasFailed = tests.some(t => t.status === 'failed');
console.log('Başarısız var mı?', hasFailed);   // true

// ─── every(): Hepsi geçti mi? ────────────────────────────────
// Java: stream().allMatch(t -> "passed".equals(t.status))
const allPassed = tests.every(t => t.status === 'passed');
console.log('Hepsi geçti mi?', allPassed);     // false

// ─── sort(): Süreye göre sırala (orijinali değiştirir!) ──────
// Java: Collections.sort(tests, Comparator.comparingInt(t -> t.durationMs))
const sorted = [...tests].sort((a, b) => a.durationMs - b.durationMs);
console.log('En hızlı:', sorted[0].name);      // 'Logout' (400ms)

// ─── flat(): İç içe dizileri düzleştir ───────────────────────
const nested = [['TC-001', 'TC-002'], ['TC-003'], ['TC-004', 'TC-005']];
console.log('Düz liste:', nested.flat());      // ['TC-001','TC-002','TC-003','TC-004','TC-005']`,
          en: `const tests = [
  { name: 'Login',   status: 'passed',  durationMs: 1200 },
  { name: 'Payment', status: 'failed',  durationMs: 3400 },
  { name: 'Signup',  status: 'passed',  durationMs: 900  },
  { name: 'Logout',  status: 'passed',  durationMs: 400  },
];

// ─── reduce(): Sum total duration ────────────────────────────
// Java: stream().mapToInt(t -> t.durationMs).sum()
const totalMs = tests.reduce((acc, t) => acc + t.durationMs, 0);
console.log('Total time:', totalMs + 'ms');    // 5900ms

// ─── find(): Get first failed test ───────────────────────────
// Java: stream().filter(t -> t.status.equals("failed")).findFirst()
const firstFail = tests.find(t => t.status === 'failed');
console.log('First failure:', firstFail?.name); // 'Payment'

// ─── some(): Any test failed? ────────────────────────────────
// Java: stream().anyMatch(t -> "failed".equals(t.status))
const hasFailed = tests.some(t => t.status === 'failed');
console.log('Any failure?', hasFailed);        // true

// ─── every(): Did all pass? ──────────────────────────────────
// Java: stream().allMatch(t -> "passed".equals(t.status))
const allPassed = tests.every(t => t.status === 'passed');
console.log('All passed?', allPassed);         // false

// ─── sort(): Sort by duration (mutates copy!) ────────────────
// Java: Collections.sort(tests, Comparator.comparingInt(t -> t.durationMs))
const sorted = [...tests].sort((a, b) => a.durationMs - b.durationMs);
console.log('Fastest test:', sorted[0].name);  // 'Logout' (400ms)

// ─── flat(): Flatten nested arrays ───────────────────────────
const nested = [['TC-001', 'TC-002'], ['TC-003'], ['TC-004', 'TC-005']];
console.log('Flat list:', nested.flat());      // ['TC-001','TC-002','TC-003','TC-004','TC-005']`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir test dizisinde en az bir testin 'failed' durumunda olup olmadığını kontrol etmek için hangi metod kullanılır?",
          en: "Which array method checks if at least one test in the array has a 'failed' status?"
        },
        options: [
          { id: "a", text: "tests.includes('failed')" },
          { id: "b", text: "tests.some(t => t.status === 'failed')" },
          { id: "c", text: "tests.find(t => t.status === 'failed')" },
          { id: "d", text: "tests.every(t => t.status === 'failed')" }
        ],
        correct: "b",
        explanation: {
          tr: "`some()` metodu, dizideki en az bir elemanın verilen koşulu sağlayıp sağlamadığını `true/false` olarak döner. Java'da `stream().anyMatch()` karşılığıdır. `find()` ise eleman döndürür, boolean değil. `every()` ise tüm elemanların koşulu sağlamasını kontrol eder.",
          en: "`some()` returns `true` if at least one array element satisfies the callback condition. Java equivalent: `stream().anyMatch()`. `find()` returns the element itself (not a boolean). `every()` checks if ALL elements satisfy the condition."
        },
        retryQuestion: {
          question: {
            tr: "Tüm testlerin sürelerini toplayarak toplam süreyi hesaplamak için hangi metod kullanılır?",
            en: "Which array method would you use to sum all test durations into a total?"
          },
          options: [
            { id: "a", text: "tests.sum(t => t.durationMs)" },
            { id: "b", text: "tests.total(t => t.durationMs)" },
            { id: "c", text: "tests.reduce((acc, t) => acc + t.durationMs, 0)" },
            { id: "d", text: "tests.map(t => t.durationMs).join('+')" }
          ],
          correct: "c",
          explanation: {
            tr: "`reduce()` bir diziyi tek bir değere indirger. Biriktirici (accumulator) ve başlangıç değeri ile çalışır: `reduce((acc, curr) => acc + curr.durationMs, 0)`. Java'daki `stream().mapToInt().sum()` veya `stream().reduce(0, Integer::sum)` ile aynı mantıktır.",
            en: "`reduce()` collapses an array into a single value. It works with an accumulator and initial value: `reduce((acc, curr) => acc + curr.durationMs, 0)`. This is identical in concept to Java's `stream().mapToInt().sum()` or `stream().reduce(0, Integer::sum)`."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`map()`, `filter()` ve `reduce()` üçlüsü, bir montaj hattındaki üç farklı istasyona benzer: `map()` her ürünü dönüştüren boyama istasyonu, `filter()` kalite kontrol — kusurluları geri gönderir, `reduce()` tüm ürünleri tek bir nihai üründe birleştiren paketleme istasyonu.",
          en: "The `map()`, `filter()`, `reduce()` trio resembles three stations on an assembly line: `map()` is the painting station that transforms each item, `filter()` is quality control — rejecting defective items, `reduce()` is the packaging station that combines everything into one final product."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Bir dizi (array), birbirine kilitli LEGO parçalarından oluşan bir şerit gibidir. `map()` şeritteki her parçayı farklı renge boyar, `filter()` sadece kırmızı parçaları ayırır, `forEach()` her parçayı tek tek inceler ama şeridi değiştirmez.",
          en: "An array is like a strip of connected LEGO pieces. `map()` paints each piece a different color, `filter()` separates only the red ones, `forEach()` inspects each piece one by one without changing the strip at all."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`spread operator` (`...`) ve `Array.from()`, LEGO parçalarını bir kutudan başka bir kutuya kopyalamak gibidir. `[...arr1, ...arr2]` iki kutuyu tek yeni kutuda birleştirmek; `Array.from(set)` ise benzersiz parçaları yeni bir kutuya kopyalamaktır.",
          en: "The `spread operator` (`...`) and `Array.from()` are like copying LEGO pieces from one box to another. `[...arr1, ...arr2]` merges two boxes into one new box; `Array.from(set)` copies unique pieces into a brand-new box."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `forEach()` yerine `map()` tercih edilir? `forEach()` sadece yan etki (side effect) için kullanılır — her elemana bir şey yapar ama yeni dizi döndürmez. `map()` her elemanı dönüştürüp yeni bir dizi döndürür. Fonksiyonel programlamada orijinal diziyi değiştirmeden yeni veri üretmek tercih edilir — bu `map()`'i test süitlerinde güvenli yapar.",
          en: "Why prefer `map()` over `forEach()`? `forEach()` is for side effects only — it does something to each element but returns nothing. `map()` transforms each element and returns a new array. Functional programming prefers producing new data without mutating the original — making `map()` safe for test suites where shared state is dangerous."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `find()` ile `filter()` ayrı metodlar? `find()` ilk eşleşen elemanı döndürür ve durur — büyük dizilerde büyük performans avantajı sağlar. `filter()` tüm diziyi tarar ve eşleşen tüm elemanları döndürür. Test otomasyonunda tekil element ararken `find()`, birden fazla eşleşme ararken `filter()` kullanılır.",
          en: "Why are `find()` and `filter()` separate methods? `find()` returns the first match and stops immediately — huge performance gain on large arrays. `filter()` scans the entire array and returns all matches. In test automation: use `find()` when looking for one unique element, `filter()` when expecting multiple matches."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain map() and filter() to someone with zero programming knowledge using a fruit basket or another everyday analogy. Why prefer them over forEach()?",
        promptTr: "🤖 Mini Kahraman Soruyor: map() ve filter() metodlarını sıfır programlama bilgisi olan birine meyve sepeti ya da başka bir günlük hayat benzetmesiyle anlat. Neden forEach() yerine bunları tercih ederiz?",
        keywords: [
              ["dizi", "array"],
              ["filtrele", "filter"],
              ["dönüştür", "transform"],
              ["seç", "select"],
              ["yeni", "new"],
              ["orijinal", "original"],
              ["süzgeç", "sieve"],
              ["elek", "fruit"],
              ["meyve", "list"],
              ["liste", "keeps"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 6 — Conditions & Loops
  // ─────────────────────────────────────────────
  {
    title: { tr: "Karar Yapıları & Döngüler", en: "Conditions & Loops" },
    blocks: [
      {
        type: "css-animation",
        kind: "loops",
        label: { tr: "for Döngüsü — i Sayacı Adım Adım Artar", en: "for Loop — Counter i Increments Step by Step" }
      },
      {
        type: "simple-box",
        emoji: "🔁",
        content: {
          tr: "Karar yapıları (if/else, switch) ve döngüler (for, while, for...of, for...in) otomasyon kodlarının akış kontrolüdür. 'Eğer buton görünürse tıkla, görünmezse hata fırlat' demek için `if` bloklarını; 'Tablodaki tüm satırları sırayla oku' demek için `for...of` döngülerini kullanırız. Java'daki yapılarla neredeyse birebir aynı sözdizimi kullanılır.",
          en: "Conditionals (if/else, switch) and loops (for, while, for...of, for...in) are the steering wheels of automation flows. Use `if` blocks to handle conditional checks ('If button is visible, click it') and `for...of` loops to scrape all table rows. Syntax is nearly identical to Java."
        }
      },
      {
        type: "heading",
        content: { tr: "if / else if / else & Ternary Operatör", en: "if / else if / else & Ternary Operator" }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Koşul Yapıları Karşılaştırması", en: "Conditional Structures" },
        content: {
          tr: `// ─── if / else if / else ─────────────────────────────────────
let score = 75;

if (score >= 90) {
  console.log("✅ Üst Düzey");
} else if (score >= 60) {
  console.log("⚠️  Orta Düzey");   // Bu çalışır
} else {
  console.log("❌ Başarısız");
}

// ─── Ternary Operatör ─────────────────────────────────────────
// Kısa if/else — Java ile birebir aynı sözdizimi
let status = score >= 60 ? "passed" : "failed";
console.log("Test Durumu:", status); // "passed"

// ─── switch / case ────────────────────────────────────────────
let browser = "chromium";

switch (browser) {
  case "chromium":
    console.log("Chrome Driver yükleniyor...");
    break;          // break yoksa bir sonraki case'e düşer (fall-through)!
  case "firefox":
    console.log("Firefox Driver yükleniyor...");
    break;
  case "webkit":
    console.log("Safari Driver yükleniyor...");
    break;
  default:
    console.log("Bilinmeyen tarayıcı!");
}`,
          en: `// ─── if / else if / else ─────────────────────────────────────
let score = 75;

if (score >= 90) {
  console.log("✅ Advanced");
} else if (score >= 60) {
  console.log("⚠️  Intermediate");  // this branch runs
} else {
  console.log("❌ Failed");
}

// ─── Ternary Operator ─────────────────────────────────────────
// Short if/else — identical syntax to Java
let status = score >= 60 ? "passed" : "failed";
console.log("Test Status:", status); // "passed"

// ─── switch / case ────────────────────────────────────────────
let browser = "chromium";

switch (browser) {
  case "chromium":
    console.log("Loading Chrome Driver...");
    break;          // without break, falls through to next case!
  case "firefox":
    console.log("Loading Firefox Driver...");
    break;
  case "webkit":
    console.log("Loading Safari Driver...");
    break;
  default:
    console.log("Unknown browser!");
}`
        }
      },
      {
        type: "heading",
        content: { tr: "Tüm Döngü Türleri — Karşılaştırma", en: "All Loop Types — Side-by-Side" }
      },
      {
        type: "table",
        headers: [
          { tr: "Döngü", en: "Loop" },
          { tr: "Ne Zaman Kullanılır?", en: "When to Use?" },
          { tr: "Java Karşılığı", en: "Java Equivalent" },
          { tr: "Otomasyon Örneği", en: "Automation Example" }
        ],
        rows: [
          [
            "for (klasik)",
            { tr: "Index'e ihtiyaç varsa, sayaçlı tekrar", en: "When index is needed, counted iterations" },
            "for (int i=0; i<n; i++)",
            { tr: "Sayfa numaralarını gezme", en: "Iterating through page numbers" }
          ],
          [
            "for...of",
            { tr: "Array/iterable değerlerinde dolaşmak için", en: "Iterating values of array/iterable" },
            "for (String item : list)",
            { tr: "Tüm test satırlarını oku", en: "Read all table rows" }
          ],
          [
            "for...in",
            { tr: "Nesne özellik adlarını (key) dolaşmak için", en: "Iterating object property keys" },
            "map.entrySet().forEach()",
            { tr: "Response body field'larını denetle", en: "Validate API response body fields" }
          ],
          [
            "while",
            { tr: "Koşul doğru olduğu sürece tekrar", en: "Repeat while condition is true" },
            "while (cond) {}",
            { tr: "Element görünene kadar bekle", en: "Poll until element appears" }
          ],
          [
            "do...while",
            { tr: "En az 1 kez çalışması garantili", en: "Guaranteed at least 1 execution" },
            "do {} while (cond)",
            { tr: "İlk login denemesini her zaman yap", en: "Always attempt first login" }
          ]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "for...of ve for...in — Otomasyon Kullanımı", en: "for...of and for...in — Automation Usage" },
        content: {
          tr: `const testResults = [
  { id: 1, name: "Login Test",   status: "passed" },
  { id: 2, name: "Payment Test", status: "failed" },
  { id: 3, name: "Signup Test",  status: "passed" }
];

// for...of — Array değerleri üzerinde dön (Java'daki enhanced for gibi)
for (const test of testResults) {
  const icon = test.status === "passed" ? "✅" : "❌";
  console.log(\`\${icon} \${test.name}\`);
}

// for...in — Nesne key'leri üzerinde dön
const apiResponse = { statusCode: 200, message: "OK", data: [] };
for (const key in apiResponse) {
  console.log(\`\${key}: \${apiResponse[key]}\`);
}

// while — Polling (element görünene kadar bekle simülasyonu)
let retryCount = 0;
while (retryCount < 3) {
  console.log(\`Deneme \${retryCount + 1}: Element aranıyor...\`);
  retryCount++;
}`,
          en: `const testResults = [
  { id: 1, name: "Login Test",   status: "passed" },
  { id: 2, name: "Payment Test", status: "failed" },
  { id: 3, name: "Signup Test",  status: "passed" }
];

// for...of — iterate over array values (like Java's enhanced for)
for (const test of testResults) {
  const icon = test.status === "passed" ? "✅" : "❌";
  console.log(\`\${icon} \${test.name}\`);
}

// for...in — iterate over object keys
const apiResponse = { statusCode: 200, message: "OK", data: [] };
for (const key in apiResponse) {
  console.log(\`\${key}: \${apiResponse[key]}\`);
}

// while — Polling (simulate waiting until element appears)
let retryCount = 0;
while (retryCount < 3) {
  console.log(\`Attempt \${retryCount + 1}: Searching for element...\`);
  retryCount++;
}`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Koşullar ve döngülerin çalışma şekli!
let isElementFound = true;

if (isElementFound) {
  console.log("Element Bulundu: İşlem başlatılıyor.");
} else {
  console.log("Element Bulunamadı: Test fail ediliyor.");
}

// for...of döngüsü ile test sonuçlarını filtrele
const tests = ["passed","failed","passed","passed"];
let failCount = 0;
for (const result of tests) {
  if (result === "failed") failCount++;
}
console.log("Toplam Fail:", failCount, "/ Toplam:", tests.length);`,
          en: `// Run conditions and loop blocks!
let isElementFound = true;

if (isElementFound) {
  console.log("Element Found: Starting action.");
} else {
  console.log("Element Missing: Failing test.");
}

// for...of loop to count failed tests
const tests = ["passed","failed","passed","passed"];
let failCount = 0;
for (const result of tests) {
  if (result === "failed") failCount++;
}
console.log("Total Fails:", failCount, "/ Total:", tests.length);`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te bir dizinin (array) elemanları üzerinde doğrudan indeks bilgisi olmadan değer bazlı döngü kurmak için hangi for varyantı kullanılır?",
          en: "Which for loop variant is used to iterate through array values directly without manual index numbers?"
        },
        options: [
          { id: "a", text: "for...in" },
          { id: "b", text: "for...of" },
          { id: "c", text: "while" },
          { id: "d", text: "do...while" }
        ],
        correct: "b",
        explanation: {
          tr: "`for...of` döngüsü dizilerin (veya iterable olan yapıların) değerleri üzerinde doğrudan dönmemizi sağlar. Java'daki enhanced for (`for (String s : list)`) yapısının karşılığıdır. `for...in` ise nesne özellik adları (keys) üzerinde döner.",
          en: "`for...of` iterates through values of iterable structures like arrays — the JavaScript equivalent of Java's enhanced for-each loop (`for (String s : list)`). `for...in` iterates through object property keys/indexes instead."
        },
        retryQuestion: {
          question: {
            tr: "switch/case yapısında `break` ifadesi yazılmazsa ne olur?",
            en: "What happens in a switch/case block if the `break` statement is omitted?"
          },
          options: [
            { id: "a", text: { tr: "SyntaxError fırlatılır", en: "A SyntaxError is thrown" } },
            { id: "b", text: { tr: "Kod durur ve hiçbir şey çalışmaz", en: "The code stops and nothing executes" } },
            { id: "c", text: { tr: "Fall-through: eşleşen case'den sonraki tüm case'ler de çalışır", en: "Fall-through: all cases after the matching one also execute" } },
            { id: "d", text: { tr: "Sadece default bloğu çalışır", en: "Only the default block runs" } }
          ],
          correct: "c",
          explanation: {
            tr: "`break` yazılmadan bırakılan case'lerde 'fall-through' davranışı oluşur: eşleşen case'den sonraki tüm case blokları sırayla çalışır (koşul kontrolü yapılmadan). Bu davranış Java'da da aynıdır ve kasıtlı kullanılmadığı sürece bir bug kaynağıdır.",
            en: "Without `break`, 'fall-through' occurs: every case after the matching one runs sequentially without checking conditions. This behavior is identical in Java and is a common source of bugs unless intentionally used."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir API yanıtı nesnesinin (object) tüm alanlarını (key/value çiftleri) listelemek için hangi döngü kullanılmalıdır?",
          en: "Which loop is best suited for listing all fields (key/value pairs) of an API response object?"
        },
        options: [
          { id: "a", text: "for...of" },
          { id: "b", text: "while" },
          { id: "c", text: "for...in" },
          { id: "d", text: "do...while" }
        ],
        correct: "c",
        explanation: {
          tr: "`for...in` döngüsü, bir nesnenin enumerable (sayılabilir) özellik adları (key'leri) üzerinde döner. API yanıt kontrolünde (`{ statusCode: 200, message: 'OK' }` gibi nesnelerde) tüm field'ları listelemek için kullanılır. `for...of` ise dizi (array) değerleri üzerinde çalışır, nesneler üzerinde çalışmaz.",
          en: "`for...in` iterates through the enumerable property keys of an object. It is the right tool for checking all fields of an API response object like `{ statusCode: 200, message: 'OK' }`. `for...of` works on array values, not plain objects."
        },
        retryQuestion: {
          question: {
            tr: "Gövdenin (body) en az bir kez mutlaka çalışmasını garanti eden döngü hangisidir?",
            en: "Which loop guarantees its body executes at least once regardless of the condition?"
          },
          options: [
            { id: "a", text: "for" },
            { id: "b", text: "while" },
            { id: "c", text: "for...of" },
            { id: "d", text: "do...while" }
          ],
          correct: "d",
          explanation: {
            tr: "`do...while` döngüsünde gövde önce çalışır, koşul sonra kontrol edilir. Bu sayede koşul başlangıçta yanlış olsa bile döngü gövdesi en az 1 kez çalışır. Java'da da aynı yapı vardır.",
            en: "In `do...while`, the body executes first and the condition is checked afterward. This guarantees at least one execution even if the condition is false from the start — identical behavior to Java's `do...while`."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`for...of`, bir müzik listesindeki her şarkıyı sırayla çalmak gibidir: listede kaç şarkı olduğunu bilmene gerek yoktur, sadece sıradaki şarkıya geç. `for...in` ise şarkı listesinin numaralarını (index'leri) verir, şarkının kendisini değil — çoğu zaman istediğin bu değildir.",
          en: "`for...of` is like playing every song in a playlist one by one: you don't need to know how many songs exist, you just move to the next. `for...in` gives you the index numbers of the list, not the songs themselves — usually that's not what you want."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`while` döngüsü, bir LEGO inşaatında tüm parçalar bitene kadar çalışmaya devam etmek gibidir: kaç adım atacağını bilmezsin, sadece parça kalmadığında durursun. `for` ise sabit 10 parça koyacağını önceden bildiğin durum — adım sayısı bellidir.",
          en: "A `while` loop is like building a LEGO structure — you keep going until all pieces are used: you don't know how many steps you'll take, you only stop when no pieces remain. `for` is when you know in advance you'll place exactly 10 pieces — the step count is predetermined."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`break` ve `continue` komutları, LEGO montaj hattındaki acil durdurma düğmesi ve atlama geçişidir: `break` bandı tamamen durdurur (işi bitirir), `continue` mevcut parçayı atlar ve bir sonrakine geçer ama bant dönmeye devam eder.",
          en: "`break` and `continue` are the emergency stop button and skip gate on a LEGO assembly line: `break` stops the entire belt (ends the loop), `continue` skips the current piece and moves to the next — the belt keeps running."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `for...of` kullanılırken `for...in` kullanılmaz? `for...in`, bir nesnenin veya dizinin tüm numaralandırılabilir (enumerable) özelliklerini döndürür — prototype zincirinden gelen kalıtsal özellikleri de dahil eder. Bu, dizilerde beklenmedik sonuçlar yaratır. `for...of` yalnızca gerçek değerleri döndürür, prototip kirliliği yoktur.",
          en: "Why use `for...of` instead of `for...in`? `for...in` iterates all enumerable properties including inherited ones from the prototype chain — causing unexpected results on arrays. `for...of` only iterates actual values with zero prototype pollution. Always prefer `for...of` for arrays and iterables."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden bazı durumlarda döngü yerine rekürsiyon (özyineleme) kullanılır? Döngüler düz listelerde verimlidir. Ancak ağaç yapısındaki DOM veya dosya sistemi gibi bilinmeyen derinlikteki yapılarda rekürsiyon daha doğaldır — her düğümü kendi alt ağacıyla aynı işlemle işler. Test otomasyonunda DOM'u traverse ederken rekürsiyon sıklıkla görülür.",
          en: "Why use recursion instead of loops in some cases? Loops excel at flat lists. But for tree-structured data like the DOM or file systems where depth is unknown, recursion is more natural — each node processes itself and its children with the same operation. In test automation, recursion appears when traversing the DOM tree."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: How do you use if/else and for...of in a real test scenario? Which structures would you choose when scanning a table of test results, and why? No jargon!",
        promptTr: "🤖 Mini Kahraman Soruyor: if/else ve for...of döngüsünü gerçek bir test senaryosunda nasıl kullanırsın? Bir tablodaki test sonuçlarını tararken hangi yapıları seçersin ve neden? Jargonsuz anlat!",
        keywords: [
              ["koşul", "condition"],
              ["döngü", "loop"],
              ["her", "each"],
              ["sıra", "row"],
              ["karar", "decision"],
              ["eğer", "if"],
              ["kontrol", "check"],
              "for",
              "while",
              ["tara", "scan"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 7 — Event Loop & Asynchronous JS
  // ─────────────────────────────────────────────
  {
    title: { tr: "Event Loop & Asenkron Yapı", en: "Event Loop & Asynchronous JS" },
    blocks: [
      {
        type: "simple-box",
        emoji: "🎡",
        content: {
          tr: "Burası tam bir eğlence parkı! JavaScript tek iş parçacıklı (single-threaded) bir dildir; yani dondurmacıda tek bir görevli vardır. 'Call Stack' dondurma sırasıdır. 'Web APIs' çocukların arka bahçede oyuncaklarla oynamasıdır. 'Callback Queue' ise süresi biten çocukların dondurma kuyruğuna (Call Stack) girmek için sıraya geçtiği yerdir.",
          en: "This is a true amusement park! JavaScript is single-threaded, meaning there's only one ice cream server. The 'Call Stack' is the Ice Cream Queue. 'Web APIs' are kids playing with toys in the backyard. The 'Callback Queue' is where kids wait in line to slide back into the Call Stack when they are done playing."
        }
      },
      {
        type: "js-eventloop-visual"
      },
      {
        type: "heading",
        content: { tr: "Event Loop Mekanizması", en: "How the Event Loop Works" }
      },
      {
        type: "steps",
        items: [
          {
            label: { tr: "Call Stack (Çalışma Kuyruğu)", en: "Call Stack" },
            desc: { tr: "O an çalışan senkron kod satırlarının üst üste eklendiği stack. JavaScript tek iş parçacıklı olduğundan stack'te tek seferde tek bir işlem yürütülür.", en: "The stack where synchronous code execution happens. Since JS is single-threaded, only one action runs at a time here." }
          },
          {
            label: { tr: "Web API (Arka Plan Görevleri)", en: "Web APIs" },
            desc: { tr: "Tarayıcının sunduğu `setTimeout`, network istekleri (`fetch`) ve DOM eventleri gibi asenkron ve zaman alan işlerin yönetildiği alan.", en: "Where asynchronous and time-consuming tasks like `setTimeout`, network requests (`fetch`), and DOM events are managed by the browser environment." }
          },
          {
            label: { tr: "Callback Queue (Sıra Bekleyenler)", en: "Callback Queue" },
            desc: { tr: "Web API'de süresi dolan veya işlemi biten asenkron fonksiyonların (callback) Call Stack'e girmeyi beklediği bekleme salonu.", en: "The waiting room where asynchronous callbacks wait to enter the Call Stack once their timers or tasks finish." }
          },
          {
            label: { tr: "Event Loop (Bekçi/Döngü)", en: "Event Loop" },
            desc: { tr: "Call Stack tamamen boşaldığı an devreye girer. Callback Queue'da sırası gelen ilk fonksiyonu (microtask öncelikli olacak şekilde) alır ve Call Stack'e fırlatır.", en: "Wakes up the moment the Call Stack is empty. It grabs the first callback waiting in the queue and pushes it back into the Call Stack." }
          }
        ]
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Asenkron çalışma sırasını canlı izleyin!
console.log("1. Stack Başladı");

setTimeout(() => {
  console.log("2. Zamanlayıcı Tetiklendi (Web API -> Queue)");
}, 500);

console.log("3. Stack Bitti");`,
          en: `// Run this snippet and watch the async print order!
console.log("1. Stack Start");

setTimeout(() => {
  console.log("2. Timer Triggered (Web API -> Queue)");
}, 500);

console.log("3. Stack End");`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir `setTimeout(() => console.log('B'), 0); console.log('A');` kodu çalıştırılırsa konsolda hangi sıra görünür?",
          en: "What sequence is printed in the console for `setTimeout(() => console.log('B'), 0); console.log('A');`?"
        },
        options: [
          { id: "a", text: "B, A" },
          { id: "b", text: "A, B" },
          { id: "c", text: { tr: "Aynı anda basılırlar", en: "Printed simultaneously" } },
          { id: "d", text: { tr: "Sadece B basılır", en: "Only B is printed" } }
        ],
        correct: "b",
        explanation: {
          tr: "`setTimeout` 0 ms bile olsa asenkron bir Web API görevidir. Callback kuyruğuna alınır. Call Stack'teki senkron `console.log('A')` çalışır. Stack boşaldığında Event Loop callback'i ('B') stack'e yükler. Bu yüzden çıktı hep 'A, B' olur.",
          en: "`setTimeout` is an asynchronous Web API task, even with a 0ms delay. It is pushed to the callback queue. The synchronous `console.log('A')` runs first in the Call Stack. Once empty, the Event Loop pushes the callback ('B') into the stack, producing 'A, B'."
        },
        retryQuestion: {
          question: {
            tr: "Event Loop ne zaman Callback Queue'daki bir görevi Call Stack'e taşır?",
            en: "When does the Event Loop move a task from the Callback Queue to the Call Stack?"
          },
          options: [
            { id: "a", text: { tr: "İstediği her an taşıyabilir", en: "Anytime it wants to" } },
            { id: "b", text: { tr: "Yalnızca Call Stack tamamen boşaldığı zaman", en: "Only when the Call Stack is completely empty" } },
            { id: "c", text: { tr: "Tarayıcı kapatıldığı zaman", en: "Only when the browser is closed" } },
            { id: "d", text: { tr: "Farklı bir thread oluştuğunda", en: "When a new thread is spawned" } }
          ],
          correct: "b",
          explanation: {
            tr: "JavaScript'in 'Run-to-completion' kuralı vardır. Call Stack'te yürütülmekte olan senkron kod bitip stack tamamen sıfırlanmadan Event Loop hiçbir callback'i içeri almaz.",
            en: "JavaScript follows a 'Run-to-completion' rule. The Event Loop will never push any callback into the Call Stack until all synchronous code in the stack completes and the stack is completely empty."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "Event Loop, bir çağrı merkezi operatörü gibidir: tek bir operatör (tek iş parçacığı) vardır, müşteri aramalarını (callback'leri) sırayla karşılar. Uzun süren bir işlem (ağ isteği) sırada bekletilir, operatör boşaldığında geri dönülür. Birden fazla operatör değil — sadece tek, disiplinli bir operatör.",
          en: "The Event Loop is like a single call center operator: there's just one agent (single thread), answering calls (callbacks) one at a time. Long operations (network requests) wait in queue; the agent gets back to them when free. Not multiple agents — one disciplined, single agent."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Event Loop'u bir LEGO oyuncağı fabrikasındaki tek çalışan olarak düşün: Call Stack onun tezgahı (şu an işlediği ürün), Callback Queue bekleme bandı (sıradaki ürünler), Web APIs ise dışarıdaki kuryeler — sipariş verirsin, kurye getirir, çalışan tezgahı boş olduğunda alır.",
          en: "Think of the Event Loop as a single worker in a LEGO toy factory: the Call Stack is their workbench (current item), the Callback Queue is the waiting conveyor (next items), Web APIs are external couriers — you place an order, the courier delivers, and the worker picks it up when the bench is free."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Microtask Queue (Promise'lar için) ve Macrotask Queue (setTimeout için) iki farklı LEGO parça bandıdır. Çalışan her zaman önce Microtask bandını tamamen bitirir, sonra Macrotask bandından bir iş alır. Bu yüzden `Promise.resolve().then()` her zaman `setTimeout(fn, 0)`'dan önce çalışır.",
          en: "The Microtask Queue (for Promises) and Macrotask Queue (for setTimeout) are two separate LEGO conveyor belts. The worker always empties the Microtask belt completely before picking from the Macrotask belt. That's why `Promise.resolve().then()` always runs before `setTimeout(fn, 0)`."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript tek iş parçacıklı (single-threaded)? Tarayıcıların aynı anda birden fazla iş parçacığının DOM'a yazmasına izin vermesi, yarış koşulları (race conditions) ve çöp (deadlocks) yaratır. Tek iş parçacığı bu karmaşıklığı ortadan kaldırır. Ağır işler için Web Workers kullanılır — ama DOM'a dokunamazlar.",
          en: "Why is JavaScript single-threaded? Allowing multiple threads to write to the DOM simultaneously would create race conditions and deadlocks. Single thread eliminates that complexity entirely. Heavy computation goes in Web Workers — but they cannot touch the DOM."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `setTimeout(fn, 0)` anında çalışmıyor? Çünkü `setTimeout` callback'i Macrotask Queue'ya koyar. Mevcut Call Stack ve tüm Microtask'lar tamamlanmadan Macrotask Queue'dan iş alınmaz. `setTimeout(fn, 0)` \"en kısa sürede, ama mevcut işler bitince\" demektir — sıfır milisaniye değil.",
          en: "Why doesn't `setTimeout(fn, 0)` run immediately? Because `setTimeout` puts the callback in the Macrotask Queue. Nothing from the Macrotask Queue runs until the current Call Stack and ALL microtasks are finished. `setTimeout(fn, 0)` means \"as soon as possible, but after current work\" — not zero milliseconds literally."
        }
      },
      {
        type: "quiz",
        question: { tr: "Aşağıdaki çıktı sırası nedir?\n```js\nconsole.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");\n```", en: "What is the output order?\n```js\nconsole.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");\n```" },
        options: [
          { id: "a", text: { tr: "A, B, C, D", en: "A, B, C, D" } },
          { id: "b", text: { tr: "A, D, C, B", en: "A, D, C, B" } },
          { id: "c", text: { tr: "A, D, B, C", en: "A, D, B, C" } },
          { id: "d", text: { tr: "A, C, D, B", en: "A, C, D, B" } }
        ],
        correct: "b",
        explanation: { tr: "Senkron kodlar önce: A ve D. Sonra Microtask Queue (Promise): C. En son Macrotask Queue (setTimeout): B. Sıra: A → D → C → B.", en: "Synchronous code runs first: A and D. Then Microtask Queue (Promise callbacks): C. Finally Macrotask Queue (setTimeout): B. Order: A → D → C → B." },
        retryQuestion: {
          question: { tr: "Call Stack nedir?", en: "What is the Call Stack?" },
          options: [
            { id: "a", text: { tr: "Asenkron görevlerin beklediği yer", en: "Where async tasks wait" } },
            { id: "b", text: { tr: "JavaScript'in şu anda yürüttüğü fonksiyonların listesi", en: "The list of functions JS is currently executing" } },
            { id: "c", text: { tr: "setTimeout'ları tutan yapı", en: "The structure holding setTimeouts" } },
            { id: "d", text: { tr: "DOM element listesi", en: "List of DOM elements" } }
          ],
          correct: "b",
          explanation: { tr: "Call Stack, JavaScript motoru'nun şu anda yürütmekte olduğu fonksiyonların LIFO (Last In First Out) sırasıyla tutulduğu yapıdır.", en: "The Call Stack is a LIFO (Last In First Out) structure tracking which functions the JavaScript engine is currently executing." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Why is JavaScript single-threaded and how does it still handle tasks? Explain the Event Loop to a 5-year-old using an ice cream queue or another analogy.",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript neden tek iş parçacıklıdır ve bu nasıl çalışır? Event Loop'u 5 yaşındaki bir çocuğa dondurma kuyruğu veya başka bir benzetmeyle anlat.",
        keywords: [
              ["sıra", "queue"],
              ["kuyruk", "single"],
              ["tek", "wait"],
              ["bekle", "empty"],
              ["boşaldı", "ice"],
              ["dondurmacı", "back"],
              ["geri", "stack"],
              ["stack", "async"],
              ["asenkron", "order"],
              ["sıralı", "one"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 8 — Promises & Closures
  // ─────────────────────────────────────────────
  {
    title: { tr: "Promises & Closures", en: "Promises & Closures" },
    blocks: [
      {
        type: "css-animation",
        kind: "promises",
        label: { tr: "Promise Akışı — pending → fulfilled/rejected", en: "Promise Flow — pending → fulfilled/rejected" }
      },
      {
        type: "simple-box",
        emoji: "🧬",
        content: {
          tr: "Bir 'Promise (Söz vermek)', dondurmacının dondurma bittiğinde bize verdiği o 'hazır olunca öten disk' gibidir. Bize 'bekle, hazır olunca (resolved) öteceğim' sözünü verir. 'Closure' ise bir çocuğun oyun parkından ayrılırken en sevdiği oyuncağı sırt çantasına atıp eve götürmesi ve o oyuncağı dışarıdan kimse göremese de evde oynayabilmesi gibidir.",
          en: "A 'Promise' is like the pager that rings when your food is ready. It promises to buzz either when successful (resolved) or failed (rejected). A 'Closure' is like a kid putting their favorite toy in a backpack before leaving the park, keeping it inside their private space where nobody else can access it directly."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Promise & Closure Örnekleri", en: "Promise & Closure Examples" },
        content: {
          tr: `// 1. Bir Promise Tanımlama (Dondurma Sözü)
const iceCreamPromise = new Promise((resolve, reject) => {
  const isReady = true;
  if (isReady) resolve('🍦 Dondurma Hazır!');
  else reject('😢 Dondurma Kalmadı.');
});

// 2. Closure Örneği (Sırt Çantası / Private Değişken)
function createBackpack() {
  let toy = '🧸 Ayıcık'; // Dışarıdan erişilemeyen private değişken
  return {
    getToy: () => toy,
    setToy: (newToy) => { toy = newToy; }
  };
}
const myBackpack = createBackpack();
console.log(myBackpack.getToy()); // '🧸 Ayıcık'`,
          en: `// 1. Defining a Promise (Ice Cream Pager)
const iceCreamPromise = new Promise((resolve, reject) => {
  const isReady = true;
  if (isReady) resolve('🍦 Ice Cream Ready!');
  else reject('😢 Ice Cream Sold Out.');
});

// 2. Closure Example (Backpack / Private Variable)
function createBackpack() {
  let toy = '🧸 Teddy Bear'; // private variable — not accessible from outside
  return {
    getToy: () => toy,
    setToy: (newToy) => { toy = newToy; }
  };
}
const myBackpack = createBackpack();
console.log(myBackpack.getToy()); // '🧸 Teddy Bear'`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// async/await ve closures yapısını test edin!
const getDelay = (ms) => new Promise(res => setTimeout(res, ms));

async function runTest() {
  console.log("Adım 1: Tarayıcı açılıyor...");
  await getDelay(1000);
  console.log("Adım 2: Sayfa yüklendi (1s bekletildi).");
}
runTest();

// Closure testi
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
console.log("Sayaç 1:", counter());
console.log("Sayaç 2:", counter());`,
          en: `// Experiment with async/await and closures!
const getDelay = (ms) => new Promise(res => setTimeout(res, ms));

async function runTest() {
  console.log("Step 1: Launching browser...");
  await getDelay(1000);
  console.log("Step 2: Page loaded successfully after 1s wait.");
}
runTest();

// Closure test
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
console.log("Count call 1:", counter());
console.log("Count call 2:", counter());`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir fonksiyondan geriye dönen başka bir fonksiyonun, üst scope'taki değişkenleri hafızasında tutma yeteneğine ne ad verilir?",
          en: "What is it called when an inner function remembers and accesses variables from its outer lexical scope?"
        },
        options: [
          { id: "a", text: "Hoisting" },
          { id: "b", text: "Closure" },
          { id: "c", text: "Prototype" },
          { id: "d", text: "Event Loop" }
        ],
        correct: "b",
        explanation: {
          tr: "Closure (Kapanış), bir fonksiyonun kendi dışındaki (parent) kapsamda bulunan değişkenlere, parent fonksiyonu sonlansa dahi erişebilmesidir. JavaScript'te veri gizleme (data encapsulation) amacıyla kullanılır.",
          en: "Closure is when a function remembers and accesses variables from its outer lexical scope, even after the outer function has finished executing. It is often used for data encapsulation."
        },
        retryQuestion: {
          question: {
            tr: "Bir Promise nesnesinin sahip olabileceği üç durum (state) nedir?",
            en: "What are the three possible states of a Promise object?"
          },
          options: [
            { id: "a", text: "Start, Run, Stop" },
            { id: "b", text: "Pending, Fulfilled, Rejected" },
            { id: "c", text: "Stack, Heap, Queue" },
            { id: "d", text: "Create, Compile, Execute" }
          ],
          correct: "b",
          explanation: {
            tr: "Bir Promise henüz sonuçlanmamışken `pending` (beklemede), başarıyla çözüldüğünde `fulfilled` (yerine getirildi) ve hata aldığında `rejected` (reddedildi) durumundadır.",
            en: "A Promise is either `pending` (in progress), `fulfilled` (resolved successfully), or `rejected` (failed with an error)."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "Closure, bir fotoğraf çekiminde sahneye yerleştirilmiş dekor gibidir: fotoğraf çekildikten sonra sahneyi kaldırsan da, fotoğrafta o dekor hep vardır. Fonksiyon döndürülüp çalışma kapsamı (scope) silinse bile, iç fonksiyon dıştaki değişkene erişmeye devam eder — \"fotoğraflanmış\" değeri hatırlar.",
          en: "A closure is like a movie set: even after the set is torn down, photographs taken there still show the scenery. When a function is returned and its execution scope is gone, the inner function keeps accessing the outer variable — it remembers the \"photographed\" value."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Promise, bir kargo firmasının verdiği teslimat sözü gibidir: şu an elde değil, ama yakında gelecek. Üç durumu var: `pending` (yolda), `fulfilled` (teslim edildi), `rejected` (kayboldu). `.then()` teslimat geldiğinde ne yapılacağını söyler, `.catch()` kayıpsa ne yapılacağını.",
          en: "A Promise is like a delivery company's commitment: the package isn't here yet, but it's coming. Three states: `pending` (in transit), `fulfilled` (delivered), `rejected` (lost). `.then()` says what to do on delivery, `.catch()` handles what to do if it gets lost."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Closure'ı LEGO kutusuna kilitlenen el feneri gibi düşün: kutu kapansa bile fenerin ışığı kutu içindeki parçaları aydınlatmaya devam eder. Dıştaki scope (kutu) kapanmış olsa da, içteki fonksiyon (fener) o scope'taki değişkenleri (parçaları) görmeye devam eder.",
          en: "Think of a closure as a flashlight locked inside a LEGO box: even after the box is closed, the flashlight continues illuminating the pieces inside. Even when the outer scope (box) is gone, the inner function (flashlight) keeps seeing the variables (pieces) of that scope."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `async/await` Promise'lardan daha okunaklı? Promise zinciri (`.then().then().catch()`) mantıksal akışı yatay olarak büyütür — derin zincirlerde takip etmek zorlaşır. `async/await` aynı asenkron kodu sanki senkronmuş gibi dikey sırayla yazar, `try/catch` ile hata yakalamak Java'daki gibi tanıdık hissettiririr.",
          en: "Why is `async/await` more readable than Promises? Promise chains (`.then().then().catch()`) grow horizontally — deep chains become hard to follow. `async/await` writes the same async code top-to-bottom as if it were synchronous, and `try/catch` for error handling feels familiar to anyone coming from Java."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden closure'lar bellek sızıntısına (memory leak) yol açabilir? Closure, dıştaki değişkene referans tuttuğu için garbage collector o değişkeni silmez. Eğer closure event listener olarak DOM'a bağlanırsa ve element DOM'dan kaldırılmazsa, closure da bellekte kalır. Test otomasyonunda cleanup (temizlik) adımları bu yüzden önemlidir.",
          en: "Why can closures cause memory leaks? A closure holds a reference to the outer variable, preventing garbage collection of that variable. If a closure is attached to the DOM as an event listener and the element is never removed, the closure stays in memory indefinitely. This is why cleanup steps matter in test automation."
        }
      },
      {
        type: "quiz",
        question: { tr: "`Promise.all([p1, p2, p3])` ne zaman reject olur?", en: "When does `Promise.all([p1, p2, p3])` reject?" },
        options: [
          { id: "a", text: { tr: "Hiçbir promise başarısız olmadığında", en: "When none of the promises fail" } },
          { id: "b", text: { tr: "Herhangi biri reject olduğunda — hepsi aynı anda başlatılır ama biri başarısız olursa tümü başarısız sayılır", en: "When any ONE rejects — all start simultaneously but one failure fails the whole batch" } },
          { id: "c", text: { tr: "Yalnızca tüm promise'lar aynı anda reject olduğunda", en: "Only when all promises reject simultaneously" } },
          { id: "d", text: { tr: "Hiçbir zaman reject olmaz", en: "It never rejects" } }
        ],
        correct: "b",
        explanation: { tr: "`Promise.all` tüm promise'ları aynı anda başlatır. Hepsi resolve olursa, resolve değerlerinin dizisini döndürür. Herhangi biri reject olursa, ilk reject'in nedenini hemen döndürür — diğerleri iptal edilemez ama sonuçları görmezden gelinir.", en: "`Promise.all` starts all promises simultaneously. If all resolve, it returns an array of resolved values. If any ONE rejects, it immediately returns that rejection reason — the others cannot be cancelled but their results are ignored." },
        retryQuestion: {
          question: { tr: "`async` fonksiyon içinde `return 42` yazdığında ne döner?", en: "What does returning `42` inside an `async` function actually return?" },
          options: [
            { id: "a", text: { tr: "42 (sayı olarak)", en: "42 (as a number)" } },
            { id: "b", text: "Promise.resolve(42)" },
            { id: "c", text: "undefined" },
            { id: "d", text: "Promise.reject(42)" }
          ],
          correct: "b",
          explanation: { tr: "`async` fonksiyonlar HER ZAMAN bir Promise döndürür. `return 42` otomatik olarak `Promise.resolve(42)` haline gelir. Değere erişmek için `await` veya `.then()` kullanmalısın.", en: "`async` functions ALWAYS return a Promise. `return 42` automatically becomes `Promise.resolve(42)`. You must `await` or `.then()` to access the actual value 42." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain Promises and Closures using a restaurant or toy factory analogy. How does async/await fit into this system?",
        promptTr: "🤖 Mini Kahraman Soruyor: Promise ve Closure kavramlarını bir restoranı veya oyuncak fabrikasını örnek alarak anlat. async/await bu sisteme nasıl oturuyor?",
        keywords: [
              ["söz", "promise"],
              ["bekle", "wait"],
              ["hazır", "ready"],
              "resolve",
              "closure",
              ["gizli", "hidden"],
              ["sırt", "backpack"],
              "async",
              "await",
              ["zincir", "chain"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 9 — Classes, Modules & JSON
  // ─────────────────────────────────────────────
  {
    title: { tr: "Sınıflar, Modüller & JSON", en: "Classes, Modules & JSON" },
    blocks: [
      {
        type: "css-animation",
        kind: "classes",
        label: { tr: "Sınıf Hiyerarşisi — class Dog extends Animal", en: "Class Hierarchy — class Dog extends Animal" }
      },
      {
        type: "simple-box",
        emoji: "🏛️",
        content: {
          tr: "JavaScript'te modern kod mimarisi nesne yönelimli sınıflar (ES6 Classes), modül yükleyicileri (import/export) ve sunuculardan veri getirdiğimiz JSON formatı üzerine kurulur. Otomasyon testlerinde Page Object Model (POM) yapısı tamamen sınıflarla tasarlanır.",
          en: "Modern JavaScript applications are built on top of object-oriented classes (ES6 Classes), modules (import/export), and JSON text data. In test automation, the Page Object Model (POM) is designed using ES6 classes."
        }
      },
      {
        type: "heading",
        content: { tr: "Java Class vs JavaScript ES6 Class — Karşılaştırma", en: "Java Class vs JavaScript ES6 Class — Comparison" }
      },
      {
        type: "table",
        headers: [
          { tr: "Kavram", en: "Concept" },
          { tr: "Java", en: "Java" },
          { tr: "JavaScript (ES6)", en: "JavaScript (ES6)" }
        ],
        rows: [
          [
            { tr: "Sınıf tanımlama", en: "Class definition" },
            "public class BasePage {}",
            "class BasePage {}"
          ],
          [
            { tr: "Constructor", en: "Constructor" },
            "public BasePage(String url) {}",
            "constructor(url) {}"
          ],
          [
            { tr: "Miras alma (extends)", en: "Inheritance" },
            "class LoginPage extends BasePage",
            "class LoginPage extends BasePage"
          ],
          [
            { tr: "Super çağrısı", en: "Super call" },
            "super(url);",
            "super(url);"
          ],
          [
            { tr: "Private alan (ES2022)", en: "Private field" },
            "private String url;",
            "#url; (hash prefix)"
          ],
          [
            { tr: "Static metot", en: "Static method" },
            "public static void reset() {}",
            "static reset() {}"
          ]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "ES6 Module: import / export Kullanımı", en: "ES6 Module: import / export Usage" },
        content: {
          tr: `// ── pageObjects/BasePage.js ──────────────────────
export class BasePage {         // named export
  constructor(url) {
    this.url = url;
  }
  open() {
    console.log("Navigating to:", this.url);
  }
}

export const BASE_URL = "https://learnqa.dev"; // named export (sabit)

// ── pageObjects/LoginPage.js ─────────────────────
import { BasePage, BASE_URL } from './BasePage.js'; // named import

class LoginPage extends BasePage {
  constructor() {
    super(BASE_URL + "/login");   // super() ile parent constructor çağrısı
  }
  fillForm(user, pass) {
    return \`Logging in as \${user}\`;
  }
}

export default LoginPage;        // default export

// ── tests/login.test.js ──────────────────────────
import LoginPage from '../pageObjects/LoginPage.js'; // default import

const page = new LoginPage();
page.open();
console.log(page.fillForm("hasan", "secret123"));`,
          en: `// ── pageObjects/BasePage.js ──────────────────────
export class BasePage {         // named export
  constructor(url) {
    this.url = url;
  }
  open() {
    console.log("Navigating to:", this.url);
  }
}

export const BASE_URL = "https://learnqa.dev"; // named export (constant)

// ── pageObjects/LoginPage.js ─────────────────────
import { BasePage, BASE_URL } from './BasePage.js'; // named import

class LoginPage extends BasePage {
  constructor() {
    super(BASE_URL + "/login");   // calls parent constructor via super()
  }
  fillForm(user, pass) {
    return \`Logging in as \${user}\`;
  }
}

export default LoginPage;        // default export

// ── tests/login.test.js ──────────────────────────
import LoginPage from '../pageObjects/LoginPage.js'; // default import

const page = new LoginPage();
page.open();
console.log(page.fillForm("hasan", "secret123"));`
        }
      },
      {
        type: "heading",
        content: { tr: "Page Object Model ve JSON İşlemleri", en: "Page Object Model & JSON Handlers" }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Sınıf ve JSON parser kullanımını test edin!
class BasePage {
  constructor(url) {
    this.url = url;
  }
  open() {
    return "Navigating to: " + this.url;
  }
}

const page = new BasePage("https://learnqa.dev");
console.log(page.open());

// JSON'u nesneye dönüştürme
const rawJson = '{"testId": 101, "browser": "chromium"}';
const testData = JSON.parse(rawJson);
console.log("Tarayıcı Tipi:", testData.browser);`,
          en: `// Run class definitions and JSON operations!
class BasePage {
  constructor(url) {
    this.url = url;
  }
  open() {
    return "Navigating to: " + this.url;
  }
}

const page = new BasePage("https://learnqa.dev");
console.log(page.open());

// Parse JSON string
const rawJson = '{"testId": 101, "browser": "chromium"}';
const testData = JSON.parse(rawJson);
console.log("Parsed Browser:", testData.browser);`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir JavaScript nesnesini (Object) metin tabanlı bir JSON string'ine dönüştürmek için hangi metot kullanılır?",
          en: "Which method is used to serialize a JavaScript object into a text-based JSON string?"
        },
        options: [
          { id: "a", text: "JSON.parse()" },
          { id: "b", text: "JSON.stringify()" },
          { id: "c", text: "JSON.serialize()" },
          { id: "d", text: "JSON.toString()" }
        ],
        correct: "b",
        explanation: {
          tr: "`JSON.stringify()` nesneyi string'e dönüştürür (serialization). `JSON.parse()` ise JSON string'ini canlı JavaScript nesnesine çevirir (deserialization).",
          en: "`JSON.stringify()` serializes a JS object into a JSON string, while `JSON.parse()` deserializes a JSON string back to a live JS object."
        },
        retryQuestion: {
          question: {
            tr: "JavaScript'te bir sınıftan (class) yeni bir nesne örneği türetmek için hangi anahtar kelime kullanılır?",
            en: "Which keyword is used to instantiate a new object instance from a class in JavaScript?"
          },
          options: [
            { id: "a", text: "create" },
            { id: "b", text: "new" },
            { id: "c", text: "instantiate" },
            { id: "d", text: "make" }
          ],
          correct: "b",
          explanation: {
            tr: "Sınıflardan yeni bir kopya türetmek için Java'da olduğu gibi JavaScript'te de `new` anahtar kelimesi kullanılır (Örn: `const page = new Page();`).",
            en: "Just like in Java, the `new` keyword is used to create an instance of a class in JavaScript (e.g., `const page = new Page();`)."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript class'ı, LEGO set'inin talimat kitapçığı gibidir: kitapçık sınıfı tanımlar (nasıl inşa edileceği), her yeni LEGO seti ise o sınıftan türetilmiş nesne (instance). Java'da class kavramı aynı; farkı JavaScript class'larının aslında prototype tabanlı olması, `class` syntax'ının üstüne gelmiş şekerli bir kaplama olmasıdır.",
          en: "A JavaScript class is like a LEGO set's instruction manual: the manual defines the class (how to build), each new assembled set is an object (instance) derived from that class. Java's class concept is identical; the difference is that JavaScript classes are actually prototype-based internally — `class` syntax is syntactic sugar over prototypes."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`extends` keyword'ü, bir LEGO setini temel model üzerine inşa etmek gibidir: `VehiclePage extends BasePage` yazdığında, `BasePage`'in tüm metodlarına (tekerlekler, motor) ek olarak `VehiclePage`'e özgü metodlar (römork bağlantısı) eklersin. `super()` ise temel modelin fabrika konfigürasyonunu başlatan düğmedir.",
          en: "The `extends` keyword is like building a LEGO set on top of a base model: `VehiclePage extends BasePage` gives you all of BasePage's methods (wheels, engine) plus VehiclePage-specific additions (trailer hitch). `super()` is the button that runs the base model's factory configuration."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "JavaScript'te `#privateField` (private class field), LEGO setinin içine gömülmüş gizli bir parçaya benzer: dışarıdan görünmez, yalnızca o setin kendi metodları tarafından erişilebilir. Java'da `private` keyword'ü ile aynı amacı güder ama JS'de `#` prefix ile belirtilir.",
          en: "In JavaScript, `#privateField` (private class field) is like a hidden piece embedded inside a LEGO set: invisible from outside, accessible only by that set's own methods. Same purpose as Java's `private` keyword — but in JS you use the `#` prefix instead."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden Page Object Model (POM) JavaScript class'larıyla yazılır? Test kodu duplication'ını önler: her sayfanın element seçicileri ve aksiyonları tek bir class'ta toplanır. Selector değiştiğinde sadece bir yeri güncellersen yeterlidir. Java'da da POM aynı prensiple çalışır — JavaScript class'ları bu deseni doğal olarak destekler.",
          en: "Why is Page Object Model (POM) written with JavaScript classes? It eliminates test code duplication: every page's selectors and actions are centralized in one class. When a selector changes, you update one place. POM works by the same principle in Java — JavaScript classes support this pattern naturally."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript'te hem `prototype` hem `class` var? `class` syntax'ı ES6 ile geldi, ama altında hâlâ prototype zinciri çalışıyor. `class` sadece daha okunabilir bir arayüz. Bu yüzden `instanceof` kontrolü, prototype zinciri boyunca kontrol yapar — Java'daki gibi nominal typing değil, yapısal bir kontrol.",
          en: "Why does JavaScript have both `prototype` and `class`? `class` syntax arrived in ES6, but prototype chains still power everything underneath. `class` is just a more readable interface. That's why `instanceof` checks walk the prototype chain — not nominal typing like Java, but structural verification."
        }
      },
      {
        type: "quiz",
        question: { tr: "Page Object Model'de `constructor(page)` içinde `this.page = page` yazmak ne sağlar?", en: "What does writing `this.page = page` in the `constructor(page)` of a Page Object provide?" },
        options: [
          { id: "a", text: { tr: "Sayfa nesnesini siler", en: "Deletes the page object" } },
          { id: "b", text: { tr: "Playwright'ın `page` nesnesini sınıfın tüm metodlarında kullanılabilir kılar", en: "Makes Playwright's `page` object accessible in all methods of the class" } },
          { id: "c", text: { tr: "Sayfayı otomatik navigate eder", en: "Automatically navigates the page" } },
          { id: "d", text: { tr: "Constructor'ı private yapar", en: "Makes the constructor private" } }
        ],
        correct: "b",
        explanation: { tr: "`this.page = page` ile constructor'a gelen `page` nesnesi, class instance'ına bağlanır. Böylece `this.page.click()`, `this.page.goto()` gibi çağrılar sınıfın tüm metodlarından yapılabilir.", en: "`this.page = page` binds the `page` argument to the class instance. This means `this.page.click()`, `this.page.goto()`, and all Playwright actions become available in every method of the class." },
        retryQuestion: {
          question: { tr: "JavaScript'te `static` method nedir?", en: "What is a `static` method in JavaScript?" },
          options: [
            { id: "a", text: { tr: "Yalnızca bir instance üzerinden çağrılabilen method", en: "Method callable only on an instance" } },
            { id: "b", text: { tr: "Sınıfın instance'ı oluşturulmadan doğrudan sınıf üzerinden çağrılan method", en: "Method called directly on the class without creating an instance" } },
            { id: "c", text: { tr: "Değiştirilemeyen method", en: "Immutable method" } },
            { id: "d", text: { tr: "Private method", en: "Private method" } }
          ],
          correct: "b",
          explanation: { tr: "`static` method'lar sınıf üzerinden çağrılır: `LoginPage.generateTestEmail()`. Instance oluşturmaya gerek yoktur. Yardımcı (utility) fonksiyonları için idealdir.", en: "`static` methods are called on the class itself: `LoginPage.generateTestEmail()`. No instance needed. Ideal for utility functions that belong conceptually to a class but don't need instance state." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: How different are JavaScript classes from Java classes, really? Can you explain JSON like a letter envelope? Why do modules matter?",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript sınıfları (class) Java'daki sınıflardan gerçekten ne kadar farklı? JSON'u bir mektup zarfı gibi anlatabilir misin? Modüller neden önemlidir?",
        keywords: [
              ["sınıf", "class"],
              ["prototip", "prototype"],
              "json",
              ["metin", "text"],
              ["modül", "module"],
              "import",
              "export",
              "new",
              ["miras", "inherit"],
              ["nesne", "object"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 10 — Real World QA & DOM
  // ─────────────────────────────────────────────
  {
    title: { tr: "Gerçek Hayat QA & DOM", en: "Real World QA & DOM" },
    blocks: [
      {
        type: "css-animation",
        kind: "dom",
        label: { tr: "querySelector — DOM'da Element Seçimi", en: "querySelector — Selecting Elements in the DOM" }
      },
      {
        type: "simple-box",
        emoji: "🧪",
        content: {
          tr: "Gerçek otomasyon projelerinde (Playwright veya Cypress), asenkron API çağrılarını ve sayfa yüklenmelerini beklemek kritik önem taşır. `await page.click('button')` yazdığımızda, arkadaki asenkron sözün (Promise) çözülmesini bekleriz. Java'daki `Thread.sleep()` yerine JavaScript'teki `async/await` yapısını kullanarak testlerimizin kararlı çalışmasını sağlarız.",
          en: "In real-world automation suites (Playwright/Cypress), waiting for asynchronous API calls and page loads is critical. When writing `await page.click('button')`, we pause execution until the underlying Promise resolves. Instead of Java's flaky `Thread.sleep()`, we use JavaScript's clean `async/await` flow to write robust tests."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Playwright ile Asenkron Test Yazımı", en: "Asynchronous Test with Playwright" },
        content: {
          tr: `import { test, expect } from '@playwright/test';

test('Asenkron veri yükleme testi', async ({ page }) => {
  // 1. Web sitesine git (Promise döner, await ile yüklenmesini bekle)
  await page.goto('https://example.com');

  // 2. Butona tıkla (Playwright arka planda otomatik olarak elementin hazır olmasını bekler)
  await page.click('#load-data-btn');

  // 3. API'den veri dönüp ekranda belirene kadar bekle
  const welcomeText = page.locator('.welcome-msg');
  await expect(welcomeText).toBeVisible({ timeout: 5000 });
});`,
          en: `import { test, expect } from '@playwright/test';

test('Async data loading test', async ({ page }) => {
  // 1. Navigate to website (returns a Promise, await resolves it)
  await page.goto('https://example.com');

  // 2. Click the button (Playwright auto-waits until element is ready)
  await page.click('#load-data-btn');

  // 3. Wait until API data appears on screen
  const welcomeText = page.locator('.welcome-msg');
  await expect(welcomeText).toBeVisible({ timeout: 5000 });
});`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Tarayıcı DOM element seçim simülasyonunu çalıştırın!
const fakeDocument = {
  querySelector: function(selector) {
    console.log("DOM tarandı, hedef:", selector);
    return {
      textContent: "Üye Girişi Yapın",
      click: () => console.log("Giriş butonuna başarıyla tıklandı! 🎉")
    };
  }
};

const titleElement = fakeDocument.querySelector("h1.title");
console.log("Bulunan Başlık:", titleElement.textContent);
titleElement.click();`,
          en: `// Simulate document selectors inside browser contexts!
const fakeDocument = {
  querySelector: function(selector) {
    console.log("Scanning DOM for locator target:", selector);
    return {
      textContent: "Submit Form",
      click: () => console.log("Successfully triggered click event! 🎉")
    };
  }
};

const submitBtn = fakeDocument.querySelector("button#submit");
console.log("Scraped button text:", submitBtn.textContent);
submitBtn.click();`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Otomasyon kodunda `await` anahtar kelimesi ne işe yarar?",
          en: "What is the purpose of the `await` keyword in automation code?"
        },
        options: [
          { id: "a", text: { tr: "Testi arka planda paralel çalıştırmaya zorlar", en: "Forces the test to run in parallel in the background" } },
          { id: "b", text: { tr: "Bir asenkron işlemin (Promise) çözülmesini (resolve) bekler ve kodu orada duraklatır", en: "Pauses execution and waits for an asynchronous Promise to resolve" } },
          { id: "c", text: { tr: "Tarayıcıyı anında kapatır", en: "Closes the browser instantly" } },
          { id: "d", text: { tr: "Kodun JVM üzerinde çalışmasını sağlar", en: "Allows the code to run on the JVM" } }
        ],
        correct: "b",
        explanation: {
          tr: "`await` anahtar kelimesi, bir Promise'in çözülmesini (başarı veya başarısızlıkla) bekler. Sadece `async` fonksiyonlar içinde kullanılabilir ve asenkron kodun tıpkı senkron kod gibi düz bir satır halinde yazılabilmesini sağlar.",
          en: "`await` halts execution until a Promise resolves (either successfully or with a failure). It can only be used inside an `async` function, making async code write and look like synchronous code."
        },
        retryQuestion: {
          question: {
            tr: "Modern web tarayıcılarında bir DOM (HTML) öğesini seçmek için JavaScript içinde en sık kullanılan API metodu hangisidir?",
            en: "Which standard JavaScript API method is most commonly used in browsers to select a DOM element?"
          },
          options: [
            { id: "a", text: "document.getElement" },
            { id: "b", text: "document.querySelector" },
            { id: "c", text: "window.select" },
            { id: "d", text: "document.findByText" }
          ],
          correct: "b",
          explanation: {
            tr: "`document.querySelector('secici')` metodu, CSS seçici kullanarak sayfadaki ilk eşleşen elemente erişim sağlar.",
            en: "`document.querySelector('selector')` returns the first element that matches the specified CSS selector inside the DOM."
          }
        }
      },
      {
        type: "heading",
        content: { tr: "querySelectorAll & NodeList Döngüsü", en: "querySelectorAll & NodeList Iteration" }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`querySelector` şehirde yalnızca ilk belirtilen adresi bulan bir GPS'tir — tek sonuç döner. `querySelectorAll` ise o isimde tüm sokakları listeleyen bir harita uygulaması — eşleşen tüm elementleri `NodeList` olarak döndürür. Playwright'da `page.locator(\".item\")` da benzer şekilde tüm eşleşmeleri bulur.",
          en: "`querySelector` is a GPS that finds only the first matching address — returns one result. `querySelectorAll` is a map app that lists every street with that name — returns all matching elements as a `NodeList`. Playwright's `page.locator(\".item\")` works the same way under the hood."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "querySelectorAll & NodeList üzerinde döngü", en: "querySelectorAll & NodeList Iteration" },
        content: {
          tr: `// querySelectorAll — tüm eşleşen elementleri döndürür (NodeList)
const items = document.querySelectorAll('.product-card');  // NodeList (dizi değil!)

// Yöntem 1: forEach (NodeList doğrudan destekler)
items.forEach(item => console.log(item.textContent));

// Yöntem 2: for...of (NodeList iterable'dır)
for (const item of items) {
  console.log(item.getAttribute('data-price'));
}

// Yöntem 3: Gerçek diziye çevir (dizi metodları kullanmak için)
const priceArr = Array.from(items).map(item => item.dataset.price);

// ⚠️ items.map() ÇALIŞMAZ — NodeList bir Array değildir!
// items.map(...)  ← TypeError: items.map is not a function
// Array.from(items).map(...)  ← ✅ Doğru yol

// Test Otomasyonu (Playwright) — benzer konsept:
// const locators = page.locator('.product-card');
// const count = await locators.count();
// for (let i = 0; i < count; i++) { await locators.nth(i).click(); }`,
          en: `// querySelectorAll — returns all matching elements (NodeList)
const items = document.querySelectorAll('.product-card');  // NodeList (NOT an Array!)

// Method 1: forEach (NodeList supports it natively)
items.forEach(item => console.log(item.textContent));

// Method 2: for...of (NodeList is iterable)
for (const item of items) {
  console.log(item.getAttribute('data-price'));
}

// Method 3: Convert to a real array (to use array methods)
const priceArr = Array.from(items).map(item => item.dataset.price);

// ⚠️ items.map() DOES NOT WORK — NodeList is not an Array!
// items.map(...)  ← TypeError: items.map is not a function
// Array.from(items).map(...)  ← ✅ Correct approach

// Test Automation (Playwright) — same concept:
// const locators = page.locator('.product-card');
// const count = await locators.count();
// for (let i = 0; i < count; i++) { await locators.nth(i).click(); }`
        }
      },
      {
        type: "heading",
        content: { tr: "innerHTML vs textContent — Güvenlik & Performans", en: "innerHTML vs textContent — Security & Performance" }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `innerHTML` yerine `textContent` tercih edilmeli? `innerHTML` HTML etiketlerini çözümleyip DOM'a ekler — kullanıcı verisi içeriyorsa XSS (Cross-Site Scripting) saldırısına kapı açar. `textContent` ise sadece düz metin ekler, HTML etiketleri çözümlenmez, güvenlidir. Test otomasyonunda bir elementin içeriğini okurken `textContent` kullanmak en güvenli yoldur.",
          en: "Why prefer `textContent` over `innerHTML`? `innerHTML` parses and executes HTML markup — if it contains user data, you open the door to XSS (Cross-Site Scripting) attacks. `textContent` inserts plain text only, no HTML parsing, completely safe. When reading element content in test automation, `textContent` is the safest choice."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "innerHTML vs textContent karşılaştırması", en: "innerHTML vs textContent comparison" },
        content: {
          tr: `// ── textContent ─────────────────────────────
const el = document.getElementById('output');

// OKUMA: sadece metin döner (HTML etiketleri soyulur)
el.innerHTML = '<b>Merhaba</b>';
console.log(el.textContent);   // "Merhaba"  ← etiket yok
console.log(el.innerHTML);     // "<b>Merhaba</b>"  ← etiket var

// YAZMA karşılaştırması:
el.textContent = '<b>Bold?</b>';
// Ekranda görünür: <b>Bold?</b>  ← HTML ÇALIŞMAZ, düz metin
el.innerHTML  = '<b>Bold!</b>';
// Ekranda görünür: Bold!  ← HTML çalışır, kalın yazı

// ⚠️ XSS saldırısı örneği — innerHTML ile:
const userInput = '<img src=x onerror="alert(\'XSS!\')">';
// el.innerHTML = userInput;    // ← TEHLIKE! Script çalışır
el.textContent = userInput;     // ← GÜVENLİ: düz metin olarak gösterir

// ✅ Test otomasyonunda metin okuma:
const buttonText = document.querySelector('#submit').textContent.trim();
// Java/Selenium: driver.findElement(By.id("submit")).getText()`,
          en: `// ── textContent ─────────────────────────────
const el = document.getElementById('output');

// READ: returns plain text only (HTML tags are stripped)
el.innerHTML = '<b>Hello</b>';
console.log(el.textContent);   // "Hello"       ← no tags
console.log(el.innerHTML);     // "<b>Hello</b>" ← tags preserved

// WRITE comparison:
el.textContent = '<b>Bold?</b>';
// Visible on screen: <b>Bold?</b>  ← HTML NOT PARSED, plain text
el.innerHTML  = '<b>Bold!</b>';
// Visible on screen: Bold!  ← HTML parsed, bold text rendered

// ⚠️ XSS attack example — with innerHTML:
const userInput = '<img src=x onerror="alert(\'XSS!\')">';
// el.innerHTML = userInput;    // ← DANGER! Script executes
el.textContent = userInput;     // ← SAFE: displayed as plain text

// ✅ Reading text in test automation:
const buttonText = document.querySelector('#submit').textContent.trim();
// Java/Selenium: driver.findElement(By.id("submit")).getText()`
        }
      },
      {
        type: "heading",
        content: { tr: "MutationObserver — DOM Değişikliklerini Dinlemek", en: "MutationObserver — Watching DOM Changes" }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "MutationObserver, bir güvenlik kamerasına benzer: DOM'un belirli bir bölgesine odaklanır ve her değişiklik olduğunda (yeni element eklendi, sınıf değişti, metin güncellendi) seni haberdar eder. Test otomasyonunda dinamik içeriğin (chatbot mesajı, toast notification, lazy-loaded data) görünmesini beklemek için idealdir.",
          en: "MutationObserver is like a security camera: it focuses on a specific region of the DOM and notifies you every time something changes (element added, class changed, text updated). In test automation it's ideal for waiting for dynamic content (chatbot messages, toast notifications, lazy-loaded data) to appear."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "MutationObserver ile DOM değişikliği izleme", en: "Watching DOM changes with MutationObserver" },
        content: {
          tr: `// MutationObserver kurulumu
const targetNode = document.getElementById('chat-messages');

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Yeni mesaj eklendi
      const newNodes = mutation.addedNodes;
      newNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log('Yeni mesaj:', node.textContent);
        }
      });
    }
    if (mutation.type === 'attributes') {
      console.log('Attribute değişti:', mutation.attributeName);
    }
  }
});

// Hangi değişiklikleri izleyeceğini belirt
observer.observe(targetNode, {
  childList: true,    // alt elementlerin eklenmesi/çıkarılması
  attributes: true,   // attribute değişiklikleri
  subtree: true       // alt ağacı da izle
});

// Gözlemlemeyi durdur (temizlik — bellek sızıntısını önler)
observer.disconnect();

// ─────────────────────────────────────────────────────────────
// Test Otomasyonu ile Bağlantı:
// Playwright'ta benzer bekleme:
// await expect(page.locator('.chat-message').last()).toBeVisible();
//
// Ancak manuel test sayfasında MutationObserver ile:
// 1. "Gönder" butonuna tıkla
// 2. Observer yeni mesaj elementini algılar
// 3. Test assertion çalışır`,
          en: `// MutationObserver setup
const targetNode = document.getElementById('chat-messages');

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // New message added
      const newNodes = mutation.addedNodes;
      newNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log('New message:', node.textContent);
        }
      });
    }
    if (mutation.type === 'attributes') {
      console.log('Attribute changed:', mutation.attributeName);
    }
  }
});

// Specify what changes to watch
observer.observe(targetNode, {
  childList: true,    // child elements added/removed
  attributes: true,   // attribute changes
  subtree: true       // also watch the subtree
});

// Stop observing (cleanup — prevents memory leaks)
observer.disconnect();

// ─────────────────────────────────────────────────────────────
// Connection to Test Automation:
// Equivalent wait in Playwright:
// await expect(page.locator('.chat-message').last()).toBeVisible();
//
// With MutationObserver on a manual test page:
// 1. Click "Send" button
// 2. Observer detects new message element
// 3. Test assertion runs`
        }
      },
      {
        type: "quiz",
        question: { tr: "`document.querySelectorAll(\".item\")` ne döndürür?", en: "What does `document.querySelectorAll(\".item\")` return?" },
        options: [
          { id: "a", text: { tr: "İlk eşleşen HTML elementi", en: "The first matching HTML element" } },
          { id: "b", text: { tr: "Bir JavaScript Array'i", en: "A JavaScript Array" } },
          { id: "c", text: { tr: "NodeList — forEach ve for...of destekler ama map() desteklemez", en: "A NodeList — supports forEach and for...of but not map()" } },
          { id: "d", text: { tr: "null — eşleşme yoksa", en: "null — if no match found" } }
        ],
        correct: "c",
        explanation: { tr: "`querySelectorAll` bir NodeList döndürür. NodeList, forEach ve for...of ile iterate edilebilir, ancak `map()`, `filter()` gibi Array metodları desteklenmez. Dizi metodları için `Array.from(nodeList)` kullanılır.", en: "`querySelectorAll` returns a NodeList. It supports `forEach` and `for...of` iteration, but does NOT support array methods like `map()` or `filter()`. Use `Array.from(nodeList)` to convert it to a real array first." },
        retryQuestion: {
          question: { tr: "innerHTML ile XSS saldırısını önlemek için ne kullanılmalıdır?", en: "What should be used instead of innerHTML to prevent XSS attacks?" },
          options: [
            { id: "a", text: "outerHTML" },
            { id: "b", text: "textContent" },
            { id: "c", text: "innerText" },
            { id: "d", text: "nodeValue" }
          ],
          correct: "b",
          explanation: { tr: "`textContent`, kullanıcı verisini HTML olarak işlemez — düz metin olarak ekler. Bu, XSS saldırılarının temel savunmasıdır.", en: "`textContent` never parses user data as HTML — it inserts it as plain text. This is the primary defense against XSS attacks when displaying user-generated content." }
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`querySelector` ve `querySelectorAll`, LEGO parça çantanızı tarayan iki farklı araç gibidir: `querySelector` ilk kırmızı parçayı bulup geri döner, `querySelectorAll` çantadaki tüm kırmızı parçaları bir tepside toplar.",
          en: "`querySelector` and `querySelectorAll` are two different scanning tools for your LEGO parts bin: `querySelector` finds the first red piece and returns immediately, `querySelectorAll` collects every red piece onto a tray."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `MutationObserver` polling'den daha iyi? `setInterval` ile DOM'u sürekli kontrol etmek (polling) CPU'yu gereksiz kullanır ve gecikme yaratır. `MutationObserver` event-driven çalışır — değişiklik olana kadar hiçbir şey yapmaz, değişince anında tetiklenir. Test güvenilirliği açısından polling'den çok üstündür.",
          en: "Why is `MutationObserver` better than polling? Checking the DOM repeatedly with `setInterval` wastes CPU and introduces delay. `MutationObserver` is event-driven — it does nothing until a change happens, then fires instantly. Far superior to polling for test reliability and page-level monitoring."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Why is using await in a Playwright test a lifesaver? Explain the DOM and querySelector like searching for an address in a city.",
        promptTr: "🤖 Mini Kahraman Soruyor: Bir Playwright testi yazarken await kullanmak neden hayat kurtarır? DOM'u ve querySelector'ı bir şehirde adres arama gibi anlat.",
        keywords: [
              ["bekle", "wait"],
              "await",
              ["sayfa", "page"],
              ["yükle", "load"],
              "element",
              ["buton", "button"],
              ["tıkla", "click"],
              ["seçici", "selector"],
              "dom",
              ["hazır", "ready"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 11 — Ecosystem & Tools
  // ─────────────────────────────────────────────
  {
    title: { tr: "Ekosistem & Araçlar", en: "Ecosystem & Tools" },
    blocks: [
      {
        type: "css-animation",
        kind: "ecosystem",
        label: { tr: "JavaScript Ekosistemine Genel Bakış", en: "JavaScript Ecosystem Overview" }
      },
      {
        type: "simple-box",
        emoji: "🌱",
        content: {
          tr: "JavaScript ekosistemi devasa bir oyuncak fabrikasıdır. Node.js motorumuzdur, `package.json` ise projemizin kimlik kartı ve hangi oyuncaklara (kütüphanelere) ihtiyaç duyduğumuzun listesidir. npm ise paketleri internetten bilgisayarımıza getiren kuryedir. Java'daki Maven + pom.xml yapısının tüm ekvivalenti burada: `npm + package.json`.",
          en: "The JavaScript ecosystem is like a giant toy factory. Node.js is the engine, `package.json` is our project's ID card listing the required toys (libraries), and npm is the delivery driver fetching packages from the web — the full equivalent of Java's Maven + pom.xml setup."
        }
      },
      {
        type: "heading",
        content: { tr: "Temel Proje Dosyaları", en: "Core Project Files" }
      },
      {
        type: "grid",
        cols: 2,
        items: [
          {
            icon: "📝",
            label: "package.json",
            desc: { tr: "Proje adı, versiyonu, script tanımları ve bağımlı olunan tüm kütüphanelerin (Playwright, Jest) listelendiği temel dosya. Java'daki pom.xml karşılığıdır.", en: "The file containing project metadata, custom run scripts, and all installed libraries (Playwright, Jest). The exact equivalent of Maven's pom.xml." }
          },
          {
            icon: "📦",
            label: "node_modules/",
            desc: { tr: "npm install komutu çalıştırıldığında inen kütüphanelerin saklandığı devasa klasör. Java'daki .m2 Maven deposu gibidir ama her projenin kendi içindedir. Asla git'e push edilmez.", en: "The folder holding all downloaded libraries after running npm install. Like Java's ~/.m2 Maven cache, but local to each project. Always added to .gitignore." }
          },
          {
            icon: "🔒",
            label: "package-lock.json",
            desc: { tr: "Tüm bağımlılıkların tam sürümlerini kilitleyen dosya. Bu sayede farklı makinelerde bile aynı paket sürümleri yüklenir. Java'daki Maven Enforcer plugin mantığına benzer.", en: "Locks exact versions of every dependency tree, guaranteeing identical installs across machines. Similar to Maven's dependency locking enforcer configurations." }
          },
          {
            icon: "⚙️",
            label: ".npmrc / .nvmrc",
            desc: { tr: ".npmrc npm davranışını özelleştirir (kayıt URL, scope). .nvmrc ise projenin hangi Node.js sürümüyle çalışacağını tanımlar — CI pipeline'da kritik önem taşır.", en: ".npmrc customizes npm behavior (registry URL, scope). .nvmrc pins the required Node.js version for the project — critical for CI pipeline reproducibility." }
          }
        ]
      },
      {
        type: "heading",
        content: { tr: "QA Otomasyonunda Kullanılan Temel Araçlar", en: "Key Tools in QA Automation Ecosystem" }
      },
      {
        type: "grid",
        cols: 3,
        items: [
          {
            icon: "🎭",
            label: "Playwright",
            desc: { tr: "Microsoft'un geliştirdiği, Chromium/Firefox/WebKit'i destekleyen modern e2e test kütüphanesi. async/await doğal desteği ile en popüler JS test aracıdır.", en: "Microsoft's modern e2e test library supporting Chromium, Firefox, and WebKit. The most popular JS test tool with native async/await support." }
          },
          {
            icon: "🌲",
            label: "Cypress",
            desc: { tr: "Tarayıcı içinde doğrudan çalışan, gerçek zamanlı debug ve time-travel debugging sunan e2e test aracı. Dashboard ve component testing için de kullanılır.", en: "Runs directly inside the browser, offering real-time debugging and time-travel replay. Used for both e2e and component testing." }
          },
          {
            icon: "🃏",
            label: "Jest",
            desc: { tr: "Facebook'un geliştirdiği, sıfır konfigürasyonla çalışan JavaScript unit test kütüphanesi. Mock, snapshot ve code coverage desteği sunar.", en: "Facebook's zero-config JavaScript unit test library. Supports mocks, snapshots, and built-in code coverage reporting." }
          },
          {
            icon: "🔧",
            label: "ESLint",
            desc: { tr: "JavaScript/TypeScript kod kalitesini statik olarak analiz eden lint aracı. Otomasyon projelerinde yanlış sözdizimi ve potansiyel bug'ları committen önce yakalar.", en: "Static code analysis tool for JS/TS. Catches syntax errors and potential bugs before they reach CI — essential for any automation project." }
          },
          {
            icon: "✨",
            label: "Prettier",
            desc: { tr: "Kod biçimlendirme (formatting) aracı. Tüm ekibin aynı stil standartlarında kod yazmasını sağlar. ESLint ile birlikte kullanılır.", en: "Opinionated code formatter ensuring consistent style across the entire team. Used alongside ESLint for a complete code quality pipeline." }
          },
          {
            icon: "📊",
            label: "Allure / HTML Reporter",
            desc: { tr: "Test sonuçlarını görsel raporlar halinde sunan araç. Playwright ile `@playwright/test` reporter olarak, Jest ile `jest-allure` eklentisiyle kullanılır.", en: "Generates visual HTML reports from test results. Integrates with Playwright via reporters config and with Jest via jest-allure plugin." }
          }
        ]
      },
      {
        type: "heading",
        content: { tr: "Java Maven ↔ JavaScript npm Karşılaştırması", en: "Java Maven ↔ JavaScript npm Comparison" }
      },
      {
        type: "table",
        headers: [
          { tr: "İşlem", en: "Task" },
          { tr: "Java (Maven)", en: "Java (Maven)" },
          { tr: "JavaScript (npm)", en: "JavaScript (npm)" }
        ],
        rows: [
          [
            { tr: "Proje yapılandırma", en: "Project config" },
            { tr: "pom.xml", en: "pom.xml" },
            { tr: "package.json", en: "package.json" }
          ],
          [
            { tr: "Bağımlılık indirme", en: "Install dependencies" },
            { tr: "mvn install", en: "mvn install" },
            { tr: "npm install", en: "npm install" }
          ],
          [
            { tr: "Test çalıştırma", en: "Run tests" },
            { tr: "mvn test", en: "mvn test" },
            { tr: "npm test / npx playwright test", en: "npm test / npx playwright test" }
          ],
          [
            { tr: "Paket ekleme", en: "Add a package" },
            { tr: "pom.xml dependency ekle", en: "Add to pom.xml" },
            { tr: "npm install playwright", en: "npm install playwright" }
          ],
          [
            { tr: "Bağımlılık kilidi", en: "Dependency lock" },
            { tr: "maven-enforcer-plugin", en: "maven-enforcer-plugin" },
            { tr: "package-lock.json", en: "package-lock.json" }
          ]
        ]
      },
      {
        type: "code",
        language: "json",
        label: { tr: "Örnek package.json — Playwright Projesi", en: "Sample package.json — Playwright Project" },
        content: `{
  "name": "my-playwright-suite",
  "version": "1.0.0",
  "scripts": {
    "test":      "npx playwright test",
    "test:ci":   "npx playwright test --reporter=html",
    "lint":      "eslint src/ tests/"
  },
  "devDependencies": {
    "@playwright/test": "^1.44.0",
    "eslint":           "^8.57.0"
  }
}`
      },
      {
        type: "quiz",
        question: {
          tr: "Node.js projesinde indirilen kütüphanelerin fiziksel olarak saklandığı klasör hangisidir?",
          en: "Which folder physically stores downloaded dependencies in a Node.js project?"
        },
        options: [
          { id: "a", text: "target/" },
          { id: "b", text: "node_modules/" },
          { id: "c", text: "src/main/" },
          { id: "d", text: ".gradle/" }
        ],
        correct: "b",
        explanation: {
          tr: "`node_modules/` klasörü, projedeki tüm npm paketlerinin kurulduğu yerdir. Git geçmişine yüklenmemesi için `.gitignore` dosyasına mutlaka eklenmesi önerilir.",
          en: "`node_modules/` is the directory where all npm dependencies are downloaded. It is highly recommended to add this folder to your `.gitignore` file."
        },
        retryQuestion: {
          question: {
            tr: "Yeni bir Node.js projesi başlatmak ve package.json dosyası oluşturmak için hangi npm komutu çalıştırılmalıdır?",
            en: "Which npm command initializes a new Node.js project and creates a package.json file?"
          },
          options: [
            { id: "a", text: "npm run dev" },
            { id: "b", text: "npm init" },
            { id: "c", text: "npm install" },
            { id: "d", text: "npm start" }
          ],
          correct: "b",
          explanation: {
            tr: "`npm init` (veya `-y` bayrağıyla varsayılan değerleri onaylayarak), yeni bir Node.js projesi kurar ve projenin kalbi olan package.json dosyasını sıfırdan oluşturur.",
            en: "`npm init` (or `npm init -y` to accept defaults) initializes a new Node.js project and generates the package.json file from scratch."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Playwright projesi kurulumunda, tarayıcı binary'lerini (Chromium, Firefox, WebKit) indirmek için hangi komut çalıştırılır?",
          en: "Which command downloads the browser binaries (Chromium, Firefox, WebKit) after installing Playwright?"
        },
        options: [
          { id: "a", text: "npm install browsers" },
          { id: "b", text: "npx playwright install" },
          { id: "c", text: "npm run setup" },
          { id: "d", text: "playwright download --all" }
        ],
        correct: "b",
        explanation: {
          tr: "`npx playwright install` komutu, Playwright'ın test için ihtiyaç duyduğu tüm tarayıcı binary'lerini (Chromium, Firefox, WebKit) indirir. Java'daki WebDriver Manager'ın yaptığını npm ekosisteminde Playwright kendi yapıyor.",
          en: "`npx playwright install` downloads all required browser binaries (Chromium, Firefox, WebKit). Unlike Java's Selenium where you need WebDriver Manager, Playwright handles this natively via this single command."
        },
        retryQuestion: {
          question: {
            tr: "Bir Playwright testini yalnızca Chromium tarayıcısında çalıştırmak için hangi flag kullanılır?",
            en: "Which CLI flag runs Playwright tests only on the Chromium browser?"
          },
          options: [
            { id: "a", text: "--browser=chrome" },
            { id: "b", text: "--project=chromium" },
            { id: "c", text: "--run chromium" },
            { id: "d", text: "--only-chromium" }
          ],
          correct: "b",
          explanation: {
            tr: "`npx playwright test --project=chromium` yalnızca Chromium profilini çalıştırır. Playwright'ta 'project' kavramı, belirli tarayıcı ve cihaz yapılandırmalarını kapsar.",
            en: "`npx playwright test --project=chromium` runs only the Chromium project profile. In Playwright, a 'project' maps to a browser and device configuration combination."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript ekosistemi, bir şehir altyapısı gibidir: npm paket deposu şehrin toptancı pazarı, package.json şehrin tedarik listesi, Webpack/Vite şehrin inşaat firması (her şeyi paketler ve dağıtır), ESLint şehrin belediye denetçisi (kod standartlarını kontrol eder), Prettier ise şehrin temizlik ekibi.",
          en: "The JavaScript ecosystem is like city infrastructure: npm registry is the wholesale market, package.json is the city's procurement list, Webpack/Vite is the construction company (bundles and ships everything), ESLint is the city building inspector (enforces code standards), Prettier is the city cleaning crew."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Webpack ve Vite, LEGO setlerini kutuya paketleyen iki farklı fabrika gibidir. Webpack, her parçayı tek tek titizlikle paketler (yavaş ama esnek). Vite ise modern LEGO fabrikası — ESM modülleri doğrudan kullanır, geliştirme sürecinde neredeyse anında hazır.",
          en: "Webpack and Vite are two different LEGO packaging factories. Webpack meticulously packs each piece individually (slower but highly configurable). Vite is the modern LEGO factory — uses ESM modules natively, nearly instant during development."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "ESLint kuralları, LEGO kalite kontrol kılavuzu gibidir: kılavuz parçaların hangi ölçülerde, renklerde ve şekillerde olacağını belirler. Her geliştirici kılavuza uyarsa, tüm ekibin ürettiği parçalar birbirine uyumlu olur.",
          en: "ESLint rules are like a LEGO quality control handbook: the handbook specifies which dimensions, colors, and shapes are acceptable. When every developer follows the handbook, all team members' output fits together perfectly."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden bundler (Webpack/Vite) gerekli? Tarayıcılar yüzlerce ayrı JS dosyasını indirmekte yavaşlar (HTTP/1.1'de her istek yeni bağlantı). Bundler, tüm dosyaları tek veya birkaç büyük dosyada birleştirir ve tree-shaking ile kullanılmayan kodları çıkarır — son paket hem küçük hem hızlı olur.",
          en: "Why do we need bundlers (Webpack/Vite)? Browsers are slow at loading hundreds of separate JS files (each HTTP/1.1 request is a new connection). Bundlers merge all files into one or a few large files, and tree-shaking removes unused code — the final bundle is small and fast."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden TypeScript JS ekosisteminde bu kadar yaygınlaştı? Büyük projelerde tip güvenliği (type safety) olmadan refactoring tehlikelidir, IDE desteği zayıftır, runtime hatalar geç ortaya çıkar. TypeScript bu sorunları derleme zamanında çözer ve kod tabanını daha anlaşılır kılar — Playwright varsayılan olarak TypeScript'i destekler.",
          en: "Why has TypeScript become so prevalent in the JS ecosystem? In large projects, refactoring without type safety is risky, IDE support is poor, and runtime errors surface too late. TypeScript solves these at compile time and makes the codebase more understandable — Playwright supports TypeScript by default."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain npm and package.json to someone who has never written code, like a grocery shopping list. What are the 3 most important steps when setting up a Playwright project?",
        promptTr: "🤖 Mini Kahraman Soruyor: npm ve package.json'u hiç yazılım yazmamış birine bir market sepeti veya market alışverişi gibi anlat. Playwright projesi kurarken en önemli 3 adım nedir?",
        keywords: [
              ["paket", "package"],
              ["kütüphane", "library"],
              ["indir", "download"],
              "npm",
              "playwright",
              ["kurulum", "install"],
              ["tarayıcı", "browser"],
              "test",
              ["proje", "project"],
              ["install", "setup"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 12 — Errors & Debugging
  // ─────────────────────────────────────────────
  {
    title: { tr: "Hatalar & Debugging", en: "Errors & Debugging" },
    blocks: [
      {
        type: "css-animation",
        kind: "errors",
        label: { tr: "TypeError → Optional Chain ile Düzeltme", en: "TypeError → Fix with Optional Chaining" }
      },
      {
        type: "simple-box",
        emoji: "🐛",
        content: {
          tr: "Hatalar korkutucu değildir! Kırmızı hata mesajları bize kodumuzda neyi düzeltmemiz gerektiğini söyleyen arkadaş canlısı ipuçlarıdır. Şimdi en sık karşılaşılan JavaScript hatalarını ve `try-catch` bloklarını nasıl kullanacağımızı öğrenelim.",
          en: "Errors are not scary! Red error messages are just friendly hints showing us what to fix. Let's learn the most common JavaScript errors and how to handle them using `try-catch` blocks."
        }
      },
      {
        type: "error-dictionary",
        errors: [
          {
            code: "TypeError: Assignment to constant variable",
            description: {
              tr: "const ile tanımlanmış bir değişkene yeni bir değer atamaya çalıştığınızda oluşur.",
              en: "Occurs when trying to reassign a value to a variable declared with const."
            },
            fix: {
              tr: "Değişkenin değerinin değişmesi gerekiyorsa let ile tanımlayın.",
              en: "If the value needs to change over time, declare the variable with let instead."
            }
          },
          {
            code: "ReferenceError: x is not defined",
            description: {
              tr: "Tanımlanmamış veya o anki kapsamda (scope) bulunmayan bir değişkene erişilmeye çalışıldığında oluşur.",
              en: "Thrown when accessing a variable that has not been declared or is out of scope."
            },
            fix: {
              tr: "Değişkenin adını kontrol edin ve let/const ile tanımlandığından emin olun.",
              en: "Check the variable name spelling or verify it was declared using let/const."
            }
          },
          {
            code: "TypeError: Cannot read properties of undefined (reading 'click')",
            description: {
              tr: "Bulunamayan veya tanımsız (undefined) bir elemanın üzerinden fonksiyon çağrıldığında oluşur (Java'daki NullPointerException).",
              en: "Occurs when invoking a method on an undefined object (similar to Java's NullPointerException)."
            },
            fix: {
              tr: "Elementi bulup bulamadığınızı (örneğin locator'ın geçerliliğini ve bekleme süresini) kontrol edin.",
              en: "Verify that the locator matches an active element and that proper waits are used before action."
            }
          },
          {
            code: "SyntaxError: Unexpected token '<'",
            description: {
              tr: "JSON.parse() ile HTML içeriğini parse etmeye çalışıldığında oluşur. API 404 veya hata sayfası döndürdüğünde JSON yerine HTML gelir.",
              en: "Thrown when JSON.parse() encounters HTML content. The API returned a 404 page or error HTML instead of a proper JSON response."
            },
            fix: {
              tr: "`response.ok` kontrolü ekleyin. `Content-Type: application/json` header'ını doğrulayın, ardından parse edin.",
              en: "Check `response.ok` before parsing. Validate the `Content-Type: application/json` header before calling JSON.parse()."
            }
          },
          {
            code: "TypeError: x is not a function",
            description: {
              tr: "Fonksiyon olmayan bir değer (sayı, string, undefined) üzerinde parantezle çağrı yapıldığında oluşur.",
              en: "Thrown when a non-function value (number, string, undefined) is invoked with parentheses as if it were a function."
            },
            fix: {
              tr: "`typeof myFn === 'function'` koruması ekleyin veya değişken adının doğru yazıldığını kontrol edin.",
              en: "Add `typeof myFn === 'function'` guard before the call, or verify the variable name is correctly spelled."
            }
          },
          {
            code: "RangeError: Maximum call stack size exceeded",
            description: {
              tr: "Sonsuz özyineleme (infinite recursion) sonucunda çağrı yığını (call stack) taşar. Java'daki StackOverflowError'ın birebir karşılığıdır.",
              en: "Thrown when infinite recursion overflows the call stack. Equivalent to Java's StackOverflowError."
            },
            fix: {
              tr: "Rekürsif fonksiyona doğru bir taban koşulu (base case) ekleyin veya döngüye (iterative loop) çevirin.",
              en: "Add a proper base case to the recursive function, or convert the recursion to an iterative loop."
            }
          },
          {
            code: "UnhandledPromiseRejection: Promise rejected without .catch()",
            description: {
              tr: "Reddedilen (rejected) bir Promise, `.catch()` veya `try/catch` ile yakalanmadığında fırlatılır. CI pipeline'da sessizce test geçmesine yol açan en sık hatalardan biridir.",
              en: "Thrown when a rejected Promise is not caught by a `.catch()` or `try/catch` block. One of the most common causes of false-pass tests in CI."
            },
            fix: {
              tr: "`async/await` kullanan tüm kod bloklarını `try/catch` ile sarın; `.then()` zincirlerine mutlaka `.catch()` ekleyin.",
              en: "Wrap all `async/await` blocks in `try/catch`, and always chain `.catch()` to every Promise `.then()` handler."
            }
          },
          {
            code: "TypeError: Cannot set properties of null",
            description: {
              tr: "DOM sorgusu null dönen (bulunamayan) bir elementin özelliğini değiştirmeye çalışıldığında oluşur.",
              en: "Occurs when attempting to mutate a property on a null value, meaning the DOM query returned no matching element."
            },
            fix: {
              tr: "Değiştirmeden önce `if (element !== null)` kontrolü veya optional chaining operatörü `element?.style.color` kullanın.",
              en: "Guard with `if (element !== null)` before mutation, or use the optional chaining operator: `element?.style.color`."
            }
          },
          {
            code: "Error: Timeout — Locator not found within 30000ms",
            description: {
              tr: "Playwright/Selenium'da bir locator belirlenen süre içinde DOM'da görünür hale gelmediğinde otomasyon testinin fırlattığı hata. En sık karşılaşılan test flakiness (güvensizlik) kaynağıdır.",
              en: "Thrown by Playwright/Selenium when a locator does not become visible within the configured timeout. One of the most frequent causes of test flakiness in automation suites."
            },
            fix: {
              tr: "Selector'ın güncel ve geçerli olduğunu doğrulayın. Gerekirse `waitFor` süresini artırın; asenkron yükleme varsa uygun `expect(...).toBeVisible()` beklemesi ekleyin.",
              en: "Verify the selector is accurate and up-to-date. Increase `waitFor` timeout if needed, and add proper `expect(...).toBeVisible()` waits for async-loaded elements."
            }
          }
        ]
      },
      {
        type: "heading",
        content: { tr: "Hata Yakalama (Try-Catch)", en: "Error Handling (Try-Catch)" }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Hatalı kodları try-catch ile kontrol altına edin!
try {
  console.log("Adım A: Normal İşlem.");
  let x = y; // y tanımlı değil, ReferenceError fırlayacak!
  console.log("Adım B: Burası çalışmayacak.");
} catch (error) {
  console.log("Hata Yakalandı! Mesaj:", error.message);
} finally {
  console.log("Adım C: Burası her halükarda çalışır (Temizlik aşaması).");
}`,
          en: `// Guard risky code statements using try-catch blocks!
try {
  console.log("Step A: Normal Action.");
  let x = y; // y is not defined, throws ReferenceError!
  console.log("Step B: This line is bypassed.");
} catch (error) {
  console.log("Error Intercepted! Message:", error.message);
} finally {
  console.log("Step C: This block always executes (Teardown phase).");
}`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te çalışma zamanında oluşabilecek hataları yakalamak ve test akışının çökmesini engellemek için hangi blok kullanılır?",
          en: "Which syntax block is used to catch runtime exceptions and prevent the test runner from crashing?"
        },
        options: [
          { id: "a", text: "if...else" },
          { id: "b", text: "switch...case" },
          { id: "c", text: "try...catch" },
          { id: "d", text: "throw...error" }
        ],
        correct: "c",
        explanation: {
          tr: "`try...catch` yapısı sayesinde korumasız kodlar `try` içine alınır ve bir hata fırlatıldığında `catch` bloğu çalışarak uygulamanın/testin kontrollü devam etmesini sağlar.",
          en: "`try...catch` runs risky expressions in the `try` block, routing any thrown exception into `catch` to prevent execution crashes."
        },
        retryQuestion: {
          question: {
            tr: "İsteğe bağlı olarak kod içinde özel bir hata (custom exception/error) fırlatmak için hangi anahtar kelime kullanılır?",
            en: "Which keyword is used to explicitly throw a custom exception or error in JavaScript?"
          },
          options: [
            { id: "a", text: "catch" },
            { id: "b", text: "throw" },
            { id: "c", text: "raise" },
            { id: "d", text: "reject" }
          ],
          correct: "b",
          explanation: {
            tr: "`throw` anahtar kelimesi, çalışma zamanında manuel olarak bir hata nesnesi oluşturup fırlatılmasını sağlar (Örn: `throw new Error('Element bulunamadı');`).",
            en: "The `throw` keyword manually spawns and outputs a runtime error (e.g., `throw new Error('Element missing');`)."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript'te `try/catch` bloğu, bir yangın tatbikatı gibidir: normal işlem `try` bölgesinde sürer, bir şeyler ters giderse `catch` yangın çıkışından kaçış planını devreye sokar, `finally` ise yanmış olsa da olmasa da kapıları kilitleyip ışıkları kapatır (temizlik işlemi).",
          en: "JavaScript's `try/catch` block is like a fire drill: normal operation continues in `try`, if something goes wrong `catch` activates the emergency exit plan, and `finally` locks the doors and turns off the lights regardless of whether there was a fire (cleanup always runs)."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Hata türleri (Error types), LEGO setindeki farklı arıza kategorileri gibidir: `TypeError` yanlış parça takılmaya çalışıldığında (yanlış tip), `ReferenceError` hiç olmayan parça istendiğinde (tanımsız değişken), `SyntaxError` talimat kitapçığındaki yazım hatası (geçersiz sözdizimi).",
          en: "Error types are like different failure categories in a LEGO build: `TypeError` when you try to attach the wrong piece type, `ReferenceError` when you ask for a piece that doesn't exist (undefined variable), `SyntaxError` when the instruction booklet has a typo (invalid syntax)."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Custom Error sınıfları, standart LEGO hata raporlarını özelleştirmek gibidir: `class ApiError extends Error` yazmak, standart hata formuna şirket logon'u ve API endpoint bilgisini eklemeye benzer — hangi servisin, hangi endpoint'te, hangi kodla başarısız olduğu anında görünür.",
          en: "Custom Error classes are like customizing standard LEGO fault reports: writing `class ApiError extends Error` is like adding your company logo and API endpoint field to the standard form — which service, which endpoint, which status code failed is immediately visible."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `throw new Error()` yerine doğrudan string fırlatmak kötü pratik? `throw \"hata mesajı\"` yazmak, stack trace (hata izi) sağlamaz. `throw new Error(\"mesaj\")` ise hangi fonksiyonun, hangi satırda başarısız olduğunu Stack Trace ile gösterir — debug süresi dramatiğe azalır.",
          en: "Why is throwing a plain string instead of `throw new Error()` bad practice? `throw \"error message\"` provides no stack trace. `throw new Error(\"message\")` shows exactly which function, on which line, failed — dramatically reducing debug time. Always throw proper Error objects."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `finally` bloku her zaman çalışır? `finally`, test temizliği (teardown) için kritiktir: veritabanı bağlantısını kapat, dosyayı sil, browser'ı kapat gibi işlemler test başarılı da olsa başarısız da olsa çalışmalıdır. Java'daki `finally` ile birebir aynı konsept — Playwright'ta `afterEach` hook da aynı amacı güder.",
          en: "Why does `finally` always run? `finally` is critical for test teardown: closing database connections, deleting files, closing the browser must happen whether the test passed or failed. Identical concept to Java's `finally` — Playwright's `afterEach` hook serves the same purpose."
        }
      },
      {
        type: "quiz",
        question: { tr: "Aşağıdaki kodda `finally` bloğu ne zaman çalışır?\n```js\ntry { throw new Error(\"hata\"); } catch(e) { console.log(\"yakalandı\"); } finally { console.log(\"temizlik\"); }\n```", en: "When does the `finally` block run?\n```js\ntry { throw new Error(\"error\"); } catch(e) { console.log(\"caught\"); } finally { console.log(\"cleanup\"); }\n```" },
        options: [
          { id: "a", text: { tr: "Yalnızca hata yoksa", en: "Only if there is no error" } },
          { id: "b", text: { tr: "Yalnızca hata varsa", en: "Only if there is an error" } },
          { id: "c", text: { tr: "Her zaman — hata olsa da olmasa da", en: "Always — whether or not an error occurred" } },
          { id: "d", text: { tr: "Hiçbir zaman — throw sonrası ulaşılamaz", en: "Never — unreachable after throw" } }
        ],
        correct: "c",
        explanation: { tr: "`finally` bloğu HER ZAMAN çalışır: `try` başarılı olsa da, `catch` tetiklense de. Bu, veritabanı bağlantısı kapatma veya dosya temizleme gibi zorunlu temizlik işlemleri için mükemmeldir.", en: "`finally` ALWAYS runs: whether `try` succeeds or `catch` triggers. This makes it perfect for mandatory cleanup like closing database connections or deleting temp files." },
        retryQuestion: {
          question: { tr: "Özel hata sınıfı oluşturmak için hangi sözdizimi kullanılır?", en: "What syntax creates a custom error class?" },
          options: [
            { id: "a", text: "class MyError implements Error {}" },
            { id: "b", text: "class MyError extends Error { constructor(msg) { super(msg); } }" },
            { id: "c", text: "function MyError() {}" },
            { id: "d", text: "const MyError = new Error()" }
          ],
          correct: "b",
          explanation: { tr: "`class MyError extends Error` ile Error sınıfından kalıtım alırsın. `super(msg)` çağrısı temel Error sınıfının constructor'ını çalıştırır ve `message`, `stack` özelliklerini ayarlar.", en: "`class MyError extends Error` inherits from the Error class. `super(msg)` runs the base Error constructor, setting the `message` and `stack` properties automatically." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Why do we use try-catch? Why is catching errors in automation tests important? What do you think about learning to read error messages?",
        promptTr: "🤖 Mini Kahraman Soruyor: try-catch bloğunu neden kullanırız? Bir otomasyon testinde hata yakalamak neden önemlidir? Hata mesajlarını okumayı öğrenmek hakkında ne düşünüyorsun?",
        keywords: [
              ["hata", "error"],
              ["yakalamak", "catch"],
              "try",
              ["catch", "crash"],
              ["çökme", "safe"],
              ["güvenli", "message"],
              ["mesaj", "control"],
              ["kontrol", "continue"],
              ["devam", "prevent"],
              ["önlem", "handle"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 13 — DOM Events
  // ─────────────────────────────────────────────
  {
    title: { tr: "DOM Olayları (Events)", en: "DOM Events" },
    blocks: [
      {
        type: "css-animation",
        kind: "events",
        label: { tr: "Event Bubbling — Olayın DOM Ağacında Yukarı Yayılması", en: "Event Bubbling — Event propagates up the DOM tree" }
      },
      {
        type: "simple-box",
        emoji: "🎯",
        content: {
          tr: "DOM eventleri, kullanıcının bir butona tıklaması, klavyeden bir şey yazması veya fareyi hareket ettirmesi gibi eylemler gerçekleştiğinde tetiklenen mesajlardır. Tıpkı kapı zilinin çalınması (event), kapıcının gelmesi (listener) ve kapıyı açması (handler) gibi bir zincirdir. Java'da ActionListener kullanırdık; JavaScript'te ise addEventListener çok daha sade ve güçlüdür.",
          en: "DOM events are messages triggered when the user does something — clicking a button, typing, or moving the mouse. Think of it like a doorbell ringing (event), the doorman arriving (listener), and opening the door (handler). In Java we'd use ActionListener; in JavaScript addEventListener is far simpler and more powerful."
        }
      },
      {
        type: "heading",
        content: { tr: "En Sık Kullanılan Event Tipleri", en: "Most Common Event Types" }
      },
      {
        type: "table",
        headers: [
          { tr: "Event", en: "Event" },
          { tr: "Ne Zaman Tetiklenir?", en: "When Triggered?" },
          { tr: "QA Kullanımı", en: "QA Usage" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          ["click",       { tr: "Element tıklandığında", en: "On element click" },              { tr: "Buton, link testi", en: "Button, link test" },           "ActionListener"],
          ["dblclick",    { tr: "Çift tıklandığında", en: "On double click" },                 { tr: "Tablo satırı seçimi", en: "Table row selection" },        "MouseListener"],
          ["change",      { tr: "Input değeri değiştiğinde", en: "On input value change" },    { tr: "Dropdown, checkbox testi", en: "Dropdown, checkbox test" }, "ItemListener"],
          ["input",       { tr: "Her tuş vuruşunda", en: "On every keystroke" },               { tr: "Canlı arama kutusu", en: "Live search box" },             "KeyListener"],
          ["keydown",     { tr: "Tuşa basıldığında", en: "On key press" },                     { tr: "Klavye kısayol testi", en: "Keyboard shortcut test" },    "KeyListener"],
          ["submit",      { tr: "Form gönderildiğinde", en: "On form submit" },                { tr: "Form doğrulama testi", en: "Form validation test" },       "ActionListener"],
          ["focus/blur",  { tr: "Element odaklandı/odak kaybetti", en: "On focus/blur" },      { tr: "Input validasyon testi", en: "Input validation test" },    "FocusListener"],
          ["mouseover",   { tr: "Fare üstüne geldiğinde", en: "On mouse hover" },              { tr: "Tooltip görünürlük testi", en: "Tooltip visibility test" }, "MouseMotionListener"]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "addEventListener — Temel Kullanım", en: "addEventListener — Basic Usage" },
        content: {
          tr: `// ─── addEventListener sözdizimi ──────────────────────────────
// element.addEventListener(eventType, handler, useCapture=false)

// 1. Buton tıklama — en yaygın kullanım
const btn = document.querySelector('#submit-btn');
btn.addEventListener('click', function(event) {
  console.log('Tıklandı! Hedef element:', event.target.id);
  event.preventDefault(); // Formun otomatik gönderilmesini önle
});

// 2. Arrow function (daha kısa — Playwright testlerinde standart)
btn.addEventListener('click', (e) => {
  console.log('Element tipi:', e.type, '| X,Y:', e.clientX, e.clientY);
});

// 3. Input olay takibi (canlı form doğrulama)
const emailInput = document.querySelector('#email');
emailInput.addEventListener('input', (e) => {
  const val = e.target.value;
  const isValid = val.includes('@');
  console.log('E-posta geçerli mi?', isValid ? '✅' : '❌');
});

// 4. Dinleyiciyi kaldırma (bellek sızıntısını önler)
function handleClick(e) { console.log('Tıklandı'); }
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick); // temizle`,
          en: `// ─── addEventListener syntax ─────────────────────────────────
// element.addEventListener(eventType, handler, useCapture=false)

// 1. Button click — most common usage
const btn = document.querySelector('#submit-btn');
btn.addEventListener('click', function(event) {
  console.log('Clicked! Target element:', event.target.id);
  event.preventDefault(); // prevent form auto-submit
});

// 2. Arrow function (shorter — standard in Playwright tests)
btn.addEventListener('click', (e) => {
  console.log('Event type:', e.type, '| X,Y:', e.clientX, e.clientY);
});

// 3. Input event tracking (live form validation)
const emailInput = document.querySelector('#email');
emailInput.addEventListener('input', (e) => {
  const val = e.target.value;
  const isValid = val.includes('@');
  console.log('Email valid?', isValid ? '✅' : '❌');
});

// 4. Removing a listener (prevents memory leaks)
function handleClick(e) { console.log('Clicked'); }
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick); // clean up`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "200px",
        defaultCode: {
          tr: `// Event simülasyonu — sadece console ile çalışır
const mockElement = {
  _listeners: {},
  addEventListener(type, fn) {
    this._listeners[type] = fn;
    console.log("✅ Dinleyici eklendi:", type);
  },
  trigger(type, data = {}) {
    if (this._listeners[type]) {
      this._listeners[type]({ type, target: this, ...data });
    }
  }
};

mockElement.addEventListener('click', (e) => {
  console.log("Tıklama yakalandı! Event tipi:", e.type);
});

mockElement.trigger('click', { clientX: 100, clientY: 200 });`,
          en: `// Event simulation — works with console only
const mockElement = {
  _listeners: {},
  addEventListener(type, fn) {
    this._listeners[type] = fn;
    console.log("✅ Listener added:", type);
  },
  trigger(type, data = {}) {
    if (this._listeners[type]) {
      this._listeners[type]({ type, target: this, ...data });
    }
  }
};

mockElement.addEventListener('click', (e) => {
  console.log("Click captured! Event type:", e.type);
});

mockElement.trigger('click', { clientX: 100, clientY: 200 });`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir butonun tıklama olayını dinlemek için doğru yöntem hangisidir?",
          en: "Which is the correct way to listen for a button click event?"
        },
        options: [
          { id: "a", text: `btn.on('click', fn)` },
          { id: "b", text: `btn.addEventListener('click', fn)` },
          { id: "c", text: `btn.listen('click', fn)` },
          { id: "d", text: `btn.onclick = 'fn()'` }
        ],
        correct: "b",
        explanation: {
          tr: "`addEventListener` modern JavaScript'in standart event dinleme yöntemidir. Aynı elemente birden fazla listener eklenebilir ve `removeEventListener` ile temizlenebilir. `onclick = fn` ise yalnızca tek bir handler tanımına izin verir.",
          en: "`addEventListener` is the modern standard for event binding. Multiple listeners can be attached to the same element and cleanly removed with `removeEventListener`. Using `onclick = fn` is the legacy approach, allowing only one handler at a time."
        },
        retryQuestion: {
          question: {
            tr: "Bir form submit olayında `event.preventDefault()` ne işe yarar?",
            en: "What does `event.preventDefault()` do in a form submit handler?"
          },
          options: [
            { id: "a", text: { tr: "Event dinleyiciyi siler", en: "Removes the event listener" } },
            { id: "b", text: { tr: "Sayfanın yeniden yüklenmesini veya formun varsayılan gönderimini engeller", en: "Prevents the page from reloading or the form from submitting by default" } },
            { id: "c", text: { tr: "JavaScript çalışmasını tamamen durdurur", en: "Stops all JavaScript execution" } },
            { id: "d", text: { tr: "Formu siler", en: "Deletes the form" } }
          ],
          correct: "b",
          explanation: {
            tr: "`event.preventDefault()`, tarayıcının olay için yapacağı varsayılan eylemi (form submit'te sayfa yenileme, link'te navigate) iptal eder. Otomasyon testlerinde form gönderim davranışını kontrol etmek için kullanılır.",
            en: "`event.preventDefault()` cancels the browser's default response to the event (page reload on form submit, navigation on link click). It is commonly used in automation tests to intercept form submissions without triggering page navigation."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Playwright'ta bir form inputuna değer yazıp ardından 'change' event'ini tetiklemek için hangi metod kullanılır?",
          en: "Which Playwright method types into a form input and triggers its change event?"
        },
        options: [
          { id: "a", text: `page.fill('#input', 'value')` },
          { id: "b", text: `page.type('#input', 'value')` },
          { id: "c", text: `page.setValue('#input', 'value')` },
          { id: "d", text: `page.input('#input', 'value')` }
        ],
        correct: "a",
        explanation: {
          tr: "`page.fill()` seçilen input'u temizleyip verilen değeri yazar ve change/input event'lerini otomatik tetikler. `page.type()` ise karakter karakter yazar ve her tuş basışında keydown/keypress/keyup event'lerini tetikler; autocomplete alanları için tercih edilir.",
          en: "`page.fill()` clears and types the given value, automatically triggering change/input events. `page.type()` types character-by-character, firing keydown/keypress/keyup per character — preferred for testing autocomplete inputs."
        },
        retryQuestion: {
          question: {
            tr: "Bir elementin üzerinde klavye tuşuna basma olayını simüle etmek için hangi Playwright metodu kullanılır?",
            en: "Which Playwright method simulates pressing a keyboard key on an element?"
          },
          options: [
            { id: "a", text: `page.keyboard.press('Enter')` },
            { id: "b", text: `page.press('#el', 'Enter')` },
            { id: "c", text: { tr: "Her ikisi de doğrudur", en: "Both are correct" } },
            { id: "d", text: `page.keydown('Enter')` }
          ],
          correct: "c",
          explanation: {
            tr: "Playwright'ta klavye tuşu simülasyonu için hem `page.keyboard.press('Enter')` (global klavye) hem de `page.press('selector', 'Enter')` (belirli element üzerinde) kullanılabilir.",
            en: "Both `page.keyboard.press('Enter')` (global keyboard action) and `page.press('selector', 'Enter')` (element-focused action) are valid Playwright methods for simulating keyboard events."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "DOM event sistemi, bir apartmanın zil sistemi gibidir: `addEventListener` her kapıya zil düğmesi takmak, callback ise biri zile bastığında yapılacaklar listesi. Event delegation ise sadece apartmanın ana girişine bir güvenlik kamerası koymak ve tüm sakinlerin girişini buradan izlemek — her daire kapısına ayrı kamera gerekmez.",
          en: "The DOM event system is like an apartment intercom: `addEventListener` installs a doorbell button on every door, the callback is the list of things to do when someone rings. Event delegation is like putting one security camera at the main entrance only — monitoring all residents from one point instead of installing cameras at every apartment door."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Event delegation, tüm LEGO parçalarını tek bir büyük kutuya koyup kutu üzerindeki etiketle hangi parçanın tıklandığını anlamak gibidir: her parçaya ayrı izleyici (listener) yerine, kutuya tek listener bağlarsın ve `event.target` ile hangi parçaya tıklandığını öğrenirsin.",
          en: "Event delegation is like putting all LEGO pieces in one big labeled box and knowing which piece was touched by reading its label: instead of attaching a separate listener to each piece, you attach one listener to the box and read `event.target` to find out which piece was touched."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Event propagation (kabarcıklanma/capturing), bir LEGO kulesinde tıklama gibidir: en üst katı tıkladığında, event altındaki tüm katlardan da geçer (bubbling). `event.stopPropagation()` ise bir kattaki güvenlik kapısı — event o kattan aşağı inmesini engeller.",
          en: "Event propagation (bubbling/capturing) is like clicking a LEGO tower: clicking the top floor sends the click event through every floor below (bubbling). `event.stopPropagation()` is a security door at one floor — it prevents the event from traveling further down."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `addEventListener` yerine `onclick` HTML attribute'u kötü pratik? `onclick` HTML attribute'u yalnızca tek bir handler bağlamanıza izin verir — ikinci `onclick` birincinin üzerine yazar. `addEventListener` ile aynı elemente istediğiniz kadar handler ekleyebilirsiniz ve JavaScript'i HTML'den ayırır (separation of concerns).",
          en: "Why is the `onclick` HTML attribute bad practice compared to `addEventListener`? `onclick` only allows one handler — a second assignment overwrites the first. `addEventListener` lets you attach as many handlers as needed to the same element and separates JavaScript from HTML (separation of concerns)."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden event listener'ları temizlemek (removeEventListener) önemli? Bir elemente bağlı event listener, o element DOM'dan kaldırılsa bile garbage collected olmaz. Özellikle SPA (Single Page Application) geçişlerinde eski sayfadan kalan listener'lar memory leak yaratır. Test teardown sırasında ekleyip unuttuğun listener'lar testi kirletebilir.",
          en: "Why is cleaning up event listeners (removeEventListener) important? An event listener attached to an element prevents garbage collection even after the element is removed from the DOM. In SPAs (Single Page Applications), leftover listeners from old pages create memory leaks. In test teardown, forgotten listeners from setup can contaminate other tests."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain addEventListener and DOM events like a doorbell or alarm system. Why are click and input events critical in automation testing?",
        promptTr: "🤖 Mini Kahraman Soruyor: addEventListener'ı ve DOM eventlerini bir kapı zili sistemi veya alarm sistemi gibi anlat. Otomasyon testlerinde neden click ve input olayları kritik?",
        keywords: [
              ["olay", "event"],
              ["dinle", "listen"],
              ["tıkla", "click"],
              ["tetikle", "trigger"],
              ["event", "listener"],
              ["click", "input"],
              ["listener", "response"],
              ["input", "simulate"],
              ["tepki", "fire"],
              ["simüle", "handler"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 14 — Dates
  // ─────────────────────────────────────────────
  {
    title: { tr: "Tarih & Zaman (Date)", en: "Dates & Time" },
    blocks: [
      {
        type: "css-animation",
        kind: "dates",
        label: { tr: "JavaScript Date — Takvim + Kronometre", en: "JavaScript Date — Calendar + Stopwatch" }
      },
      {
        type: "simple-box",
        emoji: "📅",
        content: {
          tr: "JavaScript'te Date nesnesi bir takvim + saat kombinasyonudur. Test otomasyonunda tarihlerle çok işimiz var: raporlardaki timestamp'leri doğrularız, 'son 30 gün içinde kayıt olan kullanıcı' gibi filtreleri test ederiz, token son kullanma tarihlerini kontrol ederiz. Java'daki `LocalDateTime` veya `Calendar` neyse burada `Date` o.",
          en: "The JavaScript Date object combines a calendar and a clock. In test automation we frequently work with dates: validating report timestamps, testing 'registered in last 30 days' filters, checking token expiry. Java's `LocalDateTime` or `Calendar` is what the JS `Date` object is here."
        }
      },
      {
        type: "table",
        headers: [
          { tr: "Metot", en: "Method" },
          { tr: "Ne Döner?", en: "Returns" },
          { tr: "Örnek", en: "Example" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          ["new Date()",          { tr: "Şu anki tarih/saat", en: "Current date/time" },           "new Date()",                               "LocalDateTime.now()"],
          ["new Date(ms)",        { tr: "Epoch ms'den Date üretir", en: "Date from epoch ms" },     "new Date(0)",                              "Instant.ofEpochMilli(0)"],
          [".getFullYear()",      { tr: "4 haneli yıl", en: "4-digit year" },                       "d.getFullYear() → 2025",                   ".getYear()"],
          [".getMonth()",         { tr: "Ay (0-11!)", en: "Month (0-11!)" },                        "d.getMonth() + 1 → gerçek ay",             ".getMonthValue() - 1"],
          [".getDate()",          { tr: "Ayın günü (1-31)", en: "Day of month (1-31)" },            "d.getDate() → 15",                         ".getDayOfMonth()"],
          [".getTime()",          { tr: "Epoch ms (Unix timestamp)", en: "Epoch ms (Unix timestamp)" }, "d.getTime() → 1700000000000",         ".toEpochMilli()"],
          [".toISOString()",      { tr: "ISO 8601 string", en: "ISO 8601 string" },                 `"2025-01-15T10:30:00.000Z"`,               ".format(DateTimeFormatter.ISO_INSTANT)"],
          [".toLocaleDateString()", { tr: "Yerel formatlı tarih", en: "Locale-formatted date" },   `"1/15/2025"`,                              ".format(DateTimeFormatter.ofLocalizedDate())"],
          ["Date.now()",          { tr: "Şu anki epoch ms (statik)", en: "Current epoch ms (static)" }, "Date.now()",                         "System.currentTimeMillis()"]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Tarih Karşılaştırma — QA Senaryosu", en: "Date Comparison — QA Scenario" },
        content: {
          tr: `// ─── Şu anki tarihi al ───────────────────────────────────────
const now = new Date();
console.log("Şu an:", now.toISOString());  // 2025-06-24T...

// ─── Tarihler arası gün farkı hesapla ────────────────────────
function daysBetween(d1, d2) {
  const ms = Math.abs(d2 - d1);            // milisaniye farkı
  return Math.floor(ms / (1000 * 60 * 60 * 24)); // gün'e çevir
}

const created = new Date('2025-06-01');
const today   = new Date();
console.log("Geçen gün:", daysBetween(created, today));

// ─── Token expiry kontrolü (30 dakika sonra geçersiz) ────────
const tokenCreated = new Date();
const expiry = new Date(tokenCreated.getTime() + 30 * 60 * 1000);
const isExpired = new Date() > expiry;
console.log("Token süresi dolmuş mu?", isExpired ? "Evet" : "Hayır");

// ─── Uyarı: getMonth() 0-indexed! ────────────────────────────
const d = new Date('2025-03-15');
console.log("Ay (yanlış):", d.getMonth());     // 2 (Mart = index 2!)
console.log("Ay (doğru):",  d.getMonth() + 1); // 3 ✅`,
          en: `// ─── Get current date ───────────────────────────────────────
const now = new Date();
console.log("Now:", now.toISOString());  // 2025-06-24T...

// ─── Calculate days between two dates ────────────────────────
function daysBetween(d1, d2) {
  const ms = Math.abs(d2 - d1);            // difference in milliseconds
  return Math.floor(ms / (1000 * 60 * 60 * 24)); // convert to days
}

const created = new Date('2025-06-01');
const today   = new Date();
console.log("Days elapsed:", daysBetween(created, today));

// ─── Token expiry check (invalid after 30 minutes) ───────────
const tokenCreated = new Date();
const expiry = new Date(tokenCreated.getTime() + 30 * 60 * 1000);
const isExpired = new Date() > expiry;
console.log("Token expired?", isExpired ? "Yes" : "No");

// ─── Warning: getMonth() is 0-indexed! ───────────────────────
const d = new Date('2025-03-15');
console.log("Month (wrong):", d.getMonth());     // 2 (March = index 2!)
console.log("Month (correct):",  d.getMonth() + 1); // 3 ✅`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Tarih manipülasyonunu deneyin!
const now = new Date();
console.log("Tarih:", now.toLocaleDateString('tr-TR'));
console.log("Saat:", now.toLocaleTimeString('tr-TR'));
console.log("Yıl:", now.getFullYear());
console.log("Ay (1-12):", now.getMonth() + 1);
console.log("Gün:", now.getDate());

// 7 gün sonrasını hesapla
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
console.log("7 gün sonra:", nextWeek.toLocaleDateString('tr-TR'));`,
          en: `// Try date manipulation!
const now = new Date();
console.log("Date:", now.toLocaleDateString('en-US'));
console.log("Time:", now.toLocaleTimeString('en-US'));
console.log("Year:", now.getFullYear());
console.log("Month (1-12):", now.getMonth() + 1);
console.log("Day:", now.getDate());

// Calculate 7 days from now
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
console.log("7 days later:", nextWeek.toLocaleDateString('en-US'));`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te `new Date().getMonth()` Ocak (January) için ne döner?",
          en: "What does `new Date().getMonth()` return for January?"
        },
        options: [
          { id: "a", text: "1" },
          { id: "b", text: "0" },
          { id: "c", text: "January" },
          { id: "d", text: "01" }
        ],
        correct: "b",
        explanation: {
          tr: "`getMonth()` 0'dan başlar (0-indexed): Ocak=0, Şubat=1, ..., Aralık=11. Gerçek ay numarasını almak için her zaman `getMonth() + 1` yapılmalıdır. Bu, Java'da `Calendar.JANUARY == 0` olan benzer tarihsel hatadır.",
          en: "`getMonth()` is zero-indexed: January=0, February=1, ..., December=11. Always add 1 to get the human-readable month number. This mirrors Java's `Calendar.JANUARY == 0` legacy quirk."
        },
        retryQuestion: {
          question: {
            tr: "İki Date nesnesi arasındaki milisaniye farkını bulmak için hangi yöntem kullanılır?",
            en: "How do you find the millisecond difference between two Date objects?"
          },
          options: [
            { id: "a", text: "date1.diff(date2)" },
            { id: "b", text: "date1 - date2" },
            { id: "c", text: "Date.compare(date1, date2)" },
            { id: "d", text: "date1.minus(date2)" }
          ],
          correct: "b",
          explanation: {
            tr: "JavaScript'te Date nesneleri karşılaştırıldığında veya aritmetik yapıldığında otomatik olarak milisaniyeye (.getTime()) dönüştürülür. Bu nedenle `date1 - date2` ifadesi doğrudan milisaniye farkını verir.",
            en: "JavaScript Date objects automatically coerce to their `.getTime()` millisecond value in arithmetic operations. Therefore `date1 - date2` directly returns the millisecond difference between the two dates."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript'te `Date` nesnesi, çalışması zor bir analog saat gibidir: kendi zaman diliminizi dikkate almak yerine UTC'yi (Greenwich zamanı) temel alır ve yalnızca her ortamda güvenli bir şekilde doğru zamanı tutabilmek için bunu yapar. `new Date()` yeni bir saat oluşturmak, `.getTime()` milisaniye cinsinden pil ömrünü okumak gibi.",
          en: "JavaScript's `Date` object is like a tricky analog clock: instead of showing your local time by default, it keeps UTC (Greenwich time) internally and converts only when displaying. `new Date()` is like winding up a new clock, `.getTime()` reads the battery counter in milliseconds since 1970."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`Date.now()` vs `new Date()`: `Date.now()` tek bir sayı döndürür (Unix timestamp) — LEGO inşaatının tam olarak başladığı zaman damgası. `new Date()` ise bu sayıyı gerçek bir saat nesnesine dönüştüren, farklı yüzleri (yıl, ay, gün, saat) olan bir LEGO saati.",
          en: "`Date.now()` vs `new Date()`: `Date.now()` returns one number (Unix timestamp) — like the exact millisecond your LEGO build started. `new Date()` converts that number into a real clock object with multiple faces (year, month, day, hour) you can read separately."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Tarih karşılaştırmaları, LEGO parçalarını etikete göre sıralamak gibidir: `dateA > dateB` yazmak mümkündür çünkü JavaScript tarih nesnelerini sayıya dönüştürerek karşılaştırır. Bu, test raporlarını zamana göre sıralamak veya bir testin belirli bir tarihten önce çalışıp çalışmadığını kontrol etmek için kullanılır.",
          en: "Date comparisons are like sorting LEGO pieces by their manufacturing timestamp: `dateA > dateB` works because JavaScript converts date objects to numbers for comparison. This is used to sort test reports chronologically or verify a test ran before a specific deadline."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript tarihlerinde aylar 0'dan başlar (Ocak = 0)? Bu, C dilinin zamanından gelen tarihsel bir miras. `new Date(2024, 0, 15)` 15 Ocak 2024'tür. Bu sezgisizlik, `date-fns` veya `dayjs` gibi kütüphanelerin popülerleşmesinin temel nedenidir — bu kütüphaneler insan dostu bir API sunar.",
          en: "Why do JavaScript months start at 0 (January = 0)? This is a historical artifact inherited from the C language. `new Date(2024, 0, 15)` is January 15, 2024. This counterintuitive design is exactly why libraries like `date-fns` or `dayjs` became popular — they provide a human-friendly API."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden zaman dilimi farkları test ortamlarında hata yaratır? `new Date()` çalıştırıldığı makineye göre local zamanı döndürür. CI server UTC'de çalışırken geliştirici bilgisayarı UTC+3'te çalışıyorsa, tarih karşılaştırmaları farklı sonuçlar üretir. Her zaman UTC'de çalış: `.toISOString()`, `.getUTCHours()` vb. kullan.",
          en: "Why do timezone differences cause test failures across environments? `new Date()` returns local time based on where it runs. If CI runs in UTC but your machine is UTC+3, date comparisons produce different results. Always work in UTC: use `.toISOString()`, `.getUTCHours()`, etc. for timezone-safe test assertions."
        }
      },
      {
        type: "quiz",
        question: { tr: "`new Date(\"2024-01-15\").getMonth()` ne döndürür?", en: "What does `new Date(\"2024-01-15\").getMonth()` return?" },
        options: [
          { id: "a", text: { tr: "1 (Ocak için)", en: "1 (for January)" } },
          { id: "b", text: { tr: "0 (JavaScript'te aylar 0'dan başlar)", en: "0 (months start at 0 in JavaScript)" } },
          { id: "c", text: { tr: "15 (gün)", en: "15 (the day)" } },
          { id: "d", text: { tr: "2024 (yıl)", en: "2024 (the year)" } }
        ],
        correct: "b",
        explanation: { tr: "JavaScript'te `getMonth()` 0'dan başlar: Ocak = 0, Şubat = 1, ..., Aralık = 11. Bu tarihsel bir hata olarak kabul edilir. `date-fns` veya `dayjs` gibi modern kütüphaneler 1'den başlayan ay numaralarını kullanır.", en: "In JavaScript `getMonth()` is zero-indexed: January = 0, February = 1, ..., December = 11. This is widely considered a design error. Modern libraries like `date-fns` or `dayjs` use 1-based month numbers." },
        retryQuestion: {
          question: { tr: "İki tarih arasındaki gün farkını bulmak için en pratik yaklaşım hangisi?", en: "What is the most practical way to find the number of days between two dates?" },
          options: [
            { id: "a", text: { tr: "Her tarihi string'e çevirip karşılaştır", en: "Convert to strings and compare" } },
            { id: "b", text: { tr: "Her iki tarih için getTime() çağır, farkı al ve 86400000 (ms/gün) ile böl", en: "Subtract timestamps and divide by 86400000" } },
            { id: "c", text: { tr: "for döngüsüyle günleri say", en: "Count days with a for loop" } },
            { id: "d", text: { tr: "Mümkün değil", en: "Not possible" } }
          ],
          correct: "b",
          explanation: { tr: "`(dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24)` formülü, iki tarih arasındaki gün sayısını verir. `getTime()` Unix timestamp (milisaniye) döndürür.", en: "`(dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24)` gives the days between two dates. `getTime()` returns the Unix timestamp in milliseconds." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain the JavaScript Date object to a non-programmer as a calendar + stopwatch. Why does getMonth() start from 0, and how does this cause problems in practice?",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript Date nesnesini hiç programlama bilmeyene bir takvim + kronometre olarak anlat. getMonth()'un neden 0'dan başladığını ve bunun pratikte nasıl sorun çıkardığını açıkla.",
        keywords: [
              ["tarih", "date"],
              ["saat", "time"],
              ["ay", "month"],
              ["yıl", "year"],
              ["sıfır", "zero"],
              "timestamp",
              ["karşılaştır", "compare"],
              ["fark", "difference"],
              ["sona", "expire"],
              ["geçerli", "valid"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 15 — RegExp (Regular Expressions)
  // ─────────────────────────────────────────────
  {
    title: { tr: "RegExp (Düzenli İfadeler)", en: "RegExp (Regular Expressions)" },
    blocks: [
      {
        type: "css-animation",
        kind: "regex",
        label: { tr: "Regex Pattern Tarama — Metin İçinde Kalıp Arama", en: "Regex Pattern Scan — Searching patterns in text" }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Regular Expression (Regex), metin içinde belirli kalıpları (pattern) aramak için kullanılan küçük ama güçlü bir dildir. Tıpkı Google'da arama yaparken joker karakter (*) kullanmak gibi ama çok daha güçlü. Test otomasyonunda e-posta formatını doğrularız, hata mesajlarından bilgi çıkarırız, URL kalıplarını kontrol ederiz. Java'da `Pattern.compile()` ve `Matcher` kullanırdık; JS'de ise `/pattern/flags` sözdizimi çok daha basittir.",
          en: "Regular Expression (Regex) is a small but powerful language for searching specific patterns in text. Think of it as Google's wildcard (*) search on steroids. In automation, we validate email formats, extract data from error messages, and check URL patterns. In Java we used `Pattern.compile()` and `Matcher`; JS's `/pattern/flags` syntax is far simpler."
        }
      },
      {
        type: "table",
        headers: [
          { tr: "Pattern", en: "Pattern" },
          { tr: "Anlamı", en: "Meaning" },
          { tr: "Örnek", en: "Example" }
        ],
        rows: [
          [".", { tr: "Herhangi bir karakter (newline hariç)", en: "Any character except newline" }, `"a.c" → "abc", "a1c"`],
          ["*", { tr: "0 veya daha fazla tekrar", en: "0 or more repetitions" }, `"ab*c" → "ac", "abc", "abbc"`],
          ["+", { tr: "1 veya daha fazla tekrar", en: "1 or more repetitions" }, { tr: `"ab+c" → "abc", "abbc" (ac değil)`, en: `"ab+c" → "abc", "abbc" (not "ac")` }],
          ["?", { tr: "0 veya 1 kez (opsiyonel)", en: "0 or 1 time (optional)" }, `"colou?r" → "color", "colour"`],
          ["\\d", { tr: "Sayı [0-9]", en: "Digit [0-9]" }, `"\\d+" → "123", "42"`],
          ["\\w", { tr: "Harf, sayı, alt çizgi", en: "Word char (letter, digit, _)" }, `"\\w+" → "hello_123"`],
          ["\\s", { tr: "Boşluk karakteri", en: "Whitespace character" }, `"\\s+" → " ", "\\t", "\\n"`],
          ["^", { tr: "Satır başı", en: "Start of string" }, `"^Hello" → "Hello World" ✅`],
          ["$", { tr: "Satır sonu", en: "End of string" }, `"world$" → "Hello world" ✅`],
          ["[abc]", { tr: "a, b veya c karakterlerinden biri", en: "One of a, b, or c" }, `"[aeiou]" → sesli harfler`],
          ["{n,m}", { tr: "n ile m arasında tekrar", en: "Between n and m repetitions" }, `"\\d{3,5}" → "123", "12345"`],
          ["(group)", { tr: "Yakalama grubu", en: "Capturing group" }, `"(\\d+)-(\\d+)" → iki grup`]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "JS Regex Metodları — QA Örnekleri", en: "JS Regex Methods — QA Examples" },
        content: {
          tr: `// ─── 1. test() — Boolean kontrol ─────────────────────────────
// Java: Pattern.compile(re).matcher(str).matches()
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test('user@example.com'));  // true
console.log(emailRegex.test('invalid-email'));      // false

// ─── 2. match() — Eşleşmeleri dizi olarak döner ───────────────
// Java: Matcher.group()
const text = 'Hata kodu: 404, yönlendirme: 301';
const codes = text.match(/\\d+/g); // 'g' flag: global, tümünü bul
console.log('Bulunan kodlar:', codes); // ['404', '301']

// ─── 3. replace() — Regex ile değiştirme ─────────────────────
// Java: str.replaceAll(regex, replacement)
const dirty = '  Merhaba   Dünya  ';
const clean = dirty.replace(/\\s+/g, ' ').trim();
console.log('Temiz:', clean); // 'Merhaba Dünya'

// ─── 4. QA — URL format doğrulama ────────────────────────────
const urlRegex = /^https?:\\/\\/[\\w-]+(\\.[\\w-]+)+/;
console.log(urlRegex.test('https://learnqa.dev')); // true
console.log(urlRegex.test('ftp://invalid'));        // false`,
          en: `// ─── 1. test() — Boolean check ──────────────────────────────
// Java: Pattern.compile(re).matcher(str).matches()
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test('user@example.com'));  // true
console.log(emailRegex.test('invalid-email'));      // false

// ─── 2. match() — Returns matches as an array ─────────────────
// Java: Matcher.group()
const text = 'Error code: 404, redirect: 301';
const codes = text.match(/\\d+/g); // 'g' flag: global, find all
console.log('Found codes:', codes); // ['404', '301']

// ─── 3. replace() — Replace using regex ──────────────────────
// Java: str.replaceAll(regex, replacement)
const dirty = '  Hello   World  ';
const clean = dirty.replace(/\\s+/g, ' ').trim();
console.log('Clean:', clean); // 'Hello World'

// ─── 4. QA — URL format validation ──────────────────────────
const urlRegex = /^https?:\\/\\/[\\w-]+(\\.[\\w-]+)+/;
console.log(urlRegex.test('https://learnqa.dev')); // true
console.log(urlRegex.test('ftp://invalid'));        // false`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Regex'i kendiniz deneyin!
const testString = "Test ID: ABC-123, Durum: PASSED, Süre: 4500ms";

// 1. Sayıları bul
const numbers = testString.match(/\\d+/g);
console.log("Sayılar:", numbers);

// 2. Büyük harf kelimeleri bul
const upperWords = testString.match(/[A-Z]{2,}/g);
console.log("Büyük kelimeler:", upperWords);

// 3. E-posta doğrulama
const email = "test@example.com";
const isValid = /^\\w+@\\w+\\.\\w+$/.test(email);
console.log("E-posta geçerli mi?", isValid);`,
          en: `// Try regex yourself!
const testString = "Test ID: ABC-123, Status: PASSED, Duration: 4500ms";

// 1. Find all numbers
const numbers = testString.match(/\\d+/g);
console.log("Numbers:", numbers);

// 2. Find uppercase words
const upperWords = testString.match(/[A-Z]{2,}/g);
console.log("Uppercase words:", upperWords);

// 3. Validate email
const email = "test@example.com";
const isValid = /^\\w+@\\w+\\.\\w+$/.test(email);
console.log("Email valid?", isValid);`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te bir string'in belirli bir regex kalıbıyla eşleşip eşleşmediğini kontrol etmek için hangi metod kullanılır?",
          en: "Which method checks if a string matches a given regex pattern in JavaScript?"
        },
        options: [
          { id: "a", text: "regex.match(string)" },
          { id: "b", text: "regex.test(string)" },
          { id: "c", text: "string.validate(regex)" },
          { id: "d", text: "regex.find(string)" }
        ],
        correct: "b",
        explanation: {
          tr: "`regex.test(string)` yöntemin adından da anlaşıldığı gibi kalıbın string'de bulunup bulunmadığını `true/false` döndürür. Java'da `Pattern.compile(re).matcher(str).find()` karşılığıdır. `string.match(regex)` ise eşleşmeleri dizi olarak döndürür.",
          en: "`regex.test(string)` returns a boolean indicating whether the pattern exists in the string. It is the equivalent of Java's `Pattern.compile(re).matcher(str).find()`. `string.match(regex)` returns an array of matches instead."
        },
        retryQuestion: {
          question: {
            tr: "Regex'te `g` flag'i ne anlama gelir?",
            en: "What does the `g` flag mean in a JavaScript regex?"
          },
          options: [
            { id: "a", text: { tr: "Büyük-küçük harf duyarsız eşleşme", en: "Case-insensitive matching" } },
            { id: "b", text: { tr: "Global: string'deki tüm eşleşmeleri bul (sadece ilkini değil)", en: "Global: find all matches in the string (not just the first)" } },
            { id: "c", text: { tr: "Greedy: mümkün olduğunca uzun eşleşme", en: "Greedy: match as long as possible" } },
            { id: "d", text: { tr: "Group: eşleşme grupları oluştur", en: "Group: create match groups" } }
          ],
          correct: "b",
          explanation: {
            tr: "`/pattern/g` — `g` (global) flag'i sayesinde regex tüm string boyunca arar ve tüm eşleşmeleri döndürür. Bu flag olmadan yalnızca ilk eşleşme bulunur. Otomasyon testlerinde bir sayfadaki tüm hata mesajlarını veya linkleri çekerken kritik öneme sahiptir.",
            en: "The `g` (global) flag makes regex search the entire string and return ALL matches. Without it, only the first match is found. This flag is critical when scraping all error messages or links from a page in automation."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "Regular Expression, bir kelime arama bulmacasındaki şablona benzer: harf, rakam ve özel karakterlerden oluşan bir desen (pattern) tanımlarsın, ve bu desen metindeki eşleşmeleri arar. `\\d{3}-\\d{4}` kalıbı \"3 rakam, tire, 4 rakam\" anlamına gelir — telefon numarası arar.",
          en: "A Regular Expression is like a word-search puzzle template: you define a pattern made of letters, digits, and special characters, and that pattern searches text for matches. The pattern `\\d{3}-\\d{4}` means \"3 digits, hyphen, 4 digits\" — it finds phone numbers."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Regex karakterleri, LEGO parça seçim kuralları gibidir: `\\d` \"herhangi bir rakam rengi\", `\\w` \"herhangi bir harf parçası\", `+` \"bir veya daha fazla\", `*` \"sıfır veya daha fazla\", `?` \"isteğe bağlı\". Bu kuralları birleştirerek çok güçlü eşleşme kalıpları oluşturulur.",
          en: "Regex characters are like LEGO piece selection rules: `\\d` means \"any digit-colored piece\", `\\w` means \"any letter piece\", `+` means \"one or more\", `*` means \"zero or more\", `?` means \"optional\". Combining these rules creates very powerful matching patterns."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Capturing groups `()`, LEGO parçalarını etiketlenmiş torbalara ayırmak gibidir: `/^(\\d{4})-(\\d{2})-(\\d{2})$/` ile \"2024-01-15\" tarihini eşleştirdiğinde, grup 1 yılı, grup 2 ayı, grup 3 günü ayrı torbalarda tutar — `match[1]`, `match[2]`, `match[3]` ile erişilir.",
          en: "Capturing groups `()` are like sorting LEGO pieces into labeled bags: matching `\"2024-01-15\"` with `/(\\d{4})-(\\d{2})-(\\d{2})/` puts the year in bag 1, month in bag 2, day in bag 3 — accessed via `match[1]`, `match[2]`, `match[3]`."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden test otomasyonunda Regex kullanılır? API yanıtlarındaki e-posta, URL ve UUID doğrulaması; log dosyalarından hata mesajı çekme; form validasyon kurallarını test etme; dinamik URL'lerdeki parametreleri çıkarma. Playwright'ta `expect(page).toHaveURL(/checkout/)` regex ile URL doğrulaması yapar.",
          en: "Why is Regex used in test automation? Validating emails, URLs, and UUIDs in API responses; extracting error messages from log files; testing form validation rules; capturing parameters from dynamic URLs. In Playwright, `expect(page).toHaveURL(/checkout/)` uses a regex to validate the current URL."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden Regex'te `g` (global) flag önemli? `g` olmadan `str.match(pattern)` yalnızca ilk eşleşmeyi döndürür. `g` ile tüm eşleşmeler döner. `str.replace(pattern, replacement)` de `g` olmadan sadece ilk eşleşmeyi değiştirir. Test verisi manipülasyonunda `g` flag'ini unutmak sık yapılan bir hatadır.",
          en: "Why does the `g` (global) flag matter in Regex? Without `g`, `str.match(pattern)` returns only the first match. With `g`, all matches are returned. Similarly, `str.replace(pattern, replacement)` without `g` only replaces the first occurrence. Forgetting the `g` flag during test data manipulation is a very common mistake."
        }
      },
      {
        type: "quiz",
        question: { tr: "`/^test@[a-z]+\\.com$/i` regex'i hangi string'e eşleşir?", en: "Which string matches the regex `/^test@[a-z]+\\.com$/i`?" },
        options: [
          { id: "a", text: { tr: "\"test@example.com\" — tam eşleşme", en: "\"test@example.com\" — exact match" } },
          { id: "b", text: { tr: "\"TEST@EXAMPLE.COM\" — i flag küçük/büyük harf farkını görmezden gelir", en: "\"TEST@EXAMPLE.COM\" — i flag ignores case" } },
          { id: "c", text: { tr: "Her ikisi de", en: "Both of them" } },
          { id: "d", text: { tr: "Hiçbiri", en: "Neither" } }
        ],
        correct: "c",
        explanation: { tr: "`i` flag, büyük/küçük harf duyarsız (case-insensitive) eşleşme sağlar. `^` başlangıç, `$` bitiş bağlayıcısı. `[a-z]+` bir veya daha fazla harf. `\\.` gerçek nokta karakteri (kaçırılmış). Her ikisi de eşleşir.", en: "The `i` flag makes matching case-insensitive. `^` anchors the start, `$` the end. `[a-z]+` matches one or more letters. `\\.` is an escaped literal dot. Both strings match the pattern." },
        retryQuestion: {
          question: { tr: "`str.replace(/foo/g, \"bar\")` ile `str.replace(/foo/, \"bar\")` arasındaki fark nedir?", en: "What is the difference between `str.replace(/foo/g, \"bar\")` and `str.replace(/foo/, \"bar\")`?" },
          options: [
            { id: "a", text: { tr: "Hiçbir fark yoktur", en: "No difference" } },
            { id: "b", text: { tr: "g flag tüm eşleşmeleri değiştirir; g olmadan yalnızca ilki değişir", en: "g flag replaces ALL; without g only the first is replaced" } },
            { id: "c", text: { tr: "g flag regex'i daha hızlı yapar", en: "g flag makes regex faster" } },
            { id: "d", text: { tr: "g flag büyük/küçük harf duyarsız yapar", en: "g flag makes it case-insensitive" } }
          ],
          correct: "b",
          explanation: { tr: "`g` (global) flag olmadan `replace()` yalnızca ilk eşleşmeyi değiştirir. `g` ile tüm eşleşmeler değiştirilir. Çok sayıda yer değiştirme için `g` zorunludur.", en: "Without the `g` (global) flag, `replace()` changes only the first occurrence. With `g`, every occurrence is replaced. `g` is mandatory for bulk replacements." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain Regular Expressions like a detective searching text or a sieve filtering it. Why do we use them in automation tests?",
        promptTr: "🤖 Mini Kahraman Soruyor: Regular Expression'ı (Regex) bir metin içinde arama yapan bir dedektif veya bir metin elekten geçiren süzgeç olarak anlat. Otomasyon testlerinde neden kullanırız?",
        keywords: [
              ["kalıp", "pattern"],
              ["arama", "search"],
              ["doğrulama", "validate"],
              ["e-posta", "email"],
              ["bul", "find"],
              ["eşleş", "match"],
              "regex",
              "format",
              ["kontrol", "check"],
              ["çıkar", "extract"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 16 — Sets & Maps (ES6)
  // ─────────────────────────────────────────────
  {
    title: { tr: "Set & Map (ES6)", en: "Set & Map (ES6)" },
    blocks: [
      {
        type: "css-animation",
        kind: "setmap",
        label: { tr: "Array → Set Tekilleştirme + Map Anahtar-Değer Haritası", en: "Array → Set deduplication + Map key-value mapping" }
      },
      {
        type: "simple-box",
        emoji: "🗂️",
        content: {
          tr: "ES6 ile gelen Set ve Map yapıları, düz dizilerin ve nesnelerin yetersiz kaldığı durumlarda devreye girer. Set, benzersiz (unique) değerlerin koleksiyonudur — tekrar eleman kabul etmez. Map ise anahtarların herhangi bir tip olabildiği (sadece string değil) gelişmiş bir anahtar-değer deposudur. Java'daki HashSet ve HashMap'in doğrudan karşılığıdır.",
          en: "ES6 Set and Map fill the gaps where plain arrays and objects fall short. Set is a collection of unique values — it never accepts duplicates. Map is an advanced key-value store where keys can be any type (not just strings). They are the direct equivalents of Java's HashSet and HashMap."
        }
      },
      {
        type: "table",
        headers: [
          { tr: "Yapı", en: "Structure" },
          { tr: "Ne Saklar?", en: "What it stores" },
          { tr: "Tekrar İzin Verir mi?", en: "Allows Duplicates?" },
          { tr: "Java Karşılığı", en: "Java Equivalent" },
          { tr: "QA Kullanımı", en: "QA Usage" }
        ],
        rows: [
          ["Set",    { tr: "Benzersiz değerler", en: "Unique values" },         { tr: "❌ Hayır", en: "❌ No" },  "HashSet<T>",    { tr: "Tekrar eden hataları tekilleştir", en: "Deduplicate repeated errors" }],
          ["Map",    { tr: "Anahtar → Değer çiftleri", en: "Key → Value pairs" }, { tr: "Anahtar başına 1 değer", en: "1 value per key" }, "HashMap<K,V>", { tr: "URL → response kodu eşlemesi", en: "URL → response code mapping" }],
          ["Array",  { tr: "Sıralı değerler (tekrar olabilir)", en: "Ordered values (duplicates allowed)" }, { tr: "✅ Evet", en: "✅ Yes" }, "ArrayList<T>", { tr: "Test adımları listesi", en: "Test step list" }],
          ["Object", { tr: "String anahtar → değer", en: "String key → value" }, { tr: "Anahtar başına 1 değer", en: "1 value per key" }, "HashMap<String,V>", { tr: "Config nesnesi", en: "Config object" }]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Set & Map — QA Otomasyon Örnekleri", en: "Set & Map — QA Automation Examples" },
        content: {
          tr: `// ─── SET ─────────────────────────────────────────────────────
// Java'da: Set<String> set = new HashSet<>();
const errorSet = new Set();
errorSet.add("ElementNotFound");
errorSet.add("TimeoutError");
errorSet.add("ElementNotFound"); // Tekrar — eklenmez!

console.log("Hata sayısı:", errorSet.size); // 2 (tekrar yok)
console.log("Set içerir mi?", errorSet.has("TimeoutError")); // true

// Diziyi tekilleştirme (Set'in en yaygın kullanımı)
const rawLogs = ["INFO", "ERROR", "INFO", "WARN", "ERROR"];
const uniqueLogs = [...new Set(rawLogs)];
console.log("Tekil loglar:", uniqueLogs); // ['INFO','ERROR','WARN']

// ─── MAP ─────────────────────────────────────────────────────
// Java'da: Map<String,Integer> map = new HashMap<>();
const statusMap = new Map();
statusMap.set('/api/login',  200);
statusMap.set('/api/logout', 200);
statusMap.set('/api/admin',  403);

console.log("Login status:", statusMap.get('/api/login')); // 200
console.log("Toplam route:", statusMap.size);              // 3

// Map üzerinde döngü (Java: entrySet().forEach())
for (const [url, status] of statusMap) {
  const icon = status === 200 ? '✅' : '❌';
  console.log(\`\${icon} \${url} → \${status}\`);
}`,
          en: `// ─── SET ─────────────────────────────────────────────────────
// Java equivalent: Set<String> set = new HashSet<>();
const errorSet = new Set();
errorSet.add("ElementNotFound");
errorSet.add("TimeoutError");
errorSet.add("ElementNotFound"); // Duplicate — ignored!

console.log("Error count:", errorSet.size); // 2 (no duplicates)
console.log("Set contains?", errorSet.has("TimeoutError")); // true

// Deduplicate an array (most common Set use case)
const rawLogs = ["INFO", "ERROR", "INFO", "WARN", "ERROR"];
const uniqueLogs = [...new Set(rawLogs)];
console.log("Unique logs:", uniqueLogs); // ['INFO','ERROR','WARN']

// ─── MAP ─────────────────────────────────────────────────────
// Java equivalent: Map<String,Integer> map = new HashMap<>();
const statusMap = new Map();
statusMap.set('/api/login',  200);
statusMap.set('/api/logout', 200);
statusMap.set('/api/admin',  403);

console.log("Login status:", statusMap.get('/api/login')); // 200
console.log("Total routes:", statusMap.size);              // 3

// Iterate over Map (Java: entrySet().forEach())
for (const [url, status] of statusMap) {
  const icon = status === 200 ? '✅' : '❌';
  console.log(\`\${icon} \${url} → \${status}\`);
}`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Set ve Map'i kendiniz deneyin!
// 1. Set ile tekrar eden test ID'lerini tekilleştir
const testIds = ["TC-001", "TC-002", "TC-001", "TC-003", "TC-002"];
const uniqueIds = new Set(testIds);
console.log("Toplam:", testIds.length, "→ Tekil:", uniqueIds.size);

// 2. Map ile browser → driver eşlemesi
const drivers = new Map([
  ["chrome", "ChromeDriver"],
  ["firefox", "GeckoDriver"],
  ["safari", "SafariDriver"]
]);

drivers.forEach((driver, browser) => {
  console.log(browser, "→", driver);
});`,
          en: `// Try Set and Map yourself!
// 1. Deduplicate repeated test IDs using Set
const testIds = ["TC-001", "TC-002", "TC-001", "TC-003", "TC-002"];
const uniqueIds = new Set(testIds);
console.log("Total:", testIds.length, "→ Unique:", uniqueIds.size);

// 2. Map browser → driver mapping
const drivers = new Map([
  ["chrome", "ChromeDriver"],
  ["firefox", "GeckoDriver"],
  ["safari", "SafariDriver"]
]);

drivers.forEach((driver, browser) => {
  console.log(browser, "→", driver);
});`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir dizideki tekrar eden değerleri ortadan kaldırıp benzersiz değerler listesi elde etmek için en kısa JavaScript yöntemi hangisidir?",
          en: "What is the shortest JavaScript method to remove duplicates from an array and get unique values?"
        },
        options: [
          { id: "a", text: "array.unique()" },
          { id: "b", text: "[...new Set(array)]" },
          { id: "c", text: "array.dedupe()" },
          { id: "d", text: "Array.unique(array)" }
        ],
        correct: "b",
        explanation: {
          tr: "`new Set(array)` dizi elemanlarından benzersiz bir Set oluşturur, spread operator `[...]` bu Set'i geri diziye çevirir. Java'da aynı şeyi `new HashSet<>(list)` → `new ArrayList<>(set)` ile yapardık.",
          en: "`new Set(array)` creates a unique Set from array elements, and the spread operator `[...]` converts it back to an array. The Java equivalent is `new HashSet<>(list)` → `new ArrayList<>(set)`."
        },
        retryQuestion: {
          question: {
            tr: "JavaScript Map ve Object arasındaki en önemli fark nedir?",
            en: "What is the main difference between a JavaScript Map and a plain Object?"
          },
          options: [
            { id: "a", text: { tr: "Map'ler daha yavaştır", en: "Maps are slower" } },
            { id: "b", text: { tr: "Map'te anahtarlar herhangi bir tip olabilir (number, object vb.); Object'te anahtarlar sadece string veya Symbol olabilir", en: "Map keys can be any type (number, object, etc.); Object keys are always strings or Symbols" } },
            { id: "c", text: { tr: "Map JSON'a dönüştürülemez", en: "Maps cannot be converted to JSON" } },
            { id: "d", text: { tr: "Hiçbir fark yok", en: "No difference" } }
          ],
          correct: "b",
          explanation: {
            tr: "Map'in en büyük avantajı, anahtar tipinde esnekliktir: sayılar, nesneler veya fonksiyonlar bile anahtar olabilir. Object'te tüm anahtarlar string'e çevrilir. Ayrıca Map'in `.size` property'si vardır, Object'in yoktur.",
            en: "Map's biggest advantage is key type flexibility: numbers, objects, even functions can be keys. Object always converts keys to strings. Map also has a built-in `.size` property, while Object requires `Object.keys(obj).length`."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`Set`, parmak izi koleksiyonuna benzer: her parmak izi benzersizdir, aynı kişinin izini iki kez ekleyemezsin. `Map` ise bir kimlik kartı cüzdanına benzer: her kart farklı bir kişiye aittir (`key`) ve kart üzerinde o kişinin bilgileri (`value`) bulunur. Nesne (`Object`) de benzer çalışır ama key'ler sadece string veya symbol olabilir; `Map`'te key herhangi bir tipte olabilir.",
          en: "`Set` is like a fingerprint collection: each fingerprint is unique, you cannot add the same person's print twice. `Map` is like a wallet of ID cards: each card belongs to a different person (the `key`) and holds that person's information (the `value`). Objects work similarly but keys must be strings or symbols; `Map` keys can be any type."
        }
      },
      {
        type: "quiz",
        question: { tr: "Aşağıdakilerden hangisi `Set`'in temel özelliğidir?", en: "Which is a fundamental property of a `Set`?" },
        options: [
          { id: "a", text: { tr: "Elemanlar index ile erişilir", en: "Elements are accessed by index" } },
          { id: "b", text: { tr: "Yalnızca string değerleri tutabilir", en: "Can only hold string values" } },
          { id: "c", text: { tr: "Her değer yalnızca bir kez tutulur — tekrar ekleme sessizce görmezden gelinir", en: "Each value is stored only once — re-adding is silently ignored" } },
          { id: "d", text: { tr: "Sıralı değerleri depolar", en: "Stores values in sorted order" } }
        ],
        correct: "c",
        explanation: { tr: "`Set`'in temel özelliği benzersizliktir: aynı değeri birden fazla kez ekleyebilirsin ama Set yalnızca bir kez depolar. Bu, dizi `[1,1,2,3,3]`'teki tekrarları `[...new Set([1,1,2,3,3])]` → `[1,2,3]` ile kaldırmak için mükemmeldir.", en: "The fundamental property of `Set` is uniqueness: you can add the same value multiple times but Set stores it only once. This makes it perfect for deduplication: `[...new Set([1,1,2,3,3])]` → `[1,2,3]`." },
        retryQuestion: {
          question: { tr: "`Map` ile nesne (`{}`) arasındaki temel fark nedir?", en: "What is the key difference between `Map` and a plain object (`{}`)?" },
          options: [
            { id: "a", text: { tr: "Map daha yavaştır", en: "Map is slower" } },
            { id: "b", text: { tr: "Map'te key herhangi bir tip olabilir; nesnede yalnızca string/symbol", en: "Map keys can be any type; object keys are only string/symbol" } },
            { id: "c", text: { tr: "Map yalnızca sayısal değerler tutar", en: "Map only holds numeric values" } },
            { id: "d", text: { tr: "Fark yoktur", en: "No difference" } }
          ],
          correct: "b",
          explanation: { tr: "`Map`'te key olarak nesne, fonksiyon, sayı gibi her türlü veri kullanılabilir. Plain nesne `{}`'de key'ler otomatik olarak string'e dönüştürülür. Karmaşık key'ler gerektiğinde `Map` tercih edilir.", en: "In `Map`, any value can be a key — objects, functions, numbers. In a plain object `{}`, keys are automatically converted to strings. Use `Map` when you need complex or non-string keys." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain Set and Map to someone used to plain arrays and objects. Why were they designed as separate data structures? When would you pick Set vs Map?",
        promptTr: "🤖 Mini Kahraman Soruyor: Set ve Map'i düz dizi ve nesne kullanmaya alışmış birine anlat. Neden ayrı veri yapıları olarak tasarlandılar? Hangi durumda Set, hangi durumda Map seçersin?",
        keywords: [
              ["benzersiz", "unique"],
              ["tekrar", "duplicate"],
              ["anahtar", "key"],
              "map",
              "set",
              "hashset",
              "hashmap",
              ["değer", "value"],
              ["tip", "type"],
              ["koleksiyon", "collection"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 17 — Interleaving Challenges (Mini Games)
  // ─────────────────────────────────────────────
  {
    title: { tr: "Karma Pratik Oyunlar", en: "Interleaving Games" },
    blocks: [
      {
        type: "simple-box",
        emoji: "🎮",
        content: {
          tr: "Beyin vites değiştirdiğinde (interleaving effect) öğrenme katlanarak artar! Şimdi iki farklı mini oyun arasında geçiş yaparak hem array metotlarımızı hem de asenkron Promises yeteneklerimizi test edeceğiz. Başarılı hamlelerde legolar tık diye oturacak!",
          en: "Learning skyrockets when the brain shifts gears (interleaving effect)! We will play two distinct mini-games to test both array methods and asynchronous Promise behaviors. Correct blocks will click into place!"
        }
      },
      {
        type: "js-interleaving-games"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 18 — 50 Interview Questions
  // ─────────────────────────────────────────────
  {
    title: { tr: "Mülakat Soruları", en: "Interview Q&A" },
    blocks: [
      {
        type: "interview-questions",
        topic: "JavaScript",
        questions: [
          // ==========================================
          // BASIC (15 questions)
          // ==========================================
          {
            level: "basic",
            q: { tr: "var, let ve const arasındaki farklar nelerdir? Hangisini ne zaman tercih etmeliyiz?", en: "What is the difference between var, let, and const? When should you use which?" },
            a: {
              tr: "`var` fonksiyon kapsamlıdır (function scope) ve yukarı çekildiğinde (hoisting) `undefined` değeri alır. `let` ve `const` ise blok kapsamlıdır (block scope) ve tanımlanmadan önce erişilmeye çalışıldığında hata verir. `const` tanımlandıktan sonra yeniden atanamaz (read-only), `let` ise yeniden atanabilir. Modern JavaScript'te `var` kullanımı sızıntılara yol açtığı için önerilmez; varsayılan olarak `const`, değeri değişecekse `let` kullanılmalıdır.",
              en: "`var` is function-scoped and hoisted with `undefined`. `let` and `const` are block-scoped and stay in the Temporal Dead Zone (TDZ) before initialization. `const` cannot be reassigned after declaration, while `let` allows reassignment. In modern JS, `var` is avoided to prevent scoping bugs; prefer `const` by default, and use `let` only when you expect variable updates."
            },
            analogy: {
              tr: "Java'da her değişken blok kapsamlıdır `{}`. JavaScript'teki `let` ve `const` Java'daki değişkenler gibidir; `const` Java'daki `final` anahtar kelimesine denk gelir. `var` ise Java'da bulunmayan, scope sınırlarını aşabilen delikli bir sepete benzer.",
              en: "In Java, all variables are block-scoped `{}`. JavaScript's `let` and `const` behave like Java variables; `const` is the equivalent of Java's `final` keyword. `var` is like a leaky basket that ignores block boundaries, which doesn't exist in Java."
            },
            keyPoints: [
              { tr: "var: Function scope, hoisting ile undefined döner", en: "var: Function-scoped, hoisted as undefined" },
              { tr: "let/const: Block scope, Temporal Dead Zone koruması", en: "let/const: Block-scoped, Temporal Dead Zone protected" },
              { tr: "const: Yeniden atama yapılamaz (Java final)", en: "const: Cannot be reassigned (Java's final equivalent)" }
            ],
            tip: {
              tr: "Mülakatta şöyle deyin: 'Projelerimde scope sızıntılarını ve beklenmedik hataları engellemek için kod kalitemde var kullanımını tamamen yasaklarım. Değişkenleri varsayılan olarak const ile tanımlar, sadece değer güncellemesi gerekiyorsa let kullanırım.'",
              en: "Say in interview: 'To prevent scope leaks and side-effects, I ban var in my code styles. I declare variables with const by default and use let only when reassignment is explicitly needed.'"
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te 'hoisting' (yukarı çekme) nedir? Kodun çalışmasını nasıl etkiler?", en: "What is hoisting in JavaScript? How does it affect execution?" },
            a: {
              tr: "Hoisting, JavaScript motorunun kod yürütülmeden önce değişken ve fonksiyon bildirimlerini bulundukları kapsamın (scope) en tepesine taşıması davranışıdır. `var` ile tanımlanan değişkenler yukarı çekildiğinde bellek ayrılır ama değer atanmadığı için `undefined` döner. Fonksiyon bildirimleri (function declarations) ise gövdesiyle birlikte tamamen yukarı çekilir ve tanımlandıkları satırdan önce çağrılabilirler.",
              en: "Hoisting is the behavior where the JS engine moves variable and function declarations to the top of their enclosing scope during the compilation phase. Variables declared with `var` are hoisted with a value of `undefined`. Function declarations are hoisted completely with their bodies, allowing them to be invoked before they appear in the source code."
            },
            analogy: {
              tr: "Java'da bir değişkeni veya metodu tanımlamadan önce çağıramazsınız; derleyici anında hata verir. JS'teki hoisting davranışı Java geliştiricileri için kafa karıştırıcıdır çünkü JS tanımlanmamış gibi duran kodu hata vermeden çalıştırabilir.",
              en: "In Java, you cannot reference a variable before its declaration; the compiler throws a compile-time error. JS hoisting can surprise Java devs, as it allows referencing variables before they are declared in the code sequence without compile errors."
            },
            keyPoints: [
              { tr: "Hoisting derleme aşamasında bildirimlerin en tepeye taşınmasıdır", en: "Hoisting moves declarations to the top during compilation" },
              { tr: "var ile undefined döner; let/const ise TDZ hatası fırlatır", en: "var returns undefined; let/const throw TDZ errors" },
              { tr: "Function declaration gövdesiyle birlikte çekilir", en: "Function declarations hoist fully with their bodies" }
            ],
            tip: {
              tr: "Hoisting'in pratik etkisini göstermek için mülakatta fonksiyon bildirimleri ile fonksiyon ifadeleri (function expressions) arasındaki hoisting farkını vurgulayın.",
              en: "Highlight the hoisting difference between function declarations and function expressions to impress interviewers."
            }
          },
          {
            level: "basic",
            q: { tr: "`==` ile `===` arasındaki fark nedir? Otomasyon testlerinde hangisini kullanmalıyız?", en: "What is the difference between `==` and `===`? Which should we use in automation?" },
            a: {
              tr: "`==` (loose equality) karşılaştırma yaparken tipleri otomatik olarak birbirine dönüştürmeye çalışır (type coercion). Örneğin, `5 == '5'` true döndürür. `===` (strict equality) ise hem tiplerin hem de değerlerin birebir eşit olmasını şart koşar; tip dönüşümü yapmaz, bu yüzden `5 === '5'` false döner. Test otomasyonunda beklenmedik tip dönüşümü kaynaklı gizli bug'ları önlemek adına her zaman `===` kullanılmalıdır.",
              en: "`==` (loose equality) performs type coercion, converting operand types before comparison (e.g., `5 == '5'` is true). `===` (strict equality) compares both value and type without coercion, returning false for `5 === '5'`. In automation tests, you should always use `===` to prevent hidden bugs caused by implicit type conversions."
            },
            analogy: {
              tr: "Java'da primitive tipler `==` ile karşılaştırılırken nesneler `.equals()` ile karşılaştırılır ve tipler sıkı denetlenir. JS'teki `===` Java'daki tip duyarlı sıkı kontrole benzer; `==` ise Java'da olmayan esnek bir dönüştürücüdür.",
              en: "In Java, primitives are compared with `==` and objects with `.equals()`, enforcing strict types. JS's `===` matches Java's strict, type-safe comparison, whereas `==` acts as a loose converter that has no equivalent in Java."
            },
            keyPoints: [
              { tr: "== tipleri otomatik dönüştürür (type coercion)", en: "== performs implicit type coercion" },
              { tr: "=== hem değeri hem de tipi sıkı kontrol eder", en: "=== checks both value and type strictly" },
              { tr: "Otomasyon assertions adımında her zaman === tercih edilir", en: "Always prefer === in automation assertions" }
            ],
            tip: {
              tr: "Mülakatta `[] == false` veya `' \t\r\n' == 0` gibi karmaşık 'loose equality' örneklerinin kafa karıştırıcı sonuçlar verdiğini belirterek neden sıkı eşitliği (===) tercih ettiğinizi açıklayın.",
              en: "Explain that loose equality leads to confusing edge cases (like `[] == false` returning true), which is why strict equality is the standard for reliable tests."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'teki veri tipleri (data types) nelerdir?", en: "What are the data types in JavaScript?" },
            a: {
              tr: "JavaScript veri tipleri ikiye ayrılır: 1. Primitive Tipler: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `Symbol` ve `BigInt`. 2. Reference Tipler (Objects): Nesneler (`Object`), Diziler (`Array`) ve Fonksiyonlar (`Function`). Primitive değerler bellekte (Stack) doğrudan değerleriyle saklanırken, Reference tipler bellekte (Heap) bir referans adresiyle saklanır.",
              en: "JavaScript types are categorized into: 1. Primitive Types: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `Symbol`, and `BigInt`. 2. Reference Types (Objects): `Object`, `Array`, and `Function`. Primitive types are stored directly in memory (Stack), whereas Reference types store a pointer address pointing to an object in the Heap."
            },
            analogy: {
              tr: "Java'da primitive tipler (int, boolean) ile Object sarmalayıcıları (Integer, String) arasındaki stack/heap ayrımı JavaScript ile hemen hemen aynıdır. Ancak JS'te `undefined` adında, Java'da karşılığı olmayan özel bir primitive tip bulunur.",
              en: "Java's split between primitive values (int, boolean) and reference types (Integer, String) on the stack and heap is very similar to JS. However, JS features a unique primitive type called `undefined` which does not exist in Java."
            },
            keyPoints: [
              { tr: "Primitive tipler (String, Number, Boolean, Null, Undefined vb.)", en: "Primitive types (String, Number, Boolean, Null, Undefined, etc.)" },
              { tr: "Reference tipler (Objects, Arrays, Functions)", en: "Reference types (Objects, Arrays, Functions)" },
              { tr: "Primitive değerler değiştirilemez (immutable) özelliktedir", en: "Primitive values are immutable" }
            ],
            tip: {
              tr: "`typeof null` ifadesinin tarihsel bir hata nedeniyle `'object'` döndürdüğünü mülakatta ek bilgi olarak söylemek derin bir JS bilgisine sahip olduğunuzu gösterir.",
              en: "Mentioning that `typeof null` returns `'object'` due to a legacy bug in the early JS engine is a great way to showcase deep language knowledge."
            }
          },
          {
            level: "basic",
            q: { tr: "null ve undefined arasındaki temel fark nedir?", en: "What is the difference between null and undefined?" },
            a: {
              tr: "`undefined`, bir değişkenin tanımlandığını ama henüz bir değer atanmadığını (değersizlik) belirtir. `null` ise değişkenin kasıtlı olarak boş veya değerinin olmadığını (boş değer) ifade etmek için atanır. `typeof undefined` ifadesi `'undefined'` dönerken, `typeof null` tarihsel nedenlerle `'object'` döndürür.",
              en: "`undefined` means a variable has been declared but has not yet been assigned a value. `null` is an assignment value that represents the intentional absence of any object value. `typeof undefined` is `'undefined'`, while `typeof null` returns `'object'` due to legacy reasons."
            },
            analogy: {
              tr: "Java'da başlatılmamış nesne referansları `null` olur. JavaScript'teki `null` Java'daki `null` ile aynı anlamdadır. Ancak Java'da `undefined` kavramı yoktur; atanmamış primitive değişkenler varsayılan değer alır, nesneler ise null olur.",
              en: "In Java, uninitialized object references evaluate to `null`. JavaScript's `null` behaves exactly like Java's `null`. However, Java has no concept of `undefined`; primitive variables get default values and objects default to null."
            },
            keyPoints: [
              { tr: "undefined: Değişken var ama henüz değer atanmamış", en: "undefined: Variable declared but no value assigned yet" },
              { tr: "null: Kasıtlı olarak boş değer ataması yapılmış", en: "null: Intentional assignment representing no value" },
              { tr: "null == undefined (true) ama null === undefined (false)", en: "null == undefined is true, but null === undefined is false" }
            ],
            tip: {
              tr: "Otomasyon testlerinizde bir API response veya element değerinin bulunmadığını doğrulamak için hem null hem de undefined durumunu kontrol eden gevşek eşitlik (`x == null`) kontrolü yapabilirsiniz.",
              en: "In test assertions, checking if a value is loosely equal to null (`x == null`) is a handy way to check for both null and undefined in one step."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'teki truthy ve falsy kavramları nedir? Hangi değerler falsy kabul edilir?", en: "What are truthy and falsy values in JavaScript? Which values are falsy?" },
            a: {
              tr: "JavaScript'te bir koşul ifadesinde (`if`) Boolean olmayan değerler otomatik olarak Boolean tipine dönüştürülür. Falsy değerler dışındaki tüm değerler truthy (doğru kabul edilen) olarak yorumlanır. Toplam 6 temel falsy (yanlış kabul edilen) değer vardır: `false`, `0` (ve `-0`, `0n`), `''` (boş string), `null`, `undefined` ve `NaN`. Bunların dışındaki nesneler, diziler (`[]`) ve dolu stringler her zaman truthy'dir.",
              en: "In JavaScript, values evaluated in a conditional statement are implicitly coerced to Boolean. All values are considered truthy unless defined as falsy. There are exactly 6 core falsy values: `false`, `0` (including `-0`, `0n`), `''` (empty string), `null`, `undefined`, and `NaN`. Everything else, including empty objects, empty arrays (`[]`), and non-empty strings, is truthy."
            },
            analogy: {
              tr: "Java'da `if` koşullarının içi kesinlikle `boolean` tipinde olmak zorundadır (`if (x != null)` gibi). JavaScript'te ise tipler gevşek olduğundan nesnelerin doğrudan kendisi (`if (element)`) veya stringler koşul olarak yazılabilir.",
              en: "In Java, conditional expressions must strictly evaluate to a `boolean` type (e.g. `if (x != null)`). In JavaScript, because of weak typing, you can pass objects or strings directly to conditionals (e.g. `if (element)`)."
            },
            keyPoints: [
              { tr: "Falsy değerler: false, 0, '', null, undefined, NaN", en: "Falsy values: false, 0, '', null, undefined, NaN" },
              { tr: "Boş diziler ([]) ve boş nesneler ({}) truthy kabul edilir", en: "Empty arrays ([]) and empty objects ({}) are truthy" },
              { tr: "Koşul ifadelerinde tip dönüşümü (coercion) otomatik tetiklenir", en: "Conditional checks trigger automatic boolean coercion" }
            ],
            tip: {
              tr: "Otomasyon kodunda bir locator'ın text değerinin boş olup olmadığını `if (text)` şeklinde kestirmeden kontrol edebilirsiniz; çünkü boş string falsy, dolu string truthy'dir.",
              en: "You can check if a locator string is empty using `if (text)` because an empty string is falsy while a filled string is truthy."
            }
          },
          {
            level: "basic",
            q: { tr: "NaN nedir? NaN olup olmadığını nasıl doğrularız?", en: "What is NaN? How do you check if a value is NaN?" },
            a: {
              tr: "`NaN` (Not-a-Number), geçersiz bir matematiksel işlemin sonucunu temsil eden özel bir Number tipidir (Örn: `'elma' * 5`). NaN'ın en garip özelliği kendisi dahil hiçbir şeye eşit olmamasıdır (`NaN === NaN` false döner). Bir değerin NaN olduğunu doğrulamak için normal karşılaştırma yerine `Number.isNaN()` veya küresel `isNaN()` fonksiyonu kullanılmalıdır.",
              en: "`NaN` (Not-a-Number) is a special Number type representing an invalid mathematical operation (e.g., `'apple' * 5`). A unique property of NaN is that it is not equal to anything, including itself (`NaN === NaN` is false). To check if a value is NaN, use `Number.isNaN()` or the global `isNaN()` function instead of standard equality operators."
            },
            analogy: {
              tr: "Java'da geçersiz matematiksel işlemlerde genellikle `ArithmeticException` fırlatılır veya float/double işlemlerinde `Double.NaN` döner. JS hata fırlatmak yerine doğrudan NaN değerini üretir.",
              en: "In Java, invalid math operations throw `ArithmeticException` or return `Double.NaN`. Instead of throwing runtime exceptions, JavaScript yields NaN values directly."
            },
            keyPoints: [
              { tr: "NaN, geçersiz matematiksel işlemlerin sayısal sonucudur", en: "NaN represents numeric values computed from invalid math" },
              { tr: "NaN, kendisi dahil hiçbir şeye eşit değildir (NaN === NaN is false)", en: "NaN is unequal to all values, including itself" },
              { tr: "Doğrulama için Number.isNaN(x) kullanılmalıdır", en: "Use Number.isNaN(x) for reliable checks" }
            ],
            tip: {
              tr: "Otomasyon testinde sayısal girdi alanından çekilen verinin geçerli olup olmadığını doğrulamak için `isNaN()` kontrolü yapıp ardından sayıya çevirebilirsiniz.",
              en: "Use `isNaN()` in text input validation steps to check if a scraped UI value can be safely parsed into a number."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te diziler (arrays) nasıl tanımlanır ve en yaygın kullanılan metotları nelerdir?", en: "How are arrays defined in JavaScript and what are their common methods?" },
            a: {
              tr: "JavaScript dizileri köşeli parantezler `[]` kullanılarak tanımlanır ve dinamik boyutludur; içine farklı tiplerde elemanlar konabilir. En yaygın kullanılan metotlar: `push()` (sona eleman ekler), `pop()` (sondan eleman çıkarır), `shift()` (baştan eleman çıkarır), `unshift()` (başa eleman ekler), `slice()` (diziyi böler) ve `splice()` (diziye eleman ekler/çıkarır).",
              en: "JavaScript arrays are declared using square brackets `[]` and are dynamically sized, allowing mixed data types. Common methods include: `push()` (append to end), `pop()` (remove from end), `shift()` (remove from beginning), `unshift()` (insert at beginning), `slice()` (shallow copy a sub-array), and `splice()` (add/remove elements at indices)."
            },
            analogy: {
              tr: "Java'da diziler sabit boyutludur. JS dizileri Java'daki `ArrayList` yapısına benzer; boyutları dinamik büyür ve eleman ekleme çıkarma metotları çok pratiktir.",
              en: "In Java, raw arrays have fixed sizes. JS arrays behave like Java's `ArrayList`, expanding dynamically with built-in helper methods for item manipulation."
            },
            keyPoints: [
              { tr: "Diziler dinamik boyutludur ve farklı tipleri barındırabilir", en: "Arrays are dynamic and can store elements of various types" },
              { tr: "push/pop dizinin sonunu değiştirirken, shift/unshift başını değiştirir", en: "push/pop mutate the end of an array; shift/unshift mutate the beginning" },
              { tr: "Java ArrayList yapısına benzer", en: "Analogous to Java's ArrayList wrapper" }
            ],
            tip: {
              tr: "Playwright testlerinde `page.$$()` veya `locator.all()` metotları bize elementlerin bir JavaScript dizisini döner. Bu dizileri manipüle etmek için array metotlarını iyi bilmeniz gerekir.",
              en: "Playwright APIs like `page.$$()` or `locator.all()` return JavaScript arrays. Mastering array operations makes extracting text from lists very simple."
            }
          },
          {
            level: "basic",
            q: { tr: "Function declaration ile Function expression arasındaki fark nedir?", en: "What is the difference between a function declaration and a function expression?" },
            a: {
              tr: "Function declaration, `function carp(a, b) { return a * b; }` şeklinde yapılan isimli tanımlamadır; hoisting sayesinde kodda tanımlanmadan önce çağrılabilir. Function expression ise bir fonksiyonun değişkene atanmasıdır (`const carp = function(a, b) { ... };`); bunlar değişken atama kurallarına tabi olduklarından tanımlanmadan önce çağrılırlarsa hata fırlatırlar.",
              en: "A function declaration is a named function defined using the `function` keyword (e.g. `function mult(a, b) { return a*b; }`); it is fully hoisted and callable before definition. A function expression assigns a function to a variable (e.g. `const mult = function(a,b){...};`); it is not hoisted and throws errors if invoked before definition."
            },
            analogy: {
              tr: "Java'da tüm metotlar sınıfların içinde tanımlanır ve sırayla bağımsız olarak çağrılabilir (Function declaration gibi). Ancak Java 8 lambda ifadeleri bir değişkene atanabilir ve bu atamadan önce kullanılamaz (Function expression gibi).",
              en: "In Java, all methods belong to classes and are callable regardless of their order (like function declarations). However, Java 8 lambda expressions assigned to variables cannot be accessed before their assignment line (like function expressions)."
            },
            keyPoints: [
              { tr: "Function declaration tamamen hoisted edilir", en: "Function declarations are fully hoisted during compile phase" },
              { tr: "Function expression hoisting kurallarına takılır (TDZ)", en: "Function expressions are bound by variable TDZ rules" },
              { tr: "Modern JS'te fonksiyon ifadeleri ve arrow function kullanımı yaygındır", en: "Modern JS heavily prefers function expressions and arrow functions" }
            ],
            tip: {
              tr: "Otomasyon kütüphanelerinde callback parametresi yazarken temiz görünmesi adına genellikle function expression veya arrow function yapıları tercih edilir.",
              en: "Arrow functions (a type of function expression) are standard for clean callback definitions in Playwright assertions."
            }
          },
          {
            level: "basic",
            q: { tr: "Template literals nedir? Test otomasyonunda dinamik seçiciler (dynamic locators) için nasıl kullanılır?", en: "What are template literals? How do you use them for dynamic locators in testing?" },
            a: {
              tr: "Template literals, ters tırnaklar (backticks - `` ` ``) ile tanımlanan ve içine `${degisken}` yazarak dinamik metin birleştirmeyi sağlayan ES6 özelliğidir. Otomasyon testlerinde, dinamik olarak değişen ID'leri, dinamik xpath/css seçicileri veya API endpoint URL'lerini birleştirmek için artı `+` işareti yerine temiz bir şekilde kullanılır.",
              en: "Template literals are string literals delimited with backticks (`` ` ``), allowing embedded expressions via `${expression}` syntax. In automation, they simplify creating dynamic selectors, XPath expressions, or API endpoints by replacing messy string concatenations with clean templates."
            },
            analogy: {
              tr: "Java'da dinamik string birleştirmek için `String.format()` veya `+` operatörü kullanılır (`\"//div[@id='\" + id + \"']\"`). JS'teki template literals ise Java'daki artı birleştirmesini ortadan kaldıran çok daha okunaklı bir syntax sunar.",
              en: "In Java, dynamic string formatting uses `String.format()` or `+` operators (e.g. `\"//div[@id='\" + id + \"']\"`). JS template literals offer a cleaner inline template syntax compared to Java's string formatting."
            },
            keyPoints: [
              { tr: "Backtick (`` ` ``) karakterleri ile tanımlanır", en: "Enclosed by backtick (`` ` ``) symbols" },
              { tr: "${expression} ile değişken veya fonksiyon çıktısı doğrudan gömülür", en: "Allows embedding variables or expressions using ${expression} syntax" },
              { tr: "Çok satırlı (multiline) metinleri destekler", en: "Supports multi-line strings out of the box" }
            ],
            tip: {
              tr: "Mülakatta dinamik tablo satırı locate etmek için template literals kullandığınızı şu örnekle gösterin: `page.locator(\`//tr[\${rowIndex}]/td\`)`.",
              en: "Demonstrate template literals for dynamic table selectors: `page.locator(\`//tr[\${rowIndex}]/td\`)` during coding interviews."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'teki 'strict mode' (sıkı mod) nedir? Neden önemlidir?", en: "What is 'strict mode' in JavaScript? Why is it important?" },
            a: {
              tr: "Sıkı mod (`\"use strict\";`), JavaScript kodunu daha güvenli ve katı kurallarla çalıştırmayı sağlayan bir direktiftir. Strict mode aktif olduğunda, tanımlanmamış değişkenlere değer atama gibi normalde sessizce geçiştirilen hatalar fırlatılır, gelecekteki JS sürümleri için rezerve edilen kelimelerin değişken adı yapılması engellenir ve bazı performans optimizasyonları kolaylaşır.",
              en: "Strict mode (`\"use strict\";`) is a directive that forces JavaScript to execute under strict syntax rules. When active, it turns silent errors into runtime exceptions (such as assigning values to undeclared variables), bans unsafe actions, and allows V8 to perform better runtime optimizations."
            },
            analogy: {
              tr: "Java derleyicisi yapısı gereği son derece katıdır ve kurallara uymayan kodu derlemez. JS'teki strict mode, normalde gevşek ve hata toleranslı olan JS'i Java'nın o disiplinli, hata yapmayı zorlaştıran güvenli dünyasına yaklaştırma çabasıdır.",
              en: "The Java compiler is naturally strict and will refuse to compile non-compliant code. Strict mode is an effort to bring JavaScript's loose runtime rules closer to Java's type-safe compile-time discipline."
            },
            keyPoints: [
              { tr: "\"use strict\"; ifadesi dosya veya fonksiyon başına konur", en: "Enabled by adding \"use strict\"; at the top of files or functions" },
              { tr: "Sessiz hataları gerçek runtime hatalarına dönüştürür", en: "Converts silent bugs into explicit runtime exceptions" },
              { tr: "ES Modules (ESM) varsayılan olarak strict mode ile çalışır", en: "ES Modules (ESM) run in strict mode by default" }
            ],
            tip: {
              tr: "Modern projelerde ve test framework'lerinde ES6 modülleri (import/export) kullandığımız için sıkı mod arka planda zaten otomatiktir; manuel yazmaya gerek kalmaz.",
              en: "Since modern tests use ES Modules (import/export), strict mode is implicitly active behind the scenes without needing manual directives."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te nesneler (objects) nasıl tanımlanır? Elemanlara nasıl erişilir?", en: "How are objects defined in JavaScript? How do you access their properties?" },
            a: {
              tr: "JavaScript nesneleri süslü parantezler `{}` (object literals) kullanılarak anahtar-değer (key-value) çiftleri şeklinde tanımlanır. Nesne elemanlarına erişmek için Nokta notasyonu (`nesne.ad`) veya Köşeli parantez notasyonu (`nesne['ad']`) kullanılır. Köşeli parantez notasyonu, anahtar adının dinamik veya özel karakter içerdiği durumlarda tercih edilir.",
              en: "JavaScript objects are declared using curly braces `{}` as key-value pairs. Properties can be accessed using either dot notation (`obj.key`) or bracket notation (`obj['key']`). Bracket notation is required when keys are dynamic variables or contain spaces/special characters."
            },
            analogy: {
              tr: "Java'da veri çiftleri tutmak için `HashMap<String, Object>` kullanılır. JavaScript'teki nesneler Java'daki HashMap yapısına çok benzer; ancak sınıf (class) şablonu olmadan havadan anahtar-değer çiftleri oluşturabilme esnekliği sunarlar.",
              en: "In Java, key-value mappings require `HashMap<String, Object>`. JS objects work similarly to Java HashMaps, but allow creating dynamic structures on the fly without declaring class blueprints first."
            },
            keyPoints: [
              { tr: "Object literal {} en yaygın nesne tanımlama yöntemidir", en: "Object literal {} is the standard syntax for creating objects" },
              { tr: "Dinamik key erişimlerinde köşeli parantez nesne[key] kullanılır", en: "Use bracket notation object[key] when keys are dynamic variables" },
              { tr: "JavaScript nesneleri dinamik olarak genişletilebilir", en: "JS objects can have new properties added at runtime" }
            ],
            tip: {
              tr: "Test otomasyonunda konfigürasyon dosyalarını (playwright.config.js) veya test datalarını nesne şeklinde tanımlayıp dinamik değerlerle yönetiriz.",
              en: "We heavily use JS objects in testing to define configurations (e.g. playwright.config.js) and test data inputs."
            }
          },
          {
            level: "basic",
            q: { tr: "Arrow functions (ok fonksiyonları) nedir? Normal fonksiyonlardan farkı nedir?", en: "What are arrow functions? How do they differ from regular functions?" },
            a: {
              tr: "Arrow functions, ES6 ile gelen ve `const topla = (a, b) => a + b;` şeklinde yazılan kısa fonksiyon syntax'ıdır. Normal fonksiyonlardan en büyük farkı, kendi `this`, `arguments`, `super` ve `new.target` bağlamlarına sahip olmamalarıdır. Arrow function içindeki `this`, fonksiyonun tanımlandığı dış kapsamdaki (lexical scope) `this` nesnesine bağlıdır.",
              en: "Arrow functions are a concise syntax introduced in ES6 (e.g. `const add = (a, b) => a + b;`). Their primary difference from regular functions is that they do not bind their own `this`, `arguments`, `super`, or `new.target` contexts. Instead, `this` is lexically bound to the enclosing scope."
            },
            analogy: {
              tr: "Arrow function, Java 8 ile gelen Lambda ifadelerine (`(a, b) -> a + b`) hem görsel hem de işlevsel olarak birebir benzer. Her ikisi de kapsam dışındaki değişkenlere doğrudan erişim (lexical binding) sağlar.",
              en: "Arrow functions are identical in concept and look to Java 8 Lambda expressions (`(a, b) -> a + b`). Both capture the enclosing scope's lexical context without overriding binding."
            },
            keyPoints: [
              { tr: "Kısa ve tek satırlık fonksiyon yazımları için idealdir", en: "Provides a shorter syntax ideal for single-line operations" },
              { tr: "Kendi this bağlamı yoktur; lexical this kullanır", en: "Lacks its own 'this' binding; captures 'this' lexically" },
              { tr: "constructor olarak kullanılamazlar (new ile çağrılamaz)", en: "Cannot be used as constructors (throws error with new)" }
            ],
            tip: {
              tr: "Arrow function'lar, Playwright veya Cypress testlerinde `.then()` zincirlerinde callback yazarken `this` kaymasını engellemek için standart yöntemdir.",
              en: "Arrow functions are the standard choice for writing clean callback chains in Cypress and Playwright to avoid context bugs."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te typeof ve instanceof operatörleri ne işe yarar?", en: "What do typeof and instanceof operators do in JavaScript?" },
            a: {
              tr: "`typeof` operatörü, kendisine verilen ifadenin veri tipini belirten bir string döndürür (Örn: `typeof 'test'` -> `'string'`). `instanceof` operatörü ise bir nesnenin, belirli bir sınıfın (constructor) örneği olup olmadığını kontrol eden bir boolean döndürür (Örn: `element instanceof HTMLElement`).",
              en: "`typeof` is an operator that returns a string indicating the type of the evaluated operand (e.g. `typeof 'test'` -> `'string'`). `instanceof` is an operator that checks if an object is an instance of a class/constructor function, returning a boolean (e.g. `element instanceof HTMLElement`)."
            },
            analogy: {
              tr: "Java'da bir nesnenin tip kontrolü için `instanceof` kullanılır. JS'teki `instanceof` Java'dakine benzer şekilde çalışır. Ancak Java'da `typeof` yoktur; tipler statik olarak bilindiği için çalışma zamanında string tip adı dönen genel bir operatöre gerek duyulmaz.",
              en: "Java uses `instanceof` for object type checks. JS `instanceof` behaves similarly. Java lacks a `typeof` operator because types are known at compile time, eliminating the need for a runtime type name string operator."
            },
            keyPoints: [
              { tr: "typeof: Primitives tiplerin tespiti için kullanılır", en: "typeof: Used to check primitive data types" },
              { tr: "instanceof: Nesne sınıf hiyerarşisi kontrolü için kullanılır", en: "instanceof: Used to check object prototype lineage" },
              { tr: "typeof null, hata nedeniyle 'object' döner", en: "typeof null returns 'object' due to historical baggage" }
            ],
            tip: {
              tr: "Otomasyon kütüphanelerinde gelen parametrenin seçici string mi yoksa bir locator nesnesi mi olduğunu ayırt etmek için `typeof selector === 'string'` kontrolü yapabilirsiniz.",
              en: "In utility wrappers, use `typeof selector === 'string'` to distinguish between raw string selectors and locator objects."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te scope (kapsam) nedir? Hangi scope türleri vardır?", en: "What is scope in JavaScript? What are the scope types?" },
            a: {
              tr: "Scope, değişkenlerin ve fonksiyonların kodun hangi bölgelerinden erişilebilir olduğunu belirleyen sınırlardır. JavaScript'te 3 temel scope vardır: 1. Global Scope: Her yerden erişilebilen değişkenler. 2. Function Scope: Sadece tanımlandığı fonksiyon içinde erişilebilen değişkenler (`var`). 3. Block Scope: Sadece süslü parantez `{}` bloğu içinde erişilebilen değişkenler (`let`, `const`).",
              en: "Scope determines the accessibility and lifetime of variables and functions in different parts of your code. JavaScript has 3 main scope types: 1. Global Scope: Variables accessible anywhere. 2. Function Scope: Variables accessible only inside their declaring function (`var`). 3. Block Scope: Variables accessible only inside their enclosing curly braces `{}` (`let`, `const`)."
            },
            analogy: {
              tr: "Java'da her şey blok kapsamlıdır; süslü parantez `{}` dışına değişken sızamaz. JS'teki `let` ve `const` Java'nın bu sıkı blok kapsamı kuralını taklit eder, ancak `var` fonksiyon kapsamlı olup blok dışına sızabilir.",
              en: "In Java, scoping is strictly block-scoped; variables cannot leak outside their enclosing braces `{}`. JS's `let` and `const` match this block-scoped model, whereas `var` is function-scoped and escapes block boundaries."
            },
            keyPoints: [
              { tr: "Global, Function ve Block olmak üzere 3 scope vardır", en: "Features Global, Function, and Block scopes" },
              { tr: "let ve const block scope sınırı dışına sızmaz", en: "let and const are strictly trapped by block scopes" },
              { tr: "var değişkenleri blok dışına sızarak hoisting sızıntısı yapabilir", en: "var variables leak out of blocks, causing hoist bugs" }
            ],
            tip: {
              tr: "Test suite'lerinizde test dosyasının en tepesine koyduğunuz değişkenlerin global scope yerine modül scope'unda kalması için import/export modül yapısını kullanın.",
              en: "Use ES modules to ensure top-level variables remain isolated within the module instead of polluting the global scope."
            }
          },

          // ==========================================
          // INTERMEDIATE (20 questions)
          // ==========================================
          {
            level: "intermediate",
            q: { tr: "Closure (kapanış) nedir? Gerçek bir otomasyon senaryosuyla örnekler misiniz?", en: "What is a closure? Give a practical automation test example." },
            a: {
              tr: "Closure, bir fonksiyonun kendi tanımlandığı dış kapsamdaki (lexical scope) değişkenleri, o dış kapsam sonlanmış olsa dahi hatırlaması ve bunlara erişebilmesidir. Otomasyonda, her çağrıldığında sıralı benzersiz ID veya test datası üreten bir sayaç fonksiyonu yazmak için closure kullanılır.",
              en: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment), allowing the inner function to access outer variables even after the outer function has returned. In testing, closures are used to create unique test data generators or stateful counters."
            },
            analogy: {
              tr: "Java'da local inner class'lar veya lambda ifadeleri, tanımlandıkları metottaki değişkenlere erişebilir; ancak bu değişkenlerin `final` veya 'effectively final' (değeri değişmeyen) olması şarttır. JavaScript'te ise closure içindeki dış değişkenlerin değeri serbestçe değiştirilebilir.",
              en: "In Java, lambdas and inner classes can reference outer method variables, but they must be `final` or 'effectively final'. In JavaScript, closures have no such restriction and can freely modify captured variables."
            },
            keyPoints: [
              { tr: "Kapsam dışındaki değişkenleri bellekte tutma yeteneğidir", en: "The ability to preserve references to outer variables in memory" },
              { tr: "Veri gizleme (encapsulation) için kullanılır", en: "Used to emulate private variables (data encapsulation)" },
              { tr: "Java lambdalarından daha esnektir (değişken mutasyonuna izin verir)", en: "More flexible than Java lambdas (allows mutating outer vars)" }
            ],
            tip: {
              tr: "Otomasyon suite'lerinizde benzersiz e-posta üreten stateful bir helper yazarken closure yapısından şu şekilde yararlanabilirsiniz: `const getEmail = createEmailGenerator();`.",
              en: "Use closures to write unique email generator helpers that maintain state without global variable pollution."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te prototip (prototype) ve prototip zinciri (prototype chain) nedir? Kalıtım nasıl sağlanır?", en: "What is prototype and prototype chain in JavaScript? How is inheritance achieved?" },
            a: {
              tr: "JavaScript, sınıf tabanlı kalıtım yerine prototip tabanlı bir kalıtım modeli kullanır. Her JavaScript nesnesinin gizli bir `[[Prototype]]` bağı (kodda `__proto__`) vardır. Bir nesne üzerinde metot arandığında, nesnede bulunamazsa prototipine bakılır; orada da yoksa prototipin prototipine gidilir. Bu zincire prototip zinciri denir ve `null` değerine ulaşana kadar devam eder. ES6 ile gelen `class` anahtar kelimesi, arka planda yine bu prototip yapısını kullanan sentaktik bir şekerdir.",
              en: "JavaScript uses a prototypal inheritance model rather than class-based inheritance. Every object has a private property pointing to another object called its prototype. When accessing a property on an object, JS looks at the object itself first; if not found, it traverses up the prototype chain until it either finds the property or hits `null`. The ES6 `class` syntax is sugar over this prototype system."
            },
            analogy: {
              tr: "Java'da kalıtım, sınıfların (class) derleme zamanında birbirini genişletmesiyle (`extends`) statik olarak kurulur. JS'te ise nesneler çalışma zamanında (runtime) başka nesneleri doğrudan prototip olarak bağlayarak dinamik kalıtım alırlar.",
              en: "In Java, inheritance is established statically at compile time using classes and the `extends` keyword. In JavaScript, inheritance is dynamic and happens at runtime by linking objects directly through prototype reference chains."
            },
            keyPoints: [
              { tr: "Kalıtım prototype zinciri üzerinden dinamik yürütülür", en: "Inheritance is resolved dynamically via prototype chains" },
              { tr: "ES6 classes arka planda prototipleri kullanan şeker yapıdır", en: "ES6 classes are syntactic sugar over prototypal mechanisms" },
              { tr: "Object.prototype zincirin en tepesidir", en: "Object.prototype sits at the top of the chain" }
            ],
            tip: {
              tr: "Playwright test runner'da custom class'lar yazıp Page Object Model kurduğunuzda, arka planda V8 motorunun prototype zincirini çalıştırdığını bilmek önemlidir.",
              en: "When implementing Page Object Models with ES6 classes, keep in mind that the V8 engine is resolving your helper methods via the prototype chain."
            }
          },
          {
            level: "intermediate",
            q: { tr: "`this` anahtar kelimesi JavaScript'te nasıl çalışır? Bağlamı (context) nasıl belirlenir?", en: "How does the `this` keyword work in JavaScript? How is its context determined?" },
            a: {
              tr: "Java'dan farklı olarak, JavaScript'te `this` kelimesinin değeri statik değildir; fonksiyonun nasıl çağrıldığına bağlı olarak çalışma zamanında dinamik belirlenir. 4 temel kural vardır: 1. Default: Global veya window nesnesi. 2. Implicit: Metodun çağrıldığı nesne (Örn: `nesne.metot()` çağrısında `this` nesneyi gösterir). 3. Explicit: `call`, `apply` veya `bind` ile atanan nesne. 4. New binding: `new` ile oluşturulan yeni nesne. Arrow function'lar ise kendi `this` bağlamına sahip olmayıp lexical scope'u yakalarlar.",
              en: "Unlike Java, `this` in JavaScript is not static; its value is determined dynamically at runtime based on how the function is invoked. There are 4 invocation rules: 1. Default: global/window object. 2. Implicit: the object invoking the method (e.g., `obj.method()` binds `this` to `obj`). 3. Explicit: bound using `call`, `apply`, or `bind`. 4. New binding: the newly constructed object via `new`. Arrow functions capture their enclosing execution context's `this` lexically."
            },
            analogy: {
              tr: "Java'da `this`, her zaman içinde bulunulan sınıfın o anki nesne örneğini (instance) gösterir ve değeri asla değişmez. JS'te ise bir fonksiyonu başka bir nesnenin içine ödünç verip `this` bağlamını tamamen değiştirebilirsiniz.",
              en: "In Java, `this` always points to the current instance of the enclosing class, and its binding is static. In JavaScript, you can pass a function between objects, dynamically changing what `this` refers to during execution."
            },
            keyPoints: [
              { tr: "this bağlamı fonksiyonun çağrılma anına (call-site) göre değişir", en: "The value of 'this' is decided at call-time based on invocation context" },
              { tr: "Arrow function'lar lexical this kullanır (this değişmez)", en: "Arrow functions resolve 'this' lexically from their outer scope" },
              { tr: "call/apply/bind ile this manuel olarak kilitlenebilir", en: "call, apply, and bind explicitly force the binding of 'this'" }
            ],
            tip: {
              tr: "Otomasyon sınıflarınızda callback fonksiyonları tanımlarken callback içindeki this değerinin kaybolmasını önlemek için arrow function (`() => { ... }`) yazmayı tercih edin.",
              en: "When passing callbacks inside test utilities, write arrow functions to preserve the outer class 'this' context."
            }
          },
          {
            level: "intermediate",
            q: { tr: "bind, call ve apply metotları arasındaki farklar nelerdir?", en: "What is the difference between bind, call, and apply?" },
            a: {
              tr: "Üç metot da bir fonksiyonun `this` bağlamını manuel olarak ayarlamak için kullanılır. `call()` fonksiyonu hemen çalıştırır ve argümanları virgülle ayrılmış liste şeklinde alır (`fn.call(context, arg1, arg2)`). `apply()` fonksiyonu da hemen çalıştırır ama argümanları bir dizi (array) şeklinde kabul eder (`fn.apply(context, [arg1, arg2])`). `bind()` ise fonksiyonu hemen çalıştırmaz; `this` bağlamı kilitlenmiş YENİ bir fonksiyon kopyası döndürür, böylece ileride çağrılabilir.",
              en: "All three methods explicitly bind the `this` context of a function. `call()` executes the function immediately, accepting arguments as a comma-separated list (`fn.call(ctx, arg1, arg2)`). `apply()` executes the function immediately but accepts arguments as an array (`fn.apply(ctx, [arg1, arg2])`). `bind()` does not execute immediately; it returns a NEW function copy with `this` permanently bound, to be invoked later."
            },
            analogy: {
              tr: "Java'da bir metodun ait olduğu nesne ve çağrıldığı context derleme zamanında katı bir şekilde bağlıdır. JS'te ise `call`/`apply`/`bind` sayesinde metotları sahiplerinden koparıp başka nesnelerin üzerinde esnekçe koşturabilirsiniz.",
              en: "In Java, methods are strictly bound to their parent classes and cannot be detached. JS's `call`/`apply`/`bind` allow detaching methods and executing them against other target objects dynamically."
            },
            keyPoints: [
              { tr: "call: Hemen çalıştırır, argümanlar virgülle", en: "call: Invokes immediately, arguments passed as list" },
              { tr: "apply: Hemen çalıştırır, argümanlar diziyle", en: "apply: Invokes immediately, arguments passed as array" },
              { tr: "bind: Çalıştırmaz, bound edilmiş yeni fonksiyon döner", en: "bind: Returns a new function with bound context, does not execute" }
            ],
            tip: {
              tr: "Otomasyonda, bir helper sınıfın metodunu asenkron bir callback olarak başka bir yere parametre geçerken metot içindeki `this` değerinin kaybolmaması için `.bind(this)` ekleyebilirsiniz.",
              en: "Use `.bind(this)` when passing a class helper method as a callback parameter to ensure it retains its helper class instance context."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'teki array iterasyon metotları (map, filter, reduce) ile forEach arasındaki fark nedir?", en: "What is the difference between map, filter, reduce, and forEach?" },
            a: {
              tr: "`forEach` sadece dizi elemanları üzerinde döner (döngü yapar) ve geriye bir değer döndürmez (`undefined` döner); genellikle side-effect (ekrana yazma, db'ye yazma) için kullanılır. `map()`, elemanları dönüştürerek aynı uzunlukta YENİ bir dizi döner. `filter()`, koşulu sağlayanlardan oluşan YENİ bir dizi döner. `reduce()` ise diziyi tek bir değere (sayı, nesne vb.) indirger. map, filter ve reduce orijinal diziyi asla değiştirmez (immutable).",
              en: "`forEach` iterates through array elements executing a callback for side-effects, but returns `undefined`. `map()` transforms each element to return a NEW array of the same length. `filter()` returns a NEW sub-array containing elements that pass a test condition. `reduce()` aggregates all items into a single final value (e.g. accumulator). Unlike mutable loops, map, filter, and reduce promote immutability."
            },
            analogy: {
              tr: "Java 8 ile gelen Stream API'deki `.map()`, `.filter()` ve `.reduce()` işlemleri JavaScript'teki bu fonksiyonlarla birebir aynı mantıkta çalışır. Java'daki `forEach` de JS'teki `forEach` gibi sadece döngü yürütür.",
              en: "Java 8's Stream API features `.map()`, `.filter()`, and `.reduce()` operations which mirror JavaScript's array methods. The terminal `.forEach()` in Java Streams behaves exactly like JS `forEach`."
            },
            keyPoints: [
              { tr: "forEach: Orijinal diziyi değiştirebilir, dönüş değeri yoktur", en: "forEach: Iterates for side-effects, returns undefined" },
              { tr: "map/filter: Her zaman yeni bir dizi döner (immutable)", en: "map/filter: Immutable operations returning new arrays" },
              { tr: "reduce: Tüm diziyi tek bir nesneye veya değere indirger", en: "reduce: Accumulates the array into a single target output" }
            ],
            tip: {
              tr: "Otomasyonda elementlerin text değerlerini çekip karşılaştırmak için `map()` kullanın: `const texts = elements.map(el => el.text());`. Sadece döngüyle bir şeyler yapmak için `forEach` tercih edin.",
              en: "Use `map()` in tests to transform element locators into text string arrays: `elements.map(el => el.text())`."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te Promise nedir? Callback cehennemini (callback hell) nasıl çözer?", en: "What is a Promise in JavaScript? How does it solve callback hell?" },
            a: {
              tr: "Promise, asenkron bir işlemin nihai başarı (resolved) veya başarısızlık (rejected) sonucunu temsil eden bir nesnedir. Eskiden asenkron işlemleri iç içe geçmiş callback fonksiyonlarıyla çözmeye çalışmak kodun okunmasını imkansız kılan 'Callback Hell' yapısına yol açıyordu. Promise yapısı, `.then()` ve `.catch()` zincirleri sunarak asenkron akışı yukarıdan aşağıya okunabilir, temiz bir yapıya kavuşturur.",
              en: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. Traditionally, managing async operations relied on nested callbacks, leading to unreadable code structures known as 'Callback Hell'. Promises allow chaining operations using `.then()` and `.catch()`, converting nested structures into linear, readable code."
            },
            analogy: {
              tr: "Java'daki `CompletableFuture` nesnesi, JavaScript'teki Promise nesnesinin doğrudan karşılığıdır. Her iki yapı da asenkron akışları zincirleme metotlarla yönetmeyi sağlar.",
              en: "Java's `CompletableFuture` is the direct equivalent of JavaScript's Promise. Both allow chaining async tasks and handling errors gracefully using completion stages."
            },
            keyPoints: [
              { tr: "Asenkron işlemlerin nihai sonucunu temsil eden nesnedir", en: "An object representing the eventual state of an async action" },
              { tr: "Pending, Fulfilled, Rejected olmak üzere 3 durumu vardır", en: "Has 3 states: Pending, Fulfilled, and Rejected" },
              { tr: "Callback Hell karmaşasını çözerek doğrusal zincirleme sağlar", en: "Eliminates Callback Hell by allowing flat method chaining" }
            ],
            tip: {
              tr: "Mülakatta, modern JavaScript projelerinde artık `.then()` yerine çok daha okunaklı olan `async/await` syntax'ını tercih ettiğinizi belirtin.",
              en: "Stress in interviews that while Promises solve callback hell, modern JS developers prefer the clean `async/await` syntax built on top of Promises."
            }
          },
          {
            level: "intermediate",
            q: { tr: "async/await nedir? Promise zincirlerine göre avantajları nelerdir?", en: "What is async/await? What are its advantages over raw Promise chains?" },
            a: {
              tr: "async/await, Promise'lerin üzerine kurulu, asenkron kodu senkron gibi yazıp okumamızı sağlayan sentaktik bir şekerdir (syntactic sugar). `async` ile işaretlenen fonksiyonlar otomatik olarak Promise döner; `await` ise Promise çözülene kadar fonksiyonun yürütülmesini duraklatır. Ham Promise zincirlerine (`.then()`) göre en büyük avantajı, hata yönetimini standart `try/catch` bloklarıyla yapabilmemiz ve kodun yukarıdan aşağıya okunabilirliğini artırmasıdır.",
              en: "async/await is a syntactic sugar built on top of Promises that allows writing asynchronous code that looks and behaves like synchronous code. Functions marked `async` automatically return a Promise, and `await` pauses execution until the Promise resolves. Its advantages over raw `.then()` chains include cleaner syntax, easier debugging, and using standard `try/catch` for error handling."
            },
            analogy: {
              tr: "Java'da asenkron işlemleri yönetmek için metotları engellemeden zincirler kurmak karmaşıktır. C# ve JavaScript'teki `async/await` yapısı asenkron programlamayı çok kolaylaştırır; Java'da buna birebir benzeyen bir dil anahtarı yoktur.",
              en: "Unlike JS and C#, Java doesn't have native language-level `async`/`await` keywords. Java developers rely on `.thenAccept()` or blocking `future.get()` calls, which are more verbose."
            },
            keyPoints: [
              { tr: "Promise yapısını senkron görünümlü koda dönüştürür", en: "Makes asynchronous code look and read like synchronous code" },
              { tr: "Hata yönetimi standart try/catch ile yapılır", en: "Allows handling errors using standard try/catch blocks" },
              { tr: "await sadece async fonksiyonlar içinde kullanılabilir", en: "The await keyword is only valid inside async functions" }
            ],
            tip: {
              tr: "Playwright testlerindeki adımların neredeyse tamamı birer Promise döndürdüğü için her komut satırının başında `await` kullanmak standart otomasyon pratiklerindendir.",
              en: "Since almost all Playwright browser interactions return Promises, prefixing command lines with `await` is mandatory in modern test designs."
            }
          },
          {
            level: "intermediate",
            q: { tr: "Promise.all, Promise.race ve Promise.allSettled arasındaki farklar nelerdir?", en: "What is the difference between Promise.all, Promise.race, and Promise.allSettled?" },
            a: {
              tr: "`Promise.all()` verilen tüm Promise'lerin başarıyla tamamlanmasını bekler; biri bile hata alırsa anında çöker ve reddedilir. `Promise.race()` ilk sonuçlanan (başarılı veya başarısız) Promise ile döner. `Promise.allSettled()` ise tüm Promise'lerin sonuçlanmasını (başarılı/başarısız fark etmeksizin) bekler og her birinin durumunu içeren bir dizi döndürür.",
              en: "`Promise.all()` waits for all Promises to resolve, but rejects immediately if any single Promise fails. `Promise.race()` resolves or rejects as soon as the first Promise in the array resolves or rejects. `Promise.allSettled()` waits for all input Promises to complete regardless of whether they succeeded or failed, returning an array of status objects."
            },
            analogy: {
              tr: "Java'da birden fazla `CompletableFuture` nesnesini yönetmek için `CompletableFuture.allOf()` veya `anyOf()` metotları kullanılır. JS'teki `Promise.all` ve `Promise.race` bu metotların doğrudan karşılıklarıdır.",
              en: "In Java, `CompletableFuture.allOf()` and `CompletableFuture.anyOf()` serve as the direct equivalents of JavaScript's `Promise.all()` and `Promise.race()`."
            },
            keyPoints: [
              { tr: "Promise.all: Hepsi başarılı olmalı, tek hata çökertir", en: "Promise.all: All must succeed; a single rejection rejects the whole" },
              { tr: "Promise.race: İlk biten (başarı veya hata) kazanır", en: "Promise.race: Resolves/rejects with the fastest Promise" },
              { tr: "Promise.allSettled: Hatalar dahil hepsinin bitmesini bekler", en: "Promise.allSettled: Waits for all to finish, returning status objects" }
            ],
            tip: {
              tr: "Otomasyonda, paralel olarak 5 farklı API isteği atıp hepsinin tamamlandığını doğrulamak için `Promise.all()` kullanarak test sürenizi ciddi oranda kısaltabilirsiniz.",
              en: "To optimize tests, launch multiple independent API requests concurrently using `Promise.all()` to significantly reduce test suite execution times."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'teki ES Modules (ESM) ile CommonJS (CJS) modül sistemleri arasındaki farklar nelerdir?", en: "What is the difference between ES Modules (ESM) and CommonJS (CJS) modules?" },
            a: {
              tr: "CommonJS Node.js'in eski ve varsayılan modül sistemidir; senkrondur ve `require()` / `module.exports` kullanır. ES Modules (ESM) ise modern ECMAScript standardıdır; asenkron yüklemeyi destekler, statik analiz edilebilir ve `import` / `export` anahtar kelimelerini kullanır. ESM, kullanılmayan kodların build sırasında temizlenmesini (tree-shaking) destekler.",
              en: "CommonJS (CJS) is Node's legacy module system, using synchronous `require()` and `module.exports`. ES Modules (ESM) is the official browser standard, using asynchronous `import` and `export` statements. ESM enables static analysis by compilers, which makes performance optimizations like tree-shaking possible."
            },
            analogy: {
              tr: "Java'daki `import package.Class;` yapısı statiktir ve derleme zamanında çözülür; bu yönüyle ES Modules (import) yapısına benzer. Java'da dinamik class loader'lar dışında CommonJS benzeri senkron dinamik bir yükleme pek kullanılmaz.",
              en: "Java's static `import` statements resolved at compile-time match the behavior of ES Modules. Java lacks a direct runtime equivalent to CommonJS's dynamic synchronous `require()` loader."
            },
            keyPoints: [
              { tr: "CommonJS: require() / module.exports (Senkron)", en: "CommonJS: require() / module.exports (Synchronous)" },
              { tr: "ES Modules: import / export (Asenkron, modern standart)", en: "ES Modules: import / export (Asynchronous, official standard)" },
              { tr: "ES Modules tree-shaking (ölü kod temizleme) destekler", en: "ES Modules support compile-time tree-shaking optimizations" }
            ],
            tip: {
              tr: "Modern Playwright projelerinde package.json dosyasına `\"type\": \"module\"` ekleyerek modern ES Modules (import) yapısını varsayılan hale getirmeniz tavsiye edilir.",
              en: "Set `\"type\": \"module\"` in your package.json to enable modern ES Modules imports directly in your automation workspace."
            }
          },
          {
            level: "intermediate",
            q: { tr: "Event Bubbling (Olay Balonlaşması) ve Event Capturing (Olay Yakalanması) nedir?", en: "What is Event Bubbling and Event Capturing in the DOM?" },
            a: {
              tr: "DOM'da bir elemente tıklandığında olay iki aşamada yayılır. 1. Capturing Phase: Olay en dıştaki parent elementten (document) tıklanan hedef elemente doğru aşağı iner. 2. Bubbling Phase: Olay hedef elementten başlayarak en dıştaki parent elemente doğru yukarı çıkar (balon gibi yükselir). JavaScript'te varsayılan olarak event listener'lar bubbling aşamasında tetiklenir; bunu durdurmak için `event.stopPropagation()` çağrılır.",
              en: "When an event triggers on a DOM element, it propagates in two phases. 1. Capturing Phase: The event travels down from the root document node to the target element. 2. Bubbling Phase: The event bubbles back up from the target element to the document root. By default, JS event listeners trigger during the bubbling phase. You can stop this propagation using `event.stopPropagation()`."
            },
            analogy: {
              tr: "Java masaüstü framework'lerinde (AWT/Swing/JavaFX) de olay yayılım modelleri (event propagation) bulunur. Amaç web sayfalarındaki DOM hiyerarşisi kadar derin bir iç içe geçmiş olay balonlaşması yapısı web otomasyonculara hastır.",
              en: "Desktop GUI toolkits in Java (like Swing or JavaFX) also implement hierarchical event propagation. However, DOM bubbling is unique to web platforms and is a key concept for automation."
            },
            keyPoints: [
              { tr: "Capturing yukarıdan aşağıya, Bubbling aşağıdan yukarıya yayılımdır", en: "Capturing phase flows top-down; bubbling phase flows bottom-up" },
              { tr: "stopPropagation() olayın üst katmanlara yayılmasını keser", en: "stopPropagation() halts the propagation chain immediately" },
              { tr: "Varsayılan olarak bubbling aşaması dinlenir", en: "Event listeners trigger during the bubbling phase by default" }
            ],
            tip: {
              tr: "Cypress veya Playwright ile bir butona tıklarken 'element is covered' hatası alıyorsanız, arka planda event propagation ve parent elementlerin olayı ezmesi gibi durumları incelemelisiniz.",
              en: "If UI actions fail with 'element is covered' errors, check if parent nodes are intercepting events due to DOM bubbling mechanisms."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te 'execution context' (yürütme bağlamı) ve 'lexical environment' nedir?", en: "What is execution context and lexical environment in JavaScript?" },
            a: {
              tr: "Execution Context, JavaScript kodunun derlenip çalıştırıldığı çevre/ortamdır. Lexical Environment ise kod yazılırken değişkenlerin ve fonksiyonların fiziksel olarak nerede tanımlandığını tutan sözlüktür. Kod çalışırken her fonksiyon çağrıldığında yeni bir Execution Context oluşturulur ve bu context kendi Lexical Environment'ı üzerinden üst scope'ların değişken haritalarına (scope chain) erişebilir.",
              en: "An Execution Context is the environment in which JavaScript code is evaluated and executed. A Lexical Environment is a data structure that holds identifier-variable mapping based on the physical location of code during authoring. Every function call pushes a new Execution Context onto the call stack, referencing its Lexical Environment to resolve variables up the scope chain."
            },
            analogy: {
              tr: "Java'da her metot çağrıldığında JVM call stack'inde yeni bir 'stack frame' (yığın çerçevesi) açılır ve lokal değişkenler orada tutulur. JS'teki execution context kavramı JVM'in stack frame yapısının doğrudan eşdeğeridir.",
              en: "In Java, calling a method creates a new stack frame on the JVM call stack to hold local variables. JavaScript's Execution Context is conceptually equivalent to the JVM's stack frame."
            },
            keyPoints: [
              { tr: "Global ve Functional olmak üzere context'ler oluşturulur", en: "Consists of Global and Functional Execution Contexts" },
              { tr: "Lexical Environment kodun yazıldığı fiziksel konumu baz alır", en: "Lexical environment is defined at compile-time by code position" },
              { tr: "Scope Chain bu yapılar sayesinde kurulur", en: "Scope Chain resolution relies on these lexical links" }
            ],
            tip: {
              tr: "Otomasyon kodlarında callback scope'larındaki değişkenlerin neden kaybolmadığını anlamak için lexical environment ve closure teorisini iyi bilmek mülakatta fark yaratır.",
              en: "Understanding how lexical scope resolves variables will help you debug nested callbacks in complex test scenarios."
            }
          },
          {
            level: "intermediate",
            q: { tr: "Spread ve Rest operatörleri nedir? Aralarındaki farklar nelerdir?", en: "What are the Spread and Rest operators? How do they differ?" },
            a: {
              tr: "İki operatör de üç nokta `...` syntax'ını kullanır ancak amaçları terstir. Spread (yayma) operatörü, bir diziyi veya nesneyi tekil elemanlarına ayırır/yayar (Örn: `[...dizi1, ...dizi2]` yeni bir birleşik dizi oluşturur). Rest (toplama) operatörü ise tekil argümanları bir araya getirip tek bir dizi halinde toplar (Örn: `function topla(...sayilar)` ifadesinde `sayilar` bir dizidir).",
              en: "Both operators share the triple-dot `...` syntax but perform opposite tasks. The Spread operator unpacks array/object elements into individual values (e.g., `[...arr1, ...arr2]` merges arrays). The Rest operator packs multiple individual values into a single array structure (e.g., `function sum(...nums)` gathers args)."
            },
            analogy: {
              tr: "Java'daki variable arguments (varargs - `void metot(String... args)`) yapısı JavaScript'teki Rest operatörüyle birebir aynıdır. Amaç nesneleri veya dizileri havadan yaymak (Spread) için hazır bir dil operatörü yoktur.",
              en: "Java's variable arguments syntax (varargs: `void method(String... args)`) is identical to JS's Rest operator. Java lacks a native equivalent to the Spread operator for unpacking collection elements."
            },
            keyPoints: [
              { tr: "Spread: Nesne/Dizi elemanlarını dışarı yayar (dağıtır)", en: "Spread: Unpacks collection elements into single values" },
              { tr: "Rest: Gelen parametreleri bir dizi içinde toplar (toplar)", en: "Rest: Gathers list of parameters into a single array" },
              { tr: "Java varargs = JavaScript Rest operator", en: "Java varargs = JavaScript Rest operator" }
            ],
            tip: {
              tr: "Test otomasyonunda, varsayılan test konfigürasyon nesnesini kopyalayıp bazı değerlerini ezmek için spread operatörünü sıkça kullanırız: `const testConfig = { ...defaultConfig, timeout: 10000 };`.",
              en: "Use the spread operator to easily clone and override default configuration objects in tests: `const config = { ...defaults, retries: 2 };`."
            }
          },
          {
            level: "intermediate",
            q: { tr: "Destructuring (yapı söküm) nedir? Test datası okurken nasıl fayda sağlar?", en: "What is destructuring? How does it help when reading test data?" },
            a: {
              tr: "Destructuring, nesnelerin veya dizilerin içindeki değerleri tek bir hamlede çıkarıp bağımsız değişkenlere atamayı sağlayan pratik bir ES6 özelliğidir. Örneğin, `const { username, password } = testData;` yazarak nesnedeki iki alanı tek satırda değişken haline getirebiliriz. Test otomasyonunda karmaşık JSON dosyalarından veya API yanıtlarından belirli alanları ayıklamak için kod kalabalığını ciddi oranda azaltır.",
              en: "Destructuring is a feature introduced in ES6 that allows unpacking values from arrays or properties from objects into distinct variables in a single statement. E.g. `const { username, password } = testData;`. In testing, it eliminates boilerplate code when extracting fields from nested JSON config files or API payloads."
            },
            analogy: {
              tr: "Java'da bir nesnenin alanlarını değişkenlere atamak için her alan için ayrı getter çağırmak zorundasınız (`String user = data.getUsername();`). JS destructuring ise bu hantal yapıyı tek satıra indirger.",
              en: "In Java, assigning object properties to variables requires separate getter calls (e.g. `String user = data.getUser()`). JS destructuring condenses this verbose assignment pattern into a single expression."
            },
            keyPoints: [
              { tr: "Object destructuring: Nesne alanlarını değişkene atar", en: "Object destructuring: Unpacks object properties into variables" },
              { tr: "Array destructuring: Dizi elemanlarını sırayla değişkene atar", en: "Array destructuring: Unpacks array items by order index" },
              { tr: "Varsayılan değer (default values) tanımlamayı destekler", en: "Supports setting default fallback values during unpack" }
            ],
            tip: {
              tr: "Playwright testlerinde test fonksiyonunun parametresindeki `{ page }` ifadesi aslında bir destructuring örneğidir; context nesnesinden sadece page locator'ını ayıklayıp alır.",
              en: "The `{ page }` parameter passed to Playwright test functions is a direct example of object destructuring from the test context object."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te bir callback fonksiyonu nedir? Senkron ve asenkron callback farkını açıklar mısınız?", en: "What is a callback function? Explain the difference between synchronous and asynchronous callbacks." },
            a: {
              tr: "Callback, başka bir fonksiyona parametre olarak geçilen ve o fonksiyonun içinde yürütülmesi beklenen fonksiyonlardır. Senkron callback'ler anında, sırayla çalıştırılır (Örn: `array.map(fn)` içindeki `fn`). Asenkron callback'ler ise zaman alan bir işlem bittiğinde tetiklenmek üzere arka plana atılır (Örn: `setTimeout(fn, 1000)` veya network isteği bitince çalışan fonksiyonlar).",
              en: "A callback function is a function passed into another function as an argument, intended to be executed inside the outer function. Synchronous callbacks execute immediately and in sequence (e.g., `array.map(callback)`). Asynchronous callbacks are deferred, executing later once a background task completes (e.g. `setTimeout(callback, 1000)` or network API call callbacks)."
            },
            analogy: {
              tr: "Java'da callback'ler genellikle bir Interface (Örn: `Runnable` veya custom Listener) veya Java 8 Functional Interface'ler (Consumer, Function) parametre geçilerek simüle edilir. JS'te ise fonksiyonlar birinci sınıf nesne olduğundan doğrudan parametre olarak aktarılır.",
              en: "In Java, callbacks require implementing an Interface (e.g. `Runnable` or `Callable`) or passing Java 8 Functional Interfaces. JS treats functions as first-class citizens, allowing them to be passed as raw parameters directly."
            },
            keyPoints: [
              { tr: "Callback parametre olarak geçilen standart fonksiyondur", en: "A callback is simply a function passed as an argument" },
              { tr: "Senkron callback anında ve blocking çalışır", en: "Synchronous callbacks run immediately and block further execution" },
              { tr: "Asenkron callback Event Loop sırasına girer (non-blocking)", en: "Asynchronous callbacks register via Event Loop (non-blocking)" }
            ],
            tip: {
              tr: "Otomasyon kütüphanelerinde element aramalarında kullanılan filtreleme adımları veya asenkron `page.route()` intercept işlemlerinde callback yapılarını yoğun şekilde kullanırız.",
              en: "Callbacks are heavily utilized in network interception steps like Playwright's `page.route()` to define custom response mocks."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te closures ve scopes arasındaki fark nedir?", en: "What is the difference between closures and scopes in JavaScript?" },
            a: {
              tr: "Scope (kapsam), değişkenlerin kodun neresinde erişilebilir olduğunu belirleyen kurallar bütünüdür (derleme zamanında netleşir). Closure (kapanış) ise bu scope kuralları sayesinde, bir fonksiyonun kendi dış kapsamındaki değişkenleri referans alarak bu bağı çalışma zamanında (runtime) bellekte korumasıdır. Özetle, scope kuralları sınırı çizer; closure ise bu sınırın içindeki değişkenleri canlı tutan mekanizmadır.",
              en: "Scope refers to the visibility rules of variables in the code hierarchy, determined at compile-time. Closure is the runtime mechanism where a function preserves and carries access to its outer lexical scope variables even after that scope has closed. In short, scope defines the boundaries, while closure is the mechanism that keeps variables within those boundaries alive."
            },
            analogy: {
              tr: "Java'da bir metodun içindeki değişkenler metot bitince yok olur (stack temizlenir). JS'te ise closure sayesinde içteki fonksiyon dıştaki değişkeni referans alıyorsa, dıştaki fonksiyon bitse dahi o değişken garbage collector tarafından silinmez, yaşatılır.",
              en: "In Java, local stack variables are discarded the moment a method execution finishes. In JavaScript, closures protect captured variables from garbage collection as long as the inner function retains a reference to them."
            },
            keyPoints: [
              { tr: "Scope statiktir (kodun yazıldığı yere göre belirlenir)", en: "Scope is static, resolved during lexical compilation phase" },
              { tr: "Closure dinamiktir (çalışma zamanında belleği açık tutar)", en: "Closure is dynamic, keeping lexical variables alive at runtime" },
              { tr: "Tüm JavaScript fonksiyonları doğası gereği birer closure'dır", en: "Technically, all JavaScript functions carry closure capability" }
            ],
            tip: {
              tr: "Mülakatta scope ve closure farkı sorulduğunda: 'Scope kuralları sınırları tanımlar, closure ise bu sınırların içindeki değişkenleri referans yoluyla bellekte yaşatan bir köprüdür' şeklinde özetleyin.",
              en: "Summarize: 'Scope defines variable access rules at compile-time, while closure is the runtime bridge that keeps those variables alive in memory.'"
            }
          },
          {
            level: "intermediate",
            q: { tr: "Debounce ve Throttle teknikleri nedir? Aralarındaki temel fark nedir?", en: "What are Debounce and Throttle? What is the main difference?" },
            a: {
              tr: "İkisi de sık tetiklenen işlemlerin (Örn: pencere boyutunu değiştirme, klavyeden arama kutusuna yazma) performans sorunlarına yol açmasını önlemek için kullanılan kontrol teknikleridir. Debounce, işlem tetiklendikten sonra belirli bir süre sessizlik bekler; o süre dolmadan yeni bir tetikleme gelirse sayacı sıfırlar ve işlemi öteler. Throttle ise işlem ne kadar sık tetiklenirse tetiklensin, işlemi belirli zaman aralıklarında (Örn: her 200ms'de en fazla bir kez) sabit bir ritimle çalıştırır.",
              en: "Both are optimization techniques to limit the rate at least some functions are executed (e.g. window resizing, search box keypresses). Debounce delays the execution of a function until a certain amount of idle time has passed since the last call. Throttle ensures the function is called at most once in a specified time interval, pacing the execution rate."
            },
            analogy: {
              tr: "Java'da bir log kuyruğuna sürekli veri yazarken disk yazma yükünü azaltmak için Buffer mekanizması kullanmaya benzer. Debounce, yazmayı tamamen durunca tek seferde basmaya; Throttle ise saniyede bir kez diske yazmaya benzetilebilir.",
              en: "Similar to Java buffer write streams. Debouncing matches waiting for a pause to flush the buffer at once, while throttling matches flushing the buffer at a fixed rate of once per second."
            },
            keyPoints: [
              { tr: "Debounce: Tetiklenme durunca (bekleme süresi sonunda) çalışır", en: "Debounce: Triggers only after a period of inactivity" },
              { tr: "Throttle: Belirli periyotlarla (ritmik olarak) çalışır", en: "Throttle: Paces execution to trigger at regular time intervals" },
              { tr: "Performans ve ağ isteklerini optimize etmek için kullanılır", en: "Crucial for optimizing heavy DOM updates and API load rates" }
            ],
            tip: {
              tr: "Otomasyon testlerinizde dinamik arama kutularına (autocomplete) yazı yazarken sitenin debounce mekanizmasının çalışıp arama isteklerini doğru attığını doğrulamak için harf geçişleri arasına ufak bekleme süreleri koymalısınız.",
              en: "When testing autocomplete fields, remember that debounce delays require tests to wait briefly before asserting drop-down options."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'teki 'strict mode' etkinleştirildiğinde 'this' bağlamı nasıl etkilenir?", en: "How does 'strict mode' affect the 'this' context in JavaScript?" },
            a: {
              tr: "Normal (non-strict) modda, bir fonksiyon herhangi bir nesne bağlamı olmadan düz çağrıldığında (`fn()`), içindeki `this` varsayılan olarak global nesneyi (`window` veya `global`) gösterir. Ancak 'strict mode' aktif olduğunda, bu durum güvenlik sızıntılarını önlemek amacıyla engellenir ve global nesne yerine `this` değeri `undefined` olur.",
              en: "In non-strict mode, invoking a standalone function (`fn()`) binds its `this` context to the global object (`window` or `global`). When strict mode is enabled, this implicit binding is blocked to prevent accidental global pollutions, making `this` evaluate to `undefined` instead."
            },
            analogy: {
              tr: "Java'da bir static metodun veya sınıf dışı bağımsız bir fonksiyonun içinden sınıf nesnesi referansı (`this`) çağırmak kesinlikle yasaktır ve derleme hatası verir. JS strict mode da bu kuralı taklit ederek global nesneye kaçak erişimi engeller.",
              en: "In Java, using `this` inside static methods is a compilation error. JS strict mode emulates this rule by refusing to fallback to global object targets, preventing silent errors."
            },
            keyPoints: [
              { tr: "Strict mode altında global nesneye this bağlaması yapılmaz", en: "Strict mode prevents default binding of 'this' to the global object" },
              { tr: "Bağlamsız fonksiyon çağrılarında this undefined olur", en: "Unbound function calls evaluate 'this' to undefined" },
              { tr: "Güvenlik ve hata tespiti için kritik bir korumadır", en: "Critical for catching accidental global variable declarations" }
            ],
            tip: {
              tr: "Strict mode altında `this` undefined olacağı için, eğer fonksiyon içinde nesne alanlarına erişmeye çalışırsanız anında TypeError alırsınız. Bu sayede hataları erkenden yakalamış olursunuz.",
              en: "Under strict mode, accessing properties on unbound functions throws TypeError immediately, preventing silent data corruptions."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JSON nesnesi nedir? JavaScript nesnesi (Object) ile farkı nedir?", en: "What is the JSON object? How does it differ from a JavaScript object?" },
            a: {
              tr: "`JSON` (JavaScript Object Notation), verileri metin formatında taşımak için kullanılan dilden bağımsız standart bir formattır. JavaScript nesnesi (Object) ise JavaScript runtime'ında yaşayan canlı bir bellek yapısıdır. Farklar: JSON'da tüm anahtarlar (keys) çift tırnak `\"` içinde olmak zorundadır, fonksiyon veya undefined değerleri taşıyamaz. JavaScript nesnesinde ise anahtarlar tırnaksız olabilir, fonksiyonlar (metotlar) barındırabilir.",
              en: "JSON (JavaScript Object Notation) is a lightweight, language-independent text format for data exchange. A JS Object is a live, in-memory data structure. JSON requires double quotes around keys and string values, and cannot store functions, symbols, or undefined values, whereas JS Objects can hold methods and dynamic references."
            },
            analogy: {
              tr: "Java'daki POJO (Plain Old Java Object) ile bunun serialize edilmiş JSON metni (String) arasındaki fark neyse, JS nesnesi ile JSON string'i arasındaki fark da odur. Dönüşüm için `JSON.stringify()` (serialization) ve `JSON.parse()` (deserialization) kullanılır.",
              en: "The difference matches Java's POJO serialization to a JSON String. We use `JSON.stringify()` to serialize a JS object to a string, and `JSON.parse()` to deserialize a JSON string back into a live JS object."
            },
            keyPoints: [
              { tr: "JSON bir metin formatıdır; JS Object ise canlı bellek nesnesidir", en: "JSON is a serialization text format; JS Object is a memory structure" },
              { tr: "JSON.stringify() -> Nesneyi JSON string'ine çevirir", en: "JSON.stringify() converts JS object to JSON string" },
              { tr: "JSON.parse() -> JSON string'ini canlı nesneye çevirir", en: "JSON.parse() parses JSON string back into JS object" }
            ],
            tip: {
              tr: "API otomasyon testlerinizde request payload'ları oluştururken JavaScript nesnesi yazar, ardından bunu `JSON.stringify()` ile paketleyip HTTP body'sine eklersiniz. Rest-Assured'daki serialization adımları burada bu kadar basittir.",
              en: "In API tests, write payloads as clean JS objects and let your framework serialize them to JSON strings automatically."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te 'currying' nedir? Hangi amaçla kullanılır?", en: "What is currying in JavaScript? What is it used for?" },
            a: {
              tr: "Currying, birden fazla argüman alan bir fonksiyonu, her seferinde tek bir argüman alan ve geriye yeni bir fonksiyon döndüren zincirleme fonksiyonlar yapısına dönüştürme tekniğidir. Örnek: `topla(1, 2)` yerine `topla(1)(2)`. Bu teknik, fonksiyonlerin belirli parametrelerini sabitleyerek yeniden kullanılabilir alt fonksiyonlar (partial application) türetmek için kullanılır.",
              en: "Currying is a transformation technique that translates a function callable as `fn(a, b, c)` into a sequence of nested functions callable as `fn(a)(b)(c)`. It allows fixing some arguments of a function (partial application) to generate highly reusable specialized helper functions."
            },
            analogy: {
              tr: "Java'da currying doğrudan desteklenmez ancak benzer bir yapı Java 8 functional interface'leri birbiri içine yuvalayarak (`Function<Integer, Function<Integer, Integer>>`) kurulabilir; fakat yazımı çok ağırdır.",
              en: "In Java, currying is verbose, requiring nesting of functional interfaces (e.g. `Function<Integer, Function<Integer, Integer>>`). JS's first-class functions make implementing currying natural."
            },
            keyPoints: [
              { tr: "Argümanların kısmi uygulanmasını (partial application) sağlar", en: "Allows partial application of function arguments" },
              { tr: "Closure yeteneğini kullanarak parametreleri hafızada tutar", en: "Utilizes closures to retain parameter states across chains" },
              { tr: "Fonksiyonların yeniden kullanılabilirliğini (reusability) artırır", en: "Enhances helper modularity and functional composition" }
            ],
            tip: {
              tr: "Otomasyonda, belirli bir log seviyesini sabitleyip sürekli aynı etiketle log basan özel fonksiyonlar türetmek için currying yapısını kullanabilirsiniz: `const logError = log('ERROR'); logError('Hata oluştu');`.",
              en: "Use currying to pre-configure testing loggers (e.g. fixing the environment tag or log severity level beforehand)."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te rest parametresi ile arguments nesnesi arasındaki fark nedir?", en: "What is the difference between the rest parameter and the arguments object?" },
            a: {
              tr: "İkisi de fonksiyona geçilen dinamik sayıdaki argümanlara erişmek için kullanılır. Farklar: 1. `arguments` nesnesi ES6 öncesinden gelen, diziye benzer (array-like) ama gerçek dizi metotlarına (map, filter) sahip olmayan hantal bir yapıdır; arrow function'larda bulunmaz. 2. Rest parametresi (`...args`) ise gerçek bir Array nesnesidir, modern standarttır, arrow function'larda çalışır ve sadece geriye kalan parametreleri yakalamak için fonksiyon imzasının sonuna yerleştirilebilir.",
              en: "Buy dynamic module loads conditionally in testing hooks to load massive test data JSON files or OS-specific drivers on demand. CommonJS require() is synchronous, whereas ESM imports can resolve statically or dynamically."
            },
            analogy: {
              tr: "Java'daki varargs (`String...`) doğrudan gerçek bir array gibi davranır. JS'teki rest parametresi de Java'daki varargs gibi temiz ve dizi metotlarıyla doğrudan uyumlu bir yapı sunar.",
              en: "Java's varargs acts as a standard array. JavaScript's Rest parameter mirrors this, providing a clean array wrapper compared to the legacy `arguments` object."
            },
            keyPoints: [
              { tr: "arguments: Array-like nesnedir, gerçek dizi metotları çalışmaz", en: "arguments: Array-like object, lacks native array methods" },
              { tr: "Rest (...args): Gerçek dizi döner, tüm array metotları mevcuttur", en: "Rest (...args): Yields a true array, enabling map/filter" },
              { tr: "Arrow function'lar'da arguments bulunmaz, rest kullanılmalıdır", en: "Arrow functions lack 'arguments'; Rest must be used" }
            ],
            tip: {
              tr: "Modern JavaScript standartlarında `arguments` kullanımı tamamen terk edilmiştir. Dinamik parametre alan tüm fonksiyonlarınızda sadece Rest (`...`) operatörünü kullanmalısınız.",
              en: "In modern JS development, the legacy `arguments` object is deprecated. Always use the Rest (`...`) parameter for variable arguments."
            }
          },

          // ==========================================
          // ADVANCED (15 questions)
          // ==========================================
          {
            level: "advanced",
            q: { tr: "V8 Engine (V8 Motoru) asenkron JavaScript kodunu nasıl derler ve optimize eder? (Ignition, TurboFan)", en: "How does the V8 Engine compile and optimize JavaScript code? (Ignition, TurboFan)" },
            a: {
              tr: "Google Chrome ve Node.js tarafından kullanılan V8, bir Just-In-Time (JIT) derleyicidir. Süreç şu şekilde işler: 1. Parser kodu okur ve Soyut Sözdizimi Ağacı (AST) üretir. 2. 'Ignition' adlı yorumlayıcı AST'yi alır ve hızlıca çalıştırılabilen Bytecode üretir. 3. Kod çalışırken 'TurboFan' adlı profil derleyicisi sıcak noktaları (hot code - sık çalışan fonksiyonlar) izler. Sık kullanılan ve tipi değişmeyen fonksiyonları doğrudan makine koduna (JIT) derleyerek ultra hızlı çalıştırır. Eğer değişken tipi aniden değişirse (deoptimization), optimize kodu çöpe atıp tekrar bytecode yorumlayıcısına geri döner (deopt).",
              en: "V8 (used in Chrome & Node) is a hybrid Just-In-Time (JIT) compiler. First, the parser generates an Abstract Syntax Tree (AST). Next, the interpreter 'Ignition' converts AST into Bytecode for fast startup. During execution, the optimizing compiler 'TurboFan' monitors 'hot' code paths (frequently run functions). If a function runs with stable types, TurboFan compiles it directly into optimized machine code. If a type changes dynamically later, V8 performs deoptimization, discarding machine code and falling back to bytecode."
            },
            analogy: {
              tr: "V8 motorundaki Ignition (yorumlayıcı) ve TurboFan (JIT) yapısı, Java Sanal Makinesindeki (JVM) bytecode yorumlama og C1/C2 JIT derleyici (HotSpot JVM) mimarisiyle neredeyse birebir aynıdır. İkisi de sık koşan kodu gözleyip runtime'da makine diline derler.",
              en: "V8's Ignition and TurboFan architecture is conceptually identical to the HotSpot JVM's interpreter and C1/C2 JIT compilers. Both profile execution at runtime to compile hot bytecode into native CPU instructions."
            },
            keyPoints: [
              { tr: "Ignition: AST'yi hızlıca bytecode'a çeviren interpreter", en: "Ignition: Fast startup interpreter translating AST to bytecode" },
              { tr: "TurboFan: Sıcak kod yollarını makine koduna derleyen JIT", en: "TurboFan: Profile-guided JIT compiler producing optimized machine code" },
              { tr: "Deoptimization: Değişken tipi değişirse optimize kod çöpe atılır", en: "Deoptimization: Triggers fallback to bytecode if types mutate dynamically" }
            ],
            tip: {
              tr: "V8 motorunun JIT optimizasyonunu (TurboFan) bozmamak için fonksiyonlarınıza gönderdiğiniz parametre tiplerinin kararlı (monomorphic) kalmasına dikkat edin; tipleri sürekli değiştirmek deopt tetikler ve kodu yavaşlatır.",
              en: "To keep V8 JIT optimizations active, ensure function parameters are monomorphic (same shapes/types). Changing parameter shapes forces deoptimization."
            }
          },
          {
            level: "advanced",
            q: { tr: "Event Loop microtask ve macrotask kuyrukları arasındaki fark nedir? Yürütme önceliği nasıldır?", en: "What is the difference between the microtask and macrotask queues in the Event Loop?" },
            a: {
              tr: "Asenkron callback'ler iki farklı kuyrukta yönetilir. 1. Macrotasks (Task Queue): `setTimeout`, `setInterval`, `setImmediate`, I/O işlemleri ve DOM eventleri. 2. Microtasks: `Promise.then/catch` callback'leri, `queueMicrotask` ve `process.nextTick` (Node.js). Yürütme Önceliği: Call Stack boşaldığında, Event Loop ÖNCE Microtask kuyruğundaki TÜM görevleri bitirir (kuyruğa yeni eklenenler dahil). Ancak Microtask kuyruğu tamamen sıfırlandıktan sonra tek bir Macrotask yürütülür ve süreç başa döner.",
              en: "Asynchronous callbacks are managed in two distinct queues. 1. Macrotasks: `setTimeout`, `setInterval`, I/O, UI rendering, and events. 2. Microtasks: `Promise.then/catch` callbacks, `queueMicrotask`, and `process.nextTick` (Node.js). Execution Order: Once the Call Stack is empty, the Event Loop executes ALL tasks in the Microtask queue (including those queued during execution). Only when the Microtask queue is completely exhausted does the Event Loop take the first single task from the Macrotask queue."
            },
            analogy: {
              tr: "Java'daki öncelikli kuyruk (PriorityQueue) mantığına benzetilebilir. Microtask'lar yüksek öncelikli VIP misafirler gibidir; dondurma kuyruğu boşaldığında tüm VIP misafirler (microtasks) servis almadan normal sıradaki tek bir kişiye (macrotask) sıra gelmez.",
              en: "Think of it as a VIP Priority Queue. Microtasks are high-priority VIP tickets. The Event Loop will serve all VIP queue requests (microtasks) before serving a single general admission ticket holder (macrotask)."
            },
            keyPoints: [
              { tr: "Microtask önceliklidir; Call Stack boşalınca tüm microtask'ler eriyecektir", en: "Microtasks have absolute priority; all pending microtasks must resolve before next macrotask" },
              { tr: "Promises = Microtask; setTimeout = Macrotask", en: "Promises produce Microtasks; setTimeout produces Macrotasks" },
              { tr: "Her bir macrotask'tan sonra tarayıcı render/paint adımı tetiklenebilir", en: "Browser rendering/painting runs after microtasks, before the next macrotask" }
            ],
            tip: {
              tr: "Mülakatta şu örneği verin: 'Bir loop içinde sürekli Promise çözüp microtask kuyruğunu beslerseniz, macrotask kuyruğundaki setTimeout asla çalışamaz ve sayfa donar.'",
              en: "Explain that endlessly chaining promises creates a microtask loop that starves macrotasks like `setTimeout`, causing UI freezes."
            }
          },
          {
            level: "advanced",
            q: { tr: "V8 Engine'de 'Hidden Classes' (Gizli Sınıflar) ve 'Inline Caching' (Satır İçi Önbellekleme) nedir? Performansı nasıl etkiler?", en: "What are Hidden Classes and Inline Caching in V8? How do they improve performance?" },
            a: {
              tr: "JavaScript dinamik bir dildir ve nesnelerin yapısı runtime'da değişebilir. V8, nesne özelliklerine (properties) hızlı erişmek için arka planda 'Hidden Classes' (veya Shape) yapısı oluşturur. İki nesne aynı sırada aynı alanlarla tanımlanırsa aynı gizli sınıfı paylaşırlar. 'Inline Caching' (IC) ise, bir fonksiyon içindeki nesne erişim konumlarını hafızaya alarak prototype aramalarını atlar. Nesne şekli değişirse (alan ekleme/çıkarma sırası farklıysa) gizli sınıf bağı bozulur (transition) ve IC devre dışı kalır, bu da performansı düşürür.",
              en: "JavaScript lacks compile-time classes, making property lookups slow. V8 resolves this by creating internal 'Hidden Classes' (also called shapes) at runtime. Objects sharing the same properties defined in the exact same order share the same hidden class shape. Inline Caching (IC) uses these shapes to shortcut property offset lookups, skipping prototype chain traversal. If property structures mutate dynamically, V8 splits the hidden class, destroying IC efficiency."
            },
            analogy: {
              tr: "Java'da nesnelerin bellekteki yerleşim planı sınıf (Class) yapısı sayesinde derleme zamanında bellidir; JVM offset adresini doğrudan bilir. V8 motorunun Hidden Classes mimarisi, Java'nın bu hızlı doğrudan bellek erişimi (field offset) avantajını dinamik JavaScript'e kazandırma simülasyonudur.",
              en: "In Java, object memory layouts are declared statically via classes, allowing the JVM to resolve property offsets instantly. V8's Hidden Classes simulate this compile-time memory offset lookup speed within a dynamic runtime environment."
            },
            keyPoints: [
              { tr: "Hidden Classes (Shapes) nesne yapısını V8'e tanıtır", en: "Hidden Classes map object shapes internally within V8 memory" },
              { tr: "Inline Caching offset adresini önbelleğe alıp lookup süresini sıfırlar", en: "Inline Caching stores property offsets to bypass prototype lookup overhead" },
              { tr: "Properties ekleme sırası değişirse yeni bir hidden class türetilir (yavaşlama)", en: "Adding properties in different orders creates mismatched shapes, hurting performance" }
            ],
            tip: {
              tr: "Performans kritik otomasyon script'lerinde nesnelerinizi her zaman aynı nesne yerleşim sırasıyla tanımlayın; alan ekleme sırasını değiştirmek megamorphic aramaya yol açar.",
              en: "Construct objects using uniform factories or exact property sequence templates to prevent V8 from triggering slow megamorphic fallback maps."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript'te bellek sızıntıları (memory leaks) nasıl oluşur? V8 çöp toplayıcısı (garbage collector) nasıl çalışır?", en: "How do memory leaks occur in JavaScript? How does the V8 garbage collector work?" },
            a: {
              tr: "Bellek sızıntıları, artık ihtiyaç duyulmayan nesnelerin referanslarının serbest bırakılmaması nedeniyle oluşur. Yaygın nedenler: Global değişken sızıntıları, temizlenmeyen `setInterval` tanımları, silinmiş DOM elemanlarına referans tutan JS nesneleri ve hatalı closure kullanımları. V8 çöp toplayıcısı 'Mark-and-Sweep' (İşaretle ve Süpür) algoritmasını kullanır. Kök nesnelerden (root) başlayarak ulaşılamayan tüm nesneleri bellekten temizler. V8 bellek yönetimini genç (Scavenger) ve yaşlı (Mark-Sweep-Compact) nesne jenerasyonları olarak ikiye ayırır.",
              en: "Memory leaks occur when objects that are no longer needed retain active reference pointers. Common causes: accidental globals, unmanaged `setInterval` loops, detached DOM node references, and closure leakage. V8's Garbage Collector uses the 'Mark-and-Sweep' algorithm. It traverses memory from root nodes (global execution contexts), marking reached elements, and sweeps away unmarked, unreachable memory. It segments memory into Young (Scavenger) and Old generations."
            },
            analogy: {
              tr: "V8 GC jenerasyonel bellek yönetim modeli, Java HotSpot JVM garbage collector (Young/Old Generation, Mark-Sweep-Compact) yapısıyla birebir aynı teorilere dayanır. İkisi de kısa ömürlü nesneleri hızlı temizler, uzun ömürlüleri yaşlı nesne alanına taşır.",
              en: "V8's generational GC model is conceptually identical to the HotSpot JVM's garbage collection (Young/Old generations, compaction phases). Both assume the generational hypothesis: most objects die young."
            },
            keyPoints: [
              { tr: "Ulaşılamayan nesneler Mark-and-Sweep ile temizlenir", en: "Unreachable memory is identified and collected via Mark-and-Sweep" },
              { tr: "Accidental globals ve temizlenmeyen timer'lar sızıntı kaynağıdır", en: "Accidental globals and active timers are primary sources of leaks" },
              { tr: "Scavenger genç nesneleri milisaniyeler içinde hızlıca temizler", en: "The Scavenger sub-collector sweeps young generation nodes ultra-fast" }
            ],
            tip: {
              tr: "Otomasyon script'lerinizde event listener veya setInterval açtıysanız, testin sonunda `clearInterval` veya `removeEventListener` çağrısı yaparak sızıntıları engellemeyi alışkanlık edinin.",
              en: "Always clear timeouts and unsubscribe from event listeners in your test teardown hooks to avoid memory leaks during long CI test suite runs."
            }
          },
          {
            level: "advanced",
            q: { tr: "WeakMap/WeakSet nedir? Map/Set yapılarından farkları nelerdir?", en: "What are WeakMap/WeakSet? How do they differ from Map/Set?" },
            a: {
              tr: "Ana fark bellek yönetimi (garbage collection) ve anahtar tipleriyle ilgilidir. 1. `Map` ve `Set` içinde tutulan nesnelere olan referanslar güçlüdür (strong reference), nesne dışarıda silinse dahi Map içinde tutulduğu için bellekten temizlenmez. 2. `WeakMap` ve `WeakSet` ise zayıf referans (weak reference) tutar; anahtarlar sadece Object olmak zorundadır. Eğer bir anahtar nesneye dışarıda başka hiçbir referans kalmadıysa, garbage collector bu nesneyi WeakMap içinden otomatik olarak siler ve belleği temizler. Ayrıca WeakMap'ler iterable değildir.",
              en: "`Map` and `Set` hold strong references to their keys and values, preventing garbage collection even if all other external references are deleted. `WeakMap` and `WeakSet` hold weak references; keys must strictly be objects. If no other active references to a key object remain, V8's garbage collector automatically reclaims the memory and removes the entry from the WeakMap. WeakMaps are not iterable."
            },
            analogy: {
              tr: "Java'daki `WeakHashMap` nesnesi, JavaScript'teki `WeakMap` yapısının doğrudan karşılığıdır. Her iki dil yapısı da kullanılmayan nesne referanslarının zayıf bağlarla tutulup belleğin şişmesini önlemek için tasarlanmıştır.",
              en: "Java's `WeakHashMap` behaves exactly like JavaScript's `WeakMap`. Both are designed to hold metadata references weakly, permitting automatic garbage collection when objects are discarded externally."
            },
            keyPoints: [
              { tr: "WeakMap anahtarları sadece nesne (Object) olabilir", en: "WeakMap keys must strictly be objects, not primitives" },
              { tr: "Zayıf referanslar nesnenin GC tarafından temizlenmesini engellemez", en: "Weak references permit GC reclamation when all outer pointers disappear" },
              { tr: "WeakMap/WeakSet döngüyle dönülemez (iterable değildir)", en: "WeakMap and WeakSet are non-iterable and lack size properties" }
            ],
            tip: {
              tr: "Mülakatta: 'Önbellek (caching) mekanizmaları kurarken veya DOM nesnelerine özel metadata bağlarken, bellek sızıntılarını önlemek için Map yerine WeakMap tercih ederim' demek mükemmel bir yanıttır.",
              en: "Explain: 'I use WeakMap when attaching private metadata to DOM nodes or managing cache stores to prevent memory leaks if elements are removed from the DOM.'"
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript'teki Stack ve Heap bellek yerleşimi nasıldır? Closure değişkenleri nerede saklanır?", en: "How are Stack and Heap memory allocated in JS? Where do closure variables live?" },
            a: {
              tr: "Normal şartlarda primitive değerler og fonksiyon çağrı çerçeveleri (execution contexts) Stack üzerinde hızlıca tahsis edilir; nesneler ve diziler ise dinamik olarak Heap'te saklanır. Ancak, bir fonksiyon içinden bir closure geriye döndürüldüğünde, closure'ın eriştiği dış kapsamdaki (lexical scope) yerel değişkenler Stack temizlendikten sonra da yaşamak zorundadır. Bu yüzden V8 motoru, closure tarafından yakalanan (captured) değişkenleri Stack yerine otomatik olarak Heap bellekte (Context nesnesi içinde) saklar.",
              en: "Typically, primitive values and call stack frames (execution contexts) are allocated on the Stack, while objects and arrays live on the Heap. However, when a function returns a closure, any variables captured by that closure must persist after the parent function's stack frame is popped. V8 detects this and allocates these captured variables in a heap-based 'Context' object instead of the local stack frame."
            },
            analogy: {
              tr: "Java'da lokal değişkenler kesinlikle Stack'tedir; metottan bir nesne dönse dahi lokal değişkenler yaşamaz. JVM nesneleri hep Heap'te oluşturur. JS motoru ise asenkron yapısı ve closure'lar nedeniyle gerektiğinde lokal değişkenleri sessizce Heap'e taşıyabilir (Escape Analysis).",
              en: "In Java, primitive local variables are strictly stored on the stack and discarded when the method exits. In JavaScript, due to closure escape requirements, V8 implicitly hoists stack variables to heap-allocated context scopes dynamically."
            },
            keyPoints: [
              { tr: "Primitive değerler ve frame'ler Stack'te durur", en: "Standard primitives and activation frames reside on the Stack" },
              { tr: "Nesneler Heap'te saklanır", en: "Objects and complex structures reside on the Heap" },
              { tr: "Closure tarafından yakalanan lokal değişkenler Heap'e taşınır (Context)", en: "Captured closure variables escape to heap-allocated Context scopes" }
            ],
            tip: {
              tr: "Mülakatta bu ayrımı vurgulamak, JS motorunun bellek düzeyindeki (memory allocation) çalışma prensiplerine hakim olduğunuzu net bir şekilde kanıtlar.",
              en: "Explaining that V8 moves captured stack variables to the Heap to support closures shows a profound understanding of runtime memory management."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript event loop aşamaları nelerdir? (timers, poll, check fazları)", en: "What are the phases of the JavaScript event loop? (timers, poll, check phases)" },
            a: {
              tr: "Node.js (libuv) ve tarayıcı event loop mimarisi belirli fazlardan oluşur ve sırayla döner. 1. Timers: `setTimeout` ve `setInterval` callback'leri çalıştırılır. 2. Pending Callbacks: Bazı sistem I/O gecikmeleri. 3. Idle, Prepare: İçsel sistem fazları. 4. Poll: Yeni I/O eventleri beklenir ve okunur. 5. Check: `setImmediate` callback'leri çalıştırılır. 6. Close Callbacks: Kapanış eventleri (Örn: `socket.on('close')`). Her faz geçişinde ve event loop her bir callback çalıştırdığında microtask kuyruğu kontrol edilip boşaltılır.",
              en: "The event loop (specifically in libuv/Node.js) runs in structured phases: 1. Timers: executes `setTimeout`/`setInterval` callbacks. 2. Pending Callbacks: executes deferred system I/O callbacks. 3. Idle, Prepare: internal engine tasks. 4. Poll: retrieves new I/O events. 5. Check: executes `setImmediate` callbacks. 6. Close Callbacks: executes socket closing events. Between each phase and after every callback execution, the event loop fully drains the microtask queue."
            },
            analogy: {
              tr: "Java'da iş parçacığı havuzları (ThreadPools) ve asenkron I/O kanalları (NIO) işletim sistemi düzeyindeki event loop (epoll, kqueue) yapılarını doğrudan yönetir. JS ise bu karmaşık kanal yapısını tek bir ana loop üzerinde fazlara bölerek yürütür.",
              en: "Java NIO implements operating system event loop structures (like epoll or kqueue) underneath. JavaScript exposes this event-driven loop structure as a single-threaded runtime lifecycle model."
            },
            keyPoints: [
              { tr: "Event loop belirli fazlar sırasıyla döner (libuv)", en: "The loop iterates through distinct, sequential phases" },
              { tr: "setImmediate check fazında, setTimeout ise timers fazında çalışır", en: "setImmediate runs in the 'check' phase; setTimeout runs in the 'timers' phase" },
              { tr: "Her faz arasında microtask kuyruğu mutlaka eritilir", en: "The microtask queue is fully drained at every phase transition boundary" }
            ],
            tip: {
              tr: "Mülakatta `setTimeout(fn, 0)` ile `setImmediate(fn)` arasındaki farkın, bu fonksiyonların event loop'un timers og check fazlarında farklı sıralarda çalıştırılması olduğunu açıklayın.",
              en: "Differentiate `setTimeout(fn, 0)` from `setImmediate(fn)` by pointing out that they execute in different phases of the event loop."
            }
          },
          {
            level: "advanced",
            q: { tr: "Proxy ve Reflect API nedir? Otomasyon testlerinde ne amaçla kullanılabilir?", en: "What are the Proxy and Reflect APIs? How can they be used in testing?" },
            a: {
              tr: "`Proxy`, bir nesnenin temel işlemlerini (okuma, yazma, arama) araya girerek (intercept) özelleştirmemizi sağlayan bir sarmalayıcı nesnedir. `Reflect` ise JavaScript nesne işlemlerini gerçekleştiren statik metotlar sunar ve Proxy trap'lerinin içinden orijinal davranışı çağırmak için kullanılır. Otomasyonda, sayfa nesnelerinin (Page Objects) çağrılarını izlemek (logging), dinamik locator sarmalayıcıları yazmak veya test datalarında geçersiz atamaları engellemek için mükemmel çözümler sunarlar.",
              en: "The `Proxy` object enables creating a wrapper for another object, intercepting and customizing fundamental operations like property lookups, assignments, and function invocations. `Reflect` is a built-in static object providing methods for interceptable JS operations, making it easy to forward intercepted actions to the target object. In testing, they are used to build dynamic locator proxies, mock APIs, and write diagnostic method loggers."
            },
            analogy: {
              tr: "Java'daki Dynamic Proxy (`java.lang.reflect.Proxy`) ve Reflection API (`java.lang.reflect.*`) yapıları, JavaScript'teki Proxy og Reflect API'lerinin doğrudan karşılığıdır. İkisi de çalışma zamanında nesne davranışlarını dinamik izlemek için kullanılır.",
              en: "Java's Dynamic Proxy (`java.lang.reflect.Proxy`) and Reflection API serve the exact same purpose. Both are used to intercept object behavior and inspect class metadata dynamically at runtime."
            },
            keyPoints: [
              { tr: "Proxy nesne çağrılarını yakalayan bir ara katmandır (trap)", en: "Proxy acts as an interception layer wrapping target objects" },
              { tr: "Reflect orijinal nesne metotlarını güvenle çalıştırmayı sağlar", en: "Reflect provides default object behaviors matching proxy traps" },
              { tr: "Java Reflection/Dynamic Proxy = JS Reflect/Proxy", en: "Java Reflection/Dynamic Proxy = JS Reflect/Proxy" }
            ],
            tip: {
              tr: "Mülakatta: 'Bir Page Object sınıfındaki tüm selector çağrılarını izleyip konsola otomatik log basan veya locator bulunamadığında custom hata fırlatan dinamik bir Proxy sarmalayıcısı yazdım' örneğini verin.",
              en: "Explain how you can use a Proxy wrapper to intercept selector lookups in Page Objects, automatically logging execution steps or injecting retry layers."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript'teki async generator'lar ve Symbol.asyncIterator nedir? Hangi senaryolarda tercih edilir?", en: "What are async generators and Symbol.asyncIterator in JavaScript? When are they used?" },
            a: {
              tr: "Async generator'lar, `async function*` şeklinde tanımlanan ve `yield` kullanarak asenkron veri akışlarını parça parça (stream) üreten özel fonksiyonlardır. `Symbol.asyncIterator` ise bir nesneyi asenkron döngülerle (`for await...of`) gezilebilir hale getiren özel bir semboldür. Genellikle sayfalama (pagination) yapan API'lerden veri çekerken, tüm sayfaları belleğe tek seferde yüklemek yerine sayfa sayfa asenkron çekmek için kullanılır.",
              en: "Async generators (`async function*`) are special functions that return an asynchronous iterator, yielding values stream-style. `Symbol.asyncIterator` is a built-in symbol that defines the async iterator protocol for an object, enabling looping via `for await...of`. They are ideal for fetching paginated API results or reading large log streams step-by-step without overloading memory."
            },
            analogy: {
              tr: "Java'daki asenkron reactive stream (Flow API / Publisher-Subscriber) veya Iterator desenine benzer. JS generator'ları, asenkron veriyi çekerken belleği şişirmeden parça parça tüketme kolaylığı sunar.",
              en: "Analogous to Java's Reactive Streams (Flow API / Publisher-Subscriber model) or asynchronous iterators. Both facilitate backpressure-aware processing of paginated or streamed network data."
            },
            keyPoints: [
              { tr: "async function* asenkron veri akışı (stream) üretir", en: "async function* generates asynchronous streams of values" },
              { tr: "for await...of ile asenkron iterasyon gerçekleştirilir", en: "Allows iterating over async collections using for await...of" },
              { tr: "Büyük veri setlerini belleği doldurmadan parça parça işlemek için idealdir", en: "Optimizes memory usage when consuming paginated API data" }
            ],
            tip: {
              tr: "Test otomasyonunda, 100 sayfalık bir veritabanı veya log çıktısını test etmek için tüm veriyi tek seferde belleğe yüklemek yerine async generator ile sayfa sayfa çekerek verimli bellek yönetimi sağlarsınız.",
              en: "Explain that async generators prevent test runner out-of-memory errors by fetching large databases or logs page-by-page dynamically."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript V8 motorundaki 'Monomorphic, Polymorphic, Megamorphic' inline cache durumları nedir? Neden önemlidir?", en: "What are Monomorphic, Polymorphic, and Megamorphic inline caches in V8? Why do they matter?" },
            a: {
              tr: "V8 motoru Inline Caching (IC) ile nesne özelliklerine erişimi hızlandırır. Bu hızlandırma nesne tiplerine (shapes) göre 3 durum alır: 1. Monomorphic: Bir fonksiyon çağrı noktasında sadece TEK bir nesne şekli görüyorsa, V8 doğrudan adresi belleğe kilitler og maksimum hızda çalışır. 2. Polymorphic: Noktada 2 ile 4 arasında farklı nesne şekli görülüyorsa, V8 bunların offsetlerini listeler (hafif yavaşlama). 3. Megamorphic: Noktada 5 veya daha fazla farklı nesne şekli görülüyorsa, V8 önbelleği tamamen kapatır ve yavaş genel arama (global lookup) moduna geçer.",
              en: "Inline Caching (IC) optimization in V8 changes states based on the shapes observed at property lookup sites: 1. Monomorphic: If V8 sees exactly one object shape at a call site, it caches the offset directly (maximum optimization). 2. Polymorphic: If it observes 2 to 4 different shapes, it maintains a small shape table for lookups (minor overhead). 3. Megamorphic: If V8 encounters 5 or more distinct shapes, it disables inline caching, falling back to slow hash map lookups."
            },
            analogy: {
              tr: "Java JVM JIT derleyicisindeki monomorphic ve polymorphic virtual method table (vtable) dispatch optimizasyonlarıyla birebir aynı teoridir. JVM de metot çağrı noktalarında tek bir tip görüyorsa (monomorphic dispatch) inline çağrı yaparak optimize eder.",
              en: "This maps directly to JVM JIT optimization theories around monomorphic and polymorphic virtual method table (vtable) dispatching. JVM inline cache performance drops when method targets are highly polymorphic."
            },
            keyPoints: [
              { tr: "Monomorphic: Tek nesne şekli, maksimum V8 hız optimizasyonu", en: "Monomorphic: One shape, maximum V8 JIT performance" },
              { tr: "Polymorphic: 2-4 nesne şekli, hafif lookup tablosu yavaşlığı", en: "Polymorphic: 2-4 shapes, slight table lookup overhead" },
              { tr: "Megamorphic: 5+ nesne şekli, önbellekleme iptal edilir (en yavaş mod)", en: "Megamorphic: 5+ shapes, caching disabled, falls back to hash table" }
            ],
            tip: {
              tr: "Performans kritik otomasyon script'lerinde nesnelerinizi her zaman aynı nesne yerleşim sırasıyla tanımlayın; alan ekleme sırasını değiştirmek megamorphic aramaya yol açar.",
              en: "Construct objects using uniform factories or exact property sequence templates to prevent V8 from triggering slow megamorphic fallback maps."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript'te asenkron hata yönetimi (async error handling) yaparken sessizce yutulan hataları (unhandled rejections) nasıl yakalarız?", en: "How do you catch unhandled promise rejections in asynchronous JavaScript?" },
            a: {
              tr: "JavaScript'te `try/catch` blokları veya `.catch()` zinciriyle yakalanmayan asenkron Promise hataları 'Unhandled Promise Rejection' durumuna düşer ve sessizce yutulabilir. Bunları yakalamak için global dinleyiciler kurulur: 1. Tarayıcıda: `window.addEventListener('unhandledrejection', event => { ... })`. 2. Node.js ortamında ise: `process.on('unhandledRejection', (reason, promise) => { ... })` dinleyicisi eklenerek sistemin sessizce hata yutması engellenir ve çökmeler/loglar izlenir.",
              en: "Asynchronous Promise errors that are not handled using `try/catch` or `.catch()` chains become Unhandled Promise Rejections. If left unmanaged, they can swallow bugs. To catch them globally: 1. In browsers: register `window.addEventListener('unhandledrejection', callback)`. 2. In Node.js: listen via `process.on('unhandledRejection', callback)` to intercept unhandled failures, print logs, and trigger clean test suites teardowns."
            },
            analogy: {
              tr: "Java'da bir thread içinde fırlatılan ama yakalanmayan exception'ları yakalamak için `Thread.setDefaultUncaughtExceptionHandler()` dinleyicisi kurulur. JS'teki unhandledRejection dinleyici JVM'in bu genel hata yakalama yapısının asenkron dünyadaki karşılığıdır.",
              en: "In Java, unhandled thread exceptions are caught globally using `Thread.setDefaultUncaughtExceptionHandler()`. JS's unhandled rejection listener is the exact equivalent for asynchronous promise executions."
            },
            keyPoints: [
              { tr: "Yakalanmayan asenkron hatalar unhandled rejection yaratır", en: "Unhandled promise rejections are spawned by uncaught async promises" },
              { tr: "process.on('unhandledRejection') Node.js için küresel yakalayıcıdır", en: "process.on('unhandledRejection') provides global catch logs in Node" },
              { tr: "unhandledrejection event'i tarayıcılarda global dinleyici kurar", en: "unhandledrejection event enables global error tracking in browsers" }
            ],
            tip: {
              tr: "Test otomasyon suite'lerinde, testlerin sessizce geçmesini veya yarıda kalmasını önlemek için global asenkron hata dinleyicilerini kurup hataları test raporuna (reporter) doğrudan bağlarız.",
              en: "Configure unhandled rejection hooks in test setups to ensure unexpected background API failures correctly fail the active CI pipeline run."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript ES6 Class yapısı arka planda prototype'a nasıl derlenir?", en: "How does the ES6 Class syntax compile down to prototype objects under the hood?" },
            a: {
              tr: "ES6 `class` yapısı aslında yeni bir nesne modeli getirmez; prototip tabanlı kalıtımı (prototypal inheritance) daha okunaklı yazmamızı sağlayan sentaktik bir şekerdir. Bir `class Person` tanımlandığında, JavaScript motoru bunu geleneksel bir `function Person()` constructor yapısına çevirir. Sınıfın içindeki metotlar (`sayHello()`) ise nesnenin doğrudan kendi içine değil, `Person.prototype.sayHello` nesnesine eklenir. Sınıftaki `static` metotlar ise doğrudan constructor fonksiyonunun (`Person.staticMethod`) üzerine bağlanır.",
              en: "The ES6 `class` syntax is not a new object-oriented inheritance model; it is syntactic sugar over prototypal inheritance. When you declare `class Person`, the engine converts it into a standard `function Person()` constructor. Methods defined inside the class (like `sayHello()`) are mapped to `Person.prototype.sayHello` rather than copied onto instances. `static` methods are attached directly to the constructor function object (`Person.staticMethod`)."
            },
            analogy: {
              tr: "Java'da class yapısı JVM düzeyinde gerçek, katı bir tiptir ve her nesne sınıfın şablonundan türetilir. JS'te ise nesneler havadan türeyebilir; class syntax'ı Java geliştiricileri yabancılık çekmesin diye yazılmış prototip makyajıdır.",
              en: "In Java, classes are compile-time boundaries and JVM types. In JavaScript, classes are just visual decorators over runtime prototypal linkings, designed to look familiar to Java and OOP developers."
            },
            keyPoints: [
              { tr: "Sınıf metotları prototype nesnesine otomatik eklenir", en: "Class methods are automatically attached to the prototype object reference" },
              { tr: "Sınıf alanları (fields) constructor içinde nesneye atanır", en: "Properties are assigned directly to the object instance inside constructor calls" },
              { tr: "Static metotlar doğrudan constructor nesnesine bağlanır", en: "Static methods reside directly on the constructor function itself" }
            ],
            tip: {
              tr: "Babel gibi derleyiciler yardımıyla ES6 kodunun ES5'e nasıl derlendiğini incelemek class yapısının prototiplere nasıl dönüştüğünü görsel olarak anlamanın en iyi yoludur.",
              en: "Use Babel or TypeScript playgrounds to inspect ES5 compilation outputs, verifying that classes compile down to constructor functions."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript modül yükleme mekanizması (Module Loading) statik ve dinamik olarak nasıl çalışır?", en: "How does JavaScript module loading work statically and dynamically?" },
            a: {
              tr: "Statik import (`import x from 'y'`) kodun en tepesinde yer almak zorundadır ve derleme/parse aşamasında (kod hiç çalışmadan önce) çözülür; bu sayede kullanılmayan kodlar elenir (tree-shaking). Dinamik import (`import('y')`) ise asenkron bir Promise döndürür, kodun herhangi bir yerinde (Örn: if/else bloğu içi, event listener içi) çalışma zamanında (runtime) modül yüklemeyi sağlar. Dinamik import, başlangıç yükleme süresini düşürmek ve modülleri ihtiyaç anında (lazy loading) yüklemek için kullanılır.",
              en: "Static imports (`import x from 'y'`) must be placed at the top-level of a module, resolved during compilation/parsing. This permits static analysis and tree-shaking optimizer runs. Dynamic imports (`import('y')`) return a Promise and resolve asynchronously at runtime, allowing modules to be loaded conditionally inside functions or events. Dynamic imports are key for lazy-loading to optimize initial load times."
            },
            analogy: {
              tr: "Java'da statik `import` derleme zamanı kontrolüdür. Dinamik import ise Java'daki `Class.forName(\"paket.Sınıf\")` dinamik sınıf yükleyicisine benzer; sınıfın çalışma zamanında asenkron veya dinamik olarak projeye dahil edilmesini sağlar.",
              en: "In Java, standard imports are resolved at compile time. Dynamic imports match the behavior of Java's runtime class loader: `Class.forName(\"pack.Class\")`, fetching and linking classes on the fly at runtime."
            },
            keyPoints: [
              { tr: "Statik import derleme aşamasında çözülür ve tree-shaking sağlar", en: "Static imports are resolved during compile pass, allowing tree-shaking" },
              { tr: "Dinamik import() asenkron Promise döner ve runtime'da çalışır", en: "Dynamic import() returns a Promise and executes asynchronously at runtime" },
              { tr: "Dinamik import performansı artırmak için lazy loading sağlar", en: "Dynamic imports support lazy-loading to reduce resource payloads" }
            ],
            tip: {
              tr: "Otomasyon projelerinde, sadece belirli test koşulları oluştuğunda ağır test verisi modüllerini veya platforma özel kütüphaneleri yüklemek için dinamik `import()` tercih edebilirsiniz.",
              en: "Use dynamic `import()` in testing hooks to load massive test data JSON files or OS-specific drivers conditionally on demand."
            }
          },
          {
            level: "advanced",
            q: { tr: "Playwright'ta `page.evaluate()` ve `page.exposeFunction()` ne zaman ve neden kullanılır?", en: "When and why do you use `page.evaluate()` and `page.exposeFunction()` in Playwright?" },
            a: {
              tr: "`page.evaluate()` Node.js test kodundan doğrudan tarayıcı ortamında JavaScript çalıştırmanızı sağlar. DOM manipülasyonu, özel JavaScript metriklerini okuma veya tarayıcı API'lerine erişim gerektiren durumlarda kullanılır. `page.exposeFunction()` ise tersine çalışır: Node.js tarafındaki bir fonksiyonu tarayıcıya açar; böylece tarayıcı içindeki JS kodu `window.myFunction()` ile Node.js tarafındaki callback'i tetikleyebilir. İki metot birlikte, tarayıcı ile test runner arasındaki köprüyü kurar.",
              en: "`page.evaluate()` executes a JavaScript function directly inside the browser context from Node.js test code. It is used for direct DOM manipulation, reading custom JS metrics, or accessing browser APIs not exposed in Playwright's API. `page.exposeFunction()` works in reverse: it exposes a Node.js function to the browser page, allowing in-browser JS to trigger callbacks via `window.myFunction()`. Together they bridge the browser and test runner."
            },
            analogy: {
              tr: "Java Selenium'da `((JavascriptExecutor) driver).executeScript(\"...\")` `page.evaluate()`'ın karşılığıdır. `exposeFunction` ise Selenium'da doğrudan karşılığı olmayan, sadece Playwright'a özgü güçlü bir köprü mekanizmasıdır.",
              en: "Java Selenium's `((JavascriptExecutor) driver).executeScript(\"...\")` is the equivalent of `page.evaluate()`. `exposeFunction` has no direct Selenium counterpart — it is a uniquely powerful Playwright bridge mechanism."
            },
            keyPoints: [
              { tr: "page.evaluate(): Node.js'ten tarayıcıya JS gönderir, sonucu serialize ederek döner", en: "page.evaluate(): Sends and runs JS inside browser from Node.js, returns serialized result" },
              { tr: "page.exposeFunction(): Tarayıcı içinden Node.js callback'i tetikler", en: "page.exposeFunction(): Lets in-browser JS trigger a Node.js callback" },
              { tr: "İkisi birden tarayıcı ↔ test runner köprüsü kurar", en: "Together they bridge the browser context with the test runner" }
            ],
            tip: {
              tr: "Mülakatta 'tarayıcı içinde localStorage'ı temizlemek için' veya 'custom event'ları test runner'a bildirmek için' pratik örnek vererek bu iki metodu birbirinden net ayırın.",
              en: "In interviews, give concrete examples: 'I use page.evaluate() to clear localStorage between tests' and 'page.exposeFunction() to capture custom browser events in my test assertions.'"
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript Proxy nesnesi QA otomasyonunda nasıl kullanılabilir?", en: "How can the JavaScript Proxy object be used in QA automation?" },
            a: {
              tr: "JavaScript `Proxy` nesnesi, başka bir nesneye yapılan erişimleri (okuma, yazma, fonksiyon çağrısı) yakalamaya ve özelleştirmeye yarar. QA otomasyonunda üç pratik kullanım alanı öne çıkar: 1. **API mock'lama:** fetch/axios nesnelerini Proxy ile sararak gerçek API yerine sahte yanıtlar döndürebilirsiniz — ayrı mock sunucuya gerek kalmaz. 2. **Deep equality assertion:** Nesne property erişimlerini kayıt altına alan bir Proxy ile hangi alanlara assertion yazıldığını izleyebilirsiniz. 3. **Test data validation:** Test verinizi bir Proxy ile sararak izin verilmeyen alan erişimlerini otomatik olarak TypeError ile engelleyebilirsiniz.",
              en: "The JavaScript `Proxy` object intercepts and customizes operations (reads, writes, function calls) on a target object. In QA automation, three practical use cases stand out: 1. **API mocking:** Wrapping fetch/axios with a Proxy to return fake responses without a separate mock server. 2. **Assertion tracking:** A Proxy that logs every property access tells you which fields are actually covered by your assertions. 3. **Test data validation:** Wrapping test data in a Proxy to automatically throw TypeErrors on invalid or unintended property access."
            },
            analogy: {
              tr: "Java'da benzer kontrol mekanizmaları için AOP (Aspect-Oriented Programming) veya Reflection API kullanılır. JavaScript Proxy'si ise bunlara kıyasla çok daha hafif ve runtime'da dinamik olarak kurulabilir — derleme adımı gerektirmez.",
              en: "In Java, similar interception patterns require AOP (Aspect-Oriented Programming) frameworks or the Reflection API. JavaScript's Proxy achieves the same at runtime with zero setup overhead — no compilation step required."
            },
            keyPoints: [
              { tr: "Proxy: hedef nesneye yapılan tüm erişimleri get/set/apply trap'leriyle yakalar", en: "Proxy: intercepts all operations on a target via get/set/apply traps" },
              { tr: "API mock için fetch nesnesini Proxy ile sarabilirsiniz", en: "Can wrap the fetch object in a Proxy for zero-setup API mocking" },
              { tr: "Test verisi doğrulaması için property erişim denetimi sağlar", en: "Enables property access validation on test data objects" }
            ],
            tip: {
              tr: "Mülakatta 'Jest'in `jest.mock()` veya MSW gibi araçların arka planda benzer bir interception mekanizması kullandığını ve Proxy'nin bu kavramın ham JavaScript implementasyonu olduğunu' söyleyerek kavramı derinleştirin.",
              en: "Deepen your interview answer by noting that tools like `jest.mock()` and MSW use similar interception mechanisms internally, and Proxy is the raw JavaScript building block behind these abstractions."
            }
          }
        ]
      }
    ]
  }
];

export const javascriptData = {
  en: {
    hero: {
      title: "🟨 JavaScript",
      subtitle: "JavaScript for Modern Test Automation",
      intro: "Learn core JavaScript concepts tailored specifically for QA automation (Playwright, Cypress, Selenium) with Pixar-style visual play, interactive blocks, and 50 detailed interview questions with Java analogies."
    },
    tabs: [
      "🎯 Intro & Why",
      "📦 Installation",
      "📦 Variables & Operators",
      "📊 Data Types & Functions",
      "🔤 Strings & Numbers",
      "🍇 Array Methods",
      "🔁 Conditions & Loops",
      "🎡 Event Loop",
      "🧬 Promises & Closures",
      "🏛️ Classes, Modules & JSON",
      "🧪 QA Use Cases & DOM",
      "🌱 Ecosystem & Tools",
      "🐛 Errors & Debugging",
      "📡 DOM Events",
      "📅 Dates & Time",
      "🔍 RegExp",
      "🗂️ Set & Map",
      "🎮 Mini Games",
      "💼 Interview Q&A"
    ],
    sections: sections
  },
  tr: {
    hero: {
      title: "🟨 JavaScript",
      subtitle: "Modern Test Otomasyonu İçin JavaScript",
      intro: "QA otomasyonuna özel (Selenium, Playwright, Cypress) temel JavaScript kavramlarını Pixar tarzı görseller, interaktif lego blokları ve Java analojili 50 mülakat sorusuyla öğren."
    },
    tabs: [
      "🎯 Giriş & Neden",
      "📦 Kurulum",
      "📦 Değişkenler & Operatörler",
      "📊 Veri Tipleri & Fonksiyonlar",
      "🔤 String & Sayı & Matematik",
      "🍇 Array Metotları",
      "🔁 Karar Yapıları & Döngüler",
      "🎡 Event Loop",
      "🧬 Promises & Closures",
      "🏛️ Sınıflar, Modüller & JSON",
      "🧪 QA Kullanım & DOM",
      "🌱 Ekosistem & Araçlar",
      "🐛 Hatalar & Debugging",
      "📡 DOM Olayları",
      "📅 Tarih & Zaman",
      "🔍 RegExp",
      "🗂️ Set & Map",
      "🎮 Mini Oyunlar",
      "💼 Mülakat Soruları"
    ],
    sections: sections
  }
};
