import { test, expect } from '@playwright/test';

// Video-Scene (Film Bloğu) pilot smoke testi — PILOT_PLAN_ve_PROMPT.md.
// /llm-agents sayfasındaki "🔍 RAG Pipeline Testing" sekmesinde duran
// ragPipelineFilm (llmAgentsData.js) üzerinden VideoSceneBlock'un temel
// oynatıcı davranışını doğrular: render, sahne ilerlemesi, pip ile seek,
// son sahnede bitiş rozeti. serviceWorkers: 'block' — bilinen MSW tuzağı
// (bkz. docker-sandbox.spec.ts / token-lab.spec.ts).

test.describe('Video-Scene — Film Bloğu (/llm-agents RAG Pipeline pilotu)', () => {
    test('block render oluyor, play ile sahne ilerliyor, pip ile seek çalışıyor, sonda bitiş rozeti görünür', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/llm-agents');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await page.getByRole('button', { name: /RAG Pipeline Testing|RAG Pipeline Testi/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();

        const caption = page.getByTestId('video-scene-caption');
        const firstCaption = await caption.innerText();
        expect(firstCaption.length).toBeGreaterThan(10);

        // play ile sahne otomatik ilerlemeli (altyazı metni değişmeli)
        await page.getByTestId('video-scene-play').click();
        await expect(caption).not.toHaveText(firstCaption, { timeout: 6_000 });

        // pip-2 ile doğrudan 3. sahneye seek — caption bir kez daha değişmeli
        const beforeSeek = await caption.innerText();
        await page.getByTestId('video-scene-pip-2').click();
        await expect(caption).not.toHaveText(beforeSeek, { timeout: 3_000 });

        // next ile son sahneye kadar ilerle, döngünün sonunda bitiş rozeti görünmeli
        const nextBtn = page.getByTestId('video-scene-next');
        for (let i = 0; i < 10; i++) {
            if (await nextBtn.isDisabled()) break;
            await nextBtn.click();
        }
        await expect(page.getByTestId('video-scene-done')).toBeVisible({ timeout: 5_000 });

        await context.close();
    });
});

// Dalga 2 (video-rollout-plan.md) — 4 yeni TopicPage filmi için hafif render
// kontrolleri: her sayfada ilgili sekmeye tıklayınca video-scene-block görünür
// olmalı. Docker'da Compose sekmesinde tam olarak BİR film olmalı (Dockerfile
// sekmesindeki docker-dockerfile-to-container-film ile karışmamalı — o ayrı
// bir sekmede, burada göz önünde değil).
test.describe('Video-Scene — Dalga 2 (git-github / linux / docker-compose / gauge)', () => {
    test('/git-github — Git Temelleri sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/git-github');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /Git Basics|Git Temelleri/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/linux — Text & Pipes sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/linux');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /Text & Pipes|Metin İşleme & Pipe/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/docker — Compose sekmesinde TAM OLARAK BİR film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /Docker Compose/ }).first().click();

        const blocks = page.getByTestId('video-scene-block');
        await blocks.first().scrollIntoViewIfNeeded();
        await expect(blocks.first()).toBeVisible();
        await expect(blocks).toHaveCount(1);

        await context.close();
    });

    test('/gauge — Spec & Step sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/gauge');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /Spec & Step Basics|Spec & Step Temelleri/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});
