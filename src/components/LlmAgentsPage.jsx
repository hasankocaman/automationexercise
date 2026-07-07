import TopicPage from './TopicPage'
import { llmAgentsData } from '../data/llmAgentsData'

// /llm-agents — LLM nedir, agent nedir, nasıl eğitilir; tester OpenAI API ile
// kendi agent'ını nasıl kurar. İçerik llmAgentsData.js'te; interaktif Token Lab
// bloğu TopicPage üzerinden 'token-lab' tipiyle render edilir (bkz. llmcreate.md).
function LlmAgentsPage() {
    return (
        <TopicPage
            data={llmAgentsData}
            gradient="from-violet-600 to-purple-800"
            bgLight="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50"
        />
    )
}

export default LlmAgentsPage
