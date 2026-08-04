import { test, expect } from '@playwright/test';
import { stubPlausible, blockPlausible, recordedEvents } from './helpers/analytics';
import { waitForAppReady } from './helpers/app-ready';

// SEO Faz 2 / S3 — çerezsiz analytics olayları.
//
// `src/lib/analytics.js` bilinçli olarak "fire-and-forget": Plausible script'i
// yüklenmemişse (adblock, hesap henüz kurulmamış) sessizce no-op olur. Bu
// tasarım doğru ama TEST EDİLMEZSE tehlikeli — bir olay bağlantısı koparsa
// hiçbir hata çıkmaz, ölçüm sessizce durur ve kimse fark etmez.
//
// Bağlı 4 olaydan `language_changed` burada doğrulanır. Kalan üçü, aynı ağır
// akışı ikinci kez oynatmamak için MEVCUT akış testlerine bağlandı:
//   `mission_completed` → mission-flow.spec.ts
//   `sprint_closed`     → sprint-flow.spec.ts
//   `lesson_completed`  → lesson-completion.spec.ts

test.describe('S3 — çerezsiz analytics olayları', () => {
    test('dil değişimi `language_changed` olayını hedef dille birlikte gönderir', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await stubPlausible(page);

        await page.goto('/');
        await waitForAppReady(page, { timeout: 30_000 });

        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();
        await page.waitForURL(/\/en\/?$/, { timeout: 30_000 });

        const events = await recordedEvents(page);
        const langEvent = events.find((e) => e.name === 'language_changed');
        expect(langEvent, `language_changed gönderilmedi (gelen olaylar: ${JSON.stringify(events)})`).toBeTruthy();
        // Bu olay SEO Faz 2'nin en kritik ölçümü: /en varyantının gerçekten
        // kullanılıp kullanılmadığını yalnızca bu gösteriyor.
        expect(langEvent!.props.to).toBe('en');

        await context.close();
    });

    test('Plausible yüklenmemişken olay göndermek sayfayı KIRMAZ (no-op güvenliği)', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(e.message));

        await blockPlausible(page);
        await page.goto('/');
        await waitForAppReady(page, { timeout: 30_000 });
        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();
        await page.waitForURL(/\/en\/?$/, { timeout: 30_000 });

        await expect(page.locator('h1').first()).toBeVisible();
        expect(pageErrors, `analytics yokken sayfa hatası: ${pageErrors.join(' | ')}`).toHaveLength(0);

        await context.close();
    });

    test('kişisel veri sızıntısı yok — olay property\'leri e-posta/serbest metin taşımaz', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await stubPlausible(page);

        await page.goto('/');
        await waitForAppReady(page, { timeout: 30_000 });
        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();
        await page.waitForURL(/\/en\/?$/, { timeout: 30_000 });

        // `analytics.js`'in kırmızı çizgisi: kişisel veri ASLA property olamaz.
        const events = await recordedEvents(page);
        // Boş liste bu kontrolü anlamsız kılar — önce gerçekten olay olduğunu doğrula.
        expect(events.length, 'hiç olay kaydedilmedi, sızıntı kontrolü anlamsız olurdu').toBeGreaterThan(0);
        expect(JSON.stringify(events), 'olay property\'sinde e-posta benzeri veri var')
            .not.toMatch(/@[\w.-]+\.\w+/);

        await context.close();
    });
});
