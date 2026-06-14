import TopicPage from './TopicPage'
import { seleniumData } from '../data/seleniumData'

function SeleniumPage() {
    return (
        <TopicPage
            data={seleniumData}
            gradient="from-green-600 to-teal-700"
            bgLight="bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50"
        />
    )
}

export default SeleniumPage
