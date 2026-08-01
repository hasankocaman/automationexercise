import { test, expect } from '@playwright/test';

// SEO Faz 2 — dil-ayrık URL mimarisi (Documents/seo-phase-2-plan.md §2).
//
// Çıplak path = TR, /en/<path> = EN. URL dil için TEK OTORİTEDİR: localStorage
// tercihi ne olursa olsun /docker daima Türkçe, /en/docker daima İngilizce açılır.
// Bu testler o sözleşmeyi korur — bozulursa Google'ın gördüğü dil ile kullanıcının
// gördüğü dil yeniden ayrışır (planın §1.1'de teşhis ettiği asıl hata).

test.describe('SEO Faz 2 — dil-ayrık URL yönlendirmesi', () => {
    test('çıplak URL Türkçe açılır, /en öneki İngilizce açılır', async ({ page }) => {
        await page.goto('/docker');
        await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
        await expect(page).toHaveTitle(/Docker Nedir\?/);

        await page.goto('/en/docker');
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        await expect(page).toHaveTitle(/Docker for QA Engineers/);
    });

    test('localStorage tercihi URL dilini EZEMEZ', async ({ page }) => {
        // Kullanıcının kayıtlı tercihi EN olsa bile çıplak URL Türkçe kalmalı —
        // aksi hâlde Googlebot'un gördüğü TR sayfa ile kullanıcının gördüğü sayfa
        // yeniden ayrışırdı.
        await page.addInitScript(() => window.localStorage.setItem('language', 'en'));

        await page.goto('/docker');
        await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
        await expect(page).toHaveTitle(/Docker Nedir\?/);
    });

    test('dil düğmesi sadece içeriği değil URL\'i de değiştirir', async ({ page }) => {
        await page.goto('/docker');

        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();
        await expect(page).toHaveURL(/\/en\/docker$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');

        await page.locator('[data-testid="language-toggle"] button', { hasText: 'TR' }).click();
        await expect(page).toHaveURL(/\/docker$/);
        await expect(page).not.toHaveURL(/\/en\//);
        await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
    });

    test('/en içinde gezinti /en önekinde kalır', async ({ page }) => {
        await page.goto('/en/docker');

        // Geri düğmesi useNavigate('/') çağırır; basename sayesinde /en'e
        // gitmeli, / köküne DEĞİL. Bu, uygulamanın hiçbir yerinde route'u elle
        // öneklemeye gerek olmadığının kanıtıdır (plan §2.1).
        await page.locator('[data-testid="topic-back-btn"]').click();
        await expect(page).toHaveURL(/\/en\/?$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('hreflang alternatifleri her iki dilde de DOM\'da bulunur', async ({ page }) => {
        for (const [url, expectedLang] of [['/docker', 'tr'], ['/en/docker', 'en']] as const) {
            await page.goto(url);
            await expect(page.locator('html')).toHaveAttribute('lang', expectedLang);

            // hreflang etiketleri SeoMeta effect'inde eklenir (dev sunucusunda
            // statik shell yok) — evaluate etmeden ÖNCE varlığını bekle.
            await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);

            const alternates = await page.evaluate(() =>
                Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((tag) => ({
                    hreflang: tag.getAttribute('hreflang'),
                    href: tag.getAttribute('href'),
                })),
            );

            expect(alternates.find((a) => a.hreflang === 'tr')?.href).toContain('/docker');
            expect(alternates.find((a) => a.hreflang === 'en')?.href).toContain('/en/docker');
            expect(alternates.find((a) => a.hreflang === 'x-default')).toBeTruthy();
        }
    });

    test('canonical URL sayfanın kendi diline işaret eder', async ({ page }) => {
        await page.goto('/docker');
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://learnqa.dev/docker');

        await page.goto('/en/docker');
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://learnqa.dev/en/docker');
    });
});
