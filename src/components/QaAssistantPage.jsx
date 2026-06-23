// src/components/QaAssistantPage.jsx
// /qa-assistant — member-only chat with the LearnQA AI assistant. The browser never
// sees the AI provider's API key: it calls the `qa-assistant` Supabase Edge Function,
// which holds the key server-side and enforces the QA-only system prompt.
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import TopicHeader from './TopicHeader'

function useDarkModeState() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        document.documentElement.classList.toggle('dark-mode', isDark)
        document.documentElement.classList.toggle('light-mode-forced', !isDark)
        return isDark
    })
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.classList.toggle('dark-mode', darkMode)
        document.documentElement.classList.toggle('light-mode-forced', !darkMode)
    }, [darkMode])
    return [darkMode, setDarkMode]
}

// Çok hafif bir markdown render'ı — react-markdown gibi bir bağımlılık eklemeden
// fenced code block, inline code ve **bold**'u karşılar (AI cevapları genelde bunlardan ibaret).
function renderInline(text, keyPrefix) {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    return parts.map((part, i) => {
        const key = `${keyPrefix}-${i}`
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={key}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
            return <code key={key} className="rounded bg-black/10 px-1 py-0.5 text-[0.85em]">{part.slice(1, -1)}</code>
        }
        const lines = part.split('\n')
        return lines.map((line, j) => (
            <span key={`${key}-${j}`}>{line}{j < lines.length - 1 && <br />}</span>
        ))
    })
}

function renderMarkdownLite(text, darkMode) {
    const segments = []
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g
    let lastIndex = 0
    let match
    let key = 0
    while ((match = codeBlockRegex.exec(text)) !== null) {
        if (match.index > lastIndex) segments.push({ type: 'text', content: text.slice(lastIndex, match.index), key: key++ })
        segments.push({ type: 'code', content: match[2], key: key++ })
        lastIndex = match.index + match[0].length
    }
    if (lastIndex < text.length) segments.push({ type: 'text', content: text.slice(lastIndex), key: key++ })

    return segments.map((segment) => {
        if (segment.type === 'code') {
            return (
                <pre key={segment.key} className={`my-2 overflow-x-auto rounded-lg p-3 text-xs ${darkMode ? 'bg-gray-950 text-gray-200' : 'bg-gray-900 text-gray-100'}`}>
                    <code>{segment.content.trim()}</code>
                </pre>
            )
        }
        return <span key={segment.key}>{renderInline(segment.content, segment.key)}</span>
    })
}

function ChatBubble({ message, darkMode }) {
    const isUser = message.role === 'user'
    return (
        <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-xl flex-shrink-0 mb-1">{isUser ? '👤' : '🤖'}</span>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow ${
                    isUser
                        ? darkMode ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-indigo-500 text-white rounded-br-sm'
                        : darkMode ? 'bg-gray-700 text-gray-100 rounded-bl-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
            >
                {renderMarkdownLite(message.content, darkMode)}
            </div>
        </div>
    )
}

function QaAssistantPage() {
    const { language } = useLanguage()
    const lang = language
    const [darkMode, setDarkMode] = useDarkModeState()
    const { session } = useAuth()
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: lang === 'tr'
                ? 'Merhaba! 👋 Ben LearnQA QA Asistanı. Selenium, Playwright, Java, Python, API testing, CI/CD gibi test otomasyonu konularında sorularını yanıtlayabilir, paylaştığın kodu inceleyebilirim. Nasıl yardımcı olabilirim?'
                : "Hi! 👋 I'm the LearnQA QA Assistant. I can help with Selenium, Playwright, Java, Python, API testing, CI/CD and other test automation topics, and review code you paste in. How can I help?",
        },
    ])
    const [input, setInput] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isSending])

    async function handleSend() {
        const trimmed = input.trim()
        if (!trimmed || isSending) return

        const nextMessages = [...messages, { role: 'user', content: trimmed }]
        setMessages(nextMessages)
        setInput('')
        setErrorMsg('')
        setIsSending(true)

        try {
            const { data, error } = await supabase.functions.invoke('qa-assistant', {
                body: { messages: nextMessages.map(({ role, content }) => ({ role, content })) },
            })
            if (error) throw error
            if (data?.error) throw new Error(data.error)

            setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
        } catch (error) {
            console.error('qa-assistant invoke failed:', error)
            setErrorMsg(
                lang === 'tr'
                    ? 'Asistan şu anda yanıt veremedi. Lütfen biraz sonra tekrar dene.'
                    : 'The assistant could not respond right now. Please try again shortly.'
            )
        } finally {
            setIsSending(false)
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-50'}`}>
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="container mx-auto max-w-3xl px-3 py-6 md:px-6 md:py-8">
                <div className="mb-6 text-center">
                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3 ${darkMode ? 'bg-purple-900/40 text-purple-200 border border-purple-700' : 'bg-purple-100 text-purple-700 border border-purple-300'}`}>
                        🤖 {lang === 'tr' ? 'QA Asistanı' : 'QA Assistant'}
                    </div>
                    <h1 className={`text-2xl md:text-3xl font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'tr' ? 'Test Otomasyonu Sorularını Sor' : 'Ask Your Test Automation Questions'}
                    </h1>
                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lang === 'tr'
                            ? 'Sadece Selenium, Playwright, Java, Python, API testing ve QA otomasyonu kapsamında — kod yapıştırabilirsin.'
                            : 'Scoped to Selenium, Playwright, Java, Python, API testing and QA automation — you can paste code.'}
                    </p>
                </div>

                <div className={`rounded-2xl border shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="space-y-4 p-4 md:p-5 min-h-[300px] max-h-[480px] overflow-y-auto">
                        {messages.map((m, i) => <ChatBubble key={i} message={m} darkMode={darkMode} />)}
                        {isSending && (
                            <div className="flex items-center gap-2 px-1">
                                <span className="text-xl">🤖</span>
                                <div className={`flex items-center gap-1.5 rounded-2xl px-4 py-2.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    {[0, 1, 2].map((i) => (
                                        <span key={i} className={`block h-2 w-2 rounded-full animate-pulse ${darkMode ? 'bg-purple-400' : 'bg-purple-500'}`} style={{ animationDelay: `${i * 0.15}s` }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {errorMsg && (
                            <p className="text-xs font-semibold text-red-400">{errorMsg}</p>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className={`border-t p-3 md:p-4 ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                        <div className="flex items-end gap-2">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                rows={2}
                                placeholder={lang === 'tr' ? 'Sorunu yaz veya kodunu yapıştır... (Enter ile gönder)' : 'Type your question or paste code... (Enter to send)'}
                                className={`flex-1 resize-none rounded-xl border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-900 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isSending || !input.trim()}
                                className="flex-shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 shadow-lg"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                            >
                                {lang === 'tr' ? 'Gönder' : 'Send'}
                            </button>
                        </div>
                        <p className={`mt-2 text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {lang === 'tr' ? `Giriş: ${session?.user?.email || ''}` : `Signed in as: ${session?.user?.email || ''}`}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default QaAssistantPage
