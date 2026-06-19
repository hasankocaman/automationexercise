import TopicPage from './TopicPage'
import { linuxData } from '../data/linuxData'

function LinuxPage() {
    return (
        <TopicPage
            data={linuxData}
            gradient="from-slate-700 to-yellow-600"
            bgLight="bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-50"
        />
    )
}

export default LinuxPage
