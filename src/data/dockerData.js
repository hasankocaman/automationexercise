export const dockerData = {
  // ══════════════════════════════════════════════════════════════
  // ENGLISH VERSION
  // ══════════════════════════════════════════════════════════════
  en: {
    hero: {
      title: '🐳 Docker',
      subtitle: 'Containerization for Developers & QA Engineers',
      intro: 'Master Docker from zero to interview level. Learn how to containerize your test environments, run Selenium Grid and Playwright in Docker, and ensure "it works on my machine" becomes "it works everywhere."',
    },
    tabs: ['🎯 Introduction', '⚙️ Installation', '📦 Core Commands', '🗂️ Dockerfile & Compose', '🧪 QA Use Cases', '💼 Interview Q&A'],
    sections: [
      // ── SECTION 0: INTRODUCTION ────────────────────────────────────────────
      {
        title: '🎯 What is Docker?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📦',
            content: 'Docker is like a shipping container for software. A physical shipping container can carry any cargo — furniture, electronics, food — and any ship, truck, or crane knows how to handle it. Docker containers carry your code and ALL its dependencies, so your app runs the same way everywhere: your laptop, your colleague\'s machine, or a cloud server.',
          },
          {
            type: 'text',
            content: 'The classic developer problem: "It works on my machine!" Docker solves this. By packaging your application with its exact dependencies (Python 3.12, specific library versions, OS settings) into a container, you guarantee identical behavior everywhere the container runs.',
          },
          { type: 'heading', text: 'Containers vs Virtual Machines (VMs)' },
          {
            type: 'table',
            headers: ['Aspect', 'Virtual Machine (VM)', 'Docker Container'],
            rows: [
              ['Size', '10–50 GB per VM', '50 MB – 1 GB per image'],
              ['Startup time', '30 seconds – 5 minutes', '< 1 second'],
              ['OS included', '✅ Full OS per VM', '❌ Shares host OS kernel'],
              ['Isolation', '⭐⭐⭐ Strong (hardware level)', '⭐⭐ Good (process level)'],
              ['Resource usage', '⭐ Heavy (full OS overhead)', '⭐⭐⭐ Lightweight'],
              ['Portability', '⭐⭐ Moderate', '⭐⭐⭐ Excellent'],
              ['Best for', 'Full OS isolation, legacy apps', 'Microservices, CI/CD, testing'],
            ],
          },
          { type: 'heading', text: 'Docker Architecture — Key Concepts' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🏗️', label: 'Docker Image', desc: 'A read-only template (like a class in OOP). Contains OS layer, runtime, your code, and dependencies. Built from a Dockerfile.' },
              { icon: '📦', label: 'Docker Container', desc: 'A running instance of an image (like an object instance). Isolated process on your OS. You can run many containers from one image.' },
              { icon: '📋', label: 'Dockerfile', desc: 'A text file with instructions to build an image. Think of it as a recipe: FROM python:3.12, COPY files, RUN pip install.' },
              { icon: '🏪', label: 'Docker Hub / Registry', desc: 'A repository for Docker images (like Maven Central or npm registry). Public images: python, node, postgres, jenkins.' },
              { icon: '💾', label: 'Volume', desc: 'Persistent storage that survives container restarts. Mount a host folder into a container. Used for test reports, databases.' },
              { icon: '🌐', label: 'Network', desc: 'Virtual network connecting containers. Containers on the same network can reach each other by container name (DNS).' },
            ],
          },
          { type: 'heading', text: 'Why QA Engineers Need Docker' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              '"Works on my machine" disappears — everyone runs the same environment',
              'Spin up a full Selenium Grid (Hub + Chrome + Firefox) in one command',
              'Run Playwright tests without installing browsers on CI',
              'Test against a real PostgreSQL or MySQL database, not a mock',
              'Reproduce a production bug exactly — same OS, same versions',
              'Parallel test environments — run 10 isolated test containers simultaneously',
              'Clean slate every run — no leftover state from previous tests',
            ],
          },
          {
            type: 'quiz',
            question: 'What is the key difference between a Docker Image and a Docker Container?',
            options: [
              { id: 'a', text: 'Images are for Linux, containers are for Windows' },
              { id: 'b', text: 'An image is the template (static), a container is the running instance' },
              { id: 'c', text: 'Images are smaller than containers' },
              { id: 'd', text: 'You can only run one container per image' },
            ],
            correct: 'b',
            explanation: 'An image is like a class in OOP — a read-only blueprint. A container is like an object instance — a running process based on the image. You can run many containers from a single image simultaneously.',
          },
        ],
      },

      // ── SECTION 1: INSTALLATION ────────────────────────────────────────────
      {
        title: '⚙️ Docker Installation',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Docker Desktop is the simplest way to get started on Windows and Mac. It includes Docker Engine, Docker CLI, Docker Compose, and a nice GUI. On Linux, you install the Docker Engine directly — lighter and faster.',
          },
          { type: 'heading', text: 'Install Docker Desktop on Windows' },
          {
            type: 'installation',
            steps: [
              {
                cmd: '# Step 1: Enable WSL 2 (Windows Subsystem for Linux)',
                explanation: 'Open PowerShell as Administrator and run: wsl --install. This installs WSL 2 which Docker Desktop uses as its backend. Restart your computer after this.',
              },
              {
                cmd: '# Step 2: Download Docker Desktop',
                explanation: 'Go to docker.com/products/docker-desktop → Download for Windows. Choose the installer for your architecture (AMD64 for most PCs, ARM64 for Surface Pro X).',
              },
              {
                cmd: '# Step 3: Run the installer',
                explanation: 'Double-click Docker Desktop Installer.exe. Check "Use WSL 2 instead of Hyper-V" (recommended). Click OK and wait for installation.',
              },
              {
                cmd: '# Step 4: Start Docker Desktop',
                explanation: 'Launch Docker Desktop from Start menu. Wait for the whale icon 🐳 to appear in system tray and show "Docker Desktop is running".',
              },
              {
                cmd: 'docker --version',
                explanation: 'Verify installation. Expected output: "Docker version 24.x.x, build xxxxx"',
              },
              {
                cmd: 'docker run hello-world',
                explanation: 'Run a test container. Docker downloads the hello-world image and runs it. You should see "Hello from Docker!" — installation successful!',
              },
            ],
          },
          { type: 'heading', text: 'Install Docker on Linux (Ubuntu/Debian)' },
          {
            type: 'installation',
            steps: [
              {
                cmd: 'sudo apt update && sudo apt install -y ca-certificates curl gnupg',
                explanation: 'Install prerequisites for adding Docker\'s GPG key and repository.',
              },
              {
                cmd: 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg',
                explanation: 'Add Docker\'s official GPG key for secure package verification.',
              },
              {
                cmd: 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list',
                explanation: 'Add the official Docker repository to apt sources.',
              },
              {
                cmd: 'sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin',
                explanation: 'Install Docker Engine, CLI, containerd runtime, and Compose plugin.',
              },
              {
                cmd: 'sudo usermod -aG docker $USER && newgrp docker',
                explanation: 'Add your user to the docker group so you can run Docker without sudo. Log out and back in for this to take effect.',
              },
              {
                cmd: 'docker run hello-world',
                explanation: 'Test installation — should print "Hello from Docker!" without requiring sudo.',
              },
            ],
          },
          { type: 'heading', text: 'Verify Docker Installation' },
          {
            type: 'code',
            language: 'bash',
            label: 'Check all Docker components',
            code: `docker --version           # Docker version 24.x.x
docker compose version     # Docker Compose v2.x.x
docker info                # System-wide info (OS, memory, containers)
docker ps                  # List running containers (should be empty)
docker images              # List downloaded images (should be empty)`,
          },
          {
            type: 'tip',
            content: 'On Windows, make sure Docker Desktop is running (whale icon in system tray) before using Docker commands. If you get "Cannot connect to the Docker daemon", Docker Desktop is not running.',
          },
          {
            type: 'quiz',
            question: 'On Windows, what backend does Docker Desktop use to run Linux containers?',
            options: [
              { id: 'a', text: 'VirtualBox' },
              { id: 'b', text: 'VMware' },
              { id: 'c', text: 'WSL 2 (Windows Subsystem for Linux)' },
              { id: 'd', text: 'Hyper-V only' },
            ],
            correct: 'c',
            explanation: 'Docker Desktop on Windows uses WSL 2 as the recommended backend. WSL 2 runs a full Linux kernel in an efficient VM, giving Docker near-native Linux performance on Windows.',
          },
        ],
      },

      // ── SECTION 2: CORE COMMANDS ───────────────────────────────────────────
      {
        title: '📦 Core Docker Commands',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⌨️',
            content: 'Docker commands follow a pattern: "docker [object] [action]". Like a library system — you search for books (images), borrow them (pull), read them (run), and return when done (stop/rm). Once you understand this pattern, all commands become intuitive.',
          },
          { type: 'heading', text: 'Image Commands' },
          {
            type: 'code',
            language: 'bash',
            label: 'Working with Docker images',
            code: `# Pull an image from Docker Hub
docker pull python:3.12-slim       # Download Python 3.12 slim image
docker pull nginx:latest           # Download latest Nginx
docker pull postgres:16            # Download PostgreSQL 16

# List downloaded images
docker images
docker image ls                    # Same thing

# Search images on Docker Hub
docker search selenium

# Remove an image (must stop all containers using it first)
docker rmi python:3.12-slim        # Remove by name:tag
docker image rm abc123def456       # Remove by image ID

# Remove all unused images (cleanup)
docker image prune -a

# Inspect image details
docker inspect python:3.12-slim`,
          },
          { type: 'heading', text: 'Container Commands' },
          {
            type: 'code',
            language: 'bash',
            label: 'Working with Docker containers',
            code: `# Run a container (creates AND starts)
docker run nginx                   # Run nginx (foreground — blocks terminal)
docker run -d nginx                # -d = detached (background)
docker run -d --name my-nginx nginx    # --name = custom name
docker run -d -p 8080:80 nginx     # -p host:container port mapping

# Common run flags:
docker run -d \\
  --name my-container \\           # Name the container
  -p 8080:80 \\                    # Map host port 8080 → container port 80
  -e APP_ENV=staging \\            # Set environment variable
  -v /host/path:/container/path \\ # Mount volume
  --restart unless-stopped \\     # Auto-restart policy
  python:3.12-slim \\              # Image to use
  python app.py                    # Command to run

# List containers
docker ps                          # Running containers only
docker ps -a                       # ALL containers (including stopped)

# Stop/Start/Restart
docker stop my-container           # Graceful stop (SIGTERM, then SIGKILL)
docker start my-container          # Start a stopped container
docker restart my-container        # Stop then start

# Remove containers
docker rm my-container             # Remove stopped container
docker rm -f my-container          # Force remove (even if running)
docker container prune             # Remove ALL stopped containers

# Logs
docker logs my-container           # Print all logs
docker logs -f my-container        # Follow logs in real-time (like tail -f)
docker logs --tail 50 my-container # Last 50 lines

# Execute command inside running container
docker exec -it my-container bash  # Open interactive bash shell
docker exec my-container ls /app   # Run command without interactive shell

# Copy files between host and container
docker cp my-container:/app/reports ./reports  # Container → host
docker cp ./tests my-container:/app/tests       # Host → container`,
          },
          { type: 'heading', text: 'Volume Commands (Persistent Storage)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Managing Docker volumes',
            code: `# Named volumes — managed by Docker
docker volume create test-data         # Create a named volume
docker volume ls                        # List all volumes
docker volume inspect test-data         # Show volume details
docker volume rm test-data             # Remove volume
docker volume prune                    # Remove all unused volumes

# Mount a volume when running
docker run -d \\
  -v test-data:/app/data \\  # Named volume: test-data → /app/data in container
  python:3.12-slim

# Bind mount — mount a host directory
docker run -d \\
  -v $(pwd)/tests:/app/tests \\  # Host ./tests → container /app/tests
  -v $(pwd)/reports:/app/reports \\  # Host ./reports → container /app/reports
  python:3.12-slim

# QA use case: mount test results so they persist after container stops
docker run --rm \\
  -v $(pwd)/results:/app/results \\   # results/ persists on host
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
          },
          { type: 'heading', text: 'Network Commands' },
          {
            type: 'code',
            language: 'bash',
            label: 'Container networking',
            code: `# List networks
docker network ls

# Create a custom network
docker network create qa-network

# Run containers on the same network
# They can reach each other by container name!
docker run -d --name db --network qa-network postgres:16
docker run -d --name app --network qa-network my-app
# app container can connect to db at hostname "db"

# Inspect network
docker network inspect qa-network

# Connect existing container to a network
docker network connect qa-network my-container`,
          },
          {
            type: 'quiz',
            question: 'Which Docker command runs a container in the BACKGROUND (detached mode)?',
            options: [
              { id: 'a', text: 'docker run --background nginx' },
              { id: 'b', text: 'docker run -d nginx' },
              { id: 'c', text: 'docker run --daemon nginx' },
              { id: 'd', text: 'docker start nginx' },
            ],
            correct: 'b',
            explanation: '"docker run -d" runs the container in detached mode (background). Without -d, the container runs in the foreground and blocks your terminal. "docker start" starts an already-created (stopped) container.',
          },
        ],
      },

      // ── SECTION 3: DOCKERFILE & COMPOSE ───────────────────────────────────
      {
        title: '🗂️ Dockerfile & Docker Compose',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📝',
            content: 'A Dockerfile is like a recipe for building your own Docker image. Docker Compose is like a conductor who starts multiple musicians at once — instead of running 5 separate "docker run" commands, one "docker compose up" starts your entire environment (app + database + test runner) in the right order.',
          },
          { type: 'heading', text: 'Writing a Dockerfile' },
          {
            type: 'code',
            language: 'dockerfile',
            label: 'Dockerfile for a Python test project',
            code: `# FROM — Start from an existing base image
FROM python:3.12-slim

# LABEL — Metadata (optional but good practice)
LABEL maintainer="qa-team@company.com"
LABEL description="QA Test Runner"

# WORKDIR — Set working directory inside container
WORKDIR /app

# COPY — Copy files from host to container
COPY requirements.txt .    # Copy requirements file first (for layer caching)
# requirements.txt is copied BEFORE the rest of code
# Docker caches this layer — only re-runs if requirements.txt changes!

# RUN — Execute commands during image BUILD (not runtime)
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project
COPY . .

# ENV — Set environment variables
ENV APP_ENV=test
ENV BASE_URL=http://localhost:8080

# EXPOSE — Document the port (does NOT actually expose it)
EXPOSE 8080

# CMD — Default command to run when container starts
CMD ["pytest", "tests/", "--html=reports/report.html", "-v"]

# Alternative: ENTRYPOINT — always runs this command
# ENTRYPOINT ["python", "-m"]  # CMD would then append arguments`,
          },
          { type: 'heading', text: 'Multi-Stage Builds (Advanced)' },
          {
            type: 'code',
            language: 'dockerfile',
            label: 'Multi-stage Dockerfile — smaller final image',
            code: `# Stage 1: Build stage (heavy — includes build tools)
FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Runtime stage (lightweight — just what we need to run)
FROM python:3.12-slim AS runtime
WORKDIR /app

# Copy only the installed packages from builder stage
COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH

CMD ["pytest", "tests/"]

# Result: final image is much smaller — no build tools included`,
          },
          { type: 'heading', text: '.dockerignore — Exclude Unnecessary Files' },
          {
            type: 'code',
            language: 'bash',
            label: '.dockerignore file (same concept as .gitignore)',
            code: `# .dockerignore — files NOT copied into the image
__pycache__/
*.pyc
*.pyo
*.pyd
.env
.git/
.gitignore
*.md
tests/               # Don't include test files in production image
reports/             # Don't include test reports
venv/                # Virtual env — rebuild inside container
node_modules/        # Node dependencies — reinstall inside container
.pytest_cache/
.coverage`,
          },
          { type: 'heading', text: 'Docker Compose — Multi-Container Setup' },
          {
            type: 'code',
            language: 'yaml',
            label: 'docker-compose.yml for a QA test environment',
            code: `version: '3.8'

services:
  # PostgreSQL database
  db:
    image: postgres:16
    container_name: qa-database
    environment:
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
      POSTGRES_DB: testdb
    ports:
      - "5432:5432"       # Host 5432 → Container 5432
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Persist DB data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U testuser"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Your application under test
  app:
    build: .              # Build from Dockerfile in current directory
    container_name: qa-app
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgresql://testuser:testpass@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy  # Wait for DB to be ready!

  # Test runner
  tests:
    build:
      context: .
      dockerfile: Dockerfile.test
    container_name: qa-runner
    volumes:
      - ./reports:/app/reports    # Test reports written to host
    environment:
      BASE_URL: http://app:8080   # "app" is the service name above!
      DB_URL: postgresql://testuser:testpass@db:5432/testdb
    depends_on:
      - app
    command: >
      pytest tests/
        --html=/app/reports/report.html
        --junitxml=/app/reports/junit.xml
        -v

volumes:
  postgres_data:    # Named volume for DB persistence`,
          },
          { type: 'heading', text: 'Docker Compose Commands' },
          {
            type: 'code',
            language: 'bash',
            label: 'Common docker compose commands',
            code: `# Start all services (detached)
docker compose up -d

# Start and show logs
docker compose up

# Stop all services
docker compose down

# Stop AND remove volumes (clean slate)
docker compose down -v

# Build images before starting
docker compose up --build

# Scale a service (e.g., run 3 test containers in parallel)
docker compose up --scale tests=3

# View logs
docker compose logs               # All services
docker compose logs app           # Single service
docker compose logs -f app        # Follow (real-time)

# Run one-off command
docker compose run tests pytest tests/api/ -v

# Check service status
docker compose ps`,
          },
          {
            type: 'quiz',
            question: 'In Docker Compose, which key ensures a service waits until another service is healthy?',
            options: [
              { id: 'a', text: 'requires:' },
              { id: 'b', text: 'after:' },
              { id: 'c', text: 'depends_on: with condition: service_healthy' },
              { id: 'd', text: 'wait_for:' },
            ],
            correct: 'c',
            explanation: 'depends_on with condition: service_healthy waits until the dependency\'s healthcheck passes. Without this, your test container might start before the database is actually ready, causing connection errors.',
          },
        ],
      },

      // ── SECTION 4: QA USE CASES ────────────────────────────────────────────
      {
        title: '🧪 Docker for QA',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔬',
            content: 'Docker transforms QA work. Instead of "install Chrome on every CI agent", one command gives you a fresh browser. Instead of "set up a test database", one command gives you a clean PostgreSQL. Your entire test environment becomes portable, reproducible, and disposable.',
          },
          { type: 'heading', text: 'Selenium Grid with Docker Compose' },
          {
            type: 'code',
            language: 'yaml',
            label: 'Full Selenium Grid — Hub + Chrome + Firefox',
            code: `# docker-compose.selenium.yml
version: '3.8'

services:
  selenium-hub:
    image: selenium/hub:4.20.0
    container_name: selenium-hub
    ports:
      - "4442:4442"    # Publisher port
      - "4443:4443"    # Subscriber port
      - "4444:4444"    # Hub UI — open http://localhost:4444/ui

  chrome:
    image: selenium/node-chrome:4.20.0
    shm_size: '2gb'    # Important! Prevents Chrome crashes in containers
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4        # 4 parallel Chrome sessions
    deploy:
      replicas: 2                     # 2 Chrome nodes × 4 sessions = 8 parallel

  firefox:
    image: selenium/node-firefox:4.20.0
    shm_size: '2gb'
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443

  # Your test runner
  test-runner:
    build: .
    depends_on:
      - chrome
      - firefox
    environment:
      - SELENIUM_HUB=http://selenium-hub:4444/wd/hub
    command: pytest tests/ -n 8  # 8 parallel tests!
    volumes:
      - ./reports:/app/reports`,
          },
          {
            type: 'code',
            language: 'python',
            label: 'Connect Selenium to Docker Grid',
            code: `from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import os

def get_driver(browser='chrome'):
    hub_url = os.getenv('SELENIUM_HUB', 'http://localhost:4444/wd/hub')

    if browser == 'chrome':
        options = webdriver.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        driver = webdriver.Remote(
            command_executor=hub_url,    # Connect to Docker Grid
            options=options
        )
    elif browser == 'firefox':
        driver = webdriver.Remote(
            command_executor=hub_url,
            options=webdriver.FirefoxOptions()
        )

    driver.implicitly_wait(10)
    return driver

# In your test:
def test_login(browser='chrome'):
    driver = get_driver(browser)
    driver.get('https://your-app.com')
    # ... test code ...
    driver.quit()`,
          },
          { type: 'heading', text: 'Running Playwright Tests in Docker' },
          {
            type: 'code',
            language: 'yaml',
            label: 'Playwright tests in Docker Compose',
            code: `# docker-compose.playwright.yml
version: '3.8'

services:
  playwright:
    image: mcr.microsoft.com/playwright:v1.42.0-jammy
    working_dir: /app
    volumes:
      - .:/app                    # Mount project directory
      - ./test-results:/app/test-results   # Persist results
      - ./playwright-report:/app/playwright-report
    environment:
      - CI=true
      - BASE_URL=http://your-app.com
    command: >
      bash -c "npm ci &&
               npx playwright test
               --reporter=html
               --reporter=junit,outputFile=test-results/junit.xml"`,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'One-liner: run Playwright tests in Docker',
            code: `# Run Playwright tests without installing anything locally!
docker run --rm \\
  -v $(pwd):/app \\                          # Mount your project
  -v $(pwd)/test-results:/app/test-results \\ # Persist results
  -w /app \\                                 # Set working directory
  mcr.microsoft.com/playwright:v1.42.0-jammy \\
  bash -c "npm ci && npx playwright test"

# Results are saved in ./test-results on your host machine`,
          },
          { type: 'heading', text: 'Real-World Scenarios & Solutions' },
          {
            type: 'error-dictionary',
            framework: 'Docker',
            errors: [
              {
                error: 'Container exits immediately after starting',
                fullMessage: 'docker run my-image → container starts and stops in < 1 second, exit code 0 or 1',
                cause: {
                  en: 'Docker containers run as long as their main process runs. If your CMD/ENTRYPOINT process exits (completes or errors), the container stops. A common mistake: CMD runs a command that finishes instantly.',
                },
                solution: {
                  en: '1) Check docker logs my-container to see the error. 2) If intentional (batch job), this is correct behavior. 3) For services, ensure the process runs in foreground (not as daemon). 4) Use docker run -it my-image bash to debug interactively.',
                },
                codeWrong: `# ❌ Container exits immediately — nginx starts as daemon
FROM nginx
CMD ["nginx"]   # nginx daemonizes and exits the CMD process`,
                codeFixed: `# ✅ Container runs until stopped — nginx in foreground
FROM nginx
CMD ["nginx", "-g", "daemon off;"]  # -g flag prevents daemonizing`,
              },
              {
                error: 'Port already in use — cannot start container',
                fullMessage: 'Error: Bind for 0.0.0.0:8080 failed: port is already allocated',
                cause: {
                  en: 'The host port you\'re trying to map is already occupied by another process or a previously running container that wasn\'t stopped properly.',
                },
                solution: {
                  en: '1) Find what\'s using the port: lsof -i :8080 (Linux/Mac) or netstat -ano | findstr :8080 (Windows). 2) Stop the other process or container. 3) Or use a different host port: -p 8081:8080.',
                },
                codeWrong: `docker run -p 8080:80 nginx
# Error: port 8080 already in use by another container`,
                codeFixed: `# Option 1: Stop the other container first
docker stop old-container
docker run -p 8080:80 nginx

# Option 2: Use a different host port
docker run -p 8081:80 nginx  # Map to 8081 instead

# Option 3: Find and kill what's using 8080
lsof -ti:8080 | xargs kill -9  # Linux/Mac`,
              },
              {
                error: 'Tests pass in Docker but files not found on host',
                fullMessage: 'pytest passed, but reports/ directory is empty on the host machine',
                cause: {
                  en: 'Test reports were written inside the container\'s filesystem. When the container is removed, the files disappear. Volume mount was missing or pointed to the wrong path.',
                },
                solution: {
                  en: 'Always mount the reports directory as a volume. Check that the path in the container matches where your tests write reports. Use --rm flag carefully — it removes the container on exit (useful when you have volumes to persist data).',
                },
                codeWrong: `# ❌ Reports written inside container — lost when container exits
docker run my-test-image pytest tests/ --html=reports/report.html
# Container removed → reports/ gone!`,
                codeFixed: `# ✅ Reports written to mounted host directory — persist after container exits
docker run --rm \\
  -v $(pwd)/reports:/app/reports \\   # Mount host ./reports to container /app/reports
  my-test-image \\
  pytest tests/ --html=/app/reports/report.html
# Host ./reports/report.html now contains the test report!`,
              },
              {
                error: 'Chrome crashes in Docker (out of shared memory)',
                fullMessage: 'DevToolsActivePort file doesn\'t exist / Chrome crashed with exit code 127',
                cause: {
                  en: 'Docker containers by default have only 64MB of /dev/shm (shared memory). Chrome uses shared memory for rendering. 64MB is not enough — Chrome crashes when rendering complex pages.',
                },
                solution: {
                  en: 'Add --shm-size=2gb to docker run or shm_size: 2gb to docker-compose.yml. Alternatively, add --disable-dev-shm-usage to Chrome options (uses /tmp instead, slightly slower).',
                },
                codeWrong: `# ❌ Default 64MB shm — Chrome crashes on complex pages
docker run selenium/standalone-chrome
# Chrome crashes when rendering heavy JavaScript SPAs`,
                codeFixed: `# ✅ Option 1: Increase shm size
docker run --shm-size=2gb selenium/standalone-chrome

# ✅ Option 2: In docker-compose.yml
services:
  chrome:
    image: selenium/node-chrome:4.20.0
    shm_size: '2gb'

# ✅ Option 3: Chrome option (Python)
options.add_argument('--disable-dev-shm-usage')`,
              },
            ],
          },
          {
            type: 'quiz',
            question: 'Why do Selenium Docker containers need "shm_size: 2gb" or "--disable-dev-shm-usage"?',
            options: [
              { id: 'a', text: 'To increase internet download speed' },
              { id: 'b', text: 'Chrome requires extra shared memory (/dev/shm) for rendering; Docker\'s 64MB default is too small' },
              { id: 'c', text: 'To give Chrome access to the GPU' },
              { id: 'd', text: 'Required for Selenium 4 compatibility' },
            ],
            correct: 'b',
            explanation: 'Docker containers default to 64MB of /dev/shm. Chrome uses shared memory for rendering complex pages. 64MB is insufficient and causes Chrome to crash. Solution: increase to 2GB or use --disable-dev-shm-usage (uses /tmp instead).',
          },
        ],
      },

      // ── SECTION 5: INTERVIEW Q&A ───────────────────────────────────────────
      {
        title: '💼 Docker Interview Questions',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Docker',
            questions: [
              // ── BASIC ──────────────────────────────────────────
              {
                level: 'basic',
                q: { en: 'What is Docker and what problem does it solve?' },
                a: { en: 'Docker is a containerization platform that packages applications with all their dependencies into portable containers. It solves the "works on my machine" problem — a container runs identically on any machine with Docker installed, regardless of OS, installed software, or configuration. For QA teams, this means test environments are reproducible: the same Docker image used in CI runs locally on every team member\'s machine.' },
              },
              {
                level: 'basic',
                q: { en: 'What is the difference between a Docker Image and a Docker Container?' },
                a: { en: 'An image is a read-only template — like a class in OOP or a blueprint. It contains the OS layers, runtime, dependencies, and your code. A container is a running instance of an image — like an object created from a class. You can run many containers from a single image simultaneously. When you "docker run python:3.12-slim", Docker takes the image and creates a live, isolated container from it.' },
              },
              {
                level: 'basic',
                q: { en: 'What is a Dockerfile and what are its key instructions?' },
                a: { en: 'A Dockerfile is a text file with step-by-step instructions to build a custom Docker image. Key instructions: FROM (base image), WORKDIR (working directory), COPY (copy files), RUN (execute commands during build), ENV (environment variables), EXPOSE (document port), and CMD or ENTRYPOINT (default command to run). Each instruction creates a layer — Docker caches layers that haven\'t changed, making subsequent builds faster.' },
              },
              {
                level: 'basic',
                q: { en: 'What is the difference between COPY and ADD in a Dockerfile?' },
                a: { en: 'COPY simply copies files from host to container — straightforward and transparent. ADD does the same but also supports URLs (downloads files) and automatically extracts .tar archives. Best practice: always use COPY unless you specifically need ADD\'s extra features. COPY makes the intent clear, ADD can have surprising behavior with auto-extraction.' },
              },
              {
                level: 'basic',
                q: { en: 'What is Docker Compose and when do you use it?' },
                a: { en: 'Docker Compose is a tool for defining and running multi-container applications using a YAML file (docker-compose.yml). Instead of running 4 separate "docker run" commands for your app, database, cache, and test runner — one "docker compose up" starts everything in the correct order with proper networking. In QA, Compose sets up the entire test environment: app under test + database + Selenium Grid + test runner, all connected.' },
              },
              // ── INTERMEDIATE ────────────────────────────────────
              {
                level: 'intermediate',
                q: { en: 'What is the difference between CMD and ENTRYPOINT in a Dockerfile?' },
                a: { en: 'ENTRYPOINT defines the process that always runs — it\'s the container\'s main purpose. CMD provides default arguments that can be overridden. When combined: ENTRYPOINT ["python"] CMD ["app.py"] — by default runs "python app.py", but you can override CMD: "docker run my-image test.py" runs "python test.py". Use ENTRYPOINT for your main executable and CMD for default arguments. If only one is needed, CMD is simpler.' },
              },
              {
                level: 'intermediate',
                q: { en: 'What is a Docker Volume and why do we need it for QA testing?' },
                a: { en: 'A Docker Volume provides persistent storage outside the container\'s filesystem. Containers are ephemeral — when removed, their data disappears. For QA: test reports, screenshots, videos must persist after the container exits. Solution: mount a host directory as a volume (-v $(pwd)/reports:/app/reports). Reports are written inside the container but saved on the host. Jenkins or CI can then publish these reports even after the container is gone.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do containers on the same Docker Compose network communicate?' },
                a: { en: 'Containers on the same Docker network can reach each other using the service name as hostname. In docker-compose.yml, if your app service is named "app" and your DB is "db", the app connects to the database at hostname "db" (e.g., postgresql://db:5432/mydb). Docker\'s built-in DNS resolves service names to container IPs. This is why test runners in Compose use BASE_URL=http://app:8080 not localhost:8080.' },
              },
              {
                level: 'intermediate',
                q: { en: 'What is a multi-stage Docker build and why would you use it for test images?' },
                a: { en: 'Multi-stage builds use multiple FROM instructions in one Dockerfile, each stage creating a separate layer. The final image only includes what you explicitly copy from previous stages. For QA test images: Stage 1 (builder) installs all dev dependencies including compilers and test frameworks. Stage 2 (runtime) starts fresh from a slim base and copies only the installed packages — no build tools. Result: production images are 50-80% smaller and don\'t contain test frameworks.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How do you pass environment-specific configuration to Docker containers?' },
                a: { en: 'Multiple approaches: 1) -e flag: docker run -e DB_URL=... -e API_KEY=... (simple, visible in process list). 2) --env-file: docker run --env-file .env.staging (reads all variables from a file — keep this file out of Git). 3) Docker secrets (production): secure storage for sensitive data, mounted as files inside the container. In docker-compose.yml, use environment: or env_file: sections. Best practice: never hardcode credentials in Dockerfiles or Compose files.' },
              },
              // ── ADVANCED ────────────────────────────────────────
              {
                level: 'advanced',
                q: { en: 'How would you design a parallel test execution setup using Docker for 500 Selenium tests?' },
                a: { en: 'Use Selenium Grid in Docker Compose: selenium-hub + multiple selenium/node-chrome containers. Each Chrome node handles 4-6 parallel sessions. For 500 tests: 3 Chrome nodes × 5 sessions = 15 parallel tests = ~10 min vs 2 hours sequential. Scale Chrome nodes based on CI server capacity: docker compose scale chrome=5. Use pytest-xdist with --dist=loadscope to distribute tests. Each node gets a clean browser session. Mount reports directory to persist results. Add healthchecks to ensure nodes are ready before tests start.' },
              },
              {
                level: 'advanced',
                q: { en: 'How do you optimize Docker image builds for a CI/CD pipeline to reduce build time?' },
                a: { en: 'Layer caching strategy: 1) Order Dockerfile instructions from least-changed to most-changed. 2) COPY requirements.txt before COPY . . — pip install only re-runs when dependencies change, not on every code change. 3) Use .dockerignore to exclude test reports, .git, node_modules. 4) Use multi-stage builds to minimize final image size. 5) Use a Docker registry cache in CI (--cache-from). 6) Pin exact versions (python:3.12.3-slim not python:latest) for reproducibility. Good caching can reduce CI build time from 5 minutes to 30 seconds.' },
              },
              {
                level: 'advanced',
                q: { en: 'How do you debug a container that exits immediately due to an application error?' },
                a: { en: 'Step-by-step: 1) docker logs container-name to see the error output. 2) docker run -it my-image bash to open an interactive shell (bypasses CMD). 3) docker run -it --entrypoint bash my-image if ENTRYPOINT is set. 4) Check exit code: docker inspect container-name | grep "ExitCode". 5) Use docker run --rm my-image env to print all environment variables. 6) Compare working vs broken: docker diff container-name shows filesystem changes. 7) For crashes: add a sleep or tail -f /dev/null at the end of CMD temporarily to keep container running while you investigate.' },
              },
              {
                level: 'advanced',
                q: { en: 'What is the difference between Docker networking modes and when would you use each?' },
                a: { en: 'Key modes: 1) bridge (default) — containers on an isolated virtual network, communicate via container names, port mapping needed to reach from host. 2) host — container shares host\'s network stack, no port mapping needed, but no isolation; useful for performance-sensitive apps or legacy tools expecting localhost. 3) none — no networking, completely isolated; for security-critical processes. 4) overlay — for Docker Swarm multi-host networking. For QA: bridge for multi-container test environments (Selenium Grid), host only when you need the test runner to access localhost services on the host.' },
              },
              {
                level: 'advanced',
                q: { en: 'How do you handle Docker secrets and sensitive data in production vs test environments?' },
                a: { en: 'Production: use Docker Secrets (Swarm) or Kubernetes Secrets — stored encrypted, mounted as files in /run/secrets/. Never in env vars (visible in docker inspect). Test environments: .env files with --env-file flag (exclude from Git with .gitignore), or CI/CD platform secrets (GitHub Actions secrets, Jenkins credentials). For CI: generate fresh credentials per run, revoke after. Key rules: never hardcode credentials in Dockerfile or docker-compose.yml, never commit .env files with real credentials, always use the platform\'s secret store for production.' },
              },
              { level: 'basic', q: { en: 'What is Docker Hub and how does it differ from a private registry?' }, a: { en: 'Docker Hub is a public cloud registry where official and community images are hosted (python, node, postgres). A private registry (AWS ECR, Nexus, Harbor) hosts your company\'s internal images behind authentication. Use Docker Hub for base images, private registry for your app images containing proprietary code. In Java: Docker Hub is like Maven Central (public), private registry is like your company\'s Nexus/Artifactory.' } },
              { level: 'basic', q: { en: 'What does "docker compose up -d" do compared to "docker compose up"?' }, a: { en: 'Without -d (detached): containers run in the foreground, logs stream to terminal, Ctrl+C stops everything. With -d: containers run in the background (daemon mode), terminal is free for other commands. For QA: always use -d in CI/CD pipelines so the pipeline continues to the test execution step. Use without -d during local development to see logs in real-time.' } },
              { level: 'basic', q: { en: 'How do you remove all stopped containers and unused images in one command?' }, a: { en: 'docker system prune removes all stopped containers, unused networks, and dangling images. Add -a to also remove unused images (not just dangling): docker system prune -a. Add --volumes to also remove unused volumes: docker system prune -a --volumes. Warning: this is destructive — make sure no important data is in volumes before running. For CI: run this after test suites to free disk space.' } },
              { level: 'intermediate', q: { en: 'How do you run Selenium Grid with Docker Compose for parallel cross-browser testing?' }, a: { en: 'Create docker-compose.yml with 3 services: selenium-hub (the coordinator), node-chrome, and node-firefox. Set SE_EVENT_BUS_HOST=selenium-hub so nodes register with the hub. Scale nodes: docker compose scale chrome=3 firefox=2. Point your test runner\'s RemoteWebDriver to http://selenium-hub:4444/wd/hub. This gives you 5 parallel browser sessions. In Java: same as Selenium Grid standalone but zero installation — just docker compose up.' } },
              { level: 'intermediate', q: { en: 'What is a multi-stage Docker build and why is it important for QA?' }, a: { en: 'Multi-stage builds use multiple FROM statements. Stage 1 (builder): install all build tools, compile, run tests. Stage 2 (final): copy only the built artifact from Stage 1 into a minimal image. Result: final image is 10x smaller (no build tools, no source code). For QA: run tests in Stage 1, produce test report, copy report to host via volume mount, then deploy the slim final image. Java analogy: like Maven build in one container, deploy only the JAR to another.' } },
              { level: 'intermediate', q: { en: 'How do you debug a Docker container that keeps restarting?' }, a: { en: 'Step 1: docker ps -a shows restart count and exit codes. Step 2: docker logs container-name --tail 100 shows recent output. Step 3: docker inspect container-name | grep RestartPolicy shows if restart=always is causing loops. Step 4: docker run -it --entrypoint sh image-name to bypass CMD and investigate interactively. Common causes: missing environment variables, wrong CMD, application crash on startup, healthcheck failing. For QA: set restart: "no" in docker-compose.yml during testing so failures are visible immediately.' } },
              { level: 'intermediate', q: { en: 'What is Docker healthcheck and how do you use it in test environments?' }, a: { en: 'HEALTHCHECK in Dockerfile defines a command Docker runs periodically to check if the container is healthy. Example: HEALTHCHECK CMD curl -f http://localhost:8080/health || exit 1. In docker-compose.yml: healthcheck with interval, timeout, retries. Other services can use depends_on with condition: service_healthy. For QA: ensure Selenium Grid nodes are ready before tests start — tests wait for the "healthy" status instead of sleeping arbitrary seconds. Java analogy: like Spring Boot Actuator health endpoint but at the container level.' } },
              { level: 'advanced', q: { en: 'How do you implement Docker-based test isolation for database-dependent integration tests?' }, a: { en: 'Strategy: each test run gets a fresh database container. docker-compose.yml: test-app + postgres containers on same network. Before tests: postgres starts with init.sql mounting a volume. After tests: docker compose down -v destroys everything including volumes. For parallel tests: use separate compose projects (COMPOSE_PROJECT_NAME=test-${BUILD_ID}). Benefits: 100% test isolation, no shared state between runs, identical to production DB version. Java: same as Testcontainers library but without Java code managing container lifecycle.' } },
              { level: 'advanced', q: { en: 'How do you reduce Docker image size for a Node.js or Python test runner?' }, a: { en: 'Tactics: 1) Use slim/alpine base images (python:3.12-slim not python:3.12). 2) Multi-stage build: build dependencies in stage 1, copy only installed packages to stage 2. 3) .dockerignore: exclude tests/, reports/, .git/, node_modules/. 4) Combine RUN commands: RUN apt-get update && apt-get install -y pkg1 pkg2 && rm -rf /var/lib/apt/lists/* (removes apt cache). 5) Use pip install --no-cache-dir. 6) Remove dev dependencies after build. Target: under 500MB for test runners. Original full Python image is 1.2GB — slim gets it to 300MB.' } },
              { level: 'advanced', q: { en: 'How do you set up Docker-in-Docker (DinD) for CI/CD testing?' }, a: { en: 'DinD runs Docker inside a Docker container — needed when CI pipeline (itself in a container) must build/test Docker images. Setup: use docker:dind image as a service in GitLab CI or mount /var/run/docker.sock in Jenkins. Security concerns: DinD requires --privileged flag, which gives full host access. Safer alternative: Kaniko or Buildah for rootless image building. For QA: DinD lets you run docker compose inside CI jobs for integration tests, then tear down everything after. Java analogy: like running Maven inside a Maven build — nested but sometimes necessary.' } },
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
      title: '🐳 Docker',
      subtitle: 'Developer ve QA Mühendisleri İçin Containerization',
      intro: 'Docker\'ı sıfırdan mülakat seviyesine taşı. Test ortamlarını containerize et, Selenium Grid ve Playwright\'ı Docker\'da çalıştır ve "bende çalışıyor" sorununu "her yerde çalışıyor" çözümüne dönüştür.',
    },
    tabs: ['🎯 Giriş', '⚙️ Kurulum', '📦 Temel Komutlar', '🗂️ Dockerfile & Compose', '🧪 QA Kullanımı', '💼 Mülakat S&C'],
    sections: [
      // ── SECTION 0: INTRODUCTION (TR) ──────────────────────────────────────
      {
        title: '🎯 Docker Nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📦',
            content: 'Docker, yazılım için bir kargo konteyner gibidir. Fiziksel bir kargo konteyneri mobilya, elektronik, yiyecek — her şeyi taşıyabilir ve her gemi, kamyon, vinç onu nasıl kullanacağını bilir. Docker container\'ları kodunu ve TÜM bağımlılıklarını taşır, böylece uygulaman her yerde aynı şekilde çalışır: laptop\'unda, meslektaşının makinesinde veya bulut sunucusunda.',
          },
          {
            type: 'text',
            content: 'Klasik developer problemi: "Bende çalışıyor!" Docker bunu çözer. Uygulamanı tam bağımlılıklarıyla (Python 3.12, belirli kütüphane versiyonları, OS ayarları) bir container\'a paketleyerek, container\'ın çalıştığı her yerde özdeş davranışı garanti edersin.',
          },
          { type: 'heading', text: 'Container vs Sanal Makine (VM) Karşılaştırması' },
          {
            type: 'table',
            headers: ['Özellik', 'Sanal Makine (VM)', 'Docker Container'],
            rows: [
              ['Boyut', 'VM başına 10–50 GB', 'Image başına 50 MB – 1 GB'],
              ['Başlama süresi', '30 saniye – 5 dakika', '< 1 saniye'],
              ['OS içerir', '✅ Her VM\'de tam OS', '❌ Host OS kernel\'ini paylaşır'],
              ['İzolasyon', '⭐⭐⭐ Güçlü (donanım seviyesi)', '⭐⭐ İyi (process seviyesi)'],
              ['Kaynak kullanımı', '⭐ Ağır (tam OS yükü)', '⭐⭐⭐ Hafif'],
              ['Taşınabilirlik', '⭐⭐ Orta', '⭐⭐⭐ Mükemmel'],
              ['En iyi kullanım', 'Tam OS izolasyonu, eski uygulamalar', 'Microservices, CI/CD, test'],
            ],
          },
          { type: 'heading', text: 'Docker Mimarisi — Temel Kavramlar' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🏗️', label: 'Docker Image', desc: 'Salt okunur şablon (OOP\'taki class gibi). OS katmanı, runtime, kod ve bağımlılıkları içerir. Dockerfile\'dan build edilir.' },
              { icon: '📦', label: 'Docker Container', desc: 'Image\'ın çalışan instance\'ı (nesne örneği gibi). OS\'unuzda izole bir process. Tek image\'dan birçok container çalıştırabilirsin.' },
              { icon: '📋', label: 'Dockerfile', desc: 'Image build etme talimatlarını içeren metin dosyası. Tarif gibi: FROM python:3.12, COPY dosyalar, RUN pip install.' },
              { icon: '🏪', label: 'Docker Hub / Registry', desc: 'Docker image\'ları için depo (Maven Central veya npm registry gibi). Genel image\'lar: python, node, postgres, jenkins.' },
              { icon: '💾', label: 'Volume', desc: 'Container yeniden başlatmalarında hayatta kalan kalıcı depolama. Host klasörünü container\'a mount et. Test raporları ve veritabanları için kullanılır.' },
              { icon: '🌐', label: 'Network', desc: 'Container\'ları birbirine bağlayan sanal ağ. Aynı ağdaki container\'lar birbirine container adıyla (DNS) ulaşabilir.' },
            ],
          },
          { type: 'heading', text: 'QA Mühendisleri Neden Docker\'a İhtiyaç Duyar?' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              '"Bende çalışıyor" sorunu ortadan kalkar — herkes aynı ortamı çalıştırır',
              'Tek komutla tam Selenium Grid (Hub + Chrome + Firefox) kur',
              'CI\'da browser yüklemeden Playwright testlerini çalıştır',
              'Mock değil gerçek PostgreSQL veya MySQL veritabanıyla test et',
              'Production bug\'ını tam olarak reproduce et — aynı OS, aynı versiyonlar',
              'Paralel test ortamları — aynı anda 10 izole test container\'ı çalıştır',
              'Her çalışmada temiz sayfa — önceki testlerden kalan state yok',
            ],
          },
          {
            type: 'quiz',
            question: 'Docker Image ile Docker Container arasındaki temel fark nedir?',
            options: [
              { id: 'a', text: 'Image\'lar Linux için, container\'lar Windows için' },
              { id: 'b', text: 'Image şablondur (statik), container çalışan instance\'dır' },
              { id: 'c', text: 'Image\'lar container\'lardan daha küçüktür' },
              { id: 'd', text: 'Tek bir image\'dan sadece bir container çalıştırılabilir' },
            ],
            correct: 'b',
            explanation: 'Image, OOP\'taki class gibidir — salt okunur bir şablon. Container, çalışan bir nesne örneği gibidir — image\'a dayalı canlı bir process. Tek image\'dan aynı anda birçok container çalıştırabilirsin.',
          },
        ],
      },

      // ── SECTION 1: INSTALLATION (TR) ──────────────────────────────────────
      {
        title: '⚙️ Docker Kurulumu',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Docker Desktop, Windows ve Mac\'te başlamak için en kolay yoldur. Docker Engine, CLI, Docker Compose ve görsel arayüz içerir. Linux\'ta Docker Engine\'i doğrudan kurarsın — daha hafif ve hızlı.',
          },
          { type: 'heading', text: 'Windows\'a Docker Desktop Kurulumu' },
          {
            type: 'installation',
            steps: [
              {
                cmd: '# Adım 1: WSL 2\'yi Etkinleştir (Windows Subsystem for Linux)',
                explanation: 'PowerShell\'i Yönetici olarak açıp çalıştır: wsl --install. Bu, Docker Desktop\'ın arka ucu olarak kullandığı WSL 2\'yi kurar. Sonrasında bilgisayarı yeniden başlat.',
              },
              {
                cmd: '# Adım 2: Docker Desktop\'ı indir',
                explanation: 'docker.com/products/docker-desktop → Windows için indir. Mimarini seç (çoğu PC için AMD64, Surface Pro X için ARM64).',
              },
              {
                cmd: '# Adım 3: Installer\'ı çalıştır',
                explanation: 'Docker Desktop Installer.exe\'e çift tıkla. "Use WSL 2 instead of Hyper-V"\'yi işaretle (önerilir). OK\'e tıklayıp kurulumu bekle.',
              },
              {
                cmd: '# Adım 4: Docker Desktop\'ı başlat',
                explanation: 'Başlat menüsünden Docker Desktop\'ı aç. Sistem tepsisinde 🐳 simgesi görünene ve "Docker Desktop is running" yazısı çıkana kadar bekle.',
              },
              {
                cmd: 'docker --version',
                explanation: 'Kurulumu doğrula. Beklenen çıktı: "Docker version 24.x.x, build xxxxx"',
              },
              {
                cmd: 'docker run hello-world',
                explanation: 'Test container\'ı çalıştır. Docker hello-world image\'ını indirir ve çalıştırır. "Hello from Docker!" görmelisin — kurulum başarılı!',
              },
            ],
          },
          { type: 'heading', text: 'Linux\'a (Ubuntu/Debian) Docker Kurulumu' },
          {
            type: 'installation',
            steps: [
              { cmd: 'sudo apt update && sudo apt install -y ca-certificates curl gnupg', explanation: 'Docker GPG anahtarı ve repository için ön gereksinimleri kur.' },
              { cmd: 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg', explanation: 'Docker\'ın resmi GPG anahtarını ekle.' },
              { cmd: 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list', explanation: 'Resmi Docker repository\'sini apt kaynaklarına ekle.' },
              { cmd: 'sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin', explanation: 'Docker Engine, CLI, containerd runtime ve Compose plugin\'i kur.' },
              { cmd: 'sudo usermod -aG docker $USER && newgrp docker', explanation: 'Kullanıcını docker grubuna ekle — sudo olmadan Docker kullanabilmek için.' },
              { cmd: 'docker run hello-world', explanation: 'Kurulumu test et — sudo olmadan "Hello from Docker!" görmelisin.' },
            ],
          },
          { type: 'heading', text: 'Docker Kurulumunu Doğrula' },
          {
            type: 'code',
            language: 'bash',
            label: 'Tüm Docker bileşenlerini kontrol et',
            code: `docker --version           # Docker version 24.x.x
docker compose version     # Docker Compose v2.x.x
docker info                # Sistem geneli bilgiler (OS, bellek, container\'lar)
docker ps                  # Çalışan container\'ları listele (boş olmalı)
docker images              # İndirilen image\'ları listele (boş olmalı)`,
          },
          { type: 'tip', content: 'Windows\'ta Docker komutlarını kullanmadan önce Docker Desktop\'ın çalıştığından emin ol (sistem tepsisinde balina simgesi). "Cannot connect to the Docker daemon" hatası alıyorsan Docker Desktop çalışmıyordur.' },
          {
            type: 'quiz',
            question: 'Windows\'ta Docker Desktop, Linux container\'larını çalıştırmak için hangi arka ucu kullanır?',
            options: [
              { id: 'a', text: 'VirtualBox' },
              { id: 'b', text: 'VMware' },
              { id: 'c', text: 'WSL 2 (Windows Subsystem for Linux)' },
              { id: 'd', text: 'Sadece Hyper-V' },
            ],
            correct: 'c',
            explanation: 'Windows\'ta Docker Desktop önerilen arka uç olarak WSL 2 kullanır. WSL 2, verimli bir VM\'de tam Linux kernel çalıştırarak Docker\'a Windows\'ta Linux\'a yakın performans sağlar.',
          },
        ],
      },

      // ── SECTION 2: CORE COMMANDS (TR) ─────────────────────────────────────
      {
        title: '📦 Temel Docker Komutları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⌨️',
            content: 'Docker komutları bir kalıbı takip eder: "docker [nesne] [eylem]". Kütüphane sistemi gibi — kitap ara (image), ödünç al (pull), oku (run), bitince iade et (stop/rm). Bu kalıbı anlayınca tüm komutlar sezgisel hale gelir.',
          },
          { type: 'heading', text: 'Image Komutları' },
          {
            type: 'code',
            language: 'bash',
            label: 'Docker image\'larıyla çalışma',
            code: `# Docker Hub\'dan image çek
docker pull python:3.12-slim       # Python 3.12 slim image\'ı indir
docker pull nginx:latest           # Son Nginx sürümünü indir
docker pull postgres:16            # PostgreSQL 16\'yı indir

# İndirilen image\'ları listele
docker images
docker image ls                    # Aynı şey

# Docker Hub\'da image ara
docker search selenium

# Image\'ı sil (önce kullanan tüm container\'ları durdur)
docker rmi python:3.12-slim        # Ad:etiket ile sil
docker image rm abc123def456       # Image ID ile sil

# Kullanılmayan tüm image\'ları sil (temizlik)
docker image prune -a

# Image detaylarını incele
docker inspect python:3.12-slim`,
          },
          { type: 'heading', text: 'Container Komutları' },
          {
            type: 'code',
            language: 'bash',
            label: 'Docker container\'larıyla çalışma',
            code: `# Container çalıştır (oluştur VE başlat)
docker run nginx                   # Nginx çalıştır (ön planda — terminal bloke)
docker run -d nginx                # -d = detached (arka planda)
docker run -d --name my-nginx nginx    # --name = özel ad
docker run -d -p 8080:80 nginx     # -p host:container port eşlemesi

# Sık kullanılan run flag\'leri:
docker run -d \\
  --name my-container \\           # Container\'a ad ver
  -p 8080:80 \\                    # Host 8080 → Container 80
  -e APP_ENV=staging \\            # Environment variable ayarla
  -v /host/dizin:/container/dizin \\ # Volume mount et
  --restart unless-stopped \\     # Otomatik yeniden başlatma
  python:3.12-slim \\              # Kullanılacak image
  python app.py                    # Çalıştırılacak komut

# Container\'ları listele
docker ps                          # Sadece çalışan container\'lar
docker ps -a                       # TÜM container\'lar (durdurulmuş dahil)

# Durdur/Başlat/Yeniden Başlat
docker stop my-container           # Zarif durdur (SIGTERM, sonra SIGKILL)
docker start my-container          # Durdurulmuş container\'ı başlat
docker restart my-container        # Durdur sonra başlat

# Container\'ları sil
docker rm my-container             # Durdurulmuş container\'ı sil
docker rm -f my-container          # Zorla sil (çalışıyor olsa bile)
docker container prune             # Durdurulmuş TÜM container\'ları sil

# Log\'lar
docker logs my-container           # Tüm log\'ları yazdır
docker logs -f my-container        # Log\'ları gerçek zamanlı takip et (tail -f gibi)
docker logs --tail 50 my-container # Son 50 satır

# Çalışan container içinde komut çalıştır
docker exec -it my-container bash  # İnteraktif bash shell aç
docker exec my-container ls /app   # İnteraktif olmadan komut çalıştır

# Host ve container arasında dosya kopyala
docker cp my-container:/app/reports ./reports  # Container → host
docker cp ./tests my-container:/app/tests       # Host → container`,
          },
          {
            type: 'simulation',
            icon: '🐳',
            color: '#0369a1',
            title: { tr: 'Container Yaşam Döngüsü — Canlı Demo', en: 'Container Lifecycle — Live Demo' },
            scenario: 'docker-lifecycle',
            description: {
              tr: '"▶ Demo Çalıştır" butonuna bas: docker pull → docker run → docker exec → docker stop adımlarını terminal çıktısıyla izle. Java\'da class=Image, new MyClass()=docker run analogisini sağda gör.',
              en: 'Press "▶ Demo Çalıştır": watch docker pull → docker run → docker exec → docker stop steps with terminal output. See the Java class=Image, new MyClass()=docker run analogy on the right.',
            },
            code: `# 1. Image indir
docker pull nginx:latest

# 2. Container oluştur ve çalıştır
# Java analoji: new MyClass() gibi — image'dan container instance oluştur
docker run -d \\
  --name my-nginx \\      # Container adı (new MyClass() → my-nginx)
  -p 8080:80 \\           # Host:Container port eşlemesi
  nginx:latest            # Kullanılan image (class = Image)

# 3. Container'ın içine gir (debug için)
docker exec -it my-nginx bash
# root@a1b2c3d4:/# whoami → root

# 4. Container'ı durdur ve sil
docker stop my-nginx
docker rm my-nginx`,
            language: 'bash',
          },
          { type: 'heading', text: 'Volume Komutları (Kalıcı Depolama)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Docker volume yönetimi',
            code: `# Adlandırılmış volume\'ler — Docker tarafından yönetilir
docker volume create test-data         # Adlandırılmış volume oluştur
docker volume ls                        # Tüm volume\'leri listele
docker volume inspect test-data         # Volume detaylarını göster
docker volume rm test-data             # Volume sil
docker volume prune                    # Kullanılmayan volume\'leri sil

# Çalıştırırken volume mount et
docker run -d \\
  -v test-data:/app/data \\  # Adlandırılmış volume

# Bind mount — host dizini mount et
docker run -d \\
  -v $(pwd)/tests:/app/tests \\      # Host ./tests → Container /app/tests
  -v $(pwd)/reports:/app/reports \\  # Host ./reports → Container /app/reports
  python:3.12-slim

# QA kullanım senaryosu: container dursa bile test sonuçları kalıcı olsun
docker run --rm \\
  -v $(pwd)/results:/app/results \\   # results/ host\'ta kalır
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
          },
          { type: 'heading', text: 'Network Komutları' },
          {
            type: 'code',
            language: 'bash',
            label: 'Container network yönetimi',
            code: `# Network\'leri listele
docker network ls

# Özel network oluştur
docker network create qa-network

# Aynı network\'te container çalıştır
# Birbirine container adıyla ulaşabilirler!
docker run -d --name db --network qa-network postgres:16
docker run -d --name app --network qa-network my-app
# app container\'ı, "db" hostname\'iyle veritabanına bağlanır

# Network\'ü incele
docker network inspect qa-network

# Mevcut container\'ı network\'e bağla
docker network connect qa-network my-container`,
          },
          {
            type: 'quiz',
            question: 'Container\'ı ARKA PLANDA (detached mode) çalıştıran Docker komutu hangisidir?',
            options: [
              { id: 'a', text: 'docker run --background nginx' },
              { id: 'b', text: 'docker run -d nginx' },
              { id: 'c', text: 'docker run --daemon nginx' },
              { id: 'd', text: 'docker start nginx' },
            ],
            correct: 'b',
            explanation: '"docker run -d", container\'ı detached modda (arka planda) çalıştırır. -d olmadan container ön planda çalışır ve terminali bloke eder. "docker start", önceden oluşturulmuş (durdurulmuş) bir container\'ı başlatır.',
          },
        ],
      },

      // ── SECTION 3: DOCKERFILE & COMPOSE (TR) ──────────────────────────────
      {
        title: '🗂️ Dockerfile ve Docker Compose',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📝',
            content: 'Dockerfile, kendi Docker image\'ını oluşturmak için bir tarif gibidir. Docker Compose ise aynı anda birden fazla müzisyeni başlatan bir şef gibidir — 5 ayrı "docker run" komutu yerine tek "docker compose up", tüm ortamını (uygulama + veritabanı + test runner) doğru sırayla başlatır.',
          },
          { type: 'heading', text: 'Dockerfile Yazma' },
          {
            type: 'code',
            language: 'dockerfile',
            label: 'Python test projesi için Dockerfile',
            code: `# FROM — Mevcut bir base image\'dan başla
FROM python:3.12-slim

# LABEL — Metadata (opsiyonel ama iyi pratik)
LABEL maintainer="qa-ekibi@sirket.com"
LABEL description="QA Test Runner"

# WORKDIR — Container içinde çalışma dizinini ayarla
WORKDIR /app

# COPY — Host\'tan container\'a dosya kopyala
COPY requirements.txt .    # Önce requirements dosyasını kopyala (katman önbelleklemesi için!)
# requirements.txt kodun geri kalanından ÖNCE kopyalanır
# Docker bu katmanı önbellekler — sadece requirements.txt değişince yeniden çalışır!

# RUN — Image BUILD sırasında komut çalıştır (runtime değil)
RUN pip install --no-cache-dir -r requirements.txt

# Projenin geri kalanını kopyala
COPY . .

# ENV — Environment variable ayarla
ENV APP_ENV=test
ENV BASE_URL=http://localhost:8080

# EXPOSE — Portu belge (gerçekten expose ETMEz)
EXPOSE 8080

# CMD — Container başladığında çalıştırılacak varsayılan komut
CMD ["pytest", "tests/", "--html=reports/report.html", "-v"]`,
          },
          { type: 'heading', text: 'Multi-Stage Build (Gelişmiş)' },
          {
            type: 'code',
            language: 'dockerfile',
            label: 'Multi-stage Dockerfile — daha küçük final image',
            code: `# 1. Aşama: Build aşaması (ağır — build araçları dahil)
FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# 2. Aşama: Runtime aşaması (hafif — sadece çalıştırmak için gerekli)
FROM python:3.12-slim AS runtime
WORKDIR /app

# Sadece kurulmuş paketleri builder aşamasından kopyala
COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH

CMD ["pytest", "tests/"]

# Sonuç: final image çok daha küçük — build araçları dahil değil`,
          },
          { type: 'heading', text: '.dockerignore — Gereksiz Dosyaları Hariç Tut' },
          {
            type: 'code',
            language: 'bash',
            label: '.dockerignore dosyası (.gitignore ile aynı konsept)',
            code: `# .dockerignore — image\'a kopyalanmayacak dosyalar
__pycache__/
*.pyc
.env
.git/
*.md
tests/               # Production image\'a test dosyaları dahil etme
reports/             # Test raporlarını dahil etme
venv/                # Sanal ortam — container içinde yeniden kur
node_modules/        # Node bağımlılıkları — container içinde yeniden kur
.pytest_cache/
.coverage`,
          },
          { type: 'heading', text: 'Docker Compose — Çoklu Container Kurulumu' },
          {
            type: 'code',
            language: 'yaml',
            label: 'QA test ortamı için docker-compose.yml',
            code: `version: '3.8'

services:
  # PostgreSQL veritabanı
  db:
    image: postgres:16
    container_name: qa-veritabani
    environment:
      POSTGRES_USER: testkullanici
      POSTGRES_PASSWORD: testparola
      POSTGRES_DB: testdb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U testkullanici"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Test edilen uygulama
  app:
    build: .
    container_name: qa-uygulama
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgresql://testkullanici:testparola@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy  # DB hazır olana kadar bekle!

  # Test runner
  tests:
    build:
      context: .
      dockerfile: Dockerfile.test
    container_name: qa-runner
    volumes:
      - ./reports:/app/reports    # Test raporları host\'a yazılır
    environment:
      BASE_URL: http://app:8080   # "app" yukarıdaki servis adı!
      DB_URL: postgresql://testkullanici:testparola@db:5432/testdb
    depends_on:
      - app
    command: >
      pytest tests/
        --html=/app/reports/report.html
        --junitxml=/app/reports/junit.xml
        -v

volumes:
  postgres_data:`,
          },
          { type: 'heading', text: 'Docker Compose Komutları' },
          {
            type: 'code',
            language: 'bash',
            label: 'Yaygın docker compose komutları',
            code: `# Tüm servisleri başlat (arka planda)
docker compose up -d

# Başlat ve log\'ları göster
docker compose up

# Tüm servisleri durdur
docker compose down

# Durdur VE volume\'leri sil (temiz başlangıç)
docker compose down -v

# Başlamadan önce image\'ları build et
docker compose up --build

# Servisi ölçeklendir (örn: 3 test container paralel)
docker compose up --scale tests=3

# Log\'ları görüntüle
docker compose logs               # Tüm servisler
docker compose logs app           # Tek servis
docker compose logs -f app        # Takip et (gerçek zamanlı)

# Tek seferlik komut çalıştır
docker compose run tests pytest tests/api/ -v

# Servis durumunu kontrol et
docker compose ps`,
          },
          {
            type: 'quiz',
            question: 'Docker Compose\'da bir servisin başka bir servis hazır olana kadar beklemesini sağlayan key hangisidir?',
            options: [
              { id: 'a', text: 'requires:' },
              { id: 'b', text: 'after:' },
              { id: 'c', text: 'depends_on: condition: service_healthy ile birlikte' },
              { id: 'd', text: 'wait_for:' },
            ],
            correct: 'c',
            explanation: 'depends_on + condition: service_healthy, bağımlılığın healthcheck\'i geçene kadar bekler. Bunu kullanmazsan test container\'ın veritabanı gerçekten hazır olmadan başlayabilir ve bağlantı hataları alırsın.',
          },
        ],
      },

      // ── SECTION 4: QA USE CASES (TR) ──────────────────────────────────────
      {
        title: '🧪 QA İçin Docker',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔬',
            content: 'Docker, QA çalışmasını dönüştürür. "Her CI agent\'ına Chrome kur" yerine tek komutla taze browser. "Test veritabanı kur" yerine tek komutla temiz PostgreSQL. Tüm test ortamın taşınabilir, tekrarlanabilir ve tek kullanımlık hale gelir.',
          },
          { type: 'heading', text: 'Docker Compose ile Selenium Grid' },
          {
            type: 'code',
            language: 'yaml',
            label: 'Tam Selenium Grid — Hub + Chrome + Firefox',
            code: `# docker-compose.selenium.yml
version: '3.8'

services:
  selenium-hub:
    image: selenium/hub:4.20.0
    container_name: selenium-hub
    ports:
      - "4442:4442"    # Publisher portu
      - "4443:4443"    # Subscriber portu
      - "4444:4444"    # Hub UI — http://localhost:4444/ui

  chrome:
    image: selenium/node-chrome:4.20.0
    shm_size: '2gb'    # Önemli! Container\'larda Chrome crash\'ini önler
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4        # 4 paralel Chrome session
    deploy:
      replicas: 2                     # 2 Chrome node × 4 session = 8 paralel

  firefox:
    image: selenium/node-firefox:4.20.0
    shm_size: '2gb'
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443

  # Test runner
  test-runner:
    build: .
    depends_on:
      - chrome
      - firefox
    environment:
      - SELENIUM_HUB=http://selenium-hub:4444/wd/hub
    command: pytest tests/ -n 8  # 8 paralel test!
    volumes:
      - ./reports:/app/reports`,
          },
          {
            type: 'code',
            language: 'python',
            label: 'Selenium\'u Docker Grid\'e bağlama',
            code: `from selenium import webdriver
import os

def get_driver(browser='chrome'):
    hub_url = os.getenv('SELENIUM_HUB', 'http://localhost:4444/wd/hub')

    if browser == 'chrome':
        options = webdriver.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        driver = webdriver.Remote(
            command_executor=hub_url,    # Docker Grid\'e bağlan
            options=options
        )
    elif browser == 'firefox':
        driver = webdriver.Remote(
            command_executor=hub_url,
            options=webdriver.FirefoxOptions()
        )

    driver.implicitly_wait(10)
    return driver

# Testinde:
def test_giris(browser='chrome'):
    driver = get_driver(browser)
    driver.get('https://uygulamaniz.com')
    # ... test kodu ...
    driver.quit()`,
          },
          { type: 'heading', text: 'Docker\'da Playwright Testleri' },
          {
            type: 'code',
            language: 'bash',
            label: 'Docker\'da Playwright — lokale hiçbir şey kurmadan!',
            code: `# Tek komutla Playwright testlerini çalıştır — lokale browser kurmana gerek yok!
docker run --rm \\
  -v $(pwd):/app \\                          # Projeyi mount et
  -v $(pwd)/test-results:/app/test-results \\ # Sonuçları kalıcı yap
  -w /app \\                                 # Çalışma dizinini ayarla
  mcr.microsoft.com/playwright:v1.42.0-jammy \\
  bash -c "npm ci && npx playwright test"

# ./test-results, host makinende kaydedilir`,
          },
          { type: 'heading', text: 'Gerçek Hayat Senaryoları ve Çözümleri' },
          {
            type: 'error-dictionary',
            framework: 'Docker',
            errors: [
              {
                error: 'Container başlar başlamaz çıkıyor',
                fullMessage: 'docker run my-image → container 1 saniyeden kısa sürede durur, çıkış kodu 0 veya 1',
                cause: {
                  tr: 'Docker container\'ları ana process çalıştığı sürece yaşar. CMD/ENTRYPOINT process\'i biterse (tamamlanır veya hata verir), container durur. Yaygın hata: CMD anında biten bir komut çalıştırıyor.',
                },
                solution: {
                  tr: '1) docker logs my-container ile hatayı gör. 2) İsteyerek biten bir işse (batch iş), bu doğru davranış. 3) Servisler için process ön planda çalışmalı (daemon olmamalı). 4) docker run -it my-image bash ile interaktif debug yap.',
                },
                codeWrong: `# ❌ Container anında çıkıyor — nginx daemon olarak başlıyor
FROM nginx
CMD ["nginx"]   # nginx daemonize olup CMD process'i çıkıyor`,
                codeFixed: `# ✅ Container durdurana kadar çalışır — nginx ön planda
FROM nginx
CMD ["nginx", "-g", "daemon off;"]  # -g flag daemon\'laşmayı engeller`,
              },
              {
                error: 'Port kullanımda — container başlayamıyor',
                fullMessage: 'Error: Bind for 0.0.0.0:8080 failed: port is already allocated',
                cause: {
                  tr: 'Map\'lemeye çalıştığın host portu başka bir process ya da düzgün durdurulmamış önceki container tarafından kullanılıyor.',
                },
                solution: {
                  tr: '1) Portu kullananı bul: lsof -i :8080 (Linux/Mac) veya netstat -ano | findstr :8080 (Windows). 2) Diğer process veya container\'ı durdur. 3) Ya da farklı host portu kullan: -p 8081:8080.',
                },
                codeWrong: `docker run -p 8080:80 nginx
# Hata: port 8080 başka container tarafından kullanılıyor`,
                codeFixed: `# Seçenek 1: Önce diğer container'ı durdur
docker stop eski-container
docker run -p 8080:80 nginx

# Seçenek 2: Farklı host portu kullan
docker run -p 8081:80 nginx  # 8081 olarak map et

# Seçenek 3: 8080'i kullananı bul ve öldür
lsof -ti:8080 | xargs kill -9  # Linux/Mac`,
              },
              {
                error: 'Testler Docker\'da geçiyor ama dosyalar host\'ta yok',
                fullMessage: 'pytest geçti, ancak host makinede reports/ dizini boş',
                cause: {
                  tr: 'Test raporları container\'ın dosya sistemine yazıldı. Container silindiğinde dosyalar kayboluyor. Volume mount eksik veya yanlış path gösteriyor.',
                },
                solution: {
                  tr: 'Reports dizinini her zaman volume olarak mount et. Container\'daki path\'in testlerin raporları yazdığı yerle eşleştiğinden emin ol.',
                },
                codeWrong: `# ❌ Raporlar container içine yazıldı — container çıkınca kayboluyor
docker run my-test-image pytest tests/ --html=reports/report.html
# Container silindi → reports/ gitti!`,
                codeFixed: `# ✅ Raporlar mount edilmiş host dizinine yazıldı — kalıcı
docker run --rm \\
  -v $(pwd)/reports:/app/reports \\   # Host ./reports → Container /app/reports
  my-test-image \\
  pytest tests/ --html=/app/reports/report.html
# Host ./reports/report.html artık test raporunu içeriyor!`,
              },
              {
                error: 'Docker\'da Chrome crash oluyor (shared memory yetersiz)',
                fullMessage: 'DevToolsActivePort file doesn\'t exist / Chrome exited with code 127',
                cause: {
                  tr: 'Docker container\'ları varsayılan olarak sadece 64MB /dev/shm (shared memory) alır. Chrome rendering için shared memory kullanır. 64MB yeterli değildir — karmaşık sayfaları render ederken Chrome crash yapar.',
                },
                solution: {
                  tr: 'docker run\'a --shm-size=2gb ekle veya docker-compose.yml\'a shm_size: 2gb ekle. Alternatif: Chrome seçeneklerine --disable-dev-shm-usage ekle (bunun yerine /tmp kullanır, biraz daha yavaş).',
                },
                codeWrong: `# ❌ Varsayılan 64MB shm — karmaşık sayfalardan Chrome crash yapar
docker run selenium/standalone-chrome
# Chrome, ağır JavaScript SPA\'larını render ederken crash yapıyor`,
                codeFixed: `# ✅ Seçenek 1: shm boyutunu artır
docker run --shm-size=2gb selenium/standalone-chrome

# ✅ Seçenek 2: docker-compose.yml'da
services:
  chrome:
    image: selenium/node-chrome:4.20.0
    shm_size: '2gb'

# ✅ Seçenek 3: Chrome seçeneği (Python)
options.add_argument('--disable-dev-shm-usage')`,
              },
            ],
          },
          {
            type: 'quiz',
            question: 'Selenium Docker container\'larının neden "shm_size: 2gb" veya "--disable-dev-shm-usage" gerektirdiği?',
            options: [
              { id: 'a', text: 'İnternet indirme hızını artırmak için' },
              { id: 'b', text: 'Chrome rendering için /dev/shm\'e ihtiyaç duyar; Docker\'ın 64MB varsayılanı yeterli değildir' },
              { id: 'c', text: 'Chrome\'un GPU\'ya erişmesi için' },
              { id: 'd', text: 'Selenium 4 uyumluluğu için gerekli' },
            ],
            correct: 'b',
            explanation: 'Docker container\'ları varsayılan olarak 64MB /dev/shm alır. Chrome, karmaşık sayfaları render etmek için shared memory kullanır. 64MB yetersiz ve Chrome crash yapar. Çözüm: 2GB\'a çıkar ya da --disable-dev-shm-usage ekle (bunun yerine /tmp kullanır).',
          },
        ],
      },

      // ── SECTION 5: INTERVIEW Q&A (TR) ─────────────────────────────────────
      {
        title: '💼 Docker Mülakat Soruları',
        blocks: [
          {
            type: 'interview-questions',
            topic: 'Docker',
            questions: [
              // ── TEMEL ──────────────────────────────────────────
              {
                level: 'basic',
                q: { tr: 'Docker nedir ve hangi problemi çözer?' },
                a: { tr: 'Docker, uygulamaları tüm bağımlılıklarıyla birlikte taşınabilir container\'lara paketleyen bir containerization platformudur. "Bende çalışıyor" problemini çözer — bir container, Docker kurulu herhangi bir makinede OS\'ten, kurulan yazılımdan veya yapılandırmadan bağımsız olarak özdeş çalışır. QA ekipleri için bu, test ortamlarının tekrarlanabilir olduğu anlamına gelir: CI\'da kullanılan Docker image, ekibin her üyesinin makinesinde lokalde aynı şekilde çalışır.' },
              },
              {
                level: 'basic',
                q: { tr: 'Docker Image ile Docker Container arasındaki fark nedir?' },
                a: { tr: 'Image, salt okunur bir şablon — OOP\'taki class veya bir blueprint gibidir. OS katmanlarını, runtime\'ı, bağımlılıkları ve kodunu içerir. Container, image\'ın çalışan instance\'ı — bir class\'tan oluşturulan nesne gibidir. Tek image\'dan aynı anda birçok container çalıştırabilirsin. "docker run python:3.12-slim" yaptığında Docker image\'ı alır ve ondan canlı, izole bir container oluşturur.' },
              },
              {
                level: 'basic',
                q: { tr: 'Dockerfile nedir ve temel talimatları nelerdir?' },
                a: { tr: 'Dockerfile, özel bir Docker image build etmek için adım adım talimatları içeren bir metin dosyasıdır. Temel talimatlar: FROM (base image), WORKDIR (çalışma dizini), COPY (dosya kopyala), RUN (build sırasında komut çalıştır), ENV (environment variable), EXPOSE (port belgele), CMD veya ENTRYPOINT (varsayılan komut). Her talimat bir katman oluşturur — Docker değişmeyen katmanları önbellekler, sonraki build\'leri hızlandırır.' },
              },
              {
                level: 'basic',
                q: { tr: 'Dockerfile\'da COPY ile ADD arasındaki fark nedir?' },
                a: { tr: 'COPY, host\'tan container\'a dosyaları düz kopyalar — açık ve şeffaf. ADD aynı şeyi yapar ama URL\'leri de destekler (dosya indirir) ve .tar arşivlerini otomatik çıkarır. En iyi pratik: ADD\'nin ekstra özelliklerine özellikle ihtiyaç duymadığın sürece her zaman COPY kullan. COPY niyeti açık kılar, ADD otomatik çıkarmayla beklenmedik davranışlara yol açabilir.' },
              },
              {
                level: 'basic',
                q: { tr: 'Docker Compose nedir ve ne zaman kullanılır?' },
                a: { tr: 'Docker Compose, çoklu container uygulamalarını YAML dosyasıyla (docker-compose.yml) tanımlamak ve çalıştırmak için bir araçtır. Uygulama, veritabanı, cache ve test runner için 4 ayrı "docker run" komutu yerine tek "docker compose up" her şeyi doğru sırayla doğru network\'le başlatır. QA\'da Compose: test edilen uygulama + veritabanı + Selenium Grid + test runner\'ı, hepsi birbirine bağlı şekilde kurar.' },
              },
              // ── ORTA SEVİYE ─────────────────────────────────────
              {
                level: 'intermediate',
                q: { tr: 'Dockerfile\'da CMD ile ENTRYPOINT arasındaki fark nedir?' },
                a: { tr: 'ENTRYPOINT, her zaman çalışan process\'i tanımlar — container\'ın ana amacıdır. CMD, override edilebilir varsayılan argümanlar sağlar. Birlikte kullanıldığında: ENTRYPOINT ["python"] CMD ["app.py"] — varsayılan olarak "python app.py" çalışır, ama CMD override edilebilir: "docker run my-image test.py" → "python test.py" çalışır. Ana executable için ENTRYPOINT, varsayılan argümanlar için CMD kullan. Sadece biri gerekiyorsa CMD daha basittir.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Docker Volume nedir ve QA testleri için neden ihtiyaç duyarız?' },
                a: { tr: 'Docker Volume, container\'ın dosya sisteminin dışında kalıcı depolama sağlar. Container\'lar geçicidir — silindiğinde verileri kaybolur. QA için: test raporları, ekran görüntüleri, videolar container çıktıktan sonra da kalıcı olmalıdır. Çözüm: host dizinini volume olarak mount et (-v $(pwd)/reports:/app/reports). Raporlar container içinde yazılır ama host\'ta kaydedilir. Jenkins veya CI daha sonra bu raporları container gittikten sonra da yayınlayabilir.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Aynı Docker Compose network\'ündeki container\'lar nasıl iletişim kurar?' },
                a: { tr: 'Aynı Docker network\'ündeki container\'lar birbirine servis adını hostname olarak kullanarak ulaşabilir. docker-compose.yml\'da uygulama servisin "app" ve DB\'nin "db" adı varsa, uygulama "db" hostname\'iyle veritabanına bağlanır (örn: postgresql://db:5432/mydb). Docker\'ın yerleşik DNS, servis adlarını container IP\'lerine çevirir. Bu nedenle Compose\'daki test runner\'lar localhost:8080 değil BASE_URL=http://app:8080 kullanır.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Multi-stage Docker build nedir ve test image\'ları için neden kullanılır?' },
                a: { tr: 'Multi-stage build, tek bir Dockerfile\'da birden fazla FROM talimatı kullanır, her aşama ayrı bir katman oluşturur. Final image sadece önceki aşamalardan açıkça kopyaladığın şeyleri içerir. QA test image\'ları için: 1. Aşama (builder), derleyiciler ve test framework\'leri dahil tüm dev bağımlılıklarını kurar. 2. Aşama (runtime), slim base\'den başlar ve sadece kurulmuş paketleri kopyalar — build araçları yok. Sonuç: production image\'lar %50-80 daha küçük, test framework içermez.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Docker container\'larına ortama özgü yapılandırmayı nasıl geçirirsin?' },
                a: { tr: 'Birden fazla yaklaşım: 1) -e flag: docker run -e DB_URL=... -e API_KEY=... (basit, process listesinde görünür). 2) --env-file: docker run --env-file .env.staging (bir dosyadan tüm değişkenleri okur — bu dosyayı Git\'ten dışarıda tut). 3) Docker secrets (production): container içinde dosya olarak mount edilen hassas veriler için güvenli depolama. docker-compose.yml\'da environment: veya env_file: kullan. En iyi pratik: Dockerfile veya Compose dosyalarına asla credential hardcode etme.' },
              },
              // ── İLERİ SEVİYE ────────────────────────────────────
              {
                level: 'advanced',
                q: { tr: '500 Selenium testi için Docker kullanarak paralel test çalıştırma kurulumunu nasıl tasarlarsın?' },
                a: { tr: 'Docker Compose\'da Selenium Grid kullan: selenium-hub + birden fazla selenium/node-chrome container. Her Chrome node 4-6 paralel session yönetir. 500 test için: 3 Chrome node × 5 session = 15 paralel test = sıralı 2 saat yerine ~10 dakika. CI sunucu kapasitesine göre Chrome node\'larını ölçeklendir: docker compose scale chrome=5. pytest-xdist ile --dist=loadscope kullan. Her node temiz bir browser session alır. Sonuçları kalıcı tutmak için reports dizinini mount et. Testler başlamadan önce node\'ların hazır olduğundan emin olmak için healthcheck ekle.' },
              },
              {
                level: 'advanced',
                q: { tr: 'CI/CD pipeline\'ı için Docker image build\'lerini build süresini azaltmak amacıyla nasıl optimize edersin?' },
                a: { tr: 'Katman önbellekleme stratejisi: 1) Dockerfile talimatlarını en az değişenden en çok değişene doğru sırala. 2) COPY requirements.txt\'i COPY . .\'dan önce koy — pip install sadece bağımlılıklar değiştiğinde yeniden çalışır, her kod değişikliğinde değil. 3) Test raporlarını, .git\'i, node_modules\'ü hariç tutmak için .dockerignore kullan. 4) Final image boyutunu minimize etmek için multi-stage build kullan. 5) CI\'da Docker registry cache kullan (--cache-from). 6) Tekrarlanabilirlik için tam versiyonları sabitle (python:3.12.3-slim, python:latest değil). İyi önbellekleme, CI build süresini 5 dakikadan 30 saniyeye düşürebilir.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Uygulama hatası nedeniyle hemen çıkan bir container\'ı nasıl debug edersin?' },
                a: { tr: 'Adım adım: 1) docker logs container-adı ile hata çıktısını gör. 2) docker run -it my-image bash ile interaktif shell aç (CMD\'yi bypass eder). 3) ENTRYPOINT ayarlıysa docker run -it --entrypoint bash my-image kullan. 4) Çıkış kodunu kontrol et: docker inspect container-adı | grep "ExitCode". 5) docker run --rm my-image env ile tüm environment variable\'ları yazdır. 6) Çalışan vs çalışmayan karşılaştırması: docker diff container-adı dosya sistemi değişikliklerini gösterir. 7) Crash için: araştırırken container\'ı çalışır durumda tutmak için CMD\'nin sonuna geçici olarak sleep veya tail -f /dev/null ekle.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Docker network modları arasındaki fark nedir ve her birini ne zaman kullanırsın?' },
                a: { tr: 'Temel modlar: 1) bridge (varsayılan) — container\'lar izole sanal bir ağda, container adlarıyla iletişim, host\'tan ulaşmak için port eşlemesi gerekli. 2) host — container host\'un ağ stack\'ini paylaşır, port eşlemesi gerekmez, izolasyon yok; performans-hassas uygulamalar veya localhost bekleyen eski araçlar için kullanışlı. 3) none — ağ yok, tamamen izole; güvenlik-kritik process\'ler için. 4) overlay — Docker Swarm çoklu-host ağı için. QA için: çoklu container test ortamları (Selenium Grid) için bridge, test runner\'ın host\'taki localhost servislerine erişmesi gerektiğinde host.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Production vs test ortamlarında Docker secret\'larını ve hassas verileri nasıl yönetirsin?' },
                a: { tr: 'Production: Docker Secrets (Swarm) veya Kubernetes Secrets kullan — şifreli olarak saklanır, /run/secrets/ içinde dosya olarak mount edilir. Asla env var\'larda (docker inspect\'te görünür). Test ortamları: --env-file flag\'iyle .env dosyaları (.gitignore ile Git\'ten dışarıda tut) veya CI/CD platform secret\'ları (GitHub Actions secrets, Jenkins credentials). CI için: her çalışmada taze credential oluştur, sonrasında iptal et. Temel kurallar: Dockerfile veya docker-compose.yml\'a asla credential hardcode etme, gerçek credential içeren .env dosyalarını asla commit etme, production için her zaman platform secret store kullan.' },
              },
              { level: 'basic', q: { tr: 'Docker Hub nedir ve özel (private) registry\'den farkı nedir?' }, a: { tr: 'Docker Hub, resmi ve topluluk image\'larının barındırıldığı bulut tabanlı public registry\'dir (python, node, postgres). Özel registry (AWS ECR, Nexus, Harbor) şirketinizin internal image\'larını authentication arkasında saklar. Docker Hub\'ı base image\'lar için, özel registry\'yi proprietary kod içeren uygulama image\'ları için kullan. Java\'da: Docker Hub = Maven Central (public), özel registry = şirketinizin Nexus/Artifactory\'si.' } },
              { level: 'basic', q: { tr: '"docker compose up -d" ile "docker compose up" arasındaki fark nedir?' }, a: { tr: '-d olmadan (detached): container\'lar foreground\'da çalışır, loglar terminale akar, Ctrl+C her şeyi durdurur. -d ile: container\'lar arka planda (daemon mod) çalışır, terminal serbest kalır. QA için: CI/CD pipeline\'larında her zaman -d kullan ki pipeline test çalıştırma adımına devam edebilsin. Lokal geliştirme sırasında logları gerçek zamanlı görmek için -d olmadan kullan.' } },
              { level: 'basic', q: { tr: 'Tüm durdurulmuş container\'ları ve kullanılmayan image\'ları tek komutla nasıl silersin?' }, a: { tr: 'docker system prune tüm durdurulmuş container\'ları, kullanılmayan network\'leri ve dangling image\'ları siler. -a ekleyerek kullanılmayan image\'ları da sil (sadece dangling değil): docker system prune -a. --volumes ekleyerek kullanılmayan volume\'ları da sil: docker system prune -a --volumes. Uyarı: bu yıkıcı bir işlemdir — volume\'larda önemli veri olmadığından emin ol. CI için: disk alanı açmak için test suite\'lerinden sonra çalıştır.' } },
              { level: 'intermediate', q: { tr: 'Docker Compose ile Selenium Grid\'i paralel cross-browser test için nasıl çalıştırırsın?' }, a: { tr: 'docker-compose.yml\'de 3 servis oluştur: selenium-hub (koordinatör), node-chrome ve node-firefox. Node\'ların hub\'a kayıt olması için SE_EVENT_BUS_HOST=selenium-hub ayarla. Node\'ları ölçeklendir: docker compose scale chrome=3 firefox=2. Test runner\'ının RemoteWebDriver\'ını http://selenium-hub:4444/wd/hub adresine yönlendir. Bu sana 5 paralel browser session verir. Java\'da: Selenium Grid standalone ile aynı ama sıfır kurulum — sadece docker compose up.' } },
              { level: 'intermediate', q: { tr: 'Multi-stage Docker build nedir ve QA için neden önemlidir?' }, a: { tr: 'Multi-stage build birden fazla FROM ifadesi kullanır. Stage 1 (builder): tüm build tool\'larını yükle, derle, testleri çalıştır. Stage 2 (final): sadece Stage 1\'den derlenmiş artifact\'ı minimal image\'a kopyala. Sonuç: final image 10 kat daha küçük (build tool yok, kaynak kod yok). QA için: Stage 1\'de testleri çalıştır, test raporu üret, raporu volume mount ile host\'a kopyala, sonra slim final image\'ı deploy et. Java analojisi: bir container\'da Maven build, sadece JAR\'ı başka bir container\'a deploy.' } },
              { level: 'intermediate', q: { tr: 'Sürekli yeniden başlayan bir Docker container\'ı nasıl debug edersin?' }, a: { tr: 'Adım 1: docker ps -a restart sayısını ve exit code\'ları gösterir. Adım 2: docker logs container-adı --tail 100 son çıktıları gösterir. Adım 3: docker inspect container-adı | grep RestartPolicy restart=always\'in loop\'a neden olup olmadığını gösterir. Adım 4: CMD\'yi bypass edip interaktif araştırmak için docker run -it --entrypoint sh image-name. Yaygın nedenler: eksik environment variable, yanlış CMD, uygulama başlangıçta crash, healthcheck başarısız. QA için: test sırasında docker-compose.yml\'de restart: "no" ayarla ki hatalar hemen görünsün.' } },
              { level: 'intermediate', q: { tr: 'Docker healthcheck nedir ve test ortamlarında nasıl kullanılır?' }, a: { tr: 'Dockerfile\'daki HEALTHCHECK, Docker\'ın periyodik olarak container\'ın sağlıklı olup olmadığını kontrol etmek için çalıştırdığı bir komut tanımlar. Örnek: HEALTHCHECK CMD curl -f http://localhost:8080/health || exit 1. docker-compose.yml\'de: interval, timeout, retries ile healthcheck. Diğer servisler depends_on ile condition: service_healthy kullanabilir. QA için: testler başlamadan önce Selenium Grid node\'larının hazır olduğundan emin ol — testler keyfi saniye beklemek yerine "healthy" status\'unu bekler. Java analojisi: Spring Boot Actuator health endpoint\'inin container seviyesindeki karşılığı.' } },
              { level: 'advanced', q: { tr: 'Veritabanı bağımlı entegrasyon testleri için Docker tabanlı test izolasyonunu nasıl uygularsın?' }, a: { tr: 'Strateji: her test çalışması taze bir veritabanı container\'ı alır. docker-compose.yml: test-app + postgres container\'ları aynı network\'te. Testlerden önce: postgres init.sql ile volume mount ederek başlar. Testlerden sonra: docker compose down -v volume\'lar dahil her şeyi yok eder. Paralel testler için: ayrı compose projeleri kullan (COMPOSE_PROJECT_NAME=test-${BUILD_ID}). Avantajlar: %100 test izolasyonu, çalıştırmalar arası paylaşılan state yok, production DB versiyonuyla birebir aynı. Java: Testcontainers kütüphanesiyle aynı ama container yaşam döngüsünü Java kodu yönetmiyor.' } },
              { level: 'advanced', q: { tr: 'Node.js veya Python test runner için Docker image boyutunu nasıl küçültürsün?' }, a: { tr: 'Taktikler: 1) slim/alpine base image kullan (python:3.12-slim, python:3.12 değil). 2) Multi-stage build: stage 1\'de bağımlılıkları derle, sadece yüklü paketleri stage 2\'ye kopyala. 3) .dockerignore: tests/, reports/, .git/, node_modules/ hariç tut. 4) RUN komutlarını birleştir: RUN apt-get update && apt-get install -y pkg1 pkg2 && rm -rf /var/lib/apt/lists/* (apt cache sil). 5) pip install --no-cache-dir kullan. 6) Build sonrası dev bağımlılıkları kaldır. Hedef: test runner\'lar için 500MB altı. Orijinal full Python image 1.2GB — slim 300MB\'a düşürür.' } },
              { level: 'advanced', q: { tr: 'CI/CD testleri için Docker-in-Docker (DinD) nasıl kurulur?' }, a: { tr: 'DinD, Docker container içinde Docker çalıştırır — CI pipeline (kendisi bir container) Docker image build/test yapması gerektiğinde gereklidir. Kurulum: GitLab CI\'da docker:dind image\'ını service olarak kullan veya Jenkins\'de /var/run/docker.sock\'u mount et. Güvenlik endişeleri: DinD --privileged flag gerektirir, bu tam host erişimi verir. Daha güvenli alternatif: rootless image building için Kaniko veya Buildah. QA için: DinD, CI job\'ları içinde entegrasyon testleri için docker compose çalıştırmanı ve sonrasında her şeyi kaldırmanı sağlar. Java analojisi: Maven build içinde Maven build çalıştırmak gibi — iç içe ama bazen gerekli.' } },
            ],
          },
        ],
      },
    ],
  },
}
