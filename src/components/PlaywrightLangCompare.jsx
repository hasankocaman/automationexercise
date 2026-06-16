import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const scenarios = [
  {
    id: 'login',
    label: '🔐 Login Testi',
    labelEn: '🔐 Login Test',
    desc: 'Aynı login testi — 3 farklı dil + Playwright',
    descEn: 'The same login test — 3 languages + Playwright',
    python: `import pytest
from playwright.sync_api import Page, expect

def test_login(page: Page):
    page.goto("/login")
    page.fill("#username", "admin")
    page.fill("#password", "secret")
    page.click("#submit-btn")

    expect(page).to_have_url("/dashboard")
    expect(page.locator("h1")).to_have_text("Welcome, admin!")`,

    java: `import com.microsoft.playwright.*;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import org.junit.jupiter.api.*;

class LoginTest {
    Playwright playwright;
    Browser browser;
    Page page;

    @BeforeEach void setUp() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        page = browser.newPage();
    }

    @Test void testLogin() {
        page.navigate("https://example.com/login");
        page.fill("#username", "admin");
        page.fill("#password", "secret");
        page.click("#submit-btn");

        PlaywrightAssertions.assertThat(page)
            .hasURL("https://example.com/dashboard");
        PlaywrightAssertions.assertThat(page.locator("h1"))
            .hasText("Welcome, admin!");
    }

    @AfterEach void tearDown() {
        browser.close();
        playwright.close();
    }
}`,

    typescript: `import { test, expect } from '@playwright/test';

test('login works', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'secret');
    await page.click('#submit-btn');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toHaveText('Welcome, admin!');
});`,

    notes: {
      python: ['sync_api — bloklu kod, await yok', 'expect() ayrı import', 'fixture ile page inject edilir'],
      java: '@BeforeEach/@AfterEach — JUnit 5 setup/teardown, PlaywrightAssertions.assertThat() — statik assert metodu, browser.close() manuel kapatma zorunlu',
      typescript: ['async/await — Promise tabanlı', 'page fixture otomatik inject', 'config\'den baseURL okunur'],
    },
    notesEn: {
      python: ['sync_api — blocking code, no await needed', 'expect() imported separately', 'page injected via pytest fixture'],
      java: '@BeforeEach/@AfterEach — JUnit 5 setup/teardown, PlaywrightAssertions.assertThat() — static assert method, browser.close() must be called manually',
      typescript: ['async/await — Promise-based', 'page fixture auto-injected', 'baseURL read from config'],
    },
    differences: 'Python: await yok, senkron API. Java: Manuel browser yönetimi zorunlu, JUnit 5 lifecycle. TypeScript: async/await her yerde, config\'den baseURL otomatik okunur.',
    differencesEn: 'Python: No await, synchronous API. Java: Manual browser management required, JUnit 5 lifecycle. TypeScript: async/await everywhere, baseURL auto-read from config.',
  },
  {
    id: 'api',
    label: '🌐 API Testi',
    labelEn: '🌐 API Test',
    desc: 'HTTP GET isteği ve yanıt doğrulaması',
    descEn: 'HTTP GET request and response validation',
    python: `import requests

def test_get_users():
    response = requests.get(
        "https://api.example.com/users",
        headers={"Authorization": "Bearer TOKEN"}
    )

    assert response.status_code == 200
    data = response.json()
    assert len(data["users"]) > 0
    assert data["users"][0]["email"].endswith("@example.com")

# With Playwright (APIRequestContext):
def test_api_playwright(page):
    resp = page.request.get(
        "https://api.example.com/users",
        headers={"Authorization": "Bearer TOKEN"}
    )
    assert resp.ok
    assert resp.json()["users"]`,

    java: `import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

class UserApiTest {
    @Test
    void testGetUsers() {
        given()
            .header("Authorization", "Bearer TOKEN")
        .when()
            .get("https://api.example.com/users")
        .then()
            .statusCode(200)
            .body("users.size()", greaterThan(0))
            .body("users[0].email", endsWith("@example.com"));
    }
}

// With Playwright for Java:
@Test void testApiPlaywright() {
    APIResponse resp = page.request().get(
        "https://api.example.com/users",
        RequestOptions.create()
            .setHeader("Authorization", "Bearer TOKEN")
    );
    assertTrue(resp.ok());
}`,

    typescript: `import { test, expect } from '@playwright/test';

test('GET /users returns valid data', async ({ request }) => {
    const response = await request.get(
        'https://api.example.com/users',
        { headers: { Authorization: 'Bearer TOKEN' } }
    );

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.users.length).toBeGreaterThan(0);
    expect(data.users[0].email).toContain('@example.com');
});`,

    notes: {
      python: ['requests kütüphanesi en yaygın Python HTTP aracı', 'Playwright page.request ile de API testi yapılabilir', '.json() response\'u dict\'e dönüştürür'],
      java: 'RestAssured BDD tarzı: given/when/then zinciri, Playwright for Java da APIResponse sunar, body("path", matcher) JsonPath + Hamcrest matcher',
      typescript: ['request fixture built-in Playwright\'ın APIRequestContext\'i', 'async/await zorunlu — response.json() da await ister', 'playwright.config\'deki baseURL geçerli'],
    },
    notesEn: {
      python: ['requests library is the most common Python HTTP tool', 'Playwright page.request also supports API testing', '.json() converts response to dict'],
      java: 'RestAssured uses BDD style: given/when/then chain, Playwright for Java also provides APIResponse, body("path", matcher) uses JsonPath + Hamcrest',
      typescript: ['request fixture is Playwright\'s built-in APIRequestContext', 'async/await required — response.json() also needs await', 'baseURL from playwright.config applies'],
    },
    differences: 'Python: requests (3rd party) veya page.request (Playwright). Java: RestAssured BDD zinciri (given/when/then). TypeScript: Built-in request fixture, APIRequestContext.',
    differencesEn: 'Python: requests (3rd party) or page.request (Playwright). Java: RestAssured BDD chain (given/when/then). TypeScript: Built-in request fixture, APIRequestContext.',
  },
  {
    id: 'pom',
    label: '📄 Page Object Model',
    labelEn: '📄 Page Object Model',
    desc: 'Login sayfası için POM sınıfı tasarımı',
    descEn: 'POM class design for a login page',
    python: `# pages/login_page.py
from playwright.sync_api import Page, Locator

class LoginPage:
    def __init__(self, page: Page):
        self.page = page
        self.username: Locator = page.locator("#username")
        self.password: Locator = page.locator("#password")
        self.submit: Locator = page.locator("#submit-btn")
        self.error: Locator = page.locator(".error-message")

    def navigate(self):
        self.page.goto("/login")

    def login(self, username: str, password: str):
        self.username.fill(username)
        self.password.fill(password)
        self.submit.click()

    def get_error(self) -> str:
        return self.error.text_content()

# tests/test_login.py
def test_invalid_login(page):
    login_page = LoginPage(page)
    login_page.navigate()
    login_page.login("wrong", "creds")
    assert login_page.get_error() == "Invalid credentials"`,

    java: `// pages/LoginPage.java
import com.microsoft.playwright.*;

public class LoginPage {
    private final Page page;
    private final Locator username, password, submit, error;

    public LoginPage(Page page) {
        this.page = page;
        this.username = page.locator("#username");
        this.password = page.locator("#password");
        this.submit   = page.locator("#submit-btn");
        this.error    = page.locator(".error-message");
    }

    public void navigate() { page.navigate("/login"); }

    public void login(String user, String pass) {
        username.fill(user);
        password.fill(pass);
        submit.click();
    }

    public String getError() { return error.textContent(); }
}

// LoginTest.java
@Test void testInvalidLogin() {
    LoginPage loginPage = new LoginPage(page);
    loginPage.navigate();
    loginPage.login("wrong", "creds");
    assertEquals("Invalid credentials", loginPage.getError());
}`,

    typescript: `// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly submit: Locator;
    private readonly error: Locator;

    constructor(private readonly page: Page) {
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.submit   = page.locator('#submit-btn');
        this.error    = page.locator('.error-message');
    }

    async navigate() { await this.page.goto('/login'); }

    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.submit.click();
    }

    async expectError(msg: string) {
        await expect(this.error).toHaveText(msg);
    }
}

// login.spec.ts
test('invalid login shows error', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.navigate();
    await lp.login('wrong', 'creds');
    await lp.expectError('Invalid credentials');
});`,

    notes: {
      python: ['Tüm locator\'lar constructor\'da tanımlanır', 'Type hint: Locator — IDE desteği artar', 'sync_api: await yok, Python basit kalır'],
      java: 'Java POM TypeScript ile neredeyse aynı yapı, getError() — Java getter konvansiyonu, Locator\'lar final field olarak bildirilir',
      typescript: ['private readonly — immutable locator\'lar', 'Constructor shorthand: (private readonly page)', 'expect() metot içinde — fluent assertion'],
    },
    notesEn: {
      python: ['All locators defined in constructor', 'Type hint: Locator — improves IDE support', 'sync_api: no await, Python stays simple'],
      java: 'Java POM structure nearly identical to TypeScript, getError() — Java getter convention, Locators declared as final fields',
      typescript: ['private readonly — immutable locators', 'Constructor shorthand: (private readonly page)', 'expect() inside method — fluent assertion'],
    },
    differences: 'Python: Interface yok, type hint ile Locator türü belirtilir. Java: final field, getter metotları (Java konvansiyonu). TypeScript: private readonly, constructor shorthand ile temiz sınıf.',
    differencesEn: 'Python: No interface, Locator type via type hints. Java: final fields, getter methods (Java convention). TypeScript: private readonly, clean class with constructor shorthand.',
  },
  {
    id: 'data',
    label: '📊 Data-Driven Test',
    labelEn: '📊 Data-Driven Test',
    desc: 'Aynı testi birden fazla veri setiyle çalıştırma',
    descEn: 'Running the same test with multiple data sets',
    python: `import pytest
from playwright.sync_api import Page, expect

@pytest.mark.parametrize("email,password,should_pass", [
    ("admin@test.com",  "admin123",  True),
    ("user@test.com",   "user123",   True),
    ("wrong@test.com",  "badpass",   False),
])
def test_login_parametrized(
        page: Page, email: str, password: str, should_pass: bool):
    page.goto("/login")
    page.fill("#email", email)
    page.fill("#password", password)
    page.click("#submit")

    if should_pass:
        expect(page).to_have_url("/dashboard")
    else:
        expect(page.locator(".error")).to_be_visible()`,

    java: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.*;

class LoginParametrizedTest extends BaseTest {

    @ParameterizedTest
    @CsvSource({
        "admin@test.com, admin123, true",
        "user@test.com,  user123,  true",
        "wrong@test.com, badpass,  false"
    })
    void testLoginDataDriven(
            String email, String password, boolean shouldPass) {
        page.navigate("/login");
        page.fill("#email", email);
        page.fill("#password", password);
        page.click("#submit");

        if (shouldPass) {
            assertThat(page).hasURL("/dashboard");
        } else {
            assertThat(page.locator(".error")).isVisible();
        }
    }
}`,

    typescript: `import { test, expect } from '@playwright/test';

const testUsers = [
    { email: 'admin@test.com', password: 'admin123', shouldPass: true  },
    { email: 'user@test.com',  password: 'user123',  shouldPass: true  },
    { email: 'wrong@test.com', password: 'badpass',  shouldPass: false },
];

for (const { email, password, shouldPass } of testUsers) {
    test(\`login \${email}\`, async ({ page }) => {
        await page.goto('/login');
        await page.fill('#email', email);
        await page.fill('#password', password);
        await page.click('#submit');

        if (shouldPass) {
            await expect(page).toHaveURL('/dashboard');
        } else {
            await expect(page.locator('.error')).toBeVisible();
        }
    });
}`,

    notes: {
      python: ['@pytest.mark.parametrize — JUnit @CsvSource karşılığı', 'Her satır ayrı test olarak çalışır', 'CSV, JSON, DB\'den de veri okunabilir'],
      java: '@CsvSource — inline test data, @ParameterizedTest — JUnit 5 parametreli test, BaseTest\'ten page fixture kalıtım alır',
      typescript: ['for...of ile test döngüsü — built-in parametrize yok', 'Her iterasyon ayrı test olarak raporlanır', 'TypeScript tipli veri: { email: string, shouldPass: boolean }'],
    },
    notesEn: {
      python: ['@pytest.mark.parametrize — equivalent to JUnit @CsvSource', 'Each row runs as a separate test', 'Data can also come from CSV, JSON, or DB'],
      java: '@CsvSource — inline test data, @ParameterizedTest — JUnit 5 parameterized test, page fixture inherited from BaseTest',
      typescript: ['for...of loop for tests — no built-in parametrize', 'Each iteration reported as a separate test', 'TypeScript-typed data: { email: string, shouldPass: boolean }'],
    },
    differences: 'Python: @pytest.mark.parametrize dekoratör, veri tuple listesi. Java: @ParameterizedTest + @CsvSource anotasyonu, tip güvenli. TypeScript: for...of döngüsü veya test.each([]) ile parametreli test.',
    differencesEn: 'Python: @pytest.mark.parametrize decorator, data as tuple list. Java: @ParameterizedTest + @CsvSource annotation, type-safe. TypeScript: for...of loop or test.each([]) for parameterized tests.',
  },
  {
    id: 'hooks',
    label: '🔧 Setup / Teardown',
    labelEn: '🔧 Setup / Teardown',
    desc: 'Test öncesi/sonrası hazırlık ve temizleme',
    descEn: 'Test setup and teardown before/after each test',
    python: `import pytest
from playwright.sync_api import sync_playwright, Browser, Page

@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        yield b
        b.close()

@pytest.fixture
def page(browser: Browser):
    context = browser.new_context(
        base_url="https://example.com",
        viewport={"width": 1280, "height": 720},
        record_video_dir="videos/"
    )
    page = context.new_page()
    yield page
    context.close()  # video is saved when the context closes

# Each test gets a fresh page automatically
def test_something(page: Page):
    page.goto("/dashboard")
    ...`,

    java: `import com.microsoft.playwright.*;
import org.junit.jupiter.api.*;

abstract class BaseTest {
    static Playwright playwright;
    static Browser browser;
    BrowserContext context;
    Page page;

    @BeforeAll
    static void launchBrowser() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(
            new BrowserType.LaunchOptions().setHeadless(true)
        );
    }

    @BeforeEach
    void createContext() {
        context = browser.newContext(
            new Browser.NewContextOptions()
                .setBaseURL("https://example.com")
                .setViewportSize(1280, 720)
        );
        page = context.newPage();
    }

    @AfterEach
    void closeContext() { context.close(); }

    @AfterAll
    static void closeBrowser() {
        browser.close();
        playwright.close();
    }
}`,

    typescript: `// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    use: {
        baseURL: 'https://example.com',
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    ],
});

// Custom fixture (test.extend):
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

export const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({ page }, use) => {
        const lp = new LoginPage(page);
        await lp.navigate();
        await use(lp);       // test runs here
        // teardown goes here if needed
    },
});`,

    notes: {
      python: ['scope="session" — tüm testler için tek browser', 'scope="function" (default) — her test için temiz context', 'yield sonrası kod teardown olarak çalışır'],
      java: '@BeforeAll static — bir kez başlat, @BeforeEach — her test için context, @AfterEach/@AfterAll — teardown sırası önemli',
      typescript: ['playwright.config.ts — merkezi konfigürasyon', 'test.extend — custom fixture tanımla', 'Config projeler: aynı test farklı browser\'larda'],
    },
    notesEn: {
      python: ['scope="session" — single browser for all tests', 'scope="function" (default) — fresh context per test', 'Code after yield runs as teardown'],
      java: '@BeforeAll static — launch once, @BeforeEach — context per test, @AfterEach/@AfterAll — teardown order matters',
      typescript: ['playwright.config.ts — centralized config', 'test.extend — define custom fixtures', 'Config projects: same tests across different browsers'],
    },
    differences: 'Python: fixture scope (session/function/class), yield sonrası teardown. Java: @BeforeAll/@AfterAll static, @BeforeEach/@AfterEach instance metot. TypeScript: playwright.config.ts merkezi, test.extend ile custom fixture.',
    differencesEn: 'Python: fixture scope (session/function/class), teardown after yield. Java: @BeforeAll/@AfterAll static, @BeforeEach/@AfterEach instance method. TypeScript: playwright.config.ts centralized, custom fixture via test.extend.',
  },
]

const langColors = {
  python:     { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', header: 'bg-yellow-900/30', text: 'text-yellow-300', label: '🐍 Python',     code: 'text-emerald-200' },
  java:       { bg: 'bg-orange-500/20', border: 'border-orange-500/40', header: 'bg-orange-900/30', text: 'text-orange-300', label: '☕ Java',        code: 'text-amber-200' },
  typescript: { bg: 'bg-blue-500/20',   border: 'border-blue-500/40',   header: 'bg-blue-900/30',   text: 'text-blue-300',   label: '🔷 TypeScript', code: 'text-sky-200' },
}

const langColorsLight = {
  python:     { bg: 'bg-yellow-50',   border: 'border-yellow-300', header: 'bg-yellow-100',   text: 'text-yellow-800' },
  java:       { bg: 'bg-orange-50',   border: 'border-orange-300', header: 'bg-orange-100',   text: 'text-orange-800' },
  typescript: { bg: 'bg-blue-50',     border: 'border-blue-300',   header: 'bg-blue-100',     text: 'text-blue-800' },
}

function CodePanel({ lang, code, notes, darkMode, isTr }) {
  const [copied, setCopied] = useState(false)
  const dc = langColors[lang]
  const lc = langColorsLight[lang]
  const notesArr = Array.isArray(notes) ? notes : (notes || '').split(', ')

  return (
    <div className={`flex flex-col rounded-xl border-2 overflow-hidden ${darkMode ? `${dc.border} ${dc.bg}` : `${lc.border} ${lc.bg}`}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-2.5 ${darkMode ? dc.header : lc.header}`}>
        <span className={`font-bold text-sm ${darkMode ? dc.text : lc.text}`}>{dc.label}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code.trim()); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
          className={`text-xs px-2 py-0.5 rounded transition-all ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          {copied ? '✅' : '📋'}
        </button>
      </div>

      {/* Code */}
      <div className="bg-slate-800 p-3 flex-1">
        <pre className={`font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre ${dc.code}`}>{code.trim()}</pre>
      </div>

      {/* Notes */}
      {notesArr.length > 0 && (
        <div className={`px-3 py-2.5 border-t ${darkMode ? `border-${dc.border.replace('border-','')} bg-gray-900/60` : `${lc.border} bg-white/60`}`}>
          <ul className="space-y-1">
            {notesArr.map((note, i) => (
              <li key={i} className={`text-xs flex gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="shrink-0 mt-0.5">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function PlaywrightLangCompare({ darkMode }) {
  const [activeScenario, setActiveScenario] = useState('login')
  const { language } = useLanguage()
  const isTr = language === 'tr'

  const scenario = scenarios.find(s => s.id === activeScenario)

  return (
    <div className={`rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'} overflow-hidden`}>

      {/* Section Header */}
      <div className={`px-6 py-5 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50'}`}>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🔀</span>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {isTr ? 'Aynı Test, 3 Dil: Python · Java · TypeScript' : 'Same Test, 3 Languages: Python · Java · TypeScript'}
          </h2>
        </div>
        <p className={`text-sm ml-11 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {isTr
            ? 'Playwright testlerinin farklı dillerde nasıl yazıldığını yan yana karşılaştır. Java geçmişin varsa hangi kısımların tanıdık, hangilerin farklı göreceksin.'
            : 'Compare how Playwright tests are written side-by-side in 3 languages. If you know Java, spot what\'s familiar and what\'s different.'}
        </p>

        {/* Lang badges */}
        <div className="flex gap-2 mt-3 ml-11">
          {['python', 'java', 'typescript'].map(lang => (
            <span key={lang} className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${darkMode ? `${langColors[lang].bg} ${langColors[lang].border} ${langColors[lang].text}` : `${langColorsLight[lang].bg} ${langColorsLight[lang].border} ${langColorsLight[lang].text}`}`}>
              {langColors[lang].label}
            </span>
          ))}
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className={`px-6 py-3 border-b flex gap-2 flex-wrap ${darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-100 bg-gray-50'}`}>
        {scenarios.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveScenario(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeScenario === s.id
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {isTr ? s.label : s.labelEn}
          </button>
        ))}
      </div>

      {/* Scenario Desc */}
      <div className={`px-6 py-3 text-sm font-medium ${darkMode ? 'text-gray-300 bg-gray-800/40' : 'text-gray-600 bg-gray-50/50'}`}>
        {isTr ? scenario?.desc : scenario?.descEn}
      </div>

      {/* 3-Column Code Panels */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {['python', 'java', 'typescript'].map(lang => (
          <CodePanel
            key={lang}
            lang={lang}
            code={scenario[lang]}
            notes={isTr ? scenario.notes[lang] : scenario.notesEn[lang]}
            darkMode={darkMode}
            isTr={isTr}
          />
        ))}
      </div>

      {/* Key differences callout — dynamic per scenario */}
      <div className={`mx-5 mb-5 p-4 rounded-xl border ${darkMode ? 'border-indigo-700/50 bg-indigo-900/20' : 'border-indigo-200 bg-indigo-50'}`}>
        <div className="flex items-start gap-2">
          <span className="text-lg shrink-0">💡</span>
          <div>
            <div className={`font-semibold text-sm mb-1 ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`}>
              {isTr ? 'Temel Farklılıklar' : 'Key Differences'}
            </div>
            <div className={`text-xs leading-relaxed ${darkMode ? 'text-indigo-200/80' : 'text-indigo-700'}`}>
              {isTr ? scenario?.differences : scenario?.differencesEn}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaywrightLangCompare
