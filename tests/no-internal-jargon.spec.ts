import { test, expect } from '@playwright/test';
import { waitForAppReady } from './helpers/app-ready';

// CLAUDE.md §24 — model-arası koordinasyon jargonu kullanıcıya GÖRÜNMEZ olmalı.
//
// Bu proje birden fazla AI aracıyla geliştiriliyor; modeller birbirlerine plan
// dosyaları, § bölüm numaraları ve görev kodları (O1/S3) üzerinden referans
// veriyor. Bu dil kullanıcı arayüzüne sızarsa kullanıcı doğrulayamayacağı bir
// kaynağa atıf görür (gerçek vaka: /cypress sayfasında "CLAUDE.md'deki kural
// Cypress dokümantasyonunda da geçer" cümlesi, 2026-08-01'de temizlendi).
//
// KATMANLI SAVUNMA — bu test İKİNCİL katmandır:
//   1. BİRİNCİL: scripts/check-content-integrity.mjs Kontrol [H] — 39 veri
//      dosyasının TÜM string değerlerini gezer, build + pre-commit'te hard-fail.
//   2. İKİNCİL (bu dosya): gerçek tarayıcıda RENDER EDİLEN metni tarar. Statik
//      denetimin göremediği yerleri yakalar: bileşen içine hardcode edilmiş JSX
//      metni, *Data.js dışındaki içerik kaynakları (termGlossary.js gibi),
//      runtime'da birleştirilen dizeler.
// Statik denetim veriyi, bu test ekranı kontrol eder — ikisi farklı kör
// noktalara sahiptir (aynı ilke: CLAUDE.md §23.1 statik scanner + runtime testi).

const JARGON_PATTERNS: Array<[RegExp, string]> = [
    [/CLAUDE\.md/i, 'CLAUDE.md referansı'],
    [/NEXT_SESSION/i, 'NEXT_SESSION referansı'],
    [/AGENTS\.md/i, 'AGENTS.md referansı'],
    [/Documents\/[\w.-]+\.md/i, 'plan dosyası yolu'],
    [/§\s*\d/, 'plan bölüm numarası (§N)'],
    [/\b(Opus|Sonnet)\s+(tarafı|görevi|promptu|prompt)/i, 'model görev dağılımı'],
    [/\b[OS]\d+\s*(promptu|görevi)/i, 'görev kodu (O1/S3 gibi)'],
];

// Temsili sayfa seti (CLAUDE.md §22 "temsili sayfa" kalıbı — tam kapsam statik
// denetimde). Farklı render yollarını bilinçli olarak karıştırır:
//   - TopicPage tabanlı ders sayfaları (en yaygın yol)
//   - kendi bileşenleri olan sayfalar (/manual-testing, /algorithms, /qa-mentor)
//   - Sprint Simulator (renderBlock'u dışarıdan kullanan tek sayfa)
// §22.1 kalıcı istisna listesi (/basit-backend, /backend) DAHİL DEĞİL.
const ROUTES = [
    '/',
    '/cypress',       // gerçek sızıntının çıktığı sayfa — regresyon bekçisi
    '/javascript',    // gerçek sızıntının çıktığı sayfa — regresyon bekçisi
    '/qa-frontend',   // "§1" sızıntısının çıktığı sayfa — regresyon bekçisi
    '/gauge',         // gerçek sızıntının çıktığı sayfa — regresyon bekçisi
    '/sprint',
    '/portfolio',     // metinleri portfolioData.js'te toplanan aggregator sayfa
    '/qa-mentor',
    '/manual-testing',
];

// /claude-ai ve /llm-agents BİLEREK kapsam dışı: o sayfalar Claude Code ve
// CLAUDE.md'yi bir ÜRÜN ÖZELLİĞİ olarak (ajan yapılandırma dosyası) öğretiyor —
// orada bu terimler meşru ders konusudur, iç koordinasyon jargonu değil.
// Aynı muafiyet statik denetimde de var (AI_TOPIC_FILES).

test.describe('CLAUDE.md §24 — iç koordinasyon jargonu kullanıcıya sızmamalı', () => {
    test.beforeEach(async () => {
        test.setTimeout(120_000);
    });

    for (const route of ROUTES) {
        test(`${route} — görünür metinde plan/bölüm/görev referansı yok`, async ({ page }) => {
            await page.goto(route);
            await waitForAppReady(page, { timeout: 60_000 });

            // Sekmeli ders sayfalarında yalnızca aktif sekme DOM'da olur; sidebar
            // sekmelerini tek tek gezmek testi dakikalarca uzatır. Statik denetim
            // zaten TÜM sekmeleri kapsıyor — burada ilk ekran + sayfa gövdesi
            // taranır (bileşen-içi hardcode metin için bu yeterlidir).
            const visibleText = await page.evaluate(() => document.body.innerText);

            for (const [pattern, label] of JARGON_PATTERNS) {
                const match = visibleText.match(pattern);
                if (match) {
                    const at = match.index ?? 0;
                    const context = visibleText
                        .slice(Math.max(0, at - 80), at + 100)
                        .replace(/\s+/g, ' ')
                        .trim();
                    throw new Error(
                        `${route} sayfasında kullanıcıya görünen metinde iç koordinasyon jargonu (${label}):\n` +
                        `  …${context}…\n` +
                        `CLAUDE.md §24: plan dosyaları, § bölüm numaraları ve görev kodları ders içeriğine ve arayüze YAZILMAZ.`,
                    );
                }
            }

            // Testin gerçekten metin okuduğunu kanıtla — boş bir sayfada döngü
            // sessizce geçerdi ve test hiçbir şey doğrulamamış olurdu.
            expect(visibleText.length).toBeGreaterThan(200);
        });
    }
});
