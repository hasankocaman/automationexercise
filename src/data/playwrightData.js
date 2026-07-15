// playwrightData.js — Playwright tam öğrenme sayfası
// 18 bölüm: Intro, Kurulum, Aksiyonlar, Locator, Wait, Assertions, Test Organizasyonu & Fixtures,
// Page Object Model, iframe/Alert, Dosya/Network, Debugging & Trace, Codegen, Playwright MCP,
// Paralel/CI-CD, Auth & Session, Gerçek Hayat, Hatalar, 50 Mülakat
import { fillMissingCodeTrios } from './interactiveTrioFillers.js'
import { LOCATOR_EXPLORER_BLOCK } from './locatorExplorerData.js'

// ─── Test Lifecycle film bloğu (video-scene — EN + TR paylaşımlı) ────────────
// Veri şeması: PILOT_PLAN_ve_PROMPT.md §2 / src/components/VideoSceneBlock.jsx
const testLifecycleFilm = {
  type: 'video-scene',
  id: 'playwright-test-lifecycle-film',
  title: {
    tr: '🎬 Bir Testin Yaşam Döngüsü',
    en: '🎬 The Life Cycle of a Test',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'browser',  emoji: '🌐', label: { tr: 'Browser (Chromium)',      en: 'Browser (Chromium)' },      color: '#0ea5e9' },
    { id: 'context',  emoji: '🗂️', label: { tr: 'BrowserContext',          en: 'BrowserContext' },          color: '#6366f1' },
    { id: 'page',     emoji: '📄', label: { tr: 'Page (Sekme)',            en: 'Page (Tab)' },              color: '#8b5cf6' },
    { id: 'locator',  emoji: '🎯', label: { tr: 'Locator',                 en: 'Locator' },                 color: '#f59e0b' },
    { id: 'waiter',   emoji: '⏳', label: { tr: 'Auto-Wait',               en: 'Auto-Wait' },               color: '#f97316' },
    { id: 'action',   emoji: '👆', label: { tr: 'Action (click/fill)',     en: 'Action (click/fill)' },     color: '#22c55e' },
    { id: 'assertion',emoji: '✅', label: { tr: 'Assertion (expect)',      en: 'Assertion (expect)' },      color: '#10b981' },
    { id: 'report',   emoji: '📊', label: { tr: 'Test Raporu',             en: 'Test Report' },             color: '#a855f7' },
  ],
  scenes: [
    {
      caption: {
        tr: '`npx playwright test` çalıştırdığında, ekranda gördüğün tek yeşil "1 passed" satırının ARDINDA bu 7 adımlık zincir sırayla işler. Bu filmde her adımı tek tek izleyeceksin.',
        en: 'When you run `npx playwright test`, that single green "1 passed" line hides a 7-step chain running behind the scenes. In this film you will watch each step individually.',
      },
      code: { tr: `npx playwright test`, en: `npx playwright test` },
      positions: {
        browser: { x: 50, y: 50, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 1 — browser.launch(): tarayıcı motoru (Chromium/Firefox/WebKit) başlatılır. Bu AĞIR bir işlemdir — bu yüzden Playwright bir browser\'ı testler arasında YENİDEN KULLANIR, her testte yeniden başlatmaz.',
        en: 'Step 1 — browser.launch(): the browser engine (Chromium/Firefox/WebKit) starts up. This is a HEAVY operation — which is why Playwright REUSES one browser across tests instead of relaunching it every time.',
      },
      code: { tr: `const browser = await chromium.launch();`, en: `const browser = await chromium.launch();` },
      positions: {
        browser: { x: 16, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 2 — browser.newContext(): browser\'ın İÇİNDE izole bir oturum açılır — kendi cookie\'si, localStorage\'ı, oturum durumu olan ayrı bir "profil". Her test kendi context\'ini alır; bu yüzden testler birbirinin state\'ini KİRLETMEZ.',
        en: 'Step 2 — browser.newContext(): an isolated session opens INSIDE the browser — its own cookies, localStorage, session state, like a separate "profile". Every test gets its own context, which is why tests never pollute each other\'s state.',
      },
      code: { tr: `const context = await browser.newContext();`, en: `const context = await browser.newContext();` },
      positions: {
        browser: { x: 16, y: 50, opacity: 0.55, scale: 0.9 },
        context: { x: 40, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'browser', to: 'context' }],
    },
    {
      caption: {
        tr: 'Adım 3 — context.newPage(): context\'in içinde bir sekme (page) açılır. Test kodunun asıl etkileşim kuracağı nesne budur — { page } fixture\'ı olarak testine otomatik enjekte edilir.',
        en: 'Step 3 — context.newPage(): a tab (page) opens inside the context. This is the object your test code actually interacts with — it is auto-injected into your test as the { page } fixture.',
      },
      code: { tr: `const page = await context.newPage();`, en: `const page = await context.newPage();` },
      positions: {
        context: { x: 30, y: 50, opacity: 0.55, scale: 0.9 },
        page: { x: 56, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'context', to: 'page' }],
    },
    {
      caption: {
        tr: 'Adım 4 — page.locator(...): Playwright, DOM üzerinde eşleşen elementi TANIMLAR ama henüz TIKLAMAZ. Locator, elementin kendisi değil, onu her seferinde yeniden bulan bir "tarif"tir — bu yüzden dinamik sayfalarda stale element hatası vermez.',
        en: 'Step 4 — page.locator(...): Playwright DEFINES the matching DOM element but does NOT click it yet. A locator is not the element itself, it is a "recipe" that re-finds it every time — which is why it never throws a stale-element error on dynamic pages.',
      },
      code: { tr: `const btn = page.getByRole('button', { name: 'Giriş Yap' });`, en: `const btn = page.getByRole('button', { name: 'Sign in' });` },
      positions: {
        page: { x: 24, y: 50, opacity: 0.55, scale: 0.9 },
        locator: { x: 48, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'page', to: 'locator' }],
    },
    {
      caption: {
        tr: 'Adım 5 — Auto-Wait: aksiyon çalışmadan ÖNCE Playwright elementin görünür, etkin ve stabil olmasını bekler. Selenium\'da bu adımı sen WebDriverWait ile elle yazardın; burada her aksiyondan önce OTOMATİK çalışır.',
        en: 'Step 5 — Auto-Wait: BEFORE the action runs, Playwright waits for the element to be visible, enabled, and stable. In Selenium you wrote this step manually with WebDriverWait; here it runs AUTOMATICALLY before every action.',
      },
      code: { tr: `// aksiyon çağrılmadan önce görünmez adım`, en: `// invisible step before the action call` },
      positions: {
        locator: { x: 24, y: 50, opacity: 0.55, scale: 0.9 },
        waiter: { x: 48, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'locator', to: 'waiter' }],
    },
    {
      caption: {
        tr: 'Adım 6 — Action: element artık hazır olduğuna göre .click() gerçekten çalışır. Auto-wait\'in ADIM 5\'te bitmiş olması, bu tıklamanın "element henüz DOM\'a gelmedi" hatasıyla patlamamasını garanti eder.',
        en: 'Step 6 — Action: now that the element is ready, .click() actually executes. Because auto-wait finished in Step 5, this click is guaranteed not to fail with "element not yet attached to DOM".',
      },
      code: { tr: `await btn.click();`, en: `await btn.click();` },
      positions: {
        waiter: { x: 24, y: 50, opacity: 0.55, scale: 0.9 },
        action: { x: 48, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'waiter', to: 'action' }],
    },
    {
      caption: {
        tr: 'Adım 7 — Assertion: expect() çalışır ve testin PASS mı FAIL mı olacağına burada karar verilir. Playwright\'ın "web-first assertion"ları da kendi auto-retry\'ına sahiptir — expect() bile bir süre bekleyip tekrar dener.',
        en: 'Step 7 — Assertion: expect() runs and this is where the test\'s PASS/FAIL verdict is decided. Playwright\'s "web-first assertions" carry their own auto-retry too — even expect() waits and retries for a short window.',
      },
      code: { tr: `await expect(page).toHaveURL('/dashboard');`, en: `await expect(page).toHaveURL('/dashboard');` },
      positions: {
        action: { x: 24, y: 50, opacity: 0.55, scale: 0.9 },
        assertion: { x: 48, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'action', to: 'assertion' }],
    },
    {
      caption: {
        tr: 'Final — Rapor & Teardown: sonuç (PASS/FAIL) HTML/JSON raporuna yazılır, sonra context.close() ve browser.close() ile temizlik yapılır. Bir sonraki test, sıfırdan TEMİZ bir context ile aynı zinciri baştan başlatır.',
        en: 'Final — Report & Teardown: the result (PASS/FAIL) is written to the HTML/JSON report, then context.close() and browser.close() clean up. The next test starts this exact chain over again with a completely CLEAN context.',
      },
      code: { tr: `await context.close();`, en: `await context.close();` },
      positions: {
        assertion: { x: 24, y: 50, opacity: 0.55, scale: 0.9 },
        report: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'assertion', to: 'report' }],
    },
  ],
}

// 🎭 Playwright Nedir? — mimari zinciri + Selenium'un HTTP hayaleti
const playwrightArchitectureFilm = {
  type: 'video-scene',
  id: 'playwright-architecture-film',
  title: {
    tr: '🎬 Bir Tıklama Nereden Nereye Gider?',
    en: '🎬 Where Does a Click Actually Travel?',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'code',      emoji: '📝', label: { tr: 'Test Kodu',                 en: 'Test Code' },                 color: '#0ea5e9' },
    { id: 'api',       emoji: '🎭', label: { tr: 'Playwright API',            en: 'Playwright API' },            color: '#8b5cf6' },
    { id: 'ws',        emoji: '🔌', label: { tr: 'Tek WebSocket (CDP)',       en: 'Single WebSocket (CDP)' },     color: '#6366f1' },
    { id: 'browser',   emoji: '🌐', label: { tr: 'Gerçek Browser',            en: 'Real Browser' },               color: '#22c55e' },
    { id: 'result',    emoji: '✅', label: { tr: 'Sonuç Döner',                en: 'Result Returns' },             color: '#16a34a' },
    { id: 'seleniumHttp', emoji: '📮', label: { tr: 'Selenium — Her Komut Yeni HTTP', en: 'Selenium — New HTTP per Command' }, color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'page.getByRole(\'button\', {name:\'Add to Cart\'}).click() yazdığında, bu tek satır aslında 4 katmandan geçer. İlk durak: Playwright\'ın kendi API katmanı.',
        en: 'When you write page.getByRole(\'button\', {name:\'Add to Cart\'}).click(), that single line actually passes through 4 layers. First stop: Playwright\'s own API layer.',
      },
      code: { tr: `await page.getByRole('button', { name: 'Add to Cart' }).click();`, en: `await page.getByRole('button', { name: 'Add to Cart' }).click();` },
      positions: { code: { x: 20, y: 50, scale: 1.15, pulse: true }, api: { x: 55, y: 50, scale: 1 } },
      beams: [{ from: 'code', to: 'api' }],
    },
    {
      caption: {
        tr: 'Playwright API, komutu Chrome DevTools Protocol (CDP) mesajına çevirir ve testin BAŞINDA açılmış olan TEK bir WebSocket bağlantısı üzerinden gönderir — yeni bir bağlantı AÇILMAZ.',
        en: 'The Playwright API translates the command into a Chrome DevTools Protocol (CDP) message and sends it over the SINGLE WebSocket connection opened at the START of the test — no new connection is opened.',
      },
      positions: { code: { x: 10, y: 45, scale: 0.85, opacity: 0.5 }, api: { x: 35, y: 50, scale: 1, opacity: 0.6 }, ws: { x: 62, y: 50, scale: 1.2, pulse: true } },
      beams: [{ from: 'api', to: 'ws', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'WebSocket bağlantısı zaten AÇIK olduğu için mesaj neredeyse anında browser\'a ulaşır — yeni bağlantı kurma (handshake) maliyeti YOKTUR.',
        en: 'Because the WebSocket connection is already OPEN, the message reaches the browser almost instantly — there is NO handshake cost for a new connection.',
      },
      positions: { ws: { x: 30, y: 45, scale: 0.9, opacity: 0.6 }, browser: { x: 62, y: 50, scale: 1.2, pulse: true } },
      beams: [{ from: 'ws', to: 'browser', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Kontrast — Selenium/Java dünyası: driver.findElement(...).click() çağrısı, W3C WebDriver JSON wire protokolü üzerinden ChromeDriver\'a YENİ bir HTTP isteği açar. Her komut = yeni bir HTTP round-trip.',
        en: 'Contrast — the Selenium/Java world: driver.findElement(...).click() opens a NEW HTTP request to ChromeDriver over the W3C WebDriver JSON wire protocol. Every command = a new HTTP round-trip.',
      },
      code: { tr: `driver.findElement(By.id("btn")).click(); // yeni HTTP istegi`, en: `driver.findElement(By.id("btn")).click(); // opens a new HTTP request` },
      positions: {
        browser: { x: 20, y: 35, scale: 0.8, opacity: 0.4 },
        seleniumHttp: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Java\'da RestTemplate ile her seferinde yeni bir HTTP bağlantısı açmak yerine bir Connection Pool kullanman gibi düşün — Playwright\'ın tek WebSocket\'i tam olarak bu tasarruftur, sadece browser komutları için.',
        en: 'Think of it like using a Connection Pool in Java instead of opening a new HTTP connection for every RestTemplate call — Playwright\'s single WebSocket is exactly that savings, applied to browser commands.',
      },
      positions: { seleniumHttp: { x: 22, y: 45, scale: 0.85, opacity: 0.5 }, ws: { x: 58, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Browser tıklamayı gerçekleştirir, sonucu AYNI açık WebSocket üzerinden geri yollar. Sonuç testine döner ve bir sonraki satıra geçilir — hepsi milisaniyeler içinde.',
        en: 'The browser performs the click and sends the result back over the SAME open WebSocket. The result returns to the test and execution moves to the next line — all within milliseconds.',
      },
      positions: {
        browser: { x: 20, y: 45, scale: 0.85, opacity: 0.5 },
        result: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'browser', to: 'result', color: '#16a34a' }],
    },
  ],
}

const playwrightIntroPractice = {
  type: 'code-playground',
  relatedTopicId: 'playwright-nedir-basic-test-practice-01',
  id: 'playwright-nedir-basic-test-practice-01',
  label: { tr: 'Micro Lab: İlk Playwright Testini Tamamla', en: 'Micro Lab: Complete Your First Playwright Test' },
  language: 'typescript',
  task: {
    tr: 'Amaç: sayfaya git, "Products" linkine ARIA rolüne göre tıkla, sonra sayfa başlığının doğru olduğunu doğrula. TODO satırını, Java\'daki assertEquals\'a karşılık gelen Playwright assertion\'ıyla tamamla.',
    en: 'Goal: navigate to the page, click the "Products" link by its ARIA role, then verify the page title. Complete the TODO line with the Playwright assertion equivalent to Java\'s assertEquals.',
  },
  explanation: {
    tr: 'expect(page).toHaveTitle(...), Playwright\'ın "web-first" assertion\'ıdır — Selenium\'daki Assert.assertEquals(beklenen, driver.getTitle()) gibi anlık kontrol etmez, koşul doğru olana kadar birkaç saniye otomatik tekrar dener.',
    en: 'expect(page).toHaveTitle(...) is Playwright\'s "web-first" assertion — unlike Selenium\'s Assert.assertEquals(expected, driver.getTitle()) which checks instantly, it automatically retries for a few seconds until the condition is true.',
  },
  code: {
    tr: `import { test, expect } from '@playwright/test';\n\ntest('ilk test', async ({ page }) => {\n  await page.goto('https://automationexercise.com');\n  await page.getByRole('link', { name: 'Products' }).click();\n  await expect(page).toHaveTitle(/Products/);\n});`,
    en: `import { test, expect } from '@playwright/test';\n\ntest('first test', async ({ page }) => {\n  await page.goto('https://automationexercise.com');\n  await page.getByRole('link', { name: 'Products' }).click();\n  await expect(page).toHaveTitle(/Products/);\n});`,
  },
  starterCode: {
    tr: `import { test, expect } from '@playwright/test';\n\ntest('ilk test', async ({ page }) => {\n  await page.goto('https://automationexercise.com');\n  await page.getByRole('link', { name: 'Products' }).click();\n  // TODO: sayfa basliginin "Products" icerdigini dogrula (web-first assertion kullan)\n});`,
    en: `import { test, expect } from '@playwright/test';\n\ntest('first test', async ({ page }) => {\n  await page.goto('https://automationexercise.com');\n  await page.getByRole('link', { name: 'Products' }).click();\n  // TODO: verify the page title contains "Products" (use a web-first assertion)\n});`,
  },
  solutionCode: {
    tr: `import { test, expect } from '@playwright/test';\n\ntest('ilk test', async ({ page }) => {\n  await page.goto('https://automationexercise.com');\n  await page.getByRole('link', { name: 'Products' }).click();\n  await expect(page).toHaveTitle(/Products/);\n});`,
    en: `import { test, expect } from '@playwright/test';\n\ntest('first test', async ({ page }) => {\n  await page.goto('https://automationexercise.com');\n  await page.getByRole('link', { name: 'Products' }).click();\n  await expect(page).toHaveTitle(/Products/);\n});`,
  },
  expected: {
    tr: 'Test PASS olur: sayfa "Products" linkine tıklandıktan sonra başlık "Products" kelimesini içerir, expect() bunu birkaç yüz milisaniye içinde otomatik doğrular.',
    en: 'The test PASSes: after clicking the "Products" link, the title contains the word "Products" — expect() automatically confirms this within a few hundred milliseconds.',
  },
  hints: [
    { tr: 'page üzerinde çalışan (locator değil) bir assertion arıyorsun — URL/title gibi sayfa seviyesi kontroller için.', en: 'You need an assertion that runs on page (not a locator) — for page-level checks like URL/title.' },
    { tr: 'Aradığın metod: expect(page).toHaveTitle(regex_veya_string).', en: 'The method you need: expect(page).toHaveTitle(regexOrString).' },
  ],
  xpReward: 10,
}

// ⚙️ Kurulum — browser binary + npm sürüm senkronizasyonu filmi
const playwrightBinarySyncFilm = {
  type: 'video-scene',
  id: 'playwright-binary-sync-film',
  title: {
    tr: '🎬 Sürüm Uyuşmazlığı Hiç Olmasın: npm Paketi = Browser Binary',
    en: '🎬 Never a Version Mismatch: npm Package = Browser Binary',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'install',  emoji: '📦', label: { tr: 'npm init playwright@latest', en: 'npm init playwright@latest' }, color: '#0ea5e9' },
    { id: 'pkg',      emoji: '🎭', label: { tr: '@playwright/test v1.45.0',    en: '@playwright/test v1.45.0' },   color: '#8b5cf6' },
    { id: 'binaries', emoji: '🌐', label: { tr: 'Chromium/FF/WebKit Binary',   en: 'Chromium/FF/WebKit Binaries' }, color: '#22c55e' },
    { id: 'seleniumDriver', emoji: '🚗', label: { tr: 'Selenium — Ayrı ChromeDriver', en: 'Selenium — Separate ChromeDriver' }, color: '#94a3b8' },
    { id: 'chromeAutoUpdate', emoji: '⬆️', label: { tr: 'Chrome Otomatik Güncellendi', en: 'Chrome Auto-Updated' },  color: '#f59e0b' },
    { id: 'crash',    emoji: '💥', label: { tr: 'SessionNotCreatedException',  en: 'SessionNotCreatedException' },  color: '#dc2626' },
    { id: 'ci',       emoji: '✅', label: { tr: 'CI\'da Aynı Sürümler',         en: 'Same Versions in CI' },         color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'npm init playwright@latest çalıştırıldığında tek bir npm paketi (@playwright/test) kurulur.',
        en: 'When you run npm init playwright@latest, a single npm package (@playwright/test) is installed.',
      },
      code: { tr: `npm init playwright@latest`, en: `npm init playwright@latest` },
      positions: { install: { x: 30, y: 50, scale: 1.15, pulse: true }, pkg: { x: 65, y: 50, scale: 1 } },
      beams: [{ from: 'install', to: 'pkg' }],
    },
    {
      caption: {
        tr: 'Bu paket, Chromium/Firefox/WebKit binary\'lerini KENDİ İÇİNE gömülü bir sürüm numarasıyla indirir — ~/.cache/ms-playwright altına. Binary sürümü, npm paketi sürümüne KİLİTLİDİR.',
        en: 'This package downloads Chromium/Firefox/WebKit binaries with a version number BAKED INTO the package — into ~/.cache/ms-playwright. Binary version is LOCKED to the npm package version.',
      },
      positions: { install: { x: 12, y: 45, scale: 0.8, opacity: 0.4 }, pkg: { x: 35, y: 50, scale: 0.95 }, binaries: { x: 65, y: 50, scale: 1.2, pulse: true } },
      beams: [{ from: 'pkg', to: 'binaries', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Kontrast — Selenium/Java dünyası: pom.xml\'e selenium-java eklersin, ama ChromeDriver AYRI bir binary\'dir — sistemdeki Chrome sürümüyle EL İLE eşleştirmen gerekir.',
        en: 'Contrast — the Selenium/Java world: you add selenium-java to pom.xml, but ChromeDriver is a SEPARATE binary — you must MANUALLY match it to the system\'s Chrome version.',
      },
      positions: { binaries: { x: 18, y: 40, scale: 0.85, opacity: 0.5 }, seleniumDriver: { x: 60, y: 55, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'CI runner\'da işletim sistemi Chrome\'u sessizce 118\'den 119\'a otomatik günceller. ChromeDriver hâlâ 118 için indirilmiş durumda — ikisi artık UYUŞMUYOR.',
        en: 'On the CI runner, the OS silently auto-updates Chrome from 118 to 119. ChromeDriver is still the one downloaded for 118 — the two no longer MATCH.',
      },
      positions: { seleniumDriver: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, chromeAutoUpdate: { x: 58, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'seleniumDriver', to: 'chromeAutoUpdate', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Sonuç: pipeline SessionNotCreatedException ile patlar — "this version of ChromeDriver only supports Chrome version 118". Kimse kodu değiştirmedi, ama build kırmızı.',
        en: 'Result: the pipeline explodes with SessionNotCreatedException — "this version of ChromeDriver only supports Chrome version 118". Nobody changed any code, yet the build is red.',
      },
      positions: { chromeAutoUpdate: { x: 22, y: 40, scale: 0.85, opacity: 0.5 }, crash: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'chromeAutoUpdate', to: 'crash', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Final — Playwright dünyasında bu senaryo İMKANSIZ: npx playwright install ile indirilen binary, npm paketiyle AYNI sürüm kilidine sahiptir. İşletim sistemi Chrome\'u güncellese bile Playwright kendi izole binary\'sini kullanır, sistem Chrome\'una hiç dokunmaz.',
        en: 'Final — this scenario is IMPOSSIBLE in the Playwright world: the binary downloaded by npx playwright install shares the SAME version lock as the npm package. Even if the OS updates Chrome, Playwright uses its own isolated binary and never touches the system Chrome at all.',
      },
      code: { tr: `npx playwright install  // paket surumune kilitli binary`, en: `npx playwright install  // binary locked to the package version` },
      positions: { binaries: { x: 25, y: 45, scale: 1 }, ci: { x: 65, y: 50, scale: 1.2, pulse: true } },
      beams: [{ from: 'binaries', to: 'ci', color: '#16a34a' }],
    },
  ],
}

// 🖱️ Temel Aksiyonlar — click() öncesi 5 katmanlı actionability zinciri
const playwrightActionabilityFilm = {
  type: 'video-scene',
  id: 'playwright-actionability-film',
  title: {
    tr: '🎬 .click() Çalışmadan Önce Playwright 5 Şeyi Kontrol Eder',
    en: '🎬 Before .click() Fires, Playwright Checks 5 Things',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'call',      emoji: '👆', label: { tr: '.click() çağrıldı',        en: '.click() called' },        color: '#0ea5e9' },
    { id: 'attached',  emoji: '📎', label: { tr: 'DOM\'a Ekli mi?',           en: 'Attached to DOM?' },       color: '#8b5cf6' },
    { id: 'visible',   emoji: '👁️', label: { tr: 'Görünür mü?',              en: 'Visible?' },                color: '#6366f1' },
    { id: 'stable',    emoji: '🧊', label: { tr: 'Stabil mi? (Hareketsiz)',   en: 'Stable? (Not animating)' }, color: '#f59e0b' },
    { id: 'receiving', emoji: '🎯', label: { tr: 'Olayı Alabiliyor mu?',      en: 'Receives Events?' },        color: '#f97316' },
    { id: 'enabled',   emoji: '🔓', label: { tr: 'Etkin mi? (disabled değil)', en: 'Enabled? (not disabled)' }, color: '#22c55e' },
    { id: 'fired',     emoji: '✅', label: { tr: 'Tıklama Gerçekleşti',        en: 'Click Fires' },             color: '#16a34a' },
    { id: 'seleniumCrash', emoji: '💥', label: { tr: 'Selenium — ElementClickInterceptedException', en: 'Selenium — ElementClickInterceptedException' }, color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'page.locator(\'#btn\').click() çağrıldığında, Playwright HEMEN tıklamaz — önce görünmez bir kontrol zincirine girer.',
        en: 'When page.locator(\'#btn\').click() is called, Playwright does NOT click immediately — it first enters an invisible check chain.',
      },
      code: { tr: `await page.locator('#btn').click();`, en: `await page.locator('#btn').click();` },
      positions: { call: { x: 25, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Kontrol 1 — Element DOM\'a eklenmiş mi? Bir API yanıtı henüz gelmediyse element hâlâ hiç YOKTUR; Playwright burada bekler, hemen hata fırlatmaz.',
        en: 'Check 1 — Is the element attached to the DOM? If an API response hasn\'t arrived yet, the element simply does NOT exist yet; Playwright waits here instead of throwing immediately.',
      },
      positions: { call: { x: 12, y: 45, scale: 0.8, opacity: 0.5 }, attached: { x: 40, y: 50, scale: 1.15, pulse: true } },
      beams: [{ from: 'call', to: 'attached' }],
    },
    {
      caption: {
        tr: 'Kontrol 2 — Görünür mü? display:none veya visibility:hidden ise element DOM\'da olsa bile "görünür" sayılmaz, Playwright bunun değişmesini bekler.',
        en: 'Check 2 — Is it visible? Even if the element is in the DOM, display:none or visibility:hidden means it doesn\'t count as "visible" — Playwright waits for that to change.',
      },
      positions: { attached: { x: 18, y: 40, scale: 0.85, opacity: 0.5 }, visible: { x: 46, y: 50, scale: 1.15, pulse: true } },
      beams: [{ from: 'attached', to: 'visible' }],
    },
    {
      caption: {
        tr: 'Kontrol 3 — Stabil mi? Bir CSS animasyonu elementi hâlâ ekranda kaydırıyorsa Playwright tıklamaz — hareket bitene, aynı konumda 2 ardışık frame kalana kadar bekler.',
        en: 'Check 3 — Is it stable? If a CSS animation is still sliding the element across the screen, Playwright will not click — it waits until the motion stops and the position holds for 2 consecutive frames.',
      },
      positions: { visible: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, stable: { x: 50, y: 50, scale: 1.15, pulse: true } },
      beams: [{ from: 'visible', to: 'stable' }],
    },
    {
      caption: {
        tr: 'Kontrast — Selenium: bu kontrolleri YAPMAZ. Element animasyonla hareket halindeyken .click() çağrılırsa, tıklama YANLIŞ koordinata düşer ve ElementClickInterceptedException fırlar.',
        en: 'Contrast — Selenium: it does NOT perform these checks. If .click() is called while the element is mid-animation, the click lands on the WRONG coordinate and throws ElementClickInterceptedException.',
      },
      positions: { stable: { x: 18, y: 35, scale: 0.8, opacity: 0.45 }, seleniumCrash: { x: 55, y: 55, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Kontrol 4 ve 5 — Olayı alabiliyor mu (başka bir element üstünü kapatmıyor mu) ve etkin mi (disabled değil mi)? İkisi de doğruysa zincir tamamlanır.',
        en: 'Checks 4 and 5 — Does it receive pointer events (nothing else covering it) and is it enabled (not disabled)? Once both are true, the chain completes.',
      },
      positions: {
        seleniumCrash: { x: 14, y: 35, scale: 0.75, opacity: 0.35 },
        receiving: { x: 42, y: 45, scale: 1.05, pulse: true },
        enabled: { x: 66, y: 55, scale: 1.05, pulse: true },
      },
      beams: [{ from: 'receiving', to: 'enabled' }],
    },
    {
      caption: {
        tr: 'Final — 5 kontrolün TAMAMI aynı anda doğru olduğu frame\'de gerçek fare tıklaması dispatch edilir. Bu yüzden Playwright\'ta "element henüz hazır değildi" hatası neredeyse hiç görülmez.',
        en: 'Final — the real mouse click is dispatched at the exact frame where ALL 5 checks are true at once. This is why "element wasn\'t ready yet" errors are almost never seen in Playwright.',
      },
      positions: { receiving: { x: 20, y: 45, scale: 0.85, opacity: 0.5 }, enabled: { x: 40, y: 55, scale: 0.85, opacity: 0.5 }, fired: { x: 70, y: 50, scale: 1.2, pulse: true } },
      beams: [{ from: 'enabled', to: 'fired', color: '#16a34a' }],
    },
  ],
}

// 🎯 Locator Stratejileri — DOM refactor'ünde kırılan CSS vs hayatta kalan role
const playwrightBrittleLocatorFilm = {
  type: 'video-scene',
  id: 'playwright-brittle-locator-film',
  title: {
    tr: '🎬 Aynı Refactor, İki Farklı Kader: CSS Locator vs Role Locator',
    en: '🎬 Same Refactor, Two Different Fates: CSS Locator vs Role Locator',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'domBefore', emoji: '🧱', label: { tr: 'div > span > input',        en: 'div > span > input' },       color: '#94a3b8' },
    { id: 'cssLoc',    emoji: '🔗', label: { tr: 'CSS: "div > span > input"', en: 'CSS: "div > span > input"' }, color: '#f59e0b' },
    { id: 'roleLoc',   emoji: '🎯', label: { tr: 'getByRole("textbox", ...)', en: 'getByRole("textbox", ...)' }, color: '#8b5cf6' },
    { id: 'refactor',  emoji: '🎨', label: { tr: 'Frontend: Wrapper div Eklendi', en: 'Frontend: Wrapper div Added' }, color: '#0ea5e9' },
    { id: 'cssBroken', emoji: '💥', label: { tr: 'CSS Locator KIRILDI',        en: 'CSS Locator BROKEN' },       color: '#dc2626' },
    { id: 'roleAlive', emoji: '✅', label: { tr: 'Role Locator ÇALIŞIYOR',      en: 'Role Locator STILL WORKS' }, color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Aynı input elementi için iki farklı test yazılmış: biri DOM YAPISINA (div > span > input) bakıyor, diğeri erişilebilirlik ROLÜNE (textbox, "Kullanıcı Adı") bakıyor.',
        en: 'Two different tests target the same input element: one looks at the DOM STRUCTURE (div > span > input), the other looks at the accessibility ROLE (textbox, "Username").',
      },
      positions: { domBefore: { x: 50, y: 40, scale: 1.1, pulse: true }, cssLoc: { x: 22, y: 62, scale: 0.95 }, roleLoc: { x: 78, y: 62, scale: 0.95 } },
      beams: [{ from: 'cssLoc', to: 'domBefore' }, { from: 'roleLoc', to: 'domBefore' }],
    },
    {
      caption: {
        tr: 'Frontend ekibi sadece görsel boşluk için input\'u yeni bir <div class="field-wrapper"> içine ALIR. İşlevsel olarak HİÇBİR ŞEY değişmedi — kullanıcı hâlâ aynı yerde aynı input\'u görüyor.',
        en: 'The frontend team wraps the input in a new <div class="field-wrapper"> purely for visual spacing. Functionally NOTHING changed — the user still sees the exact same input in the exact same place.',
      },
      positions: { domBefore: { x: 30, y: 40, scale: 0.9, opacity: 0.6 }, refactor: { x: 65, y: 50, scale: 1.2, pulse: true } },
      beams: [{ from: 'domBefore', to: 'refactor', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'CSS locator "div > span > input" artık bir katman EKSİK sayıyor — yeni wrapper div araya girdiği için ilişki bozuldu. Test elementi BULAMIYOR.',
        en: 'The CSS locator "div > span > input" is now off by one level — the new wrapper div breaks the relationship. The test CANNOT find the element.',
      },
      positions: { refactor: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, cssBroken: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'refactor', to: 'cssBroken', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'getByRole("textbox", {name:"Kullanıcı Adı"}) ise DOM hiyerarşisine HİÇ bakmaz — ekran okuyucunun gördüğü rolü ve erişilebilir adı arar. Wrapper div eklensin ya da eklenmesin, bu ikisi DEĞİŞMEDİ.',
        en: 'getByRole("textbox", {name:"Username"}) never looks at the DOM hierarchy at all — it searches for the role and accessible name a screen reader would see. Whether or not the wrapper div was added, neither of those changed.',
      },
      positions: { cssBroken: { x: 18, y: 35, scale: 0.8, opacity: 0.4 }, roleAlive: { x: 58, y: 55, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Sonuç: aynı commit\'te bir test kırmızı yanar (yanlış bir hata — kod bug\'ı yok, sadece markup detayı değişti), diğeri sessizce PASS olmaya devam eder.',
        en: 'Result: in the exact same commit, one test goes red (a false alarm — there\'s no real code bug, just a markup detail change), while the other silently keeps passing.',
      },
      positions: { cssBroken: { x: 25, y: 45, scale: 1 }, roleAlive: { x: 65, y: 45, scale: 1 } },
    },
    {
      caption: {
        tr: 'Final — Java analojisi: bu, private bir field\'ı rename ettiğinde IDE\'nin otomatik refactor yapması gibi düşün. getByRole, arayüzün "sözleşmesine" (kullanıcının gördüğüne) bakar; CSS/XPath ise "implementasyon detayına" (DOM ağacına) bakar. Sözleşmeye bağlı kod her zaman daha az kırılır.',
        en: 'Final — the Java analogy: think of it like an IDE auto-refactoring when you rename a private field. getByRole targets the interface\'s "contract" (what the user sees); CSS/XPath targets the "implementation detail" (the DOM tree). Code bound to the contract always breaks less.',
      },
      positions: { roleAlive: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
  ],
}

// ⏳ Bekleme Mekanizmaları — akıllı trafik ışığı vs sabit Thread.sleep()
const playwrightAutoWaitPollFilm = {
  type: 'video-scene',
  id: 'playwright-auto-wait-poll-film',
  title: {
    tr: '🎬 Akıllı Trafik Işığı vs Sabit Zamanlayıcı',
    en: '🎬 Smart Traffic Light vs a Fixed Timer',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'apiCall',  emoji: '📡', label: { tr: 'API Çağrısı Başladı',        en: 'API Call Started' },        color: '#0ea5e9' },
    { id: 'notReady', emoji: '⏳', label: { tr: 'Buton Henüz Yok',            en: 'Button Not Yet There' },     color: '#94a3b8' },
    { id: 'poll1',    emoji: '🔁', label: { tr: 'Kontrol (t=0ms)',            en: 'Check (t=0ms)' },            color: '#f59e0b' },
    { id: 'poll2',    emoji: '🔁', label: { tr: 'Kontrol (t=100ms)',          en: 'Check (t=100ms)' },          color: '#f59e0b' },
    { id: 'ready',    emoji: '✅', label: { tr: 'Buton Hazır (t=280ms)',      en: 'Button Ready (t=280ms)' },   color: '#16a34a' },
    { id: 'sleepGhost', emoji: '⏰', label: { tr: 'Thread.sleep(2000) — Sabit', en: 'Thread.sleep(2000) — Fixed' }, color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Sepete ekleme butonuna tıklandı, arka planda bir API çağrısı başladı — yanıt gelene kadar "Sipariş Onaylandı" butonu DOM\'da yok.',
        en: 'The add-to-cart button was clicked, triggering an API call in the background — the "Order Confirmed" button does not exist in the DOM until the response arrives.',
      },
      positions: { apiCall: { x: 25, y: 45, scale: 1.1, pulse: true }, notReady: { x: 65, y: 55, scale: 0.9 } },
      beams: [{ from: 'apiCall', to: 'notReady' }],
    },
    {
      caption: {
        tr: 'Playwright bir akıllı trafik ışığı gibi davranır: sabit bir süre beklemez, ~100ms aralıklarla "artık hazır mı?" diye sessizce sorar.',
        en: 'Playwright behaves like a smart traffic light: instead of waiting a fixed duration, it quietly asks "is it ready yet?" roughly every ~100ms.',
      },
      positions: { notReady: { x: 20, y: 45, scale: 0.85, opacity: 0.5 }, poll1: { x: 55, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'notReady', to: 'poll1' }],
    },
    {
      caption: {
        tr: 'Kontrol (t=0ms): "Hazır değil." Playwright hata fırlatmaz, sessizce tekrar dener.',
        en: 'Check (t=0ms): "Not ready." Playwright doesn\'t throw — it silently retries.',
      },
      positions: { poll1: { x: 22, y: 45, scale: 0.9, opacity: 0.6 }, poll2: { x: 58, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'poll1', to: 'poll2', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Kontrol (t=100, 200ms...): API yanıtı geldiği anda (t=280ms) buton DOM\'a girer, görünür ve tıklanabilir olur — Playwright bunu FARK EDER ve HEMEN devam eder.',
        en: 'Checks (t=100, 200ms...): the moment the API response arrives (t=280ms), the button enters the DOM, becomes visible and clickable — Playwright DETECTS this and continues IMMEDIATELY.',
      },
      positions: { poll2: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, ready: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'poll2', to: 'ready', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Kontrast — Selenium/Java: Thread.sleep(2000) yazılmış. Yerel makinede API 280ms\'de yanıt verir — geri kalan 1720ms tamamen BOŞA harcanır, her test 1.7 saniye gereksiz uzar.',
        en: 'Contrast — Selenium/Java: Thread.sleep(2000) was written. On the local machine the API responds in 280ms — the remaining 1720ms is completely WASTED, adding 1.7 unnecessary seconds to every test.',
      },
      code: { tr: `Thread.sleep(2000); // yerelde 1720ms bosa gider`, en: `Thread.sleep(2000); // wastes 1720ms locally` },
      positions: { ready: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, sleepGhost: { x: 60, y: 55, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Daha kötüsü: yoğun bir CI runner\'da aynı API 2500ms\'de yanıt verirse, sabit 2000ms\'lik sleep süresi DOLAR ve element hâlâ yok — test NoSuchElementException ile patlar. Yerelde YEŞİL, CI\'da KIRMIZI — klasik "works on my machine".',
        en: 'Worse: on a busy CI runner, if the same API takes 2500ms, the fixed 2000ms sleep EXPIRES first while the element still doesn\'t exist — the test explodes with NoSuchElementException. GREEN locally, RED in CI — the classic "works on my machine".',
      },
      positions: { sleepGhost: { x: 45, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Final — Playwright\'ın event-driven pollingi asla sabit değildir: koşul erken sağlanırsa erken biter (280ms), geç sağlanırsa timeout\'a kadar (varsayılan 30s aksiyon, 5s assertion) beklemeye devam eder. Ne çok bekler, ne az.',
        en: 'Final — Playwright\'s event-driven polling is never fixed: if the condition is met early, it finishes early (280ms); if it\'s met late, it keeps waiting up to the timeout (default 30s for actions, 5s for assertions). Never too long, never too short.',
      },
      positions: { ready: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
  ],
}

// ✅ Assertions — poll ile bekleyen expect() vs anlık patlayan klasik assert
const playwrightAssertRetryFilm = {
  type: 'video-scene',
  id: 'playwright-assert-retry-film',
  title: {
    tr: '🎬 Aynı 300ms Gecikme, İki Farklı Sonuç',
    en: '🎬 The Same 300ms Delay, Two Different Outcomes',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'submit',   emoji: '🖱️', label: { tr: 'Form Gönderildi',           en: 'Form Submitted' },         color: '#0ea5e9' },
    { id: 'delay',    emoji: '⏱️', label: { tr: 'Sunucu 300ms Gecikmeli',    en: 'Server Delayed by 300ms' }, color: '#94a3b8' },
    { id: 'junitAssert', emoji: '⚖️', label: { tr: 'JUnit assertEquals()',   en: 'JUnit assertEquals()' },   color: '#dc2626' },
    { id: 'failFast', emoji: '💥', label: { tr: 'ANINDA FAIL',               en: 'FAILS IMMEDIATELY' },       color: '#dc2626' },
    { id: 'expectPoll', emoji: '🔁', label: { tr: 'expect().toBeVisible()',  en: 'expect().toBeVisible()' },  color: '#8b5cf6' },
    { id: 'retryLoop', emoji: '🔄', label: { tr: '~100ms Aralıklarla Tekrar', en: 'Retries Every ~100ms' },    color: '#f59e0b' },
    { id: 'passed',   emoji: '✅', label: { tr: '300ms\'de PASS',            en: 'PASS at 300ms' },           color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Kullanıcı formu gönderdi. Sunucu "Sipariş Onaylandı" mesajını 300ms GECİKMEYLE gönderiyor — normal bir ağ gecikmesi, bug değil.',
        en: 'The user submitted the form. The server sends the "Order Confirmed" message with a 300ms DELAY — a normal network delay, not a bug.',
      },
      positions: { submit: { x: 25, y: 45, scale: 1.1, pulse: true }, delay: { x: 65, y: 55, scale: 0.95 } },
      beams: [{ from: 'submit', to: 'delay' }],
    },
    {
      caption: {
        tr: 'Yol 1 — Klasik JUnit assertEquals(): kodun çalıştığı ANDA (t=0ms) DOM\'a bakar. Mesaj daha gelmedi. Test HEMEN kırmızı yanar.',
        en: 'Path 1 — Classic JUnit assertEquals(): looks at the DOM at the EXACT INSTANT (t=0ms) it runs. The message hasn\'t arrived yet. The test goes red IMMEDIATELY.',
      },
      code: { tr: `Assert.assertEquals("Siparis Onaylandi", msg.getText()); // t=0ms`, en: `Assert.assertEquals("Order Confirmed", msg.getText()); // t=0ms` },
      positions: { delay: { x: 18, y: 40, scale: 0.85, opacity: 0.5 }, junitAssert: { x: 55, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'delay', to: 'junitAssert', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Sonuç: "AssertionError: expected <Siparis Onaylandi> but was <>"— hâlbuki mesaj 300ms sonra GERÇEKTEN gelecekti. Bu YANLIŞ bir hata, ama pipeline kırmızı yanar.',
        en: 'Result: "AssertionError: expected <Order Confirmed> but was <>" — even though the message WOULD have genuinely arrived 300ms later. This is a FALSE alarm, but the pipeline goes red.',
      },
      positions: { junitAssert: { x: 25, y: 40, scale: 0.9, opacity: 0.6 }, failFast: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'junitAssert', to: 'failFast', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Yol 2 — Aynı senaryo, Playwright ile: await expect(locator).toBeVisible() da t=0ms\'de ilk kontrolü yapar — mesaj yine yok. Ama BURADA hata fırlatmaz.',
        en: 'Path 2 — the same scenario, with Playwright: await expect(locator).toBeVisible() also runs its first check at t=0ms — the message still isn\'t there. But it does NOT throw HERE.',
      },
      code: { tr: `await expect(page.getByText('Siparis Onaylandi')).toBeVisible(); // ilk kontrol: false`, en: `await expect(page.getByText('Order Confirmed')).toBeVisible(); // first check: false` },
      positions: { failFast: { x: 15, y: 35, scale: 0.75, opacity: 0.35 }, expectPoll: { x: 55, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'expect() bir polling döngüsüne girer: ~100ms\'de bir sessizce yeniden kontrol eder — t=0, t=100, t=200... Sen bu döngü için hiçbir ekstra kod yazmadın.',
        en: 'expect() enters a polling loop: it silently re-checks roughly every ~100ms — t=0, t=100, t=200... You wrote zero extra code for this loop.',
      },
      positions: { expectPoll: { x: 22, y: 45, scale: 0.9, opacity: 0.6 }, retryLoop: { x: 58, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'expectPoll', to: 'retryLoop', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Final — t=300ms\'de mesaj gerçekten DOM\'a girer, bir sonraki kontrol bunu yakalar ve assertion HEMEN geçer. Toplam bekleme sadece 300ms — ne eksik ne fazla, ve gerçek bir bug OLSAYDI 5 saniye sonunda yine düzgün bir TimeoutError alırdın.',
        en: 'Final — at t=300ms the message truly enters the DOM, the next check catches it and the assertion passes IMMEDIATELY. Total wait is exactly 300ms — no more, no less — and if it HAD been a real bug, you\'d still get a clean TimeoutError after the 5-second budget.',
      },
      positions: { retryLoop: { x: 22, y: 45, scale: 0.85, opacity: 0.5 }, passed: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'retryLoop', to: 'passed', color: '#16a34a' }],
    },
  ],
}

// 📦 Page Object Model — UI değişikliğinin 20 dosyada mı 1 dosyada mı yankılanacağı
const playwrightPomRippleFilm = {
  type: 'video-scene',
  id: 'playwright-pom-ripple-film',
  title: {
    tr: '🎬 "Giriş Yap" → "Oturum Aç": 20 Dosya mı, 1 Dosya mı?',
    en: '🎬 "Sign In" → "Log In": 20 Files, or Just 1?',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'uiChange', emoji: '🎨', label: { tr: 'Buton Metni Değişti',        en: 'Button Text Changed' },     color: '#0ea5e9' },
    { id: 'raw1',     emoji: '📄', label: { tr: 'login.spec.ts',              en: 'login.spec.ts' },           color: '#94a3b8' },
    { id: 'raw2',     emoji: '📄', label: { tr: 'checkout.spec.ts',           en: 'checkout.spec.ts' },        color: '#94a3b8' },
    { id: 'raw3',     emoji: '📄', label: { tr: '...18 dosya daha',           en: '...18 more files' },        color: '#94a3b8' },
    { id: 'brokenAll', emoji: '💥', label: { tr: '20 Test KIRMIZI',           en: '20 Tests RED' },            color: '#dc2626' },
    { id: 'pomClass', emoji: '🏠', label: { tr: 'LoginPage.ts (Tek Kaynak)',  en: 'LoginPage.ts (Single Source)' }, color: '#8b5cf6' },
    { id: 'oneEdit',  emoji: '✏️', label: { tr: '1 Satır Değişti',            en: '1 Line Changed' },          color: '#f59e0b' },
    { id: 'allGreen', emoji: '✅', label: { tr: '20 Test YEŞİL',              en: '20 Tests GREEN' },          color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Frontend ekibi login butonunun metnini "Giriş Yap"tan "Oturum Aç"a değiştirdi — küçük bir UX kararı, işlevsel bir değişiklik değil.',
        en: 'The frontend team renamed the login button from "Sign In" to "Log In" — a small UX decision, not a functional change.',
      },
      positions: { uiChange: { x: 50, y: 45, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Yol 1 — POM YOK: getByRole(\'button\', {name:\'Giriş Yap\'}) locator\'ı 20 farklı test dosyasına AYRI AYRI kopyalanmış.',
        en: 'Path 1 — NO POM: the getByRole(\'button\', {name:\'Sign In\'}) locator was copy-pasted SEPARATELY into 20 different test files.',
      },
      positions: {
        uiChange: { x: 15, y: 40, scale: 0.85, opacity: 0.5 },
        raw1: { x: 42, y: 30, scale: 0.9 },
        raw2: { x: 62, y: 55, scale: 0.9 },
        raw3: { x: 42, y: 70, scale: 0.9 },
      },
      beams: [{ from: 'uiChange', to: 'raw1' }, { from: 'uiChange', to: 'raw2' }, { from: 'uiChange', to: 'raw3' }],
    },
    {
      caption: {
        tr: 'Metin değiştiği anda getByRole(\'button\', {name:\'Giriş Yap\'}) artık HİÇBİR YERDE elementi bulamıyor — çünkü o metin artık DOM\'da yok. 20 dosyanın HEPSİ kırmızı yanar.',
        en: 'The moment the text changes, getByRole(\'button\', {name:\'Sign In\'}) can no longer find the element ANYWHERE — because that text no longer exists in the DOM. ALL 20 files go red.',
      },
      positions: {
        raw1: { x: 25, y: 35, scale: 0.8, opacity: 0.5 },
        raw2: { x: 25, y: 55, scale: 0.8, opacity: 0.5 },
        raw3: { x: 25, y: 75, scale: 0.8, opacity: 0.5 },
        brokenAll: { x: 65, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'raw1', to: 'brokenAll', color: '#dc2626' }, { from: 'raw2', to: 'brokenAll', color: '#dc2626' }, { from: 'raw3', to: 'brokenAll', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Düzeltme: 20 dosyanın HER BİRİNİ elle açıp aynı satırı tek tek güncellemen gerekiyor — Java\'da bir interface\'i implement eden 20 sınıfı elle güncellemek gibi, IDE\'nin refactor aracı burada yardım edemez çünkü locator\'lar birer STRING.',
        en: 'The fix: you must manually open EACH of the 20 files and update the same line one by one — like manually updating 20 classes implementing an interface in Java, except the IDE\'s refactor tool can\'t help because locators are just STRINGS.',
      },
      positions: { brokenAll: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Yol 2 — POM VAR: aynı locator, aynı login mantığı sadece LoginPage.ts sınıfında YAŞIYOR. 20 test dosyası, kendi locator\'ını taşımaz — sadece new LoginPage(page).login(...) çağırır.',
        en: 'Path 2 — WITH POM: the same locator and the same login logic LIVE only inside the LoginPage.ts class. The 20 test files don\'t carry their own locator — they just call new LoginPage(page).login(...).',
      },
      positions: { uiChange: { x: 15, y: 45, scale: 0.85, opacity: 0.5 }, pomClass: { x: 55, y: 50, scale: 1.2, pulse: true } },
      beams: [{ from: 'uiChange', to: 'pomClass', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Buton metni değişince tek yapılması gereken: LoginPage.ts içindeki BİR satırı güncellemek — signInButton = page.getByRole(\'button\', {name:\'Oturum Aç\'}).',
        en: 'When the button text changes, the only thing that needs updating is ONE line inside LoginPage.ts — signInButton = page.getByRole(\'button\', {name:\'Log In\'}).',
      },
      code: { tr: `signInButton = page.getByRole('button', { name: 'Oturum Ac' });`, en: `signInButton = page.getByRole('button', { name: 'Log In' });` },
      positions: { pomClass: { x: 25, y: 40, scale: 0.9, opacity: 0.6 }, oneEdit: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'pomClass', to: 'oneEdit', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Final — LoginPage sınıfını kullanan 20 test dosyasının HİÇBİRİNE dokunulmadı, ama HEPSİ otomatik olarak yeşile döner. Bu, "single source of truth" prensibinin test katmanındaki en somut kanıtıdır.',
        en: 'Final — NONE of the 20 test files using the LoginPage class were touched, yet ALL of them automatically turn green again. This is the most concrete proof of the "single source of truth" principle in the test layer.',
      },
      positions: { oneEdit: { x: 25, y: 45, scale: 0.85, opacity: 0.5 }, allGreen: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'oneEdit', to: 'allGreen', color: '#16a34a' }],
    },
  ],
}

// 🖼️ iframe · Alert · Popup — frameLocator kapsamı vs Selenium'un global context kayması
const playwrightIframeScopeFilm = {
  type: 'video-scene',
  id: 'playwright-iframe-scope-film',
  title: {
    tr: '🎬 Bağlamı Kaybetmeyen Zincir: frameLocator()',
    en: '🎬 The Chain That Never Loses Context: frameLocator()',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'mainPage', emoji: '📄', label: { tr: 'Checkout Sayfası',            en: 'Checkout Page' },           color: '#0ea5e9' },
    { id: 'outer',    emoji: '🪟', label: { tr: 'Dış iframe (ödeme sağlayıcı)', en: 'Outer iframe (payment provider)' }, color: '#8b5cf6' },
    { id: 'inner',    emoji: '🪟', label: { tr: 'İç iframe (kart formu)',      en: 'Inner iframe (card form)' },  color: '#6366f1' },
    { id: 'cardField', emoji: '💳', label: { tr: '#cardNumber Alanı',          en: '#cardNumber Field' },        color: '#22c55e' },
    { id: 'seleniumSwitch', emoji: '🔀', label: { tr: 'Selenium: switchTo().frame()', en: 'Selenium: switchTo().frame()' }, color: '#dc2626' },
    { id: 'stuck',    emoji: '😵', label: { tr: 'Unutulan defaultContent() → Sonraki Komut KAYBOLDU', en: 'Forgotten defaultContent() → Next Command LOST' }, color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Checkout sayfasının içinde bir ödeme sağlayıcının iframe\'i var, ONUN içinde de kart numarası formunun olduğu İKİNCİ bir iç içe iframe var.',
        en: 'The checkout page contains a payment provider\'s iframe, and INSIDE that there\'s a SECOND nested iframe holding the card number form.',
      },
      positions: { mainPage: { x: 20, y: 50, scale: 1.05 }, outer: { x: 48, y: 50, scale: 1 }, inner: { x: 76, y: 50, scale: 1 } },
      beams: [{ from: 'mainPage', to: 'outer' }, { from: 'outer', to: 'inner' }],
    },
    {
      caption: {
        tr: 'Playwright\'ta bu tek bir ZİNCİR ile ifade edilir: page.frameLocator(\'#outer\').frameLocator(\'#inner\').locator(\'#cardNumber\'). Her frameLocator() çağrısı SADECE kendi ifadesinde geçerli, hiçbir global durum değişmez.',
        en: 'In Playwright this is expressed as a single CHAIN: page.frameLocator(\'#outer\').frameLocator(\'#inner\').locator(\'#cardNumber\'). Each frameLocator() call is scoped ONLY to its own expression — no global state changes anywhere.',
      },
      code: { tr: `const kart = page.frameLocator('#outer').frameLocator('#inner').locator('#cardNumber');\nawait kart.fill('4242 4242 4242 4242');`, en: `const card = page.frameLocator('#outer').frameLocator('#inner').locator('#cardNumber');\nawait card.fill('4242 4242 4242 4242');` },
      positions: { mainPage: { x: 12, y: 45, scale: 0.85, opacity: 0.5 }, outer: { x: 35, y: 50, scale: 0.9, opacity: 0.6 }, inner: { x: 58, y: 50, scale: 0.95, opacity: 0.7 }, cardField: { x: 84, y: 50, scale: 1.2, pulse: true } },
      beams: [{ from: 'inner', to: 'cardField', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Kontrast — Selenium/Java: driver.switchTo().frame("outer") çağrısı driver\'ın GLOBAL bağlamını iframe\'e taşır — bu andan sonraki HER findElement() otomatik olarak o iframe içinde arar.',
        en: 'Contrast — Selenium/Java: driver.switchTo().frame("outer") moves the driver\'s GLOBAL context into the iframe — from this moment on, EVERY findElement() automatically searches inside that iframe.',
      },
      code: { tr: `driver.switchTo().frame("outer");\ndriver.switchTo().frame("inner");\ndriver.findElement(By.id("cardNumber")).sendKeys("4242...");`, en: `driver.switchTo().frame("outer");\ndriver.switchTo().frame("inner");\ndriver.findElement(By.id("cardNumber")).sendKeys("4242...");` },
      positions: { cardField: { x: 15, y: 40, scale: 0.8, opacity: 0.4 }, seleniumSwitch: { x: 58, y: 55, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Kart bilgisi girildikten sonra developer bir satır UNUTUR: driver.switchTo().defaultContent() çağrısı — ana sayfaya dönmeyi hatırlatan tek satır.',
        en: 'After entering the card details, the developer FORGETS one line: the driver.switchTo().defaultContent() call — the only line that reminds Selenium to return to the main page.',
      },
      positions: { seleniumSwitch: { x: 30, y: 45, scale: 0.95, opacity: 0.6 }, stuck: { x: 65, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'seleniumSwitch', to: 'stuck', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Bir sonraki satır ana sayfadaki "Ödemeyi Tamamla" butonunu arıyor — ama driver HÂLÂ iç iframe bağlamında! Element "bulunamıyor", hata mesajı yanıltıcı: aslında bug locator\'da değil, UNUTULAN context switch\'te.',
        en: 'The next line searches for the "Complete Payment" button on the main page — but the driver is STILL scoped to the inner iframe! The element "can\'t be found", and the error is misleading: the real bug isn\'t the locator, it\'s the FORGOTTEN context switch.',
      },
      positions: { stuck: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Final — Playwright\'ta bu hata sınıfı yapısal olarak İMKANSIZ: frameLocator() zinciri değişkende yaşar, page nesnesinin kendisini asla değiştirmez. Bir sonraki satır her zaman page.locator(...) ile ana sayfaya sorunsuzca erişir — "unutulacak" bir reset adımı hiç YOKTUR.',
        en: 'Final — this entire class of bug is structurally IMPOSSIBLE in Playwright: the frameLocator() chain lives in a variable and never mutates the page object itself. The next line always accesses the main page cleanly via page.locator(...) — there is simply NO reset step to forget.',
      },
      positions: { cardField: { x: 25, y: 45, scale: 0.9 }, mainPage: { x: 65, y: 50, scale: 1.15, pulse: true } },
    },
  ],
}

const s0 = {
  tr: {
    title: '🎭 Playwright Nedir? Neden Kullanılır?',
    blocks: [
      {
        type: 'simple-box', emoji: '🎮',
        content: 'Playwright, uçak simülatörü kokpitindeki otopilot sistemi gibi çalışır: sen rotayı söylersin ("şu butona tıkla"), sistem arka planda düzinelerce sensörü eş zamanlı izler (DOM durumu, ağ trafiği, JavaScript eventleri) ve koşullar oluştuğu anda harekete geçer. Peki Selenium varken neden Playwright\'a ihtiyaç var? Selenium\'da sen pilotun koltuğuna oturup her manevrayı elle koordine etmek zorundaydın — "önce elementi bekle, sonra tıkla, sonra bir daha bekle" diye onlarca satır WebDriverWait kodu. Java\'da Selenium kullanırken yazman gereken thread.sleep() veya FluentWait satırlarını düşün: bekleme süresi kısa olursa test yarı yolda patlar, uzun olursa CI pipeline saatlerce sürünür; production\'da bir servis normalden 3 saniye geç yanıt verdiğinde sabit sleep bunun hiçbirini tutamaz. Playwright\'ın auto-wait mekanizması bu kategorideki testlerin büyük bölümünü flaky olmaktan çıkarır — QA ekiplerinde "her sabah birkaç test başarısız, yeniden çalıştırınca geçiyor" diye bilinen kabusu ciddi ölçüde azaltır.',
      },
      {
        type: 'css-animation',
        kind: 'playwright-autowait',
        label: { tr: 'Auto-Wait Mekanizması', en: 'Auto-Wait Mechanism' },
      },
      {
        type: 'text',
        content: 'Playwright, Microsoft tarafından 2020\'de piyasaya sürülen açık kaynaklı tarayıcı otomasyon kütüphanesidir. Chromium (Chrome/Edge), Firefox ve WebKit (Safari) motorlarını TEK bir API ile kontrol eder. Java\'da Selenium WebDriver kullandıysanız, Playwright\'ı "Selenium\'un modern, daha güçlü kuzeni" olarak düşünebilirsiniz.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Java\'da ChromeDriver driver = new ChromeDriver() yazıp driver.findElement(By.id("x")).click() yapıyordun. Playwright\'ta browser = playwright.chromium().launch() yazıyorsun, page.locator("#x").click() yapıyorsun. Kavramlar birebir aynı, sözdizimi daha kısa ve "auto-wait" sayesinde explicit wait yazmak zorunda kalmıyorsun.',
      },
      {
        type: 'heading', text: 'Playwright vs Selenium — Ana Farklar',
      },
      {
        type: 'table',
        headers: ['Özellik', 'Selenium', 'Playwright'],
        rows: [
          ['Çıkış yılı', '2004', '2020'],
          ['Geliştirici', 'ThoughtWorks → Apache', 'Microsoft'],
          ['Tarayıcı desteği', 'Chrome, Firefox, Safari, Edge, IE', 'Chromium, Firefox, WebKit'],
          ['Dil desteği', 'Java, Python, C#, JS, Ruby, Kotlin', 'TypeScript, JavaScript, Python, Java, C#'],
          ['Auto-wait', '❌ Manuel wait yazılır', '✅ Her aksiyon öncesi otomatik bekler'],
          ['Network mock', '❌ Ek kütüphane gerekir', '✅ page.route() ile built-in'],
          ['iframe', 'switchTo().frame() → karmaşık', 'frameLocator() → tek satır'],
          ['Multiple tabs', '❌ Zor', '✅ context.newPage() ile kolay'],
          ['Test runner', 'TestNG / JUnit (Java)', '@playwright/test (built-in)'],
          ['Screenshot/video', '❌ Ek kütüphane', '✅ Built-in'],
          ['Mobile emulation', '❌ Appium gerekir', '✅ devices ile emulation'],
          ['Headless mode', '✅ Chrome headless', '✅ Tüm browserlar headless'],
          ['Paralel test', '❌ Grid gerekir', '✅ Built-in workers'],
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Playwright Çalışma Mimarisi',
        steps: [
          { num: 1, label: 'Test Kodu', desc: 'TS / Java / Python', highlight: true },
          { num: 2, label: 'Playwright', desc: 'API Katmanı', highlight: false },
          { num: 3, label: 'CDP / WebSocket', desc: 'Protocol', highlight: false },
          { num: 4, label: 'Browser', desc: 'Chromium / FF / WebKit', highlight: true },
          { num: 5, label: 'Sonuç', desc: 'Pass / Fail + Report', highlight: false },
        ],
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '⚡', label: 'Auto-Wait', desc: 'Eleman tıklanabilir olana kadar otomatik bekler. Stale element hatası yok.' },
          { icon: '🌐', label: 'Multi-Browser', desc: 'Chromium, Firefox, WebKit — aynı test 3 motorda çalışır.' },
          { icon: '🔗', label: 'Network Mock', desc: 'page.route() ile API yanıtlarını sahte veriyle değiştirebilirsin.' },
          { icon: '📸', label: 'Visual Test', desc: 'Screenshot karşılaştırması ve video kayıt built-in gelir.' },
          { icon: '📱', label: 'Mobile Emulation', desc: 'devices["iPhone 13"] ile gerçek mobil görünüm simülasyonu.' },
          { icon: '🔀', label: 'Paralel', desc: 'Workers ile testler aynı anda birden fazla tarayıcıda çalışır.' },
        ],
      },
      playwrightArchitectureFilm,
      playwrightIntroPractice,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta "auto-wait" ne anlama gelir?', en: 'What does "auto-wait" mean in Playwright?' },
        options: [
          { id: 'a', text: 'Sadece sayfa yüklenirken bekler' },
          { id: 'b', text: 'Her aksiyon öncesinde element hazır olana kadar otomatik bekler' },
          { id: 'c', text: 'Thread.sleep() gibi sabit süre bekler' },
          { id: 'd', text: 'Sadece network isteklerini bekler' },
        ],
        correct: 'b',
        explanation: { tr: 'Auto-wait: click(), fill(), type() gibi her aksiyondan önce Playwright elementi otomatik olarak "görünür", "tıklanabilir" ve "stabil" olana kadar bekler. Selenium\'da bunu WebDriverWait ile manuel yazman gerekirdi.', en: 'Auto-wait means before every action like click(), fill(), type(), Playwright automatically waits for the element to be visible, enabled, and stable. In Selenium you had to write this manually with WebDriverWait.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ın sağladığı \"aksiyon öncesi bekleme\" (auto-wait) mekanizmasının temel amacı nedir?",
            "en": "What is the main purpose of the \"auto-wait\" mechanism provided by Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Ağ trafiğinin tamamlanmasını garantilemek",
                        "en": "To ensure network traffic is complete"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "İşlem yapılmadan önce elementin etkileşime hazır olmasını sağlamak",
                        "en": "To ensure the element is actionable before performing an interaction"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Kodun çalışma hızını yavaşlatarak senkronizasyon sağlamak",
                        "en": "To slow down execution speed for synchronization"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece DOM yapısının yüklenmesini beklemek",
                        "en": "To wait only for the DOM structure to load"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Auto-wait, Playwright'ın bir element üzerinde aksiyon almadan önce o elementin görünür, aktif ve tıklanabilir durumda olup olmadığını kontrol etme özelliğidir. Bu sayede 'element not found' veya 'element not clickable' hatalarının çoğu otomatik olarak engellenir.",
            "en": "Auto-wait is Playwright's feature to verify if an element is visible, stable, and enabled before interacting with it. This automatically prevents many common 'element not found' or 'element not clickable' errors."
      }
}
},
    ],
  },
  en: {
    title: '🎭 What is Playwright? Why Use It?',
    blocks: [
      {
        type: 'simple-box', emoji: '🎮',
        content: 'Playwright works like the autopilot system in a flight simulator cockpit: you declare the destination ("click that button"), and the system simultaneously monitors dozens of sensors in the background — DOM state, network traffic, JavaScript events — then acts the moment conditions are right. But if Selenium already exists, why do you need Playwright? With Selenium you had to sit in the pilot\'s seat and manually coordinate every maneuver: "wait for the element, then click, then wait again" — dozens of lines of WebDriverWait code. Think of every thread.sleep() or FluentWait you wrote in Selenium/Java: set the wait too short and the test crashes halfway; set it too long and the CI pipeline crawls for hours. When a production service responds 3 seconds late, no hardcoded sleep can catch it. Playwright\'s auto-wait mechanism eliminates most of this flakiness — it directly attacks the "a few tests fail every morning, re-run and they pass" nightmare that plagues QA teams.',
      },
      {
        type: 'text',
        content: 'Playwright is an open-source browser automation library released by Microsoft in 2020. It controls Chromium (Chrome/Edge), Firefox, and WebKit (Safari) engines with a SINGLE API. If you\'ve used Selenium WebDriver in Java, think of Playwright as "Selenium\'s modern, more powerful cousin".',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In Java you wrote ChromeDriver driver = new ChromeDriver() and driver.findElement(By.id("x")).click(). In Playwright you write browser = playwright.chromium().launch() and page.locator("#x").click(). The concepts are identical — the syntax is shorter and auto-wait means you rarely need explicit waits.',
      },
      { type: 'heading', text: 'Playwright vs Selenium — Key Differences' },
      {
        type: 'table',
        headers: ['Feature', 'Selenium', 'Playwright'],
        rows: [
          ['Released', '2004', '2020'],
          ['Developer', 'ThoughtWorks → Apache', 'Microsoft'],
          ['Browser support', 'Chrome, Firefox, Safari, Edge, IE', 'Chromium, Firefox, WebKit'],
          ['Languages', 'Java, Python, C#, JS, Ruby, Kotlin', 'TypeScript, JavaScript, Python, Java, C#'],
          ['Auto-wait', '❌ Manual waits required', '✅ Waits automatically before every action'],
          ['Network mock', '❌ Needs extra library', '✅ Built-in page.route()'],
          ['iframe', 'switchTo().frame() → complex', 'frameLocator() → one line'],
          ['Multiple tabs', '❌ Difficult', '✅ Easy with context.newPage()'],
          ['Test runner', 'TestNG / JUnit (Java)', '@playwright/test (built-in)'],
          ['Screenshot/video', '❌ Extra library', '✅ Built-in'],
          ['Mobile emulation', '❌ Needs Appium', '✅ Built-in devices'],
          ['Parallel tests', '❌ Needs Grid', '✅ Built-in workers'],
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Playwright Architecture',
        steps: [
          { num: 1, label: 'Test Code', desc: 'TS / Java / Python', highlight: true },
          { num: 2, label: 'Playwright', desc: 'API Layer', highlight: false },
          { num: 3, label: 'CDP / WebSocket', desc: 'Protocol', highlight: false },
          { num: 4, label: 'Browser', desc: 'Chromium / FF / WebKit', highlight: true },
          { num: 5, label: 'Result', desc: 'Pass / Fail + Report', highlight: false },
        ],
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '⚡', label: 'Auto-Wait', desc: 'Automatically waits until element is clickable. No more stale element errors.' },
          { icon: '🌐', label: 'Multi-Browser', desc: 'Chromium, Firefox, WebKit — same test runs on all 3 engines.' },
          { icon: '🔗', label: 'Network Mock', desc: 'page.route() lets you replace real API responses with fake data.' },
          { icon: '📸', label: 'Visual Test', desc: 'Screenshot comparison and video recording are built-in.' },
          { icon: '📱', label: 'Mobile Emulation', desc: 'devices["iPhone 13"] simulates real mobile viewport and touch.' },
          { icon: '🔀', label: 'Parallel', desc: 'Workers run tests simultaneously across multiple browsers.' },
        ],
      },
      playwrightArchitectureFilm,
      playwrightIntroPractice,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta "auto-wait" ne anlama gelir?', en: 'What does "auto-wait" mean in Playwright?' },
        options: [
          { id: 'a', text: 'Only waits while the page loads' },
          { id: 'b', text: 'Automatically waits before each action until the element is ready' },
          { id: 'c', text: 'Waits a fixed time like Thread.sleep()' },
          { id: 'd', text: 'Only waits for network requests' },
        ],
        correct: 'b',
        explanation: { tr: 'Auto-wait: her aksiyondan önce Playwright elementi otomatik bekler.', en: 'Auto-wait means Playwright automatically waits for elements to be visible, enabled and stable before every action like click() or fill().' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta bir element ile etkileşime girmeden önce otomatik olarak yapılan kontrollerden biri değildir?",
            "en": "Which of the following is NOT one of the checks automatically performed by Playwright before interacting with an element?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Elementin görünür olması",
                        "en": "Visibility of the element"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Elementin tıklanabilir olması",
                        "en": "Clickability of the element"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Elementin sabit (hareketsiz) olması",
                        "en": "Stability of the element"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Elementin arka plan renginin değişmesi",
                        "en": "Change in element background color"
                  }
            }
      ],
      "correct": "d",
      "explanation": {
            "tr": "Playwright, aksiyon öncesi elementin görünürlüğünü, tıklanabilirliğini ve kararlılığını (stabilite) kontrol eder, ancak CSS özellikleri (renk değişimi gibi) test edilmez.",
            "en": "Playwright checks visibility, clickability, and stability before actions, but does not perform checks on CSS properties like background color changes."
      }
}
},
    ],
  },
}

const s1 = {
  tr: {
    title: '⚙️ Kurulum — TypeScript · Java · Python',
    blocks: [
      {
        type: 'simple-box', emoji: '🏗️',
        content: 'Playwright kurulumu, araç setinin içine hangi adaptörlerin dahil olduğunu önceden belirleyen bir sanayi sertifikasyon paketi gibi çalışır: npm init playwright@latest tek komutla Chromium, Firefox ve WebKit motorlarını, TypeScript derleyicisini ve test runner\'ı aynı anda indirir. Peki Selenium\'da bu neden bu kadar basit değildi? Selenium\'da her tarayıcı için ayrı driver (ChromeDriver, GeckoDriver, SafariDriver) indirmek, sürüm uyumsuzluklarını elle yönetmek ve TestNG/JUnit entegrasyonunu ayrıca kurmak gerekiyordu — Java dünyasında Maven pom.xml\'e bağımlılık eklediğinde bile tarayıcı driver\'larını sisteme elle sağlaman gerekiyordu. Playwright, browser binary\'lerini kendi yönettiği ~/.cache/ms-playwright dizinine yerleştirir, sürüm çakışması olmaz. QA için bunun anlamı şudur: yeni bir CI/CD runner\'a kurulum yapılırken "hangi ChromeDriver sürümünü indireyim, Chrome 117 mi 118 mi?" kaosuna girilmez — pipeline scriptine tek komut yazılır ve her zaman doğru versiyon gelir.',
      },
      { type: 'heading', text: '1️⃣ TypeScript / JavaScript Kurulumu' },
      {
        type: 'callout', color: 'blue', emoji: '📋',
        title: 'Ön Koşul',
        content: 'Node.js 18+ yüklü olmalı. Kontrol: node --version',
      },
      {
        type: 'installation',
        title: { tr: 'TypeScript — Otomatik Kurulum (Önerilen)', en: 'TypeScript — Auto Setup (Recommended)' },
        steps: [
          { cmd: 'npm init playwright@latest', explanation: { tr: 'Playwright installer başlar. Dil (TS/JS), klasör adı, CI kurulumu sorar. HEPSİNE ENTER basabilirsin — varsayılanlar zaten doğru.', en: 'Starts the Playwright installer. Asks language (TS/JS), folder name, CI setup. Press ENTER for all — defaults are correct.' } },
          { cmd: 'npx playwright test', explanation: { tr: 'Örnek testleri çalıştırır. 3 tarayıcıda toplam 6 test — hepsi PASS olmalı.', en: 'Runs the example tests. 6 tests across 3 browsers — all should PASS.' } },
          { cmd: 'npx playwright show-report', explanation: { tr: 'HTML raporunu tarayıcıda açar. Geçen/kalan testler, ekran görüntüleri, video.', en: 'Opens the HTML report in the browser. Passed/failed tests, screenshots, video.' } },
        ],
      },
      {
        type: 'file-tree',
        title: { tr: 'Oluşturulan Proje Yapısı', en: 'Generated Project Structure' },
        tree: `my-project/
├── tests/
│   └── example.spec.ts      ← Örnek test dosyası
├── tests-examples/
│   └── demo-todo-app.spec.ts
├── playwright.config.ts     ← Tarayıcı, timeout, baseURL ayarları
├── package.json
└── node_modules/`,
        note: { tr: 'playwright.config.ts en önemli dosya — baseURL, retries, workers burada ayarlanır.', en: 'playwright.config.ts is the key file — baseURL, retries, workers are configured here.' },
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// playwright.config.ts — temel ayarlar
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          // test dosyaları nerede
  timeout: 30_000,             // her test için max 30 saniye
  retries: 1,                  // başarısız olunca 1 kez tekrar dene
  workers: 4,                  // aynı anda kaç test çalışsın
  reporter: 'html',            // HTML rapor oluştur

  use: {
    baseURL: 'https://example.com',   // tüm page.goto('/login') buna eklenir
    headless: true,                    // tarayıcı penceresi açılmasın
    screenshot: 'only-on-failure',    // sadece hata olunca screenshot al
    video: 'retain-on-failure',       // sadece hata olunca video kaydet
    trace: 'on-first-retry',          // hata ayıklama için trace
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],
});`,
      },
      { type: 'heading', text: '2️⃣ Java (Maven) Kurulumu' },
      {
        type: 'callout', color: 'orange', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Selenium\'da pom.xml\'e selenium-java dependency ekliyordun. Playwright\'ta da aynı — sadece groupId "com.microsoft.playwright" oluyor. TestNG veya JUnit kullanmaya devam edebilirsin.',
      },
      {
        type: 'code', language: 'xml',
        code: `<!-- pom.xml — Maven bağımlılıkları -->
<dependencies>
  <!-- Playwright Java API -->
  <dependency>
    <groupId>com.microsoft.playwright</groupId>
    <artifactId>playwright</artifactId>
    <version>1.45.0</version>  <!-- en güncel sürüm için mvnrepository.com -->
  </dependency>

  <!-- JUnit 5 (isteğe bağlı ama önerilir) -->
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
  </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>3.1.2</version>
    </plugin>
  </plugins>
</build>`,
      },
      {
        type: 'installation',
        title: { tr: 'Java — Tarayıcıları İndir', en: 'Java — Download Browsers' },
        steps: [
          { cmd: 'mvn dependency:resolve', explanation: { tr: 'Maven bağımlılıkları indirir. İlk seferinde birkaç dakika sürebilir.', en: 'Maven downloads dependencies. May take a few minutes on first run.' } },
          { cmd: 'mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"', explanation: { tr: 'Playwright tarayıcılarını indirir (Chromium, Firefox, WebKit). Sadece 1 kez çalıştırman yeterli.', en: 'Downloads Playwright browsers (Chromium, Firefox, WebKit). Only needs to run once.' } },
        ],
      },
      {
        type: 'code', language: 'Java',
        code: `// İlk Java Playwright testi — HelloPlaywright.java
import com.microsoft.playwright.*;

public class HelloPlaywright {
    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create()) {          // Playwright başlat
            Browser browser = playwright.chromium().launch();        // Chrome aç
            Page page = browser.newPage();                           // Yeni sayfa
            page.navigate("https://playwright.dev");                 // URL'ye git
            System.out.println(page.title());                        // Sayfa başlığını yazdır
            browser.close();                                         // Tarayıcıyı kapat
        }
        // try-with-resources: Java'daki AutoCloseable gibi — otomatik kapatır
    }
}`,
      },
      { type: 'heading', text: '3️⃣ Python Kurulumu' },
      {
        type: 'installation',
        title: { tr: 'Python — pip ile Kurulum', en: 'Python — Install with pip' },
        steps: [
          { cmd: 'pip install playwright', explanation: { tr: 'Playwright Python kütüphanesini yükler. Java\'da pom.xml, Python\'da pip — aynı mantık.', en: 'Installs the Playwright Python library. In Java it\'s pom.xml, in Python it\'s pip — same concept.' } },
          { cmd: 'playwright install', explanation: { tr: 'Tarayıcıları indirir. Bu adımı atlama! Tarayıcısız Playwright çalışmaz.', en: 'Downloads the browsers. Don\'t skip this! Playwright won\'t work without browsers.' } },
          { cmd: 'playwright install --with-deps', explanation: { tr: 'Linux\'ta sistem bağımlılıklarını da yükler. CI/CD ortamlarında zorunlu.', en: 'Also installs system dependencies on Linux. Required in CI/CD environments.' } },
          { cmd: 'python -m pytest --version', explanation: { tr: 'pytest kurulu olduğunu doğrula. Yoksa: pip install pytest pytest-playwright', en: 'Verify pytest is installed. If not: pip install pytest pytest-playwright' } },
        ],
      },
      {
        type: 'code', language: 'Python',
        code: `# İlk Python Playwright testi — test_hello.py
from playwright.sync_api import sync_playwright   # sync API import et

def test_playwright_hello():
    with sync_playwright() as p:                   # context manager — Java'daki try-with-resources
        browser = p.chromium.launch()              # Chrome aç (headless varsayılan)
        page = browser.new_page()                  # yeni sayfa oluştur
        page.goto("https://playwright.dev")        # URL'ye git
        assert "Playwright" in page.title()        # başlıkta "Playwright" var mı
        browser.close()                            # tarayıcıyı kapat

# pytest ile çalıştır:
# pytest test_hello.py -v`,
      },
      {
        type: 'code', language: 'Python',
        code: `# pytest-playwright ile daha kısa versiyon — fixture kullanır
import pytest
from playwright.sync_api import Page, expect

def test_playwright_hello(page: Page):   # 'page' fixture — pytest-playwright sağlar
    page.goto("https://playwright.dev")  # URL'ye git
    expect(page).to_have_title("Fast and reliable end-to-end testing for modern web apps | Playwright")
    # NOT: pytest-playwright otomatik browser aç/kapat yapar — sen sadece test yaz`,
      },
      {
        type: 'table',
        headers: ['Komut / Kavram', 'Java', 'TypeScript', 'Python'],
        rows: [
          ['Import', 'import com.microsoft.playwright.*', 'import { chromium } from "playwright"', 'from playwright.sync_api import sync_playwright'],
          ['Playwright başlat', 'Playwright.create()', 'chromium.launch()', 'p.chromium.launch()'],
          ['Yeni sayfa', 'browser.newPage()', 'await browser.newPage()', 'browser.new_page()'],
          ['URL\'ye git', 'page.navigate("url")', 'await page.goto("url")', 'page.goto("url")'],
          ['Click', 'page.locator("sel").click()', 'await page.locator("sel").click()', 'page.locator("sel").click()'],
          ['Metin yaz', 'page.locator("sel").fill("text")', 'await page.locator("sel").fill("text")', 'page.locator("sel").fill("text")'],
          ['Kapat', 'browser.close()', 'await browser.close()', 'browser.close()'],
          ['Async?', 'HAYIR — sync', 'EVET — async/await zorunlu', 'HAYIR — sync_api ile sync'],
        ],
      },
      playwrightBinarySyncFilm,
      {
        type: 'quiz',
        question: { tr: 'Python\'da Playwright\'ı yükledikten sonra tarayıcıları indirmek için hangi komut kullanılır?', en: 'After installing Playwright in Python, which command downloads the browsers?' },
        options: [
          { id: 'a', text: 'pip install browsers' },
          { id: 'b', text: 'playwright install' },
          { id: 'c', text: 'npm install chromium' },
          { id: 'd', text: 'python download_browsers.py' },
        ],
        correct: 'b',
        explanation: { tr: '"playwright install" komutu Chromium, Firefox ve WebKit tarayıcılarını sisteme indirir. Bu adımı atlarsan "Browser is not installed" hatası alırsın.', en: '"playwright install" downloads Chromium, Firefox, and WebKit to your system. Skip this and you\'ll get "Browser is not installed" errors.' },
      
        retryQuestion: {
      "question": {
            "tr": "Terminal üzerinde 'playwright install' komutunu çalıştırmazsak ne olur?",
            "en": "What happens if we do not run the 'playwright install' command in the terminal?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Kütüphane Python içine kurulmaz",
                        "en": "The library will not be installed into Python"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Tarayıcı motorları eksik olduğu için testler başarısız olur",
                        "en": "Tests will fail because browser engines are missing"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Sadece Chromium tarayıcısı çalışmaz",
                        "en": "Only the Chromium browser will not work"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Kod editörü Playwright komutlarını tanımaz",
                        "en": "The code editor will not recognize Playwright commands"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Playwright'ı 'pip install' ile kursanız bile, tarayıcıların çalışabilmesi için 'playwright install' komutuyla gerekli olan Chromium, Firefox ve WebKit binary dosyalarının yerel dizine indirilmesi gerekir.",
            "en": "Even if you install the Playwright package with 'pip', you must run 'playwright install' to download the necessary binary files for Chromium, Firefox, and WebKit for the tests to execute."
      }
}
},
    ],
  },
  en: {
    title: '⚙️ Installation — TypeScript · Java · Python',
    blocks: [
      {
        type: 'simple-box', emoji: '🏗️',
        content: 'Playwright\'s installation works like an industry-certified toolbox kit that already knows which adapters you need: npm init playwright@latest downloads Chromium, Firefox, and WebKit engines, the TypeScript compiler, and the test runner all in a single command. But why wasn\'t Selenium this straightforward? With Selenium, you had to download a separate driver for each browser (ChromeDriver, GeckoDriver, SafariDriver), manually manage version compatibility, and separately configure your test runner — even after adding the Maven dependency in Java, you still had to provision browser drivers on the system yourself. Playwright manages its browser binaries in its own ~/.cache/ms-playwright directory, so there are no version conflicts. For QA engineers this matters most during CI/CD setup: instead of asking "which ChromeDriver do I download — is it Chrome 117 or 118?" on a fresh runner, you write one command in the pipeline script and the correct version always arrives.',
      },
      { type: 'heading', text: '1️⃣ TypeScript / JavaScript Setup' },
      {
        type: 'callout', color: 'blue', emoji: '📋',
        title: 'Prerequisite',
        content: 'Node.js 18+ must be installed. Check: node --version',
      },
      {
        type: 'installation',
        title: { tr: 'TypeScript — Otomatik Kurulum (Önerilen)', en: 'TypeScript — Auto Setup (Recommended)' },
        steps: [
          { cmd: 'npm init playwright@latest', explanation: { tr: 'Playwright installer başlar.', en: 'Starts the Playwright installer. Asks language (TS/JS), folder name, CI setup. Press ENTER for all — defaults are correct.' } },
          { cmd: 'npx playwright test', explanation: { tr: 'Örnek testleri çalıştırır.', en: 'Runs the example tests. 6 tests across 3 browsers — all should PASS.' } },
          { cmd: 'npx playwright show-report', explanation: { tr: 'HTML raporunu açar.', en: 'Opens the HTML report in the browser.' } },
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// playwright.config.ts — basic setup
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          // where test files live
  timeout: 30_000,             // max 30 seconds per test
  retries: 1,                  // retry once on failure
  workers: 4,                  // how many tests run simultaneously
  reporter: 'html',            // generate HTML report

  use: {
    baseURL: 'https://example.com',   // page.goto('/login') resolves against this
    headless: true,                    // no browser window
    screenshot: 'only-on-failure',    // screenshot only on failure
    video: 'retain-on-failure',       // video only on failure
    trace: 'on-first-retry',          // trace for debugging
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],
});`,
      },
      { type: 'heading', text: '2️⃣ Java (Maven) Setup' },
      {
        type: 'callout', color: 'orange', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In Selenium you added selenium-java to pom.xml. Same here — the groupId is "com.microsoft.playwright". You can keep using TestNG or JUnit.',
      },
      {
        type: 'code', language: 'Java',
        code: `// First Java Playwright test
import com.microsoft.playwright.*;

public class HelloPlaywright {
    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create()) {   // start Playwright
            Browser browser = playwright.chromium().launch(); // open Chrome
            Page page = browser.newPage();                    // new tab
            page.navigate("https://playwright.dev");          // go to URL
            System.out.println(page.title());                 // print page title
            browser.close();                                  // close browser
        }
        // try-with-resources: like AutoCloseable in Java — auto-closes
    }
}`,
      },
      { type: 'heading', text: '3️⃣ Python Setup' },
      {
        type: 'installation',
        title: { tr: 'Python — pip ile Kurulum', en: 'Python — Install with pip' },
        steps: [
          { cmd: 'pip install playwright', explanation: { tr: 'Playwright Python kütüphanesini yükler.', en: 'Installs the Playwright Python library.' } },
          { cmd: 'playwright install', explanation: { tr: 'Tarayıcıları indirir.', en: 'Downloads the browsers. Don\'t skip this!' } },
          { cmd: 'playwright install --with-deps', explanation: { tr: 'Linux sistem bağımlılıkları.', en: 'Also installs system dependencies on Linux. Required in CI/CD.' } },
        ],
      },
      {
        type: 'code', language: 'Python',
        code: `# First Python Playwright test — test_hello.py
from playwright.sync_api import Page, expect

def test_playwright_hello(page: Page):   # 'page' fixture from pytest-playwright
    page.goto("https://playwright.dev")  # go to URL
    expect(page).to_have_title("Fast and reliable end-to-end testing for modern web apps | Playwright")
    # pytest-playwright handles browser open/close automatically`,
      },
      {
        type: 'table',
        headers: ['Command / Concept', 'Java', 'TypeScript', 'Python'],
        rows: [
          ['Import', 'import com.microsoft.playwright.*', 'import { chromium } from "playwright"', 'from playwright.sync_api import sync_playwright'],
          ['Launch browser', 'Playwright.create()', 'chromium.launch()', 'p.chromium.launch()'],
          ['New page', 'browser.newPage()', 'await browser.newPage()', 'browser.new_page()'],
          ['Navigate', 'page.navigate("url")', 'await page.goto("url")', 'page.goto("url")'],
          ['Click', 'page.locator("sel").click()', 'await page.locator("sel").click()', 'page.locator("sel").click()'],
          ['Fill text', 'page.locator("sel").fill("text")', 'await page.locator("sel").fill("text")', 'page.locator("sel").fill("text")'],
          ['Close', 'browser.close()', 'await browser.close()', 'browser.close()'],
          ['Async?', 'NO — sync', 'YES — async/await required', 'NO — sync_api is sync'],
        ],
      },
      playwrightBinarySyncFilm,
      {
        type: 'quiz',
        question: { tr: 'Python\'da Playwright\'ı yükledikten sonra tarayıcıları indirmek için hangi komut kullanılır?', en: 'After installing Playwright in Python, which command downloads the browsers?' },
        options: [
          { id: 'a', text: 'pip install browsers' },
          { id: 'b', text: 'playwright install' },
          { id: 'c', text: 'npm install chromium' },
          { id: 'd', text: 'python download_browsers.py' },
        ],
        correct: 'b',
        explanation: { tr: '"playwright install" Chromium, Firefox ve WebKit indirir.', en: '"playwright install" downloads Chromium, Firefox, and WebKit browsers to your system.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Playwright kurulumundan sonra tarayıcı ikili dosyalarını (binaries) sisteme eklemek için kullanılan CLI komutu hangisidir?",
            "en": "Which CLI command is used to add the browser binaries to your system after installing Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "playwright setup"
            },
            {
                  "id": "b",
                  "text": "playwright install"
            },
            {
                  "id": "c",
                  "text": "pip setup-browsers"
            },
            {
                  "id": "d",
                  "text": "playwright download"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Playwright kütüphanesi yüklendikten sonra 'playwright install' komutu, testlerin çalışması için gerekli olan tarayıcı sürücülerini (Chromium, Firefox, WebKit) varsayılan konumlara indirir.",
            "en": "After the Playwright library is installed, the 'playwright install' command downloads the necessary browser binaries (Chromium, Firefox, WebKit) required for tests to run."
      }
}
},
    ],
  },
}

// Placeholder sections — sonraki adımlarda doldurulacak
const s2 = {
  tr: {
    title: '🖱️ Temel Aksiyonlar — Selenium ile Karşılaştırma',
    blocks: [
      {
        type: 'simple-box', emoji: '🕹️',
        content: 'Playwright aksiyonları, bir GPS navigasyon sisteminin "dörtlü onay katmanı" gibi çalışır: adres girilir, sistem rotayı hesaplar, aracın ilerleyip ilerlemediğini kontrol eder ve hedefe ulaşılınca seni uyarır — her adımda bekleme ve doğrulama otomatiktir. Peki Selenium\'da neden bu kadar çok bekleme kodu yazmak gerekiyordu? Selenium, bir taksimetre gibi sadece komutu iletir ve sonucu beklemez; element DOM\'a girmiş ama henüz etkileşilebilir değilse "element not interactable" hatası alırsın ve tüm sorumluluğu sana bırakır. Java\'da driver.findElement(By.id("btn")).click() yazdığında, element DOM\'da var ama görünmüyor veya disabled ise test çöker; Playwright\'ta page.locator("#btn").click() yazarsın ve Playwright element hem görünene hem enabled olana hem de stable konuma gelene kadar kendi kendine bekler. QA gerçeği şu: SPA (Single Page Application) testlerinde bir butona tıkladıktan sonra API yanıtı beklenmeden başka bir aksiyona geçilince "yarış koşulları" (race condition) oluşur ve test bazen geçer bazen geçmez; Playwright\'ın built-in actionability kontrolleri bu belirsizliği ortadan kaldırır.',
      },
      { type: 'heading', text: 'Tüm Aksiyonlar — 3 Dil Karşılaştırması' },
      {
        type: 'table',
        headers: ['Aksiyon', 'Selenium (Java)', 'Playwright Java', 'Playwright TypeScript', 'Playwright Python'],
        rows: [
          ['Tıklama', 'driver.findElement(By.id("x")).click()', 'page.locator("#x").click()', 'await page.locator("#x").click()', 'page.locator("#x").click()'],
          ['Metin yazma', 'element.sendKeys("text")', 'page.locator("#x").fill("text")', 'await page.locator("#x").fill("text")', 'page.locator("#x").fill("text")'],
          ['Temizle+yaz', 'element.clear(); element.sendKeys("t")', 'page.locator("#x").fill("t") ← clear dahil', 'await page.locator("#x").fill("t")', 'page.locator("#x").fill("t")'],
          ['URL\'ye git', 'driver.get("url")', 'page.navigate("url")', 'await page.goto("url")', 'page.goto("url")'],
          ['Geri git', 'driver.navigate().back()', 'page.goBack()', 'await page.goBack()', 'page.go_back()'],
          ['Yenile', 'driver.navigate().refresh()', 'page.reload()', 'await page.reload()', 'page.reload()'],
          ['Metin al', 'element.getText()', 'page.locator("#x").innerText()', 'await page.locator("#x").innerText()', 'page.locator("#x").inner_text()'],
          ['Attribute al', 'element.getAttribute("href")', 'page.locator("#x").getAttribute("href")', 'await page.locator("#x").getAttribute("href")', 'page.locator("#x").get_attribute("href")'],
          ['Hover', 'new Actions(driver).moveToElement(el).perform()', 'page.locator("#x").hover()', 'await page.locator("#x").hover()', 'page.locator("#x").hover()'],
          ['Çift tıklama', 'new Actions(driver).doubleClick(el).perform()', 'page.locator("#x").dblclick()', 'await page.locator("#x").dblclick()', 'page.locator("#x").dblclick()'],
          ['Sağ tıklama', 'new Actions(driver).contextClick(el).perform()', 'page.locator("#x").click({button:"right"})', 'await page.locator("#x").click({button:"right"})', 'page.locator("#x").click(button="right")'],
          ['Tuşa bas', 'element.sendKeys(Keys.ENTER)', 'page.locator("#x").press("Enter")', 'await page.locator("#x").press("Enter")', 'page.locator("#x").press("Enter")'],
          ['Checkbox seç', 'if(!el.isSelected()) el.click()', 'page.locator("#x").check()', 'await page.locator("#x").check()', 'page.locator("#x").check()'],
          ['Dropdown seç', 'new Select(el).selectByValue("v")', 'page.locator("select").selectOption("v")', 'await page.locator("select").selectOption("v")', 'page.locator("select").select_option("v")'],
          ['Screenshot', 'TakesScreenshot + FileUtils', 'page.screenshot({path:"s.png"})', 'await page.screenshot({path:"s.png"})', 'page.screenshot(path="s.png")'],
          ['Sayfa başlığı', 'driver.getTitle()', 'page.title()', 'await page.title()', 'page.title()'],
          ['Mevcut URL', 'driver.getCurrentUrl()', 'page.url()', 'page.url()', 'page.url'],
          ['Görünür mü?', 'element.isDisplayed()', 'page.locator("#x").isVisible()', 'await page.locator("#x").isVisible()', 'page.locator("#x").is_visible()'],
          ['Aktif mi?', 'element.isEnabled()', 'page.locator("#x").isEnabled()', 'await page.locator("#x").isEnabled()', 'page.locator("#x").is_enabled()'],
          ['JS çalıştır', 'js.executeScript("return...")', 'page.evaluate("return...")', 'await page.evaluate("return...")', 'page.evaluate("return...")'],
          ['Scroll et', 'js.executeScript("window.scrollBy(0,500)")', 'page.locator("#x").scrollIntoViewIfNeeded()', 'await page.locator("#x").scrollIntoViewIfNeeded()', 'page.locator("#x").scroll_into_view_if_needed()'],
          ['Drag & Drop', 'Actions.dragAndDrop(src,dst).perform()', 'page.locator("#src").dragTo(page.locator("#dst"))', 'await page.locator("#src").dragTo(page.locator("#dst"))', 'page.locator("#src").drag_to(page.locator("#dst"))'],
        ],
      },
      { type: 'heading', text: 'Detaylı Kod Örnekleri' },
      {
        type: 'code', language: 'TypeScript',
        code: `// test_basic_actions.spec.ts — Temel aksiyonlar
import { test, expect } from '@playwright/test';

test('temel aksiyon örnekleri', async ({ page }) => {
  await page.goto('https://automationexercise.com/login'); // URL'ye git

  // --- FILL (sendKeys'in Playwright karşılığı) ---
  await page.locator('#email').fill('test@example.com');   // email yaz
  await page.locator('#password').fill('secretpass');       // şifre yaz
  await page.locator('[data-qa="login-button"]').click();  // giriş yap

  // --- METİN OKUMA ---
  const welcomeText = await page.locator('.logged-in').innerText(); // metin al
  console.log(welcomeText);                                // ekrana yazdır

  // --- HOVER ---
  await page.locator('#header .nav-link').hover();         // menüye hover

  // --- DROPDOWN ---
  await page.locator('#sort-by').selectOption('price-asc'); // dropdown seç

  // --- CHECKBOX ---
  await page.locator('#newsletter').check();               // checkbox işaretle
  await page.locator('#newsletter').uncheck();             // işareti kaldır

  // --- SCREENSHOT ---
  await page.screenshot({ path: 'evidence.png', fullPage: true }); // screenshot

  // --- ASSERTION ---
  await expect(page).toHaveURL(/dashboard/);              // URL doğrula
  await expect(page.locator('h1')).toHaveText('Welcome'); // metin doğrula
});`,
      },
      {
        type: 'code', language: 'Java',
        code: `// BasicActionsTest.java — Java Playwright
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.SelectOption;
import org.junit.jupiter.api.*;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class BasicActionsTest {
    static Playwright playwright;
    static Browser browser;
    Page page;

    @BeforeAll
    static void launchBrowser() {
        playwright = Playwright.create();                    // Playwright başlat
        browser = playwright.chromium().launch(             // Chrome aç
            new BrowserType.LaunchOptions().setHeadless(false)
        );
    }

    @BeforeEach
    void createPage() {
        page = browser.newPage();                           // her test için yeni sayfa
    }

    @Test
    void testBasicActions() {
        page.navigate("https://automationexercise.com/login"); // URL'ye git

        // FILL — Selenium'daki sendKeys
        page.locator("#email").fill("test@example.com");    // email yaz
        page.locator("#password").fill("secretpass");       // şifre yaz
        page.locator("[data-qa='login-button']").click();   // butona tıkla

        // METİN OKUMA
        String welcome = page.locator(".logged-in").innerText(); // metin al
        System.out.println(welcome);

        // ASSERTION
        assertThat(page).hasURL(Pattern.compile("dashboard")); // URL doğrula
        assertThat(page.locator("h1")).hasText("Welcome");     // metin doğrula

        // SCREENSHOT
        page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("evidence.png")));
    }

    @AfterEach
    void closePage() { page.close(); }                     // sayfayı kapat

    @AfterAll
    static void closeBrowser() {
        browser.close();                                    // tarayıcıyı kapat
        playwright.close();                                 // Playwright'ı kapat
    }
}`,
      },
      {
        type: 'code', language: 'Python',
        code: `# test_basic_actions.py — Python Playwright
import pytest
from playwright.sync_api import Page, expect

def test_basic_actions(page: Page):
    page.goto("https://automationexercise.com/login")   # URL'ye git

    # FILL — Python'da sendKeys yok, fill() kullan
    page.locator("#email").fill("test@example.com")     # email yaz
    page.locator("#password").fill("secretpass")        # şifre yaz
    page.locator("[data-qa='login-button']").click()    # tıkla

    # METİN OKUMA
    welcome = page.locator(".logged-in").inner_text()   # Python'da snake_case
    print(welcome)

    # HOVER
    page.locator("#header .nav-link").hover()           # hover

    # DROPDOWN
    page.locator("#sort-by").select_option("price-asc") # dropdown seç (snake_case!)

    # KEYBOARD
    page.locator("#search").press("Enter")             # Enter tuşuna bas

    # ASSERTION
    expect(page).to_have_url(re.compile("dashboard"))  # URL kontrol
    expect(page.locator("h1")).to_have_text("Welcome") # metin kontrol

    # SCREENSHOT
    page.screenshot(path="evidence.png", full_page=True)`,
      },
      {
        type: 'callout', color: 'green', emoji: '💡',
        title: 'Önemli Fark: fill() vs type()',
        content: 'fill() — Önce alanı temizler, sonra yazar. Selenium\'daki clear() + sendKeys() kombinasyonu. type() — Temizlemez, karakterleri tek tek yazar (klavyede gerçekten yazmak gibi). Çoğu durumda fill() kullanın.',
      },
      playwrightActionabilityFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir input alanını önce temizleyip sonra metin yazmak için hangi metod kullanılır?', en: 'Which method in Playwright clears an input field and then types text?' },
        options: [
          { id: 'a', text: 'sendKeys("text")' },
          { id: 'b', text: 'clear() + type("text")' },
          { id: 'c', text: 'fill("text")' },
          { id: 'd', text: 'setValue("text")' },
        ],
        correct: 'c',
        explanation: { tr: 'fill() Selenium\'daki clear() + sendKeys() kombinasyonunun karşılığıdır. Önce alanı temizler, sonra metni yazar. type() ise temizlemeden sadece yazar.', en: 'fill() is the equivalent of Selenium\'s clear() + sendKeys() combination. It clears the field first, then types the text. type() types without clearing.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Playwright'ta bir web formundaki metin kutusunun mevcut içeriğini tamamen silip yeni bir değer yazmak için en güvenli metod hangisidir?",
            "en": "Which method is the most reliable way in Playwright to completely clear the existing content of a text box in a web form and enter a new value?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "type()"
            },
            {
                  "id": "b",
                  "text": "clear_and_type()"
            },
            {
                  "id": "c",
                  "text": "fill()"
            },
            {
                  "id": "d",
                  "text": "press_sequentially()"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "fill() metodu, ilgili elementin içeriğini otomatik olarak temizler ve ardından yeni veriyi girer; bu işlem, type() metoduna göre daha atomik ve güvenilirdir.",
            "en": "The fill() method automatically clears the content of the element before entering the new data; this operation is more atomic and reliable than using the type() method."
      }
}
},
    ],
  },
  en: {
    title: '🖱️ Basic Actions — Selenium Comparison',
    blocks: [
      {
        type: 'simple-box', emoji: '🕹️',
        content: 'Playwright actions work like a GPS navigation system\'s four-layer confirmation protocol: you enter a destination, the system calculates the route, confirms the vehicle is moving, and alerts you on arrival — every step involves automatic waiting and verification. So why did Selenium require so much manual waiting code? Selenium works like a taxi meter: it simply relays the command and doesn\'t wait for an outcome; if the element has entered the DOM but isn\'t yet interactable, you get "element not interactable" and all responsibility falls on you. In Java, driver.findElement(By.id("btn")).click() crashes if the element exists in the DOM but is hidden or disabled; with Playwright, page.locator("#btn").click() waits on its own until the element is visible, enabled, and in a stable position. The QA reality: in Single Page Application tests, moving to the next action before an API response arrives creates race conditions — the test passes sometimes and fails others. Playwright\'s built-in actionability checks eliminate that uncertainty.',
      },
      { type: 'heading', text: 'All Actions — 3-Language Comparison' },
      {
        type: 'table',
        headers: ['Action', 'Selenium (Java)', 'Playwright Java', 'Playwright TypeScript', 'Playwright Python'],
        rows: [
          ['Click', 'driver.findElement(By.id("x")).click()', 'page.locator("#x").click()', 'await page.locator("#x").click()', 'page.locator("#x").click()'],
          ['Type text', 'element.sendKeys("text")', 'page.locator("#x").fill("text")', 'await page.locator("#x").fill("text")', 'page.locator("#x").fill("text")'],
          ['Navigate', 'driver.get("url")', 'page.navigate("url")', 'await page.goto("url")', 'page.goto("url")'],
          ['Get text', 'element.getText()', 'page.locator("#x").innerText()', 'await page.locator("#x").innerText()', 'page.locator("#x").inner_text()'],
          ['Get attribute', 'element.getAttribute("href")', 'page.locator("#x").getAttribute("href")', 'await page.locator("#x").getAttribute("href")', 'page.locator("#x").get_attribute("href")'],
          ['Hover', 'new Actions(driver).moveToElement(el).perform()', 'page.locator("#x").hover()', 'await page.locator("#x").hover()', 'page.locator("#x").hover()'],
          ['Double click', 'new Actions(driver).doubleClick(el).perform()', 'page.locator("#x").dblclick()', 'await page.locator("#x").dblclick()', 'page.locator("#x").dblclick()'],
          ['Checkbox', 'if(!el.isSelected()) el.click()', 'page.locator("#x").check()', 'await page.locator("#x").check()', 'page.locator("#x").check()'],
          ['Dropdown', 'new Select(el).selectByValue("v")', 'page.locator("select").selectOption("v")', 'await page.locator("select").selectOption("v")', 'page.locator("select").select_option("v")'],
          ['Screenshot', 'TakesScreenshot + FileUtils', 'page.screenshot({path:"s.png"})', 'await page.screenshot({path:"s.png"})', 'page.screenshot(path="s.png")'],
          ['Drag & Drop', 'Actions.dragAndDrop().perform()', 'page.locator("#src").dragTo(dst)', 'await page.locator("#src").dragTo(dst)', 'page.locator("#src").drag_to(dst)'],
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// test_basic_actions.spec.ts
import { test, expect } from '@playwright/test';

test('basic actions example', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');

  await page.locator('#email').fill('test@example.com');    // fill = clear + type
  await page.locator('#password').fill('secretpass');
  await page.locator('[data-qa="login-button"]').click();

  const welcomeText = await page.locator('.logged-in').innerText();
  console.log(welcomeText);

  await page.locator('#sort-by').selectOption('price-asc'); // dropdown
  await page.locator('#newsletter').check();                 // checkbox

  await page.screenshot({ path: 'evidence.png', fullPage: true });

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h1')).toHaveText('Welcome');
});`,
      },
      {
        type: 'code', language: 'Python',
        code: `# test_basic_actions.py
from playwright.sync_api import Page, expect
import re

def test_basic_actions(page: Page):
    page.goto("https://automationexercise.com/login")

    page.locator("#email").fill("test@example.com")      # fill = clear + type
    page.locator("#password").fill("secretpass")
    page.locator("[data-qa='login-button']").click()

    welcome = page.locator(".logged-in").inner_text()    # snake_case in Python
    page.locator("#sort-by").select_option("price-asc")  # snake_case!
    page.locator("#newsletter").check()
    page.screenshot(path="evidence.png", full_page=True)

    expect(page).to_have_url(re.compile("dashboard"))
    expect(page.locator("h1")).to_have_text("Welcome")`,
      },
      playwrightActionabilityFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir input alanını önce temizleyip sonra metin yazmak için hangi metod kullanılır?', en: 'Which method in Playwright clears an input field and then types text?' },
        options: [
          { id: 'a', text: 'sendKeys("text")' },
          { id: 'b', text: 'clear() + type("text")' },
          { id: 'c', text: 'fill("text")' },
          { id: 'd', text: 'setValue("text")' },
        ],
        correct: 'c',
        explanation: { tr: 'fill() clear() + sendKeys() kombinasyonunun karşılığıdır.', en: 'fill() is the equivalent of Selenium\'s clear() + sendKeys(). It clears the field first, then types the text.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Bir kullanıcı adı alanına veri girişi yaparken, eski metinleri temizleyip yeni metni eklemek için Playwright hangi metodun kullanılmasını önerir?",
            "en": "When entering data into a username field, which method does Playwright recommend to clear old text and insert the new text?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "write()"
            },
            {
                  "id": "b",
                  "text": "insert()"
            },
            {
                  "id": "c",
                  "text": "fill()"
            },
            {
                  "id": "d",
                  "text": "replace()"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "fill() metodu, bir input veya textarea alanındaki mevcut tüm metni sildiği için, form doldurma senaryolarında en çok tercih edilen metoddur.",
            "en": "Since the fill() method clears all existing text in an input or textarea field, it is the most preferred method for form-filling scenarios."
      }
}
},
    ],
  },
}
const s3 = {
  tr: {
    title: '🎯 Locator Stratejileri',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: 'Locator, sayfadaki bir elementi tarif etmenin yöntemidir — ama sıradan bir adres değil, kütüphane kataloğundaki ISBN numarası gibi: kitabın kapağı değişse, rafı değişse, hatta kütüphane taşınsa bile ISBN aynı kitabı bulur çünkü içeriğe değil, kimliğe atıfta bulunur. Peki XPath veya CSS selector varken neden role/text/testid önerilir? XPath ve CSS selector, görsel konuma veya DOM hiyerarşisine bağlıdır — geliştirici bir div\'i span ile değiştirirse veya bir wrapper katmanı eklerse locator bozulur ve test production\'daki gerçek kullanıcı davranışını değil, markup detaylarını test etmiş olur. Java\'da Selenium ile By.xpath("//div[3]/span[2]/input") yazdıysan ve frontend ekibi sayfayı yeniden düzenlediyse, fonksiyonel hiçbir şey değişmemesine rağmen testler kırmızı yandı — bu "brittle test" sorunudur. Playwright\'ın getByRole("button", {name:"Satın Al"}) stratejisi ise ekran okuyucunun gördüğü arayüzü hedefler: hem engelliler için erişilebilirlik testini otomatik kapsar hem de DOM değişikliklerine karşı doğal dayanıklılık sağlar. QA gerçeği: data-testid atributları eksikse geliştirici ekibiyle konuşarak test edilebilirliği (testability) tasarım aşamasında planlamak, test sürdürülebilirliğini en ucuz adımda çözmenin yoludur.',
      },
      LOCATOR_EXPLORER_BLOCK,
      { type: 'heading', text: 'Locator Türleri — Selenium vs Playwright' },
      {
        type: 'table',
        headers: ['Strateji', 'Selenium Java', 'Playwright (3 dil)'],
        rows: [
          ['ID', 'By.id("login")', '#login veya page.locator("#login")'],
          ['CSS', 'By.cssSelector(".btn-primary")', 'page.locator(".btn-primary")'],
          ['XPath', 'By.xpath("//button[@id=\'x\']")', 'page.locator("xpath=//button[@id=\'x\']")'],
          ['Name', 'By.name("username")', 'page.locator("[name=\'username\']")'],
          ['Class', 'By.className("header")', 'page.locator(".header")'],
          ['Text içeriği', 'By.xpath("//*[text()=\'Login\']")', 'page.getByText("Login") ← ÇOK DAHA KOLAY'],
          ['Role (ARIA)', '❌ Yok', 'page.getByRole("button", {name:"Submit"})'],
          ['Placeholder', '❌ Yok', 'page.getByPlaceholder("Email address")'],
          ['Label', '❌ Yok', 'page.getByLabel("Username")'],
          ['data-testid', 'By.cssSelector("[data-testid=\'x\']")', 'page.getByTestId("x") ← EN SAĞLAM'],
          ['Alt text (img)', '❌ Zor', 'page.getByAltText("Logo")'],
          ['Title', '❌ Zor', 'page.getByTitle("Tooltip text")'],
        ],
      },
      { type: 'heading', text: 'Playwright\'a Özgü Locator\'lar (Selenium\'da yok)' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Playwright'ın güçlü locator API'leri
import { test, expect } from '@playwright/test';

test('locator strategies', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // 1. getByRole — ARIA rolüne göre (EN ÖNERİLEN)
  await page.getByRole('button', { name: 'Add to Cart' }).click();   // buton ara
  await page.getByRole('link', { name: 'Home' }).click();             // link ara
  await page.getByRole('textbox', { name: 'Email' }).fill('a@b.com');// input ara
  await page.getByRole('checkbox', { name: 'Newsletter' }).check();   // checkbox ara

  // 2. getByText — metin içeriğine göre
  await page.getByText('Sign In').click();                            // tam metin
  await page.getByText('Product', { exact: false }).first().click(); // kısmi metin

  // 3. getByLabel — label'a bağlı input
  await page.getByLabel('Password').fill('secret123');                // label text

  // 4. getByPlaceholder — placeholder'a göre
  await page.getByPlaceholder('Search products...').fill('shirt');   // placeholder

  // 5. getByTestId — data-testid attribute
  await page.getByTestId('login-button').click();                     // EN SAĞLAM

  // 6. locator filtreleme — birden fazla sonuç varsa daralt
  await page.locator('.product-card')
    .filter({ hasText: 'Blue Shirt' })                                // metin içereni filtrele
    .getByRole('button', { name: 'Buy' })
    .click();

  // 7. nth — index ile seç (dikkatli kullan!)
  await page.locator('.product-card').nth(0).click();                 // ilk kart
  await page.locator('.product-card').last().click();                 // son kart
  await page.locator('.product-card').first().click();                // first()

  // 8. İç içe locator (chaining)
  const loginForm = page.locator('#login-form');                      // form locator
  await loginForm.locator('#email').fill('test@example.com');         // form içinde ara
  await loginForm.locator('#password').fill('pass');

  // 9. has — içinde başka element bulunanı bul
  await page.locator('.product', { has: page.locator('.on-sale') }).first().click();
});`,
      },
      {
        type: 'code', language: 'Java',
        code: `// Java — Playwright locator örnekleri
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;

Page page = browser.newPage();
page.navigate("https://automationexercise.com");

// getByRole — ARIA rol bazlı (EN ÖNERİLEN)
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Add to Cart")).click();
page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Home")).click();
page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Email")).fill("a@b.com");

// getByText — metin bazlı
page.getByText("Sign In").click();                   // tam metin eşleşme

// getByLabel
page.getByLabel("Password").fill("secret123");       // label'a bağlı input

// getByTestId
page.getByTestId("login-button").click();            // data-testid

// locator + filter
page.locator(".product-card")
    .filter(new Locator.FilterOptions().setHasText("Blue Shirt"))
    .getByRole(AriaRole.BUTTON, new Locator.GetByRoleOptions().setName("Buy"))
    .click();

// nth / first / last
page.locator(".product-card").nth(0).click();        // indeks
page.locator(".product-card").first().click();
page.locator(".product-card").last().click();`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — Playwright locator örnekleri
from playwright.sync_api import Page

def test_locators(page: Page):
    page.goto("https://automationexercise.com")

    # getByRole — snake_case API
    page.get_by_role("button", name="Add to Cart").click()
    page.get_by_role("link", name="Home").click()

    # getByText
    page.get_by_text("Sign In").click()

    # getByLabel
    page.get_by_label("Password").fill("secret123")

    # getByPlaceholder
    page.get_by_placeholder("Search products...").fill("shirt")

    # getByTestId
    page.get_by_test_id("login-button").click()

    # filter — Python'da da aynı
    page.locator(".product-card").filter(has_text="Blue Shirt").first().click()

    # nth / first / last
    page.locator(".product-card").nth(0).click()
    page.locator(".product-card").first().click()
    page.locator(".product-card").last().click()`,
      },
      {
        type: 'callout', color: 'green', emoji: '✅',
        title: 'Locator Öncelik Sırası (Playwright Resmi Tavsiyesi)',
        content: '1. getByRole → 2. getByLabel → 3. getByPlaceholder → 4. getByText → 5. getByTestId → 6. CSS/XPath. XPath\'ı son çare kullan — sayfa yapısı değişince kırılır.',
      },
      playwrightBrittleLocatorFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta data-testid="submit-btn" olan bir elementi bulmak için en doğru yöntem hangisidir?', en: 'What is the best way to find an element with data-testid="submit-btn" in Playwright?' },
        options: [
          { id: 'a', text: 'page.locator("//button[@data-testid=\'submit-btn\']")' },
          { id: 'b', text: 'page.getByTestId("submit-btn")' },
          { id: 'c', text: 'page.locator("[data-testid]")' },
          { id: 'd', text: 'page.getByRole("button")' },
        ],
        correct: 'b',
        explanation: { tr: 'getByTestId("submit-btn") hem en okunabilir hem de en sağlam yöntemdir. CSS/XPath\'tan daha anlamlıdır ve sayfa yeniden yapılandırılsa bile kırılmaz.', en: 'getByTestId("submit-btn") is both the most readable and most resilient approach. It\'s more meaningful than CSS/XPath and won\'t break if the page is restructured.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright\\'ta data-testid=\"login-input\" olan bir input alanını seçmek için en ideal yöntem hangisidir?",
            "en": "What is the most ideal method to select an input field with data-testid=\"login-input\" in Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.locator(\"input[data-testid='login-input']\")"
            },
            {
                  "id": "b",
                  "text": "page.getByTestId(\"login-input\")"
            },
            {
                  "id": "c",
                  "text": "page.querySelector(\"[data-testid='login-input']\")"
            },
            {
                  "id": "d",
                  "text": "page.getByLabel(\"login\")"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "getByTestId() metodu, test otomasyonunda seçicileri (selectors) test odaklı hale getirmek için tercih edilen, sürdürülebilir ve okunabilir bir Playwright yöntemidir.",
            "en": "The getByTestId() method is a preferred, maintainable, and readable Playwright approach to make selectors test-oriented in automation."
      }
}
},
    ],
  },
  en: {
    title: '🎯 Locator Strategies',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: 'A locator is a way to describe an element on the page — but not like a street address; more like an ISBN number in a library catalog: even if the book\'s cover changes, its shelf moves, or the library relocates, the ISBN still finds the exact book because it references identity, not appearance. So if XPath and CSS selectors already exist, why does Playwright recommend role/text/testid instead? XPath and CSS selectors are tied to visual position or DOM hierarchy — if a developer swaps a div for a span or adds a wrapper layer, the locator breaks and the test ends up validating markup details rather than real user behavior. If you ever wrote By.xpath("//div[3]/span[2]/input") in Selenium/Java and the front-end team rearranged the page, tests went red even though nothing functionally changed — that\'s the "brittle test" problem. Playwright\'s getByRole("button", {name:"Buy Now"}) targets the interface as a screen reader sees it: it automatically covers accessibility testing for users with disabilities, and it\'s naturally resilient to DOM changes. The QA reality: if data-testid attributes are missing, the cheapest fix is talking to the dev team and planning testability at design time — before the brittleness compounds.',
      },
      LOCATOR_EXPLORER_BLOCK,
      { type: 'heading', text: 'Locator Types — Selenium vs Playwright' },
      {
        type: 'table',
        headers: ['Strategy', 'Selenium Java', 'Playwright'],
        rows: [
          ['ID', 'By.id("login")', '#login or page.locator("#login")'],
          ['CSS', 'By.cssSelector(".btn-primary")', 'page.locator(".btn-primary")'],
          ['XPath', 'By.xpath("//button[@id=\'x\']")', 'page.locator("xpath=//button")'],
          ['Text content', 'By.xpath("//*[text()=\'Login\']")', 'page.getByText("Login") ← MUCH EASIER'],
          ['Role (ARIA)', '❌ Not available', 'page.getByRole("button", {name:"Submit"})'],
          ['Placeholder', '❌ Not available', 'page.getByPlaceholder("Email address")'],
          ['Label', '❌ Not available', 'page.getByLabel("Username")'],
          ['data-testid', 'By.cssSelector("[data-testid=\'x\']")', 'page.getByTestId("x") ← MOST ROBUST'],
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Playwright locator strategies
import { test } from '@playwright/test';

test('locators', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // Role-based (RECOMMENDED)
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('a@b.com');

  // Text-based
  await page.getByText('Sign In').click();

  // Label-based (finds the input associated with the label)
  await page.getByLabel('Password').fill('secret123');

  // Test ID — most robust, doesn't break on UI changes
  await page.getByTestId('login-button').click();

  // Filter — narrow down when multiple matches
  await page.locator('.product-card')
    .filter({ hasText: 'Blue Shirt' })
    .getByRole('button', { name: 'Buy' })
    .click();
});`,
      },
      playwrightBrittleLocatorFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta data-testid="submit-btn" olan bir elementi bulmak için en doğru yöntem hangisidir?', en: 'What is the best way to find an element with data-testid="submit-btn" in Playwright?' },
        options: [
          { id: 'a', text: 'page.locator("//button[@data-testid=\'submit-btn\']")' },
          { id: 'b', text: 'page.getByTestId("submit-btn")' },
          { id: 'c', text: 'page.locator("[data-testid]")' },
          { id: 'd', text: 'page.getByRole("button")' },
        ],
        correct: 'b',
        explanation: { tr: 'getByTestId() en sağlam ve okunabilir yöntemdir.', en: 'getByTestId("submit-btn") is both the most readable and most resilient approach — it won\'t break if the page is restructured.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir HTML öğesinin data-testid=\"nav-menu\" niteliğine sahip olduğunu varsayarsak, bu öğeyi Playwright ile bulmanın en iyi yolu nedir?",
            "en": "Assuming an HTML element has the attribute data-testid=\"nav-menu\", what is the best way to locate this element using Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.locator(\"div > .nav-menu\")"
            },
            {
                  "id": "b",
                  "text": "page.getByTestId(\"nav-menu\")"
            },
            {
                  "id": "c",
                  "text": "page.getByClassName(\"nav-menu\")"
            },
            {
                  "id": "d",
                  "text": "page.$x(\"//div[@data-testid='nav-menu']\")"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "getByTestId(), uygulama içindeki değişikliklerden en az etkilenen ve testlerin daha kararlı çalışmasını sağlayan önerilen yöntemdir.",
            "en": "getByTestId() is the recommended method as it is least affected by changes in the application, ensuring more stable test execution."
      }
}
},
    ],
  },
}

const s4 = {
  tr: {
    title: '⏳ Bekleme Mekanizmaları (Wait)',
    blocks: [
      {
        type: 'simple-box', emoji: '⏰',
        content: 'Playwright\'ın bekleme sistemi, modern bir akıllı trafik ışığı gibi çalışır: ışık sabit bir süre değil, sensörden gelen araç yoğunluğuna göre dinamik olarak açılır — koşul oluştuğunda geçilir, oluşmamışsa beklenir. Peki Selenium\'da neden bunca elle bekleme kodu yazılırdı? Selenium, eski nesil mekanik bir zamanlayıcı gibidir: zaman sona erince beklemesi biter, element hazır olsa da olmasa da; hazır olsa bile zaman dolmamışsa bekler. Bu yüzden Java\'da WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.elementToBeClickable(By.id("btn"))) yazmak zorundaydın — her element için, her testte tekrarlayarak. Playwright\'ta page.locator("#btn").click() bu bekleme mantığını içinde taşır: element görünene, enabled olana, viewport\'a girene ve stable konuma gelene kadar otomatik bekler, maksimum timeout aşılırsa açık bir hata mesajıyla patlar. QA gerçeği: bekleme süresini sabit yazan testler, geliştirme ortamında yeşil yanan ama yavaş CI pipeline\'ında kırmızı yanan klasik "works on my machine" sorununu üretir. Playwright\'ın event-driven bekleme sistemi bu farkı ortadan kaldırır.',
      },
      {
        type: 'callout', color: 'green', emoji: '⚡',
        title: 'Auto-Wait — Playwright\'ın Süper Gücü',
        content: 'click(), fill(), check() gibi TÜM aksiyonlar çağrılmadan önce Playwright şunu kontrol eder: Element DOM\'da var mı? Görünür mü? Tıklanabilir mi? Stabil mi? (DOM değişiyor mu?) Hepsi hazır olunca aksiyon yapılır. Timeout aşılırsa TimeoutError fırlatır.',
      },
      {
        type: 'table',
        headers: ['Wait Türü', 'Selenium (Java)', 'Playwright'],
        rows: [
          ['Implicit wait', 'driver.manage().timeouts().implicitlyWait(10, SECONDS)', '❌ Yok — auto-wait karşılıyor'],
          ['Explicit wait (görünür)', 'wait.until(EC.visibility_of(el))', 'page.locator("#x").waitFor({state:"visible"})'],
          ['Explicit wait (tıklanabilir)', 'wait.until(EC.element_to_be_clickable(el))', 'Otomatik — sadece click() yaz'],
          ['URL değişmesini bekle', 'wait.until(EC.url_contains("dashboard"))', 'await page.waitForURL("**/dashboard")'],
          ['Yeni sayfa yüklenmesini bekle', 'WebDriverWait ile karmaşık', 'await page.waitForLoadState("networkidle")'],
          ['Element yok olmasını bekle', 'wait.until(EC.invisibility_of(el))', 'page.locator("#x").waitFor({state:"hidden"})'],
          ['API yanıtını bekle', '❌ Selenium\'da yok', 'await page.waitForResponse("**/api/products")'],
          ['Sabit süre bekle (kötü pratik!)', 'Thread.sleep(2000)', 'await page.waitForTimeout(2000) — KAÇIN!'],
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Playwright wait örnekleri
import { test, expect } from '@playwright/test';

test('wait examples', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // 1. AUTO-WAIT — ekstra kod gerekmez
  await page.getByRole('button', { name: 'Add to Cart' }).click();   // element hazır olana BEKLER

  // 2. waitForURL — URL değişmesini bekle
  await page.waitForURL('**/cart');                                  // URL */cart/* olana dek bekle

  // 3. waitFor — element state bekle
  await page.locator('#spinner').waitFor({ state: 'hidden' });       // spinner kaybolsun
  await page.locator('#content').waitFor({ state: 'visible' });      // içerik görünsün
  await page.locator('#result').waitFor({ state: 'attached' });      // DOM'a eklensin

  // 4. waitForLoadState — sayfa yüklenme durumu
  await page.waitForLoadState('domcontentloaded');                   // DOM hazır
  await page.waitForLoadState('networkidle');                        // ağ aktivitesi durdu

  // 5. waitForSelector — CSS selector bekle (eski API ama çalışır)
  await page.waitForSelector('.product-list', { state: 'visible' });

  // 6. waitForResponse — API yanıtı bekle
  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/api/cart')),  // API yanıtı bekle
    page.getByText('Add to Cart').click(),                           // tıkla (isteği tetikle)
  ]);
  console.log(await response.json());                                // yanıtı oku

  // 7. expect ile bekleme — ASSERTION + WAIT birleşik
  await expect(page.locator('#success-msg')).toBeVisible();         // görünene kadar bekle + assert
  await expect(page.locator('#count')).toHaveText('3');             // metin "3" olana dek bekle
  await expect(page).toHaveURL(/dashboard/);                        // URL pattern bekle

  // ❌ KÖTÜ PRATİK — sabit bekleme (race condition riski)
  // await page.waitForTimeout(2000);  // KULLANMA — flaky test üretir
});`,
      },
      {
        type: 'code', language: 'Java',
        code: `// Java — Playwright wait örnekleri
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.WaitForSelectorState;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

// AUTO-WAIT: click() zaten bekler — extra kod gerekmez
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Add to Cart")).click();

// waitForURL
page.waitForURL("**/cart");

// waitFor state
page.locator("#spinner").waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
page.locator("#content").waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));

// waitForLoadState
page.waitForLoadState(LoadState.NETWORKIDLE);

// waitForResponse
Response response = page.waitForResponse(
    r -> r.url().contains("/api/cart"),      // hangi URL'yi bekle
    () -> page.getByText("Add to Cart").click() // aksiyonu lambda ile ver
);

// Assertion = otomatik wait
assertThat(page.locator("#success-msg")).isVisible();   // görünene dek bekler
assertThat(page.locator("#count")).hasText("3");         // "3" olana dek bekler`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — Playwright wait örnekleri
from playwright.sync_api import Page, expect

def test_waits(page: Page):
    page.goto("https://automationexercise.com")

    # AUTO-WAIT: click() zaten bekler
    page.get_by_role("button", name="Add to Cart").click()

    # waitForURL
    page.wait_for_url("**/cart")                                  # snake_case!

    # waitFor state
    page.locator("#spinner").wait_for(state="hidden")             # spinner kaybol
    page.locator("#content").wait_for(state="visible")            # içerik görünsün

    # waitForLoadState
    page.wait_for_load_state("networkidle")

    # waitForResponse
    with page.expect_response(lambda r: "/api/cart" in r.url) as resp_info:
        page.get_by_text("Add to Cart").click()
    response = resp_info.value
    print(response.json())

    # Assertion = bekleme
    expect(page.locator("#success-msg")).to_be_visible()
    expect(page.locator("#count")).to_have_text("3")`,
      },
      {
        type: 'simulation',
        icon: '⚡',
        color: '#10b981',
        title: { tr: 'Auto-Wait — Playwright Aksiyondan Önce Ne Kontrol Eder?', en: 'Auto-Wait — What Does Playwright Check Before Acting?' },
        scenario: 'pw-autowait',
        description: {
          tr: '"▶ Butona Tıkla" → Playwright tıklamadan önce 5 actionability check\'i sırayla yapar. Tüm checkler yeşil olunca gerçek tıklama gerçekleşir. Sağda hangi check\'in şu an yapıldığını izle.',
          en: '▶ Click the button → Playwright runs 5 actionability checks before clicking. Only when all pass does the real click happen. Watch which check is running on the right.',
        },
        code: `// TypeScript — Auto-Wait örneği
// Tek satır — Playwright ARKAPLANda bunu yapar:
await page.getByRole('button', { name: 'Sepete Ekle' }).click();

// ↑ Bu satır şunları otomatik kontrol eder:
// 1. Element DOM'da var mı?          → attached
// 2. Element görünür mü?             → visible
// 3. Element animasyondan çıktı mı?  → stable
// 4. Pointer eventleri alıyor mu?    → receives events
// 5. Element enabled mi?             → enabled

// Timeout aşılırsa: TimeoutError fırlatır
// Default timeout: 30 saniye (playwright.config.ts'de ayarlanır)

// Java eşdeğeri (aynı auto-wait geçerli):
// page.getByRole(AriaRole.BUTTON, ...).click(); // no extra wait needed`,
        language: 'typescript',
      },
      playwrightAutoWaitPollFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir spinner\'ın kaybolmasını beklemek için hangi kod kullanılır?', en: 'Which code waits for a spinner to disappear in Playwright?' },
        options: [
          { id: 'a', text: 'Thread.sleep(3000)' },
          { id: 'b', text: 'page.locator("#spinner").waitFor({state:"hidden"})' },
          { id: 'c', text: 'wait.until(invisibility_of("#spinner"))' },
          { id: 'd', text: 'page.waitForSelector("#spinner", {visible:false})' },
        ],
        correct: 'b',
        explanation: { tr: 'waitFor({state:"hidden"}) elementi hidden veya DOM\'dan çıkana kadar bekler. Python\'da: wait_for(state="hidden"). Java\'da: WaitForSelectorState.HIDDEN.', en: 'waitFor({state:"hidden"}) waits until the element is hidden or removed from the DOM. In Python: wait_for(state="hidden"). In Java: WaitForSelectorState.HIDDEN.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright\\'ta bir yükleme animasyonu (loading-overlay) ekrandan kalkana kadar beklemek için doğru yöntem hangisidir?",
            "en": "Which method is correct to wait until a loading animation (loading-overlay) disappears in Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.waitForTimeout(5000)"
            },
            {
                  "id": "b",
                  "text": "page.locator(\".loading-overlay\").waitFor({state: \"hidden\"})"
            },
            {
                  "id": "c",
                  "text": "page.waitForElement(\".loading-overlay\", {visible: false})"
            },
            {
                  "id": "d",
                  "text": "page.click(\".loading-overlay\", {timeout: 0})"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "waitFor({state: \"hidden\"}) kullanımı, elementin DOM\\'dan ayrılmasını veya görünürlüğünü yitirmesini bekleyen Playwright\\'ın yerleşik ve önerilen bekleme yöntemidir.",
            "en": "Using waitFor({state: \"hidden\"}) is the built-in and recommended Playwright wait method that waits for the element to be removed from the DOM or become hidden."
      }
}
},
    ],
  },
  en: {
    title: '⏳ Wait Mechanisms',
    blocks: [
      {
        type: 'simple-box', emoji: '⏰',
        content: 'Playwright\'s waiting system works like a modern smart traffic light: it doesn\'t open on a fixed timer — it opens dynamically based on sensor-detected conditions; when the condition is met, you go; when it isn\'t, you wait. Why did Selenium require so much manual wait code? Selenium acts like an old-fashioned mechanical timer: when the time runs out, it stops waiting, whether the element is ready or not; if it is ready but time hasn\'t elapsed, you still wait. That\'s why in Java you had to write WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.elementToBeClickable(By.id("btn"))) — for every element, repeated in every test. In Playwright, page.locator("#btn").click() carries that waiting logic internally: it automatically waits until the element is visible, enabled, in the viewport, and in a stable position; if maximum timeout is exceeded it fails with a clear error message. The QA reality: tests with hardcoded wait durations produce the classic "works on my machine" failure — green in the local dev environment but red on a slower CI runner. Playwright\'s event-driven waiting system eliminates that gap entirely.',
      },
      {
        type: 'callout', color: 'green', emoji: '⚡',
        title: 'Auto-Wait — Playwright\'s Superpower',
        content: 'Before ALL actions like click(), fill(), check(), Playwright checks: Is the element in the DOM? Is it visible? Is it clickable? Is it stable? Only when all conditions are met does it perform the action. If timeout is exceeded, it throws TimeoutError.',
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Playwright wait examples
import { test, expect } from '@playwright/test';

test('wait examples', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // 1. AUTO-WAIT — no extra code needed
  await page.getByRole('button', { name: 'Add to Cart' }).click(); // WAITS automatically

  // 2. waitForURL
  await page.waitForURL('**/cart');

  // 3. waitFor state
  await page.locator('#spinner').waitFor({ state: 'hidden' });     // wait for spinner to disappear
  await page.locator('#content').waitFor({ state: 'visible' });    // wait for content to appear

  // 4. waitForResponse — wait for API call
  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/api/cart')),
    page.getByText('Add to Cart').click(),
  ]);

  // 5. expect = wait + assertion
  await expect(page.locator('#success-msg')).toBeVisible();
  await expect(page.locator('#count')).toHaveText('3');

  // ❌ BAD PRACTICE
  // await page.waitForTimeout(2000); // avoid — causes flaky tests
});`,
      },
      playwrightAutoWaitPollFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir spinner\'ın kaybolmasını beklemek için hangi kod kullanılır?', en: 'Which code waits for a spinner to disappear in Playwright?' },
        options: [
          { id: 'a', text: 'Thread.sleep(3000)' },
          { id: 'b', text: 'page.locator("#spinner").waitFor({state:"hidden"})' },
          { id: 'c', text: 'wait.until(invisibility_of("#spinner"))' },
          { id: 'd', text: 'page.waitForSelector("#spinner", {visible:false})' },
        ],
        correct: 'b',
        explanation: { tr: 'waitFor({state:"hidden"}) elementi hidden veya DOM\'dan çıkana kadar bekler.', en: 'waitFor({state:"hidden"}) waits until the element is hidden or removed from the DOM.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta bir yükleme çubuğunun (loading bar) DOM'dan tamamen kaldırılmasını beklemek için en doğru yöntem nedir?",
            "en": "What is the best way to wait for a loading bar to be completely removed from the DOM in Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.waitForTimeout(5000)"
            },
            {
                  "id": "b",
                  "text": "page.locator(\".loader\").waitFor({state: \"detached\"})"
            },
            {
                  "id": "c",
                  "text": "page.waitForElement(\".loader\", {hidden: true})"
            },
            {
                  "id": "d",
                  "text": "page.expect(\".loader\").toBeInvisible()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "{state: \"detached\"} seçeneği, elementin DOM yapısından tamamen silinmesini beklemek için kullanılır.",
            "en": "The {state: \"detached\"} option is used to wait for the element to be completely removed from the DOM."
      }
}
},
    ],
  },
}

const s5 = {
  tr: {
    title: '🖼️ iframe · Alert · Popup · Çoklu Sekme',
    blocks: [
      {
        type: 'simple-box', emoji: '🪟',
        content: 'iframe, sayfa içindeki bağımsız bir belge penceresidir — tıpkı büyük bir ofis binasının içindeki kiracı ofis gibi: binanın kendi güvenlik sistemleri, asansörleri ve personeli vardır, ama içindeki kiracı ofis kendi ayrı kapısına, kendi resepsiyonuna sahiptir; birinin personeline ulaşmak için önce binanın ana girişinden geçmek, sonra kiracı ofisin kapısından içeri girmek gerekir. Peki Selenium\'da bu neden bu kadar zahmetliydi? Selenium\'da switchTo().frame(index) ile bağlamı değiştirirdin, iş bitince switchTo().defaultContent() ile ana sayfaya geri dönmek zorunda kalırdın — hangi frame\'de olduğunu takip etmek, özellikle iç içe frame\'lerde ciddi kaynaklara ve dikkat hatasına yol açardı. Java\'da bu state yönetimini elle yapıyordun: bir frame\'i atladığında "Unable to locate element" hatası alır ve hatanın kaynağı nerede diye dakikalarca bakardın. Playwright\'ta page.frameLocator("iframe[name=\'payment\']").locator("#cardNumber").fill("4242") yeterlidir — bağlam değiştirme ve geri dönme işlemi Playwright tarafından otomatik yönetilir. QA gerçeği: ödeme widget\'ları, chat araçları ve üçüncü taraf form embed\'leri büyük çoğunlukla iframe kullanır; bu bölümü atlayarak gerçek dünya e-ticaret test senaryoları yazılamaz.',
      },
      { type: 'heading', text: '1️⃣ iframe — Selenium vs Playwright' },
      {
        type: 'comparison',
        left: { label: '❌ Selenium — Karmaşık switchTo()', code: `// Selenium — iframe geçişi
driver.switchTo().frame("myFrame");      // isme göre geç
WebElement btn = driver.findElement(By.id("submit"));
btn.click();
driver.switchTo().defaultContent();      // ANA SAYFAYA DÖN (unutma!)

// Nested iframe — çok daha karmaşık
driver.switchTo().frame(0);             // dış iframe
driver.switchTo().frame("inner");       // iç iframe
driver.findElement(By.id("x")).click();
driver.switchTo().defaultContent();     // tüm yoldan çık` },
        right: { label: '✅ Playwright — frameLocator()', code: `// Playwright — tek satır, geri dönme yok
const frame = page.frameLocator('#myFrame');  // iframe'i seç
await frame.locator('#submit').click();       // iframe İÇİNDE ara — otomatik

// Nested iframe
const inner = page.frameLocator('#outer').frameLocator('#inner');
await inner.locator('#x').click();

// src ile seçmek
const frame2 = page.frameLocator('iframe[src*="payment"]');
await frame2.locator('#card-number').fill('4111111111111111');` },
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — iframe
from playwright.sync_api import Page

def test_iframe(page: Page):
    page.goto("https://example.com/iframe-page")

    # iframe locator oluştur
    frame = page.frame_locator("#myFrame")    # ID ile seç

    # iframe İÇİNDE aksiyon yap — geri dönmek gerek yok!
    frame.locator("#username").fill("testuser")
    frame.locator("#submit").click()

    # Nested iframe
    inner = page.frame_locator("#outer").frame_locator("#inner")
    inner.locator("#target").click()

    # Tüm iframe'leri listele
    for frame_obj in page.frames:
        print(frame_obj.url)   # her iframe'in URL'si`,
      },
      { type: 'heading', text: '2️⃣ Alert · Confirm · Prompt' },
      {
        type: 'table',
        headers: ['Dialog Türü', 'Selenium Java', 'Playwright'],
        rows: [
          ['Alert kabul et', 'driver.switchTo().alert().accept()', 'page.on("dialog", d => d.accept()) — event listener'],
          ['Alert reddet', 'driver.switchTo().alert().dismiss()', 'page.on("dialog", d => d.dismiss())'],
          ['Alert metni oku', 'driver.switchTo().alert().getText()', 'dialog.message()'],
          ['Prompt\'a yaz', 'alert.sendKeys("text"); alert.accept()', 'dialog.accept("text")'],
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Alert / Confirm / Prompt yönetimi
import { test, expect } from '@playwright/test';

test('dialog handling', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // 1. Alert — ÖNCE listener ekle, SONRA tetikle
  page.on('dialog', async dialog => {
    console.log('Dialog type:', dialog.type());    // alert / confirm / prompt
    console.log('Dialog message:', dialog.message()); // "Are you sure?"
    await dialog.accept();                          // OK / kabul et
    // await dialog.dismiss();                      // İptal / reddet
  });

  await page.getByText('Delete Account').click();  // alert tetikle

  // 2. Prompt — değer girerek kabul et
  page.on('dialog', async dialog => {
    if (dialog.type() === 'prompt') {
      await dialog.accept('John Doe');              // prompt'a yaz + kabul et
    }
  });

  // 3. Specific dialog bekleme
  const dialogPromise = page.waitForEvent('dialog'); // dialog olayını bekle
  await page.getByText('Show Alert').click();         // tetikle
  const dialog = await dialogPromise;
  expect(dialog.message()).toBe('Hello World!');       // mesajı doğrula
  await dialog.accept();
});`,
      },
      {
        type: 'code', language: 'Java',
        code: `// Java — Alert/Dialog
page.onDialog(dialog -> {
    System.out.println("Type: " + dialog.type());      // alert/confirm/prompt
    System.out.println("Message: " + dialog.message());
    dialog.accept();                                   // OK bas
    // dialog.dismiss();                               // İptal bas
    // dialog.accept("input text");                    // Prompt'a yaz
});

page.getByText("Delete Account").click();              // dialog tetikle`,
      },
      { type: 'heading', text: '3️⃣ Yeni Sekme / Popup Yönetimi' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Çoklu sekme ve popup yönetimi
import { test, expect } from '@playwright/test';

test('new tab / popup', async ({ browser }) => {
  const context = await browser.newContext();          // yeni browser context
  const page = await context.newPage();
  await page.goto('https://example.com');

  // 1. Popup bekleme (yeni pencere/sekme açan link)
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),                      // yeni sayfa açılmasını bekle
    page.getByText('Open in New Tab').click(),         // tıkla
  ]);

  await newPage.waitForLoadState('domcontentloaded'); // popup yüklenmesini bekle
  console.log(newPage.url());                         // popup URL'si
  await newPage.locator('#login').fill('user');        // popup'ta işlem yap
  await newPage.close();                               // popup'ı kapat

  // 2. Manuel yeni sayfa
  const page2 = await context.newPage();
  await page2.goto('https://other-site.com');
  await page2.locator('#confirm').click();

  // 3. Tüm açık sayfalar
  console.log(context.pages().length);                // kaç sayfa açık

  // Cleanup
  await context.close();
});

// 4. Browser Context — izolasyon (her test yeni context)
test('isolated context', async ({ browser }) => {
  const userA = await browser.newContext({ storageState: 'user-a.json' });
  const userB = await browser.newContext({ storageState: 'user-b.json' });

  const pageA = await userA.newPage();  // A kullanıcısı
  const pageB = await userB.newPage();  // B kullanıcısı — tam izolasyon

  await userA.close();
  await userB.close();
});`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — çoklu sekme
from playwright.sync_api import Browser, expect

def test_new_tab(browser: Browser):
    context = browser.new_context()                   # yeni context
    page = context.new_page()
    page.goto("https://example.com")

    # Popup bekle
    with context.expect_page() as new_page_info:      # context manager ile bekle
        page.get_by_text("Open in New Tab").click()   # tıkla
    new_page = new_page_info.value                    # popup page nesnesi
    new_page.wait_for_load_state("domcontentloaded")

    print(new_page.url)
    new_page.locator("#login").fill("user")
    new_page.close()

    context.close()`,
      },
      playwrightIframeScopeFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir iframe içindeki elementi bulmak için hangi yöntem kullanılır?', en: 'Which method is used to find an element inside an iframe in Playwright?' },
        options: [
          { id: 'a', text: 'page.switchTo().frame("id")' },
          { id: 'b', text: 'page.frameLocator("#id").locator("#el")' },
          { id: 'c', text: 'page.findFrame("#id").click()' },
          { id: 'd', text: 'page.getByFrame("#id")' },
        ],
        correct: 'b',
        explanation: { tr: 'frameLocator("#id") iframe\'i seçer, ardından .locator() ile iframe içinde element aranır. switchTo().defaultContent() gibi geri dönme adımı gerekmez.', en: 'frameLocator("#id") selects the iframe, then .locator() searches inside it. No need for switchTo().defaultContent() to return — Playwright handles scope automatically.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright ile bir iframe içerisindeki butona tıklamak için hangi yaklaşım doğrudur?",
            "en": "Which approach is correct to click a button inside an iframe using Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.frame(\"myFrame\").click(\"#submit\")"
            },
            {
                  "id": "b",
                  "text": "page.frameLocator(\"iframe#myFrame\").locator(\"#submit\").click()"
            },
            {
                  "id": "c",
                  "text": "page.enterFrame(\"#myFrame\").click(\"#submit\")"
            },
            {
                  "id": "d",
                  "text": "page.switch_to_frame(\"#myFrame\").find(\"#submit\").click()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Playwright'ta frameLocator() metodu, iframe içinde zincirleme işlem yapmayı sağlar ve kapsamı otomatik yönetir.",
            "en": "In Playwright, the frameLocator() method allows for chaining operations inside an iframe and manages scope automatically."
      }
}
},
    ],
  },
  en: {
    title: '🖼️ iframe · Alert · Popup · Multiple Tabs',
    blocks: [
      {
        type: 'simple-box', emoji: '🪟',
        content: 'An iframe is an independent document window inside a page — like a tenant office inside a large office building: the building has its own security, elevators, and staff, but the tenant office has its own door and receptionist; to reach a tenant\'s employee you first pass through the building\'s main entrance, then enter through the tenant\'s own door. Why was this so painful in Selenium? You called switchTo().frame(index) to change context, and when done you had to call switchTo().defaultContent() to return to the main page — tracking which frame you were in, especially in nested frames, created real overhead and error-prone state management. In Java you did this manually: if you skipped a frame, you got "Unable to locate element" and spent minutes hunting down the source of the error. In Playwright, page.frameLocator("iframe[name=\'payment\']").locator("#cardNumber").fill("4242") is all you need — context switching and returning are managed automatically. The QA reality: payment widgets, chat tools, and third-party form embeds almost universally use iframes; you cannot write real-world e-commerce test scenarios without mastering this section.',
      },
      { type: 'heading', text: '1️⃣ iframe Handling' },
      {
        type: 'code', language: 'TypeScript',
        code: `// iframe handling
import { test } from '@playwright/test';

test('iframe', async ({ page }) => {
  await page.goto('https://example.com/iframe-page');

  // Select iframe and act inside — no need to switch back!
  const frame = page.frameLocator('#myFrame');
  await frame.locator('#username').fill('testuser');
  await frame.locator('#submit').click();

  // Nested iframes
  const inner = page.frameLocator('#outer').frameLocator('#inner');
  await inner.locator('#target').click();

  // Select by src URL
  const payment = page.frameLocator('iframe[src*="payment"]');
  await payment.locator('#card-number').fill('4111111111111111');
});`,
      },
      { type: 'heading', text: '2️⃣ Alert · Confirm · Prompt' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Dialog handling
test('dialogs', async ({ page }) => {
  await page.goto('https://example.com');

  // Add listener BEFORE triggering the dialog
  page.on('dialog', async dialog => {
    console.log(dialog.type());    // alert / confirm / prompt
    console.log(dialog.message()); // the message text
    await dialog.accept();         // click OK
    // await dialog.dismiss();     // click Cancel
    // await dialog.accept('text'); // for prompts — type and accept
  });

  await page.getByText('Delete Account').click(); // triggers dialog
});`,
      },
      { type: 'heading', text: '3️⃣ New Tab / Popup' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Multiple tabs and popups
test('new tab', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');

  // Wait for popup to open
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),              // wait for new page event
    page.getByText('Open in New Tab').click(), // trigger it
  ]);

  await newPage.waitForLoadState('domcontentloaded');
  await newPage.locator('#login').fill('user');
  await newPage.close();
  await context.close();
});`,
      },
      playwrightIframeScopeFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir iframe içindeki elementi bulmak için hangi yöntem kullanılır?', en: 'Which method is used to find an element inside an iframe in Playwright?' },
        options: [
          { id: 'a', text: 'page.switchTo().frame("id")' },
          { id: 'b', text: 'page.frameLocator("#id").locator("#el")' },
          { id: 'c', text: 'page.findFrame("#id").click()' },
          { id: 'd', text: 'page.getByFrame("#id")' },
        ],
        correct: 'b',
        explanation: { tr: 'frameLocator() iframe\'i seçer, ardından .locator() ile içinde arama yapılır.', en: 'frameLocator() selects the iframe, then .locator() searches inside it. No switchTo().defaultContent() needed.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta bir iframe içindeki form alanına veri girişi yapmak için kullanılan yöntem hangisidir?",
            "en": "Which method is used to input text into a form field inside an iframe in Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.iframe(\"#id\").fill(\"#input\", \"text\")"
            },
            {
                  "id": "b",
                  "text": "page.frameLocator(\"#id\").locator(\"#input\").fill(\"text\")"
            },
            {
                  "id": "c",
                  "text": "page.selectFrame(\"#id\").type(\"#input\", \"text\")"
            },
            {
                  "id": "d",
                  "text": "page.driver.switchTo(\"#id\").fill(\"#input\", \"text\")"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "frameLocator() ile iframe seçilir ve locator() ile içerideki element hedeflenerek fill() komutu çalıştırılır.",
            "en": "The iframe is selected via frameLocator(), and the fill() command is executed by targeting the inner element with locator()."
      }
}
},
    ],
  },
}
// 📁 Dosya·Network·API — page.route() ile proxy'siz network mock filmi
const playwrightNetworkMockFilm = {
  type: 'video-scene',
  id: 'playwright-network-mock-film',
  title: {
    tr: '🎬 Gerçek Sunucuya Hiç Dokunmadan: page.route()',
    en: '🎬 Never Touching the Real Server: page.route()',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'ui',        emoji: '🖱️', label: { tr: 'UI Aksiyonu',              en: 'UI Action' },              color: '#0ea5e9' },
    { id: 'request',   emoji: '📡', label: { tr: '/api/products İsteği',      en: '/api/products Request' },  color: '#8b5cf6' },
    { id: 'cdpTap',    emoji: '🔌', label: { tr: 'page.route() — CDP Musluğu', en: 'page.route() — CDP Tap' }, color: '#6366f1' },
    { id: 'fakeData',  emoji: '🎭', label: { tr: 'route.fulfill() — Sahte JSON', en: 'route.fulfill() — Fake JSON' }, color: '#22c55e' },
    { id: 'uiRenders', emoji: '✅', label: { tr: 'UI Sahte Veriyle Render',    en: 'UI Renders with Fake Data' }, color: '#16a34a' },
    { id: 'proxyGhost', emoji: '🛰️', label: { tr: 'Selenium — Ayrı Proxy Sunucu', en: 'Selenium — Separate Proxy Server' }, color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Kullanıcı "Ürünleri Göster" butonuna tıklar — bu, arka planda gerçek bir /api/products isteği tetikler.',
        en: 'The user clicks "Show Products" — this triggers a real /api/products request behind the scenes.',
      },
      positions: { ui: { x: 25, y: 50, scale: 1.1, pulse: true }, request: { x: 65, y: 55, scale: 0.95 } },
      beams: [{ from: 'ui', to: 'request' }],
    },
    {
      caption: {
        tr: 'İstek tarayıcıyı TERK ETMEDEN önce page.route() onu yakalar — Chrome DevTools Protocol üzerinden doğrudan tarayıcının network katmanına bağlanan bir "musluk".',
        en: 'BEFORE the request leaves the browser, page.route() intercepts it — a "tap" that connects directly into the browser\'s network layer via the Chrome DevTools Protocol.',
      },
      code: { tr: `await page.route('**/api/products', route => { ... });`, en: `await page.route('**/api/products', route => { ... });` },
      positions: { request: { x: 20, y: 45, scale: 0.85, opacity: 0.5 }, cdpTap: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'request', to: 'cdpTap', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'route.fulfill() sahte bir JSON yanıtı ANINDA döndürür — gerçek backend\'e hiçbir paket gitmez.',
        en: 'route.fulfill() returns a fake JSON response INSTANTLY — not a single packet reaches the real backend.',
      },
      positions: { cdpTap: { x: 22, y: 45, scale: 0.9, opacity: 0.6 }, fakeData: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'cdpTap', to: 'fakeData', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'UI bu sahte veriyle render olur — gerçek backend yanıtından hiçbir farkı yoktur, ama backend hiç çalışmıyor olabilir bile.',
        en: 'The UI renders using this fake data — indistinguishable from a real backend response, even though the backend might not be running at all.',
      },
      positions: { fakeData: { x: 25, y: 45, scale: 0.9, opacity: 0.6 }, uiRenders: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'fakeData', to: 'uiRenders', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Kontrast — Selenium/Java: Aynı sonucu almak için driver\'ın DIŞINDA ayrı bir proxy sunucusu (BrowserMob Proxy, mitmproxy) kurman, SSL sertifikasını tarayıcıya güvenilir olarak tanıtman ve proxy\'yi driver\'a bağlaman gerekirdi.',
        en: 'Contrast — Selenium/Java: to get the same result, you\'d need to stand up a proxy server OUTSIDE the driver (BrowserMob Proxy, mitmproxy), trust its SSL certificate in the browser, and wire the proxy into the driver.',
      },
      positions: { uiRenders: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, proxyGhost: { x: 62, y: 55, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Final — Java analojisi: bu, harici bir mock server (WireMock) ayağa kaldırmak yerine test kodunun İÇİNDE tek satırlık bir interceptor tanımlamak gibi. page.route() bir satır; proxy kurulumu onlarca satır konfigürasyon ve bir process yönetimi demektir.',
        en: 'Final — the Java analogy: this is like defining a one-line interceptor INSIDE your test code instead of standing up an external mock server (WireMock). page.route() is one line; a proxy setup means dozens of lines of configuration and a whole extra process to manage.',
      },
      positions: { proxyGhost: { x: 25, y: 45, scale: 0.85 }, fakeData: { x: 62, y: 50, scale: 1.1, pulse: true } },
    },
  ],
}

// 🐞 Debugging & Trace — kara kutu (flight recorder) filmi
const playwrightTraceTimeTravelFilm = {
  type: 'video-scene',
  id: 'playwright-trace-time-travel-film',
  title: {
    tr: '🎬 Kaza Sonrası Kara Kutuyu Açmak: Trace Viewer',
    en: '🎬 Opening the Black Box After the Crash: Trace Viewer',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'recorder', emoji: '📼', label: { tr: 'Kara Kutu (trace) — Sessizce Kaydediyor', en: 'Black Box (trace) — Silently Recording' }, color: '#8b5cf6' },
    { id: 'action1',  emoji: '🖱️', label: { tr: 'Adım 1 — click()',           en: 'Step 1 — click()' },        color: '#0ea5e9' },
    { id: 'action2',  emoji: '⌨️', label: { tr: 'Adım 2 — fill()',            en: 'Step 2 — fill()' },         color: '#0ea5e9' },
    { id: 'fail',     emoji: '💥', label: { tr: 'Adım 3 — Assertion FAIL (03:14 CI)', en: 'Step 3 — Assertion FAILS (03:14 CI)' }, color: '#dc2626' },
    { id: 'stackGhost', emoji: '📄', label: { tr: 'Selenium — Sadece Stack Trace', en: 'Selenium — Only a Stack Trace' }, color: '#94a3b8' },
    { id: 'timeTravel', emoji: '🔍', label: { tr: 'show-trace → O Ana Geri Dön', en: 'show-trace → Travel Back to That Moment' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Test çalışırken, hiçbir hata olmasa bile, Trace Viewer arka planda SESSİZCE her adımı kaydeder — bir uçağın kara kutusu gibi, kazayı beklemez, en baştan kaydeder.',
        en: 'While the test runs — even if nothing fails — Trace Viewer SILENTLY records every step in the background, like an aircraft\'s black box: it doesn\'t wait for a crash, it records from the very start.',
      },
      positions: { recorder: { x: 70, y: 30, scale: 1.05, pulse: true }, action1: { x: 25, y: 60, scale: 1 } },
      beams: [{ from: 'action1', to: 'recorder', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 1 ve Adım 2 sorunsuzca geçer — DOM anlık görüntüsü, network isteği ve console log\'u kara kutuya yazılır.',
        en: 'Steps 1 and 2 pass cleanly — the DOM snapshot, network request, and console log are all written to the black box.',
      },
      positions: { action1: { x: 15, y: 55, scale: 0.85, opacity: 0.5 }, action2: { x: 45, y: 60, scale: 1.1, pulse: true }, recorder: { x: 75, y: 30, scale: 1 } },
      beams: [{ from: 'action2', to: 'recorder', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Sabah saat 03:14, CI pipeline\'ında Adım 3\'teki assertion başarısız olur — kimse ekranı izlemiyordu.',
        en: 'At 3:14 AM, in the CI pipeline, the assertion in Step 3 fails — nobody was watching the screen.',
      },
      positions: { action2: { x: 15, y: 50, scale: 0.85, opacity: 0.5 }, fail: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'action2', to: 'fail', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Kontrast — Selenium/Java: elinde sadece "NoSuchElementException" stack trace\'i olurdu — o an DOM neye benziyordu, hangi network isteği ne döndürdü? Cevap yoktu, lokalde tekrar tekrar çalıştırıp tahmin etmen gerekirdi.',
        en: 'Contrast — Selenium/Java: all you\'d have is a "NoSuchElementException" stack trace — what did the DOM look like at that exact moment, what did the network request return? No answer — you\'d have to re-run locally over and over and guess.',
      },
      positions: { fail: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, stackGhost: { x: 60, y: 55, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'npx playwright show-trace trace.zip komutu kara kutuyu açar: tam olarak o anki DOM, network yanıtı ve ekran görüntüsü geri gelir — "zaman yolculuğu".',
        en: 'The command npx playwright show-trace trace.zip opens the black box: the exact DOM, network response, and screenshot from that moment come back — a "time travel".',
      },
      code: { tr: `npx playwright show-trace trace.zip`, en: `npx playwright show-trace trace.zip` },
      positions: { stackGhost: { x: 18, y: 40, scale: 0.8, opacity: 0.4 }, timeTravel: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'recorder', to: 'timeTravel', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — kara kutu tüm koşum boyunca zaten kayıttaydı; investigation için lokalde tekrar koşum GEREKMEZ. Saatler süren "bende çalışıyor" araştırması dakikalara iner.',
        en: 'Final — the black box was recording the ENTIRE time; no local re-run is NEEDED for investigation. What used to take hours of "works on my machine" digging now takes minutes.',
      },
      positions: { timeTravel: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
  ],
}

// 🎬 Codegen — semantik locator vs piksel koordinatlı klasik makro
const playwrightCodegenSemanticFilm = {
  type: 'video-scene',
  id: 'playwright-codegen-semantic-film',
  title: {
    tr: '🎬 Buton Yer Değiştirdi: Biri Hâlâ Buluyor, Biri Kayboluyor',
    en: '🎬 The Button Moved: One Still Finds It, One Gets Lost',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'click',     emoji: '🖱️', label: { tr: '"Sepete Ekle" Tıklandı',    en: '"Add to Cart" Clicked' },   color: '#0ea5e9' },
    { id: 'inspector', emoji: '🎭', label: { tr: 'Playwright Inspector',       en: 'Playwright Inspector' },     color: '#8b5cf6' },
    { id: 'semantic',  emoji: '🎯', label: { tr: 'getByRole(\'button\', ...)', en: 'getByRole(\'button\', ...)' }, color: '#22c55e' },
    { id: 'pixelGhost', emoji: '📍', label: { tr: 'Klasik Makro — click(482, 617)', en: 'Classic Macro — click(482, 617)' }, color: '#dc2626' },
    { id: 'reflow',    emoji: '🎨', label: { tr: 'Sayfaya Banner Eklendi',     en: 'Banner Added to Page' },     color: '#f59e0b' },
    { id: 'result',    emoji: '✅', label: { tr: 'Rol Tabanlı: Yine Buluyor',  en: 'Role-Based: Still Finds It' }, color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'npx playwright codegen ile açılan GERÇEK tarayıcıda "Sepete Ekle" butonuna tıklarsın — normal bir kullanıcı gibi.',
        en: 'In the REAL browser opened by npx playwright codegen, you click "Add to Cart" — just like a normal user.',
      },
      positions: { click: { x: 30, y: 50, scale: 1.15, pulse: true }, inspector: { x: 68, y: 55, scale: 1 } },
      beams: [{ from: 'click', to: 'inspector' }],
    },
    {
      caption: {
        tr: 'Yan penceredeki Playwright Inspector, bu tıklamanın karşılığı olan kod satırını CANLI üretir: page.getByRole(\'button\', {name:\'Sepete Ekle\'}).click().',
        en: 'The Playwright Inspector window on the side LIVE-generates the code line for this click: page.getByRole(\'button\', {name:\'Add to Cart\'}).click().',
      },
      code: { tr: `page.getByRole('button', { name: 'Sepete Ekle' }).click();`, en: `page.getByRole('button', { name: 'Add to Cart' }).click();` },
      positions: { inspector: { x: 20, y: 45, scale: 0.85, opacity: 0.5 }, semantic: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'inspector', to: 'semantic', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Kontrast — klasik bir makro kaydedici (Selenium IDE\'nin eski nesli veya genel OS makrosu) bunun yerine mutlak piksel koordinatını kaydederdi: click(482, 617).',
        en: 'Contrast — a classic macro recorder (an older Selenium IDE generation, or a generic OS macro tool) would instead record the absolute pixel coordinate: click(482, 617).',
      },
      positions: { semantic: { x: 18, y: 40, scale: 0.85, opacity: 0.5 }, pixelGhost: { x: 60, y: 55, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Frontend ekibi sayfanın üstüne bir kampanya banner\'ı ekler — sayfa aşağı kayar, buton artık FARKLI bir piksel konumunda.',
        en: 'The frontend team adds a promo banner to the top of the page — everything shifts down, the button is now at a DIFFERENT pixel position.',
      },
      positions: { pixelGhost: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, reflow: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'pixelGhost', to: 'reflow', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'click(482, 617) artık YANLIŞ bir yere tıklar — belki banner\'a, belki boş alana. getByRole(\'button\', {name:\'Sepete Ekle\'}) ise piksele hiç bakmadığı için hâlâ doğru butonu bulur.',
        en: 'click(482, 617) now clicks the WRONG spot — maybe the banner, maybe empty space. getByRole(\'button\', {name:\'Add to Cart\'}) never looked at pixels in the first place, so it still finds the right button.',
      },
      positions: { reflow: { x: 18, y: 40, scale: 0.85, opacity: 0.5 }, result: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'reflow', to: 'result', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Final — Codegen ham kod üretir ama assertion eklemez, POM kullanmaz; bu senin işin. Ama ürettiği locator stratejisi baştan sağlamdır — Selenium IDE\'nin CSS/XPath ağırlıklı çıktısından çok daha az kırılgandır.',
        en: 'Final — Codegen produces raw code but doesn\'t add assertions or use POM; that part is your job. But the locator strategy it produces is solid from the start — far less brittle than Selenium IDE\'s CSS/XPath-heavy output.',
      },
      positions: { result: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
  ],
}

const playwrightCodegenFlowSteps = {
  type: 'step-animation',
  id: 'playwright-codegen-flow-steps-01',
  title: { tr: 'Adım Adım: Codegen İki Pencereyi Nasıl Senkronize Eder', en: 'Step by Step: How Codegen Syncs Its Two Windows' },
  steps: [
    { id: 1, icon: '🖥️', label: { tr: 'İki pencere açılır', en: 'Two windows open' }, detail: { tr: 'npx playwright codegen <url> çalıştırılınca gerçek bir tarayıcı VE Playwright Inspector penceresi yan yana açılır.', en: 'Running npx playwright codegen <url> opens a real browser AND the Playwright Inspector window side by side.' } },
    { id: 2, icon: '🖱️', label: { tr: 'Sen normal kullanıcı gibi gezinirsin', en: 'You browse like a normal user' }, detail: { tr: 'Tıkla, yaz, dropdown seç — hiçbir kod yazmadan sadece uygulamayı kullanırsın.', en: 'Click, type, select dropdowns — you just use the app, no code written yet.' } },
    { id: 3, icon: '🎭', label: { tr: 'Inspector her adımı koda çevirir', en: 'The Inspector translates every step to code' }, detail: { tr: 'Attığın her adım, semantik bir locator (getByRole/getByLabel öncelikli) ile Inspector\'da CANLI kod satırına dönüşür.', en: 'Every step you take turns into a LIVE code line in the Inspector, using a semantic locator (getByRole/getByLabel preferred).' } },
    { id: 4, icon: '📋', label: { tr: 'Kodu kopyala', en: 'Copy the code' }, detail: { tr: 'İşin bitince ürettiği kodu tek tıkla panoya kopyalarsın.', en: 'When done, copy the generated code to the clipboard with one click.' } },
    { id: 5, icon: '🔧', label: { tr: 'Refine et: POM + assertion ekle', en: 'Refine it: add POM + assertions' }, detail: { tr: 'Codegen assertion YAZMAZ ve POM kullanmaz — bunları sen eklersin, ham kodu üretken bir başlangıç noktası olarak kullan.', en: 'Codegen does NOT write assertions and does NOT use POM — you add those; treat the raw code as a productive starting point.' } },
  ],
}

const playwrightCodegenPractice = {
  type: 'code-playground',
  relatedTopicId: 'playwright-codegen-refine-practice-01',
  id: 'playwright-codegen-refine-practice-01',
  label: { tr: 'Micro Lab: Codegen Çıktısını Production\'a Hazırla', en: 'Micro Lab: Make Codegen Output Production-Ready' },
  language: 'typescript',
  task: {
    tr: 'Amaç: Codegen\'in ürettiği ham kod aşağıda — tıklama ve doldurma adımları var ama HİÇBİR assertion yok. TODO satırını, giriş başarılı olduğunda URL\'nin /dashboard\'a değiştiğini doğrulayan bir web-first assertion ile tamamla.',
    en: 'Goal: the raw Codegen output is below — it has click/fill steps but NO assertions at all. Complete the TODO line with a web-first assertion that verifies the URL changes to /dashboard on successful login.',
  },
  explanation: {
    tr: 'Codegen sadece AKSİYONLARI kaydeder, "başarılı mıydı?" sorusunu asla sormaz — bu senin eklemen gereken kısımdır. expect(page).toHaveURL(...) olmadan test her zaman "geçer" görünür, çünkü hiçbir şeyi gerçekten doğrulamaz.',
    en: 'Codegen only records ACTIONS — it never asks "did it actually work?" — that\'s the part you must add. Without expect(page).toHaveURL(...), the test always "passes" because it never actually verifies anything.',
  },
  code: {
    tr: `await page.getByLabel('E-posta').fill('user@example.com');\nawait page.getByLabel('Şifre').fill('secret123');\nawait page.getByRole('button', { name: 'Giriş Yap' }).click();\nawait expect(page).toHaveURL('/dashboard');`,
    en: `await page.getByLabel('Email').fill('user@example.com');\nawait page.getByLabel('Password').fill('secret123');\nawait page.getByRole('button', { name: 'Sign in' }).click();\nawait expect(page).toHaveURL('/dashboard');`,
  },
  starterCode: {
    tr: `await page.getByLabel('E-posta').fill('user@example.com');\nawait page.getByLabel('Şifre').fill('secret123');\nawait page.getByRole('button', { name: 'Giriş Yap' }).click();\n// TODO: URL'nin /dashboard'a degistigini dogrulayan bir assertion ekle`,
    en: `await page.getByLabel('Email').fill('user@example.com');\nawait page.getByLabel('Password').fill('secret123');\nawait page.getByRole('button', { name: 'Sign in' }).click();\n// TODO: add an assertion that verifies the URL changed to /dashboard`,
  },
  solutionCode: {
    tr: `await page.getByLabel('E-posta').fill('user@example.com');\nawait page.getByLabel('Şifre').fill('secret123');\nawait page.getByRole('button', { name: 'Giriş Yap' }).click();\nawait expect(page).toHaveURL('/dashboard');`,
    en: `await page.getByLabel('Email').fill('user@example.com');\nawait page.getByLabel('Password').fill('secret123');\nawait page.getByRole('button', { name: 'Sign in' }).click();\nawait expect(page).toHaveURL('/dashboard');`,
  },
  expected: {
    tr: 'Test artık sadece aksiyonları oynatmakla kalmıyor, girişin GERÇEKTEN başarılı olduğunu da doğruluyor — URL değişmezse test kırmızı yanar.',
    en: 'The test no longer just replays actions — it actually verifies the login REALLY succeeded. If the URL never changes, the test fails.',
  },
  hints: [
    { tr: 'Sayfa seviyesinde bir kontrol arıyorsun (locator değil) — URL/title gibi.', en: 'You need a page-level check (not a locator) — like URL/title.' },
    { tr: 'Aradığın metod: expect(page).toHaveURL(string_veya_regex).', en: 'The method you need: expect(page).toHaveURL(stringOrRegex).' },
  ],
  xpReward: 10,
}

// 🔌 Playwright MCP — piksel tahmini vs erişilebilirlik ağacı referansı
const playwrightMcpA11yTreeFilm = {
  type: 'video-scene',
  id: 'playwright-mcp-a11y-tree-film',
  title: {
    tr: '🎬 AI Nasıl Tıklar: Piksel Tahmini mi, Kararlı Referans mı?',
    en: '🎬 How an AI Clicks: Pixel Guessing or a Stable Reference?',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'agent',     emoji: '🤖', label: { tr: 'AI Ajanı: "Sepete Ekle\'ye tıkla"', en: 'AI Agent: "Click Add to Cart"' }, color: '#0ea5e9' },
    { id: 'screenshot', emoji: '🖼️', label: { tr: 'Sadece Screenshot (piksel)',      en: 'Just a Screenshot (pixels)' },    color: '#dc2626' },
    { id: 'guess',     emoji: '🎲', label: { tr: 'Koordinat TAHMİNİ: (482, 617)',    en: 'Coordinate GUESS: (482, 617)' },  color: '#dc2626' },
    { id: 'mcpServer', emoji: '🔌', label: { tr: 'Playwright MCP Server',            en: 'Playwright MCP Server' },         color: '#8b5cf6' },
    { id: 'a11yTree',  emoji: '🌳', label: { tr: 'Accessibility Tree — ref=e14',      en: 'Accessibility Tree — ref=e14' },  color: '#22c55e' },
    { id: 'exactClick', emoji: '✅', label: { tr: 'Kararlı Tıklama — Her Zaman Doğru', en: 'Stable Click — Always Correct' }, color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'AI ajanına "Sepete Ekle butonuna tıkla" görevi verilir — ama AI\'ın sayfayı GÖRME yolu, insanınkinden tamamen farklıdır.',
        en: 'The AI agent is given the task "click the Add to Cart button" — but the way the AI SEES the page is completely different from a human\'s.',
      },
      positions: { agent: { x: 25, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Kontrast — sadece screenshot verilirse: AI görüntüdeki pikselleri analiz edip bir koordinat TAHMİN etmek zorunda kalır. Bu tahmin her zaman kesin değildir.',
        en: 'Contrast — if given only a screenshot: the AI must analyze the pixels in the image and GUESS a coordinate. That guess is never perfectly precise.',
      },
      positions: { agent: { x: 15, y: 45, scale: 0.85, opacity: 0.5 }, screenshot: { x: 45, y: 55, scale: 1.05 }, guess: { x: 75, y: 55, scale: 1.1, pulse: true } },
      beams: [{ from: 'screenshot', to: 'guess', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Sayfa yeniden render olduğunda (bir banner, bir reklam, bir animasyon) piksel koordinatı artık YANLIŞ konuma işaret eder — AI yanlış yere tıklar.',
        en: 'When the page re-renders (a banner, an ad, an animation), the pixel coordinate now points to the WRONG spot — the AI clicks the wrong thing.',
      },
      positions: { guess: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'MCP yolu: AI, browser_snapshot() çağırır. Playwright MCP Server, screenshot yerine sayfanın erişilebilirlik ağacını yapılandırılmış veri olarak döndürür: rol, isim, ve kararlı bir "ref".',
        en: 'The MCP path: the AI calls browser_snapshot(). The Playwright MCP Server returns the page\'s accessibility tree as structured data instead of a screenshot: role, name, and a stable "ref".',
      },
      code: { tr: `button "Sepete Ekle" [ref=e14]`, en: `button "Add to Cart" [ref=e14]` },
      positions: { agent: { x: 15, y: 40, scale: 0.85, opacity: 0.5 }, mcpServer: { x: 45, y: 50, scale: 1.05 }, a11yTree: { x: 78, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'mcpServer', to: 'a11yTree', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'AI, browser_click({ref:\'e14\'}) çağırır — Playwright bu referansı GERÇEK DOM elementine çözer, piksel konumunun ne olduğu HİÇ önemli değildir.',
        en: 'The AI calls browser_click({ref:\'e14\'}) — Playwright resolves this reference to the REAL DOM element; the pixel position never matters at all.',
      },
      positions: { a11yTree: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, exactClick: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'a11yTree', to: 'exactClick', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Final — Java analojisi: JDBC\'nin "hangi veritabanı motoru olursa olsun aynı SQL arayüzü" sunması gibi, MCP de "sayfa nasıl görünürse görünsün aynı yapılandırılmış referans" sunar. Sayfa yeniden render olsa bile ref=e14 aynı elemente işaret etmeye devam eder.',
        en: 'Final — the Java analogy: just like JDBC offers "the same SQL interface no matter which database engine," MCP offers "the same structured reference no matter how the page looks." Even after a re-render, ref=e14 keeps pointing to the correct element.',
      },
      positions: { exactClick: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
  ],
}

// ⚡ Paralel & CI/CD — sıfır-altyapı workers vs Selenium Grid Hub+Node kurulumu
const playwrightWorkersNoInfraFilm = {
  type: 'video-scene',
  id: 'playwright-workers-no-infra-film',
  title: {
    tr: '🎬 Tek Satır vs Bir Sunucu Ağı: workers: 4',
    en: '🎬 One Line vs a Server Fleet: workers: 4',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'suite',    emoji: '🧪', label: { tr: '500 Test',                  en: '500 Tests' },                color: '#0ea5e9' },
    { id: 'gridHub',  emoji: '🏢', label: { tr: 'Selenium Grid — Hub Kurulumu', en: 'Selenium Grid — Hub Setup' }, color: '#dc2626' },
    { id: 'gridNodes', emoji: '🐳', label: { tr: 'Docker Node\'ları + Driver Sürümleri', en: 'Docker Nodes + Driver Versions' }, color: '#dc2626' },
    { id: 'oneLine',  emoji: '✍️', label: { tr: 'workers: 4 — playwright.config.ts',   en: 'workers: 4 — playwright.config.ts' }, color: '#8b5cf6' },
    { id: 'isolated', emoji: '🧱', label: { tr: '4 İzole Worker Context\'i',   en: '4 Isolated Worker Contexts' },  color: '#22c55e' },
    { id: 'fastDone', emoji: '✅', label: { tr: '40dk → ~10dk',                en: '40min → ~10min' },             color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: '500 E2E test var — hepsi değerli, hepsini her PR\'da çalıştırmak istiyorsun.',
        en: 'There are 500 E2E tests — all valuable, and you want to run all of them on every PR.',
      },
      positions: { suite: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Kontrast — Selenium Grid ile paralelleştirmek önce bir Hub kurmanı gerektirir: merkezi bir yönlendirici sunucu, ayrı bir process, ayrı bir konfigürasyon dosyası.',
        en: 'Contrast — parallelizing with Selenium Grid first requires setting up a Hub: a central routing server, a separate process, a separate config file.',
      },
      positions: { suite: { x: 15, y: 45, scale: 0.85, opacity: 0.5 }, gridHub: { x: 55, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'suite', to: 'gridHub', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Sonra Hub\'a bağlı Node\'lar (genelde Docker container\'ları) kurman, HER Node\'da driver sürümlerini senkronize tutman gerekir — ciddi bir DevOps yükü.',
        en: 'Then you need Nodes connected to the Hub (usually Docker containers), and you must keep driver versions in sync across EVERY Node — a serious DevOps burden.',
      },
      positions: { gridHub: { x: 25, y: 40, scale: 0.9, opacity: 0.6 }, gridNodes: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'gridHub', to: 'gridNodes', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Playwright yolu: playwright.config.ts\'ye TEK bir satır eklersin: workers: 4. Ayrı bir sunucu, ayrı bir Docker kurulumu, ayrı bir Hub YOKTUR.',
        en: 'The Playwright way: you add ONE line to playwright.config.ts: workers: 4. There\'s NO separate server, NO separate Docker setup, NO separate Hub.',
      },
      code: { tr: `workers: process.env.CI ? 4 : undefined,`, en: `workers: process.env.CI ? 4 : undefined,` },
      positions: { suite: { x: 15, y: 40, scale: 0.85, opacity: 0.5 }, oneLine: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'suite', to: 'oneLine', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Her worker kendi İZOLE browser context\'inde çalışır — paylaşılan state yoktur, bu yüzden thread-safety hataları da OLMAZ, Java\'daki paylaşılan mutable state bug\'ları gibi.',
        en: 'Each worker runs in its own ISOLATED browser context — there\'s no shared state, so thread-safety bugs simply CANNOT happen, unlike the shared mutable state bugs you\'d chase in Java.',
      },
      positions: { oneLine: { x: 22, y: 40, scale: 0.9, opacity: 0.6 }, isolated: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'oneLine', to: 'isolated', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — 500 test 4 worker\'a bölünür, HİÇBİR ek altyapı olmadan. 40 dakikalık süre yaklaşık 10 dakikaya iner — ve bu, Hub/Node kurulumunun tüm bakım maliyetinden kurtularak elde edilir.',
        en: 'Final — 500 tests split across 4 workers, with NO extra infrastructure at all. The 40-minute runtime drops to about 10 minutes — achieved without any of the Hub/Node setup\'s ongoing maintenance cost.',
      },
      positions: { isolated: { x: 25, y: 45, scale: 0.9 }, fastDone: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'isolated', to: 'fastDone', color: '#16a34a' }],
    },
  ],
}

// 🔐 Auth & Session — SSO analojisiyle storageState filmi
const playwrightStorageStateSsoFilm = {
  type: 'video-scene',
  id: 'playwright-storage-state-sso-film',
  title: {
    tr: '🎬 Bir Kere Login Ol, 200 Test Otomatik İçeri Girsin',
    en: '🎬 Log In Once, 200 Tests Walk Straight In',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'loginTest', emoji: '🔑', label: { tr: 'auth.spec.ts — Login TEK BURADA test edilir', en: 'auth.spec.ts — Login tested ONLY here' }, color: '#0ea5e9' },
    { id: 'authFile',  emoji: '💾', label: { tr: 'auth.json — storageState',   en: 'auth.json — storageState' },    color: '#8b5cf6' },
    { id: 'test2',     emoji: '🧪', label: { tr: 'Test #2 — Zaten İçeride',    en: 'Test #2 — Already Inside' },     color: '#22c55e' },
    { id: 'test200',   emoji: '🧪', label: { tr: 'Test #200 — Zaten İçeride',  en: 'Test #200 — Already Inside' },   color: '#22c55e' },
    { id: 'rateLimitGhost', emoji: '🚫', label: { tr: 'Selenium — 200x UI Login → 429 Too Many Requests', en: 'Selenium — 200x UI Login → 429 Too Many Requests' }, color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'auth.spec.ts adlı AYRI bir test dosyası, login akışının KENDİSİNİ derinlemesine test eder: doğru bilgiler, yanlış şifre, çıkış — login mantığı sadece BURADA doğrulanır.',
        en: 'A SEPARATE test file called auth.spec.ts thoroughly tests the login flow ITSELF: correct credentials, wrong password, logout — the login logic is verified ONLY here.',
      },
      positions: { loginTest: { x: 40, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Başarılı login sonrası context.storageState({path:\'auth.json\'}) çağrılır — cookie\'ler ve localStorage tek bir dosyaya "SSO bileti" gibi yazılır.',
        en: 'After a successful login, context.storageState({path:\'auth.json\'}) is called — cookies and localStorage are written to a single file, like an "SSO ticket".',
      },
      code: { tr: `await context.storageState({ path: 'auth.json' });`, en: `await context.storageState({ path: 'auth.json' });` },
      positions: { loginTest: { x: 20, y: 45, scale: 0.9, opacity: 0.6 }, authFile: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'loginTest', to: 'authFile', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Test #2, playwright.config.ts\'teki use: {storageState: \'auth.json\'} sayesinde tarayıcıyı ZATEN GİRİŞ YAPMIŞ olarak açar — hiçbir UI login adımı yoktur.',
        en: 'Test #2, thanks to use: {storageState: \'auth.json\'} in playwright.config.ts, opens the browser ALREADY LOGGED IN — there are zero UI login steps.',
      },
      positions: { authFile: { x: 22, y: 40, scale: 0.9, opacity: 0.6 }, test2: { x: 60, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'authFile', to: 'test2', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Test #3\'ten Test #200\'e kadar HEPSİ aynı dosyayı yükler — 200 test, sıfır ekstra login saniyesi.',
        en: 'From Test #3 all the way to Test #200, EVERY test loads the same file — 200 tests, zero extra login seconds.',
      },
      positions: { test2: { x: 25, y: 45, scale: 0.9, opacity: 0.6 }, test200: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'test2', to: 'test200', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Kontrast — her test UI\'dan tek tek login yapsaydı: 200 test × 2 saniye = 400 saniye kaybı, ÜSTELİK login endpoint\'i rate-limit uyguluyorsa test suite\'in yarısı 429 Too Many Requests alır.',
        en: 'Contrast — if every test logged in individually via the UI: 200 tests × 2 seconds = 400 seconds wasted, AND if the login endpoint has a rate limit, half the suite gets 429 Too Many Requests.',
      },
      positions: { test200: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, rateLimitGhost: { x: 62, y: 55, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Final — Java analojisi: bu, Selenium\'da "login\'i API\'den yap, cookie\'yi driver.manage().addCookie() ile enjekte et" hack\'inin resmî, dosya tabanlı ve paralel-güvenli versiyonudur.',
        en: 'Final — the Java analogy: this is the official, file-based, parallel-safe version of the Selenium hack "log in via API, inject the cookie with driver.manage().addCookie()".',
      },
      positions: { rateLimitGhost: { x: 30, y: 45, scale: 0.9 }, authFile: { x: 65, y: 50, scale: 1.1, pulse: true } },
    },
  ],
}

// 🌍 Gerçek Hayat — havaalanı güvenlik zinciri: sessiz kısmi hata
const playwrightE2eSilentFailureFilm = {
  type: 'video-scene',
  id: 'playwright-e2e-silent-failure-film',
  title: {
    tr: '🎬 Buton Çalıştı, Ama Sipariş Gerçekten Tamamlandı mı?',
    en: '🎬 The Button Worked, But Did the Order Actually Go Through?',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'signup',   emoji: '📝', label: { tr: '1) Kayıt Ol',           en: '1) Sign Up' },            color: '#0ea5e9' },
    { id: 'cart',     emoji: '🛒', label: { tr: '2) Sepete Ekle',        en: '2) Add to Cart' },         color: '#6366f1' },
    { id: 'pay',      emoji: '💳', label: { tr: '3) Ödeme — 200 OK',     en: '3) Payment — 200 OK' },    color: '#8b5cf6' },
    { id: 'shallow',  emoji: '✅', label: { tr: 'Sığ Test: "Buton Çalıştı" → PASS', en: 'Shallow Test: "Button Worked" → PASS' }, color: '#f59e0b' },
    { id: 'silentBreak', emoji: '🔇', label: { tr: 'Stok Düşmedi + E-posta Gitmedi', en: 'Stock Never Decremented + No Email Sent' }, color: '#dc2626' },
    { id: 'chainCatch', emoji: '🔗', label: { tr: 'Zincir Testi: Her Halka Ayrı Doğrulanır', en: 'Chain Test: Every Link Verified Separately' }, color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'E2E test bir havaalanı güvenlik zinciri gibi ilerler: Kayıt → Sepete Ekle → Ödeme → Sipariş Onayı — her halka kendi kontrolüne sahiptir.',
        en: 'The E2E test proceeds like an airport security chain: Sign Up → Add to Cart → Payment → Order Confirmation — each link has its own check.',
      },
      positions: { signup: { x: 20, y: 50, scale: 1.05 }, cart: { x: 48, y: 50, scale: 1 }, pay: { x: 76, y: 50, scale: 1 } },
      beams: [{ from: 'signup', to: 'cart' }, { from: 'cart', to: 'pay' }],
    },
    {
      caption: {
        tr: 'Ödeme servisi 200 OK döndürür — buton tıklaması, network isteği, HTTP durum kodu HEPSİ "başarılı" görünür.',
        en: 'The payment service returns 200 OK — the button click, the network request, the HTTP status code all LOOK "successful".',
      },
      positions: { pay: { x: 25, y: 45, scale: 1, opacity: 0.6 }, shallow: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'pay', to: 'shallow', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Sadece "Satın Al butonuna tıklandı mı?" diye kontrol eden SIĞ bir test burada PASS olur — ama işlemin GERÇEKTEN tamamlandığını hiç sormaz.',
        en: 'A SHALLOW test that only checks "was the Buy button clicked?" PASSes right here — but never asks whether the transaction ACTUALLY completed.',
      },
      positions: { shallow: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Kontrast — perde arkasında: stok sayısı ASLA düşmedi, sipariş onay e-postası ASLA gönderilmedi. Bu SESSİZ bir kısmi hata — hiçbir hata mesajı fırlamadı.',
        en: 'Contrast — behind the curtain: the stock count NEVER decremented, the order confirmation email NEVER sent. This is a SILENT partial failure — no error was ever thrown.',
      },
      positions: { shallow: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, silentBreak: { x: 62, y: 55, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Zincir testi ise "Siparişiniz Alındı" METNİNİ ve yeni URL\'i AYRI AYRI doğrular — bu ek katman, sığ testin kaçırdığı sessiz hatayı yakalar.',
        en: 'The chain test, however, verifies the "Order Received" TEXT and the new URL SEPARATELY — this extra layer catches the silent failure the shallow test missed.',
      },
      positions: { silentBreak: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, chainCatch: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'silentBreak', to: 'chainCatch', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Final — Java analojisi: bir mikroservis zincirinde her adımı ayrı ayrı doğrulayan bir entegrasyon testi ile, sadece "endpoint 200 döndürüyor mu?" diye bakan sığ bir health-check arasındaki fark budur. Production incident\'lar genelde bu sığ kontrolün arkasına saklanır.',
        en: 'Final — the Java analogy: this is the difference between an integration test that verifies each step of a microservice chain separately, versus a shallow health-check that only asks "does the endpoint return 200?". Production incidents usually hide behind that shallow check.',
      },
      positions: { chainCatch: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
  ],
}

// 🚨 Yaygın Hatalar — tıbbi teşhis raporu analojisiyle zengin hata mesajı filmi
const playwrightRichErrorFilm = {
  type: 'video-scene',
  id: 'playwright-rich-error-film',
  title: {
    tr: '🎬 Aynı Hata, İki Farklı Rapor',
    en: '🎬 The Same Failure, Two Different Reports',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'fail3am',  emoji: '🌙', label: { tr: 'Test 03:14\'te CI\'da Patlıyor', en: 'Test Fails at 3:14 AM in CI' }, color: '#0ea5e9' },
    { id: 'seleniumMsg', emoji: '📄', label: { tr: 'Selenium: "NoSuchElementException"', en: 'Selenium: "NoSuchElementException"' }, color: '#dc2626' },
    { id: 'hoursGhost', emoji: '⏳', label: { tr: 'Saatlerce Lokal Tekrar Koşum', en: 'Hours of Local Re-running' },  color: '#dc2626' },
    { id: 'pwMsg',    emoji: '📋', label: { tr: 'Playwright: Locator + State + Screenshot', en: 'Playwright: Locator + State + Screenshot' }, color: '#8b5cf6' },
    { id: 'rootCause', emoji: '🔍', label: { tr: 'Kök Neden — Saniyeler İçinde',  en: 'Root Cause — Within Seconds' },   color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'CI pipeline\'ında bir test 03:14\'te başarısız olur — hiç kimse ekranı canlı izlemiyordu, sadece bir kırmızı bildirim var.',
        en: 'A test fails in the CI pipeline at 3:14 AM — nobody is watching live, there\'s just a red notification.',
      },
      positions: { fail3am: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Kontrast — Selenium/Java raporu: "NoSuchElementException" — sadece bir sınıf adı. Sorun locator\'da mı, zamanlamada mı, yanlış iframe\'de mi? Rapor cevap vermiyor.',
        en: 'Contrast — the Selenium/Java report: "NoSuchElementException" — just a class name. Is the problem the locator, the timing, the wrong iframe? The report doesn\'t say.',
      },
      positions: { fail3am: { x: 15, y: 45, scale: 0.85, opacity: 0.5 }, seleniumMsg: { x: 55, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'fail3am', to: 'seleniumMsg', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Mühendis sabah bu raporla karşılaşır: kod içine System.out.println() satırları eklemesi, lokalde tekrar tekrar çalıştırması ve saatlerce tahmin yürütmesi gerekir.',
        en: 'The engineer sees this report in the morning: they must add System.out.println() lines, re-run locally over and over, and guess for hours.',
      },
      positions: { seleniumMsg: { x: 25, y: 40, scale: 0.9, opacity: 0.6 }, hoursGhost: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'seleniumMsg', to: 'hoursGhost', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Playwright raporu: "TimeoutError: locator.click: Timeout 30000ms exceeded — waiting for locator(\'#submit-btn\') to be visible" — HANGİ locator, HANGİ durum, NE kadar süre net biçimde yazar.',
        en: 'The Playwright report: "TimeoutError: locator.click: Timeout 30000ms exceeded — waiting for locator(\'#submit-btn\') to be visible" — it clearly states WHICH locator, WHAT state, and HOW LONG it waited.',
      },
      code: { tr: `TimeoutError: waiting for locator('#submit-btn') to be visible`, en: `TimeoutError: waiting for locator('#submit-btn') to be visible` },
      positions: { fail3am: { x: 12, y: 35, scale: 0.75, opacity: 0.35 }, pwMsg: { x: 55, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Mesajın yanında otomatik bir screenshot ve trace de gelir — mühendis lokalde HİÇBİR ŞEY çalıştırmadan mesajı okuyup kök nedeni saniyeler içinde görür.',
        en: 'An automatic screenshot and trace come attached to the message — the engineer reads it and sees the root cause within seconds, without running ANYTHING locally.',
      },
      positions: { pwMsg: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, rootCause: { x: 60, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'pwMsg', to: 'rootCause', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — investigation süresi saatlerden dakikalara iner, çünkü teşhis işi hata OLUŞTUĞU anda zaten yapılmıştır — mühendisin tek işi raporu OKUMAKTIR.',
        en: 'Final — investigation time drops from hours to minutes, because the diagnostic work was already done the moment the failure happened — the engineer\'s only job is to READ the report.',
      },
      positions: { rootCause: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
  ],
}

const playwrightErrorDiagnosisSteps = {
  type: 'step-animation',
  id: 'playwright-error-diagnosis-steps-01',
  title: { tr: 'Adım Adım: Bir Playwright Hata Mesajını Okuma', en: 'Step by Step: Reading a Playwright Error Message' },
  steps: [
    { id: 1, icon: '🏷️', label: { tr: 'Hata sınıfı', en: 'Error class' }, detail: { tr: 'TimeoutError, Error: strict mode violation gibi — hatanın KATEGORİSİNİ söyler.', en: 'TimeoutError, Error: strict mode violation, etc. — tells you the CATEGORY of failure.' } },
    { id: 2, icon: '🎯', label: { tr: 'Hangi locator', en: 'Which locator' }, detail: { tr: 'Mesajın içinde locator("#submit-btn") gibi TAM OLARAK hangi elementin arandığı yazar.', en: 'The message states EXACTLY which element was being searched for, e.g. locator("#submit-btn").' } },
    { id: 3, icon: '⏱️', label: { tr: 'Ne kadar beklendi', en: 'How long it waited' }, detail: { tr: 'Timeout 30000ms exceeded — 30 saniye boyunca koşulun hiç sağlanmadığını gösterir, sabit bir sleep değil.', en: 'Timeout 30000ms exceeded — shows the condition never became true for a full 30 seconds, not a fixed sleep.' } },
    { id: 4, icon: '📋', label: { tr: 'Hangi durum bekleniyordu', en: 'Which state was expected' }, detail: { tr: 'to be visible / to be enabled gibi — Playwright TAM OLARAK neyi kontrol ettiğini söyler.', en: 'to be visible / to be enabled, etc. — Playwright states EXACTLY what it was checking.' } },
    { id: 5, icon: '📸', label: { tr: 'Ekli kanıt', en: 'Attached evidence' }, detail: { tr: 'trace: "on-first-retry" ayarlıysa otomatik screenshot + trace.zip eklenir — lokalde tekrar koşuma gerek kalmaz.', en: 'With trace: "on-first-retry", an automatic screenshot + trace.zip is attached — no local re-run needed.' } },
  ],
}

const playwrightErrorDiagnosisPractice = {
  type: 'code-playground',
  relatedTopicId: 'playwright-error-diagnosis-practice-01',
  id: 'playwright-error-diagnosis-practice-01',
  label: { tr: 'Micro Lab: Doğru Hata Ayıklama Adımını Seç', en: 'Micro Lab: Pick the Right Debugging Fix' },
  language: 'typescript',
  task: {
    tr: 'Amaç: "strict mode violation: locator(\'.btn\') resolved to 5 elements" hatasını al. TODO satırını, sayfadaki TEK doğru "Submit" butonunu hedefleyen bir locator ile tamamla.',
    en: 'Goal: you got "strict mode violation: locator(\'.btn\') resolved to 5 elements". Complete the TODO line with a locator that targets exactly the ONE correct "Submit" button on the page.',
  },
  explanation: {
    tr: 'getByRole(\'button\', {name:\'Submit\'}) hem okunabilir hem de sağlamdır — sayfadaki tüm ".btn" class\'lı elementleri değil, ARIA rolüne ve görünen ismine göre TEK butonu hedefler.',
    en: 'getByRole(\'button\', {name:\'Submit\'}) is both readable and robust — instead of matching every ".btn"-classed element, it targets the ONE button by its ARIA role and visible name.',
  },
  code: {
    tr: `await page.getByRole('button', { name: 'Submit' }).click();`,
    en: `await page.getByRole('button', { name: 'Submit' }).click();`,
  },
  starterCode: {
    tr: `// Hata: strict mode violation: locator('.btn') resolved to 5 elements\n// TODO: sayfadaki TEK "Submit" butonunu hedefleyen locator'i yaz\nawait page.locator('.btn').click();`,
    en: `// Error: strict mode violation: locator('.btn') resolved to 5 elements\n// TODO: write a locator that targets the ONE "Submit" button\nawait page.locator('.btn').click();`,
  },
  solutionCode: {
    tr: `await page.getByRole('button', { name: 'Submit' }).click();`,
    en: `await page.getByRole('button', { name: 'Submit' }).click();`,
  },
  expected: {
    tr: 'Strict mode violation ortadan kalkar — locator artık sayfadaki 5 elementten değil, ARIA rolü "button" ve ismi "Submit" olan TEK elementten eşleşir.',
    en: 'The strict mode violation disappears — the locator now matches exactly ONE element by ARIA role "button" and name "Submit", not 5 elements on the page.',
  },
  hints: [
    { tr: 'CSS class\'ı yerine erişilebilirlik rolüne ve görünen isme bakan bir locator ara.', en: 'Look for a locator based on accessibility role and visible name, not a CSS class.' },
    { tr: 'Aradığın metod: getByRole(\'button\', {name:\'Submit\'}).', en: 'The method you need: getByRole(\'button\', {name:\'Submit\'}).' },
  ],
  xpReward: 10,
}

// 💼 50 Mülakat Sorusu — kariyer değerlendirme paneli filmi
const playwrightInterviewPanelFilm = {
  type: 'video-scene',
  id: 'playwright-interview-panel-film',
  title: {
    tr: '🎬 Mülakat Panelinin Gerçekten Aradığı Şey',
    en: '🎬 What the Interview Panel Is Really Looking For',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'basicQ',  emoji: '🟢', label: { tr: 'Basic — "getByRole nedir?"', en: 'Basic — "What is getByRole?"' },   color: '#22c55e' },
    { id: 'apiOnly', emoji: '📖', label: { tr: 'Sadece API Ezberi',          en: 'API Memorization Only' },          color: '#94a3b8' },
    { id: 'interQ',  emoji: '🟡', label: { tr: 'Intermediate — "storageState\'i CI\'da nasıl kullanırsın?"', en: 'Intermediate — "How do you use storageState in CI?"' }, color: '#f59e0b' },
    { id: 'decision', emoji: '🧭', label: { tr: 'Karar Verme Yeteneği',      en: 'Decision-Making Ability' },        color: '#f59e0b' },
    { id: 'advQ',    emoji: '🔴', label: { tr: 'Advanced — "POM mu, Fixture mi, ne zaman?"', en: 'Advanced — "POM or Fixture, when?"' }, color: '#8b5cf6' },
    { id: 'architect', emoji: '🏛️', label: { tr: 'Mimari Karar Verebilen Mühendis', en: 'Engineer Who Can Make Architecture Calls' }, color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Basic seviye soru: "getByRole nedir, Selenium\'daki karşılığı ne?" — bu katman sadece API bilgisini doğrular.',
        en: 'A Basic-level question: "What is getByRole, what\'s its Selenium equivalent?" — this layer only verifies API knowledge.',
      },
      positions: { basicQ: { x: 25, y: 50, scale: 1.1, pulse: true }, apiOnly: { x: 65, y: 55, scale: 1 } },
      beams: [{ from: 'basicQ', to: 'apiOnly' }],
    },
    {
      caption: {
        tr: 'Java/Selenium deneyimliysen bu katmanı kolayca geçersin — locator ve aksiyon sözdizimi zaten tanıdıktır.',
        en: 'If you have Java/Selenium experience, you breeze through this layer — the locator and action syntax already feels familiar.',
      },
      positions: { apiOnly: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Intermediate seviyede soru değişir: "storageState\'i CI\'da nasıl kullanırsın, rate-limit\'e nasıl çarpmazsın?" — artık gerçek iş senaryosunda KARAR VERME yeteneğin ölçülüyor.',
        en: 'At Intermediate level the question shifts: "How do you use storageState in CI, how do you avoid hitting rate limits?" — now your DECISION-MAKING ability in a real scenario is being measured.',
      },
      positions: { apiOnly: { x: 15, y: 45, scale: 0.85, opacity: 0.5 }, interQ: { x: 45, y: 55, scale: 1.1, pulse: true }, decision: { x: 78, y: 55, scale: 1.1, pulse: true } },
      beams: [{ from: 'interQ', to: 'decision', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Advanced seviyede soru mimariye taşınır: "Bu senaryoda Page Object mi Fixture mı kullanırsın, neden?" — artık senden bir TASARIM KARARI ve gerekçesi isteniyor.',
        en: 'At Advanced level the question moves to architecture: "In this scenario, would you use a Page Object or a Fixture, and why?" — now you\'re asked for a DESIGN DECISION and its justification.',
      },
      positions: { decision: { x: 15, y: 40, scale: 0.85, opacity: 0.5 }, advQ: { x: 55, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'decision', to: 'advQ', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Bu 3 katman birlikte seni "API\'yi bilen" biri değil, "bir takımın tasarım toplantısında mimari karar alabilen" biri olarak konumlandırır.',
        en: 'Together, these 3 layers position you not as someone who "knows the API," but as someone who "can make architecture decisions in a team\'s design meeting."',
      },
      positions: { advQ: { x: 20, y: 40, scale: 0.85, opacity: 0.5 }, architect: { x: 62, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'advQ', to: 'architect', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Final — Java köprüsü: bu, bir Java mülakatındaki "Collections.sort() nasıl çalışır?" (Basic) ile "hangi durumda ConcurrentHashMap yerine synchronized kullanırsın?" (Advanced) arasındaki farkın ta kendisidir.',
        en: 'Final — the Java bridge: this is the exact same gap between "how does Collections.sort() work?" (Basic) and "when would you choose synchronized over ConcurrentHashMap?" (Advanced) in a Java interview.',
      },
      positions: { architect: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
  ],
}

const playwrightInterviewPrepSteps = {
  type: 'step-animation',
  id: 'playwright-interview-prep-steps-01',
  title: { tr: 'Adım Adım: Bir Senaryo Sorusuna Cevap Kurma', en: 'Step by Step: Structuring an Answer to a Scenario Question' },
  steps: [
    { id: 1, icon: '🎯', label: { tr: 'Sorunun katmanını tanı', en: 'Identify the question\'s layer' }, detail: { tr: 'Basic mi (API bilgisi), Intermediate mi (senaryo kararı), Advanced mi (mimari gerekçe) — cevabının derinliği buna göre ayarlanır.', en: 'Basic (API knowledge), Intermediate (scenario decision), or Advanced (architecture rationale) — calibrate your answer\'s depth accordingly.' } },
    { id: 2, icon: '☕', label: { tr: 'Java köprüsü kur', en: 'Build the Java bridge' }, detail: { tr: 'Mümkünse cevabını "Selenium/Java\'da bu şöyleydi, Playwright\'ta böyle" şeklinde çerçevele — bu, deneyimini somutlaştırır.', en: 'Whenever possible, frame your answer as "in Selenium/Java this was X, in Playwright it\'s Y" — this makes your experience concrete.' } },
    { id: 3, icon: '📐', label: { tr: 'Somut bir örnek ver', en: 'Give a concrete example' }, detail: { tr: 'Soyut tanım yerine gerçek bir kod satırı veya gerçek bir senaryo anlat — "storageState kullanırım" değil, "auth.json\'a yazıp use bloğunda yüklerim" de.', en: 'Instead of an abstract definition, describe a real code line or real scenario — not "I use storageState" but "I write it to auth.json and load it in the use block".' } },
    { id: 4, icon: '⚖️', label: { tr: 'Trade-off\'u adlandır', en: 'Name the trade-off' }, detail: { tr: 'İleri seviye sorularda "her zaman X kullanırım" demek zayıf bir cevaptır — "X\'i şu durumda, Y\'yi şu durumda tercih ederim" demek seni mimar gibi gösterir.', en: 'At advanced levels, "I always use X" is a weak answer — "I prefer X in this case, Y in that case" makes you sound like an architect.' } },
  ],
}

const playwrightInterviewPractice = {
  type: 'code-playground',
  relatedTopicId: 'playwright-interview-practice-01',
  id: 'playwright-interview-practice-01',
  label: { tr: 'Micro Lab: Senaryo Sorusuna Kod ile Cevap Ver', en: 'Micro Lab: Answer a Scenario Question with Code' },
  language: 'typescript',
  task: {
    tr: 'Amaç: Mülakatta "200 testin her biri UI\'dan login yapıyor ve rate-limit\'e takılıyoruz, ne yaparsın?" sorusuna kod ile cevap ver. TODO satırını, kaydedilmiş oturumu YÜKLEYEN doğru config alanıyla tamamla.',
    en: 'Goal: in an interview, answer "each of our 200 tests logs in via the UI and we\'re hitting the rate limit — what would you do?" with code. Complete the TODO line with the correct config field that LOADS the saved session.',
  },
  explanation: {
    tr: 'use: {storageState: \'auth.json\'} her worker\'ın tarayıcısını ZATEN GİRİŞ YAPMIŞ olarak açar — login sadece auth.spec.ts\'de bir kere test edilir, kalan 199 test bu satırla oturumu devralır.',
    en: 'use: {storageState: \'auth.json\'} opens every worker\'s browser ALREADY LOGGED IN — login is tested only once, in auth.spec.ts, and this line lets the other 199 tests inherit that session.',
  },
  code: {
    tr: `export default defineConfig({\n  use: { storageState: 'auth.json' },\n});`,
    en: `export default defineConfig({\n  use: { storageState: 'auth.json' },\n});`,
  },
  starterCode: {
    tr: `export default defineConfig({\n  use: {\n    // TODO: kaydedilmis oturumu (auth.json) yukleyen alani ekle\n  },\n});`,
    en: `export default defineConfig({\n  use: {\n    // TODO: add the field that loads the saved session (auth.json)\n  },\n});`,
  },
  solutionCode: {
    tr: `export default defineConfig({\n  use: { storageState: 'auth.json' },\n});`,
    en: `export default defineConfig({\n  use: { storageState: 'auth.json' },\n});`,
  },
  expected: {
    tr: 'Artık 199 testin hiçbiri UI\'dan login yapmıyor — hepsi auth.json\'daki oturumu doğrudan yüklüyor, rate-limit riski ortadan kalkıyor.',
    en: 'Now none of the 199 tests log in via the UI — they all load the session from auth.json directly, and the rate-limit risk disappears.',
  },
  hints: [
    { tr: 'context.storageState() ile KAYDETTİĞİN dosyayı, use bloğunda hangi alanla geri YÜKLERSİN?', en: 'Which field in the use block LOADS back the file you SAVED with context.storageState()?' },
    { tr: 'Aradığın alan: storageState.', en: 'The field you need: storageState.' },
  ],
  xpReward: 10,
}

const s6 = {
  tr: {
    title: '📁 Dosya · Network İzleme · API Mock',
    blocks: [
      {
        type: 'simple-box', emoji: '🌐',
        content: 'Playwright\'ın page.route() mekanizması, bir ağ trafiği denetim noktasındaki özel posta müdürü gibi çalışır: hangi mektubu (HTTP isteği) istersen durdurup içeriğini değiştirebilir, farklı bir adrese yönlendirebilir ya da hiç teslim etmeden sahte bir cevap üretebilirsin. Peki Selenium bunu neden yapamıyordu? Selenium yalnızca tarayıcı UI\'ını kontrol eder, ağ katmanına hiç dokunmaz; API çağrısını yakalamak için Selenium\'un dışında ayrı bir proxy server (BrowserMob Proxy, Charles, mitmproxy) kurman, sertifika hatalarını yönetmen ve proxy\'yi driver\'a bağlaman gerekiyordu — Java\'da bu kurulum onlarca satır konfigürasyon demekti. Playwright ise tarayıcının network stack\'ine doğrudan bağlanır (Chrome DevTools Protocol üzerinden), bu yüzden page.route("**/api/products", route => route.fulfill({body: JSON.stringify(mockData)})) gibi tek bir satırla gerçek backend olmadan UI testleri koşabilirsin. QA için pratik anlam: backend henüz hazır değilken frontend testlerini bloke olmadan yazmak, rate-limited veya ücretli üçüncü parti API\'leri test sırasında devre dışı bırakmak ve hata yanıtlarını (500, 401, 429) kolayca simüle ederek edge case\'leri UI katmanında test etmek mümkün hale gelir.',
      },
      { type: 'heading', text: '1️⃣ Dosya Yükleme (Upload)' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Dosya yükleme
import { test } from '@playwright/test';
import path from 'path';

test('file upload', async ({ page }) => {
  await page.goto('https://automationexercise.com/upload');

  // Tek dosya yükleme
  await page.locator('input[type="file"]').setInputFiles('test-file.txt');

  // Birden fazla dosya
  await page.locator('input[type="file"]').setInputFiles([
    'file1.pdf',
    'file2.png',
    path.join(__dirname, 'fixtures', 'document.docx'),
  ]);

  // Drag & Drop ile dosya yükleme (file chooser)
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),        // dosya seçici açılmasını bekle
    page.getByText('Choose File').click(),   // butona tıkla
  ]);
  await fileChooser.setFiles('upload-me.jpg');

  await page.getByRole('button', { name: 'Upload' }).click();
  await page.locator('#upload-success').waitFor({ state: 'visible' });
});`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — dosya yükleme
from playwright.sync_api import Page

def test_file_upload(page: Page):
    page.goto("https://automationexercise.com/upload")

    # Tek dosya
    page.locator("input[type='file']").set_input_files("test-file.txt")

    # Birden fazla dosya
    page.locator("input[type='file']").set_input_files(["file1.pdf", "file2.png"])

    # File chooser ile
    with page.expect_file_chooser() as fc_info:
        page.get_by_text("Choose File").click()
    file_chooser = fc_info.value
    file_chooser.set_files("upload-me.jpg")

    page.get_by_role("button", name="Upload").click()`,
      },
      { type: 'heading', text: '2️⃣ Dosya İndirme (Download)' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Dosya indirme
test('file download', async ({ page }) => {
  await page.goto('https://example.com/downloads');

  // Download event bekle
  const [download] = await Promise.all([
    page.waitForEvent('download'),                    // indirme başlamasını bekle
    page.getByText('Download Report').click(),        // tetikle
  ]);

  // Dosyayı kaydet
  await download.saveAs('./downloads/' + download.suggestedFilename()); // önerilen isimle kaydet

  console.log('Dosya adı:', download.suggestedFilename());  // "report.pdf"
  console.log('Geçici yol:', await download.path());         // temp konumu
});`,
      },
      { type: 'heading', text: '3️⃣ Network İzleme ve API Mock' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Network interception & API mocking
import { test, expect } from '@playwright/test';

test('network mock', async ({ page }) => {

  // 1. API yanıtını taklit et (MOCK)
  await page.route('**/api/products', async route => {
    await route.fulfill({                             // yanıtı taklit et
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Mock Product', price: 99.99 }
      ]),
    });
  });

  // 2. İsteği değiştir (MODIFY)
  await page.route('**/api/login', async route => {
    const request = route.request();
    await route.continue({                            // isteği değiştirerek devam et
      headers: {
        ...request.headers(),
        'X-Test-Header': 'playwright-test',           // header ekle
      },
    });
  });

  // 3. İsteği engelle (BLOCK)
  await page.route('**/*.{png,jpg,jpeg,gif,svg}', route => route.abort()); // resimleri engelle (hız!)

  // 4. İsteği izle (SPY)
  const requests: string[] = [];
  page.on('request', req => requests.push(req.url()));
  page.on('response', async res => {
    if (res.url().includes('/api/')) {
      console.log(res.request().method() + ' ' + res.url() + ' → ' + res.status());
    }
  });

  await page.goto('https://automationexercise.com');
  console.log('Toplam istek:', requests.length);

  // 5. Belirli API yanıtını bekle
  const [response] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/products') && r.status() === 200),
    page.reload(),
  ]);
  const data = await response.json();
  expect(data[0].name).toBe('Mock Product');          // mock veri geldi mi?
});`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — API mock
from playwright.sync_api import Page, Route
import json

def test_api_mock(page: Page):
    # API yanıtını taklit et
    def mock_products(route: Route):
        route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps([{"id": 1, "name": "Mock Product", "price": 99.99}])
        )

    page.route("**/api/products", mock_products)

    # Resimleri engelle (test hızını artırır)
    page.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())

    # İsteği izle
    page.on("request", lambda req: print(f"→ {req.method} {req.url}"))
    page.on("response", lambda res: print(f"← {res.status} {res.url}"))

    page.goto("https://automationexercise.com")`,
      },
      playwrightNetworkMockFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir API çağrısını sahte veriyle yanıtlamak için hangi metod kullanılır?', en: 'Which method in Playwright intercepts an API call and returns fake data?' },
        options: [
          { id: 'a', text: 'page.intercept()' },
          { id: 'b', text: 'page.route() + route.fulfill()' },
          { id: 'c', text: 'page.mockAPI()' },
          { id: 'd', text: 'page.stub()' },
        ],
        correct: 'b',
        explanation: { tr: 'page.route(pattern, handler) ile URL pattern eşleştirip route.fulfill() ile sahte yanıt döndürürsün. route.continue() ise isteği değiştirerek gerçek sunucuya iletir.', en: 'page.route(pattern, handler) matches URL patterns, and route.fulfill() returns fake responses. route.continue() modifies and forwards the request to the real server.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Playwright'ta bir ağ isteğini (network request) durdurup içeriğini değiştirmek için hangi mekanizma kullanılır?",
            "en": "Which mechanism is used in Playwright to intercept and modify the content of a network request?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.on('request')"
            },
            {
                  "id": "b",
                  "text": "page.route() + route.fulfill()"
            },
            {
                  "id": "c",
                  "text": "page.hook()"
            },
            {
                  "id": "d",
                  "text": "page.replace()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "page.route() metodu ağ trafiğini izler ve belirli bir URL ile eşleştiğinde route.fulfill() kullanarak isteği sahte veya değiştirilmiş bir yanıtla sonlandırabilir.",
            "en": "The page.route() method intercepts network traffic, and when it matches a URL pattern, you can use route.fulfill() to terminate the request with a mocked or modified response."
      }
}
},
    ],
  },
  en: {
    title: '📁 File · Network · API Mock',
    blocks: [
      {
        type: 'simple-box', emoji: '🌐',
        content: 'Playwright\'s page.route() mechanism works like a specialized postal inspector at a network checkpoint: you can intercept any letter (HTTP request) you choose, alter its contents, redirect it to a different address, or generate a fake reply without ever delivering it. Why couldn\'t Selenium do this? Selenium only controls the browser UI and never touches the network layer; to intercept API calls you needed a separate proxy server outside of Selenium (BrowserMob Proxy, Charles, mitmproxy), had to manage SSL certificates, and wire the proxy into the driver — in Java this meant dozens of lines of configuration code. Playwright connects directly to the browser\'s network stack (via the Chrome DevTools Protocol), so a single line like page.route("**/api/products", route => route.fulfill({body: JSON.stringify(mockData)})) lets you run full UI tests without a real backend. The practical QA payoff: write frontend tests before the backend is ready without being blocked; silence rate-limited or paid third-party APIs during test runs; and easily simulate error responses (500, 401, 429) to test edge cases at the UI layer.',
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// File upload
import { test } from '@playwright/test';

test('file upload', async ({ page }) => {
  await page.goto('https://automationexercise.com/upload');

  // Single file
  await page.locator('input[type="file"]').setInputFiles('test-file.txt');

  // Multiple files
  await page.locator('input[type="file"]').setInputFiles(['file1.pdf', 'file2.png']);

  // Via file chooser dialog
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByText('Choose File').click(),
  ]);
  await fileChooser.setFiles('upload-me.jpg');
});`,
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Network mock
test('network mock', async ({ page }) => {
  // Mock API response
  await page.route('**/api/products', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 1, name: 'Mock Product', price: 99.99 }]),
    });
  });

  // Block images (speeds up tests)
  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());

  // Spy on requests
  page.on('request', req => console.log('→', req.method(), req.url()));
  page.on('response', res => console.log('←', res.status(), res.url()));

  await page.goto('https://automationexercise.com');
});`,
      },
      playwrightNetworkMockFilm,
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir API çağrısını sahte veriyle yanıtlamak için hangi metod kullanılır?', en: 'Which method in Playwright intercepts an API call and returns fake data?' },
        options: [
          { id: 'a', text: 'page.intercept()' },
          { id: 'b', text: 'page.route() + route.fulfill()' },
          { id: 'c', text: 'page.mockAPI()' },
          { id: 'd', text: 'page.stub()' },
        ],
        correct: 'b',
        explanation: { tr: 'page.route() + route.fulfill() ile API yanıtı taklit edilir.', en: 'page.route(pattern, handler) with route.fulfill() returns fake responses. route.continue() modifies and forwards to the real server.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Bir API yanıtını Playwright kullanarak mock'lamak için hangi ikili kullanılır?",
            "en": "Which combination is used to mock an API response using Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.intercept + response.send"
            },
            {
                  "id": "b",
                  "text": "page.route() + route.fulfill()"
            },
            {
                  "id": "c",
                  "text": "page.mock() + route.send()"
            },
            {
                  "id": "d",
                  "text": "page.handle() + route.mock()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "API yanıtlarını taklit etmek için page.route() ile rota tanımlanır ve route.fulfill() ile özel bir JSON veya durum kodu döndürülür.",
            "en": "To mock API responses, a route is defined with page.route(), and a custom JSON or status code is returned using route.fulfill()."
      }
}
},
    ],
  },
}

const s7 = {
  tr: {
    title: '🌍 Gerçek Hayat — E-Ticaret Tam Senaryo',
    blocks: [
      {
        type: 'simple-box', emoji: '🛒',
        content: 'E-ticaret kritik yol testi, bir havaalanındaki güvenlik zinciri denetimi gibidir: check-in, pasaport, güvenlik, biniş kapısı — tek bir halkası kırılırsa uçak kalkar ama yolcu geride kalır ve sistemi kim kırdı tam olarak anlaşılmaz. Aşağıdaki senaryo bu zincirin her halkasını ayrı bir test assertion ile denetler: "giriş başarılı mı, ürün sepete eklendi mi, stok düştü mü, ödeme servisi 200 döndü mü?" Peki bu senaryoyu neden Selenium/Java yerine Playwright ile yazmak mantıklı? Çünkü checkout akışı genellikle ödeme iframe\'i, email doğrulaması için yeni sekme ve API bekleme süreleri içerir — Selenium\'da bunların her biri ayrı WebDriverWait ve switchTo() satırları gerektirirdi. Playwright\'ta frameLocator, page.waitForResponse ve context.newPage() bu karmaşıklığı birkaç satıra indirir. QA gerçeği: e-ticaret sitelerinde "Satın Al" butonunun çalışması yetmez; ödeme servisi başarılı dönse bile sipariş onay e-postası gitmiyor, stok güncellenmiyor veya kullanıcı dashboard\'ı doğru siparişi göstermiyorsa production incident sayılır — bu yüzden tek bir aksiyon testi değil, uçtan uca (end-to-end) senaryo testi kritiktir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '🎯',
        title: 'Test Senaryosu',
        content: '1) automationexercise.com\'a git  2) Kayıt ol / Giriş yap  3) "Dress" ara  4) İlk ürünü sepete ekle  5) Sepete git  6) Ödeme bilgilerini doldur  7) Siparişi tamamla  8) Sipariş onay sayfasını doğrula',
      },
      { type: 'heading', text: 'TypeScript — Tam E2E Test' },
      {
        type: 'code', language: 'TypeScript',
        code: `// e2e/ecommerce.spec.ts — Tam e-ticaret senaryosu
import { test, expect } from '@playwright/test';

test.describe('E-Ticaret Akış Testi', () => {

  test('kayıt → ürün → sepet → ödeme', async ({ page }) => {

    // ─── 1. ANASAYFAYA GİT ───────────────────────────────────────
    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);        // başlık doğrula

    // ─── 2. KAYIT / GİRİŞ ────────────────────────────────────────
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page).toHaveURL(/login/);

    // Yeni kayıt
    await page.locator('[data-qa="signup-name"]').fill('Test User');
    await page.locator('[data-qa="signup-email"]').fill(\`test\${Date.now()}@example.com\`);
    await page.locator('[data-qa="signup-button"]').click();

    // Kayıt formu — kişisel bilgiler
    await page.locator('#id_gender1').check();                    // Bay
    await page.locator('#password').fill('Secure@123!');
    await page.locator('#first_name').fill('Test');
    await page.locator('#last_name').fill('User');
    await page.locator('#address1').fill('123 Test Street');
    await page.locator('#country').selectOption('Canada');
    await page.locator('#state').fill('Ontario');
    await page.locator('#city').fill('Toronto');
    await page.locator('#zipcode').fill('M5V 3L9');
    await page.locator('#mobile_number').fill('5551234567');
    await page.locator('[data-qa="create-account"]').click();

    // Kayıt başarı doğrula
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click();

    // ─── 3. ÜRÜN ARA ─────────────────────────────────────────────
    await page.getByRole('link', { name: 'Products' }).click();
    await page.locator('#search_product').fill('Dress');          // arama yap
    await page.locator('#submit_search').click();

    await expect(page.locator('.product-image-wrapper')).toHaveCount(
      await page.locator('.product-image-wrapper').count()        // en az 1 sonuç
    );

    // ─── 4. ÜRÜNÜ SEPETE EKLE ────────────────────────────────────
    const firstProduct = page.locator('.product-image-wrapper').first();
    await firstProduct.hover();                                   // hover ile "Add to Cart" göster
    await firstProduct.getByText('Add to cart').click();

    // Modal çıktı — "Continue Shopping" veya "View Cart" seç
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // ─── 5. SEPET SAYFASI ─────────────────────────────────────────
    await page.locator('#cart_items').getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('.cart_product')).toHaveCount(1);  // 1 ürün var mı?

    // ─── 6. ÖDEMEYE GEÇ ───────────────────────────────────────────
    await page.getByText('Proceed To Checkout').click();

    // Sipariş notu
    await page.locator('#ordermsg textarea').fill('Lütfen dikkatli paketleyin');
    await page.getByText('Place Order').click();

    // ─── 7. ÖDEME BİLGİLERİ ──────────────────────────────────────
    await page.locator('[data-qa="name-on-card"]').fill('Test User');
    await page.locator('[data-qa="card-number"]').fill('4111111111111111');
    await page.locator('[data-qa="cvc"]').fill('123');
    await page.locator('[data-qa="expiry-month"]').fill('12');
    await page.locator('[data-qa="expiry-year"]').fill('2027');
    await page.locator('[data-qa="pay-button"]').click();

    // ─── 8. SİPARİŞ ONAYI ─────────────────────────────────────────
    await expect(page.getByText('ORDER PLACED!')).toBeVisible();  // onay mesajı
    await expect(page).toHaveURL(/order_placed/);                 // URL doğrula

    // Screenshot al — kanıt olarak sakla
    await page.screenshot({ path: 'evidence/order-confirmed.png', fullPage: true });
  });
});`,
      },
      { type: 'heading', text: 'Java — Aynı Senaryo' },
      {
        type: 'code', language: 'Java',
        code: `// EcommerceTest.java — Java Playwright E2E testi
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.*;
import org.junit.jupiter.api.*;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;
import java.util.regex.Pattern;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EcommerceTest {
    static Playwright playwright;
    static Browser browser;
    BrowserContext context;
    Page page;

    @BeforeAll
    static void setup() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(
            new BrowserType.LaunchOptions().setHeadless(false)
        );
    }

    @BeforeEach
    void createContext() {
        context = browser.newContext();
        page = context.newPage();
    }

    @Test
    @Order(1)
    void testFullEcommerceFlow() {
        // 1. Anasayfaya git
        page.navigate("https://automationexercise.com");
        assertThat(page).hasTitle(Pattern.compile("Automation Exercise"));

        // 2. Giriş yap
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Signup / Login")).click();
        page.locator("[data-qa='login-email']").fill("existing@test.com");
        page.locator("[data-qa='login-password']").fill("Secure@123!");
        page.locator("[data-qa='login-button']").click();
        assertThat(page.getByText("Logged in as")).isVisible();

        // 3. Ürün ara
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Products")).click();
        page.locator("#search_product").fill("Dress");
        page.locator("#submit_search").click();

        // 4. Sepete ekle
        page.locator(".product-image-wrapper").first().hover();
        page.locator(".product-image-wrapper").first()
            .getByText("Add to cart").click();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Continue Shopping")).click();

        // 5. Sepet
        page.navigate("https://automationexercise.com/view_cart");
        assertThat(page.locator(".cart_product")).hasCount(1);

        // 6. Ödeme
        page.getByText("Proceed To Checkout").click();
        page.getByText("Place Order").click();

        // 7. Kart bilgileri
        page.locator("[data-qa='name-on-card']").fill("Test User");
        page.locator("[data-qa='card-number']").fill("4111111111111111");
        page.locator("[data-qa='cvc']").fill("123");
        page.locator("[data-qa='expiry-month']").fill("12");
        page.locator("[data-qa='expiry-year']").fill("2027");
        page.locator("[data-qa='pay-button']").click();

        // 8. Onay
        assertThat(page.getByText("ORDER PLACED!")).isVisible();
        page.screenshot(new Page.ScreenshotOptions()
            .setPath(Paths.get("evidence/order-confirmed.png"))
            .setFullPage(true));
    }

    @AfterEach
    void cleanup() { context.close(); }

    @AfterAll
    static void teardown() {
        browser.close();
        playwright.close();
    }
}`,
      },
      { type: 'heading', text: 'Python — Aynı Senaryo' },
      {
        type: 'code', language: 'Python',
        code: `# test_ecommerce.py — Python Playwright E2E testi
import pytest
import re
import time
from playwright.sync_api import Page, expect

@pytest.fixture
def logged_in_page(page: Page):
    """Login fixture — her testte yeniden login yapmayı önler"""
    page.goto("https://automationexercise.com/login")
    page.locator("[data-qa='login-email']").fill("existing@test.com")
    page.locator("[data-qa='login-password']").fill("Secure@123!")
    page.locator("[data-qa='login-button']").click()
    expect(page.get_by_text("Logged in as")).to_be_visible()
    return page

def test_full_ecommerce_flow(logged_in_page: Page):
    page = logged_in_page

    # 3. Ürün ara
    page.get_by_role("link", name="Products").click()
    page.locator("#search_product").fill("Dress")
    page.locator("#submit_search").click()

    # 4. İlk ürünü sepete ekle
    first = page.locator(".product-image-wrapper").first()
    first.hover()                                                   # hover ile butonu göster
    first.get_by_text("Add to cart").click()
    page.get_by_role("button", name="Continue Shopping").click()

    # 5. Sepete git
    page.goto("https://automationexercise.com/view_cart")
    expect(page.locator(".cart_product")).to_have_count(1)         # 1 ürün

    # 6. Ödeme adımları
    page.get_by_text("Proceed To Checkout").click()
    page.get_by_text("Place Order").click()

    # 7. Kart bilgileri
    page.locator("[data-qa='name-on-card']").fill("Test User")
    page.locator("[data-qa='card-number']").fill("4111111111111111")
    page.locator("[data-qa='cvc']").fill("123")
    page.locator("[data-qa='expiry-month']").fill("12")
    page.locator("[data-qa='expiry-year']").fill("2027")
    page.locator("[data-qa='pay-button']").click()

    # 8. Sipariş onayı
    expect(page.get_by_text("ORDER PLACED!")).to_be_visible()
    expect(page).to_have_url(re.compile("order_placed"))

    # Kanıt screenshot
    page.screenshot(path="evidence/order-confirmed.png", full_page=True)

# Paralel çalıştır: pytest test_ecommerce.py -n 4 --headed`,
      },
      playwrightE2eSilentFailureFilm,
      {
        type: 'quiz',
        question: 'Yukarıdaki uçtan uca checkout senaryosunda, "Siparişi tamamla" adımından SONRA gelen "Sipariş onayını doğrula" adımı neden ayrı bir assertion gerektirir?',
        options: [
          { id: 'a', text: 'Çünkü ödeme her zaman başarısız olur' },
          { id: 'b', text: 'Çünkü bir butona tıklamak, işlemin gerçekten sunucu tarafında başarıyla tamamlandığını kanıtlamaz — UI state ile backend state ayrı doğrulanmalı' },
          { id: 'c', text: 'Çünkü Playwright otomatik olarak sipariş onayını doğrulamaz' },
          { id: 'd', text: 'Çünkü ekran görüntüsü almak zorunludur' },
        ],
        correct: 'b',
        explanation: 'Bir butona (ör. "Place Order") tıklamak sadece bir UI eylemidir — sunucunun isteği kabul ettiğini, ödemeyi işlediğini ve siparişi gerçekten oluşturduğunu garanti etmez. Bu yüzden test, "ORDER PLACED!" metnini ve URL\'in order_placed içerdiğini AYRICA doğrular. Java/JUnit\'te bir POST isteği gönderip sadece HTTP 200 almakla, response body\'deki gerçek veriyi assert etmek arasındaki farkla aynı mantık.',
        retryQuestion: {
          question: 'Bir test sadece `await page.click(\'#placeOrderBtn\')` çağırıp hiçbir assertion yapmazsa, sipariş gerçekte başarısız olsa bile test neden yine de "geçer"?',
          options: [
            { id: 'a', text: 'Playwright her tıklamayı otomatik doğrular' },
            { id: 'b', text: 'Test, hiçbir koşulu kontrol etmediği için sadece tıklamanın çalışıp çalışmadığına bakar — sonucun ne olduğuna değil' },
            { id: 'c', text: 'Sunucu her zaman başarılı yanıt döner' },
            { id: 'd', text: 'click() metodu otomatik olarak HTTP durumunu kontrol eder' },
          ],
          correct: 'b',
          explanation: 'Bir test sadece bir aksiyon çalıştırıp (`click()`) hiçbir `expect()`/assertion içermiyorsa, "geçme" kriteri sadece o satırın exception fırlatmadan çalışmasıdır — backend\'in isteği gerçekten kabul edip etmediğiyle hiç ilgisi yoktur. Bu yüzden her kritik aksiyondan sonra UI\'da veya backend\'de gözlemlenebilir bir sonucu (metin, URL, API yanıtı) doğrulayan bir assertion eklemek zorunludur.',
        },
      },
    ],
  },
  en: {
    title: '🌍 Real World — E-Commerce Full Scenario',
    blocks: [
      {
        type: 'simple-box', emoji: '🛒',
        content: 'An e-commerce critical path test is like an airport security chain audit: check-in, passport, security, boarding gate — if any single link breaks, the plane departs but the passenger is left behind, and nobody knows exactly which link failed. The scenario below inspects each link with a separate assertion: "did login succeed, was the product added to cart, did stock decrement, did the payment service return 200?" Why write this in Playwright rather than Selenium/Java? Because checkout flows typically involve a payment iframe, a new tab for email verification, and API wait times — in Selenium each of those meant separate WebDriverWait and switchTo() lines. In Playwright, frameLocator, page.waitForResponse, and context.newPage() collapse that complexity into a handful of lines. The QA reality: on an e-commerce site it\'s not enough for the "Buy" button to work. If the payment service returns success but the confirmation email never arrives, inventory doesn\'t update, or the user dashboard shows the wrong order — that\'s a production incident. That\'s why end-to-end scenario testing matters far more than testing a single action.',
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// e2e/ecommerce.spec.ts — Full E2E test
import { test, expect } from '@playwright/test';

test('register → product → cart → payment', async ({ page }) => {
  await page.goto('https://automationexercise.com');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Login
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page.locator('[data-qa="login-email"]').fill('test@example.com');
  await page.locator('[data-qa="login-password"]').fill('Secure@123!');
  await page.locator('[data-qa="login-button"]').click();

  // Search product
  await page.getByRole('link', { name: 'Products' }).click();
  await page.locator('#search_product').fill('Dress');
  await page.locator('#submit_search').click();

  // Add to cart
  const first = page.locator('.product-image-wrapper').first();
  await first.hover();
  await first.getByText('Add to cart').click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // View cart
  await page.goto('https://automationexercise.com/view_cart');
  await expect(page.locator('.cart_product')).toHaveCount(1);

  // Checkout
  await page.getByText('Proceed To Checkout').click();
  await page.getByText('Place Order').click();

  // Payment
  await page.locator('[data-qa="name-on-card"]').fill('Test User');
  await page.locator('[data-qa="card-number"]').fill('4111111111111111');
  await page.locator('[data-qa="cvc"]').fill('123');
  await page.locator('[data-qa="expiry-month"]').fill('12');
  await page.locator('[data-qa="expiry-year"]').fill('2027');
  await page.locator('[data-qa="pay-button"]').click();

  // Confirm
  await expect(page.getByText('ORDER PLACED!')).toBeVisible();
  await page.screenshot({ path: 'evidence/order-confirmed.png', fullPage: true });
});`,
      },
      playwrightE2eSilentFailureFilm,
      {
        type: 'quiz',
        question: 'In the end-to-end checkout scenario above, why does the "verify order confirmation" step AFTER "complete the order" require a separate assertion?',
        options: [
          { id: 'a', text: 'Because payment always fails' },
          { id: 'b', text: "Because clicking a button doesn't prove the operation actually succeeded server-side — UI state and backend state must be verified separately" },
          { id: 'c', text: 'Because Playwright automatically verifies order confirmation' },
          { id: 'd', text: 'Because taking a screenshot is mandatory' },
        ],
        correct: 'b',
        explanation: 'Clicking a button (e.g. "Place Order") is only a UI action — it does not guarantee the server accepted the request, processed payment, and actually created the order. That\'s why the test ALSO asserts the "ORDER PLACED!" text and that the URL contains order_placed. Same logic as in Java/JUnit: sending a POST request and only checking for HTTP 200 is not the same as asserting the actual data in the response body.',
        retryQuestion: {
          question: 'If a test only calls `await page.click(\'#placeOrderBtn\')` with no assertion at all, why does the test still "pass" even if the order actually failed?',
          options: [
            { id: 'a', text: 'Playwright automatically verifies every click' },
            { id: 'b', text: 'Without any condition being checked, the test only cares whether the click itself ran — not what the outcome was' },
            { id: 'c', text: 'The server always returns a success response' },
            { id: 'd', text: 'The click() method automatically checks the HTTP status' },
          ],
          correct: 'b',
          explanation: "If a test only runs an action (`click()`) with no `expect()`/assertion, its only \"pass\" criterion is that the line ran without throwing — it has nothing to do with whether the backend actually accepted the request. That's why every critical action needs a follow-up assertion verifying an observable outcome (text, URL, API response) in the UI or backend.",
        },
      },
    ],
  },
}

const s8 = {
  tr: {
    title: '🚨 Yaygın Hatalar — Hata Sözlüğü',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Playwright hata mesajları, iyi yazılmış bir tıbbi teşhis raporu gibidir: semptom belirsiz olsa da rapor hangi organda, ne zaman ve hangi koşulda sorun oluştuğunu kat kat açıklar. Peki Selenium hata mesajlarından Playwright hata mesajlarına geçince ne değişir? Selenium\'da "NoSuchElementException" gördüğünde hatanın locator\'dan mı, zamanlama sorunundann mı, yoksa sayfa yüklemesinden mi kaynaklandığını anlamak için Trace yok, screenshot yok, sadece stack trace vardı — ve genellikle saatlerce debug gerekirdi. Playwright\'da "Locator resolved to 2 elements" gibi bir mesaj, hem sorunu tanımlar hem de hangi iki elementin seçildiğini HTML çıktısıyla gösterir; "Timeout 30000ms exceeded while waiting for element to be visible" mesajı ise timeout süresini, beklenen durumu ve testin tam o anda nerede olduğunu içerir. Java\'daki NullPointerException gibi muğlak hatalar yerine eylem odaklı mesajlar alırsın. QA gerçeği: CI pipeline\'da sabah 3\'te patlayan bir test için hata mesajı ne kadar zenginse gündüz inceleme süresi o kadar kısa olur — Playwright\'ın detaylı hata ve otomatik screenshot özelliği bu investigation süresini önemli ölçüde kısaltır.',
      },
      playwrightRichErrorFilm,
      playwrightErrorDiagnosisSteps,
      {
        type: 'error-dictionary',
          relatedTopicId: 'playwright-errors',
        framework: 'Playwright',
        errors: [
          {
            error: 'TimeoutError: locator.click: Timeout 30000ms exceeded',
            fullMessage: 'TimeoutError: locator.click: Timeout 30000ms exceeded.\nCall log:\n  - waiting for locator("#submit-btn") to be visible',
            cause: { tr: 'Element 30 saniye içinde bulunamadı/görülemedi. Yanlış locator, element henüz yüklenmediyse veya farklı bir iframe içindeyse oluşur.', en: 'Element not found/visible within 30 seconds. Wrong locator, element not yet loaded, or inside an iframe.' },
            solution: { tr: '1) DevTools\'da locator\'ı kontrol et. 2) Element bir iframe içindeyse frameLocator() kullan. 3) Timeout\'u artır: locator.click({timeout:60000}). 4) waitFor() ile state bekle.', en: '1) Check locator in DevTools. 2) If inside iframe use frameLocator(). 3) Increase timeout: click({timeout:60000}). 4) Use waitFor() for state.' },
            codeWrong: `// YANLIŞ — element iframe içinde ama frameLocator yok
await page.locator('#card-number').fill('4111');   // TimeoutError!`,
            codeFixed: `// DOĞRU — iframe içindeyse frameLocator kullan
const frame = page.frameLocator('iframe[src*="payment"]');
await frame.locator('#card-number').fill('4111');  // çalışır`,
          },
          {
            error: 'Error: strict mode violation: locator resolved to X elements',
            fullMessage: 'Error: strict mode violation: locator(".button") resolved to 5 elements',
            cause: { tr: 'Locator birden fazla elementi eşleştiriyor. Playwright strict mode\'da tek eşleşme bekler.', en: 'The locator matches multiple elements. Playwright strict mode expects a single match.' },
            solution: { tr: '1) Daha özgün bir locator yaz. 2) .first()/.last()/.nth(n) kullan. 3) .filter() ile daralt.', en: '1) Write a more specific locator. 2) Use .first()/.last()/.nth(n). 3) Narrow down with .filter().' },
            codeWrong: `// YANLIŞ — ".btn" birden fazla elementi eşleştiriyor
await page.locator('.btn').click();   // strict mode violation!`,
            codeFixed: `// DOĞRU — 3 seçenek
await page.getByRole('button', { name: 'Submit' }).click();  // 1) rol + isim
await page.locator('.btn').first().click();                   // 2) ilk element
await page.locator('.product').filter({ hasText: 'Nike' })   // 3) filtrele
          .locator('.btn').click();`,
          },
          {
            error: 'Error: page.goto: net::ERR_CONNECTION_REFUSED',
            fullMessage: 'Error: page.goto: net::ERR_CONNECTION_REFUSED at https://localhost:3000',
            cause: { tr: 'Hedef sunucu çalışmıyor. Local dev server başlatılmamış veya yanlış port kullanılıyor.', en: 'Target server is not running. Local dev server not started or wrong port used.' },
            solution: { tr: '1) npm run dev / mvn spring-boot:run ile sunucuyu başlat. 2) playwright.config.ts\'te baseURL\'i kontrol et. 3) Test öncesinde webServer ayarı kullan.', en: '1) Start the server with npm run dev / mvn spring-boot:run. 2) Check baseURL in playwright.config.ts. 3) Use webServer config option.' },
            codeWrong: `// playwright.config.ts — baseURL yanlış
use: { baseURL: 'http://localhost:3000' }  // ama sunucu 8080'de çalışıyor`,
            codeFixed: `// DOĞRU — port ve webServer ayarı
webServer: {
  command: 'npm run dev',        // test öncesi sunucuyu otomatik başlat
  url: 'http://localhost:8080',
  reuseExistingServer: true,
},
use: { baseURL: 'http://localhost:8080' }`,
          },
          {
            error: 'Error: page has been closed',
            fullMessage: 'Error: page.locator.click: Target page, context or browser has been closed',
            cause: { tr: 'Test bittikten sonra page nesnesi üzerinde aksiyon yapılmaya çalışıldı. Genellikle async/await eksikliğinden kaynaklanan race condition.', en: 'An action was attempted on a page object after the test completed. Usually a race condition from missing async/await.' },
            solution: { tr: 'TypeScript\'te tüm Playwright çağrılarının önünde await olduğunu kontrol et. waitForEvent() veya waitForResponse() için Promise.all kullan.', en: 'Ensure all Playwright calls in TypeScript have await. Use Promise.all for waitForEvent() or waitForResponse().' },
            codeWrong: `// YANLIŞ — await eksik
page.locator('#btn').click();         // await yok — race condition
page.waitForURL('/dashboard');         // await yok`,
            codeFixed: `// DOĞRU — await her zaman
await page.locator('#btn').click();
await page.waitForURL('/dashboard');`,
          },
          {
            error: 'TimeoutError: expect(locator).toBeVisible() timeout',
            fullMessage: 'TimeoutError: expect(locator).toBeVisible() failed\nExpected: visible\nReceived: hidden',
            cause: { tr: 'expect() assertion\'ı default 5000ms içinde başarılı olamadı. Element var ama görünmüyor veya yüklenme çok uzun sürüyor.', en: 'The expect() assertion failed to succeed within the default 5000ms. The element exists but is hidden or loading takes too long.' },
            solution: { tr: '1) expect timeout\'unu artır: expect(locator, {timeout:10000}).toBeVisible(). 2) Assertion\'dan önce explicit wait ekle. 3) Doğru elementi hedeflediğini kontrol et.', en: '1) Increase assertion timeout: expect(locator, {timeout:10000}).toBeVisible(). 2) Add explicit wait before assertion. 3) Verify you\'re targeting the correct element.' },
            codeWrong: `// Yüklenme geç olunca timeout
await expect(page.locator('#result')).toBeVisible(); // 5s içinde görünmeyince hata`,
            codeFixed: `// Timeout artır
await expect(page.locator('#result')).toBeVisible({ timeout: 15_000 });

// YA DA önce bekle, sonra doğrula
await page.locator('#result').waitFor({ state: 'visible', timeout: 15_000 });
await expect(page.locator('#result')).toBeVisible();`,
          },
          {
            error: 'Error: browserType.launch: Executable doesn\'t exist',
            fullMessage: 'Error: browserType.launch: Executable doesn\'t exist at /home/user/.cache/ms-playwright/chromium-xxx/chrome-linux/chrome',
            cause: { tr: 'Playwright tarayıcıları indirilmemiş. "playwright install" komutu çalıştırılmamış veya CI ortamında eksik.', en: 'Playwright browsers not downloaded. "playwright install" was not run, or missing in CI environment.' },
            solution: { tr: '1) npx playwright install komutu çalıştır. 2) CI\'da: npx playwright install --with-deps. 3) Java\'da: mvn exec:java ... -D exec.args="install"', en: '1) Run npx playwright install. 2) In CI: npx playwright install --with-deps. 3) In Java: mvn exec:java ... -D exec.args="install"' },
            codeWrong: `# pip install playwright yaptın ama ikinci adımı unuttun
import playwright  # kurulu
browser = playwright.chromium.launch()  # ❌ tarayıcı bulunamadı!`,
            codeFixed: `# Önce tarayıcıları indir
# playwright install   ← terminalde çalıştır

from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()  # ✅ artık çalışır`,
          },
        ],
      },
      playwrightErrorDiagnosisPractice,
      {
        type: 'quiz',
        question: '`webServer: { command: "npm run dev", url: "http://localhost:8080" }` konfigürasyonu eksikken Playwright testleri "ECONNREFUSED" hatasıyla başarısız oluyorsa, en olası neden nedir?',
        options: [
          { id: 'a', text: 'Playwright sürümü eski' },
          { id: 'b', text: 'Test, uygulama sunucusu henüz başlamadan/dinlemeden tarayıcıyı o adrese yönlendirmeye çalışıyor' },
          { id: 'c', text: 'Tarayıcı binary\'si indirilmemiş' },
          { id: 'd', text: 'baseURL alanı zorunlu değildir' },
        ],
        correct: 'b',
        explanation: '`webServer` config bloğu olmadan Playwright, dev sunucusunun zaten ayakta olduğunu varsayar. Sunucu henüz dinlemiyorsa bağlantı reddedilir (ECONNREFUSED). `webServer` ayarı, testler başlamadan önce komutu çalıştırıp `url` alanındaki adres yanıt verene kadar bekler — CI ortamında bir Spring Boot/Express sunucusunu testlerden önce ayağa kaldırıp health-check beklemekle aynı mantık.',
        retryQuestion: {
          question: '`webServer` config\'inde `url` alanını YANLIŞ bir port (örn. uygulamanın gerçekte dinlediği port değil) olarak ayarlarsan ne olur?',
          options: [
            { id: 'a', text: 'Playwright otomatik olarak doğru portu bulur' },
            { id: 'b', text: 'Playwright o yanlış URL\'i sonsuza kadar (timeout\'a kadar) yoklar, sunucu gerçekte hazır olsa bile testler başlamaz' },
            { id: 'c', text: 'Test hemen başarısız olur, hiç beklemez' },
            { id: 'd', text: 'webServer ayarı tamamen devre dışı kalır' },
          ],
          correct: 'b',
          explanation: '`webServer.url`, Playwright\'in "sunucu hazır" kabul etmek için yokladığı (poll ettiği) adrestir. Yanlış bir port verilirse, gerçek sunucu farklı bir portta tamamen sağlıklı çalışıyor olsa bile Playwright o yanlış adresten asla 200 alamaz ve sonunda timeout ile başarısız olur — sorunun görünürdeki belirtisi "sunucu başlamadı" gibi görünse de gerçek kök neden yanlış yapılandırılmış URL\'dir.',
        },
      },
    ],
  },
  en: {
    title: '🚨 Common Errors — Error Dictionary',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Playwright error messages work like a well-written medical diagnosis report: even when the symptom is vague, the report spells out which organ was affected, when the problem occurred, and under what conditions. What changes when moving from Selenium errors to Playwright errors? In Selenium, when you saw "NoSuchElementException" you had no Trace, no screenshot, just a stack trace — figuring out whether it was a bad locator, a timing issue, or an incomplete page load often took hours. In Playwright, a message like "Locator resolved to 2 elements" both names the problem and shows you the HTML of both elements that were matched; "Timeout 30000ms exceeded while waiting for element to be visible" tells you the timeout duration, the expected state, and exactly where the test was at that moment. Instead of the ambiguous NullPointerExceptions you dealt with in Java, you get action-oriented messages. The QA reality: the richer the error message for a test that fails at 3 AM in CI, the shorter the investigation time the next morning — Playwright\'s detailed errors and automatic screenshots cut that investigation window significantly.',
      },
      playwrightRichErrorFilm,
      playwrightErrorDiagnosisSteps,
      {
        type: 'error-dictionary',
          relatedTopicId: 'playwright-errors',
        framework: 'Playwright',
        errors: [
          {
            error: 'TimeoutError: locator.click: Timeout 30000ms exceeded',
            fullMessage: 'TimeoutError: locator.click: Timeout 30000ms exceeded.\nCall log:\n  - waiting for locator("#submit-btn") to be visible',
            cause: { tr: 'Element 30 saniye içinde bulunamadı.', en: 'Element not found/visible within 30 seconds. Wrong locator, not yet loaded, or inside an iframe.' },
            solution: { tr: '1) Locator\'ı kontrol et. 2) frameLocator() kullan. 3) Timeout artır.', en: '1) Check locator in DevTools. 2) Use frameLocator() if inside iframe. 3) Increase timeout.' },
            codeWrong: `// Wrong — element is inside iframe but no frameLocator
await page.locator('#card-number').fill('4111');   // TimeoutError!`,
            codeFixed: `// Correct — use frameLocator for iframe content
const frame = page.frameLocator('iframe[src*="payment"]');
await frame.locator('#card-number').fill('4111');`,
          },
          {
            error: 'Error: strict mode violation: locator resolved to X elements',
            fullMessage: 'Error: strict mode violation: locator(".button") resolved to 5 elements',
            cause: { tr: 'Locator birden fazla elementi eşleştiriyor.', en: 'The locator matches multiple elements. Playwright strict mode expects exactly one match.' },
            solution: { tr: 'Daha özgün locator, .first(), veya .filter() kullan.', en: 'Write a more specific locator, use .first()/.nth(n), or narrow down with .filter().' },
            codeWrong: `// Wrong — ".btn" matches multiple elements
await page.locator('.btn').click();   // strict mode violation!`,
            codeFixed: `// Correct
await page.getByRole('button', { name: 'Submit' }).click();
// or
await page.locator('.btn').first().click();`,
          },
          {
            error: 'Error: page.goto: net::ERR_CONNECTION_REFUSED',
            fullMessage: 'Error: page.goto: net::ERR_CONNECTION_REFUSED at https://localhost:3000',
            cause: { tr: 'Sunucu çalışmıyor.', en: 'Target server is not running or wrong port.' },
            solution: { tr: 'Sunucuyu başlat, webServer config kullan.', en: 'Start the server first, or use playwright.config.ts webServer option to auto-start.' },
            codeWrong: `// Wrong baseURL in playwright.config.ts
use: { baseURL: 'http://localhost:3000' }  // server runs on 8080!`,
            codeFixed: `// Correct — with auto-start
webServer: { command: 'npm run dev', url: 'http://localhost:8080' },
use: { baseURL: 'http://localhost:8080' }`,
          },
        ],
      },
      playwrightErrorDiagnosisPractice,
      {
        type: 'quiz',
        question: 'If Playwright tests fail with "ECONNREFUSED" when the `webServer: { command: "npm run dev", url: "http://localhost:8080" }` config is missing, what is the most likely cause?',
        options: [
          { id: 'a', text: 'The Playwright version is outdated' },
          { id: 'b', text: "The test is navigating the browser to that address before the app server has started listening" },
          { id: 'c', text: 'The browser binary was not downloaded' },
          { id: 'd', text: 'The baseURL field is not required' },
        ],
        correct: 'b',
        explanation: "Without the `webServer` config block, Playwright assumes the dev server is already running. If the server isn't listening yet, the connection is refused (ECONNREFUSED). The `webServer` setting runs the command and waits for the `url` to respond before tests start — the same logic as spinning up a Spring Boot/Express server and waiting on a health check before running tests in CI.",
        retryQuestion: {
          question: 'What happens if you set the `webServer` config\'s `url` field to the WRONG port (not the one the app actually listens on)?',
          options: [
            { id: 'a', text: 'Playwright automatically finds the correct port' },
            { id: 'b', text: 'Playwright keeps polling that wrong URL until timeout, and tests never start even though the server is actually ready' },
            { id: 'c', text: 'The test fails immediately with no waiting' },
            { id: 'd', text: 'The webServer setting is disabled entirely' },
          ],
          correct: 'b',
          explanation: '`webServer.url` is the address Playwright polls to consider the server "ready." If given the wrong port, Playwright will never get a 200 from that wrong address even if the real server is perfectly healthy on a different port — it eventually fails with a timeout. The visible symptom looks like "server never started," but the real root cause is a misconfigured URL.',
        },
      },
    ],
  },
}
const s9 = {
  tr: {
    title: '💼 50 Mülakat Sorusu',
    blocks: [
      {
        type: 'simple-box', emoji: '🎯',
        content: 'Bu 50 soru, bir mülakat panelinin hazırladığı bütünlük sınavı gibidir: her soru önceki bilginin üzerine inşa edilir — temeli sağlam olmadan ileri konularda gerçek iş deneyimi gibi konuşamazsın, ve mülakatta bu fark saniyeler içinde ortaya çıkar. Peki neden Playwright mülakat soruları Java/Selenium mülakat sorularından farklı bir hazırlık gerektiriyor? Çünkü Playwright mülakatları artık sadece "API nasıl kullanılır?" değil, "auto-wait ne zaman yetmez, neden ek waitForSelector gerekir?", "storageState\'i CI\'da nasıl kullanırsın?", "Page Object ile Fixture farkı ne, hangisini ne zaman tercih edersin?" gibi mimari kararları sorgular. Java\'da Selenium deneyimliysen locator ve aksiyon sorularını kolayca geçersin, ama TypeScript async/await semantiği, Playwright test runner özellikleri ve network mocking soruları sürpriz olabilir. Bu 50 soru, tam da bu açıkları hedefler: Basic, teknik bilgiyi doğrular; Intermediate, gerçek iş senaryolarında karar verme yeteneğini ölçer; Advanced, seni bir takımın tasarım toplantısında mimari kararlar alabilen biri olarak konumlandırır.',
      },
      playwrightInterviewPanelFilm,
      playwrightInterviewPrepSteps,
      playwrightInterviewPractice,
      {
        type: 'interview-questions',
          relatedTopicId: 'playwright',
        topic: 'Playwright',
        questions: [
          { level: 'basic', q: 'Playwright nedir ve Selenium\'dan farkı nedir?', a: 'Playwright, Microsoft\'un 2020\'de geliştirdiği modern tarayıcı otomasyon kütüphanesidir. TypeScript, JavaScript, Python, Java ve C# destekler. En önemli farkı: auto-wait sayesinde elementlerin yüklenmesini otomatik bekler, explicit wait yazmak gerekmez. Tek API ile Chromium, Firefox ve WebKit kontrolü sağlar.' },
          { level: 'basic', q: 'Playwright kurulumu nasıl yapılır? (TypeScript için)', a: 'npm init playwright@latest komutu çalıştırılır. @playwright/test paketi yüklenir, playwright.config.ts oluşturulur, tarayıcılar indirilir (npx playwright install), örnek test dosyaları oluşturulur. Ardından npx playwright test ile testler çalıştırılır.' },
          { level: 'basic', q: 'Playwright\'ta tarayıcı nasıl başlatılır ve kapatılır?', a: 'Test framework\'te browser yönetimi otomatiktir. Manuel: const browser = await playwright.chromium.launch(); const page = await browser.newPage(); ... await browser.close(). Java\'da: Browser browser = playwright.chromium().launch(); Page page = browser.newPage(); ... browser.close();' },
          { level: 'basic', q: 'page.goto() nedir ve nasıl kullanılır?', a: 'page.goto(url) ile belirtilen URL\'ye gidilir, varsayılan olarak load event\'ini bekler. Opsiyonel: page.goto(url, { waitUntil: "networkidle" }). Java\'da: page.navigate("https://example.com");' },
          { level: 'basic', q: 'Playwright\'ta element nasıl bulunur?', a: 'Önerilen sıra: 1) getByRole() — aria role ile (en iyi pratik), 2) getByText() — görünür metin ile, 3) getByLabel() — form label ile, 4) getByTestId() — data-testid ile, 5) locator(css/xpath). Selenium\'dan farkı: ID/class/xpath yerine anlam taşıyan locator\'lar tercih edilir.' },
          { level: 'basic', q: 'click(), fill(), type() metodları arasındaki fark nedir?', a: 'fill() inputu temizler sonra değeri tek seferde yazar — hızlıdır, production\'da tercih edilir. type() klavye tuşlarını birer birer simüle eder — key event dinleyen inputlar için gereklidir. click() elementin tıklanabilir olmasını bekler, hover+focus+click yapar.' },
          { level: 'basic', q: 'Playwright\'ta auto-wait mekanizması nasıl çalışır?', a: 'Her aksiyon (click, fill vb.) öncesinde element\'in visible, stable, enabled ve editable durumunu otomatik bekler. Thread.sleep() veya explicit WebDriverWait yazmak gerekmez. Ek bekleme gerekirse: await page.waitForURL(pattern), await locator.waitFor({ state: "visible" }) kullanılır.' },
          { level: 'basic', q: 'expect() ile assertion nasıl yapılır?', a: 'await expect(locator).toBeVisible() — görünür mü?, await expect(locator).toHaveText("text") — içerik doğru mu?, await expect(page).toHaveURL(/pattern/) — URL doğru mu?, await expect(locator).toHaveCount(3) — sayı. Java: assertThat(page.locator("#id")).isVisible();' },
          { level: 'basic', q: 'playwright.config.ts nedir, ne içerir?', a: 'Merkezi konfigürasyon: baseURL, timeout, retries, workers, projects (tarayıcı/viewport), reporter (console/html/junit), use (headless, screenshot, video). Maven\'daki pom.xml\'e benzer.' },
          { level: 'basic', q: 'Headless ve headed mod arasındaki fark nedir?', a: 'Headless: tarayıcı arayüzü yok — CI/CD\'de tercih edilir, hızlıdır. Headed: gerçek tarayıcı penceresi — debug için. chromium.launch({ headless: false }) headed, headless: true (default) headless. Config: use: { headless: false }.' },
          { level: 'basic', q: 'Screenshot nasıl alınır?', a: 'page.screenshot({ path: "s.png" }) viewport; page.screenshot({ path: "s.png", fullPage: true }) tam sayfa. Element: locator.screenshot({ path: "el.png" }). Config: use: { screenshot: "on" } her test sonrası otomatik, "only-on-failure" sadece hata olunca.' },
          { level: 'basic', q: 'Video kayıt nasıl yapılır?', a: 'Config\'de use: { video: "on" } veya "retain-on-failure". Testler sonrası test-results/ klasöründe video oluşur. Manuel: browser.newContext({ recordVideo: { dir: "videos/" } }) — context.close() ile kaydedilir.' },
          { level: 'basic', q: 'Playwright\'ta test nasıl çalıştırılır?', a: 'npx playwright test — tüm testler; npx playwright test login.spec.ts — belirli dosya; --grep "login" — regex filtre; --headed — tarayıcıyla; --ui — interaktif UI mode; --debug — Playwright Inspector adım adım. Java: mvn test -Dtest=LoginTest.' },
          { level: 'basic', q: 'getByRole() neden en çok tercih edilir?', a: 'ARIA standartlarına göre arar: 1) CSS class değişse test kırılmaz, 2) Accessibility uyumludur, 3) Kullanıcının gördüğünü hedefler. page.getByRole("button", { name: "Submit" }) butonu bulur. Selenium\'da By.cssSelector(".btn") kırılgandır.' },
          { level: 'basic', q: 'Playwright\'ta test raporu nasıl üretilir?', a: 'npx playwright test --reporter=html ile HTML rapor üretilir. npx playwright show-report tarayıcıda açar. Config: reporter: [["html", { open: "never" }], ["junit", { outputFile: "results.xml" }]]. junit reporter Jenkins/GitLab entegrasyonu için kullanılır.' },
          { level: 'intermediate', q: 'Page Object Model (POM) Playwright\'ta nasıl uygulanır?', a: 'Her sayfa için class, constructor\'a Page: class LoginPage { constructor(page) { this.emailInput = page.locator("[data-qa=\'login-email\']"); } async login(e, p) { await this.emailInput.fill(e); } }. Test\'te: const lp = new LoginPage(page); await lp.login(). Java POM ile birebir aynıdır.' },
          { level: 'intermediate', q: 'fixtures nedir ve nasıl kullanılır?', a: 'test.extend() ile özel fixture: const test = base.extend({ loggedInPage: async ({ page }, use) => { await login(page); await use(page); } }); Her testte tekrar login yazmak yerine inject edilir. Java @BeforeEach+@AfterEach gibi ama daha modüler.' },
          { level: 'intermediate', q: 'beforeEach, afterEach, beforeAll, afterAll ne zaman kullanılır?', a: 'beforeEach: her test öncesi (login, sayfa). afterEach: her test sonrası (cleanup). beforeAll: suite başında bir kez (DB seed). afterAll: tüm testler bitince (browser kapat). Java @BeforeEach, @AfterEach, @BeforeAll, @AfterAll annotation\'ları ile aynıdır.' },
          { level: 'intermediate', q: 'iframe içindeki elementlere nasıl erişilir?', a: 'Selenium\'da driver.switchTo().frame(). Playwright\'ta frameLocator() — geçiş gerekmez: const frame = page.frameLocator(\'iframe[src*="payment"]\'); await frame.locator(\'#card-number\').fill(\'4111\'); İşlem sonrası otomatik ana frame\'e dönülür — switchTo().defaultContent() yazmak gerekmez.' },
          { level: 'intermediate', q: 'Alert, Confirm ve Prompt dialoglarını nasıl handle edersiniz?', a: 'page.on("dialog", dialog => dialog.accept()) ile accept, dialog.dismiss() ile red, dialog.fill("text") ile prompt değeri. Listener ÖNCE tanımlanmalı, tetikleyici aksiyon sonra. Selenium: driver.switchTo().alert().accept(). Playwright\'ta switchTo() yoktur.' },
          { level: 'intermediate', q: 'Çoklu sayfa (multi-tab) ve yeni pencere nasıl yönetilir?', a: 'const [newPage] = await Promise.all([context.waitForEvent("page"), page.getByText("Open Tab").click()]); await newPage.waitForLoadState(); Java: Page newPage = context.waitForPage(() -> page.click(loc)). Selenium driver.getWindowHandles() + switchTo().window() yerine.' },
          { level: 'intermediate', q: 'page.route() ile API interception nasıl yapılır?', a: 'await page.route("**/api/products", route => route.fulfill({ status: 200, body: JSON.stringify([{id:1}]) })); İstekleri yakalar, sahte yanıt döndürür. route.continue() gerçek sunucuya iletir, route.abort() engeller. Selenium\'da BrowserMob Proxy gibi harici araç gerekirdi.' },
          { level: 'intermediate', q: 'Playwright\'ta paralel test çalıştırma nasıl yapılır?', a: 'Config: workers: 4 (veya process.env.CI ? 2 : 4). Farklı dosyalar varsayılan paralel, aynı dosya sıralı. test.describe.parallel() aynı dosyada paralel, test.describe.serial() zorunda sıralı. Java JUnit 5 @Execution(ExecutionMode.CONCURRENT) gibi.' },
          { level: 'intermediate', q: 'Playwright Trace Viewer nedir?', a: 'Her aksiyonu, network isteğini, screenshot ve console log\'u kaydeder. Config: use: { trace: "on-first-retry" }. npx playwright show-trace trace.zip ile görüntülenir. CI\'da hata ayıklamak için idealdir.' },
          { level: 'intermediate', q: 'locator.filter() nasıl kullanılır?', a: 'page.locator(".product").filter({ hasText: "Nike" }) — sadece "Nike" içerenleri bulur. .filter({ has: page.locator(".in-stock") }) — içinde belirli element olanları. Java stream().filter() ile WebElement listesi filtrelemeye benzer ama okunabilirdir.' },
          { level: 'intermediate', q: 'Playwright\'ta test data nasıl yönetilir?', a: '1) fixtures/ klasöründe JSON/CSV, 2) @faker-js/faker ile random data, 3) request fixture ile API\'den data, 4) beforeAll\'da DB seed. En iyi pratik: her test kendi datasını oluşturur ve temizler. Shared mutable data paralelde çakışır.' },
          { level: 'intermediate', q: 'Authentication nasıl hızlandırılır?', a: 'storageState ile: 1) Login yapıp kaydet: await page.context().storageState({ path: "auth.json" }), 2) Testlerde yükle: use: { storageState: "auth.json" }. Login bir kez, cookie/localStorage tüm testlere. Java: Browser.NewContextOptions().setStorageStatePath(...).' },
          { level: 'intermediate', q: 'Visual regression testing nedir?', a: 'expect(page).toHaveScreenshot("home.png") referans alır, sonraki çalıştırmalarda pixel karşılaştırır. Güncelleme: --update-snapshots. Threshold: toHaveScreenshot({ maxDiffPixelRatio: 0.1 }). Built-in — Applitools gerekmez.' },
          { level: 'intermediate', q: 'Soft assertions nedir, ne zaman kullanılır?', a: 'Normal assertion başarısızlıkta testi durdurur. Soft: expect.soft(locator).toBeVisible() — tüm kontroller yapılır, sonda raporlanır. Form validasyonunda tüm hata mesajlarını tek geçişte kontrol etmek için idealdir. Java AssertJ SoftAssertions ile aynı konsept.' },
          { level: 'intermediate', q: 'Network request spy nasıl yapılır?', a: 'page.on("request", cb) ve page.on("response", cb). Belirli istek beklemek: const [resp] = await Promise.all([page.waitForResponse(r => r.url().includes("/api/data")), page.click("#load")]); const data = await resp.json(); Backend entegrasyon testleri için çok değerlidir.' },
          { level: 'advanced', q: 'BrowserContext nedir, Page\'den farkı nedir?', a: 'BrowserContext tarayıcı içinde izole oturum — kendi cookie, localStorage, session\'ına sahip ayrı "profil". Bir Context içinde birden fazla Page (sekme). Örnek: iki kullanıcıyı simüle için iki context. browser.newContext() ile context, context.newPage() ile sekme.' },
          { level: 'advanced', q: 'Playwright\'ı CI/CD pipeline\'ına nasıl entegre edersiniz?', a: 'GitHub Actions: npx playwright install --with-deps, npx playwright test. workers: process.env.CI ? 2 : 4. Artifacts: upload-artifact ile test-results/ ve playwright-report/. Jenkins: sh("npx playwright test --reporter=junit") + JUnit publish. Paralel: --shard=N/M + matrix strategy.' },
          { level: 'advanced', q: 'Test sharding nedir, nasıl kullanılır?', a: 'Büyük suite\'leri CI runner\'lara böler. 100 test, 4 runner: --shard=1/4, --shard=2/4 vb. Sonra: npx playwright merge-reports blob-reports/ tek rapor. GitHub Actions matrix strategy ile kurulur. Java Maven failsafe plugin fork count\'a benzer.' },
          { level: 'advanced', q: 'Component testing vs E2E testing farkı nedir?', a: '@playwright/experimental-ct-react ile React/Vue komponentleri izole test edilir. E2E: tüm uygulama gerçek tarayıcıda. Component: sadece komponent mount edilir — çok daha hızlı. const comp = await mount(<Button label="OK" />); await expect(comp).toContainText("OK");' },
          { level: 'advanced', q: 'request fixture ile API testing nasıl yapılır?', a: 'Built-in: const response = await request.post("/api/login", { data: { email, password } }); expect(response.status()).toBe(200); const body = await response.json(); APIRequestContext ile cookie taşıyarak authenticated çağrı. Java: playwright.request().newContext();' },
          { level: 'advanced', q: 'Shadow DOM elementi nasıl handle edilir?', a: 'Playwright locator\'ları Shadow DOM\'u otomatik pierce eder — Selenium\'daki JavascriptExecutor hack\'ine gerek yoktur. page.locator(".inner-button") ile Shadow DOM içindeki elemente direkt erişilir. Playwright\'ın en büyük üstünlüklerinden biridir.' },
          { level: 'advanced', q: 'Electron, mobile ve desktop uygulama testleri nasıl yapılır?', a: 'Electron: playwright.electron.launch({ executablePath }). Mobile emulation: use: { ...devices["iPhone 13"] } — UserAgent+viewport otomatik. Desktop: use: { viewport: { width: 1920, height: 1080 } }. Real device: Appium bridge veya Mobile Playwright (beta).' },
          { level: 'advanced', q: 'Custom reporter nasıl yazılır?', a: 'class MyReporter { onBegin(c,s){} onTestEnd(t,r){} onEnd(r){} }. module.exports = MyReporter. Config: reporter: [["./my-reporter.js"]]. Kullanım: Slack bildirim, dashboard güncelleme, DB\'ye yazma. Java TestNG ITestListener veya JUnit Extension\'ın karşılığı.' },
          { level: 'advanced', q: 'Performans metrikleri nasıl ölçülür?', a: 'Web Vitals: page.evaluate(() => JSON.stringify(window.performance.timing)). CDP Session: const client = await page.context().newCDPSession(page); await client.send("Performance.enable"); const perf = await client.send("Performance.getMetrics"). Network event\'lerinden timing bilgisi alınabilir.' },
          { level: 'advanced', q: '@playwright/test vs playwright core farkı nedir?', a: '@playwright/test: test runner + assertion + fixture + reporter + parallelism — tam framework. playwright: sadece browser automation, test runner yok. @playwright/test daima tercih edilir: browser/page/context/request fixture\'ları otomatik yönetilir, parallel/retry/reporting built-in.' },
          { level: 'advanced', q: 'Geolocation, permissions ve clipboard nasıl test edilir?', a: 'browser.newContext({ geolocation: { latitude: 41.0082, longitude: 28.9784 }, permissions: ["geolocation"] }). Kamera/mikrofon: ["camera","microphone"]. Bildirim: ["notifications"]. Headless modda da çalışır — Playwright izinleri doğrudan tarayıcıya verir.' },
          { level: 'advanced', q: 'Debugging için en iyi araçlar nelerdir?', a: 'PWDEBUG=1 npx playwright test ile Inspector. await page.pause() ile test durur, manuel devam. npx playwright test --ui görsel mode. Trace Viewer: trace:"on". page.on("console", msg => console.log(msg)) tarayıcı console. Java\'da da PWDEBUG çalışır.' },
          { level: 'advanced', q: 'Retry mekanizması ve flaky test azaltma?', a: 'Config: retries: 2. test.describe.configure({ retries: 3 }) suite için. Flaky nedenler: 1) sleep yerine auto-wait, 2) test order bağımlılığı, 3) shared state paralelde çakışma, 4) CI kaynak yetersizliği. Çözüm: her test kendi datasını oluşturur ve temizler.' },
          { level: 'advanced', q: 'Accessibility (a11y) testi nasıl yapılır?', a: '@axe-core/playwright: const results = await new AxeBuilder({ page }).analyze(); expect(results.violations).toEqual([]). Kurallar: .withRules(["color-contrast"]). Element: .include("#main"). getByRole, getByLabel locator\'ları accessibility\'i de artırır.' },
          { level: 'advanced', q: 'Web scraping Playwright ile nasıl yapılır?', a: 'const names = await page.locator(".product-name").allTextContents(); tüm isimleri array döndürür. page.$$eval(".price", els => els.map(el => el.textContent)) alternatif. Test vs Scraping: testler assertion yapar; scraping veri çeker. Üretimde playwright-extra + stealth bot tespitini önler.' },
          { level: 'advanced', q: 'Type-safe Page Object TypeScript\'te nasıl yazılır?', a: 'interface PageLocators { email: Locator; password: Locator; } class LoginPage { readonly locators: PageLocators; constructor(private page: Page) { this.locators = { email: page.locator("[data-qa=\'login-email\']"), password: page.locator("[data-qa=\'login-password\']") }; } async login(e: string, p: string): Promise<void> { await this.locators.email.fill(e); } }' },
          { level: 'advanced', q: 'Playwright Codegen nedir, production\'da kullanılır mı?', a: 'npx playwright codegen https://example.com ile aksiyonlar otomatik TS/Python/Java koduna dönüşür. Production için önerilmez: kırılgan CSS locator üretir, POM uygulamaz, assertion eklemez. Locator keşfi ve prototip için hızlıdır — başlangıç noktası olarak kullan, manuel refine et.' },
          { level: 'advanced', q: 'Docker\'da test nasıl çalıştırılır?', a: 'mcr.microsoft.com/playwright:v1.44.0-focal resmi image. FROM mcr.microsoft.com/playwright:v1.44.0-focal; WORKDIR /app; COPY . .; RUN npm ci; CMD ["npx","playwright","test"]. Tüm tarayıcı bağımlılıkları dahil — ayrıca install gerekmez. Java: mcr.microsoft.com/playwright/java image.' },
          { level: 'advanced', q: 'Custom wait stratejisi nasıl yazılır?', a: 'await page.waitForFunction(() => window.dataLoaded === true, { timeout: 10000 }); Locator: await locator.waitFor({ state: "visible", timeout: 15000 }); Poll+retry: await expect(async () => { const c = await page.locator(".item").count(); expect(c).toBeGreaterThan(5); }).toPass({ timeout: 30000 }); toPass() çok güçlü.' },
          { level: 'advanced', q: 'Playwright\'ı Selenium\'a tercih etmeniz veya etmemeniz için gerçek senaryo?', a: 'Tercih ederim: 1) Modern SPA — auto-wait ile az flaky test, 2) API mocking — page.route() proxy ihtiyacı yok, 3) Multi-browser tek API, 4) CI/CD hızı. Tercih etmem: 1) IE desteği gerekiyorsa, 2) Büyük Selenium codebase. Gerçek: Fintech payment iframe — Selenium 3 switchTo()+explicit wait; Playwright frameLocator()+auto-wait 3 satır, sıfır flakiness.' },
        ],
      },
    ],
  },
  en: {
    title: '💼 50 Interview Questions',
    blocks: [
      {
        type: 'simple-box', emoji: '🎯',
        content: 'These 50 questions work like a comprehensive qualification exam assembled by a panel: each question builds on the previous one — without a solid foundation you can\'t talk through advanced topics the way someone with real production experience would, and in an interview that gap surfaces within seconds. Why do Playwright interview questions require different preparation than Java/Selenium ones? Because Playwright interviews no longer just ask "how do you use the API?" — they probe architectural decisions: "when does auto-wait fall short and why do you need an explicit waitForSelector?", "how do you use storageState in CI?", "what\'s the difference between Page Object and Fixture, and which do you prefer when?" If you have a Selenium/Java background, locator and action questions will be easy, but TypeScript async/await semantics, Playwright test runner features, and network mocking questions may catch you off guard. These 50 questions target exactly those gaps: Basic verifies technical knowledge; Intermediate measures your decision-making in real job scenarios; Advanced positions you as someone who can make architectural decisions in a team design meeting.',
      },
      playwrightInterviewPanelFilm,
      playwrightInterviewPrepSteps,
      playwrightInterviewPractice,
      {
        type: 'interview-questions',
          relatedTopicId: 'playwright',
        topic: 'Playwright',
        questions: [
          { level: 'basic', q: 'What is Playwright and how does it differ from Selenium?', a: 'Playwright is a modern browser automation library by Microsoft (2020). Supports TypeScript, JavaScript, Python, Java, C#. Key difference: auto-wait automatically waits for elements to load, eliminating explicit waits. Single API controls Chromium, Firefox, and WebKit.' },
          { level: 'basic', q: 'How do you install Playwright for TypeScript?', a: 'Run npm init playwright@latest — installs @playwright/test, creates playwright.config.ts, downloads browsers (npx playwright install), generates example tests. Then npx playwright test to execute.' },
          { level: 'basic', q: 'How do you launch and close a browser in Playwright?', a: 'With test framework, browser management is automatic. Manually: const browser = await playwright.chromium.launch(); const page = await browser.newPage(); ... await browser.close(); Java: Browser browser = playwright.chromium().launch(); Page page = browser.newPage(); ... browser.close();' },
          { level: 'basic', q: 'What is page.goto() and how is it used?', a: 'page.goto(url) navigates to the URL, waits for load event by default. Optional: page.goto(url, { waitUntil: "networkidle" }). Java: page.navigate("https://example.com");' },
          { level: 'basic', q: 'What are the recommended locator strategies in Playwright?', a: 'In order: 1) getByRole() — aria role (best practice), 2) getByText() — visible text, 3) getByLabel() — form label, 4) getByTestId() — data-testid, 5) locator(css/xpath). Unlike Selenium\'s brittle CSS/XPath locators, Playwright prefers semantic ones.' },
          { level: 'basic', q: 'What is the difference between fill(), type(), and click()?', a: 'fill() clears then types at once — fast, preferred in production. type() simulates key-by-key — needed for inputs with key listeners. click() waits for clickable state, does hover+focus+click. fill() ≈ Selenium clear() + sendKeys().' },
          { level: 'basic', q: 'How does Playwright\'s auto-wait mechanism work?', a: 'Before each action (click, fill, etc.) Playwright auto-waits for element to be visible, stable, enabled, and editable — eliminating Thread.sleep() or WebDriverWait. For extra waits: page.waitForURL(pattern), locator.waitFor({ state: "visible" }), page.waitForResponse(url).' },
          { level: 'basic', q: 'How do you make assertions in Playwright?', a: 'await expect(locator).toBeVisible(), await expect(locator).toHaveText("text"), await expect(page).toHaveURL(/pattern/), await expect(locator).toHaveCount(3). Java: assertThat(page.locator("#id")).isVisible(). Replaces JUnit assertEquals.' },
          { level: 'basic', q: 'What does playwright.config.ts contain?', a: 'Central config: baseURL, timeout, retries, workers, projects (browser/viewport combos), reporter (console/html/junit), use (headless, screenshot, video). Similar to Maven\'s pom.xml.' },
          { level: 'basic', q: 'What is the difference between headless and headed mode?', a: 'Headless: no browser UI — preferred in CI/CD, faster. Headed: real browser window — for debugging. chromium.launch({ headless: false }) for headed, true (default) for headless. Config: use: { headless: false }.' },
          { level: 'basic', q: 'How do you take screenshots?', a: 'page.screenshot({ path: "s.png" }) for viewport; page.screenshot({ path: "s.png", fullPage: true }) for full page. Element: locator.screenshot({ path: "el.png" }). Config: use: { screenshot: "on" } after every test, "only-on-failure" for failures.' },
          { level: 'basic', q: 'How do you record video in Playwright?', a: 'Config: use: { video: "on" } or "retain-on-failure". Videos saved in test-results/. Manually: browser.newContext({ recordVideo: { dir: "videos/" } }) — context.close() saves the video.' },
          { level: 'basic', q: 'How do you run Playwright tests?', a: 'npx playwright test — all; npx playwright test login.spec.ts — specific file; --grep "login" — regex filter; --headed — with browser; --ui — interactive UI mode; --debug — Inspector step-by-step. Java: mvn test -Dtest=LoginTest.' },
          { level: 'basic', q: 'Why is getByRole() the most preferred locator?', a: 'Uses ARIA standards: 1) CSS class changes don\'t break tests, 2) Accessibility-aligned, 3) Targets what users see. page.getByRole("button", { name: "Submit" }) finds Submit button. Selenium By.cssSelector(".btn") is brittle to refactoring.' },
          { level: 'basic', q: 'How do you generate test reports?', a: 'npx playwright test --reporter=html generates HTML report. npx playwright show-report opens in browser. Config supports multiple: reporter: [["html"],["junit",{outputFile:"results.xml"}]]. JUnit reporter for Jenkins/GitLab integration.' },
          { level: 'intermediate', q: 'How do you implement Page Object Model (POM) in Playwright?', a: 'Create class per page, pass Page in constructor: class LoginPage { constructor(page) { this.emailInput = page.locator("[data-qa=\'login-email\']"); } async login(e,p) { await this.emailInput.fill(e); } }. In tests: const lp = new LoginPage(page); await lp.login(). Identical to Java POM pattern.' },
          { level: 'intermediate', q: 'What are Playwright fixtures and how are they used?', a: 'const test = base.extend({ loggedInPage: async ({ page }, use) => { await login(page); await use(page); } }); Injects fixture instead of repeating login. Similar to Java @BeforeEach + @AfterEach but more modular and composable.' },
          { level: 'intermediate', q: 'When do you use beforeEach, afterEach, beforeAll, afterAll?', a: 'beforeEach: before each test (login, navigate). afterEach: after each (cleanup). beforeAll: once before all (DB seed). afterAll: once after all (browser close). Maps to Java @BeforeEach, @AfterEach, @BeforeAll, @AfterAll.' },
          { level: 'intermediate', q: 'How do you handle iframes in Playwright?', a: 'Selenium: driver.switchTo().frame(). Playwright: frameLocator() — no switching: const frame = page.frameLocator(\'iframe[src*="payment"]\'); await frame.locator(\'#card-number\').fill(\'4111\'); Auto-returns to main frame after interaction — no switchTo().defaultContent() needed.' },
          { level: 'intermediate', q: 'How do you handle Alert, Confirm, and Prompt dialogs?', a: 'page.on("dialog", dialog => dialog.accept()) to accept; dialog.dismiss() to reject; dialog.fill("text") for prompts. Listener must be registered BEFORE the triggering action. Selenium: driver.switchTo().alert().accept(). No switchTo() in Playwright.' },
          { level: 'intermediate', q: 'How do you manage multiple tabs and new windows?', a: 'const [newPage] = await Promise.all([context.waitForEvent("page"), page.getByText("Open Tab").click()]); await newPage.waitForLoadState(); Java: Page newPage = context.waitForPage(() -> page.click(loc)). Replaces Selenium getWindowHandles() + switchTo().window().' },
          { level: 'intermediate', q: 'How do you intercept API calls with page.route()?', a: 'await page.route("**/api/products", route => route.fulfill({ status: 200, body: JSON.stringify([{id:1}]) })); Intercepts matching requests, returns fake response. route.continue() forwards; route.abort() blocks. Selenium needed external tools like BrowserMob Proxy.' },
          { level: 'intermediate', q: 'How do you run Playwright tests in parallel?', a: 'Config: workers: 4 (or process.env.CI ? 2 : 4). Files run parallel by default; same-file tests sequential. test.describe.parallel() for same-file parallel; test.describe.serial() for forced sequential. Like JUnit 5 @Execution(ExecutionMode.CONCURRENT).' },
          { level: 'intermediate', q: 'What is Playwright Trace Viewer?', a: 'Records every action, network request, screenshot, console log. Config: use: { trace: "on-first-retry" }. View: npx playwright show-trace trace.zip. Ideal for debugging CI failures — see exactly what happened at each step without re-running locally.' },
          { level: 'intermediate', q: 'How do you use locator.filter()?', a: 'page.locator(".product").filter({ hasText: "Nike" }) — only "Nike" items. .filter({ has: page.locator(".in-stock") }) — items with specific child element. Similar to Java stream().filter() on WebElement lists but far more readable.' },
          { level: 'intermediate', q: 'How do you manage test data in Playwright?', a: '1) JSON/CSV in fixtures/, 2) @faker-js/faker for random data, 3) request fixture for API data, 4) DB seed in beforeAll. Best practice: each test creates and cleans its own data. Shared mutable data causes conflicts in parallel runs.' },
          { level: 'intermediate', q: 'How do you speed up authentication in Playwright?', a: 'storageState: 1) Login once and save: await page.context().storageState({ path: "auth.json" }), 2) Tests load: use: { storageState: "auth.json" }. Login happens once, cookies/localStorage shared. Java: Browser.NewContextOptions().setStorageStatePath(...).' },
          { level: 'intermediate', q: 'What is visual regression testing in Playwright?', a: 'expect(page).toHaveScreenshot("home.png") takes reference; subsequent runs do pixel comparison. Update: --update-snapshots. Threshold: toHaveScreenshot({ maxDiffPixelRatio: 0.1 }). Built-in — no Applitools needed.' },
          { level: 'intermediate', q: 'What are soft assertions and when do you use them?', a: 'Normal assertion stops test on failure. Soft: expect.soft(locator).toBeVisible() — all checks run, failures reported at end. Use case: form validation, checking all error messages in one pass. Same as AssertJ SoftAssertions in Java.' },
          { level: 'intermediate', q: 'How do you spy on network requests?', a: 'page.on("request", cb) and page.on("response", cb). Await specific request: const [resp] = await Promise.all([page.waitForResponse(r => r.url().includes("/api/data")), page.click("#load")]); const data = await resp.json(); Validates API response after UI actions.' },
          { level: 'advanced', q: 'What is BrowserContext and how does it differ from Page?', a: 'BrowserContext is an isolated session — own cookies, localStorage, session, like a separate browser profile. Multiple Pages (tabs) open within one Context. Use case: two Contexts to simulate two users simultaneously. browser.newContext() creates context, context.newPage() opens tab.' },
          { level: 'advanced', q: 'How do you integrate Playwright into a CI/CD pipeline?', a: 'GitHub Actions: npx playwright install --with-deps, npx playwright test. workers: process.env.CI ? 2 : 4. Artifacts: upload-artifact for test-results/ and playwright-report/. Jenkins: sh("npx playwright test --reporter=junit") + JUnit publish. Parallel: --shard=N/M + matrix strategy.' },
          { level: 'advanced', q: 'What is test sharding in Playwright?', a: 'Splits large suites across CI runners: 100 tests, 4 runners → --shard=1/4, --shard=2/4, etc. Then: npx playwright merge-reports blob-reports/ to combine. GitHub Actions matrix strategy makes it easy. Analogous to Maven failsafe plugin fork count.' },
          { level: 'advanced', q: 'How does Playwright handle Shadow DOM?', a: 'Playwright locators automatically pierce Shadow DOM — no need for Selenium\'s JavascriptExecutor hack. page.locator(".inner-button") directly accesses Shadow DOM elements. One of Playwright\'s biggest advantages over Selenium.' },
          { level: 'advanced', q: 'How do you write a custom reporter?', a: 'class MyReporter { onBegin(c,s){} onTestEnd(t,r){} onEnd(r){} }. module.exports = MyReporter. Config: reporter:[["./my-reporter.js"]]. Use cases: Slack notifications, dashboard updates, DB writes. Equivalent to TestNG ITestListener or JUnit Extension in Java.' },
          { level: 'advanced', q: 'How do you use the request fixture for API testing?', a: 'Built-in: const response = await request.post("/api/login", { data: { email, password } }); expect(response.status()).toBe(200); const body = await response.json(); APIRequestContext carries cookies for authenticated calls. Java: playwright.request().newContext();' },
          { level: 'advanced', q: 'What is toPass() and when should you use it?', a: 'Polls async assertion until pass or timeout: await expect(async () => { const c = await page.locator(".item").count(); expect(c).toBeGreaterThan(5); }).toPass({ timeout: 30000 }); Use when exact timing is unknown — waiting for background jobs. More powerful than waitForFunction() for complex assertions.' },
          { level: 'advanced', q: 'How do you run Playwright tests in Docker?', a: 'Use mcr.microsoft.com/playwright:v1.44.0-focal image. FROM mcr.microsoft.com/playwright:v1.44.0-focal; WORKDIR /app; COPY . .; RUN npm ci; CMD ["npx","playwright","test"]. All browser deps included — no playwright install needed. Java: mcr.microsoft.com/playwright/java image.' },
          { level: 'advanced', q: 'How do you test geolocation and browser permissions?', a: 'browser.newContext({ geolocation: { latitude: 41.0082, longitude: 28.9784 }, permissions: ["geolocation"] }). Camera/mic: ["camera","microphone"]. Notifications: ["notifications"]. Works in headless — Playwright grants permissions directly to the browser.' },
          { level: 'advanced', q: 'When would you choose Playwright over Selenium, and when not?', a: 'Choose Playwright: 1) Modern SPA — auto-wait minimizes flaky tests, 2) API mocking — page.route() eliminates proxy, 3) Multi-browser single API, 4) CI/CD speed — parallel+sharding built-in. Avoid: 1) IE required, 2) Large Selenium codebase — migration cost. Real: Fintech payment iframe — Selenium needed 3 switchTo() calls; Playwright: frameLocator()+auto-wait in 3 lines, zero flakiness.' },
          { level: 'advanced', q: 'How do you create and use a custom fixture with test.extend()?', a: 'test.extend({ loggedInPage: async ({ page }, use) => { await page.goto("/login"); await page.fill("#email", "qa@test.com"); await page.click("#submit"); await use(page); } }) defines a reusable setup that runs before every test using it. Tests then just write test("dashboard loads", async ({ loggedInPage }) => {...}) — no repeated login code. This is the Playwright equivalent of a JUnit5 @ExtendWith resolver or a TestNG @BeforeMethod, but scoped per-fixture instead of per-class.' },
          { level: 'advanced', q: 'How do you handle file downloads in a Playwright test?', a: 'Wrap the triggering action in a Promise.all with page.waitForEvent("download"): const [download] = await Promise.all([page.waitForEvent("download"), page.click("#export-csv")]); const path = await download.path(); — then assert on the file content or name with fs. Playwright auto-manages the download into a temp folder; you control where to save it with download.saveAs(). Selenium has no built-in download event, so teams resorted to checking the OS download folder with polling.' },
          { level: 'advanced', q: 'How do you test time-dependent behavior (e.g. a 24-hour countdown) without waiting in real time?', a: 'Use page.clock (Playwright 1.45+): await page.clock.install({ time: new Date("2024-01-01") }); then await page.clock.fastForward("24:00:00") jumps the browser\'s Date/setTimeout/setInterval forward instantly. This lets you test "session expires after 24h" or "countdown reaches zero" in milliseconds of real test time instead of waiting a day. Before page.clock, teams had to inject a mocked Date via page.addInitScript(), which was far more fragile.' },
          { level: 'advanced', q: 'What should you watch for when emulating a mobile device with Playwright?', a: 'devices["iPhone 13"] sets viewport, user agent, and touch support, but it does NOT run a real mobile browser engine — WebKit on Playwright is still desktop WebKit with a mobile viewport, so mobile-Safari-specific rendering bugs won\'t reproduce. Watch for: tap vs click differences (use page.tap() where touch events matter), viewport-driven CSS media queries, and that geolocation/permissions defaults differ per device profile. For real device coverage, pair this with a cloud device farm (BrowserStack/Sauce Labs) rather than relying on emulation alone.' },
          { level: 'advanced', q: 'What is expect.poll() and when do you use it instead of a normal assertion?', a: 'expect.poll(() => getQueueLength()).toBe(0) retries a custom function (not just a locator) until it passes or times out — useful when the thing you\'re asserting on isn\'t a DOM element, like a database row count, a queue size via API call, or a value derived from multiple page reads. Normal expect(locator).toHaveText() already auto-retries for DOM state; expect.poll() extends that same retry behavior to arbitrary async functions. This replaces manual sleep-and-check loops that QA engineers used to hand-roll.' },
          { level: 'advanced', q: 'How do you handle a new tab or popup window opened by a click?', a: 'const [popup] = await Promise.all([page.waitForEvent("popup"), page.click("#open-new-tab")]); await popup.waitForLoadState(); — popup is a new Page object you can interact with independently while the original page object stays valid. This mirrors Selenium\'s driver.getWindowHandles() + switchTo().window(handle), but Playwright gives you a typed Page reference directly instead of an opaque handle string, which makes running assertions on both windows simultaneously much simpler.' },
          { level: 'advanced', q: 'How do you set up Playwright component testing for a React/Vue component in isolation?', a: '@playwright/experimental-ct-react (or -vue/-svelte) lets you mount a single component without a full app: test("button click", async ({ mount }) => { const component = await mount(<Counter />); await component.click(); await expect(component).toContainText("1"); }). It runs in a real browser (not jsdom), so CSS and real event handling work correctly — unlike Jest/RTL\'s simulated DOM. Use it for isolated component logic; keep full end-to-end flows in regular Playwright tests.' },
          { level: 'advanced', q: 'A test passes consistently on your machine but fails intermittently only in CI. How do you debug it?', a: 'First check resource constraints — CI runners often have fewer CPU cores, which slows rendering and can expose real race conditions that a fast local machine masks. Reproduce locally with the same constraints: npx playwright test --workers=1 and throttle CPU in DevTools. Enable trace: "on" temporarily in CI to capture a full trace.zip on every run, then open it with npx playwright show-trace to see the exact DOM state and network timing at failure. Most "only fails in CI" bugs trace back to a missing await on an auto-wait-adjacent action or a timing assumption that only breaks under load.' },
          { level: 'advanced', q: 'How do you structure playwright.config.ts for a project with setup, multiple browsers, and teardown dependencies?', a: 'Use the projects array with dependencies: a "setup" project runs first (e.g. seeds test data or logs in and saves storageState), then "chromium"/"firefox"/"webkit" projects declare dependencies: ["setup"] so Playwright runs setup once before fanning out to all browsers, and an optional "cleanup" project with dependencies: ["chromium","firefox","webkit"] runs last to tear down test data. This models the same lifecycle as a TestNG @BeforeSuite → parallel test classes → @AfterSuite, but declared as a dependency graph instead of annotations.' },
          { level: 'advanced', q: 'How do you test or mock a WebSocket connection in Playwright?', a: 'page.on("websocket", ws => { ws.on("framesent", data => console.log("sent", data.payload)); ws.on("framereceived", data => console.log("received", data.payload)); }) lets you observe live WebSocket traffic for assertions (e.g. verifying a chat message frame was sent). There is no built-in WebSocket mocking like page.route() for HTTP — to mock responses you typically inject a fake WebSocket implementation via page.addInitScript() before the page loads. This is commonly needed for testing real-time features like live chat or stock tickers without depending on a real backend socket server.' },
        ],
      },
    ],
  },
}


// ─── YENİ SEKMELER (2026-06-19) — CosmoCode "Getting Started" serisiyle kıyaslanan eksikler ───
// Eksik bulunan konular: Assertions, Test Organization, Fixtures, Page Object Model,
// Debugging/Traces/CI-CD, Auth & Sessions. Aşağıda 5 yeni sekme olarak eklendi.

const s10 = {
  tr: {
    title: '✅ Doğru Assertion Yazımı (expect)',
    blocks: [
      {
        type: 'simple-box', emoji: '🚪',
        content: 'Playwright\'ın expect() fonksiyonu, kalibreli bir kalite kontrol ölçüm cihazı gibi çalışır: ölçüm alır, tolerans aralığını kontrol eder, koşul karşılanana kadar belirlenen aralıklarla yeniden ölçer ve timeout sonunda hâlâ karşılanmamışsa hem beklenen değeri hem elde edilen değeri açık biçimde raporlar. Peki Selenium\'daki testNG assertEquals() veya JUnit assertThat()\'tan farkı ne? Java\'da assertion anında (tek seferlik) değerlendirilir: o milisaniyede koşul sağlanmamışsa test hemen kırmızı yanar ve hata "AssertionError: expected X but was Y" kadar basit — hangi element, sayfa hangi state\'deydi, öncesinde ne oldu bunların hiçbiri mesajda yoktur. Playwright\'ta expect(page.locator(".toast")).toBeVisible() çağrısı polling ile çalışır: 5000ms boyunca 100ms aralıklarla kontrol eder; başarısız olursa ekran görüntüsü, hata anındaki DOM state\'i ve bekleme sürecinin tüm geçmişi ile birlikte raporlanır. QA gerçeği: asenkron UI\'larda (SPA, AJAX, WebSocket) tek-seferlik assertion yazmak sessiz yanlış PASS üretir — modal açılmadan önce "görünmüyor" assertion\'ı geçer, modal açıldıktan sonra "silinmiş" assertion\'ı geçer, ama hiçbiri kullanıcının gördüğü state\'i doğrulamaz. expect()\'in poll mekanizması bu durumu sistematik olarak engeller.',
      },
      {
        type: 'text',
        content: 'expect(), Playwright\'ın assertion (doğrulama) fonksiyonudur. Ama JUnit\'teki assertEquals() veya Selenium projelerinde kullandığın klasik assert\'lerden farklı çalışır: bir locator üzerinde çağrılan "web-first" assertion\'lar (toBeVisible(), toHaveText() gibi) varsayılan olarak 5 saniye boyunca otomatik tekrar dener (auto-retry). Koşul anında doğru değilse hemen patlamaz, sayfa state\'i değişene kadar bekler.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'JUnit\'te Assert.assertEquals("Beklenen", element.getText()) yazdığında, o satır çalıştığı an element\'in text\'i o değilse test ANINDA patlar — element\'in metni 200ms sonra doğru olacak olsa bile. Playwright\'ta await expect(locator).toHaveText("Beklenen") yazarsan, Playwright o metni 5 saniye boyunca tekrar tekrar okur; metin 200ms sonra doğru olursa test geçer. AssertJ\'nin await().atMost(5, SECONDS).until(...) (Awaitility) yazdığın senaryoyu built-in olarak düşün.',
      },
      { type: 'heading', text: 'Web-First Assertion vs Generic Assertion' },
      {
        type: 'table',
        headers: ['Tür', 'Örnek', 'Auto-retry?', 'Ne zaman kullan'],
        rows: [
          ['Locator-based (web-first)', 'expect(locator).toBeVisible()', '✅ 5s tekrar dener', 'DOM/element durumu kontrolü'],
          ['Page-based', 'expect(page).toHaveURL(/dashboard/)', '✅ 5s tekrar dener', 'Navigasyon/URL/title kontrolü'],
          ['Generic (value-based)', 'expect(count).toBe(5)', '❌ Anında kontrol', 'Düz JS değeri (sayı, string, obje)'],
        ],
      },
      {
        type: 'text',
        content: 'En sık kullanılan web-first assertion\'lar: toBeVisible() / toBeHidden(), toHaveText() / toContainText(), toHaveValue(), toBeChecked(), toBeEnabled() / toBeDisabled(), toHaveAttribute(), toHaveClass(), toHaveCSS(), toHaveCount(), toHaveURL(), toHaveTitle(). Her birinin başına .not. koyarak tersini doğrulayabilirsin: expect(locator).not.toBeVisible().',
      },
      {
        type: 'playwright-visual',
        concept: 'assertion-retry',
        icon: '✅',
        title: { tr: 'expect() Nasıl Tekrar Dener (Auto-Retry)', en: 'How expect() Auto-Retries' },
        steps: [
          {
            id: 'fail-fast', label: 'Klasik Assert (JUnit)', labelEn: 'Classic Assert (JUnit)', visualState: 'fail-fast',
            description: { tr: 'assertEquals çalıştığı anki DOM\'a bakar. Spinner hâlâ dönüyorsa ya da metin henüz güncellenmediyse test anında FAIL olur.', en: 'assertEquals looks at the DOM at the exact instant it runs. If a spinner is still spinning or the text hasn\'t updated yet, the test FAILS immediately.' },
            code: `// Selenium + JUnit\nAssert.assertEquals(\n  "Sipariş Onaylandı",\n  successMsg.getText()\n); // ❌ Mesaj 300ms sonra geliyorsa burada patlar`,
            tip: { tr: '300ms sonra doğru olacak bir şeyi anında kontrol etmek "flaky test"in en yaygın nedenidir.', en: 'Checking something that will be correct in 300ms, right now, is the most common cause of flaky tests.' },
          },
          {
            id: 'checking', label: 'Playwright — Kontrol Ediyor', labelEn: 'Playwright — Checking', visualState: 'pw-way',
            description: { tr: 'await expect(locator).toHaveText(...) çağrıldığı an Playwright ilk kontrolü yapar. Henüz doğru değilse hata fırlatmaz, polling döngüsüne girer.', en: 'The moment await expect(locator).toHaveText(...) runs, Playwright performs the first check. If it\'s not correct yet, it doesn\'t throw — it enters a polling loop.' },
            code: `await expect(\n  page.getByText('Sipariş Onaylandı')\n).toBeVisible();\n// İlk kontrol: henüz görünmüyor → bekle`,
          },
          {
            id: 'retry', label: 'Tekrar Deniyor (Polling)', labelEn: 'Retrying (Polling)', visualState: 'retry',
            description: { tr: 'Playwright her ~100ms\'de bir koşulu yeniden kontrol eder. Bu, sayfa state\'i değişene (spinner kaybolup mesaj görününceye) kadar sessizce devam eder — sen hiçbir ekstra kod yazmazsın.', en: 'Playwright re-checks the condition roughly every ~100ms. This silently continues until the page state changes (spinner disappears, message appears) — you write zero extra code for this.' },
            code: `// Arka planda otomatik:\n// check (t=0ms) → false\n// check (t=100ms) → false\n// check (t=300ms) → true ✅`,
          },
          {
            id: 'passed', label: 'Koşul Doğru → Geçti', labelEn: 'Condition True → Passed', visualState: 'found',
            description: { tr: 'Koşul 5 saniyeden önce doğru olduğu an assertion anında geçer ve bir sonraki satıra devam edilir. Toplam bekleme süresi sadece gerçekten gereken süre kadar — sabit Thread.sleep(5000) gibi gereksiz bekleme yok.', en: 'The moment the condition becomes true (before the 5s budget runs out), the assertion passes immediately and execution moves to the next line. The total wait is exactly as long as needed — no wasted fixed Thread.sleep(5000).' },
            code: `await expect(\n  page.getByText('Sipariş Onaylandı')\n).toBeVisible();\n// ✅ 280ms sonra geçti, devam!`,
          },
          {
            id: 'timeout', label: 'Hiç Doğru Olmazsa → Timeout', labelEn: 'Never True → Timeout', visualState: 'timeout',
            description: { tr: 'Koşul 5 saniye boyunca hiç doğru olmazsa Playwright TimeoutError fırlatır ve hata mesajına son denenen DOM durumunu da ekler — bu yüzden hata mesajları Selenium\'a göre çok daha açıklayıcıdır.', en: 'If the condition is never true within the 5-second budget, Playwright throws a TimeoutError and includes the last-seen DOM state in the error message — which is why Playwright\'s failure messages are far more descriptive than Selenium\'s.' },
            code: `// 5000ms boyunca hep false\n// → TimeoutError: \n//   expect(locator).toBeVisible()\n//   Locator: getByText('Sipariş Onaylandı')\n//   Expected: visible\n//   Received: <element not found>`,
          },
        ],
      },
      { type: 'heading', text: 'Soft Assertion & Özel Timeout' },
      {
        type: 'code', language: 'typescript',
        code: `// Soft assertion: hata olsa da test devam eder, sonunda hepsi raporlanır
test('form validation — tüm hata mesajlarını göster', async ({ page }) => {
  await page.getByRole('button', { name: 'Gönder' }).click();

  await expect.soft(page.getByText('E-posta zorunludur')).toBeVisible();
  await expect.soft(page.getByText('Şifre zorunludur')).toBeVisible();
  await expect.soft(page.getByText('Ad zorunludur')).toBeVisible();
  // Üçü de kontrol edilir; biri fail olsa diğerleri de çalışır.
  // Test sonunda kaç soft assertion fail oldu, hepsi tek raporda görünür.
});

// Tek assertion için özel timeout (varsayılan: 5000ms)
await expect(page.getByText('Rapor Hazır')).toBeVisible({ timeout: 30000 });

// Global config (playwright.config.ts)
export default defineConfig({
  expect: { timeout: 10000 },
});`,
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '👁️', label: 'toBeVisible() / toBeHidden()', desc: 'Element görünür mü, gizli mi?' },
          { icon: '📝', label: 'toHaveText() / toContainText()', desc: 'Tam metin veya içeren metin kontrolü.' },
          { icon: '🔢', label: 'toHaveValue()', desc: 'Input/textarea\'nın güncel değeri.' },
          { icon: '☑️', label: 'toBeChecked()', desc: 'Checkbox/radio işaretli mi?' },
          { icon: '🔓', label: 'toBeEnabled() / toBeDisabled()', desc: 'Buton tıklanabilir mi?' },
          { icon: '🔢', label: 'toHaveCount()', desc: 'Eşleşen eleman sayısı (örn. 5 ürün kartı).' },
          { icon: '🔗', label: 'toHaveURL()', desc: 'Sayfanın güncel adresi (regex destekli).' },
          { icon: '🏷️', label: 'toHaveTitle()', desc: 'Sayfa <title> içeriği.' },
          { icon: '🚫', label: '.not. ile tersi', desc: 'expect(x).not.toBeVisible() gibi her assertion\'ın tersi yazılabilir.' },
        ],
      },
      playwrightAssertRetryFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Checkout Akışı İçin Doğru Assertion Sırası', en: 'Try It Yourself — Correct Assertion Order for a Checkout Flow' },
        intro: { tr: 'Bir "sepeti onayla" akışı için doğru sırayla expect() satırlarını yaz: önce buton tıklanabilir mi kontrol et, tıkla, sonra başarı mesajını ve yeni URL\'i doğrula.', en: 'Write the expect() lines in the correct order for a "confirm cart" flow: first check the button is clickable, click it, then verify the success message and the new URL.' },
        starterCommands: {
          tr: `await expect(page.getByRole('button', { name: 'Onayla' })).toBeEnabled();
await page.getByRole('button', { name: 'Onayla' }).click();
await expect(page.getByText('Siparişiniz Alındı')).toBeVisible();
await expect(page).toHaveURL(/.*\\/order-confirmed/);`,
          en: `await expect(page.getByRole('button', { name: 'Confirm' })).toBeEnabled();
await page.getByRole('button', { name: 'Confirm' }).click();
await expect(page.getByText('Order Received')).toBeVisible();
await expect(page).toHaveURL(/.*\\/order-confirmed/);`,
        },
        expectedSteps: [
          { pattern: 'toBeEnabled', label: { tr: '1) Butonun tıklanabilir olduğunu doğrula', en: '1) Verify the button is enabled' }, example: "await expect(button).toBeEnabled();" },
          { pattern: '\\.click\\(', label: { tr: '2) Butona tıkla', en: '2) Click the button' }, example: 'await button.click();' },
          { pattern: 'toBeVisible', label: { tr: '3) Başarı mesajının göründüğünü doğrula', en: '3) Verify the success message is visible' }, example: 'await expect(msg).toBeVisible();' },
          { pattern: 'toHaveURL', label: { tr: '4) Yeni URL\'e geçildiğini doğrula', en: '4) Verify the URL changed' }, example: 'await expect(page).toHaveURL(/confirmed/);' },
        ],
        dangerousPatterns: [
          { pattern: 'waitForTimeout', label: { tr: 'waitForTimeout(...) sabit bekleme demektir — auto-retry assertion varken buna gerek yok ve testi yavaşlatır/flaky yapar.', en: 'waitForTimeout(...) is a fixed sleep — unnecessary with auto-retry assertions, and it slows tests down / makes them flaky.' } },
        ],
        successOutput: { tr: '✅ Doğru sıra! Buton kontrolü → tıkla → mesaj doğrulama → URL doğrulama. Her expect() kendi içinde otomatik tekrar deniyor, ekstra sleep yazmana gerek yok.', en: '✅ Correct order! Check button → click → verify message → verify URL. Each expect() auto-retries on its own — no extra sleep needed.' },
        retryOutput: { tr: '❌ Sıra veya adım eksik. 4 adımı da doğru sırada yazdığından emin ol.', en: '❌ Order or a step is missing. Make sure all 4 steps are present in the right order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Aşağıdakilerden hangisi auto-retry YAPMAZ?', en: 'Which of the following does NOT auto-retry?' },
        options: [
          { id: 'a', text: 'expect(locator).toBeVisible()' },
          { id: 'b', text: 'expect(page).toHaveURL(/dashboard/)' },
          { id: 'c', text: 'expect(orderCount).toBe(5)  // orderCount bir number değişkeni' },
          { id: 'd', text: 'expect(locator).toHaveText("Tamam")' },
        ],
        correct: 'c',
        explanation: { tr: 'Generic (value-based) assertion\'lar — düz bir JS değeri (number, string, object) üzerinde çalışanlar — anında kontrol eder, retry yapmaz. Web-first assertion\'lar (locator veya page üzerinde çalışanlar) 5 saniye boyunca tekrar dener.', en: 'Generic (value-based) assertions — the ones operating on a plain JS value (number, string, object) — check instantly and never retry. Web-first assertions (the ones operating on a locator or page) retry for up to 5 seconds.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Aşağıdaki ifadelerden hangisi 'web-first' assertion (otomatik tekrar deneme yapan) DEĞİLDİR?",
            "en": "Which of the following is NOT a 'web-first' assertion (does NOT support auto-retry)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "expect(page.locator('.btn')).toBeDisabled()"
            },
            {
                  "id": "b",
                  "text": "expect(page).toHaveTitle('Ana Sayfa')"
            },
            {
                  "id": "c",
                  "text": "expect(users.length).toBe(10) // users bir dizi"
            },
            {
                  "id": "d",
                  "text": "expect(page.locator('h1')).toHaveText(/Merhaba/)"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Düz bir JavaScript değişkeni veya dizisi (users.length) üzerinde yapılan 'expect' kontrolleri anında değerlendirilir. 'Web-first' assertion'lar ise doğrudan locator veya page nesneleri üzerinde çağrılmalıdır.",
            "en": "'expect' checks performed on a plain JavaScript variable or array (users.length) are evaluated instantly. 'Web-first' assertions must be called directly on locator or page objects to trigger auto-retry."
      }
}
},
    ],
  },
  en: {
    title: '✅ Writing Good Assertions (expect)',
    blocks: [
      {
        type: 'simple-box', emoji: '🚪',
        content: 'Playwright\'s expect() function works like a calibrated quality-control measurement instrument: it takes a reading, checks it against the tolerance range, re-measures at set intervals until the condition is met, and if it still isn\'t met at timeout, reports both the expected value and the actual value obtained. What makes this different from assertEquals() in TestNG or assertThat() in JUnit? In Java, assertions are evaluated at a single instant: if the condition isn\'t satisfied at that exact millisecond the test goes red immediately, and the error is as plain as "AssertionError: expected X but was Y" — with no information about which element, what page state, or what led up to it. In Playwright, expect(page.locator(".toast")).toBeVisible() uses polling: it checks every 100ms for up to 5000ms; if it fails, the report includes a screenshot, the DOM state at the time of failure, and the full polling history. The QA reality: in async UIs (SPA, AJAX, WebSocket), a single-shot assertion silently produces false PASSes — the "not visible" assertion passes before a modal opens, the "removed" assertion passes after it closes, but neither actually verified the state the user saw. expect()\'s polling mechanism systematically prevents this.',
      },
      {
        type: 'text',
        content: 'expect() is Playwright\'s assertion function. But it works differently from JUnit\'s assertEquals() or the classic asserts you might have used in Selenium projects: "web-first" assertions called on a locator (like toBeVisible(), toHaveText()) auto-retry for 5 seconds by default. If the condition isn\'t true the instant it\'s checked, it doesn\'t blow up right away — it waits until the page state changes.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In JUnit, Assert.assertEquals("Expected", element.getText()) fails the INSTANT that line runs if the element\'s text isn\'t that value yet — even if the text would be correct 200ms later. In Playwright, await expect(locator).toHaveText("Expected") re-reads that text for up to 5 seconds; if it becomes correct after 200ms, the test passes. Think of it as a built-in version of the Awaitility pattern: await().atMost(5, SECONDS).until(...).',
      },
      { type: 'heading', text: 'Web-First Assertions vs Generic Assertions' },
      {
        type: 'table',
        headers: ['Type', 'Example', 'Auto-retry?', 'When to use'],
        rows: [
          ['Locator-based (web-first)', 'expect(locator).toBeVisible()', '✅ retries for 5s', 'Checking DOM/element state'],
          ['Page-based', 'expect(page).toHaveURL(/dashboard/)', '✅ retries for 5s', 'Checking navigation/URL/title'],
          ['Generic (value-based)', 'expect(count).toBe(5)', '❌ checked instantly', 'Plain JS values (number, string, object)'],
        ],
      },
      {
        type: 'text',
        content: 'The most common web-first assertions: toBeVisible() / toBeHidden(), toHaveText() / toContainText(), toHaveValue(), toBeChecked(), toBeEnabled() / toBeDisabled(), toHaveAttribute(), toHaveClass(), toHaveCSS(), toHaveCount(), toHaveURL(), toHaveTitle(). Prefix any of them with .not. to assert the opposite: expect(locator).not.toBeVisible().',
      },
      {
        type: 'playwright-visual',
        concept: 'assertion-retry',
        icon: '✅',
        title: { tr: 'expect() Nasıl Tekrar Dener (Auto-Retry)', en: 'How expect() Auto-Retries' },
        steps: [
          {
            id: 'fail-fast', label: 'Classic Assert (JUnit)', labelEn: 'Classic Assert (JUnit)', visualState: 'fail-fast',
            description: { tr: 'assertEquals çalıştığı anki DOM\'a bakar. Spinner hâlâ dönüyorsa ya da metin henüz güncellenmediyse test anında FAIL olur.', en: 'assertEquals looks at the DOM at the exact instant it runs. If a spinner is still spinning or the text hasn\'t updated yet, the test FAILS immediately.' },
            code: `// Selenium + JUnit\nAssert.assertEquals(\n  "Order Confirmed",\n  successMsg.getText()\n); // ❌ Fails here if the message arrives 300ms later`,
            tip: { tr: '300ms sonra doğru olacak bir şeyi anında kontrol etmek "flaky test"in en yaygın nedenidir.', en: 'Checking something that will be correct in 300ms, right now, is the most common cause of flaky tests.' },
          },
          {
            id: 'checking', label: 'Playwright — Checking', labelEn: 'Playwright — Checking', visualState: 'pw-way',
            description: { tr: 'await expect(locator).toHaveText(...) çağrıldığı an Playwright ilk kontrolü yapar. Henüz doğru değilse hata fırlatmaz, polling döngüsüne girer.', en: 'The moment await expect(locator).toHaveText(...) runs, Playwright performs the first check. If it\'s not correct yet, it doesn\'t throw — it enters a polling loop.' },
            code: `await expect(\n  page.getByText('Order Confirmed')\n).toBeVisible();\n// First check: not visible yet → wait`,
          },
          {
            id: 'retry', label: 'Retrying (Polling)', labelEn: 'Retrying (Polling)', visualState: 'retry',
            description: { tr: 'Playwright her ~100ms\'de bir koşulu yeniden kontrol eder. Bu, sayfa state\'i değişene kadar sessizce devam eder — sen hiçbir ekstra kod yazmazsın.', en: 'Playwright re-checks the condition roughly every ~100ms. This silently continues until the page state changes (spinner disappears, message appears) — you write zero extra code for this.' },
            code: `// Automatic in the background:\n// check (t=0ms) → false\n// check (t=100ms) → false\n// check (t=300ms) → true ✅`,
          },
          {
            id: 'passed', label: 'Condition True → Passed', labelEn: 'Condition True → Passed', visualState: 'found',
            description: { tr: 'Koşul 5 saniyeden önce doğru olduğu an assertion anında geçer ve bir sonraki satıra devam edilir.', en: 'The moment the condition becomes true (before the 5s budget runs out), the assertion passes immediately and execution moves to the next line. The total wait is exactly as long as needed — no wasted fixed Thread.sleep(5000).' },
            code: `await expect(\n  page.getByText('Order Confirmed')\n).toBeVisible();\n// ✅ Passed after 280ms, continue!`,
          },
          {
            id: 'timeout', label: 'Never True → Timeout', labelEn: 'Never True → Timeout', visualState: 'timeout',
            description: { tr: 'Koşul 5 saniye boyunca hiç doğru olmazsa Playwright TimeoutError fırlatır ve son denenen DOM durumunu hata mesajına ekler.', en: 'If the condition is never true within the 5-second budget, Playwright throws a TimeoutError and includes the last-seen DOM state in the error message — which is why Playwright\'s failure messages are far more descriptive than Selenium\'s.' },
            code: `// false for the full 5000ms\n// → TimeoutError:\n//   expect(locator).toBeVisible()\n//   Locator: getByText('Order Confirmed')\n//   Expected: visible\n//   Received: <element not found>`,
          },
        ],
      },
      { type: 'heading', text: 'Soft Assertions & Custom Timeouts' },
      {
        type: 'code', language: 'typescript',
        code: `// Soft assertion: test keeps running even on failure, all failures reported at the end
test('form validation — show all error messages', async ({ page }) => {
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect.soft(page.getByText('Email is required')).toBeVisible();
  await expect.soft(page.getByText('Password is required')).toBeVisible();
  await expect.soft(page.getByText('Name is required')).toBeVisible();
  // All three are checked; one failing doesn't stop the others.
  // The final report shows how many soft assertions failed in one place.
});

// Custom timeout for one assertion (default: 5000ms)
await expect(page.getByText('Report Ready')).toBeVisible({ timeout: 30000 });

// Global config (playwright.config.ts)
export default defineConfig({
  expect: { timeout: 10000 },
});`,
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '👁️', label: 'toBeVisible() / toBeHidden()', desc: 'Is the element visible or hidden?' },
          { icon: '📝', label: 'toHaveText() / toContainText()', desc: 'Exact text or substring match.' },
          { icon: '🔢', label: 'toHaveValue()', desc: 'Current value of an input/textarea.' },
          { icon: '☑️', label: 'toBeChecked()', desc: 'Is a checkbox/radio checked?' },
          { icon: '🔓', label: 'toBeEnabled() / toBeDisabled()', desc: 'Is the button clickable?' },
          { icon: '🔢', label: 'toHaveCount()', desc: 'Number of matching elements (e.g. 5 product cards).' },
          { icon: '🔗', label: 'toHaveURL()', desc: 'The page\'s current address (regex supported).' },
          { icon: '🏷️', label: 'toHaveTitle()', desc: 'The page <title> content.' },
          { icon: '🚫', label: 'Negate with .not.', desc: 'Any assertion can be inverted: expect(x).not.toBeVisible().' },
        ],
      },
      playwrightAssertRetryFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Checkout Akışı İçin Doğru Assertion Sırası', en: 'Try It Yourself — Correct Assertion Order for a Checkout Flow' },
        intro: { tr: 'Bir "sepeti onayla" akışı için doğru sırayla expect() satırlarını yaz.', en: 'Write the expect() lines in the correct order for a "confirm cart" flow: first check the button is clickable, click it, then verify the success message and the new URL.' },
        starterCommands: {
          tr: `await expect(page.getByRole('button', { name: 'Onayla' })).toBeEnabled();
await page.getByRole('button', { name: 'Onayla' }).click();
await expect(page.getByText('Siparişiniz Alındı')).toBeVisible();
await expect(page).toHaveURL(/.*\\/order-confirmed/);`,
          en: `await expect(page.getByRole('button', { name: 'Confirm' })).toBeEnabled();
await page.getByRole('button', { name: 'Confirm' }).click();
await expect(page.getByText('Order Received')).toBeVisible();
await expect(page).toHaveURL(/.*\\/order-confirmed/);`,
        },
        expectedSteps: [
          { pattern: 'toBeEnabled', label: { tr: '1) Butonun tıklanabilir olduğunu doğrula', en: '1) Verify the button is enabled' }, example: "await expect(button).toBeEnabled();" },
          { pattern: '\\.click\\(', label: { tr: '2) Butona tıkla', en: '2) Click the button' }, example: 'await button.click();' },
          { pattern: 'toBeVisible', label: { tr: '3) Başarı mesajının göründüğünü doğrula', en: '3) Verify the success message is visible' }, example: 'await expect(msg).toBeVisible();' },
          { pattern: 'toHaveURL', label: { tr: '4) Yeni URL\'e geçildiğini doğrula', en: '4) Verify the URL changed' }, example: 'await expect(page).toHaveURL(/confirmed/);' },
        ],
        dangerousPatterns: [
          { pattern: 'waitForTimeout', label: { tr: 'waitForTimeout(...) sabit bekleme demektir — auto-retry assertion varken buna gerek yok ve testi yavaşlatır/flaky yapar.', en: 'waitForTimeout(...) is a fixed sleep — unnecessary with auto-retry assertions, and it slows tests down / makes them flaky.' } },
        ],
        successOutput: { tr: '✅ Doğru sıra! Buton kontrolü → tıkla → mesaj doğrulama → URL doğrulama.', en: '✅ Correct order! Check button → click → verify message → verify URL. Each expect() auto-retries on its own — no extra sleep needed.' },
        retryOutput: { tr: '❌ Sıra veya adım eksik.', en: '❌ Order or a step is missing. Make sure all 4 steps are present in the right order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Aşağıdakilerden hangisi auto-retry YAPMAZ?', en: 'Which of the following does NOT auto-retry?' },
        options: [
          { id: 'a', text: 'expect(locator).toBeVisible()' },
          { id: 'b', text: 'expect(page).toHaveURL(/dashboard/)' },
          { id: 'c', text: 'expect(orderCount).toBe(5)  // orderCount is a plain number variable' },
          { id: 'd', text: 'expect(locator).toHaveText("OK")' },
        ],
        correct: 'c',
        explanation: { tr: 'Generic (value-based) assertion\'lar anında kontrol eder, retry yapmaz. Web-first assertion\'lar (locator/page üzerinde) 5 saniye boyunca tekrar dener.', en: 'Generic (value-based) assertions check instantly and never retry. Web-first assertions (on a locator or page) retry for up to 5 seconds.' },
      
        retryQuestion: {
      "question": {
            "tr": "Aşağıdaki ifadelerden hangisi Playwright'ta 'auto-retry' mekanizmasını tetiklemez?",
            "en": "Which of the following does NOT trigger Playwright's auto-retry mechanism?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "await expect(page.locator('.btn')).toBeEnabled()",
                        "en": "await expect(page.locator('.btn')).toBeEnabled()"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "await expect(page).toHaveTitle('Home Page')",
                        "en": "await expect(page).toHaveTitle('Home Page')"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "const status = 200; expect(status).toBe(200)",
                        "en": "const status = 200; expect(status).toBe(200)"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "await expect(page.locator('input')).toHaveValue('test')",
                        "en": "await expect(page.locator('input')).toHaveValue('test')"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Web-first assertion'lar (page veya locator nesneleri ile kullanılanlar) otomatik olarak yeniden dener (retry). Ancak basit bir değer (number, string, boolean) üzerinde yapılan kontrol anlıktır ve tekrar deneme yapmaz.",
            "en": "Web-first assertions (used with page or locator objects) automatically retry. However, assertions performed on simple values (number, string, boolean) are evaluated instantly and do not retry."
      }
}
},
    ],
  },
}

const s11 = {
  tr: {
    title: '🗂️ Test Organizasyonu & Fixtures',
    blocks: [
      {
        type: 'simple-box', emoji: '🧰',
        content: 'Playwright fixture\'ları, Java\'daki @BeforeEach metodunun bağımlılık enjeksiyonu (dependency injection) ile güçlendirilmiş halidir: @BeforeEach bir sınıf içindeki her test için aynı hazırlığı yapar ama o hazırlık sonucunu başka bir sınıfa doğrudan geçiremez. Fixture ise bir fabrika pipeline\'ındaki modüler istasyon gibi çalışır — "loggedInPage" dediğinde Playwright önce browser\'ı açar, giriş işlemini yapar, cookie\'leri set eder ve sana hazır bir sayfa nesnesi teslim eder; test sona erince teardown otomatik çalışır. Peki neden fixture tercih edilsin, beforeEach yetmez mi? Birden fazla test dosyasında aynı "admin kullanıcısı olarak giriş" state\'ini paylaşman gerektiğinde, beforeEach her dosyaya tekrar kopyalanır ve bir gün login adımları değişirse her dosyayı ayrı ayrı güncellermen gerekir; fixture tek bir yerde tanımlanır, tüm testler import eder. QA gerçeği: 200 testli bir suite\'de her test kendi login adımını çalıştırırsa süite süresi gereksiz yere uzar; storageState ile birleştirilmiş fixture\'lar login işlemini bir kez yapar ve session\'ı tüm paralel worker\'larla paylaşır — bu, CI pipeline süresinde ciddi bir optimizasyon demektir.',
      },
      {
        type: 'text',
        content: 'Test organizasyonu iki ana parçadan oluşur: (1) testleri test.describe() ile mantıklı gruplara ayırmak ve beforeEach/afterEach gibi hook\'larla ortak hazırlık/temizlik kodu yazmak, (2) fixture\'lar ile bu hazırlık kodunu "dependency injection" şeklinde testlere otomatik enjekte etmek. İkisi birlikte, yüzlerce testte tekrar eden kodu sıfıra indirir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'test.describe() bir JUnit @Nested test class\'ı gibidir. test.beforeEach() / afterEach() → JUnit @BeforeEach / @AfterEach. test.beforeAll() / afterAll() → @BeforeAll / @AfterAll (ama bunlar { browser } alır, { page } almaz — page testler arası paylaşılmaz). Fixture\'lar ise Spring\'in @Autowired dependency injection\'ına benzer: ihtiyacın olan şeyi parametre olarak istersin, çerçeve onu sana hazır verir — new LoginPage(driver) diye manuel oluşturmazsın.',
      },
      { type: 'heading', text: 'Testin Anatomisi — Arrange / Act / Assert' },
      {
        type: 'code', language: 'typescript',
        code: `import { test, expect } from '@playwright/test';

test('giriş başarılı olursa dashboard\\'a yönlendirir', async ({ page }) => {
  // Arrange — hazırlık
  await page.goto('/login');

  // Act — eylem
  await page.getByLabel('E-posta').fill('kullanici@example.com');
  await page.getByLabel('Şifre').fill('sifre123');
  await page.getByRole('button', { name: 'Giriş Yap' }).click();

  // Assert — doğrulama
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Tekrar hoş geldin')).toBeVisible();
});`,
      },
      testLifecycleFilm,
      { type: 'heading', text: 'describe ile Gruplama + Hook\'lar' },
      {
        type: 'code', language: 'typescript',
        code: `test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Bu grup içindeki HER testten önce çalışır
    await page.goto('/login');
    await page.getByLabel('E-posta').fill('kullanici@example.com');
    await page.getByLabel('Şifre').fill('sifre123');
    await page.getByRole('button', { name: 'Giriş Yap' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('hoş geldin mesajını gösterir', async ({ page }) => {
    await expect(page.getByText('Tekrar hoş geldin')).toBeVisible();
  });

  test('son siparişleri listeler', async ({ page }) => {
    await expect(page.getByRole('list', { name: 'Son Siparişler' })).toBeVisible();
  });
});`,
      },
      {
        type: 'table',
        headers: ['Kontrol', 'Ne işe yarar', 'Java karşılığı'],
        rows: [
          ['test.skip(...)', 'Testi şimdilik atla (henüz hazır değil)', '@Disabled'],
          ['test.only(...)', 'Geliştirme sırasında SADECE bu testi çalıştır', '@Tag ile filtreleme'],
          ['test.fail(...)', 'Bilinen bug — test FAIL ederse PASS sayılır', '@Disabled + JIRA linki yerine canlı takip'],
          ['test.slow(...)', 'Timeout\'u 3\'e katla (yavaş bir işlem için)', '@Timeout artırımı'],
          ['test.describe.serial(...)', 'Bu gruptaki testler sırayla ve birbirine bağımlı çalışır', '@TestMethodOrder'],
          ['npx playwright test --grep @smoke', '"@smoke" etiketli testleri çalıştır', '@Tag("smoke") + Maven profile'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '⚠️',
        title: 'Test Isolation — Testler Birbirine Güvenmemeli',
        content: '"create product" testi çalışmadan "edit product" testi başarısız oluyorsa, bu iki test BİRBİRİNE BAĞIMLI demektir — paralel çalıştığında veya sırası değiştiğinde patlar. Her test kendi verisini kendisi oluşturmalı (self-contained). Playwright her teste otomatik olarak taze bir browser context/page verir — bu, yanlışlıkla state paylaşmanı bir nebze önler ama test verisi (DB kaydı, oluşturulan ürün) hâlâ senin sorumluluğundadır.',
      },
      { type: 'heading', text: 'Fixture\'lar — Dependency Injection' },
      {
        type: 'text',
        content: '{ page } yazdığında page\'in nereden geldiğini sormazsın — Playwright onu sana hazır verir. Bu bir fixture\'dır. Built-in fixture\'lar: page (taze sayfa), context (page\'in ait olduğu browser context — cookie/oturum paylaşımı için), browser (yeni context\'ler açmak için), request (UI olmadan API çağrısı için), browserName (chromium/firefox/webkit ayrımı için).',
      },
      {
        type: 'code', language: 'typescript',
        code: `// fixtures.ts — kendi fixture'ını tanımla
import { test as base } from '@playwright/test';

type MyFixtures = { loggedInPage: import('@playwright/test').Page };

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    // SETUP — test başlamadan önce
    await page.goto('/login');
    await page.getByLabel('E-posta').fill('kullanici@example.com');
    await page.getByLabel('Şifre').fill('sifre123');
    await page.getByRole('button', { name: 'Giriş Yap' }).click();
    await page.waitForURL('/dashboard');

    await use(page); // ← testin kendisi burada çalışır

    // TEARDOWN — test bittikten sonra (use() satırından sonrası)
    await page.goto('/logout');
  },
});
export { expect } from '@playwright/test';

// test dosyasında:
import { test, expect } from './fixtures';
test('dashboard zaten giriş yapılmış geliyor', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Tekrar hoş geldin')).toBeVisible();
  // login kodu burada YOK — fixture hallediyor
});`,
      },
      {
        type: 'playwright-visual',
        concept: 'fixture-di',
        icon: '🧩',
        title: { tr: 'Fixture Dependency Injection Akışı', en: 'Fixture Dependency Injection Flow' },
        steps: [
          {
            id: 'request', label: 'Test İmzasında İste', labelEn: 'Request in Test Signature', visualState: 'request',
            description: { tr: 'Test fonksiyonu parametre olarak { loggedInPage } ister. Henüz hiçbir login kodu çalışmadı — sadece "buna ihtiyacım var" denildi.', en: 'The test function asks for { loggedInPage } as a parameter. No login code has run yet — it just says "I need this".' },
            code: `test('...', async ({ loggedInPage }) => {\n  // henüz çalışmadı\n});`,
          },
          {
            id: 'setup', label: 'Fixture Setup Çalışır', labelEn: 'Fixture Setup Runs', visualState: 'setup',
            description: { tr: 'Playwright loggedInPage fixture\'ının setup kodunu (login adımları) otomatik çalıştırır — test kodu bunu görmez.', en: 'Playwright automatically runs the loggedInPage fixture\'s setup code (the login steps) — the test code never sees this.' },
            code: `await page.goto('/login');\nawait page.getByLabel('E-posta').fill(...);\n...`,
          },
          {
            id: 'inject', label: 'use() ile Enjekte Edilir', labelEn: 'Injected via use()', visualState: 'inject',
            description: { tr: 'await use(page) çağrıldığında, artık login olmuş page objesi test fonksiyonuna parametre olarak geçer.', en: 'When await use(page) is called, the now-logged-in page object is passed into the test function as its parameter.' },
            code: `test('...', async ({ loggedInPage }) => {\n  // loggedInPage = giriş yapılmış page\n});`,
          },
          {
            id: 'teardown', label: 'Test Biter → Teardown', labelEn: 'Test Ends → Teardown', visualState: 'teardown',
            description: { tr: 'Test fonksiyonu bittiğinde, use() satırından sonraki kod (teardown) otomatik çalışır — örn. logout.', en: 'When the test function finishes, the code after the use() line (teardown) runs automatically — e.g. logout.' },
            code: `await use(page);\n// ↓ test bitince buradan devam\nawait page.goto('/logout');`,
          },
        ],
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🌐', label: 'Test Scope (varsayılan)', desc: 'Her test için yeni bir fixture örneği oluşturulur.' },
          { icon: '👷', label: 'Worker Scope', desc: '{ scope: "worker" } — aynı worker\'daki tüm testler tek bir örneği paylaşır (örn. DB bağlantısı).' },
          { icon: '🤖', label: 'Auto Fixture', desc: '{ auto: true } — test parametresinde istenmese bile her testte otomatik çalışır (örn. console log dinleyici).' },
          { icon: '🔗', label: 'Birleştirme', desc: 'Bir fixture başka bir fixture\'a bağımlı olabilir: loggedInPage, testUser fixture\'ını kullanabilir.' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — beforeEach + Test Sırası', en: 'Try It Yourself — beforeEach + Test Order' },
        intro: { tr: 'Bir test.describe() bloğu içinde önce beforeEach ile login yap, sonra iki testi sırayla yaz, en sonda describe.serial işaretlemesini ekle.', en: 'Inside a test.describe() block, first log in with beforeEach, then write two tests in order, and finally add the describe.serial marker.' },
        starterCommands: {
          tr: `test.describe('Dashboard', () => {
test.beforeEach(async ({ page }) => { await page.goto('/login'); });
test('hoş geldin mesajı görünür', async ({ page }) => {});
test('son siparişler listelenir', async ({ page }) => {});
test.describe.configure({ mode: 'serial' });`,
          en: `test.describe('Dashboard', () => {
test.beforeEach(async ({ page }) => { await page.goto('/login'); });
test('shows welcome message', async ({ page }) => {});
test('lists recent orders', async ({ page }) => {});
test.describe.configure({ mode: 'serial' });`,
        },
        expectedSteps: [
          { pattern: 'test\\.describe\\(', label: { tr: '1) test.describe ile grupla', en: '1) Group with test.describe' }, example: "test.describe('Dashboard', () => {...})" },
          { pattern: 'beforeEach', label: { tr: '2) beforeEach ile login adımını yaz', en: '2) Write the login step in beforeEach' }, example: 'test.beforeEach(async ({ page }) => {...})' },
          { pattern: "test\\('", label: { tr: '3) En az bir test ekle', en: '3) Add at least one test' }, example: "test('...', async ({ page }) => {...})" },
          { pattern: 'mode.*serial|describe\\.serial', label: { tr: '4) Gerekirse serial mode belirt', en: '4) Specify serial mode if needed' }, example: "test.describe.configure({ mode: 'serial' });" },
        ],
        successOutput: { tr: '✅ Doğru yapı! Login mantığı tek bir yerde (beforeEach), her test sadece kendi davranışına odaklanıyor.', en: '✅ Correct structure! Login logic lives in one place (beforeEach), each test focuses only on its own behavior.' },
        retryOutput: { tr: '❌ Eksik adım var — describe, beforeEach ve en az bir test gerekli.', en: '❌ A step is missing — you need describe, beforeEach, and at least one test.' },
      },
      {
        type: 'quiz',
        question: { tr: 'test.beforeAll() içinde { page } yerine neden { browser } kullanılır?', en: 'Why does test.beforeAll() use { browser } instead of { page }?' },
        options: [
          { id: 'a', text: 'page fixture sadece her test için ayrı oluşturulur, beforeAll\'da paylaşılan bir page yoktur' },
          { id: 'b', text: 'browser daha hızlı çalışır' },
          { id: 'c', text: 'page fixture\'ı sadece TypeScript\'te çalışır' },
          { id: 'd', text: 'Hiçbir fark yoktur, ikisi de aynı şeydir' },
        ],
        correct: 'a',
        explanation: { tr: 'page fixture test-scoped\'dır — her test için sıfırdan oluşturulur ve testler arası izolasyonu garanti eder. beforeAll bir kere çalıştığı için page fixture\'ı orada anlamlı değildir; bunun yerine browser fixture verilir, gerekirse browser.newPage() ile manuel sayfa açılır.', en: 'The page fixture is test-scoped — it\'s created fresh for every single test to guarantee isolation. Since beforeAll runs only once, the page fixture doesn\'t make sense there; instead the browser fixture is provided, and you can manually open a page with browser.newPage() if needed.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright testlerinde 'test.beforeAll' bloğunda 'page' fixture'ı neden kullanılamaz?",
            "en": "Why can't the 'page' fixture be used within a 'test.beforeAll' block in Playwright tests?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "page fixture'ı her bir test için özel olarak izole edilmiş bir şekilde oluşturulur.",
                        "en": "The page fixture is created specifically isolated for each individual test."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "beforeAll bloğu içerisinde sadece browserContext kullanılabilir.",
                        "en": "Only the browserContext can be used inside a beforeAll block."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Playwright mimarisi beforeAll içinde UI etkileşimlerini yasaklar.",
                        "en": "Playwright architecture forbids UI interactions inside beforeAll."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "beforeAll sadece asenkron işlemler için tasarlanmıştır.",
                        "en": "beforeAll is designed only for asynchronous operations."
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "page fixture'ı test seviyesinde (test-scoped) tanımlanmıştır. Yani her test kendi temiz 'page' nesnesine sahiptir. beforeAll ise tüm test dosyasından önce bir kez çalışır, bu yüzden o an henüz oluşturulmuş bir test-specific page yoktur.",
            "en": "The page fixture is test-scoped. This means every test receives its own clean 'page' object. Since beforeAll runs only once before all tests in the file, there is no test-specific page available at that point."
      }
}
},
    ],
  },
  en: {
    title: '🗂️ Test Organization & Fixtures',
    blocks: [
      {
        type: 'simple-box', emoji: '🧰',
        content: 'Playwright fixtures are Java\'s @BeforeEach method upgraded with dependency injection: @BeforeEach runs the same setup for every test in a class but can\'t pass its result directly into a test from another class. A fixture works like a modular station in a factory pipeline — when you request "loggedInPage", Playwright opens the browser, performs login, sets the cookies, and hands you a ready page object; when the test ends, teardown runs automatically. Why prefer fixtures over beforeEach? When you need to share the same "logged in as admin" state across multiple test files, beforeEach gets copy-pasted into every file, and the day login steps change you have to update each file separately; a fixture is defined in one place and imported everywhere. The QA reality: in a 200-test suite where every test runs its own login step, the overall suite time inflates unnecessarily. Fixtures combined with storageState perform the login once and share the session across all parallel workers — a meaningful CI pipeline time optimization.',
      },
      {
        type: 'text',
        content: 'Test organization has two main pieces: (1) grouping tests into logical groups with test.describe() and writing shared setup/teardown code with hooks like beforeEach/afterEach, and (2) using fixtures to inject that setup code into tests automatically as "dependency injection". Together, they reduce repeated code across hundreds of tests to near zero.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'test.describe() is like a JUnit @Nested test class. test.beforeEach() / afterEach() → JUnit @BeforeEach / @AfterEach. test.beforeAll() / afterAll() → @BeforeAll / @AfterAll (but these receive { browser }, not { page } — page is never shared between tests). Fixtures are similar to Spring\'s @Autowired dependency injection: you ask for what you need as a parameter, and the framework hands it to you ready-made — you don\'t manually do new LoginPage(driver).',
      },
      { type: 'heading', text: 'The Anatomy of a Test — Arrange / Act / Assert' },
      {
        type: 'code', language: 'typescript',
        code: `import { test, expect } from '@playwright/test';

test('successful login redirects to dashboard', async ({ page }) => {
  // Arrange — set up
  await page.goto('/login');

  // Act — do the thing
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Assert — verify
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Welcome back')).toBeVisible();
});`,
      },
      testLifecycleFilm,
      { type: 'heading', text: 'Grouping with describe + Hooks' },
      {
        type: 'code', language: 'typescript',
        code: `test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Runs before EVERY test in this group
    await page.goto('/login');
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('shows welcome message', async ({ page }) => {
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('lists recent orders', async ({ page }) => {
    await expect(page.getByRole('list', { name: 'Recent Orders' })).toBeVisible();
  });
});`,
      },
      {
        type: 'table',
        headers: ['Control', 'What it does', 'Java equivalent'],
        rows: [
          ['test.skip(...)', 'Skip the test for now (not ready yet)', '@Disabled'],
          ['test.only(...)', 'Run ONLY this test while developing', 'Filtering with @Tag'],
          ['test.fail(...)', 'Known bug — test passes if it FAILS', '@Disabled + tracking via a live ticket instead'],
          ['test.slow(...)', 'Triples the timeout (for a slow operation)', 'Increasing @Timeout'],
          ['test.describe.serial(...)', 'Tests in this group run in order and depend on each other', '@TestMethodOrder'],
          ['npx playwright test --grep @smoke', 'Run only tests tagged "@smoke"', '@Tag("smoke") + a Maven profile'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '⚠️',
        title: 'Test Isolation — Tests Must Not Trust Each Other',
        content: 'If "edit product" fails whenever "create product" hasn\'t run, those two tests are COUPLED — they\'ll break under parallel execution or if the order changes. Each test should create its own data (self-contained). Playwright gives every test a fresh browser context/page automatically — that prevents accidental state sharing, but test data (DB rows, created products) is still your responsibility.',
      },
      { type: 'heading', text: 'Fixtures — Dependency Injection' },
      {
        type: 'text',
        content: 'When you write { page }, you never ask where page comes from — Playwright hands it to you ready-made. That\'s a fixture. Built-in fixtures: page (a fresh page), context (the browser context the page belongs to — for sharing cookies/sessions), browser (for opening new contexts), request (for calling APIs without a UI), browserName (to branch logic for chromium/firefox/webkit).',
      },
      {
        type: 'code', language: 'typescript',
        code: `// fixtures.ts — define your own fixture
import { test as base } from '@playwright/test';

type MyFixtures = { loggedInPage: import('@playwright/test').Page };

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    // SETUP — before the test starts
    await page.goto('/login');
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('/dashboard');

    await use(page); // ← the test itself runs here

    // TEARDOWN — after the test finishes (code after use())
    await page.goto('/logout');
  },
});
export { expect } from '@playwright/test';

// in a test file:
import { test, expect } from './fixtures';
test('dashboard arrives already logged in', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Welcome back')).toBeVisible();
  // no login code here — the fixture handles it
});`,
      },
      {
        type: 'playwright-visual',
        concept: 'fixture-di',
        icon: '🧩',
        title: { tr: 'Fixture Dependency Injection Akışı', en: 'Fixture Dependency Injection Flow' },
        steps: [
          {
            id: 'request', label: 'Request in Test Signature', labelEn: 'Request in Test Signature', visualState: 'request',
            description: { tr: 'Test fonksiyonu parametre olarak { loggedInPage } ister. Henüz hiçbir login kodu çalışmadı.', en: 'The test function asks for { loggedInPage } as a parameter. No login code has run yet — it just says "I need this".' },
            code: `test('...', async ({ loggedInPage }) => {\n  // hasn't run yet\n});`,
          },
          {
            id: 'setup', label: 'Fixture Setup Runs', labelEn: 'Fixture Setup Runs', visualState: 'setup',
            description: { tr: 'Playwright loggedInPage fixture\'ının setup kodunu otomatik çalıştırır.', en: 'Playwright automatically runs the loggedInPage fixture\'s setup code (the login steps) — the test code never sees this.' },
            code: `await page.goto('/login');\nawait page.getByLabel('Email').fill(...);\n...`,
          },
          {
            id: 'inject', label: 'Injected via use()', labelEn: 'Injected via use()', visualState: 'inject',
            description: { tr: 'await use(page) çağrıldığında, login olmuş page objesi test fonksiyonuna geçer.', en: 'When await use(page) is called, the now-logged-in page object is passed into the test function as its parameter.' },
            code: `test('...', async ({ loggedInPage }) => {\n  // loggedInPage = already logged in\n});`,
          },
          {
            id: 'teardown', label: 'Test Ends → Teardown', labelEn: 'Test Ends → Teardown', visualState: 'teardown',
            description: { tr: 'Test fonksiyonu bittiğinde, use() satırından sonraki kod (teardown) otomatik çalışır.', en: 'When the test function finishes, the code after the use() line (teardown) runs automatically — e.g. logout.' },
            code: `await use(page);\n// ↓ continues here after the test ends\nawait page.goto('/logout');`,
          },
        ],
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🌐', label: 'Test Scope (default)', desc: 'A new fixture instance is created for every test.' },
          { icon: '👷', label: 'Worker Scope', desc: '{ scope: "worker" } — all tests in the same worker share a single instance (e.g. a DB connection).' },
          { icon: '🤖', label: 'Auto Fixture', desc: '{ auto: true } — runs automatically on every test even if not requested as a parameter (e.g. a console log listener).' },
          { icon: '🔗', label: 'Composition', desc: 'A fixture can depend on another fixture: loggedInPage can use the testUser fixture.' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — beforeEach + Test Sırası', en: 'Try It Yourself — beforeEach + Test Order' },
        intro: { tr: 'Bir test.describe() bloğu içinde önce beforeEach ile login yap, sonra iki testi sırayla yaz, en sonda describe.serial işaretlemesini ekle.', en: 'Inside a test.describe() block, first log in with beforeEach, then write two tests in order, and finally add the describe.serial marker.' },
        starterCommands: {
          tr: `test.describe('Dashboard', () => {
test.beforeEach(async ({ page }) => { await page.goto('/login'); });
test('hoş geldin mesajı görünür', async ({ page }) => {});
test('son siparişler listelenir', async ({ page }) => {});
test.describe.configure({ mode: 'serial' });`,
          en: `test.describe('Dashboard', () => {
test.beforeEach(async ({ page }) => { await page.goto('/login'); });
test('shows welcome message', async ({ page }) => {});
test('lists recent orders', async ({ page }) => {});
test.describe.configure({ mode: 'serial' });`,
        },
        expectedSteps: [
          { pattern: 'test\\.describe\\(', label: { tr: '1) test.describe ile grupla', en: '1) Group with test.describe' }, example: "test.describe('Dashboard', () => {...})" },
          { pattern: 'beforeEach', label: { tr: '2) beforeEach ile login adımını yaz', en: '2) Write the login step in beforeEach' }, example: 'test.beforeEach(async ({ page }) => {...})' },
          { pattern: "test\\('", label: { tr: '3) En az bir test ekle', en: '3) Add at least one test' }, example: "test('...', async ({ page }) => {...})" },
          { pattern: 'mode.*serial|describe\\.serial', label: { tr: '4) Gerekirse serial mode belirt', en: '4) Specify serial mode if needed' }, example: "test.describe.configure({ mode: 'serial' });" },
        ],
        successOutput: { tr: '✅ Doğru yapı!', en: '✅ Correct structure! Login logic lives in one place (beforeEach), each test focuses only on its own behavior.' },
        retryOutput: { tr: '❌ Eksik adım var.', en: '❌ A step is missing — you need describe, beforeEach, and at least one test.' },
      },
      {
        type: 'quiz',
        question: { tr: 'test.beforeAll() içinde { page } yerine neden { browser } kullanılır?', en: 'Why does test.beforeAll() use { browser } instead of { page }?' },
        options: [
          { id: 'a', text: 'page is created fresh per test, there\'s no shared page available in beforeAll' },
          { id: 'b', text: 'browser runs faster' },
          { id: 'c', text: 'The page fixture only works in TypeScript' },
          { id: 'd', text: 'There is no difference, they are the same thing' },
        ],
        correct: 'a',
        explanation: { tr: 'page fixture test-scoped\'dır ve testler arası izolasyonu garanti eder. beforeAll bir kere çalıştığı için page fixture\'ı orada anlamlı değildir.', en: 'The page fixture is test-scoped — it\'s created fresh for every single test to guarantee isolation. Since beforeAll runs only once, the page fixture doesn\'t make sense there; instead the browser fixture is provided, and you can manually open a page with browser.newPage() if needed.' },
      
        retryQuestion: {
      "question": {
            "tr": "test.beforeAll() kullanırken neden 'browser' fixture'ını tercih etmeliyiz?",
            "en": "Why should we prefer the 'browser' fixture when using test.beforeAll()?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Çünkü browser fixture'ı testler arası izolasyonu bozar.",
                        "en": "Because the browser fixture breaks test isolation."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Çünkü page fixture'ı sadece test.beforeEach() içinde erişilebilirdir.",
                        "en": "Because the page fixture is only accessible within test.beforeEach()."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Çünkü browser fixture'ı, beforeAll içinde manuel olarak context ve page oluşturmamıza olanak sağlar.",
                        "en": "Because the browser fixture allows us to manually create contexts and pages within beforeAll."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Çünkü browser fixture'ı test süresini kısaltır.",
                        "en": "Because the browser fixture shortens the test execution time."
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "beforeAll, tekil testlerin yaşam döngüsünden bağımsız olduğu için otomatik page fixture'ına sahip değildir. Browser fixture'ını kullanarak manuel bir sayfa veya context oluşturmak, kurulum işlemlerini (setUp) özelleştirmenize imkan verir.",
            "en": "Since beforeAll is independent of individual test lifecycles, it does not have the automatic page fixture. Using the browser fixture allows you to manually instantiate a context or page, giving you control over the setup process."
      }
}
},
    ],
  },
}

const s12 = {
  tr: {
    title: '📦 Page Object Model — Doğru Yapılışı',
    blocks: [
      {
        type: 'simple-box', emoji: '🏠',
        content: 'Page Object Model, Java\'daki encapsulation ilkesinin test katmanına uygulanmasıdır: bir sınıf kendi iç implementasyonunu gizler ve dışarıya sadece bir API (metod) seti sunar — tıpkı HashMap\'in içinde nasıl çalıştığını bilmeden put() ve get() kullanman gibi. LoginPage sınıfı, "#email" locator\'ının hangi attribute\'a dayandığını, "Giriş Yap" butonunun DOM\'da tam olarak nerede olduğunu gizler; test sadece loginPage.login("user@test.com", "pass123") çağırır. Peki neden test dosyasına locator\'ı direkt yazmak yetmez? Frontend ekibi login formunu yeniden düzenlediğinde, locator test dosyasına dağılmışsa her test dosyasını taramak gerekir — Java\'da bir private field\'ın adını değiştirince IDE otomatik refactor yapsa da, Playwright test dosyalarına yayılmış string locator\'ları IDE bulamaz. LoginPage sınıfı değiştirilince tüm testler otomatik güncellenir. QA gerçeği: "login flow değişti, 47 test kırmızı yandı" krizi genellikle POM uygulanmamış projelerde gerçekleşir; POM\'un varlığında aynı değişiklik LoginPage.java\'da (veya login-page.ts\'de) tek bir locator güncellemesi demektir ve 47 test otomatik yeşile döner.',
      },
      {
        type: 'text',
        content: 'POM olmadan: 20 farklı test dosyasında aynı login locator\'ları ve aynı login adımları kopyalanır. Login butonu "Giriş Yap" yerine "Oturum Aç" olarak değiştiğinde, 20 dosyayı tek tek düzeltmen gerekir. POM ile: locator ve login mantığı LoginPage sınıfında bir kere yazılır; buton metni değiştiğinde sadece o sınıfı güncellersin, tüm testler otomatik düzelir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Bu, Selenium projelerinde yazdığın "Page Object" sınıflarıyla %100 aynı tasarım deseni — @FindBy ile alan tanımlayıp login() metodu yazdığın LoginPage class\'ını hatırla. Playwright\'ta @FindBy yerine constructor içinde page.getByRole(...) ile locator tanımlarsın; PageFactory.initElements() gibi ekstra bir başlatma adımına gerek yoktur, locator\'lar "lazy" çalışır (gerçek arama, kullanıldığı anda olur).',
      },
      { type: 'heading', text: 'İlk Page Object\'in' },
      {
        type: 'code', language: 'typescript',
        code: `// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('E-posta');
    this.passwordInput = page.getByLabel('Şifre');
    this.signInButton = page.getByRole('button', { name: 'Giriş Yap' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('başarılı giriş dashboard\\'a yönlendirir', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('kullanici@example.com', 'sifre123');
  await expect(page).toHaveURL('/dashboard');
});

test('yanlış şifre hata mesajı gösterir', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('kullanici@example.com', 'yanlissifre');
  await expect(loginPage.errorMessage).toHaveText('Geçersiz kimlik bilgileri');
});`,
      },
      {
        type: 'playwright-visual',
        concept: 'pom-flow',
        icon: '📦',
        title: { tr: 'POM Olmadan vs POM ile', en: 'Without POM vs With POM' },
        steps: [
          {
            id: 'no-pom', label: 'POM Yok — Kod Tekrarı', labelEn: 'No POM — Duplicated Code', visualState: 'no-pom',
            description: { tr: '20 test dosyasının her birinde aynı email/password locator\'ları ve aynı login adımları ayrı ayrı yazılmış. Buton metni değişirse 20 dosya elle düzeltilmeli.', en: '20 test files each have the same email/password locators and the same login steps copy-pasted. If the button text changes, all 20 files need manual fixing.' },
            code: `// login.spec.ts\npage.getByLabel('E-posta').fill(...)\n// checkout.spec.ts\npage.getByLabel('E-posta').fill(...)\n// profile.spec.ts\npage.getByLabel('E-posta').fill(...)\n// ...17 dosya daha 😱`,
          },
          {
            id: 'extract', label: 'LoginPage Sınıfına Taşı', labelEn: 'Extract into LoginPage Class', visualState: 'extract',
            description: { tr: 'Tekrar eden locator + login mantığı TEK bir LoginPage sınıfına taşınır. Artık "tek doğru kaynak" (single source of truth) var.', en: 'The duplicated locator + login logic is moved into ONE LoginPage class. Now there\'s a single source of truth.' },
            code: `class LoginPage {\n  emailInput = page.getByLabel('E-posta');\n  async login(e, p) { ... }\n}`,
          },
          {
            id: 'reuse', label: '20 Test Aynı Sınıfı Kullanır', labelEn: '20 Tests Reuse the Same Class', visualState: 'reuse',
            description: { tr: 'Her test dosyası new LoginPage(page) yapıp loginPage.login(...) çağırır. Locator tanımı artık sadece bir yerde.', en: 'Every test file does new LoginPage(page) and calls loginPage.login(...). The locator definition now lives in exactly one place.' },
            code: `const loginPage = new LoginPage(page);\nawait loginPage.login(email, pass);`,
          },
          {
            id: 'change', label: 'UI Değişti → Tek Yer Düzelt', labelEn: 'UI Changes → Fix One Place', visualState: 'change',
            description: { tr: '"Giriş Yap" butonu "Oturum Aç" oldu. Sadece LoginPage.ts içindeki bir satırı değiştirirsin — 20 test dosyasına dokunmazsın, hepsi otomatik düzelir.', en: 'The "Sign in" button becomes "Log in". You change exactly one line in LoginPage.ts — you never touch the 20 test files, they all just work.' },
            code: `// LoginPage.ts — TEK satır değişti\nsignInButton = page.getByRole('button',\n  { name: 'Oturum Aç' }); // ✅`,
          },
        ],
      },
      { type: 'heading', text: 'En İyi Pratikler' },
      {
        type: 'table',
        headers: ['Kural', 'Neden'],
        rows: [
          ['Eylemleri expose et, implementasyonu değil', 'login(email, pass) yaz; emailInput\'u dışarıya açıp testte .fill() çağırma — iç yapı değişirse test kırılır'],
          ['Navigasyon yapan metot, yeni Page Object döndürsün', 'async login(): Promise<DashboardPage> { ...; return new DashboardPage(this.page); } → zincirleme kullanım mümkün olur'],
          ['Assertion\'ları Page Object\'in İÇİNE yazma', 'Page Object veri ve eylem sağlar; doğrulamayı test kendisi yapar — farklı testler farklı assertion isteyebilir'],
          ['Dinamik locator\'lar için metot kullan', 'productCard(name) gibi parametre alan bir metot yaz; statik locator\'lar property olarak kalsın'],
          ['Tekrarlayan UI parçaları (navbar, modal) için Component Object yaz', 'NavBar sınıfı ProductsPage içine inject edilebilir, kod tekrarını önler'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🤔',
        title: 'POM Her Zaman Gerekli mi?',
        content: 'Hayır. Tek seferlik bir keşif testi yazıyorsan, UI hâlâ hızla değişiyorsa ya da sayfa çok basitse (1-2 eleman) POM ekstra karmaşıklık katar. Kural: "Önce POM olmadan başla, kod tekrarını fark ettiğin anda çıkar (extract)." Erken POM yazmak, henüz şekillenmemiş bir UI için yanlış bir abstraction oluşturabilir.',
      },
      playwrightPomRippleFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — LoginPage Sınıfını Doğru Kullan', en: 'Try It Yourself — Use the LoginPage Class Correctly' },
        intro: { tr: 'Bir testte LoginPage sınıfını doğru sırayla kullan: önce instance oluştur, sayfaya git, login ol, sonra assertion yaz.', en: 'Use the LoginPage class correctly in a test: first create an instance, navigate, log in, then assert.' },
        starterCommands: {
          tr: `const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('kullanici@example.com', 'sifre123');
await expect(page).toHaveURL('/dashboard');`,
          en: `const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('user@example.com', 'password123');
await expect(page).toHaveURL('/dashboard');`,
        },
        expectedSteps: [
          { pattern: 'new LoginPage', label: { tr: '1) LoginPage instance\'ı oluştur', en: '1) Create a LoginPage instance' }, example: 'const loginPage = new LoginPage(page);' },
          { pattern: '\\.goto\\(', label: { tr: '2) Sayfaya git', en: '2) Navigate to the page' }, example: 'await loginPage.goto();' },
          { pattern: '\\.login\\(', label: { tr: '3) login() metodunu çağır', en: '3) Call the login() method' }, example: "await loginPage.login(email, pass);" },
          { pattern: 'expect\\(', label: { tr: '4) Sonucu test içinde doğrula', en: '4) Assert the result in the test' }, example: "await expect(page).toHaveURL('/dashboard');" },
        ],
        successOutput: { tr: '✅ Doğru kullanım! Locator/login mantığı LoginPage\'de, assertion testin kendisinde — sorumluluklar net ayrılmış.', en: '✅ Correct usage! Locator/login logic lives in LoginPage, the assertion lives in the test — responsibilities are cleanly separated.' },
        retryOutput: { tr: '❌ Bir adım eksik veya sırası yanlış.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Page Object sınıfının içine assertion (expect) yazmamak neden önerilir?', en: 'Why is it recommended NOT to put assertions (expect) inside a Page Object class?' },
        options: [
          { id: 'a', text: 'Playwright Page Object içinde expect() çalıştırmaya izin vermez' },
          { id: 'b', text: 'Farklı testler aynı eylemden sonra farklı şeyler doğrulamak isteyebilir; Page Object veri/eylem sağlamalı, doğrulama testin sorumluluğunda olmalı' },
          { id: 'c', text: 'Assertion\'lar sadece test dosyasının en üstünde tanımlanabilir' },
          { id: 'd', text: 'Performans nedeniyle assertion\'lar Page Object\'i yavaşlatır' },
        ],
        correct: 'b',
        explanation: { tr: 'Page Object\'ler "ne yapılabilir ve hangi veri var" sağlar (eylemler + locator\'lar). "Bu sonucun doğru olup olmadığı" testin bağlamına göre değişir — bu yüzden esnekliği korumak için assertion testte kalmalı.', en: 'Page Objects provide "what can be done and what data exists" (actions + locators). "Whether this result is correct" depends on the test\'s context — so assertions should stay in the test to preserve flexibility.' },
      
        retryQuestion: {
      "question": {
            "tr": "Page Object Model (POM) kullanırken, assertion'ları (doğrulamaları) testin kendisinde tutmanın temel avantajı nedir?",
            "en": "What is the primary advantage of keeping assertions inside the test itself when using the Page Object Model (POM)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Assertion'ları PO'ya yazmak kodun çalışma süresini kısaltır",
                        "en": "Writing assertions in PO decreases the code execution time"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Testlerin, PO tarafından sağlanan eylemlerden sonra kendi doğrulama mantıklarını özelleştirebilmesini sağlar",
                        "en": "It allows tests to customize their own verification logic after actions provided by the PO"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "PO'lar, expect() fonksiyonunun çalışması için gerekli olan bağımlılıklara sahip değildir",
                        "en": "PO's do not possess the necessary dependencies for the expect() function to run"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Playwright'ta assertion'ların Page Object'ler içinde kullanılması yasaktır",
                        "en": "It is forbidden to use assertions inside Page Objects in Playwright"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "PO'lar eylemlerin ve yapıların bir temsilidir. Testin başarısı bağlamına göre değişebilir, bu nedenle doğrulamayı testin sorumluluğunda bırakmak kodun yeniden kullanılabilirliğini artırır.",
            "en": "POs are a representation of actions and structures. A test's success condition can vary by context, so leaving verification as the test's responsibility improves reusability."
      }
}
},
    ],
  },
  en: {
    title: '📦 Page Object Model Done Right',
    blocks: [
      {
        type: 'simple-box', emoji: '🏠',
        content: 'The Page Object Model is the encapsulation principle from Java applied to the test layer: a class hides its internal implementation and exposes only an API (set of methods) to the outside — just like you use HashMap\'s put() and get() without knowing how it works internally. A LoginPage class hides which attribute the "#email" locator is based on and exactly where the "Sign In" button sits in the DOM; the test simply calls loginPage.login("user@test.com", "pass123"). Why isn\'t writing locators directly in test files good enough? When the front-end team rearranges the login form, if locators are scattered across test files you have to scan every one of them — in Java an IDE can auto-refactor a renamed private field, but string locators spread across Playwright test files are invisible to the IDE. When the LoginPage class is updated, all tests update automatically. The QA reality: the "login flow changed and 47 tests went red" crisis almost always happens in projects without POM; with POM, the same change means updating one locator in LoginPage.ts and watching all 47 tests turn green on their own.',
      },
      {
        type: 'text',
        content: 'Without POM: the same login locators and login steps get copy-pasted across 20 test files. When the login button changes from "Sign in" to "Log in", you have to fix 20 files one by one. With POM: the locator and login logic are written once in a LoginPage class; when the button text changes, you update that one class, and every test automatically works again.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'This is the exact same design pattern as the "Page Object" classes you wrote in Selenium projects — remember the LoginPage class with @FindBy fields and a login() method? In Playwright, instead of @FindBy you define locators in the constructor with page.getByRole(...); there\'s no extra initialization step like PageFactory.initElements() — locators are "lazy" (the actual lookup happens only when used).',
      },
      { type: 'heading', text: 'Creating Your First Page Object' },
      {
        type: 'code', language: 'typescript',
        code: `// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('successful login redirects to dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await expect(page).toHaveURL('/dashboard');
});

test('wrong password shows an error message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'wrongpassword');
  await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
});`,
      },
      {
        type: 'playwright-visual',
        concept: 'pom-flow',
        icon: '📦',
        title: { tr: 'POM Olmadan vs POM ile', en: 'Without POM vs With POM' },
        steps: [
          {
            id: 'no-pom', label: 'No POM — Duplicated Code', labelEn: 'No POM — Duplicated Code', visualState: 'no-pom',
            description: { tr: '20 test dosyasının her birinde aynı email/password locator\'ları ayrı ayrı yazılmış.', en: '20 test files each have the same email/password locators and the same login steps copy-pasted. If the button text changes, all 20 files need manual fixing.' },
            code: `// login.spec.ts\npage.getByLabel('Email').fill(...)\n// checkout.spec.ts\npage.getByLabel('Email').fill(...)\n// profile.spec.ts\npage.getByLabel('Email').fill(...)\n// ...17 more files 😱`,
          },
          {
            id: 'extract', label: 'Extract into LoginPage Class', labelEn: 'Extract into LoginPage Class', visualState: 'extract',
            description: { tr: 'Tekrar eden locator + login mantığı TEK bir LoginPage sınıfına taşınır.', en: 'The duplicated locator + login logic is moved into ONE LoginPage class. Now there\'s a single source of truth.' },
            code: `class LoginPage {\n  emailInput = page.getByLabel('Email');\n  async login(e, p) { ... }\n}`,
          },
          {
            id: 'reuse', label: '20 Tests Reuse the Same Class', labelEn: '20 Tests Reuse the Same Class', visualState: 'reuse',
            description: { tr: 'Her test dosyası new LoginPage(page) yapıp loginPage.login(...) çağırır.', en: 'Every test file does new LoginPage(page) and calls loginPage.login(...). The locator definition now lives in exactly one place.' },
            code: `const loginPage = new LoginPage(page);\nawait loginPage.login(email, pass);`,
          },
          {
            id: 'change', label: 'UI Changes → Fix One Place', labelEn: 'UI Changes → Fix One Place', visualState: 'change',
            description: { tr: '"Giriş Yap" butonu "Oturum Aç" oldu. Sadece LoginPage.ts içindeki bir satırı değiştirirsin.', en: 'The "Sign in" button becomes "Log in". You change exactly one line in LoginPage.ts — you never touch the 20 test files, they all just work.' },
            code: `// LoginPage.ts — ONE line changed\nsignInButton = page.getByRole('button',\n  { name: 'Log in' }); // ✅`,
          },
        ],
      },
      { type: 'heading', text: 'Best Practices' },
      {
        type: 'table',
        headers: ['Rule', 'Why'],
        rows: [
          ['Expose actions, not implementation', 'Write login(email, pass); don\'t expose emailInput and call .fill() in the test — internal changes would break tests'],
          ['Methods that navigate should return a new Page Object', 'async login(): Promise<DashboardPage> { ...; return new DashboardPage(this.page); } → enables chaining'],
          ['Don\'t put assertions INSIDE the Page Object', 'Page Objects provide data and actions; the test itself should verify — different tests may need different assertions'],
          ['Use methods for dynamic locators', 'Write a method that takes a parameter, like productCard(name); keep static locators as properties'],
          ['Write Component Objects for repeated UI pieces (navbar, modal)', 'A NavBar class can be injected into ProductsPage, avoiding duplication'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🤔',
        title: 'Is POM Always Necessary?',
        content: 'No. If you\'re writing a one-off exploratory test, the UI is still changing rapidly, or the page is very simple (1-2 elements), POM adds unnecessary complexity. The rule of thumb: "Start without page objects. Extract them when you notice duplication." Writing POM too early can lock in the wrong abstraction for a UI that hasn\'t settled yet.',
      },
      playwrightPomRippleFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — LoginPage Sınıfını Doğru Kullan', en: 'Try It Yourself — Use the LoginPage Class Correctly' },
        intro: { tr: 'Bir testte LoginPage sınıfını doğru sırayla kullan.', en: 'Use the LoginPage class correctly in a test: first create an instance, navigate, log in, then assert.' },
        starterCommands: {
          tr: `const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('kullanici@example.com', 'sifre123');
await expect(page).toHaveURL('/dashboard');`,
          en: `const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('user@example.com', 'password123');
await expect(page).toHaveURL('/dashboard');`,
        },
        expectedSteps: [
          { pattern: 'new LoginPage', label: { tr: '1) LoginPage instance\'ı oluştur', en: '1) Create a LoginPage instance' }, example: 'const loginPage = new LoginPage(page);' },
          { pattern: '\\.goto\\(', label: { tr: '2) Sayfaya git', en: '2) Navigate to the page' }, example: 'await loginPage.goto();' },
          { pattern: '\\.login\\(', label: { tr: '3) login() metodunu çağır', en: '3) Call the login() method' }, example: "await loginPage.login(email, pass);" },
          { pattern: 'expect\\(', label: { tr: '4) Sonucu test içinde doğrula', en: '4) Assert the result in the test' }, example: "await expect(page).toHaveURL('/dashboard');" },
        ],
        successOutput: { tr: '✅ Doğru kullanım!', en: '✅ Correct usage! Locator/login logic lives in LoginPage, the assertion lives in the test — responsibilities are cleanly separated.' },
        retryOutput: { tr: '❌ Bir adım eksik veya sırası yanlış.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Page Object sınıfının içine assertion (expect) yazmamak neden önerilir?', en: 'Why is it recommended NOT to put assertions (expect) inside a Page Object class?' },
        options: [
          { id: 'a', text: 'Playwright does not allow calling expect() inside a Page Object' },
          { id: 'b', text: 'Different tests may want to verify different things after the same action; the Page Object should provide data/actions, while verification stays the test\'s responsibility' },
          { id: 'c', text: 'Assertions can only be defined at the top of a test file' },
          { id: 'd', text: 'Assertions slow down the Page Object for performance reasons' },
        ],
        correct: 'b',
        explanation: { tr: 'Page Object\'ler "ne yapılabilir ve hangi veri var" sağlar. Sonucun doğru olup olmadığı testin bağlamına göre değişir.', en: 'Page Objects provide "what can be done and what data exists" (actions + locators). "Whether this result is correct" depends on the test\'s context — so assertions should stay in the test to preserve flexibility.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright testlerinde Page Object sınıfı içinde assertion barındırmamanın en önemli sebebi nedir?",
            "en": "What is the most significant reason to avoid including assertions within a Page Object class in Playwright tests?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Playwright mimarisi Page Object içinde assertion'ların kullanılmasını desteklemez",
                        "en": "Playwright architecture does not support the use of assertions within Page Objects"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Page Object sadece arayüz etkileşimlerine odaklanmalı; farklı testler aynı eylem için farklı doğrulama kriterlerine sahip olabilir",
                        "en": "Page Object should focus only on UI interactions; different tests might have different verification criteria for the same action"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Assertion kodları sadece test dosyalarının en alt satırında kullanılabilir",
                        "en": "Assertion codes can only be used on the very last line of test files"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Page Object'in karmaşıklığını artırarak testlerin başarısız olmasına yol açar",
                        "en": "It increases the complexity of the Page Object and leads to test failures"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Page Object'ler sayfa yapısını ve eylemleri temsil etmelidir. Eğer assertion'ı PO içine gömerseniz, aynı sayfayı farklı bir test senaryosunda farklı bir şeyi kontrol etmek için kullanamazsınız.",
            "en": "Page Objects should represent the page structure and actions. If you embed the assertion inside the PO, you cannot use the same page in a different test scenario to check something else."
      }
}
},
    ],
  },
}

const s13 = {
  tr: {
    title: '🐞 Debugging — UI Mode & Trace Viewer',
    blocks: [
      {
        type: 'simple-box', emoji: '🎥',
        content: 'Playwright Trace Viewer, uçak kaza araştırmacılarının incelediği uçuş veri kaydedici (kara kutu) gibi çalışır: her aksiyonu, her network isteğini, her DOM anlık görüntüsünü ve her console log\'unu milisaniye hassasiyetiyle zaman çizelgesinde kaydeder; kazadan saatler sonra bile tam olarak neyin nerede ve neden bozulduğunu yeniden canlandırabilirsin. Peki Selenium\'da test hata ayıklaması nasıl yapılırdı? Java\'da başarısız bir test için genellikle System.out.println() satırları eklenir, log dosyaları incelenir, lokal ortamda yeniden çalıştırılır ve eğer lokal ortam CI\'yi taklit etmiyorsa sorun hiç tekrar etmezdi — "CI\'da kırılıyor ama bende çalışıyor" klasik çıkmazı. Playwright Trace Viewer\'da playwright show-trace trace.zip komutunu çalıştırırsın ve tarayıcıda tam bir zaman çizelgesi açılır: test o an hangi sayfadaydı, hangi element neredeydi, network isteği ne döndürdü, hangi adımda bekleme zaman aşımına uğradı — her şey tek ekranda. QA gerçeği: CI\'da gecenin köründe patlayan ve lokal ortamda tekrar etmeyen hatalar (environment-specific flakiness) test dünyasının en maliyetli zaman kayıplarındandır; Trace Viewer bu category\'yi araştırılabilir (debuggable) hale getirir ve investigation süresini saat yerine dakikaya indirir.',
      },
      {
        type: 'text',
        content: 'Selenium\'da bir test CI\'da fail olduğunda elinde genelde sadece bir stack trace ve belki bir log satırı olur — "neden" sorusuna cevap vermek için testi local\'de tekrar tekrar çalıştırman gerekir. Playwright\'ta bunun için üç farklı araç var: UI Mode (testi canlı, adım adım gözlemleme), Trace Viewer (geçmişe dönük "zaman yolculuğu" — kayıttan tekrar izleme) ve screenshot/video (statik kanıt).',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Selenium projelerinde flaky bir test CI\'da patladığında elinde TestNG/Allure raporundaki bir stack trace ve en fazla manuel eklediğin bir ekran görüntüsü olurdu — "tam o anda DOM neye benziyordu" sorusunun cevabı genelde yoktu. Playwright\'ın trace.zip dosyası, o anki TÜM DOM snapshot\'ını, network isteklerini, console loglarını ve her adımın ekran görüntüsünü saklar — local\'de hiç koşturmadan "zaman yolculuğu" yaparsın.',
      },
      { type: 'heading', text: 'Hızlı Debug Komutları' },
      {
        type: 'table',
        headers: ['Komut', 'Ne yapar'],
        rows: [
          ['npx playwright test --debug', 'Inspector açılır, test adım adım duraklatılabilir, Pick Locator ile elemana tıklayıp locator üretebilirsin'],
          ['npx playwright test --ui', 'UI Mode — testleri görsel arayüzden çalıştır, timeline\'da gezin, "time travel" ile her adımdaki DOM\'u gör'],
          ['npx playwright test --headed', 'Tarayıcı görünür şekilde çalışır (headless değil)'],
          ['npx playwright test --headed --slowmo=500', 'Her aksiyon arasına 500ms yavaşlatma ekler — gözle takip etmek için'],
          ['page.pause()', 'Kod içinde bu satıra gelince Inspector açılır, oradan devam/adım adım ilerletebilirsin'],
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'ui-mode',
        icon: '🖥️',
        title: { tr: 'Playwright UI Mode — Gerçek Arayüz', en: 'Playwright UI Mode — The Real Interface' },
        steps: [
          {
            id: 'launch', label: 'UI Mode Açılıyor', labelEn: 'Launching UI Mode', visualState: 'launch',
            description: { tr: 'npx playwright test --ui komutu, sol tarafta tüm test dosyalarının ağaç görünümünü, ortada bir önizleme alanını içeren ayrı bir pencere açar.', en: 'The command npx playwright test --ui opens a dedicated window with a tree view of all test files on the left and a preview area in the middle.' },
            code: `$ npx playwright test --ui`,
          },
          {
            id: 'run', label: 'Test Çalıştırılıyor', labelEn: 'Running a Test', visualState: 'run',
            description: { tr: 'Bir teste tıkladığında, her adım (goto, fill, click, expect) sırayla yeşil ✓ veya kırmızı ✗ ile işaretlenerek listelenir; testin canlı browser görüntüsü ortada akar.', en: 'Clicking a test lists every step (goto, fill, click, expect) one by one, marking each green ✓ or red ✗; the live browser view streams in the middle.' },
            code: `▶ login.spec.ts > successful login\n  ✓ goto('/login')\n  ✓ fill('Email')\n  ⏳ click('Sign in')`,
          },
          {
            id: 'timetravel', label: 'Time Travel — Adıma Tıkla', labelEn: 'Time Travel — Click a Step', visualState: 'timetravel',
            description: { tr: 'Geçmişteki herhangi bir adıma tıkladığında, sayfanın O ANDAKİ tam görünümü (DOM snapshot) anında gösterilir — testi yeniden çalıştırmana gerek yok.', en: 'Clicking any past step instantly shows the page\'s exact appearance (DOM snapshot) AT THAT MOMENT — no need to re-run the test.' },
            code: `// 3. adıma tıkla → o anki DOM görünür\n✓ fill('Email') ← buraya tıklandı\n  📸 snapshot anında gösterilir`,
          },
          {
            id: 'fail', label: 'Hata Anını İncele', labelEn: 'Inspect the Failure', visualState: 'fail',
            description: { tr: 'Bir adım kırmızı ✗ ise, sağ panelde tam hata mesajı, "Expected vs Received" karşılaştırması ve o anki DOM\'un ekran görüntüsü birlikte görünür.', en: 'When a step is red ✗, the right panel shows the full error message, an "Expected vs Received" comparison, and a screenshot of the DOM at that moment — all together.' },
            code: `✗ expect(locator).toBeVisible()\n  Expected: visible\n  Received: <element not found>\n  📸 [hata anı ekran görüntüsü]`,
          },
        ],
      },
      { type: 'heading', text: 'Trace Viewer — Geçmişe Dönük Tam Kayıt' },
      {
        type: 'code', language: 'typescript',
        code: `// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'on-first-retry',   // CI için ideal: sadece retry'da kaydet
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

// Kaydedilen trace'i incele:
// npx playwright show-trace test-results/login-chromium/trace.zip`,
      },
      {
        type: 'playwright-visual',
        concept: 'trace',
        icon: '📊',
        title: { tr: 'Trace Kaydı — Adım Adım', en: 'Trace Recording — Step by Step' },
        steps: [
          { id: 'record', label: 'Kayıt Başladı', labelEn: 'Recording Started', visualState: 'record', description: { tr: 'context.tracing.start() (veya config\'teki trace ayarı) ile her action, network isteği ve DOM snapshot kaydedilmeye başlar.', en: 'context.tracing.start() (or the trace config) begins recording every action, network request, and DOM snapshot.' }, code: `await context.tracing.start({\n  screenshots: true, snapshots: true\n});` },
          { id: 'screenshot', label: 'Hata → Screenshot', labelEn: 'Failure → Screenshot', visualState: 'screenshot', description: { tr: 'screenshot: "only-on-failure" ayarıyla sadece test fail olduğunda bir ekran görüntüsü otomatik kaydedilir — diskte yer kaplamadan.', en: 'With screenshot: "only-on-failure", a screenshot is automatically captured only when the test fails — without wasting disk space.' }, code: `screenshot: 'only-on-failure'` },
          { id: 'video', label: 'Video Kaydı', labelEn: 'Video Recording', visualState: 'video', description: { tr: 'video: "retain-on-failure" tüm testi kaydeder ama test PASS olursa videoyu otomatik siler — sadece fail olanlar saklanır.', en: 'video: "retain-on-failure" records the whole test but auto-deletes the video if the test passes — only failures are kept.' }, code: `video: 'retain-on-failure'` },
          { id: 'viewer', label: 'show-trace ile Aç', labelEn: 'Open with show-trace', visualState: 'viewer', description: { tr: 'npx playwright show-trace trace.zip ile timeline, network sekmesi, console logları ve kaynak kod satırı tek ekranda açılır.', en: 'npx playwright show-trace trace.zip opens the timeline, network tab, console logs, and source code line all on one screen.' }, code: `$ npx playwright show-trace trace.zip` },
        ],
      },
      {
        type: 'table',
        headers: ['Strateji', 'trace', 'screenshot', 'video', 'Ne zaman'],
        rows: [
          ['CI (önerilen)', 'on-first-retry', 'only-on-failure', 'retain-on-failure', 'Disk/zaman israfı olmadan yeterli kanıt'],
          ['Lokal geliştirme', 'off (UI Mode kullan)', 'off', 'off', 'UI Mode zaten canlı görüntü sağlıyor'],
          ['Kritik release smoke', 'on', 'on', 'on', 'Stakeholder\'a gösterim / tam kanıt arşivi'],
        ],
      },
      playwrightTraceTimeTravelFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Debug Sırasını Doğru Kur', en: 'Try It Yourself — Build the Right Debug Sequence' },
        intro: { tr: 'CI\'da fail eden bir testi incelemek için doğru sırayı kur: önce raporu indir, sonra trace.zip\'i aç, ardından UI Mode\'da yeniden çalıştır.', en: 'Build the right sequence to investigate a test that failed in CI: download the report first, then open trace.zip, then re-run it in UI Mode.' },
        starterCommands: {
          tr: `npx playwright show-report
npx playwright show-trace test-results/login-chromium/trace.zip
npx playwright test login.spec.ts --ui`,
          en: `npx playwright show-report
npx playwright show-trace test-results/login-chromium/trace.zip
npx playwright test login.spec.ts --ui`,
        },
        expectedSteps: [
          { pattern: 'show-report', label: { tr: '1) HTML raporunu aç', en: '1) Open the HTML report' }, example: 'npx playwright show-report' },
          { pattern: 'show-trace', label: { tr: '2) İlgili trace.zip\'i aç', en: '2) Open the relevant trace.zip' }, example: 'npx playwright show-trace trace.zip' },
          { pattern: '--ui', label: { tr: '3) UI Mode\'da yeniden çalıştır', en: '3) Re-run it in UI Mode' }, example: 'npx playwright test --ui' },
        ],
        successOutput: { tr: '✅ Doğru sıra! Önce kanıtı (rapor+trace) incele, sonra gerekirse canlı UI Mode\'da tekrar üret.', en: '✅ Correct order! Inspect the evidence (report+trace) first, then reproduce live in UI Mode if needed.' },
        retryOutput: { tr: '❌ Adım eksik veya sırası ters.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'CI\'da neden video: "on" yerine genellikle video: "retain-on-failure" tercih edilir?', en: 'Why is video: "retain-on-failure" usually preferred over video: "on" in CI?' },
        options: [
          { id: 'a', text: 'retain-on-failure videoyu sadece test fail olursa saklar; PASS olan binlerce testin videosunu diskte tutmak gereksiz yer/maliyet yaratır' },
          { id: 'b', text: '"on" ayarı geçersizdir' },
          { id: 'c', text: 'retain-on-failure daha yüksek çözünürlükte kayıt yapar' },
          { id: 'd', text: 'Hiçbir fark yoktur' },
        ],
        correct: 'a',
        explanation: { tr: 'Yüzlerce/binlerce PASS testin videosunu saklamak depolama maliyeti ve artifact upload süresini ciddi şekilde artırır. retain-on-failure sadece gerçekten incelemen gereken (fail olan) testlerin videosunu tutar.', en: 'Keeping videos for hundreds or thousands of passing tests seriously increases storage cost and artifact upload time. retain-on-failure keeps videos only for the tests you actually need to investigate (the failing ones).' },
      
        retryQuestion: {
      "question": {
            "tr": "CI ortamında 'video: on' yerine 'video: retain-on-failure' ayarının kullanılmasının temel sebebi nedir?",
            "en": "What is the primary reason for using the 'video: retain-on-failure' setting instead of 'video: on' in a CI environment?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Depolama alanı tasarrufu sağlar ve başarılı testlerin video yükleme yükünü azaltır",
                        "en": "It saves storage space and reduces the upload burden of passing tests"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "'on' ayarı sadece yerel bilgisayarlarda çalışır",
                        "en": "'on' setting only works on local computers"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Sadece 'retain-on-failure' ile videoları indirip inceleyebilirsiniz",
                        "en": "You can only download and examine videos with 'retain-on-failure'"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Video kalitesini artırır",
                        "en": "It improves the video quality"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "CI üzerinde her test için video kaydetmek disk maliyetini ve artifact yükleme süresini artırır. 'retain-on-failure' sadece hata ayıklama gerektiren başarısız testleri tutarak kaynak tasarrufu sağlar.",
            "en": "Recording video for every test on CI increases disk costs and artifact upload time. 'retain-on-failure' saves resources by keeping only the failing tests that require debugging."
      }
}
},
    ],
  },
  en: {
    title: '🐞 Debugging — UI Mode & Trace Viewer',
    blocks: [
      {
        type: 'simple-box', emoji: '🎥',
        content: 'The Playwright Trace Viewer works like the flight data recorder (black box) that aircraft accident investigators examine: it records every action, every network request, every DOM snapshot, and every console log on a millisecond-precise timeline; hours after the crash, you can replay exactly what broke, where, and why. How was test debugging handled in Selenium? In Java, a failing test typically meant adding System.out.println() lines, sifting through log files, and re-running locally — and if the local environment didn\'t mirror CI, the problem never reproduced at all, the classic "breaks in CI but works on my machine" dead end. With Playwright Trace Viewer you run playwright show-trace trace.zip and a full timeline opens in your browser: which page the test was on, where each element was positioned, what the network request returned, and at which step the wait timed out — everything on one screen. The QA reality: failures that explode in CI at midnight but never reproduce locally (environment-specific flakiness) are among the most expensive time sinks in testing; Trace Viewer turns that category into something debuggable and cuts investigation time from hours to minutes.',
      },
      {
        type: 'text',
        content: 'In Selenium, when a test fails in CI you usually have only a stack trace and maybe one log line — answering "why" often means re-running the test locally over and over. Playwright gives you three dedicated tools for this: UI Mode (watch a test live, step by step), Trace Viewer (a recorded "time travel" replay after the fact), and screenshots/video (static evidence).',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In Selenium projects, when a flaky test failed in CI, you usually had a stack trace in the TestNG/Allure report and maybe a manually-added screenshot — "what did the DOM actually look like at that exact moment" usually had no answer. Playwright\'s trace.zip stores the ENTIRE DOM snapshot, network requests, console logs, and a screenshot of every step at that moment — letting you "time travel" without re-running anything locally.',
      },
      { type: 'heading', text: 'Quick Debug Commands' },
      {
        type: 'table',
        headers: ['Command', 'What it does'],
        rows: [
          ['npx playwright test --debug', 'Opens the Inspector — pause step by step, use Pick Locator to click an element and generate its locator'],
          ['npx playwright test --ui', 'UI Mode — run tests from a visual interface, scrub the timeline, "time travel" to see the DOM at any step'],
          ['npx playwright test --headed', 'Runs the browser visibly (not headless)'],
          ['npx playwright test --headed --slowmo=500', 'Adds a 500ms delay between actions — for watching with your own eyes'],
          ['page.pause()', 'Opens the Inspector right when execution reaches this line; resume or step from there'],
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'ui-mode',
        icon: '🖥️',
        title: { tr: 'Playwright UI Mode — Gerçek Arayüz', en: 'Playwright UI Mode — The Real Interface' },
        steps: [
          {
            id: 'launch', label: 'Launching UI Mode', labelEn: 'Launching UI Mode', visualState: 'launch',
            description: { tr: 'npx playwright test --ui komutu, sol tarafta tüm test dosyalarının ağaç görünümünü, ortada bir önizleme alanını içeren ayrı bir pencere açar.', en: 'The command npx playwright test --ui opens a dedicated window with a tree view of all test files on the left and a preview area in the middle.' },
            code: `$ npx playwright test --ui`,
          },
          {
            id: 'run', label: 'Running a Test', labelEn: 'Running a Test', visualState: 'run',
            description: { tr: 'Bir teste tıkladığında, her adım sırayla yeşil ✓ veya kırmızı ✗ ile işaretlenerek listelenir.', en: 'Clicking a test lists every step (goto, fill, click, expect) one by one, marking each green ✓ or red ✗; the live browser view streams in the middle.' },
            code: `▶ login.spec.ts > successful login\n  ✓ goto('/login')\n  ✓ fill('Email')\n  ⏳ click('Sign in')`,
          },
          {
            id: 'timetravel', label: 'Time Travel — Click a Step', labelEn: 'Time Travel — Click a Step', visualState: 'timetravel',
            description: { tr: 'Geçmişteki herhangi bir adıma tıkladığında, sayfanın o anki tam görünümü anında gösterilir.', en: 'Clicking any past step instantly shows the page\'s exact appearance (DOM snapshot) AT THAT MOMENT — no need to re-run the test.' },
            code: `// click step 3 → that exact DOM appears\n✓ fill('Email') ← clicked here\n  📸 snapshot shown instantly`,
          },
          {
            id: 'fail', label: 'Inspect the Failure', labelEn: 'Inspect the Failure', visualState: 'fail',
            description: { tr: 'Bir adım kırmızı ✗ ise, sağ panelde tam hata mesajı ve "Expected vs Received" karşılaştırması görünür.', en: 'When a step is red ✗, the right panel shows the full error message, an "Expected vs Received" comparison, and a screenshot of the DOM at that moment — all together.' },
            code: `✗ expect(locator).toBeVisible()\n  Expected: visible\n  Received: <element not found>\n  📸 [screenshot at failure]`,
          },
        ],
      },
      { type: 'heading', text: 'Trace Viewer — A Full Historical Record' },
      {
        type: 'code', language: 'typescript',
        code: `// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'on-first-retry',   // ideal for CI: record only on retry
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

// Inspect a recorded trace:
// npx playwright show-trace test-results/login-chromium/trace.zip`,
      },
      {
        type: 'playwright-visual',
        concept: 'trace',
        icon: '📊',
        title: { tr: 'Trace Kaydı — Adım Adım', en: 'Trace Recording — Step by Step' },
        steps: [
          { id: 'record', label: 'Recording Started', labelEn: 'Recording Started', visualState: 'record', description: { tr: 'context.tracing.start() ile her action, network isteği ve DOM snapshot kaydedilmeye başlar.', en: 'context.tracing.start() (or the trace config) begins recording every action, network request, and DOM snapshot.' }, code: `await context.tracing.start({\n  screenshots: true, snapshots: true\n});` },
          { id: 'screenshot', label: 'Failure → Screenshot', labelEn: 'Failure → Screenshot', visualState: 'screenshot', description: { tr: 'screenshot: "only-on-failure" ayarıyla sadece test fail olduğunda bir ekran görüntüsü otomatik kaydedilir.', en: 'With screenshot: "only-on-failure", a screenshot is automatically captured only when the test fails — without wasting disk space.' }, code: `screenshot: 'only-on-failure'` },
          { id: 'video', label: 'Video Recording', labelEn: 'Video Recording', visualState: 'video', description: { tr: 'video: "retain-on-failure" tüm testi kaydeder ama test PASS olursa videoyu otomatik siler.', en: 'video: "retain-on-failure" records the whole test but auto-deletes the video if the test passes — only failures are kept.' }, code: `video: 'retain-on-failure'` },
          { id: 'viewer', label: 'Open with show-trace', labelEn: 'Open with show-trace', visualState: 'viewer', description: { tr: 'npx playwright show-trace trace.zip ile timeline, network sekmesi, console logları tek ekranda açılır.', en: 'npx playwright show-trace trace.zip opens the timeline, network tab, console logs, and source code line all on one screen.' }, code: `$ npx playwright show-trace trace.zip` },
        ],
      },
      {
        type: 'table',
        headers: ['Strategy', 'trace', 'screenshot', 'video', 'When'],
        rows: [
          ['CI (recommended)', 'on-first-retry', 'only-on-failure', 'retain-on-failure', 'Enough evidence without wasting disk/time'],
          ['Local development', 'off (use UI Mode)', 'off', 'off', 'UI Mode already gives you live visibility'],
          ['Critical release smoke', 'on', 'on', 'on', 'Stakeholder demos / a full evidence archive'],
        ],
      },
      playwrightTraceTimeTravelFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Debug Sırasını Doğru Kur', en: 'Try It Yourself — Build the Right Debug Sequence' },
        intro: { tr: 'CI\'da fail eden bir testi incelemek için doğru sırayı kur.', en: 'Build the right sequence to investigate a test that failed in CI: download the report first, then open trace.zip, then re-run it in UI Mode.' },
        starterCommands: {
          tr: `npx playwright show-report
npx playwright show-trace test-results/login-chromium/trace.zip
npx playwright test login.spec.ts --ui`,
          en: `npx playwright show-report
npx playwright show-trace test-results/login-chromium/trace.zip
npx playwright test login.spec.ts --ui`,
        },
        expectedSteps: [
          { pattern: 'show-report', label: { tr: '1) HTML raporunu aç', en: '1) Open the HTML report' }, example: 'npx playwright show-report' },
          { pattern: 'show-trace', label: { tr: '2) İlgili trace.zip\'i aç', en: '2) Open the relevant trace.zip' }, example: 'npx playwright show-trace trace.zip' },
          { pattern: '--ui', label: { tr: '3) UI Mode\'da yeniden çalıştır', en: '3) Re-run it in UI Mode' }, example: 'npx playwright test --ui' },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! Inspect the evidence (report+trace) first, then reproduce live in UI Mode if needed.' },
        retryOutput: { tr: '❌ Adım eksik veya sırası ters.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'CI\'da neden video: "on" yerine genellikle video: "retain-on-failure" tercih edilir?', en: 'Why is video: "retain-on-failure" usually preferred over video: "on" in CI?' },
        options: [
          { id: 'a', text: 'retain-on-failure keeps the video only if the test fails; storing video for thousands of passing tests wastes disk and money for no reason' },
          { id: 'b', text: 'The "on" setting is invalid' },
          { id: 'c', text: 'retain-on-failure records at a higher resolution' },
          { id: 'd', text: 'There is no difference' },
        ],
        correct: 'a',
        explanation: { tr: 'Yüzlerce/binlerce PASS testin videosunu saklamak depolama maliyeti ve artifact upload süresini ciddi şekilde artırır.', en: 'Keeping videos for hundreds or thousands of passing tests seriously increases storage cost and artifact upload time. retain-on-failure keeps videos only for the tests you actually need to investigate (the failing ones).' },
      
        retryQuestion: {
      "question": {
            "tr": "CI ortamında trace: 'on' yerine trace: 'retain-on-failure' yapılandırmasını seçmenin temel avantajı nedir?",
            "en": "What is the primary advantage of choosing trace: 'retain-on-failure' over trace: 'on' in a CI environment?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "retain-on-failure yalnızca başarısız testlerde trace dosyası üretir, böylece başarılı binlerce testin yarattığı depolama yükü ve ağ trafiği önlenmiş olur"
            },
            {
                  "id": "b",
                  "text": "retain-on-failure trace dosyasını buluta otomatik olarak yedekler"
            },
            {
                  "id": "c",
                  "text": "trace: 'on' ayarı performans sorunlarına yol açtığı için devre dışı bırakılmıştır"
            },
            {
                  "id": "d",
                  "text": "İki seçenek arasında dosya boyutu veya kaynak kullanımı açısından bir fark yoktur"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Trace dosyaları detaylı hata ayıklama bilgisi içerir ve oldukça büyük olabilir. Başarılı testler için trace saklamak depolama maliyetlerini artırır ve CI pipeline süresini gereksiz yere uzatır. retain-on-failure sadece hata durumunda bu veriyi tutarak verimli bir süreç sağlar.",
            "en": "Trace files contain detailed debugging information and can be quite large. Storing traces for successful tests increases storage costs and unnecessarily extends CI pipeline duration. retain-on-failure provides an efficient process by only preserving this data in case of failure."
      }
}
},
    ],
  },
}

const s14 = {
  tr: {
    title: '⚡ Paralel · Cross-Browser · CI/CD',
    blocks: [
      {
        type: 'simple-box', emoji: '🏎️',
        content: 'Playwright\'ın paralel test sistemi, Java\'daki java.util.concurrent.ForkJoinPool mimarisinin tarayıcı test dünyasındaki karşılığıdır: işi bağımsız alt görevlere böler, her worker kendi izole browser context\'inde çalışır ve paylaşılan state olmadığı için thread-safety sorunları da oluşmaz. Peki Selenium Grid zaten paralel koşumu sağlamıyor muydu? Selenium Grid, uzak bir sunucu ağını yönetmek için ciddi altyapı kurulumu gerektiriyordu: Hub + Node konfigürasyonu, Docker container yönetimi, driver versiyonlarını tüm node\'larda güncel tutmak. Playwright\'ta workers: 4 satırı playwright.config.ts\'ye eklersen ve testler izole yazılmışsa paralel çalışım otomatik etkinleşir — ek altyapı gerekmez. Cross-browser testi ise aynı test paketinin Chromium, Firefox ve WebKit projelerine eşzamanlı uygulanmasıdır; başka bir dilde her browser için ayrı konfigürasyon yazman gerekirdi. QA gerçeği: PR başına "tüm testler çalışsın" politikası uygulanıyorsa 500 testin 40 dakika sürmesi bir PR\'ı bloke eder; 8 worker ile bu süre yaklaşık 5 dakikaya iner ve geliştiriciler testi bypass etmek yerine bekleyerek PR\'ı merge eder — bu, ekip kültüründe testi gerçek bir kalite kapısına dönüştürür.',
      },
      {
        type: 'text',
        content: '30 dakika süren bir test paketi her commit\'te göz ardı edilir; 3 dakika süren bir paket her commit\'te koşulur. Bunu sağlayan iki mekanizma var: (1) paralel worker\'lar — testleri birden fazla CPU çekirdeğine bölmek, (2) sharding — testleri birden fazla CI makinesine bölmek. CI/CD entegrasyonu da bunları otomatik tetikleyen pipeline\'dır.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'workers ayarı, Maven Surefire/Failsafe plugin\'inin forkCount + parallel="methods" ayarına karşılık gelir. test.describe.serial() → JUnit 5\'in @TestMethodOrder ile sıralı zorunlu testleri. --shard=1/4 → CI\'da matrix build\'lerle testleri makineler arası bölmenin Playwright\'taki built-in karşılığı (Selenium Grid\'de bunu manuel kurman gerekirdi).',
      },
      { type: 'heading', text: 'Paralel Çalışma — Worker Ayarları' },
      {
        type: 'code', language: 'typescript',
        code: `// playwright.config.ts
export default defineConfig({
  fullyParallel: true,          // aynı dosyadaki testler de paralelleşsin
  workers: process.env.CI ? 2 : undefined, // CI'da 2, lokalde yarı çekirdek (default)
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});

// Bağımlı (sıralı) bir grup — checkout adımları birbirine bağlı
test.describe.serial('sıralı ödeme akışı', () => {
  test('1. sepete ekle', async ({ page }) => { /* ... */ });
  test('2. teslimat bilgisi gir', async ({ page }) => { /* ... */ });
  test('3. ödemeyi tamamla', async ({ page }) => { /* ... */ });
  // Biri fail olursa kalanlar otomatik skip edilir
});`,
      },
      {
        type: 'animated-timeline',
        title: { tr: '⏱️ Serial vs Paralel (4 Worker) — Aynı 4 Test Dosyası', en: '⏱️ Serial vs Parallel (4 Workers) — the Same 4 Test Files' },
        description: { tr: 'Her dosya ~8 saniye sürüyor. Tek worker\'da sırayla çalıştığında toplam süre toplanır; 4 worker\'da paralel çalıştığında en uzun dosya kadar sürer.', en: 'Each file takes ~8 seconds. Running serially on one worker, the times add up; running in parallel on 4 workers, it only takes as long as the slowest single file.' },
        tracks: [
          { label: 'Serial — workers: 1', labelEn: 'Serial — workers: 1', duration: 32000, color: '#ef4444', badge: { tr: '32s', en: '32s' }, detail: { tr: '4 dosya × 8s, sırayla', en: '4 files × 8s, one after another' } },
          { label: 'Paralel — workers: 4', labelEn: 'Parallel — workers: 4', duration: 8500, color: '#10b981', badge: { tr: '8.5s', en: '8.5s' }, detail: { tr: '4 dosya aynı anda, en uzunu kadar sürer', en: '4 files run simultaneously, takes as long as the slowest one' } },
        ],
      },
      { type: 'heading', text: 'Cross-Browser & Mobil Emulation' },
      {
        type: 'table',
        headers: ['Motor', 'Gerçek tarayıcı', 'Komut'],
        rows: [
          ['chromium', 'Chrome, Edge', 'npx playwright test --project=chromium'],
          ['firefox', 'Firefox (Gecko)', 'npx playwright test --project=firefox'],
          ['webkit', 'Safari (macOS/iOS)', 'npx playwright test --project=webkit'],
        ],
      },
      {
        type: 'code', language: 'typescript',
        code: `// Mobil emulation — gerçek cihaz profilleri
projects: [
  { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  { name: 'iPad', use: { ...devices['iPad Pro 11'] } },
],

// Sadece bir tarayıcıda bilinen sorun varsa
test.skip(browserName === 'webkit', 'Safari\\'de henüz desteklenmiyor — bkz. JIRA-482');`,
      },
      { type: 'heading', text: 'GitHub Actions ile CI/CD' },
      {
        type: 'code', language: 'yaml',
        code: `# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]   # 4 makineye böl
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with:
          name: playwright-report-\${{ matrix.shard }}
          path: playwright-report/
          retention-days: 7`,
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🔀', label: '--shard=1/4 ... 4/4', desc: 'Test paketini 4 CI makinesine böler; 20dk\'lık paket ~5dk\'ya iner.' },
          { icon: '🔐', label: 'GitHub Secrets', desc: 'Şifre/token gibi bilgiler ${{ secrets.X }} ile workflow\'a, process.env.X ile koda enjekte edilir.' },
          { icon: '🌐', label: 'webServer ayarı', desc: 'playwright.config.ts içinde webServer: { command: "npm start", url: "..." } ile Playwright önce uygulamanı başlatır, sonra testi koşar.' },
          { icon: '📦', label: 'Resmi Docker image', desc: 'mcr.microsoft.com/playwright:v1.4x — tüm tarayıcılar/dependency\'ler kurulu gelir, playwright install gerekmez.' },
        ],
      },
      playwrightWorkersNoInfraFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — CI Workflow Adımlarını Doğru Sırala', en: 'Try It Yourself — Order the CI Workflow Steps Correctly' },
        intro: { tr: 'Bir GitHub Actions workflow\'unun doğru adım sırasını yaz: checkout, kurulum, browser indirme, test çalıştırma, artifact yükleme.', en: 'Write the correct step order for a GitHub Actions workflow: checkout, install, install browsers, run tests, upload artifacts.' },
        starterCommands: {
          tr: `actions/checkout@v4
npm ci
npx playwright install --with-deps
npx playwright test
actions/upload-artifact@v4`,
          en: `actions/checkout@v4
npm ci
npx playwright install --with-deps
npx playwright test
actions/upload-artifact@v4`,
        },
        expectedSteps: [
          { pattern: 'checkout', label: { tr: '1) Kodu checkout et', en: '1) Check out the code' }, example: 'actions/checkout@v4' },
          { pattern: 'npm ci', label: { tr: '2) Bağımlılıkları kur', en: '2) Install dependencies' }, example: 'npm ci' },
          { pattern: 'playwright install', label: { tr: '3) Tarayıcıları kur', en: '3) Install browsers' }, example: 'npx playwright install --with-deps' },
          { pattern: 'playwright test', label: { tr: '4) Testleri çalıştır', en: '4) Run the tests' }, example: 'npx playwright test' },
          { pattern: 'upload-artifact', label: { tr: '5) Raporu artifact olarak yükle', en: '5) Upload the report as an artifact' }, example: 'actions/upload-artifact@v4' },
        ],
        successOutput: { tr: '✅ Doğru sıra! Bu sıra olmadan (örn. browser kurmadan test çalıştırmak) pipeline patlar.', en: '✅ Correct order! Without this exact order (e.g. running tests before installing browsers), the pipeline breaks.' },
        retryOutput: { tr: '❌ Sıra yanlış veya bir adım eksik.', en: '❌ Wrong order or a step is missing.' },
      },
      {
        type: 'quiz',
        question: { tr: '--shard=1/4 ne işe yarar?', en: 'What does --shard=1/4 do?' },
        options: [
          { id: 'a', text: 'Testleri 4 kat hızlandırır, hiçbir ek makine gerekmez' },
          { id: 'b', text: 'Test paketinin 1/4\'lük dilimini bu makinede çalıştırır; diğer dilimler ayrı CI job\'larında (2/4, 3/4, 4/4) paralel koşar' },
          { id: 'c', text: 'Sadece ilk 4 testi çalıştırır' },
          { id: 'd', text: 'Testleri 4 farklı tarayıcıda art arda çalıştırır' },
        ],
        correct: 'b',
        explanation: { tr: 'Sharding, BÜYÜK bir test paketini CI\'da birden fazla MAKİNEYE (job) böler — her job sadece kendi diliminden sorumludur. Bu, paralel worker\'lardan (aynı makinedeki CPU çekirdekleri) farklıdır; ikisi birlikte kullanılır.', en: 'Sharding splits a LARGE test suite across multiple CI MACHINES (jobs) — each job is only responsible for its own slice. This is different from parallel workers (CPU cores on the same machine); the two are typically combined.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir CI pipeline yapılandırmasında --shard=3/5 parametresi ne anlama gelir?",
            "en": "What does the --shard=3/5 parameter mean in a CI pipeline configuration?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Testleri 5 farklı tarayıcıda aynı anda çalıştırır"
            },
            {
                  "id": "b",
                  "text": "Test paketini 5 parçaya böler ve mevcut makine bu parçalardan 3. olanını işler"
            },
            {
                  "id": "c",
                  "text": "Toplamda 3 makine kullanır ve her birinde 5 worker çalıştırır"
            },
            {
                  "id": "d",
                  "text": "Sadece 3. ve 5. testleri çalıştırır"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Sharding, test paketini toplam 'N' parçaya böler ve 'M/N' ifadesiyle bu job'ın kaçıncı parçadan sorumlu olduğu belirtilir. Bu, farklı makinelere dağıtılan paralel bir iş yükü yönetimidir.",
            "en": "Sharding divides the test suite into a total of 'N' slices, and 'M/N' indicates which specific slice this job is responsible for. This is a parallel workload management distributed across different machines."
      }
}
},
    ],
  },
  en: {
    title: '⚡ Parallel · Cross-Browser · CI/CD',
    blocks: [
      {
        type: 'simple-box', emoji: '🏎️',
        content: 'Playwright\'s parallel test system is the browser-testing counterpart of Java\'s java.util.concurrent.ForkJoinPool architecture: it splits work into independent subtasks, each worker runs in its own isolated browser context, and because there is no shared state there are no thread-safety problems either. Didn\'t Selenium Grid already provide parallel execution? Selenium Grid required significant infrastructure setup to manage a remote server network: Hub + Node configuration, Docker container management, keeping driver versions in sync across all nodes. In Playwright, adding workers: 4 to playwright.config.ts is all it takes — as long as tests are written in an isolated way, parallelism is automatic with no extra infrastructure. Cross-browser testing means applying the same test suite simultaneously to Chromium, Firefox, and WebKit projects; in other frameworks you\'d need separate configurations for each browser. The QA reality: if a team enforces a "all tests must pass per PR" policy, 500 tests taking 40 minutes blocks every PR and engineers start bypassing tests rather than waiting; with 8 workers that drops to roughly 5 minutes, and developers wait and merge properly — which turns testing into a real quality gate in team culture.',
      },
      {
        type: 'text',
        content: 'A test suite that takes 30 minutes gets ignored on every commit; one that takes 3 minutes gets run on every commit. Two mechanisms make this possible: (1) parallel workers — splitting tests across multiple CPU cores, and (2) sharding — splitting tests across multiple CI machines. CI/CD integration is the pipeline that triggers all of this automatically.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'The workers setting corresponds to Maven Surefire/Failsafe\'s forkCount + parallel="methods" setting. test.describe.serial() → JUnit 5\'s @TestMethodOrder for tests that must run in order. --shard=1/4 → Playwright\'s built-in equivalent of splitting tests across machines via CI matrix builds (something you had to set up manually with Selenium Grid).',
      },
      { type: 'heading', text: 'Parallel Execution — Worker Settings' },
      {
        type: 'code', language: 'typescript',
        code: `// playwright.config.ts
export default defineConfig({
  fullyParallel: true,          // parallelize tests within the same file too
  workers: process.env.CI ? 2 : undefined, // 2 in CI, half the cores locally (default)
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});

// A dependent (serial) group — checkout steps depend on each other
test.describe.serial('sequential checkout flow', () => {
  test('1. add to cart', async ({ page }) => { /* ... */ });
  test('2. enter shipping info', async ({ page }) => { /* ... */ });
  test('3. complete payment', async ({ page }) => { /* ... */ });
  // If one fails, the rest are automatically skipped
});`,
      },
      {
        type: 'animated-timeline',
        title: { tr: '⏱️ Serial vs Paralel (4 Worker) — Aynı 4 Test Dosyası', en: '⏱️ Serial vs Parallel (4 Workers) — the Same 4 Test Files' },
        description: { tr: 'Her dosya ~8 saniye sürüyor. Tek worker\'da sırayla çalıştığında toplam süre toplanır.', en: 'Each file takes ~8 seconds. Running serially on one worker, the times add up; running in parallel on 4 workers, it only takes as long as the slowest single file.' },
        tracks: [
          { label: 'Serial — workers: 1', labelEn: 'Serial — workers: 1', duration: 32000, color: '#ef4444', badge: { tr: '32s', en: '32s' }, detail: { tr: '4 dosya × 8s, sırayla', en: '4 files × 8s, one after another' } },
          { label: 'Paralel — workers: 4', labelEn: 'Parallel — workers: 4', duration: 8500, color: '#10b981', badge: { tr: '8.5s', en: '8.5s' }, detail: { tr: '4 dosya aynı anda, en uzunu kadar sürer', en: '4 files run simultaneously, takes as long as the slowest one' } },
        ],
      },
      { type: 'heading', text: 'Cross-Browser & Mobile Emulation' },
      {
        type: 'table',
        headers: ['Engine', 'Real browser', 'Command'],
        rows: [
          ['chromium', 'Chrome, Edge', 'npx playwright test --project=chromium'],
          ['firefox', 'Firefox (Gecko)', 'npx playwright test --project=firefox'],
          ['webkit', 'Safari (macOS/iOS)', 'npx playwright test --project=webkit'],
        ],
      },
      {
        type: 'code', language: 'typescript',
        code: `// Mobile emulation — real device profiles
projects: [
  { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  { name: 'iPad', use: { ...devices['iPad Pro 11'] } },
],

// Skip a test only when a browser has a known issue
test.skip(browserName === 'webkit', 'Not supported in Safari yet — see JIRA-482');`,
      },
      { type: 'heading', text: 'CI/CD with GitHub Actions' },
      {
        type: 'code', language: 'yaml',
        code: `# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]   # split across 4 machines
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with:
          name: playwright-report-\${{ matrix.shard }}
          path: playwright-report/
          retention-days: 7`,
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🔀', label: '--shard=1/4 ... 4/4', desc: 'Splits the suite across 4 CI machines; a 20-minute suite drops to ~5 minutes.' },
          { icon: '🔐', label: 'GitHub Secrets', desc: 'Sensitive values are injected into the workflow with ${{ secrets.X }} and into code with process.env.X.' },
          { icon: '🌐', label: 'webServer setting', desc: 'In playwright.config.ts, webServer: { command: "npm start", url: "..." } makes Playwright start your app first, then run tests.' },
          { icon: '📦', label: 'Official Docker image', desc: 'mcr.microsoft.com/playwright:v1.4x — comes with all browsers/dependencies pre-installed, no playwright install needed.' },
        ],
      },
      playwrightWorkersNoInfraFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — CI Workflow Adımlarını Doğru Sırala', en: 'Try It Yourself — Order the CI Workflow Steps Correctly' },
        intro: { tr: 'Bir GitHub Actions workflow\'unun doğru adım sırasını yaz.', en: 'Write the correct step order for a GitHub Actions workflow: checkout, install, install browsers, run tests, upload artifacts.' },
        starterCommands: {
          tr: `actions/checkout@v4
npm ci
npx playwright install --with-deps
npx playwright test
actions/upload-artifact@v4`,
          en: `actions/checkout@v4
npm ci
npx playwright install --with-deps
npx playwright test
actions/upload-artifact@v4`,
        },
        expectedSteps: [
          { pattern: 'checkout', label: { tr: '1) Kodu checkout et', en: '1) Check out the code' }, example: 'actions/checkout@v4' },
          { pattern: 'npm ci', label: { tr: '2) Bağımlılıkları kur', en: '2) Install dependencies' }, example: 'npm ci' },
          { pattern: 'playwright install', label: { tr: '3) Tarayıcıları kur', en: '3) Install browsers' }, example: 'npx playwright install --with-deps' },
          { pattern: 'playwright test', label: { tr: '4) Testleri çalıştır', en: '4) Run the tests' }, example: 'npx playwright test' },
          { pattern: 'upload-artifact', label: { tr: '5) Raporu artifact olarak yükle', en: '5) Upload the report as an artifact' }, example: 'actions/upload-artifact@v4' },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! Without this exact order (e.g. running tests before installing browsers), the pipeline breaks.' },
        retryOutput: { tr: '❌ Sıra yanlış veya bir adım eksik.', en: '❌ Wrong order or a step is missing.' },
      },
      {
        type: 'quiz',
        question: { tr: '--shard=1/4 ne işe yarar?', en: 'What does --shard=1/4 do?' },
        options: [
          { id: 'a', text: 'It makes tests run 4x faster on a single machine, no extra machines needed' },
          { id: 'b', text: 'It runs 1/4 of the suite on this machine; the other slices (2/4, 3/4, 4/4) run in parallel in separate CI jobs' },
          { id: 'c', text: 'It only runs the first 4 tests' },
          { id: 'd', text: 'It runs the tests on 4 different browsers one after another' },
        ],
        correct: 'b',
        explanation: { tr: 'Sharding, BÜYÜK bir test paketini CI\'da birden fazla MAKİNEYE böler. Bu, paralel worker\'lardan farklıdır; ikisi birlikte kullanılır.', en: 'Sharding splits a LARGE test suite across multiple CI MACHINES (jobs) — each job is only responsible for its own slice. This is different from parallel workers (CPU cores on the same machine); the two are typically combined.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta Sharding (örneğin --shard=2/3) kullanımı hakkında hangisi doğrudur?",
            "en": "Which statement about using Sharding (e.g., --shard=2/3) in Playwright is true?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Sharding, tek bir makine içindeki CPU çekirdeklerini kullanır, harici makine gerektirmez"
            },
            {
                  "id": "b",
                  "text": "Sharding, toplam test paketini parçalara ayırıp farklı CI job'ları arasında dağıtarak toplam test süresini düşürmeyi hedefler"
            },
            {
                  "id": "c",
                  "text": "Sharding sadece görsel regresyon testleri için kullanılabilir"
            },
            {
                  "id": "d",
                  "text": "Sharding kullanıldığında --workers ayarının kullanılmasına gerek kalmaz"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Sharding, test paketini mantıksal parçalara ayırarak farklı makinelerde (job'larda) aynı anda çalışmasını sağlar. Bu yöntem, paralel worker kullanımıyla (aynı makinedeki CPU kullanımı) birlikte çalışarak test süresini optimize eder.",
            "en": "Sharding splits the test suite into logical chunks to run them simultaneously on different machines (jobs). This method works alongside parallel worker usage (CPU usage on the same machine) to optimize overall test execution time."
      }
}
},
    ],
  },
}

const s15 = {
  tr: {
    title: '🔐 Auth & Session Yönetimi',
    blocks: [
      {
        type: 'simple-box', emoji: '🎫',
        content: 'Playwright storageState mekanizması, bir kurumsal SSO (Single Sign-On) sisteminin test katmanındaki yansımasıdır: kimlik doğrulama bir kez yapılır, oturum token\'ı merkezi bir depoya yazılır ve ardından gelen tüm istekler bu token\'ı göstererek güvenli bölgelere erişir. Peki her testin kendi login adımını çalıştırması neden sorunludur? Login işlemi — UI formunu doldurmak, 2FA varsa göndermek, redirect\'leri beklemek — her test için 3-5 saniye ekler. 200 testin her biri login yapıyorsa bu 10+ dakika ekstra süre, üstelik login endpoint\'i rate limit uyguluyorsa test suite\'in yarısı 429 hatası alabilir. Java\'da Selenium ile bu sorunu çözmek için genellikle bir @BeforeSuite session kurulumu yapılır, ama browser context\'leri arasında session paylaşmak elle yönetim gerektirir. Playwright\'ta storageState: "./auth.json" tek satırla tüm worker\'lara aynı session\'ı dağıtır. QA gerçeği: MFA (Multi-Factor Authentication), OAuth ve SAML tabanlı giriş akışları test ortamında taklit etmek yerine gerçek servis ile test edildiğinde login adımı en kırılgan ve en yavaş test adımına dönüşür; storageState+globalSetup pattern bu kırılganlığı çözmenin production-grade yoludur.',
      },
      {
        type: 'text',
        content: 'Her testin başında UI\'dan login olmak (email yaz, şifre yaz, butona tıkla, dashboard\'u bekle) yavaştır ve kırılgandır: 2 saniyelik bir login\'i 100 testte tekrarlarsan 200 saniye boşa gider, login ekranındaki herhangi bir küçük UI değişikliği TÜM testleri kırabilir. Çözüm: login\'i SADECE BİR KERE test et (ayrı bir "login akışı" test grubunda), sonra diğer tüm testler için oturumu storageState ile sakla ve yeniden kullan.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Bu, Selenium\'da bazı projelerde yaptığın "login\'i API\'den yap, sonra cookie\'yi driver.manage().addCookie() ile enjekte et" hack\'inin resmî, built-in versiyonudur. storageState({ path: "auth.json" }) → context.addCookies(...) + localStorage enjeksiyonunu birlikte, tek dosyada saklar. playwright.config.ts içindeki projects + dependencies yapısı, TestNG\'deki @BeforeSuite ile bir kere login olup session\'ı tüm sınıflara yaymaya benzer ama dosya tabanlı ve paralel-güvenlidir.',
      },
      { type: 'heading', text: 'Login Akışını Bir Kere, İyice Test Et' },
      {
        type: 'code', language: 'typescript',
        code: `// auth.spec.ts — login mantığının KENDİSİ burada, sadece burada test edilir
test.describe('Login', () => {
  test('doğru bilgilerle dashboard\\'a yönlendirir', async ({ page }) => { /* ... */ });
  test('yanlış şifre hata gösterir', async ({ page }) => { /* ... */ });
  test('çıkış yapınca oturum temizlenir', async ({ page }) => { /* ... */ });
});
// Diğer 100 test dosyası BİR DAHA login UI'ını test ETMEZ — storageState kullanır.`,
      },
      { type: 'heading', text: '3 Adımda storageState Kurulumu' },
      {
        type: 'code', language: 'typescript',
        code: `// 1) tests/auth.setup.ts — login yap, oturumu kaydet
import { test as setup } from '@playwright/test';
setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('E-posta').fill('kullanici@example.com');
  await page.getByLabel('Şifre').fill('sifre123');
  await page.getByRole('button', { name: 'Giriş Yap' }).click();
  await page.waitForURL('/dashboard');
  await page.context().storageState({ path: '.auth/user.json' });
});

// 2) playwright.config.ts — setup'ı bağımlılık yap
export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /.*\\.setup\\.ts/ },
    {
      name: 'tests',
      dependencies: ['setup'],          // önce setup çalışır
      use: { storageState: '.auth/user.json' }, // sonra bu oturum yüklenir
    },
  ],
});

// 3) .gitignore — oturum dosyasını commit ETME
// .auth/`,
      },
      {
        type: 'animated-timeline',
        title: { tr: '⏱️ Her Testte UI Login vs storageState', en: '⏱️ UI Login Every Test vs storageState' },
        description: { tr: '100 test için: her testte UI\'dan login olmak vs bir kere login + 100 test için anında hazır oturum.', en: 'For 100 tests: logging in via the UI every single time vs logging in once + an instantly-ready session for all 100 tests.' },
        tracks: [
          { label: 'Her testte UI login (100 test × 2s)', labelEn: 'UI login every test (100 × 2s)', duration: 20000, color: '#ef4444', badge: { tr: '~200s toplam', en: '~200s total' }, detail: { tr: 'Login UI\'daki tek bir küçük değişiklik 100 testi de kırabilir', en: 'One small login UI change can break all 100 tests' } },
          { label: 'storageState (1 login + 100 anında)', labelEn: 'storageState (1 login + 100 instant)', duration: 2200, color: '#10b981', badge: { tr: '~2s toplam', en: '~2s total' }, detail: { tr: 'Login mantığı sadece auth.spec.ts\'de test edilir/kırılır', en: 'Login logic is tested/breaks in exactly one place: auth.spec.ts' } },
        ],
      },
      { type: 'heading', text: 'Çoklu Rol (Admin / Customer / Guest)' },
      {
        type: 'table',
        headers: ['Proje', 'storageState', 'Kullanım'],
        rows: [
          ['admin-tests', '.auth/admin.json', 'Admin paneli, kullanıcı yönetimi testleri'],
          ['customer-tests', '.auth/customer.json', 'Sepet, ödeme, profil testleri'],
          ['guest-tests', '(storageState yok)', 'Login olmadan erişilen genel sayfalar'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🔑',
        title: 'API ile Login — Daha da Hızlı',
        content: 'UI\'dan login yerine doğrudan request.post("/api/login", { data: { email, password } }) çağırıp dönen token\'ı cookie/localStorage olarak set edebilirsin. UI\'ya hiç dokunmadığı için saniyenin altında çalışır. MFA/2FA için: test ortamında MFA\'yı kapatmak, MFA\'sız özel bir test kullanıcısı kullanmak veya otpauth gibi bir kütüphaneyle TOTP kodu üretmek üç yaygın çözümdür.',
      },
      playwrightStorageStateSsoFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — storageState Kurulum Sırası', en: 'Try It Yourself — storageState Setup Order' },
        intro: { tr: 'Bir setup test dosyasında doğru sırayı yaz: login ol, dashboard\'u bekle, oturumu kaydet.', en: 'Write the correct order in a setup test file: log in, wait for the dashboard, save the session.' },
        starterCommands: {
          tr: `await page.goto('/login');
await page.getByLabel('E-posta').fill('kullanici@example.com');
await page.getByRole('button', { name: 'Giriş Yap' }).click();
await page.waitForURL('/dashboard');
await page.context().storageState({ path: '.auth/user.json' });`,
          en: `await page.goto('/login');
await page.getByLabel('Email').fill('user@example.com');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.waitForURL('/dashboard');
await page.context().storageState({ path: '.auth/user.json' });`,
        },
        expectedSteps: [
          { pattern: "goto\\('/login'\\)", label: { tr: '1) Login sayfasına git', en: '1) Navigate to the login page' }, example: "await page.goto('/login');" },
          { pattern: '\\.fill\\(', label: { tr: '2) Bilgileri doldur', en: '2) Fill in the credentials' }, example: "await page.getByLabel('Email').fill(...);" },
          { pattern: '\\.click\\(', label: { tr: '3) Giriş butonuna tıkla', en: '3) Click the sign-in button' }, example: "await page.getByRole('button').click();" },
          { pattern: 'waitForURL', label: { tr: '4) Dashboard\'a yönlendirmeyi bekle', en: '4) Wait for the dashboard redirect' }, example: "await page.waitForURL('/dashboard');" },
          { pattern: 'storageState', label: { tr: '5) Oturumu dosyaya kaydet', en: '5) Save the session to a file' }, example: "await page.context().storageState({ path: '...' });" },
        ],
        successOutput: { tr: '✅ Doğru sıra! storageState dosyası şimdi diğer tüm projeler tarafından kullanılabilir.', en: '✅ Correct order! The storageState file can now be used by every other project.' },
        retryOutput: { tr: '❌ Sıra yanlış veya adım eksik — özellikle storageState kaydı en sonda olmalı.', en: '❌ Wrong order or a step is missing — storageState must be saved last.' },
      },
      {
        type: 'quiz',
        question: { tr: 'storageState dosyasını .gitignore\'a eklemek neden önemlidir?', en: 'Why is it important to add the storageState file to .gitignore?' },
        options: [
          { id: 'a', text: 'Dosya çok büyük olduğu için repo şişer' },
          { id: 'b', text: 'İçinde gerçek oturum cookie\'leri/token\'ları vardır — commit edilirse bu kimlik bilgileri repo geçmişinde sızar ve başkası tarafından kullanılabilir' },
          { id: 'c', text: 'Git .json dosyalarını desteklemez' },
          { id: 'd', text: 'CI bu dosyayı otomatik silmek için arar' },
        ],
        correct: 'b',
        explanation: { tr: 'storageState dosyası gerçek bir oturumun cookie/localStorage verisini içerir — bu, kullanıcı adı/şifreden farksız bir kimlik bilgisidir. Git geçmişine girerse, dosya silinse bile geçmiş commit\'lerde kalır ve güvenlik riski oluşturur.', en: 'The storageState file contains a real session\'s cookie/localStorage data — that\'s just as sensitive as a username/password. If it lands in git history, it stays in old commits even after deletion, creating a security risk.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright projelerinde .auth klasörünü veya içinde yer alan oturum dosyalarını version control (Git) sistemine eklememenin temel sebebi nedir?",
            "en": "What is the primary reason for avoiding the addition of the .auth folder or session files to version control (Git) in Playwright projects?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Dosya formatı Git ile uyumlu değildir.",
                        "en": "The file format is incompatible with Git."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Bu dosyalar canlı oturum verileri ve hassas tokenlar içerir; commit edilmeleri güvenlik açığına ve kimlik hırsızlığına yol açar.",
                        "en": "These files contain live session data and sensitive tokens; committing them leads to security vulnerabilities and credential theft."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Oturum dosyaları çok küçüktür ve Git tarafından yok sayılır.",
                        "en": "Session files are too small and are ignored by Git."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Playwright bu dosyaları her çalıştırmada yeniden oluşturur.",
                        "en": "Playwright recreates these files on every run."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Oturum dosyaları, uygulamanın kimlik doğrulama bilgilerini doğrudan depolar. Bunları repo içinde tutmak, kimlik bilgilerini herkese açık hale getirmekle aynıdır ve büyük bir güvenlik riski oluşturur.",
            "en": "Session files store the raw authentication data of the application. Keeping them in the repository is equivalent to hardcoding credentials, which poses a significant security risk."
      }
}
},
    ],
  },
  en: {
    title: '🔐 Handling Auth & Sessions',
    blocks: [
      {
        type: 'simple-box', emoji: '🎫',
        content: 'Playwright\'s storageState mechanism is the test-layer counterpart of a corporate SSO (Single Sign-On) system: authentication is performed once, the session token is written to a central store, and every subsequent request presents that token to access secured areas. Why is running a full login step inside every test a problem? The login flow — filling in the UI form, handling 2FA if present, waiting for redirects — adds 3-5 seconds per test. With 200 tests each doing their own login, that\'s 10+ minutes of extra runtime; and if the login endpoint enforces rate limiting, half the test suite can start failing with 429 errors. In Java with Selenium, the common workaround was a @BeforeSuite session setup, but sharing session state across browser contexts required manual management. In Playwright, storageState: "./auth.json" distributes the same session to all workers in a single line. The QA reality: when MFA, OAuth, or SAML-based login flows are tested against the real service rather than mocked, the login step becomes both the most brittle and the slowest part of the test run. The storageState + globalSetup pattern is the production-grade solution to that brittleness.',
      },
      {
        type: 'text',
        content: 'Logging in through the UI at the start of every test (type email, type password, click the button, wait for the dashboard) is slow and fragile: a 2-second login repeated across 100 tests wastes 200 seconds, and any small UI change on the login screen can break ALL of them. The fix: test login ONLY ONCE (in a dedicated "login flow" test group), then save and reuse that session via storageState for every other test.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'This is the official, built-in version of a hack you may have done in Selenium — "log in via the API, then inject the cookie with driver.manage().addCookie()". storageState({ path: "auth.json" }) stores the equivalent of context.addCookies(...) plus localStorage injection together, in one file. The projects + dependencies structure in playwright.config.ts is similar to logging in once in a TestNG @BeforeSuite and sharing the session across all classes, but file-based and parallel-safe.',
      },
      { type: 'heading', text: 'Test the Login Flow Once, Thoroughly' },
      {
        type: 'code', language: 'typescript',
        code: `// auth.spec.ts — the login logic ITSELF is tested here, and only here
test.describe('Login', () => {
  test('successful login redirects to dashboard', async ({ page }) => { /* ... */ });
  test('invalid credentials shows error', async ({ page }) => { /* ... */ });
  test('logout clears the session', async ({ page }) => { /* ... */ });
});
// The other 100 test files NEVER test the login UI again — they use storageState.`,
      },
      { type: 'heading', text: 'storageState Setup in 3 Steps' },
      {
        type: 'code', language: 'typescript',
        code: `// 1) tests/auth.setup.ts — log in, save the session
import { test as setup } from '@playwright/test';
setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/dashboard');
  await page.context().storageState({ path: '.auth/user.json' });
});

// 2) playwright.config.ts — make setup a dependency
export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /.*\\.setup\\.ts/ },
    {
      name: 'tests',
      dependencies: ['setup'],          // setup runs first
      use: { storageState: '.auth/user.json' }, // then this session is loaded
    },
  ],
});

// 3) .gitignore — DO NOT commit the session file
// .auth/`,
      },
      {
        type: 'animated-timeline',
        title: { tr: '⏱️ Her Testte UI Login vs storageState', en: '⏱️ UI Login Every Test vs storageState' },
        description: { tr: '100 test için: her testte UI\'dan login olmak vs bir kere login + 100 test için anında hazır oturum.', en: 'For 100 tests: logging in via the UI every single time vs logging in once + an instantly-ready session for all 100 tests.' },
        tracks: [
          { label: 'Serial — UI login every test (100 × 2s)', labelEn: 'UI login every test (100 × 2s)', duration: 20000, color: '#ef4444', badge: { tr: '~200s toplam', en: '~200s total' }, detail: { tr: 'Login UI\'daki tek bir küçük değişiklik 100 testi de kırabilir', en: 'One small login UI change can break all 100 tests' } },
          { label: 'storageState (1 login + 100 instant)', labelEn: 'storageState (1 login + 100 instant)', duration: 2200, color: '#10b981', badge: { tr: '~2s toplam', en: '~2s total' }, detail: { tr: 'Login mantığı sadece auth.spec.ts\'de test edilir/kırılır', en: 'Login logic is tested/breaks in exactly one place: auth.spec.ts' } },
        ],
      },
      { type: 'heading', text: 'Multiple Roles (Admin / Customer / Guest)' },
      {
        type: 'table',
        headers: ['Project', 'storageState', 'Used for'],
        rows: [
          ['admin-tests', '.auth/admin.json', 'Admin panel, user management tests'],
          ['customer-tests', '.auth/customer.json', 'Cart, checkout, profile tests'],
          ['guest-tests', '(no storageState)', 'Public pages accessed without logging in'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🔑',
        title: 'API-Based Login — Even Faster',
        content: 'Instead of logging in via the UI, you can call request.post("/api/login", { data: { email, password } }) directly and set the returned token as a cookie/localStorage value. Since it never touches the UI, it runs in well under a second. For MFA/2FA, three common solutions: disable MFA in the test environment, use a dedicated test user without MFA, or generate a TOTP code with a library like otpauth.',
      },
      playwrightStorageStateSsoFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — storageState Kurulum Sırası', en: 'Try It Yourself — storageState Setup Order' },
        intro: { tr: 'Bir setup test dosyasında doğru sırayı yaz.', en: 'Write the correct order in a setup test file: log in, wait for the dashboard, save the session.' },
        starterCommands: {
          tr: `await page.goto('/login');
await page.getByLabel('E-posta').fill('kullanici@example.com');
await page.getByRole('button', { name: 'Giriş Yap' }).click();
await page.waitForURL('/dashboard');
await page.context().storageState({ path: '.auth/user.json' });`,
          en: `await page.goto('/login');
await page.getByLabel('Email').fill('user@example.com');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.waitForURL('/dashboard');
await page.context().storageState({ path: '.auth/user.json' });`,
        },
        expectedSteps: [
          { pattern: "goto\\('/login'\\)", label: { tr: '1) Login sayfasına git', en: '1) Navigate to the login page' }, example: "await page.goto('/login');" },
          { pattern: '\\.fill\\(', label: { tr: '2) Bilgileri doldur', en: '2) Fill in the credentials' }, example: "await page.getByLabel('Email').fill(...);" },
          { pattern: '\\.click\\(', label: { tr: '3) Giriş butonuna tıkla', en: '3) Click the sign-in button' }, example: "await page.getByRole('button').click();" },
          { pattern: 'waitForURL', label: { tr: '4) Dashboard\'a yönlendirmeyi bekle', en: '4) Wait for the dashboard redirect' }, example: "await page.waitForURL('/dashboard');" },
          { pattern: 'storageState', label: { tr: '5) Oturumu dosyaya kaydet', en: '5) Save the session to a file' }, example: "await page.context().storageState({ path: '...' });" },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! The storageState file can now be used by every other project.' },
        retryOutput: { tr: '❌ Sıra yanlış veya adım eksik.', en: '❌ Wrong order or a step is missing — storageState must be saved last.' },
      },
      {
        type: 'quiz',
        question: { tr: 'storageState dosyasını .gitignore\'a eklemek neden önemlidir?', en: 'Why is it important to add the storageState file to .gitignore?' },
        options: [
          { id: 'a', text: 'The file is too large and bloats the repo' },
          { id: 'b', text: 'It contains real session cookies/tokens — committing it leaks credentials into the repo history where anyone could reuse them' },
          { id: 'c', text: 'Git does not support .json files' },
          { id: 'd', text: 'CI looks for this file to delete it automatically' },
        ],
        correct: 'b',
        explanation: { tr: 'storageState dosyası gerçek bir oturumun cookie/localStorage verisini içerir — bu bir kimlik bilgisidir. Git geçmişine girerse, dosya silinse bile geçmiş commit\'lerde kalır.', en: 'The storageState file contains a real session\'s cookie/localStorage data — that\'s just as sensitive as a username/password. If it lands in git history, it stays in old commits even after deletion, creating a security risk.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright Codegen aracını kullandıktan sonra ortaya çıkan test kodunun doğrudan projeye kopyalanması yerine 'refactor' edilmesinin (iyileştirilmesinin) en önemli sebebi nedir?",
            "en": "What is the most important reason for refactoring the test code generated by Playwright Codegen instead of copying it directly into the project?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Codegen her zaman yanlış locator'lar üretir.",
                        "en": "Codegen always produces incorrect locators."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Codegen tarafından üretilen kod bakım gerektiren, tekrar eden ve sürdürülebilirliği zayıf bir yapıya sahip olabilir; optimize edilmesi gerekir.",
                        "en": "Codegen-generated code can be repetitive and hard to maintain; it requires optimization for better sustainability."
                  }
            },
            {
                  "id": "c",
                  "text": "Codegen sadece tek bir test senaryosu üretebilir.",
                  "en": "Codegen can only generate a single test scenario."
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Codegen kodu sadece yerel makinede çalışır.",
                        "en": "Codegen code only runs on local machines."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Codegen, test senaryosu oluştururken hızlı bir iskelet sağlar ancak bu iskelet genellikle hard-coded değerler ve kopyalanmış adımlar içerir. Testlerin ölçeklenebilir ve sağlam olması için Page Object Model gibi yapılara taşınması şarttır.",
            "en": "Codegen provides a quick skeleton for a test case, but it often contains hard-coded values and duplicated steps. Refactoring it into structures like the Page Object Model is essential for scalable and robust testing."
      }
}
},
    ],
  },
}

// ─── YENİ SEKMELER (2026-06-19, devam) — Codegen & Playwright MCP ───

const s16 = {
  tr: {
    title: '🎬 Codegen — Kodu Senin Yerine Yazdır',
    blocks: [
      {
        type: 'simple-box', emoji: '🎙️',
        content: 'npx playwright codegen, Java\'daki IDE makro kaydedicilerin modern web versiyonudur — ancak önemli bir farkla: sıradan makro kaydediciler piksel koordinatları ve mutlak DOM konumlarını kaydeder (dolayısıyla sayfa değişince çöker), Codegen ise role, text ve testid gibi semantik locator stratejilerini kullanır. Peki Codegen ile oluşturulan kodu direkt production testine koyabilir miyiz? Hayır — ve bunu bilmek Codegen\'i doğru kullanmanın kendisidir: Codegen ham madde üretir, test yapısını sen tasarlarsın. Oluşturulan kod tekrarları ortadan kaldırmaz, Page Object kullanmaz ve assertion yazmaz; sen bu kodu alır, POM sınıfına çevirir, fixture\'a bağlar ve anlamlı expect() satırları eklersin. Java\'da Selenium IDE ile kayıt yapıp dışa aktarıyordun ama çıktı Selenium RC syntax\'ına benziyordu ve her sürüm geçişinde yeniden yazılıyordu. Codegen çıktısı ise güncel Playwright API\'sini kullanır. QA gerçeği: yeni bir form akışını test etmek için locator\'ları DOM\'dan elle çıkarmak yerine Codegen\'i 2 dakika çalıştırmak, kaba bir iskelet oluşturmanın en hızlı yoludur — üretkenliği doğrudan artıran bir araç olarak kullanıldığında değerlidir, "otomatik test oluşturucu" olarak kullanılmaya çalışıldığında hayal kırıklığı yaratır.',
      },
      {
        type: 'text',
        content: 'npx playwright codegen <url> komutu İKİ pencere açar: (1) gerçek bir tarayıcı penceresi — burada normal kullanıcı gibi gezinirsin, (2) Playwright Inspector penceresi — burada attığın her adımın karşılığı olan kod satırı CANLI olarak belirir. İşin bitince o kodu kopyalayıp test dosyana yapıştırırsın; genelde küçük rötuşlarla (locator önceliklendirme, assertion ekleme) production-ready hâle gelir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Bu, Selenium IDE\'nin (tarayıcı eklentisi olarak kayıt yapıp Java/diğer dillerde kod export eden araç) Playwright\'taki built-in, komut satırından çalışan, dış eklenti gerektirmeyen versiyonudur. Fark: Selenium IDE genelde CSS/XPath üretirken, Playwright codegen öncelik sırasına göre getByRole/getByLabel gibi dayanıklı locator\'lar üretir — bu yüzden çıkan kod genelde Selenium IDE çıktısından daha az kırılgandır.',
      },
      { type: 'heading', text: 'Komutlar ve Seçenekler' },
      {
        type: 'table',
        headers: ['Komut', 'Ne yapar'],
        rows: [
          ['npx playwright codegen', 'Boş bir sayfayla codegen başlatır'],
          ['npx playwright codegen https://example.com', 'Belirtilen URL ile başlatır'],
          ['npx playwright codegen --target=python https://example.com', 'Python kodu üretir (varsayılan: JavaScript/TypeScript)'],
          ['npx playwright codegen --target=java https://example.com', 'Java (Selenium\'dan geçenler için en tanıdık çıktı)'],
          ['npx playwright codegen --device="iPhone 13" https://example.com', 'Mobil cihaz emülasyonuyla başlatır'],
          ['npx playwright codegen --viewport-size=1280,720 https://example.com', 'Özel pencere boyutuyla başlatır'],
          ['npx playwright codegen --save-storage=auth.json https://example.com', 'Sonunda login session\'ı dosyaya kaydeder (storageState için)'],
          ['npx playwright codegen --load-storage=auth.json https://example.com', 'Kayıtlı bir oturumla (zaten login) başlatır'],
          ['npx playwright codegen -o login.spec.ts https://example.com', 'Üretilen kodu doğrudan bir dosyaya yazar'],
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'codegen-flow',
        icon: '🎬',
        title: { tr: 'Codegen Çalışırken — Gerçek Pencere Akışı', en: 'Codegen in Action — the Real Window Flow' },
        steps: [
          {
            id: 'launch', label: 'Codegen Başlatıldı', labelEn: 'Codegen Launched', visualState: 'launch',
            description: { tr: 'Komut çalıştırıldığında iki pencere açılır: gerçek tarayıcı + boş bir Playwright Inspector paneli. Inspector\'da "Record" (kayıt) açık, dil seçici (JavaScript/Python/Java/C#) görünür.', en: 'Running the command opens two windows: a real browser + an empty Playwright Inspector panel. "Record" is on, and a language picker (JavaScript/Python/Java/C#) is visible.' },
            code: `$ npx playwright codegen https://example.com/login`,
          },
          {
            id: 'recording', label: 'Tıkla, Yaz — Kod Anında Belirir', labelEn: 'Click, Type — Code Appears Instantly', visualState: 'recording',
            description: { tr: 'E-posta kutusuna tıklayıp yazınca .fill(...) satırı belirir; "Giriş Yap" butonuna tıklayınca .click() satırı eklenir. Sen hiçbir kod yazmıyorsun — sadece normal kullanıcı gibi geziniyorsun.', en: 'Clicking and typing in the email box produces a .fill(...) line; clicking "Sign in" adds a .click() line. You write zero code — you just browse like a normal user.' },
            code: `await page.getByLabel('E-posta').click();\nawait page.getByLabel('E-posta').fill('kullanici@example.com');\nawait page.getByRole('button', { name: 'Giriş Yap' }).click();`,
          },
          {
            id: 'assert', label: 'Assertion Ekle (Pick Locator)', labelEn: 'Add an Assertion (Pick Locator)', visualState: 'assert',
            description: { tr: 'Inspector\'daki "Assert visibility" butonuna basıp sayfada bir elemana tıklarsan, otomatik bir expect(...).toBeVisible() satırı eklenir — assertion\'ları da elle yazmana gerek kalmaz.', en: 'Clicking the "Assert visibility" button in the Inspector and then clicking an element on the page adds an automatic expect(...).toBeVisible() line — you don\'t even have to hand-write assertions.' },
            code: `await expect(\n  page.getByText('Tekrar hoş geldin')\n).toBeVisible();`,
          },
          {
            id: 'save', label: 'Kopyala / Kaydet', labelEn: 'Copy / Save', visualState: 'save',
            description: { tr: 'İşin bitince "Copy" butonuyla tüm kodu panoya alır, test dosyana yapıştırırsın. -o login.spec.ts ile baştan bir dosyaya yazdırman da mümkün.', en: 'When you\'re done, the "Copy" button puts all the code on your clipboard to paste into your test file. You can also have it write straight to a file from the start with -o login.spec.ts.' },
            code: `// Panoya kopyalandı ✅\n// login.spec.ts içine yapıştır`,
          },
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '⚠️',
        title: 'Codegen Bir Başlangıç Noktasıdır, Bitmiş Test Değil',
        content: 'Codegen çıktısı genelde çalışır ama kör kör güvenme: (1) bazen gereksiz tıklamalar/duplicate satırlar kaydeder — temizle. (2) Otomatik üretilen locator bazen .first() gerektiren belirsiz bir eşleşme olabilir — kontrol et. (3) Login gibi tekrar eden akışları her test dosyasında yeniden kaydetme — bir kere kaydet, Page Object\'e veya fixture\'a taşı (bkz. önceki sekmeler). (4) --save-storage ile kaydedilen oturum dosyasını ASLA git\'e commit etme.',
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🔍', label: 'Hızlı keşif', desc: 'Bilmediğin bir sayfada hangi locator\'ın doğru çalıştığını anında görürsün.' },
          { icon: '🎯', label: 'Doğru locator önerisi', desc: 'getByRole/getByLabel öncelikli üretir — elle yazsan bulman zaman alacak locator\'ları saniyede üretir.' },
          { icon: '🔐', label: 'Auth akışı kaydetme', desc: '--save-storage ile login\'i bir kere kaydedip storageState olarak diğer testlerde kullanırsın.' },
          { icon: '🌐', label: 'Çok dilli çıktı', desc: 'Aynı kaydı --target ile JS/TS, Python, Java veya C# kodu olarak alabilirsin.' },
        ],
      },
      playwrightCodegenSemanticFilm,
      playwrightCodegenFlowSteps,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Codegen ile Auth Kaydı Doğru Sıra', en: 'Try It Yourself — Correct Order for Recording Auth with Codegen' },
        intro: { tr: 'Bir login akışını kaydedip storageState olarak kaydetmenin doğru komut sırasını yaz.', en: 'Write the correct command order for recording a login flow and saving it as storageState.' },
        starterCommands: {
          tr: `npx playwright codegen --save-storage=auth.json https://example.com/login
# Tarayıcıda login ol, pencereyi kapat
npx playwright codegen --load-storage=auth.json https://example.com/dashboard`,
          en: `npx playwright codegen --save-storage=auth.json https://example.com/login
# log in in the browser, close the window
npx playwright codegen --load-storage=auth.json https://example.com/dashboard`,
        },
        expectedSteps: [
          { pattern: 'save-storage', label: { tr: '1) --save-storage ile codegen başlat', en: '1) Start codegen with --save-storage' }, example: 'npx playwright codegen --save-storage=auth.json <url>' },
          { pattern: 'load-storage', label: { tr: '2) --load-storage ile kayıtlı oturumu kullan', en: '2) Use the saved session with --load-storage' }, example: 'npx playwright codegen --load-storage=auth.json <url>' },
        ],
        dangerousPatterns: [
          { pattern: 'git add.*auth\\.json|git commit.*auth\\.json', label: { tr: 'auth.json gerçek oturum verisi içerir — asla commit etme, .gitignore\'a ekle.', en: 'auth.json contains real session data — never commit it, add it to .gitignore.' } },
        ],
        successOutput: { tr: '✅ Doğru sıra! Önce oturumu kaydet, sonra her codegen/test çalışmasında o dosyayı yükleyip login\'i tekrarlama.', en: '✅ Correct order! Save the session once, then load that file in every later codegen/test run instead of logging in again.' },
        retryOutput: { tr: '❌ Sıra yanlış — önce save-storage, sonra load-storage gelmeli.', en: '❌ Wrong order — save-storage must come before load-storage.' },
      },
      playwrightCodegenPractice,
      {
        type: 'quiz',
        question: { tr: 'Codegen ile üretilen kodu test dosyasına koymadan önce neden gözden geçirmek gerekir?', en: 'Why should you review codegen-generated code before putting it in a test file?' },
        options: [
          { id: 'a', text: 'Codegen kod üretmez, sadece ekran görüntüsü alır' },
          { id: 'b', text: 'Üretilen kod genelde çalışır ama gereksiz/duplicate satırlar, belirsiz locator eşleşmeleri veya tekrar eden login bloklarını içerebilir — bunlar temizlenip Page Object/fixture\'a taşınmalı' },
          { id: 'c', text: 'Codegen sadece Chrome\'da çalışır, diğer tarayıcılarda kod hatalı olur' },
          { id: 'd', text: 'Üretilen kod asla çalışmaz, sadece referans amaçlıdır' },
        ],
        correct: 'b',
        explanation: { tr: 'Codegen mükemmel bir başlangıç noktasıdır ama bir "ham taslak"tır — production kalitesine getirmek için temizlik, locator kontrolü ve tekrar eden mantığın (login gibi) Page Object/fixture\'a çıkarılması gerekir.', en: 'Codegen is an excellent starting point but it\'s a "rough draft" — getting it to production quality requires cleanup, locator review, and extracting repeated logic (like login) into a Page Object/fixture.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta 'Codegen' aracı tarafından üretilen locator'lar neden her zaman en iyi seçenek olmayabilir?",
            "en": "Why are the locators generated by the Playwright 'Codegen' tool sometimes not the best choice?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Codegen locator üretemez.",
                        "en": "Codegen cannot generate locators."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Codegen bazen çok kırılgan (testin bozulmasına müsait) ve dinamik olmayan CSS/XPath seçicileri üretebilir; bunlar yerine daha anlamlı 'test-id' gibi öğeler tercih edilmelidir.",
                        "en": "Codegen sometimes generates brittle and non-dynamic CSS/XPath selectors; more meaningful elements like 'test-ids' should be preferred instead."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Codegen sadece ID'leri kullanır.",
                        "en": "Codegen only uses IDs."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Codegen çok yavaştır.",
                        "en": "Codegen is too slow."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Codegen, ekrandaki elemanları seçmek için rastgele hiyerarşik yollar (örneğin nth-child) kullanabilir. Bu yapılar DOM'da küçük bir değişiklikte bozulur. İdeal olan, daha sağlam olan 'data-testid' gibi attribute'ları kullanmaktır.",
            "en": "Codegen may use random hierarchical paths (like nth-child) to select elements. These structures break with minor DOM changes. The ideal approach is to use more robust attributes like 'data-testid'."
      }
}
},
    ],
  },
  en: {
    title: '🎬 Codegen — Let It Write the Code for You',
    blocks: [
      {
        type: 'simple-box', emoji: '🎙️',
        content: 'npx playwright codegen is the modern web counterpart of IDE macro recorders you may know from Java IDEs — but with a critical difference: ordinary macro recorders save pixel coordinates and absolute DOM positions (so they break the moment the page changes), while Codegen uses semantic locator strategies like role, text, and testid. Can you take Codegen\'s output and drop it directly into a production test? No — and knowing that is the key to using Codegen correctly: it generates raw material; you design the test structure. The generated code doesn\'t eliminate repetition, doesn\'t use Page Object, and doesn\'t write assertions; you take that output, convert it into a POM class, wire it to a fixture, and add meaningful expect() lines. In Java you recorded with Selenium IDE and exported, but the output looked like Selenium RC syntax and needed rewriting on every version upgrade. Codegen output uses the current Playwright API. The QA reality: instead of manually extracting locators from the DOM to test a new form flow, running Codegen for 2 minutes produces a rough skeleton that\'s far faster — it\'s a genuine productivity multiplier when used as a drafting accelerator, and a disappointment when treated as an "automatic test generator".',
      },
      {
        type: 'text',
        content: 'The command npx playwright codegen <url> opens TWO windows: (1) a real browser window — where you browse like a normal user, and (2) a Playwright Inspector window — where the code line matching every step you take appears LIVE. When you\'re done, you copy that code into your test file; with a few small touch-ups (locator priority, adding assertions) it\'s usually production-ready.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'This is the built-in, command-line, no-extension-required version of Selenium IDE (the browser extension that records actions and exports Java/other-language code). The difference: Selenium IDE usually generates CSS/XPath, while Playwright codegen prioritizes durable locators like getByRole/getByLabel — so the resulting code is usually less brittle than Selenium IDE\'s output.',
      },
      { type: 'heading', text: 'Commands and Options' },
      {
        type: 'table',
        headers: ['Command', 'What it does'],
        rows: [
          ['npx playwright codegen', 'Starts codegen with a blank page'],
          ['npx playwright codegen https://example.com', 'Starts with the given URL'],
          ['npx playwright codegen --target=python https://example.com', 'Generates Python code (default: JavaScript/TypeScript)'],
          ['npx playwright codegen --target=java https://example.com', 'Java (the most familiar output for Selenium veterans)'],
          ['npx playwright codegen --device="iPhone 13" https://example.com', 'Starts with mobile device emulation'],
          ['npx playwright codegen --viewport-size=1280,720 https://example.com', 'Starts with a custom window size'],
          ['npx playwright codegen --save-storage=auth.json https://example.com', 'Saves the login session to a file at the end (for storageState)'],
          ['npx playwright codegen --load-storage=auth.json https://example.com', 'Starts with a saved session (already logged in)'],
          ['npx playwright codegen -o login.spec.ts https://example.com', 'Writes the generated code straight to a file'],
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'codegen-flow',
        icon: '🎬',
        title: { tr: 'Codegen Çalışırken — Gerçek Pencere Akışı', en: 'Codegen in Action — the Real Window Flow' },
        steps: [
          {
            id: 'launch', label: 'Codegen Launched', labelEn: 'Codegen Launched', visualState: 'launch',
            description: { tr: 'Komut çalıştırıldığında iki pencere açılır: gerçek tarayıcı + boş bir Playwright Inspector paneli.', en: 'Running the command opens two windows: a real browser + an empty Playwright Inspector panel. "Record" is on, and a language picker (JavaScript/Python/Java/C#) is visible.' },
            code: `$ npx playwright codegen https://example.com/login`,
          },
          {
            id: 'recording', label: 'Click, Type — Code Appears Instantly', labelEn: 'Click, Type — Code Appears Instantly', visualState: 'recording',
            description: { tr: 'E-posta kutusuna tıklayıp yazınca .fill(...) satırı belirir; butona tıklayınca .click() satırı eklenir.', en: 'Clicking and typing in the email box produces a .fill(...) line; clicking "Sign in" adds a .click() line. You write zero code — you just browse like a normal user.' },
            code: `await page.getByLabel('Email').click();\nawait page.getByLabel('Email').fill('user@example.com');\nawait page.getByRole('button', { name: 'Sign in' }).click();`,
          },
          {
            id: 'assert', label: 'Add an Assertion (Pick Locator)', labelEn: 'Add an Assertion (Pick Locator)', visualState: 'assert',
            description: { tr: '"Assert visibility" butonuna basıp bir elemana tıklarsan, otomatik bir expect(...).toBeVisible() satırı eklenir.', en: 'Clicking the "Assert visibility" button in the Inspector and then clicking an element on the page adds an automatic expect(...).toBeVisible() line — you don\'t even have to hand-write assertions.' },
            code: `await expect(\n  page.getByText('Welcome back')\n).toBeVisible();`,
          },
          {
            id: 'save', label: 'Copy / Save', labelEn: 'Copy / Save', visualState: 'save',
            description: { tr: 'İşin bitince "Copy" butonuyla tüm kodu panoya alır, test dosyana yapıştırırsın.', en: 'When you\'re done, the "Copy" button puts all the code on your clipboard to paste into your test file. You can also have it write straight to a file from the start with -o login.spec.ts.' },
            code: `// Copied to clipboard ✅\n// paste into login.spec.ts`,
          },
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '⚠️',
        title: 'Codegen Is a Starting Point, Not a Finished Test',
        content: 'Codegen output usually works, but don\'t trust it blindly: (1) it sometimes records unnecessary clicks/duplicate lines — clean them up. (2) An auto-generated locator can sometimes be an ambiguous match needing .first() — check it. (3) Don\'t re-record repeated flows like login in every test file — record it once, move it into a Page Object or fixture (see earlier tabs). (4) NEVER commit the session file saved by --save-storage to git.',
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🔍', label: 'Fast exploration', desc: 'Instantly see which locator actually works on a page you don\'t know yet.' },
          { icon: '🎯', label: 'Good locator suggestions', desc: 'Prioritizes getByRole/getByLabel — it produces in a second the locators that would take you a while to find by hand.' },
          { icon: '🔐', label: 'Recording an auth flow', desc: 'With --save-storage, record login once and reuse it as storageState in other tests.' },
          { icon: '🌐', label: 'Multi-language output', desc: 'Take the same recording as JS/TS, Python, Java, or C# code with --target.' },
        ],
      },
      playwrightCodegenSemanticFilm,
      playwrightCodegenFlowSteps,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Codegen ile Auth Kaydı Doğru Sıra', en: 'Try It Yourself — Correct Order for Recording Auth with Codegen' },
        intro: { tr: 'Bir login akışını kaydedip storageState olarak kaydetmenin doğru komut sırasını yaz.', en: 'Write the correct command order for recording a login flow and saving it as storageState.' },
        starterCommands: {
          tr: `npx playwright codegen --save-storage=auth.json https://example.com/login
# Tarayıcıda login ol, pencereyi kapat
npx playwright codegen --load-storage=auth.json https://example.com/dashboard`,
          en: `npx playwright codegen --save-storage=auth.json https://example.com/login
# log in in the browser, close the window
npx playwright codegen --load-storage=auth.json https://example.com/dashboard`,
        },
        expectedSteps: [
          { pattern: 'save-storage', label: { tr: '1) --save-storage ile codegen başlat', en: '1) Start codegen with --save-storage' }, example: 'npx playwright codegen --save-storage=auth.json <url>' },
          { pattern: 'load-storage', label: { tr: '2) --load-storage ile kayıtlı oturumu kullan', en: '2) Use the saved session with --load-storage' }, example: 'npx playwright codegen --load-storage=auth.json <url>' },
        ],
        dangerousPatterns: [
          { pattern: 'git add.*auth\\.json|git commit.*auth\\.json', label: { tr: 'auth.json gerçek oturum verisi içerir — asla commit etme, .gitignore\'a ekle.', en: 'auth.json contains real session data — never commit it, add it to .gitignore.' } },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! Save the session once, then load that file in every later codegen/test run instead of logging in again.' },
        retryOutput: { tr: '❌ Sıra yanlış.', en: '❌ Wrong order — save-storage must come before load-storage.' },
      },
      playwrightCodegenPractice,
      {
        type: 'quiz',
        question: { tr: 'Codegen ile üretilen kodu test dosyasına koymadan önce neden gözden geçirmek gerekir?', en: 'Why should you review codegen-generated code before putting it in a test file?' },
        options: [
          { id: 'a', text: 'Codegen doesn\'t generate code at all, it only takes screenshots' },
          { id: 'b', text: 'The generated code usually works but may contain unnecessary/duplicate lines, ambiguous locator matches, or repeated login blocks — these should be cleaned up and moved into a Page Object/fixture' },
          { id: 'c', text: 'Codegen only works in Chrome, code is broken in other browsers' },
          { id: 'd', text: 'The generated code never actually works, it\'s for reference only' },
        ],
        correct: 'b',
        explanation: { tr: 'Codegen mükemmel bir başlangıç noktasıdır ama bir "ham taslak"tır — production kalitesine getirmek için temizlik ve refactor gerekir.', en: 'Codegen is an excellent starting point but it\'s a "rough draft" — getting it to production quality requires cleanup, locator review, and extracting repeated logic (like login) into a Page Object/fixture.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright Codegen ile oluşturulan bir otomasyon scriptini doğrudan 'production' ortamında kullanmanın en önemli risklerinden biri nedir?",
            "en": "What is one of the primary risks of using an automation script generated by Playwright Codegen directly in a production-grade test suite?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Codegen tarafından üretilen kod sadece işletim sistemi seviyesinde çalışır, web tarayıcılarında hata verir.",
                        "en": "Codegen-generated code only works at the operating system level and fails in web browsers."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Codegen, kodun sürdürülebilirliğini azaltan sert kodlanmış (hardcoded) lokatörler veya tekrar eden eylemler üretebilir; bu yüzden Page Object Model gibi yapılara dönüştürülmelidir.",
                        "en": "Codegen may produce hardcoded locators or redundant actions that decrease maintainability; therefore, it should be refactored into patterns like Page Object Model."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Codegen tarafından üretilen kodlar sadece JavaScript ile sınırlıdır ve TypeScript ile kullanılamaz.",
                        "en": "Codegen-generated code is limited to JavaScript and cannot be used with TypeScript."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Codegen, test edilen web sitesinin güvenlik duvarı (firewall) tarafından her zaman engellenir.",
                        "en": "Codegen is always blocked by the firewall of the website being tested."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Codegen, bir senaryoyu kaydetmek için harika bir araçtır ancak oluşturduğu kod genellikle bakım zorluğu yaratır. Kodun temizlenmesi, lokatörlerin iyileştirilmesi ve ortak mantığın (login, navigation) nesne tabanlı yapılara taşınması otomasyonun kalitesini artırır.",
            "en": "While Codegen is an excellent tool for recording scenarios, the raw code it produces is often difficult to maintain. Cleaning up the code, optimizing locators, and extracting common logic into design patterns like Page Objects is essential for high-quality, long-term testing."
      }
}
},
    ],
  },
}

const s17 = {
  tr: {
    title: '🔌 Playwright MCP — AI Agent\'lara Tarayıcı Yeteneği',
    blocks: [
      {
        type: 'simple-box', emoji: '🗺️',
        content: 'Playwright MCP (Model Context Protocol), bir AI ajanının Playwright\'ı uzaktan kumanda etmesini sağlayan yapılandırılmış bir iletişim protokolüdür — tıpkı Java\'daki JDBC\'nin veritabanını sorgulayabileceği standart bir interface sunması gibi: AI hangi veritabanı motoruna bağlandığını bilmek zorunda değildir, sadece standart SQL komutlarını gönderir. Peki AI bir web sayfasıyla neden doğrudan screenshot üzerinden etkileşime giremiyor? Screenshot, sayfanın piksel temsilini verir ama "bu buton tıklanabilir mi, bu input disabled mı, bu modal gerçekten açık mı?" gibi soruları cevaplayamaz; AI piksel koordinatlarını tahmin eder ve her piksel kayması hata üretir. MCP ise AI\'a sayfanın accessibility tree\'sini (erişilebilirlik ağacı) yapılandırılmış veri olarak sunar: "button[name=\'Satın Al\'][disabled=false]" gibi semantik bilgilerle AI doğrudan doğru elemana gider, koordinat tahminine gerek kalmaz. QA gerçeği: test otomasyon ekipleri için Playwright MCP, "mevcut test case\'lerden yeni varyantlar oluştur" veya "flaky test\'in kaynağını analiz et" gibi tekrarlayan görevleri AI ajanına devretmenin altyapısını sunar; bu, QA mühendisinin saati yerine yüksek katma değerli karar alma, test tasarımı ve mimari üzerine harcamasını sağlar.',
      },
      {
        type: 'text',
        content: 'MCP (Model Context Protocol), bir AI modelinin dış araçlarla (dosya sistemi, veritabanı, tarayıcı, API\'ler) konuşmasını standartlaştıran açık bir protokoldür. Playwright MCP, Microsoft\'un resmi olarak yayınladığı bir MCP sunucusudur (npm paketi: @playwright/mcp) ve AI istemcilerine (Claude, Cursor, VS Code Copilot gibi) gerçek bir tarayıcıyı kontrol etme yeteneği "tool" (araç) olarak sağlar — browser_navigate, browser_click, browser_type gibi.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'MCP sunucusunu, Selenium Grid\'in bir node\'unun WebDriver komutlarını HTTP üzerinden dış istemcilere sunmasına benzet — fark, burada istemci bir insan değil bir AI modelidir ve protokol (JSON-RPC tabanlı MCP) özellikle AI araç çağrısı için tasarlanmıştır. "Snapshot mode", sayfanın DOM\'unu System.out.println(driver.getPageSource()) yerine, Selenium\'un Accessibility API\'sine benzer şekilde yapılandırılmış (rol + isim + ref) bir ağaç olarak AI\'a verir — AI piksel koordinatı değil, "ref=e3" gibi kararlı bir referans kullanarak tıklar.',
      },
      { type: 'heading', text: 'Temel Özellikler' },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🌳', label: 'Accessibility-tree tabanlı', desc: 'Ekran görüntüsü + görüntü tanıma modeli gerekmez; sayfa yapılandırılmış (rol/isim/ref) veri olarak okunur — hızlı ve deterministik.' },
          { icon: '🧰', label: 'Geniş tool seti', desc: 'browser_navigate, browser_click, browser_type, browser_snapshot, browser_take_screenshot, browser_select_option, browser_file_upload, browser_handle_dialog, browser_wait_for, browser_tabs, browser_network_requests, browser_console_messages...' },
          { icon: '👁️', label: 'Snapshot mode vs Vision mode', desc: 'Varsayılan: accessibility snapshot (metin tabanlı, hızlı). Vision mode: ekran görüntüsü + koordinat tabanlı tıklama — görsel modeller için.' },
          { icon: '🔒', label: 'İzole / kalıcı profil', desc: '--isolated ile her oturum sıfırdan (gizli sekme gibi); --user-data-dir ile login durumu kalıcı tutulabilir.' },
          { icon: '🌐', label: 'Çok motorlu', desc: '--browser ile chromium, firefox, webkit veya msedge seçilebilir; --headless ile arka planda çalıştırılabilir.' },
          { icon: '🔐', label: 'Origin kısıtlama', desc: '--allowed-origins / --blocked-origins ile AI\'ın hangi sitelere gidebileceği sınırlanabilir — güvenlik için önemli.' },
        ],
      },
      { type: 'heading', text: 'Mimari — Bir İstek Nasıl İşlenir?' },
      {
        type: 'visual', variant: 'flow', title: { tr: 'AI İsteğinden Tarayıcı Aksiyonuna', en: 'From AI Request to Browser Action' },
        steps: [
          { num: 1, label: 'Kullanıcı', desc: 'Doğal dilde istek', highlight: true },
          { num: 2, label: 'AI Model', desc: 'Claude / Cursor / Copilot', highlight: false },
          { num: 3, label: 'MCP Protokolü', desc: 'JSON-RPC (stdio/HTTP)', highlight: false },
          { num: 4, label: 'Playwright MCP Server', desc: '@playwright/mcp', highlight: true },
          { num: 5, label: 'Gerçek Tarayıcı', desc: 'Chromium/Firefox/WebKit', highlight: true },
          { num: 6, label: 'Sonuç', desc: 'Snapshot/screenshot → AI\'a', highlight: false },
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'mcp-flow',
        icon: '🔌',
        title: { tr: 'MCP Tool-Calling Döngüsü — Adım Adım', en: 'The MCP Tool-Calling Loop — Step by Step' },
        steps: [
          {
            id: 'prompt', label: 'Kullanıcı İsteği', labelEn: 'User Prompt', visualState: 'prompt',
            description: { tr: 'Kullanıcı doğal dilde bir görev tanımlar. AI, bu görevi tamamlamak için hangi browser_* tool\'unu çağıracağına karar verir.', en: 'The user describes a task in natural language. The AI decides which browser_* tool to call to accomplish it.' },
            code: `Kullanıcı: "example.com'a git ve\nbaşlığı söyle"`,
          },
          {
            id: 'tool-call', label: 'AI Tool Çağırır', labelEn: 'AI Calls a Tool', visualState: 'tool-call',
            description: { tr: 'AI, MCP protokolü üzerinden browser_navigate({ url: ... }) çağrısı yapar. Bu çağrı MCP server\'a iletilir, server gerçek tarayıcıyı (yoksa) başlatıp URL\'e gider.', en: 'The AI makes a browser_navigate({ url: ... }) call over the MCP protocol. The call reaches the MCP server, which launches the real browser (if needed) and navigates to the URL.' },
            code: `browser_navigate({\n  url: "https://example.com"\n})`,
          },
          {
            id: 'snapshot', label: 'Accessibility Snapshot Döner', labelEn: 'Accessibility Snapshot Returns', visualState: 'snapshot',
            description: { tr: 'AI sayfayı "görmek" için browser_snapshot çağırır. Server, ekran görüntüsü DEĞİL, yapılandırılmış bir ağaç döner: her elemanın rolü, ismi ve kararlı bir "ref" kimliği.', en: 'The AI calls browser_snapshot to "see" the page. The server returns NOT a screenshot, but a structured tree: every element\'s role, name, and a stable "ref" id.' },
            code: `- heading "Example Domain" [ref=e1]\n- link "More information..." [ref=e2]`,
          },
          {
            id: 'result', label: 'Ref ile Aksiyon → Sonuç', labelEn: 'Action via Ref → Result', visualState: 'result',
            description: { tr: 'AI artık piksel koordinatı tahmin etmez — doğrudan browser_click({ ref: "e2" }) çağırır. Aksiyon tamamlanır, sonuç AI\'a döner, AI kullanıcıya doğal dilde cevap verir.', en: 'The AI never has to guess pixel coordinates — it calls browser_click({ ref: "e2" }) directly. The action completes, the result returns to the AI, and the AI answers the user in natural language.' },
            code: `browser_click({ ref: "e2" })\n// ✅ AI: "Başlık: Example Domain"`,
          },
        ],
      },
      { type: 'heading', text: 'Kurulum — Adım Adım' },
      {
        type: 'text',
        content: 'Önkoşul: Node.js 18+ kurulu olmalı (npx ile aynı şekilde gelir). Global bir kurulum GEREKMEZ — npx, paketi her çalıştığında ihtiyaç olursa indirir.',
      },
      {
        type: 'installation',
        title: { tr: '1) Önce komut satırından dene', en: '1) Test it from the command line first' },
        steps: [
          { cmd: 'npx @playwright/mcp@latest --help', explanation: { tr: 'Global kurulum gerekmez — npx paketi gerektiğinde indirir. Çıktıda --browser, --headless, --isolated gibi flag listesini görmelisin.', en: 'No global install needed — npx downloads the package on demand. The output should list flags like --browser, --headless, --isolated.' } },
          { cmd: 'npx @playwright/mcp@latest --version', explanation: { tr: 'Sürüm numarasını yazdırır — paketin doğru indirildiğini doğrular.', en: 'Prints the version number — confirms the package downloaded correctly.' } },
        ],
      },
      {
        type: 'code', language: 'json',
        code: `// 2) Claude Desktop için config dosyasına ekle
// macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
// Windows: %APPDATA%\\Claude\\claude_desktop_config.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}

// 3) Claude Code için (proje veya kullanıcı seviyesinde) — terminalden:
// $ claude mcp add playwright npx @playwright/mcp@latest
// veya .mcp.json içine elle aynı bloğu ekle.

// 4) İstemciyi (Claude Desktop / Claude Code / Cursor) yeniden başlat.
// 5) Araç (tool) listesinde browser_navigate, browser_click, browser_snapshot
//    gibi isimlerin göründüğünü doğrula.
// 6) İlk komutu dene: "https://example.com adresine git, sayfa başlığını söyle."`,
      },
      {
        type: 'table',
        headers: ['Flag', 'Ne işe yarar'],
        rows: [
          ['--browser=firefox', 'chromium yerine firefox/webkit/msedge motorunu kullan'],
          ['--headless', 'Tarayıcıyı görünmeden (arka planda) çalıştır'],
          ['--device="iPhone 13"', 'Mobil cihaz emülasyonu ile başlat'],
          ['--isolated', 'Her oturumu sıfırdan başlat (gizli sekme gibi, kalıcı login yok)'],
          ['--user-data-dir=./profile', 'Login/cookie durumunu oturumlar arası kalıcı tut'],
          ['--allowed-origins=https://example.com', 'AI\'ın yalnızca belirtilen origin\'lere gidebilmesini sağla'],
          ['--save-trace', 'Oturumu Playwright trace olarak kaydet (sonradan incelemek için)'],
          ['--vision', 'Accessibility snapshot yerine ekran görüntüsü + koordinat tabanlı mod'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🛡️',
        title: 'Güvenlik — AI\'a Gerçek Tarayıcı Vermek Risklidir',
        content: 'Playwright MCP\'ye bağlı bir AI, gerçek formlara veri girebilir, gerçek butonlara (silme, satın alma, gönder) tıklayabilir. (1) --allowed-origins ile AI\'ı sadece test/staging ortamına kilitle. (2) Gerçek production ödeme/silme akışlarında AI\'ı insan onayı olmadan serbest bırakma. (3) --user-data-dir kullanıyorsan, o profildeki gerçek oturumların (kişisel e-posta, banka vb.) AI tarafından da erişilebilir olduğunu unutma — test için ayrı, izole bir profil kullan.',
      },
      playwrightMcpA11yTreeFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Doğru Kurulum Sırası', en: 'Try It Yourself — the Correct Setup Order' },
        intro: { tr: 'Playwright MCP\'yi bir AI istemcisine bağlamanın doğru sırasını yaz: önce komut satırından dene, sonra config\'e ekle, sonra istemciyi yeniden başlat, sonra ilk komutu ver.', en: 'Write the correct order for connecting Playwright MCP to an AI client: test from the command line first, then add it to the config, then restart the client, then try your first command.' },
        starterCommands: {
          tr: `npx @playwright/mcp@latest --help
claude mcp add playwright npx @playwright/mcp@latest
# Claude Code'u yeniden başlat
# "https://example.com'a git ve başlığı söyle" yaz`,
          en: `npx @playwright/mcp@latest --help
claude mcp add playwright npx @playwright/mcp@latest
# restart Claude Code
# type "go to https://example.com and tell me the title"`,
        },
        expectedSteps: [
          { pattern: '--help', label: { tr: '1) Paketin çalıştığını komut satırından doğrula', en: '1) Verify the package works from the command line' }, example: 'npx @playwright/mcp@latest --help' },
          { pattern: 'mcp add', label: { tr: '2) İstemciye MCP server\'ı ekle', en: '2) Add the MCP server to the client' }, example: 'claude mcp add playwright npx @playwright/mcp@latest' },
          { pattern: 'yeniden başlat|restart', label: { tr: '3) İstemciyi yeniden başlat', en: '3) Restart the client' }, example: '# restart the client' },
          { pattern: "git|tell me|söyle|adresine", label: { tr: '4) İlk doğal dil komutunu dene', en: '4) Try your first natural-language command' }, example: '"go to ... and tell me ..."' },
        ],
        successOutput: { tr: '✅ Doğru sıra! Önce paketin çalıştığını doğrulamak, config hatalarını (yanlış komut/path) erkenden yakalamanı sağlar.', en: '✅ Correct order! Verifying the package works first catches config mistakes (wrong command/path) early.' },
        retryOutput: { tr: '❌ Bir adım eksik veya sırası yanlış.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright MCP\'nin varsayılan "snapshot mode"u, görüntü tanıma (vision) moduna göre neden genelde daha hızlı ve güvenilirdir?', en: 'Why is Playwright MCP\'s default "snapshot mode" usually faster and more reliable than vision mode?' },
        options: [
          { id: 'a', text: 'Snapshot mode internet bağlantısı gerektirmez' },
          { id: 'b', text: 'Snapshot mode, sayfayı yapılandırılmış (rol/isim/ref) veri olarak verir; AI piksel koordinatı tahmin etmek veya bir görüntü modelini çalıştırmak zorunda kalmaz — doğrudan ref ile kararlı bir elemana gider' },
          { id: 'c', text: 'Vision mode sadece mobil cihazlarda çalışır' },
          { id: 'd', text: 'İkisi arasında performans farkı yoktur' },
        ],
        correct: 'b',
        explanation: { tr: 'Accessibility tree, sayfanın anlamsal yapısını (buton, link, textbox + isimleri) doğrudan verir. AI bu yapıdaki "ref" kimliğini kullanarak hatasız tıklar — ekran görüntüsünden piksel koordinatı çıkarmaya (ve bunun için ayrı bir görsel modele) gerek kalmaz.', en: 'The accessibility tree gives the page\'s semantic structure (buttons, links, textboxes + their names) directly. The AI clicks reliably using the "ref" id in that structure — no need to infer pixel coordinates from a screenshot (and no need for a separate vision model to do it).' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright MCP kullanırken, görüntü tabanlı (vision) mod yerine 'snapshot mode' tercih etmenin temel mimari avantajı nedir?",
            "en": "What is the primary architectural advantage of using 'snapshot mode' over vision-based mode when using Playwright MCP?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Snapshot mode, GPU gücü gerektirmediği için daha az enerji tüketir.",
                        "en": "Snapshot mode consumes less energy as it does not require GPU power."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Snapshot mode, sayfayı DOM ve accessibility tree verileriyle yapılandırılmış şekilde iletir, bu da AI'nın piksel bazlı yorumlama yapmasına gerek kalmadan hedef elemana kesin olarak ulaşmasını sağlar.",
                        "en": "Snapshot mode provides the page as structured data via the DOM and accessibility tree, allowing the AI to interact with target elements precisely without needing pixel-based inference."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Snapshot mode, sadece yerel bilgisayarlarda çalışır; bulut ortamlarında vision mode zorunludur.",
                        "en": "Snapshot mode only works on local machines; vision mode is mandatory for cloud environments."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Snapshot mode, sayfanın görüntüsünü daha yüksek çözünürlükte işlediği için daha net sonuçlar verir.",
                        "en": "Snapshot mode provides clearer results because it processes the page image at a higher resolution."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Snapshot mode, sayfanın anlamsal yapısını (Accessibility Tree) AI'ya metinsel ve yapısal bir formatta sunar. Bu sayede AI, görsel bir analize veya piksel tahmini yapmaya ihtiyaç duymadan doğrudan hedeflenen öğeyi (ref ID ile) seçebilir, bu da hızı ve doğruluğu ciddi oranda artırır.",
            "en": "Snapshot mode delivers the page's semantic structure (Accessibility Tree) to the AI in a textual, structured format. This allows the AI to select elements directly using ref IDs without performing resource-heavy visual analysis or pixel inference, resulting in faster and more reliable interactions."
      }
}
},
    ],
  },
  en: {
    title: '🔌 Playwright MCP — Giving AI Agents Browser Powers',
    blocks: [
      {
        type: 'simple-box', emoji: '🗺️',
        content: 'Playwright MCP (Model Context Protocol) is a structured communication protocol that lets an AI agent control Playwright remotely — exactly like Java\'s JDBC provides a standard interface for querying a database: the AI doesn\'t need to know which database engine it\'s connected to; it just sends standard commands. Why can\'t an AI interact with a web page directly through screenshots? A screenshot gives a pixel representation of the page but can\'t answer "is this button clickable, is this input disabled, is this modal actually open?" — the AI guesses pixel coordinates and every pixel shift produces an error. MCP instead delivers the page\'s accessibility tree to the AI as structured data: with semantic information like "button[name=\'Buy Now\'][disabled=false]" the AI navigates directly to the right element, no coordinate guessing needed. The QA reality: for test automation teams, Playwright MCP provides the infrastructure to delegate repetitive tasks like "generate new variants from existing test cases" or "analyze the root cause of a flaky test" to an AI agent — freeing QA engineers to spend their hours on high-value decision-making, test design, and architecture instead.',
      },
      {
        type: 'text',
        content: 'MCP (Model Context Protocol) is an open protocol that standardizes how an AI model talks to external tools (file systems, databases, browsers, APIs). Playwright MCP is the official MCP server published by Microsoft (npm package: @playwright/mcp), and it gives AI clients (Claude, Cursor, VS Code Copilot, etc.) the ability to control a real browser as a set of "tools" — browser_navigate, browser_click, browser_type, and so on.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'Think of the MCP server like a Selenium Grid node exposing WebDriver commands over HTTP to outside clients — the difference is the client here is an AI model, not a human, and the protocol (JSON-RPC-based MCP) is purpose-built for AI tool calling. "Snapshot mode" gives the AI the page\'s DOM not as System.out.println(driver.getPageSource()), but as a structured tree (role + name + ref) similar to Selenium\'s Accessibility API — the AI clicks using a stable reference like "ref=e3", not a pixel coordinate.',
      },
      { type: 'heading', text: 'Key Features' },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🌳', label: 'Accessibility-tree based', desc: 'No screenshots or vision models needed; the page is read as structured (role/name/ref) data — fast and deterministic.' },
          { icon: '🧰', label: 'Wide tool set', desc: 'browser_navigate, browser_click, browser_type, browser_snapshot, browser_take_screenshot, browser_select_option, browser_file_upload, browser_handle_dialog, browser_wait_for, browser_tabs, browser_network_requests, browser_console_messages...' },
          { icon: '👁️', label: 'Snapshot mode vs Vision mode', desc: 'Default: accessibility snapshot (text-based, fast). Vision mode: screenshot + coordinate-based clicking — for vision-capable models.' },
          { icon: '🔒', label: 'Isolated / persistent profile', desc: 'With --isolated, every session starts fresh (like incognito); with --user-data-dir, login state can persist.' },
          { icon: '🌐', label: 'Multi-engine', desc: 'Choose chromium, firefox, webkit, or msedge with --browser; run in the background with --headless.' },
          { icon: '🔐', label: 'Origin restriction', desc: 'With --allowed-origins / --blocked-origins, limit which sites the AI is allowed to reach — important for security.' },
        ],
      },
      { type: 'heading', text: 'Architecture — How a Request Gets Handled' },
      {
        type: 'visual', variant: 'flow', title: { tr: 'AI İsteğinden Tarayıcı Aksiyonuna', en: 'From AI Request to Browser Action' },
        steps: [
          { num: 1, label: 'User', desc: 'Natural-language request', highlight: true },
          { num: 2, label: 'AI Model', desc: 'Claude / Cursor / Copilot', highlight: false },
          { num: 3, label: 'MCP Protocol', desc: 'JSON-RPC (stdio/HTTP)', highlight: false },
          { num: 4, label: 'Playwright MCP Server', desc: '@playwright/mcp', highlight: true },
          { num: 5, label: 'Real Browser', desc: 'Chromium/Firefox/WebKit', highlight: true },
          { num: 6, label: 'Result', desc: 'Snapshot/screenshot → back to AI', highlight: false },
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'mcp-flow',
        icon: '🔌',
        title: { tr: 'MCP Tool-Calling Döngüsü — Adım Adım', en: 'The MCP Tool-Calling Loop — Step by Step' },
        steps: [
          {
            id: 'prompt', label: 'User Prompt', labelEn: 'User Prompt', visualState: 'prompt',
            description: { tr: 'Kullanıcı doğal dilde bir görev tanımlar. AI, bu görevi tamamlamak için hangi browser_* tool\'unu çağıracağına karar verir.', en: 'The user describes a task in natural language. The AI decides which browser_* tool to call to accomplish it.' },
            code: `User: "go to example.com and\ntell me the title"`,
          },
          {
            id: 'tool-call', label: 'AI Calls a Tool', labelEn: 'AI Calls a Tool', visualState: 'tool-call',
            description: { tr: 'AI, MCP protokolü üzerinden browser_navigate({ url: ... }) çağrısı yapar. Bu çağrı MCP server\'a iletilir, server gerçek tarayıcıyı başlatıp URL\'e gider.', en: 'The AI makes a browser_navigate({ url: ... }) call over the MCP protocol. The call reaches the MCP server, which launches the real browser (if needed) and navigates to the URL.' },
            code: `browser_navigate({\n  url: "https://example.com"\n})`,
          },
          {
            id: 'snapshot', label: 'Accessibility Snapshot Returns', labelEn: 'Accessibility Snapshot Returns', visualState: 'snapshot',
            description: { tr: 'AI sayfayı "görmek" için browser_snapshot çağırır. Server, ekran görüntüsü DEĞİL, yapılandırılmış bir ağaç döner.', en: 'The AI calls browser_snapshot to "see" the page. The server returns NOT a screenshot, but a structured tree: every element\'s role, name, and a stable "ref" id.' },
            code: `- heading "Example Domain" [ref=e1]\n- link "More information..." [ref=e2]`,
          },
          {
            id: 'result', label: 'Action via Ref → Result', labelEn: 'Action via Ref → Result', visualState: 'result',
            description: { tr: 'AI artık piksel koordinatı tahmin etmez — doğrudan browser_click({ ref: "e2" }) çağırır.', en: 'The AI never has to guess pixel coordinates — it calls browser_click({ ref: "e2" }) directly. The action completes, the result returns to the AI, and the AI answers the user in natural language.' },
            code: `browser_click({ ref: "e2" })\n// ✅ AI: "Title: Example Domain"`,
          },
        ],
      },
      { type: 'heading', text: 'Installation — Step by Step' },
      {
        type: 'text',
        content: 'Prerequisite: Node.js 18+ must be installed (npx comes with it). A global install is NOT required — npx downloads the package on demand whenever it runs.',
      },
      {
        type: 'installation',
        title: { tr: '1) Önce komut satırından dene', en: '1) Test it from the command line first' },
        steps: [
          { cmd: 'npx @playwright/mcp@latest --help', explanation: { tr: 'Global kurulum gerekmez — npx paketi gerektiğinde indirir.', en: 'No global install needed — npx downloads the package on demand. The output should list flags like --browser, --headless, --isolated.' } },
          { cmd: 'npx @playwright/mcp@latest --version', explanation: { tr: 'Sürüm numarasını yazdırır.', en: 'Prints the version number — confirms the package downloaded correctly.' } },
        ],
      },
      {
        type: 'code', language: 'json',
        code: `// 2) Add to the config file for Claude Desktop
// macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
// Windows: %APPDATA%\\Claude\\claude_desktop_config.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}

// 3) For Claude Code (user- or project-level) — from the terminal:
// $ claude mcp add playwright npx @playwright/mcp@latest
// or add the same block by hand to .mcp.json.

// 4) Restart the client (Claude Desktop / Claude Code / Cursor).
// 5) Verify names like browser_navigate, browser_click, browser_snapshot
//    show up in the tool list.
// 6) Try your first command: "Go to https://example.com and tell me the page title."`,
      },
      {
        type: 'table',
        headers: ['Flag', 'What it does'],
        rows: [
          ['--browser=firefox', 'Use the firefox/webkit/msedge engine instead of chromium'],
          ['--headless', 'Run the browser without a visible window (in the background)'],
          ['--device="iPhone 13"', 'Start with mobile device emulation'],
          ['--isolated', 'Start every session fresh (like incognito, no persistent login)'],
          ['--user-data-dir=./profile', 'Keep login/cookie state persistent across sessions'],
          ['--allowed-origins=https://example.com', 'Restrict which origins the AI is allowed to navigate to'],
          ['--save-trace', 'Record the session as a Playwright trace (for later inspection)'],
          ['--vision', 'Use screenshot + coordinate-based mode instead of accessibility snapshots'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🛡️',
        title: 'Security — Giving an AI a Real Browser Is Risky',
        content: 'An AI connected to Playwright MCP can fill in real forms and click real buttons (delete, purchase, submit). (1) Use --allowed-origins to lock the AI to a test/staging environment only. (2) Don\'t let the AI loose on real production payment/delete flows without human approval. (3) If you use --user-data-dir, remember the AI can also access whatever real sessions (personal email, banking, etc.) are logged into that profile — use a separate, isolated profile for testing.',
      },
      playwrightMcpA11yTreeFilm,
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Doğru Kurulum Sırası', en: 'Try It Yourself — the Correct Setup Order' },
        intro: { tr: 'Playwright MCP\'yi bir AI istemcisine bağlamanın doğru sırasını yaz.', en: 'Write the correct order for connecting Playwright MCP to an AI client: test from the command line first, then add it to the config, then restart the client, then try your first command.' },
        starterCommands: {
          tr: `npx @playwright/mcp@latest --help
claude mcp add playwright npx @playwright/mcp@latest
# Claude Code'u yeniden başlat
# "https://example.com'a git ve başlığı söyle" yaz`,
          en: `npx @playwright/mcp@latest --help
claude mcp add playwright npx @playwright/mcp@latest
# restart Claude Code
# type "go to https://example.com and tell me the title"`,
        },
        expectedSteps: [
          { pattern: '--help', label: { tr: '1) Paketin çalıştığını komut satırından doğrula', en: '1) Verify the package works from the command line' }, example: 'npx @playwright/mcp@latest --help' },
          { pattern: 'mcp add', label: { tr: '2) İstemciye MCP server\'ı ekle', en: '2) Add the MCP server to the client' }, example: 'claude mcp add playwright npx @playwright/mcp@latest' },
          { pattern: 'yeniden başlat|restart', label: { tr: '3) İstemciyi yeniden başlat', en: '3) Restart the client' }, example: '# restart the client' },
          { pattern: "git|tell me|söyle|adresine", label: { tr: '4) İlk doğal dil komutunu dene', en: '4) Try your first natural-language command' }, example: '"go to ... and tell me ..."' },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! Verifying the package works first catches config mistakes (wrong command/path) early.' },
        retryOutput: { tr: '❌ Bir adım eksik veya sırası yanlış.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright MCP\'nin varsayılan "snapshot mode"u, görüntü tanıma (vision) moduna göre neden genelde daha hızlı ve güvenilirdir?', en: 'Why is Playwright MCP\'s default "snapshot mode" usually faster and more reliable than vision mode?' },
        options: [
          { id: 'a', text: 'Snapshot mode doesn\'t require an internet connection' },
          { id: 'b', text: 'Snapshot mode gives the page as structured (role/name/ref) data; the AI never has to guess pixel coordinates or run a vision model — it goes straight to a stable element via its ref' },
          { id: 'c', text: 'Vision mode only works on mobile devices' },
          { id: 'd', text: 'There is no performance difference between the two' },
        ],
        correct: 'b',
        explanation: { tr: 'Accessibility tree, sayfanın anlamsal yapısını doğrudan verir. AI bu yapıdaki "ref" kimliğini kullanarak hatasız tıklar — ekran görüntüsünden piksel koordinatı çıkarmaya gerek kalmaz.', en: 'The accessibility tree gives the page\'s semantic structure (buttons, links, textboxes + their names) directly. The AI clicks reliably using the "ref" id in that structure — no need to infer pixel coordinates from a screenshot (and no need for a separate vision model to do it).' },
      
        retryQuestion: {
      "question": {
            "tr": "Görüntü tanıma (vision) moduna kıyasla snapshot mode kullanılmasının test otomasyonundaki doğruluk payı üzerindeki etkisi nedir?",
            "en": "What is the effect of using snapshot mode on test automation accuracy compared to vision mode?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Snapshot mode, görsel karmaşaya karşı daha duyarlı olduğu için hata payı artar.",
                        "en": "Snapshot mode has a higher error rate as it is more sensitive to visual clutter."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Snapshot mode, yapısal veri kullandığı için AI'nın yanlış elemana tıklama riskini azaltır ve görsel modeldeki belirsizlikleri ortadan kaldırır.",
                        "en": "Snapshot mode uses structured data, which minimizes the risk of the AI clicking the wrong element and eliminates the uncertainties associated with visual models."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Görsel modeller her zaman snapshot mode'dan daha hatasız çalışır.",
                        "en": "Visual models always perform more accurately than snapshot mode."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Snapshot mode sadece basit web sitelerinde çalışır, karmaşık yapılarda hata verir.",
                        "en": "Snapshot mode only works on simple websites and fails on complex structures."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Vision (görüntü) modelleri piksel ve görsel ipuçlarına dayandığı için bazen yanlış elemanları tahmin edebilir. Snapshot mode ise sayfanın yapısal (DOM/Accessibility) bilgisini kullandığı için elemanları kimliklerine göre tanımlar, bu da hatalı etkileşim riskini minimize eder.",
            "en": "Vision models rely on pixels and visual cues, which can occasionally lead to misinterpretation. Snapshot mode uses structural (DOM/Accessibility) information to identify elements by their inherent properties, thereby minimizing the risk of incorrect interactions."
      }
}
},
    ],
  },
}

export const playwrightData = {
  tr: {
    hero: {
      title: '🎭 Playwright — Modern Tarayıcı Otomasyonu',
      subtitle: 'TypeScript · Java · Python ile öğren, Selenium ile karşılaştır',
      intro: 'Microsoft\'un geliştirdiği Playwright, Chrome, Firefox ve Safari\'yi tek API ile kontrol eder. Auto-wait, network mocking ve paralel test desteğiyle modern QA\'nın vazgeçilmezi.',
    },
    tabs: [
      '🎭 Playwright Nedir?',
      '⚙️ Kurulum',
      '🖱️ Temel Aksiyonlar',
      '🎯 Locator Stratejileri',
      '⏳ Bekleme & Wait',
      '✅ Assertions',
      '🗂️ Test Organizasyonu',
      '📦 Page Object Model',
      '🖼️ iframe · Alert · Popup',
      '📁 Dosya · Network · API',
      '🐞 Debugging & Trace',
      '🎬 Codegen',
      '🔌 Playwright MCP',
      '⚡ Paralel & CI/CD',
      '🔐 Auth & Session',
      '🌍 Gerçek Hayat',
      '🚨 Yaygın Hatalar',
      '💼 50 Mülakat Sorusu',
    ],
    sections: [s0.tr, s1.tr, s2.tr, s3.tr, s4.tr, s10.tr, s11.tr, s12.tr, s5.tr, s6.tr, s13.tr, s16.tr, s17.tr, s14.tr, s15.tr, s7.tr, s8.tr, s9.tr],
  },
  en: {
    hero: {
      title: '🎭 Playwright — Modern Browser Automation',
      subtitle: 'Learn with TypeScript · Java · Python, compare with Selenium',
      intro: 'Developed by Microsoft, Playwright controls Chrome, Firefox and Safari with a single API. Auto-wait, network mocking and parallel tests make it essential for modern QA engineers.',
    },
    tabs: [
      '🎭 What is Playwright?',
      '⚙️ Installation',
      '🖱️ Basic Actions',
      '🎯 Locator Strategies',
      '⏳ Wait Mechanisms',
      '✅ Assertions',
      '🗂️ Test Organization',
      '📦 Page Object Model',
      '🖼️ iframe · Alert · Popup',
      '📁 File · Network · API',
      '🐞 Debugging & Trace',
      '🎬 Codegen',
      '🔌 Playwright MCP',
      '⚡ Parallel & CI/CD',
      '🔐 Auth & Sessions',
      '🌍 Real World',
      '🚨 Common Errors',
      '💼 50 Interview Questions',
    ],
    sections: [s0.en, s1.en, s2.en, s3.en, s4.en, s10.en, s11.en, s12.en, s5.en, s6.en, s13.en, s16.en, s17.en, s14.en, s15.en, s7.en, s8.en, s9.en],
  },
}

fillMissingCodeTrios(playwrightData, 'playwright')
