import { test, expect, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { dockerData } from '../src/data/dockerData.js';

// AC06 (Documents/acceptancecriterias.md) negatif/dayanıklılık senaryoları + AC07
// (kurs bitirme/reset) — şu ana kadar hiç test edilmemiş bir alan. NEXT_SESSION.md
// "AC07 — Reset özelliği koda eklendi" notuna göre özellik bu oturumda kodlandı
// (TopicPage.jsx handleHardResetPage + AuthContext.resetLessonProgress) ama hiçbir
// otomatik test eklenmemişti — bu dosya o boşluğu kapatıyor.
//
// Maliyet tasarrufu: gerçek bir Groq çağrısı YAPILMIYOR — grade-interview-answer
// page.route() ile KESİLİP deterministik bir "düşük skor" yanıtı (averagePercent<80)
// simüle ediliyor. Bu sayede test her commit'te (post-commit hook) maliyetsiz ve
// deterministik çalışabilir; gerçek AI'ın doğru puanladığı zaten
// tests/docker-interview-mastery-flow.spec.ts ve tests-extended/interview-mastery-flows.spec.ts
// tarafından ayrıca doğrulanıyor — burada amaç SADECE reset mekanizmasının kendisi.
//
// ÖNEMLİ: serviceWorkers: 'block' ZORUNLU. Proje dev modunda MSW service worker'ı
// aktif (src/main.jsx) ve aktif bir SW varken page.route() ile kesilen istekler
// sessizce gerçek ağa gidebiliyor (Playwright SW + route çatışması, bu dosya
// yazılırken keşfedildi) — bloklamadan bu mock'lar işe yaramaz, gerçek AI çağrılır.

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

const configured = Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY && TEST_USER_EMAIL && TEST_USER_PASSWORD &&
    !SUPABASE_URL.includes('YOUR_PROJECT_REF') && !SUPABASE_ANON_KEY.includes('xxxx')
);

const LOCK_TEXT = 'Mülakat sorularına geçmeden önce diğer sekmelerdeki quizlerin en az %60\'ını doğru cevaplamalısın.';
const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';
// CP3 sekme atomikleştirmesi sonrası 14 sekme, sayfa toplamı 7 quiz: sekme 0'da 2,
// sekme 1/6/8/11/12'de 1'er. Gating sayfa geneli >=%60 ister → bu 4 sekme
// (0'daki iki quiz dahil) 5/7 = %71.4 sağlar. Mülakat sekmesi artık 13. index'te.
const QUIZ_TAB_INDEXES_TO_ANSWER_CORRECTLY = [0, 1, 6, 8];
const INTERVIEW_TAB_INDEX = 13;

async function answerActiveTabQuizCorrectly(page: Page, tabIndex: number) {
    // Bir sekmede birden fazla quiz olabilir (sekme 0'da 2 adet) — sekme ilerlemesi
    // quiz bloklarının >=%60'ını istediğinden HEPSİNİ cevaplıyoruz. Her quiz kendi
    // kartı (rounded-xl border-2) içinde hedeflenir; global buton araması birden
    // çok quiz varken Playwright strict-mode ihlali verir.
    const quizBlocks = dockerData.tr.sections[tabIndex].blocks.filter((b: any) => b.type === 'quiz');
    for (const block of quizBlocks) {
        const container = page.locator('div.rounded-xl.border-2', { hasText: String(block.question).slice(0, 60) }).first();
        const correctOption = block.options.find((o: any) => o.id === block.correct);
        await container.locator('button', { hasText: correctOption.text }).first().click();
        await container.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();
        await expect(container.locator('button', { hasText: correctOption.text }).first()).toContainText('✓');
    }
}

test.describe('AC06 (dayanıklılık) + AC07 (reset) — /docker temsili sayfası', () => {
    test.skip(!configured, '.env.local içinde VITE_SUPABASE_URL/KEY veya TEST_USER_EMAIL/PASSWORD eksik');
    test.setTimeout(120_000);

    test('mülakat grading hatası → boş/eksik cevap engeli → düşük skor → reset (vazgeç + onay) → Supabase doğrulaması', async ({ browser }) => {
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

        // 1. çağrı transient hata simüle eder (AC06 dayanıklılık), 2. çağrı düşük skor döner (<%80, AC07 tetikleyicisi).
        let gradeCallCount = 0;
        await page.route('**/functions/v1/grade-interview-answer', async (route) => {
            gradeCallCount++;
            if (gradeCallCount === 1) {
                await route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'mock transient failure' }) });
                return;
            }
            const body = JSON.parse(route.request().postData() || '{}');
            const items = body.items || [];
            const results = items.map(() => ({ coveredPoints: 0, totalPoints: 5, percent: 10, feedback: 'Mock: cevap referans noktalarını karşılamıyor.', missedPoints: ['mock eksik nokta'] }));
            await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ results }) });
        });

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await expect(page.locator('[data-testid="nav-account"]')).toBeVisible({ timeout: 10_000 });

        const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);
        const tab0Checkbox = tabButtons.nth(0).locator('[role="checkbox"]');

        // ── Gate'i aç: 5/7 quiz doğru (%71.4 >= %60).
        for (const tabIndex of QUIZ_TAB_INDEXES_TO_ANSWER_CORRECTLY) {
            await tabButtons.nth(tabIndex).click();
            await answerActiveTabQuizCorrectly(page, tabIndex);
        }
        await expect(tab0Checkbox).toHaveAttribute('aria-checked', 'true');

        await tabButtons.nth(INTERVIEW_TAB_INDEX).click();
        await expect(page.getByText(LOCK_TEXT)).not.toBeVisible();
        await expect(page.getByText('Mülakat Pratiği — Sekmeyi Tamamla')).toBeVisible();

        // ── AC06 NEGATİF: boş/eksik cevapla "Tümünü Değerlendir" disabled kalmalı.
        const textareas = page.locator('textarea[placeholder="Kendi cümlelerinle cevabını yaz..."]');
        await expect(textareas).toHaveCount(5);
        const gradeAllButton = page.getByRole('button', { name: /Tümünü Değerlendir/ });
        await expect(gradeAllButton).toBeDisabled();

        for (let i = 0; i < 4; i++) {
            await textareas.nth(i).fill('Test amaçlı kasıtlı olarak zayıf/yanlış bir cevap.');
        }
        await expect(gradeAllButton, '4/5 dolu — buton hâlâ disabled olmalı').toBeDisabled();

        await textareas.nth(4).fill('Test amaçlı kasıtlı olarak zayıf/yanlış bir cevap.');
        await expect(gradeAllButton, '5/5 dolu — buton artık enabled olmalı').toBeEnabled();

        // ── AC06 dayanıklılık: 1. çağrı hata döner, kullanıcı tekrar deneyebilmeli.
        await gradeAllButton.click();
        await expect(page.getByText('Değerlendirme şu anda yapılamadı, lütfen tekrar dene.').first()).toBeVisible();
        await expect(gradeAllButton).toBeEnabled();

        // ── 2. çağrı düşük skor döner → AC07 reset teklifi tetiklenmeli.
        const gradeResponsePromise = page.waitForResponse((res) => res.url().includes('/functions/v1/grade-interview-answer'));
        await gradeAllButton.click();
        await gradeResponsePromise;
        await expect(page.getByText('⚠️ Ortalama %10 — %80\'e ulaşmak için cevaplarını gözden geçir ve tekrar değerlendir.')).toBeVisible();

        const resetOfferButton = page.getByRole('button', { name: '🔄 Sayfayı Sıfırla' });
        await expect(resetOfferButton).toBeVisible();

        // ── NEGATİF: "Vazgeç" hiçbir şeyi sıfırlamamalı.
        await resetOfferButton.click();
        await expect(page.getByText(/Eminsin/)).toBeVisible();
        await page.getByRole('button', { name: 'Vazgeç' }).click();
        await expect(page.getByText(/Eminsin/)).not.toBeVisible();
        await expect(resetOfferButton).toBeVisible();
        await expect(page.getByText('⚠️ Ortalama %10')).toBeVisible();
        await expect(tab0Checkbox).toHaveAttribute('aria-checked', 'true');

        // Reset öncesi: 0-3 sekmeleri gerçekten Supabase'e 'completed' olarak yazılmış olmalı.
        const beforeResetRes = await page.request.get(
            `${SUPABASE_URL}/rest/v1/user_progress?user_id=eq.${authData.user!.id}&lesson_slug=eq.docker&select=topic_slug,status`,
            { headers: { apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${session.access_token}` } }
        );
        expect(beforeResetRes.status()).toBe(200);
        const beforeRows: Array<{ topic_slug: string; status: string }> = await beforeResetRes.json();
        expect(beforeRows.length, 'reset öncesi docker için en az tabs 0-3 completed satırı bekleniyordu').toBeGreaterThanOrEqual(4);

        // ── ONAY: "Sayfayı Sıfırla" → "Eminim, sıfırla".
        await resetOfferButton.click();
        await page.getByRole('button', { name: '✅ Eminim, sıfırla' }).click();

        // ── UI tarafı: ilk sekmeye dön, sekme 0 artık tamamlanmamış görünmeli, kilit geri gelmeli.
        await expect(tabButtons.nth(0)).toHaveClass(/shadow-md/);
        await expect(tab0Checkbox).toHaveAttribute('aria-checked', 'false');

        await tabButtons.nth(INTERVIEW_TAB_INDEX).click();
        await expect(page.getByText(LOCK_TEXT)).toBeVisible();

        const clearedKeys = await page.evaluate(() => ([
            localStorage.getItem('progress_docker'),
            localStorage.getItem('quizProgress_docker'),
            localStorage.getItem('quizScore_docker'),
            localStorage.getItem('quizAttempted_docker'),
        ]));
        expect(clearedKeys, 'hard-reset sonrası 4 localStorage anahtarı da null olmalı').toEqual([null, null, null, null]);

        // ── Backend tarafı: AC07 "hard-reset" — lesson_slug=docker için TÜM satırlar silinmiş olmalı.
        // NOT (bkz. NEXT_SESSION.md): bu silme işlemi user_progress tablosunda
        // "auth.uid() = user_id" şartlı bir DELETE RLS policy'sine bağlı. Bu policy
        // learnqa-test/learnqa-prod'da elle çalıştırılmadıysa resetLessonProgress()
        // sessizce 0 satır siler ve bu assertion BİLEREK FAIL eder — bu, AC07'nin
        // backend tarafının eksik olduğunu gösteren gerçek bir regresyon sinyalidir,
        // flaky test değildir.
        await page.waitForTimeout(500);
        const afterResetRes = await page.request.get(
            `${SUPABASE_URL}/rest/v1/user_progress?user_id=eq.${authData.user!.id}&lesson_slug=eq.docker&select=topic_slug,status`,
            { headers: { apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${session.access_token}` } }
        );
        expect(afterResetRes.status()).toBe(200);
        const afterRows = await afterResetRes.json();
        expect(afterRows, 'AC07 hard-reset: lesson_slug=docker için Supabase satırları silinmemiş — "users delete own progress" RLS policy\'si learnqa-test projesinde eksik olabilir, bkz. NEXT_SESSION.md').toEqual([]);

        await context.close();
    });
});
