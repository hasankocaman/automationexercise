import { test, expect } from '@playwright/test';
import { SECTION_SLUGS } from '../src/data/generated/sectionSlugs.js';

// SEKME-SEVİYESİ URL'LER (Documents/seo-phase-3-plan.md §3)
//
// Her dikey sekme artık kendi adresine sahip: /selenium/wait-strategies.
// Bu, sitenin indekslenebilir yüzeyini 47 URL'den ~750'ye çıkaran değişikliktir
// ve iki sözleşmeye dayanır:
//   1. URL sekme için OTORİTEDİR (derin bağlantı doğru sekmeyi açar),
//   2. sekme değişimi adresi günceller (kullanıcı bulunduğu yeri paylaşabilir).
// Bu testler ikisini de korur; biri bozulursa Google'ın tarayıp indekslediği
// yüzlerce URL yanlış içeriğe düşer.

test.describe('Sekme URL\'leri — derin bağlantı', () => {
    test('sekme URL\'i doğrudan o sekmeyi açar', async ({ page }) => {
        await page.goto('/selenium/wait-strategies');

        await expect(page.getByRole('heading', { name: /Wait Stratejileri/ }).first()).toBeVisible();
        await expect(page).toHaveURL(/\/selenium\/wait-strategies$/);
    });

    test('sekme URL\'i sayfanın <title>\'ını da sekmeye göre günceller', async ({ page }) => {
        await page.goto('/sql/sql-joins');

        // Hub başlığı DEĞİL, bölümün kendi başlığı görünmeli — aksi hâlde 337
        // sekme URL'i aynı başlıkla indekslenir ve birbirini yer.
        await expect(page).toHaveTitle(/SQL JOIN/i);
        await expect(page).not.toHaveTitle(/İnteraktif Pratik/);
    });

    test('EN sekme URL\'i İngilizce açılır', async ({ page }) => {
        await page.goto('/en/selenium/wait-strategies');

        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        await expect(page.getByRole('heading', { name: /Wait Strategies/ }).first()).toBeVisible();
    });

    test('dil düğmesi bulunulan sekmede kalır', async ({ page }) => {
        await page.goto('/selenium/wait-strategies');

        await page.locator('[data-testid="language-toggle"] button', { hasText: 'ENG' }).click();
        await expect(page).toHaveURL(/\/en\/selenium\/wait-strategies$/);
        await expect(page.getByRole('heading', { name: /Wait Strategies/ }).first()).toBeVisible();
    });

    test('bilinmeyen slug hata vermez, dersin ilk sekmesine düşer', async ({ page }) => {
        await page.goto('/selenium/boyle-bir-bolum-yok');

        // Kendini onarır: adres hub'a döner, kullanıcı 404 görmez.
        await expect(page).toHaveURL(/\/selenium$/);
        await expect(page.getByRole('heading', { name: /Selenium Nedir/ }).first()).toBeVisible();
    });
});

test.describe('Sekme URL\'leri — gezinti', () => {
    test('sekmeye tıklamak adresi günceller', async ({ page }) => {
        await page.goto('/selenium');
        await expect(page).toHaveURL(/\/selenium$/);

        await page.locator('button[title$="Locators"]').first().click();
        await expect(page).toHaveURL(/\/selenium\/locators$/);
    });

    test('ilk sekme hub adresinde kalır (aynı içerik iki URL\'de indekslenmesin)', async ({ page }) => {
        await page.goto('/selenium/locators');
        await expect(page).toHaveURL(/\/selenium\/locators$/);

        await page.locator('button[title$="Giriş"]').first().click();
        await expect(page).toHaveURL(/\/selenium$/);
    });

    test('geri tuşu önceki sekmeye döner', async ({ page }) => {
        await page.goto('/selenium/locators');
        await page.goto('/selenium/wait-strategies');
        await expect(page.getByRole('heading', { name: /Wait Stratejileri/ }).first()).toBeVisible();

        await page.goBack();
        await expect(page).toHaveURL(/\/selenium\/locators$/);
        await expect(page.getByRole('heading', { name: /Locators/ }).first()).toBeVisible();
    });
});

// Tarayıcı açmayan sözleşme kontrolü: slug manifesti bozulursa yüzlerce URL
// sessizce çürür (Google indeksinde 404). Bu yüzden şekil burada da doğrulanır.
test.describe('Slug manifesti — yapı', () => {
    test('her slug tekil ve URL-güvenli', () => {
        for (const [routePath, entries] of Object.entries(SECTION_SLUGS)) {
            const slugs = entries.map((entry) => entry.slug);
            expect(new Set(slugs).size, `${routePath} içinde çakışan slug var`).toBe(slugs.length);

            for (const slug of slugs) {
                expect(slug, `${routePath} içinde geçersiz slug: ${slug}`).toMatch(/^[a-z0-9-]+$/);
            }
        }
    });

    test('en az 25 ders sayfası ve 300 bölüm kapsanıyor', () => {
        const pages = Object.keys(SECTION_SLUGS);
        const sections = Object.values(SECTION_SLUGS).reduce((sum, list) => sum + list.length, 0);

        expect(pages.length).toBeGreaterThanOrEqual(25);
        expect(sections).toBeGreaterThanOrEqual(300);
    });
});
