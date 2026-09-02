import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SeoMeta from './components/SeoMeta'
import RequireAdmin from './components/RequireAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import AuthCallback from './components/AuthCallback'
import LoginPage from './components/LoginPage'
import ChatWidget from './components/ChatWidget'
import CommentsWidget from './components/CommentsWidget'
import MentorNudge from './components/MentorNudge'
import { recordSnapshot } from './lib/mentorSnapshots'
import { SECTION_ROUTE_PATHS } from './utils/sectionRoutes'

const HomePage = lazy(() => import('./components/HomePage'))
const JMeterPage = lazy(() => import('./components/JMeterPage'))
const SQLPage = lazy(() => import('./components/SQLPage'))
const TypeScriptPage = lazy(() => import('./components/TypeScriptPage'))
const JavaScriptPage = lazy(() => import('./components/JavaScriptPage'))
const PythonPage = lazy(() => import('./components/PythonPage'))
const TestFrameworksPage = lazy(() => import('./components/TestFrameworksPage'))
const PostmanPage = lazy(() => import('./components/PostmanPage'))
const ApiTestingPage = lazy(() => import('./components/ApiTestingPage'))
const QaFrontendPage = lazy(() => import('./components/QaFrontendPage'))
const BrunoPage = lazy(() => import('./components/BrunoPage'))
const JenkinsPage = lazy(() => import('./components/JenkinsPage'))
const DockerPage = lazy(() => import('./components/DockerPage'))
const RestAssuredPage = lazy(() => import('./components/RestAssuredPage'))
const KubernetesPage = lazy(() => import('./components/KubernetesPage'))
const KafkaPage = lazy(() => import('./components/KafkaPage'))
const AppiumPage = lazy(() => import('./components/AppiumPage'))
const PlaywrightPage = lazy(() => import('./components/PlaywrightPage'))
const CypressPage = lazy(() => import('./components/CypressPage'))
const SeleniumPage = lazy(() => import('./components/SeleniumPage'))
const GaugePage = lazy(() => import('./components/GaugePage'))
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
const BasitBackendPage = lazy(() => import('./components/BasitBackendPage'))
const QaShopSetupPage = lazy(() => import('./components/QaShopSetupPage'))
const QaShopPage = lazy(() => import('./components/QaShopPage'))
const QaShopSpecPage = lazy(() => import('./components/QaShopSpecPage'))
const QaShopBacklogPage = lazy(() => import('./components/QaShopBacklogPage'))
const QaShopApiPage = lazy(() => import('./components/QaShopApiPage'))
const LeaderboardPage = lazy(() => import('./components/LeaderboardPage'))
const VerifyCertificatePage = lazy(() => import('./components/VerifyCertificatePage'))
const QaAssistantPage = lazy(() => import('./components/QaAssistantPage'))
const ClaudeAiPage = lazy(() => import('./components/ClaudeAiPage'))
const LlmAgentsPage = lazy(() => import('./components/LlmAgentsPage'))
const SprintPage = lazy(() => import('./components/SprintPage'))
const PortfolioPage = lazy(() => import('./components/PortfolioPage'))
const TestAutomationPage = lazy(() => import('./components/TestAutomationPage'))
const JiraPage = lazy(() => import('./components/JiraPage'))
const QaShopDetailedGuidePage = lazy(() => import('./components/QaShopDetailedGuidePage'))

// Sekme-seviyesi URL'ler: /selenium/wait-strategies gibi her dikey sekmeye
// kendi adresi. Aynı sayfa bileşeni render edilir — sekme seçimini TopicPage
// `useParams().sectionSlug` üzerinden yapar. Böylece 30 ders sayfasının 412
// sekmesi tek URL'in arkasında kalmak yerine ayrı ayrı indekslenebilir hâle
// gelir ve kullanıcı doğrudan bir sekmeye link verebilir.
//
// Bu tablonun anahtarları `SECTION_ROUTE_PATHS` ile BİREBİR aynı olmalıdır;
// check-seo.mjs iki listenin ayrışmasını build'de hard-fail eder.
const SECTION_PAGE_ELEMENTS = {
    '/selenium': <SeleniumPage />,
    '/playwright': <PlaywrightPage />,
    '/cypress': <CypressPage />,
    '/python': <PythonPage />,
    '/typescript': <TypeScriptPage />,
    '/javascript': <JavaScriptPage />,
    '/sql': <SQLPage />,
    '/java': <JavaPage />,
    '/jmeter': <JMeterPage />,
    '/postman': <PostmanPage />,
    '/api-testing': <ApiTestingPage />,
    '/qa-frontend': <QaFrontendPage />,
    '/bruno': <BrunoPage />,
    '/rest-assured': <RestAssuredPage />,
    '/gauge': <GaugePage />,
    '/docker': <DockerPage />,
    '/jenkins': <JenkinsPage />,
    '/kubernetes': <KubernetesPage />,
    '/kafka': <KafkaPage />,
    '/appium': <AppiumPage />,
    '/browserstack': <BrowserStackPage />,
    '/git-github': <GitGithubPage />,
    '/linux': <LinuxPage />,
    '/aws': <AWSPage />,
    '/azure': <AzurePage />,
    '/what-is-testing': <WhatIsTestingPage />,
    '/advanced-algorithms': <AdvancedAlgorithmsPage />,
    '/basit-backend': <BasitBackendPage />,
    '/claude-ai': <ClaudeAiPage />,
    '/llm-agents': <LlmAgentsPage />,
    '/test-automation': <TestAutomationPage />,
    '/jira': <JiraPage />,
    '/security': <SecurityPage />,
}

function RouteFallback() {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin" aria-label="Loading" />
        </div>
    )
}

function App() {
    // Kişisel Mentor (öğrenme yazısı #5): kullanıcı hangi sayfaya inerse insin,
    // giriş başına günde bir kez zayıflık snapshot'ı al (gün başına idempotent,
    // veri yoksa no-op). Böylece "N gündür" sayımı HomePage'e uğramasa da ilerler.
    useEffect(() => { try { recordSnapshot() } catch { /* localStorage kapalı olabilir */ } }, [])

    // basename (/en) router tarafından zaten soyulur; burada çıplak yol görünür.
    const otomasyonHedefi = useLocation().pathname.replace(/\/+$/, '') === '/qa-shop'

    return (
        <>
            <SeoMeta />
            {/* /qa-shop bir OTOMASYON HEDEFİDİR. Site geneli sohbet ve yorum
                baloncukları orada üç ayrı zarar veriyordu: (1) locator kirliliği
                — dükkânın kendi düğmeleriyle karışan iki fazladan yüzen kontrol,
                (2) z-[999] ile dükkânın kendi katmanlarının ÜSTÜNE binip dar
                ekranda metni kapatmaları, (3) "hangisi uygulamaya ait?" sorusu.
                Sitenin geri kalanında aynen dururlar. */}
            {!otomasyonHedefi && <ChatWidget />}
            {!otomasyonHedefi && <CommentsWidget />}
            <MentorNudge />
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
                    <Route path="/api-testing" element={<ApiTestingPage />} />
                    <Route path="/qa-frontend" element={<QaFrontendPage />} />
                    <Route path="/bruno" element={<BrunoPage />} />
                    <Route path="/jenkins" element={<JenkinsPage />} />
                    <Route path="/docker" element={<DockerPage />} />
                    <Route path="/rest-assured" element={<RestAssuredPage />} />
                    <Route path="/kubernetes" element={<KubernetesPage />} />
                    <Route path="/kafka" element={<KafkaPage />} />
                    <Route path="/appium" element={<AppiumPage />} />
                    <Route path="/playwright" element={<PlaywrightPage />} />
                    <Route path="/cypress" element={<CypressPage />} />
                    <Route path="/selenium" element={<SeleniumPage />} />
                    <Route path="/gauge" element={<GaugePage />} />
                    <Route path="/aws" element={<AWSPage />} />
                    <Route path="/azure" element={<AzurePage />} />
                    <Route path="/browserstack" element={<BrowserStackPage />} />
                    <Route path="/git-github" element={<GitGithubPage />} />
                    <Route path="/linux" element={<LinuxPage />} />
                    <Route path="/java" element={<JavaPage />} />
                    <Route path="/java-document" element={<JavaDocPage />} />
                    <Route path="/git-document" element={<GitDocPage />} />
                    <Route path="/what-is-testing" element={<WhatIsTestingPage />} />
                    <Route path="/claude-ai" element={<ClaudeAiPage />} />
                    <Route path="/llm-agents" element={<LlmAgentsPage />} />
                    <Route path="/test-automation" element={<TestAutomationPage />} />
                    <Route path="/jira" element={<JiraPage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/manual-testing" element={<ManualTestingPage />} />
                    <Route path="/algorithms" element={<AlgorithmsPage />} />
                    <Route path="/advanced-algorithms" element={<AdvancedAlgorithmsPage />} />
                    <Route path="/qa-mentor" element={<QAMentorPage />} />
                    <Route path="/sprint" element={<SprintPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/backend" element={<RequireAdmin><BackendPage /></RequireAdmin>} />
                    {/* QA Shop pratik ortamının üç sayfası HERKESE AÇIK.
                        Sıra bilinçli: şartname (ne test edilecek) → kurulum
                        (nerede test edilecek) → dükkân (test hedefi).
                        Dükkân sayfası kullanıcının kendi makinesindeki API'ye
                        bağlanır; stack kapalıyken boş hata vermez, ne
                        yapılacağını söyleyip kurulum rehberine yönlendirir. */}
                    <Route path="/qa-shop-spec" element={<QaShopSpecPage />} />
                    <Route path="/qa-shop-backlog" element={<QaShopBacklogPage />} />
                    <Route path="/qa-shop-api" element={<QaShopApiPage />} />
                    <Route path="/qa-shop-setup" element={<QaShopSetupPage />} />
                    <Route path="/qa-shop" element={<QaShopPage />} />
                    <Route path="/qa-shop-detailed-guide" element={<RequireAdmin><QaShopDetailedGuidePage /></RequireAdmin>} />
                    <Route path="/basit-backend" element={<BasitBackendPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/verify-certificate/:id" element={<VerifyCertificatePage />} />
                    <Route path="/qa-assistant" element={<ProtectedRoute><QaAssistantPage /></ProtectedRoute>} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/login" element={<LoginPage />} />
                    {SECTION_ROUTE_PATHS.map((routePath) => (
                        <Route
                            key={routePath}
                            path={`${routePath}/:sectionSlug`}
                            element={SECTION_PAGE_ELEMENTS[routePath]}
                        />
                    ))}
                </Routes>
            </Suspense>
        </>
    )
}

export default App
