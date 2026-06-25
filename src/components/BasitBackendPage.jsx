import TopicPage from './TopicPage'
import { basitBackendData } from '../data/basitBackendData'

function BasitBackendPage() {
    return (
        <TopicPage
            data={basitBackendData}
            gradient="from-emerald-600 to-slate-700"
            bgLight="bg-gradient-to-br from-slate-50 via-emerald-50 to-cyan-50"
        />
    )
}

export default BasitBackendPage
