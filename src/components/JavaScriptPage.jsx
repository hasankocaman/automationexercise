import TopicPage from './TopicPage'
import { javascriptData } from '../data/javascriptData'

function JavaScriptPage() {
    return (
        <TopicPage
            data={javascriptData}
            gradient="from-yellow-500 to-amber-600"
            bgLight="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"
        />
    )
}

export default JavaScriptPage
