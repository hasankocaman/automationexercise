// Code Playground content for the Python page — Run / Show Expected Output /
// Fix the Failing Test / Hint exercises, rendered via the existing
// `code-playground` block type (src/components/CodePlaygroundBlock.jsx).
// No component/architecture changes here — this file only supplies data that
// gets mapped (via toPlaygroundBlock) into the block shape that already exists.
//
// `topic` matches a tab slug used in pythonData.js to splice items into the
// right tab. Title is English-only by design; description/hints stay
// bilingual per this project's i18n rule (CLAUDE.md §7-8).

export const pythonPlaygroundItems = [
  // --- intro ---
  {
    id: 'py-intro-01',
    title: 'Why Python Reads Almost Like English',
    description: {
      tr: 'Bu fonksiyon bir test ortamının hazır olup olmadığını kontrol ediyor. Aşağıdaki test neden fail ediyor?',
      en: 'This function checks if a test environment is ready. Why does the test below fail?',
    },
    buggyCode: `def check_environment(server_status, db_status):
    if server_status == "UP" or db_status == "UP":
        return "READY"
    return "NOT READY"

print(check_environment("UP", "DOWN"))`,
    fixedCode: `def check_environment(server_status, db_status):
    if server_status == "UP" and db_status == "UP":
        return "READY"
    return "NOT READY"

print(check_environment("UP", "DOWN"))`,
    expectedOutput: 'NOT READY',
    hints: [
      { tr: 'Ortamın hazır olması için kaç servisin "UP" olması gerekiyor?', en: 'How many services need to be "UP" for the environment to be ready?' },
      { tr: '"or" ifadesi, sadece BİR koşul doğruysa True döner. Burada gerçekten istediğin bu mu?', en: '"or" returns True if just ONE condition is true. Is that really what you want here?' },
      { tr: '"or" yerine "and" kullan — her iki servis de UP olmalı.', en: 'Use "and" instead of "or" — both services must be UP.' },
    ],
    xpReward: 15,
    topic: 'intro',
  },
  {
    id: 'py-intro-02',
    title: 'Boilerplate-Free Functions',
    description: {
      tr: 'Python fonksiyonları Java\'daki gibi tip bildirimi istemez, ama parametre SIRASI hâlâ önemlidir. Aşağıdaki test neden fail ediyor?',
      en: "Python functions don't need type declarations like Java, but parameter ORDER still matters. Why does the test below fail?",
    },
    buggyCode: `def format_test_id(prefix, number):
    return f"{prefix}-{number:03d}"

print(format_test_id(7, "TC"))`,
    fixedCode: `def format_test_id(prefix, number):
    return f"{prefix}-{number:03d}"

print(format_test_id("TC", 7))`,
    expectedOutput: 'TC-007',
    hints: [
      { tr: 'format_test_id fonksiyonu hangi parametreyi önce, hangisini sonra bekliyor?', en: 'Which parameter does format_test_id expect first, and which one second?' },
      { tr: 'Çağrıdaki argümanların sırası, fonksiyon tanımındaki sırayla eşleşiyor mu?', en: 'Does the order of arguments in the call match the order in the function definition?' },
      { tr: 'format_test_id(7, "TC") yerine format_test_id("TC", 7) yaz.', en: 'Call format_test_id("TC", 7) instead of format_test_id(7, "TC").' },
    ],
    xpReward: 15,
    topic: 'intro',
  },

  // --- installation ---
  {
    id: 'py-installation-01',
    title: 'Checking Your Python Version Programmatically',
    description: {
      tr: 'CI pipeline\'ında Python sürümünü kod içinden kontrol etmek isteyebilirsin. Aşağıdaki test neden fail ediyor?',
      en: 'You may want to check the Python version from inside your code in a CI pipeline. Why does the test below fail?',
    },
    buggyCode: `print(version_info.major)`,
    fixedCode: `import sys

print(sys.version_info.major)`,
    expectedOutput: '3',
    hints: [
      { tr: '"version_info" hangi modülün bir parçası?', en: 'Which module does "version_info" belong to?' },
      { tr: 'Bu modülü kodun başında import ettin mi?', en: 'Did you import that module at the top of the file?' },
      { tr: '"import sys" ekle ve "sys.version_info.major" yaz.', en: 'Add "import sys" and use "sys.version_info.major".' },
    ],
    xpReward: 15,
    topic: 'installation',
  },
  {
    id: 'py-installation-02',
    title: 'Verifying pip Installed a Compatible Package',
    description: {
      tr: 'Bir paketin sürümünü string olarak okuyup sayılarla karşılaştırmak yaygın bir hatadır. Aşağıdaki test neden fail ediyor?',
      en: "Reading a package version as a string and comparing it to a number is a common mistake. Why does the test below fail?",
    },
    buggyCode: `pytest_version = "7"
if pytest_version >= 7:
    print("Compatible")
else:
    print("Upgrade needed")`,
    fixedCode: `pytest_version = "7"
if int(pytest_version) >= 7:
    print("Compatible")
else:
    print("Upgrade needed")`,
    expectedOutput: 'Compatible',
    hints: [
      { tr: 'pytest_version değişkeninin tipi nedir — string mi, int mi?', en: 'What type is pytest_version — a string or an int?' },
      { tr: 'Python, string ile int\'i ">=" ile karşılaştırmana izin verir mi?', en: 'Does Python let you compare a string and an int with ">="?' },
      { tr: 'Karşılaştırmadan önce pytest_version\'u int() ile sayıya çevir.', en: 'Convert pytest_version to a number with int() before comparing.' },
    ],
    xpReward: 15,
    topic: 'installation',
  },

  // --- syntax-comments (existing tab, extra item) ---
  {
    id: 'py-syntax-02',
    title: 'An Unterminated Docstring Breaks Everything Below It',
    description: {
      tr: 'Üçlü tırnaklı bir docstring\'i kapatmayı unutmak, altındaki her şeyi bozar. Aşağıdaki test neden fail ediyor?',
      en: 'Forgetting to close a triple-quoted docstring breaks everything below it. Why does the test below fail?',
    },
    buggyCode: `def describe_test():
    """This function returns a description
    return "Described"

print(describe_test())`,
    fixedCode: `def describe_test():
    """This function returns a description"""
    return "Described"

print(describe_test())`,
    expectedOutput: 'Described',
    hints: [
      { tr: 'Üçlü tırnak (""") ile başlayan bir docstring nasıl bitirilir?', en: 'How do you close a triple-quote (""") docstring?' },
      { tr: 'İlk """ açıldıktan sonra onu kapatan ikinci bir """ var mı?', en: 'After the first """, is there a closing """ to match it?' },
      { tr: 'Docstring satırının sonuna "This function returns a description""" yaz.', en: 'End the docstring line with "This function returns a description""".' },
    ],
    xpReward: 15,
    topic: 'syntax-comments',
  },

  // --- variables-types (existing tab, extra item) ---
  {
    id: 'py-variables-02',
    title: 'Converting User Input Safely',
    description: {
      tr: 'int() bir ondalıklı string\'i doğrudan çeviremez. Aşağıdaki test neden fail ediyor?',
      en: 'int() cannot directly convert a decimal string. Why does the test below fail?',
    },
    buggyCode: `user_input = "3.5"
retry_count = int(user_input)
print(f"Retrying {retry_count} times")`,
    fixedCode: `user_input = "3.5"
retry_count = int(float(user_input))
print(f"Retrying {retry_count} times")`,
    expectedOutput: 'Retrying 3 times',
    hints: [
      { tr: 'user_input string\'i hangi formatta — tam sayı mı, ondalıklı mı?', en: 'What format is the user_input string in — a whole number or a decimal?' },
      { tr: 'int() bir ondalıklı string\'i ("3.5") doğrudan çevirebilir mi?', en: 'Can int() directly convert a decimal string like "3.5"?' },
      { tr: 'Önce float(user_input), sonra onu int() ile çevir: int(float(user_input)).', en: 'First float(user_input), then wrap it in int(): int(float(user_input)).' },
    ],
    xpReward: 15,
    topic: 'variables-types',
  },

  // --- strings-booleans ---
  {
    id: 'py-strings-01',
    title: 'Slicing a Test Case ID',
    description: {
      tr: 'String slicing\'de bitiş indeksi dahil edilmez. Aşağıdaki test neden fail ediyor?',
      en: 'The stop index in string slicing is exclusive. Why does the test below fail?',
    },
    buggyCode: `test_case_id = "TC-00125"
numeric_part = test_case_id[3:7]
print(numeric_part)`,
    fixedCode: `test_case_id = "TC-00125"
numeric_part = test_case_id[3:8]
print(numeric_part)`,
    expectedOutput: '00125',
    hints: [
      { tr: '"TC-00125" stringinin 3. indeksten itibaren kaç karakteri var?', en: 'How many characters does "TC-00125" have starting from index 3?' },
      { tr: 'Slice\'taki bitiş indeksi DAHİL mi, yoksa o indeksten ÖNCE mi durur?', en: 'Is the stop index in a slice INCLUDED, or does it stop BEFORE that index?' },
      { tr: '[3:7] yerine [3:8] kullan — 5 hane için bitiş indeksini bir artır.', en: 'Use [3:8] instead of [3:7] — bump the stop index by one to get all 5 digits.' },
    ],
    xpReward: 15,
    topic: 'strings-booleans',
  },
  {
    id: 'py-strings-02',
    title: 'Case-Insensitive Status Check',
    description: {
      tr: 'String karşılaştırması büyük/küçük harfe duyarlıdır. Aşağıdaki test neden fail ediyor?',
      en: 'String comparison is case-sensitive. Why does the test below fail?',
    },
    buggyCode: `status = "PASSED"
if status == "passed":
    print("Test succeeded")
else:
    print("Unknown status")`,
    fixedCode: `status = "PASSED"
if status.lower() == "passed":
    print("Test succeeded")
else:
    print("Unknown status")`,
    expectedOutput: 'Test succeeded',
    hints: [
      { tr: '"PASSED" ve "passed" Python\'a göre aynı string mi?', en: 'Are "PASSED" and "passed" the same string as far as Python is concerned?' },
      { tr: 'Karşılaştırmadan önce iki tarafı da aynı harf büyüklüğüne getirebilir misin?', en: 'Can you normalize both sides to the same case before comparing?' },
      { tr: 'status.lower() == "passed" şeklinde karşılaştır.', en: 'Compare with status.lower() == "passed".' },
    ],
    xpReward: 15,
    topic: 'strings-booleans',
  },

  // --- operators ---
  {
    id: 'py-operators-01',
    title: "Adding Two 'Numbers' From a Form",
    description: {
      tr: 'Bir formdan gelen değer çoğu zaman string\'tir, sayı değil. Aşağıdaki test neden fail ediyor?',
      en: "A value coming from a form is usually a string, not a number. Why does the test below fail?",
    },
    buggyCode: `retry_count = "3"
max_retries = 5
print(retry_count + max_retries)`,
    fixedCode: `retry_count = "3"
max_retries = 5
print(int(retry_count) + max_retries)`,
    expectedOutput: '8',
    hints: [
      { tr: 'retry_count değişkeninin tipi nedir?', en: 'What type is the retry_count variable?' },
      { tr: 'Python bir string ile bir int\'i "+" ile toplamana izin verir mi?', en: 'Does Python let you add a string and an int with "+"?' },
      { tr: 'retry_count\'u int() ile sayıya çevirip topla: int(retry_count) + max_retries.', en: 'Convert retry_count to a number first: int(retry_count) + max_retries.' },
    ],
    xpReward: 15,
    topic: 'operators',
  },
  {
    id: 'py-operators-02',
    title: 'Checking if Retries Are Exhausted',
    description: {
      tr: 'Sınır (boundary) değerlerde ">" ile ">=" farkı kritik olabilir. Aşağıdaki test neden fail ediyor?',
      en: 'The difference between ">" and ">=" matters at boundary values. Why does the test below fail?',
    },
    buggyCode: `attempt = 3
max_attempts = 3
if attempt > max_attempts:
    print("STOP")
else:
    print("RETRY")`,
    fixedCode: `attempt = 3
max_attempts = 3
if attempt >= max_attempts:
    print("STOP")
else:
    print("RETRY")`,
    expectedOutput: 'STOP',
    hints: [
      { tr: 'attempt, max_attempts\'a EŞİT olduğunda denemeler bitmiş sayılır mı?', en: 'When attempt EQUALS max_attempts, should retries be considered exhausted?' },
      { tr: '">" operatörü, iki değer birbirine eşit olduğunda True döner mi?', en: 'Does ">" return True when the two values are equal?' },
      { tr: '">" yerine ">=" kullan.', en: 'Use ">=" instead of ">".' },
    ],
    xpReward: 15,
    topic: 'operators',
  },

  // --- lists-tuples ---
  {
    id: 'py-lists-01',
    title: 'Getting the Last 3 Test Results',
    description: {
      tr: 'Negatif slicing\'de off-by-one hatası çok yaygındır. Aşağıdaki test neden fail ediyor?',
      en: 'Off-by-one mistakes are very common with negative slicing. Why does the test below fail?',
    },
    buggyCode: `results = ["PASS", "PASS", "FAIL", "PASS", "FAIL"]
last_three = results[-2:]
print(last_three)`,
    fixedCode: `results = ["PASS", "PASS", "FAIL", "PASS", "FAIL"]
last_three = results[-3:]
print(last_three)`,
    expectedOutput: "['FAIL', 'PASS', 'FAIL']",
    hints: [
      { tr: 'results[-2:] kaç eleman döndürür?', en: 'How many elements does results[-2:] return?' },
      { tr: 'Son ÜÇ elemanı almak için negatif indeks ne olmalı?', en: 'What negative index do you need to get the last THREE elements?' },
      { tr: '[-2:] yerine [-3:] kullan.', en: 'Use [-3:] instead of [-2:].' },
    ],
    xpReward: 15,
    topic: 'lists-tuples',
  },
  {
    id: 'py-lists-02',
    title: 'Sorting Test Durations, Slowest First',
    description: {
      tr: 'sort() metodunun "reverse" argümanı yanlış verilirse sıralama tersine döner. Aşağıdaki test neden fail ediyor?',
      en: "Passing the wrong value to sort()'s reverse argument flips the order. Why does the test below fail?",
    },
    buggyCode: `durations = [5.2, 1.8, 3.4, 2.1]
durations.sort(reverse=False)
print(durations[0])`,
    fixedCode: `durations = [5.2, 1.8, 3.4, 2.1]
durations.sort(reverse=True)
print(durations[0])`,
    expectedOutput: '5.2',
    hints: [
      { tr: 'En yavaş testi ilk sıraya koymak istiyorsan, sıralama artan mı azalan mı olmalı?', en: 'If you want the slowest test first, should the sort be ascending or descending?' },
      { tr: 'reverse=False sıralamayı küçükten büyüğe mi, büyükten küçüğe mi yapar?', en: 'Does reverse=False sort small-to-large or large-to-small?' },
      { tr: 'reverse=False yerine reverse=True kullan.', en: 'Use reverse=True instead of reverse=False.' },
    ],
    xpReward: 15,
    topic: 'lists-tuples',
  },

  // --- sets-dicts ---
  {
    id: 'py-sets-01',
    title: 'Removing Duplicate Bug IDs',
    description: {
      tr: 'list() bir listeyi sadece kopyalar, tekrarları silmez. Aşağıdaki test neden fail ediyor?',
      en: "list() only copies a list — it doesn't remove duplicates. Why does the test below fail?",
    },
    buggyCode: `bug_ids = [101, 102, 101, 103, 102]
unique_ids = list(bug_ids)
print(len(unique_ids))`,
    fixedCode: `bug_ids = [101, 102, 101, 103, 102]
unique_ids = list(set(bug_ids))
print(len(unique_ids))`,
    expectedOutput: '3',
    hints: [
      { tr: 'list(bug_ids) sadece bir kopya mı oluşturuyor, yoksa tekrarları mı kaldırıyor?', en: 'Does list(bug_ids) just make a copy, or does it remove duplicates too?' },
      { tr: 'Tekrarları kaldıran hangi veri yapısını biliyorsun?', en: 'Which data structure automatically removes duplicates?' },
      { tr: 'Önce set(bug_ids) yap, sonra tekrar list()\'e çevir: list(set(bug_ids)).', en: 'Convert to set(bug_ids) first, then back to a list: list(set(bug_ids)).' },
    ],
    xpReward: 15,
    topic: 'sets-dicts',
  },
  {
    id: 'py-sets-02',
    title: 'Safe Dictionary Lookup',
    description: {
      tr: 'Olmayan bir dict key\'ine doğrudan erişmek KeyError fırlatır. Aşağıdaki test neden fail ediyor?',
      en: "Directly accessing a missing dict key raises a KeyError. Why does the test below fail?",
    },
    buggyCode: `test_config = {"browser": "chrome", "timeout": 30}
headless_mode = test_config["headless"]
print(headless_mode)`,
    fixedCode: `test_config = {"browser": "chrome", "timeout": 30}
headless_mode = test_config.get("headless", False)
print(headless_mode)`,
    expectedOutput: 'False',
    hints: [
      { tr: 'test_config sözlüğünde "headless" key\'i tanımlı mı?', en: 'Is the "headless" key defined in the test_config dictionary?' },
      { tr: 'köşeli parantezle ([ ]) olmayan bir key\'e erişmek ne yapar?', en: 'What happens when you access a missing key with square brackets ([ ])?' },
      { tr: 'test_config["headless"] yerine test_config.get("headless", False) kullan.', en: 'Use test_config.get("headless", False) instead of test_config["headless"].' },
    ],
    xpReward: 15,
    topic: 'sets-dicts',
  },

  // --- conditions-loops (existing tab, extra item) ---
  {
    id: 'py-loops-02',
    title: 'A Retry Loop That Forgets an Import',
    description: {
      tr: 'Bir fonksiyonu kullanmak için önce onu import etmen gerekir. Aşağıdaki test neden fail ediyor?',
      en: 'You must import a function before you can use it. Why does the test below fail?',
    },
    buggyCode: `def wait_for_condition(attempts):
    for i in range(attempts):
        sleep(0.01)
    return "done"

print(wait_for_condition(3))`,
    fixedCode: `from time import sleep


def wait_for_condition(attempts):
    for i in range(attempts):
        sleep(0.01)
    return "done"

print(wait_for_condition(3))`,
    expectedOutput: 'done',
    hints: [
      { tr: '"sleep" fonksiyonu hangi standart modülde bulunur?', en: 'Which standard module does the "sleep" function live in?' },
      { tr: 'Kodun başında bu modülden bir import var mı?', en: 'Is there an import from that module at the top of the file?' },
      { tr: 'Kodun başına "from time import sleep" ekle.', en: 'Add "from time import sleep" at the top of the file.' },
    ],
    xpReward: 15,
    topic: 'conditions-loops',
  },

  // --- functions-lambda (existing tab, extra item) ---
  {
    id: 'py-functions-02',
    title: 'Reusing an Exhausted Generator',
    description: {
      tr: 'Bir generator sadece BİR KEZ baştan sona dolaşılabilir. Aşağıdaki test neden fail ediyor?',
      en: 'A generator can only be iterated ONCE from start to finish. Why does the test below fail?',
    },
    buggyCode: `def get_test_ids():
    for i in range(3):
        yield f"TC-{i}"

ids = get_test_ids()
first_pass = list(ids)
second_pass = list(ids)
print(second_pass)`,
    fixedCode: `def get_test_ids():
    for i in range(3):
        yield f"TC-{i}"

first_pass = list(get_test_ids())
second_pass = list(get_test_ids())
print(second_pass)`,
    expectedOutput: "['TC-0', 'TC-1', 'TC-2']",
    hints: [
      { tr: 'list(ids) çağrıldıktan sonra "ids" generator\'ı hâlâ eleman içeriyor mu?', en: 'After list(ids) is called, does the "ids" generator still have elements left?' },
      { tr: 'Aynı generator nesnesini iki kez list()\'e çevirmek aynı sonucu verir mi?', en: 'Does converting the same generator object to a list twice give the same result both times?' },
      { tr: 'İkinci geçiş için get_test_ids() fonksiyonunu yeniden çağır, aynı "ids" nesnesini tekrar kullanma.', en: 'Call get_test_ids() again for the second pass instead of reusing the same "ids" object.' },
    ],
    xpReward: 20,
    topic: 'functions-lambda',
  },

  // --- classes-oop (existing tab, extra item) ---
  {
    id: 'py-classes-02',
    title: 'A Constructor That Needs Two Arguments',
    description: {
      tr: '__init__ metodunun beklediği tüm parametreler çağrı sırasında verilmelidir. Aşağıdaki test neden fail ediyor?',
      en: 'Every parameter __init__ expects must be supplied when you instantiate the class. Why does the test below fail?',
    },
    buggyCode: `class TestRunner:
    def __init__(self, name, browser):
        self.name = name
        self.browser = browser

    def describe(self):
        return f"{self.name} on {self.browser}"

runner = TestRunner("Login Test")
print(runner.describe())`,
    fixedCode: `class TestRunner:
    def __init__(self, name, browser):
        self.name = name
        self.browser = browser

    def describe(self):
        return f"{self.name} on {self.browser}"

runner = TestRunner("Login Test", "Chrome")
print(runner.describe())`,
    expectedOutput: 'Login Test on Chrome',
    hints: [
      { tr: '__init__ metodu (self hariç) kaç parametre bekliyor?', en: 'How many parameters does __init__ expect (besides self)?' },
      { tr: 'TestRunner("Login Test") çağrısında kaç argüman veriliyor?', en: 'How many arguments are passed in the TestRunner("Login Test") call?' },
      { tr: 'TestRunner("Login Test", "Chrome") şeklinde ikinci argümanı da ver.', en: 'Pass the second argument too: TestRunner("Login Test", "Chrome").' },
    ],
    xpReward: 15,
    topic: 'classes-oop',
  },

  // --- scope-modules ---
  {
    id: 'py-scope-01',
    title: 'Modifying a Global Counter Inside a Function',
    description: {
      tr: 'Bir fonksiyon içinde global bir değişkene atama yapmadan önce "global" anahtar kelimesi gerekir. Aşağıdaki test neden fail ediyor?',
      en: 'Assigning to a global variable inside a function requires the "global" keyword first. Why does the test below fail?',
    },
    buggyCode: `test_counter = 0

def increment_counter():
    test_counter += 1
    return test_counter

print(increment_counter())`,
    fixedCode: `test_counter = 0

def increment_counter():
    global test_counter
    test_counter += 1
    return test_counter

print(increment_counter())`,
    expectedOutput: '1',
    hints: [
      { tr: 'test_counter, fonksiyonun DIŞINDA mı tanımlandı?', en: 'Is test_counter defined OUTSIDE the function?' },
      { tr: 'Fonksiyon içinde bir değişkene atama yapmak, Python\'a onu otomatik olarak yerel (local) yapar — bunu nasıl engellersin?', en: 'Assigning to a variable inside a function makes Python treat it as local by default — how do you prevent that?' },
      { tr: 'Fonksiyonun ilk satırına "global test_counter" ekle.', en: 'Add "global test_counter" as the first line of the function.' },
    ],
    xpReward: 20,
    topic: 'scope-modules',
  },
  {
    id: 'py-scope-02',
    title: 'Importing a Function vs Importing the Module',
    description: {
      tr: '"from module import func" yaptığında, modülün kendisi bir isim olarak tanımlı OLMAZ. Aşağıdaki test neden fail ediyor?',
      en: "When you do \"from module import func\", the module itself is NOT defined as a name. Why does the test below fail?",
    },
    buggyCode: `from math import sqrt

def calculate_timeout(base):
    return math.sqrt(base) * 2

print(calculate_timeout(16))`,
    fixedCode: `from math import sqrt

def calculate_timeout(base):
    return sqrt(base) * 2

print(calculate_timeout(16))`,
    expectedOutput: '8.0',
    hints: [
      { tr: 'Kod "from math import sqrt" mu yapıyor, yoksa "import math" mı?', en: 'Does the code do "from math import sqrt", or "import math"?' },
      { tr: '"from math import sqrt" yaptığında "math" adı tanımlı olur mu?', en: 'After "from math import sqrt", is the name "math" defined?' },
      { tr: '"math.sqrt(base)" yerine doğrudan "sqrt(base)" kullan.', en: 'Use "sqrt(base)" directly instead of "math.sqrt(base)".' },
    ],
    xpReward: 20,
    topic: 'scope-modules',
  },

  // --- helper-modules ---
  {
    id: 'py-helper-01',
    title: 'Generating a Random Test User ID',
    description: {
      tr: 'random modülünü kullanmadan önce import etmen gerekir. Aşağıdaki test neden fail ediyor?',
      en: 'You must import the random module before using it. Why does the test below fail?',
    },
    buggyCode: `user_id = random.randint(1000, 9999)
print(user_id >= 1000 and user_id <= 9999)`,
    fixedCode: `import random

user_id = random.randint(1000, 9999)
print(user_id >= 1000 and user_id <= 9999)`,
    expectedOutput: 'True',
    hints: [
      { tr: '"random" hangi standart kütüphane modülünün adı?', en: 'What is "random" the name of in the standard library?' },
      { tr: 'Bir modülü kullanmadan önce ne yapman gerekir?', en: 'What do you need to do before using a module?' },
      { tr: 'Kodun başına "import random" ekle.', en: 'Add "import random" at the top.' },
    ],
    xpReward: 15,
    topic: 'helper-modules',
  },
  {
    id: 'py-helper-02',
    title: 'Calculating Days Between Two Dates',
    description: {
      tr: 'Bir datetime nesnesini bir string\'ten çıkaramazsın. Aşağıdaki test neden fail ediyor?',
      en: "You can't subtract a string from a datetime object. Why does the test below fail?",
    },
    buggyCode: `from datetime import datetime

start = datetime(2024, 1, 1)
end = "2024-01-10"
duration = (end - start).days
print(duration)`,
    fixedCode: `from datetime import datetime

start = datetime(2024, 1, 1)
end = datetime(2024, 1, 10)
duration = (end - start).days
print(duration)`,
    expectedOutput: '9',
    hints: [
      { tr: '"start" değişkeninin tipi nedir, "end" değişkeninin tipi nedir?', en: 'What type is "start", and what type is "end"?' },
      { tr: 'Bir datetime nesnesinden bir string\'i çıkarabilir misin?', en: 'Can you subtract a string from a datetime object?' },
      { tr: '"end" değişkenini de bir string yerine datetime(2024, 1, 10) yap.', en: 'Make "end" a datetime(2024, 1, 10) too, instead of a string.' },
    ],
    xpReward: 20,
    topic: 'helper-modules',
  },

  // --- files-json ---
  {
    id: 'py-files-01',
    title: 'A JSON Number That Got Quoted',
    description: {
      tr: 'JSON\'da tırnak içine alınmış bir sayı, Python\'a string olarak gelir. Aşağıdaki test neden fail ediyor (ipucu: hata fırlatmıyor, ama yanlış sonuç veriyor!)?',
      en: "A quoted number in JSON arrives in Python as a string. Why does the test below fail (hint: it doesn't error, it just gives the wrong result!)?",
    },
    buggyCode: `import json

config_json = '{"retries": "3", "timeout": 30}'
config = json.loads(config_json)
total_wait = config["retries"] * config["timeout"]
print(total_wait)`,
    fixedCode: `import json

config_json = '{"retries": "3", "timeout": 30}'
config = json.loads(config_json)
total_wait = int(config["retries"]) * config["timeout"]
print(total_wait)`,
    expectedOutput: '90',
    hints: [
      { tr: 'JSON\'daki "retries" değeri tırnak içinde mi yazılmış?', en: 'Is the "retries" value in the JSON written inside quotes?' },
      { tr: 'Python\'da bir string\'i bir int ile "*" çarptığında ne olur — hata mı, yoksa farklı bir şey mi?', en: 'What happens when you multiply a string by an int with "*" in Python — an error, or something else?' },
      { tr: 'config["retries"]\'i çarpmadan önce int() ile sayıya çevir.', en: 'Convert config["retries"] to a number with int() before multiplying.' },
    ],
    xpReward: 20,
    topic: 'files-json',
  },
  {
    id: 'py-files-02',
    title: 'Working With File Paths',
    description: {
      tr: 'Path sınıfını kullanmadan önce pathlib\'den import etmen gerekir. Aşağıdaki test neden fail ediyor?',
      en: 'You must import Path from pathlib before using it. Why does the test below fail?',
    },
    buggyCode: `results_path = Path("results.json")
print(results_path.name)`,
    fixedCode: `from pathlib import Path

results_path = Path("results.json")
print(results_path.name)`,
    expectedOutput: 'results.json',
    hints: [
      { tr: '"Path" hangi standart modülden gelir?', en: 'Which standard module does "Path" come from?' },
      { tr: 'Kodda bu modülden bir import satırı var mı?', en: 'Is there an import line for that module in the code?' },
      { tr: 'Kodun başına "from pathlib import Path" ekle.', en: 'Add "from pathlib import Path" at the top.' },
    ],
    xpReward: 15,
    topic: 'files-json',
  },

  // --- exceptions-regex ---
  {
    id: 'py-exceptions-01',
    title: 'Catching the Right Exception Type',
    description: {
      tr: 'Yanlış exception tipini yakalamak, gerçek hatayı yakalamamak demektir. Aşağıdaki test neden fail ediyor?',
      en: 'Catching the wrong exception type means the real error slips through uncaught. Why does the test below fail?',
    },
    buggyCode: `def parse_retry_count(value):
    try:
        return int(value)
    except TypeError:
        return 0

print(parse_retry_count("abc"))`,
    fixedCode: `def parse_retry_count(value):
    try:
        return int(value)
    except ValueError:
        return 0

print(parse_retry_count("abc"))`,
    expectedOutput: '0',
    hints: [
      { tr: 'int("abc") çalıştığında Python hangi exception\'ı fırlatır?', en: 'Which exception does Python raise when int("abc") runs?' },
      { tr: 'except bloğu TypeError\'ı yakalıyor — ama gerçekte fırlatılan hata bu mu?', en: 'The except block catches TypeError — but is that actually the error being raised?' },
      { tr: '"except TypeError" yerine "except ValueError" kullan.', en: 'Use "except ValueError" instead of "except TypeError".' },
    ],
    xpReward: 20,
    topic: 'exceptions-regex',
  },
  {
    id: 'py-exceptions-02',
    title: 'Extracting a Test Case Number With Regex',
    description: {
      tr: 're.search() çağırmadan önce bir pattern tanımlaman gerekir. Aşağıdaki test neden fail ediyor?',
      en: 'You need to define a pattern before calling re.search(). Why does the test below fail?',
    },
    buggyCode: `import re

text = "Running TC-00452 now"
match = re.search(pattern, text)
print(match.group())`,
    fixedCode: `import re

text = "Running TC-00452 now"
pattern = r"TC-\\d+"
match = re.search(pattern, text)
print(match.group())`,
    expectedOutput: 'TC-00452',
    hints: [
      { tr: 're.search()\'in ilk argümanı olan "pattern" değişkeni nerede tanımlandı?', en: 'Where is the "pattern" variable — re.search()\'s first argument — defined?' },
      { tr: 'Kodda "pattern = ..." satırı var mı?', en: 'Is there a "pattern = ..." line anywhere in the code?' },
      { tr: 're.search()\'den önce "pattern = r\\"TC-\\\\d+\\"" satırını ekle.', en: 'Add the line pattern = r"TC-\\d+" before re.search().' },
    ],
    xpReward: 20,
    topic: 'exceptions-regex',
  },

  // --- advanced-concepts ---
  {
    id: 'py-advanced-01',
    title: 'Filtering for the Wrong Status',
    description: {
      tr: 'Bir liste içi (list comprehension) ifadesinde koşulu yanlış yazmak sessizce ters sonuç verir. Aşağıdaki test neden fail ediyor?',
      en: 'Writing the wrong condition in a list comprehension silently gives the opposite result. Why does the test below fail?',
    },
    buggyCode: `results = [("TC-1", "PASS"), ("TC-2", "FAIL"), ("TC-3", "FAIL"), ("TC-4", "PASS")]
failed = [tc for tc, status in results if status == "PASS"]
print(failed)`,
    fixedCode: `results = [("TC-1", "PASS"), ("TC-2", "FAIL"), ("TC-3", "FAIL"), ("TC-4", "PASS")]
failed = [tc for tc, status in results if status == "FAIL"]
print(failed)`,
    expectedOutput: "['TC-2', 'TC-3']",
    hints: [
      { tr: 'Değişken adı "failed" — ama koşul hangi status\'u kontrol ediyor?', en: 'The variable is named "failed" — but which status does the condition actually check for?' },
      { tr: 'Başarısız testleri toplamak istiyorsan, status neye eşit olmalı?', en: 'If you want to collect failed tests, what should status equal?' },
      { tr: 'if status == "PASS" yerine if status == "FAIL" kullan.', en: 'Use if status == "FAIL" instead of if status == "PASS".' },
    ],
    xpReward: 20,
    topic: 'advanced-concepts',
  },
  {
    id: 'py-advanced-02',
    title: 'A Generator That Got Exhausted Early',
    description: {
      tr: 'Bir generator nesnesi tükendiğinde, tekrar dolaşmak boş sonuç verir. Aşağıdaki test neden fail ediyor?',
      en: 'Once a generator object is exhausted, iterating it again gives nothing. Why does the test below fail?',
    },
    buggyCode: `def yield_chunks(data, size):
    for i in range(0, len(data), size):
        yield data[i:i + size]

chunks = yield_chunks([1, 2, 3, 4, 5, 6], 2)
total_chunks = len(list(chunks))
first_chunk = next(chunks, None)
print(first_chunk)`,
    fixedCode: `def yield_chunks(data, size):
    for i in range(0, len(data), size):
        yield data[i:i + size]

chunks = list(yield_chunks([1, 2, 3, 4, 5, 6], 2))
total_chunks = len(chunks)
first_chunk = chunks[0] if chunks else None
print(first_chunk)`,
    expectedOutput: '[1, 2]',
    hints: [
      { tr: '"list(chunks)" çağrıldıktan sonra "chunks" generator\'ı hâlâ eleman içeriyor mu?', en: 'After "list(chunks)" runs, does the "chunks" generator still have elements?' },
      { tr: 'Generator\'ı bir kere list()\'e çevirip sonucu bir değişkende saklamak daha güvenli olabilir mi?', en: 'Might it be safer to convert the generator to a list once and store the result in a variable?' },
      { tr: 'chunks = list(yield_chunks(...)) yap, sonra hem uzunluğu hem ilk elemanı bu listeden al.', en: 'Do chunks = list(yield_chunks(...)) and read both the length and the first item from that list.' },
    ],
    xpReward: 20,
    topic: 'advanced-concepts',
  },

  // --- real-world-pytest ---
  {
    id: 'py-pytest-01',
    title: 'A Test That Asserts the Wrong Status Code',
    description: {
      tr: 'Test yazarken yanlış beklenen değeri assert etmek çok yaygın bir hatadır. Aşağıdaki test neden fail ediyor?',
      en: 'Asserting the wrong expected value is a very common test-writing mistake. Why does the test below fail?',
    },
    buggyCode: `def test_signup_response_code():
    response_code = 201
    assert response_code == 200, f"Expected 200, got {response_code}"

try:
    test_signup_response_code()
    print("PASSED")
except AssertionError as e:
    print(f"FAILED: {e}")`,
    fixedCode: `def test_signup_response_code():
    response_code = 201
    assert response_code == 201, f"Expected 201, got {response_code}"

try:
    test_signup_response_code()
    print("PASSED")
except AssertionError as e:
    print(f"FAILED: {e}")`,
    expectedOutput: 'PASSED',
    hints: [
      { tr: 'Bir signup (kayıt) isteği başarılı olduğunda REST API\'lar genelde hangi status code\'u döner — 200 mü, 201 mi?', en: 'When a signup request succeeds, which status code do REST APIs typically return — 200, or 201?' },
      { tr: 'response_code zaten 201 — assert ifadesi hangi değeri bekliyor?', en: 'response_code is already 201 — what value does the assert expect?' },
      { tr: 'assert response_code == 200 yerine assert response_code == 201 yaz.', en: 'Change assert response_code == 200 to assert response_code == 201.' },
    ],
    xpReward: 20,
    topic: 'real-world-pytest',
  },
  {
    id: 'py-pytest-02',
    title: 'Tests That Leak State Into Each Other',
    description: {
      tr: 'Paylaşılan (global) bir değişken kullanmak, testlerin birbirini etkilemesine yol açar. Aşağıdaki test neden fail ediyor?',
      en: 'Using a shared (global) variable lets tests leak state into each other. Why does the test below fail?',
    },
    buggyCode: `shared_cart = []

def test_add_item_to_cart():
    shared_cart.append("item1")
    assert len(shared_cart) == 1

def test_cart_starts_empty():
    assert len(shared_cart) == 0

test_add_item_to_cart()
try:
    test_cart_starts_empty()
    print("PASSED")
except AssertionError as e:
    print(f"FAILED: {e}")`,
    fixedCode: `def test_add_item_to_cart():
    cart = []
    cart.append("item1")
    assert len(cart) == 1

def test_cart_starts_empty():
    cart = []
    assert len(cart) == 0

test_add_item_to_cart()
try:
    test_cart_starts_empty()
    print("PASSED")
except AssertionError as e:
    print(f"FAILED: {e}")`,
    expectedOutput: 'PASSED',
    hints: [
      { tr: 'shared_cart, fonksiyonların DIŞINDA mı tanımlandı? Bu ne anlama gelir?', en: 'Is shared_cart defined OUTSIDE the functions? What does that imply?' },
      { tr: 'İlk test çalıştıktan sonra shared_cart listesi hâlâ boş mu?', en: 'After the first test runs, is the shared_cart list still empty?' },
      { tr: 'Her test fonksiyonu, paylaşılan liste yerine kendi yerel "cart = []" listesini oluştursun.', en: 'Each test function should create its own local "cart = []" instead of using the shared list.' },
    ],
    xpReward: 25,
    topic: 'real-world-pytest',
  },

  // --- ecosystem ---
  {
    id: 'py-ecosystem-01',
    title: 'A Typo in a Keyword Argument',
    description: {
      tr: 'Bir kütüphane fonksiyonuna yanlış yazılmış bir keyword argüman vermek hata fırlatır. Aşağıdaki test neden fail ediyor?',
      en: 'Passing a misspelled keyword argument to a library function raises an error. Why does the test below fail?',
    },
    buggyCode: `class APIClient:
    def get(self, endpoint, timeout=5):
        return f"GET {endpoint} (timeout={timeout}s)"

client = APIClient()
print(client.get("/users", time_out=10))`,
    fixedCode: `class APIClient:
    def get(self, endpoint, timeout=5):
        return f"GET {endpoint} (timeout={timeout}s)"

client = APIClient()
print(client.get("/users", timeout=10))`,
    expectedOutput: 'GET /users (timeout=10s)',
    hints: [
      { tr: 'APIClient.get metodunun parametre adı tam olarak nedir?', en: "What is the exact parameter name on APIClient.get?" },
      { tr: 'Çağrıdaki "time_out" ile tanımdaki parametre adı birbirine uyuyor mu?', en: 'Does "time_out" in the call match the parameter name in the definition?' },
      { tr: '"time_out=10" yerine "timeout=10" yaz.', en: 'Write "timeout=10" instead of "time_out=10".' },
    ],
    xpReward: 15,
    topic: 'ecosystem',
  },
  {
    id: 'py-ecosystem-02',
    title: 'Generating a Unique Test Run ID',
    description: {
      tr: 'uuid modülünü kullanmadan önce import etmen gerekir. Aşağıdaki test neden fail ediyor?',
      en: 'You must import the uuid module before using it. Why does the test below fail?',
    },
    buggyCode: `test_run_id = uuid.uuid4().hex[:8]
print(len(test_run_id))`,
    fixedCode: `import uuid

test_run_id = uuid.uuid4().hex[:8]
print(len(test_run_id))`,
    expectedOutput: '8',
    hints: [
      { tr: '"uuid" hangi standart kütüphane modülünden geliyor?', en: 'Which standard library module does "uuid" come from?' },
      { tr: 'Kodda bu modül için bir import satırı görüyor musun?', en: 'Do you see an import line for that module in the code?' },
      { tr: 'Kodun başına "import uuid" ekle.', en: 'Add "import uuid" at the top.' },
    ],
    xpReward: 15,
    topic: 'ecosystem',
  },

  // --- troubleshooting ---
  {
    id: 'py-troubleshooting-01',
    title: 'None Is Not the Same as an Empty String',
    description: {
      tr: 'None ile boş string\'i karıştırmak, eksik veriyi yanlış yorumlamana sebep olur. Aşağıdaki test neden fail ediyor?',
      en: 'Confusing None with an empty string makes you misinterpret missing data. Why does the test below fail?',
    },
    buggyCode: `def get_element_text(element):
    return None

text = get_element_text("button")
if text == "":
    print("Element is empty")
else:
    print("Element has text or is missing")`,
    fixedCode: `def get_element_text(element):
    return None

text = get_element_text("button")
if text is None or text == "":
    print("Element is empty")
else:
    print("Element has text or is missing")`,
    expectedOutput: 'Element is empty',
    hints: [
      { tr: 'get_element_text() gerçekte ne döndürüyor — None mu, boş string mi?', en: 'What does get_element_text() actually return — None, or an empty string?' },
      { tr: '"None == \'\'" ifadesi True mu, False mu?', en: 'Is "None == \'\'" True or False?' },
      { tr: 'Koşula "text is None or" ekle: if text is None or text == "":', en: 'Add "text is None or" to the condition: if text is None or text == "":' },
    ],
    xpReward: 20,
    topic: 'troubleshooting',
  },
  {
    id: 'py-troubleshooting-02',
    title: 'An Off-by-One Bug in Pagination',
    description: {
      tr: 'Sayfa numarasını 1\'den başlatıp dizinleri 0\'dan başlayan bir listeye uygulamak off-by-one hatasına yol açar. Aşağıdaki test neden fail ediyor?',
      en: '1-indexed page numbers applied to a 0-indexed list cause an off-by-one bug. Why does the test below fail?',
    },
    buggyCode: `all_results = list(range(1, 26))
page_size = 10
page_number = 2
page_items = all_results[page_number * page_size: page_number * page_size + page_size]
print(page_items[0])`,
    fixedCode: `all_results = list(range(1, 26))
page_size = 10
page_number = 2
page_items = all_results[(page_number - 1) * page_size: (page_number - 1) * page_size + page_size]
print(page_items[0])`,
    expectedOutput: '11',
    hints: [
      { tr: 'page_number = 2, "2. sayfa" anlamına geliyor (1\'den sayarak). Listenin indeksleri kaçtan başlıyor?', en: 'page_number = 2 means "page 2" (counting from 1). What does the list\'s indexing start from?' },
      { tr: 'page_number\'ı doğrudan çarpmak, 1. sayfayı atlayıp 3. sayfadan başlatıyor olabilir mi?', en: 'Could multiplying page_number directly be skipping page 1 and starting from page 3 instead?' },
      { tr: 'page_number * page_size yerine (page_number - 1) * page_size kullan.', en: 'Use (page_number - 1) * page_size instead of page_number * page_size.' },
    ],
    xpReward: 20,
    topic: 'troubleshooting',
  },

  // --- java-to-python ---
  {
    id: 'py-java-01',
    title: 'Using "is" Like Java\'s "=="',
    description: {
      tr: 'Java\'dan gelen alışkanlıkla "==" yerine "is" kullanmak, değer eşitliği yerine kimlik (identity) kontrolü yapar. Aşağıdaki test neden fail ediyor?',
      en: 'Using "is" out of Java habit instead of "==" checks identity, not value equality. Why does the test below fail?',
    },
    buggyCode: `status_a = "PASS"
status_b = "".join(["P", "A", "S", "S"])
if status_a is status_b:
    print("Same status")
else:
    print("Different status")`,
    fixedCode: `status_a = "PASS"
status_b = "".join(["P", "A", "S", "S"])
if status_a == status_b:
    print("Same status")
else:
    print("Different status")`,
    expectedOutput: 'Same status',
    hints: [
      { tr: 'status_a ve status_b aynı DEĞERE sahip mi? Aynı bellek nesnesi olmaları gerekir mi?', en: 'Do status_a and status_b have the same VALUE? Do they need to be the same memory object?' },
      { tr: '"is" operatörü değer eşitliğini mi, kimlik (identity) eşitliğini mi kontrol eder?', en: 'Does "is" check value equality, or identity equality?' },
      { tr: '"is" yerine "==" kullan — Java\'daki .equals() gibi davranır.', en: 'Use "==" instead of "is" — it behaves like Java\'s .equals().' },
    ],
    xpReward: 20,
    topic: 'java-to-python',
  },
  {
    id: 'py-java-02',
    title: "Python Has No Method Overloading",
    description: {
      tr: 'Java\'da metod overload edilebilir; Python\'da bunun yerine varsayılan parametre değerleri kullanılır. Aşağıdaki test neden fail ediyor?',
      en: "Java lets you overload methods; Python uses default parameter values instead. Why does the test below fail?",
    },
    buggyCode: `def log_message(message, level):
    print(f"[{level}] {message}")

log_message("Test started")`,
    fixedCode: `def log_message(message, level="INFO"):
    print(f"[{level}] {message}")

log_message("Test started")`,
    expectedOutput: '[INFO] Test started',
    hints: [
      { tr: 'log_message fonksiyonu kaç parametre BEKLİYOR, çağrıda kaç tane VERİLİYOR?', en: 'How many parameters does log_message EXPECT, and how many are GIVEN in the call?' },
      { tr: 'Java\'da olduğu gibi tek parametreli bir "overload" Python\'da otomatik var mı?', en: "Does Python automatically have a single-parameter \"overload\" like Java would?" },
      { tr: '"level" parametresine bir varsayılan değer ver: def log_message(message, level="INFO"):', en: 'Give the "level" parameter a default value: def log_message(message, level="INFO"):' },
    ],
    xpReward: 15,
    topic: 'java-to-python',
  },

  // --- practice-exercises ---
  {
    id: 'py-practice-01',
    title: 'An Off-by-One Loop That Skips the Last Test',
    description: {
      tr: 'range(len(liste) - 1) yazmak, listenin son elemanını atlamana sebep olur. Aşağıdaki test neden fail ediyor?',
      en: 'Writing range(len(list) - 1) makes you skip the last element of the list. Why does the test below fail?',
    },
    buggyCode: `test_results = ["PASS", "FAIL", "PASS", "FAIL", "PASS"]
passed_count = 0
for i in range(len(test_results) - 1):
    if test_results[i] == "PASS":
        passed_count += 1

print(passed_count)`,
    fixedCode: `test_results = ["PASS", "FAIL", "PASS", "FAIL", "PASS"]
passed_count = 0
for i in range(len(test_results)):
    if test_results[i] == "PASS":
        passed_count += 1

print(passed_count)`,
    expectedOutput: '3',
    hints: [
      { tr: 'test_results listesinde kaç eleman var, döngü kaç tanesini geziyor?', en: 'How many elements are in test_results, and how many does the loop visit?' },
      { tr: '"len(test_results) - 1" son elemanı dahil eder mi?', en: 'Does "len(test_results) - 1" include the last element?' },
      { tr: '"- 1" kısmını kaldır: range(len(test_results)).', en: 'Remove the "- 1" part: range(len(test_results)).' },
    ],
    xpReward: 15,
    topic: 'practice-exercises',
  },
  {
    id: 'py-practice-02',
    title: 'Averaging Durations Stored as Strings',
    description: {
      tr: 'sum() bir string listesini doğrudan toplayamaz. Aşağıdaki test neden fail ediyor?',
      en: "sum() can't add up a list of strings directly. Why does the test below fail?",
    },
    buggyCode: `durations = ["2.5", "3.0", "1.5"]
total = sum(durations)
average = total / len(durations)
print(average)`,
    fixedCode: `durations = ["2.5", "3.0", "1.5"]
total = sum(float(d) for d in durations)
average = round(total / len(durations), 2)
print(average)`,
    expectedOutput: '2.33',
    hints: [
      { tr: 'durations listesindeki elemanlar string mi, sayı mı?', en: 'Are the elements in the durations list strings, or numbers?' },
      { tr: 'sum() string\'leri toplayabilir mi, yoksa önce sayıya mı çevirmen gerekir?', en: 'Can sum() add up strings, or do you need to convert them to numbers first?' },
      { tr: 'sum(float(d) for d in durations) kullan, sonucu round(..., 2) ile yuvarla.', en: 'Use sum(float(d) for d in durations) and round the result with round(..., 2).' },
    ],
    xpReward: 15,
    topic: 'practice-exercises',
  },
]

export function toPlaygroundBlock(item) {
  return {
    type: 'code-playground',
    id: item.id,
    label: item.title,
    language: 'python',
    code: item.fixedCode,
    expected: item.expectedOutput,
    explanation: item.description,
    hints: item.hints,
    buggyCode: item.buggyCode,
    fixedCode: item.fixedCode,
    xpReward: item.xpReward,
  }
}

export function getPlaygroundBlocksForTopic(topic) {
  return pythonPlaygroundItems.filter(item => item.topic === topic).map(toPlaygroundBlock)
}
