import { test, expect } from '@playwright/test';
import { MAP_A } from '../src/data/qaMentorData.js';
import { PROFILE_VERSION } from '../src/utils/careerMapProfile.js';

// Kariyer Haritası Faz 2 (Documents/career-map-feature-plan.md §4.3/§4.4c, S3.1+S3.2)
// — milestone/rozet şeridi ve "haritanda neredesin" breadcrumb'ı. Seeding kalıbı
// tests/career-map.spec.ts test #6 ile AYNI (addInitScript + qaMentorProfile +
// learnqa_completed_routes). Milestone kimlikleri ve breadcrumb hesaplaması
// src/utils/careerMapMilestones.js / TopicHeader.jsx'ten TÜRETİLİR, sabit
// gömülmez (mevcut suite'in ilkesiyle aynı).

const PROFILE_KEY = 'qaMentorProfile';
const COMPLETED_ROUTES_KEY = 'learnqa_completed_routes';

function buildProfile(mapId: string, nodes: { route: string; title: unknown; emoji: string }[]) {
    return {
        version: PROFILE_VERSION,
        answers: { level: 'zero', lang: 'java', uiTool: 'selenium', weeklyHours: 8 },
        mapId,
        nodes: nodes.map((n) => ({ route: n.route, title: n.title, emoji: n.emoji })),
        createdAt: new Date().toISOString(),
    };
}

test.describe('Kariyer Haritası Faz 2 — milestone şeridi + dersten haritaya breadcrumb', () => {
    test('İlk düğüm + Java tamamlanınca "İlk adım" ve "Kod yazan testçi" milestone\'ları kazanılır, diğerleri kazanılmamış kalır', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });

        // MAP_A.nodes[0] = Test Temelleri (/what-is-testing), nodes[3] = Java (/java) —
        // bu ikisi tamamlanınca 'first-step' VE 'code-writing-tester' kazanılmalı.
        const firstNodeRoute = MAP_A.nodes[0].route;
        const javaNodeRoute = MAP_A.nodes[3].route;
        expect(javaNodeRoute).toBe('/java');

        const profile = buildProfile('map_a', MAP_A.nodes as any);
        await context.addInitScript(([profileKey, profileJson, routesKey, routesJson]) => {
            window.localStorage.setItem(profileKey as string, profileJson as string);
            window.localStorage.setItem(routesKey as string, routesJson as string);
        }, [PROFILE_KEY, JSON.stringify(profile), COMPLETED_ROUTES_KEY, JSON.stringify([firstNodeRoute, javaNodeRoute])]);

        const page = await context.newPage();
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const strip = page.getByTestId('career-map-milestones');
        await expect(strip).toBeVisible({ timeout: 30_000 });

        await expect(page.locator('[data-testid="career-map-milestone"][data-milestone-id="first-step"]')).toHaveAttribute('data-earned', 'true');
        await expect(page.locator('[data-testid="career-map-milestone"][data-milestone-id="code-writing-tester"]')).toHaveAttribute('data-earned', 'true');

        // Selenium/Playwright, API+SQL ve %80 ana yol milestone'ları henüz kazanılmamalı.
        await expect(page.locator('[data-testid="career-map-milestone"][data-milestone-id="automator"]')).toHaveAttribute('data-earned', 'false');
        await expect(page.locator('[data-testid="career-map-milestone"][data-milestone-id="full-stack-tester"]')).toHaveAttribute('data-earned', 'false');
        await expect(page.locator('[data-testid="career-map-milestone"][data-milestone-id="sdet-path-complete"]')).toHaveAttribute('data-earned', 'false');

        await context.close();
    });

    test('Ders sayfasının header\'ında "haritanda X/Y adımdasın" breadcrumb\'ı doğru pozisyonu gösterir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });

        const firstNodeRoute = MAP_A.nodes[0].route;
        const javaNodeRoute = MAP_A.nodes[3].route;
        const total = MAP_A.nodes.length;
        // 2 düğüm tamamlandı → sıradaki adım pozisyonu 3 (done + 1).
        const expectedPosition = 3;

        const profile = buildProfile('map_a', MAP_A.nodes as any);
        await context.addInitScript(([profileKey, profileJson, routesKey, routesJson]) => {
            window.localStorage.setItem(profileKey as string, profileJson as string);
            window.localStorage.setItem(routesKey as string, routesJson as string);
        }, [PROFILE_KEY, JSON.stringify(profile), COMPLETED_ROUTES_KEY, JSON.stringify([firstNodeRoute, javaNodeRoute])]);

        const page = await context.newPage();
        // Selenium, MAP_A'da yer alan ama HENÜZ tamamlanmamış bir ders sayfasıdır —
        // TopicPage üzerinden render edilir, TopicHeader'ı (ve breadcrumb'ı) paylaşır.
        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const breadcrumb = page.getByTestId('map-breadcrumb');
        await expect(breadcrumb).toBeVisible({ timeout: 30_000 });
        await expect(breadcrumb).toHaveAttribute('data-map-position', String(expectedPosition));
        await expect(breadcrumb).toHaveAttribute('data-map-total', String(total));
        await expect(breadcrumb).toContainText(`${expectedPosition}/${total}`);

        // Breadcrumb'a tıklayınca /qa-mentor'a gider (dersten haritaya köprü).
        await breadcrumb.click();
        await expect(page).toHaveURL(/\/qa-mentor$/);

        await context.close();
    });

    test('Profil yokken (temiz localStorage) ders sayfasında breadcrumb HİÇ görünmez', async ({ browser }) => {
        test.setTimeout(30_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await expect(page.getByTestId('map-breadcrumb')).toHaveCount(0);
        await context.close();
    });

    test('/qa-mentor sayfasının kendi header\'ında breadcrumb görünmez (kapsam dışı sayfa)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const profile = buildProfile('map_a', MAP_A.nodes as any);
        await context.addInitScript(([profileKey, profileJson]) => {
            window.localStorage.setItem(profileKey as string, profileJson as string);
        }, [PROFILE_KEY, JSON.stringify(profile)]);

        const page = await context.newPage();
        await page.goto('/qa-mentor');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await expect(page.getByTestId('map-breadcrumb')).toHaveCount(0);
        await context.close();
    });
});
