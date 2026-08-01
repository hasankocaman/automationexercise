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
        tr: 'Farklı konulardan karışık gelen gerçek mülakat soruları. Cevabı görmeden önce bir saniye düşün — bildiğini sandığın şeyle gerçekten bildiğin şey arasındaki farkı en hızlı burada görürsün.',
        en: 'Real interview questions arriving mixed from different topics. Take a second to think before you reveal the answer — this is the fastest way to see the gap between what you think you know and what you actually know.',
    },

    // Kullanıcının açıkça istediği açıklama: buradaki soruların amacı zinde
    // tutmak; ASIL çalışma derslerin sonundaki mülakat bölümünde yapılır.
    purposeTitle: { tr: 'Bu bölüm neye yarar, neye yaramaz?', en: 'What this section is for — and what it is not' },
    purposeBody: {
        tr: 'Buradaki sorular seni hazırlamak için değil, UYANIK TUTMAK için var: hızlı bir nabız ölçümü, kısa bir adrenalin. Cevabı okuyup geçmek öğrenmek sayılmaz. Asıl iş her dersin sonundaki mülakat bölümünde: orada soruyu kendi cümlelerinle cevaplıyorsun, cevabın değerlendiriliyor ve eksik kalan yer sana geri bildirim olarak dönüyor. Bir konuyu gerçekten kapattığını oradan anlarsın, buradan değil.',
        en: 'These questions are not here to prepare you — they are here to keep you AWAKE: a quick pulse check, a short shot of adrenaline. Reading an answer and moving on is not learning. The real work happens in the interview section at the end of each lesson: there you answer in your own words, your answer gets evaluated, and the gaps come back to you as feedback. That is where you find out whether you have really closed a topic — not here.',
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
