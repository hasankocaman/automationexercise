import { test, expect, type Page, type Locator } from '@playwright/test';
import { seleniumData } from '../src/data/seleniumData.js';

// Challenge-First görev zinciri (Documents/challenge-first-experience-plan.md
// §3, Phase 1) — `mission` blok tipinin GERÇEK TARAYICIDA render + etkileşim
// testi (P1-S3). Şema statik olarak `audit-learning-blocks.mjs` ile
// doğrulanıyor; bu test adım-kilidinin SIRAYLA açıldığını, "Mini-lesson aç"
// düğmesinin çalıştığını ve TÜM adımlar bitince tamamlanma + XP'nin
// localStorage'a gerçekten yazıldığını doğrular (kayıt kopması / renderer
// regresyonu yakalanır — bkz. tests/learning-blocks-render.spec.ts, aynı kalıp).
//
// Veri-güdümlü: hangi sekmede mission olduğu ve her adımın doğru cevabı/
// solutionCode'u seleniumData'dan HESAPLANIR — içerik değişirse test kendini
// düzeltir, sabit metin gömülmez. Referans görev: seleniumData.js
// `seleniumLoginMission` (Locators sekmesi). Yeni route açılmadı → §22.1
// istisna listesi değişmez.
// ÖNEMLİ: serviceWorkers: 'block' (MSW/route çakışması, diğer testlerdeki gerekçe).

const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';

type Bilingual = { tr?: string; en?: string } | string;
type PredictionOption = { label: Bilingual; correct?: boolean };
type MissionStepBlock = {
    type: string;
    options?: PredictionOption[];
    solutionCode?: Bilingual;
};
type MissionStep = { id?: string; miniLesson?: Bilingual; block?: MissionStepBlock };
type MissionBlockData = { type: string; id?: string; steps?: MissionStep[] };
type Block = { type: string; id?: string };

// javaData/seleniumData çift-ağaçlı (tr/en); TR ağacındaki section index'i
// tab index'i ile eşleşir (learning-blocks-render.spec.ts ile aynı ilke).
const sections = seleniumData.tr.sections as { blocks?: Block[] }[];

function findSectionWith(pred: (blocks: Block[]) => boolean): number {
    return sections.findIndex((s) => Array.isArray(s.blocks) && pred(s.blocks));
}

function tr(val: Bilingual | undefined): string {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    return val.tr ?? val.en ?? '';
}

function escapeRe(s: string): RegExp {
    return new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
}

async function gotoSeleniumTab(page: Page, tabIndex: number) {
    await page.goto('/selenium');
    await page.waitForSelector('h1', { timeout: 30_000 });
    const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);
    await expect(tabButtons.nth(tabIndex)).toBeVisible();
    await tabButtons.nth(tabIndex).click();
}

// Tek bir mission adımını (prediction ya da code-playground) tamamlar.
async function completeStep(stepContainer: Locator, step: MissionStep) {
    const block = step.block!;
    if (block.type === 'prediction') {
        const correctOpt = block.options!.find((o) => o.correct)!;
        const label = tr(correctOpt.label);
        await stepContainer.getByRole('button', { name: escapeRe(label) }).first().click();
        await stepContainer.getByRole('button', { name: /Tahminimi Onayla/ }).click();
        await expect(stepContainer.getByText(/Doğru tahmin/)).toBeVisible();
    } else if (block.type === 'code-playground') {
        const solution = tr(block.solutionCode);
        const textarea = stepContainer.locator('textarea').first();
        await textarea.waitFor({ state: 'visible', timeout: 10_000 });
        await textarea.fill(solution);
        await stepContainer.getByRole('button', { name: /Çalıştır ve Kontrol Et/i }).click();
        await expect(stepContainer.getByText(/Doğru! Kod beklenen çözümle eşleşti/i)).toBeVisible();
    } else {
        throw new Error(`Bilinmeyen mission adım blok tipi: ${block.type}`);
    }
}

test.describe('Challenge-first görev zinciri (mission) — /selenium referans görevi', () => {
    test('adım kilidi sırayla açılıyor, mini-lesson çalışıyor, tüm adımlar bitince tamamlanma + XP kaydediliyor', async ({ browser }) => {
        test.setTimeout(120_000);

        const tabIndex = findSectionWith((bl) => bl.some((b) => b.type === 'mission'));
        expect(tabIndex, 'seleniumData\'da mission içeren sekme bulunamadı').toBeGreaterThanOrEqual(0);

        const missionBlockData = sections[tabIndex].blocks!.find((b) => b.type === 'mission') as unknown as MissionBlockData;
        const steps = missionBlockData.steps!;
        expect(steps.length, 'referans görevde en az 3 adım olmalı (plan §3.2)').toBeGreaterThanOrEqual(3);

        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoSeleniumTab(page, tabIndex);

        const missionRoot = page.locator(`[data-testid="mission-block"][data-mission-id="${missionBlockData.id}"]`);
        await expect(missionRoot).toBeVisible();

        const stepContainers = missionRoot.locator('[data-testid="mission-step"]');
        await expect(stepContainers).toHaveCount(steps.length);

        // Başlangıç durumu: sadece ilk adım kilidi açık, geri kalanı 🔒 kilitli.
        await expect(stepContainers.nth(0)).toHaveAttribute('data-step-locked', 'false');
        for (let i = 1; i < steps.length; i++) {
            await expect(stepContainers.nth(i)).toHaveAttribute('data-step-locked', 'true');
        }

        // "Takıldın mı? Mini-lesson aç" — challenge-first çekirdeği. İlk adımda
        // aç, veriden gelen metnin göründüğünü doğrula, sonra kapat.
        const firstMiniLesson = tr(steps[0].miniLesson);
        expect(firstMiniLesson.length, 'ilk adımın miniLesson metni boş olmamalı').toBeGreaterThan(0);
        await stepContainers.nth(0).getByRole('button', { name: /Mini-lesson aç/ }).click();
        await expect(stepContainers.nth(0).getByTestId('mission-mini-lesson')).toContainText(firstMiniLesson.slice(0, 30));
        await stepContainers.nth(0).getByRole('button', { name: /Mini-lesson.*kapat/ }).click();
        await expect(stepContainers.nth(0).getByTestId('mission-mini-lesson')).toHaveCount(0);

        // Adımları SIRAYLA tamamla; her adım bitince bir SONRAKİNİN kilidinin
        // açıldığını (mevcutsa) doğrula — "adım kilidi sırayla açılıyor" kanıtı.
        for (let i = 0; i < steps.length; i++) {
            await completeStep(stepContainers.nth(i), steps[i]);
            await expect(stepContainers.nth(i)).toHaveAttribute('data-step-done', 'true');
            if (i + 1 < steps.length) {
                await expect(stepContainers.nth(i + 1)).toHaveAttribute('data-step-locked', 'false');
            }
        }

        // Tüm adımlar bitince: tamamlanma banner'ı + XP/completed localStorage'a yazılır.
        await expect(missionRoot).toHaveAttribute('data-mission-complete', 'true');
        await expect(missionRoot.getByTestId('mission-complete-banner')).toBeVisible();
        await expect(missionRoot.getByTestId('mission-complete-banner')).toContainText(/Görev tamamlandı/);

        const xpState = await page.evaluate(() => {
            const raw = localStorage.getItem('learnqa_xp_selenium');
            return raw ? JSON.parse(raw) : null;
        });
        expect(xpState?.completed, 'mission id XP completed listesine yazılmalı').toContain(missionBlockData.id);
        expect(xpState?.xp, 'görev tamamlanınca XP artmalı').toBeGreaterThan(0);

        await context.close();
    });
});
