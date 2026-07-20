import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

const awsCliInstallStep = {
  type: 'step-animation',
  title: { tr: 'aws --version Çıktısı Neden Kurulumun TEK Kanıtıdır?', en: 'Why Is the aws --version Output the ONLY Proof of Installation?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'winget/brew/curl, AWS CLI ikili dosyasını…', en: 'winget/brew/curl download the AWS CLI…' }, detail: { tr: '`winget install Amazon.AWSCLI` (ya da brew/curl), AWS CLI ikili dosyasını sisteme İNDİRİR ve PATH\'e EKLER — ama henüz HİÇBİR AWS kaynağına bağlanmadı.', en: '`winget install Amazon.AWSCLI` (or brew/curl) DOWNLOADS the AWS CLI binary and ADDS it to PATH — but it hasn\'t CONNECTED to any AWS resource yet.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'aws --version, terminalin PATH\'inin bu…', en: 'aws --version proves the terminal\'s PATH…' }, detail: { tr: '`aws --version`, terminalin PATH\'inin bu YENİ komutu BULABİLDİĞİNİ ve ikili dosyanın BOZULMADAN çalıştığını kanıtlayan TEK komuttur — henüz kimlik doğrulama İÇERMEZ.', en: '`aws --version` is the ONLY command that proves the terminal\'s PATH can FIND this NEW command and the binary runs WITHOUT being corrupted — it does NOT involve authentication yet.' } },
    { id: 3, icon: '3️⃣', label: { tr: '"command not found" hatası GENELDE…', en: 'A "command not found" error is USUALLY…' }, detail: { tr: '"command not found" hatası GENELDE kurulumun BAŞARISIZ olduğu anlamına gelmez — terminal oturumunun PATH DEĞİŞİKLİĞİNİ henüz OKUMADIĞI anlamına gelir; terminali yeniden BAŞLATMAK genelde ÇÖZÜMDÜR.', en: 'A "command not found" error USUALLY does NOT mean the install FAILED — it means the terminal session hasn\'t RE-READ the PATH change yet; RESTARTING the terminal is usually the FIX.' } },
  ],
}

const awsConfigureStep = {
  type: 'step-animation',
  title: { tr: 'aws configure Sonrası Kimlik Bilgileri NEREDE Saklanır?', en: 'WHERE Are Credentials Stored After aws configure?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'aws configure, girdiğin Access Key\'i…', en: 'aws configure writes what you type…' }, detail: { tr: '`aws configure`, girdiğin Access Key ID/Secret\'ı GÖNDERMEZ — bunları YEREL olarak `~/.aws/credentials` dosyasına düz metin olarak YAZAR, sadece bu makinede KALICI olarak.', en: '`aws configure` does NOT send what you type anywhere — it WRITES the Access Key ID/Secret LOCALLY to `~/.aws/credentials` as plain text, PERSISTING only on this machine.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Sonraki HER aws komutu, bu dosyayı OKUYUP…', en: 'EVERY subsequent aws command reads this…' }, detail: { tr: 'Sonraki HER `aws` komutu, bu dosyayı OKUYUP her isteği SigV4 imzasıyla İMZALAR — kimlik bilgisi her komutta TEKRAR SORULMAZ, dosyadan OTOMATİK okunur.', en: 'EVERY subsequent `aws` command reads this file and SIGNS each request with a SigV4 signature — credentials are NOT re-asked at every command, they\'re read AUTOMATICALLY from the file.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'aws sts get-caller-identity, kimliğinin…', en: 'aws sts get-caller-identity is the way…' }, detail: { tr: '`aws sts get-caller-identity`, kimliğinin GERÇEKTEN doğru şekilde yapılandırıldığını ANINDA doğrulamanın YOLUDUR — bir S3 komutu deneyip 403 hatası ALMADAN önce bunu çalıştırmak, hatanın NEREDE olduğunu netleştirir.', en: '`aws sts get-caller-identity` is the way to INSTANTLY verify your identity is ACTUALLY configured correctly — running this BEFORE trying an S3 command and getting a 403 clarifies WHERE the problem is.' } },
  ],
}

const awsS3TestStep = {
  type: 'step-animation',
  title: { tr: 'aws s3 mb Neden GLOBAL Olarak Benzersiz Bir İsim İster?', en: 'Why Does aws s3 mb Require a GLOBALLY Unique Name?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'aws s3 mb, S3 bucket\'ının ismini SADECE…', en: 'aws s3 mb reserves the bucket name…' }, detail: { tr: '`aws s3 mb s3://my-qa-test-bucket-$(date +%s)`, o ismi SADECE senin hesabında DEĞİL, TÜM AWS müşterileri arasında GLOBAL olarak REZERVE eder — bu yüzden isme bir timestamp EKLENİR.', en: '`aws s3 mb s3://my-qa-test-bucket-$(date +%s)` reserves that name GLOBALLY across ALL AWS customers, NOT just your account — this is why a timestamp is APPENDED to the name.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'aws s3 cp, dosyayı bucket\'IN İÇİNE gönderir…', en: 'aws s3 cp sends the file INTO the…' }, detail: { tr: '`aws s3 cp test.txt s3://.../`, dosyayı bucket\'IN İÇİNE GÖNDERİR — `aws s3 ls` ile bu yüklemenin GERÇEKTEN başarılı olup OLMADIĞINI hemen doğrulayabilirsin.', en: '`aws s3 cp test.txt s3://.../` sends the file INTO the bucket — `aws s3 ls` immediately verifies whether this upload ACTUALLY succeeded.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'aws s3 rb --force, hem bucket\'ı hem…', en: 'aws s3 rb --force removes both the…' }, detail: { tr: '`aws s3 rb ... --force`, hem bucket\'ı HEM içindeki dosyaları TEK komutla siler — `--force` OLMADAN, içi DOLU bir bucket "BucketNotEmpty" hatasıyla SİLİNMEYİ REDDEDER.', en: '`aws s3 rb ... --force` removes both the bucket AND its files with ONE command — WITHOUT `--force`, a bucket that still has files REFUSES to be deleted with a "BucketNotEmpty" error.' } },
  ],
}

const awsEc2LaunchStep = {
  type: 'step-animation',
  title: { tr: 'run-instances Çalıştığında EC2, VM\'i ANINDA mı Hazır Eder?', en: 'When run-instances Runs, Is the EC2 VM Ready INSTANTLY?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'run-instances, VM\'i BAŞLATMA isteğini…', en: 'run-instances only SUBMITS the request…' }, detail: { tr: '`aws ec2 run-instances`, VM\'i BAŞLATMA isteğini AWS\'e sadece GÖNDERİR — komut ANINDA döner ama makine hâlâ "pending" durumundadır, SSH ile bağlanmaya HENÜZ HAZIR değildir.', en: '`aws ec2 run-instances` only SUBMITS the launch request to AWS — the command returns INSTANTLY but the machine is still in a "pending" state, NOT yet READY for an SSH connection.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'describe-instances, dinamik olarak ATANAN…', en: 'describe-instances is needed because the…' }, detail: { tr: '`aws ec2 describe-instances --query ... PublicIpAddress`, dinamik olarak ATANAN IP adresini SORGULAR — bu IP her `run-instances` çağrısında FARKLI olduğundan, ELLE bir yere yazılamaz.', en: '`aws ec2 describe-instances --query ... PublicIpAddress` QUERIES the dynamically ASSIGNED IP address — since this IP is DIFFERENT on every `run-instances` call, it cannot be HARDCODED anywhere.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'ssh komutu, --key-name\'de belirtilen ANAHTARLA…', en: 'The ssh command only succeeds with the…' }, detail: { tr: '`ssh -i my-qa-key.pem ec2-user@<PUBLIC_IP>` SADECE `--key-name`\'de belirtilen ANAHTARLA eşleşen `.pem` dosyasıyla ÇALIŞIR — yanlış anahtar dosyası "Permission denied (publickey)" hatası VERİR.', en: '`ssh -i my-qa-key.pem ec2-user@<PUBLIC_IP>` only SUCCEEDS with the `.pem` file matching the key specified in `--key-name` — the WRONG key file gives a "Permission denied (publickey)" error.' } },
  ],
}

const awsS3SyncReportStep = {
  type: 'step-animation',
  title: { tr: 'aws s3 sync, aws s3 cp\'den Neden Farklı Davranır?', en: 'Why Does aws s3 sync Behave Differently from aws s3 cp?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'aws s3 sync, TÜM klasörü (Allure raporu…', en: 'aws s3 sync uploads the ENTIRE folder…' }, detail: { tr: '`aws s3 sync ./allure-report/ s3://.../`, TÜM klasörü (Allure raporundaki YÜZLERCE dosya) TEK komutla yükler — sadece DEĞİŞEN dosyaları göndererek `cp`\'den daha HIZLI çalışır.', en: '`aws s3 sync ./allure-report/ s3://.../` uploads the ENTIRE folder (HUNDREDS of files in an Allure report) with ONE command — it runs FASTER than `cp` by only sending CHANGED files.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'aws s3 website, bucket\'ı BİR statik web…', en: 'aws s3 website turns the bucket INTO…' }, detail: { tr: '`aws s3 website ... --index-document index.html`, bucket\'ı BİR statik web sunucusuna DÖNÜŞTÜRÜR — artık HTML raporu bir tarayıcıda DOĞRUDAN AÇILABİLİR bir URL kazanır.', en: '`aws s3 website ... --index-document index.html` turns the bucket INTO a static web server — the HTML report now gets a URL that opens DIRECTLY in a browser.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Bu URL\'i ekiple PAYLAŞMAK, "raporu HANGİ…', en: 'Sharing this URL removes the "which…' }, detail: { tr: 'Bu URL\'i ekiple e-posta/Slack\'te PAYLAŞMAK, "raporu HANGİ makinede kim çalıştırdı?" karmaşasını TAMAMEN ORTADAN KALDIRIR — herkes AYNI sonuca bakar.', en: 'Sharing this URL in email/Slack COMPLETELY REMOVES the "who ran the report on which machine?" confusion — everyone looks at the SAME result.' } },
  ],
}

const awsCompletePipelineStep = {
  type: 'step-animation',
  title: { tr: 'Bu Script\'teki 3 Adım Neden BİRBİRİNE Bağımlıdır?', en: 'Why Are These 3 Steps in the Script Chained TOGETHER?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'npx playwright test, JUNİT/HTML rapor…', en: 'npx playwright test generates the report…' }, detail: { tr: '`npx playwright test`, sonraki adımların YÜKLEYECEĞİ raporu (playwright-report/ klasörünü) DİSKE ÜRETİR — bu adım BAŞARISIZ olsa bile devam edilir çünkü rapor YİNE de yüklenmelidir.', en: '`npx playwright test` GENERATES the report (the playwright-report/ folder) that the NEXT steps will upload — this step continuing even on FAILURE is intentional, because the report should STILL be uploaded.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'aws sts get-caller-identity, bucket ADINI…', en: 'aws sts get-caller-identity supplies the…' }, detail: { tr: '`aws sts get-caller-identity --query Account`, bucket ADINA eklenen AWS hesap numarasını SAĞLAR — böylece bucket ismi her hesap için OTOMATİK olarak GLOBAL benzersiz olur.', en: '`aws sts get-caller-identity --query Account` SUPPLIES the AWS account number appended to the bucket name — this makes the bucket name AUTOMATICALLY globally unique per account.' } },
    { id: 3, icon: '3️⃣', label: { tr: '2>/dev/null || true, bucket ZATEN varsa…', en: '2>/dev/null || true means an "already…' }, detail: { tr: '`aws s3 mb ... 2>/dev/null || true`, bucket ZATEN varsa gelecek "already exists" hatasını YUTAR — script\'in İKİNCİ kez çalıştırılabilir (idempotent) olmasını sağlayan KRİTİK bir satırdır.', en: '`aws s3 mb ... 2>/dev/null || true` SWALLOWS the "already exists" error if the bucket already exists — this is the CRITICAL line that makes the script safely RE-RUNNABLE (idempotent).' } },
  ],
}

// ─── Dalga 18 film sabitleri (video-scene — EN + TR paylaşımlı) ─────────────
// Spesifikasyon kalıbı: Documents/video-rollout-plan.md §2 · CLAUDE.md §9.5

// 🎯 Introduction — pay-per-second billing vs idle traditional server
const awsPayPerSecondFilm = {
  type: 'video-scene',
  id: 'aws-pay-per-second-film',
  title: { tr: '🎬 Saniyesi Ödenen Sunucu: EC2 vs Klasik Sunucu', en: '🎬 The Server Billed by the Second: EC2 vs Traditional Server' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'traditional', emoji: '🖥️', label: { tr: 'Klasik Sunucu (boşta)', en: 'Traditional Server (idle)' }, color: '#64748b' },
    { id: 'run',      emoji: '▶️', label: { tr: 'RunInstances',        en: 'RunInstances' },        color: '#f97316' },
    { id: 'billing',  emoji: '💰', label: { tr: 'Saniye Bazlı Fatura',  en: 'Per-Second Billing' },  color: '#22c55e' },
    { id: 'parallel', emoji: '🔀', label: { tr: '50 Paralel Session',   en: '50 Parallel Sessions' }, color: '#0ea5e9' },
    { id: 'terminate', emoji: '🛑', label: { tr: 'TerminateInstances',  en: 'TerminateInstances' },  color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: 'Klasik bir sunucu hafta sonu boyunca boşta durur — kimse test çalıştırmasa da fatura AYNIDIR.', en: 'A traditional server sits idle all weekend — the bill is THE SAME even if nobody runs a test.' },
      code: { tr: `Aylik fatura: $500 (bos gecse de ayni)`, en: `Monthly bill: $500 (same even if idle)` },
      positions: { traditional: { x: 50, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'AWS\'te bir komut yeni bir sunucuyu ~2 dakikada ayağa kaldırır — Java\'da ProcessBuilder ile yeni bir process başlatmak gibi.', en: 'On AWS, one command boots a fresh server in ~2 minutes — like starting a new process with Java\'s ProcessBuilder.' },
      code: { tr: `aws ec2 run-instances --instance-type t3.medium`, en: `aws ec2 run-instances --instance-type t3.medium` },
      positions: { traditional: { x: 20, y: 40, opacity: 0.5, scale: 0.9 }, run: { x: 50, y: 40, scale: 1.2, pulse: true } },
      beams: [{ from: 'traditional', to: 'run', color: '#f97316' }],
    },
    {
      caption: { tr: 'Fatura saniye bazında başlar — 2 saatlik bir test koşumu sadece $0.08\'e mal olur.', en: 'Billing starts per second — a 2-hour test run costs just $0.08.' },
      code: { tr: `2 saat calisma = $0.08`, en: `2 hours running = $0.08` },
      positions: { run: { x: 26, y: 40, opacity: 0.6, scale: 0.9 }, billing: { x: 54, y: 40, scale: 1.2, pulse: true } },
      beams: [{ from: 'run', to: 'billing', color: '#22c55e' }],
    },
    {
      caption: { tr: '50 tarayıcı session\'ı AYNI ANDA paralel çalışır — 2 saatlik bir test süiti 5 dakikaya iner.', en: '50 browser sessions run in PARALLEL at once — a 2-hour test suite drops to 5 minutes.' },
      code: { tr: `50x paralel -> suite: 2h -> 5dk`, en: `50x parallel -> suite: 2h -> 5min` },
      positions: { billing: { x: 30, y: 40, opacity: 0.6, scale: 0.9 }, parallel: { x: 58, y: 40, scale: 1.2, pulse: true } },
      beams: [{ from: 'billing', to: 'parallel', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Final (kontrast) — TerminateInstances çağrılınca fatura ANINDA durur. Klasik sunucu hafta sonu boyunca boşta $500 yakarken, EC2 test bitince sıfıra iner.', en: 'Final (the contrast) — calling TerminateInstances stops billing INSTANTLY. While the traditional server burns $500 idle all weekend, EC2 drops to zero the moment the test ends.' },
      positions: { parallel: { x: 34, y: 40, opacity: 0.6, scale: 0.9 }, terminate: { x: 62, y: 40, scale: 1.25, pulse: true } },
      beams: [{ from: 'parallel', to: 'terminate', color: '#ef4444' }],
    },
  ],
}

// ⚙️ Installation — CLI script vs Console tıklaması
const awsCliScriptedFilm = {
  type: 'video-scene',
  id: 'aws-cli-scripted-film',
  title: { tr: '🎬 200 Screenshot: Tek Komut mu, 200 Tıklama mı?', en: '🎬 200 Screenshots: One Command or 200 Clicks?' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'console',  emoji: '🖱️', label: { tr: 'AWS Console (manuel)', en: 'AWS Console (manual)' }, color: '#64748b' },
    { id: 'configure', emoji: '🔑', label: { tr: 'aws configure',       en: 'aws configure' },        color: '#a855f7' },
    { id: 'script',   emoji: '📜', label: { tr: 'Pipeline Script',      en: 'Pipeline Script' },      color: '#f97316' },
    { id: 'night',    emoji: '🌙', label: { tr: 'Gece 2:00 — İnsansız', en: '2 AM — Unattended' },    color: '#0ea5e9' },
    { id: 'sync',     emoji: '📦', label: { tr: '200 Dosya Tek Komutla', en: '200 Files, One Command' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: { tr: 'AWS Console, ekrana tıklayarak gezinen bir insan gerektirir — her adımda bir "Onayla" tıklaması beklenir.', en: 'The AWS Console requires a human clicking through screens — every step waits for a "Confirm" click.' },
      code: { tr: `Console -> tikla -> tikla -> onayla`, en: `Console -> click -> click -> confirm` },
      positions: { console: { x: 50, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'aws configure, kimlik bilgilerini BİR KEZ kaydeder — bundan sonra her komut bu kimlikle imzalanır.', en: 'aws configure saves credentials ONCE — every command afterward is signed with this identity.' },
      code: { tr: `aws configure # Access Key + Secret`, en: `aws configure # Access Key + Secret` },
      positions: { console: { x: 20, y: 40, opacity: 0.5, scale: 0.9 }, configure: { x: 48, y: 40, scale: 1.15, pulse: true } },
      beams: [{ from: 'console', to: 'configure', color: '#a855f7' }],
    },
    {
      caption: { tr: 'Bir pipeline script\'i, aws s3 sync komutunu çağırır — hiçbir insan tıklaması gerekmez.', en: 'A pipeline script calls the aws s3 sync command — no human click required.' },
      code: { tr: `aws s3 sync ./report/ s3://qa-reports/`, en: `aws s3 sync ./report/ s3://qa-reports/` },
      positions: { configure: { x: 26, y: 40, opacity: 0.6, scale: 0.9 }, script: { x: 54, y: 40, scale: 1.2, pulse: true } },
      beams: [{ from: 'configure', to: 'script', color: '#f97316' }],
    },
    {
      caption: { tr: 'Bu script gece 2:00\'de, kimse ekranda değilken, CI job\'ı bittikten hemen sonra insansız çalışabilir.', en: 'This script can run at 2 AM, with nobody at the screen, right after the CI job finishes.' },
      code: { tr: `cron: 0 2 * * * ./upload-reports.sh`, en: `cron: 0 2 * * * ./upload-reports.sh` },
      positions: { script: { x: 30, y: 40, opacity: 0.6, scale: 0.9 }, night: { x: 58, y: 40, scale: 1.2, pulse: true } },
      beams: [{ from: 'script', to: 'night', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Final (kontrast) — TEK bir aws s3 sync komutu 200 screenshot\'ı yükler; Console\'da bu, 200 ayrı sürükle-bırak tıklaması demektir.', en: 'Final (the contrast) — ONE aws s3 sync command uploads 200 screenshots; in the Console, that\'s 200 separate drag-and-drop clicks.' },
      positions: { night: { x: 34, y: 40, opacity: 0.6, scale: 0.9 }, sync: { x: 62, y: 40, scale: 1.25, pulse: true } },
      beams: [{ from: 'night', to: 'sync', color: '#22c55e' }],
    },
  ],
}

// 🛠️ Real World — Selenium Grid on EC2 -> S3 -> CodePipeline
const awsSeleniumEc2S3Film = {
  type: 'video-scene',
  id: 'aws-selenium-ec2-s3-film',
  title: { tr: '🎬 Bir Testin EC2\'den S3\'e Yolculuğu', en: '🎬 A Test\'s Journey from EC2 to S3' },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'hub',      emoji: '▶️', label: { tr: 'EC2 Hub Başlatılır',   en: 'EC2 Hub Launched' },     color: '#f97316' },
    { id: 'docker',   emoji: '🐳', label: { tr: 'Docker Selenium Grid', en: 'Docker Selenium Grid' }, color: '#0ea5e9' },
    { id: 'tests',    emoji: '🧪', label: { tr: 'Paralel Tarayıcı Testleri', en: 'Parallel Browser Tests' }, color: '#22c55e' },
    { id: 's3',       emoji: '📤', label: { tr: 'S3\'e Rapor Yükle',    en: 'Upload Report to S3' },  color: '#a855f7' },
    { id: 'url',      emoji: '🔗', label: { tr: 'Paylaşılabilir URL',   en: 'Shareable URL' },        color: '#f59e0b' },
  ],
  scenes: [
    {
      caption: { tr: 'run-instances komutu, Selenium Hub\'ı barındıracak bir EC2 makinesini ayağa kaldırır.', en: 'The run-instances command boots an EC2 machine to host the Selenium Hub.' },
      code: { tr: `aws ec2 run-instances --tag Name=selenium-hub`, en: `aws ec2 run-instances --tag Name=selenium-hub` },
      positions: { hub: { x: 16, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Makinede Docker ile Selenium Hub ve Chrome node\'ları başlatılır — hepsi tek bir private network üzerinden konuşur.', en: 'On the machine, Docker starts the Selenium Hub and Chrome nodes — all talking over one private network.' },
      code: { tr: `docker run selenium/hub:4.18.1`, en: `docker run selenium/hub:4.18.1` },
      positions: { hub: { x: 20, y: 40, opacity: 0.6, scale: 0.9 }, docker: { x: 46, y: 40, scale: 1.15, pulse: true } },
      beams: [{ from: 'hub', to: 'docker', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Testler hub\'a bağlanır ve birden fazla node\'da PARALEL çalışır — tek makinede sıralı koşmaktan çok daha hızlı.', en: 'Tests connect to the hub and run in PARALLEL across multiple nodes — far faster than running sequentially on one machine.' },
      code: { tr: `pytest --numprocesses=10`, en: `pytest --numprocesses=10` },
      positions: { docker: { x: 26, y: 40, opacity: 0.6, scale: 0.9 }, tests: { x: 54, y: 40, scale: 1.2, pulse: true } },
      beams: [{ from: 'docker', to: 'tests', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Test bitince Allure raporu tek bir komutla S3\'e senkronize edilir — hiçbir dosya elle kopyalanmaz.', en: 'When tests finish, the Allure report syncs to S3 with one command — no file is copied by hand.' },
      code: { tr: `aws s3 sync ./allure-report/ s3://qa-reports/`, en: `aws s3 sync ./allure-report/ s3://qa-reports/` },
      positions: { tests: { x: 30, y: 40, opacity: 0.6, scale: 0.9 }, s3: { x: 58, y: 40, scale: 1.2, pulse: true } },
      beams: [{ from: 'tests', to: 's3', color: '#a855f7' }],
    },
    {
      caption: { tr: 'Final — S3 static website hosting sayesinde, rapor bir URL olarak takıma paylaşılır: kimse SSH\'e girip dosya aramaz.', en: 'Final — thanks to S3 static website hosting, the report becomes a shareable URL for the team: nobody SSHes in to hunt for files.' },
      positions: { s3: { x: 34, y: 40, opacity: 0.6, scale: 0.9 }, url: { x: 62, y: 40, scale: 1.25, pulse: true } },
      beams: [{ from: 's3', to: 'url', color: '#f59e0b' }],
    },
  ],
}

// 🔗 Ecosystem — QA servislerinin birbirine kablolanması
const awsQaEcosystemMapFilm = {
  type: 'video-scene',
  id: 'aws-qa-ecosystem-map-film',
  title: { tr: '🎬 Bir Git Push\'un AWS Ekosistemindeki Yolculuğu', en: '🎬 A Git Push\'s Journey Through the AWS Ecosystem' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'pipeline', emoji: '🔁', label: { tr: 'CodePipeline',        en: 'CodePipeline' },       color: '#0ea5e9' },
    { id: 'build',    emoji: '🔨', label: { tr: 'CodeBuild',           en: 'CodeBuild' },          color: '#f97316' },
    { id: 'ec2',      emoji: '🖥️', label: { tr: 'EC2 (Selenium Hub)',  en: 'EC2 (Selenium Hub)' }, color: '#22c55e' },
    { id: 's3',       emoji: '📦', label: { tr: 'S3 (Raporlar)',       en: 'S3 (Reports)' },       color: '#a855f7' },
    { id: 'cloudwatch', emoji: '📊', label: { tr: 'CloudWatch',        en: 'CloudWatch' },         color: '#84cc16' },
    { id: 'iam',      emoji: '🔐', label: { tr: 'IAM Rolleri',         en: 'IAM Roles' },          color: '#ec4899' },
  ],
  scenes: [
    {
      caption: { tr: 'Bir git push, CodePipeline\'ı tetikler — zincirin ilk halkası.', en: 'A git push triggers CodePipeline — the first link in the chain.' },
      code: { tr: `git push -> CodePipeline tetiklenir`, en: `git push -> CodePipeline triggers` },
      positions: { pipeline: { x: 16, y: 30, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'CodePipeline, CodeBuild\'i çağırır — test suite\'i burada çalışır.', en: 'CodePipeline calls CodeBuild — the test suite runs here.' },
      code: { tr: `CodeBuild: npm ci && test`, en: `CodeBuild: npm ci && test` },
      positions: { pipeline: { x: 14, y: 30, opacity: 0.6, scale: 0.9 }, build: { x: 40, y: 30, scale: 1.15, pulse: true } },
      beams: [{ from: 'pipeline', to: 'build', color: '#f97316' }],
    },
    {
      caption: { tr: 'Ağır Selenium Grid işi, ayrı bir EC2 üzerinde çalışır — CodeBuild sadece tetikleyicidir.', en: 'The heavy Selenium Grid work runs on a separate EC2 — CodeBuild is just the trigger.' },
      code: { tr: `EC2: Selenium Hub + Chrome nodes`, en: `EC2: Selenium Hub + Chrome nodes` },
      positions: { build: { x: 24, y: 30, opacity: 0.6, scale: 0.9 }, ec2: { x: 50, y: 30, scale: 1.2, pulse: true } },
      beams: [{ from: 'build', to: 'ec2', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Test raporu S3\'e, logları CloudWatch\'a akar — AYNI ANDA iki farklı hedefe.', en: 'The test report flows to S3, logs flow to CloudWatch — to TWO different destinations at once.' },
      code: { tr: `report -> S3 | logs -> CloudWatch`, en: `report -> S3 | logs -> CloudWatch` },
      positions: {
        ec2: { x: 30, y: 30, opacity: 0.6, scale: 0.9 },
        s3: { x: 56, y: 18, scale: 1.15, pulse: true },
        cloudwatch: { x: 56, y: 45, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'ec2', to: 's3', color: '#a855f7' }, { from: 'ec2', to: 'cloudwatch', color: '#84cc16' }],
    },
    {
      caption: { tr: 'Final — zincirdeki HER bağlantı, sabit kodlanmış bir şifre değil bir IAM rolü ile kimlik doğrular. Bir servisin permission\'ı eksikse, zincir orada sessizce kırılır.', en: 'Final — EVERY connection in the chain authenticates via an IAM role, not a hardcoded password. If one service is missing a permission, the chain silently breaks right there.' },
      positions: {
        s3: { x: 40, y: 18, scale: 1.0, opacity: 0.6 },
        cloudwatch: { x: 40, y: 45, scale: 1.0, opacity: 0.6 },
        iam: { x: 66, y: 30, scale: 1.25, pulse: true },
      },
      beams: [{ from: 's3', to: 'iam', color: '#ec4899' }, { from: 'cloudwatch', to: 'iam', color: '#ec4899' }],
    },
  ],
}

// 🚨 Common Errors — AccessDenied'ın sessizce 72 saati kaybetmesi
const awsAccessDeniedDiagnosisFilm = {
  type: 'video-scene',
  id: 'aws-access-denied-diagnosis-film',
  title: { tr: '🎬 Sessiz AccessDenied: 72 Saatlik CI Sonucu Nasıl Kaybolur?', en: '🎬 The Silent AccessDenied: How 72 Hours of CI Results Vanish' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'ci',       emoji: '⚙️', label: { tr: 'CI Pipeline Çalışır',  en: 'CI Pipeline Runs' },    color: '#f97316' },
    { id: 'put',      emoji: '📤', label: { tr: 's3:PutObject Çağrısı', en: 's3:PutObject Call' },   color: '#0ea5e9' },
    { id: 'denied',   emoji: '💥', label: { tr: 'AccessDenied (sessiz)', en: 'AccessDenied (silent)' }, color: '#ef4444' },
    { id: 'logs',     emoji: '🕵️', label: { tr: 'Hata Logu Okunmadı',  en: 'Error Log Unread' },     color: '#a855f7' },
    { id: 'fixed',    emoji: '✅', label: { tr: 'IAM Policy Eklendi',   en: 'IAM Policy Attached' },  color: '#22c55e' },
  ],
  scenes: [
    {
      caption: { tr: 'CI pipeline\'ı her gece çalışır ve "başarılı" görünür — testler gerçekten geçmiştir.', en: 'The CI pipeline runs every night and looks "successful" — the tests genuinely passed.' },
      code: { tr: `Pipeline: SUCCESS (testler gecti)`, en: `Pipeline: SUCCESS (tests passed)` },
      positions: { ci: { x: 50, y: 30, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Son adımda rapor S3\'e yüklenmeye çalışılır — s3:PutObject çağrılır.', en: 'In the last step, the report tries to upload to S3 — s3:PutObject is called.' },
      code: { tr: `aws s3 sync report/ s3://qa-reports/`, en: `aws s3 sync report/ s3://qa-reports/` },
      positions: { ci: { x: 44, y: 30, scale: 1.0 }, put: { x: 70, y: 20, scale: 1.15, pulse: true } },
      beams: [{ from: 'ci', to: 'put', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'CI\'nın kullandığı IAM rolünde s3:PutObject izni YOK — yükleme sessizce başarısız olur.', en: 'The IAM role CI uses does NOT have s3:PutObject permission — the upload silently fails.' },
      code: { tr: `AccessDenied: s3:PutObject`, en: `AccessDenied: s3:PutObject` },
      positions: { put: { x: 55, y: 20, opacity: 0.6, scale: 0.9 }, denied: { x: 78, y: 40, scale: 1.2, pulse: true } },
      beams: [{ from: 'put', to: 'denied', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Pipeline\'ın kendisi hâlâ "SUCCESS" der — çünkü TESTLER geçti, upload adımının hatası kimse tarafından okunmadı.', en: 'The pipeline itself still says "SUCCESS" — because the TESTS passed, nobody read the upload step\'s error.' },
      code: { tr: `3 gun sonra: "raporlar nerede?"`, en: `3 days later: "where are the reports?"` },
      positions: { denied: { x: 60, y: 40, opacity: 0.6, scale: 0.9 }, logs: { x: 34, y: 55, scale: 1.15, pulse: true } },
      beams: [{ from: 'denied', to: 'logs', color: '#a855f7' }],
    },
    {
      caption: { tr: 'Final — düzeltme: IAM rolüne s3:PutObject izni eklenir. Ders: bir pipeline\'ın "yeşil" görünmesi, HER adımın gerçekten başarılı olduğu anlamına gelmez.', en: 'Final — the fix: s3:PutObject permission is added to the IAM role. Lesson: a pipeline looking "green" doesn\'t mean EVERY step actually succeeded.' },
      positions: { logs: { x: 40, y: 55, opacity: 0.6, scale: 0.9 }, fixed: { x: 66, y: 40, scale: 1.25, pulse: true } },
      beams: [{ from: 'logs', to: 'fixed', color: '#22c55e' }],
    },
  ],
}

// 💼 Interview — CI pipeline'a minimum yetki (least privilege) tasarımı
const awsLeastPrivilegeInterviewFilm = {
  type: 'video-scene',
  id: 'aws-least-privilege-interview-film',
  title: { tr: '🎬 Mülakat Senaryosu: CI Pipeline\'a Ne Kadar Yetki Verirsin?', en: '🎬 Interview Scenario: How Much Access Do You Give a CI Pipeline?' },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'broad',    emoji: '🎫', label: { tr: 'AdministratorAccess (aşırı geniş)', en: 'AdministratorAccess (too broad)' }, color: '#ef4444' },
    { id: 'risk',     emoji: '🚨', label: { tr: 'Güvenlik Riski',       en: 'Security Risk' },       color: '#ef4444' },
    { id: 'analyze',  emoji: '🔍', label: { tr: 'Gerçekte Neye İhtiyaç Var?', en: 'What Is Actually Needed?' }, color: '#0ea5e9' },
    { id: 'scoped',   emoji: '📝', label: { tr: 'Sadece s3:PutObject', en: 'Only s3:PutObject' },    color: '#f97316' },
    { id: 'secure',   emoji: '✅', label: { tr: 'Güvenli Pipeline',     en: 'Secure Pipeline' },      color: '#22c55e' },
  ],
  scenes: [
    {
      caption: { tr: 'Mülakat sorusu: "Bir CI pipeline\'ının S3\'e rapor yükleyebilmesi lazım — hangi IAM izinlerini verirsin?" Kolay cevap: AdministratorAccess. Ama bu YANLIŞ cevaptır.', en: 'Interview question: "A CI pipeline needs to upload reports to S3 — what IAM permissions do you grant?" Easy answer: AdministratorAccess. But that\'s the WRONG answer.' },
      code: { tr: `policy = "AdministratorAccess" // cok kolay, cok tehlikeli`, en: `policy = "AdministratorAccess" // too easy, too dangerous` },
      positions: { broad: { x: 50, y: 30, scale: 1.15, pulse: true } },
    },
    {
      caption: { tr: 'AdministratorAccess, pipeline\'a EC2 silme, IAM kullanıcısı oluşturma, TÜM S3 bucket\'larını okuma gücü de verir — sadece rapor yüklemek için gereken şeyden ÇOK fazlası.', en: 'AdministratorAccess also gives the pipeline the power to delete EC2 instances, create IAM users, and read EVERY S3 bucket — WAY more than needed just to upload a report.' },
      code: { tr: `Sizin CI'niz artik TUM hesabi silebilir`, en: `Your CI can now delete the ENTIRE account` },
      positions: { broad: { x: 44, y: 30, scale: 1.0 }, risk: { x: 72, y: 20, scale: 1.2, pulse: true } },
      beams: [{ from: 'broad', to: 'risk', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Doğru soru: pipeline GERÇEKTE ne yapıyor? Sadece TEK bir bucket\'a rapor yazıyor — başka hiçbir şey.', en: 'The right question: what does the pipeline ACTUALLY do? It only writes reports to ONE bucket — nothing else.' },
      code: { tr: `Gercek ihtiyac: s3:PutObject -> qa-reports bucket'i`, en: `Actual need: s3:PutObject -> qa-reports bucket only` },
      positions: { risk: { x: 60, y: 20, opacity: 0.6, scale: 0.9 }, analyze: { x: 34, y: 45, scale: 1.15, pulse: true } },
      beams: [{ from: 'risk', to: 'analyze', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Kapsamı daraltılmış bir policy yazılır: SADECE s3:PutObject, SADECE qa-reports bucket\'ına, başka hiçbir kaynağa değil.', en: 'A scoped-down policy is written: ONLY s3:PutObject, ONLY on the qa-reports bucket, on no other resource.' },
      code: { tr: `{"Action":"s3:PutObject","Resource":"arn:...:qa-reports/*"}`, en: `{"Action":"s3:PutObject","Resource":"arn:...:qa-reports/*"}` },
      positions: { analyze: { x: 40, y: 45, opacity: 0.6, scale: 0.9 }, scoped: { x: 66, y: 45, scale: 1.2, pulse: true } },
      beams: [{ from: 'analyze', to: 'scoped', color: '#f97316' }],
    },
    {
      caption: { tr: 'Final — pipeline artık çalışır, ama credential\'ları çalınsa bile saldırgan sadece tek bir bucket\'a yazabilir, hesabın geri kalanına dokunamaz. Mülakat dersi: en az yetki, "çalışsın da nasıl olursa olsun" değil, "sadece gerekeni ver"dir.', en: 'Final — the pipeline still works, but even if its credentials are stolen, an attacker can only write to one bucket, not touch the rest of the account. Interview lesson: least privilege isn\'t "make it work somehow", it\'s "grant only what\'s needed".' },
      positions: { scoped: { x: 40, y: 45, scale: 1.0, opacity: 0.6 }, secure: { x: 66, y: 45, scale: 1.25, pulse: true } },
      beams: [{ from: 'scoped', to: 'secure', color: '#22c55e' }],
    },
  ],
}

// Eksik animasyon/sandbox tamamlamaları — kodsuz sekmeler (CLAUDE.md §9.5)

const awsWhyQaFilmStep = {
  type: 'step-animation',
  title: { tr: 'Bir Test Ortamının Klasik Sunucudan EC2\'ye Farkı', en: 'How a Test Environment Differs: Traditional Server vs EC2' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Klasik sunucu…', en: 'Traditional server…' }, detail: { tr: 'Klasik sunucu: IT ticket aç, 2-4 hafta bekle, sunucu gelince manuel kurulum yap.', en: 'Traditional server: open an IT ticket, wait 2-4 weeks, manually set up once it arrives.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'EC2: tek bir komutla ~2 dakikada Chrome…', en: 'EC2: one command boots a Linux server…' }, detail: { tr: 'EC2: tek bir komutla ~2 dakikada Chrome + Selenium Grid kurulu bir Linux sunucu ayağa kalkar.', en: 'EC2: one command boots a Linux server with Chrome + Selenium Grid preinstalled in ~2 minutes.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Test bitince TerminateInstances çağrılır…', en: 'When the test ends…' }, detail: { tr: 'Test bitince TerminateInstances çağrılır — fatura o an durur, sunucu diskten silinir.', en: 'When the test ends, TerminateInstances is called — billing stops that instant, the server is wiped from disk.' } },
  ],
}

const awsWhyQaFilmPractice = {
  type: 'code-playground',
  relatedTopicId: 'aws-intro',
  id: 'aws-intro',
  title: { tr: 'Kendin Dene: Doğru AWS Servisini Seç', en: 'Try It Yourself: Pick the Right AWS Service' },
  starterCode: `// Hedef: her CI kosumunda uretilen Allure raporunu URL ile paylasilabilir sakla
// TODO: dogru servisi yaz
const service = "?";`,
  solutionCode: `// Hedef: her CI kosumunda uretilen Allure raporunu URL ile paylasilabilir sakla
const service = "S3";`,
  hint: { tr: 'EC2 sanal makine çalıştırır, IAM izinleri yönetir, RDS veritabanıdır — hiçbiri "dosya sakla ve URL ile sun" için tasarlanmadı. S3 tam olarak bunun için var.', en: 'EC2 runs virtual machines, IAM manages permissions, RDS is a database — none are built for "store a file and serve it via URL". S3 exists exactly for that.' },
  successMessage: { tr: 'Doğru! S3, statik dosyaları (HTML rapor, screenshot, video) neredeyse sıfır maliyetle sonsuza kadar saklar ve isteğe bağlı olarak bir URL üzerinden sunar.', en: 'Correct! S3 stores static files (HTML reports, screenshots, videos) forever at near-zero cost and can optionally serve them via a URL.' },
}

const awsAccessDeniedStep = {
  type: 'step-animation',
  title: { tr: 'Bir AWS Hatasını Teşhis Sırası', en: 'The Diagnosis Order for an AWS Error' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Hata mesajının TAM METNİNİ oku…', en: 'Read the FULL error message text…' }, detail: { tr: 'Hata mesajının TAM METNİNİ oku — "AccessDenied" mi, "NoCredentials" mı, "InstanceLimitExceeded" mı?', en: 'Read the FULL error message text — is it "AccessDenied", "NoCredentials", or "InstanceLimitExceeded"?' } },
    { id: 2, icon: '2️⃣', label: { tr: 'IAM izin sorunu mu (kim bu işlemi…', en: 'Separate whether it\'s an IAM permission…' }, detail: { tr: 'IAM izin sorunu mu (kim bu işlemi yapmaya yetkili değil) yoksa kaynak/region sorunu mu (yanlış yerde arıyorsun) ayır.', en: 'Separate whether it\'s an IAM permission issue (who isn\'t authorized) or a resource/region issue (looking in the wrong place).' } },
    { id: 3, icon: '3️⃣', label: { tr: 'CloudTrail veya CI logunda TAM OLARAK…', en: 'Find EXACTLY which API call failed in…' }, detail: { tr: 'CloudTrail veya CI logunda TAM OLARAK hangi API çağrısının başarısız olduğunu bul.', en: 'Find EXACTLY which API call failed in CloudTrail or the CI log.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'İlgili IAM rolüne/policy\'ye SADECE eksik…', en: 'Add ONLY the missing permission to the…' }, detail: { tr: 'İlgili IAM rolüne/policy\'ye SADECE eksik olan izni ekle — geniş bir "FullAccess" ile örtbas etme.', en: 'Add ONLY the missing permission to the relevant IAM role/policy — don\'t paper over it with a broad "FullAccess".' } },
  ],
}

const awsAccessDeniedPractice = {
  type: 'code-playground',
  relatedTopicId: 'aws-errors',
  id: 'aws-errors',
  title: { tr: 'Kendin Dene: Eksik IAM İznini Tespit Et', en: 'Try It Yourself: Identify the Missing IAM Permission' },
  starterCode: `// Hata: AccessDenied - s3:PutObject
// TODO: dogru IAM action'i policy'ye ekle
const policy = { Action: "?", Resource: "arn:aws:s3:::qa-reports/*" };`,
  solutionCode: `// Hata: AccessDenied - s3:PutObject
const policy = { Action: "s3:PutObject", Resource: "arn:aws:s3:::qa-reports/*" };`,
  hint: { tr: 'Hata mesajı hangi action\'ın reddedildiğini SÖYLER — "s3:PutObject" hatası, policy\'de tam olarak "s3:PutObject" eksik demektir, tahmin etmeye gerek yok.', en: 'The error message TELLS you which action was denied — an "s3:PutObject" error means the policy is missing exactly "s3:PutObject", no guessing needed.' },
  successMessage: { tr: 'Doğru! Bu, AWS hata mesajlarının aslında ne kadar açık olduğunu gösterir — mesajı okumak, tahmin etmekten çok daha hızlıdır.', en: 'Correct! This shows how explicit AWS error messages actually are — reading the message is much faster than guessing.' },
}

const awsInterviewStep = {
  type: 'step-animation',
  title: { tr: 'Mülakatta "Neden AWS Kullandınız?" Sorusuna Cevap', en: 'Answering "Why Did You Use AWS?" in an Interview' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Sadece "AWS güçlü bir araç" deme…', en: 'Don\'t just say "AWS is powerful"…' }, detail: { tr: 'Sadece "AWS güçlü bir araç" deme — hangi SERVİSİ, HANGİ problem için seçtiğini somutlaştır.', en: 'Don\'t just say "AWS is powerful" — make concrete which SERVICE you chose, for WHICH problem.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Bir maliyet/fayda kararı anlat…', en: 'Describe a cost/benefit decision…' }, detail: { tr: 'Bir maliyet/fayda kararı anlat: "20 EC2 instance 4 saatliğine $12\'ye mal oldu, 3 aylık özel sunucu $3000 olurdu."', en: 'Describe a cost/benefit decision: "20 EC2 instances for 4 hours cost $12, a 3-month dedicated server would\'ve cost $3000."' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Bir güvenlik/least-privilege kararı anlat…', en: 'Describe a security/least-privilege decision…' }, detail: { tr: 'Bir güvenlik/least-privilege kararı anlat: pipeline\'a AdministratorAccess yerine sadece gereken izni verdiğini göster.', en: 'Describe a security/least-privilege decision: show you gave the pipeline only the needed permission instead of AdministratorAccess.' } },
  ],
}

const awsInterviewPractice = {
  type: 'code-playground',
  relatedTopicId: 'aws-interview',
  id: 'aws-interview',
  title: { tr: 'Kendin Dene: Least Privilege Policy Yaz', en: 'Try It Yourself: Write a Least Privilege Policy' },
  starterCode: `// Hedef: pipeline SADECE tek bir bucket'a yazabilsin, baska hicbir seye degil
// TODO: policy'yi tamamla
const policy = { Action: "s3:PutObject", Resource: "?" };`,
  solutionCode: `// Hedef: pipeline SADECE tek bir bucket'a yazabilsin, baska hicbir seye degil
const policy = { Action: "s3:PutObject", Resource: "arn:aws:s3:::qa-reports/*" };`,
  hint: { tr: 'Resource alanını "*" (her şey) bırakmak, pipeline\'ın HESAPTAKİ TÜM bucket\'lara yazabilmesi demektir — Resource\'u tek bir bucket ARN\'ine daraltmak least privilege\'in özüdür.', en: 'Leaving Resource as "*" (everything) means the pipeline can write to EVERY bucket in the account — scoping Resource to one bucket ARN is the essence of least privilege.' },
  successMessage: { tr: 'Doğru! Bu policy, credential\'lar çalınsa bile saldırganın sadece tek bir bucket\'a erişebilmesini garanti eder.', en: 'Correct! This policy guarantees that even if credentials are stolen, the attacker can only access one bucket.' },
}

const awsEcosystemTrStep = {
  type: 'step-animation',
  title: { tr: 'Lambda ile Zamanlanmış Health Check', en: 'Scheduled Health Check with Lambda' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'CloudWatch Events…', en: 'CloudWatch Events triggers the Lambda…' }, detail: { tr: 'CloudWatch Events, Lambda fonksiyonunu her 5 dakikada bir tetikler — sunucu yönetmeye gerek yok.', en: 'CloudWatch Events triggers the Lambda function every 5 minutes — no server to manage.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Lambda…', en: 'Lambda sends a request to the app\'s…' }, detail: { tr: 'Lambda, uygulamanın /health endpoint\'ine bir istek atar ve durumu kontrol eder.', en: 'Lambda sends a request to the app\'s /health endpoint and checks the status.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'İstek başarısız olursa…', en: 'If the request fails…' }, detail: { tr: 'İstek başarısız olursa, Lambda bir SNS mesajı yayınlar — takım anında bir alarm alır.', en: 'If the request fails, Lambda publishes an SNS message — the team gets an instant alert.' } },
  ],
}

const awsEcosystemTrPractice = {
  type: 'code-playground',
  relatedTopicId: 'aws-ecosystem-tr',
  id: 'aws-ecosystem-tr',
  title: { tr: 'Kendin Dene: Health Check Başarısız Olunca Alarm Gönder', en: 'Try It Yourself: Send an Alert When Health Check Fails' },
  starterCode: `// Hedef: health check basarisiz olunca SNS uyarisi gonder
// TODO: dogru servisi cagir
def send_alert(message):
    ? = boto3.client('sns')
    ?.publish(TopicArn="arn:aws:sns:...", Message=message)`,
  solutionCode: `// Hedef: health check basarisiz olunca SNS uyarisi gonder
def send_alert(message):
    sns = boto3.client('sns')
    sns.publish(TopicArn="arn:aws:sns:...", Message=message)`,
  hint: { tr: 'SNS (Simple Notification Service), bir olay olduğunda birden fazla abone kanalına (email, Slack, SMS) anında bildirim yayınlamak için tasarlanmıştır.', en: 'SNS (Simple Notification Service) is built to instantly broadcast a notification to multiple subscriber channels (email, Slack, SMS) when an event happens.' },
  successMessage: { tr: 'Doğru! Bu, sunucusuz bir health check + alarm zincirinin temelidir — hiçbir sunucu 7/24 çalışmaz, sadece 5 dakikada bir uyanır.', en: 'Correct! This is the foundation of a serverless health check + alert chain — no server runs 24/7, it only wakes up every 5 minutes.' },
}

export const awsData = {
  en: {
    hero: {
      title: '☁️ Amazon Web Services (AWS)',
      subtitle: 'Cloud Computing Platform for QA Engineers',
      intro: 'Master the AWS services used in modern QA workflows — from provisioning test environments on EC2 to storing test artifacts on S3 and running pipelines with CodePipeline.',
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
        title: '🎯 What is AWS?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: 'AWS is the JVM for the internet age: just as your Java application does not care which physical machine runs the JVM — it runs anywhere identically — your test infrastructure does not care which rack holds the server. But here is the question that trips up every engineer who first encounters cloud: if you already have a server in your office, why pay Amazon by the hour? Because a physical server costs the same whether it runs for 3 minutes or 3 months, sits idle all weekend, and needs a human to replace the failed hard drive. AWS bills per second of actual use, scales from 1 to 1,000 instances in 90 seconds, and replaces failed hardware invisibly — Java analogy: EC2 is a rented JVM process. You call `RunInstances`, it starts. You call `TerminateInstances`, billing halts. In QA terms, the stakes are real: a team that waits until Monday morning to run Friday-night tests on a shared server is the team that ships bugs over the weekend because no CI environment was available — AWS eliminates that gap at a cost of pennies per run.',
          },
          {
            type: 'text',
            content: 'AWS (Amazon Web Services) is the world\'s most widely used cloud platform, offering 200+ services from data centers around the globe. For QA engineers, AWS means: spin up a fresh test environment in minutes, run 100 parallel browser sessions, store test reports forever, and tear everything down when done.',
          },
          { type: 'heading', text: 'Why QA Engineers Need AWS' },
          {
            type: 'grid', cols: 3,
            items: [
              { icon: '⚡', label: 'Instant Environments', desc: 'Spin up a fresh Linux server with Chrome + Selenium Grid in under 2 minutes. No IT ticket, no waiting.' },
              { icon: '🔀', label: 'Parallel Execution', desc: 'Run 50 browser sessions simultaneously on EC2 — cut a 2-hour test suite to 5 minutes.' },
              { icon: '💰', label: 'Pay-as-you-go', desc: 'A t3.medium costs ~$0.04/hour. Run tests for 2 hours = $0.08. No monthly server bills.' },
              { icon: '📦', label: 'Artifact Storage', desc: 'S3 stores test reports, screenshots, videos forever at near-zero cost.' },
              { icon: '🔁', label: 'CI/CD Integration', desc: 'CodePipeline triggers your test suite on every git push. Results go to CloudWatch.' },
              { icon: '🌍', label: 'Multi-region Testing', desc: 'Test your app from US, EU, and Asia simultaneously to catch latency issues.' },
            ],
          },
          { type: 'heading', text: 'AWS vs Traditional Infrastructure' },
          {
            type: 'table',
            headers: ['Aspect', 'Traditional Server', 'AWS Cloud'],
            rows: [
              ['Setup time', '2-4 weeks (procurement)', '2 minutes (console click)'],
              ['Cost model', 'Fixed monthly (pay even idle)', 'Pay per second/hour used'],
              ['Scaling', 'Manual, slow, expensive', 'Auto-scaling in seconds'],
              ['Maintenance', 'Your team patches OS', 'AWS manages hardware'],
              ['Test isolation', 'Shared server, conflicts', 'Fresh instance per run'],
              ['Global reach', 'One datacenter', '31 regions worldwide'],
            ],
          },
          { type: 'heading', text: 'Core AWS Services for QA' },
          {
            type: 'list', icon: '▸',
            items: [
              { label: 'EC2 (Elastic Compute Cloud)', desc: ' — virtual machines. Run Selenium Grid, your test app, or any server workload.' },
              { label: 'S3 (Simple Storage Service)', desc: ' — object storage. Store test artifacts, Allure reports, screenshots, logs.' },
              { label: 'IAM (Identity & Access Management)', desc: ' — users, roles, permissions. Controls who can do what in AWS.' },
              { label: 'VPC (Virtual Private Cloud)', desc: ' — private network. Isolate your test environment from the internet.' },
              { label: 'CodePipeline / CodeBuild', desc: ' — CI/CD. Build and test on every commit.' },
              { label: 'CloudWatch', desc: ' — monitoring & logging. View test runner logs, set alerts on failures.' },
              { label: 'RDS (Relational Database Service)', desc: ' — managed PostgreSQL/MySQL. Spin up a test database in minutes.' },
              { label: 'ECS / Lambda', desc: ' — containers and serverless. Run Playwright tests in containers without managing servers.' },
            ],
          },
          { type: 'tip', content: 'AWS Free Tier gives you 750 hours/month of t2.micro EC2 for 12 months. Perfect for learning — you can run a full Selenium Grid for free.' },
          { type: 'heading', text: 'AWS Global Infrastructure' },
          {
            type: 'diagram-svg',
            title: 'AWS Regions & Availability Zones',
            svg: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="background:#1e2030;border-radius:12px;width:100%;font-family:monospace">
  <text x="350" y="28" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold">AWS Global Infrastructure</text>
  <rect x="30" y="50" width="190" height="130" rx="10" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="125" y="72" text-anchor="middle" fill="#60a5fa" font-size="11" font-weight="bold">Region (e.g. us-east-1)</text>
  <rect x="45" y="82" width="72" height="82" rx="6" fill="#1e2a4a" stroke="#6366f1" stroke-dasharray="4"/>
  <text x="81" y="98" text-anchor="middle" fill="#818cf8" font-size="9">AZ-1a</text>
  <rect x="55" y="105" width="52" height="20" rx="3" fill="#312e81"/>
  <text x="81" y="119" text-anchor="middle" fill="#c7d2fe" font-size="8">EC2 instances</text>
  <rect x="55" y="130" width="52" height="20" rx="3" fill="#312e81"/>
  <text x="81" y="144" text-anchor="middle" fill="#c7d2fe" font-size="8">RDS database</text>
  <rect x="132" y="82" width="72" height="82" rx="6" fill="#1e2a4a" stroke="#6366f1" stroke-dasharray="4"/>
  <text x="168" y="98" text-anchor="middle" fill="#818cf8" font-size="9">AZ-1b</text>
  <rect x="142" y="105" width="52" height="20" rx="3" fill="#312e81"/>
  <text x="168" y="119" text-anchor="middle" fill="#c7d2fe" font-size="8">EC2 instances</text>
  <rect x="142" y="130" width="52" height="20" rx="3" fill="#312e81"/>
  <text x="168" y="144" text-anchor="middle" fill="#c7d2fe" font-size="8">RDS standby</text>
  <rect x="255" y="50" width="190" height="130" rx="10" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="350" y="72" text-anchor="middle" fill="#60a5fa" font-size="11" font-weight="bold">Region (e.g. eu-west-1)</text>
  <rect x="270" y="82" width="72" height="82" rx="6" fill="#1e2a4a" stroke="#6366f1" stroke-dasharray="4"/>
  <text x="306" y="98" text-anchor="middle" fill="#818cf8" font-size="9">AZ-1a</text>
  <rect x="280" y="108" width="52" height="18" rx="3" fill="#1a3a2a"/>
  <text x="306" y="121" text-anchor="middle" fill="#6ee7b7" font-size="8">Selenium Grid</text>
  <rect x="357" y="82" width="72" height="82" rx="6" fill="#1e2a4a" stroke="#6366f1" stroke-dasharray="4"/>
  <text x="393" y="98" text-anchor="middle" fill="#818cf8" font-size="9">AZ-1b</text>
  <rect x="367" y="108" width="52" height="18" rx="3" fill="#1a3a2a"/>
  <text x="393" y="121" text-anchor="middle" fill="#6ee7b7" font-size="8">Test Reports</text>
  <rect x="480" y="50" width="180" height="130" rx="10" fill="#2d1a4a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="570" y="72" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold">Global Services</text>
  <rect x="495" y="82" width="150" height="22" rx="4" fill="#3b1f6a"/>
  <text x="570" y="97" text-anchor="middle" fill="#e9d5ff" font-size="9">S3 — Object Storage (all regions)</text>
  <rect x="495" y="110" width="150" height="22" rx="4" fill="#3b1f6a"/>
  <text x="570" y="125" text-anchor="middle" fill="#e9d5ff" font-size="9">IAM — Identity Management</text>
  <rect x="495" y="138" width="150" height="22" rx="4" fill="#3b1f6a"/>
  <text x="570" y="153" text-anchor="middle" fill="#e9d5ff" font-size="9">CloudFront — CDN</text>
  <text x="350" y="205" text-anchor="middle" fill="#6b7280" font-size="9">Each Region has 2-6 Availability Zones (AZ) for redundancy</text>
</svg>`,
          },
          awsPayPerSecondFilm,
          awsWhyQaFilmStep,
          awsWhyQaFilmPractice,
          {
            type: 'quiz',
            question: 'A QA engineer needs to store Allure HTML reports and screenshots generated by every CI run, accessible by URL. Which AWS service is the right fit?',
            options: [
              { id: 'a', text: 'EC2' },
              { id: 'b', text: 'S3' },
              { id: 'c', text: 'IAM' },
              { id: 'd', text: 'RDS' },
            ],
            correct: 'b',
            explanation: 'S3 (Simple Storage Service) is object storage built exactly for this: store files (reports, screenshots, logs, videos) and optionally serve them over HTTP via a public or signed URL. EC2 is for running virtual machines, IAM manages permissions, and RDS is a managed relational database — none of them are built for storing static report artifacts.',
            retryQuestion: {
              question: 'You want only your CI pipeline to be able to write new reports to an S3 bucket, while QA engineers can only read them. What is the right tool for this?',
              options: [
                { id: 'a', text: 'Make the bucket fully public so anyone can read/write' },
                { id: 'b', text: 'An IAM policy that grants the CI role s3:PutObject and engineers only s3:GetObject' },
                { id: 'c', text: 'Renaming the bucket periodically' },
                { id: 'd', text: 'Storing reports in EC2 instance memory instead' },
              ],
              correct: 'b',
              explanation: 'IAM policies grant fine-grained permissions per action (e.g. s3:PutObject for writing, s3:GetObject for reading) to a specific role or user. Attaching a write-capable policy only to the CI role and a read-only policy to engineers enforces least privilege — a fully public bucket would let anyone on the internet read or even overwrite reports.',
            },
          },
        ],
      },

      // ── 1. INSTALLATION ───────────────────────────────────────────────────────
      {
        title: '⚙️ AWS CLI Installation',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🖥️',
            content: 'The AWS CLI is to the AWS Console what a Maven command is to clicking through IntelliJ\'s GUI — both reach the same outcome, but one can run unattended inside a script at 2 AM. Think about it: if the AWS Console were enough, why does every CI/CD pipeline use the CLI instead? Because a pipeline is just a script, and scripts need commands that return an exit code, pipe their output, and never wait for a human to click "Confirm." Java analogy: the Console is `java -jar` with a friendly GUI wrapper; the CLI is invoking the Java class directly via `ProcessBuilder` — same JVM, full programmatic control. For QA engineers, the operational consequence is concrete: a pipeline that uploads 200 Selenium screenshots to S3 after a test run needs one `aws s3 sync` command, not 200 manual drag-and-drops — and if that command is not in the pipeline script, the screenshots disappear when the CI agent resets.',
          },
          { type: 'heading', text: 'Step 1 — Create an AWS Account' },
          {
            type: 'list', icon: '①',
            items: [
              'Go to aws.amazon.com → click "Create an AWS Account"',
              'Enter email, password, account name',
              'Add a credit card (Free Tier keeps costs at $0 for 12 months)',
              'Verify phone number → choose "Basic Support" (free)',
              'Wait ~1 minute for activation email',
            ],
          },
          { type: 'tip', content: 'Enable MFA (Multi-Factor Authentication) on your root account immediately after creation. Go to IAM → Security credentials → Activate MFA.' },
          { type: 'heading', text: 'Step 2 — Install AWS CLI' },
          {
            type: 'list', icon: '💻',
            title: 'Windows (winget):',
            items: ['winget install Amazon.AWSCLI'],
          },
          {
            type: 'code', language: 'bash',
            code: `# Windows — winget
winget install Amazon.AWSCLI

# Windows — MSI installer (alternative)
# Download from: https://awscli.amazonaws.com/AWSCLIV2.msi

# macOS — Homebrew
brew install awscli

# Linux (Ubuntu/Debian)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Verify installation
aws --version
# Expected: aws-cli/2.x.x Python/3.x.x ...`,
          },
          awsCliInstallStep,
          {
            type: 'text',
            content: 'Expected output: aws-cli/2.15.0 Python/3.11.6 Windows/10 exe/AMD64 prompt/off',
          },
          { type: 'heading', text: 'Step 3 — Create IAM User & Access Keys' },
          {
            type: 'list', icon: '🔑',
            items: [
              'Go to AWS Console → IAM → Users → Create user',
              'Username: my-qa-user → check "Programmatic access"',
              'Attach policy: AdministratorAccess (for learning; use least-privilege in prod)',
              'Download the .csv file with Access Key ID and Secret Access Key',
              '⚠️ You only see the Secret Access Key ONCE — save it now',
            ],
          },
          { type: 'heading', text: 'Step 4 — Configure AWS CLI' },
          {
            type: 'code', language: 'bash',
            code: `aws configure

# Prompts:
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json

# Verify configuration
aws sts get-caller-identity`,
          },
          awsConfigureStep,
          {
            type: 'code', language: 'json',
            code: `// Expected output of "aws sts get-caller-identity":
{
    "UserId": "AIDAIOSFODNN7EXAMPLE",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/my-qa-user"
}`,
          },
          {
            type: 'tip',
            content: 'Store multiple profiles with "aws configure --profile myproject". Switch profiles with "export AWS_PROFILE=myproject" or "--profile myproject" flag on each command.',
          },
          { type: 'heading', text: 'Step 5 — Test with S3' },
          {
            type: 'code', language: 'bash',
            code: `# Create a test bucket (bucket names must be globally unique)
aws s3 mb s3://my-qa-test-bucket-$(date +%s)

# Upload a file
echo "Hello AWS" > test.txt
aws s3 cp test.txt s3://my-qa-test-bucket-<timestamp>/

# List bucket contents
aws s3 ls s3://my-qa-test-bucket-<timestamp>/

# Delete the bucket when done
aws s3 rb s3://my-qa-test-bucket-<timestamp>/ --force`,
          },
          awsS3TestStep,
          {
            type: 'diagram-svg',
            title: 'AWS CLI Configuration Flow',
            svg: `<svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" style="background:#1e2030;border-radius:12px;width:100%;font-family:monospace">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#6366f1"/>
    </marker>
  </defs>
  <rect x="20" y="55" width="110" height="50" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="75" y="77" text-anchor="middle" fill="#c7d2fe" font-size="10" font-weight="bold">aws configure</text>
  <text x="75" y="93" text-anchor="middle" fill="#818cf8" font-size="8">CLI command</text>
  <line x1="130" y1="80" x2="165" y2="80" stroke="#6366f1" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="165" y="40" width="120" height="80" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="225" y="62" text-anchor="middle" fill="#60a5fa" font-size="10" font-weight="bold">~/.aws/</text>
  <text x="225" y="78" text-anchor="middle" fill="#93c5fd" font-size="9">credentials</text>
  <text x="225" y="93" text-anchor="middle" fill="#6b7280" font-size="8">[access key]</text>
  <text x="225" y="107" text-anchor="middle" fill="#93c5fd" font-size="9">config</text>
  <line x1="285" y1="80" x2="320" y2="80" stroke="#6366f1" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="320" y="55" width="120" height="50" rx="8" fill="#1a3a2a" stroke="#10b981" stroke-width="1.5"/>
  <text x="380" y="77" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">aws s3 ls</text>
  <text x="380" y="93" text-anchor="middle" fill="#34d399" font-size="8">authenticated ✓</text>
  <line x1="440" y1="80" x2="475" y2="80" stroke="#6366f1" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="475" y="40" width="130" height="80" rx="8" fill="#2d1a4a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="540" y="62" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">AWS API</text>
  <text x="540" y="78" text-anchor="middle" fill="#a78bfa" font-size="8">Signs request with</text>
  <text x="540" y="93" text-anchor="middle" fill="#a78bfa" font-size="8">Access Key + Secret</text>
  <text x="540" y="107" text-anchor="middle" fill="#7c3aed" font-size="8">SigV4 signature</text>
  <text x="320" y="145" text-anchor="middle" fill="#6b7280" font-size="8">Credentials stored locally — never sent in plain text</text>
</svg>`,
          },
          awsCliScriptedFilm,
          {
            type: 'quiz',
            question: 'After creating an IAM user and downloading the .csv with the Access Key ID and Secret Access Key, you close the tab without saving the Secret. What can you do?',
            options: [
              { id: 'a', text: 'Go back to IAM and reveal the same secret again' },
              { id: 'b', text: 'The Secret Access Key can never be retrieved again — you must create a new access key pair' },
              { id: 'c', text: 'Call AWS support to recover it' },
              { id: 'd', text: 'It is emailed to you automatically' },
            ],
            correct: 'b',
            explanation: 'AWS shows the Secret Access Key only once, at creation time, by design (it is never stored in plaintext server-side, only a hash). If you lose it, the only fix is IAM → Users → Security credentials → Create access key to generate a brand new pair, and deactivate/delete the old one. This is the same security principle as a password hash: the system never re-displays the original secret.',
            retryQuestion: {
              question: 'A teammate accidentally pasted a live AWS Access Key ID and Secret into a public Slack channel. What is the correct first response?',
              options: [
                { id: 'a', text: 'Ask them to delete the Slack message — that removes the exposure' },
                { id: 'b', text: 'Immediately deactivate/delete that access key pair in IAM and issue a new one' },
                { id: 'c', text: 'Wait and see if it gets used maliciously before acting' },
                { id: 'd', text: 'Rename the IAM user' },
              ],
              correct: 'b',
              explanation: 'Once a credential has been exposed, deleting the message does not undo the exposure — it may already be cached, logged, or copied by anyone who saw it before deletion. The only safe response is to immediately revoke (deactivate/delete) the exposed access key in IAM and create a fresh pair, the same incident-response principle as rotating a leaked password rather than hoping no one used it.',
            },
          },
        ],
      },

      // ── 2. REAL WORLD ─────────────────────────────────────────────────────────
      {
        title: '🛠️ Real World — AWS in QA',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏗️',
            content: 'Real-world AWS QA is not about learning commands — it is about designing a workflow where infrastructure is disposable. Picture an e-commerce team preparing for Black Friday: their load test requires 20 EC2 instances running JMeter for 4 hours. On dedicated hardware, those 20 servers cost $3,000 per month and sit idle 27 days before the test. But why is disposable infrastructure hard to trust? Because Java developers are trained to treat servers as persistent state — you SSH in, configure the JDK, tune the JVM flags, and never want to redo that work. AWS forces the opposite mindset: every instance must be reproducible from a script, or it is a ticking time bomb. Java analogy: EC2 instances are like JUnit test lifecycle — `@BeforeAll` provisions the instance, `@AfterAll` terminates it, and the test body runs in between. In a real QA incident, the team that cannot reproduce the exact environment where a test ran cannot answer "was the failure real or was it a flaky environment?" — AWS with tagged, scripted environments answers that question automatically.',
          },
          { type: 'heading', text: 'Scenario: Selenium Grid on AWS EC2' },
          {
            type: 'text',
            content: 'This is the most common QA use case: running a distributed Selenium Grid on EC2 to execute browser tests in parallel. Here is the exact step-by-step flow a QA engineer follows.',
          },
          {
            type: 'code', language: 'bash',
            code: `# 1. Launch EC2 instance (Hub)
aws ec2 run-instances \\
  --image-id ami-0c02fb55956c7d316 \\   # Amazon Linux 2
  --instance-type t3.medium \\
  --key-name my-qa-key \\
  --security-group-ids sg-0abc123 \\
  --count 1 \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=selenium-hub}]'

# 2. Get the public IP
aws ec2 describe-instances \\
  --filters "Name=tag:Name,Values=selenium-hub" \\
  --query 'Reservations[0].Instances[0].PublicIpAddress' \\
  --output text

# 3. SSH into the hub
ssh -i my-qa-key.pem ec2-user@<PUBLIC_IP>`,
          },
          awsEc2LaunchStep,
          {
            type: 'code', language: 'bash',
            code: `# On the EC2 instance — install Docker + run Selenium Grid
sudo yum install -y docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user

# Pull and start Selenium Hub
docker run -d -p 4442-4444:4442-4444 --name selenium-hub selenium/hub:4.18.1

# On Node instances (run same commands + connect to hub)
docker run -d \\
  -e SE_EVENT_BUS_HOST=<HUB_PRIVATE_IP> \\
  -e SE_EVENT_BUS_PUBLISH_PORT=4442 \\
  -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \\
  selenium/node-chrome:4.18.1`,
          },
          { type: 'heading', text: 'Scenario: Store Test Reports in S3' },
          {
            type: 'code', language: 'bash',
            code: `# After test run — upload Allure report to S3
aws s3 sync ./allure-report/ s3://my-qa-reports/run-$(date +%Y%m%d-%H%M)/

# Make the index.html publicly accessible
aws s3 website s3://my-qa-reports/ \\
  --index-document index.html \\
  --error-document error.html

# Share the report URL with your team
echo "Report: https://my-qa-reports.s3-website-us-east-1.amazonaws.com/run-$(date +%Y%m%d-%H%M)/"`,
          },
          awsS3SyncReportStep,
          { type: 'heading', text: 'Scenario: CI/CD with CodeBuild' },
          {
            type: 'code', language: 'yaml',
            code: `# buildspec.yml — CodeBuild runs your Playwright tests on every git push
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - npm ci
      - npx playwright install --with-deps chromium
  build:
    commands:
      - npx playwright test --reporter=html
  post_build:
    commands:
      - aws s3 sync playwright-report/ s3://my-qa-reports/latest/
      - echo "Report uploaded to S3"
artifacts:
  files:
    - playwright-report/**/*`,
          },
          {
            type: 'simulation',
            icon: '☁️',
            color: '#ec7211',
            title: { en: 'AWS CodePipeline — CI/CD in Action', tr: 'AWS CodePipeline — CI/CD Canlı Akış' },
            scenario: 'aws-codepipeline',
            description: {
              en: 'Click "▶ git push": watch CodePipeline pick up the commit, run CodeBuild through install → test → upload, and stream live logs to CloudWatch while the report lands in S3.',
              tr: '"▶ git push" butonuna bas: CodePipeline\'ın commit\'i yakalayıp CodeBuild ile install → test → upload adımlarını çalıştırdığını ve CloudWatch\'a canlı log akıttığını, raporun S3\'e düştüğünü izle.',
            },
            code: `# buildspec.yml — triggered on every git push
version: 0.2
phases:
  install:
    commands: [npm ci, npx playwright install --with-deps chromium]
  build:
    commands: [npx playwright test --reporter=html]
  post_build:
    commands: [aws s3 sync playwright-report/ s3://my-qa-reports/latest/]`,
          },
          { type: 'heading', text: 'AWS vs Alternatives for QA' },
          {
            type: 'table',
            headers: ['Feature', 'AWS', 'Azure', 'GCP', 'On-Premise'],
            rows: [
              ['Market share', '32% ✅', '22%', '11%', '—'],
              ['Free tier', '12 months ✅', '12 months ✅', '90 days', '❌'],
              ['Selenium support', 'EC2 + ECS ✅', 'VMs + AKS', 'GCE + GKE', 'Manual'],
              ['CI/CD native', 'CodePipeline ✅', 'Azure DevOps ✅', 'Cloud Build', 'Jenkins'],
              ['Test reports', 'S3 + CloudWatch', 'Blob Storage', 'GCS', 'NFS share'],
              ['Learning curve', '🟡 Medium', '🟡 Medium', '🔴 Steep', '🟢 Easy'],
              ['Job market', '🔴 Most jobs', '🟡 Many jobs', '🟢 Growing', '—'],
            ],
          },
          { type: 'tip', content: 'For QA engineers, AWS knowledge is the highest-demand cloud skill. 60%+ of job postings that mention cloud specify AWS.' },
          { type: 'heading', text: 'Hands-on Mini Project: Automated Test + S3 Report' },
          {
            type: 'code', language: 'bash',
            code: `#!/bin/bash
# run-tests-aws.sh — Complete QA pipeline

# 1. Run Playwright tests
npx playwright test

# 2. Upload HTML report to S3
BUCKET="qa-reports-$(aws sts get-caller-identity --query Account --output text)"
aws s3 mb s3://$BUCKET 2>/dev/null || true
aws s3 sync playwright-report/ s3://$BUCKET/$(date +%Y-%m-%d_%H-%M)/

# 3. Print shareable URL
echo "✅ Report: https://$BUCKET.s3.amazonaws.com/$(date +%Y-%m-%d_%H-%M)/index.html"`,
          },
          awsCompletePipelineStep,
          awsSeleniumEc2S3Film,
          {
            type: 'quiz',
            question: 'A QA team needs to load-test their site for Black Friday: spin up 20 EC2 instances for 4 hours, then tear them down. Why is this dramatically cheaper than renting dedicated servers for 3 months?',
            options: [
              { id: 'a', text: 'EC2 instances are always free for QA workloads' },
              { id: 'b', text: 'AWS bills per second/hour of actual usage, so you only pay for the 4 hours the instances actually ran' },
              { id: 'c', text: 'AWS gives unlimited free compute during sales events' },
              { id: 'd', text: 'EC2 instances are slower so they cost less' },
            ],
            correct: 'b',
            explanation: 'Traditional dedicated servers are billed as a fixed monthly cost regardless of usage — renting one for 3 months costs the same whether you use it for 3 minutes or 3 months. EC2 bills per second/hour, so launching 20 instances for exactly 4 hours and terminating them costs only those 4 hours of compute — the same pay-as-you-go principle as a taxi versus owning a car.',
            retryQuestion: {
              question: 'After a 4-hour load test finishes, the team forgets to terminate the 20 EC2 instances and they keep running for a week. What happens to the bill?',
              options: [
                { id: 'a', text: 'Nothing — AWS automatically stops idle instances for free' },
                { id: 'b', text: 'The team is billed for every hour the instances kept running, even though no test was happening' },
                { id: 'c', text: 'AWS only charges for compute actually used by a test, not idle time' },
                { id: 'd', text: 'The instances pause themselves automatically after the test ends' },
              ],
              correct: 'b',
              explanation: 'EC2 billing is based on the instance being in a "running" state, not on whether it is actively doing useful work — an idle instance still accrues compute charges every hour. This is exactly why "terminate the cluster when done" is a standard step in load-testing runbooks: pay-per-use only saves money if you actually stop paying when you are done.',
            },
          },
        ],
      },

      // ── 3. ECOSYSTEM ──────────────────────────────────────────────────────────
      {
        title: '🔗 AWS Ecosystem for QA',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧩',
            content: 'AWS services are like the standard library packages of a Java project: you do not build a HashMap from scratch — you import `java.util.HashMap`. Similarly, you do not build a file server from scratch — you call the S3 API. But here is the question that reveals whether someone truly understands cloud: why do these services need to talk to each other at all? Could one service not do everything? No — and the reason is the same as why Java separates `java.io` from `java.net`: each service is optimized for exactly one job, and the power comes from wiring them together. Java analogy: EC2 is a running `Thread`, S3 is a persistent `ObjectOutputStream`, IAM is a `SecurityManager`, and CodePipeline is a `CompletableFuture` chain — each composable, each replaceable. In a QA pipeline with no ecosystem thinking, a Selenium test that passes on a developer laptop but fails in CI is almost always caused by missing wiring: the test runner cannot reach the right S3 bucket, the IAM role has no permission to write reports, or CloudWatch never received the failure log — and no one knows the test failed until a production bug surfaces.',
          },
          { type: 'heading', text: 'QA-Relevant AWS Services Map' },
          {
            type: 'diagram-svg',
            title: 'AWS Services Used in QA Workflows',
            svg: `<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style="background:#1e2030;border-radius:12px;width:100%;font-family:sans-serif">
  <defs>
    <marker id="a2" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
      <polygon points="0 0,7 2.5,0 5" fill="#6366f1"/>
    </marker>
  </defs>
  <text x="340" y="22" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold">AWS QA Ecosystem</text>
  <!-- CodePipeline -->
  <rect x="20" y="40" width="130" height="50" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="85" y="62" text-anchor="middle" fill="#60a5fa" font-size="10" font-weight="bold">CodePipeline</text>
  <text x="85" y="78" text-anchor="middle" fill="#93c5fd" font-size="8">Trigger on git push</text>
  <!-- CodeBuild -->
  <rect x="20" y="110" width="130" height="50" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="85" y="132" text-anchor="middle" fill="#60a5fa" font-size="10" font-weight="bold">CodeBuild</text>
  <text x="85" y="148" text-anchor="middle" fill="#93c5fd" font-size="8">Run test suite</text>
  <!-- arrows -->
  <line x1="85" y1="90" x2="85" y2="110" stroke="#6366f1" stroke-width="1.5" marker-end="url(#a2)"/>
  <line x1="150" y1="135" x2="195" y2="135" stroke="#6366f1" stroke-width="1.5" marker-end="url(#a2)"/>
  <!-- EC2 -->
  <rect x="195" y="80" width="130" height="110" rx="8" fill="#1a3a2a" stroke="#10b981" stroke-width="1.5"/>
  <text x="260" y="102" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">EC2</text>
  <text x="260" y="118" text-anchor="middle" fill="#34d399" font-size="8">Selenium Hub</text>
  <text x="260" y="133" text-anchor="middle" fill="#34d399" font-size="8">Chrome Nodes</text>
  <text x="260" y="148" text-anchor="middle" fill="#34d399" font-size="8">Test App Server</text>
  <text x="260" y="163" text-anchor="middle" fill="#34d399" font-size="8">Jenkins Agent</text>
  <line x1="325" y1="135" x2="365" y2="135" stroke="#6366f1" stroke-width="1.5" marker-end="url(#a2)"/>
  <!-- S3 -->
  <rect x="365" y="80" width="130" height="110" rx="8" fill="#2d1a4a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="430" y="102" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">S3</text>
  <text x="430" y="118" text-anchor="middle" fill="#a78bfa" font-size="8">Test Reports</text>
  <text x="430" y="133" text-anchor="middle" fill="#a78bfa" font-size="8">Screenshots</text>
  <text x="430" y="148" text-anchor="middle" fill="#a78bfa" font-size="8">Videos</text>
  <text x="430" y="163" text-anchor="middle" fill="#a78bfa" font-size="8">Test Data CSVs</text>
  <!-- RDS -->
  <rect x="195" y="210" width="130" height="50" rx="8" fill="#3b1f00" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="260" y="232" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">RDS</text>
  <text x="260" y="248" text-anchor="middle" fill="#fbbf24" font-size="8">Test Database</text>
  <line x1="260" y1="190" x2="260" y2="210" stroke="#6366f1" stroke-width="1.5" marker-end="url(#a2)"/>
  <!-- CloudWatch -->
  <rect x="530" y="80" width="130" height="80" rx="8" fill="#1f2a1a" stroke="#84cc16" stroke-width="1.5"/>
  <text x="595" y="102" text-anchor="middle" fill="#a3e635" font-size="10" font-weight="bold">CloudWatch</text>
  <text x="595" y="118" text-anchor="middle" fill="#84cc16" font-size="8">Test logs</text>
  <text x="595" y="133" text-anchor="middle" fill="#84cc16" font-size="8">Failure alerts</text>
  <text x="595" y="148" text-anchor="middle" fill="#84cc16" font-size="8">Dashboards</text>
  <line x1="495" y1="120" x2="530" y2="120" stroke="#6366f1" stroke-width="1.5" marker-end="url(#a2)"/>
  <!-- IAM -->
  <rect x="365" y="210" width="130" height="50" rx="8" fill="#1f1a2a" stroke="#ec4899" stroke-width="1.5"/>
  <text x="430" y="232" text-anchor="middle" fill="#f9a8d4" font-size="10" font-weight="bold">IAM</text>
  <text x="430" y="248" text-anchor="middle" fill="#f472b6" font-size="8">Roles &amp; Permissions</text>
  <text x="340" y="290" text-anchor="middle" fill="#6b7280" font-size="8">All services communicate through IAM roles — no hardcoded credentials</text>
</svg>`,
          },
          { type: 'heading', text: 'AWS + CI/CD Tools Integration' },
          {
            type: 'table',
            headers: ['Tool', 'Integration', 'Use Case'],
            rows: [
              ['Jenkins', 'EC2 plugin, IAM role', 'Jenkins agents run on EC2 spot instances'],
              ['GitHub Actions', 'configure-aws-credentials action', 'Deploy to S3 / run tests on push'],
              ['GitLab CI', 'AWS CLI in Docker runner', 'Upload artifacts to S3'],
              ['CircleCI', 'AWS Orb', 'EC2 test environment provisioning'],
              ['Terraform', 'AWS provider', 'Infrastructure as Code for test envs'],
              ['Ansible', 'AWS modules (boto3)', 'Configure EC2 instances automatically'],
            ],
          },
          { type: 'heading', text: 'AWS Lambda for Lightweight Testing' },
          {
            type: 'code', language: 'python',
            code: `# Lambda function that runs a health check and alerts on failure
import boto3, urllib.request, json

def lambda_handler(event, context):
    url = "https://myapp.example.com/health"
    try:
        with urllib.request.urlopen(url, timeout=5) as resp:
            status = resp.status
    except Exception as e:
        status = 0
        send_alert(f"Health check FAILED: {e}")

    return {"statusCode": 200, "body": json.dumps({"health": status})}

def send_alert(message):
    sns = boto3.client('sns')
    sns.publish(
        TopicArn="arn:aws:sns:us-east-1:123456789:qa-alerts",
        Message=message,
        Subject="QA Health Check Failed"
    )`,
          },
          { type: 'tip', content: 'AWS Device Farm lets you run Appium mobile tests on real physical iOS and Android devices hosted by Amazon — no emulator, no device lab management.' },
          awsQaEcosystemMapFilm,
          {
            type: 'quiz',
            question: 'You want to run Playwright tests inside Docker containers, on demand, without managing or patching any underlying servers yourself. Which AWS service fits best?',
            options: [
              { id: 'a', text: 'EC2' },
              { id: 'b', text: 'ECS Fargate' },
              { id: 'c', text: 'RDS' },
              { id: 'd', text: 'IAM' },
            ],
            correct: 'b',
            explanation: "ECS Fargate runs containers without you provisioning or managing the EC2 instances underneath — you just describe the container (image, CPU/memory) and AWS runs it. EC2 would require you to manage the OS and patching yourself, RDS is a managed database, and IAM only handles permissions. This is the cloud equivalent of asking someone else to own the laptop the container runs on.",
            retryQuestion: {
              question: 'A security team requires that every container OS be patched within 24 hours of a CVE release, with full control over the patching process. Why might EC2 (self-managed) be chosen over Fargate here?',
              options: [
                { id: 'a', text: 'Fargate cannot run Docker containers' },
                { id: 'b', text: 'Fargate manages the underlying OS for you, so you cannot apply your own custom patch on your own schedule — EC2 gives full OS-level control' },
                { id: 'c', text: 'EC2 patches itself automatically while Fargate does not' },
                { id: 'd', text: 'Fargate is more expensive in every scenario' },
              ],
              correct: 'b',
              explanation: "Fargate's whole value proposition is that AWS manages the host OS for you — which is exactly why you cannot apply a custom emergency patch to it on your own timeline. EC2 trades away that convenience for full control: you own the OS, so you decide exactly when and how patching happens, which matters for teams under strict compliance/SLA patching requirements.",
            },
          },
        ],
      },

      // ── 4. COMMON ERRORS ──────────────────────────────────────────────────────
      {
        title: '🚨 Common AWS Errors',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔧',
            content: 'AWS errors are almost always one of three root causes — and recognizing the pattern saves hours of debugging. Think of it like Java\'s exception hierarchy: `AccessDeniedException` maps to IAM permission missing (the security manager said no), `NoSuchElementException` maps to wrong region or typo (the object you expected is not in the scope you are looking at), and `OutOfMemoryError` maps to quota exceeded (the JVM\'s heap is the account limit). But why do these errors look so cryptic when they first hit? Because AWS API error messages describe what broke at the network/API layer, not why your intention failed — exactly like a `NullPointerException` stack trace tells you the line number but not which upstream call returned null. The QA cost of misreading an AWS error is real: a pipeline that silently fails with `AccessDenied` at the `s3:PutObject` step uploads nothing to the report bucket, the test suite appears to have run but produced no artifacts, and the team discovers 3 days later that 72 hours of CI results were lost — not because the tests failed, but because no one read the error log.',
          },
          {
            type: 'error-dictionary',
              relatedTopicId: 'aws-errors-en',
            framework: 'AWS',
            errors: [
              {
                error: 'UnauthorizedOperation / AccessDenied',
                fullMessage: 'An error occurred (UnauthorizedOperation) when calling the RunInstances operation: You are not authorized to perform this operation.',
                cause: { en: 'The IAM user or role does not have the required permission. The policy attached to the user is missing the "ec2:RunInstances" action.' },
                solution: { en: 'Go to IAM → Users → your-user → Add permissions. Attach "AmazonEC2FullAccess" for EC2 operations, or add specific action to a custom policy. In CI/CD, check the IAM role attached to CodeBuild/Lambda.' },
              },
              {
                error: 'NoCredentialsError',
                fullMessage: 'botocore.exceptions.NoCredentialsError: Unable to locate credentials',
                cause: { en: 'AWS CLI or SDK cannot find credentials. The "aws configure" was never run, or credentials expired, or environment variables AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY are not set.' },
                solution: { en: 'Run "aws configure" and enter your Access Key ID and Secret. In Lambda/EC2/ECS, attach an IAM Role instead of using access keys — the SDK picks up the role automatically via instance metadata.' },
              },
              {
                error: 'BucketAlreadyExists',
                fullMessage: 'An error occurred (BucketAlreadyExists) when calling the CreateBucket operation: The requested bucket name is not available.',
                cause: { en: 'S3 bucket names are GLOBALLY unique across all AWS accounts worldwide. Someone (possibly you in another account) already owns this bucket name.' },
                solution: { en: 'Choose a unique name: add your AWS account ID or a timestamp as suffix. Example: "qa-reports-123456789012" or "qa-reports-1718000000". Never use generic names like "test-bucket".' },
              },
              {
                error: 'InvalidAMIID.NotFound',
                fullMessage: 'An error occurred (InvalidAMIID.NotFound): The image id \'ami-0c02fb55956c7d316\' does not exist',
                cause: { en: 'AMI IDs are region-specific. An AMI that exists in us-east-1 does not exist in eu-west-1. You copied an AMI ID from a tutorial targeting a different region.' },
                solution: { en: 'Find the correct AMI for your region: AWS Console → EC2 → AMIs → search for "Amazon Linux 2" or use AWS CLI: "aws ec2 describe-images --owners amazon --filters Name=name,Values=amzn2-ami-hvm-*" in your target region.' },
              },
              {
                error: 'InstanceLimitExceeded',
                fullMessage: 'An error occurred (InstanceLimitExceeded): You have requested more instances than your current instance limit of 5 allows.',
                cause: { en: 'New AWS accounts have a limit of 5 running EC2 instances per region. This is a safety quota to prevent unexpected bills from runaway scripts.' },
                solution: { en: 'Request a limit increase: Service Quotas → Amazon EC2 → "Running On-Demand Standard Instances" → Request increase. For testing, use spot instances or reduce parallelism. Usually approved in minutes for reasonable increases.' },
              },
              {
                error: 'S3 403 Forbidden on public bucket',
                fullMessage: 'AccessDenied when accessing s3://bucket/file.html via browser',
                cause: { en: 'S3 Block Public Access is enabled by default since 2023. Even if you set object ACL to "public-read", the bucket-level Block Public Access override denies all public requests.' },
                solution: { en: 'Go to S3 → bucket → Permissions → Block public access → Edit → Uncheck all 4 options → Save. Then set bucket policy to allow s3:GetObject for Principal: "*". For internal reports, use pre-signed URLs instead of public buckets.' },
              },
              {
                error: 'RequestExpired / Signature mismatch',
                fullMessage: 'An error occurred (RequestExpired): Request has expired. Signature date: 20240115T120000Z, server date: 20240115T130500Z',
                cause: { en: 'AWS SigV4 request signatures expire after 15 minutes. If your system clock is wrong by more than 5 minutes, all AWS API calls fail with this error.' },
                solution: { en: 'Sync your system time: Windows: w32tm /resync, Linux: sudo timedatectl set-ntp true / sudo ntpdate pool.ntp.org. In Docker containers, restart the container to re-sync time from the host.' },
              },
              {
                error: 'VPC Security Group blocks connection',
                fullMessage: 'ssh: connect to host 54.x.x.x port 22: Connection timed out',
                cause: { en: 'The EC2 Security Group (firewall) does not have an inbound rule allowing SSH (port 22) from your IP. By default, all inbound traffic is blocked.' },
                solution: { en: 'Go to EC2 → Security Groups → your-sg → Inbound rules → Add rule: Type=SSH, Source=My IP. For Selenium Grid: also add port 4444. Always restrict source to "My IP" instead of "Anywhere" (0.0.0.0/0) for security.' },
              },
              {
                error: 'ThrottlingException / Rate exceeded',
                fullMessage: 'An error occurred (ThrottlingException): Rate exceeded. Retry in 1 second.',
                cause: { en: 'AWS API has rate limits per service per account. Calling EC2 DescribeInstances in a tight loop, or uploading thousands of S3 objects in parallel without exponential backoff triggers throttling.' },
                solution: { en: 'Add exponential backoff + jitter to your retry logic. AWS SDK has built-in retry (set max_attempts). For S3 mass uploads, use "aws s3 sync" instead of individual "aws s3 cp" calls — it handles throttling automatically.' },
              },
            ],
          },
          awsAccessDeniedDiagnosisFilm,
          awsAccessDeniedStep,
          awsAccessDeniedPractice,
          {
            type: 'quiz',
            question: 'A test automation script using boto3 fails with "botocore.exceptions.NoCredentialsError: Unable to locate credentials". What is the most likely cause?',
            options: [
              { id: 'a', text: 'The EC2 instance is in the wrong region' },
              { id: 'b', text: '"aws configure" was never run, or AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY are not set' },
              { id: 'c', text: 'The S3 bucket name is already taken' },
              { id: 'd', text: 'The API rate limit was exceeded' },
            ],
            correct: 'b',
            explanation: "The AWS SDK (boto3, etc.) looks for credentials in a specific order: environment variables, the ~/.aws/credentials file (written by 'aws configure'), or an attached IAM Role. If none of these are present or have expired, it cannot authenticate and throws NoCredentialsError. On EC2/Lambda/ECS, the recommended fix is an attached IAM Role instead of hardcoded keys — the SDK picks it up automatically via instance metadata.",
            retryQuestion: {
              question: 'A Lambda function needs to read from S3. What is the recommended way to give it credentials, instead of hardcoding an Access Key/Secret in the function code?',
              options: [
                { id: 'a', text: 'Hardcode the keys directly in the Lambda source code' },
                { id: 'b', text: 'Attach an IAM execution role to the Lambda function with S3 read permissions' },
                { id: 'c', text: 'Email the credentials to the function at runtime' },
                { id: 'd', text: 'Store the keys in a public S3 bucket for the function to fetch' },
              ],
              correct: 'b',
              explanation: 'An IAM execution role attached to the Lambda function is automatically assumed at runtime — the SDK picks up temporary credentials via instance metadata with no key ever appearing in code, environment variables, or logs. Hardcoded keys in source code are a leak waiting to happen (visible to anyone with repo access, easy to accidentally commit) and never expire on their own, unlike role-based temporary credentials.',
            },
          },
        ],
      },

      // ── 5. INTERVIEW Q&A ──────────────────────────────────────────────────────
      {
        title: '💼 AWS Interview Questions',
        blocks: [
          {
            type: 'interview-questions',
              relatedTopicId: 'aws-interview-en',
            topic: 'AWS',
            questions: [
              // ── BASIC (15) ─────────────────────────────────────────────────
              {
                level: 'basic',
                q: { en: 'Your team needs a fresh Linux server for running Selenium tests. How do you provision one on AWS in under 5 minutes?' },
                a: { en: 'Go to EC2 → Launch Instance → select Amazon Linux 2 AMI → choose t3.medium → configure Security Group to allow SSH (port 22) and Selenium Grid (port 4444) → add your key pair → Launch. Alternatively, use CLI: "aws ec2 run-instances --image-id ami-xxx --instance-type t3.medium --key-name my-key". The instance is ready in about 90 seconds. SSH in, install Docker, pull selenium/hub — done in under 5 minutes.' },
              },
              {
                level: 'basic',
                q: { en: 'After your Playwright test run, you want to share the HTML report with your team. How do you host it on AWS without setting up a web server?' },
                a: { en: 'Use S3 Static Website Hosting: create a bucket, upload the playwright-report/ folder with "aws s3 sync", enable static website hosting on the bucket (sets up a public URL like bucket.s3-website-us-east-1.amazonaws.com), and adjust the Block Public Access settings to allow public reads. The report is accessible via URL instantly — no server, no maintenance, costs pennies per month.' },
              },
              {
                level: 'basic',
                q: { en: 'What is IAM and why should a QA engineer care about it?' },
                a: { en: 'IAM (Identity & Access Management) is the permission system for AWS. Every action in AWS (launching EC2, reading S3, etc.) requires an IAM permission. QA engineers care because: (1) CI/CD pipelines need IAM roles with the right permissions to upload to S3 or trigger ECS tasks, (2) hardcoding access keys in test scripts is a security risk — use IAM roles instead, (3) overly permissive policies can result in accidental resource deletion. Think of IAM as the security guard that checks your badge before letting you into any AWS service.' },
              },
              {
                level: 'basic',
                q: { en: 'What is the difference between an EC2 instance and a Lambda function? When would you choose each for QA?' },
                a: { en: 'EC2 is a full virtual machine — you control the OS, it runs 24/7 (or as long as you want), and you pay per hour. Lambda is a function that runs only when triggered (an event), executes for up to 15 minutes, and you pay per invocation (often free tier covers everything). For QA: use EC2 for long-running Selenium Grid, test app servers, or Jenkins agents. Use Lambda for health checks, API smoke tests, lightweight triggers, and scheduled test runs (via EventBridge cron).' },
              },
              {
                level: 'basic',
                q: { en: 'What is an S3 bucket and what kind of test artifacts would you store there?' },
                a: { en: 'An S3 bucket is a scalable object storage container — like a folder on the internet that can hold unlimited files at extremely low cost ($0.023/GB/month). QA engineers store: Allure/Playwright HTML reports, failure screenshots and videos, log files from test runs, test data CSV/JSON files, Cucumber JSON results, Postman environment files, and Docker images via ECR (a special S3-backed registry). S3 is durable (99.999999999% — "11 nines") so you never lose your test history.' },
              },
              {
                level: 'basic',
                q: { en: 'What is an AWS Region and why does it matter for testing?' },
                a: { en: 'A Region is a physical geographic location where AWS operates data centers (e.g., us-east-1 = Northern Virginia, eu-west-1 = Ireland). Regions matter for QA because: (1) your test environment should be in the same region as your application server to minimize latency, (2) AMI IDs, VPCs, and Security Groups are region-specific — an AMI from us-east-1 cannot be used in eu-west-1, (3) if testing a global app, run tests from multiple regions to catch latency issues for international users.' },
              },
              {
                level: 'basic',
                q: { en: 'How do you stop paying for an EC2 instance when your tests are done?' },
                a: { en: 'You must STOP or TERMINATE the instance. STOP keeps the disk (EBS volume) — you pay ~$0.10/GB/month for storage but not for compute. TERMINATE deletes everything permanently — you pay nothing. For QA test machines: terminate after each run (use --instance-ids in CLI), or use Auto Scaling Groups that automatically terminate instances after your test suite finishes. Common mistake: "stopping" the instance but forgetting the EBS volume still costs money.' },
              },
              {
                level: 'basic',
                q: { en: 'What is AWS CLI and how is it better than using the web console for QA automation?' },
                a: { en: 'AWS CLI is a command-line tool that lets you control AWS via terminal commands instead of clicking through the web console. For QA automation it is essential because: (1) shell scripts and CI/CD pipelines can call AWS CLI commands, (2) actions are reproducible and scriptable — "aws s3 sync" is one command, clicking through the console is 10 steps, (3) it integrates with bash/PowerShell scripts that already drive your test pipeline, (4) the console requires a human; CLI runs unattended in CI/CD.' },
              },
              {
                level: 'basic',
                q: { en: 'What is a Security Group in AWS and how would you configure it for a Selenium Grid?' },
                a: { en: 'A Security Group is a virtual firewall that controls inbound and outbound traffic to EC2 instances. For a Selenium Grid hub, you need inbound rules: port 22 (SSH) from your IP for administration, port 4444 (Selenium Grid hub API) from the test runner IP or VPC CIDR, and optionally port 7900 (noVNC) for visual debugging. For nodes: they only need to reach the hub (outbound to port 4442/4443). Always restrict source IPs — never use 0.0.0.0/0 for port 22 in production environments.' },
              },
              {
                level: 'basic',
                q: { en: 'Your AWS bill came in unexpectedly high. What are the first 3 things you check?' },
                a: { en: '(1) Billing Dashboard → Cost Explorer: filter by service to see which service costs the most. (2) EC2 console: check for running instances you forgot to terminate — common culprit. (3) S3: check total storage in all buckets — old test reports accumulate. Also check: NAT Gateways ($0.045/hour even idle), Elastic IPs not attached to running instances ($0.005/hour), RDS instances left running. Set up AWS Budgets alerts to get an email when spend exceeds $10.' },
              },
              {
                level: 'basic',
                q: { en: 'What is the AWS Free Tier and what can a QA engineer do with it?' },
                a: { en: 'AWS Free Tier gives new accounts 12 months of free resources: 750 hours/month of t2.micro EC2 (enough for one always-on or ~25 daily test runs), 5GB S3 storage, 1 million Lambda invocations/month, 750 hours of RDS db.t2.micro. For QA: run a small Selenium Grid on t2.micro, store all your test reports in S3 for free, trigger Lambda health checks for free, host a test database in RDS for free. After 12 months, pay-as-you-go prices apply but small QA workloads rarely exceed $5/month.' },
              },
              {
                level: 'basic',
                q: { en: 'How do you upload a file to S3 using AWS CLI? Give a practical example.' },
                a: { en: '"aws s3 cp ./report.html s3://my-bucket/reports/2024-01-15/report.html" copies a single file. "aws s3 sync ./playwright-report/ s3://my-bucket/latest/" syncs an entire directory, only uploading changed files (like rsync). "aws s3 ls s3://my-bucket/" lists contents. The sync command is preferred for test reports because it skips unchanged files on subsequent uploads, saving bandwidth and time. Add "--delete" to also remove old files from S3 that no longer exist locally.' },
              },
              {
                level: 'basic',
                q: { en: 'What is an AMI (Amazon Machine Image) and why does it matter for QA environment consistency?' },
                a: { en: 'An AMI is a snapshot of an EC2 instance — the OS, installed software, and configuration. Think of it as a golden template. You create an AMI after configuring your test environment (Java, Chrome, Selenium, your framework), then launch 10 nodes from this AMI — each is identical, pre-configured, and ready to test. This solves the "works on my machine" problem: every test node has the exact same environment. Custom AMIs are stored in S3 and take 5-10 minutes to create.' },
              },
              {
                level: 'basic',
                q: { en: 'A developer asks you to run tests against the staging environment hosted in AWS. How do you ensure your test machine can reach it?' },
                a: { en: 'First, check if the staging environment is in a VPC (private). If it has a public IP/DNS: simply point your test config at the public URL — it works immediately if security groups allow inbound HTTP. If staging is private (no public IP): your test runner must be in the same VPC, or you need a VPC peering/VPN. Ask the DevOps team: "What is the staging URL?" and "Is it publicly accessible or VPC-internal?" Never assume — always verify connectivity with curl/wget before running your full suite.' },
              },
              {
                level: 'basic',
                q: { en: 'What is CloudWatch and how would you use it to monitor your test pipeline?' },
                a: { en: 'CloudWatch is AWS\'s monitoring and observability service. For QA pipelines: (1) CodeBuild and Lambda automatically send logs to CloudWatch — view test run output there without SSHing into servers, (2) set up CloudWatch Alarms to notify you (via SNS email/SMS) when a Lambda health check fails, (3) create a CloudWatch Dashboard with custom metrics showing test pass rate over time, (4) use CloudWatch Logs Insights to query logs: "fields @timestamp, @message | filter @message like /FAILED/" to find all test failures across runs.' },
              },

              // ── INTERMEDIATE (20) ──────────────────────────────────────────
              {
                level: 'intermediate',
                q: { en: 'You have 200 Playwright tests that take 40 minutes sequentially. How would you architect an AWS solution to run them in under 5 minutes?' },
                a: { en: 'Use ECS Fargate with test sharding: (1) Split 200 tests into 10 groups of 20. (2) Use AWS Step Functions or a CodeBuild batch build to launch 10 Fargate tasks in parallel, each running 20 tests. (3) Each task uploads its results to S3. (4) A final Lambda merges all results and generates a combined report. Cost: 10 x Fargate task x 5 min ≈ $0.02. Alternatively, use CodeBuild batch builds with buildspec matrix — simpler to configure, same parallelism. The key is stateless test containers that can run any subset of tests.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Your Selenium tests running on EC2 pass locally but fail in CI with "Chrome not found". How do you debug this on AWS?' },
                a: { en: '(1) SSH into the EC2 instance and run "google-chrome --version" — if not found, Chrome is not installed. (2) Check CodeBuild logs in CloudWatch: look for the npm install / apt-get install steps. (3) Use a pre-built Docker image (selenium/standalone-chrome) on ECS instead of installing Chrome manually — eliminates this class of error. (4) If using EC2 AMI, bake Chrome into the AMI: install it during AMI creation, not at runtime. Root cause: the AMI used in CI does not have Chrome; the fix is to use a Docker image with Chrome pre-installed.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you set up a scheduled test run that executes your smoke tests every hour and alerts the team on failure?' },
                a: { en: 'Use EventBridge (cron) + Lambda/CodeBuild: (1) Create an EventBridge rule: schedule expression "rate(1 hour)". (2) Target: Lambda function or CodeBuild project. (3) Lambda runs a lightweight smoke test using the AWS SDK (HTTP requests, no browser needed). (4) On failure, Lambda publishes to an SNS topic with QA team email subscriptions. (5) CloudWatch Logs capture the output. For browser tests, trigger a CodeBuild project from EventBridge — it has a full Docker environment for Playwright. Cost: near zero (Lambda free tier covers 1 million invocations/month).' },
              },
              {
                level: 'intermediate',
                q: { en: 'Your team stores test credentials (DB password, API keys) in test config files committed to git. How do you fix this using AWS services?' },
                a: { en: 'Use AWS Secrets Manager or Parameter Store: (1) Store each secret with "aws secretsmanager create-secret --name qa/db-password --secret-string mypassword". (2) In tests (Python): import boto3; client.get_secret_value(SecretId="qa/db-password"). (3) In CodeBuild: reference as environment variable with "{{resolve:secretsmanager:qa/db-password}}". (4) Grant your CI role the "secretsmanager:GetSecretValue" permission. Benefits: secrets never in code, rotation is automatic, audit trail in CloudTrail. Parameter Store is free (secrets manager costs $0.40/secret/month).' },
              },
              {
                level: 'intermediate',
                q: { en: 'You need to run your API tests against a database that must be reset to a clean state before each test run. How do you architect this in AWS?' },
                a: { en: 'Use RDS with automated snapshots or Aurora Serverless: (1) Create an RDS database with a "clean state" snapshot taken after seeding. (2) Before each test run: restore the snapshot to a new RDS instance (takes ~5 min for Aurora, ~20 min for standard RDS) — or use RDS clones (Aurora fast cloning takes seconds). (3) Run tests against the fresh instance. (4) Delete the instance after. Alternative: use RDS with a stored procedure that truncates and reseeds all tables (faster, but risks data bleed between test suites). Aurora Serverless v2 is best — scales to zero when idle, costs ~$0.06/hour.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Explain how you would use IAM roles vs access keys for a CI/CD pipeline running tests on CodeBuild.' },
                a: { en: 'IAM roles are always preferred over access keys in AWS services. For CodeBuild: create a Service Role (e.g., "CodeBuildQARole") with permissions like s3:PutObject, ecr:GetAuthorizationToken, secretsmanager:GetSecretValue. Assign this role to the CodeBuild project — no key needed, AWS injects temporary credentials automatically via instance metadata. For GitHub Actions: use the "configure-aws-credentials" action with OIDC — GitHub gets a short-lived token without storing any long-term key in GitHub Secrets. Access keys should only be used when no IAM role is possible (e.g., local development, third-party tools). Never hardcode keys in code.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Your test suite uploads 500MB of screenshots to S3 after every run. S3 costs are growing. How do you reduce them?' },
                a: { en: 'Use S3 Lifecycle Policies: (1) Go to S3 → bucket → Management → Lifecycle rules. (2) Create a rule: transition objects older than 7 days to S3-IA (Infrequent Access, 40% cheaper), then delete objects older than 30 days. (3) For failed-test screenshots only: tag them with "status=failed" in your test code, then create a lifecycle rule that only keeps tagged objects. (4) Use S3 Intelligent Tiering for objects where access patterns are unknown — AWS automatically moves to cheapest tier. Result: keep last 7 days of all screenshots ($0.023/GB), archive older ones, delete at 30 days.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you use AWS to test an application that must handle 10,000 concurrent users for a Black Friday simulation?' },
                a: { en: 'Use JMeter distributed on EC2: (1) Launch 1 Controller EC2 (t3.large) and 10 Worker EC2s (c5.2xlarge — compute optimized). (2) Each worker generates ~1,000 virtual users. (3) JMeter distributes the test plan to all workers. (4) Workers send results to the controller. (5) After the test, upload JMeter results to S3 and generate an HTML dashboard. Alternatively: use AWS Distributed Load Testing Solution (managed JMeter on ECS Fargate) — AWS provides a CloudFormation template. Cost for 1-hour test with 10 c5.2xlarge instances: ~$7. Far cheaper than managed services like BlazeMeter.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A developer accidentally deleted the S3 bucket containing 6 months of test reports. How do you prevent this in the future?' },
                a: { en: '(1) Enable S3 Versioning — deleted objects become "delete markers", recoverable. (2) Enable MFA Delete — requires MFA code to permanently delete versioned objects. (3) Apply S3 Object Lock (Compliance mode) — objects cannot be deleted for a specified retention period, even by root. (4) Use IAM deny policy: "Deny s3:DeleteBucket for all users except the bucket-admin role". (5) Enable S3 Replication to a second bucket in a different region as backup. (6) Enable AWS CloudTrail to log all S3 API calls — you can audit who deleted what and when.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Your Playwright tests run on GitHub Actions but you need to test against an internal staging server with no public IP. How do you solve this with AWS?' },
                a: { en: 'Options: (1) AWS Client VPN: connect GitHub Actions runner to your VPC via OpenVPN client — runner gets a VPC IP and can reach private resources. (2) Self-hosted GitHub Actions runner on EC2 in the same VPC — the runner is inside the VPC, no VPN needed. (3) AWS Systems Manager Session Manager port forwarding — open a tunnel from the GitHub runner to your private resource via SSM without exposing any ports. Option 2 (self-hosted EC2 runner) is most reliable for QA: configure once, spot instances keep cost low (~$0.03/hour for t3.small).' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you use AWS CloudFormation or Terraform to create a reproducible test environment?' },
                a: { en: 'Infrastructure as Code (IaC) ensures test environments are identical and disposable. With CloudFormation: write a YAML template defining EC2, Security Group, VPC, S3 bucket. "aws cloudformation deploy --stack-name qa-env --template-file qa-env.yml". Stack creates all resources. After tests: "aws cloudformation delete-stack --stack-name qa-env" removes everything. With Terraform: "terraform apply" creates, "terraform destroy" removes. Benefits: no manual steps, git-versioned infrastructure, any team member can recreate the exact same environment in one command. Store templates in the same repo as test code.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Explain how you would implement test environment tagging in AWS to track costs per project.' },
                a: { en: 'AWS resource tags are key-value pairs. Strategy: (1) Define mandatory tags: Project, Environment (qa/staging/prod), Team, Owner, CostCenter. (2) Enforce via AWS Config rule "required-tags" or Service Control Policy in AWS Organizations. (3) Tag all resources: EC2 --tag-specifications "ResourceType=instance,Tags=[{Key=Project,Value=checkout-tests}]". (4) In Cost Explorer: filter by tag to see "checkout-tests spent $X this month". (5) Set per-project budgets in AWS Budgets with tag-based filtering. (6) Use AWS Cost Allocation Tags — activate tags in Billing console to include them in cost reports.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How does AWS ECS differ from EC2 for running test containers, and when would you choose ECS?' },
                a: { en: 'EC2 is a virtual machine you manage (OS updates, Docker installation, disk management). ECS is a container orchestration service — you provide a Docker image and ECS runs it, handling scheduling, health checks, and scaling without you managing the underlying VM. For QA: choose ECS Fargate when you want "just run my test container — I don\'t care about the server", tests are containerized (Playwright or Selenium in Docker), and you want automatic scaling. Choose EC2 when you need a persistent environment (Selenium Grid that stays running), need specific instance types (GPU for mobile testing), or need to SSH in for debugging. ECS Fargate pricing: ~$0.04/vCPU/hour — often cheaper than equivalent EC2 for sporadic workloads.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Your team wants to use AWS Device Farm for mobile testing. What are its capabilities and limitations?' },
                a: { en: 'AWS Device Farm provides real physical iOS and Android devices in Amazon\'s labs. Capabilities: run Appium, XCUITest, Espresso, Calabash tests on real devices; capture screenshots, video, logs, and performance metrics automatically; test on hundreds of device/OS combinations; concurrent runs on multiple devices. Limitations: maximum test duration is 150 minutes per run; upload size limit 4GB; cannot install custom system software; network calls go through Amazon\'s network (may differ from production); $0.17/device/minute (expensive for long test suites). For QA: best for release validation on key devices, not for every commit.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you configure CodeBuild to run different test suites in parallel (e.g., API tests and UI tests simultaneously)?' },
                a: { en: 'Use CodeBuild Batch Builds with build matrix: (1) In buildspec.yml, define batch config with build-matrix: envvars listing TEST_SUITE=[api, ui, e2e]. (2) CodeBuild launches one build per matrix combination simultaneously. (3) Each build runs "npx playwright test --project=$TEST_SUITE". (4) All results upload to S3 with their suite name. (5) A final merge step (or Lambda) combines reports. Alternatively, trigger multiple CodeBuild projects from a Step Functions state machine with parallel states. Batch builds are simpler but have a limit of 100 concurrent builds per account.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A QA team member accidentally ran "aws ec2 terminate-instances" against the wrong account and deleted production servers. How do you prevent this?' },
                a: { en: '(1) Use separate AWS accounts for prod and QA — with AWS Organizations. Cross-account access requires explicit role assumption, making accidents harder. (2) Require MFA for destructive actions via IAM condition: "Condition: {BoolIfExists: {aws:MultiFactorAuthPresent: true}}". (3) Enable Termination Protection on critical EC2 instances — prevents termination without explicitly disabling protection first. (4) AWS Config with "ec2-instance-no-public-ip" and other rules can detect misconfigurations. (5) Use IAM Permission Boundaries to limit what QA IAM roles can do — even if credentials are shared, terminating prod instances is denied.' },
              },
              {
                level: 'intermediate',
                q: { en: 'How would you implement a nightly test pipeline that provisions infrastructure, runs tests, publishes results, and tears down everything — all automatically?' },
                a: { en: 'Use EventBridge + Step Functions + CodeBuild: (1) EventBridge cron triggers at 2am: rate(1 day) or cron(0 2 * * ? *). (2) Step Functions orchestrates: → State 1: Lambda runs Terraform/CloudFormation to create EC2, RDS, test environment. → State 2: CodeBuild runs the full test suite (~45 min). → State 3: Lambda uploads results to S3, sends SNS notification. → State 4: Lambda runs "terraform destroy" or "cloudformation delete-stack". (3) If any state fails, Step Functions catches the error and still runs State 4 (cleanup). Total cost for nightly run: ~$2-5 depending on test duration and instance types.' },
              },
              {
                level: 'intermediate',
                q: { en: 'What is the difference between AWS S3, EBS, and EFS, and which would you use for test artifacts?' },
                a: { en: 'S3 (Simple Storage Service): object storage, accessed via HTTP/CLI, unlimited capacity, $0.023/GB/month, globally accessible. EBS (Elastic Block Store): block storage attached to a single EC2 instance like a hard drive, fast random access, $0.08/GB/month, only accessible from that instance. EFS (Elastic File System): network file system, mounted by multiple EC2 instances simultaneously, $0.30/GB/month. For test artifacts: use S3 — it\'s cheapest, durable, accessible from anywhere, works with lifecycle policies, and integrates with every AWS service. Use EBS for the EC2 test runner\'s OS disk. Use EFS when multiple test nodes need to share the same test data files simultaneously.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Your test suite needs to connect to a third-party SaaS API. In production it hits the real API, in CI you want to mock it. How do you manage this with AWS?' },
                a: { en: 'Use API Gateway as a mock server: (1) Create an API Gateway REST API with mock integrations — return static JSON responses for each endpoint. (2) Deploy to a "mock" stage: https://abc123.execute-api.us-east-1.amazonaws.com/mock. (3) In CodeBuild environment variables, set THIRD_PARTY_URL to the mock URL for CI runs, real URL for prod. (4) API Gateway mock costs: $3.50 per million API calls — essentially free for CI usage. Alternative: use a Lambda function behind API Gateway that returns configurable responses, allowing you to simulate different scenarios (slow responses, errors, specific payloads).' },
              },
              {
                level: 'intermediate',
                q: { en: 'Explain how you would use AWS X-Ray to debug performance issues found during your load tests.' },
                a: { en: 'AWS X-Ray provides distributed tracing. During load tests, enable X-Ray on your application (add AWS X-Ray SDK): it traces each request end-to-end, showing which service/database call is slowest. In a JMeter test showing slow checkout response: (1) X-Ray Service Map shows all services in the request path. (2) X-Ray Trace Timeline shows each service\'s latency contribution — e.g., "database query takes 800ms of the 1000ms response time". (3) Filter traces by duration: "responsetime > 1" to find slow outliers. (4) X-Ray Insights automatically detects anomalies. This pinpoints the exact bottleneck rather than just knowing "checkout is slow".' },
              },

              // ── ADVANCED (15) ──────────────────────────────────────────────
              {
                level: 'advanced',
                q: { en: 'Design a complete CI/CD test architecture on AWS for a microservices application with 20 services, ensuring each service is tested in isolation and integration.' },
                a: { en: 'Architecture: (1) Per-service: CodePipeline triggers on each service\'s repo push. CodeBuild runs unit + API contract tests (using Pact/Spring Cloud Contract) in Docker. Results to S3. (2) Integration tests: Step Functions orchestrates ECS Fargate tasks — each task spins up the service under test plus its dependencies (mocked via LocalStack or real test instances). (3) E2E tests: nightly only (expensive). ECS Fargate runs Playwright against a full environment in a dedicated VPC. (4) Service mesh: App Mesh or AWS Service Connect for inter-service routing in test environments. (5) Observability: X-Ray across all services, CloudWatch Container Insights, Grafana dashboard. Key principle: each CodePipeline stage gates the next — integration tests only run if all unit tests pass.' },
              },
              {
                level: 'advanced',
                q: { en: 'Your organization needs to ensure no AWS resources are left running after test pipelines finish (cost governance). How do you implement this systematically?' },
                a: { en: '(1) AWS Config rule: detect EC2 instances tagged "Environment=qa" running longer than 4 hours → trigger SSM Automation to terminate. (2) Lambda "janitor" function on EventBridge schedule (every 30 min): list all resources with QA tags older than X hours, terminate. (3) AWS Budget Action: when QA account spend > $200/day, automatically apply a restrictive SCP (Service Control Policy) via Organizations that denies ec2:RunInstances — forces investigation. (4) Enforce stack-based resources via CloudFormation: all QA resources must be in a CFN stack; the pipeline always calls delete-stack in its finally step. (5) AWS Compute Optimizer reports for rightsizing. (6) Trusted Advisor checks for idle resources.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you build a chaos engineering pipeline on AWS to test your system\'s resilience as part of the QA process?' },
                a: { en: 'Use AWS Fault Injection Simulator (FIS): (1) Define experiment templates: EC2 instance termination (simulates AZ failure), API throttling via FIS NetworkDisruption (packet loss 30%), RDS failover trigger, Lambda concurrency limit injection. (2) Integrate with CodePipeline: after load tests pass, run chaos experiments while monitoring CloudWatch metrics and X-Ray traces. (3) Define steady-state hypothesis: response time < 500ms, error rate < 1%. If violated during chaos, pipeline fails and alerts. (4) Automated recovery testing: after FIS terminates an EC2 node, measure time-to-recovery via CloudWatch alarm state transitions. (5) Use SSM documents for application-level chaos (kill processes, fill disk). Log all experiments to S3 for audit.' },
              },
              {
                level: 'advanced',
                q: { en: 'You need to test a multi-region application where data must replicate between us-east-1 and eu-west-1 within 5 seconds. How do you build the test infrastructure?' },
                a: { en: '(1) Deploy test environment in both regions using CloudFormation StackSets (single template, multi-region deployment). (2) Use DynamoDB Global Tables or Aurora Global Database for cross-region data. (3) Test runner: Step Functions in us-east-1 writes data → starts a timer → Lambda in eu-west-1 polls for the data → asserts arrival within 5000ms. (4) Network: Route 53 latency-based routing for region-transparent endpoint. (5) CloudWatch cross-region dashboard to view replication lag metric. (6) EventBridge cross-region event bus for test coordination. The tricky part: Lambda cold starts can add 1-2s latency — use provisioned concurrency in the eu-west-1 Lambda to ensure consistent measurement.' },
              },
              {
                level: 'advanced',
                q: { en: 'A legacy test suite hardcodes "localhost" everywhere and cannot be changed. How do you run it in a distributed AWS environment?' },
                a: { en: '(1) Run each test file in its own EC2 instance or ECS task — "localhost" is valid inside its own container. Use ECS task networking (awsvpc mode) where each task has its own network namespace. (2) For services the test depends on: use Docker Compose within the ECS task — all services share localhost. (3) For external dependencies: use iptables NAT rules on the test instance to redirect "localhost:8080" to the real application IP. (4) AWS EC2 instance user-data script: on startup, write /etc/hosts entries mapping "localhost" aliases to real IPs. (5) Long-term: advocate for parameterized base URLs in the test config — this is the correct fix. Document the technical debt.' },
              },
              {
                level: 'advanced',
                q: { en: 'Design an AWS architecture for running mobile device farm tests that integrates with your CI/CD pipeline and provides video recordings and performance metrics.' },
                a: { en: 'Full architecture: (1) CodePipeline triggers on git push to main. (2) CodeBuild compiles the app (APK/IPA). (3) Lambda uploads APK + test package to AWS Device Farm. (4) Device Farm run: Appium tests on 5 real devices (Samsung Galaxy S21, Pixel 6, iPhone 13, etc.). (5) Device Farm generates: video recordings, device logs, performance data (CPU, memory, FPS), screenshots at each assertion. (6) Post-run Lambda: download Device Farm artifacts → upload to S3 with structured path (run-date/device-model/). (7) Athena query over S3 to track performance trends. (8) CloudWatch dashboard: test pass rate, avg performance by device model. (9) SNS alert if pass rate drops below 90%. Cost: ~$0.17/device/min × 10 min × 5 devices = ~$8.50/run.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you use AWS LocalStack for local development and testing of AWS-dependent code without incurring cloud costs?' },
                a: { en: 'LocalStack runs AWS services locally in Docker — S3, DynamoDB, SQS, Lambda, etc. fully emulated. Setup: docker run -d -p 4566:4566 localstack/localstack. Configure boto3: endpoint_url="http://localhost:4566". Use in pytest: (1) conftest.py starts LocalStack container via pytest-localstack or testcontainers-python. (2) Tests create real S3 buckets, DynamoDB tables locally. (3) After tests: cleanup is automatic (container destroyed). In CI: run LocalStack as a Docker service alongside CodeBuild. For QA pipelines: use LocalStack Pro for services like RDS, ElastiCache. Workflow: develop locally with LocalStack → push → CodeBuild runs against real AWS in test account → production uses prod account. LocalStack community is free; Pro ~$35/month for full service coverage.' },
              },
              {
                level: 'advanced',
                q: { en: 'Your test pipeline creates and destroys RDS instances frequently. Cold start time (10-15 minutes) is slowing down your pipeline. How do you solve this?' },
                a: { en: 'Multiple strategies: (1) Aurora Serverless v2: scales from 0 ACU, resumes in seconds vs minutes. Pause after test run, resume before next. (2) RDS Proxy: keep the DB running but use connection pooling — connection establishment is instant even if DB is warming up. (3) Pre-warm pattern: Lambda runs on EventBridge 5 minutes before scheduled test run to start RDS instance. (4) Database snapshot restore: Aurora fast clone from snapshot takes <30 seconds vs 15 minutes for traditional RDS restore. (5) For unit/API tests: use SQLite in-memory (zero startup). (6) Best architectural solution: containerize the test database with Docker (testcontainers) — startup in 5-10 seconds, identical schema. Reserve RDS for integration tests that must use the exact production database engine version.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you implement a blue-green deployment validation strategy where your test suite automatically validates the new (green) environment before traffic shifts?' },
                a: { en: '(1) Use CodeDeploy with blue-green deployment hook: BeforeAllowTraffic lifecycle event calls a Lambda function. (2) Lambda runs smoke tests against the green environment\'s internal URL (before it receives real traffic). (3) Lambda runs performance baseline: response time < 200ms for critical endpoints. (4) Lambda runs security checks: OWASP ZAP API scan against green. (5) If all pass: Lambda returns success → CodeDeploy shifts traffic. If fail: Lambda returns failure → CodeDeploy auto-rolls back to blue. (6) After full traffic shift: run regression suite against green via CodeBuild. (7) Keep blue running for 30 minutes as rollback target. This eliminates manual validation steps and ensures tests run before any real user is affected.' },
              },
              {
                level: 'advanced',
                q: { en: 'Your test infrastructure costs $8,000/month on AWS. Leadership asks you to cut it by 60% without reducing test coverage. What is your optimization plan?' },
                a: { en: 'Systematic approach: (1) EC2 Spot Instances for stateless test runners — 60-70% cheaper than on-demand. Playwright/Selenium tests are interruptible (just re-run). Configure Spot interruption handler to checkpoint test state. (2) Scheduled EC2: Selenium Grid runs only 8am-8pm weekdays via Auto Scaling Scheduled Actions. (3) S3 Lifecycle: delete test artifacts older than 30 days (check if anyone actually looks at month-old reports). (4) Right-sizing: use AWS Compute Optimizer to identify over-provisioned instances. (5) Reserved Instances for always-on components (Jenkins controller, RDS). 1-year RI = 40% saving. (6) Lambda for lightweight tests (API smoke tests) instead of EC2. Target: Spot (saves $3,200) + scheduling (saves $1,600) + lifecycle (saves $500) + rightsizing (saves $700) = ~$6,000 saved = 75% reduction.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you use AWS Security Hub and Inspector to integrate security testing into your QA pipeline?' },
                a: { en: '(1) AWS Inspector: automatically scans EC2 instances and container images for CVEs. Add "aws ecr start-image-scan" in CodeBuild after building your test Docker image. Fail the pipeline if Inspector finds CRITICAL vulnerabilities. (2) Security Hub: aggregates findings from Inspector, GuardDuty, Macie. Create a CodeBuild post-build step that calls "aws securityhub get-findings" and fails if new CRITICAL findings exist. (3) OWASP ZAP in ECS: run ZAP active scan against the staging environment as a test stage. Upload ZAP report to S3. (4) AWS Config: check infrastructure compliance (no publicly accessible S3, no security groups open to 0.0.0.0/0). (5) Integrate all findings into a unified QA dashboard in CloudWatch via custom metrics.' },
              },
              {
                level: 'advanced',
                q: { en: 'Explain how you would architect a test data management system on AWS that supports thousands of test scenarios with isolated, resettable data.' },
                a: { en: '(1) Seed data in S3 as JSON/SQL files, versioned and tagged. (2) DynamoDB for dynamic test state (fast reads, scalable). (3) Lambda-based test data API: POST /testdata/create → Lambda reads seed from S3, writes to test RDS → returns a testDataId. Tests use this ID as a namespace. (4) Aurora database with schema-per-tenant isolation: each test run gets its own schema (CREATE SCHEMA test_run_abc), dropped after. (5) EventBridge + SQS: test data cleanup events are queued and processed async, not blocking test completion. (6) Data masking: AWS Glue DataBrew or Macie to ensure PII from prod snapshots is masked before entering test data. (7) Versioning: Git-backed seed files with semantic versioning — test suite specifies which version of seed data it needs.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you detect and prevent test flakiness at scale when running 10,000 tests daily on AWS?' },
                a: { en: '(1) Track per-test metrics in DynamoDB: testName, runId, duration, status, attempt. (2) Lambda analyzes results: tests that fail then pass on retry = flaky candidates. (3) CloudWatch custom metric "FlakeyTestCount" — alarm if exceeds threshold. (4) Automatic quarantine: Step Functions marks a test as "quarantined" if it fails >3 times in 5 runs. Quarantined tests run in a separate CodeBuild job (doesn\'t block deployment). (5) Root cause analysis with X-Ray: correlate flakiness with specific EC2 instance types, time of day, or deployment versions. (6) Retry with exponential backoff at framework level (pytest-rerunfailures). (7) Slack notification with flakiness score per test and owner (from git blame). (8) Weekly flakiness report via Lambda → SES email → engineers must fix or delete quarantined tests.' },
              },
              {
                level: 'advanced',
                q: { en: 'How would you use AWS to implement contract testing between microservices in a way that blocks deployment when contracts are broken?' },
                a: { en: '(1) Consumer-driven contracts with Pact: consumers write contract tests, publish pacts to Pact Broker (self-hosted on ECS or pactflow.io). (2) Provider verification: provider\'s CodePipeline has a stage that verifies it satisfies all consumer contracts. (3) Integration with CodePipeline: add a "Contract Verification" stage between "Unit Test" and "Deploy to Staging". (4) Pact Broker webhook: when a consumer publishes a new pact → triggers provider\'s CodePipeline automatically. (5) Can I Deploy check: before promoting to staging, Lambda calls Pact Broker API to confirm all consumer/provider contract versions are compatible. If not: pipeline fails. (6) S3 stores pact files as artifacts. (7) CloudWatch alarm on contract verification failures → notifies both consumer and provider teams.' },
              },
              {
                level: 'advanced',
                q: { en: 'Your company requires all test environments to meet SOC 2 compliance. How do you configure AWS to ensure this for your QA infrastructure?' },
                a: { en: '(1) AWS CloudTrail enabled in all regions: records every API call — who did what, when. Store logs in S3 with CloudWatch Logs integration. (2) AWS Config: enable all managed rules (encrypted-volumes, restricted-ssh, s3-bucket-server-side-encryption-enabled). All non-compliant resources trigger SNS alerts. (3) IAM: enforce MFA for all users, password policy (min 14 chars, rotate 90 days), no root access keys. (4) VPC: all test resources in private subnets, no direct internet access — traffic routes through NAT Gateway. (5) Encryption: S3 buckets with AES-256 or KMS, EBS volumes encrypted, RDS encrypted at rest and in transit (SSL). (6) Macie: scans S3 for PII (ensures test data never contains real customer data). (7) GuardDuty: detects unusual API patterns (compromised credentials). (8) Document all controls in AWS Audit Manager — generates SOC 2 evidence automatically.' },
              },
            ],
          },
          awsLeastPrivilegeInterviewFilm,
          awsInterviewStep,
          awsInterviewPractice,
        ],
      },
    ],
  },

  tr: {
    hero: {
      title: '☁️ Amazon Web Services (AWS)',
      subtitle: 'QA Mühendisleri için Cloud Computing Platformu',
      intro: 'Modern QA iş akışlarında kullanılan AWS servislerini öğren — EC2\'de test ortamı kurmaktan S3\'te artifact saklamaya, CodePipeline ile CI/CD kurmaya kadar.',
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
        title: '🎯 AWS Nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: 'AWS, internet çağının JVM\'idir: Java uygulamanın hangi fiziksel makinede çalıştığını umursamadığı gibi — her yerde aynı şekilde çalışır — test altyapın da sunucunun hangi rafta durduğunu umursamaz. Ama her mühendisi tökezleten asıl soru şudur: ofisinizde zaten bir sunucu varken neden saatlik Amazon\'a ödeyesiniz? Çünkü fiziksel bir sunucu 3 dakika da çalışsa 3 ay da, aynı ücrete mal olur; hafta sonu boşta duran sunucu için de ödeme yapılır; arızalanan diski değiştirmek için bir insan gerekir. AWS ise gerçek kullanım başına saniye bazında faturalandırır, 90 saniyede 1\'den 1.000 instance\'a ölçeklenir ve arızalı donanımı sessizce değiştirir. Java analojisi: EC2, kiralık bir JVM process\'i gibidir — `RunInstances` çağırırsın, başlar; `TerminateInstances` çağırırsın, fatura durur. QA açısından sonuç somuttur: Cuma gecesi yapılan push\'u Pazartesi sabahına kadar test edemeyen ekip, hafta sonu CI ortamı olmadığı için production\'a bug gönderen ekiptir — AWS bu açığı çalışma başına birkaç kuruşa kapatır.',
          },
          {
            type: 'text',
            content: 'AWS (Amazon Web Services), dünyada en çok kullanılan cloud platformudur; küresel veri merkezlerinde 200\'den fazla servis sunar. QA mühendisleri için AWS şu anlama gelir: dakikalar içinde taze test ortamı, 100 paralel browser session, test raporlarını sonsuza kadar sakla ve bitince her şeyi sil.',
          },
          { type: 'heading', text: 'QA Mühendisleri Neden AWS\'e İhtiyaç Duyar?' },
          {
            type: 'grid', cols: 3,
            items: [
              { icon: '⚡', label: 'Anında Ortam', desc: 'Chrome + Selenium Grid kurulu taze bir Linux sunucusu 2 dakikadan kısa sürede hazır. IT ticket yok, bekleme yok.' },
              { icon: '🔀', label: 'Paralel Çalıştırma', desc: 'EC2\'de aynı anda 50 browser session çalıştır — 2 saatlik test suite\'ini 5 dakikaya indir.' },
              { icon: '💰', label: 'Kullandıkça Öde', desc: 't3.medium saatte ~$0.04. 2 saat test = $0.08. Aylık sunucu faturası yok.' },
              { icon: '📦', label: 'Artifact Saklama', desc: 'S3 test raporlarını, screenshot\'ları, videoları neredeyse sıfır maliyetle sonsuza kadar saklar.' },
              { icon: '🔁', label: 'CI/CD Entegrasyonu', desc: 'CodePipeline her git push\'ta test suite\'ini tetikler. Sonuçlar CloudWatch\'a gider.' },
              { icon: '🌍', label: 'Multi-region Test', desc: 'Uygulamanı ABD, AB ve Asya\'dan eş zamanlı test et; gecikme sorunlarını yakala.' },
            ],
          },
          { type: 'heading', text: 'AWS vs Geleneksel Altyapı' },
          {
            type: 'table',
            headers: ['Kriter', 'Geleneksel Sunucu', 'AWS Cloud'],
            rows: [
              ['Kurulum süresi', '2-4 hafta (satın alma)', '2 dakika (konsol tıklaması)'],
              ['Maliyet modeli', 'Sabit aylık (boş dururken de öde)', 'Saniye/saat bazında kullandıkça öde'],
              ['Ölçekleme', 'Manuel, yavaş, pahalı', 'Saniyeler içinde otomatik scaling'],
              ['Bakım', 'Ekibin OS günceller', 'AWS donanımı yönetir'],
              ['Test izolasyonu', 'Paylaşılan sunucu, çakışma', 'Her çalışmada taze instance'],
              ['Global erişim', 'Tek veri merkezi', '31 bölge dünya genelinde'],
            ],
          },
          { type: 'heading', text: 'QA için Temel AWS Servisleri' },
          {
            type: 'list', icon: '▸',
            items: [
              { label: 'EC2 (Elastic Compute Cloud)', desc: ' — sanal makineler. Selenium Grid, test uygulaması veya herhangi bir sunucu iş yükü çalıştır.' },
              { label: 'S3 (Simple Storage Service)', desc: ' — nesne depolama. Test artifact\'larını, Allure raporlarını, screenshot\'ları, logları sakla.' },
              { label: 'IAM (Identity & Access Management)', desc: ' — kullanıcılar, roller, izinler. AWS\'te kimin ne yapabileceğini kontrol eder.' },
              { label: 'VPC (Virtual Private Cloud)', desc: ' — özel ağ. Test ortamını internetten izole et.' },
              { label: 'CodePipeline / CodeBuild', desc: ' — CI/CD. Her commit\'te build ve test.' },
              { label: 'CloudWatch', desc: ' — izleme ve loglama. Test runner loglarını görüntüle, hata alarmları kur.' },
              { label: 'RDS (Relational Database Service)', desc: ' — yönetilen PostgreSQL/MySQL. Dakikalar içinde test veritabanı oluştur.' },
              { label: 'ECS / Lambda', desc: ' — container\'lar ve serverless. Sunucu yönetmeden Playwright testlerini container\'larda çalıştır.' },
            ],
          },
          { type: 'tip', content: 'AWS Free Tier 12 ay boyunca aylık 750 saat t2.micro EC2 veriyor. Selenium Grid\'i ücretsiz kurabilirsin.' },
          awsPayPerSecondFilm,
          awsWhyQaFilmStep,
          awsWhyQaFilmPractice,
          {
            type: 'quiz',
            question: 'Bir QA mühendisi her CI çalışmasında üretilen Allure HTML raporlarını ve screenshot\'ları saklayıp URL ile erişilebilir yapmak istiyor. Hangi AWS servisi buna uygun?',
            options: [
              { id: 'a', text: 'EC2' },
              { id: 'b', text: 'S3' },
              { id: 'c', text: 'IAM' },
              { id: 'd', text: 'RDS' },
            ],
            correct: 'b',
            explanation: 'S3 (Simple Storage Service) tam olarak bunun için tasarlanmış nesne depolamadır: dosyaları (rapor, screenshot, log, video) sakla ve isteğe bağlı olarak public veya imzalı bir URL üzerinden HTTP ile sun. EC2 sanal makine çalıştırmak içindir, IAM izinleri yönetir, RDS ise yönetilen ilişkisel veritabanıdır — hiçbiri statik rapor artifact\'ı saklamak için tasarlanmamıştır.',
            retryQuestion: {
              question: 'Bir S3 bucket\'ına sadece CI pipeline\'ının yeni rapor yazabilmesini, QA mühendislerinin ise sadece okuyabilmesini istiyorsun. Bunun için doğru araç hangisidir?',
              options: [
                { id: 'a', text: 'Bucket\'ı tamamen public yapıp herkesin okuyup yazabilmesini sağlamak' },
                { id: 'b', text: 'CI rolüne s3:PutObject, mühendislere ise sadece s3:GetObject veren bir IAM policy' },
                { id: 'c', text: 'Bucket adını periyodik olarak değiştirmek' },
                { id: 'd', text: 'Raporları EC2 instance belleğinde saklamak' },
              ],
              correct: 'b',
              explanation: 'IAM policy\'leri belirli bir role veya kullanıcıya aksiyon bazında ince taneli izinler verir (yazma için s3:PutObject, okuma için s3:GetObject). Yazma yetkili policy\'yi sadece CI rolüne, salt-okunur policy\'yi mühendislere bağlamak en az yetki (least privilege) ilkesini uygular — tamamen public bir bucket internetteki herkesin raporları okumasına hatta üzerine yazmasına izin verir.',
            },
          },
        ],
      },

      // ── 1. KURULUM ────────────────────────────────────────────────────────────
      {
        title: '⚙️ AWS CLI Kurulumu',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🖥️',
            content: 'AWS CLI, Maven komutunun IntelliJ GUI\'sine olan ilişkisi gibidir — ikisi de aynı sonuca ulaşır, ama biri sabah 2\'de script içinde gözetimsiz çalışabilir. Şunu düşün: AWS Console yeterli olsaydı, neden her CI/CD pipeline CLI kullanır? Çünkü bir pipeline sadece bir script\'tir ve script\'lerin çıkış kodu döndüren, çıktısını pipe\'layabilen, "Onayla" düğmesine tıklamak için insan beklemeyen komutlara ihtiyacı vardır. Java analojisi: Console, `java -jar` komutunu sarmalayan kullanıcı dostu bir GUI gibidir; CLI ise `ProcessBuilder` ile Java sınıfını doğrudan çağırmak gibi — aynı JVM, tam programatik kontrol. QA mühendisi için pratik sonuç nettir: test çalışmasından sonra 200 Selenium screenshot\'ını S3\'e yükleyen bir pipeline, tek bir `aws s3 sync` komutuna ihtiyaç duyar; bu komut pipeline script\'inde yoksa CI agent sıfırlandığında screenshot\'lar kaybolur ve bir daha erişilemez.',
          },
          { type: 'heading', text: 'Adım 1 — AWS Hesabı Oluştur' },
          {
            type: 'list', icon: '①',
            items: [
              'aws.amazon.com → "Create an AWS Account" tıkla',
              'E-posta, şifre, hesap adı gir',
              'Kredi kartı ekle (Free Tier 12 ay boyunca maliyeti $0\'da tutar)',
              'Telefon doğrula → "Basic Support" seç (ücretsiz)',
              'Aktivasyon e-postası için ~1 dakika bekle',
            ],
          },
          { type: 'tip', content: 'Hesap oluşturduktan hemen sonra root hesabında MFA (Multi-Factor Authentication) etkinleştir. IAM → Security credentials → MFA aktivasyon.' },
          { type: 'heading', text: 'Adım 2 — AWS CLI Kur' },
          {
            type: 'code', language: 'bash',
            code: `# Windows — winget
winget install Amazon.AWSCLI

# macOS — Homebrew
brew install awscli

# Linux (Ubuntu/Debian)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Kurulumu doğrula
aws --version
# Beklenen çıktı: aws-cli/2.x.x Python/3.x.x ...`,
          },
          awsCliInstallStep,
          { type: 'heading', text: 'Adım 3 — IAM User & Access Key Oluştur' },
          {
            type: 'list', icon: '🔑',
            items: [
              'AWS Console → IAM → Users → Create user',
              'Kullanıcı adı: my-qa-user → "Programmatic access" seç',
              'Policy ekle: AdministratorAccess (öğrenme için; prod\'da least-privilege kullan)',
              'Access Key ID ve Secret Access Key\'li .csv dosyasını indir',
              '⚠️ Secret Access Key\'i yalnızca bir kez görürsün — hemen kaydet',
            ],
          },
          { type: 'heading', text: 'Adım 4 — AWS CLI Yapılandır' },
          {
            type: 'code', language: 'bash',
            code: `aws configure

# Sorular:
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: eu-west-1
Default output format [None]: json

# Yapılandırmayı doğrula
aws sts get-caller-identity`,
          },
          awsConfigureStep,
          {
            type: 'code', language: 'json',
            code: `// "aws sts get-caller-identity" beklenen çıktısı:
{
    "UserId": "AIDAIOSFODNN7EXAMPLE",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/my-qa-user"
}`,
          },
          { type: 'heading', text: 'Adım 5 — S3 ile Test Et' },
          {
            type: 'code', language: 'bash',
            code: `# Test bucket oluştur (bucket adları global olarak benzersiz olmalı)
aws s3 mb s3://my-qa-test-bucket-$(date +%s)

# Dosya yükle
echo "Merhaba AWS" > test.txt
aws s3 cp test.txt s3://my-qa-test-bucket-<timestamp>/

# Bucket içeriğini listele
aws s3 ls s3://my-qa-test-bucket-<timestamp>/

# Bitince bucket'ı sil
aws s3 rb s3://my-qa-test-bucket-<timestamp>/ --force`,
          },
          awsS3TestStep,
          awsCliScriptedFilm,
          {
            type: 'quiz',
            question: 'IAM user oluşturup Access Key ID ve Secret Access Key\'in olduğu .csv\'yi indirdikten sonra sekmeyi kaydetmeden kapatırsan ne olur?',
            options: [
              { id: 'a', text: 'IAM\'e geri gidip aynı secret\'ı tekrar görebilirsin' },
              { id: 'b', text: 'Secret Access Key bir daha asla görüntülenemez — yeni bir access key çifti oluşturman gerekir' },
              { id: 'c', text: 'AWS destek hattını arayıp kurtarabilirsin' },
              { id: 'd', text: 'Otomatik olarak e-postana gönderilir' },
            ],
            correct: 'b',
            explanation: 'AWS, Secret Access Key\'i bilinçli olarak SADECE oluşturulduğu anda bir kere gösterir (sunucu tarafında düz metin olarak hiç saklanmaz, sadece hash\'i tutulur). Kaybedersen tek çözüm IAM → Users → Security credentials → Create access key ile yepyeni bir çift oluşturmak ve eskisini devre dışı bırakmak/silmektir — bu, bir parola hash\'inin sistem tarafından asla yeniden gösterilememesiyle aynı güvenlik prensibidir.',
            retryQuestion: {
              question: 'Bir takım arkadaşın yanlışlıkla canlı bir AWS Access Key ID ve Secret\'ı public bir Slack kanalına yapıştırdı. Doğru ilk tepki nedir?',
              options: [
                { id: 'a', text: 'Slack mesajını silmesini istemek — bu sızıntıyı ortadan kaldırır' },
                { id: 'b', text: 'O access key çiftini hemen IAM\'de devre dışı bırakmak/silmek ve yeni bir çift oluşturmak' },
                { id: 'c', text: 'Kötüye kullanılıp kullanılmadığını bekleyip görmek' },
                { id: 'd', text: 'IAM kullanıcısını yeniden adlandırmak' },
              ],
              correct: 'b',
              explanation: 'Bir credential ifşa olduktan sonra mesajı silmek ifşayı geri almaz — silinmeden önce gören herkes tarafından zaten cache\'lenmiş, loglanmış veya kopyalanmış olabilir. Tek güvenli tepki, IAM\'de ifşa olan access key\'i hemen iptal etmek (devre dışı bırakmak/silmek) ve yeni bir çift oluşturmaktır — sızan bir parolayı kimsenin kullanmadığını ummak yerine hemen rotate etmekle aynı olay müdahale prensibi.',
            },
          },
        ],
      },

      // ── 2. GERÇEK HAYAT ───────────────────────────────────────────────────────
      {
        title: '🛠️ Gerçek Hayat — AWS\'te QA',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏗️',
            content: 'Gerçek dünya AWS QA\'sı komut öğrenmekten ibaret değildir — altyapının tek kullanımlık olduğu bir iş akışı tasarlamakla ilgilidir. Bir e-ticaret ekibinin Black Friday hazırlığını düşün: yük testi için 4 saat çalışacak 20 EC2 instance gerekiyor. Dedicated donanımda bu 20 sunucu aylık $3.000\'e mal olur ve testten 27 gün önce boşta bekler. Ama neden tek kullanımlık altyapıya güvenmek zordur? Çünkü Java geliştiricileri sunucuları kalıcı durum olarak görmeye alışkındır — SSH ile bağlanır, JDK kurar, JVM flag\'lerini ayarlar ve bu işi bir daha yapmak istemez. AWS tam tersini zorlar: her instance bir script\'ten yeniden oluşturulabilir olmalıdır, yoksa zamanla bozulan bir ortama dönüşür. Java analojisi: EC2 instance\'ları JUnit test yaşam döngüsü gibidir — `@BeforeAll` instance\'ı kurar, `@AfterAll` sonlandırır, test gövdesi arada çalışır. Gerçek bir QA olayında, testin çalıştığı ortamı tam olarak yeniden üretemeyen ekip "hata gerçek miydi yoksa ortam mı flakeydi?" sorusunu cevaplayamaz — etiketlenmiş, script\'lenmiş AWS ortamları bu soruyu otomatik olarak yanıtlar.',
          },
          { type: 'heading', text: 'Senaryo: EC2\'de Selenium Grid' },
          {
            type: 'code', language: 'bash',
            code: `# 1. EC2 instance başlat (Hub)
aws ec2 run-instances \\
  --image-id ami-0c02fb55956c7d316 \\
  --instance-type t3.medium \\
  --key-name my-qa-key \\
  --security-group-ids sg-0abc123 \\
  --count 1 \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=selenium-hub}]'

# 2. Public IP'yi al
aws ec2 describe-instances \\
  --filters "Name=tag:Name,Values=selenium-hub" \\
  --query 'Reservations[0].Instances[0].PublicIpAddress' \\
  --output text`,
          },
          awsEc2LaunchStep,
          {
            type: 'code', language: 'bash',
            code: `# EC2 instance üzerinde Docker + Selenium Grid kur
sudo yum install -y docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user

# Selenium Hub başlat
docker run -d -p 4442-4444:4442-4444 --name selenium-hub selenium/hub:4.18.1

# Node instance'larda (hub'a bağlan)
docker run -d \\
  -e SE_EVENT_BUS_HOST=<HUB_PRIVATE_IP> \\
  -e SE_EVENT_BUS_PUBLISH_PORT=4442 \\
  -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \\
  selenium/node-chrome:4.18.1`,
          },
          { type: 'heading', text: 'Senaryo: Test Raporlarını S3\'te Sakla' },
          {
            type: 'code', language: 'bash',
            code: `# Test çalışmasından sonra Allure raporunu S3'e yükle
aws s3 sync ./allure-report/ s3://my-qa-reports/run-$(date +%Y%m%d-%H%M)/

# Statik website hosting aç
aws s3 website s3://my-qa-reports/ \\
  --index-document index.html \\
  --error-document error.html

# Ekiple paylaş
echo "Rapor: https://my-qa-reports.s3-website-us-east-1.amazonaws.com/run-$(date +%Y%m%d-%H%M)/"`,
          },
          awsS3SyncReportStep,
          { type: 'heading', text: 'Senaryo: CodeBuild ile CI/CD' },
          {
            type: 'code', language: 'yaml',
            code: `# buildspec.yml — CodeBuild her git push'ta Playwright testlerini çalıştırır
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - npm ci
      - npx playwright install --with-deps chromium
  build:
    commands:
      - npx playwright test --reporter=html
  post_build:
    commands:
      - aws s3 sync playwright-report/ s3://my-qa-reports/latest/
      - echo "Rapor S3'e yüklendi"`,
          },
          {
            type: 'simulation',
            icon: '☁️',
            color: '#ec7211',
            title: { en: 'AWS CodePipeline — CI/CD in Action', tr: 'AWS CodePipeline — CI/CD Canlı Akış' },
            scenario: 'aws-codepipeline',
            description: {
              en: 'Click "▶ git push": watch CodePipeline pick up the commit, run CodeBuild through install → test → upload, and stream live logs to CloudWatch while the report lands in S3.',
              tr: '"▶ git push" butonuna bas: CodePipeline\'ın commit\'i yakalayıp CodeBuild ile install → test → upload adımlarını çalıştırdığını ve CloudWatch\'a canlı log akıttığını, raporun S3\'e düştüğünü izle.',
            },
            code: `# buildspec.yml — her git push'ta tetiklenir
version: 0.2
phases:
  install:
    commands: [npm ci, npx playwright install --with-deps chromium]
  build:
    commands: [npx playwright test --reporter=html]
  post_build:
    commands: [aws s3 sync playwright-report/ s3://my-qa-reports/latest/]`,
          },
          { type: 'heading', text: 'QA için AWS vs Alternatifler' },
          {
            type: 'table',
            headers: ['Özellik', 'AWS', 'Azure', 'GCP', 'On-Premise'],
            rows: [
              ['Pazar payı', '%32 ✅', '%22', '%11', '—'],
              ['Free tier', '12 ay ✅', '12 ay ✅', '90 gün', '❌'],
              ['Selenium desteği', 'EC2 + ECS ✅', 'VM + AKS', 'GCE + GKE', 'Manuel'],
              ['Native CI/CD', 'CodePipeline ✅', 'Azure DevOps ✅', 'Cloud Build', 'Jenkins'],
              ['Test raporları', 'S3 + CloudWatch', 'Blob Storage', 'GCS', 'NFS share'],
              ['İş ilanları', '🔴 En fazla', '🟡 Çok', '🟢 Büyüyor', '—'],
            ],
          },
          { type: 'tip', content: 'QA mühendisleri için AWS bilgisi en yüksek talep gören cloud yetkinliğidir. Cloud içeren iş ilanlarının %60\'ından fazlası AWS belirtiyor.' },
          awsSeleniumEc2S3Film,
          {
            type: 'quiz',
            question: 'Bir QA ekibi Black Friday için yük testi yapacak: 20 EC2 instance\'ı 4 saatliğine başlatıp sonra kapatacaklar. Bu, 3 ay için özel sunucu kiralamaktan neden bu kadar ucuz?',
            options: [
              { id: 'a', text: 'EC2 instance\'ları QA iş yükleri için her zaman ücretsizdir' },
              { id: 'b', text: 'AWS, gerçek kullanım süresi kadar (saniye/saat bazında) faturalandırır, yani sadece çalıştığı 4 saat ödenir' },
              { id: 'c', text: 'AWS satış dönemlerinde sınırsız ücretsiz işlem gücü verir' },
              { id: 'd', text: 'EC2 instance\'ları daha yavaş olduğu için daha ucuzdur' },
            ],
            correct: 'b',
            explanation: 'Geleneksel özel sunucular kullanımdan bağımsız sabit aylık ücretle faturalandırılır — 3 ay için kiralanan bir sunucu 3 dakika ya da 3 ay kullanılsa da aynı tutarı öder. EC2 saniye/saat bazında faturalandırır, yani 20 instance\'ı tam 4 saatliğine başlatıp sonlandırmak sadece o 4 saatlik işlem gücüne mal olur — taksiyle araç sahibi olmak arasındaki kullandıkça öde mantığıyla aynı.',
            retryQuestion: {
              question: '4 saatlik yük testi bittikten sonra ekip 20 EC2 instance\'ını sonlandırmayı unutuyor ve bir hafta boyunca çalışır durumda kalıyorlar. Faturaya ne olur?',
              options: [
                { id: 'a', text: 'Hiçbir şey — AWS boşta kalan instance\'ları otomatik ve ücretsiz durdurur' },
                { id: 'b', text: 'Ekip, hiçbir test çalışmasa da instance\'ların çalıştığı her saat için faturalandırılır' },
                { id: 'c', text: 'AWS sadece bir test tarafından gerçekten kullanılan işlem gücünü faturalandırır, boşta kalan süreyi değil' },
                { id: 'd', text: 'Instance\'lar test bitince kendiliğinden duraklar' },
              ],
              correct: 'b',
              explanation: 'EC2 faturalandırması, instance\'ın "running" durumunda olmasına dayanır, aktif olarak faydalı bir iş yapıp yapmadığına değil — boşta kalan bir instance her saat işlem gücü ücreti biriktirmeye devam eder. "İş bitince cluster\'ı sonlandır" yük testi runbook\'larında standart bir adım olmasının tam nedeni budur: kullandıkça öde sadece işin bittiğinde gerçekten ödemeyi durdurursan para tasarrufu sağlar.',
            },
          },
        ],
      },

      // ── 3. EKOSİSTEM ─────────────────────────────────────────────────────────
      {
        title: '🔗 AWS Ekosistemi',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧩',
            content: 'AWS servisleri, bir Java projesinin standart kütüphane paketleri gibidir: `HashMap`\'i sıfırdan yazmazsın — `java.util.HashMap`\'i import edersin. Benzer şekilde, dosya sunucusunu sıfırdan inşa etmezsin — S3 API\'sini çağırırsın. Ama buradaki asıl soru şudur: bu servisler neden birbiriyle konuşmak zorundadır? Neden tek bir servis her şeyi yapamaz? Yapamaz — ve bunun nedeni `java.io`\'nun `java.net`\'ten ayrı tutulmasıyla aynıdır: her servis tam olarak tek bir iş için optimize edilmiştir ve güç bunları birbirine bağlamaktan gelir. Java analojisi: EC2 çalışan bir `Thread`\'dir, S3 kalıcı bir `ObjectOutputStream`\'dir, IAM bir `SecurityManager`\'dır, CodePipeline ise bir `CompletableFuture` zinciridir — her biri bağımsız, her biri değiştirilebilir. Ekosistem düşüncesi olmayan bir QA pipeline\'ında, geliştirici laptopunda geçen ama CI\'da başarısız olan Selenium testi neredeyse her zaman eksik bir bağlantıdan kaynaklanır: test runner\'ı doğru S3 bucket\'ına ulaşamıyor, IAM rolünün rapor yazma izni yok, ya da CloudWatch hiç hata logu almadı — ve production bug ortaya çıkana dek kimse testin başarısız olduğunu bilmiyor.',
          },
          { type: 'heading', text: 'QA İçin AWS Servis Haritası' },
          {
            type: 'list', icon: '▸',
            items: [
              { label: 'EC2', desc: ' — Selenium Grid, test app server, Jenkins agent için sanal makine.' },
              { label: 'S3', desc: ' — HTML raporlar, screenshot, video, test data CSV saklamak için nesne depolama.' },
              { label: 'CodeBuild', desc: ' — Her commit\'te test suite çalıştıran managed build servisi.' },
              { label: 'CodePipeline', desc: ' — Build → Test → Deploy aşamalarını otomatikleştiren CI/CD orkestratörü.' },
              { label: 'CloudWatch', desc: ' — Test çalışma logları, hata alarmları, dashboard.' },
              { label: 'RDS', desc: ' — Test veritabanı için managed PostgreSQL/MySQL/Aurora.' },
              { label: 'Lambda', desc: ' — Zamanlanmış smoke test, health check, artifact merger için serverless fonksiyonlar.' },
              { label: 'ECS Fargate', desc: ' — Sunucu yönetmeden Docker container\'da Playwright/Selenium çalıştır.' },
              { label: 'Device Farm', desc: ' — Gerçek fiziksel iOS/Android cihazlarda Appium testi.' },
              { label: 'Secrets Manager', desc: ' — DB şifreleri ve API key\'leri güvenli saklama.' },
            ],
          },
          { type: 'heading', text: 'AWS + CI/CD Araçları Entegrasyonu' },
          {
            type: 'table',
            headers: ['Araç', 'Entegrasyon', 'Kullanım Senaryosu'],
            rows: [
              ['Jenkins', 'EC2 plugin, IAM role', 'Jenkins agent\'ları EC2 spot instance\'larda çalışır'],
              ['GitHub Actions', 'configure-aws-credentials action', 'Push\'ta S3\'e deploy / test çalıştır'],
              ['GitLab CI', 'Docker runner\'da AWS CLI', 'S3\'e artifact yükle'],
              ['Terraform', 'AWS provider', 'Test ortamları için Infrastructure as Code'],
              ['Ansible', 'AWS modules (boto3)', 'EC2 instance\'ları otomatik yapılandır'],
            ],
          },
          { type: 'tip', content: 'AWS Device Farm gerçek fiziksel iOS ve Android cihazlarda Appium testleri çalıştırmanı sağlar — Amazon\'un laboratuvarlarında. Cihaz lab yönetimi yok, emülatör yok.' },
          awsQaEcosystemMapFilm,
          awsEcosystemTrStep,
          awsEcosystemTrPractice,
          {
            type: 'quiz',
            question: 'Playwright testlerini sunucu yönetmeden, talep üzerine Docker container\'larında çalıştırmak istiyorsun. Hangi AWS servisi buna en uygun?',
            options: [
              { id: 'a', text: 'EC2' },
              { id: 'b', text: 'ECS Fargate' },
              { id: 'c', text: 'RDS' },
              { id: 'd', text: 'IAM' },
            ],
            correct: 'b',
            explanation: 'ECS Fargate, altında çalışan EC2 instance\'larını sen provision etmeden/yönetmeden container çalıştırır — sadece container\'ı (image, CPU/bellek) tanımlarsın, AWS çalıştırır. EC2 işletim sistemini ve yamaları senin yönetmeni gerektirir, RDS yönetilen bir veritabanıdır, IAM ise sadece izinleri yönetir. Bu, container\'ın çalıştığı laptop\'ın sahipliğini başka birine devretmenin cloud karşılığıdır.',
            retryQuestion: {
              question: 'Bir güvenlik ekibi her container işletim sisteminin bir CVE yayınından 24 saat içinde, patch sürecinin tamamen kendi kontrollerinde yamanmasını şart koşuyor. Bu durumda EC2 (kendi yönetimin) neden Fargate\'e tercih edilebilir?',
              options: [
                { id: 'a', text: 'Fargate Docker container çalıştıramaz' },
                { id: 'b', text: 'Fargate altındaki işletim sistemini senin için yönetir, bu yüzden kendi özel acil yamanı kendi zaman çizelgende uygulayamazsın — EC2 tam OS seviyesi kontrol verir' },
                { id: 'c', text: 'EC2 kendini otomatik olarak yamar, Fargate yapmaz' },
                { id: 'd', text: 'Fargate her senaryoda daha pahalıdır' },
              ],
              correct: 'b',
              explanation: 'Fargate\'in tüm değer önerisi, host işletim sistemini AWS\'nin senin için yönetmesidir — bu yüzden ona kendi zaman çizelgende özel bir acil yama uygulayamazsın. EC2 bu rahatlığı tam kontrolle takas eder: işletim sistemine sen sahipsin, bu yüzden yamanın tam olarak ne zaman ve nasıl yapılacağına sen karar verirsin — sıkı uyumluluk/SLA yama gereksinimleri olan ekipler için bu önemlidir.',
            },
          },
        ],
      },

      // ── 4. YAYGIN HATALAR ─────────────────────────────────────────────────────
      {
        title: '🚨 Yaygın AWS Hataları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔧',
            content: 'AWS hataları neredeyse her zaman üç temel nedenden birinden kaynaklanır — ve kalıbı tanımak saatlerce debug süresinden kurtarır. Java\'nın exception hiyerarşisi gibi düşün: `AccessDeniedException`, IAM izninin eksik olmasına karşılık gelir (security manager hayır dedi); `NoSuchElementException`, yanlış region veya yazım hatasına karşılık gelir (beklediğin nesne baktığın scope\'ta yok); `OutOfMemoryError`, kota aşımına karşılık gelir (JVM\'in heap\'i, hesap limitidir). Ama bu hatalar ilk geldiğinde neden bu kadar şifreli görünür? Çünkü AWS API hata mesajları, ağ/API katmanında neyin kırıldığını anlatır — niyetinin neden başarısız olduğunu değil. Bu, bir `NullPointerException` stack trace\'inin satır numarasını söylemesi ama hangi upstream çağrısının null döndürdüğünü söylememesiyle tamamen aynıdır. AWS hatasını yanlış okumanın QA maliyeti gerçektir: `s3:PutObject` adımında sessizce `AccessDenied` ile başarısız olan bir pipeline rapor bucket\'ına hiçbir şey yüklemez, test suite çalışmış gibi görünür ama hiç artifact üretmez — ve ekip 3 gün sonra fark eder ki 72 saatlik CI sonuçları yok olmuştur, testler başarısız olduğu için değil, kimse hata logunu okumadığı için.',
          },
          {
            type: 'error-dictionary',
              relatedTopicId: 'aws-errors-tr',
            framework: 'AWS',
            errors: [
              {
                error: 'UnauthorizedOperation / AccessDenied',
                fullMessage: 'An error occurred (UnauthorizedOperation) when calling the RunInstances operation: You are not authorized to perform this operation.',
                cause: { tr: 'IAM kullanıcısı veya rolünün gerekli izni yok. Kullanıcıya bağlı policy\'de "ec2:RunInstances" action\'ı eksik.' },
                solution: { tr: 'IAM → Users → kullanıcın → Add permissions. EC2 işlemleri için "AmazonEC2FullAccess" ekle ya da custom policy\'e belirli action\'ı ekle. CI/CD\'de CodeBuild/Lambda\'ya bağlı IAM rolünü kontrol et.' },
              },
              {
                error: 'NoCredentialsError',
                fullMessage: 'botocore.exceptions.NoCredentialsError: Unable to locate credentials',
                cause: { tr: 'AWS CLI veya SDK credential bulamıyor. "aws configure" hiç çalıştırılmamış, ya da credential süresi dolmuş, ya da AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY environment variable\'ları set edilmemiş.' },
                solution: { tr: '"aws configure" çalıştır ve Access Key ID ile Secret gir. Lambda/EC2/ECS\'de access key yerine IAM Role kullan — SDK otomatik olarak instance metadata üzerinden rolü alır. Hardcoded key güvenlik riskidir.' },
              },
              {
                error: 'BucketAlreadyExists',
                fullMessage: 'An error occurred (BucketAlreadyExists) when calling the CreateBucket operation: The requested bucket name is not available.',
                cause: { tr: 'S3 bucket adları TÜM AWS hesaplarında dünya genelinde benzersiz olmak zorunda. Başka biri (başka bir hesaptaki sen de olabilir) bu bucket adını zaten almış.' },
                solution: { tr: 'Benzersiz bir ad seç: AWS hesap ID\'ni veya timestamp ekle. Örnek: "qa-reports-123456789012" veya "qa-reports-1718000000". "test-bucket" gibi genel adlar kesinlikle kullanma.' },
              },
              {
                error: 'InvalidAMIID.NotFound',
                fullMessage: 'An error occurred (InvalidAMIID.NotFound): The image id \'ami-0c02fb55956c7d316\' does not exist',
                cause: { tr: 'AMI ID\'leri region\'a özgüdür. us-east-1\'de var olan bir AMI, eu-west-1\'de bulunmaz. Farklı region hedefleyen bir tutorial\'dan AMI ID kopyalanmış.' },
                solution: { tr: 'Kendi region\'ın için doğru AMI\'yi bul: AWS Console → EC2 → AMIs → "Amazon Linux 2" ara; ya da CLI: "aws ec2 describe-images --owners amazon --filters Name=name,Values=amzn2-ami-hvm-*" komutunu hedef region\'ında çalıştır.' },
              },
              {
                error: 'InstanceLimitExceeded',
                fullMessage: 'An error occurred (InstanceLimitExceeded): You have requested more instances than your current instance limit of 5 allows.',
                cause: { tr: 'Yeni AWS hesapları için region başına varsayılan EC2 instance limiti 5\'tir. Bu, kontrolden çıkan script\'lerden kaynaklanan beklenmedik faturaları önlemek için güvenlik kotasıdır.' },
                solution: { tr: 'Limit artışı talep et: Service Quotas → Amazon EC2 → "Running On-Demand Standard Instances" → Request increase. Test için spot instance kullan veya paralel çalışmayı azalt. Makul artışlar genellikle dakikalar içinde onaylanır.' },
              },
              {
                error: 'S3 403 Forbidden (public bucket)',
                fullMessage: 'AccessDenied when accessing s3://bucket/file.html via browser',
                cause: { tr: '2023\'ten itibaren S3 Block Public Access varsayılan olarak etkin. Object ACL\'ini "public-read" olarak ayarlasan bile bucket seviyesindeki Block Public Access tüm genel istekleri reddeder.' },
                solution: { tr: 'S3 → bucket → Permissions → Block public access → Edit → 4 seçeneği de kaldır → Kaydet. Ardından s3:GetObject için Principal "*" olan bucket policy ekle. Dahili raporlar için public bucket yerine pre-signed URL kullan.' },
              },
              {
                error: 'RequestExpired / Signature mismatch',
                fullMessage: 'An error occurred (RequestExpired): Request has expired. Signature date: 20240115T120000Z, server date: 20240115T130500Z',
                cause: { tr: 'AWS SigV4 request signature\'ları 15 dakika sonra sona erer. Sistem saatin 5 dakikadan fazla yanlışsa tüm AWS API çağrıları bu hatayla başarısız olur.' },
                solution: { tr: 'Sistem saatini senkronize et. Windows: w32tm /resync, Linux: sudo timedatectl set-ntp true veya sudo ntpdate pool.ntp.org. Docker container\'larda: container\'ı yeniden başlat — host\'tan zaman senkronizasyonu yenilenir.' },
              },
              {
                error: 'Security Group bağlantıyı engelliyor',
                fullMessage: 'ssh: connect to host 54.x.x.x port 22: Connection timed out',
                cause: { tr: 'EC2 Security Group\'unda (güvenlik duvarı) senin IP\'nden gelen SSH (port 22) bağlantısına izin veren inbound kuralı yok. Varsayılan olarak tüm gelen trafik engellenir.' },
                solution: { tr: 'EC2 → Security Groups → security-grubun → Inbound rules → Add rule: Type=SSH, Source=My IP. Selenium Grid için port 4444\'ü de ekle. Güvenlik için Source\'u "Anywhere (0.0.0.0/0)" yerine her zaman "My IP" olarak seç.' },
              },
              {
                error: 'ThrottlingException / Rate exceeded',
                fullMessage: 'An error occurred (ThrottlingException): Rate exceeded. Retry in 1 second.',
                cause: { tr: 'AWS API\'nin servis başına hesap başına rate limiti var. EC2 DescribeInstances\'ı döngü içinde çağırmak veya binlerce S3 nesnesini paralel yüklemek throttling\'e neden olur.' },
                solution: { tr: 'Retry mantığına exponential backoff + jitter ekle. AWS SDK\'da yerleşik retry var (max_attempts ayarla). S3 toplu yükleme için tek tek "aws s3 cp" yerine "aws s3 sync" kullan — throttling\'i otomatik yönetir.' },
              },
            ],
          },
          awsAccessDeniedDiagnosisFilm,
          awsAccessDeniedStep,
          awsAccessDeniedPractice,
          {
            type: 'quiz',
            question: 'boto3 kullanan bir otomasyon scripti "botocore.exceptions.NoCredentialsError: Unable to locate credentials" hatasıyla başarısız oluyor. En olası neden nedir?',
            options: [
              { id: 'a', text: 'EC2 instance\'ı yanlış region\'da' },
              { id: 'b', text: '"aws configure" hiç çalıştırılmamış veya AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY set edilmemiş' },
              { id: 'c', text: 'S3 bucket adı zaten alınmış' },
              { id: 'd', text: 'API rate limiti aşıldı' },
            ],
            correct: 'b',
            explanation: 'AWS SDK (boto3 vb.) credential\'ları belirli bir sırada arar: environment variable\'lar, ~/.aws/credentials dosyası ("aws configure" ile yazılır) veya bağlı bir IAM Role. Bunlardan hiçbiri yoksa veya süresi dolmuşsa kimlik doğrulayamaz ve NoCredentialsError fırlatır. EC2/Lambda/ECS\'de önerilen çözüm hardcoded key yerine bağlı bir IAM Role kullanmaktır — SDK bunu instance metadata üzerinden otomatik alır.',
            retryQuestion: {
              question: 'Bir Lambda fonksiyonunun S3\'ten okuma yapması gerekiyor. Fonksiyon kodunda bir Access Key/Secret hardcode etmek yerine credential vermenin önerilen yolu nedir?',
              options: [
                { id: 'a', text: 'Key\'leri doğrudan Lambda kaynak koduna hardcode etmek' },
                { id: 'b', text: 'Lambda fonksiyonuna S3 okuma izinli bir IAM execution role bağlamak' },
                { id: 'c', text: 'Credential\'ları runtime\'da fonksiyona e-posta ile göndermek' },
                { id: 'd', text: 'Key\'leri fonksiyonun çekebileceği public bir S3 bucket\'ında saklamak' },
              ],
              correct: 'b',
              explanation: 'Lambda fonksiyonuna bağlı bir IAM execution role, runtime\'da otomatik olarak üstlenilir — SDK geçici credential\'ları instance metadata üzerinden alır, hiçbir key kodda, environment variable\'da veya log\'da görünmez. Kaynak koddaki hardcoded key\'ler bir sızıntı bekliyor demektir (repo erişimi olan herkes görebilir, yanlışlıkla commit edilmesi kolaydır) ve role-tabanlı geçici credential\'lardan farklı olarak kendiliğinden hiç süresi dolmaz.',
            },
          },
        ],
      },

      // ── 5. MÜLAKAT SORULARI ───────────────────────────────────────────────────
      {
        title: '💼 AWS Mülakat Soruları',
        blocks: [
          {
            type: 'interview-questions',
              relatedTopicId: 'aws-interview-tr',
            topic: 'AWS',
            questions: [
              // ── TEMEL (15) ─────────────────────────────────────────────────
              {
                level: 'basic',
                q: { tr: 'Ekibinin Selenium testleri çalıştırmak için taze bir Linux sunucuya ihtiyacı var. AWS\'te 5 dakikanın altında nasıl hazır edersin?' },
                a: { tr: 'EC2 → Launch Instance → Amazon Linux 2 AMI seç → t3.medium seç → Security Group\'ta SSH (port 22) ve Selenium Grid (port 4444) için inbound kural ekle → key pair ekle → Launch. CLI ile: "aws ec2 run-instances --image-id ami-xxx --instance-type t3.medium --key-name my-key". Instance yaklaşık 90 saniyede hazır. SSH ile bağlan, Docker yükle, selenium/hub imajını çek — 5 dakikanın altında.' },
              },
              {
                level: 'basic',
                q: { tr: 'Playwright test çalışmasının ardından HTML raporunu ekibinle paylaşmak istiyorsun. Web sunucusu kurmadan AWS\'te nasıl host edersin?' },
                a: { tr: 'S3 Static Website Hosting kullan: bucket oluştur, playwright-report/ klasörünü "aws s3 sync" ile yükle, bucket üzerinde static website hosting aç (bucket.s3-website-us-east-1.amazonaws.com gibi URL oluşturur), Block Public Access ayarlarını düzenle. Rapor anında URL üzerinden erişilebilir — sunucu yok, bakım yok, aylık birkaç kuruş maliyet.' },
              },
              {
                level: 'basic',
                q: { tr: 'IAM nedir ve bir QA mühendisi neden bunu önemsemelidir?' },
                a: { tr: 'IAM (Identity & Access Management), AWS\'teki izin sistemidir. AWS\'teki her işlem (EC2 başlatma, S3 okuma vb.) bir IAM iznine ihtiyaç duyar. QA mühendisleri için önemli çünkü: (1) CI/CD pipeline\'larının S3\'e yüklemek veya ECS görevi tetiklemek için doğru izinlere sahip IAM rollerine ihtiyacı var, (2) test script\'lerinde hardcoded access key saklamak güvenlik riskidir — bunun yerine IAM role kullan, (3) çok geniş policy\'ler kazara resource silinmesine yol açabilir. IAM\'i her AWS servisine girişten önce rozeti kontrol eden güvenlik görevlisi gibi düşün.' },
              },
              {
                level: 'basic',
                q: { tr: 'EC2 instance ve Lambda function arasındaki fark nedir? QA için hangisini ne zaman seçersin?' },
                a: { tr: 'EC2 tam bir sanal makine — OS\'u sen yönetirsin, 7/24 (ya da istediğin kadar) çalışır, saatlik ödeme yaparsın. Lambda ise yalnızca tetiklendiğinde çalışan bir fonksiyon, 15 dakikaya kadar yürütülür ve çağrı başına ödeme yaparsın (genellikle Free Tier\'a dahil). QA için: uzun süre çalışan Selenium Grid, test app server veya Jenkins agent için EC2 kullan. Health check, API smoke test, hafif tetikleyici ve zamanlanmış test çalıştırma (EventBridge cron ile) için Lambda kullan.' },
              },
              {
                level: 'basic',
                q: { tr: 'S3 bucket nedir ve hangi test artifact\'larını orada saklarsın?' },
                a: { tr: 'S3 bucket, ölçeklenebilir bir nesne depolama kapsayıcısıdır — sınırsız dosya tutabilen, son derece düşük maliyetli bir internet klasörü gibi ($0.023/GB/ay). QA mühendisleri şunları saklar: Allure/Playwright HTML raporlar, hata screenshot\'ları ve videoları, test çalışmalarından log dosyaları, test verisi CSV/JSON dosyaları, Cucumber JSON sonuçları, Postman environment dosyaları. S3 son derece dayanıklıdır (%99.999999999 — "11 dokuz") — test geçmişini hiç kaybetmezsin.' },
              },
              {
                level: 'basic',
                q: { tr: 'AWS Region nedir ve test açısından neden önemlidir?' },
                a: { tr: 'Region, AWS\'in veri merkezleri işlettiği fiziksel coğrafi konumdur (örn. us-east-1 = Kuzey Virginia, eu-west-1 = İrlanda). QA için önemlidir çünkü: (1) test ortamın gecikmeyi minimize etmek için uygulama sunucunla aynı region\'da olmalı, (2) AMI ID\'leri, VPC\'ler ve Security Group\'lar region\'a özgüdür — us-east-1\'deki AMI eu-west-1\'de kullanılamaz, (3) global bir uygulamayı test ediyorsan, uluslararası kullanıcılar için gecikme sorunlarını yakalamak amacıyla birden fazla region\'dan test çalıştır.' },
              },
              {
                level: 'basic',
                q: { tr: 'Testlerin bittiğinde EC2 instance için ödemeyi nasıl durdurursun?' },
                a: { tr: 'Instance\'ı STOP etmen veya TERMINATE etmen gerekir. STOP, diski (EBS volume) korur — depolama için aylık ~$0.10/GB ödersin ama hesaplama için ödemezsin. TERMINATE her şeyi kalıcı olarak siler — hiçbir şey ödemezsin. QA test makineleri için: her çalışmanın ardından terminate et (CLI\'da --instance-ids kullan). Yaygın hata: instance\'ı "durduruyorsun" ama EBS volume\'ın maliyet oluşturmaya devam ettiğini unutuyorsun.' },
              },
              {
                level: 'basic',
                q: { tr: 'AWS CLI nedir ve QA otomasyonu için web konsolundan neden daha iyidir?' },
                a: { tr: 'AWS CLI, AWS\'i web konsolu yerine terminal komutlarıyla kontrol etmeni sağlayan bir araçtır. QA otomasyonu için zorunludur çünkü: (1) shell script\'leri ve CI/CD pipeline\'ları AWS CLI komutlarını çağırabilir, (2) işlemler tekrarlanabilir ve script\'lenebilirdir — "aws s3 sync" tek komuttur, konsolda tıklamak 10 adımdır, (3) zaten test pipeline\'ını süren bash/PowerShell script\'leriyle entegre olur, (4) konsol insan gerektirir; CLI CI/CD\'de gözetimsiz çalışır.' },
              },
              {
                level: 'basic',
                q: { tr: 'AWS\'te Security Group nedir ve Selenium Grid için nasıl yapılandırırsın?' },
                a: { tr: 'Security Group, EC2 instance\'larına gelen ve giden trafiği kontrol eden sanal bir güvenlik duvarıdır. Selenium Grid hub için şu inbound kurallara ihtiyacın var: yönetim için kendi IP\'nden port 22 (SSH), test runner IP\'sinden port 4444 (Selenium Grid hub API), görsel debug için isteğe bağlı port 7900 (noVNC). Node\'lar için: yalnızca hub\'a (port 4442/4443) ulaşmaları gerekir. Kaynak IP\'lerini her zaman kısıtla — prod ortamlarda port 22 için asla 0.0.0.0/0 kullanma.' },
              },
              {
                level: 'basic',
                q: { tr: 'AWS faturan beklenmedik şekilde yüksek geldi. İlk kontrol ettiğin 3 şey nedir?' },
                a: { tr: '(1) Billing Dashboard → Cost Explorer: en pahalı servisi görmek için servise göre filtrele. (2) EC2 konsolu: terminate etmeyi unuttuğun çalışan instance\'ları kontrol et — en yaygın neden budur. (3) S3: tüm bucket\'lardaki toplam depolama alanını kontrol et — eski test raporları birikir. Ayrıca kontrol et: NAT Gateway ($0.045/saat, boşta bile), çalışan instance\'a bağlı olmayan Elastic IP ($0.005/saat), çalışır durumdaki RDS instance\'ları. Harcama $10\'u aştığında e-posta almak için AWS Budgets uyarısı kur.' },
              },
              {
                level: 'basic',
                q: { tr: 'AWS Free Tier nedir ve bir QA mühendisi bununla neler yapabilir?' },
                a: { tr: 'AWS Free Tier yeni hesaplara 12 ay boyunca ücretsiz resource verir: aylık 750 saat t2.micro EC2 (her zaman açık bir makine veya ~25 günlük test çalışması için yeterli), 5GB S3 depolama, aylık 1 milyon Lambda çağrısı, 750 saat RDS db.t2.micro. QA için: t2.micro\'da küçük Selenium Grid çalıştır, tüm test raporlarını S3\'e ücretsiz sakla, Lambda health check\'lerini ücretsiz tetikle, test veritabanını RDS\'de ücretsiz host et. 12 ay sonra kullandıkça öde fiyatları geçerli olur ama küçük QA iş yükleri nadiren aylık $5\'ı aşar.' },
              },
              {
                level: 'basic',
                q: { tr: 'AWS CLI kullanarak S3\'e dosya nasıl yüklersin? Pratik bir örnek ver.' },
                a: { tr: '"aws s3 cp ./report.html s3://my-bucket/reports/2024-01-15/report.html" tek bir dosyayı kopyalar. "aws s3 sync ./playwright-report/ s3://my-bucket/latest/" tüm bir dizini senkronize eder, yalnızca değişen dosyaları yükler (rsync gibi). "aws s3 ls s3://my-bucket/" içeriği listeler. Sync komutu test raporları için tercih edilir çünkü sonraki yüklemelerde değişmeyen dosyaları atlar. Eski dosyaları S3\'ten de kaldırmak için "--delete" ekle.' },
              },
              {
                level: 'basic',
                q: { tr: 'AMI (Amazon Machine Image) nedir ve QA ortam tutarlılığı için neden önemlidir?' },
                a: { tr: 'AMI, bir EC2 instance\'ının snapshot\'ıdır — OS, yüklü yazılım ve yapılandırma. Altın şablon olarak düşün. Test ortamını yapılandırdıktan sonra (Java, Chrome, Selenium, framework\'ün) bir AMI oluşturuyorsun, ardından bu AMI\'den 10 node başlatıyorsun — her biri aynı, önceden yapılandırılmış ve test için hazır. Bu "bende çalışıyor" sorununu çözer: her test node\'u tam olarak aynı ortama sahip. Custom AMI\'ler S3\'te saklanır ve oluşturulması 5-10 dakika sürer.' },
              },
              {
                level: 'basic',
                q: { tr: 'Bir geliştirici senden AWS\'te host edilen staging ortamına karşı test çalıştırmanı istiyor. Test makinenin oraya ulaşabilmesini nasıl sağlarsın?' },
                a: { tr: 'Önce staging ortamının VPC\'de (özel) olup olmadığını kontrol et. Public IP/DNS\'i varsa: test yapılandırmani public URL\'ye yönlendir — security group\'lar gelen HTTP\'ye izin veriyorsa hemen çalışır. Staging özel (public IP\'siz) ise: test runner\'ının aynı VPC\'de olması veya VPC peering/VPN gerekir. DevOps ekibine sor: "Staging URL\'si nedir?" ve "Public mı yoksa VPC dahili mi erişilebilir?" Hiçbir şeyi varsayma — tam suite çalıştırmadan önce curl/wget ile bağlantıyı her zaman doğrula.' },
              },
              {
                level: 'basic',
                q: { tr: 'CloudWatch nedir ve test pipeline\'ını izlemek için nasıl kullanırsın?' },
                a: { tr: 'CloudWatch, AWS\'in izleme ve gözlemlenebilirlik servisidir. QA pipeline\'ları için: (1) CodeBuild ve Lambda logları otomatik olarak CloudWatch\'a gider — sunuculara SSH atmadan test çalışma çıktısını orada görüntüle, (2) Lambda health check başarısız olduğunda SNS e-posta/SMS ile bildirim gönderen CloudWatch Alarm kur, (3) Zaman içinde test geçme oranını gösteren özel metriklerle CloudWatch Dashboard oluştur, (4) Tüm çalışmalardaki hataları bulmak için CloudWatch Logs Insights kullan: "fields @timestamp, @message | filter @message like /FAILED/".' },
              },

              // ── ORTA SEVİYE (20) ───────────────────────────────────────────
              {
                level: 'intermediate',
                q: { tr: '200 Playwright testiniz sıralı çalışınca 40 dakika sürüyor. 5 dakikanın altında çalıştırmak için AWS mimarisi nasıl tasarlarsın?' },
                a: { tr: 'ECS Fargate + test sharding kullan: (1) 200 testi 20\'şer gruptan 10\'a böl. (2) AWS Step Functions veya CodeBuild batch build ile 10 Fargate görevini paralel başlat, her biri 20 test çalıştırsın. (3) Her görev sonuçlarını S3\'e yüklesin. (4) Son Lambda tüm sonuçları birleştirip kombine rapor oluştursun. Maliyet: 10 x Fargate görevi x 5 dk ≈ $0.02. Alternatif: CodeBuild batch builds ile buildspec matrix — daha kolay yapılandırma, aynı paralellik.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'EC2\'de çalışan Selenium testlerin yerel ortamda geçiyor ama CI\'da "Chrome not found" ile başarısız oluyor. AWS\'te nasıl debug edersin?' },
                a: { tr: '(1) EC2 instance\'ına SSH ile bağlan ve "google-chrome --version" çalıştır — bulunamazsa Chrome kurulu değildir. (2) CloudWatch\'ta CodeBuild loglarını kontrol et: npm install / apt-get install adımlarına bak. (3) EC2\'ye manuel Chrome kurmak yerine önceden hazır Docker imajı (selenium/standalone-chrome) kullan — bu tür hataları ortadan kaldırır. (4) EC2 AMI kullanıyorsan Chrome\'u AMI\'ye göm: çalışma zamanında değil, AMI oluşturulurken kur. Kök neden: CI\'da kullanılan AMI Chrome içermiyor; çözüm Chrome kurulu Docker imajı kullanmak.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Her saat smoke testlerini çalıştıran ve hata durumunda ekibi uyaran zamanlanmış bir test çalışması nasıl kurarsın?' },
                a: { tr: 'EventBridge (cron) + Lambda/CodeBuild kullan: (1) EventBridge kuralı oluştur: schedule expression "rate(1 hour)". (2) Hedef: Lambda fonksiyonu veya CodeBuild projesi. (3) Lambda, AWS SDK ile hafif smoke testi çalıştırır (HTTP istekleri). (4) Hata durumunda Lambda, QA ekibi e-posta abonelikleriyle SNS topic\'ine publish eder. (5) CloudWatch Logs çıktıyı yakalar. Browser testleri için EventBridge\'den CodeBuild projesini tetikle. Maliyet: neredeyse sıfır (Lambda Free Tier aylık 1 milyon çağrıyı kapsar).' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Ekibiniz test credential\'larını (DB şifresi, API key\'ler) git\'e commit edilen config dosyalarında saklıyor. AWS servisleriyle bunu nasıl düzeltirsin?' },
                a: { tr: 'AWS Secrets Manager veya Parameter Store kullan: (1) Her sırrı sakla: "aws secretsmanager create-secret --name qa/db-password --secret-string sifrem". (2) Python testlerinde: import boto3; client.get_secret_value(SecretId="qa/db-password"). (3) CodeBuild\'de: "{{resolve:secretsmanager:qa/db-password}}" olarak environment variable referansla. (4) CI rolüne "secretsmanager:GetSecretValue" izni ver. Faydalar: kod içinde sır yok, rotasyon otomatik, CloudTrail\'de denetim izi. Parameter Store ücretsizdir (Secrets Manager $0.40/sır/ay).' },
              },
              {
                level: 'intermediate',
                q: { tr: 'API testlerinin her test çalıştırmasından önce temiz duruma sıfırlanması gereken bir veritabanına karşı çalışması gerekiyor. AWS\'te bunu nasıl mimari olarak tasarlarsın?' },
                a: { tr: 'RDS otomatik snapshot veya Aurora Serverless kullan: (1) Seed sonrası alınmış "temiz durum" snapshot\'ıyla bir RDS veritabanı oluştur. (2) Her test çalışmasından önce: snapshot\'ı yeni bir RDS instance\'ına geri yükle (Aurora fast clone saniyeler sürer). (3) Taze instance\'a karşı testleri çalıştır. (4) İşlem bitince instance\'ı sil. Alternatif: tüm tabloları truncate eden ve yeniden seed yapan stored procedure (daha hızlı ama test suite\'leri arasında veri sızma riski). Aurora Serverless v2 en iyisi — boşta sıfıra ölçeklenir, saatte ~$0.06 maliyet.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'CodeBuild\'de çalışan CI/CD pipeline için IAM role ve access key arasındaki farkı açıkla.' },
                a: { tr: 'IAM role, AWS servislerinde access key\'e her zaman tercih edilir. CodeBuild için: "CodeBuildQARole" gibi bir Service Role oluştur (s3:PutObject, ecr:GetAuthorizationToken, secretsmanager:GetSecretValue gibi izinlerle). Bu rolü CodeBuild projesine ata — key gerekmez, AWS geçici credential\'ları instance metadata üzerinden otomatik olarak enjekte eder. GitHub Actions için: configure-aws-credentials action ile OIDC kullan — GitHub herhangi bir uzun vadeli key saklamadan kısa ömürlü token alır. Access key yalnızca IAM role\'ün mümkün olmadığı durumlarda kullanılmalıdır (yerel geliştirme, üçüncü taraf araçlar).' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Test suite\'in her çalışmadan sonra S3\'e 500MB screenshot yüklüyor. S3 maliyetleri artıyor. Nasıl azaltırsın?' },
                a: { tr: 'S3 Lifecycle Policy kullan: (1) S3 → bucket → Management → Lifecycle rules. (2) Kural oluştur: 7 günden eski nesneleri S3-IA\'ya (Infrequent Access, %40 daha ucuz) geçir, 30 günden eski nesneleri sil. (3) Yalnızca başarısız test screenshot\'ları için: test kodunda "status=failed" etiketiyle işaretle, ardından yalnızca etiketli nesneleri tutan lifecycle kuralı oluştur. (4) Erişim kalıpları bilinmeyenler için S3 Intelligent Tiering — AWS otomatik olarak en ucuz katmana taşır. Sonuç: son 7 günün tüm screenshot\'larını tut ($0.023/GB), eskilerini arşivle, 30 günde sil.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Black Friday simülasyonu için 10.000 eş zamanlı kullanıcıyı kaldırabilmesi gereken bir uygulamayı AWS\'te nasıl test edersin?' },
                a: { tr: 'EC2\'de dağıtık JMeter kullan: (1) 1 Controller EC2 (t3.large) ve 10 Worker EC2 (c5.2xlarge — hesaplama optimizeli) başlat. (2) Her worker ~1.000 sanal kullanıcı üretir. (3) JMeter test planını tüm worker\'lara dağıtır. (4) Worker\'lar sonuçları controller\'a gönderir. (5) Test sonrası JMeter sonuçlarını S3\'e yükle ve HTML dashboard oluştur. Alternatif: AWS Distributed Load Testing Solution (ECS Fargate\'de managed JMeter). 1 saatlik test maliyeti 10 c5.2xlarge ile: ~$7. BlazeMeter gibi yönetilen servislerden çok daha ucuz.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Bir geliştirici 6 aylık test raporlarını içeren S3 bucket\'ı yanlışlıkla sildi. Bunu gelecekte nasıl önlersin?' },
                a: { tr: '(1) S3 Versioning etkinleştir — silinen nesneler "delete marker" olur, kurtarılabilir. (2) MFA Delete etkinleştir — versiyonlanmış nesneleri kalıcı silmek için MFA kodu gerekir. (3) S3 Object Lock (Compliance modu) uygula — belirtilen saklama süresi boyunca root dahil hiç kimse silemez. (4) IAM deny policy kullan: "bucket-admin rolü dışında herkese s3:DeleteBucket işlemini reddet". (5) Yedek olarak farklı region\'daki ikinci bucket\'a S3 Replication etkinleştir. (6) AWS CloudTrail etkinleştir — tüm S3 API çağrılarını loglar, kimin ne zaman ne sildiğini denetleyebilirsin.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Playwright testlerin GitHub Actions\'da çalışıyor ama public IP\'si olmayan dahili staging sunucusuna test yapmak istiyorsun. AWS ile nasıl çözersin?' },
                a: { tr: 'Seçenekler: (1) AWS Client VPN: GitHub Actions runner\'ı VPN ile VPC\'ye bağla — runner bir VPC IP\'si alır ve özel resource\'lara ulaşabilir. (2) Aynı VPC\'deki EC2\'de self-hosted GitHub Actions runner — runner VPC içinde, VPN gerekmez. (3) AWS Systems Manager Session Manager port forwarding — herhangi bir port açmadan GitHub runner\'dan özel resource\'a SSM üzerinden tünel aç. 2. seçenek (self-hosted EC2 runner) QA için en güveniliridir: bir kez yapılandır, spot instance maliyet düşük tutar (~$0.03/saat t3.small için).' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Tekrarlanabilir test ortamı oluşturmak için CloudFormation veya Terraform\'u nasıl kullanırsın?' },
                a: { tr: 'Infrastructure as Code (IaC) test ortamlarının aynı ve tek kullanımlık olmasını sağlar. CloudFormation ile: EC2, Security Group, VPC, S3 bucket tanımlayan bir YAML şablonu yaz. "aws cloudformation deploy --stack-name qa-env --template-file qa-env.yml". Stack tüm resource\'ları oluşturur. Testlerden sonra: "aws cloudformation delete-stack --stack-name qa-env" her şeyi kaldırır. Terraform ile: "terraform apply" oluşturur, "terraform destroy" kaldırır. Faydalar: manuel adım yok, altyapı git\'e versiyonlandı, herhangi bir ekip üyesi tek komutla aynı ortamı yeniden oluşturabilir.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'AWS\'te proje başına maliyetleri takip etmek için resource etiketleme stratejisi nasıl uygularsın?' },
                a: { tr: 'AWS resource tag\'leri anahtar-değer çiftleridir. Strateji: (1) Zorunlu tag\'ler tanımla: Project, Environment (qa/staging/prod), Team, Owner, CostCenter. (2) AWS Config kuralı "required-tags" veya Service Control Policy ile zorla. (3) Tüm resource\'ları etiketle: EC2 --tag-specifications "ResourceType=instance,Tags=[{Key=Project,Value=checkout-tests}]". (4) Cost Explorer\'da tag\'e göre filtrele: "checkout-tests bu ay $X harcadı". (5) Tag tabanlı filtrelemeyle proje başına AWS Budgets kur. (6) AWS Cost Allocation Tags etkinleştir — faturalandırma raporlarına dahil.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Test container\'ı çalıştırmak için ECS ile EC2 arasındaki fark nedir ve ne zaman ECS seçersin?' },
                a: { tr: 'EC2, yönettiğin bir sanal makine (OS güncellemeleri, Docker kurulumu, disk yönetimi). ECS, container orkestrasyon servisi — Docker imajı sağlarsın, ECS altta yatan VM\'i yönetmeni gerekmeden çalıştırır, zamanlamayı, health check\'leri ve scaling\'i yönetir. QA için ECS Fargate seç: "test container\'ımı çalıştır, sunucuyla ilgilenmiyorum" istiyorsan, testler containerize edilmişse (Docker\'da Playwright veya Selenium), otomatik scaling istiyorsan. EC2 seç: kalıcı ortam gerekiyorsa (çalışır durumdaki Selenium Grid), belirli instance tipleri gerekiyorsa veya debug için SSH gerekiyorsa.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'AWS Device Farm\'ın mobil test için yetenekleri ve sınırlamaları nelerdir?' },
                a: { tr: 'AWS Device Farm, Amazon\'un laboratuvarlarında gerçek fiziksel iOS ve Android cihazlar sağlar. Yetenekler: gerçek cihazlarda Appium, XCUITest, Espresso testleri çalıştır; screenshot, video, log ve performance metriklerini otomatik yakala; yüzlerce cihaz/OS kombinasyonunda test et. Sınırlamalar: çalışma başına maksimum 150 dakika test süresi; 4GB yükleme limiti; özel sistem yazılımı kurulamaz; ağ çağrıları Amazon\'un ağından geçer; $0.17/cihaz/dakika (uzun test suite\'leri için pahalı). QA için en uygun: her commit değil, release doğrulaması için kilit cihazlarda kullan.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'CodeBuild\'i farklı test suite\'lerini paralel çalıştıracak şekilde nasıl yapılandırırsın (örn. API ve UI testleri eş zamanlı)?' },
                a: { tr: 'CodeBuild Batch Builds ve build matrix kullan: (1) buildspec.yml\'de TEST_SUITE=[api, ui, e2e] listeleyen batch yapılandırması ve build-matrix tanımla. (2) CodeBuild her matrix kombinasyonu için eş zamanlı bir build başlatır. (3) Her build "npx playwright test --project=$TEST_SUITE" çalıştırır. (4) Tüm sonuçlar suite adıyla S3\'e yüklenir. (5) Son merge adımı (veya Lambda) raporları birleştirir. Alternatif: parallel state\'li Step Functions state machine\'dan birden fazla CodeBuild projesini tetikle. Batch builds daha basit ama hesap başına 100 eş zamanlı build limiti var.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Bir QA ekip üyesi yanlışlıkla "aws ec2 terminate-instances" komutunu yanlış hesaba karşı çalıştırdı ve prod sunucuları sildi. Bunu nasıl önlersin?' },
                a: { tr: '(1) Prod ve QA için ayrı AWS hesapları kullan — AWS Organizations ile. Cross-account erişim açık rol üstlenimi gerektirir, kazaları zorlaştırır. (2) Yıkıcı işlemler için MFA gerektir: IAM koşuluyla "Condition: {BoolIfExists: {aws:MultiFactorAuthPresent: true}}". (3) Kritik EC2 instance\'larında Termination Protection etkinleştir — korumayı açıkça devre dışı bırakmadan terminate edilemez. (4) QA IAM rollerini Permission Boundary ile sınırla — credential\'lar paylaşılsa bile prod instance terminate etmek reddedilir.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Altyapı oluşturan, testleri çalıştıran, sonuçları yayımlayan ve her şeyi kaldıran otomatik bir gece pipeline\'ı nasıl uygularsın?' },
                a: { tr: 'EventBridge + Step Functions + CodeBuild: (1) EventBridge cron sabah 2\'de tetikler. (2) Step Functions orkestre eder: → Durum 1: Lambda EC2, RDS, test ortamı oluşturur. → Durum 2: CodeBuild tam test suite çalıştırır (~45 dk). → Durum 3: Lambda sonuçları S3\'e yükler, SNS bildirimi gönderir. → Durum 4: Lambda "terraform destroy" veya "cloudformation delete-stack" çalıştırır. (3) Herhangi bir durum başarısız olursa Step Functions hatayı yakalar ve yine de Durum 4\'ü çalıştırır (temizlik). Gecelık çalışma toplam maliyeti: test süresine ve instance tiplerine göre ~$2-5.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'AWS S3, EBS ve EFS arasındaki fark nedir? Test artifact\'ları için hangisini seçersin?' },
                a: { tr: 'S3: nesne depolama, HTTP/CLI üzerinden erişilir, sınırsız kapasite, $0.023/GB/ay, global erişilebilir. EBS: tek bir EC2 instance\'ına bağlanan blok depolama — sabit disk gibi, hızlı random erişim, $0.08/GB/ay, yalnızca o instance\'tan erişilebilir. EFS: ağ dosya sistemi, birden fazla EC2 instance tarafından eş zamanlı mount edilebilir, $0.30/GB/ay. Test artifact\'ları için: S3 kullan — en ucuzu, dayanıklı, her yerden erişilebilir, lifecycle policy\'lerle çalışır, her AWS servisiyle entegre olur. Test runner EC2\'sinin OS diski için EBS kullan. Birden fazla test node\'unun aynı test verisi dosyalarını paylaşması gerektiğinde EFS kullan.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Test suite\'inin üçüncü taraf SaaS API\'sine bağlanması gerekiyor. Prod gerçek API\'yi kullanırken CI\'da mock kullanmak istiyorsun. AWS ile bunu nasıl yönetirsin?' },
                a: { tr: 'API Gateway\'i mock sunucu olarak kullan: (1) Mock entegrasyonlarla API Gateway REST API oluştur — her endpoint için statik JSON yanıtı döndür. (2) "mock" stage\'e deploy et. (3) CodeBuild environment variable\'larında CI çalışmaları için THIRD_PARTY_URL\'yi mock URL\'ye, prod için gerçek URL\'ye ayarla. (4) API Gateway mock maliyeti: milyonda $3.50 API çağrısı — CI kullanımı için pratikte ücretsiz. Alternatif: yapılandırılabilir yanıtlar döndüren Lambda — farklı senaryoları (yavaş yanıt, hatalar, belirli payload\'lar) simüle etmene izin verir.' },
              },
              {
                level: 'intermediate',
                q: { tr: 'Yük testlerinde bulunan performans sorunlarını debug etmek için AWS X-Ray\'i nasıl kullanırsın?' },
                a: { tr: 'AWS X-Ray dağıtık izleme sağlar. Yük testleri sırasında uygulamanda X-Ray\'i etkinleştir (AWS X-Ray SDK ekle): her isteği uçtan uca izler, hangi servisin/veritabanı çağrısının en yavaş olduğunu gösterir. JMeter testinde yavaş checkout yanıtında: (1) X-Ray Service Map, istek yolundaki tüm servisleri gösterir. (2) X-Ray Trace Timeline, her servisin gecikme katkısını gösterir — örn. "veritabanı sorgusu 1000ms yanıt süresinin 800ms\'ini alıyor". (3) Süreye göre izleri filtrele: "responsetime > 1". (4) X-Ray Insights anomalileri otomatik olarak tespit eder. Bu, "checkout yavaş" bilmek yerine tam darboğazı belirler.' },
              },

              // ── İLERİ SEVİYE (15) ──────────────────────────────────────────
              {
                level: 'advanced',
                q: { tr: '20 servisli bir microservice uygulaması için AWS\'te her servisin izole ve entegre test edilmesini sağlayan eksiksiz CI/CD test mimarisi tasarla.' },
                a: { tr: 'Mimari: (1) Servis başına: her servisin repo\'suna push\'ta CodePipeline tetiklenir. CodeBuild Docker\'da unit + API contract testleri (Pact/Spring Cloud Contract) çalıştırır. Sonuçlar S3\'e. (2) Entegrasyon testleri: Step Functions, ECS Fargate görevlerini orkestre eder — her görev test edilen servisi ve bağımlılıklarını (LocalStack veya gerçek test instance\'ları ile mock) başlatır. (3) E2E testleri: yalnızca geceleri (pahalı). ECS Fargate, ayrılmış VPC\'deki tam ortama karşı Playwright çalıştırır. (4) Gözlemlenebilirlik: tüm servisler genelinde X-Ray, CloudWatch Container Insights. Temel ilke: her CodePipeline aşaması bir sonrakini geçit olarak kontrol eder.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Organizasyonun, test pipeline\'ları bittikten sonra hiçbir AWS resource\'ının çalışır durumda kalmamasını gerektiriyor. Bunu sistematik olarak nasıl uygularsın?' },
                a: { tr: '(1) AWS Config kuralı: 4 saatten uzun çalışan "Environment=qa" etiketli EC2 instance\'larını tespit et → SSM Automation ile terminate tetikle. (2) Lambda "bekçi" fonksiyonu EventBridge schedule üzerinde (her 30 dk): X saatten eski QA etiketli tüm resource\'ları listele, terminate et. (3) AWS Budget Action: QA hesap harcaması günlük $200\'ü geçtiğinde Organizations üzerinden kısıtlayıcı SCP otomatik uygula. (4) CloudFormation stack tabanlı resource\'ları zorla: pipeline her zaman son adımda delete-stack çağırır. (5) Trusted Advisor boşta resource kontrolü.' },
              },
              {
                level: 'advanced',
                q: { tr: 'QA süreci kapsamında sistemin dayanıklılığını test etmek için AWS\'te chaos engineering pipeline\'ı nasıl kurarsın?' },
                a: { tr: 'AWS Fault Injection Simulator (FIS) kullan: (1) Deney şablonları tanımla: EC2 instance terminate (AZ arızası simülasyonu), FIS NetworkDisruption ile API throttling (paket kaybı %30), RDS failover tetikleme. (2) CodePipeline ile entegre et: yük testleri geçtikten sonra CloudWatch metriklerini ve X-Ray izlerini izlerken chaos deneyleri çalıştır. (3) Steady-state hipotezi tanımla: yanıt süresi < 500ms, hata oranı < %1. İhlal durumunda pipeline başarısız olur ve alarm gönderir. (4) Otomatik kurtarma testi: FIS bir EC2 node\'unu terminate ettikten sonra CloudWatch alarm durumu geçişleri üzerinden kurtarma süresini ölç.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Verinin us-east-1 ve eu-west-1 arasında 5 saniye içinde replike edilmesi gereken multi-region uygulamayı test etmek için altyapıyı nasıl kurarsın?' },
                a: { tr: '(1) CloudFormation StackSets kullanarak her iki region\'a da test ortamını deploy et. (2) Cross-region veri için DynamoDB Global Tables veya Aurora Global Database kullan. (3) Test runner: us-east-1\'deki Step Functions veri yazar → zamanlayıcı başlatır → eu-west-1\'deki Lambda veriyi yoklar → 5000ms içinde geldiğini doğrular. (4) Ağ: region-şeffaf endpoint için Route 53 gecikme tabanlı yönlendirme. (5) Cross-region CloudWatch dashboard ile replikasyon gecikme metriğini görüntüle. Dikkat edilmesi gereken: Lambda cold start 1-2s gecikme ekleyebilir — tutarlı ölçüm için eu-west-1 Lambda\'da provisioned concurrency kullan.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Eski test suite\'i her yerde "localhost" hardcode ediyor ve değiştirilemiyor. Dağıtık AWS ortamında nasıl çalıştırırsın?' },
                a: { tr: '(1) Her test dosyasını kendi EC2 instance\'ında veya ECS görevinde çalıştır — kendi container\'ı içinde "localhost" geçerli. ECS görev ağı (awsvpc modu) kullan — her görevin kendi ağ namespace\'i var. (2) Testin bağımlı olduğu servisler için: ECS görevi içinde Docker Compose kullan — tüm servisler localhost paylaşır. (3) Dış bağımlılıklar için: test instance\'ında iptables NAT kuralları kullanarak "localhost:8080"i gerçek uygulama IP\'sine yönlendir. (4) EC2 instance user-data script: başlangıçta "localhost" alias\'larını gerçek IP\'lere eşleyen /etc/hosts girdileri yaz. (5) Uzun vadeli: test yapılandırmasında parametrize base URL\'ler savunuculuğunu yap — bu doğru çözümdür.' },
              },
              {
                level: 'advanced',
                q: { tr: 'CI/CD pipeline\'ınla entegre olan ve video kayıt ile performans metrikleri sağlayan mobil cihaz farm test mimarisini AWS\'te nasıl tasarlarsın?' },
                a: { tr: 'Tam mimari: (1) Main\'e push\'ta CodePipeline tetiklenir. (2) CodeBuild uygulamayı derler (APK/IPA). (3) Lambda APK + test paketini AWS Device Farm\'a yükler. (4) Device Farm çalışması: 5 gerçek cihazda Appium testleri. (5) Device Farm üretir: video kayıtları, cihaz logları, performans verisi (CPU, bellek, FPS), her assertion\'da screenshot. (6) Post-run Lambda: Device Farm artifact\'larını indir → yapılandırılmış path ile S3\'e yükle. (7) S3 üzerinde Athena sorgusuyla performans trendlerini takip et. (8) CloudWatch dashboard: cihaz modeline göre test geçme oranı ve ortalama performans. (9) Geçme oranı %90\'ın altına düşerse SNS alarmı. Maliyet: ~$0.17/cihaz/dk × 10 dk × 5 cihaz = ~$8.50/çalışma.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Cloud maliyeti oluşturmadan AWS bağımlı kodu yerel olarak geliştirmek ve test etmek için AWS LocalStack\'i nasıl kullanırsın?' },
                a: { tr: 'LocalStack, AWS servislerini Docker\'da yerel olarak çalıştırır — S3, DynamoDB, SQS, Lambda, vb. tam emüle. Kurulum: docker run -d -p 4566:4566 localstack/localstack. boto3 yapılandırması: endpoint_url="http://localhost:4566". pytest\'te kullanım: (1) conftest.py, pytest-localstack veya testcontainers-python ile LocalStack container başlatır. (2) Testler yerel olarak gerçek S3 bucket\'ları, DynamoDB table\'ları oluşturur. (3) Test sonrası: temizlik otomatik. CI\'da: CodeBuild\'de servis olarak Docker LocalStack çalıştır. İş akışı: LocalStack ile yerel geliştir → push → CodeBuild test hesabında gerçek AWS\'e karşı çalışır → prod hesabı production. LocalStack community ücretsiz; Pro tam servis için ~$35/ay.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Test pipeline\'ın sık sık RDS instance oluşturup siliyor. Cold start süresi (10-15 dakika) pipeline\'ı yavaşlatıyor. Nasıl çözersin?' },
                a: { tr: 'Birden fazla strateji: (1) Aurora Serverless v2: 0 ACU\'dan ölçeklenir, dakikalar yerine saniyeler içinde devam eder. Test çalışmasından sonra duraklat, sonrakinden önce devam ettir. (2) RDS Proxy: DB çalışır durumda tut ama connection pooling kullan — DB ısınırken bile bağlantı kurulumu anlık. (3) Ön ısıtma pattern\'i: EventBridge üzerinde Lambda, zamanlanmış test çalışmasından 5 dakika önce RDS instance başlatır. (4) Veritabanı snapshot geri yükleme: Aurora fast clone snapshot\'tan <30 saniyede tamamlanır. (5) Unit/API testleri için: in-memory SQLite (sıfır başlatma). (6) En iyi mimari çözüm: testcontainers ile test veritabanını containerize et — 5-10 saniyede başlatma, özdeş schema.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Test suite\'inin trafik kaymasından önce yeni (green) ortamı otomatik olarak doğrulayan blue-green deployment doğrulama stratejisi nasıl uygularsın?' },
                a: { tr: '(1) CodeDeploy\'u blue-green deployment hook ile kullan: BeforeAllowTraffic lifecycle olayı Lambda fonksiyonunu çağırır. (2) Lambda, green ortamın dahili URL\'sine karşı smoke testleri çalıştırır (gerçek trafik almadan önce). (3) Lambda performans baseline\'ı çalıştırır: kritik endpoint\'ler için yanıt süresi < 200ms. (4) Lambda güvenlik kontrolleri çalıştırır: green\'e OWASP ZAP API scan. (5) Hepsi geçerse: Lambda başarı döndürür → CodeDeploy trafiği shift eder. Başarısız olursa: Lambda başarısızlık döndürür → CodeDeploy otomatik mavi\'ye geri döner. (6) Tam trafik shift sonrası: CodeBuild üzerinden green\'e karşı regression suite çalıştır. Bu yaklaşım herhangi bir gerçek kullanıcı etkilenmeden önce testlerin çalışmasını sağlar.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Test altyapın AWS\'te aylık $8.000\'e mal oluyor. Yönetim %60 azaltmanı istiyor. Optimizasyon planın nedir?' },
                a: { tr: 'Sistematik yaklaşım: (1) Stateless test runner\'lar için EC2 Spot Instance — on-demand fiyatından %60-70 daha ucuz. Playwright/Selenium testleri kesilebilir (sadece yeniden çalıştır). (2) Zamanlanmış EC2: Auto Scaling Scheduled Actions ile Selenium Grid yalnızca hafta içi 8:00-20:00 çalışır. (3) S3 Lifecycle: 30 günden eski test artifact\'larını sil. (4) Rightsizing: aşırı kaynaklanmış instance\'ları tespit etmek için AWS Compute Optimizer. (5) Her zaman açık bileşenler için Reserved Instance (Jenkins controller, RDS). 1 yıllık RI = %40 tasarruf. (6) API smoke testleri için EC2 yerine Lambda. Hedef: Spot ($3.200 tasarruf) + zamanlama ($1.600) + lifecycle ($500) + rightsizing ($700) = ~$6.000 tasarruf = %75 azalma.' },
              },
              {
                level: 'advanced',
                q: { tr: 'AWS Security Hub ve Inspector\'ı QA pipeline\'ına güvenlik testini entegre etmek için nasıl kullanırsın?' },
                a: { tr: '(1) AWS Inspector: EC2 instance\'larını ve container imajlarını CVE için otomatik tarar. Test Docker imajını build ettikten sonra CodeBuild\'de "aws ecr start-image-scan" ekle. Inspector CRITICAL güvenlik açığı bulursa pipeline\'ı başarısız yap. (2) Security Hub: Inspector, GuardDuty, Macie bulgularını toplar. Pipeline başarısız olur eğer yeni CRITICAL bulgu varsa "aws securityhub get-findings" çağıran CodeBuild post-build adımı oluştur. (3) ECS\'de OWASP ZAP: staging ortamına karşı ZAP active scan çalıştır. ZAP raporunu S3\'e yükle. (4) AWS Config: altyapı uyumluluğunu kontrol et. (5) Tüm bulguları custom metrikler aracılığıyla CloudWatch\'ta birleşik QA dashboard\'unda topla.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Binlerce test senaryosunu izole ve sıfırlanabilir verilerle destekleyen test data management sistemini AWS\'te nasıl mimari tasarlarsın?' },
                a: { tr: '(1) S3\'te JSON/SQL dosyaları olarak seed verisi, versiyonlanmış ve etiketlenmiş. (2) Dinamik test durumu için DynamoDB (hızlı okuma, ölçeklenebilir). (3) Lambda tabanlı test verisi API: POST /testdata/create → Lambda S3\'ten seed okur, test RDS\'e yazar → testDataId döndürür. Testler bu ID\'yi namespace olarak kullanır. (4) Schema-per-tenant izolasyonlu Aurora: her test çalışması kendi schema\'sını alır (CREATE SCHEMA test_run_abc), sonra düşürülür. (5) EventBridge + SQS: test verisi temizleme olayları kuyruğa alınır ve async işlenir, test tamamlanmasını engellemez. (6) Veri maskeleme: test verisine girmeden önce prod snapshot\'larından PII\'nın maskelendiğinden emin olmak için AWS Glue DataBrew veya Macie.' },
              },
              {
                level: 'advanced',
                q: { tr: 'AWS\'te günde 10.000 test çalıştırırken flaky testleri nasıl tespit eder ve önlersin?' },
                a: { tr: '(1) DynamoDB\'de test başına metrik takip et: testName, runId, duration, status, attempt. (2) Lambda sonuçları analiz eder: retry\'da geçen başarısız testler flaky aday. (3) "FlakeyTestCount" CloudWatch custom metric — eşiği aştığında alarm. (4) Otomatik karantina: Step Functions, bir testi 5 çalışmada 3\'ten fazla başarısız olursa "karantina" olarak işaretler. Karantinaya alınan testler ayrı CodeBuild işinde çalışır (deployment\'ı engellemez). (5) Kök neden analizi: X-Ray ile flaky\'liği belirli EC2 instance tipleri, günün saati veya deployment versiyonlarıyla ilişkilendir. (6) Framework seviyesinde exponential backoff ile retry (pytest-rerunfailures). (7) Test başına flakiness puanı ve sahibiyle (git blame) Slack bildirimi. (8) Haftalık flakiness raporu: mühendisler karantinaya alınan testleri düzeltmeli ya da silmeli.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Microservice\'ler arasında contract testini AWS\'te nasıl uygularsın ve contract kırıldığında deployment\'ı nasıl engellersin?' },
                a: { tr: '(1) Pact ile consumer-driven contract: consumer\'lar contract testleri yazar, pact\'leri Pact Broker\'a yayımlar (ECS\'de self-hosted veya pactflow.io). (2) Provider doğrulaması: provider\'ın CodePipeline\'ı, tüm consumer contract\'larını karşılayıp karşılamadığını doğrulayan bir aşamaya sahip. (3) CodePipeline entegrasyonu: "Unit Test" ve "Deploy to Staging" arasına "Contract Verification" aşaması ekle. (4) Pact Broker webhook: consumer yeni pact yayımladığında → provider\'ın CodePipeline\'ını otomatik tetikler. (5) Can I Deploy kontrolü: staging\'e geçmeden önce Lambda, tüm consumer/provider contract versiyonlarının uyumlu olduğunu doğrulamak için Pact Broker API çağırır. Değilse: pipeline başarısız olur. (6) S3 pact dosyalarını artifact olarak saklar.' },
              },
              {
                level: 'advanced',
                q: { tr: 'Şirketin tüm test ortamlarının SOC 2 uyumluluğunu karşılamasını gerektiriyor. QA altyapın için AWS\'i nasıl yapılandırırsın?' },
                a: { tr: '(1) Tüm region\'larda AWS CloudTrail etkin: her API çağrısını kaydeder — kim, ne, ne zaman. Loglar S3\'te CloudWatch Logs entegrasyonuyla saklanır. (2) AWS Config: tüm managed kuralları etkinleştir (encrypted-volumes, restricted-ssh, s3-bucket-server-side-encryption-enabled). Tüm uyumsuz resource\'lar SNS alarmı tetikler. (3) IAM: tüm kullanıcılar için MFA zorla, şifre politikası (min 14 karakter, 90 günde rotasyon), root access key yok. (4) VPC: tüm test resource\'ları private subnet\'te, doğrudan internet erişimi yok — trafik NAT Gateway üzerinden geçer. (5) Şifreleme: AES-256 veya KMS ile S3 bucket\'lar, şifreli EBS volume\'lar, dinlenirken ve aktarımda şifreli RDS. (6) Macie: S3\'i PII için tarar — test verisinin gerçek müşteri verisi içermediğini garantiler. (7) AWS Audit Manager — SOC 2 kanıtlarını otomatik oluşturur.' },
              },
            ],
          },
          awsLeastPrivilegeInterviewFilm,
          awsInterviewStep,
          awsInterviewPractice,
        ],
      },
    ],
  },
}

fillMissingCodeTrios(awsData, 'aws')

