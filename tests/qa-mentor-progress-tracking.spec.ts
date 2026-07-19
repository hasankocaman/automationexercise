import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { MAP_A } from '../src/data/qaMentorData.js';

// AC09 (Documents/acceptancecriterias.md): "Kullanıcı kariyer yolu seçtiyse
// güncel ilerleme (progress bar veya checkpoint) görselleştirilmelidir" +
// "Tamamlanan dersler/konular kullanıcı panelinde net şekilde gösterilmelidir".
// Daha önce sadece qa-mentor-roadmap-order.spec.ts vardı ve o SADECE anonim
// kullanıcıdaki sihirbaz sırasını (WP1) test ediyordu — gerçek % ilerleme
// hesaplaması (QAMentorPage.jsx ~498-514: getCompletedRoutePaths + CircularProgress)
// hiç test edilmemişti. Bu dosya o boşluğu kapatıyor.
//
// Mekanizma: profiles.career_goal seçiliyken (üye) QAMentorPage sihirbazı
// atlayıp doğrudan MindMapView'e geçer; user_progress'te status='completed'
// olan satırların last_position.routePath'i, seçilen haritanın node.route'larıyla
// kesiştirilip percent/completedCount/total hesaplanır (AuthContext.getCompletedRoutePaths,
// completedSet bir Set<routePath> olduğu için AYNI route'u işaretleyen birden
// fazla satır tekrar SAYILMAZ).
//
// ÖNEMLİ TASARIM NOTU: paylaşılan test hesabı (.env.local TEST_USER_*) uzun
// süredir kullanılıyor ve MAP_A'nın çoğu route'u (docker/jenkins/git-github/...)
// başka testler tarafından zaten 'completed' işaretlenmiş olabilir — bu yüzden
// SABİT bir "2/14" beklemek yerine, önce GERÇEK baseline'ı okuyup MAP_A içinde
// henüz tamamlanmamış TEK bir node bulup onu ekliyoruz, sonra sayının tam
// olarak +1 arttığını doğruluyoruz. Tüm 14 node zaten tamamlanmışsa (100%) test
// anlamlı bir delta gösteremeyeceği için nazikçe skip edilir.

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

const configured = Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY && TEST_USER_EMAIL && TEST_USER_PASSWORD &&
    !SUPABASE_URL.includes('YOUR_PROJECT_REF') && !SUPABASE_ANON_KEY.includes('xxxx')
);

const AC09_TOPIC_SLUG = 'ac09-progress-test';

test.describe('AC09 — QA Mentor yol haritası ilerleme görselleştirmesi', () => {
    test.skip(!configured, '.env.local içinde VITE_SUPABASE_URL/KEY veya TEST_USER_EMAIL/PASSWORD eksik');
    test.setTimeout(60_000);

    test('bir node daha completed işaretlenince CircularProgress ve "X/14 ders tamamlandı" sayacı tam olarak +1 artar', async ({ browser }) => {
        const authClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
        const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
            email: TEST_USER_EMAIL!, password: TEST_USER_PASSWORD!,
        });
        if (authError || !authData.session) throw new Error(`Giriş başarısız: ${authError?.message}`);
        const { session } = authData;
        const userId = authData.user!.id;

        // ── Baseline'ı GERÇEKTEN oku (AuthContext.getCompletedRoutePaths ile aynı sorgu).
        const { data: rows, error: readError } = await authClient
            .from('user_progress')
            .select('last_position')
            .eq('user_id', userId)
            .eq('status', 'completed');
        if (readError) throw new Error(`Baseline okunamadı: ${readError.message}`);
        const completedRoutes = new Set((rows ?? []).map((r: any) => r.last_position?.routePath).filter(Boolean));
        const mapRoutes: string[] = MAP_A.nodes.map((n: any) => n.route);
        const baselineCount = mapRoutes.filter((r) => completedRoutes.has(r)).length;
        const total = mapRoutes.length;

        const missingRoute = mapRoutes.find((r) => !completedRoutes.has(r));
        test.skip(!missingRoute, 'MAP_A içindeki tüm node\'lar zaten completed (%100) — delta gösterecek boş node yok.');

        const missingLessonSlug = missingRoute!.replace(/^\//, '');
        const expectedCount = baselineCount + 1;
        const expectedPercent = Math.round((expectedCount / total) * 100);

        // ── career_goal set et + eksik node'u completed işaretle.
        const { error: profileError } = await authClient.from('profiles').update({ career_goal: 'map_a' }).eq('id', userId);
        if (profileError) throw new Error(`career_goal set edilemedi: ${profileError.message}`);

        const { error: upsertError } = await authClient
            .from('user_progress')
            .upsert(
                { user_id: userId, lesson_slug: missingLessonSlug, topic_slug: AC09_TOPIC_SLUG, status: 'completed', last_position: { routePath: missingRoute } },
                { onConflict: 'user_id,lesson_slug,topic_slug' }
            );
        if (upsertError) throw new Error(`Test node'u eklenemedi: ${upsertError.message}`);

        try {
            const projectRef = new URL(SUPABASE_URL!).hostname.split('.')[0];
            const storageKey = `sb-${projectRef}-auth-token`;
            const context = await browser.newContext({ serviceWorkers: 'block' });
            await context.addInitScript(([key, sessionJson]) => {
                window.localStorage.setItem(key as string, sessionJson as string);
            }, [storageKey, JSON.stringify(session)]);
            const page = await context.newPage();

            await page.goto('/qa-mentor');
            await page.waitForSelector('h1', { timeout: 30_000 });

            // v2 migrasyon akışı: career_goal kayıtlı ama local qaMentorProfile yok →
            // tam sihirbaz yerine SADECE zaman mini-sorusu sorulur (plan §7 risk 6),
            // cevaplanınca kayıtlı MAP_A doğrudan gösterilir.
            const timeOption = page.getByTestId('mentor-option-TIME_MID');
            await expect(timeOption).toBeVisible({ timeout: 30_000 });
            await timeOption.click();
            await expect(page.getByText('🧠 Sıfırdan QA Mühendisi Yol Haritası')).toBeVisible({ timeout: 30_000 });

            await expect(page.getByText(`${expectedPercent}%`)).toBeVisible({ timeout: 15_000 });
            await expect(page.getByText(`${expectedCount}/${total} ders tamamlandı`)).toBeVisible();

            await context.close();
        } finally {
            // ── Temizlik: SADECE bu testin eklediği satırı sil (baseline'daki diğer
            // testlerin gerçek ilerleme verisine dokunulmaz), career_goal'ı sıfırla —
            // qa-mentor-roadmap-order.spec.ts'in anonim sihirbaz akışını etkilemez
            // (o ayrı/oturumsuz bir context kullanır) ama paylaşılan hesabı gerçek bir
            // insan tekrar kullandığında sihirbazın beklenmedik şekilde atlanmasını önler.
            await authClient.from('profiles').update({ career_goal: null }).eq('id', userId);
            await authClient
                .from('user_progress')
                .delete()
                .eq('user_id', userId)
                .eq('lesson_slug', missingLessonSlug)
                .eq('topic_slug', AC09_TOPIC_SLUG);
        }
    });
});
