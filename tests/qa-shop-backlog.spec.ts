import { test, expect } from '@playwright/test';
import { waitForAppReady } from './helpers/app-ready';

// ─────────────────────────────────────────────────────────────────────────────
// /qa-shop-backlog — gereksinim → epic → business story → frontend/backend
//
// Sayfanın vaadi bir hiyerarşi: gerçek bir şirkette bir özelliğin geçtiği
// belge zinciri. Testler bu zincirin GERÇEKTEN kurulu olduğunu korur —
// kartların ekranda durduğunu değil.
//
// ⚠ Sayfa hazırlığı için ASLA waitForSelector('h1') kullanma: yayınlanan her
// sayfa arama motorları için üretilmiş bir statik gövde taşır ve o gövdenin
// kendi <h1>'i vardır. waitForAppReady kabuğun React tarafından SİLİNMİŞ
// olmasını bekler.
// ─────────────────────────────────────────────────────────────────────────────

test('/qa-shop-backlog — zincir anonim ziyaretçiye açık: 8 gereksinim, 6 epic, 16 story', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/qa-shop-backlog');
    await waitForAppReady(page, { timeout: 60_000 });

    await expect(page.locator('[data-testid="backlog-section-requirements"] article[data-testid^="backlog-req-"]'))
        .toHaveCount(8);
    await expect(page.locator('[data-testid^="backlog-epic-"]')).toHaveCount(6);
    await expect(page.locator('[data-testid^="backlog-story-US-"]')).toHaveCount(16);
    await expect(page.locator('[data-testid^="backlog-child-"]')).toHaveCount(32);

    // 16 business story'nin her birinde tam olarak bir frontend + bir backend
    // story'si olmalı: 16 x 2 = 32. Sayının kendisi değil, bu ORAN anlamlı.
    await expect(page.locator('[data-testid^="backlog-child-"][data-kind="frontend"]')).toHaveCount(16);
    await expect(page.locator('[data-testid^="backlog-child-"][data-kind="backend"]')).toHaveCount(16);

    // Zincirin kendisi beş halkalı ve test edenin yolu altı adımlı.
    await expect(page.locator('[data-testid="backlog-chain"] ol > li')).toHaveCount(5);
    await expect(page.locator('[data-testid="backlog-tester-flow"] > li')).toHaveCount(6);
});

// ─────────────────────────────────────────────────────────────────────────────
// EN KRİTİK TEST — kabul kriteri dili
//
// Herkese açık kabul kriterleri sahada bir tester'ın eline geldiği hâlde
// olmalı: iş dilinde, tek cümle. Beklenen status kodunu, hata sabitini ve
// Given/When/Then dökümünü kriterin içine koymak, test edenin ÜRETMESİ
// gereken çıktıyı peşinen vermek olur — ve bunu hiçbir derleme kapısı
// yakalamaz, çünkü sayfa yine "çalışır".
//
// Bu, sayfanın gövdesinin TAMAMINI tarar: veri dosyasına yazılmış bir sızıntıyı
// da, bileşene hardcode edilmiş bir açıklamayı da yakalar. İkincisi bu depoda
// bir kez gerçekten yaşandı ve yalnızca tarayıcıda render edilen metni tarayan
// bir test onu görebildi.
// ─────────────────────────────────────────────────────────────────────────────
test('/qa-shop-backlog — kabul kriterleri sahadaki gibi sade, teknik döküm görünmüyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/qa-shop-backlog');
    await waitForAppReady(page, { timeout: 60_000 });

    // Sade kriterler GERÇEKTEN görünüyor — kuralı "her şeyi sil" diye
    // karşılamak da bir kayıp olurdu.
    const feKriterleri = page.locator('[data-testid="backlog-acceptance-FE-01"] li');
    await expect(feKriterleri).toHaveCount(4);
    const beKriterleri = page.locator('[data-testid="backlog-acceptance-BE-01"] li');
    await expect(beKriterleri).toHaveCount(4);
    await expect(beKriterleri.first()).toContainText(/parola|password/i);

    const govde = await page.locator('main').innerText();

    // Beklenen status kodu hiçbir yerde görünmemeli.
    for (const kod of ['200', '201', '401', '403', '404', '409', '422']) {
        expect(govde, `status kodu sızıyor: ${kod}`).not.toMatch(new RegExp(`\\b${kod}\\b`));
    }

    // Hata sabitleri de test edenin bulacağı şey.
    for (const sabit of [
        'WEAK_PASSWORD', 'EMAIL_ALREADY_EXISTS', 'UNAUTHORIZED', 'OUT_OF_STOCK',
        'PRODUCT_NOT_FOUND', 'INVALID_QUANTITY', 'COUPON_EXPIRED',
    ]) {
        expect(govde, `hata sabiti sızıyor: ${sabit}`).not.toContain(sabit);
    }

    // Gherkin dökümü — ne İngilizcesi ne Türkçeleştirilmişi.
    for (const yasak of ['Given ', 'Then ', 'Diyelim ki', 'O zaman', 'Senaryo:']) {
        expect(govde, `Gherkin dökümü sızıyor: ${yasak}`).not.toContain(yasak);
    }

    // Admin panelleri gizlenmiş DEĞİL, hiç render edilmemiş olmalı.
    await expect(page.locator('[data-testid^="backlog-admin-"]')).toHaveCount(0);
});

// Story'nin aktörü KULLANICIDIR — geliştirici değil.
//
// "Bir frontend geliştirici olarak ... istiyorum" bir user story değil,
// kılık değiştirmiş bir task'tır. Bir story'nin değeri her zaman kullanıcıya
// akar; frontend/backend etiketi işin NEREDE yaşadığını söyler, KİMİN
// faydalandığını değil. Veri kapısı bunu `childStories` üzerinde denetliyor;
// burada ekrana BASILAN metin taranıyor, çünkü bileşene hardcode edilmiş bir
// cümleyi statik kapı göremez.
test('/qa-shop-backlog — story\'ler kullanıcı gözünden yazılmış, geliştirici gözünden değil', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/qa-shop-backlog');
    await waitForAppReady(page, { timeout: 60_000 });

    // ⚠ Kapsam bilerek DAR: kural story cümlelerine aittir, sayfanın tamamına
    // değil. SSS bölümü bu yanlış kalıbı NEDEN yanlış olduğunu anlatmak için
    // alıntılıyor; tüm gövdeyi tarayan bir sürüm o açıklamayı suç sayardı ve
    // kuralı öğreten metni silmek zorunda kalırdık.
    const kartlar = page.locator('[data-testid^="backlog-child-"], [data-testid^="backlog-story-US-"]');
    const adet = await kartlar.count();
    expect(adet, 'story kartı bulunamadı — tarama boşa dönüyor').toBe(48);   // 16 business + 32 frontend/backend

    for (let i = 0; i < adet; i++) {
        const metin = await kartlar.nth(i).innerText();
        for (const yasak of ['geliştirici olarak', 'yazılımcı olarak', 'developer, I want', 'engineer, I want']) {
            expect(metin, `story aktörü geliştirici yapılmış: "${yasak}"`).not.toContain(yasak);
        }
    }

    // Ve kullanıcı aktörü GERÇEKTEN duruyor — kuralı "hepsini sil" diye
    // karşılamak da bir kayıp olurdu.
    const feStory = await page.locator('[data-testid="backlog-child-FE-01"]').innerText();
    expect(feStory).toMatch(/olarak/);
    expect(feStory).toMatch(/müşteri|ziyaretçi/);
});

// ─────────────────────────────────────────────────────────────────────────────
// Hiyerarşi gerçekten kurulu mu — kartların varlığı değil, BAĞI sınanıyor.
// ─────────────────────────────────────────────────────────────────────────────
test('/qa-shop-backlog — frontend ve backend story\'leri parent story\'nin ALTINDA duruyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/qa-shop-backlog');
    await waitForAppReady(page, { timeout: 60_000 });

    // US-01'in kartı, kendi FE ve BE story'lerini İÇERMELİ. Sayfada ayrı ayrı
    // durmaları yetmez — hiyerarşi iç içe olmalı, yan yana değil.
    const usKart = page.locator('[data-testid="backlog-story-US-01"]');
    await expect(usKart.locator('[data-testid="backlog-child-FE-01"]')).toHaveCount(1);
    await expect(usKart.locator('[data-testid="backlog-child-BE-01"]')).toHaveCount(1);

    // Ve o çift, doğru epic'in içinde olmalı.
    const epic = page.locator('[data-testid="backlog-epic-EP-01"]');
    await expect(epic.locator('[data-testid="backlog-story-US-01"]')).toHaveCount(1);
    await expect(epic.locator('[data-testid="backlog-story-US-02"]')).toHaveCount(1);

    // Rol ayrımı ekranda okunabilir olmalı.
    await expect(page.locator('[data-testid="backlog-child-FE-01"]')).toHaveAttribute('data-kind', 'frontend');
    await expect(page.locator('[data-testid="backlog-child-BE-01"]')).toHaveAttribute('data-kind', 'backend');
});

// "full" rozeti bir VAAT: altındaki her story'de FE+BE çifti olmalı.
// "pending" ise dürüst olmalı: rozet yok, child yok, ama sebebi yazıyor.
test('/qa-shop-backlog — bölünme rozeti yalan söylemiyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/qa-shop-backlog');
    await waitForAppReady(page, { timeout: 60_000 });

    // ⚠ Belirli epic id'lerine göre yazılmıyor. Bir epic bölündüğünde rozeti
    // "pending"den "full"a döner; sabit id listesi o gün sessizce anlamını
    // yitirir ve test hiçbir şey doğrulamamaya başlar. Bunun yerine EKRANDA
    // ne yazıyorsa o sınanıyor: rozet ne diyorsa altındaki yapı onu tutmalı.
    const epicler = page.locator('[data-testid^="backlog-epic-"]');
    const epicAdet = await epicler.count();
    expect(epicAdet, 'hiç epic bulunamadı — tarama boşa dönüyor').toBe(6);

    let fullSayisi = 0;
    let pendingSayisi = 0;

    for (let e = 0; e < epicAdet; e++) {
        const epic = epicler.nth(e);
        const split = await epic.getAttribute('data-split');
        const storyler = epic.locator('[data-testid^="backlog-story-US-"]');
        const storyAdet = await storyler.count();
        expect(storyAdet, 'story taşımayan epic').toBeGreaterThan(0);

        if (split === 'full') {
            fullSayisi++;
            // Vaat: altındaki HER story'de bir FE + bir BE çifti.
            for (let i = 0; i < storyAdet; i++) {
                await expect(storyler.nth(i).locator('[data-kind="frontend"]')).toHaveCount(1);
                await expect(storyler.nth(i).locator('[data-kind="backend"]')).toHaveCount(1);
            }
        } else {
            pendingSayisi++;
            // Dürüstlük: bölünmemiş epic child TAŞIMAZ ve bunu söyler.
            await expect(epic.locator('[data-testid^="backlog-child-"]')).toHaveCount(0);
            await expect(epic).toContainText(/henüz yazılmadı/i);
        }
    }

    expect(fullSayisi + pendingSayisi).toBe(6);
});

// İzlenebilirlik iki yönlü: gereksinimden epic'e, epic'ten gereksinime.
// Bu bağ olmadan bir bulgunun hangi vaadi kırdığı söylenemez.
test('/qa-shop-backlog — izlenebilirlik zinciri iki yönde de yürünebiliyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/qa-shop-backlog');
    await waitForAppReady(page, { timeout: 60_000 });

    // Gereksinim kartı, hizmet ettiği epic'e bağlanıyor.
    const req = page.locator('[data-testid="backlog-req-BR-03"]');
    await expect(req.locator('a[href="#EP-03"]')).toHaveCount(1);

    // Epic kartı da geldiği gereksinime geri bağlanıyor.
    const epic = page.locator('[data-testid="backlog-epic-EP-03"]');
    await expect(epic.locator('a[href="#BR-03"]')).toHaveCount(1);

    // Çapaların karşılığı gerçekten var — kırık bağlantı olmamalı.
    await expect(page.locator('#EP-03')).toHaveCount(1);
    await expect(page.locator('#BR-03')).toHaveCount(1);

    // Analiz dokümanına çıkış yolu duruyor.
    await expect(page.locator('[data-testid="backlog-to-spec"]')).toHaveAttribute('href', /qa-shop-spec/);
});

// Sayfa ulaşılabilir olmalı: açık ama linki gizliyse adresini bilmeyen
// kullanıcı ulaşamaz. Bu, bu depoda bir açılışta gerçekten atlandı.
test('/qa-shop-backlog — ana sayfadan ve QA Shop şeridinden ulaşılabiliyor', async ({ page }) => {
    test.setTimeout(120_000);

    await page.goto('/');
    await waitForAppReady(page, { timeout: 60_000 });
    await expect(page.locator('[data-testid="nav-qa-shop-backlog-card"]'))
        .toHaveAttribute('href', /qa-shop-backlog/);

    // Kardeş sayfalardan da geçilebilmeli.
    await page.goto('/qa-shop-spec');
    await waitForAppReady(page, { timeout: 60_000 });
    await expect(page.locator('[data-testid="gecis-backlog"]')).toHaveAttribute('href', /qa-shop-backlog/);

    // Ve backlog sayfasında "buradasın" olarak işaretlenmeli.
    await page.goto('/qa-shop-backlog');
    await waitForAppReady(page, { timeout: 60_000 });
    await expect(page.locator('[data-testid="gecis-backlog"]')).toHaveAttribute('aria-current', 'page');
});

// EN sürümünde Türkçeye özgü karakter kalmamalı (i18n sızıntısı).
test('/en/qa-shop-backlog — İngilizce sürümde Türkçe sızıntısı yok', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/en/qa-shop-backlog');
    await waitForAppReady(page, { timeout: 60_000 });

    const govde = await page.locator('main').innerText();
    const sizinti = govde.match(/[ığşçöüİĞŞÇÖÜ]/g);
    expect(sizinti ? `Türkçe karakter sızdı: ${[...new Set(sizinti)].join(', ')}` : 'temiz').toBe('temiz');
});
