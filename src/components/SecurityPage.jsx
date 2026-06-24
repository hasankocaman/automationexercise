import React from 'react'
import TopicPage from './TopicPage'
import { securityData } from '../data/securityData'

function SecurityPage() {
    return (
        <TopicPage
            data={securityData}
            gradient="from-red-600 to-rose-700"
            bgLight="bg-gradient-to-br from-red-50 via-rose-50 to-orange-50"
        />
    )
}

export default SecurityPage
