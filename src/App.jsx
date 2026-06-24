import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import SeoMeta from './components/SeoMeta'
import RequireAdmin from './components/RequireAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import AuthCallback from './components/AuthCallback'
import LoginPage from './components/LoginPage'
import ChatWidget from './components/ChatWidget'
import CommentsWidget from './components/CommentsWidget'

const HomePage = lazy(() => import('./components/HomePage'))
const JMeterPage = lazy(() => import('./components/JMeterPage'))
const SQLPage = lazy(() => import('./components/SQLPage'))
const TypeScriptPage = lazy(() => import('./components/TypeScriptPage'))
const JavaScriptPage = lazy(() => import('./components/JavaScriptPage'))
const PythonPage = lazy(() => import('./components/PythonPage'))
const TestFrameworksPage = lazy(() => import('./components/TestFrameworksPage'))
const PostmanPage = lazy(() => import('./components/PostmanPage'))
const JenkinsPage = lazy(() => import('./components/JenkinsPage'))
const DockerPage = lazy(() => import('./components/DockerPage'))
const RestAssuredPage = lazy(() => import('./components/RestAssuredPage'))
const KubernetesPage = lazy(() => import('./components/KubernetesPage'))
const KafkaPage = lazy(() => import('./components/KafkaPage'))
const AppiumPage = lazy(() => import('./components/AppiumPage'))
const PlaywrightPage = lazy(() => import('./components/PlaywrightPage'))
const CypressPage = lazy(() => import('./components/CypressPage'))
const SeleniumPage = lazy(() => import('./components/SeleniumPage'))
const AWSPage = lazy(() => import('./components/AWSPage'))
const AzurePage = lazy(() => import('./components/AzurePage'))
const BrowserStackPage = lazy(() => import('./components/BrowserStackPage'))
const GitGithubPage = lazy(() => import('./components/GitGithubPage'))
const LinuxPage = lazy(() => import('./components/LinuxPage'))
const JavaPage = lazy(() => import('./components/JavaPage'))
const JavaDocPage = lazy(() => import('./components/JavaDocPage'))
const GitDocPage = lazy(() => import('./components/GitDocPage'))
const WhatIsTestingPage = lazy(() => import('./components/WhatIsTestingPage'))
const SecurityPage = lazy(() => import('./components/SecurityPage'))
const ManualTestingPage = lazy(() => import('./components/ManualTestingPage'))
const AlgorithmsPage = lazy(() => import('./components/AlgorithmsPage'))
const AdvancedAlgorithmsPage = lazy(() => import('./components/AdvancedAlgorithmsPage'))
const QAMentorPage = lazy(() => import('./components/QAMentorPage'))
const BackendPage = lazy(() => import('./components/BackendPage'))
const LeaderboardPage = lazy(() => import('./components/LeaderboardPage'))
const VerifyCertificatePage = lazy(() => import('./components/VerifyCertificatePage'))
const QaAssistantPage = lazy(() => import('./components/QaAssistantPage'))

function RouteFallback() {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin" aria-label="Loading" />
        </div>
    )
}

function App() {
    return (
        <>
            <SeoMeta />
            <ChatWidget />
            <CommentsWidget />
            <Suspense fallback={<RouteFallback />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/jmeter" element={<JMeterPage />} />
                    <Route path="/sql" element={<SQLPage />} />
                    <Route path="/typescript" element={<TypeScriptPage />} />
                    <Route path="/javascript" element={<JavaScriptPage />} />
                    <Route path="/python" element={<PythonPage />} />
                    <Route path="/test-frameworks" element={<TestFrameworksPage />} />
                    <Route path="/postman" element={<PostmanPage />} />
                    <Route path="/jenkins" element={<JenkinsPage />} />
                    <Route path="/docker" element={<DockerPage />} />
                    <Route path="/rest-assured" element={<RestAssuredPage />} />
                    <Route path="/kubernetes" element={<KubernetesPage />} />
                    <Route path="/kafka" element={<KafkaPage />} />
                    <Route path="/appium" element={<AppiumPage />} />
                    <Route path="/playwright" element={<PlaywrightPage />} />
                    <Route path="/cypress" element={<CypressPage />} />
                    <Route path="/selenium" element={<SeleniumPage />} />
                    <Route path="/aws" element={<AWSPage />} />
                    <Route path="/azure" element={<AzurePage />} />
                    <Route path="/browserstack" element={<BrowserStackPage />} />
                    <Route path="/git-github" element={<GitGithubPage />} />
                    <Route path="/linux" element={<LinuxPage />} />
                    <Route path="/java" element={<JavaPage />} />
                    <Route path="/java-document" element={<JavaDocPage />} />
                    <Route path="/git-document" element={<GitDocPage />} />
                    <Route path="/what-is-testing" element={<WhatIsTestingPage />} />
                    <Route path="/security" element={<RequireAdmin><SecurityPage /></RequireAdmin>} />
                    <Route path="/manual-testing" element={<ManualTestingPage />} />
                    <Route path="/algorithms" element={<AlgorithmsPage />} />
                    <Route path="/advanced-algorithms" element={<AdvancedAlgorithmsPage />} />
                    <Route path="/qa-mentor" element={<QAMentorPage />} />
                    <Route path="/backend" element={<RequireAdmin><BackendPage /></RequireAdmin>} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/verify-certificate/:id" element={<VerifyCertificatePage />} />
                    <Route path="/qa-assistant" element={<ProtectedRoute><QaAssistantPage /></ProtectedRoute>} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default App
