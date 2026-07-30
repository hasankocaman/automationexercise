// Öğrenme Bilimi Yükseltmesi (Documents/learning-science-upgrade-plan.md) —
// prediction / code-trace / heap-stack blok tiplerinin ŞEMA DENETİMİ.
//
// Bu üç blok tipi planın amiral gemisi teslimatıydı (Dalga 1/2) ama şema
// değişmezleri (invariants) hiçbir otomatik kontrolle korunmuyordu. Bu script
// gerçek `*Data.js` modüllerini Node'da import edip (regex değil, gerçek JS obje
// ağacını gezerek) her bloğun plan §2'deki şema kurallarına uyduğunu doğrular.
//
// Çalıştırmak için: node scripts/audit-learning-blocks.mjs
// veya: npm run audit:learning-blocks
//
// HARD FAIL (build kırar):
//   prediction : tam olarak 1 `correct` şık · boş olmayan `reveal` · `id` (XP için
//                ZORUNLU, plan §2) · `id` tüm dosyalar arasında benzersiz.
//   code-trace : `code` düz string (renderer .split('\n') yapar, {tr,en} DESTEKLENMEZ,
//                plan §2 not) · `steps` boş olmayan dizi · her step'te sayısal `line`.
//   heap-stack : `code` düz string · `steps` boş olmayan dizi · her step'te sayısal `line`.
//
// UYARI (bilgi amaçlı, build kırmaz):
//   - prediction doğru-şık pozisyon dağılımı (ör. hepsi B ise kullanıcı gaming yapabilir).
//   - prediction `relatedTopicId` eksikse (plan §2: "önerilir").

const FILES = [
    'javaData.js', 'javascriptData.js', 'pythonData.js', 'sqlData.js', 'typescriptData.js',
];

// Bir data modülünün tüm ağacını gezip verilen tiplerdeki blokları toplar.
// Çift-ağaçlı dosyalarda (data.tr + data.en) aynı sabit iki ağaca da AYNI
// referansla konduğundan, ziyaret edilen obje referanslarını Set'te tutup
// tekrar saymayı önleriz (interview-questions auditor ile aynı ilke).
function collectBlocks(root, types) {
    const found = [];
    const seen = new Set();
    function walk(node) {
        if (!node || typeof node !== 'object' || seen.has(node)) return;
        if (typeof node !== 'function') seen.add(node);
        if (Array.isArray(node)) { for (const n of node) walk(n); return; }
        if (typeof node.type === 'string' && types.includes(node.type)) found.push(node);
        for (const k of Object.keys(node)) walk(node[k]);
    }
    walk(root);
    return found;
}

function isNonEmptyText(val) {
    if (val == null) return false;
    if (typeof val === 'string') return val.trim().length > 0;
    if (typeof val === 'object') return isNonEmptyText(val.tr) || isNonEmptyText(val.en);
    return false;
}

async function main() {
    const errors = [];
    const warnings = [];
    const idOwner = new Map();          // prediction id → dosya (benzersizlik)
    const positionDist = {};            // doğru şık harfi → adet
    let predCount = 0, traceCount = 0, heapCount = 0;

    for (const file of FILES) {
        const mod = await import(`../src/data/${file}`);
        const data = mod[Object.keys(mod).find((k) => k.endsWith('Data'))] || Object.values(mod)[0];

        // — prediction —
        for (const b of collectBlocks(data, ['prediction'])) {
            predCount++;
            const opts = Array.isArray(b.options) ? b.options : [];
            const correctIdxs = opts.map((o, i) => (o && o.correct ? i : -1)).filter((i) => i >= 0);
            if (correctIdxs.length !== 1) {
                errors.push(`${file}: prediction id='${b.id ?? '(yok)'}' — tam 1 correct beklenirken ${correctIdxs.length} bulundu.`);
            }
            if (!isNonEmptyText(b.reveal)) {
                errors.push(`${file}: prediction id='${b.id ?? '(yok)'}' — 'reveal' (NEDEN açıklaması) boş/eksik (plan §2 ZORUNLU).`);
            }
            if (!b.id) {
                errors.push(`${file}: bir prediction bloğunda 'id' yok — XP tekilliği için ZORUNLU (plan §2).`);
            } else {
                if (idOwner.has(b.id)) {
                    errors.push(`${file}: prediction id='${b.id}' benzersiz değil (ayrıca ${idOwner.get(b.id)} içinde).`);
                } else {
                    idOwner.set(b.id, file);
                }
            }
            if (!b.relatedTopicId) {
                warnings.push(`${file}: prediction id='${b.id ?? '(yok)'}' — 'relatedTopicId' önerilir (plan §2), eksik.`);
            }
            if (correctIdxs.length === 1) {
                const letter = String.fromCharCode(65 + correctIdxs[0]);
                positionDist[letter] = (positionDist[letter] || 0) + 1;
            }
        }

        // — code-trace + heap-stack —
        for (const type of ['code-trace', 'heap-stack']) {
            for (const b of collectBlocks(data, [type])) {
                if (type === 'code-trace') traceCount++; else heapCount++;
                if (typeof b.code !== 'string') {
                    errors.push(`${file}: ${type} title='${JSON.stringify(b.title)}' — 'code' düz string OLMALI ({tr,en} desteklenmez, renderer .split yapar; plan §2).`);
                }
                if (!Array.isArray(b.steps) || b.steps.length === 0) {
                    errors.push(`${file}: ${type} title='${JSON.stringify(b.title)}' — 'steps' boş olmayan dizi olmalı.`);
                } else {
                    b.steps.forEach((s, i) => {
                        if (typeof s.line !== 'number') {
                            errors.push(`${file}: ${type} title='${JSON.stringify(b.title)}' — steps[${i}].line sayısal değil.`);
                        }
                    });
                }
            }
        }
    }

    console.log('Öğrenme-blok Şema Denetimi (learning-science-upgrade-plan.md §2)\n');
    console.log(`Benzersiz blok sayıları → prediction: ${predCount} · code-trace: ${traceCount} · heap-stack: ${heapCount}`);
    console.log(`Doğru-şık pozisyon dağılımı: ${JSON.stringify(positionDist)}`);

    // Pozisyon-yanlılığı uyarısı: bir harf toplamın %80'inden fazlasını kapsıyorsa gaming riski.
    const totalPred = Object.values(positionDist).reduce((a, b) => a + b, 0);
    const maxLetter = Object.entries(positionDist).sort((a, b) => b[1] - a[1])[0];
    if (maxLetter && totalPred > 0 && maxLetter[1] / totalPred > 0.8) {
        warnings.push(`Doğru cevap ${totalPred} prediction'ın ${maxLetter[1]}'inde '${maxLetter[0]}' pozisyonunda — kullanıcı sadece '${maxLetter[0]}' seçerek gaming yapabilir. Şıkları karıştırmak önerilir.`);
    }

    console.log('-'.repeat(70));
    if (warnings.length) {
        console.log(`\n⚠️  ${warnings.length} uyarı (build kırılmaz):`);
        for (const w of warnings) console.log('   • ' + w);
    }
    if (errors.length) {
        console.log(`\n❌ ${errors.length} şema ihlali:`);
        for (const e of errors) console.log('   • ' + e);
        console.log('\nŞema ihlalleri build\'i kırar.');
        process.exit(1);
    }
    console.log('\n✅ Tüm prediction/code-trace/heap-stack blokları şema kurallarını karşılıyor.');
}

main().catch((err) => {
    console.error('Denetim script hatası:', err);
    process.exit(1);
});
