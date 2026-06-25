const sections = [
  // ── 0. INTRO & WHY ──────────────────────────────────────────────────────────
  {
    title: '🎯 What is Python & Why Do QA Engineers Need It?',
    blocks: [
      { type: 'text', content: 'Python is a high-level, interpreted programming language known for its clean, readable syntax — it reads almost like plain English. Created in 1991, it has become the world\'s most popular language for automation, data science, and web development.' },
      { type: 'text', content: 'For QA engineers, Python is the Swiss Army knife: you can write UI tests with Selenium/Playwright, API tests with requests, performance tests, data validation scripts, and CI/CD pipelines — all with the same language.' },
      { type: 'heading', text: 'Why Python for Test Automation?' },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '📖', label: 'Readable Syntax', desc: 'Tests read like documentation — even non-developers can understand what\'s being tested.' },
          { icon: '🧰', label: 'Huge Ecosystem', desc: 'pytest, Selenium, Playwright, requests, Faker, pandas — thousands of testing libraries.' },
          { icon: '⚡', label: 'Rapid Scripting', desc: 'Write a data-generation script or API test in minutes, not hours.' },
          { icon: '🔗', label: 'API Testing', desc: 'requests library makes HTTP calls trivial. Great for REST API validation.' },
          { icon: '📊', label: 'Data Manipulation', desc: 'pandas, csv, json — read test data from any format.' },
          { icon: '🔄', label: 'CI/CD Native', desc: 'Python scripts integrate with Jenkins, GitHub Actions, Docker without friction.' },
        ]
      },
      { type: 'heading', text: 'Python vs Other Languages for Testing' },
      {
        type: 'table',
        headers: ['Language', 'Pros', 'Cons', 'Best For'],
        rows: [
          ['Python', 'Readable, fast to write, huge ecosystem', 'Slower execution than compiled', 'Automation scripts, API tests, pytest'],
          ['Java', 'Enterprise scale, strong typing', 'Verbose, slower to write', 'Selenium WebDriver, legacy enterprise'],
          ['JavaScript', 'Same language as web apps, async native', 'Callback complexity', 'Playwright, Cypress, frontend testing'],
          ['C#', 'Microsoft stack, strong typing', 'Windows-centric, less OSS', '.NET apps, SpecFlow, NUnit'],
        ]
      },
      { type: 'heading', text: 'Popular Python Testing Libraries' },
      {
        type: 'table',
        headers: ['Library', 'Purpose', 'Install Command'],
        rows: [
          ['pytest', 'Test runner, fixtures, assertions', 'pip install pytest'],
          ['selenium', 'Browser UI automation', 'pip install selenium'],
          ['playwright', 'Modern browser automation', 'pip install playwright'],
          ['requests', 'HTTP/API testing', 'pip install requests'],
          ['pandas', 'Read CSV/Excel test data', 'pip install pandas'],
          ['faker', 'Generate realistic test data', 'pip install faker'],
          ['allure-pytest', 'Beautiful test reports', 'pip install allure-pytest'],
        ]
      },
      {
        type: 'quiz',
        question: { tr: 'Tabloya göre Python\'ın test otomasyonundaki en büyük artısı/eksisi nedir?', en: "According to the comparison table, what is Python's biggest pro/con for test automation?" },
        options: [
          { id: 'a', text: { tr: 'Artı: derlenmiş dillerden daha hızlı çalışır', en: 'Pro: it runs faster than compiled languages' } },
          { id: 'b', text: { tr: 'Artı: okunabilir syntax + geniş ekosistem; Eksi: derlenmiş dillerden çalışma zamanında daha yavaş', en: 'Pro: readable syntax + huge ecosystem; Con: slower at runtime than compiled languages' } },
          { id: 'c', text: { tr: 'Artı: API testi yapılamaz', en: "Pro: cannot be used for API testing" } },
          { id: 'd', text: { tr: 'Eksi: CI/CD ile uyumlu değildir', en: 'Con: it is not CI/CD compatible' } },
        ],
        correct: 'b',
        explanation: { tr: 'Python\'ın test otomasyonundaki temel değeri okunabilirlik (testler dokümantasyon gibi okunur) ve pytest/Selenium/Playwright/requests/Faker/pandas gibi binlerce kütüphaneden oluşan ekosistemdir. Karşılığında, derlenmiş bir dile (Java gibi) göre çalışma zamanında daha yavaştır — ama otomasyon scriptleri için bu fark genelde önemsizdir.', en: "Python's core value in test automation is readability (tests read like documentation) and its ecosystem of thousands of libraries like pytest/Selenium/Playwright/requests/Faker/pandas. In exchange, it runs slower at runtime than a compiled language like Java — but for automation scripts, that difference rarely matters in practice." },
        retryQuestion: {
          question: { tr: 'Bir ekip, milisaniyeler içinde milyonlarca istek işleyen bir yüksek frekanslı trading sisteminin çekirdek motorunu yazacak. Python burada neden tipik olarak tercih edilmez?', en: 'A team is writing the core engine of a high-frequency trading system processing millions of requests in milliseconds. Why is Python typically not chosen here?' },
          options: [
            { id: 'a', text: { tr: 'Python hiçbir matematiksel işlem yapamaz', en: 'Python cannot do any mathematical operations' } },
            { id: 'b', text: { tr: 'Yorumlanan/dinamik tipli yapısı, bu kadar düşük gecikme gerektiren işler için derlenmiş bir dilden (Java/C++) daha yavaş çalışır', en: "Its interpreted/dynamically-typed nature runs slower than a compiled language (Java/C++) for workloads needing this kind of extreme low latency" } },
            { id: 'c', text: { tr: 'Python kütüphaneleri yoktur', en: 'Python has no libraries' } },
            { id: 'd', text: { tr: 'Python test otomasyonu için tasarlanmamıştır', en: 'Python was not designed for test automation' } },
          ],
          correct: 'b',
          explanation: { tr: 'Otomasyon scriptlerinde Python\'ın çalışma zamanı yavaşlığı genelde önemsizdir (bir test 50ms yerine 60ms sürse kimse fark etmez), ama mikrosaniyelerin önemli olduğu bir sistemin ÇEKİRDEK motorunda bu fark kritik hale gelir — bu yüzden böyle bir sistem genelde Java/C++ gibi derlenmiş bir dilde yazılır. Doğru dil seçimi her zaman kullanım senaryosuna bağlıdır, "Python her zaman yavaştır" gibi mutlak bir kural değildir.', en: "Python's runtime slowness rarely matters for automation scripts (nobody notices if a test takes 60ms instead of 50ms), but in the CORE engine of a system where microseconds matter, that difference becomes critical — which is why such a system is typically written in a compiled language like Java/C++. The right language choice always depends on the use case, not an absolute \"Python is always slow\" rule." },
        },
      },
      {
        type: 'python-memory-visual',
        titleEn: 'Memory Model — QA Engineer Variables Live in RAM',
        titleTr: 'Bellek Modeli — QA Değişkenleri RAM\'e Böyle Yazılır',
        variables: [
          { name: 'test_name', value: 'Login Test', type: 'str', desc: 'Test case label', descTr: 'Test adı' },
          { name: 'pass_count', value: 42, type: 'int', desc: 'Tests passed', descTr: 'Geçen test sayısı' },
          { name: 'pass_rate', value: 0.87, type: 'float', desc: '87% pass rate', descTr: '%87 başarı oranı' },
          { name: 'is_flaky', value: 'False', type: 'bool', desc: 'Unstable test?', descTr: 'Kararsız test mi?' },
          { name: 'error_msg', value: 'None', type: 'None', desc: 'No error yet', descTr: 'Henüz hata yok' },
        ],
      },
      {
        type: 'feynman-checkpoint',
        promptTr: 'Python\'ı test otomasyonunda neden kullanırız? Java da yapabilir, neden Python? Jargon kullanmadan, sektöre yeni giren birine 3 somut nedeni anlat.',
        promptEn: 'Why use Python for test automation? Java can do it too — why Python? Explain 3 concrete reasons to someone new to the field, no jargon.',
        keywords: [['okunabilir', 'readable', 'syntax'], ['ekosistem', 'ecosystem', 'pytest', 'library'], ['hızlı', 'fast', 'rapid', 'script'], ['requests', 'api', 'http'], ['ci', 'jenkins', 'pipeline']],
        minScore: 3,
        modelAnswerTr: 'Python test otomasyonunda 3 nedenden tercih edilir: (1) Okunabilirlik — testler neredeyse İngilizce cümle gibi okunur, ekip içi herkes anlar. (2) Ekosistem zenginliği — pytest, Selenium, Playwright, requests, Faker, pandas gibi binlerce hazır kütüphane var, sıfırdan yazmak gerekmez. (3) Hız ve esneklik — 5 satırda API testi, 10 satırda veri üreteci yazılır; Java\'da aynı iş çok daha fazla kod ister.',
        modelAnswerEn: 'Python is chosen for test automation for 3 reasons: (1) Readability — tests read like English sentences, the whole team can understand them. (2) Ecosystem richness — thousands of ready-made libraries like pytest, Selenium, Playwright, requests, Faker, pandas. (3) Speed & flexibility — a 5-line API test, a 10-line data generator; the same work takes far more code in Java.',
      },
    ],
  },

  // ── 1. INSTALLATION ─────────────────────────────────────────────────────────
  {
    title: '📦 Installing Python & Setting Up Your Environment',
    blocks: [
      { type: 'heading', text: 'Step 1: Download and Install Python 3' },
      {
        type: 'steps',
        items: [
          'Go to python.org/downloads and download the latest Python 3.x (NOT Python 2)',
          'Windows: Run the installer — CRITICAL: check "Add Python to PATH" before clicking Install!',
          'Mac: Use the .pkg installer from python.org, or: brew install python3',
          'Linux (Ubuntu/Debian): sudo apt update && sudo apt install python3 python3-pip',
        ]
      },
      { type: 'warning', content: 'Windows users: If you forget to check "Add Python to PATH", the `python` command won\'t work in the terminal. Re-run the installer and choose "Modify", then check PATH.' },
      { type: 'heading', text: 'Step 2: Verify Installation' },
      {
        type: 'code',
        code: `# In your terminal/command prompt:
python --version       # Windows (usually)
python3 --version      # Mac/Linux

# Why both? On Mac/Linux, "python" may point to Python 2 (legacy).
# "python3" always points to Python 3. Use whichever works on your system.

pip --version          # package manager
pip3 --version         # Mac/Linux alternative`,
        expected: `Python 3.12.0\npip 23.3.1 from /usr/local/lib/python3.12/site-packages/pip (python 3.12)`
      },
      { type: 'heading', text: 'Step 3: Virtual Environments (Critical!)' },
      { type: 'text', content: 'A virtual environment is an isolated Python installation for your project. It prevents dependency conflicts between projects. Project A needs requests==2.28 but Project B needs requests==2.31? Virtual environments solve this.' },
      {
        type: 'code',
        code: `# Create a virtual environment (run inside your project folder):
python -m venv venv          # creates a "venv" folder

# Activate it:
# Windows:
venv\\Scripts\\activate

# Mac/Linux:
source venv/bin/activate

# Your prompt changes to show (venv) when active.
# Now install packages — they go INTO venv, not system Python:
pip install pytest requests playwright

# Deactivate when done:
deactivate`,
        expected: `(venv) C:\\projects\\mytest>`
      },
      { type: 'tip', content: 'Always create a venv for every new project. Add the `venv/` folder to .gitignore — never commit it.' },
      { type: 'heading', text: 'Step 4: requirements.txt Pattern' },
      {
        type: 'code',
        code: `# Save current dependencies to a file:
pip freeze > requirements.txt

# Contents of requirements.txt:
# pytest==7.4.3
# requests==2.31.0
# playwright==1.40.0

# Install from requirements.txt on another machine or CI:
pip install -r requirements.txt`,
      },
      { type: 'heading', text: 'Step 5: First Program' },
      {
        type: 'code',
        label: 'hello_world.py',
        code: `# Your first Python program
name = "QA Engineer"              # variable assignment
print(f"Hello, {name}!")          # f-string: embed variable in string
print("Python version check:", end=" ")
import sys                         # import a built-in module
print(sys.version)                 # print Python version`,
        expected: `Hello, QA Engineer!\nPython version check: 3.12.0 (main, ...) [GCC ...]`
      },
      {
        type: 'simulation',
        scenario: 'python-compile-run',
        icon: '🐍',
        title: { tr: 'Python Yorumlayıcı ve Derleme Adımları', en: 'Python Interpreter and Compilation Steps' },
        description: {
          tr: 'Python kodunun çalışma zamanında (runtime) arka planda nasıl derlendiğini, bytecode\'a çevrildiğini ve PVM (Python Virtual Machine) tarafından nasıl yorumlandığını gör.',
          en: 'Watch how Python code is implicitly compiled to bytecode and interpreted line-by-line by the PVM (Python Virtual Machine) at runtime.'
        },
        code: `name = "QA Engineer"
print(f"Hello, {name}!")`,
        language: 'python'
      },
      {
        type: 'quiz',
        question: { tr: 'Bir Python projesinde virtual environment (venv) kullanmamanın temel riski nedir?', en: 'What is the main risk of not using a virtual environment (venv) in a Python project?' },
        options: [
          { id: 'a', text: { tr: 'Python yorumlayıcısı daha yavaş çalışır', en: 'The Python interpreter runs slower' } },
          { id: 'b', text: { tr: 'Farklı projelerin bağımlılık sürümleri çakışır — sistem genelinde paket kirliliği oluşur', en: "Different projects' dependency versions conflict — you get system-wide package pollution" } },
          { id: 'c', text: { tr: 'pip komutu hiç çalışmaz', en: 'The pip command stops working entirely' } },
          { id: 'd', text: { tr: 'Kod artık import edilemez', en: 'Code can no longer be imported' } },
        ],
        correct: 'b',
        explanation: { tr: 'Virtual environment olmadan, tüm projeler aynı global Python kurulumunun paketlerini paylaşır. Bir proje requests==2.28 isterken başka biri requests==2.31 isterse, sadece biri her seferinde "kazanır" — diğer projenin testleri sebepsiz yere bozulur. venv, her projeye kendi izole bağımlılık kümesini verir; Java\'da her projenin kendi pom.xml/Maven local repository\'sine sahip olmasıyla aynı mantık.', en: "Without a virtual environment, every project shares the same global Python installation's packages. If one project needs requests==2.28 and another needs requests==2.31, only one can \"win\" at a time — the other project's tests break for no obvious reason. A venv gives each project its own isolated dependency set, the same logic as each Java project having its own pom.xml/Maven local repository." },
        retryQuestion: {
          question: { tr: 'Bir venv aktifken `pip install requests` çalıştırıyorsun. Bu paket nereye kurulur?', en: 'You run `pip install requests` while a venv is activated. Where does this package get installed?' },
          options: [
            { id: 'a', text: { tr: 'Global Python kurulumuna, tüm projeleri etkiler', en: 'Into the global Python installation, affecting all projects' } },
            { id: 'b', text: { tr: 'Sadece aktif venv\'in izole klasörüne — diğer projeleri hiç etkilemez', en: "Only into the active venv's isolated folder — it does not affect other projects at all" } },
            { id: 'c', text: { tr: 'Sistem genelinde PATH\'e', en: 'System-wide into PATH' } },
            { id: 'd', text: { tr: 'requirements.txt dosyasının içine doğrudan', en: 'Directly inside the requirements.txt file' } },
          ],
          correct: 'b',
          explanation: { tr: 'Bir venv aktifken çalıştırılan `pip install`, paketi SADECE o venv\'in kendi izole klasörüne kurar (`.venv/lib/...`), global Python kurulumuna veya başka bir projenin venv\'ine asla dokunmaz. Bu izolasyon, venv\'in tüm amacıdır — her proje, başka hiçbir projeyi etkilemeden kendi bağımlılık sürümlerine sahip olabilir.', en: "Running `pip install` while a venv is active installs the package ONLY into that venv's own isolated folder (`.venv/lib/...`) — it never touches the global Python installation or any other project's venv. This isolation is the entire point of a venv: each project can have its own dependency versions without affecting any other project." },
        },
      },
      {
        type: 'python-flow-diagram',
        titleEn: 'Virtual Environment Lifecycle — Step by Step',
        titleTr: 'Sanal Ortam Yaşam Döngüsü — Adım Adım',
        steps: [
          { type: 'action', code: 'python -m venv .venv', desc: 'Creates isolated .venv/ folder', descTr: 'İzole .venv/ klasörü oluşturur' },
          { type: 'action', code: 'source .venv/bin/activate  # (Windows: .venv\\Scripts\\activate)', desc: 'Shell switches to this venv', descTr: 'Shell bu venv\'e geçer' },
          { type: 'condition', code: 'which python → .venv/bin/python?', desc: 'Verify venv is active', descTr: 'Venv\'in aktif olduğunu doğrula', branch: { true: 'venv active ✓', false: 'activate again' } },
          { type: 'action', code: 'pip install pytest selenium requests', desc: 'Installs ONLY inside .venv/ — global Python untouched', descTr: 'Sadece .venv/ içine kurar — global Python dokunulmaz' },
          { type: 'action', code: 'pip freeze > requirements.txt', desc: 'Lock exact versions for teammates', descTr: 'Takım için sürümleri kilitle' },
          { type: 'end', code: 'deactivate', desc: 'Return to global Python', descTr: 'Global Python\'a dön' },
        ],
      },
    ],
  },


  // ── 2. FOUNDATIONS ──────────────────────────────────────────────────────────
  {
    title: '🟢 Python Foundations',
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 1 — Python Syntax
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: { tr: 'Python Söz Dizimi', en: 'Python Syntax' }, difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '📐', content: { tr: 'Python kodu yazmak, cümle yazmak gibi. Süslü parantez yok, noktalı virgül yok. Sadece düzgün hizalama (girinti) gerekiyor — sanki bir liste hazırlıyorsun.', en: 'Writing Python is like writing sentences. No curly braces, no semicolons. Just proper indentation — like writing a neat outline.' } },
      { type: 'text', content: { tr: "Java\'da bloklar {} ile açılır-kapanır ve her satır \";\" ile biter. Python\'da bunların hiçbiri yok. Bloklar \":\" (iki nokta) ile başlar, girintileme ile devam eder.", en: 'In Java, blocks open/close with {} and every statement ends with ";". Python has neither. Blocks start with ":" and continue by indentation.' } },
      { type: 'code', language: 'python', code: `# Python Syntax Basics
# NO semicolons, NO curly braces
name = "Alice"              # Variable — no type declaration
age = 30                    # Integer

if age >= 18:               # Colon starts block
    print("Adult")          # 4-space indent = inside block
    print("Name:", name)    # Still inside block

for i in range(3):          # Loop
    print("Count:", i)      # Loop body (indented)

print("Done")               # Back to top level (no indent)` },
      { type: 'editor', lang: 'python', defaultCode: `# Edit and run this code!
name = "QA Engineer"
experience = 3

if experience >= 2:
    print("Senior:", name)
    print("Years:", experience)
else:
    print("Junior:", name)

for skill in ["Python", "pytest", "Selenium"]:
    print("Skill:", skill)` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Syntax' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Blok açma', en: 'Open block' }, java: 'if (x > 0) {', python: 'if x > 0:' },
        { concept: { tr: 'Blok kapama', en: 'Close block' }, java: '}', python: '(dedent — no symbol needed)' },
        { concept: { tr: 'Satır sonu', en: 'Statement end' }, java: 'int x = 5;', python: 'x = 5' },
        { concept: { tr: 'Koşul parantezi', en: 'Condition parens' }, java: 'if (x > 0)', python: 'if x > 0:' },
      ]},
      { type: 'quiz', question: { tr: "Python\'da bir kod bloğunun sonu nasıl anlaşılır?", en: 'How does Python mark the end of a code block?' }, options: [{ id: 'a', text: '}' ,
        retryQuestion: {
      "question": {
            "tr": "Python\\'da girintileme (indentation) yapısı hakkında aşağıdakilerden hangisi doğrudur?",
            "en": "Which of the following is true about indentation in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Kod bloklarını sınırlamak için süslü parantez {} kullanılır.",
                        "en": "Curly braces {} are used to delimit code blocks."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Girintileme zorunludur ve kod bloklarını tanımlar.",
                        "en": "Indentation is mandatory and defines code blocks."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Kod blokları için 'begin' ve 'end' anahtar kelimeleri kullanılır.",
                        "en": "'begin' and 'end' keywords are used for code blocks."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece okunabilirlik için kullanılır, işlevsel değildir.",
                        "en": "It is only used for readability and is not functional."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python'da bir kod bloğunun başlangıcı ve sonu, süslü parantezler yerine girintileme (whitespace/indentation) ile belirlenir.",
            "en": "In Python, the start and end of a code block are determined by indentation instead of curly braces."
      }
}
}, { id: 'b', text: 'end' }, { id: 'c', text: 'Dedenting (going back to outer indentation level)' }, { id: 'd', text: ';' }], correct: 'c', explanation: { tr: "Python, girintinin azalmasıyla bloğun bittiğini anlar. Süslü parantez ya da \"end\" keyword\'ü yoktur.", en: 'Python detects block end by dedenting — moving back to the outer indentation level. No closing symbol needed.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 2 — Comments
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: { tr: 'Yorum Satırları', en: 'Comments' }, difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '💬', content: { tr: 'Yorum, kodun içine "not" bırakmak gibi. Python bu satırları çalıştırmaz — sadece sen ve ekibindekiler okur.', en: "A comment is like a sticky note inside your code. Python ignores it completely — it\'s just for humans to read." } },
      { type: 'text', content: { tr: "Java\'da // tek satır, /* */ çok satır yorum. Python\'da # tek satır, \"\"\" \"\"\" (docstring) çok satır yorum için kullanılır. Teknik terim değişmez ama sözdizimi farklı.", en: 'Java uses // for single-line and /* */ for multi-line comments. Python uses # for single-line and triple quotes """ for multi-line (docstrings).' } },
      { type: 'code', language: 'python', code: `# Single-line comment — Python ignores this
name = "Alice"  # Inline comment — also ignored

"""
Multi-line comment (docstring).
Often used to document functions and classes.
Python ignores this at runtime.
"""

def greet(name):
    """This is a function docstring — documents what greet() does."""
    return f"Hello, {name}!"` },
      { type: 'editor', lang: 'python', defaultCode: `# Try adding your own comments!
# This calculates a test pass rate

total_tests = 100       # How many tests were run
passed_tests = 87       # How many passed

pass_rate = (passed_tests / total_tests) * 100
print("Pass rate:", pass_rate, "%")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Comments' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Tek satır yorum', en: 'Single-line comment' }, java: '// comment', python: '# comment' },
        { concept: { tr: 'Çok satır yorum', en: 'Multi-line comment' }, java: '/* comment */', python: '"""comment"""' },
        { concept: { tr: 'Dokümantasyon yorumu', en: 'Doc comment' }, java: '/** Javadoc */', python: '"""docstring"""' },
      ]},
      { type: 'quiz', question: { tr: "Python\'da çok satırlı yorum için hangi sözdizimi kullanılır?", en: 'Which syntax creates a multi-line comment in Python?' }, options: [{ id: 'a', text: '/* ... */' }, { id: 'b', text: '// ...' }, { id: 'c', text: '"""..."""' }, { id: 'd', text: '#! ...' }], correct: 'c', explanation: { tr: "Python\'da üçlü tırnak (\"\"\" veya \'\'\'…\'\'\'\') docstring / çok satır yorum için kullanılır.", en: "Triple quotes \"\"\" or \'\'\'\' create multi-line strings / docstrings. Python ignores them if not assigned." } ,
        retryQuestion: {
      "question": {
            "tr": "Python\\'da kod içerisinde geçici olarak devre dışı bırakılan veya açıklama satırı olarak kullanılan yapı aşağıdakilerden hangisidir?",
            "en": "Which structure is used in Python to temporarily disable code or write comments?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "<!-- ... -->",
                        "en": "<!-- ... -->"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "/* ... */",
                        "en": "/* ... */"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "''' ... '''",
                        "en": "''' ... '''"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "@@ ... @@",
                        "en": "@@ ... @@"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Python'da üçlü tek tırnak (''') veya üçlü çift tırnak (\"\"\") çok satırlı açıklamalar veya docstring oluşturmak için tercih edilir.",
            "en": "In Python, triple single quotes (''') or triple double quotes (\"\"\") are preferred for creating multi-line comments or docstrings."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 3 — Variables
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: { tr: 'Değişkenler', en: 'Variables' }, difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🏷️', content: { tr: 'Değişken, içine bir şey koyabileceğin etiketlenmiş bir kutu. "isim = \'Ali\'" diyince "isim" etiketli kutuya \'Ali\' koymuş olursun. İstediğin zaman açıp bakabilirsin.', en: 'A variable is a labeled box. When you write name = "Ali", you put "Ali" in a box labeled "name". You can check it anytime.' } },
      { type: 'text', content: { tr: "Java\'da değişken tipi açıkça yazılır: int x = 5. Python\'da sadece x = 5 yazılır — Python tipi otomatik anlar. Bu \"dinamik tipleme\" olarak adlandırılır.", en: 'Java requires explicit type: int x = 5. Python just needs x = 5 — the type is inferred automatically. This is called dynamic typing.' } },
      { type: 'code', language: 'python', code: `# Python Variables — no type declaration needed
name = "Alice"          # str (string)
age = 25                # int (integer)
score = 98.5            # float
is_active = True        # bool
nothing = None          # None (Java: null)

# Multiple assignment
x, y, z = 1, 2, 3      # Assign multiple at once

# Same value to multiple variables
a = b = c = 0

# Type can change (dynamic typing)
x = 10                  # int
x = "hello"             # now str — valid in Python!

# Check type
print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>` },
      { type: 'editor', lang: 'python', defaultCode: `# Experiment with variables
test_name = "Login Test"
passed = True
duration_ms = 234
error_count = 0

print("Test:", test_name)
print("Passed:", passed)
print("Duration:", duration_ms, "ms")
print("Errors:", error_count)
print("Type of passed:", type(passed))` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Variables' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'int değişken', en: 'Integer variable' }, java: 'int x = 5;', python: 'x = 5' },
        { concept: { tr: 'String değişken', en: 'String variable' }, java: 'String s = "hi";', python: 's = "hi"' },
        { concept: { tr: 'Null değer', en: 'Null value' }, java: 'String s = null;', python: 's = None' },
        { concept: { tr: 'Tip kontrolü', en: 'Type check' }, java: 'x instanceof Integer', python: 'type(x) == int  or  isinstance(x, int)' },
        { concept: { tr: 'Sabit (const)', en: 'Constant' }, java: 'final int MAX = 100;', python: 'MAX = 100  # convention: ALL_CAPS' },
      ]},
      { type: 'quiz', question: { tr: "Python\'da bir değişkenin tipini öğrenmek için hangi fonksiyon kullanılır?", en: 'Which function checks the type of a variable in Python?' }, options: [{ id: 'a', text: 'typeof(x)' }, { id: 'b', text: 'x.getClass()' }, { id: 'c', text: 'type(x)' }, { id: 'd', text: 'datatype(x)' }], correct: 'c', explanation: { tr: "type(x) Python\'ın yerleşik fonksiyonudur. isinstance(x, int) ise miras (inheritance) dahil kontrol eder.", en: "type(x) is Python\'s built-in. isinstance(x, int) also works and checks inheritance." } ,
        retryQuestion: {
      "question": {
            "tr": "Bir Python değişkeninin sınıfını (veri tipini) öğrenmek için en yaygın kullanılan yöntem nedir?",
            "en": "What is the most common method to determine the class (data type) of a Python variable?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "x.type()",
                        "en": "x.type()"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "get_type(x)",
                        "en": "get_type(x)"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "type(x)",
                        "en": "type(x)"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "is_instance(x)",
                        "en": "is_instance(x)"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Python'da bir değişkenin türünü doğrudan döndürmek için type() yerleşik fonksiyonu kullanılır.",
            "en": "The built-in type() function is used in Python to directly return the type of a variable."
      }
}
},
      {
        type: 'python-memory-visual',
        titleEn: 'Memory Model — All Basic Types Side by Side',
        titleTr: 'Bellek Modeli — Temel Tipler Yan Yana',
        variables: [
          { name: 'name', value: 'Alice', type: 'str', desc: 'Text / String', descTr: 'Metin / String' },
          { name: 'age', value: 25, type: 'int', desc: 'Whole number', descTr: 'Tam sayı' },
          { name: 'score', value: 98.5, type: 'float', desc: 'Decimal number', descTr: 'Ondalıklı sayı' },
          { name: 'is_qa', value: 'True', type: 'bool', desc: 'True / False', descTr: 'Doğru / Yanlış' },
          { name: 'error', value: 'None', type: 'None', desc: 'Java null', descTr: 'Java null karşılığı' },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 4 — Data Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: { tr: 'Veri Tipleri', en: 'Data Types' }, difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🗂️', content: { tr: 'Veri tipleri, farklı "çekmece" türleri gibi. Sayılar, yazılar, listeler, doğru/yanlış — her veri türü için ayrı bir çekmece var.', en: 'Data types are like different drawer types. Numbers, text, lists, true/false — each kind of data has its own drawer.' } },
      { type: 'text', content: { tr: "Java\'da primitive tipler (int, double, boolean) ve Object tipleri ayrıdır. Python\'da her şey bir object\'tir — int, str, list, dict hepsi birer sınıf örneğidir.", en: 'Java separates primitives (int, double, boolean) from Objects. In Python, everything is an object — int, str, list, dict are all class instances.' } },
      { type: 'table', headers: [{ tr: 'Python Tipi', en: 'Python Type' }, { tr: 'Örnek', en: 'Example' }, { tr: 'Java Karşılığı', en: 'Java Equivalent' }, { tr: 'Değiştirilebilir mi?', en: 'Mutable?' }], rows: [
        ['str', '"hello"', 'String', { tr: 'Hayır', en: 'No' }],
        ['int', '42', 'int / Integer', { tr: 'Hayır', en: 'No' }],
        ['float', '3.14', 'double / Double', { tr: 'Hayır', en: 'No' }],
        ['bool', 'True / False', 'boolean', { tr: 'Hayır', en: 'No' }],
        ['list', '[1, 2, 3]', 'ArrayList<T>', { tr: 'Evet', en: 'Yes' }],
        ['tuple', '(1, 2, 3)', 'List.of()', { tr: 'Hayır', en: 'No' }],
        ['dict', '{"a": 1}', 'HashMap<K,V>', { tr: 'Evet', en: 'Yes' }],
        ['set', '{1, 2, 3}', 'HashSet<T>', { tr: 'Evet', en: 'Yes' }],
        ['NoneType', 'None', 'null', '-'],
      ]},
      { type: 'editor', lang: 'python', defaultCode: `# Explore Python data types
x = 42              # int
y = 3.14            # float
s = "hello"         # str
b = True            # bool
lst = [1, 2, 3]     # list
tpl = (1, 2)        # tuple
d = {"key": "val"}  # dict
st = {1, 2, 3}      # set

for var in [x, y, s, b, lst, tpl, d, st]:
    print(type(var).__name__, ":", var)` },
      { type: 'quiz', question: { tr: "Python\'da hangi veri tipi değiştirilemez (immutable)?", en: 'Which Python data type is immutable (cannot be changed after creation)?' }, options: [{ id: 'a', text: 'list' }, { id: 'b', text: 'dict' }, { id: 'c', text: 'tuple' }, { id: 'd', text: 'set' }], correct: 'c', explanation: { tr: "Tuple immutable\'dır — oluşturduktan sonra eleman ekleyip çıkaramazsınız. Java\'daki List.of() gibi.", en: "Tuples are immutable — you cannot add or remove elements after creation. Like Java\'s List.of()." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da aşağıdakilerden hangisi değiştirilebilir (mutable) bir veri tipidir?",
            "en": "Which of the following Python data types is mutable (can be changed after creation)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "str"
            },
            {
                  "id": "b",
                  "text": "list"
            },
            {
                  "id": "c",
                  "text": "tuple"
            },
            {
                  "id": "d",
                  "text": "frozenset"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Listeler mutable'dır; yani indeksleme yoluyla elemanları güncelleyebilir, yeni elemanlar ekleyebilir veya çıkarabilirsiniz.",
            "en": "Lists are mutable, meaning you can update elements, add new items, or remove them using indexing and built-in methods."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 5 — Numbers
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: { tr: 'Sayılar', en: 'Numbers' }, difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🔢', content: { tr: "Python\'da üç tür sayı var: tam sayılar (3, 100), ondalıklı sayılar (3.14), ve karmaşık sayılar (2+3j). Günlük kodlamada çoğunlukla ilk ikisini kullanırsın.", en: 'Python has three number types: integers (3, 100), floats (3.14), and complex (2+3j). In daily coding you mostly use the first two.' } },
      { type: 'text', content: { tr: "Java\'da int sınırlı büyüklüktedir (max ~2 milyar). Python\'da int sınırsız büyüyebilir — memory yettikçe. float ise Java\'daki double\'a eşdeğerdir.", en: "Java\'s int has a fixed limit (~2 billion). Python\'s int can grow infinitely — limited only by memory. Python\'s float is equivalent to Java\'s double." } },
      { type: 'code', language: 'python', code: `# Python Numbers
x = 10          # int
y = 3.14        # float
z = 2 + 3j      # complex

# Arithmetic operators
print(10 + 3)   # 13  — addition
print(10 - 3)   # 7   — subtraction
print(10 * 3)   # 30  — multiplication
print(10 / 3)   # 3.333... — true division (always float!)
print(10 // 3)  # 3   — floor division (Java: 10 / 3)
print(10 % 3)   # 1   — modulo
print(2 ** 10)  # 1024 — power (Java: Math.pow(2,10))

# Large numbers — Python handles them natively
big = 2 ** 100   # No overflow!
print(big)` },
      { type: 'editor', lang: 'python', defaultCode: `# Number calculations for QA
total = 250         # Total test cases
passed = 223
failed = total - passed
pass_rate = (passed / total) * 100

print("Total:", total)
print("Passed:", passed)
print("Failed:", failed)
print(f"Pass rate: {pass_rate:.1f}%")  # 1 decimal place
print("Is 100% pass:", pass_rate == 100)` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Numbers' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Tam bölme', en: 'Integer division' }, java: '10 / 3  // = 3', python: '10 // 3  # = 3' },
        { concept: { tr: 'Gerçek bölme', en: 'True division' }, java: '10.0 / 3  // = 3.333', python: '10 / 3  # = 3.333 (always!)' },
        { concept: { tr: 'Üs alma', en: 'Power' }, java: 'Math.pow(2, 10)', python: '2 ** 10' },
        { concept: { tr: 'Sınırsız int', en: 'Unlimited int' }, java: 'BigInteger', python: 'int (built-in, unlimited)' },
      ]},
      { type: 'quiz', question: { tr: "Python\'da 10 / 3 ifadesinin sonucu nedir?", en: 'What does 10 / 3 return in Python?' }, options: [{ id: 'a', text: '3' }, { id: 'b', text: '3.333...' }, { id: 'c', text: '3.0' }, { id: 'd', text: 'Error' }], correct: 'b', explanation: { tr: "Python\'da / her zaman float döner (3.3333...). Tam bölme için // kullanılır ve 3 döner. Java\'dan büyük fark!", en: 'In Python, / always returns a float (3.3333...). Use // for integer division which returns 3. Big difference from Java!' } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da 7 // 2 işleminin sonucu nedir?",
            "en": "What is the result of 7 // 2 in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "3.5"
            },
            {
                  "id": "b",
                  "text": "3"
            },
            {
                  "id": "c",
                  "text": "4"
            },
            {
                  "id": "d",
                  "text": "2.5"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "// operatörü tam bölme (floor division) yapar ve sonucun ondalık kısmını atarak en yakın küçük tam sayıya yuvarlar.",
            "en": "The // operator performs floor division and discards the fractional part, returning the largest integer less than or equal to the result."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 6 — Casting
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: { tr: 'Casting (Tip Dönüşümü)', en: 'Casting (Type Conversion)' }, difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🔄', content: { tr: 'Casting, bir şeyi farklı bir şekle dönüştürmek gibi. Suyu buz yapıyorsun ama H₂O aynı kalıyor. "5" yazısını 5 sayısına çeviriyorsun — ama artık matematiksel işlem yapabilirsin.', en: 'Casting is like transforming something into a different form. "5" is a text, 5 is a number. Casting turns one into the other so you can do math.' } },
      { type: 'code', language: 'python', code: `# Python Casting — converting between types
x = int("5")         # str → int  : 5
y = float(5)         # int → float: 5.0
z = str(3.14)        # float → str: "3.14"
b = bool(0)          # int → bool : False
b2 = bool("hello")   # str → bool : True  (non-empty = True)
b3 = bool("")        # str → bool : False (empty = False)

# Common in QA: reading CSV/JSON data
csv_value = "1500"   # From a CSV file — it\'s a string!
count = int(csv_value)
print(count * 2)     # 3000 — now we can do math

# Truthy / Falsy values
print(bool(0))       # False
print(bool(1))       # True
print(bool([]))      # False (empty list)
print(bool([1,2]))   # True  (non-empty list)` },
      { type: 'editor', lang: 'python', defaultCode: `# Casting exercise
age_str = "25"        # From user input — always a string!
age_int = int(age_str)
print("Age as string:", age_str, type(age_str).__name__)
print("Age as int:", age_int, type(age_int).__name__)
print("Next year:", age_int + 1)

# Truthy/Falsy
values = [0, 1, "", "hello", [], [1,2], None]
for v in values:
    print(f"bool({repr(v)}) = {bool(v)}")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Casting' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'String → int', en: 'String to int' }, java: 'Integer.parseInt("5")', python: 'int("5")' },
        { concept: { tr: 'int → String', en: 'int to String' }, java: 'String.valueOf(5)', python: 'str(5)' },
        { concept: { tr: 'int → double', en: 'int to float' }, java: '(double) 5', python: 'float(5)' },
        { concept: { tr: 'Herhangi → bool', en: 'Anything to bool' }, java: '(boolean) — limited', python: 'bool(x) — all values castable' },
      ]},
      { type: 'quiz', question: { tr: 'int("3.14") ifadesi ne döner?', en: 'What does int("3.14") return in Python?' }, options: [{ id: 'a', text: '3' }, { id: 'b', text: '3.14' }, { id: 'c', text: 'ValueError' }, { id: 'd', text: '0' }], correct: 'c', explanation: { tr: "int() doğrudan ondalıklı string\'i çeviremez. Önce float(\"3.14\"), sonra int() kullanmalısınız: int(float(\"3.14\")) = 3", en: 'int() cannot directly convert a decimal string. Use int(float("3.14")) = 3. Direct int("3.14") raises ValueError.' } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da float(\"on\") ifadesi nasıl bir sonuç üretir?",
            "en": "What happens when you execute float(\"on\") in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "0.0"
            },
            {
                  "id": "b",
                  "text": "0"
            },
            {
                  "id": "c",
                  "text": "ValueError"
            },
            {
                  "id": "d",
                  "text": "None"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "float() fonksiyonu, sadece sayısal karakterler içeren string'leri çevirebilir. \"on\" gibi sayısal değer ifade etmeyen bir string geçildiğinde ValueError hatası alınır.",
            "en": "The float() function can only convert strings that represent numeric values. Passing a non-numeric string like \"on\" results in a ValueError."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 7 — Strings
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: { tr: 'String\'ler (Metinler)', en: 'Strings' }, difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '📝', content: { tr: "String, harflerden oluşan bir dize — \"merhaba\" gibi. Python'da stringleri tek (''), çift (\"\") veya üçlü (\"\"\") tırnak içinde yazabilirsin.", en: 'A string is a sequence of characters — like "hello". In Python you can write strings with single, double, or triple quotes.' } },
      { type: 'text', content: { tr: "Java\'da String.charAt(), substring(), indexOf() gibi metodlar kullanılır. Python\'da aynı işler için daha kısa ve okunabilir sözdizimi var: s[0], s[1:5], \"hello\" in s gibi.", en: 'Java uses String.charAt(), substring(), indexOf(). Python has shorter, more readable syntax: s[0], s[1:5], "hello" in s.' } },
      { type: 'code', language: 'python', code: `# Python Strings
s = "Hello, World!"

# Access characters
print(s[0])         # H  (first character)
print(s[-1])        # !  (last character)

# Slicing  [start:stop:step]
print(s[0:5])       # Hello
print(s[7:])        # World!
print(s[:5])        # Hello
print(s[::2])       # Hlo ol!  (every 2nd char)
print(s[::-1])      # !dlroW ,olleH  (reversed!)

# String methods
print(s.upper())       # HELLO, WORLD!
print(s.lower())       # hello, world!
print(s.replace("World", "Python"))  # Hello, Python!
print(s.split(", "))   # ['Hello', 'World!']
print(len(s))          # 13

# f-strings (most modern — use this!)
name = "Alice"
age = 30
print(f"Name: {name}, Age: {age}")       # Python 3.6+
print(f"Next year: {age + 1}")           # Can do math inside!` },
      { type: 'editor', lang: 'python', defaultCode: `# String operations for QA
url = "https://automationexercise.com/api/users"
method = "GET"
status = 200

# f-string log message
print(f"[{method}] {url} → {status}")

# String methods
print("Upper:", url.upper())
print("Contains 'api':", "api" in url)
print("Split path:", url.split("/"))
print("Starts with https:", url.startswith("https"))
print("Replace:", url.replace("api", "v2"))` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Strings' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'İlk karakter', en: 'First character' }, java: 's.charAt(0)', python: 's[0]' },
        { concept: { tr: 'Alt string', en: 'Substring' }, java: 's.substring(0,5)', python: 's[0:5]' },
        { concept: { tr: 'Büyük harf', en: 'To upper' }, java: 's.toUpperCase()', python: 's.upper()' },
        { concept: { tr: 'İçeriyor mu?', en: 'Contains?' }, java: 's.contains("x")', python: '"x" in s' },
        { concept: { tr: 'Parçala', en: 'Split' }, java: 's.split(",")', python: 's.split(",")' },
        { concept: { tr: 'Format (modern)', en: 'String format' }, java: 'String.format("Hi %s", name)', python: 'f"Hi {name}"' },
      ]},
      { type: 'quiz', question: { tr: '"Hello"[::-1] ifadesi ne döner?', en: 'What does "Hello"[::-1] return?' }, options: [{ id: 'a', text: 'Hello' }, { id: 'b', text: 'olleH' }, { id: 'c', text: 'H' }, { id: 'd', text: 'Error' }], correct: 'b', explanation: { tr: "[::-1] slice\'ı stringi tersine çevirir. -1 adım = sondan başa gider. Bu Python\'a özgü çok kullanışlı bir trick.", en: '[::-1] reverses the string. Step -1 means go backwards. This is a very Pythonic trick with no Java equivalent.' } ,
        retryQuestion: {
      "question": {
            "tr": "'Python'[::-2] ifadesi ne döner?",
            "en": "What does 'Python'[::-2] return?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "no"
            },
            {
                  "id": "b",
                  "text": "nhy"
            },
            {
                  "id": "c",
                  "text": "nht"
            },
            {
                  "id": "d",
                  "text": "Pyth"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Slicing'de -2 adımı, stringi sondan başa doğru her iki karakterde bir seçer. 'n', 'h', 'y' karakterlerini alır.",
            "en": "The -2 step in slicing iterates backwards, skipping every second character. It selects 'n', 'h', and 'y'."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 8 — Booleans
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: { tr: 'Boolean\'lar', en: 'Booleans' }, difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '✅', content: { tr: 'Boolean, sadece iki değer alır: True veya False (doğru veya yanlış). "Test geçti mi?" sorusunun cevabı gibi — ya evet ya hayır.', en: 'A Boolean has only two values: True or False. Like the answer to "Did the test pass?" — only yes or no.' } },
      { type: 'text', content: { tr: "Java\'da boolean küçük harfle (true/false) yazılır. Python\'da büyük harfle (True/False). Ayrıca Python\'da her değer True ya da False gibi davranır — boş liste, 0, None hepsi False sayılır.", en: 'Java writes boolean lowercase (true/false). Python uses uppercase (True/False). Python also has "truthy/falsy" — empty list, 0, None all behave as False.' } },
      { type: 'code', language: 'python', code: `# Python Booleans
print(True)          # True
print(False)         # False
print(10 > 5)        # True
print(10 == 5)       # False

# Comparison operators return bool
x = 5
print(x == 5)   # True   (equal)
print(x != 3)   # True   (not equal)
print(x > 3)    # True   (greater than)
print(x >= 5)   # True   (greater or equal)

# Logical operators (Python uses words, not symbols!)
print(True and False)    # False  (Java: &&)
print(True or False)     # True   (Java: ||)
print(not True)          # False  (Java: !)

# Truthy / Falsy
print(bool(0))      # False
print(bool(1))      # True
print(bool(""))     # False — empty string
print(bool("hi"))   # True  — non-empty string
print(bool([]))     # False — empty list
print(bool(None))   # False — None is always falsy` },
      { type: 'editor', lang: 'python', defaultCode: `# QA Boolean checks
test_passed = True
response_time = 120   # ms
expected_time = 200   # ms

is_fast = response_time < expected_time
print("Test passed:", test_passed)
print("Is fast:", is_fast)
print("Both OK:", test_passed and is_fast)

# Truthiness check
errors = []  # empty list
if not errors:
    print("No errors — all clear!")
else:
    print("Errors found:", errors)` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Booleans' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Boolean değerleri', en: 'Boolean values' }, java: 'true, false', python: 'True, False (capital!)' },
        { concept: { tr: 'VE operatörü', en: 'AND operator' }, java: '&&', python: 'and' },
        { concept: { tr: 'VEYA operatörü', en: 'OR operator' }, java: '||', python: 'or' },
        { concept: { tr: 'DEĞİL operatörü', en: 'NOT operator' }, java: '!', python: 'not' },
        { concept: { tr: 'Falsy değerler', en: 'Falsy values' }, java: 'false, null only', python: 'False, None, 0, "", [], {}, ()' },
      ]},
      { type: 'quiz', question: { tr: "Python\'da bool([]) ifadesi ne döner?", en: 'What does bool([]) return in Python?' }, options: [{ id: 'a', text: 'True' }, { id: 'b', text: 'False' }, { id: 'c', text: 'None' }, { id: 'd', text: 'Error' }], correct: 'b', explanation: { tr: "Boş liste False\'tur. Python\'da boş container\'lar ([], {}, (), set()), 0, None ve \"\" hepsi False sayılır.", en: 'Empty list is falsy. In Python: empty containers ([], {}, (), set()), 0, None, and "" are all False.' } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da bool(0) ifadesi ne döner?",
            "en": "What does bool(0) return in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "True"
            },
            {
                  "id": "b",
                  "text": "False"
            },
            {
                  "id": "c",
                  "text": "0"
            },
            {
                  "id": "d",
                  "text": "Error"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python'da 0 değeri 'falsy' olarak kabul edilir. Bu nedenle bool(0) ifadesi False döndürür.",
            "en": "In Python, the integer 0 is considered 'falsy'. Therefore, the bool(0) expression returns False."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 9 — Operators
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: { tr: 'Operatörler', en: 'Operators' }, difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '⚙️', content: { tr: 'Operatörler, işlem sembolleri. Toplama (+), çıkarma (-), karşılaştırma (>, <), ve mantık (and, or) — bunların hepsi operatör. Matematik dersindeki sembollerin kod versiyonu.', en: 'Operators are action symbols. Addition (+), comparison (>, <), logic (and, or) — all operators. Think of them as the math symbols from school, but for code.' } },
      { type: 'code', language: 'python', code: `# Python Operators — complete reference

# Arithmetic
print(7 + 2)    # 9  (add)
print(7 - 2)    # 5  (subtract)
print(7 * 2)    # 14 (multiply)
print(7 / 2)    # 3.5 (divide — float)
print(7 // 2)   # 3  (floor divide — int)
print(7 % 2)    # 1  (modulo)
print(7 ** 2)   # 49 (power)

# Comparison (return True or False)
x = 5
print(x == 5)   # True  — equal to
print(x != 3)   # True  — not equal to
print(x > 3)    # True  — greater than
print(x < 10)   # True  — less than
print(x >= 5)   # True  — greater or equal
print(x <= 5)   # True  — less or equal

# Assignment operators (shorthand)
x = 10
x += 3    # x = x + 3  → 13
x -= 2    # x = x - 2  → 11
x *= 2    # x = x * 2  → 22

# Identity & Membership
print(x is None)         # False
print(5 in [1, 3, 5])    # True
print(7 not in [1, 3, 5])# True` },
      { type: 'editor', lang: 'python', defaultCode: `# Operator examples for QA
response_time = 150  # ms
threshold = 200      # ms SLA

# Arithmetic
margin = threshold - response_time
print("Margin:", margin, "ms")
print("50% of threshold:", threshold // 2)

# Comparison + logical
is_ok = response_time < threshold
is_critical = response_time >= threshold * 0.9
print("OK:", is_ok, "| Critical zone:", is_critical)

# Membership
allowed_methods = ["GET", "POST", "PUT", "DELETE"]
method = "PATCH"
print("Method allowed:", method in allowed_methods)` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Operators' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Üs alma', en: 'Power/Exponent' }, java: 'Math.pow(2, 8)', python: '2 ** 8' },
        { concept: { tr: 'Tam bölme', en: 'Floor division' }, java: '7 / 2  // = 3', python: '7 // 2  # = 3' },
        { concept: { tr: 'VE / VEYA / DEĞİL', en: 'AND / OR / NOT' }, java: '&& / || / !', python: 'and / or / not' },
        { concept: { tr: 'İçeriyor mu?', en: 'Contains check' }, java: 'list.contains(x)', python: 'x in list' },
        { concept: { tr: 'Referans eşitliği', en: 'Reference equality' }, java: '==', python: 'is' },
        { concept: { tr: 'Değer eşitliği', en: 'Value equality' }, java: '.equals()', python: '==' },
      ]},
      { type: 'quiz', question: { tr: "Python\'da \"not in\" operatörü ne işe yarar?", en: 'What does the "not in" operator do in Python?' }, options: [{ id: 'a', text: { tr: 'Bir listeyi tersine çevirir', en: 'It reverses a list' } }, { id: 'b', text: { tr: 'Bir değerin bir dizide OLMADIĞINI kontrol eder', en: 'It checks if a value is NOT in a sequence' } }, { id: 'c', text: { tr: 'Bir listeden eleman siler', en: 'It removes an element from a list' } }, { id: 'd', text: { tr: '!= ile aynıdır', en: 'Same as !=' } }], correct: 'b', explanation: { tr: "\"not in\" bir değerin listede, string\'de ya da dict\'te OLMADIĞINI kontrol eder. Java\'da list.contains(x) == false ile eşdeğer.", en: "\"not in\" checks if a value is absent from a sequence. Equivalent to Java\'s !list.contains(x)." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da 5 not in [1, 2, 3, 4] ifadesi ne döner?",
            "en": "What does 5 not in [1, 2, 3, 4] return in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "True",
                        "en": "True"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "False",
                        "en": "False"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "None",
                        "en": "None"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Hata",
                        "en": "Error"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "'not in' operatörü, eleman listede bulunmadığında True döndürür. 5 değeri listede olmadığı için sonuç True'dur.",
            "en": "The 'not in' operator returns True if the element is not present in the sequence. Since 5 is not in the list, the result is True."
      }
}
},

      // Section quizzes (converted from open-ended interview questions —
      // mülakat-tarzı serbest cevap soruları sadece "Mülakat" sekmesinde olmalı,
      // bu yüzden burada çoktan seçmeli quiz formatına dönüştürüldü)
      { type: 'quiz', question: { tr: 'Python\'da bir değişkene önce x = 5 (int) sonra x = "hello" (string) atarsan ne olur?', en: 'What happens if you assign x = 5 (int) and then x = "hello" (string) to the same variable in Python?' }, options: [{ id: 'a', text: { tr: 'Java\'da olduğu gibi derleme hatası verir', en: 'It raises a compile error, like in Java' } }, { id: 'b', text: { tr: 'Python buna izin verir, x artık bir string olur', en: 'Python allows it, x is now a string' } }, { id: 'c', text: { tr: 'Program çalışma zamanında çöker', en: 'The program crashes at runtime' } }, { id: 'd', text: { tr: 'x hem int hem string olarak kalır', en: 'x stays both an int and a string' } }], correct: 'b', explanation: { tr: 'Python dinamik tipli bir dildir — değişken tipini siz belirtmezsiniz, Python çalışma zamanında anlar. x = 5 dersiniz, x int olur; x = "hello" derseniz, x artık str olur. Java\'da bu bir derleme hatası verirdi çünkü tip sabitlenir.', en: "Python is dynamically typed — you don't declare variable types, Python infers them at runtime. x = 5 makes x an int; x = \"hello\" makes it a str. In Java, this would be a compile error because the type is fixed." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da 'y = 10.5' tanımladıktan hemen sonra 'y = [1, 2, 3]' ataması yaparsak ne gerçekleşir?",
            "en": "What happens if you define 'y = 10.5' and then immediately reassign 'y = [1, 2, 3]' in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Tip uyuşmazlığı nedeniyle hata alınır",
                        "en": "It raises a type mismatch error"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Python dinamik yapısı sayesinde y artık bir liste (list) olur",
                        "en": "Thanks to Python's dynamic nature, y becomes a list"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Değişkenin önceki tipi (float) korunur ve atama reddedilir",
                        "en": "The previous type (float) is preserved and the assignment is rejected"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Program derleme aşamasında hata verir",
                        "en": "The program fails at the compilation stage"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python'da değişkenler nesnelere referanstır, dolayısıyla bir değişkene farklı türde bir nesne atamak tamamen geçerli bir işlemdir. Python çalışma zamanında tip kontrolü yapar ve atanan yeni değerin türünü kabul eder.",
            "en": "In Python, variables are references to objects, so reassigning a variable to a different type of object is a perfectly valid operation. Python checks types at runtime and accepts the type of the newly assigned value."
      }
}
},
      { type: 'quiz', question: { tr: 'Python\'da bir değişkenin None olup olmadığını kontrol etmenin önerilen yolu hangisidir?', en: 'What is the recommended way to check if a Python variable is None?' }, options: [{ id: 'a', text: 'if x == None:' }, { id: 'b', text: 'if x is None:' }, { id: 'c', text: 'if x.equals(None):' }, { id: 'd', text: 'if None(x):' }], correct: 'b', explanation: { tr: 'None, Java\'daki null\'ın karşılığıdır. Karşılaştırma için == yerine "is" kullanılır çünkü None bir SINGLETON\'dır — "is None" kimlik (identity) kontrolü yapar, bu anlam ve performans açısından doğru olandır. Fonksiyon hiçbir şey dönmezse implicit olarak None döner.', en: 'None is Python\'s equivalent of Java\'s null. Use "is" instead of "==" for comparison because None is a SINGLETON — "is None" performs an identity check, which is the semantically and performance-correct choice. A function that returns nothing implicitly returns None.' } ,
        retryQuestion: {
      "question": {
            "tr": "Aşağıdakilerden hangisi Python PEP 8 standartlarına göre bir 'val' değişkeninin değerinin None olup olmadığını kontrol etmek için en doğru sözdizimidir?",
            "en": "Which of the following is the most idiomatic Python syntax according to PEP 8 to check if a 'val' variable is None?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "if val == None:"
            },
            {
                  "id": "b",
                  "text": "if val is None:"
            },
            {
                  "id": "c",
                  "text": "if val.is_null():"
            },
            {
                  "id": "d",
                  "text": "if None == val:"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python'da 'None' tekil (singleton) bir nesnedir. 'is None' ifadesi, nesnenin kimliğini kontrol eder ve tercih edilen yöntemdir. '== None' kullanımı ise teknik olarak çalışsa da Pythonic bir yaklaşım değildir.",
            "en": "In Python, 'None' is a singleton object. 'is None' checks the identity of the object and is the preferred, idiomatic way. Using '== None' technically works but is not considered Pythonic."
      }
}
},
      { type: 'quiz', question: { tr: 'Python\'da iki değişkenin AYNI bellek nesnesini işaret edip etmediğini (değer eşitliği değil, kimlik eşitliği) kontrol etmek için hangi operatör kullanılır?', en: 'Which operator checks whether two Python variables point to the EXACT SAME object in memory (identity, not value equality)?' }, options: [{ id: 'a', text: '==' }, { id: 'b', text: 'is' }, { id: 'c', text: '.equals()' }, { id: 'd', text: 'compareTo()' }], correct: 'b', explanation: { tr: '"==" değer eşitliğini kontrol eder. "is" ise kimlik (identity) eşitliğini kontrol eder — aynı bellek nesnesi mi? None, True, False için "is" kullanılır. Sayılar ve string\'ler için "==" kullanılır. Java\'daki == (referans) → Python\'da is; Java\'daki .equals() → Python\'da ==.', en: '"==" checks value equality. "is" checks identity — are they the same object in memory? Use "is" for None, True, False. Use "==" for numbers and strings. Java\'s == (reference) maps to Python\'s is; Java\'s .equals() maps to Python\'s ==.' } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da iki değişkenin bellekte aynı nesne olup olmadığını sorgulamak için kullanılan operatör hangisidir?",
            "en": "Which operator is used in Python to query if two variables refer to the same object in memory?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "=="
            },
            {
                  "id": "b",
                  "text": "is"
            },
            {
                  "id": "c",
                  "text": "match"
            },
            {
                  "id": "d",
                  "text": "==="
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "'is' operatörü nesne kimliğini (id) karşılaştırırken, '==' operatörü nesne değerlerini karşılaştırır. Aynı bellek konumuna işaret edip etmediklerini anlamak için her zaman 'is' operatörü kullanılmalıdır.",
            "en": "The 'is' operator compares object identity (id), while the '==' operator compares object values. The 'is' operator should always be used to determine if they point to the same location in memory."
      }
}
},
      { type: 'quiz', question: { tr: 'QA otomasyon kodunda `if errors:` yazmak (errors boş bir liste olduğunda False, dolu olduğunda True), Java\'daki hangi kontrolün kısayoludur?', en: 'In QA automation code, writing `if errors:` (False when errors is an empty list, True when non-empty) is shorthand for which Java check?' }, options: [{ id: 'a', text: { tr: 'if (errors == null)', en: 'if (errors == null)' } }, { id: 'b', text: { tr: 'if (errors != null && !errors.isEmpty())', en: 'if (errors != null && !errors.isEmpty())' } }, { id: 'c', text: { tr: 'if (errors.size() > 0)', en: 'if (errors.size() > 0)' } }, { id: 'd', text: { tr: 'try { } catch bloğu', en: 'a try { } catch block' } }], correct: 'b', explanation: { tr: 'Herhangi bir Python değeri bool\'a dönüştürülebilir (truthy/falsy). 0, None, "", [], {}, () False\'tur; geri kalanlar True\'dur. "if errors:" hem null kontrolünü hem "boş değil mi" kontrolünü tek satırda yapar — Java\'daki "if (errors != null && !errors.isEmpty())" yerine çok daha kısadır.', en: 'Any Python value can be coerced to a bool (truthy/falsy). 0, None, "", [], {}, () are False; everything else is True. "if errors:" combines a null check AND a "not empty" check in one line — much shorter than Java\'s "if (errors != null && !errors.isEmpty())".' } ,
        retryQuestion: {
      "question": {
            "tr": "QA otomasyon kodunda bir dictionary'nin dolu olup olmadığını kontrol etmek için kullanılan `if data:` yapısı, Java'daki hangi ifadeye eşdeğerdir?",
            "en": "In QA automation code, the `if data:` construct used to check if a dictionary is not empty is equivalent to which Java expression?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "if (data != null)",
                        "en": "if (data != null)"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "if (data != null && !data.isEmpty())",
                        "en": "if (data != null && !data.isEmpty())"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "if (data.size() == 0)",
                        "en": "if (data.size() == 0)"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "if (data instanceof Map)",
                        "en": "if (data instanceof Map)"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python'da boş bir koleksiyon (liste, sözlük, küme) 'falsy' olarak değerlendirilir. 'if data:' ifadesi, hem değişkenin None olmadığını hem de koleksiyonun en az bir elemana sahip olduğunu doğrular. Bu, Java'da hem null kontrolü hem de isEmpty() kontrolü gerektiren durumun kısaltılmış halidir.",
            "en": "In Python, empty collections (lists, dicts, sets) are 'falsy'. The expression 'if data:' verifies both that the variable is not None and that the collection contains at least one item. This is the shorthand for the Java requirement to perform both null and isEmpty() checks."
      }
}
},
    ],
  },

  // ── 3. INTERMEDIATE ─────────────────────────────────────────────────────────
  {
    title: '🟡 Intermediate Python',
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 10 — Lists
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Lists', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🛒', content: { tr: 'Liste, sıralı bir alışveriş listesi gibi. Her maddenin bir numarası (index) var. İstediğin yere ekleyebilir, istediğini silebilirsin.', en: 'A list is like a numbered shopping list. Each item has an index. You can add anywhere, remove anything.' } },
      { type: 'text', content: { tr: "Java\'daki ArrayList\'in karşılığı Python\'daki list\'tir. Ama hiçbir import gerekmez, generic tip yazmak gerekmez. [1, 2, 3] yeterli. Farklı tipte elemanlar da tutabilir.", en: "Python list is Java\'s ArrayList. No import needed, no generic types. [1, 2, 3] is all you need. Lists can hold mixed types." } },
      { type: 'code', language: 'python', code: `# Python Lists — most used data structure
tests = ["login", "checkout", "search"]  # Create

# Access
print(tests[0])      # "login"  (first)
print(tests[-1])     # "search" (last)
print(tests[1:])     # ["checkout", "search"] (slice)

# Modify
tests.append("register")    # Add to end
tests.insert(1, "cart")     # Insert at index 1
tests.remove("search")      # Remove by value
popped = tests.pop()        # Remove & return last
tests[0] = "LOGIN"          # Change element

# Info
print(len(tests))           # Count elements
print("login" in tests)     # Membership check
tests.sort()                # Sort in place
tests.reverse()             # Reverse in place

# Iterate
for test in tests:
    print("-", test)` },
      { type: 'editor', lang: 'python', defaultCode: `# Working with test case lists
failed_tests = ["test_login", "test_checkout", "test_payment"]
print("Failed tests:", len(failed_tests))

# Add a new failure
failed_tests.append("test_search")
print("After append:", failed_tests)

# Check if specific test failed
if "test_login" in failed_tests:
    print("ALERT: Login test failed!")

# Sort and print
failed_tests.sort()
print("Sorted:", failed_tests)

# Remove resolved test
failed_tests.remove("test_checkout")
print("After fix:", failed_tests)` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Lists' }, columns: ['Java (ArrayList)', 'Python (list)'], rows: [
        { concept: { tr: 'Oluştur', en: 'Create' }, java: 'new ArrayList<>()', python: '[]' },
        { concept: { tr: 'Ekle (sona)', en: 'Append (end)' }, java: 'list.add("x")', python: 'list.append("x")' },
        { concept: { tr: 'İndexle eriş', en: 'Access by index' }, java: 'list.get(0)', python: 'list[0]' },
        { concept: { tr: 'Boyut', en: 'Size' }, java: 'list.size()', python: 'len(list)' },
        { concept: { tr: 'İçeriyor mu?', en: 'Contains?' }, java: 'list.contains(x)', python: 'x in list' },
        { concept: { tr: 'Sırala', en: 'Sort' }, java: 'Collections.sort(list)', python: 'list.sort()' },
      ]},
      { type: 'quiz', question: { tr: 'tests = ["a","b","c"] ise tests[-1] ne döner?', en: 'If tests = ["a","b","c"], what does tests[-1] return?' }, options: [{ id: 'a', text: '"a"' }, { id: 'b', text: '"b"' }, { id: 'c', text: '"c"' }, { id: 'd', text: 'Error' }], correct: 'c', explanation: { tr: "Negatif index sondan sayar. -1 = son eleman, -2 = sondan ikinci. Java\'da bu doğrudan desteklenmez.", en: "Negative indices count from the end. -1 = last, -2 = second to last. Java doesn\'t support negative indexing." } ,
        retryQuestion: {
      "question": {
            "tr": "logs = ['info', 'warning', 'error'] verildiğinde, logs[-2] ifadesi neyi döndürür?",
            "en": "Given logs = ['info', 'warning', 'error'], what does the expression logs[-2] return?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "'info'"
            },
            {
                  "id": "b",
                  "text": "'warning'"
            },
            {
                  "id": "c",
                  "text": "'error'"
            },
            {
                  "id": "d",
                  "text": "None"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python listelerinde negatif indeksleme -1 ile en sondan başlar. -1 'error' değerine, -2 ise sondan ikinci olan 'warning' değerine karşılık gelir.",
            "en": "In Python lists, negative indexing starts from the end with -1. Therefore, -1 corresponds to 'error', and -2 corresponds to the second-to-last item, 'warning'."
      }
}
},
      {
        type: 'python-collection-visual',
        titleEn: 'List Operations — Try Append & Pop Live',
        titleTr: 'Liste İşlemleri — Append & Pop\'u Canlı Dene',
        collectionType: 'list',
        initial: ['login', 'checkout', 'search'],
        appendItems: ['payment', 'logout', 'profile', 'cart'],
      },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 11 — Tuples
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Tuples', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '📦', content: { tr: 'Tuple, açılamaz, değiştirilemez bir kutu gibi. İçine koyduklarını sonsuza kadar öyle kalır. GPS koordinatları gibi — (lat, lon) değişmez.', en: "A tuple is a sealed box — you can\'t change what\'s inside. Like GPS coordinates (lat, lon) — fixed and permanent." } },
      { type: 'text', content: { tr: "Java\'da değiştirilemez liste için List.of() veya Collections.unmodifiableList() kullanırsınız. Python\'da tuple bu işi görür. Tuple() sözdizimi ile [] yerine () kullanılır. Fonksiyondan birden fazla değer döndürmek için ideal.", en: "Java uses List.of() or unmodifiableList() for immutable lists. Python\'s tuple does this. Use () instead of []. Ideal for returning multiple values from a function." } },
      { type: 'code', language: 'python', code: `# Python Tuples — immutable sequences
point = (10, 20)         # x, y coordinates
color = (255, 128, 0)    # RGB — never changes
status = (200, "OK")     # HTTP status + message

# Access (same as list)
print(point[0])          # 10
print(point[-1])         # 20

# Tuple unpacking — very Pythonic!
x, y = point             # x=10, y=20
code, msg = status       # code=200, msg="OK"
print(f"HTTP {code}: {msg}")

# Tuples are immutable — this raises TypeError:
# point[0] = 99  ← ERROR!

# Function returning multiple values (actually a tuple)
def min_max(numbers):
    return min(numbers), max(numbers)   # Returns tuple!

low, high = min_max([3, 1, 4, 1, 5, 9])
print(f"Min: {low}, Max: {high}")

# tuple vs list
print(type((1, 2)))    # <class 'tuple'>
print(type([1, 2]))    # <class 'list'>` },
      { type: 'editor', lang: 'python', defaultCode: `# Tuple use cases
def get_test_result(test_name):
    """Returns (passed: bool, duration_ms: int, message: str)"""
    return True, 145, "Element found successfully"

passed, duration, message = get_test_result("test_login")
print("Passed:", passed)
print("Duration:", duration, "ms")
print("Message:", message)

# Tuple in comparison
result = ("PASS", 200)
if result[0] == "PASS":
    print("Test OK with status", result[1])` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Tuples' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Immutable liste', en: 'Immutable sequence' }, java: 'List.of(1, 2, 3)', python: '(1, 2, 3)' },
        { concept: { tr: 'Çift döndür', en: 'Return pair' }, java: 'return new int[]{a, b}; or Pair', python: 'return a, b  # tuple implicitly' },
        { concept: { tr: 'Unpack', en: 'Destructure' }, java: 'pair.getFirst(), pair.getSecond()', python: 'a, b = pair' },
        { concept: { tr: 'Değiştirmeye çalış', en: 'Try to modify' }, java: 'throws UnsupportedOperationException', python: 'raises TypeError' },
      ]},
      { type: 'quiz', question: { tr: "Python\'da bir fonksiyon \"return a, b\" döndürürse, dönen değer tipi nedir?", en: 'When a Python function does "return a, b", what type is returned?' }, options: [{ id: 'a', text: 'list' }, { id: 'b', text: 'tuple' }, { id: 'c', text: 'dict' }, { id: 'd', text: 'Two separate values' }], correct: 'b', explanation: { tr: "\"return a, b\" aslında bir tuple döndürür: (a, b). Bu Python\'da çok yaygın — değişken unpacking ile x, y = func() şeklinde kullanılır.", en: '"return a, b" returns a tuple (a, b). Very common in Python — use variable unpacking: x, y = func().' } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da bir fonksiyon `return x, y, z` ifadesini çalıştırdığında, dönen verinin veri yapısı türü nedir?",
            "en": "When a Python function executes `return x, y, z`, what is the data structure type of the returned value?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "list"
            },
            {
                  "id": "b",
                  "text": "tuple"
            },
            {
                  "id": "c",
                  "text": "set"
            },
            {
                  "id": "d",
                  "text": "sequence"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python'da virgülle ayrılmış birden fazla değerin döndürülmesi otomatik olarak bir 'tuple' (demet) yapısı oluşturur. Bu, Python'un çoklu değer döndürme mekanizmasıdır.",
            "en": "In Python, returning multiple values separated by commas automatically packs them into a 'tuple'. This is Python's native mechanism for returning multiple values from a function."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 12 — Sets
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Sets', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🎯', content: { tr: 'Set, tekrarsız bir koleksiyon. Bir sınıftaki öğrenci isimlerini listeliyor ama aynı isim birden fazla kez yazılmışsa — set kullanırsan sadece bir tane kalır.', en: 'A set is a collection with no duplicates. List student names but someone appears twice — a set keeps only one.' } },
      { type: 'text', content: { tr: "Java\'daki HashSet\'in karşılığı Python\'daki set\'tir. İçe aktarma gerekmez. {1, 2, 3} ile oluşturulur. Sıralama garantisi yoktur.", en: "Python set is Java\'s HashSet. No import needed. Created with {1, 2, 3}. No guaranteed order." } },
      { type: 'code', language: 'python', code: `# Python Sets — unique, unordered
browsers = {"Chrome", "Firefox", "Safari"}
browsers.add("Edge")           # Add element
browsers.add("Chrome")         # Duplicate — ignored silently!
print(len(browsers))           # 4 (no Chrome duplicate)

# Set operations (like math sets)
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)        # {1,2,3,4,5,6}  Union (a OR b)
print(a & b)        # {3, 4}          Intersection (both)
print(a - b)        # {1, 2}          Difference (in a, not b)
print(a ^ b)        # {1,2,5,6}       Symmetric diff (either, not both)

# Remove duplicates from a list
tags = ["smoke", "regression", "smoke", "e2e", "regression"]
unique_tags = list(set(tags))
print(unique_tags)   # each tag only once (order may vary)` },
      { type: 'editor', lang: 'python', defaultCode: `# Set use case: finding duplicate test IDs
test_runs = ["TC001", "TC002", "TC001", "TC003", "TC002"]
print("With duplicates:", test_runs)
print("Unique tests:", set(test_runs))
print("Total runs:", len(test_runs))
print("Unique count:", len(set(test_runs)))

# Find which browsers are NOT yet tested
all_browsers = {"Chrome", "Firefox", "Safari", "Edge"}
tested = {"Chrome", "Safari"}
not_tested = all_browsers - tested
print("Not tested:", not_tested)` },
      { type: 'quiz', question: { tr: "Set\'e aynı eleman iki kez eklenirse ne olur?", en: 'What happens when you add the same element to a set twice?' }, options: [{ id: 'a', text: 'Error is raised' }, { id: 'b', text: 'It appears twice' }, { id: 'c', text: 'The duplicate is silently ignored' }, { id: 'd', text: 'The set is cleared' }], correct: 'c', explanation: { tr: "Set\'ler benzersizdir. Aynı eleman eklendiğinde sessizce görmezden gelinir — hata olmaz.", en: 'Sets are unique. Adding a duplicate is silently ignored — no error, no duplicate.' } ,
        retryQuestion: {
      "question": {
            "tr": "Bir listeye append edilen aynı eleman listeye tekrar eklendiğinde sonuç ne olur?",
            "en": "What happens when you append the same element to a list again?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Hata verir",
                        "en": "Raises an error"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Eleman listede tekrar görünür",
                        "en": "The element appears twice in the list"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Önceki eleman güncellenir",
                        "en": "The previous element is updated"
                  }
            },
            {
                  "id": "d",
                  "text": "İşlem iptal edilir"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Listeler sıralı ve yinelenebilir yapılardır. Listeye aynı elemanı tekrar eklerseniz, bu eleman listede yeni bir indeksle tekrar yer alır.",
            "en": "Lists are ordered and allow duplicates. If you append the same element again, it will simply be added as a new entry at the end of the list."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 13 — Dictionaries
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Dictionaries', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '📖', content: { tr: "Dictionary, telefon rehberi gibi. İsim (key) yazıyorsun, numarayı (value) alıyorsun. {\"Ali\": \"555-1234\"} — Ali\'ye bak, numarasını al.", en: 'A dictionary is like a phone book. Look up a name (key), get the number (value). {"Ali": "555-1234"} — look up Ali, get his number.' } },
      { type: 'text', content: { tr: 'Java\'daki HashMap<K,V>\'nin karşılığı Python\'daki dict\'tir. İçe aktarma gerekmez. {"key": value} ile oluşturulur. Python 3.7\'den itibaren ekleme sırasını korur.', en: "Python dict is Java\'s HashMap<K,V>. No import. Created with {\"key\": value}. Since Python 3.7, dicts preserve insertion order." } },
      { type: 'code', language: 'python', code: `# Python Dictionaries
test = {
    "name": "Login Test",
    "status": "PASSED",
    "duration": 1243,
    "tags": ["smoke", "auth"],
}

# Access
print(test["name"])               # "Login Test" — KeyError if missing
print(test.get("name"))           # Same but safer
print(test.get("owner", "N/A"))   # Default if key missing → "N/A"

# Modify
test["status"] = "FAILED"         # Update
test["retry"] = 2                 # Add new key

# Check key existence
print("name" in test)             # True
print("owner" in test)            # False

# Iterate
for key, value in test.items():   # .items() = key-value pairs
    print(f"  {key}: {value}")

print(list(test.keys()))    # all keys
print(list(test.values()))  # all values

# Delete
del test["retry"]                 # Remove key
test.pop("duration", None)        # Remove & return (safe)` },
      { type: 'editor', lang: 'python', defaultCode: `# API response as dictionary
api_response = {
    "status": 200,
    "message": "OK",
    "data": {"user_id": 42, "username": "testuser"},
    "elapsed_ms": 87
}

print("Status:", api_response["status"])
print("Message:", api_response.get("message"))
print("User ID:", api_response["data"]["user_id"])

# Check all expected keys are present
required_keys = ["status", "message", "data"]
for key in required_keys:
    if key not in api_response:
        print(f"MISSING KEY: {key}")
    else:
        print(f"✓ {key} present")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Dictionaries' }, columns: ['Java (HashMap)', 'Python (dict)'], rows: [
        { concept: { tr: 'Oluştur', en: 'Create' }, java: 'new HashMap<>()', python: '{}  or  dict()' },
        { concept: { tr: 'Ekle / güncelle', en: 'Put / update' }, java: 'map.put("k", v)', python: 'map["k"] = v' },
        { concept: { tr: 'Değer al', en: 'Get value' }, java: 'map.get("k")', python: 'map["k"]  or  map.get("k")' },
        { concept: { tr: 'Güvenli al', en: 'Get with default' }, java: 'map.getOrDefault("k", def)', python: 'map.get("k", default)' },
        { concept: { tr: 'Anahtar var mı?', en: 'Contains key?' }, java: 'map.containsKey("k")', python: '"k" in map' },
        { concept: { tr: 'Tüm girişler', en: 'All entries' }, java: 'map.entrySet()', python: 'map.items()' },
      ]},
      { type: 'quiz', question: { tr: 'Sözlükte olmayan bir key için dict.get("key") ne döner?', en: "What does dict.get(\"missing_key\") return when the key doesn\'t exist?" }, options: [{ id: 'a', text: 'KeyError' }, { id: 'b', text: 'None' }, { id: 'c', text: '0' }, { id: 'd', text: 'False' }], correct: 'b', explanation: { tr: '.get() varsayılan olarak None döner. dict["key"] ise KeyError fırlatır. QA kodunda .get() tercih edilir — crash olmaz.', en: ".get() returns None by default. dict[\"key\"] raises KeyError. In QA code, prefer .get() — it won\'t crash on missing data." } ,
        retryQuestion: {
      "question": {
            "tr": "Sözlükte bulunmayan bir anahtar için dict[\"key\"] kullanımının sonucu nedir?",
            "en": "What is the result of accessing a non-existent key using dict['key']?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "KeyError"
            },
            {
                  "id": "b",
                  "text": "None"
            },
            {
                  "id": "c",
                  "text": "False"
            },
            {
                  "id": "d",
                  "text": "0"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Köşeli parantez ile erişim (dict[key]) anahtar bulunamadığında KeyError fırlatır. Hata yönetimi yapılmıyorsa programın durmasına sebep olur.",
            "en": "Accessing with square brackets (dict[key]) raises a KeyError if the key is missing. This will crash the script unless handled."
      }
}
},
      {
        type: 'python-collection-visual',
        titleEn: 'Dictionary — Add Entries & Lookup Keys Live',
        titleTr: 'Dictionary — Kayıt Ekle & Key Ara (Canlı)',
        collectionType: 'dict',
        initialDict: { name: 'Login Test', status: 'PASSED', duration: '1.2s' },
        newEntry: { key: 'env', value: 'staging' },
      },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 14 — If...Else
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'If...Else (Conditions)', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🚦', content: { tr: 'If-else, trafik ışığı gibi. Yeşil → git, kırmızı → dur, sarı → yavaşla. Kod da aynı şekilde karar verir: "Bu durum mu? O zaman şunu yap."', en: 'If-else is like a traffic light. Green → go, red → stop, yellow → slow down. Code makes decisions the same way: "Is this true? Then do this."' } },
      { type: 'code', language: 'python', code: `# Python If...Else
score = 87

# Basic if-else
if score >= 90:
    print("A grade")
elif score >= 80:      # "elif" — not "else if"!
    print("B grade")
elif score >= 70:
    print("C grade")
else:
    print("Below C")

# One-line ternary (inline if)
result = "PASS" if score >= 70 else "FAIL"
print(result)

# Nested conditions
user = "admin"
logged_in = True

if logged_in:
    if user == "admin":
        print("Admin dashboard")
    else:
        print("User dashboard")
else:
    print("Please login")

# Multiple conditions
status = 200
body = {"user": "alice"}

if status == 200 and "user" in body:
    print("Valid response")

# None check (use 'is', not ==)
value = None
if value is None:
    print("No value")` },
      { type: 'editor', lang: 'python', defaultCode: `# QA decision logic
def validate_response(status_code, body):
    if status_code == 200:
        if "error" in body:
            return "FAIL — body has error key"
        return "PASS"
    elif status_code == 401:
        return "FAIL — Unauthorized"
    elif status_code == 404:
        return "FAIL — Not Found"
    elif status_code >= 500:
        return "FAIL — Server Error"
    else:
        return f"UNKNOWN — status {status_code}"

print(validate_response(200, {"data": "ok"}))
print(validate_response(200, {"error": "oops"}))
print(validate_response(401, {}))
print(validate_response(503, {}))` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Conditions' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Else-if', en: 'Else-if' }, java: 'else if (cond)', python: 'elif cond:' },
        { concept: { tr: 'Ternary', en: 'Ternary operator' }, java: 'cond ? a : b', python: 'a if cond else b' },
        { concept: { tr: 'Switch', en: 'Switch statement' }, java: 'switch(x) { case 1: ... }', python: 'match x:  case 1:  (Python 3.10+)' },
        { concept: { tr: 'Null kontrolü', en: 'Null check' }, java: 'if (x == null)', python: 'if x is None:' },
      ]},
      { type: 'quiz', question: { tr: "Python\'da \"else if\" yerine hangi keyword kullanılır?", en: 'Which keyword does Python use instead of "else if"?' }, options: [{ id: 'a', text: 'else if' }, { id: 'b', text: 'elsif' }, { id: 'c', text: 'elif' }, { id: 'd', text: 'elseif' }], correct: 'c', explanation: { tr: "Python \"elif\" kullanır — \"else if\"nin kısaltması. Bu Python\'a özgüdür; Java\'da \"else if\" (iki kelime) kullanılır.", en: 'Python uses "elif" — short for "else if". This is Python-specific; Java uses "else if" (two words).' } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da birden fazla koşulu kontrol etmek için kullanılan doğru yapı nedir?",
            "en": "Which structure is the correct way to check multiple conditions in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "switch-case"
            },
            {
                  "id": "b",
                  "text": "elif"
            },
            {
                  "id": "c",
                  "text": "elsif"
            },
            {
                  "id": "d",
                  "text": "else-if"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python, koşullu dallanmalarda 'if', 'elif' ve 'else' anahtar kelimelerini kullanır. 'elif' (else if) ile ikinci ve sonraki koşullar kontrol edilir.",
            "en": "Python uses 'if', 'elif', and 'else' for conditional branching. 'elif' (else if) is the keyword used to evaluate subsequent conditions."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 15 — While Loops
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'While Loops', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🔁', content: { tr: 'While döngüsü, "koşul doğru olduğu sürece tekrar et" demek. Alarm saati çalana kadar uyumaya devam etmek gibi.', en: 'A while loop means "keep doing this as long as condition is true." Like sleeping until your alarm rings.' } },
      { type: 'code', language: 'python', code: `# Python While Loop
count = 0
while count < 5:
    print("Count:", count)  # 0, 1, 2, 3, 4
    count += 1               # MUST increment — else infinite loop!

# break — exit loop early
attempt = 0
while True:                  # Infinite loop
    attempt += 1
    if attempt >= 3:
        print("Max retries reached")
        break                # Exit loop

# continue — skip rest, go to next iteration
i = 0
while i < 5:
    i += 1
    if i == 3:
        continue             # Skip printing 3
    print(i)                 # Prints 1, 2, 4, 5

# else clause (runs when loop finishes normally — unique to Python!)
n = 0
while n < 3:
    n += 1
else:
    print("Loop finished normally")` },
      { type: 'editor', lang: 'python', defaultCode: `# Retry pattern — common in QA automation
import random  # for simulation

def check_service():
    return random.choice([False, False, True])  # Simulates flaky service

max_retries = 5
retry = 0

while retry < max_retries:
    retry += 1
    print(f"Attempt {retry}...")
    if check_service():
        print("Service is UP!")
        break
else:
    print(f"Service still DOWN after {max_retries} retries")` },
      { type: 'quiz', question: { tr: "Python\'da while döngüsünde \"else\" bloğu ne zaman çalışır?", en: 'When does the "else" block of a Python while loop execute?' }, options: [{ id: 'a', text: 'When the loop body throws an exception' }, { id: 'b', text: 'When the condition was never True' }, { id: 'c', text: 'When the loop completes normally (without break)' }, { id: 'd', text: 'Java has the same feature' }], correct: 'c', explanation: { tr: "Python\'a özgü: while...else bloğu döngü break ile sonlanmadıysa (normal bitti) çalışır. Java\'da bu özellik yoktur.", en: 'Python-specific: while...else runs only if the loop finished without hitting break. Java has no equivalent.' } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da for döngüsündeki 'else' bloğunun çalışma mantığı nedir?",
            "en": "What is the execution logic of the 'else' block in a Python for loop?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Döngü her çalıştığında çalışır",
                        "en": "It runs every time the loop executes"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Döngü bir break komutuyla kesilmediği sürece çalışır",
                        "en": "It runs only if the loop is not terminated by a break statement"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Sadece hata oluştuğunda çalışır",
                        "en": "It runs only if an error occurs"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Döngü boşsa çalışır",
                        "en": "It runs if the loop is empty"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python'da döngü (for veya while) eğer break komutuyla kesilmeden tüm öğeleri tüketirse veya koşul yanlışlanırsa else bloğu çalıştırılır.",
            "en": "In Python, the else block executes if the loop (for or while) finishes iterating through all items or the condition becomes false without being interrupted by a break statement."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 16 — For Loops
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'For Loops', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🎢', content: { tr: 'For döngüsü, listedeki her şey için sırayla bir işlem yapar. "Her test için çalıştır" gibi — liste bitince döngü de biter.', en: 'A for loop does something for each item in a sequence. "Run for every test" — the loop ends when the list ends.' } },
      { type: 'text', content: { tr: "Java\'da for-each: \"for (String s : list)\". Python\'da: \"for s in list:\". Çok benzer ama Python\'da index olmaz — index lazımsa enumerate() kullan.", en: 'Java for-each: "for (String s : list)". Python: "for s in list:". Very similar but Python has no index — if you need one, use enumerate().' } },
      { type: 'code', language: 'python', code: `# Python For Loops
tests = ["login", "checkout", "search"]

# Basic for-each
for test in tests:
    print("Running:", test)

# range() — Java equivalent: for(int i=0; i<5; i++)
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8, 2):  # 2, 4, 6 (start, stop, step)
    print(i)

# enumerate() — index + value
for i, test in enumerate(tests):
    print(f"{i}: {test}")   # 0: login, 1: checkout, ...

# zip() — parallel iteration (Java: no direct equivalent)
names = ["Alice", "Bob", "Carol"]
scores = [95, 87, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# List comprehension — compact for loop
squares = [x**2 for x in range(1, 6)]  # [1, 4, 9, 16, 25]
evens = [x for x in range(20) if x % 2 == 0]

# break and continue work same as while` },
      { type: 'editor', lang: 'python', defaultCode: `# For loop QA examples
api_endpoints = ["/users", "/products", "/orders", "/cart"]
expected_status = 200

print("Testing endpoints:")
for i, endpoint in enumerate(api_endpoints, start=1):
    # Simulating a check
    result = "PASS" if endpoint != "/cart" else "FAIL"
    print(f"  {i}. GET {endpoint} → {result}")

# Count failures
results = ["PASS", "FAIL", "PASS", "PASS", "FAIL"]
failures = [r for r in results if r == "FAIL"]
print(f"\nTotal: {len(results)}, Failed: {len(failures)}")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — For Loops' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'For-each', en: 'For-each' }, java: 'for (String s : list)', python: 'for s in list:' },
        { concept: { tr: 'Sayaçlı döngü', en: 'Indexed loop' }, java: 'for(int i=0; i<n; i++)', python: 'for i in range(n):' },
        { concept: { tr: 'Index + değer', en: 'Index + value' }, java: 'IntStream.range(0,n).forEach(i→...)', python: 'for i, v in enumerate(lst):' },
        { concept: { tr: 'Paralel iterasyon', en: 'Parallel iteration' }, java: 'Iterator + two lists manually', python: 'for a, b in zip(lst1, lst2):' },
      ]},
      { type: 'quiz', question: { tr: 'range(2, 10, 3) hangi sayıları üretir?', en: 'What numbers does range(2, 10, 3) produce?' }, options: [{ id: 'a', text: '2, 3, 4, 5, 6, 7, 8, 9' }, { id: 'b', text: '2, 5, 8' }, { id: 'c', text: '2, 4, 6, 8' }, { id: 'd', text: '3, 6, 9' }], correct: 'b', explanation: { tr: 'range(start, stop, step) → 2\'den başla, 10\'dan önce dur, 3 adım at: 2, 5, 8. Java\'daki for(i=2; i<10; i+=3)\'e eşdeğer.', en: "range(start, stop, step) → start at 2, stop before 10, step 3: 2, 5, 8. Equivalent to Java's for(i=2; i<10; i+=3)." } ,
        retryQuestion: {
      "question": {
            "tr": "range(1, 10, 2) fonksiyonu hangi sayı dizisini döndürür?",
            "en": "What sequence of numbers does range(1, 10, 2) return?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "1, 2, 3, 4, 5, 6, 7, 8, 9",
                        "en": "1, 2, 3, 4, 5, 6, 7, 8, 9"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "1, 3, 5, 7, 9",
                        "en": "1, 3, 5, 7, 9"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "1, 4, 7",
                        "en": "1, 4, 7"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "2, 4, 6, 8",
                        "en": "2, 4, 6, 8"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "range(start, stop, step) fonksiyonu 1'den başlar, 10'dan küçük olan değerleri 2'şer artışla sıralar: 1, 3, 5, 7, 9.",
            "en": "The range(start, stop, step) function starts at 1, goes up to but not including 10, incrementing by 2: 1, 3, 5, 7, 9."
      }
}
},
      {
        type: 'python-flow-diagram',
        titleEn: 'For Loop — How Python Iterates Step by Step',
        titleTr: 'For Döngüsü — Python Adım Adım Nasıl İterler',
        steps: [
          { type: 'action', code: 'tests = ["login", "checkout", "search"]', desc: 'Define the list to iterate', descTr: 'İtere edilecek liste tanımlanır' },
          { type: 'loop', code: 'for test in tests:', desc: 'Pick first item: "login"', descTr: 'İlk eleman alınır: "login"' },
          { type: 'action', code: '    print("Running:", test)', desc: 'Execute body with current item', descTr: 'Döngü gövdesi çalışır' },
          { type: 'condition', code: 'More items?', desc: 'Next: "checkout", then "search"', descTr: 'Sıradaki: "checkout", sonra "search"', branch: { true: 'next item ↑ loop', false: 'exit loop →' } },
          { type: 'end', code: 'Loop ends — all 3 items processed', desc: 'Code after the loop continues', descTr: 'Döngü sonrası kod devam eder' },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 17 — Functions
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Functions', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🔧', content: { tr: 'Fonksiyon, bir tarif gibi. "Çay yap" tarifi: su kaynat, demle, koy. Her çay yapmak istediğinde aynı adımları tekrar yazmana gerek yok — tarifi çağırırsın.', en: "A function is like a recipe. \"Make tea\": boil water, steep, pour. You don\'t rewrite the steps every time — you call the recipe." } },
      { type: 'text', content: { tr: "Java\'da metod tanımlarken erişim belirleyici, dönüş tipi yazılır: public String greet(String name). Python\'da sadece \"def\" yeterli: def greet(name):. Tip ipuçları opsiyonel ama önerilen.", en: 'Java methods need access modifier and return type: public String greet(String name). Python just needs "def": def greet(name):. Type hints are optional but recommended.' } },
      { type: 'code', language: 'python', code: `# Python Functions
# Basic function
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))    # Hello, Alice!

# Default parameters
def run_test(url, method="GET", timeout=30):
    return f"{method} {url} (timeout: {timeout}s)"

print(run_test("/api/users"))                # GET /api/users (timeout: 30s)
print(run_test("/api/login", "POST", 60))   # POST /api/login (timeout: 60s)

# Keyword arguments — call in any order
print(run_test(method="DELETE", url="/api/item/5"))

# *args — variable number of arguments
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))    # 15

# **kwargs — variable keyword arguments
def log(**kwargs):
    for k, v in kwargs.items():
        print(f"  {k}={v}")

log(test="login", status="PASS", time=234)

# Type hints (Python 3.5+, recommended!)
def add(a: int, b: int) -> int:
    return a + b` },
      { type: 'editor', lang: 'python', defaultCode: `# Function exercises
def validate_email(email: str) -> bool:
    """Returns True if email looks valid."""
    return "@" in email and "." in email.split("@")[-1]

def calculate_pass_rate(passed: int, total: int) -> float:
    """Returns pass rate as percentage."""
    if total == 0:
        return 0.0
    return round((passed / total) * 100, 2)

# Test the functions
emails = ["user@test.com", "bad-email", "admin@example.co.uk"]
for email in emails:
    print(f"{email}: {validate_email(email)}")

print()
print(f"Pass rate: {calculate_pass_rate(87, 100)}%")
print(f"Pass rate: {calculate_pass_rate(0, 50)}%")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Functions' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Metod tanımla', en: 'Define method' }, java: 'public String greet(String name)', python: 'def greet(name: str) -> str:' },
        { concept: { tr: 'Default parametre', en: 'Default parameter' }, java: 'Overloading only', python: 'def f(x=10):' },
        { concept: { tr: 'Varargs', en: 'Variable args' }, java: 'String... args', python: '*args' },
        { concept: { tr: 'Named args', en: 'Named args (kwargs)' }, java: 'No equivalent', python: '**kwargs or name=value calls' },
        { concept: { tr: 'Çoklu dönüş', en: 'Return multiple' }, java: 'array or wrapper class', python: 'return a, b  (tuple)' },
      ]},
      { type: 'quiz', question: { tr: "Python\'da fonksiyon tanımlamak için hangi keyword kullanılır?", en: 'Which keyword defines a function in Python?' }, options: [{ id: 'a', text: 'function' }, { id: 'b', text: 'def' }, { id: 'c', text: 'func' }, { id: 'd', text: 'method' }], correct: 'b', explanation: { tr: "\"def\" (define\'ın kısası) Python\'da fonksiyon tanımlar. JavaScript\'te \"function\", Java\'da tip ve isim yeterlidir.", en: '"def" (short for define) creates a Python function. JavaScript uses "function", Java just needs type and name.' } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da isimsiz (lambda) fonksiyonları oluşturmak için kullanılan anahtar kelime nedir?",
            "en": "Which keyword is used to create anonymous (lambda) functions in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "anon",
                        "en": "anon"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "lambda",
                        "en": "lambda"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "def",
                        "en": "def"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "inline",
                        "en": "inline"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python'da 'lambda' anahtar kelimesi, 'def' anahtar kelimesiyle tanımlanan standart fonksiyonların aksine, tek satırlık isimsiz fonksiyonlar oluşturmak için kullanılır.",
            "en": "The 'lambda' keyword in Python is used to create small, anonymous functions in a single line, unlike standard functions defined with the 'def' keyword."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 18 — Lambda
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Lambda Functions', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '⚡', content: { tr: 'Lambda, tek satırlık isimsiz bir fonksiyon. "Sadece bir kez kullanacağım, isim koymaya değmez" dediğinde kullanılır. Hesap makinesi gibi: sadece basarsın, sonucu alırsın.', en: 'A lambda is a one-line nameless function. Use it when "I only need this once, not worth naming." Like a quick calculator.' } },
      { type: 'text', content: { tr: "Java\'da lambda: x -> x * 2. Python\'da: lambda x: x * 2. Çok benzer! Python lambda\'sı tek ifade ile sınırlıdır — birden fazla satıra ihtiyaç varsa normal def kullanılır.", en: 'Java lambda: x -> x * 2. Python: lambda x: x * 2. Very similar! Python lambda is limited to one expression — need multiple lines? Use def instead.' } },
      { type: 'code', language: 'python', code: `# Python Lambda Functions
# Basic lambda — anonymous function
square = lambda x: x ** 2
print(square(5))    # 25

double = lambda x: x * 2
add = lambda x, y: x + y

# Real use: sorted() with key
tests = [
    {"name": "login", "duration": 1200},
    {"name": "search", "duration": 340},
    {"name": "checkout", "duration": 890},
]

# Sort by duration (ascending)
tests.sort(key=lambda t: t["duration"])
for t in tests:
    print(t["name"], t["duration"])

# Sort by name (descending)
tests.sort(key=lambda t: t["name"], reverse=True)

# filter() — keep only matching items
durations = [1200, 340, 890, 450, 2100]
slow = list(filter(lambda x: x > 1000, durations))
print("Slow tests:", slow)   # [1200, 2100]

# map() — transform each item
doubled = list(map(lambda x: x * 2, [1, 2, 3]))
print(doubled)               # [2, 4, 6]` },
      { type: 'editor', lang: 'python', defaultCode: `# Lambda sorting exercise
test_results = [
    {"test": "test_login", "status": "FAIL", "time": 1500},
    {"test": "test_api", "status": "PASS", "time": 200},
    {"test": "test_ui", "status": "FAIL", "time": 3200},
    {"test": "test_db", "status": "PASS", "time": 150},
]

# Sort by time (fastest first)
by_time = sorted(test_results, key=lambda r: r["time"])
print("By speed:")
for r in by_time:
    print(f"  {r['test']}: {r['time']}ms")

# Filter only failures
failures = list(filter(lambda r: r["status"] == "FAIL", test_results))
print("\nFailures:", [r["test"] for r in failures])` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Lambda' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Lambda sözdizimi', en: 'Lambda syntax' }, java: 'x -> x * 2', python: 'lambda x: x * 2' },
        { concept: { tr: 'İki parametre', en: 'Two params' }, java: '(x, y) -> x + y', python: 'lambda x, y: x + y' },
        { concept: { tr: 'Sort ile kullan', en: 'Use with sort' }, java: 'list.sort(Comparator.comparing(t -> t.name))', python: 'list.sort(key=lambda t: t["name"])' },
        { concept: { tr: 'Filter ile kullan', en: 'Use with filter' }, java: 'stream().filter(x -> x > 5)', python: 'filter(lambda x: x > 5, list)' },
      ]},
      { type: 'quiz', question: { tr: 'lambda x, y: x + y ifadesi ne işe yarar?', en: 'What does lambda x, y: x + y do?' }, options: [{ id: 'a', text: 'Returns x only' }, { id: 'b', text: 'Creates an anonymous function that returns x + y' }, { id: 'c', text: 'Prints x + y' }, { id: 'd', text: 'Creates a list' }], correct: 'b', explanation: { tr: "Lambda, iki parametre alan ve toplamlarını döndüren isimsiz bir fonksiyon oluşturur. Java\'daki (x, y) -> x + y ile aynı.", en: "Lambda creates an anonymous function with two parameters that returns their sum. Same as Java\'s (x, y) -> x + y." } ,
        retryQuestion: {
      "question": {
            "tr": "lambda a, b: a * b ifadesi neyi temsil eder?",
            "en": "What does lambda a, b: a * b represent?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "İki sayının çarpımını döndüren isimsiz bir fonksiyon"
            },
            {
                  "id": "b",
                  "text": "İki sayıyı çarpan bir sınıf"
            },
            {
                  "id": "c",
                  "text": "İki sayının çarpımını ekrana yazdıran bir metod"
            },
            {
                  "id": "d",
                  "text": "a ve b değişkenlerini içeren bir tuple"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Lambda fonksiyonları tek satırda isimsiz (anonim) fonksiyonlar tanımlamaya yarar. Burada a ve b parametreleri çarpılarak sonuç döndürülmektedir.",
            "en": "Lambda functions are used to define anonymous functions in a single line. Here, it multiplies the parameters a and b and returns the result."
      }
}
},

      // Section interview questions
      { type: 'interview-questions', topic: 'Python Intermediate', questions: [
        { level: 'basic', q: { tr: "Python\'da list ve tuple arasındaki fark nedir?", en: 'What is the difference between a list and a tuple in Python?' }, a: { tr: 'List değiştirilebilir (mutable) — append, remove, değiştirme yapabilirsiniz. Tuple değiştirilemez (immutable) — oluşturduktan sonra element ekleyip çıkaramazsınız. List [] ile, tuple () ile tanımlanır. Tuple daha hızlıdır çünkü Python onu optimize edebilir.', en: 'List is mutable — you can append, remove, and change elements. Tuple is immutable — you cannot change it after creation. List uses [], tuple uses (). Tuples are faster because Python can optimize them.' } },
        { level: 'basic', q: { tr: "Python\'da dictionary\'ye vs listelere erişimin zaman karmaşıklığı nedir?", en: 'What is the time complexity of dict vs list lookup in Python?' }, a: { tr: 'Dict lookup O(1) — anahtarı hash\'ler ve direkt gider. List lookup by index de O(1)\'dir. Ama "x in list" O(n)\'dir — her eleman kontrol edilir. "x in dict" ise O(1). Bu yüzden QA\'da büyük veri setlerinde dict tercih edilir.', en: "Dict lookup is O(1) — it hashes the key and jumps directly. List by index is also O(1). But \"x in list\" is O(n) — checks every element. \"x in dict\" is O(1). That\'s why dict is preferred for large datasets in QA." } },
        { level: 'intermediate', q: { tr: "Python\'da *args ve **kwargs ne işe yarar?", en: 'What are *args and **kwargs in Python?' }, a: { tr: '*args, belirsiz sayıda pozisyonel argüman alır — tuple olarak gelir. **kwargs, belirsiz sayıda keyword argüman alır — dict olarak gelir. def log(*args, **kwargs) hem log("msg1", "msg2") hem de log(level="INFO", test="login") çağrılarını kabul eder.', en: '*args accepts a variable number of positional arguments — arrives as a tuple. **kwargs accepts variable keyword arguments — arrives as a dict. def log(*args, **kwargs) can accept both log("msg1", "msg2") and log(level="INFO", test="login").' } },
        { level: 'advanced', q: { tr: 'List comprehension ne zaman kullanılmalı, for döngüsü ne zaman?', en: 'When should you use list comprehension vs a for loop?' }, a: { tr: 'List comprehension tek bir dönüşüm veya filtreleme işlemi için kullanılır — [x*2 for x in lst if x>0]. Okunabilir ve genellikle daha hızlıdır. For döngüsü ise birden fazla işlem, yan etkiler (print, IO, state değişikliği) veya iç içe karmaşık mantık için kullanılır. Kural: if comprehension anlaşılmaz görünüyorsa, for döngüsü yaz.', en: 'List comprehension is for single transformations or filters — [x*2 for x in lst if x>0]. Readable and usually faster. For loops are for multiple operations, side effects (print, IO, state changes), or complex nested logic. Rule: if the comprehension looks hard to read, use a for loop.' } },
      ]},
    ],
  },

  // ── 4. ADVANCED ─────────────────────────────────────────────────────────────
  {
    title: '🔴 Level 3: Advanced Python',
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 19 — Classes / Objects
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Classes / Objects', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🏗️', content: { tr: "Class, bir nesne şablonu gibi. Araba şablonunda renk, hız, model var — her araba bu şablondan yaratılır ama hepsinin rengi farklı olabilir. Class = şablon, nesne (object) = şablondan üretilen şey.", en: "A class is a blueprint. The car blueprint has color, speed, model — every car is made from it but each can have a different color. Class = blueprint, object = thing made from it." } },
      { type: 'text', content: { tr: "Java'da constructor açıkça yazılır: public Car(String color) {...}. Python'da __init__ metodu constructor görevi görür. Python'daki 'self', Java'daki 'this' gibidir — ama Python'da her metoda açıkça yazılmalıdır.", en: "Java constructors are explicit: public Car(String color) {}. Python uses __init__ as the constructor. Python's 'self' is like Java's 'this' — but must be written explicitly in every method." } },
      { type: 'code', language: 'python', code: `# Python Classes — QA Engineer Example
class TestResult:
    # Class attribute — shared by all instances
    company = "QA Corp"

    def __init__(self, test_name, status):  # __init__ = constructor
        self.test_name = test_name          # instance attribute
        self.status = status                # instance attribute
        self.duration = 0.0                 # default value

    def set_duration(self, ms):             # instance method
        self.duration = ms

    def summary(self):                      # method using self
        return f"[{self.status}] {self.test_name} ({self.duration}ms)"

    def __str__(self):                      # like Java toString()
        return self.summary()

# Create instances
r1 = TestResult("login_test", "PASS")      # calls __init__
r1.set_duration(342)

r2 = TestResult("checkout_test", "FAIL")
r2.set_duration(1205)

print(r1)                                   # [PASS] login_test (342ms)
print(r2)                                   # [FAIL] checkout_test (1205ms)
print(TestResult.company)                   # QA Corp` },
      { type: 'editor', lang: 'python', defaultCode: `# Create a BankAccount class
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited {amount}. Balance: {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds!")
        else:
            self.balance -= amount
            print(f"Withdrew {amount}. Balance: {self.balance}")

acc = BankAccount("Alice", 1000)
acc.deposit(500)
acc.withdraw(200)
acc.withdraw(2000)` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Classes' }, columns: ['Java', 'Python'], rows: [
        { concept: 'Constructor', java: 'public MyClass(int x) { this.x = x; }', python: 'def __init__(self, x): self.x = x' },
        { concept: 'Instance method', java: 'public void doIt() { ... }', python: 'def do_it(self): ...' },
        { concept: 'toString', java: '@Override public String toString()', python: 'def __str__(self):' },
        { concept: 'Access modifier', java: 'private int x; (enforced)', python: '_x or __x (convention only)' },
      ]},
      { type: 'quiz', question: { tr: "Python'da __init__ metodunun ilk parametresi nedir?", en: 'What is the first parameter of a Python __init__ method?' }, options: [{ id: 'a', text: 'this' }, { id: 'b', text: 'self' }, { id: 'c', text: 'cls' }, { id: 'd', text: 'me' }], correct: 'b', explanation: { tr: "'self' bu sınıfın o anki instance'ını temsil eder — Java'daki 'this' gibi. Python'da her instance metoduna açıkça yazılır.", en: "'self' represents the current instance of the class — like Java's 'this'. It must be written explicitly in every instance method in Python." } ,
        retryQuestion: {
      "question": {
            "tr": "Python sınıf metodlarında (instance methods) nesnenin kendisini ifade eden standart parametre adı nedir?",
            "en": "What is the standard parameter name for the object itself in Python instance methods?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "instance"
            },
            {
                  "id": "b",
                  "text": "self"
            },
            {
                  "id": "c",
                  "text": "this"
            },
            {
                  "id": "d",
                  "text": "current"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python'da instance metodlarının ilk parametresi, nesnenin kendisine referans verir ve geleneksel olarak 'self' adıyla tanımlanır.",
            "en": "In Python, the first parameter of instance methods refers to the object itself and is conventionally named 'self'."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 20 — Inheritance
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Inheritance', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🧬', content: { tr: "Kalıtım, miras gibi. Ebeveynin özellikleri çocuğa geçer. Araba şablonundan 'Elektrikli Araba' şablonu türetilirse, arabanın tüm özellikleri artık elektrikli arabada da var — üstüne pil kapasitesi ekleniyor.", en: "Inheritance is like a family trait. A child class gets all properties of the parent. ElectricCar inherits from Car — gets all car features plus adds battery capacity." } },
      { type: 'text', content: { tr: "Java'da 'extends' keyword'ü kullanılır: class Dog extends Animal. Python'da parantez içinde yazılır: class Dog(Animal). Her iki dilde de 'super()' ile parent constructor çağrılır.", en: "Java uses 'extends': class Dog extends Animal. Python puts the parent in parentheses: class Dog(Animal). Both languages use super() to call the parent constructor." } },
      { type: 'code', language: 'python', code: `# Python Inheritance — Test Framework Example
class BaseTest:
    """Parent class with shared test behavior."""
    def __init__(self, browser="chrome"):
        self.browser = browser              # inherited by all subclasses
        self.results = []

    def log(self, msg):                     # shared method — all tests can use this
        print(f"[{self.browser.upper()}] {msg}")
        self.results.append(msg)

    def teardown(self):
        self.log("Test complete.")

class LoginTest(BaseTest):                  # inherits from BaseTest
    def __init__(self, browser, base_url):
        super().__init__(browser)           # call parent __init__ — like super() in Java
        self.base_url = base_url

    def run(self):
        self.log(f"Navigating to {self.base_url}/login")
        self.log("Filling credentials...")
        self.log("Asserting redirect to dashboard")
        self.teardown()                     # inherited method

class ApiTest(BaseTest):                    # different child, same parent
    def run(self, endpoint):
        self.log(f"GET {endpoint}")
        self.log("Asserting 200 OK")
        self.teardown()

t1 = LoginTest("firefox", "https://shop.example.com")
t1.run()
t2 = ApiTest("chrome")
t2.run("/api/users")` },
      { type: 'editor', lang: 'python', defaultCode: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def speak(self):                        # override parent method
        return f"{self.name} says: Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says: Meow!"

animals = [Dog("Rex"), Cat("Whiskers"), Animal("Unknown")]
for a in animals:
    print(a.speak())` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Inheritance' }, columns: ['Java', 'Python'], rows: [
        { concept: 'Extend class', java: 'class Dog extends Animal {}', python: 'class Dog(Animal): ...' },
        { concept: 'Call parent', java: 'super(name);', python: 'super().__init__(name)' },
        { concept: 'Override', java: '@Override void speak()', python: 'def speak(self): (no annotation)' },
        { concept: 'Multiple inheritance', java: 'Not supported (use interface)', python: 'class C(A, B): # supported!' },
      ]},
      { type: 'quiz', question: { tr: "Python'da parent class constructor'ını çağırmak için ne kullanılır?", en: 'How do you call the parent class constructor in Python?' }, options: [{ id: 'a', text: 'parent().__init__()' }, { id: 'b', text: 'super().__init__()' }, { id: 'c', text: 'this.__init__()' }, { id: 'd', text: 'base.__init__()' }], correct: 'b', explanation: { tr: "super().__init__() parent class'ın constructor'ını çağırır. Java'daki super() gibi — ama Python'da açıkça super().__init__() yazılır.", en: "super().__init__() calls the parent class constructor. Like Java's super() — but in Python you must explicitly call super().__init__()." } ,
        retryQuestion: {
      "question": {
            "tr": "Bir alt sınıf (child class) içinde üst sınıfın (parent class) constructor metodunu tetiklemek için hangi yapı kullanılır?",
            "en": "Which structure is used to trigger the parent class constructor within a child class?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "parent.init()"
            },
            {
                  "id": "b",
                  "text": "super().__init__()"
            },
            {
                  "id": "c",
                  "text": "base.constructor()"
            },
            {
                  "id": "d",
                  "text": "self.parent()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "super() fonksiyonu, üst sınıfın metodlarına erişmemizi sağlar. Constructor'ı çağırmak için __init__ metodunu super() üzerinden çağırmamız gerekir.",
            "en": "The super() function allows access to parent class methods. To call the constructor, we must invoke the __init__ method via super()."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 21 — Scope
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Scope', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🔭', content: { tr: "Scope, değişkenin görünebildiği alan. Odanın içinde tanımladığın bir şey odanın dışından görünmez — tıpkı bir fonksiyon içindeki değişkenin dışarıdan erişilememesi gibi.", en: "Scope is the area where a variable can be seen. Something defined inside a room can't be seen from outside — just like a variable inside a function can't be accessed from outside." } },
      { type: 'text', content: { tr: "Python LEGB kuralını kullanır: Local → Enclosing → Global → Built-in. Java'da benzer kural: yerel değişken → metod → sınıf → paket. 'global' keyword'ü ile Python'da global değişkene yazılabilir — ama bu pratikte kaçınılması gereken bir pattern.", en: "Python uses the LEGB rule: Local → Enclosing → Global → Built-in. Java has a similar rule. The 'global' keyword allows writing to a global variable — but this pattern is generally avoided in practice." } },
      { type: 'code', language: 'python', code: `# Python Scope — LEGB Rule
x = "global"                    # Global scope — visible everywhere

def outer():
    x = "enclosing"             # Enclosing scope

    def inner():
        x = "local"             # Local scope — shadows outer x
        print(f"inner: {x}")    # local

    inner()
    print(f"outer: {x}")        # enclosing

outer()
print(f"global: {x}")           # global

# global keyword — modify global from inside function
counter = 0

def increment():
    global counter              # declare we want to write to global
    counter += 1

increment()
increment()
print(f"Counter: {counter}")    # 2

# nonlocal — modify enclosing scope variable
def make_counter():
    count = 0
    def tick():
        nonlocal count          # modify enclosing count
        count += 1
        return count
    return tick

c = make_counter()
print(c(), c(), c())            # 1 2 3` },
      { type: 'editor', lang: 'python', defaultCode: `# Test scope understanding
total = 0

def add(n):
    global total
    total += n

add(5)
add(3)
add(2)
print(f"Total: {total}")        # Should print 10` },
      { type: 'quiz', question: { tr: "Python'da LEGB kuralında 'E' neyi temsil eder?", en: "In Python's LEGB rule, what does 'E' stand for?" }, options: [{ id: 'a', text: 'External' }, { id: 'b', text: 'Enclosing' }, { id: 'c', text: 'Exported' }, { id: 'd', text: 'Extended' }], correct: 'b', explanation: { tr: "LEGB = Local, Enclosing, Global, Built-in. Python değişkeni bu sırayla arar. Enclosing, iç içe fonksiyonlarda dıştaki fonksiyonun kapsamını ifade eder.", en: "LEGB = Local, Enclosing, Global, Built-in. Python searches for variables in this order. Enclosing refers to the scope of outer functions in nested function definitions." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'daki LEGB kuralına göre, bir değişken tanımlı olduğu yerel kapsama (local) sahip değilse, Python değişkeni bir sonraki aşamada nerede arar?",
            "en": "According to the LEGB rule in Python, if a variable is not found in the local scope, where does Python search for it next?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Global kapsam",
                        "en": "Global scope"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Enclosing kapsam",
                        "en": "Enclosing scope"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Built-in kapsam",
                        "en": "Built-in scope"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "External kapsam",
                        "en": "External scope"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Python, değişkenleri LEGB sırasıyla arar: Local (Yerel), Enclosing (Kapsayan), Global ve Built-in. Yerel kapsamda bulunamayan bir değişken önce bir dış fonksiyonun kapsamında (Enclosing) aranır.",
            "en": "Python searches for variables in the LEGB order: Local, Enclosing, Global, and Built-in. If a variable is not found in the local scope, it is next searched for in the Enclosing (outer function) scope."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 22 — Modules
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Modules', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '📦', content: { tr: "Module, araç kutusu gibi. Matematiksel işlemler için 'math' kutusunu aç, tarih işlemleri için 'datetime' kutusunu. Her kutuda hazır araçlar var — sıfırdan yazman gerekmiyor.", en: "A module is like a toolbox. Open the 'math' toolbox for math operations, 'datetime' for date work. Each box has ready-made tools — you don't need to build them from scratch." } },
      { type: 'text', content: { tr: "Java'da import java.util.List gibi paket import edilir. Python'da import math veya from math import sqrt. Python'da kendi modülünü yazmak da çok kolay — .py dosyası oluştur, import et.", en: "Java imports packages like import java.util.List. Python uses import math or from math import sqrt. Writing your own module in Python is simple — just create a .py file and import it." } },
      { type: 'code', language: 'python', code: `import os                       # operating system interface
import sys                      # system-specific parameters
import json                     # JSON encode/decode
from datetime import datetime   # import specific class from module
from math import sqrt, pi       # import multiple names

# os module — file system operations
print(os.getcwd())              # current working directory
print(os.path.exists("/tmp"))   # True/False — check if path exists

# sys module — interpreter info
print(sys.version)              # Python version string
print(sys.platform)             # 'linux', 'win32', 'darwin'

# math module
print(sqrt(144))                # 12.0
print(round(pi, 4))             # 3.1416

# datetime module
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))  # 2024-01-15 14:30

# Custom module (if you had a file qa_helpers.py):
# import qa_helpers
# qa_helpers.take_screenshot(driver)
print("Modules loaded successfully")` },
      { type: 'editor', lang: 'python', defaultCode: `import random
import string

# Generate a random test user
def generate_user():
    suffix = ''.join(random.choices(string.digits, k=4))
    email = f"testuser{suffix}@qa.example.com"
    return {"email": email, "id": int(suffix)}

for i in range(3):
    user = generate_user()
    print(user)` },
      { type: 'quiz', question: { tr: "Python'da math modülünden sadece sqrt fonksiyonunu import etmek için hangi syntax kullanılır?", en: 'Which syntax imports only sqrt from the math module?' }, options: [{ id: 'a', text: 'import math.sqrt' }, { id: 'b', text: 'from math import sqrt' }, { id: 'c', text: 'include math: sqrt' }, { id: 'd', text: 'using math import sqrt' }], correct: 'b', explanation: { tr: "'from math import sqrt' sadece sqrt'yi import eder. Java'daki static import gibi: import static java.lang.Math.sqrt; Python'da bu şekilde kullanılır.", en: "'from math import sqrt' imports only sqrt. Like Java's static import: import static java.lang.Math.sqrt; This is the Python equivalent." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da 'random' modülü içerisinden 'randint' fonksiyonunu doğrudan çağırmak için doğru import ifadesi hangisidir?",
            "en": "Which import statement allows you to call the 'randint' function directly from the 'random' module?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "import random.randint",
                        "en": "import random.randint"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "from random import randint",
                        "en": "from random import randint"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "get random.randint",
                        "en": "get random.randint"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "include random: randint",
                        "en": "include random: randint"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "'from module_name import function_name' yapısı, belirtilen fonksiyonu mevcut isim uzayına doğrudan aktarır, böylece modül adını belirtmeden çağırabiliriz.",
            "en": "The 'from module_name import function_name' structure imports the specified function directly into the current namespace, allowing you to call it without prefixing the module name."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 23 — Try...Except (Error Handling)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Try...Except', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🛡️', content: { tr: "Try-except, kalkan gibi. 'Dene, çalışmazsa şu planı uygula.' Bisiklet sürerken düşebilirsin — ama kaskın varsa ciddi bir şey olmaz. Kod patlarsa except bloğu devreye girer.", en: "Try-except is like a safety helmet. 'Try this, if it breaks do this instead.' You might fall off a bike — but with a helmet, nothing serious happens. If code crashes, except catches it." } },
      { type: 'text', content: { tr: "Java'da try-catch-finally kullanılır. Python'da da aynı yapı var: try-except-finally. Java'da Exception sınıfından türetme — Python'da da aynı. Fark: Python'da as keyword'ü ile exception nesnesine erişilir.", en: "Java uses try-catch-finally. Python has the same structure: try-except-finally. Both inherit from a base Exception class. Difference: Python uses the 'as' keyword to access the exception object." } },
      { type: 'code', language: 'python', code: `# Python Error Handling — QA Patterns
def safe_divide(a, b):
    try:
        result = a / b              # might raise ZeroDivisionError
        return result
    except ZeroDivisionError:       # specific exception — like catch(ArithmeticException e)
        print("Cannot divide by zero!")
        return None
    except TypeError as e:          # 'as e' gives access to error object
        print(f"Wrong type: {e}")
        return None
    else:                           # runs only if NO exception (no Java equivalent)
        print("Division OK")        # Note: this is after return, so only runs if not returned
    finally:
        print("Division attempted") # ALWAYS runs — like Java finally

# Multiple exception types
def read_config(path):
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        print(f"Config not found: {path}")
    except PermissionError:
        print("No read permission")
    except (IOError, OSError) as e:  # catch multiple types at once
        print(f"IO error: {e}")
    return None

# Custom exception
class TestFailedError(Exception):
    def __init__(self, test_name, expected, actual):
        super().__init__(f"Test '{test_name}' failed: expected={expected}, actual={actual}")
        self.test_name = test_name

try:
    raise TestFailedError("login_test", "dashboard", "error_page")
except TestFailedError as e:
    print(f"Caught: {e}")

print(safe_divide(10, 2))` },
      { type: 'editor', lang: 'python', defaultCode: `# Practice: handle multiple errors gracefully
def get_user_age(data, key):
    try:
        age = data[key]
        return int(age)
    except KeyError:
        print(f"Key '{key}' not found in data")
    except ValueError:
        print(f"Cannot convert '{data.get(key)}' to integer")
    return -1

print(get_user_age({"age": "25"}, "age"))         # 25
print(get_user_age({"age": "abc"}, "age"))        # ValueError
print(get_user_age({"name": "Ali"}, "age"))       # KeyError` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Error Handling' }, columns: ['Java', 'Python'], rows: [
        { concept: 'Try block', java: 'try { ... }', python: 'try: ...' },
        { concept: 'Catch', java: 'catch (IOException e) { }', python: 'except IOError as e:' },
        { concept: 'Finally', java: 'finally { }', python: 'finally:' },
        { concept: 'Multiple catches', java: 'catch (A | B e)', python: 'except (A, B) as e:' },
        { concept: 'Else (no exception)', java: 'not available', python: 'else: (runs if no exception)' },
      ]},
      { type: 'quiz', question: { tr: "Python'da exception olmadığında çalışan blok hangisidir?", en: 'Which block in Python runs only when no exception occurs?' }, options: [{ id: 'a', text: 'finally' }, { id: 'b', text: 'else' }, { id: 'c', text: 'clean' }, { id: 'd', text: 'ok' }], correct: 'b', explanation: { tr: "'else' bloğu try bloğu exception fırlatmadan tamamlandığında çalışır. Java'da bu bloğun karşılığı yok — Python'a özgü.", en: "The 'else' block runs only when the try block completes without raising an exception. Java has no equivalent — this is unique to Python." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'daki 'try-except-else-finally' yapısında, hata oluşsa da oluşmasa da kodun her zaman çalışmasını istediğimiz blok hangisidir?",
            "en": "In the 'try-except-else-finally' structure in Python, which block is guaranteed to run regardless of whether an exception occurs?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "finally",
                        "en": "finally"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "else",
                        "en": "else"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "catch",
                        "en": "catch"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "except",
                        "en": "except"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "'finally' bloğu, try-except süreci nasıl sonuçlanırsa sonuçlansın (hata olsa da olmasa da) kaynakları serbest bırakmak veya temizlik yapmak için her zaman çalıştırılır.",
            "en": "The 'finally' block is always executed regardless of how the try-except block finishes, making it ideal for cleanup operations or closing resources."
      }
}
},
      {
        type: 'python-flow-diagram',
        titleEn: 'Try / Except / Else / Finally — Full Error Handling Flow',
        titleTr: 'Try / Except / Else / Finally — Hata Yönetimi Akışı',
        steps: [
          { type: 'action', code: 'try:\n    response = requests.get(url)', desc: 'Attempt the risky operation', descTr: 'Riskli işlem denenir' },
          { type: 'condition', code: 'Exception raised?', desc: 'Did the code inside try fail?', descTr: 'try bloğu hata verdi mi?', branch: { true: 'except block', false: 'else block' } },
          { type: 'error', code: 'except RequestException as e:\n    log(e)', desc: 'Handle the specific error', descTr: 'Belirli hatayı yakala ve işle' },
          { type: 'action', code: 'else:\n    assert response.status_code == 200', desc: 'Runs ONLY when no exception', descTr: 'SADECE hata yoksa çalışır' },
          { type: 'end', code: 'finally:\n    session.close()', desc: 'ALWAYS runs — cleanup resources', descTr: 'HER ZAMAN çalışır — kaynak temizliği' },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 24 — JSON
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'JSON', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🔄', content: { tr: "JSON, evrensel dil gibi. Farklı dillerdeki programlar birbirleriyle konuşmak için JSON kullanır. Türkçe-İngilizce tercüman gibi — Python dict'ini JSON'a çevir, karşı taraf anlasın.", en: "JSON is like a universal language. Programs in different languages use JSON to talk to each other. Like a translator — convert Python dict to JSON, and any other language can understand it." } },
      { type: 'text', content: { tr: "Java'da Jackson veya Gson kütüphanesi kullanılır. Python'da standart kütüphane 'json' modülü yeterli — import etmek yeterli. json.dumps() Python'u JSON string'e, json.loads() JSON string'i Python'a çevirir.", en: "Java requires Jackson or Gson library. Python's built-in 'json' module is sufficient — just import it. json.dumps() converts Python to JSON string, json.loads() converts JSON string back to Python." } },
      { type: 'code', language: 'python', code: `import json

# Python dict → JSON string (dumps = dump string)
test_result = {
    "test_name": "login_test",
    "status": "PASS",
    "duration_ms": 342,
    "tags": ["regression", "smoke"],
    "metadata": None           # None → null in JSON
}

json_str = json.dumps(test_result, indent=2)   # indent=2 for pretty print
print(json_str)

# JSON string → Python dict (loads = load string)
api_response = '''
{
  "users": [
    {"id": 1, "email": "alice@example.com", "active": true},
    {"id": 2, "email": "bob@example.com", "active": false}
  ],
  "total": 2
}
'''

data = json.loads(api_response)
print(type(data))              # <class 'dict'>
print(data["total"])           # 2
print(data["users"][0]["email"])  # alice@example.com

# Filter active users — common QA pattern
active = [u for u in data["users"] if u["active"]]
print(f"Active users: {len(active)}")` },
      { type: 'editor', lang: 'python', defaultCode: `import json

# Parse this API response and check all tests passed
response = """
{
  "suite": "Regression Suite",
  "results": [
    {"name": "login", "status": "PASS", "ms": 342},
    {"name": "checkout", "status": "PASS", "ms": 891},
    {"name": "profile", "status": "FAIL", "ms": 1205}
  ]
}
"""

data = json.loads(response)
failed = [r for r in data["results"] if r["status"] != "PASS"]
print(f"Suite: {data['suite']}")
print(f"Total: {len(data['results'])}, Failed: {len(failed)}")
if failed:
    for f in failed:
        print(f"  FAIL: {f['name']} ({f['ms']}ms)")` },
      { type: 'quiz', question: { tr: "Python'da dict'i JSON string'e dönüştüren fonksiyon hangisidir?", en: 'Which function converts a Python dict to a JSON string?' }, options: [{ id: 'a', text: 'json.stringify()' }, { id: 'b', text: 'json.encode()' }, { id: 'c', text: 'json.dumps()' }, { id: 'd', text: 'json.serialize()' }], correct: 'c', explanation: { tr: "json.dumps() (dump string) Python nesnesini JSON string'e çevirir. json.loads() (load string) tersini yapar. JavaScript'teki JSON.stringify() ve JSON.parse() gibi.", en: "json.dumps() (dump string) converts Python objects to JSON string. json.loads() (load string) does the reverse. Like JavaScript's JSON.stringify() and JSON.parse()." } ,
        retryQuestion: {
      "question": {
            "tr": "Bir JSON string'ini Python sözlüğüne (dict) dönüştüren fonksiyon hangisidir?",
            "en": "Which function converts a JSON string to a Python dictionary?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "json.loads()"
            },
            {
                  "id": "b",
                  "text": "json.load()"
            },
            {
                  "id": "c",
                  "text": "json.parse()"
            },
            {
                  "id": "d",
                  "text": "json.decode()"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "json.loads() (load string) bir JSON verisini Python nesnesine dönüştürür. json.dump() veya json.dumps() ise tersi yönde, Python nesnesini JSON verisine dönüştürür.",
            "en": "json.loads() (load string) converts JSON data into a Python object. Conversely, json.dump() or json.dumps() convert Python objects into JSON data."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 25 — RegEx
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'RegEx', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🔍', content: { tr: "Regex, metin arama için çok güçlü bir filtre. 'E-posta bul' gibi değil — '@' işareti olan, noktayla biten, belirli uzunlukta olan metinleri bul. QA'de form validation testlerinde çok kullanılır.", en: "Regex is a powerful text filter. Not just 'find email' — find text that has '@', ends with a dot, has a specific length. Very useful in QA for form validation testing." } },
      { type: 'code', language: 'python', code: `import re   # regular expressions module

# Basic patterns:
# \d = digit, \w = word char, \s = whitespace
# .  = any char, * = 0+, + = 1+, ? = 0 or 1
# ^  = start of string, $ = end

# --- Email validation (common QA use case) ---
email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

emails = ["alice@example.com", "not-an-email", "user@.com", "test@qa.org"]
for email in emails:
    is_valid = bool(re.match(email_pattern, email))
    print(f"{email}: {'VALID' if is_valid else 'INVALID'}")

# --- Extract data from text ---
log = "2024-01-15 14:32:01 ERROR test_login.py:42 Timeout after 30s"
date = re.search(r'\d{4}-\d{2}-\d{2}', log)    # find date
level = re.search(r'(ERROR|WARN|INFO)', log)      # find log level

print(f"Date: {date.group()}")                    # 2024-01-15
print(f"Level: {level.group()}")                  # ERROR

# --- Find all matches ---
text = "Test IDs: TC-001, TC-042, TC-099 passed"
ids = re.findall(r'TC-\d{3}', text)
print(f"Found: {ids}")                            # ['TC-001', 'TC-042', 'TC-099']

# --- Replace ---
masked = re.sub(r'\b\d{4}\b', '****', "Card: 1234 expires 2025")
print(masked)                                     # Card: **** expires ****` },
      { type: 'editor', lang: 'python', defaultCode: `import re

# Validate phone numbers: format must be +90-555-123-4567 or 05551234567
phone_pattern = r'^(\+90-\d{3}-\d{3}-\d{4}|0\d{10})$'

phones = ["+90-555-123-4567", "05551234567", "5551234", "+1-555-123-4567"]
for phone in phones:
    valid = bool(re.match(phone_pattern, phone))
    print(f"{phone}: {'VALID' if valid else 'INVALID'}")` },
      { type: 'quiz', question: { tr: "re.findall() ve re.search() arasındaki fark nedir?", en: 'What is the difference between re.findall() and re.search()?' }, options: [{ id: 'a', text: { tr: 'Hiçbir fark yok', en: 'No difference' } }, { id: 'b', text: { tr: 'findall tüm eşleşmeleri listeler, search ilkini bulur', en: 'findall returns all matches as list, search returns first match object' } }, { id: 'c', text: { tr: 'search sadece başlangıçta arar', en: 'search only checks at the start' } }, { id: 'd', text: { tr: 'findall büyük/küçük harf duyarsız', en: 'findall is case-insensitive' } }], correct: 'b', explanation: { tr: "re.findall() tüm eşleşmeleri string listesi olarak döner. re.search() ilk eşleşmeyi Match nesnesi olarak döner — veya None. .group() ile eşleşen metni alırsın.", en: "re.findall() returns all matches as a list of strings. re.search() returns the first match as a Match object — or None. Use .group() to get the matched text." } ,
        retryQuestion: {
      "question": {
            "tr": "re.match() ve re.search() metodları arasındaki temel fark nedir?",
            "en": "What is the main difference between re.match() and re.search() methods?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Hiçbir fark yoktur",
                        "en": "There is no difference"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "re.match() sadece string'in başındaki eşleşmeleri kontrol eder",
                        "en": "re.match() only checks for a match at the beginning of the string"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "re.match() tüm eşleşmeleri döndürür",
                        "en": "re.match() returns all matches"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "re.search() sadece ilk karakteri kontrol eder",
                        "en": "re.search() only checks the first character"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "re.match() yalnızca string'in başlangıcında bir eşleşme arar. re.search() ise tüm string içerisinde herhangi bir yerdeki ilk eşleşmeyi tarar.",
            "en": "re.match() only checks for a match at the beginning of the string. re.search() scans through the entire string to find the first occurrence of the pattern."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 26 — Comprehensions
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Comprehensions', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '⚡', content: { tr: "Comprehension, listeni tek satırda oluşturmanın kısa yolu. 'Sepetteki tüm meyvelerden sadece kırmızı olanları al' — bunu Python'da tek satırda yazabilirsin. Uzun for döngüsü yazmaya gerek yok.", en: "Comprehension is a shortcut to build lists in one line. 'From all fruits in basket, take only the red ones' — Python lets you write this in one line. No need for a long for loop." } },
      { type: 'code', language: 'python', code: `# List Comprehension — [expression for item in iterable if condition]
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Without comprehension (Java-style):
evens_java = []
for n in numbers:
    if n % 2 == 0:
        evens_java.append(n)

# With list comprehension:
evens = [n for n in numbers if n % 2 == 0]
squares = [n**2 for n in range(1, 6)]
print(evens)    # [2, 4, 6, 8, 10]
print(squares)  # [1, 4, 9, 16, 25]

# QA Use Case: filter test results
results = [
    {"name": "login", "status": "PASS", "ms": 342},
    {"name": "checkout", "status": "FAIL", "ms": 891},
    {"name": "profile", "status": "PASS", "ms": 215},
    {"name": "payment", "status": "FAIL", "ms": 3201},
]

failed_tests = [r["name"] for r in results if r["status"] == "FAIL"]
slow_tests = [r["name"] for r in results if r["ms"] > 500]
print(f"Failed: {failed_tests}")   # ['checkout', 'payment']
print(f"Slow: {slow_tests}")       # ['checkout', 'payment']

# Dict comprehension
durations = {r["name"]: r["ms"] for r in results}
print(durations)   # {'login': 342, 'checkout': 891, ...}

# Set comprehension (unique statuses)
statuses = {r["status"] for r in results}
print(statuses)    # {'PASS', 'FAIL'}` },
      { type: 'editor', lang: 'python', defaultCode: `# Use comprehensions to process this test data
tests = [
    {"id": "TC-001", "duration": 120, "passed": True},
    {"id": "TC-002", "duration": 2500, "passed": False},
    {"id": "TC-003", "duration": 89, "passed": True},
    {"id": "TC-004", "duration": 1800, "passed": False},
    {"id": "TC-005", "duration": 342, "passed": True},
]

# 1. Get IDs of failed tests
failed = [t["id"] for t in tests if not t["passed"]]

# 2. Get avg duration of passed tests
passed = [t["duration"] for t in tests if t["passed"]]
avg = sum(passed) / len(passed) if passed else 0

print(f"Failed: {failed}")
print(f"Avg duration of passed tests: {avg:.0f}ms")` },
      { type: 'quiz', question: { tr: "[x*2 for x in range(5) if x % 2 == 0] ne üretir?", en: 'What does [x*2 for x in range(5) if x % 2 == 0] produce?' }, options: [{ id: 'a', text: '[0, 2, 4, 6, 8]' }, { id: 'b', text: '[0, 4, 8]' }, { id: 'c', text: '[0, 2, 4]' }, { id: 'd', text: '[2, 4, 6, 8, 10]' }], correct: 'b', explanation: { tr: "range(5) = 0,1,2,3,4. x%2==0 filtrelemesi: 0,2,4 kalır. x*2 işlemi: 0,4,8. Sonuç: [0, 4, 8].", en: "range(5) = 0,1,2,3,4. Filter x%2==0 keeps 0,2,4. Then x*2 gives 0,4,8. Result: [0, 4, 8]." } ,
        retryQuestion: {
      "question": {
            "tr": "[x+1 for x in range(4) if x > 1] ifadesinin sonucu nedir?",
            "en": "What is the result of [x+1 for x in range(4) if x > 1]?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "[2, 3, 4]"
            },
            {
                  "id": "b",
                  "text": "[1, 2, 3]"
            },
            {
                  "id": "c",
                  "text": "[3, 4]"
            },
            {
                  "id": "d",
                  "text": "[2, 3]"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "range(4) değerleri 0, 1, 2, 3'tür. x > 1 koşulu sağlandığında sadece 2 ve 3 değerleri kalır. x+1 işlemi uygulandığında sonuç [3, 4] olur.",
            "en": "range(4) produces 0, 1, 2, 3. The condition x > 1 filters these to only 2 and 3. Applying x+1 to these results in [3, 4]."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 27 — Iterators
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Iterators', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🎡', content: { tr: "Iterator, sıra bekleyen bir kuyruk gibi. Her defasında bir sonraki kişiyi verir. Dondurma kuyruğu — her çağırdığında sıradaki kişi gelir, kuyruğun hepsi hafızada değil.", en: "An iterator is like a queue. Each time you ask, it gives you the next one. An ice cream queue — each call gives the next person, not everyone in memory at once." } },
      { type: 'code', language: 'python', code: `# Python Iterators and Generators
# Iterator protocol: __iter__() and __next__()

# Simple counter iterator
class TestCounter:
    def __init__(self, max_count):
        self.max = max_count
        self.current = 0

    def __iter__(self):             # returns the iterator object itself
        return self

    def __next__(self):             # returns next value
        if self.current >= self.max:
            raise StopIteration    # signals end — like Java's hasNext() returning False
        self.current += 1
        return f"TC-{self.current:03d}"

# Use in for loop — Python calls __next__ automatically
for tc in TestCounter(5):
    print(tc)                      # TC-001, TC-002, ..., TC-005

# Built-in iterators
lst = [10, 20, 30]
it = iter(lst)                     # get iterator from list
print(next(it))                    # 10
print(next(it))                    # 20
print(next(it))                    # 30

# Generator function — simpler way to create iterators
def test_ids(prefix, count):
    for i in range(1, count + 1):
        yield f"{prefix}-{i:03d}"  # yield pauses and returns value

for id in test_ids("SMOKE", 3):
    print(id)                      # SMOKE-001, SMOKE-002, SMOKE-003` },
      { type: 'editor', lang: 'python', defaultCode: `# Generator that yields test data lazily
def generate_test_users(count):
    for i in range(1, count + 1):
        yield {
            "id": i,
            "email": f"user{i:03d}@test.com",
            "role": "admin" if i == 1 else "user"
        }

# Only processes one user at a time — memory efficient!
for user in generate_test_users(5):
    print(user)` },
      { type: 'quiz', question: { tr: "Python'da bir generator fonksiyonu oluşturmak için hangi keyword kullanılır?", en: 'Which keyword is used to create a generator function in Python?' }, options: [{ id: 'a', text: 'return' }, { id: 'b', text: 'generate' }, { id: 'c', text: 'yield' }, { id: 'd', text: 'next' }], correct: 'c', explanation: { tr: "'yield' ile normal fonksiyon generator'a dönüşür. Her yield çağrısında değer döner ve fonksiyon duraklar. Java'da bu pattern için Iterator interface'i implement edilir.", en: "'yield' turns a normal function into a generator. Each yield returns a value and pauses the function. In Java, you'd implement the Iterator interface for this pattern." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da bir generator nesnesi döndüren bir fonksiyon yazarken değerleri teker teker üretmek için hangi anahtar kelime tercih edilir?",
            "en": "Which keyword is preferred to produce values one by one when writing a function that returns a generator object in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "def"
            },
            {
                  "id": "b",
                  "text": "return"
            },
            {
                  "id": "c",
                  "text": "yield"
            },
            {
                  "id": "d",
                  "text": "emit"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "'yield' anahtar kelimesi fonksiyonun durumunu kaydeder ve bir sonraki çağrıya kadar bekletir. Bu, hafıza yönetimi açısından verimli bir şekilde veri akışı sağlar.",
            "en": "The 'yield' keyword saves the state of the function and pauses it until the next call. This allows for memory-efficient data streaming."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 28 — Decorators
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Decorators', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🎀', content: { tr: "Decorator, hediye paketleyici gibi. Çikolata güzel — ama paketleyince daha iyi görünüyor. Decorator, bir fonksiyonun etrafına ek davranış sarar — fonksiyonu değiştirmeden.", en: "A decorator is like a gift wrapper. Chocolate is great — but wrapped it looks even better. A decorator wraps a function with extra behavior — without changing the function itself." } },
      { type: 'text', content: { tr: "Java'da Aspect Oriented Programming (AOP) veya @annotation + proxy pattern ile benzer şeyler yapılır. Python'da decorator çok daha basit — sadece @ ile fonksiyon üstüne yaz. QA'de retry, timer, log gibi cross-cutting concerns için idealdir.", en: "Java does similar things with AOP or @annotation + proxy pattern. Python decorators are much simpler — just write @ above the function. In QA, ideal for cross-cutting concerns like retry, timer, and logging." } },
      { type: 'code', language: 'python', code: `import functools
import time

# Basic decorator — logs function calls
def log_call(func):
    @functools.wraps(func)           # preserves function metadata
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}({args}, {kwargs})")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper

@log_call                            # equivalent to: add = log_call(add)
def add(a, b):
    return a + b

add(3, 5)                            # prints call info + 8

# Decorator with parameters (factory pattern)
def retry(times=3, delay=1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {attempt}/{times} failed: {e}")
                    if attempt < times:
                        time.sleep(delay)
            raise RuntimeError(f"{func.__name__} failed after {times} attempts")
        return wrapper
    return decorator

@retry(times=3, delay=0.1)           # QA pattern: retry flaky tests
def unstable_check():
    import random
    if random.random() < 0.5:
        raise ConnectionError("Flaky network")
    return "OK"

try:
    print(unstable_check())
except RuntimeError as e:
    print(e)` },
      { type: 'editor', lang: 'python', defaultCode: `import time
import functools

# Write a timer decorator that measures execution time
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} took {(end-start)*1000:.1f}ms")
        return result
    return wrapper

@timer
def slow_function(n):
    total = 0
    for i in range(n):
        total += i
    return total

result = slow_function(100000)
print(f"Result: {result}")` },
      { type: 'quiz', question: { tr: "@functools.wraps(func) ne işe yarar?", en: 'What does @functools.wraps(func) do in a decorator?' }, options: [{ id: 'a', text: { tr: 'Fonksiyonu kopyalar', en: 'Copies the function' } }, { id: 'b', text: { tr: "Wrapper'ın orijinal fonksiyonun adını ve docstring'ini korumasını sağlar", en: "Preserves the original function's name and docstring on the wrapper" } }, { id: 'c', text: { tr: 'Decorator olmadan çağrılmasını sağlar', en: 'Allows calling without the decorator' } }, { id: 'd', text: { tr: 'Performansı artırır', en: 'Improves performance' } }], correct: 'b', explanation: { tr: "@functools.wraps(func) olmadan, wrapper.__name__ 'wrapper' olur. Wraps ile orijinal fonksiyonun adı ve docstring'i korunur — debugging ve logging için önemli.", en: "Without @functools.wraps(func), wrapper.__name__ would be 'wrapper'. Wraps preserves the original name and docstring — important for debugging and logging." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da dekoratör yazarken dekoratörün meta verileri bozmasını engellemek için kullanılan standart araç nedir?",
            "en": "What is the standard tool used in Python to prevent a decorator from corrupting the metadata of the wrapped function?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "@functools.lru_cache",
                        "en": "@functools.lru_cache"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "@functools.wraps",
                        "en": "@functools.wraps"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "@staticmethod",
                        "en": "@staticmethod"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "@classmethod",
                        "en": "@classmethod"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "@functools.wraps, orijinal fonksiyonun niteliklerini (name, docstring, vb.) wrapper fonksiyonuna kopyalayarak fonksiyonun sanki orijinal haliymiş gibi davranmasını sağlar.",
            "en": "@functools.wraps copies the attributes (name, docstring, etc.) of the original function to the wrapper, ensuring the function behaves as its original self."
      }
}
},
      {
        type: 'python-flow-diagram',
        titleEn: 'Decorator — How the Wrapper Wraps the Function',
        titleTr: 'Decorator — Wrapper Fonksiyonu Nasıl Sarar',
        steps: [
          { type: 'action', code: '@retry(max=3)\ndef test_login():', desc: 'Python sees @ — starts wrapping', descTr: 'Python @ görür — sarmaya başlar' },
          { type: 'action', code: 'retry(test_login) → wrapper()', desc: 'Decorator returns a new wrapper function', descTr: 'Decorator yeni bir wrapper fonksiyonu döndürür' },
          { type: 'action', code: 'wrapper() called instead of test_login()', desc: 'All future calls go through wrapper', descTr: 'Bundan sonra test_login() yerine wrapper() çağrılır' },
          { type: 'loop', code: 'try: test_login()  # attempt 1,2,3', desc: 'Wrapper controls retry logic', descTr: 'Wrapper retry mantığını yönetir' },
          { type: 'condition', code: 'Exception raised?', desc: 'If fail: retry up to max times', descTr: 'Hata varsa max kez dene', branch: { true: 'retry ↑', false: 'return result' } },
          { type: 'end', code: 'Original test_login unmodified', desc: 'Function stays clean — decorator handles cross-cutting concerns', descTr: 'Fonksiyon sade kalır — decorator genel davranışı yönetir' },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 29 — Context Managers
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Context Managers', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🚪', content: { tr: "Context manager, otomatik kapı gibi. Kütüphaneye girince kapı açılır, çıkınca kapanır — sen manuel kapatmak zorunda değilsin. Dosya açınca aynı şey: 'with' ile açarsan, Python otomatik kapatır.", en: "A context manager is like an automatic door. It opens when you enter, closes when you leave — you don't need to close it manually. Same with files: use 'with' and Python closes it automatically." } },
      { type: 'code', language: 'python', code: `from contextlib import contextmanager
import time

# 'with' statement — guaranteed cleanup (like try-finally)
# Instead of:
# f = open("test.txt")
# try:
#     data = f.read()
# finally:
#     f.close()   # must remember to close!

# Use 'with' — auto-closes even if exception occurs:
# with open("test.txt") as f:
#     data = f.read()

# Custom context manager using @contextmanager
@contextmanager
def test_timer(test_name):
    start = time.perf_counter()
    print(f"Starting: {test_name}")
    try:
        yield                          # code inside 'with' runs here
    finally:
        elapsed = (time.perf_counter() - start) * 1000
        print(f"Finished: {test_name} ({elapsed:.1f}ms)")

# Usage
with test_timer("login_test"):
    time.sleep(0.01)                  # simulate test work
    print("  Executing login test...")

# Class-based context manager
class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name

    def __enter__(self):              # setup — called on 'with' entry
        print(f"Connecting to {self.db_name}")
        return self                   # returned as 'as' variable

    def __exit__(self, exc_type, exc_val, exc_tb):  # teardown
        print(f"Closing connection to {self.db_name}")
        return False                  # False = don't suppress exceptions

with DatabaseConnection("test_db") as db:
    print("  Running queries...")` },
      { type: 'editor', lang: 'python', defaultCode: `from contextlib import contextmanager

@contextmanager
def assert_raises(exception_type):
    """Context manager that passes only if the expected exception is raised."""
    try:
        yield
        # If we get here, no exception was raised
        raise AssertionError(f"Expected {exception_type.__name__} but no exception raised")
    except exception_type:
        print(f"OK: {exception_type.__name__} was raised as expected")
    except Exception as e:
        raise AssertionError(f"Expected {exception_type.__name__}, got {type(e).__name__}: {e}")

# Test it
with assert_raises(ZeroDivisionError):
    result = 1 / 0

with assert_raises(ValueError):
    int("not a number")` },
      { type: 'quiz', question: { tr: "Python'da with statement kullanmanın temel avantajı nedir?", en: 'What is the main advantage of using a with statement in Python?' }, options: [{ id: 'a', text: { tr: 'Daha hızlı çalışır', en: 'It runs faster' } }, { id: 'b', text: { tr: 'Exception olsa bile cleanup kodu garanti çalışır', en: 'Cleanup code runs guaranteed even if an exception occurs' } }, { id: 'c', text: { tr: 'Sadece dosya işlemleri için kullanılır', en: 'Can only be used with files' } }, { id: 'd', text: { tr: "try/except'e gerek bırakmaz", en: "Eliminates the need for try/except" } }], correct: 'b', explanation: { tr: "with statement, __exit__ metodunun exception durumunda bile çalışmasını garanti eder. Java'daki try-with-resources gibi: try (Resource r = new Resource()). Kaynak sızıntısını önler.", en: "The with statement guarantees __exit__ runs even if an exception occurs. Like Java's try-with-resources: try (Resource r = new Resource()). Prevents resource leaks." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da bağlam yöneticilerinin (context managers) 'with' bloğu ile kullanılmasının sağladığı temel teknik kazanç nedir?",
            "en": "What is the core technical benefit of using context managers with the 'with' block in Python?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Kodun satır sayısını azaltması",
                        "en": "Reduces lines of code"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Kaynakların otomatik ve güvenli bir şekilde kapatılması (Resource management)",
                        "en": "Automatic and safe resource management"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Değişkenlerin kapsamını kısıtlaması",
                        "en": "Limits variable scope"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Tip güvenliğini artırması",
                        "en": "Improves type safety"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "with bloğu, __enter__ ve __exit__ metodlarını tetikleyerek hata oluşsa dahi kaynakların (dosya, socket, veritabanı bağlantısı) serbest bırakılmasını sağlar.",
            "en": "The with block triggers __enter__ and __exit__ methods, ensuring that resources (files, sockets, database connections) are released even if an error occurs."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 30 — Type Hints
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Type Hints', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🏷️', content: { tr: "Type hint, adım adım tariften 'şekeri ölçerken bardakla değil, gramla koy' demek gibi. Zorunlu değil ama çok yardımcı — IDE sana yanlış tip verdiğinde uyarır, ekip arkadaşın kodu daha hızlı anlar.", en: "Type hints are like adding 'use grams not cups' to a recipe. Not required but very helpful — your IDE warns you about wrong types, and teammates understand the code faster." } },
      { type: 'text', content: { tr: "Java statically-typed — her değişkene tip belirtmek zorunlu: String name = 'Ali'. Python dynamically-typed — tip opsiyonel ama type hint ekleyebilirsin: name: str = 'Ali'. Çalışma zamanında fark yaratmaz, sadece IDE ve mypy gibi araçlar kullanır.", en: "Java is statically-typed — types are mandatory: String name = 'Ali'. Python is dynamically-typed — types are optional but you can add hints: name: str = 'Ali'. No runtime difference, only IDEs and tools like mypy use them." } },
      { type: 'code', language: 'python', code: `from typing import Optional, List, Dict, Union, Tuple, Callable

# Basic type hints
name: str = "Alice"             # string
age: int = 25                   # integer
score: float = 98.5             # float
active: bool = True             # boolean

# Function with type hints
def greet(name: str, times: int = 1) -> str:    # -> return type
    return (f"Hello, {name}! " * times).strip()

print(greet("Bob", 3))

# Complex types
def process_results(
    results: List[Dict[str, str]],  # list of string-keyed dicts
    filter_by: Optional[str] = None  # Optional = can be None or str
) -> Tuple[int, int]:               # returns (pass_count, fail_count)
    passed = sum(1 for r in results if r.get("status") == "PASS")
    failed = sum(1 for r in results if r.get("status") == "FAIL")
    return (passed, failed)

# Union type — accepts multiple types
def get_id(identifier: Union[int, str]) -> str:
    if isinstance(identifier, int):
        return f"TC-{identifier:04d}"
    return identifier

print(get_id(42))           # TC-0042
print(get_id("TC-007"))     # TC-007

# Python 3.10+ shorthand: X | Y instead of Union[X, Y]
def newer(val: int | str) -> str:
    return str(val)` },
      { type: 'editor', lang: 'python', defaultCode: `from typing import Optional, List

class TestSuite:
    def __init__(self, name: str) -> None:
        self.name = name
        self.tests: List[str] = []

    def add_test(self, test_name: str) -> None:
        self.tests.append(test_name)

    def get_test(self, index: int) -> Optional[str]:
        if 0 <= index < len(self.tests):
            return self.tests[index]
        return None

    def summary(self) -> str:
        return f"Suite '{self.name}': {len(self.tests)} tests"

suite = TestSuite("Regression")
suite.add_test("test_login")
suite.add_test("test_checkout")
print(suite.summary())
print(suite.get_test(0))
print(suite.get_test(99))   # Should return None` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Type System' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Tip zorunlu mu?', en: 'Types required?' }, java: 'Yes — compile error if missing', python: 'No — hints are optional' },
        { concept: 'Optional', java: 'Optional<String>', python: 'Optional[str] or str | None' },
        { concept: 'List type', java: 'List<String>', python: 'List[str] or list[str]' },
        { concept: 'Map type', java: 'Map<String, Integer>', python: 'Dict[str, int]' },
        { concept: 'Type check tool', java: 'javac (compile time)', python: 'mypy (separate tool)' },
      ]},
      { type: 'quiz', question: { tr: "Python'da Optional[str] ne anlama gelir?", en: 'What does Optional[str] mean in Python type hints?' }, options: [{ id: 'a', text: { tr: 'Sadece string olabilir', en: 'Can only be a string' } }, { id: 'b', text: { tr: 'String veya None olabilir', en: 'Can be a string or None' } }, { id: 'c', text: { tr: 'Tip belirtmek isteğe bağlı', en: 'The type hint is optional' } }, { id: 'd', text: { tr: 'Birden fazla string', en: 'Multiple strings' } }], correct: 'b', explanation: { tr: "Optional[str] = Union[str, None] — değer str veya None olabilir. Java'daki Optional<String> ile benzer ama Python'da None döndürebilecek fonksiyonlarda yaygın.", en: "Optional[str] = Union[str, None] — the value can be str or None. Similar to Java's Optional<String> but commonly used in Python for functions that might return None." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da Union[int, float] ifadesi neyi ifade eder?",
            "en": "What does Union[int, float] signify in Python type hints?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Sadece tamsayılar kabul edilir",
                        "en": "Only integers are accepted"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Değer bir int veya float olabilir",
                        "en": "The value can be an int or a float"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Değerlerin toplamı tipidir",
                        "en": "It is the sum of both types"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Değer None olamaz",
                        "en": "The value cannot be None"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Union, bir değişkenin belirtilen tiplerden herhangi birine sahip olabileceğini gösterir. Union[int, float], değerin ya bir tamsayı ya da bir kayan noktalı sayı olabileceği anlamına gelir.",
            "en": "Union indicates that a variable can be any of the specified types. Union[int, float] means the value can be either an integer or a floating-point number."
      }
}
},

      // ─── Interview Questions for Advanced Topics ───────────────────────────
      { type: 'interview-questions', topic: 'Python Advanced', questions: [
        { level: 'basic', q: { tr: "Python'da decorator ne işe yarar? Bir örnek ver.", en: 'What does a decorator do in Python? Give an example.' }, a: { tr: "Decorator, bir fonksiyonun davranışını değiştirmek veya genişletmek için kullanılır — orijinal fonksiyona dokunmadan. @retry, @timer, @cache gibi. def retry(func): wrapper(*args): try: func(*args) except: retry... Bir QA test framework'ünde flaky testler için @retry(times=3) dekoratörü kullanılabilir.", en: "A decorator modifies or extends a function's behavior without touching the original. Examples: @retry, @timer, @cache. In a QA test framework, @retry(times=3) can automatically retry flaky tests." } },
        { level: 'basic', q: { tr: "Python'da 'with' statement ne zaman kullanılır?", en: "When do you use the 'with' statement in Python?" }, a: { tr: "Kaynak yönetimi gereken yerlerde: dosya açma, veritabanı bağlantısı, network bağlantısı. with open('file.txt') as f: otomatik kapatır. Hata olsa bile __exit__ çalışır — Java'daki try-with-resources gibi.", en: "When resource management is needed: file operations, database connections, network connections. with open('file.txt') as f: closes automatically. __exit__ runs even if an error occurs — like Java's try-with-resources." } },
        { level: 'intermediate', q: { tr: "Python'da generator ve list arasındaki fark nedir? QA'de neden generator kullanırsın?", en: 'What is the difference between a generator and a list in Python? Why use generators in QA?' }, a: { tr: "List tüm elemanları bellekte tutar. Generator lazy — her seferinde bir eleman üretir, bellekte hepsi tutulmaz. QA'de 100.000 test verisi üretmek için generator idealdir: def gen_users(): for i in range(100000): yield {...}. Bellek tasarrufu büyük.", en: "A list holds all elements in memory. A generator is lazy — produces one element at a time, not all in memory. In QA, generators are ideal for producing large test datasets: def gen_users(): for i in range(100000): yield {...}. Significant memory savings." } },
        { level: 'advanced', q: { tr: "Python type hints runtime'da nasıl çalışır? Tip hatası olursa ne olur?", en: 'How do Python type hints work at runtime? What happens if there is a type mismatch?' }, a: { tr: "Python type hints runtime'da enforce edilmez — sadece documentation ve tool'lar (mypy, IDE) için var. def foo(x: int): pass; foo('string') çalışır, hata vermez. Hata almak için mypy ile statik analiz veya pydantic gibi bir validation kütüphanesi gerekir. Java'nın static typing'ından bu farkı bilmek önemli.", en: "Python type hints are not enforced at runtime — they are only for documentation and tools like mypy and IDEs. def foo(x: int): pass; foo('string') works without error. To get errors, use mypy for static analysis or a validation library like pydantic. This difference from Java's static typing is important to understand." } },
      ]},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 31 — Polymorphism
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Polymorphism', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🎭', content: { tr: 'Polimorfizm, aynı komuta farklı nesnelerin farklı tepki vermesi. "Ses çıkar" dersen kedi miyavlar, köpek havlar, inek möö der. Aynı metod ismi, farklı davranışlar.', en: 'Polymorphism means the same command gets different responses from different objects. "Make sound" and a cat meows, a dog barks, a cow moos. Same method name, different behaviors.' } },
      { type: 'text', content: { tr: "Java'da polimorfizm interface veya abstract class ile sağlanır. Python'da duck typing ile çalışır — bir nesne gerekli metodu sağladığı sürece tip önemli değildir: 'eğer ördek gibi yürüyorsa ve ördek gibi vaklıyorsa, o bir ördektir'.", en: "In Java, polymorphism uses interfaces or abstract classes. Python uses duck typing — if an object has the required method, its type doesn't matter: 'If it walks like a duck and quacks like a duck, it's a duck'." } },
      { type: 'code', language: 'python', code: `# Python Polymorphism — Duck Typing
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Duck:
    def speak(self):
        return "Quack!"

# Polymorphic function — works with ANY object that has .speak()
def make_sound(animal):
    print(animal.speak())     # no type check needed!

# Same function, different behaviors:
make_sound(Dog())    # Woof!
make_sound(Cat())    # Meow!
make_sound(Duck())   # Quack!

# For loops work too — completely polymorphic
animals = [Dog(), Cat(), Duck(), Dog()]
for animal in animals:
    print(animal.speak())

# QA Example: different reporters with same interface
class HTMLReporter:
    def report(self, results): return f"<html>{results}</html>"

class JSONReporter:
    def report(self, results): return f'{{"results": "{results}"}}'

class ConsoleReporter:
    def report(self, results): print(f"[REPORT] {results}")

reporters = [HTMLReporter(), JSONReporter(), ConsoleReporter()]
for reporter in reporters:
    reporter.report("PASS: 87, FAIL: 3")` },
      { type: 'editor', lang: 'python', defaultCode: `# Polymorphism with abstract base class
from abc import ABC, abstractmethod

class TestRunner(ABC):
    @abstractmethod
    def run(self, test_name: str) -> str:
        pass

class SeleniumRunner(TestRunner):
    def run(self, test_name: str) -> str:
        return f"Selenium: {test_name} → PASS"

class PlaywrightRunner(TestRunner):
    def run(self, test_name: str) -> str:
        return f"Playwright: {test_name} → PASS"

runners = [SeleniumRunner(), PlaywrightRunner()]
for runner in runners:
    print(runner.run("test_login"))` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Polymorphism' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Polimorfizm mekanizması', en: 'Polymorphism mechanism' }, java: 'interface / abstract class required', python: 'Duck typing — no interface needed' },
        { concept: { tr: 'Abstract metod', en: 'Abstract method' }, java: 'abstract void speak();', python: '@abstractmethod def speak(self): pass' },
        { concept: { tr: 'Runtime type check', en: 'Runtime type check' }, java: 'instanceof', python: 'isinstance(obj, ClassName)' },
        { concept: { tr: 'Override', en: 'Method override' }, java: '@Override annotation', python: 'Just define same method name' },
      ]},
      { type: 'quiz', question: { tr: "Python'da duck typing ne anlama gelir?", en: 'What does duck typing mean in Python?' }, options: [{ id: 'a', text: { tr: 'Sadece Duck sınıfıyla çalışır', en: 'Works only with Duck class' } }, { id: 'b', text: { tr: 'Nesnenin tipi değil, hangi metodları sağladığı önemlidir', en: "An object's type doesn't matter — only whether it has the required methods" } }, { id: 'c', text: { tr: 'Interface zorunludur', en: 'Interface is required' } }, { id: 'd', text: { tr: 'Java polymorphism ile aynıdır', en: 'Same as Java polymorphism' } }], correct: 'b', explanation: { tr: "Duck typing: 'Eğer ördek gibi yürüyorsa ve vaklıyorsa, o bir ördektir.' Python nesnelerin tipini değil, çağrılan metodun varlığını kontrol eder. Java'da interface zorunluyken Python'da duck typing ile herhangi bir sınıf çalışır.", en: "Duck typing: 'If it walks like a duck and quacks like a duck, it's a duck.' Python checks if the method exists, not the object's type. Java requires an interface; Python's duck typing works with any class that has the method." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da 'Polimorfizm' kavramı nesne yönelimli programlamada nasıl işler?",
            "en": "How does the concept of 'Polymorphism' work in Python OOP?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Sadece miras alınan sınıflarda çalışır",
                        "en": "It works only with inherited classes"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Farklı nesnelerin aynı isimli metodları kendi türlerine göre farklı davranabilir",
                        "en": "Objects of different types can have methods with the same name that behave differently"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Metodların ismi her zaman benzersiz olmalıdır",
                        "en": "Method names must always be unique"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Nesnelerin hiçbir metodu olmamalıdır",
                        "en": "Objects must not have any methods"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Polimorfizm, duck typing ile iç içe geçer. Bir nesnenin tipi ne olursa olsun, belirli bir metodu (örneğin .calculate()) varsa, Python bu metodu çalıştırır ve nesne kendi mantığına göre sonuç üretir.",
            "en": "Polymorphism is closely related to duck typing. Regardless of the object's type, if it has a specific method (e.g., .calculate()), Python executes it, and the object behaves according to its own implementation."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 32 — Arrays (array module)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Arrays (array module)', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '📊', content: { tr: "Python'daki array modülü, sadece aynı tip sayıları tutan özel bir liste. Normal list her şeyi tutabilir ama array yalnızca int veya float gibi tek bir tip tutar — bu sayede daha az yer kaplar.", en: "Python's array module holds only one type of number. A regular list holds anything, but array holds only ints or only floats — uses less memory." } },
      { type: 'text', content: { tr: "Python'da normal list zaten dinamik ve esnek. array modülü çok sayısal veriyle çalışırken bellek optimizasyonu için kullanılır. QA'de büyük performans ölçümü verisi işlerken yararlı olabilir. Java'daki primitive array (int[]) kavramına yakın.", en: "Python's regular list is already flexible. The array module is for memory optimization when working with large numeric data. Useful in QA for processing large performance measurement datasets. Similar to Java's primitive arrays (int[])." } },
      { type: 'code', language: 'python', code: `import array

# Create typed arrays (must specify type code)
# 'i' = signed int, 'f' = float, 'd' = double
int_arr = array.array('i', [1, 2, 3, 4, 5])
float_arr = array.array('f', [1.5, 2.5, 3.5])

# Access and modify (same as list)
print(int_arr[0])       # 1
int_arr.append(6)       # Add element
int_arr.remove(3)       # Remove value 3

# Type codes reference:
# 'b' = signed char (int, 1 byte)
# 'i' = signed int  (int, 2-4 bytes)
# 'f' = float       (4 bytes)
# 'd' = double      (8 bytes)

# QA Use: store 1M response times efficiently
response_times = array.array('f')
for _ in range(1_000_000):
    response_times.append(142.5)   # much less memory than list

print(f"Count: {len(response_times)}")
print(f"Type: {response_times.typecode}")

# Convert to list when needed
as_list = response_times.tolist()` },
      { type: 'editor', lang: 'python', defaultCode: `import array

# Typed array for test durations (milliseconds as integers)
durations = array.array('i', [120, 340, 89, 450, 220, 180])

print("Durations:", list(durations))
print("Count:", len(durations))
print("Min:", min(durations))
print("Max:", max(durations))
print("Average:", sum(durations) / len(durations))

# Add new measurement
durations.append(295)
print("After append:", list(durations))` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Arrays' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Primitive dizi', en: 'Primitive array' }, java: 'int[] arr = {1, 2, 3};', python: "array.array('i', [1, 2, 3])" },
        { concept: { tr: 'Dinamik dizi', en: 'Dynamic array' }, java: 'ArrayList<Integer>', python: 'list (built-in, use this)' },
        { concept: { tr: 'Bellek verimliliği', en: 'Memory efficiency' }, java: 'int[] (very efficient)', python: "array.array('i') — efficient for numbers" },
        { concept: { tr: 'Tip kısıtlaması', en: 'Type restriction' }, java: 'Compile-time enforced', python: 'Runtime (typecode enforced)' },
      ]},
      { type: 'quiz', question: { tr: "Python'da array.array('i', [...]) ile list arasındaki temel fark nedir?", en: "What is the key difference between array.array('i', [...]) and a list in Python?" }, options: [{ id: 'a', text: { tr: 'array daha hızlıdır', en: 'array is faster' } }, { id: 'b', text: { tr: "array yalnızca aynı tipte veri tutar, list her tipi tutar", en: 'array holds only one data type, list holds any type' } }, { id: 'c', text: { tr: 'array değiştirilemez (immutable)', en: 'array is immutable' } }, { id: 'd', text: { tr: 'array sırasız', en: 'array is unordered' } }], correct: 'b', explanation: { tr: "array.array tek bir tip (int, float vb.) tutar ve bu sayede bellekte daha verimlidir. Python list her tipte veri tutabilir. QA'de büyük sayısal veri setlerinde array kullanmak bellek tasarrufu sağlar.", en: "array.array holds only one type (int, float, etc.) making it memory efficient. Python's list holds any type. Using array for large numeric datasets in QA saves memory." } ,
        retryQuestion: {
      "question": {
            "tr": "Python'da 'list' veri yapısının 'array.array' ile kıyaslandığında dezavantajı nedir?",
            "en": "What is the downside of using a 'list' in Python compared to an 'array.array'?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Daha az metot içerir",
                        "en": "It contains fewer methods"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Bellekte daha fazla yer kaplar ve çoklu tip desteği nedeniyle daha az verimlidir",
                        "en": "It consumes more memory and is less efficient due to multi-type support"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Eleman eklemek daha yavaştır",
                        "en": "Appending elements is slower"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece okunabilir bir yapıdır",
                        "en": "It is a read-only structure"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Listeler, Python'daki esnekliği sağlamak için her elemanın tipini ayrı ayrı saklar, bu da 'array.array'in aksine daha fazla bellek kullanımına ve büyük sayısal işlemlerde yavaşlığa yol açar.",
            "en": "Lists store the type of each element separately to maintain Python's flexibility, leading to higher memory consumption and slower performance in large numerical operations compared to array.array."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 33 — Dates (datetime module)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Dates (datetime module)', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '📅', content: { tr: "Python'daki datetime modülü, tarih ve saat işlemleri için. 'Test ne zaman çalıştı?', 'Bu rapor ne kadar sürdü?', 'Bugünün tarihi nedir?' sorularını cevaplar.", en: "Python's datetime module handles date and time. 'When did the test run?', 'How long did the report take?', 'What is today's date?' — all answered here." } },
      { type: 'code', language: 'python', code: `from datetime import datetime, date, timedelta

# Current date and time
now = datetime.now()
print(now)                          # 2024-01-15 14:30:25.123456
print(now.year, now.month, now.day) # 2024 1 15
print(now.hour, now.minute)         # 14 30

# Format dates as strings (strftime)
print(now.strftime("%Y-%m-%d"))          # 2024-01-15
print(now.strftime("%d/%m/%Y %H:%M"))    # 15/01/2024 14:30
print(now.strftime("%B %d, %Y"))         # January 15, 2024

# Parse string to datetime (strptime)
date_str = "2024-03-25"
parsed = datetime.strptime(date_str, "%Y-%m-%d")
print(parsed.year)   # 2024

# Date arithmetic with timedelta
today = date.today()
yesterday = today - timedelta(days=1)
next_week = today + timedelta(weeks=1)
print("Yesterday:", yesterday)
print("Next week:", next_week)

# QA: measure test duration
start = datetime.now()
# ... run test ...
end = datetime.now()
duration = end - start
print(f"Test took: {duration.total_seconds():.2f} seconds")

# QA: generate timestamped filename
timestamp = now.strftime("%Y%m%d_%H%M%S")
filename = f"report_{timestamp}.json"
print(filename)  # report_20240115_143025.json` },
      { type: 'editor', lang: 'python', defaultCode: `from datetime import datetime, timedelta

# Generate test report with timestamp
def create_report_filename(prefix="test_report"):
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{prefix}_{ts}.json"

# Check if a date is within the last 7 days
def is_recent(date_str: str, days: int = 7) -> bool:
    date = datetime.strptime(date_str, "%Y-%m-%d")
    cutoff = datetime.now() - timedelta(days=days)
    return date >= cutoff

print(create_report_filename())
print(create_report_filename("smoke"))

# Test recent check
print(is_recent("2020-01-01"))  # False - too old
print(is_recent(datetime.now().strftime("%Y-%m-%d")))  # True - today` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Dates' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Şimdiki zaman', en: 'Current time' }, java: 'LocalDateTime.now()', python: 'datetime.now()' },
        { concept: { tr: 'Tarih formatla', en: 'Format date' }, java: 'DateTimeFormatter.ofPattern(...)', python: 'strftime("%Y-%m-%d")' },
        { concept: { tr: 'String → tarih', en: 'Parse string' }, java: 'LocalDate.parse(str)', python: 'strptime(str, format)' },
        { concept: { tr: 'Tarih farkı', en: 'Date difference' }, java: 'ChronoUnit.DAYS.between()', python: 'timedelta and .total_seconds()' },
      ]},
      { type: 'quiz', question: { tr: "datetime.now().strftime('%Y%m%d') ne döner?", en: "What does datetime.now().strftime('%Y%m%d') return?" }, options: [{ id: 'a', text: '2024-01-15' }, { id: 'b', text: '20240115' }, { id: 'c', text: 'January 15' }, { id: 'd', text: '15/01/2024' }], correct: 'b', explanation: { tr: "'%Y' 4 haneli yıl, '%m' 2 haneli ay, '%d' 2 haneli gün döner — birleşik: '20240115'. Bu format log dosyaları ve report isimlendirmesi için yaygın kullanılır.", en: "'%Y' = 4-digit year, '%m' = 2-digit month, '%d' = 2-digit day. Combined: '20240115'. This format is commonly used for log files and report naming." } ,
        retryQuestion: {
      "question": {
            "tr": "datetime.now().strftime('%d/%m/%Y') kodu ne döndürür?",
            "en": "What does the code datetime.now().strftime('%d/%m/%Y') return?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "2024-01-15"
            },
            {
                  "id": "b",
                  "text": "15012024"
            },
            {
                  "id": "c",
                  "text": "15/01/2024"
            },
            {
                  "id": "d",
                  "text": "01/15/2024"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "'%d' gün, '%m' ay ve '%Y' yıl değerlerini belirtilen '/' ayırıcısı ile birleştirir. Örn: 15/01/2024.",
            "en": "It combines the '%d' day, '%m' month, and '%Y' year values with the specified '/' separator. E.g., 15/01/2024."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 34 — Math (math module)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Math (math module)', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🧮', content: { tr: "Python'ın math modülü, hesap makinenizdeki gelişmiş fonksiyonlar gibi: karekök, log, güç, yuvarlama. Normal +, -, *, / için gerekmiyor ama sqrt(25) veya pi sayısı için lazım.", en: "Python's math module is like your calculator's advanced functions: square root, log, power, rounding. Not needed for +, -, *, / but necessary for sqrt(25) or the pi constant." } },
      { type: 'code', language: 'python', code: `import math

# Constants
print(math.pi)          # 3.141592653589793
print(math.e)           # 2.718281828459045
print(math.inf)         # inf (infinity)

# Rounding
print(math.ceil(4.2))   # 5  — round UP always
print(math.floor(4.8))  # 4  — round DOWN always
print(round(4.5))       # 4  — banker's rounding (built-in)

# Power and roots
print(math.sqrt(16))    # 4.0 — square root
print(math.pow(2, 10))  # 1024.0 — power (returns float)
print(2 ** 10)          # 1024   — power (returns int)

# Logarithm
print(math.log(100))          # 4.60... — natural log (ln)
print(math.log(100, 10))      # 2.0     — log base 10
print(math.log10(1000))       # 3.0     — convenient shorthand

# Absolute value
print(abs(-5))          # 5 (built-in, no import needed)
print(math.fabs(-5.0))  # 5.0 (math version, always float)

# QA: calculate pass percentages
total = 150
passed = 137
pass_rate = (passed / total) * 100
print(f"Pass rate: {math.floor(pass_rate)}%")  # always round down for safety` },
      { type: 'editor', lang: 'python', defaultCode: `import math

# QA statistical calculations
response_times = [120, 340, 89, 450, 220, 180, 95, 510]

avg = sum(response_times) / len(response_times)
variance = sum((x - avg) ** 2 for x in response_times) / len(response_times)
std_dev = math.sqrt(variance)

print(f"Count: {len(response_times)}")
print(f"Average: {avg:.1f} ms")
print(f"Std deviation: {std_dev:.1f} ms")
print(f"Min: {min(response_times)} ms")
print(f"Max: {max(response_times)} ms")

# SLA check: all times must be under 500ms
sla_threshold = 500
violations = [t for t in response_times if t > sla_threshold]
print(f"SLA violations: {len(violations)}")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Math' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Karekök', en: 'Square root' }, java: 'Math.sqrt(16)', python: 'math.sqrt(16)' },
        { concept: { tr: 'Yuvarla yukarı', en: 'Round up' }, java: 'Math.ceil(4.2)', python: 'math.ceil(4.2)' },
        { concept: { tr: 'Yuvarla aşağı', en: 'Round down' }, java: 'Math.floor(4.8)', python: 'math.floor(4.8)' },
        { concept: { tr: 'Pi sabiti', en: 'Pi constant' }, java: 'Math.PI', python: 'math.pi' },
        { concept: { tr: 'Mutlak değer', en: 'Absolute value' }, java: 'Math.abs(-5)', python: 'abs(-5) or math.fabs(-5)' },
      ]},
      { type: 'quiz', question: { tr: "math.ceil(4.1) ve math.floor(4.9) sırasıyla ne döner?", en: "What do math.ceil(4.1) and math.floor(4.9) each return?" }, options: [{ id: 'a', text: '4 ve 4' }, { id: 'b', text: '5 ve 5' }, { id: 'c', text: '5 ve 4' }, { id: 'd', text: '4 ve 5' }], correct: 'c', explanation: { tr: "ceil() her zaman yukarı yuvarlar: ceil(4.1) = 5. floor() her zaman aşağı yuvarlar: floor(4.9) = 4. Java'daki Math.ceil() ve Math.floor() ile aynı davranış.", en: "ceil() always rounds UP: ceil(4.1) = 5. floor() always rounds DOWN: floor(4.9) = 4. Same behavior as Java's Math.ceil() and Math.floor()." } ,
        retryQuestion: {
      "question": {
            "tr": "math.ceil(2.9) ve math.floor(2.1) işlemleri sırasıyla ne döndürür?",
            "en": "What do the operations math.ceil(2.9) and math.floor(2.1) return respectively?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "2 ve 2"
            },
            {
                  "id": "b",
                  "text": "3 ve 2"
            },
            {
                  "id": "c",
                  "text": "3 ve 3"
            },
            {
                  "id": "d",
                  "text": "2 ve 3"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "math.ceil(2.9) değeri yukarı yuvarlayarak 3 sonucunu verir; math.floor(2.1) ise aşağı yuvarlayarak 2 sonucunu verir.",
            "en": "math.ceil(2.9) rounds up to 3; while math.floor(2.1) rounds down to 2."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 35 — PIP (Package Manager)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'PIP — Python Package Manager', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '📦', content: { tr: "pip, Python'ın uygulama mağazası gibi. Başkalarının yazdığı kütüphaneleri indirir. 'pip install requests' yazarsın, her şey hazır! Java'daki Maven/Gradle'a benzer ama komut satırından.", en: "pip is like Python's app store. It downloads libraries others wrote. Type 'pip install requests' and everything is ready! Similar to Maven/Gradle in Java but from the command line." } },
      { type: 'code', language: 'python', code: `# PIP — Python Package Installer
# ─────────────────────────────────────────
# Install a package
# pip install requests

# Install specific version
# pip install requests==2.31.0

# Install minimum version
# pip install requests>=2.28.0

# Install multiple packages
# pip install pytest requests playwright faker

# Uninstall
# pip uninstall requests

# List installed packages
# pip list

# Show package details
# pip show requests

# Upgrade pip itself
# python -m pip install --upgrade pip

# Save dependencies to file
# pip freeze > requirements.txt

# Install from requirements file
# pip install -r requirements.txt

# ─────────────────────────────────────────
# Example requirements.txt:
# pytest==7.4.3
# playwright==1.40.0
# requests==2.31.0
# faker==20.1.0
# allure-pytest==2.13.2

# QA Essential packages:
PACKAGES = {
    "pytest":         "Test runner, assertions, fixtures",
    "playwright":     "Browser automation (modern)",
    "selenium":       "Browser automation (classic)",
    "requests":       "HTTP/API testing",
    "faker":          "Generate realistic test data",
    "allure-pytest":  "Beautiful HTML reports",
    "pandas":         "Read/process CSV/Excel test data",
}

for pkg, desc in PACKAGES.items():
    print(f"  pip install {pkg:15} # {desc}")` },
      { type: 'editor', lang: 'python', defaultCode: `# Simulate reading a requirements.txt file
requirements_txt = """pytest==7.4.3
requests==2.31.0
playwright==1.40.0
faker==20.1.0
allure-pytest==2.13.2"""

print("Packages from requirements.txt:")
for line in requirements_txt.strip().split("\\n"):
    if line and not line.startswith("#"):
        name, version = line.split("==")
        print(f"  {name} version {version}")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Package Management' }, columns: ['Java (Maven)', 'Python (pip)'], rows: [
        { concept: { tr: 'Bağımlılık dosyası', en: 'Dependency file' }, java: 'pom.xml', python: 'requirements.txt' },
        { concept: { tr: 'Paket indir', en: 'Install package' }, java: 'mvn install', python: 'pip install package' },
        { concept: { tr: 'Belirli sürüm', en: 'Specific version' }, java: '<version>2.31</version>', python: 'pip install pkg==2.31' },
        { concept: { tr: 'Paket deposu', en: 'Package registry' }, java: 'Maven Central', python: 'PyPI (pypi.org)' },
        { concept: { tr: 'Sanal ortam', en: 'Virtual environment' }, java: 'N/A (global or project scope)', python: 'venv + pip (per project)' },
      ]},
      { type: 'quiz', question: { tr: "pip freeze > requirements.txt komutu ne yapar?", en: "What does the command 'pip freeze > requirements.txt' do?" }, options: [{ id: 'a', text: { tr: 'requirements.txt dosyasını siler', en: 'Deletes requirements.txt' } }, { id: 'b', text: { tr: 'Mevcut ortamdaki tüm paketleri ve sürümlerini requirements.txt dosyasına yazar', en: 'Writes all installed packages and their exact versions to requirements.txt' } }, { id: 'c', text: { tr: 'Tüm paketleri günceller', en: 'Updates all packages' } }, { id: 'd', text: { tr: 'Pip\'i günceller', en: 'Updates pip' } }], correct: 'b', explanation: { tr: "pip freeze tüm kurulu paketleri ve tam sürümlerini (pkg==x.y.z formatında) listeler. > operatörü çıktıyı requirements.txt dosyasına yönlendirir. Başka bir ortamda pip install -r requirements.txt ile aynı ortam oluşturulur.", en: "pip freeze lists all installed packages with exact versions (pkg==x.y.z format). > redirects output to requirements.txt. Run 'pip install -r requirements.txt' on another machine to recreate the exact same environment." } ,
        retryQuestion: {
      "question": {
            "tr": "pip install -r requirements.txt komutunun temel amacı nedir?",
            "en": "What is the primary purpose of the command 'pip install -r requirements.txt'?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "requirements.txt içindeki tüm paketleri kurar",
                        "en": "Installs all packages listed in requirements.txt"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Paketleri kaldırır",
                        "en": "Uninstalls packages"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "requirements.txt dosyasını oluşturur",
                        "en": "Creates a requirements.txt file"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Paketleri günceller",
                        "en": "Updates packages"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Bu komut, requirements.txt dosyasında belirtilen tüm bağımlılıkları ve bunların sürüm numaralarını mevcut sanal ortama yükler.",
            "en": "This command installs all dependencies and their specific versions listed in the requirements.txt file into the current environment."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 36 — User Input
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'User Input', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '⌨️', content: { tr: "input() fonksiyonu, kullanıcıdan bilgi almak için. 'Adınızı girin:' yazarsın, kullanıcı yazar ve Enter'a basar. Python ne yazıldığını bir değişkende saklar. Dikkat: her zaman string döner!", en: "input() asks the user for information. You write 'Enter your name:' and the user types and presses Enter. Python stores what was typed in a variable. Important: it always returns a string!" } },
      { type: 'code', language: 'python', code: `# Python User Input
# input() always returns a STRING

name = input("Enter your name: ")
print(f"Hello, {name}!")

# Converting input to number
age_str = input("Enter your age: ")
age = int(age_str)    # Must convert! input() gives string
print(f"Next year you'll be {age + 1}")

# Safe conversion with error handling
def get_int_input(prompt: str) -> int:
    while True:
        raw = input(prompt)
        try:
            return int(raw)
        except ValueError:
            print(f"  Invalid: '{raw}' is not a number. Try again.")

# QA CLI tool pattern
def run_interactive_test():
    url     = input("Test URL (default: http://localhost:3000): ").strip()
    url     = url or "http://localhost:3000"
    browser = input("Browser [chromium/firefox/webkit]: ").strip().lower()
    browser = browser if browser in ["chromium", "firefox", "webkit"] else "chromium"
    headless_str = input("Headless? [y/N]: ").strip().lower()
    headless = headless_str == "y"

    print(f"\\nStarting: {browser} → {url} | headless={headless}")
    # ... launch playwright here ...

# Note: In automated tests (pytest, CI), input() is NOT used.
# Use argparse or environment variables instead.` },
      { type: 'editor', lang: 'python', defaultCode: `# Simple input example (run in a regular Python file, not pytest)
# In browser sandbox we simulate input:

def simulate_qa_config():
    """Simulates what an interactive CLI config script might do."""
    # In real code: these would be input() calls
    test_url = "https://automationexercise.com"
    browser = "chromium"
    workers = 4

    config = {
        "url": test_url,
        "browser": browser,
        "workers": workers,
        "headless": True,
    }

    print("Test Configuration:")
    for key, value in config.items():
        print(f"  {key}: {value}")
    return config

config = simulate_qa_config()
print(f"\\nReady to run {config['workers']} parallel tests!")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — User Input' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Kullanıcıdan oku', en: 'Read from user' }, java: 'Scanner sc = new Scanner(System.in); sc.nextLine()', python: 'input("prompt: ")' },
        { concept: { tr: 'Integer oku', en: 'Read integer' }, java: 'sc.nextInt()', python: 'int(input("prompt: "))' },
        { concept: { tr: 'Tip dönüşümü', en: 'Type conversion' }, java: 'Automatic for nextInt()', python: 'Always manual: int(), float()' },
        { concept: { tr: 'CLI araçları için', en: 'For CLI tools' }, java: 'Apache Commons CLI', python: 'argparse (built-in)' },
      ]},
      { type: 'quiz', question: { tr: "age = input('Yaşınız: ') sonrası age + 1 yazmak hata verir. Neden?", en: "After age = input('Your age: '), writing age + 1 causes an error. Why?" }, options: [{ id: 'a', text: { tr: 'input() None döner', en: 'input() returns None' } }, { id: 'b', text: { tr: "input() her zaman string döner, int ile toplama yapılamaz", en: "input() always returns a string, you can't add int to a string" } }, { id: 'c', text: { tr: 'input() sayı döner', en: 'input() returns a number' } }, { id: 'd', text: { tr: 'Syntax hatası', en: 'Syntax error' } }], correct: 'b', explanation: { tr: "input() her zaman str döner. '25' + 1 TypeError verir. Önce int(age) dönüştürmeliyiz. Bu Python'da çok yaygın bir hata kaynağı.", en: "input() always returns str. '25' + 1 raises TypeError. We must convert first: int(age). This is a very common mistake in Python." } ,
        retryQuestion: {
      "question": {
            "tr": "price = input('Fiyat: ') sonrası price * 2 işlemi neden hata verir veya beklenmedik sonuç doğurur?",
            "en": "After price = input('Price: '), why does price * 2 cause an error or unexpected results?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "input() boş değer (None) döndürür",
                        "en": "input() returns a null (None) value"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "input() veriyi string olarak alır, sayısal çarpma işlemi yapılamaz",
                        "en": "input() retrieves data as a string, numerical multiplication cannot be performed"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "input() her zaman float döndürür",
                        "en": "input() always returns a float"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Python input() fonksiyonunda tip güvenliği zorunludur",
                        "en": "Type safety is mandatory in Python's input() function"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "input() fonksiyonu her zaman str döner. Eğer '10' girerseniz, '10' * 2 işlemi '1010' sonucunu verir. Matematiksel işlem için float(price) veya int(price) kullanarak tip dönüşümü yapmanız gerekir.",
            "en": "The input() function always returns a str. If you input '10', the operation '10' * 2 results in '1010'. For mathematical operations, you must perform type casting using float(price) or int(price)."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 37 — String Formatting
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'String Formatting', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🖨️', content: { tr: "String formatting, boşluk bırakılmış bir mektuba değer doldurmak gibi. 'Merhaba ___! Puanın: ___' şablonuna ad ve puan yazarsın. Python'da bunu yapmanın birkaç yolu var; en moderni f-string.", en: "String formatting is like filling out a form letter. 'Hello ___! Your score: ___' — you fill in the name and score. Python has several ways to do this; the most modern is f-strings." } },
      { type: 'code', language: 'python', code: `# Python String Formatting — 4 methods (newest to oldest)

name = "Alice"
score = 95.5

# 1. f-strings (Python 3.6+) — RECOMMENDED
print(f"Hello {name}! Score: {score:.1f}%")   # Hello Alice! Score: 95.5%
print(f"Next year: {2024 + 1}")                # Can do math inside!
print(f"Upper: {name.upper()}")                # Can call methods!

# Format specifiers in f-strings:
pi = 3.14159
print(f"{pi:.2f}")          # 3.14   — 2 decimal places
print(f"{1000000:,}")       # 1,000,000 — thousand separator
print(f"{0.876:.1%}")       # 87.6%  — percentage
print(f"{'left':<10}|")     # left       | — left-aligned, 10 wide
print(f"{'right':>10}|")    #      right| — right-aligned, 10 wide
print(f"{42:05d}")          # 00042  — zero-padded integer

# 2. .format() method (Python 3.0+)
msg = "Hello {}! Score: {:.1f}%".format(name, score)
named = "Hello {name}! Score: {s:.1f}%".format(name=name, s=score)

# 3. % operator (old style — avoid)
old = "Hello %s! Score: %.1f%%" % (name, score)

# QA Reporting example:
def format_test_result(test_name, passed, failed, total, duration_s):
    pass_rate = (passed / total) * 100 if total else 0
    return (
        f"{'='*50}\\n"
        f"  Suite: {test_name}\\n"
        f"  Passed:  {passed:>3}/{total} ({pass_rate:.1f}%)\\n"
        f"  Failed:  {failed:>3}/{total}\\n"
        f"  Duration: {duration_s:.2f}s\\n"
        f"{'='*50}"
    )

print(format_test_result("Regression Suite", 87, 3, 90, 142.5))` },
      { type: 'editor', lang: 'python', defaultCode: `# Practice string formatting
test_results = [
    {"name": "test_login",    "status": "PASS", "ms": 234},
    {"name": "test_checkout", "status": "FAIL", "ms": 891},
    {"name": "test_search",   "status": "PASS", "ms": 156},
    {"name": "test_register", "status": "SKIP", "ms": 0},
]

icons = {"PASS": "✅", "FAIL": "❌", "SKIP": "⏭️"}

print(f"{'Test Name':<20} {'Status':<8} {'Duration':>10}")
print("-" * 42)
for r in test_results:
    icon = icons[r["status"]]
    ms_str = f"{r['ms']}ms" if r["ms"] > 0 else "-"
    print(f"{r['name']:<20} {icon} {r['status']:<6} {ms_str:>10}")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — String Formatting' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Modern format', en: 'Modern format' }, java: 'String.format("Hi %s", name)', python: 'f"Hi {name}"' },
        { concept: { tr: 'Math içinde', en: 'Math in template' }, java: 'String.format("n=%d", n+1)', python: 'f"n={n+1}"' },
        { concept: { tr: 'Decimal places', en: 'Decimal places' }, java: 'String.format("%.2f", pi)', python: 'f"{pi:.2f}"' },
        { concept: { tr: 'Zero-padding', en: 'Zero-padding' }, java: 'String.format("%05d", 42)', python: 'f"{42:05d}"' },
        { concept: { tr: 'Multi-line template', en: 'Multi-line template' }, java: 'String.format with \\n', python: 'f-string + triple quotes' },
      ]},
      { type: 'quiz', question: { tr: "f\"{0.856:.1%}\" ifadesi ne döner?", en: 'What does f"{0.856:.1%}" return?' }, options: [{ id: 'a', text: '85.6' }, { id: 'b', text: '0.856%' }, { id: 'c', text: '85.6%' }, { id: 'd', text: '86%' }], correct: 'c', explanation: { tr: ":.1% format specifier: sayıyı 100 ile çarpar, % ekler, 1 ondalık hane gösterir. 0.856 → 85.6%. Java'da String.format(\"%.1f%%\", 85.6) gerekir; f-string çok daha temiz.", en: ":.1% format specifier: multiplies by 100, adds %, shows 1 decimal. 0.856 → 85.6%. Java needs String.format(\"%.1f%%\", 85.6); f-string is much cleaner." } ,
        retryQuestion: {
      "question": {
            "tr": "f\\\"{0.1234:.2%}\\\" ifadesi çalıştırıldığında sonuç ne olur?",
            "en": "What is the result when f\"{0.1234:.2%}\" is executed?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "12.34%"
            },
            {
                  "id": "b",
                  "text": "0.12%"
            },
            {
                  "id": "c",
                  "text": "123.40%"
            },
            {
                  "id": "d",
                  "text": "12.3%"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": ":.2% format belirleyicisi, sayıyı 100 ile çarpar, sonuna % işareti ekler ve noktadan sonra 2 basamak gösterir. 0.1234 değeri 12.34% olarak biçimlendirilir.",
            "en": "The :.2% format specifier multiplies the number by 100, appends a % sign, and displays 2 decimal places. The value 0.1234 is formatted as 12.34%."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 38 — File Handling
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'File Handling', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '📁', content: { tr: "Dosya işleme, Python ile bilgisayardaki dosyaları okumak ve yazmak. 'open()' fonksiyonu dosyayı açar, 'with' otomatik kapatır. QA'de test verilerini CSV'den okumak ve rapor kaydetmek için çok kullanılır.", en: "File handling means reading and writing files on your computer using Python. 'open()' opens a file, 'with' closes it automatically. In QA, heavily used for reading CSV test data and saving reports." } },
      { type: 'code', language: 'python', code: `# Python File Handling — Read, Write, Append, Delete

# WRITE — create or overwrite a file
with open("test_results.txt", "w") as f:
    f.write("Test Suite: Login\\n")
    f.write("Status: PASS\\n")
    f.write("Duration: 1.23s\\n")

# READ — read all content at once
with open("test_results.txt", "r") as f:
    content = f.read()
    print(content)

# READ — line by line (memory efficient for large files)
with open("test_results.txt", "r") as f:
    for line in f:
        print(line.strip())   # strip() removes trailing \\n

# READ — all lines as a list
with open("test_results.txt", "r") as f:
    lines = f.readlines()     # ['Test Suite: Login\\n', ...]

# APPEND — add to existing file without overwriting
with open("test_results.txt", "a") as f:
    f.write("\\nRun #2 added\\n")

# WRITE CSV with csv module
import csv
results = [
    ["login_test", "PASS", 234],
    ["checkout_test", "FAIL", 891],
]
with open("results.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Test", "Status", "Duration"])  # header
    writer.writerows(results)

# READ CSV
with open("results.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["Test"], row["Status"])

# DELETE a file
import os
os.remove("test_results.txt")  # delete
os.path.exists("test_results.txt")  # check existence` },
      { type: 'editor', lang: 'python', defaultCode: `import csv, io

# Simulate writing and reading CSV test data
csv_content = io.StringIO()
writer = csv.writer(csv_content)
writer.writerow(["test_name", "status", "duration_ms"])
writer.writerow(["test_login", "PASS", 234])
writer.writerow(["test_checkout", "FAIL", 891])
writer.writerow(["test_search", "PASS", 156])

# Read it back
csv_content.seek(0)
reader = csv.DictReader(csv_content)

passed = failed = 0
for row in reader:
    status = row["status"]
    if status == "PASS":
        passed += 1
    else:
        failed += 1
    print(f"  {row['test_name']}: {status} ({row['duration_ms']}ms)")

print(f"\\nTotal: {passed + failed}, Passed: {passed}, Failed: {failed}")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — File Handling' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Dosya aç ve oku', en: 'Open and read file' }, java: 'Files.readString(Path.of("f.txt"))', python: 'open("f.txt").read() or with open()' },
        { concept: { tr: 'Dosyaya yaz', en: 'Write to file' }, java: 'Files.writeString(path, content)', python: 'open("f.txt", "w").write(content)' },
        { concept: { tr: 'Auto-close', en: 'Auto-close' }, java: 'try-with-resources', python: 'with open() as f:' },
        { concept: { tr: 'CSV oku', en: 'Read CSV' }, java: 'OpenCSV library', python: 'csv.DictReader (built-in)' },
        { concept: { tr: 'Dosya var mı?', en: 'File exists?' }, java: 'Files.exists(path)', python: 'os.path.exists("f.txt")' },
      ]},
      { type: 'quiz', question: { tr: "open(\"file.txt\", \"a\") modu ne yapar?", en: 'What does open("file.txt", "a") mode do?' }, options: [{ id: 'a', text: { tr: 'Dosyayı okur', en: 'Reads the file' } }, { id: 'b', text: { tr: 'Dosyayı siler ve yeniden oluşturur', en: 'Deletes and recreates the file' } }, { id: 'c', text: { tr: 'Dosyanın sonuna ekler (varsa siler, yoksa oluşturur)', en: 'Appends to end of file (creates if not exists)' } }, { id: 'd', text: { tr: 'Dosyayı sadece okuma modunda açar', en: 'Opens file in read-only mode' } }], correct: 'c', explanation: { tr: "\"a\" (append) modu: dosya varsa sonuna ekler, yoksa oluşturur. \"r\" okuma, \"w\" yazma (sıfırlar), \"a\" ekleme, \"x\" sadece yeni oluşturma (varsa hata). QA log dosyaları için \"a\" modu idealdir.", en: "\"a\" (append) mode: adds to end if exists, creates if not. \"r\" = read, \"w\" = write (overwrites), \"a\" = append, \"x\" = create only new (error if exists). \"a\" mode is ideal for QA log files." } ,
        retryQuestion: {
      "question": {
            "tr": "open(\\\"test.log\\\", \\\"w\\\") modu dosyada ne yapar?",
            "en": "What does open(\"test.log\", \"w\") mode do to the file?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Dosyanın sonuna yeni veriler ekler",
                        "en": "Appends new data to the end of the file"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Dosyayı sadece okuma modunda açar",
                        "en": "Opens the file in read-only mode"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Dosyayı açar ve içindeki mevcut verileri silip sıfırlar",
                        "en": "Opens the file and truncates (clears) its existing content"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Dosyayı sadece yazılabilir ancak mevcut veriyi koruyarak açar",
                        "en": "Opens for writing while preserving existing data"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "\\\"w\\\" (write) modu dosyayı sıfırlar. Eğer dosya zaten varsa içini boşaltır, yoksa yeni bir dosya oluşturur. Veri kaybetmemek için dikkatli kullanılmalıdır.",
            "en": "\\\"w\\\" (write) mode truncates the file. If the file exists, it empties it; if not, it creates a new one. It should be used with caution to avoid data loss."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // QA Topic — Dataclasses
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Dataclasses (@dataclass)', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🏗️', content: { tr: "@dataclass, veri tutmak için class yazmayı kolaylaştıran bir dekoratör. Normalde __init__, __repr__, __eq__ metodlarını tek tek yazman gerekirdi — @dataclass bunları otomatik oluşturur. QA'de test verisi modellemek için mükemmel.", en: "@dataclass is a decorator that makes writing data-holding classes easy. Normally you'd write __init__, __repr__, __eq__ manually — @dataclass generates them automatically. Perfect for modeling test data in QA." } },
      { type: 'code', language: 'python', code: `from dataclasses import dataclass, field
from typing import List, Optional

# Basic dataclass — auto-generates __init__, __repr__, __eq__
@dataclass
class TestResult:
    name: str
    status: str                # "PASS", "FAIL", "SKIP"
    duration_ms: int
    error_msg: Optional[str] = None   # optional, default None

# Using it:
t1 = TestResult("test_login", "PASS", 234)
t2 = TestResult("test_checkout", "FAIL", 891, "AssertionError: expected 200, got 404")

print(t1)    # TestResult(name='test_login', status='PASS', duration_ms=234, error_msg=None)
print(t1 == TestResult("test_login", "PASS", 234))  # True — __eq__ auto-generated

# Field with default_factory (for mutable defaults like lists)
@dataclass
class TestSuite:
    name: str
    browser: str = "chromium"
    tests: List[TestResult] = field(default_factory=list)

    def add(self, result: TestResult) -> None:
        self.tests.append(result)

    def pass_rate(self) -> float:
        if not self.tests: return 0.0
        passed = sum(1 for t in self.tests if t.status == "PASS")
        return round(passed / len(self.tests) * 100, 1)

suite = TestSuite("Login Suite")
suite.add(t1)
suite.add(t2)
print(f"Pass rate: {suite.pass_rate()}%")  # 50.0%

# frozen=True — makes dataclass immutable (like Java final class)
@dataclass(frozen=True)
class Config:
    base_url: str
    timeout_ms: int = 5000
    headless: bool = True

cfg = Config("https://automationexercise.com")
# cfg.base_url = "other"  # ERROR: frozen dataclass!` },
      { type: 'editor', lang: 'python', defaultCode: `from dataclasses import dataclass, field
from typing import List

@dataclass
class ApiTestCase:
    name: str
    method: str
    endpoint: str
    expected_status: int
    tags: List[str] = field(default_factory=list)

    def is_auth_required(self) -> bool:
        return "auth" in self.tags

    def __str__(self) -> str:
        return f"[{self.method}] {self.endpoint} → {self.expected_status}"

# Create test cases
cases = [
    ApiTestCase("Get users", "GET", "/api/users", 200, ["auth", "smoke"]),
    ApiTestCase("Create user", "POST", "/api/users", 201, ["auth"]),
    ApiTestCase("Login", "POST", "/api/login", 200),
]

for case in cases:
    auth_label = "🔐" if case.is_auth_required() else "🌍"
    print(f"{auth_label} {case}")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Dataclasses' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Veri sınıfı', en: 'Data class' }, java: 'record (Java 16+) or POJO with Lombok', python: '@dataclass' },
        { concept: { tr: 'Constructor otomatik', en: 'Auto constructor' }, java: 'record auto / @AllArgsConstructor (Lombok)', python: '@dataclass auto __init__' },
        { concept: { tr: 'equals() otomatik', en: 'Auto equals' }, java: 'record auto / @EqualsAndHashCode', python: '@dataclass auto __eq__' },
        { concept: { tr: 'toString() otomatik', en: 'Auto toString' }, java: 'record auto / @ToString', python: '@dataclass auto __repr__' },
        { concept: { tr: 'Immutable', en: 'Immutable' }, java: 'record (final fields)', python: '@dataclass(frozen=True)' },
      ]},
      { type: 'quiz', question: { tr: "@dataclass dekoratörü hangi metodları otomatik oluşturur?", en: 'Which methods does the @dataclass decorator auto-generate?' }, options: [{ id: 'a', text: 'Sadece __init__' }, { id: 'b', text: '__init__, __repr__ ve __eq__' }, { id: 'c', text: '__init__ ve __str__' }, { id: 'd', text: 'Sadece __repr__' }], correct: 'b', explanation: { tr: "@dataclass varsayılan olarak __init__ (constructor), __repr__ (print için string gösterimi) ve __eq__ (== operatörü) metodlarını otomatik oluşturur. frozen=True ile __hash__ da eklenir.", en: "@dataclass by default auto-generates __init__ (constructor), __repr__ (string representation for printing), and __eq__ (== operator). With frozen=True, __hash__ is also added." } ,
        retryQuestion: {
      "question": {
            "tr": "@dataclass ile tanımlanan bir sınıfta, varsayılan olarak eklenen __eq__ metodu neyi sağlar?",
            "en": "What does the __eq__ method, added by default in a @dataclass, provide?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Sınıfın hafızadaki adresini kontrol eder"
            },
            {
                  "id": "b",
                  "text": "Nesne içindeki tüm alanların değerlerinin eşitliğini karşılaştırır"
            },
            {
                  "id": "c",
                  "text": "Sadece sınıf isimlerinin eşitliğini kontrol eder"
            },
            {
                  "id": "d",
                  "text": "Nesnenin boş olup olmadığını denetler"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "@dataclass, __eq__ metodunu otomatik olarak ekleyerek, iki farklı nesne örneğinin aynı alana (field) sahip olup olmadığının '==' operatörü ile kolayca karşılaştırılmasını sağlar.",
            "en": "@dataclass automatically adds the __eq__ method, allowing two different instances to be easily compared for equality of their fields using the '==' operator."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // QA Topic — argparse (CLI Arguments)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'argparse — CLI Arguments', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🖥️', content: { tr: "argparse, komut satırından programına parametre göndermeni sağlar. 'python run_tests.py --browser chromium --headless --env staging' gibi. QA scriptlerini esnek ve CI/CD ile uyumlu hale getirir.", en: "argparse lets you pass parameters to your script from the command line. Like 'python run_tests.py --browser chromium --headless --env staging'. Makes QA scripts flexible and CI/CD compatible." } },
      { type: 'code', language: 'python', code: `import argparse

# Create the argument parser
parser = argparse.ArgumentParser(
    description="QA Test Runner — runs Playwright tests with configurable options"
)

# Required positional argument
parser.add_argument(
    "env",
    choices=["dev", "staging", "prod"],
    help="Target environment to test against"
)

# Optional arguments with defaults
parser.add_argument(
    "--browser",
    default="chromium",
    choices=["chromium", "firefox", "webkit"],
    help="Browser to run tests in (default: chromium)"
)

parser.add_argument(
    "--workers",
    type=int,
    default=1,
    help="Number of parallel workers (default: 1)"
)

parser.add_argument(
    "--headless",
    action="store_true",     # if flag present → True, absent → False
    help="Run in headless mode (no browser window)"
)

parser.add_argument(
    "--tags",
    nargs="+",               # accepts 1 or more values: --tags smoke login
    help="Test tags to run (e.g. --tags smoke regression)"
)

# Parse arguments
# In a real script: args = parser.parse_args()
# For demo, we parse a sample:
args = parser.parse_args(["staging", "--browser", "firefox",
                           "--workers", "4", "--headless",
                           "--tags", "smoke", "login"])

print(f"Environment: {args.env}")
print(f"Browser:     {args.browser}")
print(f"Workers:     {args.workers}")
print(f"Headless:    {args.headless}")
print(f"Tags:        {args.tags}")

# Usage in test script:
def run_tests(args):
    base_urls = {
        "dev":     "http://localhost:3000",
        "staging": "https://staging.example.com",
        "prod":    "https://example.com",
    }
    base_url = base_urls[args.env]
    print(f"\\nRunning {args.workers} worker(s) against {base_url}")
    print(f"Browser: {args.browser} | Headless: {args.headless}")

run_tests(args)` },
      { type: 'editor', lang: 'python', defaultCode: `import argparse

# Simulate a test runner script
parser = argparse.ArgumentParser(description="API Test Runner")

parser.add_argument("--base-url", default="https://automationexercise.com",
                    help="Base URL for API tests")
parser.add_argument("--timeout", type=int, default=30,
                    help="Request timeout in seconds")
parser.add_argument("--verbose", action="store_true",
                    help="Enable verbose output")
parser.add_argument("--output", choices=["json", "html", "console"],
                    default="console", help="Report output format")

# Simulate running: python test_runner.py --verbose --output html
args = parser.parse_args(["--verbose", "--output", "html", "--timeout", "60"])

print("Test Runner Config:")
print(f"  Base URL: {args.base_url}")
print(f"  Timeout:  {args.timeout}s")
print(f"  Verbose:  {args.verbose}")
print(f"  Output:   {args.output}")` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — CLI Arguments' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'CLI parsing kütüphanesi', en: 'CLI parsing library' }, java: 'Apache Commons CLI or picocli', python: 'argparse (built-in, no install)' },
        { concept: { tr: 'Argüman tanımlama', en: 'Define arguments' }, java: 'options.addOption("b", "browser", true, "desc")', python: 'parser.add_argument("--browser", ...)' },
        { concept: { tr: 'Flag (boolean)', en: 'Boolean flag' }, java: 'hasOption("headless")', python: 'action="store_true"' },
        { concept: { tr: 'Tip dönüşümü', en: 'Type conversion' }, java: 'Manual parseInt', python: 'type=int (automatic)' },
        { concept: { tr: 'Yardım mesajı', en: 'Help message' }, java: 'Manual or HelpFormatter', python: '--help auto-generated' },
      ]},
      { type: 'quiz', question: { tr: "argparse'te action='store_true' ne işe yarar?", en: "What does action='store_true' do in argparse?" }, options: [{ id: 'a', text: { tr: 'Argümana "true" string değeri verir', en: 'Gives the argument the string "true"' } }, { id: 'b', text: { tr: 'Flag mevsa True, yoksa False değerini atar — değer gerektirmez', en: 'Sets to True when flag is present, False when absent — no value required' } }, { id: 'c', text: { tr: 'Zorunlu argüman yapar', en: 'Makes the argument required' } }, { id: 'd', text: { tr: 'Argümanı true tipine çevirir', en: 'Converts argument to true type' } }], correct: 'b', explanation: { tr: "store_true: --headless yazarsan args.headless = True, yazmazsan False. Değer yazman gerekmez — flag'in varlığı yeterli. --headless true yazmak yanlıştır. Java'daki boolean flag'lere eşdeğer.", en: "store_true: if --headless is present, args.headless = True; if absent, False. No value needed — just the flag's presence. Writing --headless true is wrong. Equivalent to boolean flags in Java." } ,
        retryQuestion: {
      "question": {
            "tr": "argparse kütüphanesinde action='store_const' seçeneğinin temel amacı nedir?",
            "en": "What is the primary purpose of action='store_const' in the argparse library?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Belirli bir argüman verilmediğinde varsayılan bir değer atar",
                        "en": "Assigns a default value if the argument is not provided"
                  }
            },
            {
                  "id": "a",
                  "text": {
                        "tr": "Argüman kullanıldığında önceden tanımlanmış sabit bir değeri değişkene atar",
                        "en": "Assigns a predefined constant value to the variable when the argument is present"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Argümanı salt okunur (read-only) yapar",
                        "en": "Makes the argument read-only"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Kullanıcıdan bir girdi almayı zorunlu kılar",
                        "en": "Forces the user to provide an input"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "store_const, argüman komut satırında yazıldığında, belirtilen 'const' değerini değişkene atar. Özellikle `--verbose` gibi flag'lerin belirli bir sayısal değer (örneğin 1) almasını sağlamak için kullanılır.",
            "en": "store_const assigns the specified 'const' value to the variable when the argument is used in the command line. It is often used to assign a specific numeric value (e.g., 1) to flags like --verbose."
      }
}
},
    ],
  },

  // ── 5. QA USE CASES ─────────────────────────────────────────────────────────
  {
    title: '🧪 Python in QA — Real Automation Scenarios',
    blocks: [
      {
        type: 'pytest-execution-visual',
        titleEn: 'pytest Execution Flow — From Discovery to Report',
        titleTr: 'pytest Yürütme Akışı — Keşiften Rapora',
        tests: [
          { name: 'test_user_api_returns_200', result: 'pass' },
          { name: 'test_user_email_format_valid', result: 'pass' },
          { name: 'test_data_driven_login_csv', result: 'pass' },
          { name: 'test_retry_on_flaky_network', result: 'fail' },
          { name: 'test_compare_staging_vs_prod', result: 'pass' },
        ],
      },
      {
        type: 'simulation',
        scenario: 'pytest-interactive-run',
        icon: '🧪',
        title: { tr: 'pytest ile İnteraktif Test Çalıştırma', en: 'pytest Interactive Test Runner' },
        description: {
          tr: 'pytest test suite\'in çalıştırılma akışını, test keşfini (discovery), flaky testler için retry/rerun mekanizmasını ve HTML raporunun üretilmesini adım adım izle.',
          en: 'Watch how pytest discovers and runs tests, retries flaky tests, catches assertion failures, and generates an HTML test report.'
        },
        code: `def test_login_flaky_network():
    # Flaky test simulation (succeeds on retry)
    assert check_network_connection() == "OK"

def test_invalid_password_error():
    # Expected assertion failure
    assert get_error_message() == "Wrong password"`,
        language: 'python'
      },
      {
        type: 'http-flow-animation',
        method: 'GET',
        endpoint: '/users/1',
        dbQuery: 'SELECT id, name, email FROM users WHERE id = 1',
        statusCode: 200,
        expectedValue: '500',
        actualValue: '200',
      },
      { type: 'heading', text: 'Use Case 1: Parse JSON API Response & Assert Values' },
      {
        type: 'code',
        code: `import requests

def test_user_api():
    """Validate API response structure and data types."""
    response = requests.get(
        "https://jsonplaceholder.typicode.com/users/1",
        timeout=10
    )

    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

    data = response.json()

    # Assert required fields exist:
    assert "id"    in data, "Response missing 'id'"
    assert "name"  in data, "Response missing 'name'"
    assert "email" in data, "Response missing 'email'"

    # Assert correct data types:
    assert isinstance(data["id"],    int), "id must be integer"
    assert isinstance(data["name"],  str), "name must be string"

    # Assert business rules:
    assert data["id"] == 1
    assert "@" in data["email"], "email must contain @"

    print(f"OK: {data['name']} ({data['email']})")`,
      },
      { type: 'heading', text: 'Use Case 2: Data-Driven Tests from CSV' },
      {
        type: 'code',
        code: `import csv, pytest

def load_credentials(filepath: str) -> list:
    """Load test data from CSV for parametrize."""
    with open(filepath) as f:
        # CSV: username,password,expected_result
        return [(r["username"], r["password"], r["expected_result"])
                for r in csv.DictReader(f)]

@pytest.mark.parametrize(
    "username, password, expected",
    load_credentials("test_data/credentials.csv")
)
def test_login(username, password, expected, page):
    page.goto("/login")
    page.fill("#username", username)
    page.fill("#password", password)
    page.click("button[type='submit']")

    if expected == "PASS":
        assert page.url.endswith("/dashboard"), "Expected dashboard URL"
    else:
        assert page.locator(".error-msg").is_visible(), "Expected error message"`,
      },
      { type: 'heading', text: 'Use Case 3: Retry Decorator for Flaky Tests' },
      {
        type: 'code',
        code: `import functools, time

def retry(max_retries=3, delay=1.0, exceptions=(Exception,)):
    """Retry a function on specified exceptions with configurable delay."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_retries + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_retries:
                        raise           # exhausted retries
                    print(f"Attempt {attempt}/{max_retries} failed: {e}")
                    time.sleep(delay * attempt)   # exponential backoff
        return wrapper
    return decorator

@retry(max_retries=3, delay=1.0, exceptions=(ConnectionError, TimeoutError))
def fetch_auth_token() -> str:
    """Fetch auth token — may be slow on staging."""
    response = requests.post("/auth/token", json={"grant_type": "client_credentials"})
    response.raise_for_status()
    return response.json()["access_token"]`,
      },
      { type: 'heading', text: 'Use Case 4: Compare Two API Responses' },
      {
        type: 'code',
        code: `import requests

def compare_responses(url_v1: str, url_v2: str) -> dict:
    """Diff two API endpoints — returns dict of differences."""
    r1 = requests.get(url_v1).json()
    r2 = requests.get(url_v2).json()
    diffs = {}

    for key in set(r1.keys()) | set(r2.keys()):
        val1 = r1.get(key, "<MISSING>")
        val2 = r2.get(key, "<MISSING>")
        if val1 != val2:
            diffs[key] = {"v1": val1, "v2": val2}

    return diffs

diffs = compare_responses(
    "https://api.example.com/v1/config",
    "https://api.example.com/v2/config"
)

if diffs:
    print("Differences found between v1 and v2:")
    for field, values in diffs.items():
        print(f"  {field}: v1={values['v1']}  v2={values['v2']}")
else:
    print("APIs return identical responses")`,
      },
      { type: 'heading', text: 'Use Case 5: Pytest DB Fixture with Setup/Teardown' },
      {
        type: 'code',
        code: `import pytest, sqlite3

@pytest.fixture(scope="session")
def db():
    """Session-scoped SQLite DB — one connection for all tests."""
    conn = sqlite3.connect(":memory:")
    conn.execute("""CREATE TABLE orders (
        id     INTEGER PRIMARY KEY AUTOINCREMENT,
        user   TEXT    NOT NULL,
        amount REAL    NOT NULL,
        status TEXT    DEFAULT 'pending'
    )""")
    conn.commit()
    yield conn
    conn.close()

@pytest.fixture
def sample_order(db):
    """Insert a test order before each test, delete after."""
    cursor = db.execute(
        "INSERT INTO orders (user, amount, status) VALUES (?,?,?)",
        ("alice", 99.99, "pending")
    )
    db.commit()
    order_id = cursor.lastrowid
    yield order_id                 # test receives the order ID
    db.execute("DELETE FROM orders WHERE id = ?", (order_id,))
    db.commit()

def test_order_exists(db, sample_order):
    row = db.execute("SELECT status FROM orders WHERE id=?",
                     (sample_order,)).fetchone()
    assert row is not None
    assert row[0] == "pending"`,
      },
      { type: 'heading', text: 'Use Case 6: Validate Test Data with Regex' },
      {
        type: 'code',
        code: `import re, csv

VALIDATORS = {
    "email": re.compile(r'^[^@]+@[^@]+\\.[a-zA-Z]{2,}$'),
    "phone": re.compile(r'^[+]?[\\d\\s\\-()]{7,15}$'),
    "date":  re.compile(r'^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$'),
}

def validate_row(row: dict) -> list:
    errors = []
    for field, pattern in VALIDATORS.items():
        value = row.get(field, "")
        if not pattern.match(value):
            errors.append(f"Invalid {field}: '{value}'")
    return errors

# Validate entire CSV:
all_errors = []
with open("test_users.csv") as f:
    for i, row in enumerate(csv.DictReader(f), 1):
        row_errors = validate_row(row)
        if row_errors:
            all_errors.append({"row": i, "errors": row_errors})

if all_errors:
    for e in all_errors:
        print(f"Row {e['row']}: {', '.join(e['errors'])}")
else:
    print("All test data is valid")`,
      },
      { type: 'heading', text: 'Use Case 7: Generate Test Report with Timestamp' },
      {
        type: 'code',
        code: `import json
from datetime import datetime
from pathlib import Path

def generate_report(results: list, output_dir: str = "reports") -> str:
    Path(output_dir).mkdir(exist_ok=True)

    report = {
        "generated_at": datetime.now().isoformat(),
        "total":   len(results),
        "passed":  sum(1 for r in results if r["status"] == "PASS"),
        "failed":  sum(1 for r in results if r["status"] == "FAIL"),
        "skipped": sum(1 for r in results if r["status"] == "SKIP"),
        "results": results
    }
    if report["total"]:
        report["pass_rate"] = round(report["passed"] / report["total"] * 100, 1)

    filename = f"{output_dir}/report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(filename, "w") as f:
        json.dump(report, f, indent=2)

    print(f"Report: {filename} | Pass rate: {report.get('pass_rate', 0)}%")
    return filename`,
      },
      { type: 'heading', text: '🗂️ How pytest Finds and Injects Fixtures' },
      {
        type: 'visual', variant: 'flow',
        title: 'pytest Fixture Discovery & Injection Flow',
        note: 'Fixtures are discovered bottom-up: local conftest.py first, then parent folders, then built-ins like `page` and `tmp_path`.',
        steps: [
          { num: '1', label: 'Test file', desc: '@pytest.fixture or @pytest.mark.xxx in test_*.py', highlight: true },
          { num: '2', label: 'conftest.py (local)', desc: 'Same folder as the test — most specific' },
          { num: '3', label: 'conftest.py (parent)', desc: 'Parent folders searched upward' },
          { num: '4', label: 'Plugin fixtures', desc: 'pytest-playwright, pytest-django, etc.' },
          { num: '5', label: 'Built-in fixtures', desc: 'tmp_path, monkeypatch, capsys, caplog' },
          { num: '6', label: 'Inject & run', desc: 'Matched fixtures injected, test executes', highlight: true },
        ],
      },
      {
        type: 'comparison',
        left: {
          label: '❌ Anti-pattern: Manual Setup in Every Test',
          code: `def test_order_placed():
    db = sqlite3.connect(":memory:")
    db.execute("CREATE TABLE orders ...")
    db.execute("INSERT INTO orders ...")

    # actual test
    row = db.execute("SELECT ...").fetchone()
    assert row[0] == "pending"

    db.close()   # easy to forget!

def test_order_cancelled():
    db = sqlite3.connect(":memory:")  # duplicated!
    db.execute("CREATE TABLE orders ...")
    ...`,
          note: 'Repeated setup, easy to forget teardown, hard to maintain',
        },
        right: {
          label: '✅ Fixture: DRY, Automatic Teardown',
          code: `@pytest.fixture(scope="session")
def db():
    conn = sqlite3.connect(":memory:")
    conn.execute("CREATE TABLE orders ...")
    yield conn
    conn.close()  # auto teardown — always runs

@pytest.fixture
def sample_order(db):
    cid = db.execute("INSERT ...").lastrowid
    yield cid
    db.execute("DELETE FROM orders WHERE id=?", (cid,))

def test_order_placed(sample_order, db):
    row = db.execute("SELECT status FROM orders WHERE id=?",
                     (sample_order,)).fetchone()
    assert row[0] == "pending"   # clean, focused`,
          note: 'Setup once, inject everywhere, teardown guaranteed',
        },
      },
      {
        type: 'quiz',
        question: 'A pytest fixture decorated with scope="session" runs setup code how many times per test run?',
        options: [
          'Once per test function',
          'Once per test class',
          'Once per test file',
          'Once for the entire test session',
        ],
        correct: 3,
        explanation: 'scope="session" creates the fixture once for the entire pytest session and shares it across ALL tests. Use it for expensive resources like DB connections and browser instances. The teardown (after yield) runs once at the very end.',
      
        retryQuestion: {
      "question": "If you define a pytest fixture with scope=\"module\", how often is that fixture initialized?",
      "options": [
            {
                  "id": "a",
                  "text": "Once for the entire suite execution"
            },
            {
                  "id": "b",
                  "text": "Once per individual test function"
            },
            {
                  "id": "c",
                  "text": "Once for every Python test file (module)"
            },
            {
                  "id": "d",
                  "text": "Once for every test class defined"
            }
      ],
      "correct": "c",
      "explanation": "With scope=\"module\", the fixture is set up once per test file. Any test within that file can reuse the same instance, and the cleanup (teardown) runs after the last test in that module completes."
}
},
      { type: 'heading', text: '🚨 Common Errors & How to Fix Them' },
      {
        type: 'error-dictionary',
        framework: 'Selenium',
        errors: [
          {
            error: 'NoSuchElementException',
            fullMessage: 'selenium.common.exceptions.NoSuchElementException: Message: no such element: Unable to locate element',
            cause: { tr: 'Locator yanlış yazılmış, element henüz yüklenmemiş (dynamic content), ya da element başka bir iframe içinde.', en: 'Wrong locator, element not yet loaded (dynamic content), or element is inside an iframe.' },
            solution: { tr: '1) DevTools ile elementi kontrol et. 2) Explicit wait ekle. 3) iframe içindeyse driver.switch_to.frame() kullan.', en: '1) Inspect element in DevTools. 2) Add explicit wait. 3) Use driver.switch_to.frame() if inside iframe.' },
            codeWrong: `# WRONG — element may not be ready
driver.find_element(By.ID, "submit-btn").click()`,
            codeFixed: `# CORRECT — wait for element to be clickable
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, 10)         # wait up to 10 sec
btn = wait.until(
    EC.element_to_be_clickable((By.ID, "submit-btn"))
)
btn.click()`,
          },
          {
            error: 'StaleElementReferenceException',
            fullMessage: 'selenium.common.exceptions.StaleElementReferenceException: Message: stale element reference: element is not attached to the page document',
            cause: { tr: 'DOM yenilendi (sayfa reload, AJAX, React re-render) ve eski element referansı artık geçersiz.', en: 'The DOM was refreshed (page reload, AJAX, React re-render) and the old element reference is no longer valid.' },
            solution: { tr: 'Elementi tekrar bul (find_element çağrısını döngü içine al). Ya da her kullanımdan önce yeniden sorgula.', en: 'Re-find the element after the DOM changes. Wrap find_element in a retry loop or re-query before each use.' },
            codeFixed: `# CORRECT — re-find element each time
for item in driver.find_elements(By.CSS_SELECTOR, "li.product"):
    # DON\'T store the list, re-query inside the loop
    name = item.find_element(By.CLASS_NAME, "name").text
    print(name)`,
          },
          {
            error: 'TimeoutException',
            fullMessage: 'selenium.common.exceptions.TimeoutException: Message: Timeout waiting for condition',
            cause: { tr: 'WebDriverWait bekleme süresi doldu ama koşul gerçekleşmedi. Element hiç gelmedi ya da farklı bir locator.', en: 'WebDriverWait timed out before the condition was met. Element never appeared or locator is wrong.' },
            solution: { tr: '1) Bekleme süresini artır. 2) Locator\'ı DevTools\'da test et. 3) Network yavaşsa implicit wait de ekle.', en: '1) Increase timeout. 2) Test locator in DevTools. 3) Add implicit wait if network is slow.' },
          },
          {
            error: 'ElementClickInterceptedException',
            fullMessage: 'selenium.common.exceptions.ElementClickInterceptedException: Element <button> is not clickable at point (x,y) because another element obscures it',
            cause: { tr: 'Başka bir element (overlay, modal, cookie banner, navbar) tıklanmak istenen butonun üzerinde.', en: 'Another element (overlay, modal, cookie banner, sticky nav) is on top of the target element.' },
            solution: { tr: '1) Overlay\'i kapat/bekle. 2) Elemana scroll et. 3) JavaScript ile tıkla.', en: '1) Close/wait for the overlay. 2) Scroll element into view. 3) Use JavaScript click as last resort.' },
            codeFixed: `# Use JavaScript click as a last resort
driver.execute_script("arguments[0].click();", element)`,
          },
        ],
      },
      {
        type: 'error-dictionary',
        framework: 'pytest',
        errors: [
          {
            error: "fixture 'X' not found",
            fullMessage: "fixture 'driver' not found\n  available fixtures: ...",
            cause: { tr: 'Fixture conftest.py\'de tanımlanmamış ya da scope uyumsuz.', en: 'The fixture is not defined in conftest.py or the scope is incompatible.' },
            solution: { tr: 'conftest.py dosyasına @pytest.fixture ile fixture\'ı ekle. Test dosyasıyla aynı dizinde ya da üst dizinde olmalı.', en: 'Add the fixture to conftest.py with @pytest.fixture. The conftest.py must be in the same or parent directory as the test file.' },
          },
          {
            error: 'FAILED vs ERROR ayrımı',
            fullMessage: 'FAILED tests/test_login.py::test_login — AssertionError\nERROR tests/test_login.py::test_login — Exception',
            cause: { tr: 'FAILED = assertion başarısız (test çalıştı ama beklenen sonuç gelmedi). ERROR = exception fırlattı (test setup/teardown\'da ya da test içinde beklenmedik hata).', en: 'FAILED = assertion failed (test ran but expected result not met). ERROR = unexpected exception (in setup/teardown or test body).' },
            solution: { tr: 'Stack trace\'e bak: AssertionError = test logic hatası. Başka exception = kod/fixture hatası.', en: 'Check the stack trace: AssertionError = logic bug in test. Other exception = bug in code or fixture.' },
          },
        ],
      },
    ],
  },

  // ── 6. INTERVIEW Q&A ────────────────────────────────────────────────────────
  {
    title: '💼 Python Interview Questions & Answers',
    blocks: [
      { type: 'text', content: { tr: 'Model cevabı görmek için her soruya tıklayın. Zorluk düzeyine göre sıralanmıştır.', en: 'Click each question to expand the model answer. Organized by difficulty.' } },
      { type: 'subheading', text: '🟢 Basic Questions' },
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S1: Python ile Java arasındaki temel tip belirleme (typing) farkı nedir? Test otomasyonuna etkisi nasıldır?",
            "en": "Q1: What is the main typing difference between Python and Java? How does it affect test automation?"
      },
      "answer": {
            "tr": "Python dinamik tipli (dynamically typed) bir dildir; değişken tanımlarken tip belirtilmez ve tip çalışma zamanında (runtime) belirlenir. Java ise statik tiplidir (statically typed) ve derleme zamanında tip kontrolü yapar. Dinamik tipleme, otomasyon testlerini çok daha hızlı yazmayı sağlar; ancak çalışma zamanında tip hataları (TypeError) alma riskini artırır. Bunu önlemek için tip ipuçları (type hints) ve mypy gibi statik analiz araçları kullanılır.",
            "en": "Python is dynamically typed (types are inferred at runtime; no explicit declaration needed), whereas Java is statically typed (types checked at compile-time). In test automation, dynamic typing enables rapid scripting and less boilerplate. However, it increases the risk of runtime TypeErrors, which we mitigate using type hints and static analyzers like mypy."
      },
      "code": "# Python: dynamic typing\nx = 10\nx = \"Passed\"       # OK: variable type can change dynamically\n\n# Java: static typing (compile error if type changes)\n// int x = 10;\n// x = \"Passed\";   // Compile Error: incompatible types"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S2: Python'da list ile tuple arasındaki fark nedir? Selenium locator'larını tanımlarken hangisi tercih edilir?",
            "en": "Q2: What is the difference between a list and a tuple? Which is preferred for Selenium locators?"
      },
      "answer": {
            "tr": "List değiştirilebilir (mutable) bir yapıdır ve [] ile tanımlanır (eleman ekleme/silme yapılabilir). Tuple ise değiştirilemez (immutable) bir yapıdır ve () ile tanımlanır. Test otomasyonunda Selenium locator'ları gibi sabit kalması gereken verileri tanımlarken tuple tercih edilir. Bu, locator değerinin çalışma zamanında yanlışlıkla değiştirilmesini dil seviyesinde engeller. Java'daki karşılığı List.of(...) veya final List kullanımıdır.",
            "en": "A list is mutable (can be changed after creation) and uses []. A tuple is immutable (cannot be modified) and uses (). In test automation, tuples are preferred for defining locators (e.g., By.ID, \"submit\") to prevent accidental runtime modifications at the language level. Equivalent to Java's List.of(...) or final lists."
      },
      "code": "# List (mutable)\nresults = [\"PASS\", \"FAIL\"]\nresults.append(\"SKIP\")       # OK\n\n# Tuple (immutable)\nLOGIN_LOCATOR = (\"id\", \"username\")\n# LOGIN_LOCATOR[1] = \"email\" # TypeError: object does not support item assignment"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S3: Python'da None nedir? Java'daki null ile farkı nedir ve nasıl kontrol edilmelidir?",
            "en": "Q3: What is None in Python? How does it differ from null in Java and how should you check for it?"
      },
      "answer": {
            "tr": "None, Python'da bir değerin yokluğunu temsil eden özel bir singleton nesnesidir (NoneType tipindedir). Java'daki null bir referans yokluğu iken, None gerçek bir nesnedir. None kontrolü yapılırken her zaman \"is None\" veya \"is not None\" kimlik operatörleri kullanılmalıdır; \"== None\" kullanılmamalıdır. Çünkü \"==\" nesnenin __eq__ metodunu tetikler ve bu metod override edilmişse yanlış sonuç verebilir.",
            "en": "None is a singleton object in Python representing the absence of a value. Unlike Java's null (which is a reference pointing to nothing), None is a real object of NoneType. You should always check for None using identity operators \"is None\" or \"is not None\" rather than \"== None\", because \"==\" invokes __eq__ which could be overridden."
      },
      "code": "result = None\nif result is None:\n    print(\"No test results found\")\n\n# Avoid: result == None (style guide violation and risky if __eq__ is overridden)"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S4: == ile is operatörleri arasındaki fark nedir? Somut bir otomasyon örneğiyle açıklayın.",
            "en": "Q4: What is the difference between == and is? Explain with a concrete automation example."
      },
      "answer": {
            "tr": "\"==\" operatörü değer eşitliğini (value equality) kontrol eder (iki nesnenin içeriği aynı mı?). \"is\" operatörü ise referans/kimlik eşitliğini (identity) kontrol eder (iki değişken bellekte tamamen aynı nesneyi mi işaret ediyor?). Test doğrulamalarında (assertion) her zaman değer karşılaştırması yapan \"==\" kullanılmalıdır. \"is\" sadece None, True ve False gibi singleton değerleri kontrol etmek için kullanılır.",
            "en": "\"==\" checks value equality (do they contain the same data?), equivalent to Java's .equals(). \"is\" checks object identity (do they point to the exact same memory address?), equivalent to Java's \"==\". In assertions, always use \"==\". Use \"is\" only for singleton checks like None or booleans."
      },
      "code": "a = [\"test_login\", \"test_logout\"]\nb = [\"test_login\", \"test_logout\"]\nc = a\n\nprint(a == b)  # True  (same elements)\nprint(a is b)  # False (different objects in memory)\nprint(a is c)  # True  (same reference)"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S5: *args ve **kwargs ne anlama gelir? Test kütüphanelerinde nerede kullanılır?",
            "en": "Q5: What do *args and **kwargs mean? Where are they used in test libraries?"
      },
      "answer": {
            "tr": "*args, bir fonksiyona belirsiz sayıda pozisyonel argüman gönderilmesini sağlar ve bunları bir tuple olarak toplar. **kwargs ise belirsiz sayıda anahtar kelime (keyword) argümanı alır ve bunları bir dict olarak toplar. Test otomasyonunda, test metodlarını sarmalayan decorator'larda (örn. retry, loglama) orijinal parametreleri koruyarak iletmek için kullanılır.",
            "en": "*args collects variable positional arguments into a tuple. **kwargs collects variable keyword arguments into a dictionary. In test automation, they are extensively used in decorators (e.g., logging or retrying test cases) to forward arguments dynamically to the wrapped function."
      },
      "code": "def log_api_call(url, *args, **headers):\n    print(f\"Calling: {url}\")\n    print(f\"Params: {args}\")\n    print(f\"Headers: {headers}\")\n\nlog_api_call(\"https://api.com\", \"GET\", 200, Authorization=\"Bearer token\")"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S6: List comprehension nedir? Java karşılığı nedir ve ne zaman tercih edilmelidir?",
            "en": "Q6: What is a list comprehension? What is its Java equivalent and when should you use it?"
      },
      "answer": {
            "tr": "List comprehension, mevcut bir koleksiyondan yeni bir liste üretmek için kullanılan tek satırlı, kısa ve performanslı bir Python söz dizimidir: [ifade for x in iterable if koşul]. Java'daki karşılığı Streams API (.stream().filter().map().collect()) zinciridir. Basit filtreleme ve haritalama işlemleri için okunabilirliği artırdığı için tercih edilir.",
            "en": "List comprehension is a concise syntax to create a new list from an existing iterable: [expression for x in iterable if condition]. Its Java equivalent is the Streams API. Use it for straightforward loops that transform or filter data, as it is faster and more readable than standard loops."
      },
      "code": "results = [{\"name\": \"T1\", \"status\": \"FAIL\"}, {\"name\": \"T2\", \"status\": \"PASS\"}]\n\n# Get failed test names\nfailed_names = [r[\"name\"] for r in results if r[\"status\"] == \"FAIL\"]\nprint(failed_names)  # ['T1']"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S7: Python'da dict (sözlük) nedir? Listelerden farkı nedir ve ne zaman tercih edilir?",
            "en": "Q7: What is a dict (dictionary) in Python? How does it differ from a list and when should you prefer it?"
      },
      "answer": {
            "tr": "Dict, anahtar-değer (key-value) çiftlerini tutan sırasız (Python 3.7+ için ekleme sıralı) bir koleksiyondur. Listeler indis bazlı arama yaparken O(n) zaman harcayabilir. Dict ise hash tablosu kullandığı için anahtara göre aramayı O(1) zaman karmaşıklığı ile çok hızlı yapar. Test otomasyonunda test datalarını, konfigürasyonları veya API response gövdelerini eşleştirmek için tercih edilir. Java'daki HashMap karşılığıdır.",
            "en": "A dict is an unordered key-value mapping (insertion-ordered in Python 3.7+). Unlike lists which search by scanning elements in O(n) time, dict uses hash lookups in O(1) constant time. In test automation, it is preferred for managing configuration properties, test data fixtures, or parsing API responses. Java HashMap equivalent."
      },
      "code": "# Dict definition\nconfig = {\"env\": \"staging\", \"timeout\": 30}\nprint(config.get(\"env\"))  # staging\n\n# Fast check (O(1))\nif \"timeout\" in config:\n    print(\"Timeout configured\")"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S8: Python'da docstring nedir ve test otomasyon raporlarında nasıl kullanılır?",
            "en": "Q8: What is a docstring in Python and how is it used in test automation reports?"
      },
      "answer": {
            "tr": "Docstring, üçlü çift tırnak (\"\"\") ile fonksiyon, sınıf veya modüllerin hemen altına yazılan dokümantasyon yorumudur. Standart yorum satırlarından (#) farkı, runtime'da __doc__ niteliği ile erişilebilir olmasıdır. pytest ve Allure gibi raporlama araçları, test fonksiyonlarının docstring'lerini otomatik okuyarak test raporlarında \"Test Senaryosu Açıklaması\" olarak yansıtır.",
            "en": "A docstring is a documentation literal written with triple double quotes (\"\"\") directly under a function, class, or module. Unlike standard comments, it remains in memory and is accessible via the __doc__ attribute. Test runners like pytest and Allure automatically extract docstrings to serve as test case descriptions in HTML reports."
      },
      "code": "def test_user_login():\n    \"\"\"Verify that a registered user can successfully log in with valid credentials.\"\"\"\n    # Test code here\n    assert True\n\n# Accessing it programmatically:\n# print(test_user_login.__doc__)"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S9: Python'da yerel (local) ve global kapsam (scope) farkı nedir? Bir fonksiyon içinden global değişken nasıl güncellenir?",
            "en": "Q9: What is the difference between local and global scope in Python? How do you modify a global variable inside a function?"
      },
      "answer": {
            "tr": "Yerel kapsam (local scope) bir fonksiyon içinde tanımlanan değişkenleri kapsar; bu değişkenlere dışarıdan erişilemez. Global kapsam ise modül düzeyindedir. Bir fonksiyon içinden global bir değişkeni güncellemeye çalışırsanız, Python lokalde yeni bir değişken tanımlar. Global değişkeni güncellemek için fonksiyon içinde `global` anahtar kelimesi ile bildirilmesi gerekir. Java'daki sınıf seviyesindeki static değişken güncellemelerine benzer.",
            "en": "Local scope applies to variables defined inside a function (inaccessible from outside). Global scope applies to module-level variables. Attempting to modify a global variable inside a function will define a new local variable unless you declare it using the `global` keyword. Similar to modifying static class variables in Java."
      },
      "code": "status = \"READY\"\n\ndef start_test():\n    global status\n    status = \"RUNNING\"  # Modifies the global variable\n\nstart_test()\nprint(status)  # \"RUNNING\""
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S10: Python'da string formatlama yöntemleri nelerdir? En modern ve önerilen yöntem hangisidir?",
            "en": "Q10: What are the string formatting methods in Python? Which is the most modern and recommended method?"
      },
      "answer": {
            "tr": "Python'da üç ana yöntem vardır: % operatörü (eski C tarzı), .format() metodu (orta dönem) ve f-string (en modern, Python 3.6+). f-string (`f\"Metin {değişken}\"`), hem en hızlı çalışan hem de okunabilirliği en yüksek olan yöntemdir. Doğrudan süslü parantez içine Python kodu veya matematiksel işlemler yazılmasına izin verir. Java'daki `String.format()` veya + ile birleştirmeye göre çok daha temizdir.",
            "en": "Python has three main string formatting methods: % formatting (old C-style), .format() (legacy), and f-strings (modern, Python 3.6+). f-strings (e.g. f\"Text {variable}\") are the fastest and most readable method, allowing you to embed expressions directly in string literals. Much cleaner than Java's String.format()."
      },
      "code": "test_id = 404\nstatus = \"FAILED\"\n\n# f-string formatting (Recommended)\nlog_msg = f\"Test TC-{test_id} has finished with status: {status}\"\nprint(log_msg)"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S11: Python'da set (küme) nedir? Liste ve sözlüklerden farkı nedir?",
            "en": "Q11: What is a set in Python? How does it differ from lists and dictionaries?"
      },
      "answer": {
            "tr": "Set, sırasız (unordered) ve benzersiz (unique) elemanlar tutan bir koleksiyondur. Süslü parantezlerle {} tanımlanır. Sözlüklerden farkı, key-value çiftleri yerine sadece tekil değerler tutmasıdır. Listelerden farkı ise mükerrer (duplicate) elemana izin vermemesi ve arama işlemlerini O(1) hızında yapmasıdır. Test otomasyonunda test sonuçlarındaki mükerrer logları temizlemek veya benzersiz ID listelerini doğrulamak için kullanılır. Java'daki HashSet karşılığıdır.",
            "en": "A set is an unordered collection of unique elements defined using {}. It differs from dicts by not holding key-value pairs, and from lists by prohibiting duplicate values and providing O(1) membership lookups. In testing, it is used to filter duplicates or verify unique dataset fields. Java HashSet equivalent."
      },
      "code": "duplicated_logs = [\"401\", \"200\", \"401\", \"500\", \"200\"]\nunique_codes = set(duplicated_logs)\nprint(unique_codes)  # {'200', '401', '500'}\n\n# Fast check (O(1))\nprint(\"401\" in unique_codes)  # True"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S12: Python'da \"pass\" ifadesi ne işe yarar? Test otomasyonunda nerede kullanılır?",
            "en": "Q12: What does the \"pass\" statement do in Python? Where is it used in test automation?"
      },
      "answer": {
            "tr": "\"pass\" ifadesi, Python'da söz dizimsel olarak bir kod bloğu yazılması zorunlu olan ancak hiçbir işlem yapılmak istenmeyen yerlerde kullanılan bir yer tutucudur (null statement). Python boş kod bloklarına izin vermediği ve indentation hatası verdiği için pass kurtarıcıdır. Test otomasyonunda henüz içi doldurulmamış taslak test case'leri veya içi boş mock sınıfları tanımlarken kullanılır.",
            "en": "The \"pass\" statement is a null placeholder in Python. Since Python relies on indentation and does not allow empty code blocks, pass is used to satisfy syntax requirements without executing code. In test automation, it is used for writing skeleton/draft test cases, empty helper classes, or mock methods."
      },
      "code": "class MockDatabaseConnector:\n    def connect(self):\n        pass  # Will implement connection details later\n\ndef test_draft_feature():\n    pass  # Placeholder test to be coded"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S13: Python'daki \"del\" keyword'ünün amacı nedir? Java'daki çöp toplayıcı (Garbage Collector) ile nasıl karşılaştırılır?",
            "en": "Q13: What is the purpose of \"del\" keyword in Python? How does it compare to Java's Garbage Collector?"
      },
      "answer": {
            "tr": "\"del\" ifadesi, Python'da bir değişken referansını, liste elemanını veya sözlük anahtarını silmek için kullanılır. \"del x\" yazıldığında, değişkenin kendisine ait isim referansı silinir ve nesnenin referans sayacı (reference count) bir azaltılır. Referans sayacı 0'a düştüğünde Python'ın Garbage Collector'ı belleği temizler. Java'da nesneler doğrudan manuel silinemez, GC arka planda otomatik çalışır; Python'da ise del ile referansı manuel koparabiliriz.",
            "en": "The \"del\" keyword in Python deletes references to variables, list indices, or dict keys. Using \"del x\" removes the name binding and decrements the object's reference count. When the count reaches zero, Python's garbage collector reclaims the memory. Unlike Java, where you cannot manually delete references directly, Python allows reference removal."
      },
      "code": "# Delete list element by index\ntests = [\"T1\", \"T2\", \"T3\"]\ndel tests[1]\nprint(tests)  # ['T1', 'T3']\n\n# Delete global variable reference\nx = \"driver\"\ndel x\n# print(x)  # NameError: name 'x' is not defined"
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S14: Python'da dinamik tipleme (dynamic typing) ne demektir?",
            "en": "Q14: What does dynamic typing mean in Python?"
      },
      "answer": {
            "tr": "Değişken tipini siz belirtmezsiniz — Python çalışma zamanında anlar. x = 5 dersiniz, Python x'i int olarak işler. Sonra x = \"hello\" derseniz, x artık str olur. Java'da bu bir derleme hatası verirdi çünkü tip sabitlenir. Bu esneklik testleri hızlı yazmanı sağlar ama tip uyumsuzluklarına dikkat etmen gerekir.",
            "en": "You don't declare variable types — Python infers them at runtime. x = 5 makes x an int. Then x = \"hello\" makes it a str. In Java, this would be a compile error because the type is fixed. This flexibility lets you write tests fast, but you need to watch for type mismatches."
      }
},
      {
      "type": "qa",
      "level": "basic",
      "question": {
            "tr": "S15: Python'da truthy/falsy kavramını açıklayın ve QA'da ne zaman kullanışlıdır?",
            "en": "Q15: Explain Python's truthy/falsy concept and when it's useful in QA."
      },
      "answer": {
            "tr": "Herhangi bir Python değeri bool'a dönüştürülebilir. 0, None, \"\", [], {}, () False'tur; geri kalanlar True'dur. QA'da: \"if errors:\" veya \"if response.json():\" şeklinde kullanılır — Java'daki \"if (errors != null && !errors.isEmpty())\" yerine çok daha kısadır.",
            "en": "Any Python value can be coerced to bool. 0, None, \"\", [], {}, () are False; everything else True. In QA: \"if errors:\" or \"if response.json()\" is much shorter than Java's \"if (errors != null && !errors.isEmpty())\"."
      }
},
      { type: 'subheading', text: '🟡 Intermediate Questions' },
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S16: Decorator nedir ve nasıl yazılır? Test otomasyonunda gerçek bir kullanım örneği verin.",
            "en": "Q16: What is a decorator and how do you write one? Give a real test automation example."
      },
      "answer": {
            "tr": "Decorator, bir fonksiyonun kodunu değiştirmeden ona ek özellikler kazandırmak için kullanılan `@` söz dizimli bir tasarım kalıbıdır. Arka planda bir fonksiyonu girdi olarak alıp yeni bir wrapper fonksiyon döndürür. Test otomasyonunda loglama, test süresi ölçme veya başarısız testleri otomatik yeniden deneme (retry) gibi çapraz kesen kaygıları (cross-cutting concerns) çözmek için kullanılır. Java'daki karşılığı Spring AOP (Aspects) veya proxy sınıflarıdır.",
            "en": "A decorator is a design pattern represented by `@` that wraps a function to extend its behavior without modifying the original code. In test automation, decorators are commonly used for logging, measurement of test execution times, or retrying failed tests. Java equivalent is Spring AOP or proxy wrappers."
      },
      "code": "import functools, time\n\ndef log_test(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f\"--- Starting test: {func.__name__} ---\")\n        start = time.time()\n        res = func(*args, **kwargs)\n        print(f\"--- Finished test: {func.__name__} in {time.time()-start:.2f}s ---\")\n        return res\n    return wrapper\n\n@log_test\ndef test_payment():\n    time.sleep(0.5)"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S17: Pytest fixture scope'larını açıklayın. Hangi scope ne zaman tercih edilmelidir?",
            "en": "Q17: Explain pytest fixture scopes. Which scope should be chosen when?"
      },
      "answer": {
            "tr": "pytest fixture scope'ları, fixture ömrünü ve paylaşım düzeyini belirler: (1) function (varsayılan): Her test fonksiyonu öncesi ve sonrası çalışır (yüksek izolasyon). (2) class: Her test sınıfı için bir kez. (3) module: Her python test dosyası (.py) için bir kez. (4) session: Tüm test çalıştırması boyunca sadece bir kez. DB bağlantıları veya WebDriver instance başlatma gibi maliyetli işlemler için \"session\" veya \"module\" scope tercih edilerek test hızı artırılır.",
            "en": "pytest fixture scopes define the lifecycle of setup/teardown resources: (1) function (default): runs for every single test. (2) class: runs once per test class. (3) module: runs once per python file (.py). (4) session: runs once for the entire test run. Use \"session\" for expensive operations like spawning browser drivers or connecting databases to speed up test execution."
      },
      "code": "# Database connection fixture shared across all test files\n@pytest.fixture(scope=\"session\")\ndef db_conn():\n    conn = connect_db()\n    yield conn\n    conn.close()  # runs once at the very end of the test execution"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S18: Test otomasyonunda exception handling (hata yönetimi) nasıl yapılır? \"except:\" kullanımı neden risklidir?",
            "en": "Q18: How do you handle exceptions in test automation? Why is generic \"except:\" risky?"
      },
      "answer": {
            "tr": "Hata yönetimi try/except/finally bloklarıyla yapılır. Testlerde network veya element bulunamama hatalarını yakalamak için try/except kullanılır; veritabanı veya tarayıcı kapatma gibi temizlik kodları finally bloğuna yazılır. \"except:\" (spesifik hata belirtmeden) kullanımı çok risklidir çünkü KeyboardInterrupt, AssertionError gibi testin başarısız olmasını veya durmasını gerektiren kritik hataları da yakalayıp yutar, debug yapmayı zorlaştırır.",
            "en": "Exceptions are handled via try/except/finally blocks. Teardown tasks are placed in finally to guarantee execution. Generic \"except:\" is risky because it catches and swallows all exceptions — including KeyboardInterrupt or AssertionError — hiding real test failures and blocking debugging."
      },
      "code": "from selenium.common.exceptions import TimeoutException\n\ntry:\n    element = wait.until(EC.presence_of_element_located((By.ID, \"alert\")))\nexcept TimeoutException:\n    print(\"Optional alert did not appear, continuing test...\")\nfinally:\n    driver.quit()  # Always close driver"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S19: Python'da instance, class ve static metodlar arasındaki farklar nelerdir? Otomasyonda neye göre seçilir?",
            "en": "Q19: What is the difference between instance, class, and static methods? How are they chosen in automation?"
      },
      "answer": {
            "tr": "Instance metodlar normal sınıf metodlarıdır, \"self\" parametresi alır ve nesne durumuna (instance state) erişir. Class metodlar (@classmethod), \"cls\" parametresi alır ve sınıf durumuna erişir; genellikle alternatif constructor oluşturmak için kullanılır. Static metodlar (@staticmethod) ise sınıf veya nesne durumuna erişmez, bağımsız bir yardımcı fonksiyondur. Otomasyonda Page Object sınıflarında genelde instance; konfigürasyon/API client gibi yardımcı araçlarda static metodlar seçilir.",
            "en": "Instance methods take \"self\" and access instance variables. Class methods (@classmethod) take \"cls\" and access class variables (often used for custom builders). Static methods (@staticmethod) do not access self/cls and behave like plain functions inside class namespaces. In automation, Page Objects use instance methods, while helper classes use static methods."
      },
      "code": "class APIClient:\n    def __init__(self, token):\n        self.token = token  # Instance state\n\n    def get_data(self):\n        return f\"Headers: Bearer {self.token}\"  # Instance method\n\n    @staticmethod\n    def validate_url(url):\n        return url.startswith(\"https\")  # Static method (utility)"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S20: Python ile modern bir test otomasyon projesinin klasör yapısı nasıl olmalıdır?",
            "en": "Q20: How should you structure a modern Python test automation project?"
      },
      "answer": {
            "tr": "Modern bir Python otomasyon projesi şu katmanları içerir: pages/ (Sayfa nesneleri, POM), tests/ (pytest test dosyaları), conftest.py (ortak fixture ve kancalar), config/ (.env ve konfigürasyon sınıfları), utils/ (API ve veritabanı yardımcıları), requirements.txt (bağımlılık yönetimi) ve reports/ (test çıktıları). Bu yapı kod tekrarını önler (DRY), bakım maliyetlerini azaltır ve CI/CD süreçleriyle kolayca entegre olur.",
            "en": "A standard directory layout: pages/ (POM classes), tests/ (pytest files), conftest.py (shared fixtures), config/ (.env and parser classes), utils/ (DB/API helpers), requirements.txt (dependencies), and reports/. This keeps the framework modular, compliant with DRY, and easily integrable into CI/CD."
      },
      "code": "my_framework/\n├── config/\n│   └── settings.py\n├── pages/\n│   ├── base_page.py\n│   └── login_page.py\n├── tests/\n│   ├── conftest.py\n│   └── test_auth.py\n└── requirements.txt"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S21: Python'da sığ kopyalama (copy) ile derin kopyalama (deepcopy) arasındaki fark nedir?",
            "en": "Q21: What is the difference between shallow copy (copy) and deep copy (deepcopy) in Python?"
      },
      "answer": {
            "tr": "Sığ kopyalama (`copy.copy()`), nesnenin kendisini kopyalar ancak içindeki iç içe geçmiş (nested) nesnelerin referanslarını kopyalar (yani alt nesneler orijinaliyle paylaşılır). Derin kopyalama (`copy.deepcopy()`) ise nesneyi ve içindeki tüm alt nesneleri özyinelemeli olarak tamamen kopyalar, hafızada bağımsız yeni nesneler oluşturur. Test otomasyonunda şablon bir test datası üzerinden veri türetirken alt nesnelerin bozulmaması için deepcopy tercih edilir.",
            "en": "Shallow copy (`copy.copy()`) duplicates the top-level object but references the nested child elements from the original. Deep copy (`copy.deepcopy()`) recursively clones the parent and all nested objects, creating completely independent memory addresses. In testing, use deepcopy when generating variants of template test datasets."
      },
      "code": "import copy\n\noriginal = [[1, 2], [3, 4]]\nshallow = copy.copy(original)\ndeep = copy.deepcopy(original)\n\noriginal[0][0] = 99\nprint(shallow[0][0])  # 99 (affected by shallow reference!)\nprint(deep[0][0])     # 1  (isolated copy)"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S22: Python'da dunder (double underscore) metodları nedir? __init__ ve __str__ metodlarını açıklayın.",
            "en": "Q22: What are dunder (double underscore) methods in Python? Explain __init__ and __str__."
      },
      "answer": {
            "tr": "Dunder metodları (magic methods), Python'da çift alt çizgiyle başlayan ve biten, belirli dil işlemlerinde (aritmetik işlemler, stringe dönüştürme, karşılaştırma) otomatik tetiklenen özel metodlardır. `__init__`, bir sınıftan nesne üretildiğinde çağrılan constructor (kurucu) metodudur. `__str__` ise nesne `print()` veya `str()` ile çağrıldığında okunabilir bir string çıktısı vermesini sağlar (Java'daki toString() karşılığıdır).",
            "en": "Dunder (double underscore) methods, or magic methods, are built-in methods called implicitly by Python operations. `__init__` acts as the object constructor. `__str__` defines the human-readable string representation of the object, equivalent to Java's `toString()` method."
      },
      "code": "class TestCase:\n    def __init__(self, name, priority):\n        self.name = name\n        self.priority = priority\n\n    def __str__(self):\n        return f\"TestCase: {self.name} [Priority: {self.priority}]\"\n\ntc = TestCase(\"LoginTest\", \"High\")\nprint(tc)  # Prints: TestCase: LoginTest [Priority: High]"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S23: Python'da JSON verileriyle nasıl çalışılır? json.loads() ile json.dumps() farkı nedir?",
            "en": "Q23: How do you work with JSON data in Python? What is the difference between json.loads() and json.dumps()?"
      },
      "answer": {
            "tr": "Python yerleşik \"json\" modülünü kullanır. `json.loads()`, bir JSON string'ini parse ederek Python dictionary veya list yapısına dönüştürür (De-serialization). `json.dumps()` ise Python dictionary veya listesini JSON formatında bir string'e dönüştürür (Serialization). API test otomasyonunda requests ile gönderilen payload'ları oluştururken dumps, response gövdelerini parse ederken loads kullanılır.",
            "en": "Python handles JSON via the built-in \"json\" module. `json.loads()` deserializes a JSON string into a Python dictionary/list. `json.dumps()` serializes a Python dictionary/list into a JSON string. In API test automation, dumps formats payload strings and loads parses responses."
      },
      "code": "import json\n\n# json.loads: String to dict\njson_str = '{\"status\": \"PASS\", \"duration\": 120}'\ndata = json.loads(json_str)\nprint(data[\"status\"])  # PASS\n\n# json.dumps: Dict to String\npayload = {\"test\": \"login\", \"passed\": True}\npayload_str = json.dumps(payload)\nprint(type(payload_str))  # <class 'str'>"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S24: yield anahtar kelimesi nedir? pytest fixture'larında setup ve teardown işlemlerini nasıl yönetir?",
            "en": "Q24: What is the yield keyword? How does it manage setup and teardown inside pytest fixtures?"
      },
      "answer": {
            "tr": "`yield`, bir fonksiyonu generator'a çeviren ve değeri döndürüp fonksiyon durumunu donduran bir kelimedir. pytest fixture'larında yield, setup (kurulum) ile teardown (temizlik) kodlarını ayırmak için kullanılır. yield satırına kadar olan kodlar testten ÖNCE (setup) çalışır. yield değeri teste iletir ve duraklar. Test başarıyla tamamlansa da çökmüş olsa da, testten SONRA (teardown) yield altındaki kodlar çalışır.",
            "en": "`yield` returns a value from a generator and pauses its execution. In pytest fixtures, it divides setup and teardown logic. Code before yield executes BEFORE the test runs (setup). yield yields the resource to the test. Code after yield executes AFTER the test finishes (teardown), guaranteed."
      },
      "code": "@pytest.fixture\ndef browser():\n    # SETUP\n    driver = webdriver.Chrome()\n    yield driver  # hand over control to test\n    # TEARDOWN\n    driver.quit()  # executed after the test finishes"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S25: Python'da list dilimleme (slicing) nasıl çalışır? [::2] veya [-1] ne yapar?",
            "en": "Q25: How does list slicing work in Python? What does [::2] or [-1] do?"
      },
      "answer": {
            "tr": "Dilimleme, `liste[başlangıç:bitiş:adım]` formatında bir listenin alt kümesini kopyalar. `[-1]`, listenin son elemanını döndürür. `[::2]` ise en baştan en sona ikişer adım atlayarak her ikinci elemanı alır. Otomasyonda test log dosyalarını sondan okumak (`[-10:]` ile son 10 satırı alma) veya veri setlerinden örnekleme yapmak için sıkça kullanılır. Java'da bunun için alt listeler oluşturmak (subList) gerekir.",
            "en": "Slicing copies a sub-segment using `list[start:stop:step]` syntax. `[-1]` accesses the last element directly. `[::2]` extracts every second element from start to finish. In automation, it is handy for fetching recent log rows (`logs[-10:]`) or sampling test records. Java requires subList boilerplate."
      },
      "code": "cases = [\"T1\", \"T2\", \"T3\", \"T4\", \"T5\"]\n\nprint(cases[-1])    # T5 (last element)\nprint(cases[1:4])   # ['T2', 'T3', 'T4'] (index 1 to 3)\nprint(cases[::2])   # ['T1', 'T3', 'T5'] (every second element)"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S26: Lambda fonksiyonu nedir? Test otomasyonunda (örneğin Selenium beklemelerinde) nerede kullanılır?",
            "en": "Q26: What is a lambda function? Where is it used in test automation (e.g. Selenium waits)?"
      },
      "answer": {
            "tr": "Lambda, tek satırlık ve isimsiz (anonymous) küçük fonksiyonlar tanımlamak için kullanılan bir yapıdır. `lambda argümanlar: ifade` şeklinde yazılır. Test otomasyonunda özellikle Selenium WebDriverWait kullanırken, belirli bir durumun gerçekleşmesini (örneğin bir elementin özniteliğinin değişmesi) beklemek için kısa süreli koşul fonksiyonu olarak kullanılır.",
            "en": "A lambda is an anonymous, single-line function defined as `lambda args: expression`. In test automation, it is commonly used with Selenium's WebDriverWait to declare inline conditions (e.g. waiting for a specific attribute value) without writing full function definitions."
      },
      "code": "# Wait until page title changes to \"Dashboard\"\nwait = WebDriverWait(driver, 10)\nwait.until(lambda d: d.title == \"Dashboard\")\n\n# Sort test results by duration key\nresults = [{\"name\": \"T1\", \"time\": 200}, {\"name\": \"T2\", \"time\": 50}]\nresults.sort(key=lambda x: x[\"time\"])"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S27: Python'da bir modül (module) ile paket (package) arasındaki fark nedir?",
            "en": "Q27: What is the difference between a module and a package in Python?"
      },
      "answer": {
            "tr": "Modül, `.py` uzantılı tek bir Python kod dosyasıdır. Paket ise içinde birden fazla modül ve dizin barındıran ve Python'ın bunu bir paket olarak algılamasını sağlayan (eski sürümlerde zorunlu, yenilerde opsiyonel olan) `__init__.py` dosyasını içeren klasör yapısıdır. Otomasyonda pages/ klasörü bir paket, altındaki login_page.py ise bir modüldür.",
            "en": "A module is a single Python file (.py). A package is a directory structure containing multiple modules and an optional `__init__.py` file (mandatory in older Python versions) that namespaces the directory. In automation frameworks, pages/ behaves as a package and login_page.py acts as a module."
      },
      "code": "# Importing a function from a module inside a package\n# Structure: pages/login_page.py -> login()\nfrom pages.login_page import login"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S28: pytest ile testleri paralel olarak nasıl çalıştırırsınız? Çakışmaları önlemek için ne yapmalısınız?",
            "en": "Q28: How do you run tests in parallel using pytest? How do you prevent conflicts?"
      },
      "answer": {
            "tr": "pytest testlerini paralel koşturmak için `pytest-xdist` eklentisi kullanılır (`pytest -n auto` veya `pytest -n 4` komutuyla). Paralel çalışmada paylaşılan kaynak (veritabanı, tekil test kullanıcıları) çakışmalarını önlemek için: (1) Her testin kendi izole test verisini üretmesi sağlanmalı, (2) Fixture scope'ları doğru kurgulanmalı ve (3) WebDriver oturumları thread-safe şekilde tasarlanmalıdır.",
            "en": "To execute tests concurrently, install and use the `pytest-xdist` plugin with the command `pytest -n auto` (or specify workers: `pytest -n 4`). To avoid parallel conflicts: (1) Ensure test data isolation, (2) check fixture lifetimes, and (3) verify that driver instances are thread-safe and isolated."
      },
      "code": "# Install pytest-xdist: pip install pytest-xdist\n# CLI execution using 4 parallel workers:\n# pytest -n 4"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S29: conftest.py dosyasının pytest'teki amacı nedir? Java test kütüphanelerindeki karşılığı nedir?",
            "en": "Q29: What is the purpose of conftest.py in pytest? What is its Java equivalent?"
      },
      "answer": {
            "tr": "`conftest.py`, pytest tarafından otomatik olarak algılanan ve içine yazılan ortak fixture'ların, hook'ların (kancalar) ve eklentilerin tüm test dosyaları tarafından import edilmeden paylaşılmasını sağlayan özel bir konfigürasyon dosyasıdır. Java JUnit/TestNG dünyasında doğrudan bir dosya karşılığı yoktur; bunun yerine ortak BaseTest sınıfları veya Test Listener'lar yazılır.",
            "en": "`conftest.py` is a special pytest file used to share setup fixtures, command-line hook definitions, and helper plug-ins across test files without explicit imports. It has no direct file counterpart in JUnit/TestNG; Java developers write BaseTest classes or Listener hooks instead."
      },
      "code": "# Defined inside conftest.py:\n@pytest.fixture\ndef api_token():\n    return \"secret-token\"\n\n# Any test file in the directory can use api_token directly:\n# def test_get_profile(api_token): ..."
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S30: pytest'te test parametrizasyonu (@pytest.mark.parametrize) nedir? Neden tercih edilir?",
            "en": "Q30: What is test parametrization (@pytest.mark.parametrize) in pytest? Why is it preferred?"
      },
      "answer": {
            "tr": "Parametrizasyon, aynı test fonksiyonunu farklı girdi ve beklenen çıktılardan oluşan veri kümeleriyle tekrar tekrar çalıştırmayı sağlayan bir özelliktir. Kod tekrarını önler (DRY) ve test kapsamını artırır. Bir test verisi kümesindeki tek bir satır başarısız olsa bile diğer parametreler etkilenmez ve bağımsız olarak koşmaya devam eder. Java TestNG'deki @DataProvider karşılığıdır.",
            "en": "Parametrization runs the same test logic multiple times with different inputs and expected outputs. It adheres to DRY principles and scales test coverage. If one dataset fails, the others continue running independently. Java TestNG DataProvider equivalent."
      },
      "code": "@pytest.mark.parametrize(\"username,password,expected_error\", [\n    (\"invalid_user\", \"password123\", \"User not found\"),\n    (\"admin\", \"wrong_pass\", \"Invalid credentials\"),\n    (\"\", \"pass\", \"Username cannot be empty\")\n])\ndef test_login_failures(username, password, expected_error):\n    # execute login and assert error message\n    pass"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S31: \"requests\" kütüphanesi nedir? Bir API response'unun durum kodunu ve JSON içeriğini nasıl doğrularsınız?",
            "en": "Q31: What is the \"requests\" library? How do you assert the status code and JSON body of an API response?"
      },
      "answer": {
            "tr": "requests, Python'da HTTP istekleri göndermek için kullanılan en popüler kütüphanedir. Oldukça temiz ve okunabilir bir API sunar. Bir API çağrısının sonucunu doğrulamak için `response.status_code` ile durum kodu kontrol edilir; `response.json()` metoduyla da response gövdesi bir Python dict/list nesnesine dönüştürülerek assert edilir. Java REST Assured karşılığıdır.",
            "en": "requests is the most popular Python HTTP library. To validate API responses, check `response.status_code` and decode JSON payloads using `response.json()` to assert fields as native Python dicts. Equivalent to Java REST Assured."
      },
      "code": "import requests\n\nresponse = requests.get(\"https://api.com/users/1\")\nassert response.status_code == 200\n\ndata = response.json()\nassert data[\"username\"] == \"admin\"\nassert \"email\" in data"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S32: RegEx kütüphanesindeki re.match() ile re.search() arasındaki fark nedir? Otomasyonda ne zaman kullanılır?",
            "en": "Q32: What is the difference between re.match() and re.search() in RegEx? When to use in automation?"
      },
      "answer": {
            "tr": "`re.match()`, düzenli ifadenin (RegEx) string'in en başından başlayarak eşleşip eşleşmediğini kontrol eder. `re.search()` ise string'in herhangi bir yerinde eşleşme arar. Test otomasyonunda dinamik olarak üretilen onay kodlarını (OTP), e-posta formatlarını, fatura numaralarını veya veritabanı log formatlarını doğrulamak için sıkça kullanılır.",
            "en": "`re.match()` checks for a regex match only at the very beginning of a string. `re.search()` scans the entire string looking for the first location where a match occurs. In automation, it is used to extract dynamic OTP codes, validate email formats, or check logs."
      },
      "code": "import re\n\nlog_line = \"ERROR: Connection timeout on port 8080\"\n\n# re.match starts at index 0 (Returns None because log starts with E, not C)\nprint(re.match(r\"Connection\", log_line))  # None\n\n# re.search scans the string (Finds the match)\nmatch = re.search(r\"port (\\d+)\", log_line)\nprint(match.group(1))  # 8080"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S33: Python otomasyon projelerinde farklı test ortamlarının konfigürasyonları (dev, staging, prod) nasıl yönetilir?",
            "en": "Q33: How do you manage configurations for different test environments (dev, staging, prod) in Python?"
      },
      "answer": {
            "tr": "En yaygın yöntem, ortam değişkenlerini `.env` dosyalarında tutmak ve bunları `python-dotenv` kütüphanesiyle okumaktır. pytest ile çalışırken komut satırından `--env` argümanı eklenerek conftest.py içinde konfigürasyon dinamik olarak yüklenir (örn: dev.json veya staging.json okunur). Java dünyasında bu işlem maven profile'ları veya spring profiles (application.yml) ile yönetilir.",
            "en": "The industry standard is storing environment variables in a `.env` file and reading them using `python-dotenv`. With pytest, you can register a custom `--env` CLI option in conftest.py to load staging or production configs dynamically. Equivalent to Maven profiles or Spring profiles."
      },
      "code": "# env_config.py\nimport os\nfrom dotenv import load_dotenv\n\nload_dotenv()  # loads .env file\nBASE_URL = os.getenv(\"BASE_URL\", \"https://dev.api.com\")\nTIMEOUT = int(os.getenv(\"TIMEOUT\", \"30\"))"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S34: Sözlük kapsamı (dictionary comprehension) nedir? QA veri hazırlık aşamasında nasıl kullanılır?",
            "en": "Q34: What is a dictionary comprehension? How is it used in QA test data setup?"
      },
      "answer": {
            "tr": "Dictionary comprehension, mevcut bir koleksiyondan hızlıca yeni bir sözlük (dict) oluşturmaya yarayan tek satırlı bir Python söz dizimidir: `{key_ifadesi: value_ifadesi for x in iterable if koşul}`. Test otomasyonunda ham verileri (örn: bir API listesinden gelen kullanıcı nesnelerini) test doğrulamalarında kolayca sorgulamak amacıyla ID-nesne eşleştirmesi şeklinde indekslemek için kullanılır.",
            "en": "Dict comprehension creates a new dictionary from an iterable: `{key: value for x in iterable if condition}`. In test automation, it is heavily used to index raw API responses or database row lists into quick-lookup mappings (e.g. mapping user IDs to profiles)."
      },
      "code": "raw_users = [{\"id\": 101, \"name\": \"Bob\"}, {\"id\": 102, \"name\": \"Alice\"}]\n\n# Index users by ID for O(1) lookups in test assertions\nuser_map = {u[\"id\"]: u[\"name\"] for u in raw_users}\nprint(user_map)  # {101: 'Bob', 102: 'Alice'}\nprint(user_map[101])  # 'Bob'"
},
      {
      "type": "qa",
      "level": "intermediate",
      "question": {
            "tr": "S35: \"pathlib\" modülü nedir? Neden eski \"os.path\" yerine tercih edilmelidir?",
            "en": "Q35: What is the \"pathlib\" module? Why should it be preferred over legacy \"os.path\"?"
      },
      "answer": {
            "tr": "`pathlib`, dosya yolu işlemlerini işletim sisteminden bağımsız (cross-platform), nesne yönelimli (OOP) ve güvenli bir şekilde yapmayı sağlayan modern bir standart kütüphanedir. Eski `os.path` kütüphanesi yolları düz string olarak ele alır ve Windows (\\) ile Mac/Linux (/) slash uyumsuzluklarında kolayca hata üretebilir. `pathlib.Path` nesneleri ise bu slash farklılıklarını arka planda otomatik yönetir.",
            "en": "`pathlib` is a modern, object-oriented module for filesystem path operations. Legacy `os.path` treats paths as raw strings, making them prone to slash syntax errors between Windows (\\\\) and Unix (/). `pathlib.Path` objects resolve these platform differences automatically."
      },
      "code": "from pathlib import Path\n\n# Combine directory paths safely (slash division operator /)\nproject_root = Path(__file__).resolve().parent.parent\ndata_file = project_root / \"test_data\" / \"users.csv\"\n\nprint(data_file.exists())  # True/False (works on Windows & Linux)"
},
      { type: 'subheading', text: '🔴 Advanced Questions' },
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S36: Generator nedir? Büyük test log dosyalarını okurken veya veri üretirken test otomasyonunda neden tercih edilir?",
            "en": "Q36: What is a generator? Why is it preferred in test automation when reading large log files or generating data?"
      },
      "answer": {
            "tr": "Generator, belleğe (RAM) tüm elemanları tek seferde yüklemek yerine, \"yield\" ifadesiyle her seferinde tek bir eleman üreten (lazy evaluation) özel bir fonksiyon / yineleyicidir. Test otomasyonunda 10GB boyutunda bir log dosyasını satır satır analiz ederken veya test verisi üretirken belleği tüketmemek için kullanılır. Java dünyasındaki karşılığı Iterator veya Custom Iterable sınıfları yazmaktır.",
            "en": "A generator is a special function that yields values one at a time using the \"yield\" keyword, instead of loading the entire list into RAM (lazy evaluation). In test automation, generators prevent OutOfMemory errors when parsing gigabytes of log files or spawning massive test datasets. Java equivalent is implementing custom Iterators."
      },
      "code": "def log_reader(file_path):\n    with open(file_path, \"r\") as f:\n        for line in f:\n            if \"ERROR\" in line:\n                yield line.strip()  # lazy output\n\n# Memory footprint is constant regardless of file size\nfor err_log in log_reader(\"huge_run.log\"):\n    print(err_log)"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S37: Kararsız (flaky) testler için yeniden deneme (retry) decorator'ı arka planda nasıl çalışır?",
            "en": "Q37: How does a retry decorator for flaky tests work behind the scenes?"
      },
      "answer": {
            "tr": "Yeniden deneme decorator'ı, test fonksiyonunu bir wrapper içine alır ve test gövdesini bir try-except bloğu ile döngü (loop) içinde çalıştırır. Test hata fırlatırsa (AssertionError veya WebDriverException), belirlenen maksimum deneme sayısına ulaşılana kadar hata yutulur ve araya bekleme (delay) eklenerek test tekrar çağrılır. Maksimum denemede de başarısız olursa son fırlatılan hata dışarıya fırlatılır.",
            "en": "A retry decorator wraps the test case, executing it inside a try-except statement wrapped in a loop. If a failure (AssertionError/WebDriverException) is caught, the error is suppressed, it pauses for a delay, and retries. If the maximum attempt count is reached, it bubbles the last exception up."
      },
      "code": "import time, functools\n\ndef retry_test(max_attempts=3, delay=1):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            attempts = 0\n            while attempts < max_attempts:\n                try:\n                    return func(*args, **kwargs)\n                except Exception as e:\n                    attempts += 1\n                    if attempts == max_attempts:\n                        raise e  # Bubble up on last failure\n                    time.sleep(delay)\n        return wrapper\n    return decorator"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S38: Context manager nedir? Özel bir context manager (@contextmanager veya __enter__/__exit__) otomasyonda ne amaçla yazılır?",
            "en": "Q38: What is a context manager? Why write a custom one (@contextmanager or __enter__/__exit__) in automation?"
      },
      "answer": {
            "tr": "Context manager, \"with\" ifadesiyle kullanılan ve kod bloğuna girerken kurulum (setup), çıkarken ise otomatik temizlik (teardown) işlemlerini garanti eden nesnedir. Test çökmüş olsa bile temizlik işlemi (__exit__ veya yield sonrası) her zaman çalışır. Otomasyonda geçici veritabanı bağlantısı açma, mock sunucu başlatma, test öncesi dosya kopyalama/test sonrası silme gibi kaynak temizliği senaryolarında yazılır. Java try-with-resources (AutoCloseable) karşılığıdır.",
            "en": "A context manager handles setup and cleanup using the \"with\" statement. Even if the block raises an exception, the teardown code (__exit__ or code after yield) is guaranteed to execute. In automation, they manage temporary database sessions, server mocks, or file copying/deleting. Java try-with-resources equivalent."
      },
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef temporary_file(path, content):\n    # Setup\n    with open(path, \"w\") as f:\n        f.write(content)\n    try:\n        yield path  # hands over control to the \"with\" block\n    finally:\n        # Teardown (always runs!)\n        import os\n        if os.path.exists(path):\n            os.remove(path)"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S39: Global Interpreter Lock (GIL) nedir? Python test otomasyonunda paralel çalışmayı ve multi-threading mimarisini nasıl etkiler?",
            "en": "Q39: What is the Global Interpreter Lock (GIL)? How does it affect multi-threading and parallel runs in Python testing?"
      },
      "answer": {
            "tr": "GIL, CPython yorumlayıcısının aynı anda yalnızca tek bir işletim sistemi thread'i üzerinde Python bytecode çalıştırmasına izin veren bir kilit mekanizmasıdır (mutex). Bu durum, Python'da `threading` kütüphanesi kullanılsa bile CPU-bound işlerin gerçek anlamda paralel çalışmasını engeller. Ancak ağ (network I/O) veya disk (file I/O) gibi I/O-bound otomasyon işlerinde (örn: API testleri veya Selenium istekleri) GIL bekleme anlarında serbest bırakıldığı için multi-threading hız kazandırır. CPU-bound gerçek paralellik için multiprocessing veya pytest-xdist (ayrı prosesler açar) tercih edilmelidir.",
            "en": "GIL is a mutex in CPython that ensures only one OS thread executes Python bytecodes at a time, limiting true parallel execution of CPU-bound multi-threaded programs. However, for I/O-bound tasks typical in QA (e.g. HTTP requests, WebDriver commands), GIL is released during I/O waits, so threading still provides speedups. For true CPU-bound parallelism, use multiprocessing or pytest-xdist."
      },
      "code": "# For I/O-bound test runs (like parallel Web API checks), threading is useful:\n# import threading\n# t1 = threading.Thread(target=run_api_check)\n# t1.start()"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S40: Python belleği nasıl yönetir? Referans sayımı (reference counting) ve Çöp Toplayıcı (Garbage Collector) çalışma mantığı nedir?",
            "en": "Q40: How does Python manage memory? What is reference counting and Garbage Collection?"
      },
      "answer": {
            "tr": "Python'da temel bellek yönetimi referans sayımına dayanır. Bir nesneyi işaret eden her yeni değişken referans sayısını bir artırır; kapsam dışı kalma veya \"del\" ile referans silindiğinde sayaç bir azalır. Sayaç 0 olduğunda bellek anında serbest bırakılır. Ancak, iki nesnenin birbirini referans gösterdiği dairesel referans (circular reference) durumlarında referans sayısı asla 0'a düşmez. Python bu sızıntıları önlemek için arka planda periyodik olarak çalışan ve dairesel referansları tespit edip temizleyen bir Garbage Collector (gc modülü) barındırır.",
            "en": "Python's primary memory management is reference counting. Each variable pointing to an object increments its reference count, and dropping the variable decrements it. When the count hits zero, the object is immediately deallocated. To solve circular references (where objects reference each other, preventing count from hitting zero), Python runs a generational garbage collector in the background."
      },
      "code": "import sys\n\na = []\nprint(sys.getrefcount(a))  # 2 (a reference + reference passed to getrefcount)\nb = a\nprint(sys.getrefcount(a))  # 3 (shared reference)"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S41: @dataclass nedir? Standart sınıflardan farkı nedir ve test verisi modellerken neden tercih edilir?",
            "en": "Q41: What is a @dataclass? How does it differ from standard classes and why use it for test data modeling?"
      },
      "answer": {
            "tr": "`@dataclass` (Python 3.7+), sadece veri depolamak için yazılan sınıflarda boilerplate (şablon) kodları azaltan bir dekoratördür. Sınıfa yazılan alanlara göre `__init__` (constructor), `__repr__` (okunabilir string çıktı) ve `__eq__` (nesneleri == ile karşılaştırma) metodlarını otomatik olarak üretir. `frozen=True` yapılarak değiştirilemez (immutable) veri modelleri oluşturulabilir. Java'daki `record` (Java 16+) veya Lombok kütüphanesinin doğrudan karşılığıdır.",
            "en": "`@dataclass` is a decorator introduced in Python 3.7 that auto-generates constructor (`__init__`), representation (`__repr__`), and equality (`__eq__`) methods for data-holding classes. Setting `frozen=True` makes the fields immutable. It is the direct equivalent of Java `record` classes or Lombok annotations."
      },
      "code": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass UserPayload:\n    username: str\n    email: str\n    role: str = \"user\"  # Default value\n\nuser1 = UserPayload(\"bob\", \"bob@test.com\")\nuser2 = UserPayload(\"bob\", \"bob@test.com\")\nprint(user1)       # UserPayload(username='bob', email='bob@test.com', role='user')\nprint(user1 == user2)  # True (compares values, not memory addresses)"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S42: Python'da __new__ ile __init__ arasındaki fark nedir? Singleton tasarım kalıbında hangisi kullanılır?",
            "en": "Q42: What is the difference between __new__ and __init__ in Python? Which is used in Singleton pattern?"
      },
      "answer": {
            "tr": "`__new__`, sınıfın yeni bir nesnesini fiilen oluşturan (bellekte yer ayıran) kurucu metoddur ve statik bir metoddur; geriye oluşturulan nesne örneğini döndürür. `__init__` ise oluşturulmuş nesneye başlangıç değerlerini (attributes) atayan başlatıcı (initializer) metoddur. Singleton tasarım kalıbında (örneğin sadece tek bir WebDriver instance'ı paylaşırken) nesnenin ikinci kez oluşturulmasını engelleyip mevcut olanı döndürmek için `__new__` metodu override edilir.",
            "en": "`__new__` is the static method that actually instantiates (allocates memory for) the class object and returns the instance. `__init__` is the initializer that runs after instantiation to set attributes. In the Singleton pattern (e.g., sharing a single WebDriver driver), we override `__new__` to intercept instantiation and return the existing instance."
      },
      "code": "class WebDriverSingleton:\n    _instance = None\n\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n            print(\"Allocating driver instance...\")\n        return cls._instance\n\ndriver1 = WebDriverSingleton()\ndriver2 = WebDriverSingleton()\nprint(driver1 is driver2)  # True (both point to the exact same instance)"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S43: \"argparse\" kütüphanesi nedir? Test otomasyonunu CI/CD (Jenkins/GitHub Actions) ile entegre ederken nasıl yardımcı olur?",
            "en": "Q43: What is the \"argparse\" library? How does it help when integrating test automation with CI/CD?"
      },
      "answer": {
            "tr": "argparse, Python'da komut satırı argümanlarını (CLI parameters) parse etmek için kullanılan yerleşik bir kütüphanedir. Otomasyon scriptlerinize `--browser chrome --env staging --headless` gibi parametreler geçebilmenizi sağlar. CI/CD araçları (Jenkins, GitHub Actions) testlerinizi çalıştırırken bu parametreleri CLI üzerinden gönderir, böylece test kodunu değiştirmeden farklı ortamlar ve tarayıcılar hedeflenebilir. Java dünyasında bu parametreler Maven `-Dbrowser=chrome` parametreleriyle alınır.",
            "en": "argparse is a built-in library for parsing CLI options. It lets your scripts accept flags like `--browser chrome --env staging`. CI/CD systems leverage CLI flags to execute tests across different settings dynamically, without modifying the code repository. Equivalent to Java Maven CLI parameters."
      },
      "code": "# run_tests.py\nimport argparse\n\nparser = argparse.ArgumentParser(description=\"Test Runner CLI\")\nparser.add_argument(\"--browser\", default=\"chrome\", help=\"Browser type\")\nparser.add_argument(\"--headless\", action=\"store_true\", help=\"Run without UI\")\nargs = parser.parse_args()\n\nprint(f\"Running tests on: {args.browser} (Headless: {args.headless})\")"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S44: Python'da metaprogramlama nedir? Metaclass (metasınıf) kavramı ne amaçla kullanılır?",
            "en": "Q44: What is metaprogramming in Python? What is the purpose of a metaclass?"
      },
      "answer": {
            "tr": "Metaprogramlama, kodun çalışma zamanında kendi kendisini inceleyebilmesi, değiştirebilmesi veya üretebilmesi yeteneğidir (kod yazan kod). Metaclass, sınıfların nasıl oluşturulacağını tanımlayan \"sınıfın sınıfıdır\" (Python'da her sınıf `type` metaclass'ından türetilir). Otomasyon kütüphanelerinde (örn: ORM modelleri veya custom test runner API'leri), sınıflar oluşturulurken (derleme/yükleme anında) tüm metod adlarını doğrulamak, otomatik loglama eklemek veya locator yapılarını validate etmek amacıyla yazılır.",
            "en": "Metaprogramming allows code to manipulate, inspect, or generate code at runtime. A metaclass is a blueprint for creating class objects (\"class of a class\"). In testing frameworks, metaclasses enforce rules (e.g. validating method naming rules, auto-injecting logs, checking database schemas) during class creation."
      },
      "code": "class ForceTestPrefixMeta(type):\n    def __new__(cls, name, bases, attrs):\n        # Validate that all methods in a test class start with \"test_\"\n        for attr_name in attrs:\n            if callable(attrs[attr_name]) and not attr_name.startswith(\"test_\") and not attr_name.startswith(\"__\"):\n                raise TypeError(f\"Method '{attr_name}' in class '{name}' must start with 'test_'\")\n        return super().__new__(cls, name, bases, attrs)\n\n# Usage: class MyTests(metaclass=ForceTestPrefixMeta): ..."
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S45: Unit test mocklama nedir? pytest'teki monkeypatch ile unittest.mock arasındaki farklar nelerdir?",
            "en": "Q45: What is unit test mocking? What are the differences between monkeypatch and unittest.mock in pytest?"
      },
      "answer": {
            "tr": "Mocklama, test sırasında dış bağımlılıkları (API servisleri, veritabanları, zamanlayıcılar) sahte nesnelerle değiştirerek testi izole etmektir. `monkeypatch`, pytest ile gelen yerleşik bir fixture'dur; nitelikleri, sözlükleri ve ortam değişkenlerini güvenli bir şekilde (test sonunda otomatik temizlenecek şekilde) çalışma zamanında değiştirir. `unittest.mock` ise daha kapsamlı mocklama, çağrı sayılarını doğrulama (assert_called_once) ve karmaşık davranışlar (side_effect) tanımlamak için kullanılan standart Python kütüphanesidir.",
            "en": "Mocking replaces external dependencies (APIs, databases) with controlled objects to isolate code under test. `monkeypatch` is a built-in pytest fixture that patches attributes/env vars and automatically restores them after each test. `unittest.mock` is standard Python library providing rich Mock classes to assert calls and simulate exceptions."
      },
      "code": "import requests\n\ndef test_api_mock(monkeypatch):\n    class MockResponse:\n        def json(self): return {\"status\": \"mocked\"}\n    \n    # Mock requests.get globally for this test\n    monkeypatch.setattr(requests, \"get\", lambda url: MockResponse())\n    \n    resp = requests.get(\"https://realapi.com\")\n    assert resp.json()[\"status\"] == \"mocked\""
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S46: Veritabanı testlerinde transaction (işlem) yönetimi nasıl yapılır? Her testten sonra veritabanı nasıl temizlenir?",
            "en": "Q46: How do you handle database transaction management in testing? How is DB cleaned up after each test?"
      },
      "answer": {
            "tr": "Veritabanı testlerinin hızı ve izolasyonu için her testin kendi transaction'ı içinde çalışması sağlanır. pytest fixture setup kısmında transaction başlatılır (BEGIN), test bu kapsamda çalışır; test bittikten sonra ise teardown kısmında `ROLLBACK` komutu çalıştırılarak veritabanına yazılan tüm geçici veriler geri alınır ve temizlenir. Bu sayede veritabanına fiziksel yazma/silme maliyetleri önlenir ve testler birbirini etkilemez.",
            "en": "To speed up database testing and ensure isolation, execute each test inside a dedicated transaction. The pytest fixture starts the transaction (BEGIN) in setup, passes the connection to the test, and executes a `ROLLBACK` in the teardown phase. This discards modifications without performing expensive deletes."
      },
      "code": "@pytest.fixture\ndef db_transaction():\n    conn = sqlite3.connect(\"test.db\")\n    cursor = conn.cursor()\n    cursor.execute(\"BEGIN TRANSACTION;\")\n    yield cursor\n    # Teardown\n    conn.rollback()  # Undo all modifications made in test\n    conn.close()"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S47: Asenkron (async/await) programlama nedir? Playwright Python kütüphanesinde neden iki farklı API (Sync ve Async) bulunur?",
            "en": "Q47: What is asynchronous (async/await) programming? Why does Playwright Python provide both Sync and Async APIs?"
      },
      "answer": {
            "tr": "Asenkron programlama, tek bir thread üzerinde I/O bekleme sürelerinde (ağ çağrıları, dosya okuma) CPU'yu bloke etmeden başka görevleri çalıştırmayı sağlayan bir eşzamanlılık modelidir. Playwright Python, test yazarlarının tercihlerine göre iki sürüm sunar: (1) Sync API: Geleneksel Selenium/Cypress tarzı senkron akışlar yazmak için (arka planda asyncio döngüsünü gizler). (2) Async API: Asenkron ağ geçitleri veya web scraping gibi yüksek performanslı ve eşzamanlı koşan async test senaryolarını desteklemek için.",
            "en": "Asynchronous programming is a concurrency model executing non-blocking I/O tasks on a single thread. Playwright Python exposes two APIs: (1) Sync API: hides asyncio loop under the hood, enabling standard blocking test flows. (2) Async API: targets high-performance execution patterns where async assertions run concurrently."
      },
      "code": "# Sync Playwright API\nfrom playwright.sync_api import sync_playwright\nwith sync_playwright() as p:\n    browser = p.chromium.launch()\n    page = browser.new_page()\n    page.goto(\"https://test.com\")\n    browser.close()"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S48: Test otomasyon süresini optimize etmek ve bellek sızıntılarını (memory leak) tespit etmek için Python'da hangi araçlar kullanılır?",
            "en": "Q48: What tools are used in Python to profile test execution times and detect memory leaks?"
      },
      "answer": {
            "tr": "Test otomasyon sürelerini analiz etmek için pytest'in `--durations=N` parametresi en hızlı araçtır (en yavaş koşan N testi raporlar). Kod seviyesinde darboğaz tespiti için `cProfile` modülü kullanılır. Bellek sızıntılarını ve RAM tüketimini izlemek için `tracemalloc` standart kütüphanesi veya `memory_profiler` eklentisi tercih edilir. Bunlar, kapatılmayan driver veya dosya referanslarının sızıntı yaptığını doğrulamada kritik öneme sahiptir.",
            "en": "To profile test duration, run pytest with the `--durations=N` flag. For code profiling, use the built-in `cProfile` module. To analyze memory consumption and detect object memory leaks, leverage the `tracemalloc` standard library or `memory_profiler`. Extremely useful to spot unclosed webdrivers."
      },
      "code": "# CLI profiling of top 5 slowest tests\n# pytest --durations=5\n\n# Simple memory tracking in code\nimport tracemalloc\ntracemalloc.start()\n# run driver setup/teardown\nsnapshot = tracemalloc.take_snapshot()"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S49: Python'da çoklu kalıtımda (multiple inheritance) Method Resolution Order (MRO) nedir ve super() çağrısını nasıl etkiler?",
            "en": "Q49: What is Method Resolution Order (MRO) in Python multiple inheritance? How does it affect super() calls?"
      },
      "answer": {
            "tr": "MRO (Metod Çözümleme Sırası), bir sınıfın birden fazla sınıftan kalıtım alması durumunda, Python'un çağrılan metodun hangi sınıfa ait olduğunu çözmek için kullandığı hiyerarşik sıralamadır (C3 Linearization algoritması kullanılır). `super()` çağrıları bu MRO sırasına göre zincirleme olarak üst sınıflara iletilir. Sınıfın `.mro()` veya `.__mro__` niteliği okunarak sıra görüntülenebilir. Java'da çoklu kalıtım yasak olduğu için MRO konsepti Java geliştiricileri için yeni bir kavramdır.",
            "en": "MRO is the hierarchical path Python follows to resolve method lookups in multiple inheritance setups (calculated using the C3 Linearization algorithm). `super()` calls execute class lookups sequentially based on this order. Accessible via Class.mro(). Concept does not exist in Java due to single inheritance rules."
      },
      "code": "class A:\n    def test(self): print(\"A\")\n\nclass B(A):\n    def test(self):\n        print(\"B\")\n        super().test()\n\nclass C(A):\n    def test(self):\n        print(\"C\")\n        super().test()\n\nclass D(B, C):\n    def test(self):\n        print(\"D\")\n        super().test()\n\nprint(D.__mro__)  # (D, B, C, A, object)\nD().test()        # Prints D -> B -> C -> A"
},
      {
      "type": "qa",
      "level": "advanced",
      "question": {
            "tr": "S50: Test projelerinde Singleton tasarım kalıbı kullanarak tekil WebDriver veya APIClient örneği nasıl paylaşılır? Thread-safe Singleton nasıl yazılır?",
            "en": "Q50: How do you share a single WebDriver/APIClient instance using Singleton pattern? How is thread-safe Singleton implemented?"
      },
      "answer": {
            "tr": "Singleton, projenin tamamında bir sınıftan yalnızca bir nesne örneği oluşturulmasını garanti eder. Otomasyonda tüm testler boyunca tek bir WebDriver instance'ını paylaşmak için kullanılır. Paralel test çalıştırma senaryolarında (pytest-xdist vb.) yarış durumunu (race condition) engellemek ve thread-safe bir yapı kurmak amacıyla `threading.Lock()` mekanizması kullanılarak nesne kilit altına alınır.",
            "en": "The Singleton pattern restricts instantiation of a class to a single object instance, commonly used in automation to share a driver session. In multi-threaded execution (pytest-xdist), we implement thread-safe instantiation using a `threading.Lock()` to prevent race conditions during instance allocation."
      },
      "code": "import threading\n\nclass ThreadSafeDriver:\n    _instance = None\n    _lock = threading.Lock()\n\n    def __new__(cls):\n        with cls._lock:  # Thread-safe lock acquisition\n            if cls._instance is None:\n                # Initialize driver here\n                cls._instance = super().__new__(cls)\n        return cls._instance"
}
    ]
  },
  // ── 7. PRACTICE & REFERENCE ─────────────────────────────────────────────────
  {
    title: '📝 Practice Exercises & Quick Reference',
    blocks: [
      { type: 'heading', text: 'Practice Exercises' },
      {
        type: 'exercise',
        difficulty: '🟢 Beginner',
        title: 'Exercise 1: Parse Test Results',
        description: 'Write a function parse_results(results) that takes a list of dicts (each with a "status" key: "PASS", "FAIL", or "SKIP") and returns a dict with counts: {"PASS": N, "FAIL": N, "SKIP": N, "total": N}.',
        hint: 'Initialize counts dict before the loop. Use .get(status, "UNKNOWN") for safety.',
        solution: `def parse_results(results: list) -> dict:
    counts = {"PASS": 0, "FAIL": 0, "SKIP": 0}

    for result in results:
        status = result.get("status", "UNKNOWN")
        if status in counts:
            counts[status] += 1

    counts["total"] = len(results)
    return counts

# Test it:
data = [
    {"test": "login",    "status": "PASS"},
    {"test": "checkout", "status": "FAIL"},
    {"test": "signup",   "status": "PASS"},
    {"test": "profile",  "status": "SKIP"},
]
print(parse_results(data))
# {'PASS': 2, 'FAIL': 1, 'SKIP': 1, 'total': 4}`,
        explanation: 'Initialize counts before the loop. .get() with default avoids KeyError. Add "total" at the end so it reflects all items including unknowns.',
      },
      {
        type: 'exercise',
        difficulty: '🟡 Intermediate',
        title: 'Exercise 2: APIClient Class',
        description: 'Create class APIClient with base_url, and get(path) / post(path, data) methods returning parsed JSON. Handle ConnectionError (return None), Timeout (return None), HTTPError (raise). Use requests.Session for connection reuse.',
        hint: 'Use requests.Session() in __init__. response.raise_for_status() auto-raises on 4xx/5xx.',
        solution: `import requests

class APIClient:
    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout  = timeout
        self.session  = requests.Session()

    def get(self, path: str) -> dict | None:
        try:
            r = self.session.get(
                f"{self.base_url}/{path.lstrip('/')}",
                timeout=self.timeout
            )
            r.raise_for_status()
            return r.json()
        except requests.ConnectionError:
            print(f"Cannot connect to {self.base_url}")
            return None
        except requests.Timeout:
            print(f"Request timed out after {self.timeout}s")
            return None
        except requests.HTTPError as e:
            raise RuntimeError(f"HTTP {e.response.status_code}: {path}")

    def post(self, path: str, data: dict) -> dict | None:
        try:
            r = self.session.post(
                f"{self.base_url}/{path.lstrip('/')}",
                json=data, timeout=self.timeout
            )
            r.raise_for_status()
            return r.json()
        except requests.ConnectionError:
            return None

# Usage:
client = APIClient("https://jsonplaceholder.typicode.com")
user = client.get("/users/1")
print(user["name"])   # Leanne Graham`,
        explanation: 'Session reuses TCP connections reducing overhead. Separating network errors (return None) from HTTP errors (raise) gives callers different options.',
      },
      {
        type: 'exercise',
        difficulty: '🔴 Advanced',
        title: 'Exercise 3: pytest conftest with Session DB + CSV Parametrize',
        description: 'Write conftest.py with session-scoped SQLite fixture (creates users table). Write test_users.py that loads test data from CSV via parametrize and validates each user\'s email in the DB.',
        hint: 'conftest.py scope="session". Use load_csv() inside @pytest.mark.parametrize([...]).',
        solution: `# conftest.py
import pytest, sqlite3, csv

def load_user_csv():
    with open("test_data/users.csv") as f:
        return [(r["email"], r["role"]) for r in csv.DictReader(f)]

@pytest.fixture(scope="session")
def db():
    conn = sqlite3.connect(":memory:")
    conn.execute("""CREATE TABLE users (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT    NOT NULL UNIQUE,
        role  TEXT    DEFAULT 'user'
    )""")
    conn.commit()
    yield conn
    conn.close()

# test_users.py
import re

EMAIL_RE = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')

@pytest.mark.parametrize("email,role", [
    ("alice@test.com", "admin"),
    ("bob@test.com",   "user"),
])
def test_user_validation(db, email, role):
    assert EMAIL_RE.match(email), f"Invalid email: {email}"

    db.execute("INSERT INTO users (email, role) VALUES (?,?)", (email, role))
    db.commit()

    row = db.execute("SELECT role FROM users WHERE email=?", (email,)).fetchone()
    assert row is not None
    assert row[0] == role

    db.execute("DELETE FROM users WHERE email=?", (email,))
    db.commit()`,
        explanation: 'Session scope: DB persists across all tests (efficient). Each test cleans up its own data to avoid state leaking between tests. parametrize drives multiple scenarios from one function.',
      },
      { type: 'heading', text: 'Quick Reference Card' },
      {
        type: 'table',
        headers: ['Concept', 'Syntax', 'Example'],
        rows: [
          ['f-string', 'f"{var}"', 'f"Test {name}: {status}"'],
          ['List comprehension', '[expr for x in lst if cond]', '[r["name"] for r in res if r["status"]=="FAIL"]'],
          ['Dict safe get', 'dict.get(key, default)', 'row.get("status", "UNKNOWN")'],
          ['Unpacking', 'a, b = iterable', 'width, height = (1920, 1080)'],
          ['Type hint', 'param: type', 'def fn(name: str) -> bool:'],
          ['Optional', 'Optional[T]', 'def fn(x: Optional[str] = None)'],
          ['Decorator', '@decorator', '@retry(max_attempts=3)'],
          ['Context manager', 'with expr as var:', 'with open("f.txt") as f:'],
          ['Generator', 'yield value', 'def gen(): yield item'],
          ['Fixture (pytest)', '@pytest.fixture(scope=...)', '@pytest.fixture(scope="session")'],
          ['Parametrize', '@pytest.mark.parametrize()', '@pytest.mark.parametrize("x,y", [(1,2)])'],
          ['Assert with msg', 'assert expr, "msg"', 'assert status == "PASS", f"Got {status}"'],
          ['Regex match', 're.match(pattern, s)', 're.match(r"^\\d+$", "123")'],
          ['JSON parse', 'json.loads(str)', 'data = json.loads(response.text)'],
          ['CSV read', 'csv.DictReader(f)', 'for row in csv.DictReader(f):'],
        ]
      },
      { type: 'tip', content: 'Run "python -m pytest -v --tb=short" for verbose output with compact tracebacks. Add "--headed" to Playwright to see the browser while debugging.' },
      {
        type: 'quiz',
        question: { tr: '`with open("f.txt") as f:` gibi bir context manager kullanmanın temel avantajı nedir?', en: 'What is the main benefit of using a context manager like `with open("f.txt") as f:`?' },
        options: [
          { id: 'a', text: { tr: 'Dosyayı daha hızlı okur', en: 'It reads the file faster' } },
          { id: 'b', text: { tr: 'Blok bittiğinde (hata olsa da olmasa da) kaynağı otomatik kapatır, try/finally yazmaya gerek kalmaz', en: 'It automatically closes the resource when the block ends (even on error), so you never write try/finally' } },
          { id: 'c', text: { tr: 'Dosyayı salt-okunur yapar', en: 'It makes the file read-only' } },
          { id: 'd', text: { tr: 'Sadece dosyalarla kullanılabilir', en: 'It can only be used with files' } },
        ],
        correct: 'b',
        explanation: { tr: '`with` ifadesi, Java\'daki try-with-resources ile birebir aynı şeyi yapar: blok normal bitse de bir exception fırlatsa da kaynağı (dosya, DB bağlantısı, vb.) garanti olarak kapatır. Bu, manuel `try/finally: f.close()` yazmaktan kurtarır ve bir kaynağı açık unutma hatasını dilin kendisi seviyesinde ortadan kaldırır.', en: "The `with` statement does exactly what Java's try-with-resources does: it guarantees the resource (file, DB connection, etc.) is closed whether the block finishes normally or throws an exception. This eliminates manually writing `try/finally: f.close()` and removes the class of bug where a resource is accidentally left open." },
        retryQuestion: {
          question: { tr: '`with open("data.txt") as f:` bloğu içinde, dosyayı okumaya çalışırken bir exception fırlatılırsa dosyaya ne olur?', en: 'Inside a `with open("data.txt") as f:` block, if an exception is raised while reading the file, what happens to the file?' },
          options: [
            { id: 'a', text: { tr: 'Açık kalır, çünkü exception bloğu kesintiye uğrattı', en: 'It stays open, because the exception interrupted the block' } },
            { id: 'b', text: { tr: 'Exception fırlatılsa bile dosya garanti olarak kapatılır, sonra exception normal şekilde yukarı yayılır', en: 'The file is guaranteed to be closed even though the exception was raised, then the exception propagates normally' } },
            { id: 'c', text: { tr: 'Program çökmeden önce dosyayı siler', en: 'It deletes the file before the program crashes' } },
            { id: 'd', text: { tr: 'with bloğu exception\'ları yutar, hiçbir hata görünmez', en: 'The with block swallows exceptions, no error is ever seen' } },
          ],
          correct: 'b',
          explanation: { tr: '`with` ifadesinin garantisi tam olarak budur: blok İÇİNDE bir exception fırlatılsa bile, dosyanın `__exit__` metodu (kapatma işlemini yapan) MUTLAKA çalışır, sonra exception normal akışına devam ederek yukarı yayılır. Bu, Java\'daki try-with-resources\'ın bir exception fırlatıldığında da kaynağı kapatmasıyla birebir aynıdır — exception\'ı yutmaz, sadece kaynağın sızmadığını garanti eder.', en: "This is exactly the `with` statement's guarantee: even if an exception is raised INSIDE the block, the file's `__exit__` method (which performs the close) ALWAYS runs, and then the exception continues propagating normally. This is identical to Java's try-with-resources closing the resource even when an exception is thrown — it doesn't swallow the exception, it just guarantees the resource doesn't leak." },
        },
      },
    ],
  },

  // ── 8. JAVA → PYTHON ────────────────────────────────────────────────────────
  {
    title: '☕ Java → Python: Bildiğini Kullan',
    blocks: [
      { type: 'text', content: 'Core Java biliyorsan Python öğrenmek çok daha hızlı! Konseptler aynı — sözdizimi ve bazı kurallar farklı. Bu bölüm her Python kavramını tanıdık Java perspektifinden açıklar: neden gerekli, Java\'da nasıldı, Python\'da nasıl.' },
      // 1
      { type: 'heading', text: '1. Değişkenler ve Tipler' },
      // 2
      {
        type: 'java-compare',
        topic: 'Variables & Types',
        why: 'Java\'da her değişkenin tipi derleme zamanında sabitlenir. Python\'da tipler dinamik — aynı değişken farklı tipler tutabilir. Testleri daha hızlı yazarsın ama dikkatli olman gerekir.',
        why_en: 'In Java every variable\'s type is fixed at compile time. In Python types are dynamic — the same variable can hold different types. Tests are faster to write but require care.',
        java: `// Java: explicit type declaration
int count = 5;
String name = "Alice";
boolean active = true;
double score = 98.5;
// count = "hello"; // ❌ COMPILE ERROR`,
        python: `# Python: type inferred, can change
count = 5
name = "Alice"
active = True      # capital T!
score = 98.5
count = "hello"    # ✅ valid (but bad practice!)

# Optional type hints (not enforced at runtime):
count: int = 5
name: str = "Alice"`,
        note: 'Python type hints (count: int) Java gibi görünür ama çalışma zamanında zorlanmaz. Statik kontrol için mypy kullan.',
        note_en: 'Python type hints (count: int) look like Java but are NOT enforced at runtime. Use mypy for static checking.',
      },
      // 3
      { type: 'heading', text: '2. None — null\'ın Karşılığı' },
      // 4
      {
        type: 'java-compare',
        topic: 'null → None',
        why: 'Java\'da null NullPointerException\'a yol açar. Python\'da aynı risk var ama None olarak adlandırılır. "is None" kullanımı Java\'nın Objects.equals() kullanımı gibi en iyi pratiktir.',
        why_en: 'Java null causes NullPointerException. Python has the same risk but calls it None. "is None" is best practice, similar to Java\'s Objects.equals() for null checks.',
        java: `// Java null
String value = null;
if (value == null) {
    System.out.println("No value");
}
// value.length() → NullPointerException!

// Java 8+ Optional:
Optional.ofNullable(value).orElse("default");`,
        python: `# Python None (null karşılığı)
value = None
if value is None:    # NOT: value == None
    print("No value")
# value.upper() → AttributeError (same risk!)

# Python idiom (Optional.orElse karşılığı):
result = value if value is not None else "default"
result = value or "default"  # shorter`,
        note: '"is None" kullan, "== None" değil — aynı nesne kontrolü yapar, __eq__ değil. value or "default" falsy check yapar (0, "", [] da default döner), dikkatli kullan.',
        note_en: 'Use "is None" not "== None" — checks object identity, not __eq__. "value or \'default\'" does a falsy check (0, "", [] also trigger default), use carefully.',
      },
      // 5
      { type: 'heading', text: '3. List — ArrayList\'in Karşılığı' },
      // 6
      {
        type: 'java-compare',
        topic: 'ArrayList → list',
        why: 'Java ArrayList ve Python list aynı amaca hizmet eder: dinamik boyutlu sıralı koleksiyon. Python sözdizimi çok daha kısadır — new yoktur, import yoktur, generic tip yoktur.',
        why_en: 'Java ArrayList and Python list serve the same purpose: a dynamically-sized ordered collection. Python syntax is much shorter — no new, no import, no generic type.',
        java: `// Java ArrayList<String>
import java.util.ArrayList;

ArrayList<String> tests = new ArrayList<>();
tests.add("login");
tests.add("checkout");
tests.remove("login");
System.out.println(tests.get(0)); // "checkout"
System.out.println(tests.size()); // 1
tests.contains("checkout");       // true

for (String t : tests) {
    System.out.println(t);
}`,
        python: `# Python list (no import, no generic type!)
tests = []
tests.append("login")
tests.append("checkout")
tests.remove("login")
print(tests[0])      # "checkout"
print(len(tests))    # 1 — len(), not .size()
"checkout" in tests  # True

for t in tests:
    print(t)

# Index + value (Java\'nın indexed for\'u):
for i, t in enumerate(tests):
    print(f"{i}: {t}")`,
        note: 'Python list mixed type destekler: [1, "hello", True]. append() = add(), remove() = remove(), len() = size(), in = contains(). "new ArrayList<>()" yok — sadece [].',
        note_en: 'Python list supports mixed types: [1, "hello", True]. append() = add(), remove() = remove(), len() = size(), in = contains(). No "new ArrayList<>()" — just [].',
      },
      // 7
      { type: 'heading', text: '4. Dict — HashMap\'in Karşılığı' },
      // 8
      {
        type: 'java-compare',
        topic: 'HashMap → dict',
        why: 'Java HashMap ve Python dict aynı konsept: key-value eşlemeleri. Python sözdizimi çok daha temizdir — put/get yerine [] veya {} kullanılır, import gerekmez.',
        why_en: 'Java HashMap and Python dict are the same concept: key-value mappings. Python syntax is much cleaner — use [] or {} instead of put/get, no import needed.',
        java: `// Java HashMap<String, Object>
import java.util.HashMap;
import java.util.Map;

Map<String, Object> result = new HashMap<>();
result.put("status", "PASS");
result.put("duration", 1200);
result.get("status");             // "PASS"
result.getOrDefault("err", "");   // safe access
result.containsKey("status");     // true

for (Map.Entry<String, Object> e : result.entrySet()) {
    System.out.println(e.getKey() + ": " + e.getValue());
}`,
        python: `# Python dict (no import needed!)
result = {}
result["status"] = "PASS"
result["duration"] = 1200
result["status"]               # "PASS"
result.get("err", "")          # getOrDefault karşılığı
"status" in result             # containsKey karşılığı

# Literal syntax (en yaygın):
result = {"status": "PASS", "duration": 1200}

for key, value in result.items():  # entrySet karşılığı
    print(f"{key}: {value}")`,
        note: 'Python dict Python 3.7\'den itibaren ekleme sırasını korur. Java HashMap sıra garantisi vermez. put() = result["k"] = v, get() = result.get("k"), entrySet() = .items().',
        note_en: 'Python dict preserves insertion order since Python 3.7. Java HashMap gives no order guarantee. put() = result["k"] = v, get() = result.get("k"), entrySet() = .items().',
      },
      // 9
      { type: 'heading', text: '5. Set — HashSet\'in Karşılığı' },
      // 10
      {
        type: 'java-compare',
        topic: 'HashSet → set',
        why: 'Tekrar eden öğeleri elemek ve O(1) üyelik kontrolü için — Java\'da HashSet, Python\'da set. Hem sözdizimi hem performans karakteristiği aynıdır.',
        why_en: 'For eliminating duplicates and O(1) membership testing — Java has HashSet, Python has set. Same syntax pattern and same performance characteristics.',
        java: `// Java HashSet<String>
import java.util.HashSet;
Set<String> seen = new HashSet<>();
seen.add("login");
seen.add("login");      // no duplicate
seen.size();            // 1
seen.contains("login"); // true, O(1)

// Union: seen.addAll(other)
// Intersection: seen.retainAll(other)
// Difference: seen.removeAll(other)`,
        python: `# Python set (no import!)
seen = set()
seen.add("login")
seen.add("login")  # duplicate ignored
len(seen)          # 1
"login" in seen    # True, O(1)

# Literal syntax:
seen = {"login", "checkout"}

# Operatörler:
seen | other       # Union (addAll)
seen & other       # Intersection (retainAll)
seen - other       # Difference (removeAll)
seen ^ other       # Symmetric difference`,
        note: 'O(1) lookup için list yerine set kullan (QA\'da: test tag\'leri, gezilen URL\'ler, görülen hata kodları). Python set ve Java HashSet aynı Big-O garantileri.',
        note_en: 'Use set instead of list for O(1) lookup (QA: test tags, visited URLs, seen error codes). Python set and Java HashSet have the same Big-O guarantees.',
      },
      // 11
      { type: 'heading', text: '6. Tuple — Java\'da Doğrudan Karşılığı Yok' },
      // 12
      {
        type: 'java-compare',
        topic: 'tuple (Java\'da yok!)',
        why: 'Python tuple immutable (değiştirilemez) sıralı koleksiyondur. Java\'da buna en yakın List.of() veya record\'dur ama tuple daha yaygın ve daha çok idiomatik: birden fazla değer döndürmek için kullanılır.',
        why_en: 'Python tuple is an immutable ordered collection. The closest Java equivalent is List.of() or a record, but tuple is more idiomatic — used for returning multiple values without a wrapper class.',
        java: `// Java: no built-in tuple
// Closest: List.of() (Java 9+):
List<String> pair = List.of("user", "admin");
// pair.add("x"); // ❌ UnsupportedOperationException

// Java 16+ record:
record Point(int x, int y) {}
Point p = new Point(3, 5);
p.x();  // 3

// Return multiple values: must wrap in class/record
record Result(String data, int code) {}
return new Result("OK", 200);`,
        python: `# Python tuple: immutable ordered collection
pair = ("user", "admin")
# pair[0] = "x"  # ❌ TypeError: immutable!

# Multiple return values (killer feature!):
def check_response(url: str):
    resp = requests.get(url)
    return resp.status_code, resp.text  # tuple!

code, body = check_response("/api/health")  # unpacking

# Named tuple (record karşılığı):
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 5)
print(p.x)  # 3`,
        note: 'Python\'ın en güçlü özelliklerinden biri: birden fazla değer döndürmek için tuple kullan. Java\'da Result/Pair sarmalayıcı gerekir; Python\'da sadece "return a, b".',
        note_en: 'One of Python\'s best features: use a tuple to return multiple values. In Java you need a Result/Pair wrapper class; in Python just "return a, b".',
      },
      // 13
      { type: 'heading', text: '7. String Formatting — f-string vs String.format()' },
      // 14
      {
        type: 'java-compare',
        topic: 'String formatting',
        why: 'Test logları ve raporlarında sık kullanılır. Python f-string, Java String.format()\'un çok daha okunabilir versiyonudur. Süslü parantez içine doğrudan değişken veya ifade yazarsın.',
        why_en: 'Frequently used in test logs and reports. Python f-string is the far more readable version of Java\'s String.format(). Write variables or expressions directly inside curly braces.',
        java: `// Java String.format()
String name = "Alice";
int count = 5;

String msg = String.format(
    "User %s ran %d tests", name, count);
// "User Alice ran 5 tests"

// Java 15+ text block:
String report = """
    User: %s
    Tests: %d
    """.formatted(name, count);`,
        python: `# Python f-string (Python 3.6+) — much cleaner!
name = "Alice"
count = 5

msg = f"User {name} ran {count} tests"
# "User Alice ran 5 tests"

# Her türlü ifade {} içinde çalışır:
status = f"Pass: {count-1}, Fail: {1}"
result = f"{'PASS' if count > 0 else 'FAIL'}"
obj_val = f"Status: {resp.status_code}"

# Multiline:
report = f"""
User: {name}
Tests: {count}
"""`,
        note: 'f-string süslü parantezleri içine method çağrısı, hesaplama, koşul da yazabilirsin. %s veya String.format kullanma — f-string her zaman daha okunabilir.',
        note_en: 'Inside f-string braces you can write method calls, calculations, or ternary expressions. Avoid %s or String.format — f-string is always more readable.',
      },
      // 15
      { type: 'heading', text: '8. Döngüler — for-each → for-in' },
      // 16
      {
        type: 'java-compare',
        topic: 'for loops',
        why: 'Python for-in, Java\'nın enhanced for-each döngüsüne çok benzer. Tek önemli fark: Python\'da index VE değer için enumerate() kullanılır; Java\'da iki ayrı döngü kurman gerekir.',
        why_en: 'Python for-in is very similar to Java\'s enhanced for-each loop. The key difference: use enumerate() to get both index AND value; Java needs two separate loop constructs.',
        java: `// Java enhanced for
for (String test : testList) {
    System.out.println(test);
}

// Indexed loop:
for (int i = 0; i < testList.size(); i++) {
    System.out.println(i + ": " + testList.get(i));
}

// Range-based:
for (int i = 0; i < 5; i++) {
    System.out.println(i);  // 0,1,2,3,4
}`,
        python: `# Python for-in (Java enhanced for karşılığı)
for test in test_list:
    print(test)

# Index + value (enumerate = Java\'nın indexed for):
for i, test in enumerate(test_list):
    print(f"{i}: {test}")

# Range-based:
for i in range(5):       # 0,1,2,3,4
    print(i)

# range(start, end, step):
for i in range(0, 10, 2):   # 0,2,4,6,8
    print(i)`,
        note: 'Python\'da süslü parantez yok — GIRINTI blokları tanımlar! Eksik girinti = döngü gövdesi yok. Java\'dan geçişte en büyük sözdizimi şoku budur.',
        note_en: 'Python has no curly braces — INDENTATION defines blocks! Missing indent = no loop body. This is the biggest syntax shock when coming from Java.',
      },
      // 17
      { type: 'heading', text: '9. Fonksiyonlar — Method → def' },
      // 18
      {
        type: 'java-compare',
        topic: 'methods → functions',
        why: 'Java\'da her metod bir class içinde olmak zorundadır. Python\'da fonksiyonlar serbest (standalone) olabilir — küçük yardımcı araçlar için class yazmaya gerek yoktur. Default parametreler Java method overloading\'in yerini alır.',
        why_en: 'In Java every method must be inside a class. Python functions can be standalone — no need to write a class for small utility helpers. Default parameters replace Java method overloading.',
        java: `// Java: methods must be inside a class
public class TestUtils {
    public static boolean isValidEmail(String email) {
        return email != null && email.contains("@");
    }
}
// Usage: TestUtils.isValidEmail("t@t.com")

// Overloading (default params için):
public static User create(String name) {
    return create(name, "tester");
}
public static User create(String name, String role) {
    return new User(name, role);
}`,
        python: `# Python: standalone functions (no class needed!)
def is_valid_email(email: str) -> bool:
    return email is not None and "@" in email

is_valid_email("t@t.com")  # doğrudan çağır

# Default params (overloading yerine):
def create_user(name: str, role: str = "tester", active: bool = True):
    return {"name": name, "role": role, "active": active}

create_user("Alice")              # role="tester"
create_user("Bob", role="admin")  # keyword arg`,
        note: 'Python keyword arguments güçlüdür: create_user("Bob", active=False, role="admin") — sıra önemli değil. @staticmethod ile class içi utility method da yazabilirsin.',
        note_en: 'Python keyword arguments are powerful: create_user("Bob", active=False, role="admin") — order doesn\'t matter. Use @staticmethod for utility methods inside a class.',
      },
      // 19
      { type: 'heading', text: '10. Exception Handling — try/catch → try/except' },
      // 20
      {
        type: 'java-compare',
        topic: 'Exception handling',
        why: 'Aynı konsept, farklı anahtar kelimeler: "catch" Python\'da "except" olur. Python\'da checked/unchecked exception ayrımı yoktur — tüm exception\'lar Java\'nın RuntimeException\'ı gibi davranır. throws bildirimi yoktur.',
        why_en: 'Same concept, different keywords: "catch" becomes "except" in Python. There are no checked/unchecked exceptions — all exceptions behave like Java\'s RuntimeException. No throws declaration needed.',
        java: `// Java try-catch-finally
try {
    Response r = httpClient.get(url);
    process(r);
} catch (IOException e) {
    System.err.println("IO Error: " + e.getMessage());
} catch (TimeoutException e) {
    throw e;  // re-throw
} finally {
    System.out.println("Always runs");
}
// Method signature: void fetch() throws IOException`,
        python: `# Python try-except-finally (same concept!)
try:
    r = requests.get(url)
    process(r)
except requests.exceptions.ConnectionError as e:
    print(f"Connection Error: {e}")
except requests.exceptions.Timeout as e:
    raise  # re-raise (no arg = same exception)
finally:
    print("Always runs")
# No "throws" declaration needed!`,
        note: '"raise" (argümansız) = Java "throw e" (re-throw). "except Exception as e" = Java "catch (Exception e)". Python\'da checked exceptions yok — "throws IOException" bildirimi gerekmez.',
        note_en: '"raise" (no argument) = Java "throw e" (re-throw). "except Exception as e" = Java "catch (Exception e)". No checked exceptions — no "throws IOException" declaration.',
      },
      // 21
      { type: 'heading', text: '11. Sınıflar ve OOP — class (Çok Benzer!)' },
      // 22
      {
        type: 'java-compare',
        topic: 'class & OOP',
        why: 'Python class yapısı Java\'ya çok benzer: constructor, instance fields, methods. İki kritik fark: (1) her method "self" parametresi alır (Java\'da "this" gizlidir), (2) access modifier\'lar kural — zorunluluk değil.',
        why_en: 'Python class structure is very similar to Java: constructor, instance fields, methods. Two critical differences: (1) every method takes an explicit "self" parameter (Java\'s "this" is implicit), (2) access modifiers are convention — not enforced.',
        java: `// Java class
public class TestResult {
    private String name;
    private String status;

    public TestResult(String name, String status) {
        this.name = name;
        this.status = status;
    }
    public String getName() { return name; }

    public boolean isPassed() {
        return "PASS".equals(status);
    }
    @Override public String toString() {
        return name + ": " + status;
    }
}`,
        python: `# Python class (very similar!)
class TestResult:
    def __init__(self, name: str, status: str):
        self.name = name      # self = Java\'nın 'this\'i
        self.status = status

    @property
    def is_passed(self) -> bool:   # getter (no () to call)
        return self.status == "PASS"

    def __str__(self) -> str:      # toString()
        return f"{self.name}: {self.status}"

result = TestResult("login_test", "PASS")
result.is_passed  # True — parantez yok, @property!
print(result)     # "login_test: PASS"`,
        note: '"self" Python\'da explicit (Java\'nın implicit "this"i). @property = getter (parantez olmadan çağrılır). __init__ = constructor. __str__ = toString(). @Override yok — sadece metodu yeniden tanımla.',
        note_en: '"self" is explicit in Python (Java\'s implicit "this"). @property = getter (called without parentheses). __init__ = constructor. __str__ = toString(). No @Override — just redefine the method.',
      },
      // 23
      { type: 'heading', text: '12. Erişim Belirleyicileri — Kural, Zorunluluk Değil!' },
      // 24
      {
        type: 'java-compare',
        topic: 'access modifiers (convention only!)',
        why: 'Java\'da private/public/protected derleyici tarafından zorlanır. Python\'da bu kavramlar sadece kuraldır (convention) — _ ve __ prefix kullanılır ama dışarıdan hala erişilebilir! Bu Java\'dan geçişin en büyük şokudur.',
        why_en: 'In Java, private/public/protected are enforced by the compiler. In Python these are just conventions — _ and __ prefixes are used but access is never truly blocked! This is the biggest shock coming from Java.',
        java: `// Java: enforced by compiler
public class User {
    private String password;   // ENFORCED
    protected String email;    // ENFORCED
    public String name;        // ENFORCED
}
// user.password → ❌ compile error (HARD BLOCK)`,
        python: `# Python: convention only, NOT enforced!
class User:
    def __init__(self):
        self.name = "Alice"       # public (default)
        self._email = "x@x.com"  # _ = "please don\'t use"
        self.__password = "..."   # __ = name mangling

u = User()
u.name            # ✅ public
u._email          # ✅ works! (just a warning by convention)
u._User__password # ✅ still accessible via mangled name!
# Python cannot enforce private like Java`,
        note: '__ (double underscore) ismi karıştırır: self.__password _User__password olur. Erişimi zorlaştırır ama engellemez. Python felsefesi: "Hepimiz yetişkiniz, gizlemeye gerek yok."',
        note_en: '__ (double underscore) triggers name mangling: self.__password becomes _User__password. Makes access harder but NOT impossible. Python philosophy: "We\'re all adults here, no need to hide."',
      },
      // 25
      { type: 'heading', text: '13. Java Streams → List Comprehension' },
      // 26
      {
        type: 'java-compare',
        topic: 'Streams → List Comprehensions',
        why: 'Java 8 Streams ve Python list comprehension aynı amaca hizmet eder: koleksiyonları filtrele ve dönüştür. Python versiyonu çok daha kısadır ve okunabilirdir. QA\'da sık kullanılır: başarısız testleri filtrele, isim listesi oluştur vs.',
        why_en: 'Java 8 Streams and Python list comprehensions serve the same purpose: filter and transform collections. Python version is far shorter and more readable. Used often in QA: filter failed tests, build name lists, etc.',
        java: `// Java Streams (Java 8+)
List<String> failed = tests.stream()
    .filter(t -> t.getStatus().equals("FAIL"))
    .map(t -> t.getName())
    .collect(Collectors.toList());

long failCount = tests.stream()
    .filter(t -> t.getStatus().equals("FAIL"))
    .count();

int total = tests.stream()
    .mapToInt(t -> t.getDuration()).sum();`,
        python: `# Python list comprehension (daha özlü!)
failed = [t["name"] for t in tests
          if t["status"] == "FAIL"]
# [ifade for öğe in liste if koşul]

# Count:
fail_count = sum(1 for t in tests
                 if t["status"] == "FAIL")

# Sum:
total = sum(t["duration"] for t in tests)

# Dict comprehension (Streams\'de yok!):
status_map = {t["name"]: t["status"] for t in tests}`,
        note: '[x for x in list if cond] = stream().filter().map().collect(). Bu idiom Python\'da her yerde kullanılır — mutlaka öğren. Generator expressions (parantez) lazy evaluation yapar, list comp (köşeli) hemen değerlendirir.',
        note_en: '[x for x in list if cond] = stream().filter().map().collect(). This idiom is everywhere in Python — you must learn it. Generator expressions (parentheses) are lazy; list comp (brackets) evaluates immediately.',
      },
      // 27
      { type: 'heading', text: '14. try-with-resources → with' },
      // 28
      {
        type: 'java-compare',
        topic: 'try-with-resources → with',
        why: 'Dosya, DB bağlantısı, tarayıcı gibi kaynakları güvenli kapatmak için. Java\'da try-with-resources, Python\'da "with". Aynı güvence: hata olsa bile kaynak kapanır.',
        why_en: 'For safely closing resources like files, DB connections, and browsers. Java uses try-with-resources; Python uses "with". Same guarantee: the resource closes even if an exception occurs.',
        java: `// Java try-with-resources
try (FileReader fr = new FileReader("data.csv");
     BufferedReader br = new BufferedReader(fr)) {
    String line = br.readLine();
} // auto-closes fr and br

// DB connection:
try (Connection conn = ds.getConnection()) {
    conn.prepareStatement("SELECT 1").execute();
} // auto-closes conn`,
        python: `# Python 'with' (context manager)
with open("data.csv", "r") as f:
    line = f.readline()
# f automatically closed — even if exception!

# Multiple resources:
with open("in.csv") as fin, open("out.csv","w") as fout:
    fout.write(fin.read())

# Database:
with db.connect() as conn:
    conn.execute("SELECT 1")
# conn auto-committed and closed

# Playwright (context manager kullanır!):
with sync_playwright() as p:
    browser = p.chromium.launch()`,
        note: '"with" AutoCloseable implement eden her nesneyle çalışır (__enter__ + __exit__). Dosya, bağlantı, kilit, Playwright browser — hepsi with ile kullanılır. "finally: f.close()" yazmak artık eski tarz.',
        note_en: '"with" works with any object implementing __enter__ + __exit__ (like AutoCloseable). Files, connections, locks, Playwright browser — all work with "with". Writing "finally: f.close()" is now old-fashioned.',
      },
      // 29
      { type: 'heading', text: '15. Kalıtım — extends/implements → Python' },
      // 30
      {
        type: 'java-compare',
        topic: 'inheritance & abstract class',
        why: 'Python\'da extends ve implements arasında ayrım yoktur — ikisi de class parantezi içinde yapılır. Abstract class için ABC kullanılır, interface için normal class yeterlidir. Multiple inheritance doğal desteklenir.',
        why_en: 'Python has no separate extends and implements keywords — both are done inside class parentheses. Use ABC for abstract classes; a regular class is enough for interfaces. Multiple inheritance is natively supported.',
        java: `// Java: explicit extends & implements
interface Loggable { void log(String msg); }

abstract class BasePage {
    protected WebDriver driver;
    public BasePage(WebDriver d) { this.driver = d; }
    public abstract void open();  // must implement
}

class LoginPage extends BasePage implements Loggable {
    public LoginPage(WebDriver d) { super(d); }
    @Override public void open() { driver.get("/login"); }
    @Override public void log(String m) { System.out.println(m); }
}`,
        python: `# Python: all in one mechanism
from abc import ABC, abstractmethod

class Loggable:             # "interface" = plain class
    def log(self, msg: str):
        print(msg)

class BasePage(ABC):        # abstract class
    def __init__(self, driver):
        self.driver = driver

    @abstractmethod
    def open(self): ...     # must implement

class LoginPage(BasePage, Loggable):  # extends + implements!
    def open(self):
        self.driver.get("/login")
    # log() inherited from Loggable ✅`,
        note: 'Python multiple inheritance destekler: (BasePage, Loggable). @abstractmethod metodu override etmezsen instantiate edemezsin — Java abstract class ile aynı kural. @Override yok — sadece metodu yeniden tanımla.',
        note_en: 'Python supports multiple inheritance: (BasePage, Loggable). If you don\'t override an @abstractmethod you can\'t instantiate — same rule as Java abstract class. No @Override — just redefine the method.',
      },
      // 31
      { type: 'heading', text: 'Hızlı Karşılaştırma Tablosu' },
      // 32
      {
        type: 'table',
        headers: ['Kavram', 'Java', 'Python', 'Not'],
        rows: [
          ['Değişken', 'int x = 5;', 'x = 5', 'Python: dynamic typing'],
          ['Null', 'null', 'None', '"is None" kullan, "== None" değil'],
          ['Dinamik dizi', 'ArrayList<T>', 'list', 'Import yok, generic tip yok'],
          ['Key-value map', 'HashMap<K,V>', 'dict', 'Import yok, literal: {k: v}'],
          ['Benzersiz set', 'HashSet<T>', 'set', 'Import yok, literal: {v1, v2}'],
          ['Immutable liste', 'List.of() / record', 'tuple', 'Birden fazla değer dönüşü için'],
          ['String format', 'String.format()', 'f"...{var}..."', 'f-string çok daha temiz'],
          ['For-each', 'for (T x : list)', 'for x in list:', 'Index için enumerate()'],
          ['Constructor', 'ClassName(args)', '__init__(self, args)', 'self explicit this'],
          ['toString()', 'toString()', '__str__(self)', '@Override yok'],
          ['Getter', 'getX()', '@property', 'Parantez olmadan çağrılır'],
          ['Private field', 'private int x;', 'self.__x', 'ZORUNLU DEĞİL! Sadece kural'],
          ['Streams filter', '.stream().filter()', '[x for x in ... if ...]', 'List comprehension'],
          ['try-catch', 'try {} catch (E e)', 'try: ... except E as e:', '"catch" → "except"'],
          ['try-resources', 'try (Res r = ...)', 'with Res() as r:', '"with" auto-close'],
          ['Abstract class', 'abstract class', 'class X(ABC)', 'from abc import ABC'],
          ['Interface', 'interface I {}', 'class I: (plain class)', 'Interface keyword yok'],
          ['Inheritance', 'extends Base', 'class X(Base):', 'Parantez içinde'],
        ],
      },
      { type: 'glossary-section', terms: [
        { term: 'Assertion', definition: { tr: 'Test sonucunu dogrulayan ifade. pytest de assert anahtar kelimesi kullanilir.', en: 'A statement that verifies a test result. pytest uses the assert keyword.' } },
        { term: 'conftest.py', definition: { tr: 'pytest in fixture ve hook lari paylasilan dosyasi. Bir dizindeki tum test dosyalari bu dosyadaki fixture lara erisebilir.', en: 'The file where pytest fixtures and hooks are shared. All test files in a directory can access fixtures defined here.' } },
        { term: 'Context Manager', definition: { tr: 'with ifadesi ile kullanilan, kaynak acma/kapama islemlerini yoneten nesne. Python daki try-finally e esittir.', en: 'An object used with the with statement to manage resource open/close. Equivalent to try-finally in Python.' } },
        { term: 'Decorator', definition: { tr: 'Bir fonksiyonu veya sinifi saran ve davranisini degistiren @ sozi dizimi. pytest.mark.parametrize, @fixture gibi.', en: 'A @ syntax that wraps a function or class to modify its behaviour. Examples: pytest.mark.parametrize, @fixture.' } },
        { term: 'f-string', definition: { tr: 'f\"...{variable}...\" ile tanimlanan Python string interpolasyon sozdizimi. Java String.format() veya + birlestirisine alternatiftir.', en: 'Python string interpolation syntax: f"...{variable}...". Alternative to Java String.format() or + concatenation.' } },
        { term: 'fixture', definition: { tr: 'pytest de @pytest.fixture ile tanimlanan, testler icin kurulum/yikim saglayan yeniden kullanilabilir fonksiyon.', en: 'A reusable function defined with @pytest.fixture in pytest that provides setup/teardown for tests.' } },
        { term: 'GIL (Global Interpreter Lock)', definition: { tr: 'Python interpreter in ayni anda yalnizca bir thread in bytecode calistirmasina izin veren mutex. CPU-bound paralel isler icin sinirlamadirdir.', en: 'A mutex that prevents the Python interpreter from running more than one thread at a time. Limits CPU-bound parallelism.' } },
        { term: 'Generator', definition: { tr: 'yield anahtar kelimesi ile deger ureten ve tum listeyi bellegte saklamayan fonksiyon. Buyuk veri kumeleri icin verimlidir.', en: 'A function that produces values with yield without storing the entire list in memory. Efficient for large data sets.' } },
        { term: 'List Comprehension', definition: { tr: '[ifade for x in iterable if kosul] sozdizimi ile liste olusturma. Java Streams.filter().map() e benzer ama daha kisadir.', en: '[expression for x in iterable if condition] syntax for creating lists. Similar to Java Streams.filter().map() but more concise.' } },
        { term: 'locator', definition: { tr: 'Playwright de page.locator(\"CSS veya XPath\") ile tanimlanan, bir UI elementini secen nesne.', en: 'In Playwright, an object defined with page.locator("CSS or XPath") that selects a UI element.' } },
        { term: 'parametrize', definition: { tr: '@pytest.mark.parametrize dekoratoru ile bir testi birden fazla veri kumesiyle calistirma ozelligi.', en: 'The ability to run a test with multiple data sets using the @pytest.mark.parametrize decorator.' } },
        { term: 'pip', definition: { tr: 'Python paket yukleyici. pip install pytest, pip install playwright. Java Maven pom.xml e esittir.', en: 'Python package installer. pip install pytest, pip install playwright. Equivalent to Java Maven pom.xml.' } },
        { term: 'pytest', definition: { tr: 'Python un standart test cercevesi. Test kesfini, fixture leri, parametrizasyonu ve raporlamayi saglar.', en: 'The standard Python testing framework. Provides test discovery, fixtures, parametrization, and reporting.' } },
        { term: 'requirements.txt', definition: { tr: 'Proje bagimliliklarini listeleyen dosya. pip install -r requirements.txt ile yuklenir. Java pom.xml e karsili.', en: 'A file listing project dependencies. Install with pip install -r requirements.txt. Java pom.xml equivalent.' } },
        { term: 'Selenium', definition: { tr: 'Tarayici otomasyonu icin kullanilan Python kutuphanesi. WebDriver API ile tarayiciyi kontrol eder.', en: 'A Python library for browser automation. Controls the browser via the WebDriver API.' } },
        { term: 'type hint', definition: { tr: 'def func(x: int) -> str: sozdizimi ile Python fonksiyon parametrelerine tip bilgisi ekleme. Java generics e benzer.', en: 'Adding type information to Python function parameters with def func(x: int) -> str: syntax. Similar to Java generics.' } },
        { term: 'virtual environment (venv)', definition: { tr: 'python -m venv .venv ile olusturulan, proje bagimliliklarini global Python dan izole eden klasor yapisi.', en: 'A folder structure created with python -m venv .venv that isolates project dependencies from the global Python.' } },
      ]},
      {
        type: 'quiz',
        question: { tr: 'Python\'da None, Java\'daki null\'a eşdeğerdir. Bunu kontrol etmenin doğru yolu nedir?', en: "Python's None is the equivalent of Java's null. What is the correct way to check for it?" },
        options: [
          { id: 'a', text: { tr: '`value == None`', en: '`value == None`' } },
          { id: 'b', text: { tr: '`value is None`', en: '`value is None`' } },
          { id: 'c', text: { tr: '`value.equals(None)`', en: '`value.equals(None)`' } },
          { id: 'd', text: { tr: '`None(value)`', en: '`None(value)`' } },
        ],
        correct: 'b',
        explanation: { tr: 'None Python\'da SİNGLETON bir nesnedir, bu yüzden kimlik karşılaştırması (`is None`) anlam ve performans açısından doğru olanıdır — `==` teorik olarak çalışır (çünkü `__eq__` override edilmemiş özel sınıflar için kimliğe düşer) ama bir sınıf `__eq__`\'i override ederse `== None` beklenmedik şekilde davranabilir. Java\'da bunun karşılığı `value == null` (referans karşılaştırması) kullanmaktır, `value.equals(null)` değil — `equals` null referans üzerinde NullPointerException fırlatır.', en: "None is a SINGLETON object in Python, so identity comparison (`is None`) is the semantically and performance-correct choice — `==` technically works for most objects (it falls back to identity unless `__eq__` is overridden) but can behave unexpectedly if a class overrides `__eq__`. The Java equivalent is using `value == null` (reference comparison), not `value.equals(null)` — calling `equals` on a null reference throws a NullPointerException." },
        retryQuestion: {
          question: { tr: 'Bir `Money` sınıfı `__eq__`\'i override ederek iki farklı `Money` nesnesini değer bazında karşılaştırıyor. Bu sınıfın bir instance\'ını `instance == None` ile kontrol etmek neden riskli olabilir?', en: 'A `Money` class overrides `__eq__` to compare two different `Money` instances by value. Why can checking an instance with `instance == None` be risky?' },
          options: [
            { id: 'a', text: { tr: 'Hiçbir risk yok, `==` her zaman `is None` ile birebir aynı sonucu verir', en: '`==` always gives identical results to `is None`, there is no risk at all' } },
            { id: 'b', text: { tr: '`__eq__` override\'ı None ile karşılaştırmayı da ele alabilir ve beklenmedik bir sonuç (örn. exception veya yanlış True/False) üretebilir', en: 'The `__eq__` override might also handle the None comparison and produce an unexpected result (e.g. an exception or a wrong True/False)' } },
            { id: 'c', text: { tr: '`==` operatörü None ile asla kullanılamaz', en: 'The `==` operator can never be used with None' } },
            { id: 'd', text: { tr: 'Python bunu otomatik olarak `is None`a çevirir', en: 'Python automatically converts this to `is None`' } },
          ],
          correct: 'b',
          explanation: { tr: '`__eq__` override edildiğinde, `==` artık varsayılan kimlik kontrolüne düşmez — sınıfın kendi karşılaştırma mantığını çalıştırır. Eğer bu mantık `None` ile karşılaştırmayı düzgün ele almıyorsa (örn. `other.amount` gibi bir attribute\'a erişmeye çalışırsa), `instance == None` beklenmedik bir AttributeError fırlatabilir. `is None`, sınıfın `__eq__`\'inden tamamen bağımsız çalıştığı için bu riski hiç taşımaz.', en: "Once `__eq__` is overridden, `==` no longer falls back to the default identity check — it runs the class's own comparison logic. If that logic doesn't handle comparison against `None` properly (e.g. it tries to access `other.amount`), `instance == None` can raise an unexpected AttributeError. `is None` carries none of this risk because it operates completely independently of the class's `__eq__`." },
        },
      },
    ],
  },
]

function applyTr(enSection, overrides) {
  return {
    title: overrides.title ?? enSection.title,
    blocks: enSection.blocks.map((block, i) => {
      const o = overrides.blocks?.[i]
      if (!o) return block
      return { ...block, ...o }
    })
  }
}

const trSections = [
  applyTr(sections[0], {
    title: '🎯 Python Nedir & QA Mühendisleri Neden Kullanmalı?',
    blocks: {
      0: { content: "Python, temiz ve okunabilir söz dizimiyle tanınan yüksek seviyeli, yorumlanan bir programlama dilidir — neredeyse düz İngilizce gibi okunur. 1991\'de oluşturulan Python, otomasyon, veri bilimi ve web geliştirme için dünyanın en popüler dili haline gelmiştir." },
      1: { content: "QA mühendisleri için Python bir İsviçre çakısıdır: Selenium/Playwright ile UI testleri, requests ile API testleri, performans testleri, veri doğrulama scriptleri ve CI/CD pipeline\'ları — hepsini aynı dilde yazabilirsiniz." },
      2: { text: 'Test Otomasyonu için Neden Python?' },
      3: { items: [
        { icon: '📖', label: 'Okunabilir Söz Dizimi', desc: "Testler dokümantasyon gibi okunur — geliştirici olmayanlar bile neyin test edildiğini anlayabilir." },
        { icon: '🧰', label: 'Geniş Ekosistem', desc: 'pytest, Selenium, Playwright, requests, Faker, pandas — binlerce test kütüphanesi.' },
        { icon: '⚡', label: 'Hızlı Scripting', desc: 'Veri üretme scripti veya API testi dakikalar içinde yazılır.' },
        { icon: '🔗', label: 'API Testi', desc: 'requests kütüphanesi HTTP çağrılarını kolaylaştırır. REST API doğrulaması için idealdir.' },
        { icon: '📊', label: 'Veri İşleme', desc: 'pandas, csv, json — test verilerini herhangi bir formattan okuyun.' },
        { icon: '🔄', label: 'CI/CD Uyumlu', desc: "Python scriptleri Jenkins, GitHub Actions ve Docker\'la sorunsuz çalışır." },
      ]},
      4: { text: 'Test için Python vs Diğer Diller' },
      5: {
        headers: ['Dil', 'Artılar', 'Eksiler', 'En İyi Kullanım'],
        rows: [
          ['Python', 'Okunabilir, hızlı yazım, geniş ekosistem', 'Derlenmiş dillerden yavaş çalışma', 'Otomasyon scriptleri, API testleri, pytest'],
          ['Java', 'Kurumsal ölçek, güçlü tipleme', 'Ayrıntılı, yazmak daha yavaş', 'Selenium WebDriver, kurumsal legacy uygulamalar'],
          ['JavaScript', 'Web uygulamalarıyla aynı dil, async native', 'Callback karmaşıklığı', 'Playwright, Cypress, frontend testi'],
          ['C#', 'Microsoft stack, güçlü tipleme', 'Windows merkezli, daha az OSS', '.NET uygulamaları, SpecFlow, NUnit'],
        ]
      },
      6: { text: 'Popüler Python Test Kütüphaneleri' },
      7: {
        headers: ['Kütüphane', 'Amaç', 'Kurulum Komutu'],
        rows: [
          ['pytest', 'Test runner, fixture\'lar, assertion\'lar', 'pip install pytest'],
          ['selenium', 'Tarayıcı UI otomasyonu', 'pip install selenium'],
          ['playwright', 'Modern tarayıcı otomasyonu', 'pip install playwright'],
          ['requests', 'HTTP/API testi', 'pip install requests'],
          ['pandas', 'CSV/Excel test verisi okuma', 'pip install pandas'],
          ['faker', 'Gerçekçi test verisi üretme', 'pip install faker'],
          ['allure-pytest', 'Güzel test raporları', 'pip install allure-pytest'],
        ]
      },
    }
  }),
  applyTr(sections[1], {
    title: '📦 Python Kurulumu & Ortam Hazırlama',
    blocks: {
      0: { text: 'Adım 1: Python 3 İndirme ve Kurulum' },
      1: { items: [
        "python.org/downloads adresine gidin ve en son Python 3.x\'i indirin (Python 2 DEĞİL)",
        'Windows: Yükleyiciyi çalıştırın — KRİTİK: Yükle\'ye tıklamadan önce "Add Python to PATH" seçeneğini işaretleyin!',
        'Mac: python.org\'dan .pkg yükleyicisini kullanın veya: brew install python3',
        'Linux (Ubuntu/Debian): sudo apt update && sudo apt install python3 python3-pip',
      ]},
      2: { content: 'Windows kullanıcıları: "Add Python to PATH" seçeneğini işaretlemeyi unutursanız terminalde `python` komutu çalışmaz. Yükleyiciyi yeniden çalıştırın, "Modify" seçin ve PATH seçeneğini işaretleyin.' },
      3: { text: 'Adım 2: Kurulumu Doğrulama' },
      5: { text: 'Adım 3: Virtual Environment (Sanal Ortam) — Kritik!' },
      6: { content: "Virtual environment, projenize özgü izole bir Python kurulumudur. Projeler arası bağımlılık çakışmalarını önler. Proje A\'da requests==2.28, Proje B\'de requests==2.31 gerekiyorsa? Sanal ortamlar bunu çözer." },
      8: { content: 'Her yeni proje için venv oluşturun. `venv/` klasörünü .gitignore dosyasına ekleyin — asla commit etmeyin.' },
      9: { text: 'Adım 4: requirements.txt Kalıbı' },
      11: { text: 'Adım 5: İlk Program' },
    }
  }),
  applyTr(sections[2], {
    title: '🟢 Seviye 1: Python Temelleri',
    // Not: Bu sekmenin TÜM içeriği (heading/simple-box/text/comparison/table/quiz)
    // artık master `sections[2]` içinde doğrudan bilingual {tr,en} alanlar olarak
    // tanımlı — bu yüzden burada blok bazlı override'a gerek yok. Önceki override
    // burada (index 15-28) tamamen FARKLI/eski bir içerik kümesini (list/dict/set/
    // tuple görselleri) hedefliyordu; master içerik genişleyince index'ler kaymış
    // ve override yanlış bloklara (örn. index 19'daki gerçek Java karşılaştırma
    // tablosunun "rows" alanını) çarpıp veriyi bozuyordu (2026-06-23'te bulunan
    // gerçek kullanıcı bug raporu — boş görünen "Java ile Karşılaştırma" tablosu).
    blocks: {}
  }),
  applyTr(sections[3], {
    title: '🟡 Seviye 2: Orta Seviye Python',
    blocks: {
      0: { text: 'List Comprehension\'lar', difficulty: '🟡 Orta Seviye' },
      2: { text: 'Exception Handling (Hata Yönetimi)', difficulty: '🟡 Orta Seviye' },
      4: { text: 'Class\'lar ve OOP', difficulty: '🟡 Orta Seviye' },
      6: { text: 'Regular Expression\'lar (Regex)', difficulty: '🟡 Orta Seviye' },
      8: { text: 'JSON ile Çalışma', difficulty: '🟡 Orta Seviye' },
      10: { text: 'Page Object Model (Orta Seviye Örnek)', difficulty: '🟡 Orta Seviye' },
      12: { text: 'Pythonic Stil — Daha Temiz Kod Yazın' },
      13: {
        left: {
          label: '❌ Uzun — Geleneksel for döngüsü',
          code: `# Başarısız testlerin adlarını al
failed = []
for r in results:
    if r["status"] == "FAIL":
        failed.append(r["name"])`,
          note: '5 satır, geçici değişken, ekstra append çağrısı',
        },
        right: {
          label: '✅ Pythonic — List comprehension',
          code: `# Aynı sonuç tek okunabilir satırda:
failed = [r["name"] for r in results
          if r["status"] == "FAIL"]`,
          note: '1 satır, geçici değişken yok, daha hızlı çalışır',
        },
      },
      14: {
        left: {
          label: '❌ Tehlikeli — Genel except',
          code: `try:
    response = requests.get(url)
    data = response.json()
except:
    # KeyboardInterrupt ve SystemExit dahil
    # HER ŞEYİ yakalar!
    print("bir şeyler yanlış gitti")`,
          note: 'Tüm hataları gizler, debug edilemez',
        },
        right: {
          label: '✅ Güvenli — Belirli exception\'lar',
          code: `try:
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.Timeout:
    print("İstek 5 saniye sonra zaman aşımına uğradı")
except requests.exceptions.HTTPError as e:
    print(f"HTTP {e.response.status_code}")`,
          note: 'Her hata türü ayrı işlenir, net mesajlar',
        },
      },
      15: {
        question: 'Hangi Python koleksiyon tipi en HIZLI "bu değer burada mı?" kontrolünü sağlar (O(1) karmaşıklık)?',
        options: ['list', 'tuple', 'set', 'string'],
        correct: 2,
        explanation: 'set dahili olarak hash tablosu kullanır. "değer in my_set" kontrolü O(1)\'dir — boyuttan bağımsız sabit süre. list ve tuple her öğeyi tek tek kontrol eder (O(n)). Hızlı üyelik testi için her zaman set kullanın.',
      },
      16: { text: '☕ Java Biliyorsan: Kontrol Akışı Köprüsü' },
      17: { topic: 'for döngüleri', why: 'Python for-in, Java\'nın enhanced for-each döngüsüne çok benzer. Temel fark: Python\'da index VE değer için enumerate() kullanılır; Java\'da iki ayrı döngü stili gerekir.', note: 'Python\'da süslü parantez yok — GIRINTI blokları tanımlar! Eksik girinti = döngü gövdesi yok. Java\'dan geçişte en büyük sözdizimi şoku budur.' },
      18: { topic: 'method → fonksiyon', why: 'Java\'da her metod bir class içinde olmak zorundadır. Python fonksiyonları bağımsız (standalone) olabilir — küçük yardımcı araçlar için class yazmaya gerek yoktur. Varsayılan parametreler Java\'nın method overloading\'ini karşılar.', note: 'Python keyword argümanları güçlüdür: create_user("Bob", active=False, role="admin") — sıra önemli değil.' },
      19: { topic: 'Exception handling', why: 'Aynı konsept, farklı anahtar kelimeler: "catch" Python\'da "except" olur. Python\'da checked/unchecked exception ayrımı yoktur — tüm exception\'lar Java\'nın RuntimeException gibi davranır. throws bildirimi yoktur.', note: '"raise" (argümansız) = Java "throw e" (re-throw). "except Exception as e" = Java "catch (Exception e)". Python\'da checked exception yok — "throws IOException" bildirimi gerekmez.' },
    }
  }),
  applyTr(sections[4], {
    title: '🔴 Seviye 3: İleri Seviye Python',
    blocks: {
      0: { text: 'Decorator\'lar', difficulty: '🔴 İleri' },
      1: { content: "Decorator, başka bir fonksiyonu sarıp davranış ekleyen bir fonksiyondur — orijinali değiştirmeden. @ söz dizimiyle uygulanır. Herhangi bir fonksiyon çağrısı etrafında 'ön işleme + son işleme' olarak düşünün." },
      3: { text: 'Context Manager\'lar', difficulty: '🔴 İleri' },
      5: { text: 'Type Hint\'ler (Tip İpuçları)', difficulty: '🔴 İleri' },
      7: { text: 'Pytest Temelleri', difficulty: '🔴 İleri' },
      9: {
        title: 'Bir Decorator Nasıl Çalışır — Adım Adım',
        note: 'Decorator, fonksiyondan ÖNCE ve SONRA çalışır — proxy/wrapper kalıbı gibi. @timer söz dizimi şunun kısaltmasıdır: load_data = timer(load_data)',
        steps: [
          { num: '1', label: 'def timer(func)', desc: 'decorator fonksiyonu alır' },
          { num: '2', label: 'def wrapper()', desc: 'bir wrapper closure oluşturur' },
          { num: '3', label: 'ÖN: süreyi başlat', desc: 'func() çağrısından önceki kod', highlight: true },
          { num: '4', label: 'func(*args)', desc: 'ORİJİNAL fonksiyonu çağırır' },
          { num: '5', label: 'SON: süreyi logla', desc: 'func() döndükten sonraki kod', highlight: true },
          { num: '6', label: 'return wrapper', desc: 'decorator wrapper\'ı döndürür' },
        ],
      },
      10: {
        title: 'pytest Fixture Scope\'ları — Yaşam Döngüsü Piramidi',
        note: 'Kapsam ne kadar yüksekse o kadar az çalışır. session fixture tüm test çalıştırması için bir kez çalışır. function fixture her test için çalışır.',
        levels: [
          { label: 'session', desc: 'tüm test çalıştırması için bir kez', color: 'red' },
          { label: 'module', desc: 'her .py test dosyası için bir kez', color: 'orange' },
          { label: 'class', desc: 'her test sınıfı için bir kez', color: 'yellow' },
          { label: 'function', desc: 'her test öncesi ve sonrası (varsayılan)', color: 'green' },
        ],
      },
    }
  }),
  applyTr(sections[5], {
    title: '🧪 QA\'da Python — Gerçek Otomasyon Senaryoları',
    blocks: {
      2: { text: 'Senaryo 1: JSON API Yanıtını Parse Et & Değerleri Doğrula' },
      4: { text: "Senaryo 2: CSV\'den Data-Driven Testler" },
      6: { text: 'Senaryo 3: Kararsız Testler için Retry Decorator' },
      8: { text: 'Senaryo 4: İki API Yanıtını Karşılaştır' },
      10: { text: 'Senaryo 5: Setup/Teardown ile Pytest DB Fixture' },
      12: { text: 'Senaryo 6: Regex ile Test Verisi Doğrulama' },
      14: { text: 'Senaryo 7: Zaman Damgalı Test Raporu Oluştur' },
      16: { text: '🗂️ pytest Fixture\'ları Nasıl Bulur ve Enjekte Eder?' },
      17: {
        title: 'pytest Fixture Keşif & Enjeksiyon Akışı',
        note: 'Fixture\'lar aşağıdan yukarıya keşfedilir: önce yerel conftest.py, sonra üst klasörler, en son `page` ve `tmp_path` gibi yerleşikler.',
        steps: [
          { num: '1', label: 'Test dosyası', desc: 'test_*.py içindeki @pytest.fixture veya @pytest.mark.xxx', highlight: true },
          { num: '2', label: 'conftest.py (yerel)', desc: 'Testle aynı klasör — en özgün' },
          { num: '3', label: 'conftest.py (üst)', desc: 'Üst klasörler yukarı doğru aranır' },
          { num: '4', label: 'Plugin fixture\'ları', desc: 'pytest-playwright, pytest-django vb.' },
          { num: '5', label: 'Yerleşik fixture\'lar', desc: 'tmp_path, monkeypatch, capsys, caplog' },
          { num: '6', label: 'Enjekte et & çalıştır', desc: 'Eşleşen fixture\'lar enjekte edilir, test çalışır', highlight: true },
        ],
      },
      18: {
        left: {
          label: '❌ Anti-pattern: Her Testte Manuel Kurulum',
          code: `def test_order_placed():
    db = sqlite3.connect(":memory:")
    db.execute("CREATE TABLE orders ...")
    db.execute("INSERT INTO orders ...")

    # asıl test
    row = db.execute("SELECT ...").fetchone()
    assert row[0] == "pending"

    db.close()   # unutmak çok kolay!

def test_order_cancelled():
    db = sqlite3.connect(":memory:")  # tekrar!
    db.execute("CREATE TABLE orders ...")
    ...`,
          note: 'Tekrarlanan kurulum, unutulan teardown, bakımı zor',
        },
        right: {
          label: '✅ Fixture: DRY, Otomatik Teardown',
          code: `@pytest.fixture(scope="session")
def db():
    conn = sqlite3.connect(":memory:")
    conn.execute("CREATE TABLE orders ...")
    yield conn
    conn.close()  # otomatik teardown — her zaman çalışır

@pytest.fixture
def sample_order(db):
    cid = db.execute("INSERT ...").lastrowid
    yield cid
    db.execute("DELETE FROM orders WHERE id=?", (cid,))

def test_order_placed(sample_order, db):
    row = db.execute("SELECT status FROM orders WHERE id=?",
                     (sample_order,)).fetchone()
    assert row[0] == "pending"   # temiz, odaklı`,
          note: 'Bir kez kur, her yerde kullan, teardown garantili',
        },
      },
      19: {
        question: 'scope="session" ile işaretlenmiş bir pytest fixture, test çalışması boyunca kurulum kodunu kaç kez çalıştırır?',
        options: [
          'Her test fonksiyonu için bir kez',
          'Her test sınıfı için bir kez',
          'Her test dosyası için bir kez',
          'Tüm test oturumu için yalnızca bir kez',
        ],
        correct: 3,
        explanation: 'scope="session", fixture\'ı tüm pytest oturumu için yalnızca bir kez oluşturur ve TÜM testlerle paylaşır. DB bağlantıları ve tarayıcı örnekleri gibi pahalı kaynaklar için kullanın. Teardown (yield sonrası) en sonda yalnızca bir kez çalışır.',
      },
    }
  }),
  applyTr(sections[6], {
    title: '💼 Python Mülakat Soruları & Cevapları',
    blocks: {}
  }),
  applyTr(sections[7], {
    title: '📝 Pratik Alıştırmalar & Hızlı Referans',
    blocks: {
      0: { text: 'Pratik Alıştırmalar' },
      1: {
        difficulty: '🟢 Başlangıç',
        title: 'Alıştırma 1: Test Sonuçlarını Parse Et',
        description: 'Her biri "status" anahtarı ("PASS", "FAIL" veya "SKIP") olan dict\'lerin listesini alan parse_results(results) fonksiyonunu yazın. Döndürsün: {"PASS": N, "FAIL": N, "SKIP": N, "total": N}.',
        hint: 'Döngüden önce counts dict\'ini başlatın. Güvenlik için .get(status, "UNKNOWN") kullanın.',
        explanation: 'Döngüden önce counts\'ı başlatın. .get() ile varsayılan değer KeyError\'ı önler. "total" değerini sonunda ekleyin; bilinmeyenler dahil tüm öğeleri yansıtsın.',
      },
      2: {
        difficulty: '🟡 Orta',
        title: 'Alıştırma 2: APIClient Class\'ı',
        description: "base_url, get(path) ve post(path, data) metodlarına sahip APIClient class\'ı oluşturun; parse edilmiş JSON dönsün. ConnectionError (None döndür), Timeout (None döndür), HTTPError (fırlat) durumlarını yönetin. Bağlantı yeniden kullanımı için requests.Session kullanın.",
        hint: '__init__ içinde requests.Session() kullanın. response.raise_for_status() otomatik olarak 4xx/5xx için exception fırlatır.',
        explanation: "Session TCP bağlantılarını yeniden kullanarak overhead\'i azaltır. Ağ hatalarını (None döndür) HTTP hatalarından (fırlat) ayırmak çağıran koda farklı seçenekler sunar.",
      },
      3: {
        difficulty: '🔴 İleri',
        title: 'Alıştırma 3: Session DB + CSV Parametrize ile pytest conftest',
        description: "Session-scoped SQLite fixture ile conftest.py yazın (users tablosu oluşturun). parametrize ile CSV\'den test verisi yükleyip her kullanıcının e-postasını DB\'de doğrulayan test_users.py dosyası yazın.",
        hint: 'conftest.py scope="session". load_csv() fonksiyonunu @pytest.mark.parametrize([...]) içinde kullanın.',
        explanation: 'Session scope: DB tüm testler boyunca kalıcıdır (verimli). Her test kendi verilerini temizleyerek testler arası durum sızıntısını önler. parametrize tek fonksiyondan birden fazla senaryo çalıştırır.',
      },
      4: { text: 'Hızlı Referans Kartı' },
      5: {
        headers: ['Kavram', 'Söz Dizimi', 'Örnek'],
        rows: [
          ['f-string', 'f"{değişken}"', 'f"Test {name}: {status}"'],
          ['List comprehension', '[ifade for x in liste if koşul]', '[r["name"] for r in res if r["status"]=="FAIL"]'],
          ['Dict güvenli get', 'dict.get(anahtar, varsayılan)', 'row.get("status", "UNKNOWN")'],
          ['Unpacking', 'a, b = iterable', 'width, height = (1920, 1080)'],
          ['Type hint', 'parametre: tip', 'def fn(name: str) -> bool:'],
          ['Optional', 'Optional[T]', 'def fn(x: Optional[str] = None)'],
          ['Decorator', '@decorator', '@retry(max_attempts=3)'],
          ['Context manager', 'with ifade as değişken:', 'with open("f.txt") as f:'],
          ['Generator', 'yield değer', 'def gen(): yield öğe'],
          ['Fixture (pytest)', '@pytest.fixture(scope=...)', '@pytest.fixture(scope="session")'],
          ['Parametrize', '@pytest.mark.parametrize()', '@pytest.mark.parametrize("x,y", [(1,2)])'],
          ['Assert mesajlı', 'assert ifade, "mesaj"', 'assert status == "PASS", f"Alındı {status}"'],
          ['Regex match', 're.match(kalıp, s)', 're.match(r"^\\d+$", "123")'],
          ['JSON parse', 'json.loads(str)', 'data = json.loads(response.text)'],
          ['CSV okuma', 'csv.DictReader(f)', 'for row in csv.DictReader(f):'],
        ]
      },
      6: { content: 'Ayrıntılı çıktı ve kısa hata izleri için "python -m pytest -v --tb=short" çalıştırın. Hata ayıklarken tarayıcıyı görmek için Playwright\'a "--headed" ekleyin.' },
    }
  }),
  applyTr(sections[8], {
    title: '☕ Java → Python: Bildiğini Kullan',
    blocks: {
      0: { content: 'Core Java biliyorsan Python öğrenmek çok daha hızlı! Konseptler aynı — sözdizimi ve bazı kurallar farklı. Bu bölüm her Python kavramını tanıdık Java perspektifinden açıklar: neden gerekli, Java\'da nasıldı, Python\'da nasıl.' },
      1: { text: '1. Değişkenler ve Tipler' },
      2: { topic: 'Değişkenler ve Tipler', why: 'Java\'da her değişkenin tipi derleme zamanında sabitlenir. Python\'da tipler dinamik — aynı değişken farklı tipler tutabilir. Testleri daha hızlı yazarsın ama dikkatli olman gerekir.', note: 'Python type hints (count: int) Java gibi görünür ama çalışma zamanında zorlanmaz. Statik kontrol için mypy kullan.' },
      3: { text: '2. None — null\'ın Karşılığı' },
      4: { topic: 'null → None', why: 'Java\'da null NullPointerException\'a yol açar. Python\'da aynı risk var ama None olarak adlandırılır. "is None" kullanımı en iyi pratiktir.', note: '"is None" kullan, "== None" değil. value or "default" falsy check yapar (0, "", [] da default döner), dikkatli kullan.' },
      5: { text: '3. List — ArrayList\'in Karşılığı' },
      6: { topic: 'ArrayList → list', why: 'Java ArrayList ve Python list aynı amaca hizmet eder: dinamik boyutlu sıralı koleksiyon. Python sözdizimi çok daha kısadır — new yoktur, import yoktur, generic tip yoktur.', note: 'Python list mixed type destekler. append()=add(), remove()=remove(), len()=size(), in=contains(). "new ArrayList<>()" yok — sadece [].' },
      7: { text: '4. Dict — HashMap\'in Karşılığı' },
      8: { topic: 'HashMap → dict', why: 'Java HashMap ve Python dict aynı konsept: key-value eşlemeleri. Python sözdizimi çok daha temizdir — put/get yerine [] kullanılır, import gerekmez.', note: 'Python dict Python 3.7\'den itibaren ekleme sırasını korur. put()=d["k"]=v, get()=d.get("k"), entrySet()=.items().' },
      9: { text: '5. Set — HashSet\'in Karşılığı' },
      10: { topic: 'HashSet → set', why: 'Tekrar eden öğeleri elemek ve O(1) üyelik kontrolü için — Java\'da HashSet, Python\'da set. Hem sözdizimi hem performans karakteristiği aynıdır.', note: 'O(1) lookup için list yerine set kullan. Python set ve Java HashSet aynı Big-O garantileri sunar.' },
      11: { text: '6. Tuple — Java\'da Doğrudan Karşılığı Yok' },
      12: { topic: 'tuple (Java\'da yok!)', why: 'Python tuple immutable sıralı koleksiyondur. Java\'da en yakın List.of() veya record\'dur. Python\'da birden fazla değer döndürmek için tuple kullanılır.', note: 'Python\'ın en güçlü özelliklerinden biri: birden fazla değer döndürmek için tuple kullan. Java\'da Result/Pair sarmalayıcı gerekir; Python\'da sadece "return a, b".' },
      13: { text: '7. String Formatting — f-string vs String.format()' },
      14: { topic: 'String formatting', why: 'Test logları ve raporlarında sık kullanılır. Python f-string, Java String.format()\'un çok daha okunabilir versiyonudur.', note: 'f-string {} içine method çağrısı, hesaplama, koşul da yazabilirsin. %s veya String.format kullanma — f-string her zaman daha okunabilir.' },
      15: { text: '8. Döngüler — for-each → for-in' },
      16: { topic: 'for loops', why: 'Python for-in, Java\'nın enhanced for-each döngüsüne çok benzer. Tek fark: Python\'da index için enumerate() kullanılır.', note: 'Python\'da süslü parantez yok — GİRİNTİ blokları tanımlar! Eksik girinti = döngü gövdesi yok. Java\'dan geçişte en büyük sözdizimi şoku budur.' },
      17: { text: '9. Fonksiyonlar — Method → def' },
      18: { topic: 'methods → functions', why: 'Java\'da her metod bir class içinde olmak zorundadır. Python\'da fonksiyonlar serbest (standalone) olabilir. Default parametreler Java method overloading\'in yerini alır.', note: 'Python keyword arguments güçlüdür: create_user("Bob", active=False, role="admin") — sıra önemli değil.' },
      19: { text: '10. Exception Handling — try/catch → try/except' },
      20: { topic: 'Exception handling', why: 'Aynı konsept, farklı anahtar kelimeler: "catch" Python\'da "except" olur. Python\'da checked/unchecked exception ayrımı yoktur — throws bildirimi yoktur.', note: '"raise" (argümansız) = Java "throw e". Python\'da checked exceptions yok — "throws IOException" bildirimi gerekmez.' },
      21: { text: '11. Sınıflar ve OOP — class (Çok Benzer!)' },
      22: { topic: 'class & OOP', why: 'Python class yapısı Java\'ya çok benzer. İki kritik fark: (1) her method "self" parametresi alır, (2) access modifier\'lar kural — zorunluluk değil.', note: '"self" Python\'da explicit. @property = getter (parantez olmadan çağrılır). __init__ = constructor. __str__ = toString().' },
      23: { text: '12. Erişim Belirleyicileri — Kural, Zorunluluk Değil!' },
      24: { topic: 'access modifiers (kural, zorunluluk değil!)', why: 'Java\'da private/public/protected derleyici tarafından zorlanır. Python\'da sadece kuraldır — _ ve __ prefix kullanılır ama dışarıdan hala erişilebilir!', note: '__ (double underscore) ismi karıştırır ama engellemez. Python felsefesi: "Hepimiz yetişkiniz, gizlemeye gerek yok."' },
      25: { text: '13. Java Streams → List Comprehension' },
      26: { topic: 'Streams → List Comprehensions', why: 'Java 8 Streams ve Python list comprehension aynı amaca hizmet eder: filtrele ve dönüştür. Python versiyonu çok daha kısadır.', note: '[x for x in list if cond] = stream().filter().map().collect(). Bu idiom Python\'da her yerde kullanılır — mutlaka öğren.' },
      27: { text: '14. try-with-resources → with' },
      28: { topic: 'try-with-resources → with', why: 'Dosya, DB bağlantısı gibi kaynakları güvenli kapatmak için. Java\'da try-with-resources, Python\'da "with". Aynı güvence: hata olsa bile kaynak kapanır.', note: '"with" AutoCloseable implement eden her nesneyle çalışır. "finally: f.close()" artık eski tarz.' },
      29: { text: '15. Kalıtım — extends/implements → Python' },
      30: { topic: 'inheritance & abstract class', why: 'Python\'da extends ve implements arasında ayrım yoktur. Abstract class için ABC kullanılır. Multiple inheritance doğal desteklenir.', note: 'Python multiple inheritance destekler: (BasePage, Loggable). @Override yok — sadece metodu yeniden tanımla.' },
      31: { text: 'Hızlı Karşılaştırma Tablosu' },
      32: {
        headers: ['Kavram', 'Java', 'Python', 'Not'],
        rows: [
          ['Değişken', 'int x = 5;', 'x = 5', 'Python: dinamik tipleme'],
          ['Null', 'null', 'None', '"is None" kullan, "== None" değil'],
          ['Dinamik dizi', 'ArrayList<T>', 'list', 'Import yok, generic tip yok'],
          ['Key-value map', 'HashMap<K,V>', 'dict', 'Import yok, literal: {k: v}'],
          ['Benzersiz set', 'HashSet<T>', 'set', 'Import yok, literal: {v1, v2}'],
          ['Immutable liste', 'List.of() / record', 'tuple', 'Birden fazla değer dönüşü için'],
          ['String format', 'String.format()', 'f"...{var}..."', 'f-string çok daha temiz'],
          ['For-each', 'for (T x : list)', 'for x in list:', 'Index için enumerate()'],
          ['Constructor', 'ClassName(args)', '__init__(self, args)', 'self explicit this'],
          ['toString()', 'toString()', '__str__(self)', '@Override yok'],
          ['Getter', 'getX()', '@property', 'Parantez olmadan çağrılır'],
          ['Private field', 'private int x;', 'self.__x', 'ZORUNLU DEĞİL! Sadece kural'],
          ['Streams filter', '.stream().filter()', '[x for x in ... if ...]', 'List comprehension'],
          ['try-catch', 'try {} catch (E e)', 'try: ... except E as e:', '"catch" → "except"'],
          ['try-resources', 'try (Res r = ...)', 'with Res() as r:', '"with" auto-close'],
          ['Abstract class', 'abstract class', 'class X(ABC)', 'from abc import ABC'],
          ['Interface', 'interface I {}', 'class I: (plain class)', 'Interface keyword yok'],
          ['Kalıtım', 'extends Base', 'class X(Base):', 'Parantez içinde'],
        ],
      },
    },
  }),
]

// --- TRANSLATION MAP & HELPERS ---
const translationMap = {
  'Lists': { tr: 'Listeler', en: 'Lists' },
  'Tuples': { tr: 'Demetler (Tuples)', en: 'Tuples' },
  'Sets': { tr: 'Setler (Kümeler)', en: 'Sets' },
  'Dictionaries': { tr: 'Sözlükler (Dictionaries)', en: 'Dictionaries' },
  'If...Else (Conditions)': { tr: 'Koşul Durumları (If...Else)', en: 'If...Else (Conditions)' },
  'While Loops': { tr: 'While Döngüleri', en: 'While Loops' },
  'For Loops': { tr: 'For Döngüleri', en: 'For Loops' },
  'Functions': { tr: 'Fonksiyonlar', en: 'Functions' },
  'Lambda Functions': { tr: 'Lambda Fonksiyonları', en: 'Lambda Functions' },
  'Classes / Objects': { tr: 'Sınıflar & Nesneler', en: 'Classes / Objects' },
  'Inheritance': { tr: 'Kalıtım (Inheritance)', en: 'Inheritance' },
  'Scope': { tr: 'Kapsam (Scope)', en: 'Scope' },
  'Modules': { tr: 'Modüller', en: 'Modules' },
  'Try...Except': { tr: 'Hata Yönetimi (Try...Except)', en: 'Try...Except' },
  'JSON': { tr: 'JSON İşlemleri', en: 'JSON' },
  'RegEx': { tr: 'Düzenli İfadeler (RegEx)', en: 'RegEx' },
  'Comprehensions': { tr: 'Comprehensions (Kapsamlar)', en: 'Comprehensions' },
  'Iterators': { tr: 'Iterators (Yineleyiciler)', en: 'Iterators' },
  'Decorators': { tr: 'Dekoratörler (Decorators)', en: 'Decorators' },
  'Context Managers': { tr: 'Context Managers', en: 'Context Managers' },
  'Type Hints': { tr: 'Type Hints (Tip İpuçları)', en: 'Type Hints' },
  'Polymorphism': { tr: 'Polimorfizm (Çok Biçimlilik)', en: 'Polymorphism' },
  'Arrays (array module)': { tr: 'Arrays (Diziler)', en: 'Arrays (array module)' },
  'Dates (datetime module)': { tr: 'Tarihler (datetime)', en: 'Dates (datetime module)' },
  'Math (math module)': { tr: 'Matematik (math)', en: 'Math (math module)' },
  'PIP — Python Package Manager': { tr: 'PIP Paket Yöneticisi', en: 'PIP — Python Package Manager' },
  'User Input': { tr: 'Kullanıcı Girdisi (User Input)', en: 'User Input' },
  'String Formatting': { tr: 'String Formatlama', en: 'String Formatting' },
  'File Handling': { tr: 'Dosya Yönetimi (File Handling)', en: 'File Handling' }
};

function translateBlocks(blocks) {
  return blocks.map(block => {
    if (block.type === 'heading' && typeof block.text === 'string') {
      const trans = translationMap[block.text];
      if (trans) {
        return { ...block, text: trans };
      }
    }
    return block;
  });
}

// --- FEYNMAN CHECKPOINTS ---
const feynman1 = {
  type: 'feynman-checkpoint',
  promptTr: 'Sanal ortam (venv) nedir ve test otomasyonunda neden her proje için ayrı bir venv kullanırız?',
  promptEn: 'What is a virtual environment (venv) and why do we use a separate venv for each test automation project?',
  keywords: [['venv', 'sanal', 'virtual'], ['izole', 'isolate', 'isolation'], ['çakışma', 'conflict', 'version', 'sürüm'], ['bağımlılık', 'dependency', 'package', 'paket']],
  minScore: 2,
  modelAnswerTr: 'Sanal ortam (venv), Python projelerimizin bağımlılıklarını izole eden bir yapıdır. Her proje için ayrı venv kullanırız çünkü farklı projeler farklı paket sürümleri (örn. requests 2.28 vs 2.31) gerektirebilir ve bu sayede sistem genelinde çakışmaları önlemiş oluruz.',
  modelAnswerEn: 'A virtual environment (venv) is an isolated folder structure for a project\'s dependencies. We use a separate venv for each project to prevent dependency version conflicts (e.g. requests 2.28 vs 2.31) and keep global Python clean.'
};

const feynman2A = {
  type: 'feynman-checkpoint',
  promptTr: "Python'da kod bloklarının başlangıcı ve sonu süslü parantezler olmadan nasıl anlaşılır? Girintileme hatası (IndentationError) aldığında ne yaparsın?",
  promptEn: 'How does Python mark the start and end of code blocks without curly braces? What do you do when you get an IndentationError?',
  keywords: [['girinti', 'indentation', 'indent'], ['iki nokta', 'colon', ':'], ['boşluk', 'space', 'tab'], ['blok', 'block']],
  minScore: 2,
  modelAnswerTr: "Python'da kod blokları süslü parantezler yerine girintileme (genelde 4 boşluk) ve iki nokta (:) işareti ile başlar. Girinti azaldığında blok biter. IndentationError aldığımda hizalamayı ve boşluk sayılarını kontrol ederim.",
  modelAnswerEn: 'Python uses indentation (usually 4 spaces) and colons (:) to define blocks. Moving back to the outer indent level marks block end. On IndentationError, I verify alignment and space counts.'
};

const feynman2B = {
  type: 'feynman-checkpoint',
  promptTr: "Python'da dinamik tipleme (dynamic typing) ne anlama gelir? Bir değişkenin tipini kod çalışırken nasıl doğrularsın?",
  promptEn: "What does dynamic typing mean in Python? How can you verify a variable's type at runtime?",
  keywords: [['dinamik', 'dynamic'], ['tip', 'type'], ['type()', 'isinstance'], ['çalışma zamanı', 'runtime']],
  minScore: 2,
  modelAnswerTr: "Dinamik tipleme, değişkenlerin tipinin önceden beyan edilmemesi ve çalışma zamanında otomatik belirlenmesidir. Tipi doğrulamak için type() veya isinstance() fonksiyonlarını kullanırım.",
  modelAnswerEn: 'Dynamic typing means variables do not need explicit type declarations; Python infers them at runtime. I verify types at runtime using type() or isinstance().'
};

const feynman2C = {
  type: 'feynman-checkpoint',
  promptTr: "Python'da string slicing (dilimleme) nedir? s[::-1] ifadesinin ne işe yaradığını anlat.",
  promptEn: 'What is string slicing in Python? Explain what s[::-1] does.',
  keywords: [['dilim', 'slice', 'slicing'], ['ters', 'reverse', 'backward'], ['adım', 'step', '-1']],
  minScore: 2,
  modelAnswerTr: "String slicing, metnin belirli bir kısmını [başlangıç:bitiş:adım] formatında seçmektir. s[::-1] ifadesi, -1 adım değeriyle stringi sondan başa doğru okuyarak tersine çevirir.",
  modelAnswerEn: 'String slicing extracts a substring using [start:stop:step] syntax. The s[::-1] expression uses step -1 to traverse the string backward, reversing it.'
};

const feynman2D = {
  type: 'feynman-checkpoint',
  promptTr: "Python'daki 'is' operatörü ile '==' operatörü arasındaki farkı, referans ve değer bazlı karşılaştırma kavramlarıyla açıkla.",
  promptEn: 'Explain the difference between the "is" and "==" operators in Python using reference and value comparison concepts.',
  keywords: [['is', 'identity', 'kimlik'], ['==', 'değer', 'value'], ['referans', 'reference'], ['hafıza', 'memory', 'address', 'adres']],
  minScore: 2,
  modelAnswerTr: "'==' operatörü iki nesnenin içindeki değerlerin eşit olup olmadığını kontrol eder. 'is' operatörü ise iki değişkenin bellekte tamamen aynı nesneyi (aynı referans adresini) işaret edip etmediğini kontrol eder.",
  modelAnswerEn: "'==' compares values for equality. 'is' checks object identity, verifying if both variables point to the exact same object reference in memory."
};

const feynman3A = {
  type: 'feynman-checkpoint',
  promptTr: "List ile tuple arasındaki temel fark nedir? Selenium locator'larını tanımlarken neden tuple tercih ederiz?",
  promptEn: 'What is the key difference between a list and a tuple? Why do we prefer tuples for defining Selenium locators?',
  keywords: [['mutable', 'değiştirilebilir', 'change'], ['immutable', 'sabit', 'değiştirilemez'], ['locator'], ['tuple']],
  minScore: 2,
  modelAnswerTr: "Listeler değiştirilebilir (mutable), tuple'lar ise değiştirilemezdir (immutable). Selenium locator'ları sabit kalması gerektiği için kazara değiştirilmelerini önlemek amacıyla tuple tercih edilir.",
  modelAnswerEn: 'Lists are mutable (can change), while tuples are immutable (constant). We prefer tuples for Selenium locators to ensure they stay constant and prevent accidental runtime modifications.'
};

const feynman3B = {
  type: 'feynman-checkpoint',
  promptTr: "Set veri tipinin listelerden farkı nedir? QA'de test verisi ararken set veya dict kullanmanın hız avantajı nedir?",
  promptEn: 'How does a set differ from a list? What is the speed advantage of using a set or dict for test data lookup in QA?',
  keywords: [['benzersiz', 'unique'], ['hash'], ['O(1)', 'sabit', 'constant'], ['hızlı', 'fast', 'hız']],
  minScore: 2,
  modelAnswerTr: "Set elemanları benzersizdir ve sırasızdır. Listelerde arama yapmak O(n) zaman alırken, set ve dict yapıları hash tablosu kullandığı için arama hızı O(1) düzeyindedir ve çok daha hızlıdır.",
  modelAnswerEn: 'Sets hold unique, unordered elements. Searching in a list takes O(n) time, whereas sets and dicts use hash lookups which take O(1) constant time, making them extremely fast.'
};

const feynman3C = {
  type: 'feynman-checkpoint',
  promptTr: "Bir test senaryosunda dinamik bir bekleme (wait loop) yaparken while döngüsünü break ile nasıl kurgularsın?",
  promptEn: 'How would you construct a dynamic wait loop in a test using a while loop and break?',
  keywords: [['while'], ['break'], ['koşul', 'condition', 'timeout', 'zaman'], ['döngü', 'loop']],
  minScore: 2,
  modelAnswerTr: "Döngüyü 'while True' ile başlatır, her iterasyonda elementi kontrol ederim. Element bulunursa veya maksimum süre aşılırsa 'break' ile döngüyü sonlandırırım. Araya küçük bir time.sleep koyarım.",
  modelAnswerEn: 'I start a "while True" loop, check for the element, and trigger a "break" once it is found or the timeout is reached. I add time.sleep to avoid high CPU usage.'
};

const feynman3D = {
  type: 'feynman-checkpoint',
  promptTr: "Python'da fonksiyonlara varsayılan parametre (default argument) nasıl verilir ve bu özellik Java'daki method overloading'in yerini nasıl tutar?",
  promptEn: 'How do you provide default arguments to Python functions, and how does this feature replace Java\'s method overloading?',
  keywords: [['varsayılan', 'default'], ['overload', 'overloading'], ['parametre', 'argument'], ['def']],
  minScore: 2,
  modelAnswerTr: "Fonksiyon tanımında parametreye eşittir ile değer atanarak varsayılan değer verilir (def log(msg, level='INFO')). Bu sayede tek fonksiyon farklı parametre sayılarıyla çağrılabilir, Java'daki gibi ayrı metodlar overload etmeye gerek kalmaz.",
  modelAnswerEn: 'Default arguments are set using assignment in definition: def log(msg, level="INFO"). This allows calling the function with varying parameter counts, replacing the need for Java method overloading.'
};

const feynman4A = {
  type: 'feynman-checkpoint',
  promptTr: "Python'daki __init__ ve self kavramlarını Java'daki constructor ve this ile kıyaslayarak anlat.",
  promptEn: 'Explain the concepts of __init__ and self in Python by comparing them with constructor and this in Java.',
  keywords: [['init', 'constructor'], ['self', 'this'], ['instance', 'örnek'], ['açık', 'explicit']],
  minScore: 2,
  modelAnswerTr: "__init__ Python'daki constructor metodudur. 'self' ise Java'daki 'this' gibidir, nesnenin kendisini işaret eder; ancak Python'da her metodun ilk parametresi olarak açıkça (explicit) yazılmalıdır.",
  modelAnswerEn: '__init__ is Pythons constructor method. self is like Javas this, representing the object instance, but in Python it must be explicitly declared as the first parameter of every instance method.'
};

const feynman4B = {
  type: 'feynman-checkpoint',
  promptTr: "Python'da global ve nonlocal keyword'leri ne zaman gereklidir ve modül import ederken import module ile from module import func arasındaki fark nedir?",
  promptEn: 'When are global and nonlocal keywords needed in Python, and what is the difference between import module and from module import func?',
  keywords: [['global'], ['nonlocal'], ['import'], ['kapsam', 'scope'], ['isim alanı', 'namespace']],
  minScore: 2,
  modelAnswerTr: "global, lokal bir alandan dış kapsamdaki global değişkeni değiştirmek için kullanılır; nonlocal ise iç içe fonksiyonlarda üst kapsamdaki değişkeni değiştirmek içindir. 'import module' tüm modülü isim alanıyla getirirken, 'from module import func' sadece ilgili fonksiyonu direkt getirir.",
  modelAnswerEn: 'global modifies a variable in the module-level scope from a local scope; nonlocal modifies a variable in the enclosing outer function scope. import module imports the module namespace, while from module import func imports the function directly.'
};

const feynmanHelper = {
  type: 'feynman-checkpoint',
  promptTr: "Python'da Dates (datetime) ve Math modüllerini test otomasyonunda hangi amaçlarla kullanırız? Somut örnekler ver.",
  promptEn: 'For what purposes do we use Dates (datetime) and Math modules in test automation in Python? Give concrete examples.',
  keywords: [['datetime', 'tarih', 'date'], ['math', 'matematik'], ['rapor', 'report', 'timestamp'], ['yuvarla', 'round', 'ceil', 'floor']],
  minScore: 2,
  modelAnswerTr: "datetime modülünü test raporlarına zaman damgası eklemek veya dinamik gelecek/geçmiş tarihli test verisi üretmek için kullanırız. math modülünü ise sayfa sayılama hesaplamalarında (örn. ceil(total_items / page_size)) kullanırız.",
  modelAnswerEn: 'We use datetime for generating dynamic test data (timestamps, past/future dates) and logging test execution times. We use math for calculations like page count paging (e.g. math.ceil(items / limit)).'
};

const feynman4C = {
  type: 'feynman-checkpoint',
  promptTr: "QA'de test verisi okurken neden open() fonksiyonunu with (context manager) bloğu ile kullanmalıyız?",
  promptEn: 'Why should we use the open() function with a with statement (context manager) when reading test data in QA?',
  keywords: [['with'], ['close', 'kapat'], ['open'], ['context manager'], ['hata', 'error', 'exception']],
  minScore: 2,
  modelAnswerTr: "with bloğu bir context manager'dır. Dosya okurken with kullanırsak, işlem bitince veya kod hata fırlatıp çökse bile dosya otomatik olarak kapatılır (close edilir). Bu, bellek ve dosya kilidi sızıntılarını önler.",
  modelAnswerEn: 'The with statement acts as a context manager. It guarantees that the file is automatically closed (close() is called) when the block exits, even if exceptions occur, preventing resource leaks.'
};

const feynman4D = {
  type: 'feynman-checkpoint',
  promptTr: "QA testlerinde genel bir except: (veya except Exception:) kullanmanın yaratacağı riski ve neden spesifik exception tiplerini yakalamamız gerektiğini anlat.",
  promptEn: 'Explain the risk of using a generic except: (or except Exception:) block in QA tests and why we should catch specific exception types.',
  keywords: [['spesifik', 'specific'], ['risk'], ['except'], ['exception', 'hata'], ['gizle', 'hide', 'debug']],
  minScore: 2,
  modelAnswerTr: "Genel bir except bloğu, beklenmedik hataları (örn. syntax hatası, Assertion ve KeyboardInterrupt) da yakalayıp yutar. Bu, gerçek hataları gizler ve debug etmeyi imkansızlaştırır. Sadece beklediğimiz spesifik hataları (örn. TimeoutException) yakalamalıyız.",
  modelAnswerEn: 'Generic except blocks catch and swallow everything, including syntax errors, assertions, or system exits. This hides real bugs and makes debugging impossible. We should always target specific exceptions.'
};

const feynman4E = {
  type: 'feynman-checkpoint',
  promptTr: "Bir decorator'ın (@decorator) çalışma mantığını anlat. Test otomasyonunda @retry mekanizması kurarken arka planda ne döner?",
  promptEn: 'Explain the working logic of a decorator (@decorator). What happens behind the scenes when setting up a @retry mechanism in test automation?',
  keywords: [['wrapper', 'sar', 'wrap'], ['decorator'], ['retry'], ['fonksiyon', 'function']],
  minScore: 2,
  modelAnswerTr: "Decorator, bir fonksiyonu girdi olarak alıp onu yeni bir wrapper fonksiyon ile saran ve bu wrapper'ı döndüren bir fonksiyondur. @retry kullandığımızda, wrapper fonksiyon orijinal testi bir try-except içinde döngüyle çağırır ve hata alınca tekrar dener.",
  modelAnswerEn: 'A decorator takes a function as input, wraps it inside another function (wrapper) that adds behavior, and returns the wrapper. @retry wraps the test function in a loop with try-except to rerun on failure.'
};

const feynman5 = {
  type: 'feynman-checkpoint',
  promptTr: "pytest fixture'larında yield anahtar kelimesi ne işe yarar? setup ve teardown işlemlerinin yield ile nasıl ayrıldığını açıkla.",
  promptEn: 'What does the yield keyword do in pytest fixtures? Explain how setup and teardown operations are separated by yield.',
  keywords: [['yield'], ['setup', 'kurulum'], ['teardown', 'yıkım', 'temizlik', 'cleanup'], ['fixture']],
  minScore: 2,
  modelAnswerTr: "yield kelimesinden önceki kodlar test başlamadan önce çalışır (setup). yield testi çalıştıracak değeri döner ve testi başlatır. Test bittikten sonra ise yield'dan sonraki temizlik kodları çalışır (teardown).",
  modelAnswerEn: 'The code before yield runs before the test (setup). yield passes data to the test and pauses. Once the test finishes, code after yield runs to clean up resources (teardown).'
};

const feynmanEcosystem = {
  type: 'feynman-checkpoint',
  promptTr: "Bir Python test otomasyon projesinin ekosistemini (pip, virtualenv, requirements.txt) Java dünyasındaki Maven/Gradle ile eşleştirerek açıkla.",
  promptEn: 'Explain the ecosystem of a Python test automation project (pip, virtualenv, requirements.txt) by mapping it to Maven/Gradle in the Java world.',
  keywords: [['pip'], ['maven', 'pom.xml'], ['requirements.txt'], ['ekosistem', 'ecosystem'], ['bağımlılık', 'dependency']],
  minScore: 2,
  modelAnswerTr: "pip, Java'daki Maven'ın paket indirme aracına eşdeğerdir. requirements.txt ise pom.xml'in bağımlılık listesi gibidir. virtualenv (venv) ise bağımlılıkları projeye özel izole eder, Java'da genelde bağımlılıklar global maven repository'de (.m2) tutulur.",
  modelAnswerEn: 'pip is like Mavens dependency downloader. requirements.txt is similar to dependencies in pom.xml. venv isolates dependencies per project, whereas Java holds dependencies globally in the .m2 repository.'
};

const feynmanTroubleshooting = {
  type: 'feynman-checkpoint',
  promptTr: "Selenium'da StaleElementReferenceException hatasının nedeni nedir ve bu hatayı engellemek için kodunda nasıl bir strateji izlersin?",
  promptEn: 'What causes a StaleElementReferenceException in Selenium and what strategy do you follow in your code to prevent this error?',
  keywords: [['stale', 'eskimiş'], ['dom'], ['refind', 'yeniden bul', 're-find'], ['reload', 'yenile', 'refresh']],
  minScore: 2,
  modelAnswerTr: "StaleElementReferenceException, referans alınan elementin DOM yenilendiği için (re-render, sayfa yenileme) artık sayfada fiziksel olarak bulunmamasıdır. Çözüm için element referansını saklamak yerine her kullanımdan önce yeniden sorgulayıp (find_element) buluruz.",
  modelAnswerEn: 'StaleElementReferenceException happens when the referenced element is no longer attached to the DOM (due to page reload or re-render). To fix it, we must re-query the element (find_element) right before using it instead of reusing stale references.'
};

const feynman8 = {
  type: 'feynman-checkpoint',
  promptTr: "Java'dan Python'a geçen bir QA otomasyon mühendisinin en çok dikkat etmesi gereken 3 felsefi/sözdizimsel farkı özetle.",
  promptEn: 'Summarize 3 philosophical/syntactic differences that a QA automation engineer transitioning from Java to Python should pay closest attention to.',
  keywords: [['dinamik', 'dynamic'], ['girinti', 'indentation'], ['boilerplate', 'standalone', 'fonksiyon', 'function']],
  minScore: 2,
  modelAnswerTr: "(1) Python dinamik tiplidir, tip tanımlanmaz. (2) Süslü parantez yoktur, bloklar girinti (hizalama) ile ayrılır. (3) boilerplate kod çok azdır; bağımsız fonksiyonlar yazılabilir, her şey için class zorunlu değildir.",
  modelAnswerEn: '(1) Python is dynamically typed, so no type declarations. (2) Indentation defines blocks, not curly braces. (3) Extremely low boilerplate; standalone functions are fully supported, no classes required for everything.'
};

const feynman7 = {
  type: 'feynman-checkpoint',
  promptTr: "Yazdığın APIClient sınıfında requests.get çağrısı yaparken oluşabilecek network zaman aşımlarını (Timeout) nasıl handle ettin ve kodunu nasıl test ettin?",
  promptEn: 'How did you handle potential network timeouts when calling requests.get in your APIClient class, and how did you test your code?',
  keywords: [['timeout', 'zaman aşımı'], ['requests'], ['try'], ['except'], ['client']],
  minScore: 2,
  modelAnswerTr: "requests.get çağrısına timeout=X parametresi ekledim. Bunu try-except bloğu içine alarak requests.exceptions.Timeout hatasını yakaladım ve kullanıcıya uygun bir mesaj/log döndürdüm.",
  modelAnswerEn: 'I added timeout=X parameter to requests.get call. I wrapped it in try-except catching requests.exceptions.Timeout, and returned an appropriate message/log or raised a custom exception.'
};

// --- NEW ECOSYSTEM BLOCKS ---
const pythonEcosystemBlocks = [
  {
    type: 'heading',
    text: { tr: 'Python Test Ekosistemi', en: 'Python Test Ecosystem' },
    difficulty: '🟢 Beginner'
  },
  {
    type: 'simple-box',
    emoji: '🌐',
    content: {
      tr: 'Python ekosistemi geniş bir yapboz gibidir. Her araç (pip, pytest, allure, black) farklı bir parçayı temsil eder ve birleşerek tam bir otomasyon hattı oluşturur.',
      en: 'The Python ecosystem is like a giant puzzle. Each tool (pip, pytest, allure, black) represents a piece that fits together to build a complete automation pipeline.'
    }
  },
  {
    type: 'text',
    content: {
      tr: 'Java dünyasında Maven ve Gradle projenin her şeyini (bağımlılık yönetimi, derleme, test çalıştırma) yönetir. Python\'da ise bu görevler araçlar arasında bölünmüştür: bağımlılıklar için pip/requirements, test çalıştırma için pytest, kod kalitesi için black/flake8 kullanılır.',
      en: 'In Java, Maven or Gradle manages everything (dependencies, compilation, test running). In Python, these roles are split among tools: pip/requirements for dependencies, pytest for running, black/flake8 for code style.'
    }
  },
  {
    type: 'comparison',
    title: { tr: 'Test Araçları Karşılaştırması', en: 'Ecosystem Comparison — Java vs Python' },
    columns: ['Java / Maven Stack', 'Python / pytest Stack'],
    rows: [
      { concept: { tr: 'Test Runner', en: 'Test Runner' }, java: 'JUnit / TestNG', python: 'pytest' },
      { concept: { tr: 'Dependency Manager', en: 'Dependency Manager' }, java: 'Maven (pom.xml) / Gradle', python: 'pip (requirements.txt) / Poetry' },
      { concept: { tr: 'API Testing', en: 'API Testing' }, java: 'REST Assured / HttpClient', python: 'requests' },
      { concept: { tr: 'HTML Reporting', en: 'HTML Reporting' }, java: 'Extent Reports / Allure', python: 'pytest-html / allure-pytest' },
      { concept: { tr: 'Code Formatter', en: 'Code Formatter' }, java: 'Black / Flake8' , python: 'black / flake8' },
      { concept: { tr: 'Data Generation', en: 'Data Generation' }, java: 'JavaFaker', python: 'Faker' }
    ]
  },
  {
    type: 'diagram-svg',
    title: { tr: 'Python Test Pipeline Akışı', en: 'Python Test Pipeline Flow' },
    svg: `<svg viewBox="0 0 600 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="none" />
      <rect x="20" y="70" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
      <text x="70" y="100" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">Git / CI</text>
      <text x="70" y="118" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">Trigger</text>
      
      <rect x="160" y="70" width="100" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2" />
      <text x="210" y="100" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">venv &amp; pip</text>
      <text x="210" y="118" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">Install Deps</text>
      
      <rect x="300" y="70" width="100" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
      <text x="350" y="100" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">pytest</text>
      <text x="350" y="118" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">Run Tests</text>
      
      <rect x="440" y="70" width="140" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2" />
      <text x="510" y="100" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">Allure / HTML</text>
      <text x="510" y="118" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">Generate Reports</text>
      
      <line x1="120" y1="100" x2="155" y2="100" stroke="#6b7280" stroke-width="2" marker-end="url(#arrow)" />
      <line x1="260" y1="100" x2="295" y2="100" stroke="#6b7280" stroke-width="2" marker-end="url(#arrow)" />
      <line x1="400" y1="100" x2="435" y2="100" stroke="#6b7280" stroke-width="2" marker-end="url(#arrow)" />
    </svg>`
  }
];

// --- TABS & HERO DEFINITIONS ---
const trHero = {
  title: '🐍 Python',
  subtitle: 'QA Mühendisleri için Python ve Test Otomasyonu',
  intro: 'Python\'u sıfırdan öğrenin, test otomasyonuna odaklanın. Temel kodlamadan gelişmiş pytest çerçevelerine kadar — modern bir QA mühendisinin ihtiyaç duyduğu her şey burada.',
};

const enHero = {
  title: '🐍 Python',
  subtitle: 'Python for QA Engineers & Test Automation',
  intro: 'Learn Python from scratch with a focus on test automation. From basic scripting to advanced pytest frameworks — everything a modern QA engineer needs to write reliable, maintainable tests.',
};

const enTabs = [
  '🎯 Intro & Why',
  '📦 Installation',
  '📐 Syntax & Comments',
  '📦 Variables & Types',
  '🔤 Strings & Booleans',
  '➕ Operators',
  '📋 Lists & Tuples',
  '🗂️ Sets & Dicts',
  '🔁 Conditions & Loops',
  '⚙️ Functions & Lambda',
  '🏗️ Classes & OOP',
  '🌐 Scope & Modules',
  '📊 Helper Modules',
  '📂 Files & JSON',
  '🚨 Exceptions & RegEx',
  '⚡ Advanced Concepts',
  '🛠️ Real World (pytest)',
  '🔗 Ecosystem',
  '🚨 Troubleshooting',
  '☕ Java → Python',
  '📝 Practice Exercises',
  '💼 Interview Q&A'
];

const trTabs = [
  '🎯 Giriş',
  '📦 Kurulum',
  '📐 Sözdizimi & Yorumlar',
  '📦 Değişkenler & Tipler',
  '🔤 Metinler & Mantıksal',
  '➕ Operatörler',
  '📋 Listeler & Demetler',
  '🗂️ Setler & Sözlükler',
  '🔁 Koşul & Döngüler',
  '⚙️ Fonksiyonlar & Lambda',
  '🏗️ Sınıflar & OOP',
  '🌐 Kapsam & Modüller',
  '📊 Yardımcı Modüller',
  '📂 Dosya & JSON',
  '🚨 Hata & RegEx',
  '⚡ İleri Seviye',
  '🛠️ Gerçek Hayat (pytest)',
  '🔗 Ekosistem',
  '🚨 Yaygın Hatalar',
  '☕ Java → Python',
  '📝 Pratik & Alıştırma',
  '💼 Mülakat Soruları'
];

// --- FINAL SECTION MAPPING ---
const finalEnSections = [
  sections[0], // Intro
  { title: '📦 Installation', blocks: translateBlocks([...sections[1].blocks, feynman1]) },
  { title: '📐 Syntax & Comments', blocks: translateBlocks([...sections[2].blocks.slice(0, 14), feynman2A]) },
  { title: '📦 Variables & Types', blocks: translateBlocks([...sections[2].blocks.slice(14, 41), feynman2B]) },
  { title: '🔤 Strings & Booleans', blocks: translateBlocks([...sections[2].blocks.slice(41, 55), feynman2C]) },
  { title: '➕ Operators', blocks: translateBlocks([...sections[2].blocks.slice(55, 65), feynman2D]) },
  { title: '📋 Lists & Tuples', blocks: translateBlocks([...sections[3].blocks.slice(0, 15), feynman3A]) },
  { title: '🗂️ Sets & Dicts', blocks: translateBlocks([...sections[3].blocks.slice(15, 29), feynman3B]) },
  { title: '🔁 Conditions & Loops', blocks: translateBlocks([...sections[3].blocks.slice(29, 48), feynman3C]) },
  { title: '⚙️ Functions & Lambda', blocks: translateBlocks([...sections[3].blocks.slice(48, 63), feynman3D]) },
  { title: '🏗️ Classes & OOP', blocks: translateBlocks([...sections[4].blocks.slice(0, 14), ...sections[4].blocks.slice(75, 82), feynman4A]) },
  { title: '🌐 Scope & Modules', blocks: translateBlocks([...sections[4].blocks.slice(14, 26), ...sections[4].blocks.slice(101, 107), feynman4B]) },
  { title: '📊 Helper Modules', blocks: translateBlocks([...sections[4].blocks.slice(82, 101), feynmanHelper]) },
  { title: '📂 Files & JSON', blocks: translateBlocks([...sections[4].blocks.slice(34, 40), ...sections[4].blocks.slice(107, 125), feynman4C]) },
  { title: '🚨 Exceptions & RegEx', blocks: translateBlocks([...sections[4].blocks.slice(26, 34), ...sections[4].blocks.slice(40, 45), feynman4D]) },
  { title: '⚡ Advanced Concepts', blocks: translateBlocks([...sections[4].blocks.slice(45, 75), ...sections[4].blocks.slice(125, 137), feynman4E]) },
  { title: '🛠️ Real World (pytest)', blocks: translateBlocks([...sections[5].blocks.slice(0, 21), feynman5]) },
  { title: '🔗 Ecosystem', blocks: translateBlocks([...pythonEcosystemBlocks, feynmanEcosystem]) },
  { title: '🚨 Troubleshooting', blocks: translateBlocks([...sections[5].blocks.slice(21, 24), feynmanTroubleshooting]) },
  { title: '☕ Java → Python', blocks: translateBlocks([...sections[8].blocks, feynman8]) },
  { title: '📝 Practice Exercises', blocks: translateBlocks([...sections[7].blocks, feynman7]) },
  sections[6] // Interview Q&A
];

const finalTrSections = [
  trSections[0], // Intro
  { title: '📦 Kurulum', blocks: translateBlocks([...trSections[1].blocks, feynman1]) },
  { title: '📐 Sözdizimi & Yorumlar', blocks: translateBlocks([...trSections[2].blocks.slice(0, 14), feynman2A]) },
  { title: '📦 Değişkenler & Tipler', blocks: translateBlocks([...trSections[2].blocks.slice(14, 41), feynman2B]) },
  { title: '🔤 Metinler & Mantıksal', blocks: translateBlocks([...trSections[2].blocks.slice(41, 55), feynman2C]) },
  { title: '➕ Operatörler', blocks: translateBlocks([...trSections[2].blocks.slice(55, 65), feynman2D]) },
  { title: '📋 Listeler & Demetler', blocks: translateBlocks([...trSections[3].blocks.slice(0, 15), feynman3A]) },
  { title: '🗂️ Setler & Sözlükler', blocks: translateBlocks([...trSections[3].blocks.slice(15, 29), feynman3B]) },
  { title: '🔁 Koşul & Döngüler', blocks: translateBlocks([...trSections[3].blocks.slice(29, 48), feynman3C]) },
  { title: '⚙️ Fonksiyonlar & Lambda', blocks: translateBlocks([...trSections[3].blocks.slice(48, 63), feynman3D]) },
  { title: '🏗️ Sınıflar & OOP', blocks: translateBlocks([...trSections[4].blocks.slice(0, 14), ...trSections[4].blocks.slice(75, 82), feynman4A]) },
  { title: '🌐 Kapsam & Modüller', blocks: translateBlocks([...trSections[4].blocks.slice(14, 26), ...trSections[4].blocks.slice(101, 107), feynman4B]) },
  { title: '📊 Yardımcı Modüller', blocks: translateBlocks([...trSections[4].blocks.slice(82, 101), feynmanHelper]) },
  { title: '📂 Dosya & JSON', blocks: translateBlocks([...trSections[4].blocks.slice(34, 40), ...trSections[4].blocks.slice(107, 125), feynman4C]) },
  { title: '🚨 Hata & RegEx', blocks: translateBlocks([...trSections[4].blocks.slice(26, 34), ...trSections[4].blocks.slice(40, 45), feynman4D]) },
  { title: '⚡ İleri Seviye', blocks: translateBlocks([...trSections[4].blocks.slice(45, 75), ...trSections[4].blocks.slice(125, 137), feynman4E]) },
  { title: '🛠️ Gerçek Hayat (pytest)', blocks: translateBlocks([...trSections[5].blocks.slice(0, 21), feynman5]) },
  { title: '🔗 Ekosistem', blocks: translateBlocks([...pythonEcosystemBlocks, feynmanEcosystem]) },
  { title: '🚨 Yaygın Hatalar', blocks: translateBlocks([...trSections[5].blocks.slice(21, 24), feynmanTroubleshooting]) },
  { title: '☕ Java → Python', blocks: translateBlocks([...trSections[8].blocks, feynman8]) },
  { title: '📝 Pratik & Alıştırma', blocks: translateBlocks([...trSections[7].blocks, feynman7]) },
  trSections[6] // Interview Q&A
];

export const pythonData = {
  en: { hero: enHero, tabs: enTabs, sections: finalEnSections },
  tr: { hero: trHero, tabs: trTabs, sections: finalTrSections },
}
