// Saf veri çıkarma yardımcıları — UI'a hiç dokunmaz, sadece *Data.js'lerden
// quiz bloklarını TR/EN eşleştirmesiyle çıkarır. tests-quiz-audit/*.spec.ts
// bu modülü import edip gerçek tarayıcıda doğrulama yapar.
//
// ÖNEMLİ: tr.sections[i].blocks ve en.sections[i].blocks AYNI uzunlukta/sırada
// OLMAYABİLİR (örn. awsData, javaData, playwrightData, selenium, jmeter, kafka,
// kubernetes, postman, basitBackendData — bu dosyada keşfedildi) — EN içerik
// genelde TR'den daha az detaylı tutulmuş, ara blok sayısı farklı. Bu yüzden
// quiz blokları absolute index'le DEĞİL, "bu sekmedeki N'inci quiz bloğu" sırasıyla
// eşleştirilir — bu varsayım da yanlış çıkabilir (sayı uyuşmazsa), o durumda
// `pairWarning` alanı doldurulur ve o sekme min(tr,en) kadar test edilir.

export function normalizeOption(opt, i) {
    if (typeof opt === 'string') return { id: String.fromCharCode(97 + i), text: opt };
    return opt;
}

// TopicPage.jsx'teki tx() ile aynı mantık — bazı eski dosyalar (browserstackData,
// pythonData, typescriptData) bir tek üst-seviye dil ağacının İÇİNDE bile
// question/option/explanation alanlarını {tr,en} bilingual nesne olarak tutuyor
// (dockerData/jenkinsData gibi diğerleri ise düz string kullanıyor — her iki
// formatı da güvenle çözmek için bu fonksiyon kullanılmalı, asla `block.question`
// doğrudan string olarak varsayılmamalı).
export function pickText(val, lang) {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[lang] || val.en || val.tr || '';
}

export function normalizeCorrect(correct) {
    return typeof correct === 'number' ? String.fromCharCode(97 + correct) : correct;
}

function quizBlocksInTab(sectionBlocks) {
    return (sectionBlocks || []).filter((b) => b.type === 'quiz');
}

/**
 * @param {object} data - örn. dockerData (data.tr, data.en)
 * @returns {Array<{tabIndex:number, quizIndexInTab:number, tr: object|null, en: object|null, pairWarning?: string}>}
 */
export function extractQuizPairs(data) {
    const trSections = data.tr.sections;
    const enSections = data.en.sections;
    const pairs = [];

    trSections.forEach((trSection, tabIndex) => {
        const enSection = enSections[tabIndex];
        const trQuizzes = quizBlocksInTab(trSection.blocks);
        const enQuizzes = enSection ? quizBlocksInTab(enSection.blocks) : [];
        const count = Math.max(trQuizzes.length, enQuizzes.length);
        for (let q = 0; q < count; q++) {
            const tr = trQuizzes[q] || null;
            const en = enQuizzes[q] || null;
            pairs.push({
                tabIndex,
                quizIndexInTab: q,
                tr,
                en,
                pairWarning: (!tr || !en)
                    ? `tab ${tabIndex}: tr quiz sayısı=${trQuizzes.length}, en quiz sayısı=${enQuizzes.length} (uyuşmuyor)`
                    : undefined,
            });
        }
    });
    return pairs;
}
