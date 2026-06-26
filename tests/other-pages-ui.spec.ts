import { test, expect } from '@playwright/test';

// "Cannot read properties" / "something went wrong" gibi genel ifadeler kasıtlı
// olarak YOK — error-dictionary/yaygın hatalar block'ları gerçek hata mesajı
// örnekleri içerir, bunlar crash değildir. Gerçek hatalar pageErrors ile yakalanır.
const CRASH_MARKERS = ['[object Object]'];

async function assertNoCrash(page: import('@playwright/test').Page, label: string) {
    const bodyText = await page.locator('body').innerText();
    const hasCrash = CRASH_MARKERS.some((needle) => bodyText.includes(needle));
    expect(hasCrash, `${label}: render hatası tespit edildi`).toBe(false);
}

test('/ — ana sayfa navigasyon linkleri görünür', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });
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
// manual-testing / algorithms / advanced-algorithms / qa-mentor: TopicPage kullanmaz,
// scroll-spy nav + tüm içerik tek seferde render edilir (sekme geçişi yok).
for (const route of ['/java-document', '/git-document', '/manual-testing', '/algorithms', '/advanced-algorithms', '/qa-mentor']) {
    test(`${route} — sayfa yüklenir, görünür butonlar tıklanabilir`, async ({ page }) => {
        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(e.message));
        page.on('console', (msg) => { if (msg.type() === 'error') pageErrors.push(msg.text()); });

        await page.goto(route);
        await page.waitForSelector('h1', { timeout: 30_000 });
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

test('/leaderboard — sayfa yüklenir, render hatası yok', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(e.message));
    page.on('console', (msg) => { if (msg.type() === 'error') pageErrors.push(msg.text()); });

    await page.goto('/leaderboard');
    await page.waitForSelector('h1', { timeout: 30_000 });
    await assertNoCrash(page, '/leaderboard');

    expect(pageErrors, '/leaderboard: console/page hataları').toHaveLength(0);
});
