import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

const dockerIntroInteractiveBlocks = [
  {
    type: 'code-playground',
      relatedTopicId: 'docker-intro-image-container-practice',
    id: 'docker-intro-image-container-practice',
    label: { tr: 'Pratik: Image\'dan çalışan container üret', en: 'Practice: Create a running container from an image' },
    language: 'bash',
    task: {
      tr: 'Amaç: Docker Image ile Docker Container farkını komut üzerinden hisset. Java analojisi: image class gibidir, docker run ise new ile canlı nesne üretmek gibidir.',
      en: 'Goal: Feel the Image vs Container difference through commands. Java analogy: an image is like a class, docker run is like new creating a live object.',
    },
    explanation: {
      tr: 'Yukarıdaki referansa bakarak boşlukları doldur: image çek, aynı image\'dan isimli ve port eşlemeli container başlat, sonra docker ps ile canlı instance\'ı gör.',
      en: 'Using the reference above, fill in the blanks: pull an image, start a named container with port mapping, then inspect the live instance with docker ps.',
    },
    code: {
      tr: `# Image'i indir
docker pull nginx:latest

# qa-nginx adında, 8080 -> 80 port eşlemeli container başlat
docker run -d --name qa-nginx -p 8080:80 nginx:latest

# Çalışan instance'ı filtrele
docker ps --filter name=qa-nginx`,
      en: `# Download the image
docker pull nginx:latest

# Start a container named qa-nginx with 8080 -> 80 port mapping
docker run -d --name qa-nginx -p 8080:80 nginx:latest

# Filter the running instance
docker ps --filter name=qa-nginx`,
    },
    starterCode: {
      tr: `docker pull nginx:latest
docker run ___ --name qa-nginx ___ nginx:latest
docker ps --filter name=qa-nginx`,
      en: `docker pull nginx:latest
docker run ___ --name qa-nginx ___ nginx:latest
docker ps --filter name=qa-nginx`,
    },
    solutionCode: {
      tr: `docker pull nginx:latest
docker run -d --name qa-nginx -p 8080:80 nginx:latest
docker ps --filter name=qa-nginx`,
      en: `docker pull nginx:latest
docker run -d --name qa-nginx -p 8080:80 nginx:latest
docker ps --filter name=qa-nginx`,
    },
    expected: {
      tr: `nginx:latest image'i hazır.
qa-nginx container'ı arka planda çalışıyor.
PORTS: 0.0.0.0:8080->80/tcp`,
      en: `nginx:latest image is ready.
qa-nginx container is running in the background.
PORTS: 0.0.0.0:8080->80/tcp`,
    },
    hints: [
      { tr: 'Container arka planda çalışsın istiyorsan -d flag gerekir.', en: 'Use the -d flag when the container should run in the background.' },
      { tr: 'Container adı için --name qa-nginx, port için -p 8080:80 kullanılır.', en: 'Use --name qa-nginx for the name and -p 8080:80 for port mapping.' },
      { tr: 'Image adı komutun sonunda gelir: nginx:latest.', en: 'The image name belongs at the end of the command: nginx:latest.' },
    ],
    xpReward: 15,
  },
  {
    type: 'step-animation',
    title: { tr: 'Image\'dan Container\'a Yolculuk', en: 'Journey From Image to Container' },
    steps: [
      { id: 1, icon: '📦', label: { tr: 'Image seçilir', en: 'Image selected' }, detail: { tr: 'Docker Hub veya local registry\'den nginx:latest gibi salt okunur bir template seçilir. Java\'da class seçmek gibi.', en: 'A read-only template such as nginx:latest is selected from Docker Hub or a local registry. Like choosing a class in Java.' } },
      { id: 2, icon: '⬇️', label: { tr: 'Pull yapılır', en: 'Pull happens' }, detail: { tr: 'Image local makinede yoksa Docker katmanları indirir ve cache\'e koyar.', en: 'If the image is missing locally, Docker downloads its layers and stores them in cache.' } },
      { id: 3, icon: '▶️', label: { tr: 'Run edilir', en: 'Run executes' }, detail: { tr: 'docker run image\'dan yazılabilir bir container layer üretir ve ana process\'i başlatır.', en: 'docker run creates a writable container layer from the image and starts the main process.' } },
      { id: 4, icon: '🌐', label: { tr: 'Port bağlanır', en: 'Port mapped' }, detail: { tr: '-p 8080:80 host portunu container içindeki 80 portuna bağlar; tarayıcı localhost:8080 üzerinden ulaşır.', en: '-p 8080:80 connects the host port to port 80 inside the container; the browser can reach it through localhost:8080.' } },
      { id: 5, icon: '🧹', label: { tr: 'Stop/Rm yapılır', en: 'Stop/Rm cleanup' }, detail: { tr: 'İş bitince docker stop process\'i durdurur, docker rm container kayıtlarını temizler; image kalabilir.', en: 'When finished, docker stop ends the process and docker rm removes the container record; the image can remain cached.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-docker-image-container-order-01',
    question: { tr: 'Bir image\'dan canlı container üretme akışını doğru sıraya diz.', en: 'Arrange the flow for creating a live container from an image.' },
    items: [
      { id: '1', text: { tr: 'Registry veya local cache içinden image seç', en: 'Choose the image from a registry or local cache' }, order: 1 },
      { id: '2', text: { tr: 'Image localde yoksa docker pull ile katmanları indir', en: 'If missing locally, download layers with docker pull' }, order: 2 },
      { id: '3', text: { tr: 'docker run ile image\'dan container instance oluştur', en: 'Create a container instance from the image with docker run' }, order: 3 },
      { id: '4', text: { tr: 'Gerekirse port, volume ve environment ayarlarını bağla', en: 'Attach port, volume, and environment settings if needed' }, order: 4 },
      { id: '5', text: { tr: 'docker ps/logs ile çalışan container\'ı doğrula', en: 'Verify the running container with docker ps/logs' }, order: 5 },
    ],
    xpReward: 10,
  },
]

const dockerInstallationInteractiveBlocks = [
  {
    type: 'code-playground',
      relatedTopicId: 'docker-install-verify-practice',
    id: 'docker-install-verify-practice',
    label: { tr: 'Pratik: Kurulum doğrulama komutlarını yaz', en: 'Practice: Write installation verification commands' },
    language: 'bash',
    task: {
      tr: 'Amaç: Docker Desktop gerçekten çalışıyor mu, sadece kurulu mu ayrımını yap. Java\'da javac -version ve java -version kontrolünü birlikte yapmak gibi düşün.',
      en: 'Goal: Distinguish Docker being installed from Docker actually running. Think of checking both javac -version and java -version in Java.',
    },
    explanation: {
      tr: 'Sıralama önemli: önce CLI sürümünü, sonra daemon bilgisini, en son hello-world container\'ını çalıştır.',
      en: 'Order matters: check the CLI version first, then daemon info, then run the hello-world container.',
    },
    code: {
      tr: `# CLI sürümünü kontrol et
docker --version

# Docker daemon çalışıyor mu kontrol et (daemon kapalıysa hata verir)
docker info

# Uçtan uca kurulum testi — image indir ve container çalıştır
docker run hello-world`,
      en: `# Check the CLI version
docker --version

# Check whether the Docker daemon is running (errors if daemon is stopped)
docker info

# End-to-end install test — download image and run container
docker run hello-world`,
    },
    starterCode: {
      tr: `# CLI sürümünü kontrol et
docker ___

# Daemon sağlık kontrolü
docker ___

# Test container'ı çalıştır
docker run ___`,
      en: `# Check the CLI version
docker ___

# Daemon health check
docker ___

# Run the test container
docker run ___`,
    },
    solutionCode: {
      tr: `docker --version
docker info
docker run hello-world`,
      en: `docker --version
docker info
docker run hello-world`,
    },
    expected: {
      tr: `Docker version 24.x.x
Server: Docker Desktop çalışıyor
Hello from Docker!`,
      en: `Docker version 24.x.x
Server: Docker Desktop is running
Hello from Docker!`,
    },
    hints: [
      { tr: 'Sürüm kontrolü için docker --version kullanılır.', en: 'Use docker --version for the version check.' },
      { tr: 'Daemon çalışmıyorsa docker info hata verir; bu yüzden iyi bir sağlık kontrolüdür.', en: 'docker info fails when the daemon is not running, so it is a useful health check.' },
      { tr: 'hello-world image\'ı kurulumun uçtan uca çalıştığını gösterir.', en: 'The hello-world image proves the full install path works end to end.' },
    ],
    xpReward: 15,
  },
  {
    type: 'step-animation',
    title: { tr: 'Docker Desktop İlk Çalıştırma Akışı', en: 'Docker Desktop First-Run Flow' },
    steps: [
      { id: 1, icon: '🧱', label: { tr: 'WSL 2 hazır olur', en: 'WSL 2 ready' }, detail: { tr: 'Windows tarafında Linux kernel sağlayan WSL 2 etkin olur; Docker Linux container\'larını burada çalıştırır.', en: 'On Windows, WSL 2 provides the Linux kernel Docker uses to run Linux containers.' } },
      { id: 2, icon: '🐳', label: { tr: 'Docker Desktop açılır', en: 'Docker Desktop starts' }, detail: { tr: 'GUI açılır ama asıl önemli olan arka plandaki Docker daemon\'ının hazır hale gelmesidir.', en: 'The GUI opens, but the important part is the Docker daemon becoming ready in the background.' } },
      { id: 3, icon: '⌨️', label: { tr: 'CLI konuşur', en: 'CLI talks' }, detail: { tr: 'docker komutu daemon\'a istek yollar; daemon kapalıysa "Cannot connect" hatası alınır.', en: 'The docker command sends requests to the daemon; if it is stopped you get a "Cannot connect" error.' } },
      { id: 4, icon: '📦', label: { tr: 'hello-world çekilir', en: 'hello-world pulled' }, detail: { tr: 'Docker küçük bir image indirir ve container olarak çalıştırır.', en: 'Docker downloads a tiny image and runs it as a container.' } },
      { id: 5, icon: '✅', label: { tr: 'Kurulum doğrulanır', en: 'Install verified' }, detail: { tr: '"Hello from Docker!" çıktısı CLI, daemon, network ve runtime yolunun tamamının çalıştığını gösterir.', en: '"Hello from Docker!" proves the CLI, daemon, network, and runtime path all work.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-docker-install-order-01',
    question: { tr: 'Docker Desktop kurulumunu güvenli şekilde doğrulama adımlarını sırala.', en: 'Arrange the safe Docker Desktop verification steps.' },
    items: [
      { id: '1', text: { tr: 'Docker Desktop\'ı aç ve daemon hazır olana kadar bekle', en: 'Open Docker Desktop and wait until the daemon is ready' }, order: 1 },
      { id: '2', text: { tr: 'docker --version ile CLI\'ın kurulu olduğunu doğrula', en: 'Confirm the CLI is installed with docker --version' }, order: 2 },
      { id: '3', text: { tr: 'docker info ile daemon bağlantısını kontrol et', en: 'Check daemon connectivity with docker info' }, order: 3 },
      { id: '4', text: { tr: 'docker run hello-world ile uçtan uca test yap', en: 'Run an end-to-end test with docker run hello-world' }, order: 4 },
      { id: '5', text: { tr: 'docker ps -a ile oluşan test container kaydını gör', en: 'Inspect the test container record with docker ps -a' }, order: 5 },
    ],
    xpReward: 10,
  },
]

const dockerCoreCommandInteractiveBlocks = [
  {
    type: 'code-playground',
      relatedTopicId: 'docker-core-run-command-practice',
    id: 'docker-core-run-command-practice',
    label: { tr: 'Pratik: Güvenli docker run komutu kur', en: 'Practice: Build a safe docker run command' },
    language: 'bash',
    task: {
      tr: 'Amaç: docker run flag sırasını kas hafızasına çevirmek. Komut flag\'leri image adından önce gelir; image\'dan sonrası container içindeki komut olarak yorumlanabilir.',
      en: 'Goal: Turn docker run flag order into muscle memory. Command flags belong before the image name; text after the image can be interpreted as the command inside the container.',
    },
    explanation: {
      tr: 'Referanstaki tam komutu incele, sonra editörde boşlukları doldur: -d, --name, -p ve -v flag\'lerini doğru sırayla yaz.',
      en: 'Study the complete command in the reference above, then fill the blanks in the editor: write -d, --name, -p, and -v flags in the right order.',
    },
    code: {
      tr: `# nginx'i arka planda çalıştır, ad ver, port ve rapor klasörü bağla
docker run -d --name qa-nginx -p 8080:80 -v $(pwd)/reports:/usr/share/nginx/html/reports nginx:latest`,
      en: `# Run nginx in the background, name it, map a port, and mount reports
docker run -d --name qa-nginx -p 8080:80 -v $(pwd)/reports:/usr/share/nginx/html/reports nginx:latest`,
    },
    starterCode: {
      tr: `docker run ___ --name qa-nginx ___ nginx:latest`,
      en: `docker run ___ --name qa-nginx ___ nginx:latest`,
    },
    solutionCode: {
      tr: `docker run -d --name qa-nginx -p 8080:80 -v $(pwd)/reports:/usr/share/nginx/html/reports nginx:latest`,
      en: `docker run -d --name qa-nginx -p 8080:80 -v $(pwd)/reports:/usr/share/nginx/html/reports nginx:latest`,
    },
    expected: {
      tr: `qa-nginx arka planda çalışır.
localhost:8080 container port 80'e gider.
reports klasörü container içine mount edilir.`,
      en: `qa-nginx runs in the background.
localhost:8080 reaches container port 80.
reports folder is mounted into the container.`,
    },
    hints: [
      { tr: '-d, --name, -p ve -v flag\'leri image adından önce yazılır.', en: '-d, --name, -p, and -v should be written before the image name.' },
      { tr: 'Port formatı host:container şeklindedir: -p 8080:80.', en: 'Port format is host:container: -p 8080:80.' },
      { tr: 'Volume formatı hostPath:containerPath şeklindedir.', en: 'Volume format is hostPath:containerPath.' },
    ],
    xpReward: 15,
  },
  {
    type: 'step-animation',
    title: { tr: 'Container Komut Yaşam Döngüsü', en: 'Container Command Lifecycle' },
    steps: [
      { id: 1, icon: '📥', label: { tr: 'pull', en: 'pull' }, detail: { tr: 'Image localde yoksa docker pull ile indirilir veya docker run bunu otomatik yapar.', en: 'If the image is missing locally, docker pull downloads it, or docker run does this automatically.' } },
      { id: 2, icon: '▶️', label: { tr: 'run', en: 'run' }, detail: { tr: 'docker run yeni bir container oluşturur ve process\'i başlatır.', en: 'docker run creates a new container and starts its process.' } },
      { id: 3, icon: '🔎', label: { tr: 'ps/logs', en: 'ps/logs' }, detail: { tr: 'docker ps durumunu, docker logs ise container içindeki çıktıyı gösterir.', en: 'docker ps shows status, while docker logs shows output from inside the container.' } },
      { id: 4, icon: '🛠️', label: { tr: 'exec/cp', en: 'exec/cp' }, detail: { tr: 'docker exec canlı container içinde komut çalıştırır; docker cp dosya alıp verir.', en: 'docker exec runs a command inside a live container; docker cp moves files in or out.' } },
      { id: 5, icon: '🧹', label: { tr: 'stop/rm', en: 'stop/rm' }, detail: { tr: 'docker stop süreci durdurur, docker rm container kaydını siler. Image ayrı kaldığı için tekrar kullanılabilir.', en: 'docker stop ends the process, docker rm removes the container record. The image remains separate and reusable.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-docker-core-lifecycle-order-01',
    question: { tr: 'Bir container\'ı debug edip temizleme akışını doğru sıraya diz.', en: 'Arrange the flow for debugging and cleaning up a container.' },
    items: [
      { id: '1', text: { tr: 'docker ps -a ile container gerçekten var mı bak', en: 'Use docker ps -a to check whether the container exists' }, order: 1 },
      { id: '2', text: { tr: 'docker logs ile uygulama çıktısını oku', en: 'Read application output with docker logs' }, order: 2 },
      { id: '3', text: { tr: 'Gerekirse docker exec ile container içine gir', en: 'Enter the container with docker exec if needed' }, order: 3 },
      { id: '4', text: { tr: 'İş bitince docker stop ile süreci durdur', en: 'Stop the process with docker stop when done' }, order: 4 },
      { id: '5', text: { tr: 'docker rm ile durdurulmuş container kaydını temizle', en: 'Remove the stopped container record with docker rm' }, order: 5 },
    ],
    xpReward: 10,
  },
]

const dockerComposeInteractiveBlocks = [
  {
    type: 'code-playground',
      relatedTopicId: 'docker-compose-cache-practice',
    id: 'docker-compose-cache-practice',
    label: { tr: 'Pratik: Cache dostu Dockerfile yaz', en: 'Practice: Write a cache-friendly Dockerfile' },
    language: 'dockerfile',
    task: {
      tr: 'Amaç: Docker layer cache mantığını doğru sıraya oturt. Java analojisi: Maven dependency çözümünü her küçük source değişikliğinde baştan yapmak istemezsin.',
      en: 'Goal: Put Docker layer cache in the right order. Java analogy: you do not want Maven dependency resolution to restart after every tiny source change.',
    },
    explanation: {
      tr: 'Önce dependency manifest dosyasını kopyala, install yap, sonra kaynak kodu kopyala.',
      en: 'Copy the dependency manifest first, install dependencies, then copy the source code.',
    },
    code: {
      tr: `FROM python:3.12-slim
WORKDIR /app

# Önce bağımlılık manifestini kopyala (az değişen katman)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sonra kaynak kodu kopyala (sık değişen katman)
COPY . .

CMD ["pytest", "tests/"]`,
      en: `FROM python:3.12-slim
WORKDIR /app

# Copy the dependency manifest first (rarely changing layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code last (frequently changing layer)
COPY . .

CMD ["pytest", "tests/"]`,
    },
    starterCode: {
      tr: `FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["pytest", "tests/"]`,
      en: `FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["pytest", "tests/"]`,
    },
    solutionCode: {
      tr: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["pytest", "tests/"]`,
      en: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["pytest", "tests/"]`,
    },
    expected: {
      tr: `requirements.txt değişmediyse pip install katmanı cache'den gelir.
Sadece test kodu değiştiğinde bağımlılıklar tekrar kurulmaz.`,
      en: `If requirements.txt did not change, the pip install layer comes from cache.
When only test code changes, dependencies are not reinstalled.`,
    },
    hints: [
      { tr: 'COPY . . en başta olursa her source değişikliği install katmanını bozar.', en: 'If COPY . . comes first, every source change invalidates the install layer.' },
      { tr: 'requirements.txt daha seyrek değiştiği için önce o kopyalanmalı.', en: 'requirements.txt changes less often, so copy it first.' },
      { tr: 'RUN pip install adımı manifest kopyasından hemen sonra gelmeli.', en: 'RUN pip install should come right after copying the manifest.' },
    ],
    xpReward: 15,
  },
  {
    type: 'step-animation',
    title: { tr: 'Compose ile Sağlıklı Test Ortamı Başlatma', en: 'Starting a Healthy Test Environment With Compose' },
    steps: [
      { id: 1, icon: '📄', label: { tr: 'YAML okunur', en: 'YAML read' }, detail: { tr: 'Compose services, networks, volumes ve environment ayarlarını okur.', en: 'Compose reads services, networks, volumes, and environment settings.' } },
      { id: 2, icon: '📦', label: { tr: 'Image hazırlanır', en: 'Images prepared' }, detail: { tr: 'Gerekli image\'lar pull edilir veya Dockerfile üzerinden build edilir.', en: 'Required images are pulled or built from Dockerfiles.' } },
      { id: 3, icon: '🌐', label: { tr: 'Network kurulur', en: 'Network created' }, detail: { tr: 'Aynı Compose projesindeki servisler birbirini servis adıyla bulabilir: app, db, tests.', en: 'Services in the same Compose project can find each other by service name: app, db, tests.' } },
      { id: 4, icon: '💓', label: { tr: 'Health beklenir', en: 'Health awaited' }, detail: { tr: 'depends_on + service_healthy, sadece container başladı demek yerine uygulamanın gerçekten hazır olmasını bekler.', en: 'depends_on + service_healthy waits for the app to be truly ready, not merely started.' } },
      { id: 5, icon: '🧪', label: { tr: 'Test çalışır', en: 'Tests run' }, detail: { tr: 'Test runner app/db servislerine container adıyla bağlanır ve raporları volume üzerinden host\'a yazar.', en: 'The test runner reaches app/db by service name and writes reports to the host through a volume.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-dockerfile-cache-order-01',
    question: { tr: 'Cache dostu Dockerfile layer sırasını doğru sıraya diz.', en: 'Arrange the cache-friendly Dockerfile layer order.' },
    items: [
      { id: '1', text: { tr: 'FROM ile base image seç', en: 'Choose the base image with FROM' }, order: 1 },
      { id: '2', text: { tr: 'WORKDIR ile çalışma klasörünü ayarla', en: 'Set the working directory with WORKDIR' }, order: 2 },
      { id: '3', text: { tr: 'requirements.txt/package.json gibi dependency manifest dosyasını kopyala', en: 'Copy the dependency manifest such as requirements.txt/package.json' }, order: 3 },
      { id: '4', text: { tr: 'Dependency install komutunu çalıştır', en: 'Run the dependency install command' }, order: 4 },
      { id: '5', text: { tr: 'En son sık değişen source/test dosyalarını kopyala', en: 'Copy frequently changing source/test files last' }, order: 5 },
    ],
    xpReward: 10,
  },
]

const dockerQaInteractiveBlocks = [
  {
    type: 'code-playground',
      relatedTopicId: 'docker-qa-playwright-volume-practice',
    id: 'docker-qa-playwright-volume-practice',
    label: { tr: 'Pratik: Playwright testlerini rapor kalıcı olacak şekilde çalıştır', en: 'Practice: Run Playwright tests with persistent reports' },
    language: 'bash',
    task: {
      tr: 'Amaç: Test container\'ı silinse bile raporların host makinede kalmasını sağlamak. QA için bu, CI job bittikten sonra kanıtların kaybolmaması demektir.',
      en: 'Goal: Keep reports on the host even after the test container is deleted. For QA, this means evidence survives after the CI job finishes.',
    },
    explanation: {
      tr: 'Proje klasörünü /app olarak mount et, çalışma dizinini /app yap, rapor klasörünü ayrıca host\'a bağla.',
      en: 'Mount the project folder as /app, set /app as the working directory, and mount the report folder back to the host.',
    },
    code: {
      tr: `# Playwright container'ını raporlar host'ta kalacak şekilde çalıştır
docker run --rm \\
  -v $(pwd):/app \\
  -v $(pwd)/playwright-report:/app/playwright-report \\
  -w /app \\
  mcr.microsoft.com/playwright:v1.42.0-jammy \\
  bash -c "npm ci && npx playwright test --reporter=html"`,
      en: `# Run the Playwright container while keeping reports on the host
docker run --rm \\
  -v $(pwd):/app \\
  -v $(pwd)/playwright-report:/app/playwright-report \\
  -w /app \\
  mcr.microsoft.com/playwright:v1.42.0-jammy \\
  bash -c "npm ci && npx playwright test --reporter=html"`,
    },
    starterCode: {
      tr: `docker run --rm \\
  ___ \\
  ___ \\
  -w /app \\
  mcr.microsoft.com/playwright:v1.42.0-jammy \\
  bash -c "npm ci && npx playwright test --reporter=html"`,
      en: `docker run --rm \\
  ___ \\
  ___ \\
  -w /app \\
  mcr.microsoft.com/playwright:v1.42.0-jammy \\
  bash -c "npm ci && npx playwright test --reporter=html"`,
    },
    solutionCode: {
      tr: `docker run --rm \\
  -v $(pwd):/app \\
  -v $(pwd)/playwright-report:/app/playwright-report \\
  -w /app \\
  mcr.microsoft.com/playwright:v1.42.0-jammy \\
  bash -c "npm ci && npx playwright test --reporter=html"`,
      en: `docker run --rm \\
  -v $(pwd):/app \\
  -v $(pwd)/playwright-report:/app/playwright-report \\
  -w /app \\
  mcr.microsoft.com/playwright:v1.42.0-jammy \\
  bash -c "npm ci && npx playwright test --reporter=html"`,
    },
    expected: {
      tr: `Testler container içinde çalışır.
playwright-report klasörü host makinede kalır.
CI artifact olarak yayınlanabilir.`,
      en: `Tests run inside the container.
playwright-report remains on the host machine.
It can be published as a CI artifact.`,
    },
    hints: [
      { tr: 'Proje klasörü için -v $(pwd):/app gerekir.', en: 'Use -v $(pwd):/app for the project folder.' },
      { tr: 'Çalışma dizini için -w /app yaz.', en: 'Set the working directory with -w /app.' },
      { tr: 'Raporların kalması için playwright-report klasörünü ayrıca mount et.', en: 'Mount playwright-report separately so reports persist.' },
    ],
    xpReward: 15,
  },
  {
    type: 'step-animation',
    title: { tr: 'Container Tabanlı QA Koşumu', en: 'Container-Based QA Run' },
    steps: [
      { id: 1, icon: '🏗️', label: { tr: 'Test image hazırla', en: 'Prepare test image' }, detail: { tr: 'Tarayıcılar, test framework ve bağımlılıklar image içinde sabitlenir.', en: 'Browsers, test framework, and dependencies are pinned inside the image.' } },
      { id: 2, icon: '🧱', label: { tr: 'Servisleri başlat', en: 'Start services' }, detail: { tr: 'App, DB ve Selenium/Grid gibi bağımlılıklar aynı network üzerinde ayağa kalkar.', en: 'App, DB, and Selenium/Grid dependencies start on the same network.' } },
      { id: 3, icon: '💓', label: { tr: 'Hazırlığı bekle', en: 'Wait for readiness' }, detail: { tr: 'Healthcheck veya retry olmadan testler erken başlar ve connection refused hatası üretir.', en: 'Without healthchecks or retry, tests start too early and produce connection refused errors.' } },
      { id: 4, icon: '🧪', label: { tr: 'Testleri çalıştır', en: 'Run tests' }, detail: { tr: 'Test runner container içinden app servisine container adıyla erişir; localhost tuzağına düşmez.', en: 'The test runner reaches the app service by container name from inside the network, avoiding the localhost trap.' } },
      { id: 5, icon: '📄', label: { tr: 'Raporu sakla', en: 'Persist reports' }, detail: { tr: 'JUnit/HTML raporları volume ile host\'a yazılır; container silinse de kanıt kalır.', en: 'JUnit/HTML reports are written to the host via a volume; evidence remains after the container is removed.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-docker-qa-grid-order-01',
    question: { tr: 'Docker üzerinde güvenilir Selenium/Grid test koşumu sırasını diz.', en: 'Arrange a reliable Selenium/Grid test run on Docker.' },
    items: [
      { id: '1', text: { tr: 'Hub veya router servisini başlat', en: 'Start the Hub or router service' }, order: 1 },
      { id: '2', text: { tr: 'Chrome/Firefox node container\'larını aynı network\'e bağla', en: 'Attach Chrome/Firefox node containers to the same network' }, order: 2 },
      { id: '3', text: { tr: 'Node\'ların Hub\'a kayıt olduğunu doğrula', en: 'Confirm nodes registered with the Hub' }, order: 3 },
      { id: '4', text: { tr: 'Test runner\'ı SELENIUM_HUB environment variable ile çalıştır', en: 'Run the test runner with the SELENIUM_HUB environment variable' }, order: 4 },
      { id: '5', text: { tr: 'Rapor ve screenshot klasörlerini volume ile host\'a al', en: 'Persist reports and screenshots to the host with volumes' }, order: 5 },
    ],
    xpReward: 10,
  },
]

const dockerEcosystemInteractiveBlocks = [
  {
    type: 'code-playground',
      relatedTopicId: 'docker-ecosystem-ci-artifact-practice',
    id: 'docker-ecosystem-ci-artifact-practice',
    label: { tr: 'Pratik: CI için izlenebilir Docker artifact üret', en: 'Practice: Produce a traceable Docker artifact for CI' },
    language: 'bash',
    task: {
      tr: 'Amaç: Her commit için aynı image tag\'ini build, test ve push adımlarında kullan. Java analojisi: Maven artifact versiyonunu build/test/deploy boyunca değiştirmemek gibi.',
      en: 'Goal: Use the same image tag across build, test, and push for each commit. Java analogy: keep the Maven artifact version stable through build/test/deploy.',
    },
    explanation: {
      tr: 'Referanstaki üç satırda da ___ yerine aynı $COMMIT_SHA değişkenini yaz; build edilen artifact ile test edilen artifact aynı olmalı.',
      en: 'Replace ___ on all three lines with the same $COMMIT_SHA variable; the artifact you build and the artifact you test must be identical.',
    },
    code: {
      tr: `# Aynı commit tag'i build, test ve push boyunca kullan
docker build -t registry.example.com/qa-app:$COMMIT_SHA .
docker run --rm registry.example.com/qa-app:$COMMIT_SHA pytest
docker push registry.example.com/qa-app:$COMMIT_SHA`,
      en: `# Use the same commit tag through build, test, and push
docker build -t registry.example.com/qa-app:$COMMIT_SHA .
docker run --rm registry.example.com/qa-app:$COMMIT_SHA pytest
docker push registry.example.com/qa-app:$COMMIT_SHA`,
    },
    starterCode: {
      tr: `docker build -t registry.example.com/qa-app:___ .
docker run --rm registry.example.com/qa-app:___ pytest
docker push registry.example.com/qa-app:___`,
      en: `docker build -t registry.example.com/qa-app:___ .
docker run --rm registry.example.com/qa-app:___ pytest
docker push registry.example.com/qa-app:___`,
    },
    solutionCode: {
      tr: `docker build -t registry.example.com/qa-app:$COMMIT_SHA .
docker run --rm registry.example.com/qa-app:$COMMIT_SHA pytest
docker push registry.example.com/qa-app:$COMMIT_SHA`,
      en: `docker build -t registry.example.com/qa-app:$COMMIT_SHA .
docker run --rm registry.example.com/qa-app:$COMMIT_SHA pytest
docker push registry.example.com/qa-app:$COMMIT_SHA`,
    },
    expected: {
      tr: `Build edilen image, test edilen image ve registry'ye push edilen image aynı commit SHA tag'ini taşır.
Kubernetes veya Jenkins hangi artifact'in deploy edildiğini izleyebilir.`,
      en: `The built image, tested image, and pushed image all carry the same commit SHA tag.
Kubernetes or Jenkins can trace exactly which artifact was deployed.`,
    },
    hints: [
      { tr: 'latest tag\'i izlenebilir değildir; commit SHA tercih edilir.', en: 'latest is not traceable; prefer the commit SHA.' },
      { tr: 'Build ve test farklı tag kullanırsa test ettiğin artifact deploy edilen artifact olmayabilir.', en: 'If build and test use different tags, the tested artifact may not be the deployed artifact.' },
      { tr: '$COMMIT_SHA değişkenini üç satırda da aynı kullan.', en: 'Use $COMMIT_SHA the same way on all three lines.' },
    ],
    xpReward: 15,
  },
  {
    type: 'step-animation',
    title: { tr: 'Docker Artifact Pipeline Akışı', en: 'Docker Artifact Pipeline Flow' },
    steps: [
      { id: 1, icon: '🔁', label: { tr: 'Commit gelir', en: 'Commit arrives' }, detail: { tr: 'Jenkins/GitHub Actions yeni commit için pipeline tetikler.', en: 'Jenkins/GitHub Actions triggers the pipeline for a new commit.' } },
      { id: 2, icon: '🏗️', label: { tr: 'Image build edilir', en: 'Image built' }, detail: { tr: 'Dockerfile aynı kaynak koddan immutable image üretir.', en: 'The Dockerfile produces an immutable image from the exact source code.' } },
      { id: 3, icon: '🧪', label: { tr: 'Aynı image test edilir', en: 'Same image tested' }, detail: { tr: 'Testler build edilen image\'a karşı koşar; böylece deploy edilecek artifact doğrulanır.', en: 'Tests run against the built image, so the artifact that will be deployed is verified.' } },
      { id: 4, icon: '📦', label: { tr: 'Registry\'ye push edilir', en: 'Pushed to registry' }, detail: { tr: 'Başarılı image commit SHA tag\'iyle Docker Hub/ECR/GCR gibi registry\'ye gönderilir.', en: 'The passing image is pushed to Docker Hub/ECR/GCR with a commit SHA tag.' } },
      { id: 5, icon: '☸️', label: { tr: 'Orkestratör çeker', en: 'Orchestrator pulls' }, detail: { tr: 'Kubernetes veya başka runtime aynı tag\'li image\'ı çekip ortamda çalıştırır.', en: 'Kubernetes or another runtime pulls the same tagged image and runs it in the environment.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-docker-ecosystem-pipeline-order-01',
    question: { tr: 'Docker\'ın CI/CD ekosistemindeki artifact akışını doğru sıraya diz.', en: 'Arrange Docker\'s artifact flow inside the CI/CD ecosystem.' },
    items: [
      { id: '1', text: { tr: 'CI yeni commit için pipeline tetikler', en: 'CI triggers a pipeline for a new commit' }, order: 1 },
      { id: '2', text: { tr: 'Docker image commit SHA ile build edilir', en: 'Docker image is built with the commit SHA' }, order: 2 },
      { id: '3', text: { tr: 'Testler aynı image tag\'i üzerinde çalışır', en: 'Tests run against the same image tag' }, order: 3 },
      { id: '4', text: { tr: 'Başarılı image registry\'ye push edilir', en: 'The passing image is pushed to the registry' }, order: 4 },
      { id: '5', text: { tr: 'Kubernetes/Jenkins deploy adımı registry\'den o tag\'i çeker', en: 'Kubernetes/Jenkins deploy pulls that tag from the registry' }, order: 5 },
    ],
    xpReward: 10,
  },
]

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
    tabs: ['🎯 Introduction', '⚙️ Installation', '📦 Core Commands', '🗂️ Dockerfile & Compose', '🧪 QA Use Cases', '🔗 Ecosystem', '💼 Interview Q&A'],
    sections: [
      // ── SECTION 0: INTRODUCTION ────────────────────────────────────────────
      {
        title: '🎯 What is Docker?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📦',
            content: 'Docker is like a shipping container for software: a physical container can carry furniture, electronics, or food, and any ship, truck, or crane knows how to load it — Docker containers carry your code AND every dependency it needs, so they run identically everywhere. So why not just zip the source code and ship that? Because a Java JAR already bundles your compiled classes, but NOT the OS packages, native libraries, or environment variables your app silently depends on — Docker packages those too. That\'s exactly the gap behind the classic "works on my machine" incident, where a CI agent\'s missing system library turns a green local test suite into a red pipeline.',
          },
          {
            type: 'css-animation',
            kind: 'docker-build',
            label: { tr: 'Docker Build & Run Akışı', en: 'Docker Build & Run Flow' },
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
          ...dockerIntroInteractiveBlocks,
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
          
        retryQuestion: {
      "type": "quiz",
      "question": "How is a Docker Image related to a Docker Container?",
      "options": [
            {
                  "id": "a",
                  "text": "A container is the source code for building an image."
            },
            {
                  "id": "b",
                  "text": "An image is a static snapshot, while a container is an executable process derived from that image."
            },
            {
                  "id": "c",
                  "text": "Images are used for production, while containers are only for development environments."
            },
            {
                  "id": "d",
                  "text": "An image must be deleted before you can create a container from it."
            }
      ],
      "correct": "b",
      "explanation": "Think of the image as a recipe or a template that contains everything needed to run an application. The container is the 'dish' being cooked—the actual living process that uses that blueprint to operate in a specific runtime environment."
    }
  },
  {
    type: 'simulation',
    icon: '🐳',
    color: '#1D63ED',
    title: { tr: 'Docker Konteyner Yaşam Döngüsü', en: 'Docker Container Lifecycle' },
    scenario: 'docker-lifecycle',
    description: {
      tr: '"▶ Run Demo" butonuna basarak bir Docker konteynerinin çekilmesi (pull), çalıştırılması (run), içinde komut koşturulması (exec) ve durdurulması (stop) süreçlerini canlı izle.',
      en: 'Press "▶ Run Demo" to watch a container being pulled, run, executing commands internally, and stopped in real-time.'
    },
    code: `# Pull the image from registry
docker pull nginx:latest

# Run the container in detached mode
docker run -d -p 8080:80 --name my-nginx nginx

# Execute command inside container
docker exec -it my-nginx ls /usr/share/nginx/html

# Stop the container
docker stop my-nginx`,
    language: 'bash'
  }
],
},

      // ── SECTION 1: INSTALLATION ────────────────────────────────────────────
      {
        title: '⚙️ Docker Installation',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Docker Desktop on Windows/Mac is like an automatic-transmission rental car: it bundles the engine, CLI, Compose, and a GUI so you can drive immediately. Installing the Docker Engine directly on Linux is the manual-transmission version — lighter, faster, no extra layer. So why does Linux skip the GUI wrapper that Windows/Mac need? Because Linux containers run natively on a Linux kernel, while Windows/Mac need a lightweight VM underneath that Docker Desktop quietly manages for you — similar to how a JVM runs natively on Linux servers but needs extra runtime scaffolding in some embedded Windows/Mac setups. The QA risk: your CI pipeline almost always runs the lean Linux Engine, so a container that behaves fine on your Mac\'s Docker Desktop can still surprise you in the real CI environment — always verify on the actual pipeline, not just locally.',
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
          ...dockerInstallationInteractiveBlocks,
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
          
        retryQuestion: {
      "type": "quiz",
      "question": "Which technology does Docker Desktop on Windows utilize to execute Linux-based containers with high efficiency?",
      "options": [
            {
                  "id": "a",
                  "text": "Oracle VM VirtualBox"
            },
            {
                  "id": "b",
                  "text": "Windows Docker Native Engine"
            },
            {
                  "id": "c",
                  "text": "WSL 2 (Windows Subsystem for Linux)"
            },
            {
                  "id": "d",
                  "text": "QEMU emulation"
            }
      ],
      "correct": "c",
      "explanation": "WSL 2 allows Docker Desktop to integrate seamlessly with the Windows OS. By using a genuine Linux kernel via WSL 2, Docker can provide better resource management and faster startup times compared to legacy virtual machine approaches."
    }
  },
  {
    type: 'visual',
    variant: 'boxes',
    title: { tr: 'Windows Üzerinde Docker Desktop Mimarisi', en: 'Docker Desktop Architecture on Windows' },
    items: [
      { icon: '💻', label: { tr: 'Windows Host OS', en: 'Windows Host OS' }, desc: { tr: 'Ana işletim sistemi ve GUI arayüzü', en: 'Main operating system and GUI interface' } },
      { arrow: true },
      { icon: '🐧', label: { tr: 'WSL 2 Linux Çekirdeği', en: 'WSL 2 Linux Kernel' }, desc: { tr: 'Windows içindeki hafif sanal Linux', en: 'Lightweight virtual Linux inside Windows' }, highlight: true },
      { arrow: true },
      { icon: '🐳', label: { tr: 'Docker Daemon', en: 'Docker Daemon' }, desc: { tr: 'Konteynerleri yöneten arka plan servisi', en: 'Background service managing containers' } },
      { arrow: true },
      { icon: '📦', label: { tr: 'Konteynerler', en: 'Containers' }, desc: { tr: 'İzole çalışan uygulamalar', en: 'Isolated running applications' } }
    ],
    note: { tr: 'Docker Desktop, WSL 2 sayesinde Windows üzerinde yerel Linux performansına yakın çalışır.', en: 'Docker Desktop achieves near-native Linux performance on Windows using WSL 2.' }
  }
],
},

      // ── SECTION 2: CORE COMMANDS ───────────────────────────────────────────
      {
        title: '📦 Core Docker Commands',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⌨️',
            content: "Docker commands follow a strict 'docker [object] [action]' pattern — like a library system where you search for books (images), borrow them (pull), read them (run), and return them when done (stop/rm). So why not give every command its own unique name instead of memorizing flags? Because a consistent object+verb structure scales to dozens of resource types (image, container, volume, network) without forcing a new mental model each time — the same way Java's Collections framework or Stream API (filter/map/collect) lets you reuse one pattern across every collection type. In a CI script, this consistency means you can write one generic cleanup function that calls 'docker [object] prune' across images, containers, and volumes alike, instead of bespoke logic per resource.",
          },
          { type: 'heading', text: 'Image Commands' },
          {
            type: 'code',
            language: 'bash',
            label: 'Pulling and searching images',
            code: `# Pull an image from Docker Hub
docker pull python:3.12-slim       # Download Python 3.12 slim image
docker pull nginx:latest           # Download latest Nginx
docker pull postgres:16            # Download PostgreSQL 16

# Search images on Docker Hub
docker search selenium`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Yukarıdaki "📦 Temel Komutlar" sekmesinin altındaki Docker Sandbox\'ta dene: docker pull nginx yaz ve IMAGES rafının canlı güncellendiğini gör.',
              en: 'Try it in the Docker Sandbox further down this "Core Commands" tab: type docker pull nginx and watch the IMAGES shelf update live.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Listing, inspecting and removing images',
            code: `# List downloaded images
docker images
docker image ls                    # Same thing

# Inspect image details
docker inspect python:3.12-slim

# Remove an image (must stop all containers using it first)
docker rmi python:3.12-slim        # Remove by name:tag
docker image rm abc123def456       # Remove by image ID

# Remove all unused images (cleanup)
docker image prune -a`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-image-lifecycle-order-01',
            question: { tr: 'Bir image ile ilk defa çalışırken doğru komut sırasını diz.', en: 'Arrange the correct command order for working with an image for the first time.' },
            items: [
              { id: '1', text: { tr: 'Docker Hub\'da image ara (docker search)', en: 'Search Docker Hub for the image (docker search)' }, order: 1 },
              { id: '2', text: { tr: 'Image\'ı indir (docker pull)', en: 'Download the image (docker pull)' }, order: 2 },
              { id: '3', text: { tr: 'İndirilen image\'ları listele (docker images)', en: 'List downloaded images (docker images)' }, order: 3 },
              { id: '4', text: { tr: 'Detaylarını incele (docker inspect)', en: 'Inspect its details (docker inspect)' }, order: 4 },
              { id: '5', text: { tr: 'Artık kullanmıyorsan sil (docker rmi)', en: 'Remove it once no longer needed (docker rmi)' }, order: 5 },
            ],
            xpReward: 10,
          },
          { type: 'heading', text: 'Container Commands' },
          {
            type: 'code',
            language: 'bash',
            label: 'Starting a container — the basics',
            code: `# Run a container (creates AND starts)
docker run nginx                   # Run nginx (foreground — blocks terminal)
docker run -d nginx                # -d = detached (background)
docker run -d --name my-nginx nginx    # --name = custom name
docker run -d -p 8080:80 nginx     # -p host:container port mapping`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Bu tam olarak aşağıdaki sandbox\'ın 2. görevi: docker run -d -p 8080:80 --name web nginx yaz ve CONTAINERS panelinde yeşil nabız atan kutuyu izle.',
              en: 'This is exactly mission 2 in the sandbox below: type docker run -d -p 8080:80 --name web nginx and watch the green pulsing box appear in the CONTAINERS panel.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Production-style run — all common flags together',
            code: `docker run -d \\
  --name my-container \\           # Name the container
  -p 8080:80 \\                    # Map host port 8080 → container port 80
  -e APP_ENV=staging \\            # Set environment variable
  -v /host/path:/container/path \\ # Mount volume
  --restart unless-stopped \\     # Auto-restart policy
  python:3.12-slim \\              # Image to use
  python app.py                    # Command to run`,
          },
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-run-flags-practice',
            id: 'docker-core-run-flags-practice',
            label: { tr: 'Pratik: Production tarzı run flag\'lerini tamamla', en: 'Practice: Complete a production-style run command' },
            language: 'bash',
            task: {
              tr: 'Amaç: staging ortamında, 9090 host portunu 80 container portuna bağlayan ve container çökerse otomatik yeniden başlayan bir python:3.12-slim container\'ı çalıştır.',
              en: 'Goal: run a python:3.12-slim container in the staging environment, mapping host port 9090 to container port 80, that restarts automatically if it crashes.',
            },
            explanation: {
              tr: 'Ortam değişkeni için -e, port eşlemesi için -p, otomatik yeniden başlatma için --restart flag\'lerini doğru sırayla doldur.',
              en: 'Fill in -e for the environment variable, -p for the port mapping, and --restart for the auto-restart policy, in the right places.',
            },
            code: {
              tr: `docker run -d \\
  --name staging-app \\
  -p 9090:80 \\
  -e APP_ENV=staging \\
  --restart unless-stopped \\
  python:3.12-slim`,
              en: `docker run -d \\
  --name staging-app \\
  -p 9090:80 \\
  -e APP_ENV=staging \\
  --restart unless-stopped \\
  python:3.12-slim`,
            },
            starterCode: {
              tr: `docker run -d \\
  --name staging-app \\
  ___ 9090:80 \\
  ___ APP_ENV=staging \\
  ___ unless-stopped \\
  python:3.12-slim`,
              en: `docker run -d \\
  --name staging-app \\
  ___ 9090:80 \\
  ___ APP_ENV=staging \\
  ___ unless-stopped \\
  python:3.12-slim`,
            },
            solutionCode: {
              tr: `docker run -d \\
  --name staging-app \\
  -p 9090:80 \\
  -e APP_ENV=staging \\
  --restart unless-stopped \\
  python:3.12-slim`,
              en: `docker run -d \\
  --name staging-app \\
  -p 9090:80 \\
  -e APP_ENV=staging \\
  --restart unless-stopped \\
  python:3.12-slim`,
            },
            expected: {
              tr: `staging-app container'ı 9090:80 port eşlemesiyle çalışıyor.
APP_ENV=staging olarak ayarlandı.
Çökerse otomatik yeniden başlayacak.`,
              en: `staging-app container is running with port mapping 9090:80.
APP_ENV is set to staging.
It will restart automatically if it crashes.`,
            },
            hints: [
              { tr: 'Port eşlemesi her zaman -p HOST:CONTAINER şeklindedir.', en: 'Port mapping always follows -p HOST:CONTAINER.' },
              { tr: 'Ortam değişkeni tanımlamak için -e ANAHTAR=DEĞER kullanılır.', en: 'Use -e KEY=VALUE to define an environment variable.' },
              { tr: 'Otomatik yeniden başlatma politikası --restart flag\'i ile verilir, örn: --restart unless-stopped.', en: 'The auto-restart policy is given with the --restart flag, e.g. --restart unless-stopped.' },
            ],
            xpReward: 15,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Listing containers',
            code: `# List containers
docker ps                          # Running containers only
docker ps -a                       # ALL containers (including stopped)`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Sandbox\'ta docker ps yaz — 3. görev bu şekilde tamamlanır ve çalışan container\'ların tablosunu terminalde canlı görürsün.',
              en: 'Type docker ps in the sandbox — this completes mission 3 and shows you a live table of running containers right in the terminal.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Lifecycle — stop, start, restart',
            code: `# Stop/Start/Restart
docker stop my-container           # Graceful stop (SIGTERM, then SIGKILL)
docker start my-container          # Start a stopped container
docker restart my-container        # Stop then start`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Sandbox\'ta docker stop web dene — 5. görevin ilk adımı budur. Container yeşilden griye döner ama silinmez, tıpkı yukarıdaki komutta olduğu gibi.',
              en: 'Try docker stop web in the sandbox — this is the first half of mission 5. The container turns from green to grey but is not removed, exactly like the command above.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Removing containers',
            code: `# Remove containers
docker rm my-container             # Remove stopped container
docker rm -f my-container          # Force remove (even if running)
docker container prune             # Remove ALL stopped containers`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Sandbox\'ta ÇALIŞAN bir container\'ı -f\'siz docker rm ile silmeyi dene — gerçek Docker daemon\'ının verdiği "container is running" hatasını birebir göreceksin, sonra docker rm -f ile zorla sil ve 5. görevi tamamla.',
              en: 'Try running docker rm without -f on a RUNNING container in the sandbox — you will see the exact "container is running" error the real Docker daemon returns, then force it with docker rm -f to complete mission 5.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Reading logs',
            code: `# Logs
docker logs my-container           # Print all logs
docker logs -f my-container        # Follow logs in real-time (like tail -f)
docker logs --tail 50 my-container # Last 50 lines`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Sandbox\'ta docker logs web yaz — 4. görev bu satırla tamamlanır ve nginx\'in gerçekçi başlangıç log satırlarını görürsün.',
              en: 'Type docker logs web in the sandbox — this completes mission 4 and shows nginx\'s realistic startup log lines.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Executing commands inside a container and copying files',
            code: `# Execute command inside running container
docker exec -it my-container bash  # Open interactive bash shell
docker exec my-container ls /app   # Run command without interactive shell

# Copy files between host and container
docker cp my-container:/app/reports ./reports  # Container → host
docker cp ./tests my-container:/app/tests       # Host → container`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-debug-flow-order-01',
            question: { tr: 'Çalışan bir container içindeki test raporlarını incelemek için doğru akışı diz.', en: 'Arrange the correct flow for inspecting test reports inside a running container.' },
            items: [
              { id: '1', text: { tr: 'docker ps ile container\'ın çalıştığını doğrula', en: 'Verify the container is running with docker ps' }, order: 1 },
              { id: '2', text: { tr: 'docker exec -it ile container içine gir', en: 'Enter the container with docker exec -it' }, order: 2 },
              { id: '3', text: { tr: 'ls /app/reports ile dosyaları listele', en: 'List the files with ls /app/reports' }, order: 3 },
              { id: '4', text: { tr: 'docker cp ile raporu host makineye kopyala', en: 'Copy the report to the host machine with docker cp' }, order: 4 },
              { id: '5', text: { tr: 'Host\'taki raporu tarayıcıda aç', en: 'Open the report on the host in a browser' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'docker-sandbox',
            missions: [
              { id: 'pull-hello', text: { tr: "hello-world image'ını pull et", en: 'Pull the hello-world image' } },
              { id: 'run-web', text: { tr: "nginx'i arka planda (-d), 8080:80 port eşlemesiyle ve 'web' adıyla çalıştır", en: "Run nginx detached (-d) with port mapping 8080:80, named 'web'" } },
              { id: 'ps-list', text: { tr: "Çalışan container'ları listele (docker ps)", en: 'List running containers (docker ps)' } },
              { id: 'logs-web', text: { tr: "'web' container'ının loglarına bak", en: "Check the logs of the 'web' container" } },
              { id: 'clean-web', text: { tr: "'web'i durdur ve sil (stop + rm)", en: "Stop and remove 'web' (stop + rm)" } },
            ],
          },
          {
            type: 'simulation',
            icon: '🐳',
            color: '#0369a1',
            title: { tr: 'Dockerfile Derleme & Port Eşleme — Canlı Demo', en: 'Dockerfile Build & Port Mapping — Live Demo' },
            scenario: 'docker-build-port-mapping',
            description: {
              tr: '"▶ Resim Derle & Çalıştır" butonuna bas: Dockerfile\'ın satır satır çalışmasını, katmanların üst üste binmesini ve port eşlemesini parıldayan kablo akışıyla izle.',
              en: 'Press "▶ Build & Run Image": Watch the Dockerfile execute line-by-line, layers stacking on top of each other, and port mapping connected via a glowing pulsing cable.'
            },
            code: `# 1. Build the image from Dockerfile
docker build -t my-app .

# 2. Run the container with port mapping
docker run -d -p 8080:80 --name my-running-app my-app

# 3. Scale and persist data with volumes
docker run -d -p 8081:80 -v db_data:/app/data --name my-persistent-app my-app`,
            language: 'bash'
          },
          { type: 'heading', text: 'Volume Commands (Persistent Storage)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Named volumes — create, list, inspect, remove',
            code: `# Named volumes — managed by Docker
docker volume create test-data         # Create a named volume
docker volume ls                        # List all volumes
docker volume inspect test-data         # Show volume details
docker volume rm test-data             # Remove volume
docker volume prune                    # Remove all unused volumes`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-volume-lifecycle-order-01',
            question: { tr: 'Kalıcı bir test veritabanı volume\'ünün yaşam döngüsünü doğru sıraya diz.', en: 'Arrange the lifecycle of a persistent test-database volume in the correct order.' },
            items: [
              { id: '1', text: { tr: 'Adlandırılmış volume\'ü oluştur (docker volume create)', en: 'Create the named volume (docker volume create)' }, order: 1 },
              { id: '2', text: { tr: 'Container\'ı bu volume\'ü mount ederek çalıştır (-v)', en: 'Run the container mounting that volume (-v)' }, order: 2 },
              { id: '3', text: { tr: 'Container durdurulup silinse bile veri volume\'de kalır', en: 'Data survives in the volume even if the container is stopped and removed' }, order: 3 },
              { id: '4', text: { tr: 'İçeriğini doğrulamak için docker volume inspect kullan', en: 'Use docker volume inspect to verify its contents' }, order: 4 },
              { id: '5', text: { tr: 'Artık ihtiyaç yoksa docker volume rm ile temizle', en: 'Clean it up with docker volume rm once no longer needed' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Mounting a named volume at run time',
            code: `# Mount a volume when running
docker run -d \\
  -v test-data:/app/data \\  # Named volume: test-data → /app/data in container
  python:3.12-slim`,
          },
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-volume-mount-practice',
            id: 'docker-core-volume-mount-practice',
            label: { tr: 'Pratik: Adlandırılmış volume\'ü doğru mount et', en: 'Practice: Mount a named volume correctly' },
            language: 'bash',
            task: {
              tr: 'Amaç: qa-db-data adında bir volume\'ü postgres:16 container\'ının /var/lib/postgresql/data dizinine bağlayarak çalıştır — veritabanı verisi container silinse bile hayatta kalsın.',
              en: 'Goal: run postgres:16 mounting a volume named qa-db-data at /var/lib/postgresql/data — so database data survives even if the container is removed.',
            },
            explanation: {
              tr: '-v flag\'inin sözdizimi her zaman KAYNAK:HEDEF şeklindedir; kaynak burada volume adıdır, hedef container içindeki dizindir.',
              en: 'The -v flag syntax is always SOURCE:TARGET; here the source is the volume name and the target is the directory inside the container.',
            },
            code: {
              tr: `docker run -d \\
  --name qa-db \\
  -v qa-db-data:/var/lib/postgresql/data \\
  postgres:16`,
              en: `docker run -d \\
  --name qa-db \\
  -v qa-db-data:/var/lib/postgresql/data \\
  postgres:16`,
            },
            starterCode: {
              tr: `docker run -d \\
  --name qa-db \\
  -v ___:___ \\
  postgres:16`,
              en: `docker run -d \\
  --name qa-db \\
  -v ___:___ \\
  postgres:16`,
            },
            solutionCode: {
              tr: `docker run -d \\
  --name qa-db \\
  -v qa-db-data:/var/lib/postgresql/data \\
  postgres:16`,
              en: `docker run -d \\
  --name qa-db \\
  -v qa-db-data:/var/lib/postgresql/data \\
  postgres:16`,
            },
            expected: {
              tr: `qa-db container'ı çalışıyor.
Volume: qa-db-data → /var/lib/postgresql/data bağlandı.`,
              en: `qa-db container is running.
Volume: qa-db-data → /var/lib/postgresql/data mounted.`,
            },
            hints: [
              { tr: '-v flag\'inin sol tarafı volume adı, sağ tarafı container içindeki dizin yoludur.', en: 'The left side of -v is the volume name, the right side is the path inside the container.' },
              { tr: 'PostgreSQL veritabanı dosyalarını her zaman /var/lib/postgresql/data dizininde tutar.', en: 'PostgreSQL always keeps its database files under /var/lib/postgresql/data.' },
              { tr: 'İki nokta üst üste (:) volume adını hedef yoldan ayırır, boşluk değil.', en: 'A colon (:) separates the volume name from the target path — not a space.' },
            ],
            xpReward: 15,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Bind mounts and a real QA use case',
            code: `# Bind mount — mount a host directory
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-bind-mount-practice',
            id: 'docker-core-bind-mount-practice',
            label: { tr: 'Pratik: Test sonuçlarını host makinede kalıcı tut', en: 'Practice: Persist test results on the host machine' },
            language: 'bash',
            task: {
              tr: 'Amaç: my-test-image\'i --rm ile bir kerelik çalıştır ama JUnit raporunun host\'taki ./allure-results klasöründe kalıcı olmasını sağla.',
              en: 'Goal: run my-test-image once with --rm, but make sure the JUnit report persists in the ./allure-results folder on the host.',
            },
            explanation: {
              tr: 'Bind mount ile host\'taki bir klasörü ($(pwd)/allure-results) container içindeki /app/results ile eşleştir, sonra pytest çıktısını o dizine yönlendir.',
              en: 'Bind-mount a host folder ($(pwd)/allure-results) to /app/results inside the container, then point the pytest output at that directory.',
            },
            code: {
              tr: `docker run --rm \\
  -v $(pwd)/allure-results:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
              en: `docker run --rm \\
  -v $(pwd)/allure-results:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
            },
            starterCode: {
              tr: `docker run --rm \\
  -v $(pwd)/___:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
              en: `docker run --rm \\
  -v $(pwd)/___:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
            },
            solutionCode: {
              tr: `docker run --rm \\
  -v $(pwd)/allure-results:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
              en: `docker run --rm \\
  -v $(pwd)/allure-results:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
            },
            expected: {
              tr: `Test koşumu bitince container --rm ile otomatik silindi.
junit.xml host'ta ./allure-results klasöründe hâlâ duruyor.`,
              en: `The container was auto-removed by --rm after the test run.
junit.xml still exists on the host in ./allure-results.`,
            },
            hints: [
              { tr: '$(pwd) her zaman şu anki host dizinini verir — klasör adını onun yanına ekle.', en: '$(pwd) always resolves to the current host directory — append the folder name to it.' },
              { tr: 'İstenen host klasörü "allure-results" olarak belirtiliyor, boşluğa onu yaz.', en: 'The requested host folder is "allure-results" — write it in the blank.' },
              { tr: '--rm container\'ı siler ama bind mount edilen host klasörü SİLİNMEZ, veri orada kalır.', en: '--rm removes the container, but the bind-mounted host folder is NOT deleted — the data stays there.' },
            ],
            xpReward: 15,
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
          ...dockerCoreCommandInteractiveBlocks,
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
          
        retryQuestion: {
      "type": "quiz",
      "question": "Which flag is utilized with 'docker run' to ensure the container launches in the background?",
      "options": [
            {
                  "id": "a",
                  "text": "--run-hidden"
            },
            {
                  "id": "b",
                  "text": "-d"
            },
            {
                  "id": "c",
                  "text": "--background"
            },
            {
                  "id": "d",
                  "text": "-b"
            }
      ],
      "correct": "b",
      "explanation": "The '-d' flag stands for detached mode. It tells Docker to run the container in the background so that your current command-line interface is not occupied by the container's output. The other options are incorrect syntax."
}

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
            content: "A Dockerfile is a recipe for building your own image — each instruction is a step that gets baked into a layer. Docker Compose is the conductor who starts multiple musicians at once: instead of typing 5 separate 'docker run' commands by hand, one 'docker compose up' brings your app, database, and test runner online together, in the right order. So why not just write one giant Dockerfile that launches everything? Because a single image mixing app + database + test runner couples completely unrelated lifecycles — you'd rebuild your database image every time you fix one line of app code. It's the same reasoning behind not cramming unrelated responsibilities into one Java class: Compose's YAML is effectively dependency injection at the infrastructure level, wiring separate, independently-versioned services together. For a QA engineer, this distinction matters directly: a flaky integration test is often not your test code's fault at all, but a 'docker compose up' that started the test runner before the database container finished its health check.",
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
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-dockerfile-order-01',
            question: { tr: 'Bir Dockerfile\'ın cache-dostu talimat sırasını diz.', en: 'Arrange the cache-friendly instruction order for a Dockerfile.' },
            items: [
              { id: '1', text: { tr: 'FROM ile temel image seçilir', en: 'FROM selects the base image' }, order: 1 },
              { id: '2', text: { tr: 'WORKDIR ile çalışma dizini ayarlanır', en: 'WORKDIR sets the working directory' }, order: 2 },
              { id: '3', text: { tr: 'Sadece requirements.txt kopyalanır ve bağımlılıklar kurulur (RUN)', en: 'Only requirements.txt is copied and dependencies are installed (RUN)' }, order: 3 },
              { id: '4', text: { tr: 'Projenin geri kalanı kopyalanır (COPY . .)', en: 'The rest of the project is copied (COPY . .)' }, order: 4 },
              { id: '5', text: { tr: 'CMD ile container başlayınca çalışacak komut belirlenir', en: 'CMD defines the command that runs when the container starts' }, order: 5 },
            ],
            xpReward: 10,
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-multistage-practice',
            id: 'docker-core-multistage-practice',
            label: { tr: 'Pratik: Multi-stage build\'de builder aşamasından dosya taşı', en: 'Practice: Copy files from the builder stage in a multi-stage build' },
            language: 'dockerfile',
            task: {
              tr: 'Amaç: builder aşamasında kurulan bağımlılıkları, runtime aşamasına build araçlarını TEKRAR kurmadan taşı.',
              en: 'Goal: carry the dependencies installed in the builder stage into the runtime stage WITHOUT reinstalling build tools.',
            },
            explanation: {
              tr: 'COPY --from=<aşama adı> ile önceki aşamadan dosya kopyalanır. Aşama adı FROM ... AS builder satırındaki isimdir.',
              en: 'COPY --from=<stage name> copies files from a previous stage. The stage name is whatever follows FROM ... AS builder.',
            },
            code: {
              tr: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .`,
              en: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .`,
            },
            starterCode: {
              tr: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY ___=builder /root/.local /root/.local
COPY . .`,
              en: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY ___=builder /root/.local /root/.local
COPY . .`,
            },
            solutionCode: {
              tr: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .`,
              en: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .`,
            },
            expected: {
              tr: `runtime aşaması builder'daki paketleri devralır.
Final image build araçlarını içermez, daha küçüktür.`,
              en: `The runtime stage inherits the builder's packages.
The final image excludes build tools and is smaller.`,
            },
            hints: [
              { tr: 'Bir önceki aşamadan dosya taşımak için özel bir COPY seçeneği vardır.', en: 'There is a special COPY option for pulling files from a previous stage.' },
              { tr: 'Bu seçenek --from= şeklinde yazılır, sonrasında aşama adı gelir.', en: 'That option is written as --from=, followed by the stage name.' },
              { tr: 'Aşama adı, ilk FROM satırındaki "AS builder" ifadesiyle verilen isimdir.', en: 'The stage name is whatever was given after "AS builder" in the first FROM line.' },
            ],
            xpReward: 15,
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-dockerignore-practice',
            id: 'docker-core-dockerignore-practice',
            label: { tr: 'Pratik: Build\'i yavaşlatan eksik satırı bul', en: 'Practice: Spot the missing line slowing down the build' },
            language: 'bash',
            task: {
              tr: 'Amaç: .dockerignore\'da node_modules/ satırı unutulmuş — bu, build context\'in gereksiz yere yüzlerce MB büyümesine ve build\'in yavaşlamasına yol açar. Eksik satırı ekle.',
              en: 'Goal: the node_modules/ line is missing from .dockerignore — this bloats the build context by hundreds of MB and slows down the build. Add the missing line.',
            },
            explanation: {
              tr: '.dockerignore\'daki her satır, Docker\'ın build context\'e hiç dahil etmeyeceği bir dosya/klasör deseni tanımlar — .gitignore ile aynı sözdizimi.',
              en: 'Each line in .dockerignore defines a file/folder pattern Docker will never include in the build context — same syntax as .gitignore.',
            },
            code: {
              tr: `__pycache__/
*.pyc
.env
.git/
node_modules/
.pytest_cache/`,
              en: `__pycache__/
*.pyc
.env
.git/
node_modules/
.pytest_cache/`,
            },
            starterCode: {
              tr: `__pycache__/
*.pyc
.env
.git/
___
.pytest_cache/`,
              en: `__pycache__/
*.pyc
.env
.git/
___
.pytest_cache/`,
            },
            solutionCode: {
              tr: `__pycache__/
*.pyc
.env
.git/
node_modules/
.pytest_cache/`,
              en: `__pycache__/
*.pyc
.env
.git/
node_modules/
.pytest_cache/`,
            },
            expected: {
              tr: `Build context artık node_modules/ içermiyor.
Build süresi ve image boyutu belirgin şekilde küçüldü.`,
              en: `The build context no longer includes node_modules/.
Build time and image size dropped noticeably.`,
            },
            hints: [
              { tr: 'Bu proje JavaScript bağımlılıkları için npm/node kullanıyor.', en: 'This project uses npm/node for JavaScript dependencies.' },
              { tr: 'Node.js projelerinde bağımlılıklar hep aynı isimli klasörde toplanır.', en: 'In Node.js projects, dependencies always live in a folder with the same name.' },
              { tr: 'Aradığın klasör adı "node_modules/" — sonunda / olmalı çünkü bir klasördür.', en: 'The folder you need is "node_modules/" — it ends with / because it is a directory.' },
            ],
            xpReward: 10,
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-compose-healthcheck-practice',
            id: 'docker-core-compose-healthcheck-practice',
            label: { tr: 'Pratik: app servisinin doğru host adına bağlandığından emin ol', en: 'Practice: Make sure the app service points at the correct hostname' },
            language: 'yaml',
            task: {
              tr: 'Amaç: app servisinin DATABASE_URL\'i localhost\'a değil, Compose\'daki db servisinin adına işaret etmeli — Compose network\'ünde container\'lar birbirine servis adıyla ulaşır, localhost ile değil.',
              en: 'Goal: the app service\'s DATABASE_URL must point at the db SERVICE NAME, not localhost — inside a Compose network, containers reach each other by service name, not localhost.',
            },
            explanation: {
              tr: 'docker-compose.yml\'deki "db:" servis adı, aynı network\'teki diğer container\'lar için bir DNS hostname\'idir. localhost her container kendi İÇİNİ işaret eder.',
              en: 'The "db:" service name in docker-compose.yml is a DNS hostname for other containers on the same network. localhost always points INSIDE each container itself.',
            },
            code: {
              tr: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testuser:testpass@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
              en: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testuser:testpass@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
            },
            starterCode: {
              tr: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testuser:testpass@___:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
              en: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testuser:testpass@___:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
            },
            solutionCode: {
              tr: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testuser:testpass@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
              en: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testuser:testpass@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
            },
            expected: {
              tr: `app container'ı db'ye "db" hostname'i üzerinden bağlanıyor.
Bağlantı hatası (ECONNREFUSED) yok.`,
              en: `The app container connects to db via the "db" hostname.
No connection error (ECONNREFUSED).`,
            },
            hints: [
              { tr: 'Compose network\'ünde host adı, docker-compose.yml\'deki servis adıyla AYNIDIR.', en: 'The hostname on a Compose network is IDENTICAL to the service name in docker-compose.yml.' },
              { tr: 'Bu dosyada veritabanı servisinin adı "db:" olarak tanımlı.', en: 'In this file, the database service is defined under the name "db:".' },
              { tr: 'localhost yazarsan app container kendi içindeki (var olmayan) bir veritabanına bağlanmaya çalışır.', en: 'If you write localhost, the app container tries to reach a (nonexistent) database inside itself.' },
            ],
            xpReward: 15,
          },
          { type: 'heading', text: 'Docker Compose Commands' },
          {
            type: 'code',
            language: 'bash',
            label: 'Starting, stopping and rebuilding services',
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
docker compose up --scale tests=3`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-compose-workflow-order-01',
            question: { tr: 'Bir QA test ortamını Compose ile sıfırdan ayağa kaldırma akışını diz.', en: 'Arrange the flow for bringing up a QA test environment with Compose from scratch.' },
            items: [
              { id: '1', text: { tr: 'Dockerfile değiştiyse image\'ları yeniden derle (up --build)', en: 'Rebuild images if the Dockerfile changed (up --build)' }, order: 1 },
              { id: '2', text: { tr: 'Tüm servisleri arka planda başlat (up -d)', en: 'Start all services in the background (up -d)' }, order: 2 },
              { id: '3', text: { tr: 'Test runner loglarını canlı takip et (logs -f)', en: 'Follow the test runner logs live (logs -f)' }, order: 3 },
              { id: '4', text: { tr: 'Testler bitince ortamı kapat (down)', en: 'Shut the environment down when tests finish (down)' }, order: 4 },
              { id: '5', text: { tr: 'Veritabanını da tamamen sıfırlamak istiyorsan volume\'leri de sil (down -v)', en: 'If you also want a clean database, remove volumes too (down -v)' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Logs, one-off commands and status',
            code: `# View logs
docker compose logs               # All services
docker compose logs app           # Single service
docker compose logs -f app        # Follow (real-time)

# Run one-off command
docker compose run tests pytest tests/api/ -v

# Check service status
docker compose ps`,
          },
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-compose-run-oneoff-practice',
            id: 'docker-core-compose-run-oneoff-practice',
            label: { tr: 'Pratik: Sadece bir API test alt kümesini bir kerelik çalıştır', en: 'Practice: Run just one API test subset as a one-off command' },
            language: 'bash',
            task: {
              tr: 'Amaç: Tüm ortamı yeniden başlatmadan, sadece tests servisini kullanarak tests/smoke/ klasöründeki testleri -v (verbose) modda bir kerelik çalıştır.',
              en: 'Goal: without restarting the whole environment, run just the tests in tests/smoke/ once, in verbose (-v) mode, using the tests service.',
            },
            explanation: {
              tr: 'docker compose run <servis> <komut> ilgili servisin image\'ından YENİ, TEK SEFERLİK bir container başlatır; docker compose up gibi kalıcı servisi ayağa kaldırmaz.',
              en: 'docker compose run <service> <command> starts a NEW, ONE-OFF container from that service\'s image; unlike docker compose up, it does not bring up a persistent service.',
            },
            code: {
              tr: `docker compose run tests pytest tests/smoke/ -v`,
              en: `docker compose run tests pytest tests/smoke/ -v`,
            },
            starterCode: {
              tr: `docker compose ___ tests pytest tests/smoke/ -v`,
              en: `docker compose ___ tests pytest tests/smoke/ -v`,
            },
            solutionCode: {
              tr: `docker compose run tests pytest tests/smoke/ -v`,
              en: `docker compose run tests pytest tests/smoke/ -v`,
            },
            expected: {
              tr: `tests servisinden tek seferlik bir container başlatıldı.
Sadece tests/smoke/ altındaki testler verbose modda çalıştı.`,
              en: `A one-off container was started from the tests service.
Only the tests under tests/smoke/ ran, in verbose mode.`,
            },
            hints: [
              { tr: 'docker compose up kalıcı servisi ayağa kaldırır; sen tek seferlik bir komut istiyorsun.', en: 'docker compose up brings up a persistent service; you want a one-off command instead.' },
              { tr: 'Aradığın alt komut, bir servisin image\'ını kullanıp geçici bir container açar.', en: 'The subcommand you need spins up a temporary container using a service\'s image.' },
              { tr: 'Bu alt komutun adı "run" — docker compose run <servis> <komut> şeklinde kullanılır.', en: 'That subcommand is "run" — used as docker compose run <service> <command>.' },
            ],
            xpReward: 10,
          },
          ...dockerComposeInteractiveBlocks,
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
          
        retryQuestion: {
      "question": "In a Docker Compose configuration, what is the best way to delay the startup of a web service until the database service has fully initialized and passed its health checks?",
      "options": [
            {
                  "id": "a",
                  "text": "links: - db_healthy"
            },
            {
                  "id": "b",
                  "text": "depends_on: { service_db: { condition: service_healthy } }"
            },
            {
                  "id": "c",
                  "text": "start_priority: 1"
            },
            {
                  "id": "d",
                  "text": "order: wait_for_db"
            }
      ],
      "correct": "b",
      "explanation": "To manage startup order based on application state, Docker Compose provides the depends_on condition attribute. Using 'service_healthy' ensures the dependent container only starts once the dependency's healthcheck command returns a zero exit code."
}
},
          {
            type: 'interleaving-challenge',
            challenges: [
              {
                topic: 'Docker',
                questionTr: 'Bir Dockerfile optimize edilirken, hangisi önbellek (cache) verimliliğini en çok artırır?',
                questionEn: 'When optimizing a Dockerfile, which practice best increases layer cache efficiency?',
                optionsTr: [
                  'COPY . . komutunu en başa taşımak',
                  'requirements.txt / package.json kopyalama ve yükleme adımını kod kopyalamadan önce yapmak',
                  'Her RUN komutunu ayrı çalıştırmak',
                  'Base image olarak alpine yerine ubuntu seçmek'
                ],
                optionsEn: [
                  'Moving COPY . . to the top of the Dockerfile',
                  'Copying and installing requirements.txt / package.json before copying the rest of the application source code',
                  'Running every RUN instruction separately',
                  'Choosing ubuntu as base image instead of alpine'
                ],
                correct: 1,
                explanationTr: 'Bağımlılıklar (requirements.txt / package.json) daha seyrek değiştiği için, onları koddan önce kopyalayıp yüklemek cache verimliliğini artırır. Böylece her kod değiştiğinde bağımlılıklar tekrar indirilmez.',
                explanationEn: 'Since dependencies change less frequently than source code, copying and installing them before copying the rest of the source code maximizes cache hit rates. This prevents reinstalling dependencies on every code change.'
              },
              {
                topic: 'Jenkins',
                questionTr: 'Jenkins pipeline\'ında büyük bir Allure/JUnit test raporu üretildikten sonra, bu raporun silinmemesi ve sonradan incelenebilmesi için hangi pipeline aşaması (step) kullanılmalıdır?',
                questionEn: 'After generating a large Allure/JUnit test report in a Jenkins pipeline, which step must be used to ensure the report persists for later inspection?',
                optionsTr: [
                  'sh "rm -rf target/"',
                  'archiveArtifacts artifacts: "**/target/surefire-reports/*"',
                  'git commit -m "add reports"',
                  'echo "Tests completed"'
                ],
                optionsEn: [
                  'sh "rm -rf target/"',
                  'archiveArtifacts artifacts: "**/target/surefire-reports/*"',
                  'git commit -m "add reports"',
                  'echo "Tests completed"'
                ],
                correct: 1,
                explanationTr: 'archiveArtifacts komutu, test raporları gibi derleme çıktılarını (artifacts) Jenkins master sunucusunda saklayarak pipeline tamamlandıktan sonra da erişilebilir kılar.',
                explanationEn: 'The archiveArtifacts step stores build artifacts (like test reports) on the Jenkins master, ensuring they persist and remain downloadable after the build agent is destroyed.'
              },
              {
                topic: 'Kubernetes',
                questionTr: 'Kubernetes\'te bir Service\'in gelen istekleri doğru Pod\'lara yönlendirebilmesi için hangisi eşleşmelidir?',
                questionEn: 'In Kubernetes, which component must match so that a Service can correctly route traffic to Pods?',
                optionsTr: [
                  'Service selector etiketleri ile Pod label etiketleri',
                  'Service ismi ile Pod ismi',
                  'Pod spec container portu ile Node IP adresi',
                  'ReplicaSet replica sayısı ile Node port sayısı'
                ],
                optionsEn: [
                  'Service selector labels and Pod labels',
                  'Service name and Pod name',
                  'Pod spec container port and Node IP address',
                  'ReplicaSet replica count and Node port count'
                ],
                correct: 0,
                explanationTr: 'Kubernetes Service, gelen istekleri yönlendireceği Pod\'ları seçmek için selector etiketlerini kullanır. Eşleşme hatası olursa Service endpoint bulamaz ve yönlendirme başarısız olur.',
                explanationEn: 'Kubernetes Services use label selectors to target Pods. If there is a mismatch, the Service will have no endpoints and routing will fail.'
              }
            ]
          },
          {
            type: 'visual',
            variant: 'flow',
            title: { tr: 'Docker Compose Çalışma Akışı', en: 'Docker Compose Startup Lifecycle' },
            steps: [
              { num: '1', label: { tr: 'YAML Analizi', en: 'YAML Parsing' }, desc: { tr: 'docker-compose.yml dosyasındaki servisler, ağlar ve volume tanımları okunur.', en: 'Reads services, networks, and volumes configuration.' } },
              { num: '2', label: { tr: 'İmaj Kontrolü', en: 'Image Check' }, desc: { tr: 'Gerekli imajlar lokalde yoksa Docker Hub\'dan çekilir veya build edilir.', en: 'Pulls missing images from Docker Hub or builds them from Dockerfiles.' } },
              { num: '3', label: { tr: 'Bağımlılık Sırası', en: 'Dependency Order' }, desc: { tr: 'depends_on kurallarına göre container\'ların öncelik sırası belirlenir.', en: 'Sets container startup priority based on depends_on conditions.' } },
              { num: '4', label: { tr: 'Ağ & Hacim Oluşturma', en: 'Network & Volume' }, desc: { tr: 'İzole sanal ağlar ve kalıcı veri hacimleri (volumes) ayağa kaldırılır.', en: 'Creates isolated virtual networks and persistent volumes.' } },
              { num: '5', label: { tr: 'Çalıştırma', en: 'Running Containers' }, desc: { tr: 'Tüm servisler tek bir komutla eş zamanlı olarak başlatılır.', en: 'Starts all services concurrently under a single orchestration command.' } }
            ]
          }
        ],
      },

      // ── SECTION 4: QA USE CASES ────────────────────────────────────────────
      {
        title: '🧪 Docker for QA',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔬',
            content: "Docker turns your test environment into a disposable paper cup instead of a glass you have to wash and reuse. Need a fresh browser? One command spins up Chrome. Need a clean database? One command gives you a brand-new PostgreSQL, used once and thrown away. So why not just reset the existing test database between runs instead of recreating a whole container? Because a 'reset' script only clears the rows YOU know about — leftover indexes, schema drift, or a stray temp table from a previous failed test silently survive and contaminate the next run. It's the same trap as reusing a static Java test fixture across @Test methods without re-initializing it: state leaks invisibly. The QA payoff is concrete: a 'works on my machine' flaky test almost always traces back to a CI agent whose installed Chrome version or DB schema quietly drifted from yours — disposable containers remove that variable entirely.",
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
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-selenium-grid-order-01',
            question: { tr: 'Selenium Grid\'in Compose ile başlatılma bağımlılık sırasını diz.', en: 'Arrange the dependency startup order for Selenium Grid with Compose.' },
            items: [
              { id: '1', text: { tr: 'selenium-hub önce ayağa kalkar (bağımlılığı yok)', en: 'selenium-hub comes up first (no dependencies)' }, order: 1 },
              { id: '2', text: { tr: 'chrome ve firefox node\'ları hub\'a kayıt olur (depends_on: selenium-hub)', en: 'chrome and firefox nodes register with the hub (depends_on: selenium-hub)' }, order: 2 },
              { id: '3', text: { tr: 'test-runner, chrome ve firefox\'un ayakta olmasını bekler (depends_on)', en: 'test-runner waits for chrome and firefox to be up (depends_on)' }, order: 3 },
              { id: '4', text: { tr: 'test-runner SELENIUM_HUB adresine bağlanıp testleri paralel çalıştırır', en: 'test-runner connects to SELENIUM_HUB and runs tests in parallel' }, order: 4 },
              { id: '5', text: { tr: 'Sonuçlar ./reports volume\'ü üzerinden host\'a yazılır', en: 'Results are written to the host through the ./reports volume' }, order: 5 },
            ],
            xpReward: 10,
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-selenium-remote-practice',
            id: 'docker-core-selenium-remote-practice',
            label: { tr: 'Pratik: WebDriver\'ı localhost yerine Docker Grid\'e bağla', en: 'Practice: Point WebDriver at the Docker Grid instead of localhost' },
            language: 'python',
            task: {
              tr: 'Amaç: Yerel bir ChromeDriver yerine, Docker Compose\'daki selenium-hub servisine bağlanan bir Remote WebDriver oluştur.',
              en: 'Goal: instead of a local ChromeDriver, create a Remote WebDriver that connects to the selenium-hub service in Docker Compose.',
            },
            explanation: {
              tr: 'webdriver.Remote(), command_executor parametresiyle hub\'ın adresini alır — webdriver.Chrome() gibi yerel bir binary aramaz.',
              en: 'webdriver.Remote() takes the hub\'s address via the command_executor parameter — unlike webdriver.Chrome(), it never looks for a local binary.',
            },
            code: {
              tr: `driver = webdriver.Remote(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
              en: `driver = webdriver.Remote(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
            },
            starterCode: {
              tr: `driver = webdriver.___(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
              en: `driver = webdriver.___(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
            },
            solutionCode: {
              tr: `driver = webdriver.Remote(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
              en: `driver = webdriver.Remote(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
            },
            expected: {
              tr: `driver artık selenium-hub üzerinden çalışan bir uzak tarayıcıyı kontrol ediyor.
Yerel makinede Chrome kurulu olmasına gerek yok.`,
              en: `driver now controls a remote browser running through selenium-hub.
No local Chrome installation is required.`,
            },
            hints: [
              { tr: 'webdriver.Chrome() her zaman yerel bir binary arar — burada onu istemiyoruz.', en: 'webdriver.Chrome() always looks for a local binary — that is not what we want here.' },
              { tr: 'Uzak bir Grid\'e bağlanmak için WebDriver sınıfının farklı bir adı vardır.', en: 'There is a different WebDriver class name for connecting to a remote Grid.' },
              { tr: 'Aradığın sınıf adı "Remote" — webdriver.Remote(command_executor=...) şeklinde kullanılır.', en: 'The class you need is "Remote" — used as webdriver.Remote(command_executor=...).' },
            ],
            xpReward: 15,
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
            type: 'code-playground',
            relatedTopicId: 'docker-core-playwright-volume-practice',
            id: 'docker-core-playwright-volume-practice',
            label: { tr: 'Pratik: HTML raporunun host\'ta kalıcı olmasını sağla', en: 'Practice: Make the HTML report persist on the host' },
            language: 'yaml',
            task: {
              tr: 'Amaç: playwright-report/ klasörü sadece container\'ın içinde kalıyor ve container silinince kayboluyor. Volume tanımını ekleyerek host\'ta kalıcı hale getir.',
              en: 'Goal: the playwright-report/ folder currently only lives inside the container and disappears when it is removed. Add the volume mapping so it persists on the host.',
            },
            explanation: {
              tr: 'volumes altındaki her satır HOST_YOLU:CONTAINER_YOLU şeklindedir; test-results zaten doğru mount edilmiş, playwright-report için de aynı deseni uygula.',
              en: 'Each line under volumes follows HOST_PATH:CONTAINER_PATH; test-results is already mounted correctly — apply the same pattern for playwright-report.',
            },
            code: {
              tr: `volumes:
  - .:/app
  - ./test-results:/app/test-results
  - ./playwright-report:/app/playwright-report`,
              en: `volumes:
  - .:/app
  - ./test-results:/app/test-results
  - ./playwright-report:/app/playwright-report`,
            },
            starterCode: {
              tr: `volumes:
  - .:/app
  - ./test-results:/app/test-results
  - ___:/app/playwright-report`,
              en: `volumes:
  - .:/app
  - ./test-results:/app/test-results
  - ___:/app/playwright-report`,
            },
            solutionCode: {
              tr: `volumes:
  - .:/app
  - ./test-results:/app/test-results
  - ./playwright-report:/app/playwright-report`,
              en: `volumes:
  - .:/app
  - ./test-results:/app/test-results
  - ./playwright-report:/app/playwright-report`,
            },
            expected: {
              tr: `HTML raporu artık container silinse bile host'taki ./playwright-report klasöründe duruyor.`,
              en: `The HTML report now survives on the host in ./playwright-report even if the container is removed.`,
            },
            hints: [
              { tr: 'Bir satır önceki test-results satırının aynı desenini takip et.', en: 'Follow the exact same pattern as the test-results line right above it.' },
              { tr: 'Host tarafındaki klasör adı container yolundakiyle aynı olmalı: playwright-report.', en: 'The host-side folder name should match the container path: playwright-report.' },
              { tr: 'Doğru satır: ./playwright-report:/app/playwright-report', en: 'The correct line is: ./playwright-report:/app/playwright-report' },
            ],
            xpReward: 10,
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
          ...dockerQaInteractiveBlocks,
          { type: 'heading', text: 'Real-World Scenarios & Solutions' },
          {
            type: 'error-dictionary',
              relatedTopicId: 'docker-errors',
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
          
        retryQuestion: {
      "question": "What is the primary reason for configuring a larger shared memory size when running headless browser tests inside Docker?",
      "options": [
            {
                  "id": "a",
                  "text": "To prevent the browser from using too much CPU"
            },
            {
                  "id": "b",
                  "text": "To allow the browser to use more physical RAM for plugins"
            },
            {
                  "id": "c",
                  "text": "The default 64MB /dev/shm limit in Docker is insufficient for rendering complex pages in Chrome, leading to browser crashes"
            },
            {
                  "id": "d",
                  "text": "To cache external CSS and JavaScript files for faster test execution"
            }
      ],
      "correct": "c",
      "explanation": "Headless Chrome relies on the /dev/shm partition for shared memory communication between its processes. Docker's default allocation is 64MB, which is often not enough for browser rendering, leading to intermittent failures unless increased via --shm-size or bypassed using --disable-dev-shm-usage."
    }
  },
  {
    type: 'visual',
    variant: 'boxes',
    title: { tr: 'Docker Üzerinde Selenium Grid Mimarisi', en: 'Selenium Grid Architecture in Docker' },
    items: [
      { icon: '🌐', label: { tr: 'Test Kodları', en: 'Test Code' }, desc: { tr: 'Local veya CI üzerindeki test adımları', en: 'Test runner execution' } },
      { arrow: true },
      { icon: '🏗️', label: { tr: 'Selenium Hub', en: 'Selenium Hub' }, desc: { tr: 'İstekleri yönlendiren merkezi kontrolör', en: 'Router and controller' }, highlight: true },
      { arrow: true },
      { icon: '🐳', label: { tr: 'Chrome Node', en: 'Chrome Node' }, desc: { tr: 'İzole Chrome tarayıcı servisi', en: 'Isolated Chrome service' } },
      { icon: '🐳', label: { tr: 'Firefox Node', en: 'Firefox Node' }, desc: { tr: 'İzole Firefox tarayıcı servisi', en: 'Isolated Firefox service' } }
    ],
    note: { tr: 'Tüm tarayıcı düğümleri (nodes) tek bir ağda Hub\'a bağlıdır ve paralel olarak testleri çalıştırabilir.', en: 'All browser nodes run in isolated containers connected to the Hub via the same virtual network.' }
  }
],
},

      // ── SECTION 5: ECOSYSTEM ────────────────────────────────────────────────
      {
        title: '🔗 Ecosystem',
        blocks: [
          { type: 'simple-box', emoji: '🔗', content: "A single Docker container is like one shipping container on a truck — useful, but the real power shows up at the port: cranes that load/unload automatically (Kubernetes), a dispatcher that decides which ship goes where (Jenkins/CI), and a logbook tracking every container that ever passed through (a registry like Docker Hub). So if a container already runs your app, why surround it with three more systems instead of just running 'docker run' on a bigger server? Because a single container has no memory of past versions, no automatic restart policy, and no way to coordinate with nine identical siblings during a deploy — exactly the gap between a single Java object and the framework (Spring's ApplicationContext, say) that manages its lifecycle, wiring, and recovery for you. In a real pipeline, skipping the registry layer is what causes the classic incident where a tester can't reproduce a bug because the image tag 'latest' silently pointed to a different build yesterday than it does today." },
          { type: 'heading', text: 'How Docker Fits Into the Bigger Picture' },
          { type: 'text', content: 'On its own, Docker builds and runs one container on one machine. Its real value in a QA/DevOps pipeline comes from being wired into four other systems: a CI/CD tool that builds and tests images on every push, a registry that stores and versions those images, an orchestrator that runs many containers reliably across machines, and a message broker or database that the containerized app talks to at runtime.' },
          {
            type: 'visual', variant: 'boxes',
            title: 'Docker Ecosystem — Who Talks to Whom',
            items: [
              { icon: '🔧', label: 'Jenkins / GitHub Actions', desc: 'builds image on every push' },
              { arrow: true },
              { icon: '🐳', label: 'docker build / push', desc: 'creates and tags the image' },
              { arrow: true },
              { icon: '📦', label: 'Docker Hub / ECR / GCR', desc: 'stores versioned images', highlight: true },
              { arrow: true },
              { icon: '☸️', label: 'Kubernetes', desc: 'pulls the image, runs N replicas' },
              { arrow: true },
              { icon: '📈', label: 'Prometheus / Grafana', desc: 'monitors running containers', highlight: true },
            ],
            note: 'Each tool does one job well — Docker packages, CI builds, a registry stores, Kubernetes orchestrates, monitoring observes.',
          },
          ...dockerEcosystemInteractiveBlocks,
          { type: 'heading', text: 'Three Key Relationships' },
          {
            type: 'table',
            headers: ['Relationship', 'How They Work Together', 'What Problem It Solves'],
            rows: [
              ['Docker ↔ Jenkins/CI', 'A pipeline stage runs `docker build` and `docker push` after tests pass, tagging the image with the commit SHA', 'Every commit produces a traceable, reproducible artifact instead of "works on my machine"'],
              ['Docker ↔ Kubernetes', 'K8s pulls images from a registry and schedules them as Pods across a cluster, restarting them if they crash', 'Turns a single container into a self-healing, horizontally scalable service'],
              ['Docker ↔ Registry (Docker Hub/ECR)', 'Images are pushed once and pulled by any machine with credentials — dev laptop, CI runner, or production node', 'Removes the need to rebuild the same image on every environment; guarantees byte-identical artifacts'],
              ['Docker ↔ Selenium Grid', 'Selenium/Playwright nodes run as containers (selenium/standalone-chrome), spun up fresh for every test run', 'Eliminates "dirty browser state" between test runs and lets QA scale parallel test execution horizontally'],
            ]
          },
          { type: 'heading', text: 'Where Docker Sits Next to Other QA/DevOps Tools' },
          { type: 'text', content: 'In a typical pipeline: Jenkins triggers the build → Docker packages the app and test runner into images → the test image runs against a docker-compose stack (app + DB + Selenium Grid, all containerized) → on success, Docker pushes the production image to a registry → Kubernetes deploys it. QA engineers interact with Docker most directly when running Selenium Grid in containers or spinning up disposable test environments with docker-compose.' },
          {
            type: 'quiz',
            question: 'In a CI/CD pipeline, which tool is responsible for pulling a Docker image from a registry and running multiple replicas of it across a cluster, restarting them if they crash?',
            options: [
              { id: 'a', text: 'Docker Hub' },
              { id: 'b', text: 'Jenkins' },
              { id: 'c', text: 'Kubernetes' },
              { id: 'd', text: 'docker-compose' },
            ],
            correct: 'c',
            explanation: 'Kubernetes is the orchestrator: it pulls images from a registry, schedules them as Pods across a cluster, and restarts them automatically on failure — turning a single container into a self-healing, horizontally scalable service. Docker Hub only stores images, Jenkins only builds/pushes them, and docker-compose is for local/single-host multi-container setups, not cluster-wide orchestration.',
            retryQuestion: {
              question: 'If a Kubernetes-managed container crashes, what happens without any manual intervention?',
              options: [
                { id: 'a', text: 'Nothing — an engineer must manually restart it' },
                { id: 'b', text: 'Kubernetes automatically restarts it to match the desired replica count' },
                { id: 'c', text: 'Docker Hub automatically rebuilds the image' },
                { id: 'd', text: 'docker-compose detects the crash across the cluster' },
              ],
              correct: 'b',
              explanation: "This is exactly what \"self-healing\" means in Kubernetes: it continuously compares the actual running Pods to the desired replica count and restarts/replaces any that crash, with zero manual action. docker-compose has no concept of a multi-node cluster, and Docker Hub is just an image registry — neither monitors running container health.",
            },
          },
          {
            type: 'feynman-checkpoint',
            prompt: 'Explain the key difference between a Docker Image and a Docker Container in simple terms (as if explaining to a 5-year-old).',
            promptTr: 'Bir Docker Image ile Docker Container arasındaki temel farkı, 5 yaşındaki bir çocuğa anlatır gibi (teknik jargon kullanmadan) basit terimlerle açıkla.',
            keywords: [
              ['imaj', 'image', 'blueprint', 'recipe', 'kalıp', 'tarif', 'şablon'],
              ['container', 'konteyner', 'çalışan', 'process', 'örnek', 'instance', 'kek']
            ],
            modelAnswerEn: 'A Docker Image is like a recipe for a cake (static, instructions only). A Docker Container is the actual cake baked using that recipe (live, interactive, running). You can bake many cakes from the same recipe.',
            modelAnswerTr: 'Docker Image, bir kek tarifi gibidir (statik, sadece talimatlar). Docker Container ise bu tarife göre pişirilmiş, yenebilen gerçek kektir (canlı, çalışan örnek). Aynı tariften birçok kek pişirebilirsin.',
            minScore: 2
          }
        ],
      },

      // ── SECTION 6: INTERVIEW Q&A ───────────────────────────────────────────
      {
        title: '💼 Docker Interview Questions',
        blocks: [
          {
            type: 'interview-questions',
              relatedTopicId: 'docker',
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
              // ── BASIC (extra) ──────────────────────────────────
              { level: 'basic', q: { en: 'How do you list all containers, including stopped ones, and why is this useful in QA?' }, a: { en: 'docker ps only shows running containers; docker ps -a shows ALL containers regardless of state, including ones that exited with an error. In QA, after a test run fails silently, docker ps -a is the first command to check — you can see the exit code and how long ago the container stopped. Combine with --filter status=exited to find only failed runs. Java analogy: like checking a thread dump after a thread silently died versus only looking at currently alive threads.' } },
              { level: 'basic', q: { en: "What's the difference between docker exec and docker attach, and when would you use each in a test debugging session?" }, a: { en: "docker exec -it container bash opens a NEW process inside a running container — you get a separate shell without affecting the main process, ideal for inspecting test files or running ad-hoc commands while tests are still running. docker attach connects to the container's MAIN process (PID 1) and its stdin/stdout directly — risky, because pressing Ctrl+C can kill the main process. For QA debugging, almost always prefer docker exec — it's the safer, isolated option, similar to opening a second SSH session vs taking over someone else's terminal." } },
              { level: 'basic', q: { en: "What does .dockerignore do, and what should a QA test image's .dockerignore contain?" }, a: { en: 'Similar to .gitignore, .dockerignore tells Docker which files to exclude from the build context sent to the daemon. Without it, a build can accidentally copy node_modules, .git, test-results/, or screenshots/ into the image — bloating size and even leaking sensitive data like .env files. A typical QA .dockerignore: node_modules, .git, test-results, playwright-report, *.log, .env. Java analogy: like excluding target/ from a deployment artifact — you don\'t ship build leftovers.' } },
              { level: 'basic', q: { en: 'Why is tagging images with :latest risky for test environments, and what should you do instead?' }, a: { en: '`:latest` is just a mutable label, not a guarantee of the newest version — if someone pushes an older image with that tag, you silently get an old version. For reproducible tests, pin exact versions or commit SHAs: myapp:1.4.2 or myapp:abc1234. This way, a test that passed on Monday runs against the exact same image on Friday. Java analogy: it\'s the same problem as a Maven dependency on 1.0-SNAPSHOT — looks fixed, but the artifact behind it can silently change.' } },
              { level: 'basic', q: { en: "What's the difference between a bind mount and a named volume, and which would you pick for live-editing test scripts vs storing test results?" }, a: { en: "A bind mount maps a specific host path directly into the container (-v $(pwd)/tests:/app/tests) — changes on either side are instantly visible, great for live-editing test scripts during local development. A named volume (-v test-data:/app/data) is managed by Docker itself, stored in Docker's storage area, not tied to a specific host path — better for persisting test results or databases across container restarts in CI, where the host filesystem layout may vary. Rule of thumb: bind mounts for development, named volumes for data Docker should own." } },
              { level: 'basic', q: { en: "What's the difference between docker stop and docker kill, and why does it matter for cleaning up test containers?" }, a: { en: "docker stop sends SIGTERM, gives the process up to 10 seconds to shut down gracefully (close DB connections, flush logs), then sends SIGKILL if it hasn't exited. docker kill sends SIGKILL immediately — no grace period. For QA: use docker stop in normal cleanup so test reports get flushed to disk before the container disappears; reserve docker kill for CI timeouts where you need an immediate, forced teardown. Killing abruptly can leave partially-written report files." } },
              { level: 'basic', q: { en: "What is the 'build context' in `docker build .`, and why can a large context slow down your test image builds?" }, a: { en: 'The build context is everything in the specified directory (the `.`) that gets sent to the Docker daemon before the build even starts — not just the Dockerfile. If your project folder contains node_modules, .git history, or old test-results, all of that gets zipped and sent first, even if your Dockerfile never copies it. A bloated context can make builds take minutes before a single instruction runs. Fix: a tight .dockerignore, or build from a subdirectory containing only what\'s needed. Java analogy: like zipping your entire workspace including target/ and .idea/ before deploying a single JAR.' } },
              // ── INTERMEDIATE (extra) ────────────────────────────
              { level: 'intermediate', q: { en: 'What are Docker restart policies, and which one should a Selenium Grid node use in CI vs which one should a one-off test runner use?' }, a: { en: 'Restart policies control what Docker does when a container exits: no (default, never restart), on-failure (restart only on non-zero exit, optionally with a max retry count), always (always restart, even after a clean exit or daemon restart), unless-stopped (like always, but won\'t restart if you explicitly stopped it). A long-lived Selenium Grid node should use unless-stopped or on-failure:3 so it self-heals from a crash. A one-off test runner container should use restart: "no" — you want it to exit and show its real exit code so CI can fail the build, not loop forever.' } },
              { level: 'intermediate', q: { en: 'Your docker-compose.yml has depends_on for the app service, but tests still fail with connection refused on startup. Why, and how do you fix it?' }, a: { en: 'depends_on only controls START ORDER, not READINESS — Docker starts the database container, but the database process inside might take 5 more seconds to accept connections before depends_on considers the job done. The fix is depends_on with condition: service_healthy, paired with a HEALTHCHECK on the dependency, so Compose waits for the actual health status, not just "the container process started". Without this, you\'d need an application-side retry loop or a wait-for-it.sh script, which is more fragile than letting Docker track health natively.' } },
              { level: 'intermediate', q: { en: 'How do you limit CPU and memory for a test container, and why does this matter on a shared CI runner?' }, a: { en: "docker run --memory=512m --cpus=1.5 my-test-image (or in compose: deploy.resources.limits). On a shared CI host running many parallel jobs, one unbounded container can starve others of memory and cause unrelated tests to fail with OOM kills or extreme slowness, producing confusing 'flaky' test reports. Setting explicit limits also catches real memory leaks in your app under test earlier, because the container gets OOM-killed predictably instead of slowly degrading the whole machine. Java analogy: like setting -Xmx on a JVM so one runaway process can't take down the whole CI box." } },
              { level: 'intermediate', q: { en: "A flaky test fails intermittently in CI but you can't reproduce it locally. How do Docker logs help, and what flags matter?" }, a: { en: "docker logs --timestamps --since 10m container-name shows exactly when each log line happened, which helps correlate a failure with a specific timestamp in the test report. Add -f to follow logs live while a flaky test reruns. For containers that already exited, docker logs still works as long as the container wasn't removed (--rm deletes logs too) — so for flaky-test investigation, deliberately avoid --rm on CI runs until you've captured the logs. Java analogy: it's the difference between deleting a thread dump immediately after a crash versus keeping it for postmortem analysis." } },
              { level: 'intermediate', q: { en: 'How do you get a Playwright HTML report or Selenium screenshots out of a container after the test run finishes?' }, a: { en: "Two options: 1) Mount a volume during the run (-v $(pwd)/reports:/app/reports) so files are written directly to the host — best for CI since it works even if the container later fails. 2) docker cp container-name:/app/reports ./reports — copies files out after the fact, useful when you forgot to mount a volume and the container is still around (not yet removed). For CI pipelines, the volume-mount approach is more reliable because it doesn't depend on the container still existing when you go to retrieve the report." } },
              { level: 'intermediate', q: { en: 'Different team members need slightly different docker-compose configs (e.g., exposed ports) locally vs in CI. How do you avoid maintaining separate compose files?' }, a: { en: "Docker Compose automatically merges docker-compose.yml with docker-compose.override.yml if present — the override file holds machine-specific tweaks (like a different exposed port to avoid conflicts) without touching the shared base file that's checked into Git. For CI, you instead chain an explicit file: docker compose -f docker-compose.yml -f docker-compose.ci.yml up, which might disable port publishing entirely since CI doesn't need host access. Java analogy: like having a shared pom.xml plus a profile-specific override for local vs CI builds." } },
              { level: 'intermediate', q: { en: 'Your CI rebuilds dependencies (npm install / pip install) from scratch on every single run, costing minutes. How can a named volume speed this up?' }, a: { en: "Mount a named volume onto the package manager's cache directory, e.g. -v npm-cache:/root/.npm or -v pip-cache:/root/.cache/pip. Because the volume persists between CI runs on the same runner (unlike the container's writable layer, which is thrown away), the second and subsequent runs reuse already-downloaded packages instead of re-fetching everything from the registry. This is separate from Docker's build-layer cache — it caches the package manager's own download cache, which still helps even when your Dockerfile changes in unrelated ways. Caveat: doesn't work on ephemeral CI runners that spin up a fresh VM each time, only on persistent runners/self-hosted agents." } },
              { level: 'intermediate', q: { en: 'You have a standalone app container and a standalone test-runner container that were started separately (not via the same Compose file). How do you make them talk to each other by name?' }, a: { en: "By default, standalone docker run containers land on the default bridge network, where you can only reach each other by IP, not by name. Create a user-defined network first: docker network create qa-net, then start both containers with --network qa-net. On a user-defined network, Docker's embedded DNS resolves container names automatically, so the test runner can call http://app-container:8080 just like in Compose. This is the manual equivalent of what Compose does for you automatically when services share a compose file." } },
              { level: 'intermediate', q: { en: "How do you make your Selenium/Playwright test runner wait for the application under test to be truly ready, not just 'container started', before launching tests?" }, a: { en: "Add a HEALTHCHECK instruction to the app's Dockerfile (e.g., curl -f http://localhost:3000/health) and, in docker-compose.yml, set the test-runner service's depends_on to condition: service_healthy. Compose then blocks starting the test-runner container until the app reports healthy, eliminating race conditions where tests start hitting an app that's still booting. Without this, you'd resort to a fragile sleep 15 or a custom wait-for-it.sh retry loop in your entrypoint, which either wastes time or isn't long enough on a slow CI runner." } },
              { level: 'intermediate', q: { en: 'Your Dockerfile does COPY . . then RUN npm install. Why does every code change force a full dependency reinstall, and how do you fix the layer order?' }, a: { en: "Docker caches each instruction's layer and only re-runs it if its inputs changed. COPY . . copies your ENTIRE project, including source files that change on every commit — so Docker invalidates that layer (and everything after it, including npm install) on every single code change, even a one-line fix. Fix: COPY package.json package-lock.json ./ then RUN npm install, THEN COPY . . afterward. Now npm install's layer is only invalidated when the lock file actually changes, and Docker reuses the cached dependency layer for ordinary code edits — turning a 2-minute install into a cached no-op." } },
              { level: 'intermediate', q: { en: "A test is failing only inside Docker, and you want to inspect the container's filesystem state at the exact moment of failure without killing it. What do you do?" }, a: { en: "docker exec -it container-name bash gives you a live shell inside the still-running container — you can cat config files, check if a generated file exists, or inspect environment variables exactly as the test process sees them, all without stopping anything. If the container already exited (test crashed and container stopped), use docker commit container-name debug-image to snapshot its filesystem into a new image you CAN start a shell in, since exec doesn't work on stopped containers. This is the Docker equivalent of attaching a debugger to a live JVM instead of only reading a post-mortem heap dump." } },
              // ── ADVANCED (extra) ────────────────────────────────
              { level: 'advanced', q: { en: 'Your security team flags that CI agents run Docker with full root/privileged access. How do you reduce this risk while still allowing Docker-based test pipelines?' }, a: { en: "Enable rootless Docker mode on the CI runner, so the Docker daemon itself runs as an unprivileged user — even if a container is compromised, it can't escalate to host root. For builds, replace Docker-in-Docker (which needs --privileged) with Kaniko or Buildah, which can build images without a privileged daemon at all. Also drop unnecessary Linux capabilities at runtime with --cap-drop=ALL --cap-add=NET_BIND_SERVICE (only add back what's truly needed). The overall principle mirrors least-privilege in any system: a CI job that only runs Selenium tests shouldn't have the same blast radius as one that manages infrastructure." } },
              { level: 'advanced', q: { en: 'Tests are flaky specifically on the shared CI Docker host but always pass on developer laptops. How do you diagnose and fix resource-contention-related flakiness?' }, a: { en: "First, correlate failure timestamps with `docker stats` output captured during the run — if memory/CPU spikes align with failures, it's contention, not a real bug. Set explicit --memory and --cpus limits per test container so one job's burst can't starve a neighboring job sharing the same host, and check the CI scheduler isn't overcommitting more parallel jobs than the host's actual core count. Increase explicit Selenium/Playwright wait timeouts slightly for CI-only config (not for local), since a busy shared host is genuinely slower than an idle laptop, not just unreliable. If a specific node consistently causes contention, consider isolating heavy services (e.g., the database) on a dedicated container with reserved resources rather than best-effort scheduling." } },
              { level: 'advanced', q: { en: 'You need a reusable base Docker image for Playwright tests across multiple repos/teams. What goes into designing that image and its versioning strategy?' }, a: { en: "Start from Playwright's official base image (mcr.microsoft.com/playwright) which ships matching browser binaries for a given Playwright version — never install browsers separately, since version mismatches between the npm package and browser binaries cause hard-to-debug failures. Layer your org's common fixtures, reporters, and CI helper scripts on top, then tag and publish to a private registry with semantic versioning (qa-base:2.3.0), never :latest, so teams pin a known-good version in their own Dockerfile (FROM registry.company.com/qa-base:2.3.0). Document a deprecation policy (e.g., support last 2 major versions) so teams have time to migrate when Playwright itself releases breaking changes. This is the same problem as maintaining a shared internal Maven parent POM — central control with explicit, opt-in version bumps." } },
              { level: 'advanced', q: { en: 'How would you integrate container image vulnerability scanning into a CI/CD pipeline without blocking every build on every minor CVE?' }, a: { en: "Add a scanning step (docker scout cves, Trivy, or Grype) right after the image build step, configured to fail the build only on HIGH/CRITICAL severity with a known fix available — low-severity or no-fix-yet findings get logged but don't block. Scan both your application layers AND the base image, since most vulnerabilities come from outdated base images, not your own code — a stale python:3.9 base can carry dozens of CVEs your Dockerfile never introduced. Re-scan on a schedule (not just on push) since new CVEs get published against images that haven't changed, and track exceptions with expiry dates rather than permanent ignores. The goal is risk-proportional gating, not zero-tolerance, which teams learn to route around if it's too noisy." } },
              { level: 'advanced', q: { en: 'How would you set up ephemeral, isolated test environments per pull request using Docker, so multiple PRs can be tested in parallel without port or data collisions?' }, a: { en: 'Use Docker Compose with a unique project name per PR (COMPOSE_PROJECT_NAME=pr-${PR_NUMBER}), which automatically namespaces containers, networks, and volumes so PR #123 and PR #124 never collide even on the same host. Avoid fixed host port publishing (don\'t do "8080:8080"); instead either let Docker pick a random host port ("8080") and look it up with docker compose port, or route everything through a reverse proxy keyed by hostname/subdomain per PR. Add a cleanup job (docker compose -p pr-${PR_NUMBER} down -v) triggered on PR close/merge so stale environments don\'t pile up and exhaust the CI host\'s resources. This pattern is what tools like Render/Vercel preview environments do under the hood, just hand-rolled with Compose.' } },
              { level: 'advanced', q: { en: "Jenkins agents get 'permission denied' errors when test containers try to use docker.sock, but you don't want to run the agent as root. How do you solve this securely?" }, a: { en: "Add the Jenkins agent's user to the host's docker group (usermod -aG docker jenkins) instead of running as root — this grants socket access without full root privileges, though it's worth noting docker group membership is effectively root-equivalent since you can mount the host filesystem via a container. A more isolated alternative: run an actual Docker-outside-of-Docker (DooD) setup where the agent container mounts the HOST's docker.sock (-v /var/run/docker.sock:/var/run/docker.sock) so containers it starts are siblings on the host, not nested — avoiding the --privileged requirement of true DinD. For stricter isolation, use a dedicated, ephemeral build-agent VM per pipeline run instead of a shared long-lived agent, so a compromised container can't persist access to other teams' pipelines." } },
              { level: 'advanced', q: { en: 'How do you decide whether a flaky integration test should be fixed at the test level or at the Docker/infrastructure level?' }, a: { en: "First classify the failure: if logs show a timeout or connection-refused right after container startup, it's an infra/timing issue (missing healthcheck, no depends_on condition) — fix in Docker/Compose, not in test retry logic. If logs show the app responded correctly but the test's assertion or selector was wrong/timing-sensitive, that's a test-code issue — adding container restart policies won't fix a bad locator. A practical rule: if the SAME test fails differently each time (different error each run), suspect infra/environment; if it fails the SAME way every time it fails, it's almost always a test logic bug. Blindly adding retries at the test level to mask infra flakiness just hides real instability and delays root-cause fixes." } },
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
    tabs: ['🎯 Giriş', '⚙️ Kurulum', '📦 Temel Komutlar', '🗂️ Dockerfile & Compose', '🧪 QA Kullanımı', '🔗 Ekosistem', '💼 Mülakat S&C'],
    sections: [
      // ── SECTION 0: INTRODUCTION (TR) ──────────────────────────────────────
      {
        title: '🎯 Docker Nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📦',
            content: 'Docker, yazılım için bir kargo konteyneri gibidir: fiziksel bir konteyner mobilya, elektronik veya yiyecek taşıyabilir ve her gemi, kamyon, vinç onu nasıl yükleyeceğini bilir — Docker container\'ları ise kodunu VE ihtiyaç duyduğu her bağımlılığı taşır, böylece her yerde birebir aynı şekilde çalışır. Peki neden kaynak kodu zip\'leyip göndermek yetmiyor? Çünkü bir Java JAR dosyası zaten derlenmiş class\'larını paketler ama uygulamanın sessizce bağımlı olduğu işletim sistemi paketlerini, native kütüphaneleri veya ortam değişkenlerini PAKETLEMEZ — Docker bunları da paketler. İşte tam olarak bu boşluk, klasik "benim makinemde çalışıyordu" production incident\'inin arkasındaki sebeptir: CI agent\'ında eksik bir sistem kütüphanesi, yeşil geçen yerel test suite\'ini kırmızı bir pipeline\'a çevirir.',
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
          ...dockerIntroInteractiveBlocks,
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
          
        retryQuestion: {
      "question": "Docker dünyasında 'Image' ve 'Container' kavramları arasındaki ilişkiyi en iyi hangisi tanımlar?",
      "options": [
            {
                  "id": "a",
                  "text": "Container'lar image'ları oluşturmak için kullanılan kaynak kodlardır"
            },
            {
                  "id": "b",
                  "text": "Image'lar sadece depolama alanlarıdır, container'lar ise network katmanıdır"
            },
            {
                  "id": "c",
                  "text": "Image, uygulamanın çalışması için gerekli tüm dosyaları içeren sabit bir pakettir; container ise bu paketin canlı çalışma ortamıdır"
            },
            {
                  "id": "d",
                  "text": "Container'lar image'ların bir üst versiyonudur"
            }
      ],
      "correct": "c",
      "explanation": "Image'lar uygulamayı çalıştırmak için gereken kod, runtime ve kütüphaneleri içeren değişmez (immutable) dosyalardır. Container ise bu image'ın bir çalışma zamanı kopyasıdır ve üzerinde yapılan değişiklikler canlı olarak gerçekleşir."
    }
  },
  {
    type: 'simulation',
    icon: '🐳',
    color: '#1D63ED',
    title: { tr: 'Docker Konteyner Yaşam Döngüsü', en: 'Docker Container Lifecycle' },
    scenario: 'docker-lifecycle',
    description: {
      tr: '"▶ Run Demo" butonuna basarak bir Docker konteynerinin çekilmesi (pull), çalıştırılması (run), içinde komut koşturulması (exec) ve durdurulması (stop) süreçlerini canlı izle.',
      en: 'Press "▶ Run Demo" to watch a container being pulled, run, executing commands internally, and stopped in real-time.'
    },
    code: `# Pull the image from registry
docker pull nginx:latest

# Run the container in detached mode
docker run -d -p 8080:80 --name my-nginx nginx

# Execute command inside container
docker exec -it my-nginx ls /usr/share/nginx/html

# Stop the container
docker stop my-nginx`,
    language: 'bash'
  }
],
},

      // ── SECTION 1: INSTALLATION (TR) ──────────────────────────────────────
      {
        title: '⚙️ Docker Kurulumu',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Windows/Mac\'te Docker Desktop, otomatik vitesli bir kiralık araba gibidir: motor, CLI, Compose ve görsel arayüz bir arada gelir, hemen sürmeye başlarsın. Linux\'ta Docker Engine\'i doğrudan kurmak ise manuel vites versiyonudur — daha hafif, daha hızlı, fazladan katman yok. Peki Linux neden Windows/Mac\'in ihtiyaç duyduğu o GUI katmanını atlıyor? Çünkü Linux container\'ları doğrudan bir Linux kernel\'i üzerinde native çalışır, Windows/Mac ise altta Docker Desktop\'ın senin için sessizce yönettiği hafif bir VM\'e ihtiyaç duyar — tıpkı bir JVM\'in Linux sunucularda native çalışırken bazı gömülü Windows/Mac kurulumlarında fazladan runtime altyapısına ihtiyaç duyması gibi. QA riski şurada: CI pipeline\'ın neredeyse her zaman sade Linux Engine üzerinde çalışır, yani Mac\'indeki Docker Desktop\'ta sorunsuz davranan bir container, gerçek CI ortamında seni şaşırtabilir — her zaman yerelde değil, gerçek pipeline üzerinde doğrula.',
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
          ...dockerInstallationInteractiveBlocks,
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
          
        retryQuestion: {
      "question": "Docker Desktop'ın modern Windows kurulumlarında Linux tabanlı container'lar için varsayılan olarak tercih ettiği çalışma ortamı/teknoloji hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "QEMU"
            },
            {
                  "id": "b",
                  "text": "Docker Machine"
            },
            {
                  "id": "c",
                  "text": "WSL 2 (Windows Subsystem for Linux)"
            },
            {
                  "id": "d",
                  "text": "Native Windows Hypervisor"
            }
      ],
      "correct": "c",
      "explanation": "WSL 2, Windows üzerinde gerçek bir Linux çekirdeği çalıştırarak Docker container'larının yüksek performanslı ve düşük kaynak tüketen bir şekilde çalışmasını sağlar. Eski sürümlerde Hyper-V doğrudan kullanılırken, güncel Docker Desktop yapılandırması WSL 2 entegrasyonu üzerine kuruludur."
    }
  },
  {
    type: 'visual',
    variant: 'boxes',
    title: { tr: 'Windows Üzerinde Docker Desktop Mimarisi', en: 'Docker Desktop Architecture on Windows' },
    items: [
      { icon: '💻', label: { tr: 'Windows Host OS', en: 'Windows Host OS' }, desc: { tr: 'Ana işletim sistemi ve GUI arayüzü', en: 'Main operating system and GUI interface' } },
      { arrow: true },
      { icon: '🐧', label: { tr: 'WSL 2 Linux Çekirdeği', en: 'WSL 2 Linux Kernel' }, desc: { tr: 'Windows içindeki hafif sanal Linux', en: 'Lightweight virtual Linux inside Windows' }, highlight: true },
      { arrow: true },
      { icon: '🐳', label: { tr: 'Docker Daemon', en: 'Docker Daemon' }, desc: { tr: 'Konteynerleri yöneten arka plan servisi', en: 'Background service managing containers' } },
      { arrow: true },
      { icon: '📦', label: { tr: 'Konteynerler', en: 'Containers' }, desc: { tr: 'İzole çalışan uygulamalar', en: 'Isolated running applications' } }
    ],
    note: { tr: 'Docker Desktop, WSL 2 sayesinde Windows üzerinde yerel Linux performansına yakın çalışır.', en: 'Docker Desktop achieves near-native Linux performance on Windows using WSL 2.' }
  }
],
},

      // ── SECTION 2: CORE COMMANDS (TR) ─────────────────────────────────────
      {
        title: '📦 Temel Docker Komutları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⌨️',
            content: 'Docker komutları katı bir "docker [nesne] [eylem]" kalıbını takip eder — kütüphane sistemi gibi: kitap ara (image), ödünç al (pull), oku (run), bitince iade et (stop/rm). Peki neden her komuta ayrı bir isim verip flag\'leri ezberletmiyorlar? Çünkü tutarlı bir nesne+fiil yapısı, her yeni kaynak tipinde (image, container, volume, network) yeni bir zihinsel model kurmaya zorlamadan onlarca kaynak tipine ölçeklenir — tıpkı Java\'da Collections framework\'ünün veya Stream API\'nin (filter/map/collect) tek bir kalıbı her koleksiyon tipinde tekrar kullandırması gibi. Bir CI script\'inde bu tutarlılık, her kaynak için ayrı özel mantık yazmak yerine "docker [nesne] prune" çağıran tek bir genel temizlik fonksiyonu yazabilmen anlamına gelir.',
          },
          { type: 'heading', text: 'Image Komutları' },
          {
            type: 'code',
            language: 'bash',
            label: 'Image çekme ve arama',
            code: `# Docker Hub\'dan image çek
docker pull python:3.12-slim       # Python 3.12 slim image\'ı indir
docker pull nginx:latest           # Son Nginx sürümünü indir
docker pull postgres:16            # PostgreSQL 16\'yı indir

# Docker Hub\'da image ara
docker search selenium`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Yukarıdaki "📦 Temel Komutlar" sekmesinin altındaki Docker Sandbox\'ta dene: docker pull nginx yaz ve IMAGES rafının canlı güncellendiğini gör.',
              en: 'Try it in the Docker Sandbox further down this "Core Commands" tab: type docker pull nginx and watch the IMAGES shelf update live.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Image\'ları listeleme, inceleme ve silme',
            code: `# İndirilen image\'ları listele
docker images
docker image ls                    # Aynı şey

# Image detaylarını incele
docker inspect python:3.12-slim

# Image\'ı sil (önce kullanan tüm container\'ları durdur)
docker rmi python:3.12-slim        # Ad:etiket ile sil
docker image rm abc123def456       # Image ID ile sil

# Kullanılmayan tüm image\'ları sil (temizlik)
docker image prune -a`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-image-lifecycle-order-01',
            question: { tr: 'Bir image ile ilk defa çalışırken doğru komut sırasını diz.', en: 'Arrange the correct command order for working with an image for the first time.' },
            items: [
              { id: '1', text: { tr: 'Docker Hub\'da image ara (docker search)', en: 'Search Docker Hub for the image (docker search)' }, order: 1 },
              { id: '2', text: { tr: 'Image\'ı indir (docker pull)', en: 'Download the image (docker pull)' }, order: 2 },
              { id: '3', text: { tr: 'İndirilen image\'ları listele (docker images)', en: 'List downloaded images (docker images)' }, order: 3 },
              { id: '4', text: { tr: 'Detaylarını incele (docker inspect)', en: 'Inspect its details (docker inspect)' }, order: 4 },
              { id: '5', text: { tr: 'Artık kullanmıyorsan sil (docker rmi)', en: 'Remove it once no longer needed (docker rmi)' }, order: 5 },
            ],
            xpReward: 10,
          },
          { type: 'heading', text: 'Container Komutları' },
          {
            type: 'code',
            language: 'bash',
            label: 'Container başlatma temelleri',
            code: `# Container çalıştır (oluştur VE başlat)
docker run nginx                   # Nginx çalıştır (ön planda — terminal bloke)
docker run -d nginx                # -d = detached (arka planda)
docker run -d --name my-nginx nginx    # --name = özel ad
docker run -d -p 8080:80 nginx     # -p host:container port eşlemesi`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Bu tam olarak aşağıdaki sandbox\'ın 2. görevi: docker run -d -p 8080:80 --name web nginx yaz ve CONTAINERS panelinde yeşil nabız atan kutuyu izle.',
              en: 'This is exactly mission 2 in the sandbox below: type docker run -d -p 8080:80 --name web nginx and watch the green pulsing box appear in the CONTAINERS panel.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Production tarzı run — tüm flag\'lerle birlikte',
            code: `docker run -d \\
  --name my-container \\           # Container\'a ad ver
  -p 8080:80 \\                    # Host 8080 → Container 80
  -e APP_ENV=staging \\            # Environment variable ayarla
  -v /host/dizin:/container/dizin \\ # Volume mount et
  --restart unless-stopped \\     # Otomatik yeniden başlatma
  python:3.12-slim \\              # Kullanılacak image
  python app.py                    # Çalıştırılacak komut`,
          },
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-run-flags-practice',
            id: 'docker-core-run-flags-practice',
            label: { tr: 'Pratik: Production tarzı run flag\'lerini tamamla', en: 'Practice: Complete a production-style run command' },
            language: 'bash',
            task: {
              tr: 'Amaç: staging ortamında, 9090 host portunu 80 container portuna bağlayan ve container çökerse otomatik yeniden başlayan bir python:3.12-slim container\'ı çalıştır.',
              en: 'Goal: run a python:3.12-slim container in the staging environment, mapping host port 9090 to container port 80, that restarts automatically if it crashes.',
            },
            explanation: {
              tr: 'Ortam değişkeni için -e, port eşlemesi için -p, otomatik yeniden başlatma için --restart flag\'lerini doğru sırayla doldur.',
              en: 'Fill in -e for the environment variable, -p for the port mapping, and --restart for the auto-restart policy, in the right places.',
            },
            code: {
              tr: `docker run -d \\
  --name staging-app \\
  -p 9090:80 \\
  -e APP_ENV=staging \\
  --restart unless-stopped \\
  python:3.12-slim`,
              en: `docker run -d \\
  --name staging-app \\
  -p 9090:80 \\
  -e APP_ENV=staging \\
  --restart unless-stopped \\
  python:3.12-slim`,
            },
            starterCode: {
              tr: `docker run -d \\
  --name staging-app \\
  ___ 9090:80 \\
  ___ APP_ENV=staging \\
  ___ unless-stopped \\
  python:3.12-slim`,
              en: `docker run -d \\
  --name staging-app \\
  ___ 9090:80 \\
  ___ APP_ENV=staging \\
  ___ unless-stopped \\
  python:3.12-slim`,
            },
            solutionCode: {
              tr: `docker run -d \\
  --name staging-app \\
  -p 9090:80 \\
  -e APP_ENV=staging \\
  --restart unless-stopped \\
  python:3.12-slim`,
              en: `docker run -d \\
  --name staging-app \\
  -p 9090:80 \\
  -e APP_ENV=staging \\
  --restart unless-stopped \\
  python:3.12-slim`,
            },
            expected: {
              tr: `staging-app container'ı 9090:80 port eşlemesiyle çalışıyor.
APP_ENV=staging olarak ayarlandı.
Çökerse otomatik yeniden başlayacak.`,
              en: `staging-app container is running with port mapping 9090:80.
APP_ENV is set to staging.
It will restart automatically if it crashes.`,
            },
            hints: [
              { tr: 'Port eşlemesi her zaman -p HOST:CONTAINER şeklindedir.', en: 'Port mapping always follows -p HOST:CONTAINER.' },
              { tr: 'Ortam değişkeni tanımlamak için -e ANAHTAR=DEĞER kullanılır.', en: 'Use -e KEY=VALUE to define an environment variable.' },
              { tr: 'Otomatik yeniden başlatma politikası --restart flag\'i ile verilir, örn: --restart unless-stopped.', en: 'The auto-restart policy is given with the --restart flag, e.g. --restart unless-stopped.' },
            ],
            xpReward: 15,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Container\'ları listeleme',
            code: `# Container\'ları listele
docker ps                          # Sadece çalışan container\'lar
docker ps -a                       # TÜM container\'lar (durdurulmuş dahil)`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Sandbox\'ta docker ps yaz — 3. görev bu şekilde tamamlanır ve çalışan container\'ların tablosunu terminalde canlı görürsün.',
              en: 'Type docker ps in the sandbox — this completes mission 3 and shows you a live table of running containers right in the terminal.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Yaşam döngüsü — durdur, başlat, yeniden başlat',
            code: `# Durdur/Başlat/Yeniden Başlat
docker stop my-container           # Zarif durdur (SIGTERM, sonra SIGKILL)
docker start my-container          # Durdurulmuş container\'ı başlat
docker restart my-container        # Durdur sonra başlat`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Sandbox\'ta docker stop web dene — 5. görevin ilk adımı budur. Container yeşilden griye döner ama silinmez, tıpkı yukarıdaki komutta olduğu gibi.',
              en: 'Try docker stop web in the sandbox — this is the first half of mission 5. The container turns from green to grey but is not removed, exactly like the command above.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Container\'ları silme',
            code: `# Container\'ları sil
docker rm my-container             # Durdurulmuş container\'ı sil
docker rm -f my-container          # Zorla sil (çalışıyor olsa bile)
docker container prune             # Durdurulmuş TÜM container\'ları sil`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Sandbox\'ta ÇALIŞAN bir container\'ı -f\'siz docker rm ile silmeyi dene — gerçek Docker daemon\'ının verdiği "container is running" hatasını birebir göreceksin, sonra docker rm -f ile zorla sil ve 5. görevi tamamla.',
              en: 'Try running docker rm without -f on a RUNNING container in the sandbox — you will see the exact "container is running" error the real Docker daemon returns, then force it with docker rm -f to complete mission 5.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Log inceleme',
            code: `# Log\'lar
docker logs my-container           # Tüm log\'ları yazdır
docker logs -f my-container        # Log\'ları gerçek zamanlı takip et (tail -f gibi)
docker logs --tail 50 my-container # Son 50 satır`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: {
              tr: 'Sandbox\'ta docker logs web yaz — 4. görev bu satırla tamamlanır ve nginx\'in gerçekçi başlangıç log satırlarını görürsün.',
              en: 'Type docker logs web in the sandbox — this completes mission 4 and shows nginx\'s realistic startup log lines.',
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Container içinde komut çalıştırma ve dosya kopyalama',
            code: `# Çalışan container içinde komut çalıştır
docker exec -it my-container bash  # İnteraktif bash shell aç
docker exec my-container ls /app   # İnteraktif olmadan komut çalıştır

# Host ve container arasında dosya kopyala
docker cp my-container:/app/reports ./reports  # Container → host
docker cp ./tests my-container:/app/tests       # Host → container`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-debug-flow-order-01',
            question: { tr: 'Çalışan bir container içindeki test raporlarını incelemek için doğru akışı diz.', en: 'Arrange the correct flow for inspecting test reports inside a running container.' },
            items: [
              { id: '1', text: { tr: 'docker ps ile container\'ın çalıştığını doğrula', en: 'Verify the container is running with docker ps' }, order: 1 },
              { id: '2', text: { tr: 'docker exec -it ile container içine gir', en: 'Enter the container with docker exec -it' }, order: 2 },
              { id: '3', text: { tr: 'ls /app/reports ile dosyaları listele', en: 'List the files with ls /app/reports' }, order: 3 },
              { id: '4', text: { tr: 'docker cp ile raporu host makineye kopyala', en: 'Copy the report to the host machine with docker cp' }, order: 4 },
              { id: '5', text: { tr: 'Host\'taki raporu tarayıcıda aç', en: 'Open the report on the host in a browser' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'docker-sandbox',
            missions: [
              { id: 'pull-hello', text: { tr: "hello-world image'ını pull et", en: 'Pull the hello-world image' } },
              { id: 'run-web', text: { tr: "nginx'i arka planda (-d), 8080:80 port eşlemesiyle ve 'web' adıyla çalıştır", en: "Run nginx detached (-d) with port mapping 8080:80, named 'web'" } },
              { id: 'ps-list', text: { tr: "Çalışan container'ları listele (docker ps)", en: 'List running containers (docker ps)' } },
              { id: 'logs-web', text: { tr: "'web' container'ının loglarına bak", en: "Check the logs of the 'web' container" } },
              { id: 'clean-web', text: { tr: "'web'i durdur ve sil (stop + rm)", en: "Stop and remove 'web' (stop + rm)" } },
            ],
          },
          {
            type: 'simulation',
            icon: '🐳',
            color: '#0369a1',
            title: { tr: 'Dockerfile Derleme & Port Eşleme — Canlı Demo', en: 'Dockerfile Build & Port Mapping — Live Demo' },
            scenario: 'docker-build-port-mapping',
            description: {
              tr: '"▶ Resim Derle & Çalıştır" butonuna bas: Dockerfile\'ın satır satır çalışmasını, katmanların üst üste binmesini ve port eşlemesini parıldayan kablo akışıyla izle.',
              en: 'Press "▶ Build & Run Image": Watch the Dockerfile execute line-by-line, layers stacking on top of each other, and port mapping connected via a glowing pulsing cable.'
            },
            code: `# 1. Build the image from Dockerfile
docker build -t my-app .

# 2. Run the container with port mapping
docker run -d -p 8080:80 --name my-running-app my-app

# 3. Scale and persist data with volumes
docker run -d -p 8081:80 -v db_data:/app/data --name my-persistent-app my-app`,
            language: 'bash'
          },
          { type: 'heading', text: 'Volume Komutları (Kalıcı Depolama)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Adlandırılmış volume\'ler — oluştur, listele, incele, sil',
            code: `# Adlandırılmış volume\'ler — Docker tarafından yönetilir
docker volume create test-data         # Adlandırılmış volume oluştur
docker volume ls                        # Tüm volume\'leri listele
docker volume inspect test-data         # Volume detaylarını göster
docker volume rm test-data             # Volume sil
docker volume prune                    # Kullanılmayan volume\'leri sil`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-volume-lifecycle-order-01',
            question: { tr: 'Kalıcı bir test veritabanı volume\'ünün yaşam döngüsünü doğru sıraya diz.', en: 'Arrange the lifecycle of a persistent test-database volume in the correct order.' },
            items: [
              { id: '1', text: { tr: 'Adlandırılmış volume\'ü oluştur (docker volume create)', en: 'Create the named volume (docker volume create)' }, order: 1 },
              { id: '2', text: { tr: 'Container\'ı bu volume\'ü mount ederek çalıştır (-v)', en: 'Run the container mounting that volume (-v)' }, order: 2 },
              { id: '3', text: { tr: 'Container durdurulup silinse bile veri volume\'de kalır', en: 'Data survives in the volume even if the container is stopped and removed' }, order: 3 },
              { id: '4', text: { tr: 'İçeriğini doğrulamak için docker volume inspect kullan', en: 'Use docker volume inspect to verify its contents' }, order: 4 },
              { id: '5', text: { tr: 'Artık ihtiyaç yoksa docker volume rm ile temizle', en: 'Clean it up with docker volume rm once no longer needed' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Çalıştırırken adlandırılmış volume mount etme',
            code: `# Çalıştırırken volume mount et
docker run -d \\
  -v test-data:/app/data \\  # Adlandırılmış volume: test-data → container içinde /app/data
  python:3.12-slim`,
          },
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-volume-mount-practice',
            id: 'docker-core-volume-mount-practice',
            label: { tr: 'Pratik: Adlandırılmış volume\'ü doğru mount et', en: 'Practice: Mount a named volume correctly' },
            language: 'bash',
            task: {
              tr: 'Amaç: qa-db-data adında bir volume\'ü postgres:16 container\'ının /var/lib/postgresql/data dizinine bağlayarak çalıştır — veritabanı verisi container silinse bile hayatta kalsın.',
              en: 'Goal: run postgres:16 mounting a volume named qa-db-data at /var/lib/postgresql/data — so database data survives even if the container is removed.',
            },
            explanation: {
              tr: '-v flag\'inin sözdizimi her zaman KAYNAK:HEDEF şeklindedir; kaynak burada volume adıdır, hedef container içindeki dizindir.',
              en: 'The -v flag syntax is always SOURCE:TARGET; here the source is the volume name and the target is the directory inside the container.',
            },
            code: {
              tr: `docker run -d \\
  --name qa-db \\
  -v qa-db-data:/var/lib/postgresql/data \\
  postgres:16`,
              en: `docker run -d \\
  --name qa-db \\
  -v qa-db-data:/var/lib/postgresql/data \\
  postgres:16`,
            },
            starterCode: {
              tr: `docker run -d \\
  --name qa-db \\
  -v ___:___ \\
  postgres:16`,
              en: `docker run -d \\
  --name qa-db \\
  -v ___:___ \\
  postgres:16`,
            },
            solutionCode: {
              tr: `docker run -d \\
  --name qa-db \\
  -v qa-db-data:/var/lib/postgresql/data \\
  postgres:16`,
              en: `docker run -d \\
  --name qa-db \\
  -v qa-db-data:/var/lib/postgresql/data \\
  postgres:16`,
            },
            expected: {
              tr: `qa-db container'ı çalışıyor.
Volume: qa-db-data → /var/lib/postgresql/data bağlandı.`,
              en: `qa-db container is running.
Volume: qa-db-data → /var/lib/postgresql/data mounted.`,
            },
            hints: [
              { tr: '-v flag\'inin sol tarafı volume adı, sağ tarafı container içindeki dizin yoludur.', en: 'The left side of -v is the volume name, the right side is the path inside the container.' },
              { tr: 'PostgreSQL veritabanı dosyalarını her zaman /var/lib/postgresql/data dizininde tutar.', en: 'PostgreSQL always keeps its database files under /var/lib/postgresql/data.' },
              { tr: 'İki nokta üst üste (:) volume adını hedef yoldan ayırır, boşluk değil.', en: 'A colon (:) separates the volume name from the target path — not a space.' },
            ],
            xpReward: 15,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Bind mount ve gerçek bir QA senaryosu',
            code: `# Bind mount — host dizini mount et
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-bind-mount-practice',
            id: 'docker-core-bind-mount-practice',
            label: { tr: 'Pratik: Test sonuçlarını host makinede kalıcı tut', en: 'Practice: Persist test results on the host machine' },
            language: 'bash',
            task: {
              tr: 'Amaç: my-test-image\'i --rm ile bir kerelik çalıştır ama JUnit raporunun host\'taki ./allure-results klasöründe kalıcı olmasını sağla.',
              en: 'Goal: run my-test-image once with --rm, but make sure the JUnit report persists in the ./allure-results folder on the host.',
            },
            explanation: {
              tr: 'Bind mount ile host\'taki bir klasörü ($(pwd)/allure-results) container içindeki /app/results ile eşleştir, sonra pytest çıktısını o dizine yönlendir.',
              en: 'Bind-mount a host folder ($(pwd)/allure-results) to /app/results inside the container, then point the pytest output at that directory.',
            },
            code: {
              tr: `docker run --rm \\
  -v $(pwd)/allure-results:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
              en: `docker run --rm \\
  -v $(pwd)/allure-results:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
            },
            starterCode: {
              tr: `docker run --rm \\
  -v $(pwd)/___:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
              en: `docker run --rm \\
  -v $(pwd)/___:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
            },
            solutionCode: {
              tr: `docker run --rm \\
  -v $(pwd)/allure-results:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
              en: `docker run --rm \\
  -v $(pwd)/allure-results:/app/results \\
  my-test-image \\
  pytest tests/ --junitxml=/app/results/junit.xml`,
            },
            expected: {
              tr: `Test koşumu bitince container --rm ile otomatik silindi.
junit.xml host'ta ./allure-results klasöründe hâlâ duruyor.`,
              en: `The container was auto-removed by --rm after the test run.
junit.xml still exists on the host in ./allure-results.`,
            },
            hints: [
              { tr: '$(pwd) her zaman şu anki host dizinini verir — klasör adını onun yanına ekle.', en: '$(pwd) always resolves to the current host directory — append the folder name to it.' },
              { tr: 'İstenen host klasörü "allure-results" olarak belirtiliyor, boşluğa onu yaz.', en: 'The requested host folder is "allure-results" — write it in the blank.' },
              { tr: '--rm container\'ı siler ama bind mount edilen host klasörü SİLİNMEZ, veri orada kalır.', en: '--rm removes the container, but the bind-mounted host folder is NOT deleted — the data stays there.' },
            ],
            xpReward: 15,
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
          ...dockerCoreCommandInteractiveBlocks,
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
          
        retryQuestion: {
      "question": "Bir Docker container'ını terminalden bağımsız olarak, arka planda çalıştırmak istediğimizde kullanılan parametre hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "docker run -it nginx"
            },
            {
                  "id": "b",
                  "text": "docker run -d nginx"
            },
            {
                  "id": "c",
                  "text": "docker run --hidden nginx"
            },
            {
                  "id": "d",
                  "text": "docker run -b nginx"
            }
      ],
      "correct": "b",
      "explanation": "-d (detached) modu, container'ın ana süreç (process) olarak arka planda çalışmasını sağlar. Bu sayede container çıktısı terminale yansımaz ve terminalinizi kullanmaya devam edebilirsiniz."
}
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
            content: 'Dockerfile, kendi image\'ını inşa etmek için bir tariftir — her satır bir adımdır ve bir katman olarak pişer. Docker Compose ise aynı anda birden fazla müzisyeni başlatan şef gibidir: 5 ayrı "docker run" komutunu elle yazmak yerine, tek bir "docker compose up" uygulamanı, veritabanını ve test runner\'ını doğru sırayla bir arada ayağa kaldırır. Peki neden her şeyi tek bir dev Dockerfile\'da başlatmıyoruz? Çünkü uygulama + veritabanı + test runner\'ı tek bir image\'da karıştırmak, birbiriyle hiç ilgisi olmayan yaşam döngülerini birbirine kenetler — uygulama kodunda tek satır düzeltsen bile veritabanı image\'ını yeniden derlemiş olursun. Bu, Java\'da birbiriyle alakasız sorumlulukları tek bir class\'a tıkıştırmamanın arkasındaki mantıkla aynıdır; Compose\'un YAML\'ı aslında altyapı seviyesinde bir dependency injection\'dır, ayrı ayrı versiyonlanan servisleri birbirine bağlar. QA mühendisi için bunun somut karşılığı şudur: flaky bir integration testi çoğu zaman senin test kodundan değil, test runner\'ı veritabanı container\'ının health check\'i bitmeden başlatan bir "docker compose up"tan kaynaklanır.',
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
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-dockerfile-order-01',
            question: { tr: 'Bir Dockerfile\'ın cache-dostu talimat sırasını diz.', en: 'Arrange the cache-friendly instruction order for a Dockerfile.' },
            items: [
              { id: '1', text: { tr: 'FROM ile temel image seçilir', en: 'FROM selects the base image' }, order: 1 },
              { id: '2', text: { tr: 'WORKDIR ile çalışma dizini ayarlanır', en: 'WORKDIR sets the working directory' }, order: 2 },
              { id: '3', text: { tr: 'Sadece requirements.txt kopyalanır ve bağımlılıklar kurulur (RUN)', en: 'Only requirements.txt is copied and dependencies are installed (RUN)' }, order: 3 },
              { id: '4', text: { tr: 'Projenin geri kalanı kopyalanır (COPY . .)', en: 'The rest of the project is copied (COPY . .)' }, order: 4 },
              { id: '5', text: { tr: 'CMD ile container başlayınca çalışacak komut belirlenir', en: 'CMD defines the command that runs when the container starts' }, order: 5 },
            ],
            xpReward: 10,
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-multistage-practice',
            id: 'docker-core-multistage-practice',
            label: { tr: 'Pratik: Multi-stage build\'de builder aşamasından dosya taşı', en: 'Practice: Copy files from the builder stage in a multi-stage build' },
            language: 'dockerfile',
            task: {
              tr: 'Amaç: builder aşamasında kurulan bağımlılıkları, runtime aşamasına build araçlarını TEKRAR kurmadan taşı.',
              en: 'Goal: carry the dependencies installed in the builder stage into the runtime stage WITHOUT reinstalling build tools.',
            },
            explanation: {
              tr: 'COPY --from=<aşama adı> ile önceki aşamadan dosya kopyalanır. Aşama adı FROM ... AS builder satırındaki isimdir.',
              en: 'COPY --from=<stage name> copies files from a previous stage. The stage name is whatever follows FROM ... AS builder.',
            },
            code: {
              tr: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .`,
              en: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .`,
            },
            starterCode: {
              tr: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY ___=builder /root/.local /root/.local
COPY . .`,
              en: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY ___=builder /root/.local /root/.local
COPY . .`,
            },
            solutionCode: {
              tr: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .`,
              en: `FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .`,
            },
            expected: {
              tr: `runtime aşaması builder'daki paketleri devralır.
Final image build araçlarını içermez, daha küçüktür.`,
              en: `The runtime stage inherits the builder's packages.
The final image excludes build tools and is smaller.`,
            },
            hints: [
              { tr: 'Bir önceki aşamadan dosya taşımak için özel bir COPY seçeneği vardır.', en: 'There is a special COPY option for pulling files from a previous stage.' },
              { tr: 'Bu seçenek --from= şeklinde yazılır, sonrasında aşama adı gelir.', en: 'That option is written as --from=, followed by the stage name.' },
              { tr: 'Aşama adı, ilk FROM satırındaki "AS builder" ifadesiyle verilen isimdir.', en: 'The stage name is whatever was given after "AS builder" in the first FROM line.' },
            ],
            xpReward: 15,
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-dockerignore-practice',
            id: 'docker-core-dockerignore-practice',
            label: { tr: 'Pratik: Build\'i yavaşlatan eksik satırı bul', en: 'Practice: Spot the missing line slowing down the build' },
            language: 'bash',
            task: {
              tr: 'Amaç: .dockerignore\'da node_modules/ satırı unutulmuş — bu, build context\'in gereksiz yere yüzlerce MB büyümesine ve build\'in yavaşlamasına yol açar. Eksik satırı ekle.',
              en: 'Goal: the node_modules/ line is missing from .dockerignore — this bloats the build context by hundreds of MB and slows down the build. Add the missing line.',
            },
            explanation: {
              tr: '.dockerignore\'daki her satır, Docker\'ın build context\'e hiç dahil etmeyeceği bir dosya/klasör deseni tanımlar — .gitignore ile aynı sözdizimi.',
              en: 'Each line in .dockerignore defines a file/folder pattern Docker will never include in the build context — same syntax as .gitignore.',
            },
            code: {
              tr: `__pycache__/
*.pyc
.env
.git/
node_modules/
.pytest_cache/`,
              en: `__pycache__/
*.pyc
.env
.git/
node_modules/
.pytest_cache/`,
            },
            starterCode: {
              tr: `__pycache__/
*.pyc
.env
.git/
___
.pytest_cache/`,
              en: `__pycache__/
*.pyc
.env
.git/
___
.pytest_cache/`,
            },
            solutionCode: {
              tr: `__pycache__/
*.pyc
.env
.git/
node_modules/
.pytest_cache/`,
              en: `__pycache__/
*.pyc
.env
.git/
node_modules/
.pytest_cache/`,
            },
            expected: {
              tr: `Build context artık node_modules/ içermiyor.
Build süresi ve image boyutu belirgin şekilde küçüldü.`,
              en: `The build context no longer includes node_modules/.
Build time and image size dropped noticeably.`,
            },
            hints: [
              { tr: 'Bu proje JavaScript bağımlılıkları için npm/node kullanıyor.', en: 'This project uses npm/node for JavaScript dependencies.' },
              { tr: 'Node.js projelerinde bağımlılıklar hep aynı isimli klasörde toplanır.', en: 'In Node.js projects, dependencies always live in a folder with the same name.' },
              { tr: 'Aradığın klasör adı "node_modules/" — sonunda / olmalı çünkü bir klasördür.', en: 'The folder you need is "node_modules/" — it ends with / because it is a directory.' },
            ],
            xpReward: 10,
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-compose-healthcheck-practice',
            id: 'docker-core-compose-healthcheck-practice',
            label: { tr: 'Pratik: app servisinin doğru host adına bağlandığından emin ol', en: 'Practice: Make sure the app service points at the correct hostname' },
            language: 'yaml',
            task: {
              tr: 'Amaç: app servisinin DATABASE_URL\'i localhost\'a değil, Compose\'daki db servisinin adına işaret etmeli — Compose network\'ünde container\'lar birbirine servis adıyla ulaşır, localhost ile değil.',
              en: 'Goal: the app service\'s DATABASE_URL must point at the db SERVICE NAME, not localhost — inside a Compose network, containers reach each other by service name, not localhost.',
            },
            explanation: {
              tr: 'docker-compose.yml\'deki "db:" servis adı, aynı network\'teki diğer container\'lar için bir DNS hostname\'idir. localhost her container kendi İÇİNİ işaret eder.',
              en: 'The "db:" service name in docker-compose.yml is a DNS hostname for other containers on the same network. localhost always points INSIDE each container itself.',
            },
            code: {
              tr: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testkullanici:testparola@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
              en: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testuser:testpass@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
            },
            starterCode: {
              tr: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testkullanici:testparola@___:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
              en: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testuser:testpass@___:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
            },
            solutionCode: {
              tr: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testkullanici:testparola@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
              en: `app:
    build: .
    environment:
      DATABASE_URL: postgresql://testuser:testpass@db:5432/testdb
    depends_on:
      db:
        condition: service_healthy`,
            },
            expected: {
              tr: `app container'ı db'ye "db" hostname'i üzerinden bağlanıyor.
Bağlantı hatası (ECONNREFUSED) yok.`,
              en: `The app container connects to db via the "db" hostname.
No connection error (ECONNREFUSED).`,
            },
            hints: [
              { tr: 'Compose network\'ünde host adı, docker-compose.yml\'deki servis adıyla AYNIDIR.', en: 'The hostname on a Compose network is IDENTICAL to the service name in docker-compose.yml.' },
              { tr: 'Bu dosyada veritabanı servisinin adı "db:" olarak tanımlı.', en: 'In this file, the database service is defined under the name "db:".' },
              { tr: 'localhost yazarsan app container kendi içindeki (var olmayan) bir veritabanına bağlanmaya çalışır.', en: 'If you write localhost, the app container tries to reach a (nonexistent) database inside itself.' },
            ],
            xpReward: 15,
          },
          { type: 'heading', text: 'Docker Compose Komutları' },
          {
            type: 'code',
            language: 'bash',
            label: 'Servisleri başlatma, durdurma ve yeniden derleme',
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
docker compose up --scale tests=3`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-compose-workflow-order-01',
            question: { tr: 'Bir QA test ortamını Compose ile sıfırdan ayağa kaldırma akışını diz.', en: 'Arrange the flow for bringing up a QA test environment with Compose from scratch.' },
            items: [
              { id: '1', text: { tr: 'Dockerfile değiştiyse image\'ları yeniden derle (up --build)', en: 'Rebuild images if the Dockerfile changed (up --build)' }, order: 1 },
              { id: '2', text: { tr: 'Tüm servisleri arka planda başlat (up -d)', en: 'Start all services in the background (up -d)' }, order: 2 },
              { id: '3', text: { tr: 'Test runner loglarını canlı takip et (logs -f)', en: 'Follow the test runner logs live (logs -f)' }, order: 3 },
              { id: '4', text: { tr: 'Testler bitince ortamı kapat (down)', en: 'Shut the environment down when tests finish (down)' }, order: 4 },
              { id: '5', text: { tr: 'Veritabanını da tamamen sıfırlamak istiyorsan volume\'leri de sil (down -v)', en: 'If you also want a clean database, remove volumes too (down -v)' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Log\'lar, tek seferlik komutlar ve durum',
            code: `# Log\'ları görüntüle
docker compose logs               # Tüm servisler
docker compose logs app           # Tek servis
docker compose logs -f app        # Takip et (gerçek zamanlı)

# Tek seferlik komut çalıştır
docker compose run tests pytest tests/api/ -v

# Servis durumunu kontrol et
docker compose ps`,
          },
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-compose-run-oneoff-practice',
            id: 'docker-core-compose-run-oneoff-practice',
            label: { tr: 'Pratik: Sadece bir API test alt kümesini bir kerelik çalıştır', en: 'Practice: Run just one API test subset as a one-off command' },
            language: 'bash',
            task: {
              tr: 'Amaç: Tüm ortamı yeniden başlatmadan, sadece tests servisini kullanarak tests/smoke/ klasöründeki testleri -v (verbose) modda bir kerelik çalıştır.',
              en: 'Goal: without restarting the whole environment, run just the tests in tests/smoke/ once, in verbose (-v) mode, using the tests service.',
            },
            explanation: {
              tr: 'docker compose run <servis> <komut> ilgili servisin image\'ından YENİ, TEK SEFERLİK bir container başlatır; docker compose up gibi kalıcı servisi ayağa kaldırmaz.',
              en: 'docker compose run <service> <command> starts a NEW, ONE-OFF container from that service\'s image; unlike docker compose up, it does not bring up a persistent service.',
            },
            code: {
              tr: `docker compose run tests pytest tests/smoke/ -v`,
              en: `docker compose run tests pytest tests/smoke/ -v`,
            },
            starterCode: {
              tr: `docker compose ___ tests pytest tests/smoke/ -v`,
              en: `docker compose ___ tests pytest tests/smoke/ -v`,
            },
            solutionCode: {
              tr: `docker compose run tests pytest tests/smoke/ -v`,
              en: `docker compose run tests pytest tests/smoke/ -v`,
            },
            expected: {
              tr: `tests servisinden tek seferlik bir container başlatıldı.
Sadece tests/smoke/ altındaki testler verbose modda çalıştı.`,
              en: `A one-off container was started from the tests service.
Only the tests under tests/smoke/ ran, in verbose mode.`,
            },
            hints: [
              { tr: 'docker compose up kalıcı servisi ayağa kaldırır; sen tek seferlik bir komut istiyorsun.', en: 'docker compose up brings up a persistent service; you want a one-off command instead.' },
              { tr: 'Aradığın alt komut, bir servisin image\'ını kullanıp geçici bir container açar.', en: 'The subcommand you need spins up a temporary container using a service\'s image.' },
              { tr: 'Bu alt komutun adı "run" — docker compose run <servis> <komut> şeklinde kullanılır.', en: 'That subcommand is "run" — used as docker compose run <service> <command>.' },
            ],
            xpReward: 10,
          },
          ...dockerComposeInteractiveBlocks,
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
          
        retryQuestion: {
      "question": "Docker Compose içerisinde, bir uygulamanın veritabanı gibi bağımlı olduğu bir servisin tamamen çalışır duruma gelmesini beklemek için hangi yapı kullanılır?",
      "options": [
            {
                  "id": "a",
                  "text": "links:"
            },
            {
                  "id": "b",
                  "text": "volumes_from:"
            },
            {
                  "id": "c",
                  "text": "depends_on: condition: service_healthy"
            },
            {
                  "id": "d",
                  "text": "start_order: enabled"
            }
      ],
      "correct": "c",
      "explanation": "depends_on tek başına servisin sadece başlatılmasını garanti eder. Eğer servisin hazır (sağlıklı) olmasını beklemek istiyorsak 'condition: service_healthy' ifadesini eklemeli ve ilgili servise bir 'healthcheck' tanımlamalıyız."
}
},
          {
            type: 'interleaving-challenge',
            challenges: [
              {
                topic: 'Docker',
                questionTr: 'Bir Dockerfile optimize edilirken, hangisi önbellek (cache) verimliliğini en çok artırır?',
                questionEn: 'When optimizing a Dockerfile, which practice best increases layer cache efficiency?',
                optionsTr: [
                  'COPY . . komutunu en başa taşımak',
                  'requirements.txt / package.json kopyalama ve yükleme adımını kod kopyalamadan önce yapmak',
                  'Her RUN komutunu ayrı çalıştırmak',
                  'Base image olarak alpine yerine ubuntu seçmek'
                ],
                optionsEn: [
                  'Moving COPY . . to the top of the Dockerfile',
                  'Copying and installing requirements.txt / package.json before copying the rest of the application source code',
                  'Running every RUN instruction separately',
                  'Choosing ubuntu as base image instead of alpine'
                ],
                correct: 1,
                explanationTr: 'Bağımlılıklar (requirements.txt / package.json) daha seyrek değiştiği için, onları koddan önce kopyalayıp yüklemek cache verimliliğini artırır. Böylece her kod değiştiğinde bağımlılıklar tekrar indirilmez.',
                explanationEn: 'Since dependencies change less frequently than source code, copying and installing them before copying the rest of the source code maximizes cache hit rates. This prevents reinstalling dependencies on every code change.'
              },
              {
                topic: 'Jenkins',
                questionTr: 'Jenkins pipeline\'ında büyük bir Allure/JUnit test raporu üretildikten sonra, bu raporun silinmemesi ve sonradan incelenebilmesi için hangi pipeline aşaması (step) kullanılmalıdır?',
                questionEn: 'After generating a large Allure/JUnit test report in a Jenkins pipeline, which step must be used to ensure the report persists for later inspection?',
                optionsTr: [
                  'sh "rm -rf target/"',
                  'archiveArtifacts artifacts: "**/target/surefire-reports/*"',
                  'git commit -m "add reports"',
                  'echo "Tests completed"'
                ],
                optionsEn: [
                  'sh "rm -rf target/"',
                  'archiveArtifacts artifacts: "**/target/surefire-reports/*"',
                  'git commit -m "add reports"',
                  'echo "Tests completed"'
                ],
                correct: 1,
                explanationTr: 'archiveArtifacts komutu, test raporları gibi derleme çıktılarını (artifacts) Jenkins master sunucusunda saklayarak pipeline tamamlandıktan sonra da erişilebilir kılar.',
                explanationEn: 'The archiveArtifacts step stores build artifacts (like test reports) on the Jenkins master, ensuring they persist and remain downloadable after the build agent is destroyed.'
              },
              {
                topic: 'Kubernetes',
                questionTr: 'Kubernetes\'te bir Service\'in gelen istekleri doğru Pod\'lara yönlendirebilmesi için hangisi eşleşmelidir?',
                questionEn: 'In Kubernetes, which component must match so that a Service can correctly route traffic to Pods?',
                optionsTr: [
                  'Service selector etiketleri ile Pod label etiketleri',
                  'Service ismi ile Pod ismi',
                  'Pod spec container portu ile Node IP adresi',
                  'ReplicaSet replica sayısı ile Node port sayısı'
                ],
                optionsEn: [
                  'Service selector labels and Pod labels',
                  'Service name and Pod name',
                  'Pod spec container port and Node IP address',
                  'ReplicaSet replica count and Node port count'
                ],
                correct: 0,
                explanationTr: 'Kubernetes Service, gelen istekleri yönlendireceği Pod\'ları seçmek için selector etiketlerini kullanır. Eşleşme hatası olursa Service endpoint bulamaz ve yönlendirme başarısız olur.',
                explanationEn: 'Kubernetes Services use label selectors to target Pods. If there is a mismatch, the Service will have no endpoints and routing will fail.'
              }
            ]
          },
          {
            type: 'visual',
            variant: 'flow',
            title: { tr: 'Docker Compose Çalışma Akışı', en: 'Docker Compose Startup Lifecycle' },
            steps: [
              { num: '1', label: { tr: 'YAML Analizi', en: 'YAML Parsing' }, desc: { tr: 'docker-compose.yml dosyasındaki servisler, ağlar ve volume tanımları okunur.', en: 'Reads services, networks, and volumes configuration.' } },
              { num: '2', label: { tr: 'İmaj Kontrolü', en: 'Image Check' }, desc: { tr: 'Gerekli imajlar lokalde yoksa Docker Hub\'dan çekilir veya build edilir.', en: 'Pulls missing images from Docker Hub or builds them from Dockerfiles.' } },
              { num: '3', label: { tr: 'Bağımlılık Sırası', en: 'Dependency Order' }, desc: { tr: 'depends_on kurallarına göre container\'ların öncelik sırası belirlenir.', en: 'Sets container startup priority based on depends_on conditions.' } },
              { num: '4', label: { tr: 'Ağ & Hacim Oluşturma', en: 'Network & Volume' }, desc: { tr: 'İzole sanal ağlar ve kalıcı veri hacimleri (volumes) ayağa kaldırılır.', en: 'Creates isolated virtual networks and persistent volumes.' } },
              { num: '5', label: { tr: 'Çalıştırma', en: 'Running Containers' }, desc: { tr: 'Tüm servisler tek bir komutla eş zamanlı olarak başlatılır.', en: 'Starts all services concurrently under a single orchestration command.' } }
            ]
          }
        ],
      },

      // ── SECTION 4: QA USE CASES (TR) ──────────────────────────────────────
      {
        title: '🧪 QA İçin Docker',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔬',
            content: 'Docker, test ortamını yıkayıp tekrar kullanman gereken bir bardak yerine, tek kullanımlık bir kağıt bardağa çevirir. Taze browser mı lazım? Tek komutla Chrome ayağa kalkar. Temiz veritabanı mı lazım? Tek komutla bir kez kullanılıp atılan, sıfırdan bir PostgreSQL gelir. Peki neden var olan test veritabanını her seferinde yeniden kurmak yerine basitçe sıfırlayan bir script kullanmıyoruz? Çünkü bir "reset" script\'i sadece SENİN bildiğin satırları temizler — önceki başarısız bir testten kalan bir index, schema sapması veya unutulmuş bir geçici tablo görünmeden hayatta kalır ve bir sonraki koşumu kirletir. Bu, statik bir Java test fixture\'ını @Test metodları arasında yeniden initialize etmeden tekrar kullanmakla aynı tuzaktır: state görünmeden sızar. QA tarafındaki somut kazanç şu: "benim makinemde çalışıyordu" tipi flaky bir test, neredeyse her zaman CI agent\'ındaki Chrome sürümünün veya DB schema\'sının senden sessizce sapmış olmasından kaynaklanır — tek kullanımlık container\'lar bu değişkeni tamamen ortadan kaldırır.',
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
            type: 'challenge',
            variant: 'order-sort',
            id: 'ch-docker-selenium-grid-order-01',
            question: { tr: 'Selenium Grid\'in Compose ile başlatılma bağımlılık sırasını diz.', en: 'Arrange the dependency startup order for Selenium Grid with Compose.' },
            items: [
              { id: '1', text: { tr: 'selenium-hub önce ayağa kalkar (bağımlılığı yok)', en: 'selenium-hub comes up first (no dependencies)' }, order: 1 },
              { id: '2', text: { tr: 'chrome ve firefox node\'ları hub\'a kayıt olur (depends_on: selenium-hub)', en: 'chrome and firefox nodes register with the hub (depends_on: selenium-hub)' }, order: 2 },
              { id: '3', text: { tr: 'test-runner, chrome ve firefox\'un ayakta olmasını bekler (depends_on)', en: 'test-runner waits for chrome and firefox to be up (depends_on)' }, order: 3 },
              { id: '4', text: { tr: 'test-runner SELENIUM_HUB adresine bağlanıp testleri paralel çalıştırır', en: 'test-runner connects to SELENIUM_HUB and runs tests in parallel' }, order: 4 },
              { id: '5', text: { tr: 'Sonuçlar ./reports volume\'ü üzerinden host\'a yazılır', en: 'Results are written to the host through the ./reports volume' }, order: 5 },
            ],
            xpReward: 10,
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
          {
            type: 'code-playground',
            relatedTopicId: 'docker-core-selenium-remote-practice',
            id: 'docker-core-selenium-remote-practice',
            label: { tr: 'Pratik: WebDriver\'ı localhost yerine Docker Grid\'e bağla', en: 'Practice: Point WebDriver at the Docker Grid instead of localhost' },
            language: 'python',
            task: {
              tr: 'Amaç: Yerel bir ChromeDriver yerine, Docker Compose\'daki selenium-hub servisine bağlanan bir Remote WebDriver oluştur.',
              en: 'Goal: instead of a local ChromeDriver, create a Remote WebDriver that connects to the selenium-hub service in Docker Compose.',
            },
            explanation: {
              tr: 'webdriver.Remote(), command_executor parametresiyle hub\'ın adresini alır — webdriver.Chrome() gibi yerel bir binary aramaz.',
              en: 'webdriver.Remote() takes the hub\'s address via the command_executor parameter — unlike webdriver.Chrome(), it never looks for a local binary.',
            },
            code: {
              tr: `driver = webdriver.Remote(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
              en: `driver = webdriver.Remote(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
            },
            starterCode: {
              tr: `driver = webdriver.___(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
              en: `driver = webdriver.___(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
            },
            solutionCode: {
              tr: `driver = webdriver.Remote(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
              en: `driver = webdriver.Remote(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions()
)`,
            },
            expected: {
              tr: `driver artık selenium-hub üzerinden çalışan bir uzak tarayıcıyı kontrol ediyor.
Yerel makinede Chrome kurulu olmasına gerek yok.`,
              en: `driver now controls a remote browser running through selenium-hub.
No local Chrome installation is required.`,
            },
            hints: [
              { tr: 'webdriver.Chrome() her zaman yerel bir binary arar — burada onu istemiyoruz.', en: 'webdriver.Chrome() always looks for a local binary — that is not what we want here.' },
              { tr: 'Uzak bir Grid\'e bağlanmak için WebDriver sınıfının farklı bir adı vardır.', en: 'There is a different WebDriver class name for connecting to a remote Grid.' },
              { tr: 'Aradığın sınıf adı "Remote" — webdriver.Remote(command_executor=...) şeklinde kullanılır.', en: 'The class you need is "Remote" — used as webdriver.Remote(command_executor=...).' },
            ],
            xpReward: 15,
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
          ...dockerQaInteractiveBlocks,
          { type: 'heading', text: 'Gerçek Hayat Senaryoları ve Çözümleri' },
          {
            type: 'error-dictionary',
              relatedTopicId: 'docker-errors',
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
          
        retryQuestion: {
      "question": "Selenium ile tarayıcı otomasyonu yaparken Docker konteynerinde 'DevToolsActivePort file doesn't exist' hatası almamak için neden paylaşılan bellek (shared memory) yapılandırması kritiktir?",
      "options": [
            {
                  "id": "a",
                  "text": "Konteynerin dış dünyaya erişimini sağlamak için"
            },
            {
                  "id": "b",
                  "text": "Chrome'un varsayılan Docker /dev/shm boyutunu aşan bellek kullanımını yönetmek için"
            },
            {
                  "id": "c",
                  "text": "Test sonuçlarını diske daha hızlı yazmak için"
            },
            {
                  "id": "d",
                  "text": "Web sürücüsünün (WebDriver) ağ portlarını eşlemek için"
            }
      ],
      "correct": "b",
      "explanation": "Docker, varsayılan olarak paylaşılan bellek (/dev/shm) için sadece 64MB ayırır. Chrome ve Chromium tabanlı tarayıcılar, sayfaları render ederken yoğun bir şekilde paylaşılan belleğe ihtiyaç duyar. Bu limit aşıldığında tarayıcı çöker veya düzgün başlatılamaz. 'shm_size: 2gb' ayarı bu limiti genişleterek işlemin başarıyla tamamlanmasını sağlar."
    }
  },
  {
    type: 'visual',
    variant: 'boxes',
    title: { tr: 'Docker Üzerinde Selenium Grid Mimarisi', en: 'Selenium Grid Architecture in Docker' },
    items: [
      { icon: '🌐', label: { tr: 'Test Kodları', en: 'Test Code' }, desc: { tr: 'Local veya CI üzerindeki test adımları', en: 'Test runner execution' } },
      { arrow: true },
      { icon: '🏗️', label: { tr: 'Selenium Hub', en: 'Selenium Hub' }, desc: { tr: 'İstekleri yönlendiren merkezi kontrolör', en: 'Router and controller' }, highlight: true },
      { arrow: true },
      { icon: '🐳', label: { tr: 'Chrome Node', en: 'Chrome Node' }, desc: { tr: 'İzole Chrome tarayıcı servisi', en: 'Isolated Chrome service' } },
      { icon: '🐳', label: { tr: 'Firefox Node', en: 'Firefox Node' }, desc: { tr: 'İzole Firefox tarayıcı servisi', en: 'Isolated Firefox service' } }
    ],
    note: { tr: 'Tüm tarayıcı düğümleri (nodes) tek bir ağda Hub\'a bağlıdır ve paralel olarak testleri çalıştırabilir.', en: 'All browser nodes run in isolated containers connected to the Hub via the same virtual network.' }
  }
],
},

      // ── SECTION 5: EKOSİSTEM ────────────────────────────────────────────────
      {
        title: '🔗 Ekosistem',
        blocks: [
          { type: 'simple-box', emoji: '🔗', content: "Tek bir Docker container'ı, bir kamyondaki tek bir konteyner gibidir — kullanışlıdır ama gerçek güç limanda ortaya çıkar: otomatik yükleme/boşaltma yapan vinçler (Kubernetes), hangi geminin nereye gideceğine karar veren bir dispeçer (Jenkins/CI), ve oradan geçen her container'ı kayıt altına alan bir defter (Docker Hub gibi bir registry). Peki bir container zaten uygulamanı çalıştırıyorsa, neden onu üç sistemle daha sarmalayıp daha büyük bir sunucuda 'docker run' çalıştırmıyoruz? Çünkü tek başına bir container'ın geçmiş versiyonlara dair hafızası, otomatik restart politikası ve deploy sırasında dokuz aynı kardeşiyle koordine olma yeteneği yoktur — tıpkı tek bir Java nesnesi ile onun yaşam döngüsünü, wiring'ini ve recovery'sini senin yerine yöneten framework (örneğin Spring'in ApplicationContext'i) arasındaki fark gibi. Gerçek bir pipeline'da registry katmanını atlamak, bir test mühendisinin bir bug'ı tekrar üretemediği klasik incident'a yol açar: 'latest' image tag'i, dünkü build'den bugün sessizce farklı bir build'e işaret ediyordur." },
          { type: 'heading', text: 'Docker Büyük Resme Nasıl Uyuyor' },
          { type: 'text', content: 'Tek başına Docker, tek bir makinede tek bir container build edip çalıştırır. QA/DevOps pipeline\'ındaki gerçek değeri dört sisteme bağlanmasından gelir: her push\'ta image build edip test eden bir CI/CD aracı, bu image\'ları saklayıp versiyonlayan bir registry, container\'ları makineler arasında güvenilir şekilde çalıştıran bir orkestratör, ve containerized uygulamanın çalışma zamanında konuştuğu bir mesaj broker\'ı veya veritabanı.' },
          {
            type: 'visual', variant: 'boxes',
            title: 'Docker Ekosistemi — Kim Kiminle Konuşuyor',
            items: [
              { icon: '🔧', label: 'Jenkins / GitHub Actions', desc: 'her push\'ta image build eder' },
              { arrow: true },
              { icon: '🐳', label: 'docker build / push', desc: 'image\'ı oluşturur ve etiketler' },
              { arrow: true },
              { icon: '📦', label: 'Docker Hub / ECR / GCR', desc: 'versiyonlanmış image\'ları saklar', highlight: true },
              { arrow: true },
              { icon: '☸️', label: 'Kubernetes', desc: 'image\'ı çeker, N replika çalıştırır' },
              { arrow: true },
              { icon: '📈', label: 'Prometheus / Grafana', desc: 'çalışan container\'ları izler', highlight: true },
            ],
            note: 'Her araç kendi işini iyi yapar — Docker paketler, CI build eder, registry saklar, Kubernetes orkestre eder, monitoring izler.',
          },
          ...dockerEcosystemInteractiveBlocks,
          { type: 'heading', text: 'Üç Temel İlişki' },
          {
            type: 'table',
            headers: ['İlişki', 'Nasıl Birlikte Çalışırlar', 'Hangi Sorunu Çözer'],
            rows: [
              ['Docker ↔ Jenkins/CI', 'Testler geçtikten sonra bir pipeline aşaması `docker build` ve `docker push` çalıştırır, image\'ı commit SHA\'sıyla etiketler', 'Her commit "benim makinemde çalışıyor" yerine izlenebilir, tekrarlanabilir bir artifact üretir'],
              ['Docker ↔ Kubernetes', 'K8s registry\'den image çeker ve cluster genelinde Pod olarak zamanlar, çökerse yeniden başlatır', 'Tek bir container\'ı kendi kendini onaran, yatay ölçeklenebilir bir servise dönüştürür'],
              ['Docker ↔ Registry (Docker Hub/ECR)', 'Image\'lar bir kez push edilir, kimlik bilgisi olan herhangi bir makine tarafından çekilebilir — dev laptop, CI runner veya production node', 'Her ortamda aynı image\'ı yeniden build etme ihtiyacını ortadan kaldırır; byte-identical artifact garanti eder'],
              ['Docker ↔ Selenium Grid', 'Selenium/Playwright node\'ları container olarak çalışır (selenium/standalone-chrome), her test çalıştırmasında sıfırdan başlatılır', '"Kirli browser state\'i" testler arası ortadan kaldırır, QA\'nın paralel test çalıştırmasını yatay olarak ölçeklemesini sağlar'],
            ]
          },
          { type: 'heading', text: 'Docker Diğer QA/DevOps Araçları Yanında Nerede Duruyor' },
          { type: 'text', content: 'Tipik bir pipeline\'da: Jenkins build\'i tetikler → Docker uygulamayı ve test runner\'ı image\'lara paketler → test image\'ı bir docker-compose stack\'ine (uygulama + DB + Selenium Grid, hepsi containerized) karşı çalışır → başarılı olursa Docker production image\'ını bir registry\'e push eder → Kubernetes deploy eder. QA mühendisleri Docker ile en doğrudan Selenium Grid\'i container\'larda çalıştırırken veya docker-compose ile atılabilir test ortamları kurarken etkileşime girer.' },
          {
            type: 'quiz',
            question: 'Bir CI/CD pipeline\'ında, bir registry\'den Docker image çekip cluster genelinde birden fazla replikasını çalıştırmaktan ve çökerlerse yeniden başlatmaktan hangi araç sorumludur?',
            options: [
              { id: 'a', text: 'Docker Hub' },
              { id: 'b', text: 'Jenkins' },
              { id: 'c', text: 'Kubernetes' },
              { id: 'd', text: 'docker-compose' },
            ],
            correct: 'c',
            explanation: 'Kubernetes orkestratördür: registry\'den image\'ları çeker, cluster genelinde Pod olarak zamanlar ve çökerlerse otomatik yeniden başlatır — tek bir container\'ı kendi kendini onaran, yatay ölçeklenebilir bir servise dönüştürür. Docker Hub sadece image saklar, Jenkins sadece build/push eder, docker-compose ise tek makinede/lokal çoklu container kurulumu içindir, cluster genelinde orkestrasyon yapmaz.',
            retryQuestion: {
              question: 'Kubernetes tarafından yönetilen bir container çökerse, hiçbir manuel müdahale olmadan ne olur?',
              options: [
                { id: 'a', text: 'Hiçbir şey — bir mühendisin elle yeniden başlatması gerekir' },
                { id: 'b', text: 'Kubernetes, istenen replika sayısına uyacak şekilde otomatik olarak yeniden başlatır' },
                { id: 'c', text: 'Docker Hub image\'ı otomatik olarak yeniden build eder' },
                { id: 'd', text: 'docker-compose çökmeyi cluster genelinde tespit eder' },
              ],
              correct: 'b',
              explanation: 'Kubernetes\'teki "kendi kendini onarma" tam olarak budur: gerçekte çalışan Pod\'ları istenen replika sayısıyla sürekli karşılaştırır ve çökeni hiçbir manuel işlem gerekmeden yeniden başlatır/değiştirir. docker-compose\'da multi-node cluster kavramı yoktur, Docker Hub ise sadece bir image registry\'sidir — hiçbiri çalışan container sağlığını izlemez.',
            },
          },
          {
            type: 'feynman-checkpoint',
            prompt: 'Explain the key difference between a Docker Image and a Docker Container in simple terms (as if explaining to a 5-year-old).',
            promptTr: 'Bir Docker Image ile Docker Container arasındaki temel farkı, 5 yaşındaki bir çocuğa anlatır gibi (teknik jargon kullanmadan) basit terimlerle açıkla.',
            keywords: [
              ['imaj', 'image', 'blueprint', 'recipe', 'kalıp', 'tarif', 'şablon'],
              ['container', 'konteyner', 'çalışan', 'process', 'örnek', 'instance', 'kek']
            ],
            modelAnswerEn: 'A Docker Image is like a recipe for a cake (static, instructions only). A Docker Container is the actual cake baked using that recipe (live, interactive, running). You can bake many cakes from the same recipe.',
            modelAnswerTr: 'Docker Image, bir kek tarifi gibidir (statik, sadece talimatlar). Docker Container ise bu tarife göre pişirilmiş, yenebilen gerçek kektir (canlı, çalışan örnek). Aynı tariften birçok kek pişirebilirsin.',
            minScore: 2
          }
        ],
      },

      // ── SECTION 6: INTERVIEW Q&A (TR) ─────────────────────────────────────
      {
        title: '💼 Docker Mülakat Soruları',
        blocks: [
          {
            type: 'interview-questions',
              relatedTopicId: 'docker',
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
              // ── TEMEL (ek) ──────────────────────────────────────
              { level: 'basic', q: { tr: "Durdurulmuş olanlar dahil tüm container'ları nasıl listelersin ve bu QA'da neden işe yarar?" }, a: { tr: "docker ps sadece çalışan container'ları gösterir; docker ps -a, hatayla exit olanlar dahil TÜM container'ları (durumu ne olursa olsun) gösterir. QA'da bir test koşumu sessizce başarısız olduğunda kontrol edilecek ilk komut docker ps -a'dır — exit code'u ve container'ın ne zaman durduğunu görürsün. Sadece başarısız koşumları bulmak için --filter status=exited ile birleştir. Java analojisi: bir thread sessizce öldüğünde thread dump kontrol etmek gibi, sadece şu an canlı thread'lere bakmak yerine." } },
              { level: 'basic', q: { tr: 'docker exec ile docker attach arasındaki fark nedir ve bir test debug oturumunda hangisini ne zaman kullanırsın?' }, a: { tr: "docker exec -it container bash, çalışan bir container içinde YENİ bir process açar — ana process'i etkilemeyen ayrı bir shell alırsın, testler hâlâ çalışırken test dosyalarını incelemek veya ad-hoc komut çalıştırmak için ideal. docker attach ise container'ın ANA process'ine (PID 1) ve onun stdin/stdout'una direkt bağlanır — risklidir, çünkü Ctrl+C basmak ana process'i öldürebilir. QA debug'ında neredeyse her zaman docker exec'i tercih et — daha güvenli, izole bir seçenektir; başkasının terminalini ele geçirmek yerine ikinci bir SSH oturumu açmaya benzer." } },
              { level: 'basic', q: { tr: ".dockerignore ne yapar ve bir QA test image'ının .dockerignore'unda ne olmalı?" }, a: { tr: ".gitignore'a benzer şekilde .dockerignore, daemon'a gönderilen build context'inden hangi dosyaların hariç tutulacağını Docker'a söyler. Bu olmadan bir build yanlışlıkla node_modules, .git, test-results/ veya screenshots/ klasörlerini image'a kopyalayabilir — boyutu şişirir, hatta .env gibi dosyalardan hassas veri sızdırabilir. Tipik bir QA .dockerignore'u: node_modules, .git, test-results, playwright-report, *.log, .env. Java analojisi: target/ klasörünü bir deployment artifact'inden hariç tutmak gibi — build artıklarını taşımazsın." } },
              { level: 'basic', q: { tr: "Image'ları :latest ile etiketlemek test ortamları için neden risklidir ve bunun yerine ne yapmalısın?" }, a: { tr: ":latest sadece değişebilir bir etikettir, en yeni versiyon garantisi değildir — biri bu etiketle eski bir image push ederse, fark etmeden eski versiyonu alırsın. Tekrarlanabilir testler için tam versiyonları veya commit SHA'larını sabitle: myapp:1.4.2 veya myapp:abc1234. Böylece Pazartesi geçen bir test, Cuma günü TAM AYNI image'a karşı çalışır. Java analojisi: bir Maven bağımlılığının 1.0-SNAPSHOT'a bağlı olmasıyla aynı problem — sabit görünür ama arkasındaki artifact fark ettirmeden değişebilir." } },
              { level: 'basic', q: { tr: 'Bind mount ile named volume arasındaki fark nedir ve test scriptlerini canlı düzenlemek ile test sonuçlarını saklamak için hangisini seçersin?' }, a: { tr: "Bind mount, belirli bir host yolunu direkt container'a eşler (-v $(pwd)/tests:/app/tests) — herhangi bir tarafta değişiklik anında görünür, lokal geliştirmede test scriptlerini canlı düzenlemek için harikadır. Named volume (-v test-data:/app/data) Docker'ın kendisi tarafından yönetilir, Docker'ın depolama alanında saklanır, belirli bir host yoluna bağlı değildir — CI'da host dosya sistemi düzeni değişebileceğinden, test sonuçlarını veya veritabanlarını container yeniden başlatmaları arasında kalıcı tutmak için daha iyidir. Kural: geliştirme için bind mount, Docker'ın sahiplenmesi gereken veri için named volume." } },
              { level: 'basic', q: { tr: 'docker stop ile docker kill arasındaki fark nedir ve bu, test containerlarını temizlemek için neden önemlidir?' }, a: { tr: "docker stop, SIGTERM gönderir, process'e düzgün kapanması (DB bağlantılarını kapatma, logları flush etme) için 10 saniyeye kadar süre verir, sonra çıkmadıysa SIGKILL gönderir. docker kill ise hiçbir süre vermeden direkt SIGKILL gönderir. QA için: rapor dosyalarının container kaybolmadan önce diske flush edilmesi için normal temizlikte docker stop kullan; docker kill'i ani, zorla teardown gereken CI timeout'ları için ayır. Aniden öldürmek yarım yazılmış rapor dosyaları bırakabilir." } },
              { level: 'basic', q: { tr: "`docker build .` komutundaki 'build context' nedir ve büyük bir context test image build'lerini neden yavaşlatabilir?" }, a: { tr: 'Build context, belirtilen dizindeki (`.`) build başlamadan ÖNCE Docker daemon\'a gönderilen her şeydir — sadece Dockerfile değil. Proje klasöründe node_modules, .git geçmişi veya eski test-results varsa, Dockerfile bunları hiç kopyalamasa bile hepsi önce zip\'lenip gönderilir. Şişmiş bir context, tek bir talimat çalışmadan önce build\'in dakikalar sürmesine yol açabilir. Çözüm: sıkı bir .dockerignore veya sadece gerekenleri içeren bir alt dizinden build almak. Java analojisi: tek bir JAR deploy etmeden önce target/ ve .idea/ dahil tüm workspace\'i zip\'lemek gibi.' } },
              // ── ORTA SEVİYE (ek) ─────────────────────────────────
              { level: 'intermediate', q: { tr: "Docker restart policy'leri nedir ve CI'daki bir Selenium Grid node'u hangisini, tek seferlik bir test runner'ı hangisini kullanmalı?" }, a: { tr: "Restart policy'leri, container çıktığında Docker'ın ne yapacağını kontrol eder: no (varsayılan, asla yeniden başlatma), on-failure (sadece sıfır olmayan exit code'da, opsiyonel max retry sayısıyla), always (temiz çıkış veya daemon restart'ı sonrası dahi her zaman yeniden başlat), unless-stopped (always gibi ama sen elle durdurduysan yeniden başlatmaz). Uzun ömürlü bir Selenium Grid node'u unless-stopped veya on-failure:3 kullanmalı, böylece çökmeden kendini onarır. Tek seferlik bir test runner container'ı ise restart: \"no\" kullanmalı — sonsuz döngüye girmeden çıkıp gerçek exit code'unu göstermeli ki CI build'i başarısız işaretleyebilsin." } },
              { level: 'intermediate', q: { tr: "docker-compose.yml'inde app servisi için depends_on var ama testler hâlâ başlangıçta connection refused hatasıyla başarısız oluyor. Neden ve nasıl düzeltirsin?" }, a: { tr: 'depends_on sadece BAŞLAMA SIRASINI kontrol eder, HAZIR OLMA durumunu değil — Docker veritabanı container\'ını başlatır, ama içindeki veritabanı process\'i bağlantı kabul etmeye başlamadan önce 5 saniye daha sürebilir; depends_on ise işi çoktan tamamlanmış sayar. Çözüm, dependency\'ye bir HEALTHCHECK ekleyip depends_on\'u condition: service_healthy ile kullanmaktır — böylece Compose sadece "container process\'i başladı" değil, gerçek health durumunu bekler. Bu olmadan, uygulama tarafında bir retry döngüsü veya wait-for-it.sh script\'i gerekir, ki bu Docker\'ın health\'i native takip etmesine göre daha kırılgandır.' } },
              { level: 'intermediate', q: { tr: 'Bir test container\'ı için CPU ve memory\'yi nasıl sınırlarsın ve bu paylaşımlı bir CI runner\'da neden önemlidir?' }, a: { tr: "docker run --memory=512m --cpus=1.5 my-test-image (veya compose'da deploy.resources.limits). Paylaşımlı bir CI host'unda birçok paralel job çalışıyorsa, sınırsız bir container diğerlerinin memory'sini açlığa düşürebilir ve ilgisiz testlerin OOM kill veya aşırı yavaşlıkla başarısız olmasına, kafa karıştırıcı 'flaky' test raporlarına yol açabilir. Açık limitler koymak, gerçek memory leak'leri de daha erken yakalar, çünkü container öngörülebilir şekilde OOM-kill edilir, tüm makineyi yavaşça çökertmez. Java analojisi: bir kaçak process'in tüm CI kutusunu çökertmesini önlemek için JVM'e -Xmx koymak gibi." } },
              { level: 'intermediate', q: { tr: 'Flaky bir test CI\'da aralıklı olarak başarısız oluyor ama lokalde reprodüklemiyorsun. Docker logları nasıl yardımcı olur ve hangi flagler önemlidir?' }, a: { tr: "docker logs --timestamps --since 10m container-name, her log satırının tam ne zaman olduğunu gösterir, bu da bir başarısızlığı test raporundaki belirli bir zaman damgasıyla eşleştirmeye yardımcı olur. Flaky test yeniden çalışırken logları canlı takip etmek için -f ekle. Zaten exit olmuş container'lar için, container silinmediyse (--rm logları da siler) docker logs hâlâ çalışır — bu yüzden flaky test araştırması için CI koşumlarında logları yakalayana kadar bilinçli olarak --rm kullanmaktan kaçın. Java analojisi: çökme sonrası thread dump'ı hemen silmek yerine postmortem analiz için saklamak gibi." } },
              { level: 'intermediate', q: { tr: "Test koşumu bittikten sonra bir Playwright HTML raporunu veya Selenium ekran görüntülerini container'dan nasıl çıkarırsın?" }, a: { tr: "İki seçenek: 1) Koşum sırasında bir volume mount et (-v $(pwd)/reports:/app/reports), böylece dosyalar direkt host'a yazılır — container sonradan başarısız olsa bile çalıştığından CI için en iyisi. 2) docker cp container-name:/app/reports ./reports — dosyaları işlem sonrası kopyalar, volume mount etmeyi unuttuysan ve container hâlâ duruyorsa (henüz silinmediyse) işe yarar. CI pipeline'ları için volume-mount yaklaşımı daha güvenilirdir çünkü raporu almaya gittiğinde container'ın hâlâ var olmasına bağlı değildir." } },
              { level: 'intermediate', q: { tr: "Takım üyelerinin lokalde ve CI'da biraz farklı docker-compose ayarlarına (örn. dışa açılan portlar) ihtiyacı var. Ayrı compose dosyaları tutmaktan nasıl kaçınırsın?" }, a: { tr: "Docker Compose, varsa docker-compose.yml'i docker-compose.override.yml ile otomatik birleştirir — override dosyası, Git'e commit edilen paylaşılan base dosyaya dokunmadan makineye özgü ayarları (port çatışmasını önlemek için farklı bir port gibi) tutar. CI için ise açıkça dosya zincirlersin: docker compose -f docker-compose.yml -f docker-compose.ci.yml up, ki bu CI'nin host erişimine ihtiyacı olmadığından port publish'i tamamen kapatabilir. Java analojisi: paylaşılan bir pom.xml'in yanına lokal ve CI build'leri için profile'a özgü override eklemek gibi." } },
              { level: 'intermediate', q: { tr: "CI'ın her koşumda bağımlılıkları (npm install / pip install) sıfırdan yeniden kurması dakikalar harcatıyor. Named volume bunu nasıl hızlandırabilir?" }, a: { tr: "Paket yöneticisinin cache dizinine bir named volume mount et, örn. -v npm-cache:/root/.npm veya -v pip-cache:/root/.cache/pip. Volume, aynı runner'da CI koşumları arasında kalıcı olduğundan (container'ın yazılabilir katmanının her seferinde atılmasının aksine), ikinci ve sonraki koşumlar zaten indirilmiş paketleri yeniden kullanır, her şeyi registry'den yeniden çekmek yerine. Bu, Docker'ın build-layer cache'inden ayrıdır — paket yöneticisinin kendi indirme cache'ini cache'ler, bu da Dockerfile ilgisiz şekillerde değişse bile yardımcı olur. Dikkat: her seferinde temiz bir VM açan geçici (ephemeral) CI runner'larında işe yaramaz, sadece kalıcı runner'larda/self-hosted agent'larda çalışır." } },
              { level: 'intermediate', q: { tr: "Ayrı ayrı başlatılmış (aynı Compose dosyasıyla değil) bağımsız bir app container'ı ve bağımsız bir test-runner container'ın var. Birbirleriyle isimle konuşmalarını nasıl sağlarsın?" }, a: { tr: "Varsayılan olarak, bağımsız docker run container'ları default bridge network'üne düşer, burada birbirine sadece IP ile ulaşabilirsin, isimle değil. Önce kullanıcı tanımlı bir network oluştur: docker network create qa-net, sonra her iki container'ı da --network qa-net ile başlat. Kullanıcı tanımlı bir network'te Docker'ın gömülü DNS'i container isimlerini otomatik çözer, böylece test runner http://app-container:8080'i Compose'daki gibi çağırabilir. Bu, Compose'un aynı compose dosyasını paylaşan servisler için otomatik yaptığının manuel eşdeğeridir." } },
              { level: 'intermediate', q: { tr: "Selenium/Playwright test runner'ının, sadece 'container başladı' değil, test edilen uygulamanın gerçekten hazır olmasını beklemesini nasıl sağlarsın?" }, a: { tr: "Uygulamanın Dockerfile'ına bir HEALTHCHECK talimatı ekle (örn. curl -f http://localhost:3000/health) ve docker-compose.yml'de test-runner servisinin depends_on'unu condition: service_healthy olarak ayarla. Compose daha sonra app sağlıklı raporlamadan test-runner container'ını başlatmayı bloklar, bu da testlerin hâlâ açılış yapan bir uygulamaya çarpmaya başladığı race condition'ları ortadan kaldırır. Bu olmadan, ya zaman kaybeden kırılgan bir sleep 15'e ya da entrypoint'inde özel bir wait-for-it.sh retry döngüsüne başvururdun, ki bu da yavaş bir CI runner'da yeterli olmayabilir." } },
              { level: 'intermediate', q: { tr: "Dockerfile'ın COPY . . sonra RUN npm install yapıyor. Her kod değişikliği neden tam bir bağımlılık yeniden kurulumuna zorluyor ve katman sırasını nasıl düzeltirsin?" }, a: { tr: "Docker her talimatın katmanını cache'ler ve sadece girdileri değiştiyse yeniden çalıştırır. COPY . . projenin TAMAMINI kopyalar, her commit'te değişen kaynak dosyalar dahil — bu yüzden Docker o katmanı (ve npm install dahil sonrasındaki her şeyi) tek satırlık bir düzeltmede dahi her kod değişikliğinde geçersiz kılar. Çözüm: önce COPY package.json package-lock.json ./ sonra RUN npm install, SONRA COPY . . yap. Artık npm install'ın katmanı sadece lock dosyası gerçekten değiştiğinde geçersiz olur, Docker normal kod düzenlemeleri için cache'lenmiş bağımlılık katmanını yeniden kullanır — 2 dakikalık bir kurulumu cache'lenmiş bir no-op'a çevirir." } },
              { level: 'intermediate', q: { tr: "Bir test sadece Docker içinde başarısız oluyor ve hiçbir şeyi öldürmeden tam başarısızlık anında container'ın dosya sistemi durumunu incelemek istiyorsun. Ne yaparsın?" }, a: { tr: "docker exec -it container-name bash, hâlâ çalışan container içinde canlı bir shell verir — hiçbir şeyi durdurmadan config dosyalarına cat çekebilir, üretilen bir dosyanın var olup olmadığını kontrol edebilir veya environment variable'ları test process'inin gördüğü gibi inceleyebilirsin. Container zaten exit olduysa (test çöktü ve container durdu), docker commit container-name debug-image kullanarak dosya sistemini içine shell açabileceğin yeni bir image'a snapshot'la, çünkü exec durmuş container'larda çalışmaz. Bu, sadece bir postmortem heap dump okumak yerine canlı bir JVM'e debugger bağlamanın Docker karşılığıdır." } },
              // ── İLERİ SEVİYE (ek) ────────────────────────────────
              { level: 'advanced', q: { tr: 'Güvenlik ekibin CI agentlarının Docker\'ı tam root/privileged erişimle çalıştırdığını işaretledi. Docker tabanlı test pipeline\'larına izin vererek bu riski nasıl azaltırsın?' }, a: { tr: "CI runner'da rootless Docker modunu etkinleştir, böylece Docker daemon'ının kendisi yetkisiz bir kullanıcı olarak çalışır — bir container ele geçirilse dahi host root'a yükselemez. Build'ler için, --privileged gerektiren Docker-in-Docker yerine, privileged bir daemon hiç gerektirmeden image build edebilen Kaniko veya Buildah'ı kullan. Ayrıca runtime'da gereksiz Linux capability'lerini --cap-drop=ALL --cap-add=NET_BIND_SERVICE ile düşür (sadece gerçekten gerekeni geri ekle). Genel prensip her sistemdeki en az yetki ilkesini yansıtır: sadece Selenium testleri çalıştıran bir CI job'ı, altyapı yöneten bir job'la aynı blast radius'a sahip olmamalı." } },
              { level: 'advanced', q: { tr: "Testler özellikle paylaşımlı CI Docker host'unda flaky ama developer laptoplarında her zaman geçiyor. Kaynak çatışması kaynaklı flakiness'i nasıl teşhis edip düzeltirsin?" }, a: { tr: "Önce, koşum sırasında yakalanan `docker stats` çıktısıyla başarısızlık zaman damgalarını ilişkilendir — memory/CPU sıçramaları başarısızlıklarla örtüşüyorsa bu çatışmadır, gerçek bir bug değil. Her test container'ına açık --memory ve --cpus limitleri koy, böylece bir job'ın patlaması aynı host'u paylaşan komşu bir job'ı açlığa düşüremesin, ve CI scheduler'ının host'un gerçek core sayısından fazla paralel job overcommit etmediğini kontrol et. CI'a özgü konfigürasyonda (lokalde değil) Selenium/Playwright wait timeout'larını biraz artır, çünkü meşgul paylaşımlı bir host, boş bir laptop'tan gerçekten daha yavaştır, sadece güvenilmez değil. Belirli bir node sürekli çatışmaya neden oluyorsa, ağır servisleri (örn. veritabanı) best-effort scheduling yerine rezerve kaynaklı ayrı bir container'da izole etmeyi düşün." } },
              { level: 'advanced', q: { tr: "Birden fazla repo/takım için yeniden kullanılabilir bir Playwright test base image'ına ihtiyacın var. Bu image'ı ve versiyonlama stratejisini tasarlarken neler dikkate alınmalı?" }, a: { tr: "Playwright'ın resmi base image'ından (mcr.microsoft.com/playwright) başla, belirli bir Playwright versiyonuyla eşleşen browser binary'lerini içerir — browser'ları asla ayrı kurma, çünkü npm paketi ile browser binary'leri arasındaki versiyon uyumsuzluğu debug edilmesi zor başarısızlıklara yol açar. Üzerine organizasyonunun ortak fixture'larını, reporter'larını ve CI yardımcı scriptlerini katmanla, sonra semantic versioning ile private bir registry'ye tag'le ve yayınla (qa-base:2.3.0), asla :latest, böylece takımlar kendi Dockerfile'larında bilinen-iyi bir versiyonu sabitler (FROM registry.company.com/qa-base:2.3.0). Bir deprecation politikası belgele (örn. son 2 major versiyonu destekle), böylece Playwright'ın kendisi breaking change yayınladığında takımların geçiş için zamanı olsun. Bu, paylaşılan bir internal Maven parent POM'u sürdürmekle aynı problem — merkezi kontrol, açık ve opt-in versiyon yükseltmeleriyle." } },
              { level: 'advanced', q: { tr: "Her küçük CVE'de her build'i bloklamadan container image güvenlik açığı taramasını CI/CD pipeline'ına nasıl entegre edersin?" }, a: { tr: "Image build adımından hemen sonra bir tarama adımı ekle (docker scout cves, Trivy veya Grype), sadece bilinen bir düzeltmesi olan HIGH/CRITICAL severity'de build'i başarısız olacak şekilde yapılandır — düşük severity'li veya henüz düzeltmesi olmayan bulgular loglanır ama bloklamaz. Hem kendi uygulama katmanlarını HEM base image'ı tara, çünkü çoğu açık kendi kodundan değil eski base image'lardan gelir — eski bir python:3.9 base, Dockerfile'ının hiç eklemediği düzinelerce CVE taşıyabilir. Sadece push'ta değil zamanlanmış olarak da yeniden tara, çünkü değişmemiş image'lara karşı yeni CVE'ler yayınlanır, ve istisnaları kalıcı ignore'lar yerine son kullanma tarihli olarak takip et. Hedef sıfır tolerans değil, riske oranlı gating'tir — çok gürültülü olursa takımlar onu dolaşmayı öğrenir." } },
              { level: 'advanced', q: { tr: "Birden fazla PR'ın aynı host'ta port veya veri çakışması olmadan paralel test edilebilmesi için Docker ile PR-bazlı, geçici, izole test ortamları nasıl kurarsın?" }, a: { tr: "PR başına benzersiz bir proje adıyla (COMPOSE_PROJECT_NAME=pr-${PR_NUMBER}) Docker Compose kullan, bu otomatik olarak container, network ve volume'ları namespace'ler, böylece PR #123 ve PR #124 aynı host'ta dahi asla çakışmaz. Sabit host port publish'inden kaçın (\"8080:8080\" yapma); bunun yerine Docker'ın rastgele bir host portu seçmesine izin ver (\"8080\") ve docker compose port ile bul, veya PR başına hostname/subdomain'e göre yönlendiren bir reverse proxy üzerinden her şeyi geçir. PR kapatma/merge'de tetiklenen bir temizlik job'ı ekle (docker compose -p pr-${PR_NUMBER} down -v), böylece eski ortamlar birikip CI host'unun kaynaklarını tüketmesin. Bu desen, Render/Vercel önizleme ortamlarının arka planda yaptığının Compose ile elle inşa edilmiş halidir." } },
              { level: 'advanced', q: { tr: "Jenkins agentları test containerları docker.sock kullanmaya çalıştığında 'permission denied' hatası alıyor, ama agentı root olarak çalıştırmak istemiyorsun. Bunu güvenli şekilde nasıl çözersin?" }, a: { tr: "Jenkins agent'ının kullanıcısını root olarak çalıştırmak yerine host'un docker grubuna ekle (usermod -aG docker jenkins) — bu, tam root yetkisi vermeden socket erişimi sağlar, ama docker grubu üyeliğinin bir container üzerinden host dosya sistemini mount edebildiğinden fiilen root-eşdeğeri olduğunu belirtmek gerekir. Daha izole bir alternatif: agent container'ının HOST'un docker.sock'unu mount ettiği (-v /var/run/docker.sock:/var/run/docker.sock) gerçek bir Docker-outside-of-Docker (DooD) kurulumu çalıştırmak, böylece başlattığı container'lar host'ta nested değil sibling olur — gerçek DinD'nin --privileged gereksinimini önler. Daha sıkı izolasyon için, paylaşılan uzun ömürlü bir agent yerine pipeline koşumu başına özel, geçici bir build-agent VM kullan, böylece ele geçirilmiş bir container diğer takımların pipeline'larına erişimi sürdüremesin." } },
              { level: 'advanced', q: { tr: "Flaky bir entegrasyon testinin test seviyesinde mi yoksa Docker/altyapı seviyesinde mi düzeltilmesi gerektiğine nasıl karar verirsin?" }, a: { tr: "Önce başarısızlığı sınıflandır: loglar container başladıktan hemen sonra bir timeout veya connection-refused gösteriyorsa, bu bir altyapı/zamanlama sorunudur (eksik healthcheck, depends_on condition'ı yok) — test retry mantığında değil Docker/Compose'da düzelt. Loglar uygulamanın doğru yanıt verdiğini ama testin assertion'ının veya selector'ının yanlış/zamanlamaya hassas olduğunu gösteriyorsa, bu bir test kodu sorunudur — container restart policy eklemek kötü bir locator'ı düzeltmez. Pratik bir kural: AYNI test her seferinde farklı şekilde başarısız oluyorsa (her koşumda farklı hata), altyapı/ortamdan şüphelen; başarısız olduğunda her zaman AYNI şekilde başarısız oluyorsa, bu neredeyse her zaman bir test mantığı bug'ıdır. Altyapı flakiness'ini maskelemek için test seviyesinde körü körüne retry eklemek gerçek dengesizliği gizler ve kök neden düzeltmelerini geciktirir." } },
            ],
          },
        ],
      },
    ],
  },
}

fillMissingCodeTrios(dockerData, 'docker')
