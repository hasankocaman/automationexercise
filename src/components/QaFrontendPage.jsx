import TopicPage from './TopicPage'
import { qaFrontendData } from '../data/qaFrontendData'

// QA için Frontend — TopicPage sarmalayıcı (sol dikey sidebar, gaugeData/
// apiTestingData deseni). İçerik src/data/qaFrontendData.js'te.
function QaFrontendPage() {
  return (
    <TopicPage
      data={qaFrontendData}
      gradient="from-fuchsia-500 to-indigo-700"
      bgLight="bg-gradient-to-br from-fuchsia-50 via-purple-50 to-indigo-50"
    />
  )
}

export default QaFrontendPage
