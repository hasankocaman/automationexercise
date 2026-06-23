const iq = (level, qTr, aTr, qEn, aEn) => ({
  level,
  q: { tr: qTr, en: qEn },
  a: { tr: aTr, en: aEn },
})

const linuxInterviewQuestions = [
  iq('basic',
    '`ls` ile `ls -la` arasındaki fark nedir?',
    '`ls` sadece görünür dosya/klasör adlarını listeler. `ls -la` ise `-l` ile uzun format (izinler, sahip, boyut, tarih) ve `-a` ile gizli dosyaları (`.` ile başlayanlar, örn. `.bashrc`) da gösterir. QA ortamında bir konfigürasyon dosyasının (`.env`) var olup olmadığını kontrol etmek için `-a` zorunludur. Java\'da `toString()` ile kısa özet, debugger ile detaylı inceleme arasındaki fark gibi düşünebilirsin.',
    'What is the difference between `ls` and `ls -la`?',
    '`ls` only lists visible file/folder names. `ls -la` adds `-l` for long format (permissions, owner, size, date) and `-a` to show hidden files (those starting with `.`, like `.bashrc`). In QA work you need `-a` to confirm a config file like `.env` actually exists. It is similar to the difference between a short `toString()` summary and inspecting an object in a debugger in Java.'),
  iq('basic',
    'Absolute path ile relative path arasındaki fark nedir, örnek ver.',
    'Absolute path her zaman `/` kök dizininden başlar, örneğin `/home/qa/projects/tests`; nereden çalıştırırsan çalıştır aynı sonucu verir. Relative path bulunduğun konuma göredir, örneğin `cd projects` veya `cd ../logs`. CI script\'lerinde absolute path kullanmak, script farklı bir working directory\'den tetiklendiğinde hataları önler. Java\'da mutlak path bir tam paket adı (`com.app.UserService`) gibidir, relative path ise aynı paket içinden kısa class adı kullanmak gibidir.',
    'What is the difference between an absolute and a relative path? Give an example.',
    'An absolute path always starts from the `/` root, e.g. `/home/qa/projects/tests`, and gives the same result no matter where you run it from. A relative path depends on your current location, e.g. `cd projects` or `cd ../logs`. Using absolute paths in CI scripts avoids failures when the script is triggered from a different working directory. In Java, an absolute path is like a fully qualified class name (`com.app.UserService`), while a relative path is like using the short class name from within the same package.'),
  iq('basic',
    '`cat` ve `less` arasındaki fark nedir, hangi durumda hangisini kullanırsın?',
    '`cat` dosyanın tüm içeriğini doğrudan terminale döker; kısa dosyalar için pratiktir. `less` dosyayı sayfa sayfa açar, yukarı/aşağı kaydırma ve `/arama-terimi` ile içinde arama yapmana izin verir. 50.000 satırlık bir test log dosyasını incelerken `cat` terminali komple doldurur, `less` ile rahatça gezinirim. Java\'da `System.out.println(allLines)` ile hepsini ekrana basmak yerine bir log viewer kullanmak gibi bir fark.',
    'What is the difference between `cat` and `less`, and when do you use each?',
    '`cat` dumps the entire file content directly to the terminal; fine for short files. `less` opens the file page by page, lets you scroll up/down, and search inside it with `/searchterm`. When inspecting a 50,000-line test log, `cat` floods the terminal, while `less` lets me navigate comfortably. It is like the difference between printing every line with `System.out.println` versus using a proper log viewer in Java.'),
  iq('basic',
    '`cd ~`, `cd ..` ve `cd -` ne yapar?',
    '`cd ~` doğrudan home dizinine (`/home/kullaniciadi`) gider. `cd ..` bir üst dizine çıkar. `cd -` ise az önce bulunduğun dizine geri döner; iki klasör arasında hızlıca geçiş yaparken (örneğin proje kökü ile log klasörü arasında) çok kullanışlıdır. Java IDE\'sinde "go back" navigasyon kısayoluna benzer bir refleks oluşturur.',
    'What do `cd ~`, `cd ..` and `cd -` do?',
    '`cd ~` jumps straight to your home directory (`/home/username`). `cd ..` moves up one directory. `cd -` jumps back to the previous directory you were in — very handy when bouncing between two folders, like the project root and the log folder. It builds the same reflex as a "navigate back" shortcut in a Java IDE.'),
  iq('basic',
    '`mkdir`, `rmdir` ve `rm -r` arasındaki fark nedir?',
    '`mkdir klasor` yeni boş bir klasör oluşturur. `rmdir klasor` sadece BOŞ bir klasörü siler; içinde dosya varsa hata verir. `rm -r klasor` ise klasörü içindeki her şeyle birlikte siler — bu yüzden `rm -rf` özellikle yanlış path ile çok tehlikelidir. Java\'da boş bir ArrayList\'i temizlemek ile elemanlarıyla beraber referansı tamamen kaldırmak arasındaki fark gibi düşünülebilir; burada risk çok daha yüksektir çünkü geri alma (undo) yoktur.',
    'What is the difference between `mkdir`, `rmdir` and `rm -r`?',
    '`mkdir folder` creates a new empty folder. `rmdir folder` only deletes an EMPTY folder; it errors if files exist inside. `rm -r folder` deletes the folder and everything inside it — which is why `rm -rf` with a wrong path is so dangerous. Think of clearing an empty ArrayList versus removing a reference along with all its elements in Java, except here there is no undo.'),
  iq('basic',
    '`chmod` ne işe yarar, `rwx` harfleri neyi temsil eder?',
    '`chmod` bir dosyanın izinlerini değiştirir. `r` okuma, `w` yazma, `x` çalıştırma (execute) iznini temsil eder ve bu üç bit owner, group, other için ayrı ayrı tanımlanır. Örneğin bir test script\'i `-rw-r--r--` ise çalıştırılamaz, `chmod +x script.sh` ile `x` biti eklenince çalıştırılabilir hale gelir. Java\'daki public/protected/private erişim belirleyicileri gibi, rwx de "kim ne yapabilir" sorusuna dosya seviyesinde cevap verir.',
    'What does `chmod` do, and what do the `rwx` letters represent?',
    '`chmod` changes a file\'s permissions. `r` is read, `w` is write, `x` is execute, and these three bits are defined separately for owner, group, and other. For example, if a test script is `-rw-r--r--` it cannot be executed; `chmod +x script.sh` adds the `x` bit so it becomes runnable. Like Java\'s public/protected/private modifiers, rwx answers "who can do what" at the file level.'),
  iq('basic',
    '`sudo` nedir ve neden dikkatli kullanılmalıdır?',
    '`sudo` (superuser do), bir komutu root (yönetici) yetkisiyle çalıştırmanı sağlar; sistemin her yerine erişim ve değişiklik yetkisi verir. Gereksiz yere her komutu `sudo` ile çalıştırmak, yanlış bir komutun (örn. `sudo rm -rf /`) tüm sistemi bozma riskini büyütür. Doğru yaklaşım, yalnızca gerçekten root yetkisi gereken komutlarda (paket kurulumu, sistem servisleri) `sudo` kullanmaktır. Java\'da bir metoda gereksiz yere `static`/global erişim vermek yerine, sadece gerekli olduğu yerde geniş yetki vermeye benzer.',
    'What is `sudo` and why must it be used carefully?',
    '`sudo` (superuser do) runs a command with root (administrator) privileges, granting access to and ability to change anything on the system. Running every command with `sudo` unnecessarily increases the blast radius of a mistake, like `sudo rm -rf /` wiping the whole system. The right approach is to use `sudo` only when root access is genuinely needed (package installs, system services). It is similar to not giving a method unnecessary static/global access in Java — grant broad power only where it is truly required.'),
  iq('basic',
    '`pwd` komutu script\'ler içinde neden kullanışlıdır?',
    '`pwd` (print working directory), o anki çalışma dizininin tam yolunu yazdırır. Bir bash script\'i farklı klasörlerden tetiklenebileceği için, script başında `pwd` ile veya `$(dirname "$0")` ile gerçek konumu doğrulamak, yanlış dosya yoluna işlem yapmayı önler. Java\'da `System.getProperty("user.dir")` ile çalışma dizinini kontrol etmeye çok benzer; ikisi de "şu an neredeyim" sorusuna cevap verir.',
    'Why is `pwd` useful inside scripts?',
    '`pwd` (print working directory) prints the full path of the current working directory. Since a bash script can be triggered from different folders, checking the real location at the start with `pwd` or `$(dirname "$0")` prevents operating on the wrong file path. It closely matches `System.getProperty("user.dir")` in Java — both answer "where am I right now".'),
  iq('basic',
    '`man` komutu ve `--help` bayrağı ne işe yarar?',
    '`man komut` (manual), bir komutun tüm seçeneklerini, kullanım örneklerini ve açıklamalarını gösteren resmi dokümantasyonu açar; `q` ile çıkılır. `komut --help` ise daha kısa, hızlı bir özet verir. Yeni bir komutla karşılaştığımda önce `--help` ile hızlı bakar, detay gerekirse `man` sayfasına geçerim. Java\'da Javadoc\'a bakmak gibi düşünülebilir — `man` daha kapsamlı referans, `--help` ise IDE\'deki quick-info tooltip gibidir.',
    'What do the `man` command and the `--help` flag do?',
    '`man command` (manual) opens the official documentation with every option, usage example, and explanation; press `q` to exit. `command --help` gives a shorter, quick summary. When I meet a new command I check `--help` first and switch to the `man` page if I need more detail. It is like checking Javadoc in Java — `man` is the full reference, `--help` is closer to the IDE\'s quick-info tooltip.'),
  iq('basic',
    'Environment variable nedir, `$PATH` neyi belirler?',
    'Environment variable, shell ve onun başlattığı her sürece (process) aktarılan isim-değer çiftleridir; örneğin `$HOME`, `$USER`, `$PATH`. `$PATH`, bir komut yazdığında shell\'in çalıştırılabilir dosyayı hangi klasörlerde arayacağını sırayla listeler. Bir araç kurduktan sonra "command not found" hatası alıyorsan, genelde o aracın klasörü `$PATH`\'e eklenmemiştir. Java\'da `System.getenv("PATH")` ile aynı listeye erişebilirsin; mantığı classpath\'in sınıfları bulduğu klasör listesine çok benzer.',
    'What is an environment variable, and what does `$PATH` define?',
    'An environment variable is a name-value pair passed to the shell and every process it starts, e.g. `$HOME`, `$USER`, `$PATH`. `$PATH` lists, in order, the folders the shell searches for an executable when you type a command. If you get "command not found" after installing a tool, that tool\'s folder is usually missing from `$PATH`. You can read the same list in Java with `System.getenv("PATH")`; its logic is very similar to how the classpath tells Java where to find classes.'),
  iq('basic',
    'Terminal, shell ve kernel arasındaki fark nedir?',
    'Terminal, komut yazdığın pencere/programdır (örn. Windows Terminal, iTerm). Shell, yazdığın komutları yorumlayan ve çalıştıran programdır (bash, zsh). Kernel ise işletim sisteminin çekirdeği olup donanımla (CPU, bellek, disk) doğrudan konuşur; shell senin komutlarını kernel\'e iletir. Java\'da terminal IDE penceresi, shell derleyici/runtime, kernel ise JVM\'in altındaki işletim sistemi gibi düşünülebilir — her katman bir öncekine bağımlıdır.',
    'What is the difference between a terminal, a shell, and the kernel?',
    'The terminal is the window/program you type into (e.g. Windows Terminal, iTerm). The shell is the program that interprets and runs what you type (bash, zsh). The kernel is the operating system core that talks directly to hardware (CPU, memory, disk); the shell forwards your commands down to it. In Java terms, the terminal is like the IDE window, the shell is like the compiler/runtime, and the kernel is the OS underneath the JVM — each layer depends on the one below it.'),
  iq('basic',
    '`grep` komutunun en temel kullanımı nedir?',
    '`grep "ERROR" app.log` komutu, `app.log` dosyasında "ERROR" kelimesini içeren satırları bulup ekrana yazdırır. Yüzlerce satırlık bir test log dosyasında manuel arama yapmak yerine, hangi testlerin hata verdiğini saniyeler içinde bulmamı sağlar. Java\'da bir `List<String>` üzerinde `.filter(line -> line.contains("ERROR"))` çalıştırmaya birebir karşılık gelir.',
    'What is the most basic use of `grep`?',
    '`grep "ERROR" app.log` finds and prints the lines in `app.log` that contain the word "ERROR". Instead of manually scanning hundreds of lines of test logs, it lets me find which tests failed in seconds. In Java terms, it is exactly equivalent to running `.filter(line -> line.contains("ERROR"))` on a `List<String>`.'),
  iq('basic',
    'Pipe (`|`) operatörü ne yapar, neden önemlidir?',
    'Pipe, bir komutun çıktısını (stdout) bir sonraki komutun girdisi (stdin) olarak bağlar. Örneğin `cat app.log | grep ERROR | wc -l`, önce dosyayı okur, sonra ERROR satırlarını filtreler, sonra kaç satır olduğunu sayar — üç ayrı küçük aracı tek bir akışta birleştirir. Java\'da Stream API\'sindeki `.filter().map().count()` zincirine çok benzer; her iki yaklaşımda da küçük, tek işlevli adımlar birbirine bağlanır.',
    'What does the pipe (`|`) operator do, and why does it matter?',
    'A pipe connects one command\'s output (stdout) to the next command\'s input (stdin). For example, `cat app.log | grep ERROR | wc -l` reads the file, filters ERROR lines, then counts them — chaining three small tools into one flow. It is very similar to a `.filter().map().count()` chain in the Java Stream API; both approaches connect small, single-purpose steps together.'),
  iq('basic',
    '`ps` komutu ne gösterir?',
    '`ps` (process status), şu anda çalışan process\'leri listeler; `ps aux` ile tüm kullanıcıların tüm process\'lerini, CPU/bellek kullanımını ve process ID\'lerini (PID) görürsün. Takılı kalmış bir Selenium node veya test runner\'ı bulup `kill` etmeden önce ilk başvurduğum komuttur. Java\'da `jps` ile çalışan JVM süreçlerini listelemeye benzer; `ps aux` daha geniş, işletim sistemi seviyesinde bir görünüm sağlar.',
    'What does the `ps` command show?',
    '`ps` (process status) lists currently running processes; `ps aux` shows every user\'s processes with CPU/memory usage and process IDs (PID). It is the first command I reach for before `kill`-ing a stuck Selenium node or test runner. It is similar to listing running JVMs with `jps` in Java, except `ps aux` gives a broader, OS-level view.'),
  iq('basic',
    '`.bashrc` dosyası nedir, ne zaman çalışır?',
    '`.bashrc`, home dizininde bulunan ve her yeni interaktif bash terminali açıldığında otomatik çalışan bir konfigürasyon dosyasıdır; alias\'lar, environment variable\'lar ve PATH eklemeleri buraya yazılır. Örneğin sık kullandığım `alias runtests="pytest -v"` satırını buraya eklersem her terminalde kullanılabilir olur. Java projelerindeki `application.properties`\'e benzer — uygulama (burada: shell) her başladığında otomatik okunan ayar dosyasıdır.',
    'What is the `.bashrc` file, and when does it run?',
    '`.bashrc` is a configuration file in your home directory that runs automatically every time a new interactive bash terminal opens; aliases, environment variables, and PATH additions go here. For example, adding `alias runtests="pytest -v"` makes that shortcut available in every terminal. It is similar to `application.properties` in a Java project — a settings file the "application" (here, the shell) reads automatically on every start.'),

  iq('intermediate',
    '`grep -i`, `-r`, `-n` ve `-v` bayraklarını gerçek bir senaryoda nasıl kullanırsın?',
    '`-i` büyük/küçük harf duyarsız arama yapar (`Error` ve `error`\'ü aynı sayar), `-r` bir klasördeki tüm dosyalarda recursive arar, `-n` eşleşen satırın numarasını gösterir, `-v` ise eşleşmeyen satırları getirir (ters filtre). Bir proje klasöründe `grep -rni "TODO" .` çalıştırarak tüm dosyalarda kalan TODO yorumlarını satır numarasıyla bulurum; `grep -v "PASSED" results.log` ile de sadece PASSED olmayan (yani FAILED/SKIPPED) satırları görürüm. Java IDE\'sindeki "Find in Files" özelliğinin komut satırı karşılığı gibidir, ama scriptlenebilir ve CI\'da otomatik çalışır.',
    'How do you use the `grep -i`, `-r`, `-n` and `-v` flags in a real scenario?',
    '`-i` makes the search case-insensitive (treats `Error` and `error` the same), `-r` searches recursively through all files in a folder, `-n` shows the matching line number, and `-v` inverts the match (lines that do NOT match). I run `grep -rni "TODO" .` to find every leftover TODO comment across a project with line numbers, and `grep -v "PASSED" results.log` to see only the lines that are not PASSED (i.e. FAILED/SKIPPED). It is the command-line equivalent of an IDE\'s "Find in Files", except it is scriptable and runs automatically in CI.'),
  iq('intermediate',
    '`find` ve `locate` arasındaki fark nedir, hangisini ne zaman kullanırsın?',
    '`find /path -name "*.spec.ts"` gerçek zamanlı olarak dosya sistemini tarar; her zaman güncel sonuç verir ama büyük dizinlerde daha yavaştır. `locate dosyaadi` ise önceden oluşturulmuş bir index veritabanından (genelde günlük güncellenen `updatedb`) arama yapar; çok daha hızlıdır ama az önce oluşturulan bir dosyayı henüz göstermeyebilir. CI ortamında genelde `find` tercih ederim çünkü konteynerler kısa ömürlüdür ve index güncel olmayabilir. Java\'da bunu, her seferinde dosya sistemini tarayan bir metot ile önceden cache\'lenmiş bir arama indexi arasındaki farka benzetebilirsin.',
    'What is the difference between `find` and `locate`, and when do you use each?',
    '`find /path -name "*.spec.ts"` scans the filesystem in real time; results are always current but it is slower on large directories. `locate filename` searches a pre-built index database (usually refreshed daily via `updatedb`); it is much faster but may not show a file created moments ago. In CI environments I usually prefer `find` because containers are short-lived and the index may be stale. In Java terms, it is similar to the difference between a method that scans the filesystem every time versus querying a pre-cached search index.'),
  iq('intermediate',
    'Bir komutu arka planda (`&`) çalıştırmak CI ortamında neden gerekli olabilir?',
    'Bir test suite\'i çalıştırmadan önce bir mock server veya Selenium Grid hub\'ı başlatman gerekebilir; bu servis ön planda çalışırsa terminal/script o satırda sonsuza kadar bekler ve test komutu hiç çalışmaz. `node mock-server.js &` ile servisi arka plana alıp script\'in bir sonraki satırına (asıl testleri çalıştırmaya) geçmesini sağlarım. `nohup` ile de terminal/SSH oturumu kapansa bile process\'in devam etmesini garantilerim — CI agent\'ında SSH bağlantısı kesintiye uğrarsa bile test çalışmaya devam eder. Java\'da bir thread\'i `daemon` olarak başlatıp ana thread\'in devam etmesine izin vermeye çok benzer.',
    'Why might you need to run a command in the background (`&`) in a CI environment?',
    'Before running a test suite you might need to start a mock server or a Selenium Grid hub; if that service runs in the foreground, the terminal/script blocks on that line forever and the test command never runs. `node mock-server.js &` sends the service to the background so the script can move on to the next line (actually running the tests). `nohup` additionally guarantees the process keeps running even if the terminal/SSH session closes — so the test keeps going even if the CI agent\'s SSH connection drops. It is very similar to starting a Java thread as a `daemon` and letting the main thread continue.'),
  iq('intermediate',
    'Bash script\'lerde `$?` neyi temsil eder, neden kontrol edilmelidir?',
    '`$?`, en son çalışan komutun exit code\'unu (çıkış kodunu) tutar; `0` başarı, `0`\'dan farklı herhangi bir değer hata anlamına gelir. CI script\'lerinde her kritik komuttan sonra `if [ $? -ne 0 ]; then echo "Test failed"; exit 1; fi` gibi bir kontrol koymak, bir adım sessizce başarısız olduğunda pipeline\'ın yine de "yeşil" görünmesini önler. Java\'da bir metodun `boolean success` döndürmesi ve çağıranın bunu kontrol etmesi gerekmesi gibi; kontrol etmezsen hata sessizce yutulur.',
    'What does `$?` represent in bash scripts, and why should it be checked?',
    '`$?` holds the exit code of the most recently run command; `0` means success, any non-zero value means failure. In CI scripts, adding a check like `if [ $? -ne 0 ]; then echo "Test failed"; exit 1; fi` after a critical command prevents the pipeline from showing "green" even when a step silently failed. It is similar to a Java method returning a `boolean success` that the caller must check — if you don\'t check it, the failure gets silently swallowed.'),
  iq('intermediate',
    '`2>&1` ne işe yarar, gerçek bir log debugging senaryosunda nasıl kullanırsın?',
    'Linux\'ta her process\'in iki ayrı çıkış akışı vardır: stdout (1, normal çıktı) ve stderr (2, hata mesajları). `command > out.log 2>&1` yazınca, önce stdout `out.log`\'a yönlendirilir, sonra `2>&1` ile stderr de stdout ile aynı yere (yani aynı dosyaya) gider — tüm çıktı tek dosyada toplanır. Bunu test runner\'ları CI\'da çalıştırırken kullanırım: `pytest tests/ > full.log 2>&1` ile hem test sonuçlarını hem de olası Python traceback\'lerini tek bir log dosyasında görürüm. Java\'da `System.out` ve `System.err`\'ü ayrı ayrı dosyaya yazmak yerine ikisini birleştirip tek bir log dosyasına yönlendirmeye benzer.',
    'What does `2>&1` do, and how would you use it in a real log debugging scenario?',
    'Every Linux process has two separate output streams: stdout (1, normal output) and stderr (2, error messages). Writing `command > out.log 2>&1` first redirects stdout to `out.log`, then `2>&1` sends stderr to the same place as stdout (the same file) — everything ends up in one file. I use this when running test runners in CI: `pytest tests/ > full.log 2>&1` captures both test results and any Python tracebacks in a single log file. It is similar to merging Java\'s `System.out` and `System.err` into one combined log file instead of writing them separately.'),
  iq('intermediate',
    'Bir cron job manuel çalıştırınca çalışıyor ama gece otomatik tetiklendiğinde başarısız oluyor — sebebi ne olabilir?',
    'En klasik sebep, cron\'un çok minimal bir environment ile çalışmasıdır; senin interaktif shell\'inde tanımlı olan `$PATH` veya environment variable\'lar (örn. `$JAVA_HOME`, `nvm` ile kurulan node yolu) cron\'un ortamında bulunmayabilir. Çözüm olarak cron script\'inin başında gerekli environment variable\'ları açıkça export eder veya script içinde tüm komutları absolute path ile çağırırım (`/usr/bin/python3` yerine `python3`). Ayrıca `crontab -l` ile zamanlamayı, `grep CRON /var/log/syslog` ile de cron\'un gerçekten tetiklenip tetiklenmediğini kontrol ederim. Java\'da bir uygulamanın IDE\'de çalışıp production\'da `ClassNotFoundException` vermesi gibi — "benim makinemde çalışıyor" sorunu burada ortam/PATH farkından kaynaklanır.',
    'A cron job works when run manually but fails when triggered automatically at night — what could be the cause?',
    'The classic cause is that cron runs with a very minimal environment; the `$PATH` and environment variables defined in your interactive shell (e.g. `$JAVA_HOME`, or a node path set up via `nvm`) may not exist in cron\'s environment. The fix is to explicitly export the required environment variables at the top of the cron script, or call every command with an absolute path inside the script (`/usr/bin/python3` instead of `python3`). I also check the schedule with `crontab -l` and confirm cron actually fired with `grep CRON /var/log/syslog`. It is like a Java app working in the IDE but throwing `ClassNotFoundException` in production — a classic "works on my machine" problem caused by environment/PATH differences.'),
  iq('intermediate',
    'SSH key-based authentication, CI agent\'larına bağlanırken neden parola tabanlı authentication\'a göre tercih edilir?',
    'Parola tabanlı authentication brute-force ataklara ve insan hatasına (zayıf/paylaşılan parola) daha açıktır; ayrıca her bağlantıda manuel parola girilmesi otomasyonu (CI pipeline\'ı) imkansız hale getirir. SSH key-pair ile genel anahtar (public key) sunucuda tutulur, özel anahtar (private key) sadece sende veya CI\'ın secret store\'unda kalır — bu hem daha güvenlidir hem de script\'in interaktif olmadan bağlanmasını sağlar. GitHub Actions/Jenkins\'te genelde private key bir secret olarak saklanır ve `ssh-agent` ile her job\'da yüklenir. Java\'daki API key/JWT tabanlı authentication\'ın kullanıcı adı-parola\'ya göre otomasyon dostu olmasına çok benzer bir mantık.',
    'Why is SSH key-based authentication preferred over password authentication when connecting to CI agents?',
    'Password authentication is more exposed to brute-force attacks and human error (weak/shared passwords); it also makes automation (a CI pipeline) impossible since someone would have to type a password on every connection. With an SSH key pair, the public key stays on the server and the private key stays only with you or in the CI\'s secret store — this is more secure and lets scripts connect non-interactively. In GitHub Actions/Jenkins, the private key is usually stored as a secret and loaded via `ssh-agent` in each job. It is the same logic as API key/JWT authentication being more automation-friendly than username/password in Java backends.'),
  iq('intermediate',
    'CI agent\'ında `df -h` "100% used" gösteriyor ve test pipeline\'ı bu yüzden başarısız oluyor. Nasıl teşhis edip çözersin?',
    'Önce `df -h` ile hangi disk bölümünün dolduğunu, sonra `du -sh /var/log/* /tmp/* | sort -rh | head -10` ile en çok yer kaplayan klasörleri bulurum. Çoğu zaman suçlu, temizlenmeyen eski test raporları, Docker image katmanları (`docker system prune`) veya rotasyonsuz büyüyen log dosyalarıdır. Kısa vadede gereksiz dosyaları silip pipeline\'ı tekrar çalıştırırım; uzun vadede ise CI script\'ine otomatik temizlik adımı veya log rotation (logrotate) ekleyerek sorunun tekrarlamasını önlerim. Java\'da disk-bound bir uygulamada heap dump\'ların birikmesine benzer — kök nedeni bulup kalıcı bir temizlik politikası kurmak gerekir.',
    'A CI agent shows `df -h` at "100% used" and the test pipeline fails because of it. How do you diagnose and fix it?',
    'I first check `df -h` to see which partition is full, then run `du -sh /var/log/* /tmp/* | sort -rh | head -10` to find the largest space consumers. The usual culprits are uncleaned old test reports, leftover Docker image layers (`docker system prune`), or log files growing without rotation. Short term, I delete the unnecessary files and rerun the pipeline; long term, I add an automatic cleanup step or log rotation (logrotate) to the CI script to stop the problem from recurring. It is similar to heap dumps piling up on a disk-bound Java application — you need to find the root cause and set up a lasting cleanup policy.'),
  iq('intermediate',
    '`kill` ile `kill -9` arasındaki fark nedir, gerçek bir senaryoda hangisini seçersin?',
    '`kill PID` (varsayılan olarak `SIGTERM`, sinyal 15) process\'e "lütfen düzgünce kapan" der; process açık dosyaları kapatıp, bağlantıları temizleyip kendi isteğiyle sonlanabilir. `kill -9 PID` (`SIGKILL`) ise process\'i anında ve zorla öldürür, temizlik yapma şansı vermez. Takılı kalmış ama hâlâ sinyale cevap veren bir Selenium node\'unda önce normal `kill` denerim; eğer process yanıt vermiyorsa (zombie/hung process) son çare olarak `kill -9` kullanırım. Java\'da bir thread\'e `interrupt()` çağırıp düzgün durmasını beklemek ile `Thread.stop()` (deprecated, zorla durdurma) arasındaki fark gibi düşünebilirsin.',
    'What is the difference between `kill` and `kill -9`, and which would you choose in a real scenario?',
    '`kill PID` (default `SIGTERM`, signal 15) tells the process "please shut down gracefully" — it can close open files, clean up connections, and exit on its own terms. `kill -9 PID` (`SIGKILL`) forcefully and immediately kills the process, giving it no chance to clean up. For a stuck but still responsive Selenium node, I try a regular `kill` first; if the process is unresponsive (hung/zombie), I use `kill -9` as a last resort. Think of it like the difference between calling `interrupt()` on a Java thread and waiting for it to stop gracefully, versus the deprecated forceful `Thread.stop()`.'),
  iq('intermediate',
    '`systemctl status` ve `journalctl -u <servis> -f` arasındaki fark nedir, ikisini birlikte nasıl kullanırsın?',
    '`systemctl status servisadi`, bir servisin şu anki durumunu (running/failed/stopped), son birkaç log satırını ve başlangıç zamanını özet olarak gösterir — hızlı bir "sağlık kontrolü" gibidir. `journalctl -u servisadi -f` ise o servise ait TÜM logları canlı olarak (tail -f gibi) akıtır; bir servis başlatma sırasında neden çöktüğünü derinlemesine incelemek için kullanılır. Bir test ortamındaki mock API servisi yanıt vermiyorsa önce `systemctl status` ile çalışıp çalışmadığına bakar, sorun varsa `journalctl -u mock-api -f` ile detaylı hata logunu incelerim. Java\'da bir uygulamanın health endpoint\'ine bakmak (durum özeti) ile tüm application log dosyasını tail etmek (detaylı inceleme) arasındaki fark gibidir.',
    'What is the difference between `systemctl status` and `journalctl -u <service> -f`, and how do you use them together?',
    '`systemctl status servicename` gives a summary of a service\'s current state (running/failed/stopped), its last few log lines, and start time — a quick "health check". `journalctl -u servicename -f` streams ALL of that service\'s logs live (like tail -f), used to dig deep into why a service crashed on startup. If a mock API service in a test environment is not responding, I first check `systemctl status` to see if it is running, then dig into `journalctl -u mock-api -f` for detailed error logs if there is a problem. It is similar to the difference between checking a Java app\'s health endpoint (summary) versus tailing the full application log file (deep inspection).'),
  iq('intermediate',
    '`chmod 755`, `644` ve `700` arasındaki pratik fark nedir, hangisini ne için kullanırsın?',
    '`755` (`rwxr-xr-x`) owner\'a tam yetki, group ve other\'a sadece okuma+çalıştırma verir; çalıştırılabilir script\'ler ve klasörler için yaygındır. `644` (`rw-r--r--`) owner\'a okuma/yazma, herkese sadece okuma verir; konfigürasyon dosyaları veya README için uygundur, çalıştırma izni gerekmez. `700` (`rwx------`) sadece owner\'a tam yetki verir, group ve other\'a hiçbir hak vermez; SSH private key\'leri veya gizli credential dosyaları için kullanılır (aksi halde SSH "permissions too open" hatası verir). Java\'daki public/package-private/private access modifier seçimine benzer — her dosyaya, gerçekten ihtiyacı olan en az yetkiyi verirsin.',
    'What is the practical difference between `chmod 755`, `644`, and `700`, and when do you use each?',
    '`755` (`rwxr-xr-x`) gives owner full rights and group/other read+execute; common for executable scripts and folders. `644` (`rw-r--r--`) gives owner read/write and everyone else read-only; suitable for config files or a README that need no execute permission. `700` (`rwx------`) gives only the owner full rights and nothing to group/other; used for SSH private keys or secret credential files (otherwise SSH errors with "permissions too open"). It is similar to choosing public/package-private/private access modifiers in Java — give each file the minimum privilege it actually needs.'),
  iq('intermediate',
    'Test artifact\'lerini (raporlar, ekran görüntüleri) `tar` ile arşivlerken hangi komutu kullanırsın ve flag\'ler ne anlama gelir?',
    '`tar -czvf test-results.tar.gz reports/` komutunu kullanırım: `-c` yeni arşiv oluştur, `-z` gzip ile sıkıştır, `-v` (verbose) işlenen dosyaları ekrana yazdır, `-f` arşiv dosyasının adını belirtir. CI pipeline\'ında test bittikten sonra raporları ve ekran görüntülerini tek bir `.tar.gz` dosyasına paketleyip artifact olarak yüklerim; bu hem depolama alanından tasarruf eder hem de tek dosya indirmeyi kolaylaştırır. Geri açmak için `tar -xzvf test-results.tar.gz` kullanılır. Java projelerinde `.jar` dosyası oluşturmaya (birden fazla `.class` dosyasını tek pakette toplama) kavramsal olarak çok benzer.',
    'How do you archive test artifacts (reports, screenshots) with `tar`, and what do the flags mean?',
    'I use `tar -czvf test-results.tar.gz reports/`: `-c` creates a new archive, `-z` compresses with gzip, `-v` (verbose) prints each file as it is processed, `-f` names the archive file. After tests finish in a CI pipeline I bundle reports and screenshots into one `.tar.gz` and upload it as an artifact — this saves storage and makes downloading a single file easy. To extract it back, use `tar -xzvf test-results.tar.gz`. It is conceptually very similar to building a `.jar` file in Java — packing multiple `.class` files into a single archive.'),
  iq('intermediate',
    '`curl` ile bir API\'yi test ortamı ayağa kalkar kalkmaz "smoke test" olarak kontrol etmek için nasıl bir komut yazarsın?',
    '`curl -s -o /dev/null -w "%{http_code}" https://api.test.local/health` komutunu kullanırım: `-s` sessiz mod (progress bar gösterme), `-o /dev/null` body\'i çöpe at (sadece status code önemli), `-w "%{http_code}"` ise sadece HTTP durum kodunu yazdırır. CI script\'inde bu kodu bir değişkene atayıp `if [ "$code" != "200" ]; then exit 1; fi` ile servis hazır değilse pipeline\'ı erken durdururum — asıl test suite\'ini çalıştırmadan önce hızlı bir "ayakta mı?" kontrolü. Java\'da `RestTemplate`/`HttpClient` ile bir health endpoint\'ine GET atıp status kodunu assert etmeye birebir karşılık gelir, sadece burada shell script seviyesinde yapılır.',
    'How would you write a `curl` smoke test to check an API right after the test environment comes up?',
    'I use `curl -s -o /dev/null -w "%{http_code}" https://api.test.local/health`: `-s` is silent mode (no progress bar), `-o /dev/null` discards the body (only the status code matters), `-w "%{http_code}"` prints just the HTTP status code. In a CI script I capture that into a variable and run `if [ "$code" != "200" ]; then exit 1; fi` to stop the pipeline early if the service isn\'t ready — a quick "is it alive?" check before running the actual test suite. It maps directly to sending a GET to a health endpoint with `RestTemplate`/`HttpClient` and asserting the status code in Java, just done at the shell-script level.'),
  iq('intermediate',
    'Docker container\'ının "lightweight bir Linux process" olduğunu söylemek ne anlama gelir, bu QA için neden önemlidir?',
    'Bir Docker container, ayrı bir işletim sistemi çalıştırmaz; host makinenin Linux kernel\'ini paylaşır ve sadece dosya sistemi, ağ ve process görünümü açısından izole edilmiş bir process\'tir. Bu yüzden bir container içine `docker exec -it container_id bash` ile girdiğinde, içeride yaptığın `ls`, `ps`, `cat /etc/os-release` gibi komutlar tıpkı normal bir Linux makinesindeki gibi çalışır. QA için önemi şudur: container içinde "Permission denied" veya "command not found" hatası aldığında, bunu normal bir Linux debugging problemi gibi (izinler, PATH, eksik paket) ele alabilirsin — Docker\'a özgü sihirli bir şey değildir. Java analojisi olarak, bir container\'ı JVM içinde çalışan izole bir thread gibi düşünebilirsin: ortam paylaşılır ama görünüm izole edilmiştir.',
    'What does it mean to say a Docker container is "a lightweight Linux process", and why does this matter for QA?',
    'A Docker container does not run a separate operating system; it shares the host machine\'s Linux kernel and is just a process that is isolated in terms of filesystem, network, and process view. That is why, when you `docker exec -it container_id bash` into a container, commands like `ls`, `ps`, `cat /etc/os-release` behave exactly like on a normal Linux machine. For QA, this matters because a "Permission denied" or "command not found" error inside a container can be debugged like a normal Linux problem (permissions, PATH, missing package) — there is no Docker-specific magic involved. As a Java analogy, think of a container like an isolated thread running inside the JVM: the environment is shared, but the view is isolated.'),
  iq('intermediate',
    'Local olarak `app.test.local` gibi bir domain ile test yapmak için `/etc/hosts` dosyasını nasıl kullanırsın?',
    '`/etc/hosts` dosyasına `sudo nano /etc/hosts` ile `127.0.0.1 app.test.local` satırını eklersem, tarayıcı veya test aracı `app.test.local` adresine her gittiğinde DNS sorgusu yapmadan doğrudan `127.0.0.1`\'e (kendi makineme) yönlenir. Bunu, gerçek bir DNS kaydı olmadan, üretim domain\'iyle aynı isimde local bir test ortamı simüle etmek için kullanırım — örneğin cookie/CORS davranışını gerçek domain adıyla test etmek gerektiğinde. Değişiklik anlık etkilidir, DNS cache temizlemeye gerek yoktur çünkü işletim sistemi önce bu dosyaya bakar. Java\'da bir test ortamında `application-test.properties` ile base URL\'i override etmeye benzer bir mantık, ama burada işletim sistemi seviyesinde yapılır.',
    'How do you use `/etc/hosts` to test locally against a domain like `app.test.local`?',
    'Adding `127.0.0.1 app.test.local` to `/etc/hosts` (via `sudo nano /etc/hosts`) makes the browser or test tool resolve `app.test.local` directly to `127.0.0.1` (your own machine) without a DNS lookup. I use this to simulate a local test environment under the same domain name as production without a real DNS record — for example, when cookie/CORS behavior needs to be tested under the real domain name. The change takes effect immediately, no DNS cache flush needed, because the OS checks this file first. It is a similar idea to overriding the base URL with `application-test.properties` in a Java test environment, just done at the OS level.'),
  iq('intermediate',
    'Symbolic link (`ln -s`) nedir, QA otomasyonunda hangi gerçek senaryoda kullanışlıdır?',
    '`ln -s hedef_dosya kisayol_adi` komutu, gerçek dosyaya işaret eden bir kısayol (symbolic link) oluşturur; kısayolu silmek orijinal dosyayı silmez, ama orijinali taşırsan link kırılır. QA otomasyonunda farklı ortam config dosyaları arasında (`config.staging.json`, `config.prod.json`) `ln -s config.staging.json config.json` ile aktif config\'i değiştirmek için kullanırım — kod hep `config.json`\'u okur, sadece linkin işaret ettiği dosya değişir. Java\'da bir interface\'in farklı implementasyonlarını dependency injection ile değiştirmeye benzer; kod aynı isme (`config.json`/interface) bağlıdır, arkasındaki gerçek implementasyon değişir.',
    'What is a symbolic link (`ln -s`), and what real QA automation scenario uses it?',
    '`ln -s target_file shortcut_name` creates a shortcut (symbolic link) pointing to a real file; deleting the link does not delete the original, but moving the original breaks the link. In QA automation I use it to switch between environment config files (`config.staging.json`, `config.prod.json`) with `ln -s config.staging.json config.json` — the code always reads `config.json`, only what the link points to changes. It is similar to swapping different implementations of an interface via dependency injection in Java; the code depends on a fixed name (`config.json`/interface) while the real implementation behind it changes.'),
  iq('intermediate',
    '`awk` veya `sed` ile bir log dosyasından belirli bir sütunu çekmek istiyorsun. Nasıl bir komut yazarsın?',
    'Bir test log satırı `2026-06-19 10:32:01 FAILED test_login` formatındaysa, `awk \'{print $4}\' results.log` ile her satırın 4. alanını (test adını) çekerim — `awk` boşlukla ayrılmış sütunları otomatik olarak `$1`, `$2`, `$3`... şeklinde adlandırır. `sed` ise daha çok arama-değiştirme için kullanılır: `sed \'s/FAILED/❌FAILED/g\' results.log` ile her FAILED kelimesinin önüne emoji ekleyip okunabilirliği artırırım. Bu iki aracı, dosyayı bir editörde açıp manuel düzenlemek yerine script içinde otomatikleştirmek için kullanırım. Java\'da `String.split(" ")[3]` ile bir sütun çekmeye, `String.replaceAll()` ile de arama-değiştirmeye karşılık gelir.',
    'You want to extract a specific column from a log file with `awk` or `sed`. What command would you write?',
    'If a test log line looks like `2026-06-19 10:32:01 FAILED test_login`, I run `awk \'{print $4}\' results.log` to extract the 4th field (the test name) from every line — `awk` automatically names whitespace-separated columns as `$1`, `$2`, `$3`... `sed` is more for search-and-replace: `sed \'s/FAILED/❌FAILED/g\' results.log` adds an emoji before every FAILED word to improve readability. I use these two tools to automate this inside a script instead of manually editing the file in an editor. In Java terms, this maps to extracting a column with `String.split(" ")[3]` and doing search-and-replace with `String.replaceAll()`.'),
  iq('intermediate',
    'Bir test suite\'inin loglarında kaç testin FAILED olduğunu tek bir komutla nasıl sayarsın?',
    '`cat results.log | grep FAILED | wc -l` komutu üç adımı zincirler: `cat` dosyayı okur, `grep FAILED` sadece FAILED içeren satırları filtreler, `wc -l` (word count, line mode) kalan satır sayısını sayar. Bu sonucu CI script\'inde bir değişkene atayıp `if [ "$failed_count" -gt "0" ]; then exit 1; fi` ile pipeline\'ı kırmızı yapabilirim. Java\'da `Files.lines(path).filter(l -> l.contains("FAILED")).count()` ile birebir aynı işi yapar; Stream API\'sindeki filter+count zincirinin shell karşılığıdır.',
    'How do you count how many tests are FAILED in a test suite\'s log with a single command?',
    'The command `cat results.log | grep FAILED | wc -l` chains three steps: `cat` reads the file, `grep FAILED` filters lines containing FAILED, and `wc -l` (word count, line mode) counts the remaining lines. I capture this into a variable in a CI script and run `if [ "$failed_count" -gt "0" ]; then exit 1; fi` to fail the pipeline. It does exactly the same job as `Files.lines(path).filter(l -> l.contains("FAILED")).count()` in Java — the shell equivalent of a filter+count chain in the Stream API.'),
  iq('intermediate',
    'Bir script\'i kendi kullanıcın ile çalıştırdığında "Permission denied" alıyorsun ama başka bir kullanıcı çalıştırabiliyor. Sebebi ne olabilir?',
    'Bu genellikle dosyanın sahibinin (owner) sen olmadığını ve owner permission\'ında `x` (execute) bitinin sadece o kullanıcıya, group/other\'a verilmediğini gösterir; `ls -l` ile `-rwx------` gibi bir çıktı görürsen sadece dosya sahibi çalıştırabilir. Çözüm olarak ya dosya sahibinden `chmod` ile group/other\'a execute izni vermesini isterim, ya da `sudo -u sahip_kullanici ./script.sh` ile o kullanıcı kimliğiyle çalıştırırım, ya da gerekiyorsa `chown` ile sahipliği değiştirtirim (yetkim varsa). Java\'da bir metodun `private` olup başka bir class\'tan çağrılamamasına benzer — erişim izni doğru seviyede tanımlı değildir.',
    'You get "Permission denied" running a script as your own user, but another user can run it. What could be the cause?',
    'This usually means the file is owned by someone else and the owner\'s execute (`x`) bit was only granted to that user, not to group/other; running `ls -l` and seeing `-rwx------` means only the file\'s owner can execute it. The fix is either asking the owner to `chmod` execute permission for group/other, running it as that user with `sudo -u owner_user ./script.sh`, or changing ownership with `chown` if I have the rights to do so. It is similar to a Java method being `private` and unreachable from another class — the access level simply isn\'t defined at the right scope.'),
  iq('intermediate',
    '`:(){ :|:& };:` gibi bir komutun "fork bomb" olarak adlandırılmasının sebebi nedir ve neden tehlikelidir?',
    'Bu kod, `:` adında bir bash fonksiyonu tanımlar ve fonksiyon kendi kendini iki kez (pipe ile) arka planda çağırır; her çağrı yeni bir process (fork) doğurur ve bu üstel olarak katlanarak artar. Saniyeler içinde sistemdeki process tablosunu doldurup CPU/bellek/process ID kaynaklarını tüketir, makineyi tamamen kilitler — gerçek bir denial-of-service yaratır. Bu yüzden CI ortamlarında veya paylaşılan sunucularda kontrolsüz script çalıştırma riskine karşı `ulimit -u` (kullanıcı başına maksimum process sayısı) gibi limitler konur. Java\'da kontrolsüz bir recursive thread oluşturma döngüsünün (her thread iki yeni thread başlatıyor) JVM\'i çökertmesine benzer bir mantık, ama burada işletim sistemi seviyesinde olur.',
    'Why is something like `:(){ :|:& };:` called a "fork bomb", and why is it dangerous?',
    'This code defines a bash function named `:` that calls itself twice (piped) in the background; each call spawns a new process (fork), and this grows exponentially. Within seconds it fills the system\'s process table and exhausts CPU/memory/process-ID resources, completely locking up the machine — a real denial-of-service. That is why CI environments and shared servers set limits like `ulimit -u` (max processes per user) to guard against running uncontrolled scripts. It is similar to an uncontrolled recursive thread-spawning loop in Java (each thread spawning two more) crashing the JVM, except this happens at the operating-system level.'),

  iq('advanced',
    'Bir Jenkins agent\'ı için basit bir health-check bash script\'i nasıl tasarlarsın?',
    'Script\'in başına `set -euo pipefail` koyarım: `-e` herhangi bir komut başarısız olursa script\'i hemen durdurur, `-u` tanımsız bir değişken kullanılırsa hata verir, `-o pipefail` ise pipe içindeki herhangi bir komut başarısız olursa tüm pipe\'ın başarısız sayılmasını sağlar — sessiz hataları engeller. Ardından disk alanı (`df -h`), bellek (`free -m`), kritik servislerin durumu (`systemctl is-active docker`) ve agent\'ın Jenkins master\'a bağlanabilirliğini kontrol eden adımlar eklerim; her kontrol başarısızsa anlamlı bir mesajla `exit 1` ile çıkarım. Script\'i cron veya Jenkins\'in kendi periyodik job\'ı ile düzenli çalıştırıp sonucu bir monitoring sistemine (örn. Slack webhook) gönderirim. Java\'da bir health endpoint\'in birden fazla bağımlılığı (DB, cache, disk) kontrol edip `200`/`503` döndürmesine birebir karşılık gelir; burada shell script\'i o endpoint\'in işini yapar.',
    'How would you design a simple health-check bash script for a Jenkins agent?',
    'I start the script with `set -euo pipefail`: `-e` stops the script immediately if any command fails, `-u` errors on use of an undefined variable, and `-o pipefail` makes the whole pipe fail if any command inside it fails — this prevents silent failures. Then I add steps to check disk space (`df -h`), memory (`free -m`), critical service status (`systemctl is-active docker`), and the agent\'s connectivity to the Jenkins master; on any failed check I exit with `exit 1` and a meaningful message. I run the script regularly via cron or Jenkins\' own periodic job and send the result to a monitoring system (e.g. a Slack webhook). It maps directly to a health endpoint that checks several dependencies (DB, cache, disk) and returns `200`/`503` in Java — here the shell script does that endpoint\'s job.'),
  iq('advanced',
    'Bir test sadece CI\'daki Linux container\'ında flaky/fail oluyor ama local macOS makinende her zaman geçiyor. Nasıl debug edersin?',
    'Önce ortam farklarını listelerim: dosya sistemi case-sensitivity (Linux case-sensitive, macOS varsayılan olarak case-insensitive — `Login.spec.ts` ile `login.spec.ts` local\'de aynı dosya gibi davranabilir, CI\'da iki ayrı dosya olur), satır sonu karakterleri (CRLF vs LF), zaman dilimi/locale farkları ve CPU/bellek limitlerinin container\'da daha kısıtlı olması (timing-sensitive testler). Sonra CI\'da `docker run -it ayni-image bash` ile aynı image\'i local\'de interaktif çalıştırıp testi orada tekrar üretmeye çalışırım — böylece "sadece CI\'da" sorununu local\'de izole ederim. Genellikle kök neden ya bir case-sensitivity hatası, ya container\'ın daha az CPU/bellek vermesinden kaynaklanan bir timeout, ya da locale/timezone farkıdır. Java\'da local\'de geçen ama farklı bir JVM/OS\'de (örn. farklı default locale veya timezone) fail eden bir testin debug sürecine çok benzer.',
    'A test is flaky/fails only in the CI Linux container but always passes on your local macOS machine. How do you debug it?',
    'I first list the environment differences: filesystem case-sensitivity (Linux is case-sensitive, macOS is case-insensitive by default — `Login.spec.ts` and `login.spec.ts` can behave like the same file locally but are two separate files in CI), line endings (CRLF vs LF), timezone/locale differences, and tighter CPU/memory limits in the container (which matters for timing-sensitive tests). Then I run the exact same CI image locally and interactively with `docker run -it same-image bash` to try to reproduce the test there — isolating the "only fails in CI" problem locally. Usually the root cause is a case-sensitivity bug, a timeout caused by the container having less CPU/memory, or a locale/timezone difference. It is very similar to debugging a Java test that passes locally but fails on a different JVM/OS due to a different default locale or timezone.'),
  iq('advanced',
    '"Too many open files" hatası ne anlama gelir, paralel test çalıştırırken bu hatayla nasıl başa çıkarsın?',
    'Linux\'ta her process için açık dosya descriptor sayısına (file, socket, pipe dahil) bir limit (`ulimit -n`) konulmuştur; çok paralel browser instance\'ı veya HTTP bağlantısı açan bir test suite\'i bu limiti aşarsa "too many open files" hatası alırsın. Önce `ulimit -n` ile mevcut limiti görür, gerekiyorsa `ulimit -n 4096` ile (veya kalıcı olarak `/etc/security/limits.conf` içinde) artırırım. Ayrıca testlerin her browser/connection\'ı düzgün kapattığından (`driver.quit()`, `connection.close()`) emin olurum, çünkü gerçek sorun çoğu zaman limit eksikliği değil, kapatılmayan kaynakların sızıntı (leak) yapmasıdır. Java\'daki `java.io.FileNotFoundException: Too many open files` ile birebir aynı işletim sistemi kısıtlamasıdır; Java\'da `try-with-resources` ile kaynakları kapatmak gibi, burada da her açılan dosya/soketin kapatıldığından emin olunmalıdır.',
    'What does "too many open files" mean, and how do you handle it when running parallel tests?',
    'Linux puts a limit (`ulimit -n`) on the number of open file descriptors (files, sockets, pipes included) per process; a test suite opening many parallel browser instances or HTTP connections can exceed that limit and throw "too many open files". I first check the current limit with `ulimit -n`, then raise it with `ulimit -n 4096` (or permanently in `/etc/security/limits.conf`) if needed. I also make sure tests properly close every browser/connection (`driver.quit()`, `connection.close()`), because the real problem is usually leaked resources rather than the limit itself. This is the same OS-level constraint behind Java\'s `java.io.FileNotFoundException: Too many open files`; just like using `try-with-resources` to close resources in Java, every opened file/socket here must be closed too.'),
  iq('advanced',
    'CI agent\'ında bir process\'in bellek tükettiğini ve OOM killer tarafından öldürüldüğünü nasıl teyit edersin?',
    'Önce `top` veya `htop` ile o anda hangi process\'in RES (resident memory) değerinin anormal büyüdüğünü gözlemlerim; eğer process zaten öldüyse `dmesg | grep -i "killed process"` veya `dmesg | grep -i oom` ile kernel log\'unda OOM killer\'ın hangi process\'i, ne zaman ve hangi bellek kullanımıyla öldürdüğünü görürüm. `journalctl -k | grep -i oom` ile de sistemd üzerinden aynı bilgiye ulaşılır. Kök nedeni bulmak için genelde test suite\'inin memory leak yapan bir adımı (örneğin her testte yeni bir browser açıp kapatmamak) veya container\'a tanımlı bellek limitinin gerçek ihtiyaca göre çok düşük olduğunu (Docker `--memory` ayarı) kontrol ederim. Java\'da `OutOfMemoryError` sonrası heap dump analiz etmeye benzer bir süreç, ama burada işletim sistemi seviyesinde JVM\'in kendisi de dahil tüm process\'i öldürür.',
    'How do you confirm that a process on a CI agent consumed memory and was killed by the OOM killer?',
    'I first watch `top` or `htop` to see which process\'s RES (resident memory) value grew abnormally; if the process already died, I check the kernel log with `dmesg | grep -i "killed process"` or `dmesg | grep -i oom` to see which process the OOM killer killed, when, and at what memory usage. `journalctl -k | grep -i oom` gives the same information via systemd. To find the root cause I usually check whether a step in the test suite is leaking memory (e.g. not closing a browser between tests) or whether the container\'s memory limit (Docker `--memory` setting) is simply too low for the real need. It is similar to analyzing a heap dump after a Java `OutOfMemoryError`, except at the OS level it can kill the entire process, JVM included.'),
  iq('advanced',
    'CI agent\'larında büyüyen test loglarının diski doldurmasını önlemek için nasıl bir log rotation stratejisi kurarsın?',
    'Eğer loglar bir sistem servisinden geliyorsa (`/var/log/jenkins/`) `logrotate` konfigürasyonu yazarım: günlük rotasyon, son N günü tut, eski dosyaları `gzip` ile sıkıştır, belirli bir boyutu (`size 100M`) aşınca da rotasyona zorla. Test suite\'imin kendi ürettiği loglar için ise script seviyesinde her çalıştırmada eski raporları temizleyen bir adım (`find reports/ -mtime +7 -delete`) veya CI artifact retention policy\'sini (örneğin GitHub Actions\'ta `retention-days`) kullanırım. Ayrıca büyük log dosyalarını tek seferde commit/push etmek yerine, sadece son N çalıştırmanın özetini saklayıp detaylı logu harici bir storage\'a (S3 gibi) taşımayı tercih ederim. Java\'da `Logback`/`Log4j`\'deki `RollingFileAppender` ile boyut/zaman bazlı log rotasyonu yapmaya kavramsal olarak birebir karşılık gelir.',
    'How would you set up a log rotation strategy so growing test logs don\'t fill the disk on CI agents?',
    'For logs coming from a system service (`/var/log/jenkins/`) I write a `logrotate` configuration: daily rotation, keep the last N days, compress old files with `gzip`, and force rotation once a size threshold (`size 100M`) is hit. For logs my own test suite produces, I add a script-level step that cleans old reports on every run (`find reports/ -mtime +7 -delete`) or rely on the CI\'s artifact retention policy (e.g. `retention-days` in GitHub Actions). I also prefer keeping only a summary of the last N runs and moving detailed logs to external storage (like S3) rather than committing/pushing large log files directly. It conceptually maps directly to size/time-based log rotation with `RollingFileAppender` in `Logback`/`Log4j` in Java.'),
  iq('advanced',
    'Hard link ile symbolic link arasındaki fark nedir, test artifact saklamada bu fark neden önemlidir?',
    'Symbolic link, hedef dosyanın PATH\'ine işaret eden ayrı bir dosyadır; hedef silinirse link "kırık" (broken) kalır. Hard link ise aynı dosyanın diskteki aynı veri bloğuna (inode) işaret eden ikinci bir isimdir; orijinal dosya "silinse" bile veri, hard link üzerinden hâlâ erişilebilir kalır çünkü inode\'un referans sayısı sıfıra düşmeden veri silinmez. Test artifact\'lerini farklı build numaralarıyla saklarken, aynı değişmeyen baseline screenshot\'ını her build için hard link ile referanslamak disk alanından tasarruf ettirir (veri tek kopya, birden fazla isim), ama hard link\'ler aynı dosya sistemi (partition) içinde kalmak zorundadır ve klasörler için kullanılamaz — bu sınırlamaları bilmek doğru aracı seçmeni sağlar. Java\'da bir nesneye iki farklı referans değişkeninin (`Object a = b;`) aynı heap nesnesine işaret etmesine benzer (hard link), symbolic link ise daha çok bir başka referansın adresini tutan bir "pointer to a reference" gibidir.',
    'What is the difference between a hard link and a symbolic link, and why does it matter for storing test artifacts?',
    'A symbolic link is a separate file that points to the target file\'s PATH; if the target is deleted, the link becomes "broken". A hard link is a second name pointing to the exact same data block (inode) on disk as the original; even if the "original" is deleted, the data remains accessible through the hard link because data is only freed once the inode\'s reference count hits zero. When storing test artifacts across build numbers, hard-linking an unchanged baseline screenshot for every build saves disk space (one copy of data, multiple names), but hard links must stay within the same filesystem (partition) and cannot be used for directories — knowing these limits helps you pick the right tool. In Java terms, a hard link is like two reference variables (`Object a = b;`) pointing to the same heap object, while a symbolic link is more like a "pointer to a reference" holding another reference\'s address.'),
  iq('advanced',
    'Environment variable\'ların parent shell\'den child process\'lere veya cron\'a nasıl (ya da nasıl değil) aktarıldığını açıklar mısın? Bu gerçek bir outage\'a nasıl sebep olabilir?',
    'Bir shell\'de tanımlanan değişken (`MY_VAR=123`) varsayılan olarak yalnızca o shell\'e özeldir; `export MY_VAR` ile "exported" hale gelmedikçe başlattığın child process\'lere (yeni bir script, başka bir program) geçmez. Cron, kendi minimal ve genelde login shell\'inden farklı bir environment ile çalıştığı için, senin terminalinde `export` etmiş olduğun ama cron script\'inin başında tekrar tanımlamadığın bir değişken (örn. `API_TOKEN`) cron\'da boş kalır ve script "neden çalışmıyor" diye saatlerce debug edilir. Gerçek bir outage senaryosu: nightly regression suite\'i cron ile tetiklenir, script `$API_TOKEN` kullanarak authentication yapar, ama cron environment\'ında bu değişken tanımlı olmadığı için tüm gece testleri sessizce 401 ile fail eder ve kimse fark etmez çünkü pipeline "çalıştı" görünür (script `set -e` olmadığı için hata kodu yutulmuştur). Çözüm: cron job\'ın çalıştırdığı script\'in başında gerekli tüm değişkenleri explicit olarak kaynak göstermek (`source /etc/profile.d/myvars.sh`) veya crontab içine direkt `MY_VAR=123` satırı eklemek. Java\'da bir Spring uygulamasının local\'de `.env` dosyasından okuduğu bir property\'nin production\'da environment\'a inject edilmemesi yüzünden `NullPointerException` atmasına çok benzer bir sınıf hata.',
    'Explain how environment variables propagate (or don\'t) from a parent shell to child processes or cron. How can this cause a real outage?',
    'A variable defined in a shell (`MY_VAR=123`) is local to that shell by default; it does not pass to child processes (a new script, another program) unless you `export MY_VAR`. Cron runs with its own minimal environment, usually different from your interactive login shell, so a variable you exported in your terminal but never redefined at the top of the cron script (e.g. `API_TOKEN`) comes up empty in cron, and the script gets debugged for hours over "why doesn\'t this work". A real outage scenario: a nightly regression suite is triggered by cron, the script authenticates using `$API_TOKEN`, but since that variable isn\'t defined in cron\'s environment, every test silently fails with 401 all night and nobody notices because the pipeline "ran" (the error code was swallowed since the script wasn\'t using `set -e`). The fix: explicitly source the required variables at the top of the cron script (`source /etc/profile.d/myvars.sh`) or put `MY_VAR=123` directly in the crontab. It is the same class of bug as a Spring application reading a property from a local `.env` file that never gets injected in production, throwing a `NullPointerException`.'),
  iq('advanced',
    'Bir Docker image\'i amd64 mimarisinde build edildi ama Apple Silicon (arm64) bir CI runner\'da "exec format error" veriyor. Sebebi ne, nasıl çözersin?',
    '"exec format error", kernel\'in binary\'nin header\'ına bakıp onu kendi CPU mimarisi için çalıştıramayacağını anladığında verdiği bir hatadır; amd64 (x86_64) için derlenmiş bir binary, arm64 bir CPU\'da doğrudan çalıştırılamaz çünkü makine kodu tamamen farklıdır — bu bir "yanlış konfigürasyon" değil, donanım seviyesinde gerçek bir uyumsuzluktur. Çözüm olarak ya `docker buildx build --platform linux/amd64,linux/arm64 -t image:tag --push .` ile multi-platform image build ederim (her mimari için ayrı katman, Docker doğru olanı otomatik çeker), ya da CI runner\'ı image\'in build edildiği mimariyle eşleştiririm (GitHub Actions\'ta `runs-on: ubuntu-latest` genelde amd64\'tür). QEMU tabanlı emülasyon (`docker run --platform linux/amd64`) de bir geçici çözümdür ama performans kaybı ciddidir, üretim CI\'ında uzun vadeli çözüm değildir. Java\'da derlenmiş native bir binary\'nin (örn. GraalVM native-image ile üretilmiş) farklı bir CPU mimarisinde çalışmamasına benzer; oysa normal bir `.jar` dosyası JVM olduğu her yerde çalışır çünkü bytecode mimariden bağımsızdır — Docker image\'leri ise native binary gibi mimariye bağımlıdır.',
    'A Docker image was built for amd64 but fails with "exec format error" on an Apple Silicon (arm64) CI runner. Why, and how do you fix it?',
    '"exec format error" is what the kernel reports when it looks at a binary\'s header and realizes it cannot execute it for its own CPU architecture; a binary compiled for amd64 (x86_64) cannot run directly on an arm64 CPU because the machine code is fundamentally different — this is not a misconfiguration, it is a real hardware-level incompatibility. The fix is either building a multi-platform image with `docker buildx build --platform linux/amd64,linux/arm64 -t image:tag --push .` (separate layers per architecture, Docker pulls the right one automatically), or matching the CI runner\'s architecture to the one the image was built for (GitHub Actions\' `runs-on: ubuntu-latest` is usually amd64). QEMU-based emulation (`docker run --platform linux/amd64`) is a stopgap but comes with a serious performance cost, not a long-term CI solution. In Java terms, it is similar to a compiled native binary (e.g. produced by GraalVM native-image) failing to run on a different CPU architecture — whereas a normal `.jar` runs anywhere a JVM exists because bytecode is architecture-independent; Docker images, like native binaries, are architecture-bound.'),
  iq('advanced',
    'Ephemeral (kısa ömürlü) CI container\'ları için idempotent bash setup script\'leri yazmak neden önemlidir, nasıl sağlarsın?',
    'Idempotent demek, script\'i bir kere veya on kere çalıştırsan da sonucun aynı kalmasıdır; CI container\'ları her job\'da sıfırdan başladığı için script\'in "zaten var/kurulu" durumlarını kontrol etmeden direkt kuruluma girmesi (örn. her seferinde `mkdir` veya `apt install` her zaman aynı şekilde sorunsuz çalışsa da bazı işlemler değil) hatalara yol açabilir. Bunu sağlamak için her adımı "varsa atla, yoksa oluştur" mantığıyla yazarım: `mkdir -p` (zaten varsa hata vermez), `[ -f config.json ] || cp config.example.json config.json` (sadece yoksa kopyala), paket kurulumunda versiyon pinleme (`apt-get install -y package=1.2.3`) ile farklı çalıştırmalarda farklı versiyon kurulmasını engellerim. Bu özellikle paralel job\'larda veya retry mekanizmasında script iki kez tetiklendiğinde kritik hale gelir — idempotent olmayan bir script ikinci çalıştırmada çökebilir veya tutarsız bir ortam bırakabilir. Java\'da bir migration script\'inin (Flyway/Liquibase) "zaten uygulanmış mı?" kontrolü yapıp tekrar tekrar çalıştırılabilir olmasına birebir karşılık gelir.',
    'Why does writing idempotent bash setup scripts matter for ephemeral CI containers, and how do you achieve it?',
    'Idempotent means running the script once or ten times gives the same result; since CI containers start fresh on every job, a script that jumps straight into setup without checking "is this already there?" can fail (e.g. while `mkdir` and `apt install` are usually safe to repeat, not every operation is). I achieve this by writing every step with a "skip if present, create if not" pattern: `mkdir -p` (no error if it already exists), `[ -f config.json ] || cp config.example.json config.json` (only copy if missing), and pinning package versions (`apt-get install -y package=1.2.3`) so different runs never install different versions. This becomes critical specifically in parallel jobs or retry mechanisms where the script might fire twice — a non-idempotent script can crash on the second run or leave an inconsistent environment. It maps directly to a Java migration tool (Flyway/Liquibase) checking "has this already been applied?" so it can safely be re-run.'),
  iq('advanced',
    'Bir test container\'ını root olarak mı yoksa non-root bir kullanıcı ile mi çalıştırmalısın? Trade-off\'lar nelerdir?',
    'Root olarak çalıştırmak hızlı ve "her şey çalışır" hissi verir çünkü hiçbir izin kısıtlaması yoktur, ama bir güvenlik açığı (örneğin test bağımlılıklarından birinde bulunan kötü niyetli bir paket) container\'ı kırıp host sistemine sızmaya çalıştığında root yetkisiyle çok daha fazla zarar verebilir — bu "least privilege" prensibinin tam tersidir. Non-root bir kullanıcı ile çalıştırmak (`Dockerfile`\'da `USER appuser`) bu riski azaltır ama bazı portlara bind etmek (1024 altı portlar) veya bazı sistem dosyalarına yazmak için ek izin ayarlamak gerekebilir, bu da kurulumu biraz daha karmaşıklaştırır. Pratikte, üretim benzeri güvenlik testleri ve CI\'da non-root tercih ederim; sadece çok hızlı, izole, tek seferlik debug ortamlarında root\'u kabul ederim. Java\'da bir uygulamanın production\'da gereksiz yere admin/root yetkisiyle çalışmaması gerektiği prensibiyle birebir aynı — defense in depth, bir katman kırılsa bile zararı sınırlamak.',
    'Should you run a test container as root or as a non-root user? What are the trade-offs?',
    'Running as root feels fast and "everything just works" because there are no permission restrictions, but if a vulnerability (say, a malicious package in a test dependency) breaks out of the container and tries to reach the host, root privileges let it do far more damage — the opposite of least privilege. Running as a non-root user (`USER appuser` in the `Dockerfile`) reduces that risk but may require extra setup to bind to privileged ports (below 1024) or write to certain system paths, adding a bit of complexity. In practice I prefer non-root for production-like security testing and CI, and only accept root for very fast, isolated, one-off debug environments. It is the same principle as a Java application not needlessly running with admin/root privileges in production — defense in depth, limiting damage even if one layer is breached.'),
  iq('advanced',
    '`set -euo pipefail` bir CI test script\'inin güvenilirliğini nasıl değiştirir? Her flag\'i ayrı ayrı açıklar mısın?',
    'Varsayılan bash davranışında bir komut başarısız olsa bile script bir sonraki satıra geçer — bu CI\'da "test koştu ama sonuç anlamsız" gibi sessiz hatalara yol açar. `-e`, herhangi bir komut sıfırdan farklı bir exit code döndürdüğünde script\'i ANINDA durdurur (bazı özel durumlar, örn. `if` koşulu içindeki komutlar hariç). `-u`, tanımsız bir değişken kullanıldığında (örneğin yazım hatası yapılmış bir değişken adı) script\'i hata ile durdurur, böylece boş string ile sessizce devam edip yanlış bir path\'i silmek gibi tehlikeli durumlar önlenir. `-o pipefail` ise normalde bir pipe\'ın (`cmd1 | cmd2`) sadece SON komutun exit code\'una bakmasını değiştirir — pipe içindeki HERHANGİ bir komut başarısız olursa tüm pipe\'ı başarısız sayar (örneğin `cat olmayan_dosya.log | grep ERROR` normalde `grep`in boş sonucu yüzünden "başarılı" görünür, pipefail ile `cat`in hatası da yakalanır). Üçü birlikte script\'i "sessizce devam etme" yerine "ilk hatada dur ve haber ver" moduna geçirir — Java\'da unchecked exception\'ları yutup devam eden bir try-catch bloğu yerine, hatayı yukarı fırlatıp pipeline\'ı durdurmaya benzer bir güvenlik disiplini.',
    'How does `set -euo pipefail` change the reliability of a CI test script? Can you explain each flag?',
    'By default, bash keeps going to the next line even if a command fails — in CI this leads to silent failures like "the test ran but the result is meaningless". `-e` stops the script IMMEDIATELY when any command returns a non-zero exit code (with a few specific exceptions, like commands inside an `if` condition). `-u` stops the script with an error when an undefined variable is used (e.g. a typo\'d variable name), preventing dangerous situations like silently continuing with an empty string and deleting the wrong path. `-o pipefail` changes the default behavior where a pipe (`cmd1 | cmd2`) only looks at the LAST command\'s exit code — with pipefail, ANY failing command inside the pipe fails the whole pipe (e.g. `cat missing_file.log | grep ERROR` normally looks "successful" because of grep\'s empty result, but pipefail catches cat\'s failure too). Together, these three flags switch the script from "silently keep going" to "stop and report on the first error" — similar to the discipline of letting an exception propagate up to stop a pipeline instead of a try-catch block in Java that swallows unchecked exceptions and continues.'),
  iq('advanced',
    'Paralel CI pipeline\'larında Selenium Grid hub portunda (4444) "Address already in use" hatası alıyorsun. Kök nedeni nasıl bulur, nasıl çözersin?',
    'Bu hata, 4444 portunu zaten dinleyen bir process olduğu anlamına gelir; `sudo ss -tulpn | grep 4444` (veya eski sistemlerde `netstat -tulpn | grep 4444`) ile hangi PID\'in o portu tuttuğunu bulurum. Genellikle kök neden, önceki bir pipeline çalıştırmasının Selenium Grid container\'ını veya process\'ini düzgün durdurmadan (örneğin script `docker-compose down` veya `kill` adımı çalışmadan) bırakmasıdır — paralel job\'lar aynı agent\'ı paylaşıyorsa bu çok daha sık görülür. Kısa vadeli çözüm `kill PID` ile eski process\'i temizlemek; uzun vadeli çözüm her pipeline\'ın `trap` ile (bash\'te `trap \'docker-compose down\' EXIT`) script ne şekilde biterse bitsin (başarı, hata, kesme) temizlik adımının garanti çalışmasını sağlamaktır. Ayrıca her job\'a sabit port yerine dinamik/rastgele port ataması (`-p 0:4444`) yapmak, paralel job\'ların birbirini hiç etkilememesini sağlayan daha sağlam bir mimari tercihtir. Java\'da bir `ServerSocket`\'in `BindException: Address already in use` atmasıyla birebir aynı işletim sistemi davranışıdır; çözüm de aynı prensiptedir — ya eski bağlantıyı temizle ya da port çakışmasını mimariden kaldır.',
    'You get "Address already in use" on the Selenium Grid hub port (4444) in parallel CI pipelines. How do you find the root cause and fix it?',
    'This error means some process is already listening on port 4444; I run `sudo ss -tulpn | grep 4444` (or `netstat -tulpn | grep 4444` on older systems) to find which PID holds that port. The usual root cause is a previous pipeline run leaving the Selenium Grid container or process running without a clean shutdown (e.g. the `docker-compose down` or `kill` step never ran) — this happens far more often when parallel jobs share the same agent. The short-term fix is `kill PID` to clear the old process; the long-term fix is guaranteeing cleanup runs no matter how the script ends (success, error, interruption) using `trap` (in bash, `trap \'docker-compose down\' EXIT`). It is also a more robust architectural choice to assign each job a dynamic/random port (`-p 0:4444`) instead of a fixed one, so parallel jobs never collide at all. It is the exact same OS behavior as a Java `ServerSocket` throwing `BindException: Address already in use`; the fix follows the same principle — clean up the old connection or remove the port collision from the architecture entirely.'),
  iq('advanced',
    'Uzun süre çalışan bir test servisini systemd ile yönetmek, `nohup ... &` ile arka plana almaktan neden daha güvenilirdir?',
    '`nohup command &` ile başlatılan bir process, terminal kapansa da çalışmayı sürdürür, ama process çökerse kimse onu yeniden başlatmaz, log yönetimi manueldir ve makine yeniden başlatıldığında (reboot) servis otomatik ayağa kalkmaz. systemd ile bir `.service` dosyası tanımlamak (`Restart=on-failure`, `RestartSec=5`) servis çökerse otomatik yeniden başlatma, `journalctl` ile merkezi ve yapılandırılabilir log yönetimi, `systemctl enable` ile boot\'ta otomatik başlatma ve bağımlılık yönetimi (örn. "önce veritabanı servisi başlasın") sağlar. Bir mock API veya test ortamı servisini günler boyunca ayakta tutman gerekiyorsa systemd kesinlikle daha sağlam bir seçimdir; `nohup` daha çok hızlı, kısa ömürlü, tek seferlik ihtiyaçlar için uygundur. Java\'da bir uygulamayı `java -jar app.jar &` ile elle arka plana almak yerine, bir process manager (systemd, supervisor) veya container orchestrator (Kubernetes) ile yönetmeye benzer bir olgunluk farkı.',
    'Why is managing a long-running test service with systemd more reliable than backgrounding it with `nohup ... &`?',
    'A process started with `nohup command &` keeps running after the terminal closes, but if it crashes nobody restarts it, log management is manual, and the service won\'t come back automatically after a reboot. Defining a systemd `.service` file (`Restart=on-failure`, `RestartSec=5`) gives you automatic restart on crash, centralized and configurable logging via `journalctl`, automatic startup on boot with `systemctl enable`, and dependency management (e.g. "start after the database service"). If you need a mock API or test environment service to stay up for days, systemd is clearly the more robust choice; `nohup` suits fast, short-lived, one-off needs better. It is the same maturity gap as manually backgrounding a Java app with `java -jar app.jar &` versus managing it with a process manager (systemd, supervisor) or a container orchestrator (Kubernetes).'),
  iq('advanced',
    'Ephemeral cloud test agent\'larına (örn. her pipeline için yeni bir EC2/VM açılıyor) güvenli bir şekilde SSH ile bağlanma stratejin nedir?',
    'Her agent için statik, kalıcı bir SSH key kullanmak yerine, her pipeline çalıştırmasında kısa ömürlü (short-lived) bir sertifika veya tek kullanımlık key çift üreten bir sistem (örn. HashiCorp Vault SSH secrets engine veya bulut sağlayıcının kendi geçici erişim mekanizması) kullanırım — bu, bir key sızsa bile saldırganın erişim penceresinin çok kısa olmasını sağlar. Doğrudan internete açık (public) bir agent\'a SSH yerine, bir bastion/jump host üzerinden bağlanıp gerçek agent\'lara sadece bastion\'dan erişime izin veririm — bu, atak yüzeyini tek bir sıkı kontrol edilen noktaya indirir. Ayrıca her agent\'a sadece o pipeline\'ın ihtiyacı olan minimum yetkiyi (least privilege) veren bir IAM role/policy tanımlar, agent işini bitirdiğinde (job sonunda) otomatik olarak yok edilmesini (terminate) sağlarım — kalıcı olmayan bir makinede kalıcı bir credential biriktirmenin riskini ortadan kaldırır. Java/backend dünyasındaki kısa ömürlü JWT token + refresh token stratejisine kavramsal olarak çok benzer: uzun ömürlü, geniş yetkili bir credential yerine, kısa ömürlü ve dar yetkili olanı tercih edersin.',
    'What is your strategy for securely SSH-ing into ephemeral cloud test agents (e.g. a new EC2/VM spun up for every pipeline run)?',
    'Instead of using a static, permanent SSH key for every agent, I use a system that issues short-lived certificates or one-time key pairs per pipeline run (e.g. HashiCorp Vault\'s SSH secrets engine or the cloud provider\'s own temporary access mechanism) — so even if a key leaks, the attacker\'s window of access is very short. Rather than SSH-ing directly into a public-facing agent, I connect through a bastion/jump host and only allow the real agents to be reached from that bastion — this reduces the attack surface to one tightly controlled point. I also define an IAM role/policy that grants each agent only the minimum privilege (least privilege) that pipeline run actually needs, and ensure the agent terminates automatically once the job finishes — removing the risk of accumulating a permanent credential on a non-permanent machine. This is conceptually very similar to a short-lived JWT token + refresh token strategy in the Java/backend world: you prefer something short-lived and narrowly scoped over something long-lived and broadly privileged.'),
  iq('advanced',
    'Bir CI pipeline\'ında hiçbir log mesajı vermeyen "mystery" bir flaky failure\'ı yakalamak için `strace` gibi düşük seviye bir araç nasıl kullanırsın?',
    '`strace -f -o trace.log ./run-tests.sh` ile script\'in (ve `-f` sayesinde fork ettiği tüm alt process\'lerin) yaptığı HER sistem çağrısını (dosya açma, okuma, ağ bağlantısı, process oluşturma) satır satır kaydederim — uygulama seviyesinde hiçbir log basmasa bile, kernel seviyesinde ne yapmaya çalıştığı görünür hale gelir. Örneğin bir test "hiçbir hata mesajı vermeden" donuyorsa, `trace.log`\'da son satırın bir `connect()` veya `read()` çağrısında takılı kaldığını görüp, gerçek sorunun bir ağ timeout\'u veya bir dosyanın sonsuza dek kilitli kalması olduğunu keşfedebilirim. Bu aracı sadece son çare olarak kullanırım çünkü çıktısı çok detaylı ve okunması yavaştır; önce normal loglama ve `set -x` (bash debug modu) ile daha basit ipuçları ararım. Java\'da bir thread dump veya JFR (Java Flight Recorder) ile "uygulama hiçbir şey loglamıyor ama nerede asılı kaldığını" bulmaya kavramsal olarak birebir karşılık gelir.',
    'How would you use a low-level tool like `strace` to catch a "mystery" flaky CI failure that produces no log output at all?',
    '`strace -f -o trace.log ./run-tests.sh` records every single system call (file opens, reads, network connections, process creation) made by the script and, thanks to `-f`, every child process it forks — even if the application logs nothing, what it tries to do at the kernel level becomes visible. For example, if a test hangs with no error message, I can find the last line in `trace.log` stuck on a `connect()` or `read()` call and discover the real problem is a network timeout or a file locked forever. I treat this as a last resort because the output is extremely verbose and slow to read; I look for simpler clues first with normal logging and `set -x` (bash debug mode). It conceptually maps directly to using a thread dump or JFR (Java Flight Recorder) to find where an application is stuck when it logs nothing.'),
]

const errEntry = (error, fullMessage, causeTr, causeEn, solutionTr, solutionEn, codeWrong, codeFixed) => ({
  error,
  fullMessage,
  cause: { tr: causeTr, en: causeEn },
  solution: { tr: solutionTr, en: solutionEn },
  ...(codeWrong ? { codeWrong } : {}),
  ...(codeFixed ? { codeFixed } : {}),
})

const linuxErrors = [
  errEntry(
    'command not found',
    'bash: pytest: command not found',
    'Komut sistemde kurulu değil veya kurulu olduğu klasör $PATH değişkenine eklenmemiş. Genelde bir araç pip/npm ile kurulduktan sonra terminal yeniden açılmadığı için PATH güncellenmemiş olur.',
    'The command is either not installed, or its install folder is missing from the $PATH variable. This often happens right after installing a tool with pip/npm when the terminal hasn\'t been reopened to pick up the updated PATH.',
    '1) `which pytest` ile kurulu mu kontrol et. 2) Kurulu değilse `pip install pytest`. 3) Kuruluysa ama bulunamıyorsa, kurulum klasörünü `export PATH="$PATH:/kurulum/klasoru"` ile PATH\'e ekle ve `.bashrc`\'ye kalıcı olarak yaz.',
    '1) Check with `which pytest`. 2) If missing, `pip install pytest`. 3) If installed but not found, add the install folder with `export PATH="$PATH:/install/folder"` and persist it in `.bashrc`.',
    '$ pytest tests/\nbash: pytest: command not found',
    '$ pip install --user pytest\n$ export PATH="$PATH:$HOME/.local/bin"\n$ pytest tests/\n========== 12 passed in 2.31s =========='
  ),
  errEntry(
    'Permission denied',
    'bash: ./deploy.sh: Permission denied',
    'Dosyanın execute (x) izni yok; sadece okuma/yazma izniyle bir script doğrudan çalıştırılamaz, sadece içeriği okunabilir.',
    'The file lacks the execute (x) permission; a script with only read/write permission cannot be run directly, only its content can be read.',
    '`chmod +x deploy.sh` ile execute izni ekle, sonra tekrar `./deploy.sh` çalıştır. Kalıcı çözüm için CI script\'inin git\'e execute biti korunarak commit edildiğinden emin ol (`git update-index --chmod=+x deploy.sh`).',
    'Add execute permission with `chmod +x deploy.sh`, then run `./deploy.sh` again. For a lasting fix, make sure the script is committed to git with the execute bit preserved (`git update-index --chmod=+x deploy.sh`).',
    '$ ./deploy.sh\nbash: ./deploy.sh: Permission denied',
    '$ chmod +x deploy.sh\n$ ./deploy.sh\nDeploying test environment...'
  ),
  errEntry(
    'No such file or directory',
    "cat: tests/results.log: No such file or directory",
    'Dosya yolu yanlış yazılmış, dosya henüz oluşturulmamış (örneğin testler henüz çalışmadı) veya script farklı bir working directory\'den çalıştırıldığı için relative path beklenen yerde değil.',
    'The path is mistyped, the file hasn\'t been created yet (e.g. tests haven\'t run yet), or the script is running from a different working directory so the relative path doesn\'t point where expected.',
    '1) `pwd` ile gerçek working directory\'i doğrula. 2) `ls -la` ile dosyanın gerçekten var olup olmadığına bak. 3) Script\'lerde relative path yerine absolute path veya `$(dirname "$0")` kullan.',
    '1) Confirm the real working directory with `pwd`. 2) Check whether the file actually exists with `ls -la`. 3) In scripts, prefer absolute paths or `$(dirname "$0")` over relative paths.',
    '$ cat tests/results.log\ncat: tests/results.log: No such file or directory',
    '$ pwd\n/home/qa/automation\n$ ls -la tests/\n$ cat ./automation/tests/results.log'
  ),
  errEntry(
    'exec format error',
    'standard_init_linux.go:228: exec user process caused: exec format error',
    'Çalıştırılmaya çalışılan binary, makinenin CPU mimarisi için derlenmemiş — örneğin amd64 için build edilmiş bir Docker image arm64 (Apple Silicon) bir makinede çalıştırılıyor.',
    'The binary being executed was not compiled for the machine\'s CPU architecture — for example, a Docker image built for amd64 is being run on an arm64 (Apple Silicon) machine.',
    '`docker buildx build --platform linux/amd64,linux/arm64` ile multi-platform image build et, veya `docker run --platform linux/amd64 ...` ile QEMU emülasyonunu zorla (performans kaybı kabul edilebilirse).',
    'Build a multi-platform image with `docker buildx build --platform linux/amd64,linux/arm64`, or force QEMU emulation with `docker run --platform linux/amd64 ...` if the performance hit is acceptable.',
    '$ docker run myimage:amd64-only\nstandard_init_linux.go:228: exec user process caused: exec format error',
    '$ docker buildx build --platform linux/amd64,linux/arm64 -t myimage:multi --push .\n$ docker run myimage:multi\n# Doğru mimari otomatik seçilir'
  ),
  errEntry(
    'No space left on device',
    'OSError: [Errno 28] No space left on device',
    'Disk bölümü tamamen dolu; genelde rotasyonsuz büyüyen log dosyaları, temizlenmeyen Docker image katmanları veya CI artifact\'lerinin birikmesi sebep olur.',
    'The disk partition is completely full; usually caused by logs growing without rotation, uncleaned Docker image layers, or accumulated CI artifacts.',
    '1) `df -h` ile hangi bölümün dolu olduğunu bul. 2) `du -sh /var/log/* /tmp/* | sort -rh | head -10` ile en büyük tüketicileri bul. 3) Gerekirse `docker system prune -af` ile kullanılmayan image/container\'ları temizle, log rotation kur.',
    '1) Find which partition is full with `df -h`. 2) Find the biggest consumers with `du -sh /var/log/* /tmp/* | sort -rh | head -10`. 3) Clean unused images/containers with `docker system prune -af` if needed, and set up log rotation.',
    '$ pytest tests/ --html=report.html\nOSError: [Errno 28] No space left on device',
    '$ df -h\n$ docker system prune -af\n$ pytest tests/ --html=report.html\n========== 48 passed in 33.2s =========='
  ),
  errEntry(
    'Too many open files',
    'OSError: [Errno 24] Too many open files',
    'Process, işletim sisteminin tanımladığı açık dosya descriptor limitini (`ulimit -n`) aştı; genelde paralel testlerde her browser/connection düzgün kapatılmadığı için kaynaklar sızar (leak).',
    'The process exceeded the OS-defined open file descriptor limit (`ulimit -n`); usually because parallel tests leak resources by not properly closing every browser/connection.',
    '1) `ulimit -n` ile mevcut limiti gör, gerekirse `ulimit -n 4096` ile artır. 2) Testlerde her `driver.quit()`/`connection.close()` çağrısının try/finally veya context manager içinde garanti çalıştığından emin ol.',
    '1) Check the current limit with `ulimit -n`, raise it with `ulimit -n 4096` if needed. 2) Make sure every `driver.quit()`/`connection.close()` call is guaranteed to run inside a try/finally or context manager.',
    '$ pytest -n8 tests/\nOSError: [Errno 24] Too many open files',
    '$ ulimit -n 4096\n# + testlerde driver.quit() finally bloğuna taşındı\n$ pytest -n8 tests/\n========== 96 passed in 41.7s =========='
  ),
  errEntry(
    'Address already in use',
    'OSError: [Errno 98] Address already in use',
    'Bağlanmaya çalıştığın port (örn. Selenium Grid hub 4444) zaten başka bir process tarafından dinleniyor — genelde önceki bir test çalıştırmasının servisini düzgün kapatmadan bırakması sonucu oluşur.',
    'The port you are trying to bind to (e.g. Selenium Grid hub 4444) is already being listened to by another process — usually because a previous test run left its service running without a clean shutdown.',
    '1) `sudo ss -tulpn | grep 4444` ile portu tutan PID\'i bul. 2) `kill PID` ile eski process\'i temizle. 3) Kalıcı çözüm için pipeline\'a `trap \'docker-compose down\' EXIT` ile garanti temizlik ekle veya dinamik port kullan.',
    '1) Find the PID holding the port with `sudo ss -tulpn | grep 4444`. 2) Clean it up with `kill PID`. 3) For a lasting fix, add guaranteed cleanup with `trap \'docker-compose down\' EXIT` in the pipeline, or use a dynamic port.',
    '$ docker-compose up selenium-hub\nOSError: [Errno 98] Address already in use',
    '$ sudo ss -tulpn | grep 4444\n$ kill 18421\n$ docker-compose up selenium-hub\nSelenium Grid hub started on port 4444'
  ),
  errEntry(
    '-bash: syntax error near unexpected token',
    "deploy.sh: line 14: syntax error near unexpected token `fi'",
    'Bash script\'inde bir if/for/while bloğu doğru kapatılmamış (eksik `fi`/`done`), ya da script Windows\'ta CRLF satır sonlarıyla kaydedilip Linux\'a taşınmış ve görünmez `\\r` karakterleri komutları bozuyor.',
    'A bash if/for/while block was not closed properly (missing `fi`/`done`), or the script was saved with Windows CRLF line endings and moved to Linux, where invisible `\\r` characters break commands.',
    '1) Eşleşen `if...fi`, `for...done` çiftlerini gözden geçir. 2) `file deploy.sh` ile "CRLF line terminators" görüyorsan `dos2unix deploy.sh` ile dönüştür. 3) `bash -n deploy.sh` ile script\'i çalıştırmadan sözdizimini kontrol et.',
    '1) Review matching `if...fi`, `for...done` pairs. 2) If `file deploy.sh` shows "CRLF line terminators", convert with `dos2unix deploy.sh`. 3) Check syntax without running it via `bash -n deploy.sh`.',
    "$ ./deploy.sh\ndeploy.sh: line 14: syntax error near unexpected token `fi'",
    '$ dos2unix deploy.sh\n$ bash -n deploy.sh   # sözdizimi OK\n$ ./deploy.sh\nDeploying test environment...'
  ),
]

export const linuxData = {
  en: {
    hero: {
      title: '🐧 Linux',
      subtitle: 'The Command Line for QA Engineers & Test Automation',
      intro: 'Almost every real test environment — Jenkins agents, Docker containers, Kubernetes nodes, GitHub Actions runners, cloud VMs — runs on Linux, not Windows. Learn the shell skills that let you navigate, debug, and automate on the machines your tests actually run on.',
    },
    tabs: ['🎯 Introduction', '⚙️ Installation', '📁 Filesystem & Navigation', '🔐 Permissions & Users', '📝 Text & Pipes', '⚙️ Processes & Services', '🧪 Real-World QA', '🔗 Ecosystem', '🚨 Error Dictionary', '💼 Interview Q&A'],
    sections: [
      // ── SECTION 0: INTRODUCTION ──────────────────────────────────────────
      {
        title: '🎯 What is Linux, and why does a QA engineer need it?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏠',
            content: 'Linux is like the kitchen behind a restaurant. Customers (your test scripts, browsers, apps) rarely see it directly, but almost every dish (test run, deployment, CI pipeline) is actually cooked on this kitchen\'s stove.',
          },
          {
            type: 'text',
            content: 'Your laptop might run Windows or macOS, but the moment your tests move to a CI pipeline, a Docker container, or a cloud server, they almost always land on Linux. Jenkins agents, GitHub Actions runners (ubuntu-latest), Kubernetes nodes, and most Docker base images are Linux. If you can\'t read a Linux terminal, you can\'t fully debug your own test infrastructure.',
          },
          { type: 'heading', text: 'Terminal, Shell, and Kernel — Three Different Things' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🖥️', label: 'Terminal', desc: 'The window/program you type into — just a text input/output surface.' },
              { icon: '🐚', label: 'Shell', desc: 'The program that interprets what you type (bash, zsh) and turns it into action.' },
              { icon: '⚙️', label: 'Kernel', desc: 'The OS core that talks directly to CPU, memory, and disk. The shell talks to it on your behalf.' },
              { icon: '📦', label: 'Distribution', desc: 'Linux kernel + a curated set of tools, packaged together — Ubuntu, Debian, CentOS, Alpine.' },
            ],
          },
          { type: 'heading', text: 'Why QA Engineers Must Know Linux' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              'SSH into a Jenkins/GitHub Actions agent to debug why a pipeline failed',
              'Read raw application logs on a Linux server when a bug only happens "in staging"',
              'Write bash scripts to set up test data, retry flaky suites, or clean environments',
              'Understand what is happening inside a Docker container — it is just a constrained Linux process',
              'Debug "works on my machine" issues where CI runs Linux and your laptop runs Windows/macOS',
            ],
          },
          { type: 'heading', text: 'Windows Commands vs Linux Commands — A Quick Map' },
          {
            type: 'table',
            headers: ['What you want', 'Windows (cmd/PowerShell)', 'Linux (bash)'],
            rows: [
              ['List files', 'dir', 'ls -la'],
              ['Change directory', 'cd', 'cd'],
              ['Show file content', 'type file.txt', 'cat file.txt'],
              ['Search text in file', 'findstr "ERROR" file.txt', 'grep "ERROR" file.txt'],
              ['Copy file', 'copy a.txt b.txt', 'cp a.txt b.txt'],
              ['Delete file', 'del file.txt', 'rm file.txt'],
              ['Current path', 'cd (no args) / %cd%', 'pwd'],
              ['Who am I', 'whoami', 'whoami'],
            ],
          },
          {
            type: 'quiz',
            question: 'What is the correct relationship between terminal, shell, and kernel?',
            options: [
              { id: 'a', text: 'They are three names for the same thing' },
              { id: 'b', text: 'Terminal is the input/output window, shell interprets your commands, kernel talks to hardware' },
              { id: 'c', text: 'Kernel interprets commands, shell talks to hardware' },
              { id: 'd', text: 'Terminal is only available on Linux, not on Windows' },
            ],
            correct: 'b',
            explanation: 'The terminal is just the window. The shell (bash, zsh) interprets what you type. The kernel is the OS core that actually talks to CPU, memory, and disk — the shell forwards your commands down to it.',
          
        retryQuestion: {
      "question": "In a Linux environment, which statement best describes the role of the shell vs the kernel?",
      "options": [
            {
                  "id": "a",
                  "text": "The shell is the hardware driver, and the kernel is the text interface"
            },
            {
                  "id": "b",
                  "text": "The shell acts as a command processor that translates user input into system calls for the kernel"
            },
            {
                  "id": "c",
                  "text": "The kernel is responsible for drawing the terminal window on your screen"
            },
            {
                  "id": "d",
                  "text": "The shell and kernel are identical components in modern Linux distributions"
            }
      ],
      "correct": "b",
      "explanation": "The shell acts as an intermediary or interpreter between the user and the operating system. It takes your commands and executes them by communicating with the kernel, which is the core of the OS that manages hardware resources."
}
},
        ],
      },

      // ── SECTION 1: INSTALLATION ──────────────────────────────────────────
      {
        title: '⚙️ Getting a Linux Environment',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Getting a Linux environment is like getting a practice field before the real match. WSL2 gives you a real Linux field running right inside your Windows machine — no separate computer needed.',
          },
          { type: 'heading', text: 'Windows → WSL2 (Windows Subsystem for Linux)' },
          {
            type: 'installation',
            steps: [
              { cmd: 'wsl --install', explanation: 'Run in PowerShell as Administrator. This installs WSL 2 and a default Ubuntu distribution. Restart your computer afterwards.' },
              { cmd: 'wsl -l -v', explanation: 'Lists installed Linux distributions and confirms they are running version 2 (not the older, slower WSL 1).' },
              { cmd: 'ubuntu', explanation: 'Launches Ubuntu. On first run it asks you to create a Linux username and password — separate from your Windows account.' },
              { cmd: 'sudo apt update && sudo apt upgrade -y', explanation: 'Updates the package list and upgrades installed packages. Run this right after first setup.' },
              { cmd: 'lsb_release -a', explanation: 'Verifies the installation. Expected output includes "Distributor ID: Ubuntu" and a version number like "22.04".' },
            ],
          },
          { type: 'heading', text: 'macOS → You Already Have a Unix Shell' },
          {
            type: 'installation',
            steps: [
              { cmd: 'open -a Terminal', explanation: 'macOS ships with Terminal.app using zsh by default since Catalina. macOS is Unix-based (BSD), not literally Linux, but the vast majority of commands (ls, cd, grep, chmod) behave identically.' },
              { cmd: 'echo $SHELL', explanation: 'Confirms your default shell, usually /bin/zsh.' },
              { cmd: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"', explanation: 'Installs Homebrew, the package manager macOS lacks by default — needed for many Linux-style CLI tools.' },
              { cmd: 'brew install wget', explanation: 'Example: installs a common Linux CLI tool that is not preinstalled on macOS.' },
            ],
          },
          { type: 'heading', text: 'A "Real" Linux Box: Cloud VM or Native Ubuntu' },
          {
            type: 'installation',
            steps: [
              { cmd: '# AWS EC2 free tier: launch an Ubuntu 22.04 t2.micro instance', explanation: 'Gives you a real, internet-reachable Linux server to practice SSH, services, and CI-agent-like conditions on.' },
              { cmd: 'ssh -i my-key.pem ubuntu@<public-ip>', explanation: 'Connects to the instance using your downloaded key pair. First connection asks to confirm the host fingerprint — type "yes".' },
              { cmd: 'lsb_release -a && whoami', explanation: 'Verifies you are really on the Ubuntu box and confirms your username on that machine.' },
            ],
          },
          { type: 'heading', text: 'Verify Your Environment' },
          {
            type: 'code',
            language: 'bash',
            label: 'Confirm everything is ready',
            code: `uname -a              # Kernel name, version, and architecture
lsb_release -a         # Distribution name and version
echo $SHELL            # Your default shell
whoami                 # Your current username
pwd                    # Your current working directory`,
            expected: 'Linux <hostname> 5.15.0-... x86_64\nDistributor ID: Ubuntu  Release: 22.04\n/bin/bash\nqa\n/home/qa',
          },
          {
            type: 'git-practice',
            icon: '🐧',
            title: { tr: 'İlk Linux Oturumun', en: 'Your First Linux Session' },
            intro: { tr: 'WSL/SSH ile bağlandıktan sonra ortamını doğrulamak için doğru sırayı yaz.', en: 'After connecting via WSL/SSH, write the right command order to verify your environment.' },
            help: { tr: 'Komutları sırayla yaz: kim olduğunu, nerede olduğunu ve hangi dağıtımda olduğunu öğren.', en: 'Write the commands in order: find out who you are, where you are, and which distro you are on.' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'pwd çalıştırıldı', en: 'pwd was run' }, pattern: '^pwd$', example: 'pwd' },
              { label: { tr: 'whoami çalıştırıldı', en: 'whoami was run' }, pattern: '^whoami$', example: 'whoami' },
              { label: { tr: 'lsb_release -a çalıştırıldı', en: 'lsb_release -a was run' }, pattern: '^lsb_release\\s+-a$', example: 'lsb_release -a' },
            ],
            dangerousPatterns: [
              { pattern: '\\brm\\s+-rf\\s+/(\\s|$)', label: { tr: 'rm -rf / kök dizini siler — gerçek bir makinede ASLA çalıştırma.', en: 'rm -rf / deletes the root filesystem — NEVER run this on a real machine.' } },
            ],
            successOutput: '/home/qa\nqa\nDistributor ID: Ubuntu\nDescription:    Ubuntu 22.04.3 LTS',
            retryOutput: 'pwd / whoami / lsb_release -a sırasını tamamla.',
          },
          {
            type: 'quiz',
            question: 'Why does WSL2 matter for a Windows-based QA engineer?',
            options: [
              { id: 'a', text: 'It makes Windows run faster' },
              { id: 'b', text: 'It gives you a real Linux kernel running alongside Windows, matching what CI agents and Docker containers actually use' },
              { id: 'c', text: 'It replaces the need for Docker entirely' },
              { id: 'd', text: 'It only works for installing games' },
            ],
            correct: 'b',
            explanation: 'WSL2 runs a real Linux kernel in a lightweight VM inside Windows, so commands, scripts, and tools behave the same way they would on a Jenkins agent or GitHub Actions runner — closing the gap between "works on my machine" and "works in CI".',
          
        retryQuestion: {
      "question": "What is the primary benefit of using WSL2 for local automated testing instead of traditional Windows native tools?",
      "options": [
            {
                  "id": "a",
                  "text": "It removes the need to use a browser for testing"
            },
            {
                  "id": "b",
                  "text": "It ensures environment parity by providing a full Linux kernel environment that mirrors production and CI/CD pipelines"
            },
            {
                  "id": "c",
                  "text": "It automatically converts your test suite to run faster"
            },
            {
                  "id": "d",
                  "text": "It allows Windows to bypass the need for an internet connection during test execution"
            }
      ],
      "correct": "b",
      "explanation": "WSL2 provides a native Linux kernel, which allows QA engineers to run Linux-based automation tools, containers, and scripts directly on Windows. This parity helps prevent environment-specific failures that often occur when moving from development to CI/CD."
}
},
        ],
      },

      // ── SECTION 2: FILESYSTEM & NAVIGATION ───────────────────────────────
      {
        title: '📁 Filesystem & Navigation',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📚',
            content: 'A filesystem is like a library: shelves contain rows, rows contain books, and every book has a full address. An absolute path is the full address from the library entrance; a relative path is "the next shelf over from where you are standing".',
          },
          { type: 'heading', text: 'The Linux Filesystem Tree — Key Directories' },
          {
            type: 'table',
            headers: ['Path', 'What lives there', 'Why QA cares'],
            rows: [
              ['/', 'Root — everything starts here', 'Never delete from here without knowing exactly what you are doing'],
              ['/home/<user>', 'Your personal files', 'Your test projects and scripts usually live here'],
              ['/etc', 'System-wide configuration files', 'App config files, hosts file, cron configs live here'],
              ['/var/log', 'System and application logs', 'The first place to look when a Linux server has a bug'],
              ['/tmp', 'Temporary files, cleared on reboot', 'Safe place for scratch test data, screenshots, scratch reports'],
              ['/usr/bin', 'Installed program binaries', 'Where most CLI tools you call actually live'],
              ['/opt', 'Optional, third-party software', 'Some CI tools and agents install here'],
            ],
          },
          { type: 'heading', text: 'Core Navigation Commands' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📍', label: 'pwd', desc: 'Print working directory — shows your current full path.' },
              { icon: '📂', label: 'ls / ls -la', desc: 'List files; -l for details (permissions, size, date), -a to include hidden files.' },
              { icon: '🚶', label: 'cd', desc: 'Change directory — move to another folder.' },
              { icon: '📁', label: 'mkdir / rmdir', desc: 'Create a folder / delete an EMPTY folder.' },
              { icon: '📄', label: 'touch', desc: 'Create an empty file, or update its timestamp if it exists.' },
              { icon: '🗑️', label: 'rm -r', desc: 'Delete a folder AND everything inside it — be careful.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'linux-terminal-basics',
            icon: '📁',
            color: '#0ea5e9',
            title: { tr: 'Dizin Gezintisi Simülasyonu', en: 'Filesystem Navigation Simulation' },
            description: { tr: 'pwd → ls → cd → cat → grep akışını canlı izle.', en: 'Watch the pwd → ls → cd → cat → grep flow live.' },
          },
          { type: 'heading', text: 'Absolute vs Relative Paths' },
          {
            type: 'table',
            headers: ['Command', 'Type', 'What it means'],
            rows: [
              ['cd /home/qa/projects', 'Absolute', 'Always goes to the exact same place, no matter where you start from'],
              ['cd projects', 'Relative', 'Goes into "projects" inside your CURRENT folder'],
              ['cd ..', 'Relative', 'Goes up one level to the parent folder'],
              ['cd ~', 'Shortcut', 'Jumps straight to your home directory'],
              ['cd -', 'Shortcut', 'Jumps back to the previous directory you were in'],
            ],
          },
          {
            type: 'git-practice',
            icon: '📁',
            title: { tr: 'QA Mühendisi Gibi Gezin', en: 'Navigate Like a QA Engineer' },
            intro: { tr: 'Bir test projesinin içine gir, dosyaları listele, sonra köke geri dön.', en: 'Go inside a test project, list its files, then return to the root.' },
            help: { tr: 'pwd ile başla, cd ile içeri gir, ls -la ile gör, cd .. ile geri çık.', en: 'Start with pwd, go in with cd, see with ls -la, go back with cd ..' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'pwd ile konum kontrol edildi', en: 'Location checked with pwd' }, pattern: '^pwd$', example: 'pwd' },
              { label: { tr: 'test-suite klasörüne girildi', en: 'Entered the test-suite folder' }, pattern: '^cd\\s+test-suite$', example: 'cd test-suite' },
              { label: { tr: 'ls -la ile içerik görüldü', en: 'Contents viewed with ls -la' }, pattern: '^ls\\s+-la$', example: 'ls -la' },
              { label: { tr: 'cd .. ile üst klasöre çıkıldı', en: 'Went up with cd ..' }, pattern: '^cd\\s+\\.\\.$', example: 'cd ..' },
            ],
            successOutput: '/home/qa\n$ cd test-suite\n$ ls -la\ndrwxr-xr-x  app.py  tests/  requirements.txt\n$ cd ..',
            retryOutput: 'pwd → cd test-suite → ls -la → cd .. sırasını tamamla.',
          },
          {
            type: 'quiz',
            question: 'Which command always points to the same location, regardless of where you run it from?',
            options: [
              { id: 'a', text: 'cd projects' },
              { id: 'b', text: 'cd ..' },
              { id: 'c', text: 'cd /home/qa/projects' },
              { id: 'd', text: 'cd -' },
            ],
            correct: 'c',
            explanation: 'cd /home/qa/projects is an absolute path — it starts from the root "/" and always resolves to the exact same location. The other options are all relative to your current location.',
          
        retryQuestion: {
      "question": "Which of the following commands represents a relative path traversal?",
      "options": [
            {
                  "id": "a",
                  "text": "cd /var/log"
            },
            {
                  "id": "b",
                  "text": "cd /usr/local/bin"
            },
            {
                  "id": "c",
                  "text": "cd ../../etc"
            },
            {
                  "id": "d",
                  "text": "cd /root"
            }
      ],
      "correct": "c",
      "explanation": "The path '../../etc' is a relative path because it depends on your current working directory to resolve the destination. Options a, b, and d are absolute paths because they start with '/', indicating they begin at the root directory."
}
},
        ],
      },

      // ── SECTION 3: PERMISSIONS & USERS ───────────────────────────────────
      {
        title: '🔐 Permissions & Users',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔐',
            content: 'File permissions are like a school locker. You (the owner) can open it freely, your classmates (the group) might only be allowed to peek inside, and strangers (other) cannot touch it at all.',
          },
          { type: 'heading', text: 'Reading "ls -l" Output' },
          {
            type: 'text',
            content: 'A line like `-rwxr-xr-- 1 qa qa 4096 Jun 19 10:00 deploy.sh` breaks down as: file type (- = regular file, d = directory), then three groups of three letters for owner / group / other permissions (rwx), a link count, owner name, group name, size, date, and filename.',
          },
          { type: 'heading', text: 'chmod — Numeric Permission Values' },
          {
            type: 'table',
            headers: ['Digit', 'Permission', 'Meaning'],
            rows: [
              ['7', 'rwx', 'Read + Write + Execute'],
              ['6', 'rw-', 'Read + Write'],
              ['5', 'r-x', 'Read + Execute'],
              ['4', 'r--', 'Read only'],
              ['0', '---', 'No permission at all'],
            ],
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '🏃', label: 'chmod 755', desc: 'rwxr-xr-x — owner full control, everyone else read+execute. Common for scripts and folders.' },
              { icon: '📄', label: 'chmod 644', desc: 'rw-r--r-- — owner read+write, everyone else read only. Common for config files.' },
              { icon: '🔑', label: 'chmod 700', desc: 'rwx------ — only the owner has any access. Used for SSH private keys and secrets.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'linux-permissions-lab',
            icon: '🔐',
            color: '#f97316',
            title: { tr: 'Permission Denied Atölyesi', en: 'Permission Denied Workshop' },
            description: { tr: 'Bir CI script\'inin execute izni olmadan neden patladığını gör.', en: 'See exactly why a CI script fails without execute permission.' },
          },
          { type: 'heading', text: 'chown and sudo' },
          {
            type: 'text',
            content: '`chown newowner:newgroup file` changes who owns a file. `sudo` (superuser do) runs a single command with root (administrator) privileges. Never get into the habit of prefixing every command with `sudo` — only use it for commands that genuinely need elevated access, like installing system packages or managing services.',
          },
          {
            type: 'git-practice',
            icon: '🔐',
            title: { tr: 'Script\'i Çalıştırılabilir Yap', en: 'Make the Script Executable' },
            intro: { tr: 'Bir deploy script\'i izinsiz çalışmıyor — sırayı doğru tamamla.', en: 'A deploy script fails without permission — complete the right order.' },
            help: { tr: 'Önce izinleri gör, sonra execute biti ekle, sonra tekrar kontrol et, sonra çalıştır.', en: 'First inspect permissions, then add the execute bit, then recheck, then run it.' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'ls -l ile izinler görüldü', en: 'Permissions inspected with ls -l' }, pattern: '^ls\\s+-l\\s+deploy\\.sh$', example: 'ls -l deploy.sh' },
              { label: { tr: 'chmod +x ile execute eklendi', en: 'Execute permission added with chmod +x' }, pattern: '^chmod\\s+\\+x\\s+deploy\\.sh$', example: 'chmod +x deploy.sh' },
              { label: { tr: './deploy.sh çalıştırıldı', en: './deploy.sh was run' }, pattern: '^\\./deploy\\.sh$', example: './deploy.sh' },
            ],
            dangerousPatterns: [
              { pattern: '\\bchmod\\s+-R\\s+777\\b', label: { tr: 'chmod -R 777 her dosyaya herkese tam yetki verir — gerçek bir sunucuda büyük güvenlik açığıdır.', en: 'chmod -R 777 gives everyone full access to every file — a serious security hole on a real server.' } },
              { pattern: '\\bsudo\\s+rm\\s+-rf\\b', label: { tr: 'sudo rm -rf root yetkisiyle geri alınamaz silme yapar — çok dikkatli kullan.', en: 'sudo rm -rf performs an irreversible delete with root power — use with extreme caution.' } },
            ],
            successOutput: '-rw-r--r-- 1 qa qa 412 deploy.sh\n$ chmod +x deploy.sh\n-rwxr--r-- 1 qa qa 412 deploy.sh\n$ ./deploy.sh\nDeploying test environment...',
            retryOutput: 'ls -l deploy.sh → chmod +x deploy.sh → ./deploy.sh sırasını tamamla.',
          },
          {
            type: 'quiz',
            question: 'A CI pipeline fails with "Permission denied" when running a freshly checked-out script. What is the most likely fix?',
            options: [
              { id: 'a', text: 'Rewrite the script in a different language' },
              { id: 'b', text: 'chmod +x the script, or commit it to git with the execute bit preserved' },
              { id: 'c', text: 'Restart the CI server' },
              { id: 'd', text: 'Rename the file to .sh' },
            ],
            correct: 'b',
            explanation: 'Git can lose the execute bit depending on how a file was added, or the script was simply never made executable. chmod +x adds the missing bit; committing with `git update-index --chmod=+x` preserves it for future checkouts.',
          
        retryQuestion: {
      "question": "A runner in a Jenkins pipeline fails to execute a deployment script with an 'Executable not found' or 'Access denied' error. What is the standard way to handle this in version control?",
      "options": [
            {
                  "id": "a",
                  "text": "Set the file permissions to 777"
            },
            {
                  "id": "b",
                  "text": "Use 'git update-index --chmod=+x' to ensure the execute permission is tracked in the repository"
            },
            {
                  "id": "c",
                  "text": "Convert the script into a binary executable"
            },
            {
                  "id": "d",
                  "text": "Move the script into the /tmp directory"
            }
      ],
      "correct": "b",
      "explanation": "Standard file system permissions are not always preserved during a git clone. By using 'git update-index --chmod=+x', you inform git to track the executable bit of the file, ensuring that any runner cloning the repo will respect the execution permission."
}
},
        ],
      },

      // ── SECTION 4: TEXT & PIPES ───────────────────────────────────────────
      {
        title: '📝 Text & Pipes',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏭',
            content: 'A pipe (|) is like a factory conveyor belt — the output of one machine becomes the raw material for the very next machine, without you having to carry it by hand in between.',
          },
          { type: 'heading', text: 'Viewing Files' },
          {
            type: 'table',
            headers: ['Command', 'What it does', 'When to use it'],
            rows: [
              ['cat file', 'Dumps the whole file to the terminal', 'Short files'],
              ['less file', 'Opens the file page by page, searchable with /term', 'Long log files'],
              ['head -n 20 file', 'Shows the first 20 lines', 'Checking file headers/structure'],
              ['tail -n 20 file', 'Shows the last 20 lines', 'Checking the most recent log entries'],
              ['tail -f file', 'Follows the file live as new lines are appended', 'Watching a test run in real time'],
            ],
          },
          { type: 'heading', text: 'Searching Text — grep' },
          {
            type: 'code',
            language: 'bash',
            label: 'grep examples',
            code: `grep "ERROR" app.log        # lines containing ERROR
grep -i "error" app.log     # case-insensitive
grep -r "TODO" .            # search recursively in every file
grep -n "FAILED" app.log    # show line numbers
grep -v "PASSED" app.log    # invert match: lines that do NOT contain PASSED`,
          },
          { type: 'heading', text: 'Redirection' },
          {
            type: 'table',
            headers: ['Operator', 'Meaning', 'Example'],
            rows: [
              ['>', 'Redirect stdout to a file (overwrite)', 'pytest tests/ > out.log'],
              ['>>', 'Redirect stdout to a file (append)', 'echo "run done" >> history.log'],
              ['2>', 'Redirect stderr only', 'pytest tests/ 2> errors.log'],
              ['2>&1', 'Redirect stderr to the same place as stdout', 'pytest tests/ > full.log 2>&1'],
            ],
          },
          { type: 'heading', text: 'A Real QA Pipeline Example' },
          {
            type: 'code',
            language: 'bash',
            label: 'Count failed tests from a log',
            code: `cat test-results.log | grep FAILED | wc -l
# cat   → read the whole file
# grep  → keep only lines containing FAILED
# wc -l → count how many lines remain`,
            expected: '7',
          },
          {
            type: 'comparison',
            title: { tr: 'Java Stream API vs Bash Pipe', en: 'Java Stream API vs Bash Pipe' },
            left: { label: 'Java Stream', code: 'long failed = Files.lines(path)\n    .filter(l -> l.contains("FAILED"))\n    .count();', note: 'filter → count, in-process' },
            right: { label: 'Bash Pipe', code: 'cat results.log | grep FAILED | wc -l', note: 'filter → count, across separate processes' },
          },
          {
            type: 'git-practice',
            icon: '📝',
            title: { tr: 'Kendi Pipeline\'ını Kur', en: 'Build Your Own Pipeline' },
            intro: { tr: 'Bir log dosyasından kaç ERROR satırı olduğunu bul.', en: 'Find how many ERROR lines exist in a log file.' },
            help: { tr: 'cat ile oku, grep ile filtrele, wc -l ile say.', en: 'Read with cat, filter with grep, count with wc -l.' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'app.log okundu', en: 'app.log was read' }, pattern: '^cat\\s+app\\.log', example: 'cat app.log' },
              { label: { tr: 'ERROR satırları filtrelendi', en: 'ERROR lines filtered' }, pattern: 'grep\\s+(-\\w+\\s+)?"?ERROR"?', example: '| grep ERROR' },
              { label: { tr: 'satır sayısı sayıldı', en: 'lines counted' }, pattern: 'wc\\s+-l', example: '| wc -l' },
            ],
            successOutput: '$ cat app.log | grep ERROR | wc -l\n4',
            retryOutput: 'cat app.log | grep ERROR | wc -l zincirini tamamla.',
          },
          {
            type: 'quiz',
            question: 'What does `2>&1` do when written after `command > out.log`?',
            options: [
              { id: 'a', text: 'It deletes out.log' },
              { id: 'b', text: 'It sends stderr to the same destination as stdout (out.log)' },
              { id: 'c', text: 'It runs the command twice' },
              { id: 'd', text: 'It only works on macOS' },
            ],
            correct: 'b',
            explanation: 'Every process has stdout (1) and stderr (2) as separate streams. `2>&1` redirects stderr to wherever stdout is currently pointing, so both end up merged into the same file — useful for capturing full test output including crashes.',
          
        retryQuestion: {
      "question": "What is the purpose of the syntax '&> error_and_output.log' in a shell command?",
      "options": [
            {
                  "id": "a",
                  "text": "It pipes the command to a background process"
            },
            {
                  "id": "b",
                  "text": "It redirects both stdout and stderr into the specified file"
            },
            {
                  "id": "c",
                  "text": "It forces the command to run with elevated root privileges"
            },
            {
                  "id": "d",
                  "text": "It clears the file contents before appending the new logs"
            }
      ],
      "correct": "b",
      "explanation": "The '&>' syntax is a convenient shorthand for ' > file 2>&1'. It ensures that both the standard output and the standard error stream are captured into the same log file, which is crucial for debugging complex CI/CD failures."
}
},
        ],
      },

      // ── SECTION 5: PROCESSES & SERVICES ──────────────────────────────────
      {
        title: '⚙️ Processes & Services',
        blocks: [
          {
            type: 'simple-box',
            emoji: '👨‍🍳',
            content: 'Processes are like restaurant staff currently on shift. Some take orders right in front of you (foreground), some work quietly in the back kitchen (background/daemon), and sometimes you need to tell one of them to stop immediately (kill).',
          },
          { type: 'heading', text: 'Viewing & Controlling Processes' },
          {
            type: 'table',
            headers: ['Command', 'What it does'],
            rows: [
              ['ps aux', 'Lists every process from every user, with PID, CPU, and memory usage'],
              ['top / htop', 'Live, refreshing view of process resource usage'],
              ['kill PID', 'Asks a process to shut down gracefully (SIGTERM)'],
              ['kill -9 PID', 'Forcefully and immediately kills a process (SIGKILL) — no cleanup'],
              ['pkill name', 'Kills processes by name instead of PID'],
            ],
          },
          { type: 'heading', text: 'Background Jobs' },
          {
            type: 'code',
            language: 'bash',
            label: 'Running things in the background',
            code: `node mock-server.js &     # start in background, get back control immediately
jobs                       # list background jobs in this shell
fg %1                      # bring job 1 back to the foreground
nohup node mock-server.js &  # keep running even if the terminal/SSH session closes`,
          },
          { type: 'heading', text: 'Services with systemd' },
          {
            type: 'code',
            language: 'bash',
            label: 'Managing long-running services',
            code: `systemctl status nginx        # is it running, failed, or stopped?
systemctl start nginx         # start it
systemctl restart nginx       # restart it
systemctl enable nginx        # auto-start on boot
journalctl -u nginx -f        # follow that service's logs live`,
          },
          {
            type: 'callout',
            color: 'orange',
            emoji: '🧯',
            title: { tr: 'Gerçek senaryo: Selenium node\'u CPU\'yu kilitledi', en: 'Real scenario: a Selenium node locked the CPU' },
            content: { tr: '`ps aux | grep selenium` ile suçlu process\'i bul, PID\'ini al, `kill -9 PID` ile öldür ve `ps aux | grep selenium` ile gerçekten gittiğini doğrula.', en: 'Find the culprit process with `ps aux | grep selenium`, grab its PID, kill it with `kill -9 PID`, then confirm with `ps aux | grep selenium` that it is really gone.' },
          },
          { type: 'heading', text: 'Scheduling with cron' },
          {
            type: 'code',
            language: 'bash',
            label: 'crontab -e',
            code: `0 2 * * * /home/qa/run-regression.sh
# minute hour day month weekday  command
# "0 2 * * *" = every day at 02:00`,
          },
          {
            type: 'git-practice',
            icon: '⚙️',
            title: { tr: 'Takılı Process\'i Bul ve Öldür', en: 'Find and Kill a Stuck Process' },
            intro: { tr: 'Bir node process CPU\'yu tüketiyor — onu bul ve durdur.', en: 'A node process is eating CPU — find it and stop it.' },
            help: { tr: 'ps aux ile bul, kill -9 ile durdur, tekrar ps aux ile doğrula.', en: 'Find with ps aux, stop with kill -9, confirm again with ps aux.' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'process arandı', en: 'process searched for' }, pattern: 'ps\\s+aux', example: 'ps aux | grep node' },
              { label: { tr: 'process öldürüldü', en: 'process killed' }, pattern: '^kill\\s+(-9\\s+)?\\d+$', example: 'kill -9 4821' },
              { label: { tr: 'gitmiş olduğu doğrulandı', en: 'confirmed it is gone' }, pattern: 'ps\\s+aux', example: 'ps aux | grep node' },
            ],
            dangerousPatterns: [
              { pattern: '\\bkill\\s+(-9\\s+)?1\\b', label: { tr: 'PID 1, sistemin init process\'idir — onu öldürmek tüm sistemi çökertir.', en: 'PID 1 is the system\'s init process — killing it crashes the entire machine.' } },
              { pattern: ':\\(\\)\\s*\\{\\s*:\\|:&\\s*\\}\\s*;\\s*:', label: { tr: 'Bu bir fork bomb — sistemi process tablosunu doldurup kilitler.', en: 'This is a fork bomb — it fills the process table and locks up the system.' } },
            ],
            successOutput: '$ ps aux | grep node\nqa  4821  99.8  node test-runner.js\n$ kill -9 4821\n$ ps aux | grep node\n(no matching process)',
            retryOutput: 'ps aux ile process\'i bul, kill -9 PID ile durdur, ps aux ile tekrar kontrol et.',
          },
          {
            type: 'quiz',
            question: 'What is the safest first step when a process seems stuck but might still be responsive?',
            options: [
              { id: 'a', text: 'kill -9 immediately' },
              { id: 'b', text: 'Reboot the whole machine' },
              { id: 'c', text: 'Try a plain kill (SIGTERM) first, then kill -9 only if it does not respond' },
              { id: 'd', text: 'Ignore it, it will fix itself' },
            ],
            correct: 'c',
            explanation: 'A plain `kill` sends SIGTERM, giving the process a chance to clean up and exit gracefully. `kill -9` (SIGKILL) gives it zero chance to clean up, so it is reserved for processes that are truly unresponsive.',
          
        retryQuestion: {
      "question": "Which of the following describes the correct approach to terminating a hung process?",
      "options": [
            {
                  "id": "a",
                  "text": "Always send SIGKILL to ensure no zombie processes are left behind"
            },
            {
                  "id": "b",
                  "text": "Use the 'halt' command to stop all system processes"
            },
            {
                  "id": "c",
                  "text": "Issue a SIGTERM first to request a graceful exit, and resort to SIGKILL only if the process is unresponsive"
            },
            {
                  "id": "d",
                  "text": "Immediately run 'rm -rf' on the process's associated files"
            }
      ],
      "correct": "c",
      "explanation": "Sending SIGTERM (default kill) allows a process to perform cleanup tasks like closing database connections or temporary files. SIGKILL (kill -9) bypasses these operations entirely, which can lead to file system corruption or stale lock files."
}
},
        ],
      },

      // ── SECTION 6: REAL-WORLD QA SCENARIOS ───────────────────────────────
      {
        title: '🧪 Real-World QA Scenarios',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏎️',
            content: 'Debugging test infrastructure under pressure is like being a pit crew during a race — you have a short window to diagnose the real problem and get the car (the pipeline) back on track.',
          },
          { type: 'heading', text: 'SSH into a CI Agent' },
          {
            type: 'code',
            language: 'bash',
            label: 'Connecting and inspecting',
            code: `ssh qa@jenkins-agent-01
cd /var/lib/jenkins/workspace/regression-suite
tail -f build.log              # watch the build live
df -h                          # check disk space
ps aux | grep java             # check if the Jenkins agent process is alive`,
          },
          { type: 'heading', text: 'Disk Space Killing Your Pipeline' },
          {
            type: 'code',
            language: 'bash',
            label: 'Finding what is eating disk space',
            code: `df -h                                    # which partition is full?
du -sh /var/log/* /tmp/* | sort -rh | head -10   # biggest space consumers
find /var/log -name "*.log" -mtime +30 -delete   # delete logs older than 30 days`,
          },
          { type: 'heading', text: 'Writing a QA Bash Script' },
          {
            type: 'code',
            language: 'bash',
            label: 'run-regression.sh',
            code: `#!/bin/bash
set -euo pipefail              # stop on error, undefined var, or failed pipe

LOG_FILE="regression-$(date +%Y%m%d-%H%M%S).log"   # unique timestamped log name

echo "Starting regression suite..." | tee "$LOG_FILE"   # log and print at once

if ! pytest tests/ --maxfail=5 -v >> "$LOG_FILE" 2>&1; then  # run tests, capture all output
    echo "Tests failed — see $LOG_FILE" >&2                  # print error to stderr
    exit 1                                                   # exit with failure code
fi

echo "All tests passed!" | tee -a "$LOG_FILE"   # append success message`,
          },
          { type: 'heading', text: 'Networking Basics for API Testing' },
          {
            type: 'code',
            language: 'bash',
            label: 'Quick network/API checks',
            code: `curl -I https://api.test.local/health      # headers only, quick status check
curl -X POST https://api.test.local/login -d '{"u":"qa"}' -H "Content-Type: application/json"
ping -c 4 api.test.local                    # is the host reachable at all?
ss -tulpn | grep 4444                       # what is listening on port 4444?`,
          },
          { type: 'heading', text: 'Finding Files' },
          {
            type: 'code',
            language: 'bash',
            label: 'find examples',
            code: `find . -name "*.spec.ts"            # find all spec files from here down
find /var/log -mmin -60             # files modified in the last 60 minutes
find . -size +100M                  # find suspiciously large files`,
          },
          {
            type: 'callout',
            color: 'red',
            emoji: '🕑',
            title: { tr: 'Klasik tuzak: gece çalışan job neden manuel çalıştırınca farklı davranıyor?', en: 'Classic trap: why does the nightly job behave differently than running it manually?' },
            content: { tr: 'cron, senin interaktif shell\'inden çok daha minimal bir environment ile çalışır. Senin terminalinde export ettiğin bir değişken (örn. API_TOKEN) cron script\'inin başında tekrar tanımlanmazsa sessizce boş kalır.', en: 'cron runs with a far more minimal environment than your interactive shell. A variable you exported in your terminal (e.g. API_TOKEN) silently comes up empty in cron unless it is redefined at the top of the cron script.' },
          },
          {
            type: 'quiz',
            question: 'A nightly cron-triggered test suite fails authentication, but the exact same script works fine when you run it manually. What is the most likely cause?',
            options: [
              { id: 'a', text: 'The internet was down at night' },
              { id: 'b', text: 'cron runs with a minimal environment, and an exported variable from your shell is missing there' },
              { id: 'c', text: 'Cron jobs can only run GET requests' },
              { id: 'd', text: 'The test suite has a syntax error' },
            ],
            correct: 'b',
            explanation: 'cron does not inherit your interactive shell\'s exported environment variables. If a script relies on something like $API_TOKEN that you only exported manually, it will be empty under cron — explicitly define or source it inside the cron script.',
          
        retryQuestion: {
      "question": "You set up a CI pipeline that executes a Selenium test script via a bash file, but it fails every time the CI runner starts it, even though the script runs perfectly on your local machine. What is the most probable issue?",
      "options": [
            {
                  "id": "a",
                  "text": "The CI server lacks a web browser installed"
            },
            {
                  "id": "b",
                  "text": "The CI environment has a limited PATH variable and lacks the user-specific environment variables present in your shell"
            },
            {
                  "id": "c",
                  "text": "Automation scripts cannot execute on virtual servers"
            },
            {
                  "id": "d",
                  "text": "The script file is corrupted during upload"
            }
      ],
      "correct": "b",
      "explanation": "CI/CD runners typically start with a clean, minimal environment. Unlike your local shell, they do not automatically load your ~/.bashrc or ~/.profile. If your script depends on environment variables (like API keys or paths) configured in your local profile, you must explicitly set them in the CI pipeline configuration."
}
},
        ],
      },

      // ── SECTION 7: ECOSYSTEM ─────────────────────────────────────────────
      {
        title: '🔗 Ecosystem',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🌱',
            content: 'Linux is like the soil everything else in modern QA grows from. Docker, Kubernetes, CI/CD runners, and most cloud servers are all rooted in it.',
          },
          { type: 'heading', text: 'Linux & Docker — The Real Relationship' },
          {
            type: 'text',
            content: 'A Docker container is not a separate operating system — it is a constrained Linux process sharing the host machine\'s kernel, isolated only in filesystem, network, and process view. That is exactly why Docker needs WSL2/Hyper-V on Windows: it needs a real Linux kernel to actually run containers on.',
          },
          { type: 'heading', text: 'Linux Distributions for QA' },
          {
            type: 'table',
            headers: ['Distribution', 'Typical use'],
            rows: [
              ['Ubuntu / Debian', 'Most common for CI runners, Jenkins agents, and dev VMs — huge package ecosystem'],
              ['CentOS / RHEL / Rocky Linux', 'Common in enterprise production servers'],
              ['Alpine', 'Tiny (a few MB), used as a base for lean Docker images'],
              ['Amazon Linux', 'Optimized for AWS EC2 instances'],
            ],
          },
          { type: 'heading', text: 'Bash Scripting Essentials' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📦', label: 'Variables', desc: 'NAME="value" — no spaces around =. Use with $NAME or ${NAME}.' },
              { icon: '🔀', label: 'if / then / fi', desc: 'if [ "$STATUS" = "PASSED" ]; then echo "ok"; fi' },
              { icon: '🔁', label: 'for loop', desc: 'for f in *.log; do echo "$f"; done' },
              { icon: '🧩', label: 'functions', desc: 'run_tests() { pytest "$1"; }' },
            ],
          },
          { type: 'heading', text: 'Where Linux Shows Up in Your QA Toolchain' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              'GitHub Actions runners (ubuntu-latest is the most common runner)',
              'Jenkins build agents',
              'Docker base images for test environments',
              'Kubernetes worker nodes',
              'AWS EC2 / Azure VM test servers',
              'Selenium Grid / BrowserStack backend infrastructure',
            ],
          },
          {
            type: 'table',
            headers: ['Aspect', 'Bash (Linux)', 'PowerShell (Windows)'],
            rows: [
              ['Default on', 'Linux, macOS', 'Windows'],
              ['Scripting style', 'Text-stream based pipes', 'Object-based pipeline'],
              ['CI default runner', 'ubuntu-latest (most common)', 'windows-latest (less common, slower to boot)'],
              ['Package ecosystem', 'apt/yum/brew — huge, decades old', 'Growing but smaller for CLI dev tools'],
            ],
          },
          {
            type: 'quiz',
            question: 'Why does Docker on Windows require WSL2 or Hyper-V instead of running containers natively?',
            options: [
              { id: 'a', text: 'Docker does not actually need Linux at all' },
              { id: 'b', text: 'A container shares the host kernel, and Windows does not have a Linux kernel — so a real one must run underneath via WSL2/Hyper-V' },
              { id: 'c', text: 'It is just a marketing decision by Docker Inc.' },
              { id: 'd', text: 'Windows containers and Linux containers are identical' },
            ],
            correct: 'b',
            explanation: 'Containers are isolated Linux processes that share the host kernel. Since Windows does not run a Linux kernel natively, Docker Desktop needs WSL2 (or Hyper-V) to provide a real Linux kernel underneath for Linux containers to actually run on.',
          
        retryQuestion: {
      "question": "What is the primary technical reason why you cannot run a standard Linux Docker image directly on a Windows Server kernel without virtualization or WSL2?",
      "options": [
            {
                  "id": "a",
                  "text": "Windows lacks the graphical interface required for Docker"
            },
            {
                  "id": "b",
                  "text": "Containers require the host OS kernel; since Linux images require a Linux kernel, a lightweight Linux VM is needed to provide that kernel on Windows"
            },
            {
                  "id": "c",
                  "text": "Docker image file systems are incompatible with NTFS"
            },
            {
                  "id": "d",
                  "text": "Network ports on Windows are restricted for Docker containers"
            }
      ],
      "correct": "b",
      "explanation": "Containers are not full virtual machines; they use kernel features like namespaces and cgroups to isolate processes. These features are specific to the Linux kernel. To run a Linux container on Windows, the host must provide a Linux kernel, which is accomplished by running a small Linux utility VM (via WSL2 or Hyper-V)."
}
},
        ],
      },

      // ── SECTION 8: ERROR DICTIONARY ───────────────────────────────────────
      {
        title: '🚨 Error Dictionary',
        blocks: [
          { type: 'error-dictionary', framework: 'Linux', errors: linuxErrors },
          {
            type: 'quiz',
            question: 'A CI agent fails a step with "Permission denied" when running ./deploy.sh, even though the file clearly exists and the content is correct. What is the most likely cause?',
            options: [
              { id: 'a', text: 'The script has a syntax error' },
              { id: 'b', text: 'The file is missing the execute (x) permission bit' },
              { id: 'c', text: 'The disk is full' },
              { id: 'd', text: 'The shell does not support .sh files' },
            ],
            correct: 'b',
            explanation: "Linux checks the execute (x) bit separately from read (r) and write (w) — a file can be fully readable and even editable but still not executable. `chmod +x deploy.sh` fixes it. This is unlike Windows, where a .sh/.bat file's extension alone usually determines whether it can run; Linux relies purely on the permission bits shown by `ls -l` (e.g. rwxr-xr-x).",
            retryQuestion: {
              question: '`ls -l deploy.sh` shows `rw-r--r--`. What is the minimum change needed so the script\'s OWNER can run it with `./deploy.sh`?',
              options: [
                { id: 'a', text: '`chmod 777 deploy.sh`' },
                { id: 'b', text: '`chmod u+x deploy.sh`' },
                { id: 'c', text: '`chown root deploy.sh`' },
                { id: 'd', text: 'Rename the file to deploy.sh.exe' },
              ],
              correct: 'b',
              explanation: '`chmod u+x` adds the execute bit only for the owner (u), turning `rw-r--r--` into `rwxr--r--` — the minimal, correct fix for "owner needs to execute this." `chmod 777` works but grants write+execute to EVERYONE, a real security risk on a shared or CI machine. `chown` only changes ownership, not permissions, and renaming has no effect on Linux (no `.exe` concept).',
            },
          },
        ],
      },

      // ── SECTION 9: INTERVIEW Q&A ──────────────────────────────────────────
      {
        title: '💼 Interview Q&A',
        blocks: [
          { type: 'interview-questions', topic: 'Linux', questions: linuxInterviewQuestions },
        ],
      },
    ],
  },

  tr: {
    hero: {
      title: '🐧 Linux',
      subtitle: 'QA Mühendisleri için Komut Satırı Hakimiyeti',
      intro: 'Jenkins agent\'ları, Docker container\'ları, Kubernetes node\'ları, GitHub Actions runner\'ları ve çoğu cloud VM — hepsi Windows değil, Linux üzerinde çalışır. Testlerinin gerçekten çalıştığı makinelerde gezinmeyi, debug etmeyi ve otomasyon yapmayı öğren.',
    },
    tabs: ['🎯 Giriş', '⚙️ Kurulum', '📁 Dosya Sistemi & Navigasyon', '🔐 İzinler & Kullanıcılar', '📝 Metin İşleme & Pipe\'lar', '⚙️ Süreçler & Servisler', '🧪 Gerçek Hayat QA', '🔗 Ekosistem', '🚨 Hata Sözlüğü', '💼 Mülakat S&C'],
    sections: [
      // ── BÖLÜM 0: GİRİŞ ───────────────────────────────────────────────────
      {
        title: '🎯 Linux nedir, QA mühendisi neden buna ihtiyaç duyar?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏠',
            content: 'Linux, bir restoranın mutfağı gibidir. Müşteriler (test script\'lerin, tarayıcılar, uygulamalar) onu genelde doğrudan görmez, ama her yemek (test çalıştırması, deployment, CI pipeline) gerçekte bu mutfağın ocağında pişer.',
          },
          {
            type: 'text',
            content: 'Laptop\'unda Windows veya macOS çalışıyor olabilir, ama testlerin bir CI pipeline\'ına, Docker container\'ına veya cloud sunucuya taşındığı anda neredeyse her zaman Linux üzerine iniyorlar. Jenkins agent\'ları, GitHub Actions runner\'ları (ubuntu-latest), Kubernetes node\'ları ve çoğu Docker base image\'i Linux\'tur. Linux terminalini okuyamıyorsan, kendi test altyapını tam olarak debug edemezsin.',
          },
          { type: 'heading', text: 'Terminal, Shell ve Kernel — Üç Ayrı Şey' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🖥️', label: 'Terminal', desc: 'Komut yazdığın pencere/program — sadece bir metin giriş/çıkış arayüzü.' },
              { icon: '🐚', label: 'Shell', desc: 'Yazdığın şeyi yorumlayan ve eyleme dönüştüren program (bash, zsh).' },
              { icon: '⚙️', label: 'Kernel', desc: 'CPU, bellek ve disk ile doğrudan konuşan işletim sistemi çekirdeği. Shell senin yerine onunla konuşur.' },
              { icon: '📦', label: 'Distribution (Dağıtım)', desc: 'Linux kernel + özenle seçilmiş araçlar paketi — Ubuntu, Debian, CentOS, Alpine.' },
            ],
          },
          { type: 'heading', text: 'QA Mühendisleri Linux\'u Neden Bilmeli' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              'Bir pipeline neden başarısız oldu diye bir Jenkins/GitHub Actions agent\'ına SSH ile bağlanıp debug etmek',
              'Bir bug sadece "staging\'de" oluştuğunda bir Linux sunucusunda ham uygulama loglarını okumak',
              'Test datası hazırlamak, flaky suite\'leri tekrar denetmek veya ortamı temizlemek için bash script yazmak',
              'Docker container içinde ne olduğunu anlamak — o sadece sınırlandırılmış bir Linux process\'idir',
              'CI Linux\'ta, laptop\'un Windows/macOS\'te çalıştığında oluşan "benim makinemde çalışıyor" sorunlarını debug etmek',
            ],
          },
          { type: 'heading', text: 'Windows Komutları vs Linux Komutları — Hızlı Harita' },
          {
            type: 'table',
            headers: ['Ne istiyorsun', 'Windows (cmd/PowerShell)', 'Linux (bash)'],
            rows: [
              ['Dosyaları listele', 'dir', 'ls -la'],
              ['Dizin değiştir', 'cd', 'cd'],
              ['Dosya içeriğini göster', 'type file.txt', 'cat file.txt'],
              ['Dosyada metin ara', 'findstr "ERROR" file.txt', 'grep "ERROR" file.txt'],
              ['Dosya kopyala', 'copy a.txt b.txt', 'cp a.txt b.txt'],
              ['Dosya sil', 'del file.txt', 'rm file.txt'],
              ['Geçerli yol', 'cd (argümansız) / %cd%', 'pwd'],
              ['Ben kimim', 'whoami', 'whoami'],
            ],
          },
          {
            type: 'quiz',
            question: 'Terminal, shell ve kernel arasındaki doğru ilişki nedir?',
            options: [
              { id: 'a', text: 'Üçü aynı şeyin farklı adlarıdır' },
              { id: 'b', text: 'Terminal giriş/çıkış penceresidir, shell komutlarını yorumlar, kernel donanımla konuşur' },
              { id: 'c', text: 'Kernel komutları yorumlar, shell donanımla konuşur' },
              { id: 'd', text: 'Terminal sadece Linux\'ta vardır, Windows\'ta yoktur' },
            ],
            correct: 'b',
            explanation: 'Terminal sadece penceredir. Shell (bash, zsh) yazdığın şeyi yorumlar. Kernel ise CPU, bellek ve diskle gerçekten konuşan işletim sistemi çekirdeğidir — shell komutlarını ona iletir.',
          
        retryQuestion: {
      "question": {
            "tr": "Bir kullanıcı bir terminale 'ls -l' yazdığında, işletim sistemi içerisinde görev paylaşımı nasıl gerçekleşir?",
            "en": "When a user types 'ls -l' into a terminal, how is the task distributed within the operating system?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Terminal komutu doğrudan donanıma gönderir",
                        "en": "The terminal sends the command directly to the hardware"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Terminal arayüzü sağlar, shell komutu ayrıştırır, kernel ise dosya sistemine erişerek işlemi yapar",
                        "en": "The terminal provides the interface, the shell parses the command, and the kernel accesses the file system to perform the action"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Kernel komutları metin olarak okur, shell ise donanım sürücülerini yönetir",
                        "en": "The kernel reads the command as text, and the shell manages hardware drivers"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece shell tüm süreci tek başına yönetir",
                        "en": "Only the shell manages the entire process alone"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Terminal sadece komut girişi için bir penceredir. Shell komutu işler ve anlamlı hale getirir. Ancak dosya sistemini listelemek veya donanıma erişmek için kernel'in (çekirdek) yetkilerine ve yönetimine ihtiyaç duyar.",
            "en": "The terminal is simply a window for input. The shell interprets the command. However, to list the file system or access hardware, it must request resources via the kernel, which performs the actual low-level operations."
      }
}
},
        ],
      },

      // ── BÖLÜM 1: KURULUM ──────────────────────────────────────────────────
      {
        title: '⚙️ Bir Linux Ortamı Edinmek',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🛠️',
            content: 'Bir Linux ortamı edinmek, gerçek maça çıkmadan önce bir antrenman sahası bulmak gibidir. WSL2 sana Windows makinenin içinde çalışan gerçek bir Linux sahası verir — ayrı bir bilgisayara gerek yoktur.',
          },
          { type: 'heading', text: 'Windows → WSL2 (Windows Subsystem for Linux)' },
          {
            type: 'installation',
            steps: [
              { cmd: 'wsl --install', explanation: 'PowerShell\'i Yönetici olarak aç ve çalıştır. Bu, WSL 2\'yi ve varsayılan bir Ubuntu dağıtımını kurar. Sonrasında bilgisayarı yeniden başlat.' },
              { cmd: 'wsl -l -v', explanation: 'Kurulu Linux dağıtımlarını listeler ve bunların eski/yavaş WSL 1 değil, versiyon 2 üzerinde çalıştığını doğrular.' },
              { cmd: 'ubuntu', explanation: 'Ubuntu\'yu başlatır. İlk çalıştırmada bir Linux kullanıcı adı ve parola oluşturman istenir — Windows hesabından ayrıdır.' },
              { cmd: 'sudo apt update && sudo apt upgrade -y', explanation: 'Paket listesini güncelleyip kurulu paketleri yükseltir. İlk kurulumdan hemen sonra çalıştır.' },
              { cmd: 'lsb_release -a', explanation: 'Kurulumu doğrular. Beklenen çıktıda "Distributor ID: Ubuntu" ve "22.04" gibi bir versiyon numarası olmalı.' },
            ],
          },
          { type: 'heading', text: 'macOS → Zaten Bir Unix Shell\'in Var' },
          {
            type: 'installation',
            steps: [
              { cmd: 'open -a Terminal', explanation: 'macOS, Catalina\'dan itibaren varsayılan olarak zsh kullanan Terminal.app ile gelir. macOS Unix tabanlıdır (BSD), tam olarak Linux değildir, ama komutların büyük çoğunluğu (ls, cd, grep, chmod) aynı şekilde davranır.' },
              { cmd: 'echo $SHELL', explanation: 'Varsayılan shell\'ini doğrular, genelde /bin/zsh.' },
              { cmd: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"', explanation: 'macOS\'un varsayılan olarak eksik olduğu paket yöneticisi Homebrew\'i kurar — birçok Linux tarzı CLI aracı için gereklidir.' },
              { cmd: 'brew install wget', explanation: 'Örnek: macOS\'ta önceden kurulu olmayan yaygın bir Linux CLI aracını kurar.' },
            ],
          },
          { type: 'heading', text: '"Gerçek" Bir Linux Kutusu: Cloud VM veya Native Ubuntu' },
          {
            type: 'installation',
            steps: [
              { cmd: '# AWS EC2 ücretsiz katman: Ubuntu 22.04 t2.micro instance başlat', explanation: 'SSH, servisler ve CI-agent benzeri koşulları üzerinde pratik yapabileceğin, internete açık gerçek bir Linux sunucusu verir.' },
              { cmd: 'ssh -i my-key.pem ubuntu@<public-ip>', explanation: 'İndirdiğin key pair ile instance\'a bağlanır. İlk bağlantıda host fingerprint\'ini onaylaman istenir — "yes" yaz.' },
              { cmd: 'lsb_release -a && whoami', explanation: 'Gerçekten Ubuntu kutusunda olduğunu doğrular ve o makinedeki kullanıcı adını teyit eder.' },
            ],
          },
          { type: 'heading', text: 'Ortamını Doğrula' },
          {
            type: 'code',
            language: 'bash',
            label: 'Her şeyin hazır olduğunu doğrula',
            code: `uname -a              # Kernel adı, versiyonu ve mimarisi
lsb_release -a         # Dağıtım adı ve versiyonu
echo $SHELL            # Varsayılan shell'in
whoami                 # Şu anki kullanıcı adın
pwd                    # Şu anki çalışma dizinin`,
            expected: 'Linux <hostname> 5.15.0-... x86_64\nDistributor ID: Ubuntu  Release: 22.04\n/bin/bash\nqa\n/home/qa',
          },
          {
            type: 'git-practice',
            icon: '🐧',
            title: { tr: 'İlk Linux Oturumun', en: 'Your First Linux Session' },
            intro: { tr: 'WSL/SSH ile bağlandıktan sonra ortamını doğrulamak için doğru sırayı yaz.', en: 'After connecting via WSL/SSH, write the right command order to verify your environment.' },
            help: { tr: 'Komutları sırayla yaz: kim olduğunu, nerede olduğunu ve hangi dağıtımda olduğunu öğren.', en: 'Write the commands in order: find out who you are, where you are, and which distro you are on.' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'pwd çalıştırıldı', en: 'pwd was run' }, pattern: '^pwd$', example: 'pwd' },
              { label: { tr: 'whoami çalıştırıldı', en: 'whoami was run' }, pattern: '^whoami$', example: 'whoami' },
              { label: { tr: 'lsb_release -a çalıştırıldı', en: 'lsb_release -a was run' }, pattern: '^lsb_release\\s+-a$', example: 'lsb_release -a' },
            ],
            dangerousPatterns: [
              { pattern: '\\brm\\s+-rf\\s+/(\\s|$)', label: { tr: 'rm -rf / kök dizini siler — gerçek bir makinede ASLA çalıştırma.', en: 'rm -rf / deletes the root filesystem — NEVER run this on a real machine.' } },
            ],
            successOutput: '/home/qa\nqa\nDistributor ID: Ubuntu\nDescription:    Ubuntu 22.04.3 LTS',
            retryOutput: 'pwd → whoami → lsb_release -a sırasını tamamla.',
          },
          {
            type: 'quiz',
            question: 'WSL2, Windows kullanan bir QA mühendisi için neden önemlidir?',
            options: [
              { id: 'a', text: 'Windows\'u hızlandırır' },
              { id: 'b', text: 'Windows içinde gerçek bir Linux kernel çalıştırır, CI agent\'ları ve Docker container\'larının kullandığıyla aynıdır' },
              { id: 'c', text: 'Docker\'a olan ihtiyacı tamamen ortadan kaldırır' },
              { id: 'd', text: 'Sadece oyun kurulumu için işe yarar' },
            ],
            correct: 'b',
            explanation: 'WSL2, Windows içinde hafif bir VM\'de gerçek bir Linux kernel çalıştırır, böylece komutlar, script\'ler ve araçlar bir Jenkins agent\'ında veya GitHub Actions runner\'ında olduğu gibi davranır — "benim makinemde çalışıyor" ile "CI\'da çalışıyor" arasındaki farkı kapatır.',
          
        retryQuestion: {
      "question": "Bir QA otomasyon projesinde WSL2 kullanmanın ana avantajı nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Windows'un grafik performansını artırır"
            },
            {
                  "id": "b",
                  "text": "Linux tabanlı test araçlarının Windows üzerinde yerel (native) performans ve uyumlulukla çalışmasını sağlar"
            },
            {
                  "id": "c",
                  "text": "Windows'taki virüs programlarını devre dışı bırakır"
            },
            {
                  "id": "d",
                  "text": "Test sonuçlarının sadece tarayıcıda görülmesini sağlar"
            }
      ],
      "correct": "b",
      "explanation": "WSL2, tam bir Linux çekirdeği entegrasyonu sunarak, Linux ortamı gerektiren otomasyon araçlarının (Node.js, Playwright, bash scriptler vb.) Windows üzerinde sorunsuz ve performanslı bir şekilde çalışmasına imkan tanır."
}
},
        ],
      },

      // ── BÖLÜM 2: DOSYA SİSTEMİ & NAVİGASYON ─────────────────────────────
      {
        title: '📁 Dosya Sistemi & Navigasyon',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📚',
            content: 'Dosya sistemi bir kütüphane gibidir: raflar sıralar içerir, sıralar kitaplar içerir, her kitabın tam bir adresi vardır. Absolute path, kütüphane girişinden başlayan tam adrestir; relative path ise "şu an durduğun yerden bir raf öteki" demektir.',
          },
          { type: 'heading', text: 'Linux Dosya Sistemi Ağacı — Kilit Klasörler' },
          {
            type: 'table',
            headers: ['Path', 'Ne barınır', 'QA neden önemser'],
            rows: [
              ['/', 'Root — her şey buradan başlar', 'Tam ne yaptığını bilmeden buradan asla bir şey silmeyin'],
              ['/home/<kullanici>', 'Kişisel dosyaların', 'Test projelerin ve script\'lerin genelde burada yaşar'],
              ['/etc', 'Sistem genelinde konfigürasyon dosyaları', 'Uygulama config dosyaları, hosts dosyası, cron config\'leri burada'],
              ['/var/log', 'Sistem ve uygulama logları', 'Bir Linux sunucusunda bug aranırken bakılacak ilk yer'],
              ['/tmp', 'Geçici dosyalar, reboot\'ta temizlenir', 'Scratch test datası, ekran görüntüleri, geçici raporlar için güvenli yer'],
              ['/usr/bin', 'Kurulu program binary\'leri', 'Çağırdığın çoğu CLI aracının gerçekte yaşadığı yer'],
              ['/opt', 'Opsiyonel, üçüncü parti yazılım', 'Bazı CI araçları ve agent\'lar buraya kurulur'],
            ],
          },
          { type: 'heading', text: 'Temel Navigasyon Komutları' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📍', label: 'pwd', desc: 'Print working directory — şu anki tam yolunu gösterir.' },
              { icon: '📂', label: 'ls / ls -la', desc: 'Dosyaları listeler; -l detaylar için (izinler, boyut, tarih), -a gizli dosyaları da göstermek için.' },
              { icon: '🚶', label: 'cd', desc: 'Change directory — başka bir klasöre geç.' },
              { icon: '📁', label: 'mkdir / rmdir', desc: 'Klasör oluştur / sadece BOŞ bir klasörü sil.' },
              { icon: '📄', label: 'touch', desc: 'Boş bir dosya oluşturur, ya da varsa zaman damgasını günceller.' },
              { icon: '🗑️', label: 'rm -r', desc: 'Klasörü içindeki HER ŞEYLE birlikte siler — dikkatli ol.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'linux-terminal-basics',
            icon: '📁',
            color: '#0ea5e9',
            title: { tr: 'Dizin Gezintisi Simülasyonu', en: 'Filesystem Navigation Simulation' },
            description: { tr: 'pwd → ls → cd → cat → grep akışını canlı izle.', en: 'Watch the pwd → ls → cd → cat → grep flow live.' },
          },
          { type: 'heading', text: 'Absolute vs Relative Path' },
          {
            type: 'table',
            headers: ['Komut', 'Tip', 'Ne anlama gelir'],
            rows: [
              ['cd /home/qa/projects', 'Absolute', 'Nereden başlarsan başla her zaman tam aynı yere gider'],
              ['cd projects', 'Relative', 'ŞU ANKİ klasörün içindeki "projects"e gider'],
              ['cd ..', 'Relative', 'Bir üst seviyeye, parent klasöre çıkar'],
              ['cd ~', 'Kısayol', 'Doğrudan home dizinine zıplar'],
              ['cd -', 'Kısayol', 'Az önce bulunduğun dizine geri zıplar'],
            ],
          },
          {
            type: 'git-practice',
            icon: '📁',
            title: { tr: 'QA Mühendisi Gibi Gezin', en: 'Navigate Like a QA Engineer' },
            intro: { tr: 'Bir test projesinin içine gir, dosyaları listele, sonra köke geri dön.', en: 'Go inside a test project, list its files, then return to the root.' },
            help: { tr: 'pwd ile başla, cd ile içeri gir, ls -la ile gör, cd .. ile geri çık.', en: 'Start with pwd, go in with cd, see with ls -la, go back with cd ..' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'pwd ile konum kontrol edildi', en: 'Location checked with pwd' }, pattern: '^pwd$', example: 'pwd' },
              { label: { tr: 'test-suite klasörüne girildi', en: 'Entered the test-suite folder' }, pattern: '^cd\\s+test-suite$', example: 'cd test-suite' },
              { label: { tr: 'ls -la ile içerik görüldü', en: 'Contents viewed with ls -la' }, pattern: '^ls\\s+-la$', example: 'ls -la' },
              { label: { tr: 'cd .. ile üst klasöre çıkıldı', en: 'Went up with cd ..' }, pattern: '^cd\\s+\\.\\.$', example: 'cd ..' },
            ],
            successOutput: '/home/qa\n$ cd test-suite\n$ ls -la\ndrwxr-xr-x  app.py  tests/  requirements.txt\n$ cd ..',
            retryOutput: 'pwd → cd test-suite → ls -la → cd .. sırasını tamamla.',
          },
          {
            type: 'quiz',
            question: 'Hangi komut, nereden çalıştırırsan çalıştır her zaman aynı yere işaret eder?',
            options: [
              { id: 'a', text: 'cd projects' },
              { id: 'b', text: 'cd ..' },
              { id: 'c', text: 'cd /home/qa/projects' },
              { id: 'd', text: 'cd -' },
            ],
            correct: 'c',
            explanation: 'cd /home/qa/projects absolute bir path\'tir — kök "/"dan başlar ve her zaman tam olarak aynı konuma çözülür. Diğer seçenekler şu anki konumuna göre relative\'dir.',
          
        retryQuestion: {
      "question": "Aşağıdaki komutlardan hangisi çalışma dizininden bağımsız olarak her zaman aynı dizine gitmeyi garantiler?",
      "options": [
            {
                  "id": "a",
                  "text": "cd bin"
            },
            {
                  "id": "b",
                  "text": "cd ../tests"
            },
            {
                  "id": "c",
                  "text": "cd /var/jenkins_home/workspace"
            },
            {
                  "id": "d",
                  "text": "cd ./app"
            }
      ],
      "correct": "c",
      "explanation": "Başında \"/\" bulunan yollar absolute (mutlak) yollardır. Dosya sisteminin en kökünden başlarlar, bu yüzden terminaldeki mevcut çalışma dizininiz ne olursa olsun her zaman aynı klasöre giriş yaparlar."
}
},
        ],
      },

      // ── BÖLÜM 3: İZİNLER & KULLANICILAR ─────────────────────────────────
      {
        title: '🔐 İzinler & Kullanıcılar',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔐',
            content: 'Dosya izinleri bir okul dolabı gibidir. Sen (owner) onu serbestçe açabilirsin, sınıf arkadaşların (group) belki sadece içine bakabilir, yabancılar (other) ise ona hiç dokunamaz.',
          },
          { type: 'heading', text: '"ls -l" Çıktısını Okumak' },
          {
            type: 'text',
            content: '`-rwxr-xr-- 1 qa qa 4096 Jun 19 10:00 deploy.sh` gibi bir satır şöyle ayrışır: dosya tipi (- = normal dosya, d = klasör), ardından owner / group / other için üçer harflik üç grup izin (rwx), bir link sayısı, sahip adı, grup adı, boyut, tarih ve dosya adı.',
          },
          { type: 'heading', text: 'chmod — Sayısal İzin Değerleri' },
          {
            type: 'table',
            headers: ['Rakam', 'İzin', 'Anlamı'],
            rows: [
              ['7', 'rwx', 'Okuma + Yazma + Çalıştırma'],
              ['6', 'rw-', 'Okuma + Yazma'],
              ['5', 'r-x', 'Okuma + Çalıştırma'],
              ['4', 'r--', 'Sadece okuma'],
              ['0', '---', 'Hiç izin yok'],
            ],
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '🏃', label: 'chmod 755', desc: 'rwxr-xr-x — owner tam kontrol, herkes diğer okuma+çalıştırma. Script ve klasörler için yaygın.' },
              { icon: '📄', label: 'chmod 644', desc: 'rw-r--r-- — owner okuma+yazma, herkes diğer sadece okuma. Konfigürasyon dosyaları için yaygın.' },
              { icon: '🔑', label: 'chmod 700', desc: 'rwx------ — sadece owner\'ın herhangi bir erişimi var. SSH private key\'leri ve secret\'lar için kullanılır.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'linux-permissions-lab',
            icon: '🔐',
            color: '#f97316',
            title: { tr: 'Permission Denied Atölyesi', en: 'Permission Denied Workshop' },
            description: { tr: 'Bir CI script\'inin execute izni olmadan neden patladığını gör.', en: 'See exactly why a CI script fails without execute permission.' },
          },
          { type: 'heading', text: 'chown ve sudo' },
          {
            type: 'text',
            content: '`chown yenisahip:yenigrup dosya` bir dosyanın sahibini değiştirir. `sudo` (superuser do) tek bir komutu root (yönetici) yetkisiyle çalıştırır. Her komutun önüne reflekssel olarak `sudo` koyma alışkanlığı edinme — sadece gerçekten yükseltilmiş erişim gereken komutlarda kullan, örn. sistem paketi kurmak veya servisleri yönetmek.',
          },
          {
            type: 'git-practice',
            icon: '🔐',
            title: { tr: 'Script\'i Çalıştırılabilir Yap', en: 'Make the Script Executable' },
            intro: { tr: 'Bir deploy script\'i izinsiz çalışmıyor — sırayı doğru tamamla.', en: 'A deploy script fails without permission — complete the right order.' },
            help: { tr: 'Önce izinleri gör, sonra execute biti ekle, sonra tekrar kontrol et, sonra çalıştır.', en: 'First inspect permissions, then add the execute bit, then recheck, then run it.' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'ls -l ile izinler görüldü', en: 'Permissions inspected with ls -l' }, pattern: '^ls\\s+-l\\s+deploy\\.sh$', example: 'ls -l deploy.sh' },
              { label: { tr: 'chmod +x ile execute eklendi', en: 'Execute permission added with chmod +x' }, pattern: '^chmod\\s+\\+x\\s+deploy\\.sh$', example: 'chmod +x deploy.sh' },
              { label: { tr: './deploy.sh çalıştırıldı', en: './deploy.sh was run' }, pattern: '^\\./deploy\\.sh$', example: './deploy.sh' },
            ],
            dangerousPatterns: [
              { pattern: '\\bchmod\\s+-R\\s+777\\b', label: { tr: 'chmod -R 777 her dosyaya herkese tam yetki verir — gerçek bir sunucuda büyük güvenlik açığıdır.', en: 'chmod -R 777 gives everyone full access to every file — a serious security hole on a real server.' } },
              { pattern: '\\bsudo\\s+rm\\s+-rf\\b', label: { tr: 'sudo rm -rf root yetkisiyle geri alınamaz silme yapar — çok dikkatli kullan.', en: 'sudo rm -rf performs an irreversible delete with root power — use with extreme caution.' } },
            ],
            successOutput: '-rw-r--r-- 1 qa qa 412 deploy.sh\n$ chmod +x deploy.sh\n-rwxr--r-- 1 qa qa 412 deploy.sh\n$ ./deploy.sh\nDeploying test environment...',
            retryOutput: 'ls -l deploy.sh → chmod +x deploy.sh → ./deploy.sh sırasını tamamla.',
          },
          {
            type: 'quiz',
            question: 'Bir CI pipeline\'ı az önce checkout edilen bir script\'i çalıştırırken "Permission denied" veriyor. En olası çözüm nedir?',
            options: [
              { id: 'a', text: 'Script\'i farklı bir dilde yeniden yaz' },
              { id: 'b', text: 'chmod +x ile execute izni ekle, veya git\'e execute biti korunarak commit et' },
              { id: 'c', text: 'CI sunucusunu yeniden başlat' },
              { id: 'd', text: 'Dosyayı .sh olarak yeniden adlandır' },
            ],
            correct: 'b',
            explanation: 'Git, dosyanın nasıl eklendiğine bağlı olarak execute bitini kaybedebilir, ya da script hiç çalıştırılabilir yapılmamıştır. chmod +x eksik biti ekler; `git update-index --chmod=+x` ile commit etmek bunu sonraki checkout\'lar için korur.',
          
        retryQuestion: {
      "question": "Linux terminalinde bir bash scriptini çalıştırmak istediğinizde 'Permission denied' hatası alıyorsanız, atılan en doğru adım nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Dosyayı silip yeniden oluşturmak"
            },
            {
                  "id": "b",
                  "text": "Dosya sahibini root yapmak"
            },
            {
                  "id": "c",
                  "text": "chmod u+x filename.sh komutu ile çalıştırılabilir izin atamak"
            },
            {
                  "id": "d",
                  "text": "Terminali yönetici haklarıyla açıp scriptin adını değiştirmek"
            }
      ],
      "correct": "c",
      "explanation": "Linux dosya sisteminde bir dosyanın çalıştırılabilmesi için 'execute' (x) iznine sahip olması gerekir. 'Permission denied' hatası, scriptin yürütme bitinin kapalı olduğunu gösterir; chmod u+x bu izni dosyaya kazandırır."
}
},
        ],
      },

      // ── BÖLÜM 4: METİN İŞLEME & PIPE'LAR ────────────────────────────────
      {
        title: '📝 Metin İşleme & Pipe\'lar',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏭',
            content: 'Pipe (|), bir fabrika konveyör bandı gibidir — bir makinenin çıktısı, sen elinle taşımana gerek kalmadan tam bir sonraki makinenin hammaddesi olur.',
          },
          { type: 'heading', text: 'Dosyaları Görüntülemek' },
          {
            type: 'table',
            headers: ['Komut', 'Ne yapar', 'Ne zaman kullanılır'],
            rows: [
              ['cat dosya', 'Tüm dosyayı terminale döker', 'Kısa dosyalar'],
              ['less dosya', 'Dosyayı sayfa sayfa açar, /terim ile aranabilir', 'Uzun log dosyaları'],
              ['head -n 20 dosya', 'İlk 20 satırı gösterir', 'Dosyanın başlığını/yapısını kontrol etmek'],
              ['tail -n 20 dosya', 'Son 20 satırı gösterir', 'En son log girdilerini kontrol etmek'],
              ['tail -f dosya', 'Yeni satırlar eklenirken dosyayı canlı takip eder', 'Bir test çalıştırmasını gerçek zamanlı izlemek'],
            ],
          },
          { type: 'heading', text: 'Metin Arama — grep' },
          {
            type: 'code',
            language: 'bash',
            label: 'grep örnekleri',
            code: `grep "ERROR" app.log        # ERROR içeren satırlar
grep -i "error" app.log     # büyük/küçük harf duyarsız
grep -r "TODO" .            # her dosyada recursive ara
grep -n "FAILED" app.log    # satır numaralarını göster
grep -v "PASSED" app.log    # ters eşleşme: PASSED İÇERMEYEN satırlar`,
          },
          { type: 'heading', text: 'Redirection (Yönlendirme)' },
          {
            type: 'table',
            headers: ['Operatör', 'Anlamı', 'Örnek'],
            rows: [
              ['>', 'stdout\'u dosyaya yönlendir (üzerine yaz)', 'pytest tests/ > out.log'],
              ['>>', 'stdout\'u dosyaya yönlendir (sona ekle)', 'echo "run done" >> history.log'],
              ['2>', 'Sadece stderr\'i yönlendir', 'pytest tests/ 2> errors.log'],
              ['2>&1', 'stderr\'i stdout ile aynı yere yönlendir', 'pytest tests/ > full.log 2>&1'],
            ],
          },
          { type: 'heading', text: 'Gerçek Bir QA Pipeline Örneği' },
          {
            type: 'code',
            language: 'bash',
            label: 'Bir log\'dan başarısız test sayısını say',
            code: `cat test-results.log | grep FAILED | wc -l
# cat   → tüm dosyayı oku
# grep  → sadece FAILED içeren satırları tut
# wc -l → kaç satır kaldığını say`,
            expected: '7',
          },
          {
            type: 'comparison',
            title: { tr: 'Java Stream API vs Bash Pipe', en: 'Java Stream API vs Bash Pipe' },
            left: { label: 'Java Stream', code: 'long failed = Files.lines(path)\n    .filter(l -> l.contains("FAILED"))\n    .count();', note: 'filter → count, process içinde' },
            right: { label: 'Bash Pipe', code: 'cat results.log | grep FAILED | wc -l', note: 'filter → count, ayrı process\'ler arasında' },
          },
          {
            type: 'git-practice',
            icon: '📝',
            title: { tr: 'Kendi Pipeline\'ını Kur', en: 'Build Your Own Pipeline' },
            intro: { tr: 'Bir log dosyasından kaç ERROR satırı olduğunu bul.', en: 'Find how many ERROR lines exist in a log file.' },
            help: { tr: 'cat ile oku, grep ile filtrele, wc -l ile say.', en: 'Read with cat, filter with grep, count with wc -l.' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'app.log okundu', en: 'app.log was read' }, pattern: '^cat\\s+app\\.log', example: 'cat app.log' },
              { label: { tr: 'ERROR satırları filtrelendi', en: 'ERROR lines filtered' }, pattern: 'grep\\s+(-\\w+\\s+)?"?ERROR"?', example: '| grep ERROR' },
              { label: { tr: 'satır sayısı sayıldı', en: 'lines counted' }, pattern: 'wc\\s+-l', example: '| wc -l' },
            ],
            successOutput: '$ cat app.log | grep ERROR | wc -l\n4',
            retryOutput: 'cat app.log | grep ERROR | wc -l zincirini tamamla.',
          },
          {
            type: 'quiz',
            question: '`command > out.log` sonrasına yazılan `2>&1` ne yapar?',
            options: [
              { id: 'a', text: 'out.log dosyasını siler' },
              { id: 'b', text: 'stderr\'i stdout\'un (out.log) gittiği aynı yere gönderir' },
              { id: 'c', text: 'Komutu iki kere çalıştırır' },
              { id: 'd', text: 'Sadece macOS\'ta çalışır' },
            ],
            correct: 'b',
            explanation: 'Her process\'in ayrı stdout (1) ve stderr (2) akışı vardır. `2>&1`, stderr\'i stdout\'un o anda işaret ettiği yere yönlendirir, böylece ikisi de tek bir dosyada birleşir — crash dahil tüm test çıktısını yakalamak için kullanışlıdır.',
          
        retryQuestion: {
      "question": "Bash script'inde `command 2> error.log` yerine `command 2>&1` kullanmanın temel amacı nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Hata çıktılarını terminal ekranından tamamen gizler"
            },
            {
                  "id": "b",
                  "text": "Hata mesajlarını standart çıktı akışıyla birleştirerek aynı dosyaya yönlendirir"
            },
            {
                  "id": "c",
                  "text": "Hataları geçici olarak bir değişkene atar"
            },
            {
                  "id": "d",
                  "text": "Hata mesajlarını ikinci bir dosyaya kopyalar"
            }
      ],
      "correct": "b",
      "explanation": "`2>&1` ifadesi, dosya tanımlayıcı 2'yi (stderr), dosya tanımlayıcı 1'in (stdout) hedefine yönlendirir. Bu sayede hem normal çıktıları hem de hata mesajlarını tek bir kanal üzerinden aynı dosyaya yazdırabilirsiniz."
}
},
        ],
      },

      // ── BÖLÜM 5: SÜREÇLER & SERVİSLER ───────────────────────────────────
      {
        title: '⚙️ Süreçler & Servisler',
        blocks: [
          {
            type: 'simple-box',
            emoji: '👨‍🍳',
            content: 'Process\'ler şu an mesaide olan restoran personeli gibidir. Bazıları doğrudan önünde sipariş alır (foreground), bazıları arka mutfakta sessizce çalışır (background/daemon) ve bazen birine hemen durmasını söylemen gerekir (kill).',
          },
          { type: 'heading', text: 'Process\'leri Görüntülemek & Kontrol Etmek' },
          {
            type: 'table',
            headers: ['Komut', 'Ne yapar'],
            rows: [
              ['ps aux', 'Tüm kullanıcıların tüm process\'lerini PID, CPU ve bellek kullanımıyla listeler'],
              ['top / htop', 'Process kaynak kullanımının canlı, yenilenen görünümü'],
              ['kill PID', 'Bir process\'ten düzgünce kapanmasını ister (SIGTERM)'],
              ['kill -9 PID', 'Bir process\'i zorla ve anında öldürür (SIGKILL) — temizlik yapma şansı yok'],
              ['pkill ad', 'Process\'leri PID yerine isimle öldürür'],
            ],
          },
          { type: 'heading', text: 'Arka Plan İşleri (Background Jobs)' },
          {
            type: 'code',
            language: 'bash',
            label: 'Arka planda çalıştırma',
            code: `node mock-server.js &     # arka planda başlat, kontrolü hemen geri al
jobs                       # bu shell'deki arka plan işlerini listele
fg %1                      # 1 numaralı işi ön plana getir
nohup node mock-server.js &  # terminal/SSH oturumu kapansa da çalışmayı sürdür`,
          },
          { type: 'heading', text: 'systemd ile Servisler' },
          {
            type: 'code',
            language: 'bash',
            label: 'Uzun süreli servisleri yönetmek',
            code: `systemctl status nginx        # çalışıyor mu, failed mi, durdurulmuş mu?
systemctl start nginx         # başlat
systemctl restart nginx       # yeniden başlat
systemctl enable nginx        # boot'ta otomatik başlasın
journalctl -u nginx -f        # o servisin loglarını canlı takip et`,
          },
          {
            type: 'callout',
            color: 'orange',
            emoji: '🧯',
            title: { tr: 'Gerçek senaryo: Selenium node\'u CPU\'yu kilitledi', en: 'Real scenario: a Selenium node locked the CPU' },
            content: { tr: '`ps aux | grep selenium` ile suçlu process\'i bul, PID\'ini al, `kill -9 PID` ile öldür ve `ps aux | grep selenium` ile gerçekten gittiğini doğrula.', en: 'Find the culprit process with `ps aux | grep selenium`, grab its PID, kill it with `kill -9 PID`, then confirm with `ps aux | grep selenium` that it is really gone.' },
          },
          { type: 'heading', text: 'cron ile Zamanlama' },
          {
            type: 'code',
            language: 'bash',
            label: 'crontab -e',
            code: `0 2 * * * /home/qa/run-regression.sh
# dakika saat gün ay haftagunu  komut
# "0 2 * * *" = her gün 02:00'de`,
          },
          {
            type: 'git-practice',
            icon: '⚙️',
            title: { tr: 'Takılı Process\'i Bul ve Öldür', en: 'Find and Kill a Stuck Process' },
            intro: { tr: 'Bir node process CPU\'yu tüketiyor — onu bul ve durdur.', en: 'A node process is eating CPU — find it and stop it.' },
            help: { tr: 'ps aux ile bul, kill -9 ile durdur, tekrar ps aux ile doğrula.', en: 'Find with ps aux, stop with kill -9, confirm again with ps aux.' },
            starterCommands: { tr: '', en: '' },
            expectedSteps: [
              { label: { tr: 'process arandı', en: 'process searched for' }, pattern: 'ps\\s+aux', example: 'ps aux | grep node' },
              { label: { tr: 'process öldürüldü', en: 'process killed' }, pattern: '^kill\\s+(-9\\s+)?\\d+$', example: 'kill -9 4821' },
              { label: { tr: 'gitmiş olduğu doğrulandı', en: 'confirmed it is gone' }, pattern: 'ps\\s+aux', example: 'ps aux | grep node' },
            ],
            dangerousPatterns: [
              { pattern: '\\bkill\\s+(-9\\s+)?1\\b', label: { tr: 'PID 1, sistemin init process\'idir — onu öldürmek tüm sistemi çökertir.', en: 'PID 1 is the system\'s init process — killing it crashes the entire machine.' } },
              { pattern: ':\\(\\)\\s*\\{\\s*:\\|:&\\s*\\}\\s*;\\s*:', label: { tr: 'Bu bir fork bomb — sistemi process tablosunu doldurup kilitler.', en: 'This is a fork bomb — it fills the process table and locks up the system.' } },
            ],
            successOutput: '$ ps aux | grep node\nqa  4821  99.8  node test-runner.js\n$ kill -9 4821\n$ ps aux | grep node\n(eşleşen process yok)',
            retryOutput: 'ps aux ile process\'i bul, kill -9 PID ile durdur, ps aux ile tekrar kontrol et.',
          },
          {
            type: 'quiz',
            question: 'Bir process takılı kalmış görünüyor ama hâlâ yanıt verebiliyor olabilir. En güvenli ilk adım nedir?',
            options: [
              { id: 'a', text: 'Hemen kill -9 yap' },
              { id: 'b', text: 'Tüm makineyi yeniden başlat' },
              { id: 'c', text: 'Önce normal kill (SIGTERM) dene, yanıt vermezse kill -9 kullan' },
              { id: 'd', text: 'Görmezden gel, kendi düzelir' },
            ],
            correct: 'c',
            explanation: 'Normal `kill`, SIGTERM gönderir ve process\'e düzgünce temizlenip çıkma şansı verir. `kill -9` (SIGKILL) hiçbir temizlik şansı vermez, bu yüzden gerçekten yanıt vermeyen process\'ler için son çare olarak ayrılır.',
          
        retryQuestion: {
      "question": "Bir Docker container'ı durdurmak istediğinizde, veri kaybını veya veritabanı bozulmasını önlemek için izlenmesi gereken doğru kapatma yöntemi nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Docker daemon'u kapatıp makineyi kapatmak"
            },
            {
                  "id": "b",
                  "text": "Her zaman 'docker kill' komutunu kullanarak süreci anında sonlandırmak"
            },
            {
                  "id": "c",
                  "text": "Önce 'docker stop' (SIGTERM) gönderip sürece kapanma şansı tanımak, yanıt yoksa 'docker kill' (SIGKILL) uygulamak"
            },
            {
                  "id": "d",
                  "text": "Container'ın kendi kendine kapanmasını beklemek"
            }
      ],
      "correct": "c",
      "explanation": "`docker stop` işlemi, sürece SIGTERM sinyali göndererek düzgün bir şekilde kapanma prosedürlerini (dosya yazmalarını tamamlama, bağlantıları kapatma) gerçekleştirmesi için süre tanır. `docker kill` ise süreci anında zorla durdurur ve veri tutarsızlığı riski yaratır."
}
},
        ],
      },

      // ── BÖLÜM 6: GERÇEK HAYAT QA SENARYOLARI ────────────────────────────
      {
        title: '🧪 Gerçek Hayat QA Senaryoları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏎️',
            content: 'Baskı altında test altyapısını debug etmek, bir yarış pit crew\'u olmak gibidir — gerçek sorunu teşhis edip arabayı (pipeline\'ı) tekrar pistte yarışacak hale getirmek için kısa bir zaman penceresine sahipsin.',
          },
          { type: 'heading', text: 'Bir CI Agent\'ına SSH ile Bağlanmak' },
          {
            type: 'code',
            language: 'bash',
            label: 'Bağlanmak ve incelemek',
            code: `ssh qa@jenkins-agent-01
cd /var/lib/jenkins/workspace/regression-suite
tail -f build.log              # build'i canlı izle
df -h                          # disk alanını kontrol et
ps aux | grep java             # Jenkins agent process'i hayatta mı?`,
          },
          { type: 'heading', text: 'Pipeline\'ı Kıran Disk Alanı' },
          {
            type: 'code',
            language: 'bash',
            label: 'Disk alanını ne yiyor?',
            code: `df -h                                    # hangi bölüm dolu?
du -sh /var/log/* /tmp/* | sort -rh | head -10   # en büyük tüketiciler
find /var/log -name "*.log" -mtime +30 -delete   # 30 günden eski logları sil`,
          },
          { type: 'heading', text: 'Bir QA Bash Script Yazmak' },
          {
            type: 'code',
            language: 'bash',
            label: 'run-regression.sh',
            code: `#!/bin/bash
set -euo pipefail              # hata, tanımsız değişken veya başarısız pipe'da dur

LOG_FILE="regression-$(date +%Y%m%d-%H%M%S).log"   # zaman damgalı benzersiz log adı

echo "Starting regression suite..." | tee "$LOG_FILE"   # hem logla hem ekrana yaz

if ! pytest tests/ --maxfail=5 -v >> "$LOG_FILE" 2>&1; then  # testleri çalıştır, tüm çıktıyı yakala
    echo "Tests failed — see $LOG_FILE" >&2                  # hatayı stderr'e yaz
    exit 1                                                   # başarısızlık koduyla çık
fi

echo "All tests passed!" | tee -a "$LOG_FILE"   # başarı mesajını sona ekle`,
          },
          { type: 'heading', text: 'API Testi için Ağ Temelleri' },
          {
            type: 'code',
            language: 'bash',
            label: 'Hızlı ağ/API kontrolleri',
            code: `curl -I https://api.test.local/health      # sadece header'lar, hızlı durum kontrolü
curl -X POST https://api.test.local/login -d '{"u":"qa"}' -H "Content-Type: application/json"
ping -c 4 api.test.local                    # host hiç ulaşılabilir mi?
ss -tulpn | grep 4444                       # 4444 portunu kim dinliyor?`,
          },
          { type: 'heading', text: 'Dosya Bulmak' },
          {
            type: 'code',
            language: 'bash',
            label: 'find örnekleri',
            code: `find . -name "*.spec.ts"            # buradan aşağıda tüm spec dosyalarını bul
find /var/log -mmin -60             # son 60 dakikada değişen dosyalar
find . -size +100M                  # şüpheli derecede büyük dosyaları bul`,
          },
          {
            type: 'callout',
            color: 'red',
            emoji: '🕑',
            title: { tr: 'Klasik tuzak: gece çalışan job neden manuel çalıştırınca farklı davranıyor?', en: 'Classic trap: why does the nightly job behave differently than running it manually?' },
            content: { tr: 'cron, senin interaktif shell\'inden çok daha minimal bir environment ile çalışır. Senin terminalinde export ettiğin bir değişken (örn. API_TOKEN) cron script\'inin başında tekrar tanımlanmazsa sessizce boş kalır.', en: 'cron runs with a far more minimal environment than your interactive shell. A variable you exported in your terminal (e.g. API_TOKEN) silently comes up empty in cron unless it is redefined at the top of the cron script.' },
          },
          {
            type: 'quiz',
            question: 'Cron ile gece tetiklenen bir test suite authentication\'da fail oluyor, ama aynı script\'i manuel çalıştırınca sorunsuz çalışıyor. En olası sebep nedir?',
            options: [
              { id: 'a', text: 'Gece internet kesilmişti' },
              { id: 'b', text: 'cron minimal bir environment ile çalışır ve shell\'inden export edilmiş bir değişken orada yoktur' },
              { id: 'c', text: 'Cron job\'lar sadece GET isteği yapabilir' },
              { id: 'd', text: 'Test suite\'inde syntax hatası var' },
            ],
            correct: 'b',
            explanation: 'cron, interaktif shell\'inin export edilmiş environment variable\'larını miras almaz. Bir script $API_TOKEN gibi sadece manuel export ettiğin bir şeye bağımlıysa, cron altında bu değer boş kalır — değişkeni cron script\'inin içinde açıkça tanımla veya kaynak göster.',
          
        retryQuestion: {
      "question": "Otomatik bir Jenkins pipeline'ı çalışırken PATH hatası alıyor, ancak aynı komut kendi terminalinizde sorunsuz çalışıyor. Sorunun temel sebebi nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Jenkins sunucusunun internet bağlantısı kısıtlıdır"
            },
            {
                  "id": "b",
                  "text": "Pipeline'ın çalıştığı kullanıcıya ait PATH değişkeni, sizin lokal shell'inizden farklıdır ve bazı tool'lar bulunamaz"
            },
            {
                  "id": "c",
                  "text": "Komutların Jenkins üzerinde sadece root yetkisiyle çalışması gerekir"
            },
            {
                  "id": "d",
                  "text": "Sunucunun saati hatalı olduğu için token'lar geçerli değildir"
            }
      ],
      "correct": "b",
      "explanation": "Otomatik pipeline ortamları genellikle çok kısıtlı bir PATH değişkeniyle başlar. .bashrc veya .profile dosyasında tanımladığınız özelleşmiş binary yolları bu ortamda yüklü olmayabilir, bu yüzden PATH değişkeninin pipeline içinde export edilmesi veya tam yol (absolute path) kullanılması gerekir."
}
},
        ],
      },

      // ── BÖLÜM 7: EKOSİSTEM ────────────────────────────────────────────────
      {
        title: '🔗 Ekosistem',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🌱',
            content: 'Linux, modern QA\'daki her şeyin üzerinde büyüdüğü toprak gibidir. Docker, Kubernetes, CI/CD runner\'ları ve çoğu cloud sunucu hepsi onun üzerine kuruludur.',
          },
          { type: 'heading', text: 'Linux & Docker — Gerçek İlişki' },
          {
            type: 'text',
            content: 'Bir Docker container ayrı bir işletim sistemi değildir — host makinenin kernel\'ini paylaşan, sadece dosya sistemi, ağ ve process görünümü açısından izole edilmiş kısıtlı bir Linux process\'idir. Docker\'ın Windows\'ta WSL2/Hyper-V\'ye ihtiyaç duymasının sebebi tam olarak budur: container\'ları gerçekten çalıştırmak için gerçek bir Linux kernel\'ine gereksinimi vardır.',
          },
          { type: 'heading', text: 'QA için Linux Dağıtımları' },
          {
            type: 'table',
            headers: ['Dağıtım', 'Tipik kullanım'],
            rows: [
              ['Ubuntu / Debian', 'CI runner\'ları, Jenkins agent\'ları ve dev VM\'leri için en yaygını — geniş paket ekosistemi'],
              ['CentOS / RHEL / Rocky Linux', 'Kurumsal production sunucularda yaygın'],
              ['Alpine', 'Çok küçük (birkaç MB), hafif Docker image\'leri için base olarak kullanılır'],
              ['Amazon Linux', 'AWS EC2 instance\'ları için optimize edilmiştir'],
            ],
          },
          { type: 'heading', text: 'Bash Scripting Temelleri' },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📦', label: 'Variables (Değişkenler)', desc: 'NAME="value" — = etrafında boşluk yok. $NAME veya ${NAME} ile kullan.' },
              { icon: '🔀', label: 'if / then / fi', desc: 'if [ "$STATUS" = "PASSED" ]; then echo "ok"; fi' },
              { icon: '🔁', label: 'for döngüsü', desc: 'for f in *.log; do echo "$f"; done' },
              { icon: '🧩', label: 'fonksiyonlar', desc: 'run_tests() { pytest "$1"; }' },
            ],
          },
          { type: 'heading', text: 'Linux, QA Toolchain\'inde Nerede Karşına Çıkar' },
          {
            type: 'list',
            icon: '🔹',
            items: [
              'GitHub Actions runner\'ları (en yaygını ubuntu-latest)',
              'Jenkins build agent\'ları',
              'Test ortamları için Docker base image\'leri',
              'Kubernetes worker node\'ları',
              'AWS EC2 / Azure VM test sunucuları',
              'Selenium Grid / BrowserStack backend altyapısı',
            ],
          },
          {
            type: 'table',
            headers: ['Yön', 'Bash (Linux)', 'PowerShell (Windows)'],
            rows: [
              ['Varsayılan olduğu yer', 'Linux, macOS', 'Windows'],
              ['Scripting stili', 'Metin akışı tabanlı pipe\'lar', 'Nesne tabanlı pipeline'],
              ['CI varsayılan runner', 'ubuntu-latest (en yaygın)', 'windows-latest (daha az yaygın, açılışı daha yavaş)'],
              ['Paket ekosistemi', 'apt/yum/brew — geniş, onlarca yıllık', 'Büyüyor ama CLI dev araçları için daha küçük'],
            ],
          },
          {
            type: 'quiz',
            question: 'Docker, Windows\'ta container\'ları native olarak değil de WSL2 veya Hyper-V ile çalıştırmak zorunda neden kalıyor?',
            options: [
              { id: 'a', text: 'Docker gerçekte Linux\'a hiç ihtiyaç duymaz' },
              { id: 'b', text: 'Container host kernel\'ini paylaşır, Windows\'ta Linux kernel yoktur — bu yüzden WSL2/Hyper-V altında gerçek bir kernel çalışmalıdır' },
              { id: 'c', text: 'Bu sadece Docker Inc.\'in pazarlama kararı' },
              { id: 'd', text: 'Windows container\'ları ve Linux container\'ları aynıdır' },
            ],
            correct: 'b',
            explanation: 'Container\'lar host kernel\'ini paylaşan izole Linux process\'leridir. Windows native olarak bir Linux kernel\'i çalıştırmadığı için, Docker Desktop\'ın Linux container\'larını gerçekten çalıştırabilmesi için altında gerçek bir Linux kernel\'i sağlayan WSL2 (veya Hyper-V) gerekir.',
          
        retryQuestion: {
      "question": "Docker Desktop kullanılırken Linux tabanlı bir container başlatıldığında arka planda neden bir sanallaştırma katmanına (WSL2 veya Hyper-V) ihtiyaç duyulur?",
      "options": [
            {
                  "id": "a",
                  "text": "Docker Linux container'larını çalıştırmak için donanım üzerinden doğrudan kernel'e erişemez."
            },
            {
                  "id": "b",
                  "text": "Windows'un kendi kernel'i Linux sistem çağrılarını doğrudan yönetemez; bu yüzden Linux çekirdeğini sağlayan bir sanal makine (VM) gereklidir."
            },
            {
                  "id": "c",
                  "text": "Docker sadece Windows üzerinde güvenlik katmanı olarak bir hypervisor kullanır."
            },
            {
                  "id": "d",
                  "text": "Linux container'ları her zaman sadece Docker Hub'dan değil, bir VM içinden indirilmelidir."
            }
      ],
      "correct": "b",
      "explanation": "Container teknolojisi, çalışan uygulamanın host işletim sisteminin kernel'i ile doğrudan iletişim kurmasına dayanır. Windows kernel'i Linux binary'lerini ve sistem çağrılarını native olarak çalıştırmadığından, Docker bu uyumluluğu sağlamak için WSL2 veya Hyper-V aracılığıyla bir Linux kernel ortamı sağlar."
}
},
        ],
      },

      // ── BÖLÜM 8: HATA SÖZLÜĞÜ ─────────────────────────────────────────────
      {
        title: '🚨 Hata Sözlüğü',
        blocks: [
          { type: 'error-dictionary', framework: 'Linux', errors: linuxErrors },
          {
            type: 'quiz',
            question: 'Bir CI agent\'ı ./deploy.sh çalıştırırken "Permission denied" hatası veriyor, dosya gerçekten var ve içeriği doğru. En olası neden nedir?',
            options: [
              { id: 'a', text: 'Script\'te syntax hatası var' },
              { id: 'b', text: 'Dosyada execute (x) izin biti eksik' },
              { id: 'c', text: 'Disk dolu' },
              { id: 'd', text: 'Shell .sh dosyalarını desteklemiyor' },
            ],
            correct: 'b',
            explanation: 'Linux, execute (x) bitini read (r) ve write (w) bitlerinden ayrı olarak kontrol eder — bir dosya tamamen okunabilir, hatta düzenlenebilir olsa da yine de çalıştırılamaz olabilir. `chmod +x deploy.sh` bunu düzeltir. Bu, Windows\'tan farklıdır — orada bir .sh/.bat dosyasının çalışıp çalışamayacağına genelde sadece uzantı karar verir; Linux ise tamamen `ls -l` ile görünen izin bitlerine (örn. rwxr-xr-x) dayanır.',
            retryQuestion: {
              question: '`ls -l deploy.sh` çıktısı `rw-r--r--` gösteriyor. Dosyanın SAHİBİNİN `./deploy.sh` ile çalıştırabilmesi için gereken minimum değişiklik nedir?',
              options: [
                { id: 'a', text: '`chmod 777 deploy.sh`' },
                { id: 'b', text: '`chmod u+x deploy.sh`' },
                { id: 'c', text: '`chown root deploy.sh`' },
                { id: 'd', text: 'Dosyayı deploy.sh.exe olarak yeniden adlandırmak' },
              ],
              correct: 'b',
              explanation: '`chmod u+x`, execute bitini SADECE sahibe (u) ekler, `rw-r--r--`yi `rwxr--r--`ye çevirir — "sahibin bunu çalıştırması gerekiyor" için minimal ve doğru çözüm. `chmod 777` da işe yarar ama HERKESE write+execute verir, paylaşılan veya CI makinesinde gerçek bir güvenlik riskidir. `chown` sadece sahipliği değiştirir, izinleri değil; yeniden adlandırmak Linux\'ta hiçbir etki yapmaz (`.exe` kavramı yoktur).',
            },
          },
        ],
      },

      // ── BÖLÜM 9: MÜLAKAT S&C ──────────────────────────────────────────────
      {
        title: '💼 Mülakat S&C',
        blocks: [
          { type: 'interview-questions', topic: 'Linux', questions: linuxInterviewQuestions },
        ],
      },
    ],
  },
}
