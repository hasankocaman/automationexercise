import { test, expect, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { waitForAppReady } from './helpers/app-ready';

// Kişisel AI Mentor — MentorPanel/MentorNudge E2E testleri (öğrenme yazısı #5,
// plan Bölüm 6 §6.4 S3). Test edilen route HomePage `/` — yeni route açılmadı,
// CLAUDE.md §22.1 istisna listesi değişmez.
//
// ÖNEMLİ: serviceWorkers: 'block' ZORUNLU (bkz. review-queue.spec.ts /
// interview-grading-and-reset.spec.ts gerekçesi — MSW service worker aktifken
// localStorage/route senaryoları güvenilmez olabiliyor).

const MENTOR_SNAPSHOTS_KEY = 'learnqa_mentor_snapshots';
const DAY_MS = 24 * 60 * 60 * 1000;

function utcDay(ts: number) {
    return new Date(ts).toISOString().slice(0, 10);
}

function weeklyWeaknessSnapshots(now: number, route: string) {
    return [
        { ts: now - 7 * DAY_MS, day: utcDay(now - 7 * DAY_MS), quizAccuracy: 55, weakestRoute: route, weakestMastery: 30, missed: [{ route, pageTitle: null, wrongCount: 2 }] },
        { ts: now, day: utcDay(now), quizAccuracy: 55, weakestRoute: route, weakestMastery: 30, missed: [{ route, pageTitle: null, wrongCount: 5 }] },
    ];
}

async function seedWeakness(page: Page, snapshots: unknown[]) {
    await page.addInitScript(([key, json]) => {
        window.localStorage.setItem(key as string, json as string);
    }, [MENTOR_SNAPSHOTS_KEY, JSON.stringify(snapshots)]);
}

test.describe('Kişisel AI Mentor — Katman A (yerel, üyeliksiz, CI\'da tam çalışır)', () => {
    test('/ — kalıcı zayıflık varsa MentorPanel proaktif görünür, AI butonu üye olmadığından gösterilmez', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        const now = Date.now();
        await seedWeakness(page, weeklyWeaknessSnapshots(now, '/selenium'));

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });

        const panel = page.locator('[data-testid="mentor-panel"]');
        await expect(panel).toBeVisible();
        await expect(panel).toContainText('Selenium');
        await expect(panel).toContainText('7 gündür');
        // Somut sonraki adım linkleri tıklanabilir olmalı (§22 buton-tıklanabilirlik).
        const firstAction = panel.locator('a').first();
        await expect(firstAction).toBeVisible();
        await expect(firstAction).toBeEnabled();

        // Üye değil → Katman B (AI koçu) butonu HİÇ gösterilmez (karar §6.2-③④).
        await expect(page.locator('[data-testid="mentor-ai-button"]')).toHaveCount(0);
        await expect(page.locator('[data-testid="mentor-ai-result"]')).toHaveCount(0);

        await context.close();
    });

    test('/ — Java zayıflığında iki aksiyon buton FARKLI hedefe gider ("tahmin" butonu prediction sekmesini açar, "tuzaklar" butonu açmaz)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        const now = Date.now();
        await seedWeakness(page, weeklyWeaknessSnapshots(now, '/java'));

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });
        const panel = page.locator('[data-testid="mentor-panel"]');
        await expect(panel).toBeVisible();
        await expect(panel).toContainText('Java');

        // "Tahmin bloklarıyla kendini test et" → openTab:2 (prediction OLAN sekme).
        // Deep-link çalışırsa /java'ya varınca prediction bloğu ("Önce Tahmin Et")
        // hiç sekme tıklamadan görünür olmalı.
        await panel.getByRole('link', { name: /Tahmin bloklarıyla kendini test et/ }).click();
        await waitForAppReady(page, { timeout: 30_000 });
        await expect(page).toHaveURL(/\/java$/);
        // javaData büyük bir chunk — sekme içeriğinin render'ı 5s'i aşabilir (bkz. §14).
        await expect(page.getByText('Önce Tahmin Et').first()).toBeVisible({ timeout: 30_000 });

        // Geri dön, DİĞER butonu tıkla: "Klasik Java tuzaklarını tekrar et" →
        // openTab yok → 0. sekme (giriş) açılır, orada prediction bloğu YOK.
        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });
        await panel.getByRole('link', { name: /Klasik Java tuzaklarını tekrar et/ }).click();
        await waitForAppReady(page, { timeout: 30_000 });
        await expect(page).toHaveURL(/\/java$/);
        // Sayfa mount olsun (sidebar sekmeleri) — sonra 0. sekmede prediction
        // bloğu bulunmadığından "Önce Tahmin Et" görünmemeli: iki butonun gerçekten
        // farklı sekme açtığının kanıtı.
        await expect(page.locator('div[class*="flex-shrink-0"][class*="sticky"] button').first()).toBeVisible({ timeout: 30_000 });
        await expect(page.getByText('Önce Tahmin Et')).toHaveCount(0);

        await context.close();
    });

    test('/docker — MentorNudge kalıcı zayıflıkta görünür ve HomePage\'e link verir; HomePage\'in kendisinde nudge gösterilmez', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        const now = Date.now();
        await seedWeakness(page, weeklyWeaknessSnapshots(now, '/python'));

        await page.goto('/docker');
        await waitForAppReady(page, { timeout: 30_000 });

        const nudge = page.locator('[data-testid="mentor-nudge"]');
        await expect(nudge).toBeVisible();
        await expect(nudge).toContainText('Python');

        const planLink = nudge.getByRole('link', { name: /Planı gör/ });
        await expect(planLink).toBeVisible();
        await expect(planLink).toBeEnabled();
        await planLink.click();

        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });
        await expect(page).toHaveURL(/\/$/);
        // HomePage'de MentorPanel zaten öne çıktığından nudge orada tekrar gösterilmez.
        await expect(page.locator('[data-testid="mentor-nudge"]')).toHaveCount(0);
        await expect(page.locator('[data-testid="mentor-panel"]')).toBeVisible();

        await context.close();
    });

    test('kalıcı zayıflık yoksa ne MentorPanel ne MentorNudge görünür (yeni ziyaretçiye gürültü yok)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await waitForAppReady(page, { timeout: 30_000 });
        await expect(page.locator('[data-testid="mentor-nudge"]')).toHaveCount(0);

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });
        await expect(page.locator('[data-testid="mentor-panel"]')).toHaveCount(0);

        await context.close();
    });
});

// ── Katman B: AI koçu (üye-only) ─────────────────────────────────────────────
// Gerçek Groq çağrısı YAPILMIYOR — mentor-advice edge function page.route() ile
// kesilip deterministik bir yanıt simüle ediliyor (interview-grading-and-reset.spec.ts
// ile aynı kalıp) — bu yüzden fonksiyonun deploy edilmiş olması ZORUNLU DEĞİL, testin
// çalışması için gereken tek şey gerçek bir Supabase üye oturumu açabilmek.
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

const configured = Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY && TEST_USER_EMAIL && TEST_USER_PASSWORD &&
    !SUPABASE_URL.includes('YOUR_PROJECT_REF') && !SUPABASE_ANON_KEY.includes('xxxx')
);

test.describe('Kişisel AI Mentor — Katman B (AI koçu, üye-only)', () => {
    test.skip(!configured, '.env.local içinde VITE_SUPABASE_URL/KEY veya TEST_USER_EMAIL/PASSWORD eksik');
    test.skip(process.env.GITHUB_ACTIONS === 'true', 'GitHub Actions runner IP\'sinden bu Supabase projesinin /auth/v1/* yolu engelleniyor (CLAUDE.md §23.8). Yerelde/pre-push\'ta çalışır.');
    test.setTimeout(90_000);

    test('/ — üye girişinde AI koçu butonu görünür, tıklayınca mocked AI önerisi üstüne biner', async ({ browser }) => {
        const authClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
        const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
            email: TEST_USER_EMAIL!, password: TEST_USER_PASSWORD!,
        });
        if (authError || !authData.session) throw new Error(`Giriş başarısız: ${authError?.message}`);
        const { session } = authData;
        const projectRef = new URL(SUPABASE_URL!).hostname.split('.')[0];
        const storageKey = `sb-${projectRef}-auth-token`;

        const context = await browser.newContext({ serviceWorkers: 'block' });
        await context.addInitScript(([key, sessionJson]) => {
            window.localStorage.setItem(key as string, sessionJson as string);
        }, [storageKey, JSON.stringify(session)]);
        const page = await context.newPage();
        const now = Date.now();
        await seedWeakness(page, weeklyWeaknessSnapshots(now, '/javascript'));

        await page.route('**/functions/v1/mentor-advice', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    headline: 'Mock AI: JavaScript closures üzerine odaklan',
                    diagnosis: 'Mock AI teşhisi: son bir haftadır closure ve hoisting sorularında zorlanıyorsun.',
                    actions: [{ label: 'Closure bölümünü tekrar et', route: '/javascript' }],
                }),
            });
        });

        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 30_000 });
        await expect(page.locator('[data-testid="nav-account"]')).toBeVisible({ timeout: 10_000 });

        const panel = page.locator('[data-testid="mentor-panel"]');
        await expect(panel).toBeVisible();

        const aiButton = page.locator('[data-testid="mentor-ai-button"]');
        await expect(aiButton).toBeVisible();
        await expect(aiButton).toBeEnabled();
        await aiButton.click();

        const aiResult = page.locator('[data-testid="mentor-ai-result"]');
        await expect(aiResult).toBeVisible({ timeout: 15_000 });
        await expect(aiResult).toContainText('Mock AI: JavaScript closures');
        await expect(aiResult).toContainText('closure ve hoisting');

        await context.close();
    });
});
