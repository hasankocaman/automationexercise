import TopicPage from './TopicPage'
import { kubernetesData } from '../data/kubernetesData'

function KubernetesPage() {
    return (
        <TopicPage
            data={kubernetesData}
            gradient="from-indigo-600 to-violet-700"
            bgLight="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50"
        />
    )
}

export default KubernetesPage
