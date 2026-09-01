// supabase/functions/_shared/groq.ts
// Shared Groq (OpenAI-compatible) chat completion helper, used by qa-assistant,
// grade-interview-answer and explain-quiz-answer. Switched from Gemini because
// Gemini's free-tier quota on this Google Cloud project was effectively zero
// (HTTP 429 "You exceeded your current quota" even on a single batched request).
// Groq's free tier is much more generous and uses the same chat/completions
// shape as OpenAI, so all three functions share this one call.

// ⚠ MODEL ADI ARTIK KODDA DEĞİL, YAPILANDIRMADA.
//
// Sebebi ölçüldü (2026-08-28): `llama-3.3-70b-versatile` Groq tarafında
// kalktı ve buradaki TEK sabit sekiz fonksiyonu birden 502'ye düşürdü.
// Kodumuzda hiçbir şey değişmemişti — sağlayıcının kataloğu kaydı.
//
// Model adı bir yapılandırma değeridir, kod değil: sağlayıcı emekliye
// ayırdığında düzeltme bir pano değişikliği olmalı, yeni bir kod deploy'u
// değil. `GROQ_MODEL` secret'ı tanımlıysa o kullanılır.
// 2026-08-29'da hesabın model listesi ÖLÇÜLEREK seçildi: listedeki en
// büyük genel amaçlı sohbet modeli. Yedek değeri de canlı tutmak gerekir —
// ölü bir varsayılan, secret'ı olmayan yeni bir ortamı ilk istekte kırar.
const FALLBACK_MODEL = 'openai/gpt-oss-120b'
const DEFAULT_MODEL = Deno.env.get('GROQ_MODEL') ?? FALLBACK_MODEL

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

export async function callGroq(
    apiKey: string,
    messages: ChatMessage[],
    options: { model?: string; temperature?: number; maxTokens?: number } = {}
): Promise<string> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: options.model ?? DEFAULT_MODEL,
            messages,
            temperature: options.temperature ?? 0.3,
            ...(options.maxTokens ? { max_tokens: options.maxTokens } : {}),
        }),
    })

    if (!response.ok) {
        const errText = await response.text()
        const model = options.model ?? DEFAULT_MODEL
        console.error('Groq API error:', response.status, 'model:', model, errText)

        // Modelin emekliye ayrılması bu entegrasyonun ölçülmüş arıza biçimidir
        // ve genel bir "yanıt alınamadı" mesajının arkasında teşhis edilmesi
        // saatler alır. Bu dal, hatayı KENDİ KENDİNİ açıklar hâle getirir:
        // hangi model istendiğini ve nereden değiştirileceğini söyler.
        if (errText.includes('model_not_found') || errText.includes('does not exist')) {
            throw new Error(
                `Groq modeli "${model}" artık yok ya da bu hesabın erişimi kapalı. ` +
                `Mevcut modeller: GET https://api.groq.com/openai/v1/models. ` +
                `Düzeltme kodda değil, GROQ_MODEL secret'ındadır.`,
            )
        }

        throw new Error(`AI servisinden yanıt alınamadı (HTTP ${response.status}): ${errText.slice(0, 300)}`)
    }

    const result = await response.json()
    return result?.choices?.[0]?.message?.content ?? ''
}
