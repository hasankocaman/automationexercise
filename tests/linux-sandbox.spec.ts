import { test, expect } from '@playwright/test';

// CP5 (contentplan.md) — Linux Sandbox rollout: Docker Sandbox'ta (CP1) kanıtlanan
// "kullanıcı komutu kendi yazar, durum-makineli motor canlı güncellenir" kalıbının
// Linux sayfasına taşınması. Kritik bulgu: mevcut interaktif terminalde `cd` komutu
// hiç çalışmıyordu (linuxCurrentDir hiç güncellenmiyordu) — bu oturumda düzeltildi,
// ayrıca cat/grep/chmod/find eklendi ve 5 görevlik bir mission sistemi kuruldu.
// serviceWorkers: 'block' — bilinen MSW tuzağı (bkz. docker-sandbox.spec.ts).

test.describe('CP5 — Linux Sandbox (interaktif terminal)', () => {
    test('/linux — cd/grep/mkdir/touch/chmod akışı: motor paneli ve görevler canlı güncellenir', async ({ browser }) => {
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/linux');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByRole('button', { name: /Dosya Sistemi & Navigasyon/ }).first().click();

        const input = page.getByTestId('linux-terminal-input');
        await expect(input).toBeVisible();

        // 1) cd — daha önce çalışmayan kritik komut: gerçekten dizin değiştirmeli
        await input.fill('cd test-suite');
        await input.press('Enter');
        await expect(page.getByTestId('linux-mission-nav-test-suite')).toHaveAttribute('data-done', 'true');
        await expect(page.getByTestId('linux-fs--home-qa_tester-test-suite')).toContainText('(pwd)');

        // 2) hatalı cd → gerçekçi hata
        await input.fill('cd does-not-exist');
        await input.press('Enter');
        await expect(page.getByTestId('linux-terminal-output')).toContainText('No such file or directory');

        // 3) grep — test.log içindeki FAIL satırlarını bulmalı, görev tamamlanmalı
        await input.fill('grep FAIL test.log');
        await input.press('Enter');
        await expect(page.getByTestId('linux-terminal-output')).toContainText('FAIL test_checkout');
        await expect(page.getByTestId('linux-mission-grep-fail')).toHaveAttribute('data-done', 'true');

        // 4) mkdir — yeni klasör hem panelde hem görevde görünmeli
        await input.fill('mkdir reports');
        await input.press('Enter');
        await expect(page.getByTestId('linux-fs--home-qa_tester-test-suite-reports')).toBeVisible();
        await expect(page.getByTestId('linux-mission-mkdir-reports')).toHaveAttribute('data-done', 'true');

        // 5) touch (yeni klasörün içinde) — dosya oluşturma görevi
        await input.fill('cd reports');
        await input.press('Enter');
        await input.fill('touch summary.txt');
        await input.press('Enter');
        await expect(page.getByTestId('linux-mission-touch-summary')).toHaveAttribute('data-done', 'true');

        // 6) chmod +x — izin string'i güncellenmeli, görev tamamlanmalı
        await input.fill('cd ..');
        await input.press('Enter');
        await input.fill('chmod +x deploy.sh');
        await input.press('Enter');
        await expect(page.getByTestId('linux-terminal-output')).toContainText('rwxr--r--');
        await expect(page.getByTestId('linux-mission-chmod-exec')).toHaveAttribute('data-done', 'true');

        await context.close();
    });

    test('/linux — EN modda görev metinleri İngilizce render edilir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/linux');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByTestId('language-toggle').getByRole('button', { name: 'ENG' }).click();
        await page.getByRole('button', { name: /Filesystem & Navigation/ }).first().click();

        await expect(page.getByTestId('linux-mission-nav-test-suite')).toContainText('Enter the test-suite project folder');

        await context.close();
    });
});
