import TopicPage from './TopicPage'
import { browserstackData } from '../data/browserstackData'

function BrowserStackPage() {
    return (
        <TopicPage
            data={browserstackData}
            gradient="from-orange-500 to-red-600"
            bgLight="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"
        />
    )
}

export default BrowserStackPage
