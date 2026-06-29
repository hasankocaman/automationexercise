export const jenkinsData = {
  // ══════════════════════════════════════════════════════════════
  // ENGLISH VERSION
  // ══════════════════════════════════════════════════════════════
  en: {
    hero: {
      title: '🔧 Jenkins CI/CD',
      subtitle: 'Continuous Integration & Continuous Delivery',
      intro: 'Master Jenkins from zero to interview level. Automate your builds, run tests on every commit, integrate with JMeter/Selenium/Playwright, and deliver software faster and with confidence.',
    },
    tabs: ['🎯 Introduction', '⚙️ Installation', '🔁 Pipeline', '🧪 QA Integration', '🚀 Advanced', '🛠️ Real World', '🔗 Ecosystem', '💼 Interview Q&A'],
    sections: [
      // ── SECTION 0: INTRODUCTION ────────────────────────────────────────────
      {
        title: '🎯 What is Jenkins & CI/CD?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🤖',
            content: 'Jenkins is like a tireless robot assistant on your team. Every time a developer pushes code, Jenkins automatically builds it, runs all tests, and tells you if something broke — without anyone pressing a button. It works 24/7 and never forgets a single step.',
          },
          {
            type: 'text',
            content: 'In modern software development, dozens of developers push code multiple times a day. Without automation, someone has to manually build, test, and deploy — slow, error-prone, and expensive. Jenkins solves this with CI/CD (Continuous Integration / Continuous Delivery).',
          },
          { type: 'heading', text: 'Continuous Integration (CI)' },
          {
            type: 'text',
            content: 'CI means every code push triggers an automatic pipeline: build → test → report. The goal is to catch bugs within minutes of committing, not days later. If tests pass, the code is considered "integrated." If they fail, the developer is immediately notified.',
          },
          { type: 'heading', text: 'Continuous Delivery / Deployment (CD)' },
          {
            type: 'text',
            content: 'CD extends CI: after tests pass, code is automatically deployed to staging (Continuous Delivery — needs human approval for prod) or directly to production (Continuous Deployment — fully automatic). In QA, this means your test suite always runs against the latest code.',
          },
          {
            type: 'visual',
            variant: 'flow',
            title: 'CI/CD Pipeline Flow',
            steps: [
              { num: '1', label: 'Code Push', desc: 'Developer commits' },
              { num: '2', label: 'Build', desc: 'Compile / install deps' },
              { num: '3', label: 'Unit Tests', desc: 'Fast feedback' },
              { num: '4', label: 'Integration', desc: 'API + DB checks' },
              { num: '5', label: 'Staging Deploy', desc: 'Auto deploy' },
              { num: '6', label: 'E2E Tests', desc: 'Selenium/Playwright' },
              { num: '7', label: 'Prod Deploy', desc: 'Manual gate' },
            ],
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '🆓', label: 'Free & Open Source', desc: 'Apache License 2.0 — no licensing fees, ever.' },
              { icon: '🔌', label: '1800+ Plugins', desc: 'GitHub, Slack, Docker, Kubernetes, Allure, and more.' },
              { icon: '🌐', label: 'Distributed Builds', desc: 'Run tests across multiple agents in parallel.' },
              { icon: '📊', label: 'Rich Reporting', desc: 'Publish JUnit, HTML, Allure, Cobertura reports.' },
              { icon: '🔗', label: 'Any VCS', desc: 'Git, SVN, Mercurial — all version control systems.' },
              { icon: '🐳', label: 'Docker Native', desc: 'Run builds inside Docker containers for isolation.' },
            ],
          },
          { type: 'heading', text: 'Jenkins vs Alternatives' },
          {
            type: 'table',
            headers: ['Tool', 'Hosting', 'Free', 'Plugins', 'Learning Curve', 'Best For'],
            rows: [
              ['Jenkins', 'Self-hosted', '✅ Yes', '1800+', '⭐⭐⭐ High', 'Enterprise, custom pipelines'],
              ['GitHub Actions', 'Cloud', '✅ (limits)', '200+', '⭐ Low', 'GitHub-based projects'],
              ['GitLab CI', 'Cloud / Self', '✅ Yes', '100+', '⭐⭐ Medium', 'GitLab teams'],
              ['CircleCI', 'Cloud', '❌ Paid', '150+', '⭐ Low', 'Fast cloud CI'],
              ['TeamCity', 'Self / Cloud', '❌ Paid', '300+', '⭐⭐ Medium', 'JetBrains ecosystem'],
              ['Azure DevOps', 'Cloud', '❌ Paid', '800+', '⭐⭐ Medium', 'Microsoft/Azure shops'],
            ],
          },
          { type: 'heading', text: 'Real-World Use Cases for QA Engineers' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              'Run JMeter load tests automatically after every deployment',
              'Execute Selenium/Playwright regression suite on every pull request',
              'Run pytest API tests against staging environment after each build',
              'Generate and archive Allure/HTML reports for every test run',
              'Send Slack notifications when tests fail with links to reports',
              'Enforce code quality gates — block merge if test coverage drops',
              'Schedule nightly smoke tests on multiple browsers/environments',
            ],
          },
          {
            type: 'quiz',
            question: 'What does "Continuous Integration" primarily mean?',
            options: [
              { id: 'a', text: 'Deploying code to production automatically' },
              { id: 'b', text: 'Automatically building and testing code on every commit' },
              { id: 'c', text: 'Integrating with external APIs' },
              { id: 'd', text: 'Running tests manually every week' },
            ],
            correct: 'b',
            explanation: 'CI means every code commit triggers an automatic build + test cycle, catching bugs immediately. CD (Continuous Delivery/Deployment) handles the deployment part.',
          
        retryQuestion: {
      "question": "Which of the following best describes the purpose of 'Continuous Integration' in a DevOps workflow?",
      "options": [
            {
                  "id": "a",
                  "text": "Continuous deployment of services to the production environment"
            },
            {
                  "id": "b",
                  "text": "Merging development branches to a main repository and verifying them with automated tests"
            },
            {
                  "id": "c",
                  "text": "Using automated scripts to synchronize cloud database schemas"
            },
            {
                  "id": "d",
                  "text": "Manual approval processes for code review before merging"
            }
      ],
      "correct": "b",
      "explanation": "Continuous Integration focuses on the frequent integration of code changes into a shared repository, which are then validated by an automated build and test suite to detect integration errors early."
}
},
        ],
      },

      // ── SECTION 1: INSTALLATION ────────────────────────────────────────────
      {
        title: '⚙️ Jenkins Installation',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📦',
            content: 'Installing Jenkins is like setting up a dedicated workspace for your robot assistant. You set it up once, and it runs all your automation from that point forward. Three options: install on your OS, run via Docker (fastest), or use the cloud.',
          },
          { type: 'heading', text: 'Prerequisites' },
          {
            type: 'list',
            icon: '✅',
            items: [
              'Java 17 or Java 21 LTS — Jenkins is a Java application',
              'Minimum 1 GB RAM (2 GB+ recommended for real projects)',
              'At least 10 GB disk space for builds and artifacts',
              'Port 8080 available (Jenkins default port)',
            ],
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Check Java version',
            code: `java -version
# Expected output: openjdk version "17.0.9" 2023-10-17
# If not installed, download from: https://adoptium.net/`,
          },
          { type: 'heading', text: 'Option 1: Install on Windows' },
          {
            type: 'installation',
            steps: [
              {
                cmd: '# Step 1: Download Jenkins .msi installer',
                explanation: 'Go to jenkins.io → Download → LTS (Long Term Support) → Windows. Download the .msi file (e.g., jenkins-2.440.3.msi).',
              },
              {
                cmd: '# Step 2: Run the .msi installer as Administrator',
                explanation: 'Double-click the .msi file. The installer creates a Windows Service automatically. Default install: C:\\Program Files\\Jenkins\\',
              },
              {
                cmd: '# Step 3: Open browser → http://localhost:8080',
                explanation: 'Jenkins shows the "Getting Started" wizard on first launch.',
              },
              {
                cmd: 'type "C:\\ProgramData\\Jenkins\\.jenkins\\secrets\\initialAdminPassword"',
                explanation: 'Get the initial admin password from this file. Paste it into the Jenkins web setup.',
              },
              {
                cmd: '# Step 4: Install suggested plugins (2-5 min)',
                explanation: 'Click "Install suggested plugins". Wait for all plugins to install.',
              },
              {
                cmd: '# Step 5: Create admin user → Save and Finish',
                explanation: 'Fill username, password, email. Click "Save and Finish". Jenkins is ready!',
              },
            ],
          },
          { type: 'heading', text: 'Option 2: Install on Linux (Ubuntu/Debian)' },
          {
            type: 'installation',
            steps: [
              {
                cmd: 'sudo apt update && sudo apt install -y fontconfig openjdk-21-jre',
                explanation: 'Install Java 21 (required by Jenkins). fontconfig is needed for rendering reports.',
              },
              {
                cmd: 'sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key',
                explanation: 'Download and add the Jenkins GPG key for package verification.',
              },
              {
                cmd: 'echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list',
                explanation: 'Add the Jenkins repository to apt sources.',
              },
              {
                cmd: 'sudo apt update && sudo apt install -y jenkins',
                explanation: 'Install Jenkins from the official repository.',
              },
              {
                cmd: 'sudo systemctl start jenkins && sudo systemctl enable jenkins',
                explanation: 'Start Jenkins and enable it to auto-start on boot.',
              },
              {
                cmd: 'sudo cat /var/lib/jenkins/secrets/initialAdminPassword',
                explanation: 'Get the initial admin password for the web setup at http://localhost:8080.',
              },
            ],
          },
          { type: 'heading', text: 'Option 3: Run with Docker (Fastest — Recommended for Beginners)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Jenkins with Docker',
            code: `# Pull the official Jenkins LTS image
docker pull jenkins/jenkins:lts

# Run Jenkins container
docker run -d \\
  --name jenkins \\
  -p 8080:8080 \\                           # Web UI port
  -p 50000:50000 \\                         # Agent communication port
  -v jenkins_home:/var/jenkins_home \\      # Persist data between restarts
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Open in browser: http://localhost:8080`,
          },
          {
            type: 'tip',
            content: 'The Docker method is the fastest way to start. Data persists in the jenkins_home volume even if you restart. Perfect for learning and small teams.',
          },
          { type: 'heading', text: 'Essential Plugins to Install' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🔗', label: 'Git Plugin', desc: 'Connect to GitHub, GitLab, Bitbucket repositories.' },
              { icon: '🔁', label: 'Pipeline Plugin', desc: 'Write Jenkinsfile — the core of modern Jenkins.' },
              { icon: '📊', label: 'HTML Publisher', desc: 'Publish test reports (Allure, Extent Reports, etc.).' },
              { icon: '💬', label: 'Slack Notification', desc: 'Send build status to Slack channels.' },
              { icon: '🐳', label: 'Docker Pipeline', desc: 'Use Docker containers as build agents.' },
              { icon: '📧', label: 'Email Extension', desc: 'Send detailed HTML emails on build failure.' },
            ],
          },
          {
            type: 'quiz',
            question: 'What is the default port for Jenkins web interface?',
            options: [
              { id: 'a', text: '3000' },
              { id: 'b', text: '8080' },
              { id: 'c', text: '443' },
              { id: 'd', text: '9090' },
            ],
            correct: 'b',
            explanation: 'Jenkins runs on port 8080 by default. Port 50000 is for agent-to-controller communication. Both can be changed in Jenkins configuration.',
          
        retryQuestion: {
      "question": "If you are setting up a local Jenkins server, which port is traditionally accessed to reach the dashboard interface?",
      "options": [
            {
                  "id": "a",
                  "text": "80"
            },
            {
                  "id": "b",
                  "text": "8080"
            },
            {
                  "id": "c",
                  "text": "22"
            },
            {
                  "id": "d",
                  "text": "8443"
            }
      ],
      "correct": "b",
      "explanation": "By default, Jenkins is configured to listen on port 8080 for HTTP traffic. While this can be modified during installation or in the configuration file, 8080 is the standard port used."
    }
  },
  {
    type: 'visual',
    variant: 'boxes',
    title: { tr: 'Jenkins Dağıtık Derleme Mimarisi (Master-Agent)', en: 'Jenkins Distributed Build Architecture (Master-Agent)' },
    items: [
      { icon: '🖥️', label: { tr: 'Jenkins Controller (Master)', en: 'Jenkins Controller (Master)' }, desc: { tr: 'İşleri planlar, UI sunar ve konfigürasyonu yönetir.', en: 'Schedules builds, serves UI, and manages configuration.' }, highlight: true },
      { arrow: true },
      { icon: '🐳', label: { tr: 'Agent Node A (Chrome)', en: 'Agent Node A (Chrome)' }, desc: { tr: 'UI testlerini koşan izole test makinesi', en: 'Isolated agent running UI tests on Chrome' } },
      { icon: '🐳', label: { tr: 'Agent Node B (Firefox)', en: 'Agent Node B (Firefox)' }, desc: { tr: 'Paralel koşan Firefox test makinesi', en: 'Isolated agent running Firefox tests' } }
    ],
    note: { tr: 'Tüm testler ve derlemeler Controller üzerinde değil, Agent makineleri üzerinde koşturularak yük dağıtılır.', en: 'All heavy compilation and test execution runs on Agent nodes to prevent overloading the Controller.' }
  }
],
},

      // ── SECTION 2: PIPELINE ────────────────────────────────────────────────
      {
        title: '🔁 Jenkins Pipeline Basics',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏭',
            content: 'A Jenkins Pipeline is like a factory assembly line. Each "stage" is a workstation (Build, Test, Deploy). Items move through in order — if one station fails, the line stops and the team is alerted. You write this assembly line as code in a file called Jenkinsfile.',
          },
          { type: 'heading', text: 'Freestyle Job vs Declarative Pipeline' },
          {
            type: 'table',
            headers: ['Feature', 'Freestyle Job', 'Declarative Pipeline'],
            rows: [
              ['Configuration', 'GUI (click-through)', 'Code (Jenkinsfile in Git)'],
              ['Version Control', '❌ Not versioned', '✅ In Git with your code'],
              ['Complexity', 'Simple only', 'Complex, conditional logic'],
              ['Parallel Stages', '❌ No', '✅ Yes'],
              ['Code Review', '❌ No', '✅ Yes — PR review'],
              ['Recommended For', 'Quick experiments', 'All production use'],
            ],
          },
          { type: 'heading', text: 'Your First Jenkinsfile' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Minimal Declarative Pipeline',
            code: `pipeline {
    agent any               // Run on any available agent/node

    stages {
        stage('Build') {    // Stage 1: Build
            steps {
                echo 'Building the application...'
                sh 'npm install'   // Shell command (use bat on Windows)
            }
        }

        stage('Test') {     // Stage 2: Run tests
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Deploy') {   // Stage 3: Deploy
            steps {
                echo 'Deploying...'
                sh './scripts/deploy.sh'
            }
        }
    }

    post {                  // Actions AFTER the pipeline finishes
        always {
            echo 'Pipeline finished — clean up resources here'
        }
        success {
            echo '✅ Build succeeded!'
        }
        failure {
            echo '❌ Build failed! Notifying the team...'
        }
    }
}`,
            language: 'groovy',
          },
          {
            type: 'simulation',
            icon: '🔧',
            color: '#ef4444',
            title: { tr: 'CI/CD Pipeline — Canlı Simülasyon', en: 'CI/CD Pipeline — Live Simulation' },
            scenario: 'jenkins-pipeline-visual',
            description: {
              tr: '"▶ Build Başlat" butonuna bas: Checkout → Compile → Run QA Tests → Deploy aşamalarını bir fabrika üretim bandı gibi canlı izle. Paralel çalışan agent\'ları ve hata durumunda çıkan dumanları gözlemle.',
              en: 'Press "▶ Start Build": Watch Checkout → Compile → Run QA Tests → Deploy stages execute live like a factory conveyor belt. Observe parallel agents and smoke rising on failures.'
            },
            code: `// Jenkinsfile — Parallel QA Stages
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/org/repo.git'
            }
        }
        stage('Compile') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run QA Tests') {
            parallel {
                stage('UI Tests - Chrome') {
                    steps {
                        sh 'npx playwright test --project=chromium'
                    }
                }
                stage('UI Tests - Firefox') {
                    steps {
                        sh 'npx playwright test --project=firefox'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh './scripts/deploy-staging.sh'
            }
        }
    }
}`,
            language: 'groovy'
          },
          { type: 'heading', text: 'Environment Variables' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Using variables and credentials in Jenkinsfile',
            code: `pipeline {
    agent any

    environment {
        APP_ENV   = 'staging'              // Custom variable
        DB_CREDS  = credentials('db-id')  // Jenkins Credentials store (masked in logs)
        // Jenkins auto-creates: DB_CREDS_USR, DB_CREDS_PSW
    }

    stages {
        stage('Test') {
            steps {
                sh 'echo Running on \${APP_ENV}'
                sh 'pytest tests/ --env=\${APP_ENV}'

                // Built-in Jenkins variables:
                echo "Build:     \${env.BUILD_NUMBER}"
                echo "Job:       \${env.JOB_NAME}"
                echo "Branch:    \${env.GIT_BRANCH}"
                echo "Workspace: \${env.WORKSPACE}"
                echo "URL:       \${env.BUILD_URL}"
            }
        }
    }
}`,
          },
          { type: 'heading', text: 'Conditional Stages (when directive)' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Only deploy on main branch, require approval for prod',
            code: `pipeline {
    agent any

    stages {
        stage('Test') {
            steps { sh 'pytest tests/' }
        }

        stage('Deploy to Staging') {
            when { branch 'main' }       // Only on main branch
            steps { sh './deploy-staging.sh' }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
                environment name: 'AUTO_DEPLOY', value: 'false'
            }
            options {
                timeout(time: 1, unit: 'HOURS')  // Auto-abort if no response
            }
            steps {
                input message: 'Deploy to production?',
                      submitter: 'admin,qa-lead'   // Only these users can approve
                sh './deploy-prod.sh'
            }
        }
    }
}`,
          },
          {
            type: 'quiz',
            question: 'In a Declarative Pipeline, which keyword contains the shell commands to run inside a stage?',
            options: [
              { id: 'a', text: 'steps' },
              { id: 'b', text: 'commands' },
              { id: 'c', text: 'run' },
              { id: 'd', text: 'execute' },
            ],
            correct: 'a',
            explanation: 'The "steps" block inside a stage contains actual commands (sh, echo, git, etc.). Pipeline hierarchy: pipeline → stages → stage → steps.',
          
        retryQuestion: {
      "question": "In the Jenkins Declarative Pipeline syntax, what is the required block that wraps the specific shell commands or functions defined within a single stage?",
      "options": [
            {
                  "id": "a",
                  "text": "steps"
            },
            {
                  "id": "b",
                  "text": "actions"
            },
            {
                  "id": "c",
                  "text": "scripts"
            },
            {
                  "id": "d",
                  "text": "jobs"
            }
      ],
      "correct": "a",
      "explanation": "In Declarative Pipelines, the 'steps' directive is mandatory within a stage block to house the execution of various commands, such as 'sh' for shell scripts, 'echo', or plugin-specific tasks."
}
},
        ],
      },

      // ── SECTION 3: QA INTEGRATION ──────────────────────────────────────────
      {
        title: '🧪 QA Tool Integration',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧪',
            content: 'QA integration means Jenkins knows how to run your tests and publish beautiful reports. Every commit triggers your test suite. If something breaks, Jenkins sends a Slack message with a link to the failing test report — before anyone even notices something went wrong.',
          },
          { type: 'heading', text: 'Running pytest in Jenkins' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Complete pytest pipeline with HTML report + Slack',
            code: `pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                sh 'python3 -m venv venv'                                   // Create venv
                sh '. venv/bin/activate && pip install -r requirements.txt' // Install deps
            }
        }

        stage('API Tests') {
            steps {
                sh '''. venv/bin/activate && pytest tests/api/ \\
                    --html=reports/report.html \\   // HTML report
                    --self-contained-html \\        // Single-file report
                    -v \\                           // Verbose output
                    --tb=short \\                  // Short tracebacks
                    -n 4 \\                        // Parallel (pytest-xdist)
                    --junitxml=reports/junit.xml   // JUnit format for Jenkins
                '''
            }
        }
    }

    post {
        always {
            junit 'reports/junit.xml'              // Shows test trend graph in UI
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'report.html',
                reportName: 'pytest Report'
            ])
        }
        failure {
            slackSend(
                channel: '#qa-alerts',
                color: 'danger',
                message: "❌ FAILED: \${env.JOB_NAME} #\${env.BUILD_NUMBER} → \${env.BUILD_URL}"
            )
        }
    }
}`,
          },
          { type: 'heading', text: 'Running JMeter Load Tests in Jenkins' },
          {
            type: 'code',
            language: 'groovy',
            label: 'JMeter non-GUI mode with performance trend',
            code: `pipeline {
    agent any

    environment {
        JMETER_HOME = '/opt/jmeter'
        TEST_PLAN   = 'tests/load/api-load-test.jmx'
    }

    stages {
        stage('Load Test') {
            steps {
                sh """
                    \${JMETER_HOME}/bin/jmeter \\
                        -n \\                              // Non-GUI mode (NEVER use GUI in CI)
                        -t \${TEST_PLAN} \\                // Test plan (.jmx file)
                        -l results/results.jtl \\         // Raw results
                        -e \\                             // Generate HTML report
                        -o reports/jmeter/ \\             // HTML report output dir
                        -Jthreads=100 \\                  // Override: thread count
                        -Jrampup=60 \\                   // Override: ramp-up seconds
                        -Jduration=300                    // Override: test duration
                """
            }
        }
    }

    post {
        always {
            perfReport 'results/results.jtl'              // Performance Trend plugin
            publishHTML([
                reportDir: 'reports/jmeter',
                reportFiles: 'index.html',
                reportName: 'JMeter Load Report'
            ])
        }
    }
}`,
          },
          { type: 'heading', text: 'Running Playwright Tests in Jenkins (Best Practice)' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Playwright with official Docker image — no browser install needed',
            code: `pipeline {
    agent {
        docker {
            // Official Microsoft Playwright image — browsers pre-installed!
            image 'mcr.microsoft.com/playwright:v1.42.0-jammy'
            args  '-u root'   // Run as root inside container
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'   // Clean install (faster than npm install in CI)
            }
        }

        stage('E2E Tests') {
            steps {
                sh '''
                    npx playwright test \\
                        --reporter=html \\          // Playwright HTML report
                        --reporter=junit,outputFile=results/junit.xml \\
                        --output=test-results/      // Screenshots on failure
                '''
            }
        }
    }

    post {
        always {
            junit 'results/junit.xml'
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            archiveArtifacts artifacts: 'test-results/**/*.png',
                             allowEmptyArchive: true
        }
    }
}`,
          },
          { type: 'heading', text: 'Slack Notifications — Rich Format' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Rich Slack notifications with build details',
            code: `// Requires: Slack Notification Plugin + workspace configured in Jenkins settings
pipeline {
    agent any
    stages { /* ...your stages... */ }

    post {
        success {
            slackSend(
                channel: '#qa-results',
                color: 'good',   // green
                message: """
✅ *PASSED*: \${env.JOB_NAME} #\${env.BUILD_NUMBER}
Branch: \${env.GIT_BRANCH}
Duration: \${currentBuild.durationString}
Report: <\${env.BUILD_URL}pytest-Report|Click here>"""
            )
        }
        failure {
            slackSend(
                channel: '#qa-alerts',
                color: 'danger', // red
                message: """
❌ *FAILED*: \${env.JOB_NAME} #\${env.BUILD_NUMBER}
Branch: \${env.GIT_BRANCH} | Commit: \${env.GIT_COMMIT?.take(7)}
Logs: <\${env.BUILD_URL}console|Console Output>"""
            )
        }
        unstable {
            slackSend(
                channel: '#qa-results',
                color: 'warning', // yellow
                message: "⚠️ UNSTABLE: \${env.JOB_NAME} #\${env.BUILD_NUMBER} — some tests flaky"
            )
        }
    }
}`,
          },
          {
            type: 'quiz',
            question: 'In Jenkins post actions, which block should you use to ALWAYS publish test reports — even when the build fails?',
            options: [
              { id: 'a', text: 'post { success { ... } }' },
              { id: 'b', text: 'post { always { ... } }' },
              { id: 'c', text: 'post { failure { ... } }' },
              { id: 'd', text: 'stages { cleanup { ... } }' },
            ],
            correct: 'b',
            explanation: 'post { always {} } runs regardless of result — perfect for publishing reports and cleanup. If you put publishing only in success {}, you lose the report every time a test fails.',
          
        retryQuestion: {
      "type": "quiz",
      "question": "Which Jenkins post-build condition ensures that a specific cleanup script or notification block executes specifically when a build fails?",
      "options": [
            {
                  "id": "a",
                  "text": "post { changed { ... } }"
            },
            {
                  "id": "b",
                  "text": "post { cleanup { ... } }"
            },
            {
                  "id": "c",
                  "text": "post { failure { ... } }"
            },
            {
                  "id": "d",
                  "text": "post { success { ... } }"
            }
      ],
      "correct": "c",
      "explanation": "The 'failure' condition within the 'post' block is specifically designed to run only when the preceding stages result in a non-zero exit code or pipeline failure, making it ideal for error alerts."
    }
  },
  {
    type: 'interleaving-challenge',
    challenges: [
      {
        topic: 'Docker',
        questionTr: 'Bir test ortamını konteynerleştirirken, test raporlarının container kapandıktan sonra da makinenizde kalması için hangi yöntemi seçmelisiniz?',
        questionEn: 'When containerizing a test environment, which method should you choose to ensure test reports persist on your host machine after the container is destroyed?',
        optionsTr: [
          'docker exec komutunu kullanmak',
          'Host dizinini -v veya --volume ile container\'a mount etmek (Volume Bind Mount)',
          'ENV komutuyla ortam değişkeni tanımlamak',
          'Dockerfile içine EXPOSE 8080 eklemek'
        ],
        optionsEn: [
          'Using the docker exec command',
          'Mounting a host directory into the container using -v or --volume (Volume Bind Mount)',
          'Defining an environment variable with the ENV command',
          'Adding EXPOSE 8080 inside the Dockerfile'
        ],
        correct: 1,
        explanationTr: 'Volume bind mount sayesinde, container içindeki test raporları dizini host makinenizdeki bir klasöre yazılır ve container yok olsa bile raporlar kalıcı olur.',
        explanationEn: 'Using a volume bind mount allows the container to write test reports directly to a directory on the host machine, retaining them even after the container is destroyed.'
      },
      {
        topic: 'Jenkins',
        questionTr: 'Jenkinsfile\'da birden fazla QA test aşamasını (örneğin API ve UI testleri) paralel ve bağımsız agent\'lar üzerinde çalıştırmak için hangi direktif kullanılır?',
        questionEn: 'Which directive is used in a Jenkinsfile to run multiple QA test stages (e.g. API and UI tests) in parallel on independent agents?',
        optionsTr: [
          'stages',
          'parallel',
          'agent any',
          'post always'
        ],
        optionsEn: [
          'stages',
          'parallel',
          'agent any',
          'post always'
        ],
        correct: 1,
        explanationTr: 'parallel direktifi, altındaki stage\'leri eş zamanlı olarak farklı agent\'lar üzerinde paralel koşturarak build sürelerini kısaltır.',
        explanationEn: 'The parallel directive executes its child stages concurrently, potentially allocating them to different agents to decrease total build execution time.'
      },
      {
        topic: 'Kubernetes',
        questionTr: 'Kubernetes\'te bir Pod çöktüğünde (CrashLoopBackOff durumuna geldiğinde), Kubernetes\'in bu pod\'u otomatik olarak yeniden başlatmasına ne ad verilir?',
        questionEn: 'When a Pod crashes in Kubernetes (enters CrashLoopBackOff), what is the term for Kubernetes automatically restarting/replacing it?',
        optionsTr: [
          'Self-healing (Kendi kendini iyileştirme)',
          'Port Forwarding (Port yönlendirme)',
          'Horizontal Pod Autoscaling (Yatay ölçekleme)',
          'Rolling Update (Kesintisiz güncelleme)'
        ],
        optionsEn: [
          'Self-healing',
          'Port Forwarding',
          'Horizontal Pod Autoscaling',
          'Rolling Update'
        ],
        correct: 0,
        explanationTr: 'Self-healing (Kendi kendini iyileştirme), Kubernetes\'in istenen durum (desired state) ile mevcut durumu (current state) eşitlemek için çöken pod\'u otomatik olarak silip yenisini ayağa kaldırmasıdır.',
        explanationEn: 'Self-healing is a core Kubernetes capability where the controller manager detects a failed pod and automatically restarts or replaces it to maintain the desired replica count.'
      }
    ]
  },
  {
    type: 'visual',
    variant: 'flow',
    title: { tr: 'QA Otomasyon Pipeline Akışı', en: 'QA Automation Pipeline Flow' },
    steps: [
      { num: '1', label: { tr: 'Kod Değişikliği', en: 'Code Commit' }, desc: { tr: 'Geliştirici veya QA test kodunu GitHub\'a gönderir.', en: 'Developer or QA pushes code to Git repository.' } },
      { num: '2', label: { tr: 'Webhook Tetikleyici', en: 'Webhook Trigger' }, desc: { tr: 'GitHub webhook üzerinden Jenkins\'e otomatik bildirim gönderilir.', en: 'GitHub Webhook notifies Jenkins to start a new build.' } },
      { num: '3', label: { tr: 'Test Koşumu', en: 'Test Execution' }, desc: { tr: 'Jenkins agent üzerinde Playwright veya Selenium testleri başlatılır.', en: 'Runs Playwright/pytest/Newman tests on the build agent.' } },
      { num: '4', label: { tr: 'Rapor Arşivleme', en: 'Report Archiving' }, desc: { tr: 'JUnit XML veya HTML test raporları Jenkins master\'a yüklenir.', en: 'Uploads and stores HTML/Allure test reports on Master.' } },
      { num: '5', label: { tr: 'Slack / E-posta Bildirimi', en: 'Slack Notification' }, desc: { tr: 'Test başarısız olursa post-build ile Slack kanalına anında alarm gönderilir.', en: 'Sends instant Slack alert if any automation test fails.' } }
    ]
  }
],
},

      // ── SECTION 4: ADVANCED ────────────────────────────────────────────────
      {
        title: '🚀 Advanced Jenkins',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⚡',
            content: 'Advanced Jenkins means faster, smarter, more reliable pipelines. Run 500 tests in 10 minutes instead of 2 hours with parallelism, use Docker for perfect test isolation, trigger builds automatically from GitHub webhooks, and handle flaky tests gracefully.',
          },
          { type: 'heading', text: 'Parallel Test Execution' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Run cross-browser tests simultaneously',
            code: `pipeline {
    agent any

    stages {
        stage('Cross-Browser Tests') {
            parallel {
                stage('Chrome') {
                    steps {
                        sh 'pytest tests/ --browser=chrome --junitxml=reports/chrome.xml'
                    }
                    post { always { junit 'reports/chrome.xml' } }
                }
                stage('Firefox') {
                    steps {
                        sh 'pytest tests/ --browser=firefox --junitxml=reports/firefox.xml'
                    }
                    post { always { junit 'reports/firefox.xml' } }
                }
                stage('Safari') {
                    agent { label 'mac-agent' }   // Must run on Mac agent
                    steps {
                        sh 'pytest tests/ --browser=webkit --junitxml=reports/safari.xml'
                    }
                    post { always { junit 'reports/safari.xml' } }
                }
            }
        }
    }
}
// Result: 3 browsers test simultaneously — 3x faster!`,
          },
          { type: 'heading', text: 'Docker as Build Agent' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Each stage in its own isolated Docker container',
            code: `pipeline {
    agent none   // No global agent — each stage declares its own

    stages {
        stage('Python API Tests') {
            agent {
                docker {
                    image 'python:3.12-slim'
                    args  '-v /tmp:/tmp'
                }
            }
            steps {
                sh 'pip install pytest requests'
                sh 'pytest tests/api/'
            }
        }

        stage('Playwright E2E Tests') {
            agent {
                docker { image 'mcr.microsoft.com/playwright:v1.42.0-jammy' }
            }
            steps {
                sh 'npm ci && npx playwright test'
            }
        }
    }
}
// No need to install Python or Node.js on the Jenkins server!
// Each container is isolated — no dependency conflicts.`,
          },
          { type: 'heading', text: 'GitHub Webhook — Auto-Trigger on Push' },
          {
            type: 'steps',
            items: [
              'In Jenkins: Job → Configure → Build Triggers → check "GitHub hook trigger for GITScm polling"',
              'In GitHub: Repository → Settings → Webhooks → Add webhook',
              'Set Payload URL: http://YOUR_JENKINS_URL/github-webhook/',
              'Set Content type: application/json',
              'Select "Just the push event" (add "Pull requests" for PR builds)',
              'Click "Add webhook" — GitHub sends a test ping; verify it shows green ✅',
            ],
          },
          { type: 'heading', text: 'Real-World Scenarios & Solutions' },
          {
            type: 'error-dictionary',
            framework: 'Jenkins',
            errors: [
              {
                error: 'Selenium tests pass locally but fail in Jenkins',
                fullMessage: 'org.openqa.selenium.WebDriverException: unknown error: Chrome failed to start',
                cause: {
                  en: 'Jenkins runs on a headless Linux server with no display. Chrome/Firefox try to open a visible window — there\'s no display server (no DISPLAY env var). Also missing: --no-sandbox flag needed inside containers.',
                },
                solution: {
                  en: '1) Add --headless mode to browser options. 2) Add --no-sandbox and --disable-dev-shm-usage flags. 3) Best solution: use the official Playwright or Selenium Docker image where everything is pre-configured.',
                },
                codeWrong: `# ❌ Fails in Jenkins — tries to open a visible window
from selenium import webdriver
driver = webdriver.Chrome()  # No display in CI server!`,
                codeFixed: `# ✅ Works in Jenkins — headless mode
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

opts = Options()
opts.add_argument('--headless')              # No GUI needed
opts.add_argument('--no-sandbox')            # Required in Docker/CI
opts.add_argument('--disable-dev-shm-usage') # Prevent /dev/shm memory issues
opts.add_argument('--window-size=1920,1080') # Set viewport size

driver = webdriver.Chrome(options=opts)
driver.get('https://example.com')`,
              },
              {
                error: 'Flaky tests randomly breaking the pipeline',
                fullMessage: 'Build #45 FAILED — 1 test failed. Build #46 PASSED — same code, same test.',
                cause: {
                  en: 'Flaky test: passes sometimes, fails other times with identical code. Causes: timing/wait issues, test order dependency, race conditions, external service instability, or environment randomness.',
                },
                solution: {
                  en: '1) Add pytest-rerunfailures for automatic retry. 2) Isolate known flaky tests into a separate stage with "unstable" instead of "failure" status. 3) Never let a known flaky test block production deployments.',
                },
                codeWrong: `# ❌ One flaky test breaks the entire pipeline
sh 'pytest tests/'  // No retry — first failure = red build`,
                codeFixed: `# ✅ With automatic retry — flaky tests get 3 chances
sh 'pytest tests/ --reruns 3 --reruns-delay 2'

# Better: isolate in Jenkinsfile
stage('Flaky Tests') {
    steps {
        sh 'pytest tests/ -m flaky --reruns 3'
    }
    post {
        failure { unstable('Flaky tests failed after retries') }
    }
}`,
              },
              {
                error: 'Pipeline stuck waiting for executor',
                fullMessage: 'Still waiting to schedule task — waiting for next available executor.',
                cause: {
                  en: 'All Jenkins executors are busy, the agent with the required label is offline, or an input() step is waiting indefinitely for human approval.',
                },
                solution: {
                  en: '1) Increase executor count on agents (Jenkins admin). 2) Check agent label in pipeline matches an online agent. 3) Always add timeout() to input steps. 4) Use Docker agents to avoid executor starvation.',
                },
                codeWrong: `stage('Approve') {
    steps {
        input 'Deploy to production?'
        // ❌ Hangs forever if no one responds
    }
}`,
                codeFixed: `stage('Approve') {
    options {
        timeout(time: 2, unit: 'HOURS')  // ✅ Auto-abort after 2 hours
    }
    steps {
        input message: 'Deploy to production?',
              submitter: 'admin,qa-lead'  // Restrict who can approve
    }
}`,
              },
            ],
          },
          {
            type: 'quiz',
            question: 'How do you run multiple Jenkins stages SIMULTANEOUSLY?',
            options: [
              { id: 'a', text: 'Add "concurrent: true" to each stage' },
              { id: 'b', text: 'Use "parallel { stage(...) }" inside a parent stage' },
              { id: 'c', text: 'Create multiple separate Jenkinsfiles' },
              { id: 'd', text: 'Use "async: true" in the pipeline block' },
            ],
            correct: 'b',
            explanation: 'The "parallel { }" directive inside a stage runs nested stages simultaneously. This is how you test Chrome, Firefox, and Safari at the same time — cutting total time by 3x.',
          
        retryQuestion: {
      "type": "quiz",
      "question": "In a declarative Jenkins pipeline, which syntax is required to execute independent tasks in parallel to improve build performance?",
      "options": [
            {
                  "id": "a",
                  "text": "Using the 'parallel' keyword inside a 'stage' block"
            },
            {
                  "id": "b",
                  "text": "Setting 'parallel: true' in the agent directive"
            },
            {
                  "id": "c",
                  "text": "Defining multiple pipeline blocks"
            },
            {
                  "id": "d",
                  "text": "Wrapping stages in a 'distributed' block"
            }
      ],
      "correct": "a",
      "explanation": "To achieve parallel execution in a declarative pipeline, you use the 'parallel' directive inside a stage. This allows multiple steps or stages to run on different executors at the same time."
    }
  },
  {
    type: 'simulation',
    icon: '🔧',
    color: '#ef4444',
    title: { tr: 'CI/CD Pipeline — Canlı Simülasyon', en: 'CI/CD Pipeline — Live Simulation' },
    scenario: 'jenkins-pipeline',
    description: {
      tr: '"▶ Build Başlat" butonuna bas: Checkout → Build → Test → SonarQube → Deploy aşamalarını canlı izle. Her stage tamamlanınca Jenkinsfile\'da yeşile döner.',
      en: 'Press "▶ Start Build": watch Checkout → Build → Test → SonarQube → Deploy stages execute live. Each stage turns green in the Jenkinsfile on the right as it completes.',
    },
    code: `// Jenkinsfile — Declarative Pipeline
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { git branch: 'main', url: 'https://github.com/org/repo.git' }
        }
        stage('Build') {
            steps { sh 'mvn clean package -DskipTests' }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
                junit '**/target/surefire-reports/*.xml'
            }
        }
        stage('SonarQube') {
            steps {
                withSonarQubeEnv('SonarCloud') { sh 'mvn sonar:sonar' }
                waitForQualityGate abortPipeline: true
            }
        }
        stage('Deploy') {
            when { branch 'main' }
            steps { sh './scripts/deploy-staging.sh' }
        }
    }
}`,
    language: 'groovy'
  }
],
},

      // ── SECTION 5: REAL WORLD ───────────────────────────────────────────────
      {
        title: '🛠️ Real World Usage',
        blocks: [
          { type: 'simple-box', emoji: '🛠️', content: "Jenkins is like a factory assembly-line foreman — the moment a new part (commit) arrives, the foreman automatically routes it through inspection (build), quality control (tests), and packaging (deploy), without anyone needing to push it by hand." },
          { type: 'heading', text: 'What Need Does This Fill? Life Without Jenkins' },
          { type: 'text', content: "Without a CI/CD server, every build and test run is a manual ritual: a developer pulls the latest code, runs the build locally, runs the test suite locally (if they remember to), and only then merges. Bugs slip through because 'it worked on my machine' is unverifiable, and nobody runs the full regression suite before every merge because it takes too long to do by hand. Jenkins automates this so every single commit gets built and tested the same way, every time, with no human skipping a step under deadline pressure." },
          { type: 'heading', text: 'Real-World Scenario: Spring Boot + React Monorepo' },
          { type: 'text', content: "A team ships a Spring Boot backend and a React frontend from the same monorepo. The QA lead is asked: 'Set up a pipeline so that every pull request is automatically built, tested, and a preview environment is available for manual review — before any human merges it.'" },
          {
            type: 'steps',
            items: [
              'Create a Jenkinsfile in the repo root with stages: Checkout → Backend Build (Maven) → Frontend Build (npm) → Unit Tests (JUnit + Jest, run in parallel) → Selenium E2E (against a docker-compose stack) → SonarQube scan → Deploy to preview',
              'Configure a GitHub webhook so Jenkins triggers automatically on every PR open/update — no manual "Build Now" click needed',
              'Use the parallel { } directive to run backend and frontend unit tests simultaneously, cutting pipeline time from 12 minutes to 5',
              'Add a Selenium stage that spins up the full stack via docker-compose, runs the E2E suite against it, and tears it down — catching integration bugs unit tests cannot see',
              'Publish JUnit XML + Allure HTML report as build artifacts so any reviewer can click into exactly which test failed and why',
              'Configure the PR status check: Jenkins reports pending/success/failure directly on the GitHub PR, blocking the merge button until the pipeline is green',
              'First real catch: a frontend change broke an API contract the backend test suite didn\'t check — the E2E stage failed, the PR was blocked, and the bug never reached main',
            ]
          },
          { type: 'heading', text: 'Comparing Jenkins to Alternatives — Real-World Trade-offs' },
          {
            type: 'table',
            headers: ['Tool', 'Advantages ✅', 'Disadvantages ❌', 'Choose it when...'],
            rows: [
              ['Jenkins', 'Free, self-hosted (full control), 1800+ plugins, works with any language/stack', 'You manage the server (upgrades, security patches), Groovy DSL has a learning curve', 'Your org needs on-prem/self-hosted CI, complex custom pipelines, or has a huge legacy plugin ecosystem already in place'],
              ['GitHub Actions', 'Zero infrastructure to manage, lives next to the code, huge marketplace of pre-built actions', 'Vendor lock-in to GitHub, can get expensive at high build volume', 'Your repo already lives on GitHub and you want the fastest path to CI with no server maintenance'],
              ['GitLab CI', 'Built into GitLab, excellent built-in Docker registry and Kubernetes integration', 'Best experience requires using GitLab end-to-end', 'Your org is already standardized on GitLab for source control and wants one unified tool'],
            ]
          },
          { type: 'heading', text: 'Real-World Integration Flow' },
          {
            type: 'visual', variant: 'flow',
            title: 'How a Jenkins Pipeline Actually Reaches a Merge Decision',
            steps: [
              { num: '1', label: 'Dev opens PR', desc: 'git push origin feature-branch' },
              { num: '2', label: 'Webhook fires', desc: 'GitHub notifies Jenkins instantly', highlight: true },
              { num: '3', label: 'Pipeline runs', desc: 'Build → Test → Selenium E2E → Scan' },
              { num: '4', label: 'Status posted', desc: 'Green check or red X on the PR' },
              { num: '5', label: 'Reviewer decides', desc: 'Merge button only enabled if green', highlight: true },
              { num: '6', label: 'Deploy stage', desc: 'On merge to main: auto-deploy to staging' },
            ],
            note: 'No human ever runs the test suite by hand — the pipeline is the gatekeeper for every single merge.',
          },
          { type: 'heading', text: 'Hands-On Mini Project — Try It Yourself' },
          { type: 'text', content: 'Paste this into a Jenkinsfile in any small repo with a package.json to see a real multi-stage pipeline run.' },
          {
            type: 'code', code: `pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { sh 'npm install' }
        }
        stage('Test') {
            steps { sh 'npm test -- --reporters=default --reporters=jest-junit' }
        }
        stage('Build') {
            steps { sh 'npm run build' }
        }
    }
    post {
        always {
            junit 'junit.xml'
        }
    }
}
// Push this file, create a Jenkins Pipeline job pointing at the repo,
// click "Build Now" — watch each stage light up green/red in real time.`
          },
          {
            type: 'quiz',
            question: 'An organization needs self-hosted CI with full control and complex custom pipelines, and already has a large legacy plugin ecosystem. Which tool fits best, and why?',
            options: [
              { id: 'a', text: 'GitHub Actions, because it requires zero infrastructure management' },
              { id: 'b', text: 'Jenkins, because it is free, self-hosted with full control, and has 1800+ plugins for any language/stack' },
              { id: 'c', text: 'Neither — manual deployment scripts are always simpler' },
              { id: 'd', text: 'GitLab CI, because it only works with GitHub repos' },
            ],
            correct: 'b',
            explanation: "Jenkins is the right fit precisely when an org needs to run CI on their own infrastructure (on-prem/self-hosted), wants full control over the pipeline, and already depends on its enormous plugin ecosystem. GitHub Actions trades that control for zero infrastructure management and tight GitHub integration, which is great for repos already living on GitHub but introduces vendor lock-in and can get expensive at high build volume — the right tool depends on the org's hosting and ecosystem constraints, not raw popularity.",
            retryQuestion: {
              question: 'A startup with no existing infrastructure team, a repo already on GitHub, and a desire to minimize ops overhead is choosing a CI tool. Which factor most strongly favors GitHub Actions over Jenkins here?',
              options: [
                { id: 'a', text: 'GitHub Actions has more plugins than Jenkins' },
                { id: 'b', text: 'Zero infrastructure to provision or maintain — no one has to run, patch, or scale a Jenkins server' },
                { id: 'c', text: 'GitHub Actions is always free regardless of usage' },
                { id: 'd', text: 'Jenkins cannot integrate with GitHub at all' },
              ],
              correct: 'b',
              explanation: "For a small team with no dedicated infrastructure/ops capacity, the biggest practical cost of Jenkins isn't the tool itself — it's running, patching, and scaling the Jenkins server (and its agents) over time. GitHub Actions removes that entire category of work since GitHub manages the runners, which matters far more for this specific team than Jenkins' larger plugin ecosystem (which this team likely won't need to its full extent anyway).",
            },
          },
        ],
      },

      // ── SECTION 6: ECOSYSTEM ────────────────────────────────────────────────
      {
        title: '🔗 Ecosystem',
        blocks: [
          { type: 'simple-box', emoji: '🔗', content: "Jenkins on its own is like a conductor with no orchestra — it knows when to start the music, but it needs Docker to provide the instruments (consistent environments), Git to provide the sheet music (the source of truth), and Slack to tell the audience how the performance went." },
          { type: 'heading', text: 'How Jenkins Fits Into the Bigger Picture' },
          { type: 'text', content: 'On its own, Jenkins is an orchestrator — it does not build, test, or deploy anything itself, it calls out to other tools to do that work on a trigger. Its real value comes from being wired into a version control system that triggers it, a container runtime that gives every build a clean reproducible environment, a code quality scanner that gates merges on more than just "tests passed," and a notification system that closes the loop back to humans.' },
          {
            type: 'visual', variant: 'boxes',
            title: 'Jenkins Ecosystem — Who Talks to Whom',
            items: [
              { icon: '🐙', label: 'Git / GitHub', desc: 'webhook triggers Jenkins on push/PR' },
              { arrow: true },
              { icon: '🔧', label: 'Jenkins', desc: 'orchestrates the pipeline stages' },
              { arrow: true },
              { icon: '🐳', label: 'Docker', desc: 'provides clean, reproducible build agents', highlight: true },
              { arrow: true },
              { icon: '🔍', label: 'SonarQube', desc: 'gates merges on code quality/coverage' },
              { arrow: true },
              { icon: '💬', label: 'Slack / Email', desc: 'notifies the team of pass/fail', highlight: true },
            ],
            note: 'Each tool does one job well — Git triggers, Jenkins orchestrates, Docker isolates, SonarQube gates, Slack notifies.',
          },
          { type: 'heading', text: 'Three Key Relationships' },
          {
            type: 'table',
            headers: ['Relationship', 'How They Work Together', 'What Problem It Solves'],
            rows: [
              ['Jenkins ↔ Git/GitHub', 'A webhook fires on every push/PR, triggering the pipeline automatically with zero manual clicks', 'Removes the human bottleneck — nobody can forget to run the tests before merging'],
              ['Jenkins ↔ Docker', 'Each pipeline run spins up fresh containers as build agents, guaranteeing the same Node/Java/Python version every time', 'Eliminates "works on my machine" — the CI environment is identical for every single build'],
              ['Jenkins ↔ Kubernetes', 'Jenkins can deploy the built Docker image directly to a K8s cluster as the final pipeline stage (kubectl apply)', 'Connects "code merged" to "code running in staging/production" without a manual deploy step'],
              ['Jenkins ↔ SonarQube', 'A pipeline stage runs a SonarQube scan and the Quality Gate decides pass/fail before allowing merge', 'Blocks not just broken code but code with new vulnerabilities, duplication, or dropping test coverage'],
            ]
          },
          { type: 'heading', text: 'Where Jenkins Sits Next to Other QA/DevOps Tools' },
          { type: 'text', content: 'In a typical pipeline: Git triggers Jenkins → Jenkins spins up a Docker container to build the app → runs unit tests, then Selenium/Playwright E2E tests inside another container → SonarQube scans for quality gates → on success, Jenkins pushes the image to a registry and triggers a Kubernetes deploy → Slack announces the result. QA engineers most often touch Jenkins when adding or debugging the test stages of this pipeline.' },
          {
            type: 'quiz',
            question: 'What is the core benefit of Jenkins spinning up a fresh Docker container as the build agent for every single pipeline run?',
            options: [
              { id: 'a', text: 'It makes the pipeline YAML shorter' },
              { id: 'b', text: 'It guarantees the exact same Node/Java/Python version every time, eliminating "works on my machine" CI failures' },
              { id: 'c', text: 'It removes the need for a Jenkinsfile' },
              { id: 'd', text: 'It automatically deploys to production' },
            ],
            correct: 'b',
            explanation: 'Without fresh containers, a Jenkins agent\'s installed tool versions can drift over time (a plugin update, a manually-installed dependency, an OS patch) — causing a build to pass on one run and mysteriously fail on another with no code change. Spinning up a fresh Docker container pinned to a specific image guarantees every single build starts from byte-identical tooling, the same root cause class that "works on my machine" describes for developer laptops.',
            retryQuestion: {
              question: 'A Jenkins pipeline pins its build container to `maven:3.9.6-eclipse-temurin-17` rather than just `maven:latest`. Why does pinning the exact tag matter?',
              options: [
                { id: 'a', text: 'It makes the build run faster' },
                { id: 'b', text: '`maven:latest` can silently point to a different, newer image over time, reintroducing the exact version-drift problem a pinned image was meant to prevent', },
                { id: 'c', text: 'Jenkins cannot pull images without an exact tag' },
                { id: 'd', text: 'It removes the need for a Dockerfile entirely' },
              ],
              correct: 'b',
      "explanation": "`:latest` is not a fixed version — it is a moving pointer that gets reassigned to whatever image was most recently published under that tag. A pipeline using `maven:latest` can quietly start building with a different Maven/JDK version next month with zero code change, recreating the same \"build passed yesterday, fails today\" drift problem that pinning a Docker image was supposed to solve in the first place.",
    }
  },
  {
    type: 'feynman-checkpoint',
    prompt: 'Explain how parallel test execution in Jenkins affects resource management, and why a test team should care, in simple terms (as if explaining to a 5-year-old).',
    promptTr: 'Jenkins\'te paralel test koşumunun kaynak yönetimini (CPU/Memory/Network) nasıl etkilediğini ve test ekibinin bunu neden önemsemesi gerektiğini, 5 yaşındaki bir çocuğa anlatır gibi (teknik jargon kullanmadan) basit terimlerle açıkla.',
    keywords: [
      ['paralel', 'parallel', 'aynı anda', 'concurrent', 'simultaneous'],
      ['kaynak', 'resource', 'cpu', 'ram', 'hafıza', 'memory', 'sunucu', 'agent', 'executor'],
      ['yavaş', 'slow', 'çökme', 'crash', 'limit', 'darboğaz', 'bottleneck']
    ],
    modelAnswerEn: 'Running tests in parallel is like cooking multiple dishes on a stove at the same time. It makes dinner ready much faster, but if you put too many pots on the stove, you run out of burners or gas (CPU and memory), and everything might burn (crash). Test teams need to balance speed with how much resources they have.',
    modelAnswerTr: 'Paralel test koşmak, ocaktaki tüm gözlerde aynı anda farklı yemekler pişirmek gibidir. Akşam yemeği çok daha hızlı hazır olur, ama ocağa bir anda çok fazla tencere koyarsan gaz yetmeyebilir veya ocak taşabilir (CPU ve RAM tükenir, sistem çöker). Bu yüzden hızı ve kaynakları dengede tutmalıyız.',
    minScore: 2
  }
],
},

      // ── SECTION 7: INTERVIEW Q&A ───────────────────────────────────────────
      {
        title: '💼 Jenkins Interview Questions',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Jenkins CI/CD',
            questions: [
              // ── BASIC ──────────────────────────────────────────
              {
                level: 'basic',
                q: { en: 'What is Jenkins and why is it used in software development?' },
                a: { en: 'Jenkins is an open-source CI/CD automation server written in Java. Every time a developer pushes code, Jenkins automatically builds, tests, and optionally deploys it. It catches bugs within minutes of committing, reduces manual work, and ensures consistent quality on every change. In QA, Jenkins is where our test suites live and run — every commit triggers our Selenium, pytest, or Playwright tests automatically.' },
              },
              {
                level: 'basic',
                q: { en: 'What is the difference between Continuous Integration and Continuous Delivery?' },
                a: { en: 'CI (Continuous Integration) automatically builds and tests every code commit — catching bugs early. CD (Continuous Delivery) extends CI by auto-deploying to staging after tests pass, but requires human approval for production. Continuous Deployment goes further — even production is fully automatic. In QA: CI is where our test suite runs; CD ensures we\'re always testing the latest deployed code.' },
              },
              {
                level: 'basic',
                q: { en: 'What is a Jenkinsfile and where does it live?' },
                a: { en: 'A Jenkinsfile is a text file that defines the entire CI/CD pipeline as code using Groovy-based DSL. It lives in the root of your source repository — versioned in Git, code-reviewed in PRs, and evolving with the codebase. This "Pipeline as Code" approach replaced clicking through Jenkins GUI. Benefits: history, rollback, team review, and consistency across environments.' },
              },
              {
                level: 'basic',
                q: { en: 'What are the main sections of a Declarative Jenkins Pipeline?' },
                a: { en: 'Key sections: "pipeline" (root block), "agent" (where to run — any, docker, label), "stages" (container for all stages), "stage" (one logical step: Build, Test, Deploy), "steps" (actual commands: sh, echo, git), and "post" (actions after completion: always, success, failure, unstable). The "environment" block holds variables and credentials. Think: pipeline = factory, stages = departments, steps = individual actions.' },
              },
              {
                level: 'basic',
                q: { en: 'What is the difference between sh and bat in a Jenkinsfile?' },
                a: { en: '"sh" executes shell commands on Linux/Mac agents. "bat" runs batch commands on Windows agents. For cross-platform pipelines, use isUnix() to branch. In QA automation, "sh" is almost always used since CI servers typically run Linux. Modern teams avoid the OS question entirely by using Docker agents — the container OS is always Linux regardless of where Jenkins runs.' },
              },
              // ── INTERMEDIATE ────────────────────────────────────
              {
                level: 'intermediate',
                q: { en: 'What is the difference between post { always }, post { success }, and post { failure }?' },
                a: { en: 'post { always } runs regardless of result — use for cleanup, archiving artifacts, and publishing test reports (you need reports ESPECIALLY when tests fail). post { success } runs only when all stages pass — use for deployment and success notifications. post { failure } runs only when the build fails — use for Slack alerts. Key QA rule: always archive test reports in "always", never only in "success".' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you pass credentials (passwords, API tokens) securely in Jenkins?' },
                a: { en: 'Jenkins has a built-in Credentials store (Manage Jenkins → Credentials). You store secrets there (username/password, secret text, SSH key, certificate). In Jenkinsfile, reference them with credentials("id") in the environment block. Jenkins injects them as environment variables masked as "****" in logs. Never hardcode credentials in Jenkinsfile — they get committed to Git and become visible to everyone with repo access.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you trigger a Jenkins build only when code is pushed to a specific branch?' },
                a: { en: 'Use the "when" directive inside a stage: when { branch "main" }. For PR builds: when { changeRequest() }. For multiple branches: when { anyOf { branch "main"; branch "develop" } }. Alternatively, use Multibranch Pipeline with Branch Source plugin — Jenkins auto-creates a job per branch that has a Jenkinsfile. In QA: run smoke tests on every branch (2 min), full regression only on main (20 min).' },
              },
              {
                level: 'intermediate',
                q: { en: 'What is a Jenkins Agent and why use multiple agents?' },
                a: { en: 'A Jenkins Agent is a machine that runs the actual build/test work. The Controller (master) orchestrates but shouldn\'t execute jobs. Multiple agents enable: parallel execution across machines, OS-specific testing (Mac for Safari), running on real devices, and load distribution. Agents can be physical machines, VMs, or Docker containers. Label routing: agent { label "linux-docker" } sends the job to a matching agent.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you archive test artifacts and make them downloadable from Jenkins?' },
                a: { en: 'Use archiveArtifacts: archiveArtifacts artifacts: "reports/**", allowEmptyArchive: true. This makes files downloadable from the build page. For HTML reports: publishHTML([reportDir: "reports", reportFiles: "index.html", reportName: "Test Report"]). For JUnit: junit "results/junit.xml" — shows trend graph in the job. Always use allowEmptyArchive: true to prevent failure when the build died before tests ran.' },
              },
              // ── ADVANCED ────────────────────────────────────────
              {
                level: 'advanced',
                q: { en: 'How would you design a Jenkins pipeline for 500+ Selenium tests that currently take 2 hours?' },
                a: { en: 'Split tests into parallel stages by module. Use 10 Docker agents each running 50 tests = 12 minutes instead of 2 hours. Use pytest-xdist within each agent for further parallelism. Tag tests: smoke (5 min, every PR), sanity (15 min, daily), regression (full, nightly/main-only). Cache pip dependencies with Docker layer caching or shared workspace. Track test distribution to keep stages balanced — no single stage should be 3x longer than others.' },
              },
              {
                level: 'advanced',
                q: { en: 'What is a Jenkins Shared Library and when would a QA team use it?' },
                a: { en: 'A Shared Library is Groovy code in a separate Git repo importable by any Jenkinsfile organization-wide. QA teams use it to: avoid duplicating Slack notification code across 20 Jenkinsfiles, standardize how reports are published, centralize credential handling, and create reusable pipeline templates. Usage: @Library("qa-lib") _ then call publishReport(dir: "reports") from any Jenkinsfile. Changes to the library immediately affect all pipelines that import it.' },
              },
              {
                level: 'advanced',
                q: { en: 'How do you debug a pipeline that works locally but fails in Jenkins?' },
                a: { en: 'Systematic approach: 1) Add sh "env" to print all environment variables — PATH differences cause 80% of issues. 2) Add sh "pwd && ls -la" to verify working directory and file existence. 3) Reproduce locally using the exact Docker image: docker run -it python:3.12-slim bash. 4) Use Jenkins "Replay" feature to modify Jenkinsfile without committing. 5) Check file permissions — Jenkins user may lack access. 6) Add withCredentials block to test credential injection. 7) Compare Java/Python versions between local and CI.' },
              },
              {
                level: 'advanced',
                q: { en: 'How do you handle flaky tests without blocking deployments?' },
                a: { en: 'Three-layer strategy: 1) Auto-retry: pytest --reruns 3 --reruns-delay 5 — only fails after 3 consecutive failures. 2) Isolation: tag flaky tests with @pytest.mark.flaky, run them in a separate stage using currentBuild.result = "UNSTABLE" instead of letting them fail the build. 3) Tracking: maintain a flaky test registry (JIRA + Allure history) — quarantine any test flaking >3 times/week. The deployment pipeline only uses the non-flaky tests as a hard gate; flaky test results are informational.' },
              },
              {
                level: 'advanced',
                q: { en: 'How do you secure a Jenkins instance in production?' },
                a: { en: 'Key measures: 1) Enable Matrix Authorization — per-user/group permissions (devs can see but not configure). 2) LDAP/Active Directory integration for corporate SSO. 3) Credentials plugin — zero secrets in Jenkinsfile. 4) Run behind nginx with HTTPS and proper headers (X-Frame-Options, CSP). 5) Disable Jenkins CLI or restrict to localhost. 6) Pin and audit plugin versions — unreviewed plugins are an attack surface. 7) Role-Based Strategy plugin for team-level isolation. 8) Enable CSRF protection (on by default in modern Jenkins).' },
              },
              // ── BASIC (extra) ──────────────────────────────────
              { level: 'basic', q: { en: 'Your team wants to quickly prototype a build job without writing Groovy, but later needs it versioned in Git. Which Jenkins job type fits each phase, and how do you migrate?' }, a: { en: "Freestyle jobs are configured entirely through the Jenkins UI — fast to prototype, but configuration lives only in Jenkins' internal XML, not in your repo, so it can't be code-reviewed or rolled back via Git. Pipeline jobs (Jenkinsfile) version the entire CI/CD logic as code in your repository, enabling PR review, history, and reuse across branches. The migration path: prototype quickly with Freestyle to validate the build steps work, then translate those exact steps into a declarative Jenkinsfile and commit it before the job becomes a long-term dependency. In QA, almost every test pipeline should end up as a Jenkinsfile — a Freestyle job for nightly regression becomes invisible technical debt nobody can review." } },
              { level: 'basic', q: { en: 'Your CI takes 2 extra minutes to start testing because Jenkins polls the Git repo for changes every 5 minutes. How do you make builds trigger instantly instead?' }, a: { en: "Replace SCM polling (pollSCM) with a webhook: GitHub/GitLab pings Jenkins' /github-webhook/ endpoint the moment a push happens, triggering the build within seconds instead of waiting for the next poll cycle. Polling also wastes resources by repeatedly checking a repo that hasn't changed, while webhooks are push-based and only fire on actual events. The tradeoff is that webhooks require Jenkins to be reachable from the Git host, whereas polling works even when Jenkins can't be reached externally. For QA pipelines where fast feedback matters, webhooks are the default choice; polling is a fallback for restricted network setups." } },
              { level: 'basic', q: { en: "A new teammate finds the classic Jenkins UI confusing when trying to see which pipeline stage failed. What feature would you point them to, and why?" }, a: { en: "Blue Ocean is Jenkins' modern UI that visualizes a pipeline as a left-to-right flow of stages, with the failed stage highlighted in red and its logs one click away — far easier to scan than the classic UI's flat console log. It's particularly useful for QA pipelines with many parallel stages (unit, smoke, regression, deploy), where the classic UI just shows a wall of text but Blue Ocean shows exactly which parallel branch failed. It doesn't change pipeline behavior, only the visualization layer, so adopting it requires no Jenkinsfile changes. For teams onboarding new QA engineers, Blue Ocean significantly shortens the time to diagnose 'why did the build fail'." } },
              { level: 'basic', q: { en: 'QA wants the same Jenkinsfile to run either a quick smoke suite or the full regression suite, decided at trigger time. How do you implement this without two separate pipelines?' }, a: { en: "Use parameterized builds: declare a parameter (parameters { choice(name: 'SUITE', choices: ['smoke', 'regression'], description: '...') }), then branch the test command based on params.SUITE inside a stage. When triggering manually, Jenkins shows a dropdown to pick the suite; when triggered by a webhook, you can default to 'smoke' for fast feedback. This avoids maintaining two near-identical Jenkinsfiles that drift apart over time. Java analogy: like a single test runner class accepting a command-line argument for which test group to execute, instead of duplicating the whole class per group." } },
              { level: 'basic', q: { en: "Your Jenkinsfile needs to publish JUnit results and send Slack alerts, but you don't want to write that integration code from scratch. What's the Jenkins-native way to get this functionality?" }, a: { en: "Install the relevant plugins — the JUnit plugin adds the junit step to parse and visualize test XML reports with trend graphs, and the Slack Notification plugin adds a slackSend step usable directly in post blocks. Jenkins' plugin ecosystem covers most common integrations (Git, Docker, JIRA, Allure, email) so you rarely need custom Groovy for standard tasks. The catch for QA infra: plugins must be reviewed and version-pinned, since an unreviewed or outdated plugin is both a security and stability risk on a CI server everyone depends on." } },
              { level: 'basic', q: { en: "Two stages in your Jenkinsfile run on different agents, and a file created in stage 1 (a test report) goes missing in stage 2. What's actually happening?" }, a: { en: "Each Jenkins agent has its own separate workspace — files written in stage 1 on Agent A simply don't exist on Agent B's filesystem in stage 2, there's no automatic syncing between agents. The fix is to either pin both stages to the same agent (agent { label 'same-node' } at the top level instead of per-stage), or explicitly use stash in stage 1 and unstash in stage 2 to transfer specific files between agents. For QA, this commonly bites teams running build on one agent and tests on another — test reports generated mid-pipeline need an explicit stash/unstash to survive the agent switch." } },
              { level: 'basic', q: { en: "You need each test run's report to be uniquely named so historical runs don't overwrite each other. What Jenkins environment variable would you use, and how?" }, a: { en: 'BUILD_NUMBER (or BUILD_ID) is automatically injected by Jenkins into every pipeline run, incrementing with each execution — reference it as ${env.BUILD_NUMBER} in a Jenkinsfile to name report files like results-${env.BUILD_NUMBER}.xml. This is more reliable than timestamps for ordering builds, since BUILD_NUMBER is guaranteed strictly increasing and unique per job. Combine with JOB_NAME and GIT_COMMIT for fully traceable artifacts: which job, which run, exactly which commit produced this report. Java analogy: like a database auto-increment primary key versus relying on a wall-clock timestamp that could theoretically collide.' } },
              { level: 'basic', q: { en: "A senior engineer says your team's Jenkinsfile, written with `node { }` blocks and `if/else` Groovy logic, is 'Scripted' style and recommends switching to 'Declarative'. What's actually different, and is the rewrite worth it?" }, a: { en: "Scripted pipelines are essentially full Groovy programs (start with node {}), giving complete programming flexibility but making review and validation harder — syntax errors often only surface at runtime. Declarative pipelines use a fixed, structured syntax (pipeline { agent { } stages { } }) that's more restrictive but easier to read, lint, and validate before running. For QA pipelines that mostly do build → test → report → notify, Declarative covers 95% of needs and is worth the migration; Scripted should be reserved for genuinely complex branching logic that Declarative's `script {}` escape hatch can't cleanly express." } },
              { level: 'basic', q: { en: "What's the difference between the Jenkins Controller and a Jenkins Agent, and why shouldn't your test suite run directly on the Controller?" }, a: { en: "The Controller (formerly master) is the central Jenkins process that schedules jobs, serves the UI, and stores configuration — it's meant to orchestrate, not execute heavy workloads. Agents are separate machines (or containers) that actually run the build/test steps; the Controller dispatches work to them based on labels. Running a 500-test Selenium suite directly on the Controller risks starving the entire Jenkins instance of resources, potentially making the UI unresponsive for everyone or crashing the scheduler for all other teams' jobs. Best practice: keep the Controller job-execution-free (executors: 0) and route all real work to labeled agents." } },
              { level: 'basic', q: { en: "Your QA lead wants a quick visual answer to 'which stage usually takes longest across the last 20 runs' without digging through logs. What Jenkins feature gives this at a glance?" }, a: { en: "The Pipeline Stage View (visible on the classic job page, more polished in Blue Ocean) renders a grid where each row is a build and each column is a stage, color-coded by duration and pass/fail — so a consistently slow 'Regression Tests' column is visible immediately across many runs. This is the fastest way to spot a stage that's degrading over time before it becomes a team complaint. It requires no extra configuration beyond using named stages in a Jenkinsfile — the visualization is automatic." } },
              // ── INTERMEDIATE (extra) ────────────────────────────
              { level: 'intermediate', q: { en: 'Your pipeline runs Chrome and Firefox test suites in parallel, but deploy must wait until BOTH finish, not just whichever finishes first. How do you structure this in a Jenkinsfile?' }, a: { en: "Use the parallel step inside a stage: stage('Tests') { steps { parallel(chrome: { ... }, firefox: { ... }) } } — Jenkins waits for ALL branches inside that parallel block to complete before moving to the next stage, so a 'Deploy' stage placed after it naturally blocks until both browsers finish. If you want the build to fail only when ALL parallel branches fail, wrap individual branches in catchError so one failing branch doesn't immediately abort the others. This is different from fire-and-forget background steps — parallel() is a synchronization point, similar to calling .join() on multiple threads in Java before proceeding." } },
              { level: 'intermediate', q: { en: "Your pipeline auto-deploys to staging, but production deploys must wait for a human to click 'approve' first. How do you implement this gate in a Jenkinsfile?" }, a: { en: "Use the input step inside a stage: input message: 'Deploy to production?', submitter: 'qa-leads' — the pipeline pauses, showing a button in the Jenkins UI, and only continues once an authorized user clicks it. Combine with a timeout() so the pipeline doesn't hang forever waiting for an approval that never comes — e.g., timeout(time: 24, unit: 'HOURS') { input ... }. This is the Jenkins-native equivalent of a manual gate in GitHub Actions' environment protection rules, and it's the standard way QA enforces 'tests must pass AND a human signs off' before prod." } },
              { level: 'intermediate', q: { en: 'A flaky Selenium test occasionally hangs forever instead of failing, blocking the entire pipeline for hours until someone notices. How do you prevent one hung test from blocking CI indefinitely?' }, a: { en: "Wrap the test stage in timeout(time: 15, unit: 'MINUTES') { sh 'pytest tests/' } — if the stage exceeds 15 minutes, Jenkins forcibly aborts it and marks the build as failed instead of hanging until someone manually intervenes. Set the test framework's own internal timeouts too (pytest-timeout, Playwright's test.setTimeout) as a first line of defense, with the Jenkins-level timeout as the safety net catching cases the framework-level timeout missed. Without this, a single hung test can silently occupy an agent for hours, blocking every other build queued behind it." } },
              { level: 'intermediate', q: { en: 'Your Jenkins agents are running out of disk space because old test artifacts and node_modules from past builds accumulate in the workspace. How do you fix this?' }, a: { en: "Add cleanWs() at the start or in a post { always { cleanWs() } } block to wipe the workspace after each build, ensuring every run starts from a truly clean checkout. For more granular control, deleteDir() removes just the current directory's contents. Also configure job-level 'Discard Old Builds' (buildDiscarder in the options block) to limit how many old build records and artifacts Jenkins retains. Without workspace cleanup, QA pipelines that npm install or pip install fresh dependencies each run can silently consume tens of GB across dozens of stale workspaces." } },
              { level: 'intermediate', q: { en: 'Developers keep creating feature branches, and QA wants a dedicated test pipeline auto-created for each one without manually configuring a new Jenkins job every time. What Jenkins feature solves this?' }, a: { en: "Multibranch Pipeline automatically scans the repository and creates a sub-job for every branch (and PR) that contains a Jenkinsfile, removing it automatically once the branch is deleted or merged. This means QA's test pipeline runs identically on main, develop, and every feature/* branch without anyone touching Jenkins configuration. Combine with a when { branch 'main' } guard inside stages that should only run on specific branches (e.g., full regression only on main, quick smoke on feature branches) to avoid running the expensive suite on every throwaway branch." } },
              { level: 'intermediate', q: { en: 'Different microservices in your monorepo need different JDK and Node.js versions for their test suites, but your Jenkins agents only have one version installed globally. How do you handle this per-pipeline without provisioning separate agents?' }, a: { en: "Use the tools block: tools { jdk 'jdk17'; nodejs 'node20' } at the top of the pipeline — Jenkins downloads/configures the specified tool version and adds it to PATH just for that pipeline run, without affecting other concurrent jobs on the same agent. This avoids the fragile alternative of manually managing PATH or using tools like jenv/nvm inside shell steps. For QA test images, an even cleaner approach is a Docker agent pinned to the exact version needed (agent { docker 'node:20' }), sidestepping the host-tools problem entirely." } },
              { level: 'intermediate', q: { en: "QA needs to run the same test suite against Chrome, Firefox, and Edge, across both Windows and Linux agents — that's 6 combinations. Writing 6 near-identical stages would be unmaintainable. What Jenkins feature handles this cleanly?" }, a: { en: "The Matrix directive in a Declarative pipeline generates a stage per combination of axes you define: matrix { axes { axis { name 'BROWSER'; values 'chrome', 'firefox', 'edge' } axis { name 'OS'; values 'linux', 'windows' } } stages { ... } } — Jenkins automatically creates and runs all 6 combinations, each with BROWSER and OS available as environment variables inside the stage. You can exclude invalid combinations with the excludes block. This replaces what would otherwise be 6 copy-pasted stages that inevitably drift out of sync when someone updates one but forgets the others." } },
              { level: 'intermediate', q: { en: 'Two different Jenkins pipelines (one for nightly regression, one for a manual hotfix test) both need exclusive access to the same shared staging environment, and running simultaneously corrupts shared test data. How do you prevent that without manually coordinating via Slack?' }, a: { en: "Install the Lockable Resources plugin and wrap the staging-dependent stage in lock('staging-env') { ... } in both Jenkinsfiles — Jenkins ensures only one pipeline holds the lock at a time, automatically queuing the second pipeline until the first releases it. This is essentially a distributed mutex for CI pipelines, solving the same problem as a database row lock but for a shared external resource Jenkins itself doesn't control. Without it, teams either accept flaky cross-pipeline test pollution or resort to fragile manual scheduling, which inevitably gets violated under deadline pressure." } },
              { level: 'intermediate', q: { en: "Your test stage occasionally fails due to a transient network blip when pulling test data from an external API, not a real bug. You don't want to mask real failures, but also don't want false alarms paging someone at 2am. What's the right Jenkins-native fix?" }, a: { en: "Use the retry() option around just that specific stage: retry(2) { sh 'pytest tests/external_api/' } — Jenkins reruns the stage up to 2 additional times only if it fails, succeeding silently if a retry passes, which absorbs genuinely transient blips without masking a consistently failing test (which will still fail all 3 attempts). Don't apply retry() pipeline-wide, since that would also hide real flaky-test problems that deserve investigation. Separately, disableConcurrentBuilds() in the options block prevents two simultaneous runs of the same pipeline from fighting over the same external resource." } },
              { level: 'intermediate', q: { en: 'Default Jenkins email notifications are a wall of plain text that nobody reads carefully, so flaky test alerts get ignored until something breaks for real. How do you make failure notifications actually actionable?' }, a: { en: "Install the Email Extension (email-ext) plugin, which lets you build HTML email templates with build status color-coding, direct links to the failing stage/console log, and conditional triggers (only send on status CHANGE from green to red, not on every red build in a row) — this cuts notification fatigue dramatically. Combine with Slack notifications (slackSend) for immediate team visibility, reserving email for less time-sensitive summaries. The key UX principle: notify on STATE CHANGE, not on every run, so a persistently red build pages once, not every 15 minutes." } },
              { level: 'intermediate', q: { en: 'Management wants a live dashboard showing pass/fail trends across all QA pipelines, not just whatever Jenkins shows natively. How do you get test result data out of Jenkins programmatically?' }, a: { en: "Jenkins exposes a REST API (GET /job/my-pipeline/lastBuild/testReport/api/json) that returns structured JSON with pass/fail counts, individual test case results, and duration — a dashboard tool (Grafana, a custom script, or Allure's own server) can poll this periodically to build trend charts independent of Jenkins' own UI. Authenticate using an API token generated per-user (Manage Jenkins → Users → Configure → API Token), never a plaintext password, and treat that token like any other credential. This API-plus-external-dashboard pattern is far more flexible than trying to force Jenkins' UI to show executive-level trends." } },
              { level: 'intermediate', q: { en: 'Your build pipeline and your test pipeline are currently one giant Jenkinsfile, but you want to trigger the test pipeline automatically from multiple different build pipelines (Java service, Python service) without duplicating test logic. How?' }, a: { en: "Split them into separate Jenkins jobs, and from each build pipeline's Jenkinsfile, call build job: 'qa-test-pipeline', parameters: [string(name: 'SERVICE', value: 'java-service')] — this triggers the downstream test pipeline as its own job run, passing along whatever parameters it needs, and can optionally wait for its result with wait: true to fail the build pipeline if tests fail. This decouples 'how to build service X' from 'how to test anything', so the test pipeline logic lives in exactly one place regardless of how many upstream build pipelines call it." } },
              { level: 'intermediate', q: { en: 'Your QA team rotates the test database password monthly for security. Currently this means editing the Jenkinsfile every month to update a hardcoded value. How should this actually be handled?' }, a: { en: "It shouldn't be hardcoded at all — store the password in the Jenkins Credentials store once, referenced in the Jenkinsfile by a stable credential ID (credentials('test-db-password')) that never changes. When the password rotates monthly, you update the VALUE in Manage Jenkins → Credentials, not the Jenkinsfile — zero code changes, zero redeploys. This is exactly the problem Jenkins Credentials is designed to solve: decoupling 'which secret' (stable, in code) from 'what is the secret's current value' (rotates, in Jenkins' encrypted store)." } },
              { level: 'intermediate', q: { en: 'Your fixed pool of 5 Jenkins agents is often idle overnight but completely saturated during the day when everyone pushes code, causing long test queue times at peak hours. How do you fix this without buying more permanent hardware?' }, a: { en: "Use the Kubernetes plugin (or Docker Cloud / EC2 plugin) to provision agents dynamically — Jenkins spins up a fresh pod/container as an agent only when a job needs one, and tears it down when the job finishes, instead of maintaining a fixed pool that's idle most of the time. This scales naturally with actual demand: 20 agents spin up during a busy morning, 0 remain overnight, and you only pay for compute while jobs are actually running. Each ephemeral agent also starts from a clean, known-good image every time, eliminating the 'works on agent-3 but not agent-7' class of flaky-environment bugs from long-lived agents accumulating drift." } },
              { level: 'intermediate', q: { en: "You're debugging a Jenkinsfile syntax issue and want to test a fix quickly without committing 10 throwaway commits to the repo. What Jenkins feature lets you iterate fast, and what's its limitation?" }, a: { en: "The Replay feature (available on a completed pipeline run) lets you edit the Jenkinsfile's Groovy script in the Jenkins UI and immediately rerun it with that modification, without touching Git at all — perfect for rapid iteration while debugging. The limitation: Replay changes are NOT saved anywhere permanent — once you've found the fix, you must manually copy it back into the actual Jenkinsfile and commit it, or the next real trigger will run the old, unfixed version from Git. Replay is a debugging scratchpad, not a deployment mechanism — treat it like testing in a REPL before committing the real change to source." } },
              // ── ADVANCED (extra) ────────────────────────────────
              { level: 'advanced', q: { en: "Your Jenkins Controller's disk crashed, and with it 6 months of pipeline history, credentials, and job configs. How do you architect Jenkins to survive this, and what specifically must be backed up?" }, a: { en: "JENKINS_HOME contains everything that matters: job configs, build history, plugins, and the encrypted credentials store — back this entire directory up regularly to external storage (S3, NFS, a separate volume) on a schedule, plus before every Jenkins version upgrade. For true high availability, run the Controller on durable infrastructure with JENKINS_HOME on a persistent network volume rather than ephemeral local disk, so a Controller crash and restart on a new instance can reattach to the same data. Test the restore process periodically in a staging Jenkins instance — a backup nobody has ever successfully restored from is not actually a backup. For QA specifically, losing historical test trend data is often more painful than losing job configs, since it erases the ability to spot flaky-test patterns over time." } },
              { level: 'advanced', q: { en: "Your Jenkins Shared Library has grown to thousands of lines of Groovy used by every team's pipeline, but nobody tests it — bugs are only discovered when they break someone's production deploy. How do you bring this under test?" }, a: { en: "Use the Jenkins Pipeline Unit testing framework to unit test shared library functions in isolation, mocking Jenkins steps like sh or git so tests run fast without a real Jenkins instance. Structure the library so business logic (e.g., 'which stages should run based on branch name') is separated from Jenkins-specific glue code, making the logic itself trivially testable with plain Groovy/Spock tests. Treat the shared library exactly like production code: require PR review, run its own CI pipeline that runs these unit tests before merging changes, and version it (tag releases) so consuming Jenkinsfiles can pin to a known-good version instead of always tracking the library's potentially broken main branch." } },
              { level: 'advanced', q: { en: 'Your single Jenkins Controller handles 300 jobs across 10 teams, and the UI has become noticeably sluggish, builds queue for minutes even when agents are free. How do you diagnose and fix Controller-level performance issues?' }, a: { en: "First check executor count on the Controller itself — it should be 0, with all real work routed to agents; many performance issues trace back to someone running heavy jobs directly on the Controller. Check the plugin list for known-slow or abandoned plugins, since a single misbehaving plugin can degrade the entire UI thread. Tune JVM heap size and GC settings for the Controller process if memory pressure is the bottleneck, and consider splitting into multiple Controllers (one per business unit) if a single instance has genuinely outgrown vertical scaling. Often the real fix is architectural: move from a single shared Controller to Configuration-as-Code-provisioned Controllers per team, reducing blast radius and contention." } },
              { level: 'advanced', q: { en: "You need to upgrade Jenkins core and a dozen plugins, but the Controller is actively running pipelines for multiple teams around the clock — you can't just take it down whenever you want. How do you plan a safe upgrade?" }, a: { en: "Stand up a staging Jenkins instance restored from a recent JENKINS_HOME backup, apply the upgrade there first, and run a representative sample of real pipelines against it to catch plugin-compatibility breakage before touching production. Schedule the actual production upgrade during the lowest-traffic window and communicate it in advance so teams don't have pipelines mid-flight when the Controller restarts. Always read the plugin compatibility warnings Jenkins shows before upgrading — ignoring these is the most common cause of a broken post-upgrade instance. Keep the pre-upgrade JENKINS_HOME backup readily available so a rollback is a known, rehearsed procedure, not something improvised under pressure during an outage." } },
              { level: 'advanced', q: { en: 'Your org wants to let developers add a Jenkinsfile in their own PRs and have it auto-run, but a malicious or careless PR could write Groovy that reads other jobs\' credentials or makes arbitrary host calls. How do you allow this safely?' }, a: { en: "Enable the Script Security plugin's sandbox for untrusted pipeline code — pipelines from PR branches run inside a restricted Groovy sandbox that blocks dangerous operations (filesystem access outside the workspace, arbitrary Java reflection, reading other jobs' credentials) unless an admin explicitly approves a specific script signature. For Multibranch Pipelines built from forks specifically, enable 'discover pull requests from forks' settings carefully and consider requiring a build approval step for first-time external contributors, since fork PRs are the highest-risk category. Credentials should also be scoped — a PR-triggered build pipeline shouldn't have access to production deployment credentials at all, following least-privilege rather than relying solely on the sandbox." } },
              { level: 'advanced', q: { en: 'Your team wants production deploys to be gated not just on test pass/fail, but on live canary metrics (error rate, latency) after a partial rollout. How would you wire this into a Jenkins pipeline?' }, a: { en: "After deploying to a small percentage of traffic (canary), add a stage that polls your monitoring system's API (Prometheus, Datadog) in a loop for N minutes, comparing canary error rate/latency against a baseline threshold — fail the stage and trigger automatic rollback if metrics breach the threshold, or proceed to full rollout if they stay healthy. Implement this as a timeout()-wrapped polling loop rather than a fixed sleep, since waiting a fixed 10 minutes regardless of clearly-bad-early metrics wastes time and delays rollback. This pattern blurs the QA/SRE boundary — the canary stage needs its own alerting independent of the pipeline in case the pipeline itself hangs or crashes mid-rollout." } },
              { level: 'advanced', q: { en: 'Plugin updates keep breaking unrelated pipelines because of compatibility conflicts between plugins maintained by different vendors, and teams have started avoiding upgrades entirely out of fear. How do you establish sane plugin governance?' }, a: { en: "Maintain a tested, pinned plugin Bill of Materials (BOM) — a known-good combination of plugin versions validated together in staging before being rolled out to production, rather than letting each plugin auto-update independently and combinatorially explode the compatibility surface. Use Configuration as Code (JCasC) to declare the exact plugin set and versions as a versioned file, so the Controller's configuration is reproducible and reviewable like any other infrastructure code. Establish a regular (e.g., quarterly) upgrade cadence with a staging soak period, rather than either 'never upgrade' or 'auto-upgrade everything' — predictable cadence lets teams plan around it instead of being surprised." } },
              { level: 'advanced', q: { en: 'Your company has grown to 15 teams, each wanting their own Jenkins jobs, and manually configuring each one through the UI has become an unmaintainable bottleneck for the platform team. How do you scale Jenkins administration itself?' }, a: { en: "Adopt Configuration as Code (JCasC) to define Controller-level settings (security realm, credentials providers, tool installations) as YAML checked into Git, so the entire Controller configuration is reproducible and reviewable via PR, eliminating undocumented UI clicks nobody remembers making. For per-team job creation, use Job DSL or, better, Multibranch Pipeline + a standard Jenkinsfile template each team customizes in their own repo — this turns 'platform team manually creates a job' into 'team self-serves by adding a Jenkinsfile,' removing the platform team as a bottleneck. This is the same evolution as infrastructure moving from manually-clicked cloud consoles to Terraform." } },
              { level: 'advanced', q: { en: 'During long-running parallel Selenium Grid test stages (45+ minutes), agents occasionally go offline mid-test with no clear error, losing all progress for that stage. How do you diagnose and prevent this?' }, a: { en: "Check agent connection type first — JNLP/WebSocket agent connections can silently drop on flaky networks or aggressive corporate proxy idle-timeouts, especially over long-running stages with sparse output; switching to SSH-based agent connections often resolves this. Check the agent host's own resource limits — an agent OOM-killed by the OS due to memory pressure from 50 parallel Chrome instances looks identical to 'agent went offline' in Jenkins logs, but the real fix is resource limits per browser node, not a Jenkins setting. As a resilience measure regardless of root cause, structure long test stages to checkpoint progress (writing partial results to a mounted volume incrementally) so an agent disconnect mid-run doesn't lose 44 minutes of completed results, only the in-flight ones." } },
              { level: 'advanced', q: { en: 'Your cloud bill for ephemeral Jenkins agents (Kubernetes pods spun up per job) has tripled even though job count only grew 20%. How do you investigate and reduce ephemeral agent costs without slowing down CI?' }, a: { en: "First check if agent pods are over-provisioned relative to actual usage — a common mistake is requesting 4 CPU/8GB for every agent pod regardless of whether the job needs it; right-sizing resource requests per job type often cuts cost significantly with zero performance impact. Check agent idle/startup overhead — if image pulls are slow because images aren't cached on the Kubernetes nodes, you're paying for compute time spent just downloading the image; pre-pulling common base images onto nodes reduces this waste. Audit whether jobs are retaining agents longer than needed and consider spot/preemptible instances for the Kubernetes node pool, since CI workloads tolerate occasional preemption far better than production services do." } },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // TURKISH VERSION
  // ══════════════════════════════════════════════════════════════
  tr: {
    hero: {
      title: '🔧 Jenkins CI/CD',
      subtitle: 'Sürekli Entegrasyon ve Sürekli Dağıtım',
      intro: 'Jenkins\'i sıfırdan mülakat seviyesine taşı. Her commit\'te build\'leri otomatikleştir, QA araçlarınla entegre et ve yazılımı daha hızlı ve güvenle teslim et.',
    },
    tabs: ['🎯 Giriş', '⚙️ Kurulum', '🔁 Pipeline', '🧪 QA Entegrasyonu', '🚀 İleri Seviye', '🛠️ Gerçek Hayat', '🔗 Ekosistem', '💼 Mülakat S&C'],
    sections: [
      // ── SECTION 0: INTRODUCTION (TR) ──────────────────────────────────────
      {
        title: '🎯 Jenkins ve CI/CD Nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🤖',
            content: 'Jenkins, yazılım ekibindeki yorulmaz bir robot asistan gibidir. Bir developer kod push\'ladığında Jenkins otomatik olarak build eder, tüm testleri çalıştırır ve bir şey bozulduysa bildirir — kimsenin butona basmasına gerek kalmaz. 7/24 çalışır ve hiçbir adımı atlamaz.',
          },
          {
            type: 'text',
            content: 'Modern yazılım geliştirmede onlarca developer günde birkaç kez kod gönderir. Otomasyon olmadan birisinin elle build alması, testleri çalıştırması ve deploy etmesi gerekir — bu yavaş, hatalı ve pahalıdır. Jenkins, CI/CD (Continuous Integration / Continuous Delivery) ile bunu çözer.',
          },
          { type: 'heading', text: 'Continuous Integration (CI)' },
          {
            type: 'text',
            content: 'CI, her kod push\'unda otomatik pipeline tetiklenmesi demektir: build → test → rapor. Hedef, hataları commit\'ten dakikalar sonra yakalamaktır — günler sonra değil. Testler geçerse kod "entegre" sayılır. Başarısız olursa developer anında bildirim alır.',
          },
          { type: 'heading', text: 'Continuous Delivery / Deployment (CD)' },
          {
            type: 'text',
            content: 'CD, CI\'yı bir adım ileri götürür: testler geçtikten sonra kod otomatik olarak staging\'e deploy edilir (Continuous Delivery — production için insan onayı gerekir) veya production\'a (Continuous Deployment — tamamen otomatik). QA\'da bu, test suite\'nin her zaman en son koda karşı çalıştığı anlamına gelir.',
          },
          {
            type: 'visual',
            variant: 'flow',
            title: 'CI/CD Pipeline Akışı',
            steps: [
              { num: '1', label: 'Kod Push', desc: 'Developer commit eder' },
              { num: '2', label: 'Build', desc: 'Derleme / bağımlılık' },
              { num: '3', label: 'Unit Test', desc: 'Hızlı geri bildirim' },
              { num: '4', label: 'Integration', desc: 'API + DB kontrol' },
              { num: '5', label: 'Staging Deploy', desc: 'Otomatik deploy' },
              { num: '6', label: 'E2E Test', desc: 'Selenium/Playwright' },
              { num: '7', label: 'Prod Deploy', desc: 'Manuel onay kapısı' },
            ],
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '🆓', label: 'Ücretsiz ve Açık Kaynak', desc: 'Apache License 2.0 — sınırsız kullanım, hiç lisans ücreti yok.' },
              { icon: '🔌', label: '1800+ Plugin', desc: 'GitHub, Slack, Docker, Kubernetes, Allure ve daha fazlası.' },
              { icon: '🌐', label: 'Dağıtık Build', desc: 'Testleri birden fazla agent\'ta paralel çalıştır.' },
              { icon: '📊', label: 'Zengin Raporlama', desc: 'JUnit, HTML, Allure, Cobertura raporları otomatik yayınla.' },
              { icon: '🔗', label: 'Her VCS', desc: 'Git, SVN, Mercurial — tüm version control sistemleri desteklenir.' },
              { icon: '🐳', label: 'Docker Desteği', desc: 'Build ve testleri Docker container\'larında çalıştır.' },
            ],
          },
          { type: 'heading', text: 'Jenkins vs Alternatifler' },
          {
            type: 'table',
            headers: ['Araç', 'Hosting', 'Ücretsiz', 'Plugin Sayısı', 'Öğrenme Eğrisi', 'En İyi Kullanım'],
            rows: [
              ['Jenkins', 'Self-hosted', '✅ Evet', '1800+', '⭐⭐⭐ Yüksek', 'Özelleştirme gereken enterprise'],
              ['GitHub Actions', 'Cloud', '✅ (Limitli)', '200+', '⭐ Düşük', 'GitHub kullanan projeler'],
              ['GitLab CI', 'Cloud / Self', '✅ Evet', '100+', '⭐⭐ Orta', 'GitLab kullanan ekipler'],
              ['CircleCI', 'Cloud', '❌ Ücretli', '150+', '⭐ Düşük', 'Hızlı cloud CI ihtiyacı'],
              ['TeamCity', 'Self / Cloud', '❌ Ücretli', '300+', '⭐⭐ Orta', 'JetBrains ekosistemi'],
              ['Azure DevOps', 'Cloud', '❌ Ücretli', '800+', '⭐⭐ Orta', 'Microsoft/Azure ortamları'],
            ],
          },
          { type: 'heading', text: 'QA Mühendisleri İçin Gerçek Kullanım Senaryoları' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              'Her deployment sonrasında JMeter load testlerini otomatik çalıştır',
              'Her pull request\'te Selenium/Playwright regression suite çalıştır',
              'Her build sonrasında pytest API testlerini staging\'e karşı çalıştır',
              'Her test çalışması için Allure/HTML raporlarını oluştur ve arşivle',
              'Test başarısız olduğunda rapor linki içeren Slack bildirimi gönder',
              'Test coverage düşerse merge\'yi engelleyen quality gate uygula',
              'Nightly smoke testleri birden fazla browser/ortamda zamanlı çalıştır',
            ],
          },
          {
            type: 'quiz',
            question: '"Continuous Integration" öncelikle ne anlama gelir?',
            options: [
              { id: 'a', text: 'Kodu otomatik olarak production\'a deploy etmek' },
              { id: 'b', text: 'Her commit\'te otomatik olarak build alıp test çalıştırmak' },
              { id: 'c', text: 'Harici API\'larla entegrasyon' },
              { id: 'd', text: 'Testleri haftada bir elle çalıştırmak' },
            ],
            correct: 'b',
            explanation: 'CI, her kod commit\'inde otomatik build + test döngüsü tetiklenmesi demektir. CD (Continuous Delivery/Deployment) ise deployment kısmını kapsar.',
          
        retryQuestion: {
      "type": "quiz",
      "question": "Continuous Deployment (CD) süreci, Continuous Integration (CI) sürecinden hangi noktada ayrılır?",
      "options": [
            {
                  "id": "a",
                  "text": "CI kod kalitesini ölçerken, CD kodun yazılmasını sağlar."
            },
            {
                  "id": "b",
                  "text": "CI sadece test yapar, CD ise kodun canlı ortama otomatik aktarılmasını sağlar."
            },
            {
                  "id": "c",
                  "text": "CI sadece yerel bilgisayarda çalışır, CD ise sunucuda çalışır."
            },
            {
                  "id": "d",
                  "text": "Arasında bir fark yoktur, iki terim de aynı şeyi ifade eder."
            }
      ],
      "correct": "b",
      "explanation": "CI (Continuous Integration) kodun derlenmesi ve test edilmesine odaklanır. CD (Continuous Deployment) ise test edilmiş kodun otomatik olarak production ortamına aktarılması aşamasını kapsar."
}
},
        ],
      },

      // ── SECTION 1: INSTALLATION (TR) ──────────────────────────────────────
      {
        title: '⚙️ Jenkins Kurulumu',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📦',
            content: 'Jenkins kurmak, robot asistanın için özel bir çalışma alanı kurmak gibidir. Bir kez kurarsın ve sonrasında tüm otomasyonunu buradan yönetir. Üç seçenek: doğrudan işletim sistemine kur, Docker ile çalıştır (en hızlı) veya cloud kullan.',
          },
          { type: 'heading', text: 'Ön Gereksinimler' },
          {
            type: 'list',
            icon: '✅',
            items: [
              'Java 17 veya Java 21 LTS — Jenkins bir Java uygulamasıdır',
              'En az 1 GB RAM (gerçek projeler için 2 GB+ önerilir)',
              'Build ve artifact\'lar için en az 10 GB disk alanı',
              '8080 portu açık olmalı (Jenkins\'in varsayılan portu)',
            ],
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Java versiyonunu kontrol et',
            code: `java -version
# Beklenen çıktı: openjdk version "17.0.9" 2023-10-17
# Kurulu değilse: https://adoptium.net/ adresinden indir`,
          },
          { type: 'heading', text: 'Seçenek 1: Windows\'a Kurulum' },
          {
            type: 'installation',
            steps: [
              { cmd: '# Adım 1: Jenkins .msi installer\'ı indir', explanation: 'jenkins.io → Download → LTS → Windows seç. .msi dosyasını indir (örn: jenkins-2.440.3.msi).' },
              { cmd: '# Adım 2: .msi\'yi Yönetici olarak çalıştır', explanation: '.msi dosyasına çift tıkla. Installer otomatik olarak Windows Service oluşturur. Varsayılan dizin: C:\\Program Files\\Jenkins\\' },
              { cmd: '# Adım 3: Tarayıcıda http://localhost:8080 aç', explanation: 'Jenkins "Getting Started" sihirbazını gösterir.' },
              { cmd: 'type "C:\\ProgramData\\Jenkins\\.jenkins\\secrets\\initialAdminPassword"', explanation: 'İlk admin parolasını bu dosyadan al. Jenkins web kurulumuna yapıştır.' },
              { cmd: '# Adım 4: Önerilen plugin\'leri kur (2-5 dk)', explanation: '"Install suggested plugins"\'a tıkla. Tüm plugin\'lerin kurulmasını bekle.' },
              { cmd: '# Adım 5: Admin kullanıcısı oluştur → Save and Finish', explanation: 'Kullanıcı adı, parola, email doldur. Jenkins hazır!' },
            ],
          },
          { type: 'heading', text: 'Seçenek 2: Linux (Ubuntu/Debian)\'a Kurulum' },
          {
            type: 'installation',
            steps: [
              { cmd: 'sudo apt update && sudo apt install -y fontconfig openjdk-21-jre', explanation: 'Java 21 kur. fontconfig rapor rendering için gerekli.' },
              { cmd: 'sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key', explanation: 'Jenkins GPG anahtarını indir ve ekle.' },
              { cmd: 'echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list', explanation: 'Jenkins repository\'sini apt kaynaklarına ekle.' },
              { cmd: 'sudo apt update && sudo apt install -y jenkins', explanation: 'Resmi repository\'den Jenkins\'i kur.' },
              { cmd: 'sudo systemctl start jenkins && sudo systemctl enable jenkins', explanation: 'Jenkins\'i başlat ve otomatik başlaması için etkinleştir.' },
              { cmd: 'sudo cat /var/lib/jenkins/secrets/initialAdminPassword', explanation: 'http://localhost:8080 için ilk admin parolasını al.' },
            ],
          },
          { type: 'heading', text: 'Seçenek 3: Docker ile Çalıştır (En Hızlı)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Docker ile Jenkins başlatma',
            code: `# Resmi Jenkins LTS image\'ını çek
docker pull jenkins/jenkins:lts

# Jenkins container\'ı çalıştır
docker run -d \\
  --name jenkins \\
  -p 8080:8080 \\                           # Web UI portu
  -p 50000:50000 \\                         # Agent iletişim portu
  -v jenkins_home:/var/jenkins_home \\      # Veriyi kalıcı yap
  jenkins/jenkins:lts

# İlk admin parolasını al
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Tarayıcıda: http://localhost:8080`,
          },
          { type: 'tip', content: 'Docker yöntemi en hızlı başlangıç yoludur. Container yeniden başlatılsa bile veriler jenkins_home volume\'ünde kalır. Öğrenme ve küçük ekipler için mükemmeldir.' },
          { type: 'heading', text: 'Kurulması Gereken Temel Plugin\'ler' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🔗', label: 'Git Plugin', desc: 'GitHub, GitLab, Bitbucket bağlantısı.' },
              { icon: '🔁', label: 'Pipeline Plugin', desc: 'Jenkinsfile yaz — modern Jenkins\'in temeli.' },
              { icon: '📊', label: 'HTML Publisher', desc: 'Test raporlarını yayınla (Allure, Extent Reports vb.).' },
              { icon: '💬', label: 'Slack Notification', desc: 'Build durumunu Slack kanallarına gönder.' },
              { icon: '🐳', label: 'Docker Pipeline', desc: 'Docker container\'larını build agent olarak kullan.' },
              { icon: '📧', label: 'Email Extension', desc: 'Başarısız build\'lerde detaylı HTML email gönder.' },
            ],
          },
          {
            type: 'quiz',
            question: 'Jenkins web arayüzünün varsayılan portu hangisidir?',
            options: [
              { id: 'a', text: '3000' },
              { id: 'b', text: '8080' },
              { id: 'c', text: '443' },
              { id: 'd', text: '9090' },
            ],
            correct: 'b',
            explanation: 'Jenkins varsayılan olarak 8080 portunda çalışır. 50000 portu agent-controller iletişimi içindir. Her ikisi de Jenkins yapılandırmasında değiştirilebilir.',
          
        retryQuestion: {
      "question": "Jenkins kurulumu yapıldıktan sonra tarayıcıdan erişmek için kullanılan varsayılan adres ve port kombinasyonu aşağıdakilerden hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "localhost:3000"
            },
            {
                  "id": "b",
                  "text": "localhost:50000"
            },
            {
                  "id": "c",
                  "text": "localhost:8080"
            },
            {
                  "id": "d",
                  "text": "localhost:8443"
            }
      ],
      "correct": "c",
      "explanation": "Jenkins, kurulum sırasında varsayılan olarak 8080 portunu dinler. 50000 portu ise Jenkins agent (slave) node'larının ana makineyle iletişim kurması için ayrılmıştır."
    }
  },
  {
    type: 'visual',
    variant: 'boxes',
    title: { tr: 'Jenkins Dağıtık Derleme Mimarisi (Master-Agent)', en: 'Jenkins Distributed Build Architecture (Master-Agent)' },
    items: [
      { icon: '🖥️', label: { tr: 'Jenkins Controller (Master)', en: 'Jenkins Controller (Master)' }, desc: { tr: 'İşleri planlar, UI sunar ve konfigürasyonu yönetir.', en: 'Schedules builds, serves UI, and manages configuration.' }, highlight: true },
      { arrow: true },
      { icon: '🐳', label: { tr: 'Agent Node A (Chrome)', en: 'Agent Node A (Chrome)' }, desc: { tr: 'UI testlerini koşan izole test makinesi', en: 'Isolated agent running UI tests on Chrome' } },
      { icon: '🐳', label: { tr: 'Agent Node B (Firefox)', en: 'Agent Node B (Firefox)' }, desc: { tr: 'Paralel koşan Firefox test makinesi', en: 'Isolated agent running Firefox tests' } }
    ],
    note: { tr: 'Tüm testler ve derlemeler Controller üzerinde değil, Agent makineleri üzerinde koşturularak yük dağıtılır.', en: 'All heavy compilation and test execution runs on Agent nodes to prevent overloading the Controller.' }
  }
],
},

      // ── SECTION 2: PIPELINE (TR) ───────────────────────────────────────────
      {
        title: '🔁 Jenkins Pipeline Temelleri',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏭',
            content: 'Jenkins Pipeline, bir fabrika montaj hattı gibidir. Her "stage" bir iş istasyonudur (Build, Test, Deploy). Parçalar sırayla geçer ve bir istasyon başarısız olursa hat durur, ekip uyarılır. Bu montaj hattını Jenkinsfile adlı bir dosyada kod olarak yazarsın.',
          },
          {
            type: 'simulation',
            icon: '🔧',
            color: '#ef4444',
            title: { tr: 'CI/CD Pipeline — Canlı Simülasyon', en: 'CI/CD Pipeline — Live Simulation' },
            scenario: 'jenkins-pipeline-visual',
            description: {
              tr: '"▶ Build Başlat" butonuna bas: Checkout → Compile → Run QA Tests → Deploy aşamalarını bir fabrika üretim bandı gibi canlı izle. Paralel çalışan agent\'ları ve hata durumunda çıkan dumanları gözlemle.',
              en: 'Press "▶ Start Build": Watch Checkout → Compile → Run QA Tests → Deploy stages execute live like a factory conveyor belt. Observe parallel agents and smoke rising on failures.'
            },
            code: `// Jenkinsfile — Parallel QA Stages
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/org/repo.git'
            }
        }
        stage('Compile') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run QA Tests') {
            parallel {
                stage('UI Tests - Chrome') {
                    steps {
                        sh 'npx playwright test --project=chromium'
                    }
                }
                stage('UI Tests - Firefox') {
                    steps {
                        sh 'npx playwright test --project=firefox'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh './scripts/deploy-staging.sh'
            }
        }
    }
}`,
            language: 'groovy'
          },
          { type: 'heading', text: 'Freestyle Job vs Declarative Pipeline' },
          {
            type: 'table',
            headers: ['Özellik', 'Freestyle Job', 'Declarative Pipeline'],
            rows: [
              ['Yapılandırma', 'GUI (tıklama)', 'Kod (Jenkinsfile — Git\'te)'],
              ['Version Control', '❌ Versiyonlanmaz', '✅ Kodunla birlikte Git\'te'],
              ['Karmaşıklık', 'Sadece basit', 'Karmaşık, koşullu mantık'],
              ['Paralel Stage', '❌ Hayır', '✅ Evet'],
              ['Code Review', '❌ Hayır', '✅ Evet — PR review'],
              ['Önerilen Kullanım', 'Hızlı denemeler', 'Tüm production kullanımı'],
            ],
          },
          { type: 'heading', text: 'İlk Jenkinsfile\'ın' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Minimal Declarative Pipeline',
            code: `pipeline {
    agent any               // Herhangi bir agent/node üzerinde çalıştır

    stages {
        stage('Build') {    // 1. Aşama: Build
            steps {
                echo 'Uygulama build ediliyor...'
                sh 'npm install'   // Shell komutu (Windows\'ta bat kullan)
            }
        }

        stage('Test') {     // 2. Aşama: Testleri çalıştır
            steps {
                echo 'Testler çalıştırılıyor...'
                sh 'npm test'
            }
        }

        stage('Deploy') {   // 3. Aşama: Deploy et
            steps {
                echo 'Deploy ediliyor...'
                sh './scripts/deploy.sh'
            }
        }
    }

    post {                  // Pipeline bittikten SONRA yapılacak eylemler
        always {
            echo 'Pipeline tamamlandı — kaynakları temizle'
        }
        success {
            echo '✅ Build başarılı!'
        }
        failure {
            echo '❌ Build başarısız! Ekip bilgilendiriliyor...'
        }
    }
}`,
          },
          { type: 'heading', text: 'Environment Variable Kullanımı' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Değişkenler ve credential kullanımı',
            code: `pipeline {
    agent any

    environment {
        APP_ENV   = 'staging'              // Özel değişken
        DB_CREDS  = credentials('db-id')  // Jenkins Credentials (log\'da maskelenir)
        // Jenkins otomatik oluşturur: DB_CREDS_USR, DB_CREDS_PSW
    }

    stages {
        stage('Test') {
            steps {
                sh 'echo \${APP_ENV} ortamında çalışıyor'
                sh 'pytest tests/ --env=\${APP_ENV}'

                // Jenkins\'in yerleşik değişkenleri:
                echo "Build:     \${env.BUILD_NUMBER}"
                echo "Job:       \${env.JOB_NAME}"
                echo "Branch:    \${env.GIT_BRANCH}"
                echo "Workspace: \${env.WORKSPACE}"
                echo "URL:       \${env.BUILD_URL}"
            }
        }
    }
}`,
          },
          { type: 'heading', text: 'Koşullu Stage\'ler (when directive)' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Sadece main branch\'te deploy et, production için onay iste',
            code: `pipeline {
    agent any

    stages {
        stage('Test') {
            steps { sh 'pytest tests/' }
        }

        stage('Staging\'e Deploy') {
            when { branch 'main' }       // Sadece main branch\'te çalışır
            steps { sh './deploy-staging.sh' }
        }

        stage('Production\'a Deploy') {
            when {
                branch 'main'
                environment name: 'AUTO_DEPLOY', value: 'false'
            }
            options {
                timeout(time: 2, unit: 'HOURS')  // 2 saat sonra otomatik iptal
            }
            steps {
                input message: 'Production\'a deploy edilsin mi?',
                      submitter: 'admin,qa-lead'   // Sadece bu kullanıcılar onaylayabilir
                sh './deploy-prod.sh'
            }
        }
    }
}`,
          },
          {
            type: 'quiz',
            question: 'Declarative Pipeline\'da, stage içinde çalıştırılacak shell komutlarını hangi keyword tanımlar?',
            options: [
              { id: 'a', text: 'steps' },
              { id: 'b', text: 'commands' },
              { id: 'c', text: 'run' },
              { id: 'd', text: 'execute' },
            ],
            correct: 'a',
            explanation: '"steps" bloğu bir stage içinde gerçek komutları (sh, echo, git vb.) içerir. Hiyerarşi: pipeline → stages → stage → steps.',
          
        retryQuestion: {
      "question": "Jenkins Declarative Pipeline yapısında, bir stage içerisindeki mantıksal iş parçacıklarının veya terminal komutlarının yerleştirildiği tanımlayıcı aşağıdakilerden hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "actions"
            },
            {
                  "id": "b",
                  "text": "steps"
            },
            {
                  "id": "c",
                  "text": "scripts"
            },
            {
                  "id": "d",
                  "text": "tasks"
            }
      ],
      "correct": "b",
      "explanation": "Declarative Pipeline'da 'steps' bloğu, o stage içinde çalışacak olan betiklerin ve komutların (shell, bat vb.) bulunduğu zorunlu bölümdür."
}
},
        ],
      },

      // ── SECTION 3: QA INTEGRATION (TR) ────────────────────────────────────
      {
        title: '🧪 QA Araç Entegrasyonu',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧪',
            content: 'QA entegrasyonu, Jenkins\'in testleri nasıl çalıştıracağını ve sonuçları güzel raporlar olarak yayınlayacağını bilmesi demektir. Her commit test suite\'ini tetikler. Bir şey bozulursa Jenkins, kimse fark etmeden önce başarısız test raporuna link içeren Slack mesajı gönderir.',
          },
          { type: 'heading', text: 'Jenkins\'te pytest Çalıştırma' },
          {
            type: 'code',
            language: 'groovy',
            label: 'HTML raporlu ve Slack bildirimli tam pytest pipeline',
            code: `pipeline {
    agent any

    stages {
        stage('Kurulum') {
            steps {
                sh 'python3 -m venv venv'                                   // Sanal ortam oluştur
                sh '. venv/bin/activate && pip install -r requirements.txt' // Bağımlılıkları kur
            }
        }

        stage('API Testleri') {
            steps {
                sh '''. venv/bin/activate && pytest tests/api/ \\
                    --html=reports/report.html \\   // HTML raporu
                    --self-contained-html \\        // Tek dosya rapor
                    -v \\                           // Verbose çıktı
                    --tb=short \\                  // Kısa traceback
                    -n 4 \\                        // Paralel (pytest-xdist)
                    --junitxml=reports/junit.xml   // Jenkins için JUnit format
                '''
            }
        }
    }

    post {
        always {
            junit 'reports/junit.xml'              // UI\'da test trend grafiği gösterir
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'report.html',
                reportName: 'pytest Raporu'
            ])
        }
        failure {
            slackSend(
                channel: '#qa-uyarilari',
                color: 'danger',
                message: "❌ BAŞARISIZ: \${env.JOB_NAME} #\${env.BUILD_NUMBER} → \${env.BUILD_URL}"
            )
        }
    }
}`,
          },
          { type: 'heading', text: 'Jenkins\'te JMeter Load Testleri' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Performance trend\'li JMeter non-GUI mode',
            code: `pipeline {
    agent any

    environment {
        JMETER_HOME = '/opt/jmeter'
        TEST_PLAN   = 'tests/load/api-load-test.jmx'
    }

    stages {
        stage('Load Test') {
            steps {
                sh """
                    \${JMETER_HOME}/bin/jmeter \\
                        -n \\                              // Non-GUI mod (CI\'da GUI KULLANMA)
                        -t \${TEST_PLAN} \\                // Test planı (.jmx dosyası)
                        -l results/results.jtl \\         // Ham sonuçlar
                        -e \\                             // HTML rapor oluştur
                        -o reports/jmeter/ \\             // HTML rapor dizini
                        -Jthreads=100 \\                  // Thread sayısını override et
                        -Jrampup=60 \\                   // Ramp-up süresini override et
                        -Jduration=300                    // Test süresini override et
                """
            }
        }
    }

    post {
        always {
            perfReport 'results/results.jtl'              // Performance Trend plugin
            publishHTML([
                reportDir: 'reports/jmeter',
                reportFiles: 'index.html',
                reportName: 'JMeter Load Raporu'
            ])
        }
    }
}`,
          },
          { type: 'heading', text: 'Jenkins\'te Playwright Testleri (En İyi Pratik)' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Resmi Docker image ile Playwright — browser kurulumuna gerek yok',
            code: `pipeline {
    agent {
        docker {
            // Resmi Microsoft Playwright image — browser\'lar önceden kurulu!
            image 'mcr.microsoft.com/playwright:v1.42.0-jammy'
            args  '-u root'   // Container içinde root olarak çalıştır
        }
    }

    stages {
        stage('Kur') {
            steps {
                sh 'npm ci'   // Temiz kurulum (CI\'da npm install\'dan daha hızlı)
            }
        }

        stage('E2E Testler') {
            steps {
                sh '''
                    npx playwright test \\
                        --reporter=html \\
                        --reporter=junit,outputFile=results/junit.xml \\
                        --output=test-results/
                '''
            }
        }
    }

    post {
        always {
            junit 'results/junit.xml'
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Raporu'
            ])
            archiveArtifacts artifacts: 'test-results/**/*.png',
                             allowEmptyArchive: true
        }
    }
}`,
          },
          { type: 'heading', text: 'Zengin Slack Bildirimleri' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Build detaylarıyla Slack bildirimleri',
            code: `// Gerekli: Slack Notification Plugin + Jenkins\'te workspace yapılandırması
pipeline {
    agent any
    stages { /* ...stage\'lerin... */ }

    post {
        success {
            slackSend(
                channel: '#qa-sonuclari',
                color: 'good',   // yeşil
                message: """
✅ *BAŞARILI*: \${env.JOB_NAME} #\${env.BUILD_NUMBER}
Branch: \${env.GIT_BRANCH}
Süre: \${currentBuild.durationString}
Rapor: <\${env.BUILD_URL}pytest-Raporu|Buraya tıkla>"""
            )
        }
        failure {
            slackSend(
                channel: '#qa-uyarilari',
                color: 'danger',
                message: """
❌ *BAŞARISIZ*: \${env.JOB_NAME} #\${env.BUILD_NUMBER}
Branch: \${env.GIT_BRANCH} | Commit: \${env.GIT_COMMIT?.take(7)}
Log: <\${env.BUILD_URL}console|Console Çıktısı>"""
            )
        }
    }
}`,
          },
          {
            type: 'quiz',
            question: 'Jenkins post action\'larında, build başarısız olsa bile test raporlarını HER ZAMAN yayınlamak için hangi blok kullanılır?',
            options: [
              { id: 'a', text: 'post { success { ... } }' },
              { id: 'b', text: 'post { always { ... } }' },
              { id: 'c', text: 'post { failure { ... } }' },
              { id: 'd', text: 'stages { cleanup { ... } }' },
            ],
            correct: 'b',
            explanation: 'post { always {} } build sonucundan bağımsız olarak çalışır — test raporlarını yayınlamak ve temizlik için mükemmeldir. Raporları sadece success{}\'a koyarsan, test başarısız olduğunda raporu kaybedersin.',
          
        retryQuestion: {
      "question": "Bir Jenkins Pipeline'da, build'in sonucu başarılı olsun ya da hata versin, her durumda çalışan bir 'post' bloğu hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "post { changed { ... } }"
            },
            {
                  "id": "b",
                  "text": "post { fixed { ... } }"
            },
            {
                  "id": "c",
                  "text": "post { always { ... } }"
            },
            {
                  "id": "d",
                  "text": "post { aborted { ... } }"
            }
      ],
      "correct": "c",
      "explanation": "always koşulu, build'in nihai durumuna (success, failure, unstable, aborted) bakılmaksızın her koşulda çalıştırılmasını sağlar. Bu özellik özellikle log temizleme veya bildirim gönderme süreçlerinde kullanılır."
    }
  },
  {
    type: 'interleaving-challenge',
    challenges: [
      {
        topic: 'Docker',
        questionTr: 'Bir test ortamını konteynerleştirirken, test raporlarının container kapandıktan sonra da makinenizde kalması için hangi yöntemi seçmelisiniz?',
        questionEn: 'When containerizing a test environment, which method should you choose to ensure test reports persist on your host machine after the container is destroyed?',
        optionsTr: [
          'docker exec komutunu kullanmak',
          'Host dizinini -v veya --volume ile container\'a mount etmek (Volume Bind Mount)',
          'ENV komutuyla ortam değişkeni tanımlamak',
          'Dockerfile içine EXPOSE 8080 eklemek'
        ],
        optionsEn: [
          'Using the docker exec command',
          'Mounting a host directory into the container using -v or --volume (Volume Bind Mount)',
          'Defining an environment variable with the ENV command',
          'Adding EXPOSE 8080 inside the Dockerfile'
        ],
        correct: 1,
        explanationTr: 'Volume bind mount sayesinde, container içindeki test raporları dizini host makinenizdeki bir klasöre yazılır ve container yok olsa bile raporlar kalıcı olur.',
        explanationEn: 'Using a volume bind mount allows the container to write test reports directly to a directory on the host machine, retaining them even after the container is destroyed.'
      },
      {
        topic: 'Jenkins',
        questionTr: 'Jenkinsfile\'da birden fazla QA test aşamasını (örneğin API ve UI testleri) paralel ve bağımsız agent\'lar üzerinde çalıştırmak için hangi direktif kullanılır?',
        questionEn: 'Which directive is used in a Jenkinsfile to run multiple QA test stages (e.g. API and UI tests) in parallel on independent agents?',
        optionsTr: [
          'stages',
          'parallel',
          'agent any',
          'post always'
        ],
        optionsEn: [
          'stages',
          'parallel',
          'agent any',
          'post always'
        ],
        correct: 1,
        explanationTr: 'parallel direktifi, altındaki stage\'leri eş zamanlı olarak farklı agent\'lar üzerinde paralel koşturarak build sürelerini kısaltır.',
        explanationEn: 'The parallel directive executes its child stages concurrently, potentially allocating them to different agents to decrease total build execution time.'
      },
      {
        topic: 'Kubernetes',
        questionTr: 'Kubernetes\'te bir Pod çöktüğünde (CrashLoopBackOff durumuna geldiğinde), Kubernetes\'in bu pod\'u otomatik olarak yeniden başlatmasına ne ad verilir?',
        questionEn: 'When a Pod crashes in Kubernetes (enters CrashLoopBackOff), what is the term for Kubernetes automatically restarting/replacing it?',
        optionsTr: [
          'Self-healing (Kendi kendini iyileştirme)',
          'Port Forwarding (Port yönlendirme)',
          'Horizontal Pod Autoscaling (Yatay ölçekleme)',
          'Rolling Update (Kesintisiz güncelleme)'
        ],
        optionsEn: [
          'Self-healing',
          'Port Forwarding',
          'Horizontal Pod Autoscaling',
          'Rolling Update'
        ],
        correct: 0,
        explanationTr: 'Self-healing (Kendi kendini iyileştirme), Kubernetes\'in istenen durum (desired state) ile mevcut durumu (current state) eşitlemek için çöken pod\'u otomatik olarak silip yenisini ayağa kaldırmasıdır.',
        explanationEn: 'Self-healing is a core Kubernetes capability where the controller manager detects a failed pod and automatically restarts or replaces it to maintain the desired replica count.'
      }
    ]
  },
  {
    type: 'visual',
    variant: 'flow',
    title: { tr: 'QA Otomasyon Pipeline Akışı', en: 'QA Automation Pipeline Flow' },
    steps: [
      { num: '1', label: { tr: 'Kod Değişikliği', en: 'Code Commit' }, desc: { tr: 'Geliştirici veya QA test kodunu GitHub\'a gönderir.', en: 'Developer or QA pushes code to Git repository.' } },
      { num: '2', label: { tr: 'Webhook Tetikleyici', en: 'Webhook Trigger' }, desc: { tr: 'GitHub webhook üzerinden Jenkins\'e otomatik bildirim gönderilir.', en: 'GitHub Webhook notifies Jenkins to start a new build.' } },
      { num: '3', label: { tr: 'Test Koşumu', en: 'Test Execution' }, desc: { tr: 'Jenkins agent üzerinde Playwright veya Selenium testleri başlatılır.', en: 'Runs Playwright/pytest/Newman tests on the build agent.' } },
      { num: '4', label: { tr: 'Rapor Arşivleme', en: 'Report Archiving' }, desc: { tr: 'JUnit XML veya HTML test raporları Jenkins master\'a yüklenir.', en: 'Uploads and stores HTML/Allure test reports on Master.' } },
      { num: '5', label: { tr: 'Slack / E-posta Bildirimi', en: 'Slack Notification' }, desc: { tr: 'Test başarısız olursa post-build ile Slack kanalına anında alarm gönderilir.', en: 'Sends instant Slack alert if any automation test fails.' } }
    ]
  }
],
},

      // ── SECTION 4: ADVANCED (TR) ───────────────────────────────────────────
      {
        title: '🚀 İleri Seviye Jenkins',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⚡',
            content: 'İleri seviye Jenkins, daha hızlı, akıllı ve güvenilir pipeline\'lar demektir. Paralellikle 500 testi 2 saat yerine 10 dakikada çalıştır, mükemmel izolasyon için Docker kullan, GitHub webhook\'larıyla build\'leri tetikle ve flaky testlerle zarif bir şekilde başa çık.',
          },
          { type: 'heading', text: 'Paralel Test Çalıştırma' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Cross-browser testleri aynı anda çalıştır',
            code: `pipeline {
    agent any

    stages {
        stage('Cross-Browser Testler') {
            parallel {
                stage('Chrome') {
                    steps {
                        sh 'pytest tests/ --browser=chrome --junitxml=reports/chrome.xml'
                    }
                    post { always { junit 'reports/chrome.xml' } }
                }
                stage('Firefox') {
                    steps {
                        sh 'pytest tests/ --browser=firefox --junitxml=reports/firefox.xml'
                    }
                    post { always { junit 'reports/firefox.xml' } }
                }
                stage('Safari') {
                    agent { label 'mac-agent' }   // Sadece Mac agent\'ta çalışmalı
                    steps {
                        sh 'pytest tests/ --browser=webkit --junitxml=reports/safari.xml'
                    }
                    post { always { junit 'reports/safari.xml' } }
                }
            }
        }
    }
}
// Sonuç: 3 browser aynı anda test eder — 3 kat daha hızlı!`,
          },
          { type: 'heading', text: 'Docker Build Agent Olarak Kullanma' },
          {
            type: 'code',
            language: 'groovy',
            label: 'Her stage kendi izole Docker container\'ında çalışır',
            code: `pipeline {
    agent none   // Global agent yok — her stage kendi agent\'ını tanımlar

    stages {
        stage('Python API Testleri') {
            agent {
                docker {
                    image 'python:3.12-slim'
                    args  '-v /tmp:/tmp'
                }
            }
            steps {
                sh 'pip install pytest requests'
                sh 'pytest tests/api/'
            }
        }

        stage('Playwright E2E Testleri') {
            agent {
                docker { image 'mcr.microsoft.com/playwright:v1.42.0-jammy' }
            }
            steps {
                sh 'npm ci && npx playwright test'
            }
        }
    }
}
// Jenkins sunucusuna Python veya Node.js kurmana gerek yok!
// Her container izoledir — bağımlılık çakışması yaşanmaz.`,
          },
          { type: 'heading', text: 'GitHub Webhook — Push\'ta Otomatik Tetikle' },
          {
            type: 'steps',
            items: [
              'Jenkins\'te: Job → Configure → Build Triggers → "GitHub hook trigger for GITScm polling" seç',
              'GitHub\'da: Repository → Settings → Webhooks → Add webhook',
              'Payload URL: http://JENKINS_ADRESIN/github-webhook/ olarak ayarla',
              'Content type: application/json seç',
              '"Just the push event" seç (PR build\'leri için "Pull requests" da ekle)',
              '"Add webhook"\'e tıkla — GitHub test ping\'i gönderir; yeşil ✅ görünmeli',
            ],
          },
          { type: 'heading', text: 'Gerçek Hayat Senaryoları ve Çözümleri' },
          {
            type: 'error-dictionary',
            framework: 'Jenkins',
            errors: [
              {
                error: 'Selenium testleri lokalde çalışıyor ama Jenkins\'te başarısız oluyor',
                fullMessage: 'org.openqa.selenium.WebDriverException: unknown error: Chrome failed to start',
                cause: {
                  tr: 'Jenkins headless bir Linux sunucusunda çalışır, ekran yoktur. Chrome/Firefox görsel pencere açmaya çalışır — ama DISPLAY ortam değişkeni yoktur. Container\'ların içinde --no-sandbox flag\'i de gereklidir.',
                },
                solution: {
                  tr: '1) Browser seçeneklerine --headless ekle. 2) --no-sandbox ve --disable-dev-shm-usage flag\'lerini ekle. 3) En iyi çözüm: her şeyin önceden yapılandırıldığı resmi Playwright veya Selenium Docker image\'ını kullan.',
                },
                codeWrong: `# ❌ Jenkins'te başarısız — görsel pencere açmaya çalışır
from selenium import webdriver
driver = webdriver.Chrome()  # CI sunucusunda ekran yok!`,
                codeFixed: `# ✅ Jenkins'te çalışır — headless mode
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

opts = Options()
opts.add_argument('--headless')              # GUI gerekmez
opts.add_argument('--no-sandbox')            # Docker/CI'da zorunlu
opts.add_argument('--disable-dev-shm-usage') # /dev/shm bellek sorunlarını önler
opts.add_argument('--window-size=1920,1080') # Viewport boyutunu ayarla

driver = webdriver.Chrome(options=opts)
driver.get('https://example.com')`,
              },
              {
                error: 'Flaky testler pipeline\'ı rastgele bozuyor',
                fullMessage: 'Build #45 BAŞARISIZ — 1 test başarısız. Build #46 BAŞARILI — aynı kod, aynı test.',
                cause: {
                  tr: 'Flaky test: aynı kodla bazen geçen, bazen başarısız olan test. Sebepler: timing/bekleme sorunları, test sırası bağımlılığı, race condition, dış servis kararsızlığı.',
                },
                solution: {
                  tr: '1) Otomatik retry için pytest-rerunfailures ekle. 2) Bilinen flaky testleri ayrı bir stage\'e al, "failure" yerine "unstable" kullan. 3) Bilinen flaky testin production deployment\'larını engellemesine asla izin verme.',
                },
                codeWrong: `# ❌ Retry yok — bir flaky test tüm pipeline'ı bozar
sh 'pytest tests/'  // İlk başarısızlık = kırmızı build`,
                codeFixed: `# ✅ Otomatik retry ile — flaky testler 3 şans alır
sh 'pytest tests/ --reruns 3 --reruns-delay 2'

# Daha iyisi: Jenkinsfile'da izole et
stage('Flaky Testler') {
    steps {
        sh 'pytest tests/ -m flaky --reruns 3'
    }
    post {
        failure { unstable('Flaky testler 3 denemeden sonra da başarısız') }
    }
}`,
              },
              {
                error: 'Pipeline executor bekleyerek takılıp kalıyor',
                fullMessage: 'Still waiting to schedule task — waiting for next available executor.',
                cause: {
                  tr: 'Tüm Jenkins executor\'ları meşgul, gerekli label\'a sahip agent offline, veya input() adımı insan onayını sonsuza kadar bekliyor.',
                },
                solution: {
                  tr: '1) Agent\'larda executor sayısını artır (Jenkins admin). 2) Pipeline\'daki agent label\'ının online bir agent\'la eşleştiğini kontrol et. 3) Input step\'lere her zaman timeout() ekle. 4) Executor açlığını önlemek için Docker agent kullan.',
                },
                codeWrong: `stage('Onay') {
    steps {
        input 'Production\'a deploy edilsin mi?'
        // ❌ Kimse yanıtlamazsa sonsuza kadar bekler
    }
}`,
                codeFixed: `stage('Onay') {
    options {
        timeout(time: 2, unit: 'HOURS')  // ✅ 2 saat sonra otomatik iptal
    }
    steps {
        input message: 'Production\'a deploy edilsin mi?',
              submitter: 'admin,qa-lead'  // Kimin onaylayabileceğini kısıtla
    }
}`,
              },
            ],
          },
          {
            type: 'quiz',
            question: 'Birden fazla Jenkins stage\'ini AYNI ANDA çalıştırmak için hangi directive kullanılır?',
            options: [
              { id: 'a', text: 'Her stage\'e "concurrent: true" ekle' },
              { id: 'b', text: 'Üst stage içinde "parallel { stage(...) }" kullan' },
              { id: 'c', text: 'Birden fazla ayrı Jenkinsfile oluştur' },
              { id: 'd', text: 'Pipeline bloğuna "async: true" ekle' },
            ],
            correct: 'b',
            explanation: '"parallel { }" directive\'i bir stage içinde iç içe stage\'leri eş zamanlı çalıştırır. Bu şekilde Chrome, Firefox ve Safari\'yi aynı anda test edip toplam süreyi 3\'e bölersin.',
          
        retryQuestion: {
      "question": "Jenkins Pipeline üzerinde birden fazla işin (task) birbirini beklemeden eş zamanlı olarak yürütülmesi için doğru yapılandırma hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "stage içinde \"multi-thread: true\" parametresini kullanmak"
            },
            {
                  "id": "b",
                  "text": "parallel bloğu içerisinde ayrı stage tanımları yapmak"
            },
            {
                  "id": "c",
                  "text": "Tüm pipeline'ı tek bir stage içine alıp \"sequential: false\" yapmak"
            },
            {
                  "id": "d",
                  "text": "Her job için ayrı bir jenkins agent tanımlayıp pipe ile bağlamak"
            }
      ],
      "correct": "b",
      "explanation": "Jenkins Pipeline'da birden fazla işi paralel çalıştırmak için 'parallel' bloğu kullanılır. Bu blok, içine yazılan stage'leri veya komutları aynı anda başlatarak kaynakların verimli kullanılmasını sağlar."
    }
  },
  {
    type: 'simulation',
    icon: '🔧',
    color: '#ef4444',
    title: { tr: 'CI/CD Pipeline — Canlı Simülasyon', en: 'CI/CD Pipeline — Live Simulation' },
    scenario: 'jenkins-pipeline',
    description: {
      tr: '"▶ Build Başlat" butonuna bas: Checkout → Build → Test → SonarQube → Deploy aşamalarını canlı izle. Her stage tamamlanınca Jenkinsfile\'da yeşile döner.',
      en: 'Press "▶ Start Build": watch Checkout → Build → Test → SonarQube → Deploy stages execute live. Each stage turns green in the Jenkinsfile on the right as it completes.',
    },
    code: `// Jenkinsfile — Declarative Pipeline
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { git branch: 'main', url: 'https://github.com/org/repo.git' }
        }
        stage('Build') {
            steps { sh 'mvn clean package -DskipTests' }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
                junit '**/target/surefire-reports/*.xml'
            }
        }
        stage('SonarQube') {
            steps {
                withSonarQubeEnv('SonarCloud') { sh 'mvn sonar:sonar' }
                waitForQualityGate abortPipeline: true
            }
        }
        stage('Deploy') {
            when { branch 'main' }
            steps { sh './scripts/deploy-staging.sh' }
        }
    }
}`,
    language: 'groovy'
  }
],
},

      // ── SECTION 5: GERÇEK HAYAT ─────────────────────────────────────────────
      {
        title: '🛠️ Gerçek Hayat',
        blocks: [
          { type: 'simple-box', emoji: '🛠️', content: "Jenkins, bir fabrika montaj hattı ustabaşı gibidir — yeni bir parça (commit) geldiği anda, ustabaşı onu otomatik olarak muayeneden (build), kalite kontrolden (test) ve paketlemeden (deploy) geçirir, kimsenin elle itmesine gerek kalmadan." },
          { type: 'heading', text: 'Hangi İhtiyaca Cevap Verir? Jenkins Olmadan Hayat Nasıl Zordu' },
          { type: 'text', content: "CI/CD sunucusu olmadan, her build ve test çalıştırması manuel bir ayindir: geliştirici en güncel kodu çeker, build\'i lokalde çalıştırır, test süitini lokalde çalıştırır (hatırlarsa) ve ancak ondan sonra merge eder. 'Benim makinemde çalışıyor' doğrulanamaz olduğu için hatalar sızar, ve elle yapması çok uzun sürdüğü için her merge öncesi kimse tam regresyon süitini çalıştırmaz. Jenkins bunu otomatikleştirir — böylece her tek commit her seferinde aynı şekilde build edilir ve test edilir, deadline baskısı altında hiçbir insan bir adımı atlayamaz." },
          { type: 'heading', text: 'Gerçek Senaryo: Spring Boot + React Monorepo' },
          { type: 'text', content: "Bir ekip aynı monorepo\'dan bir Spring Boot backend ve bir React frontend\'i ship ediyor. QA lead\'e şu görev veriliyor: 'Her pull request\'in otomatik olarak build edilip test edildiği ve hiçbir insan merge etmeden önce manuel review için bir preview ortamının hazır olduğu bir pipeline kur.'" },
          {
            type: 'steps',
            items: [
              'Repo köküne şu stage\'leri içeren bir Jenkinsfile oluştur: Checkout → Backend Build (Maven) → Frontend Build (npm) → Unit Tests (JUnit + Jest, paralel çalışır) → Selenium E2E (docker-compose stack\'ine karşı) → SonarQube scan → Preview\'a Deploy',
              'Her PR açıldığında/güncellendiğinde Jenkins\'in otomatik tetiklenmesi için bir GitHub webhook\'u yapılandır — elle "Build Now" tıklamasına gerek yok',
              'Backend ve frontend unit testlerini eş zamanlı çalıştırmak için parallel { } directive\'ini kullan, pipeline süresini 12 dakikadan 5 dakikaya indir',
              'docker-compose ile tüm stack\'i ayağa kaldıran, E2E süitini ona karşı çalıştıran ve sonra söken bir Selenium stage\'i ekle — unit testlerin göremediği entegrasyon hatalarını yakala',
              'Herhangi bir reviewer\'ın tam olarak hangi testin neden başarısız olduğuna tıklayabilmesi için JUnit XML + Allure HTML raporunu build artifact olarak yayınla',
              'PR status check\'i yapılandır: Jenkins doğrudan GitHub PR\'ında pending/success/failure raporlar, pipeline yeşil olana kadar merge butonunu engeller',
              'İlk gerçek yakalama: bir frontend değişikliği backend test süitinin kontrol etmediği bir API sözleşmesini bozdu — E2E stage\'i başarısız oldu, PR engellendi ve hata asla main\'e ulaşmadı',
            ]
          },
          { type: 'heading', text: 'Jenkins\'i Alternatiflerle Karşılaştırma — Gerçek Hayat Trade-off\'ları' },
          {
            type: 'table',
            headers: ['Araç', 'Avantajlar ✅', 'Dezavantajlar ❌', 'Ne zaman tercih edilmeli?'],
            rows: [
              ['Jenkins', 'Ücretsiz, self-hosted (tam kontrol), 1800+ plugin, herhangi bir dil/stack ile çalışır', 'Sunucuyu sen yönetirsin (upgrade, güvenlik yaması), Groovy DSL\'in öğrenme eğrisi var', 'Organizasyon on-prem/self-hosted CI, karmaşık özel pipeline\'lar gerektiriyorsa veya zaten büyük bir legacy plugin ekosistemi varsa'],
              ['GitHub Actions', 'Yönetilecek sıfır altyapı, kodun yanında yaşar, hazır action\'lardan oluşan büyük bir marketplace', 'GitHub\'a vendor lock-in, yüksek build hacminde pahalılaşabilir', 'Repo zaten GitHub\'da yaşıyorsa ve sunucu bakımı olmadan en hızlı CI yoluna ihtiyaç varsa'],
              ['GitLab CI', 'GitLab\'a yerleşik, mükemmel yerleşik Docker registry ve Kubernetes entegrasyonu', 'En iyi deneyim için uçtan uca GitLab kullanmak gerekir', 'Organizasyon zaten kaynak kontrolü için GitLab\'da standartlaşmışsa ve tek bir birleşik araç istiyorsa'],
            ]
          },
          { type: 'heading', text: 'Gerçek Hayat Entegrasyon Akışı' },
          {
            type: 'visual', variant: 'flow',
            title: 'Bir Jenkins Pipeline\'ı Gerçekten Nasıl Bir Merge Kararına Ulaşır',
            steps: [
              { num: '1', label: 'Dev PR açar', desc: 'git push origin feature-branch' },
              { num: '2', label: 'Webhook tetiklenir', desc: 'GitHub Jenkins\'i anında bilgilendirir', highlight: true },
              { num: '3', label: 'Pipeline çalışır', desc: 'Build → Test → Selenium E2E → Scan' },
              { num: '4', label: 'Status gönderilir', desc: 'PR\'da yeşil tik veya kırmızı X' },
              { num: '5', label: 'Reviewer karar verir', desc: 'Merge butonu sadece yeşilse aktif', highlight: true },
              { num: '6', label: 'Deploy stage', desc: 'main\'e merge\'de: staging\'e otomatik deploy' },
            ],
            note: 'Hiçbir insan test süitini elle çalıştırmaz — pipeline her tek merge için kapı bekçisidir.',
          },
          { type: 'heading', text: 'Uygulamalı Mini Proje — Kendin Dene' },
          { type: 'text', content: 'Gerçek bir çok aşamalı pipeline\'ın çalıştığını görmek için bunu package.json olan herhangi bir küçük repo\'da bir Jenkinsfile\'a yapıştır.' },
          {
            type: 'code', code: `pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { sh 'npm install' }
        }
        stage('Test') {
            steps { sh 'npm test -- --reporters=default --reporters=jest-junit' }
        }
        stage('Build') {
            steps { sh 'npm run build' }
        }
    }
    post {
        always {
            junit 'junit.xml'
        }
    }
}
// Bu dosyayı push et, repo'yu işaret eden bir Jenkins Pipeline job'u
// oluştur, "Build Now"a tıkla — her stage'in gerçek zamanlı olarak
// yeşil/kırmızı yandığını izle.`
          },
          {
            type: 'quiz',
            question: 'Bir organizasyon tam kontrole sahip self-hosted CI istiyor, karmaşık özel pipeline\'lara ihtiyacı var ve zaten büyük bir legacy plugin ekosistemine sahip. Hangi araç buna en uygun, ve neden?',
            options: [
              { id: 'a', text: 'GitHub Actions, çünkü sıfır altyapı yönetimi gerektirir' },
              { id: 'b', text: 'Jenkins, çünkü ücretsizdir, self-hosted tam kontrol sağlar ve herhangi bir dil/stack için 1800+ plugin sunar' },
              { id: 'c', text: 'Hiçbiri — manuel deploy scriptleri her zaman daha basittir' },
              { id: 'd', text: 'GitLab CI, çünkü sadece GitHub repo\'larıyla çalışır' },
            ],
            correct: 'b',
            explanation: 'Jenkins, tam olarak bir organizasyonun CI\'ı kendi altyapısında (on-prem/self-hosted) çalıştırması gerektiğinde, pipeline üzerinde tam kontrol istediğinde ve zaten devasa plugin ekosistemine bağımlı olduğunda doğru seçimdir. GitHub Actions bu kontrolü sıfır altyapı yönetimi ve sıkı GitHub entegrasyonuyla takas eder — bu, repo\'su zaten GitHub\'da yaşayanlar için harikadır ama vendor lock-in getirir ve yüksek build hacminde pahalılaşabilir — doğru araç ham popülerliğe değil, organizasyonun hosting ve ekosistem kısıtlarına bağlıdır.',
            retryQuestion: {
              question: 'Var olan bir altyapı ekibi olmayan, repo\'su zaten GitHub\'da olan ve ops yükünü minimize etmek isteyen bir startup bir CI aracı seçiyor. Burada GitHub Actions\'ı Jenkins\'e karşı en güçlü destekleyen faktör hangisidir?',
              options: [
                { id: 'a', text: 'GitHub Actions Jenkins\'ten daha fazla plugin\'e sahiptir' },
                { id: 'b', text: 'Provision veya bakım gerektiren sıfır altyapı — kimsenin bir Jenkins sunucusunu çalıştırması, yamalaması veya ölçeklendirmesi gerekmez' },
                { id: 'c', text: 'GitHub Actions kullanımdan bağımsız her zaman ücretsizdir' },
                { id: 'd', text: 'Jenkins GitHub ile hiç entegre olamaz' },
              ],
              correct: 'b',
              explanation: 'Özel altyapı/ops kapasitesi olmayan küçük bir ekip için Jenkins\'in en büyük pratik maliyeti aracın kendisi değildir — zamanla Jenkins sunucusunu (ve agent\'larını) çalıştırmak, yamalamak ve ölçeklendirmektir. GitHub Actions, GitHub runner\'ları yönettiği için bu işin tamamını ortadan kaldırır — bu, bu spesifik ekip için Jenkins\'in büyük plugin ekosisteminden (ki bu ekip muhtemelen zaten tam kapasitesine ihtiyaç duymayacaktır) çok daha önemlidir.',
            },
          },
        ],
      },

      // ── SECTION 6: EKOSİSTEM ────────────────────────────────────────────────
      {
        title: '🔗 Ekosistem',
        blocks: [
          { type: 'simple-box', emoji: '🔗', content: "Tek başına Jenkins, orkestrası olmayan bir şef gibidir — müziğin ne zaman başlayacağını bilir ama enstrümanları sağlaması için Docker'a (tutarlı ortamlar), notaları sağlaması için Git'e (tek doğruluk kaynağı), ve seyirciye performansın nasıl geçtiğini söylemesi için Slack'e ihtiyacı vardır." },
          { type: 'heading', text: 'Jenkins Büyük Resme Nasıl Uyuyor' },
          { type: 'text', content: 'Tek başına Jenkins bir orkestratördür — kendisi hiçbir şey build etmez, test etmez veya deploy etmez, bu işi yapması için bir tetikleyici üzerine diğer araçları çağırır. Gerçek değeri onu tetikleyen bir versiyon kontrol sistemine, her build\'e temiz ve tekrarlanabilir bir ortam veren bir container runtime\'a, merge\'leri sadece "testler geçti" den fazlasıyla kapılayan bir kod kalite tarayıcısına ve döngüyü insanlara geri kapatan bir bildirim sistemine bağlanmasından gelir.' },
          {
            type: 'visual', variant: 'boxes',
            title: 'Jenkins Ekosistemi — Kim Kiminle Konuşuyor',
            items: [
              { icon: '🐙', label: 'Git / GitHub', desc: 'push/PR\'da webhook Jenkins\'i tetikler' },
              { arrow: true },
              { icon: '🔧', label: 'Jenkins', desc: 'pipeline aşamalarını orkestre eder' },
              { arrow: true },
              { icon: '🐳', label: 'Docker', desc: 'temiz, tekrarlanabilir build agent\'ları sağlar', highlight: true },
              { arrow: true },
              { icon: '🔍', label: 'SonarQube', desc: 'merge\'leri kod kalitesi/coverage ile kapılar' },
              { arrow: true },
              { icon: '💬', label: 'Slack / Email', desc: 'ekibe pass/fail bildirir', highlight: true },
            ],
            note: 'Her araç kendi işini iyi yapar — Git tetikler, Jenkins orkestre eder, Docker izole eder, SonarQube kapılar, Slack bildirir.',
          },
          { type: 'heading', text: 'Üç Temel İlişki' },
          {
            type: 'table',
            headers: ['İlişki', 'Nasıl Birlikte Çalışırlar', 'Hangi Sorunu Çözer'],
            rows: [
              ['Jenkins ↔ Git/GitHub', 'Her push/PR\'da bir webhook tetiklenir, pipeline\'ı sıfır manuel tıklamayla otomatik başlatır', 'İnsan darboğazını ortadan kaldırır — kimse merge öncesi testleri çalıştırmayı unutamaz'],
              ['Jenkins ↔ Docker', 'Her pipeline çalıştırması build agent olarak taze container\'lar başlatır, her seferinde aynı Node/Java/Python sürümünü garanti eder', '"Benim makinemde çalışıyor" sorununu ortadan kaldırır — CI ortamı her tek build için aynıdır'],
              ['Jenkins ↔ Kubernetes', 'Jenkins build edilen Docker image\'ını pipeline\'ın son aşaması olarak doğrudan bir K8s cluster\'ına deploy edebilir (kubectl apply)', '"Kod merge edildi" ile "kod staging/production\'da çalışıyor" arasını manuel bir deploy adımı olmadan bağlar'],
              ['Jenkins ↔ SonarQube', 'Bir pipeline aşaması bir SonarQube taraması çalıştırır ve Quality Gate merge\'e izin vermeden önce pass/fail karar verir', 'Sadece bozuk kodu değil, yeni güvenlik açığı, kod tekrarı veya düşen test coverage\'ı olan kodu da engeller'],
            ]
          },
          { type: 'heading', text: 'Jenkins Diğer QA/DevOps Araçları Yanında Nerede Duruyor' },
          { type: 'text', content: 'Tipik bir pipeline\'da: Git Jenkins\'i tetikler → Jenkins uygulamayı build etmek için bir Docker container başlatır → unit testleri, ardından başka bir container içinde Selenium/Playwright E2E testlerini çalıştırır → SonarQube kalite kapıları için tarar → başarılı olursa Jenkins image\'ı bir registry\'e push eder ve bir Kubernetes deploy\'u tetikler → Slack sonucu duyurur. QA mühendisleri Jenkins\'e en çok bu pipeline\'ın test aşamalarını eklerken veya debug ederken dokunur.' },
          {
            type: 'quiz',
            question: 'Jenkins\'in her pipeline çalıştırmasında build agent olarak taze bir Docker container başlatmasının temel avantajı nedir?',
            options: [
              { id: 'a', text: 'Pipeline YAML\'ını kısaltır' },
              { id: 'b', text: 'Her seferinde aynı Node/Java/Python sürümünü garanti eder, "bende çalışıyor" tarzı CI başarısızlıklarını ortadan kaldırır' },
              { id: 'c', text: 'Jenkinsfile ihtiyacını ortadan kaldırır' },
              { id: 'd', text: 'Otomatik olarak production\'a deploy eder' },
            ],
            correct: 'b',
            explanation: 'Taze container olmadan, bir Jenkins agent\'ının kurulu araç sürümleri zamanla kayabilir (bir plugin güncellemesi, manuel kurulan bir bağımlılık, bir OS yaması) — bu da bir build\'in bir çalıştırmada geçip kod değişikliği olmadan başka bir çalıştırmada gizemli şekilde başarısız olmasına yol açar. Belirli bir image\'a sabitlenmiş taze bir Docker container başlatmak, her tek build\'in byte-identik araçlarla başlamasını garanti eder — bu, "bende çalışıyor"un geliştirici laptop\'ları için tanımladığı aynı kök neden sınıfıdır.',
            retryQuestion: {
              question: 'Bir Jenkins pipeline\'ı build container\'ını sadece `maven:latest` yerine `maven:3.9.6-eclipse-temurin-17`a sabitliyor. Tam tag\'i sabitlemek neden önemlidir?',
              options: [
                { id: 'a', text: 'Build\'i daha hızlı çalıştırır' },
                { id: 'b', text: '`maven:latest` zamanla sessizce farklı, daha yeni bir image\'a işaret edebilir, sabitlenmiş bir image\'ın önlemeyi amaçladığı tam sürüm kayması sorununu yeniden ortaya çıkarır' },
                { id: 'c', text: 'Jenkins tam bir tag olmadan image pull edemez' },
                { id: 'd', text: 'Bir Dockerfile ihtiyacını tamamen ortadan kaldırır' },
              ],
              correct: 'b',
      "explanation": "`:latest` sabit bir sürüm değildir — o tag altında en son yayınlanan image\'a yeniden atanan hareketli bir işaretçidir. `maven:latest` kullanan bir pipeline, hiçbir kod değişikliği olmadan gelecek ay farklı bir Maven/JDK sürümüyle sessizce build etmeye başlayabilir, bu da bir Docker image\'ını sabitlemenin başta çözmesi gereken aynı \"dün geçti, bugün başarısız oluyor\" kayma sorununu yeniden yaratır.",
    }
  },
  {
    type: 'feynman-checkpoint',
    prompt: 'Explain how parallel test execution in Jenkins affects resource management, and why a test team should care, in simple terms (as if explaining to a 5-year-old).',
    promptTr: 'Jenkins\'te paralel test koşumunun kaynak yönetimini (CPU/Memory/Network) nasıl etkilediğini ve test ekibinin bunu neden önemsemesi gerektiğini, 5 yaşındaki bir çocuğa anlatır gibi (teknik jargon kullanmadan) basit terimlerle açıkla.',
    keywords: [
      ['paralel', 'parallel', 'aynı anda', 'concurrent', 'simultaneous'],
      ['kaynak', 'resource', 'cpu', 'ram', 'hafıza', 'memory', 'sunucu', 'agent', 'executor'],
      ['yavaş', 'slow', 'çökme', 'crash', 'limit', 'darboğaz', 'bottleneck']
    ],
    modelAnswerEn: 'Running tests in parallel is like cooking multiple dishes on a stove at the same time. It makes dinner ready much faster, but if you put too many pots on the stove, you run out of burners or gas (CPU and memory), and everything might burn (crash). Test teams need to balance speed with how much resources they have.',
    modelAnswerTr: 'Paralel test koşmak, ocaktaki tüm gözlerde aynı anda farklı yemekler pişirmek gibidir. Akşam yemeği çok daha hızlı hazır olur, ama ocağa bir anda çok fazla tencere koyarsan gaz yetmeyebilir veya ocak taşabilir (CPU ve RAM tükenir, sistem çöker). Bu yüzden hızı ve kaynakları dengede tutmalıyız.',
    minScore: 2
  }
],
},

      // ── SECTION 7: INTERVIEW Q&A (TR) ─────────────────────────────────────
      {
        title: '💼 Jenkins Mülakat Soruları',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Jenkins CI/CD',
            questions: [
              // ── TEMEL ──────────────────────────────────────────
              {
                level: 'basic',
                q: { tr: 'Jenkins nedir ve yazılım geliştirmede neden kullanılır?' },
                a: { tr: 'Jenkins, Java ile yazılmış açık kaynaklı bir CI/CD otomasyon sunucusudur. Her developer kod push\'ladığında Jenkins otomatik olarak build eder, test eder ve opsiyonel olarak deploy eder. Hataları commit\'ten dakikalar içinde yakalar, manuel işi azaltır ve her değişiklikte tutarlı kalite sağlar. QA\'da Jenkins, test suite\'lerimizin yaşadığı ve çalıştığı yerdir — her commit Selenium, pytest veya Playwright testlerimizi otomatik olarak tetikler.' },
              },
              {
                level: 'basic',
                q: { tr: 'Continuous Integration ile Continuous Delivery arasındaki fark nedir?' },
                a: { tr: 'CI (Continuous Integration), her kod commit\'ini otomatik olarak build edip test eder — hataları erken yakalar. CD (Continuous Delivery), CI\'yı genişletir: testler geçtikten sonra staging\'e otomatik deploy eder, ama production için insan onayı gerekir. Continuous Deployment daha da ileri gider — production deploy da tamamen otomatiktir. QA\'da: CI, test suite\'lerimizin çalıştığı yerdir; CD, her zaman en son deploy edilmiş koda karşı test etmemizi sağlar.' },
              },
              {
                level: 'basic',
                q: { tr: 'Jenkinsfile nedir ve nerede bulunur?' },
                a: { tr: 'Jenkinsfile, tüm CI/CD pipeline\'ını Groovy tabanlı DSL kullanarak kod olarak tanımlayan bir metin dosyasıdır. Kaynak repository\'sinin kökünde (kodunla birlikte) yaşar, böylece versiyonlanır, PR\'larda code review\'dan geçirilir ve kod ile birlikte evrilir. Bu "Pipeline as Code" yaklaşımı, Jenkins GUI\'sinde tıklayarak yapılandırmayı kod öncelikli bir yaklaşımla değiştirdi. Faydaları: geçmiş, rollback, ekip review ve ortamlar arası tutarlılık.' },
              },
              {
                level: 'basic',
                q: { tr: 'Declarative Jenkins Pipeline\'ının ana bölümleri nelerdir?' },
                a: { tr: 'Temel bölümler: "pipeline" (kök blok), "agent" (nerede çalışacak — any, docker, label), "stages" (tüm stage\'lerin container\'ı), "stage" (Build/Test/Deploy gibi bir mantıksal adım), "steps" (gerçek komutlar: sh, echo, git) ve "post" (tamamlandıktan sonra: always, success, failure, unstable). "environment" bloğu değişken ve credential tutar. Analoji: pipeline fabrika, stage\'ler departman, step\'ler bireysel eylemdir.' },
              },
              {
                level: 'basic',
                q: { tr: 'Jenkinsfile\'da sh ile bat arasındaki fark nedir?' },
                a: { tr: '"sh", Linux/Mac agent\'larında shell komutları çalıştırır. "bat", Windows agent\'larında batch komutları çalıştırır. Cross-platform pipeline\'lar için isUnix() ile OS kontrol edilebilir. QA otomasyonunda "sh" neredeyse her zaman kullanılır çünkü CI/CD sunucuları genellikle Linux çalıştırır. Modern ekipler Docker agent kullanarak bu OS sorununu tamamen ortadan kaldırır — container OS her zaman Linux olur.' },
              },
              // ── ORTA SEVİYE ─────────────────────────────────────
              {
                level: 'intermediate',
                q: { tr: 'post { always }, post { success } ve post { failure } arasındaki fark nedir?' },
                a: { tr: 'post { always } build sonucundan bağımsız çalışır — temizlik, artifact arşivleme ve test raporu yayınlamak için kullan (başarısız olsa bile raporları görmek isteriz). post { success } sadece tüm stage\'ler geçtiğinde çalışır — deployment ve başarı bildirimleri için. post { failure } sadece pipeline başarısız olduğunda çalışır — Slack alert için. QA kuralı: raporları her zaman "always"\'de arşivle, asla sadece "success"\'de koyma.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Credential\'ları (parola, API token) Jenkins\'te güvenli şekilde nasıl geçirirsin?' },
                a: { tr: 'Jenkins\'in yerleşik Credentials store\'u vardır (Manage Jenkins → Credentials). Buraya gizli bilgileri eklersin (kullanıcı adı/parola, gizli metin, SSH anahtarı, sertifika). Jenkinsfile\'da environment bloğunda credentials("id") ile referans alırsın. Jenkins bunları log\'da "****" olarak maskeleyerek environment variable olarak enjekte eder. Asla Jenkinsfile\'a credential hardcode etme — Git\'e commit edilir ve repo erişimi olan herkes görebilir.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Jenkins build\'ini sadece belirli bir branch\'e kod push edildiğinde nasıl tetiklersin?' },
                a: { tr: 'Stage içinde "when" directive\'ini kullan: when { branch "main" }. PR build\'leri için: when { changeRequest() }. Birden fazla branch için: when { anyOf { branch "main"; branch "develop" } }. Alternatif olarak Multibranch Pipeline + Branch Source plugin kullan — Jenkins, Jenkinsfile\'ı olan her branch için otomatik job oluşturur. QA\'da: her branch\'te smoke test (2 dk), sadece main\'de full regression (20 dk) çalıştırırız.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Jenkins Agent nedir ve neden birden fazla agent kullanılır?' },
                a: { tr: 'Jenkins Agent, gerçek build/test işini çalıştıran bir makinedir. Controller (master) job\'ları organize eder ama çalıştırmamalıdır. Birden fazla agent şunları sağlar: makineler arası paralel çalışma, OS\'e özgü testler (Mac\'te Safari), gerçek cihazlarda test ve yük dağılımı. Agent fiziksel makine, VM veya Docker container olabilir. Label routing: agent { label "linux-docker" } eşleşen agent\'a işi gönderir.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Test artifact\'larını nasıl arşivler ve Jenkins\'ten indirilebilir yaparsın?' },
                a: { tr: 'archiveArtifacts kullan: archiveArtifacts artifacts: "reports/**", allowEmptyArchive: true. Bu dosyaları build sayfasından indirilebilir yapar. HTML raporlar için: publishHTML([reportDir: "reports", reportFiles: "index.html", reportName: "Test Raporu"]). JUnit için: junit "results/junit.xml" — job görünümünde trend grafiği gösterir. Her zaman allowEmptyArchive: true kullan; testler çalışmadan build ölürse hata vermez.' },
              },
              // ── İLERİ SEVİYE ────────────────────────────────────
              {
                level: 'advanced',
                q: { tr: '2 saat süren 500+ Selenium testi için Jenkins pipeline\'ını nasıl tasarlarsın?' },
                a: { tr: 'Testleri modüle göre paralel stage\'lere böl. Her birinde 50 test çalışan 10 Docker agent kullan = 2 saat yerine 12 dakika. Her agent içinde daha fazla paralelleşme için pytest-xdist kullan. Test etiketleme: smoke (5 dk, her PR), sanity (15 dk, günlük), regression (tam, gece/sadece main). Docker layer caching veya shared workspace ile pip bağımlılıklarını önbelleğe al. Stage\'leri dengeli tut — hiçbiri diğerinden 3x uzun olmamalı.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Jenkins Shared Library nedir ve bir QA ekibi ne zaman kullanır?' },
                a: { tr: 'Shared Library, organizasyondaki herhangi bir Jenkinsfile\'ın import edebileceği, ayrı bir Git repository\'sinde saklanan Groovy kodudur. QA ekipleri şunlar için kullanır: 20 farklı Jenkinsfile\'a Slack bildirim kodunu kopyalamaktan kaçınmak, raporların nasıl yayınlanacağını standartlaştırmak, credential yönetimini merkezileştirmek ve tekrar kullanılabilir pipeline şablonları oluşturmak. Kullanım: @Library("qa-lib") _ sonra herhangi bir Jenkinsfile\'dan publishReport(dir: "reports") çağır.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Lokalde çalışan ama Jenkins\'te başarısız olan bir pipeline\'ı nasıl debug edersin?' },
                a: { tr: 'Sistematik yaklaşım: 1) sh "env" ekleyerek tüm environment variable\'ları yazdır — PATH farklılıkları sorunların %80\'ine neden olur. 2) sh "pwd && ls -la" ekleyerek doğru dizinde olduğunu doğrula. 3) Tam Docker image ile lokalde reproduce et: docker run -it python:3.12-slim bash. 4) Commit etmeden Jenkinsfile\'ı değiştirmek için "Replay" özelliğini kullan. 5) Dosya izinlerini kontrol et — Jenkins kullanıcısının erişimi olmayabilir. 6) Java/Python versiyonlarını local ve CI arasında karşılaştır.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Deployment\'ları engellemeden flaky testlerle nasıl başa çıkarsın?' },
                a: { tr: 'Üç katmanlı strateji: 1) Otomatik retry: pytest --reruns 3 --reruns-delay 5 — 3 ardışık başarısızlıktan sonra başarısız olarak işaretle. 2) İzolasyon: @pytest.mark.flaky ile etiketle, ayrı stage\'de build\'i fail etmek yerine currentBuild.result = "UNSTABLE" kullan. 3) Takip: flaky test kaydı tut (JIRA + Allure history) — haftada 3\'ten fazla flake eden testi karantinaya al. Deployment pipeline sadece flaky olmayan testleri hard gate olarak kullanır; flaky test sonuçları bilgilendirme amaçlıdır.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Production\'daki bir Jenkins instance\'ını nasıl güvenceye alırsın?' },
                a: { tr: 'Temel önlemler: 1) Matrix Authorization etkinleştir — kullanıcı/grup başına izin (developer\'lar görebilir ama yapılandıramaz). 2) LDAP/Active Directory entegrasyonu kurumsal SSO için. 3) Credentials plugin — Jenkinsfile\'da sıfır gizli bilgi. 4) HTTPS\'li nginx arkasında çalıştır. 5) Jenkins CLI\'ı localhost ile kısıtla veya devre dışı bırak. 6) Plugin versiyonlarını sabitle ve denetle — incelenmemiş plugin\'ler saldırı yüzeyidir. 7) Ekip düzeyinde izolasyon için Role-Based Strategy plugin. 8) CSRF korumasını etkinleştir.' },
              },
              // ── TEMEL (ek) ──────────────────────────────────────
              { level: 'basic', q: { tr: "Takımın Groovy yazmadan hızlıca bir build job'ı prototiplemesi gerekiyor, ama sonra Git'te versiyonlanması lazım. Her aşamaya hangi Jenkins job tipi uyar ve nasıl geçiş yaparsın?" }, a: { tr: "Freestyle job'lar tamamen Jenkins UI üzerinden yapılandırılır — prototiplemek hızlıdır, ama yapılandırma sadece Jenkins'in iç XML'inde durur, repo'nda değil, bu yüzden code review veya Git ile rollback yapılamaz. Pipeline job'lar (Jenkinsfile) tüm CI/CD mantığını repo'da kod olarak versiyonlar, PR review, geçmiş ve branch'ler arası tekrar kullanım sağlar. Geçiş yolu: build adımlarının çalıştığını doğrulamak için Freestyle ile hızlıca prototiple, sonra bu adımları job takım için kalıcı bir bağımlılık olmadan önce declarative bir Jenkinsfile'a çevir ve commit et. QA'da neredeyse her test pipeline'ı Jenkinsfile olarak bitmeli — gece regresyon için bir Freestyle job, kimsenin review edemeyeceği görünmez bir teknik borca dönüşür." } },
              { level: 'basic', q: { tr: "CI'ın test başlatması 2 dakika fazladan sürüyor çünkü Jenkins Git repo'yu her 5 dakikada bir değişiklik için polluyor. Build'leri anında tetiklemeyi nasıl sağlarsın?" }, a: { tr: "SCM polling'i (pollSCM) bir webhook ile değiştir: GitHub/GitLab, push olduğu anda Jenkins'in /github-webhook/ endpoint'ine ping atar, bir sonraki poll döngüsünü beklemek yerine build'i saniyeler içinde tetikler. Polling ayrıca değişmemiş bir repo'yu tekrar tekrar kontrol ederek kaynak israf eder, webhook'lar ise push-bazlıdır ve sadece gerçek olaylarda tetiklenir. Trade-off: webhook'lar Jenkins'in Git host'undan erişilebilir olmasını gerektirir, polling ise Jenkins dışarıdan erişilemese dahi çalışır. Hızlı feedback'in önemli olduğu QA pipeline'larında webhook varsayılan seçimdir; polling kısıtlı network kurulumları için bir fallback'tir." } },
              { level: 'basic', q: { tr: "Yeni bir takım arkadaşı, hangi pipeline stage'inin başarısız olduğunu görmeye çalışırken klasik Jenkins UI'ını kafa karıştırıcı buluyor. Hangi özelliği önerirsin ve neden?" }, a: { tr: "Blue Ocean, Jenkins'in pipeline'ı soldan sağa stage akışı olarak görselleştiren modern UI'ıdır, başarısız stage kırmızıyla işaretlenir ve logları tek tıkla uzaktadır — klasik UI'ın düz console log'undan taramak çok daha kolaydır. Özellikle birçok paralel stage'i olan QA pipeline'ları için (unit, smoke, regression, deploy) faydalıdır; klasik UI sadece metin yığını gösterirken Blue Ocean tam olarak hangi paralel branch'in başarısız olduğunu gösterir. Pipeline davranışını değiştirmez, sadece görselleştirme katmanını, bu yüzden benimsemek hiçbir Jenkinsfile değişikliği gerektirmez. Yeni QA mühendislerini onboard eden takımlar için Blue Ocean 'build neden başarısız oldu' teşhis süresini önemli ölçüde kısaltır." } },
              { level: 'basic', q: { tr: 'QA, aynı Jenkinsfile\'ın tetikleme anında hızlı bir smoke suite\'i veya tam regresyon suite\'ini çalıştırmasını istiyor. Bunu iki ayrı pipeline olmadan nasıl uygularsın?' }, a: { tr: "Parametreli build'leri kullan: bir parametre tanımla (parameters { choice(name: 'SUITE', choices: ['smoke', 'regression'], description: '...') }), sonra bir stage içinde params.SUITE'e göre test komutunu dallandır. Elle tetiklendiğinde Jenkins suite seçmek için bir dropdown gösterir; webhook ile tetiklendiğinde hızlı feedback için varsayılan olarak 'smoke' kullanabilirsin. Bu, zamanla birbirinden uzaklaşan iki neredeyse aynı Jenkinsfile'ı sürdürmekten kaçındırır. Java analojisi: her grup için sınıfı çoğaltmak yerine, hangi test grubunun çalıştırılacağını komut satırı argümanı olarak alan tek bir test runner sınıfı gibi." } },
              { level: 'basic', q: { tr: "Jenkinsfile'ının JUnit sonuçlarını yayınlaması ve Slack uyarıları göndermesi gerekiyor, ama bu entegrasyon kodunu sıfırdan yazmak istemiyorsun. Bu fonksiyonelliği almanın Jenkins-native yolu nedir?" }, a: { tr: "İlgili plugin'leri kur — JUnit plugin'i, test XML raporlarını trend grafikleriyle parse edip görselleştiren junit step'ini ekler, Slack Notification plugin'i ise post bloklarında direkt kullanılabilen bir slackSend step'i ekler. Jenkins'in plugin ekosistemi en yaygın entegrasyonları (Git, Docker, JIRA, Allure, e-posta) kapsar, bu yüzden standart işler için nadiren özel Groovy'e ihtiyaç duyarsın. QA altyapısı için dikkat edilmesi gereken: plugin'ler incelenmeli ve versiyonu sabitlenmelidir, çünkü incelenmemiş veya eski bir plugin, herkesin bağımlı olduğu bir CI sunucusunda hem güvenlik hem stabilite riskidir." } },
              { level: 'basic', q: { tr: "Jenkinsfile'ındaki iki stage farklı agent'larda çalışıyor ve stage 1'de oluşturulan bir dosya (test raporu) stage 2'de kayboluyor. Gerçekte ne oluyor?" }, a: { tr: "Her Jenkins agent'ının kendi ayrı workspace'i vardır — Agent A'da stage 1'de yazılan dosyalar, stage 2'de Agent B'nin dosya sisteminde basitçe yoktur, agent'lar arasında otomatik senkronizasyon yoktur. Çözüm, her iki stage'i de aynı agent'a sabitlemek (her stage başına değil en üst seviyede agent { label 'same-node' }) veya stage 1'de stash, stage 2'de unstash kullanarak belirli dosyaları agent'lar arasında açıkça taşımaktır. QA için bu, build'i bir agent'ta, testleri başka bir agent'ta çalıştıran takımları sıkça ısırır — pipeline ortasında üretilen test raporları, agent değişikliğinden kurtulmak için açık bir stash/unstash gerektirir." } },
              { level: 'basic', q: { tr: "Her test koşumunun raporunun benzersiz isimlendirilmesi gerekiyor, böylece geçmiş koşumlar birbirinin üzerine yazmasın. Hangi Jenkins environment variable'ını nasıl kullanırsın?" }, a: { tr: "BUILD_NUMBER (veya BUILD_ID), Jenkins tarafından her pipeline koşumuna otomatik olarak enjekte edilir, her çalıştırmada artar — Jenkinsfile'da ${env.BUILD_NUMBER} olarak referans alıp results-${env.BUILD_NUMBER}.xml gibi rapor dosyalarını isimlendirebilirsin. Bu, build'leri sıralamak için timestamp'lerden daha güvenilirdir, çünkü BUILD_NUMBER her job için kesinlikle artan ve benzersizdir. Tam izlenebilir artifact'ler için JOB_NAME ve GIT_COMMIT ile birleştir: hangi job, hangi koşum, tam olarak hangi commit bu raporu üretti. Java analojisi: çakışabilecek bir wall-clock timestamp'e güvenmek yerine bir veritabanı auto-increment primary key'i gibi." } },
              { level: 'basic', q: { tr: "Kıdemli bir mühendis, takımının `node { }` blokları ve `if/else` Groovy mantığıyla yazılmış Jenkinsfile'ının 'Scripted' stilde olduğunu söylüyor ve 'Declarative'e geçmeyi öneriyor. Gerçekte fark ne ve yeniden yazmaya değer mi?" }, a: { tr: "Scripted pipeline'lar esasen tam Groovy programlarıdır (node {} ile başlar), tam programlama esnekliği verir ama review ve doğrulamayı zorlaştırır — syntax hataları genellikle sadece runtime'da ortaya çıkar. Declarative pipeline'lar sabit, yapılandırılmış bir syntax kullanır (pipeline { agent { } stages { } }), daha kısıtlayıcıdır ama okuması, lint'lenmesi ve çalıştırmadan önce doğrulanması daha kolaydır. Çoğunlukla build → test → report → notify yapan QA pipeline'ları için Declarative ihtiyaçların %95'ini karşılar ve geçişe değer; Scripted, Declarative'in `script {}` kaçış kapısının temiz ifade edemediği gerçekten karmaşık dallanma mantığı için ayrılmalıdır." } },
              { level: 'basic', q: { tr: "Jenkins Controller ile Jenkins Agent arasındaki fark nedir ve test suite'in neden Controller üzerinde direkt çalışmamalı?" }, a: { tr: "Controller (eski adıyla master), job'ları zamanlayan, UI'ı sunan ve yapılandırmayı saklayan merkezi Jenkins process'idir — orkestre etmesi, ağır iş yükü çalıştırması beklenmez. Agent'lar, gerçek build/test adımlarını çalıştıran ayrı makinelerdir (veya container'lardır); Controller işi label'lara göre onlara dağıtır. 500 testli bir Selenium suite'ini direkt Controller'da çalıştırmak, tüm Jenkins instance'ını kaynaktan aç bırakma riski taşır, UI'ı herkes için yanıtsız hale getirebilir veya diğer takımların job'larının scheduler'ını çökertebilir. En iyi pratik: Controller'ı job-execution'dan arındır (executors: 0) ve tüm gerçek işi label'lı agent'lara yönlendir." } },
              { level: 'basic', q: { tr: "QA liderin, loglara dalmadan 'son 20 koşumda hangi stage genelde en uzun sürüyor' sorusuna hızlı görsel bir cevap istiyor. Hangi Jenkins özelliği bunu bir bakışta verir?" }, a: { tr: "Pipeline Stage View (klasik job sayfasında görünür, Blue Ocean'da daha cilalı), her satırın bir build, her sütunun bir stage olduğu, süreye ve pass/fail durumuna göre renklendirilmiş bir grid çizer — böylece sürekli yavaş bir 'Regression Tests' sütunu, birçok koşumda hemen görünür. Bu, bir takım şikayetine dönüşmeden önce zamanla kötüleşen bir stage'i fark etmenin en hızlı yoludur. Jenkinsfile'da isimli stage'ler kullanmaktan başka ek bir yapılandırma gerektirmez — görselleştirme otomatiktir." } },
              // ── ORTA SEVİYE (ek) ─────────────────────────────────
              { level: 'intermediate', q: { tr: "Pipeline'ın Chrome ve Firefox test suite'lerini paralel çalıştırıyor, ama deploy hangisi önce biterse değil, İKİSİ de bitene kadar beklemeli. Bunu Jenkinsfile'da nasıl yapılandırırsın?" }, a: { tr: "Bir stage içinde parallel step'i kullan: stage('Tests') { steps { parallel(chrome: { ... }, firefox: { ... }) } } — Jenkins, bir sonraki stage'e geçmeden önce o parallel blok içindeki TÜM branch'lerin tamamlanmasını bekler, böylece sonrasına yerleştirilen bir 'Deploy' stage'i her iki browser bitene kadar doğal olarak bloklanır. Build'in sadece TÜM paralel branch'ler başarısız olduğunda başarısız olmasını istiyorsan, tek branch'leri catchError ile sarmalayarak bir branch'in başarısızlığının diğerlerini hemen iptal etmesini önle. Bu, fire-and-forget background step'lerden farklıdır — parallel() bir senkronizasyon noktasıdır, Java'da devam etmeden önce birden fazla thread üzerinde .join() çağırmaya benzer." } },
              { level: 'intermediate', q: { tr: "Pipeline'ın staging'e otomatik deploy ediyor, ama production deploy'ları önce bir insanın 'onayla' tıklamasını beklemeli. Bu gate'i Jenkinsfile'da nasıl uygularsın?" }, a: { tr: "Bir stage içinde input step'ini kullan: input message: 'Production\\'a deploy edilsin mi?', submitter: 'qa-leads' — pipeline durur, Jenkins UI'ında bir buton gösterir, ve sadece yetkili bir kullanıcı tıkladığında devam eder. Asla gelmeyecek bir onayı sonsuza kadar beklememesi için bir timeout() ile birleştir — örn. timeout(time: 24, unit: 'HOURS') { input ... }. Bu, GitHub Actions'ın environment protection rule'larındaki manuel gate'in Jenkins-native eşdeğeridir ve QA'nın prod'dan önce 'testler geçmeli VE bir insan onaylamalı' kuralını uygulamasının standart yoludur." } },
              { level: 'intermediate', q: { tr: 'Flaky bir Selenium testi ara sıra başarısız olmak yerine sonsuza kadar asılı kalıyor, birisi fark edene kadar tüm pipeline\'ı saatlerce bloklıyor. Asılı kalan bir testin CI\'ı süresiz bloklamasını nasıl önlersin?' }, a: { tr: "Test stage'ini timeout(time: 15, unit: 'MINUTES') { sh 'pytest tests/' } içine sar — stage 15 dakikayı aşarsa Jenkins onu zorla iptal eder ve build'i, birisi manuel müdahale edene kadar asılı kalmak yerine başarısız olarak işaretler. İlk savunma hattı olarak test framework'ünün kendi iç timeout'larını da ayarla (pytest-timeout, Playwright'ın test.setTimeout'u), Jenkins seviyesindeki timeout'u framework seviyesinin kaçırdığı durumları yakalayan güvenlik ağı olarak kullan. Bu olmadan, asılı kalan tek bir test bir agent'ı saatlerce sessizce işgal edebilir, o agent'ta kuyrukta bekleyen her build'i bloklayabilir." } },
              { level: 'intermediate', q: { tr: 'Jenkins agent\'larının diski tükeniyor çünkü geçmiş build\'lerden kalan eski test artifact\'leri ve node_modules workspace\'te birikiyor. Bunu nasıl düzeltirsin?' }, a: { tr: "Her build sonrası workspace'i silmek için başlangıçta veya post { always { cleanWs() } } bloğunda cleanWs() ekle, böylece her koşum gerçekten temiz bir checkout'tan başlar. Daha granüler kontrol için deleteDir() sadece mevcut dizinin içeriğini siler. Ayrıca Jenkins'in kaç eski build kaydını ve artifact'ini tuttuğunu sınırlamak için job seviyesinde 'Discard Old Builds'ı (options bloğunda buildDiscarder) yapılandır. Workspace temizliği olmadan, her koşumda taze npm install veya pip install yapan QA pipeline'ları, düzinelerce eski workspace'te sessizce onlarca GB tüketebilir." } },
              { level: 'intermediate', q: { tr: 'Developer\'lar sürekli feature branch oluşturuyor ve QA, her seferinde elle yeni bir Jenkins job\'ı yapılandırmadan her biri için özel bir test pipeline\'ının otomatik oluşturulmasını istiyor. Hangi Jenkins özelliği bunu çözer?' }, a: { tr: "Multibranch Pipeline, repo'yu otomatik tarar ve Jenkinsfile içeren her branch (ve PR) için bir alt-job oluşturur, branch silindiğinde veya merge edildiğinde de otomatik kaldırır. Bu, QA'nın test pipeline'ının main, develop ve her feature/* branch'inde, kimse Jenkins yapılandırmasına dokunmadan aynı şekilde çalışması demektir. Sadece belirli branch'lerde çalışması gereken stage'ler içinde when { branch 'main' } koruması ekle (örn. tam regresyon sadece main'de, hızlı smoke feature branch'lerinde), böylece pahalı suite'i her bir kullan-at branch'te çalıştırmaktan kaçınırsın." } },
              { level: 'intermediate', q: { tr: 'Monorepo\'ndaki farklı microservice\'lerin test suite\'leri için farklı JDK ve Node.js versiyonlarına ihtiyacı var, ama Jenkins agent\'larında global olarak sadece bir versiyon kurulu. Ayrı agent\'lar provision etmeden bunu pipeline başına nasıl yönetirsin?' }, a: { tr: "tools bloğunu kullan: pipeline'ın en üstünde tools { jdk 'jdk17'; nodejs 'node20' } — Jenkins belirtilen tool versiyonunu indirir/yapılandırır ve sadece o pipeline koşumu için PATH'e ekler, aynı agent'taki diğer eşzamanlı job'ları etkilemez. Bu, PATH'i elle yönetmenin veya shell step'leri içinde jenv/nvm gibi araçlar kullanmanın kırılgan alternatifinden kaçındırır. QA test image'ları için daha temiz bir yaklaşım, tam ihtiyaç duyulan versiyona sabitlenmiş bir Docker agent'tır (agent { docker 'node:20' }), host-tools sorununu tamamen baypas eder." } },
              { level: 'intermediate', q: { tr: "QA, aynı test suite'ini Chrome, Firefox ve Edge'e karşı, hem Windows hem Linux agent'larında çalıştırmalı — bu 6 kombinasyon demek. 6 neredeyse aynı stage yazmak sürdürülemez olurdu. Hangi Jenkins özelliği bunu temiz çözer?" }, a: { tr: "Declarative pipeline'daki Matrix direktifi, tanımladığın axis kombinasyonu başına bir stage üretir: matrix { axes { axis { name 'BROWSER'; values 'chrome', 'firefox', 'edge' } axis { name 'OS'; values 'linux', 'windows' } } stages { ... } } — Jenkins otomatik olarak 6 kombinasyonun hepsini oluşturur ve çalıştırır, her biri stage içinde BROWSER ve OS'u environment variable olarak alır. excludes bloğuyla geçersiz kombinasyonları hariç tutabilirsin. Bu, birinin birini güncelleyip diğerlerini unutmasıyla kaçınılmaz olarak senkronizasyondan çıkacak 6 copy-paste stage'in yerini alır." } },
              { level: 'intermediate', q: { tr: 'İki farklı Jenkins pipeline\'ı (biri gece regresyonu, biri elle hotfix testi için) aynı paylaşımlı staging ortamına özel erişime ihtiyaç duyuyor ve eşzamanlı çalışmaları paylaşılan test verisini bozuyor. Slack üzerinden elle koordinasyon yapmadan bunu nasıl önlersin?' }, a: { tr: "Lockable Resources plugin'ini kur ve her iki Jenkinsfile'da staging'e bağlı stage'i lock('staging-env') { ... } içine sar — Jenkins her zaman sadece bir pipeline'ın kilidi tutmasını sağlar, ilki bıraktığında ikinci pipeline'ı otomatik olarak kuyruğa alır. Bu, esasen CI pipeline'ları için bir distributed mutex'tir, bir veritabanı satır kilidiyle aynı problemi çözer ama Jenkins'in kendisinin kontrol etmediği paylaşılan harici bir kaynak için. Bu olmadan takımlar ya flaky cross-pipeline test kirliliğini kabul eder ya da deadline baskısı altında kaçınılmaz olarak ihlal edilen kırılgan manuel planlamaya başvurur." } },
              { level: 'intermediate', q: { tr: "Test stage'in ara sıra harici bir API'den test verisi çekerken geçici bir network kesintisi yüzünden başarısız oluyor, gerçek bir bug değil. Gerçek başarısızlıkları maskelemek istemiyorsun, ama sahte alarmların gece yarısı birini pagelamasını da istemiyorsun. Doğru Jenkins-native düzeltme nedir?" }, a: { tr: "Sadece o belirli stage'in etrafında retry() seçeneğini kullan: retry(2) { sh 'pytest tests/external_api/' } — Jenkins stage'i sadece başarısız olursa en fazla 2 kez daha çalıştırır, bir retry geçerse sessizce başarılı olur, bu gerçekten geçici kesintileri tutarlı şekilde başarısız olan bir testi maskelemeden (3 denemenin de başarısız olacağı için) emer. retry()'yi pipeline genelinde uygulamaktan kaçın, çünkü bu, araştırılmayı hak eden gerçek flaky test sorunlarını da gizler. Ayrıca, options bloğundaki disableConcurrentBuilds(), aynı pipeline'ın iki eşzamanlı koşumunun aynı harici kaynak için çatışmasını önler." } },
              { level: 'intermediate', q: { tr: "Varsayılan Jenkins e-posta bildirimleri kimsenin dikkatlice okumadığı bir düz metin yığını, bu yüzden flaky test uyarıları gerçekten bir şey bozulana kadar görmezden geliniyor. Başarısızlık bildirimlerini gerçekten eyleme geçirilebilir nasıl yaparsın?" }, a: { tr: "Build durumu renk kodlaması, başarısız stage/console log'a direkt link'ler ve koşullu tetikleyiciler (sadece yeşilden kırmızıya STATE DEĞİŞİKLİĞİNDE gönder, art arda her kırmızı build'de değil) ile HTML e-posta şablonları oluşturmanı sağlayan Email Extension (email-ext) plugin'ini kur — bu tek başına bildirim yorgunluğunu önemli ölçüde azaltır. Anlık takım görünürlüğü için Slack bildirimleriyle (slackSend) birleştir, e-postayı daha az zaman-kritik özetler için ayır. Anahtar UX prensibi: her koşumda değil, DURUM DEĞİŞİKLİĞİNDE bildir, böylece sürekli kırmızı bir build her 15 dakikada bir değil, bir kez page'ler." } },
              { level: 'intermediate', q: { tr: 'Yönetim, sadece Jenkins\'in native gösterdiği değil, tüm QA pipeline\'larındaki pass/fail trendlerini gösteren canlı bir dashboard istiyor. Jenkins\'ten test sonucu verisini programatik olarak nasıl çıkarırsın?' }, a: { tr: "Jenkins, pass/fail sayılarını, bireysel test case sonuçlarını ve süreyi içeren yapılandırılmış JSON döndüren bir REST API sunar (GET /job/my-pipeline/lastBuild/testReport/api/json) — bir dashboard aracı (Grafana, özel bir script veya Allure'ın kendi sunucusu) bunu periyodik olarak polling yaparak Jenkins'in kendi UI'ından bağımsız trend grafikleri oluşturabilir. Kullanıcı başına üretilen bir API token ile kimlik doğrula (Manage Jenkins → Users → Configure → API Token), asla düz metin parolayla değil, ve bu token'ı diğer credential'lar gibi muamele et. Jenkins'in native gösterdiğinin ötesinde QA raporlaması için bu API-plus-external-dashboard deseni, Jenkins UI'ını executive seviye trendler göstermeye zorlamaktan çok daha esnektir." } },
              { level: 'intermediate', q: { tr: "Build pipeline'ın ve test pipeline'ın şu an tek bir büyük Jenkinsfile, ama test pipeline'ını test mantığını çoğaltmadan birden fazla farklı build pipeline'ından (Java servisi, Python servisi) otomatik tetiklemek istiyorsun. Nasıl?" }, a: { tr: "Onları ayrı Jenkins job'larına böl, ve her build pipeline'ının Jenkinsfile'ından build job: 'qa-test-pipeline', parameters: [string(name: 'SERVICE', value: 'java-service')] çağır — bu, downstream test pipeline'ını kendi job koşumu olarak tetikler, gereken parametreleri iletir, ve testler başarısız olursa build pipeline'ını başarısız etmek için opsiyonel olarak wait: true ile sonucunu bekleyebilir. Bu, 'servis X nasıl build edilir'i 'herhangi bir şey nasıl test edilir'den ayırır, böylece test pipeline mantığı, kaç upstream build pipeline'ı onu çağırırsa çağırsın tam olarak bir yerde yaşar." } },
              { level: 'intermediate', q: { tr: 'QA takımı güvenlik için test veritabanı parolasını her ay döndürüyor. Şu anda bu, hardcoded bir değeri güncellemek için her ay Jenkinsfile\'ı düzenlemek anlamına geliyor. Bu gerçekte nasıl ele alınmalı?' }, a: { tr: "Hiç hardcode edilmemeli — parolayı Jenkins Credentials store'una bir kez kaydet, Jenkinsfile'da asla değişmeyen sabit bir credential ID ile referans al (credentials('test-db-password')). Parola her ay döndüğünde, Manage Jenkins → Credentials'da DEĞERİ güncellersin, Jenkinsfile'ı değil — sıfır kod değişikliği, sıfır redeploy. Bu, Jenkins Credentials'ın çözmek için tasarlandığı tam problemdir: 'hangi secret' (sabit, kodda) ile 'secret'ın şu anki değeri ne' (döner, Jenkins'in şifreli store'unda) ayrıştırma." } },
              { level: 'intermediate', q: { tr: "Sabit 5 Jenkins agent havuzun gece genelde boşta ama herkes kod push ettiğinde gündüz tamamen doluyor, peak saatlerde uzun test kuyruk sürelerine yol açıyor. Daha kalıcı donanım almadan bunu nasıl düzeltirsin?" }, a: { tr: "Agent'ları dinamik olarak provision etmek için Kubernetes plugin'ini (veya Docker Cloud / EC2 plugin) kullan — Jenkins, çoğunlukla boşta olan sabit bir havuz tutmak yerine, sadece bir job ihtiyaç duyduğunda taze bir pod/container'ı agent olarak başlatır, job bittiğinde de kaldırır. Bu gerçek talebe doğal olarak ölçeklenir: yoğun bir sabahta 20 agent ayağa kalkar, gece 0 kalır, ve sadece job'lar gerçekten çalışırken compute için ödersin. Her geçici agent her seferinde temiz, bilinen-iyi bir image'dan başlar, uzun ömürlü agent'ların biriktirdiği drift'ten kaynaklanan 'agent-3'te çalışıyor ama agent-7'de çalışmıyor' türü flaky-environment bug'larını ortadan kaldırır." } },
              { level: 'intermediate', q: { tr: "Bir Jenkinsfile syntax sorununu debug ediyorsun ve repo'ya 10 kullan-at commit yapmadan hızlıca bir düzeltmeyi test etmek istiyorsun. Hangi Jenkins özelliği hızlı iterasyon sağlar ve sınırlaması nedir?" }, a: { tr: "Replay özelliği (tamamlanmış bir pipeline koşumunda mevcut), Jenkinsfile'ın Groovy script'ini Jenkins UI'ında düzenlemeni ve Git'e hiç dokunmadan o değişiklikle anında yeniden çalıştırmanı sağlar — debug ederken hızlı iterasyon için harika. Sınırlama: Replay değişiklikleri HİÇBİR YERE kalıcı olarak kaydedilmez — düzeltmeyi bulduğunda, onu elle gerçek Jenkinsfile'a geri kopyalamalı ve commit etmelisin, yoksa bir sonraki gerçek tetikleme Git'ten eski, düzeltilmemiş versiyonu çalıştırır. Replay bir deployment mekanizması değil, debug çalışma defteridir — gerçek değişikliği source'a commit etmeden önce bir REPL'de test etmek gibi düşün." } },
              // ── İLERİ SEVİYE (ek) ────────────────────────────────
              { level: 'advanced', q: { tr: "Jenkins Controller'ının diski çöktü ve onunla birlikte 6 aylık pipeline geçmişi, credential'lar ve job konfigürasyonları gitti. Jenkins'i bunu hayatta kalacak şekilde nasıl mimarileştirirsin ve özellikle ne yedeklenmeli?" }, a: { tr: "JENKINS_HOME önemli olan her şeyi içerir: job konfigürasyonları, build geçmişi, plugin'ler ve şifreli credentials store — her Jenkins versiyon yükseltmesinden önce ve düzenli bir takvimle bu dizinin tamamını harici depolamaya (S3, NFS, ayrı bir volume) yedekle. Gerçek yüksek erişilebilirlik için Controller'ı, geçici lokal disk yerine kalıcı bir network volume üzerinde JENKINS_HOME ile dayanıklı altyapıda çalıştır, böylece bir Controller çökmesi ve yeni bir instance'da yeniden başlatma aynı veriye yeniden bağlanabilir. Restore sürecini periyodik olarak bir staging Jenkins instance'ında test et — kimsenin başarıyla restore etmediği bir yedek gerçekte bir yedek değildir. QA için özellikle, geçmiş test trend verisini kaybetmek genellikle job konfigürasyonlarını kaybetmekten daha acı vericidir, çünkü zaman içinde flaky-test desenlerini fark etme yeteneğini siler." } },
              { level: 'advanced', q: { tr: "Jenkins Shared Library'n her takımın pipeline'ının kullandığı binlerce satır Groovy'e büyüdü, ama kimse onu test etmiyor — bug'lar sadece birinin production deploy'unu bozduğunda fark ediliyor. Bunu nasıl test altına alırsın?" }, a: { tr: "Shared library fonksiyonlarını izole olarak unit test etmek için Jenkins Pipeline Unit test framework'ünü kullan, sh veya git gibi Jenkins step'lerini mock'layarak gerçek bir Jenkins instance'ı olmadan testlerin hızlı çalışmasını sağla. Library'i, business mantığının (örn. 'branch adına göre hangi stage'ler çalışmalı') Jenkins'e özel glue koddan ayrıldığı şekilde yapılandır, bu mantığı düz Groovy/Spock testleriyle önemsiz şekilde test edilebilir kılar. Shared library'i tam olarak production kodu gibi muamele et: PR review zorunlu kıl, değişiklikleri merge etmeden önce bu unit testleri çalıştıran kendi CI pipeline'ını çalıştır, ve versiyonla (release tag'le) böylece tüketen Jenkinsfile'lar, library'nin potansiyel olarak bozuk main branch'ini her zaman takip etmek yerine bilinen-iyi bir versiyona sabitlenebilsin." } },
              { level: 'advanced', q: { tr: "Tek Jenkins Controller'ın 10 takımda 300 job'ı yönetiyor ve UI fark edilir şekilde yavaşladı, agent'lar boşta olsa dahi build'ler dakikalarca kuyrukta bekliyor. Controller seviyesindeki performans sorunlarını nasıl teşhis edip düzeltirsin?" }, a: { tr: "Önce Controller'ın kendisindeki executor sayısını kontrol et — 0 olmalı, tüm gerçek iş agent'lara yönlendirilmeli; birçok performans sorunu birinin ağır job'ları direkt Controller'da çalıştırmasına kadar izlenebilir. Bilinen-yavaş veya terk edilmiş plugin'ler için plugin listesini kontrol et, çünkü tek bir hatalı davranan plugin tüm UI thread'ini düşürebilir. Bellek baskısı bottleneck ise Controller process'i için JVM heap boyutunu ve GC ayarlarını ayarla, ve tek bir instance gerçekten vertical scaling'i aştıysa birden fazla Controller'a (iş birimi başına bir tane) bölünmeyi düşün. Genellikle gerçek düzeltme mimaridir: tek bir paylaşılan Controller'dan takım başına Configuration-as-Code ile provision edilmiş Controller'lara geçmek, blast radius'u ve çatışmayı azaltır." } },
              { level: 'advanced', q: { tr: "Jenkins core'u ve bir düzine plugin'i yükseltmen gerekiyor, ama Controller birden fazla takım için saat boyunca aktif olarak pipeline çalıştırıyor — istediğin zaman kapatamazsın. Güvenli bir yükseltmeyi nasıl planlarsın?" }, a: { tr: "Yakın bir JENKINS_HOME yedeğinden restore edilmiş bir staging Jenkins instance'ı kur, yükseltmeyi önce orada uygula, ve production'a dokunmadan önce plugin-uyumluluk bozulmalarını yakalamak için gerçek pipeline'lardan temsili bir örneği ona karşı çalıştır. Gerçek production yükseltmesini en düşük trafik penceresinde planla ve önceden ilet, böylece Controller yeniden başladığında takımların yarı yolda pipeline'ları olmasın. Yükseltmeden önce Jenkins'in gösterdiği plugin uyumluluk uyarılarını her zaman oku — bunları görmezden gelmek yükseltme sonrası bozuk bir instance'ın en yaygın sebebidir. Yükseltme öncesi JENKINS_HOME yedeğini kolay erişilebilir tut, böylece bir rollback, bir kesinti sırasında baskı altında improvize edilen bir şey değil, bilinen, provası yapılmış bir prosedür olsun." } },
              { level: 'advanced', q: { tr: 'Organizasyonun, developer\'ların kendi PR\'larına bir Jenkinsfile eklemesine ve otomatik çalışmasına izin vermek istiyor, ama kötü niyetli veya dikkatsiz bir PR, diğer job\'ların credential\'larını okuyan veya keyfi host çağrıları yapan Groovy yazabilir. Bunu güvenli şekilde nasıl sağlarsın?' }, a: { tr: "Güvenilmeyen pipeline kodu için Script Security plugin'inin sandbox'ını etkinleştir — PR branch'lerinden gelen pipeline'lar, bir admin belirli bir script imzasını açıkça onaylamadıkça tehlikeli işlemleri (workspace dışında dosya sistemi erişimi, keyfi Java reflection, diğer job'ların credential'larını okuma) bloklayan kısıtlı bir Groovy sandbox'ı içinde çalışır. Özellikle fork'lardan build edilen Multibranch Pipeline'lar için 'fork'lardan pull request keşfet' ayarlarını dikkatlice etkinleştir ve ilk kez katkıda bulunan harici kişiler için bir build onay adımı gerektirmeyi düşün, çünkü fork PR'ları en yüksek riskli kategoridir. Credential'lar da kapsamlanmalı — PR-tetikli bir build pipeline'ının, sandboxing'den bağımsız olarak, production deployment credential'larına hiç erişimi olmamalı, sadece sandbox'a güvenmek yerine en az yetki ilkesini takip ederek." } },
              { level: 'advanced', q: { tr: 'Takımın production deploy\'larının sadece test pass/fail durumuna değil, kısmi bir rollout sonrası canlı canary metriklerine (hata oranı, gecikme) de gate edilmesini istiyor. Bunu bir Jenkins pipeline\'ına nasıl bağlarsın?' }, a: { tr: "Trafiğin küçük bir yüzdesine deploy ettikten sonra (canary), izleme sisteminin API'sini (Prometheus, Datadog) N dakika boyunca bir döngüde polling yapan, canary hata oranını/gecikmesini bir baseline eşiğiyle karşılaştıran bir stage ekle — metrikler eşiği aşarsa stage'i başarısız et ve otomatik rollback tetikle, sağlıklı kalırlarsa tam rollout'a geç. Bunu sabit bir sleep yerine timeout() ile sarılmış bir polling döngüsü olarak uygula, çünkü erken belirgin kötü metriklere rağmen sabit 10 dakika beklemek zaman kaybettirir ve rollback'i geciktirir. Bu desen QA/SRE sınırını bulanıklaştırır — canary stage'i, pipeline'ın kendisi rollout ortasında asılı kalırsa veya çökerse diye pipeline'dan bağımsız kendi alerting'ine ihtiyaç duyar." } },
              { level: 'advanced', q: { tr: "Plugin güncellemeleri, farklı vendor'lar tarafından bakımı yapılan plugin'ler arasındaki uyumluluk çatışmaları yüzünden ilgisiz pipeline'ları bozmaya devam ediyor ve takımlar korkudan yükseltmeleri tamamen önlemeye başladı. Sağlıklı bir plugin governance'ı nasıl kurarsın?" }, a: { tr: "Her plugin'in bağımsız ve kombinatoryal olarak uyumluluk yüzeyini patlatacak şekilde otomatik güncellenmesine izin vermek yerine, production'a yayınlanmadan önce staging'de birlikte doğrulanmış, bilinen-iyi bir plugin versiyon kombinasyonu olan test edilmiş, sabitlenmiş bir plugin Bill of Materials (BOM) tut. Tam plugin setini ve versiyonları versiyonlanmış bir dosya olarak deklare etmek için Configuration as Code (JCasC) kullan, böylece Controller'ın konfigürasyonu diğer her altyapı kodu gibi tekrar üretilebilir ve review edilebilir olsun. 'Asla yükseltme' veya 'her şeyi otomatik yükselt' yerine staging soak period'lu düzenli (örn. üç ayda bir) bir yükseltme ritmi kur — öngörülebilir ritim, takımların sürpriz olmak yerine bunun etrafında plan yapmasını sağlar." } },
              { level: 'advanced', q: { tr: "Şirketin 15 takıma büyüdü, her biri kendi Jenkins job'larını istiyor, ve her birini UI üzerinden elle yapılandırmak platform takımı için sürdürülemez bir bottleneck oldu. Jenkins yönetiminin kendisini nasıl ölçeklendirirsin?" }, a: { tr: "Controller seviyesi ayarları (security realm, credentials provider'lar, tool kurulumları) Git'e commit edilmiş YAML olarak tanımlamak için Configuration as Code (JCasC) benimse, böylece tüm Controller konfigürasyonu sıfırdan tekrar üretilebilir ve PR ile review edilebilir olsun, kimsenin hatırlamadığı belgelenmemiş UI tıklamalarını ortadan kaldır. Takım başına job oluşturma için Job DSL veya daha iyisi, her takımın kendi repo'sunda özelleştirdiği bir standart Jenkinsfile şablonuyla Multibranch Pipeline kullan — bu, 'platform takımı elle bir job oluşturur'u 'takım kendi kendine bir Jenkinsfile ekleyerek hizmet alır'a çevirir, platform takımını bottleneck olmaktan çıkarır. Bu, altyapının elle tıklanan cloud konsollarından Terraform'a geçişiyle aynı evrimdir." } },
              { level: 'advanced', q: { tr: 'Uzun süren paralel Selenium Grid test stage\'leri sırasında (45+ dakika), agent\'lar ara sıra net bir hata olmadan testin ortasında çevrimdışı oluyor, o stage için tüm ilerleme kayboluyor. Bunu nasıl teşhis edip önlersin?' }, a: { tr: "Önce agent bağlantı tipini kontrol et — JNLP/WebSocket agent bağlantıları, özellikle az çıktılı uzun süren stage'lerde, kararsız network'lerde veya agresif kurumsal proxy idle-timeout'larında sessizce kopabilir; SSH-tabanlı agent bağlantılarına geçmek (idle dönemlere daha dayanıklı) genellikle bunu çözer. Agent host'unun kendi kaynak limitlerini kontrol et — OS tarafından 50 paralel Chrome instance'ından kaynaklanan bellek baskısıyla OOM-kill edilen bir agent, Jenkins loglarında 'agent çevrimdışı oldu' ile aynı görünür, ama gerçek düzeltme bir Jenkins ayarı değil, browser node'u başına kaynak limitleridir. Kök nedenden bağımsız bir dayanıklılık ölçütü olarak, uzun test stage'lerini ilerlemeyi checkpoint'leyecek şekilde yapılandır (kısmi sonuçları kademeli olarak mount edilmiş bir volume'a yazarak), böylece koşum ortasında bir agent kopması, sadece devam eden işi, tamamlanmış 44 dakikalık sonuçları kaybetmesin." } },
              { level: 'advanced', q: { tr: "Job başına oluşturulan geçici Jenkins agent'ları (Kubernetes pod'ları) için cloud faturan, job sayısı sadece %20 büyümesine rağmen üçe katlandı. CI'ı yavaşlatmadan geçici agent maliyetlerini nasıl araştırıp azaltırsın?" }, a: { tr: "Önce agent pod'larının gerçek kullanıma göre fazla provision edilip edilmediğini kontrol et — yaygın bir hata, job'ın gerçekten ihtiyacı olup olmadığına bakmaksızın her agent pod'u için 4 CPU/8GB istemektir; job tipine göre kaynak isteklerini doğru boyutlandırmak genellikle performans etkisi olmadan maliyeti önemli ölçüde düşürür. Agent idle/başlangıç overhead'ini kontrol et — image pull'ları Kubernetes node'larında cache'lenmediği için yavaşsa, sadece image indirmek için compute süresine para ödüyorsun; yaygın base image'ları node'lara önceden çekmek bu israfı azaltır. Job'ların gerektiğinden uzun süre agent tuttuğunu denetle ve geçici agent'ları besleyen Kubernetes node pool'u için spot/preemptible instance'ları düşün, çünkü CI iş yükleri ara sıra preemption'a production servislerinden çok daha iyi tolerans gösterir." } },
            ],
          },
        ],
      },
    ],
  },
}
