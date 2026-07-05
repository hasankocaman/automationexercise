import { test, expect } from '@playwright/test';

// WP2 (fableplan.md) — Ana sayfa kategori kartlarına "önerilen sıra" görsel
// ipucu rozetleri eklendi (kart etiketlerine dokunmadan, sadece köşelerine
// absolute-positioned span'lar): /what-is-testing → "🚀 Buradan başla",
// /algorithms → ①, /manual-testing → ②, /java → ③ — bkz. HomePage.jsx
// "Navigasyon — Kategori Kartları" bölümü. Rozetler `aria-hidden="true"` ve
// `pointer-events-none`, yani ekran okuyucuyu/tıklamayı etkilememeli.
test.describe('WP2 — Ana sayfa "önerilen sıra" rozetleri', () => {
    test('/ — TR modda 4 rozet doğru linklerin köşesinde görünür', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        const startHereBadge = page.locator('a[href="/what-is-testing"]').locator('xpath=following-sibling::span[1]');
        await expect(startHereBadge).toHaveText('🚀 Buradan başla');

        await expect(page.locator('[data-testid="nav-algorithms"]').locator('xpath=following-sibling::span[1]')).toHaveText('①');
        await expect(page.locator('[data-testid="nav-manual-testing"]').locator('xpath=following-sibling::span[1]')).toHaveText('②');
        await expect(page.locator('[data-testid="nav-java"]').locator('xpath=following-sibling::span[1]')).toHaveText('③');

        // Rozetler dekoratif olmalı — tıklama hedefini bloklamıyor, ekran okuyucudan gizli.
        await expect(startHereBadge).toHaveAttribute('aria-hidden', 'true');
        await expect(startHereBadge).toHaveCSS('pointer-events', 'none');
    });

    test('/ — EN modda "Buradan başla" rozeti "Start here" olarak değişir', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();

        const startHereBadge = page.locator('a[href="/what-is-testing"]').locator('xpath=following-sibling::span[1]');
        await expect(startHereBadge).toHaveText('🚀 Start here');

        // Sayısal rozetler dile bağlı değil, değişmemeli.
        await expect(page.locator('[data-testid="nav-algorithms"]').locator('xpath=following-sibling::span[1]')).toHaveText('①');
    });
});
