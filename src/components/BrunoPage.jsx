import TopicPage from './TopicPage'
import { brunoData } from '../data/brunoData'

function BrunoPage() {
    return (
        <TopicPage
            data={brunoData}
            gradient="from-blue-500 to-indigo-700"
            bgLight="bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50"
        />
    )
}

export default BrunoPage
