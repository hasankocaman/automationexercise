import { test, expect, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

// Genelleştirilmiş versiyonu: tests/docker-interview-mastery-flow.spec.ts.
// O dosya TEK bir temsili sayfayı (Docker) her commit sonrası hızlıca doğrular.
// Bu dosya AYNI akışı (quiz gating <%60/>=%60, mülakat AI değerlendirmesi,
// %80 mastery → 'completed') gerçek `interview-questions` mekanizmasını kullanan
// TÜM sayfalarda doğrular — kasıtlı olarak post-commit suite'e bağlı DEĞİL
// (her sayfa gerçek bir Groq AI çağrısı yapar, npm run test:interview-flows ile
// elle çalıştırılır).
//
// NOT: /python ve /sql'in dedicated Mülakat sekmesi bu mekanizmayı (interview-
// questions block + InterviewPracticeBlock) KULLANMIYOR, eski 'qa' formatında —
// bu yüzden burada YOK. Quiz-gating/AI-grading/mastery onlarda test edilemez.
const PAGES: Array<{ route: string; dataVar: string; dataFile: string }> = [
    { route: '/appium', dataVar: 'appiumData', dataFile: 'appiumData' },
    { route: '/aws', dataVar: 'awsData', dataFile: 'awsData' },
    { route: '/azure', dataVar: 'azureData', dataFile: 'azureData' },
    { route: '/browserstack', dataVar: 'browserstackData', dataFile: 'browserstackData' },
    { route: '/cypress', dataVar: 'cypressData', dataFile: 'cypressData' },
    { route: '/docker', dataVar: 'dockerData', dataFile: 'dockerData' },
    { route: '/git-github', dataVar: 'gitGithubData', dataFile: 'gitGithubData' },
    { route: '/bruno', dataVar: 'brunoData', dataFile: 'brunoData' },
    { route: '/jenkins', dataVar: 'jenkinsData', dataFile: 'jenkinsData' },
    { route: '/jmeter', dataVar: 'jmeterData', dataFile: 'jmeterData' },
    { route: '/linux', dataVar: 'linuxData', dataFile: 'linuxData' },
    { route: '/kubernetes', dataVar: 'kubernetesData', dataFile: 'kubernetesData' },
    { route: '/java', dataVar: 'javaData', dataFile: 'javaData' },
    { route: '/postman', dataVar: 'postmanData', dataFile: 'postmanData' },
    { route: '/kafka', dataVar: 'kafkaData', dataFile: 'kafkaData' },
    { route: '/selenium', dataVar: 'seleniumData', dataFile: 'seleniumData' },
    { route: '/playwright', dataVar: 'playwrightData', dataFile: 'playwrightData' },
    { route: '/rest-assured', dataVar: 'restAssuredData', dataFile: 'restAssuredData' },
];

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

const configured = Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY && TEST_USER_EMAIL && TEST_USER_PASSWORD &&
    !SUPABASE_URL.includes('YOUR_PROJECT_REF') && !SUPABASE_ANON_KEY.includes('xxxx')
);

const LOCK_TEXT = 'Mülakat sorularına geçmeden önce diğer sekmelerdeki quizlerin en az %60\'ını doğru cevaplamalısın.';
const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';

// QuizBlock.jsx'teki normalizasyonun aynısı: correct hem string id ('b') hem
// numeric index (1) olabilir; options hem {id,text} hem düz string olabilir.
function normalizeQuiz(block: any) {
    const options = (block.options || []).map((opt: any, i: number) =>
        typeof opt === 'string' ? { id: String.fromCharCode(97 + i), text: opt } : opt
    );
    const correctId = typeof block.correct === 'number' ? String.fromCharCode(97 + block.correct) : block.correct;
    const correctOption = options.find((o: any) => o.id === correctId);
    return { correctOption };
}

async function answerActiveTabQuizCorrectly(page: Page, block: any) {
    const { correctOption } = normalizeQuiz(block);
    const optionText = typeof correctOption.text === 'string' ? correctOption.text : correctOption.text.tr;
    // QuizBlock butonu "{LETTER}.{text}" olarak (boşluksuz) render eder. Bazı doğru
    // cevaplar çok kısa/genel olabiliyor (örn. javaData'da sadece "3") — bare text ile
    // substring eşleştirme, sayfadaki BAŞKA bir elemente (örn. kullanıcı adı
    // "hasank4320" içindeki "3") yanlışlıkla eşleşebiliyor. Harf öneki dahil eşleştirme
    // bu çakışmayı pratikte ortadan kaldırıyor.
    const optionLabel = `${correctOption.id.toUpperCase()}.${optionText}`;
    await page.locator('button', { hasText: optionLabel }).first().click();
    await page.getByRole('button', { name: 'Cevabı Kontrol Et' }).click();
    await expect(page.locator('button', { hasText: optionLabel }).first()).toContainText('✓');
}

test.describe('Mülakat AI değerlendirme akışı — interview-questions kullanan tüm sayfalar', () => {
    test.skip(!configured, '.env.local içinde VITE_SUPABASE_URL/KEY veya TEST_USER_EMAIL/PASSWORD eksik');
    test.setTimeout(120_000);

    for (const { route, dataVar, dataFile } of PAGES) {
        test(`${route} — quiz gating → AI değerlendirir → sekme tamamlanır`, async ({ browser }) => {
            const mod = await import(`../src/data/${dataFile}.js`);
            const data = mod[dataVar];
            const tr = data.tr;
            const tabs: string[] = tr.tabs;
            const sections: any[] = tr.sections;
            const pageKey = (tr.hero?.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

            const interviewTabIndex = sections.findIndex((s, i) =>
                (tabs[i] || '').includes('💼') || (typeof s.title === 'string' && s.title.includes('💼'))
            );
            expect(interviewTabIndex, `${route}: 💼 dedicated mülakat sekmesi bulunamadı`).toBeGreaterThanOrEqual(0);

            // TopicPage.jsx'teki globalQuizPercent TÜM sekmelerdeki (mülakat sekmesi
            // DAHİL) quiz bloklarını sayar (bkz. totalQuizOnPage) — bazı sayfalarda
            // (örn. JMeter) mülakat sekminin kendisi de 2 quiz bloğu içeriyor; bunlar
            // kilitliyken erişilemez ama paydaya dahil. Bu yüzden eşik hesabı TÜM
            // sekmeler üzerinden yapılmalı, sadece cevaplanabilir kuyruk hariç tutulur.
            let totalAllTabs = 0;
            const quizQueue: Array<{ tabIndex: number; block: any }> = [];
            sections.forEach((s, i) => {
                (s.blocks || []).forEach((b: any) => {
                    if (b.type === 'quiz') {
                        totalAllTabs++;
                        if (i !== interviewTabIndex) quizQueue.push({ tabIndex: i, block: b });
                    }
                });
            });
            expect(totalAllTabs, `${route}: hiç quiz bloğu bulunamadı`).toBeGreaterThan(0);
            const unlockCount = Math.ceil(totalAllTabs * 0.6);
            expect(unlockCount, `${route}: %60 eşiğine ulaşmak için mülakat sekmesi dışında erişilebilir quiz sayısı yetersiz (yapısal gating sorunu)`)
                .toBeLessThanOrEqual(quizQueue.length);
            const belowCount = Math.max(0, unlockCount - 1);

            // ── Auth: gerçek JWT'yi localStorage'a enjekte et (app sadece OAuth login destekliyor).
            const authClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
            const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
                email: TEST_USER_EMAIL!, password: TEST_USER_PASSWORD!,
            });
            if (authError || !authData.session) throw new Error(`Giriş başarısız: ${authError?.message}`);
            const { session } = authData;
            const projectRef = new URL(SUPABASE_URL!).hostname.split('.')[0];
            const storageKey = `sb-${projectRef}-auth-token`;

            const context = await browser.newContext();
            await context.addInitScript(([key, sessionJson]) => {
                window.localStorage.setItem(key as string, sessionJson as string);
            }, [storageKey, JSON.stringify(session)]);
            const page = await context.newPage();

            await page.goto(route);
            await page.waitForSelector('h1', { timeout: 30_000 });
            await expect(page.locator('[data-testid="nav-account"]')).toBeVisible({ timeout: 10_000 });

            const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);

            // 1) %0 quiz doğru → kilitli.
            await tabButtons.nth(interviewTabIndex).click();
            await expect(page.getByText(LOCK_TEXT)).toBeVisible();

            // 2) Eşiğin altında bir miktar doğru cevapla → hâlâ kilitli.
            let activeTab = -1;
            for (let i = 0; i < belowCount; i++) {
                const { tabIndex, block } = quizQueue[i];
                if (tabIndex !== activeTab) { await tabButtons.nth(tabIndex).click(); activeTab = tabIndex; }
                await answerActiveTabQuizCorrectly(page, block);
            }
            if (belowCount > 0) {
                await tabButtons.nth(interviewTabIndex).click();
                await expect(page.getByText(LOCK_TEXT)).toBeVisible();
            }

            // 3) Eşiği geç (>=%60) → kilit açılır.
            for (let i = belowCount; i < unlockCount; i++) {
                const { tabIndex, block } = quizQueue[i];
                if (tabIndex !== activeTab) { await tabButtons.nth(tabIndex).click(); activeTab = tabIndex; }
                await answerActiveTabQuizCorrectly(page, block);
            }
            await tabButtons.nth(interviewTabIndex).click();
            await expect(page.getByText(LOCK_TEXT)).not.toBeVisible();
            // .first() — birden fazla pratik bloğu olan sayfalarda (bkz. aşağıdaki not) birden fazla eşleşir.
            await expect(page.getByText('Mülakat Pratiği — Sekmeyi Tamamla').first()).toBeVisible();

            // 4) Kullanıcının cevap yazabileceği input alanı.
            // NOT: bazı sayfalarda (örn. Appium — bilinçli 15/20/15 seviye ayrımı;
            // JMeter — veri tekrarı bug'ı) mülakat sekmesinde BİRDEN FAZLA ayrı
            // interview-questions bloğu/InterviewPracticeBlock var, her biri kendi
            // 5 soruluk örneklemesini render ediyor. Tabı tamamlamak için bunlardan
            // SADECE BİRİNİN ustalaşması (>=%80) yeterli (markTabAsVerifiedComplete
            // idempotent) — bu yüzden sadece İLK bloğun textarea'larını dolduruyoruz.
            const allTextareas = page.locator('textarea[placeholder="Kendi cümlelerinle cevabını yaz..."]');
            const totalTextareaCount = await allTextareas.count();
            expect(totalTextareaCount).toBeGreaterThan(0);
            const sampleSize = Math.min(5, totalTextareaCount);

            // İlk bloğun soru havuzu — sayfada birden fazla interview-questions bloğu
            // varsa hepsinin havuzunu birleştiriyoruz ki eşleştirme her durumda çalışsın.
            // q/a alanı bazı sayfalarda (örn. appiumData) düz string, bazılarında
            // (örn. dockerData) {tr,en} nesnesi — tx() davranışını taklit ediyoruz.
            const pickTr = (field: unknown): string => (typeof field === 'string' ? field : (field as any)?.tr ?? '');
            const questionPool: Array<{ q: unknown; a: unknown }> = sections[interviewTabIndex].blocks
                .filter((b: any) => b.type === 'interview-questions')
                .flatMap((b: any) => b.questions);
            const questionTexts = (await page.locator('.space-y-5 > div p.font-semibold').allTextContents()).slice(0, sampleSize);
            expect(questionTexts).toHaveLength(sampleSize);

            for (let idx = 0; idx < questionTexts.length; idx++) {
                const rendered = questionTexts[idx].replace(/^\d+\.\s*/, '').trim();
                const match = questionPool.find((q) => pickTr(q.q).trim() === rendered);
                expect(match, `${route}: soru DOM'da bulundu ama veri dosyasında eşleşmedi: "${rendered}"`).toBeTruthy();
                await allTextareas.nth(idx).fill(pickTr(match!.a));
            }

            // 5) Tümünü Değerlendir — gerçek grade-interview-answer (Groq AI) çağrısı.
            // .first() — birden fazla pratik bloğu varsa ilkinin butonu (yeterli, bkz. yukarı).
            const gradeResponsePromise = page.waitForResponse((res) => res.url().includes('/functions/v1/grade-interview-answer'));
            await page.getByRole('button', { name: /Tümünü Değerlendir/ }).first().click();
            const gradeResponse = await gradeResponsePromise;
            expect(gradeResponse.status(), `${route}: grade-interview-answer 200 dönmedi`).toBe(200);
            const gradeBody = await gradeResponse.json();
            expect(gradeBody.results).toHaveLength(sampleSize);
            for (const result of gradeBody.results) {
                expect(typeof result.percent).toBe('number');
            }
            const avg = gradeBody.results.reduce((sum: number, r: any) => sum + r.percent, 0) / gradeBody.results.length;
            expect(avg, `${route}: referans cevaplarla ortalama >=80 bekleniyordu, AI ${avg} verdi`).toBeGreaterThanOrEqual(80);

            // 6) Mastery → sekme tamamlandı, gerçek Supabase satırına yansır.
            // .first() — birden fazla pratik bloğu varsa hepsi AYNI anda "tamamlandı"
            // görünümüne geçer (alreadyMastered, sekme bazlı tek bir prop, bloklara
            // ayrı ayrı değil).
            await expect(page.getByText('✅ Mülakat Pratiği tamamlandı.').first()).toBeVisible({ timeout: 10_000 });

            const progressRes = await page.request.get(
                `${SUPABASE_URL}/rest/v1/user_progress?user_id=eq.${authData.user!.id}&lesson_slug=eq.${pageKey}&topic_slug=eq.${interviewTabIndex}&select=status`,
                { headers: { apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${session.access_token}` } }
            );
            expect(progressRes.status()).toBe(200);
            expect(await progressRes.json()).toEqual([{ status: 'completed' }]);

            await context.close();
        });
    }
});
