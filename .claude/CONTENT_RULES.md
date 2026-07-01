# CONTENT_RULES.md — İçerik Yazım Kuralları

> **Bu dosya ne içerir:** İçeriğin nasıl yazılacağı, nelerin zorunlu olduğu,  
> W3Schools kapsam listesi, 10 yaş prensibi, terim kutusu, mülakat soruları,  
> hata sözlüğü formatları.  
> **Ne zaman oku:** Herhangi bir *Data.js dosyasına içerik eklerken / düzenlerken.

---

## KURAL 1 — W3Schools Kapsam Zorunluluğu (Python & TypeScript)

Python ve TypeScript sayfaları W3Schools'daki TÜM konuları kapsamalıdır.  
Eksik konu = bug. Aşağıdaki liste referans alınır:

### Python — Zorunlu Konular (W3Schools sırası)

```
Intro | Get Started | Syntax | Comments | Variables | Data Types |
Numbers | Casting | Strings | Booleans | Operators | Lists | Tuples |
Sets | Dictionaries | If...Else | While Loops | For Loops | Functions |
Lambda | Arrays | Classes/Objects | Inheritance | Iterators |
Polymorphism | Scope | Modules | Dates | Math | JSON | RegEx |
PIP | Try...Except | User Input | String Formatting |
File Handling (Read/Write/Create/Delete) |
--- QA EK KONULAR (W3Schools'ta yok ama zorunlu) ---
Type Hints | Dataclasses | Context Managers (with) | Decorators |
Generators | Comprehensions (list/dict/set) | Virtual Environments |
pytest basics | requests library | pathlib | logging | argparse
```

### TypeScript — Zorunlu Konular (W3Schools sırası)

```
Intro | Get Started | Simple Types | Special Types | Arrays | Tuples |
Object Types | Enums | Aliases & Interfaces | Union Types |
Functions | Casting | Classes | Basic Generics | Utility Types |
Keyof | Null | Definitely Typed |
--- QA EK KONULAR ---
Type Guards | Discriminated Unions | Conditional Types | Mapped Types |
Template Literal Types | Decorators (experimental) | 
tsconfig.json açıklaması | Playwright TS entegrasyonu |
async/await & Promise types | Error handling ile types
```

### SQL — Zorunlu Konular (W3Schools sırası)

```
Intro | Syntax | SELECT | SELECT DISTINCT | WHERE | ORDER BY | AND | OR |
NOT | INSERT INTO | NULL Values | UPDATE | DELETE | SELECT TOP |
Aggregate Functions (MIN/MAX/COUNT/SUM/AVG) | LIKE | Wildcards | IN |
BETWEEN | Aliases | JOINS (INNER/LEFT/RIGHT/FULL) | SELF JOIN |
UNION | GROUP BY | HAVING | EXISTS | ANY/ALL | SELECT INTO |
INSERT INTO SELECT | CASE | NULL Functions | Stored Procedures |
Comments | Operators | CREATE DB | DROP DB | CREATE TABLE |
DROP TABLE | ALTER TABLE | Constraints (NOT NULL/UNIQUE/PK/FK/CHECK/DEFAULT) |
AUTO INCREMENT | Dates | Views | Injection | Hosting | Data Types |
--- QA EK KONULAR ---
Transactions | EXPLAIN/Query Plan | Window Functions | CTEs | Subqueries
```

---

## KURAL 2 — Sade Anlatım Prensibi (Her Konuda Zorunlu)

Her konunun başında sarı/turuncu arka planlı bir "info box" olmalı.  
Bu box'ta konu günlük hayat örneğiyle çok basit, **başlıksız** olarak açıklanmalı.

**Block formatı (data dosyasında):**
```js
{
  type: 'simple-box',
  emoji: '📦',
  content: {
    tr: 'Liste, sıralı bir alışveriş listesi gibidir. Her madde bir numaralı sıraya sahiptir ve sonuna yeni madde ekleyebilirsin.',
    en: 'A list is like a numbered shopping list. Each item has a position and you can add new items to the end.'
  }
}
```

> ⚠️ `title` field KULLANILMAZ — TopicPage.jsx render etmiyor. Sadece `emoji` + `content`.

**Kurallar:**
- Benzetme somut ve günlük olmalı (okul, yemek, oyun, spor gibi)
- "Teknik" kelime kullanılmamalı — teknik terimler sonraki adımda gelir
- Maksimum 2-3 cümle
- Her konu için FARKLI bir benzetme yaz (tekrar etme)

---

## KURAL 3 — Satır Satır Kod Yorumu Zorunluluğu

Her kod örneğinde her satırın yanında yorum satırı zorunludur.

**Doğru örnek:**
```python
import pytest                    # pytest test kütüphanesini içe aktar
from selenium import webdriver   # Tarayıcı kontrolü için WebDriver'ı al

def test_login():                # "test_" ile başlayan fonksiyon = test case
    driver = webdriver.Chrome()  # Chrome tarayıcısını başlat
    driver.get("https://...")    # Belirtilen URL'e git
    assert "Login" in driver.title  # Başlıkta "Login" var mı kontrol et
    driver.quit()                # Tarayıcıyı kapat (kaynak serbest bırak)
```

**Yanlış (yorum yok = reddedilir):**
```python
import pytest
def test_login():
    driver = webdriver.Chrome()
    driver.get("https://...")
```

---

## KURAL 4 — Terim Kutusu (Glossary Box) Formatı

Teknik bir terim ilk kez geçtiğinde hemen altına `glossary` tipli block ekle.

**Block formatı:**
```js
{
  type: 'glossary-term',
  term: 'fixture',
  items: [
    {
      icon: '📖',
      label: { tr: 'Ne anlama gelir?', en: 'What does it mean?' },
      content: { 
        tr: 'Fixture, bir testin çalışmadan önce hazır olmasını istediği ortam veya veridir.',
        en: 'A fixture is a pre-configured environment or data that a test needs before running.'
      }
    },
    {
      icon: '❌',
      label: { tr: 'Olmasa ne olurdu?', en: 'What if it didn\'t exist?' },
      content: {
        tr: 'Her test kendi tarayıcısını başlatıp kapatmak zorunda kalırdı — kod tekrarı olurdu.',
        en: 'Every test would have to start and stop its own browser — massive code duplication.'
      }
    },
    {
      icon: '✅',
      label: { tr: 'Çözdüğü problem nedir?', en: 'What problem does it solve?' },
      content: {
        tr: 'Test kurulum (setup) ve temizlik (teardown) kodunu tek yerde toplar, paylaşılabilir yapar.',
        en: 'Centralizes setup and teardown logic, making it reusable across multiple tests.'
      }
    },
    {
      icon: '💡',
      label: { tr: 'Faydası ne?', en: 'What\'s the benefit?' },
      content: {
        tr: 'Daha az kod, daha okunabilir testler, değişiklik tek yerden yapılır.',
        en: 'Less code, more readable tests, single point of change.'
      }
    }
  ]
}
```

**Sayfa sonunda Glossary bölümü:**  
Her sayfanın en altında o sayfada kullanılan tüm terimlerin alfabetik listesi olmalı.  
Block tipi: `glossary-section`

---

## KURAL 5 — Quiz / Mini Alıştırma Formatı

Her konu bölümünün sonunda `quiz` tipli block zorunludur.

**Tek doğru cevaplı quiz:**
```js
{
  type: 'quiz',
  question: {
    tr: 'Python\'da bir liste oluşturmak için hangi sözdizimi kullanılır?',
    en: 'Which syntax creates a list in Python?'
  },
  options: [
    { id: 'a', text: '(1, 2, 3)' },
    { id: 'b', text: '[1, 2, 3]' },
    { id: 'c', text: '{1, 2, 3}' },
    { id: 'd', text: '<1, 2, 3>' }
  ],
  correct: 'b',
  explanation: {
    tr: 'Köşeli parantez [] liste oluşturur. () demet (tuple), {} ise set veya dict oluşturur.',
    en: 'Square brackets [] create a list. () creates a tuple, {} creates a set or dict.'
  }
}
```

**Kod tamamlama quiz:**
```js
{
  type: 'quiz-fill',
  instruction: {
    tr: 'Boşluğu doldur: Python\'da bir değişken tanımlamak için keyword gerekmez, sadece _____ kullan.',
    en: 'Fill in the blank: In Python, no keyword is needed to declare a variable, just use _____.'
  },
  answer: '=',
  hint: { tr: 'Atama operatörü', en: 'Assignment operator' }
}
```

---

## KURAL 6 — Mülakat Soruları Formatı

Her konunun altında ve sayfa sonunda `interview-questions` tipli block olmalı.

**Format:**
```js
{
  type: 'interview-questions',
  topic: 'Python Lists',
  questions: [
    // 5 BASIC
    {
      level: 'basic',
      q: { 
        tr: 'Python\'da list ile tuple arasındaki fark nedir?',
        en: 'What is the difference between a list and a tuple in Python?'
      },
      a: {
        tr: 'List değiştirilebilir (mutable) — eleman ekleyip çıkarabilirsiniz. Tuple değiştirilemez (immutable) — oluşturulduktan sonra değiştirilemez. List köşeli parantez [], tuple ise yuvarlak parantez () ile tanımlanır. Performans açısından tuple daha hızlıdır çünkü Python onu optimize edebilir.',
        en: 'A list is mutable — you can add or remove elements. A tuple is immutable — it cannot be changed after creation. Lists use square brackets [], tuples use parentheses (). Tuples are faster because Python can optimize them.'
      }
    },
    // ... 4 more basic, 5 intermediate, 5 advanced
  ]
}
```

**Düzey kuralları:**
- `basic`: "Ne dir?", "Sözdizimi nedir?" türü sorular
- `intermediate`: "Nasıl çalışır?", "Hangisi daha iyi?" türü
- `advanced`: "Neden?", "Trade-off nedir?", "Gerçek senaryoda nasıl?" türü

**Cevap formatı:**
- Mülakatta söylenecek şekilde yaz (konuşma dili + teknik doğruluk)
- 2-4 cümle ideal
- Somut örnek ver

---

## KURAL 7 — Hata Sözlüğü (Error Dictionary) Formatı

Her framework bölümünde `error-dictionary` tipli section olmalı.

**Format:**
```js
{
  type: 'error-dictionary',
  framework: 'Selenium',  // veya 'pytest', 'Playwright'
  errors: [
    {
      error: 'NoSuchElementException',
      fullMessage: 'selenium.common.exceptions.NoSuchElementException: Message: no such element: Unable to locate element',
      cause: {
        tr: 'Locator yanlış yazılmış, element henüz sayfada yok (dynamic load), ya da element başka bir iframe içinde.',
        en: 'Wrong locator, element not yet loaded (dynamic content), or element is inside an iframe.'
      },
      solution: {
        tr: '1) DevTools ile elementi kontrol et. 2) Explicit wait ekle. 3) iframe\'e geç ve sonra ara.',
        en: '1) Inspect the element in DevTools. 2) Add explicit wait. 3) Switch to iframe first.'
      },
      codeWrong: `# YANLIŞ — Element hazır olmadan aranıyor
driver.find_element(By.ID, "submit-btn").click()`,
      codeFixed: `# DOĞRU — Element görünene kadar bekle
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, 10)          # Max 10 saniye bekle
btn = wait.until(
    EC.element_to_be_clickable((By.ID, "submit-btn"))  # Tıklanabilir olana dek
)
btn.click()`
    }
  ]
}
```

**Her framework için zorunlu hatalar:**

**Selenium:**
- NoSuchElementException
- StaleElementReferenceException
- ElementNotInteractableException
- TimeoutException
- WebDriverException (driver not found)
- ElementClickInterceptedException
- InvalidSelectorException
- NoSuchWindowException
- NoAlertPresentException
- NoSuchFrameException

**pytest:**
- AssertionError (detaylı mesaj)
- ImportError / ModuleNotFoundError
- fixture 'X' not found
- FAILED vs ERROR farkı
- Parametrize type mismatch
- Conftest scope hatası
- Collection error (syntax hatası)

**Playwright (Python):**
- TimeoutError (locator.click)
- Error: strict mode violation (multiple elements)
- Error: page has been closed
- net::ERR_CONNECTION_REFUSED
- locator.wait_for timeout
- expect(locator).to_be_visible() timeout

---

## KURAL 8 — Kurulum Adımları Formatı

Kurulum talimatları satır satır, her satırın açıklamasıyla verilmeli.

**Format:**
```js
{
  type: 'installation',
  title: { tr: 'pytest Kurulumu', en: 'Installing pytest' },
  steps: [
    {
      cmd: 'python -m venv venv',
      explanation: {
        tr: 'Yeni bir sanal ortam oluştur. "venv" klasörü bu dizinde oluşur.',
        en: 'Create a new virtual environment. A "venv" folder is created here.'
      }
    },
    {
      cmd: 'venv\\Scripts\\activate',   // Windows
      cmd_mac: 'source venv/bin/activate',
      explanation: {
        tr: 'Sanal ortamı aktif et. Terminalin başında (venv) yazısı çıkmalı.',
        en: 'Activate the virtual environment. You should see (venv) in your terminal prompt.'
      }
    },
    {
      cmd: 'pip install pytest pytest-html',
      explanation: {
        tr: 'pytest\'i ve HTML rapor eklentisini yükle.',
        en: 'Install pytest and the HTML report plugin.'
      }
    },
    {
      cmd: 'pytest --version',
      explanation: {
        tr: 'Kurulumu doğrula. "pytest 7.x.x" gibi bir çıktı görmen gerekir.',
        en: 'Verify the installation. You should see "pytest 7.x.x" in the output.'
      }
    }
  ]
}
```

---

## KURAL 9 — Görsel ve Animasyon Zorunluluğu

- Her konunun yanında en az 1 görsel veya animasyon olmalı
- Görseller inline SVG olarak yazılmalı (dış dosya kullanılmaz)
- Animasyonlar CSS keyframes veya vanilla JS ile (GSAP, anime.js yok)
- Block tipleri: `diagram-svg`, `animation-box`, `flow-diagram`

**Diagram örneği:**
```js
{
  type: 'diagram-svg',
  title: { tr: 'Python Liste Yapısı', en: 'Python List Structure' },
  svg: `<svg viewBox="0 0 400 120" ...>
    <!-- inline SVG içeriği -->
  </svg>`
}
```

---

## KURAL 10 — Dil Toggle Kuralları

- Kod örnekleri hiçbir zaman değişmez (TR/EN fark etmez)
- Değişen: açıklama metinleri, başlıklar, quiz soruları, cevaplar
- Değişmeyen teknik terimler: fixture, locator, assertion, selector,
  callback, payload, endpoint, deploy, mock, stub, spy, hook,
  middleware, driver, element, timeout, viewport, headless, CI/CD,
  browser, tab, window, frame, cookie, session, token
- localStorage key: `language` (`'tr'` veya `'en'`)  ← LanguageContext.jsx'teki gerçek key
- Sayfa yenilendiğinde localStorage'dan oku, yoksa `'tr'` default

---

## KURAL 11 — İçerik Blok Tipi Referansı

| Tip | Açıklama |
|-----|----------|
| `text` | Düz paragraf metni |
| `heading` | Bölüm başlığı (h2/h3) |
| `code` | Syntax highlight'lı kod + kopyala butonu |
| `editor` | Çalıştırılabilir editör (Pyodide/sql.js/Babel) |
| `grid` | 2-4 sütunlu kart grid |
| `table` | Karşılaştırma tablosu |
| `quiz` | Çoktan seçmeli soru |
| `quiz-fill` | Boşluk doldurma |
| `simple-box` | 10 yaş açıklama kutusu (sarı) |
| `glossary-term` | Terim açıklama kartı |
| `glossary-section` | Sayfa sonu sözlük |
| `interview-questions` | Mülakat soruları accordion |
| `error-dictionary` | Hata sözlüğü |
| `diagram-svg` | Inline SVG diyagram |
| `animation-box` | CSS/JS animasyon kutusu |
| `installation` | Kurulum adımları |
| `file-tree` | Interactive proje yapısı |
| `comparison` | Yan yana dil karşılaştırma (Java vs Python vs TS) |
| `tip-box` | Mavi arka planlı ipucu kutusu |
| `warning-box` | Turuncu arka planlı uyarı kutusu |

---

## KURAL 12 — Dil ve İlişkisellik Zorunlulukları

> **Otomatik denetim:** `scripts/check-content-integrity.mjs` bu kuralı her build'de ve her commit öncesi kontrol eder. İhlal varsa build/commit engellenir.

### 12.1. Türkçe Yorum Kapsam Genişletmesi

"Türkçe sayfalarda yorum satırları Türkçe olmalıdır" kuralı (CLAUDE.md Bölüm 8) yalnızca `type: 'code'`/`type: 'editor'` bloklarını değil, `#`, `//`, `/* */`, `--` gibi yorum satırı içeren **TÜM** block tiplerini kapsar:

| Block Tipi | Türkçe Zorunlu Alanlar |
|-----------|------------------------|
| `code` | tüm string veya `{tr}` değeri |
| `editor` | tüm string veya `{tr}` değeri |
| `code-playground` | `starterCode`, `solutionCode`, `hint` |
| `error-dictionary` | `codeWrong`, `codeFixed` |
| `interview-questions` | cevaplardaki (`a`) inline kod örnekleri |

**İstisna (İngilizce kalabilir):**
- Yerleşik teknik terimler: `assert`, `fixture`, `SELECT`, `JOIN`, `NULL`, `push`, `commit` vb.
- Terminal/program çıktısı satırları (gerçek çıktı, sürüm numaraları)

### 12.2. `relatedTopicId` Zorunluluğu

Aşağıdaki block tiplerinin her biri zorunlu olarak **`relatedTopicId`** string alanı taşımalıdır:
- `code-playground`
- `interview-questions`
- `error-dictionary`

`relatedTopicId`, bu bloğun hangi konu/sekme/`topicId`'nin devamı olduğunu belirtir. Jenerik, kopyala-yapıştır bir değer kabul edilmez — hangi konunun pratiği/sorusu/hatası olduğunu açıkça ifade etmelidir (örn. `'python-lists-basics'`, `'selenium-explicit-wait'`).

**Zorunlu alanlar (code-playground):**
```js
{
  type: 'code-playground',
  relatedTopicId: 'python-functions-scope',  // zorunlu
  starterCode: '...',                          // zorunlu
  solutionCode: '...',                         // zorunlu
  hint: '...'                                  // zorunlu, konuya özgü
}
```

### 12.3. Tekrar Yasağı

- Aynı veya birbirine **%85'ten fazla benzeyen** hint/ipucu/practice metni birden fazla farklı `topicId` altında kullanılamaz.
- "Jenerik/kopyala-yapıştır ipucu" yasaktır: "Kodu dikkatlice incele", "Eksik paranteze bak" gibi konuya bağlı olmayan metinler kabul edilmez.
- Yeni bir ipucu/practice eklemeden önce `check-content-integrity.mjs` raporunu kontrol et; benzer içerik varsa mevcut bloğu güncelle, yenisini ekleme.

### 12.4. Uygulama Kontrol Listesi (Blok Eklerken)

Her yeni `code-playground` / `interview-questions` / `error-dictionary` bloğu eklenirken:

- [ ] `relatedTopicId` alanı var mı?
- [ ] Yorum satırları Türkçe bağlamda Türkçe mi?
- [ ] `hint`/`starterCode`/`solutionCode` anlatılan konuyla doğrudan ilgili mi?
- [ ] Benzer bir ipucu projede zaten var mı? (`check-content-integrity.mjs` çalıştır)
- [ ] `node scripts/check-content-integrity.mjs` — sıfır ihlal mi?
