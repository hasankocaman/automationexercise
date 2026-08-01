// src/data/interviewWarmupData.js
// Ana sayfadaki "Mülakat Isınma Turu" bölümünün TÜM kullanıcıya görünen metinleri.
//
// Neden bileşenin içinde değil burada: `check-i18n-leaks.mjs` yalnızca
// `src/data/*Data.js` dosyalarını tarar. Bileşene gömülen metin hiçbir otomatik
// dil denetiminden geçmez. Bu dosya STRICT_ZERO listesindedir: EN tarafında tek
// bir Türkçe karakter build'i kırar.
//
// Soruların KENDİSİ burada DEĞİL — onlar ders verisinden build sırasında
// türetilir (`scripts/generate-interview-showcase.mjs`). Burada yalnızca
// çerçeve metni var.

export const interviewWarmupData = {
    heading: { tr: '⚡ Mülakat Isınma Turu', en: '⚡ Interview Warm-Up Round' },

    intro: {
        tr: '12 farklı konudan karışık gerçek mülakat soruları — cevabı görmeden önce bir saniye düşün.',
        en: '12 real interview questions mixed from different topics — think for a second before revealing the answer.',
    },

    // Kullanıcının açıkça istediği açıklama: buradaki soruların amacı zinde
    // tutmak; ASIL çalışma derslerin sonundaki mülakat bölümünde yapılır.
    purposeTitle: { tr: 'Bu bölüm neye yarar, neye yaramaz?', en: 'What this section is for — and what it is not' },
    purposeBody: {
        tr: 'Burası sadece hızlı bir nabız ölçümü; asıl mülakat pratiği ve AI değerlendirmesi her dersin sonundaki mülakat sekmesinde.',
        en: 'This is just a quick pulse check — the real interview practice with AI-graded feedback lives in each lesson\'s interview tab.',
    },

    showAnswer: { tr: 'Cevabı göster', en: 'Reveal the answer' },
    hideAnswer: { tr: 'Cevabı gizle', en: 'Hide the answer' },
    goToLesson: { tr: 'Bu konuyu çalış →', en: 'Study this topic →' },

    levelLabels: {
        basic: { tr: 'temel', en: 'basic' },
        intermediate: { tr: 'orta', en: 'intermediate' },
        advanced: { tr: 'ileri', en: 'advanced' },
    },

    // Teknoloji adları çeviriye tabi değildir (CLAUDE.md §8) — düz string.
    routeLabels: {
        '/selenium': 'Selenium',
        '/playwright': 'Playwright',
        '/cypress': 'Cypress',
        '/java': 'Java',
        '/python': 'Python',
        '/sql': 'SQL',
        '/javascript': 'JavaScript',
        '/typescript': 'TypeScript',
        '/docker': 'Docker',
        '/jenkins': 'Jenkins',
        '/git-github': 'Git & GitHub',
        '/postman': 'Postman',
    },
}

export default interviewWarmupData
