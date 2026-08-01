import { test, expect, type Page, type Locator } from '@playwright/test';
import { sprintsData } from '../src/data/sprintsData.js';

// QA Sprint Simulator (Documents/sprint-simulator-and-open-items-plan.md, Faz 1)
// — /sprint sayfasının GERÇEK TARAYICIDA uçtan uca akış testi (O8).
//
// Kapsam: Kanban panosunun 3 kolonu, bug'ın "Sprint'e al" ile Backlog →
// In Progress geçişi, bug detayındaki `mission` görev zincirinin çalışması,
// görev bitince kartın Done'a geçmesi (durumun xp.js'ten TÜRETİLDİĞİ kanıtı —
// plan §2.2 tek-doğruluk ilkesi) ve tüm bug'lar bitince sprint kapanış töreni
// (bonus XP + retrospektif).
//
// Veri-güdümlü: bug sayısı, adım sayısı, doğru cevaplar ve solutionCode
// `sprintsData`dan HESAPLANIR — sabit metin gömülmez, içerik değişirse test
// kendini düzeltir (tests/mission-flow.spec.ts ile aynı ilke).
//
// ÖNEMLİ: serviceWorkers: 'block' (MSW/route çakışması, diğer testlerdeki gerekçe).
// Yeni route eklendi (/sprint) ama §22.1 istisna listesi DEĞİŞMEZ — /sprint
// normal test kapsamındadır.

type Bilingual = { tr?: string; en?: string } | string;
type PredictionOption = { label: Bilingual; correct?: boolean };
type StepBlock = { type: string; options?: PredictionOption[]; solutionCode?: Bilingual };
type MissionStep = { id?: string; miniLesson?: Bilingual; block?: StepBlock };
type Mission = { id?: string; steps?: MissionStep[] };
type Bug = { id: string; key: string; mission: Mission };

const sprint = sprintsData.sprints[0] as unknown as { id: string; bugs: Bug[] };
const bugs = sprint.bugs;

function tr(val: Bilingual | undefined): string {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    return val.tr ?? val.en ?? '';
}

function escapeRe(s: string): RegExp {
    return new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
}

async function gotoSprint(page: Page) {
    await page.goto('/sprint');
    await page.waitForSelector('h1', { timeout: 30_000 });
}

// Tek bir mission adımını (prediction ya da code-playground) tamamlar —
// mission-flow.spec.ts'teki yardımcının aynısı; gömülü bloklar AYNI
// renderBlock makinesinden geçtiği için davranış birebir aynıdır.
async function completeStep(stepContainer: Locator, step: MissionStep) {
    const block = step.block!;
    if (block.type === 'prediction') {
        const correctOpt = block.options!.find((o) => o.correct)!;
        await stepContainer.getByRole('button', { name: escapeRe(tr(correctOpt.label)) }).first().click();
        await stepContainer.getByRole('button', { name: /Tahminimi Onayla/ }).click();
        await expect(stepContainer.getByText(/Doğru tahmin/)).toBeVisible();
    } else if (block.type === 'code-playground') {
        const textarea = stepContainer.locator('textarea').first();
        await textarea.waitFor({ state: 'visible', timeout: 10_000 });
        await textarea.fill(tr(block.solutionCode));
        await stepContainer.getByRole('button', { name: /Çalıştır ve Kontrol Et/i }).click();
        await expect(stepContainer.getByText(/Doğru! Kod beklenen çözümle eşleşti/i)).toBeVisible();
    } else {
        throw new Error(`Bilinmeyen mission adım blok tipi: ${block.type}`);
    }
}

// Bir bug'ı panodan seçip görevinin TÜM adımlarını tamamlar.
async function closeBug(page: Page, bug: Bug) {
    const card = page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${bug.id}"]`);
    await expect(card).toBeVisible();

    // Backlog'daysa önce sprint'e çek; değilse doğrudan aç.
    const status = await card.getAttribute('data-bug-status');
    if (status === 'backlog') {
        await card.getByTestId('sprint-pull-btn').click();
    } else {
        await card.getByTestId('sprint-open-btn').click();
    }

    const detail = page.locator(`[data-testid="sprint-bug-detail"][data-bug-id="${bug.id}"]`);
    await expect(detail).toBeVisible();

    const steps = bug.mission.steps!;
    const stepContainers = detail.locator('[data-testid="mission-step"]');
    await expect(stepContainers).toHaveCount(steps.length);

    for (let i = 0; i < steps.length; i++) {
        await completeStep(stepContainers.nth(i), steps[i]);
        await expect(stepContainers.nth(i)).toHaveAttribute('data-step-done', 'true');
    }

    await expect(detail.locator('[data-testid="mission-block"]')).toHaveAttribute('data-mission-complete', 'true');
}

test.describe('QA Sprint Simulator — /sprint', () => {
    test('pano 3 kolon render ediyor ve bug "Sprint\'e al" ile In Progress\'e geçiyor', async ({ browser }) => {
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoSprint(page);

        // Üç kolon: Backlog / In Progress / Done
        await expect(page.getByTestId('sprint-column')).toHaveCount(3);
        for (const col of ['backlog', 'progress', 'done']) {
            await expect(page.locator(`[data-testid="sprint-column"][data-column="${col}"]`)).toBeVisible();
        }

        // İlk açılışta TÜM bug'lar Backlog'da (hiçbiri çekilmemiş/bitmemiş).
        await expect(page.locator('[data-testid="sprint-bug-card"]')).toHaveCount(bugs.length);
        for (const bug of bugs) {
            await expect(page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${bug.id}"]`))
                .toHaveAttribute('data-bug-status', 'backlog');
        }

        // "Sprint'e al" → kart In Progress'e geçer ve detay paneli açılır.
        const first = bugs[0];
        await page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${first.id}"]`)
            .getByTestId('sprint-pull-btn').click();

        await expect(page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${first.id}"]`))
            .toHaveAttribute('data-bug-status', 'progress');
        await expect(page.locator(`[data-testid="sprint-bug-detail"][data-bug-id="${first.id}"]`)).toBeVisible();

        // Görev zinciri gerçekten render oldu mu (renderBlock köprüsünün kanıtı)?
        const missionRoot = page.locator(`[data-testid="mission-block"][data-mission-id="${first.mission.id}"]`);
        await expect(missionRoot).toBeVisible();
        await expect(missionRoot.locator('[data-testid="mission-step"]')).toHaveCount(first.mission.steps!.length);

        // Başlangıçta yalnızca ilk adım açık, geri kalanı kilitli.
        const stepContainers = missionRoot.locator('[data-testid="mission-step"]');
        await expect(stepContainers.nth(0)).toHaveAttribute('data-step-locked', 'false');
        for (let i = 1; i < first.mission.steps!.length; i++) {
            await expect(stepContainers.nth(i)).toHaveAttribute('data-step-locked', 'true');
        }

        await context.close();
    });

    test('tüm bug\'lar kapanınca kart Done\'a geçiyor ve sprint kapanış töreni XP + retro veriyor', async ({ browser }) => {
        test.setTimeout(180_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoSprint(page);

        // Sprint kapatma düğmesi, bug'lar bitmeden GÖRÜNMEMELİ.
        await expect(page.getByTestId('sprint-close-btn')).toHaveCount(0);

        for (const bug of bugs) {
            await closeBug(page, bug);
            // Görev bitince kart Done'a geçer — durumun xp.js'ten türetildiğinin
            // kanıtı (sprintStore ayrı bir "bitti" state'i tutmuyor, plan §2.2).
            await expect(page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${bug.id}"]`))
                .toHaveAttribute('data-bug-status', 'done');
        }

        await expect(page.getByTestId('sprint-progress')).toContainText(`${bugs.length}/${bugs.length}`);

        // Tüm bug'lar bitti → kapatma düğmesi açılır.
        const closeBtn = page.getByTestId('sprint-close-btn');
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();

        // Kapanış: retrospektif görünür, düğme kaybolur (tören bir kez oynar).
        await expect(page.getByTestId('sprint-retro')).toBeVisible();
        await expect(page.getByTestId('sprint-close-btn')).toHaveCount(0);

        // XP ve pano durumu localStorage'a gerçekten yazıldı mı?
        const state = await page.evaluate(() => ({
            xp: JSON.parse(localStorage.getItem('learnqa_xp_sprint') ?? 'null'),
            board: JSON.parse(localStorage.getItem('learnqa_sprint_board') ?? 'null'),
        }));
        expect(state.xp?.xp, 'sprint kapanınca XP artmalı').toBeGreaterThan(0);
        expect(state.board?.closed, 'kapatılan sprint id board deposuna yazılmalı').toContain(sprint.id);
        for (const bug of bugs) {
            expect(state.xp?.completed, 'her bug\'ın mission id\'si completed listesine yazılmalı')
                .toContain(bug.mission.id);
        }

        // Kalıcılık: sayfa yenilenince Done kolonu Done kalmalı.
        await page.reload();
        await page.waitForSelector('h1', { timeout: 30_000 });
        for (const bug of bugs) {
            await expect(page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${bug.id}"]`))
                .toHaveAttribute('data-bug-status', 'done');
        }
        await expect(page.getByTestId('sprint-retro')).toBeVisible();

        await context.close();
    });

    test('sprint sekmesi değiştirince farklı sprint\'in bug\'ları gösteriliyor', async ({ browser }) => {
        // S1 içerik genişletmesiyle eklendi: Sprint 2 eklenince SprintPage'in
        // sabit sprints[0] göstermesi ikinci sprint'i asla erişilebilir kılmazdı
        // — bu test o regresyonu yakalar (sprint-simulator-and-open-items-plan.md §6.1).
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoSprint(page);

        expect(sprintsData.sprints.length, 'bu test en az 2 sprint bekler').toBeGreaterThanOrEqual(2);
        const secondSprint = sprintsData.sprints[1] as unknown as { id: string; bugs: Bug[] };

        // İlk sprint'in bug'ları görünür durumda.
        await expect(page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${bugs[0].id}"]`)).toBeVisible();

        // İkinci sprint sekmesine geç.
        await page.locator(`[data-testid="sprint-tab"][data-sprint-id="${secondSprint.id}"]`).click();
        await expect(page.locator(`[data-testid="sprint-summary"]`)).toHaveAttribute('data-sprint-id', secondSprint.id);

        // Artık ikinci sprint'in bug'ları görünüyor, ilk sprint'inkiler DEĞİL.
        await expect(page.locator('[data-testid="sprint-bug-card"]')).toHaveCount(secondSprint.bugs.length);
        for (const bug of secondSprint.bugs) {
            await expect(page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${bug.id}"]`)).toBeVisible();
        }
        await expect(page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${bugs[0].id}"]`)).toHaveCount(0);

        await context.close();
    });

    test('"Görevi aç" kullanıcıyı göreve KAYDIRIR ve rehber maskot sıradaki adımı anlatır', async ({ browser }) => {
        // Gerçek kullanıcı geri bildirimi (2026-08-01): "Görevi aç'a basınca
        // değişiklik olmuyor". Detay paneli panonun ALTINDA render edildiği ve
        // hiçbir scroll yapılmadığı için viewport oynamıyordu. Bu test hem
        // kaydırmayı hem de bağlama duyarlı rehber maskotu doğrular.
        test.setTimeout(90_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();
        await gotoSprint(page);

        // 1) Maskot balonu AÇIK başlar ve ilk adımı (Backlog'dan bug çekme) anlatır.
        const bubble = page.getByTestId('tooltip-guide-bubble');
        await expect(bubble).toBeVisible();
        await expect(bubble).toContainText('Backlog');

        // 2) Bug'ı sprint'e al → maskot metni yeni faza göre DEĞİŞİR.
        const first = bugs[0];
        const card = page.locator(`[data-testid="sprint-bug-card"][data-bug-id="${first.id}"]`);
        await card.getByTestId('sprint-pull-btn').click();

        const detail = page.locator(`[data-testid="sprint-bug-detail"][data-bug-id="${first.id}"]`);
        await expect(detail).toBeVisible();
        // Görev açıkken maskot mini-lesson ipucunu verir (faz değişti).
        await expect(bubble).toContainText('Mini-lesson');

        // 3) Paneli kapat + başa dön → "Görevi aç" senaryosunun ön koşulu.
        await page.getByTestId('sprint-bug-close').click();
        await expect(detail).toHaveCount(0);
        await page.evaluate(() => window.scrollTo(0, 0));
        // Panel kapalıyken maskot "Görevi aç'a bas" fazına döner.
        await expect(bubble).toContainText('Görevi aç');

        // 4) ASIL İDDİA: "Görevi aç" sadece state'i değiştirmiyor, kullanıcıyı
        //    görevin bulunduğu yere GÖTÜRÜYOR (regresyondan önce panel açılıyor
        //    ama ekranın çok altında kalıyordu).
        await card.getByTestId('sprint-open-btn').click();
        await expect(detail).toBeVisible();
        await expect(detail).toBeInViewport();
        // Görev zincirinin kendisi de görünür alanda olmalı.
        await expect(detail.locator(`[data-testid="mission-block"][data-mission-id="${first.mission.id}"]`))
            .toBeInViewport();

        await context.close();
    });
});
