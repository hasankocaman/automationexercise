import TopicPage from './TopicPage'
import { javaData } from '../data/javaData'

function JavaPage() {
    return (
        <TopicPage
            data={javaData}
            gradient="from-orange-600 to-amber-600"
            bgLight="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
        />
    )
}

export default JavaPage
