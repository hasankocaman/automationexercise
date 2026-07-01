export function sanitizeAiText(text) {
    if (!text || typeof text !== 'string') return text;

    let sanitized = text;

    // Llama ve Groq modellerinin Türkçe "stabil" kelimesi yerine Çince "稳" (stabil/kararlı)
    // karakterini kullanma hatasını giderir (örn: 'daha稳il' -> 'daha stabil').
    sanitized = sanitized.replace(/daha\s*稳\s*il/gi, 'daha stabil');
    sanitized = sanitized.replace(/daha\s*稳/gi, 'daha stabil');
    sanitized = sanitized.replace(/稳/g, 'stabil');

    // Eğer açıklama metinlerinde başka Çince, Japonca veya Korece (CJK) karakterler
    // kalmışsa, bunları kullanıcı arayüzünü bozmaması için temizler.
    sanitized = sanitized.replace(/[\u4e00-\u9fa5]/g, '');

    return sanitized;
}
