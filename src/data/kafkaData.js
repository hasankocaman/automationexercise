export const kafkaData = {
  en: {
    hero: {
      title: '🟠 Apache Kafka',
      subtitle: 'Distributed Event Streaming for Modern Systems',
      intro: 'Master Apache Kafka from zero to interview level. Learn event-driven architecture, producers, consumers, topics, partitions, and how to test Kafka-based systems — the backbone of LinkedIn, Netflix, and Uber.',
    },
    tabs: ['🎯 Introduction', '⚙️ Installation', '🏗️ Architecture', '📡 Producer & Consumer', '🗂️ Topics & Partitions', '☕ Java & Spring Boot', '🔗 Ecosystem', '🛠️ Real World', '💼 Interview Q&A'],
    sections: [
      // ── SECTION 0: INTRODUCTION ────────────────────────────────────────────
      {
        title: '🎯 What is Apache Kafka?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📰',
            content: 'Kafka is like a massive newspaper publishing system. Publishers (producers) write articles (events/messages). The newspaper company (Kafka broker) stores all articles in organized sections (topics). Thousands of readers (consumers) can read the same articles independently, each at their own pace, and the newspaper keeps all issues for a configured time period.',
          },
          {
            type: 'text',
            content: 'Apache Kafka is a distributed event streaming platform. Originally built at LinkedIn in 2011 to handle 1 trillion messages per day, now open source under Apache. It\'s the backbone of event-driven architectures at Netflix, Uber, Airbnb, and Twitter. Kafka handles real-time data pipelines and streaming applications.',
          },
          { type: 'heading', text: 'Traditional Messaging vs Kafka' },
          {
            type: 'table',
            headers: ['Feature', 'Traditional Queue (RabbitMQ)', 'Kafka'],
            rows: [
              ['Message storage', 'Deleted after consumption', 'Retained for configured period (days/weeks)'],
              ['Consumer model', 'Message consumed by ONE consumer', 'Multiple consumers read SAME message independently'],
              ['Replay', '❌ Cannot replay consumed messages', '✅ Replay from any offset anytime'],
              ['Throughput', 'Thousands/sec', 'Millions of messages/sec'],
              ['Ordering', 'Per queue', 'Per partition (guaranteed)'],
              ['Use case', 'Task queues, work distribution', 'Event streaming, audit logs, real-time analytics'],
            ],
          },
          { type: 'heading', text: 'When to Use Kafka' },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '📊', label: 'Real-Time Analytics', desc: 'Stream clickstream, metrics, logs to dashboards in real-time.' },
              { icon: '🔄', label: 'Event Sourcing', desc: 'Every state change is an event. Rebuild any state by replaying events.' },
              { icon: '🔗', label: 'Microservice Integration', desc: 'Services communicate via events instead of direct API calls.' },
              { icon: '📝', label: 'Audit Logs', desc: 'Immutable log of all actions. "Who changed what and when?"' },
              { icon: '🔁', label: 'Data Pipeline', desc: 'Move data from databases to data warehouses in real-time.' },
              { icon: '🔔', label: 'Notifications', desc: 'Order placed → trigger email, inventory check, analytics simultaneously.' },
            ],
          },
          {
            type: 'quiz',
            question: 'What happens to a Kafka message after it is consumed?',
            options: [
              { id: 'a', text: 'It is immediately deleted from the broker' },
              { id: 'b', text: 'It is moved to a dead-letter queue' },
              { id: 'c', text: 'It remains in the topic until the retention period expires' },
              { id: 'd', text: 'It is archived to disk permanently' },
            ],
            correct: 'c',
            explanation: 'Unlike traditional queues, Kafka retains messages for a configured retention period (default 7 days) regardless of consumption. This allows multiple independent consumers to read the same message, and allows replaying events from any point in time.',
          },
        ],
      },

      // ── SECTION 1: INSTALLATION ───────────────────────────────────────────
      {
        title: '⚙️ Installing Apache Kafka',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'The easiest way to run Kafka locally is Docker Compose — one command starts a complete Kafka + ZooKeeper (or KRaft) cluster. For production, use Confluent Cloud or Kafka on Kubernetes (Strimzi). Never install bare binaries in production — use an operator or managed service.',
          },
          { type: 'heading', text: 'Installation Options Comparison' },
          {
            type: 'table',
            headers: ['Method', 'Complexity', 'Best For'],
            rows: [
              ['Docker Compose', '⭐ Easiest', 'Local development, learning, CI testing'],
              ['KRaft (binary)', '⭐⭐ Medium', 'Kafka 3.x without ZooKeeper dependency'],
              ['Confluent Platform', '⭐⭐ Medium', 'Enterprise local dev with UI, Schema Registry'],
              ['Strimzi on K8s', '⭐⭐⭐ Advanced', 'Production on Kubernetes'],
              ['Confluent Cloud', '⭐ No ops', 'Production managed service (pay-as-you-go)'],
              ['AWS MSK', '⭐⭐ Medium', 'Production on AWS — fully managed'],
            ],
          },
          { type: 'heading', text: 'Option 1: Docker Compose (Recommended for Learning)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Step 1: Install Docker Desktop (prerequisite)',
            code: `# Windows
winget install Docker.DockerDesktop
# After install: start Docker Desktop, ensure it is running (whale icon in taskbar)

# Mac
brew install --cask docker

# Linux
sudo apt-get install -y docker.io docker-compose-plugin
sudo systemctl start docker
sudo usermod -aG docker $USER

# Verify
docker --version
docker compose version`,
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Step 2: Create docker-compose.yml for Kafka',
            code: `# Create a folder: mkdir kafka-local && cd kafka-local
# Create docker-compose.yml:

version: '3.8'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    hostname: zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    hostname: kafka
    container_name: kafka
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"         # For apps running outside Docker
      - "29092:29092"       # For apps running inside Docker
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true'

  kafka-ui:                 # Optional: web UI for Kafka
    image: provectuslabs/kafka-ui:latest
    container_name: kafka-ui
    depends_on:
      - kafka
    ports:
      - "8090:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:29092`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Step 3: Start Kafka and verify',
            code: `# Start all services
docker compose up -d

# Check all containers are running
docker compose ps
# zookeeper   Up   2181/tcp
# kafka       Up   9092/tcp
# kafka-ui    Up   0.0.0.0:8090->8080/tcp

# Open Kafka UI in browser
# http://localhost:8090  ← topic management, messages, consumer groups UI

# ── Create a topic ──────────────────────────────────────────
docker exec kafka kafka-topics \
  --create --topic orders \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1

# List topics
docker exec kafka kafka-topics \
  --list \
  --bootstrap-server localhost:9092

# ── Produce messages ────────────────────────────────────────
docker exec -it kafka kafka-console-producer \
  --bootstrap-server localhost:9092 \
  --topic orders
# Type messages and press Enter. Ctrl+C to stop.
# > {"orderId":1,"product":"laptop","amount":999}
# > {"orderId":2,"product":"phone","amount":499}

# ── Consume messages ────────────────────────────────────────
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic orders \
  --from-beginning

# Stop all services
docker compose down`,
          },
          { type: 'heading', text: 'Option 2: Local Binary Install (Windows/Mac/Linux)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Install Kafka binaries directly',
            code: `# Prerequisites: Java 11+ must be installed
java -version  # Must show version 11 or higher

# Download Kafka (latest stable)
# Go to: https://kafka.apache.org/downloads
# Download: kafka_2.13-3.6.1.tgz (binary)

# Mac/Linux:
wget https://downloads.apache.org/kafka/3.6.1/kafka_2.13-3.6.1.tgz
tar -xzf kafka_2.13-3.6.1.tgz
cd kafka_2.13-3.6.1

# ── Start ZooKeeper ─────────────────────────────────────────
bin/zookeeper-server-start.sh config/zookeeper.properties &

# ── Start Kafka ─────────────────────────────────────────────
bin/kafka-server-start.sh config/server.properties &

# ── Create topic ────────────────────────────────────────────
bin/kafka-topics.sh --create --topic test-topic \
  --bootstrap-server localhost:9092 \
  --partitions 3 --replication-factor 1

# Windows (use .bat files in bin\windows\)
# bin\windows\zookeeper-server-start.bat config\zookeeper.properties
# bin\windows\kafka-server-start.bat config\server.properties`,
          },
          { type: 'heading', text: 'Option 3: KRaft Mode (No ZooKeeper — Kafka 3.x)' },
          {
            type: 'code',
            language: 'bash',
            label: 'KRaft mode — Kafka without ZooKeeper dependency',
            code: `# In Kafka 3.3+, ZooKeeper is optional. KRaft (Kafka Raft) is built-in.
# KRaft docker-compose.yml:

cat > docker-compose-kraft.yml << 'EOF'
version: '3.8'
services:
  kafka:
    image: confluentinc/cp-kafka:7.5.0
    container_name: kafka-kraft
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092'
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka:29093'
      KAFKA_LISTENERS: 'PLAINTEXT://kafka:29092,CONTROLLER://kafka:29093,PLAINTEXT_HOST://0.0.0.0:9092'
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
EOF

docker compose -f docker-compose-kraft.yml up -d
# No ZooKeeper container needed!`,
          },
        ],
      },

      // ── SECTION 2: ARCHITECTURE ────────────────────────────────────────────
      {
        title: '🏗️ Kafka Architecture',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏗️',
            content: 'Kafka is like a distributed bulletin board system. There are multiple bulletin boards (brokers) in different locations. Each board has sections (topics), and each section has numbered slots (partitions). Messages are pinned in order (by offset). Any number of people (consumers) can read any section independently.',
          },
          {
            type: 'diagram-svg',
            title: 'Kafka Cluster Architecture',
            svg: `<svg viewBox="0 0 820 500" xmlns="http://www.w3.org/2000/svg" style="background:#1a0a00;border-radius:16px;width:100%;font-family:JetBrains Mono,monospace">
  <text x="410" y="30" text-anchor="middle" fill="#fb923c" font-size="15" font-weight="bold">🟠 Kafka Cluster Architecture</text>

  <!-- Producers -->
  <rect x="10" y="50" width="130" height="200" rx="12" fill="#1c1917" stroke="#f97316" stroke-width="1.5"/>
  <text x="75" y="74" text-anchor="middle" fill="#fb923c" font-size="11" font-weight="bold">📤 Producers</text>
  <rect x="22" y="84" width="106" height="36" rx="6" fill="#292524" stroke="#f97316" stroke-width="1"/>
  <text x="75" y="100" text-anchor="middle" fill="#fed7aa" font-size="9" font-weight="bold">Order Service</text>
  <text x="75" y="114" text-anchor="middle" fill="#a8a29e" font-size="8">sends order events</text>
  <rect x="22" y="128" width="106" height="36" rx="6" fill="#292524" stroke="#f97316" stroke-width="1"/>
  <text x="75" y="144" text-anchor="middle" fill="#fed7aa" font-size="9" font-weight="bold">Payment Service</text>
  <text x="75" y="158" text-anchor="middle" fill="#a8a29e" font-size="8">sends payment events</text>
  <rect x="22" y="172" width="106" height="36" rx="6" fill="#292524" stroke="#f97316" stroke-width="1"/>
  <text x="75" y="188" text-anchor="middle" fill="#fed7aa" font-size="9" font-weight="bold">User Service</text>
  <text x="75" y="202" text-anchor="middle" fill="#a8a29e" font-size="8">sends user events</text>

  <!-- Arrows Producers → Broker -->
  <line x1="140" y1="102" x2="200" y2="150" stroke="#f97316" stroke-width="1.5"/>
  <line x1="140" y1="146" x2="200" y2="170" stroke="#f97316" stroke-width="1.5"/>
  <line x1="140" y1="190" x2="200" y2="190" stroke="#f97316" stroke-width="1.5"/>
  <polygon points="196,146 204,150 196,154" fill="#f97316"/>
  <polygon points="196,166 204,170 196,174" fill="#f97316"/>
  <polygon points="196,186 204,190 196,194" fill="#f97316"/>

  <!-- Kafka Cluster / Broker -->
  <rect x="200" y="50" width="420" height="310" rx="14" fill="#1c1407" stroke="#f59e0b" stroke-width="2"/>
  <text x="410" y="74" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold">⚡ Kafka Cluster (3 Brokers)</text>

  <!-- Topic: orders -->
  <rect x="215" y="85" width="390" height="82" rx="8" fill="#1a1200" stroke="#d97706" stroke-width="1.5"/>
  <text x="225" y="103" fill="#fbbf24" font-size="10" font-weight="bold">📋 Topic: "orders"</text>
  <!-- Partition 0 -->
  <rect x="215" y="108" width="118" height="52" rx="4" fill="#292105" stroke="#b45309" stroke-width="1"/>
  <text x="274" y="124" text-anchor="middle" fill="#fde68a" font-size="9" font-weight="bold">Partition 0</text>
  <rect x="219" y="128" width="22" height="18" rx="2" fill="#b45309"/>
  <text x="230" y="141" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="243" y="128" width="22" height="18" rx="2" fill="#b45309"/>
  <text x="254" y="141" text-anchor="middle" fill="#fff" font-size="7">1</text>
  <rect x="267" y="128" width="22" height="18" rx="2" fill="#b45309"/>
  <text x="278" y="141" text-anchor="middle" fill="#fff" font-size="7">2</text>
  <rect x="291" y="128" width="22" height="18" rx="2" fill="#d97706"/>
  <text x="302" y="141" text-anchor="middle" fill="#fff" font-size="7">3→</text>
  <!-- Partition 1 -->
  <rect x="341" y="108" width="118" height="52" rx="4" fill="#292105" stroke="#b45309" stroke-width="1"/>
  <text x="400" y="124" text-anchor="middle" fill="#fde68a" font-size="9" font-weight="bold">Partition 1</text>
  <rect x="345" y="128" width="22" height="18" rx="2" fill="#b45309"/>
  <text x="356" y="141" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="369" y="128" width="22" height="18" rx="2" fill="#b45309"/>
  <text x="380" y="141" text-anchor="middle" fill="#fff" font-size="7">1</text>
  <rect x="417" y="128" width="22" height="18" rx="2" fill="#d97706"/>
  <text x="428" y="141" text-anchor="middle" fill="#fff" font-size="7">2→</text>
  <!-- Partition 2 -->
  <rect x="467" y="108" width="130" height="52" rx="4" fill="#292105" stroke="#b45309" stroke-width="1"/>
  <text x="532" y="124" text-anchor="middle" fill="#fde68a" font-size="9" font-weight="bold">Partition 2</text>
  <rect x="471" y="128" width="22" height="18" rx="2" fill="#b45309"/>
  <text x="482" y="141" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="495" y="128" width="22" height="18" rx="2" fill="#b45309"/>
  <text x="506" y="141" text-anchor="middle" fill="#fff" font-size="7">1</text>
  <rect x="519" y="128" width="22" height="18" rx="2" fill="#b45309"/>
  <text x="530" y="141" text-anchor="middle" fill="#fff" font-size="7">2</text>
  <rect x="543" y="128" width="22" height="18" rx="2" fill="#b45309"/>
  <text x="554" y="141" text-anchor="middle" fill="#fff" font-size="7">3</text>
  <rect x="567" y="128" width="22" height="18" rx="2" fill="#d97706"/>
  <text x="578" y="141" text-anchor="middle" fill="#fff" font-size="7">4→</text>

  <!-- Topic: payments -->
  <rect x="215" y="178" width="390" height="68" rx="8" fill="#001a1a" stroke="#0891b2" stroke-width="1.5"/>
  <text x="225" y="196" fill="#22d3ee" font-size="10" font-weight="bold">📋 Topic: "payments"</text>
  <rect x="215" y="200" width="185" height="40" rx="4" fill="#0c2a2a" stroke="#0e7490" stroke-width="1"/>
  <text x="307" y="216" text-anchor="middle" fill="#67e8f9" font-size="9" font-weight="bold">Partition 0</text>
  <rect x="220" y="220" width="22" height="14" rx="2" fill="#0e7490"/>
  <text x="231" y="231" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="244" y="220" width="22" height="14" rx="2" fill="#0e7490"/>
  <text x="255" y="231" text-anchor="middle" fill="#fff" font-size="7">1</text>
  <rect x="268" y="220" width="22" height="14" rx="2" fill="#06b6d4"/>
  <text x="279" y="231" text-anchor="middle" fill="#fff" font-size="7">2→</text>
  <rect x="410" y="200" width="185" height="40" rx="4" fill="#0c2a2a" stroke="#0e7490" stroke-width="1"/>
  <text x="502" y="216" text-anchor="middle" fill="#67e8f9" font-size="9" font-weight="bold">Partition 1</text>
  <rect x="415" y="220" width="22" height="14" rx="2" fill="#0e7490"/>
  <text x="426" y="231" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="463" y="220" width="22" height="14" rx="2" fill="#06b6d4"/>
  <text x="474" y="231" text-anchor="middle" fill="#fff" font-size="7">1→</text>

  <!-- Brokers row -->
  <text x="410" y="267" text-anchor="middle" fill="#6b7280" font-size="9">Replicated across brokers for fault tolerance</text>
  <rect x="220" y="272" width="100" height="30" rx="6" fill="#1c1917" stroke="#78716c" stroke-width="1"/>
  <text x="270" y="291" text-anchor="middle" fill="#d6d3d1" font-size="9" font-weight="bold">Broker 1 (Leader)</text>
  <rect x="350" y="272" width="100" height="30" rx="6" fill="#1c1917" stroke="#78716c" stroke-width="1"/>
  <text x="400" y="291" text-anchor="middle" fill="#d6d3d1" font-size="9" font-weight="bold">Broker 2</text>
  <rect x="480" y="272" width="100" height="30" rx="6" fill="#1c1917" stroke="#78716c" stroke-width="1"/>
  <text x="530" y="291" text-anchor="middle" fill="#d6d3d1" font-size="9" font-weight="bold">Broker 3</text>

  <!-- ZooKeeper / KRaft -->
  <rect x="215" y="312" width="390" height="36" rx="6" fill="#1a0a1a" stroke="#7c3aed" stroke-width="1"/>
  <text x="410" y="327" text-anchor="middle" fill="#a78bfa" font-size="9" font-weight="bold">⚙️ ZooKeeper / KRaft — Cluster Coordination (leader election, metadata)</text>
  <text x="410" y="341" text-anchor="middle" fill="#7c3aed" font-size="8">KRaft mode (Kafka 3.x+) removes ZooKeeper dependency</text>

  <!-- Arrows Broker → Consumers -->
  <line x1="620" y1="150" x2="680" y2="130" stroke="#10b981" stroke-width="1.5"/>
  <line x1="620" y1="170" x2="680" y2="190" stroke="#10b981" stroke-width="1.5"/>
  <line x1="620" y1="220" x2="680" y2="260" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="676,126 684,130 676,134" fill="#10b981"/>
  <polygon points="676,186 684,190 676,194" fill="#10b981"/>
  <polygon points="676,256 684,260 676,264" fill="#10b981"/>

  <!-- Consumers -->
  <rect x="680" y="50" width="130" height="320" rx="12" fill="#022c22" stroke="#10b981" stroke-width="1.5"/>
  <text x="745" y="74" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">📥 Consumers</text>
  <rect x="692" y="84" width="106" height="48" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1"/>
  <text x="745" y="100" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Notification Svc</text>
  <text x="745" y="113" text-anchor="middle" fill="#a7f3d0" font-size="8">Consumer Group A</text>
  <text x="745" y="125" text-anchor="middle" fill="#a7f3d0" font-size="7">offset: 3 (part 0)</text>
  <rect x="692" y="140" width="106" height="48" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1"/>
  <text x="745" y="156" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Analytics Svc</text>
  <text x="745" y="169" text-anchor="middle" fill="#a7f3d0" font-size="8">Consumer Group B</text>
  <text x="745" y="181" text-anchor="middle" fill="#a7f3d0" font-size="7">offset: 2 (part 0)</text>
  <rect x="692" y="196" width="106" height="48" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1"/>
  <text x="745" y="212" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Inventory Svc</text>
  <text x="745" y="225" text-anchor="middle" fill="#a7f3d0" font-size="8">Consumer Group C</text>
  <text x="745" y="237" text-anchor="middle" fill="#a7f3d0" font-size="7">offset: 1 (part 0)</text>
  <rect x="692" y="252" width="106" height="48" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1"/>
  <text x="745" y="268" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Audit Logger</text>
  <text x="745" y="281" text-anchor="middle" fill="#a7f3d0" font-size="8">Consumer Group D</text>
  <text x="745" y="293" text-anchor="middle" fill="#a7f3d0" font-size="7">offset: 3 (part 0)</text>

  <!-- Key insight -->
  <rect x="10" y="380" width="800" height="110" rx="12" fill="#1a0a00" stroke="#f97316" stroke-width="1"/>
  <text x="410" y="402" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold">🔑 Key Insight: Each Consumer Group reads INDEPENDENTLY</text>
  <text x="410" y="422" text-anchor="middle" fill="#fed7aa" font-size="10">One "orders" event → simultaneously consumed by Notification, Analytics, Inventory, AND Audit services</text>
  <text x="410" y="440" text-anchor="middle" fill="#a8a29e" font-size="9">Each group tracks its OWN offset — they never interfere with each other</text>
  <text x="410" y="458" text-anchor="middle" fill="#a8a29e" font-size="9">Messages stay in the topic until retention period expires — not until consumed</text>
  <text x="410" y="476" text-anchor="middle" fill="#78716c" font-size="8">This is the fundamental difference from traditional message queues like RabbitMQ</text>
</svg>`,
          },
          { type: 'heading', text: 'Core Kafka Components' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🖥️', label: 'Broker', desc: 'A Kafka server. A cluster typically has 3+ brokers for high availability. Each broker stores partitions and serves producer/consumer requests. One broker per partition is the "leader" — others are replicas.' },
              { icon: '📋', label: 'Topic', desc: 'A named feed/category of messages. Like a table in a database but append-only. Topics are split into partitions for parallelism and scalability. Retention: messages kept for configured period (default 7 days).' },
              { icon: '🗂️', label: 'Partition', desc: 'An ordered, immutable log of messages. Each message gets a sequential offset (0, 1, 2...). Partitions enable parallelism — different consumers can read different partitions simultaneously.' },
              { icon: '📌', label: 'Offset', desc: 'A unique sequential ID for each message within a partition. Consumer tracks which offset it\'s read up to. Allows replaying from any point: "replay from offset 0" = reprocess all messages.' },
              { icon: '📤', label: 'Producer', desc: 'Application that writes messages to a topic. Chooses which partition to write to (by key hash, round-robin, or custom). Can wait for acknowledgment: acks=0 (fire-forget), acks=1 (leader), acks=all (all replicas).' },
              { icon: '📥', label: 'Consumer', desc: 'Application that reads messages from a topic. Tracks offset to know where it left off. Part of a Consumer Group for parallel consumption. Multiple groups can read same topic independently.' },
            ],
          },
          {
            type: 'quiz',
            question: 'What is a Kafka Offset?',
            options: [
              { id: 'a', text: 'The size of a Kafka message in bytes' },
              { id: 'b', text: 'A unique sequential ID for a message within a partition' },
              { id: 'c', text: 'The number of replicas for a topic' },
              { id: 'd', text: 'The network delay between broker and consumer' },
            ],
            correct: 'b',
            explanation: 'An offset is a unique, sequential integer ID assigned to each message within a partition (0, 1, 2, 3...). Consumers track their current offset to know which messages they\'ve read. This allows replaying from any point: setting offset to 0 replays all messages from the beginning.',
          },
        ],
      },

      // ── SECTION 2: PRODUCER & CONSUMER ─────────────────────────────────────
      {
        title: '📡 Producer & Consumer',
        blocks: [
          { type: 'heading', text: 'Producer — Writing Messages' },
          {
            type: 'simple-box',
            emoji: '📤',
            content: 'A Producer is like a journalist writing articles. The journalist (producer) writes an article (message), specifies the section (topic), and optionally the column (partition via key). The newspaper company (broker) stores it. The journalist doesn\'t care who reads it — that\'s the consumer\'s job.',
          },
          {
            type: 'code',
            language: 'java',
            label: 'Java Producer — Send a message',
            code: `import org.apache.kafka.clients.producer.*;
import java.util.Properties;

public class OrderProducer {
    public static void main(String[] args) throws Exception {
        // 1. Configure the producer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");  // Kafka broker address
        props.put("key.serializer",   "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        // acks=all: wait for ALL replicas to confirm (safest, slower)
        props.put("acks", "all");
        // Retry up to 3 times on transient failures
        props.put("retries", 3);

        KafkaProducer<String, String> producer = new KafkaProducer<>(props);

        // 2. Create a message (record)
        ProducerRecord<String, String> record = new ProducerRecord<>(
            "orders",                    // topic name
            "user-123",                  // key (determines partition)
            "{\"orderId\":\"ORD-456\"}"  // value (the actual message)
        );

        // 3. Send asynchronously with callback
        producer.send(record, (metadata, exception) -> {
            if (exception == null) {
                System.out.printf("✅ Sent to topic=%s, partition=%d, offset=%d%n",
                    metadata.topic(), metadata.partition(), metadata.offset());
            } else {
                System.err.println("❌ Error: " + exception.getMessage());
            }
        });

        producer.flush();   // Ensure all buffered messages are sent
        producer.close();   // Release resources
    }
}`,
          },
          {
            type: 'callout',
            color: 'blue',
            emoji: '🔑',
            title: 'Key → Partition Routing',
            content: 'The message KEY determines which partition it goes to: hash(key) % numPartitions. Same key always goes to same partition → guarantees ordering for related messages. Example: key="user-123" — all orders for user 123 go to the same partition, so they\'re processed in order. No key → round-robin across partitions.',
          },
          { type: 'heading', text: 'Consumer — Reading Messages' },
          {
            type: 'code',
            language: 'java',
            label: 'Java Consumer — Read messages in a loop',
            code: `import org.apache.kafka.clients.consumer.*;
import java.time.Duration;
import java.util.*;

public class OrderConsumer {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "order-processing-group");   // Consumer Group ID
        props.put("key.deserializer",   "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        // auto.offset.reset: what to do when no offset exists for this group
        // "earliest" = start from beginning, "latest" = only new messages
        props.put("auto.offset.reset", "earliest");
        // enable.auto.commit: automatically commit offset after each poll
        props.put("enable.auto.commit", "true");

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

        // Subscribe to a topic
        consumer.subscribe(Collections.singletonList("orders"));

        try {
            while (true) {
                // Poll for new messages, wait up to 100ms
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

                for (ConsumerRecord<String, String> record : records) {
                    System.out.printf(
                        "📩 topic=%s, partition=%d, offset=%d, key=%s, value=%s%n",
                        record.topic(), record.partition(), record.offset(),
                        record.key(), record.value()
                    );
                    // Process the order...
                    processOrder(record.value());
                }
            }
        } finally {
            consumer.close();
        }
    }
}`,
          },
          { type: 'heading', text: 'Consumer Groups — Parallel Processing' },
          {
            type: 'text',
            content: 'A Consumer Group allows multiple consumer instances to share the work of reading a topic. Each partition is assigned to exactly ONE consumer within a group. This enables horizontal scaling: 3 partitions + 3 consumers = each consumer handles 1 partition in parallel.',
          },
          {
            type: 'diagram-svg',
            title: 'Consumer Group Partition Assignment',
            svg: `<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" style="background:#022c22;border-radius:12px;width:100%;font-family:JetBrains Mono,monospace">
  <text x="350" y="26" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">Consumer Group: "order-processing-group"</text>
  <!-- Topic -->
  <rect x="10" y="40" width="680" height="58" rx="8" fill="#1c1917" stroke="#f97316" stroke-width="1.5"/>
  <text x="350" y="58" text-anchor="middle" fill="#fb923c" font-size="10" font-weight="bold">Topic: "orders" — 3 Partitions</text>
  <rect x="20" y="64" width="200" height="26" rx="4" fill="#292105" stroke="#d97706" stroke-width="1"/>
  <text x="120" y="81" text-anchor="middle" fill="#fde68a" font-size="9">Partition 0 [0,1,2,3,4,5]</text>
  <rect x="240" y="64" width="200" height="26" rx="4" fill="#292105" stroke="#d97706" stroke-width="1"/>
  <text x="340" y="81" text-anchor="middle" fill="#fde68a" font-size="9">Partition 1 [0,1,2,3]</text>
  <rect x="460" y="64" width="220" height="26" rx="4" fill="#292105" stroke="#d97706" stroke-width="1"/>
  <text x="570" y="81" text-anchor="middle" fill="#fde68a" font-size="9">Partition 2 [0,1,2,3,4,5,6]</text>

  <!-- Lines to consumers -->
  <line x1="120" y1="90" x2="120" y2="140" stroke="#10b981" stroke-width="2"/>
  <line x1="340" y1="90" x2="340" y2="140" stroke="#10b981" stroke-width="2"/>
  <line x1="570" y1="90" x2="570" y2="140" stroke="#10b981" stroke-width="2"/>
  <polygon points="116,136 120,144 124,136" fill="#10b981"/>
  <polygon points="336,136 340,144 344,136" fill="#10b981"/>
  <polygon points="566,136 570,144 574,136" fill="#10b981"/>

  <!-- Consumers -->
  <rect x="20" y="144" width="200" height="52" rx="8" fill="#052e16" stroke="#10b981" stroke-width="1.5"/>
  <text x="120" y="164" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">🖥️ Consumer Instance 1</text>
  <text x="120" y="178" text-anchor="middle" fill="#a7f3d0" font-size="8">Reads Partition 0 only</text>
  <text x="120" y="190" text-anchor="middle" fill="#34d399" font-size="8">current offset: 5</text>
  <rect x="240" y="144" width="200" height="52" rx="8" fill="#052e16" stroke="#10b981" stroke-width="1.5"/>
  <text x="340" y="164" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">🖥️ Consumer Instance 2</text>
  <text x="340" y="178" text-anchor="middle" fill="#a7f3d0" font-size="8">Reads Partition 1 only</text>
  <text x="340" y="190" text-anchor="middle" fill="#34d399" font-size="8">current offset: 3</text>
  <rect x="460" y="144" width="220" height="52" rx="8" fill="#052e16" stroke="#10b981" stroke-width="1.5"/>
  <text x="570" y="164" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">🖥️ Consumer Instance 3</text>
  <text x="570" y="178" text-anchor="middle" fill="#a7f3d0" font-size="8">Reads Partition 2 only</text>
  <text x="570" y="190" text-anchor="middle" fill="#34d399" font-size="8">current offset: 6</text>

  <!-- Notes -->
  <rect x="10" y="210" width="680" height="60" rx="8" fill="#1a0a00" stroke="#f97316" stroke-width="1"/>
  <text x="350" y="230" text-anchor="middle" fill="#fb923c" font-size="10" font-weight="bold">⚠️ Rules of Consumer Groups</text>
  <text x="350" y="248" text-anchor="middle" fill="#fed7aa" font-size="9">1 partition → at most 1 consumer per group | If consumers > partitions → some consumers idle</text>
  <text x="350" y="264" text-anchor="middle" fill="#a8a29e" font-size="8">Consumer crash → group rebalance → other consumers take over orphaned partitions</text>
</svg>`,
          },
          {
            type: 'quiz',
            question: 'If a Kafka topic has 3 partitions and a consumer group has 5 consumers, what happens?',
            options: [
              { id: 'a', text: 'All 5 consumers share each partition' },
              { id: 'b', text: '3 consumers read 1 partition each, 2 consumers remain idle' },
              { id: 'c', text: 'Kafka automatically creates 2 more partitions' },
              { id: 'd', text: 'Error — cannot have more consumers than partitions' },
            ],
            correct: 'b',
            explanation: 'Each partition can only be assigned to ONE consumer within a group. With 3 partitions and 5 consumers, 3 consumers get one partition each, and 2 consumers sit idle. To increase parallelism, increase the number of partitions (but you cannot decrease partitions without deleting the topic).',
          },
        ],
      },

      // ── SECTION 3: TOPICS & PARTITIONS ─────────────────────────────────────
      {
        title: '🗂️ Topics & Partitions Deep Dive',
        blocks: [
          { type: 'heading', text: 'Topic Configuration' },
          {
            type: 'code',
            language: 'bash',
            label: 'Kafka CLI — create and manage topics',
            code: `# Create a topic with 3 partitions and replication factor 3
kafka-topics.sh --bootstrap-server localhost:9092 \
  --create \
  --topic orders \
  --partitions 3 \
  --replication-factor 3

# List all topics
kafka-topics.sh --bootstrap-server localhost:9092 --list

# Describe topic details (partitions, replicas, leader)
kafka-topics.sh --bootstrap-server localhost:9092 \
  --describe --topic orders

# Output example:
# Topic: orders   PartitionCount: 3   ReplicationFactor: 3
# Partition: 0   Leader: 1   Replicas: 1,2,3   Isr: 1,2,3
# Partition: 1   Leader: 2   Replicas: 2,3,1   Isr: 2,3,1
# Partition: 2   Leader: 3   Replicas: 3,1,2   Isr: 3,1,2

# Delete a topic (careful in production!)
kafka-topics.sh --bootstrap-server localhost:9092 \
  --delete --topic test-topic`,
          },
          { type: 'heading', text: 'Replication — Fault Tolerance' },
          {
            type: 'simple-box',
            emoji: '🔁',
            content: 'Replication factor = how many copies of each partition exist across brokers. replication-factor=3 means each partition has 1 leader and 2 followers. If a broker dies, one follower becomes the new leader automatically. Rule of thumb: replication factor = number of brokers (minimum 3 in production).',
          },
          {
            type: 'table',
            headers: ['Config', 'Description', 'Recommendation'],
            rows: [
              ['replication.factor', 'How many copies of each partition', 'Production: 3 (tolerates 2 broker failures)'],
              ['min.insync.replicas', 'Min replicas that must ack a write', 'Set to 2 with acks=all for durability'],
              ['retention.ms', 'How long to keep messages', '7 days (604800000) default; increase for replay needs'],
              ['retention.bytes', 'Max size of a partition', '-1 (unlimited); set for disk management'],
              ['compression.type', 'Message compression', 'lz4 or snappy for throughput; gzip for ratio'],
              ['cleanup.policy', 'delete vs compact', 'delete (default): remove old; compact: keep latest per key'],
            ],
          },
          { type: 'heading', text: 'Log Compaction' },
          {
            type: 'text',
            content: 'With cleanup.policy=compact, Kafka keeps only the LATEST message per key. Useful for "current state" topics: user profile updates, config changes. Example: 5 updates to user-123 profile → compacted topic keeps only the latest. This makes Kafka behave like a key-value store.',
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Produce and consume from command line (for testing)',
            code: `# Start a console producer — type messages, press Enter to send
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic orders \
  --property "parse.key=true" \
  --property "key.separator=:"
# Type:  user-123:{"orderId":"ORD-1","item":"Book"}
# Type:  user-456:{"orderId":"ORD-2","item":"Laptop"}

# Start a console consumer — read from beginning
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic orders \
  --from-beginning \
  --property "print.key=true" \
  --property "print.timestamp=true"

# Consumer with specific group
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic orders \
  --group test-group \
  --from-beginning

# Check consumer group lag (how far behind is the consumer?)
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --describe --group order-processing-group`,
          },
        ],
      },

      // ── SECTION 4: JAVA & SPRING BOOT ──────────────────────────────────────
      {
        title: '☕ Java & Spring Boot Integration',
        blocks: [
          {
            type: 'simple-box',
            emoji: '☕',
            content: 'Spring Kafka wraps the raw Kafka client with Spring Boot\'s auto-configuration magic. Instead of writing 30 lines of producer/consumer setup, you add @KafkaListener and @EnableKafka annotations and Spring handles the rest. Perfect for microservices.',
          },
          { type: 'heading', text: 'Spring Boot Setup' },
          {
            type: 'code',
            language: 'xml',
            label: 'pom.xml — Add Spring Kafka dependency',
            code: `<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
    <!-- version managed by Spring Boot parent -->
</dependency>

<!-- For JSON serialization (optional but common) -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>`,
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'application.yml — Kafka configuration',
            code: `spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
      acks: all
      retries: 3
    consumer:
      group-id: order-service-group
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      auto-offset-reset: earliest
      properties:
        spring.json.trusted.packages: "com.example.events"`,
          },
          {
            type: 'code',
            language: 'java',
            label: 'Spring Boot Producer — Send events',
            code: `@Service
public class OrderEventProducer {

    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public OrderEventProducer(KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendOrderCreated(Order order) {
        OrderEvent event = new OrderEvent(
            order.getId(),
            order.getUserId(),
            "ORDER_CREATED",
            order.getTotal()
        );

        // key = userId ensures all events for same user go to same partition
        kafkaTemplate.send("orders", order.getUserId(), event)
            .whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("✅ Sent order event: partition={}, offset={}",
                        result.getRecordMetadata().partition(),
                        result.getRecordMetadata().offset());
                } else {
                    log.error("❌ Failed to send: {}", ex.getMessage());
                }
            });
    }
}`,
          },
          {
            type: 'code',
            language: 'java',
            label: 'Spring Boot Consumer — @KafkaListener',
            code: `@Service
public class OrderEventConsumer {

    // @KafkaListener replaces the entire poll loop from raw Kafka API
    @KafkaListener(
        topics = "orders",
        groupId = "notification-service-group",
        containerFactory = "kafkaListenerContainerFactory"
    )
    public void handleOrderCreated(
            @Payload OrderEvent event,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            @Header(KafkaHeaders.OFFSET) long offset) {

        log.info("📩 Received event: {} from partition={}, offset={}",
            event, partition, offset);

        // Process the event
        if ("ORDER_CREATED".equals(event.getType())) {
            notificationService.sendConfirmationEmail(event.getUserId());
        }
    }

    // Handle multiple topics
    @KafkaListener(topics = {"orders", "payments"}, groupId = "audit-group")
    public void auditAllEvents(ConsumerRecord<String, String> record) {
        auditLog.save(record.topic(), record.key(), record.value());
    }
}`,
          },
          { type: 'heading', text: 'Testing Kafka with Spring Boot' },
          {
            type: 'code',
            language: 'java',
            label: 'Unit testing Kafka with @EmbeddedKafka',
            code: `@SpringBootTest
@EmbeddedKafka(
    partitions = 1,
    topics = {"orders"},
    brokerProperties = {"listeners=PLAINTEXT://localhost:9093",
                        "port=9093"}
)
class OrderEventConsumerTest {

    @Autowired
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;

    @Autowired
    private OrderEventConsumer consumer;  // the class we're testing

    @Test
    void shouldProcessOrderCreatedEvent() throws Exception {
        // Arrange
        OrderEvent event = new OrderEvent("ORD-1", "user-123", "ORDER_CREATED", 99.99);
        CountDownLatch latch = new CountDownLatch(1);

        // Act — send a test event
        kafkaTemplate.send("orders", "user-123", event);

        // Assert — wait up to 5 seconds for consumer to process
        boolean processed = latch.await(5, TimeUnit.SECONDS);
        assertTrue(processed, "Consumer did not process message within 5s");

        // Verify side effects
        verify(notificationService).sendConfirmationEmail("user-123");
    }
}`,
          },
          {
            type: 'callout',
            color: 'green',
            emoji: '🧪',
            title: 'QA Testing Strategy for Kafka',
            content: '1) @EmbeddedKafka for unit/integration tests — no external Kafka needed. 2) Testcontainers for full integration tests — spins up a real Kafka Docker container. 3) Consumer Group Lag monitoring in production — if lag grows, consumers are behind. 4) Dead Letter Topic (DLT) — failed messages routed to orders.DLT for inspection.',
          },
        ],
      },

      // ── SECTION 5: INTERVIEW Q&A ───────────────────────────────────────────
      {
        title: '🔗 Kafka Ecosystem & Integrations',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔗',
            content: 'Kafka is the event bus of the modern data ecosystem. It connects microservices (Spring Boot), processes streams (Kafka Streams), stores schemas (Schema Registry), syncs databases (Debezium CDC), and runs on Kubernetes (Strimzi). Understanding these integrations is critical for Senior QA and Backend Engineer interviews.',
          },
          { type: 'heading', text: 'Kafka vs Other Messaging Systems' },
          {
            type: 'table',
            headers: ['Feature', 'Kafka', 'RabbitMQ', 'ActiveMQ'],
            rows: [
              ['Model', 'Log-based pub/sub', 'Queue + pub/sub', 'Queue (JMS)'],
              ['Message retention', '✅ Configurable (days/weeks)', '❌ Deleted after ACK', '❌ Deleted after ACK'],
              ['Replay', '✅ Replay from any offset', '❌ No replay', '❌ No replay'],
              ['Throughput', '✅ Millions/sec', '⚠️ Thousands/sec', '⚠️ Thousands/sec'],
              ['Consumer groups', '✅ Built-in, parallel', '⚠️ Competing consumers', '⚠️ Competing consumers'],
              ['Best for', 'Event streaming, audit log, CDC', 'Task queues, RPC', 'Legacy Java enterprise'],
              ['Java integration', 'Spring Kafka, native API', 'Spring AMQP', 'Spring JMS'],
            ],
          },
          { type: 'heading', text: 'Kafka + Spring Boot: Full Integration' },
          {
            type: 'text',
            content: 'Spring Boot + Spring Kafka is the most common Kafka integration in Java enterprise. Like JPA abstracts JDBC, Spring Kafka abstracts the raw Kafka Producer/Consumer API. Key annotations: @KafkaListener (consumer), KafkaTemplate (producer), @EnableKafka (config).',
          },
          {
            type: 'code',
            language: 'xml',
            label: 'pom.xml — Spring Kafka dependency',
            code: `<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
    <!-- Version managed by Spring Boot parent -->
</dependency>

<!-- For testing with embedded Kafka -->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka-test</artifactId>
    <scope>test</scope>
</dependency>`,
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'application.yml — Spring Kafka configuration',
            code: `spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: order-service-group
      auto-offset-reset: earliest    # Start from beginning if no committed offset
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      properties:
        spring.json.trusted.packages: "com.example.dto"
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer`,
          },
          {
            type: 'code',
            language: 'java',
            label: 'Spring Kafka Producer + Consumer — complete example',
            code: `// ── PRODUCER: OrderProducer.java ───────────────────────────
@Service
public class OrderProducer {

    @Autowired
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public void sendOrder(Order order) {
        OrderEvent event = new OrderEvent(order.getId(), "ORDER_PLACED", order);

        // Send to topic with key (ensures same orderId goes to same partition)
        kafkaTemplate.send("orders", order.getId().toString(), event)
            .whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("Sent order {} to partition {} offset {}",
                        order.getId(),
                        result.getRecordMetadata().partition(),
                        result.getRecordMetadata().offset());
                } else {
                    log.error("Failed to send order {}: {}", order.getId(), ex.getMessage());
                }
            });
    }
}

// ── CONSUMER: InventoryConsumer.java ───────────────────────
@Component
public class InventoryConsumer {

    // Listens to "orders" topic — part of "inventory-service" consumer group
    @KafkaListener(topics = "orders", groupId = "inventory-service")
    public void handleOrder(
            @Payload OrderEvent event,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            @Header(KafkaHeaders.OFFSET) long offset) {

        log.info("Received order {} from partition {} offset {}",
            event.getOrderId(), partition, offset);

        try {
            inventoryService.reserveStock(event.getOrder());
        } catch (InsufficientStockException e) {
            // Publish to compensating topic (Saga pattern)
            orderProducer.send("orders-failed", event.getOrderId().toString(),
                new OrderFailedEvent(event.getOrderId(), "INSUFFICIENT_STOCK"));
        }
    }
}

// ── TEST: @EmbeddedKafka ──────────────────────────────────
@SpringBootTest
@EmbeddedKafka(partitions = 1, topics = {"orders", "orders-failed"})
class OrderIntegrationTest {

    @Autowired OrderProducer producer;

    @Autowired
    @Qualifier("testConsumer")
    Consumer<String, OrderEvent> testConsumer;

    @Test
    void whenOrderSent_thenConsumerReceivesIt() throws Exception {
        Order order = new Order(1L, "laptop", 999.0);
        producer.sendOrder(order);

        ConsumerRecords<String, OrderEvent> records =
            KafkaTestUtils.getRecords(testConsumer, Duration.ofSeconds(10));

        assertThat(records).hasSize(1);
        assertThat(records.iterator().next().value().getOrderId()).isEqualTo(1L);
    }
}`,
          },
          { type: 'heading', text: 'Kafka + Kubernetes (Strimzi) — Production Setup' },
          {
            type: 'text',
            content: 'In production, running Kafka on Kubernetes via Strimzi is the industry standard. Strimzi manages Kafka brokers as K8s Custom Resources. QA engineers need to know how to test Kafka apps running on K8s — connecting from test code, checking consumer groups, verifying topic configuration.',
          },
          { type: 'heading', text: 'Kafka + Schema Registry: Type Safety' },
          {
            type: 'simple-box',
            emoji: '📋',
            content: 'Schema Registry is like a contract repository for Kafka messages. Instead of JSON (no schema enforcement), you use Avro or Protobuf serialization. Producers register their schema, consumers validate incoming messages against the registered schema. Breaking schema changes are rejected automatically. Think of it like Java interface contracts between services.',
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Add Schema Registry to docker-compose.yml',
            code: `  schema-registry:
    image: confluentinc/cp-schema-registry:7.5.0
    hostname: schema-registry
    depends_on:
      - kafka
    ports:
      - "8081:8081"
    environment:
      SCHEMA_REGISTRY_HOST_NAME: schema-registry
      SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: 'kafka:29092'
      SCHEMA_REGISTRY_LISTENERS: http://0.0.0.0:8081

# After starting, register a schema:
# curl -X POST http://localhost:8081/subjects/orders-value/versions \
#   -H "Content-Type: application/vnd.schemaregistry.v1+json" \
#   -d '{"schema": "{\"type\":\"record\",\"name\":\"Order\",\"fields\":[{\"name\":\"orderId\",\"type\":\"long\"},{\"name\":\"product\",\"type\":\"string\"}]}"}'`,
          },
          { type: 'heading', text: 'Debezium: Change Data Capture (CDC)' },
          {
            type: 'simple-box',
            emoji: '🔄',
            content: 'Debezium captures every INSERT/UPDATE/DELETE from a database and publishes them as Kafka events. No more database polling! Your microservices react to data changes in real-time. Common pattern: MySQL → Debezium → Kafka → Elasticsearch (search index auto-updates). Critical for event sourcing and data sync.',
          },
          {
            type: 'code',
            language: 'json',
            label: 'Debezium MySQL connector configuration',
            code: `// POST http://localhost:8083/connectors — register Debezium connector
{
  "name": "mysql-orders-connector",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "database.hostname": "mysql",
    "database.port": "3306",
    "database.user": "debezium",
    "database.password": "dbz",
    "database.server.id": "184054",
    "topic.prefix": "dbserver1",
    "database.include.list": "shop",
    "table.include.list": "shop.orders",
    "schema.history.internal.kafka.bootstrap.servers": "kafka:29092",
    "schema.history.internal.kafka.topic": "schema-changes.shop"
  }
}
// After registration, every DB change produces an event on topic: dbserver1.shop.orders
// {"op":"c","before":null,"after":{"id":1,"product":"laptop","status":"PLACED"}}`,
          },
        ],
      },

      // ── SECTION: REAL WORLD ───────────────────────────────────────────────
      {
        title: '🛠️ Real-World Kafka — Hands-On',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚀',
            content: 'This section walks through a real e-commerce order processing pipeline using Kafka. Follow every step. By the end you will have a working multi-service event-driven system — the exact architecture used at companies like Amazon, Zalando, and IKEA.',
          },
          { type: 'heading', text: 'Scenario: E-Commerce Order Processing Pipeline' },
          {
            type: 'visual',
            variant: 'flow',
            title: 'Order event flows through 4 services via Kafka',
            steps: [
              { num: '1', label: 'Order Service', desc: 'Receives HTTP POST /orders' },
              { num: '2', label: 'orders topic', desc: 'Publishes ORDER_PLACED event' },
              { num: '3', label: 'Inventory Service', desc: 'Reserves stock' },
              { num: '4', label: 'Payment Service', desc: 'Charges credit card' },
              { num: '5', label: 'Notification Service', desc: 'Sends email/SMS' },
              { num: '6', label: 'Analytics Service', desc: 'Updates dashboards' },
            ],
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Step 1: Start Kafka with Docker Compose',
            code: `# Use the docker-compose.yml from the Installation section
docker compose up -d

# Create the required topics
docker exec kafka kafka-topics \
  --create --topic orders \
  --bootstrap-server localhost:9092 \
  --partitions 3 --replication-factor 1

docker exec kafka kafka-topics \
  --create --topic payments \
  --bootstrap-server localhost:9092 \
  --partitions 3 --replication-factor 1

docker exec kafka kafka-topics \
  --create --topic orders-failed \
  --bootstrap-server localhost:9092 \
  --partitions 1 --replication-factor 1

# Verify topics were created
docker exec kafka kafka-topics --list --bootstrap-server localhost:9092`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Step 2: Simulate the order pipeline manually',
            code: `# TERMINAL 1: Start consumer for inventory-service
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic orders \
  --group inventory-service \
  --from-beginning

# TERMINAL 2: Start consumer for payment-service
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic orders \
  --group payment-service \
  --from-beginning

# TERMINAL 3: Produce some order events (simulates the Order Service)
docker exec -it kafka kafka-console-producer \
  --bootstrap-server localhost:9092 \
  --topic orders
# Type these messages:
# {"orderId":1,"userId":42,"product":"laptop","amount":999,"status":"PLACED"}
# {"orderId":2,"userId":43,"product":"phone","amount":499,"status":"PLACED"}

# ── OBSERVE ──────────────────────────────────────────────────
# Both TERMINAL 1 and TERMINAL 2 receive ALL messages
# (different consumer groups = independent consumption)

# Check consumer group lag
docker exec kafka kafka-consumer-groups \
  --bootstrap-server localhost:9092 \
  --describe --group inventory-service
# Shows: TOPIC   PARTITION   CURRENT-OFFSET   LOG-END-OFFSET   LAG
# orders  0       2            2                 0  ← lag 0 = all caught up`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Step 3: Monitoring consumer lag (critical for production QA)',
            code: `# Consumer lag = messages not yet processed. High lag = service is behind!

# Check ALL consumer groups and their lag
docker exec kafka kafka-consumer-groups \
  --bootstrap-server localhost:9092 \
  --list

docker exec kafka kafka-consumer-groups \
  --bootstrap-server localhost:9092 \
  --describe --all-groups

# Watch lag in real-time (run in a loop)
watch -n 2 "docker exec kafka kafka-consumer-groups \
  --bootstrap-server localhost:9092 \
  --describe --group inventory-service"

# ── What lag means for QA ────────────────────────────────────
# Lag = 0:    Consumer is caught up — healthy
# Lag > 100:  Consumer falling behind — investigate!
# Lag growing continuously: Consumer is stuck (check logs)
# Lag = -:    Consumer group has no members (app not running)`,
          },
          { type: 'heading', text: 'Dead Letter Topic (DLT): Handling Poison Messages' },
          {
            type: 'simple-box',
            emoji: '☠️',
            content: 'A poison message crashes your consumer on every retry. Without a Dead Letter Topic, the consumer is stuck forever (offset not committed = same message forever). DLT is a separate topic where failed messages are moved after max retries. Like a try-catch with a fallback handler.',
          },
          {
            type: 'code',
            language: 'java',
            label: 'Spring Kafka DLT configuration — never get stuck on bad messages',
            code: `@Configuration
@EnableKafka
public class KafkaConsumerConfig {

    @Bean
    public DefaultErrorHandler errorHandler(
            KafkaOperations<String, Object> kafkaTemplate) {

        // Create DLT publisher — sends failed messages to "orders-dlt" topic
        DeadLetterPublishingRecoverer recoverer =
            new DeadLetterPublishingRecoverer(kafkaTemplate,
                (record, ex) -> new TopicPartition(
                    record.topic() + "-dlt", record.partition()));

        // Retry 3 times with 1s, 2s, 4s backoff (exponential)
        ExponentialBackOffWithMaxRetries backOff = new ExponentialBackOffWithMaxRetries(3);
        backOff.setInitialInterval(1000L);
        backOff.setMultiplier(2.0);

        DefaultErrorHandler handler = new DefaultErrorHandler(recoverer, backOff);

        // Do NOT retry on these exceptions (go straight to DLT)
        handler.addNotRetryableExceptions(
            JsonParseException.class,         // Malformed JSON
            ClassCastException.class,         // Wrong type
            NullPointerException.class        // Data integrity error
        );

        return handler;
    }
}

// Monitor the DLT — process or alert on failed messages
@KafkaListener(topics = "orders-dlt", groupId = "dlt-monitor")
public void handleDeadLetter(
        @Payload String message,
        @Header(KafkaHeaders.EXCEPTION_MESSAGE) String errorMessage,
        @Header(KafkaHeaders.ORIGINAL_TOPIC) String originalTopic) {

    log.error("Dead letter from topic '{}': {} | Error: {}",
        originalTopic, message, errorMessage);
    alertingService.sendAlert("Kafka DLT message: " + errorMessage);
}`,
          },
          { type: 'heading', text: 'Common Kafka Errors & Solutions' },
          {
            type: 'error-dictionary',
            errors: [
              {
                error: 'LEADER_NOT_AVAILABLE',
                cause: 'Kafka broker just started and partition leader election hasn\'t completed yet. Usually a temporary state.',
                fix: 'Wait 5-10 seconds and retry. If persistent: kubectl get pods -n kafka (broker may be crashing). Check: sufficient replicas, ZooKeeper connectivity.',
              },
              {
                error: 'Consumer group stuck at same offset (lag not decreasing)',
                cause: 'Consumer is processing a poison message that throws an exception every time. Without DLT, the same message is retried forever.',
                fix: 'Implement Dead Letter Topic (see DLT section). Short term: manually skip the offset:\nkubectl exec -it kafka-broker -- kafka-consumer-groups.sh \\\n  --bootstrap-server localhost:9092 \\\n  --group my-group --topic orders --reset-offsets \\\n  --to-current --execute',
              },
              {
                error: 'Deserialization error (Cannot deserialize)',
                cause: 'Producer changed the message schema (added required field, changed type) but consumer still expects old schema. Breaking change without Schema Registry.',
                fix: 'Use Schema Registry with backward/forward compatibility settings. Short term: check trusted.packages in consumer config. Ensure schema version compatibility before deploying.',
              },
              {
                error: 'NotEnoughReplicasException',
                cause: 'Producer cannot write because fewer brokers are available than min.insync.replicas requires. Some brokers are down.',
                fix: 'Check broker health: kubectl get pods -n kafka. Restore failed brokers. For development, set min.insync.replicas=1 in topic config.',
              },
              {
                error: 'Connection to node -1 (localhost/127.0.0.1:9092) could not be established',
                cause: 'Application cannot connect to Kafka. Wrong bootstrap-servers address, Kafka not running, or network/firewall issue.',
                fix: 'Verify Kafka is running: docker compose ps or kubectl get pods -n kafka. Check bootstrap-servers in application.yml matches actual Kafka address. In Docker: use service name (kafka:29092) not localhost.',
              },
            ],
          },
          { type: 'heading', text: 'Kafka QA Checklist' },
          {
            type: 'list',
            items: [
              '✅ Consumer lag stays at 0 under normal load (monitor with kafka-consumer-groups)',
              '✅ Poison messages go to DLT (not stuck forever)',
              '✅ Messages are NOT duplicated on consumer restart (use at-least-once + idempotent processing)',
              '✅ Message ordering is preserved within same key (test with sequential orderId sends)',
              '✅ Schema changes are backward compatible (new fields are optional)',
              '✅ Consumer group rebalance completes within 30s after service restart',
              '✅ Broker failure is recovered (kill one broker, verify consumers continue)',
              '✅ Retention policy is set appropriately (not accumulating indefinitely)',
            ],
          },
        ],
      },

      // ── SECTION: INTERVIEW Q&A ─────────────────────────────────────────────
      {
        title: '💼 Kafka Interview Q&A',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Apache Kafka',
            questions: [
              {
                level: 'basic',
                q: 'What is Apache Kafka and what problem does it solve?',
                a: 'Kafka is a distributed event streaming platform. It solves the problem of reliably moving large amounts of data between systems in real-time. Problems it solves: 1) Decoupling — producers don\'t need to know about consumers, 2) Scalability — handles millions of messages per second, 3) Durability — messages are persisted to disk and replicated, 4) Replay — events can be re-consumed from any point in time, 5) Fan-out — one event can be consumed by many independent consumers.',
              },
              {
                level: 'basic',
                q: 'What is a Kafka Topic, Partition, and Offset?',
                a: 'Topic: A named category/feed where messages are published. Like a table in a database but append-only. Partition: Each topic is split into partitions — ordered, immutable logs. Enable parallelism. Offset: A unique sequential integer ID for each message within a partition (0, 1, 2...). Consumers track their offset to know where they left off. Combined, a message is uniquely identified by: topic + partition + offset.',
              },
              {
                level: 'basic',
                q: 'Difference between Kafka and RabbitMQ?',
                a: 'Kafka: Pull-based, messages retained after consumption (configurable retention), multiple consumer groups can read same message independently, designed for high-throughput streaming (millions/sec), log-based storage, ordered per partition. RabbitMQ: Push-based, messages deleted after consumption, one consumer per queue, designed for task distribution (work queues), broker-managed routing with exchanges, complex routing rules. Choose Kafka for event streaming/audit logs; RabbitMQ for task queues/work distribution.',
              },
              {
                level: 'intermediate',
                q: 'What is a Consumer Group and why is it used?',
                a: 'A Consumer Group is a set of consumer instances that collaborate to consume a topic. Key rules: 1) Each partition is assigned to exactly ONE consumer within the group, 2) Enables horizontal scaling — add more consumers to process faster, 3) If a consumer crashes, Kafka rebalances — other consumers take over its partitions. Multiple groups can read the same topic independently (each group has its own offsets). Example: "orders" topic consumed by both "notification-group" AND "analytics-group" simultaneously.',
              },
              {
                level: 'intermediate',
                q: 'Explain at-most-once, at-least-once, and exactly-once delivery semantics',
                a: 'At-most-once: Offset committed before processing. If consumer crashes after commit but before processing, message is lost. Fastest but potentially lossy. At-least-once: Offset committed after processing. If consumer crashes after processing but before commit, message reprocessed. Duplicates possible. Most common default. Exactly-once: Kafka Transactions + Idempotent Producer + Transactional Consumer. Most complex and expensive. Guarantees each message processed exactly once. Required for financial transactions.',
              },
              {
                level: 'intermediate',
                q: 'What is the role of ZooKeeper in Kafka? What is KRaft mode?',
                a: 'ZooKeeper (traditional): Kafka used it for cluster coordination — leader election for brokers and partitions, storing broker metadata, consumer group offsets (old versions), and cluster configuration. KRaft mode (Kafka 3.x+): Kafka\'s internal Raft consensus protocol replaces ZooKeeper entirely. Benefits: simpler deployment (no ZooKeeper cluster needed), faster metadata operations, scales to millions of partitions. ZooKeeper removal is complete in Kafka 4.x.',
              },
              {
                level: 'advanced',
                q: 'How does Kafka guarantee message ordering?',
                a: 'Kafka guarantees ordering WITHIN a partition but NOT across partitions. Within partition: messages are written and read in strict order by offset. Across partitions: no ordering guarantee. To guarantee ordering for related messages (e.g., all events for the same user): use the same key — Kafka routes messages with the same key to the same partition via hash(key) % numPartitions. Caveat: increasing partitions can reassign keys to different partitions, breaking existing ordering guarantees.',
              },
              {
                level: 'advanced',
                q: 'What is Consumer Lag and how do you monitor it?',
                a: 'Consumer Lag = the difference between the latest offset in a partition and the consumer\'s current offset. It indicates how far behind a consumer group is from the latest messages. If lag grows: consumers are processing slower than producers are writing. Monitor with: kafka-consumer-groups.sh --describe --group <group-id> (shows lag per partition). Production tools: Kafka Manager (AKHQ), Prometheus + kafka-exporter, Confluent Control Center. Alert if lag exceeds threshold (e.g., > 10,000 messages).',
              },
            ],
          },
          { type: 'heading', text: 'Kafka Quick Facts Table' },
          {
            type: 'table',
            headers: ['Topic', 'Key Fact'],
            rows: [
              ['Default retention', '7 days (log.retention.hours=168)'],
              ['Max message size', '1MB by default (message.max.bytes)'],
              ['Partition ordering', 'Guaranteed — WITHIN a partition only'],
              ['Replication leader', 'Only 1 leader per partition handles read/write'],
              ['acks=all meaning', 'Wait for ALL in-sync replicas to acknowledge'],
              ['__consumer_offsets', 'Special internal topic storing consumer group offsets'],
              ['Kafka port', '9092 (default plaintext), 9093 (TLS)'],
              ['Min partitions for scale', 'partitions ≥ number of desired parallel consumers'],
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
      title: '🟠 Apache Kafka',
      subtitle: 'Modern Sistemler için Dağıtık Event Streaming',
      intro: 'Apache Kafka\'yı sıfırdan mülakat seviyesine taşı. Event-driven mimari, producer, consumer, topic, partition kavramlarını öğren ve Kafka tabanlı sistemleri nasıl test edeceğini keşfet — LinkedIn, Netflix ve Uber\'ın omurgası.',
    },
    tabs: ['🎯 Giriş', '⚙️ Kurulum', '🏗️ Mimari', '📡 Producer & Consumer', '🗂️ Topic & Partition', '☕ Java & Spring Boot', '🔗 Ekosistem', '🛠️ Gerçek Hayat', '💼 Mülakat S&C'],
    sections: [
      {
        title: '🎯 Apache Kafka Nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📰',
            content: 'Kafka, büyük bir gazete yayın sistemi gibidir. Gazeteciler (producer) makale (event/mesaj) yazar. Gazete şirketi (Kafka broker) tüm makaleleri düzenli bölümlerde (topic) saklar. Binlerce okuyucu (consumer) aynı makaleleri bağımsız olarak, kendi hızlarında okuyabilir; gazete tüm sayıları yapılandırılmış süre boyunca saklar.',
          },
          {
            type: 'text',
            content: 'Apache Kafka, dağıtık bir event streaming platformudur. Günde 1 trilyon mesajı işlemek için 2011\'de LinkedIn\'de geliştirilmiş, şimdi Apache lisansı altında açık kaynak. Netflix, Uber, Airbnb ve Twitter\'da event-driven mimarilerin omurgasıdır. Gerçek zamanlı veri pipeline\'ları ve streaming uygulamaları için kullanılır.',
          },
          { type: 'heading', text: 'Geleneksel Mesajlaşma vs Kafka' },
          {
            type: 'table',
            headers: ['Özellik', 'Geleneksel Queue (RabbitMQ)', 'Kafka'],
            rows: [
              ['Mesaj saklama', 'Tüketimden sonra silinir', 'Yapılandırılmış süre boyunca saklanır (gün/hafta)'],
              ['Consumer modeli', 'Mesaj BİR consumer tarafından tüketilir', 'Çoklu consumer\'lar AYNI mesajı bağımsız okur'],
              ['Replay', '❌ Tüketilen mesajlar tekrar okunamaz', '✅ Her zaman herhangi bir offset\'ten tekrar oynat'],
              ['Throughput', 'Saniyede binlerce', 'Saniyede milyonlarca mesaj'],
              ['Sıralama', 'Queue başına', 'Partition başına (garantili)'],
              ['Kullanım', 'Görev kuyruğu, iş dağıtımı', 'Event streaming, audit log, gerçek zamanlı analitik'],
            ],
          },
          { type: 'heading', text: 'Kafka Ne Zaman Kullanılır?' },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '📊', label: 'Gerçek Zamanlı Analitik', desc: 'Tıklama akışı, metrik, logları gerçek zamanlı dashboardlara aktar.' },
              { icon: '🔄', label: 'Event Sourcing', desc: 'Her durum değişikliği bir event\'tir. Event\'leri yeniden oynatarak herhangi bir durumu yeniden oluştur.' },
              { icon: '🔗', label: 'Microservice Entegrasyonu', desc: 'Servisler direkt API çağrısı yerine event üzerinden iletişim kurar.' },
              { icon: '📝', label: 'Audit Log', desc: 'Tüm işlemlerin değişmez kaydı. "Kim neyi ne zaman değiştirdi?"' },
              { icon: '🔁', label: 'Veri Pipeline\'ı', desc: 'Veritabanlarından veri ambarlarına gerçek zamanlı veri taşı.' },
              { icon: '🔔', label: 'Bildirimler', desc: 'Sipariş verildi → e-posta, stok kontrolü, analitiği aynı anda tetikle.' },
            ],
          },
          {
            type: 'quiz',
            question: 'Kafka\'da bir mesaj tüketildikten sonra ne olur?',
            options: [
              { id: 'a', text: 'Broker\'dan hemen silinir' },
              { id: 'b', text: 'Dead-letter queue\'ya taşınır' },
              { id: 'c', text: 'Retention süresi dolana kadar topic\'te kalır' },
              { id: 'd', text: 'Kalıcı olarak diske arşivlenir' },
            ],
            correct: 'c',
            explanation: 'Geleneksel queue\'ların aksine Kafka, mesajları tüketimden bağımsız olarak yapılandırılmış retention süresi boyunca (varsayılan 7 gün) saklar. Bu, birden fazla bağımsız consumer\'ın aynı mesajı okumasına ve herhangi bir noktadan event\'lerin tekrar oynatılmasına olanak tanır.',
          },
        ],
      },
      {
        title: '⚙️ Apache Kafka Kurulumu',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Kafka\'yı yerel olarak çalıştırmanın en kolay yolu Docker Compose — tek komutla eksiksiz Kafka + ZooKeeper cluster\'ı başlatır. Production için Confluent Cloud veya Kubernetes üzerinde Kafka (Strimzi) kullanın. Production\'da asla bare binary kullanmayın — operator veya managed service tercih edin.',
          },
          { type: 'heading', text: 'Kurulum Seçenekleri Karşılaştırması' },
          {
            type: 'table',
            headers: ['Yöntem', 'Zorluk', 'Ne Zaman Kullanılır'],
            rows: [
              ['Docker Compose', '⭐ En kolay', 'Yerel geliştirme, öğrenme, CI testi'],
              ['KRaft (binary)', '⭐⭐ Orta', 'ZooKeeper bağımlılığı olmayan Kafka 3.x'],
              ['Confluent Platform', '⭐⭐ Orta', 'UI ve Schema Registry ile kurumsal geliştirme'],
              ['Strimzi on K8s', '⭐⭐⭐ İleri', 'Kubernetes üzerinde production'],
              ['Confluent Cloud', '⭐ Ops yok', 'Yönetilen cloud servisi'],
              ['AWS MSK', '⭐⭐ Orta', 'AWS üzerinde tam yönetilen production'],
            ],
          },
          { type: 'heading', text: 'Seçenek 1: Docker Compose (Tavsiye Edilen)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Adım 1: Docker Desktop kurulumu',
            code: `# Windows
winget install Docker.DockerDesktop
# Kurulum sonrası: Docker Desktop'ı başlat, taskbar'da balina ikonu görünmeli

# Mac
brew install --cask docker

# Linux
sudo apt-get install -y docker.io docker-compose-plugin
sudo systemctl start docker
sudo usermod -aG docker $USER

# Doğrulama
docker --version
docker compose version`,
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'Adım 2: docker-compose.yml oluştur',
            code: `# mkdir kafka-local && cd kafka-local
# docker-compose.yml dosyasını oluştur:

version: '3.8'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    hostname: zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    hostname: kafka
    container_name: kafka
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
      - "29092:29092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true'

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: kafka-ui
    depends_on:
      - kafka
    ports:
      - "8090:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:29092`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Adım 3: Kafka\'yı başlat ve doğrula',
            code: `# Tüm servisleri başlat
docker compose up -d

# Container'ların çalıştığını kontrol et
docker compose ps
# zookeeper   Up   2181/tcp
# kafka       Up   9092/tcp
# kafka-ui    Up   0.0.0.0:8090->8080/tcp

# Kafka UI'ı tarayıcıda aç
# http://localhost:8090  ← topic yönetimi, mesajlar, consumer group UI

# ── Topic oluştur ────────────────────────────────────────────
docker exec kafka kafka-topics \
  --create --topic siparisler \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1

# Topic'leri listele
docker exec kafka kafka-topics \
  --list \
  --bootstrap-server localhost:9092

# ── Mesaj üret ───────────────────────────────────────────────
docker exec -it kafka kafka-console-producer \
  --bootstrap-server localhost:9092 \
  --topic siparisler
# Mesaj yaz ve Enter'a bas. Ctrl+C ile durdur.
# > {"siparisId":1,"urun":"laptop","tutar":999}
# > {"siparisId":2,"urun":"telefon","tutar":499}

# ── Mesaj tüket ──────────────────────────────────────────────
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic siparisler \
  --from-beginning

# Servisleri durdur
docker compose down`,
          },
          { type: 'heading', text: 'Seçenek 2: KRaft Modu (ZooKeeper\'sız — Kafka 3.x)' },
          {
            type: 'code',
            language: 'yaml',
            label: 'KRaft modu docker-compose.yml — ZooKeeper bağımlılığı yok',
            code: `version: '3.8'
services:
  kafka:
    image: confluentinc/cp-kafka:7.5.0
    container_name: kafka-kraft
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092'
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka:29093'
      KAFKA_LISTENERS: 'PLAINTEXT://kafka:29092,CONTROLLER://kafka:29093,PLAINTEXT_HOST://0.0.0.0:9092'
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
# ZooKeeper container'ına gerek yok!`,
          },
        ],
      },

      // ── BÖLÜM: MİMARİ ─────────────────────────────────────────────────────
      {
        title: '🏗️ Kafka Mimarisi',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏗️',
            content: 'Kafka, dağıtık bir ilan panosu sistemi gibidir. Farklı konumlarda birden fazla ilan panosu (broker) bulunur. Her panonun bölümleri (topic) vardır ve her bölümün numaralı yuvaları (partition) vardır. Mesajlar sırayla yapıştırılır (offset ile). İstediğin sayıda kişi (consumer) herhangi bir bölümü bağımsız olarak okuyabilir.',
          },
          {
            type: 'diagram-svg',
            title: 'Kafka Cluster Mimarisi',
            svg: `<svg viewBox="0 0 820 500" xmlns="http://www.w3.org/2000/svg" style="background:#1a0a00;border-radius:16px;width:100%;font-family:JetBrains Mono,monospace">
  <text x="410" y="30" text-anchor="middle" fill="#fb923c" font-size="15" font-weight="bold">🟠 Kafka Cluster Mimarisi</text>
  <rect x="10" y="50" width="130" height="200" rx="12" fill="#1c1917" stroke="#f97316" stroke-width="1.5"/>
  <text x="75" y="74" text-anchor="middle" fill="#fb923c" font-size="11" font-weight="bold">📤 Producer'lar</text>
  <rect x="22" y="84" width="106" height="36" rx="6" fill="#292524" stroke="#f97316" stroke-width="1"/>
  <text x="75" y="100" text-anchor="middle" fill="#fed7aa" font-size="9" font-weight="bold">Sipariş Servisi</text>
  <text x="75" y="114" text-anchor="middle" fill="#a8a29e" font-size="8">sipariş event'i gönderir</text>
  <rect x="22" y="128" width="106" height="36" rx="6" fill="#292524" stroke="#f97316" stroke-width="1"/>
  <text x="75" y="144" text-anchor="middle" fill="#fed7aa" font-size="9" font-weight="bold">Ödeme Servisi</text>
  <text x="75" y="158" text-anchor="middle" fill="#a8a29e" font-size="8">ödeme event'i gönderir</text>
  <rect x="22" y="172" width="106" height="36" rx="6" fill="#292524" stroke="#f97316" stroke-width="1"/>
  <text x="75" y="188" text-anchor="middle" fill="#fed7aa" font-size="9" font-weight="bold">Kullanıcı Servisi</text>
  <text x="75" y="202" text-anchor="middle" fill="#a8a29e" font-size="8">kullanıcı event'i gönderir</text>
  <line x1="140" y1="102" x2="200" y2="150" stroke="#f97316" stroke-width="1.5"/>
  <line x1="140" y1="146" x2="200" y2="170" stroke="#f97316" stroke-width="1.5"/>
  <line x1="140" y1="190" x2="200" y2="190" stroke="#f97316" stroke-width="1.5"/>
  <polygon points="196,146 204,150 196,154" fill="#f97316"/>
  <polygon points="196,166 204,170 196,174" fill="#f97316"/>
  <polygon points="196,186 204,190 196,194" fill="#f97316"/>
  <rect x="200" y="50" width="420" height="310" rx="14" fill="#1c1407" stroke="#f59e0b" stroke-width="2"/>
  <text x="410" y="74" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold">⚡ Kafka Cluster (3 Broker)</text>
  <rect x="215" y="85" width="390" height="82" rx="8" fill="#1a1200" stroke="#d97706" stroke-width="1.5"/>
  <text x="225" y="103" fill="#fbbf24" font-size="10" font-weight="bold">📋 Topic: "siparisler"</text>
  <rect x="215" y="108" width="118" height="52" rx="4" fill="#292105" stroke="#b45309" stroke-width="1"/>
  <text x="274" y="124" text-anchor="middle" fill="#fde68a" font-size="9" font-weight="bold">Partition 0</text>
  <rect x="219" y="128" width="22" height="18" rx="2" fill="#b45309"/><text x="230" y="141" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="243" y="128" width="22" height="18" rx="2" fill="#b45309"/><text x="254" y="141" text-anchor="middle" fill="#fff" font-size="7">1</text>
  <rect x="267" y="128" width="22" height="18" rx="2" fill="#b45309"/><text x="278" y="141" text-anchor="middle" fill="#fff" font-size="7">2</text>
  <rect x="291" y="128" width="22" height="18" rx="2" fill="#d97706"/><text x="302" y="141" text-anchor="middle" fill="#fff" font-size="7">3→</text>
  <rect x="341" y="108" width="118" height="52" rx="4" fill="#292105" stroke="#b45309" stroke-width="1"/>
  <text x="400" y="124" text-anchor="middle" fill="#fde68a" font-size="9" font-weight="bold">Partition 1</text>
  <rect x="345" y="128" width="22" height="18" rx="2" fill="#b45309"/><text x="356" y="141" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="369" y="128" width="22" height="18" rx="2" fill="#b45309"/><text x="380" y="141" text-anchor="middle" fill="#fff" font-size="7">1</text>
  <rect x="417" y="128" width="22" height="18" rx="2" fill="#d97706"/><text x="428" y="141" text-anchor="middle" fill="#fff" font-size="7">2→</text>
  <rect x="467" y="108" width="130" height="52" rx="4" fill="#292105" stroke="#b45309" stroke-width="1"/>
  <text x="532" y="124" text-anchor="middle" fill="#fde68a" font-size="9" font-weight="bold">Partition 2</text>
  <rect x="471" y="128" width="22" height="18" rx="2" fill="#b45309"/><text x="482" y="141" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="495" y="128" width="22" height="18" rx="2" fill="#b45309"/><text x="506" y="141" text-anchor="middle" fill="#fff" font-size="7">1</text>
  <rect x="519" y="128" width="22" height="18" rx="2" fill="#b45309"/><text x="530" y="141" text-anchor="middle" fill="#fff" font-size="7">2</text>
  <rect x="543" y="128" width="22" height="18" rx="2" fill="#b45309"/><text x="554" y="141" text-anchor="middle" fill="#fff" font-size="7">3</text>
  <rect x="567" y="128" width="22" height="18" rx="2" fill="#d97706"/><text x="578" y="141" text-anchor="middle" fill="#fff" font-size="7">4→</text>
  <rect x="215" y="178" width="390" height="68" rx="8" fill="#001a1a" stroke="#0891b2" stroke-width="1.5"/>
  <text x="225" y="196" fill="#22d3ee" font-size="10" font-weight="bold">📋 Topic: "odemeler"</text>
  <rect x="215" y="200" width="185" height="40" rx="4" fill="#0c2a2a" stroke="#0e7490" stroke-width="1"/>
  <text x="307" y="216" text-anchor="middle" fill="#67e8f9" font-size="9" font-weight="bold">Partition 0</text>
  <rect x="220" y="220" width="22" height="14" rx="2" fill="#0e7490"/><text x="231" y="231" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="244" y="220" width="22" height="14" rx="2" fill="#0e7490"/><text x="255" y="231" text-anchor="middle" fill="#fff" font-size="7">1</text>
  <rect x="268" y="220" width="22" height="14" rx="2" fill="#06b6d4"/><text x="279" y="231" text-anchor="middle" fill="#fff" font-size="7">2→</text>
  <rect x="410" y="200" width="185" height="40" rx="4" fill="#0c2a2a" stroke="#0e7490" stroke-width="1"/>
  <text x="502" y="216" text-anchor="middle" fill="#67e8f9" font-size="9" font-weight="bold">Partition 1</text>
  <rect x="415" y="220" width="22" height="14" rx="2" fill="#0e7490"/><text x="426" y="231" text-anchor="middle" fill="#fff" font-size="7">0</text>
  <rect x="463" y="220" width="22" height="14" rx="2" fill="#06b6d4"/><text x="474" y="231" text-anchor="middle" fill="#fff" font-size="7">1→</text>
  <text x="410" y="267" text-anchor="middle" fill="#6b7280" font-size="9">Fault tolerance için broker'lar arasında replike edilir</text>
  <rect x="220" y="272" width="100" height="30" rx="6" fill="#1c1917" stroke="#78716c" stroke-width="1"/>
  <text x="270" y="291" text-anchor="middle" fill="#d6d3d1" font-size="9" font-weight="bold">Broker 1 (Leader)</text>
  <rect x="350" y="272" width="100" height="30" rx="6" fill="#1c1917" stroke="#78716c" stroke-width="1"/>
  <text x="400" y="291" text-anchor="middle" fill="#d6d3d1" font-size="9" font-weight="bold">Broker 2</text>
  <rect x="480" y="272" width="100" height="30" rx="6" fill="#1c1917" stroke="#78716c" stroke-width="1"/>
  <text x="530" y="291" text-anchor="middle" fill="#d6d3d1" font-size="9" font-weight="bold">Broker 3</text>
  <rect x="215" y="312" width="390" height="36" rx="6" fill="#1a0a1a" stroke="#7c3aed" stroke-width="1"/>
  <text x="410" y="327" text-anchor="middle" fill="#a78bfa" font-size="9" font-weight="bold">⚙️ ZooKeeper / KRaft — Cluster Koordinasyonu (lider seçimi, metadata)</text>
  <text x="410" y="341" text-anchor="middle" fill="#7c3aed" font-size="8">KRaft modu (Kafka 3.x+) ZooKeeper bağımlılığını kaldırır</text>
  <line x1="620" y1="150" x2="680" y2="130" stroke="#10b981" stroke-width="1.5"/>
  <line x1="620" y1="170" x2="680" y2="190" stroke="#10b981" stroke-width="1.5"/>
  <line x1="620" y1="220" x2="680" y2="260" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="676,126 684,130 676,134" fill="#10b981"/>
  <polygon points="676,186 684,190 676,194" fill="#10b981"/>
  <polygon points="676,256 684,260 676,264" fill="#10b981"/>
  <rect x="680" y="50" width="130" height="320" rx="12" fill="#022c22" stroke="#10b981" stroke-width="1.5"/>
  <text x="745" y="74" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">📥 Consumer'lar</text>
  <rect x="692" y="84" width="106" height="48" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1"/>
  <text x="745" y="100" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Bildirim Servisi</text>
  <text x="745" y="113" text-anchor="middle" fill="#a7f3d0" font-size="8">Consumer Group A</text>
  <text x="745" y="125" text-anchor="middle" fill="#a7f3d0" font-size="7">offset: 3 (part 0)</text>
  <rect x="692" y="140" width="106" height="48" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1"/>
  <text x="745" y="156" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Analitik Servisi</text>
  <text x="745" y="169" text-anchor="middle" fill="#a7f3d0" font-size="8">Consumer Group B</text>
  <text x="745" y="181" text-anchor="middle" fill="#a7f3d0" font-size="7">offset: 2 (part 0)</text>
  <rect x="692" y="196" width="106" height="48" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1"/>
  <text x="745" y="212" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Stok Servisi</text>
  <text x="745" y="225" text-anchor="middle" fill="#a7f3d0" font-size="8">Consumer Group C</text>
  <text x="745" y="237" text-anchor="middle" fill="#a7f3d0" font-size="7">offset: 1 (part 0)</text>
  <rect x="692" y="252" width="106" height="48" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1"/>
  <text x="745" y="268" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Audit Logger</text>
  <text x="745" y="281" text-anchor="middle" fill="#a7f3d0" font-size="8">Consumer Group D</text>
  <text x="745" y="293" text-anchor="middle" fill="#a7f3d0" font-size="7">offset: 3 (part 0)</text>
  <rect x="10" y="380" width="800" height="110" rx="12" fill="#1a0a00" stroke="#f97316" stroke-width="1"/>
  <text x="410" y="402" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold">🔑 Temel İlke: Her Consumer Group BAĞIMSIZ okur</text>
  <text x="410" y="422" text-anchor="middle" fill="#fed7aa" font-size="10">Bir "sipariş" event'i → Bildirim, Analitik, Stok VE Audit servisleri tarafından eş zamanlı tüketilir</text>
  <text x="410" y="440" text-anchor="middle" fill="#a8a29e" font-size="9">Her group KENDİ offset'ini takip eder — birbirlerini asla etkilemezler</text>
  <text x="410" y="458" text-anchor="middle" fill="#a8a29e" font-size="9">Mesajlar retention süresi dolana kadar topic'te kalır — tüketildiğinde değil</text>
  <text x="410" y="476" text-anchor="middle" fill="#78716c" font-size="8">Bu, Kafka'yı RabbitMQ gibi geleneksel message queue'lardan ayıran temel farktır</text>
</svg>`,
          },
          { type: 'heading', text: 'Temel Kafka Bileşenleri' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🖥️', label: 'Broker', desc: 'Bir Kafka sunucusu. Cluster genellikle yüksek erişilebilirlik için 3+ broker içerir. Her broker partition\'ları saklar ve producer/consumer isteklerini karşılar. Partition başına bir broker "leader"dır — diğerleri replica\'dır.' },
              { icon: '📋', label: 'Topic', desc: 'Mesajların yayınlandığı adlandırılmış bir kategori/akış. Veritabanındaki bir tablo gibi ama sadece append. Topic\'ler paralellik ve ölçeklenebilirlik için partition\'lara bölünür. Retention: mesajlar yapılandırılmış süre boyunca saklanır (varsayılan 7 gün).' },
              { icon: '🗂️', label: 'Partition', desc: 'Sıralı, değiştirilemez mesaj log\'u. Her mesaj sıralı bir offset alır (0, 1, 2...). Partition\'lar paralelliği mümkün kılar — farklı consumer\'lar aynı anda farklı partition\'ları okuyabilir.' },
              { icon: '📌', label: 'Offset', desc: 'Partition içindeki her mesaj için benzersiz sıralı ID. Consumer nereye kadar okuduğunu takip eder. Herhangi bir noktadan tekrar oynatmaya olanak tanır: "offset 0\'dan başla" = tüm mesajları yeniden işle.' },
              { icon: '📤', label: 'Producer', desc: 'Topic\'e mesaj yazan uygulama. Hangi partition\'a yazılacağını seçer (key hash, round-robin veya özel). Onay bekleyebilir: acks=0 (gönder-unut), acks=1 (leader), acks=all (tüm replica\'lar).' },
              { icon: '📥', label: 'Consumer', desc: 'Topic\'ten mesaj okuyan uygulama. Kaldığı yeri bilmek için offset\'i takip eder. Paralel tüketim için Consumer Group\'un parçası. Çoklu group\'lar aynı topic\'i bağımsız olarak okuyabilir.' },
            ],
          },
          {
            type: 'quiz',
            question: 'Kafka Offset nedir?',
            options: [
              { id: 'a', text: 'Kafka mesajının byte cinsinden boyutu' },
              { id: 'b', text: 'Partition içindeki mesaj için benzersiz sıralı ID' },
              { id: 'c', text: 'Bir topic için replica sayısı' },
              { id: 'd', text: 'Broker ve consumer arasındaki ağ gecikmesi' },
            ],
            correct: 'b',
            explanation: 'Offset, bir partition içindeki her mesaja atanan benzersiz, sıralı bir tam sayı ID\'sidir (0, 1, 2, 3...). Consumer\'lar hangi mesajları okuyup okumadıklarını bilmek için mevcut offset\'lerini takip eder. Bu, herhangi bir noktadan yeniden oynatmaya olanak tanır: offset\'i 0\'a ayarlamak tüm mesajları baştan oynatır.',
          },
        ],
      },
      {
        title: '📡 Producer & Consumer',
        blocks: [
          { type: 'heading', text: 'Producer — Mesaj Yazma' },
          {
            type: 'simple-box',
            emoji: '📤',
            content: 'Producer, makale yazan bir gazeteci gibidir. Gazeteci (producer) makaleyi (mesaj) yazar, bölümü (topic) belirtir ve isteğe bağlı olarak kolonu (key aracılığıyla partition) seçer. Gazete şirketi (broker) saklar. Gazeteci kimin okuduğuyla ilgilenmez — bu consumer\'ın işidir.',
          },
          {
            type: 'code',
            language: 'java',
            label: 'Java Producer — Mesaj gönder',
            code: `import org.apache.kafka.clients.producer.*;
import java.util.Properties;

public class SiparisProducer {
    public static void main(String[] args) throws Exception {
        // 1. Producer'ı yapılandır
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");  // Kafka broker adresi
        props.put("key.serializer",   "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        // acks=all: TÜM replica'ların onaylamasını bekle (en güvenli, daha yavaş)
        props.put("acks", "all");
        // Geçici hatalarda 3'e kadar yeniden dene
        props.put("retries", 3);

        KafkaProducer<String, String> producer = new KafkaProducer<>(props);

        // 2. Mesaj (record) oluştur
        ProducerRecord<String, String> record = new ProducerRecord<>(
            "siparisler",                // topic adı
            "kullanici-123",             // key (partition'ı belirler)
            "{\"siparisId\":\"SIP-456\"}" // value (asıl mesaj)
        );

        // 3. Callback ile asenkron gönder
        producer.send(record, (metadata, exception) -> {
            if (exception == null) {
                System.out.printf("✅ Gönderildi: topic=%s, partition=%d, offset=%d%n",
                    metadata.topic(), metadata.partition(), metadata.offset());
            } else {
                System.err.println("❌ Hata: " + exception.getMessage());
            }
        });

        producer.flush();   // Tüm tamponlanmış mesajların gönderildiğinden emin ol
        producer.close();   // Kaynakları serbest bırak
    }
}`,
          },
          {
            type: 'callout',
            color: 'blue',
            emoji: '🔑',
            title: 'Key → Partition Yönlendirme',
            content: 'Mesaj KEY\'i hangi partition\'a gideceğini belirler: hash(key) % partitionSayisi. Aynı key her zaman aynı partition\'a gider → ilgili mesajlar için sıralama garantisi sağlar. Örnek: key="kullanici-123" — kullanıcı 123\'ün tüm siparişleri aynı partition\'a gider, böylece sırayla işlenir. Key yoksa → partition\'lar arasında round-robin.',
          },
          { type: 'heading', text: 'Consumer — Mesaj Okuma' },
          {
            type: 'code',
            language: 'java',
            label: 'Java Consumer — Mesajları döngüde oku',
            code: `import org.apache.kafka.clients.consumer.*;
import java.time.Duration;
import java.util.*;

public class SiparisConsumer {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "siparis-isleme-grubu");     // Consumer Group ID
        props.put("key.deserializer",   "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        // auto.offset.reset: bu group için offset yokken ne yapılsın
        // "earliest" = başından başla, "latest" = yalnızca yeni mesajlar
        props.put("auto.offset.reset", "earliest");
        props.put("enable.auto.commit", "true");

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
        consumer.subscribe(Collections.singletonList("siparisler"));

        try {
            while (true) {
                // Yeni mesajlar için 100ms bekle
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

                for (ConsumerRecord<String, String> record : records) {
                    System.out.printf(
                        "📩 topic=%s, partition=%d, offset=%d, key=%s, value=%s%n",
                        record.topic(), record.partition(), record.offset(),
                        record.key(), record.value()
                    );
                    // Siparişi işle...
                    siparisIsleme(record.value());
                }
            }
        } finally {
            consumer.close();
        }
    }
}`,
          },
          { type: 'heading', text: 'Consumer Group — Paralel İşleme' },
          {
            type: 'text',
            content: 'Consumer Group, birden fazla consumer örneğinin bir topic\'i okuma işini paylaşmasına olanak tanır. Her partition, group içinde tam olarak BİR consumer\'a atanır. Bu yatay ölçeklendirmeyi mümkün kılar: 3 partition + 3 consumer = her consumer paralel olarak 1 partition\'ı işler.',
          },
          {
            type: 'diagram-svg',
            title: 'Consumer Group Partition Ataması',
            svg: `<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" style="background:#022c22;border-radius:12px;width:100%;font-family:JetBrains Mono,monospace">
  <text x="350" y="26" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">Consumer Group: "siparis-isleme-grubu"</text>
  <rect x="10" y="40" width="680" height="58" rx="8" fill="#1c1917" stroke="#f97316" stroke-width="1.5"/>
  <text x="350" y="58" text-anchor="middle" fill="#fb923c" font-size="10" font-weight="bold">Topic: "siparisler" — 3 Partition</text>
  <rect x="20" y="64" width="200" height="26" rx="4" fill="#292105" stroke="#d97706" stroke-width="1"/>
  <text x="120" y="81" text-anchor="middle" fill="#fde68a" font-size="9">Partition 0 [0,1,2,3,4,5]</text>
  <rect x="240" y="64" width="200" height="26" rx="4" fill="#292105" stroke="#d97706" stroke-width="1"/>
  <text x="340" y="81" text-anchor="middle" fill="#fde68a" font-size="9">Partition 1 [0,1,2,3]</text>
  <rect x="460" y="64" width="220" height="26" rx="4" fill="#292105" stroke="#d97706" stroke-width="1"/>
  <text x="570" y="81" text-anchor="middle" fill="#fde68a" font-size="9">Partition 2 [0,1,2,3,4,5,6]</text>
  <line x1="120" y1="90" x2="120" y2="140" stroke="#10b981" stroke-width="2"/>
  <line x1="340" y1="90" x2="340" y2="140" stroke="#10b981" stroke-width="2"/>
  <line x1="570" y1="90" x2="570" y2="140" stroke="#10b981" stroke-width="2"/>
  <polygon points="116,136 120,144 124,136" fill="#10b981"/>
  <polygon points="336,136 340,144 344,136" fill="#10b981"/>
  <polygon points="566,136 570,144 574,136" fill="#10b981"/>
  <rect x="20" y="144" width="200" height="52" rx="8" fill="#052e16" stroke="#10b981" stroke-width="1.5"/>
  <text x="120" y="164" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">🖥️ Consumer Örneği 1</text>
  <text x="120" y="178" text-anchor="middle" fill="#a7f3d0" font-size="8">Yalnızca Partition 0'ı okur</text>
  <text x="120" y="190" text-anchor="middle" fill="#34d399" font-size="8">mevcut offset: 5</text>
  <rect x="240" y="144" width="200" height="52" rx="8" fill="#052e16" stroke="#10b981" stroke-width="1.5"/>
  <text x="340" y="164" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">🖥️ Consumer Örneği 2</text>
  <text x="340" y="178" text-anchor="middle" fill="#a7f3d0" font-size="8">Yalnızca Partition 1'i okur</text>
  <text x="340" y="190" text-anchor="middle" fill="#34d399" font-size="8">mevcut offset: 3</text>
  <rect x="460" y="144" width="220" height="52" rx="8" fill="#052e16" stroke="#10b981" stroke-width="1.5"/>
  <text x="570" y="164" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">🖥️ Consumer Örneği 3</text>
  <text x="570" y="178" text-anchor="middle" fill="#a7f3d0" font-size="8">Yalnızca Partition 2'yi okur</text>
  <text x="570" y="190" text-anchor="middle" fill="#34d399" font-size="8">mevcut offset: 6</text>
  <rect x="10" y="210" width="680" height="60" rx="8" fill="#1a0a00" stroke="#f97316" stroke-width="1"/>
  <text x="350" y="230" text-anchor="middle" fill="#fb923c" font-size="10" font-weight="bold">⚠️ Consumer Group Kuralları</text>
  <text x="350" y="248" text-anchor="middle" fill="#fed7aa" font-size="9">1 partition → group başına en fazla 1 consumer | Consumer > partition → bazı consumer'lar boşta</text>
  <text x="350" y="264" text-anchor="middle" fill="#a8a29e" font-size="8">Consumer crash → group rebalance → diğer consumer'lar sahipsiz partition'ları devralır</text>
</svg>`,
          },
          {
            type: 'quiz',
            question: 'Kafka topic\'inin 3 partition\'ı varsa ve consumer group\'unda 5 consumer bulunuyorsa ne olur?',
            options: [
              { id: 'a', text: 'Tüm 5 consumer her partition\'ı paylaşır' },
              { id: 'b', text: '3 consumer birer partition okur, 2 consumer boşta kalır' },
              { id: 'c', text: 'Kafka otomatik olarak 2 partition daha oluşturur' },
              { id: 'd', text: 'Hata — consumer sayısı partition sayısından fazla olamaz' },
            ],
            correct: 'b',
            explanation: 'Her partition, group içinde yalnızca BİR consumer\'a atanabilir. 3 partition ve 5 consumer varsa, 3 consumer birer partition alır ve 2 consumer boşta bekler. Paralelliği artırmak için partition sayısını artır (ancak topic\'i silmeden partition sayısını azaltamazsın).',
          },
        ],
      },
      {
        title: '🗂️ Topic & Partition Detayları',
        blocks: [
          { type: 'heading', text: 'Topic Yapılandırması' },
          {
            type: 'code',
            language: 'bash',
            label: 'Kafka CLI — topic oluştur ve yönet',
            code: `# 3 partition ve replication factor 3 ile topic oluştur
kafka-topics.sh --bootstrap-server localhost:9092 \
  --create \
  --topic siparisler \
  --partitions 3 \
  --replication-factor 3

# Tüm topic'leri listele
kafka-topics.sh --bootstrap-server localhost:9092 --list

# Topic detaylarını göster (partition'lar, replica'lar, leader)
kafka-topics.sh --bootstrap-server localhost:9092 \
  --describe --topic siparisler

# Consumer group lag'ini kontrol et (consumer ne kadar geride?)
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --describe --group siparis-isleme-grubu

# Konsol producer — mesaj yaz
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic siparisler \
  --property "parse.key=true" \
  --property "key.separator=:"

# Konsol consumer — başından itibaren oku
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic siparisler \
  --from-beginning \
  --property "print.key=true"`,
          },
          { type: 'heading', text: 'Replication — Fault Tolerance' },
          {
            type: 'simple-box',
            emoji: '🔁',
            content: 'Replication factor = her partition\'ın broker\'lar arasında kaç kopyası olduğu. replication-factor=3, her partition\'ın 1 leader ve 2 follower\'ı olduğu anlamına gelir. Bir broker ölürse, follower\'lardan biri otomatik olarak yeni leader olur. Temel kural: replication factor = broker sayısı (production\'da minimum 3).',
          },
          {
            type: 'table',
            headers: ['Konfigürasyon', 'Açıklama', 'Öneri'],
            rows: [
              ['replication.factor', 'Her partition\'ın kaç kopyası olduğu', 'Production: 3 (2 broker arızasına tolerans)'],
              ['min.insync.replicas', 'Yazımı onaylaması gereken min replica', 'Dayanıklılık için acks=all ile 2 ayarla'],
              ['retention.ms', 'Mesajların ne kadar saklanacağı', '7 gün (604800000) varsayılan; replay için artır'],
              ['retention.bytes', 'Partition\'ın max boyutu', '-1 (sınırsız); disk yönetimi için ayarla'],
              ['compression.type', 'Mesaj sıkıştırma', 'Throughput için lz4/snappy; oran için gzip'],
              ['cleanup.policy', 'delete vs compact', 'delete (varsayılan): eskiyi sil; compact: key başına en yeniyi sakla'],
            ],
          },
        ],
      },
      {
        title: '☕ Java & Spring Boot Entegrasyonu',
        blocks: [
          {
            type: 'simple-box',
            emoji: '☕',
            content: 'Spring Kafka, ham Kafka client\'ını Spring Boot\'un otomatik yapılandırma sihriyle sarar. 30 satır producer/consumer kurulumu yazmak yerine @KafkaListener ve @EnableKafka anotasyonları eklersin ve Spring gerisini halleder. Microservice\'ler için mükemmel.',
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'application.yml — Kafka yapılandırması',
            code: `spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
      acks: all
      retries: 3
    consumer:
      group-id: siparis-servisi-grubu
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      auto-offset-reset: earliest
      properties:
        spring.json.trusted.packages: "com.example.events"`,
          },
          {
            type: 'code',
            language: 'java',
            label: 'Spring Boot Consumer — @KafkaListener',
            code: `@Service
public class SiparisEventConsumer {

    // @KafkaListener, ham Kafka API'deki tüm poll döngüsünün yerini alır
    @KafkaListener(
        topics = "siparisler",
        groupId = "bildirim-servisi-grubu"
    )
    public void siparisOlusturulduIsle(
            @Payload SiparisEvent event,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            @Header(KafkaHeaders.OFFSET) long offset) {

        log.info("📩 Event alındı: {} — partition={}, offset={}",
            event, partition, offset);

        if ("SIPARIS_OLUSTURULDU".equals(event.getTip())) {
            bildirimServisi.onayEmailiGonder(event.getKullaniciId());
        }
    }

    // Birden fazla topic dinle
    @KafkaListener(topics = {"siparisler", "odemeler"}, groupId = "audit-grubu")
    public void tumEventleriDenetle(ConsumerRecord<String, String> record) {
        auditLog.kaydet(record.topic(), record.key(), record.value());
    }
}`,
          },
          {
            type: 'code',
            language: 'java',
            label: '@EmbeddedKafka ile Kafka testi',
            code: `@SpringBootTest
@EmbeddedKafka(
    partitions = 1,
    topics = {"siparisler"},
    brokerProperties = {"listeners=PLAINTEXT://localhost:9093", "port=9093"}
)
class SiparisEventConsumerTest {

    @Autowired
    private KafkaTemplate<String, SiparisEvent> kafkaTemplate;

    @Test
    void siparisOlusturulduEventiIslenmeli() throws Exception {
        // Düzenle
        SiparisEvent event = new SiparisEvent("SIP-1", "kullanici-123",
                                               "SIPARIS_OLUSTURULDU", 99.99);
        CountDownLatch latch = new CountDownLatch(1);

        // Uygula — test event'i gönder
        kafkaTemplate.send("siparisler", "kullanici-123", event);

        // Doğrula — consumer'ın 5 saniye içinde işlemesini bekle
        boolean islendi = latch.await(5, TimeUnit.SECONDS);
        assertTrue(islendi, "Consumer mesajı 5s içinde işlemedi");

        // Yan etkileri doğrula
        verify(bildirimServisi).onayEmailiGonder("kullanici-123");
    }
}`,
          },
          {
            type: 'callout',
            color: 'green',
            emoji: '🧪',
            title: 'Kafka için QA Test Stratejisi',
            content: '1) @EmbeddedKafka ile unit/integration testler — dış Kafka gerekmez. 2) Testcontainers ile tam entegrasyon testleri — gerçek bir Kafka Docker container\'ı başlatır. 3) Production\'da Consumer Group Lag izleme — lag büyüyorsa consumer\'lar geride kalıyordur. 4) Dead Letter Topic (DLT) — başarısız mesajlar inceleme için siparisler.DLT\'ye yönlendirilir.',
          },
        ],
      },
      {
        title: '🔗 Kafka Ekosistemi & Entegrasyonlar',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔗',
            content: 'Kafka, modern veri ekosisteminin event bus\'ıdır. Microservice\'leri (Spring Boot) bağlar, stream\'leri işler (Kafka Streams), schema\'ları depolar (Schema Registry), veritabanlarını senkronize eder (Debezium CDC) ve Kubernetes üzerinde çalışır (Strimzi). Bu entegrasyonları anlamak Senior QA ve Backend Engineer mülakatları için kritiktir.',
          },
          { type: 'heading', text: 'Kafka vs Diğer Mesajlaşma Sistemleri' },
          {
            type: 'table',
            headers: ['Özellik', 'Kafka', 'RabbitMQ', 'ActiveMQ'],
            rows: [
              ['Model', 'Log tabanlı pub/sub', 'Queue + pub/sub', 'Queue (JMS)'],
              ['Mesaj saklama', '✅ Yapılandırılabilir (gün/hafta)', '❌ ACK sonrası silinir', '❌ ACK sonrası silinir'],
              ['Replay', '✅ Herhangi bir offset\'ten', '❌ Yok', '❌ Yok'],
              ['Throughput', '✅ Milyon/saniye', '⚠️ Binler/saniye', '⚠️ Binler/saniye'],
              ['Consumer group', '✅ Yerleşik, paralel', '⚠️ Competing consumer', '⚠️ Competing consumer'],
              ['İdeal kullanım', 'Event streaming, audit log, CDC', 'Task queue, RPC', 'Legacy Java enterprise'],
              ['Java entegrasyonu', 'Spring Kafka, native API', 'Spring AMQP', 'Spring JMS'],
            ],
          },
          { type: 'heading', text: 'Kafka + Spring Boot: Tam Entegrasyon' },
          {
            type: 'text',
            content: 'Spring Boot + Spring Kafka, Java enterprise\'da en yaygın Kafka entegrasyonudur. JPA\'nın JDBC\'yi soyutlaması gibi, Spring Kafka ham Kafka Producer/Consumer API\'sini soyutlar. Anahtar annotation\'lar: @KafkaListener (consumer), KafkaTemplate (producer), @EnableKafka (config).',
          },
          {
            type: 'code',
            language: 'java',
            label: 'Spring Kafka Producer + Consumer + Test — tam örnek',
            code: `// ── PRODUCER ─────────────────────────────────────────────
@Service
public class SiparisProducer {

    @Autowired
    private KafkaTemplate<String, SiparisEvent> kafkaTemplate;

    public void siparisBildir(Siparis siparis) {
        SiparisEvent event = new SiparisEvent(siparis.getId(), "SIPARIS_VERILDI", siparis);

        // Aynı siparisId aynı partition'a gider — sıralama garantisi
        kafkaTemplate.send("siparisler", siparis.getId().toString(), event)
            .whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("Siparis {} gönderildi — partition:{} offset:{}",
                        siparis.getId(),
                        result.getRecordMetadata().partition(),
                        result.getRecordMetadata().offset());
                } else {
                    log.error("Siparis {} gönderilemedi: {}", siparis.getId(), ex.getMessage());
                }
            });
    }
}

// ── CONSUMER ─────────────────────────────────────────────
@Component
public class StokConsumer {

    @KafkaListener(topics = "siparisler", groupId = "stok-servisi")
    public void siparisisle(
            @Payload SiparisEvent event,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            @Header(KafkaHeaders.OFFSET) long offset) {

        log.info("Siparis {} alındı — partition:{} offset:{}", event.getSiparisId(), partition, offset);

        try {
            stokServisi.stokAyir(event.getSiparis());
        } catch (YetersizStokException e) {
            // Telafi edici event yayımla (Saga pattern)
            kafkaTemplate.send("siparisler-hata",
                new SiparisHataEvent(event.getSiparisId(), "YETERSIZ_STOK"));
        }
    }
}

// ── TEST: @EmbeddedKafka ──────────────────────────────────
@SpringBootTest
@EmbeddedKafka(partitions = 1, topics = {"siparisler", "siparisler-hata"})
class SiparisEntegrasyonTest {

    @Autowired
    SiparisProducer producer;

    @Test
    void siparisSonrasindaStokConsumerMesajAlir() throws Exception {
        Siparis siparis = new Siparis(1L, "laptop", 999.0);
        producer.siparisBildir(siparis);

        // Consumer'ın mesajı aldığını doğrula
        ConsumerRecords<String, SiparisEvent> records =
            KafkaTestUtils.getRecords(testConsumer, Duration.ofSeconds(10));

        assertThat(records).hasSize(1);
        assertThat(records.iterator().next().value().getSiparisId()).isEqualTo(1L);
    }
}`,
          },
          { type: 'heading', text: 'Schema Registry: Tip Güvenliği' },
          {
            type: 'simple-box',
            emoji: '📋',
            content: 'Schema Registry, Kafka mesajları için bir sözleşme deposu gibidir. JSON yerine Avro veya Protobuf serialization kullanırsınız. Producer\'lar schema\'larını kaydeder, consumer\'lar gelen mesajları kayıtlı schema\'ya göre doğrular. Breaking schema değişiklikleri otomatik olarak reddedilir. Java interface sözleşmeleri gibi düşün.',
          },
          { type: 'heading', text: 'Debezium: Change Data Capture (CDC)' },
          {
            type: 'simple-box',
            emoji: '🔄',
            content: 'Debezium, veritabanındaki her INSERT/UPDATE/DELETE\'i yakalar ve Kafka event\'i olarak yayımlar. Artık veritabanı polling yok! Microservice\'leriniz veri değişikliklerine gerçek zamanlı olarak tepki verir. Yaygın pattern: MySQL → Debezium → Kafka → Elasticsearch (arama indeksi otomatik güncellenir).',
          },
        ],
      },

      // ── BÖLÜM: GERÇEK HAYAT ───────────────────────────────────────────────
      {
        title: '🛠️ Gerçek Hayatta Kafka — Hands-On',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚀',
            content: 'Bu bölüm sizi gerçek bir e-ticaret sipariş işleme pipeline\'ından geçirir. Her adımı takip edin. Sonunda Amazon, Zalando ve IKEA gibi şirketlerin kullandığı mimariye sahip çalışan bir event-driven sisteminiz olacak.',
          },
          { type: 'heading', text: 'Senaryo: E-Ticaret Sipariş İşleme Pipeline\'ı' },
          {
            type: 'visual',
            variant: 'flow',
            title: 'Sipariş event\'i 4 servis üzerinden Kafka ile akar',
            steps: [
              { num: '1', label: 'Sipariş Servisi', desc: 'HTTP POST /siparisler alır' },
              { num: '2', label: 'siparisler topic', desc: 'SIPARIS_VERILDI event yayımlar' },
              { num: '3', label: 'Stok Servisi', desc: 'Stok ayırır' },
              { num: '4', label: 'Ödeme Servisi', desc: 'Kredi kartı tahsil eder' },
              { num: '5', label: 'Bildirim Servisi', desc: 'E-posta/SMS gönderir' },
              { num: '6', label: 'Analitik Servisi', desc: 'Dashboard\'ları günceller' },
            ],
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Adım 1: Docker Compose ile Kafka başlat',
            code: `# Kurulum bölümündeki docker-compose.yml'yi kullan
docker compose up -d

# Gerekli topic'leri oluştur
docker exec kafka kafka-topics \
  --create --topic siparisler \
  --bootstrap-server localhost:9092 \
  --partitions 3 --replication-factor 1

docker exec kafka kafka-topics \
  --create --topic odemeler \
  --bootstrap-server localhost:9092 \
  --partitions 3 --replication-factor 1

docker exec kafka kafka-topics \
  --create --topic siparisler-hata \
  --bootstrap-server localhost:9092 \
  --partitions 1 --replication-factor 1`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Adım 2: Pipeline\'ı manuel olarak simüle et',
            code: `# TERMINAL 1: stok-servisi consumer'ı başlat
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic siparisler \
  --group stok-servisi \
  --from-beginning

# TERMINAL 2: odeme-servisi consumer'ı başlat
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic siparisler \
  --group odeme-servisi \
  --from-beginning

# TERMINAL 3: Sipariş event'leri üret (Sipariş Servisi'ni simüle eder)
docker exec -it kafka kafka-console-producer \
  --bootstrap-server localhost:9092 \
  --topic siparisler
# {"siparisId":1,"kullaniciId":42,"urun":"laptop","tutar":999}
# {"siparisId":2,"kullaniciId":43,"urun":"telefon","tutar":499}

# ── GÖZLEMLE ─────────────────────────────────────────────────
# TERMINAL 1 ve TERMINAL 2 TÜM mesajları alır
# (farklı consumer group = bağımsız tüketim)

# Consumer group gecikmesini kontrol et
docker exec kafka kafka-consumer-groups \
  --bootstrap-server localhost:9092 \
  --describe --group stok-servisi
# TOPIC     PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
# siparisler  0        2               2               0  ← lag 0 = sağlıklı`,
          },
          { type: 'heading', text: 'Dead Letter Topic (DLT): Zehirli Mesajları Yönet' },
          {
            type: 'simple-box',
            emoji: '☠️',
            content: 'Zehirli mesaj, her retry\'da consumer\'ı çöktürür. DLT olmadan consumer sonsuza kadar takılır (offset commit edilmez = aynı mesaj sürekli gelir). DLT, maksimum retry sonrası başarısız mesajların taşındığı ayrı bir topic\'tir. Fallback handler\'lı try-catch gibi düşün.',
          },
          {
            type: 'code',
            language: 'java',
            label: 'Spring Kafka DLT yapılandırması',
            code: `@Configuration
@EnableKafka
public class KafkaConsumerConfig {

    @Bean
    public DefaultErrorHandler errorHandler(
            KafkaOperations<String, Object> kafkaTemplate) {

        // Başarısız mesajları "siparisler-dlt" topic'ine gönder
        DeadLetterPublishingRecoverer recoverer =
            new DeadLetterPublishingRecoverer(kafkaTemplate,
                (record, ex) -> new TopicPartition(
                    record.topic() + "-dlt", record.partition()));

        // Üstel geri çekilme ile 3 kez retry (1s, 2s, 4s)
        ExponentialBackOffWithMaxRetries backOff = new ExponentialBackOffWithMaxRetries(3);
        backOff.setInitialInterval(1000L);
        backOff.setMultiplier(2.0);

        DefaultErrorHandler handler = new DefaultErrorHandler(recoverer, backOff);

        // Bu exception'larda direkt DLT'ye gönder (retry etme)
        handler.addNotRetryableExceptions(
            JsonParseException.class,   // Hatalı JSON
            NullPointerException.class  // Veri bütünlüğü hatası
        );

        return handler;
    }
}`,
          },
          { type: 'heading', text: 'Yaygın Kafka Hataları ve Çözümleri' },
          {
            type: 'error-dictionary',
            errors: [
              {
                error: 'LEADER_NOT_AVAILABLE',
                cause: 'Kafka broker yeni başladı, partition leader seçimi henüz tamamlanmadı. Genellikle geçici bir durum.',
                fix: '5-10 saniye bekle ve yeniden dene. Kalıcıysa: kubectl get pods -n kafka (broker çöküyor olabilir). ZooKeeper bağlantısını kontrol et.',
              },
              {
                error: 'Consumer group aynı offset\'te takılı (lag azalmıyor)',
                cause: 'Consumer, her seferinde exception fırlatan zehirli bir mesajı işliyor. DLT olmadan aynı mesaj sürekli tekrar denenir.',
                fix: 'Dead Letter Topic uygula (DLT bölümüne bak). Kısa vadede offset\'i manuel atla:\nkubectl exec -it kafka-broker -- kafka-consumer-groups.sh \\\n  --bootstrap-server localhost:9092 \\\n  --group benim-group --topic siparisler --reset-offsets \\\n  --to-current --execute',
              },
              {
                error: 'Deserialization error (Cannot deserialize)',
                cause: 'Producer mesaj schema\'sını değiştirdi (zorunlu alan ekledi, tip değiştirdi) ama consumer eski schema\'yı bekliyor.',
                fix: 'Schema Registry kullan, backward/forward compatibility ayarla. Consumer config\'de trusted.packages\'ı kontrol et.',
              },
              {
                error: 'Connection refused (localhost:9092)',
                cause: 'Uygulama Kafka\'ya bağlanamıyor. Yanlış bootstrap-servers adresi, Kafka çalışmıyor veya network sorunu.',
                fix: 'Kafka\'nın çalıştığını doğrula: docker compose ps veya kubectl get pods -n kafka.\napplication.yml\'deki bootstrap-servers gerçek Kafka adresiyle eşleşmeli.\nDocker içinde: localhost değil servis adı kullan (kafka:29092).',
              },
            ],
          },
          { type: 'heading', text: 'Kafka QA Kontrol Listesi' },
          {
            type: 'list',
            items: [
              '✅ Normal yük altında consumer lag 0\'da kalıyor (kafka-consumer-groups ile izle)',
              '✅ Zehirli mesajlar DLT\'ye gidiyor (sonsuza kadar takılmıyor)',
              '✅ Consumer yeniden başlatıldığında mesajlar çoğalmıyor',
              '✅ Aynı key ile gönderilen mesajlar sıralı kalıyor',
              '✅ Schema değişiklikleri geriye dönük uyumlu',
              '✅ Servis yeniden başlatıldıktan sonra consumer group rebalance 30s içinde tamamlanıyor',
              '✅ Broker hatası recover ediliyor (bir broker kapat, consumer\'ların devam ettiğini doğrula)',
              '✅ Retention policy uygun ayarlanmış (süresiz birikim yok)',
            ],
          },
        ],
      },

      // ── BÖLÜM: MÜLAKAT S&C ────────────────────────────────────────────────
      {
        title: '💼 Kafka Mülakat Soruları ve Cevapları',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Apache Kafka',
            questions: [
              {
                level: 'basic',
                q: 'Apache Kafka nedir ve hangi sorunu çözer?',
                a: 'Kafka, dağıtık bir event streaming platformudur. Büyük miktarda veriyi sistemler arasında gerçek zamanlı olarak güvenilir şekilde taşıma sorununu çözer. Çözdüğü sorunlar: 1) Ayrıştırma — producer\'lar consumer\'lar hakkında bilmek zorunda değil, 2) Ölçeklenebilirlik — saniyede milyonlarca mesaj işler, 3) Dayanıklılık — mesajlar diske kalıcı hale getirilir ve replike edilir, 4) Replay — event\'ler herhangi bir noktadan yeniden tüketilebilir, 5) Fan-out — tek bir event birçok bağımsız consumer tarafından tüketilebilir.',
              },
              {
                level: 'basic',
                q: 'Kafka Topic, Partition ve Offset nedir?',
                a: 'Topic: Mesajların yayınlandığı adlandırılmış kategori/akış. Veritabanındaki tabloya benzer ama yalnızca append. Partition: Her topic partition\'lara bölünür — sıralı, değiştirilemez loglar. Paralelliği mümkün kılar. Offset: Partition içindeki her mesaj için benzersiz sıralı tam sayı ID (0, 1, 2...). Consumer\'lar nerede kaldıklarını bilmek için offset\'lerini takip eder. Birleşik olarak, bir mesaj benzersiz şekilde şununla tanımlanır: topic + partition + offset.',
              },
              {
                level: 'basic',
                q: 'Kafka ile RabbitMQ arasındaki fark nedir?',
                a: 'Kafka: Pull tabanlı, mesajlar tüketimden sonra saklanır (yapılandırılabilir retention), çoklu consumer group\'lar aynı mesajı bağımsız okuyabilir, yüksek throughput streaming için tasarlanmış (milyonlarca/sn), log tabanlı depolama, partition başına sıralı. RabbitMQ: Push tabanlı, mesajlar tüketimden sonra silinir, queue başına tek consumer, görev dağıtımı için tasarlanmış, broker tarafından yönetilen yönlendirme, karmaşık yönlendirme kuralları. Event streaming/audit log için Kafka\'yı; görev kuyruğu/iş dağıtımı için RabbitMQ\'yu seç.',
              },
              {
                level: 'intermediate',
                q: 'Consumer Group nedir ve neden kullanılır?',
                a: 'Consumer Group, bir topic\'i tüketmek için iş birliği yapan consumer örnekleri kümesidir. Temel kurallar: 1) Her partition, group içinde tam olarak BİR consumer\'a atanır, 2) Yatay ölçeklendirmeyi mümkün kılar — daha hızlı işlemek için consumer ekle, 3) Consumer crash olursa Kafka yeniden dengeler — diğer consumer\'lar partition\'larını devralır. Çoklu group\'lar aynı topic\'i bağımsız olarak okuyabilir (her group kendi offset\'lerine sahiptir). Örnek: "siparisler" topic\'i hem "bildirim-grubu" hem de "analitik-grubu" tarafından eş zamanlı tüketilir.',
              },
              {
                level: 'intermediate',
                q: 'At-most-once, at-least-once ve exactly-once teslimat semantiklerini açıkla',
                a: 'At-most-once: Offset işlemeden önce commit edilir. Consumer işlemden sonra ama commit\'ten önce crash olursa mesaj kaybolur. En hızlı ama kayıp riski var. At-least-once: Offset işlemden sonra commit edilir. Consumer işlemden sonra ama commit\'ten önce crash olursa mesaj yeniden işlenir. Tekrar mümkündür. En yaygın varsayılan. Exactly-once: Kafka Transaction\'ları + Idempotent Producer + Transactional Consumer. En karmaşık ve pahalı. Her mesajın tam olarak bir kez işlendiğini garanti eder. Finansal işlemler için gereklidir.',
              },
              {
                level: 'advanced',
                q: 'Kafka mesaj sıralama garantisi nasıldır?',
                a: 'Kafka, PARTITION İÇİNDE sıralama garantisi sağlar, partition\'lar arasında değil. Partition içinde: mesajlar offset\'e göre kesin sırada yazılır ve okunur. Partition\'lar arasında: sıralama garantisi yoktur. İlgili mesajlar için sıralamayı garanti etmek için (örn. aynı kullanıcının tüm event\'leri): aynı key\'i kullan — Kafka aynı key\'e sahip mesajları hash(key) % partitionSayisi aracılığıyla aynı partition\'a yönlendirir. Uyarı: partition sayısını artırmak key\'leri farklı partition\'lara yeniden atayabilir ve mevcut sıralama garantilerini bozabilir.',
              },
              {
                level: 'advanced',
                q: 'Consumer Lag nedir ve nasıl izlenir?',
                a: 'Consumer Lag = partition\'daki en son offset ile consumer\'ın mevcut offset\'i arasındaki fark. Consumer group\'unun en son mesajların ne kadar gerisinde olduğunu gösterir. Lag büyüyorsa: consumer\'lar, producer\'ların yazdığından daha yavaş işliyor demektir. İzleme: kafka-consumer-groups.sh --describe --group <group-id> (partition başına lag gösterir). Production araçları: Kafka Manager (AKHQ), Prometheus + kafka-exporter, Confluent Control Center. Lag eşiği aşarsa uyarı gönder (örn. > 10.000 mesaj).',
              },
            ],
          },
          { type: 'heading', text: 'Kafka Hızlı Bilgi Tablosu' },
          {
            type: 'table',
            headers: ['Konu', 'Temel Bilgi'],
            rows: [
              ['Varsayılan retention', '7 gün (log.retention.hours=168)'],
              ['Max mesaj boyutu', 'Varsayılan 1MB (message.max.bytes)'],
              ['Partition sıralaması', 'Garantili — yalnızca BİR partition İÇİNDE'],
              ['Replication leader', 'Partition başına yalnızca 1 leader okuma/yazma yapar'],
              ['acks=all anlamı', 'TÜM in-sync replica\'ların onaylamasını bekle'],
              ['__consumer_offsets', 'Consumer group offset\'lerini saklayan özel dahili topic'],
              ['Kafka portu', '9092 (varsayılan düz metin), 9093 (TLS)'],
              ['Ölçek için min partition', 'partition ≥ istenen paralel consumer sayısı'],
            ],
          },
        ],
      },
    ],
  },
}
