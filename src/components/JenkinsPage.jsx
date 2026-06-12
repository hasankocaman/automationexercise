import TopicPage from './TopicPage'
import { jenkinsData } from '../data/jenkinsData'

function JenkinsPage() {
    return (
        <TopicPage
            data={jenkinsData}
            gradient="from-blue-600 to-slate-700"
            bgLight="bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50"
        />
    )
}

export default JenkinsPage
