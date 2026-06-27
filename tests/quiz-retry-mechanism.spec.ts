import { test, expect } from '@playwright/test';
import { dockerData } from '../src/data/dockerData.js';

// AC02 (Documents/acceptancecriterias.md): kullanıcı bir quiz sorusuna yanlış
// cevap verirse, sistem BİR DEFAYA MAHSUS olmak üzere farklı bir yedek soru
// göstermeli ve kullanıcı bunu cevaplayabilmelidir. Bu davranış QuizBlock'taki
// activeVariant/canRetry state'inde (TopicPage.jsx ~satır 1035-1184) yaşıyor —
// canRetry SADECE activeVariant==='main' iken true olabiliyor, yani retry
// sorusundan sonra üçüncü bir varyant asla açılmıyor. Anonim kullanıcıyla
// çalışır (quiz cevaplama auth gerektirmez) — gerçek AI çağrısı YOK, maliyetsiz,
// her commit'te koşulabilir.
//
// Docker /docker sayfasının 0. sekmesi (tek quiz bloğu) referans alınıyor —
// dockerData.tr'de retryQuestion içeriği zaten bilinen ve sabit.

const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';

function optionLabel(opt: { id: string; text: string }) {
    return `${opt.id.toUpperCase()}.${opt.text}`;
}

const quizBlock = dockerData.tr.sections[0].blocks.find((b: any) => b.type === 'quiz')!;
const mainCorrect = quizBlock.options.find((o: any) => o.id === quizBlock.correct);
const mainWrong = quizBlock.options.find((o: any) => o.id !== quizBlock.correct);
const retryBlock = quizBlock.retryQuestion;
const retryCorrect = retryBlock.options.find((o: any) => o.id === retryBlock.correct);
const retryWrong = retryBlock.options.find((o: any) => o.id !== retryBlock.correct);

test.describe('AC02 — quiz yanlış cevap sonrası bir defaya mahsus alternatif soru', () => {
    test('ana soruya yanlış cevap → retry sorusu açılır → retry de yanlış olursa İKİNCİ bir retry YOK', async ({ page }) => {
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.locator('button', { hasText: optionLabel(mainWrong) }).first().click();
        await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();
        await expect(page.locator('button', { hasText: optionLabel(mainWrong) }).first()).toContainText('✗');
        await expect(page.locator('button', { hasText: optionLabel(mainCorrect) }).first()).toContainText('✓');

        const retryButton = page.getByRole('button', { name: '🔄 Farklı bir soru dene' });
        await expect(retryButton).toBeVisible();
        await retryButton.click();

        // Retry sorusu render olmalı: rozet + farklı soru metni, ana soru artık görünmemeli.
        await expect(page.getByText('Tekrar deneme — yeni soru')).toBeVisible();
        await expect(page.getByText(retryBlock.question)).toBeVisible();
        await expect(page.getByText(quizBlock.question)).not.toBeVisible();

        // Retry sorusuna da yanlış cevap ver.
        await page.locator('button', { hasText: optionLabel(retryWrong) }).first().click();
        await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();
        await expect(page.locator('button', { hasText: optionLabel(retryWrong) }).first()).toContainText('✗');

        // AC02 — "bir defaya mahsus": ikinci bir "Farklı bir soru dene" butonu kesinlikle OLMAMALI.
        await expect(page.getByRole('button', { name: '🔄 Farklı bir soru dene' })).not.toBeVisible();
    });

    test('retry sorusuna doğru cevap verilirse normal doğru cevap gibi sayılır (sekme ilerlemesine katkı sağlar)', async ({ page }) => {
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const tab0Checkbox = page.locator(SIDEBAR_TAB_BUTTONS).nth(0).locator('[role="checkbox"]');
        await expect(tab0Checkbox).toHaveAttribute('aria-checked', 'false');

        await page.locator('button', { hasText: optionLabel(mainWrong) }).first().click();
        await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();
        await page.getByRole('button', { name: '🔄 Farklı bir soru dene' }).click();

        await page.locator('button', { hasText: optionLabel(retryCorrect) }).first().click();
        await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();
        await expect(page.locator('button', { hasText: optionLabel(retryCorrect) }).first()).toContainText('✓');

        // Bu sekmenin TEK quiz bloğu var — retry üzerinden doğru cevaplamak da
        // handleQuizAnswered(blockIndex, true) tetikler, sekme %100 ile tamamlanmalı.
        await expect(tab0Checkbox).toHaveAttribute('aria-checked', 'true');
    });

    test('NEGATİF: ana soruya İLK denemede doğru cevap verilirse retry butonu hiç görünmez', async ({ page }) => {
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.locator('button', { hasText: optionLabel(mainCorrect) }).first().click();
        await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();
        await expect(page.locator('button', { hasText: optionLabel(mainCorrect) }).first()).toContainText('✓');

        await expect(page.getByRole('button', { name: '🔄 Farklı bir soru dene' })).not.toBeVisible();
    });
});
