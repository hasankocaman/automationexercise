import { test, expect } from '@playwright/test';

// Learning OS Faz 1 (Documents/learning-os-redesign-plan.md §8.2-S3) — Ana
// sayfa "Bugün" şeridi (streak/hedef/Devam-et) ve ActivityHeatmap testleri.
// serviceWorkers: 'block' ZORUNLU — bilinen MSW tuzağı (bkz. review-queue.spec.ts).

const ACTIVITY_LOG_KEY = 'learnqa_activity_log';
const LAST_POSITION_KEY = 'learnqa_last_position';
const DAY_MS = 24 * 60 * 60 * 1000;

// src/lib/activityLog.js'teki dayKey() ile birebir aynı (yerel takvim günü, UTC değil).
function dayKey(ts: number): string {
    const d = new Date(ts);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const g = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${g}`;
}

function emptyDay(quizzes: number, goalMet: boolean) {
    return { quizzes, exercises: 0, xp: 0, goalMet, goalEventSent: false };
}

async function seedActivityLog(context: import('@playwright/test').BrowserContext, days: Record<string, unknown>) {
    const log = { version: 1, days, countedIds: [], lastKnownStreak: 0 };
    await context.addInitScript(([key, val]) => window.localStorage.setItem(key as string, val as string), [ACTIVITY_LOG_KEY, JSON.stringify(log)]);
}

test.describe('Learning OS Faz 1 — Bugün şeridi + ActivityHeatmap', () => {
    test('/ — temiz profilde Bugün şeridi davet modunda görünür, aktif şerit yok', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        await expect(page.getByTestId('daily-strip-invite')).toBeVisible();
        await expect(page.getByTestId('daily-strip')).toHaveCount(0);

        await context.close();
    });

    test('/docker — quiz cevaplanınca learnqa_activity_log güncellenir, aynı blok tekrar cevaplanınca artmaz', async ({ browser }) => {
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const quizContainer = page.locator('div.rounded-xl.border-2', { hasText: 'Docker Image ile Docker Container arasındaki' }).first();
        await expect(quizContainer).toBeVisible();
        await quizContainer.locator('button').nth(1).click(); // doğru cevap
        await quizContainer.getByText(/Cevabı Kontrol Et|Check Answer/).first().click();

        const log1 = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || '{}'), ACTIVITY_LOG_KEY);
        const todayKey = Object.keys(log1.days)[0];
        expect(todayKey).toBeTruthy();
        expect(log1.days[todayKey].quizzes).toBeGreaterThanOrEqual(1);
        const quizzesAfterFirst = log1.days[todayKey].quizzes;

        // Aynı bloğu (aynı pageKey:tab:blockIndex id'si) tekrar cevaplamak için
        // sayfayı yeniden yükle — QuizBlock'un kendi "submitted" state'i local
        // olduğundan reload sonrası tekrar tıklanabilir hale gelir.
        await page.reload();
        await page.waitForSelector('h1', { timeout: 30_000 });
        const quizContainer2 = page.locator('div.rounded-xl.border-2', { hasText: 'Docker Image ile Docker Container arasındaki' }).first();
        await quizContainer2.locator('button').nth(1).click();
        await quizContainer2.getByText(/Cevabı Kontrol Et|Check Answer/).first().click();

        const log2 = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || '{}'), ACTIVITY_LOG_KEY);
        expect(log2.days[todayKey].quizzes).toBe(quizzesAfterFirst);

        await context.close();
    });

    test('/ — dün hedefli, bugün boşsa streak korunur ve donmuş (❄️) gösterilir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const now = Date.now();
        await seedActivityLog(context, {
            [dayKey(now - DAY_MS)]: emptyDay(10, true),
        });
        const page = await context.newPage();

        await page.goto('/');
        await page.waitForSelector('[data-testid="daily-strip"]', { timeout: 30_000 });

        const streakText = await page.getByTestId('daily-streak').innerText();
        expect(streakText).toContain('❄️');
        expect(streakText).toContain('1');

        await context.close();
    });

    test('/ — 3 gün önce hedefli ama dün/bugün boşsa streak sıfırdır (davet moduna düşer)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const now = Date.now();
        await seedActivityLog(context, {
            [dayKey(now - 3 * DAY_MS)]: emptyDay(10, true),
        });
        const page = await context.newPage();

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        // streak=0 VE bugün units=0 → davet modu (2+ günlük boşluk streak'i sıfırlar).
        await expect(page.getByTestId('daily-strip-invite')).toBeVisible();

        await context.close();
    });

    test('/ — bugün 10 birime ulaşınca hedef-dolu kutlaması görünür', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const now = Date.now();
        await seedActivityLog(context, {
            [dayKey(now)]: emptyDay(10, true),
        });
        const page = await context.newPage();

        await page.goto('/');
        await page.waitForSelector('[data-testid="daily-goal-done"]', { timeout: 30_000 });
        await expect(page.getByTestId('daily-goal-done')).toBeVisible();

        await context.close();
    });

    test('/ — learnqa_last_position varsa Devam-et CTA sekme-derinlikli o route\'a gider', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const now = Date.now();
        await seedActivityLog(context, {
            [dayKey(now)]: emptyDay(3, false),
        });
        await context.addInitScript(([key, val]) => window.localStorage.setItem(key as string, val as string), [
            LAST_POSITION_KEY,
            JSON.stringify({ route: '/docker', tabIndex: 2, updatedAt: now }),
        ]);
        const page = await context.newPage();

        await page.goto('/');
        await page.waitForSelector('[data-testid="daily-continue"]', { timeout: 30_000 });
        const href = await page.getByTestId('daily-continue').getAttribute('href');
        expect(href).toBe('/docker');

        await context.close();
    });

    test('/ — ActivityHeatmap sahte 3 günlük veriyle en az 3 dolu hücre render eder', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const now = Date.now();
        await seedActivityLog(context, {
            [dayKey(now)]: emptyDay(5, false),
            [dayKey(now - DAY_MS)]: emptyDay(2, false),
            [dayKey(now - 2 * DAY_MS)]: emptyDay(10, true),
        });
        const page = await context.newPage();

        await page.goto('/');
        await page.waitForSelector('[data-testid="activity-heatmap"]', { timeout: 30_000 });
        const filledCells = await page.locator('[data-testid="heatmap-cell"][data-level]:not([data-level="0"])').count();
        expect(filledCells).toBeGreaterThanOrEqual(3);

        await context.close();
    });
});
