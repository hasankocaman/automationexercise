import TopicPage from './TopicPage'
import { playwrightData } from '../data/playwrightData'

function PlaywrightPage() {
    return (
        <TopicPage
            data={playwrightData}
            gradient="from-violet-600 to-purple-700"
            bgLight="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50"
        />
    )
}

export default PlaywrightPage
