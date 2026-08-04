import type { Page } from '@playwright/test';

// ─────────────────────────────────────────────────────────────────────────────
// "Uygulama hazır" sinyali — neden `waitForSelector('h1')` YETMİYOR
//
// Testler uzun süre sayfanın hazır olduğunu `h1`'in belirmesinden anladı. Bu,
// paket dev sunucusuna karşı koştuğu sürece kazara doğru çalıştı: dev'de
// `index.html` boş bir `<div id="root">` taşır, dolayısıyla ekranda görünen ilk
// `h1` zorunlu olarak React'in bastığı başlıktır.
//
// Paket production build'e taşınınca bu varsayım çöktü. Yayınlanan her sayfanın
// içinde, arama motorları için üretilmiş bir statik gövde var
// (`data-seo-fallback`) ve o gövdenin KENDİ `<h1>`'i var. Yani `h1` artık
// JavaScript çalışmadan ÖNCE de vardır: `waitForSelector('h1')` anında çözülür,
// test React mount olmadan devam eder ve otomatik yeniden denemesi OLMAYAN her
// çağrı (`count()`, `evaluate()`, `boundingBox()`, `innerText()`) boş DOM görür.
//
// Gerçekte olan buydu: /python, /java, /sql, /selenium, /jenkins, /kubernetes
// mobil testleri "sidebar sekmesi bulunamadı" diye düştü (sekme sayısı 0),
// 13 test de "flaky" olarak işaretlendi — hiçbirinde ürün bozuk değildi,
// testler sayfanın kabuğunu uygulamanın kendisi sanıyordu.
//
// Doğru sinyal: React'in kabuğu DEĞİŞTİRMİŞ olması. Kabuk `#root` içine
// basılır ve `createRoot(...).render()` mount olurken onu siler — yani
// `[data-seo-fallback]` düğümünün YOK OLMASI, "uygulama gerçekten çalışıyor"
// demenin kesin yoludur.
//
// Dev sunucusuna karşı da güvenlidir: orada kabuk hiç basılmadığı için koşul
// zaten en baştan sağlanır ve davranış eski hâliyle aynı kalır.
// ─────────────────────────────────────────────────────────────────────────────
export async function waitForAppReady(page: Page, options: { timeout?: number } = {}): Promise<void> {
    const timeout = options.timeout ?? 30_000;

    await page.waitForFunction(
        () => !document.querySelector('[data-seo-fallback]'),
        undefined,
        { timeout },
    );

    // Kabuk gittiyse React mount olmuştur; başlığın da basıldığını doğrula ki
    // çağıran taraf eskisiyle aynı garantiyi (sayfanın içeriği var) alsın.
    await page.waitForSelector('h1', { timeout });
}
