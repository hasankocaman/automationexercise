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
//   mission    : `id` (benzersiz) · `relatedTopicId` · `steps` en az 3 · her step'te
//                boş olmayan `brief` + `miniLesson` + type'lı gömülü `block` ·
//                `successCriterion` verilirse 'onFirstSuccess'|'manual'
//                (challenge-first-experience-plan.md §3.2).
//
// UYARI (bilgi amaçlı, build kırmaz):
//   - prediction doğru-şık pozisyon dağılımı (ör. hepsi B ise kullanıcı gaming yapabilir).
//   - prediction `relatedTopicId` eksikse (plan §2: "önerilir").

const FILES = [
    'javaData.js', 'javascriptData.js', 'pythonData.js', 'sqlData.js', 'typescriptData.js',
];

// ROUTE_ADVICE (mentorAdvice.js) aksiyonlarındaki `openTab` derin-link indeksleri,
// o route'un data dosyasında prediction bloğu OLAN bir sekmeyi göstermeli. İçerik
// yeniden sıralanırsa indeks kayar ve mentor kullanıcıyı yanlış sekmeye götürür —
// bu guard onu build zamanında yakalar. route → { data dosyası, export adı }.
const ROUTE_DATA = {
    '/java': 'javaData', '/javascript': 'javascriptData', '/python': 'pythonData',
    '/sql': 'sqlData', '/typescript': 'typescriptData',
};

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

    // prediction şema değişmezleri — hem dil sayfalarında hem mission içine
    // GÖMÜLÜ prediction'larda aynı kurallar geçerlidir (bkz. aşağıdaki ikinci tur).
    const auditPrediction = (b, file) => {
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
    };

    for (const file of FILES) {
        const mod = await import(`../src/data/${file}`);
        const data = mod[Object.keys(mod).find((k) => k.endsWith('Data'))] || Object.values(mod)[0];

        // — prediction —
        for (const b of collectBlocks(data, ['prediction'])) auditPrediction(b, file);

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

    // — mission (challenge-first görev zinciri, challenge-first-experience-plan.md §3.2) —
    // Missionlar dil sayfalarıyla sınırlı değil; yeni mission eklenen data
    // dosyalarını buraya ekle (Sonnet rollout: playwrightData, cypressData…).
    const MISSION_FILES = [...FILES, 'seleniumData.js', 'playwrightData.js', 'cypressData.js', 'restAssuredData.js', 'sprintsData.js', 'dockerData.js', 'jenkinsData.js', 'gitGithubData.js', 'postmanData.js', 'linuxData.js'];
    // pythonData.js ve sqlData.js zaten FILES içinde (dil sayfaları listesi) — MISSION_FILES ayrıca eklemez.
    const missionIdOwner = new Map();
    let missionCount = 0;
    for (const file of [...new Set(MISSION_FILES)]) {
        const mod = await import(`../src/data/${file}`);
        const data = mod[Object.keys(mod).find((k) => k.endsWith('Data'))] || Object.values(mod)[0];

        // Mission ADIMLARINA gömülü prediction'lar da şema denetimine girer.
        // FILES'ta OLMAYAN dosyalarda (seleniumData, sprintsData…) bu bloklar
        // aksi hâlde HİÇ doğrulanmıyordu — eksik `reveal` veya iki `correct`
        // sessizce geçiyordu. FILES'takiler yukarıda sayıldığı için burada
        // yalnızca fazladan dosyalar taranır (çifte sayım olmasın).
        if (!FILES.includes(file)) {
            for (const b of collectBlocks(data, ['prediction'])) auditPrediction(b, file);
        }

        for (const b of collectBlocks(data, ['mission'])) {
            missionCount++;
            const label = b.id ?? '(id yok)';
            if (!b.id) {
                errors.push(`${file}: bir mission bloğunda 'id' yok — XP/beceri tekilliği için ZORUNLU (plan §3.2).`);
            } else if (missionIdOwner.has(b.id)) {
                errors.push(`${file}: mission id='${b.id}' benzersiz değil (ayrıca ${missionIdOwner.get(b.id)} içinde).`);
            } else {
                missionIdOwner.set(b.id, file);
            }
            if (!b.relatedTopicId) {
                errors.push(`${file}: mission id='${label}' — 'relatedTopicId' ZORUNLU (plan §3.2).`);
            }
            const steps = Array.isArray(b.steps) ? b.steps : null;
            if (!steps || steps.length < 3) {
                errors.push(`${file}: mission id='${label}' — 'steps' en az 3 elemanlı dizi olmalı (plan §3.2), bulundu: ${steps ? steps.length : 'yok'}.`);
            } else {
                if (steps.length > 8) {
                    warnings.push(`${file}: mission id='${label}' — ${steps.length} adım (plan §3.2 ~7 önerir); kullanıcıyı bunaltma riski.`);
                }
                steps.forEach((s, i) => {
                    if (!isNonEmptyText(s.brief)) errors.push(`${file}: mission id='${label}' step[${i}] — 'brief' boş/eksik.`);
                    if (!isNonEmptyText(s.miniLesson)) errors.push(`${file}: mission id='${label}' step[${i}] — 'miniLesson' ZORUNLU (challenge-first: takılınca ders), boş/eksik.`);
                    if (!s.block || typeof s.block.type !== 'string') errors.push(`${file}: mission id='${label}' step[${i}] — type'lı gömülü 'block' eksik.`);
                    if (s.successCriterion != null && !['onFirstSuccess', 'manual'].includes(s.successCriterion)) {
                        errors.push(`${file}: mission id='${label}' step[${i}] — successCriterion 'onFirstSuccess'|'manual' olmalı, bulundu: '${s.successCriterion}'.`);
                    }
                });
            }
        }
    }

    // — ROUTE_ADVICE openTab derin-link guard'ı —
    // Mentor aksiyonlarının openTab'ı gerçekten prediction OLAN sekmeyi gösteriyor mu?
    try {
        const { ROUTE_ADVICE } = await import('../src/lib/mentorAdvice.js');
        for (const [route, entry] of Object.entries(ROUTE_ADVICE)) {
            for (const action of (entry.actions || [])) {
                if (typeof action.openTab !== 'number') continue;
                const dataName = ROUTE_DATA[action.route];
                if (!dataName) {
                    errors.push(`mentorAdvice ROUTE_ADVICE['${route}']: openTab=${action.openTab} ama route='${action.route}' için data eşlemesi yok (ROUTE_DATA'ya ekle).`);
                    continue;
                }
                const mod = await import(`../src/data/${dataName}.js`);
                const data = mod[dataName];
                const tree = data.tr || data;
                const sec = tree.sections?.[action.openTab];
                const hasPred = sec && Array.isArray(sec.blocks) && sec.blocks.some((b) => b.type === 'prediction');
                if (!hasPred) {
                    errors.push(`mentorAdvice ROUTE_ADVICE['${route}']: openTab=${action.openTab} sekmesinde ('${action.route}') prediction bloğu YOK — indeks kaymış olabilir, güncelle.`);
                }
            }
        }
    } catch (e) {
        errors.push(`ROUTE_ADVICE guard çalıştırılamadı: ${e.message}`);
    }

    console.log('Öğrenme-blok Şema Denetimi (learning-science-upgrade-plan.md §2)\n');
    console.log(`Benzersiz blok sayıları → prediction: ${predCount} · code-trace: ${traceCount} · heap-stack: ${heapCount} · mission: ${missionCount}`);
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
    console.log('\n✅ Tüm prediction/code-trace/heap-stack/mission blokları şema kurallarını karşılıyor.');
}

main().catch((err) => {
    console.error('Denetim script hatası:', err);
    process.exit(1);
});
