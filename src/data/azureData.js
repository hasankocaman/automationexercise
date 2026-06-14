export const azureData = {
  en: {
    hero: {
      title: '🔷 Microsoft Azure',
      subtitle: 'Cloud Platform for QA Engineers',
      intro: 'Learn Azure DevOps, Azure Pipelines, and Azure cloud services used in modern QA workflows — from test environment provisioning to CI/CD automation and test reporting.',
    },
    tabs: [
      '🎯 Introduction',
      '⚙️ Installation',
      '🛠️ Real World',
      '🔗 Ecosystem',
      '🚨 Common Errors',
      '💼 Interview Q&A',
    ],
    sections: [
      // ── 0. INTRODUCTION ───────────────────────────────────────────────────────
      {
        title: '🎯 What is Microsoft Azure?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏙️',
            content: 'Imagine a city that rents you apartments, offices, warehouses, and a whole road network — and you only pay for what you use each day. Microsoft Azure is that city for software: it rents you virtual computers, databases, networks, and software services by the hour. When your tests are done, you "move out" and stop paying.',
          },
          {
            type: 'text',
            content: 'Azure is Microsoft\'s cloud platform, the second largest in the world after AWS. For QA engineers, Azure stands out because of Azure DevOps — an all-in-one platform for repos, pipelines, test plans, and boards that many enterprises already use. If your company uses Microsoft 365 or Visual Studio, Azure integration is seamless.',
          },
          { type: 'heading', text: 'Why QA Engineers Work with Azure' },
          {
            type: 'grid', cols: 3,
            items: [
              { icon: '🔁', label: 'Azure DevOps', desc: 'Repos + Pipelines + Test Plans + Boards in one place. The most complete QA platform natively integrated with the cloud.' },
              { icon: '🖥️', label: 'Virtual Machines', desc: 'Spin up Windows or Linux VMs for Selenium Grid, test app, or any server workload in minutes.' },
              { icon: '🐳', label: 'AKS & Container Apps', desc: 'Run Playwright tests in containers on Azure Kubernetes Service — parallel, scalable, serverless.' },
              { icon: '📊', label: 'Azure Test Plans', desc: 'Manual and exploratory testing with full traceability to work items, bugs, and requirements.' },
              { icon: '📦', label: 'Azure Blob Storage', desc: 'Store test artifacts (reports, screenshots, videos) cheaply at scale.' },
              { icon: '🔗', label: 'Enterprise Integration', desc: 'Native integration with Microsoft 365, Active Directory, Teams, and Visual Studio — no extra setup.' },
            ],
          },
          { type: 'heading', text: 'Azure vs AWS vs GCP for QA' },
          {
            type: 'table',
            headers: ['Feature', 'Azure', 'AWS', 'GCP'],
            rows: [
              ['CI/CD native', 'Azure DevOps ✅ (best)', 'CodePipeline', 'Cloud Build'],
              ['Test Plans', 'Azure Test Plans ✅', '❌ no native', '❌ no native'],
              ['Windows VMs', 'Best ✅ (Microsoft)', 'Good', 'Good'],
              ['Enterprise AD', 'Native ✅ (AAD)', 'Manual setup', 'Manual setup'],
              ['Free tier', '12 months + always-free', '12 months', '90 days'],
              ['Market share', '22% (2nd place)', '32% (1st)', '11% (3rd)'],
              ['Job market', 'Strong in enterprises', 'Broadest demand', 'Growing in startups'],
            ],
          },
          { type: 'heading', text: 'Core Azure Services for QA' },
          {
            type: 'list', icon: '▸',
            items: [
              { label: 'Azure Virtual Machines', desc: ' — full VMs (Windows/Linux). Run Selenium Grid, Jenkins agents, test app servers.' },
              { label: 'Azure DevOps Pipelines', desc: ' — CI/CD. Build, test, and deploy on every git push. Free for 5 users.' },
              { label: 'Azure Blob Storage', desc: ' — object storage like S3. Store test reports, screenshots, logs.' },
              { label: 'Azure Container Instances (ACI)', desc: ' — run Docker containers without managing VMs. Ideal for short test runs.' },
              { label: 'AKS (Azure Kubernetes Service)', desc: ' — managed Kubernetes. Run parallel Selenium/Playwright tests at scale.' },
              { label: 'Azure SQL / Cosmos DB', desc: ' — managed databases. Spin up a test database in minutes.' },
              { label: 'Azure Monitor / App Insights', desc: ' — logging and monitoring. View test logs, set alerts, trace performance.' },
              { label: 'Azure Test Plans', desc: ' — web-based manual testing tool with test cases, runs, and defect tracking.' },
            ],
          },
          { type: 'tip', content: 'Azure DevOps is free for open-source projects and gives 5 free users + 1,800 free pipeline minutes/month for private projects. Many QA teams use it without needing to pay anything.' },
          { type: 'heading', text: 'Azure Architecture Overview' },
          {
            type: 'diagram-svg',
            title: 'Azure Global Infrastructure for QA',
            svg: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" style="background:#1e2030;border-radius:12px;width:100%;font-family:monospace">
  <text x="350" y="25" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold">Azure QA Architecture</text>
  <rect x="20" y="45" width="200" height="160" rx="10" fill="#1a2a4a" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="120" y="65" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">Azure DevOps</text>
  <rect x="35" y="75" width="170" height="22" rx="5" fill="#1e3a5f"/>
  <text x="120" y="90" text-anchor="middle" fill="#60a5fa" font-size="9">Repos (Git)</text>
  <rect x="35" y="102" width="170" height="22" rx="5" fill="#1e3a5f"/>
  <text x="120" y="117" text-anchor="middle" fill="#60a5fa" font-size="9">Pipelines (CI/CD)</text>
  <rect x="35" y="129" width="170" height="22" rx="5" fill="#1e3a5f"/>
  <text x="120" y="144" text-anchor="middle" fill="#60a5fa" font-size="9">Test Plans (Manual)</text>
  <rect x="35" y="156" width="170" height="22" rx="5" fill="#1e3a5f"/>
  <text x="120" y="171" text-anchor="middle" fill="#60a5fa" font-size="9">Boards (Work Items)</text>
  <rect x="260" y="45" width="180" height="160" rx="10" fill="#1a3a2a" stroke="#10b981" stroke-width="1.5"/>
  <text x="350" y="65" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">Compute</text>
  <rect x="275" y="75" width="150" height="22" rx="5" fill="#1e4a2a"/>
  <text x="350" y="90" text-anchor="middle" fill="#34d399" font-size="9">Virtual Machines (VMs)</text>
  <rect x="275" y="102" width="150" height="22" rx="5" fill="#1e4a2a"/>
  <text x="350" y="117" text-anchor="middle" fill="#34d399" font-size="9">Container Instances (ACI)</text>
  <rect x="275" y="129" width="150" height="22" rx="5" fill="#1e4a2a"/>
  <text x="350" y="144" text-anchor="middle" fill="#34d399" font-size="9">AKS (Kubernetes)</text>
  <rect x="275" y="156" width="150" height="22" rx="5" fill="#1e4a2a"/>
  <text x="350" y="171" text-anchor="middle" fill="#34d399" font-size="9">Azure Functions (Serverless)</text>
  <rect x="490" y="45" width="190" height="160" rx="10" fill="#2d1a4a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="585" y="65" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold">Data &amp; Monitoring</text>
  <rect x="505" y="75" width="160" height="22" rx="5" fill="#3b1f6a"/>
  <text x="585" y="90" text-anchor="middle" fill="#a78bfa" font-size="9">Blob Storage (artifacts)</text>
  <rect x="505" y="102" width="160" height="22" rx="5" fill="#3b1f6a"/>
  <text x="585" y="117" text-anchor="middle" fill="#a78bfa" font-size="9">Azure SQL (test DB)</text>
  <rect x="505" y="129" width="160" height="22" rx="5" fill="#3b1f6a"/>
  <text x="585" y="144" text-anchor="middle" fill="#a78bfa" font-size="9">Azure Monitor (logs)</text>
  <rect x="505" y="156" width="160" height="22" rx="5" fill="#3b1f6a"/>
  <text x="585" y="171" text-anchor="middle" fill="#a78bfa" font-size="9">App Insights (traces)</text>
  <text x="350" y="218" text-anchor="middle" fill="#6b7280" font-size="8">Azure has 60+ regions worldwide — resources deployed closest to your users</text>
</svg>`,
          },
        ],
      },

      // ── 1. INSTALLATION ───────────────────────────────────────────────────────
      {
        title: '⚙️ Azure CLI Installation',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Azure has two entry points: the Azure Portal (web UI at portal.azure.com) and Azure CLI (command-line tool). Think of the Portal as a car\'s dashboard and the CLI as the engine you control directly. For QA automation you need the CLI — it runs in scripts and pipelines without a human clicking around.',
          },
          { type: 'heading', text: 'Step 1 — Create Azure Account' },
          {
            type: 'list', icon: '①',
            items: [
              'Go to azure.microsoft.com → "Start free"',
              'Sign in with Microsoft account (or create one)',
              'Fill in personal details + credit card (Free tier covers $200 credit for 30 days + always-free services)',
              'Phone verification',
              'Account ready immediately — no wait time',
            ],
          },
          { type: 'tip', content: 'Azure gives $200 free credit for the first 30 days + always-free services (Azure Functions 1M calls/month, Blob Storage 5GB). No charge if you stay within limits.' },
          { type: 'heading', text: 'Step 2 — Install Azure CLI' },
          {
            type: 'code', language: 'bash',
            code: `# Windows — winget
winget install Microsoft.AzureCLI

# Windows — PowerShell (alternative)
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\\AzureCLI.msi
Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'

# macOS — Homebrew
brew update && brew install azure-cli

# Linux (Ubuntu/Debian)
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Verify installation
az --version
# Expected: azure-cli 2.x.x ...`,
          },
          { type: 'heading', text: 'Step 3 — Login & Set Subscription' },
          {
            type: 'code', language: 'bash',
            code: `# Login — opens browser for Microsoft sign-in
az login

# List available subscriptions
az account list --output table

# Set the subscription to use
az account set --subscription "My QA Subscription"

# Verify current subscription
az account show`,
          },
          {
            type: 'code', language: 'json',
            code: `// Expected output of "az account show":
{
  "environmentName": "AzureCloud",
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "isDefault": true,
  "name": "My QA Subscription",
  "state": "Enabled",
  "tenantId": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
  "user": {
    "name": "you@example.com",
    "type": "user"
  }
}`,
          },
          { type: 'heading', text: 'Step 4 — Create Resource Group' },
          {
            type: 'code', language: 'bash',
            code: `# Resource Group = logical container for all related resources
az group create \\
  --name qa-test-rg \\
  --location westeurope

# List resource groups
az group list --output table

# Later — delete everything in the group (cleanup)
az group delete --name qa-test-rg --yes --no-wait`,
          },
          { type: 'heading', text: 'Step 5 — Test with Blob Storage' },
          {
            type: 'code', language: 'bash',
            code: `# Create a storage account (name must be globally unique, 3-24 lowercase alphanumeric)
az storage account create \\
  --name myqastorage$RANDOM \\
  --resource-group qa-test-rg \\
  --location westeurope \\
  --sku Standard_LRS

# Create a blob container
az storage container create \\
  --name test-reports \\
  --account-name myqastorage12345 \\
  --public-access blob

# Upload a test file
echo "Hello Azure" > test.txt
az storage blob upload \\
  --account-name myqastorage12345 \\
  --container-name test-reports \\
  --name test.txt \\
  --file test.txt

# List blobs
az storage blob list \\
  --account-name myqastorage12345 \\
  --container-name test-reports \\
  --output table`,
          },
          {
            type: 'diagram-svg',
            title: 'Azure CLI Authentication Flow',
            svg: `<svg viewBox="0 0 640 140" xmlns="http://www.w3.org/2000/svg" style="background:#1e2030;border-radius:12px;width:100%;font-family:monospace">
  <defs>
    <marker id="a3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#3b82f6"/>
    </marker>
  </defs>
  <rect x="20" y="45" width="110" height="50" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="67" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">az login</text>
  <text x="75" y="83" text-anchor="middle" fill="#6b7280" font-size="8">CLI command</text>
  <line x1="130" y1="70" x2="165" y2="70" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#a3)"/>
  <rect x="165" y="35" width="130" height="70" rx="8" fill="#2d1a4a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="230" y="57" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">Browser</text>
  <text x="230" y="73" text-anchor="middle" fill="#a78bfa" font-size="8">Microsoft login page</text>
  <text x="230" y="88" text-anchor="middle" fill="#a78bfa" font-size="8">MFA if required</text>
  <line x1="295" y1="70" x2="330" y2="70" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#a3)"/>
  <rect x="330" y="35" width="130" height="70" rx="8" fill="#1a3a2a" stroke="#10b981" stroke-width="1.5"/>
  <text x="395" y="57" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">Token stored</text>
  <text x="395" y="73" text-anchor="middle" fill="#34d399" font-size="8">~/.azure/</text>
  <text x="395" y="88" text-anchor="middle" fill="#34d399" font-size="8">msal_token_cache</text>
  <line x1="460" y1="70" x2="495" y2="70" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#a3)"/>
  <rect x="495" y="45" width="120" height="50" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="555" y="67" text-anchor="middle" fill="#60a5fa" font-size="10" font-weight="bold">az vm list</text>
  <text x="555" y="83" text-anchor="middle" fill="#34d399" font-size="8">authenticated ✓</text>
  <text x="320" y="128" text-anchor="middle" fill="#6b7280" font-size="8">Token valid for ~1 hour (interactive) or until expiry (Service Principal)</text>
</svg>`,
          },
        ],
      },

      // ── 2. REAL WORLD ─────────────────────────────────────────────────────────
      {
        title: '🛠️ Real World — Azure in QA',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏗️',
            content: 'Picture a QA team at a bank. They use Microsoft 365 for email, Teams for chat, Visual Studio for development — and Azure DevOps for test management. Everything is already in the Microsoft ecosystem. Adding Azure cloud for test environments means zero additional logins, zero extra tools — everything just works together.',
          },
          { type: 'heading', text: 'Scenario: Azure DevOps Pipeline for Playwright' },
          {
            type: 'code', language: 'yaml',
            code: `# azure-pipelines.yml — runs Playwright on every push to main
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'   # Microsoft-hosted agent (free 1,800 min/month)

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Install Node.js'

  - script: |
      npm ci
      npx playwright install --with-deps chromium
    displayName: 'Install dependencies'

  - script: npx playwright test --reporter=html,junit
    displayName: 'Run Playwright tests'
    continueOnError: true   # publish results even if tests fail

  - task: PublishTestResults@2
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: 'test-results/*.xml'
    displayName: 'Publish test results'

  - task: PublishPipelineArtifact@1
    inputs:
      targetPath: 'playwright-report'
      artifact: 'playwright-html-report'
    displayName: 'Upload HTML report'`,
          },
          { type: 'heading', text: 'Scenario: Selenium Grid on Azure VMs' },
          {
            type: 'code', language: 'bash',
            code: `# Create a Resource Group for the test environment
az group create --name selenium-grid-rg --location westeurope

# Create VM for Selenium Hub
az vm create \\
  --resource-group selenium-grid-rg \\
  --name selenium-hub \\
  --image Ubuntu2204 \\
  --size Standard_D2s_v3 \\
  --admin-username qauser \\
  --generate-ssh-keys \\
  --public-ip-sku Standard

# Open port 4444 for Selenium Grid
az vm open-port --resource-group selenium-grid-rg \\
  --name selenium-hub --port 4444

# Get public IP
az vm show -d --resource-group selenium-grid-rg \\
  --name selenium-hub --query publicIps -o tsv`,
          },
          {
            type: 'code', language: 'bash',
            code: `# SSH in and set up Docker + Selenium Grid
ssh qauser@<PUBLIC_IP>

sudo apt update && sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# Start Selenium Hub
docker run -d -p 4442-4444:4442-4444 --name selenium-hub selenium/hub:4.18.1

# Start Chrome nodes (run on separate VMs or same VM for dev)
docker run -d \\
  -e SE_EVENT_BUS_HOST=localhost \\
  -e SE_EVENT_BUS_PUBLISH_PORT=4442 \\
  -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \\
  --shm-size="2g" \\
  selenium/node-chrome:4.18.1

# Cleanup when done — saves money
az group delete --name selenium-grid-rg --yes --no-wait`,
          },
          { type: 'heading', text: 'Scenario: Store Reports in Azure Blob Storage' },
          {
            type: 'code', language: 'bash',
            code: `# After test run — upload Playwright report to Blob Storage
ACCOUNT="myqareports"
CONTAINER="playwright-reports"
RUN_ID=$(date +%Y%m%d-%H%M)

az storage blob upload-batch \\
  --account-name $ACCOUNT \\
  --destination $CONTAINER/$RUN_ID \\
  --source playwright-report/

# Generate a SAS URL (shared access — valid 7 days)
az storage blob generate-sas \\
  --account-name $ACCOUNT \\
  --container-name $CONTAINER \\
  --name $RUN_ID/index.html \\
  --permissions r \\
  --expiry $(date -u -d '+7 days' +%Y-%m-%dT%H:%MZ) \\
  --full-uri`,
          },
          { type: 'heading', text: 'Azure vs AWS for QA — Head to Head' },
          {
            type: 'table',
            headers: ['Use Case', 'Azure', 'AWS', 'Winner'],
            rows: [
              ['CI/CD pipelines', 'Azure Pipelines ✅', 'CodePipeline', 'Azure (more features)'],
              ['Manual test mgmt', 'Azure Test Plans ✅', '❌ none native', 'Azure'],
              ['Windows test VMs', 'Native ✅', 'Good', 'Azure'],
              ['Cost for Selenium Grid', '~$0.10/hr Standard_D2', '~$0.09/hr t3.medium', 'Tie'],
              ['Container support', 'ACI, AKS ✅', 'ECS, EKS', 'Tie'],
              ['Enterprise SSO', 'Azure AD native ✅', 'Manual', 'Azure'],
              ['Serverless tests', 'Azure Functions', 'Lambda ✅', 'AWS (more mature)'],
              ['Mobile testing', '❌ no native', 'Device Farm ✅', 'AWS'],
            ],
          },
          { type: 'tip', content: 'Azure Pipelines gives you 1,800 free minutes per month on Microsoft-hosted agents. That is roughly 30 full Playwright test runs per month completely free.' },
          { type: 'heading', text: 'Hands-on: Complete QA Pipeline in Azure DevOps' },
          {
            type: 'code', language: 'yaml',
            code: `# Complete azure-pipelines.yml with parallel jobs
trigger:
  - main
  - develop

variables:
  NODE_VERSION: '18.x'
  BLOB_ACCOUNT: 'myqareports'

stages:
  - stage: Test
    jobs:
      - job: API_Tests
        pool:
          vmImage: 'ubuntu-latest'
        steps:
          - script: npm ci && npx jest --testPathPattern=api --reporter=junit
          - task: PublishTestResults@2
            inputs:
              testResultsFormat: JUnit
              testResultsFiles: junit.xml

      - job: UI_Tests
        pool:
          vmImage: 'ubuntu-latest'
        steps:
          - script: npm ci && npx playwright install --with-deps
          - script: npx playwright test --reporter=html,junit
          - task: PublishPipelineArtifact@1
            inputs:
              targetPath: playwright-report
              artifact: ui-report

  - stage: Publish
    dependsOn: Test
    condition: always()
    jobs:
      - job: UploadReports
        steps:
          - task: AzureCLI@2
            inputs:
              azureSubscription: 'QA-ServiceConnection'
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                az storage blob upload-batch \\
                  --account-name $(BLOB_ACCOUNT) \\
                  --destination reports/$(Build.BuildId) \\
                  --source $(Pipeline.Workspace)/ui-report`,
          },
        ],
      },

      // ── 3. ECOSYSTEM ──────────────────────────────────────────────────────────
      {
        title: '🔗 Azure Ecosystem for QA',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧩',
            content: 'Azure services for QA work like a relay race: Azure DevOps starts the baton (triggers pipeline on code push), Azure Pipelines runs the first leg (builds and tests), Azure Container Instances sprints the second leg (runs test containers), and Azure Blob Storage crosses the finish line (stores the report). Each service hands off to the next automatically.',
          },
          { type: 'heading', text: 'Azure DevOps Deep Dive' },
          {
            type: 'grid', cols: 2,
            items: [
              { icon: '📁', label: 'Azure Repos', desc: 'Git repositories with branch policies, pull request workflows, and code review. Full GitHub-like experience inside Azure.' },
              { icon: '⚙️', label: 'Azure Pipelines', desc: 'YAML-based CI/CD. Build and test on every commit. 1,800 free minutes/month. Supports all languages and test frameworks.' },
              { icon: '📋', label: 'Azure Test Plans', desc: 'Web-based test case management: create test suites, execute manual tests, track results, and link failures to work items automatically.' },
              { icon: '📌', label: 'Azure Boards', desc: 'Scrum/Kanban boards for QA bugs, user stories, and tasks. Test results automatically link to work items.' },
            ],
          },
          { type: 'heading', text: 'Azure QA Ecosystem Map' },
          {
            type: 'diagram-svg',
            title: 'End-to-End Azure QA Workflow',
            svg: `<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style="background:#1e2030;border-radius:12px;width:100%;font-family:sans-serif">
  <defs>
    <marker id="a4" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
      <polygon points="0 0,7 2.5,0 5" fill="#3b82f6"/>
    </marker>
  </defs>
  <text x="340" y="22" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold">Azure QA Workflow</text>
  <rect x="20" y="40" width="120" height="50" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="62" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">Azure Repos</text>
  <text x="80" y="78" text-anchor="middle" fill="#6b7280" font-size="8">git push → trigger</text>
  <line x1="140" y1="65" x2="178" y2="65" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#a4)"/>
  <rect x="178" y="40" width="130" height="50" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="243" y="62" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">Azure Pipelines</text>
  <text x="243" y="78" text-anchor="middle" fill="#6b7280" font-size="8">build + run tests</text>
  <line x1="308" y1="65" x2="345" y2="65" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#a4)"/>
  <rect x="345" y="40" width="130" height="50" rx="8" fill="#1a3a2a" stroke="#10b981" stroke-width="1.5"/>
  <text x="410" y="58" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">ACI / AKS</text>
  <text x="410" y="73" text-anchor="middle" fill="#34d399" font-size="8">parallel test containers</text>
  <text x="410" y="84" text-anchor="middle" fill="#34d399" font-size="8">Playwright / Selenium</text>
  <line x1="475" y1="65" x2="512" y2="65" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#a4)"/>
  <rect x="512" y="40" width="140" height="50" rx="8" fill="#2d1a4a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="582" y="62" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">Blob Storage</text>
  <text x="582" y="78" text-anchor="middle" fill="#a78bfa" font-size="8">reports, screenshots</text>
  <rect x="80" y="130" width="150" height="90" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="155" y="150" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">Azure Test Plans</text>
  <text x="155" y="167" text-anchor="middle" fill="#60a5fa" font-size="8">Manual test cases</text>
  <text x="155" y="182" text-anchor="middle" fill="#60a5fa" font-size="8">Exploratory testing</text>
  <text x="155" y="197" text-anchor="middle" fill="#60a5fa" font-size="8">Defect traceability</text>
  <line x1="155" y1="90" x2="155" y2="130" stroke="#3b82f6" stroke-dasharray="4" stroke-width="1.5" marker-end="url(#a4)"/>
  <rect x="280" y="130" width="150" height="90" rx="8" fill="#1f2a1a" stroke="#84cc16" stroke-width="1.5"/>
  <text x="355" y="150" text-anchor="middle" fill="#a3e635" font-size="10" font-weight="bold">Azure Monitor</text>
  <text x="355" y="167" text-anchor="middle" fill="#84cc16" font-size="8">App Insights</text>
  <text x="355" y="182" text-anchor="middle" fill="#84cc16" font-size="8">Test logs</text>
  <text x="355" y="197" text-anchor="middle" fill="#84cc16" font-size="8">Failure alerts</text>
  <line x1="355" y1="90" x2="355" y2="130" stroke="#84cc16" stroke-dasharray="4" stroke-width="1.5" marker-end="url(#a4)"/>
  <rect x="480" y="130" width="150" height="90" rx="8" fill="#3b1f00" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="555" y="150" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">Azure Boards</text>
  <text x="555" y="167" text-anchor="middle" fill="#fbbf24" font-size="8">Bug tracking</text>
  <text x="555" y="182" text-anchor="middle" fill="#fbbf24" font-size="8">Work items</text>
  <text x="555" y="197" text-anchor="middle" fill="#fbbf24" font-size="8">Sprint planning</text>
  <line x1="555" y1="90" x2="555" y2="130" stroke="#f59e0b" stroke-dasharray="4" stroke-width="1.5" marker-end="url(#a4)"/>
  <text x="340" y="245" text-anchor="middle" fill="#6b7280" font-size="8">All Azure DevOps services share identity (AAD) and work items automatically</text>
</svg>`,
          },
          { type: 'heading', text: 'Key Integrations for QA Teams' },
          {
            type: 'table',
            headers: ['Tool', 'Azure Integration', 'Benefit'],
            rows: [
              ['Jenkins', 'Azure DevOps plugin, VM agents', 'Jenkins on Azure VMs with auto-scaling agents'],
              ['Selenium', 'Azure VMs + AKS Grid', 'Distributed Grid with auto-scaling nodes'],
              ['Playwright', 'Azure Pipelines YAML', 'Built-in JUnit reporter → Azure Test Results'],
              ['Appium', 'Azure VMs (Windows/Mac)', 'iOS (Mac VMs) and Android testing'],
              ['Terraform', 'azurerm provider', 'IaC for test environment provisioning'],
              ['GitHub', 'GitHub Actions + Azure', 'Deploy to Azure from GitHub workflows'],
              ['Teams', 'Pipeline notifications', 'Test failure alerts directly in Teams channel'],
            ],
          },
          { type: 'tip', content: 'Azure Pipelines native integration with Azure Test Plans means every test run result is automatically visible in Test Plans — no extra configuration needed.' },
        ],
      },

      // ── 4. COMMON ERRORS ──────────────────────────────────────────────────────
      {
        title: '🚨 Common Azure Errors',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔧',
            content: 'Azure errors tend to fall into 4 categories: (1) Authorization failed — RBAC role is missing, (2) Resource not found — wrong subscription or resource group, (3) Quota exceeded — subscription limits, (4) Name already taken — storage accounts and other resources have globally unique name requirements. Once you know these patterns, most errors resolve quickly.',
          },
          {
            type: 'error-dictionary',
            framework: 'Azure',
            errors: [
              {
                error: 'AuthorizationFailed',
                fullMessage: 'The client does not have authorization to perform action \'Microsoft.Compute/virtualMachines/write\' over scope \'/subscriptions/.../resourceGroups/...\' with role assignment.',
                cause: { en: 'The Azure identity (user or service principal) does not have the required RBAC role. Azure uses Role-Based Access Control — even Owners of one resource group cannot access another.' },
                solution: { en: 'Go to Azure Portal → Resource Group → Access control (IAM) → Add role assignment → Contributor (or specific role like "Virtual Machine Contributor"). In CI/CD pipelines, assign the correct role to the Service Principal used by the Azure service connection.' },
              },
              {
                error: 'StorageAccountAlreadyTaken',
                fullMessage: 'The storage account named \'mytestreports\' is already taken.',
                cause: { en: 'Azure storage account names must be globally unique (3-24 lowercase alphanumeric characters). Someone in any Azure tenant worldwide already owns "mytestreports".' },
                solution: { en: 'Add your subscription ID or random suffix: "qareports$(az account show --query id -o tsv | cut -c1-8)" or include a timestamp. Never use generic names like "testreports" or "storage".' },
              },
              {
                error: 'Pipeline agent: No hosted parallelism available',
                fullMessage: 'No hosted parallelism has been purchased or granted. To request a free parallelism grant, please fill out the following form.',
                cause: { en: 'Azure DevOps changed its policy for new private projects: free Microsoft-hosted agent parallelism requires a one-time manual grant request. This affects newly created organizations running private repos.' },
                solution: { en: 'Option 1: Submit the Microsoft parallelism grant request form (takes 2-3 business days). Option 2: Use a self-hosted agent — install the agent on your own machine or Azure VM: download from Organization Settings → Agent pools → New agent. Option 3: Make the project public (instant free parallelism for open-source).' },
              },
              {
                error: 'VM provisioning timed out / stuck in Creating',
                fullMessage: 'Deployment failed. VM agent status is: Not Ready. Provisioning failed.',
                cause: { en: 'The chosen VM size has no available capacity in the selected region. Azure has varying capacity per region and size. This is common for GPU instances and specific VM sizes in busy regions.' },
                solution: { en: 'Try a different VM size (e.g., Standard_D2s_v3 instead of Standard_D2_v3) or a different region. Use "az vm list-skus --location westeurope --output table" to check available sizes. Spot VMs can also be capacity-constrained — use regular VMs for critical pipelines.' },
              },
              {
                error: 'az login: AADSTS50076 MFA required',
                fullMessage: 'AADSTS50076: Due to a configuration change made by your administrator, or because you moved to a new location, you must use multi-factor authentication to access.',
                cause: { en: 'The Azure AD tenant has Conditional Access policies requiring MFA. "az login" interactive mode triggers MFA, but unattended scripts cannot complete MFA interactively.' },
                solution: { en: 'Use a Service Principal for CI/CD: "az ad sp create-for-rbac --name qa-pipeline-sp --role Contributor --scopes /subscriptions/<id>". This gives appId, password, tenant — use these in CI with "az login --service-principal". Service Principals are excluded from interactive MFA policies by default.' },
              },
              {
                error: 'Container start failed: OOMKilled',
                fullMessage: 'Container group state: Failed. Last state: Terminated, Reason: OOMKilled.',
                cause: { en: 'The Azure Container Instance ran out of memory. Chrome/Selenium browsers are memory-intensive. A container with 1GB RAM is insufficient for more than 2-3 parallel browser sessions.' },
                solution: { en: 'Increase container memory: --memory 4 (4GB) for Selenium Grid nodes. Add --cpu 2 for multi-browser containers. For ACI: "az container create --memory 4 --cpu 2". For AKS: set resource limits in pod spec: resources.limits.memory: 4Gi. Also use --shm-size 2g when running Chrome in Docker.' },
              },
              {
                error: 'Pipeline task: Azure CLI version mismatch',
                fullMessage: 'ERROR: \'az\' is not recognized as an internal or external command / az: command not found',
                cause: { en: 'The pipeline uses AzureCLI@2 task but the script uses syntax from a newer version. Or the self-hosted agent does not have Azure CLI installed. Microsoft-hosted agents update CLI versions periodically.' },
                solution: { en: 'Pin the CLI version in your pipeline: "az upgrade --yes" at the start of the script, or use the AzureCLI@2 task which manages the version. For self-hosted agents: install Azure CLI manually and add it to PATH. Check "az --version" as a debug step in your pipeline.' },
              },
              {
                error: 'Blob upload: 403 This request is not authorized',
                fullMessage: '403 This request is not authorized to perform this operation using this permission.',
                cause: { en: 'The Shared Access Signature (SAS) token or access key is expired, has insufficient permissions, or the request IP is not in the allowed IP range. This also happens when the storage account firewall blocks access.' },
                solution: { en: 'Regenerate the SAS token with correct permissions (read/write/list) and future expiry date. If using account keys, ensure the key has not been rotated. Check storage account firewall settings: "Allow access from All networks" for CI/CD pipelines, or add the pipeline agent IP to the allowed list.' },
              },
              {
                error: 'AKS Pod stuck in Pending: Insufficient cpu/memory',
                fullMessage: 'Warning  FailedScheduling: 0/3 nodes are available: 3 Insufficient cpu, 3 Insufficient memory.',
                cause: { en: 'The AKS cluster does not have enough CPU or memory to schedule the test pod. All existing nodes are fully utilized by running test containers.' },
                solution: { en: 'Enable AKS Cluster Autoscaler: "az aks update --enable-cluster-autoscaler --min-count 1 --max-count 10". Add a new node pool for test workloads: "az aks nodepool add --name testpool --node-count 3". For immediate fix: scale up manually: "az aks nodepool scale --node-count 5". Use resource requests/limits correctly in pod specs to prevent over-reservation.' },
              },
            ],
          },
        ],
      },

      // ── 5. INTERVIEW Q&A ──────────────────────────────────────────────────────
      {
        title: '💼 Azure Interview Questions',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Azure',
            questions: [
              // ── BASIC (15) ─────────────────────────────────────────────────
              {
                level: 'basic',
                q: { en: 'Your team uses Azure DevOps. How do you set up a pipeline that automatically runs your Playwright tests on every pull request?' },
                a: { en: 'Create an azure-pipelines.yml file in the repository root. Set trigger: pr: ["*"] to trigger on all PRs. Add a pool with vmImage: ubuntu-latest (Microsoft-hosted agent). Steps: NodeTool@0 to install Node, script to run "npm ci && npx playwright install --with-deps", script to run "npx playwright test". Add PublishTestResults@2 task with JUnit format to show results in the pipeline UI. Commit the file — Azure DevOps picks it up automatically and validates all future PRs.' },
              },
              {
                level: 'basic',
                q: { en: 'What is a Resource Group in Azure and why should QA engineers use them?' },
                a: { en: 'A Resource Group is a logical container that holds related Azure resources (VMs, storage accounts, databases) for a solution. For QA engineers, they are essential because: (1) all test environment resources go in one group — easy to find and manage, (2) you can delete the entire test environment with one command: "az group delete --name qa-env-rg", (3) access control is applied at the group level — grant developers read access to the QA resource group without giving them access to production, (4) cost tracking per group in Azure Cost Management. Think of it as a folder for your cloud resources.' },
              },
              {
                level: 'basic',
                q: { en: 'What is Azure Blob Storage and what would a QA team store there?' },
                a: { en: 'Azure Blob Storage is Microsoft\'s object storage service — like a folder in the cloud that can hold unlimited files at low cost ($0.018/GB/month for cool tier). QA teams store: Playwright/Allure HTML reports, test failure screenshots and videos, JUnit XML results, test data CSV/JSON files, pipeline logs, and Postman collection exports. Blob Storage supports public URLs (for sharing reports with stakeholders) and SAS tokens (time-limited private access). It is comparable to AWS S3 — same concept, Azure naming.' },
              },
              {
                level: 'basic',
                q: { en: 'What is the difference between Azure Pipelines and GitHub Actions? When would you use Azure Pipelines?' },
                a: { en: 'Both are CI/CD platforms but with different homes. Azure Pipelines is part of Azure DevOps — tightly integrated with Azure Test Plans, Azure Boards, and Azure Repos. Use Azure Pipelines when: your organization uses Azure DevOps for test management (Test Plans), you need enterprise features like approval gates, release environments, and audit logs, you have private self-hosted agents on-premises or in Azure VMs. Use GitHub Actions when: your code is on GitHub and you want everything in one place, you prefer the GitHub marketplace for pre-built actions, your project is open-source.' },
              },
              {
                level: 'basic',
                q: { en: 'What is Azure Active Directory (AAD) and why does it matter for QA automation?' },
                a: { en: 'Azure Active Directory (now called Microsoft Entra ID) is Microsoft\'s identity service — the central login system for Azure and Microsoft 365. For QA automation: (1) Single sign-on means QA engineers use the same corporate login for Azure Portal, DevOps, and Teams — no separate accounts, (2) Service Principals (non-human identities) allow CI/CD pipelines to authenticate to Azure without a human credential — the pipeline gets its own identity with specific permissions, (3) Conditional Access policies can require MFA, which affects how pipelines must authenticate (use Service Principals, not interactive login).' },
              },
              {
                level: 'basic',
                q: { en: 'How do you run Playwright tests on a Microsoft-hosted Azure Pipelines agent?' },
                a: { en: 'Microsoft-hosted agents are pre-configured VMs (Ubuntu, Windows, or macOS) managed by Microsoft. For Playwright: (1) Set pool: vmImage: ubuntu-latest. (2) Install Node with NodeTool@0 task. (3) Run "npm ci" to install dependencies. (4) Run "npx playwright install --with-deps chromium" to install browser (note: do NOT use --with-deps on hosted agents for Firefox/WebKit — they are already partially installed). (5) Run "npx playwright test". (6) Publish results with PublishTestResults@2. Advantage: no setup, no maintenance. Limitation: 6-hour max build time, limited storage, and connection to private resources requires extra configuration.' },
              },
              {
                level: 'basic',
                q: { en: 'What is a Service Principal in Azure and when would a QA engineer create one?' },
                a: { en: 'A Service Principal is an identity for an application or service (not a human user) in Azure AD. Think of it as a "robot account" with specific permissions. QA engineers create Service Principals for: (1) CI/CD pipelines that need to upload to Blob Storage, start/stop VMs, or deploy resources — the pipeline authenticates as the SP, not as a human, (2) test automation scripts running unattended on servers, (3) third-party tools (like Terraform) that need to create Azure resources. Create with: "az ad sp create-for-rbac --name my-qa-sp --role Contributor --scopes /subscriptions/<id>". The output gives you appId, password, tenant — use these as credentials.' },
              },
              {
                level: 'basic',
                q: { en: 'How do you view the logs of a failed Azure pipeline step?' },
                a: { en: 'In Azure DevOps: go to Pipelines → click the failed run → click the failed job → click the failed step. Logs show in real-time (green/red lines). For more detail: click "View raw log" to download the full output. From CLI: "az pipelines runs logs list --run-id <id>" (requires azure-devops extension). For very long runs: logs are paginated — use "Download all logs as zip" button. If the build agent itself failed (not a test): check the "Initialize job" and "Checkout" steps first, as they run before your custom steps. Pipeline variables are also shown at the top of each step in debug mode.' },
              },
              {
                level: 'basic',
                q: { en: 'What is Azure Monitor and how would you use it to track your test pipeline health?' },
                a: { en: 'Azure Monitor is Microsoft\'s unified monitoring service. For QA pipelines: (1) Application Insights tracks application performance during load tests — response times, error rates, dependency calls, (2) Log Analytics workspace collects logs from all Azure resources in one place — query with KQL (Kusto Query Language), (3) Alerts: set a rule "notify when pipeline failure rate > 20% in the last hour" → sends email or Teams notification, (4) Workbooks: create a custom dashboard showing test pass rate, execution time trends, failure count per test over time. Azure Monitor is the equivalent of CloudWatch in AWS.' },
              },
              {
                level: 'basic',
                q: { en: 'What is an Azure Container Instance (ACI) and when would you use it for test execution?' },
                a: { en: 'Azure Container Instance lets you run a Docker container on demand without managing a VM or Kubernetes cluster. You pay per second. For QA: use ACI to run a Playwright or Selenium test container that starts, runs tests, uploads results to Blob Storage, and exits — ACI bills only for the 3-minute execution, not a running server. Command: "az container create --image mcr.microsoft.com/playwright --command-override \'npx playwright test\'". Best for: short, infrequent test runs where you do not want a persistent server. Not ideal for: high-frequency runs (Kubernetes is more efficient at scale).' },
              },
              {
                level: 'basic',
                q: { en: 'How do you delete all Azure test environment resources without leaving orphaned resources and incurring unnecessary costs?' },
                a: { en: 'Use Resource Groups: put all test environment resources in a dedicated resource group (e.g., qa-env-rg). After tests complete: "az group delete --name qa-env-rg --yes --no-wait". This deletes every resource in the group — VMs, disks, NICs, public IPs, storage accounts — atomically. The --no-wait flag returns immediately while deletion runs in the background. In Azure Pipelines: add a final stage with condition: always() that runs az group delete, ensuring cleanup even if tests fail. Tag resources: az group create --tags Environment=qa AutoDelete=true to identify temporary resources.' },
              },
              {
                level: 'basic',
                q: { en: 'What is Azure Test Plans and how does it differ from running automated tests in Azure Pipelines?' },
                a: { en: 'Azure Test Plans is the manual and exploratory testing module of Azure DevOps. It provides: test case authoring (step-by-step manual test procedures), test suites (organized groups of test cases), test runs (execute cases, mark pass/fail, attach screenshots), and defect linking (failed tests automatically link to Azure Boards work items). Azure Pipelines is for automated tests — it runs code (Playwright, JUnit, pytest) and reports results. The two complement each other: Pipelines runs regression automation, Test Plans manages manual exploratory testing. Results from both appear in the same Azure DevOps project under "Test Plans → Runs".' },
              },
              {
                level: 'basic',
                q: { en: 'How do you pass secrets (API keys, passwords) to an Azure Pipeline without storing them in the YAML file?' },
                a: { en: 'Use Azure DevOps Library or Azure Key Vault: (1) DevOps Library: go to Pipelines → Library → Variable Groups → add secret variables (marked as locked padlock). Reference in YAML: $(MY_SECRET). Values are masked in logs automatically. (2) Azure Key Vault: store secrets in Key Vault, link the Key Vault to a Variable Group in DevOps. Pipeline reads secrets from Key Vault at runtime. (3) Never put secrets in YAML directly — the YAML file is in Git and visible to anyone with repo access. Secrets in Library/Key Vault are encrypted at rest and only decrypted during pipeline execution.' },
              },
              {
                level: 'basic',
                q: { en: 'What is the Azure Free Tier and what can a QA engineer realistically do with it?' },
                a: { en: 'Azure Free Tier includes: $200 credit for first 30 days (use any service), then always-free services: 1 million Azure Function invocations/month, 5GB Blob Storage, Azure DevOps with 5 free users + 1,800 pipeline minutes/month, B1s VM (1 vCPU, 1GB RAM) free for 12 months, Azure SQL Database (S0 tier) free for 12 months. QA engineers can: run automated Playwright tests in Pipelines (1,800 min/month = ~30 full runs), store all test reports in Blob Storage, manage test cases in Azure Test Plans, run a small Jenkins agent on the free B1s VM. For a solo QA learning Azure: the free tier covers everything for 12 months.' },
              },
              {
                level: 'basic',
                q: { en: 'How do you trigger an Azure Pipeline to run only when tests in a specific folder change?' },
                a: { en: 'Use path filters in the YAML trigger: "trigger: paths: include: [\'tests/**\', \'src/**\'] exclude: [\'docs/**\']". This tells Azure Pipelines to only run when files under tests/ or src/ change — ignoring changes to documentation. For PR triggers: "pr: paths: include: [\'tests/**\']". For branch + path combination: "trigger: branches: include: [main, develop] paths: include: [src/**]". This reduces unnecessary pipeline runs and saves free minutes — if only the README changes, no test run is triggered.' },
              },

              // ── INTERMEDIATE (20) ──────────────────────────────────────────
              {
                level: 'intermediate',
                q: { en: 'Your Playwright test suite runs in 45 minutes sequentially. Design an Azure Pipelines strategy to run it in under 10 minutes.' },
                a: { en: 'Use parallel jobs with matrix strategy: (1) Create a matrix in azure-pipelines.yml: strategy: matrix: shard1: SHARD_INDEX: 1 shard2: SHARD_INDEX: 2 ... shard5: SHARD_INDEX: 5. (2) Each job runs: "npx playwright test --shard=$(SHARD_INDEX)/5". (3) All 5 jobs run simultaneously on 5 agents. (4) Each job publishes results. (5) A final job aggregates. With 5 parallel jobs: 45min / 5 = 9min. Cost: 5 × 9min = 45 agent-minutes (within the 1,800/month free). Alternatively, use Azure Container Apps Jobs for dynamic scaling.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you set up a self-hosted Azure Pipelines agent on an Azure VM to run tests against a private internal application?' },
                a: { en: '(1) Create a VM in the same VNet as the internal application. (2) Go to Azure DevOps → Organization Settings → Agent Pools → New pool. (3) In the VM: download the agent package, run config.sh --url https://dev.azure.com/<org> --token <PAT>. (4) Start the agent: sudo ./svc.sh install && sudo ./svc.sh start. (5) In pipeline YAML: pool: name: MyPrivatePool (instead of vmImage). (6) The agent runs in the VM\'s VNet, so it reaches the internal application without VPN. (7) Use VM scale sets for auto-scaling agents. Advantage: no public IP exposure for the internal app, no VPN tunneling needed.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you implement environment-specific variables in Azure Pipelines (dev, staging, prod) without duplicating YAML?' },
                a: { en: 'Use Variable Groups linked to environments: (1) Create 3 variable groups in Library: dev-vars (BASE_URL=http://dev.app.com), staging-vars (BASE_URL=http://staging.app.com), prod-vars. (2) In YAML, reference the group: variables: - group: $(ENV)-vars. (3) Use pipeline environments with approval gates: when deploying to staging, require QA lead approval. (4) Alternatively, use runtime parameters: parameters: - name: environment type: string values: [dev, staging, prod]. (5) Combine with Azure Key Vault variable groups for secrets — each environment has its own vault.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A developer asks you to integrate OWASP ZAP security scanning into your Azure Pipeline. How do you implement it?' },
                a: { en: '(1) Add a stage after functional tests: stage: Security. (2) Use ACI to run ZAP: az container create --image ghcr.io/zaproxy/zaproxy:stable --command-override "zap-baseline.py -t https://staging.myapp.com -J zap-report.json". (3) Upload ZAP JSON report to Blob Storage. (4) Add a script step that parses the JSON and fails the pipeline if HIGH or CRITICAL alerts exist: "jq \'.alerts[] | select(.riskcode >= 3)\' zap-report.json | wc -l" — if > 0, exit 1. (5) Publish ZAP report as pipeline artifact. (6) Link ZAP findings to Azure Boards bugs automatically via REST API if high vulnerabilities found.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you use Azure Container Apps Jobs to run Playwright tests at scale without managing Kubernetes?' },
                a: { en: 'Azure Container Apps Jobs are event-driven containers that run to completion. (1) Build a Docker image with Playwright + your tests: FROM mcr.microsoft.com/playwright → COPY . . → CMD ["npx", "playwright", "test"]. (2) Push to Azure Container Registry (ACR). (3) Create a Container Apps Environment. (4) Create a Job: "az containerapp job create --name playwright-job --environment my-env --image myacr.azurecr.io/playwright-tests --replica-timeout 600". (5) Run with different shard: trigger the job with SHARD environment variable per instance. (6) Results go to Blob Storage via azure CLI in post-test script. Benefits: no cluster management, auto-scale from 0, pay per execution second.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you implement approval gates in Azure Pipelines to prevent test deployment to production without QA sign-off?' },
                a: { en: '(1) Go to Pipelines → Environments → create "production" environment. (2) Add approval: Environments → production → Approvals and checks → Approvals → add QA lead user/group. (3) In YAML: use deployment job targeting the environment: "job: DeployToProd strategy: runOnce: deploy: environment: production". (4) When the pipeline reaches this stage, it pauses and sends email/Teams notification to approvers. (5) QA lead reviews test results (linked in the pipeline) and clicks Approve or Reject. (6) Add "Required template" check to enforce that the YAML must include the test stage before deployment — prevents bypassing tests.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Your team\'s Azure subscription costs are growing due to test environment VMs. How do you implement automatic shutdown to reduce costs?' },
                a: { en: '(1) Azure Auto-shutdown: go to each VM → Auto-shutdown → enable → set time (e.g., 7 PM daily). Sends notification email before shutdown. (2) Azure DevTest Labs: designed for QA/dev environments — auto-shutdown policies, cost limits per user, formula-based VM creation. (3) Azure Automation: runbook (PowerShell) on schedule: "Get-AzVM -ResourceGroupName qa-rg | Stop-AzVM -Force". (4) Tag-based shutdown: tag VMs with AutoShutdown=true, runbook finds tagged VMs and stops them. (5) Use Azure VM scale sets with scheduled scaling: 0 instances overnight, N instances during business hours. Typical saving: 65% cost reduction (16 hours off per day).' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you configure Azure Key Vault integration in your test automation to avoid storing credentials in code?' },
                a: { en: '(1) Create Key Vault: "az keyvault create --name qa-secrets-kv --resource-group qa-rg". (2) Add secrets: "az keyvault secret set --vault-name qa-secrets-kv --name db-password --value MyP@ssw0rd". (3) Grant pipeline access: Service Principal gets "Key Vault Secrets User" role on the vault. (4) In Azure Pipelines: create Variable Group linked to Key Vault (select vault and secrets to sync). (5) Reference in YAML: $(db-password) — Azure DevOps retrieves it at runtime, masked in logs. (6) In test code (Python): from azure.keyvault.secrets import SecretClient; client.get_secret("db-password"). Benefits: secrets rotated in Key Vault immediately apply to all pipelines, full audit log of who accessed which secret.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you set up nightly regression tests in Azure that provision a test database, run tests, and clean up automatically?' },
                a: { en: '(1) Create a scheduled trigger in YAML: schedules: - cron: "0 2 * * *" displayName: Nightly run branches: include: [main]. (2) Pipeline stages: → Stage 1: provision — "az sql server create" + "az sql db create" → Stage 2: migrate — run schema migration scripts → Stage 3: seed — run test data seeder → Stage 4: test — run full test suite against the new DB → Stage 5: cleanup (condition: always()) — "az sql server delete". (3) Use Azure Bicep or ARM template for stage 1 to ensure idempotent provisioning. (4) Pass DB connection string between stages as pipeline variables: "##vso[task.setvariable variable=DB_URL;isOutput=true]$dbUrl".' },
              },
              {
                level: 'intermediate',
                q: { en: 'Explain how Azure DevOps work items, test cases, and pipeline results are linked for full traceability.' },
                a: { en: 'Full traceability chain: (1) Azure Boards: create User Story "US-123: User can checkout". Link to test cases in Test Plans. (2) Azure Test Plans: test case "TC-456: Validate checkout form" is linked to US-123. (3) Developer creates branch "feature/us-123-checkout", opens PR. (4) Pipeline runs automatically: test "TC-456" result is published via JUnit → appears in the Pipeline run → also visible in Test Plans under the test case history. (5) If TC-456 fails: QA creates Bug work item from Test Plans → bug is automatically linked to US-123 and TC-456. (6) Developer fixes, PR passes CI → the same test case shows green in the next run → bug marked resolved. Every code change, test result, and bug traces back to the original requirement.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you use Azure Application Insights to monitor your application during load testing?' },
                a: { en: '(1) Instrument the application: add the Application Insights SDK, set the instrumentation key. (2) During JMeter/k6 load test: App Insights automatically captures request duration, error rate, dependency calls (SQL, external APIs). (3) In Azure Portal during the test: open App Insights → Live Metrics → watch real-time RPS, response time, failures as load increases. (4) After test: use Application Insights → Performance → filter by time range of test → see slowest requests and dependencies. (5) Set Alert: "alert if average response time > 2000ms during load test" → sends Teams notification. (6) Export results to Log Analytics: KQL query "requests | where timestamp > ago(1h) | summarize avg(duration) by bin(timestamp, 1m)".' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you implement test result trending and dashboards in Azure DevOps to report QA metrics to management?' },
                a: { en: '(1) Azure DevOps built-in: go to Test Plans → Runs → Analytics → Test Results Trend (built-in report showing pass rate, duration, flakiness over time). (2) Power BI integration: connect Power BI to Azure DevOps via OData feed → create custom dashboards with pass rate by module, test execution time, coverage trends. (3) Azure DevOps Dashboards: add widgets — "Test Results Trend", "Pipeline pass rate", "Build Duration". Share dashboard URL with stakeholders. (4) Scheduled email: Azure DevOps sends scheduled test summary emails. (5) Export to Excel via REST API: GET https://dev.azure.com/{org}/{proj}/_apis/test/runs?minLastUpdatedDate=... for weekly reports.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you migrate your team\'s test infrastructure from on-premises Jenkins to Azure Pipelines?' },
                a: { en: 'Migration in phases: (1) Inventory: document all Jenkins jobs, plugins, environment variables, secrets, and schedules. (2) Translate Jenkinsfile to azure-pipelines.yml — most concepts map directly (stages → stages, steps → steps, environment → variables). (3) Migrate secrets: move from Jenkins credentials store to Azure DevOps Library + Key Vault. (4) Migrate agents: replace Jenkins slaves with Azure DevOps self-hosted agents or Microsoft-hosted agents. (5) Run both in parallel: trigger Azure Pipelines alongside Jenkins for the same codebase for 2 weeks — compare results. (6) Cut over: disable Jenkins jobs one by one after Azure Pipelines is validated. (7) Decommission Jenkins server once all jobs are migrated and stable for 30 days.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you use Azure Container Registry (ACR) with Azure Pipelines to build and use a custom test Docker image?' },
                a: { en: '(1) Create ACR: "az acr create --name myqaregistry --sku Basic --resource-group qa-rg". (2) Build and push the test image in the pipeline: Docker@2 task with command: buildAndPush, repository: myqaregistry.azurecr.io/playwright-tests, tags: $(Build.BuildId). (3) In subsequent pipeline stages, use the exact image: container: image: myqaregistry.azurecr.io/playwright-tests:$(Build.BuildId). (4) Grant pipeline access to ACR: assign AcrPull role to the pipeline\'s Service Principal. (5) Benefits: test images are versioned (by Build ID), reused across multiple pipeline runs without rebuilding, and scanned by Defender for Containers automatically.' },
              },
              {
                level: 'intermediate',
                q: { en: 'What is Azure DevTest Labs and how does it help QA teams manage test environments?' },
                a: { en: 'Azure DevTest Labs is a managed service specifically designed for QA and developer environments. Features: (1) Formulas — pre-defined VM templates (OS + software) for instant environment creation, (2) Auto-shutdown — mandatory shutdown policies prevent forgetting to turn off VMs, (3) Cost thresholds — set max spend per user per month, get alerts when approaching limit, (4) Claimable VMs — QA engineers claim a pre-provisioned VM from a pool rather than waiting for provisioning, (5) Artifacts — scripts that run during VM creation to install tools (Chrome, Java, test framework), (6) Network isolation — each lab gets its own VNet. Compared to raw Azure VMs: DevTest Labs adds governance, cost control, and self-service for QA teams without infrastructure expertise.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you configure Azure Pipelines to run tests on both Windows and Linux in the same pipeline run?' },
                a: { en: 'Use a matrix or parallel jobs with different agents: strategy: matrix: Windows: vmImage: windows-latest Linux: vmImage: ubuntu-latest macOS: vmImage: macOS-latest. Each matrix job runs the same steps on a different OS. OS-specific scripts: use condition expressions "eq(variables[\'Agent.OS\'], \'Windows_NT\')" to run PowerShell on Windows and bash on Linux. Platform-specific considerations: file paths (/ vs \\\\), line endings, ChromeDriver location. Publish results from all 3 platforms to the same pipeline run — results are aggregated in the Test tab. This catches cross-platform bugs before production deployment.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you implement rollback testing in Azure DevOps — automatically reverting a deployment if smoke tests fail?' },
                a: { en: '(1) Deploy with Azure App Service deployment slots: swap to staging slot first. (2) Run smoke tests against staging slot URL. (3) If tests pass: swap staging to production ("az webapp deployment slot swap"). (4) If tests fail: no swap — production is untouched. (5) For zero-downtime rollback: if tests were already swapped to prod and post-deployment tests fail, trigger rollback job: "az webapp deployment slot swap --slot production --target-slot staging" (swap back). (6) In pipeline YAML: condition: failed() on rollback job. (7) Notify via Teams webhook: "Deployment #{Build.BuildId} rolled back — smoke tests failed".' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you handle test data isolation in Azure when multiple pipelines share the same test database?' },
                a: { en: 'Strategies: (1) Schema isolation: each pipeline run creates its own database schema (CREATE SCHEMA run_$(Build.BuildId)), runs tests, drops schema. (2) Transaction isolation: wrap each test in a transaction, roll back after test (works for unit tests, not E2E). (3) Dedicated databases: each parallel test agent gets its own Azure SQL database via dynamic provisioning with ARM template or Terraform. (4) Azure SQL Elastic Pools: pre-provision a pool of 10 test databases, pipeline checks out one from the pool, uses it, returns it. (5) Containerized database: each pipeline spins up SQL Server in Docker via ACI — guaranteed clean state, no sharing. Option 4 (elastic pool) is best for high-frequency pipelines.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you use Azure Chaos Studio for resilience testing as part of your QA process?' },
                a: { en: 'Azure Chaos Studio runs controlled fault injection experiments. QA integration: (1) Define experiments: VM shutdown (AZ failure simulation), App Service stop, SQL connection disruption, AKS pod failure. (2) Create experiment in Azure Portal → select targets → add faults → set duration. (3) Integrate with Azure Pipelines: CLI step "az chaos experiment start --name qa-chaos-experiment" after deployment. (4) Monitor with Azure Monitor: track error rates, response times during chaos. Define steady-state hypothesis before experiment. (5) Compare: run load test without chaos (baseline), then with chaos (resilience score). (6) Automatic recovery validation: measure time-to-recovery after AZ failover.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you implement cross-browser testing on Azure using Selenium Grid in AKS?' },
                a: { en: '(1) Deploy Selenium Grid to AKS with Helm: "helm install selenium-grid docker-selenium/selenium-grid". (2) The chart deploys Hub, Chrome nodes, Firefox nodes as separate Deployments. (3) Configure HPA (Horizontal Pod Autoscaler): scale Chrome nodes from 2 to 20 based on pending sessions. (4) Service: expose Hub on port 4444 via ClusterIP (internal). (5) Test code: RemoteWebDriver with Capabilities(browser: "chrome/firefox") → AKS routes to correct node type. (6) Azure Pipeline parallelism: 10 agents each running a subset of tests → all hitting the AKS Grid simultaneously. (7) After pipeline: "kubectl scale deployment selenium-chrome-node --replicas=0" to save cost. (8) Use Azure Container Registry for custom Selenium node images with company SSL certificates pre-installed.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you implement compliance testing in Azure to verify infrastructure matches your organization\'s security standards?' },
                a: { en: '(1) Azure Policy: define rules like "All storage accounts must have HTTPS only" or "No VMs with public IPs in QA subscription". Non-compliant resources are flagged. (2) Azure Security Center (Defender for Cloud): continuously scans resources for misconfigurations — open ports, unencrypted disks, missing patches. (3) Pipeline compliance check: add a step that calls "az policy state list --filter \'complianceState eq Non-Compliant\'" — fail pipeline if non-compliant resources exist. (4) Microsoft Defender for DevOps: scans the repository (IaC files like Bicep/Terraform) for misconfigurations before deployment. (5) Azure Compliance Manager: maps your controls to SOC 2, ISO 27001, GDPR — tracks which Azure configurations satisfy each requirement.' },
              },

              // ── ADVANCED (15) ──────────────────────────────────────────────
              {
                level: 'advanced',
                q: { en: 'Design a complete Azure-based CI/CD and test architecture for a 15-microservice application using Azure Kubernetes Service.' },
                a: { en: 'Architecture: (1) Code: each service in its own Azure Repo with branch policies (minimum 1 reviewer, passing CI required). (2) CI per service: Azure Pipeline triggers on PR → builds Docker image → pushes to ACR → runs unit tests + contract tests (Pact). (3) Integration tests: Helm deploys the service + mocked dependencies to a temporary AKS namespace (test-{BuildId}) → API tests run → namespace deleted. (4) E2E tests: nightly pipeline deploys all 15 services to a dedicated AKS namespace → Playwright tests run → namespace deleted. (5) Observability: App Insights SDK in all services → distributed traces visible during test runs → correlate test failures with specific service errors. (6) Promotion: changes merge to main → CD pipeline deploys to staging → QA approval gate → deploy to prod. Each step is gated.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you design a disaster recovery testing strategy using Azure services that tests the RTO and RPO of a production system?' },
                a: { en: '(1) Define targets: RTO (Recovery Time Objective) = 4 hours, RPO (Recovery Point Objective) = 1 hour. (2) Chaos Studio experiment: trigger Azure SQL geo-failover + primary region VM shutdown simultaneously. (3) Automated recovery validation: Azure Function polls endpoint every 30 seconds → records first successful response timestamp → calculates actual RTO. (4) Data integrity check: after failover, Azure Function queries secondary DB for last record timestamp → compares to last known write → calculates actual RPO. (5) Azure Pipeline runs DR test on a monthly schedule. (6) Results published to Azure DevOps Test Plans as a manual test run result — provides audit trail for compliance. (7) If RTO or RPO exceeds target: Pipeline fails, Azure Boards bug created, team notified via Teams.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you implement a shift-left security testing approach in Azure DevOps that catches vulnerabilities at every stage of the pipeline?' },
                a: { en: 'Shift-left means catching issues as early as possible: (1) Pre-commit: developers run SAST locally with GitHub Advanced Security (GHAS) or SonarLint. (2) PR stage: Microsoft Defender for DevOps scans IaC (Bicep/Terraform) for misconfigurations. GitHub/Azure Repos code scanning finds OWASP Top 10 patterns. (3) Build stage: Trivy or Aqua scans Docker images for CVEs — fail pipeline if CRITICAL CVEs in base image. (4) Deploy to staging: OWASP ZAP active scan via ACI. (5) Load test + security: k6 with custom extensions checks for security headers, HTTPS enforcement. (6) All findings aggregated in Microsoft Defender for Cloud → unified dashboard. (7) Fail pipeline on CRITICAL findings at any stage.' },
              },
              {
                level: 'advanced',
                q: { en: 'Explain how to build a self-healing test infrastructure on Azure that automatically recovers from agent failures without human intervention.' },
                a: { en: '(1) Use Azure VM Scale Sets for pipeline agents: VMSS with min=0, max=10 agents. Azure DevOps scale set agent pool autoscales based on queue depth. (2) Health probe: custom Azure Monitor alert detects when an agent goes offline → triggers Azure Automation runbook. (3) Runbook: deletes the unhealthy VM instance → VMSS automatically creates a replacement from the base image + startup script. (4) Azure DevOps pipeline timeout: if a job runs >2h (indicator of agent hang), job cancels and re-queues automatically. (5) Blob Storage as persistent state: test artifacts written to Blob immediately (not just at end), so a mid-run agent failure does not lose all results. (6) Azure Pipeline retry policy: failed jobs retry up to 3 times automatically before alerting.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you implement performance regression detection in Azure that automatically blocks deployments when response time degrades?' },
                a: { en: '(1) Establish baseline: after each successful deployment to staging, run k6/JMeter and store P50/P95/P99 metrics in Azure Table Storage (run_date, endpoint, p95_ms). (2) On next deployment: run same test → compare to last 5 baselines → calculate percent change. (3) If P95 increases >20% for any endpoint: fail the pipeline and create Azure Boards bug with comparison chart. (4) Implement with Azure Function: triggered by pipeline, queries Table Storage, runs comparison, calls Azure DevOps REST API to fail the build. (5) Application Insights built-in: Smart Detection automatically emails performance anomalies. (6) Use Grafana with Azure Monitor data source for visual trend dashboard. Alert: "p95 response time 50% above 30-day average" → Teams notification.' },
              },
              {
                level: 'advanced',
                q: { en: 'Your organization requires all Azure infrastructure to be provisioned via Infrastructure as Code with no manual changes allowed. How do you enforce this in a QA context?' },
                a: { en: '(1) Azure Policy: "deny" policy for manual resource creation outside of specific resource groups or tags. (2) Azure Blueprints: define the complete test environment (VNet, NSG, VMs, storage) as a blueprint — deploy with one command, guaranteed compliance. (3) Terraform with Azure backend: all IaC in Git → "terraform plan" in PR → "terraform apply" in pipeline. State locked in Azure Storage with soft-delete enabled. (4) Drift detection: scheduled pipeline runs "terraform plan" against existing infrastructure → if drift detected (someone made manual change), pipeline fails and sends alert. (5) RBAC: QA engineers have "Reader" role in Azure (view only) — only the pipeline Service Principal has "Contributor". Manual changes are blocked at the authorization level.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you build a contract testing platform on Azure that prevents breaking changes between microservices?' },
                a: { en: '(1) Deploy Pact Broker to Azure: ACI or AKS deployment, PostgreSQL in Azure DB for backend. Or use Pactflow SaaS. (2) Consumer pipeline: after unit tests, publish pact to Pact Broker: "npx pact-broker publish ./pacts --broker-base-url https://pact.mycompany.azure.com". (3) Provider pipeline: additional "Contract" stage runs "npx pact-provider-verifier" against staging. (4) Pact Broker webhook: new pact published → calls Azure Pipelines REST API to trigger provider verification pipeline. (5) Can I Deploy step: before promoting to staging, Lambda-equivalent Azure Function calls Pact Broker API — "can-i-deploy?consumer=checkout&consumer-version=1.2.3&environment=staging". Fails if contract not verified. (6) Results in Azure Boards: failed contracts create bugs automatically via webhook.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you implement a blue-green deployment with automated quality gates in Azure App Service?' },
                a: { en: '(1) Configure deployment slots: production slot + staging slot in Azure App Service. (2) CI/CD pipeline: deploy to staging slot first. (3) Quality gate stage: run smoke tests against staging.myapp.azurewebsites.net. Run performance test: k6 for 5 min, ensure P95 < 300ms. Run security scan: ZAP baseline scan. (4) All gates pass → "az webapp deployment slot swap --slot staging --target-slot production". (5) Post-swap: run a final smoke test against production URL to confirm swap was successful. (6) Auto-rollback: if post-swap tests fail, swap back immediately: "az webapp deployment slot swap --slot production --target-slot staging". (7) Azure Monitor alert: track any spike in HTTP 5xx errors after swap → auto-trigger rollback runbook if error rate > 5%.' },
              },
              {
                level: 'advanced',
                q: { en: 'You manage Azure QA infrastructure for 10 development teams. Design a cost governance model that tracks, allocates, and controls spending per team.' },
                a: { en: '(1) Azure subscriptions: one subscription per team (or management group with department-level policies). (2) Mandatory tagging: Azure Policy denies resource creation without tags: TeamName, Project, Environment, CostCenter. (3) Azure Cost Management: cost view filtered by tag → export to CSV monthly → shared with each team lead. (4) Budgets: each team gets a budget with 80% alert (email) and 100% action (stop new resource creation via budget alert → Logic App → deny IAM policy). (5) Reserved Instances: identify always-on resources (Jenkins controller, shared test DB) and purchase 1-year RIs — 40% saving. (6) Shared services model: create a central "platform" subscription for shared tools (Pact Broker, artifact storage), charged proportionally to teams. (7) Monthly FinOps review: Azure Advisor recommendations + unused resource cleanup.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you architect an Azure solution for testing a real-time streaming application (e.g., Azure Event Hubs) to ensure messages are processed correctly under load?' },
                a: { en: '(1) Test environment: Azure Event Hubs (Standard tier) with 10 partitions. Consumer app in AKS with 10 replicas. (2) Load test: custom k6 extension sends 100,000 events/second to Event Hub. Azure Functions consumer records processing timestamps and writes to Cosmos DB. (3) Latency assertion: Azure Function checks event timestamp vs processing timestamp → assert < 500ms for 99th percentile. (4) Throughput validation: Azure Monitor metrics for Event Hub: IncomingMessages vs OutgoingMessages → assert 0 dropped messages. (5) Backpressure test: stop consumers for 2 minutes (retention period test) → restart → assert all messages processed within SLA. (6) Results: all assertions written to Azure Table Storage → test pipeline reads and fails/passes based on thresholds.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you implement test environment provisioning on-demand via a Teams bot to enable QA engineers to spin up environments without Azure knowledge?' },
                a: { en: '(1) Create a Teams bot using Azure Bot Service + Azure Functions backend. (2) Teams slash command: "/create-env staging-v2 for 4 hours". (3) Function receives message, validates request, calls Azure Pipelines REST API to trigger an IaC pipeline (Bicep/Terraform). (4) Pipeline provisions: resource group, VMs, database, app deployment → outputs environment URL. (5) Bot replies in Teams: "Your environment is ready at https://staging-v2-xyz.azurewebsites.net (expires in 4 hours)". (6) Scheduled cleanup: Azure Function at expiry time deletes the resource group. (7) Cost guard: Function rejects requests if team monthly spend already >$500 (queries Azure Cost Management API). (8) Audit log: all environment creation/deletion logged to Azure Log Analytics for compliance.' },
              },
              {
                level: 'advanced',
                q: { en: 'How do you migrate a test suite that uses on-premises SQL Server to Azure SQL while ensuring identical behavior and catching any SQL dialect differences?' },
                a: { en: '(1) Assessment: use Azure Database Migration Service (DMS) assessment tool — scans existing SQL scripts, stored procedures, and queries → reports compatibility issues with Azure SQL. (2) Compatibility layer: Azure SQL is mostly compatible but lacks some SQL Server features (SQL Agent, linked servers, Windows auth). Address each in tests: mock SQL Agent jobs with Azure Functions, replace linked servers with Elastic Query. (3) Test data migration: DMS migrates schema + data to Azure SQL Managed Instance (full compatibility) first, then validate. (4) Parallel run: modify test configuration to run against both on-prem SQL and Azure SQL simultaneously — compare results for 2 weeks. (5) Dialect checks: run query analyzer to find T-SQL syntax not in Azure SQL (no sp_MSforeachtable, etc.). (6) Connection string: ensure tests use SQL auth, not Windows auth (Azure SQL does not support Kerberos from CI agents).' },
              },
              {
                level: 'advanced',
                q: { en: 'Design an observability strategy for a QA pipeline on Azure so that any failure can be root-caused within 5 minutes.' },
                a: { en: '(1) Centralized logging: all pipeline steps, test containers, and app services send logs to Log Analytics. KQL query for failures: "AzureDiagnostics | where ResultType == \'Failed\' | project TimeGenerated, OperationName, ResultDescription". (2) Distributed tracing: Application Insights correlation ID spans from pipeline trigger through test execution through app calls → single trace shows where failure occurred. (3) Test step timing: each test step emits a custom event to App Insights with duration → identify which step is slow. (4) Alerts: Logic App triggered by specific log pattern ("NullPointerException in checkout service") → queries App Insights → attaches trace to Teams notification. (5) Runbook correlation: when pipeline fails, Azure Automation runbook automatically captures: recent deployments (ADO REST API), current alerts (Azure Monitor), resource health (Azure Resource Health) → creates Teams message with all context. 5-minute MTTR becomes achievable.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you implement feature flag testing in Azure to enable QA to test unreleased features in production without affecting real users?' },
                a: { en: '(1) Use Azure App Configuration with feature flags: "az appconfig feature set --name new-checkout-flow --yes". (2) Application reads feature flags at startup or request-time. (3) QA-specific flag targeting: configure the flag to enable only for users with email *@qa.mycompany.com or with a specific header "X-QA-User: true". (4) Playwright test: set custom HTTP headers to enable the feature flag for all test requests. (5) Pipeline flag control: before QA tests, enable flag: "az appconfig feature enable --name new-checkout-flow". After tests: disable. (6) Flag state validation: test asserts that the feature IS enabled for QA user and IS NOT enabled for regular user (two separate test runs). (7) Azure App Config integrates with App Service and AKS via Config Map — zero application restart needed for flag changes.' },
              },
              {
                level: 'advanced',
                q: { en: 'Your company is adopting a multi-cloud strategy using both Azure and AWS. How do you build a unified test pipeline that works across both clouds?' },
                a: { en: '(1) Use GitHub Actions (or Azure Pipelines) as the neutral orchestrator — both clouds have native integrations. (2) Cloud-agnostic IaC: Terraform with both azurerm and aws providers in the same codebase. Module structure: modules/compute/azure → ACI, modules/compute/aws → ECS. (3) Unified secret store: use HashiCorp Vault (hosted on a neutral VM or SaaS) with AWS and Azure auth methods — single secret source for both clouds. (4) Test artifacts: replicate reports to both Azure Blob and S3 using rclone — teams from both sides can access results. (5) Cloud-parity tests: run the same test suite against Azure and AWS deployments → compare response times, feature behavior, error messages — catch cloud-specific bugs. (6) Cost aggregation: use CloudHealth or Azure Cost Management multi-cloud connector to track total spend in one dashboard.' },
              },
            ],
          },
        ],
      },
    ],
  },

  tr: {
    hero: {
      title: '🔷 Microsoft Azure',
      subtitle: 'QA Mühendisleri için Cloud Platformu',
      intro: 'Modern QA iş akışlarında kullanılan Azure DevOps, Azure Pipelines ve Azure cloud servislerini öğren — test ortamı kurulumundan CI/CD otomasyonuna ve test raporlamaya kadar.',
    },
    tabs: [
      '🎯 Giriş',
      '⚙️ Kurulum',
      '🛠️ Gerçek Hayat',
      '🔗 Ekosistem',
      '🚨 Yaygın Hatalar',
      '💼 Mülakat Soruları',
    ],
    sections: [
      // ── 0. GİRİŞ ─────────────────────────────────────────────────────────────
      {
        title: '🎯 Microsoft Azure Nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏙️',
            content: 'Sana daire, ofis, depo ve bir yol ağı kiralayan ve yalnızca her gün kullandığın kadar ücret alan bir şehir hayal et. Microsoft Azure, yazılım için o şehirdir: sanal bilgisayarlar, veritabanları, ağlar ve yazılım servislerini saatlik kiralar. Testlerin bittiğinde "taşınırsın" ve ödemeyi bırakırsın.',
          },
          {
            type: 'text',
            content: 'Azure, Microsoft\'un cloud platformudur ve AWS\'den sonra dünyada en büyük ikinci platformdur. QA mühendisleri için Azure\'un öne çıktığı nokta Azure DevOps\'tur — repo\'lar, pipeline\'lar, test planları ve board\'ları tek bir yerde sunan, birçok kurumsal şirketin zaten kullandığı all-in-one platform. Şirketin Microsoft 365 veya Visual Studio kullanıyorsa Azure entegrasyonu kusursuzdur.',
          },
          { type: 'heading', text: 'QA Mühendisleri Neden Azure ile Çalışır?' },
          {
            type: 'grid', cols: 3,
            items: [
              { icon: '🔁', label: 'Azure DevOps', desc: 'Repo\'lar + Pipeline\'lar + Test Planları + Board\'lar tek yerde. Cloud ile entegre en eksiksiz QA platformu.' },
              { icon: '🖥️', label: 'Virtual Machines', desc: 'Selenium Grid, test uygulaması veya herhangi bir sunucu iş yükü için dakikalar içinde Windows veya Linux VM başlat.' },
              { icon: '🐳', label: 'AKS & Container Apps', desc: 'Azure Kubernetes Service\'de container\'larda Playwright testleri çalıştır — paralel, ölçeklenebilir, serverless.' },
              { icon: '📊', label: 'Azure Test Plans', desc: 'Work item\'lara, bug\'lara ve gereksinimlere tam izlenebilirlikle manuel ve keşifsel test yönetimi.' },
              { icon: '📦', label: 'Azure Blob Storage', desc: 'Test artifact\'larını (raporlar, screenshot\'lar, videolar) ölçekli ve ucuza sakla.' },
              { icon: '🔗', label: 'Enterprise Entegrasyonu', desc: 'Microsoft 365, Active Directory, Teams ve Visual Studio ile native entegrasyon — ek kurulum yok.' },
            ],
          },
          { type: 'heading', text: 'QA için Azure vs AWS vs GCP' },
          {
            type: 'table',
            headers: ['Özellik', 'Azure', 'AWS', 'GCP'],
            rows: [
              ['Native CI/CD', 'Azure DevOps ✅ (en iyi)', 'CodePipeline', 'Cloud Build'],
              ['Test Planları', 'Azure Test Plans ✅', '❌ native yok', '❌ native yok'],
              ['Windows VM', 'En iyi ✅ (Microsoft)', 'İyi', 'İyi'],
              ['Enterprise AD', 'Native ✅ (AAD)', 'Manuel kurulum', 'Manuel kurulum'],
              ['Free tier', '12 ay + her zaman ücretsiz', '12 ay', '90 gün'],
              ['Pazar payı', '%22 (2. sıra)', '%32 (1. sıra)', '%11 (3. sıra)'],
              ['İş ilanları', 'Kurumsallarda güçlü', 'En geniş talep', 'Startup\'larda büyüyor'],
            ],
          },
          { type: 'heading', text: 'QA için Temel Azure Servisleri' },
          {
            type: 'list', icon: '▸',
            items: [
              { label: 'Azure Virtual Machines', desc: ' — tam VM (Windows/Linux). Selenium Grid, Jenkins agent, test app server çalıştır.' },
              { label: 'Azure DevOps Pipelines', desc: ' — CI/CD. Her git push\'ta build ve test. 5 kullanıcı için ücretsiz.' },
              { label: 'Azure Blob Storage', desc: ' — S3 gibi nesne depolama. Test raporları, screenshot\'lar, loglar sakla.' },
              { label: 'Azure Container Instances (ACI)', desc: ' — VM yönetmeden Docker container çalıştır. Kısa test çalışmaları için ideal.' },
              { label: 'AKS (Azure Kubernetes Service)', desc: ' — managed Kubernetes. Ölçekte paralel Selenium/Playwright testleri çalıştır.' },
              { label: 'Azure SQL / Cosmos DB', desc: ' — managed veritabanlar. Dakikalar içinde test veritabanı oluştur.' },
              { label: 'Azure Monitor / App Insights', desc: ' — loglama ve izleme. Test loglarını görüntüle, alarm kur, performansı izle.' },
              { label: 'Azure Test Plans', desc: ' — test case\'leri, çalışmaları ve hata takibiyle web tabanlı manuel test aracı.' },
            ],
          },
          { type: 'tip', content: 'Azure DevOps açık kaynak projeler için ücretsizdir ve özel projeler için 5 ücretsiz kullanıcı + aylık 1.800 ücretsiz pipeline dakikası verir. Birçok QA ekibi hiçbir şey ödemeden kullanıyor.' },
        ],
      },

      // ── 1. KURULUM ────────────────────────────────────────────────────────────
      {
        title: '⚙️ Azure CLI Kurulumu',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Azure\'nun iki giriş noktası var: Azure Portal (portal.azure.com\'daki web arayüzü) ve Azure CLI (komut satırı aracı). Portal arabağlantı paneli gibidir, CLI ise doğrudan kontrol ettiğin motor gibi. QA otomasyonu için CLI\'a ihtiyacın var — bir insanın tıklamaması gereksinmeden script\'lerde ve pipeline\'larda çalışır.',
          },
          { type: 'heading', text: 'Adım 1 — Azure Hesabı Oluştur' },
          {
            type: 'list', icon: '①',
            items: [
              'azure.microsoft.com → "Start free" tıkla',
              'Microsoft hesabıyla giriş yap (veya yeni oluştur)',
              'Kişisel bilgiler + kredi kartı doldur (Free tier 30 günlük $200 kredi + her zaman ücretsiz servisler)',
              'Telefon doğrulama',
              'Hesap hemen hazır — bekleme süresi yok',
            ],
          },
          { type: 'tip', content: 'Azure ilk 30 gün için $200 ücretsiz kredi + her zaman ücretsiz servisler veriyor (Azure Functions aylık 1M çağrı, Blob Storage 5GB). Limitler içinde kalırsan ücret yok.' },
          { type: 'heading', text: 'Adım 2 — Azure CLI Kur' },
          {
            type: 'code', language: 'bash',
            code: `# Windows — winget
winget install Microsoft.AzureCLI

# macOS — Homebrew
brew update && brew install azure-cli

# Linux (Ubuntu/Debian)
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Kurulumu doğrula
az --version
# Beklenen çıktı: azure-cli 2.x.x ...`,
          },
          { type: 'heading', text: 'Adım 3 — Login & Subscription Ayarla' },
          {
            type: 'code', language: 'bash',
            code: `# Login — Microsoft giriş için tarayıcı açar
az login

# Mevcut subscription\'ları listele
az account list --output table

# Kullanılacak subscription\'ı ayarla
az account set --subscription "My QA Subscription"

# Mevcut subscription\'ı doğrula
az account show`,
          },
          { type: 'heading', text: 'Adım 4 — Resource Group Oluştur' },
          {
            type: 'code', language: 'bash',
            code: `# Resource Group = tüm ilgili resource'lar için mantıksal kapsayıcı
az group create \\
  --name qa-test-rg \\
  --location westeurope

# Resource group'ları listele
az group list --output table

# Sonradan — gruptaki her şeyi tek komutla sil (temizlik)
az group delete --name qa-test-rg --yes --no-wait`,
          },
          { type: 'heading', text: 'Adım 5 — Blob Storage ile Test Et' },
          {
            type: 'code', language: 'bash',
            code: `# Storage account oluştur (ad global olarak benzersiz olmalı)
az storage account create \\
  --name myqastorage$RANDOM \\
  --resource-group qa-test-rg \\
  --location westeurope \\
  --sku Standard_LRS

# Blob container oluştur
az storage container create \\
  --name test-reports \\
  --account-name myqastorage12345 \\
  --public-access blob

# Dosya yükle
echo "Merhaba Azure" > test.txt
az storage blob upload \\
  --account-name myqastorage12345 \\
  --container-name test-reports \\
  --name test.txt \\
  --file test.txt`,
          },
        ],
      },

      // ── 2. GERÇEK HAYAT ───────────────────────────────────────────────────────
      {
        title: '🛠️ Gerçek Hayat — Azure\'da QA',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏗️',
            content: 'Bir bankadaki QA ekibini hayal et. E-posta için Microsoft 365, sohbet için Teams, geliştirme için Visual Studio ve test yönetimi için Azure DevOps kullanıyorlar. Her şey zaten Microsoft ekosisteminde. Test ortamları için Azure cloud eklemek, sıfır ek giriş, sıfır ekstra araç anlamına gelir — her şey birlikte çalışır.',
          },
          { type: 'heading', text: 'Senaryo: Playwright için Azure DevOps Pipeline' },
          {
            type: 'code', language: 'yaml',
            code: `# azure-pipelines.yml — main'e her push'ta Playwright çalıştırır
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'   # Microsoft hosted agent (aylık 1.800 dk ücretsiz)

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Node.js Kur'

  - script: |
      npm ci
      npx playwright install --with-deps chromium
    displayName: 'Bağımlılıkları kur'

  - script: npx playwright test --reporter=html,junit
    displayName: 'Playwright testleri çalıştır'
    continueOnError: true

  - task: PublishTestResults@2
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: 'test-results/*.xml'
    displayName: 'Test sonuçlarını yayımla'

  - task: PublishPipelineArtifact@1
    inputs:
      targetPath: 'playwright-report'
      artifact: 'playwright-html-report'
    displayName: 'HTML raporu yükle'`,
          },
          { type: 'heading', text: 'Senaryo: Azure VM\'de Selenium Grid' },
          {
            type: 'code', language: 'bash',
            code: `# Test ortamı için Resource Group oluştur
az group create --name selenium-grid-rg --location westeurope

# Selenium Hub için VM oluştur
az vm create \\
  --resource-group selenium-grid-rg \\
  --name selenium-hub \\
  --image Ubuntu2204 \\
  --size Standard_D2s_v3 \\
  --admin-username qauser \\
  --generate-ssh-keys \\
  --public-ip-sku Standard

# Selenium Grid için port 4444 aç
az vm open-port --resource-group selenium-grid-rg \\
  --name selenium-hub --port 4444

# Bitince temizle — para tasarrufu
az group delete --name selenium-grid-rg --yes --no-wait`,
          },
          { type: 'heading', text: 'Senaryo: Azure Blob Storage\'da Rapor Sakla' },
          {
            type: 'code', language: 'bash',
            code: `# Test çalışmasından sonra Playwright raporunu Blob Storage'a yükle
ACCOUNT="myqareports"
CONTAINER="playwright-reports"
RUN_ID=$(date +%Y%m%d-%H%M)

az storage blob upload-batch \\
  --account-name $ACCOUNT \\
  --destination $CONTAINER/$RUN_ID \\
  --source playwright-report/

# 7 günlük SAS URL oluştur (ekiple paylaş)
az storage blob generate-sas \\
  --account-name $ACCOUNT \\
  --container-name $CONTAINER \\
  --name $RUN_ID/index.html \\
  --permissions r \\
  --expiry $(date -u -d '+7 days' +%Y-%m-%dT%H:%MZ) \\
  --full-uri`,
          },
          { type: 'heading', text: 'QA için Azure vs AWS — Karşılaştırma' },
          {
            type: 'table',
            headers: ['Kullanım Senaryosu', 'Azure', 'AWS', 'Kazanan'],
            rows: [
              ['CI/CD pipeline\'ları', 'Azure Pipelines ✅', 'CodePipeline', 'Azure (daha fazla özellik)'],
              ['Manuel test yönetimi', 'Azure Test Plans ✅', '❌ native yok', 'Azure'],
              ['Windows test VM', 'Native ✅', 'İyi', 'Azure'],
              ['Selenium Grid maliyeti', '~$0.10/saat Standard_D2', '~$0.09/saat t3.medium', 'Beraberlik'],
              ['Container desteği', 'ACI, AKS ✅', 'ECS, EKS', 'Beraberlik'],
              ['Enterprise SSO', 'Azure AD native ✅', 'Manuel', 'Azure'],
              ['Serverless test', 'Azure Functions', 'Lambda ✅', 'AWS (daha olgun)'],
              ['Mobil test', '❌ native yok', 'Device Farm ✅', 'AWS'],
            ],
          },
          { type: 'tip', content: 'Azure Pipelines Microsoft hosted agent\'larda aylık 1.800 ücretsiz dakika veriyor. Bu yaklaşık 30 tam Playwright test çalışması demek — tamamen ücretsiz.' },
        ],
      },

      // ── 3. EKOSİSTEM ─────────────────────────────────────────────────────────
      {
        title: '🔗 Azure Ekosistemi',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧩',
            content: 'QA için Azure servisleri bir bayrak yarışı gibi çalışır: Azure DevOps bayraği başlatır (kod push\'unda pipeline tetikler), Azure Pipelines birinci ayağı koşar (build ve test), Azure Container Instances ikinci ayağı sprint yapar (test container\'ları çalıştırır), Azure Blob Storage bitiş çizgisini geçer (raporu saklar). Her servis sonrakine otomatik olarak devam eder.',
          },
          { type: 'heading', text: 'Azure DevOps Derinlemesine' },
          {
            type: 'grid', cols: 2,
            items: [
              { icon: '📁', label: 'Azure Repos', desc: 'Branch policy\'leri, pull request iş akışları ve kod incelemesiyle Git repo\'ları. Azure içinde tam GitHub benzeri deneyim.' },
              { icon: '⚙️', label: 'Azure Pipelines', desc: 'YAML tabanlı CI/CD. Her commit\'te build ve test. Aylık 1.800 ücretsiz dakika. Tüm dilleri ve test framework\'lerini destekler.' },
              { icon: '📋', label: 'Azure Test Plans', desc: 'Web tabanlı test case yönetimi: test suite\'leri oluştur, manuel testleri çalıştır, sonuçları izle, hataları work item\'lara otomatik bağla.' },
              { icon: '📌', label: 'Azure Boards', desc: 'QA bug\'ları, user story\'ler ve görevler için Scrum/Kanban board\'ları. Test sonuçları otomatik olarak work item\'lara bağlanır.' },
            ],
          },
          { type: 'heading', text: 'QA Ekipleri için Önemli Entegrasyonlar' },
          {
            type: 'table',
            headers: ['Araç', 'Azure Entegrasyonu', 'Fayda'],
            rows: [
              ['Jenkins', 'Azure DevOps plugin, VM agent\'ları', 'Azure VM\'lerde auto-scaling agent\'larıyla Jenkins'],
              ['Selenium', 'Azure VM + AKS Grid', 'Auto-scaling node\'larıyla dağıtık Grid'],
              ['Playwright', 'Azure Pipelines YAML', 'Yerleşik JUnit reporter → Azure Test Results'],
              ['Appium', 'Azure VM\'ler (Windows/Mac)', 'iOS (Mac VM) ve Android test'],
              ['Terraform', 'azurerm provider', 'Test ortamı provisioning için IaC'],
              ['GitHub', 'GitHub Actions + Azure', 'GitHub workflow\'larından Azure\'a deploy'],
              ['Teams', 'Pipeline bildirimleri', 'Teams kanalına doğrudan test hata uyarıları'],
            ],
          },
          { type: 'tip', content: 'Azure Pipelines\'ın Azure Test Plans ile native entegrasyonu, her test çalışması sonucunun otomatik olarak Test Plans\'ta görülebileceği anlamına gelir — ek yapılandırma gerekmez.' },
        ],
      },

      // ── 4. YAYGIN HATALAR ─────────────────────────────────────────────────────
      {
        title: '🚨 Yaygın Azure Hataları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔧',
            content: 'Azure hataları genellikle 4 kategoriye girer: (1) Yetkilendirme başarısız — RBAC rolü eksik, (2) Resource bulunamadı — yanlış subscription veya resource group, (3) Kota aşıldı — subscription limitleri, (4) Ad zaten alınmış — storage account\'ları ve diğer resource\'ların global olarak benzersiz ad gereksinimleri var. Bu kalıpları bir kez öğrenince çoğu hata hızla çözülür.',
          },
          {
            type: 'error-dictionary',
            framework: 'Azure',
            errors: [
              {
                error: 'AuthorizationFailed',
                fullMessage: 'The client does not have authorization to perform action \'Microsoft.Compute/virtualMachines/write\' over scope \'/subscriptions/.../resourceGroups/...\'',
                cause: { tr: 'Azure kimliğinin (kullanıcı veya service principal) gerekli RBAC rolü yok. Azure, Role-Based Access Control kullanır — bir resource group\'un Owner\'ı bile başka bir resource group\'a erişemez.' },
                solution: { tr: 'Azure Portal → Resource Group → Access control (IAM) → Add role assignment → Contributor (veya "Virtual Machine Contributor" gibi belirli rol). CI/CD pipeline\'larında, Azure service connection tarafından kullanılan Service Principal\'e doğru rolü ata.' },
              },
              {
                error: 'StorageAccountAlreadyTaken',
                fullMessage: 'The storage account named \'mytestreports\' is already taken.',
                cause: { tr: 'Azure storage account adları global olarak benzersiz olmak zorundadır (3-24 küçük harf alfanümerik karakter). Dünya genelinde herhangi bir Azure tenant\'taki biri "mytestreports"u zaten almış.' },
                solution: { tr: 'Subscription ID veya rastgele suffix ekle: "qareports$(az account show --query id -o tsv | cut -c1-8)" veya timestamp dahil et. "testreports" veya "storage" gibi genel adlar asla kullanma.' },
              },
              {
                error: 'Pipeline agent: No hosted parallelism available',
                fullMessage: 'No hosted parallelism has been purchased or granted. To request a free parallelism grant, please fill out the following form.',
                cause: { tr: 'Azure DevOps, yeni özel projeler için politikasını değiştirdi: ücretsiz Microsoft hosted agent paralelliği manuel onay gerektirir. Bu, özel repo çalıştıran yeni oluşturulan organizasyonları etkiler.' },
                solution: { tr: 'Seçenek 1: Microsoft paralellik onay formunu gönder (2-3 iş günü sürer). Seçenek 2: Self-hosted agent kullan — kendi makinen veya Azure VM\'ye agent yükle: Organization Settings → Agent pools → New agent\'tan indir. Seçenek 3: Projeyi public yap (açık kaynak için anında ücretsiz paralellik).' },
              },
              {
                error: 'VM provisioning timed out / Creating durumunda takılı',
                fullMessage: 'Deployment failed. VM agent status is: Not Ready. Provisioning failed.',
                cause: { tr: 'Seçilen VM boyutu, seçilen region\'da mevcut kapasiteye sahip değil. Azure, region ve boyuta göre değişen kapasiteye sahiptir. Bu, GPU instance\'ları ve yoğun region\'lardaki belirli VM boyutlarında yaygındır.' },
                solution: { tr: 'Farklı VM boyutu (örn. Standard_D2_v3 yerine Standard_D2s_v3) veya farklı region dene. "az vm list-skus --location westeurope --output table" komutuyla mevcut boyutları kontrol et. Spot VM\'ler de kapasite kısıtlı olabilir — kritik pipeline\'lar için normal VM kullan.' },
              },
              {
                error: 'az login: AADSTS50076 MFA required',
                fullMessage: 'AADSTS50076: Due to a configuration change made by your administrator, or because you moved to a new location, you must use multi-factor authentication to access.',
                cause: { tr: 'Azure AD tenant\'ı MFA gerektiren Conditional Access policy\'lerine sahip. "az login" interactive modu MFA tetikler, ancak gözetimsiz script\'ler MFA\'yı interaktif olarak tamamlayamaz.' },
                solution: { tr: 'CI/CD için Service Principal kullan: "az ad sp create-for-rbac --name qa-pipeline-sp --role Contributor --scopes /subscriptions/<id>". Bu appId, password, tenant verir — CI\'da "az login --service-principal" ile kullan. Service Principal\'ler varsayılan olarak interaktif MFA policy\'lerinden muaftır.' },
              },
              {
                error: 'Container start failed: OOMKilled',
                fullMessage: 'Container group state: Failed. Last state: Terminated, Reason: OOMKilled.',
                cause: { tr: 'Azure Container Instance belleği tükendi. Chrome/Selenium browser\'lar bellek yoğundur. 1GB RAM\'li container, 2-3\'ten fazla paralel browser session için yetersizdir.' },
                solution: { tr: 'Container belleğini artır: Selenium Grid node\'ları için --memory 4 (4GB). --cpu 2 ekle çok browser\'lı container\'lar için. AKS\'de pod spec\'teki resource limitleri ayarla: resources.limits.memory: 4Gi. Docker\'da Chrome çalıştırırken --shm-size 2g ekle.' },
              },
              {
                error: 'Pipeline task: Azure CLI version mismatch',
                fullMessage: 'ERROR: \'az\' is not recognized as an internal or external command',
                cause: { tr: 'Pipeline, AzureCLI@2 task kullanıyor ancak script daha yeni bir versiyonun sözdizimini kullanıyor. Ya da self-hosted agent\'ta Azure CLI yüklü değil. Microsoft hosted agent\'lar CLI versiyonlarını periyodik olarak günceller.' },
                solution: { tr: 'Script başında CLI versiyonunu sabitle: "az upgrade --yes" veya AzureCLI@2 task kullan. Self-hosted agent\'lar için: Azure CLI\'yı manuel yükle ve PATH\'e ekle. Debug adımı olarak "az --version" çalıştır.' },
              },
              {
                error: 'Blob upload: 403 This request is not authorized',
                fullMessage: '403 This request is not authorized to perform this operation using this permission.',
                cause: { tr: 'Shared Access Signature (SAS) token veya access key süresi dolmuş, yetersiz izinlere sahip veya istek IP\'si izin verilen IP aralığında değil. Ayrıca storage account güvenlik duvarı erişimi engellediğinde de olur.' },
                solution: { tr: 'SAS token\'ı doğru izinlerle (okuma/yazma/listeleme) ve gelecekteki son kullanma tarihiyle yeniden oluştur. Account key kullanıyorsan döndürülmemiş olduğundan emin ol. Storage account güvenlik duvarını kontrol et: CI/CD pipeline\'ları için "Tüm ağlardan erişime izin ver" veya pipeline agent IP\'sini izin listesine ekle.' },
              },
              {
                error: 'AKS Pod stuck in Pending: Insufficient cpu/memory',
                fullMessage: 'Warning FailedScheduling: 0/3 nodes are available: 3 Insufficient cpu, 3 Insufficient memory.',
                cause: { tr: 'AKS cluster\'ı test pod\'unu schedule edecek yeterli CPU veya belleğe sahip değil. Tüm mevcut node\'lar çalışan test container\'larıyla tamamen kullanılmış.' },
                solution: { tr: 'AKS Cluster Autoscaler\'ı etkinleştir: "az aks update --enable-cluster-autoscaler --min-count 1 --max-count 10". Test iş yükleri için yeni node pool ekle: "az aks nodepool add --name testpool --node-count 3". Anlık çözüm için manuel ölçeklendir: "az aks nodepool scale --node-count 5". Pod spec\'lerinde resource request\'leri ve limitleri doğru ayarla.' },
              },
            ],
          },
        ],
      },

      // ── 5. MÜLAKAT SORULARI ───────────────────────────────────────────────────
      {
        title: '💼 Azure Mülakat Soruları',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Azure',
            questions: [
              // ── TEMEL (15) ─────────────────────────────────────────────────
              {
                level: 'basic',
                q: { tr: 'Ekibin Azure DevOps kullanıyor. Her pull request\'te Playwright testlerini otomatik çalıştıran bir pipeline nasıl kurarsın?' },
                a: { tr: 'Repository kök dizininde azure-pipelines.yml dosyası oluştur. Tüm PR\'larda tetiklemek için trigger: pr: ["*"] ayarla. Microsoft hosted agent için pool: vmImage: ubuntu-latest ekle. Adımlar: Node için NodeTool@0 task\'ı, "npm ci && npx playwright install --with-deps" çalıştıran script, "npx playwright test" çalıştıran script. Pipeline arayüzünde sonuçları göstermek için JUnit formatıyla PublishTestResults@2 task\'ı ekle. Dosyayı commit et — Azure DevOps otomatik olarak alır ve gelecekteki tüm PR\'ları doğrular.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure\'da Resource Group nedir ve QA mühendisleri neden kullanmalı?' },
                a: { tr: 'Resource Group, bir çözüm için ilgili Azure resource\'larını (VM\'ler, storage account\'ları, veritabanları) tutan mantıksal bir kapsayıcıdır. QA mühendisleri için zorunludur çünkü: (1) tüm test ortamı resource\'ları tek grupta — bulmak ve yönetmek kolay, (2) tek komutla tüm test ortamını silebilirsin: "az group delete --name qa-env-rg", (3) erişim kontrolü grup seviyesinde uygulanır, (4) her grup için Azure Cost Management\'ta maliyet takibi. Cloud resource\'ların için klasör olarak düşün.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure Blob Storage nedir ve bir QA ekibi orada ne saklar?' },
                a: { tr: 'Azure Blob Storage, Microsoft\'un nesne depolama servisidir — düşük maliyetle sınırsız dosya tutabilen buluttaki bir klasör gibi. QA ekipleri şunları saklar: Playwright/Allure HTML raporlar, test hata screenshot\'ları ve videoları, JUnit XML sonuçları, test verisi CSV/JSON dosyaları, pipeline logları. Blob Storage, herkese açık URL\'leri (paydaşlarla rapor paylaşımı için) ve SAS token\'ları (süreli özel erişim) destekler. AWS S3 ile karşılaştırılabilir — aynı konsept, Azure isimlendirmesi.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure Pipelines ve GitHub Actions arasındaki fark nedir? Azure Pipelines\'ı ne zaman kullanırsın?' },
                a: { tr: 'Her ikisi de CI/CD platformudur ama farklı ekosistemlerdedir. Azure Pipelines, Azure DevOps\'un bir parçasıdır — Azure Test Plans, Boards ve Repos ile sıkı entegre. Azure Pipelines kullan: organizasyonun test yönetimi için Azure DevOps kullandığında (Test Plans), onay kapıları, sürüm ortamları ve denetim logları gibi kurumsal özelliklere ihtiyacın olduğunda, şirket içi veya Azure VM\'lerde self-hosted agent\'larına sahip olduğunda. GitHub Actions kullan: kodun GitHub\'daysa ve her şeyi tek yerde istiyorsan, açık kaynak projeler için.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure Active Directory (AAD) nedir ve QA otomasyonu için neden önemlidir?' },
                a: { tr: 'Azure Active Directory (artık Microsoft Entra ID olarak adlandırılıyor), Microsoft\'un kimlik servisidir — Azure ve Microsoft 365 için merkezi giriş sistemi. QA otomasyonu için: (1) Tek oturum açma, QA mühendislerinin Azure Portal, DevOps ve Teams için aynı kurumsal girişi kullanması anlamına gelir, (2) Service Principal\'ler (insan olmayan kimlikler), CI/CD pipeline\'larının insan kimlik bilgisi olmadan Azure\'a kimlik doğrulamasına izin verir, (3) Conditional Access policy\'leri MFA gerektirebilir — pipeline\'ların nasıl kimlik doğrulaması yapması gerektiğini etkiler (interaktif giriş değil, Service Principal kullan).' },
              },
              {
                level: 'basic',
                q: { tr: 'Microsoft hosted Azure Pipelines agent\'ında Playwright testlerini nasıl çalıştırırsın?' },
                a: { tr: 'Microsoft hosted agent\'lar, Microsoft tarafından yönetilen önceden yapılandırılmış VM\'lerdir (Ubuntu, Windows veya macOS). Playwright için: (1) pool: vmImage: ubuntu-latest ayarla. (2) Node yükle: NodeTool@0 task\'ı. (3) "npm ci" çalıştır. (4) "npx playwright install --with-deps chromium" çalıştır. (5) "npx playwright test" çalıştır. (6) PublishTestResults@2 ile sonuçları yayımla. Avantaj: kurulum yok, bakım yok, aylık 1.800 ücretsiz dakika. Sınırlama: 6 saat maksimum build süresi, özel resource\'lara bağlantı ek yapılandırma gerektirir.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure\'da Service Principal nedir ve bir QA mühendisi ne zaman oluşturur?' },
                a: { tr: 'Service Principal, Azure AD\'de bir uygulama veya servis için kimlik bilgisidir (insan kullanıcı değil). Belirli izinlere sahip "robot hesabı" olarak düşün. QA mühendisleri şunlar için oluşturur: (1) Blob Storage\'a yükleme, VM başlatma/durdurma veya resource deploy etmesi gereken CI/CD pipeline\'ları, (2) sunucularda gözetimsiz çalışan test otomasyon script\'leri, (3) Azure resource\'ları oluşturması gereken üçüncü taraf araçlar (Terraform gibi). Oluştur: "az ad sp create-for-rbac --name my-qa-sp --role Contributor". Çıktı appId, password, tenant verir — bunları credential olarak kullan.' },
              },
              {
                level: 'basic',
                q: { tr: 'Başarısız bir Azure pipeline adımının loglarını nasıl görüntülersin?' },
                a: { tr: 'Azure DevOps\'ta: Pipelines → başarısız çalışmaya tıkla → başarısız job → başarısız adım. Loglar gerçek zamanlı gösterilir. Daha fazla detay için: "View raw log" tıkla. CLI\'dan: "az pipelines runs logs list --run-id <id>". Çok uzun çalışmalar için: "Download all logs as zip" butonu. Build agent kendisi başarısız olduysa (test değil): önce "Initialize job" ve "Checkout" adımlarını kontrol et — özel adımlardan önce çalışırlar.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure Monitor nedir ve test pipeline sağlığını izlemek için nasıl kullanırsın?' },
                a: { tr: 'Azure Monitor, Microsoft\'un birleşik izleme servisidir. QA pipeline\'ları için: (1) Application Insights, yük testleri sırasında uygulama performansını izler — yanıt süreleri, hata oranları, bağımlılık çağrıları, (2) Log Analytics çalışma alanı, tüm Azure resource\'larından logları tek yerde toplar — KQL (Kusto Query Language) ile sorgula, (3) Alarmlar: "son 1 saatte pipeline hata oranı > %20 olduğunda bildir" kuralı kur, (4) Workbook\'lar: zaman içinde test geçme oranı, çalışma süresi trendi gösteren özel dashboard. Azure Monitor, AWS\'de CloudWatch\'a eşdeğerdir.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure Container Instance (ACI) nedir ve test çalıştırma için ne zaman kullanırsın?' },
                a: { tr: 'Azure Container Instance, VM veya Kubernetes cluster yönetmeden talep üzerine Docker container çalıştırmana izin verir. Saniye başına ücret ödersin. QA için: Playwright veya Selenium test container\'ını başlatan, testleri çalıştıran, sonuçları Blob Storage\'a yükleyen ve çıkan ACI kullan — ACI yalnızca 3 dakikalık yürütme için faturalandırır, çalışan sunucu değil. En iyi: kalıcı sunucu istemediğin kısa, seyrek test çalışmaları için. İdeal değil: yüksek frekanslı çalışmalar (Kubernetes ölçekte daha verimli).' },
              },
              {
                level: 'basic',
                q: { tr: 'Gereksiz maliyet oluşturmadan tüm Azure test ortamı resource\'larını nasıl silersin?' },
                a: { tr: 'Resource Group kullan: tüm test ortamı resource\'larını ayrılmış bir resource group\'a koy (örn. qa-env-rg). Testler tamamlandığında: "az group delete --name qa-env-rg --yes --no-wait". Bu, gruptaki her resource\'ı — VM\'ler, diskler, NIC\'ler, public IP\'ler, storage account\'ları — atomik olarak siler. --no-wait bayrağı silme arka planda çalışırken hemen döner. Azure Pipelines\'da: testler başarısız olsa bile cleanup çalışmasını sağlamak için condition: always() ile son aşama ekle.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure Test Plans nedir ve Azure Pipelines\'da otomatik test çalıştırmaktan farkı nedir?' },
                a: { tr: 'Azure Test Plans, Azure DevOps\'un manuel ve keşifsel test modülüdür. Şunları sağlar: test case oluşturma (adım adım manuel test prosedürleri), test suite\'leri (organize test case grupları), test çalışmaları (case\'leri çalıştır, geçti/başarısız işaretle, screenshot ekle), hata bağlama (başarısız testler otomatik olarak Azure Boards work item\'larına bağlanır). Azure Pipelines ise otomatik testler için — kod çalıştırır (Playwright, JUnit, pytest) ve sonuçları raporlar. İkisi birbirini tamamlar: Pipelines regresyon otomasyonunu çalıştırır, Test Plans manuel keşifsel testi yönetir.' },
              },
              {
                level: 'basic',
                q: { tr: 'YAML dosyasında saklamadan bir Azure Pipeline\'a secret\'ları (API key, şifre) nasıl iletirsin?' },
                a: { tr: 'Azure DevOps Library veya Azure Key Vault kullan: (1) DevOps Library: Pipelines → Library → Variable Groups → secret değişkenler ekle (kilitli asma kilit olarak işaretli). YAML\'da referans ver: $(MY_SECRET). Değerler loglarda otomatik maskelenir. (2) Azure Key Vault: secret\'ları Key Vault\'ta sakla, Key Vault\'u DevOps\'taki bir Variable Group\'a bağla. Pipeline çalışma zamanında secret\'ları Key Vault\'tan okur. (3) Secret\'ları asla YAML\'a doğrudan yazma — YAML dosyası Git\'te ve repo erişimi olan herkese görünür.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure Free Tier nedir ve bir QA mühendisi bununla gerçekçi olarak neler yapabilir?' },
                a: { tr: 'Azure Free Tier şunları içerir: ilk 30 gün $200 kredi, ardından her zaman ücretsiz servisler: aylık 1 milyon Azure Function çağrısı, 5GB Blob Storage, 5 ücretsiz kullanıcı + aylık 1.800 pipeline dakikasıyla Azure DevOps, 12 ay ücretsiz B1s VM, 12 ay ücretsiz Azure SQL. QA mühendisleri şunları yapabilir: Pipelines\'da otomatik Playwright testleri çalıştır (1.800 dk/ay = ~30 tam çalışma), tüm test raporlarını Blob Storage\'da sakla, Azure Test Plans\'ta test case\'leri yönet, ücretsiz B1s VM\'de küçük Jenkins agent çalıştır. Azure öğrenen solo QA için: ücretsiz tier 12 ay her şeyi karşılar.' },
              },
              {
                level: 'basic',
                q: { tr: 'Azure Pipeline\'ı yalnızca belirli bir klasördeki testler değiştiğinde çalışacak şekilde nasıl tetiklersin?' },
                a: { tr: 'YAML trigger\'da path filter kullan: "trigger: paths: include: [\'tests/**\', \'src/**\'] exclude: [\'docs/**\']". Bu, Azure Pipelines\'a yalnızca tests/ veya src/ altındaki dosyalar değiştiğinde çalışmasını söyler. PR trigger\'ları için: "pr: paths: include: [\'tests/**\']". Branch + path kombinasyonu için: "trigger: branches: include: [main, develop] paths: include: [src/**]". Bu, gereksiz pipeline çalışmalarını azaltır ve ücretsiz dakikaları korur — yalnızca README değişirse test çalışması tetiklenmez.' },
              },

              // ── ORTA SEVİYE (20) ───────────────────────────────────────────
              {
                level: 'intermediate',
                q: { tr: 'Playwright test suite\'in sıralı çalışınca 45 dakika sürüyor. 10 dakikanın altında çalıştırmak için Azure Pipelines stratejisi tasarla.' },
                a: { tr: 'Matrix stratejisiyle paralel job\'lar kullan: (1) azure-pipelines.yml\'de matrix oluştur: strategy: matrix: shard1: SHARD_INDEX: 1 ... shard5: SHARD_INDEX: 5. (2) Her job çalıştırır: "npx playwright test --shard=$(SHARD_INDEX)/5". (3) 5 job eş zamanlı 5 agent üzerinde çalışır. (4) Her job sonuçları yayımlar. (5) Son job birleştirir. 5 paralel job ile: 45dk / 5 = 9dk. Maliyet: 5 × 9dk = 45 agent dakikası (aylık 1.800 ücretsiz içinde). Alternatif: dinamik ölçekleme için Azure Container Apps Jobs.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Özel dahili bir uygulamaya karşı test çalıştırmak için Azure VM\'de self-hosted Azure Pipelines agent\'ı nasıl kurarsın?' },
                a: { tr: '(1) Dahili uygulamayla aynı VNet\'te VM oluştur. (2) Azure DevOps → Organization Settings → Agent Pools → New pool. (3) VM\'de: agent paketini indir, config.sh çalıştır --url ve --token ile. (4) Agent\'ı başlat: sudo ./svc.sh install && start. (5) Pipeline YAML\'da: pool: name: MyPrivatePool (vmImage yerine). (6) Agent VM\'nin VNet\'inde çalışır, dahili uygulamaya VPN olmadan ulaşır. (7) Auto-scaling için VM scale set kullan. Avantaj: dahili uygulama için public IP açıklaması yok, VPN tünelleme gerekmez.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'YAML\'ı çoğaltmadan Azure Pipelines\'da ortama özgü değişkenleri (dev, staging, prod) nasıl uygularsın?' },
                a: { tr: 'Ortamlara bağlı Variable Group\'lar kullan: (1) Library\'de 3 variable group oluştur: dev-vars, staging-vars, prod-vars. (2) YAML\'da gruba referans ver: variables: - group: $(ENV)-vars. (3) Onay kapılı pipeline environment\'ları kullan: staging\'e deploy ederken QA lead onayı iste. (4) Alternatif olarak runtime parameter kullan: parameters: - name: environment type: string values: [dev, staging, prod]. (5) Secret\'lar için her ortamın kendi vault\'u olan Azure Key Vault variable group\'larıyla birleştir.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Bir geliştirici senden OWASP ZAP güvenlik taramasını Azure Pipeline\'a entegre etmeni istiyor. Nasıl uygularsın?' },
                a: { tr: '(1) Fonksiyonel testlerden sonra aşama ekle: stage: Security. (2) ZAP\'ı ACI ile çalıştır: az container create --image ghcr.io/zaproxy/zaproxy:stable --command-override "zap-baseline.py -t https://staging.myapp.com -J zap-report.json". (3) ZAP JSON raporunu Blob Storage\'a yükle. (4) JSON\'ı ayrıştıran ve HIGH veya CRITICAL uyarı varsa pipeline\'ı başarısız yapan script adımı ekle: "jq \'.alerts[] | select(.riskcode >= 3)\' zap-report.json | wc -l" — 0\'dan büyükse exit 1. (5) ZAP raporunu pipeline artifact olarak yayımla.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Kubernetes yönetmeden Playwright testlerini ölçekte çalıştırmak için Azure Container Apps Jobs\'ı nasıl kullanırsın?' },
                a: { tr: 'Azure Container Apps Jobs, tamamlanmak üzere çalışan event-driven container\'lardır. (1) Playwright + testlerinle Docker imajı oluştur. (2) Azure Container Registry\'ye push et. (3) Container Apps Environment oluştur. (4) Job oluştur: "az containerapp job create --name playwright-job --environment my-env --image myacr.azurecr.io/playwright-tests". (5) Farklı shard ile çalıştır: instance başına SHARD environment variable\'ıyla job tetikle. (6) Sonuçlar test sonrası script\'te azure CLI aracılığıyla Blob Storage\'a gider. Faydalar: cluster yönetimi yok, 0\'dan auto-scale, çalışma saniyesi başına ödeme.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'QA onayı olmadan production\'a deployment\'ı engellemek için Azure Pipelines\'da onay kapılarını nasıl uygularsın?' },
                a: { tr: '(1) Pipelines → Environments → "production" environment oluştur. (2) Onay ekle: Environments → production → Approvals and checks → Approvals → QA lead kullanıcısı/grubu ekle. (3) YAML\'da: environment hedefleyen deployment job kullan: "job: DeployToProd strategy: runOnce: deploy: environment: production". (4) Pipeline bu aşamaya ulaştığında durur ve onaylayıcılara e-posta/Teams bildirimi gönderir. (5) QA lead test sonuçlarını inceler ve Approve veya Reject tıklar. (6) "Required template" kontrolü ekle: YAML\'ın deployment\'tan önce test aşamasını içermesini zorla.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Ekibinin Azure subscription maliyetleri test ortamı VM\'leri nedeniyle artıyor. Maliyetleri azaltmak için otomatik kapatma nasıl uygularsın?' },
                a: { tr: '(1) Azure Auto-shutdown: her VM → Auto-shutdown → etkinleştir → saat ayarla (örn. her gün 19:00). Kapatma öncesi bildirim e-postası gönderir. (2) Azure DevTest Labs: QA/dev ortamları için tasarlanmış — otomatik kapatma policy\'leri, kullanıcı başına maliyet limitleri. (3) Azure Automation: zamanlamada runbook (PowerShell): "Get-AzVM -ResourceGroupName qa-rg | Stop-AzVM -Force". (4) Tag tabanlı kapatma: VM\'leri AutoShutdown=true ile etiketle, runbook etiketli VM\'leri bulur ve durdurur. (5) Zamanlanmış scaling ile Azure VM scale set kullan: geceleri 0 instance, iş saatlerinde N instance. Tipik tasarruf: %65 maliyet azalması (günde 16 saat kapalı).' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Test otomasyonunda credential\'ları kodda saklamaktan kaçınmak için Azure Key Vault entegrasyonunu nasıl yapılandırırsın?' },
                a: { tr: '(1) Key Vault oluştur: "az keyvault create --name qa-secrets-kv --resource-group qa-rg". (2) Secret ekle: "az keyvault secret set --vault-name qa-secrets-kv --name db-password --value MyP@ssw0rd". (3) Pipeline erişimi ver: Service Principal vault\'ta "Key Vault Secrets User" rolü alır. (4) Azure Pipelines\'da: Key Vault\'a bağlı Variable Group oluştur. (5) YAML\'da referans: $(db-password) — Azure DevOps çalışma zamanında alır, loglarda maskeler. (6) Test kodunda (Python): from azure.keyvault.secrets import SecretClient; client.get_secret("db-password"). Faydalar: Key Vault\'ta döndürülen secret\'lar tüm pipeline\'lara anında uygulanır, tam denetim logu.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Azure\'da test veritabanı oluşturan, testleri çalıştıran ve otomatik temizlik yapan gece regresyon testlerini nasıl kurarsın?' },
                a: { tr: '(1) YAML\'da zamanlanmış trigger oluştur: schedules: - cron: "0 2 * * *" displayName: Gece çalışması branches: include: [main]. (2) Pipeline aşamaları: → Aşama 1: provision — "az sql server create" + "az sql db create" → Aşama 2: migrate — schema migration script\'leri çalıştır → Aşama 3: seed — test verisi seeder çalıştır → Aşama 4: test — tam test suite → Aşama 5: cleanup (condition: always()) — "az sql server delete". (3) DB bağlantı string\'ini aşamalar arası pipeline değişkeni olarak ilet: "##vso[task.setvariable variable=DB_URL;isOutput=true]$dbUrl".' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Azure DevOps\'ta work item\'lar, test case\'ler ve pipeline sonuçları tam izlenebilirlik için nasıl bağlıdır?' },
                a: { tr: 'Tam izlenebilirlik zinciri: (1) Azure Boards: "US-123: Kullanıcı ödeme yapabilir" User Story oluştur. Test Plans\'taki test case\'lere bağla. (2) Azure Test Plans: "TC-456: Ödeme formunu doğrula" test case\'i US-123\'e bağlı. (3) Geliştirici "feature/us-123-checkout" branch\'i oluşturur, PR açar. (4) Pipeline otomatik çalışır: "TC-456" sonucu JUnit aracılığıyla yayımlanır → Pipeline çalışmasında görünür → Test Plans\'ta test case geçmişinde de görünür. (5) TC-456 başarısız olursa: QA, Test Plans\'tan Bug work item oluşturur → US-123 ve TC-456\'ya otomatik bağlanır. Her kod değişikliği, test sonucu ve bug orijinal gereksinime kadar izlenebilir.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Yük testleri sırasında uygulamayı izlemek için Azure Application Insights\'ı nasıl kullanırsın?' },
                a: { tr: '(1) Uygulamayı enstrümanlandır: Application Insights SDK ekle, instrumentation key ayarla. (2) JMeter/k6 yük testi sırasında: App Insights otomatik olarak istek süresini, hata oranını, bağımlılık çağrılarını yakalar. (3) Test sırasında Azure Portal\'da: App Insights → Live Metrics → yük arttıkça gerçek zamanlı RPS, yanıt süresi, hataları izle. (4) Test sonrası: Application Insights → Performance → test zaman aralığına göre filtrele → en yavaş istekleri ve bağımlılıkları gör. (5) Alarm kur: "yük testi sırasında ortalama yanıt süresi > 2000ms" → Teams bildirimi. (6) Log Analytics\'e aktar: KQL sorgusu "requests | where timestamp > ago(1h) | summarize avg(duration) by bin(timestamp, 1m)".' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Yönetime QA metriklerini raporlamak için Azure DevOps\'ta test sonucu trendi ve dashboard\'ları nasıl uygularsın?' },
                a: { tr: '(1) Azure DevOps yerleşik: Test Plans → Runs → Analytics → Test Results Trend (zaman içinde geçme oranı, süre, flakiness). (2) Power BI entegrasyonu: Power BI\'ı OData feed aracılığıyla Azure DevOps\'a bağla → modüle göre geçme oranı, test çalışma süresi, kapsam trendi gösteren özel dashboard. (3) Azure DevOps Dashboard\'ları: widget ekle — "Test Results Trend", "Pipeline pass rate". Dashboard URL\'sini paydaşlarla paylaş. (4) Zamanlanmış e-posta: Azure DevOps zamanlanmış test özeti e-postaları gönderir. (5) REST API ile Excel\'e aktar: haftalık raporlar için GET /apis/test/runs? çağrısı.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Ekibinin test altyapısını on-premise Jenkins\'ten Azure Pipelines\'a nasıl geçirirsin?' },
                a: { tr: 'Aşamalı migration: (1) Envanter: tüm Jenkins job\'larını, plugin\'leri, environment variable\'ları, secret\'ları ve zamanlamaları belgele. (2) Jenkinsfile\'ı azure-pipelines.yml\'ye çevir — çoğu konsept doğrudan eşlenir. (3) Secret\'ları migrate et: Jenkins credential store\'dan Azure DevOps Library + Key Vault\'a. (4) Agent\'ları migrate et: Jenkins slave\'leri Azure DevOps self-hosted veya Microsoft hosted agent\'larıyla değiştir. (5) Paralel çalıştır: 2 hafta boyunca aynı codebase için Azure Pipelines\'ı Jenkins\'le birlikte tetikle — sonuçları karşılaştır. (6) Geçiş yap: Azure Pipelines doğrulandıktan sonra Jenkins job\'larını tek tek devre dışı bırak. (7) 30 gün stabil kaldıktan sonra Jenkins sunucusunu kaldır.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Özel test Docker imajı oluşturmak ve kullanmak için Azure Container Registry\'yi (ACR) Azure Pipelines ile nasıl kullanırsın?' },
                a: { tr: '(1) ACR oluştur: "az acr create --name myqaregistry --sku Basic". (2) Pipeline\'da imajı build et ve push et: Docker@2 task ile buildAndPush, repository: myqaregistry.azurecr.io/playwright-tests, tags: $(Build.BuildId). (3) Sonraki pipeline aşamalarında tam imajı kullan: container: image: myqaregistry.azurecr.io/playwright-tests:$(Build.BuildId). (4) Pipeline ACR erişimi ver: pipeline\'ın Service Principal\'ine AcrPull rolü ata. (5) Faydalar: test imajları versiyonlanmış (Build ID ile), birden fazla pipeline çalışmasında yeniden oluşturmadan kullanılır, Defender for Containers tarafından otomatik taranır.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Azure DevTest Labs nedir ve QA ekiplerinin test ortamlarını yönetmesine nasıl yardımcı olur?' },
                a: { tr: 'Azure DevTest Labs, QA ve geliştirici ortamları için özel olarak tasarlanmış yönetilen bir servistir. Özellikler: (1) Formula\'lar — anında ortam oluşturma için önceden tanımlanmış VM şablonları (OS + yazılım), (2) Auto-shutdown — VM\'leri kapatmayı unutmayı önleyen zorunlu kapatma policy\'leri, (3) Maliyet eşikleri — kullanıcı başına aylık maksimum harcama, limite yaklaştığında alarm, (4) Talep edilebilir VM\'ler — QA mühendisleri provisioning beklemek yerine bir havuzdan önceden hazır VM talep eder, (5) Artifact\'lar — VM oluşturma sırasında araçları yükleyen script\'ler (Chrome, Java, test framework). Ham Azure VM ile karşılaştırıldığında: DevTest Labs, altyapı uzmanlığı olmayan QA ekipleri için yönetişim, maliyet kontrolü ve self-service ekler.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Azure Pipelines\'ı aynı pipeline çalışmasında hem Windows hem Linux\'ta test çalışacak şekilde nasıl yapılandırırsın?' },
                a: { tr: 'Farklı agent\'larla matrix veya paralel job\'lar kullan: strategy: matrix: Windows: vmImage: windows-latest Linux: vmImage: ubuntu-latest macOS: vmImage: macOS-latest. Her matrix job aynı adımları farklı OS\'ta çalıştırır. OS\'a özgü script\'ler: Windows\'ta PowerShell ve Linux\'ta bash çalıştırmak için koşul ifadeleri kullan: "eq(variables[\'Agent.OS\'], \'Windows_NT\')". Tüm 3 platformdan sonuçları aynı pipeline çalışmasına yayımla — Test sekmesinde birleştirilir. Bu, production deployment öncesi cross-platform bug\'ları yakalar.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Azure DevOps\'ta rollback testini nasıl uygularsın — smoke testler başarısız olursa deployment\'ı otomatik geri alacak şekilde?' },
                a: { tr: '(1) Azure App Service deployment slot ile deploy et: önce staging slot\'una. (2) Staging slot URL\'sine karşı smoke testleri çalıştır. (3) Testler geçerse: production\'a swap et ("az webapp deployment slot swap"). (4) Testler başarısız olursa: swap yok — production dokunulmaz. (5) Sıfır kesintili rollback için: testler production\'a swapped edilmişse ve post-deployment testler başarısız olursa rollback job tetikle: "az webapp deployment slot swap --slot production --target-slot staging". (6) Pipeline YAML\'da: rollback job\'da condition: failed(). (7) Teams webhook ile bildir: "Deployment #{Build.BuildId} geri alındı — smoke testler başarısız oldu".' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Birden fazla pipeline aynı test veritabanını paylaştığında Azure\'da test verisi izolasyonunu nasıl yönetirsin?' },
                a: { tr: 'Stratejiler: (1) Schema izolasyonu: her pipeline çalışması kendi veritabanı schema\'sını oluşturur (CREATE SCHEMA run_$(Build.BuildId)), testleri çalıştırır, schema\'yı düşürür. (2) Transaction izolasyonu: her testi transaction içine sar, test sonrası geri al (unit testler için çalışır, E2E için değil). (3) Ayrılmış veritabanları: her paralel test agent\'ı ARM şablonu veya Terraform ile dinamik provisioning aracılığıyla kendi Azure SQL veritabanını alır. (4) Azure SQL Elastic Pool: 10 test veritabanı havuzu önceden hazırla, pipeline birini kontrol eder, kullanır, geri verir. (5) Containerize edilmiş veritabanı: her pipeline ACI aracılığıyla Docker\'da SQL Server başlatır — garantili temiz durum. 4. seçenek (elastic pool) yüksek frekanslı pipeline\'lar için en iyi.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'QA sürecinin bir parçası olarak dayanıklılık testi için Azure Chaos Studio\'yu nasıl kullanırsın?' },
                a: { tr: 'Azure Chaos Studio kontrollü hata enjeksiyonu deneyleri çalıştırır. QA entegrasyonu: (1) Deneyler tanımla: VM kapatma (AZ arızası simülasyonu), App Service durdurma, SQL bağlantı kesintisi, AKS pod arızası. (2) Azure Pipelines ile entegre et: deployment sonrası CLI adımı: "az chaos experiment start --name qa-chaos-experiment". (3) Azure Monitor ile izle: chaos sırasında hata oranlarını, yanıt sürelerini takip et. (4) Karşılaştır: chaos olmadan yük testi (baseline), chaos ile (dayanıklılık puanı). (5) Otomatik kurtarma doğrulaması: AZ failover sonrası kurtarma süresini ölç.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'AKS\'de Selenium Grid kullanarak Azure\'da cross-browser test nasıl uygularsın?' },
                a: { tr: '(1) Selenium Grid\'i Helm ile AKS\'ye deploy et: "helm install selenium-grid docker-selenium/selenium-grid". (2) Chart, Hub, Chrome node\'ları, Firefox node\'larını ayrı Deployment olarak deploy eder. (3) HPA yapılandır: bekleyen session\'a göre Chrome node\'larını 2\'den 20\'ye ölçeklendir. (4) Service: Hub\'ı port 4444\'te ClusterIP ile aç (dahili). (5) Test kodu: RemoteWebDriver ile Capabilities(browser: "chrome/firefox") → AKS doğru node tipine yönlendirir. (6) Azure Pipeline paralelliği: 10 agent her biri test alt kümesi çalıştırıyor → hepsi aynı anda AKS Grid\'e bağlanıyor. (7) Pipeline sonrası: "kubectl scale deployment selenium-chrome-node --replicas=0" maliyet tasarrufu için.' },
              },

              // ── İLERİ SEVİYE (15) ──────────────────────────────────────────
              {
                level: 'advanced',
                q: { tr: 'Azure Kubernetes Service kullanan 15 microservice uygulaması için Azure tabanlı eksiksiz CI/CD ve test mimarisi tasarla.' },
                a: { tr: 'Mimari: (1) Kod: her servis minimum 1 reviewer ve geçen CI gerektiren branch policy\'leriyle kendi Azure Repo\'sunda. (2) Servis başına CI: Azure Pipeline PR\'da tetiklenir → Docker imajı oluşturur → ACR\'ye push eder → unit test + contract test (Pact) çalıştırır. (3) Entegrasyon testleri: Helm, servisi + mock bağımlılıklarını geçici AKS namespace\'ine (test-{BuildId}) deploy eder → API testleri çalışır → namespace silinir. (4) E2E testleri: gece pipeline tüm 15 servisi ayrılmış AKS namespace\'ine deploy eder → Playwright testleri çalışır → namespace silinir. (5) Gözlemlenebilirlik: tüm servisler App Insights SDK → test çalışmaları sırasında dağıtık izler görünür. (6) Promosyon: main\'e merge → CD pipeline staging\'e deploy eder → QA onay kapısı → prod\'a deploy.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Azure servisleri kullanarak bir production sisteminin RTO ve RPO\'sunu test eden disaster recovery test stratejisi nasıl tasarlarsın?' },
                a: { tr: '(1) Hedefler tanımla: RTO = 4 saat, RPO = 1 saat. (2) Chaos Studio deneyi: Azure SQL geo-failover + birincil region VM kapatmayı eş zamanlı tetikle. (3) Otomatik kurtarma doğrulaması: Azure Function her 30 saniyede endpoint yoklar → ilk başarılı yanıt zaman damgasını kaydeder → gerçek RTO\'yu hesaplar. (4) Veri bütünlüğü kontrolü: failover sonrası Azure Function ikincil DB\'de son kayıt zaman damgasını sorgular → son bilinen yazma ile karşılaştırır → gerçek RPO\'yu hesaplar. (5) Azure Pipeline DR testini aylık zamanlamada çalıştırır. (6) Sonuçlar Azure DevOps Test Plans\'ta manuel test çalışması sonucu olarak yayımlanır — uyumluluk için denetim izi.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Azure DevOps\'ta pipeline\'ın her aşamasında güvenlik açıklarını yakalayan shift-left güvenlik testi yaklaşımını nasıl uygularsın?' },
                a: { tr: 'Shift-left, sorunları mümkün olduğunca erken yakalamak anlamına gelir: (1) Pre-commit: geliştiriciler GHAS veya SonarLint ile yerel SAST çalıştırır. (2) PR aşaması: Microsoft Defender for DevOps IaC (Bicep/Terraform) yapılandırma hatalarını tarar. Azure Repos kod taraması OWASP Top 10 kalıplarını bulur. (3) Build aşaması: Trivy veya Aqua Docker imajlarını CVE için tarar — temel imajda CRITICAL CVE varsa pipeline başarısız yap. (4) Staging\'e deploy: ACI aracılığıyla OWASP ZAP active scan. (5) Yük testi + güvenlik: güvenlik başlıklarını, HTTPS zorlamasını kontrol eden k6. (6) Tüm bulgular Microsoft Defender for Cloud\'da birleştirilir. (7) Herhangi bir aşamada CRITICAL bulgu varsa pipeline başarısız yap.' },
              },
              {
                level: 'advanced',
                q: { tr: 'İnsan müdahalesi olmadan agent arızalarından otomatik kurtaran Azure\'da self-healing test altyapısını nasıl kurarsın?' },
                a: { tr: '(1) Pipeline agent\'lar için Azure VM Scale Set kullan: min=0, max=10 agent\'lı VMSS. Azure DevOps scale set agent pool, kuyruk derinliğine göre otomatik ölçeklenir. (2) Health probe: Azure Monitor alarmı agent çevrimdışı olduğunda Azure Automation runbook tetikler. (3) Runbook: sağlıklı olmayan VM instance\'ını siler → VMSS otomatik olarak temel imajdan + startup script\'ten yenisini oluşturur. (4) Azure DevOps pipeline timeout: job >2 saat çalışırsa (agent takılı göstergesi) job iptal edilir ve otomatik yeniden kuyruğa alınır. (5) Blob Storage kalıcı state olarak: test artifact\'ları hemen Blob\'a yazılır (yalnızca sonda değil), böylece çalışma ortasında agent arızası tüm sonuçları kaybettirmez. (6) Azure Pipeline retry policy: uyarı vermeden önce başarısız job\'lar otomatik 3 kez yeniden dener.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Azure\'da yanıt süresi gerilediğinde deployment\'ı otomatik olarak engelleyen performans regresyon tespiti nasıl uygularsın?' },
                a: { tr: '(1) Baseline kur: staging\'e her başarılı deployment sonrası k6/JMeter çalıştır ve P50/P95/P99 metriklerini Azure Table Storage\'a sakla. (2) Sonraki deployment\'ta: aynı testi çalıştır → son 5 baseline ile karşılaştır → yüzde değişimi hesapla. (3) Herhangi bir endpoint için P95 >%20 artarsa: pipeline başarısız yap ve karşılaştırma grafiğiyle Azure Boards bug oluştur. (4) Azure Function ile uygula: pipeline tetikler, Table Storage sorgular, karşılaştırma çalıştırır, build başarısız yapmak için Azure DevOps REST API çağırır. (5) App Insights yerleşik: Smart Detection performans anomalilerini otomatik e-posta ile bildirir. (6) Azure Monitor veri kaynağıyla Grafana: görsel trend dashboard. Alarm: "30 günlük ortalamanın %50 üzerinde P95 yanıt süresi" → Teams bildirimi.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Organizasyonun tüm Azure altyapısının manuel değişiklikler olmadan Infrastructure as Code aracılığıyla provision edilmesini gerektiriyor. QA bağlamında bunu nasıl zorlarsın?' },
                a: { tr: '(1) Azure Policy: belirli resource group\'ları veya etiketleri dışında manuel resource oluşturma için "deny" policy. (2) Azure Blueprints: tam test ortamını (VNet, NSG, VM\'ler, storage) blueprint olarak tanımla — tek komutla deploy et, garantili uyumluluk. (3) Azure backend\'li Terraform: tüm IaC Git\'te → PR\'da "terraform plan" → pipeline\'da "terraform apply". State, soft-delete etkin Azure Storage\'da kilitli. (4) Drift tespiti: zamanlanmış pipeline mevcut altyapıya karşı "terraform plan" çalıştırır → drift tespit edilirse (biri manuel değişiklik yaptı) pipeline başarısız olur ve alarm gönderir. (5) RBAC: QA mühendisleri Azure\'da "Reader" rolüne sahip (yalnızca görüntüleme) — yalnızca pipeline Service Principal "Contributor"dır.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Microservice\'ler arasında breaking change\'leri önleyen Azure\'da contract testing platformunu nasıl kurarsın?' },
                a: { tr: '(1) Azure\'da Pact Broker deploy et: ACI veya AKS deployment, PostgreSQL backend için Azure DB. Veya Pactflow SaaS kullan. (2) Consumer pipeline: unit testlerden sonra pact\'i Pact Broker\'a yayımla. (3) Provider pipeline: ek "Contract" aşaması provider doğrulaması çalıştırır. (4) Pact Broker webhook: yeni pact yayımlandı → Azure Pipelines REST API\'sini çağırarak provider doğrulama pipeline\'ını tetikler. (5) Can I Deploy adımı: staging\'e geçmeden önce Azure Function Pact Broker API çağırır — tüm consumer/provider contract versiyonları uyumlu mu? Değilse: pipeline başarısız olur. (6) Azure Boards: başarısız contract\'lar webhook aracılığıyla otomatik bug oluşturur.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Azure App Service\'te otomatik kalite kapılı blue-green deployment nasıl uygularsın?' },
                a: { tr: '(1) Deployment slot\'larını yapılandır: Azure App Service\'te production slot + staging slot. (2) CI/CD pipeline: önce staging slot\'una deploy et. (3) Kalite kapısı aşaması: staging.myapp.azurewebsites.net\'e karşı smoke testleri çalıştır. Performans testi çalıştır: 5 dk k6, P95 < 300ms garantile. Güvenlik taraması çalıştır: ZAP baseline scan. (4) Tüm kapılar geçerse → "az webapp deployment slot swap". (5) Post-swap: swap başarılıysa üretim URL\'sine karşı son smoke test çalıştır. (6) Otomatik rollback: post-swap testler başarısız olursa hemen geri swap: "az webapp deployment slot swap --slot production --target-slot staging". (7) Azure Monitor alarmı: swap sonrası HTTP 5xx spike\'ı takip et → hata oranı > %5 ise rollback runbook otomatik tetiklensin.' },
              },
              {
                level: 'advanced',
                q: { tr: '10 geliştirme ekibinin Azure QA altyapısını yönetiyorsun. Ekip başına harcamayı izleyen, tahsis eden ve kontrol eden maliyet yönetimi modeli tasarla.' },
                a: { tr: '(1) Azure subscription\'ları: ekip başına bir subscription (veya departman seviyesi policy\'lerle management group). (2) Zorunlu etiketleme: Azure Policy, etiket olmadan resource oluşturmayı reddeder: TeamName, Project, Environment, CostCenter. (3) Azure Cost Management: etiket filtreyle maliyet görünümü → aylık CSV\'ye aktar → her ekip liderle paylaş. (4) Budget\'lar: her ekip %80 alarmı (e-posta) ve %100 action\'ı (yeni resource oluşturmayı durdur) olan budget alır. (5) Reserved Instance: her zaman açık resource\'lar için (Jenkins controller, paylaşılan test DB) 1 yıllık RI satın al — %40 tasarruf. (6) Paylaşılan servisler modeli: paylaşılan araçlar için merkezi "platform" subscription oluştur (Pact Broker, artifact storage), ekiplere orantılı faturalandır. (7) Aylık FinOps incelemesi: Azure Advisor önerileri + kullanılmayan resource temizliği.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Gerçek zamanlı streaming uygulamasını (örn. Azure Event Hubs) yük altında mesajların doğru işlendiğini doğrulamak için Azure\'da nasıl test edersin?' },
                a: { tr: '(1) Test ortamı: 10 partition\'lı Azure Event Hubs (Standard tier). AKS\'de 10 replica\'lı consumer uygulaması. (2) Yük testi: özel k6 extension saniyede 100.000 event gönderir. Azure Functions consumer işleme zaman damgalarını kaydeder ve Cosmos DB\'ye yazar. (3) Gecikme doğrulaması: Azure Function, event zaman damgasını işleme zaman damgasıyla karşılaştırır → 99. yüzdelik dilim için < 500ms doğrula. (4) Throughput doğrulaması: Event Hub için Azure Monitor metrikleri: IncomingMessages vs OutgoingMessages → 0 düşürülen mesaj doğrula. (5) Backpressure testi: consumer\'ları 2 dakika durdur → yeniden başlat → tüm mesajların SLA içinde işlendiğini doğrula. (6) Sonuçlar: tüm doğrulamalar Azure Table Storage\'a yazılır → test pipeline okur ve eşiklere göre geçer/başarısız olur.' },
              },
              {
                level: 'advanced',
                q: { tr: 'QA mühendislerinin Azure bilgisi olmadan ortam oluşturmasını sağlamak için Teams botu aracılığıyla talep üzerine test ortamı provisioning nasıl uygularsın?' },
                a: { tr: '(1) Azure Bot Service + Azure Functions backend kullanarak Teams botu oluştur. (2) Teams slash command: "/create-env staging-v2 4 saat için". (3) Function mesajı alır, isteği doğrular, IaC pipeline (Bicep/Terraform) tetiklemek için Azure Pipelines REST API çağırır. (4) Pipeline provision eder: resource group, VM\'ler, veritabanı, uygulama deployment → ortam URL\'si çıktısı. (5) Bot Teams\'te yanıt verir: "Ortamınız https://staging-v2-xyz.azurewebsites.net adresinde hazır (4 saat içinde sona erer)". (6) Zamanlanmış temizlik: son kullanma tarihinde Azure Function resource group\'u siler. (7) Maliyet koruması: Function, ekibin aylık harcaması zaten >$500 ise istekleri reddeder (Azure Cost Management API sorgular). (8) Denetim logu: tüm ortam oluşturma/silme işlemleri uyumluluk için Azure Log Analytics\'e loglanır.' },
              },
              {
                level: 'advanced',
                q: { tr: 'On-premise SQL Server kullanan test suite\'ini Azure SQL\'e geçirirken aynı davranışı nasıl garantilersin ve SQL dialect farklarını nasıl tespit edersin?' },
                a: { tr: '(1) Değerlendirme: Azure Database Migration Service (DMS) değerlendirme aracı kullan — mevcut SQL script\'lerini, stored procedure\'leri ve sorguları tarar → Azure SQL ile uyumluluk sorunlarını raporlar. (2) Uyumluluk katmanı: Azure SQL çoğunlukla uyumlu ama bazı SQL Server özelliklerinden yoksun (SQL Agent, linked server). Her birini testlerde ele al: SQL Agent job\'larını Azure Functions ile mock et, linked server\'ları Elastic Query ile değiştir. (3) Test verisi migrasyonu: DMS önce schema + veriyi Azure SQL Managed Instance\'a (tam uyumluluk) migrate eder, ardından doğrula. (4) Paralel çalışma: test yapılandırmasını hem on-prem SQL hem Azure SQL\'e karşı aynı anda çalışacak şekilde değiştir — 2 hafta sonuçları karşılaştır. (5) Dialect kontrolleri: Azure SQL\'de olmayan T-SQL sözdizimini bul (sp_MSforeachtable vb.). (6) Connection string: testlerin Windows auth değil SQL auth kullandığından emin ol.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Azure\'daki QA pipeline\'ı için herhangi bir arızanın 5 dakika içinde kök nedeninin tespit edilebildiği gözlemlenebilirlik stratejisi tasarla.' },
                a: { tr: '(1) Merkezi loglama: tüm pipeline adımları, test container\'ları ve app service\'leri Log Analytics\'e log gönderir. Arıza KQL sorgusu: "AzureDiagnostics | where ResultType == \'Failed\' | project TimeGenerated, OperationName, ResultDescription". (2) Dağıtık izleme: App Insights correlation ID, pipeline tetikleyicisinden test çalıştırmasına uygulama çağrılarına kadar uzanır → tek iz arızanın nerede oluştuğunu gösterir. (3) Test adımı zamanlaması: her test adımı App Insights\'a süreyle özel olay yayar → hangi adımın yavaş olduğunu tespit et. (4) Alarmlar: Logic App belirli log kalıbıyla tetiklenir → App Insights sorgular → izi Teams bildirimine ekler. (5) Runbook korelasyonu: pipeline başarısız olduğunda Azure Automation runbook otomatik olarak yakalar: son deployment\'lar, mevcut alarmlar, resource sağlığı → tüm bağlamla Teams mesajı oluşturur. 5 dakikalık MTTR ulaşılabilir olur.' },
              },
              {
                level: 'advanced',
                q: { tr: 'QA\'nın gerçek kullanıcıları etkilemeden production\'da yayınlanmamış özellikleri test etmesini sağlamak için Azure\'da feature flag testi nasıl uygularsın?' },
                a: { tr: '(1) Azure App Configuration ile feature flag kullan: "az appconfig feature set --name new-checkout-flow --yes". (2) Uygulama başlangıçta veya istek zamanında feature flag\'leri okur. (3) QA\'ya özgü flag hedefleme: flag\'ı yalnızca *@qa.mycompany.com e-postasına sahip kullanıcılar veya belirli header "X-QA-User: true" için etkinleştir. (4) Playwright testi: feature flag\'i tüm test istekleri için etkinleştirmek üzere özel HTTP header\'ları ayarla. (5) Pipeline flag kontrolü: QA testlerinden önce flag etkinleştir: "az appconfig feature enable". Test sonrası devre dışı bırak. (6) Flag durumu doğrulaması: test, flag\'in QA kullanıcısı için ETKİN ve normal kullanıcı için ETKİN DEĞİL olduğunu doğrular. (7) Azure App Config, App Service ve AKS ile Config Map aracılığıyla entegre olur — flag değişiklikler için uygulama yeniden başlatması gerekmez.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Şirketin hem Azure hem AWS kullanan multi-cloud strateji benimsiyor. Her iki cloud\'da çalışan birleşik test pipeline\'ı nasıl kurarsın?' },
                a: { tr: '(1) GitHub Actions (veya Azure Pipelines) tarafsız orkestratör olarak kullan — her iki cloud\'un native entegrasyonu var. (2) Cloud-agnostic IaC: aynı codebase\'de hem azurerm hem aws provider\'lı Terraform. Modül yapısı: modules/compute/azure → ACI, modules/compute/aws → ECS. (3) Birleşik secret store: her iki cloud\'da da HashiCorp Vault (tarafsız VM veya SaaS üzerinde) kullan — her iki cloud için tek secret kaynağı. (4) Test artifact\'ları: raporları rclone kullanarak hem Azure Blob hem S3\'e çoğalt — her iki taraftaki ekipler sonuçlara erişebilir. (5) Cloud-parite testleri: aynı test suite\'ini Azure ve AWS deployment\'larına karşı çalıştır → yanıt sürelerini, özellik davranışlarını karşılaştır — cloud\'a özgü bug\'ları yakala. (6) Maliyet toplama: tek dashboard\'da toplam harcamayı izlemek için CloudHealth veya Azure Cost Management multi-cloud connector kullan.' },
              },
            ],
          },
        ],
      },
    ],
  },
}

