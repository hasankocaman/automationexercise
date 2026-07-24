import TopicPage from './TopicPage'
import { apiTestingData } from '../data/apiTestingData'

// FAZ 1: minimal iskelet — TopicPage sarmalayıcı. İmza hero banner'ı (istek
// yaşam döngüsü pipeline + konsol simülatörü) sonraki fazda eklenir (bkz.
// PostmanPage/GaugePage deseni, Documents/api-testing-page-plan.md).
function ApiTestingPage() {
  return (
    <TopicPage
      data={apiTestingData}
      gradient="from-sky-500 to-indigo-700"
      bgLight="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50"
    />
  )
}

export default ApiTestingPage
