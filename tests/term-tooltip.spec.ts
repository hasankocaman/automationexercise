import { test, expect, type Page } from '@playwright/test';
import { seleniumData } from '../src/data/seleniumData.js';
import { TERM_GLOSSARY } from '../src/data/termGlossary.js';
import { waitForAppReady } from './helpers/app-ready';

// Kavram Tooltip'i (Documents/challenge-first-experience-plan.md §3.6, Phase
// 1.5) — yazılım bilmeyen kullanıcı için inline günlük-hayat benzetmesi
// baloncuklarının GERÇEK TARAYICIDA render + etkileşim testi (P1.5-S3).
// Doğrular: bilinen bir terimin noktalı-çizgili sarıldığını, hover/tap ile
// popover'ın açılıp benzetme metnini gösterdiğini, ESC ile kapandığını ve
// kod bloğu (<pre>) İÇİNDEKİ metnin ASLA sarılmadığını (highlightGlossaryTerms
// yalnızca 'text'/'simple-box' render'larına bağlı, TopicPage.jsx).
//
// Veri-güdümlü: hangi sekmede hangi terimin geçtiği TERM_GLOSSARY + seleniumData
// TARANARAK bulunur (sabit tab index/terim gömülmez) — içerik değişirse test
// kendini düzeltir (tests/learning-blocks-render.spec.ts ile aynı ilke).
// ÖNEMLİ: serviceWorkers: 'block' (MSW/route çakışması, diğer testlerdeki gerekçe).

const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';

type Bilingual = { tr?: string; en?: string } | string;
type Block = { type: string; content?: Bilingual };
type Section = { blocks?: Block[] };

function tr(val: Bilingual | undefined): string {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    return val.tr ?? val.en ?? '';
}

function escapeRegex(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\/-]/g, '\\$&');
}

// TERM_GLOSSARY'deki TÜM yüzey formlarını birleştiren tek regex — aynı
// TopicPage.jsx/TermTooltip.jsx mantığı, testte bağımsız yeniden kurulur.
const ALL_SURFACES = Object.values(TERM_GLOSSARY).flatMap((e) => e.aliases as string[]);
ALL_SURFACES.sort((a, b) => b.length - a.length);
const TERM_REGEX = new RegExp(`\\b(?:${ALL_SURFACES.map(escapeRegex).join('|')})\\b`, 'i');

// seleniumData'da hem (a) prose (text/simple-box) içinde bilinen bir terim
// geçen HEM DE (b) bir 'code' bloğu olan İLK sekmeyi bulur — böylece aynı
// sekmede hem "sarılmalı" hem "sarılmamalı" durumunu birlikte test edebiliriz.
function findTabWithTermAndCode(): number {
    const sections = seleniumData.tr.sections as Section[];
    for (let i = 0; i < sections.length; i++) {
        const blocks = sections[i].blocks;
        if (!Array.isArray(blocks)) continue;
        const hasCode = blocks.some((b) => b.type === 'code');
        if (!hasCode) continue;
        const hasTermInProse = blocks.some((b) => {
            if (b.type !== 'text' && b.type !== 'simple-box') return false;
            return TERM_REGEX.test(tr(b.content));
        });
        if (hasTermInProse) return i;
    }
    return -1;
}

async function gotoSeleniumTab(page: Page, tabIndex: number) {
    await page.goto('/selenium');
    await waitForAppReady(page, { timeout: 30_000 });
    const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);
    await expect(tabButtons.nth(tabIndex)).toBeVisible();
    await tabButtons.nth(tabIndex).click();
}

test.describe('Kavram Tooltip\'i (term-tooltip) — /selenium', () => {
    test('bilinen terim noktalı-çizgili sarılıyor; hover ile popover açılır, benzetme metnini gösterir, ESC ile kapanır', async ({ browser }) => {
        test.setTimeout(60_000);

        const tabIndex = findTabWithTermAndCode();
        expect(tabIndex, 'seleniumData\'da hem bilinen terim hem kod bloğu içeren sekme bulunamadı').toBeGreaterThanOrEqual(0);

        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoSeleniumTab(page, tabIndex);

        const triggers = page.getByTestId('term-tooltip-trigger');
        await expect(triggers.first()).toBeVisible();
        const triggerCount = await triggers.count();
        expect(triggerCount, 'sayfada en az 1 tooltip tetikleyici olmalı').toBeGreaterThan(0);

        const firstTrigger = triggers.first();
        const key = await firstTrigger.getAttribute('data-term-key');
        expect(key, 'tetikleyicinin data-term-key özniteliği olmalı').toBeTruthy();

        // Hover ile popover açılır ve benzetme metnini gösterir (boş olmamalı).
        await firstTrigger.hover();
        const popover = page.getByTestId('term-tooltip-popover');
        await expect(popover).toBeVisible();
        const popoverText = await popover.innerText();
        expect(popoverText.trim().length, 'popover içeriği boş olmamalı').toBeGreaterThan(5);

        // ESC ile kapanır; fare önce tetikleyiciden UZAKLAŞTIRILIR ki sonraki
        // adımda imleç orada kalmış olmasın (aksi halde hover tekrar açar).
        await page.keyboard.press('Escape');
        await page.mouse.move(0, 0);
        await expect(popover).toHaveCount(0);

        // Klavye erişilebilirliği: TAB ile fokuslanınca da popover açılmalı
        // (onFocus), fokus kaybedilince kapanmalı (onBlur) — plan §3.6.1
        // "hover VE focus (klavye) VE tap" gereksinimi.
        await firstTrigger.focus();
        await expect(page.getByTestId('term-tooltip-popover')).toBeVisible();
        await firstTrigger.blur();
        await expect(page.getByTestId('term-tooltip-popover')).toHaveCount(0);

        await context.close();
    });

    test('kod bloğu (<pre>) içindeki metin tooltip ile SARILMAZ', async ({ browser }) => {
        test.setTimeout(60_000);

        const tabIndex = findTabWithTermAndCode();
        expect(tabIndex).toBeGreaterThanOrEqual(0);

        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoSeleniumTab(page, tabIndex);

        const codeBlocks = page.locator('pre');
        const codeCount = await codeBlocks.count();
        expect(codeCount, 'sekmede en az 1 kod bloğu (<pre>) olmalı').toBeGreaterThan(0);

        for (let i = 0; i < codeCount; i++) {
            await expect(codeBlocks.nth(i).locator('[data-testid="term-tooltip-trigger"]')).toHaveCount(0);
        }

        await context.close();
    });
});
