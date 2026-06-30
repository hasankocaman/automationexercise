import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

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
          
        retryQuestion: {
      "type": "quiz",
      "question": "How does Kafka handle message deletion after a consumer reads data?",
      "options": [
            {
                  "id": "a",
                  "text": "The message is removed as soon as the acknowledgement is received"
            },
            {
                  "id": "b",
                  "text": "The message is marked for deletion only after all consumers in the group read it"
            },
            {
                  "id": "c",
                  "text": "The message stays in the partition based on time or size configuration, ignoring read status"
            },
            {
                  "id": "d",
                  "text": "The message is transferred to a permanent database store"
            }
      ],
      "correct": "c",
      "explanation": "Kafka uses a distributed commit log approach. Messages are not deleted upon consumption; they are persisted until the topic's retention policy (time-based or size-based) is triggered, enabling re-processing of data."
}
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
          {
            type: 'quiz',
            question: 'Why is running Kafka as a "bare binary" on a single VM discouraged for production, in favor of Strimzi on Kubernetes or Confluent Cloud?',
            options: [
              { id: 'a', text: 'Bare binary installs cannot connect to producers' },
              { id: 'b', text: 'Managed/operator solutions handle broker failover, scaling, and upgrades automatically — a bare binary requires you to build all of that yourself' },
              { id: 'c', text: 'Bare binary Kafka does not support topics' },
              { id: 'd', text: 'Confluent Cloud is the only option that supports Java clients' },
            ],
            correct: 'b',
            explanation: 'A bare binary install gives you a running broker but nothing else — no automated failover when a broker dies, no rolling upgrades, no built-in monitoring. Strimzi (a Kubernetes operator) and Confluent Cloud (fully managed) handle exactly those operational concerns, which is why production deployments almost always choose one of them instead of hand-rolling broker lifecycle management.',
            retryQuestion: {
              question: 'A broker in a self-managed (bare binary) Kafka cluster crashes at 3am. With no operator/managed service in place, what actually happens?',
              options: [
                { id: 'a', text: 'Kafka automatically provisions a replacement broker' },
                { id: 'b', text: 'Nothing happens automatically — an on-call engineer must notice and manually restart or replace the broker' },
                { id: 'c', text: 'The cluster automatically shuts down to prevent data loss' },
                { id: 'd', text: 'Confluent Cloud takes over automatically even without being configured' },
              ],
              correct: 'b',
              explanation: 'A bare binary install has no automation watching broker health — recovery is entirely manual unless the team has built their own monitoring/alerting/restart tooling. This is exactly the operational burden that Strimzi (which reconciles desired vs actual cluster state automatically) or a managed service like Confluent Cloud takes off the team\'s plate.',
            },
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
          
        retryQuestion: {
      "type": "quiz",
      "question": "In the context of Kafka consumers, what is the role of an offset?",
      "options": [
            {
                  "id": "a",
                  "text": "It defines the partition replication factor"
            },
            {
                  "id": "b",
                  "text": "It acts as a pointer or index to track the consumer's position in a partition"
            },
            {
                  "id": "c",
                  "text": "It determines the maximum throughput of a producer"
            },
            {
                  "id": "d",
                  "text": "It signifies the compression ratio of the data block"
            }
      ],
      "correct": "b",
      "explanation": "An offset is a monotonically increasing integer that marks the position of a consumer within a specific partition. By committing offsets, consumers can track progress and resume from where they left off in case of a crash."
}
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
          
        retryQuestion: {
      "type": "quiz",
      "question": "If you have 10 partitions in a Kafka topic and a consumer group consisting of 12 consumers, what is the outcome?",
      "options": [
            {
                  "id": "a",
                  "text": "Each partition will be read by 1.2 consumers simultaneously"
            },
            {
                  "id": "b",
                  "text": "All 12 consumers will be active, with 2 partitions handling multiple consumers"
            },
            {
                  "id": "c",
                  "text": "10 consumers are actively assigned to partitions, while 2 remain idle"
            },
            {
                  "id": "d",
                  "text": "The consumer group will fail to start due to an imbalance"
            }
      ],
      "correct": "c",
      "explanation": "Kafka ensures that each partition is processed by exactly one consumer within a group to avoid duplicate processing. With more consumers than partitions, the excess consumers will remain in an idle state, waiting for a partition to become available if a consumer drops out."
}
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
          {
            type: 'quiz',
            question: 'You want to survive the loss of up to 2 brokers in a 3-broker production cluster without losing any messages. What `replication.factor` should you set on the topic?',
            options: [
              { id: 'a', text: '1' },
              { id: 'b', text: '2' },
              { id: 'c', text: '3' },
              { id: 'd', text: '0' },
            ],
            correct: 'c',
            explanation: 'With `replication.factor=3`, each partition has 1 leader and 2 followers spread across the 3 brokers. If a broker dies, one of the followers is automatically promoted to leader and no data is lost. The standard production rule of thumb is replication factor = number of brokers (minimum 3) for real fault tolerance — replication.factor=1 means a single broker failure loses that partition entirely.',
            retryQuestion: {
              question: 'A topic has `replication.factor=3` but `min.insync.replicas=1`. A producer sends with `acks=all`. What does this combination actually guarantee?',
              options: [
                { id: 'a', text: 'The message is durable only after all 3 replicas confirm it' },
                { id: 'b', text: 'The message is considered written once just 1 replica (the leader) confirms it, even though 3 copies are configured to exist' },
                { id: 'c', text: 'The producer will never receive an acknowledgment' },
                { id: 'd', text: 'Kafka rejects this configuration as invalid' },
              ],
              correct: 'b',
              explanation: '`min.insync.replicas` controls how many replicas must confirm a write before it counts as successful — with it set to 1, the leader alone confirming is enough, even though `replication.factor=3` means 3 copies eventually exist. This is a real production gotcha: a high replication factor alone does not guarantee strong durability if `min.insync.replicas` is left at a low value.',
            },
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
          {
            type: 'quiz',
            question: 'You want a fast unit/integration test for a Spring Boot Kafka consumer that does not depend on an external Kafka cluster being available. What is the right tool?',
            options: [
              { id: 'a', text: 'Testcontainers, spinning up a real Docker Kafka broker' },
              { id: 'b', text: '@EmbeddedKafka' },
              { id: 'c', text: 'A manually installed Kafka on the CI runner' },
              { id: 'd', text: 'Mocking the entire Spring context' },
            ],
            correct: 'b',
            explanation: '@EmbeddedKafka starts an in-memory Kafka broker inside the test JVM itself — no Docker, no external cluster, no network dependency. It is the fastest option for true unit/integration tests. Testcontainers is the right tool one level up, when you specifically want to verify behavior against a real Kafka Docker container (closer to production), at the cost of slower test startup.',
            retryQuestion: {
              question: 'A team wants their CI test to catch a real bug that only happens with the actual Kafka broker binary (not the in-memory @EmbeddedKafka implementation). Which tool fits better here?',
              options: [
                { id: 'a', text: '@EmbeddedKafka, since it is always the better choice' },
                { id: 'b', text: 'Testcontainers, since it runs a real Kafka Docker container, closer to what production actually runs' },
                { id: 'c', text: 'Neither — this kind of bug cannot be caught in CI' },
                { id: 'd', text: 'A manually installed Kafka on the CI runner, since containers cannot run Kafka' },
              ],
              correct: 'b',
              explanation: '@EmbeddedKafka is a lightweight in-memory reimplementation — fast, but not byte-identical to the real broker binary, so it can miss broker-specific behavior. Testcontainers spins up the actual Kafka Docker image, trading some test startup speed for fidelity closer to production — the right choice when you specifically need to verify against real broker behavior.',
            },
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
          {
            type: 'quiz',
            question: 'A new consumer group needs to reprocess the last 7 days of events from a topic, even though those events were already consumed and acknowledged by other consumers. Is this possible with Kafka, and why does RabbitMQ/ActiveMQ struggle with the same request?',
            options: [
              { id: 'a', text: 'Not possible in either system — messages are gone once consumed' },
              { id: 'b', text: 'Possible in Kafka because messages stay in the log per a retention policy and can be replayed from any offset; RabbitMQ/ActiveMQ delete messages once acknowledged' },
              { id: 'c', text: 'Only possible by asking the producer to resend everything' },
              { id: 'd', text: 'Only possible if you restart the broker' },
            ],
            correct: 'b',
            explanation: 'Kafka is log-based: messages stay on disk for the configured retention period (e.g. 7 days) regardless of whether a consumer already read them, so a brand-new consumer group can simply start from offset 0 (or any specific offset) and replay history. RabbitMQ/ActiveMQ are queue-based — once a message is acknowledged, it is deleted, so there is nothing left to replay. This is the core architectural reason Kafka is chosen for event streaming/audit logs/CDC, while traditional queues are chosen for task distribution/RPC.',
            retryQuestion: {
              question: 'A team needs a "distribute one task to exactly one worker" pattern (e.g. send each image-resize job to only one available worker, never duplicated). Is Kafka or a traditional queue (RabbitMQ) the better natural fit here?',
              options: [
                { id: 'a', text: 'Kafka, because it is always the more modern choice' },
                { id: 'b', text: 'RabbitMQ, because competing-consumer task queues are exactly what queue-based systems were designed for' },
                { id: 'c', text: 'Neither can do this' },
                { id: 'd', text: 'Kafka, because it has more retention' },
              ],
              correct: 'b',
              explanation: 'Kafka excels at event streaming/replay (many consumer groups can independently re-read the same log), but classic "exactly one worker handles this task" distribution is the native use case of a queue-based system like RabbitMQ, where a message is removed once a worker acknowledges it. Choosing the tool based on the actual access pattern — replay/audit vs. task distribution — matters more than which technology is newer.',
            },
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
                solution:'Wait 5-10 seconds and retry. If persistent: kubectl get pods -n kafka (broker may be crashing). Check: sufficient replicas, ZooKeeper connectivity.',
              },
              {
                error: 'Consumer group stuck at same offset (lag not decreasing)',
                cause: 'Consumer is processing a poison message that throws an exception every time. Without DLT, the same message is retried forever.',
                solution:'Implement Dead Letter Topic (see DLT section). Short term: manually skip the offset:\nkubectl exec -it kafka-broker -- kafka-consumer-groups.sh \\\n  --bootstrap-server localhost:9092 \\\n  --group my-group --topic orders --reset-offsets \\\n  --to-current --execute',
              },
              {
                error: 'Deserialization error (Cannot deserialize)',
                cause: 'Producer changed the message schema (added required field, changed type) but consumer still expects old schema. Breaking change without Schema Registry.',
                solution:'Use Schema Registry with backward/forward compatibility settings. Short term: check trusted.packages in consumer config. Ensure schema version compatibility before deploying.',
              },
              {
                error: 'NotEnoughReplicasException',
                cause: 'Producer cannot write because fewer brokers are available than min.insync.replicas requires. Some brokers are down.',
                solution:'Check broker health: kubectl get pods -n kafka. Restore failed brokers. For development, set min.insync.replicas=1 in topic config.',
              },
              {
                error: 'Connection to node -1 (localhost/127.0.0.1:9092) could not be established',
                cause: 'Application cannot connect to Kafka. Wrong bootstrap-servers address, Kafka not running, or network/firewall issue.',
                solution:'Verify Kafka is running: docker compose ps or kubectl get pods -n kafka. Check bootstrap-servers in application.yml matches actual Kafka address. In Docker: use service name (kafka:29092) not localhost.',
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
          {
            type: 'quiz',
            question: "A consumer crashes every time it processes a specific \"poison\" message, and consumer group lag never decreases. Without a Dead Letter Topic, why does this loop forever?",
            options: [
              { id: 'a', text: 'Kafka automatically deletes poison messages after 3 retries' },
              { id: 'b', text: "The offset is never committed because processing throws, so the same message keeps being redelivered on every retry" },
              { id: 'c', text: 'The broker restarts and clears the message' },
              { id: 'd', text: 'The consumer group automatically skips to the next message' },
            ],
            correct: 'b',
            explanation: "Kafka only advances a consumer's offset when it is explicitly committed — if processing throws an exception before that commit, the same message is redelivered on the next poll, forever, because nothing tells Kafka the consumer is done with it. A Dead Letter Topic breaks the loop: after a configured number of retries, the failed message is routed to a separate DLT for manual inspection, and the main consumer's offset advances past it — the same pattern as a try-catch with a fallback handler.",
            retryQuestion: {
              question: 'A consumer is configured to retry a failing message up to 3 times before sending it to a Dead Letter Topic. After the message is routed to the DLT, what happens to the main consumer\'s processing of subsequent messages?',
              options: [
                { id: 'a', text: 'It stays stuck forever, the same as without a DLT' },
                { id: 'b', text: 'Its offset advances past the poison message, so it continues processing the next messages normally' },
                { id: 'c', text: 'The entire consumer group shuts down' },
                { id: 'd', text: 'The poison message is processed a 4th time automatically' },
              ],
              correct: 'b',
              explanation: 'The whole point of routing to a DLT after max retries is to let the main consumer commit past the poison message and resume normal processing — without this, every message behind the poison one in the partition would also be stuck waiting. The poison message itself is preserved in the DLT for later manual inspection, not lost.',
            },
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
              // ── BASIC (extra) ──────────────────────────────────
              { level: 'basic', q: 'What is a Kafka Producer, and which acks config would you change for a QA test pipeline writing throwaway test events vs a payment service?', a: 'A Producer is the client that writes messages to a Kafka topic. The acks setting controls durability: acks=0 fires-and-forgets (no confirmation, fastest, can silently lose messages), acks=1 waits for the partition leader to write the message (good default), acks=all waits for all in-sync replicas (slowest, strongest guarantee). For a QA pipeline producing disposable test events, acks=1 or even acks=0 is fine since losing a test message just means rerunning; for a payment service, acks=all is mandatory because losing a transaction record is unacceptable. Java analogy: like choosing fire-and-forget async logging versus a synchronous, confirmed database write.' },
              { level: 'basic', q: 'What is a Kafka Broker, and what happens to your producers/consumers if one broker in a 3-node cluster goes down?', a: 'A Broker is a single Kafka server that stores data and serves client requests; a cluster is multiple brokers working together. If one broker goes down, only the partitions where it was LEADER are affected — Kafka elects a new leader from remaining in-sync replicas, and clients reconnect to it, typically with a brief pause but no data loss (assuming replication factor ≥ 2). With replication factor 1 (no redundancy), losing that broker means permanently losing any partition it held — which is why replication factor 1 should never be used beyond local development.' },
              { level: 'basic', q: 'A topic is created with replication factor 1, and a teammate asks why this is risky even though it "works fine" in testing. What do you tell them?', a: 'Replication factor 1 means each partition has exactly one copy — no follower replicas — so the moment that broker fails or its disk corrupts, the data is gone permanently with zero recovery option. It "works fine" in testing precisely because nothing fails in a quick local test — the risk only materializes under real production failure conditions, exactly when you can least afford data loss. Production topics should use replication factor 3, tolerating up to 2 broker failures simultaneously. Java analogy: same risk as keeping your only database backup on a single unmirrored disk — fine until that disk dies.' },
              { level: 'basic', q: 'Two messages for the same user_id need to be processed in order downstream, but they sometimes arrive out of order. What is the most common cause, and how do you fix it at the producer side?', a: 'If the producer sends without an explicit key, Kafka may distribute messages across different partitions, and since Kafka only guarantees ordering WITHIN a partition, messages for the same entity can land on different partitions and be consumed out of order relative to each other. Fix: always set the message key to the logical ordering unit (key = user_id) — Kafka routes every message with that key to the same partition deterministically via hashing, guaranteeing per-key order. This doesn\'t guarantee global ordering across all users, only that messages sharing a key stay correctly ordered, which is exactly what most "ordering" requirements actually need.' },
              { level: 'basic', q: 'A producer adds a new required JSON field, immediately breaking every consumer with a parse error. How would Avro/Protobuf with Schema Registry have prevented this?', a: 'Plain JSON has no schema enforcement — any producer can add, remove, or rename fields, and consumers only discover the break at runtime. Avro/Protobuf with a Schema Registry enforces compatibility rules (e.g., BACKWARD requires new fields to have a default value) the moment a producer tries to register a new schema version — an incompatible change is rejected before it ever reaches a topic. This shifts a runtime production incident into a registration-time rejection, the same value as a typed API contract (a Java interface) versus untyped maps.' },
              { level: 'basic', q: 'You need to create a new topic that will eventually support 50 parallel consumers for scaling. What partition decision do you need to make upfront, and why?', a: 'Partition count sets the ceiling on parallelism — a consumer group can have at most as many ACTIVE consumers as there are partitions; extras simply sit idle. To support 50 parallel consumers, the topic needs at least 50 partitions: kafka-topics.sh --create --topic my-topic --partitions 50 --replication-factor 3. Increasing partition count later is possible but risky — it changes the hash(key) % numPartitions routing, breaking existing per-key ordering for remapped keys. Best practice: slightly over-provision upfront based on a realistic growth estimate, not as a quick later fix.' },
              { level: 'basic', q: 'A new QA engineer asks why Kafka consumers call poll() in a loop instead of Kafka pushing messages automatically like a webhook. How do you explain this?', a: 'Kafka consumers are pull-based: the consumer calls poll() repeatedly, asking for the next batch, rather than the broker pushing on its own schedule. This gives the consumer full control over its processing rate — a slow consumer simply polls less often instead of being overwhelmed by a flood of pushed messages, a real risk in push models. It also makes backpressure trivial: pausing consumption is just "stop calling poll()". This pull model is a core architectural difference and is why Kafka scales well for slow batch consumers alongside fast real-time ones.' },
              { level: 'basic', q: 'A flaky integration test occasionally shows the same Kafka message processed twice after a brief network blip, even though consumer logic looks correct. What producer-side setting addresses this?', a: 'Without enable.idempotence=true, a producer retry after a network blip (broker received it, but the ack was lost) can write the SAME message twice, since the producer can\'t know the broker already got it. Setting enable.idempotence=true (default true in modern clients) attaches a sequence number per partition, letting the broker recognize and discard an exact duplicate retry. This only solves duplicates from PRODUCER retries — a consumer crashing after processing but before committing its offset can still cause a different class of duplicate that idempotent producers don\'t address.' },
              { level: 'basic', q: 'An audit-events topic needs infinite retention for compliance, while a user-session "current state" topic only needs the latest value per key. How do you configure retention differently for each?', a: 'For the audit topic, set cleanup.policy=delete with a very long or infinite retention (retention.ms=-1) so every event is preserved as written, since compliance needs the full history. For the session-state topic, set cleanup.policy=compact instead — log compaction retains only the LATEST message per key, discarding older values, which is exactly the "current state" semantics needed and bounds disk usage. Mixing these up is a common mistake: delete-based retention on a state topic wastes disk on obsolete values, while compacting an audit topic destroys the history compliance needs.' },
              { level: 'basic', q: 'You need to manually verify a handful of messages landed correctly in a topic during a quick debugging session, without writing a full test script. What CLI tools would you use?', a: 'kafka-console-consumer.sh --topic my-topic --from-beginning --bootstrap-server localhost:9092 tails a topic\'s messages directly in the terminal, useful for sanity-checking what a producer actually wrote. kafka-console-producer.sh --topic my-topic --bootstrap-server localhost:9092 lets you manually type and send test messages without writing code. kafka-topics.sh --describe --topic my-topic shows partition count, replication factor, and leader/replica assignment — the first thing to check when something looks structurally wrong. These tools are the Kafka equivalent of curl-ing a REST API during debugging, before writing a proper automated test.' },
              { level: 'basic', q: 'For a given partition, what do "leader" and "follower" replica mean, and which one do producers and consumers actually talk to?', a: 'Each partition has one leader replica (handling all reads/writes) and zero or more followers that passively replicate the leader\'s data for redundancy. Producers and consumers always talk to the leader directly — followers exist purely for failover, not for serving traffic by default, so they don\'t reduce read load like a typical database read-replica. If the leader fails, Kafka promotes an in-sync follower, and clients automatically reconnect via cluster metadata. Adding more followers improves durability and failover speed, but does NOT by itself improve read throughput — a common misconception from traditional database replication.' },
              { level: 'basic', q: 'Your team is debating introducing a Schema Registry, and a developer asks "can\'t we just document the JSON shape in a wiki page instead?" How do you answer?', a: 'A wiki page is documentation nothing enforces — a producer can drift from it silently, and the only way to catch the drift is a consumer crashing in production weeks later. A Schema Registry makes the schema a first-class, enforced artifact: producers register a schema before publishing, consumers fetch the expected schema to deserialize correctly, and incompatible changes are rejected at registration time. It also enables safe schema evolution with explicit compatibility rules instead of "hope nobody notices." For any feature with more than one producer/consumer team, Schema Registry is the difference between an enforced contract and an honor system that eventually breaks.' },
              // ── INTERMEDIATE (extra) ────────────────────────────
              { level: 'intermediate', q: 'During a deploy, a consumer group briefly stops processing ANY messages even though only one of its five consumer instances was restarted. Why does restarting one consumer pause the whole group?', a: 'This is a rebalance: when group membership changes, Kafka\'s classic eager rebalancing protocol revokes ALL partition assignments across the ENTIRE group and reassigns from scratch — a brief "stop-the-world" pause for every consumer, not just the one that restarted. This is expected behavior, not a bug, but it directly impacts deploys: rolling-restarting 5 consumers one at a time can trigger 5 separate rebalances. For QA test pipelines asserting "near-zero processing gaps," this is a known source of flaky timing assertions during consumer deploys.' },
              { level: 'intermediate', q: 'Your deploys keep triggering disruptive consumer group rebalances because pods restart one at a time during a rolling update. How do you reduce this disruption without abandoning rolling deploys?', a: 'Use the Cooperative Sticky assignor (partition.assignment.strategy=CooperativeStickyAssignor) instead of the classic eager assignor — it rebalances incrementally, only reassigning partitions that actually need to move. For workloads where consumer identity matters (e.g., consumers with large local state), static membership (group.instance.id) lets a quickly-restarting consumer rejoin with its SAME partition assignment without triggering a rebalance at all, as long as it returns within session.timeout.ms. Combining both significantly reduces rolling-deploy disruption versus Kafka\'s older default behavior.' },
              { level: 'intermediate', q: 'A QA test asserts a message was written by checking for no exception from producer.send(), but occasionally a "successful" message never shows up in the topic. What acks misconfiguration explains this?', a: 'If acks=0, producer.send() returns successfully the instant the message hits the network buffer, with zero confirmation the broker ever received it — a dropped packet or broker hiccup can silently lose the message while the call reports success. The fix for a meaningful test assertion is acks=1 at minimum, or acks=all to match production durability guarantees. This is a common test-writing mistake: testing against acks=0 (often the unintentional default in quick setups) gives false confidence, when production runs with acks=all and very different failure characteristics.' },
              { level: 'intermediate', q: 'Your producer uses acks=all expecting maximum durability, but a single slow replica still causes occasional message loss during a broker outage. What setting did you likely forget alongside acks=all?', a: 'acks=all only waits for replicas currently in the ISR — if min.insync.replicas is left at its default of 1, a topic can have an ISR of just the leader itself, making acks=all functionally equivalent to acks=1 despite looking stricter. Setting min.insync.replicas=2 (with replication factor 3) forces the leader to reject writes (NotEnoughReplicas) unless at least 2 replicas are truly in sync — that\'s what actually prevents data loss during a broker failure. acks=all + min.insync.replicas=2 + replication.factor=3 is the standard "true durability" combination; using only one of the three leaves a gap.' },
              { level: 'intermediate', q: 'A consumer using auto-commit (enable.auto.commit=true) occasionally "loses" messages after a crash — committed but never finished processing. Why does auto-commit cause this, and what should you use instead?', a: 'Auto-commit commits offsets on a timer (auto.commit.interval.ms), independent of whether processing actually finished — if the consumer crashes between an auto-commit firing and the message being fully processed, that message is marked consumed but its side effect never happened, a silent data loss. The fix is manual commit (enable.auto.commit=false) plus calling consumer.commitSync() only AFTER processing genuinely completes. For a QA pipeline verifying at-least-once semantics, auto-commit should be explicitly disabled, since it can mask exactly the failure scenario the test is meant to catch.' },
              { level: 'intermediate', q: 'A payment-processing consumer fails on a malformed message and crashes the entire consumer thread, blocking all subsequent messages in that partition. How do you handle this without losing the bad message or blocking the partition forever?', a: 'Implement a Dead Letter Queue pattern: wrap processing in try/catch, and on failure publish the problematic message (plus error context) to a separate dead-letter-topic instead of crashing or silently dropping it, then commit the offset and continue. This unblocks the partition immediately rather than retrying the same poison message forever, while preserving it for manual inspection or reprocessing. For QA, this is a great test case: publish a malformed message and assert it lands in the DLQ with the expected error metadata, rather than crashing the consumer.' },
              { level: 'intermediate', q: 'Your team needs to continuously sync a Postgres table into Kafka, and separately push Kafka events into Elasticsearch, without writing custom producer/consumer code. What tool handles this, and how would QA validate it?', a: 'Kafka Connect is the framework for this: a Source Connector (Debezium for Postgres CDC) reads DB changes and publishes them as Kafka messages, while a Sink Connector (Elasticsearch Sink) consumes a topic and writes into Elasticsearch — both configured via JSON, no custom code for common cases. QA validation shifts to "test the connector\'s configuration and resulting data": insert a row in Postgres, assert the message appears in Kafka within an expected window, then assert it\'s indexed in Elasticsearch — validating the whole pipeline end-to-end rather than unit-testing connector internals you don\'t own.' },
              { level: 'intermediate', q: 'A feature reads from one topic, applies a stateful aggregation (running total per user), and writes to another topic. A developer proposes a plain consumer+producer pair. When is Kafka Streams the better choice?', a: 'A plain consumer+producer requires manually managing state (where\'s the running total stored? what if the process crashes mid-aggregation?), manual offset coordination between read/write sides, and manual exactly-once handling — problems Kafka Streams solves natively via state stores (RocksDB + changelog topics) and built-in exactly-once guarantees. For simple "read, transform, write" pipelines, plain clients are simpler; once you need windowed aggregations, joins, or fault-tolerant state surviving a crash, Streams\' abstractions save substantial custom infrastructure. Rule of thumb: stateless transform → plain client; stateful aggregation/join → Kafka Streams.' },
              { level: 'intermediate', q: 'Your QA team wants integration tests for Kafka producers/consumers that don\'t depend on a shared, always-running cluster. What\'s the standard approach, and what does it validate that mocking wouldn\'t?', a: 'Use Testcontainers\' Kafka module to spin up a real, ephemeral broker in Docker for each test run, then tear it down completely — every test gets a clean, isolated broker instead of fighting over shared state. This validates real wire-protocol behavior, partition/offset semantics, and serialization round-trips — things a mocked client cannot catch, since a mock only verifies "did my code call send() with these arguments," not "does this actually work against a real broker." The tradeoff is test speed — reserve Testcontainers tests for integration coverage, keep pure unit tests mocking the client for fast logic testing.' },
              { level: 'intermediate', q: 'You\'ve enabled idempotent producers, but consumers are still occasionally processing the same logical event twice. Why doesn\'t producer idempotence fully solve duplicates, and what consumer-side technique fixes the gap?', a: 'Idempotent producers only prevent duplicates from the PRODUCER retrying a send — they say nothing about a consumer that processes a message, performs its side effect, but crashes before committing its offset, causing redelivery and reprocessing after restart. The fix is consumer-side deduplication: track a unique message ID in your own datastore and check-and-skip if already processed before repeating the side effect. True exactly-once requires BOTH idempotent producers (no producer-side dupes) AND consumer-side dedup or transactional read-process-write (no consumer-side dupes) — relying on only one half is a common incomplete fix.' },
              { level: 'intermediate', q: 'A consumer group with 6 consumers and a 6-partition topic works fine, but after scaling to 10 consumers, 4 sit completely idle. Why, and what determines this assignment?', a: 'Each partition can only be actively consumed by ONE consumer in a group at a time — with 6 partitions, at most 6 consumers can do real work regardless of how many join; the partition assignor (Range, RoundRobin, Sticky) decides WHICH 6 get partitions, but can\'t manufacture more parallelism than partitions exist. The fix for true 10-way parallelism is increasing partition count to at least 10 (noting this can reshuffle key-based ordering). This is one of the most common Kafka scaling misunderstandings: adding consumers beyond partition count doesn\'t add throughput, just idle capacity.' },
              { level: 'intermediate', q: 'A consumer occasionally gets kicked from its group and triggers a rebalance even though it never crashed — logs show it was processing a large batch when this happened. What setting is the likely culprit, and how do you fix it?', a: 'max.poll.interval.ms defines the max time allowed between successive poll() calls before Kafka considers the consumer dead and evicts it — if processing a returned batch takes longer than this interval (default 5 minutes) before the next poll(), the consumer is evicted despite being alive. Fixes: reduce max.poll.records so batches are smaller and faster, increase max.poll.interval.ms if batches legitimately take longer, or move heavy processing to a separate thread pool so poll() can be called promptly. This is a frequent source of "mystery rebalances" in consumers doing CPU/IO-heavy work per message.' },
              { level: 'intermediate', q: 'Your "read from A, transform, write to B" pipeline needs true exactly-once semantics — no duplicate writes even if the process crashes mid-pipeline. How do Kafka Transactions solve this read-process-write pattern?', a: 'Kafka Transactions let a producer atomically commit BOTH the output messages to B AND the consumer offset commit for the input from A, as one all-or-nothing unit — eliminating the gap where a crash between "wrote output" and "committed input offset" causes reprocessing and duplicate output on restart. Implementation: producer.initTransaction(), beginTransaction(), produce to B, call sendOffsetsToTransaction() for the consumer\'s offsets, then commitTransaction() — consumers reading B must set isolation.level=read_committed to avoid seeing uncommitted writes. This is the pattern Kafka Streams uses internally for its own exactly-once guarantees, available directly to plain clients.' },
              { level: 'intermediate', q: 'A producer team wants to add a new field to their Avro schema, but Schema Registry rejects it with a compatibility error. What mode is likely configured, and how do you add the field successfully?', a: 'BACKWARD compatibility (the typical default) requires consumers using the OLD schema to still read data written with the NEW schema — adding a required field with no default breaks this, since old consumers wouldn\'t know how to interpret an unknown field with no fallback. The fix is making the new field optional with an explicit default value, which satisfies backward compatibility since old consumers ignore the unknown field and new consumers get the default for old messages lacking it. FORWARD ensures new-schema consumers can read old data, FULL requires both — choosing the wrong mode for your deployment order is a common "why won\'t my schema register" confusion.' },
              { level: 'intermediate', q: 'A dashboard shows "under-replicated partitions: 3" on your cluster, and a teammate asks if this is urgent. How do you explain the severity and what to check next?', a: 'Under-replicated means a partition\'s ISR has dropped below its configured replication factor — e.g., a factor-3 partition currently has only 2 (or fewer) truly caught-up replicas, shrinking the safety margin against further failures. It\'s not necessarily an active outage (the leader likely still serves reads/writes fine), but it IS urgent because it means reduced fault tolerance — one more broker or disk failure could now cause real data loss or unavailability. Check broker health (a down, overloaded, or network-troubled follower is the most common cause), broker replication error logs, and disk/network metrics — this is one of Kafka\'s most important early-warning signals and deserves its own alert, not just manual checking.' },
              { level: 'intermediate', q: 'Your company runs a shared Kafka cluster, and security wants to restrict the QA team\'s service accounts to read/write only specific test topics, not production topics. How do you implement this?', a: 'Configure SASL (e.g., SASL/SCRAM) for client authentication so each service account has its own credentials, combined with TLS/SSL for encrypting traffic. Then use Kafka ACLs (kafka-acls.sh) to grant specific permissions per principal — e.g., ALLOW READ,WRITE on topics matching "qa-*" for the QA account, with no grant (implicit deny) on production topic patterns. This is the same principle as database user permissions scoped to specific schemas: authentication proves WHO you are, ACLs control WHAT you can do, and together they prevent a leaked QA credential from becoming a production incident.' },
              { level: 'intermediate', q: 'A test asserts two same-key messages arrive at the consumer in send order, but the test is flaky — passes most of the time, fails occasionally. What\'s the likely cause, and how do you make the test deterministic?', a: 'If max.in.flight.requests.per.connection is greater than 1 without idempotence enabled, a producer can have multiple batches in flight simultaneously, and if an earlier batch needs retrying while a later one already succeeded, messages can land out of order despite sharing a key and partition — a genuinely intermittent, timing-dependent bug, not flaky test infrastructure. Setting enable.idempotence=true (which internally caps in-flight requests while preserving ordering even with retries) fixes this at the producer config level. The lesson: an "occasionally" flaky ordering test is often a real signal about producer configuration, not something to paper over with a test-level retry.' },
              // ── ADVANCED (extra) ────────────────────────────────
              { level: 'advanced', q: 'You\'re designing a topic expected to handle 200,000 messages/sec at peak, and a teammate suggests "just use 500 partitions to be safe." What are the actual tradeoffs of over-partitioning, and how would you size it properly?', a: 'More partitions isn\'t free: each consumes broker-side resources (file handles, replication memory, metadata overhead), and excessive count increases leader election time during failover and end-to-end latency in some configurations. Proper sizing works backward from target throughput per partition (roughly 10-15 MB/s sustained on typical hardware) and target max consumer parallelism (partition count = max useful consumer count) — calculate required MB/s from message size and rate, divide by per-partition capacity, round up modestly for headroom, not by guessing a large round number. Over-partitioning "to be safe" trades an imaginary future scaling problem for a real, immediate operational overhead problem.' },
              { level: 'advanced', q: 'Monitoring shows under-replicated partitions spiking specifically during your nightly batch job window, then recovering on their own. How do you root-cause this rather than just alerting and moving on?', a: 'Correlate timing precisely: check broker-level network/disk I/O during that exact window — a nightly batch job often saturates disk I/O or network bandwidth on shared hosts, causing followers to fall behind the leader temporarily, reported as under-replication even though no broker crashed. Check replica.lag.time.max.ms — if followers are merely slow rather than dead, increasing this threshold slightly reduces noisy alerts for transient, self-healing slowness, though the underlying resource contention should still be fixed (separate the batch job\'s I/O or reschedule it) rather than purely tuning the symptom. A pattern that recovers every night without intervention is a real resource contention issue, not a Kafka bug.' },
              { level: 'advanced', q: 'A broker crashes during peak traffic, and producers using acks=all see a brief latency spike and a handful of NotEnoughReplicasException errors, even with replication factor 3. Is this expected, and what determines disruption length?', a: 'Yes, expected: when a broker holding partition leadership crashes, Kafka must detect the failure, elect a new leader from remaining in-sync replicas, and propagate that identity to all clients before traffic resumes normally — during this window, requests to affected partitions fail or stall, exactly matching the observed errors. Disruption duration is governed primarily by broker failure-detection settings (replica.lag.time.max.ms, session timeouts) — tuning these too aggressively reduces failover time but increases false-positive detection during transient slowness; too conservative increases real failover time. This tradeoff is usually tuned empirically against acceptable failover-time SLAs versus acceptable false-alarm rate.' },
              { level: 'advanced', q: 'Your company is expanding to a second region and wants events from the primary Kafka cluster available in the secondary region for disaster recovery. What tool handles this, and what\'s the key gotcha with offsets across clusters?', a: 'MirrorMaker 2 (MM2) replicates topics from a source cluster to a target cluster across regions, handling topic creation, config sync, and ongoing replication. The key gotcha: offsets are NOT preserved identically across clusters — a message at offset 1000 in the source may land at a different offset in the mirrored topic, since the target has its own independent offset sequence. A consumer failing over to the secondary region cannot simply resume from "the same offset" — MM2 provides offset translation tools specifically for this, and any DR failover plan must account for it rather than assuming offsets are portable, a common and costly DR design mistake.' },
              { level: 'advanced', q: 'A financial reporting pipeline reads from topic A, aggregates totals, and writes to topic B, and cannot double-count a transaction even during a mid-pipeline crash-and-restart. Walk through how Kafka Transactions prevent the double-count at the protocol level, not just the API calls.', a: 'Internally, the transactional producer registers with a transaction coordinator (a designated broker) that tracks transaction state and writes special control markers to the topics involved, indicating commit or abort. When the producer calls commitTransaction(), the coordinator writes a commit marker to every touched partition (including the __consumer_offsets partition, since offset commits are themselves writes) — consumers with isolation.level=read_committed skip messages from a transaction that hasn\'t committed or that aborted, so a crash between writing output and committing simply leaves an uncommitted transaction that read_committed consumers never see. The guarantee comes from the broker-side transaction log and marker mechanism, which is why both producer AND consumer config (read_committed) must be correct end-to-end.' },
              { level: 'advanced', q: 'A consumer group keeps rebalancing every few minutes in a continuous loop — a "rebalance storm" — even though no deploys are happening and no consumers are crashing. How do you diagnose the actual cause?', a: 'First check session.timeout.ms against actual heartbeat behavior — if consumers do heavy synchronous processing between poll() calls without separating heartbeat responsiveness from processing time, they can repeatedly appear dead, get evicted, rejoin, and get evicted again in a loop. Second, check max.poll.interval.ms against real per-batch processing time under current load — if processing occasionally exceeds it under load spikes, you get an eviction-rejoin loop that looks like a "storm" but is actually a config-vs-workload mismatch. Third, rule out network instability between consumers and the coordinator broker before assuming it\'s purely a client configuration issue — distinguishing "my code is too slow" from "the network keeps dropping" requires correlating consumer logs with broker-side group coordinator logs.' },
              { level: 'advanced', q: 'Leadership asks you to estimate broker count, disk, and network capacity for a new cluster expected to handle 5 TB/day of events with 7-day retention. Walk through the capacity planning approach.', a: 'Start from total storage: 5 TB/day × 7 days × replication factor 3 = 105 TB of raw disk needed across the cluster (replication multiplies storage), then divide by target per-broker disk capacity (leaving headroom, never plan to 100% utilization) for a baseline broker count, then cross-check against throughput: 5 TB/day ≈ 58 MB/s sustained average (with real peak-to-average ratios typically 3-5x higher, so design for peak), divided by realistic per-broker network/disk capacity. Round up the larger of the two estimates, add brokers for fault-tolerance headroom, and validate with a load test before purchasing hardware — back-of-envelope planning gets you the right order of magnitude, but load testing catches assumptions that don\'t hold.' },
              { level: 'advanced', q: 'A producer team needs to remove a field from their Avro schema, deprecated for months, but doing so immediately would break any consumer still reading it. What\'s the safe, zero-downtime process for removing a schema field in production?', a: 'First confirm the field is genuinely unused by checking consumer code/logs — removing on a deadline without this verification is how "safe" cleanups cause incidents. Under FULL or FORWARD compatibility, the field can typically be removed only if it had a default value when added (most schema evolution rules require defaults specifically to make later removal safe) — if added without a default, deploy an intermediate version making it optional with a default first, let that propagate, then remove it later. The actual zero-downtime mechanism is Schema Registry compatibility checking rejecting the removal if it breaks the configured rule — a successful registration is registry-verified safe; a rejection is catching a real incompatibility before production, not bureaucracy.' },
              { level: 'advanced', q: 'Your Kafka Streams application crashed mid-processing and lost its local RocksDB state store. How does Streams recover the aggregation state without custom recovery code, and what determines recovery time?', a: 'Kafka Streams backs every state store with a changelog topic — every state mutation is also written there, so on restart, Streams replays the changelog (from the beginning, or from the last surviving local checkpoint) to rebuild the RocksDB store to its exact pre-crash state, with zero custom code required. Recovery time depends on changelog size and how much local state was lost — a fresh instance must replay the entire changelog (slow for large state), while one restarting on the same disk with intact files only replays the small gap since its last checkpoint (fast). For large stateful apps, standby replicas (num.standby.replicas) maintain a warm copy on another instance specifically to make failover near-instant instead of a full replay.' },
              { level: 'advanced', q: 'Your producer throughput meets requirements, but you\'re told to reduce per-message latency for a new low-latency use case sharing the same producer code path. What\'s the fundamental tradeoff in tuning linger.ms and batch.size?', a: 'linger.ms tells the producer to wait up to N milliseconds collecting messages into a batch before sending, trading a small added latency for better throughput (larger batches = fewer round-trips, better compression); batch.size caps batch growth regardless of the linger timer. For low latency, reducing linger.ms toward 0 sends almost immediately at the cost of smaller, less efficient batches — the classic throughput-vs-latency tradeoff. Since the use case shares a code path with the higher-throughput workload, the cleanest fix is a SEPARATE producer instance with its own tuned settings, rather than compromising the existing throughput-optimized producer for everyone — one config rarely serves two genuinely different latency requirements well.' },
              { level: 'advanced', q: 'QA environments keep colliding because two parallel test suites both produce/consume from the same shared "orders" topic, causing one suite to consume the other\'s test data and fail unpredictably. How do you design Kafka test isolation that scales to many parallel runs?', a: 'The most robust approach is per-test-run topic namespacing: each run generates a unique topic name (e.g., orders-test-${CI_RUN_ID}) at setup, both producer and consumer use it, and a teardown step deletes it afterward — guaranteeing complete isolation since runs are structurally incapable of touching the same topic. An alternative where topics can\'t be dynamically created: a unique consumer group ID per run combined with always seeking to a specific offset/timestamp captured at test start, so each test only sees messages produced after it began — more fragile than topic-per-run, but workable when topic creation is restricted. Relying on a single shared topic across parallel suites without SOME isolation mechanism is the root cause, not a Kafka bug to work around with retries.' },
              { level: 'advanced', q: 'Consumer lag on a specific topic spikes reliably every day between 2-4pm, then recovers on its own, and the team has been ignoring it since "it always recovers." How do you investigate whether this is actually safe to ignore?', a: 'First correlate the spike timing against upstream producer volume — if 2-4pm is simply your traffic peak and the consumer fully catches up afterward within an acceptable SLA, this may genuinely be benign capacity matching demand variation, not a bug. However, "always recovers" isn\'t the same as "safe" — check whether downstream consumers of this data (dashboards, alerts, dependent services) have time-sensitivity during that window, since temporary lag means temporarily stale output that might violate an SLA nobody\'s checked. If the lag trend is slowly growing over weeks (each peak recovering to a slightly higher baseline), that\'s a genuine capacity problem masked by daily recovery — track the recovery baseline over time, not just whether it recovers today.' },
              { level: 'advanced', q: 'Multiple teams share one Kafka cluster, and one team\'s misbehaving producer recently flooded the cluster with traffic, degrading performance for every other team simultaneously. How do you prevent a single noisy tenant from impacting the whole shared cluster going forward?', a: 'Configure Kafka Quotas (per client-id or principal) to cap the produce/consume byte-rate and request-rate any single client can sustain, so a buggy producer hits a hard ceiling instead of monopolizing broker resources others depend on — functionally the same concept as Docker/Kubernetes resource limits, applied to Kafka client throughput. Beyond quotas, multi-tenant governance benefits from naming-convention-enforced topic ACLs (teams can\'t produce to topics they don\'t own) and per-team monitoring dashboards that quickly attribute a cluster-wide slowdown to a specific client-id. For genuinely high-stakes isolation (regulatory separation, wildly different SLAs), separate clusters per business unit may eventually be warranted, but quotas are the first and usually sufficient line of defense.' },
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
          
        retryQuestion: {
      "question": "Kafka'da bir consumer bir mesajı okuduktan sonra broker üzerinde nasıl bir değişiklik gerçekleşir?",
      "options": [
            {
                  "id": "a",
                  "text": "Mesajın okunma durumu 'okundu' olarak güncellenir ve veritabanından silinir."
            },
            {
                  "id": "b",
                  "text": "Mesajın içeriği consumer'a iletildikten sonra broker'dan hemen temizlenir."
            },
            {
                  "id": "c",
                  "text": "Broker üzerinde mesaj verisi silinmez, sadece ilgili consumer grubu için offset bilgisi güncellenir."
            },
            {
                  "id": "d",
                  "text": "Mesaj, işlenmesi için geçici bir 'processing' dizinine taşınır."
            }
      ],
      "correct": "c",
      "explanation": "Kafka, 'log-based' bir yapıdır. Bir mesaj tüketildiğinde broker mesajı silmez veya değiştirmez. Mesaj, topic'in yapılandırılmış retention süresi boyunca fiziksel olarak diskte tutulmaya devam eder. Consumer sadece kendi okuma ilerlemesini (offset) takip eder, bu sayede aynı mesaj farklı consumer grupları tarafından tekrar tekrar okunabilir."
}
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
          {
            type: 'quiz',
            question: 'Production\'da Kafka\'yı tek bir VM üzerinde "bare binary" olarak çalıştırmak yerine Kubernetes üzerinde Strimzi veya Confluent Cloud kullanmak neden tercih edilir?',
            options: [
              { id: 'a', text: 'Bare binary kurulumlar producer\'lara bağlanamaz' },
              { id: 'b', text: 'Managed/operator çözümler broker failover, ölçekleme ve upgrade\'leri otomatik yönetir — bare binary\'de bunların hepsini kendin inşa etmen gerekir' },
              { id: 'c', text: 'Bare binary Kafka topic desteklemez' },
              { id: 'd', text: 'Confluent Cloud Java client desteği sunan tek seçenektir' },
            ],
            correct: 'b',
            explanation: 'Bare binary kurulum sana çalışan bir broker verir ama başka hiçbir şey vermez — bir broker öldüğünde otomatik failover yok, rolling upgrade yok, yerleşik monitoring yok. Strimzi (bir Kubernetes operator\'ü) ve Confluent Cloud (tamamen yönetilen) tam olarak bu operasyonel ihtiyaçları çözer — bu yüzden production deploymentlar broker lifecycle\'ını elle yönetmek yerine bunlardan birini seçer.',
            retryQuestion: {
              question: 'Self-managed (bare binary) bir Kafka cluster\'ında bir broker sabah 3\'te çöküyor. Hiçbir operator/yönetilen servis yokken gerçekte ne olur?',
              options: [
                { id: 'a', text: 'Kafka otomatik olarak yedek bir broker sağlar' },
                { id: 'b', text: 'Hiçbir şey otomatik olarak olmaz — bir nöbetçi mühendisin fark edip broker\'ı manuel yeniden başlatması/değiştirmesi gerekir' },
                { id: 'c', text: 'Cluster, veri kaybını önlemek için otomatik olarak kapanır' },
                { id: 'd', text: 'Confluent Cloud, hiç yapılandırılmamış olsa da devreye girer' },
              ],
              correct: 'b',
              explanation: 'Bare binary kurulumda broker sağlığını izleyen hiçbir otomasyon yoktur — ekip kendi monitoring/alerting/restart araçlarını kurmadıysa kurtarma tamamen manueldir. Bu, Strimzi\'nin (istenen durumla gerçek cluster durumunu otomatik uzlaştıran) veya Confluent Cloud gibi yönetilen bir servisin ekibin sırtından aldığı tam olarak bu operasyonel yüktür.',
            },
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
          
        retryQuestion: {
      "question": "Kafka'da 'Offset' kavramı neyi ifade eder?",
      "options": [
            {
                  "id": "a",
                  "text": "Topic içindeki partition'ların toplam sayısıdır."
            },
            {
                  "id": "b",
                  "text": "Bir partition içerisindeki mesajın konumunu belirten sıralı, artan bir indekstir."
            },
            {
                  "id": "c",
                  "text": "Mesajın broker'a ulaştığı milisaniye cinsinden zaman damgasıdır."
            },
            {
                  "id": "d",
                  "text": "Consumer'ın bir mesajı işlemek için harcadığı toplam süredir."
            }
      ],
      "correct": "b",
      "explanation": "Offset, bir partition içindeki her mesaja atanan, 0'dan başlayan sıralı bir tanımlayıcıdır. Consumer'lar, kaldıkları yerden devam edebilmek veya geçmişe dönüp tekrar okuma yapabilmek için bu offset değerini kullanırlar. Offset, mesajların sırasını belirleyen temel mekanizmadır."
}
},
        ],
      },
      {
        title: '📡 Producer & Consumer',
        blocks: [
          {
            type: 'simulation',
            icon: '🟠',
            color: '#f97316',
            title: { tr: 'Kafka Mesaj Akışı — Producer → Broker → Consumer', en: 'Kafka Message Flow — Producer → Broker → Consumer' },
            scenario: 'kafka-flow',
            description: {
              tr: '"▶ Mesaj Gönder" butonuna bas: Mesajın Producer\'dan partition\'a, broker\'a ve Consumer\'a olan yolculuğunu canlı izle. Sağda her adımın Kafka kodu gösterilir.',
              en: 'Press "▶ Mesaj Gönder": watch the message journey from Producer to partition, broker, and Consumer. The right panel shows the Kafka code for each step.',
            },
            code: `// Java — Producer mesaj gönder
ProducerRecord<String, String> record = new ProducerRecord<>(
    "siparisler",           // topic
    "kullanici-123",        // key → partition belirler
    "{\"siparisId\":\"SIP-456\"}" // value
);
producer.send(record);     // → Partition 1, Offset 42

// Java — Consumer mesaj oku
ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
for (ConsumerRecord<String, String> r : records) {
    System.out.println("topic=" + r.topic() +
        ", partition=" + r.partition() +
        ", offset=" + r.offset() +
        ", key=" + r.key() +
        ", value=" + r.value());
    // siparisIsleme(r.value()); → İş mantığı burada
}
consumer.commitSync(); // Offset'i ilerlet: 42 → 43`,
            language: 'java',
          },
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
          
        retryQuestion: {
      "question": "Bir Kafka topic'inin 4 partition'ı ve aynı tüketici grubuna bağlı 6 consumer instance'ı varsa sistem nasıl davranır?",
      "options": [
            {
                  "id": "a",
                  "text": "6 consumer, 4 partition'ı kendi aralarında paylaşıp aynı anda çalışır."
            },
            {
                  "id": "b",
                  "text": "4 consumer birer partition'dan veri çekerken, 2 consumer boşta (idle) kalır."
            },
            {
                  "id": "c",
                  "text": "Kafka hata verir ve tüketicilerin başlamasını engeller."
            },
            {
                  "id": "d",
                  "text": "Tüm 6 consumer, veriyi verimli bir şekilde tüketmek için partition'ları alt parçalara böler."
            }
      ],
      "correct": "b",
      "explanation": "Kafka'da bir partition aynı anda aynı consumer grubundan en fazla bir consumer tarafından okunabilir. Bu nedenle, partition sayısından fazla consumer olması durumunda, fazla olan consumer'lar herhangi bir partition ataması almazlar ve pasif kalırlar. Ölçeklenebilirliği artırmak için partition sayısını, consumer sayısına eşit veya daha fazla olacak şekilde ayarlamak gerekir."
}
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
          {
            type: 'quiz',
            question: '3 broker\'lı bir production cluster\'da en fazla 2 broker\'ın kaybını mesaj kaybetmeden tolere etmek istiyorsun. Topic\'te hangi `replication.factor` ayarlanmalı?',
            options: [
              { id: 'a', text: '1' },
              { id: 'b', text: '2' },
              { id: 'c', text: '3' },
              { id: 'd', text: '0' },
            ],
            correct: 'c',
            explanation: '`replication.factor=3` ile her partition 3 broker arasında dağılmış 1 leader ve 2 follower\'a sahip olur. Bir broker ölürse, follower\'lardan biri otomatik olarak leader\'a yükseltilir ve veri kaybı olmaz. Gerçek fault tolerance için standart production kuralı: replication factor = broker sayısı (minimum 3) — replication.factor=1, tek bir broker arızasında o partition\'ın tamamen kaybolması anlamına gelir.',
            retryQuestion: {
              question: 'Bir topic\'te `replication.factor=3` ama `min.insync.replicas=1` ayarlı. Bir producer `acks=all` ile gönderiyor. Bu kombinasyon gerçekte ne garanti eder?',
              options: [
                { id: 'a', text: 'Mesaj sadece 3 replikanın hepsi onayladıktan sonra dayanıklı sayılır' },
                { id: 'b', text: 'Mesaj sadece 1 replika (leader) onayladığında yazılmış sayılır, 3 kopya yapılandırılmış olsa bile' },
                { id: 'c', text: 'Producer hiçbir zaman onay almaz' },
                { id: 'd', text: 'Kafka bu konfigürasyonu geçersiz sayıp reddeder' },
              ],
              correct: 'b',
              explanation: '`min.insync.replicas`, bir yazmanın başarılı sayılması için kaç replikanın onaylaması gerektiğini kontrol eder — 1 olarak ayarlandığında, `replication.factor=3` sonunda 3 kopya oluşturacak olsa bile sadece leader\'ın onaylaması yeterlidir. Bu gerçek bir production tuzağıdır: yüksek bir replication factor tek başına, `min.insync.replicas` düşük bırakılırsa güçlü dayanıklılığı garanti etmez.',
            },
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
          {
            type: 'quiz',
            question: 'Dışarıda çalışan bir Kafka cluster\'ına bağımlı olmadan bir Spring Boot Kafka consumer\'ı için hızlı bir unit/integration testi yazmak istiyorsun. Doğru araç hangisidir?',
            options: [
              { id: 'a', text: 'Gerçek bir Docker Kafka broker\'ı başlatan Testcontainers' },
              { id: 'b', text: '@EmbeddedKafka' },
              { id: 'c', text: 'CI runner\'a elle kurulmuş bir Kafka' },
              { id: 'd', text: 'Tüm Spring context\'ini mock\'lamak' },
            ],
            correct: 'b',
            explanation: '@EmbeddedKafka, test JVM\'inin kendi içinde bellekte (in-memory) bir Kafka broker\'ı başlatır — Docker yok, dış cluster yok, ağ bağımlılığı yok. Gerçek unit/integration testleri için en hızlı seçenektir. Testcontainers ise bir seviye yukarıda, davranışı gerçek bir Kafka Docker container\'ına (production\'a daha yakın) karşı özellikle doğrulamak istediğinde doğru araçtır — bunun karşılığında test başlangıcı daha yavaştır.',
            retryQuestion: {
              question: 'Bir ekip, CI testinin sadece gerçek Kafka broker binary\'sinde (in-memory @EmbeddedKafka implementasyonunda değil) ortaya çıkan gerçek bir bug\'ı yakalamasını istiyor. Burada hangi araç daha uygundur?',
              options: [
                { id: 'a', text: '@EmbeddedKafka, çünkü her zaman daha iyi seçimdir' },
                { id: 'b', text: 'Testcontainers, çünkü gerçek bir Kafka Docker container\'ı çalıştırır, production\'da gerçekte çalışana daha yakındır' },
                { id: 'c', text: 'Hiçbiri — bu tür bir bug CI\'da yakalanamaz' },
                { id: 'd', text: 'CI runner\'a manuel kurulan bir Kafka, çünkü container\'lar Kafka çalıştıramaz' },
              ],
              correct: 'b',
              explanation: '@EmbeddedKafka hafif bir bellek içi yeniden implementasyondur — hızlıdır ama gerçek broker binary\'siyle byte-identik değildir, bu yüzden broker\'a özgü davranışları kaçırabilir. Testcontainers gerçek Kafka Docker image\'ını başlatır, bir kısım test başlangıç hızını production\'a daha yakın bir doğruluk için takas eder — gerçek broker davranışına karşı doğrulama yapman gerektiğinde doğru seçim budur.',
            },
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
          {
            type: 'quiz',
            question: 'Yeni bir consumer group, başka consumer\'lar tarafından zaten okunup onaylanmış olsa bile bir topic\'in son 7 gününün event\'lerini yeniden işlemek istiyor. Kafka\'da bu mümkün mü, ve RabbitMQ/ActiveMQ aynı istekte neden zorlanır?',
            options: [
              { id: 'a', text: 'Hiçbirinde mümkün değil — mesajlar okunduktan sonra gider' },
              { id: 'b', text: 'Kafka\'da mümkün çünkü mesajlar retention policy\'ye göre log\'da kalır ve herhangi bir offset\'ten replay edilebilir; RabbitMQ/ActiveMQ onaylanan mesajı siler' },
              { id: 'c', text: 'Sadece producer\'dan her şeyi yeniden göndermesi istenerek mümkün' },
              { id: 'd', text: 'Sadece broker yeniden başlatılırsa mümkün' },
            ],
            correct: 'b',
            explanation: 'Kafka log tabanlıdır: mesajlar bir consumer onları okumuş olsa da olmasa da yapılandırılan retention süresi boyunca (örn. 7 gün) diskte kalır, böylece yepyeni bir consumer group basitçe offset 0\'dan (veya istenen herhangi bir offset\'ten) başlayıp geçmişi replay edebilir. RabbitMQ/ActiveMQ queue tabanlıdır — bir mesaj onaylandığında silinir, replay edecek bir şey kalmaz. Kafka\'nın event streaming/audit log/CDC için, geleneksel queue\'ların ise task dağıtımı/RPC için seçilmesinin temel mimari nedeni budur.',
            retryQuestion: {
              question: 'Bir ekip "her görevi tam olarak bir worker\'a dağıt" pattern\'ine ihtiyaç duyuyor (örn. her resim boyutlandırma işini sadece bir uygun worker\'a gönder, asla çoğaltmadan). Bu durumda doğal olarak Kafka mı yoksa geleneksel bir queue (RabbitMQ) mı daha uygundur?',
              options: [
                { id: 'a', text: 'Kafka, çünkü her zaman daha modern seçimdir' },
                { id: 'b', text: 'RabbitMQ, çünkü competing-consumer task queue\'ları tam olarak queue tabanlı sistemlerin tasarlandığı şeydir' },
                { id: 'c', text: 'Hiçbiri bunu yapamaz' },
                { id: 'd', text: 'Kafka, çünkü daha fazla retention\'ı var' },
              ],
              correct: 'b',
              explanation: 'Kafka event streaming/replay\'de üstündür (birçok consumer group aynı log\'u bağımsız olarak yeniden okuyabilir), ama klasik "bu görevi tam olarak bir worker işlesin" dağıtımı RabbitMQ gibi queue tabanlı bir sistemin doğal kullanım alanıdır — bir mesaj bir worker tarafından onaylandığında kaldırılır. Aracı, hangi teknolojinin daha yeni olduğuna göre değil gerçek erişim pattern\'ine (replay/audit mi task dağıtımı mı) göre seçmek daha önemlidir.',
            },
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
                solution:'5-10 saniye bekle ve yeniden dene. Kalıcıysa: kubectl get pods -n kafka (broker çöküyor olabilir). ZooKeeper bağlantısını kontrol et.',
              },
              {
                error: 'Consumer group aynı offset\'te takılı (lag azalmıyor)',
                cause: 'Consumer, her seferinde exception fırlatan zehirli bir mesajı işliyor. DLT olmadan aynı mesaj sürekli tekrar denenir.',
                solution:'Dead Letter Topic uygula (DLT bölümüne bak). Kısa vadede offset\'i manuel atla:\nkubectl exec -it kafka-broker -- kafka-consumer-groups.sh \\\n  --bootstrap-server localhost:9092 \\\n  --group benim-group --topic siparisler --reset-offsets \\\n  --to-current --execute',
              },
              {
                error: 'Deserialization error (Cannot deserialize)',
                cause: 'Producer mesaj schema\'sını değiştirdi (zorunlu alan ekledi, tip değiştirdi) ama consumer eski schema\'yı bekliyor.',
                solution:'Schema Registry kullan, backward/forward compatibility ayarla. Consumer config\'de trusted.packages\'ı kontrol et.',
              },
              {
                error: 'Connection refused (localhost:9092)',
                cause: 'Uygulama Kafka\'ya bağlanamıyor. Yanlış bootstrap-servers adresi, Kafka çalışmıyor veya network sorunu.',
                solution:'Kafka\'nın çalıştığını doğrula: docker compose ps veya kubectl get pods -n kafka.\napplication.yml\'deki bootstrap-servers gerçek Kafka adresiyle eşleşmeli.\nDocker içinde: localhost değil servis adı kullan (kafka:29092).',
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
          {
            type: 'quiz',
            question: 'Bir consumer, belirli bir "zehirli" mesajı işlerken her seferinde çöküyor ve consumer group lag\'i hiç azalmıyor. Dead Letter Topic olmadan bu döngü neden sonsuza kadar sürer?',
            options: [
              { id: 'a', text: 'Kafka zehirli mesajları 3 retry sonra otomatik siler' },
              { id: 'b', text: 'İşleme exception fırlattığı için offset asla commit edilmez, bu yüzden aynı mesaj her poll\'da yeniden gönderilir' },
              { id: 'c', text: 'Broker yeniden başlar ve mesajı temizler' },
              { id: 'd', text: 'Consumer group otomatik olarak sıradaki mesaja atlar' },
            ],
            correct: 'b',
            explanation: 'Kafka, bir consumer\'ın offset\'ini sadece açıkça commit edildiğinde ilerletir — işleme bu commit\'ten önce exception fırlatırsa, aynı mesaj bir sonraki poll\'da yeniden gönderilir, çünkü Kafka\'ya consumer\'ın bu mesajı bitirdiği hiç söylenmemiştir. Dead Letter Topic bu döngüyü kırar: yapılandırılan retry sayısı sonrası başarısız mesaj manuel inceleme için ayrı bir DLT\'ye yönlendirilir ve ana consumer\'ın offset\'i onun ötesine ilerler — fallback handler\'lı bir try-catch ile aynı pattern.',
            retryQuestion: {
              question: 'Bir consumer, başarısız bir mesajı DLT\'ye göndermeden önce en fazla 3 kez tekrar denemek üzere yapılandırılmış. Mesaj DLT\'ye yönlendirildikten sonra, ana consumer\'ın sıradaki mesajları işlemesine ne olur?',
              options: [
                { id: 'a', text: 'DLT olmadığı gibi sonsuza kadar takılı kalır' },
                { id: 'b', text: 'Offset\'i zehirli mesajın ötesine ilerler, böylece sıradaki mesajları normal şekilde işlemeye devam eder' },
                { id: 'c', text: 'Tüm consumer group kapanır' },
                { id: 'd', text: 'Zehirli mesaj otomatik olarak 4. kez işlenir' },
              ],
              correct: 'b',
              explanation: 'Maksimum retry sonrası DLT\'ye yönlendirmenin tüm amacı, ana consumer\'ın zehirli mesajın ötesine commit edip normal işlemeye devam etmesini sağlamaktır — bu olmadan, partition\'da zehirli mesajın arkasındaki her mesaj da beklemede kalırdı. Zehirli mesajın kendisi kaybolmaz, daha sonraki manuel inceleme için DLT\'de korunur.',
            },
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
              // ── TEMEL (ek) ──────────────────────────────────────
              { level: 'basic', q: "Kafka Producer nedir ve QA test pipeline'ında kullan-at test event'leri yazarken ile bir ödeme servisinde hangi acks ayarını değiştirirsin?", a: "Producer, bir Kafka topic'ine mesaj yazan client'tır. acks ayarı durabilility'i kontrol eder: acks=0 fire-and-forget (onay yok, en hızlı, sessizce mesaj kaybedebilir), acks=1 partition leader'ın mesajı yazmasını bekler (iyi bir varsayılan), acks=all tüm in-sync replica'ların onayını bekler (en yavaş, en güçlü garanti). Kullan-at test event'i üreten bir QA pipeline'ı için acks=1 veya hatta acks=0 sorun değildir çünkü bir test mesajını kaybetmek sadece yeniden çalıştırmak demektir; bir ödeme servisi için acks=all zorunludur çünkü bir işlem kaydını kaybetmek kabul edilemez. Java analojisi: fire-and-forget async logging ile senkron, onaylı bir veritabanı yazması arasında seçim yapmak gibi." },
              { level: 'basic', q: "Kafka Broker nedir ve 3 node'lu bir cluster'da bir broker düştüğünde producer/consumer'larına ne olur?", a: "Broker, veriyi saklayan ve client isteklerine cevap veren tek bir Kafka sunucusudur; cluster birden fazla broker'ın birlikte çalışmasıdır. Bir broker düşerse, sadece onun LEADER olduğu partition'lar etkilenir — Kafka kalan in-sync replica'lardan yeni bir leader seçer, client'lar ona yeniden bağlanır, genellikle kısa bir duraklama olur ama veri kaybı olmaz (replication factor ≥ 2 ise). Replication factor 1 ile (yedeklilik yok), o broker'ı kaybetmek tuttuğu her partition'ı kalıcı olarak kaybetmek demektir — bu yüzden replication factor 1 lokal geliştirme dışında asla kullanılmamalı." },
              { level: 'basic', q: "Bir topic replication factor 1 ile oluşturulmuş ve bir takım arkadaşı testte \"sorunsuz çalışsa\" da bunun neden riskli olduğunu soruyor. Ne söylersin?", a: "Replication factor 1, her partition'ın tam olarak bir kopyası olduğu anlamına gelir — follower replica yok — bu yüzden o broker çöktüğü veya diski bozulduğu anda, veri kalıcı olarak gider, kurtarma seçeneği sıfırdır. Testte \"sorunsuz çalışması\" tam olarak hızlı bir lokal testte hiçbir şeyin başarısız olmamasından kaynaklanır — risk sadece veri kaybını en az karşılayabileceğin gerçek production başarısızlık koşullarında ortaya çıkar. Production topic'leri replication factor 3 kullanmalı, aynı anda 2 broker başarısızlığına tolerans gösterir. Java analojisi: tek, aynalanmamış bir diskte tek veritabanı yedeğini tutmakla aynı risk — disk ölene kadar sorunsuz." },
              { level: 'basic', q: "Aynı user_id için iki mesajın downstream'de sırayla işlenmesi gerekiyor, ama bazen sırasız geliyorlar. En yaygın sebep nedir ve producer tarafında nasıl düzeltirsin?", a: "Producer açık bir key olmadan gönderiyorsa, Kafka mesajları farklı partition'lara dağıtabilir, ve Kafka sadece bir partition İÇİNDE sıralama garantisi sağladığından, aynı varlığa ait mesajlar farklı partition'lara düşüp birbirine göre sırasız tüketilebilir. Çözüm: mesaj key'ini her zaman mantıksal sıralama birimine ayarla (key = user_id) — Kafka o key'e sahip her mesajı hashleme yoluyla deterministik olarak aynı partition'a yönlendirir, key başına sıralamayı garanti eder. Bu tüm kullanıcılar arasında global sıralama garantilemez, sadece aynı key'i paylaşan mesajların doğru sırada kalmasını garantiler, ki bu çoğu \"sıralama\" gereksiniminin gerçekte ihtiyaç duyduğu şeydir." },
              { level: 'basic', q: "Bir producer yeni bir zorunlu JSON alanı ekliyor ve anında her consumer'ı bir parse hatasıyla bozuyor. Schema Registry'li Avro/Protobuf bunu nasıl önlerdi?", a: "Düz JSON'da şema zorlaması yoktur — herhangi bir producer alan ekleyebilir, kaldırabilir veya yeniden adlandırabilir, consumer'lar bozulmayı sadece runtime'da fark eder. Schema Registry'li Avro/Protobuf, bir producer yeni bir şema versiyonu kaydetmeye çalıştığı anda uyumluluk kurallarını (örn. BACKWARD yeni alanların varsayılan değere sahip olmasını gerektirir) zorlar — uyumsuz bir değişiklik bir topic'e ulaşmadan önce reddedilir. Bu, bir runtime production olayını bir kayıt-zamanı reddine çevirir, tiplenmiş bir API kontratının (bir Java interface'i) tiplenmemiş map'lere göre sağladığı aynı değer." },
              { level: 'basic', q: "Sonunda 50 paralel consumer'ı desteklemesi gereken yeni bir topic oluşturman gerekiyor. Önceden hangi partition kararını vermelisin ve neden?", a: "Partition sayısı paralellik tavanını belirler — bir consumer group en fazla partition sayısı kadar AKTİF consumer'a sahip olabilir; fazlası sadece boşta oturur. 50 paralel consumer'ı desteklemek için topic'in en az 50 partition'a ihtiyacı var: kafka-topics.sh --create --topic my-topic --partitions 50 --replication-factor 3. Partition sayısını sonradan artırmak mümkündür ama risklidir — hash(key) % partitionSayisi yönlendirmesini değiştirir, yeniden eşlenen key'ler için mevcut key-bazlı sıralamayı bozar. En iyi pratik: hızlı bir sonraki düzeltme olarak değil, gerçekçi bir büyüme tahminine dayanarak önceden biraz fazla provision et." },
              { level: 'basic', q: "Yeni bir QA mühendisi, Kafka consumer'larının neden bir webhook gibi otomatik push almak yerine döngüde poll() çağırdığını soruyor. Bu tasarım kararını nasıl açıklarsın?", a: "Kafka consumer'ları pull-tabanlıdır: consumer, broker'ın kendi zamanlamasında push yapması yerine, bir sonraki batch'i isteyerek tekrar tekrar poll() çağırır. Bu, consumer'a kendi işleme oranı üzerinde tam kontrol verir — yavaş bir consumer, kaldıramayacağı bir push mesaj seliyle boğulmak yerine basitçe daha az poll() çağırır, ki bu push modellerinde gerçek bir risktir. Ayrıca backpressure'ı önemsiz kılar: tüketmeyi durdurmak sadece \"poll() çağırmayı kes\"tir. Bu pull modeli temel bir mimari farktır ve Kafka'nın hızlı gerçek-zamanlı consumer'ların yanında yavaş batch consumer'lar için de iyi ölçeklenmesinin sebebidir." },
              { level: 'basic', q: "Flaky bir entegrasyon testi, consumer mantığı doğru görünse dahi kısa bir network kesintisinden sonra ara sıra aynı Kafka mesajının iki kez işlendiğini gösteriyor. Bu tür bir tekrarı hangi producer-tarafı ayarı çözer?", a: "enable.idempotence=true olmadan, bir network kesintisi sonrası producer retry'ı (broker mesajı gerçekten aldı ama onay kayboldu) AYNI mesajı iki kez yazabilir, çünkü producer broker'ın zaten aldığını bilemez. enable.idempotence=true ayarlamak (modern client'larda varsayılan true) partition başına bir sıra numarası ekler, broker'ın tam bir tekrar denemesini tanıyıp atmasını sağlar. Bu sadece PRODUCER retry'larından kaynaklanan tekrarları çözer — işledikten sonra ama offset'ini commit etmeden önce crash olan bir consumer, idempotent producer'ların ele almadığı farklı bir tekrar sınıfına hâlâ yol açabilir." },
              { level: 'basic', q: "Audit-event'leri topic'i compliance için sonsuz retention'a ihtiyaç duyarken, kullanıcı-oturumu \"şu anki durum\" topic'i sadece key başına en son değere ihtiyaç duyuyor. Her biri için retention'ı farklı nasıl yapılandırırsın?", a: "Audit topic'i için, her event yazıldığı gibi korunsun diye cleanup.policy=delete ile çok uzun veya sonsuz retention (retention.ms=-1) ayarla, çünkü compliance tam geçmiş kaydı gerektirir. Session-state topic'i için ise cleanup.policy=compact ayarla — log compaction key başına sadece EN SON mesajı tutar, eski değerleri atar, ki bu tam olarak ihtiyaç duyulan \"şu anki durum\" semantiğidir ve disk kullanımını sınırlar. Bunları karıştırmak yaygın bir hatadır: bir state topic'inde delete-bazlı retention eski değerlerde disk israf eder, bir audit topic'ini compact etmek ise compliance'ın ihtiyaç duyduğu geçmişi yok eder." },
              { level: 'basic', q: "Hızlı bir debug oturumunda, tam bir test scripti yazmadan bir avuç mesajın bir topic'e doğru düştüğünü elle doğrulamak istiyorsun. Hangi CLI araçlarını kullanırsın?", a: "kafka-console-consumer.sh --topic my-topic --from-beginning --bootstrap-server localhost:9092, bir topic'in mesajlarını terminalde direkt takip etmeni sağlar, bir producer'ın gerçekten ne yazdığını hızlıca kontrol etmek için kullanışlıdır. kafka-console-producer.sh --topic my-topic --bootstrap-server localhost:9092, hiç kod yazmadan elle test mesajları yazıp göndermeni sağlar. kafka-topics.sh --describe --topic my-topic partition sayısını, replication factor'ü ve leader/replica atamasını gösterir — yapısal olarak bir şey yanlış göründüğünde kontrol edilecek ilk şey. Bu CLI araçları, düzgün bir otomatik test yazmadan önce debug sırasında bir REST API'yi elle dürtmek için curl kullanmanın Kafka eşdeğeridir." },
              { level: 'basic', q: "Belirli bir partition için \"leader\" ve \"follower\" replica ne anlama gelir ve producer/consumer'lar gerçekte hangisiyle konuşur?", a: "Her partition bir leader replica'ya (tüm okuma/yazmaları işleyen) ve sıfır veya daha fazla follower'a (leader'ın verisini pasif olarak replike eden, yedeklilik için) sahiptir. Producer'lar ve consumer'lar her zaman direkt leader ile konuşur — follower'lar sadece failover için vardır, varsayılan olarak trafik sunmak için değil, bu yüzden tipik bir veritabanı read-replica'sı gibi okuma yükünü azaltmazlar. Leader başarısız olursa, Kafka in-sync bir follower'ı terfi ettirir, ve client'lar cluster metadata'sı aracılığıyla otomatik olarak yeniden bağlanır. Daha fazla follower eklemek dayanıklılığı ve failover hızını iyileştirir, ama kendi başına okuma throughput'unu İYİLEŞTİRMEZ — geleneksel veritabanı replikasyonundan gelen yaygın bir yanlış anlama." },
              { level: 'basic', q: "Takımın bir Schema Registry getirmeyi tartışıyor ve bir developer \"JSON şeklini bir wiki sayfasında belgeleyemez miyiz\" diye soruyor. Nasıl cevap verirsin?", a: "Bir wiki sayfası hiçbir şeyin zorlamadığı dokümantasyondur — bir producer ondan sessizce uzaklaşabilir, ve bunu fark etmenin tek yolu haftalar sonra production'da bir consumer'ın çökmesidir. Schema Registry, şemayı birinci sınıf, zorlanan bir artifact yapar: producer'lar yayınlamadan önce bir şema kaydeder, consumer'lar doğru deserialize etmek için beklenen şemayı çeker, ve uyumsuz değişiklikler kayıt zamanında reddedilir. Ayrıca \"kimse fark etmesin umarım\" yerine açık uyumluluk kurallarıyla güvenli şema evrimini mümkün kılar. Birden fazla producer/consumer takımı olan herhangi bir özellik için Schema Registry, zorlanan bir kontrat ile sonunda bozulan bir onur sistemi arasındaki farktır." },
              // ── ORTA SEVİYE (ek) ─────────────────────────────────
              { level: 'intermediate', q: "Bir deploy sırasında, beş consumer instance'ından sadece biri yeniden başlatılmış olsa dahi consumer group kısa süreliğine HİÇBİR mesaj işlemeyi durduruyor. Tek bir consumer'ı yeniden başlatmak neden tüm grubu durduruyor?", a: "Bu bir rebalance: group üyeliği değiştiğinde, Kafka'nın klasik eager rebalancing protokolü TÜM grup boyunca TÜM partition atamalarını geri alır ve sıfırdan yeniden atar — sadece yeniden başlatılan değil, gruptaki HER consumer için kısa bir \"stop-the-world\" duraklaması. Bu beklenen davranıştır, bug değildir, ama deploy'ları direkt etkiler: 5 consumer'ı birer birer rolling restart etmek 5 ayrı rebalance tetikleyebilir. \"Sıfıra yakın işleme boşluğu\" iddia eden QA test pipeline'ları için bu, consumer deploy'ları sırasında bilinen bir flaky zamanlama assertion kaynağıdır." },
              { level: 'intermediate', q: "Deploy'larınız, pod'lar rolling update sırasında birer birer yeniden başladığı için sürekli yıkıcı consumer group rebalance'ları tetikliyor. Rolling deploy'lardan vazgeçmeden bu kesintiyi nasıl azaltırsın?", a: "Klasik eager assignor yerine Cooperative Sticky assignor'ı kullan (partition.assignment.strategy=CooperativeStickyAssignor) — bu artımlı olarak rebalance eder, sadece gerçekten taşınması gereken partition'ları yeniden atar. Consumer kimliğinin önemli olduğu iş yükleri için (örn. büyük lokal state'i olan consumer'lar), static membership (group.instance.id), hızlıca yeniden başlayan bir consumer'ın session.timeout.ms içinde geri dönmesi koşuluyla hiç rebalance tetiklemeden AYNI partition atamasıyla yeniden katılmasını sağlar. İkisini birleştirmek, Kafka'nın eski varsayılan davranışına kıyasla rolling-deploy kesintisini önemli ölçüde azaltır." },
              { level: 'intermediate', q: "Bir QA testi, producer.send()'den hata gelmediğini kontrol ederek bir mesajın yazıldığını doğruluyor, ama ara sıra \"başarılı\" bir mesaj topic'te hiç görünmüyor. Bu, hangi acks yanlış yapılandırmasıyla açıklanır?", a: "acks=0 ise, producer.send(), mesaj network buffer'ına ulaştığı anda, broker'ın onu gerçekten alıp almadığına dair sıfır onayla başarıyla döner — düşen bir paket veya broker takılması, çağrı başarı raporlarken mesajı sessizce kaybedebilir. Anlamlı bir test assertion'ı için düzeltme en az acks=1, veya production durability garantilerine uyması için acks=all'dır. Bu yaygın bir test yazma hatasıdır: acks=0'a karşı test etmek (hızlı kurulumlarda genellikle istemeden varsayılan) yanlış bir güven verir, halbuki production acks=all ile ve çok farklı başarısızlık özellikleriyle çalışır." },
              { level: 'intermediate', q: "Producer'ın maksimum durability bekleyerek acks=all kullanıyor, ama bir broker kesintisinde tek bir yavaş replica hâlâ ara sıra mesaj kaybına neden oluyor. acks=all ile birlikte muhtemelen hangi ayarı unuttun?", a: "acks=all sadece şu anda ISR'de olan replica'ları bekler — min.insync.replicas varsayılan değeri 1'de bırakılırsa, bir topic'in ISR'si sadece leader'ın kendisi olabilir, bu da acks=all'ı daha sıkı görünmesine rağmen fiilen acks=1 ile eşdeğer yapar. min.insync.replicas=2 ayarlamak (replication factor 3 ile) leader'ın en az 2 replica gerçekten senkronize olmadıkça yazmaları reddetmesini (NotEnoughReplicas) zorlar — bir broker başarısızlığında veri kaybını gerçekten önleyen şey budur. acks=all + min.insync.replicas=2 + replication.factor=3 kombinasyonu standart 'gerçek durability' yapılandırmasıdır; üçünden sadece birini kullanmak bir boşluk bırakır." },
              { level: 'intermediate', q: "Auto-commit kullanan bir consumer (enable.auto.commit=true) bir crash sonrası ara sıra mesaj \"kaybediyor\" — commit edilmiş ama işlenmesi hiç tamamlanmamış. Auto-commit buna neden yol açar ve bunun yerine ne kullanmalısın?", a: "Auto-commit, işlemenin gerçekten tamamlanıp tamamlanmadığından tamamen bağımsız olarak offset'leri bir zamanlayıcıda (auto.commit.interval.ms) commit eder — bir auto-commit tetiklenmesi ile mesajın tam işlenmesi arasında consumer crash olursa, o mesaj tüketilmiş olarak işaretlenir ama yan etkisi hiç gerçekleşmemiştir, sessiz bir veri kaybı. Düzeltme, manuel commit'tir (enable.auto.commit=false) ve consumer.commitSync()'i sadece işleme gerçekten tamamlandıktan SONRA çağırmaktır. At-least-once semantiğini doğrulayan bir QA pipeline'ı için, auto-commit açıkça devre dışı bırakılmalı, çünkü testin yakalaması gereken tam senaryoyu maskeleyebilir." },
              { level: 'intermediate', q: "Bir ödeme-işleme consumer'ı bozuk bir mesajda başarısız oluyor ve tüm consumer thread'ini çökertip o partition'daki tüm sonraki mesajları bloklıyor. Kötü mesajı kaybetmeden veya partition'ı sonsuza kadar bloklamadan bunu nasıl ele alırsın?", a: "Bir Dead Letter Queue deseni uygula: işlemeyi try/catch içine sar, ve başarısızlıkta sorunlu mesajı (artı hata bağlamını) çökmek veya sessizce atmak yerine ayrı bir dead-letter-topic'e yayınla, sonra offset'i commit et ve devam et. Bu, aynı zehirli mesajı sonsuza kadar yeniden denemek yerine partition'ı hemen serbest bırakır, mesajı elle inceleme veya düzeltme sonrası yeniden işleme için korur. QA için bu harika bir test case'idir: bozuk bir mesaj yayınla ve consumer'ı çökertmek yerine beklenen hata metadata'sıyla DLQ'ya düştüğünü doğrula." },
              { level: 'intermediate', q: "Takımının özel producer/consumer kodu yazmadan bir Postgres tablosunu sürekli Kafka'ya senkronize etmesi, ve ayrıca Kafka event'lerini Elasticsearch'e itmesi gerekiyor. Hangi araç bunu çözer ve QA bunu nasıl doğrular?", a: "Kafka Connect tam olarak bunun için bir framework'tür: bir Source Connector (Postgres CDC için Debezium) DB değişikliklerini okur ve Kafka mesajları olarak yayınlar, bir Sink Connector (Elasticsearch Sink) bir topic'i tüketir ve Elasticsearch'e yazar — ikisi de JSON ile yapılandırılır, yaygın durumlar için özel kod gerekmez. QA doğrulaması 'bağlayıcının yapılandırmasını ve sonuçtaki veriyi test et'e kayar: Postgres'e bir satır ekle, beklenen pencerede mesajın Kafka'da görüldüğünü doğrula, sonra Elasticsearch'te doğru indekslendiğini doğrula — sahip olmadığın bağlayıcı içsellerini unit test etmek yerine tüm pipeline'ı uçtan uca doğrular." },
              { level: 'intermediate', q: "Bir özellik bir topic'ten okuyor, stateful bir aggregation (kullanıcı başına çalışan toplam) uyguluyor ve başka bir topic'e yazıyor. Bir developer düz bir consumer+producer çifti öneriyor. Kafka Streams ne zaman daha iyi bir seçim olur?", a: "Düz bir consumer+producer, state'i elle yönetmeyi (çalışan toplam nerede saklanır? aggregation ortasında process çökerse ne olur?), okuma/yazma tarafları arasında elle offset koordinasyonunu ve tekrarlar önemliyse elle exactly-once işlemeyi gerektirir — Kafka Streams'in state store'ları (RocksDB + changelog topic'leri) ve yerleşik exactly-once garantileriyle native olarak çözdüğü sorunlar. Basit 'oku, dönüştür, yaz' pipeline'ları için düz client'lar daha basittir; windowed aggregation'lara, join'lere veya crash'den elle kurtarma kodu olmadan kurtulan fault-tolerant state'e ihtiyaç duyduğunda, Streams'in abstraction'ları önemli özel altyapı kodundan tasarruf ettirir." },
              { level: 'intermediate', q: "QA takımın, paylaşılan, her zaman çalışan bir cluster'a bağımlı olmayan Kafka producer/consumer entegrasyon testleri istiyor. Standart yaklaşım nedir ve mock'lamanın doğrulayamayacağı neyi doğrular?", a: "Her test koşumu için Docker'da gerçek, geçici bir broker ayağa kaldırmak için Testcontainers'ın Kafka modülünü kullan, sonra tamamen kaldır — her test, diğer testlerle veya takım üyeleriyle paylaşılan state için çekişmek yerine temiz, izole bir broker alır. Bu, gerçek wire-protocol davranışını, gerçek partition/offset semantiğini ve gerçek serialization round-trip'lerini doğrular — mock'lanmış bir KafkaProducer/KafkaConsumer'ın yakalayamayacağı şeyler, çünkü bir mock sadece 'kodum send()'i bu argümanlarla çağırdı mı'yı doğrular, 'bu gerçek bir broker'a karşı gerçekten çalışıyor mu'yu değil. Trade-off test hızıdır — Testcontainers tabanlı testleri entegrasyon seviyesi kapsam için ayır, saf unit testler hızlı, izole mantık testi için client'ı mock'lamayı sürdürsün." },
              { level: 'intermediate', q: "Idempotent producer'ları etkinleştirdin, ama consumer'lar hâlâ ara sıra aynı mantıksal event'i iki kez işliyor. Producer idempotence'ı tekrarları tam olarak neden çözmez, ve kalan boşluğu hangi consumer-tarafı tekniği düzeltir?", a: "Idempotent producer'lar sadece PRODUCER'ın bir send'i yeniden denemesinden kaynaklanan tekrarları önler — bir mesajı işleyen, yan etkisini gerçekleştiren, ama offset'ini commit etmeden önce çöken bir consumer hakkında hiçbir şey söylemezler, bu da yeniden başlatma sonrası yeniden teslime ve yeniden işlemeye yol açar. Kalan boşluk için düzeltme consumer-tarafı deduplication'dır: kendi datastore'unda benzersiz bir mesaj ID'si takip et ve yan etkiyi tekrarlamadan önce zaten işlenmiş mi diye kontrol-et-ve-atla. Gerçek exactly-once, HEM idempotent producer'ları (producer-tarafı tekrar yok) HEM consumer-tarafı dedup veya transactional read-process-write'ı (consumer-tarafı tekrar yok) gerektirir — sadece yarısına güvenmek yaygın eksik bir düzeltmedir." },
              { level: 'intermediate', q: "6 consumer'lı bir consumer group ve 6 partition'lı bir topic sorunsuz çalışıyor, ama 10 consumer'a ölçeklendirdikten sonra 4'ü tamamen boşta oturuyor. Neden, ve bu atamayı ne belirler?", a: "Her partition bir grupta aynı anda sadece BİR consumer tarafından aktif olarak tüketilebilir — 6 partition'la, kaç consumer katılırsa katılsın en fazla 6'sı gerçek iş yapabilir; partition assignor (Range, RoundRobin, Sticky) HANGİ 6'sının partition alacağına karar verir, ama var olan partition sayısından daha fazla paralellik üretemez. Gerçek 10-yönlü paralellik için düzeltme partition sayısını en az 10'a çıkarmaktır (bunun key-bazlı sıralamayı yeniden karıştırabileceğini not ederek). Bu, en yaygın Kafka ölçeklendirme yanlış anlamalarından biridir: partition sayısının üzerinde consumer eklemek throughput eklemez, sadece boşta kapasite ekler." },
              { level: 'intermediate', q: "Bir consumer ara sıra hiç çökmemiş olsa dahi grubundan atılıp bir rebalance tetikliyor — loglar bu olduğunda özellikle büyük bir batch işlediğini gösteriyor. Muhtemel sorumlu ayar nedir ve nasıl düzeltirsin?", a: "max.poll.interval.ms, Kafka'nın consumer'ı ölü sayıp gruptan zorla çıkarmadan önce ardışık poll() çağrıları arasında izin verilen maksimum süreyi tanımlar — poll()'dan dönen bir batch'i işlemek bir sonraki poll()'dan önce bu aralıktan (varsayılan 5 dakika) uzun sürerse, consumer hâlâ canlı ve çalışırken atılır. Düzeltmeler: batch'lerin daha küçük ve hızlı işlenmesi için max.poll.records'u düşür, batch'lerin gerçekten daha uzun sürmesi bekleniyorsa max.poll.interval.ms'i artır, veya poll()'un hemen çağrılabilmesi için ağır işlemeyi ayrı bir thread pool'a taşı. Bu, mesaj başına CPU veya I/O-yoğun iş yapan consumer'larda 'gizemli rebalance'ların yaygın bir kaynağıdır." },
              { level: 'intermediate', q: "\"A'dan oku, dönüştür, B'ye yaz\" pipeline'ın, process pipeline ortasında çökse dahi gerçek exactly-once semantiğine ihtiyaç duyuyor — tekrar yazma yok. Kafka Transaction'ları bu read-process-write desenini nasıl çözer?", a: "Kafka Transaction'ları bir producer'ın B'ye yazılan çıktı mesajlarını VE A'dan okuma için consumer offset commit'ini tek bir hep-veya-hiç birimi olarak atomik commit etmesini sağlar — 'çıktı yazıldı' ile 'girdi offset'i commit edildi' arasındaki çökmenin yeniden başlatmada yeniden işleme ve tekrar çıktıya yol açtığı boşluğu ortadan kaldırır. Uygulama: producer.initTransaction(), beginTransaction(), B'ye üret, consumer'ın offset'leri için sendOffsetsToTransaction()'ı çağır, sonra commitTransaction() — B'yi okuyan consumer'lar commit edilmemiş yazmaları görmemek için isolation.level=read_committed ayarlamalı. Bu, Kafka Streams'in kendi exactly-once garantileri için içsel olarak kullandığı, düz client'lara direkt sunulan desendir." },
              { level: 'intermediate', q: "Bir producer takımı Avro şemasına yeni bir alan eklemek istiyor, ama Schema Registry bir uyumluluk hatasıyla kaydı reddediyor. Muhtemelen hangi mod yapılandırılmış ve alanı başarıyla nasıl eklersin?", a: "BACKWARD uyumluluğu (tipik varsayılan), ESKİ şemayı kullanan consumer'ların YENİ şemayla yazılan veriyi hâlâ okuyabilmesini gerektirir — varsayılan değeri olmayan zorunlu bir alan eklemek bunu bozar, çünkü eski consumer'lar hiç görmedikleri ve fallback değeri olmayan bir alanı yorumlayamaz. Düzeltme, yeni alanı açık bir varsayılan değerle opsiyonel yapmaktır, bu backward uyumluluğu karşılar çünkü eski consumer'lar bilinmeyen alanı yok sayar ve yeni consumer'lar onu içermeyen eski mesajlar için varsayılanı alır. FORWARD, yeni-şema consumer'larının eski veriyi okuyabilmesini sağlar, FULL her ikisini de gerektirir — deployment sıranıza yanlış modu seçmek yaygın bir 'şemam neden kaydolmuyor' karışıklığıdır." },
              { level: 'intermediate', q: "Bir dashboard cluster'ında \"under-replicated partitions: 3\" gösteriyor ve bir takım arkadaşı bunun acil olup olmadığını soruyor. Önemini ve sonraki kontrolü nasıl açıklarsın?", a: "Under-replicated, bir partition'ın ISR'sinin yapılandırılmış replication factor'ünün altına düştüğü anlamına gelir — örn. factor-3 bir partition şu anda gerçekten yetişmiş sadece 2 (veya daha az) replica'ya sahip, daha fazla başarısızlığa karşı güvenlik marjı küçülmüş. Bu henüz aktif bir kesinti olmak zorunda değil (leader hâlâ okuma/yazmaları muhtemelen sorunsuz sunuyor), ama araştırılması ACİLDİR çünkü azalmış hata toleransı anlamına gelir — bir broker veya disk başarısızlığı daha şimdi gerçek veri kaybına veya erişilemezliğe yol açabilir. Broker sağlığını (düşmüş, aşırı yüklenmiş veya network sorunlu bir follower en yaygın sebeptir), broker replikasyon hata loglarını ve disk/network metriklerini kontrol et — bu Kafka'nın en önemli erken uyarı sinyallerinden biridir ve sadece elle kontrol değil kendi alert eşiğine sahip olmalı." },
              { level: 'intermediate', q: "Şirketin paylaşımlı bir Kafka cluster'ı çalıştırıyor ve güvenlik, QA takımının servis hesaplarını sadece belirli test topic'leriyle, production topic'leriyle değil, kısıtlamak istiyor. Bunu Kafka'da nasıl uygularsın?", a: "Her servis hesabının herkesin paylaştığı tek bir bağlantı dizgesi yerine kendi credential'larına sahip olması için client kimlik doğrulaması için SASL'ı (örn. SASL/SCRAM) yapılandır, client'lar ve broker'lar arasındaki trafiği şifrelemek için TLS/SSL ile birleştir. Sonra principal başına belirli izinler vermek için Kafka ACL'lerini (kafka-acls.sh) kullan — örn. QA servis hesabı için 'qa-*' ile eşleşen topic'lerde ALLOW READ,WRITE, production topic desenlerinde hiç izin vermeyerek (örtük deny). Bu, belirli şemalara kapsamlanan veritabanı seviyesi kullanıcı izinleriyle aynı prensiptir: kimlik doğrulama KİM olduğunu kanıtlar, ACL'ler NE yapmana izin verildiğini kontrol eder, ikisi birlikte sızmış bir QA credential'ının production veri olayına dönüşmesini önler." },
              { level: 'intermediate', q: "Bir test, aynı key'e sahip iki mesajın consumer'a gönderildiği sırayla geldiğini doğruluyor, ama test flaky — çoğunlukla geçiyor ama ara sıra başarısız oluyor. Her şey doğru yapılandırılmışken en muhtemel sebep nedir ve testi deterministik nasıl yaparsın?", a: "max.in.flight.requests.per.connection 1'den büyükse ve idempotence etkin değilse, bir producer aynı anda birden fazla batch'i uçuşta tutabilir, ve daha erken bir batch yeniden denenmesi gerekirken daha sonraki bir batch zaten başarılı olduysa, mesajlar aynı key ve partition'ı paylaşmasına rağmen sırasız düşebilir — bu gerçekten aralıklı, zamanlamaya bağlı bir bug'dır, flaky test altyapısı değil. enable.idempotence=true ayarlamak (içsel olarak retry'larla bile sıralama garantilerini korurken uçuştaki istekleri uygun şekilde sınırlar) bunu test-seviyesi geçici çözümler gerekmeden producer yapılandırma seviyesinde düzeltir. QA için ders: 'ara sıra' flaky bir sıralama testi genellikle test seviyesinde bir retry dekoratörüyle örtbas edilecek bir şey değil, producer yapılandırması hakkında gerçek bir sinyaldir." },
              { level: 'intermediate', q: "QA takımın, prod kapasitesinde gerçek trafik üretmenin pahalı olduğu bir durumda Kafka tabanlı bir özelliğin yük altında doğru çalıştığını doğrulamak istiyor. Hangi yaklaşımı kullanırsın?", a: "kafka-producer-perf-test.sh ve kafka-consumer-perf-test.sh gibi yerleşik benchmark araçlarıyla, gerçek mesaj boyutu ve oranını simüle ederek belirli bir partition/replication yapılandırmasının hedeflenen throughput'u karşılayıp karşılamadığını, prod trafiğini beklemeden ölçebilirsin. Daha gerçekçi senaryolar için, gerçek mesaj şemasını ve dağılımını taklit eden özel bir yük üretici scripti yazmak, sentetik testin gerçek üretim davranışına daha yakın olmasını sağlar. QA için bu, kapasite planlamasını 'üretimde patlayınca öğrenelim'den 'deploy'dan önce ölçelim'e taşır — özellikle partition sayısı veya broker boyutlandırması gibi geri dönüşü zor mimari kararlar için kritiktir." },
              // ── İLERİ SEVİYE (ek) ────────────────────────────────
              { level: 'advanced', q: "Tepe noktada saniyede 200.000 mesaj işlemesi beklenen bir topic tasarlıyorsun ve bir takım arkadaşı \"güvenli olmak için 500 partition kullanalım\" diyor. Aşırı partitionlamanın gerçek trade-off'ları nedir ve doğru boyutlandırmayı nasıl yaparsın?", a: "Daha fazla partition bedava değildir: her biri broker-tarafı kaynak tüketir (dosya handle'ları, replikasyon belleği, metadata overhead'i), ve aşırı sayı failover sırasında leader seçim süresini ve bazı yapılandırmalarda uçtan uca gecikmeyi artırır. Doğru boyutlandırma hedef throughput'tan partition başına (tipik donanımda sürdürülebilir yaklaşık 10-15 MB/s) ve hedef maksimum consumer paralelliğinden (partition sayısı = maksimum kullanışlı consumer sayısı) geriye doğru çalışır — büyük yuvarlak bir sayı tahmin etmek yerine mesaj boyutu ve oranından gereken MB/s'yi hesapla, partition başına kapasiteye böl, makul bir pay için yukarı yuvarla. 'Güvenli olmak için' aşırı partitionlamak hayali bir gelecek ölçeklendirme sorununu gerçek, anlık bir operasyonel overhead sorunuyla takas eder." },
              { level: 'advanced', q: "İzleme, under-replicated partition'ların özellikle gece batch job penceren sırasında sıçradığını, sonra kendi kendine düzeldiğini gösteriyor. Sadece alert verip geçmek yerine bunu nasıl kök-nedenlendirirsin?", a: "Zamanlamayı kesin olarak ilişkilendir: tam o pencere sırasında broker-seviyesi network ve disk I/O metriklerini kontrol et — gece batch job'ı genellikle paylaşılan host'larda disk I/O'sunu veya network bant genişliğini doyurur, follower'ların leader'ın yazma oranının geçici olarak gerisinde kalmasına yol açar, hiçbir broker çökmediği halde under-replication olarak rapor edilir. replica.lag.time.max.ms'i kontrol et — follower'lar ölü değil sadece yavaşsa, bu eşiği biraz artırmak, geçici, kendi kendine düzelen yavaşlık için gürültülü alertleri azaltır, ama altta yatan kaynak çekişmesi (batch job'ın I/O'sunu ayır veya yeniden planla) sadece semptomu ayarlamak yerine düzeltilmeli. Müdahale olmadan her gece düzelen bir desen gerçek bir kaynak çekişmesi sorunudur, Kafka bug'ı değil." },
              { level: 'advanced', q: "Bir broker tepe trafikte çöküyor ve acks=all kullanan producer'lar kısa bir gecikme sıçraması ve bir avuç NotEnoughReplicasException hatası görüyor, replication factor 3 olsa dahi. Bu beklenen mi ve kesinti süresini ne belirler?", a: "Evet, beklenen: partition leadership'i tutan bir broker çöktüğünde, Kafka başarısızlığı tespit etmeli, kalan in-sync replica'lardan yeni bir leader seçmeli, ve trafik normale dönmeden önce o kimliği tüm client'lara yaymalı — bu pencere sırasında etkilenen partition'lara istekler başarısız olur veya askıda kalır, gözlemlenen hatalarla tam eşleşir. Kesinti süresi öncelikle broker başarısızlık-tespit ayarları (replica.lag.time.max.ms, session timeout'ları) tarafından yönetilir — bunları çok agresif ayarlamak failover süresini azaltır ama geçici yavaşlık sırasında yanlış-pozitif tespiti artırır; çok muhafazakar ayarlamak gerçek failover süresini artırır. Bu trade-off genellikle kabul edilebilir failover-süresi SLA'sına karşı kabul edilebilir yanlış-alarm oranına göre ampirik olarak ayarlanır." },
              { level: 'advanced', q: "Şirketin ikinci bir bölgeye genişliyor ve birincil Kafka cluster'ındaki event'lerin disaster recovery için ikincil bölgenin cluster'ında da kullanılabilir olmasını istiyor. Hangi araç bunu çözer ve cluster'lar arası offset'lerle ilgili önemli gotcha nedir?", a: "MirrorMaker 2 (MM2), topic'leri bir kaynak cluster'dan bölgeler/veri merkezleri arasında bir hedef cluster'a replike eder, topic oluşturmayı, yapılandırma senkronizasyonunu ve yeni mesajların devam eden replikasyonunu ele alır. Önemli gotcha: offset'ler cluster'lar arasında özdeş korunmaz — kaynak cluster'ın topic'inde offset 1000'deki bir mesaj, hedef cluster'daki mirror'lanmış topic'te tamamen farklı bir offset'e düşebilir, çünkü hedef topic kendi bağımsız offset sırasına sahiptir. Bu, birincilden ikincil bölgeye failover yapan bir consumer'ın basitçe 'aynı offset'ten' devam edemeyeceği anlamına gelir — MM2 özellikle bunun için offset çeviri araçları sağlar, ve herhangi bir DR failover planı offset'lerin taşınabilir olduğunu varsaymak yerine bu çeviriyi hesaba katmalıdır, ki bu DR tasarımında yaygın ve maliyetli bir hatadır." },
              { level: 'advanced', q: "Bir finansal raporlama pipeline'ı topic A'dan okuyor, toplamları aggregate ediyor ve topic B'ye yazıyor, ve pipeline ortasında çökme-ve-yeniden-başlama sırasında dahi bir işlemi asla iki kez saymamalı. Kafka Transaction'larının bunu protokol seviyesinde, sadece API çağrılarını değil, nasıl önlediğini anlat.", a: "İçsel olarak, transactional producer bir transaction coordinator'a (belirlenmiş bir broker) kaydolur, bu coordinator transaction durumunu takip eder ve ilgili topic'lere özel kontrol marker'ları yazar, commit mi abort mu olduğunu belirtir. Producer commitTransaction()'ı çağırdığında, coordinator dokunulan her partition'a bir commit marker yazar (offset commit'lerinin kendisi de yazma olduğundan __consumer_offsets partition'ı dahil) — isolation.level=read_committed yapılandırılmış consumer'lar henüz commit olmamış veya abort olmuş bir transaction'a ait mesajları atlar, böylece çıktı yazma ile commit etme arasındaki bir çökme, read_committed consumer'larının asla görmediği abort/uncommitted bir transaction bırakır. Garanti, broker-tarafı transaction log'undan ve marker mekanizmasından gelir, bu yüzden garanti uçtan uca gerçekten tutması için hem producer HEM consumer yapılandırması (read_committed) doğru olmalıdır." },
              { level: 'advanced', q: "Bir consumer group hiçbir deploy olmasa ve hiçbir consumer çökmese dahi sürekli bir döngüde her birkaç dakikada bir rebalance ediyor — bir \"rebalance storm\". Gerçek sebebi nasıl teşhis edersin?", a: "Önce session.timeout.ms'i gerçek heartbeat davranışına karşı kontrol et — consumer'lar heartbeat yanıt verebilirliğini işleme süresinden ayırmadan poll() çağrıları arasında ağır senkron işleme yapıyorsa, tekrar tekrar ölü görünüp atılabilir, yeniden katılıp tekrar atılabilirler, sürekli bir döngüde. İkincisi, mevcut yük altında gerçek batch-başına işleme süresine karşı max.poll.interval.ms'i kontrol et — işleme yük sıçramalarında ara sıra bunu aşıyorsa, bir 'storm' gibi görünen ama gerçekte config-vs-workload uyumsuzluğu olan bir atılma-yeniden katılma döngüsü alırsın. Üçüncüsü, bunun saf bir client yapılandırma sorunu olduğunu varsaymadan önce consumer'lar ve coordinator broker arasındaki network kararsızlığını ele — 'kodum timeout ayarlarım için çok yavaş'ı 'network sürekli düşüyor'dan ayırmak, consumer loglarını broker-tarafı group coordinator loglarıyla ilişkilendirmeyi gerektirir." },
              { level: 'advanced', q: "Yönetim, 7 günlük retention ile günde 5 TB event işlemesi beklenen yeni bir cluster için broker sayısı, disk ve network kapasitesini tahmin etmeni istiyor. Kapasite planlama yaklaşımını anlat.", a: "Toplam depolamadan başla: 5 TB/gün × 7 gün × replication factor 3 = cluster genelinde gereken 105 TB ham disk (replikasyon depolamayı çoğaltır, sadece orijinal veriyi değil), sonra bir baseline broker sayısı için hedef broker-başına disk kapasitesine böl (pay bırakarak, %100 kullanıma hiç planlama yapma), sonra throughput'a karşı çapraz kontrol et: 5 TB/gün ≈ 58 MB/s sürdürülebilir ortalama (gerçek tepe-ortalama oranları tipik olarak 3-5x daha yüksek olduğundan, ortalama için değil tepe için tasarla), gerçekçi broker-başına network/disk kapasitesine böl. İki tahminin daha büyüğünü yukarı yuvarla, hata toleransı payı için broker ekle, ve donanım satın almadan önce bir yük testiyle doğrula — kabaca hesap planlama seni doğru büyüklük mertebesine getirir, ama gerçek yük testi tutmayan varsayımları (gerçek tepe oranları, gerçek ortalama mesaj boyutu) yakalar." },
              { level: 'advanced', q: "Bir producer takımı, aylardır deprecated olan bir alanı Avro şemasından kaldırmak istiyor, ama bunu hemen yapmak onu hâlâ okuyan herhangi bir consumer'ı bozar. Production'da bir şema alanını kaldırmanın güvenli, sıfır kesintili süreci nedir?", a: "Önce consumer kodunu/loglarını kontrol ederek alanın gerçekten kullanılmadığını doğrula — bu doğrulama olmadan deadline'a kaldırmak 'güvenli' temizliklerin olay yaratmasının sebebidir. FULL veya FORWARD uyumluluğu altında, alan genellikle eklendiğinde bir varsayılan değeri varsa kaldırılabilir (çoğu şema evrim kuralı özellikle sonraki kaldırmayı güvenli yapmak için varsayılanları gerektirir) — varsayılan olmadan eklendiyse, önce onu varsayılanlı opsiyonel yapan ara bir versiyon deploy et, bunun yayılmasını bekle, sonra daha sonraki bir versiyonda kaldır. Gerçek sıfır-kesinti mekanizması, Schema Registry'nin uyumluluk kontrolünün, yapılandırılmış kuralı bozarsa kaldırmayı reddetmesidir — başarılı bir kayıt registry-doğrulanmış güvenlidir; bir red, production'a ulaşmadan önce gerçek bir uyumsuzluğu yakalamaktır, bürokrasi değil." },
              { level: 'advanced', q: "Kafka Streams uygulaman işlem ortasında çöktü ve lokal RocksDB state store'unu kaybetti. Streams aggregation durumunu hiçbir özel kurtarma kodu yazmadan nasıl kurtarır ve kurtarma süresini ne belirler?", a: "Kafka Streams her state store'u bir changelog topic'iyle destekler — her state değişikliği de oraya yazılır, böylece yeniden başlatmada Streams, RocksDB store'unu çökme-öncesi tam durumuna yeniden inşa etmek için changelog'u (baştan, veya hayatta kalan son lokal checkpoint'ten) yeniden oynatır, hiç özel kod gerekmez. Kurtarma süresi changelog boyutuna ve ne kadar lokal state'in kaybolduğuna bağlıdır — taze bir instance tüm changelog'u yeniden oynatmalıdır (büyük state için yavaş), aynı diskte sağlam dosyalarla yeniden başlayan bir instance ise sadece son checkpoint'inden o küçük boşluğu yeniden oynatır (hızlı). Büyük stateful uygulamalar için, standby replica'lar (num.standby.replicas) başka bir instance'da sıcak, sürekli güncellenen bir kopya tutarak failover'ı tam bir replay yerine neredeyse anlık yapar." },
              { level: 'advanced', q: "Producer throughput'un gereksinimleri karşılıyor, ama aynı producer kod yolunu paylaşan yeni bir düşük-gecikme kullanım durumu için mesaj-başına gecikmeyi azaltman isteniyor. linger.ms ve batch.size ayarlamadaki temel trade-off nedir?", a: "linger.ms, producer'a göndermeden önce mesajları bir batch'e toplarken N milisaniyeye kadar beklemesini söyler, küçük bir ek gecikmeyi daha iyi throughput'la takas eder (daha büyük batch'ler = daha az network round-trip'i, daha iyi sıkıştırma); batch.size, linger zamanlayıcısından bağımsız olarak bir batch'in ne kadar büyüyebileceğini sınırlar. Düşük gecikme için, linger.ms'i 0'a yaklaştırmak neredeyse anında gönderir, daha küçük, daha az verimli batch'ler maliyetiyle — klasik throughput-vs-gecikme trade-off'u. Kullanım durumu daha yüksek-throughput iş yüküyle bir kod yolu paylaştığından, en temiz düzeltme genellikle kendi ayarlanmış linger.ms/batch.size'ı olan AYRI bir producer instance'ıdır, herkes için mevcut throughput-optimize edilmiş producer'dan ödün vermek yerine — bir config nadiren iki gerçekten farklı gecikme gereksinimine iyi hizmet eder." },
              { level: 'advanced', q: "QA ortamları, iki paralel test suite'i de paylaşılan \"orders\" topic'ine üretip tükettiğinden çakışmaya devam ediyor, bir suite diğer suite'in test verisini tüketip öngörülemez şekilde başarısız oluyor. Birçok paralel koşuma ölçeklenen Kafka test izolasyonunu nasıl tasarlarsın?", a: "En sağlam yaklaşım koşum-başına topic namespacing'idir: her koşum kurulumda benzersiz bir topic adı üretir (örn. orders-test-${CI_RUN_ID}), testin producer'ı ve consumer'ı bunu kullanır, ve bir teardown adımı sonradan onu siler — bu, koşumların aynı topic'e dokunması yapısal olarak mümkün olmadığından, kaç paralel koşum çalışırsa çalışsın tam izolasyon garantiler. Topic'lerin dinamik oluşturulamadığı ortamlar için bir alternatif, koşum başına benzersiz bir consumer group ID'si ile test başında yakalanan belirli bir offset/timestamp'e her zaman seek etmeyi birleştirmektir, böylece her test sadece başladıktan sonra üretilen mesajları görür — koşum-başına-topic'ten daha kırılgan, ama topic oluşturma kısıtlıysa işe yarar. Bazı izolasyon mekanizması olmadan paralel suite'ler arasında tek bir paylaşılan topic'e güvenmek, retry'larla etrafından dolaşılacak bir Kafka bug'ı değil, kök nedenin kendisidir." },
              { level: 'advanced', q: "Belirli bir topic'teki consumer lag'i her gün öğleden sonra 2-4 arası güvenilir şekilde sıçrıyor, sonra kendi kendine düzeliyor, ve takım \"her zaman düzeliyor\" diye bunu görmezden geliyor. Bunun gerçekten görmezden gelinmesinin güvenli olup olmadığını nasıl araştırırsın?", a: "Önce sıçrama zamanlamasını upstream producer hacmiyle ilişkilendir — 2-4pm basitçe trafik tepe noktanızsa ve consumer kabul edilebilir bir SLA içinde sonradan tamamen yetişiyorsa, bu gerçekten talep değişimine uyan zararsız bir kapasite durumu olabilir, bug değil. Ancak 'her zaman düzeliyor' 'güvenli' ile aynı şey değildir — bu verinin downstream consumer'larının (dashboard'lar, alert'ler, bağımlı servisler) o pencere sırasında herhangi bir zaman-hassasiyeti olup olmadığını kontrol et, çünkü geçici lag, kimsenin lag desenine karşı kontrol etmediği bir SLA'yı ihlal edebilecek geçici bayat çıktı anlamına gelir. Lag trendi haftalar boyunca yavaşça büyüyorsa (her günün tepe noktası öncekinden biraz daha yüksek bir baseline'a düzeliyorsa), bu günlük düzelmeyle maskelenen gerçek bir kapasite sorunudur — bugün düzelip düzelmediğini değil, kurtarma baseline'ını zaman içinde takip et." },
              { level: 'advanced', q: "Birden fazla takım bir Kafka cluster'ını paylaşıyor, ve bir takımın hatalı davranan producer'ı yakın zamanda cluster'ı trafikle doldurup tüm diğer takımlar için performansı aynı anda düşürdü. Tek bir gürültülü tenant'ın paylaşılan cluster'ın tamamını etkilemesini ileride nasıl önlersin?", a: "Tek bir client'ın sürdürebileceği produce/consume byte-oranını ve istek-oranını sınırlamak için Kafka Quota'larını (client-id veya principal başına) yapılandır, böylece hatalı davranan bir producer diğerlerinin bağımlı olduğu broker kaynaklarını tekeline almak yerine sert bir throughput tavanına çarpar — bu işlevsel olarak Docker/Kubernetes kaynak limitleriyle aynı kavramdır, Kafka client throughput'una uygulanmış hali. Quota'ların ötesinde, çok-tenant'lı governance, isimlendirme-kuralı-zorlanmış topic ACL'lerinden (takımlar sahip olmadıkları topic'lere üretemez) ve bir cluster-genelindeki yavaşlamayı hızlıca belirli bir takımın client-id'sine atfetmeyi kolaylaştıran takım-başına izleme dashboard'larından faydalanır. Gerçekten yüksek riskli izolasyon ihtiyaçları için (regülasyon ayrımı, çok farklı SLA'lar), iş birimi başına ayrı cluster'lar sonunda gerekebilir, ama quota'lar ilk ve genellikle yeterli savunma hattıdır." },
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

fillMissingCodeTrios(kafkaData, 'kafka')
