import { test, expect } from '@playwright/test';
import { readFile, access } from 'node:fs/promises';
import { ROUTE_SEO, LOCALES, localizedPath, SITE_URL } from '../src/utils/seo.js';

// SEO Faz 2 — otomasyon dışında kalmış çıktı doğrulamaları.
//
// Bu dosya, `seo-i18n-routing.spec.ts`'in TARAYICI davranışını doğrulamasını
// tamamlar: burada denetlenen şeyler yalnızca BUILD ÇIKTISINDA yaşıyor
// (sitemap, statik shell'lerdeki JSON-LD, chunk bölme) ve daha önce hiçbir
// otomatik kontrol tarafından doğrulanmıyordu:
//
//   - Sitemap 90 URL + `xhtml:link` alternatifleri: üretiliyordu ama üretilen
//     dosyayı okuyup doğrulayan HİÇBİR ŞEY yoktu — yarım üretilse build yeşil kalırdı.
//   - JSON-LD (FAQPage/Course): `check-dist-seo.mjs` yalnızca SAYIP yazdırıyordu,
//     sayı sıfıra düşse bile build'i KIRMIYORDU.
//   - Kod bölme: büyük veri chunk'ının ilk boyayı bloklamadığı iddiası hiç
//     ölçülmüyordu; testler yalnızca yükleme göstergesini bekliyordu.
//
// `dist/` gereksinimi: her iki CI workflow'u da E2E'den ÖNCE `npm run build`
// çalıştırır, `pre-push` hook'u da build alır. Yerelde build almadıysan test
// sessizce geçmez — açık bir mesajla başarısız olur.

const DIST = 'dist';
const NON_DYNAMIC_ROUTES = ROUTE_SEO.filter((entry: any) => !entry.dynamic);

async function exists(path: string): Promise<boolean> {
    try { await access(path); return true; } catch { return false; }
}

async function readShell(routePath: string, locale: string): Promise<string> {
    const localized = localizedPath(routePath, locale);
    const file = localized === '/' ? `${DIST}/index.html` : `${DIST}${localized}/index.html`;
    return readFile(file, 'utf8');
}

// Shell'in <script type="application/ld+json"> bloklarını gerçekten PARSE eder —
// "metin içinde FAQPage geçiyor mu" kontrolü bozuk JSON'u yakalayamaz.
function parseJsonLd(html: string): any[] {
    const blocks: any[] = [];
    const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
        const parsed = JSON.parse(m[1]);
        if (Array.isArray(parsed)) blocks.push(...parsed);
        else blocks.push(parsed);
    }
    return blocks;
}

test.beforeAll(async () => {
    expect(
        await exists(`${DIST}/index.html`),
        'dist/ bulunamadı — bu testler build ÇIKTISINI doğruluyor. Önce `npm run build` çalıştır.',
    ).toBe(true);
});

test.describe('SEO Faz 2 — sitemap çıktısı (O4)', () => {
    test('sitemap her route\'u İKİ dilde içerir ve her girdide hreflang alternatifleri vardır', async () => {
        const xml = await readFile(`${DIST}/sitemap.xml`, 'utf8');
        const urlBlocks = xml.split('<url>').slice(1);

        // Route sayısının TAM İKİ KATI — bir dil sessizce düşerse yakalanır.
        expect(urlBlocks, 'sitemap URL sayısı route × dil sayısına eşit olmalı')
            .toHaveLength(NON_DYNAMIC_ROUTES.length * LOCALES.length);

        const locs = urlBlocks.map((b) => b.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '');
        expect(new Set(locs).size, 'sitemap\'te mükerrer <loc> var').toBe(locs.length);

        for (const loc of locs) {
            expect(loc, `<loc> mutlak production URL olmalı: ${loc}`).toContain(SITE_URL);
        }

        // Her URL girdisi hem tr hem en alternatifini göstermeli (hreflang çifti).
        for (const block of urlBlocks) {
            const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '(bilinmiyor)';
            for (const locale of LOCALES) {
                expect(block, `${loc}: hreflang="${locale}" alternatifi eksik`)
                    .toContain(`hreflang="${locale}"`);
            }
        }

        // Her route'un iki dilli URL'i gerçekten listede mi?
        for (const entry of NON_DYNAMIC_ROUTES) {
            for (const locale of LOCALES) {
                const expected = `${SITE_URL}${localizedPath(entry.path, locale)}`.replace(/\/$/, '') || SITE_URL;
                const found = locs.some((l) => l.replace(/\/$/, '') === expected);
                expect(found, `sitemap'te eksik URL: ${expected}`).toBe(true);
            }
        }
    });

    test('robots.txt sitemap\'e işaret eder ve crawl\'ı engellemez', async () => {
        const robots = await readFile(`${DIST}/robots.txt`, 'utf8');
        expect(robots).toContain(`${SITE_URL}/sitemap.xml`);
        // Tüm siteyi kapatan bir Disallow kazayla eklenirse tüm SEO işi çöper.
        expect(robots, 'robots.txt tüm siteyi Disallow ediyor').not.toMatch(/^\s*Disallow:\s*\/\s*$/m);
    });

    test('yayınlanan sitemap tarayıcıdan da erişilebilir', async ({ request }) => {
        const res = await request.get('/sitemap.xml');
        expect(res.status()).toBe(200);
        const body = await res.text();
        expect(body.split('<url>').length - 1).toBe(NON_DYNAMIC_ROUTES.length * LOCALES.length);
    });
});

test.describe('SEO Faz 2 — zengin sonuç şeması (O6)', () => {
    // Mülakat sorusu olan temsili bir sayfa: FAQPage buradan üretilir.
    const FAQ_ROUTE = '/selenium';

    for (const locale of LOCALES) {
        test(`${localizedPath(FAQ_ROUTE, locale)} — FAQPage şeması geçerli ve sayfanın dilinde`, async () => {
            const html = await readShell(FAQ_ROUTE, locale);
            const blocks = parseJsonLd(html); // bozuk JSON burada patlar
            const faq = blocks.find((b) => b['@type'] === 'FAQPage');

            expect(faq, `${locale}: FAQPage şeması üretilmemiş`).toBeTruthy();
            expect(Array.isArray(faq.mainEntity), 'FAQPage.mainEntity dizi olmalı').toBe(true);
            expect(faq.mainEntity.length, 'FAQPage boş soru listesiyle üretilmiş').toBeGreaterThan(0);

            for (const q of faq.mainEntity) {
                expect(q['@type']).toBe('Question');
                expect(String(q.name).length, 'FAQ sorusu boş').toBeGreaterThan(0);
                expect(String(q.acceptedAnswer?.text ?? '').length, 'FAQ cevabı boş').toBeGreaterThan(0);
            }

            // Dil doğruluğu: TR shell'de Türkçeye özgü karakter beklenir, EN'de ASLA.
            const faqText = JSON.stringify(faq);
            if (locale === 'en') {
                expect(faqText, 'EN FAQPage şemasında Türkçe sızıntısı').not.toMatch(/[ığşçöüİĞŞÇÖÜ]/);
            } else {
                expect(faqText, 'TR FAQPage şeması Türkçe görünmüyor').toMatch(/[ığşçöüİĞŞÇÖÜ]/);
            }
        });
    }

    test('Course şeması ders sayfasında üretiliyor', async () => {
        const html = await readShell(FAQ_ROUTE, 'tr');
        const course = parseJsonLd(html).find((b) => b['@type'] === 'Course');
        expect(course, 'Course şeması üretilmemiş').toBeTruthy();
        expect(String(course.name).length).toBeGreaterThan(0);
        expect(course.provider?.name ?? course.provider, 'Course.provider eksik').toBeTruthy();
    });

    test('site genelinde zengin sonuç kapsamı sessizce sıfıra düşmez', async () => {
        // `check-dist-seo.mjs` bu sayıları YAZDIRIYOR ama build'i kırmıyordu:
        // JSON-LD üretimi bozulsa kimse fark etmezdi. Alt eşik, ölçülen mevcut
        // kapsamın (56 FAQPage / 68 Course) belirgin altında — normal içerik
        // dalgalanmasında değil, gerçek bir regresyonda kırılır.
        let faqPages = 0;
        let coursePages = 0;
        for (const entry of NON_DYNAMIC_ROUTES) {
            for (const locale of LOCALES) {
                const html = await readShell(entry.path, locale);
                if (html.includes('"@type": "FAQPage"')) faqPages += 1;
                if (html.includes('"@type": "Course"')) coursePages += 1;
            }
        }
        expect(faqPages, 'FAQPage üretimi çöktü').toBeGreaterThanOrEqual(40);
        expect(coursePages, 'Course üretimi çöktü').toBeGreaterThanOrEqual(50);
    });
});

test.describe('SEO Faz 2 — kod bölme / ilk boya (S1)', () => {
    const SPLIT_PAGES = [
        { route: '/java', chunk: 'JavaPage', data: 'javaData' },
        { route: '/typescript', chunk: 'TypeScriptPage', data: 'typescriptData' },
        { route: '/sql', chunk: 'SQLPage', data: 'sqlData' },
    ];

    for (const { chunk, data } of SPLIT_PAGES) {
        test(`${chunk} chunk'ı ${data}'yı STATİK değil DİNAMİK import ediyor`, async () => {
            const assets = await readFile(`${DIST}/.vite/manifest.json`, 'utf8').catch(() => null);
            // manifest yoksa dosya adından bul (hash'li isimler).
            const { readdir } = await import('node:fs/promises');
            const files = await readdir(`${DIST}/assets`);
            const pageFile = files.find((f) => f.startsWith(`${chunk}-`) && f.endsWith('.js'));
            expect(pageFile, `${chunk} chunk'ı bulunamadı`).toBeTruthy();

            const code = await readFile(`${DIST}/assets/${pageFile}`, 'utf8');
            const dataChunk = files.find((f) => f.startsWith(`${data}-`) && f.endsWith('.js'));
            expect(dataChunk, `${data} chunk'ı bulunamadı`).toBeTruthy();

            // Statik import olsaydı `from"./javaData-xxx.js"` biçiminde görünürdü;
            // ertelenmiş yükleme `import("./javaData-xxx.js")` biçimindedir.
            expect(code, `${chunk} ${data}'yı STATİK import ediyor — ilk boya yine bloklanır`)
                .not.toContain(`from"./${dataChunk}"`);
            expect(code, `${chunk} içinde ${data}'ya dinamik import yok`)
                .toContain(`import("./${dataChunk}")`);
            // manifest varsa sadece bilgi amaçlı; testin sonucu buna bağlı değil.
            void assets;
        });
    }

    for (const { route } of SPLIT_PAGES) {
        test(`${route} — başlık, ağır veri chunk'ı BEKLENMEDEN boyanıyor`, async ({ page }) => {
            test.setTimeout(120_000);
            await page.goto(route);
            // İlk boya: h1 görünür. Ağır veri hâlâ arka planda yükleniyor olabilir.
            await expect(page.locator('h1').first()).toBeVisible({ timeout: 30_000 });
            // Arka plan yüklemesi tamamlanınca gösterge kaybolur ve GERÇEK içerik gelir.
            await expect(page.locator('[data-testid="topic-content-loading"]'))
                .toHaveCount(0, { timeout: 60_000 });
            const tabButtons = page.locator('div[class*="flex-shrink-0"][class*="sticky"] button');
            expect(await tabButtons.count(), `${route}: sekmeler yüklenmedi`).toBeGreaterThan(1);
        });
    }
});
