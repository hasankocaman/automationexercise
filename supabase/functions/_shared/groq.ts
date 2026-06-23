// supabase/functions/_shared/groq.ts
// Shared Groq (OpenAI-compatible) chat completion helper, used by qa-assistant,
// grade-interview-answer and explain-quiz-answer. Switched from Gemini because
// Gemini's free-tier quota on this Google Cloud project was effectively zero
// (HTTP 429 "You exceeded your current quota" even on a single batched request).
// Groq's free tier is much more generous and uses the same chat/completions
// shape as OpenAI, so all three functions share this one call.

const DEFAULT_MODEL = 'llama-3.3-70b-versatile'

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
        console.error('Groq API error:', response.status, errText)
        throw new Error(`AI servisinden yanıt alınamadı (HTTP ${response.status}): ${errText.slice(0, 300)}`)
    }

    const result = await response.json()
    return result?.choices?.[0]?.message?.content ?? ''
}
