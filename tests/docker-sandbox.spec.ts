import { test, expect } from '@playwright/test';

// CP1 (contentplan.md) — Docker Sandbox: durum-makineli interaktif terminal.
// Kullanıcı komutu kendisi yazar; sahte engine state'i (image rafı, container
// kutuları) görsel panelde canlı güncellenir, hatalar gerçekçi mesajlarla döner.
// serviceWorkers: 'block' — bilinen MSW tuzağı (bkz. review-queue.spec.ts).

test.describe('CP1 — Docker Sandbox (interaktif terminal)', () => {
    test('/docker — pull/run/hata/temizlik akışı: engine paneli ve görevler canlı güncellenir', async ({ browser }) => {
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        // "Temel Komutlar" sekmesine geç (sol dikey sidebar — kısa sekme adı, section title değil)
        await page.getByRole('button', { name: /Temel Komutlar/ }).first().click();

        const sandbox = page.getByTestId('docker-sandbox');
        await sandbox.scrollIntoViewIfNeeded();
        await expect(sandbox).toBeVisible();

        const input = page.getByTestId('sandbox-input');

        // 1) pull → image rafında görünmeli
        await input.fill('docker pull nginx');
        await input.press('Enter');
        await expect(page.getByTestId('sandbox-image-nginx')).toBeVisible();
        await expect(sandbox.getByText('Status: Downloaded newer image for nginx:latest')).toBeVisible();

        // 2) hatalı komut → gerçekçi hata + 💡 önerisi
        await input.fill('docker rn nginx');
        await input.press('Enter');
        await expect(sandbox.getByText(/'rn' is not a docker command/)).toBeVisible();

        // 3) run → çalışan container kutusu + görev ✓
        await input.fill('docker run -d -p 8080:80 --name web nginx');
        await input.press('Enter');
        const webBox = page.getByTestId('sandbox-container-web');
        await expect(webBox).toBeVisible();
        await expect(webBox).toHaveAttribute('data-status', 'running');
        await expect(page.getByTestId('mission-run-web')).toHaveAttribute('data-done', 'true');

        // 4) port çakışması → gerçekçi "port is already allocated" hatası
        await input.fill('docker run -d -p 8080:80 --name web2 nginx');
        await input.press('Enter');
        await expect(sandbox.getByText(/port is already allocated/)).toBeVisible();

        // 5) çalışan container'ı -f'siz silme → öğretici hata
        await input.fill('docker rm web');
        await input.press('Enter');
        await expect(sandbox.getByText(/container is running: stop the container/)).toBeVisible();

        // 6) stop + rm → container kaybolur, temizlik görevi ✓
        await input.fill('docker stop web');
        await input.press('Enter');
        await expect(webBox).toHaveAttribute('data-status', 'exited');
        await input.fill('docker rm web');
        await input.press('Enter');
        await expect(webBox).toHaveCount(0);
        await expect(page.getByTestId('mission-clean-web')).toHaveAttribute('data-done', 'true');

        // Sayfa/console hatası olmamalı (sandbox tamamen client-side)
        await context.close();
    });

    test('/docker — EN modda sandbox görev metinleri İngilizce render edilir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        // Dili EN'e çevir (sağ üst toggle içindeki ENG butonu) ve EN sekme adıyla ilerle
        await page.getByTestId('language-toggle').getByRole('button', { name: 'ENG' }).click();
        await page.getByRole('button', { name: /Core Commands/ }).first().click();

        await expect(page.getByTestId('mission-pull-hello')).toContainText('Pull the hello-world image');

        await context.close();
    });
});
