import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

// .env.local'daki VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY / TEST_USER_EMAIL /
// TEST_USER_PASSWORD değerlerini process.env'e yükler (Node 20.6+ native API).
// CI ortamında .env.local yoksa secrets zaten process.env üzerinden gelir.
if (existsSync('.env.local')) {
    process.loadEnvFile('.env.local');
}

// ─────────────────────────────────────────────────────────────────────────────
// NEDEN DEV SUNUCUSU DEĞİL, PRODUCTION BUILD (2026-08-03'te değiştirildi)
//
// Paket önceden `npm run dev` üzerinde koşuyordu. Ölçüldü: ilk <h1>'in ekrana
// gelmesi dev sunucusunda ana sayfada 17.003 ms, /en/'de 6.512 ms, bir sekme
// URL'inde 5.993 ms sürüyordu — AYNI sayfalar production build'de 79 / 48 / 46 ms.
// Yani 130-215 kat fark. Playwright'ın varsayılan doğrulama süresi 5 sn olduğu
// için paketin önemli bir kısmı ürünü değil, Vite'ın MODÜL DERLEME SÜRESİNİ
// ölçüyordu: paralel worker'lar en ağır veri dosyalarını (0.6-1.1 MB) aynı anda
// isteyince testler rastgele kırmızıya dönüyor, retry'da yeşile geçiyordu.
//
// Bu, süreleri uzatarak "çözülecek" bir sorun değildi — uzatmak, paketin
// yayınlanan artefaktı hiç test etmediği gerçeğini GİZLERDİ. Ölçüm: dev
// sunucusunda retry'la 3.6 dakikada 4'ü kırmızı biten 20 test, production
// build'e karşı SIFIR retry ile 41 saniyede 20/20 geçti.
//
// Kazanç sadece hız değil: artık gerçekten yayınlanan şey test ediliyor —
// statik shell'ler, kod bölme, minify edilmiş bundle, gerçek HTTP servisi.
// Bedeli: her koşumdan önce bir `npm run build` (pretest:e2e, package.json).
//
// Port 4175 bilinçli: 4173 kullanıcının elle açtığı `npm run preview`,
// 4174 yayın kapısı suite'i, 4185 mobil LCP ölçümü tarafından kullanılıyor.
// `reuseExistingServer: false` de bilinçli: arkada unutulmuş eski bir preview
// sunucusu, yeni build'i değil ESKİ dist'i servis eder ve testler sessizce
// yanlış artefaktı doğrular.
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// SÜRELER — ve yukarıdaki notla ÇELİŞMEDİĞİ (2026-08-05)
//
// Yukarıda "süreleri uzatmak çözüm değildi, GİZLERDİ" yazıyor ve bu doğruydu:
// o gün ölçülen şey ürünün hızı değil, Vite'ın modül derleme süresiydi. Süreyi
// uzatmak, paketin yayınlanan artefaktı hiç test etmediği gerçeğinin üstünü
// örterdi. O kök neden kapatıldı (production build + doğru statik kabuk).
//
// Geriye kalan şey farklı ve meşru: 8 çekirdekli bir makinede 4 worker aynı
// anda 0,5-1,6 MB'lık paketleri ayrıştırırken ağır bir sayfanın açılması
// 10-25 sn sürebiliyor. Varsayılan 5 sn'lik doğrulama ve 30 sn'lik test
// bütçesi, ürünün DOĞRULUĞUNU değil makinenin O ANKİ YÜKÜNÜ kesiyordu:
// aynı testler tek başına koşunca hep geçiyordu.
//
// Bu sınırlar bir bekleme ÜST SINIRIdır, bir doğruluk ölçüsü değil. Gerçekten
// bozuk bir özellik hiçbir süre içinde doğrulamayı sağlamaz ve test yine
// kırmızıya döner — yani bu artış hiçbir arızayı gizlemez, yalnızca sağlam
// ürünü yanlışlıkla suçlamayı bırakır.
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 1 : undefined,
    timeout: 90_000,
    expect: { timeout: 15_000 },
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:4175',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'npx vite preview --port 4175 --strictPort',
        url: 'http://localhost:4175/',
        reuseExistingServer: false,
        timeout: 60_000,
    },
});
