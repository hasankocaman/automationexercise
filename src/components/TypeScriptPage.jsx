import TopicPage from './TopicPage'
import { typescriptData } from '../data/typescriptData'

function TypeScriptPage() {
    return (
        <TopicPage
            data={typescriptData}
            gradient="from-indigo-600 to-blue-700"
            bgLight="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"
        />
    )
}

export default TypeScriptPage
