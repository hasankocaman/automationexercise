import { test, expect, type Page, type Locator } from '@playwright/test';
import { stubPlausible, recordedEvents } from './helpers/analytics';

// SEO Faz 2 / S2 — `mission` yayılımıyla eklenen 6 sayfanın görev zincirleri.
//
// `mission-flow.spec.ts` yalnızca REFERANS görevi (/selenium) uçtan uca
// oynatıyordu; S2'de eklenen 6 sayfanın görevleri hiçbir tarayıcı testinde
// açılmıyordu. `audit-learning-blocks.mjs` bunları SAYIYOR ve şemasını
// denetliyor ama "gerçekten çözülebiliyor mu" sorusuna cevap vermiyor —
// bozuk bir `solutionCode` veya yanlış `correct` bayrağı statik denetimden
// geçer, kullanıcıda çıkmaza dönüşür.
//
// Her sayfa için görev UÇTAN UCA oynatılır: adım kilidi sırayla açılır, tüm
// adımlar bitince tamamlanma + XP + `mission_completed` ölçüm olayı doğrulanır.

const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';

type Bilingual = { tr?: string; en?: string } | string;
type PredictionOption = { label: Bilingual; correct?: boolean };
type StepBlock = { type: string; options?: PredictionOption[]; solutionCode?: Bilingual };
type MissionStep = { id?: string; block?: StepBlock };
type MissionData = { type: string; id?: string; steps?: MissionStep[] };
type Block = { type: string };
type Section = { blocks?: Block[] };

// `mission` bloğu taşıyan TÜM ders sayfaları — yalnızca S2'de eklenen 6'sı
// değil. Yeni bir sayfaya görev eklenirse buraya da eklenmeli; aksi hâlde o
// görev hiçbir tarayıcı testinde açılmaz.
// HARİÇ: `sprintsData` (6 bug görevi) — onlar `/sprint` panosunda yaşıyor ve
// `sprint-flow.spec.ts`te uçtan uca oynatılıyor.
const PAGES: Array<{ route: string; dataFile: string; dataVar: string }> = [
    // S2 ile eklenenler
    { route: '/docker', dataFile: 'dockerData', dataVar: 'dockerData' },
    { route: '/jenkins', dataFile: 'jenkinsData', dataVar: 'jenkinsData' },
    { route: '/git-github', dataFile: 'gitGithubData', dataVar: 'gitGithubData' },
    { route: '/java', dataFile: 'javaData', dataVar: 'javaData' },
    { route: '/postman', dataFile: 'postmanData', dataVar: 'postmanData' },
    { route: '/linux', dataFile: 'linuxData', dataVar: 'linuxData' },
    // S2 ÖNCESİNDEN var olanlar — bunların da yalnızca /selenium'un İLK görevi
    // test ediliyordu (mission-flow.spec.ts), geri kalanı hiç açılmıyordu.
    { route: '/selenium', dataFile: 'seleniumData', dataVar: 'seleniumData' },
    { route: '/playwright', dataFile: 'playwrightData', dataVar: 'playwrightData' },
    { route: '/cypress', dataFile: 'cypressData', dataVar: 'cypressData' },
    { route: '/python', dataFile: 'pythonData', dataVar: 'pythonData' },
    { route: '/sql', dataFile: 'sqlData', dataVar: 'sqlData' },
    { route: '/rest-assured', dataFile: 'restAssuredData', dataVar: 'restAssuredData' },
];

function tr(val: Bilingual | undefined): string {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    return val.tr ?? val.en ?? '';
}

// Seçenek etiketiyle butonu bulur. `getByRole(name: RegExp)` BİLEREK
// kullanılmıyor: bazı etiketler çift tırnak içeriyor (örn. pythonData'daki
// `En alttaki satırda ("KeyError: 'email'")`) ve regex, Playwright'ın iç
// seçici dizesine gömülünce ayrıştırma hatası veriyor. `hasText` düz string
// alır, boşluğu normalize eder ve tırnak sorunu yaşatmaz.
function optionButton(stepContainer: Locator, label: string): Locator {
    return stepContainer.locator('button').filter({ hasText: label }).first();
}

// Veri dosyaları iki kalıptan biri: çift ağaçlı (`data.tr.sections`) veya tek
// ağaçlı (`data.sections`). İkisini de destekle — sayfa eklendikçe hangisinin
// kullanıldığını hatırlamak zorunda kalmayalım.
function sectionsOf(data: any): Section[] {
    const s = data?.tr?.sections ?? data?.sections;
    if (!Array.isArray(s)) throw new Error('sections dizisi bulunamadı');
    return s;
}

async function completeStep(stepContainer: Locator, step: MissionStep) {
    const block = step.block!;
    if (block.type === 'prediction') {
        const correctOpt = block.options!.find((o) => o.correct)!;
        await optionButton(stepContainer, tr(correctOpt.label)).click();
        await stepContainer.getByRole('button', { name: /Tahminimi Onayla/ }).click();
        await expect(stepContainer.getByText(/Doğru tahmin/)).toBeVisible();
    } else if (block.type === 'code-playground') {
        const textarea = stepContainer.locator('textarea').first();
        await textarea.waitFor({ state: 'visible', timeout: 15_000 });
        await textarea.fill(tr(block.solutionCode));
        await stepContainer.getByRole('button', { name: /Çalıştır ve Kontrol Et/i }).click();
        await expect(stepContainer.getByText(/Doğru! Kod beklenen çözümle eşleşti/i)).toBeVisible();
    } else {
        throw new Error(`Bilinmeyen mission adım blok tipi: ${block.type}`);
    }
}

// xp.js depolama anahtarı sayfanın ilk URL segmentinden türer.
function xpKeyFor(route: string): string {
    return `learnqa_xp_${route.replace(/^\//, '').toLowerCase()}`;
}

test.describe('Ders görevleri (mission) — her sayfadaki her görev uçtan uca çözülebiliyor', () => {
    for (const { route, dataFile, dataVar } of PAGES) {
        test(`${route} — sayfadaki TÜM görev zincirleri tamamlanıyor`, async ({ browser }) => {
            // Ağır veri dosyaları (javaData ~1 MB) dev modda ilk derlemede yavaş;
            // ayrıca bazı sayfalarda 2 ayrı görev sırayla oynatılıyor.
            test.setTimeout(240_000);

            const mod = await import(`../src/data/${dataFile}.js`);
            const sections = sectionsOf(mod[dataVar] ?? mod.default);

            // Sayfadaki TÜM görevler, bulundukları sekme indeksiyle birlikte.
            const missions: Array<{ tabIndex: number; mission: MissionData }> = [];
            sections.forEach((s, tabIndex) => {
                for (const b of s.blocks || []) {
                    if (b.type === 'mission') missions.push({ tabIndex, mission: b as unknown as MissionData });
                }
            });
            expect(missions.length, `${route}: hiç mission bloğu bulunamadı`).toBeGreaterThan(0);

            const context = await browser.newContext({ serviceWorkers: 'block' });
            const page = await context.newPage();
            await stubPlausible(page);

            await page.goto(route);
            await page.waitForSelector('h1', { timeout: 60_000 });
            const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);

            for (const { tabIndex, mission } of missions) {
                const steps = mission.steps!;
                expect(steps.length, `${route}/${mission.id}: görevde en az 3 adım olmalı`).toBeGreaterThanOrEqual(3);

                await expect(tabButtons.nth(tabIndex)).toBeVisible({ timeout: 30_000 });
                await tabButtons.nth(tabIndex).click();

                const missionRoot = page.locator(`[data-testid="mission-block"][data-mission-id="${mission.id}"]`);
                await expect(missionRoot, `${route}/${mission.id}: görev bloğu render edilmedi`)
                    .toBeVisible({ timeout: 30_000 });

                const stepContainers = missionRoot.locator('[data-testid="mission-step"]');
                await expect(stepContainers).toHaveCount(steps.length);

                // Başlangıçta yalnızca ilk adım açık — kilit her sayfada gerçekten kurulu mu?
                await expect(stepContainers.nth(0)).toHaveAttribute('data-step-locked', 'false');
                if (steps.length > 1) {
                    await expect(stepContainers.nth(1)).toHaveAttribute('data-step-locked', 'true');
                }

                for (let i = 0; i < steps.length; i++) {
                    await completeStep(stepContainers.nth(i), steps[i]);
                    await expect(stepContainers.nth(i)).toHaveAttribute('data-step-done', 'true');
                    if (i + 1 < steps.length) {
                        await expect(stepContainers.nth(i + 1), `${route}/${mission.id}: adım ${i + 2} kilidi açılmadı`)
                            .toHaveAttribute('data-step-locked', 'false');
                    }
                }

                await expect(missionRoot).toHaveAttribute('data-mission-complete', 'true');
                await expect(missionRoot.getByTestId('mission-complete-banner')).toBeVisible();

                // XP kaydı: görev id'si o sayfanın KENDİ XP havuzuna yazılır.
                const xpState = await page.evaluate((key) => {
                    const raw = localStorage.getItem(key);
                    return raw ? JSON.parse(raw) : null;
                }, xpKeyFor(route));
                expect(xpState?.completed, `${route}/${mission.id}: XP completed listesine yazılmadı`)
                    .toContain(mission.id);
                expect(xpState?.xp, `${route}: görev tamamlanınca XP artmalı`).toBeGreaterThan(0);

                // Beceri sinyali — portfolyo ve beceri radarı bunu okuyor.
                const signals = await page.evaluate(() =>
                    JSON.parse(localStorage.getItem('learnqa_skill_signals') || '{"signals":[]}').signals);
                expect(
                    signals.some((s: { missionId: string }) => s.missionId === mission.id),
                    `${route}/${mission.id}: beceri sinyali kaydedilmedi`,
                ).toBe(true);

                // S3 — ölçüm olayı her görevde bağlı mı?
                const events = await recordedEvents(page);
                expect(
                    events.some((e) => e.name === 'mission_completed' && e.props.missionId === mission.id),
                    `${route}/${mission.id}: mission_completed olayı gönderilmedi`,
                ).toBe(true);
            }

            await context.close();
        });
    }
});
