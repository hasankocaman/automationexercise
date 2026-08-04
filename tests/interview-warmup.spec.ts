import { test, expect } from '@playwright/test';
import { INTERVIEW_SHOWCASE } from '../src/data/generated/interviewShowcase.js';
import { interviewWarmupData } from '../src/data/interviewWarmupData.js';
import { waitForAppReady } from './helpers/app-ready';

// Ana sayfadaki "Mülakat Isınma Turu" — herkese açık, gate'siz soru-cevap bölümü.
//
// NEDEN KRİTİK: ders sayfalarındaki mülakat sekmesi %60 quiz barajının arkasında
// (bilinçli ürün kararı). Bu bölüm o içeriğin gate'siz, GÖRÜNÜR karşılığıdır ve
// ana sayfanın FAQPage şeması yalnızca buradaki metinden üretilir. Bölüm bozulur
// ya da gate'in arkasına düşerse şema görünmeyen içeriği işaret etmeye başlar —
// tam olarak kaçınmak için kurulduğu durum. Bu yüzden buradaki testler
// "kozmetik" değil, şema uyumunun canlı bekçisidir.

const tr = (val: any): string => (typeof val === 'string' ? val : val?.tr ?? val?.en ?? '');
const en = (val: any): string => (typeof val === 'string' ? val : val?.en ?? val?.tr ?? '');

test.describe('Ana sayfa — Mülakat Isınma Turu', () => {
    test('bölüm HİÇBİR ilerleme olmadan görünür ve tüm sorular okunabilir', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        // Temiz kullanıcı: hiç quiz çözülmemiş, hiç ders bitirilmemiş.
        await page.goto('/');
        await waitForAppReady(page, { timeout: 30_000 });

        const section = page.getByTestId('interview-warmup');
        await expect(section).toBeVisible();

        // Kartların TAMAMI render edilmeli — gate yok, örnekleme yok.
        const cards = page.getByTestId('warmup-card');
        await expect(cards).toHaveCount(INTERVIEW_SHOWCASE.length);

        // Sorular açılış anında GÖRÜNÜR olmalı (yalnızca cevap accordion arkasında).
        const questions = await page.getByTestId('warmup-question').allInnerTexts();
        for (const item of INTERVIEW_SHOWCASE) {
            expect(
                questions.some((q) => q.trim() === tr(item.q).trim()),
                `soru ekranda görünmüyor: "${tr(item.q).slice(0, 60)}..."`,
            ).toBe(true);
        }

        await context.close();
    });

    test('amaç açıklaması görünür: burası ısınma, asıl mülakat pratiği derslerin sonunda', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await page.goto('/');
        await waitForAppReady(page, { timeout: 30_000 });

        // Kullanıcının burayı "mülakat çalışması" sanmaması bilinçli bir ürün
        // gereğidir — açıklama sessizce kaldırılırsa bu test kırılır.
        const purpose = page.getByTestId('warmup-purpose');
        await expect(purpose).toBeVisible();
        await expect(purpose).toContainText(tr(interviewWarmupData.purposeTitle));
        await expect(purpose).toContainText(tr(interviewWarmupData.purposeBody).slice(0, 60));

        await context.close();
    });

    test('cevap açılıp kapanıyor ve metin gerçekten geliyor', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await page.goto('/');
        await waitForAppReady(page, { timeout: 30_000 });

        const first = page.getByTestId('warmup-card').first();
        const toggle = first.getByTestId('warmup-toggle');

        await expect(first.getByTestId('warmup-answer')).toHaveCount(0);
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');

        await toggle.click();
        const answer = first.getByTestId('warmup-answer');
        await expect(answer).toBeVisible();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        // İlk kartın cevabı, üretilen veriyle birebir aynı olmalı.
        await expect(answer).toContainText(tr(INTERVIEW_SHOWCASE[0].a).slice(0, 60));

        await toggle.click();
        await expect(first.getByTestId('warmup-answer')).toHaveCount(0);

        await context.close();
    });

    test('her kart kendi dersine götürüyor', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await page.goto('/');
        await waitForAppReady(page, { timeout: 30_000 });

        const firstRoute = INTERVIEW_SHOWCASE[0].route;
        const card = page.locator(`[data-testid="warmup-card"][data-route="${firstRoute}"]`).first();
        await expect(card.getByTestId('warmup-lesson-link')).toHaveAttribute('href', new RegExp(`${firstRoute}$`));

        await card.getByTestId('warmup-lesson-link').click();
        await expect(page).toHaveURL(new RegExp(`${firstRoute}$`));

        await context.close();
    });

    test('EN modda tamamen İngilizce (Türkçeye özgü karakter yok)', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await page.goto('/en');
        await waitForAppReady(page, { timeout: 30_000 });

        const section = page.getByTestId('interview-warmup');
        await expect(section).toBeVisible();

        // Tüm cevapları aç ki gizli metin de taransın.
        const toggles = page.getByTestId('warmup-toggle');
        const count = await toggles.count();
        for (let i = 0; i < count; i++) await toggles.nth(i).click();

        const text = await section.innerText();
        const match = text.match(/.{0,40}[ığşçöüİĞŞÇÖÜ].{0,40}/);
        expect(match?.[0] ?? null, `EN modda Türkçe sızıntısı: "${match?.[0]?.trim()}"`).toBeNull();

        // EN soruların gerçekten İngilizce varyant olduğunu doğrula.
        expect(text).toContain(en(INTERVIEW_SHOWCASE[0].q).slice(0, 50));

        await context.close();
    });

    test('üretilen veri sağlıklı: 12 soru, seviye çeşitliliği, iki dil dolu', async () => {
        expect(INTERVIEW_SHOWCASE.length, 'ısınma seti beklenmedik şekilde küçülmüş').toBeGreaterThanOrEqual(8);

        // Tek bir konudan çok soru gelmesi "karışık set" amacını bozar.
        const routes = new Set(INTERVIEW_SHOWCASE.map((i) => i.route));
        expect(routes.size, 'sorular yeterince farklı konudan gelmiyor').toBe(INTERVIEW_SHOWCASE.length);

        // Seviye çeşitliliği: yalnızca "basic" sorulardan oluşan bir set zayıf olur.
        const levels = new Set(INTERVIEW_SHOWCASE.map((i) => i.level));
        expect(levels.size, 'seviye çeşitliliği yok').toBeGreaterThanOrEqual(2);

        for (const item of INTERVIEW_SHOWCASE) {
            expect(item.q.tr.length, `${item.route}: TR soru boş`).toBeGreaterThan(0);
            expect(item.q.en.length, `${item.route}: EN soru boş`).toBeGreaterThan(0);
            expect(item.a.tr.length, `${item.route}: TR cevap boş`).toBeGreaterThan(0);
            expect(item.a.en.length, `${item.route}: EN cevap boş`).toBeGreaterThan(0);
            // Dil eşlemesi indeksle yapılıyor; EN alanına Türkçe düşerse eşleme kaymıştır.
            expect(`${item.q.en} ${item.a.en}`, `${item.route}: EN alanında Türkçe metin`)
                .not.toMatch(/[ığşçöüİĞŞÇÖÜ]/);
        }
    });
});
