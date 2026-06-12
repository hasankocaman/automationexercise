import TopicPage from './TopicPage'
import { dockerData } from '../data/dockerData'

function DockerPage() {
    return (
        <TopicPage
            data={dockerData}
            gradient="from-cyan-500 to-blue-700"
            bgLight="bg-gradient-to-br from-cyan-50 via-blue-50 to-slate-50"
        />
    )
}

export default DockerPage
