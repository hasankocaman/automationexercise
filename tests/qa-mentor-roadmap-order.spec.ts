import { test, expect } from '@playwright/test';

// WP1 (fableplan.md) — QA Mentor yol haritalarında sıra düzeltmesi: Docker artık
// Jenkins/AWS'ten ÖNCE geliyor (container kavramı Docker'sız anlaşılmaz), Linux
// artık "bonus" değil MAP_A'da ana hatta bir düğüm, Kafka (niş konu) ana hattan
// "extras" bölümüne taşındı — bkz. src/data/qaMentorData.js `LINUX_MAIN_NODE`/
// `LINUX_BONUS_NODE` (silindi) ve MAP_A.extras. Bu test o sırayı kilitler; veri
// dosyası tekrar eski (Docker sonrası Jenkins/AWS, Linux'suz) sıraya dönerse fail eder.
test.describe('WP1 — QA Mentor roadmap sırası (MAP_A)', () => {
    test('/qa-mentor — "sıfırdan başla" seçilince Docker→Jenkins→AWS sırası, Linux ana hatta, Kafka extras\'ta', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        // Sihirbaz: "Hayır, hiç yazılım geçmişim yok" seçeneği → doğrudan MAP_A.
        const optionA = page.getByRole('button', { name: /hiç yazılım geçmişim yok/i });
        await expect(optionA).toBeVisible({ timeout: 30_000 });
        await optionA.click();

        // MindMapNode başlıkları (ana yol) benzersiz bir class kombinasyonuyla render edilir
        // (ExtraNode farklı, daha küçük font kullanır) — DOM sırası = veri sırası.
        const titleLocator = page.locator('div.font-bold.text-sm.md\\:text-base');
        await expect(titleLocator.first()).toBeVisible({ timeout: 30_000 });
        const titles = await titleLocator.allTextContents();

        expect(titles).toEqual([
            'Test Temelleri',
            'Algoritma Temeli',
            'Manuel Test',
            'Java',
            'Git & GitHub',
            'Selenium',
            'Postman',
            'SQL',
            'REST Assured',
            'Linux',
            'Docker',
            'Jenkins',
            'AWS',
            'Kubernetes',
        ]);

        // Kafka artık ana hatta (div/onClick) değil, extras bölümünde (<Link to="/kafka">)
        // render ediliyor olmalı — ana yol düğümleri hiç <a href> üretmez.
        await expect(page.locator('a[href="/kafka"]')).toHaveCount(1);
    });
});
