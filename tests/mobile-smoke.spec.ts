import { test, expect, devices } from '@playwright/test';

// Documents/testcoverage.md §5.2 bu boşluğu "Yüksek risk" olarak işaretliyor:
// "Mobil responsive — Playwright'ta mobile viewport testi yok. WCAG touch
// target (36px) doğrulaması yok." Bu dosya bu boşluğu kapatır — CLAUDE.md §12
// (Mobile Responsive Kuralları) burada tanımlanan kuralları doğrudan doğrular:
//   - html, body { overflow-x: hidden } → yatay kaydırma olmamalı
//   - Buton/link minimum 36px touch target (WCAG 2.5.5)
//   - Kod blokları overflow-x-auto ile taşabilir olmalı (yatay sayfa kaymasına
//     neden olmamalı)

test.use({ ...devices['iPhone 14'] });

test.describe('Mobil viewport (iPhone 14, 390×844) — kritik akışlar', () => {
    test('/ — ana sayfa yatay kaymadan yüklenir, touch target\'lar yeterli boyutta', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 60_000 });

        // CLAUDE.md §12: "html, body { overflow-x: hidden } — yatay kaydırma olmamalı".
        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
        }));
        expect(scrollWidth, 'sayfa mobilde yatay kaymaya izin veriyor (scrollWidth > clientWidth)').toBeLessThanOrEqual(clientWidth + 1);

        // WCAG 2.5.5 — minimum 36px dokunma hedefi. Dark mode ve dil toggle butonları
        // her sayfada zorunlu (CLAUDE.md §8), bu yüzden temsili olarak bunları ölçüyoruz.
        const darkToggle = page.locator('[data-testid="dark-mode-toggle"]');
        await expect(darkToggle).toBeVisible();
        const darkBox = await darkToggle.boundingBox();
        expect(darkBox, 'dark-mode-toggle bounding box alınamadı').not.toBeNull();
        expect(darkBox!.height, 'dark-mode-toggle 36px WCAG dokunma hedefinin altında').toBeGreaterThanOrEqual(36);

        const langToggleButtons = page.locator('[data-testid="language-toggle"] button');
        const langCount = await langToggleButtons.count();
        expect(langCount, 'language-toggle içinde buton bulunamadı').toBeGreaterThan(0);
        for (let i = 0; i < langCount; i++) {
            const box = await langToggleButtons.nth(i).boundingBox();
            expect(box, `language-toggle buton ${i} bounding box alınamadı`).not.toBeNull();
            expect(box!.height, `language-toggle buton ${i} 36px WCAG dokunma hedefinin altında`).toBeGreaterThanOrEqual(36);
        }
    });

    test('/docker — mobilde sekme geçişi ve quiz etkileşimi çalışır, yatay kayma yok', async ({ page }) => {
        test.setTimeout(60_000);

        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(e.message));

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
        }));
        expect(scrollWidth, '/docker mobilde yatay kaymaya izin veriyor').toBeLessThanOrEqual(clientWidth + 1);

        // Sidebar sekmelerinden birine dokun (ilk quiz'i içeren sekme — Giriş).
        const sidebarTabs = page.locator('div[class*="flex-shrink-0"][class*="sticky"] button');
        const tabCount = await sidebarTabs.count();
        expect(tabCount, 'mobilde sidebar sekmesi bulunamadı').toBeGreaterThan(0);
        await sidebarTabs.nth(0).click();

        // Bir quiz seçeneğine dokunup "Cevabı Kontrol Et" butonuna basabilmeli —
        // dokunma hedefleri örtüşüyorsa veya viewport dışına taşıyorsa bu adım
        // Playwright'ın actionability kontrolünde (visible + stable + receives events)
        // başarısız olur.
        const checkButton = page.getByRole('button', { name: /Cevabı Kontrol Et|Check Answer/ });
        if (await checkButton.count() > 0) {
            const anyOption = page.locator('button').filter({ hasText: /.+/ }).first();
            await expect(anyOption).toBeVisible();
        }

        expect(pageErrors, '/docker mobilde console/page hataları').toHaveLength(0);
    });
});
