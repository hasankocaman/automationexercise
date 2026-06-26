export const kubernetesData = {
  // ══════════════════════════════════════════════════════════════
  // ENGLISH VERSION
  // ══════════════════════════════════════════════════════════════
  en: {
    hero: {
      title: '☸️ Kubernetes (K8s)',
      subtitle: 'Container Orchestration for Modern QA & DevOps',
      intro: 'Master Kubernetes from zero to interview level. Learn to deploy, scale, and manage containerized applications — the technology behind Google, Netflix, and every major tech company\'s infrastructure.',
    },
    tabs: ['🎯 Introduction', '⚙️ Installation', '🏗️ Architecture', '📦 Core Concepts', '⌨️ kubectl Commands', '📝 YAML Manifests', '🔗 Ecosystem', '🛠️ Real World', '💼 Interview Q&A'],
    sections: [

      // ── SECTION 0: INTRODUCTION ────────────────────────────────────────────
      {
        title: '🎯 What is Kubernetes?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '☸️',
            content: 'Kubernetes is like a smart shipping manager at a huge port. You don\'t tell each crane operator what to do step by step — you just say "I need 10 containers of goods delivered, always keep at least 5 ships loaded, and if one crane breaks, use another." Kubernetes does exactly this for your Docker containers: you declare what you want, and it figures out how to make it happen.',
          },
          {
            type: 'text',
            content: 'When you run hundreds of Docker containers in production, manual management becomes impossible. Which server has free RAM? What happens when a container crashes? How do you update without downtime? Kubernetes (K8s) solves all of this — it\'s a container orchestration platform originally built by Google, now open source.',
          },
          { type: 'heading', text: 'The Problem Kubernetes Solves' },
          {
            type: 'visual',
            variant: 'flow',
            title: 'Without K8s vs With K8s',
            steps: [
              { num: '❌', label: 'Manual Deploy', desc: 'SSH to each server' },
              { num: '❌', label: 'Manual Scale', desc: 'Spin up VMs by hand' },
              { num: '❌', label: 'No Self-Heal', desc: 'Crashed = dead' },
              { num: '✅', label: 'Declarative', desc: 'Describe desired state' },
              { num: '✅', label: 'Auto Scale', desc: 'HPA adjusts replicas' },
              { num: '✅', label: 'Self-Healing', desc: 'Crashed = restarted' },
            ],
          },
          { type: 'heading', text: 'Key Kubernetes Features' },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '🔄', label: 'Self-Healing', desc: 'Automatically restarts failed containers, replaces unhealthy nodes.' },
              { icon: '📈', label: 'Auto-Scaling', desc: 'HPA scales pods based on CPU/memory. Handle traffic spikes automatically.' },
              { icon: '🔄', label: 'Rolling Updates', desc: 'Deploy new versions with zero downtime. Instant rollback if problems occur.' },
              { icon: '⚖️', label: 'Load Balancing', desc: 'Distributes traffic across all healthy pods. Built-in service discovery.' },
              { icon: '🔒', label: 'Secret Management', desc: 'Store API keys, passwords securely. Inject as environment variables.' },
              { icon: '🌐', label: 'Multi-Cloud', desc: 'Runs on AWS, GCP, Azure, or on-prem. No vendor lock-in.' },
            ],
          },
          { type: 'heading', text: 'Kubernetes vs Docker Compose' },
          {
            type: 'table',
            headers: ['Feature', 'Docker Compose', 'Kubernetes'],
            rows: [
              ['Use Case', 'Local development, simple apps', 'Production, complex distributed systems'],
              ['Scale', 'Single machine', 'Multiple nodes / clusters'],
              ['Self-Healing', '❌ Manual restart', '✅ Automatic restart'],
              ['Rolling Updates', '❌ Downtime required', '✅ Zero-downtime rolling update'],
              ['Load Balancing', '❌ Basic / not built-in', '✅ Built-in Service LB'],
              ['Secret Management', '⚠️ .env files (insecure)', '✅ K8s Secrets (encrypted)'],
              ['Learning Curve', '⭐ Easy', '⭐⭐⭐⭐ Steep but worth it'],
            ],
          },
          {
            type: 'quiz',
            question: 'What is the main purpose of Kubernetes?',
            options: [
              { id: 'a', text: 'To build Docker images faster' },
              { id: 'b', text: 'To automate deployment, scaling, and management of containerized applications' },
              { id: 'c', text: 'To replace Docker containers entirely' },
              { id: 'd', text: 'To provide a GUI for managing servers' },
            ],
            correct: 'b',
            explanation: 'Kubernetes is a container orchestration platform — it automates deployment, scaling, load balancing, self-healing, and management of containerized applications across a cluster of machines.',
          
        retryQuestion: {
      "question": "Which of the following best describes the core function of Kubernetes?",
      "options": [
            {
                  "id": "a",
                  "text": "To serve as a persistent storage engine for container data"
            },
            {
                  "id": "b",
                  "text": "To coordinate, scale, and maintain the lifecycle of containerized workloads"
            },
            {
                  "id": "c",
                  "text": "To compile source code into container images"
            },
            {
                  "id": "d",
                  "text": "To manage physical hardware resources without containers"
            }
      ],
      "correct": "b",
      "explanation": "Kubernetes is specifically designed for container orchestration, meaning it handles the operational tasks of running containers, such as scaling, self-healing, and networking, across a distributed cluster."
}
},
          { type: 'heading', text: 'Why QA Engineers Need Kubernetes' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              'Run isolated test environments per branch (namespace per feature)',
              'Spin up full app stack (frontend + backend + DB) for E2E tests',
              'Parallel test execution: scale Selenium Grid pods automatically',
              'Reproduce production bugs exactly — same container images',
              'Test autoscaling behavior — does the app handle load spikes?',
              'Validate health checks and self-healing — kill a pod, watch it restart',
              'Interview questions always include K8s knowledge for Senior QA roles',
            ],
          },
          {
            type: 'visual',
            variant: 'boxes',
            title: { tr: 'Kubernetes Küme Dağılımı', en: 'Kubernetes Cluster Layout' },
            items: [
              { icon: '🎮', label: { tr: 'Control Plane (Master)', en: 'Control Plane (Master)' }, desc: { tr: 'Kümenin beyni: planlama, kontrolörler, API yönetimi.', en: 'Brain of the cluster: API server, scheduler, controllers.' }, highlight: true },
              { arrow: true },
              { icon: '🖥️', label: { tr: 'Worker Node 1', en: 'Worker Node 1' }, desc: { tr: 'Uygulama Pod\'larının koştuğu makine.', en: 'Machine executing Pods.' } },
              { icon: '🖥️', label: { tr: 'Worker Node 2', en: 'Worker Node 2' }, desc: { tr: 'Kapasiteye göre pod alan ek makine.', en: 'Extra machine hosting workloads.' } }
            ],
            note: { tr: 'Control Plane, iş yüklerini (Pods) worker node\'lar arasında dengeli şekilde dağıtır.', en: 'The Control Plane schedules and balances workloads (Pods) across worker nodes.' }
          }
        ],
      },

      // ── SECTION 1: INSTALLATION ───────────────────────────────────────────
      {
        title: '⚙️ Installing Kubernetes',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'For learning and local development you do NOT need a real cloud cluster. minikube creates a single-node K8s cluster on your laptop in minutes. For production, cloud providers (AWS EKS, Google GKE, Azure AKS) manage the Control Plane for you. Start with minikube, learn concepts, then move to cloud.',
          },
          { type: 'heading', text: 'Local vs Cloud Options' },
          {
            type: 'table',
            headers: ['Tool', 'Description', 'Best For'],
            rows: [
              ['minikube', 'Single-node K8s in Docker/VM', 'Learning, local dev — most beginner-friendly'],
              ['kind', 'K8s nodes as Docker containers', 'CI pipelines, multi-node testing'],
              ['k3d / k3s', 'Lightweight K8s', 'Low resource, fast startup'],
              ['Docker Desktop K8s', 'Built-in K8s toggle', 'Windows/Mac users already using Docker Desktop'],
              ['AWS EKS', 'Managed cloud K8s', 'Production — AWS teams'],
              ['Google GKE', 'Google managed K8s', 'Production — GCP teams'],
              ['Azure AKS', 'Azure managed K8s', 'Production — Microsoft/Azure teams'],
            ],
          },
          { type: 'heading', text: 'Step 1: Install Docker Desktop (prerequisite)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Install Docker Desktop — required for minikube',
            code: `# Windows (PowerShell as Administrator)
winget install Docker.DockerDesktop
# After install: open Docker Desktop, go to Settings → Resources → WSL Integration → enable

# Mac
brew install --cask docker
# Or: download DMG from docker.com

# Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo usermod -aG docker $USER
newgrp docker   # apply group change without logout

# Verify Docker is running
docker --version
docker run hello-world  # should print "Hello from Docker!"`,
          },
          { type: 'heading', text: 'Step 2: Install minikube' },
          {
            type: 'code',
            language: 'bash',
            label: 'Install minikube — all three OS',
            code: `# ── WINDOWS ────────────────────────────────────────────────
# Option A: winget (recommended)
winget install Kubernetes.minikube

# Option B: Chocolatey
choco install minikube

# Option C: direct download
# Download minikube-installer.exe from https://minikube.sigs.k8s.io/docs/start/
# Run as Administrator

# ── MAC ─────────────────────────────────────────────────────
brew install minikube

# ── LINUX ───────────────────────────────────────────────────
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64

# ── VERIFY (all OS) ─────────────────────────────────────────
minikube version
# Output: minikube version: v1.32.x`,
          },
          { type: 'heading', text: 'Step 3: Install kubectl' },
          {
            type: 'code',
            language: 'bash',
            label: 'Install kubectl — the K8s command-line tool',
            code: `# ── WINDOWS ────────────────────────────────────────────────
winget install Kubernetes.kubectl
# Or: choco install kubernetes-cli

# ── MAC ─────────────────────────────────────────────────────
brew install kubectl

# ── LINUX (Ubuntu/Debian) ───────────────────────────────────
sudo apt-get update && sudo apt-get install -y apt-transport-https ca-certificates curl
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update && sudo apt-get install -y kubectl

# ── VERIFY ──────────────────────────────────────────────────
kubectl version --client
# Output: Client Version: v1.29.x

# ── USEFUL ALIASES (add to ~/.bashrc or ~/.zshrc) ───────────
alias k=kubectl
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kgd='kubectl get deployments'
alias kga='kubectl get all'`,
          },
          { type: 'heading', text: 'Step 4: Start Your First Cluster' },
          {
            type: 'code',
            language: 'bash',
            label: 'Start minikube and run first application',
            code: `# Start minikube (Docker Desktop must be running)
minikube start --driver=docker --cpus=2 --memory=4096

# Expected output:
# 😄  minikube v1.32.0
# ✨  Using the docker driver based on user configuration
# 🔥  Creating docker container (CPUs=2, Memory=4096MB) ...
# 🐳  Preparing Kubernetes v1.28.x on Docker 24.0.7 ...
# 🚀  Launching Kubernetes ...
# 🏄  Done! kubectl is now configured to use "minikube"

# Verify cluster is running
minikube status
# Expected:
# minikube
# type: Control Plane
# host: Running
# kubelet: Running
# apiserver: Running

kubectl get nodes
# NAME       STATUS   ROLES           AGE   VERSION
# minikube   Ready    control-plane   90s   v1.28.x

# Enable useful addons
minikube addons enable ingress         # Nginx Ingress Controller
minikube addons enable metrics-server  # Required for HPA (auto-scaling)
minikube addons enable dashboard       # Web UI

# Open Kubernetes Dashboard in browser
minikube dashboard

# ── Deploy your first app ─────────────────────────────────
kubectl create deployment hello-nginx --image=nginx:1.25
kubectl expose deployment hello-nginx --type=NodePort --port=80
minikube service hello-nginx  # Opens in browser automatically

kubectl get pods                       # Should show: Running
kubectl logs deployment/hello-nginx    # Check nginx startup logs

# Cleanup
kubectl delete deployment hello-nginx
kubectl delete svc hello-nginx`,
          },
          { type: 'heading', text: 'Alternative: kind (K8s in Docker)' },
          {
            type: 'code',
            language: 'bash',
            label: 'kind — perfect for CI pipelines, supports multi-node clusters',
            code: `# Install kind
# Mac:  brew install kind
# Windows: choco install kind
# Linux:
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.22.0/kind-linux-amd64
chmod +x ./kind && sudo mv ./kind /usr/local/bin/kind

# Single-node cluster (fastest)
kind create cluster --name my-learning

# Multi-node cluster (realistic production simulation)
cat > kind-config.yaml << 'EOF'
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF
kind create cluster --name multi-node --config kind-config.yaml

# kubectl is automatically configured for the new cluster
kubectl get nodes
# NAME                        STATUS   ROLES
# multi-node-control-plane    Ready    control-plane
# multi-node-worker           Ready    <none>
# multi-node-worker2          Ready    <none>

kind get clusters           # List all kind clusters
kind delete cluster --name my-learning  # Cleanup`,
          },
          { type: 'heading', text: 'Cloud Option: AWS EKS' },
          {
            type: 'code',
            language: 'bash',
            label: 'AWS EKS — managed Kubernetes in the cloud',
            code: `# Install eksctl (EKS management tool)
# Mac:  brew tap weaveworks/tap && brew install eksctl
# Windows: choco install eksctl
# Linux:
curl --location "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_Linux_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin

# Install AWS CLI and configure credentials first
aws configure  # Enter: Access Key, Secret Key, region (e.g. eu-west-1), output format (json)

# Create an EKS cluster — takes ~15 minutes
eksctl create cluster \
  --name my-qa-cluster \
  --region eu-west-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 4

# kubectl is automatically configured after creation
kubectl get nodes  # Shows EC2 instances as worker nodes

# ⚠️  Delete cluster when done to avoid AWS costs!
eksctl delete cluster --name my-qa-cluster --region eu-west-1`,
          },
          {
            type: 'quiz',
            question: 'Why is minikube recommended for local learning/development instead of a real cloud cluster like AWS EKS?',
            options: [
              { id: 'a', text: 'minikube supports more Kubernetes features than EKS' },
              { id: 'b', text: 'minikube spins up a single-node cluster on your laptop in minutes for free, while a cloud cluster has Control Plane management and ongoing cost' },
              { id: 'c', text: 'EKS cannot run a Deployment' },
              { id: 'd', text: 'minikube is required before any cloud cluster can be created' },
            ],
            correct: 'b',
            explanation: "minikube creates a single-node Kubernetes cluster directly on your laptop (in Docker or a VM) with zero cloud cost and no waiting on provisioning. A real cloud cluster (EKS/GKE/AKS) manages the Control Plane for you, which is valuable for production but introduces setup time and ongoing billing — overkill while you're still learning core concepts like Pods, Deployments, and Services.",
            retryQuestion: {
              question: 'A team has moved past learning and now needs a multi-node cluster with automatic Control Plane upgrades and high availability for a real production app. Is minikube still a reasonable choice?',
              options: [
                { id: 'a', text: 'Yes, minikube scales to any production workload' },
                { id: 'b', text: 'No — minikube is designed for single-node local development, not production-grade multi-node, highly-available clusters' },
                { id: 'c', text: 'Yes, because minikube and EKS are functionally identical' },
                { id: 'd', text: 'No, because minikube cannot run any Kubernetes object at all' },
              ],
              correct: 'b',
              explanation: 'minikube is explicitly built for local development and learning — a single-node cluster with no built-in high availability or multi-node scaling. A production workload needing real HA and managed Control Plane upgrades needs a real cluster (EKS/GKE/AKS or a self-managed multi-node setup), which is exactly the tradeoff minikube\'s simplicity gives up.',
            },
          },
          {
            type: 'visual',
            variant: 'boxes',
            title: { tr: 'Yerel ve Bulut Kubernetes Karşılaştırması', en: 'Local vs Cloud Kubernetes Setup' },
            items: [
              { icon: '💻', label: { tr: 'Yerel (Minikube)', en: 'Local (Minikube)' }, desc: { tr: 'Laptop üzerinde tek-node. Hızlı ve ücretsiz.', en: 'Single-node on laptop. Fast and free.' } },
              { arrow: true },
              { icon: '☁️', label: { tr: 'Bulut (AWS EKS / GKE)', en: 'Cloud (AWS EKS / GKE)' }, desc: { tr: 'Çoklu-node, yüksek erişilebilirlik. Ücretli.', en: 'Multi-node, high availability. Paid cloud costs.' }, highlight: true }
            ],
            note: { tr: 'Öğrenme sürecinde Minikube, üretim ortamlarında ise bulut orkestrasyonu tercih edilir.', en: 'Minikube is perfect for learning and local development, while managed cloud services host production workloads.' }
          }
        ],
      },

      // ── SECTION 2: ARCHITECTURE ────────────────────────────────────────────
      {
        title: '🏗️ Kubernetes Architecture',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: 'Think of a Kubernetes cluster as a company. The Control Plane is the management floor — CEO (API Server), memory/HR (etcd), scheduler (assigns tasks), and managers (controllers). The Worker Nodes are the actual offices where work happens — each has a supervisor (kubelet), mailroom (kube-proxy), and employees (containers in pods).',
          },
          {
            type: 'diagram-svg',
            title: 'Kubernetes Cluster Architecture',
            svg: `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" style="background:#1a1b2e;border-radius:16px;width:100%;font-family:JetBrains Mono,monospace">
  <!-- Title -->
  <text x="400" y="32" text-anchor="middle" fill="#a78bfa" font-size="15" font-weight="bold">☸️ Kubernetes Cluster</text>

  <!-- Control Plane Box -->
  <rect x="20" y="50" width="360" height="220" rx="14" fill="#1e1b4b" stroke="#7c3aed" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold">🧠 CONTROL PLANE (Master Node)</text>

  <!-- API Server -->
  <rect x="40" y="88" width="150" height="52" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="115" y="108" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">API Server</text>
  <text x="115" y="124" text-anchor="middle" fill="#818cf8" font-size="9">Entry point for all</text>
  <text x="115" y="136" text-anchor="middle" fill="#818cf8" font-size="9">kubectl commands</text>

  <!-- etcd -->
  <rect x="210" y="88" width="150" height="52" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="285" y="108" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">etcd</text>
  <text x="285" y="124" text-anchor="middle" fill="#818cf8" font-size="9">Cluster state &amp;</text>
  <text x="285" y="136" text-anchor="middle" fill="#818cf8" font-size="9">config store (key-value)</text>

  <!-- Scheduler -->
  <rect x="40" y="156" width="150" height="52" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="115" y="176" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">Scheduler</text>
  <text x="115" y="192" text-anchor="middle" fill="#818cf8" font-size="9">Assigns pods to</text>
  <text x="115" y="204" text-anchor="middle" fill="#818cf8" font-size="9">worker nodes</text>

  <!-- Controller Manager -->
  <rect x="210" y="156" width="150" height="52" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="285" y="176" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">Controller Mgr</text>
  <text x="285" y="192" text-anchor="middle" fill="#818cf8" font-size="9">Ensures desired state</text>
  <text x="285" y="204" text-anchor="middle" fill="#818cf8" font-size="9">ReplicaSet, Node ctrl</text>

  <!-- kubectl -->
  <rect x="20" y="50" width="0" height="0"/>
  <rect x="40" y="226" width="320" height="32" rx="6" fill="#4c1d95" stroke="#7c3aed" stroke-width="1"/>
  <text x="200" y="246" text-anchor="middle" fill="#c4b5fd" font-size="10">💻 kubectl → API Server → etcd → Scheduler → Worker Node</text>

  <!-- Worker Node 1 -->
  <rect x="420" y="50" width="168" height="240" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
  <text x="504" y="74" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">🖥️ Worker Node 1</text>

  <rect x="436" y="84" width="136" height="38" rx="6" fill="#065f46" stroke="#34d399" stroke-width="1"/>
  <text x="504" y="100" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">kubelet</text>
  <text x="504" y="114" text-anchor="middle" fill="#a7f3d0" font-size="8">Reports to API Server</text>

  <rect x="436" y="130" width="136" height="38" rx="6" fill="#065f46" stroke="#34d399" stroke-width="1"/>
  <text x="504" y="146" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">kube-proxy</text>
  <text x="504" y="160" text-anchor="middle" fill="#a7f3d0" font-size="8">Network routing</text>

  <!-- Pod 1 -->
  <rect x="436" y="176" width="60" height="50" rx="6" fill="#047857" stroke="#10b981" stroke-width="1"/>
  <text x="466" y="196" text-anchor="middle" fill="#d1fae5" font-size="8" font-weight="bold">Pod</text>
  <text x="466" y="210" text-anchor="middle" fill="#6ee7b7" font-size="8">🐳 app:v2</text>
  <text x="466" y="222" text-anchor="middle" fill="#6ee7b7" font-size="8">port:8080</text>

  <!-- Pod 2 -->
  <rect x="512" y="176" width="60" height="50" rx="6" fill="#047857" stroke="#10b981" stroke-width="1"/>
  <text x="542" y="196" text-anchor="middle" fill="#d1fae5" font-size="8" font-weight="bold">Pod</text>
  <text x="542" y="210" text-anchor="middle" fill="#6ee7b7" font-size="8">🐳 app:v2</text>
  <text x="542" y="222" text-anchor="middle" fill="#6ee7b7" font-size="8">port:8080</text>

  <!-- Worker Node 2 -->
  <rect x="612" y="50" width="168" height="240" rx="14" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="696" y="74" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">🖥️ Worker Node 2</text>

  <rect x="628" y="84" width="136" height="38" rx="6" fill="#1e40af" stroke="#60a5fa" stroke-width="1"/>
  <text x="696" y="100" text-anchor="middle" fill="#93c5fd" font-size="9" font-weight="bold">kubelet</text>
  <text x="696" y="114" text-anchor="middle" fill="#bfdbfe" font-size="8">Reports to API Server</text>

  <rect x="628" y="130" width="136" height="38" rx="6" fill="#1e40af" stroke="#60a5fa" stroke-width="1"/>
  <text x="696" y="146" text-anchor="middle" fill="#93c5fd" font-size="9" font-weight="bold">kube-proxy</text>
  <text x="696" y="160" text-anchor="middle" fill="#bfdbfe" font-size="8">Network routing</text>

  <!-- Pod 3 -->
  <rect x="628" y="176" width="136" height="50" rx="6" fill="#1d4ed8" stroke="#3b82f6" stroke-width="1"/>
  <text x="696" y="196" text-anchor="middle" fill="#dbeafe" font-size="8" font-weight="bold">Pod (DB)</text>
  <text x="696" y="210" text-anchor="middle" fill="#93c5fd" font-size="8">🐘 postgres:15</text>
  <text x="696" y="222" text-anchor="middle" fill="#93c5fd" font-size="8">port:5432</text>

  <!-- Arrows: Control Plane → Worker Nodes -->
  <line x1="380" y1="155" x2="420" y2="155" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,3"/>
  <polygon points="416,151 424,155 416,159" fill="#7c3aed"/>

  <line x1="380" y1="175" x2="612" y2="155" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="608,151 616,155 608,159" fill="#7c3aed"/>

  <!-- Service Layer -->
  <rect x="420" y="310" width="360" height="48" rx="10" fill="#7c2d12" stroke="#f97316" stroke-width="2"/>
  <text x="600" y="330" text-anchor="middle" fill="#fed7aa" font-size="11" font-weight="bold">⚖️ Service (Load Balancer)</text>
  <text x="600" y="348" text-anchor="middle" fill="#fb923c" font-size="9">Distributes traffic across all pods — auto-discovers healthy pods</text>

  <!-- Ingress -->
  <rect x="20" y="310" width="380" height="48" rx="10" fill="#1c1917" stroke="#a3a3a3" stroke-width="2"/>
  <text x="210" y="330" text-anchor="middle" fill="#e7e5e4" font-size="11" font-weight="bold">🌐 Ingress Controller</text>
  <text x="210" y="348" text-anchor="middle" fill="#a8a29e" font-size="9">Routes external traffic: api.example.com → Service → Pods</text>

  <!-- Arrows Service → Pods -->
  <line x1="504" y1="310" x2="466" y2="226" stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="550" y1="310" x2="542" y2="226" stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Namespace label -->
  <rect x="20" y="380" width="760" height="130" rx="12" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="8,4"/>
  <text x="40" y="402" fill="#6366f1" font-size="10">📦 Namespace: production</text>

  <!-- Legend -->
  <rect x="40" y="420" width="120" height="78" rx="8" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1"/>
  <text x="100" y="438" text-anchor="middle" fill="#a5b4fc" font-size="9" font-weight="bold">Control Plane</text>
  <text x="100" y="453" text-anchor="middle" fill="#818cf8" font-size="8">API Server, etcd</text>
  <text x="100" y="466" text-anchor="middle" fill="#818cf8" font-size="8">Scheduler, CtrlMgr</text>
  <text x="100" y="479" text-anchor="middle" fill="#6366f1" font-size="8">→ The "brain" of K8s</text>
  <text x="100" y="492" text-anchor="middle" fill="#6366f1" font-size="8">Never runs workloads</text>

  <rect x="200" y="420" width="120" height="78" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
  <text x="260" y="438" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Worker Node</text>
  <text x="260" y="453" text-anchor="middle" fill="#a7f3d0" font-size="8">kubelet, kube-proxy</text>
  <text x="260" y="466" text-anchor="middle" fill="#a7f3d0" font-size="8">Container runtime</text>
  <text x="260" y="479" text-anchor="middle" fill="#34d399" font-size="8">→ Runs your pods</text>
  <text x="260" y="492" text-anchor="middle" fill="#34d399" font-size="8">Actual workloads here</text>

  <rect x="360" y="420" width="120" height="78" rx="8" fill="#047857" stroke="#10b981" stroke-width="1"/>
  <text x="420" y="438" text-anchor="middle" fill="#d1fae5" font-size="9" font-weight="bold">Pod</text>
  <text x="420" y="453" text-anchor="middle" fill="#a7f3d0" font-size="8">Smallest unit in K8s</text>
  <text x="420" y="466" text-anchor="middle" fill="#a7f3d0" font-size="8">1+ containers inside</text>
  <text x="420" y="479" text-anchor="middle" fill="#34d399" font-size="8">→ Shared network</text>
  <text x="420" y="492" text-anchor="middle" fill="#34d399" font-size="8">and storage</text>

  <rect x="520" y="420" width="120" height="78" rx="8" fill="#7c2d12" stroke="#f97316" stroke-width="1"/>
  <text x="580" y="438" text-anchor="middle" fill="#fed7aa" font-size="9" font-weight="bold">Service</text>
  <text x="580" y="453" text-anchor="middle" fill="#fdba74" font-size="8">Stable endpoint</text>
  <text x="580" y="466" text-anchor="middle" fill="#fdba74" font-size="8">for pods</text>
  <text x="580" y="479" text-anchor="middle" fill="#f97316" font-size="8">→ Load balances</text>
  <text x="580" y="492" text-anchor="middle" fill="#f97316" font-size="8">traffic to pods</text>

  <rect x="660" y="420" width="100" height="78" rx="8" fill="#1c1917" stroke="#a3a3a3" stroke-width="1"/>
  <text x="710" y="438" text-anchor="middle" fill="#e7e5e4" font-size="9" font-weight="bold">Ingress</text>
  <text x="710" y="453" text-anchor="middle" fill="#d6d3d1" font-size="8">HTTP routing</text>
  <text x="710" y="466" text-anchor="middle" fill="#d6d3d1" font-size="8">TLS termination</text>
  <text x="710" y="479" text-anchor="middle" fill="#a8a29e" font-size="8">→ External</text>
  <text x="710" y="492" text-anchor="middle" fill="#a8a29e" font-size="8">traffic entry</text>
</svg>`,
          },
          { type: 'heading', text: 'Control Plane Components' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🎮', label: 'kube-apiserver', desc: 'The front door of K8s. All kubectl commands go through here. Validates requests, updates etcd, and coordinates everything. If it dies, the cluster is unmanageable (but running pods continue).' },
              { icon: '🗄️', label: 'etcd', desc: 'The brain\'s memory. A distributed key-value store that holds ALL cluster state — nodes, pods, services, configs. If etcd is lost, the cluster state is lost. Always back it up!' },
              { icon: '📅', label: 'kube-scheduler', desc: 'Decides which worker node a new pod should run on. Considers CPU/memory available, taints/tolerations, affinity rules, and resource requests. Assigns but doesn\'t start pods.' },
              { icon: '🔧', label: 'kube-controller-manager', desc: 'Runs control loops that watch cluster state. ReplicaSet controller ensures correct pod count. Node controller detects failed nodes. Endpoint controller updates Service endpoints.' },
            ],
          },
          { type: 'heading', text: 'Worker Node Components' },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '👮', label: 'kubelet', desc: 'The node agent. Runs on every worker node. Gets pod specs from API Server and ensures containers are running healthy. Reports node status back to Control Plane.' },
              { icon: '🌐', label: 'kube-proxy', desc: 'Maintains network rules on each node. Enables Service abstraction — routes traffic to the correct pod. Uses iptables or IPVS rules.' },
              { icon: '🐳', label: 'Container Runtime', desc: 'The actual engine that runs containers. Kubernetes supports containerd (default), CRI-O, or Docker (deprecated). Pulls images and starts containers per kubelet instructions.' },
            ],
          },
          {
            type: 'quiz',
            question: 'Which component decides which Worker Node a new pod should be scheduled on?',
            options: [
              { id: 'a', text: 'kube-apiserver' },
              { id: 'b', text: 'etcd' },
              { id: 'c', text: 'kube-scheduler' },
              { id: 'd', text: 'kubelet' },
            ],
            correct: 'c',
            explanation: 'The kube-scheduler watches for unscheduled pods and assigns them to the most suitable Worker Node based on resource availability, taints, tolerations, and affinity rules.',
          
        retryQuestion: {
      "question": "When a new pod is created, which control plane component is responsible for selecting the optimal node where the pod will execute?",
      "options": [
            {
                  "id": "a",
                  "text": "kube-controller-manager"
            },
            {
                  "id": "b",
                  "text": "kube-proxy"
            },
            {
                  "id": "c",
                  "text": "kube-scheduler"
            },
            {
                  "id": "d",
                  "text": "Container Runtime"
            }
      ],
      "correct": "c",
      "explanation": "The kube-scheduler is the specific component responsible for placement decisions. It evaluates the requirements of the pod and the state of the nodes in the cluster to determine the best fit for execution."
}
},
        ],
      },

      // ── SECTION 2: CORE CONCEPTS ───────────────────────────────────────────
      {
        title: '📦 Core Kubernetes Concepts',
        blocks: [
          { type: 'heading', text: 'Pod — The Smallest Unit' },
          {
            type: 'simple-box',
            emoji: '🫘',
            content: 'A Pod is like a shipping container (the physical box, not Docker). A Docker container is the goods inside. One pod usually has one container, but can have multiple containers that need to share network and storage — like a main app and a logging sidecar.',
          },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📍', label: 'Pod = 1+ containers', desc: 'Share the same IP address, hostname, and volumes. Containers in a pod can talk to each other via localhost.' },
              { icon: '⚡', label: 'Ephemeral by design', desc: 'Pods can be killed and recreated at any time. Never store persistent state in a pod directly — use PersistentVolumes.' },
              { icon: '🏷️', label: 'Labels & Selectors', desc: 'Pods are tagged with labels: app=frontend, env=prod. Services and Deployments use selectors to find matching pods.' },
              { icon: '🩺', label: 'Health Probes', desc: 'livenessProbe: restart if unhealthy. readinessProbe: only send traffic when ready. startupProbe: for slow-starting apps.' },
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Minimal Pod YAML',
            code: `# The simplest possible Pod manifest
apiVersion: v1
kind: Pod
metadata:
  name: my-app-pod
  labels:
    app: my-app       # Label — used by Services to find this pod
    env: production
spec:
  containers:
  - name: my-app
    image: nginx:1.25  # Docker image to run
    ports:
    - containerPort: 80
    resources:
      requests:         # Minimum resources needed
        memory: "64Mi"
        cpu: "250m"     # 250 millicores = 0.25 CPU
      limits:           # Maximum allowed
        memory: "128Mi"
        cpu: "500m"`,
          },
          { type: 'heading', text: 'Deployment — Managing Pod Replicas' },
          {
            type: 'text',
            content: 'You almost never create Pods directly. Use a Deployment instead — it manages a ReplicaSet, which ensures your desired number of pod replicas are always running. Deployment also handles rolling updates and rollbacks.',
          },
          {
            type: 'visual',
            variant: 'boxes',
            title: 'Deployment → ReplicaSet → Pods (relationship)',
            items: [
              { icon: '🚀', label: 'Deployment', desc: 'Manages updates & rollbacks' },
              { arrow: true },
              { icon: '📋', label: 'ReplicaSet', desc: 'Ensures N pods running' },
              { arrow: true },
              { icon: '🫘', label: 'Pod 1', desc: 'app:v2' },
              { arrow: false },
              { icon: '🫘', label: 'Pod 2', desc: 'app:v2' },
              { arrow: false },
              { icon: '🫘', label: 'Pod 3', desc: 'app:v2' },
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Deployment YAML',
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-deployment
  namespace: production
spec:
  replicas: 3                    # Always keep 3 pods running
  selector:
    matchLabels:
      app: my-app                # Find pods with this label
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1                # Create 1 extra pod during update
      maxUnavailable: 0          # Never kill pods before new ones are ready
  template:                      # Pod template below
    metadata:
      labels:
        app: my-app
        version: "2.0"
    spec:
      containers:
      - name: my-app
        image: myapp:2.0
        ports:
        - containerPort: 8080
        readinessProbe:          # Don't send traffic until ready
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10`,
          },
          { type: 'heading', text: 'Service — Stable Network Endpoint' },
          {
            type: 'text',
            content: 'Pods have dynamic IPs — they change every time a pod restarts. A Service provides a stable IP and DNS name that always routes to the correct pods (via label selectors). Think of it as the receptionist at the front desk — callers don\'t need to know which employee answers.',
          },
          {
            type: 'table',
            headers: ['Service Type', 'Access', 'Use Case'],
            rows: [
              ['ClusterIP (default)', 'Only inside cluster', 'Internal microservice communication (DB, backend API)'],
              ['NodePort', 'Exposed on each node\'s IP:PORT (30000-32767)', 'Dev/test access without cloud LB. Direct access to node.'],
              ['LoadBalancer', 'Cloud provider creates external LB', 'Production apps on AWS/GCP/Azure'],
              ['ExternalName', 'DNS alias to external service', 'Connect to external databases like RDS'],
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Service YAML (ClusterIP + NodePort example)',
            code: `# ClusterIP — internal access only
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  type: ClusterIP          # Default — no external access
  selector:
    app: my-app            # Route to pods with label app=my-app
  ports:
  - port: 80               # Service port (what callers use)
    targetPort: 8080       # Container port (where app listens)
---
# NodePort — external dev access
apiVersion: v1
kind: Service
metadata:
  name: my-app-nodeport
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080        # Access via: http://<NodeIP>:30080`,
          },
          { type: 'heading', text: 'Namespace — Logical Isolation' },
          {
            type: 'text',
            content: 'Namespaces partition a single cluster into multiple virtual clusters. Think of them as separate folders. Teams or environments can share a cluster but stay isolated: dev, staging, and production namespaces on the same hardware.',
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Working with Namespaces',
            code: `# List all namespaces
kubectl get namespaces

# Create a namespace
kubectl create namespace qa-team

# Deploy to a specific namespace
kubectl apply -f deployment.yaml -n qa-team

# Default namespaces in a fresh K8s cluster:
# default        - where resources go without specifying namespace
# kube-system    - K8s system components (DNS, dashboard)
# kube-public    - publicly readable resources
# kube-node-lease - node heartbeat leases`,
          },
          { type: 'heading', text: 'ConfigMap & Secret — Configuration Management' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '⚙️', label: 'ConfigMap', desc: 'Non-sensitive config data: database URL, feature flags, API base URLs. Injected as environment variables or volume-mounted as files.' },
              { icon: '🔐', label: 'Secret', desc: 'Sensitive data: passwords, API keys, TLS certificates. Base64-encoded (not encrypted by default — use RBAC + encryption at rest). Injected same way as ConfigMap.' },
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'ConfigMap + Secret usage',
            code: `# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_URL: "postgres://db-service:5432/mydb"
  LOG_LEVEL: "info"
  FEATURE_FLAG_NEW_UI: "true"
---
# Secret (values must be base64 encoded)
# echo -n "my-secret-password" | base64
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  DB_PASSWORD: bXktc2VjcmV0LXBhc3N3b3Jk
  API_KEY: c3VwZXItc2VjcmV0LWtleQ==
---
# Using them in a Deployment
spec:
  containers:
  - name: app
    image: myapp:1.0
    envFrom:
    - configMapRef:
        name: app-config       # All ConfigMap keys as env vars
    - secretRef:
        name: app-secrets      # All Secret keys as env vars`,
          },
          {
            type: 'quiz',
            question: 'Which Kubernetes object provides a stable network endpoint for a set of pods?',
            options: [
              { id: 'a', text: 'Pod' },
              { id: 'b', text: 'Service' },
              { id: 'c', text: 'ConfigMap' },
              { id: 'd', text: 'Namespace' },
            ],
            correct: 'b',
            explanation: 'A Service provides a stable IP and DNS name that persists even as pods are created and destroyed. It uses label selectors to route traffic to matching pods automatically.',
          
        retryQuestion: {
      "question": "If you need a consistent access point that allows external traffic to reach a dynamic group of replica pods, which resource should you create?",
      "options": [
            {
                  "id": "a",
                  "text": "Deployment"
            },
            {
                  "id": "b",
                  "text": "Service"
            },
            {
                  "id": "c",
                  "text": "Secret"
            },
            {
                  "id": "d",
                  "text": "Volume"
            }
      ],
      "correct": "b",
      "explanation": "A Service acts as an abstraction layer that groups a set of Pods together and provides a single, stable IP address or DNS name, ensuring that traffic reaches the pods even if their individual IP addresses change due to scaling or restarts."
}
},
        ],
      },

      // ── SECTION 3: KUBECTL COMMANDS ────────────────────────────────────────
      {
        title: '⌨️ kubectl Commands Cheat Sheet',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⌨️',
            content: 'kubectl is the CLI tool for talking to your Kubernetes cluster. Think of it as the remote control — you type commands and the API Server executes them. Every kubectl command goes through the API Server.',
          },
          { type: 'heading', text: 'Getting Information' },
          {
            type: 'code',
            language: 'bash',
            label: 'GET commands — Inspect cluster state',
            code: `# List all pods in current namespace
kubectl get pods

# List pods in ALL namespaces
kubectl get pods --all-namespaces   # or -A

# List pods with more details (IP, node)
kubectl get pods -o wide

# Get pods in a specific namespace
kubectl get pods -n production

# Watch pods in real-time (updates as state changes)
kubectl get pods -w

# List all resource types
kubectl get all

# Get pod in YAML format (great for debugging)
kubectl get pod my-pod -o yaml

# Get deployments
kubectl get deployments

# Get services
kubectl get services   # or kubectl get svc

# Get nodes
kubectl get nodes`,
          },
          { type: 'heading', text: 'Inspecting Resources' },
          {
            type: 'code',
            language: 'bash',
            label: 'DESCRIBE — Detailed information + events',
            code: `# Describe a pod — shows events, conditions, resource usage
kubectl describe pod my-pod

# Describe a deployment
kubectl describe deployment my-app-deployment

# Describe a node — useful for understanding capacity
kubectl describe node worker-node-1

# Check events (great for debugging why pod won't start)
kubectl get events --sort-by=.metadata.creationTimestamp -n production

# Filter events for a specific pod
kubectl get events --field-selector involvedObject.name=my-pod`,
          },
          { type: 'heading', text: 'Logs & Debugging' },
          {
            type: 'code',
            language: 'bash',
            label: 'LOGS and EXEC — Debug running containers',
            code: `# Get logs from a pod
kubectl logs my-pod

# Follow logs in real-time (like tail -f)
kubectl logs -f my-pod

# Get logs from a specific container (multi-container pod)
kubectl logs my-pod -c my-container

# Get previous container logs (if it crashed and restarted)
kubectl logs my-pod --previous

# Execute a command inside a running container
kubectl exec my-pod -- ls /app

# Open an interactive shell inside a container
kubectl exec -it my-pod -- /bin/bash

# Run a temporary debug pod
kubectl run debug-pod --image=busybox --rm -it -- sh

# Port forward: access pod locally without a Service
kubectl port-forward pod/my-pod 8080:8080
# Now: curl http://localhost:8080`,
          },
          { type: 'heading', text: 'Applying & Deleting Resources' },
          {
            type: 'code',
            language: 'bash',
            label: 'APPLY / DELETE / SCALE',
            code: `# Apply (create or update) from a YAML file
kubectl apply -f deployment.yaml

# Apply all YAML files in a directory
kubectl apply -f ./k8s/

# Delete a resource
kubectl delete pod my-pod
kubectl delete -f deployment.yaml

# Delete all pods in a namespace
kubectl delete pods --all -n test-env

# Scale a deployment
kubectl scale deployment my-app --replicas=5

# Update image (triggers rolling update)
kubectl set image deployment/my-app my-app=myapp:2.0

# Rollback to previous version
kubectl rollout undo deployment/my-app

# Check rollout status
kubectl rollout status deployment/my-app

# View rollout history
kubectl rollout history deployment/my-app`,
          },
          { type: 'heading', text: 'Namespace & Context Management' },
          {
            type: 'code',
            language: 'bash',
            label: 'Namespaces, Contexts, and Config',
            code: `# Create namespace
kubectl create namespace staging

# Set default namespace (stop typing -n every time)
kubectl config set-context --current --namespace=staging

# List all contexts (clusters you're configured to talk to)
kubectl config get-contexts

# Switch context (switch between clusters)
kubectl config use-context my-production-cluster

# View current config
kubectl config view

# Quick namespace switch (install kubens for this)
kubens production   # switches to production namespace`,
          },
          {
            type: 'callout',
            color: 'green',
            emoji: '💡',
            title: 'Pro Tip: kubectl aliases',
            content: 'Experienced K8s users add aliases to .bashrc: alias k=kubectl | alias kgp="kubectl get pods" | alias kgs="kubectl get svc". This saves enormous time during day-to-day work and especially during interviews/certification exams.',
          },
          {
            type: 'quiz',
            question: 'How do you follow pod logs in real-time?',
            options: [
              { id: 'a', text: 'kubectl logs my-pod --watch' },
              { id: 'b', text: 'kubectl logs -f my-pod' },
              { id: 'c', text: 'kubectl describe my-pod --logs' },
              { id: 'd', text: 'kubectl tail my-pod' },
            ],
            correct: 'b',
            explanation: 'kubectl logs -f my-pod follows (streams) logs in real-time, similar to tail -f in Linux. The -f flag means "follow". This is essential for debugging running applications.',
          
        retryQuestion: {
      "question": "Which command is used to stream the logs of a container within a pod continuously until you terminate it?",
      "options": [
            {
                  "id": "a",
                  "text": "kubectl logs my-pod --stream"
            },
            {
                  "id": "b",
                  "text": "kubectl logs -f my-pod"
            },
            {
                  "id": "c",
                  "text": "kubectl get logs my-pod -f"
            },
            {
                  "id": "d",
                  "text": "kubectl logs my-pod --tail"
            }
      ],
      "correct": "b",
      "explanation": "The -f flag stands for 'follow', which maintains an open connection to the pod's log output, displaying new log entries as they are generated by the container."
    }
  },
  {
    type: 'visual',
    variant: 'flow',
    title: { tr: 'kubectl İstek Akışı Mimarisi', en: 'kubectl Request Lifecycle Flow' },
    steps: [
      { num: '1', label: { tr: 'Komut Girişi', en: 'CLI Command' }, desc: { tr: 'Kullanıcı bir komut yazar: kubectl get pods', en: 'User types a command: kubectl get pods' } },
      { num: '2', label: { tr: 'Kubeconfig Analizi', en: 'Kubeconfig Check' }, desc: { tr: 'Lokal kubeconfig dosyasındaki cluster kimlik bilgileri doğrulanır.', en: 'Authenticates credentials using ~/.kube/config' } },
      { num: '3', label: { tr: 'API İsteği', en: 'API Request' }, desc: { tr: 'kubectl, Control Plane üzerindeki API Server\'a bir REST HTTPS isteği gönderir.', en: 'Translates command into an HTTPS REST call to API Server' } },
      { num: '4', label: { tr: 'Cluster Sorgulama', en: 'etcd Lookup' }, desc: { tr: 'API Server, durumu etcd veritabanından sorgular veya ilgili Node\'daki kubelet ile konuşur.', en: 'API Server queries etcd or communicates with Kubelets on nodes' } },
      { num: '5', label: { tr: 'Konsol Çıktısı', en: 'CLI Response' }, desc: { tr: 'Gelen JSON verisi tablolaştırılarak terminal ekranına yazdırılır.', en: 'Formats the JSON response into a clean table in the terminal' } }
    ]
  }
],
},

      // ── SECTION 4: YAML MANIFESTS ──────────────────────────────────────────
      {
        title: '📝 YAML Manifests — Hands-On',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📝',
            content: 'In Kubernetes, everything is described as YAML files called "manifests." Think of YAML as a letter you write to Kubernetes: "Dear K8s, please run 3 copies of my app, connect them to port 8080, and make sure they are always healthy." YAML indentation with 2 spaces is strictly required — wrong indentation = error.',
          },
          { type: 'heading', text: 'YAML Structure — Every K8s Object Has 4 Root Fields' },
          {
            type: 'code',
            language: 'yaml',
            label: 'The 4 mandatory fields in every K8s YAML',
            code: `apiVersion: apps/v1    # Which K8s API version handles this object
kind: Deployment       # What TYPE of object: Pod, Deployment, Service, etc.
metadata:              # Identity of the object
  name: my-app         # Unique name in the namespace
  namespace: default   # Which namespace (default if omitted)
  labels:              # Key-value tags for organization
    app: my-app
    env: production
spec:                  # The DESIRED STATE — what you want K8s to do
  # ... object-specific configuration here`,
          },
          { type: 'heading', text: 'Complete App: Deployment + Service' },
          {
            type: 'code',
            language: 'yaml',
            label: 'Full production-ready app deployment',
            code: `# ─── Deployment ──────────────────────────────────────────────
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
  namespace: production
  labels:
    app: webapp
    version: "3.2"
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0   # Zero-downtime: always 3 pods available
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: myregistry/webapp:3.2
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: production
        - name: DB_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: DATABASE_URL
        - name: DB_PASS
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DB_PASSWORD
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:      # Restart pod if this fails
          httpGet:
            path: /healthz
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 20
        readinessProbe:     # Only route traffic when this passes
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
---
# ─── Service ─────────────────────────────────────────────────
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: webapp           # Routes to all pods with app=webapp label
  ports:
  - name: http
    port: 80
    targetPort: 3000`,
          },
          { type: 'heading', text: 'Ingress — Route External HTTP Traffic' },
          {
            type: 'code',
            language: 'yaml',
            label: 'Ingress: route api.example.com → webapp-service',
            code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webapp-ingress
  namespace: production
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx   # Requires an Ingress Controller installed
  rules:
  - host: api.example.com   # Route this domain
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: webapp-service   # Forward to this Service
            port:
              number: 80
  tls:                            # HTTPS
  - hosts:
    - api.example.com
    secretName: tls-secret        # TLS certificate stored as K8s Secret`,
          },
          { type: 'heading', text: 'HorizontalPodAutoscaler (HPA)' },
          {
            type: 'text',
            content: 'HPA automatically scales your Deployment\'s replica count based on CPU usage (or custom metrics). QA use case: test that your app scales correctly under load by watching HPA react to a JMeter load test.',
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'HPA — auto-scale based on CPU',
            code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  minReplicas: 2       # Never go below 2
  maxReplicas: 20      # Never exceed 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70   # Scale up when avg CPU > 70%

# Watch HPA react during load test:
# kubectl get hpa -w
# As JMeter load increases → CPU spikes → HPA adds replicas!`,
          },
          {
            type: 'callout',
            color: 'blue',
            emoji: '🧪',
            title: 'QA Testing Tip: Validate K8s Deployments',
            content: 'After applying manifests: 1) kubectl rollout status deployment/webapp — check rollout completed, 2) kubectl get pods -w — watch pods come healthy, 3) kubectl describe pod <pod-name> — inspect events if something is wrong, 4) kubectl logs <pod-name> — check app startup logs.',
          },
          {
            type: 'quiz',
            question: 'After applying a Deployment manifest with `kubectl apply -f deployment.yaml`, which command tells you whether the rollout has actually finished successfully?',
            options: [
              { id: 'a', text: 'kubectl apply -f deployment.yaml --check' },
              { id: 'b', text: 'kubectl rollout status deployment/<name>' },
              { id: 'c', text: 'kubectl get pods --status' },
              { id: 'd', text: 'kubectl version' },
            ],
            correct: 'b',
            explanation: '`kubectl apply` only submits the desired state — it returns immediately, before pods are necessarily running. `kubectl rollout status deployment/<name>` blocks and reports progress until the rollout genuinely completes (or fails), making it the right command to verify a deployment actually succeeded rather than assuming it did because `apply` returned with no error.',
            retryQuestion: {
              question: 'A CI pipeline runs `kubectl apply -f deployment.yaml` and immediately moves to the next step without checking rollout status. The new pods actually fail to start. What does the pipeline see?',
              options: [
                { id: 'a', text: 'The pipeline automatically fails because apply detects the broken pods' },
                { id: 'b', text: 'The pipeline sees a successful exit code from apply and proceeds, unaware the deployment is actually broken' },
                { id: 'c', text: 'kubectl apply refuses to return until pods are healthy' },
                { id: 'd', text: 'The cluster automatically rolls back without any CI awareness' },
              ],
              correct: 'b',
              explanation: '`kubectl apply` only confirms that the desired state was accepted by the API server — it says nothing about whether the actual pods come up healthy. A CI pipeline that does not follow up with `kubectl rollout status` (or equivalent health checks) can report "deploy succeeded" while the real application is crash-looping in production, which is exactly why rollout status checks are a standard step in real deployment pipelines.',
            },
          },
        ],
      },

      // ── SECTION 5: INTERVIEW Q&A ───────────────────────────────────────────
      {
        title: '🔗 Kubernetes Ecosystem & Tool Relationships',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔗',
            content: 'Kubernetes is not a standalone tool — it is the hub of a modern DevOps ecosystem. Understanding how K8s connects with Docker, Jenkins, Kafka, and Helm is what separates a basic K8s user from a Senior DevOps/QA Engineer. These tools form a complete software delivery pipeline.',
          },
          { type: 'heading', text: 'Docker ↔ Kubernetes: The Foundation' },
          {
            type: 'visual',
            variant: 'flow',
            title: 'Docker builds images, Kubernetes runs them at scale',
            steps: [
              { num: '1', label: 'Write Code', desc: 'Java/Python app' },
              { num: '2', label: 'Dockerfile', desc: 'Package the app' },
              { num: '3', label: 'docker build', desc: 'Create image' },
              { num: '4', label: 'docker push', desc: 'Push to registry' },
              { num: '5', label: 'K8s YAML', desc: 'Reference the image' },
              { num: '6', label: 'K8s runs it', desc: 'Via containerd' },
            ],
          },
          {
            type: 'text',
            content: 'Docker builds container images. Kubernetes RUNS those images at scale. K8s no longer uses Docker daemon directly (deprecated in K8s 1.20+) — it uses containerd or CRI-O instead. But Docker is still used to BUILD the images. Analogy from Java world: Docker is like Maven packaging a JAR, Kubernetes is like the application server cluster running it.',
          },
          {
            type: 'table',
            headers: ['Tool', 'Role', 'Relationship'],
            rows: [
              ['Docker', 'Container runtime + build tool', 'Builds images that K8s pulls and runs'],
              ['Kubernetes', 'Orchestration platform', 'Schedules, scales, heals Docker containers'],
              ['containerd', 'Low-level container runtime', 'K8s uses containerd (not Docker daemon) to run containers'],
              ['Docker Compose', 'Multi-container local dev', 'Good for dev, K8s is for production at scale'],
            ],
          },
          { type: 'heading', text: 'Jenkins ↔ Kubernetes: CI/CD Pipeline' },
          {
            type: 'text',
            content: 'Jenkins builds, tests, and DEPLOYS to Kubernetes. A Jenkinsfile pipeline: 1) Runs tests, 2) Builds Docker image, 3) Pushes to registry, 4) Applies K8s manifests with kubectl. K8s can also RUN Jenkins build agents as pods — each build gets a clean container, like a fresh Java thread.',
          },
          {
            type: 'code',
            language: 'groovy',
            label: 'Jenkinsfile — pipeline that deploys to Kubernetes',
            code: `pipeline {
    agent {
        kubernetes {
            // Each Jenkins build runs inside a K8s pod — clean environment every time
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: maven
    image: maven:3.9-openjdk-17
    command: ['sleep', 'infinity']
  - name: docker
    image: docker:24-dind
    securityContext:
      privileged: true
"""
        }
    }

    environment {
        REGISTRY = 'myregistry.azurecr.io'
        IMAGE_NAME = 'my-spring-app'
        K8S_NAMESPACE = 'production'
    }

    stages {
        stage('Unit Tests') {
            steps {
                container('maven') {
                    sh 'mvn clean test'
                    junit 'target/surefire-reports/**/*.xml'
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                container('docker') {
                    sh """
                        docker build -t \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER} .
                        docker push \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                container('maven') {
                    sh """
                        # Inject build number into K8s manifest
                        sed -i 's|IMAGE_TAG|\${BUILD_NUMBER}|g' k8s/deployment.yaml

                        # Apply to Kubernetes
                        kubectl apply -f k8s/deployment.yaml -n \${K8S_NAMESPACE}

                        # Wait for rollout to complete before running smoke tests
                        kubectl rollout status deployment/my-app -n \${K8S_NAMESPACE}
                    """
                }
            }
        }

        stage('Smoke Test') {
            steps {
                container('maven') {
                    sh """
                        kubectl wait --for=condition=ready pod -l app=my-app \\
                          -n \${K8S_NAMESPACE} --timeout=120s
                        mvn test -Dtest=SmokeTest -DbaseUrl=http://my-app-service
                    """
                }
            }
        }
    }

    post {
        failure {
            // Auto-rollback on failure — like a transaction rollback in Java
            sh 'kubectl rollout undo deployment/my-app -n \${K8S_NAMESPACE}'
        }
    }
}`,
          },
          { type: 'heading', text: 'Kafka ↔ Kubernetes: Strimzi Operator' },
          {
            type: 'text',
            content: 'Running Kafka on Kubernetes requires an Operator — a custom K8s controller that understands Kafka. Strimzi is the most popular open-source Kafka operator. You declare a Kafka custom resource and Strimzi creates all pods, services, and ConfigMaps automatically. Like a Spring @Configuration class but for K8s.',
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Strimzi: deploy a 3-node Kafka cluster on K8s',
            code: `# 1. Install Strimzi operator
kubectl create namespace kafka
kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka' -n kafka
kubectl wait deployment/strimzi-cluster-operator -n kafka --for=condition=available --timeout=120s

# 2. Create a Kafka cluster as a K8s Custom Resource
cat << 'EOF' | kubectl apply -f - -n kafka
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: my-cluster
spec:
  kafka:
    version: 3.6.0
    replicas: 3
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
    storage:
      type: ephemeral
  zookeeper:
    replicas: 3
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
EOF

# 3. Wait for Kafka pods to start
kubectl get pods -n kafka -w
# my-cluster-kafka-0    Running
# my-cluster-kafka-1    Running
# my-cluster-kafka-2    Running
# my-cluster-zookeeper-0  Running  (x3)

# 4. Create a topic as K8s resource (no kafka-topics.sh needed!)
cat << 'EOF' | kubectl apply -f - -n kafka
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: orders
  labels:
    strimzi.io/cluster: my-cluster
spec:
  partitions: 3
  replicas: 3
EOF`,
          },
          { type: 'heading', text: 'Helm: Kubernetes Package Manager' },
          {
            type: 'simple-box',
            emoji: '⚓',
            content: 'Helm is like Maven/Gradle for Kubernetes. Instead of writing 10 YAML files to deploy Prometheus monitoring, you run: helm install monitoring prometheus-community/kube-prometheus-stack and it handles everything. A Helm Chart is a pre-packaged K8s application — like a Maven dependency but for infrastructure.',
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Helm — install complex K8s apps in one command',
            code: `# Install Helm
# Mac:     brew install helm
# Windows: choco install kubernetes-helm
# Linux:   curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

helm version  # Verify: version.BuildInfo{Version:"v3.14.x"}

# Add chart repositories
helm repo add stable             https://charts.helm.sh/stable
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add ingress-nginx      https://kubernetes.github.io/ingress-nginx
helm repo update

# Install Prometheus + Grafana monitoring stack (replaces 500+ lines of YAML)
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace

# Install Nginx Ingress Controller
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace

# List installed charts
helm list --all-namespaces

# Upgrade (update) a chart
helm upgrade monitoring prometheus-community/kube-prometheus-stack -n monitoring

# Uninstall
helm uninstall monitoring -n monitoring`,
          },
          { type: 'heading', text: 'Prometheus + Grafana: Monitoring on K8s' },
          {
            type: 'table',
            headers: ['Tool', 'Role', 'What It Does'],
            rows: [
              ['Prometheus', 'Metrics collector', 'Scrapes CPU/memory/request metrics from all pods every 15s'],
              ['Grafana', 'Visualization', 'Dashboards showing pod health, request rates, error rates'],
              ['Alertmanager', 'Alerting', 'Sends Slack/email when pod crashes or CPU > 80%'],
              ['Loki', 'Log aggregation', 'Centralized log storage for all pods (like ELK Stack)'],
              ['Jaeger / Tempo', 'Distributed tracing', 'Trace a request across 10 microservices end-to-end'],
            ],
          },
          { type: 'heading', text: 'The Complete Modern DevOps Stack' },
          {
            type: 'visual',
            variant: 'pyramid',
            title: 'From Code to Production — Technology Stack',
            levels: [
              { label: 'Code + Tests', desc: 'Java/Spring Boot + JUnit/Playwright', color: 'blue' },
              { label: 'Docker Image', desc: 'Dockerfile → container image', color: 'indigo' },
              { label: 'Jenkins Pipeline', desc: 'Build → Test → Push → Deploy', color: 'orange' },
              { label: 'Kubernetes', desc: 'Run, scale, self-heal in production', color: 'violet' },
              { label: 'Kafka Events', desc: 'Microservice async communication', color: 'orange' },
              { label: 'Prometheus + Grafana', desc: 'Monitor, alert, dashboard', color: 'green' },
            ],
          },
          {
            type: 'quiz',
            question: 'Modern Kubernetes clusters run containers using containerd rather than the Docker Engine directly. Why?',
            options: [
              { id: 'a', text: 'containerd is faster at building images' },
              { id: 'b', text: 'Kubernetes only needs a lightweight runtime that implements the Container Runtime Interface (CRI); Docker Engine bundles extra tooling (build, compose, CLI) that Kubernetes does not need' },
              { id: 'c', text: 'Docker images are incompatible with Kubernetes' },
              { id: 'd', text: 'containerd is required to write YAML manifests' },
            ],
            correct: 'b',
            explanation: "Kubernetes only needs to pull and run OCI-compliant container images — it talks to the runtime through the CRI (Container Runtime Interface). containerd is a lean runtime that implements CRI directly, while the full Docker Engine bundles extra tooling (the build pipeline, Compose, the docker CLI) that a cluster node has no use for. Images built with `docker build` still run fine — Docker images are OCI-compatible — only the underlying daemon used to RUN them changed.",
            retryQuestion: {
              question: 'A developer builds an image with `docker build` on their laptop and pushes it to a registry. Will a Kubernetes cluster running containerd (not Docker Engine) be able to run that image?',
              options: [
                { id: 'a', text: 'No, containerd can only run images built with its own tooling' },
                { id: 'b', text: 'Yes — the image is OCI-compliant, and containerd (or any CRI-compliant runtime) can run any OCI image regardless of what tool built it' },
                { id: 'c', text: 'Only if the cluster also has Docker Engine installed alongside containerd' },
                { id: 'd', text: 'Only if the image is rebuilt directly inside the cluster' },
              ],
              correct: 'b',
              explanation: 'Docker images are built to the OCI (Open Container Initiative) image spec — a standard that any OCI-compliant runtime, including containerd, can read and run. The build tool (`docker build`, `buildah`, `kaniko`, etc.) is completely separate from the runtime that executes the image later. This is exactly why moving from Docker Engine to containerd on cluster nodes did not require anyone to change how their images are built.',
            },
          },
        ],
      },

      // ── SECTION 7: REAL WORLD ──────────────────────────────────────────────
      {
        title: '🛠️ Real-World Kubernetes — Hands-On',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚀',
            content: 'This section walks you through a complete real-world scenario: deploying a Spring Boot REST API to Kubernetes from scratch. Follow every command step-by-step. By the end you will have a running, scaled, production-grade deployment — not just theory.',
          },
          { type: 'heading', text: 'Scenario: Deploy Spring Boot App to Kubernetes' },
          {
            type: 'steps',
            items: [
              'Create a Spring Boot app (or use any existing JAR)',
              'Write a Dockerfile to containerize it',
              'Build and push the Docker image to a registry',
              'Write Kubernetes YAML: Deployment + Service + HPA',
              'Deploy to minikube and verify it works',
              'Scale up and test self-healing',
              'Perform a rolling update to new version',
            ],
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Step 1-2: Create Spring Boot app and Dockerfile',
            code: `# Generate project: go to start.spring.io → Download → extract
# Or use this minimal Dockerfile for ANY Spring Boot app:

cat > Dockerfile << 'EOF'
# Multi-stage build — smaller final image (Java analogy: like shade plugin)
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN ./mvnw dependency:resolve   # Cache dependencies layer
COPY src ./src
RUN ./mvnw package -DskipTests  # Build JAR

FROM eclipse-temurin:17-jre-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
EOF`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Step 3: Build image and load into minikube',
            code: `# Build the Docker image
docker build -t my-spring-app:v1 .

# OPTION A: Use minikube's Docker daemon directly (no registry needed!)
eval $(minikube docker-env)   # Mac/Linux — point Docker CLI at minikube
# Windows PowerShell: minikube docker-env | Invoke-Expression
docker build -t my-spring-app:v1 .
# Now the image is inside minikube — use imagePullPolicy: Never in YAML

# OPTION B: Push to Docker Hub
docker tag my-spring-app:v1 yourdockeruser/my-spring-app:v1
docker push yourdockeruser/my-spring-app:v1`,
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Step 4: Kubernetes manifests (deployment.yaml)',
            code: `# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-app
  labels:
    app: spring-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: spring-app
  template:
    metadata:
      labels:
        app: spring-app
    spec:
      containers:
      - name: spring-app
        image: my-spring-app:v1
        imagePullPolicy: Never   # Use local image (minikube option A)
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 20
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "kubernetes"
---
apiVersion: v1
kind: Service
metadata:
  name: spring-app-service
spec:
  selector:
    app: spring-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: NodePort
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: spring-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: spring-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Step 5-7: Deploy, verify, scale, rolling update',
            code: `# Deploy everything
kubectl apply -f k8s/

# Watch pods start up
kubectl get pods -w
# spring-app-xxxx-yyy   0/1   ContainerCreating   → Running

# Get the URL to access the app
minikube service spring-app-service --url
# http://192.168.49.2:31234  ← open in browser or curl

# Test the app
curl http://$(minikube service spring-app-service --url)/actuator/health
# {"status":"UP"}

# Test self-healing — delete a pod and watch K8s recreate it
kubectl delete pod spring-app-xxxx-yyy
kubectl get pods -w   # New pod appears automatically in seconds

# Scale manually
kubectl scale deployment spring-app --replicas=5
kubectl get pods      # Now shows 5 pods

# Rolling update to v2 (zero downtime)
docker build -t my-spring-app:v2 .
kubectl set image deployment/spring-app spring-app=my-spring-app:v2
kubectl rollout status deployment/spring-app
# Waiting for deployment "spring-app" rollout to finish: 1 out of 2 new replicas have been updated...
# deployment "spring-app" successfully rolled out

# Rollback to v1 if something went wrong
kubectl rollout undo deployment/spring-app
kubectl rollout history deployment/spring-app  # Show all revisions`,
          },
          { type: 'heading', text: 'Common Errors & Solutions' },
          {
            type: 'error-dictionary',
            errors: [
              {
                error: 'CrashLoopBackOff',
                cause: 'Container starts but immediately exits. Usually: app startup error, wrong env var, missing config, or health check fails.',
                solution:'kubectl logs pod-name --previous  (see crash logs)\nkubectl describe pod pod-name  (see events and exit codes)\nCheck: app startup logs for stack traces, correct environment variables, database connection strings.',
              },
              {
                error: 'ImagePullBackOff / ErrImagePull',
                cause: 'K8s cannot pull the container image. Wrong image name, wrong tag, or registry authentication missing.',
                solution:'kubectl describe pod pod-name  (see exact error)\nCheck: image name in YAML matches registry exactly\nCreate imagePullSecret for private registries:\nkubectl create secret docker-registry regcred --docker-server=REGISTRY --docker-username=USER --docker-password=PASS',
              },
              {
                error: 'Pending (pod stuck)',
                cause: 'Scheduler cannot place pod on any node. Causes: insufficient CPU/memory, node taints, PVC not bound, node selector mismatch.',
                solution:'kubectl describe pod pod-name  (look at Events section)\nkubectl get nodes  (check node capacity)\nkubectl describe node node-name  (check Allocatable vs Requests)\nFor local minikube: minikube start --cpus=4 --memory=8192',
              },
              {
                error: 'OOMKilled (exit code 137)',
                cause: 'Container used more memory than its limit. The kernel killed it.',
                solution:'Increase memory limit in YAML:\nresources:\n  limits:\n    memory: "1Gi"  # Increase from 512Mi\nOr fix memory leak in application code.',
              },
              {
                error: 'connection refused / no endpoints available',
                cause: 'Service cannot reach pods. Pod readiness probe failing, wrong selector labels, or pods not ready.',
                solution:'kubectl get endpoints service-name  (should list pod IPs)\nkubectl describe svc service-name  (check selector labels)\nEnsure pod labels match service selector exactly.\nkubectl get pods -l app=spring-app  (test selector)',
              },
            ],
          },
          { type: 'heading', text: 'QA Engineer: K8s Test Checklist' },
          {
            type: 'list',
            items: [
              '✅ Health check endpoints return 200 (readiness + liveness probes)',
              '✅ Rolling update completes without downtime (run load test during update)',
              '✅ Pod auto-restarts after crash (kubectl delete pod and observe)',
              '✅ HPA scales out under load (use k6 or JMeter to generate traffic)',
              '✅ Resource limits prevent OOMKill (test with memory-intensive requests)',
              '✅ Secrets not exposed in pod env or logs (grep for passwords in kubectl describe)',
              '✅ ConfigMaps updated without pod restart (hot reload works)',
              '✅ Service returns 502/503 (not errors) during rolling update',
            ],
          },
          {
            type: 'quiz',
            question: 'A pod is stuck in CrashLoopBackOff. What is the right first command to diagnose why?',
            options: [
              { id: 'a', text: 'kubectl delete pod <name> immediately' },
              { id: 'b', text: 'kubectl logs <pod-name> --previous' },
              { id: 'c', text: 'kubectl get nodes' },
              { id: 'd', text: 'kubectl create secret docker-registry' },
            ],
            correct: 'b',
            explanation: 'CrashLoopBackOff means the container starts and then immediately exits, repeatedly. The crashed container\'s logs are gone the moment a new one starts, so `kubectl logs <pod-name> --previous` retrieves the logs from the LAST crashed instance — usually showing the actual startup exception, missing env variable, or failed health check that caused the crash. Deleting the pod just restarts the same broken container without diagnosing anything.',
            retryQuestion: {
              question: '`kubectl logs <pod-name> --previous` shows nothing useful — just an empty log. What is a likely next diagnostic step for a CrashLoopBackOff?',
              options: [
                { id: 'a', text: 'Immediately delete and recreate the entire cluster' },
                { id: 'b', text: 'Run `kubectl describe pod <pod-name>` to check the Events section for scheduling, image pull, or resource issues that happen before the container logs anything' },
                { id: 'c', text: 'Assume the application code is fine and ignore the crash' },
                { id: 'd', text: 'Increase the number of replicas to work around the crash' },
              ],
              correct: 'b',
              explanation: 'If `--previous` logs are empty, the crash is likely happening before the application even gets to log anything (e.g. a failed image pull, a missing ConfigMap/Secret mount, or a failed liveness probe killing it too early). `kubectl describe pod` surfaces these pre-application-log events in its Events section, which `kubectl logs` cannot show at all.',
            },
          },
        ],
      },

      // ── SECTION 8: INTERVIEW Q&A ────────────────────────────────────────────
      {
        title: '💼 Kubernetes Interview Q&A',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Kubernetes',
            questions: [
              {
                level: 'basic',
                q: 'What is Kubernetes and why is it needed?',
                a: 'Kubernetes (K8s) is an open-source container orchestration platform originally developed by Google. It automates deployment, scaling, self-healing, and management of containerized applications across a cluster of machines. It\'s needed because managing hundreds of Docker containers manually is impossible — K8s handles placement, scaling, failover, and rolling updates automatically.',
              },
              {
                level: 'basic',
                q: 'What is a Pod in Kubernetes?',
                a: 'A Pod is the smallest deployable unit in K8s. It wraps one or more containers that share the same network namespace (same IP, same ports) and storage volumes. Containers in the same pod communicate via localhost. Pods are ephemeral — they can be killed and restarted at any time. This is why you never use pod IPs directly; use Services instead.',
              },
              {
                level: 'basic',
                q: 'Difference between Deployment and Pod?',
                a: 'A Pod is a single running instance of a container. A Deployment is a controller that manages a ReplicaSet, which ensures a specified number of pod replicas are always running. Deployments also handle rolling updates and rollbacks. In practice, you never create pods directly — always use Deployments (or StatefulSets for stateful apps).',
              },
              {
                level: 'basic',
                q: 'What are the 4 default Kubernetes namespaces?',
                a: '1) default — where resources go if no namespace is specified, 2) kube-system — K8s system components (CoreDNS, kube-proxy, metrics-server), 3) kube-public — readable by all users (unauthenticated), 4) kube-node-lease — Node heartbeat leases for determining node health.',
              },
              {
                level: 'intermediate',
                q: 'Explain the Kubernetes control loop / reconciliation loop',
                a: 'Kubernetes controllers operate on a "desired state vs actual state" loop. You declare desired state in a manifest (e.g., "3 replicas of my-app"). The controller watches actual state (current pods). If actual != desired, it takes action to reconcile: if 2 pods are running and desired is 3, it creates a new pod. This happens continuously — it\'s how K8s achieves self-healing.',
              },
              {
                level: 'intermediate',
                q: 'What is the difference between livenessProbe and readinessProbe?',
                a: 'livenessProbe: Checks if the container is alive. If it fails, K8s restarts the container. Use for deadlock detection (app is running but frozen). readinessProbe: Checks if the container is ready to receive traffic. If it fails, K8s removes the pod from Service endpoints (stops routing traffic to it). Use for apps that need warm-up time. A pod can be live but not ready — it stays alive but gets no traffic.',
              },
              {
                level: 'intermediate',
                q: 'What is etcd and why is it critical?',
                a: 'etcd is a distributed, consistent key-value store that is the single source of truth for all K8s cluster state. It stores: all resource definitions (pods, services, deployments), configuration data, cluster state, and auth credentials. If etcd data is lost, the cluster state is lost. Best practices: always run etcd in a HA (high availability) setup with 3+ nodes, and back it up regularly.',
              },
              {
                level: 'intermediate',
                q: 'How does a Service find which pods to route traffic to?',
                a: 'Services use Label Selectors. The Service spec defines a selector like "app: my-app". K8s continuously watches for pods matching this label and maintains an Endpoints object listing their IPs. When a request hits the Service, kube-proxy uses iptables/IPVS rules to route to one of the endpoint IPs using round-robin by default. When a pod dies, it\'s removed from endpoints automatically.',
              },
              {
                level: 'advanced',
                q: 'How does a Rolling Update work, and what do maxSurge and maxUnavailable mean?',
                a: 'A rolling update replaces old pods with new ones gradually. maxSurge: how many extra pods above the desired count can exist during the update (e.g., 1 means K8s can temporarily have replicas+1 pods running). maxUnavailable: how many pods can be unavailable at once (e.g., 0 means zero downtime — always keep full capacity). K8s creates 1 new pod, waits for it to pass readinessProbe, then removes 1 old pod, repeating until all are updated.',
              },
              {
                level: 'advanced',
                q: 'What is the difference between ConfigMap and Secret? Are Secrets encrypted?',
                a: 'ConfigMap: stores non-sensitive key-value config (URLs, feature flags). Plain text in etcd. Secret: stores sensitive data (passwords, tokens, certs). Base64-encoded in etcd, NOT encrypted by default. Base64 is just encoding, not encryption — anyone with etcd access can decode it. For real security: 1) Enable Encryption at Rest in the API server config, 2) Use external secret managers (HashiCorp Vault, AWS Secrets Manager) with CSI driver. Apply RBAC to restrict who can read secrets.',
              },
              // ── BASIC (extra) ──────────────────────────────────
              { level: 'basic', q: 'A test pod is stuck and you need to find out why before it even gets to logs. What kubectl commands form your standard first-look workflow?', a: 'kubectl get pods shows the pod\'s current STATUS column (Pending, CrashLoopBackOff, ImagePullBackOff, Running) which already narrows the problem category. kubectl describe pod <name> shows the Events section at the bottom — usually the fastest way to see WHY a pod is stuck (failed scheduling, image pull error, failed mount) before even checking logs. Only once the pod is actually running do kubectl logs <name> (and --previous for a crashed container\'s last run) become useful — checking logs on a pod that never started wastes debugging time on the wrong layer.' },
              { level: 'basic', q: 'A pod shows status CrashLoopBackOff. What does this status actually mean, and what\'s your first diagnostic step?', a: 'CrashLoopBackOff means the container starts, crashes, and Kubernetes retries with an exponential backoff delay — it is NOT a scheduling problem, the container itself fails after it starts running. The first step is kubectl logs <pod-name> (and --previous if the current attempt hasn\'t produced output yet) to see the actual error — common causes are a missing env variable, a failed startup health check, or a missing dependency/config file. Restarting without reading logs first just restarts the same crash loop — the fix is almost always in the application or its config, not Kubernetes itself.' },
              { level: 'basic', q: 'Your team runs the same test suite against dev, staging, and a shared QA cluster, and resources keep colliding because everyone names things "app" and "db". How does Kubernetes help isolate these without separate clusters?', a: 'Namespaces partition a single cluster into logically isolated resource groups — a Deployment named "app" in qa is a completely different object from one named "app" in staging, and by default they can\'t see or affect each other by name. This lets environments share one cluster\'s compute while keeping naming, RBAC, and resource quotas independently scoped per namespace. It\'s far cheaper than a separate cluster per environment, though noisy-neighbor contention is still possible unless ResourceQuotas are also configured per namespace.' },
              { level: 'basic', q: 'You need to expose a test app: once just for other pods inside the cluster to reach, and once for your local browser to hit from outside during manual QA. Which two Service types fit each case?', a: 'ClusterIP (the default) gives a stable internal IP/DNS reachable only from inside the cluster — perfect for one pod talking to another without external exposure. NodePort opens a specific port (30000-32767) on every node, reachable from outside via <any-node-ip>:<nodeport> — a quick way to manually poke a service from your laptop during debugging, though LoadBalancer or Ingress are the production-grade options for real external traffic.' },
              { level: 'basic', q: 'A test is failing only inside the cluster, and you want to run a command inside the actual running container to inspect its state without redeploying. What\'s the command, and what\'s the catch if the container has crashed?', a: 'kubectl exec -it <pod-name> -- bash opens an interactive shell inside the container\'s running process namespace — the Kubernetes equivalent of docker exec. The catch: exec only works on a RUNNING container; if the pod already crashed (CrashLoopBackOff), there\'s nothing to exec into during the crash window, so you fall back to kubectl logs --previous, or temporarily override the container\'s command to sleep so it stays alive long enough to investigate.' },
              { level: 'basic', q: 'Your cluster has 50 pods across 5 apps, and you need to quickly find just the pods belonging to the "checkout" service. How do labels make this practical?', a: 'Labels are arbitrary key-value pairs on resources (app: checkout, env: qa), and kubectl get pods -l app=checkout filters to matching pods instantly instead of scrolling through all 50. This same mechanism is what Services, Deployments, and NetworkPolicies use internally — a Service\'s selector matching app: checkout is the same label-matching kubectl uses for filtering. A consistent labeling convention (app, env, version, team) pays off constantly during debugging.' },
              { level: 'basic', q: 'You create a Deployment, and kubectl get all shows both a Deployment AND a ReplicaSet, even though you never created the ReplicaSet directly. What\'s the relationship, and why does this layering exist?', a: 'A Deployment manages a ReplicaSet, which is the object that actually ensures N pod replicas exist; the Deployment manages ReplicaSets over time (creating a new one during a rolling update, scaling the old one down). This layering makes rollbacks easy: a previous ReplicaSet isn\'t deleted immediately, so kubectl rollout undo can scale it back up. You almost never interact with ReplicaSets directly — similar to rarely managing a connection pool\'s internals when using a higher-level client.' },
              { level: 'basic', q: 'A test pod with no resource requests/limits starves a neighboring pod of CPU on the same node during a load test. What should have been configured, and what\'s the difference between requests and limits?', a: 'requests declare the MINIMUM resources guaranteed when scheduling (used to pick a node with room); limits declare the MAXIMUM allowed before being throttled (CPU) or killed (memory, OOMKilled). Without them, a pod can consume unbounded resources, starving neighbors — exactly the symptom described. Setting resources: { requests: {...}, limits: {...} } on every test pod ensures fair scheduling and caps worst-case consumption, mandatory hygiene on any shared cluster.' },
              { level: 'basic', q: 'Two engineers run kubectl create -f deployment.yaml vs kubectl apply -f deployment.yaml against slightly different versions of the same file. What\'s the practical difference, and why does almost every team standardize on one?', a: 'kubectl create is imperative — it fails outright if the resource already exists. kubectl apply is declarative — it diffs the file against live cluster state and patches only what changed, so re-running it with an updated file is the normal workflow (and creates the resource on first run). Teams standardize on apply because CI/CD pipelines need idempotent re-runs — the same command should work whether the resource exists or not, which create doesn\'t support.' },
              { level: 'basic', q: 'You run kubectl delete pod <name> on a pod from a 3-replica Deployment, expecting to permanently remove an instance. What actually happens a few seconds later, and why?', a: 'A new pod is automatically created to replace it, because the ReplicaSet controller continuously reconciles actual pod count against the desired count (3) — deleting just drops the count to 2 momentarily, immediately corrected by creating a replacement. To permanently reduce count, change the desired state: kubectl scale deployment <name> --replicas=2. This trips up engineers new to a "delete the server" mental model — deleting one instance of a desired-state-managed resource is rarely the right lever.' },
              { level: 'basic', q: 'You apply a NetworkPolicy scoped to the qa namespace but get confused why a ClusterRole can\'t be similarly scoped. What\'s the underlying distinction?', a: 'Some resources are namespace-scoped (Pods, Services, Deployments, NetworkPolicies — live inside one namespace, need -n to target), others are cluster-scoped (Nodes, PersistentVolumes, ClusterRoles, Namespaces themselves — exist globally, -n has no effect). A ClusterRole is intentionally cluster-scoped because it defines a reusable permission set bound (via RoleBinding) to specific namespaces later — the role definition isn\'t "in" a namespace, but its usage can be scoped. kubectl api-resources --namespaced=true/false lists which type falls into each category.' },
              // ── INTERMEDIATE (extra) ────────────────────────────
              { level: 'intermediate', q: 'A pod shows ImagePullBackOff instead of CrashLoopBackOff. How is this different from a crashing application, and what are common root causes?', a: 'ImagePullBackOff means Kubernetes can\'t even download the image to start it — the app never runs, so it\'s purely an infrastructure/registry problem, not an app bug. Common causes: typo in image name/tag, the image genuinely doesn\'t exist at that tag, missing/incorrect imagePullSecrets for a private registry, or the node lacking network access to the registry. kubectl describe pod shows the exact pull error in Events ("manifest unknown" vs "unauthorized" vs "no route to host"), immediately telling you whether it\'s a typo, an auth problem, or a network problem.' },
              { level: 'intermediate', q: 'You update a ConfigMap mounted as a volume, expecting the app to pick up new config, but env variables sourced from the same ConfigMap never update even after the file changes. Why the inconsistency?', a: 'A ConfigMap mounted as a VOLUME is automatically synced to the pod by the kubelet (with a propagation delay) — the file does update, IF the app watches it and reloads. A ConfigMap referenced as an ENV VARIABLE is injected exactly once, at container START time — changing the ConfigMap afterward has zero effect on already-running containers. For hot-reloadable config, mount as a volume and watch the file; for config that\'s fine to take effect only on restart, env vars are simpler but require a rollout restart.' },
              { level: 'intermediate', q: 'Your test environment runs a fixed 3 replicas regardless of load, and load tests show degrading response times only during the heaviest scenarios. How would an HPA change this, and what does it actually watch?', a: 'An HPA watches a metric (CPU/memory via Metrics Server, or custom metrics) and automatically adjusts replica count between a configured min/max to keep that metric near target. During a heavy load scenario, if CPU exceeds the threshold, the HPA scales up replicas to absorb load — exactly what production would do under real spikes. For QA, load tests against a fixed-replica environment may show artificially worse degradation than production actually experiences — testing against an HPA-enabled environment gives a more representative picture.' },
              { level: 'intermediate', q: 'A pod needs to wait for a database migration before its main container starts, but you don\'t want that wait logic baked into the app\'s own startup code. What Kubernetes feature fits this?', a: 'Init containers run sequentially BEFORE main containers start, each completing successfully before the next begins — perfect for "wait for the DB" or "run a migration" setup, kept separate from app code. Define them under initContainers: in the pod spec while containers: holds the actual app. This keeps the app image focused on running the app, while environment-specific setup lives in a swappable init container — useful when the same image needs different setup in different environments.' },
              { level: 'intermediate', q: 'Test data needs to survive pod restarts and rescheduling, but a teammate used a plain emptyDir volume and is confused why data disappeared after a node failure moved the pod. What\'s the distinction between PersistentVolume and PersistentVolumeClaim, and what should they have used?', a: 'emptyDir is tied to the POD\'s lifecycle on a specific node — when the pod is deleted or rescheduled, that storage is gone. A PersistentVolume (PV) is actual storage provisioned independent of any pod\'s lifecycle; a PersistentVolumeClaim (PVC) is a pod\'s REQUEST to bind to a PV matching criteria — that storage survives pod deletion entirely. The fix is a PVC-backed volume instead of emptyDir; for genuinely disposable scratch space, emptyDir remains the correct choice.' },
              { level: 'intermediate', q: 'A teammate proposes a Deployment for a test PostgreSQL instance needing stable network identity and dedicated storage per replica. Why would a StatefulSet be more correct?', a: 'A Deployment treats replicas as interchangeable — random pod names, any replica deletable without consequence, great for stateless apps but breaks assumptions databases often make. A StatefulSet gives each replica a stable name (postgres-0, postgres-1) and a stable PVC that follows that ordinal across rescheduling — postgres-0 always gets back ITS OWN volume. Rule of thumb: stateless, identical replicas → Deployment; ordered, individually-addressable replicas with per-instance storage → StatefulSet.' },
              { level: 'intermediate', q: 'A few nodes have GPUs reserved for ML workloads, and you need regular test pods to never land there, AND ML pods to never land on regular nodes lacking GPUs. What scheduling features solve this two-way constraint?', a: 'Taints on GPU nodes repel pods without a matching toleration — regular test pods, having none, simply can\'t be scheduled there, solving "keep test pods OFF GPU nodes." For the other direction, add nodeAffinity (or nodeSelector) to the ML pod spec requiring a label only GPU nodes have. Taints/tolerations REPEL pods from nodes by default; affinity ATTRACTS/requires pods toward specific nodes — most real constraints need both together.' },
              { level: 'intermediate', q: 'You need to manually hit a service inside a remote QA cluster from your local machine, without exposing it externally just for a five-minute investigation. What\'s the quick way?', a: 'kubectl port-forward svc/my-service 8080:80 creates a temporary tunnel from localhost:8080 directly to port 80 on the service inside the cluster, lasting only as long as the command runs — no configuration changes, nothing to clean up beyond Ctrl+C. Ideal for quick debugging where a real Ingress/LoadBalancer would be excessive ceremony. The same works against a specific pod (kubectl port-forward pod/my-pod 8080:8080) to bypass the Service entirely.' },
              { level: 'intermediate', q: 'Your QA team wants to run a Selenium Grid (hub + browser nodes) inside the same cluster as the app under test, rather than as standalone Docker containers. What Kubernetes-specific considerations come up?', a: 'The hub becomes a Deployment + Service reachable via a stable DNS name (selenium-hub.qa.svc.cluster.local), and browser nodes become a separate Deployment independently scalable via kubectl scale deployment chrome-node --replicas=10, or even HPA on a custom queue-depth metric. Resource requests/limits become mandatory per browser node (Chrome is memory-hungry) to prevent one heavy run from starving other pods on the same node. The tradeoff versus standalone Docker is added manifest complexity in exchange for elastic scaling and sharing infrastructure with the rest of the cluster.' },
              { level: 'intermediate', q: 'You need a logging/monitoring agent on every single node, including ones added later by autoscaling, without manually deploying it to each new node. What resource fits this "one per node" pattern?', a: 'A DaemonSet ensures exactly one pod copy runs on every node (or a labeled subset) automatically — when the cluster autoscaler adds a node, the DaemonSet controller schedules a copy there too, zero manual intervention. Log collectors, metrics agents, and CNI plugins typically run as DaemonSets rather than Deployments, since their purpose is "be present on every node," which a Deployment with replicas=node-count would not automatically track as node count changes.' },
              { level: 'intermediate', q: 'You need a one-time database migration to run once, and separately a nightly regression suite to run automatically at 2am. What two resources fit these needs, and how do they differ?', a: 'A Job runs a pod to completion exactly once, considered done once it exits successfully — perfect for the one-time migration. A CronJob wraps a Job with a cron schedule ("0 2 * * *"), automatically creating a new Job instance each scheduled time — exactly what the nightly suite needs. Using CronJob for the migration would need manual deletion to avoid retriggering; using a plain Job for the suite means reinventing scheduling Kubernetes already provides.' },
              { level: 'intermediate', q: 'Your platform team wants to drain and reboot nodes for patching during business hours, but QA worries this kills multiple test environment replicas simultaneously and breaks in-flight runs. What safeguard addresses this?', a: 'A PodDisruptionBudget (PDB) declares "at least N pods must remain running" for a set of pods, and kubectl drain respects this — refusing to evict a pod if it would violate the budget, pausing the drain on that pod until safe. This only protects VOLUNTARY disruptions (planned maintenance) — not involuntary ones (an unexpected crash), since no graceful negotiation is possible there. A PDB with minAvailable: 2 on a 3-replica test environment ensures maintenance never takes down more than 1 replica at a time.' },
              { level: 'intermediate', q: 'A team\'s test suite occasionally spins up dozens of throwaway pods and exhausts memory for the entire shared QA cluster, starving other teams\' namespaces. How do you prevent one namespace from doing this?', a: 'A ResourceQuota, applied per namespace, caps the TOTAL resources (CPU, memory, pod count) that namespace can consume across all its pods combined — e.g., requests.memory: 16Gi as a hard ceiling, regardless of how many pods they try to create. Once a namespace hits quota, new pod creation fails with a clear error rather than silently degrading everyone else. Per-pod limits cap what ONE pod can do; ResourceQuotas cap what an entire namespace/team can do in aggregate.' },
              { level: 'intermediate', q: 'A pod crashed and restarted, and you need logs from the PREVIOUS crashed attempt, not the current restart\'s (too new to show the real error). What flag gets you this?', a: 'kubectl logs <pod-name> --previous fetches logs from the immediately prior container instance, before its last restart — essential when a container crashes, restarts, and the current attempt hasn\'t reproduced the error yet, since plain kubectl logs only shows the CURRENT post-restart output. This is one of the most-missed debugging steps: looking at logs right after CrashLoopBackOff often shows nothing useful because the new attempt just started, while --previous has the actual crash evidence.' },
              { level: 'intermediate', q: 'You have 5 test applications, each needing its own subdomain, but provisioning a separate cloud LoadBalancer per application is expensive and slow. How does Ingress solve this with a single entry point?', a: 'An Ingress resource defines HTTP routing rules (by hostname/path) that route traffic to the correct backend Service, through a SINGLE Ingress Controller and typically one LoadBalancer in front — host: app-a.qa.internal routes to app-a\'s Service, host: app-b.qa.internal routes to app-b\'s, sharing one entry point instead of five. This is significantly cheaper than a LoadBalancer per app, and centralizes TLS termination and path-based routing in one place.' },
              { level: 'intermediate', q: 'Your team manually maintains 15 nearly-identical YAML files for deploying the same app to dev/qa/staging with slightly different settings, and keeping them in sync by hand is error-prone. What does Helm add on top of plain kubectl apply?', a: 'Helm packages manifests as a "chart" with templated values (replica count, resource limits, image tag become {{ .Values.x }} placeholders), and a values.yaml per environment supplies the specific numbers — helm install myapp ./chart -f values-qa.yaml renders and applies the full set with QA\'s settings, eliminating 15 near-duplicate files for one chart plus 3 small values files. Helm also tracks releases as first-class objects (helm rollback reverts an entire multi-resource release in one command), which plain kubectl apply has no equivalent for.' },
              // ── ADVANCED (extra) ────────────────────────────────
              { level: 'advanced', q: 'A production pod gets killed and restarted repeatedly with status OOMKilled, but application logs show no error right before the kill — they just stop abruptly. How do you confirm this is a memory limit issue and right-size the fix?', a: 'kubectl describe pod shows Last State "Terminated, Reason: OOMKilled" with Exit Code 137 — confirming the kubelet enforced the memory LIMIT, not an app crash, which is why logs show nothing: the process was killed externally by the kernel\'s OOM mechanism. To right-size, check historical usage via kubectl top pod or Prometheus/Grafana over a window including peak load, then set the limit comfortably above observed peak (not average) — too close to peak just delays the next OOMKill instead of fixing the headroom problem.' },
              { level: 'advanced', q: 'Security wants the "checkout" microservice to only accept traffic from "frontend" and "api-gateway" pods, rejecting every other pod including ones in other namespaces. How do you enforce this at the networking layer?', a: 'A NetworkPolicy with a podSelector matching checkout\'s pods and an ingress rule allowing traffic only from pods matching specific labels — by default, without ANY NetworkPolicy, all pods can reach all others regardless of namespace, so this policy is what actually introduces the restriction. NetworkPolicies require a CNI plugin supporting enforcement (Calico, Cilium — not all do; flannel\'s default mode notably doesn\'t), so a correct YAML accomplishes nothing if the plugin silently ignores it. This is defense-in-depth alongside, not instead of, application-level auth.' },
              { level: 'advanced', q: 'Your team wants zero-downtime deployments, but a rolling update still occasionally causes a brief 502 spike even with readinessProbe configured. What\'s commonly missing, and how does it combine with readinessProbe and PDB?', a: 'readinessProbe alone has a gap: a pod can pass readiness instantly but still need a few seconds to warm up, and if the OLD pod is torn down before the load balancer fully stops routing to it (a propagation delay), requests can briefly hit a pod that\'s already shutting down. The fix combines a preStop hook with a brief sleep, terminationGracePeriodSeconds tuned for in-flight requests, AND a PodDisruptionBudget ensuring enough old pods stay up during transition. True zero-downtime is readiness + graceful shutdown timing + disruption budgets together — no single mechanism alone closes the gap.' },
              { level: 'advanced', q: 'Your company considers running QA test workloads across two separate Kubernetes clusters (one per region) for resilience testing. What operational complexity does multi-cluster testing introduce that single-cluster QA doesn\'t have?', a: 'Cross-cluster service discovery becomes non-trivial — a test runner in cluster A reaching a service in cluster B needs a multi-cluster service mesh (Istio, Linkerd) or manually exposed endpoints, since Kubernetes\' DNS-based discovery is cluster-local by default. Configuration drift becomes real risk: two clusters\' versions and CRDs can silently diverge unless managed with the same IaC source applied identically to both. Test result aggregation also needs rethinking — a suite running partially against each cluster needs unified reporting, or failures in one cluster get missed.' },
              { level: 'advanced', q: 'Pods intermittently fail to resolve internal service DNS names, with the same request succeeding on retry seconds later. How do you diagnose CoreDNS problem versus application networking problem?', a: 'Check CoreDNS pod health/resource usage first — CoreDNS being CPU-throttled or OOM-restarted under cluster-wide DNS load is a common, often-missed root cause looking exactly like "random intermittent failures." Check the cache plugin\'s TTL and the dnsConfig ndots setting — a high ndots (Kubernetes default 5) makes external lookups probe several internal-domain variants first, multiplying query load unnecessarily. If CoreDNS itself looks healthy, suspect node-level resolution (kube-proxy/conntrack, missing NodeLocal DNSCache) rather than the CoreDNS pods themselves.' },
              { level: 'advanced', q: 'QA wants every open pull request to get its own fully isolated, automatically-provisioned test environment, torn down automatically when the PR closes. How would you architect this?', a: 'Each PR triggers a CI step creating a new namespace (pr-1234), applying that PR\'s manifests scoped to it (often a Helm chart parameterized by PR number), and an Ingress rule routing a PR-specific hostname to that namespace\'s services. A cleanup job on PR close runs kubectl delete namespace pr-1234, cascading to delete every resource inside automatically, preventing accumulation of abandoned environments. ResourceQuotas per PR namespace prevent any single preview environment from monopolizing shared capacity once dozens might exist simultaneously.' },
              { level: 'advanced', q: 'Your QA platform team keeps writing custom controllers/scripts watching a specific annotation to provision a database — essentially reinventing Kubernetes-native automation by hand. When does this justify a proper CRD and Operator instead?', a: 'A CRD lets you define a new first-class resource type (TestDatabase) with its own schema validated by the API server, rather than overloading annotations with implicit meaning only your script understands. An Operator watches CRD instances and reconciles them toward desired state declaratively — kubectl apply -f testdb.yaml creates the object, and the Operator handles the lifecycle the same way the Deployment controller manages ReplicaSets. The threshold: when the logic is reused across many teams, needs the same lifecycle rigor as built-in resources (status reporting, finalizers, RBAC scoping), and outgrows what a one-off script can maintainably handle.' },
              { level: 'advanced', q: 'Multiple teams share a cluster, and one team\'s workload is intermittently slow specifically when another runs a heavy batch job, even though both have correct CPU/memory requests/limits. What\'s a likely cause beyond CPU/memory contention?', a: 'CPU/memory limits don\'t protect against contention for resources they don\'t cover — disk I/O and network bandwidth on the shared node are common culprits, since Kubernetes doesn\'t throttle these per-pod by default without additional tooling. Investigate with node-level metrics (disk I/O wait, network throughput) correlated with which pods share a node during the contention window — if the slow team\'s pods land on the SAME node as the batch job, that\'s the cause. The fix is often podAntiAffinity keeping latency-sensitive workloads off nodes running known I/O-heavy jobs.' },
              { level: 'advanced', q: 'Your QA service accounts currently have cluster-admin "because it was easier to set up initially," and a security audit flags this. How do you redesign RBAC for least-privilege QA access?', a: 'Define a Role granting only specific verbs (get, list, watch, create, delete) on only the specific resource types QA needs in their own namespaces — explicitly enumerate rather than wildcard access, since cluster-admin can read every Secret cluster-wide and modify RBAC itself. Bind the Role to QA\'s ServiceAccount via a RoleBinding scoped to qa-* namespaces, and audit existing usage first (kubectl auth can-i --list) to confirm the narrower Role doesn\'t break a legitimate workflow before cutting over gradually rather than a hard cutover.' },
              { level: 'advanced', q: 'You have both Cluster Autoscaler and HPA configured, but scaling up under load is slower than expected — pods stay Pending noticeably before new capacity appears. How do these two interact, and where\'s the bottleneck?', a: 'HPA reacts first: it raises replica count on rising metrics, but if existing nodes have no room, those pods sit Pending until the Cluster Autoscaler notices unschedulable pods and provisions a new node — node provisioning genuinely takes minutes, which is the observed bottleneck, not a misconfiguration. Mitigations: maintain some standing headroom rather than scaling to bare minimum, or use cluster-autoscaler\'s overprovisioning pattern (low-priority placeholder pods evicted to trigger proactive scale-up). HPA operates on a seconds timescale, Cluster Autoscaler on a minutes timescale — they\'re not misaligned, just genuinely different speeds.' },
              { level: 'advanced', q: 'Your team wants to validate the app under test actually survives a pod crash or network latency spike gracefully, rather than assuming the architecture "should" handle it. How would you implement chaos testing in Kubernetes?', a: 'Use a Kubernetes-native chaos tool (Chaos Mesh, Litmus) to declaratively inject failures as Kubernetes resources — a PodChaos experiment kills a random pod matching a label selector on a schedule, while NetworkChaos injects latency or packet loss between specific pods, all defined as YAML rather than manually running kubectl delete pod by hand. The valuable test isn\'t just "did it survive" but "did it survive within SLA" — combine chaos experiments with monitoring to assert error rates and recovery time stayed within bounds. Start in a non-production cluster and scope blast radius tightly before ever considering production.' },
              { level: 'advanced', q: 'A rolling deployment is stuck halfway — kubectl rollout status waits indefinitely with both old and new pods running. What\'s the most likely cause, and how do you diagnose and unstick it?', a: 'The most common cause is NEW pods failing readinessProbe — Kubernetes won\'t terminate more old pods until new ones report ready, so a stuck not-ready new pod freezes the rollout. Diagnose with kubectl describe pod on a NEW pod — check readinessProbe failures in Events, and kubectl logs to see if the app is erroring during startup. To unstick: fix the issue and let rollout continue automatically, or kubectl rollout undo to roll back immediately if old pods are still serving traffic fine and the fix isn\'t quick.' },
              { level: 'advanced', q: 'Six months after launch, you find most pods using 10-15% of their configured limits while a few frequently hit theirs and get throttled/OOMKilled. How do you approach right-sizing cluster-wide based on this data?', a: 'Pull actual historical usage percentiles (p95/p99, not just averages, over a multi-week window covering peak traffic) for every workload, since a snapshot average misses real peak behavior the same way the original guesses likely did. For the over-provisioned majority, lower requests toward actual p95 (freeing real capacity, often a meaningful cloud cost win) while keeping limits with headroom above p99. For the under-provisioned few, raise limits based on actual peak rather than an arbitrary guess, and treat right-sizing as a recurring quarterly review rather than a one-time fix, since usage drifts as code and traffic change.' },
            ],
          },
          { type: 'heading', text: 'Quick-Fire Technical Facts' },
          {
            type: 'table',
            headers: ['Topic', 'Key Fact'],
            rows: [
              ['Default Service type', 'ClusterIP — only accessible within the cluster'],
              ['NodePort range', '30000–32767 — fixed range for externally exposed ports'],
              ['etcd quorum', 'Needs (N/2)+1 nodes — always use odd numbers: 3, 5, 7'],
              ['Pod restart policy', 'Always (default), OnFailure, Never'],
              ['K8s why "K8s"?', 'K + 8 letters + s = Kubernetes. Like i18n (internationalization)'],
              ['Smallest deployable unit', 'Pod (not container)'],
              ['ConfigMap max size', '1 MiB per ConfigMap'],
              ['rolling update default', 'maxSurge: 25%, maxUnavailable: 25%'],
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
      title: '☸️ Kubernetes (K8s)',
      subtitle: 'Modern QA & DevOps için Container Orkestrasyon',
      intro: 'Kubernetes\'i sıfırdan mülakat seviyesine taşı. Containerized uygulamaları deploy etmeyi, scale etmeyi ve yönetmeyi öğren — Google, Netflix ve tüm büyük teknoloji şirketlerinin altyapısının arkasındaki teknoloji.',
    },
    tabs: ['🎯 Giriş', '⚙️ Kurulum', '🏗️ Mimari', '📦 Temel Kavramlar', '⌨️ kubectl Komutları', '📝 YAML Manifestler', '🔗 Ekosistem', '🛠️ Gerçek Hayat', '💼 Mülakat S&C'],
    sections: [

      // ── BÖLÜM 0: GİRİŞ ────────────────────────────────────────────────────
      {
        title: '🎯 Kubernetes Nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '☸️',
            content: 'Kubernetes, büyük bir limandaki akıllı bir nakliye yöneticisi gibidir. Her vinç operatörüne adım adım ne yapacağını söylemezsin — sadece "10 kargo container\'ı teslim edilsin, en az 5 gemi her zaman yüklü olsun, bir vinç bozulursa diğerini kullan" dersin. Kubernetes, Docker container\'larında tam olarak bunu yapar: ne istediğini tanımlarsın, nasıl yapılacağını o bulur.',
          },
          {
            type: 'text',
            content: 'Production\'da yüzlerce Docker container çalıştırdığında manuel yönetim imkânsız hale gelir. Hangi sunucuda boş RAM var? Container crash olursa ne olur? Downtime olmadan nasıl güncellenir? Kubernetes (K8s) tüm bunları çözer — Google tarafından inşa edilmiş, şimdi açık kaynak bir container orkestrasyon platformudur.',
          },
          { type: 'heading', text: 'Kubernetes\'in Çözdüğü Problem' },
          {
            type: 'visual',
            variant: 'flow',
            title: 'K8s Olmadan vs K8s İle',
            steps: [
              { num: '❌', label: 'Manuel Deploy', desc: 'Her sunucuya SSH' },
              { num: '❌', label: 'Manuel Scale', desc: 'Elle VM başlat' },
              { num: '❌', label: 'Self-Heal Yok', desc: 'Crash = ölü kalır' },
              { num: '✅', label: 'Declarative', desc: 'İstenen durumu tanımla' },
              { num: '✅', label: 'Auto Scale', desc: 'HPA replica ayarlar' },
              { num: '✅', label: 'Self-Healing', desc: 'Crash = otomatik restart' },
            ],
          },
          { type: 'heading', text: 'Kubernetes\'in Temel Özellikleri' },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '🔄', label: 'Self-Healing', desc: 'Başarısız container\'ları otomatik yeniden başlatır, sağlıksız node\'ları değiştirir.' },
              { icon: '📈', label: 'Auto-Scaling', desc: 'HPA, CPU/belleğe göre pod\'ları scale eder. Trafik artışlarını otomatik karşılar.' },
              { icon: '🔄', label: 'Rolling Update', desc: 'Yeni versiyonları zero downtime ile deploy eder. Sorun çıkarsa anında rollback.' },
              { icon: '⚖️', label: 'Load Balancing', desc: 'Trafiği tüm sağlıklı pod\'lara dağıtır. Dahili service discovery vardır.' },
              { icon: '🔒', label: 'Secret Yönetimi', desc: 'API anahtarları, şifreleri güvenle saklar. Environment variable olarak enjekte eder.' },
              { icon: '🌐', label: 'Multi-Cloud', desc: 'AWS, GCP, Azure veya on-prem\'de çalışır. Vendor lock-in yoktur.' },
            ],
          },
          { type: 'heading', text: 'Kubernetes vs Docker Compose' },
          {
            type: 'table',
            headers: ['Özellik', 'Docker Compose', 'Kubernetes'],
            rows: [
              ['Kullanım Amacı', 'Local geliştirme, basit uygulamalar', 'Production, karmaşık dağıtık sistemler'],
              ['Ölçek', 'Tek makine', 'Çoklu node / cluster'],
              ['Self-Healing', '❌ Manuel restart', '✅ Otomatik restart'],
              ['Rolling Update', '❌ Downtime gerekir', '✅ Zero-downtime rolling update'],
              ['Load Balancing', '❌ Temel / dahili değil', '✅ Dahili Service LB'],
              ['Secret Yönetimi', '⚠️ .env dosyaları (güvensiz)', '✅ K8s Secrets (şifreli)'],
              ['Öğrenme Eğrisi', '⭐ Kolay', '⭐⭐⭐⭐ Dik ama değer'],
            ],
          },
          {
            type: 'quiz',
            question: 'Kubernetes\'in temel amacı nedir?',
            options: [
              { id: 'a', text: 'Docker image\'larını daha hızlı build etmek' },
              { id: 'b', text: 'Containerized uygulamaların deployment, scaling ve yönetimini otomatikleştirmek' },
              { id: 'c', text: 'Docker container\'larının tamamen yerini almak' },
              { id: 'd', text: 'Sunucular için GUI sağlamak' },
            ],
            correct: 'b',
            explanation: 'Kubernetes bir container orkestrasyon platformudur — bir makine kümesi üzerinde containerized uygulamaların deployment, scaling, load balancing, self-healing ve yönetimini otomatikleştirir.',
          
        retryQuestion: {
      "question": {
            "tr": "Kubernetes'in ana işlevi aşağıdakilerden hangisidir?",
            "en": "What is the primary function of Kubernetes?"
      },
      "options": [
            {
                  "id": "a",
                  "tr": "Veritabanı yönetimi sağlamak",
                  "en": "Managing database systems"
            },
            {
                  "id": "b",
                  "tr": "Container'ların yaşam döngüsünü (deploy, ölçekleme, yönetim) otomatize etmek",
                  "en": "Automating the lifecycle (deployment, scaling, management) of containerized applications"
            },
            {
                  "id": "c",
                  "tr": "Sanal makineler (VM) oluşturmak",
                  "en": "Creating virtual machines"
            },
            {
                  "id": "d",
                  "tr": "İşletim sistemi kernel'ini güncellemek",
                  "en": "Updating the OS kernel"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Kubernetes, container tabanlı uygulamaların karmaşık süreçlerini yönetmek, ölçeklendirmek ve operasyonel yükü azaltmak için tasarlanmış bir container orkestrasyon sistemidir.",
            "en": "Kubernetes is a container orchestration platform designed to manage, scale, and automate the operational complexity of container-based applications."
      }
}
},
          { type: 'heading', text: 'QA Mühendisleri Neden Kubernetes\'e İhtiyaç Duyar?' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              'Her branch için izole test ortamları (özellik başına namespace)',
              'E2E testleri için tam uygulama stack\'i kur (frontend + backend + DB)',
              'Paralel test çalıştırma: Selenium Grid pod\'larını otomatik scale et',
              'Production bug\'larını birebir üret — aynı container image\'ları',
              'Autoscaling davranışını test et — uygulama yük artışlarını karşılıyor mu?',
              'Health check ve self-healing\'i doğrula — pod\'u öldür, yeniden başladığını izle',
              'Mülakat soruları her zaman Senior QA rolleri için K8s bilgisi içerir',
            ],
          },
          {
            type: 'visual',
            variant: 'boxes',
            title: { tr: 'Kubernetes Küme Dağılımı', en: 'Kubernetes Cluster Layout' },
            items: [
              { icon: '🎮', label: { tr: 'Control Plane (Master)', en: 'Control Plane (Master)' }, desc: { tr: 'Kümenin beyni: planlama, kontrolörler, API yönetimi.', en: 'Brain of the cluster: API server, scheduler, controllers.' }, highlight: true },
              { arrow: true },
              { icon: '🖥️', label: { tr: 'Worker Node 1', en: 'Worker Node 1' }, desc: { tr: 'Uygulama Pod\'larının koştuğu makine.', en: 'Machine executing Pods.' } },
              { icon: '🖥️', label: { tr: 'Worker Node 2', en: 'Worker Node 2' }, desc: { tr: 'Kapasiteye göre pod alan ek makine.', en: 'Extra machine hosting workloads.' } }
            ],
            note: { tr: 'Control Plane, iş yüklerini (Pods) worker node\'lar arasında dengeli şekilde dağıtır.', en: 'The Control Plane schedules and balances workloads (Pods) across worker nodes.' }
          }
        ],
      },

      // ── BÖLÜM 1: MİMARİ ───────────────────────────────────────────────────
      {
        title: '⚙️ Kubernetes Kurulumu',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Öğrenme ve yerel geliştirme için gerçek bir bulut cluster\'ına ihtiyacınız yok. minikube, laptop\'ınızda birkaç dakikada tek-node\'lu bir K8s cluster\'ı oluşturur. Production için AWS EKS, Google GKE, Azure AKS gibi cloud provider\'lar Control Plane\'i sizin için yönetir. minikube\'la başla, kavramları öğren, sonra cloud\'a geç.',
          },
          { type: 'heading', text: 'Yerel vs Cloud Seçenekleri' },
          {
            type: 'table',
            headers: ['Araç', 'Açıklama', 'Ne Zaman Kullanılır'],
            rows: [
              ['minikube', 'Docker/VM içinde tek-node K8s', 'Öğrenme, yerel geliştirme — en başlangıç dostu'],
              ['kind', 'Docker container olarak K8s node\'ları', 'CI pipeline\'ları, multi-node test'],
              ['k3d / k3s', 'Hafif K8s', 'Düşük kaynak, hızlı başlatma'],
              ['Docker Desktop K8s', 'Dahili K8s toggle', 'Docker Desktop kullanan Windows/Mac kullanıcıları'],
              ['AWS EKS', 'Managed cloud K8s', 'Production — AWS ekipler'],
              ['Google GKE', 'Google managed K8s', 'Production — GCP ekipler'],
              ['Azure AKS', 'Azure managed K8s', 'Production — Microsoft/Azure ekipler'],
            ],
          },
          { type: 'heading', text: 'Adım 1: Docker Desktop Kurulumu (ön koşul)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Docker Desktop kurulumu',
            code: `# Windows (PowerShell — Yönetici olarak çalıştır)
winget install Docker.DockerDesktop
# Kurulum sonrası: Docker Desktop aç → Settings → Resources → WSL Integration → etkinleştir

# Mac
brew install --cask docker
# Veya: docker.com'dan DMG indir

# Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo usermod -aG docker $USER
newgrp docker   # logout yapmadan grup değişikliğini uygula

# Docker'ın çalıştığını doğrula
docker --version
docker run hello-world  # "Hello from Docker!" yazısı görünmeli`,
          },
          { type: 'heading', text: 'Adım 2: minikube Kurulumu' },
          {
            type: 'code',
            language: 'bash',
            label: 'minikube kurulumu — 3 OS',
            code: `# ── WINDOWS ────────────────────────────────────────────────
# Seçenek A: winget (tavsiye edilen)
winget install Kubernetes.minikube

# Seçenek B: Chocolatey
choco install minikube

# ── MAC ─────────────────────────────────────────────────────
brew install minikube

# ── LINUX ───────────────────────────────────────────────────
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64

# ── DOĞRULAMA ───────────────────────────────────────────────
minikube version
# Çıktı: minikube version: v1.32.x`,
          },
          { type: 'heading', text: 'Adım 3: kubectl Kurulumu' },
          {
            type: 'code',
            language: 'bash',
            label: 'kubectl kurulumu — K8s komut satırı aracı',
            code: `# ── WINDOWS ────────────────────────────────────────────────
winget install Kubernetes.kubectl

# ── MAC ─────────────────────────────────────────────────────
brew install kubectl

# ── LINUX (Ubuntu/Debian) ───────────────────────────────────
sudo apt-get update && sudo apt-get install -y apt-transport-https ca-certificates curl
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update && sudo apt-get install -y kubectl

# ── DOĞRULAMA ───────────────────────────────────────────────
kubectl version --client
# Çıktı: Client Version: v1.29.x

# ── YARARLI ALIAS'LAR (~/.bashrc veya ~/.zshrc'ye ekle) ─────
alias k=kubectl
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kgd='kubectl get deployments'`,
          },
          { type: 'heading', text: 'Adım 4: İlk Cluster\'ı Başlatma' },
          {
            type: 'code',
            language: 'bash',
            label: 'minikube başlatma ve ilk uygulama deploy etme',
            code: `# minikube başlat (Docker Desktop çalışıyor olmalı)
minikube start --driver=docker --cpus=2 --memory=4096

# Beklenen çıktı:
# 😄  minikube v1.32.0
# ✨  Using the docker driver based on user configuration
# 🔥  Creating docker container (CPUs=2, Memory=4096MB) ...
# 🐳  Preparing Kubernetes v1.28.x on Docker 24.0.7 ...
# 🏄  Done! kubectl is now configured to use "minikube"

# Cluster'ın çalıştığını doğrula
minikube status
kubectl get nodes
# NAME       STATUS   ROLES           AGE   VERSION
# minikube   Ready    control-plane   90s   v1.28.x

# Yararlı eklentileri aktifleştir
minikube addons enable ingress         # Nginx Ingress Controller
minikube addons enable metrics-server  # HPA için gerekli
minikube addons enable dashboard       # Web UI

# Kubernetes Dashboard'u tarayıcıda aç
minikube dashboard

# ── İlk uygulamayı deploy et ──────────────────────────────
kubectl create deployment hello-nginx --image=nginx:1.25
kubectl expose deployment hello-nginx --type=NodePort --port=80
minikube service hello-nginx  # Tarayıcıda otomatik açılır

kubectl get pods                      # Running görmeli
kubectl delete deployment hello-nginx # Temizlik`,
          },
          {
            type: 'quiz',
            question: 'Yerel öğrenme/geliştirme için neden minikube önerilir, gerçek bir cloud cluster (AWS EKS gibi) değil?',
            options: [
              { id: 'a', text: 'minikube, EKS\'den daha fazla Kubernetes özelliği destekler' },
              { id: 'b', text: 'minikube, laptop\'ında dakikalar içinde ücretsiz tek-node bir cluster kurar; cloud cluster\'ın Control Plane yönetimi ve sürekli maliyeti vardır' },
              { id: 'c', text: 'EKS bir Deployment çalıştıramaz' },
              { id: 'd', text: 'Herhangi bir cloud cluster kurmadan önce minikube zorunludur' },
            ],
            correct: 'b',
            explanation: 'minikube, laptop\'ında (Docker veya bir VM içinde) sıfır cloud maliyeti ve provisioning beklemesi olmadan doğrudan tek-node bir Kubernetes cluster\'ı oluşturur. Gerçek bir cloud cluster (EKS/GKE/AKS) Control Plane\'i senin için yönetir — production için değerlidir ama kurulum süresi ve sürekli faturalandırma getirir — Pod, Deployment ve Service gibi temel kavramları öğrenirken bu gereksiz bir yüktür.',
            retryQuestion: {
              question: 'Bir ekip öğrenme aşamasını geçti ve gerçek bir production uygulaması için otomatik Control Plane güncellemeleri ve yüksek erişilebilirlik olan multi-node bir cluster\'a ihtiyaç duyuyor. minikube hâlâ mantıklı bir seçim mi?',
              options: [
                { id: 'a', text: 'Evet, minikube her production iş yüküne ölçeklenir' },
                { id: 'b', text: 'Hayır — minikube tek-node lokal geliştirme için tasarlanmıştır, production-grade multi-node, yüksek erişilebilirlikli cluster\'lar için değil' },
                { id: 'c', text: 'Evet, çünkü minikube ve EKS fonksiyonel olarak birbirinin aynısıdır' },
                { id: 'd', text: 'Hayır, çünkü minikube hiçbir Kubernetes nesnesini çalıştıramaz' },
              ],
              correct: 'b',
              explanation: 'minikube açıkça lokal geliştirme ve öğrenme için inşa edilmiştir — yerleşik yüksek erişilebilirlik veya multi-node ölçekleme olmayan tek-node bir cluster\'dır. Gerçek HA ve yönetilen Control Plane güncellemeleri gerektiren bir production iş yükü, gerçek bir cluster\'a (EKS/GKE/AKS veya self-managed multi-node kurulum) ihtiyaç duyar — bu, minikube\'ın sadeliğinin tam olarak feda ettiği şeydir.',
            },
          },
          {
            type: 'visual',
            variant: 'boxes',
            title: { tr: 'Yerel ve Bulut Kubernetes Karşılaştırması', en: 'Local vs Cloud Kubernetes Setup' },
            items: [
              { icon: '💻', label: { tr: 'Yerel (Minikube)', en: 'Local (Minikube)' }, desc: { tr: 'Laptop üzerinde tek-node. Hızlı ve ücretsiz.', en: 'Single-node on laptop. Fast and free.' } },
              { arrow: true },
              { icon: '☁️', label: { tr: 'Bulut (AWS EKS / GKE)', en: 'Cloud (AWS EKS / GKE)' }, desc: { tr: 'Çoklu-node, yüksek erişilebilirlik. Ücretli.', en: 'Multi-node, high availability. Paid cloud costs.' }, highlight: true }
            ],
            note: { tr: 'Öğrenme sürecinde Minikube, üretim ortamlarında ise bulut orkestrasyonu tercih edilir.', en: 'Minikube is perfect for learning and local development, while managed cloud services host production workloads.' }
          }
        ],
      },

      // ── BÖLÜM: MİMARİ ─────────────────────────────────────────────────────
      {
        title: '🏗️ Kubernetes Mimarisi',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: 'Kubernetes cluster\'ını bir şirket gibi düşün. Control Plane yönetim katıdır — CEO (API Server), hafıza/İK (etcd), planlayıcı (görev atar), yöneticiler (controller\'lar). Worker Node\'lar ise işin gerçekten yapıldığı ofislerdir — her birinde sorumlu (kubelet), posta odası (kube-proxy) ve çalışanlar (pod\'lardaki container\'lar) vardır.',
          },
          {
            type: 'diagram-svg',
            title: 'Kubernetes Cluster Mimarisi',
            svg: `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" style="background:#1a1b2e;border-radius:16px;width:100%;font-family:JetBrains Mono,monospace">
  <text x="400" y="32" text-anchor="middle" fill="#a78bfa" font-size="15" font-weight="bold">☸️ Kubernetes Cluster Mimarisi</text>
  <rect x="20" y="50" width="360" height="220" rx="14" fill="#1e1b4b" stroke="#7c3aed" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold">🧠 CONTROL PLANE (Master Node)</text>
  <rect x="40" y="88" width="150" height="52" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="115" y="108" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">API Server</text>
  <text x="115" y="124" text-anchor="middle" fill="#818cf8" font-size="9">Tüm kubectl</text>
  <text x="115" y="136" text-anchor="middle" fill="#818cf8" font-size="9">komutlarının giriş noktası</text>
  <rect x="210" y="88" width="150" height="52" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="285" y="108" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">etcd</text>
  <text x="285" y="124" text-anchor="middle" fill="#818cf8" font-size="9">Cluster durumu ve</text>
  <text x="285" y="136" text-anchor="middle" fill="#818cf8" font-size="9">config deposu (key-value)</text>
  <rect x="40" y="156" width="150" height="52" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="115" y="176" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">Scheduler</text>
  <text x="115" y="192" text-anchor="middle" fill="#818cf8" font-size="9">Pod\'ları worker</text>
  <text x="115" y="204" text-anchor="middle" fill="#818cf8" font-size="9">node\'lara atar</text>
  <rect x="210" y="156" width="150" height="52" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="285" y="176" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">Controller Yönetici</text>
  <text x="285" y="192" text-anchor="middle" fill="#818cf8" font-size="9">İstenen durumu</text>
  <text x="285" y="204" text-anchor="middle" fill="#818cf8" font-size="9">sağlar (ReplicaSet vb.)</text>
  <rect x="40" y="226" width="320" height="32" rx="6" fill="#4c1d95" stroke="#7c3aed" stroke-width="1"/>
  <text x="200" y="246" text-anchor="middle" fill="#c4b5fd" font-size="10">💻 kubectl → API Server → etcd → Scheduler → Worker Node</text>
  <rect x="420" y="50" width="168" height="240" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
  <text x="504" y="74" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">🖥️ Worker Node 1</text>
  <rect x="436" y="84" width="136" height="38" rx="6" fill="#065f46" stroke="#34d399" stroke-width="1"/>
  <text x="504" y="100" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">kubelet</text>
  <text x="504" y="114" text-anchor="middle" fill="#a7f3d0" font-size="8">API Server\'a rapor verir</text>
  <rect x="436" y="130" width="136" height="38" rx="6" fill="#065f46" stroke="#34d399" stroke-width="1"/>
  <text x="504" y="146" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">kube-proxy</text>
  <text x="504" y="160" text-anchor="middle" fill="#a7f3d0" font-size="8">Ağ yönlendirmesi</text>
  <rect x="436" y="176" width="60" height="50" rx="6" fill="#047857" stroke="#10b981" stroke-width="1"/>
  <text x="466" y="196" text-anchor="middle" fill="#d1fae5" font-size="8" font-weight="bold">Pod</text>
  <text x="466" y="210" text-anchor="middle" fill="#6ee7b7" font-size="8">🐳 uygulama:v2</text>
  <text x="466" y="222" text-anchor="middle" fill="#6ee7b7" font-size="8">port:8080</text>
  <rect x="512" y="176" width="60" height="50" rx="6" fill="#047857" stroke="#10b981" stroke-width="1"/>
  <text x="542" y="196" text-anchor="middle" fill="#d1fae5" font-size="8" font-weight="bold">Pod</text>
  <text x="542" y="210" text-anchor="middle" fill="#6ee7b7" font-size="8">🐳 uygulama:v2</text>
  <text x="542" y="222" text-anchor="middle" fill="#6ee7b7" font-size="8">port:8080</text>
  <rect x="612" y="50" width="168" height="240" rx="14" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="696" y="74" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">🖥️ Worker Node 2</text>
  <rect x="628" y="84" width="136" height="38" rx="6" fill="#1e40af" stroke="#60a5fa" stroke-width="1"/>
  <text x="696" y="100" text-anchor="middle" fill="#93c5fd" font-size="9" font-weight="bold">kubelet</text>
  <text x="696" y="114" text-anchor="middle" fill="#bfdbfe" font-size="8">API Server\'a rapor verir</text>
  <rect x="628" y="130" width="136" height="38" rx="6" fill="#1e40af" stroke="#60a5fa" stroke-width="1"/>
  <text x="696" y="146" text-anchor="middle" fill="#93c5fd" font-size="9" font-weight="bold">kube-proxy</text>
  <text x="696" y="160" text-anchor="middle" fill="#bfdbfe" font-size="8">Ağ yönlendirmesi</text>
  <rect x="628" y="176" width="136" height="50" rx="6" fill="#1d4ed8" stroke="#3b82f6" stroke-width="1"/>
  <text x="696" y="196" text-anchor="middle" fill="#dbeafe" font-size="8" font-weight="bold">Pod (Veritabanı)</text>
  <text x="696" y="210" text-anchor="middle" fill="#93c5fd" font-size="8">🐘 postgres:15</text>
  <text x="696" y="222" text-anchor="middle" fill="#93c5fd" font-size="8">port:5432</text>
  <line x1="380" y1="155" x2="420" y2="155" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,3"/>
  <polygon points="416,151 424,155 416,159" fill="#7c3aed"/>
  <line x1="380" y1="175" x2="612" y2="155" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="608,151 616,155 608,159" fill="#7c3aed"/>
  <rect x="420" y="310" width="360" height="48" rx="10" fill="#7c2d12" stroke="#f97316" stroke-width="2"/>
  <text x="600" y="330" text-anchor="middle" fill="#fed7aa" font-size="11" font-weight="bold">⚖️ Service (Load Balancer)</text>
  <text x="600" y="348" text-anchor="middle" fill="#fb923c" font-size="9">Trafiği tüm pod\'lara dağıtır — sağlıklı pod\'ları otomatik keşfeder</text>
  <rect x="20" y="310" width="380" height="48" rx="10" fill="#1c1917" stroke="#a3a3a3" stroke-width="2"/>
  <text x="210" y="330" text-anchor="middle" fill="#e7e5e4" font-size="11" font-weight="bold">🌐 Ingress Controller</text>
  <text x="210" y="348" text-anchor="middle" fill="#a8a29e" font-size="9">Dış trafiği yönlendirir: api.example.com → Service → Pod\'lar</text>
  <line x1="504" y1="310" x2="466" y2="226" stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="550" y1="310" x2="542" y2="226" stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="20" y="380" width="760" height="130" rx="12" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="8,4"/>
  <text x="40" y="402" fill="#6366f1" font-size="10">📦 Namespace: production</text>
  <rect x="40" y="420" width="120" height="78" rx="8" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1"/>
  <text x="100" y="438" text-anchor="middle" fill="#a5b4fc" font-size="9" font-weight="bold">Control Plane</text>
  <text x="100" y="453" text-anchor="middle" fill="#818cf8" font-size="8">API Server, etcd</text>
  <text x="100" y="466" text-anchor="middle" fill="#818cf8" font-size="8">Scheduler, CtrlMgr</text>
  <text x="100" y="479" text-anchor="middle" fill="#6366f1" font-size="8">→ K8s\'in "beyni"</text>
  <text x="100" y="492" text-anchor="middle" fill="#6366f1" font-size="8">İş yükü çalıştırmaz</text>
  <rect x="200" y="420" width="120" height="78" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
  <text x="260" y="438" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Worker Node</text>
  <text x="260" y="453" text-anchor="middle" fill="#a7f3d0" font-size="8">kubelet, kube-proxy</text>
  <text x="260" y="466" text-anchor="middle" fill="#a7f3d0" font-size="8">Container runtime</text>
  <text x="260" y="479" text-anchor="middle" fill="#34d399" font-size="8">→ Pod\'ları çalıştırır</text>
  <text x="260" y="492" text-anchor="middle" fill="#34d399" font-size="8">Asıl iş yükleri burada</text>
  <rect x="360" y="420" width="120" height="78" rx="8" fill="#047857" stroke="#10b981" stroke-width="1"/>
  <text x="420" y="438" text-anchor="middle" fill="#d1fae5" font-size="9" font-weight="bold">Pod</text>
  <text x="420" y="453" text-anchor="middle" fill="#a7f3d0" font-size="8">K8s\'teki en küçük birim</text>
  <text x="420" y="466" text-anchor="middle" fill="#a7f3d0" font-size="8">İçinde 1+ container</text>
  <text x="420" y="479" text-anchor="middle" fill="#34d399" font-size="8">→ Paylaşımlı ağ</text>
  <text x="420" y="492" text-anchor="middle" fill="#34d399" font-size="8">ve depolama</text>
  <rect x="520" y="420" width="120" height="78" rx="8" fill="#7c2d12" stroke="#f97316" stroke-width="1"/>
  <text x="580" y="438" text-anchor="middle" fill="#fed7aa" font-size="9" font-weight="bold">Service</text>
  <text x="580" y="453" text-anchor="middle" fill="#fdba74" font-size="8">Pod\'lar için</text>
  <text x="580" y="466" text-anchor="middle" fill="#fdba74" font-size="8">sabit endpoint</text>
  <text x="580" y="479" text-anchor="middle" fill="#f97316" font-size="8">→ Trafiği</text>
  <text x="580" y="492" text-anchor="middle" fill="#f97316" font-size="8">dengeleyerek dağıtır</text>
  <rect x="660" y="420" width="100" height="78" rx="8" fill="#1c1917" stroke="#a3a3a3" stroke-width="1"/>
  <text x="710" y="438" text-anchor="middle" fill="#e7e5e4" font-size="9" font-weight="bold">Ingress</text>
  <text x="710" y="453" text-anchor="middle" fill="#d6d3d1" font-size="8">HTTP yönlendirme</text>
  <text x="710" y="466" text-anchor="middle" fill="#d6d3d1" font-size="8">TLS sonlandırma</text>
  <text x="710" y="479" text-anchor="middle" fill="#a8a29e" font-size="8">→ Dış trafik</text>
  <text x="710" y="492" text-anchor="middle" fill="#a8a29e" font-size="8">giriş noktası</text>
</svg>`,
          },
          { type: 'heading', text: 'Control Plane Bileşenleri' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🎮', label: 'kube-apiserver', desc: 'K8s\'in ön kapısı. Tüm kubectl komutları buradan geçer. İstekleri doğrular, etcd\'yi günceller ve her şeyi koordine eder. Ölürse cluster yönetilemez hale gelir (ama çalışan pod\'lar devam eder).' },
              { icon: '🗄️', label: 'etcd', desc: 'Beynin hafızası. Tüm cluster durumunu tutan dağıtık key-value deposu — node\'lar, pod\'lar, service\'ler, config\'ler. etcd kaybolursa cluster durumu kaybolur. Her zaman yedekle!' },
              { icon: '📅', label: 'kube-scheduler', desc: 'Yeni bir pod\'un hangi worker node\'da çalışacağına karar verir. CPU/RAM kullanılabilirliğini, taint/toleration\'ları, affinity kurallarını ve kaynak isteklerini değerlendirir. Atar ama başlatmaz.' },
              { icon: '🔧', label: 'kube-controller-manager', desc: 'Cluster durumunu izleyen kontrol döngülerini çalıştırır. ReplicaSet controller doğru pod sayısını sağlar. Node controller başarısız node\'ları tespit eder. Endpoint controller Service endpoint\'lerini günceller.' },
            ],
          },
          { type: 'heading', text: 'Worker Node Bileşenleri' },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '👮', label: 'kubelet', desc: 'Node agent\'ı. Her worker node\'da çalışır. API Server\'dan pod spec\'lerini alır ve container\'ların sağlıklı çalışmasını sağlar. Node durumunu Control Plane\'e bildirir.' },
              { icon: '🌐', label: 'kube-proxy', desc: 'Her node\'da ağ kurallarını yönetir. Service soyutlamasını mümkün kılar — trafiği doğru pod\'a yönlendirir. iptables veya IPVS kuralları kullanır.' },
              { icon: '🐳', label: 'Container Runtime', desc: 'Container\'ları gerçekten çalıştıran motor. K8s containerd (varsayılan), CRI-O veya Docker\'ı destekler (Docker kullanımdan kaldırıldı). Image\'ları çeker ve kubelet talimatlarına göre container\'ları başlatır.' },
            ],
          },
          {
            type: 'quiz',
            question: 'Hangi bileşen yeni bir pod\'un hangi Worker Node\'a schedule edileceğine karar verir?',
            options: [
              { id: 'a', text: 'kube-apiserver' },
              { id: 'b', text: 'etcd' },
              { id: 'c', text: 'kube-scheduler' },
              { id: 'd', text: 'kubelet' },
            ],
            correct: 'c',
            explanation: 'kube-scheduler, schedule edilmemiş pod\'ları izler ve kaynak kullanılabilirliğine, taint\'lere, toleration\'lara ve affinity kurallarına göre en uygun Worker Node\'a atar.',
          
        retryQuestion: {
      "question": {
            "tr": "Bir Pod oluşturulduğunda, kaynak gereksinimlerine göre en uygun node'u seçen Kubernetes kontrol düzlemi (control plane) bileşeni hangisidir?",
            "en": "Which Kubernetes control plane component is responsible for selecting the optimal node for a new Pod based on its resource requirements?"
      },
      "options": [
            {
                  "id": "a",
                  "tr": "kube-controller-manager",
                  "en": "kube-controller-manager"
            },
            {
                  "id": "b",
                  "tr": "kube-proxy",
                  "en": "kube-proxy"
            },
            {
                  "id": "c",
                  "tr": "kube-scheduler",
                  "en": "kube-scheduler"
            },
            {
                  "id": "d",
                  "tr": "etcd",
                  "en": "etcd"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "kube-scheduler, Pod'un gereksinimlerini ve kümedeki node'ların durumunu analiz ederek Pod'un hangi node'da çalışması gerektiğini belirleyen bileşendir.",
            "en": "The kube-scheduler analyzes the resource needs of a Pod and the state of the nodes in the cluster to determine the most appropriate node for the Pod to run on."
      }
}
},
        ],
      },

      // ── BÖLÜM 2: TEMEL KAVRAMLAR ──────────────────────────────────────────
      {
        title: '📦 Temel Kubernetes Kavramları',
        blocks: [
          {
            type: 'simulation',
            icon: '☸️',
            color: '#7c3aed',
            title: { tr: 'kubectl apply → Pod Running — Cluster Yolculuğu', en: 'kubectl apply → Pod Running — Cluster Journey' },
            scenario: 'k8s-pod',
            description: {
              tr: '"▶ kubectl apply" butonuna bas: YAML dosyasının kubectl\'den API Server\'a, etcd\'ye, Scheduler\'a ve Node\'a uzanan yolculuğunu adım adım izle. Java\'daki deploy pipeline analojisi sağda.',
              en: 'Press "▶ kubectl apply": watch the YAML journey from kubectl to API Server, etcd, Scheduler and Node step by step. Java deploy pipeline analogy on the right.',
            },
            code: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  replicas: 2          # 2 pod replica
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80

# Uygula:
kubectl apply -f deployment.yaml
# → deployment.apps/my-nginx created

# Durumunu izle:
kubectl rollout status deployment/my-nginx
# → deployment "my-nginx" successfully rolled out

kubectl get pods
# → my-nginx-6d8f9   1/1   Running   0`,
            language: 'yaml',
          },
          { type: 'heading', text: 'Pod — En Küçük Birim' },
          {
            type: 'simple-box',
            emoji: '🫘',
            content: 'Pod, bir nakliye container\'ı gibidir (fiziksel kutu, Docker container değil). Docker container ise içindeki yüktür. Genellikle bir pod\'da bir container bulunur; ancak ağ ve depolama paylaşması gereken birden fazla container da olabilir — ana uygulama ve bir loglama sidecar gibi.',
          },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📍', label: 'Pod = 1+ container', desc: 'Aynı IP adresini, hostname\'i ve volume\'leri paylaşırlar. Bir pod\'daki container\'lar localhost üzerinden birbirleriyle konuşabilir.' },
              { icon: '⚡', label: 'Tasarım gereği geçici', desc: 'Pod\'lar her an öldürülüp yeniden oluşturulabilir. Kalıcı durumu asla doğrudan pod\'da saklamaün — PersistentVolume kullan.' },
              { icon: '🏷️', label: 'Label ve Selector\'lar', desc: 'Pod\'lar etiketlerle işaretlenir: app=frontend, env=prod. Service\'ler ve Deployment\'lar eşleşen pod\'ları bulmak için selector\'lar kullanır.' },
              { icon: '🩺', label: 'Health Probe\'lar', desc: 'livenessProbe: sağlıksızsa yeniden başlat. readinessProbe: hazır olduğunda trafik gönder. startupProbe: yavaş başlayan uygulamalar için.' },
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'En sade Pod YAML',
            code: `# En basit Pod manifest\'i
apiVersion: v1
kind: Pod
metadata:
  name: uygulama-pod
  labels:
    app: uygulama       # Etiket — Service\'lerin bu pod\'u bulması için
    env: production
spec:
  containers:
  - name: uygulama
    image: nginx:1.25   # Çalıştırılacak Docker image
    ports:
    - containerPort: 80
    resources:
      requests:          # Minimum gereken kaynaklar
        memory: "64Mi"
        cpu: "250m"      # 250 millicores = 0.25 CPU
      limits:            # İzin verilen maksimum
        memory: "128Mi"
        cpu: "500m"`,
          },
          { type: 'heading', text: 'Deployment — Pod Replica\'larını Yönetme' },
          {
            type: 'text',
            content: 'Pod\'ları neredeyse hiç direkt oluşturmazsın. Bunun yerine Deployment kullan — bir ReplicaSet yönetir ve istediğin sayıda pod replica\'sının her zaman çalışmasını sağlar. Deployment aynı zamanda rolling update ve rollback işlemlerini de yapar.',
          },
          {
            type: 'visual',
            variant: 'boxes',
            title: 'Deployment → ReplicaSet → Pod\'lar (ilişki)',
            items: [
              { icon: '🚀', label: 'Deployment', desc: 'Update ve rollback yönetir' },
              { arrow: true },
              { icon: '📋', label: 'ReplicaSet', desc: 'N pod çalışmasını sağlar' },
              { arrow: true },
              { icon: '🫘', label: 'Pod 1', desc: 'uygulama:v2' },
              { arrow: false },
              { icon: '🫘', label: 'Pod 2', desc: 'uygulama:v2' },
              { arrow: false },
              { icon: '🫘', label: 'Pod 3', desc: 'uygulama:v2' },
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Deployment YAML',
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: uygulama-deployment
  namespace: production
spec:
  replicas: 3                    # Her zaman 3 pod çalışsın
  selector:
    matchLabels:
      app: uygulama              # Bu etiketteki pod\'ları bul
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1                # Güncelleme sırasında 1 ekstra pod oluştur
      maxUnavailable: 0          # Yeniler hazır olmadan eski pod\'ları öldürme
  template:                      # Pod şablonu aşağıda
    metadata:
      labels:
        app: uygulama
        version: "2.0"
    spec:
      containers:
      - name: uygulama
        image: uygulamam:2.0
        ports:
        - containerPort: 8080
        readinessProbe:          # Hazır olana kadar trafik gönderme
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10`,
          },
          { type: 'heading', text: 'Service — Sabit Ağ Endpoint\'i' },
          {
            type: 'text',
            content: 'Pod\'ların dinamik IP\'leri vardır — her yeniden başladığında değişir. Service, etiket selector\'ları aracılığıyla her zaman doğru pod\'lara yönlendiren sabit bir IP ve DNS adı sağlar. Bunu ön masadaki resepsiyonist gibi düşün — arayanlar hangi çalışanın yanıtlayacağını bilmek zorunda değil.',
          },
          {
            type: 'table',
            headers: ['Service Tipi', 'Erişim', 'Kullanım Durumu'],
            rows: [
              ['ClusterIP (varsayılan)', 'Yalnızca cluster içinde', 'Dahili microservice iletişimi (DB, backend API)'],
              ['NodePort', 'Her node\'un IP:PORT üzerinden (30000-32767)', 'Cloud LB olmadan geliştirme/test erişimi'],
              ['LoadBalancer', 'Cloud sağlayıcısı dış LB oluşturur', 'AWS/GCP/Azure\'da production uygulamalar'],
              ['ExternalName', 'Dış servise DNS takma adı', 'RDS gibi dış veritabanlarına bağlanma'],
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Service YAML (ClusterIP + NodePort örneği)',
            code: `# ClusterIP — yalnızca dahili erişim
apiVersion: v1
kind: Service
metadata:
  name: uygulama-service
spec:
  type: ClusterIP          # Varsayılan — dış erişim yok
  selector:
    app: uygulama          # app=uygulama etiketli pod\'lara yönlendir
  ports:
  - port: 80               # Service portu (arayanların kullandığı)
    targetPort: 8080       # Container portu (uygulamanın dinlediği)
---
# NodePort — dış geliştirme erişimi
apiVersion: v1
kind: Service
metadata:
  name: uygulama-nodeport
spec:
  type: NodePort
  selector:
    app: uygulama
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080        # Erişim: http://<NodeIP>:30080`,
          },
          { type: 'heading', text: 'Namespace — Mantıksal İzolasyon' },
          {
            type: 'text',
            content: 'Namespace\'ler tek bir cluster\'ı birden fazla sanal cluster\'a böler. Bunları ayrı klasörler gibi düşün. Ekipler veya ortamlar bir cluster\'ı paylaşabilir ama izole kalabilir: aynı donanım üzerinde dev, staging ve production namespace\'leri.',
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Namespace\'lerle çalışma',
            code: `# Tüm namespace\'leri listele
kubectl get namespaces

# Namespace oluştur
kubectl create namespace qa-ekibi

# Belirli bir namespace\'e deploy et
kubectl apply -f deployment.yaml -n qa-ekibi

# Taze bir K8s cluster\'ındaki varsayılan namespace\'ler:
# default        - namespace belirtilmediğinde kaynaklar buraya gider
# kube-system    - K8s sistem bileşenleri (DNS, dashboard)
# kube-public    - Herkesçe okunabilir kaynaklar
# kube-node-lease - Node kalp atışı kilit nesneleri`,
          },
          { type: 'heading', text: 'ConfigMap ve Secret — Konfigürasyon Yönetimi' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '⚙️', label: 'ConfigMap', desc: 'Hassas olmayan config verisi: veritabanı URL\'i, feature flag\'leri, API base URL\'leri. Environment variable olarak veya volume-mounted dosya olarak enjekte edilir.' },
              { icon: '🔐', label: 'Secret', desc: 'Hassas veriler: şifreler, API anahtarları, TLS sertifikaları. Base64 kodlanmıştır (varsayılan olarak şifrelenmez — RBAC + encryption at rest kullan). ConfigMap ile aynı şekilde enjekte edilir.' },
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'ConfigMap + Secret kullanımı',
            code: `# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: uygulama-config
data:
  DATABASE_URL: "postgres://db-service:5432/mydb"
  LOG_LEVEL: "info"
  FEATURE_FLAG_NEW_UI: "true"
---
# Secret (değerler base64 kodlanmalı)
# echo -n "gizli-sifre" | base64
apiVersion: v1
kind: Secret
metadata:
  name: uygulama-secrets
type: Opaque
data:
  DB_PASSWORD: Z2l6bGktc2lmcmU=
  API_KEY: c3VwZXItc2VjcmV0LWtleQ==
---
# Deployment\'ta kullanımı
spec:
  containers:
  - name: uygulama
    image: uygulamam:1.0
    envFrom:
    - configMapRef:
        name: uygulama-config    # Tüm ConfigMap anahtarları env var olarak
    - secretRef:
        name: uygulama-secrets   # Tüm Secret anahtarları env var olarak`,
          },
          {
            type: 'quiz',
            question: 'Hangi Kubernetes nesnesi bir pod kümesi için sabit ağ endpoint\'i sağlar?',
            options: [
              { id: 'a', text: 'Pod' },
              { id: 'b', text: 'Service' },
              { id: 'c', text: 'ConfigMap' },
              { id: 'd', text: 'Namespace' },
            ],
            correct: 'b',
            explanation: 'Service, pod\'lar oluşturulup yok edilse bile kalıcı olan sabit bir IP ve DNS adı sağlar. Etiket selector\'ları kullanarak trafiği eşleşen pod\'lara otomatik olarak yönlendirir.',
          
        retryQuestion: {
      "type": "quiz",
      "question": "Kubernetes mimarisinde, birden fazla Pod'a gelen ağ trafiğini dağıtmak ve onlara erişim için tek bir kararlı adres sunmak amacıyla hangisi kullanılır?",
      "options": [
            {
                  "id": "a",
                  "text": "Deployment"
            },
            {
                  "id": "b",
                  "text": "Service"
            },
            {
                  "id": "c",
                  "text": "Secret"
            },
            {
                  "id": "d",
                  "text": "Volume"
            }
      ],
      "correct": "b",
      "explanation": "Service nesnesi, dinamik olarak değişebilen Pod IP adreslerinin aksine, uygulamanız için tutarlı bir IP ve DNS ismi sağlar. Bu sayede Pod'lar yeniden başlatılsa bile uygulama erişilebilir kalmaya devam eder."
}
},
        ],
      },

      // ── BÖLÜM 3: KUBECTL KOMUTLARI ────────────────────────────────────────
      {
        title: '⌨️ kubectl Komutları — Hızlı Referans',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⌨️',
            content: 'kubectl, Kubernetes cluster\'ınla konuşmak için kullanılan CLI aracıdır. Uzaktan kumanda gibi — komut yazarsın, API Server çalıştırır. Her kubectl komutu API Server\'dan geçer.',
          },
          { type: 'heading', text: 'Bilgi Alma' },
          {
            type: 'code',
            language: 'bash',
            label: 'GET komutları — Cluster durumunu incele',
            code: `# Mevcut namespace\'deki tüm pod\'ları listele
kubectl get pods

# TÜM namespace\'lerdeki pod\'lar
kubectl get pods --all-namespaces   # veya -A

# Pod\'ları daha fazla detayla listele (IP, node)
kubectl get pods -o wide

# Belirli namespace\'deki pod\'ları getir
kubectl get pods -n production

# Pod\'ları gerçek zamanlı izle (durum değiştikçe güncellenir)
kubectl get pods -w

# Tüm kaynak tiplerini listele
kubectl get all

# Pod\'u YAML formatında al (debugging için harika)
kubectl get pod benim-pod -o yaml

# Deployment\'ları getir
kubectl get deployments

# Service\'leri getir
kubectl get services   # veya kubectl get svc

# Node\'ları getir
kubectl get nodes`,
          },
          { type: 'heading', text: 'Kaynakları İnceleme' },
          {
            type: 'code',
            language: 'bash',
            label: 'DESCRIBE — Detaylı bilgi ve event\'ler',
            code: `# Pod\'u describe et — event\'leri, koşulları, kaynak kullanımını göster
kubectl describe pod benim-pod

# Deployment\'ı describe et
kubectl describe deployment uygulama-deployment

# Node\'u describe et — kapasite anlamak için yararlı
kubectl describe node worker-node-1

# Event\'leri kontrol et (pod neden başlamıyor debugging için harika)
kubectl get events --sort-by=.metadata.creationTimestamp -n production

# Belirli bir pod için event\'leri filtrele
kubectl get events --field-selector involvedObject.name=benim-pod`,
          },
          { type: 'heading', text: 'Log ve Debugging' },
          {
            type: 'code',
            language: 'bash',
            label: 'LOGS ve EXEC — Çalışan container\'ları debug et',
            code: `# Pod loglarını al
kubectl logs benim-pod

# Logları gerçek zamanlı takip et (tail -f gibi)
kubectl logs -f benim-pod

# Belirli bir container\'dan log al (çok container\'lı pod)
kubectl logs benim-pod -c benim-container

# Önceki container logları (crash edip yeniden başladıysa)
kubectl logs benim-pod --previous

# Çalışan container içinde komut çalıştır
kubectl exec benim-pod -- ls /app

# Container içinde interaktif shell aç
kubectl exec -it benim-pod -- /bin/bash

# Geçici debug pod çalıştır
kubectl run debug-pod --image=busybox --rm -it -- sh

# Port forward: Service olmadan pod\'a lokal erişim
kubectl port-forward pod/benim-pod 8080:8080
# Şimdi: curl http://localhost:8080`,
          },
          { type: 'heading', text: 'Uygulama ve Silme' },
          {
            type: 'code',
            language: 'bash',
            label: 'APPLY / DELETE / SCALE',
            code: `# YAML dosyasından uygula (oluştur veya güncelle)
kubectl apply -f deployment.yaml

# Bir dizindeki tüm YAML dosyalarını uygula
kubectl apply -f ./k8s/

# Kaynağı sil
kubectl delete pod benim-pod
kubectl delete -f deployment.yaml

# Namespace\'deki tüm pod\'ları sil
kubectl delete pods --all -n test-ortam

# Deployment\'ı scale et
kubectl scale deployment uygulama --replicas=5

# Image güncelle (rolling update başlatır)
kubectl set image deployment/uygulama uygulama=uygulamam:2.0

# Önceki versiyona geri dön
kubectl rollout undo deployment/uygulama

# Rollout durumunu kontrol et
kubectl rollout status deployment/uygulama

# Rollout geçmişini görüntüle
kubectl rollout history deployment/uygulama`,
          },
          {
            type: 'callout',
            color: 'green',
            emoji: '💡',
            title: 'Pro İpucu: kubectl alias\'ları',
            content: 'Deneyimli K8s kullanıcıları .bashrc\'ye alias\'lar ekler: alias k=kubectl | alias kgp="kubectl get pods" | alias kgs="kubectl get svc". Bu günlük çalışmada ve özellikle mülakatlarda/sertifika sınavlarında çok zaman kazandırır.',
          },
          {
            type: 'quiz',
            question: 'Pod loglarını gerçek zamanlı takip etmek için hangi komut kullanılır?',
            options: [
              { id: 'a', text: 'kubectl logs benim-pod --watch' },
              { id: 'b', text: 'kubectl logs -f benim-pod' },
              { id: 'c', text: 'kubectl describe benim-pod --logs' },
              { id: 'd', text: 'kubectl tail benim-pod' },
            ],
            correct: 'b',
            explanation: 'kubectl logs -f benim-pod, logları gerçek zamanlı olarak takip eder (Linux\'taki tail -f gibi). -f flag\'i "follow" anlamına gelir. Çalışan uygulamaları debug etmek için olmazsa mazdır.',
          
        retryQuestion: {
      "type": "quiz",
      "question": "Bir Kubernetes pod'unun çıktılarını (stdout/stderr) sürekli olarak terminal ekranında izlemek istiyorsanız hangi komutu çalıştırmalısınız?",
      "options": [
            {
                  "id": "a",
                  "text": "kubectl get logs pod-adi --stream"
            },
            {
                  "id": "b",
                  "text": "kubectl logs -f pod-adi"
            },
            {
                  "id": "c",
                  "text": "kubectl monitor pod-adi"
            },
            {
                  "id": "d",
                  "text": "kubectl follow pod-adi"
            }
      ],
      "correct": "b",
      "explanation": "kubectl logs komutuna eklenen -f (follow) parametresi, pod içerisinde üretilen yeni log satırlarını anlık olarak terminalinize yansıtır. Geliştirme ve hata ayıklama süreçlerinde log akışını gözlemlemek için standart yöntemdir."
}
},
        ],
      },

      // ── BÖLÜM 4: YAML MANİFESTLER ─────────────────────────────────────────
      {
        title: '📝 YAML Manifestler — Uygulamalı',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📝',
            content: 'Kubernetes\'te her şey "manifest" adı verilen YAML dosyaları olarak tanımlanır. YAML\'ı Kubernetes\'e yazdığın bir mektup gibi düşün: "Sevgili K8s, lütfen uygulamamın 3 kopyasını çalıştır, 8080 portuna bağla ve her zaman sağlıklı olduklarından emin ol." YAML girintisi kesinlikle 2 boşluk olmalıdır — yanlış girinti = hata.',
          },
          { type: 'heading', text: 'YAML Yapısı — Her K8s Nesnesi 4 Kök Alana Sahiptir' },
          {
            type: 'code',
            language: 'yaml',
            label: 'Her K8s YAML\'ında 4 zorunlu alan',
            code: `apiVersion: apps/v1    # Bu nesneyi hangi K8s API versiyonu yönetir
kind: Deployment       # Nesne TİPİ: Pod, Deployment, Service, vb.
metadata:              # Nesnenin kimliği
  name: benim-uygulama  # Namespace\'deki benzersiz ad
  namespace: default   # Hangi namespace (atlanırsa default)
  labels:              # Organizasyon için key-value etiketler
    app: benim-uygulama
    env: production
spec:                  # İSTENEN DURUM — K8s\'ten ne yapmasını istiyorsun
  # ... nesneye özel konfigürasyon buraya`,
          },
          { type: 'heading', text: 'Tam Uygulama: Deployment + Service' },
          {
            type: 'code',
            language: 'yaml',
            label: 'Production-ready tam uygulama deployment\'ı',
            code: `# ─── Deployment ──────────────────────────────────────────────
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webuygulamasi
  namespace: production
  labels:
    app: webuygulamasi
    version: "3.2"
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webuygulamasi
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0   # Sıfır downtime: her zaman 3 pod mevcut
  template:
    metadata:
      labels:
        app: webuygulamasi
    spec:
      containers:
      - name: webuygulamasi
        image: kayit/webuygulamasi:3.2
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: production
        - name: DB_URL
          valueFrom:
            configMapKeyRef:
              name: uygulama-config
              key: DATABASE_URL
        - name: DB_PASS
          valueFrom:
            secretKeyRef:
              name: uygulama-secrets
              key: DB_PASSWORD
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:      # Başarısız olursa pod\'u yeniden başlat
          httpGet:
            path: /saglik
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 20
        readinessProbe:     # Bu geçene kadar trafik gönderme
          httpGet:
            path: /hazir
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
---
# ─── Service ─────────────────────────────────────────────────
apiVersion: v1
kind: Service
metadata:
  name: webuygulamasi-service
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: webuygulamasi    # app=webuygulamasi etiketli tüm pod\'lara yönlendir
  ports:
  - name: http
    port: 80
    targetPort: 3000`,
          },
          { type: 'heading', text: 'HorizontalPodAutoscaler (HPA)' },
          {
            type: 'text',
            content: 'HPA, Deployment\'ının replica sayısını CPU kullanımına (veya özel metrikler) göre otomatik olarak scale eder. QA kullanım senaryosu: bir JMeter yük testinde HPA\'nın tepkisini izleyerek uygulamanın doğru scale olduğunu test et.',
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'HPA — CPU\'ya göre otomatik scale',
            code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webuygulamasi-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webuygulamasi
  minReplicas: 2       # 2\'nin altına asla inme
  maxReplicas: 20      # 20\'yi asla aşma
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70   # Ort. CPU > %70\'de scale up yap

# Yük testi sırasında HPA\'yı izle:
# kubectl get hpa -w
# JMeter yükü arttıkça → CPU artar → HPA replica ekler!`,
          },
          {
            type: 'callout',
            color: 'blue',
            emoji: '🧪',
            title: 'QA Test İpucu: K8s Deployment\'larını Doğrula',
            content: 'Manifest\'leri uyguladıktan sonra: 1) kubectl rollout status deployment/webuygulamasi — rollout tamamlandı mı kontrol et, 2) kubectl get pods -w — pod\'ların sağlıklı gelişini izle, 3) kubectl describe pod <pod-adı> — bir şeyler yanlışsa event\'leri incele, 4) kubectl logs <pod-adı> — uygulama başlangıç loglarını kontrol et.',
          },
          {
            type: 'quiz',
            question: '`kubectl apply -f deployment.yaml` ile bir Deployment manifest\'i uyguladıktan sonra, rollout\'un gerçekten başarıyla bittiğini hangi komut söyler?',
            options: [
              { id: 'a', text: 'kubectl apply -f deployment.yaml --check' },
              { id: 'b', text: 'kubectl rollout status deployment/<isim>' },
              { id: 'c', text: 'kubectl get pods --status' },
              { id: 'd', text: 'kubectl version' },
            ],
            correct: 'b',
            explanation: '`kubectl apply` sadece istenen durumu gönderir — pod\'lar henüz çalışmıyor olsa bile anında geri döner. `kubectl rollout status deployment/<isim>` ise rollout GERÇEKTEN tamamlanana (veya başarısız olana) kadar bekler ve ilerlemeyi raporlar — bu yüzden bir deployment\'ın `apply` hatasız döndüğü için başarılı olduğunu varsaymak yerine, gerçekten başarılı olduğunu doğrulamak için doğru komut budur.',
            retryQuestion: {
              question: 'Bir CI pipeline\'ı `kubectl apply -f deployment.yaml` çalıştırıyor ve rollout durumunu kontrol etmeden hemen sıradaki adıma geçiyor. Yeni pod\'lar gerçekte başlamayı başaramıyor. Pipeline ne görür?',
              options: [
                { id: 'a', text: 'apply bozuk pod\'ları tespit ettiği için pipeline otomatik olarak başarısız olur' },
                { id: 'b', text: 'Pipeline, apply\'dan başarılı bir exit code görür ve devam eder, deployment\'ın gerçekte bozuk olduğundan habersiz kalır' },
                { id: 'c', text: 'kubectl apply, pod\'lar sağlıklı olana kadar geri dönmeyi reddeder' },
                { id: 'd', text: 'Cluster, hiçbir CI farkındalığı olmadan otomatik olarak geri alır' },
              ],
              correct: 'b',
              explanation: '`kubectl apply` sadece istenen durumun API sunucusu tarafından kabul edildiğini onaylar — gerçek pod\'ların sağlıklı gelip gelmediği konusunda hiçbir şey söylemez. `kubectl rollout status` (veya eşdeğer health check\'ler) ile takip etmeyen bir CI pipeline\'ı, gerçek uygulama production\'da crash-loop yaparken "deploy başarılı" raporlayabilir — rollout status kontrollerinin gerçek deployment pipeline\'larında standart bir adım olmasının tam nedeni budur.',
            },
          },
        ],
      },

      // ── BÖLÜM 5: MÜLAKAT S&C ──────────────────────────────────────────────
      {
        title: '🔗 Kubernetes Ekosistemi & Araç İlişkileri',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔗',
            content: 'Kubernetes tek başına bir araç değil — modern DevOps ekosisteminin merkezidir. K8s\'nin Docker, Jenkins, Kafka ve Helm ile nasıl bağlandığını anlamak, sizi temel K8s kullanıcısından Senior DevOps/QA Engineer\'a taşır. Bu araçlar birlikte tam bir yazılım teslimat hattı oluşturur.',
          },
          { type: 'heading', text: 'Docker ↔ Kubernetes: Temel' },
          {
            type: 'visual',
            variant: 'flow',
            title: 'Docker image oluşturur, Kubernetes çalıştırır',
            steps: [
              { num: '1', label: 'Kod Yaz', desc: 'Java/Spring Boot app' },
              { num: '2', label: 'Dockerfile', desc: 'Uygulamayı paketle' },
              { num: '3', label: 'docker build', desc: 'Image oluştur' },
              { num: '4', label: 'docker push', desc: 'Registry\'ye gönder' },
              { num: '5', label: 'K8s YAML', desc: 'Image\'ı referans et' },
              { num: '6', label: 'K8s çalıştırır', desc: 'containerd aracılığıyla' },
            ],
          },
          {
            type: 'text',
            content: 'Docker container image\'ları oluşturur. Kubernetes bu image\'ları büyük ölçekte ÇALIŞTIRIR. K8s artık Docker daemon\'ı doğrudan kullanmıyor (K8s 1.20+ ile deprecated) — bunun yerine containerd veya CRI-O kullanıyor. Ama Docker image OLUŞTURMAK için hâlâ kullanılıyor. Java analojisi: Docker Maven\'ın JAR\'ı paketlemesi gibi, Kubernetes ise application server cluster\'ının bunu çalıştırması gibi.',
          },
          {
            type: 'table',
            headers: ['Araç', 'Rol', 'İlişki'],
            rows: [
              ['Docker', 'Container runtime + build aracı', 'K8s\'nin pull edip çalıştırdığı image\'ları oluşturur'],
              ['Kubernetes', 'Orkestrasyon platformu', 'Docker container\'larını schedule eder, scale eder, iyileştirir'],
              ['containerd', 'Düşük seviyeli container runtime', 'K8s, container çalıştırmak için Docker değil containerd kullanır'],
              ['Docker Compose', 'Multi-container yerel geliştirme', 'Geliştirme için iyi, production\'da K8s kullanılır'],
            ],
          },
          { type: 'heading', text: 'Jenkins ↔ Kubernetes: CI/CD Pipeline' },
          {
            type: 'text',
            content: 'Jenkins, Kubernetes\'e build eder, test eder ve DEPLOY EDER. Bir Jenkinsfile pipeline şunları yapar: 1) Testleri çalıştırır, 2) Docker image oluşturur, 3) Registry\'ye push eder, 4) kubectl ile K8s manifest\'lerini uygular. K8s aynı zamanda Jenkins build agent\'larını pod olarak ÇALIŞTIRABİLİR — her build temiz bir container alır, Java thread\'i gibi.',
          },
          {
            type: 'code',
            language: 'groovy',
            label: 'Jenkinsfile — Kubernetes\'e deploy eden pipeline',
            code: `pipeline {
    agent {
        kubernetes {
            // Her Jenkins build K8s pod içinde çalışır — her seferinde temiz environment
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: maven
    image: maven:3.9-openjdk-17
    command: ['sleep', 'infinity']
  - name: docker
    image: docker:24-dind
    securityContext:
      privileged: true
"""
        }
    }

    environment {
        REGISTRY = 'myregistry.azurecr.io'
        IMAGE_NAME = 'my-spring-app'
        K8S_NAMESPACE = 'production'
    }

    stages {
        stage('Test') {
            steps {
                container('maven') {
                    sh 'mvn clean test'
                    junit 'target/surefire-reports/**/*.xml'
                }
            }
        }

        stage('Docker Image Oluştur ve Push Et') {
            steps {
                container('docker') {
                    sh """
                        docker build -t \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER} .
                        docker push \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Kubernetes\'e Deploy Et') {
            steps {
                container('maven') {
                    sh """
                        sed -i 's|IMAGE_TAG|\${BUILD_NUMBER}|g' k8s/deployment.yaml
                        kubectl apply -f k8s/deployment.yaml -n \${K8S_NAMESPACE}
                        kubectl rollout status deployment/my-app -n \${K8S_NAMESPACE}
                    """
                }
            }
        }
    }

    post {
        failure {
            // Hata durumunda otomatik rollback — Java transaction rollback gibi
            sh 'kubectl rollout undo deployment/my-app -n \${K8S_NAMESPACE}'
        }
    }
}`,
          },
          { type: 'heading', text: 'Kafka ↔ Kubernetes: Strimzi Operator' },
          {
            type: 'text',
            content: 'Kafka\'yı Kubernetes üzerinde çalıştırmak için Operator gerekir — Kafka\'yı anlayan özel bir K8s controller. Strimzi en popüler açık kaynak Kafka operator\'üdür. Bir Kafka custom resource tanımlarsınız, Strimzi tüm pod\'ları, service\'leri ve ConfigMap\'leri otomatik oluşturur. Spring @Configuration class gibi ama K8s infrastructure için.',
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Strimzi: K8s üzerinde 3-node Kafka cluster deploy et',
            code: `# 1. Strimzi operator kurulumu
kubectl create namespace kafka
kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka' -n kafka
kubectl wait deployment/strimzi-cluster-operator -n kafka --for=condition=available --timeout=120s

# 2. Kafka cluster'ı K8s Custom Resource olarak oluştur
cat << 'EOF' | kubectl apply -f - -n kafka
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: my-cluster
spec:
  kafka:
    version: 3.6.0
    replicas: 3
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
    storage:
      type: ephemeral
  zookeeper:
    replicas: 3
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
EOF

# 3. Kafka pod'larını izle
kubectl get pods -n kafka -w

# 4. Topic'i K8s resource olarak oluştur (kafka-topics.sh gerekmez!)
cat << 'EOF' | kubectl apply -f - -n kafka
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: siparisler
  labels:
    strimzi.io/cluster: my-cluster
spec:
  partitions: 3
  replicas: 3
EOF`,
          },
          { type: 'heading', text: 'Helm: Kubernetes Paket Yöneticisi' },
          {
            type: 'simple-box',
            emoji: '⚓',
            content: 'Helm, Kubernetes için Maven/Gradle gibidir. Prometheus monitoring\'i deploy etmek için 10 YAML dosyası yazmak yerine sadece: helm install monitoring prometheus-community/kube-prometheus-stack çalıştırırsın. Helm Chart, Maven dependency gibi önceden paketlenmiş K8s uygulamasıdır.',
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Helm ile karmaşık K8s uygulamalarını tek komutla kur',
            code: `# Helm kurulumu
# Mac:     brew install helm
# Windows: choco install kubernetes-helm
# Linux:   curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Chart repository'leri ekle
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Prometheus + Grafana monitoring stack kur (500+ satır YAML'ın yerini alır)
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace

# Nginx Ingress Controller kur
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace

# Kurulu chart'ları listele
helm list --all-namespaces

# Upgrade (güncelle)
helm upgrade monitoring prometheus-community/kube-prometheus-stack -n monitoring

# Kaldır
helm uninstall monitoring -n monitoring`,
          },
          {
            type: 'quiz',
            question: 'Modern Kubernetes cluster\'ları container çalıştırmak için doğrudan Docker Engine değil containerd kullanır. Neden?',
            options: [
              { id: 'a', text: 'containerd image build etmekte daha hızlıdır' },
              { id: 'b', text: 'Kubernetes\'in sadece Container Runtime Interface (CRI) uygulayan hafif bir runtime\'a ihtiyacı vardır; Docker Engine ise K8s\'nin gerek duymadığı ekstra araçlar (build, compose, CLI) taşır' },
              { id: 'c', text: 'Docker image\'ları Kubernetes ile uyumsuzdur' },
              { id: 'd', text: 'containerd YAML manifest yazmak için zorunludur' },
            ],
            correct: 'b',
            explanation: 'Kubernetes sadece OCI uyumlu container image\'larını pull edip çalıştırmaya ihtiyaç duyar — runtime ile CRI (Container Runtime Interface) üzerinden konuşur. containerd, CRI\'yi doğrudan uygulayan hafif bir runtime\'dır; tam Docker Engine ise bir node\'un ihtiyacı olmayan ekstra araçlar (build pipeline\'ı, Compose, docker CLI) taşır. `docker build` ile oluşturulan image\'lar yine sorunsuz çalışır — Docker image\'ları OCI uyumludur — değişen sadece onları ÇALIŞTIRMAK için kullanılan daemon\'dur.',
            retryQuestion: {
              question: 'Bir geliştirici laptop\'ında `docker build` ile bir image oluşturup bir registry\'e push ediyor. containerd çalıştıran (Docker Engine değil) bir Kubernetes cluster\'ı bu image\'ı çalıştırabilir mi?',
              options: [
                { id: 'a', text: 'Hayır, containerd sadece kendi araçlarıyla build edilmiş image\'ları çalıştırabilir' },
                { id: 'b', text: 'Evet — image OCI uyumludur, containerd (veya herhangi bir CRI uyumlu runtime) hangi araçla build edildiğinden bağımsız olarak herhangi bir OCI image\'ı çalıştırabilir' },
                { id: 'c', text: 'Sadece cluster\'da containerd\'nin yanında Docker Engine de kuruluysa' },
                { id: 'd', text: 'Sadece image cluster\'ın içinde doğrudan yeniden build edilirse' },
              ],
              correct: 'b',
              explanation: 'Docker image\'ları OCI (Open Container Initiative) image spesifikasyonuna göre build edilir — containerd dahil herhangi bir OCI uyumlu runtime\'ın okuyup çalıştırabileceği bir standart. Build aracı (`docker build`, `buildah`, `kaniko` vb.) daha sonra image\'ı çalıştıran runtime\'dan tamamen ayrıdır. Cluster node\'larında Docker Engine\'den containerd\'ye geçişin kimsenin image build etme şeklini değiştirmesini gerektirmemesinin tam nedeni budur.',
            },
          },
        ],
      },

      // ── BÖLÜM: GERÇEK HAYAT ───────────────────────────────────────────────
      {
        title: '🛠️ Gerçek Hayatta Kubernetes — Hands-On',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚀',
            content: 'Bu bölüm sizi gerçek bir senaryodan geçirir: Spring Boot REST API\'sini sıfırdan Kubernetes\'e deploy etmek. Her komutu adım adım takip edin. Sonunda çalışan, scale edilebilir, production-grade bir deployment\'ınız olacak — sadece teori değil.',
          },
          { type: 'heading', text: 'Senaryo: Spring Boot Uygulamasını K8s\'e Deploy Et' },
          {
            type: 'steps',
            items: [
              'Spring Boot app oluştur (veya mevcut bir JAR kullan)',
              'Dockerfile yazarak containerize et',
              'Docker image oluştur ve registry\'ye gönder',
              'Kubernetes YAML yaz: Deployment + Service + HPA',
              'minikube\'a deploy et ve çalıştığını doğrula',
              'Scale et ve self-healing\'i test et',
              'Yeni versiyona rolling update yap',
            ],
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Adım 1-2: Spring Boot app ve Dockerfile',
            code: `# start.spring.io'dan proje oluştur veya mevcut projeyi kullan
# Multi-stage Dockerfile — küçük final image (Maven shade plugin gibi)

cat > Dockerfile << 'EOF'
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN ./mvnw dependency:resolve
COPY src ./src
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
EOF`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Adım 3: Image oluştur ve minikube\'a yükle',
            code: `# SEÇENEK A: minikube'un Docker daemon'ını kullan (registry gerekmez!)
eval $(minikube docker-env)              # Mac/Linux
# Windows PowerShell: minikube docker-env | Invoke-Expression
docker build -t my-spring-app:v1 .
# YAML'da imagePullPolicy: Never kullan

# SEÇENEK B: Docker Hub'a push et
docker tag my-spring-app:v1 dockerkullaniciniz/my-spring-app:v1
docker push dockerkullaniciniz/my-spring-app:v1`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Adım 5-7: Deploy, doğrula, scale et, rolling update',
            code: `# Tüm manifest'leri uygula
kubectl apply -f k8s/

# Pod'ların başlamasını izle
kubectl get pods -w
# spring-app-xxxx-yyy   0/1   ContainerCreating   → Running

# Uygulamaya erişim URL'ini al
minikube service spring-app-service --url
curl http://$(minikube service spring-app-service --url)/actuator/health
# {"status":"UP"}

# Self-healing testi — pod'u sil, K8s'in yeniden oluşturmasını izle
kubectl delete pod spring-app-xxxx-yyy
kubectl get pods -w   # Yeni pod saniyeler içinde görünür

# Manuel scale
kubectl scale deployment spring-app --replicas=5
kubectl get pods      # 5 pod görmeli

# Rolling update — sıfır downtime
docker build -t my-spring-app:v2 .
kubectl set image deployment/spring-app spring-app=my-spring-app:v2
kubectl rollout status deployment/spring-app
# deployment "spring-app" successfully rolled out

# Hata durumunda rollback
kubectl rollout undo deployment/spring-app`,
          },
          { type: 'heading', text: 'Yaygın Hatalar ve Çözümler' },
          {
            type: 'error-dictionary',
            errors: [
              {
                error: 'CrashLoopBackOff',
                cause: 'Container başlıyor ama hemen çıkıyor. Genellikle: uygulama başlatma hatası, yanlış env variable, eksik config veya health check başarısız.',
                solution:'kubectl logs pod-name --previous  (crash log\'larına bak)\nkubectl describe pod pod-name  (event\'ları ve çıkış kodlarını gör)\nKontrol et: uygulama startup log\'larındaki stack trace\'ler, doğru environment variable\'lar, database connection string.',
              },
              {
                error: 'ImagePullBackOff / ErrImagePull',
                cause: 'K8s container image\'ını pull edemiyor. Yanlış image adı, yanlış tag veya eksik registry authentication.',
                solution:'kubectl describe pod pod-name  (tam hatayı gör)\nYAML\'daki image adının registry ile tam eşleştiğini kontrol et\nPrivate registry için imagePullSecret oluştur:\nkubectl create secret docker-registry regcred --docker-server=REGISTRY --docker-username=USER --docker-password=PASS',
              },
              {
                error: 'Pending (pod takılı kalıyor)',
                cause: 'Scheduler, pod\'u hiçbir node\'a yerleştiremedi. Nedenler: yetersiz CPU/memory, node taint\'leri, PVC bağlı değil.',
                solution:'kubectl describe pod pod-name  (Events bölümüne bak)\nkubectl get nodes  (node kapasitesini kontrol et)\nkubectl describe node node-name  (Allocatable vs Requests)\nminikube için: minikube start --cpus=4 --memory=8192',
              },
              {
                error: 'OOMKilled (çıkış kodu 137)',
                cause: 'Container, bellek limitinden fazla kullandı. Kernel onu sonlandırdı.',
                solution:'YAML\'da bellek limitini artır:\nresources:\n  limits:\n    memory: "1Gi"  # 512Mi\'dan artır\nVeya uygulamadaki memory leak\'i düzelt.',
              },
              {
                error: 'connection refused / no endpoints available',
                cause: 'Service, pod\'lara ulaşamıyor. Pod readiness probe başarısız, yanlış selector label\'lar veya pod\'lar hazır değil.',
                solution:'kubectl get endpoints service-name  (pod IP\'lerini listeler)\nkubectl describe svc service-name  (selector label\'ları kontrol et)\nPod label\'larının service selector ile tam eşleştiğinden emin ol.\nkubectl get pods -l app=spring-app  (selector\'ü test et)',
              },
            ],
          },
          { type: 'heading', text: 'QA Mühendisi: K8s Test Kontrol Listesi' },
          {
            type: 'list',
            items: [
              '✅ Health check endpoint\'leri 200 döndürüyor (readiness + liveness probe)',
              '✅ Rolling update downtime olmadan tamamlanıyor (update sırasında load test çalıştır)',
              '✅ Pod crash sonrası otomatik yeniden başlıyor (kubectl delete pod ile test et)',
              '✅ HPA yük altında scale out yapıyor (k6 veya JMeter ile trafik oluştur)',
              '✅ Resource limit\'ler OOMKill\'i önlüyor (yoğun bellek kullanan request test et)',
              '✅ Secret\'lar pod env veya log\'larda görünmüyor',
              '✅ ConfigMap güncellemeleri pod yeniden başlatmadan uygulanıyor',
              '✅ Rolling update sırasında service 502/503 döndürüyor (hata değil)',
            ],
          },
          {
            type: 'quiz',
            question: 'Bir pod CrashLoopBackOff durumunda takılı kalıyor. Nedenini teşhis etmek için doğru ilk komut hangisidir?',
            options: [
              { id: 'a', text: 'kubectl delete pod <isim> hemen çalıştırılır' },
              { id: 'b', text: 'kubectl logs <pod-adı> --previous' },
              { id: 'c', text: 'kubectl get nodes' },
              { id: 'd', text: 'kubectl create secret docker-registry' },
            ],
            correct: 'b',
            explanation: 'CrashLoopBackOff, container\'ın başlayıp tekrar tekrar hemen çıkması demektir. Çökmüş container\'ın logları yeni bir tane başladığı anda kaybolur, bu yüzden `kubectl logs <pod-adı> --previous` SON çöken instance\'ın loglarını getirir — genellikle çökmeye neden olan gerçek startup exception\'ını, eksik environment variable\'ı veya başarısız health check\'i gösterir. Pod\'u silmek, hiçbir şeyi teşhis etmeden aynı bozuk container\'ı yeniden başlatır.',
            retryQuestion: {
              question: '`kubectl logs <pod-adı> --previous` hiçbir faydalı şey göstermiyor — sadece boş bir log. CrashLoopBackOff için olası sıradaki teşhis adımı nedir?',
              options: [
                { id: 'a', text: 'Hemen tüm cluster\'ı silip yeniden oluşturmak' },
                { id: 'b', text: 'Container hiçbir şey loglamadan önce gerçekleşen scheduling, image pull veya resource sorunlarını kontrol etmek için `kubectl describe pod <pod-adı>` çalıştırıp Events bölümüne bakmak' },
                { id: 'c', text: 'Uygulama kodunun sorunsuz olduğunu varsayıp çökmeyi görmezden gelmek' },
                { id: 'd', text: 'Çökmeyi atlatmak için replika sayısını artırmak' },
              ],
              correct: 'b',
              explanation: '`--previous` logları boşsa, çökme muhtemelen uygulama herhangi bir şey loglamaya başlamadan ÖNCE gerçekleşiyor (örn. başarısız bir image pull, eksik bir ConfigMap/Secret mount, veya container\'ı çok erken öldüren başarısız bir liveness probe). `kubectl describe pod`, Events bölümünde bu uygulama-öncesi-log olaylarını gösterir — `kubectl logs`\'un hiç gösteremediği bir şeydir.',
            },
          },
        ],
      },

      // ── BÖLÜM: MÜLAKAT S&C ────────────────────────────────────────────────
      {
        title: '💼 Kubernetes Mülakat Soruları ve Cevapları',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Kubernetes',
            questions: [
              {
                level: 'basic',
                q: 'Kubernetes nedir ve neden gereklidir?',
                a: 'Kubernetes (K8s), başlangıçta Google tarafından geliştirilen açık kaynaklı bir container orkestrasyon platformudur. Bir makine kümesi üzerinde containerized uygulamaların deployment, scaling, self-healing ve yönetimini otomatikleştirir. Neden gereklidir: yüzlerce Docker container\'ını manuel yönetmek imkânsızdır — K8s yerleştirme, scaling, failover ve rolling update\'leri otomatik olarak yönetir.',
              },
              {
                level: 'basic',
                q: 'Kubernetes\'te Pod nedir?',
                a: 'Pod, K8s\'deki en küçük deploy edilebilir birimdir. Aynı ağ namespace\'ini (aynı IP, aynı port\'lar) ve depolama volume\'lerini paylaşan bir veya daha fazla container\'ı sarar. Aynı pod\'daki container\'lar localhost üzerinden iletişim kurar. Pod\'lar geçicidir — her an öldürülüp yeniden başlatılabilirler. Bu yüzden pod IP\'lerini direkt kullanmazsın; bunun yerine Service kullanırsın.',
              },
              {
                level: 'basic',
                q: 'Deployment ile Pod arasındaki fark nedir?',
                a: 'Pod, container\'ın tek çalışan örneğidir. Deployment ise bir ReplicaSet yöneten controller\'dır; bu controller belirtilen sayıda pod replica\'sının her zaman çalışmasını sağlar. Deployment\'lar rolling update ve rollback\'leri de yönetir. Pratikte pod\'ları direkt oluşturmazsın — her zaman Deployment kullanırsın (stateful uygulamalar için StatefulSet).',
              },
              {
                level: 'basic',
                q: '4 varsayılan Kubernetes namespace\'i nelerdir?',
                a: '1) default — namespace belirtilmezse kaynaklar buraya gider, 2) kube-system — K8s sistem bileşenleri (CoreDNS, kube-proxy, metrics-server), 3) kube-public — tüm kullanıcılar tarafından okunabilir (kimlik doğrulanmamış), 4) kube-node-lease — node sağlığını belirlemek için Node kalp atışı kilitleri.',
              },
              {
                level: 'intermediate',
                q: 'Kubernetes kontrol döngüsü / mutabakat döngüsü\'nü açıkla',
                a: 'Kubernetes controller\'ları "istenen durum vs gerçek durum" döngüsü üzerinde çalışır. İstenen durumu manifest\'te tanımlarsın (örn. "my-app\'in 3 replica\'sı"). Controller gerçek durumu izler (mevcut pod\'lar). Gerçek != istenen ise mutabakat sağlamak için harekete geçer: 2 pod çalışıyorsa ve istenen 3 ise, yeni bir pod oluşturur. Bu sürekli gerçekleşir — K8s\'in self-healing\'i böyle sağlanır.',
              },
              {
                level: 'intermediate',
                q: 'livenessProbe ile readinessProbe arasındaki fark nedir?',
                a: 'livenessProbe: Container\'ın canlı olup olmadığını kontrol eder. Başarısız olursa K8s container\'ı yeniden başlatır. Deadlock tespiti için kullanılır (uygulama çalışıyor ama donmuş). readinessProbe: Container\'ın trafik almaya hazır olup olmadığını kontrol eder. Başarısız olursa K8s pod\'u Service endpoint\'lerinden çıkarır (artık trafik göndermez). Isınma süresi gerektiren uygulamalar için kullanılır. Pod canlı ama hazır olmayabilir — hayatta kalır ama trafik almaz.',
              },
              {
                level: 'intermediate',
                q: 'etcd nedir ve neden kritiktir?',
                a: 'etcd, tüm K8s cluster durumu için tek gerçek kaynağı olan dağıtık, tutarlı bir key-value deposudur. Şunları saklar: tüm kaynak tanımları (pod\'lar, service\'ler, deployment\'lar), konfigürasyon verisi, cluster durumu ve auth kimlik bilgileri. etcd verisi kaybolursa cluster durumu kaybolur. En iyi uygulamalar: etcd\'yi her zaman 3+ node ile HA (yüksek erişilebilirlik) kurulumunda çalıştır ve düzenli yedekle.',
              },
              {
                level: 'advanced',
                q: 'Rolling Update nasıl çalışır? maxSurge ve maxUnavailable ne anlama gelir?',
                a: 'Rolling update, eski pod\'ları yavaş yavaş yenileriyle değiştirir. maxSurge: güncelleme sırasında istenen sayının kaç üstünde pod bulunabilir (örn. 1, K8s\'in geçici olarak replicas+1 pod çalıştırabileceği anlamına gelir). maxUnavailable: aynı anda kaç pod kullanılamaz olabilir (örn. 0 sıfır downtime demektir — her zaman tam kapasitede tut). K8s 1 yeni pod oluşturur, readinessProbe\'u geçmesini bekler, sonra 1 eski pod\'u siler, tamamı güncellenene kadar tekrarlar.',
              },
              {
                level: 'advanced',
                q: 'ConfigMap ile Secret arasındaki fark nedir? Secret\'lar şifreli midir?',
                a: 'ConfigMap: hassas olmayan key-value config\'i saklar (URL\'ler, feature flag\'ler). etcd\'de düz metin. Secret: hassas verileri saklar (şifreler, token\'lar, sertifikalar). etcd\'de Base64 kodlanmış, varsayılan olarak ŞİFRELENMEZ. Base64 yalnızca kodlamadır, şifreleme değil — etcd erişimi olan herkes decode edebilir. Gerçek güvenlik için: 1) API server config\'inde Encryption at Rest\'i etkinleştir, 2) CSI driver ile dış secret yöneticileri kullan (HashiCorp Vault, AWS Secrets Manager). Secret\'ları kimlerin okuyabileceğini kısıtlamak için RBAC uygula.',
              },
              // ── TEMEL (ek) ──────────────────────────────────────
              { level: 'basic', q: "Bir test pod'u takılı kalmış ve loglara bile bakmadan önce nedenini bulman gerekiyor. Standart ilk-bakış kubectl iş akışın nedir?", a: "kubectl get pods, pod'un mevcut STATUS sütununu (Pending, CrashLoopBackOff, ImagePullBackOff, Running) gösterir, bu da sorun kategorisini zaten daraltır. kubectl describe pod <ad>, alt kısımda Events bölümünü gösterir — loglara bakmadan önce pod'un NEDEN takılı kaldığını (başarısız scheduling, image pull hatası, başarısız mount) görmenin genellikle en hızlı yoludur. Pod gerçekten çalışmaya başladıktan sonra kubectl logs <ad> (ve çökmüş bir container'ın son çalışması için --previous) faydalı olur — hiç başlamamış bir pod'da logları kontrol etmek, debug süresini yanlış katmanda harcamaktır." },
              { level: 'basic', q: "Bir pod CrashLoopBackOff durumunu gösteriyor. Bu durum gerçekte ne anlama gelir ve ilk teşhis adımın nedir?", a: "CrashLoopBackOff, container'ın başladığını, çöktüğünü ve Kubernetes'in denemeler arasında üstel bir backoff gecikmesiyle yeniden denediğini gösterir — bu bir scheduling sorunu DEĞİLDİR, container'ın kendisi başladıktan sonra başarısız oluyor demektir. İlk adım kubectl logs <pod-adı>'dır (mevcut deneme henüz çıktı üretmediyse --previous ile) gerçek hatayı görmek için — yaygın sebepler eksik bir environment variable, başlangıçta başarısız bir health check veya eksik bir bağımlılık/config dosyasıdır. Logları okumadan yeniden başlatmak sadece aynı crash döngüsünü yeniden başlatır — düzeltme neredeyse her zaman uygulamada veya konfigürasyonundadır, Kubernetes'in kendisinde değil." },
              { level: 'basic', q: "Takımın aynı test suite'ini dev, staging ve paylaşılan bir QA cluster'ına karşı çalıştırıyor, ve herkes şeyleri \"app\" ve \"db\" diye adlandırdığından kaynaklar sürekli çakışıyor. Kubernetes ayrı cluster'lar olmadan bunu nasıl izole etmeye yardımcı olur?", a: "Namespace'ler tek bir cluster'ı mantıksal olarak izole kaynak gruplarına böler — qa namespace'indeki \"app\" adlı bir Deployment, staging'deki \"app\" adlı bir Deployment'tan tamamen farklı bir nesnedir, ve varsayılan olarak birbirlerini isimle göremez veya etkilemezler. Bu, ortamların bir cluster'ın compute kaynaklarını paylaşırken isimlendirme, RBAC izinleri ve resource quota'ların namespace başına bağımsız olarak kapsamlanmasını sağlar. Bu, ortam başına ayrı bir cluster'dan çok daha ucuzdur, ama ResourceQuota'lar namespace başına da yapılandırılmadıkça gürültülü-komşu kaynak çekişmesi hâlâ mümkündür." },
              { level: 'basic', q: "Bir test uygulamasını açığa çıkarman gerekiyor: bir kere cluster içindeki diğer pod'ların ulaşması için, bir kere de manuel QA sırasında lokal tarayıcının dışarıdan vurması için. Her duruma hangi iki Service tipi uyar?", a: "ClusterIP (varsayılan), sadece cluster içinden erişilebilen kararlı bir dahili IP/DNS verir — harici açığa çıkarma olmadan bir pod'un başka birine konuşması için mükemmeldir. NodePort, her node'da belirli bir portu (30000-32767) açar, dışarıdan <herhangi-bir-node-ip>:<nodeport> üzerinden erişilebilir — debug sırasında laptop'undan bir servisi elle dürtmek için hızlı bir yoldur, ama gerçek harici trafik için LoadBalancer veya Ingress production-seviyesi seçeneklerdir." },
              { level: 'basic', q: "Bir test sadece cluster içinde başarısız oluyor ve hiçbir şeyi yeniden deploy etmeden gerçekten çalışan container içinde bir komut çalıştırmak istiyorsun. Komut nedir ve container çökmüşse hangi tuzak var?", a: "kubectl exec -it <pod-adı> -- bash, container'ın çalışan process namespace'i içinde interaktif bir shell açar — docker exec'in Kubernetes karşılığı. Tuzak: exec sadece ÇALIŞAN bir container'da işe yarar; pod zaten çökmüşse (CrashLoopBackOff), çökme penceresinde exec edilecek hiçbir şey yoktur, bu yüzden kubectl logs --previous'a geri dönersin, veya container'ın komutunu geçici olarak sleep'e çevirerek yeterince uzun süre canlı tutup interaktif olarak araştırırsın." },
              { level: 'basic', q: "Cluster'ında 5 uygulamada 50 pod var, ve hızlıca sadece \"checkout\" servisine ait pod'ları bulman gerekiyor. Label'lar bunu nasıl pratik kılar?", a: "Label'lar kaynaklara eklenen keyfi key-value çiftleridir (app: checkout, env: qa), ve kubectl get pods -l app=checkout, 50'sinin hepsini kaydırmak yerine sadece eşleşen pod'ları anında gösterir. Aynı mekanizma Service'lerin, Deployment'ların ve NetworkPolicy'lerin içsel olarak kullandığı şeydir — bir Service'in app: checkout'a uyan selector'ı, kubectl'ın filtreleme için kullandığı aynı label-eşleştirmedir. Tutarlı bir label kuralı (app, env, version, team) erkenden kurulması debug sırasında sürekli kazandırır." },
              { level: 'basic', q: "Bir Deployment oluşturuyorsun ve kubectl get all hem bir Deployment HEM bir ReplicaSet gösteriyor, ReplicaSet'i hiç direkt oluşturmamış olsan dahi. İlişki nedir ve bu katmanlaşma neden var?", a: "Bir Deployment bir ReplicaSet'i yönetir, bu N pod replica'sının var olmasını gerçekten sağlayan nesnedir; Deployment zaman içinde ReplicaSet'leri yönetir (rolling update sırasında yeni bir tane oluşturur, eskisini küçültür). Bu katmanlaşma rollback'leri kolaylaştırır: önceki bir ReplicaSet hemen silinmez, böylece kubectl rollout undo onu geri büyütebilir. ReplicaSet'lerle neredeyse hiç direkt etkileşime girmezsin — daha yüksek seviye bir client kullanırken bir connection pool'un içsellerini nadiren yönetmene benzer." },
              { level: 'basic', q: "Resource request/limit'i olmayan bir test pod'u, bir yük testi sırasında aynı node'daki komşu bir pod'un CPU'sunu açlığa düşürüyor. Ne yapılandırılmalıydı ve requests ile limits arasındaki fark nedir?", a: "requests, scheduling sırasında garanti edilen MİNİMUM kaynakları beyan eder (yer olan bir node seçmek için kullanılır); limits, throttle edilmeden (CPU) veya öldürülmeden (memory, OOMKilled) önce izin verilen MAKSİMUMU beyan eder. Bunlar olmadan, bir pod sınırsız kaynak tüketebilir, komşuları açlığa düşürür — tam olarak tarif edilen semptom. Her test pod'unda resources: { requests: {...}, limits: {...} } ayarlamak, adil scheduling sağlar ve en kötü durum tüketimini sınırlar, herhangi bir paylaşımlı cluster'da zorunlu hijyendir." },
              { level: 'basic', q: "İki mühendis aynı dosyanın biraz farklı versiyonlarına karşı sırasıyla kubectl create -f deployment.yaml ve kubectl apply -f deployment.yaml çalıştırıyor. Pratik fark nedir ve neredeyse her takım neden birinde standartlaşır?", a: "kubectl create emperatiftir — kaynak zaten varsa direkt başarısız olur. kubectl apply deklaratiftir — dosyayı canlı cluster durumuyla diff'ler ve sadece değişeni patch'ler, bu yüzden güncellenmiş bir dosyayla tekrar tekrar çalıştırmak normal iş akışıdır (ve henüz yoksa ilk çalıştırmada oluşturur). Takımlar apply'da standartlaşır çünkü CI/CD pipeline'larının idempotent yeniden koşumlara ihtiyacı vardır — aynı komut kaynak var olsa da olmasa da çalışmalı, ki create bunu desteklemez." },
              { level: 'basic', q: "3-replica'lı bir Deployment'tan bir pod'u kalıcı olarak kaldırmayı bekleyerek kubectl delete pod <ad> çalıştırıyorsun. Birkaç saniye sonra gerçekte ne olur ve neden?", a: "Yerine yenisi otomatik olarak oluşturulur, çünkü ReplicaSet controller'ı gerçek pod sayısını istenen sayıya (3) karşı sürekli mutabakat eder — silmek sayıyı geçici olarak 2'ye düşürür, bu da hemen bir yedek oluşturarak düzeltilir. Sayıyı kalıcı olarak azaltmak için istenen durumu değiştirmen gerekir: kubectl scale deployment <ad> --replicas=2. Bu, \"sunucuyu sil\" zihin modeline sahip Kubernetes'e yeni mühendisler için yaygın bir kafa karışıklığıdır — istenen-durum-yönetimli bir kaynağın tek bir örneğini silmek nadiren doğru kaldıraçtır." },
              { level: 'basic', q: "qa namespace'ine kapsamlanmış bir NetworkPolicy uyguluyorsun ama bir ClusterRole'ün neden benzer şekilde kapsamlanamadığına kafan karışıyor. Altta yatan ayrım nedir?", a: "Bazı kaynaklar namespace-scoped'dır (Pod'lar, Service'ler, Deployment'lar, NetworkPolicy'ler — bir namespace içinde yaşar, hedeflemek için -n gerekir), diğerleri cluster-scoped'dır (Node'lar, PersistentVolume'lar, ClusterRole'lar, Namespace'lerin kendisi — global olarak var olur, -n'in hiç etkisi yoktur). Bir ClusterRole kasıtlı olarak cluster-scoped'dır çünkü daha sonra belirli namespace'lere (bir RoleBinding aracılığıyla) bağlanabilen yeniden kullanılabilir bir izin seti tanımlar — rol tanımının kendisi bir namespace'in \"içinde\" değildir, ama kullanımı kapsamlanabilir. kubectl api-resources --namespaced=true/false her tipin hangi kategoriye girdiğini listeler." },
              // ── ORTA SEVİYE (ek) ─────────────────────────────────
              { level: 'intermediate', q: "Bir Service, trafiği hangi pod'lara yönlendireceğini nasıl bulur?", a: "Service'ler Label Selector kullanır. Service spec'i \"app: my-app\" gibi bir selector tanımlar. K8s bu etikete uyan pod'ları sürekli izler ve IP'lerini listeleyen bir Endpoints nesnesi tutar. Bir istek Service'e ulaştığında, kube-proxy varsayılan olarak round-robin kullanarak iptables/IPVS kurallarıyla endpoint IP'lerinden birine yönlendirir. Bir pod öldüğünde, endpoint'lerden otomatik olarak çıkarılır." },
              { level: 'intermediate', q: "Bir pod CrashLoopBackOff yerine ImagePullBackOff gösteriyor. Bu çöken bir uygulamadan nasıl farklıdır ve en yaygın kök sebepler nedir?", a: "ImagePullBackOff, Kubernetes'in onu başlatmak için image'ı indiremediği anlamına gelir — uygulama hiç çalışma şansı bulamaz, bu yüzden bu tamamen bir altyapı/registry sorunudur, bir app bug'ı değil. Yaygın sebepler: image adı/tag'inde yazım hatası, image'ın o tag'de gerçekten var olmaması, özel bir registry için eksik/yanlış imagePullSecrets, veya node'un registry'ye network erişiminin olmaması. kubectl describe pod, Events'te kesin pull hatasını gösterir (\"manifest unknown\" vs \"unauthorized\" vs \"no route to host\"), bunun bir yazım hatası, bir auth sorunu mu yoksa bir network sorunu mu olduğunu hemen söyler." },
              { level: 'intermediate', q: "Volume olarak mount edilmiş bir ConfigMap'i güncelliyorsun, uygulamanın yeni config'i alacağını bekliyorsun, ama aynı ConfigMap'ten gelen environment variable'lar dosya değişse bile hiç güncellenmiyor. Bu tutarsızlık neden?", a: "Bir VOLUME olarak mount edilmiş ConfigMap, kubelet tarafından pod'a otomatik senkronize edilir (bir yayılma gecikmesiyle) — uygulama dosyayı izliyorsa ve yeniden yüklüyorsa dosya GERÇEKTEN güncellenir. Bir ENVIRONMENT VARIABLE olarak referans alınan ConfigMap, sadece container BAŞLANGICINDA bir kez enjekte edilir — ConfigMap'i sonradan değiştirmek zaten çalışan container'larda sıfır etkiye sahiptir. Hot-reload edilebilir config için volume olarak mount et ve dosyayı izle; sadece yeniden başlatmada etkili olması yeterli config için env variable'lar daha basittir ama bir rollout restart gerektirir." },
              { level: 'intermediate', q: "Test ortamın yükten bağımsız sabit 3 replica çalıştırıyor, ve yük testleri sadece en ağır senaryolarda kötüleşen yanıt süreleri gösteriyor. Bir HPA bunu nasıl değiştirir ve gerçekte neyi izler?", a: "Bir HPA bir metriği (Metrics Server üzerinden CPU/memory, veya custom metrikler) izler ve o metriği hedefe yakın tutmak için yapılandırılmış min/max arasında replica sayısını otomatik ayarlar. Ağır bir yük senaryosu sırasında, CPU eşiği aşarsa, HPA yükü emmek için replica'ları ölçeklendirir — production'ın gerçek sıçramalar altında yapacağı tam olarak budur. QA için, sabit-replica bir ortama karşı yük testleri, production'ın gerçekte yaşadığından yapay olarak daha kötü bir bozulma gösterebilir — HPA-etkin bir ortama karşı test etmek daha temsili bir resim verir." },
              { level: 'intermediate', q: "Bir pod'un ana container'ı başlamadan önce bir veritabanı migration'ının tamamlanmasını beklemesi gerekiyor, ama bu bekleme mantığını uygulamanın kendi başlangıç koduna gömmek istemiyorsun. Hangi Kubernetes özelliği buna uyar?", a: "Init container'lar pod'un ana container'larından ÖNCE sırayla çalışır, her biri bir sonraki başlamadan önce başarıyla tamamlanmalıdır — \"DB'yi bekle\" veya \"migration çalıştır\" türü kurulum işi için mükemmel, uygulamanın kendi kodundan tamamen ayrı tutulur. Bunları pod spec'inde initContainers: altında tanımla, containers: bölümü gerçek uygulamayı tutarken. Bu, uygulama image'ını sadece uygulamayı çalıştırmaya odaklı tutar, ortama özgü kurulum mantığı ayrı, değiştirilebilir bir init container'da yaşar — aynı uygulama image'ının farklı ortamlarda (QA vs production) farklı kurulum adımlarına ihtiyaç duyduğunda kullanışlıdır." },
              { level: 'intermediate', q: "Test verisinin pod yeniden başlatmalarından ve yeniden zamanlamalardan sağ çıkması gerekiyor, ama bir takım arkadaşı düz bir emptyDir volume oluşturdu ve bir node başarısızlığı pod'u taşıdıktan sonra verinin neden kaybolduğuna kafası karıştı. PersistentVolume ile PersistentVolumeClaim arasındaki gerçek ayrım nedir ve ne kullanmalıydılar?", a: "emptyDir, belirli bir node'daki POD'un yaşam döngüsüne bağlıdır — pod silindiğinde veya farklı bir node'a yeniden zamanlandığında, o depolama gider, ki tam olarak burada olan budur. Bir PersistentVolume (PV), herhangi bir pod'un yaşam döngüsünden bağımsız olarak cluster'da provision edilmiş gerçek bir depolama parçasıdır; bir PersistentVolumeClaim (PVC), bir pod'un belirli kriterlere (boyut, erişim modu) uyan bir PV'ye bağlanma İSTEĞİDİR — bu depolama pod silinmesinden/yeniden zamanlanmasından tamamen sağ çıkar. QA test verisi için düzeltme, emptyDir yerine PVC-destekli bir volume'dur; gerçekten kullan-at scratch alanı için emptyDir gerçekte doğru, kasıtlı seçimdir." },
              { level: 'intermediate', q: "Bir takım arkadaşı, kararlı bir network kimliğine ve replica başına kendi özel depolamasına ihtiyaç duyan bir test PostgreSQL instance'ı için bir Deployment öneriyor. Neden burada bir StatefulSet daha doğru bir seçim olurdu?", a: "Bir Deployment tüm pod replica'larını birbirinin yerine geçebilir gibi muamele eder — pod'lar rastgele isimler alır (app-7d8f9c-x2kpl) ve herhangi bir replica sonuçsuz silinebilir/yeniden oluşturulabilir, bu stateless uygulamalar için harika çalışır ama bir veritabanının genellikle kararlı kimlik hakkında yaptığı varsayımları bozar. Bir StatefulSet her replica'ya kararlı, öngörülebilir bir isim (postgres-0, postgres-1...) ve o belirli ordinal'i yeniden zamanlama boyunca takip eden kararlı bir PersistentVolumeClaim verir — postgres-0 her zaman KENDİ volume'unu geri alır, rastgele atanan birini değil. Kural: stateless, özdeş replica'lar → Deployment; sıralı, ayrı-ayrı-adreslenebilir replica'lar instance-başına depolamayla → StatefulSet." },
              { level: 'intermediate', q: "Takımının ML iş yükleri için ayrılmış GPU'lu birkaç node'u var, ve normal test pod'larının asla orada kazara yer almamasını, AYRICA ML pod'larının GPU'su olmayan normal node'lara zamanlanmamasını sağlaman gerekiyor. Hangi Kubernetes scheduling özellikleri bu çift-yönlü kısıtlamayı çözer?", a: "GPU node'larındaki taint'ler (kubectl taint nodes gpu-node-1 gpu=true:NoSchedule), o taint'i tolere etmeyen herhangi bir pod'u iter — eşleşen bir toleration'ı olmayan normal test pod'ları orada basitçe zamanlanamaz, \"test pod'larını GPU node'larından UZAK tut\" yarısını çözer. Diğer yön için — ML pod'larının ÖZELLİKLE GPU node'larına yerleşmesini sağlamak — ML pod spec'ine sadece GPU node'larının sahip olduğu bir etiketi gerektiren nodeAffinity (veya daha basit bir nodeSelector) ekle. Taint/toleration'lar varsayılan olarak pod'ları node'lardan İTER, affinity pod'ları belirli node'lara doğru ÇEKER/gerektirir — gerçek scheduling kısıtlamalarının çoğu ikisine birden ihtiyaç duyar." },
              { level: 'intermediate', q: "Uzak bir QA cluster'ı içinde çalışan bir servisi, sadece beş dakikalık bir araştırma için dışarıya açmadan lokal makinenden elle vurman gerekiyor. Hızlı, geçici yol nedir?", a: "kubectl port-forward svc/my-service 8080:80, makinendeki localhost:8080'den direkt cluster içindeki servisin 80 portuna geçici bir tünel oluşturur, sadece o kubectl komutu terminalinde çalışırken sürer — cluster yapılandırma değişikliği yok, sonradan temizlenecek yeni bir açık endpoint yok, Ctrl+C dışında hiçbir şey. Gerçek bir Ingress kuralı veya LoadBalancer kurmanın geçici bir ihtiyaç için fazla tören olacağı \"bir şeyi hızlıca kontrol edeyim\" debug'ı için idealdir. Aynı komut belirli bir pod'a karşı da çalışır (kubectl port-forward pod/my-pod 8080:8080), Service'i tamamen baypas edip tam bir instance'a vurman gerektiğinde." },
              { level: 'intermediate', q: "QA takımın, düz Docker container'ları yerine bir Selenium Grid'i (hub + birden fazla browser node'u) test edilen uygulamayla aynı Kubernetes cluster'ı içinde çalıştırmak istiyor. Düz docker compose'da olmayan hangi Kubernetes'e özgü hususlar ortaya çıkar?", a: "Hub bir Deployment + Service olur (böylece test runner'lar bir container adı yerine selenium-hub.qa.svc.cluster.local gibi kararlı bir DNS adıyla ona ulaşır), ve browser node'ları kubectl scale deployment chrome-node --replicas=10 ile bağımsız olarak ölçeklendirebileceğin ayrı bir Deployment olur, hatta bir custom metrik açığa çıkarılırsa grid kuyruk derinliğine göre HPA ile bile otomatik ölçeklenebilir. Resource request/limit'ler her browser node'u için zorunlu hale gelir (Chrome bellek-açlığı çeker), bir ağır test koşumunun aynı node'daki diğer pod'ları açlığa düşürmesini önlemek için, ki bu tek bir dedicated CI kutusundaki docker compose'ın bu kadar şiddetle hiç ilgilenmesi gerekmeyen bir şeydi." },
              { level: 'intermediate', q: "Autoscaling tarafından sonradan eklenenler dahil her tek node'da bir logging/monitoring agent'ına ihtiyacın var, her yeni node'a manuel deploy etmeden. Bu \"node başına bir\" desenine hangi Kubernetes kaynağı uyar?", a: "Bir DaemonSet, cluster'daki (veya etiketli bir alt kümesindeki) her node'da tam olarak bir pod kopyasının otomatik olarak çalışmasını sağlar — cluster autoscaler'ı yeni bir node eklediğinde, DaemonSet controller'ı oraya da otomatik olarak bir kopya zamanlar, hiç manuel müdahale olmadan. Log toplayıcılar, metrik agent'ları ve CNI eklentileri tipik olarak Deployment yerine DaemonSet olarak çalışır, çünkü amaçları içsel olarak \"her node'da var ol\"dur, ki replicas=node-sayısı olan bir Deployment node sayısı değiştikçe bunu native olarak takip edemez." },
              { level: 'intermediate', q: "Bir kez çalışacak bir veritabanı migration'ına ve ayrıca her gece otomatik olarak saat 2'de çalışması gereken bir gece regresyon suite'ine ihtiyacın var. Bu iki ihtiyaca hangi iki Kubernetes kaynağı uyar ve nasıl farklılaşırlar?", a: "Bir Job, bir pod'u tam olarak bir kez tamamlanana çalıştırır, pod başarıyla çıktığında bitmiş sayılır — tek seferlik migration için mükemmel, çünkü çalışmasını, bitmesini ve bir programa göre yeniden başlamamasını istersin. Bir CronJob, bir Job'ı cron-stili bir programla sarmalar (\"0 2 * * *\" her gün saat 2 için), her zamanlanmış zamanda otomatik olarak yeni bir Job instance'ı oluşturur — gece regresyon suite'inin tam ihtiyacı budur. Tek seferlik migration için CronJob kullanmak her gece yeniden tetiklenmesini önlemek için elle silme gerektirir, regresyon suite'i için düz bir Job kullanmak ise Kubernetes'in zaten native sağladığı zamanlama mantığını yeniden icat etmek demektir." },
              { level: 'intermediate', q: "Platform takımın, yama için iş saatlerinde node'ları drain edip yeniden başlatmak istiyor, ama QA bunun bir test ortamının birden fazla replica'sını eşzamanlı öldürüp devam eden test koşumlarını bozacağından kaygılı. Hangi Kubernetes güvencesi bunu direkt çözer?", a: "Bir PodDisruptionBudget (PDB), belirli bir pod kümesi için \"en az N pod çalışır durumda kalmalı\" beyan etmeni sağlar, ve kubectl drain (veya herhangi bir gönüllü kesinti) bu bütçeye uyar — bunu ihlal edecekse bir pod'u tahliye etmeyi reddeder, o pod üzerindeki drain'i güvenli olana kadar etkili bir şekilde duraklatır. Bu sadece GÖNÜLLÜ kesintilere karşı korur (planlı bakım) — gönülsüz olanlara (beklenmedik bir çökme) hiç etkisi yoktur, çünkü sert bir çökmede zarif bir müzakere mümkün değildir. 3-replica'lı bir test ortamında minAvailable: 2 olan bir PDB, bakımın aynı anda 1'den fazla replica'yı asla devre dışı bırakmamasını sağlar." },
              { level: 'intermediate', q: "Bir takımın test suite'i ara sıra düzinelerce kullan-at pod açıyor ve kazara tüm paylaşımlı QA cluster'ının belleğini tüketip diğer takımların namespace'lerini açlığa düşürüyor. Bir namespace'in bunu yapabilmesini nasıl önlersin?", a: "Namespace başına uygulanan bir ResourceQuota, o namespace'in tüm pod'ları birleşik olarak tüketebileceği TOPLAM kaynakları (CPU, memory, pod sayısı) sınırlar — örn. qa-team-a namespace'i için kaç pod oluşturmaya çalışırlarsa çalışsınlar sert bir tavan olarak requests.memory: 16Gi. Bir namespace quota'sına ulaştığında, yeni pod oluşturma diğer her namespace'i sessizce kötüleştirmek yerine açık bir quota-aşıldı hatasıyla başarısız olur. Pod-başına limitler TEK bir pod'un ne yapabileceğini sınırlar; ResourceQuota'lar tüm bir namespace/takımın toplamda ne yapabileceğini sınırlar." },
              { level: 'intermediate', q: "Bir pod çöktü ve yeniden başladı, ve mevcut yeniden başlatmanın loglarını değil (gerçek hatayı göstermek için çok yeni), ÖNCEKİ çökmüş denemenin loglarını görmen gerekiyor. Hangi flag bunu sağlar?", a: "kubectl logs <pod-adı> --previous, son yeniden başlatmasından önceki, hemen önceki container instance'ının loglarını getirir — bir container çöktüğünde, yeniden başladığında ve mevcut deneme henüz hatayı yeniden üretmediğinde önemlidir, çünkü --previous olmadan kubectl logs sadece MEVCUT, yeniden-başlatma-sonrası container'ın çıktısını gösterir. Bu, yeni Kubernetes kullanıcıları için en çok atlanan debug adımlarından biridir: CrashLoopBackOff'tan hemen sonra loglara bakmak genellikle hiçbir işe yaramaz çünkü yeni deneme henüz başladı, --previous ise az önce başarısız olan denemeden gerçek çökme kanıtına sahiptir." },
              { level: 'intermediate', q: "5 farklı test uygulamanın var, her biri kendi subdomain'ine ihtiyaç duyuyor, ama uygulama başına ayrı bir cloud LoadBalancer provision etmek pahalı ve yavaş. Ingress bunu tek bir giriş noktasıyla nasıl çözer?", a: "Bir Ingress kaynağı, trafiği doğru backend Service'e yönlendiren HTTP yönlendirme kurallarını (hostname/path'e göre) tanımlar, TEK bir Ingress Controller (nginx-ingress, Traefik vb.) ve önünde tipik olarak sadece bir LoadBalancer aracılığıyla — host: app-a.qa.internal, app-a'nın Service'ine yönlendirir, host: app-b.qa.internal app-b'ninkine, beşi yerine bir giriş noktasını paylaşarak. Bu, uygulama başına bir cloud LoadBalancer provision etmekten önemli ölçüde daha ucuzdur, ve TLS termination'ı ile path-bazlı yönlendirmeyi tek bir yerde merkezileştirir." },
              { level: 'intermediate', q: "Takımın aynı uygulamayı dev/qa/staging'e biraz farklı ayarlarla deploy etmek için elle 15 neredeyse-özdeş YAML dosyası tutuyor, ve bunları elle senkronize tutmak hataya açık. Helm düz kubectl apply'ın üzerine ne ekler?", a: "Helm, manifestleri şablonlanmış değerlerle (replica sayısı, resource limit'leri, image tag'i {{ .Values.x }} placeholder'ı olur) bir \"chart\" olarak paketler, ve ortam başına bir values.yaml o ortama özgü sayıları sağlar — helm install myapp ./chart -f values-qa.yaml, QA'nın ayarlarıyla tam manifest setini render eder ve uygular, 15 neredeyse-özdeş dosyayı bir chart ve 3 küçük values dosyasıyla değiştirir. Helm ayrıca release'leri birinci sınıf nesneler olarak takip eder (helm rollback tek bir komutla çoklu-kaynaklı bir release'in tamamını geri alır), ki düz kubectl apply'ın bunun için bir eşdeğeri yoktur." },
              // ── İLERİ SEVİYE (ek) ────────────────────────────────
              { level: 'advanced', q: "Bir production pod'u tekrar tekrar OOMKilled durumuyla öldürülüp yeniden başlatılıyor, ama uygulamanın kendi logları öldürülmeden hemen önce hiçbir hata göstermiyor — sadece aniden duruyorlar. Bunun bir memory limit sorunu olduğunu nasıl doğrularsın ve düzeltmeyi nasıl boyutlandırırsın?", a: "kubectl describe pod, Last State'i \"Terminated, Reason: OOMKilled\" ve Exit Code 137 olarak gösterir — bunun kubelet'in memory LİMİTİNİ zorlaması olduğunu, bir app çökmesi olmadığını kesin olarak doğrular, ki loglarda hiçbir şey görünmemesinin sebebi tam olarak budur: process, kernel'in OOM mekanizması tarafından harici olarak öldürüldü, önce hata loglama şansı verilmedi. Düzeltmeyi boyutlandırmak için, kubectl top pod veya Prometheus/Grafana üzerinden tepe yükü içeren temsili bir pencerede gerçek geçmiş kullanımı kontrol et, sonra limiti gözlenen tepenin (ortalamanın değil) rahatça üzerine ayarla — tepeye çok yakın ayarlamak sadece bir sonraki OOMKill'i biraz daha yüksek bir tepeye geciktirir, pay sorununu gerçekten düzeltmez." },
              { level: 'advanced', q: "Güvenlik takımı, \"checkout\" mikroservisinin pod'larının sadece \"frontend\" ve \"api-gateway\" pod'larından trafik kabul etmesini, diğer namespace'lerdekiler dahil her diğer pod'dan geleni reddetmesini istiyor. Bunu network katmanında nasıl zorlarsın?", a: "checkout'un pod'larına uyan bir podSelector ve sadece belirli etiketlere uyan pod'lardan (app: frontend, app: api-gateway) trafiğe izin veren bir ingress kuralı içeren bir NetworkPolicy — varsayılan olarak, HİÇBİR NetworkPolicy olmadan, bir cluster'daki tüm pod'lar namespace'den bağımsız olarak diğer tüm pod'lara ulaşabilir, bu yüzden bu policy kısıtlamayı gerçekte getiren şeydir, sadece uygulama-seviyesi auth'a güvenmek yerine. Kritik olarak, NetworkPolicy'ler zorlamayı destekleyen bir CNI eklentisi gerektirir (Calico, Cilium — hepsi desteklemez, flannel'ın varsayılan modu özellikle desteklemez), bu yüzden doğru bir YAML yazmak, altta yatan network eklentisi onu sessizce görmezden geliyorsa hiçbir şey başarmaz." },
              { level: 'advanced', q: "Takımın gerçekten sıfır-kesinti deploy'lar istiyor, ama readinessProbe yapılandırılmış olsa dahi rolling update ara sıra kısa bir 502 hata sıçramasına neden oluyor. Genellikle eksik olan ne ve readinessProbe ve PDB ile nasıl birleşir?", a: "readinessProbe'un kendi başına bir boşluğu var: bir pod bağlantı kabul etmeye başladığı anda readiness'i geçebilir ama uygulamanın gerçekten iyi trafik işleyebilmesi için cache/bağlantıları ısıtmak için birkaç saniyeye daha ihtiyacı olabilir — ve ESKİ pod, LOAD BALANCER ona yönlendirmeyi tamamen durdurmadan önce (Kubernetes'in bir pod'u not-ready işaretlemesi ile gerçek load balancer/iptables kurallarının güncellenmesi arasında bir yayılma gecikmesi) yıkılırsa, istekler kısaca zaten kapanmakta olan bir pod'a çarpabilir. Düzeltme şunları birleştirir: kısa bir sleep'li bir preStop hook'u (load balancer'a pod'un sonlandığını fark etmesi için zaman vererek), devam eden isteklerin bitmesine izin vermek için ayarlanmış terminationGracePeriodSeconds, VE geçiş sırasında yeterli eski pod'un kalmasını sağlayan bir PodDisruptionBudget. Gerçek sıfır-kesinti, readiness + zarif kapanma zamanlaması + disruption budget'larının birlikteliğidir — tek başına hiçbir mekanizma boşluğu tam kapatmaz." },
              { level: 'advanced', q: "Şirketin, dayanıklılık testi için QA test iş yüklerini iki ayrı Kubernetes cluster'ında (bölge başına bir tane) çalıştırmayı düşünüyor. Tek-cluster QA kurulumunun sahip olmadığı hangi operasyonel karmaşıklığı multi-cluster test getirir?", a: "Cluster'lar-arası servis keşfi önemsiz olmaktan çıkar — A cluster'ındaki bir test runner'ın B cluster'ındaki bir servise ulaşması, multi-cluster destekli bir service mesh (Istio, Linkerd) veya elle açığa çıkarılmış endpoint'ler gerektirir, çünkü Kubernetes'in yerleşik DNS-bazlı servis keşfi varsayılan olarak cluster-local'dır. Konfigürasyon driftı gerçek bir risk olur: iki cluster'ın versiyonları ve CRD'leri, aynı IaC kaynağı (Terraform, Crossplane) ikisine de özdeş uygulanmadıkça sessizce ayrışabilir. QA için özellikle, test sonucu birleştirme de yeniden düşünülmelidir — bir suite kısmen A cluster'ına kısmen B cluster'ına karşı çalışıyorsa birleşik bir raporlama katmanına ihtiyaç duyar, yoksa bir cluster'daki başarısızlıklar gözden kaçabilir." },
              { level: 'advanced', q: "Pod'lar ara sıra dahili servis DNS adlarını çözümleyemiyor, ve aynı istek saniyeler sonra yeniden denemede başarılı oluyor. Bunun bir CoreDNS sorunu mu yoksa bir uygulama networking sorunu mu olduğunu nasıl teşhis edersin?", a: "Önce CoreDNS pod sağlığını/kaynak kullanımını kontrol et — CoreDNS'in cluster-genelindeki DNS sorgu yükü altında CPU-throttle edilmesi veya OOM-restart olması, uygulama açısından tam olarak \"rastgele aralıklı başarısızlıklar\" gibi görünen, yaygın ve genellikle gözden kaçan bir kök sebeptir. cache eklentisinin TTL ayarlarını ve pod'lardaki dnsConfig ndots ayarını kontrol et — yüksek bir ndots değeri (Kubernetes varsayılanı 5) her harici DNS aramasının önce birkaç dahili-domain varyantını da problamasına yol açar, çoğunlukla harici servisleri çağıran uygulamalar için CoreDNS'teki sorgu hacmini ve yükü gereksiz yere çoğaltır. CoreDNS'in kendisi sağlıklı ve throttle edilmemiş görünüyorsa, CoreDNS pod'larının kendisinden çok node-seviyesi DNS çözümlemesinden (kube-proxy/conntrack sorunları, veya NodeLocal DNSCache yokluğu) şüphelen." },
              { level: 'advanced', q: "QA, her açık pull request'in kendi tam izole, otomatik provision edilmiş test ortamını almasını, PR kapandığında otomatik olarak yıkılmasını istiyor. Bunu nasıl mimarileştirirsin?", a: "Her PR bir CI adımını tetikler, bu adım yeni bir namespace oluşturur (pr-1234), o PR'ın manifestlerini ona kapsamlı olarak uygular (genellikle PR numarasıyla parametrelenmiş bir Helm chart'ı), ve PR'a özgü bir hostname'i o namespace'in servislerine yönlendiren bir Ingress kuralı — reviewer'lara ve QA'ya hiç manuel provisioning olmadan PR başına gerçek, tıklanabilir, tam izole bir ortam verir. PR kapanma/merge'de tetiklenen bir temizlik job'ı kubectl delete namespace pr-1234 çalıştırır, bu içindeki her kaynağı otomatik olarak silmeye yayılır, hiç açıkça yıkılmamış PR'lardan terk edilmiş ortamların birikmesini önler. PR namespace'i başına ResourceQuota'lar, düzinelerce PR ortamı eşzamanlı var olabileceğinde herhangi birinin paylaşılan kapasiteyi tekeline almasını önler." },
              { level: 'advanced', q: "QA platform takımın belirli bir annotation'ı izleyip buna göre bir veritabanı instance'ı provision eden özel controller'lar/scriptler yazmaya devam ediyor — esasen Kubernetes-native otomasyonu elle yeniden icat ediyor. Bu türden tekrarlayan özel mantık ne zaman düzgün bir CRD ve Operator inşa etmeyi haklı çıkarır?", a: "Bir CRD, sadece senin özel scriptinin anladığı örtük, belgelenmemiş anlamla mevcut kaynakları annotation'larla aşırı yüklemek yerine, API server'ın kendisi tarafından doğrulanan kendi şemasıyla yeni bir birinci-sınıf Kubernetes kaynak tipi (TestDatabase) tanımlamanı sağlar. Bir Operator, CRD instance'larını izleyen ve onları istenen duruma deklaratif olarak mutabakat eden bir controller'dır — kubectl apply -f testdb.yaml bir TestDatabase nesnesi oluşturur, ve Operator, yerleşik Deployment controller'ının ReplicaSet'leri yönettiği aynı şekilde provisioning, scaling ve yıkımı ele alır. Bu yatırımı haklı çıkaran eşik: mantık birçok takım/ortam arasında yeniden kullanıldığında, yerleşik kaynaklarla aynı yaşam döngüsü titizliğine (uygun status raporlama, temizlik için finalizer'lar, RBAC-kapsamlı izinler) ihtiyaç duyduğunda, ve tek seferlik bir scriptin sürdürülebilir şekilde ele alabileceğinden büyüdüğünde." },
              { level: 'advanced', q: "Birden fazla takım bir Kubernetes cluster'ını paylaşıyor, ve bir takımın iş yükü özellikle başka bir takım ağır bir batch job çalıştırdığında ara sıra yavaşlıyor, ikisinin de doğru CPU/memory request/limit'leri yapılandırılmış olsa dahi. CPU/memory çekişmesinin ötesinde muhtemel bir sebep nedir ve nasıl araştırırsın?", a: "CPU/memory request ve limit'leri, BU LİMİTLERİN KAPSAMADIĞI paylaşılan kaynaklar için çekişmeye karşı korumaz — paylaşılan node'da disk I/O bant genişliği ve network bant genişliği yaygın suçlulardır, çünkü Kubernetes bunları varsayılan olarak ek tooling kullanmadıkça CPU/memory gibi pod-başına throttle etmez. Çekişme penceresi sırasında node-seviyesi metriklerle (disk I/O wait, node başına network throughput) o sırada aynı node'da hangi pod'ların paylaşıldığıyla ilişkilendirerek araştır — yavaş takımın pod'ları batch job ile AYNI node'a denk geliyorsa (bunu önleyen bir anti-affinity yoksa), bu suçludur. Düzeltme genellikle gecikme-hassas iş yüklerini bilinen I/O-yoğun job'ları çalıştıran node'lardan uzak tutan podAntiAffinity'dir." },
              { level: 'advanced', q: "QA servis hesapların şu anda \"başlangıçta kurmak daha kolaydı\" diye cluster-admin izinlerine sahip, ve bir güvenlik denetimi bunu büyük bir risk olarak işaretliyor. RBAC'ı least-privilege QA erişimi için nasıl yeniden tasarlarsın?", a: "QA'nın gerçekten ihtiyaç duyduğu sadece belirli kaynak tiplerinde (kendi namespace'lerindeki pod'lar, deployment'lar, configmap'ler) sadece belirli verb'leri (get, list, watch, create, delete) veren bir Role tanımla — wildcard erişim vermek yerine açıkça listele, çünkü cluster-admin cluster-genelinde her Secret'ı okuyabilme ve RBAC'ın kendisini değiştirebilme yeteneği verir. Bu Role'ü, qa-* namespace'lerine kapsamlanmış bir RoleBinding aracılığıyla QA'nın ServiceAccount'una bağla, ve önce mevcut kullanımı denetle (o ServiceAccount olarak kubectl auth can-i --list) önerilen daha dar Role'ün mevcut meşru bir iş akışını bozmadığını doğrulamak için, sert bir geçiş yerine kademeli bir geçişle." },
              { level: 'advanced', q: "Hem Cluster Autoscaler hem HPA yapılandırılmış, ama yük altında ölçeklenme beklenenden daha yavaş — yeni kapasite görünmeden önce pod'lar fark edilir şekilde Pending kalıyor. Bu iki autoscaler nasıl etkileşir ve muhtemel bottleneck nerede?", a: "HPA önce tepki verir: yükselen metrikleri görür ve replica sayısını artırır, ama mevcut node'larda yer yoksa, o pod'lar Cluster Autoscaler zamanlanamayan pod'ları fark edip yeni bir node provision edene kadar Pending oturur — ve node provisioning (özellikle bir cloud sağlayıcısının yeni bir VM ayağa kaldırması) gerçekten dakikalar sürer, saniyeler değil, ki gözlenen bottleneck budur, autoscaler'lardan birinin yanlış yapılandırması değil. Hafifletmeler: bare minimum'a ölçeklemek yerine biraz hazır pay tut, veya cluster-autoscaler'ın overprovisioning desenini kullan (talep gelmeden önce proaktif node ölçeklendirmeyi tetiklemek için tahliye edilen düşük-öncelikli placeholder pod'lar). Temel gerilim: HPA saniyeler ölçeğinde çalışır, Cluster Autoscaler dakikalar ölçeğinde — yanlış hizalı değiller, sadece gerçekten farklı hızlarda çalışıyorlar." },
              { level: 'advanced', q: "Takımın, test edilen uygulamanın bir pod çökmesinden veya network gecikme sıçramasından mimarinin \"halletmesi gerektiğini\" varsaymak yerine gerçekten zarif bir şekilde kurtulduğunu doğrulamak istiyor. Kubernetes'te chaos testing'i nasıl uygularsın?", a: "Kubernetes-native bir chaos aracı (Chaos Mesh, Litmus) kullanarak başarısızlıkları Kubernetes kaynakları olarak deklaratif şekilde enjekte et — bir PodChaos deneyi bir programa göre bir label selector'a uyan rastgele bir pod'u öldürebilir, bir NetworkChaos deneyi belirli pod'lar arasına gecikme veya paket kaybı enjekte edebilir, hepsi elle kubectl delete pod çalıştırmak yerine cluster'a uygulanan YAML olarak tanımlanır. Değerli test sadece \"hayatta kaldı mı\" değil \"SLA içinde hayatta kaldı mı\"dır — chaos deneylerini mevcut izleme/alerting'inle birleştirerek hata oranlarının ve kurtarma süresinin sınırlar içinde kaldığını doğrula. Chaos deneylerine production'da düşünmeden önce production-olmayan bir cluster'da başla ve blast radius'u sıkı kapsamla." },
              { level: 'advanced', q: "Bir rolling deployment yarı yolda takılı kaldı — kubectl rollout status hem eski hem yeni pod'lar çalışırken süresiz bekliyor. En muhtemel sebep nedir ve nasıl teşhis edip çözersin?", a: "En yaygın sebep YENİ pod'ların readinessProbe'da başarısız olmasıdır — Kubernetes yeniler hazır raporlamadan daha fazla eski pod'u sonlandırmaz, bu yüzden takılı, hazır-olmayan bir yeni pod rollout'u tam gördüğün yerde dondurur. Yeni bir pod'da kubectl describe pod ile teşhis et — Events'teki readinessProbe başarısızlıklarını kontrol et, ve uygulamanın başlangıçta hata verip vermediğini görmek için kubectl logs kullan. Çözmek için: sorunu düzelt ve yeni pod'lar readiness'i geçtiğinde rollout'un otomatik devam etmesine izin ver, veya eski pod'lar hâlâ trafiği sorunsuz sunuyorsa ve düzeltme hızlı değilse hemen geri almak için kubectl rollout undo kullan." },
              { level: 'advanced', q: "Lansmandan altı ay sonra, çoğu pod'un yapılandırılmış limit'lerinin %10-15'ini kullandığını, birkaçının ise sık sık kendilerininkine çarpıp throttle/OOMKilled olduğunu buluyorsun. Tekrar tahmin etmek yerine bu veriye dayanarak cluster-genelinde boyutlandırmaya nasıl yaklaşırsın?", a: "Her iş yükü için tepe trafiği kapsayan çok-haftalık bir pencerede gerçek geçmiş kullanım yüzdeliklerini (sadece ortalamaları değil, p95/p99) çek, çünkü bir anlık ortalama, orijinal tahminlerin muhtemelen kaçırdığı gerçek tepe davranışını kaçırır. Aşırı-provision edilmiş çoğunluk için, request'leri gerçek p95'e doğru düşür (diğer takımların kullanabileceği gerçek kapasiteyi serbest bırakarak, genellikle anlamlı bir cloud maliyet kazancı) limit'leri p99 üzerinde makul bir payla tutarken. Az-provision edilmiş birkaçı için, keyfi büyük bir tahmin yerine gerçek tepeye dayanarak limit'lerini yükselt, ve boyutlandırmayı tek seferlik bir düzeltme yerine tekrarlayan üç-aylık bir gözden geçirme olarak ele al, çünkü kullanım kod ve trafik değiştikçe zamanla kayar." },
            ],
          },
          { type: 'heading', text: 'Hızlı Teknik Bilgiler' },
          {
            type: 'table',
            headers: ['Konu', 'Temel Bilgi'],
            rows: [
              ['Varsayılan Service tipi', 'ClusterIP — yalnızca cluster içinden erişilebilir'],
              ['NodePort aralığı', '30000–32767 — dışarıya açık portlar için sabit aralık'],
              ['etcd quorum', '(N/2)+1 node gerekir — her zaman tek sayı kullan: 3, 5, 7'],
              ['Pod restart policy', 'Always (varsayılan), OnFailure, Never'],
              ['K8s neden "K8s"?', 'K + 8 harf + s = Kubernetes. i18n (internationalization) gibi'],
              ['En küçük deploy birimi', 'Pod (container değil)'],
              ['ConfigMap max boyutu', 'ConfigMap başına 1 MiB'],
              ['Rolling update varsayılanı', 'maxSurge: %25, maxUnavailable: %25'],
            ],
          },
        ],
      },
    ],
  },
}
