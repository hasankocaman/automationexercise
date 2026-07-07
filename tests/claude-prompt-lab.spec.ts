import { test, expect } from '@playwright/test';

// CS1 (claudesayfa.md) — /claude-ai Prompt Lab: sayfanın "sandbox"ı bir terminal
// değil, simüle Claude'a karşı prompt yazma laboratuvarıdır. Kullanıcı zayıf bir
// prompt gönderir → jenerik cevap; 5 bileşeni (rol/bağlam/format/negatif/kısıt)
// ekledikçe cevap kademeli profesyonelleşir. Deterministik keyword analizi —
// gerçek API çağrısı yok. serviceWorkers: 'block' — bilinen MSW tuzağı
// (bkz. docker-sandbox.spec.ts).

const WEAK_PROMPT = 'Login için test yaz';

const STRONG_PROMPT = [
    'Sen kıdemli bir QA mühendisisin.',
    'Kabul kriterleri: geçerli e-posta + şifre girişte dashboard açılır,',
    'hatalı bilgide hata mesajı gösterilir, 5 hatalı denemede hesap kilitlenir.',
    'Negatif ve sınır değer senaryoları dahil 6 adet test case yaz.',
    'Çıktı tablo formatında olsun: ID | Senaryo | Beklenen Sonuç | Tip.',
].join('\n');

test.describe('CS1 — Claude Prompt Lab (/claude-ai)', () => {
    test('/claude-ai — zayıf prompt jenerik cevap, güçlü prompt 5/5 + görevler tamamlanır', async ({ browser }) => {
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/claude-ai');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByRole('button', { name: /Prompt Mühendisliği|Prompt Engineering/ }).first().click();

        const lab = page.getByTestId('claude-prompt-lab');
        await expect(lab).toBeVisible();
        const input = page.getByTestId('prompt-lab-input');

        // 1) Zayıf prompt → düşük skor (sadece bağlam kelimesi yakalanır) + jenerik cevap + görev 1 ✓
        await input.fill(WEAK_PROMPT);
        await page.getByTestId('prompt-lab-send').click();
        await expect(page.getByTestId('prompt-lab-score')).toContainText('1/5');
        await expect(page.getByTestId('prompt-lab-response')).toContainText(/jenerik|generic/i, { timeout: 10_000 });
        await expect(page.getByTestId('prompt-lab-mission-send-first')).toHaveAttribute('data-done', 'true');
        await expect(page.getByTestId('prompt-lab-mission-full-house')).toHaveAttribute('data-done', 'false');

        // 2) Güçlü prompt → 5/5: profesyonel tablo cevabı (kilitlenme kuralı TC04) + tüm görevler ✓
        await input.fill(STRONG_PROMPT);
        await page.getByTestId('prompt-lab-send').click();
        await expect(page.getByTestId('prompt-lab-score')).toContainText('5/5');
        await expect(page.getByTestId('prompt-lab-response')).toContainText('TC04', { timeout: 10_000 });
        await expect(page.getByTestId('prompt-lab-mission-add-role')).toHaveAttribute('data-done', 'true');
        await expect(page.getByTestId('prompt-lab-mission-add-format')).toHaveAttribute('data-done', 'true');
        await expect(page.getByTestId('prompt-lab-mission-add-negative')).toHaveAttribute('data-done', 'true');
        await expect(page.getByTestId('prompt-lab-mission-full-house')).toHaveAttribute('data-done', 'true');

        // 3) Örnek güçlü prompt aç/kapa çalışır
        await page.getByTestId('prompt-lab-example').click();
        await expect(page.locator('pre').filter({ hasText: 'kıdemli bir QA' }).first()).toBeVisible();

        await context.close();
    });

    test('/claude-ai — EN modda görev metinleri ve senaryo İngilizce render edilir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/claude-ai');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByTestId('language-toggle').getByRole('button', { name: 'ENG' }).click();
        await page.getByRole('button', { name: /Prompt Mühendisliği|Prompt Engineering/ }).first().click();

        await expect(page.getByTestId('prompt-lab-mission-send-first')).toContainText('Send your first prompt');
        await expect(page.getByTestId('claude-prompt-lab')).toContainText('As a user I want to sign in');

        await context.close();
    });
});
