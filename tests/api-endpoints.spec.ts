import { test, expect, type APIRequestContext } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

// Bu dosya projedeki TÜM canlı backend endpoint'lerinin happy-path'ini gerçek
// Supabase (learnqa-test) projesine karşı test eder:
//   - get_leaderboard RPC          → anonim, public, yazma yapmaz
//   - qa-assistant Edge Function   → üyelik gerektirir, gerçek Groq AI çağrısı yapar
//   - explain-quiz-answer          → üyelik gerektirir, gerçek Groq AI çağrısı yapar
//   - grade-interview-answer       → üyelik gerektirir, gerçek Groq AI çağrısı yapar
//
// chat_messages / lesson_comments INSERT'leri buraya KASITLI olarak eklenmedi —
// bunlar gerçek/canlı sohbet ve yorum akışına görünür şekilde test verisi yazar
// (gerçek kullanıcılar görür). increment_user_xp de benzer şekilde kalıcı veri
// mutasyonu yaptığı için dışarıda tutuldu.
//
// MALİYET UYARISI: qa-assistant / explain-quiz-answer / grade-interview-answer
// her çalıştırmada gerçek Groq API çağrısı yapar (gerçek, küçük bir maliyet).
// Bu bilinçli bir tercih (CLAUDE.md dışı proje kararı) — her commit sonrası
// post-commit hook bu dosyayı da tetikler.

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

const supabaseConfigured = Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('YOUR_PROJECT_REF') && !SUPABASE_ANON_KEY.includes('xxxx')
);
const testUserConfigured = Boolean(TEST_USER_EMAIL && TEST_USER_PASSWORD);

async function rpc(request: APIRequestContext, fn: string, body: Record<string, unknown>) {
    return request.post(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
        headers: {
            apikey: SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
        },
        data: body,
    });
}

test.describe('Public Supabase RPC endpoints (anonim, happy path)', () => {
    test.skip(!supabaseConfigured, '.env.local içinde VITE_SUPABASE_URL/VITE_SUPABASE_PUBLISHABLE_KEY eksik');

    test('get_leaderboard — 200 döner ve dizi verir', async ({ request }) => {
        const res = await rpc(request, 'get_leaderboard', { p_limit: 10 });
        expect(res.status(), await res.text()).toBe(200);
        const body = await res.json();
        expect(Array.isArray(body)).toBe(true);
    });
});

test.describe.serial('AI Edge Functions (üyelik gerektirir, happy path)', () => {
    test.skip(!supabaseConfigured, '.env.local içinde VITE_SUPABASE_URL/VITE_SUPABASE_PUBLISHABLE_KEY eksik');
    test.skip(!testUserConfigured, '.env.local içinde TEST_USER_EMAIL/TEST_USER_PASSWORD eksik');

    let accessToken: string;

    test.beforeAll(async () => {
        const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: TEST_USER_EMAIL!,
            password: TEST_USER_PASSWORD!,
        });
        if (error || !data.session) {
            throw new Error(`Test kullanıcısı ile giriş başarısız: ${error?.message ?? 'session yok'}`);
        }
        accessToken = data.session.access_token;
    });

    function authHeaders() {
        return {
            apikey: SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
    }

    test('qa-assistant — 200 döner ve reply alanı dolu gelir', async ({ request }) => {
        test.setTimeout(60_000);
        const res = await request.post(`${SUPABASE_URL}/functions/v1/qa-assistant`, {
            headers: authHeaders(),
            data: {
                messages: [
                    { role: 'user', content: 'Playwright otomatik happy-path testi: Selenium implicit wait nedir, tek cümle?' },
                ],
            },
        });
        expect(res.status(), await res.text()).toBe(200);
        const body = await res.json();
        expect(typeof body.reply).toBe('string');
        expect(body.reply.length).toBeGreaterThan(0);
    });

    test('explain-quiz-answer — 200 döner ve explanation alanı dolu gelir', async ({ request }) => {
        test.setTimeout(60_000);
        const res = await request.post(`${SUPABASE_URL}/functions/v1/explain-quiz-answer`, {
            headers: authHeaders(),
            data: {
                question: 'Selenium\'da explicit wait için hangi sınıf kullanılır?',
                correctAnswer: 'WebDriverWait',
                userAnswer: 'WebDriverWait',
                isCorrect: true,
                staticExplanation: 'WebDriverWait + ExpectedConditions ile belirli bir koşul gerçekleşene kadar beklenir.',
                lang: 'tr',
            },
        });
        expect(res.status(), await res.text()).toBe(200);
        const body = await res.json();
        expect(typeof body.explanation).toBe('string');
        expect(body.explanation.length).toBeGreaterThan(0);
    });

    test('grade-interview-answer — 200 döner ve puan alanları gelir', async ({ request }) => {
        test.setTimeout(60_000);
        const res = await request.post(`${SUPABASE_URL}/functions/v1/grade-interview-answer`, {
            headers: authHeaders(),
            data: {
                question: 'Selenium\'da implicit wait ile explicit wait arasındaki fark nedir?',
                modelAnswer: 'Implicit wait tüm driver için global bir bekleme süresi tanımlar; explicit wait ise belirli bir elementin belirli bir koşulu sağlamasını bekler ve daha hedefli/performanslıdır.',
                keyPoints: ['Implicit wait global tanımlanır', 'Explicit wait belirli koşula/elemente özeldir'],
                userAnswer: 'Implicit wait driver genelinde geçerli sabit bir bekleme süresidir, explicit wait ise WebDriverWait ile belirli bir koşulu (örn. elementin görünür olması) bekler.',
                lang: 'tr',
            },
        });
        expect(res.status(), await res.text()).toBe(200);
        const body = await res.json();
        expect(typeof body.totalPoints).toBe('number');
        expect(typeof body.coveredPoints).toBe('number');
        expect(typeof body.percent).toBe('number');
    });
});
