import { test, expect } from '@playwright/test';
import { beginnerAlgorithmsData } from '../src/data/beginnerAlgorithmsData.js';
import { whatIsTestingData } from '../src/data/whatIsTestingData.js';

// Ders bitirme rozeti (ürün kararı 2026-07-19): başlangıç derslerinde kullanıcı
// her bölümde ilerlemesini görebilmeli; son bölümün altında tüm bölümler bitince
// "bu dersi bitirdin" rozeti açılmalı ve route kariyer haritasına işlenmeli
// (learnqa_completed_routes — anonim, login gerekmez). Bileşen: LessonFinishBadge.
// /algorithms deterministik "Bu bölümü tamamladım" butonlarıyla UÇTAN UCA test
// edilir; /manual-testing (oyun-tabanlı tamamlama) ve /what-is-testing (TopicPage
// sekme-tabanlı) için rozetin render/progress durumu doğrulanır.
test.describe('Ders bitirme rozeti — bölüm ilerlemesi + bitirme kutlaması', () => {
    test('/algorithms — tüm bölümler tamamlanınca rozet "done" olur ve route kariyer haritasına işlenir', async ({ page }) => {
        // Büyük modül: ilk derlemede yavaş olabilir (bkz. other-pages-ui.spec.ts notu)
        test.setTimeout(120_000);
        // Nöro-Optimizasyon Modu /algorithms'da VARSAYILAN AÇIK ve ders kartlarını
        // recall-kilidi overlay'i ile örter (bilinçli tasarım) — tamamlama butonuna
        // deterministik erişim için testte kapatılır (gerçek kullanıcı toggle'ı ile aynı).
        await page.addInitScript(() => {
            window.localStorage.setItem('algorithms_neuro_mode', 'false');
        });
        await page.goto('/algorithms');
        await page.waitForSelector('h1', { timeout: 60_000 });

        const badge = page.getByTestId('lesson-finish-badge');
        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toHaveAttribute('data-state', 'progress');

        for (const lesson of beginnerAlgorithmsData.tr.lessons) {
            const btn = page.getByTestId(`complete-section-${lesson.id}`);
            await btn.scrollIntoViewIfNeeded();
            await btn.click();
            await expect(btn).toContainText('✓');
        }

        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toHaveAttribute('data-state', 'done');
        await expect(badge).toContainText('bitirdin');

        // Anonim kariyer haritası kaydı: route learnqa_completed_routes'a düşmüş olmalı.
        const routes = await page.evaluate(() => JSON.parse(localStorage.getItem('learnqa_completed_routes') || '[]'));
        expect(routes).toContain('/algorithms');
    });

    test('/manual-testing — rozet ilerleme durumunda render olur (0/6 + ilerleme çubuğu)', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/manual-testing');
        await page.waitForSelector('h1', { timeout: 60_000 });

        const badge = page.getByTestId('lesson-finish-badge');
        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toHaveAttribute('data-state', 'progress');
        await expect(badge).toContainText('0/6');
    });

    test('/what-is-testing — TopicPage son sekmesinin altında rozet görünür', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/what-is-testing');
        await page.waitForSelector('h1', { timeout: 60_000 });

        // Son sekmeye sidebar'dan geç (sekme butonları title={tab} taşır).
        const tabs = whatIsTestingData.tr.tabs;
        await page.locator(`button[title="${tabs[tabs.length - 1]}"]`).click();

        const badge = page.getByTestId('lesson-finish-badge');
        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toBeVisible();
        await expect(badge).toHaveAttribute('data-state', 'progress');
    });
});
