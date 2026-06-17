export const SITE_URL = 'https://learnqa.dev'

export const DEFAULT_SEO = {
    path: '/',
    title: 'QA Learning Platform for Test Automation Engineers | LearnQA.dev',
    description: 'Learn Selenium, Playwright, Java, Python, SQL, API testing, DevOps and cloud tools with hands-on QA engineering lessons, quizzes and interview practice.',
}

export const ROUTE_SEO = [
    DEFAULT_SEO,
    {
        path: '/selenium',
        title: 'Selenium WebDriver Tutorial for QA Engineers | LearnQA.dev',
        description: 'Learn Selenium WebDriver with Java, Python and TypeScript examples, locator strategies, waits, frames, real-world automation scenarios and interview questions.',
    },
    {
        path: '/playwright',
        title: 'Playwright Tutorial for QA Automation | LearnQA.dev',
        description: 'Master Playwright for modern QA automation with TypeScript, Java and Python examples, auto-waiting, locators, API testing and real interview scenarios.',
    },
    {
        path: '/cypress',
        title: 'Cypress Tutorial for QA Automation Engineers | LearnQA.dev',
        description: 'Learn Cypress end-to-end testing with JavaScript/TypeScript examples, time-travel debugging, network stubbing, custom commands and interview questions.',
    },
    {
        path: '/python',
        title: 'Python for QA Engineers: Pytest, Selenium and Playwright | LearnQA.dev',
        description: 'Learn Python from the ground up for QA automation, including pytest, Selenium, Playwright, test data handling and Java-friendly explanations.',
    },
    {
        path: '/typescript',
        title: 'TypeScript for Playwright and Test Automation | LearnQA.dev',
        description: 'Learn TypeScript for QA engineers with type basics, advanced patterns, Playwright examples, quizzes and Java comparisons.',
    },
    {
        path: '/sql',
        title: 'SQL for QA Engineers with Interactive Practice | LearnQA.dev',
        description: 'Practice SQL for software testing with SELECT, JOIN, GROUP BY, window functions, data validation scenarios and interactive exercises.',
    },
    {
        path: '/java',
        title: 'Java for QA Automation Engineers | LearnQA.dev',
        description: 'Learn Java concepts for Selenium, Playwright, API testing and QA automation interviews with practical examples and hands-on exercises.',
    },
    {
        path: '/jmeter',
        title: 'JMeter Tutorial for Performance Testing | LearnQA.dev',
        description: 'Learn Apache JMeter for load testing with installation steps, test plans, assertions, reports, common errors and interview questions.',
    },
    {
        path: '/postman',
        title: 'Postman API Testing Tutorial for QA Engineers | LearnQA.dev',
        description: 'Learn Postman API testing with collections, environments, scripts, Newman, CI integration, troubleshooting and interview practice.',
    },
    {
        path: '/rest-assured',
        title: 'REST Assured Tutorial for Java API Testing | LearnQA.dev',
        description: 'Learn REST Assured for Java API automation with request chaining, assertions, serialization, authentication and CI-ready test design.',
    },
    {
        path: '/docker',
        title: 'Docker for QA Engineers and Test Automation | LearnQA.dev',
        description: 'Learn Docker for QA automation, test environments, Selenium Grid, containers, images, volumes, networks and CI workflows.',
    },
    {
        path: '/jenkins',
        title: 'Jenkins CI/CD for QA Automation | LearnQA.dev',
        description: 'Learn Jenkins pipelines for QA automation with build stages, test reports, Docker agents, parallel execution and troubleshooting.',
    },
    {
        path: '/kubernetes',
        title: 'Kubernetes for QA Engineers | LearnQA.dev',
        description: 'Learn Kubernetes basics for QA, including pods, deployments, services, kubectl, YAML manifests, test environments and common errors.',
    },
    {
        path: '/kafka',
        title: 'Kafka for QA Engineers and Test Automation | LearnQA.dev',
        description: 'Learn Apache Kafka for QA with producers, consumers, topics, partitions, Spring Boot testing scenarios and troubleshooting.',
    },
    {
        path: '/appium',
        title: 'Appium Mobile Testing Tutorial for QA Engineers | LearnQA.dev',
        description: 'Learn Appium mobile automation for Android and iOS with capabilities, locators, gestures, real devices, cloud testing and interviews.',
    },
    {
        path: '/browserstack',
        title: 'BrowserStack Tutorial for Cross-Browser Testing | LearnQA.dev',
        description: 'Learn BrowserStack for Selenium, Playwright and Appium cloud testing with capabilities, local testing, CI integration and debugging.',
    },
    {
        path: '/aws',
        title: 'AWS for QA Engineers and Test Automation | LearnQA.dev',
        description: 'Learn AWS services useful for QA automation, cloud test environments, CI pipelines, storage, monitoring and scalable test execution.',
    },
    {
        path: '/azure',
        title: 'Azure for QA Engineers and DevOps Testing | LearnQA.dev',
        description: 'Learn Azure DevOps and cloud services for QA automation, pipelines, test environments, storage, monitoring and CI/CD workflows.',
    },
    {
        path: '/test-frameworks',
        title: 'Pytest vs Selenium vs Playwright Comparison | LearnQA.dev',
        description: 'Compare pytest, Selenium and Playwright for QA automation with practical examples, strengths, trade-offs and migration guidance.',
    },
    {
        path: '/java-document',
        title: 'Java Reference Guide for QA Automation | LearnQA.dev',
        description: 'Explore a practical Java reference for QA automation engineers, including collections, OOP, exceptions, concurrency and testing patterns.',
    },
    {
        path: '/what-is-testing',
        title: 'Introduction to Software Testing & QA Fundamentals | LearnQA.dev',
        description: 'Learn software testing fundamentals, ISTQB testing principles, QA vs QC, SDET roles, and concrete examples of why testing is crucial in software development.',
    },
    {
        path: '/manual-testing',
        title: 'Manual Testing Tutorial with Interactive QA Practice | LearnQA.dev',
        description: 'Learn manual testing with visual QA examples, test cases, exploratory testing, bug reports, severity, regression practice and interactive exercises.',
    },
    {
        path: '/algorithms',
        title: 'Algorithms for Beginners Before Programming | LearnQA.dev',
        description: 'Learn algorithmic thinking before coding with simple recipes, input-output, decisions, loops, memory, debugging, flowcharts and visual games.',
    },
    {
        path: '/advanced-algorithms',
        title: 'Advanced Algorithms for QA Engineers | LearnQA.dev',
        description: 'Practice advanced QA algorithms with visual sorting, binary search, graph traversal, state machines and complexity labs for test automation.',
    },
]

export function getSeoForPath(pathname) {
    return ROUTE_SEO.find((item) => item.path === pathname) || DEFAULT_SEO
}

export function canonicalUrl(pathname) {
    const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
    return `${SITE_URL}${normalized}`
}
