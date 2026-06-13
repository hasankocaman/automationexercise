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
          },
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
                fix: 'kubectl logs pod-name --previous  (see crash logs)\nkubectl describe pod pod-name  (see events and exit codes)\nCheck: app startup logs for stack traces, correct environment variables, database connection strings.',
              },
              {
                error: 'ImagePullBackOff / ErrImagePull',
                cause: 'K8s cannot pull the container image. Wrong image name, wrong tag, or registry authentication missing.',
                fix: 'kubectl describe pod pod-name  (see exact error)\nCheck: image name in YAML matches registry exactly\nCreate imagePullSecret for private registries:\nkubectl create secret docker-registry regcred --docker-server=REGISTRY --docker-username=USER --docker-password=PASS',
              },
              {
                error: 'Pending (pod stuck)',
                cause: 'Scheduler cannot place pod on any node. Causes: insufficient CPU/memory, node taints, PVC not bound, node selector mismatch.',
                fix: 'kubectl describe pod pod-name  (look at Events section)\nkubectl get nodes  (check node capacity)\nkubectl describe node node-name  (check Allocatable vs Requests)\nFor local minikube: minikube start --cpus=4 --memory=8192',
              },
              {
                error: 'OOMKilled (exit code 137)',
                cause: 'Container used more memory than its limit. The kernel killed it.',
                fix: 'Increase memory limit in YAML:\nresources:\n  limits:\n    memory: "1Gi"  # Increase from 512Mi\nOr fix memory leak in application code.',
              },
              {
                error: 'connection refused / no endpoints available',
                cause: 'Service cannot reach pods. Pod readiness probe failing, wrong selector labels, or pods not ready.',
                fix: 'kubectl get endpoints service-name  (should list pod IPs)\nkubectl describe svc service-name  (check selector labels)\nEnsure pod labels match service selector exactly.\nkubectl get pods -l app=spring-app  (test selector)',
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
          },
        ],
      },

      // ── BÖLÜM 2: TEMEL KAVRAMLAR ──────────────────────────────────────────
      {
        title: '📦 Temel Kubernetes Kavramları',
        blocks: [
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
                fix: 'kubectl logs pod-name --previous  (crash log\'larına bak)\nkubectl describe pod pod-name  (event\'ları ve çıkış kodlarını gör)\nKontrol et: uygulama startup log\'larındaki stack trace\'ler, doğru environment variable\'lar, database connection string.',
              },
              {
                error: 'ImagePullBackOff / ErrImagePull',
                cause: 'K8s container image\'ını pull edemiyor. Yanlış image adı, yanlış tag veya eksik registry authentication.',
                fix: 'kubectl describe pod pod-name  (tam hatayı gör)\nYAML\'daki image adının registry ile tam eşleştiğini kontrol et\nPrivate registry için imagePullSecret oluştur:\nkubectl create secret docker-registry regcred --docker-server=REGISTRY --docker-username=USER --docker-password=PASS',
              },
              {
                error: 'Pending (pod takılı kalıyor)',
                cause: 'Scheduler, pod\'u hiçbir node\'a yerleştiremedi. Nedenler: yetersiz CPU/memory, node taint\'leri, PVC bağlı değil.',
                fix: 'kubectl describe pod pod-name  (Events bölümüne bak)\nkubectl get nodes  (node kapasitesini kontrol et)\nkubectl describe node node-name  (Allocatable vs Requests)\nminikube için: minikube start --cpus=4 --memory=8192',
              },
              {
                error: 'OOMKilled (çıkış kodu 137)',
                cause: 'Container, bellek limitinden fazla kullandı. Kernel onu sonlandırdı.',
                fix: 'YAML\'da bellek limitini artır:\nresources:\n  limits:\n    memory: "1Gi"  # 512Mi\'dan artır\nVeya uygulamadaki memory leak\'i düzelt.',
              },
              {
                error: 'connection refused / no endpoints available',
                cause: 'Service, pod\'lara ulaşamıyor. Pod readiness probe başarısız, yanlış selector label\'lar veya pod\'lar hazır değil.',
                fix: 'kubectl get endpoints service-name  (pod IP\'lerini listeler)\nkubectl describe svc service-name  (selector label\'ları kontrol et)\nPod label\'larının service selector ile tam eşleştiğinden emin ol.\nkubectl get pods -l app=spring-app  (selector\'ü test et)',
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
