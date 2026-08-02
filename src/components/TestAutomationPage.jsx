import TopicPage from './TopicPage'
import { testAutomationData } from '../data/testAutomationData'

function TestAutomationPage() {
    return (
        <TopicPage
            data={testAutomationData}
            gradient="from-indigo-600 to-blue-600"
            bgLight="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50"
            showQaMentorLink
        />
    )
}

export default TestAutomationPage
