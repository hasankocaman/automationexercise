import { test, expect } from '@playwright/test';
import { beginnerAlgorithmsData } from '../src/data/beginnerAlgorithmsData.js';
import { whatIsTestingData } from '../src/data/whatIsTestingData.js';
import { manualTestingData } from '../src/data/manualTestingData.js';
import { algorithmsData } from '../src/data/algorithmsData.js';

// Ders bitirme rozeti (ürün kararı 2026-07-19): başlangıç derslerinde kullanıcı
// her bölümde ilerlemesini görebilmeli; son bölümün altında tüm bölümler bitince
// "bu dersi bitirdin" rozeti açılmalı ve route kariyer haritasına işlenmeli
// (learnqa_completed_routes — anonim, login gerekmez). Bileşen: LessonFinishBadge.
// /algorithms ve /manual-testing bölüm quizleriyle UÇTAN UCA test edilir (quiz
// doğru cevaplanınca bölüm otomatik tamamlanır); /what-is-testing (TopicPage
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

        // Quiz-gating (ürün kararı 2026-07-21): bir bölüm ancak quiz'i doğru
        // cevaplanınca "tamamlandı" sayılır. Doğru şıkka tıklamak bölümü OTOMATİK
        // tamamlar (manuel butona artık gerek yok, buton quiz geçilmeden disabled).
        for (const lesson of beginnerAlgorithmsData.tr.lessons) {
            const section = page.locator(`#${lesson.id}`);
            const correctOption = section.getByTestId(`quiz-opt-${lesson.quiz.correct}`);
            await correctOption.scrollIntoViewIfNeeded();
            await correctOption.click();
            // Doğru cevap sonrası bölüm otomatik tamamlanır → buton ✓ gösterir
            const btn = page.getByTestId(`complete-section-${lesson.id}`);
            await expect(btn).toContainText('✓');
        }

        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toHaveAttribute('data-state', 'done');
        await expect(badge).toContainText('bitirdin');

        // Anonim kariyer haritası kaydı: route learnqa_completed_routes'a düşmüş olmalı.
        const routes = await page.evaluate(() => JSON.parse(localStorage.getItem('learnqa_completed_routes') || '[]'));
        expect(routes).toContain('/algorithms');
    });

    test('/manual-testing — her bölümün quizi doğru cevaplanınca rozet "done" olur', async ({ page }) => {
        test.setTimeout(120_000);
        await page.goto('/manual-testing');
        await page.waitForSelector('h1', { timeout: 60_000 });

        const badge = page.getByTestId('lesson-finish-badge');
        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toHaveAttribute('data-state', 'progress');
        await expect(badge).toContainText('0/6');

        // Quiz-gating (ürün kararı 2026-07-21): oyunları çözmeden de bitirmenin
        // güvenilir bir yolu olmalı — her bölümün quizi doğru cevaplanınca bölüm
        // OTOMATİK tamamlanır, son quiz ile rozet açılır.
        for (const lesson of manualTestingData.tr.lessons) {
            const section = page.locator(`#${lesson.id}`);
            const correctOption = section.getByTestId(`quiz-opt-${lesson.quiz.correct}`);
            await correctOption.scrollIntoViewIfNeeded();
            await correctOption.click();
            // Doğru cevap → bölüm tamamlandı rozeti kartın başında görünür
            await expect(section.getByText(manualTestingData.tr.ui.complete, { exact: true })).toBeVisible();
        }

        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toHaveAttribute('data-state', 'done');

        const routes = await page.evaluate(() => JSON.parse(localStorage.getItem('learnqa_completed_routes') || '[]'));
        expect(routes).toContain('/manual-testing');
    });

    // /advanced-algorithms OPSİYONEL bir derstir (ürün kararı 2026-07-21): sayfanın
    // başında "bitirmek zorunda değilsin" notu durur ve hiçbir bölüm başka bir dersi
    // kilitlemez. Quiz, tamamlamayı zorunlu kılmaz — sadece kolay bir yol sunar.
    test('/advanced-algorithms — opsiyonel ders notu görünür ve quiz bölümü otomatik tamamlar', async ({ page }) => {
        test.setTimeout(120_000);
        // Nöro-Optimizasyon Modu bölüm içeriğini recall-kilidi overlay'i ile örter
        // (bilinçli tasarım) — quize deterministik erişim için kapatılır.
        await page.addInitScript(() => {
            window.localStorage.setItem('advanced_algorithms_neuro_mode', 'false');
        });
        await page.goto('/advanced-algorithms');
        await page.waitForSelector('h1', { timeout: 60_000 });

        const note = page.getByTestId('optional-lesson-note');
        await expect(note).toBeVisible();
        await expect(note).toContainText('zorunda degilsin');

        // İlk bölümün quizini doğru cevapla → tamamlandı checkbox'ı otomatik işaretlenir
        const section = page.locator('#intro');
        const quiz = algorithmsData.tr.sections[0].quiz;
        await section.getByTestId(`quiz-opt-${quiz.correct}`).scrollIntoViewIfNeeded();
        await section.getByTestId(`quiz-opt-${quiz.correct}`).click();
        await section.getByRole('button', { name: algorithmsData.tr.page.answer }).click();

        await expect(section.locator('input[type="checkbox"]')).toBeChecked();
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
