import TopicPage from './TopicPage'
import { awsData } from '../data/awsData'

function AWSPage() {
    return (
        <TopicPage
            data={awsData}
            gradient="from-orange-500 to-yellow-600"
            bgLight="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50"
        />
    )
}

export default AWSPage
