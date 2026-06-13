import TopicPage from './TopicPage'
import { appiumData } from '../data/appiumData'

function AppiumPage() {
    return (
        <TopicPage
            data={appiumData}
            gradient="from-green-600 to-teal-700"
            bgLight="bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50"
        />
    )
}

export default AppiumPage
