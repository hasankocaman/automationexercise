import { test, expect } from '@playwright/test';
import { dockerData } from '../src/data/dockerData.js';

// Documents/sprint-simulator-and-open-items-plan.md §6.3 (S4.2) —
// Documents/testcoverage.md "⏳ Bekliyor" listesindeki "Chromium-only, Firefox/
// WebKit project yok" boşluğunu kapatır. Ana `test:e2e` suite'i (31+ dosya)
// zaten Chromium'da derinlemesine koşuyor; bu dosya SADECE temsili bir sayfa
// çiftini (ana sayfa + /docker, CLAUDE.md §22'deki "temsili sayfa" kalıbı)
// Firefox/WebKit altında SMOKE seviyesinde doğrular — amaç derinlik değil,
// tarayıcıya özgü render/etkileşim kırılmalarını (event handling, CSS motoru
// farkları) yakalamak. Çalıştırma: npm run test:cross-browser
// (playwright.cross-browser.config.ts → firefox + webkit project'leri).

// Quiz sorusu veri-güdümlü alınır (tests/i18n-content-toggle.spec.ts ile aynı
// ilke) — sabit metin gömülmez, dockerData değişirse test kendini düzeltir.
const quizBlockTr = dockerData.tr.sections[0].blocks.find((b: any) => b.type === 'quiz')!;
const correctOption = quizBlockTr.options.find((o: any) => o.id === quizBlockTr.correct);

test.describe('Çapraz tarayıcı smoke — ana sayfa + /docker (temsili sayfalar)', () => {
    test('/ — ana sayfa yükleniyor, dark mode + dil toggle çalışıyor, console hatası yok', async ({ page }) => {
        test.setTimeout(60_000);
        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(e.message));

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        // Dark mode toggle
        const darkToggle = page.getByTestId('dark-mode-toggle');
        await expect(darkToggle).toBeVisible();
        const htmlBefore = await page.evaluate(() => document.documentElement.classList.contains('dark-mode'));
        await darkToggle.click();
        await expect
            .poll(() => page.evaluate(() => document.documentElement.classList.contains('dark-mode')))
            .toBe(!htmlBefore);

        // Dil toggle
        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();
        await expect.poll(() => page.evaluate(() => localStorage.getItem('language'))).toBe('en');

        expect(pageErrors, 'ana sayfada console/page hataları').toHaveLength(0);
    });

    test('/docker — sekme geçişi + quiz cevaplama çalışıyor, console hatası yok', async ({ page }) => {
        test.setTimeout(60_000);
        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(e.message));

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        // Sidebar sekmelerinden ilkine geç (mevcut suite'teki kalıp, ör. mobile-smoke.spec.ts).
        const sidebarTabs = page.locator('div[class*="flex-shrink-0"][class*="sticky"] button');
        const tabCount = await sidebarTabs.count();
        expect(tabCount, '/docker sidebar sekmesi bulunamadı').toBeGreaterThan(0);
        await sidebarTabs.nth(0).click();

        // Veri-güdümlü quiz etkileşimi: doğru seçeneği tıkla, kontrol et, açıklamayı gör.
        await expect(page.getByText(quizBlockTr.question)).toBeVisible({ timeout: 15_000 });
        await page.locator('button', { hasText: `${correctOption.id.toUpperCase()}.${correctOption.text}` }).first().click();
        await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();
        await expect(page.getByText(quizBlockTr.explanation)).toBeVisible();

        expect(pageErrors, '/docker sayfasında console/page hataları').toHaveLength(0);
    });
});
