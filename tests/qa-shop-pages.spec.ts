import { test, expect } from '@playwright/test';
import { waitForAppReady } from './helpers/app-ready';

// QA Shop pratik ortamının ÜÇ sayfası: şartname → kurulum → dükkân.
//
// Bu suite'in var olma sebebi iki katmanlı:
//   1. Üçü de 2026-08-17'de admin kapısından çıkarılıp HERKESE açıldı. Bir
//      sayfayı açmak yalnızca route korumasını kaldırmak değildir; buradaki
//      testler açılışın gerçekten tamamlandığını (sayfa anonim tarayıcıda
//      içerik gösteriyor) her koşumda doğrular.
//   2. Dükkân sayfası kullanıcının kendi makinesindeki API'ye bağlanır.
//      CI'da o yığın YOKTUR — bu yüzden sayfanın yığın kapalıyken boş bir
//      hata değil, ne yapılacağını anlatan bir yönlendirme göstermesi
//      ürünün gerçek bir davranışıdır ve test edilmesi gerekir.
//
// ⚠ Dükkân sayfası "yığın kapalı" hâlinde test edilirken ağ KESİLMİYOR;
// uygulama KENDİ ayarıyla kapalı bir adrese yönlendiriliyor.
//
// Neden böyle: yığın ayakta olan bir makinede test, kapalı olduğu CI'dan
// farklı bir yolu izler — aynı test iki ortamda iki ayrı şeyi doğrular ve
// hangisinin koştuğu belirsizleşir. İlk çözüm `page.route(...)` ile isteği
// kesmekti ve ÇALIŞMADI: sayaç 0'da kaldı, sayfa "API: up" göstermeye devam
// etti. Sebebi ölçüldü — bu uygulama bir Service Worker kaydediyor
// (`mockServiceWorker.js`) ve Service Worker'ın ele aldığı istekler
// `page.route` ile kesilemiyor. Yani kesici sessizce hiçbir şey yapmıyordu.
//
// Adresi uygulamanın kendi ayar anahtarından vermek hem ele geçirme
// semantiğine hiç bağlı değil, hem de ürünün gerçekten desteklediği yolu
// (kullanıcı API adresini değiştirebilir) sınıyor.
const KAPALI_API = 'http://127.0.0.1:45999';   // dinleyen hiçbir şey yok

const ALLOWED_CONSOLE_ERROR_PATTERNS = [
    /net::ERR_/i,
    /supabase/i,
    /Failed to fetch/i,
    /Load failed/i,
];

function isAllowedError(msg: string): boolean {
    return ALLOWED_CONSOLE_ERROR_PATTERNS.some((re) => re.test(msg));
}

function collectErrors(page: import('@playwright/test').Page): string[] {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (msg) => {
        if (msg.type() === 'error' && !isAllowedError(msg.text())) errors.push(msg.text());
    });
    return errors;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Şartname sayfası
// ─────────────────────────────────────────────────────────────────────────────
test('/qa-shop-spec — şartname anonim kullanıcıya açık ve 16 story render ediyor', async ({ page }) => {
    test.setTimeout(90_000);
    const errors = collectErrors(page);

    await page.goto('/qa-shop-spec');
    await waitForAppReady(page, { timeout: 60_000 });

    // Admin kapısı kalktı mı: sayfanın KENDİ içeriği görünüyorsa kilit yok.
    await expect(page.locator('[data-testid="spec-measured-note"]')).toBeVisible();
    await expect(page.locator('[data-testid="spec-stat-cards"]')).toBeVisible();

    // Altı bölüm de yerinde
    for (const id of ['urun', 'veri-modeli', 'yasam-dongusu', 'kurallar', 'hata-katalogu', 'user-stories']) {
        await expect(page.locator(`[data-testid="spec-section-${id}"]`), `bölüm ${id}`).toBeVisible();
    }

    // Görseller: veri modeli ve durum makinesi gerçekten çizilmiş olmalı
    await expect(page.locator('[data-testid="spec-entity-map"] svg')).toBeVisible();
    await expect(page.locator('[data-testid="spec-state-machine"] svg')).toBeVisible();

    // 16 story kartı
    const stories = page.locator('[data-testid^="spec-story-US-"]');
    await expect(stories).toHaveCount(16);

    // 7 kural kartı
    await expect(page.locator('[data-testid^="spec-rule-K"]')).toHaveCount(7);

    expect(errors, '/qa-shop-spec: console/page hataları').toHaveLength(0);
});

// Büyük resim, detaylardan ÖNCE gelmek zorunda: kullanıcı 16 story'ye
// inmeden ne olduğunu, farkını ve nereden başlayacağını görmeli. Sıra
// bozulursa sayfa yine "çalışır" ama okuyucu neyi okuduğunu bilmez —
// bu yüzden sıra da doğrulanıyor, yalnızca varlık değil.
test('/qa-shop-spec — büyük resim detaylardan ÖNCE geliyor', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/qa-shop-spec');
    await waitForAppReady(page, { timeout: 60_000 });

    const bigPicture = page.locator('[data-testid="spec-big-picture"]');
    await expect(bigPicture).toBeVisible();

    // Dört parça da yerinde
    await expect(page.locator('[data-testid="spec-layer-flow"]')).toBeVisible();
    await expect(page.locator('[data-testid="spec-comparison"]')).toBeVisible();
    await expect(page.locator('[data-testid="spec-quick-start"]')).toBeVisible();
    await expect(page.locator('[data-testid="bigpicture-to-setup"]')).toBeVisible();

    // SIRA: büyük resim, ilk detay bölümünden yukarıda olmalı
    const bpBox = await bigPicture.boundingBox();
    const firstDetail = await page.locator('[data-testid="spec-section-urun"]').boundingBox();
    const stories = await page.locator('[data-testid="spec-section-user-stories"]').boundingBox();
    expect(bpBox, 'büyük resim ölçülemedi').not.toBeNull();
    expect(bpBox!.y, 'büyük resim ilk detay bölümünün ALTINDA').toBeLessThan(firstDetail!.y);
    expect(firstDetail!.y, 'detay bölümü story listesinin altında değil').toBeLessThan(stories!.y);

    // Karşılaştırma tablosu gerçekten iki sütunu kıyaslıyor mu
    const comparisonRows = page.locator('[data-testid="spec-comparison"] tbody tr');
    expect(await comparisonRows.count(), 'karşılaştırma satırı yok').toBeGreaterThanOrEqual(4);
});

// SSS hem sayfada görünür olmalı hem arama motoru şemasını beslemeli.
// İkisi ayrışırsa (şemada var, ekranda yok) bu arama motoru politikası
// ihlalidir — projenin daha önce bir sayfada FAQ eklemekten bilerek
// vazgeçmesinin sebebi tam olarak buydu.
test('/qa-shop-spec — SSS sayfada GÖRÜNÜR ve şemadaki sorularla birebir aynı', async ({ page, request }) => {
    test.setTimeout(90_000);
    await page.goto('/qa-shop-spec');
    await waitForAppReady(page, { timeout: 60_000 });

    const faq = page.locator('[data-testid="spec-faq"]');
    await expect(faq).toBeVisible();
    const visibleText = await faq.innerText();

    // Şemayı ham HTML'den oku (React'in bastığı değil, crawler'ın gördüğü)
    const raw = await (await request.get('/qa-shop-spec')).text();
    const blocks = [...raw.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    let questions: string[] = [];
    for (const b of blocks) {
        const parsed = JSON.parse(b[1]);
        const nodes = Array.isArray(parsed) ? parsed : (parsed['@graph'] ?? [parsed]);
        for (const node of nodes) {
            if (node['@type'] === 'FAQPage') questions = node.mainEntity.map((q: any) => q.name);
        }
    }

    expect(questions.length, 'FAQPage şeması bulunamadı ya da 3 sorudan az').toBeGreaterThanOrEqual(3);
    for (const q of questions) {
        expect(visibleText, `şemadaki soru sayfada GÖRÜNMÜYOR: ${q}`).toContain(q);
    }
});

test('/qa-shop-spec — zorluk ve katman filtreleri gerçekten süzüyor', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/qa-shop-spec');
    await waitForAppReady(page, { timeout: 60_000 });

    const stories = page.locator('[data-testid^="spec-story-US-"]');
    const counter = page.locator('[data-testid="spec-story-count"]');

    await expect(stories).toHaveCount(16);

    // Zorluk süzgeci: başlangıç seviyesi 16'nın ALTINDA bir sayı vermeli.
    // "Filtre bir şey yapıyor mu" sorusunun cevabı bu karşılaştırmadır —
    // yalnızca "sayfa çöküyor mu" diye bakan bir test, hiçbir şeyi süzmeyen
    // bozuk bir filtreyi yeşil geçerdi.
    await page.locator('[data-testid="filter-difficulty-basic"]').click();
    const basicCount = await stories.count();
    expect(basicCount, 'başlangıç story sayısı').toBeGreaterThan(0);
    expect(basicCount, 'başlangıç filtresi süzmedi').toBeLessThan(16);
    await expect(counter).toContainText(`${basicCount} / 16`);

    // Her görünen kart gerçekten o zorlukta mı
    for (let i = 0; i < basicCount; i++) {
        await expect(stories.nth(i)).toHaveAttribute('data-difficulty', 'basic');
    }

    // Katman süzgeci: DB katmanı da daraltmalı
    await page.locator('[data-testid="filter-difficulty-all"]').click();
    await expect(stories).toHaveCount(16);
    await page.locator('[data-testid="filter-layer-DB"]').click();
    const dbCount = await stories.count();
    expect(dbCount, 'DB filtresi süzmedi').toBeLessThan(16);
    for (let i = 0; i < dbCount; i++) {
        await expect(stories.nth(i)).toHaveAttribute('data-layers', /DB/);
    }

    // Geri dönüş: filtre sıfırlanınca hepsi geri gelmeli
    await page.locator('[data-testid="filter-layer-all"]').click();
    await expect(stories).toHaveCount(16);
});

// Kabul kriterleri iki sürümlü: herkese görünen SADE sürüm iş dilindedir,
// ayrıntılı Given/When/Then dökümü yalnızca admin'e açılır.
//
// Bu test, sahaya çıkan sürümün gerçekten sade olduğunu korur. Beklenen
// status kodunu ve hata sabitini kriterin içine geri koymak, test edenin
// üretmesi gereken cevabı peşinen vermek olur — ve bunu hiçbir derleme
// kapısı yakalamaz, çünkü sayfa yine "çalışır".
//
// ⚠ Gherkin anahtar kelimelerinin İNGİLİZCE kaldığı ayrıca korunuyor ama
// tarayıcıdan DEĞİL: o döküm artık anonim ziyaretçiye render edilmiyor.
// Kuralı build kapısı denetliyor (check-content-integrity Kontrol [G]),
// burada veri üstünden bir kez daha doğrulanıyor.
test('/qa-shop-spec — kabul kriterleri sahadaki gibi sade, teknik döküm görünmüyor', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/qa-shop-spec');
    await waitForAppReady(page, { timeout: 60_000 });

    const firstStory = page.locator('[data-testid="spec-story-US-01"]');
    await expect(firstStory).toBeVisible();

    // Sade kriterler görünür ve gerçekten cümle hâlinde.
    const sade = page.locator('[data-testid="spec-acceptance-US-01"] li');
    await expect(sade).toHaveCount(4);
    await expect(sade.first()).toContainText(/hesap|account/i);

    const text = await firstStory.innerText();

    // Teknik döküm anonim ziyaretçiye KAPALI: ne Gherkin, ne status kodu,
    // ne hata sabiti.
    for (const forbidden of ['Given', 'When', 'Then', '201', '409', '422', 'WEAK_PASSWORD', 'EMAIL_ALREADY_EXISTS']) {
        expect(text, `teknik döküm sızıyor: ${forbidden}`).not.toContain(forbidden);
    }

    // Admin paneli hiç render edilmemeli — gizlenmiş değil, YOK olmalı.
    await expect(page.locator('[data-testid="spec-admin-US-01"]')).toHaveCount(0);

    // Aynı kural iş kuralı kartları için de geçerli: "nasıl doğrulanır"
    // ölçülmüş status kodunu ve gerçek sayıları veriyordu, "kıran anahtar"
    // ise defect'in adını. İkisi de sahada kural belgesiyle gelmez.
    const kuralKarti = page.locator('[data-testid="spec-rule-K6"]');
    await expect(kuralKarti).toBeVisible();
    const kuralMetni = await kuralKarti.innerText();
    for (const forbidden of ['403', '404', 'FORBIDDEN', 'Ölçülen', 'leak_other_users_orders']) {
        expect(kuralMetni, `kural kartı cevabı veriyor: ${forbidden}`).not.toContain(forbidden);
    }
    await expect(page.locator('[data-testid="spec-admin-K6"]')).toHaveCount(0);

    // Yaşam döngüsü tablosu bir test reçetesi değil, iş kuralı olmalı:
    // "hangi geçiş izinli" kalır, "hangi kodu döndürür" gitmelidir.
    const yasamBolumu = page.locator('[data-testid="spec-section-yasam-dongusu"]');
    const yasamMetni = await yasamBolumu.innerText();
    for (const forbidden of ['402', '409', 'INVALID_TRANSITION', 'ALREADY_PAID']) {
        expect(yasamMetni, `yaşam döngüsü tablosu beklenen kodu veriyor: ${forbidden}`).not.toContain(forbidden);
    }
    // Ama iş kuralı DURMALI — tabloyu boşaltmak da bir kayıp olurdu.
    expect(yasamMetni).toContain('İzinli');
    expect(yasamMetni).toContain('Yasak');

    // Türkçeleştirilmiş Gherkin hiçbir sürümde olmamalı.
    for (const forbidden of ['Diyelim ki', 'O zaman', 'Senaryo:']) {
        expect(text, `Gherkin Türkçeleştirilmiş: ${forbidden}`).not.toContain(forbidden);
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Kurulum rehberi
// ─────────────────────────────────────────────────────────────────────────────
test('/qa-shop-setup — kurulum rehberi anonim kullanıcıya açık, 4 adım görünür', async ({ page }) => {
    test.setTimeout(90_000);
    const errors = collectErrors(page);

    await page.goto('/qa-shop-setup');
    await waitForAppReady(page, { timeout: 60_000 });

    await expect(page.locator('[data-testid="qa-shop-setup-isolation"]')).toBeVisible();
    await expect(page.locator('[data-testid="qa-shop-setup-roadmap"]')).toBeVisible();

    for (const n of [1, 2, 3, 4]) {
        await expect(page.locator(`[data-testid="practice-step-${n}"]`), `adım ${n}`).toBeVisible();
    }

    expect(errors, '/qa-shop-setup: console/page hataları').toHaveLength(0);
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Dükkân arayüzü — yığın KAPALI hâli
// ─────────────────────────────────────────────────────────────────────────────
// Yığın KAPALIYKEN sayfa artık kurulum ekranı göstermez: tarayıcı içi katman
// devreye girer ve dükkân çalışır. Bu testin koruduğu vaat bu — Docker
// kurmamış ziyaretçi ölü sayfa değil, çalışan bir mağaza görür.
//
// Kullanıcının çıkmaz sokakta bırakılmaması güvencesi kaybolmadı, yer
// değiştirdi: mod rozetine basınca iki modun farkı ve kurulum rehberi linki
// çıkar. CI'da yığın zaten yoktur, yani bu test orada GERÇEK yolu sınar.
test('/qa-shop — stack kapalıyken tarayıcı modu devreye giriyor ve dükkân çalışıyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    const errors = collectErrors(page);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });

    // Kurulumun gerçekten uygulandığını doğrula: bu satır olmadan test
    // yanlış tarafa bakarken sessizce yeşil kalabilir.
    await page.getByTestId('qa-paneli-ac').click();
    await expect(page.locator('[data-testid="api-adresi"]')).toHaveValue(KAPALI_API);
    await page.getByTestId('qa-paneli-ac').click();

    // Vitrin gerçekten geliyor: ürün ızgarası ve ürün görselleri.
    await expect(page.locator('[data-testid="urun-listesi"]')).toBeVisible({ timeout: 60_000 });
    const kartSayisi = await page.locator('[data-testid^="urun-gorsel-"]').count();
    expect(kartSayisi, 'tarayıcı modunda ürün kartı gelmedi').toBeGreaterThan(0);

    // Mod rozeti tarayıcı modunu söylüyor.
    await expect(page.locator('[data-testid="mod-rozeti"]')).toContainText(/Tarayıcı|Browser/);

    // Kurulum yönlendirmesi kayıp değil: rozete basınca sınırı ve rehberi anlatır.
    await page.getByTestId('mod-rozeti').click();
    await expect(page.locator('[data-testid="mod-sinir"]')).toBeVisible();
    await expect(page.locator('[data-testid="mod-kuruluma-git"]')).toHaveAttribute('href', /qa-shop-setup/);
    await page.getByTestId('mod-katman-kapat').click();

    expect(errors, '/qa-shop tarayıcı modu: console/page hataları').toHaveLength(0);
});

// Tarayıcı modunda UÇTAN UCA alışveriş: CI'da yığın olmadan koşar.
test('/qa-shop — tarayıcı modunda giriş → sepet → sipariş akışı tamamlanıyor', async ({ page }) => {
    test.setTimeout(150_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });
    await expect(page.locator('[data-testid="urun-listesi"]')).toBeVisible({ timeout: 60_000 });

    await page.getByTestId('giris-ac').click();
    await page.getByTestId('giris-eposta').fill('demo@qashop.test');
    await page.getByTestId('giris-parola').fill('Password123!');
    await page.getByTestId('giris-yap').click();
    await expect(page.locator('[data-testid="oturum-eposta"]')).toBeVisible({ timeout: 40_000 });

    await page.locator('[data-testid^="urun-detay-"]').first().click();
    await expect(page.locator('[data-testid="detay-ad"]')).toBeVisible({ timeout: 40_000 });
    await page.locator('[data-testid^="sepete-ekle-"]').first().click();
    await expect(page.locator('[data-testid="sepet-sayaci"]')).not.toHaveText('0', { timeout: 40_000 });

    await page.getByTestId('sepet-butonu').click();
    await expect(page.locator('[data-testid="sepet-satirlari"]')).toBeVisible({ timeout: 40_000 });
    await page.getByTestId('odemeye-gec').click();
    await expect(page.locator('[data-testid="odeme-yontemleri"]')).toBeVisible({ timeout: 40_000 });
    await page.getByTestId('siparis-tamamla').click();

    await expect(page.locator('[data-testid="siparis-onay"]')).toBeVisible({ timeout: 60_000 });
    await expect(page.locator('[data-testid="onay-durum"]')).toHaveText('paid');
});

// Manuel test turu: panel kapalı gelir, açılınca 12 adımı ve DevTools'un
// doğruluk kaynağı olduğunu söyler.
test('/qa-shop — manuel tur cevabı ancak bulgu kaydedildikten SONRA açıyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });

    // Panel KAPALI başlar: ilk ekran saf mağaza olmalı.
    await expect(page.locator('[data-testid="manuel-tur-panel"]')).toHaveCount(0);

    await page.getByTestId('manuel-tur-ac').click();
    await expect(page.locator('[data-testid="manuel-tur-panel"]')).toBeVisible();

    const adimlar = page.locator('[data-testid^="manuel-adim-girdi-"]');
    await expect(adimlar).toHaveCount(12);

    // Panel sahte ağ günlüğü göstermez; doğruluk kaynağının DevTools olduğunu yazar.
    await expect(page.locator('[data-testid="manuel-tur-dogruluk"]')).toBeVisible();

    // ── Asıl korunan davranış ───────────────────────────────────────────────
    // Beklenen status kodu ve endpoint yolu, kullanıcı kendi bulgusunu
    // KAYDETMEDEN önce hiçbir yerde görünmemeli. Görünürse tur bir okuma
    // alıştırmasına döner ve sınır değer analizini yapma fırsatı kaybolur.
    const panel = page.getByTestId('manuel-tur-panel');
    const oncesi = await panel.innerText();
    for (const forbidden of ['/api/v1/orders/{id}/pay', '409', '422', '403']) {
        expect(oncesi, `cevap kaydetmeden önce görünüyor: ${forbidden}`).not.toContain(forbidden);
    }
    await expect(page.locator('[data-testid^="manuel-adim-status-"]')).toHaveCount(0);

    // İlerleme sayacı "gezildi" değil "kapatıldı" sayar: hiçbir bulgu
    // kaydedilmeden sayaç 0 olmalı.
    await expect(page.getByTestId('manuel-tur-sayac')).toContainText('0/12');

    // ── Bulgu kaydet → doğrulama açılır ─────────────────────────────────────
    const odeme = page.getByTestId('manuel-adim-odeme');
    await odeme.getByTestId('manuel-adim-girdi-odeme').fill('200');
    await odeme.getByTestId('manuel-adim-kaydet-odeme').click();

    const dogrulama = page.getByTestId('manuel-adim-dogrulama-odeme');
    await expect(dogrulama).toBeVisible();
    // Ödeme adımı sözleşmedeki GERÇEK yolu göstermeli (/payments değil).
    await expect(dogrulama).toContainText('/api/v1/orders/{id}/pay');
    await expect(page.getByTestId('manuel-adim-status-odeme')).toHaveText('200');
    await expect(page.getByTestId('manuel-tur-sayac')).toContainText('1/12');

    // ── Tutmayan bulgu cezalandırılmaz, ikisi yan yana gösterilir ───────────
    await page.getByTestId('manuel-adim-geri-odeme').click();
    await odeme.getByTestId('manuel-adim-girdi-odeme').fill('418');
    await odeme.getByTestId('manuel-adim-kaydet-odeme').click();
    const ikinci = page.getByTestId('manuel-adim-dogrulama-odeme');
    await expect(ikinci).toContainText('418');
    await expect(ikinci).toContainText('200');
});
// ─────────────────────────────────────────────────────────────────────────────
// 3b. Kusur paneli — VARSAYILAN durum avdır, cevap anahtarı değil
// ─────────────────────────────────────────────────────────────────────────────
// Bu dükkân kusuru AÇMAK için değil BULMAK için var. On kusuru adıyla ve
// hangi kontrolün yakalayacağıyla listeleyen panel ekranda dururken kimse
// kusuru aramaz — okur. Bu yüzden kendi veri alanı yazılabilir olur olmaz
// gizli bir tur kendiliğinden başlar ve adlı liste kullanıcı isteyene kadar
// hiç render edilmez.
//
// ⚠ BU TEST ÖNCE YANLIŞ ŞEYE BAKIYORDU. "Kendi alanı olmayan kullanıcıya
// panel kilitli" diyor ve kapalı bir API adresi kuruyordu; oysa kapalı adres
// uygulamayı TARAYICI moduna düşürür ve orada veri alanı kişiye özeldir,
// yani kilit hiç devreye girmez. Test yeşildi çünkü doğrulamalar tarayıcı
// modu başlamadan ÖNCEKİ ilk karede geçiyordu — ürünü değil, bir yarışı
// ölçüyordu. Kilidin gerçek yolu (lokal API + geçersiz anahtar) ayakta bir
// yığın ister; CI'da yığın yoktur, bu yüzden burada sınanamaz ve sınanıyormuş
// gibi yapılmaz.
test('/qa-shop — defect paneli varsayılan olarak av modunda açılır', async ({ page }) => {
    test.setTimeout(90_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    const errors = collectErrors(page);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });

    // Kurulumun GERÇEKTEN uygulandığını doğrula: bu satır olmadan hatalı bir
    // kurulum, testi sessizce yanlış tarafa bakarken bırakır.
    await expect(page.getByTestId('mod-rozeti')).toContainText(/Tarayıcı|Browser/, { timeout: 30_000 });

    // Av şeridi dükkânın KENDİ ekranında olmalı: teknik panel kapalı gelir ve
    // kapalı bir panelin dibindeki davet, davet sayılmaz.
    const serit = page.getByTestId('av-seridi');
    await expect(serit).toBeVisible({ timeout: 30_000 });

    // Kaç kusur canlı olduğu SÖYLENİR, hangileri olduğu söylenmez.
    const seritMetni = await page.getByTestId('av-seridi-sayi').innerText();
    const canliSayi = Number(seritMetni.match(/\d+/)?.[0] ?? 0);
    expect(canliSayi, 'av şeridi canlı kusur sayısını söylemiyor').toBeGreaterThan(0);

    // Teknik panel bilerek KAPALI gelir; testin onu açması gerekir.
    await page.getByTestId('qa-paneli-ac').click();
    await expect(page.locator('[data-testid="api-adresi"]')).toHaveValue(KAPALI_API);
    await expect(page.locator('[data-testid="bolum-kusurlar"]')).toBeVisible({ timeout: 30_000 });

    // Gizli tur sürüyor: sayaç turdaki adedi gösterir, cevabı değil.
    await expect(page.getByTestId('gizli-tur-durum')).toBeVisible();
    await expect(page.getByTestId('kusur-sayaci')).toContainText(String(canliSayi));

    // ── Asıl korunan davranış: adlı liste CEVAP ANAHTARIDIR, varsayılan YOK ──
    await expect(
        page.locator('[data-testid="kusur-listesi"]'),
        'adlı kusur listesi istenmeden render ediliyor — arama okumaya dönüşür',
    ).toHaveCount(0);
    await expect(page.locator('[data-testid^="kusur-ad-"]')).toHaveCount(0);

    // Kullanıcı isterse açılır — ve ne açtığı önceden söylenir.
    await page.getByTestId('adli-liste-anahtari').click();
    await expect(page.getByTestId('kusur-listesi')).toBeVisible();
    await expect(page.getByTestId('adli-liste-uyarisi')).toBeVisible();

    // Gizli tur sürerken anahtarlar tek tek çevrilemez: öyle olsaydı cevap
    // deneme yanılmayla bulunurdu.
    await expect(page.locator('[data-testid^="kusur-anahtar-"]')).toHaveCount(0);

    // "Hangi kontrol yakalar" bir sonraki adımın cevabıdır: kapalı gelir,
    // tıklamayla açılır (hover'a bağlansaydı dokunmatikte erişilemezdi).
    const ipucu = page.getByTestId('kusur-ipucu-oversell');
    await expect(ipucu).toBeHidden();
    await page.getByTestId('kusur-ipucu-ac-oversell').click();
    await expect(ipucu).toBeVisible();

    expect(errors, '/qa-shop kusur paneli: console/page hataları').toHaveLength(0);
});


// ─────────────────────────────────────────────────────────────────────────────
// 3d. Hazır paketler GERÇEKTEN inilebiliyor mu
// ─────────────────────────────────────────────────────────────────────────────
// Postman koleksiyonu ve REST Assured başlangıç projesi depoda AYLARDIR
// duruyordu ama siteden hiçbir yere bağlı değildi; aktif olarak arayan bir
// inceleme bile bulamamıştı. Ders: üretmek yetmiyor, ulaşılabilir olması
// gerekiyor — ve "link sayfada var" da yetmiyor, linkin ARKASINDA dosya
// olmalı. Bu yüzden test linki görmekle kalmıyor, adresi gerçekten çekiyor.
//
// Dosyalar build sırasında kaynaktan üretilir
// (scripts/build-qa-shop-downloads.mjs); depoda durmazlar. Bu test aynı
// zamanda o üretimin build zincirinde koştuğunun kanıtıdır.
const INDIRILEBILIR = [
    { id: 'postman', yol: '/qa-shop/indirilebilir/qa-shop.postman_collection.json' },
    { id: 'postman-ortam', yol: '/qa-shop/indirilebilir/qa-shop.postman_environment.json' },
    { id: 'rest-assured', yol: '/qa-shop/indirilebilir/qa-shop-rest-assured-starter.zip' },
];

test('/qa-shop-api — hazır paketlerin linki var ve arkasında dosya duruyor', async ({ page }) => {
    test.setTimeout(90_000);
    const errors = collectErrors(page);

    await page.goto('/qa-shop-api');
    await waitForAppReady(page, { timeout: 60_000 });

    await expect(page.getByTestId('api-paketler')).toBeVisible();

    for (const paket of INDIRILEBILIR) {
        const link = page.getByTestId(`indir-${paket.id}`);
        await expect(link, `${paket.id} linki sayfada yok`).toBeVisible();
        await expect(link).toHaveAttribute('href', paket.yol);

        const cevap = await page.request.get(paket.yol);
        expect(cevap.status(), `${paket.yol} indirilemiyor`).toBe(200);
        const govde = await cevap.body();
        expect(govde.length, `${paket.yol} boş`).toBeGreaterThan(500);

        // Dosya gerçekten beklenen formatta mı: 200 dönen bir SPA yedeği de
        // 200 döner, o yüzden içeriğe bakmak gerekiyor.
        if (paket.yol.endsWith('.zip')) {
            expect(govde.subarray(0, 2).toString('latin1'), 'zip imzası yok').toBe('PK');
        } else {
            expect(() => JSON.parse(govde.toString('utf8')), `${paket.yol} geçerli JSON değil`).not.toThrow();
        }
    }

    expect(errors, '/qa-shop-api paketler: console/page hataları').toHaveLength(0);
});

test('/qa-shop-setup — hazır paketler kurulum rehberinden de inilebiliyor', async ({ page }) => {
    test.setTimeout(90_000);
    const errors = collectErrors(page);

    await page.goto('/qa-shop-setup');
    await waitForAppReady(page, { timeout: 60_000 });

    for (const paket of INDIRILEBILIR) {
        const link = page.getByTestId(`indir-${paket.id}`);
        await expect(link, `${paket.id} linki kurulum rehberinde yok`).toBeVisible();
        await expect(link).toHaveAttribute('href', paket.yol);
    }

    // SQL doğrulama paketi YALNIZCA bu sayfada linkli (API sayfasında değil),
    // bu yüzden paylaşılan listede yok.
    //
    // ⚠ Bu satırların koruduğu şey: rehber bir zamanlar paketi yalnızca depo
    // yoluyla tarif ediyordu ("qa-shop/db/validation-queries.sql dosyasını
    // aç"). Docker imajlarıyla kuran, depoyu hiç indirmemiş kullanıcının
    // açacağı böyle bir dosya YOKTUR — dosya imajın içinde ama konteynerin
    // içinde, DBeaver oraya bakamaz. Link kaybolursa o kullanıcı için paket
    // yine erişilemez olur ve bunu hiçbir derleme kapısı söylemez.
    const sqlLink = page.getByTestId('indir-validation-queries');
    await expect(sqlLink, 'SQL doğrulama paketi linki yok').toBeVisible();
    await expect(sqlLink).toHaveAttribute('href', '/qa-shop/indirilebilir/qa-shop-validation-queries.sql');

    const sqlCevap = await page.request.get('/qa-shop/indirilebilir/qa-shop-validation-queries.sql');
    expect(sqlCevap.status(), 'SQL paketi indirilemiyor').toBe(200);
    const govde = await sqlCevap.text();
    expect(govde, 'inen dosya beklenen paket değil').toContain('A1 · Sipariş toplamı');

    expect(errors, '/qa-shop-setup paketler: console/page hataları').toHaveLength(0);
});

// Kurulum rehberindeki TEK ekran görüntüsü: 'gerçekten çalışıyor' anı.
// On adım okuyup hiç sonuç görmemek, yordam rehberlerinde kullanıcının
// yarıda bıraktığı yerdir. Ekrandan ÖNCE Docker uyarısı gelmeli: hedef
// ayakta değilken atılan istek bir test hatası değildir ve bunu bilmeyen
// kişi kendi kurulumunu bozuk sanır.
test('/qa-shop-setup — Docker uyarısı ve Postman ekranı yerinde', async ({ page }) => {
    test.setTimeout(90_000);
    const errors = collectErrors(page);

    await page.goto('/qa-shop-setup');
    await waitForAppReady(page, { timeout: 60_000 });

    const aciklama = page.getByTestId('postman-ekrani-aciklama');
    await aciklama.scrollIntoViewIfNeeded();
    await expect(aciklama).toBeVisible();
    await expect(aciklama).toContainText('200 OK');

    const figur = page.locator('figure:has([data-testid="postman-ekrani-aciklama"])');
    await expect(figur.locator('svg')).toBeVisible();

    // Ekran görüntüsünden ÖNCE Docker uyarısı gelmeli — sıra önemli.
    const uyari = page.getByText(/Docker ayakta mı|is Docker running/);
    await expect(uyari).toBeVisible();
    const uyariY = (await uyari.boundingBox())?.y ?? 0;
    const figurY = (await figur.boundingBox())?.y ?? 0;
    expect(uyariY, 'Docker uyarısı ekran görüntüsünden sonra geliyor').toBeLessThan(figurY);

    // Geniş figür sayfayı yatay kaydırmamalı; kendi içinde kaymalı.
    await page.setViewportSize({ width: 360, height: 740 });
    await aciklama.scrollIntoViewIfNeeded();
    const olcum = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(olcum[0], 'mobilde sayfa yatay kayıyor').toBeLessThanOrEqual(olcum[1] + 1);

    expect(errors, '/qa-shop-setup ekran görüntüsü: console/page hataları').toHaveLength(0);
});
// ─────────────────────────────────────────────────────────────────────────────
// 3c. Üç sayfa arası geçiş şeridi
// ─────────────────────────────────────────────────────────────────────────────
// "Uygulama linki nerede?" sorusunu kapatan şerit. Üç sayfanın da
// birbirine gidebildiğini ve bulunulan sayfanın işaretlendiğini korur.
test('QA Shop üçlüsü — her sayfadan diğer ikisine geçiş var', async ({ page }) => {
    test.setTimeout(120_000);

    for (const [yol, buradasin] of [['/qa-shop-spec', 'spec'], ['/qa-shop-setup', 'setup']] as const) {
        await page.goto(yol);
        await waitForAppReady(page, { timeout: 60_000 });

        const serit = page.locator('[data-testid="qa-shop-gecis"]');
        await expect(serit).toBeVisible();

        // Bulunulan sayfa link DEĞİL, işaretli bir etiket olmalı.
        await expect(page.locator(`[data-testid="gecis-${buradasin}"]`))
            .toHaveAttribute('aria-current', 'page');

        // Diğer ikisi gerçek link olmalı — hangi sayfada olursak olalım
        // mağazaya ve öbür belgeye gidebilmeliyiz.
        const magaza = page.locator('[data-testid="gecis-shop"]');
        await expect(magaza).toHaveAttribute('href', /qa-shop$/);
    }

    // Dükkândan da belgelere dönüş yolu olmalı.
    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });
    await expect(page.locator('[data-testid="gecis-spec"]')).toHaveAttribute('href', /qa-shop-spec/);
    await expect(page.locator('[data-testid="gecis-setup"]')).toHaveAttribute('href', /qa-shop-setup/);
    await expect(page.locator('[data-testid="gecis-shop"]')).toHaveAttribute('aria-current', 'page');
});

// ─────────────────────────────────────────────────────────────────────────────
// 3d. Şartname modu — OTOMASYON HEDEFİNİ BOZMAMA GARANTİSİ
// ─────────────────────────────────────────────────────────────────────────────
// Bu testin koruduğu şey bir özellik değil, bir ZARAR VERMEME sözü.
//
// `/qa-shop` bir Selenium/Playwright hedefidir. Hover ile açılan bir katman,
// otomasyonu bozan şeyin ta kendisidir: Playwright `.click()` önce hover
// yapar, katman açılır ve tıklamayı kesebilir. Bir QA öğrenme platformunda
// kazara flakiness öğretmek, öğretilebilecek en kötü şeydir.
//
// İki koruma birden sınanır: (1) mod kapalıyken DOM'a hiç dokunulmaz,
// (2) mod açıkken bile katman pointer-events:none taşır.
test('/qa-shop — şartname modu varsayılan kapalı ve tıklamayı asla kesmiyor', async ({ page }) => {
    test.setTimeout(150_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });
    await expect(page.locator('[data-testid="urun-listesi"]')).toBeVisible({ timeout: 60_000 });

    // (1) Mod KAPALI: sarmalayıcı element bile eklenmemiş olmalı.
    await expect(page.locator('[data-testid="story-modu-anahtari"]')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('[data-testid^="story-rozet-"]')).toHaveCount(0);
    await expect(page.locator('[data-testid^="story-alani-"]')).toHaveCount(0);

    // (2) Modu aç: rozetler gelir, ipucu kabul kriteri gösterir — SADE hâliyle.
    await page.getByTestId('story-modu-anahtari').click();
    await expect(page.locator('[data-testid="story-modu-serit"]')).toBeVisible();
    await page.getByTestId('urun-ara').hover();
    const ipucu = page.locator('[data-testid="story-ipucu-US-04"]');
    await expect(ipucu).toBeVisible();
    const ipucuMetni = await ipucu.innerText();
    // Gereksinim görünür.
    expect(ipucuMetni).toContain('Arama, terimle eşleşen ürünleri getirir');
    // Cevap görünmez: ne teknik döküm, ne beklenen kod, ne defect'in adı.
    // Bu panel bir alt satırında "hangi defect'in açık olduğu söylenmez"
    // diyordu ama üstünde tam da onu yazıyordu — çelişki kapatıldı.
    for (const forbidden of ['Given', 'When', 'Then', '400', '422', 'kıran anahtar', 'breaks it']) {
        expect(ipucuMetni, `şartname ipucu cevabı veriyor: ${forbidden}`).not.toContain(forbidden);
    }

    // Katman tıklamayı KESEMEZ — bu tek satır otomasyon hedefi olmanın bedeli.
    await expect(ipucu).toHaveCSS('pointer-events', 'none');

    // Ve gerçekten: mod açıkken normal akış çalışmaya devam eder.
    await page.getByTestId('urun-ara').fill('Jeans');
    await page.getByTestId('arama-btn').click();
    await expect(page.getByTestId('vitrin-basligi')).toContainText('Jeans');

    // Modu kapat: DOM yine tertemiz.
    await page.getByTestId('story-modu-anahtari').click();
    await expect(page.locator('[data-testid^="story-rozet-"]')).toHaveCount(0);
});

// ─────────────────────────────────────────────────────────────────────────────
// 3e. /qa-shop-api — sözleşme görünümü
// ─────────────────────────────────────────────────────────────────────────────
// Bu sayfanın tek vaadi şu: Docker OLMADAN da sözleşmenin tamamı okunabilir.
// Sözleşmeyi çalışma anında localhost:4000'den çekseydi Docker kurmayan
// ziyaretçi boş sayfa görürdü; build türevinden okuduğu için görmüyor.
// CI'da zaten yığın yok — yani bu test o vaadi GERÇEK yolda sınıyor.
test('/qa-shop-api — Docker olmadan 46 endpoint\'in tamamı görünüyor', async ({ page }) => {
    test.setTimeout(120_000);

    const errors = collectErrors(page);
    await page.goto('/qa-shop-api');
    await waitForAppReady(page, { timeout: 60_000 });

    await expect(page.locator('[data-testid="api-uc-listesi"]')).toBeVisible();
    await expect(page.locator('[data-testid="api-uc-sayisi"]')).toHaveText('46');

    // Etiket süzgeci gerçekten süzüyor mu.
    const hepsi = await page.locator('[data-testid^="api-uc-"]').count();
    await page.getByTestId('api-etiket-Kimlik').click();
    await expect(page.locator('[data-testid="api-uc-sayisi"]')).toHaveText('5');
    const suzulmus = await page.locator('[data-testid^="api-uc-"]').count();
    expect(suzulmus, 'etiket süzgeci listeyi daraltmadı').toBeLessThan(hepsi);

    // Bir ucu aç: status kodları görünmeli — sayfanın öğrettiği asıl şey bu.
    await page.getByTestId('api-etiket-tumu').click();
    await page.getByTestId('api-ara').fill('login');
    const kart = page.locator('[data-testid^="api-uc-POST"]').first();
    await kart.getByRole('button').click();
    await expect(kart).toContainText('401');

    expect(errors, '/qa-shop-api: console/page hataları').toHaveLength(0);
});

// ─────────────────────────────────────────────────────────────────────────────
// 4b. Sözleşmede olan bilgi SAYFADA da görünüyor mu
// ─────────────────────────────────────────────────────────────────────────────
// Ölçüldü (2026-08-27): openapi.yaml base URL'i, kimlik şemalarını, gövde
// alanlarını, tipleri, zorunlulukları ve doğrulama kurallarını taşıyordu ama
// sayfanın okuduğu build türevi bunları HİÇ almıyordu — sayfa her uç için
// yalnızca "gövde zorunlu mu" diyen bir boolean gösteriyordu.
//
// Hiçbir kapı bunu kırmaz: türev geçerli, hash tutuyor, sayfa render oluyor.
// Yalnızca "sözleşmede ne var, ekranda ne var" diye yan yana koyunca görülür.
// Bu test o karşılaştırmayı her koşumda yapar.
test('/qa-shop-api — base URL, kimlik başlıkları ve gövde şeması ekranda', async ({ page }) => {
    test.setTimeout(90_000);
    const errors = collectErrors(page);

    await page.goto('/qa-shop-api');
    await waitForAppReady(page, { timeout: 60_000 });

    // Base URL ve ortam açıklaması sayfanın üstünde.
    await expect(page.getByTestId('api-baglanti')).toBeVisible();
    await expect(page.getByTestId('api-base-url')).toContainText('http://localhost:4000');

    // İki katmanlı kimlik: hangi başlık, ne işe yarıyor.
    await expect(page.getByTestId('api-kimlik-SandboxKey')).toContainText('X-Sandbox-Key');
    await expect(page.getByTestId('api-kimlik-BearerAuth')).toContainText('Authorization');

    // Bir uç açıldığında gövde şeması tablo hâlinde gelmeli: alan, tip,
    // zorunluluk, doğrulama kuralı. "Gövde zorunlu" demek yetmez — testi
    // yazan kişi hangi alanın zorunlu olduğunu ve sınırını sorar.
    const kayitUcu = page.getByTestId('api-uc-POST--api-v1-auth-register');
    await expect(kayitUcu).toBeVisible();
    await kayitUcu.getByRole('button').first().click();

    const govde = page.getByTestId('api-govde-POST--api-v1-auth-register');
    await expect(govde).toBeVisible();
    await expect(govde).toContainText('email');
    await expect(govde).toContainText('password');
    await expect(govde, 'alan tipi görünmüyor').toContainText('string');
    await expect(govde, 'doğrulama kuralı görünmüyor').toContainText('minLength: 8');

    // Zorunlu başlık rozeti ve örnek gövde de aynı kartta.
    await expect(kayitUcu.getByTestId('api-baslik-X-Sandbox-Key')).toBeVisible();
    await expect(kayitUcu).toContainText('yeni@qashop.test');

    // Başarı cevabının gövdesi: "200 döndü" ile "doğru gövde döndü" farkı.
    await expect(kayitUcu).toContainText('201');

    expect(errors, '/qa-shop-api sözleşme ayrıntısı: console/page hataları').toHaveLength(0);
});


// Swagger sayfasından mağazaya ve şartnameye dönüş yolu olmalı — kullanıcı
// sözleşmeyi okuduktan sonra çıkmaz sokakta kalmamalı.
test('/qa-shop-api — mağazaya ve şartnameye dönüş yolu var', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/qa-shop-api');
    await waitForAppReady(page, { timeout: 60_000 });

    await expect(page.locator('[data-testid="gecis-shop"]')).toHaveAttribute('href', /qa-shop$/);
    await expect(page.locator('[data-testid="gecis-spec"]')).toHaveAttribute('href', /qa-shop-spec/);
    await expect(page.locator('[data-testid="hizli-shop"]')).toHaveAttribute('href', /qa-shop$/);
    await expect(page.locator('[data-testid="hizli-spec"]')).toHaveAttribute('href', /qa-shop-spec/);
    await expect(page.locator('[data-testid="gecis-api"]')).toHaveAttribute('aria-current', 'page');
});

// ─────────────────────────────────────────────────────────────────────────────
// 3f. Derin bağlantılar — düğme sözünü tutuyor mu
// ─────────────────────────────────────────────────────────────────────────────
// "User Story'ler" düğmesi şartname sayfasının TEPESİNE değil, user story
// bölümüne indirmeli. React sayfayı sonradan bastığı için tarayıcının kendi
// çapa kaydırması çalışmıyordu; useHashKaydir bunu kapatıyor.
test('QA Shop geçiş şeridi — derin bağlantılar ilgili bölüme iniyor', async ({ page }) => {
    test.setTimeout(120_000);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });

    // Şerit user story bölümüne işaret etmeli, sayfanın köküne değil.
    await expect(page.locator('[data-testid="gecis-spec"]')).toHaveAttribute('href', /qa-shop-spec#user-stories/);
    await expect(page.locator('[data-testid="gecis-setup"]')).toHaveAttribute('href', /qa-shop-setup#step-1-docker/);

    // Tıkla ve GERÇEKTEN o bölüme inildiğini doğrula.
    await page.getByTestId('gecis-spec').click();
    await waitForAppReady(page, { timeout: 60_000 });
    const bolum = page.locator('#user-stories');
    await expect(bolum).toBeVisible();

    // Kaydırma gerçekleşti mi: bölüm görünüm alanının üst yarısında olmalı.
    await expect.poll(async () => {
        const kutu = await bolum.boundingBox();
        return kutu ? Math.round(kutu.y) : 99999;
    }, { timeout: 15_000, message: 'user story bölümüne kaydırılmadı' }).toBeLessThan(400);
});

// ─────────────────────────────────────────────────────────────────────────────
// 3g. Sabit hızlı geçiş şeridi — dört sayfada, her kaydırma konumunda
// ─────────────────────────────────────────────────────────────────────────────
// Üstteki şerit kaydırınca gözden kayboluyordu; kullanıcı sayfanın
// ortasındayken diğer sayfaya geçmek için en üste dönmek zorundaydı.
test('QA Shop — hızlı geçiş şeridi dört sayfada ve kaydırıldığında da görünür', async ({ page }) => {
    test.setTimeout(150_000);

    for (const [yol, buradasin] of [
        ['/qa-shop-spec', 'spec'], ['/qa-shop-setup', 'setup'],
        ['/qa-shop-api', 'api'], ['/qa-shop', 'shop'],
    ] as const) {
        await page.goto(yol);
        await waitForAppReady(page, { timeout: 60_000 });

        await expect(page.locator('[data-testid="qa-shop-hizli-gecis"]')).toBeVisible();
        await expect(page.locator('[data-testid^="hizli-"]')).toHaveCount(4);
        await expect(page.locator(`[data-testid="hizli-${buradasin}"]`)).toHaveAttribute('aria-current', 'page');

        // Kaydırdıktan sonra da orada olmalı — şeridin tek varlık sebebi bu.
        await page.evaluate(() => window.scrollTo(0, 2500));
        await expect(page.locator('[data-testid="qa-shop-hizli-gecis"]')).toBeVisible();
        await expect(page.locator('[data-testid="basa-don"]')).toBeVisible();
    }
});

// "Başa dön" SİTE ana sayfasına değil, bulunulan sayfanın başına dönmeli.
// Eskiden ikon 🏠 idi ve gerçekten siteye gidiyordu — ikon ile davranış
// çelişiyordu ve kullanıcı sayfayı kaybediyordu.
test('QA Shop — başa dön düğmesi sayfadan çıkmadan en üste götürüyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/qa-shop-spec');
    await waitForAppReady(page, { timeout: 60_000 });

    await page.evaluate(() => window.scrollTo(0, 2500));
    await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);

    await page.getByTestId('basa-don').click();
    await expect.poll(async () => page.evaluate(() => window.scrollY),
        { timeout: 10_000, message: 'sayfanın başına dönmedi' }).toBeLessThan(50);

    // Ve sayfadan ÇIKMAMIŞ olmalı.
    expect(page.url()).toContain('/qa-shop-spec');
});

// Yüzen öğeler birbirinin üstüne binmemeli. Ölçüldü: ilk sürümde manuel tur
// düğmesi 768px ve 390px genişlikte şeritle çakışıyordu.
test('QA Shop — yüzen düğmeler dar ekranlarda çakışmıyor', async ({ page }) => {
    test.setTimeout(120_000);

    for (const genislik of [1440, 1024, 768, 390]) {
        await page.setViewportSize({ width: genislik, height: 900 });
        await page.goto('/qa-shop');
        await waitForAppReady(page, { timeout: 60_000 });
        await expect(page.locator('[data-testid="qa-shop-hizli-gecis"]')).toBeVisible();

        const kutular = await page.evaluate(() => {
            const al = (t: string) => document.querySelector(`[data-testid="${t}"]`)?.getBoundingClientRect();
            const serit = al('qa-shop-hizli-gecis');
            const tur = al('manuel-tur-ac');
            const basa = al('basa-don');
            return [serit, tur, basa].map((r) => (r ? { x: r.x, y: r.y, w: r.width, h: r.height } : null));
        });

        const kesisir = (a: any, b: any) => a && b
            && !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);

        for (let i = 0; i < kutular.length; i += 1) {
            for (let j = i + 1; j < kutular.length; j += 1) {
                expect(kesisir(kutular[i], kutular[j]),
                    `${genislik}px: yüzen düğmeler çakışıyor (${i} ↔ ${j})`).toBeFalsy();
            }
        }
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 3h. Ürün görselleri — fotoğraf VARSA fotoğraf, YOKSA SVG (ikisi de sağlam)
// ─────────────────────────────────────────────────────────────────────────────
// Ürün fotoğrafları `public/qa-shop/urunler/` altında durur ve OPSİYONELDİR;
// CI'da o klasör boştur. Bu testin koruduğu iki şey var:
//
//   1. Klasör boşken vitrin BOZULMAZ — her ürün inline SVG'ye düşer ve
//      `urun-gorsel-*` tutamağı kaybolmaz (başka testler onu sayıyor).
//   2. Var olmayan bir dosya için istek ATILMAZ — atılsaydı 404 üretir ve
//      "console/page hatası yok" iddiasını kırardı. Manifest tam da bunun
//      için var: bileşen dosyanın varlığını senkron bilir.
//
// Fotoğraflar eklendiğinde de test geçmeye devam eder: iddia "SVG olsun"
// değil, "her ürünün bir görseli olsun ve 404 olmasın".
test('/qa-shop — her üründe görsel var, olmayan dosya için istek atılmıyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    const errors = collectErrors(page);
    const bozukGorsel: string[] = [];
    page.on('response', (r) => {
        if (r.url().includes('/qa-shop/urunler/') && r.status() >= 400) {
            bozukGorsel.push(`${r.status()} ${r.url()}`);
        }
    });
    page.on('requestfailed', (r) => {
        if (r.url().includes('/qa-shop/urunler/')) bozukGorsel.push(`FAILED ${r.url()}`);
    });

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });
    await expect(page.locator('[data-testid="urun-listesi"]')).toBeVisible({ timeout: 60_000 });

    // Her ürün kartında tam olarak bir görsel tutamağı olmalı.
    const kartSayisi = await page.locator('ul[data-testid="urun-listesi"] > li').count();
    const gorselSayisi = await page.locator('[data-testid^="urun-gorsel-"]').count();
    expect(kartSayisi, 'vitrin boş geldi').toBeGreaterThan(0);
    expect(gorselSayisi, 'bazı ürünlerde görsel yok').toBe(kartSayisi);

    // Fotoğraf basıldıysa gerçekten yüklenmiş olmalı (kırık <img> ikonu değil).
    const fotograflar = page.locator('img[data-testid^="urun-gorsel-"]');
    const fotoSayisi = await fotograflar.count();
    if (fotoSayisi > 0) {
        const yuklendi = await fotograflar.first().evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(yuklendi, 'ürün fotoğrafı yüklenemedi').toBeGreaterThan(0);
        await expect(fotograflar.first()).toHaveAttribute('alt', /.+/);
    }

    expect(bozukGorsel, `404/başarısız görsel isteği: ${bozukGorsel[0] ?? ''}`).toHaveLength(0);
    expect(errors, '/qa-shop görselleri: console/page hataları').toHaveLength(0);
});

// ─────────────────────────────────────────────────────────────────────────────
// 3i. Giriş, QA panelini AÇMADAN çalışmalı
// ─────────────────────────────────────────────────────────────────────────────
// Gerçek bir hatanın nöbetçisi: lokal API modunda `POST /auth/login` sunucuda
// `requireWritableSandbox` arkasında ve anahtarsız istek 401 dönüyordu. Yani
// kullanıcı, teknik paneli açıp "Kendi alanımı aç" düğmesini bulmadan giriş
// YAPAMIYORDU.
//
// Bu hata uzun süre görünmedi çünkü mevcut testlerin hepsi girişten önce
// `alan-ac`'a tıklıyordu — testin kendi kurulumu hatayı gizliyordu. Bu test
// bilerek o kuruluma DOKUNMAZ: QA paneli hiç açılmaz.
test('/qa-shop — QA paneline hiç dokunmadan giriş yapılabiliyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });
    await expect(page.locator('[data-testid="urun-listesi"]')).toBeVisible({ timeout: 60_000 });

    // QA paneli KAPALI kalmalı — testin kendisi de kullanıcı gibi davranmalı.
    await expect(page.locator('[data-testid="qa-paneli"]')).toHaveJSProperty('open', false);

    await page.getByTestId('giris-ac').click();
    await page.getByTestId('giris-eposta').fill('demo@qashop.test');
    await page.getByTestId('giris-parola').fill('Password123!');
    await page.getByTestId('giris-yap').click();

    await expect(page.locator('[data-testid="oturum-eposta"]')).toBeVisible({ timeout: 40_000 });
    // Giriş kutusu kapanmalı: açık kalması "hiçbir şey olmadı" hissi verir.
    await expect(page.locator('[data-testid="giris-katman"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="qa-paneli"]')).toHaveJSProperty('open', false);
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. Ana sayfadan erişilebilirlik
// ─────────────────────────────────────────────────────────────────────────────
// Bir sayfayı açmak = route + arama motoru + site haritası + NAV LİNKLERİ +
// test kapsamı. Bu test beşincisini değil DÖRDÜNCÜSÜNÜ koruyor: link gizli
// kalırsa sayfa açıktır ama adresini bilmeyen kullanıcı ona hiç ulaşamaz.
// Test altyapısı ana sayfada ARANMADAN görünmeli. Kategori kartlarındaki
// küçük linkler sayfanın çok aşağısında kalıyordu; afiş üst şeritte duruyor.
// ⚠ Bu test 2026-08-27'ye kadar afişin ŞARTNAMEYE gitmesini koruyordu ve o
// hâliyle doğruydu. Giriş kapısı dükkâna çevrildi: gelen kişi önce kurcalamak
// istiyor, okumak değil. `href` TAM eşleşme ile doğrulanıyor — /qa-shop-spec
// ve /qa-shop-setup de "qa-shop" içerdiğinden desen eşlemesi üç sayfayı da
// kabul eder ve test yanlış hedefi fark etmezdi.
test('ana sayfa — test altyapısı afişi üst şeritte ve DÜKKÂNA gidiyor', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/');
    await page.waitForSelector('[data-testid="main-title"]', { timeout: 60_000 });

    const banner = page.locator('[data-testid="qa-shop-banner"]');
    await expect(banner, 'test altyapısı afişi yok').toBeVisible();
    await expect(banner).toHaveAttribute('href', '/qa-shop');

    // Sayfanın ÜST şeridinde mi: kategori kartlarından yukarıda olmalı
    const bannerBox = await banner.boundingBox();
    const navBox = await page.locator('[data-testid="main-navigation"]').boundingBox();
    expect(bannerBox!.y, 'afiş kategori kartlarının altında kalmış').toBeLessThan(navBox!.y);

    // İddiayı somutlaştıran rakamlar afişte
    const text = await banner.innerText();
    for (const n of ['18', '41', '16', '10']) {
        expect(text, `afişte ${n} rakamı yok`).toContain(n);
    }
});

test('ana sayfa — üç QA Shop linki de anonim kullanıcıya görünüyor', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/');
    await page.waitForSelector('[data-testid="main-title"]', { timeout: 60_000 });

    for (const id of ['nav-qa-shop-spec-card', 'nav-qa-shop-setup-card', 'nav-qa-shop-card']) {
        const link = page.locator(`[data-testid="${id}"]`);
        await expect(link, `${id} görünmüyor`).toBeVisible();
        await expect(link, `${id} tıklanabilir değil`).toBeEnabled();
    }

    // Öne çıkan giriş de yerinde ve DÜKKÂNA gidiyor.
    const frontDoor = page.locator('[data-testid="nav-qa-shop-store-cta"]');
    await expect(frontDoor).toBeVisible();
    await expect(frontDoor).toHaveAttribute('href', '/qa-shop');

    // Kart listesinde dükkân şartnameden ÖNCE geliyor: sıra bir tasarım
    // kararıdır, kazara değil. Konumla doğrulanıyor çünkü DOM sırası
    // görsel sırayı yansıtan tek kalıcı gerçek.
    const dukkanBox = await page.locator('[data-testid="nav-qa-shop-card"]').boundingBox();
    const sartnameBox = await page.locator('[data-testid="nav-qa-shop-spec-card"]').boundingBox();
    expect(dukkanBox!.y <= sartnameBox!.y, 'dükkân linki şartnamenin altına düşmüş').toBe(true);
});

// ─────────────────────────────────────────────────────────────────────────────
// SQL doğrulama paketi — dizin görünür, eşleme görünmez
// ─────────────────────────────────────────────────────────────────────────────
//
// Paket depoda AYLARDIR duruyordu ama kurulum rehberi yalnızca "şu dosyayı
// çalıştır" diyordu; içinde ne olduğu ancak dosyayı açana görünüyordu.
// Dizin bu boşluğu kapatıyor.
//
// ⚠ Dizinin sınırı bu testin ASIL konusu: her satır sorgunun neyi
// incelediğini söyler, hangi iş kuralına ya da story'ye denk düştüğünü
// SÖYLEMEZ. O bağı kurmak testi yazan kişinin işidir; hazır verilirse veri
// katmanı doğrulaması bir okuma alıştırmasına döner. Eşlemeyi geri koymak
// sayfayı bozmaz — hiçbir derleme kapısı yakalayamaz, yalnızca bu test
// yakalar (§25.2.1 ile aynı aile).
test('/qa-shop-setup — SQL paketi dizini görünür ama kural/story eşlemesi görünmüyor', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/qa-shop-setup');
    await waitForAppReady(page, { timeout: 60_000 });

    const dizin = page.locator('[data-testid="sql-pack"]');
    await expect(dizin).toBeVisible();

    // Otuz sorgunun tamamı listelenmeli — grup kırpması olmamalı.
    await expect(page.locator('[data-testid^="sql-pack-"]')).toHaveCount(30);

    // Birkaç temsili satır gerçekten neyi incelediğini söylüyor mu.
    await expect(page.locator('[data-testid="sql-pack-A1"]')).toContainText(/genel toplam/i);
    await expect(page.locator('[data-testid="sql-pack-D4"]')).toContainText(/varsayılan adres/i);
    await expect(page.locator('[data-testid="sql-pack-G4"]')).toContainText(/kategori/i);

    const metin = await dizin.innerText();

    // Eşleme sızmamalı: ne kural id'si, ne story id'si, ne defect anahtarı.
    for (const yasak of ['K1', 'K2', 'K3', 'K5', 'K6', 'K7', 'US-0', 'US-1',
                         'oversell', 'discount_twice', 'wrong_line_total',
                         'ignore_coupon_expiry', 'leak_other_users_orders',
                         'pending_reviews_in_average']) {
        expect(metin, `dizin eşlemeyi sızdırıyor: ${yasak}`).not.toContain(yasak);
    }

    // Beklenen sonucu da vermemeli: "0 satır dönmeli" bir sorgunun cevabıdır.
    expect(metin).not.toMatch(/0 satır dön/i);
});

// Aynı sınır şartname sayfasında da geçerli: sorgu id'leri kural ve story
// kartlarının admin panelinde duruyor, anonim ziyaretçiye HİÇ render edilmiyor.
test('/qa-shop-spec — sorgu eşlemesi anonim ziyaretçiye render edilmiyor', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/qa-shop-spec');
    await waitForAppReady(page, { timeout: 60_000 });

    const kural = page.locator('[data-testid="spec-rule-K3"]');
    await expect(kural).toBeVisible();
    const kuralMetni = await kural.innerText();
    for (const yasak of ['A1', 'A2', 'A3', 'Veri katmanından gören']) {
        expect(kuralMetni, `kural kartı sorgu eşlemesini sızdırıyor: ${yasak}`).not.toContain(yasak);
    }

    const story = page.locator('[data-testid="spec-story-US-09"]');
    await expect(story).toBeVisible();
    const storyMetni = await story.innerText();
    for (const yasak of ['A1', 'B4', 'C1', 'D5', 'Veri katmanından gören']) {
        expect(storyMetni, `story kartı sorgu eşlemesini sızdırıyor: ${yasak}`).not.toContain(yasak);
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// Kavram baloncukları — açıklıyor ama otomasyonu BOZMUYOR
// ─────────────────────────────────────────────────────────────────────────────
//
// "Kendi alanımı aç", "sandbox", "salt okunur" gibi kavramlar ilk kez gören
// için opak; her birinin yanında bir ⓘ var.
//
// ⚠ Bu testin ASIL konusu ikinci yarısı. /qa-shop bir Selenium/Playwright
// hedefidir ve Playwright `.click()` çağrısı tıklamadan ÖNCE hover yapar.
// Düğmenin üstünü kapatan bir katman açılırsa tıklama kesilir ve pratik
// hedefi FLAKY olur — bir QA öğrenme platformunda öğretilebilecek en kötü şey.
//
// İki ayrı doğrulama var ve İKİSİ DE gerekli, çünkü ölçüldü:
//   · `pointer-events: none` kontrolü — `auto` yapılınca KIRMIZI döner.
//   · Düğmenin tıklanabilirliği — bu, `auto` durumunda bile GEÇİYOR, çünkü
//     baloncuk `bottom: 100%` ile düğmenin ÜSTÜNDE açılıyor ve onu örtmüyor.
// Yani `pointer-events: none` bugünkü yerleşimde taşıyıcı değil, ileriye
// dönük korumadır: baloncuk bir gün aşağı açılırsa ya da yerleşim değişirse
// örtüşme başlar. Tıklama satırı da o günü yakalamak için burada duruyor.
test('/qa-shop — kavram baloncuğu açıklıyor ama düğmenin tıklanmasını kesmiyor', async ({ page }) => {
    test.setTimeout(90_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });

    // Bağlantı paneli bir <details> içinde ve varsayılan kapalı.
    await page.getByTestId('qa-paneli-ac').click();
    await expect(page.locator('[data-testid="qa-paneli"]')).toHaveJSProperty('open', true);

    const rozet = page.locator('[data-testid="kavram-alanAc"]');
    await expect(rozet, 'kendi alanımı aç kavramı yok').toBeVisible();

    // Dokunmatik yol: tıkla-aç. Yalnızca :hover ile açılan bir ipucu
    // dokunmatik cihazda ERİŞİLEMEZ olurdu.
    await rozet.click();
    const balon = page.locator('[data-testid="kavram-balonu-alanAc"]');
    await expect(balon, 'baloncuk tıklamayla açılmıyor').toBeVisible();
    // Açıklama, düğmenin BU UYGULAMADAKİ sonucunu söylemeli: yazma işlemleri
    // kendi alanını gerektirir. Genel bir tanım ("sandbox nedir") yeterli değil.
    await expect(balon).toContainText(/kendi alanını|tohum verinin/i);

    // Baloncuk tıklama hedefi OLMAMALI.
    const olaylar = await balon.evaluate((el) => getComputedStyle(el).pointerEvents);
    expect(olaylar, 'baloncuk tıklamayı kesebilir durumda').toBe('none');

    // ESC kapatmalı (klavye yolu).
    await page.keyboard.press('Escape');
    await expect(balon).toHaveCount(0);

    // ⚠ Fareyi sarmalayıcının DIŞINA çıkar. Bu satır olmadan test flaky
    // olur ve suçu üründe sanırsın: ESC'ten sonra fare hâlâ rozetin üstünde
    // kalıyor, aşağıdaki `hover()` fareyi aynı sarmalayıcının içindeki
    // düğmeye taşıyor ve sarmalayıcıdan hiç ÇIKILMADIĞI için `mouseenter`
    // bir daha ateşlenmiyor. Ürün doğru davranıyor (kullanıcı ESC'e bastıysa
    // aynı alanın içinde gezinirken baloncuk geri açılmamalı); yanlış olan,
    // testin gerçek bir kullanıcının yapmayacağı bir sırayı kurmasıydı.
    await page.mouse.move(0, 0);

    // Hover yolu: düğmenin ÜZERİNE gelmek de açmalı.
    const alanAcDugmesi = page.locator('[data-testid="alan-ac"]');
    await alanAcDugmesi.hover();
    await expect(page.locator('[data-testid="kavram-balonu-alanAc"]'),
        'düğme üzerine gelince baloncuk açılmıyor').toBeVisible();

    // ── ASIL KONU ──
    // Baloncuk açıkken düğme HÂLÂ tıklanabilir olmalı. Playwright tıklamadan
    // önce actionability kontrolü yapar; katman araya girerse burada düşer.
    await alanAcDugmesi.click({ timeout: 10_000 });

    // Aynı şey defect paneli başlığındaki kavram için de geçerli olmalı.
    await expect(page.locator('[data-testid="kavram-defectAnahtari"]')).toBeVisible();
});

// API sözleşmesi sayfasındaki kavramlar. Orada otomasyon riski yok (sayfa bir
// referans belgesi), ama dokunmatik erişilebilirlik aynı şekilde gerekli.
test('/qa-shop-api — sözleşme kavramları tıklayarak da açılıyor', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/qa-shop-api');
    await waitForAppReady(page, { timeout: 60_000 });

    // Base URL'in yanındaki kavram, "base URL nedir"i DEĞİL, bu yığının
    // Docker gerektirdiğini ve Docker kapalıyken sonucun nasıl görüleceğini
    // anlatır — genel HTTP bilgisi burada açıklanmaz.
    const rozet = page.locator('[data-testid="kavram-docker"]').first();
    await expect(rozet, 'Docker ön koşulu kavramı yok').toBeVisible();
    await rozet.click();

    const balon = page.locator('[data-testid="kavram-balonu-docker"]').first();
    await expect(balon).toBeVisible();
    await expect(balon).toContainText(/Docker/i);
    await expect(balon, 'Docker kapalıyken ne olacağı söylenmiyor').toContainText(/tarayıcı kipi|browser mode/i);

    // Kavram açıklaması kuralı anlatmalı, test reçetesi vermemeli: beklenen
    // status kodu, hata sabiti ya da "şunu dene" talimatı içermemeli.
    const metin = await balon.innerText();
    for (const yasak of ['409', '422', '401', '403']) {
        expect(metin, `kavram açıklaması status kodu veriyor: ${yasak}`).not.toContain(yasak);
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// Kavram baloncuğu OKUNABİLİR olmalı — görüş alanının dışına taşamaz
// ─────────────────────────────────────────────────────────────────────────────
//
// Gerçek hata: sayfanın üst şeridindeki mod rozetinin (localhost:4000)
// baloncuğu yukarı açılıyor ve görüş alanının üstünde kalıyordu. Açıklama
// vardı, DOM'da "görünür"dü, testler yeşildi — ama kullanıcı OKUYAMIYORDU.
// `toBeVisible()` bunu yakalayamaz: Playwright için görüş alanının dışındaki
// bir öğe de görünürdür.
//
// Bu yüzden burada ölçülen şey görünürlük değil KONUM: baloncuğun dört kenarı
// da görüş alanının içinde olmalı.
test('/qa-shop — kavram baloncukları görüş alanının içinde kalıyor (okunabilir)', async ({ page }) => {
    test.setTimeout(120_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });

    const gorus = page.viewportSize()!;

    async function balonuOlc(testid: string, etiket: string) {
        const rozet = page.locator(`[data-testid="${testid}"]`);
        await expect(rozet, `${etiket}: rozet yok`).toBeVisible();
        await rozet.click();

        const anahtar = testid.replace(/^kavram-/, '');
        const balon = page.locator(`[data-testid="kavram-balonu-${anahtar}"]`);
        await expect(balon, `${etiket}: baloncuk açılmadı`).toBeVisible();

        // Konum yerleşene kadar bekle: ölçüm bitmeden görünmez duruyor.
        await expect(balon).toHaveAttribute('data-yon', /ust|alt/);
        const kutu = (await balon.boundingBox())!;
        expect(kutu, `${etiket}: baloncuğun kutusu yok`).not.toBeNull();

        expect(kutu.y, `${etiket}: baloncuk görüş alanının ÜSTÜNE taşmış`).toBeGreaterThanOrEqual(0);
        expect(kutu.y + kutu.height, `${etiket}: baloncuk görüş alanının ALTINA taşmış`)
            .toBeLessThanOrEqual(gorus.height);
        expect(kutu.x, `${etiket}: baloncuk SOLA taşmış`).toBeGreaterThanOrEqual(0);
        expect(kutu.x + kutu.width, `${etiket}: baloncuk SAĞA taşmış`)
            .toBeLessThanOrEqual(gorus.width);

        // Metin gerçekten dolu olmalı — boş bir kutu da kutudur.
        expect((await balon.innerText()).trim().length,
            `${etiket}: baloncuk boş`).toBeGreaterThan(40);

        await page.keyboard.press('Escape');
        await page.mouse.move(0, 0);
        await expect(balon).toHaveCount(0);
    }

    // Bildirilen hata tam olarak burada: sayfanın en üstündeki mod rozeti.
    await balonuOlc('kavram-tarayiciModu', 'mod rozeti (sayfa üstü)');

    // QA panelindeki kavramlar sayfanın altında — orada da ters yönde taşma
    // riski var (aşağı açılırsa görüş alanının altını aşar).
    await page.getByTestId('qa-paneli-ac').click();
    await expect(page.locator('[data-testid="qa-paneli"]')).toHaveJSProperty('open', true);

    for (const id of ['kavram-apiAdresi', 'kavram-docker', 'kavram-sandboxAnahtari',
                      'kavram-alanAc', 'kavram-veriSifirla', 'kavram-anahtariUnut']) {
        // scrollIntoViewIfNeeded BİLEREK YOK: sayfa arka planda sağlık ve
        // defect listesini tazeliyor, araya giren bir render öğeyi DOM'dan
        // koparıyordu ("Element is not attached"). click() zaten kendisi
        // kaydırıyor ve kopma durumunda öğeyi yeniden çözüyor.
        await balonuOlc(id, id);
    }

    // Dar ekran: yatay sıkıştırma asıl burada sınanır. Baloncuk 320px'e kadar
    // genişleyebiliyor ve telefon genişliği 375px — sağa hizalanmış bir
    // baloncuk kolayca kenardan taşar.
    await page.setViewportSize({ width: 375, height: 667 });
    Object.assign(gorus, { width: 375, height: 667 });
    await balonuOlc('kavram-alanAc', 'mobil 375px');
});

// ─────────────────────────────────────────────────────────────────────────────
// Vitrin kavramları — alışveriş akışının İÇİNDEKİ davranışlar
// ─────────────────────────────────────────────────────────────────────────────
//
// QA panelindeki kavramlar kurulumu anlatır. Asıl bilinmeyen ise dükkânın
// KENDİ davranışıdır: sipariş durumları nasıl ilerler, ödeme başarısız
// seçildiğinde ne olur, varsayılan adres nasıl belirlenir, yorumlar niye
// hemen görünmez. Bunlar akışın içine gömülü olduğu için ancak akışı
// yürüterek doğrulanabilir.
//
// Üç şey birden ölçülür ve üçü de ayrı bir hatayı yakalar:
//   1. Baloncuk açılıyor ve GÖRÜŞ ALANININ İÇİNDE — sayfanın ortasında,
//      kaydırılmış bir konumda da taşmamalı.
//   2. Açıklama KURALI anlatıyor, reçeteyi değil — status kodu içeremez.
//   3. Sarmalanan öğe hâlâ tıklanabilir — ödeme başarısız kutusu bir
//      Kavram'ın içine alındı; katman tıklamayı keserse pratik hedefi
//      flaky olur ve bir QA platformunda öğretilebilecek en kötü şey budur.
test('/qa-shop — vitrin kavramları akışın içinde okunabilir ve tıklamayı kesmiyor', async ({ page }) => {
    test.setTimeout(180_000);
    await page.addInitScript((adres) => {
        localStorage.setItem('qaShopApiBase', adres);
    }, KAPALI_API);

    await page.goto('/qa-shop');
    await waitForAppReady(page, { timeout: 60_000 });
    await expect(page.locator('[data-testid="urun-listesi"]')).toBeVisible({ timeout: 60_000 });

    const gorus = page.viewportSize()!;

    async function balonuAcVeOlc(anahtar: string, beklenen: RegExp) {
        const rozet = page.locator(`[data-testid="kavram-${anahtar}"]`);
        await expect(rozet, `${anahtar}: kavram rozeti yok`).toBeVisible();
        await rozet.click();

        const balon = page.locator(`[data-testid="kavram-balonu-${anahtar}"]`);
        await expect(balon, `${anahtar}: baloncuk açılmadı`).toBeVisible();
        await expect(balon).toHaveAttribute('data-yon', /ust|alt/);

        const kutu = (await balon.boundingBox())!;
        expect(kutu, `${anahtar}: baloncuğun kutusu yok`).not.toBeNull();
        expect(kutu.y, `${anahtar}: baloncuk görüş alanının ÜSTÜNE taştı`).toBeGreaterThanOrEqual(0);
        expect(kutu.y + kutu.height, `${anahtar}: baloncuk görüş alanının ALTINA taştı`)
            .toBeLessThanOrEqual(gorus.height);
        expect(kutu.x, `${anahtar}: baloncuk SOLA taştı`).toBeGreaterThanOrEqual(0);
        expect(kutu.x + kutu.width, `${anahtar}: baloncuk SAĞA taştı`).toBeLessThanOrEqual(gorus.width);

        // Baloncuk hiçbir koşulda tıklama hedefi OLAMAZ. Bunu "kutucuğu
        // örtüyor mu" diye ölçmek yetmez: baloncuk bugünkü yerleşimde
        // kutucuğun üstüne düşmüyor, yani örtüşme testi bozuk bir sürümde de
        // yeşil kalıyor (denendi). Ölçülmesi gereken şey konum değil, katmanın
        // hit-test'e hiç girmediğidir.
        const kesiyor = await balon.evaluate((el) => getComputedStyle(el).pointerEvents !== 'none');
        expect(kesiyor, `${anahtar}: baloncuk tıklama hedefi olabiliyor — sarılan düğme flaky olur`).toBe(false);

        const metin = await balon.innerText();
        expect(metin, `${anahtar}: beklenen davranış anlatılmıyor`).toMatch(beklenen);

        // Kural anlatılır, reçete verilmez: beklenen status kodu yazılamaz.
        for (const yasak of ['200', '201', '402', '409', '422', '401', '403', '404']) {
            expect(metin, `${anahtar}: kavram açıklaması status kodu veriyor (${yasak})`)
                .not.toContain(yasak);
        }

        await page.keyboard.press('Escape');
        await page.mouse.move(0, 0);
        await expect(balon).toHaveCount(0);
    }

    await page.getByTestId('giris-ac').click();
    await page.getByTestId('giris-eposta').fill('demo@qashop.test');
    await page.getByTestId('giris-parola').fill('Password123!');
    await page.getByTestId('giris-yap').click();
    await expect(page.locator('[data-testid="oturum-eposta"]')).toBeVisible({ timeout: 40_000 });

    // 1) Ürün detayı — yorumların neden hemen görünmediği.
    await page.locator('[data-testid^="urun-detay-"]').first().click();
    await expect(page.locator('[data-testid="detay-ad"]')).toBeVisible({ timeout: 40_000 });
    await balonuAcVeOlc('yorumOnayi', /onay/i);

    // 2) Ödeme adımı — varsayılan adres ve ödeme başarısız senaryosu.
    await page.locator('[data-testid^="sepete-ekle-"]').first().click();
    await expect(page.locator('[data-testid="sepet-sayaci"]')).not.toHaveText('0', { timeout: 40_000 });
    await page.getByTestId('sepet-butonu').click();
    await page.getByTestId('odemeye-gec').click();
    await expect(page.locator('[data-testid="odeme-yontemleri"]')).toBeVisible({ timeout: 40_000 });

    await balonuAcVeOlc('varsayilanAdres', /varsayılan|default/i);
    await balonuAcVeOlc('odemeBasarisiz', /ödenmemiş|unpaid/i);

    // Kavram sarmalayıcısı tıklamayı KESMEMELİ: kutu hâlâ işaretlenebiliyor.
    const kutucuk = page.getByTestId('odeme-basarisiz');
    await kutucuk.check();
    await expect(kutucuk, 'kavram katmanı ödeme kutusunun tıklanmasını kesti').toBeChecked();
    await kutucuk.uncheck();

    // 3) Siparişlerim — durum makinesinin nasıl ilerlediği.
    await page.getByTestId('siparis-tamamla').click();
    await expect(page.locator('[data-testid="siparis-onay"]')).toBeVisible({ timeout: 60_000 });
    await page.getByTestId('onay-siparisler').click();
    await expect(page.locator('[data-testid="siparis-listesi"]')).toBeVisible({ timeout: 40_000 });
    await balonuAcVeOlc('siparisDurumlari', /kargo|ship/i);
});
