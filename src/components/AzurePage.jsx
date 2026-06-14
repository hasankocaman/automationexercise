import TopicPage from './TopicPage'
import { azureData } from '../data/azureData'

function AzurePage() {
    return (
        <TopicPage
            data={azureData}
            gradient="from-blue-600 to-cyan-500"
            bgLight="bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50"
        />
    )
}

export default AzurePage
