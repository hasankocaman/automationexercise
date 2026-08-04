import { test, expect } from '@playwright/test';
import { waitForAppReady } from './helpers/app-ready';

// Kavram Tooltip'i Rehber Karakteri (challenge-first-experience-plan.md §3.6.4,
// kullanıcı talebi 2026-07-31) — sevimli bir maskot, sadece 3 giriş sayfasında
// (Test Nedir, Manuel Test, Algoritma Temelleri) sabit köşede durur, tıklanınca
// Kavram Tooltip'i özelliğini anlatan bir konuşma balonu açar. TopicPage.jsx'e
// DOKUNULMADI (onlarca sayfada paylaşılır) — her sayfanın KENDİ wrapper
// component'ine (WhatIsTestingPage/ManualTestingPage/AlgorithmsPage) eklendi.
//
// Konum notu: sol kenar dikey-orta (position: fixed, left, top:50%) — App.jsx'te
// GLOBAL render edilen ChatWidget (bottom-20 left-4) ve CommentsWidget
// (bottom-20 right-4) ile TopicPage'in 🏠/📍 butonlarından (bottom-4 right-*)
// kasıtlı olarak uzak tutuldu (ilk sürüm sol-alt köşedeydi, ChatWidget'la
// çakışma bulunup düzeltildi — bkz. plan §3.6.4).
//
// Dikkat çekme davranışı (kullanıcı talebi, 2026-07-31): rozet İLK tıklamaya
// kadar sürekli yanıp söner (`tooltipGuideAttention`), ilk tıklamadan SONRA
// kalıcı olarak durur ve normal boyutuna döner. ÖNEMLİ: buton sürekli pulse
// ettiğinden Playwright'ın "stable" actionability kontrolü İLK tıklamadan
// önce asla geçmez (element hiç durağanlaşmıyor) — bu YÜZDEN ilk tıklama
// `{ force: true }` ile yapılır (gerçek kullanıcı tıklaması bundan etkilenmez,
// tarayıcı olayı anında iletir; bu sadece test-tooling'in katı bekleme
// davranışını atlatır, fonksiyonel bir sorunu maskelemez).

const BEGINNER_PAGES = ['/what-is-testing', '/manual-testing', '/algorithms'];

test.describe('Kavram Tooltip\'i rehber karakteri (mascot)', () => {
    for (const url of BEGINNER_PAGES) {
        test(`${url} — rozet görünür, tıklayınca balon açılır/kapanır`, async ({ page }) => {
            test.setTimeout(60_000);
            await page.goto(url);
            await waitForAppReady(page, { timeout: 30_000 });

            const badge = page.getByTestId('tooltip-guide-badge');
            await expect(badge).toBeVisible();

            // Balon başlangıçta kapalı.
            await expect(page.getByTestId('tooltip-guide-bubble')).toHaveCount(0);

            // Tıklayınca açılır, içeriği boş olmamalı. (İlk tıklama sırasında
            // rozet hâlâ yanıp söndüğü için force:true — yukarıdaki not.)
            await badge.click({ force: true });
            const bubble = page.getByTestId('tooltip-guide-bubble');
            await expect(bubble).toBeVisible();
            const text = await bubble.innerText();
            expect(text.length).toBeGreaterThan(10);

            // ✕ ile kapanır.
            await page.getByTestId('tooltip-guide-close').click();
            await expect(page.getByTestId('tooltip-guide-bubble')).toHaveCount(0);

            // Tekrar tıklayınca açılıp kapanabilmeli (toggle) — animasyon artık
            // durduğu için normal (force'suz) tıklama yeterli.
            await badge.click();
            await expect(page.getByTestId('tooltip-guide-bubble')).toBeVisible();
            await badge.click();
            await expect(page.getByTestId('tooltip-guide-bubble')).toHaveCount(0);
        });
    }

    test('kapsam dışı bir sayfada (/selenium) hiç görünmez', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto('/selenium');
        await waitForAppReady(page, { timeout: 30_000 });
        await expect(page.getByTestId('tooltip-guide-badge')).toHaveCount(0);
    });

    test('/what-is-testing — global ChatWidget ile çakışmıyor', async ({ page }) => {
        test.setTimeout(30_000);
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto('/what-is-testing');
        await waitForAppReady(page, { timeout: 30_000 });

        const mascotBox = await page.getByTestId('tooltip-guide-badge').boundingBox();
        const chatWidgetBox = await page.locator('.fixed.bottom-20.left-4').first().boundingBox();
        expect(mascotBox).toBeTruthy();
        expect(chatWidgetBox).toBeTruthy();

        // Dikey aralarında çakışma OLMAMALI (bounding box'lar kesişmemeli).
        const mascotBottom = mascotBox!.y + mascotBox!.height;
        const chatWidgetTop = chatWidgetBox!.y;
        const noOverlap = mascotBottom < chatWidgetBox!.y || mascotBox!.y > chatWidgetTop + chatWidgetBox!.height;
        expect(noOverlap, 'mascot ve ChatWidget dikey olarak çakışmamalı').toBe(true);
    });

    test('/what-is-testing — ilk tıklamaya kadar yanıp söner, sonra kalıcı olarak durur', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto('/what-is-testing');
        await waitForAppReady(page, { timeout: 30_000 });
        const badge = page.getByTestId('tooltip-guide-badge');
        await expect(badge).toBeVisible();

        // Sayfa açılışında animasyon ÇALIŞIYOR olmalı.
        const animBefore = await badge.evaluate((el) => getComputedStyle(el).animationName);
        expect(animBefore).toBe('tooltipGuideAttention');

        // İlk tıklama (buton sürekli pulse ettiği için force:true).
        await badge.click({ force: true });

        // Tıklamadan SONRA animasyon KALICI olarak durmalı.
        const animAfterOpen = await badge.evaluate((el) => getComputedStyle(el).animationName);
        expect(animAfterOpen).toBe('none');

        // Balonu kapatınca da yeniden BAŞLAMAMALI.
        await page.getByTestId('tooltip-guide-close').click();
        const animAfterClose = await badge.evaluate((el) => getComputedStyle(el).animationName);
        expect(animAfterClose).toBe('none');

        // Normal boyutuna (44x44) dönmüş olmalı — kalıcı bir ölçek sapması yok.
        const box = await badge.boundingBox();
        expect(box!.width).toBeCloseTo(44, 0);
        expect(box!.height).toBeCloseTo(44, 0);
    });
});
