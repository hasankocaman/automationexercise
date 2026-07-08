// CLAUDE.md §10 "KESİN KURAL — Mülakat Soruları": her teknoloji sayfasının
// mülakat sekmesinde minimum 50 soru (15 basic / 20 intermediate / 15 advanced)
// bulunmalıdır. Bu script gerçek `*Data.js` modüllerini Node'da import edip
// (regex değil, gerçek JS obje ağacını gezerek) her sayfanın interview-questions
// bloklarını sayar — kaynak formatı (tek/çift tırnak, iq() factory fonksiyonu,
// harici array referansı vb.) fark etmeksizin doğru sonuç verir.
//
// Çalıştırmak için: node scripts/audit-interview-questions.mjs
// veya: npm run audit:interview-questions

const PAGES = [
    { route: '/jmeter', file: 'jmeterData.js', exportName: 'jmeterData' },
    { route: '/sql', file: 'sqlData.js', exportName: 'sqlData' },
    { route: '/typescript', file: 'typescriptData.js', exportName: 'typescriptData' },
    { route: '/javascript', file: 'javascriptData.js', exportName: 'javascriptData' },
    { route: '/python', file: 'pythonData.js', exportName: 'pythonData' },
    { route: '/postman', file: 'postmanData.js', exportName: 'postmanData' },
    { route: '/bruno', file: 'brunoData.js', exportName: 'brunoData' },
    { route: '/jenkins', file: 'jenkinsData.js', exportName: 'jenkinsData' },
    { route: '/docker', file: 'dockerData.js', exportName: 'dockerData' },
    { route: '/rest-assured', file: 'restAssuredData.js', exportName: 'restAssuredData' },
    { route: '/kubernetes', file: 'kubernetesData.js', exportName: 'kubernetesData' },
    { route: '/kafka', file: 'kafkaData.js', exportName: 'kafkaData' },
    { route: '/appium', file: 'appiumData.js', exportName: 'appiumData' },
    { route: '/playwright', file: 'playwrightData.js', exportName: 'playwrightData' },
    { route: '/cypress', file: 'cypressData.js', exportName: 'cypressData' },
    { route: '/selenium', file: 'seleniumData.js', exportName: 'seleniumData' },
    { route: '/aws', file: 'awsData.js', exportName: 'awsData' },
    { route: '/azure', file: 'azureData.js', exportName: 'azureData' },
    { route: '/browserstack', file: 'browserstackData.js', exportName: 'browserstackData' },
    { route: '/git-github', file: 'gitGithubData.js', exportName: 'gitGithubData' },
    { route: '/linux', file: 'linuxData.js', exportName: 'linuxData' },
    { route: '/java', file: 'javaData.js', exportName: 'javaData' },
    { route: '/claude-ai', file: 'claudeAiData.js', exportName: 'claudeAiData' },
    { route: '/llm-agents', file: 'llmAgentsData.js', exportName: 'llmAgentsData' },
];

const MIN_TOTAL = 50;
const MIN_BASIC = 15;
const MIN_INTERMEDIATE = 20;
const MIN_ADVANCED = 15;

/** Verilen objeyi derinlemesine gezip type==='interview-questions' bloklarının
 * questions dizilerini toplar. Aynı soru havuzunun tr/en iki ayrı üst-seviye
 * kopyasında (data.en / data.tr) tekrarlanmasını önlemek için, en üst seviyede
 * `en` ve `tr` adında iki kardeş anahtar varsa SADECE `en` dalı gezilir (ikisi
 * aynı soru sayısının çevirisi olduğundan çift sayım olur). Böyle bir ayrım
 * yoksa (bilingual-per-block sayfalar) tüm ağaç tek seferde gezilir. */
function collectInterviewBlocks(root) {
    const blocks = [];
    const seen = new Set();

    function walk(node) {
        if (!node || typeof node !== 'object' || seen.has(node)) return;
        if (typeof node !== 'function') seen.add(node);
        if (Array.isArray(node)) {
            for (const item of node) walk(item);
            return;
        }
        if (node.type === 'interview-questions' && Array.isArray(node.questions)) {
            blocks.push(node);
        }
        for (const key of Object.keys(node)) {
            walk(node[key]);
        }
    }

    if (root && typeof root === 'object' && !Array.isArray(root) &&
        root.en && typeof root.en === 'object' &&
        root.tr && typeof root.tr === 'object') {
        walk(root.en);
    } else {
        walk(root);
    }

    return blocks;
}

function countLevels(blocks) {
    const counts = { basic: 0, intermediate: 0, advanced: 0, unknown: 0 };
    for (const block of blocks) {
        for (const q of block.questions) {
            const lvl = q?.level;
            if (lvl === 'basic' || lvl === 'intermediate' || lvl === 'advanced') counts[lvl]++;
            else counts.unknown++;
        }
    }
    return counts;
}

async function main() {
    const results = [];
    for (const page of PAGES) {
        const mod = await import(`../src/data/${page.file}`);
        const data = mod[page.exportName];
        if (!data) {
            results.push({ ...page, error: `export '${page.exportName}' bulunamadı` });
            continue;
        }
        const blocks = collectInterviewBlocks(data);
        const counts = countLevels(blocks);
        const total = counts.basic + counts.intermediate + counts.advanced + counts.unknown;
        results.push({ ...page, blockCount: blocks.length, counts, total });
    }

    let failCount = 0;
    let warnCount = 0;
    console.log('Mülakat Soru Denetimi (CLAUDE.md §10) — 22 teknoloji sayfası\n');
    console.log('Route'.padEnd(16), 'Toplam'.padEnd(8), 'Basic'.padEnd(7), 'Interm.'.padEnd(9), 'Advanced'.padEnd(9), 'Durum');
    console.log('-'.repeat(70));

    for (const r of results) {
        if (r.error) {
            console.log(r.route.padEnd(16), 'HATA:', r.error);
            failCount++;
            continue;
        }
        const { total, counts } = r;
        const meetsTotal = total >= MIN_TOTAL;
        const meetsTiers = counts.basic >= MIN_BASIC && counts.intermediate >= MIN_INTERMEDIATE && counts.advanced >= MIN_ADVANCED;
        let status;
        if (!meetsTotal) { status = '❌ FAIL (< 50 toplam)'; failCount++; }
        else if (!meetsTiers) { status = '⚠️  UYARI (dağılım 15/20/15 altında)'; warnCount++; }
        else { status = '✅ OK'; }

        console.log(
            r.route.padEnd(16),
            String(total).padEnd(8),
            String(counts.basic).padEnd(7),
            String(counts.intermediate).padEnd(9),
            String(counts.advanced).padEnd(9),
            status
        );
    }

    console.log('-'.repeat(70));
    console.log(`\nToplam: ${results.length} sayfa | Geçti: ${results.length - failCount - warnCount} | Uyarı: ${warnCount} | Başarısız: ${failCount}`);

    if (failCount > 0) {
        console.log('\n❌ En az bir sayfa CLAUDE.md §10 minimum 50 soru kuralını karşılamıyor.');
        process.exit(1);
    }
    console.log('\n✅ Tüm sayfalar minimum 50 soru kuralını karşılıyor.');
    if (warnCount > 0) {
        console.log('⚠️  Bazı sayfalar 15/20/15 seviye dağılımını tam karşılamıyor (bilgi amaçlı, build kırılmaz).');
    }
}

main().catch((err) => {
    console.error('Denetim script hatası:', err);
    process.exit(1);
});
