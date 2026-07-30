import { test, expect, type Page } from '@playwright/test';
import { javaData } from '../src/data/javaData.js';

// Öğrenme Bilimi Yükseltmesi (Documents/learning-science-upgrade-plan.md) —
// prediction / code-trace / heap-stack blok tiplerinin GERÇEK TARAYICIDA RENDER +
// ETKİLEŞİM testi. Bu üç blok tipi planın amiral gemisi teslimatıydı (Dalga 1/2)
// ama hiçbir render testi yoktu — sadece şema `audit-learning-blocks.mjs` ile
// statik doğrulanıyordu. Bu test blokların TopicPage'de gerçekten render edilip
// etkileşime girdiğini kilitler (kayıt kopması / renderer regresyonu yakalanır).
//
// Veri-güdümlü: hangi sekmede hangi blok olduğu javaData'dan HESAPLANIR (sabit tab
// index'i gömülmez) — içerik kayarsa test kendini düzeltir.
// ÖNEMLİ: serviceWorkers: 'block' (MSW/route çakışması, diğer testlerdeki gerekçe).

const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';

type Block = { type: string; id?: string; options?: { correct?: boolean; label: unknown }[] };

// javaData çift-ağaçlı (tr/en); TR ağacındaki section index'i tab index'i ile eşleşir.
const sections = javaData.tr.sections as { blocks?: Block[] }[];

function findSectionWith(pred: (blocks: Block[]) => boolean): number {
    return sections.findIndex((s) => Array.isArray(s.blocks) && pred(s.blocks));
}

function labelText(label: unknown): string {
    if (label && typeof label === 'object') return String((label as { tr?: string }).tr ?? (label as { en?: string }).en ?? '');
    return String(label ?? '');
}

async function gotoJavaTab(page: Page, tabIndex: number) {
    await page.goto('/java');
    await page.waitForSelector('h1', { timeout: 30_000 });
    const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);
    await expect(tabButtons.nth(tabIndex)).toBeVisible();
    await tabButtons.nth(tabIndex).click();
}

test.describe('Öğrenme-blok render (prediction / code-trace / heap-stack) — /java', () => {
    test('prediction bloğu render olur, tahmin kilitlenince doğru sonuç + reveal açılır', async ({ browser }) => {
        test.setTimeout(60_000);
        const tabIndex = findSectionWith((bl) => bl.some((b) => b.type === 'prediction'));
        expect(tabIndex, 'javaData\'da prediction içeren sekme bulunamadı').toBeGreaterThanOrEqual(0);

        const predBlock = sections[tabIndex].blocks!.find((b) => b.type === 'prediction')!;
        const correctOpt = predBlock.options!.find((o) => o.correct)!;
        const correctLabel = labelText(correctOpt.label);

        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoJavaTab(page, tabIndex);

        // "Önce Tahmin Et" başlığı prediction bloğunun render olduğunu kanıtlar.
        await expect(page.getByText('Önce Tahmin Et').first()).toBeVisible();

        // Doğru şıkkı seç → onayla → "Doğru tahmin" + reveal açılmalı.
        await page.getByRole('button', { name: new RegExp(correctLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }).first().click();
        await page.getByRole('button', { name: /Tahminimi Onayla/ }).first().click();
        await expect(page.getByText(/Doğru tahmin/).first()).toBeVisible();

        await context.close();
    });

    test('heap-stack bloğu render olur, Başlat ile Stack/Heap kolonları canlanır', async ({ browser }) => {
        test.setTimeout(60_000);
        const tabIndex = findSectionWith((bl) => bl.some((b) => b.type === 'heap-stack'));
        expect(tabIndex, 'javaData\'da heap-stack içeren sekme bulunamadı').toBeGreaterThanOrEqual(0);

        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoJavaTab(page, tabIndex);

        await expect(page.getByText('STACK').first()).toBeVisible();
        await expect(page.getByText('HEAP').first()).toBeVisible();
        // ▶ Başlat → adım sayacı görünür (bellek modeli canlandı).
        await page.getByRole('button', { name: /Başlat/ }).first().click();
        await expect(page.getByText(/Adım\s*1\//).first()).toBeVisible();

        await context.close();
    });

    test('code-trace bloğu render olur, Başlat ile satır satır yürüyüş başlar', async ({ browser }) => {
        test.setTimeout(60_000);
        const tabIndex = findSectionWith((bl) => bl.some((b) => b.type === 'code-trace'));
        expect(tabIndex, 'javaData\'da code-trace içeren sekme bulunamadı').toBeGreaterThanOrEqual(0);

        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoJavaTab(page, tabIndex);

        // "Değişkenler" paneli code-trace bloğuna özgü (heap-stack'te STACK/HEAP var).
        await expect(page.getByText('Değişkenler').first()).toBeVisible();
        await page.getByRole('button', { name: /Başlat/ }).first().click();
        await expect(page.getByText(/Adım\s*1\//).first()).toBeVisible();

        await context.close();
    });
});
