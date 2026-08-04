import { test, expect, type Page } from '@playwright/test';
import { portfolioData } from '../src/data/portfolioData.js';
import { waitForAppReady } from './helpers/app-ready';

// QA Portfolyo — /portfolio uçtan uca testleri.
//
// Bu suite'in ASIL GÖREVİ bir regresyonun bekçiliğidir: `xp.js` depolama
// anahtarını BULUNULAN SAYFANIN URL'inden türetir (`learnqa_xp_<ilkSegment>`).
// Portfolyo bu yüzden `getCompletedExercises()`/`sprintStore` fonksiyonlarını
// ÇAĞIRAMAZ — /portfolio sayfasında `learnqa_xp_portfolio` anahtarını okurlar
// ve her zaman BOŞ dönerler (sessiz yanlışlık, hiçbir hata fırlatmaz).
//
// "Dolu durum" testi veriyi BİLEREK `learnqa_xp_selenium` ve `learnqa_xp_sprint`
// anahtarlarına tohumlar. `portfolioSnapshot` global taramayı bırakıp route
// kapsamlı okumaya dönerse bu test KIRILIR.
//
// §22.1 istisna listesi DEĞİŞMEZ — /portfolio normal test kapsamındadır.

type Bilingual = { tr?: string; en?: string } | string;

function tr(val: Bilingual | undefined): string {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    return val.tr ?? val.en ?? '';
}

const SEEDED_MISSION_ID = 'selenium-login-mission';
const SEEDED_BUG_MISSION_ID = 'sprint1-lqa-101-mission';
const SEEDED_BUG_KEY = portfolioData.bugCatalog[SEEDED_BUG_MISSION_ID].key;

// Gerçek bir kullanıcının bıraktığı izlerin kopyası: XP havuzları KONU BAŞINA
// ayrı anahtarlarda, beceri sinyalleri tek anahtarda, sprint panosu ayrı.
async function seedFullPortfolio(page: Page) {
    await page.addInitScript(
        ({ missionId, bugMissionId }) => {
            // DİKKAT: anahtarlar bilerek `learnqa_xp_portfolio` DEĞİL — portfolyo
            // sayfası bunları ancak GLOBAL tarama yaparsa görebilir.
            localStorage.setItem('learnqa_xp_selenium', JSON.stringify({ xp: 120, completed: [missionId, 'sel-quiz-1'] }));
            localStorage.setItem('learnqa_xp_sprint', JSON.stringify({ xp: 50, completed: [bugMissionId] }));
            localStorage.setItem('learnqa_skill_signals', JSON.stringify({
                signals: [
                    { missionId, route: '/selenium', skill: '/selenium', ts: Date.UTC(2026, 6, 15) },
                    { missionId: bugMissionId, route: '/sprint', skill: '/sprint', ts: Date.UTC(2026, 6, 16) },
                ],
            }));
            localStorage.setItem('learnqa_sprint_board', JSON.stringify({ pulled: ['lqa-101'], closed: ['sprint-1'] }));
            localStorage.setItem('learnqa_completed_routes', JSON.stringify(['/selenium']));
            // Ustalık tablosunun dolması için gerçek quiz izleri (seleniumwebdriver = pageKey).
            localStorage.setItem('quizAttempted_seleniumwebdriver', JSON.stringify({ 0: { q1: true, q2: true } }));
            localStorage.setItem('quizScore_seleniumwebdriver', JSON.stringify({ 0: { q1: true, q2: true } }));
            localStorage.setItem('progress_seleniumwebdriver', JSON.stringify({ 0: true, 1: true }));
        },
        { missionId: SEEDED_MISSION_ID, bugMissionId: SEEDED_BUG_MISSION_ID },
    );
}

async function gotoPortfolio(page: Page) {
    await page.goto('/portfolio');
    await waitForAppReady(page, { timeout: 30_000 });
}

test.describe('QA Portfolyo — /portfolio', () => {
    test('boş durumda davet ekranı gösteriliyor, bölüm kartları render edilmiyor', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoPortfolio(page);

        await expect(page.getByTestId('portfolio-empty')).toBeVisible();
        await expect(page.getByText(tr(portfolioData.emptyState.title))).toBeVisible();

        // Sıfır kademesinde HİÇBİR bölüm render edilmez — boş kart gösterilmez.
        for (const section of ['portfolio-stats', 'portfolio-missions', 'portfolio-sprints', 'portfolio-mastery', 'portfolio-skills']) {
            await expect(page.getByTestId(section)).toHaveCount(0);
        }
        // Kimlik alanı ve dışa aktarım düğmesi de boş portfolyoda görünmez.
        await expect(page.getByTestId('portfolio-identity')).toHaveCount(0);
        await expect(page.getByTestId('portfolio-export-btn')).toHaveCount(0);

        // İki CTA gerçek route'lara gidiyor.
        await expect(page.getByTestId('portfolio-empty-mission-cta')).toHaveAttribute('href', /\/selenium$/);
        await expect(page.getByTestId('portfolio-empty-sprint-cta')).toHaveAttribute('href', /\/sprint$/);

        // Dürüstlük notu HER kademede görünür.
        await expect(page.getByTestId('portfolio-honesty-note')).toBeVisible();

        // Regresyon bekçisi: CTA sadece route'a değil, görevin KENDİ sekmesine
        // götürmeli — aksi hâlde kullanıcı /selenium'un ilk sekmesinde kalır ve
        // metnin işaret ettiği görevi (login smoke testi) kendi bulmak zorunda kalır.
        await page.getByTestId('portfolio-empty-mission-cta').click();
        await page.waitForURL(/\/selenium$/);
        await expect(
            page.locator('[data-testid="mission-block"][data-mission-id="selenium-login-mission"]'),
        ).toBeVisible({ timeout: 15_000 });

        await context.close();
    });

    test('dolu durumda görev kartı, kapatılan bug ve ustalık tablosu görünüyor (route-kapsamı regresyon bekçisi)', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await seedFullPortfolio(page);
        await gotoPortfolio(page);

        // Davet ekranı YOK, bölümler var.
        await expect(page.getByTestId('portfolio-empty')).toHaveCount(0);
        await expect(page.getByTestId('portfolio-stats')).toBeVisible();

        // Görev vitrini: tohumlanan mission katalog başlığıyla görünür.
        const missionCard = page.locator(`[data-testid="portfolio-mission-card"][data-mission-id="${SEEDED_MISSION_ID}"]`);
        await expect(missionCard).toBeVisible();
        await expect(missionCard).toContainText(tr(portfolioData.missionCatalog[SEEDED_MISSION_ID].title));

        // Sprint bug'ı ayrı bölümde, görev vitrininde DEĞİL.
        await expect(page.locator(`[data-testid="portfolio-mission-card"][data-mission-id="${SEEDED_BUG_MISSION_ID}"]`)).toHaveCount(0);
        const bugCard = page.locator(`[data-testid="portfolio-bug-card"][data-bug-key="${SEEDED_BUG_KEY}"]`);
        await expect(bugCard).toBeVisible();
        await expect(bugCard).toContainText(tr(portfolioData.bugCatalog[SEEDED_BUG_MISSION_ID].title));

        // Kapatılan sprint şeridi.
        await expect(page.getByTestId('portfolio-closed-sprint')).toContainText(portfolioData.sprintCatalog['sprint-1'].code);

        // Rakamlar: XP iki ayrı konu havuzundan TOPLANMIŞ olmalı (120 + 50).
        await expect(page.getByTestId('portfolio-stat-xp')).toContainText('170');
        await expect(page.getByTestId('portfolio-stat-missions')).toContainText('1');
        await expect(page.getByTestId('portfolio-stat-bugs')).toContainText('1');

        // Ustalık tablosu: sadece BAŞLANMIŞ konu listelenir.
        await expect(page.locator('[data-testid="portfolio-mastery-row"][data-route="/selenium"]')).toBeVisible();
        await expect(page.locator('[data-testid="portfolio-mastery-row"][data-route="/docker"]')).toHaveCount(0);

        // Sıradaki görev: katalogda selenium-login-mission'dan hemen sonra gelen
        // selenium-pom-refactor-mission tamamlanmadı, o yüzden CTA onu göstermeli
        // — portfolyo sadece geçmişi değil, sıradaki adımı da göstermeli.
        const nextMissionSection = page.getByTestId('portfolio-next-mission');
        await expect(nextMissionSection).toHaveAttribute('data-mission-id', 'selenium-pom-refactor-mission');
        // İLERİYE bakan taskTitle gösterilmeli ("...etmek"), "İnşa Ettiklerin"deki
        // GERİYE bakan title DEĞİL ("...ettin") — henüz yapılmamış bir görev
        // bitmiş gibi görünmemeli (kullanıcı raporu).
        await expect(nextMissionSection).toContainText(tr(portfolioData.missionCatalog['selenium-pom-refactor-mission'].taskTitle));

        await context.close();
    });

    // Regresyon bekçisi: portfolyo yalnızca "ne bitirdin" göstermemeli, "sırada
    // ne var" da göstermeli — kullanıcı raporu: "bana yeni görev vermiyor".
    test('"Sıradaki Görev" kartı en son tamamlanmamış katalog görevini gösterir ve doğru sekmeyi açar', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await seedFullPortfolio(page);
        await gotoPortfolio(page);

        const cta = page.getByTestId('portfolio-next-mission-cta');
        await expect(cta).toHaveAttribute('href', /\/selenium$/);
        await cta.click();
        await page.waitForURL(/\/selenium$/);

        // İkinci bir sekme tıklaması OLMADAN sıradaki görevin bloğu görünür olmalı.
        await expect(
            page.locator('[data-testid="mission-block"][data-mission-id="selenium-pom-refactor-mission"]'),
        ).toBeVisible({ timeout: 15_000 });

        await context.close();
    });

    // Sınır durumu: katalogdaki TÜM 18 görev tamamlanmışsa gösterilecek bir
    // "sıradaki görev" kalmaz — portfolyo olmayan bir görevi UYDURMAMALI, kart
    // tamamen kaybolmalı.
    test('kataloğun tamamı tamamlanmışsa "Sıradaki Görev" kartı hiç görünmez', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await page.addInitScript((missionIds) => {
            localStorage.setItem('learnqa_xp_selenium', JSON.stringify({ xp: 900, completed: missionIds }));
        }, Object.keys(portfolioData.missionCatalog));
        await gotoPortfolio(page);

        await expect(page.getByTestId('portfolio-stats')).toBeVisible();
        await expect(page.getByTestId('portfolio-next-mission')).toHaveCount(0);

        await context.close();
    });

    // Regresyon bekçisi: "aç" linki eskiden sadece route'a gidiyordu, kullanıcı
    // her zaman sayfanın İLK sekmesinde açılıyordu — görevin kendi sekmesi
    // (burada index 2) hangi konumdaysa olsun. `openTab` state'i artık
    // `TopicPage`'in başlangıç sekmesini doğrudan görevin bulunduğu sekmeye
    // taşımalı; ikinci bir tıklama olmadan mission bloğu ekranda görünmeli.
    test('görev kartındaki "aç" linki lesson sayfasını görevin KENDİ sekmesinde açıyor', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await seedFullPortfolio(page);
        await gotoPortfolio(page);

        const openLink = page.locator(
            `[data-testid="portfolio-mission-card"][data-mission-id="${SEEDED_MISSION_ID}"] [data-testid="portfolio-mission-open-link"]`,
        );
        const expectedTab = portfolioData.missionCatalog[SEEDED_MISSION_ID].openTab;
        expect(typeof expectedTab, `${SEEDED_MISSION_ID} kataloğunda openTab tanımlı olmalı`).toBe('number');
        await expect(openLink).toHaveAttribute('href', /\/selenium$/);

        await openLink.click();
        await page.waitForURL(/\/selenium$/);

        // İkinci bir sekme tıklaması OLMADAN görevin kendi bloğu görünür olmalı.
        await expect(
            page.locator(`[data-testid="mission-block"][data-mission-id="${SEEDED_MISSION_ID}"]`),
        ).toBeVisible({ timeout: 15_000 });

        await context.close();
    });

    test('kariyer haritası profili yokken rozet bölümü yerine tek satırlık ipucu gösteriliyor', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await seedFullPortfolio(page);
        await gotoPortfolio(page);

        await expect(page.getByTestId('portfolio-milestones')).toHaveCount(0);
        await expect(page.getByTestId('portfolio-hint-career-map')).toBeVisible();

        await context.close();
    });

    test('Markdown dışa aktarımı panoya dolu portfolyo metni yazıyor', async ({ browser }) => {
        const context = await browser.newContext({
            serviceWorkers: 'block',
            permissions: ['clipboard-read', 'clipboard-write'],
        });
        const page = await context.newPage();
        await seedFullPortfolio(page);
        await gotoPortfolio(page);

        await page.getByTestId('portfolio-export-btn').click();
        await expect(page.getByTestId('portfolio-export-btn')).toContainText(tr(portfolioData.ui.exportCopied));

        const clipboard = await page.evaluate(() => navigator.clipboard.readText());
        expect(clipboard).toContain(tr(portfolioData.missionCatalog[SEEDED_MISSION_ID].title));
        expect(clipboard).toContain(SEEDED_BUG_KEY);
        // Dürüstlük notu export'a da girer — portfolyo bir sertifika değildir.
        expect(clipboard).toContain(tr(portfolioData.honestyNote).slice(0, 40));

        await context.close();
    });

    test('kimlik alanı kaydediliyor ve sayfada görünüyor', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await seedFullPortfolio(page);
        await gotoPortfolio(page);

        // Varsayılan: kullanıcı bir şey yazmadıysa jenerik ad gösterilir.
        await expect(page.getByTestId('portfolio-identity')).toContainText(tr(portfolioData.ui.defaultName));

        await page.getByTestId('portfolio-identity-edit').click();
        await page.getByTestId('portfolio-identity-name').fill('Test Kullanicisi');
        await page.getByTestId('portfolio-identity-title').fill('QA Automation Engineer');
        await page.getByTestId('portfolio-identity-save').click();

        await expect(page.getByTestId('portfolio-identity')).toContainText('Test Kullanicisi');
        await expect(page.getByTestId('portfolio-identity')).toContainText('QA Automation Engineer');

        // Yenilendikten sonra da kalıcı (tek yazma noktası gerçekten yazıyor).
        await page.reload();
        await expect(page.getByTestId('portfolio-identity')).toContainText('Test Kullanicisi');

        await context.close();
    });

    // Bu sayfa sekmesiz olduğu için i18n-content-toggle'ın sekme gezen EN
    // taramasına uymuyor — EN denetimi burada, dolu portfolyo üstünde yapılır
    // (boş sayfada zaten çok az metin render edilir, sızıntıyı gizler).
    test('/en/portfolio dolu durumda hiçbir Türkçeye özgü karakter göstermiyor', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await seedFullPortfolio(page);
        await page.goto('/en/portfolio');
        await waitForAppReady(page, { timeout: 30_000 });

        await expect(page.getByTestId('portfolio-missions')).toBeVisible();
        await expect(page.getByTestId('portfolio-sprints')).toBeVisible();

        const bodyText = await page.locator('body').innerText();
        const match = bodyText.match(/.{0,40}[ığşçöüİĞŞÇÖÜ].{0,40}/);
        expect(match?.[0] ?? null, `EN modda Türkçe sızıntısı: "${match?.[0]?.trim()}"`).toBeNull();

        await context.close();
    });

    test('ana sayfadaki giriş kartı /portfolio\'ya götürüyor', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await page.goto('/');
        await waitForAppReady(page, { timeout: 30_000 });

        const banner = page.getByTestId('portfolio-banner');
        await expect(banner).toBeVisible();
        await banner.click();

        await expect(page).toHaveURL(/\/portfolio$/);
        await expect(page.getByTestId('portfolio-honesty-note')).toBeVisible();

        await context.close();
    });

    test('katalogda olmayan bir görev sessizce düşmez, jenerik kartla görünür', async ({ browser }) => {
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await page.addInitScript(() => {
            localStorage.setItem('learnqa_xp_kafka', JSON.stringify({ xp: 30, completed: ['kafka-gelecekteki-gorev'] }));
            localStorage.setItem('learnqa_skill_signals', JSON.stringify({
                signals: [{ missionId: 'kafka-gelecekteki-gorev', route: '/kafka', skill: '/kafka', ts: Date.UTC(2026, 6, 20) }],
            }));
        });
        await gotoPortfolio(page);

        const card = page.locator('[data-testid="portfolio-mission-card"][data-mission-id="kafka-gelecekteki-gorev"]');
        await expect(card).toBeVisible();
        await expect(card).toContainText(tr(portfolioData.ui.genericMissionNote));

        await context.close();
    });
});
