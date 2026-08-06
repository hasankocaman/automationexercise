import { test, expect } from '@playwright/test';
import { readFile, access } from 'node:fs/promises';
import { ROUTE_SEO, LOCALES, localizedPath, SITE_URL } from '../src/utils/seo.js';
import { buildSectionSeoIndex } from '../scripts/lib/sectionSeo.mjs';
import { SECTION_SLUGS } from '../src/data/generated/sectionSlugs.js';
import { waitForAppReady } from './helpers/app-ready';

// SEO Faz 2 — otomasyon dışında kalmış çıktı doğrulamaları.
//
// Bu dosya, `seo-i18n-routing.spec.ts`'in TARAYICI davranışını doğrulamasını
// tamamlar: burada denetlenen şeyler yalnızca BUILD ÇIKTISINDA yaşıyor
// (sitemap, statik shell'lerdeki JSON-LD, chunk bölme) ve daha önce hiçbir
// otomatik kontrol tarafından doğrulanmıyordu:
//
//   - Sitemap + `xhtml:link` alternatifleri: üretiliyordu ama üretilen dosyayı
//     okuyup doğrulayan HİÇBİR ŞEY yoktu — yarım üretilse build yeşil kalırdı.
//   - JSON-LD: `check-dist-seo.mjs` yalnızca SAYIP yazdırıyordu, sayı sıfıra
//     düşse bile build'i KIRMIYORDU.
//   - Kod bölme: büyük veri chunk'ının ilk boyayı bloklamadığı iddiası hiç
//     ölçülmüyordu; testler yalnızca yükleme göstergesini bekliyordu.
//   - Sitemap'e hangi sayfaların GİRMEMESİ gerektiği hiç denetlenmiyordu;
//     korumalı/işlevsel sayfalar indekslenmeye sunuluyordu.
//
// `dist/` gereksinimi: her iki CI workflow'u da E2E'den ÖNCE `npm run build`
// çalıştırır, `pre-push` hook'u da build alır. Yerelde build almadıysan test
// sessizce geçmez — açık bir mesajla başarısız olur.

const DIST = 'dist';
// Sitemap'e giren küme: dinamik route'lar (parametrik) ve `noindex` işaretli
// korumalı/işlevsel sayfalar hariç. Shell'ler yine İKİ dilde üretilir — bu
// ayrım bilinçlidir (bkz. DEPLOY.md §9.2).
const ALL_SHELL_ROUTES = ROUTE_SEO.filter((entry: any) => !entry.dynamic);
const SITEMAP_ROUTES = ALL_SHELL_ROUTES.filter((entry: any) => !entry.noindex);
const NOINDEX_ROUTES = ALL_SHELL_ROUTES.filter((entry: any) => entry.noindex);

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

// Sekme (bölüm) URL'leri (Documents/seo-phase-3-plan.md §3): indekslenebilir
// her bölüm de sitemap'e girer. Bu sayı build'den build'e içerik değiştikçe
// oynayabilir — sabit bir sayı YAZILMAZ, `sectionSeo.mjs`'teki AYNI hesaptan
// okunur ki bu test bağımsız bir "doğru sayı" icat etmiş olmasın.
let sectionUrlCount = 0;

test.beforeAll(async () => {
    expect(
        await exists(`${DIST}/index.html`),
        'dist/ bulunamadı — bu testler build ÇIKTISINI doğruluyor. Önce `npm run build` çalıştır.',
    ).toBe(true);

    const { index: sectionIndex } = await buildSectionSeoIndex(SECTION_SLUGS);
    sectionUrlCount = Object.values(sectionIndex).flat().filter((entry: any) => entry.indexable).length;
});

test.describe('SEO Faz 2 — sitemap çıktısı (O4)', () => {
    test('sitemap her route\'u İKİ dilde içerir ve her girdide hreflang alternatifleri vardır', async () => {
        const xml = await readFile(`${DIST}/sitemap.xml`, 'utf8');
        const urlBlocks = xml.split('<url>').slice(1);

        // (Hub route + indekslenebilir sekme) sayısının TAM İKİ KATI — bir dil
        // sessizce düşerse yakalanır.
        expect(urlBlocks, 'sitemap URL sayısı (route + sekme) × dil sayısına eşit olmalı')
            .toHaveLength((SITEMAP_ROUTES.length + sectionUrlCount) * LOCALES.length);

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
        for (const entry of SITEMAP_ROUTES) {
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
        expect(body.split('<url>').length - 1).toBe((SITEMAP_ROUTES.length + sectionUrlCount) * LOCALES.length);
    });
});

test.describe('SEO Faz 2 — zengin sonuç şeması (O6)', () => {
    const COURSE_ROUTE = '/selenium';

    // FAQPage kuralı: şemaya giren HER soru, AYNI sayfanın GÖRÜNÜR gövdesinde
    // bulunmalıdır. Bu yalnızca bir stil tercihi değil — arama motoru politikası
    // soru/cevabın kullanıcıya görünür olmasını şart koşar.
    //
    // Geçmiş: şema önce her ders sayfasında mülakat sorularından üretiliyordu ama
    // o sorular sayfada HİÇ görünmüyordu (yalnızca JSON-LD içindeydiler) ve
    // uygulamada %60 quiz barajının arkasındaydılar. Şema kaldırıldı; ana sayfaya
    // gate'siz "Mülakat Isınma Turu" bölümü eklenince koşul gerçekten sağlandı.
    //
    // SEO Faz 3 (Documents/seo-phase-3-plan.md §4 B2): FAQPage artık ana
    // sayfaya ÖZEL DEĞİL — herhangi bir ders sayfası, kilitsiz `faq` bloğu
    // (TopicPage.jsx, quiz/mülakat gating'ine TABİ DEĞİL) üzerinden kendi
    // FAQPage'ini üretebilir. Kural değişmedi: kaynağı ne olursa olsun her
    // soru/cevap aynı sayfada GÖRÜNÜR olmak zorunda — bu test artık TÜM
    // route'larda görünürlüğü doğruluyor, sadece ana sayfada değil.

    // generate-static-routes.mjs'teki escapeHtml ile aynı dönüşüm — görünür gövde
    // escape edilmiş, şema ham metin taşıyor.
    const escapeHtml = (v: string) => String(v)
        .replaceAll('&', '&amp;').replaceAll('"', '&quot;')
        .replaceAll('<', '&lt;').replaceAll('>', '&gt;');

    test('Her FAQPage şemasının sorusu, bulunduğu sayfada GÖRÜNÜR', async () => {
        let homepageFaqCount = 0;
        let totalFaqPages = 0;

        for (const entry of ALL_SHELL_ROUTES) {
            for (const locale of LOCALES) {
                const html = await readShell(entry.path, locale);
                const faq = parseJsonLd(html).find((b) => b['@type'] === 'FAQPage');
                if (!faq) continue;

                totalFaqPages += 1;
                const visibleBody = html.replace(/<script[\s\S]*?<\/script>/g, '');
                expect(faq.mainEntity.length, `FAQPage boş soru listesiyle üretilmiş (${localizedPath(entry.path, locale)})`).toBeGreaterThanOrEqual(3);

                for (const q of faq.mainEntity) {
                    expect(q['@type']).toBe('Question');
                    expect(String(q.acceptedAnswer?.text ?? '').length, 'FAQ cevabı boş').toBeGreaterThan(0);
                    expect(
                        visibleBody.includes(escapeHtml(q.name)),
                        `FAQ sorusu sayfanın görünür gövdesinde YOK (${localizedPath(entry.path, locale)}): "${String(q.name).slice(0, 60)}..."`,
                    ).toBe(true);
                }

                // Dil doğruluğu: EN şemada Türkçeye özgü karakter olmamalı.
                if (locale === 'en') {
                    expect(JSON.stringify(faq), `EN FAQPage şemasında Türkçe sızıntısı (${localizedPath(entry.path, locale)})`).not.toMatch(/[ığşçöüİĞŞÇÖÜ]/);
                }
                if (entry.path === '/') homepageFaqCount += 1;
            }
        }

        // Ana sayfa her iki dilde de üretilmiş olmalı — biri sessizce düşerse yakalanır.
        expect(homepageFaqCount, 'ana sayfada FAQPage şeması iki dilde de bulunmalı').toBe(LOCALES.length);
        expect(totalFaqPages, 'hiçbir sayfada FAQPage şeması bulunamadı').toBeGreaterThanOrEqual(LOCALES.length);
    });

    test('Sekme (bölüm) shell\'lerinde FAQPage şeması ASLA yok', async () => {
        // FAQ, hub sayfasının İLK sekmesindeki `faq` bloğundan üretilir; sekme
        // URL'lerinin kendi shell'i bu şemayı TAŞIMAMALI (aksi hâlde aynı şema
        // birden fazla URL'de tekrarlanır — duplicate structured data sinyali).
        const sample = ['selenium/wait-strategies', 'sql/sql-joins'];
        for (const path of sample) {
            const html = await readFile(`${DIST}/${path}/index.html`, 'utf8');
            expect(html, `Sekme shell'i FAQPage taşımamalı: ${path}`).not.toContain('"@type": "FAQPage"');
        }
    });

    test('Course şeması geçerli ve ders sayfasında üretiliyor', async () => {
        const html = await readShell(COURSE_ROUTE, 'tr');
        const course = parseJsonLd(html).find((b) => b['@type'] === 'Course'); // bozuk JSON burada patlar
        expect(course, 'Course şeması üretilmemiş').toBeTruthy();
        expect(String(course.name).length).toBeGreaterThan(0);
        expect(course.provider?.name ?? course.provider, 'Course.provider eksik').toBeTruthy();
    });

    test('Course şeması sayfanın dilini yansıtır', async () => {
        const en = parseJsonLd(await readShell(COURSE_ROUTE, 'en')).find((b) => b['@type'] === 'Course');
        expect(JSON.stringify(en), 'EN Course şemasında Türkçe sızıntısı').not.toMatch(/[ığşçöüİĞŞÇÖÜ]/);
    });

    test('Course kapsamı sessizce sıfıra düşmez', async () => {
        // `check-dist-seo.mjs` bu sayıyı YAZDIRIYOR ama tek başına build'i kırmıyordu.
        // Alt eşik ölçülen mevcut kapsamın (68) belirgin altında — normal içerik
        // dalgalanmasında değil, gerçek bir üretim regresyonunda kırılır.
        let coursePages = 0;
        for (const entry of ALL_SHELL_ROUTES) {
            for (const locale of LOCALES) {
                if ((await readShell(entry.path, locale)).includes('"@type": "Course"')) coursePages += 1;
            }
        }
        expect(coursePages, 'Course şeması üretimi çöktü').toBeGreaterThanOrEqual(50);
    });
});

test.describe('Sitemap dışı bırakılan sayfalar (korumalı/işlevsel)', () => {
    // Bu sayfalar ziyaretçiye içerik göstermiyor (RequireAdmin/ProtectedRoute) ya
    // da işlevsel (login, OAuth callback). Sitemap "bunları indeksle" demektir;
    // oraya konulmaları thin content/soft 404 sinyali üretir ve `/auth/callback`
    // arama sonucundan tıklandığında bozuk bir akışa düşürür (DEPLOY.md §9.2).
    test('korumalı/işlevsel route\'lar sitemap\'te YOK', async () => {
        expect(NOINDEX_ROUTES.length, 'noindex işaretli route kalmamış — filtre kazayla kaldırılmış olabilir')
            .toBeGreaterThan(0);

        const xml = await readFile(`${DIST}/sitemap.xml`, 'utf8');
        for (const entry of NOINDEX_ROUTES) {
            for (const locale of LOCALES) {
                const url = `<loc>${SITE_URL}${localizedPath(entry.path, locale)}</loc>`;
                expect(xml, `${entry.path} sitemap'e sızmış — indekslendikten sonra çıkarmak haftalar sürer`)
                    .not.toContain(url);
            }
        }
    });

    test('shell\'leri yine üretiliyor ama robots=noindex taşıyor', async () => {
        for (const entry of NOINDEX_ROUTES) {
            for (const locale of LOCALES) {
                // Shell ÜRETİLMELİ: GitHub Pages'te derin bağlantıda sert yenileme
                // (ör. /login'e doğrudan giriş) yalnızca statik shell varsa çalışır.
                const html = await readShell(entry.path, locale);
                expect(html, `${localizedPath(entry.path, locale)}: robots noindex eksik`)
                    .toContain('name="robots" content="noindex');
            }
        }
    });

    test('indekslenen sayfalara yanlışlıkla noindex bulaşmamış', async () => {
        for (const entry of SITEMAP_ROUTES.slice(0, 12)) {
            for (const locale of LOCALES) {
                const html = await readShell(entry.path, locale);
                expect(html, `${localizedPath(entry.path, locale)}: indekslenmesi gereken sayfada noindex var`)
                    .not.toContain('name="robots" content="noindex');
            }
        }
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

            // Buradaki bekleme ZORUNLU. Üstteki iki koşul da uygulama HİÇ
            // çalışmadan sağlanabilir: yayınlanan sayfanın statik gövdesinin
            // kendi `h1`'i vardır ve o gövdede yükleme göstergesi hiç yoktur —
            // yani "gösterge yok" baştan doğrudur. Beklemeden devam edilirse
            // aşağıdaki `count()` (otomatik tekrarı YOK) boş DOM'u sayar ve
            // test, ürün sağlamken 0 bulur.
            await waitForAppReady(page, { timeout: 60_000 });

            // Arka plan yüklemesi tamamlanınca gösterge kaybolur ve GERÇEK içerik gelir.
            await expect(page.locator('[data-testid="topic-content-loading"]'))
                .toHaveCount(0, { timeout: 60_000 });
            const tabButtons = page.locator('div[class*="flex-shrink-0"][class*="sticky"] button');
            await expect(tabButtons.first(), `${route}: sekmeler yüklenmedi`)
                .toBeVisible({ timeout: 60_000 });
            expect(await tabButtons.count(), `${route}: sekmeler yüklenmedi`).toBeGreaterThan(1);
        });
    }
});
