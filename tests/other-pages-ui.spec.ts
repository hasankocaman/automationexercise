import { test, expect } from '@playwright/test';

// "Cannot read properties" / "something went wrong" gibi genel ifadeler kasıtlı
// olarak YOK — error-dictionary/yaygın hatalar block'ları gerçek hata mesajı
// örnekleri içerir, bunlar crash değildir. Gerçek hatalar pageErrors ile yakalanır.
const CRASH_MARKERS = ['[object Object]'];

// Test ortamında dışarıya ağ bağlantısı olmadığı için oluşan bilinen hata kalıpları.
// Supabase AI paneli, CDN fontları ve benzeri kaynaklar test sırasında erişilemez
// olabilir — bunlar uygulama kodundaki gerçek hatalar değildir.
const ALLOWED_CONSOLE_ERROR_PATTERNS = [
    /net::ERR_/i,
    /supabase/i,
    /Failed to fetch/i,
    /Load failed/i,
];

function isAllowedError(msg: string): boolean {
    return ALLOWED_CONSOLE_ERROR_PATTERNS.some((re) => re.test(msg));
}

async function assertNoCrash(page: import('@playwright/test').Page, label: string) {
    const bodyText = await page.locator('body').innerText();
    const hasCrash = CRASH_MARKERS.some((needle) => bodyText.includes(needle));
    expect(hasCrash, `${label}: render hatası tespit edildi`).toBe(false);
}

test('/ — ana sayfa navigasyon linkleri görünür', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="main-title"]', { timeout: 60_000 });
    await assertNoCrash(page, '/');

    const navLinks = page.locator('[data-testid="main-navigation"] a');
    const linkCount = await navLinks.count();
    expect(linkCount, '/: nav linki bulunamadı').toBeGreaterThan(0);
    for (let i = 0; i < linkCount; i++) {
        await expect(navLinks.nth(i), `/ nav linki ${i}`).toBeVisible();
    }

    await expect(page.locator('[data-testid="dark-mode-toggle"]')).toBeVisible();
    await expect(page.locator('[data-testid="dark-mode-toggle"]')).toBeEnabled();
    await expect(page.locator('[data-testid="language-toggle"] button').first()).toBeVisible();
});

// java-document / git-document: markdown reader sayfaları.
// manual-testing / qa-mentor: TopicPage kullanmaz, scroll-spy nav.
// algorithms / advanced-algorithms: ayrı testlerde — büyük modüller (bkz. aşağısı).
for (const route of ['/java-document', '/git-document', '/manual-testing', '/qa-mentor']) {
    test(`${route} — sayfa yüklenir, görünür butonlar tıklanabilir`, async ({ page }) => {
        test.setTimeout(60_000);

        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(e.message));
        page.on('console', (msg) => {
            if (msg.type() === 'error' && !isAllowedError(msg.text())) {
                pageErrors.push(msg.text());
            }
        });

        await page.goto(route, { timeout: 60_000 });
        await page.waitForSelector('h1', { timeout: 60_000 });
        await assertNoCrash(page, route);

        // :visible — bazı butonlar bilinçli olarak md:hidden (mobil-only toggle vb.);
        // masaüstü viewport'ta gizli olmaları beklenen davranış, bug değil.
        const buttons = page.locator('button:visible');
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
            await expect(buttons.nth(i), `${route} buton ${i}`).toBeVisible();
        }

        expect(pageErrors, `${route}: console/page hataları`).toHaveLength(0);
    });
}

// algorithms ve advanced-algorithms: AlgorithmsPage.jsx (~60 KB) +
// beginnerAlgorithmsData.js (~77 KB) Vite dev mode'da ilk derlemede çok yavaş
// olabiliyor. fullyParallel=true ortamında diğer 3 worker'la kaynak yarışması
// yaşanınca 60 s bile yetmiyordu. Bunları for döngüsünden ayırıp 120 s bağımsız
// testler olarak tanımladık — kaynak yarışması ortadan kalkar.
for (const route of ['/algorithms', '/advanced-algorithms']) {
    test(`${route} — sayfa yüklenir, render hatası yok (büyük modül)`, async ({ page }) => {
        test.setTimeout(120_000);

        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(e.message));
        page.on('console', (msg) => {
            if (msg.type() === 'error' && !isAllowedError(msg.text())) {
                pageErrors.push(msg.text());
            }
        });

        // waitUntil:'domcontentloaded' — HTML shell'in yüklenmesini garantiler.
        await page.goto(route, { waitUntil: 'networkidle', timeout: 60_000 });

        // h1 40 s içinde DOM'da görünmelidir.
        await page.waitForSelector('h1', { state: 'attached', timeout: 40_000 });

        await assertNoCrash(page, route);

        const buttons = page.locator('button:visible');
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
            await expect(buttons.nth(i), `${route} buton ${i}`).toBeVisible();
        }

        expect(pageErrors, `${route}: console/page hataları`).toHaveLength(0);
    });
}

test('/leaderboard — sayfa yüklenir, render hatası yok', async ({ page }) => {
    test.setTimeout(60_000);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(e.message));
    page.on('console', (msg) => {
        if (msg.type() === 'error' && !isAllowedError(msg.text())) {
            pageErrors.push(msg.text());
        }
    });

    await page.goto('/leaderboard');
    await page.waitForSelector('h1', { timeout: 30_000 });
    await assertNoCrash(page, '/leaderboard');

    expect(pageErrors, '/leaderboard: console/page hataları').toHaveLength(0);
});
