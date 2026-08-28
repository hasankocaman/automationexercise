import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { waitForAppReady } from './helpers/app-ready';

// QA Shop alan anahtarının üye hesabıyla senkronu.
//
// ── NEYİ KORUR ──────────────────────────────────────────────────────────────
// Kendi veri alanının anahtarı yalnızca tarayıcıda duruyordu: başka bir
// makineye geçen ya da tarayıcı verisini temizleyen üye, sipariş ve defect
// geçmişi olan alanına bir daha ulaşamıyordu. Anahtar artık üyenin profil
// satırında da tutulur ve dükkân açılırken geri alınır.
//
// ── İKİ DAL, İKİSİ DE GERÇEK ────────────────────────────────────────────────
// Senkron `profiles.qa_shop_sandbox_key` sütununa bağlı ve o sütun tek
// seferlik bir SQL ile eklenir. Sütun yokken hiçbir şey patlamamalı: dükkân
// eskisi gibi tarayıcıdaki anahtarla çalışmalı. Bu yüzden test önce sütunun
// VAR OLUP OLMADIĞINI ölçer ve ölçtüğü duruma göre doğrular:
//   · sütun yok  → bozulmama (fail-safe) doğrulanır
//   · sütun var  → anahtarın gerçekten yazıldığı ve TEMİZ bir tarayıcıda geri
//                  alındığı doğrulanır
// Sütun eklendiği gün bu dosya kendiliğinden asıl davranışı sınamaya başlar.
//
// ── NEDEN GERÇEK YIĞIN GEREKİR ──────────────────────────────────────────────
// Alan açmak yalnızca yerel API kipinde olur; tarayıcı kipinde veri alanı
// zaten kişiye özeldir ve anahtar kavramı yoktur. Yığın ayakta değilse test
// atlanır — yanlış tarafa bakıp yeşil kalmaktansa hiç koşmaması doğrudur.
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

const yapilandirilmis = Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY && TEST_USER_EMAIL && TEST_USER_PASSWORD &&
    !SUPABASE_URL.includes('YOUR_PROJECT_REF') && !SUPABASE_ANON_KEY.includes('xxxx'),
);

const YIGIN = 'http://localhost:4000';
const SUTUN = 'qa_shop_sandbox_key';

test.describe('QA Shop — alan anahtarı üye hesabında hatırlanıyor', () => {
    test.skip(!yapilandirilmis, '.env.local içinde Supabase adresi/anahtarı veya test kullanıcısı eksik');
    test.skip(process.env.GITHUB_ACTIONS === 'true',
        'CI runner IP\'sinden bu Supabase projesinin auth yolu engelleniyor (altyapı kısıtlaması); ayrıca CI\'da QA Shop yığını yok.');
    test.setTimeout(180_000);

    test('üye alan açtığında anahtar hesabına yazılır ve temiz bir tarayıcıda geri gelir', async ({ browser }) => {
        // Yığın gerçekten ayakta mı — kurulum varsayımı testin İÇİNDE doğrulanır.
        const saglik = await fetch(`${YIGIN}/health`).catch(() => null);
        test.skip(!saglik?.ok, 'QA Shop yığını ayakta değil (docker compose up), bu test yerel yığın ister.');

        const istemci = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
        const { data: girisVerisi, error: girisHatasi } = await istemci.auth.signInWithPassword({
            email: TEST_USER_EMAIL!,
            password: TEST_USER_PASSWORD!,
        });
        if (girisHatasi || !girisVerisi.session) {
            throw new Error(`Test kullanıcısıyla giriş başarısız: ${girisHatasi?.message ?? 'oturum yok'}`);
        }
        const oturum = girisVerisi.session;
        const projeRef = new URL(SUPABASE_URL!).hostname.split('.')[0];
        const depoAnahtari = `sb-${projeRef}-auth-token`;

        // Sütun var mı? Yoksa PostgREST 42703 döner.
        async function profilAnahtariniOku(): Promise<{ varMi: boolean; deger: string | null }> {
            const r = await fetch(
                `${SUPABASE_URL}/rest/v1/profiles?select=${SUTUN}&id=eq.${oturum.user.id}`,
                { headers: { apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${oturum.access_token}` } },
            );
            if (!r.ok) return { varMi: false, deger: null };
            const satirlar = await r.json();
            return { varMi: true, deger: satirlar?.[0]?.[SUTUN] ?? null };
        }

        const sutun = await profilAnahtariniOku();

        // Sütuna YAZMA izni, okuma izninden AYRI bir şeydir: bu projede
        // `profiles` üzerindeki update yetkisi TABLO değil SÜTUN düzeyinde.
        // Sütunu eklemek okumayı açar, yazmayı açmaz; senkron o hâlde
        // sessizce ölür. Yoklama NÖTR bir değerle (null) yapılır — anahtarın
        // kendisiyle yapılsaydı, testin ilerideki "uygulama yazdı mı"
        // iddiası kendi yoklamasıyla karşılanır ve BOŞA DÖNERDİ.
        async function yazmaIzniniYokla() {
            return fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${oturum.user.id}`, {
                method: 'PATCH',
                headers: {
                    apikey: SUPABASE_ANON_KEY!,
                    Authorization: `Bearer ${oturum.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [SUTUN]: null }),
            });
        }


        async function dukkanAc(temizDepo: boolean) {
            const context = await browser.newContext({ serviceWorkers: 'block' });
            await context.addInitScript(([anahtar, oturumJson, temiz]) => {
                window.localStorage.setItem(anahtar as string, oturumJson as string);
                window.localStorage.setItem('qaShopApiBase', 'http://localhost:4000');
                if (temiz) window.localStorage.removeItem('qaShopSandboxKey');
            }, [depoAnahtari, JSON.stringify(oturum), temizDepo] as const);
            const page = await context.newPage();
            const hatalar: string[] = [];
            page.on('pageerror', (e) => hatalar.push(String(e)));
            await page.goto('/qa-shop');
            await waitForAppReady(page, { timeout: 60_000 });
            // Oturum gerçekten oturdu mu — bu satır olmadan test "üye değilken"
            // koşup yanlış tarafa bakarken yeşil kalabilir.
            await expect(page.locator('[data-testid="nav-account"]')).toBeVisible({ timeout: 20_000 });
            return { context, page, hatalar };
        }

        // ── 0) Zemini temizle ve yazma iznini ölç ───────────────────────────
        if (sutun.varMi) {
            const izin = await yazmaIzniniYokla();
            expect(izin.ok,
                `Üyenin bu sütuna yazma yetkisi yok (HTTP ${izin.status}). Tek satırlık eksik:
` +
                `  grant update (${SUTUN}) on public.profiles to authenticated;`,
            ).toBe(true);
            // Kayıt artık BOŞ. Bundan sonra oraya bir değer yazabilecek tek
            // taraf uygulamanın kendisidir — iddia bu yüzden anlamlı.
            expect((await profilAnahtariniOku()).deger).toBeNull();
        }
        // ── 1) Üye kendi alanını açıyor ─────────────────────────────────────
        const birinci = await dukkanAc(true);
        await birinci.page.getByTestId('qa-paneli-ac').click();
        await birinci.page.getByTestId('alan-ac').click();
        const anahtarAlani = birinci.page.getByTestId('sandbox-anahtari');
        await expect(anahtarAlani).not.toHaveValue('', { timeout: 40_000 });
        const acilanAnahtar = await anahtarAlani.inputValue();
        expect(acilanAnahtar.length, 'alan anahtarı boş geldi').toBeGreaterThan(10);
        expect(birinci.hatalar, 'üye oturumunda dükkân sayfa hatası üretti').toHaveLength(0);
        await birinci.context.close();

        if (!sutun.varMi) {
            // Sütun eklenmemiş: senkron KAPALI olmalı ve bu sessizce olmalı.
            // Doğrulanan şey budur — üyelik senkron katmanıdır, ön koşul değil.
            test.info().annotations.push({
                type: 'not',
                description: `profiles.${SUTUN} sütunu yok — senkron kapalı, bozulmama doğrulandı.`,
            });
            return;
        }

        // ── 2) Anahtar hesaba yazıldı mı ────────────────────────────────────
        await expect.poll(async () => (await profilAnahtariniOku()).deger, { timeout: 20_000 })
            .toBe(acilanAnahtar);

        // ── 3) Temiz bir tarayıcı aynı alana dönüyor mu ─────────────────────
        // Asıl vaat bu: yeni makine, boş depo, aynı hesap.
        const ikinci = await dukkanAc(true);
        await ikinci.page.getByTestId('qa-paneli-ac').click();
        await expect(ikinci.page.getByTestId('sandbox-anahtari'), 'kayıtlı alan geri gelmedi')
            .toHaveValue(acilanAnahtar, { timeout: 40_000 });
        expect(ikinci.hatalar).toHaveLength(0);
        await ikinci.context.close();
    });
});

// Yukarıdaki test, sütun eklenene kadar yalnızca "senkron kapalı" dalını
// koşar — yani ASIL vaat (kayıtlı anahtarı geri getirme) sınanmadan kalır.
// Bu test o boşluğu kapatır: profil okumasının cevabını sabitleyip istemci
// tarafının anahtarı gerçekten benimsediğini doğrular. Servis çalışanı bu
// bağlamda kapalı olduğu için istek KESİLEBİLİR (aksi hâlde ele geçirme
// sessizce çalışmazdı).
test.describe('QA Shop — kayıtlı alan anahtarının benimsenmesi', () => {
    test.skip(!yapilandirilmis, '.env.local içinde Supabase adresi/anahtarı veya test kullanıcısı eksik');
    test.skip(process.env.GITHUB_ACTIONS === 'true', 'CI runner IP\'sinden Supabase auth yolu engelleniyor.');
    test.setTimeout(120_000);

    test('hesapta kayıtlı anahtar varsa temiz tarayıcı onu benimser', async ({ browser }) => {
        const istemci = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
        const { data, error } = await istemci.auth.signInWithPassword({
            email: TEST_USER_EMAIL!, password: TEST_USER_PASSWORD!,
        });
        if (error || !data.session) throw new Error(`Giriş başarısız: ${error?.message ?? 'oturum yok'}`);
        const oturum = data.session;
        const projeRef = new URL(SUPABASE_URL!).hostname.split('.')[0];

        const KAYITLI = 'sbx_uye_senkron_testi_0123456789';

        const context = await browser.newContext({ serviceWorkers: 'block' });
        await context.addInitScript(([anahtar, oturumJson]) => {
            window.localStorage.setItem(anahtar as string, oturumJson as string);
            window.localStorage.removeItem('qaShopSandboxKey');
        }, [`sb-${projeRef}-auth-token`, JSON.stringify(oturum)] as const);

        const page = await context.newPage();
        // Yalnızca alan anahtarı okuması sabitlenir; profilin geri kalanı
        // (rol, avatar, xp) gerçek cevabıyla gelmeye devam eder.
        let okundu = 0;
        await page.route((url) => url.pathname.endsWith('/rest/v1/profiles')
            && url.searchParams.get('select') === 'qa_shop_sandbox_key', async (route) => {
            okundu += 1;
            await route.fulfill({
                status: 200,
                contentType: 'application/vnd.pgrst.object+json',
                body: JSON.stringify({ qa_shop_sandbox_key: KAYITLI }),
            });
        });

        await page.goto('/qa-shop');
        await waitForAppReady(page, { timeout: 60_000 });
        await expect(page.locator('[data-testid="nav-account"]')).toBeVisible({ timeout: 20_000 });

        await page.getByTestId('qa-paneli-ac').click();
        await expect(page.getByTestId('sandbox-anahtari'), 'kayıtlı anahtar benimsenmedi')
            .toHaveValue(KAYITLI, { timeout: 30_000 });

        // Sonraki açılışlarda ağ beklemesin diye tarayıcıya da yazılmalı.
        await expect.poll(() => page.evaluate(() => localStorage.getItem('qaShopSandboxKey')))
            .toBe(KAYITLI);

        expect(okundu, 'profil anahtarı hiç okunmadı — köprü çalışmıyor').toBeGreaterThan(0);
        await context.close();
    });
});
