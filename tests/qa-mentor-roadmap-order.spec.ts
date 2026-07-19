import { test, expect } from '@playwright/test';

// WP1 (fableplan.md) — QA Mentor yol haritalarında sıra düzeltmesi: Docker artık
// Jenkins/AWS'ten ÖNCE geliyor (container kavramı Docker'sız anlaşılmaz), Linux
// artık "bonus" değil MAP_A'da ana hatta bir düğüm, Kafka (niş konu) ana hattan
// "extras" bölümüne taşındı — bkz. src/data/qaMentorData.js `LINUX_MAIN_NODE`/
// `LINUX_BONUS_NODE` (silindi) ve MAP_A.extras. Bu test o sırayı kilitler; veri
// dosyası tekrar eski (Docker sonrası Jenkins/AWS, Linux'suz) sıraya dönerse fail eder.
test.describe('WP1 — QA Mentor roadmap sırası (MAP_A)', () => {
    test('/qa-mentor — sıfır+Java+Selenium seçilince Docker→Jenkins→AWS sırası, Linux ana hatta, Kafka extras\'ta', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        // Sihirbaz v2 (4 soru): sıfır → Java → Selenium → zaman. Bu kombinasyon
        // MAP_A'yı üretir (pickBaseMapId: zero+java+selenium → map_a).
        for (const optionId of ['L_ZERO', 'LANG_JAVA', 'TOOL_SELENIUM', 'TIME_MID']) {
            const option = page.getByTestId(`mentor-option-${optionId}`);
            await expect(option).toBeVisible({ timeout: 30_000 });
            await option.click();
        }

        // Ana yol düğümleri data-testid="map-node-<route>" taşır — DOM sırası = veri sırası.
        // (Başlık metni artık SIRADAKİ/süre rozetleri içerdiğinden text karşılaştırması
        // yerine route bazlı doğrulama yapılır.)
        const nodeLocator = page.locator('[data-testid^="map-node-"]');
        await expect(nodeLocator.first()).toBeVisible({ timeout: 30_000 });
        const nodeIds = await nodeLocator.evaluateAll((els) => els.map((el) => el.getAttribute('data-testid')));

        expect(nodeIds).toEqual([
            'map-node-what-is-testing',
            'map-node-algorithms',
            'map-node-manual-testing',
            'map-node-java',
            'map-node-git-github',
            'map-node-selenium',
            'map-node-postman',
            'map-node-sql',
            'map-node-rest-assured',
            'map-node-linux',
            'map-node-docker',
            'map-node-jenkins',
            'map-node-aws',
            'map-node-kubernetes',
        ]);

        // Kafka artık ana hatta (div/onClick) değil, extras bölümünde (<Link to="/kafka">)
        // render ediliyor olmalı — ana yol düğümleri hiç <a href> üretmez.
        await expect(page.locator('a[href="/kafka"]')).toHaveCount(1);
    });
});
