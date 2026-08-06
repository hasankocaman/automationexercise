import { test, expect, type Locator, type Page } from '@playwright/test';
import { javaData } from '../src/data/javaData.js';
import { waitForAppReady } from './helpers/app-ready';

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

// ─────────────────────────────────────────────────────────────────────────────
// NEDEN "Adım 1/" DOĞRULANMAZ
//
// heap-stack ve code-trace blokları ▶ Başlat'a basıldığında otomatik oynatmaya
// geçer: sayaç 1100-1300 ms'de bir kendiliğinden ilerler. Yani "Adım 1/" ekranda
// yalnızca ~1 saniye durur ve BİR DAHA GERİ GELMEZ. Doğrulama o pencereyi
// kaçırırsa (paralel worker'lar CPU'yu paylaşırken sık olur) test, ürün doğru
// çalıştığı hâlde "element bulunamadı" der. Kaybolan bir anı doğrulamak,
// zamanlamayı ürünün davranışına değil makinenin yüküne bağlar.
//
// Bunun yerine iki KALICI gerçek doğrulanır:
//   1. Başlat'tan sonra adım sayacı VAR (yürüyüş gerçekten başladı),
//   2. Sıfırla → İleri → İleri zinciri sayacı 1'den 2'ye taşır (adımlama
//      gerçekten çalışıyor). Sıfırla otomatik oynatmayı durdurduğu için bu
//      zincirde hiçbir zamanlayıcı yoktur — sonuç makineden bağımsızdır.
// ─────────────────────────────────────────────────────────────────────────────
async function assertStepWalkthrough(page: Page, blockRoot: Locator) {
    const counter = blockRoot.getByText(/Adım\s*\d+\s*\/\s*\d+/);

    await blockRoot.getByRole('button', { name: /Başlat/ }).click();
    await expect(counter, 'Başlat sonrası adım sayacı görünmedi').toBeVisible();

    // ↺ Sıfırla → başlamamış duruma dön (sayaç yalnızca `started` iken basılır).
    await blockRoot.getByRole('button', { name: /Sıfırla/ }).click();
    await expect(counter, 'Sıfırla sonrası sayaç hâlâ duruyor').toHaveCount(0);

    // ⏭ İleri otomatik oynatmayı BAŞLATMAZ; her tıklama tam bir adım ilerletir.
    const next = blockRoot.getByRole('button', { name: /İleri/ });
    await next.click();
    await expect(counter, 'İlk İleri adım 1\'e getirmeliydi').toHaveText(/Adım\s*1\s*\/\s*\d+/);
    await next.click();
    await expect(counter, 'İkinci İleri adım 2\'ye getirmeliydi').toHaveText(/Adım\s*2\s*\/\s*\d+/);
}

async function gotoJavaTab(page: Page, tabIndex: number) {
    await page.goto('/java');
    await waitForAppReady(page, { timeout: 30_000 });
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
        await assertStepWalkthrough(page, page.getByTestId('heap-stack-block').first());

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
        await assertStepWalkthrough(page, page.getByTestId('code-trace-block').first());

        await context.close();
    });
});
