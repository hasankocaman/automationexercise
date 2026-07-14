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
