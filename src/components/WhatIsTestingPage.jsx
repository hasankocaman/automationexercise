import TopicPage from './TopicPage'
import TooltipGuideMascot from './TooltipGuideMascot'
import { whatIsTestingData } from '../data/whatIsTestingData'

function WhatIsTestingPage() {
    return (
        <>
            <TopicPage
                data={whatIsTestingData}
                gradient="from-violet-600 to-fuchsia-600"
                bgLight="bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50"
                showQaMentorLink
            />
            <TooltipGuideMascot />
        </>
    )
}

export default WhatIsTestingPage
