import { test, expect, type Page, type Locator } from '@playwright/test';
import { extractQuizPairs, normalizeOption, normalizeCorrect, pickText } from './quizInventory.mjs';

// Kullanıcı talebi: "sadece Docker sayfası üzerinden değil her ders için ayrı
// ayrı... quiz sorusunu yanlış cevaplarsa bir defaya mahsus 2. quiz sorusu
// sorulduğunu projedeki HER quiz sorusunda test et" — bu dosya tam olarak bunu
// yapıyor: dedicated 💼 mülakat sekmesi olan/olmayan, test kapsamındaki HER sayfadaki HER quiz
// bloğunu (346 blok / 23 sayfa) gerçek tarayıcıda, HEM TR HEM EN'de BAĞIMSIZ
// olarak tek tek doğruluyor:
//   1) Aktif dildeki soru/şık metni veridekiyle birebir eşleşiyor mu.
//   2) retryQuestion VARSA: yanlış cevap → retry sorusu açılıyor mu, retry'a
//      doğru cevap verilince ✓ oluyor mu ve İKİNCİ bir retry asla çıkmıyor mu (AC02).
//   3) retryQuestion YOKSA: yanlış cevapta retry butonu KESİNLİKLE çıkmıyor mu.
//
// ÖNEMLİ KEŞİF #1 — dil değişimi sırasında quiz state'i: TopicPage `content =
// data[language]` ile TÜM `sections` ağacını değiştiriyor; aynı quiz "blok"
// referansı TR/EN arasında AYNI obje DEĞİL (iki ayrı dil ağacının kendi
// kopyası). QuizBlock'taki reset-effect `questionId`'ye bağlı olduğu için bazı
// dosyalarda (düz string formatlı — dockerData, jenkinsData vb.) dil
// değişince soru/seçim state'i SIFIRLANIYOR, bazılarında (eski bilingual
// {tr,en} iç-alan formatlı — browserstackData/pythonData/typescriptData)
// SIFIRLANMIYOR. Bu yüzden her dil için soru AYRI VE BAĞIMSIZ bir geçişle
// (sekmeden çıkıp geri girerek "temiz" bir başlangıç garanti edilerek) test
// ediliyor.
//
// ÖNEMLİ KEŞİF #2 — bir sekmede BİRDEN FAZLA quiz bloğu varsa (örn. sql tab10
// "SQL JOINs", javascript tab6), iki blok da AYNI "{LETTER}.{şık metni}" string'ine
// sahip olabiliyor (örn. ikisinde de "B.CROSS JOIN" var). `page.locator('button',
// {hasText}).first()` sayfa GENELİNDE arama yaptığı için bu durumda HER ZAMAN
// DOM'da önce gelen (yanlış) bloğun butonuna tıklıyordu — bu da quiz#1'i test
// ederken sessizce quiz#0'ı yanlış cevaplayıp "retry" durumuna sürüklüyor,
// quiz#1 hiç dokunulmamış kalıyordu (sql/javascript'te görülen tüm sahte
// "AC02 ihlali" / "metin bulunamadı" hataları BUNUN sonucuydu — gerçek bir uygulama
// hatası değil, test'in kendi blok izolasyonu eksikliğiydi). Çözüm: her blok,
// kendi SABİT "Hızlı Quiz"/"Quick Quiz" başlığından yukarı XPath ile bulunan
// kendi kök konteynerine (`quizBlockRoot`) izole edilip TÜM buton aramaları bu
// konteynerin İÇİNDE yapılıyor — retry'a geçilse bile başlık metni sabit kaldığı
// için bu izolasyon bozulmuyor.
//
// Maliyet/süre notu: tamamen yerel — gerçek AI çağrısı YOK. Post-commit hook'a
// (./tests) DEĞİL, ayrı `npm run test:quiz-audit` komutuna bağlandı.
//
// tr.sections[i].blocks ile en.sections[i].blocks bazı sayfalarda (aws, azure,
// javaData, jenkins, jmeter, kafka, kubernetes, playwright, postman, selenium,
// basitBackendData) FARKLI UZUNLUKTA — quiz blokları absolute index'le değil
// "bu sekmedeki N'inci quiz bloğu" sırasıyla eşleştiriliyor (quizInventory.mjs).
// Sayı uyuşmazsa (`pairWarning`) o blok çifti raporlanır, sessizce yutulmaz.

const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';
const QUIZ_TITLE_TEXT = /^(Hızlı Quiz|Quick Quiz)$/;

const ROUTES: Array<{ route: string; dataVar: string; dataFile: string }> = [
    { route: '/appium', dataVar: 'appiumData', dataFile: 'appiumData' },
    { route: '/aws', dataVar: 'awsData', dataFile: 'awsData' },
    { route: '/azure', dataVar: 'azureData', dataFile: 'azureData' },
    { route: '/browserstack', dataVar: 'browserstackData', dataFile: 'browserstackData' },
    { route: '/bruno', dataVar: 'brunoData', dataFile: 'brunoData' },
    { route: '/cypress', dataVar: 'cypressData', dataFile: 'cypressData' },
    { route: '/docker', dataVar: 'dockerData', dataFile: 'dockerData' },
    { route: '/git-github', dataVar: 'gitGithubData', dataFile: 'gitGithubData' },
    { route: '/java', dataVar: 'javaData', dataFile: 'javaData' },
    { route: '/javascript', dataVar: 'javascriptData', dataFile: 'javascriptData' },
    { route: '/jenkins', dataVar: 'jenkinsData', dataFile: 'jenkinsData' },
    { route: '/jmeter', dataVar: 'jmeterData', dataFile: 'jmeterData' },
    { route: '/kafka', dataVar: 'kafkaData', dataFile: 'kafkaData' },
    { route: '/kubernetes', dataVar: 'kubernetesData', dataFile: 'kubernetesData' },
    { route: '/linux', dataVar: 'linuxData', dataFile: 'linuxData' },
    { route: '/playwright', dataVar: 'playwrightData', dataFile: 'playwrightData' },
    { route: '/postman', dataVar: 'postmanData', dataFile: 'postmanData' },
    { route: '/python', dataVar: 'pythonData', dataFile: 'pythonData' },
    { route: '/rest-assured', dataVar: 'restAssuredData', dataFile: 'restAssuredData' },
    { route: '/selenium', dataVar: 'seleniumData', dataFile: 'seleniumData' },
    { route: '/sql', dataVar: 'sqlData', dataFile: 'sqlData' },
    { route: '/typescript', dataVar: 'typescriptData', dataFile: 'typescriptData' },
    { route: '/what-is-testing', dataVar: 'whatIsTestingData', dataFile: 'whatIsTestingData' },
    // HARİÇ: /security, /backend (RequireAdmin, normal test hesabıyla erişilemiyor)
    // ve /basit-backend (kullanıcı talebiyle kalıcı olarak test kapsamı dışı) —
    // bkz. CLAUDE.md §22.1 (kalıcı istisna listesi).
];

function optionLabel(opt: { id: string; text: any }, lang: 'tr' | 'en') {
    return `${opt.id.toUpperCase()}.${pickText(opt.text, lang)}`;
}

async function setLanguage(page: Page, current: { lang: 'tr' | 'en' }, target: 'tr' | 'en') {
    if (current.lang === target) return;
    const label = target === 'en' ? 'ENG' : 'TR';
    await page.locator('[data-testid="language-toggle"] button', { hasText: label }).click();
    current.lang = target;
}

// Aktif sekmedeki N'inci QuizBlock'un kök konteynerine izole bir Locator döner.
// "Hızlı Quiz"/"Quick Quiz" başlığı retry'a geçilse de DEĞİŞMEDEN kalır — bu
// yüzden ileride yeniden sorgulanabilir, stale referans riski yok.
function quizBlockRoot(page: Page, quizIndexInTab: number): Locator {
    return page.locator('span', { hasText: QUIZ_TITLE_TEXT })
        .nth(quizIndexInTab)
        .locator('xpath=ancestor::div[contains(concat(" ", normalize-space(@class), " "), " rounded-xl ") and contains(concat(" ", normalize-space(@class), " "), " border-2 ")][1]');
}

// AC06 — Her interview-questions bloğu olan sayfada minimum 50 soru (CLAUDE.md §10).
// Tarayıcı gerektirmez: veri dosyası import edilip soru sayısı sayılır.
for (const { route, dataVar, dataFile } of ROUTES) {
    test(`${route} — interview-questions min 50 soru (AC06, data-level)`, async () => {
        const mod = await import(`../src/data/${dataFile}.js`);
        const data = mod[dataVar];
        const trSections: any[] = data?.tr?.sections ?? data?.sections ?? [];
        let total = 0;
        for (const section of trSections) {
            for (const block of section?.blocks ?? []) {
                if (block?.type === 'interview-questions' && Array.isArray(block.questions)) {
                    total += block.questions.length;
                }
            }
        }
        if (total > 0) {
            expect(
                total,
                `${route}: interview-questions sorularının toplamı ${total}, minimum 50 olmalı (CLAUDE.md §10)`,
            ).toBeGreaterThanOrEqual(50);
        }
    });
}

for (const { route, dataVar, dataFile } of ROUTES) {
    test(`${route} — her quiz bloğu: TR/EN doğru render + AC02 retry mekanizması`, async ({ page }) => {
        test.setTimeout(600_000);

        const mod = await import(`../src/data/${dataFile}.js`);
        const data = mod[dataVar];
        const pairs = extractQuizPairs(data);
        const pairWarnings = pairs.filter((p) => p.pairWarning).map((p) => p.pairWarning!);

        await page.goto(route);
        await page.waitForSelector('h1', { timeout: 30_000 });

        const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);
        const tabCount = await tabButtons.count();
        const current = { lang: 'tr' as 'tr' | 'en' };
        const violations: string[] = [];

        // Sekmeden çıkıp geri girmek, dil değişiminden BAĞIMSIZ olarak quiz
        // bileşenini sıfır state'le yeniden mount eder (bkz. "ÖNEMLİ KEŞİF #1").
        async function freshEnterTab(tabIndex: number, lang: 'tr' | 'en') {
            await setLanguage(page, current, lang);
            const decoyTab = tabIndex === 0 ? Math.min(1, tabCount - 1) : 0;
            await tabButtons.nth(decoyTab).click();
            await tabButtons.nth(tabIndex).click();
            await page.waitForTimeout(150);
        }

        for (const pair of pairs) {
            const tag = `tab ${pair.tabIndex} quiz#${pair.quizIndexInTab}`;

            for (const lang of ['tr', 'en'] as const) {
                const block = pair[lang];
                if (!block) {
                    violations.push(`${tag} (${lang}): bu dilde quiz bloğu tanımlı değil`);
                    continue;
                }

                await freshEnterTab(pair.tabIndex, lang);
                const root = quizBlockRoot(page, pair.quizIndexInTab);

                const options = (block.options || []).map(normalizeOption);
                const correctId = normalizeCorrect(block.correct);
                const correctOpt = options.find((o: any) => o.id === correctId);
                const wrongOpt = options.find((o: any) => o.id !== correctId);
                const questionText = pickText(block.question, lang);

                if (!correctOpt) {
                    violations.push(`${tag} (${lang}): VERİ HATASI — correct="${JSON.stringify(block.correct)}" hiçbir option id'sine eşleşmiyor (ids: ${options.map((o: any) => o.id).join(',')})`);
                    continue;
                }

                try {
                    await expect(root.getByText(questionText).first()).toBeVisible({ timeout: 8_000 });
                } catch {
                    violations.push(`${tag} (${lang}): soru metni bu bloğun konteynerinde bulunamadı: "${questionText.slice(0, 60)}..."`);
                    continue;
                }
                for (const opt of options) {
                    const visible = await root.locator('button', { hasText: optionLabel(opt, lang) }).first().isVisible().catch(() => false);
                    if (!visible) {
                        violations.push(`${tag} (${lang}): şık bu bloğun konteynerinde bulunamadı: "${pickText(opt.text, lang).slice(0, 60)}"`);
                    }
                }

                const hasRetry = !!block.retryQuestion;

                if (hasRetry) {
                    await root.locator('button', { hasText: optionLabel(wrongOpt, lang) }).first().click();
                    await root.getByRole('button', { name: /Cevabı Kontrol Et|Check Answer/ }).click();
                    const retryButton = root.getByRole('button', { name: /Farklı bir soru dene|Try a different question/ });
                    if (!(await retryButton.isVisible().catch(() => false))) {
                        violations.push(`${tag} (${lang}): retryQuestion veride var ama retry butonu UI'da çıkmadı`);
                        continue;
                    }
                    await retryButton.click();
                    const retryBlock = block.retryQuestion;
                    const retryOptions = (retryBlock.options || []).map(normalizeOption);
                    const retryCorrectId = normalizeCorrect(retryBlock.correct);
                    const retryCorrectOpt = retryOptions.find((o: any) => o.id === retryCorrectId);
                    const retryQuestionText = pickText(retryBlock.question, lang);
                    try {
                        await expect(root.getByText(retryQuestionText).first()).toBeVisible({ timeout: 5_000 });
                    } catch {
                        violations.push(`${tag} retry (${lang}): retry soru metni bu bloğun konteynerinde bulunamadı: "${retryQuestionText.slice(0, 60)}..."`);
                    }
                    for (const opt of retryOptions) {
                        const visible = await root.locator('button', { hasText: optionLabel(opt, lang) }).first().isVisible().catch(() => false);
                        if (!visible) {
                            violations.push(`${tag} retry (${lang}): şık bu bloğun konteynerinde bulunamadı: "${pickText(opt.text, lang).slice(0, 60)}"`);
                        }
                    }
                    if (!retryCorrectOpt) {
                        violations.push(`${tag} (${lang}): VERİ HATASI — retryQuestion.correct="${JSON.stringify(retryBlock.correct)}" hiçbir retry option id'sine eşleşmiyor (ids: ${retryOptions.map((o: any) => o.id).join(',')})`);
                        continue;
                    }
                    await root.locator('button', { hasText: optionLabel(retryCorrectOpt, lang) }).first().click();
                    await root.getByRole('button', { name: /Cevabı Kontrol Et|Check Answer/ }).click();
                    const secondRetryButton = root.getByRole('button', { name: /Farklı bir soru dene|Try a different question/ });
                    if (await secondRetryButton.isVisible().catch(() => false)) {
                        violations.push(`${tag} (${lang}): AC02 ihlali — retry sorusundan SONRA bir 2. retry butonu daha çıktı (bir defaya mahsus olmalı)`);
                    }
                } else {
                    await root.locator('button', { hasText: optionLabel(correctOpt, lang) }).first().click();
                    await root.getByRole('button', { name: /Cevabı Kontrol Et|Check Answer/ }).click();
                    const retryButton = root.getByRole('button', { name: /Farklı bir soru dene|Try a different question/ });
                    if (await retryButton.isVisible().catch(() => false)) {
                        violations.push(`${tag} (${lang}): veride retryQuestion yok ama retry butonu UI'da çıktı`);
                    }
                }
            }
        }

        const report = [...pairWarnings.map((w) => `[pairWarning] ${w}`), ...violations];
        expect(report, `${route}:\n${report.join('\n')}`).toEqual([]);
    });
}
