import { test, expect, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { dockerData } from '../src/data/dockerData.js';

// Bu dosya tek bir temsili ders (/docker) üzerinden uçtan uca "öğrenme döngüsünü"
// doğrular — bu davranış TÜM TopicPage tabanlı sayfalarda ortak olduğu için
// (CLAUDE.md §17/§18), her sayfada tekrarlamak yerine bir sayfada derinlemesine
// test ediyoruz (Docker en az quiz bloğuna sahip sayfa, en hızlı koşar):
//   1. Sayfa genelindeki quizlerin <%60'ı doğru cevaplanmışken Mülakat sekmesi kilitli.
//   2. >=%60'ı doğru cevaplanınca Mülakat sekmesi açılır.
//   3. Açılan sekmede kullanıcının kendi cevabını yazabileceği bir textarea vardır.
//   4. "Tümünü Değerlendir" gerçek grade-interview-answer AI çağrısını tetikler ve
//      her soru için bir puan (X/Y kontrol noktası) döner.
//   5. Ortalama >=%80 olduğunda sekme "tamamlandı" sayılır — bu, gerçek Supabase
//      user_progress satırına da yansır (rozet sisteminin ön koşulu).
//
// MALİYET UYARISI: Bu test gerçek bir grade-interview-answer (Groq AI) çağrısı
// yapar ve gerçek bir Supabase satırı yazar (bkz. dosya başındaki diğer test
// dosyalarındaki not). Rozet (badge) KÜMÜLATİF site-geneli tamamlanan konu
// sayısına göre verilir ve bir kez kazanılan rozet tekrar tetiklenmez — bu yüzden
// "yeni rozet" toast'ı sadece eşik bu koşumda aşılırsa görünür; her koşumda
// görünmesi ZORUNLU değildir (bkz. PR/konuşma geçmişi — bilinçli tasarım kararı).

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

// dockerData.tr.sections sırasıyla: 0 Giriş, 1 Kurulum, 2 Temel Komutlar,
// 3 Dockerfile & Compose, 4 QA Kullanımı, 5 Ekosistem (her biri 1 quiz içerir),
// 6 💼 Mülakat S&C (interview-questions). 4/6 doğru = %66.7 (>=%60 eşiğini geçer).
const QUIZ_TAB_INDEXES_TO_ANSWER_CORRECTLY = [0, 1, 2, 3];
const INTERVIEW_TAB_INDEX = 6;

async function answerActiveTabQuizCorrectly(page: Page, tabIndex: number) {
    const block = dockerData.tr.sections[tabIndex].blocks.find((b: any) => b.type === 'quiz');
    const correctOption = block.options.find((o: any) => o.id === block.correct);
    await page.locator('button', { hasText: correctOption.text }).first().click();
    await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();
    await expect(page.locator('button', { hasText: correctOption.text }).first()).toContainText('✓');
}

test.describe('Docker — quiz gating + mülakat AI değerlendirme akışı (happy path)', () => {
    test.skip(!configured, '.env.local içinde VITE_SUPABASE_URL/KEY veya TEST_USER_EMAIL/PASSWORD eksik');
    test.setTimeout(120_000);

    test('quiz <%60 kilitli → >=%60 açılır → AI değerlendirir → sekme tamamlanır', async ({ browser }) => {
        // Gerçek bir test JWT'si alıp tarayıcı context'ine localStorage üzerinden
        // enjekte ediyoruz — uygulamada sadece Google/Azure OAuth login var, headless
        // CI'da bunu sürmek mümkün değil. supabase-js'in varsayılan storage key formatı:
        // sb-<project-ref>-auth-token (bkz. @supabase/supabase-js dist kaynağı).
        const authClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
        const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
            email: TEST_USER_EMAIL!,
            password: TEST_USER_PASSWORD!,
        });
        if (authError || !authData.session) {
            throw new Error(`Test kullanıcısı ile giriş başarısız: ${authError?.message ?? 'session yok'}`);
        }
        const { session } = authData;
        const projectRef = new URL(SUPABASE_URL!).hostname.split('.')[0];
        const storageKey = `sb-${projectRef}-auth-token`;

        const context = await browser.newContext();
        await context.addInitScript(([key, sessionJson]) => {
            window.localStorage.setItem(key as string, sessionJson as string);
        }, [storageKey, JSON.stringify(session)]);
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        // Giriş gerçekten oturdu mu — TopicHeader'daki hesap menüsü "giriş yap" değil
        // "hesabım" durumuna geçmiş olmalı (oturum enjeksiyonunun doğrulaması).
        await expect(page.locator('[data-testid="nav-account"]')).toBeVisible({ timeout: 10_000 });

        const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);

        // 1) Hiçbir quiz cevaplanmadan (%0 < %60) Mülakat sekmesi kilitli olmalı.
        await tabButtons.nth(INTERVIEW_TAB_INDEX).click();
        await expect(page.getByText(LOCK_TEXT)).toBeVisible();

        // 2) 2/6 quiz doğru (%33 < %60) — hâlâ kilitli olmalı.
        await tabButtons.nth(0).click();
        await answerActiveTabQuizCorrectly(page, 0);
        await tabButtons.nth(1).click();
        await answerActiveTabQuizCorrectly(page, 1);
        await tabButtons.nth(INTERVIEW_TAB_INDEX).click();
        await expect(page.getByText(LOCK_TEXT)).toBeVisible();

        // 3) 4/6 quiz doğru (%66.7 >= %60) — kilit açılmalı.
        await tabButtons.nth(2).click();
        await answerActiveTabQuizCorrectly(page, 2);
        await tabButtons.nth(3).click();
        await answerActiveTabQuizCorrectly(page, 3);
        await tabButtons.nth(INTERVIEW_TAB_INDEX).click();
        await expect(page.getByText(LOCK_TEXT)).not.toBeVisible();
        await expect(page.getByText('Mülakat Pratiği — Sekmeyi Tamamla')).toBeVisible();

        // 4) Kullanıcının kendi cevabını yazabileceği bir input (textarea) var mı —
        // örneklenen 5 sorunun her birinde bir tane olmalı.
        const textareas = page.locator('textarea[placeholder="Kendi cümlelerinle cevabını yaz..."]');
        await expect(textareas).toHaveCount(5);

        // Rastgele örneklenen 5 soruyu DOM'dan okuyup dockerData.tr'deki referans
        // cevaplarla eşleştiriyoruz, sonra o referans cevabı kullanıcı cevabı olarak
        // yazıyoruz — AI gerçek bir mantık değerlendirmesi yapsın diye (ezbere eşleşme
        // değil), ama deterministik bir şekilde >=%80 ortalamayı garantilemek için.
        const interviewBlock = dockerData.tr.sections[INTERVIEW_TAB_INDEX].blocks.find((b: any) => b.type === 'interview-questions');
        const questionPool: Array<{ q: { tr: string }; a: { tr: string } }> = interviewBlock.questions;

        const questionTexts = await page.locator('.space-y-5 > div p.font-semibold').allTextContents();
        expect(questionTexts).toHaveLength(5);

        for (let idx = 0; idx < questionTexts.length; idx++) {
            const rendered = questionTexts[idx].replace(/^\d+\.\s*/, '').trim();
            const match = questionPool.find((q) => q.q.tr.trim() === rendered);
            expect(match, `Soru DOM'da bulundu ama dockerData.tr'de eşleşmedi: "${rendered}"`).toBeTruthy();
            await textareas.nth(idx).fill(match!.a.tr);
        }

        // 5) Tümünü Değerlendir — gerçek grade-interview-answer (Groq AI) çağrısı.
        // Skoru DOM'dan değil doğrudan API yanıtından okuyoruz: mastery (avg>=80)
        // tetiklenince setScores + setCompletedTabs aynı React commit'inde batch'lenip
        // bileşen anında "alreadyMastered" görünümüne geçiyor — ara "Ortalama %"
        // banner'ı/skor panelleri hiç boyanmıyor (yarış durumu, gerçek bug değil).
        const gradeResponsePromise = page.waitForResponse((res) => res.url().includes('/functions/v1/grade-interview-answer'));
        await page.getByRole('button', { name: /Tümünü Değerlendir/ }).click();
        const gradeResponse = await gradeResponsePromise;
        expect(gradeResponse.status()).toBe(200);
        const gradeBody = await gradeResponse.json();
        expect(gradeBody.results).toHaveLength(5);
        for (const result of gradeBody.results) {
            expect(typeof result.percent).toBe('number'); // item 5 — AI her soruyu puanladı
        }
        const avg = gradeBody.results.reduce((sum: number, r: any) => sum + r.percent, 0) / gradeBody.results.length;
        expect(avg, `Referans cevaplarla ortalama >=80 bekleniyordu, AI ${avg} verdi`).toBeGreaterThanOrEqual(80);

        // 6) Ortalama >=%80 → sekme "tamamlandı" sayılır (alreadyMastered görünümüne geçer).
        await expect(page.getByText('✅ Mülakat Pratiği tamamlandı.')).toBeVisible({ timeout: 10_000 });

        // Mekanizmanın gerçek backend tarafı: Supabase'de bu konu artık 'completed'.
        // (Rozet KÜMÜLATİF site-geneli sayıma bağlı — zaten kazanılmışsa bu koşumda
        // yeni bir rozet gelmez, bu yüzden rozet toast'ını ZORUNLU olarak aramıyoruz,
        // ama gelirse görünür olmalı.)
        const progressRes = await page.request.get(
            `${SUPABASE_URL}/rest/v1/user_progress?user_id=eq.${authData.user!.id}&lesson_slug=eq.docker&topic_slug=eq.${INTERVIEW_TAB_INDEX}&select=status`,
            { headers: { apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${session.access_token}` } }
        );
        expect(progressRes.status()).toBe(200);
        const progressRows = await progressRes.json();
        expect(progressRows).toEqual([{ status: 'completed' }]);

        const newBadgeToast = page.getByText(/Yeni rozet!|New badge!/);
        if (await newBadgeToast.isVisible().catch(() => false)) {
            await expect(newBadgeToast).toBeVisible();
        }

        await context.close();
    });
});
