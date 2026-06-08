import TopicPage from './TopicPage'
import { sqlData } from '../data/sqlData'

function SQLPage() {
    return (
        <TopicPage
            data={sqlData}
            gradient="from-blue-600 to-cyan-600"
            bgLight="bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50"
        />
    )
}

export default SQLPage
