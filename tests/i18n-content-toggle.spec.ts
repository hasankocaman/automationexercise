import { test, expect } from '@playwright/test';
import { dockerData } from '../src/data/dockerData.js';

// AC03 (Documents/acceptancecriterias.md) — i18n.
// Koşul A (TR): quiz/arayüz metinleri Türkçe olmalı.
// Koşul B (EN): sistemde HİÇBİR Türkçe kelime/cümle bulunmamalı.
// Anonim kullanıcıyla çalışır, gerçek AI çağrısı YOK, maliyetsiz.

const quizBlockTr = dockerData.tr.sections[0].blocks.find((b: any) => b.type === 'quiz')!;
const quizBlockEn = dockerData.en.sections[0].blocks.find((b: any) => b.type === 'quiz')!;

// 'ı' (noktasız i), 'ğ' ve 'ş' İngilizce'de fiilen hiç kullanılmayan, Türkçeye
// özgü karakterlerdir — EN modda görünür metinde bunlardan biri bulunursa AC03
// Koşul B'nin ihlal edildiğine dair güvenilir bir sinyaldir (false-positive riski
// 'ç'/'ö'/'ü' kullanan bazı İngilizce alıntı kelimelerden düşüktür, bu yüzden
// onlar kapsam dışı tutuldu).
const TURKISH_ONLY_CHARS = /[ığş]/;

test.describe('AC03 — dil değiştirme (TR ⇄ EN) ve localStorage kalıcılığı', () => {
    test('varsayılan dil TR — quiz sorusu ve buton metinleri Türkçe', async ({ page }) => {
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await expect(page.getByText(quizBlockTr.question)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Cevabı Kontrol Et' })).toHaveCount(0); // henüz seçim yapılmadı, buton render olmaz
        const lang = await page.evaluate(() => localStorage.getItem('language'));
        expect(lang).toBe('tr');
    });

    test('EN\'e geçilince quiz sorusu/seçenekleri ve buton metinleri İngilizce\'ye döner', async ({ page }) => {
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();

        await expect(page.getByText(quizBlockEn.question)).toBeVisible();
        await expect(page.getByText(quizBlockTr.question)).not.toBeVisible();

        const correctOpt = quizBlockEn.options.find((o: any) => o.id === quizBlockEn.correct);
        await page.locator('button', { hasText: `${correctOpt.id.toUpperCase()}.${correctOpt.text}` }).first().click();
        await expect(page.getByRole('button', { name: 'Check Answer' })).toBeVisible();
        await page.getByRole('button', { name: 'Check Answer' }).click();
        await expect(page.getByText(quizBlockEn.explanation)).toBeVisible();

        const lang = await page.evaluate(() => localStorage.getItem('language'));
        expect(lang).toBe('en');
    });

    test('dil seçimi reload sonrası kalıcı olmalı, geri TR\'ye dönülebilmeli', async ({ page }) => {
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();
        await expect(page.getByText(quizBlockEn.question)).toBeVisible();

        await page.reload();
        await page.waitForSelector('h1', { timeout: 30_000 });
        await expect(page.getByText(quizBlockEn.question)).toBeVisible();

        await page.locator('[data-testid="language-toggle"] button', { hasText: 'TR' }).click();
        await expect(page.getByText(quizBlockTr.question)).toBeVisible();
        const lang = await page.evaluate(() => localStorage.getItem('language'));
        expect(lang).toBe('tr');
    });

    test('NEGATİF: aynı dile tekrar tıklamak (TR iken TR, EN iken ENG) hiçbir şeyi bozmaz', async ({ page }) => {
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.locator('[data-testid="language-toggle"] button', { hasText: 'TR' }).click();
        await expect(page.getByText(quizBlockTr.question)).toBeVisible();
        const lang = await page.evaluate(() => localStorage.getItem('language'));
        expect(lang).toBe('tr');
    });
});

// AC03 Koşul B — tüm TopicPage route'larında EN modda görünür metinde Türkçeye
// özgü karakter taraması. topic-pages-ui.spec.ts'deki TOPIC_ROUTES listesiyle
// eşleştirildi; /basit-backend, /security, /backend kalıcı istisnalar (CLAUDE.md §22.1).
const SAMPLE_ROUTES_FOR_EN_AUDIT = [
    '/jmeter', '/sql', '/typescript', '/javascript', '/python', '/test-frameworks',
    '/postman', '/bruno', '/jenkins', '/docker', '/rest-assured', '/kubernetes',
    '/kafka', '/appium', '/playwright', '/cypress', '/selenium', '/aws', '/azure',
    '/browserstack', '/git-github', '/linux', '/java', '/what-is-testing',
];

test.describe('AC03 Koşul B — EN modda Türkçeye özgü karakter taraması', () => {
    for (const route of SAMPLE_ROUTES_FOR_EN_AUDIT) {
        test(`${route} — EN modda hiçbir sekmede Türkçeye özgü karakter (ı/ğ/ş) görünmemeli`, async ({ page }) => {
            test.setTimeout(60_000);
            await page.goto(route);
            await page.waitForSelector('h1', { timeout: 30_000 });
            await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();

            const tabButtons = page.locator('div[class*="flex-shrink-0"][class*="sticky"] button');
            const tabCount = await tabButtons.count();
            const violations: string[] = [];

            for (let i = 0; i < tabCount; i++) {
                await tabButtons.nth(i).click();
                await page.waitForTimeout(200);
                const bodyText = await page.locator('body').innerText();
                if (TURKISH_ONLY_CHARS.test(bodyText)) {
                    const match = bodyText.match(/.{0,30}[ığş].{0,30}/);
                    violations.push(`sekme ${i}: "${match?.[0]?.trim()}"`);
                }
            }

            expect(violations, `${route}: EN modda Türkçeye özgü karakter içeren içerik bulundu:\n${violations.join('\n')}`).toEqual([]);
        });
    }
});
