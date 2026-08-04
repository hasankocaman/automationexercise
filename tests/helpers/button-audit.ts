import type { Page } from '@playwright/test';

// İçerik alanı (sol dikey sidebar'ın hemen yanındaki kolon).
export const CONTENT_AREA = 'div[class*="flex-shrink-0"][class*="sticky"] + div';

export type TabButtonAudit = {
    total: number;
    visible: number;
    disabled: string[];
    brokenLayout: string[];
    unclickable: string[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Bir sekmedeki TÜM butonları TEK DOM geçişinde denetler.
//
// Neden tek geçiş: önceki hâl her butonu tek tek dolaşıp iki ayrı tarayıcı
// çağrısı yapıyordu. Ölçüldü — 29 ders sayfasında 390 sekme ve 21.715 görünür
// buton var, yani ~43.000 gidiş-dönüş. Çağrı başına ~26-37 ms olduğu için tek
// başına /python bile testin süre sınırını yiyordu ve hangi sayfanın düştüğü
// koşumdan koşuma değişiyordu (ürün hatası yer değiştirmez, biten süre bütçesi
// değiştirir). Üstelik yapılan işin çoğu boştu: seçici zaten `:visible`
// filtresi taşırken üstüne `toBeVisible()` çağrılıyor, `isEnabled()` sonucu ise
// hiçbir yerde doğrulanmıyordu.
//
// Denetlenen gerçek arıza sınıfları:
//   • brokenLayout — yerleşimde yer kaplayan ama 0×0 boyutlu buton. Kullanıcı
//     onu göremez ama sayfa "orada bir şey var" sanır; bozuk render belirtisi.
//   • unclickable — görünür ve enabled olduğu hâlde `pointer-events: none`.
//     Tıklanabilir GÖRÜNÜR ama tıklanmaz; kullanıcının teşhis edemeyeceği tür.
//   • disabled — bilgi amaçlı toplanır, hard-fail DEĞİL: birçok aksiyon butonu
//     (AI değerlendir, mesaj gönder) ön koşul sağlanana kadar kasıtlı disabled.
//
// `display: none` olanlar denetim dışı: mobil-only toggle'lar ve kapalı
// paneller bilinçli gizlidir.
// ─────────────────────────────────────────────────────────────────────────────
export async function auditTabButtons(page: Page, selector: string = CONTENT_AREA): Promise<TabButtonAudit> {
    return page.evaluate((sel) => {
        const out = {
            total: 0,
            visible: 0,
            disabled: [] as string[],
            brokenLayout: [] as string[],
            unclickable: [] as string[],
        };
        const root = document.querySelector(sel);
        if (!root) return out;

        const label = (el: Element) => (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40) || '(metinsiz)';

        for (const el of Array.from(root.querySelectorAll('button'))) {
            out.total += 1;
            const style = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            const laidOut = style.display !== 'none';

            if (laidOut && (rect.width === 0 || rect.height === 0)) {
                out.brokenLayout.push(label(el));
                continue;
            }
            if (!laidOut || style.visibility === 'hidden' || style.opacity === '0') continue;

            out.visible += 1;
            if ((el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true') {
                out.disabled.push(label(el));
            } else if (style.pointerEvents === 'none') {
                out.unclickable.push(label(el));
            }
        }
        return out;
    }, selector);
}
