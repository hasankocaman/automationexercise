import { test, expect } from '@playwright/test';
import { MAP_A, MAP_C1 } from '../src/data/qaMentorData.js';
import { PROFILE_VERSION } from '../src/utils/careerMapProfile.js';

// Kariyer Haritası v2 — sihirbaz mutlu yolu, "kararsızım" akışı, localStorage
// kalıcılığı, geri düğmesi, ana sayfa kutusu 3 durumu ve anonim ilerleme yüzdesi.
// Test-id kalıpları qa-mentor-roadmap-order.spec.ts / qa-mentor-progress-tracking.spec.ts
// ile AYNI: mentor-option-<ID>, map-node-<route>, career-map-cta, mentor-back-btn,
// qa-mentor-banner, main-title — hiçbiri bu görev için yeni eklenmedi (zaten mevcuttu).
// localStorage-öncesi (addInitScript) kalıbı review-queue.spec.ts / docker-interview-
// mastery-flow.spec.ts ile aynı: serviceWorkers: 'block' + context.addInitScript.

const PROFILE_KEY = 'qaMentorProfile';
const COMPLETED_ROUTES_KEY = 'learnqa_completed_routes';

test.describe('Kariyer Haritası v2 — sihirbaz, kalıcılık, ana sayfa kutusu', () => {
    test('1) Mutlu yol: kod yazabiliyorum + Java + Selenium + 6-10 saat → MAP_C1 render olur, düğüm sayısı doğru, CTA tıklanabilir', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        for (const optionId of ['L_CODER', 'LANG_JAVA', 'TOOL_SELENIUM', 'TIME_MID']) {
            const option = page.getByTestId(`mentor-option-${optionId}`);
            await expect(option).toBeVisible({ timeout: 30_000 });
            await option.click();
        }

        // Harita başlığı: MAP_C1 = '☕ Java + Selenium QA Yol Haritası'
        await expect(page.getByText(MAP_C1.title.tr)).toBeVisible({ timeout: 30_000 });

        // Düğüm sayısı: MAP_C1.nodes.length (veri dosyası kaynaklı, hardcode edilmedi).
        const nodeLocator = page.locator('[data-testid^="map-node-"]');
        await expect(nodeLocator.first()).toBeVisible({ timeout: 15_000 });
        await expect(nodeLocator).toHaveCount(MAP_C1.nodes.length);

        // CTA görünür + tıklanabilir olmalı: startCta metni ("İlk dersine başla") içerir
        // ve tıklanınca ilk düğümün route'una (MAP_C1.nodes[0].route = '/java') gider.
        const cta = page.getByTestId('career-map-cta');
        await expect(cta).toBeVisible();
        await expect(cta).toContainText('İlk dersine başla');
        await expect(cta).toBeEnabled();
        await cta.click();
        await expect(page).toHaveURL(new RegExp(`${MAP_C1.nodes[0].route}$`));
    });

    test('2) "Kararsızım" akışı: dil sorusunda kararsızım seçilince öneri balonu görünür ve akış Java yolundan (MAP_C2) devam eder', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByTestId('mentor-option-L_CODER').click();

        const undecided = page.getByTestId('mentor-option-LANG_UNDECIDED');
        await expect(undecided).toBeVisible({ timeout: 30_000 });
        await undecided.click();

        // langRecommend.bot balonu: "**Önerim: Java.** ☕..." — kalın kısmı ayrı render edilir.
        await expect(page.getByText('Önerim: Java', { exact: false })).toBeVisible({ timeout: 30_000 });

        // Akış otomatik olarak Java yoluna geçtiğini kanıtlamak için Playwright seçip
        // haritanın MAP_C2 (Java + Playwright) olduğunu doğruluyoruz — "modern/Python-TS"
        // haritalarından biri çıkarsa bu, kararsızım seçiminin Java'ya sabitlenmediğini gösterir.
        const playwrightTool = page.getByTestId('mentor-option-TOOL_PLAYWRIGHT');
        await expect(playwrightTool).toBeVisible({ timeout: 30_000 });
        await playwrightTool.click();

        const timeOption = page.getByTestId('mentor-option-TIME_LOW');
        await expect(timeOption).toBeVisible({ timeout: 30_000 });
        await timeOption.click();

        await expect(page.getByText('🎭 Java + Playwright QA Yol Haritası')).toBeVisible({ timeout: 30_000 });
    });

    test('3) Kalıcılık: sihirbaz tamamlanınca qaMentorProfile localStorage\'a yazılır, sayfa yeniden yüklenince sihirbaz DEĞİL doğrudan harita gösterilir', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        for (const optionId of ['L_CODER', 'LANG_JAVA', 'TOOL_SELENIUM', 'TIME_MID']) {
            const option = page.getByTestId(`mentor-option-${optionId}`);
            await expect(option).toBeVisible({ timeout: 30_000 });
            await option.click();
        }
        await expect(page.getByText(MAP_C1.title.tr)).toBeVisible({ timeout: 30_000 });

        const stored = await page.evaluate((key) => localStorage.getItem(key), PROFILE_KEY);
        expect(stored).not.toBeNull();
        expect(JSON.parse(stored as string).mapId).toBe('map_c1');

        await page.reload();
        await page.waitForSelector('h1', { timeout: 30_000 });

        // Sihirbaz sorularından biri (S1 seçenekleri) artık DOM'da olmamalı.
        await expect(page.getByTestId('mentor-option-L_CODER')).toHaveCount(0);
        // Harita doğrudan görünmeli.
        await expect(page.getByText(MAP_C1.title.tr)).toBeVisible({ timeout: 30_000 });
        await expect(page.locator('[data-testid^="map-node-"]').first()).toBeVisible();
    });

    test('4) Geri düğmesi: 2. soruda geri\'ye basılınca 1. sorunun seçenekleri tekrar görünür', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const levelOption = page.getByTestId('mentor-option-L_ZERO');
        await expect(levelOption).toBeVisible({ timeout: 30_000 });
        await levelOption.click();

        const langOption = page.getByTestId('mentor-option-LANG_JAVA');
        await expect(langOption).toBeVisible({ timeout: 30_000 });

        await page.getByTestId('mentor-back-btn').click();

        // 1. sorunun TÜM seçenekleri (L_ZERO, L_MANUAL, L_CODER) tekrar görünmeli.
        await expect(page.getByTestId('mentor-option-L_ZERO')).toBeVisible({ timeout: 15_000 });
        await expect(page.getByTestId('mentor-option-L_MANUAL')).toBeVisible();
        await expect(page.getByTestId('mentor-option-L_CODER')).toBeVisible();
    });

    test('5a) Ana sayfa kutusu — temiz localStorage: "Kişisel QA Kariyer Haritanı Oluştur" daveti görünür', async ({ browser }) => {
        test.setTimeout(30_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        const banner = page.getByTestId('qa-mentor-banner');
        await expect(banner).toBeVisible();
        await expect(banner).toContainText('Kişisel QA Kariyer Haritanı Oluştur');
        await expect(banner).toContainText('Başla');

        await context.close();
    });

    test('5b) Ana sayfa kutusu — kayıtlı qaMentorProfile ile: "Devam et" / kaldığın yer ifadesi görünür', async ({ browser }) => {
        test.setTimeout(30_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });

        const profile = {
            version: PROFILE_VERSION,
            answers: { level: 'coder', lang: 'java', uiTool: 'selenium', weeklyHours: 8 },
            mapId: 'map_c1',
            nodes: MAP_C1.nodes.map((n: any) => ({ route: n.route, title: n.title, emoji: n.emoji })),
            createdAt: new Date().toISOString(),
        };

        await context.addInitScript(([key, profileJson]) => {
            window.localStorage.setItem(key as string, profileJson as string);
        }, [PROFILE_KEY, JSON.stringify(profile)]);

        const page = await context.newPage();
        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        const banner = page.getByTestId('qa-mentor-banner');
        await expect(banner).toBeVisible();
        await expect(banner).toContainText('Haritan seni bekliyor');
        await expect(banner).toContainText('Devam et');

        await context.close();
    });

    test('7) Yarıda kalan sihirbaz: 1. soru cevaplanıp sayfa yeniden yüklenince kaldığı sorudan (S2) devam eder', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const levelOption = page.getByTestId('mentor-option-L_ZERO');
        await expect(levelOption).toBeVisible({ timeout: 30_000 });
        await levelOption.click();

        // Taslak cevap alınır alınmaz yazılır (bot daha yazarken) — S2 seçeneklerini
        // beklemeden reload etmek tam da test edilen senaryo (yarıda bırakma).
        await page.reload();
        await page.waitForSelector('h1', { timeout: 30_000 });

        // Kaldığı soru (S2 dil) doğrudan sorulmalı; S1 seçenekleri geri gelmemeli.
        await expect(page.getByTestId('mentor-option-LANG_JAVA')).toBeVisible({ timeout: 30_000 });
        await expect(page.getByTestId('mentor-option-L_ZERO')).toHaveCount(0);
    });

    test('8) Sıfır seviye vurgusu: S1\'de "Tamamen sıfırım" seçilince S2\'de Kararsızım seçeneğinde Önerilen rozeti görünür', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const levelOption = page.getByTestId('mentor-option-L_ZERO');
        await expect(levelOption).toBeVisible({ timeout: 30_000 });
        await levelOption.click();

        const undecided = page.getByTestId('mentor-option-LANG_UNDECIDED');
        await expect(undecided).toBeVisible({ timeout: 30_000 });
        await expect(undecided).toContainText('Önerilen');
        // Vurgu yalnızca Kararsızım'da — Java seçeneğinde rozet olmamalı.
        await expect(page.getByTestId('mentor-option-LANG_JAVA')).not.toContainText('Önerilen');
    });

    test('9) Seviyeye göre ders: "Manuel test yapıyorum" diyen kullanıcının haritasında Manuel Test düğümü YER ALMAZ, algoritma hızlı-tempo ön eki gelir', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        for (const optionId of ['L_MANUAL', 'LANG_JAVA', 'TOOL_SELENIUM', 'TIME_MID']) {
            const option = page.getByTestId(`mentor-option-${optionId}`);
            await expect(option).toBeVisible({ timeout: 30_000 });
            await option.click();
        }

        // Harita render oldu (manual+java+selenium → MAP_C1 tabanı + manuel ön eki)
        await expect(page.getByText(MAP_C1.title.tr)).toBeVisible({ timeout: 30_000 });
        const nodeLocator = page.locator('[data-testid^="map-node-"]');
        await expect(nodeLocator.first()).toBeVisible({ timeout: 15_000 });

        // Kullanıcı manuel test bildiğini söyledi — o ders haritada OLMAMALI
        // (ürün kararı 2026-07-19: dersler kişinin seviyesine göre gösterilir).
        await expect(page.getByTestId('map-node-manual-testing')).toHaveCount(0);
        await expect(page.getByTestId('map-node-what-is-testing')).toHaveCount(0);
        // Ön ek olarak yalnız algoritma hızlı-tempo tekrarı gelmeli, ilk sırada.
        const nodeIds = await nodeLocator.evaluateAll((els) => els.map((el) => el.getAttribute('data-testid')));
        expect(nodeIds[0]).toBe('map-node-algorithms');
    });

    test('6) Anonim ilerleme: learnqa_completed_routes\'a ilk düğüm route\'u yazılınca /qa-mentor\'da ilerleme yüzdesi 0\'dan büyük gösterilir', async ({ browser }) => {
        test.setTimeout(30_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });

        const profile = {
            version: PROFILE_VERSION,
            answers: { level: 'zero', lang: 'java', uiTool: 'selenium', weeklyHours: 8 },
            mapId: 'map_a',
            nodes: MAP_A.nodes.map((n: any) => ({ route: n.route, title: n.title, emoji: n.emoji })),
            createdAt: new Date().toISOString(),
        };
        const firstRoute = MAP_A.nodes[0].route;
        const total = MAP_A.nodes.length;
        const expectedPercent = Math.round((1 / total) * 100);

        await context.addInitScript(([profileKey, profileJson, routesKey, routesJson]) => {
            window.localStorage.setItem(profileKey as string, profileJson as string);
            window.localStorage.setItem(routesKey as string, routesJson as string);
        }, [PROFILE_KEY, JSON.stringify(profile), COMPLETED_ROUTES_KEY, JSON.stringify([firstRoute])]);

        const page = await context.newPage();
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        expect(expectedPercent).toBeGreaterThan(0);
        await expect(page.getByText(`${expectedPercent}%`)).toBeVisible({ timeout: 30_000 });
        await expect(page.getByText(`1/${total} ders tamamlandı`)).toBeVisible();

        await context.close();
    });
});
