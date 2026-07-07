import { test, expect } from '@playwright/test';

// LC1 (llmcreate.md) — /llm-agents Token Lab: sayfanın "sandbox"ı, LLM'in
// next-token prediction mekanizmasını yaşatan deterministik simülatördür.
// Kullanıcı aday token'ları olasılıklarıyla görür; greedy/sample/elle seçimle
// cümle kurar, temperature gerçek softmax yeniden ağırlıklandırması yapar,
// düşük olasılıklı "tuhaf" yol halüsinasyonun kökenini gösterir.
// serviceWorkers: 'block' — bilinen MSW tuzağı (bkz. docker-sandbox.spec.ts).

test.describe('LC1 — Token Lab (/llm-agents)', () => {
    test('/llm-agents — greedy tamamlama, halüsinasyon yolu, temperature+sample, bağlam kayması: 5 görev işlenir', async ({ browser }) => {
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/llm-agents');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByRole('button', { name: /LLM Nedir|What Is an LLM/ }).first().click();

        const lab = page.getByTestId('token-lab');
        await expect(lab).toBeVisible();

        // 1) Greedy ile cümleyi tamamla (selenium senaryosu 2 adım derinliğinde) → görev 1 ✓
        await page.getByTestId('token-lab-greedy').click();
        await page.getByTestId('token-lab-greedy').click();
        await expect(page.getByTestId('token-lab-done')).toBeVisible();
        await expect(page.getByTestId('token-lab-mission-greedy-complete')).toHaveAttribute('data-done', 'true');

        // 2) Sıfırla → düşük olasılıklı (tuhaf) kök token'a tıkla → halüsinasyon görevi ✓
        await page.getByTestId('token-lab-reset').click();
        await page.getByTestId('token-lab-candidate-3').click();
        await expect(page.getByTestId('token-lab-done')).toBeVisible();
        await expect(page.getByTestId('token-lab-mission-weird-path')).toHaveAttribute('data-done', 'true');

        // 3) Sıfırla → temperature'ı yükselt → örnekle → sample + high-temp görevleri ✓
        await page.getByTestId('token-lab-reset').click();
        await page.getByTestId('token-lab-temp').fill('1.8');
        await page.getByTestId('token-lab-sample').click();
        await expect(page.getByTestId('token-lab-mission-try-sample')).toHaveAttribute('data-done', 'true');
        await expect(page.getByTestId('token-lab-mission-high-temp')).toHaveAttribute('data-done', 'true');

        // 4) İki Jaguar senaryosunda da ilk token'ı seç → bağlam kayması görevi ✓
        await page.getByTestId('token-lab-scenario-jaguar-nature').click();
        await page.getByTestId('token-lab-candidate-0').click();
        await page.getByTestId('token-lab-scenario-jaguar-car').click();
        await page.getByTestId('token-lab-candidate-0').click();
        await expect(page.getByTestId('token-lab-mission-context-shift')).toHaveAttribute('data-done', 'true');

        // 5) Tüm görevler tamamlandı
        await expect(lab).toContainText('(5/5)');

        await context.close();
    });

    test('/llm-agents — EN modda senaryo bağlamı ve görev metinleri İngilizce render edilir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/llm-agents');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByTestId('language-toggle').getByRole('button', { name: 'ENG' }).click();
        await page.getByRole('button', { name: /LLM Nedir|What Is an LLM/ }).first().click();

        await expect(page.getByTestId('token-lab')).toContainText('Selenium is a test');
        await expect(page.getByTestId('token-lab-mission-greedy-complete')).toContainText('Complete a sentence start-to-finish');

        await context.close();
    });
});
