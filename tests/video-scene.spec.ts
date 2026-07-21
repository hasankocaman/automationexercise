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

// Dalga 3 (video-rollout-plan.md §7-9) — git-github'a eklenen 11 yeni filmin
// (Prompt A: 🎯/⚙️/🚫/🌿/🔀/🧬, Prompt B: 🐙/🧾/🚀/🌐/⚠️) hepsini tek tek test
// etmek yerine temsili 3 sekme (Giriş, Merge, Hata Sözlüğü) + gauge'da 1 yeni
// sekme (Neden Gauge?) ile hafif render kontrolü yapılır. 💼 Mülakat sekmesi
// BİLEREK dışarıda bırakıldı — quiz-gating (%60, CLAUDE.md §22 AC2) ile
// kilitli ve bu suite gating'i açan bir yardımcı kullanmıyor.
test.describe('Video-Scene — Dalga 3 (git-github 11 yeni film + gauge Neden Gauge?)', () => {
    test('/git-github — 🎯 Giriş sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/git-github');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/git-github — 🔀 Merge & Conflict sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/git-github');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🔀 Merge & Conflict/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/git-github — 🚨 Hata Sözlüğü sekmesinde film render olur (gating YOK — sadece 💼 Mülakat kilitli)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/git-github');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🚨 Error Dictionary|🚨 Hata Sözlüğü/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/gauge — 🏠 Neden Gauge? sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/gauge');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🏠 Why Gauge\?|🏠 Neden Gauge\?/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

// Dalga 4 (video-sitewide-plan.md) — /linux'un 10 sekmesine dağıtılan 9 yeni
// video-scene filmi (Text & Pipes hariç, orada Dalga 2'nin pipeChainFilm'i
// zaten vardı) tek tek test edilmek yerine temsili 4 sekme ile hafif render
// kontrolü yapılır: 🎯 Giriş (yeni film, önceden hiç yoktu), 🔗 Ekosistem
// (film+step-animation+code-playground üçlüsü sıfırdan eklendi), 🚨 Hata
// Sözlüğü ve 💼 Mülakat (ikisi de gating'e TABİ DEĞİL — TopicPage.jsx'teki
// isDedicatedInterviewTab SADECE 💼 emoji'sini kilitliyor, Hata Sözlüğü'nde
// bu emoji yok; 💼 Mülakat ise diğer sayfalarda olduğu gibi quiz-gating
// (%60, CLAUDE.md §22 AC2) ARKASINDA kalabilir — bu yüzden Mülakat burada
// TEST EDİLMİYOR, sadece Hata Sözlüğü ile film+steps+practice üçlüsünün
// section'a doğru enjekte edildiği doğrulanıyor).
test.describe('Video-Scene — Dalga 4 (/linux, 9 yeni film + eksik animasyon/sandbox tamamlama)', () => {
    test('/linux — 🎯 Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/linux');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/linux — 🔗 Ecosystem sekmesinde film render olur (Dalga 4te sıfırdan eklendi)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/linux');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🔗 Ecosystem|🔗 Ekosistem/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/linux — 🚨 Error Dictionary sekmesinde film render olur (gating YOK)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/linux');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🚨 Error Dictionary|🚨 Hata Sözlüğü/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

// Dalga 5 (video-sitewide-plan.md) — /docker'ın 14 sekmesine dağıtılan 12 yeni
// video-scene filmi (Dockerfile ve Docker Compose hariç, orada zaten Dalga 1+2
// filmleri vardı) tek tek test edilmek yerine temsili 4 sekme ile hafif render
// kontrolü yapılır: 🎯 Introduction (yeni film, önceden hiç yoktu), 📥 Images
// (film + step-animation + code-playground sıfırdan eklendi), 🩺 Troubleshooting
// ve 🔗 Ecosystem (gating'e TABİ DEĞİL — isDedicatedInterviewTab SADECE 💼
// emoji'sini kilitliyor). 💼 Interview Q&A diğer sayfalardaki gibi quiz-gating
// (%60, CLAUDE.md §22 AC2) ARKASINDA kalabileceği için burada TEST EDİLMİYOR.
test.describe('Video-Scene — Dalga 5 (/docker, 12 yeni film + eksik animasyon/sandbox tamamlama)', () => {
    test('/docker — 🎯 What is Docker? sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/docker — 📥 Images sekmesinde film render olur (Dalga 5te sıfırdan eklendi)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /📥 Images|📥 Image\'lar/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/docker — 🩺 Troubleshooting sekmesinde film render olur (gating YOK)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🩺 Troubleshooting|🩺 Yaygın Hatalar/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/docker — 🔗 Ecosystem sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🔗 Ecosystem|🔗 Ekosistem/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

// Dalga 6 (video-sitewide-plan.md) — /selenium'ün 14 sekmesine dağıtılan
// filmler (sıfırdan başlandı: sayfada önceden HİÇ film/step-animation/
// code-playground/challenge yoktu) tek tek test edilmek yerine temsili
// sekmelerle hafif render kontrolü yapılır. Not: seleniumData.js her sekmeyi
// AYRI bir const (s0..s13) olarak modülerize eder — tabs[] (sidebar buton
// metni) çoğu sekmede section title ile AYNIDIR, ama linux/docker'daki gibi
// yine de tabs[] metnini kullanmak güvenlidir (bkz. Dalga 5'teki Introduction
// tuzağı notu, NEXT_SESSION.md).
test.describe('Video-Scene — Dalga 6 Batch 1 (/selenium, Giriş/Actions/Wait/Frames/Gerçek Hayat)', () => {
    test('/selenium — 🌐 Giriş sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🌐 Introduction|🌐 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/selenium — ⚡ Actions sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /⚡ Actions|⚡ Aksiyonlar/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

test.describe('Video-Scene — Dalga 6 Batch 2 (/selenium, Ekosistem/CDP & BiDi/Yaygın Hatalar)', () => {
    test('/selenium — 🔗 Ecosystem sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🔗 Ecosystem|🔗 Ekosistem/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/selenium — 🌐 CDP & BiDi sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🌐 CDP & BiDi/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/selenium — 🚨 Common Errors sekmesinde film render olur (gating YOK)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🚨 Common Errors|🚨 Yaygın Hatalar/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/selenium — 🏗️ Framework Mimarisi sekmesinde film render olur (selenium-arch-test-chain-film)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🏗️ Framework Architecture|🏗️ Framework Mimarisi/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

test.describe('Video-Scene — Dalga 7 Batch 1 (/playwright, Playwright Nedir?/Locator Stratejileri/Page Object Model)', () => {
    test('/playwright — 🎭 Playwright Nedir? sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/playwright');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎭 Playwright Nedir\?|🎭 What is Playwright\?/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/playwright — 🎯 Locator Stratejileri sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/playwright');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Locator Strategies|🎯 Locator Stratejileri/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/playwright — 📦 Page Object Model sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/playwright');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /📦 Page Object Model/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/playwright — 🏗️ Framework Mimarisi sekmesinde film render olur (playwright-arch-fixture-chain-film)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/playwright');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🏗️ Framework Architecture|🏗️ Framework Mimarisi/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

test.describe('Video-Scene — Dalga 7 Batch 2 (/playwright, Debugging & Trace/Paralel & CI-CD/Yaygın Hatalar)', () => {
    test('/playwright — 🐞 Debugging & Trace sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/playwright');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🐞 Debugging & Trace/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/playwright — ⚡ Paralel & CI/CD sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/playwright');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /⚡ Paralel & CI\/CD|⚡ Parallel & CI\/CD/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/playwright — 🚨 Yaygın Hatalar sekmesinde film render olur (gating YOK)', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/playwright');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🚨 Yaygın Hatalar|🚨 Common Errors/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

// Dalga 8-21 (video-sitewide-plan.md §7.5) — final doğrulama turu. Dalga 8-21
// arasında (python, sql, cypress, javascript, typescript, java, postman,
// bruno, rest-assured, jenkins, kubernetes, jmeter, kafka, appium,
// browserstack, aws, azure, what-is-testing, test-frameworks, manual-testing,
// algorithms, advanced-algorithms, llm-agents, claude-ai) "test etmeden
// commit yap" talimatıyla ilerlendiği için hiçbir temsili render testi
// eklenmemişti. Aşağıdaki bloklar her sayfa için CLAUDE.md §9.5'in gerektirdiği
// en az 1 temsili render testini ekler — Giriş/Intro sekmesi (her sayfada
// video-scene filmi olduğu doğrulanmış sekme) üzerinden hafif bir kontrol.
test.describe('Video-Scene — Dalga 8-13 (python/sql/cypress/javascript/typescript/java Giriş sekmeleri)', () => {
    test('/python — 🎯 Intro & Why sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/python');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Intro & Why|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/sql — 🎯 Giriş sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/sql');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Intro & Why|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/cypress — 🌲 What is Cypress? sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/cypress');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🌲 What is Cypress\?|🌲 Cypress Nedir\?/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/javascript — 🎯 Intro & Why sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/javascript');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Intro & Why|🎯 Giriş & Neden/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/typescript — 🎯 Intro & Why sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/typescript');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Intro & Why|🎯 Giriş & Neden/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/java — ☕ Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/java');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /☕ Introduction|☕ Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

test.describe('Video-Scene — Dalga 14 (postman/bruno/rest-assured Giriş sekmeleri)', () => {
    test('/postman — 🎯 Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/postman');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/bruno — 🎯 Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/bruno');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/rest-assured — 🏠 Why REST Assured? sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/rest-assured');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🏠 Why REST Assured\?|🏠 Neden REST Assured\?/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

test.describe('Video-Scene — Dalga 15-16 (jenkins/kubernetes/jmeter/kafka Giriş sekmeleri)', () => {
    test('/jenkins — 🎯 Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/jenkins');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/kubernetes — 🎯 Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/kubernetes');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/jmeter — 🎯 Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/jmeter');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/kafka — 🎯 Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/kafka');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

test.describe('Video-Scene — Dalga 17-18 (appium/browserstack/aws/azure Giriş sekmeleri)', () => {
    test('/appium — 🎯 Intro & Architecture sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/appium');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Intro & Architecture|🎯 Giriş & Mimari/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/browserstack — ☁️ What Is It? sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/browserstack');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /☁️ What Is It\?|☁️ Nedir\?/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/aws — 🎯 Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/aws');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/azure — 🎯 Introduction sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/azure');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Introduction|🎯 Giriş/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

// Dalga 19-20 — /what-is-testing ve /test-frameworks tab tabanlı (TopicPage
// benzeri), ama /manual-testing, /algorithms, /advanced-algorithms FARKLI bir
// yapı kullanır: tüm "lesson" kartları aynı anda DOM'a render edilir (sol
// navigasyon sadece scrollIntoView yapar, tab switch değil) — bkz.
// ManualTestingPage.jsx/AlgorithmsPage.jsx/AdvancedAlgorithmsPage.jsx
// `navTo = (id) => document.getElementById(id)?.scrollIntoView(...)`. Bu
// yüzden bu 3 sayfada herhangi bir tab'a tıklamaya gerek yok — sayfaya
// gidip en az 1 video-scene-block DOM'da bulunduğunu doğrulamak yeterlidir.
test.describe('Video-Scene — Dalga 19 (what-is-testing/test-frameworks)', () => {
    test('/what-is-testing — 🎯 Intro & Why sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/what-is-testing');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Intro & Why|🎯 Giriş & Neden/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/test-frameworks — varsayılan (ilk) sekmede film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/test-frameworks');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();

        await context.close();
    });
});

test.describe('Video-Scene — Dalga 20 (manual-testing/algorithms/advanced-algorithms — tüm lesson kartları aynı anda render edilir)', () => {
    test('/manual-testing — en az 1 video-scene-block DOM\'da bulunur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/manual-testing');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const blocks = page.getByTestId('video-scene-block');
        await blocks.first().scrollIntoViewIfNeeded();
        await expect(blocks.first()).toBeVisible();
        expect(await blocks.count()).toBeGreaterThan(0);

        await context.close();
    });

    test('/algorithms — en az 1 video-scene-block DOM\'da bulunur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/algorithms');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const blocks = page.getByTestId('video-scene-block');
        await blocks.first().scrollIntoViewIfNeeded();
        await expect(blocks.first()).toBeVisible();
        expect(await blocks.count()).toBeGreaterThan(0);

        await context.close();
    });

    test('/advanced-algorithms — en az 1 video-scene-block DOM\'da bulunur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/advanced-algorithms');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const blocks = page.getByTestId('video-scene-block');
        await blocks.first().scrollIntoViewIfNeeded();
        await expect(blocks.first()).toBeVisible();
        expect(await blocks.count()).toBeGreaterThan(0);

        await context.close();
    });
});

// Dalga 21 — /llm-agents için pilot testte (dosyanın en üstünde) zaten "🔍 RAG
// Pipeline Testing" sekmesi test edildi; burada Dalga 21'in KENDİ eklediği
// "🎯 Intro" sekmesi ayrıca doğrulanıyor. /claude-ai için ilk temsili test.
test.describe('Video-Scene — Dalga 21 (llm-agents Intro sekmesi + claude-ai)', () => {
    test('/llm-agents — 🎯 Intro: The AI, ML & LLM Map sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/llm-agents');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Intro: The AI, ML & LLM Map|🎯 Giriş: AI, ML ve LLM Haritası/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });

    test('/claude-ai — 🎯 Intro: AI-Assisted Testing sekmesinde film render olur', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/claude-ai');
        await page.waitForSelector('h1', { timeout: 30_000 });
        await page.getByRole('button', { name: /🎯 Intro: AI-Assisted Testing|🎯 Giriş: AI Destekli Test/ }).first().click();

        const block = page.getByTestId('video-scene-block');
        await block.scrollIntoViewIfNeeded();
        await expect(block).toBeVisible();
        await expect(page.getByTestId('video-scene-caption')).not.toBeEmpty();

        await context.close();
    });
});

