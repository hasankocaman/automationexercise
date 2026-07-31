import { test, expect } from '@playwright/test';

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

const BEGINNER_PAGES = ['/what-is-testing', '/manual-testing', '/algorithms'];

test.describe('Kavram Tooltip\'i rehber karakteri (mascot)', () => {
    for (const url of BEGINNER_PAGES) {
        test(`${url} — rozet görünür, tıklayınca balon açılır/kapanır`, async ({ page }) => {
            test.setTimeout(60_000);
            await page.goto(url);
            await page.waitForSelector('h1', { timeout: 30_000 });

            const badge = page.getByTestId('tooltip-guide-badge');
            await expect(badge).toBeVisible();

            // Balon başlangıçta kapalı.
            await expect(page.getByTestId('tooltip-guide-bubble')).toHaveCount(0);

            // Tıklayınca açılır, içeriği boş olmamalı.
            await badge.click();
            const bubble = page.getByTestId('tooltip-guide-bubble');
            await expect(bubble).toBeVisible();
            const text = await bubble.innerText();
            expect(text.length).toBeGreaterThan(10);

            // ✕ ile kapanır.
            await page.getByTestId('tooltip-guide-close').click();
            await expect(page.getByTestId('tooltip-guide-bubble')).toHaveCount(0);

            // Tekrar tıklayınca açılıp kapanabilmeli (toggle).
            await badge.click();
            await expect(page.getByTestId('tooltip-guide-bubble')).toBeVisible();
            await badge.click();
            await expect(page.getByTestId('tooltip-guide-bubble')).toHaveCount(0);
        });
    }

    test('kapsam dışı bir sayfada (/selenium) hiç görünmez', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await expect(page.getByTestId('tooltip-guide-badge')).toHaveCount(0);
    });

    test('/what-is-testing — global ChatWidget ile çakışmıyor', async ({ page }) => {
        test.setTimeout(30_000);
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto('/what-is-testing');
        await page.waitForSelector('h1', { timeout: 30_000 });

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
});
