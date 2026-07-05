import { test, expect } from '@playwright/test';

// WP4 (fableplan.md) — "Bugünkü Tekrar" (Leitner-lite spaced repetition).
// ÖNEMLİ: serviceWorkers: 'block' ZORUNLU — MSW service worker'ı aktifken
// Playwright route/localStorage senaryoları güvenilmez olabiliyor (bkz.
// interview-grading-and-reset.spec.ts'teki aynı gerekçe).

const REVIEW_QUEUE_KEY = 'learnqa_review_queue';
const DAY_MS = 24 * 60 * 60 * 1000;

test.describe('WP4 — Review Queue (Bugünkü Tekrar)', () => {
    test('/docker — quiz yanlış cevaplanınca kuyruğa 1 kayıt eklenir, nextDue yarın olduğundan ana sayfa kartı henüz görünmez', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        // Docker sayfasının ilk sekmesindeki tek quiz bloğu: doğru cevap "b" (index 1),
        // bu yüzden seçenek A (index 0) her zaman yanlıştır — bkz. src/data/dockerData.js.
        // Dil varsayılanı TR olduğundan Türkçe soru metnine göre eşleşiyoruz.
        const quizContainer = page.locator('div.rounded-xl.border-2', { hasText: 'Docker Image ile Docker Container arasındaki' }).first();
        await expect(quizContainer).toBeVisible();
        const options = quizContainer.locator('button');
        await options.nth(0).click();
        await quizContainer.getByText(/Cevabı Kontrol Et|Check Answer/).first().click();
        await expect(options.nth(0)).toContainText('✗');

        const queue = await page.evaluate((key) => {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : [];
        }, REVIEW_QUEUE_KEY);

        expect(queue.length).toBeGreaterThanOrEqual(1);
        const record = queue[0];
        expect(record.route).toBe('/docker');
        expect(record.wrongCount).toBeGreaterThanOrEqual(1);
        expect(record.streak).toBe(0);
        expect(typeof record.correctIndex).toBe('number');
        expect(Array.isArray(record.options)).toBeTruthy();
        // nextDue şimdi + 1 gün olmalı (Leitner-lite ilk giriş aralığı).
        expect(record.nextDue).toBeGreaterThan(Date.now() + DAY_MS - 60_000);
        expect(record.nextDue).toBeLessThan(Date.now() + DAY_MS + 60_000);

        // nextDue yarına ayarlandığından ana sayfa kartı HENÜZ görünmemeli.
        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });
        await expect(page.locator('[data-testid="review-queue-card"]')).toHaveCount(0);

        await context.close();
    });

    test('/ — nextDue geçmişte olan sahte kayıt enjekte edilince kart görünür, doğru cevaplayınca streak artar ve nextDue ~3 gün sonraya kayar', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        const now = Date.now();
        const fakeRecord = {
            id: 'docker:0:99',
            route: '/docker',
            pageTitle: '🐳 Docker',
            question: { tr: 'Test sorusu?', en: 'Test question?' },
            options: [
                { tr: 'Seçenek A', en: 'Option A' },
                { tr: 'Seçenek B', en: 'Option B' },
            ],
            correctIndex: 0,
            explanation: { tr: 'Açıklama.', en: 'Explanation.' },
            wrongCount: 1,
            streak: 0,
            nextDue: now - DAY_MS,
            addedAt: now - DAY_MS * 2,
        };

        await context.addInitScript(([key, recordJson]) => {
            window.localStorage.setItem(key as string, JSON.stringify([JSON.parse(recordJson as string)]));
        }, [REVIEW_QUEUE_KEY, JSON.stringify(fakeRecord)]);

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        const card = page.locator('[data-testid="review-queue-card"]');
        await expect(card).toBeVisible();
        await card.click();

        const panelOptions = page.locator('[data-testid="review-queue-options"] button');
        await expect(panelOptions.first()).toBeVisible();
        await panelOptions.nth(0).click(); // doğru seçenek (correctIndex: 0)
        await page.locator('[data-testid="review-queue-submit"]').click();

        const updatedQueue = await page.evaluate((key) => {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : [];
        }, REVIEW_QUEUE_KEY);

        const updated = updatedQueue.find((item: { id: string }) => item.id === 'docker:0:99') as { streak: number; nextDue: number } | undefined;
        expect(updated).toBeTruthy();
        expect(updated!.streak).toBe(1);
        const expectedNextDue = now + 3 * DAY_MS;
        // Leitner aralığı 3 gün — birkaç saniyelik test yürütme farkına toleranslı kontrol.
        expect(Math.abs(updated!.nextDue - expectedNextDue)).toBeLessThan(60_000);

        await context.close();
    });

    // src/lib/reviewQueue.js `recordReviewResult`'ta streak REVIEW_QUEUE_GRADUATION_STREAK'e
    // (3) ulaşınca kayıt kuyruktan TAMAMEN silinir ("mezuniyet"). Geliştirme sırasında
    // gerçek bir bug burada bulunmuştu (interval INTERVALS[nextStreak-1] yerine
    // INTERVALS[nextStreak] olmalıydı, bkz. NEXT_SESSION.md WP4 notu) — bu test o
    // düzeltmenin kalıcı olduğunu, streak=2'den 3'e çıkan kaydın gerçekten silindiğini kilitler.
    test('/ — streak=2 olan kayıt doğru cevaplanınca mezun olur ve kuyruktan tamamen silinir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        const now = Date.now();
        const fakeRecord = {
            id: 'docker:0:graduating',
            route: '/docker',
            pageTitle: '🐳 Docker',
            question: { tr: 'Mezuniyet sorusu?', en: 'Graduation question?' },
            options: [
                { tr: 'Seçenek A', en: 'Option A' },
                { tr: 'Seçenek B', en: 'Option B' },
            ],
            correctIndex: 0,
            explanation: { tr: 'Açıklama.', en: 'Explanation.' },
            wrongCount: 1,
            streak: 2,
            nextDue: now - DAY_MS,
            addedAt: now - DAY_MS * 8,
        };

        await context.addInitScript(([key, recordJson]) => {
            window.localStorage.setItem(key as string, JSON.stringify([JSON.parse(recordJson as string)]));
        }, [REVIEW_QUEUE_KEY, JSON.stringify(fakeRecord)]);

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        const card = page.locator('[data-testid="review-queue-card"]');
        await expect(card).toBeVisible();
        await card.click();

        const panelOptions = page.locator('[data-testid="review-queue-options"] button');
        await expect(panelOptions.first()).toBeVisible();
        await panelOptions.nth(0).click(); // doğru seçenek (correctIndex: 0)
        await page.locator('[data-testid="review-queue-submit"]').click();

        const updatedQueue = await page.evaluate((key) => {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : [];
        }, REVIEW_QUEUE_KEY);

        expect(updatedQueue.find((item: { id: string }) => item.id === 'docker:0:graduating')).toBeUndefined();
        expect(updatedQueue.length).toBe(0);

        // Paneli kapat — HomePage onClose'da getQueueStats()'i yeniden okur (bkz.
        // HomePage.jsx `onClose={() => { ...; setDueReviewCount(getQueueStats(...).dueCount) }}`).
        // NOT: burada bilinçli olarak page.reload() YAPILMIYOR — context.addInitScript
        // her yeni doküman yüklemesinde (reload dahil) tekrar çalışıp sahte kaydı
        // yeniden enjekte eder; asıl doğrulama zaten yukarıdaki localStorage kontrolü.
        await page.locator('[data-testid="review-queue-close"]').click();
        await expect(page.locator('[data-testid="review-queue-card"]')).toHaveCount(0);

        await context.close();
    });

    // recordReviewResult'ın YANLIŞ cevap dalı (`!isCorrect`): streak sıfırlanır,
    // wrongCount artar, nextDue tekrar yarına çekilir. Önceki iki test sadece DOĞRU
    // cevap akışını kapsıyordu — bu test panel içi yanlış cevaplama akışını kilitler.
    test('/ — tekrar panelinde yanlış cevap verilince streak sıfırlanır ve nextDue yarına çekilir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        const now = Date.now();
        const fakeRecord = {
            id: 'docker:0:regressing',
            route: '/docker',
            pageTitle: '🐳 Docker',
            question: { tr: 'Yanlış cevap sorusu?', en: 'Wrong answer question?' },
            options: [
                { tr: 'Seçenek A', en: 'Option A' },
                { tr: 'Seçenek B', en: 'Option B' },
            ],
            correctIndex: 1,
            explanation: { tr: 'Açıklama.', en: 'Explanation.' },
            wrongCount: 1,
            streak: 1,
            nextDue: now - DAY_MS,
            addedAt: now - DAY_MS * 4,
        };

        await context.addInitScript(([key, recordJson]) => {
            window.localStorage.setItem(key as string, JSON.stringify([JSON.parse(recordJson as string)]));
        }, [REVIEW_QUEUE_KEY, JSON.stringify(fakeRecord)]);

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        const card = page.locator('[data-testid="review-queue-card"]');
        await expect(card).toBeVisible();
        await card.click();

        const panelOptions = page.locator('[data-testid="review-queue-options"] button');
        await expect(panelOptions.first()).toBeVisible();
        await panelOptions.nth(0).click(); // yanlış seçenek (correctIndex: 1)
        await page.locator('[data-testid="review-queue-submit"]').click();

        const updatedQueue = await page.evaluate((key) => {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : [];
        }, REVIEW_QUEUE_KEY);

        const updated = updatedQueue.find((item: { id: string }) => item.id === 'docker:0:regressing') as { streak: number; wrongCount: number; nextDue: number } | undefined;
        expect(updated).toBeTruthy();
        expect(updated!.streak).toBe(0);
        expect(updated!.wrongCount).toBe(2);
        expect(Math.abs(updated!.nextDue - (now + DAY_MS))).toBeLessThan(60_000);

        await context.close();
    });
});
