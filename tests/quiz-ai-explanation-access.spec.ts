import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { dockerData } from '../src/data/dockerData.js';

// AC05 (Documents/acceptancecriterias.md): quiz cevaplandıktan sonra "AI'dan Ek
// Açıklama İste" butonu belirmeli, üretilen içerik soruyla ilişkili olmalı ve
// sayfa diline göre TR/EN olmalı. Kod: AiExplanationPanel (TopicPage.jsx ~970-1031)
// → explain-quiz-answer Edge Function, SADECE oturum açık kullanıcılar için.
//
// Bu dosya iki ucu da kapsıyor:
//  1) Anonim kullanıcı + TR/EN — buton hiç görünmemeli, kilit mesajı görünmeli
//     (AC03 dil kontrolüyle birleşik, gerçek AI çağrısı YOK, maliyetsiz).
//  2) Üye kullanıcı — buton görünür, gerçek bir Groq çağrısını page.route ile
//     KESİP simüle edilen bir hata döndürüyoruz (maliyetsiz) ve hata mesajının
//     doğru göründüğünü doğruluyoruz. Gerçek (mocklanmamış) AI çağrısının
//     sonuç ürettiğini doğrulamak tests-extended/ tarafında, manuel koşulan,
//     maliyetli bir testte yapılmalı (bkz. NEXT_SESSION.md notu).

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

const configured = Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY && TEST_USER_EMAIL && TEST_USER_PASSWORD &&
    !SUPABASE_URL.includes('YOUR_PROJECT_REF') && !SUPABASE_ANON_KEY.includes('xxxx')
);

function optionLabel(opt: { id: string; text: string }) {
    return `${opt.id.toUpperCase()}.${opt.text}`;
}

const quizBlockTr = dockerData.tr.sections[0].blocks.find((b: any) => b.type === 'quiz')!;
const quizBlockEn = dockerData.en.sections[0].blocks.find((b: any) => b.type === 'quiz')!;
const correctTr = quizBlockTr.options.find((o: any) => o.id === quizBlockTr.correct);
const correctEn = quizBlockEn.options.find((o: any) => o.id === quizBlockEn.correct);

test.describe('AC05 — anonim kullanıcı için AI açıklama kilitli (TR/EN)', () => {
    test('TR: anonim kullanıcı quiz cevaplar, AI butonu yerine giriş uyarısı görür', async ({ page }) => {
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.locator('button', { hasText: optionLabel(correctTr) }).first().click();
        await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();

        await expect(page.getByText('AI açıklaması için giriş yapmalısın.')).toBeVisible();
        await expect(page.getByText("AI'dan bu cevaba özel ek açıklama iste")).not.toBeVisible();
    });

    test('EN: anonymous user answers the quiz, sees sign-in lock instead of the AI button', async ({ page }) => {
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();

        await expect(page.locator('button', { hasText: optionLabel(correctEn) }).first()).toBeVisible();
        await page.locator('button', { hasText: optionLabel(correctEn) }).first().click();
        await page.getByRole('button', { name: 'Check Answer' }).click();

        await expect(page.getByText('Sign in to see the AI explanation.')).toBeVisible();
        await expect(page.getByText('Ask AI for an explanation tailored to your answer')).not.toBeVisible();
    });
});

test.describe('AC05 — üye kullanıcı için AI açıklama akışı', () => {
    test.skip(!configured, '.env.local içinde VITE_SUPABASE_URL/KEY veya TEST_USER_EMAIL/PASSWORD eksik');

    test('üye: buton görünür → çağrı simüle edilen hatayla başarısız olursa hata mesajı gösterilir', async ({ browser }) => {
        const authClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
        const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
            email: TEST_USER_EMAIL!, password: TEST_USER_PASSWORD!,
        });
        if (authError || !authData.session) throw new Error(`Giriş başarısız: ${authError?.message}`);
        const { session } = authData;
        const projectRef = new URL(SUPABASE_URL!).hostname.split('.')[0];
        const storageKey = `sb-${projectRef}-auth-token`;

        // serviceWorkers: 'block' ZORUNLU — proje dev modunda MSW service worker'ı
        // aktif (src/main.jsx), ve aktif bir SW varken page.route() ile kesilen
        // istekler sessizce gerçek ağa gidiyor (Playwright SW + route çatışması).
        // Bloklamadan bu test mocklanmamış GERÇEK bir Groq çağrısı yapardı.
        const context = await browser.newContext({ serviceWorkers: 'block' });
        await context.addInitScript(([key, sessionJson]) => {
            window.localStorage.setItem(key as string, sessionJson as string);
        }, [storageKey, JSON.stringify(session)]);
        const page = await context.newPage();

        // Maliyetsiz negatif test: gerçek Groq çağrısı yapılmaz, ağ isteği kesilip
        // simüle edilen bir 500 + {error} gövdesi ile başarısız olması sağlanır.
        await page.route('**/functions/v1/explain-quiz-answer', (route) =>
            route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'mock failure' }) })
        );

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await expect(page.locator('[data-testid="nav-account"]')).toBeVisible({ timeout: 10_000 });

        await page.locator('button', { hasText: optionLabel(correctTr) }).first().click();
        await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();

        const aiButton = page.getByRole('button', { name: "AI'dan bu cevaba özel ek açıklama iste" });
        await expect(aiButton).toBeVisible();
        await aiButton.click();

        // Not: "Yükleniyor..." durumu burada ayrıca beklenmiyor — mocklanmış yanıt
        // anında döndüğü için loading state'i Playwright'ın yakalayamayacağı kadar kısa sürebilir.
        await expect(page.getByText('AI açıklaması şu anda yüklenemedi.')).toBeVisible({ timeout: 10_000 });

        await context.close();
    });
});
