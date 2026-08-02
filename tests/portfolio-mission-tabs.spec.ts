import { test, expect } from '@playwright/test';
import { portfolioData } from '../src/data/portfolioData.js';

// `/portfolio`'daki her görev kartının "aç" linki `mission.openTab`'i
// TopicPage'in başlangıç sekmesi olarak geçirir (bkz. portfolio-page.spec.ts
// "aç linki KENDİ sekmesinde açıyor" testi — orası TEK bir görevi tarayıcıda
// uçtan uca doğrular). Bu dosya onun tamamlayıcısı: `missionCatalog`'taki
// TÜM 18 ders görevi için `openTab` değerinin, o görevin GERÇEKTEN bulunduğu
// sekme indeksiyle eşleştiğini — data dosyasını okuyarak, tarayıcı açmadan —
// doğrular. Bir sayfaya yeni sekme eklenip mevcutlar kayarsa (veya bir görev
// başka bir sekmeye taşınırsa) `portfolioData.js`'teki sabit sayı sessizce
// eskir; bu test onu build zamanında değil ama her koşumda yakalar.
//
// Sprint bug görevleri (`bugCatalog`) kapsam DIŞI — onlar `/sprint` panosuna
// gider, sekmeli bir ders sayfası değildir, `openTab` taşımazlar.

type Block = { type: string; id?: string };
type Section = { blocks?: Block[] };

// mission-spread.spec.ts'teki PAGES ile aynı route → data dosyası eşlemesi.
const DATA_FILE_BY_ROUTE: Record<string, { file: string; varName: string }> = {
    '/selenium': { file: 'seleniumData', varName: 'seleniumData' },
    '/playwright': { file: 'playwrightData', varName: 'playwrightData' },
    '/cypress': { file: 'cypressData', varName: 'cypressData' },
    '/python': { file: 'pythonData', varName: 'pythonData' },
    '/sql': { file: 'sqlData', varName: 'sqlData' },
    '/rest-assured': { file: 'restAssuredData', varName: 'restAssuredData' },
    '/docker': { file: 'dockerData', varName: 'dockerData' },
    '/jenkins': { file: 'jenkinsData', varName: 'jenkinsData' },
    '/git-github': { file: 'gitGithubData', varName: 'gitGithubData' },
    '/java': { file: 'javaData', varName: 'javaData' },
    '/postman': { file: 'postmanData', varName: 'postmanData' },
    '/linux': { file: 'linuxData', varName: 'linuxData' },
};

// Veri dosyaları iki kalıptan biri: çift ağaçlı (`data.tr.sections`) veya tek
// ağaçlı (`data.sections`) — mission-spread.spec.ts'teki sectionsOf ile aynı.
function sectionsOf(data: any): Section[] {
    const s = data?.tr?.sections ?? data?.sections;
    if (!Array.isArray(s)) throw new Error('sections dizisi bulunamadı');
    return s;
}

type Bilingual = { tr?: string; en?: string };
type MissionEntry = {
    route: string;
    openTab?: number;
    title?: Bilingual;
    taskTitle?: Bilingual;
};

const missionEntries = Object.entries(portfolioData.missionCatalog) as Array<[string, MissionEntry]>;

test.describe('Portfolyo görev kataloğu — openTab gerçek sekme indeksiyle eşleşiyor', () => {
    for (const [missionId, entry] of missionEntries) {
        test(`${missionId}: openTab (${entry.openTab}), ${entry.route}'daki gerçek sekme indeksiyle eşleşiyor`, async () => {
            expect(typeof entry.openTab, `${missionId}: missionCatalog'da openTab sayısal olmalı`).toBe('number');

            const target = DATA_FILE_BY_ROUTE[entry.route];
            expect(target, `${entry.route} için DATA_FILE_BY_ROUTE eşlemesi eksik`).toBeTruthy();

            const mod = await import(`../src/data/${target.file}.js`);
            const sections = sectionsOf(mod[target.varName] ?? mod.default);

            const actualIndex = sections.findIndex((section) =>
                (section.blocks || []).some((block) => block.type === 'mission' && block.id === missionId),
            );

            expect(actualIndex, `${missionId}: ${entry.route} sayfasında mission bloğu bulunamadı`).toBeGreaterThanOrEqual(0);
            expect(
                entry.openTab,
                `${missionId}: portfolioData.js'teki openTab (${entry.openTab}) gerçek sekme indeksinden (${actualIndex}) farklı`,
            ).toBe(actualIndex);
        });
    }
});

// Kullanıcı raporu: "Sıradaki Görev" kartı `title`i ("...ettin", bitmiş)
// gösteriyordu — henüz yapılmamış bir görev bitmiş gibi görünüyordu. Çözüm
// ayrı bir `taskTitle` alanıydı ("...etmek", ileriye bakan). Bu test her
// katalog girdisinin taskTitle'ı GERÇEKTEN taşıdığını ve onu title'ın bire
// bir kopyası olarak bırakmadığını doğrular — yeni bir görev eklenip
// taskTitle unutulursa portfolioSnapshot sessizce title'a düşer (fallback),
// bu sessiz düşüşü burada yakalıyoruz.
test.describe('Portfolyo görev kataloğu — taskTitle title\'ın kopyası değil, ileriye bakan ayrı bir metin', () => {
    for (const [missionId, entry] of missionEntries) {
        test(`${missionId}: taskTitle tanımlı ve title'dan farklı`, () => {
            expect(entry.taskTitle, `${missionId}: missionCatalog'da taskTitle eksik`).toBeTruthy();
            expect(typeof entry.taskTitle?.tr, `${missionId}: taskTitle.tr eksik`).toBe('string');
            expect(typeof entry.taskTitle?.en, `${missionId}: taskTitle.en eksik`).toBe('string');
            expect(
                entry.taskTitle?.tr,
                `${missionId}: taskTitle.tr, title.tr ile birebir aynı — "Sıradaki Görev" kartı bitmiş gibi görünecek`,
            ).not.toBe(entry.title?.tr);
            expect(
                entry.taskTitle?.en,
                `${missionId}: taskTitle.en, title.en ile birebir aynı — "Next Mission" kartı bitmiş gibi görünecek`,
            ).not.toBe(entry.title?.en);
        });
    }
});
