import TopicPage from './TopicPage'
import { kafkaData } from '../data/kafkaData'

function KafkaPage() {
    return (
        <TopicPage
            data={kafkaData}
            gradient="from-orange-500 to-red-600"
            bgLight="bg-gradient-to-br from-orange-50 via-red-50 to-amber-50"
        />
    )
}

export default KafkaPage
