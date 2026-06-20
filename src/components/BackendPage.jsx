import TopicPage from './TopicPage'
import { backendData } from '../data/backendData'

function BackendPage() {
    return (
        <TopicPage
            data={backendData}
            gradient="from-emerald-600 to-cyan-600"
            bgLight="bg-gradient-to-br from-emerald-50 via-cyan-50 to-sky-50"
        />
    )
}

export default BackendPage
