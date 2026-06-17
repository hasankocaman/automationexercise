import TopicPage from './TopicPage'
import { cypressData } from '../data/cypressData'

function CypressPage() {
    return (
        <TopicPage
            data={cypressData}
            gradient="from-emerald-600 to-teal-700"
            bgLight="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
        />
    )
}

export default CypressPage
