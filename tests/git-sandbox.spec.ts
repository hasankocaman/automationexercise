import { test, expect } from '@playwright/test';

// CP5.2 (contentplan.md) — Git Sandbox rollout: mevcut git-interactive-terminal
// gerçekten iyi bir temele sahipti (status/add/commit/branch/checkout/merge/log
// zaten çalışıyordu, Linux'taki `cd` gibi kritik bir bug yoktu). Bu oturumda
// eksik olan git diff ve git stash/stash pop eklendi + 5 görevlik mission
// sistemi kuruldu (Docker/Linux Sandbox'la aynı state-bazlı desen).
// serviceWorkers: 'block' — bilinen MSW tuzağı (bkz. docker-sandbox.spec.ts).

test.describe('CP5.2 — Git Sandbox (interaktif terminal)', () => {
    test('/git-github — commit/branch/merge/diff/stash akışı: motor paneli ve görevler canlı güncellenir', async ({ browser }) => {
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/git-github');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByRole('button', { name: /Git Temelleri/ }).first().click();

        const input = page.getByTestId('git-terminal-input');
        await expect(input).toBeVisible();

        // 1) diff + stash + stash pop — seed edilmiş ilk working dir değişikliğini kullanır
        // (commit sonrası 1sn gecikmeli "yeni değişiklik" efektine bağımlı KALMAMAK için
        // bilerek EN BAŞTA, gerçek zamanlama riskini ortadan kaldırarak çalıştırılır).
        await input.fill('git diff');
        await input.press('Enter');
        await expect(page.getByTestId('git-mission-diff-inspected')).toHaveAttribute('data-done', 'true');

        await input.fill('git stash');
        await input.press('Enter');
        await expect(page.getByTestId('git-stash-panel')).toContainText('stash@{0}');
        await input.fill('git stash pop');
        await input.press('Enter');
        await expect(page.getByTestId('git-terminal-output')).toContainText('Dropped');
        await expect(page.getByTestId('git-mission-stash-workflow')).toHaveAttribute('data-done', 'true');

        // 2) stage + commit — görev tamamlanmalı
        await input.fill('git add .');
        await input.press('Enter');
        await input.fill('git commit -m "fix: stabilize login test"');
        await input.press('Enter');
        await expect(page.getByTestId('git-terminal-output')).toContainText('fix: stabilize login test');
        await expect(page.getByTestId('git-mission-stage-commit')).toHaveAttribute('data-done', 'true');

        // 3) branch + switch — görev tamamlanmalı
        await input.fill('git branch feature/payment');
        await input.press('Enter');
        await input.fill('git checkout feature/payment');
        await input.press('Enter');
        await expect(page.getByTestId('git-terminal-output')).toContainText("Switched to branch 'feature/payment'");
        await expect(page.getByTestId('git-mission-branch-switch')).toHaveAttribute('data-done', 'true');

        // 4) merge — görev tamamlanmalı
        await input.fill('git checkout main');
        await input.press('Enter');
        await input.fill('git merge feature/payment');
        await input.press('Enter');
        await expect(page.getByTestId('git-terminal-output')).toContainText('Merge made by');
        await expect(page.getByTestId('git-mission-merge-done')).toHaveAttribute('data-done', 'true');

        // Hatalı komut → gerçekçi hata
        await input.fill('git bisect');
        await input.press('Enter');
        await expect(page.getByTestId('git-terminal-output')).toContainText("'bisect' is not a git command");

        await context.close();
    });

    test('/git-github — EN modda görev metinleri İngilizce render edilir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/git-github');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByTestId('language-toggle').getByRole('button', { name: 'ENG' }).click();
        await page.getByRole('button', { name: /Git Basics/ }).first().click();

        await expect(page.getByTestId('git-mission-stage-commit')).toContainText('Stage a change and commit it');

        await context.close();
    });
});
