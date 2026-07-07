import TopicPage from './TopicPage'
import { claudeAiData } from '../data/claudeAiData'

// /claude-ai — Bir tester Claude yapay zekayı junior'dan senior'a nasıl kullanır.
// İçerik claudeAiData.js'te; interaktif Prompt Lab bloğu TopicPage üzerinden
// 'claude-prompt-lab' tipiyle render edilir (bkz. claudesayfa.md).
function ClaudeAiPage() {
    return (
        <TopicPage
            data={claudeAiData}
            gradient="from-orange-500 to-amber-700"
            bgLight="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
        />
    )
}

export default ClaudeAiPage
