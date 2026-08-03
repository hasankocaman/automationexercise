import { test, expect } from '@playwright/test';
import { readFile, access } from 'node:fs/promises';
import { localizedPath } from '../src/utils/seo.js';
import { buildSectionSeoIndex, computeSectionCatalog } from '../scripts/lib/sectionSeo.mjs';
import { stripLeadingEmoji } from '../src/utils/sectionSeoText.js';
import { SECTION_SLUGS } from '../src/data/generated/sectionSlugs.js';

// SEO Faz 3 — sekme URL mimarisinin SESSİZ bozulma noktaları.
//
// Buradaki testlerin ortak özelliği: hepsi, bozulduğunda hiçbir hata
// vermeyen ama arama sonuçlarını aylar içinde eriten davranışları korur.
// Ne build kırılır, ne sayfa patlar — bu yüzden ancak açıkça test edilirlerse
// fark edilirler. Her describe'ın başındaki not, o kontrolün neden var
// olduğunu (hangi gerçek arıza sonucu yazıldığını) anlatır.

const DIST = 'dist';

async function exists(path: string): Promise<boolean> {
    try { await access(path); return true; } catch { return false; }
}

async function readShell(urlPath: string): Promise<string> {
    const file = urlPath === '/' ? `${DIST}/index.html` : `${DIST}${urlPath}/index.html`;
    return readFile(file, 'utf8');
}

// Bir shell'de birden fazla <script type="application/ld+json"> olabilir ve
// bunlardan biri DİZİ taşır (WebPage + BreadcrumbList + Course + FAQPage).
// Düzleştirmeden aramak, iç içe duran şemayı "yok" sanmaya yol açar.
function parseJsonLd(html: string): any[] {
    const nodes: any[] = [];
    const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
        const parsed = JSON.parse(m[1]);
        if (Array.isArray(parsed)) nodes.push(...parsed);
        else nodes.push(parsed);
    }
    return nodes;
}

test.beforeAll(async () => {
    if (!(await exists(`${DIST}/index.html`))) {
        throw new Error('dist/ yok — önce "npm run build" çalıştır.');
    }
});

test.describe('Slug dondurma — bir bölüm eklenince URL\'ler kaymamalı', () => {
    // GERÇEK ARIZA: manifest başlıkları `stripLeadingEmoji` ile YAZILIYOR
    // ("What is Selenium?"), katalog başlıkları ise emoji'yi KORUYOR
    // ("🟢 What is Selenium?"). Üretici slug'ı başlığa göre koruyacakken
    // (Kural 1) bu iki biçim hiç eşleşmediğinden 420 bölümün 379'unda kural
    // ölü kalmıştı; slug'lar başlığa değil YALNIZCA INDEX'e bağlanıyordu.
    // Sonucu şu olurdu: bir veri dosyasının ortasına bölüm eklendiğinde
    // /selenium/locators adresi sessizce BAŞKA bir bölümün içeriğini
    // göstermeye başlar — 404 bile alamazsın, sadece yanlış içerik.
    test('manifest başlıkları katalog başlıklarıyla eşleşir (Kural 1 canlı)', async () => {
        const catalog = await computeSectionCatalog();

        const mismatches: string[] = [];
        let checked = 0;

        for (const [routePath, entries] of Object.entries(catalog) as [string, any[]][]) {
            const manifest = (SECTION_SLUGS as any)[routePath] ?? [];
            const byTitle = new Map(
                manifest.map((item: any) => [stripLeadingEmoji(item.title), item.slug]),
            );

            for (const entry of entries) {
                checked += 1;
                const key = stripLeadingEmoji(entry.byLocale.en.title);
                if (!byTitle.has(key)) {
                    mismatches.push(`${routePath}[${entry.index}] "${key}"`);
                }
            }
        }

        expect(checked).toBeGreaterThan(300);
        // Tek bir ışka bile "slug artık index'e bağlı" demektir.
        expect(mismatches, `Manifestte başlıkla eşleşmeyen bölümler:\n${mismatches.slice(0, 10).join('\n')}`).toEqual([]);
    });

    test('her slug tek bir bölüme ait (sayfa içinde çakışma yok)', async () => {
        for (const [routePath, entries] of Object.entries(SECTION_SLUGS) as [string, any[]][]) {
            const slugs = entries.map((e) => e.slug);
            expect(new Set(slugs).size, `${routePath} içinde mükerrer slug`).toBe(slugs.length);
        }
    });
});

test.describe('İç bağlantı grafiği — sekme URL\'leri öksüz kalmamalı', () => {
    // GERÇEK ARIZA: hub shell'i (sitenin en çok link alan sayfası) kendi
    // bölümlerine HİÇ <a href> vermiyordu; 688 indekslenebilir sekme yalnızca
    // sitemap'ten keşfedilebiliyordu. Sitemap keşif sağlar ama tarama
    // önceliğini ve sayfa otoritesini iç bağlantılar dağıtır — linksiz bir
    // URL, sitemap'te olsa bile taranma sırasında en sona düşer.
    test('hub shell\'i indekslenebilir bölümlerine link verir (iki dilde)', async () => {
        const { index } = await buildSectionSeoIndex(SECTION_SLUGS);
        const samples = ['/selenium', '/sql', '/python', '/test-automation'];

        for (const hubPath of samples) {
            const entries = (index as any)[hubPath];
            expect(entries, `${hubPath} için bölüm kataloğu yok`).toBeTruthy();
            const indexable = entries.filter((e: any) => e.indexable);
            expect(indexable.length).toBeGreaterThan(0);

            for (const locale of ['tr', 'en']) {
                const html = await readShell(localizedPath(hubPath, locale));

                for (const entry of indexable) {
                    const href = localizedPath(entry.path, locale);
                    expect(
                        html.includes(`href="${href}"`),
                        `${localizedPath(hubPath, locale)} shell'inde ${href} bağlantısı yok`,
                    ).toBe(true);
                }
            }
        }
    });

    test('hub, kilitli ve hub-kopyası bölümlere link VERMEZ', async () => {
        const { index } = await buildSectionSeoIndex(SECTION_SLUGS);

        for (const hubPath of ['/selenium', '/python']) {
            const entries = (index as any)[hubPath];
            const html = await readShell(hubPath);

            for (const entry of entries.filter((e: any) => !e.indexable)) {
                // İlk sekme hub'ın kendisidir; mülakat sekmesi quiz kilidi
                // arkasındadır. İkisine de link vermek ya kanibalizasyon ya da
                // kullanıcının göremediği içeriği öne çıkarmak olurdu.
                expect(
                    html.includes(`href="${entry.path}"`),
                    `${hubPath} shell'i indekslenmeyen ${entry.path} adresine link veriyor`,
                ).toBe(false);
            }
        }
    });
});

test.describe('Türetilmiş sekme metadata\'sı SERP sınırları içinde', () => {
    // NEDEN: 688 sekmenin başlığı elle değil TÜRETİLEREK yazılıyor, üstelik
    // tekilleştirme adımı çakışma bulduğunda başlığa sayfa etiketi EKLİYOR —
    // yani sınırı aşma ihtimali türetmenin kendisinden değil, sonradan yapılan
    // bu ekten geliyor. Hiçbir build kontrolü bu uzunlukları denetlemiyor.
    test('başlık ≤ 62, description 80-180 karakter', async () => {
        const { index } = await buildSectionSeoIndex(SECTION_SLUGS);

        const longTitles: string[] = [];
        const badDescriptions: string[] = [];
        let checked = 0;

        for (const entries of Object.values(index) as any[][]) {
            for (const entry of entries) {
                if (!entry.indexable) continue;
                for (const locale of ['tr', 'en']) {
                    checked += 1;
                    const { title, description } = entry.seo[locale];
                    if (title.length > 62) longTitles.push(`${entry.path} [${locale}] ${title.length}: ${title}`);
                    if (description.length < 80 || description.length > 180) {
                        badDescriptions.push(`${entry.path} [${locale}] ${description.length}`);
                    }
                }
            }
        }

        expect(checked).toBeGreaterThan(400);
        expect(longTitles.slice(0, 5)).toEqual([]);
        expect(badDescriptions.slice(0, 5)).toEqual([]);
    });

    test('sekme başlıkları birbirinden ve hub başlıklarından farklı', async () => {
        const { index } = await buildSectionSeoIndex(SECTION_SLUGS);
        const seen = new Map<string, string>();
        const collisions: string[] = [];

        for (const entries of Object.values(index) as any[][]) {
            for (const entry of entries) {
                if (!entry.indexable) continue;
                for (const locale of ['tr', 'en']) {
                    const key = `${locale}|${entry.seo[locale].title}`;
                    if (seen.has(key)) collisions.push(`${entry.path} ↔ ${seen.get(key)}`);
                    else seen.set(key, entry.path);
                }
            }
        }

        expect(collisions.slice(0, 5)).toEqual([]);
    });
});

test.describe('Ham HTML ile tarayıcı ayrışmamalı (cloaking önlemi)', () => {
    // NEDEN: statik shell ile JavaScript çalıştıktan sonraki hâl AYRIŞIRSA,
    // Google'a bir şey kullanıcıya başka bir şey gösterilmiş olur. En sinsi
    // hâli canonical'dır: shell ilk sekmenin canonical'ını hub'a verir,
    // ama React aynı adreste kendine işaret eden bir canonical basarsa
    // kanibalizasyon önlemi sessizce iptal olur.
    test('ilk sekme adresi hub\'a onarılır ve canonical hub\'ı gösterir', async ({ page }) => {
        await page.goto('/selenium/what-is-selenium');

        // Adres kendini onarır (ilk sekme hub URL'inde yaşar). `/selenium`
        // büyük bir chunk olduğu için önce içeriğin gerçekten geldiğini
        // bekle — yoksa canonical, React yönlendirmeyi yapmadan ÖNCEKİ
        // değeriyle okunur ve test rastgele kırılır.
        await expect(page).toHaveURL(/\/selenium$/, { timeout: 20_000 });
        await expect(page.getByRole('heading', { name: /Selenium Nedir/ }).first())
            .toBeVisible({ timeout: 20_000 });

        // SeoMeta canonical'ı bir effect içinde yazar: DOM'a yansıması
        // yönlendirmeden bir tık sonra olur, bu yüzden değeri yoklayarak bekle.
        await expect
            .poll(() => page.locator('link[rel="canonical"]').getAttribute('href'), { timeout: 10_000 })
            .toBe('https://learnqa.dev/selenium');
    });

    test('indekslenebilir sekmede canonical KENDİNİ gösterir', async ({ page }) => {
        await page.goto('/selenium/wait-strategies');
        await expect(page.getByRole('heading', { name: /Wait Stratejileri/ }).first()).toBeVisible({ timeout: 15_000 });

        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toBe('https://learnqa.dev/selenium/wait-strategies');
    });

    test('shell\'deki başlık, JavaScript sonrası başlıkla aynı kalır', async ({ page }) => {
        // Türetme build ve runtime'da AYNI fonksiyondan geçer; ayrışırsa
        // Google "başlık kararsız" sayar ve kendi başlığını uydurur.
        const shell = await readShell('/sql/sql-joins');
        const shellTitle = shell.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
        expect(shellTitle).toBeTruthy();

        await page.goto('/sql/sql-joins');
        await expect(page).toHaveTitle(/SQL JOIN/i, { timeout: 15_000 });
        expect(await page.title()).toBe(shellTitle);
    });
});

test.describe('SSS bloğu kilitsizdir (FAQPage şemasının önkoşulu)', () => {
    // NEDEN: FAQPage şeması yalnızca kullanıcının GERÇEKTEN görebildiği
    // içerikten üretilebilir. Mülakat soruları %60 quiz barajının arkasında
    // olduğu için şemaya asla giremez; `faq` bloğu tam da bu yüzden ayrı ve
    // kilitsiz bir blok tipi olarak eklendi. Biri bu bloğu yanlışlıkla
    // gating'e bağlarsa şema anında "cloaking" hâline gelir.
    test('quiz çözülmeden SSS soruları görünür', async ({ page }) => {
        await page.goto('/playwright');

        const faqHeading = page.getByRole('heading', { name: /Sık Sorulan Sorular/i }).first();
        await expect(faqHeading).toBeVisible({ timeout: 20_000 });

        // Kilit rozeti/uyarısı SSS bloğunun içinde olmamalı.
        const body = await page.locator('body').innerText();
        const faqIndex = body.indexOf('Sık Sorulan Sorular');
        expect(faqIndex).toBeGreaterThan(-1);
        const faqChunk = body.slice(faqIndex, faqIndex + 1200);
        expect(faqChunk).not.toContain('quizlerin en az');
    });

    test('şemadaki her soru sayfanın görünür metninde de var', async ({ page }) => {
        await page.goto('/playwright');
        await expect(page.getByRole('heading', { name: /Sık Sorulan Sorular/i }).first())
            .toBeVisible({ timeout: 20_000 });

        const shell = await readShell('/playwright');
        const faqSchema = parseJsonLd(shell).find((node) => node['@type'] === 'FAQPage');
        expect(faqSchema, '/playwright shell\'inde FAQPage şeması yok').toBeTruthy();

        const visible = await page.locator('body').innerText();
        for (const entity of faqSchema.mainEntity) {
            expect(visible, `Şemadaki soru sayfada görünmüyor: ${entity.name}`).toContain(entity.name);
        }
    });
});

test.describe('Cevap-önce paragrafı yalnızca hub\'da', () => {
    // NEDEN: `seoAnswer` SAYFANIN tanımıdır ("Playwright nedir?"), tek tek
    // bölümlerin değil. Her sekmede tekrarlanırsa 688 URL aynı paragrafla
    // açılır ve Google bunları birbirinin kopyası saymaya başlar.
    test('hub\'da görünür, sekme URL\'inde görünmez', async ({ page }) => {
        await page.goto('/playwright');
        const answer = page.locator('[data-seo-answer], p').filter({ hasText: /Playwright, Microsoft/ }).first();
        await expect(answer).toBeVisible({ timeout: 20_000 });

        await page.goto('/playwright/locator-strategies');
        await page.waitForTimeout(1500);
        const bodyText = await page.locator('body').innerText();
        expect(bodyText).not.toContain('Playwright, Microsoft tarafından geliştirilen');
    });
});
