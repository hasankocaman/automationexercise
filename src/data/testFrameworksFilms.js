// testFrameworksFilms.js — Dalga 19 (2/2): /test-frameworks video-scene + animasyon + sandbox
// Bu sayfa TopicPage/blocks mimarisini KULLANMAZ (özel sayfa, 3 hardcoded JSX
// component: FrameworkComparison, PlaywrightLangCompare, PythonFrameworksTab).
// VideoSceneBlock/StepAnimationBlock/CodePlaygroundBlock kendi kendine yeten
// (standalone) bileşenler olduğu için TestFrameworksPage.jsx'te doğrudan
// {block, darkMode, language} prop'larıyla render edilir — CLAUDE.md §9.5 +
// Documents/video-rollout-plan.md §1 özel sayfa entegrasyon kalıbı.

// ── Section 0: Framework Comparison (Cypress vs Selenium vs Playwright) ────

export const frameworkComparisonFilm = {
  type: 'video-scene',
  id: 'tf-framework-comparison-film',
  title: { tr: '🎬 Cypress mi, Selenium mi, Playwright mı?', en: '🎬 Cypress, Selenium, or Playwright?' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test',      emoji: '🧪', label: { tr: 'Aynı Test: "Login Butonuna Tıkla"', en: 'Same Test: "Click Login Button"' }, color: '#f97316' },
    { id: 'cypress',   emoji: '🌲', label: { tr: 'Cypress: Tarayıcı İÇİNDE Çalışır', en: 'Cypress: Runs INSIDE the Browser' }, color: '#22c55e' },
    { id: 'selenium',  emoji: '🔶', label: { tr: 'Selenium: Protokolle KONTROL Eder', en: 'Selenium: CONTROLS via Protocol' }, color: '#f59e0b' },
    { id: 'playwright', emoji: '🎭', label: { tr: 'Playwright: CDP ile Derin Erişim', en: 'Playwright: Deep Access via CDP' }, color: '#0ea5e9' },
    { id: 'decision',  emoji: '✅', label: { tr: 'Karar: İhtiyaca Göre Seç',    en: 'Decision: Choose by Need' },  color: '#a855f7' },
  ],
  scenes: [
    { caption: { tr: 'Aynı basit test hedefi: "login butonuna tıkla ve sonucu doğrula" — ama üç araç bunu KÖKTEN farklı mimarilerle yapar.', en: 'The same simple test goal: "click login and verify the result" — but three tools do it with FUNDAMENTALLY different architectures.' }, code: { tr: `test: click(loginButton) -> assert redirected`, en: `test: click(loginButton) -> assert redirected` }, positions: { test: { x: 50, y: 30, scale: 1.1, pulse: true } } },
    { caption: { tr: 'Cypress, test kodunu tarayıcının İÇİNE, sayfayla AYNI çalışma zamanına enjekte eder — DOM\'a doğrudan erişir, ağ isteklerini gerçek zamanlı yakalar.', en: 'Cypress injects test code INSIDE the browser, in the SAME runtime as the page — direct DOM access, real-time network interception.' }, code: { tr: `cy.get('#login').click()`, en: `cy.get('#login').click()` }, positions: { test: { x: 44, y: 30, scale: 1.0 }, cypress: { x: 72, y: 18, scale: 1.15, pulse: true } }, beams: [{ from: 'test', to: 'cypress', color: '#22c55e' }] },
    { caption: { tr: 'Selenium, tarayıcıyı DIŞARIDAN bir protokol (WebDriver) üzerinden komutlarla kontrol eder — her komut bir ağ isteği olarak gider.', en: 'Selenium controls the browser from OUTSIDE via a protocol (WebDriver) — every command travels as a network request.' }, code: { tr: `driver.findElement(By.id("login")).click()`, en: `driver.findElement(By.id("login")).click()` }, positions: { cypress: { x: 60, y: 18, opacity: 0.5, scale: 0.9 }, selenium: { x: 30, y: 45, scale: 1.15, pulse: true } }, beams: [{ from: 'cypress', to: 'selenium', color: '#f59e0b' }] },
    { caption: { tr: 'Playwright, Chrome DevTools Protocol (CDP) ile tarayıcıya DERİN erişim sağlar — Selenium\'un HTTP komutlarından daha zengin bir kanal, otomatik bekleme dahil.', en: 'Playwright gets DEEP browser access via Chrome DevTools Protocol (CDP) — a richer channel than Selenium\'s HTTP commands, including auto-waiting.' }, code: { tr: `await page.click('#login') // otomatik bekler`, en: `await page.click('#login') // auto-waits` }, positions: { selenium: { x: 36, y: 45, opacity: 0.6, scale: 0.9 }, playwright: { x: 64, y: 55, scale: 1.2, pulse: true } }, beams: [{ from: 'selenium', to: 'playwright', color: '#0ea5e9' }] },
    { caption: { tr: 'Final — doğru araç, mimari farkına göre seçilir: sadece Chrome\'da hızlı frontend testi mi (Cypress)? Çoklu dil ve geniş tarayıcı desteği mi (Selenium)? Modern auto-wait ve multi-tab mı (Playwright)?', en: 'Final — the right tool is chosen based on the architecture difference: fast Chrome-only frontend testing (Cypress)? Multi-language, wide browser support (Selenium)? Modern auto-wait and multi-tab (Playwright)?' }, positions: { playwright: { x: 40, y: 55, scale: 1.0, opacity: 0.6 }, decision: { x: 66, y: 40, scale: 1.25, pulse: true } }, beams: [{ from: 'playwright', to: 'decision', color: '#a855f7' }] },
  ],
}

export const frameworkComparisonStep = {
  type: 'step-animation',
  title: { tr: 'Doğru Framework\'ü Seçme Kriterleri', en: 'The Criteria for Choosing the Right Framework' },
  steps: [
    { tr: 'Sadece Chrome/Electron\'da, hızlı geri bildirimli frontend testi mi gerekiyor? → Cypress.', en: 'Need fast-feedback frontend testing, only on Chrome/Electron? → Cypress.' },
    { tr: 'Çoklu dil (Java/Python/C#) ve geniş tarayıcı/platform desteği mi gerekiyor? → Selenium.', en: 'Need multi-language (Java/Python/C#) and wide browser/platform support? → Selenium.' },
    { tr: 'Modern otomatik bekleme, multi-tab/multi-origin ve hız mı öncelik? → Playwright.', en: 'Modern auto-waiting, multi-tab/multi-origin, and speed the priority? → Playwright.' },
  ],
}

export const frameworkComparisonPractice = {
  type: 'code-playground',
  relatedTopicId: 'tf-framework-comparison',
  title: { tr: 'Kendin Dene: Senaryoya Doğru Aracı Eşleştir', en: 'Try It Yourself: Match the Right Tool to the Scenario' },
  starterCode: `// Senaryo: ekip Java kullaniyor, Firefox + Safari'de de test etmesi gerekiyor
// TODO: dogru araci yaz
const arac = "?"; // "Cypress" | "Selenium" | "Playwright"`,
  solutionCode: `// Senaryo: ekip Java kullaniyor, Firefox + Safari'de de test etmesi gerekiyor
const arac = "Selenium";`,
  hint: { tr: 'Cypress sadece JavaScript/TypeScript ile çalışır ve Safari\'yi desteklemez — Java + Safari kombinasyonu Selenium\'un güçlü olduğu tam olarak bu alandır.', en: 'Cypress only works with JavaScript/TypeScript and doesn\'t support Safari — the Java + Safari combination is exactly where Selenium\'s strength lies.' },
  successMessage: { tr: 'Doğru! Dil ve tarayıcı kısıtları, framework seçiminde mimari zarafetten daha belirleyicidir.', en: 'Correct! Language and browser constraints are more decisive in framework choice than architectural elegance.' },
}

// ── Section 1: Playwright Language Compare (Python/Java/TypeScript) ────────

export const playwrightLangCompareFilm = {
  type: 'video-scene',
  id: 'tf-playwright-lang-compare-film',
  title: { tr: '🎬 Aynı Playwright Testi, 3 Dilde: Mantık Aynı, Söz Dizimi Farklı', en: '🎬 The Same Playwright Test, 3 Languages: Same Logic, Different Syntax' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'logic',  emoji: '🧠', label: { tr: 'Ortak Mantık: locate -> click -> assert', en: 'Shared Logic: locate -> click -> assert' }, color: '#a855f7' },
    { id: 'python', emoji: '🐍', label: { tr: 'Python: page.click(sel)',    en: 'Python: page.click(sel)' },   color: '#22c55e' },
    { id: 'java',   emoji: '☕', label: { tr: 'Java: page.click(sel);',     en: 'Java: page.click(sel);' },    color: '#f97316' },
    { id: 'ts',     emoji: '🔷', label: { tr: 'TypeScript: await page.click(sel)', en: 'TypeScript: await page.click(sel)' }, color: '#0ea5e9' },
  ],
  scenes: [
    { caption: { tr: 'Üç dilde de test AYNI mantığı izler: elementi bul, tıkla, sonucu doğrula — Playwright API\'si dilden bağımsız aynı kavramları sunar.', en: 'In all three languages, the test follows the SAME logic: find the element, click it, verify the result — Playwright\'s API offers the same concepts regardless of language.' }, code: { tr: `locate -> click -> assert`, en: `locate -> click -> assert` }, positions: { logic: { x: 50, y: 30, scale: 1.1, pulse: true } } },
    { caption: { tr: 'Python\'da: senkron veya async, sade bir sözdizimi — page.click("#login"), assert expect(locator).to_be_visible().', en: 'In Python: sync or async, clean syntax — page.click("#login"), assert expect(locator).to_be_visible().' }, code: { tr: `page.click("#login")\nexpect(locator).to_be_visible()`, en: `page.click("#login")\nexpect(locator).to_be_visible()` }, positions: { logic: { x: 44, y: 30, scale: 1.0 }, python: { x: 72, y: 18, scale: 1.15, pulse: true } }, beams: [{ from: 'logic', to: 'python', color: '#22c55e' }] },
    { caption: { tr: 'Java\'da: tip güvenli, noktalı virgüllü, statik tipli — page.click("#login"); assertThat(locator).isVisible();', en: 'In Java: type-safe, semicolon-terminated, statically typed — page.click("#login"); assertThat(locator).isVisible();' }, code: { tr: `page.click("#login");\nassertThat(locator).isVisible();`, en: `page.click("#login");\nassertThat(locator).isVisible();` }, positions: { python: { x: 60, y: 18, opacity: 0.5, scale: 0.9 }, java: { x: 30, y: 45, scale: 1.15, pulse: true } }, beams: [{ from: 'python', to: 'java', color: '#f97316' }] },
    { caption: { tr: 'TypeScript\'te: await ile Promise tabanlı, JavaScript\'in native async yapısını kullanır — await page.click("#login").', en: 'In TypeScript: Promise-based with await, using JavaScript\'s native async structure — await page.click("#login").' }, code: { tr: `await page.click('#login')\nawait expect(locator).toBeVisible()`, en: `await page.click('#login')\nawait expect(locator).toBeVisible()` }, positions: { java: { x: 36, y: 45, opacity: 0.6, scale: 0.9 }, ts: { x: 64, y: 55, scale: 1.2, pulse: true } }, beams: [{ from: 'java', to: 'ts', color: '#0ea5e9' }] },
    { caption: { tr: 'Final — Java bildiğin için bu üçü arasında geçiş yapmak, YENİ bir test aracı öğrenmek değil, TANIDIK bir mantığın söz dizimini değiştirmektir.', en: 'Final — knowing Java, switching between these three isn\'t learning a NEW testing tool, it\'s changing the syntax of a FAMILIAR logic.' }, positions: { ts: { x: 40, y: 55, scale: 1.0, opacity: 0.6 }, logic: { x: 66, y: 40, scale: 1.2, pulse: true } }, beams: [{ from: 'ts', to: 'logic', color: '#a855f7' }] },
  ],
}

export const playwrightLangCompareStep = {
  type: 'step-animation',
  title: { tr: '3 Dilde Aynı Assertion\'ı Tanıma', en: 'Recognizing the Same Assertion Across 3 Languages' },
  steps: [
    { tr: 'Python: assert expect(locator).to_be_visible() — snake_case metod adları.', en: 'Python: assert expect(locator).to_be_visible() — snake_case method names.' },
    { tr: 'Java: assertThat(locator).isVisible(); — camelCase, noktalı virgül zorunlu.', en: 'Java: assertThat(locator).isVisible(); — camelCase, semicolons required.' },
    { tr: 'TypeScript: await expect(locator).toBeVisible() — camelCase, await zorunlu (Promise tabanlı).', en: 'TypeScript: await expect(locator).toBeVisible() — camelCase, await required (Promise-based).' },
  ],
}

export const playwrightLangComparePractice = {
  type: 'code-playground',
  relatedTopicId: 'tf-playwright-lang-compare',
  title: { tr: 'Kendin Dene: Python\'dan TypeScript\'e Çevir', en: 'Try It Yourself: Translate Python to TypeScript' },
  starterCode: `// Python: expect(locator).to_be_visible()
// TODO: TypeScript karsiligini yaz
const tsAssertion = "?";`,
  solutionCode: `// Python: expect(locator).to_be_visible()
const tsAssertion = "await expect(locator).toBeVisible()";`,
  hint: { tr: 'TypeScript\'te iki değişiklik gerekir: metod adı snake_case\'den camelCase\'e döner (to_be_visible -> toBeVisible) VE Promise tabanlı olduğu için await eklenir.', en: 'TypeScript needs two changes: the method name goes from snake_case to camelCase (to_be_visible -> toBeVisible), AND await gets added since it\'s Promise-based.' },
  successMessage: { tr: 'Doğru! Bu, üç dil arasında geçiş yaparken aklında tutman gereken TEK gerçek fark kalıbıdır — mantık hep aynı kalır.', en: 'Correct! This is the ONE real difference pattern to keep in mind when switching between the three languages — the logic always stays the same.' },
}

// ── Section 2: Python Frameworks — sadece film (animasyon+sandbox zaten var) ─

export const pythonFrameworksFilm = {
  type: 'video-scene',
  id: 'tf-python-frameworks-film',
  title: { tr: '🎬 pytest Fixture Zinciri: Testin Arkasındaki Hazırlık', en: '🎬 The pytest Fixture Chain: The Setup Behind a Test' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test',    emoji: '🧪', label: { tr: 'test_login() Çağrılır',   en: 'test_login() Called' },   color: '#f97316' },
    { id: 'fixture', emoji: '🔧', label: { tr: '@pytest.fixture Devreye Girer', en: '@pytest.fixture Kicks In' }, color: '#0ea5e9' },
    { id: 'setup',   emoji: '⚙️', label: { tr: 'Setup: Driver Başlatılır', en: 'Setup: Driver Starts' },  color: '#22c55e' },
    { id: 'run',     emoji: '▶️', label: { tr: 'Test Gövdesi Çalışır',    en: 'Test Body Runs' },        color: '#a855f7' },
    { id: 'teardown', emoji: '🧹', label: { tr: 'Teardown: yield Sonrası Temizlik', en: 'Teardown: Cleanup After yield' }, color: '#f59e0b' },
  ],
  scenes: [
    { caption: { tr: 'pytest, test_login(driver) fonksiyonunu görür — "driver" argümanının bir fixture olduğunu isminden anlar.', en: 'pytest sees the function test_login(driver) — it recognizes from the name that "driver" is a fixture.' }, code: { tr: `def test_login(driver): ...`, en: `def test_login(driver): ...` }, positions: { test: { x: 16, y: 40, scale: 1.1, pulse: true } } },
    { caption: { tr: '@pytest.fixture ile işaretlenmiş driver() fonksiyonu devreye girer — test gövdesinden ÖNCE çalışır.', en: 'The driver() function marked with @pytest.fixture kicks in — running BEFORE the test body.' }, code: { tr: `@pytest.fixture\ndef driver(): ...`, en: `@pytest.fixture\ndef driver(): ...` }, positions: { test: { x: 14, y: 40, opacity: 0.6, scale: 0.9 }, fixture: { x: 40, y: 40, scale: 1.15, pulse: true } }, beams: [{ from: 'test', to: 'fixture', color: '#0ea5e9' }] },
    { caption: { tr: 'yield\'den ÖNCEKİ kod çalışır: WebDriver başlatılır, tarayıcı açılır — bu SETUP aşamasıdır.', en: 'Code BEFORE yield runs: WebDriver starts, browser opens — this is the SETUP phase.' }, code: { tr: `d = webdriver.Chrome()\nyield d`, en: `d = webdriver.Chrome()\nyield d` }, positions: { fixture: { x: 26, y: 40, opacity: 0.6, scale: 0.9 }, setup: { x: 54, y: 40, scale: 1.2, pulse: true } }, beams: [{ from: 'fixture', to: 'setup', color: '#22c55e' }] },
    { caption: { tr: 'yield ile üretilen driver, test fonksiyonuna PARAMETRE olarak geçer — test gövdesi şimdi çalışır.', en: 'The driver produced by yield is passed as a PARAMETER to the test function — the test body now runs.' }, code: { tr: `driver.get(url)\nassert driver.title == "Login"`, en: `driver.get(url)\nassert driver.title == "Login"` }, positions: { setup: { x: 30, y: 40, opacity: 0.6, scale: 0.9 }, run: { x: 58, y: 40, scale: 1.2, pulse: true } }, beams: [{ from: 'setup', to: 'run', color: '#a855f7' }] },
    { caption: { tr: 'Final — test bitince (geçse de çökse de), yield\'den SONRAKİ kod çalışır: driver.quit(). Bu, testin geçip geçmediğinden BAĞIMSIZ garanti edilir.', en: 'Final — once the test finishes (pass or crash), the code AFTER yield runs: driver.quit(). This is guaranteed REGARDLESS of whether the test passed.' }, positions: { run: { x: 34, y: 40, opacity: 0.6, scale: 0.9 }, teardown: { x: 62, y: 40, scale: 1.25, pulse: true } }, beams: [{ from: 'run', to: 'teardown', color: '#f59e0b' }] },
  ],
}
