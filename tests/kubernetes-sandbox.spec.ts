import { test, expect } from '@playwright/test';

// CP5.3 (contentplan.md) — Kubernetes Sandbox rollout: Docker/Linux/Git'ten
// farklı olarak sayfada hiç gerçek bir kubectl terminali yoktu — sadece pasif
// "▶ çalıştır" canned demoları vardı (renderK8sPodPlayground). Bu oturumda
// CP1'deki Docker Sandbox mimarisiyle aynı desende (durum-makineli motor,
// kullanıcı komutu kendi yazar) sıfırdan bir KubernetesSandboxBlock yazıldı.
// Kubernetes'e özgü öğretici an: bir pod silinince deployment'a bağlıysa
// otomatik yeniden oluşturulur (self-healing) — Docker'da bunun karşılığı yok.
// serviceWorkers: 'block' — bilinen MSW tuzağı (bkz. docker-sandbox.spec.ts).

test.describe('CP5.3 — Kubernetes Sandbox (interaktif kubectl terminali)', () => {
    test('/kubernetes — apply/get/scale/logs/delete akışı: motor paneli, self-healing ve görevler canlı güncellenir', async ({ browser }) => {
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/kubernetes');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByRole('button', { name: /kubectl Komutları/ }).first().click();

        const input = page.getByTestId('k8s-sandbox-input');
        await expect(input).toBeVisible();

        // 1) apply — bilinmeyen dosya → gerçekçi hata
        await input.fill('kubectl apply -f unknown.yaml');
        await input.press('Enter');
        await expect(page.getByTestId('k8s-sandbox')).toContainText('does not exist');

        // 2) apply deployment.yaml — deployment + pod paneli dolmalı, görev tamamlanmalı
        await input.fill('kubectl apply -f deployment.yaml');
        await input.press('Enter');
        await expect(page.getByTestId('k8s-deployment-nginx-deployment')).toBeVisible();
        await expect(page.getByTestId('k8s-mission-apply-deployment')).toHaveAttribute('data-done', 'true');

        // 3) get pods — görev tamamlanmalı
        await input.fill('kubectl get pods');
        await input.press('Enter');
        await expect(page.getByTestId('k8s-mission-get-pods')).toHaveAttribute('data-done', 'true');

        // 4) scale — 5 replikaya çıkmalı, görev tamamlanmalı
        await input.fill('kubectl scale deployment nginx-deployment --replicas=5');
        await input.press('Enter');
        await expect(page.getByTestId('k8s-deployment-nginx-deployment')).toContainText('(5/5)');
        await expect(page.getByTestId('k8s-mission-scale-up')).toHaveAttribute('data-done', 'true');

        // 5) logs — bir pod adını panelden al, logs çalıştır, görev tamamlanmalı
        const firstPodTestId = await page.locator('[data-testid^="k8s-pod-nginx-deployment-"]').first().getAttribute('data-testid');
        const podName = firstPodTestId!.replace('k8s-pod-', '');
        await input.fill(`kubectl logs ${podName}`);
        await input.press('Enter');
        await expect(page.getByTestId('k8s-sandbox')).toContainText('ready to accept connections');
        await expect(page.getByTestId('k8s-mission-logs-viewed')).toHaveAttribute('data-done', 'true');

        // 6) delete pod — self-healing ipucu + görev tamamlanmalı, birkaç saniye sonra yeni pod otomatik gelir
        await input.fill(`kubectl delete pod ${podName}`);
        await input.press('Enter');
        await expect(page.getByTestId('k8s-sandbox')).toContainText('self-healing');
        await expect(page.getByTestId('k8s-mission-self-heal')).toHaveAttribute('data-done', 'true');
        // Sayfa varsayılan TR modda açıldığı için self-heal mesajı Türkçe render edilir
        // ("ReplicaSet controller" iki dilde de ortak) — birkaç saniye içinde deployment
        // yeniden 5/5'e dönmeli (silinen pod otomatik yerine konmalı).
        await expect(page.getByTestId('k8s-sandbox')).toContainText('ReplicaSet controller', { timeout: 5_000 });
        await expect(page.getByTestId('k8s-deployment-nginx-deployment')).toContainText('(5/5)', { timeout: 5_000 });

        // Hatalı komut → gerçekçi hata
        await input.fill('kubectl rollout status');
        await input.press('Enter');
        await expect(page.getByTestId('k8s-sandbox')).toContainText('unknown command');

        await context.close();
    });

    test('/kubernetes — EN modda görev metinleri İngilizce render edilir', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/kubernetes');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByTestId('language-toggle').getByRole('button', { name: 'ENG' }).click();
        await page.getByRole('button', { name: /kubectl Commands/ }).first().click();

        await expect(page.getByTestId('k8s-mission-apply-deployment')).toContainText('Apply deployment.yaml');

        await context.close();
    });
});
