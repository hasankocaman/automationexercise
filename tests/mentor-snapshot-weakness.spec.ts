import { test, expect } from '@playwright/test';

// Kişisel AI Mentor — Katman A smoke testi (öğrenme yazısı #5, plan Bölüm 6 §6.4 S4).
// getPersistentWeakness() (src/lib/mentorSnapshots.js) pure/localStorage-türevli bir
// fonksiyon; ayrı bir test köprüsü kurmak yerine MentorPanel'in gerçek render'ı
// üzerinden doğruluyoruz (review-queue.spec.ts'teki seeded-localStorage kalıbı).
// ÖNEMLİ: serviceWorkers: 'block' ZORUNLU (bkz. review-queue.spec.ts gerekçesi).

const MENTOR_SNAPSHOTS_KEY = 'learnqa_mentor_snapshots';
const DAY_MS = 24 * 60 * 60 * 1000;

function utcDay(ts: number) {
    return new Date(ts).toISOString().slice(0, 10);
}

// buildSummary() (mentorSnapshots.js) çıktı şemasıyla birebir eşleşen sahte snapshot.
function snapshot(ts: number, route: string, wrongCount: number, mastery: number) {
    return {
        ts,
        day: utcDay(ts),
        quizAccuracy: 70,
        weakestRoute: route,
        weakestMastery: mastery,
        missed: [{ route, pageTitle: null, wrongCount }],
    };
}

async function seedAndOpenHome(context: import('@playwright/test').BrowserContext, snapshots: unknown[]) {
    await context.addInitScript(([key, json]) => {
        window.localStorage.setItem(key as string, json as string);
    }, [MENTOR_SNAPSHOTS_KEY, JSON.stringify(snapshots)]);

    const page = await context.newPage();
    await page.goto('/');
    await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });
    return page;
}

test.describe('Kişisel AI Mentor — Katman A snapshot/trend hesaplama (getPersistentWeakness)', () => {
    test('1 gündür aynı konuda zorlanma → daysStruggling=1, trend=stuck', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const now = Date.now();
        const snapshots = [
            snapshot(now - 1 * DAY_MS, '/python', 3, 40),
            snapshot(now, '/python', 3, 40),
        ];

        const page = await seedAndOpenHome(context, snapshots);
        const panel = page.locator('[data-testid="mentor-panel"]');
        await expect(panel).toBeVisible();
        await expect(panel).toContainText('Python');
        await expect(panel).toContainText('1 gündür');

        await context.close();
    });

    test('7 gündür (1 hafta) kötüleşen zorlanma → daysStruggling=7, trend=worsening', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const now = Date.now();
        const snapshots = [
            snapshot(now - 7 * DAY_MS, '/sql', 1, 60),
            snapshot(now, '/sql', 6, 20),
        ];

        const page = await seedAndOpenHome(context, snapshots);
        const panel = page.locator('[data-testid="mentor-panel"]');
        await expect(panel).toBeVisible();
        await expect(panel).toContainText('SQL');
        await expect(panel).toContainText('7 gündür');
        // trend=worsening → mentorAdvice.js'teki "kötüye gidiyor" mesajı görünmeli.
        await expect(panel).toContainText('kötüye gidiyor');

        await context.close();
    });

    test('14 gündür (2 hafta) düzelen zorlanma → daysStruggling=14, trend=improving', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const now = Date.now();
        const snapshots = [
            snapshot(now - 14 * DAY_MS, '/java', 8, 20),
            snapshot(now, '/java', 2, 70),
        ];

        const page = await seedAndOpenHome(context, snapshots);
        const panel = page.locator('[data-testid="mentor-panel"]');
        await expect(panel).toBeVisible();
        await expect(panel).toContainText('Java');
        await expect(panel).toContainText('14 gündür');
        // trend=improving → mentorAdvice.js'teki "düzeliyor" mesajı görünmeli.
        await expect(panel).toContainText('düzeliyor');

        await context.close();
    });

    test('kalıcı zayıflık yoksa (snapshot boş) MentorPanel hiç render edilmez', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await seedAndOpenHome(context, []);
        await expect(page.locator('[data-testid="mentor-panel"]')).toHaveCount(0);
        await context.close();
    });
});
