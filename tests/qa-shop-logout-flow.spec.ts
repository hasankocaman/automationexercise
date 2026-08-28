import { test, expect } from '@playwright/test';
import { waitForAppReady } from './helpers/app-ready';

// ─────────────────────────────────────────────────────────────────────────────
// Çıkış akışı — token'ın GERÇEKTEN bırakıldığını doğrular.
//
// Korunan hata: `cikisYap()` token'ı yalnızca React state'inden siliyordu,
// `localStorage`'dan silmiyordu. Ekranda çıkış yapılmış görünüyordu ama sayfa
// yenilendiğinde eski token geri yükleniyor, kullanıcı istemediği bir oturuma
// geri düşüyordu.
//
// ⚠ MOD SEÇİMİ BİLİNÇLİ: dükkân, ayakta bir lokal yığın bulursa ona bağlanır,
// bulamazsa tarayıcı moduna (sql.js + MSW) düşer. Testi ortama bırakmak, aynı
// dosyanın CI'da ve geliştirici makinesinde İKİ FARKLI yolu sınaması demektir.
// Bu yüzden uygulamanın kendi ayar anahtarıyla kapalı bir adrese yönlendirilip
// tarayıcı modu ZORLANIYOR (ağ kesme denenmedi: Service Worker'ın ele aldığı
// istekler `page.route` ile kesilemiyor).
//
// ⚠ KİMLİK BİLGİSİ UYDURULMAZ: giriş formu seed'deki demo hesapla dolu gelir
// (`demo@qashop.test` / `Password123!`) ve bu bilinçli — pratik alanının demo
// hesabı gizli değildir. Uydurma bir e-posta ile giriş denemesi 401 döner;
// testin bunu "çıkış bozuk" sanması hatanın kendisini gizler.
// ─────────────────────────────────────────────────────────────────────────────

const KAPALI_API = 'http://127.0.0.1:45999';   // dinleyen hiçbir şey yok
const TOKEN_ANAHTARI = 'qaShopToken';

async function dukkaniAc(page: import('@playwright/test').Page) {
    await page.addInitScript((adres) => {
        window.localStorage.setItem('qaShopApiBase', adres as string);
    }, KAPALI_API);
    await page.goto('/qa-shop');
    await waitForAppReady(page);

    // Kurulumun GERÇEKTEN uygulandığını doğrula: bu satır olmadan hatalı bir
    // kurulum, testi sessizce yanlış tarafa bakarken bırakır.
    await expect(page.getByTestId('mod-rozeti')).toContainText(/Tarayıcı|Browser/);
}

async function girisYap(page: import('@playwright/test').Page) {
    await page.getByTestId('giris-ac').click();
    await expect(page.getByTestId('giris-yap')).toBeVisible();
    await page.getByTestId('giris-yap').click();
    // Çıkış düğmesinin belirmesi, oturumun gerçekten açıldığı anlamına gelir.
    await expect(page.getByTestId('cikis-yap')).toBeVisible({ timeout: 15_000 });
}

test.describe('QA Shop çıkış akışı', () => {
    test('token yokken giriş düğmesi görünür', async ({ page }) => {
        await dukkaniAc(page);
        await expect(page.getByTestId('giris-ac')).toBeVisible();
        await expect(page.getByTestId('cikis-yap')).toHaveCount(0);
    });

    test('giriş sonrası token localStorage\'a yazılır', async ({ page }) => {
        await dukkaniAc(page);
        await girisYap(page);

        const token = await page.evaluate((k) => localStorage.getItem(k), TOKEN_ANAHTARI);
        expect(token).toBeTruthy();
        await expect(page.getByTestId('oturum-eposta')).toBeVisible();
    });

    test('çıkışta token silinir ve giriş düğmesi geri gelir', async ({ page }) => {
        await dukkaniAc(page);
        await girisYap(page);

        await page.getByTestId('cikis-yap').click();
        await expect(page.getByTestId('giris-ac')).toBeVisible();

        const token = await page.evaluate((k) => localStorage.getItem(k), TOKEN_ANAHTARI);
        expect(token).toBeNull();
    });

    test('çıkıştan sonra sayfa yenilenince oturum GERİ GELMEZ', async ({ page }) => {
        // Asıl hatanın yaşandığı yol: state temizdi ama localStorage kirliydi,
        // yenileme eski token'ı geri yüklüyordu.
        await dukkaniAc(page);
        await girisYap(page);
        await page.getByTestId('cikis-yap').click();
        await expect(page.getByTestId('giris-ac')).toBeVisible();

        await page.reload();
        await waitForAppReady(page);

        await expect(page.getByTestId('giris-ac')).toBeVisible();
        await expect(page.getByTestId('cikis-yap')).toHaveCount(0);
    });

    test('çıkıştan sonra tekrar giriş yapılabilir', async ({ page }) => {
        await dukkaniAc(page);
        await girisYap(page);
        await page.getByTestId('cikis-yap').click();
        await expect(page.getByTestId('giris-ac')).toBeVisible();

        await girisYap(page);
        const token = await page.evaluate((k) => localStorage.getItem(k), TOKEN_ANAHTARI);
        expect(token).toBeTruthy();
    });
});
