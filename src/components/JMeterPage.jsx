import TopicPage from './TopicPage'
import { jmeterData } from '../data/jmeterData'

function JMeterPage() {
    return (
        <TopicPage
            data={jmeterData}
            gradient="from-orange-500 to-red-600"
            bgLight="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"
        />
    )
}

export default JMeterPage
