import TopicPage from './TopicPage'
import { pythonData } from '../data/pythonData'

function PythonPage() {
    return (
        <TopicPage
            data={pythonData}
            gradient="from-yellow-500 to-green-600"
            bgLight="bg-gradient-to-br from-yellow-50 via-green-50 to-emerald-50"
        />
    )
}

export default PythonPage
