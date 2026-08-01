import type { Page } from '@playwright/test';

// SEO Faz 2 / S3 — çerezsiz analytics olaylarını test edebilmek için ortak yardımcılar.
//
// Neden ayrı bir dosya (spec değil): bir spec dosyasından yardımcı import etmek,
// o spec'in testlerini import eden dosyada TEKRAR kaydettirir. Playwright
// `testDir: './tests'` kullandığı ve varsayılan testMatch yalnızca `*.spec.ts`
// eşlediği için bu dosya test olarak toplanmaz.

export type RecordedEvent = { name: string; props: Record<string, unknown> };

const STORAGE_KEY = '__analytics_events__';

// Gerçek Plausible script'i yerine çağrıları biriktiren bir taklit kurar.
//
// ÖNEMLİ: gerçek `plausible.io/js/script.js` ÖNCE engellenmeli. Engellenmezse
// script yüklenip `window.plausible`ı KENDİ fonksiyonuyla EZİYOR — ve o
// fonksiyon localhost'ta bilinçli olarak hiçbir şey göndermiyor (hostname
// kontrolü). Yani engellemeden yazılan bir test, olay hiç tetiklenmese bile
// sessizce "geçer" görünürdü. Route CONTEXT düzeyinde kurulur ki dil
// düğmesinin yaptığı tam sayfa navigasyonundan sonra da geçerli kalsın.
//
// `addInitScript` her navigasyonda yeniden çalışır; biriken kayıtlar
// sessionStorage'da yaşadığı için navigasyonu atlatır.
export async function stubPlausible(page: Page): Promise<void> {
    await page.context().route(/plausible\.io/, (route) => route.abort());
    await page.addInitScript((key) => {
        (window as unknown as Record<string, unknown>).plausible = (
            name: string,
            opts?: { props?: Record<string, unknown> },
        ) => {
            const prev = JSON.parse(sessionStorage.getItem(key) || '[]');
            prev.push({ name, props: opts?.props ?? {} });
            sessionStorage.setItem(key, JSON.stringify(prev));
        };
    }, STORAGE_KEY);
}

// Gerçek script'i engeller ama taklit KURMAZ — adblock kullanan ya da hesabın
// henüz kurulmadığı kullanıcıyı temsil eder (no-op güvenliği testi için).
export async function blockPlausible(page: Page): Promise<void> {
    await page.context().route(/plausible\.io/, (route) => route.abort());
    await page.addInitScript(() => {
        delete (window as unknown as Record<string, unknown>).plausible;
    });
}

export async function recordedEvents(page: Page): Promise<RecordedEvent[]> {
    return page.evaluate((key) => JSON.parse(sessionStorage.getItem(key) || '[]'), STORAGE_KEY);
}
