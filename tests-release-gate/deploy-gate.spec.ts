import { test, expect } from '@playwright/test';
import { ROUTE_SEO, LOCALES, seoFor, localizedPath, canonicalUrl } from '../src/utils/seo.js';

// DEPLOY.md §9 "Yayın kapısı" — daha önce elle, curl ile koşulan kontrollerin
// otomatik karşılığı. Bu dosya gerçek `dist/` çıktısına karşı GERÇEK bir HTTP
// sunucusu (vite preview, playwright.release-gate.config.ts) üzerinden koşar.
//
// NEDEN AYRI BİR KATMAN: `tests/seo-phase2-coverage.spec.ts` dist dosyalarını
// DOSYA SİSTEMİNDEN okur (`readFile('dist/...')`) — bu, sunucunun HTTP
// davranışını (örn. trailing-slash çözümü) test ETMEZ. `tests/seo-i18n-routing.spec.ts`
// ise `npm run dev` üzerinden HİDRATE OLMUŞ uygulamayı test eder — ilk, JS
// çalışmadan önceki ham HTML'i göremez. Gerçek bir keşif buradan çıktı: `vite
// preview`, sonda `/` olmadan bir alt-route istendiğinde (`localhost:4173/selenium`)
// o route'un shell'ini BULAMIYOR ve sessizce KÖK `dist/index.html`'e (ana sayfa,
// hep TR) düşüyor — 404 vermeden, 200 ile. DEPLOY.md'nin kendi doğrulama
// komutları bu yüzden yanlış sonuç veriyordu (bkz. DEPLOY.md §9.0 uyarısı).
// Bu suite tam olarak o katmanı — HTTP üzerinden servis edilen ham shell'i —
// test eder ki bu regresyon bir daha sessizce geri gelmesin.

const PUBLIC_ROUTES = ROUTE_SEO.filter((r) => !r.noindex && !r.dynamic).map((r) => r.path);

// Detaylı içerik kontrolleri (title/hreflang/canonical/F1/F2) için küçük, temsili
// bir küme — TÜM 40 route'u bu kadar ayrıntıyla koşmak süreyi gereksiz uzatır;
// A5 (hash yönlendirme) zaten TÜM route'ları kapsıyor (aşağıda).
const SAMPLE_ROUTES: { path: string; keyword: string }[] = [
    { path: '/', keyword: 'LearnQA' },
    { path: '/selenium', keyword: 'Selenium' },
    { path: '/git-github', keyword: 'Git' },
    { path: '/portfolio', keyword: 'Portfolyo' },
    { path: '/docker', keyword: 'Docker' },
];

function stripTags(html: string): string {
    return html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

test.describe('Yayın kapısı — A5: eski hash URL yönlendirmesi (TÜM herkese açık sayfalar)', () => {
    for (const route of PUBLIC_ROUTES) {
        test(`#${route} → ${route} (hash düşüyor, sayfa açılıyor)`, async ({ page }) => {
            await page.goto(`/#${route}`);
            await page.waitForFunction(
                (expected) => !window.location.hash && window.location.pathname === expected,
                route,
                { timeout: 10_000 },
            );
            await expect(page).toHaveURL(new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));
            await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });
        });
    }
});

test.describe('Yayın kapısı — A1/A6: HTTP üzerinden servis edilen shell doğru dilde', () => {
    for (const { path: routePath } of SAMPLE_ROUTES) {
        for (const locale of LOCALES) {
            test(`${localizedPath(routePath, locale)}/ — title + lang doğru`, async ({ request, baseURL }) => {
                const url = `${baseURL}${localizedPath(routePath, locale)}/`;
                const res = await request.get(url);
                expect(res.status(), `${url} 200 dönmeli`).toBe(200);
                const html = await res.text();

                const expected = seoFor(ROUTE_SEO.find((r) => r.path === routePath)!, locale);
                expect(html, `${url} beklenen title'ı içermeli`).toContain(`<title>${expected.title}`);

                const langMatch = html.match(/<html lang="([^"]*)"/);
                expect(langMatch?.[1], `${url} lang="${locale}" olmalı`).toBe(locale);
            });
        }
    }
});

test.describe('Yayın kapısı — A7: hreflang üçlüsü HTTP üzerinden doğru', () => {
    for (const { path: routePath } of SAMPLE_ROUTES) {
        test(`${routePath} — tr/en/x-default üçü de var ve doğru URL'e işaret ediyor`, async ({ request, baseURL }) => {
            const res = await request.get(`${baseURL}${routePath}/`);
            const html = await res.text();
            const tags = [...html.matchAll(/hreflang="([^"]*)" href="([^"]*)"/g)].map((m) => ({ hreflang: m[1], href: m[2] }));

            const tr = tags.find((t) => t.hreflang === 'tr');
            const en = tags.find((t) => t.hreflang === 'en');
            const xd = tags.find((t) => t.hreflang === 'x-default');

            expect(tr?.href, 'tr hreflang eksik').toBe(canonicalUrl(localizedPath(routePath, 'tr')));
            expect(en?.href, 'en hreflang eksik').toBe(canonicalUrl(localizedPath(routePath, 'en')));
            expect(xd, 'x-default hreflang eksik').toBeTruthy();
            expect(xd?.href.startsWith('https://learnqa.dev/'), 'hreflang href mutlak olmalı').toBe(true);
        });
    }
});

test.describe('Yayın kapısı — D3: canonical HTTP üzerinden sayfanın kendi diline işaret ediyor', () => {
    for (const { path: routePath } of SAMPLE_ROUTES) {
        for (const locale of LOCALES) {
            test(`${localizedPath(routePath, locale)}/ — canonical kendi URL'ini gösteriyor`, async ({ request, baseURL }) => {
                const url = `${baseURL}${localizedPath(routePath, locale)}/`;
                const res = await request.get(url);
                const html = await res.text();
                const match = html.match(/rel="canonical" href="([^"]*)"/);
                expect(match?.[1]).toBe(canonicalUrl(localizedPath(routePath, locale)));
            });
        }
    }
});

test.describe('Yayın kapısı — F1: derin bağlantıda sert yenileme çalışıyor', () => {
    test('/en/git-github/ aç, sert yenile (F5), sayfa gelmeye devam ediyor', async ({ page }) => {
        await page.goto('/en/git-github/');
        await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });

        await page.reload();
        await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });
});

test.describe('Yayın kapısı — F2: shell gövdesi JS kapalı bir crawler için anlamlı içerik gösteriyor', () => {
    for (const { path: routePath, keyword } of SAMPLE_ROUTES) {
        test(`${routePath}/ — ham HTML'de "Loading" değil, gerçek konu anlatımı var`, async ({ request, baseURL }) => {
            const res = await request.get(`${baseURL}${routePath}/`);
            const text = stripTags(await res.text());

            expect(text.length, 'shell gövdesi boş/çok kısa — üretim bozuk olabilir').toBeGreaterThan(800);
            expect(text, `beklenen konu anahtar kelimesi ("${keyword}") yok`).toContain(keyword);
            expect(text.toLowerCase()).not.toMatch(/^\s*(loading|yükleniyor)\.*\s*$/);
        });
    }
});

test.describe('Yayın kapısı — A8: bilinmeyen /en yolu çökmüyor, ham sunucu hatası vermiyor', () => {
    test('/en/olmayan-bir-sayfa-xyz/ — 200 dönüyor, JS hatası yok', async ({ page, request, baseURL }) => {
        // NOT: şu an gerçek bir "sayfa bulunamadı" arayüzü YOK (React Router'da
        // wildcard route tanımlı değil) — bu test yalnızca DEPLOY.md A8'in
        // asgari barını doğrular: ham sunucu hatası (5xx) veya JS çökmesi yok.
        // Gerçek bir 404 deneyimi eklemek ayrı bir üründen kararı, bu suite'in
        // kapsamı değil.
        const res = await request.get(`${baseURL}/en/olmayan-bir-sayfa-xyz/`);
        expect(res.status(), 'ham sunucu hatası (5xx) vermemeli').toBeLessThan(500);

        const errors: string[] = [];
        page.on('pageerror', (e) => errors.push(String(e)));
        await page.goto('/en/olmayan-bir-sayfa-xyz/');
        await page.waitForTimeout(1000);
        expect(errors, 'JS çökmesi (pageerror) olmamalı').toEqual([]);
    });
});
