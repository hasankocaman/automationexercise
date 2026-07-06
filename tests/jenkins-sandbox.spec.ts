import { test, expect } from '@playwright/test';

// CP7 (contentplan.md) — Jenkins Sandbox: Docker/Linux/Git/K8s'ten farklı olarak
// Jenkins'in öğrenme engeli bir CLI değil, Jenkinsfile sözdizimi + stage/post
// akışıdır. Bu yüzden sandbox bir terminal değil, düzenlenebilir Jenkinsfile
// editörü + "▶ Build Now" + canlı Stage View'dur: kullanıcı dosyayı KENDİSİ
// değiştirir, build'i kırar, SKIPPED stage'leri ve post{failure}'ı gözlemler.
// serviceWorkers: 'block' — bilinen MSW tuzağı (bkz. docker-sandbox.spec.ts).

const BROKEN_TEST_STAGE = `pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'exit 1'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }

    post {
        failure {
            echo 'Notifying the team...'
        }
    }
}`;

const FIXED_WITH_DEPLOY = BROKEN_TEST_STAGE.replace("sh 'exit 1'", "sh 'npm test'");

test.describe('CP7 — Jenkins Sandbox (yazılabilir Jenkinsfile + canlı Stage View)', () => {
    test('/jenkins — yeşil build, kırık build (SKIPPED + post failure), tekrar yeşil: görevler canlı tamamlanır', async ({ browser }) => {
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/jenkins');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByRole('button', { name: /Pipeline/ }).first().click();

        const editor = page.getByTestId('jenkins-sandbox-editor');
        await expect(editor).toBeVisible();

        // 1) Starter Jenkinsfile'ı olduğu gibi çalıştır → SUCCESS + görev 1 ✓
        await page.getByTestId('jenkins-sandbox-build').click();
        await expect(page.getByTestId('jenkins-build-1')).toHaveAttribute('data-status', 'SUCCESS', { timeout: 10_000 });
        await expect(page.getByTestId('jenkins-console')).toContainText('Finished: SUCCESS');
        await expect(page.getByTestId('jenkins-mission-first-green')).toHaveAttribute('data-done', 'true');

        // 2) Test stage'i kırık + Deploy stage'li + post{failure}'lı dosya → FAILURE:
        //    Deploy SKIPPED kalmalı, post failure rozeti yanmalı, görev 3 ve 4 ✓
        await editor.fill(BROKEN_TEST_STAGE);
        await page.getByTestId('jenkins-sandbox-build').click();
        await expect(page.getByTestId('jenkins-build-2')).toHaveAttribute('data-status', 'FAILURE', { timeout: 10_000 });
        await expect(page.getByTestId('jenkins-console')).toContainText('script returned exit code 1');
        await expect(page.getByTestId('jenkins-stage-2')).toHaveAttribute('data-status', 'skipped');
        await expect(page.getByTestId('jenkins-post-failure')).toHaveAttribute('data-ran', 'true');
        await expect(page.getByTestId('jenkins-mission-break-build')).toHaveAttribute('data-done', 'true');
        await expect(page.getByTestId('jenkins-mission-post-failure')).toHaveAttribute('data-done', 'true');

        // 3) exit 1'i düzelt → tekrar SUCCESS: görev 2 (Deploy'lu yeşil) ve görev 5 ✓
        await editor.fill(FIXED_WITH_DEPLOY);
        await page.getByTestId('jenkins-sandbox-build').click();
        await expect(page.getByTestId('jenkins-build-3')).toHaveAttribute('data-status', 'SUCCESS', { timeout: 10_000 });
        await expect(page.getByTestId('jenkins-mission-add-deploy')).toHaveAttribute('data-done', 'true');
        await expect(page.getByTestId('jenkins-mission-back-to-green')).toHaveAttribute('data-done', 'true');

        // 4) agent satırı silinmiş dosya → gerçekçi derleme hatası (build koşmaz)
        await editor.fill(FIXED_WITH_DEPLOY.replace('agent any', ''));
        await page.getByTestId('jenkins-sandbox-build').click();
        await expect(page.getByTestId('jenkins-console')).toContainText('Missing required section "agent"', { timeout: 10_000 });
        await expect(page.getByTestId('jenkins-build-4')).toHaveAttribute('data-status', 'FAILURE');

        await context.close();
    });

    test('/jenkins — EN modda görev metinleri İngilizce render edilir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/jenkins');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByTestId('language-toggle').getByRole('button', { name: 'ENG' }).click();
        await page.getByRole('button', { name: /Pipeline/ }).first().click();

        await expect(page.getByTestId('jenkins-mission-first-green')).toContainText('Run the Jenkinsfile as-is');

        await context.close();
    });
});
