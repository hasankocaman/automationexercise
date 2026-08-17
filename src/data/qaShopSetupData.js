// QA Shop Kurulum Rehberi — sıfırdan kurulum ve ilk koşan test.
//
// Bu sayfa QA Shop pratik ortamını (ayrı PostgreSQL + ayrı Express API)
// kullanmayı adım adım anlatır. Pratik yığını, bu sitenin kendi backend'inden
// TAMAMEN bağımsızdır: ayrı veritabanı, ayrı süreç, ayrı kimlik doğrulama.
// Buradaki hiçbir adım gerçek kullanıcı verisine dokunmaz.
//
// Hedef okuyucu: makinesinde HİÇBİR ŞEY kurulu olmayan biri. Bu yüzden birinci
// adım Docker kurulumudur — önceki sürümde rehber `docker compose up -d`
// komutunu hazır varsayıyordu ve Docker'ı olmayan bir makinede ilk satırda
// duvara çarpıyordu.
//
// Komut örnekleri Windows önceliklidir (PowerShell), macOS/Linux karşılıkları
// yanında verilir. PowerShell'de `curl` gerçek cURL değil Invoke-WebRequest
// takma adıdır; rehber bunu açıkça uyarır.
//
// Şu an yalnızca admin görüyor. Herkese açılacağı gün tek değişiklik
// App.jsx'teki sarmalayıcının kaldırılması + seo.js'teki noindex'in silinmesi.

export const qaShopSetupData = {
    meta: {
        // ⚠ Ad çakışmasına dikkat: ana sayfada ZATEN "Practice Lab" başlıklı bir
        // bölüm var (element/locator oyun alanı). Bu sayfa o değildir; QA Shop
        // pratik ortamının KURULUM rehberidir. İlk sürümde ikisi de "Pratik
        // Laboratuvarı" adını taşıyordu ve kullanıcı hangisinin hangisi olduğunu
        // ayırt edemedi — başlık bu yüzden ayrıştırıldı.
        title: { tr: '🛠️ QA Shop Kurulum Rehberi', en: '🛠️ QA Shop Setup Guide' },
        subtitle: {
            tr: 'Sıfırdan başlıyoruz. Makinende hiçbir şey kurulu olmasa bile: Docker kurulumundan gerçek bir veritabanına, API sözleşmesinden komut satırından koşan bir test paketine kadar her adım tek tek.',
            en: 'We start from zero. Even if nothing is installed on your machine: every single step, from installing Docker to a real database, from the API contract to a test pack that runs on the command line.',
        },
        isolationNote: {
            tr: 'Bu laboratuvar ayrı bir veritabanı ve ayrı bir sunucu süreci olarak çalışır. Sitenin üyelik, ilerleme ve rozet verisiyle hiçbir bağlantısı yoktur — buradaki hiçbir işlem gerçek kullanıcı verisine dokunamaz.',
            en: 'This lab runs as a separate database and a separate server process. It has no connection to the site\'s membership, progress or badge data — nothing here can touch real user data.',
        },
        roadmap: {
            title: { tr: 'Dört adımda ne yapacaksın', en: 'What you will do, in four steps' },
            items: [
                {
                    icon: '🐳',
                    label: { tr: 'Docker\'ı kur, yığını çalıştır', en: 'Install Docker, start the stack' },
                    result: {
                        tr: 'Kendi makinende çalışan bir PostgreSQL ve ona bağlı bir REST API.',
                        en: 'A PostgreSQL running on your own machine and a REST API connected to it.',
                    },
                },
                {
                    icon: '🗄️',
                    label: { tr: 'DBeaver ile veritabanına bağlan', en: 'Connect to the database with DBeaver' },
                    result: {
                        tr: 'Veriyi kendi gözünle görmek ve doğrulama sorgularını koşturmak.',
                        en: 'Seeing the data with your own eyes and running the validation queries.',
                    },
                },
                {
                    icon: '📜',
                    label: { tr: 'Sözleşmeyi Swagger\'da aç', en: 'Open the contract in Swagger' },
                    result: {
                        tr: 'Hangi ucun ne döndüğünü tahmin etmek yerine sözleşmeden okumak.',
                        en: 'Reading what each endpoint returns from the contract instead of guessing.',
                    },
                },
                {
                    icon: '🧭',
                    label: { tr: 'Uçları test et: elle → Postman → Newman', en: 'Test the endpoints: by hand, then Postman, then Newman' },
                    result: {
                        tr: 'Komut satırından koşan ve rapor üreten, tekrar edilebilir bir test paketi.',
                        en: 'A repeatable test pack that runs from the command line and produces a report.',
                    },
                },
            ],
        },
    },

    steps: [

        // ───────────────────────────── ADIM 1 ─────────────────────────────
        // Bu adım önceki sürümde YOKTU. Rehber Docker'ı kurulu varsayıyordu;
        // Docker'ı olmayan bir makinede ilk komutta duvara çarpılıyordu.
        {
            id: 'step-1-docker',
            number: 1,
            icon: '🐳',
            title: { tr: 'Docker\'ı kur ve pratik yığınını çalıştır', en: 'Install Docker and start the practice stack' },
            goal: {
                tr: 'Sonunda: makinende bir PostgreSQL ve ona bağlı bir REST API ayakta olacak, sağlık ucu {"status":"ok","database":"up"} dönecek.',
                en: 'By the end: a PostgreSQL and a REST API connected to it will be running on your machine, and the health endpoint will return {"status":"ok","database":"up"}.',
            },
            blocks: [
                {
                    type: 'why',
                    title: { tr: 'Neden Docker? Veritabanını doğrudan kursak olmaz mı?', en: 'Why Docker? Could we not just install the database directly?' },
                    content: {
                        tr: 'Bir veritabanını doğrudan kurmak şu zinciri gerektirir: kurulum sihirbazından geç, sürüm seç, servisi başlat, kullanıcı ve parola tanımla, sonra şemayı ve veriyi elle yükle. Bu zincirin her halkası makineden makineye değişir ve bir halka kayarsa hata çoğu zaman günler sonra "bende çalışıyordu" cümlesiyle ortaya çıkar. Docker aynı işi tek bir tarifeye bağlar: veritabanının sürümü, kullanıcısı, portu ve içine yüklenecek tohum veri tek bir dosyada yazılıdır ve her makinede aynı şeyi üretir. Peki bunun test yazan biri için önemi ne? Şu: bir testin güvenilir olması önce ortamın tekrar edilebilir olmasına bağlıdır. Aynı veriden başlamayan bir test, kırmızıya döndüğünde sana ürünün mü yoksa ortamın mı bozuk olduğunu söyleyemez — ve teşhis edilemeyen bir kırmızı, ekiplerin bir süre sonra görmezden gelmeye başladığı testtir.',
                        en: 'Installing a database directly requires this chain: walk through an installer, pick a version, start the service, define a user and password, then load the schema and data by hand. Every link in that chain varies from machine to machine, and if one slips, the failure usually surfaces days later as "it worked on my machine". Docker binds the same work to a single recipe: the database version, its user, its port and the seed data loaded into it are written in one file and produce the same thing on every machine. Why does that matter to someone writing tests? Because a test can only be trustworthy if the environment is repeatable first. A test that does not start from the same data cannot tell you, when it goes red, whether the product or the environment is broken — and a red you cannot diagnose is the test teams eventually start ignoring.',
                    },
                },
                {
                    type: 'table',
                    title: { tr: 'Bu rehberde ne kuracaksın', en: 'What you will install in this guide' },
                    headers: { tr: ['Araç', 'Ne işe yarar', 'Zorunlu mu?'], en: ['Tool', 'What it does', 'Required?'] },
                    rows: [
                        [
                            { tr: 'Docker Desktop', en: 'Docker Desktop' },
                            { tr: 'Veritabanını ve API\'yi tek komutla ayağa kaldırır', en: 'Brings up the database and the API with one command' },
                            { tr: 'Evet — yığının tamamı bunun üstünde çalışır', en: 'Yes — the whole stack runs on it' },
                        ],
                        [
                            { tr: 'DBeaver', en: 'DBeaver' },
                            { tr: 'Veritabanına bağlanıp SQL yazmanı sağlar', en: 'Lets you connect to the database and write SQL' },
                            { tr: 'Evet — ikinci adım bunu kullanır', en: 'Yes — step two uses it' },
                        ],
                        [
                            { tr: 'Postman', en: 'Postman' },
                            { tr: 'API isteklerini arayüzden kurar ve doğrular', en: 'Builds and asserts API requests from a UI' },
                            { tr: 'Evet — dördüncü adım bunu kullanır', en: 'Yes — step four uses it' },
                        ],
                        [
                            { tr: 'Node.js + Newman', en: 'Node.js + Newman' },
                            { tr: 'Postman koleksiyonunu komut satırından koşturur', en: 'Runs the Postman collection from the command line' },
                            { tr: 'Hayır — ama testi bir pipeline\'a sokmak için gerekir', en: 'No — but needed to put the test into a pipeline' },
                        ],
                    ],
                },
                {
                    type: 'substep',
                    title: { tr: 'Windows: önce WSL2 (bu adım atlanamaz)', en: 'Windows: WSL2 first (this step cannot be skipped)' },
                    content: {
                        tr: 'Docker Desktop, Windows\'ta Linux konteynerlerini çalıştırmak için WSL2 adlı bir Windows bileşenini kullanır. Docker kurulumu bunu çoğu zaman kendisi açar, ama makinede kapalıysa kurulum yarıda hata verir. Kurulumdan önce halletmek en temizi. PowerShell\'i YÖNETİCİ olarak aç (Başlat menüsüne PowerShell yaz, üstüne sağ tıkla, "Yönetici olarak çalıştır" de) ve şu komutu ver.',
                        en: 'On Windows, Docker Desktop uses a Windows component called WSL2 to run Linux containers. The Docker installer usually enables it for you, but if it is disabled on your machine the installation fails halfway. Getting it out of the way first is cleanest. Open PowerShell as ADMINISTRATOR (type PowerShell in the Start menu, right-click it, choose "Run as administrator") and run this.',
                    },
                    code: {
                        tr: `# Yönetici olarak açılmış PowerShell'de:
wsl --install

# Kurulum bittiğinde makineyi YENİDEN BAŞLAT. Bu adım isteğe bağlı değil.
# Yeniden başlattıktan sonra doğrula:
wsl --status

# Beklenen: "Varsayılan Sürüm: 2" benzeri bir satır görmelisin.`,
                        en: `# In PowerShell opened as administrator:
wsl --install

# When it finishes, RESTART the machine. This step is not optional.
# After restarting, verify:
wsl --status

# Expected: a line similar to "Default Version: 2".`,
                    },
                    language: 'powershell',
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'Yeniden başlatmayı atlarsan', en: 'If you skip the restart' },
                    content: {
                        tr: 'WSL2 kurulumu yeniden başlatma yapılmadan tamamlanmaz. Atlarsan Docker Desktop açılışta "WSL 2 installation is incomplete" hatası verir ve motor hiç başlamaz. Bu hata kafa karıştırıcıdır çünkü Docker\'ın kendisi düzgün kurulmuştur — eksik olan altındaki Windows bileşenidir.',
                        en: 'The WSL2 installation does not complete without a restart. If you skip it, Docker Desktop shows "WSL 2 installation is incomplete" on startup and the engine never starts. The error is confusing because Docker itself installed correctly — what is missing is the Windows component underneath it.',
                    },
                },
                {
                    type: 'clickpath',
                    title: { tr: 'Windows: Docker Desktop kurulumu', en: 'Windows: installing Docker Desktop' },
                    items: [
                        { tr: 'docker.com/products/docker-desktop adresine git ve "Download for Windows" bağlantısını indir.', en: 'Go to docker.com/products/docker-desktop and download the "Download for Windows" link.' },
                        { tr: 'İnen "Docker Desktop Installer.exe" dosyasını çift tıkla.', en: 'Double-click the downloaded "Docker Desktop Installer.exe".' },
                        { tr: 'Kurulum ekranındaki "Use WSL 2 instead of Hyper-V" seçeneği işaretli kalsın — kaldırma.', en: 'Leave the "Use WSL 2 instead of Hyper-V" option checked on the installer screen — do not uncheck it.' },
                        { tr: 'Kurulum bitince "Close and restart" düğmesine bas.', en: 'When the installation finishes, press "Close and restart".' },
                        { tr: 'Makine açıldığında Docker Desktop\'ı başlat ve lisans metnini kabul et. Hesap açman istenirse atlayabilirsin, gerekmiyor.', en: 'After the machine comes back, start Docker Desktop and accept the licence text. If it asks you to sign up, you can skip it — it is not required.' },
                        { tr: 'Görev çubuğunda balina simgesi belirir. Simge hareket etmeyi bırakıp sabitlenene kadar bekle — motor ancak o an hazırdır.', en: 'A whale icon appears in the taskbar. Wait until it stops animating and settles — only then is the engine ready.' },
                    ],
                },
                {
                    type: 'substep',
                    title: { tr: 'macOS kurulumu', en: 'macOS installation' },
                    content: {
                        tr: 'İki yol var: docker.com üzerinden .dmg dosyasını indirip Applications klasörüne sürüklemek, ya da Homebrew kullanmak. İşlemcine uygun sürümü seçmen gerekir (Apple Silicon / Intel) — docker.com bunu genelde kendisi algılar. Kurulumdan sonra uygulamayı bir kez ELLE açman şart; Docker motoru ancak uygulama çalışırken ayaktadır.',
                        en: 'Two options: download the .dmg from docker.com and drag it into Applications, or use Homebrew. You need the build that matches your processor (Apple Silicon / Intel) — docker.com usually detects this for you. After installing you must open the app MANUALLY once; the Docker engine is only up while the app is running.',
                    },
                    code: {
                        tr: `# Homebrew ile:
brew install --cask docker

# Sonra uygulamayı bir kez elle aç (Launchpad > Docker).
# Üst menü çubuğunda balina simgesi sabitlenince hazırdır.`,
                        en: `# With Homebrew:
brew install --cask docker

# Then open the app manually once (Launchpad > Docker).
# It is ready when the whale icon settles in the menu bar.`,
                    },
                    language: 'bash',
                },
                {
                    type: 'substep',
                    title: { tr: 'Linux kurulumu (Ubuntu/Debian)', en: 'Linux installation (Ubuntu/Debian)' },
                    content: {
                        tr: 'Linux\'ta Docker Desktop\'a gerek yok, motor doğrudan kurulur. Dikkat edilecek tek nokta: kurulumdan sonra kendini docker grubuna eklemezsen her komutta sudo yazman gerekir. Grup değişikliği ancak oturumu kapatıp açtığında geçerli olur.',
                        en: 'On Linux you do not need Docker Desktop; the engine installs directly. The one thing to watch: unless you add yourself to the docker group, you have to type sudo on every command. The group change only takes effect after you log out and back in.',
                    },
                    code: {
                        tr: `# Motor + compose eklentisi
sudo apt update
sudo apt install -y docker.io docker-compose-plugin

# Her komutta sudo yazmamak için kendini gruba ekle
sudo usermod -aG docker $USER

# Oturumu kapatıp yeniden aç (grup değişikliği ancak o zaman geçerli olur)`,
                        en: `# Engine + compose plugin
sudo apt update
sudo apt install -y docker.io docker-compose-plugin

# Add yourself to the group so you do not need sudo every time
sudo usermod -aG docker $USER

# Log out and back in (the group change only applies then)`,
                    },
                    language: 'bash',
                },
                {
                    type: 'substep',
                    title: { tr: 'Kurulumu doğrula — üç komut', en: 'Verify the installation — three commands' },
                    content: {
                        tr: 'Bu üç komut sırayla şunu söyler: Docker kurulu mu, compose eklentisi var mı, motor gerçekten konteyner çalıştırabiliyor mu. Üçüncüsü en önemlisi — ilk ikisi yalnızca dosyaların yerinde olduğunu gösterir, motorun ayakta olduğunu göstermez.',
                        en: 'These three commands answer, in order: is Docker installed, is the compose plugin there, can the engine actually run a container. The third matters most — the first two only show the files are in place, not that the engine is up.',
                    },
                    code: {
                        tr: `docker --version
# Beklenen: Docker version 27.x.x, build ...

docker compose version
# Beklenen: Docker Compose version v2.x.x

docker run --rm hello-world
# Beklenen: "Hello from Docker!" ile başlayan bir metin.
# Bu metni gördüysen motor gerçekten çalışıyor demektir.`,
                        en: `docker --version
# Expected: Docker version 27.x.x, build ...

docker compose version
# Expected: Docker Compose version v2.x.x

docker run --rm hello-world
# Expected: a message starting with "Hello from Docker!".
# If you see it, the engine really is running.`,
                    },
                    language: 'bash',
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: '"docker terim olarak tanınmıyor" diyorsa', en: 'If it says "docker is not recognized"' },
                    content: {
                        tr: 'İki nedeni olur. Birincisi: Docker Desktop çalışmıyordur — görev çubuğundan başlat ve balina sabitlenene kadar bekle. İkincisi, daha sinsi olanı: terminali Docker kurulmadan ÖNCE açtıysan o pencere eski PATH değerini taşır ve yeni komutu göremez. Terminali tamamen kapatıp yeniden açmak bunu çözer. Bu ikinci durum kurulumun başarısız olduğu izlenimi verir, oysa yalnızca pencere eskidir.',
                        en: 'Two possible causes. First: Docker Desktop is not running — start it from the taskbar and wait for the whale to settle. Second, and sneakier: if you opened the terminal BEFORE installing Docker, that window carries the old PATH and cannot see the new command. Closing the terminal completely and reopening it fixes this. The second case looks like a failed installation, when really it is just a stale window.',
                    },
                },
                {
                    type: 'substep',
                    title: { tr: 'Pratik yığınını başlat', en: 'Start the practice stack' },
                    content: {
                        tr: 'Depodaki qa-shop klasörüne gir ve tek komut ver. İlk açılış imajları indirdiği, şemayı kurduğu ve tohum veriyi yüklediği için yaklaşık 30-60 saniye sürer; sonraki açılışlar birkaç saniyedir. Komutu qa-shop klasörünün İÇİNDE çalıştırman gerekir — compose dosyası orada.',
                        en: 'Go into the repo\'s qa-shop folder and run one command. The first start takes about 30-60 seconds because it downloads images, creates the schema and loads the seed data; later starts take a few seconds. You must run the command INSIDE the qa-shop folder — that is where the compose file lives.',
                    },
                    code: {
                        tr: `cd qa-shop
docker compose up -d

# Beklenen çıktı (satır sırası değişebilir):
#   Network qa-shop_default   Created
#   Container qashop-db       Started
#   Container qashop-api      Started
#
# -d "arka planda çalıştır" demek: komut biter, konteynerler ayakta kalır.`,
                        en: `cd qa-shop
docker compose up -d

# Expected output (line order may vary):
#   Network qa-shop_default   Created
#   Container qashop-db       Started
#   Container qashop-api      Started
#
# -d means "run in the background": the command returns, the containers stay up.`,
                    },
                    language: 'bash',
                },
                {
                    type: 'substep',
                    title: { tr: 'Gerçekten ayakta mı?', en: 'Are they really up?' },
                    content: {
                        tr: '"Started" yazması konteynerin başlatıldığını söyler, sağlıklı olduğunu söylemez. Veritabanı tohum veriyi yüklerken bir süre "starting" durumunda kalır. Durumu görmek ve tohumlamanın bittiğini anlamak için şu iki komut kullanılır.',
                        en: '"Started" tells you the container was launched, not that it is healthy. While the database loads the seed data it stays in a "starting" state for a while. These two commands show the status and tell you when seeding is finished.',
                    },
                    code: {
                        tr: `docker compose ps
# qashop-db satırında STATUS sütunu "healthy" olmalı.
# "starting" görüyorsan tohumlama sürüyor demektir, birkaç saniye bekle.

docker compose logs db
# Şu satırı ara: "database system is ready to accept connections"
# Bu satır göründüyse şema ve tohum veri yüklenmiş demektir.`,
                        en: `docker compose ps
# On the qashop-db row, the STATUS column should read "healthy".
# If you see "starting", seeding is still running — wait a few seconds.

docker compose logs db
# Look for: "database system is ready to accept connections"
# Once that line appears, the schema and seed data are loaded.`,
                    },
                    language: 'bash',
                },
                {
                    type: 'substep',
                    title: { tr: 'Sağlık kontrolü — yığının ilk cevabı', en: 'Health check — the stack\'s first answer' },
                    content: {
                        tr: 'API\'nin bir sağlık ucu var ve bu uç bilerek veritabanı kontrolünden ÖNCE cevap verecek şekilde yazıldı: servis ayakta ama veritabanı ölüyse "degraded" döner. Böylece "servis mi öldü, veritabanı mı" sorusu tek istekle ayrışır. Beklenen cevap iki alanın da yeşil olduğu hâlidir.',
                        en: 'The API has a health endpoint, deliberately written to answer BEFORE the database check: if the service is up but the database is down it returns "degraded". That way a single request separates "did the service die or the database". The expected answer is the one where both fields are green.',
                    },
                    code: {
                        tr: `# Windows (PowerShell) — .exe uzantısına dikkat:
curl.exe http://localhost:4000/health

# Windows'ta PowerShell'in kendi komutunu tercih edersen:
Invoke-RestMethod http://localhost:4000/health

# macOS / Linux:
curl http://localhost:4000/health

# Beklenen cevap:
# {"status":"ok","database":"up","uptimeSeconds":12,"time":"..."}`,
                        en: `# Windows (PowerShell) — note the .exe extension:
curl.exe http://localhost:4000/health

# If you prefer PowerShell's own command on Windows:
Invoke-RestMethod http://localhost:4000/health

# macOS / Linux:
curl http://localhost:4000/health

# Expected response:
# {"status":"ok","database":"up","uptimeSeconds":12,"time":"..."}`,
                    },
                    language: 'bash',
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'PowerShell\'de curl aslında curl değildir', en: 'In PowerShell, curl is not actually curl' },
                    content: {
                        tr: 'Windows PowerShell\'de curl yazdığında çalışan program cURL değil, PowerShell\'in kendi Invoke-WebRequest komutudur — curl yalnızca ona verilmiş bir takma addır. Sonuç: internette bulduğun cURL örneklerindeki -H, -d, -X gibi seçenekler orada başka anlama gelir ve komut, sorunla ilgisi olmayan hatalar verir. İki çıkış yolu var: ya curl.exe diye tam adını yaz (gerçek cURL Windows 10 ve üstünde hazır kuruludur), ya da PowerShell\'in Invoke-RestMethod komutunu kullan. Bu rehberdeki cURL örneklerini PowerShell\'de deneyeceksen başına .exe eklemen yeterli.',
                        en: 'In Windows PowerShell, typing curl runs PowerShell\'s own Invoke-WebRequest command, not cURL — curl is merely an alias for it. The result: options like -H, -d and -X from cURL examples you find online mean something else there, and the command fails with errors unrelated to your actual problem. Two ways out: write the full name curl.exe (real cURL ships with Windows 10 and later), or use PowerShell\'s Invoke-RestMethod. If you want to try this guide\'s cURL examples in PowerShell, adding .exe is enough.',
                    },
                },
                {
                    type: 'table',
                    title: { tr: 'Kurulumda en sık çıkan hatalar', en: 'The most common errors during setup' },
                    headers: { tr: ['Hata', 'Nedeni', 'Çözüm'], en: ['Error', 'Cause', 'Fix'] },
                    rows: [
                        [
                            { tr: 'docker: command not found', en: 'docker: command not found' },
                            { tr: 'Docker kurulu değil ya da terminal eski PATH ile açık', en: 'Docker is not installed, or the terminal holds a stale PATH' },
                            { tr: 'Docker Desktop\'ı başlat; terminali kapatıp yeniden aç', en: 'Start Docker Desktop; close the terminal and reopen it' },
                        ],
                        [
                            { tr: 'Cannot connect to the Docker daemon', en: 'Cannot connect to the Docker daemon' },
                            { tr: 'Komut var ama motor çalışmıyor', en: 'The command exists but the engine is not running' },
                            { tr: 'Docker Desktop\'ı aç, balina simgesi sabitlenene kadar bekle', en: 'Open Docker Desktop, wait for the whale icon to settle' },
                        ],
                        [
                            { tr: 'WSL 2 installation is incomplete', en: 'WSL 2 installation is incomplete' },
                            { tr: 'wsl --install sonrası yeniden başlatma yapılmamış', en: 'The machine was not restarted after wsl --install' },
                            { tr: 'Makineyi yeniden başlat, sonra wsl --status ile doğrula', en: 'Restart the machine, then verify with wsl --status' },
                        ],
                        [
                            { tr: 'port is already allocated (5433)', en: 'port is already allocated (5433)' },
                            { tr: '5433 portunu başka bir süreç tutuyor', en: 'Another process is holding port 5433' },
                            { tr: 'O süreci kapat ya da compose dosyasındaki host portunu değiştir', en: 'Stop that process, or change the host port in the compose file' },
                        ],
                        [
                            { tr: 'port is already allocated (4000)', en: 'port is already allocated (4000)' },
                            { tr: '4000 portunu başka bir uygulama dinliyor', en: 'Another application is listening on port 4000' },
                            { tr: 'Aynı şekilde: süreci kapat ya da host portunu değiştir', en: 'Same fix: stop the process or change the host port' },
                        ],
                        [
                            { tr: 'qashop-api sürekli yeniden başlıyor', en: 'qashop-api keeps restarting' },
                            { tr: 'Veritabanı hazır değil ya da şema yüklenirken hata verdi', en: 'The database is not ready, or the schema failed to load' },
                            { tr: 'docker compose logs db çıktısını oku — gerçek hata orada', en: 'Read docker compose logs db — the real error is there' },
                        ],
                        [
                            { tr: 'database "qashop" does not exist', en: 'database "qashop" does not exist' },
                            { tr: 'İlk açılış tamamlanmadan bağlanıldı', en: 'You connected before the first-time init finished' },
                            { tr: 'Loglarda "ready to accept connections" satırını bekle', en: 'Wait for the "ready to accept connections" line in the logs' },
                        ],
                        [
                            { tr: 'Şemayı değiştirdim ama hiçbir şey değişmedi', en: 'I changed the schema but nothing changed' },
                            { tr: 'PostgreSQL kurulum dosyalarını yalnızca veri dizini BOŞKEN çalıştırır', en: 'PostgreSQL only runs init files when the data directory is EMPTY' },
                            { tr: 'docker compose down -v ile veriyi sil, sonra yeniden başlat', en: 'Delete the data with docker compose down -v, then start again' },
                        ],
                    ],
                },
                {
                    type: 'substep',
                    title: { tr: 'Durdurma, yeniden başlatma, sıfırlama', en: 'Stopping, restarting, resetting' },
                    content: {
                        tr: 'Üç komut ve aralarındaki tek fark: -v seçeneği veri dizinini de siler. Bu ayrım önemlidir çünkü PostgreSQL şema ve tohum dosyalarını YALNIZCA veri dizini boşken çalıştırır. Yani şemayı değiştirdiysen ve -v kullanmadıysan değişikliğin hiçbir etkisi olmaz — üstelik bunu sana söyleyen bir hata da almazsın. Sessizce eski veriyle çalışmaya devam edersin.',
                        en: 'Three commands, with one difference between them: the -v option also deletes the data directory. That distinction matters because PostgreSQL runs the schema and seed files ONLY when the data directory is empty. So if you changed the schema and did not use -v, your change has no effect — and you get no error telling you so. You simply keep working with the old data.',
                    },
                    code: {
                        tr: `docker compose down       # durdurur, veri KALIR
docker compose down -v    # veriyi de siler (şema/tohum değiştirdiysen ZORUNLU)
docker compose up -d      # yeniden başlatır

# Sıfırdan temiz kurulum isteniyorsa ikisi arka arkaya:
docker compose down -v
docker compose up -d`,
                        en: `docker compose down       # stops them, data is KEPT
docker compose down -v    # deletes the data too (REQUIRED if you changed schema/seed)
docker compose up -d      # starts them again

# For a clean reinstall from scratch, run the two in sequence:
docker compose down -v
docker compose up -d`,
                    },
                    language: 'bash',
                },
                {
                    type: 'checklist',
                    title: { tr: 'Bu adımı bitirdiğinde elinde ne var?', en: 'What do you have when this step is done?' },
                    items: [
                        { tr: 'Çalışan bir Docker motoru ve doğrulanmış bir kurulum (hello-world çıktısı)', en: 'A running Docker engine and a verified installation (the hello-world output)' },
                        { tr: 'Ayakta ve "healthy" durumda bir PostgreSQL konteyneri', en: 'A PostgreSQL container that is up and reporting "healthy"' },
                        { tr: 'Ona bağlı, sağlık ucu yeşil dönen bir REST API', en: 'A REST API connected to it whose health endpoint returns green' },
                        { tr: 'Veriyi silmeden durdurma ile sıfırdan kurma arasındaki farkı bilmek', en: 'Knowing the difference between stopping without data loss and a full reset' },
                    ],
                },
            ],
        },

        // ───────────────────────────── ADIM 2 ─────────────────────────────
        {
            id: 'step-2-database',
            number: 2,
            icon: '🗄️',
            title: { tr: 'Veritabanına bağlan (DBeaver)', en: 'Connect to the database (DBeaver)' },
            goal: {
                tr: 'Sonunda: DBeaver ile veritabanına bağlanmış, tohum verinin yüklendiğini doğrulamış ve hazır doğrulama sorgu paketini çalıştırmış olacaksın.',
                en: 'By the end: you will be connected to the database with DBeaver, have confirmed the seed data loaded, and have run the ready-made validation query pack.',
            },
            blocks: [
                {
                    type: 'why',
                    title: { tr: 'Neden önce veritabanı?', en: 'Why the database first?' },
                    content: {
                        tr: 'Arayüz "Sipariş oluşturuldu" der ve yeşil bir onay gösterir. Bu cümle, siparişin toplamının satır toplamlarıyla tuttuğunu söylemez. Stoğun düştüğünü de söylemez. Kuponun sayacının arttığını da. Arayüzün gösterebileceği tek şey kendi ekranıdır; verinin tutarlı olup olmadığını yalnızca veritabanı bilir. Bu yüzden zincirin ilk halkası burası.',
                        en: 'The interface says "Order created" and shows a green confirmation. That sentence does not tell you whether the order total matches its line items. Nor that stock was decremented. Nor that the coupon counter advanced. All the interface can show you is its own screen; only the database knows whether the data is consistent. That is why this is the first link in the chain.',
                    },
                },
                {
                    type: 'clickpath',
                    title: { tr: 'DBeaver\'ı indir ve kur', en: 'Download and install DBeaver' },
                    items: [
                        { tr: 'dbeaver.io/download adresine git.', en: 'Go to dbeaver.io/download.' },
                        { tr: 'Community Edition sütununu seç — ücretsiz olan bu, PostgreSQL için fazlasıyla yeterli.', en: 'Pick the Community Edition column — that is the free one and it is more than enough for PostgreSQL.' },
                        { tr: 'İşletim sistemine uygun kurulumu indir (Windows Installer / macOS dmg / Linux paketi).', en: 'Download the installer for your OS (Windows Installer / macOS dmg / Linux package).' },
                        { tr: 'Kurulumu varsayılan ayarlarla tamamla, değiştirilecek bir şey yok.', en: 'Complete the installation with the default settings; there is nothing to change.' },
                        { tr: 'İlk açılışta "örnek veritabanı oluşturulsun mu?" diye sorarsa Hayır de — bizim gerçek bir veritabanımız var.', en: 'If it asks "create a sample database?" on first launch, say No — we have a real database.' },
                    ],
                },
                {
                    type: 'clickpath',
                    title: { tr: 'Bağlantıyı adım adım kur', en: 'Create the connection, step by step' },
                    items: [
                        { tr: 'Üst menüden Database > New Database Connection yolunu izle.', en: 'From the top menu follow Database > New Database Connection.' },
                        { tr: 'Açılan listeden PostgreSQL simgesini seç ve Next de.', en: 'Select the PostgreSQL icon from the list and press Next.' },
                        { tr: 'Main sekmesinde Host alanına localhost, Port alanına 5433, Database alanına qashop yaz.', en: 'On the Main tab, enter localhost for Host, 5433 for Port and qashop for Database.' },
                        { tr: 'Authentication bölümünde Username ve Password alanlarının ikisine de qashop yaz, "Save password" kutusunu işaretle.', en: 'In the Authentication section, type qashop into both Username and Password, and tick "Save password".' },
                        { tr: 'Pencerenin altında "Download driver files" uyarısı çıkarsa Download düğmesine bas — DBeaver PostgreSQL sürücüsünü kendisi indirir. Bir kez yapılır, internet gerekir.', en: 'If a "Download driver files" prompt appears at the bottom, press Download — DBeaver fetches the PostgreSQL driver itself. It happens once and needs internet.' },
                        { tr: 'Sol alttaki Test Connection düğmesine bas. "Connected" yazısını görmeden Finish deme — bu düğme, hatayı sonra değil şimdi görmeni sağlar.', en: 'Press Test Connection at the bottom left. Do not press Finish before you see "Connected" — that button is what makes you see the error now rather than later.' },
                        { tr: 'Finish de. Sol paneldeki Database Navigator ağacında qashop bağlantısı belirir.', en: 'Press Finish. The qashop connection appears in the Database Navigator tree on the left.' },
                    ],
                },
                {
                    type: 'table',
                    title: { tr: 'DBeaver bağlantı bilgileri', en: 'DBeaver connection settings' },
                    headers: { tr: ['Alan', 'Değer'], en: ['Field', 'Value'] },
                    rows: [
                        [{ tr: 'Veritabanı tipi', en: 'Database type' }, { tr: 'PostgreSQL', en: 'PostgreSQL' }],
                        [{ tr: 'Host', en: 'Host' }, { tr: 'localhost', en: 'localhost' }],
                        [{ tr: 'Port', en: 'Port' }, { tr: '5433  (5432 DEĞİL)', en: '5433  (NOT 5432)' }],
                        [{ tr: 'Database', en: 'Database' }, { tr: 'qashop', en: 'qashop' }],
                        [{ tr: 'Kullanıcı', en: 'Username' }, { tr: 'qashop', en: 'qashop' }],
                        [{ tr: 'Parola', en: 'Password' }, { tr: 'qashop', en: 'qashop' }],
                    ],
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'Port neden 5433?', en: 'Why port 5433?' },
                    content: {
                        tr: 'Makinende zaten bir PostgreSQL kuruluysa 5432 doludur. Docker o portu alamaz ve konteyner sessizce başlamaz — hata mesajı da genelde gözden kaçar. 5433 bu çakışmayı baştan ortadan kaldırır. DBeaver\'da 5432 yazarsan, makinendeki BAŞKA bir veritabanına bağlanır ve "tablolar yok" dersin; hata mesajı seni yanlış yere bakmaya iter.',
                        en: 'If you already have PostgreSQL installed, 5432 is taken. Docker cannot bind it and the container quietly fails to start — and the error is easy to miss. Port 5433 removes that collision up front. If you type 5432 in DBeaver you will connect to a DIFFERENT database on your machine and conclude "there are no tables"; the error points you at the wrong place.',
                    },
                },
                {
                    type: 'clickpath',
                    title: { tr: 'Sorguyu nasıl çalıştırırsın', en: 'How to run a query' },
                    items: [
                        { tr: 'Sol paneldeki qashop bağlantısına bir kez tıkla (seçili olsun).', en: 'Click the qashop connection in the left panel once (so it is selected).' },
                        { tr: 'Üst menüden SQL Editor > New SQL script seç. Kısayolu: Ctrl + ]', en: 'From the top menu choose SQL Editor > New SQL script. Shortcut: Ctrl + ]' },
                        { tr: 'Açılan boş editöre sorguyu yapıştır.', en: 'Paste the query into the empty editor that opens.' },
                        { tr: 'İmlecin üstünde durduğu TEK sorguyu çalıştırmak için Ctrl + Enter.', en: 'Press Ctrl + Enter to run the SINGLE query the cursor sits on.' },
                        { tr: 'Dosyadaki TÜM sorguları sırayla çalıştırmak için Alt + X.', en: 'Press Alt + X to run ALL queries in the file in sequence.' },
                        { tr: 'Sonuç alt paneldeki Grid sekmesinde tablo olarak açılır; sekme başlığında dönen satır sayısı yazar.', en: 'The result opens as a table in the Grid tab below; the tab header shows how many rows came back.' },
                    ],
                },
                {
                    type: 'substep',
                    title: { tr: 'İlk sorgun: tohum veri gerçekten yüklendi mi?', en: 'Your first query: did the seed data really load?' },
                    content: {
                        tr: 'Bağlantı kurulduktan sonra ilk iş verinin orada olduğunu görmektir. Bu sorgu şablon veri alanındaki satır sayılarını verir. Beklenen sayıları tutturamıyorsan tohumlama yarıda kalmış demektir — o durumda yığını -v ile sıfırlamak gerekir.',
                        en: 'Once connected, the first job is to see that the data is there. This query returns row counts in the template data area. If the numbers do not match, seeding was interrupted — in that case you need to reset the stack with -v.',
                    },
                    code: {
                        tr: `-- Şablon veri alanındaki satır sayıları
select 'urun' as tablo, count(*) from products
 where sandbox_id = '00000000-0000-0000-0000-000000000000'
union all
select 'siparis', count(*) from orders
 where sandbox_id = '00000000-0000-0000-0000-000000000000'
union all
select 'siparis satiri', count(*) from order_items
 where sandbox_id = '00000000-0000-0000-0000-000000000000';

-- Beklenen: 120 ürün · 150 sipariş · yaklaşık 300 sipariş satırı`,
                        en: `-- Row counts in the template data area
select 'products' as table_name, count(*) from products
 where sandbox_id = '00000000-0000-0000-0000-000000000000'
union all
select 'orders', count(*) from orders
 where sandbox_id = '00000000-0000-0000-0000-000000000000'
union all
select 'order items', count(*) from order_items
 where sandbox_id = '00000000-0000-0000-0000-000000000000';

-- Expected: 120 products, 150 orders, roughly 300 order items`,
                    },
                    language: 'sql',
                },
                {
                    type: 'substep',
                    title: { tr: 'Doğrulama sorgu paketini aç', en: 'Open the validation query pack' },
                    content: {
                        tr: 'qa-shop/db/validation-queries.sql dosyasını DBeaver\'da aç (File > Open File). Bu dosya bir SQL test paketidir ve her sorgunun sözleşmesi aynıdır: 0 satır dönerse GEÇTİ, en az 1 satır dönerse KALDI. Dosyanın sonundaki özet sorgu hepsini tek tabloda toplar — sprint raporuna veya değerlendirme görüşmesine koyacağın çıktı odur.',
                        en: 'Open qa-shop/db/validation-queries.sql in DBeaver (File > Open File). The file is a SQL test pack and every query has the same contract: 0 rows means PASS, one or more rows means FAIL. The summary query at the end collects them all into one table — that is the output you put in a sprint report or a performance review.',
                    },
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'Dosyayı DBeaver\'da açmadan önce iki satırı değiştir', en: 'Change two things before running the file in DBeaver' },
                    content: {
                        tr: 'Bu dosya komut satırı istemcisi psql için yazıldı ve onun iki özelliğini kullanıyor: dosyanın başındaki \\set sandbox satırı ve sorgulardaki :\'sandbox\' yazımı. İkisi de psql\'e özgüdür; DBeaver bunları anlamaz ve sözdizimi hatası verir. Bu, dosyanın bozuk olduğu anlamına gelmez — yalnızca farklı bir istemci için yazılmış olduğu anlamına gelir. Çözüm iki hareket: \\set satırını yorum yap ve arama-değiştir ile parametreyi gerçek değerine çevir. Aşağıdaki blok tam olarak neyi neye çevireceğini gösteriyor.',
                        en: 'This file was written for the command-line client psql and uses two of its features: the \\set sandbox line at the top and the :\'sandbox\' notation in the queries. Both are psql-specific; DBeaver does not understand them and reports a syntax error. That does not mean the file is broken — only that it was written for a different client. The fix is two moves: comment out the \\set line, and use find-and-replace to turn the parameter into its real value. The block below shows exactly what becomes what.',
                    },
                },
                {
                    type: 'substep',
                    title: { tr: 'DBeaver için dosyayı uyarla', en: 'Adapt the file for DBeaver' },
                    content: {
                        tr: 'Bir kez yapılır, sonra dosyanın tamamını Alt + X ile çalıştırabilirsin. Değiştirdiğin şey yalnızca parametrenin yazılış biçimi; sorguların mantığına dokunmuyorsun.',
                        en: 'You do this once, and then you can run the whole file with Alt + X. All you are changing is how the parameter is written; you are not touching the logic of the queries.',
                    },
                    code: {
                        tr: `-- 1) Dosyanın başındaki şu satırı yorum yap (başına -- koy):
-- \\set sandbox '00000000-0000-0000-0000-000000000000'

-- 2) Ctrl + F ile Replace panelini aç ve şunu değiştir:
--      Aranan  :  :'sandbox'
--      Yerine  :  '00000000-0000-0000-0000-000000000000'
--    (tırnaklar dahil — UUID metin olarak karşılaştırılıyor)

-- Sonuçta sorgular şöyle görünür:
select o.order_no, o.grand_total
  from orders o
 where o.sandbox_id = '00000000-0000-0000-0000-000000000000'
   and o.grand_total <> (o.subtotal - o.discount_total + o.shipping_total);

-- Bu sorgu 0 satır döndürüyorsa: sipariş toplamları bileşenleriyle tutuyor.`,
                        en: `-- 1) Comment out this line at the top of the file (prefix it with --):
-- \\set sandbox '00000000-0000-0000-0000-000000000000'

-- 2) Open the Replace panel with Ctrl + F and replace:
--      Find     :  :'sandbox'
--      Replace  :  '00000000-0000-0000-0000-000000000000'
--    (quotes included — the UUID is compared as text)

-- The queries then look like this:
select o.order_no, o.grand_total
  from orders o
 where o.sandbox_id = '00000000-0000-0000-0000-000000000000'
   and o.grand_total <> (o.subtotal - o.discount_total + o.shipping_total);

-- If this query returns 0 rows: order totals reconcile with their components.`,
                    },
                    language: 'sql',
                },
                {
                    type: 'substep',
                    title: { tr: 'Alternatif: dosyayı hiç değiştirmeden psql ile çalıştır', en: 'Alternative: run the file unchanged with psql' },
                    content: {
                        tr: 'Dosyaya dokunmak istemiyorsan, onu yazıldığı istemciye verebilirsin. psql zaten veritabanı konteynerinin içinde kurulu — ayrıca bir şey kurman gerekmez. Dosyayı dışarıdan konteynerin içine akıtırsın, \\set ve :\'sandbox\' olduğu gibi çalışır. Bu yol aynı zamanda tüm paketi tek komutta koşturduğu için otomasyona daha yakındır.',
                        en: 'If you would rather not touch the file, you can hand it to the client it was written for. psql is already installed inside the database container — you do not need to install anything. You pipe the file from outside into the container, and \\set and :\'sandbox\' work as written. This path is also closer to automation, since it runs the whole pack in one command.',
                    },
                    code: {
                        tr: `# Windows (PowerShell) — qa-shop klasöründeyken:
Get-Content db\\validation-queries.sql | docker exec -i qashop-db psql -U qashop -d qashop

# macOS / Linux:
docker exec -i qashop-db psql -U qashop -d qashop < db/validation-queries.sql

# Veritabanına elle bağlanıp tek tek sorgu yazmak istersen:
docker exec -it qashop-db psql -U qashop -d qashop
# Çıkmak için: \\q`,
                        en: `# Windows (PowerShell) — while inside the qa-shop folder:
Get-Content db\\validation-queries.sql | docker exec -i qashop-db psql -U qashop -d qashop

# macOS / Linux:
docker exec -i qashop-db psql -U qashop -d qashop < db/validation-queries.sql

# To connect by hand and type queries one at a time:
docker exec -it qashop-db psql -U qashop -d qashop
# To quit: \\q`,
                    },
                    language: 'bash',
                },
                {
                    type: 'callout',
                    tone: 'insight',
                    title: { tr: 'Yeşil kalan bir sorgu, çalıştığını kanıtlamaz', en: 'A query staying green does not prove it works' },
                    content: {
                        tr: 'Tohum veri tutarlıdır, yani kontroller ilk çalıştırmada yeşil döner. Ama her zaman yeşil kalan bir kontrol ile hiçbir şeye bakmayan bozuk bir kontrol ekranda birbirinin aynısıdır. Dosyanın son bölümü kusuru bilerek üretir, kontrolün kırmızıya döndüğünü gösterir ve geri alır. Bir sorguya güvenmeden önce oradan geçir.',
                        en: 'The seed data is consistent, so the checks come back green on the first run. But a check that is always green and a broken check that looks at nothing are indistinguishable on screen. The last section of the file injects a defect on purpose, shows the check turning red, and rolls it back. Put a query through it before you trust it.',
                    },
                },
                {
                    type: 'table',
                    title: { tr: 'Sık karşılaşılan bağlantı hataları', en: 'Common connection errors' },
                    headers: { tr: ['Hata', 'Nedeni', 'Çözüm'], en: ['Error', 'Cause', 'Fix'] },
                    rows: [
                        [
                            { tr: 'Connection refused', en: 'Connection refused' },
                            { tr: 'Konteyner ayakta değil ya da yanlış port', en: 'Container not running, or wrong port' },
                            { tr: 'docker compose ps ile durumu gör, portun 5433 olduğunu doğrula', en: 'Check with docker compose ps, confirm the port is 5433' },
                        ],
                        [
                            { tr: 'password authentication failed', en: 'password authentication failed' },
                            { tr: 'Kullanıcı/parola yanlış', en: 'Wrong username or password' },
                            { tr: 'Üçü de qashop: kullanıcı, parola, veritabanı adı', en: 'All three are qashop: user, password, database name' },
                        ],
                        [
                            { tr: 'database "qashop" does not exist', en: 'database "qashop" does not exist' },
                            { tr: 'İlk açılış tamamlanmadan bağlanıldı', en: 'Connected before first-time init finished' },
                            { tr: 'docker compose logs db ile tohum verinin bittiğini bekle', en: 'Wait for seeding to finish via docker compose logs db' },
                        ],
                        [
                            { tr: 'Tablolar boş görünüyor', en: 'Tables look empty' },
                            { tr: 'Şema değişti ama veri dizini eski', en: 'Schema changed but the data volume is old' },
                            { tr: 'docker compose down -v ile sıfırla; şema yalnızca boş dizinde yüklenir', en: 'Reset with docker compose down -v; the schema only loads into an empty volume' },
                        ],
                        [
                            { tr: 'syntax error at or near ":"', en: 'syntax error at or near ":"' },
                            { tr: 'Doğrulama dosyasındaki psql yazımı DBeaver\'da çalıştırıldı', en: 'The psql notation in the validation file was run in DBeaver' },
                            { tr: 'Parametreyi tırnaklı UUID ile değiştir ya da dosyayı psql\'e ver', en: 'Replace the parameter with the quoted UUID, or hand the file to psql' },
                        ],
                    ],
                },
                {
                    type: 'checklist',
                    title: { tr: 'Bu adımı bitirdiğinde elinde ne var?', en: 'What do you have when this step is done?' },
                    items: [
                        { tr: 'Kaydedilmiş, tek tıkla açılan bir veritabanı bağlantısı', en: 'A saved database connection you can open with one click' },
                        { tr: 'Tohum verinin gerçekten yüklendiğinin sayısal kanıtı', en: 'Numerical proof that the seed data actually loaded' },
                        { tr: 'Çalıştırılmış bir doğrulama sorgu paketi ve tek tabloluk özet çıktısı', en: 'A validation query pack you have run, and its single-table summary output' },
                        { tr: 'Bir sorgunun gerçekten bir şeye baktığını kusur enjekte ederek kanıtlama alışkanlığı', en: 'The habit of proving a query really looks at something by injecting a defect' },
                    ],
                },
            ],
        },

        // ───────────────────────────── ADIM 3 ─────────────────────────────
        {
            id: 'step-3-swagger',
            number: 3,
            icon: '📜',
            title: { tr: 'API sözleşmesini oku (Swagger / OpenAPI)', en: 'Read the API contract (Swagger / OpenAPI)' },
            goal: {
                tr: 'Sonunda: pratik API\'sinin tüm uçlarını Swagger arayüzünde görüyor, hangi ucun ne döndüğünü ve hangi hatanın hangi kodla geldiğini sözleşmeden okuyabiliyor olacaksın.',
                en: 'By the end: you will see every endpoint of the practice API in a Swagger interface, and be able to read from the contract what each endpoint returns and which error arrives with which code.',
            },
            blocks: [
                {
                    type: 'why',
                    title: { tr: 'Sözleşme neden testten önce gelir?', en: 'Why the contract comes before the test' },
                    content: {
                        tr: 'Sözleşmesi okunmadan yazılan API testi, aslında API\'nin o anki davranışını kopyalar. Bug varsa testi de bug ile birlikte yazılmış olur ve test sonsuza kadar yeşil kalır. Sözleşme, "olması gereken"i "olan"dan ayıran tek belgedir. Önce onu okursun, sonra gerçeğin ona uyup uymadığını test edersin.',
                        en: 'An API test written without reading the contract simply copies the API\'s current behaviour. If there is a bug, the test is written together with the bug and stays green forever. The contract is the only document that separates what should happen from what does happen. You read it first, then test whether reality matches it.',
                    },
                },
                {
                    type: 'substep',
                    title: { tr: 'Dosya nerede?', en: 'Where is the file?' },
                    content: {
                        tr: 'Sözleşme depoda qa-shop/api/openapi.yaml yolunda duruyor. Servis ayaktaysa aynı dosyayı adresten de alabilirsin. İki yol da aynı içeriği verir; hangisini kullanacağın yalnızca yığının o an ayakta olup olmamasına bağlı.',
                        en: 'The contract lives at qa-shop/api/openapi.yaml in the repo. If the service is up you can also fetch it over HTTP. Both give the same content; which one you use depends only on whether the stack happens to be running.',
                    },
                    code: {
                        tr: `# Ayakta olan servisten sözleşmeyi al (Windows'ta curl.exe)
curl.exe http://localhost:4000/api/v1/openapi.yaml

# 27 path, 29 operasyon, 19 şema tanımı içerir.

# Servis ayakta değilse dosyayı doğrudan diskten aç:
#   qa-shop/api/openapi.yaml`,
                        en: `# Fetch the contract from the running service (curl.exe on Windows)
curl.exe http://localhost:4000/api/v1/openapi.yaml

# It contains 27 paths, 29 operations, 19 schema definitions.

# If the service is not running, open the file straight from disk:
#   qa-shop/api/openapi.yaml`,
                    },
                    language: 'bash',
                },
                {
                    type: 'clickpath',
                    title: { tr: 'Swagger Editor\'da adım adım aç', en: 'Open it in Swagger Editor, step by step' },
                    items: [
                        { tr: 'Tarayıcıda editor.swagger.io adresini aç.', en: 'Open editor.swagger.io in your browser.' },
                        { tr: 'Açılışta hazır bir örnek (Petstore) yüklü gelir. File > Clear editor ile temizle.', en: 'A sample document (Petstore) is loaded by default. Clear it with File > Clear editor.' },
                        { tr: 'File > Import file yolunu seç ve diskten qa-shop/api/openapi.yaml dosyasını göster. Bu yol her zaman çalışır.', en: 'Choose File > Import file and point it at qa-shop/api/openapi.yaml on disk. This path always works.' },
                        { tr: 'Alternatif: yığın ayaktaysa File > Import URL ile http://localhost:4000/api/v1/openapi.yaml adresini verebilirsin.', en: 'Alternative: if the stack is up you can use File > Import URL with http://localhost:4000/api/v1/openapi.yaml.' },
                        { tr: 'Sol tarafta ham sözleşme, sağ tarafta uçların gezilebilir listesi çıkar.', en: 'The raw contract appears on the left, a browsable endpoint list on the right.' },
                        { tr: 'Sağdaki listede bir ucun üstüne tıkla: zorunlu parametreler, örnek istek gövdesi ve olası TÜM cevap kodları açılır.', en: 'Click an endpoint in the list on the right: required parameters, an example request body and ALL possible response codes unfold.' },
                    ],
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'Import URL çalışmazsa dosyadan yükle', en: 'If Import URL does not work, load from the file' },
                    content: {
                        tr: 'editor.swagger.io güvenli (https) bir sayfadır, senin API\'n ise makinende güvensiz (http) çalışır. Tarayıcılar güvenli bir sayfadan güvensiz bir adrese yapılan istekleri engelleyebilir. Bu bir kurulum hatası değildir ve düzeltmeye çalışman gerekmez — dosyayı Import file ile diskten yüklemek aynı sonucu verir ve yığının ayakta olmasını bile gerektirmez.',
                        en: 'editor.swagger.io is a secure (https) page, while your API runs insecurely (http) on your machine. Browsers may block requests from a secure page to an insecure address. This is not a setup error and you do not need to fix it — loading the file from disk with Import file gives the same result and does not even require the stack to be running.',
                    },
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'Kimlik iki katmanlı — en sık karıştırılan yer', en: 'Authentication has two layers — the most commonly confused part' },
                    content: {
                        tr: 'X-Sandbox-Key hangi VERİ ALANINA bağlandığını söyler; Authorization ise hangi KULLANICI olduğunu. İkisi farklı sorulara cevap verir ve birbirinin yerine geçmez. Sandbox anahtarı olmadan token işe yaramaz; token olmadan sandbox anahtarı yalnızca okuma yaptırır. Sözleşmede kilit işareti taşıyan uçlar ikisini birden ister.',
                        en: 'X-Sandbox-Key says which DATA AREA you are connected to; Authorization says which USER you are. They answer different questions and do not substitute for each other. Without the sandbox key a token is useless; without a token the sandbox key only lets you read. Endpoints marked with a lock in the contract require both.',
                    },
                },
                {
                    type: 'substep',
                    title: { tr: 'Sözleşmeyi okurken nelere bak', en: 'What to look for while reading the contract' },
                    content: {
                        tr: 'Bir ucu okurken üç şey aranır: hangi girdiler zorunlu, başarı durumunda hangi kod dönüyor, ve hata durumunda kaç farklı kod mümkün. Üçüncüsü en çok atlanandır ve testin asıl değeri oradadır — bir ucun yalnızca mutlu yolunu test etmek, hiç test etmemekten yalnızca biraz daha iyidir.',
                        en: 'While reading an endpoint, look for three things: which inputs are required, which code comes back on success, and how many distinct codes are possible on failure. The third is the most often skipped, and that is where the real value of testing lies — testing only the happy path of an endpoint is only slightly better than not testing it at all.',
                    },
                },
                {
                    type: 'table',
                    title: { tr: 'Kupon ucu: tek "geçersiz" yok, beş ayrı neden var', en: 'The coupon endpoint: not one "invalid", but five distinct reasons' },
                    headers: { tr: ['Hata kodu', 'Anlamı', 'Tohum verideki örnek'], en: ['Error code', 'Meaning', 'Example in seed data'] },
                    rows: [
                        [{ tr: 'COUPON_NOT_FOUND', en: 'COUPON_NOT_FOUND' }, { tr: 'Böyle bir kupon yok', en: 'No such coupon' }, { tr: '—', en: '—' }],
                        [{ tr: 'COUPON_NOT_STARTED', en: 'COUPON_NOT_STARTED' }, { tr: 'Geçerlilik henüz başlamadı', en: 'Validity has not started yet' }, { tr: 'FUTURE15', en: 'FUTURE15' }],
                        [{ tr: 'COUPON_EXPIRED', en: 'COUPON_EXPIRED' }, { tr: 'Süresi doldu', en: 'Expired' }, { tr: 'EXPIRED20', en: 'EXPIRED20' }],
                        [{ tr: 'COUPON_USAGE_LIMIT_REACHED', en: 'COUPON_USAGE_LIMIT_REACHED' }, { tr: 'Kullanım limiti doldu', en: 'Usage limit reached' }, { tr: 'MAXEDOUT', en: 'MAXEDOUT' }],
                        [{ tr: 'COUPON_MIN_TOTAL_NOT_MET', en: 'COUPON_MIN_TOTAL_NOT_MET' }, { tr: 'Sepet alt tutarı yetersiz', en: 'Cart below the minimum total' }, { tr: 'VIP1000', en: 'VIP1000' }],
                    ],
                },
                {
                    type: 'callout',
                    tone: 'insight',
                    title: { tr: 'Bu tablo neden önemli', en: 'Why that table matters' },
                    content: {
                        tr: 'Beş farklı neden tek bir "kupon geçersiz" mesajına indirgenseydi, hangi iş kuralının çalıştığını test etmek imkânsız olurdu. Süresi dolmuş kupon reddedildi mi, yoksa alt tutar yüzünden mi reddedildi — ikisi farklı bug\'lardır ve farklı ekipleri ilgilendirir. Bir API\'yi test ederken hata kodlarının ayrıştırılmış olması, test edilebilirliğin en somut göstergesidir.',
                        en: 'If those five reasons collapsed into a single "invalid coupon" message, it would be impossible to test which business rule fired. Was the expired coupon rejected, or was it rejected because of the minimum total? Those are different bugs and concern different teams. When testing an API, having distinct error codes is the most concrete sign of testability.',
                    },
                },
                {
                    type: 'checklist',
                    title: { tr: 'Bu adımı bitirdiğinde elinde ne var?', en: 'What do you have when this step is done?' },
                    items: [
                        { tr: 'Swagger arayüzünde açılmış, gezilebilir bir sözleşme', en: 'A browsable contract opened in a Swagger interface' },
                        { tr: 'Hangi ucun hangi başlıkları zorunlu tuttuğunun net resmi', en: 'A clear picture of which endpoint requires which headers' },
                        { tr: 'Mutlu yolun yanında hata yollarının da listesi', en: 'A list of the failure paths alongside the happy path' },
                        { tr: 'Testi davranışa değil sözleşmeye dayandırma alışkanlığı', en: 'The habit of basing a test on the contract rather than on behaviour' },
                    ],
                },
            ],
        },

        // ───────────────────────────── ADIM 4 ─────────────────────────────
        {
            id: 'step-4-testing',
            number: 4,
            icon: '🧭',
            title: { tr: 'Uçları test et — önce elle, sonra Postman', en: 'Test the endpoints — by hand first, then Postman' },
            goal: {
                tr: 'Sonunda: uçtan uca sipariş akışını elle geçmiş, sonra aynı akışı Postman koleksiyonu olarak kurmuş ve komut satırından koşturabiliyor olacaksın.',
                en: 'By the end: you will have walked the end-to-end order flow by hand, then rebuilt the same flow as a Postman collection and run it from the command line.',
            },
            blocks: [
                {
                    type: 'why',
                    title: { tr: 'Neden önce elle?', en: 'Why by hand first?' },
                    content: {
                        tr: 'Otomasyon, bildiğin bir işi tekrarlar. Bilmediğin bir işi otomatikleştirmeye çalışmak, hatayı da otomatikleştirmektir. Akışı bir kez elle geçtiğinde hangi ucun hangi veriyi ürettiğini, hangi değerin bir sonraki isteğe taşınması gerektiğini ve nerede yanlış gidebileceğini görürsün. Koleksiyon o zaman yazılır.',
                        en: 'Automation repeats work you already understand. Trying to automate work you do not understand automates the mistake as well. Walking the flow once by hand shows you which endpoint produces which data, which value must carry into the next request, and where things can go wrong. Only then do you write the collection.',
                    },
                },
                {
                    type: 'substep',
                    title: { tr: 'Windows (PowerShell): uçtan uca akışın tamamı', en: 'Windows (PowerShell): the complete end-to-end flow' },
                    content: {
                        tr: 'PowerShell\'de cURL sözdizimi çalışmadığı için akışın tamamını Invoke-RestMethod ile veriyoruz. Komutları sırayla aynı pencereye yapıştır — değişkenler pencere kapanana kadar hafızada kalır. Her adımın çıktısındaki bir değer bir sonrakinin girdisi oluyor; zincirleme testin özü bu.',
                        en: 'Since cURL syntax does not work in PowerShell, here is the whole flow with Invoke-RestMethod. Paste the commands into the same window in order — the variables stay in memory until you close it. A value from each step\'s output becomes the next step\'s input; that is the essence of chained testing.',
                    },
                    code: {
                        tr: `$BASE = "http://localhost:4000/api/v1"

# 1) Kendi izole veri alanını aç. Dönen anahtarı bundan sonraki her istek taşır.
$sandbox = Invoke-RestMethod -Method Post -Uri "$BASE/sandbox" -ContentType "application/json" -Body '{"label":"manuel-deneme"}'
$KEY = $sandbox.apiKey
"Anahtar: $KEY"

# 2) Giriş yap, token al (tohum veride hazır hesap)
$login = Invoke-RestMethod -Method Post -Uri "$BASE/auth/login" -Headers @{ "X-Sandbox-Key" = $KEY } -ContentType "application/json" -Body '{"email":"demo@qashop.test","password":"Password123!"}'
$TOKEN = $login.token

# 3) Bundan sonraki isteklerin ortak başlıkları: hangi veri alanı + hangi kullanıcı
$H = @{ "X-Sandbox-Key" = $KEY; "Authorization" = "Bearer $TOKEN" }

# 4) Ürün ve varyant id'sini KEŞFET — sabit yazma, id'ler her alanda kayar
$urun = (Invoke-RestMethod -Uri "$BASE/products?size=1" -Headers @{ "X-Sandbox-Key" = $KEY }).items[0]
$varyantlar = (Invoke-RestMethod -Uri "$BASE/products/$($urun.id)/variants" -Headers @{ "X-Sandbox-Key" = $KEY }).variants
$VAR = ($varyantlar | Where-Object { $_.available -ge 2 } | Select-Object -First 1).id
"Urun: $($urun.name) · Varyant: $VAR · satilabilir: $(($varyantlar | Where-Object { $_.id -eq $VAR }).available)"

# 5) Sepet aç
$cartResp = Invoke-RestMethod -Method Post -Uri "$BASE/carts" -Headers $H
$CART = $cartResp.cart.id
"Sepet: $CART"

# 6) Sepete ekle — stok burada REZERVE edilir, henüz düşmez
Invoke-RestMethod -Method Post -Uri "$BASE/carts/$CART/items" -Headers $H -ContentType "application/json" -Body ('{"variantId":' + $VAR + ',"qty":2}')

# 7) Siparişe çevir — stok DÜŞER, rezervasyon serbest kalır
Invoke-RestMethod -Method Post -Uri "$BASE/orders" -Headers $H -ContentType "application/json" -Body ('{"cartId":' + $CART + '}')`,
                        en: `$BASE = "http://localhost:4000/api/v1"

# 1) Open your own isolated data area. Every later request carries the returned key.
$sandbox = Invoke-RestMethod -Method Post -Uri "$BASE/sandbox" -ContentType "application/json" -Body '{"label":"manual-run"}'
$KEY = $sandbox.apiKey
"Key: $KEY"

# 2) Log in and get a token (account ready in the seed data)
$login = Invoke-RestMethod -Method Post -Uri "$BASE/auth/login" -Headers @{ "X-Sandbox-Key" = $KEY } -ContentType "application/json" -Body '{"email":"demo@qashop.test","password":"Password123!"}'
$TOKEN = $login.token

# 3) Shared headers for the rest: which data area + which user
$H = @{ "X-Sandbox-Key" = $KEY; "Authorization" = "Bearer $TOKEN" }

# 4) DISCOVER the product and variant id — never hardcode, ids shift per area
$urun = (Invoke-RestMethod -Uri "$BASE/products?size=1" -Headers @{ "X-Sandbox-Key" = $KEY }).items[0]
$varyantlar = (Invoke-RestMethod -Uri "$BASE/products/$($urun.id)/variants" -Headers @{ "X-Sandbox-Key" = $KEY }).variants
$VAR = ($varyantlar | Where-Object { $_.available -ge 2 } | Select-Object -First 1).id
"Product: $($urun.name) · Variant: $VAR · available: $(($varyantlar | Where-Object { $_.id -eq $VAR }).available)"

# 5) Open a cart
$cartResp = Invoke-RestMethod -Method Post -Uri "$BASE/carts" -Headers $H
$CART = $cartResp.cart.id
"Cart: $CART"

# 6) Add to cart — stock is RESERVED here, not yet decremented
Invoke-RestMethod -Method Post -Uri "$BASE/carts/$CART/items" -Headers $H -ContentType "application/json" -Body ('{"variantId":' + $VAR + ',"qty":2}')

# 7) Convert to an order — stock DROPS, the reservation is released
Invoke-RestMethod -Method Post -Uri "$BASE/orders" -Headers $H -ContentType "application/json" -Body ('{"cartId":' + $CART + '}')`,
                    },
                    language: 'powershell',
                },
                {
                    type: 'substep',
                    title: { tr: 'macOS / Linux: aynı akış cURL ile', en: 'macOS / Linux: the same flow with cURL' },
                    content: {
                        tr: 'Aynı yedi adım, kabuk sözdizimiyle. Anahtar ve token değişkenlere alınır, sonraki isteklere başlık olarak eklenir.',
                        en: 'The same seven steps in shell syntax. The key and the token go into variables and are attached to later requests as headers.',
                    },
                    code: {
                        tr: `BASE=http://localhost:4000/api/v1

# 1) Kendi izole veri alanını aç
curl -s -X POST $BASE/sandbox -H 'Content-Type: application/json' -d '{"label":"manuel-deneme"}'
KEY=qas_buraya_yapistir     # cevaptaki apiKey değerini yapıştır

# 2) Giriş yap, token al
curl -s -X POST $BASE/auth/login -H "X-Sandbox-Key: $KEY" -H 'Content-Type: application/json' -d '{"email":"demo@qashop.test","password":"Password123!"}'
TOKEN=eyJhb...              # cevaptaki token değeri

# 3) Ürün id'sini KEŞFET — sabit yazma, her veri alanında kayar
PROD=$(curl -s "$BASE/products?size=1" -H "X-Sandbox-Key: $KEY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)

# 4) Stoğu gör (satılabilir adet = stok - rezerve) ve bir varyant id'si al
curl -s "$BASE/products/$PROD/variants" -H "X-Sandbox-Key: $KEY"
VAR=$(curl -s "$BASE/products/$PROD/variants" -H "X-Sandbox-Key: $KEY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)

# 5) Sepet aç
curl -s -X POST $BASE/carts -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN"
CART=1                      # cevaptaki cart.id

# 6) Sepete ekle — stok burada REZERVE edilir
curl -s -X POST $BASE/carts/$CART/items -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d "{\\"variantId\\":$VAR,\\"qty\\":2}"

# 6) Siparişe çevir — stok DÜŞER, rezervasyon serbest kalır
curl -s -X POST $BASE/orders -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d "{\\"cartId\\":$CART}"`,
                        en: `BASE=http://localhost:4000/api/v1

# 1) Open your own isolated data area
curl -s -X POST $BASE/sandbox -H 'Content-Type: application/json' -d '{"label":"manual-run"}'
KEY=qas_paste_here          # paste the apiKey value from the response

# 2) Log in and get a token
curl -s -X POST $BASE/auth/login -H "X-Sandbox-Key: $KEY" -H 'Content-Type: application/json' -d '{"email":"demo@qashop.test","password":"Password123!"}'
TOKEN=eyJhb...              # the token value from the response

# 3) DISCOVER the product id — never hardcode, it shifts per data area
PROD=$(curl -s "$BASE/products?size=1" -H "X-Sandbox-Key: $KEY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)

# 4) Check stock (sellable = stock - reserved) and take a variant id
curl -s "$BASE/products/$PROD/variants" -H "X-Sandbox-Key: $KEY"
VAR=$(curl -s "$BASE/products/$PROD/variants" -H "X-Sandbox-Key: $KEY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)

# 5) Open a cart
curl -s -X POST $BASE/carts -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN"
CART=1                      # cart.id from the response

# 6) Add to cart — stock is RESERVED here
curl -s -X POST $BASE/carts/$CART/items -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d "{\\"variantId\\":$VAR,\\"qty\\":2}"

# 6) Convert to an order — stock DROPS, the reservation is released
curl -s -X POST $BASE/orders -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d "{\\"cartId\\":$CART}"`,
                    },
                    language: 'bash',
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'ID\'leri sabit yazma — en sinsi tuzak', en: 'Never hardcode ids — the sneakiest trap' },
                    content: {
                        tr: 'Kendi veri alanın açılırken katalog, kullanıcılar ve sipariş geçmişi şablondan KOPYALANIR. Kopyalanan satırlar yeni id\'ler alır: şablonda ürünler 1-120 iken senin alanında 121-240, bir sonrakinde 241-360 olur. Tuzağın sinsi yanı şu: anahtar göndermeden yaptığın istek şablona gider ve orada id 1 GERÇEKTEN vardır. Yani adresi elle denerken çalışır, testine yazdığın an 404 döner — üstelik hata, testinin ilgisiz bir adımında patlar. Aynısı sıfırlama için de geçerli: sıfırlama satırları silip yeniden kopyaladığı için id\'ler tekrar kayar ve açık oturumları da iptal eder. Kural: id\'yi ve token\'ı listeden OKU; sabit yazma, sıfırlamanın ötesinde saklama.',
                        en: 'When your own data area is created, the catalog, users and order history are COPIED from the template. The copied rows get new ids: products are 1-120 in the template but 121-240 in your area, 241-360 in the next one. Here is the sneaky part: a request sent without a key goes to the template, where id 1 really does exist. So the address works when you try it by hand, and returns 404 the moment you put it in a test — and the failure surfaces at some unrelated step. The same applies to reset: because it deletes and re-copies the rows, ids shift again, and it revokes open sessions too. Rule: READ the id and the token from a listing; never hardcode them, never keep them across a reset.',
                    },
                },
                {
                    type: 'callout',
                    tone: 'insight',
                    title: { tr: 'Manuel testin asıl kazancı: iki yerden bak', en: 'The real gain of manual testing: look from two places' },
                    content: {
                        tr: 'Sipariş isteğinden hemen sonra DBeaver\'a geç ve aynı varyantın stoğuna bak. Sepete ekledikten sonra rezerve arttı ama stok aynıydı; siparişi verdikten sonra stok düştü ve rezerve serbest kaldı. Bu iki ekranı yan yana görmek, API testi ile database testinin neden aynı işin iki yarısı olduğunu bir daha unutmayacak şekilde gösterir.',
                        en: 'Right after the order request, switch to DBeaver and look at the same variant\'s stock. After adding to the cart the reservation went up but stock stayed the same; after placing the order stock dropped and the reservation was released. Seeing those two screens side by side shows you, unforgettably, why API testing and database testing are two halves of the same job.',
                    },
                },
                {
                    type: 'clickpath',
                    title: { tr: 'Postman: kurulum ve koleksiyonu sözleşmeden üretme', en: 'Postman: install and generate the collection from the contract' },
                    items: [
                        { tr: 'postman.com/downloads adresinden masaüstü uygulamasını indir ve kur. Hesap açman istenirse "Continue without an account" ile geçebilirsin.', en: 'Download and install the desktop app from postman.com/downloads. If it asks you to sign up, you can proceed with "Continue without an account".' },
                        { tr: 'Sol üstteki Import düğmesine bas.', en: 'Press the Import button at the top left.' },
                        { tr: 'Açılan pencereye qa-shop/api/openapi.yaml dosyasını sürükle-bırak yap; ya da yığın ayaktaysa Link sekmesine http://localhost:4000/api/v1/openapi.yaml adresini yaz.', en: 'Drag and drop qa-shop/api/openapi.yaml into the dialog; or, if the stack is up, type http://localhost:4000/api/v1/openapi.yaml into the Link tab.' },
                        { tr: 'Postman "OpenAPI 3.0" algıladığını söyler; Import diyerek onayla.', en: 'Postman reports that it detected "OpenAPI 3.0"; confirm with Import.' },
                        { tr: 'Tüm uçlar klasörlenmiş bir koleksiyon olarak sol panelde belirir — istekleri elle yazman gerekmez.', en: 'Every endpoint appears in the left panel as a foldered collection — you do not have to write the requests by hand.' },
                        { tr: 'Sağ üstteki göz simgesinden Environments > Create Environment ile yeni bir ortam aç, adını qa-shop-local koy.', en: 'From the eye icon at the top right, use Environments > Create Environment to create one and name it qa-shop-local.' },
                        { tr: 'Ortama üç değişken ekle: baseUrl, sandboxKey, token. baseUrl değerini http://localhost:4000/api/v1 yap, diğer ikisini boş bırak — onları script dolduracak.', en: 'Add three variables to the environment: baseUrl, sandboxKey, token. Set baseUrl to http://localhost:4000/api/v1 and leave the other two empty — a script will fill them.' },
                        { tr: 'Sağ üstteki açılır listeden qa-shop-local ortamını SEÇ. Bu adım atlanırsa değişkenler boş görünür ve istekler 401 döner.', en: 'SELECT the qa-shop-local environment from the dropdown at the top right. Skip this and the variables read as empty and requests come back 401.' },
                    ],
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'Ortamı seçmeyi unutmak en sık yapılan hatadır', en: 'Forgetting to select the environment is the most common mistake' },
                    content: {
                        tr: 'Postman\'de bir ortam oluşturmak onu etkinleştirmez. Sağ üstteki açılır listeden seçmezsen değişkenler tanımsız kalır, istekler boş bir anahtarla gider ve 401 döner. Hata mesajı kimlik doğrulamayı işaret ettiği için insanlar saatlerce token\'da sorun arar; oysa sorun tek bir seçim kutusundadır. Değişkenin gerçekten dolu olup olmadığını görmek için göz simgesine tıklaman yeterli.',
                        en: 'Creating an environment in Postman does not activate it. If you do not select it from the dropdown at the top right, the variables stay undefined, requests go out with an empty key, and you get 401. Because the error points at authentication, people spend hours hunting for a token problem when the issue is a single dropdown. Clicking the eye icon is enough to see whether the variable actually holds a value.',
                    },
                },
                {
                    type: 'substep',
                    title: { tr: 'Değeri elle taşıma, script taşısın', en: 'Do not carry values by hand, let a script do it' },
                    content: {
                        tr: 'Anahtarı ve token\'ı her istekte elle kopyalamak, koleksiyonu ilk sıfırlamada kullanılamaz hâle getirir. Postman\'in Scripts sekmesindeki blok hem doğrulamayı yapar hem değeri ortama yazar. Bir isteği seçip Scripts > Post-response bölümüne yapıştırman yeterli.',
                        en: 'Copying the key and token by hand into every request makes the collection unusable after the first reset. The block in Postman\'s Scripts tab both asserts and writes the value into the environment. Select a request and paste it into Scripts > Post-response.',
                    },
                    code: {
                        tr: `// POST /sandbox isteğinin Scripts > Post-response bölümü
pm.test("Sandbox olustu", () => pm.response.to.have.status(201));

const body = pm.response.json();
pm.environment.set("sandboxKey", body.apiKey);   // sonraki istekler kullanacak


// POST /auth/login isteğinin Scripts > Post-response bölümü
pm.test("Giris basarili", () => pm.response.to.have.status(200));
pm.test("Token dondu", () => {
    const b = pm.response.json();
    pm.expect(b.token).to.be.a("string").and.not.empty;
    pm.environment.set("token", b.token);
});


// POST /carts isteğinin Scripts > Post-response bölümü
// Dikkat: sepetin id'si gövdenin kökünde değil, cart nesnesinin içinde.
pm.test("Sepet acildi", () => pm.response.to.have.status(201));
pm.environment.set("cartId", pm.response.json().cart.id);


// POST /carts/{id}/items — stok yetersizken 409 beklemek
pm.test("Stok yetersizse 409 doner", () => {
    if (pm.response.code === 409) {
        const b = pm.response.json();
        pm.expect(b.error.code).to.eql("OUT_OF_STOCK");
        pm.expect(b.error.details).to.have.property("available");
    }
});`,
                        en: `// Scripts > Post-response for the POST /sandbox request
pm.test("Sandbox created", () => pm.response.to.have.status(201));

const body = pm.response.json();
pm.environment.set("sandboxKey", body.apiKey);   // later requests will use it


// Scripts > Post-response for the POST /auth/login request
pm.test("Login succeeded", () => pm.response.to.have.status(200));
pm.test("Token returned", () => {
    const b = pm.response.json();
    pm.expect(b.token).to.be.a("string").and.not.empty;
    pm.environment.set("token", b.token);
});


// Scripts > Post-response for the POST /carts request
// Note: the cart id is not at the root of the body, it is inside the cart object.
pm.test("Cart opened", () => pm.response.to.have.status(201));
pm.environment.set("cartId", pm.response.json().cart.id);


// POST /carts/{id}/items — expecting 409 when stock is short
pm.test("Returns 409 when stock is insufficient", () => {
    if (pm.response.code === 409) {
        const b = pm.response.json();
        pm.expect(b.error.code).to.eql("OUT_OF_STOCK");
        pm.expect(b.error.details).to.have.property("available");
    }
});`,
                    },
                    language: 'javascript',
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'Koleksiyonun ilk isteği sıfırlama olmalı', en: 'The first request of the collection should be the reset' },
                    content: {
                        tr: 'Koleksiyonu ikinci kez koşturduğunda aynı sonucu vermiyorsa, testin değil verinin sonucunu ölçüyorsun demektir. Koleksiyonun en başına POST /sandbox/reset koy: her koşum aynı başlangıç durumundan başlasın. Bu tek alışkanlık, "bende çalışıyordu" cümlesinin büyük kısmını ortadan kaldırır.',
                        en: 'If running the collection a second time does not give the same result, you are measuring the state of the data, not the outcome of the test. Put POST /sandbox/reset at the very beginning: every run should start from the same initial state. That single habit removes most occurrences of "it worked on my machine".',
                    },
                },
                {
                    type: 'clickpath',
                    title: { tr: 'Koleksiyonu ve ortamı dışa aktar', en: 'Export the collection and the environment' },
                    items: [
                        { tr: 'Sol panelde koleksiyonun üstüne gel, üç noktaya tıkla, Export seç.', en: 'Hover the collection in the left panel, click the three dots, choose Export.' },
                        { tr: 'Format olarak "Collection v2.1" seç ve kaydet — dosya adı qa-shop-collection.json olsun.', en: 'Pick "Collection v2.1" as the format and save it — name the file qa-shop-collection.json.' },
                        { tr: 'Göz simgesi > Environments bölümünde qa-shop-local ortamının üç noktasına tıkla, Export seç.', en: 'Under the eye icon > Environments, click the three dots on qa-shop-local and choose Export.' },
                        { tr: 'Dosya adı qa-shop-local.json olsun. İki dosyayı da aynı klasöre koy — Newman ikisini birden isteyecek.', en: 'Name it qa-shop-local.json. Put both files in the same folder — Newman will want them together.' },
                    ],
                },
                {
                    type: 'substep',
                    title: { tr: 'Komut satırından koştur (Newman)', en: 'Run it from the command line (Newman)' },
                    content: {
                        tr: 'Koleksiyon ancak komut satırından koşabildiğinde bir pipeline\'a girebilir. Newman bir Node.js aracıdır; kurmak için makinede Node.js olması gerekir (nodejs.org). Çıkan rapor, testi görmeyen birine sonucu gösterebileceğin ilk somut çıktıdır.',
                        en: 'A collection can only enter a pipeline once it runs from the command line. Newman is a Node.js tool, so installing it requires Node.js on your machine (nodejs.org). The resulting report is the first concrete artifact you can show to someone who did not watch the test run.',
                    },
                    code: {
                        tr: `# Node.js kurulu mu? Sürüm numarası dönmeli:
node --version

# Newman ve HTML rapor eklentisini kur (bir kez)
npm install -g newman newman-reporter-htmlextra

# İki dosyanın bulunduğu klasörde koştur
newman run qa-shop-collection.json -e qa-shop-local.json --reporters cli,htmlextra --reporter-htmlextra-export rapor.html

# Çıkış kodu 0 değilse en az bir assertion başarısız demektir —
# bir pipeline adımı tam olarak buna bakar.
# Windows'ta çıkış kodunu görmek için:  echo $LASTEXITCODE`,
                        en: `# Is Node.js installed? It should print a version number:
node --version

# Install Newman and the HTML reporter (once)
npm install -g newman newman-reporter-htmlextra

# Run it in the folder holding the two files
newman run qa-shop-collection.json -e qa-shop-local.json --reporters cli,htmlextra --reporter-htmlextra-export report.html

# A non-zero exit code means at least one assertion failed —
# that is exactly what a pipeline step looks at.
# To see the exit code on Windows:  echo $LASTEXITCODE`,
                    },
                    language: 'bash',
                },
                {
                    type: 'checklist',
                    title: { tr: 'Bu adımı bitirdiğinde elinde ne var?', en: 'What do you have when this step is done?' },
                    items: [
                        { tr: 'Elle geçilmiş, her adımı anlaşılmış uçtan uca bir sipariş akışı', en: 'An end-to-end order flow walked by hand, with every step understood' },
                        { tr: 'Sözleşmeden üretilmiş, değişkenleri script ile taşınan bir Postman koleksiyonu', en: 'A Postman collection generated from the contract, carrying values via scripts' },
                        { tr: 'Her koşumdan önce veriyi sıfırlayan, tekrar edilebilir bir paket', en: 'A repeatable pack that resets the data before every run' },
                        { tr: 'Komut satırından koşan ve HTML rapor üreten bir Newman çağrısı', en: 'A Newman command that runs from the CLI and produces an HTML report' },
                        { tr: 'Aynı işlemi hem API hem veritabanı tarafından doğrulama alışkanlığı', en: 'The habit of verifying the same operation from both the API and the database side' },
                    ],
                },
            ],
        },
    ],

    // ─────────────────────────── SIRADAKİ ADIM ───────────────────────────
    next: {
        title: { tr: 'Sırada ne var: arayüz pratiği ve kusur avı', en: 'What comes next: UI practice and defect hunting' },
        content: {
            tr: 'Aynı veriye bağlı dükkân arayüzü hazır: QA Shop sayfasında ürün listesi, sepet, kupon ve sipariş akışı gerçek API üstünde çalışıyor. Her etkileşimli öğe kararlı bir test id taşıyor ve sayfadaki olay günlüğü, arayüzdeki her hareketin hangi API çağrısına dönüştüğünü satır satır gösteriyor — sepete eklemek bir rezervasyon yazar, siparişi tamamlamak stoğu düşürür, iptal etmek geri yükler. Bu zinciri gören kişi "buton çalışıyor mu" sorusundan "sistem tutarlı kaldı mı" sorusuna geçer. Bir adım sonrası ise kusur avı: API, kontrollü olarak bozulabilen anahtarlar sunuyor. Bir kusuru açıp kendi testini tekrar koşturduğunda testin kırmızıya dönmesi gerekir; dönmüyorsa o test, baktığını sandığın şeye bakmıyordur.',
            en: 'The shop interface backed by the same data is ready: on the QA Shop page the product list, cart, coupon and order flow all run against the real API. Every interactive element carries a stable test id, and the page\'s event log shows, line by line, which API call each UI action turns into — adding to the cart writes a reservation, completing the order decrements stock, cancelling restores it. Someone who sees that chain moves from asking "does the button work" to asking "did the system stay consistent". The step after that is defect hunting: the API exposes flags that break it in controlled ways. Turn one on, run your own test again, and it should go red; if it does not, that test is not looking at what you think it is.',
        },
    },
}
