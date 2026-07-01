// javaData.js — Java QA Öğrenme Sayfası

import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

// ─── S0: GİRİŞ ────────────────────────────────────────────────────────────────
const s0 = {
  tr: {
    title: '☕ Java Nedir? Neden QA\'da Kullanılır?',
    blocks: [
      {
        type: 'simple-box', emoji: '☕',
        content: 'Java\'yı bir "evrensel tercüman" gibi düşün. Türkçe yazdığın bir mektubu, dünyanın her yerindeki insanlar kendi dillerinde okuyabiliyor. Java da böyle: bir kere kod yaz, JVM sayesinde Windows\'ta, Mac\'te, Linux\'ta — her yerde çalışır. "Write Once, Run Anywhere" sloganı buradan geliyor.',
      },
      {
        type: 'text',
        content: 'Java, 1995 yılında Sun Microsystems tarafından geliştirilen, nesne yönelimli (OOP), platform bağımsız, statik tipli bir programlama dilidir. QA dünyasında en çok tercih edilen dildir: Selenium WebDriver\'ın ilk desteği Java\'ya verilmiştir, REST Assured Java ile yazılmıştır, TestNG ve JUnit5 Java ekosisteminin ürünüdür.',
      },
      {
        type: 'visual', variant: 'flow', title: 'Java Çalışma Akışı',
        steps: [
          { num: 1, label: 'Kaynak Kod', desc: '.java dosyası', highlight: true },
          { num: 2, label: 'Derleyici (javac)', desc: 'Bytecode\'a dönüştürür' },
          { num: 3, label: 'Bytecode', desc: '.class dosyası', highlight: true },
          { num: 4, label: 'JVM', desc: 'Platform spesifik' },
          { num: 5, label: 'Çalışma (Run)', desc: 'Windows/Mac/Linux', highlight: true },
        ],
      },
      {
        type: 'simulation',
        scenario: 'java-compile-run',
        icon: '☕',
        color: '#f97316',
        title: { tr: 'Java Kodunun Yolculuğu: .java → bytecode → JVM', en: 'Java Code Journey: .java → bytecode → JVM' },
        description: {
          tr: 'Not dosyasındaki Codes → JDK → Binary → İşlem şemasını canlı gör: kaynak kod compiler tarafından bytecode olur, JVM de bunu çalıştırıp output üretir.',
          en: 'Watch the notes-style Codes → JDK → Binary → Run flow live: source code becomes bytecode through the compiler, then the JVM executes it and produces output.',
        },
        language: 'bash',
        code: `# 1) Kaynak kodu derle
javac Main.java

# 2) JVM ile çalıştır
java Main

# Beklenen output
Merhaba QA!`,
      },
      {
        type: 'heading', text: { tr: 'JDK, JRE, JVM Farkı', en: 'JDK, JRE, JVM Difference' },
      },
      {
        type: 'table',
        headers: ['Bileşen', 'Ne İçerir?', 'Kim Kullanır?'],
        rows: [
          ['JDK (Java Development Kit)', 'JRE + Derleyici (javac) + Araçlar (javadoc, jar)', 'Geliştiriciler & QA mühendisleri'],
          ['JRE (Java Runtime Environment)', 'JVM + Sınıf kütüphaneleri', 'Son kullanıcılar (sadece çalıştırmak için)'],
          ['JVM (Java Virtual Machine)', 'Bytecode yorumlayıcı + GC + JIT', 'JRE içinde otomatik gelir'],
        ],
      },
      {
        type: 'callout', color: 'blue', emoji: '💡',
        title: 'QA için hangisi gerekli?',
        content: 'Test projelerini yazmak ve çalıştırmak için JDK yeterlidir. JDK kurduğunda içinde JRE ve JVM de gelir. Ayrıca Maven veya Gradle gibi bir build tool kurman gerekir.',
      },
      {
        type: 'heading', text: { tr: 'Java\'nın QA\'da Yeri', en: 'Java\'s Place in QA' },
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '🌐', label: 'Selenium WebDriver', desc: 'En olgun Java binding\'e sahip. Java topluluğu en büyük.' },
          { icon: '🧪', label: 'JUnit5 & TestNG', desc: 'Test runner\'lar Java\'da doğdu. Tüm CI/CD araçlarıyla entegre.' },
          { icon: '📡', label: 'REST Assured', desc: 'Java\'ya özel REST API test kütüphanesi. BDD stili assertionlar.' },
          { icon: '📊', label: 'Allure Report', desc: 'Java projelerinde en kolay kurulum ve en zengin raporlama.' },
          { icon: '🏗️', label: 'Maven / Gradle', desc: 'Bağımlılık yönetimi ve build automation için endüstri standardı.' },
          { icon: '📱', label: 'Appium', desc: 'Mobil otomasyon için Java API\'si en kapsamlı ve belgelenmiş.' },
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Java kodunu bytecode\'a dönüştüren araç hangisidir?', en: 'Which tool converts Java code to bytecode?' },
        options: [
          { id: 'a', text: 'JVM' },
          { id: 'b', text: 'javac (Java Compiler)' },
          { id: 'c', text: 'Maven' },
          { id: 'd', text: 'JRE' },
        ],
        correct: 'b',
        explanation: { tr: 'javac, Java derleyicisidir. .java uzantılı kaynak kodu alır ve JVM\'nin çalıştırabileceği .class (bytecode) dosyasına dönüştürür. JVM ise bu bytecode\'u çalışma zamanında yorumlar/çalıştırır.', en: 'javac is the Java compiler. It takes .java source files and converts them to .class (bytecode) files that the JVM can execute. The JVM then interprets/runs this bytecode at runtime.' },
      
        retryQuestion: {
      "question": {
            "tr": "Java derleyicisi (javac) tarafından .java dosyası derlendiğinde ortaya çıkan ve JVM tarafından çalıştırılabilen dosya formatı hangisidir?",
            "en": "What is the file format produced by the Java compiler (javac) that can be executed by the JVM?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Source Code (.java)"
            },
            {
                  "id": "b",
                  "text": "Bytecode (.class)"
            },
            {
                  "id": "c",
                  "text": "Executable (.exe)"
            },
            {
                  "id": "d",
                  "text": "Configuration (.xml)"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "javac, kaynak kodunu (.java) işleyerek platformdan bağımsız olan bytecode (.class) dosyasına dönüştürür. JVM, bu bytecode dosyasını okuyarak işletim sisteminde çalıştırır.",
            "en": "The javac compiler processes source code (.java) and converts it into platform-independent bytecode (.class) files. The JVM reads this bytecode to execute it on the operating system."
      }
}
},
    ],
  },
  en: {
    title: '☕ What is Java? Why Use It in QA?',
    blocks: [
      {
        type: 'simple-box', emoji: '☕',
        content: 'Think of Java as a "universal translator." A letter you write in English can be read by people everywhere in their own context. Java works the same way: write code once, and thanks to the JVM, it runs on Windows, Mac, Linux — everywhere. That\'s where the "Write Once, Run Anywhere" slogan comes from.',
      },
      {
        type: 'text',
        content: 'Java is an object-oriented, platform-independent, statically typed programming language developed by Sun Microsystems in 1995. It is the most preferred language in the QA world: Selenium WebDriver\'s first support was for Java, REST Assured is written in Java, and TestNG and JUnit5 are products of the Java ecosystem.',
      },
      {
        type: 'visual', variant: 'flow', title: 'Java Execution Flow',
        steps: [
          { num: 1, label: 'Source Code', desc: '.java file', highlight: true },
          { num: 2, label: 'Compiler (javac)', desc: 'Converts to bytecode' },
          { num: 3, label: 'Bytecode', desc: '.class file', highlight: true },
          { num: 4, label: 'JVM', desc: 'Platform specific' },
          { num: 5, label: 'Execution', desc: 'Windows/Mac/Linux', highlight: true },
        ],
      },
      {
        type: 'simulation',
        scenario: 'java-compile-run',
        icon: '☕',
        color: '#f97316',
        title: { tr: 'Java Kodunun Yolculuğu: .java → bytecode → JVM', en: 'Java Code Journey: .java → bytecode → JVM' },
        description: {
          tr: 'Not dosyasındaki Codes → JDK → Binary → İşlem şemasını canlı gör: kaynak kod compiler tarafından bytecode olur, JVM de bunu çalıştırıp output üretir.',
          en: 'Watch the notes-style Codes → JDK → Binary → Run flow live: source code becomes bytecode through the compiler, then the JVM executes it and produces output.',
        },
        language: 'bash',
        code: `# 1) Compile source code
javac Main.java

# 2) Run with JVM
java Main

# Expected output
Hello QA!`,
      },
      {
        type: 'heading', text: { tr: 'JDK, JRE, JVM Farkı', en: 'JDK, JRE, JVM Difference' },
      },
      {
        type: 'table',
        headers: ['Component', 'Contents', 'Who Uses It?'],
        rows: [
          ['JDK (Java Development Kit)', 'JRE + Compiler (javac) + Tools (javadoc, jar)', 'Developers & QA engineers'],
          ['JRE (Java Runtime Environment)', 'JVM + Class libraries', 'End users (run only)'],
          ['JVM (Java Virtual Machine)', 'Bytecode interpreter + GC + JIT', 'Included automatically in JRE'],
        ],
      },
      {
        type: 'callout', color: 'blue', emoji: '💡',
        title: 'Which one do you need for QA?',
        content: 'JDK is sufficient to write and run test projects. When you install JDK, JRE and JVM come with it. You also need a build tool like Maven or Gradle.',
      },
      {
        type: 'heading', text: { tr: 'Java\'nın QA\'da Yeri', en: 'Java\'s Place in QA' },
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '🌐', label: 'Selenium WebDriver', desc: 'Most mature Java binding. Largest Java community.' },
          { icon: '🧪', label: 'JUnit5 & TestNG', desc: 'Test runners born in Java. Integrated with all CI/CD tools.' },
          { icon: '📡', label: 'REST Assured', desc: 'Java-specific REST API testing library. BDD-style assertions.' },
          { icon: '📊', label: 'Allure Report', desc: 'Easiest setup and richest reporting in Java projects.' },
          { icon: '🏗️', label: 'Maven / Gradle', desc: 'Industry standard for dependency management and build automation.' },
          { icon: '📱', label: 'Appium', desc: 'Java API for mobile automation is most comprehensive and documented.' },
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Java kodunu bytecode\'a dönüştüren araç hangisidir?', en: 'Which tool converts Java code to bytecode?' },
        options: [
          { id: 'a', text: 'JVM' },
          { id: 'b', text: 'javac (Java Compiler)' },
          { id: 'c', text: 'Maven' },
          { id: 'd', text: 'JRE' },
        ],
        correct: 'b',
        explanation: { tr: 'javac, Java derleyicisidir.', en: 'javac is the Java compiler. It takes .java source files and converts them to .class (bytecode) files that the JVM can execute.' },
      
        retryQuestion: {
      "question": {
            "tr": "Aşağıdakilerden hangisi Java uygulamalarının çalışması için gerekli olan ve bytecode'u makine diline çeviren/yürüten ortamdır?",
            "en": "Which of the following is the environment required for Java applications to run, responsible for interpreting/executing bytecode?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "JDK"
            },
            {
                  "id": "b",
                  "text": "JVM (Java Virtual Machine)"
            },
            {
                  "id": "c",
                  "text": "IDE"
            },
            {
                  "id": "d",
                  "text": "Maven"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "JVM, derlenmiş olan bytecode dosyalarını çalıştıran sanal makinedir. Java'nın 'bir kere yaz, her yerde çalıştır' prensibinin temelidir.",
            "en": "The JVM is the virtual machine that runs the compiled bytecode files. It is the foundation of Java's 'write once, run anywhere' principle."
      }
}
},
    ],
  },
}

const javaSetupWorkshop = {
  tr: [
      {
        type: 'heading', text: { tr: '🧪 JDK Kurulduktan Sonra: İlk .java Dosyasını javac ile Çalıştır', en: '🧪 After Installing the JDK: Run Your First .java File with javac' },
      },
      {
        type: 'text',
        content: 'JDK kurulduktan sonra iki ana komutun olur: `javac` ve `java`. `javac Main.java` kaynak kodu derleyip `Main.class` üretir. `java Main` ise o class dosyasını JVM üzerinde çalıştırır. Yani sıra her zaman şudur: dosyayı yaz → derle → çalıştır → outputu gör.',
      },
      {
        type: 'visual', variant: 'flow',
        title: 'Elle Java Çalıştırma Sırası',
        steps: [
          { num: 1, label: 'Klasör aç', desc: 'java-lab', highlight: true },
          { num: 2, label: 'Main.java yaz', desc: 'public class Main' },
          { num: 3, label: 'javac Main.java', desc: 'compile' },
          { num: 4, label: 'Main.class oluşur', desc: 'bytecode', highlight: true },
          { num: 5, label: 'java Main', desc: 'run' },
          { num: 6, label: 'Console output', desc: 'Merhaba Java!', highlight: true },
        ],
        note: 'Dosya adı Main.java ise public class adı da Main olmalı. javac komutunda .java yazılır, java komutunda .java yazılmaz.',
      },
      {
        type: 'simulation',
        scenario: 'java-javac-workshop',
        icon: '🧪',
        color: '#f97316',
        title: { tr: 'Terminalde javac Atölyesi', en: 'Terminal javac Workshop' },
        description: {
          tr: 'Klasör açma, Main.java oluşturma, javac ile derleme, Main.class dosyasını görme ve java Main ile çalıştırma akışını adım adım izle.',
          en: 'Watch the full flow: create a folder, create Main.java, compile with javac, see Main.class, and run it with java Main.',
        },
        language: 'powershell',
        code: `mkdir java-lab
cd java-lab
notepad Main.java

javac Main.java
dir
java Main`,
      },
      {
        type: 'code', language: 'powershell',
        label: 'Windows — Main.java dosyasını oluştur ve çalıştır',
        code: `# 1) Çalışma klasörü oluştur
mkdir C:\\java-lab
cd C:\\java-lab

# 2) Dosyayı aç
notepad Main.java

# 3) Notepad içine bunu yaz ve kaydet:
# public class Main {
#     public static void main(String[] args) {
#         System.out.println("Merhaba Java!");
#     }
# }

# 4) Derle: .java uzantısı burada yazılır
javac Main.java

# 5) Main.class oluştu mu kontrol et
dir

# 6) Çalıştır: burada .java veya .class yazılmaz
java Main

# Beklenen çıktı:
# Merhaba Java!`,
      },
      {
        type: 'code', language: 'bash',
        label: 'macOS/Linux — Main.java dosyasını oluştur ve çalıştır',
        code: `mkdir -p ~/java-lab
cd ~/java-lab

cat > Main.java <<'EOF'
public class Main {
    public static void main(String[] args) {
        System.out.println("Merhaba Java!");
    }
}
EOF

javac Main.java
ls
java Main

# Beklenen çıktı:
# Merhaba Java!`,
      },
      {
        type: 'callout', color: 'yellow', emoji: '⚠️',
        title: 'İlk gün en çok yapılan 4 hata',
        content: '`javac Main.java` yerine `java Main.java` yazmak; `java Main` yerine `java Main.class` yazmak; dosya adını `main.java` yapıp class adını `Main` bırakmak; `System.out.println(...)` satırının sonuna `;` koymamak.',
      },
      {
        type: 'java-practice',
        icon: '✍️',
        title: { tr: 'Kendin Yaz: Main Method ve Semicolon Alışkanlığı', en: 'Write It Yourself: Main Method and Semicolon Habit' },
        intro: {
          tr: 'Aşağıdaki eksik iskeleti tamamla. Her komut satırının sonuna ; koy. Sonra kontrol et.',
          en: 'Complete the skeleton below. End every statement with ;, then check it.',
        },
        starterCode: {
          tr: `public class Main {
    // Buraya main method yaz:

        System.out.println("Merhaba Java")
    }
}`,
          en: `public class Main {
    // Write the main method here:

        System.out.println("Hello Java")
    }
}`,
        },
        height: 250,
      },
      {
        type: 'heading', text: { tr: '💻 IDE Nedir? Hangi Çeşitleri Vardır?', en: '💻 What Is an IDE? What Types Exist?' },
      },
      {
        type: 'text',
        content: 'IDE (Integrated Development Environment), kod yazma masasıdır. Notepad sadece yazdırır; IDE ise proje klasörünü gösterir, hatalı satırı işaretler, JDK seçtirir, Run butonuyla `javac` ve `java` komutlarını arka planda çağırır. Yani IDE sihir yapmaz; terminalde elle yaptığın işleri düzenli bir arayüzle kolaylaştırır.',
      },
      {
        type: 'table',
        headers: ['Araç türü', 'Örnek', 'Ne zaman kullanılır?'],
        rows: [
          ['Basit text editor', 'Notepad, VS Code temel hali', 'İlk `javac` mantığını anlamak için'],
          ['Klasik Java IDE', 'IntelliJ IDEA, Eclipse, NetBeans', 'Java class, package, run/debug, Maven projeleri için'],
          ['Online IDE', 'Replit, Gitpod benzeri araçlar', 'Kendi bilgisayarında kurulum yapmadan kısa deneme için'],
          ['AI destekli IDE/editor', 'Cursor, Windsurf, Copilot destekli IDE', 'Temeller oturduktan sonra hız kazanmak için'],
        ],
      },
      {
        type: 'callout', color: 'orange', emoji: '🧠',
        title: 'Öğrenme aşamasında neden Cursor gibi AI destekli IDE ile başlamıyoruz?',
        content: 'Çünkü ilk hedef hızlı kod üretmek değil, Java iskeletini zihne ve parmaklara yerleştirmek: `class`, `main`, `{}`, `;`, hata mesajı okuma, Run/Debug farkı. AI IDE erken açılırsa doğru görünen kodu üretir ama sen neden doğru olduğunu hissetmezsin. 2-3 hafta sonra, temel syntax ve hata okuma refleksi oluşunca AI destekli editor hızlandırıcı olarak çok faydalıdır.',
      },
      {
        type: 'heading', text: { tr: '🧠 IntelliJ IDEA Nasıl İndirilir ve Kurulur?', en: '🧠 How to Download and Install IntelliJ IDEA' },
      },
      {
        type: 'text',
        content: 'Güncel JetBrains modelinde IntelliJ IDEA tek ürün olarak indiriliyor; temel kullanım ücretsiz devam edebilir, gelişmiş Ultimate özellikler abonelikle açılır. Öğrenme için ücretsiz IntelliJ IDEA yeterlidir. Kurulumda iki temiz yol var: JetBrains Toolbox App ile kurmak veya doğrudan IntelliJ IDEA installer indirmek. Toolbox, güncelleme ve farklı JetBrains ürünlerini yönetmek için daha rahattır.',
      },
      {
        type: 'visual', variant: 'flow',
        title: 'IntelliJ Kurulum ve İlk Proje Akışı',
        steps: [
          { num: 1, label: 'JDK kur', desc: 'java/javac çalışıyor' },
          { num: 2, label: 'IntelliJ indir', desc: 'jetbrains.com/idea/download', highlight: true },
          { num: 3, label: 'New Project', desc: 'Java seç' },
          { num: 4, label: 'JDK 21 seç', desc: 'SDK alanı' },
          { num: 5, label: 'Main class aç', desc: 'src → New → Java Class' },
          { num: 6, label: 'Run', desc: 'yeşil üçgen', highlight: true },
        ],
      },
      {
        type: 'code', language: 'text',
        label: 'IntelliJ IDEA — adım adım kurulum checklist',
        code: `1) https://www.jetbrains.com/idea/download/ adresine git.
2) IntelliJ IDEA indir. Öğrenme için ücretsiz kullanım yeterlidir.
3) Windows: .exe dosyasını çalıştır, wizard adımlarını geç.
   Önerilen seçenekler:
   - Desktop shortcut: işaretleyebilirsin
   - Add launchers dir to PATH: şart değil
   - Open Folder as Project: işaretlemek kullanışlı
   - .java dosyalarını IntelliJ ile ilişkilendir: işaretleyebilirsin
4) macOS: .dmg dosyasını aç, IntelliJ IDEA'yı Applications içine sürükle.
5) Linux: Toolbox kullan veya .tar.gz dosyasını temiz bir klasöre aç.
6) İlk açılışta tema/keymap seç; plugin kurma ekranında şimdilik ekstra plugin şart değil.
7) New Project → Java → JDK 21 seç → Create.`,
      },
      {
        type: 'simulation',
        scenario: 'java-intellij-project',
        icon: '🧠',
        color: '#7c3aed',
        title: { tr: 'IntelliJ’de İlk Java Projesi', en: 'First Java Project in IntelliJ' },
        description: {
          tr: 'IntelliJ içinde New Project açma, JDK seçme, src altında Main.java class oluşturma, main method yazma ve Run ile console output görme akışını izle.',
          en: 'Watch how to create a new project, select the JDK, create Main.java under src, write the main method, and run it.',
        },
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Merhaba IntelliJ!");
    }
}`,
      },
      {
        type: 'java-practice',
        icon: '🧠',
        title: { tr: 'IntelliJ Öncesi Kas Hafızası: Main.java Sen Yaz', en: 'Before IntelliJ Autocomplete: You Write Main.java' },
        intro: {
          tr: 'IntelliJ `psvm` veya `main` kısayolu verebilir ama önce bunu kendin yaz. Eksik parantez ve semicolon hatalarını bilerek yakala.',
          en: 'IntelliJ can generate this with `psvm` or `main`, but write it yourself first. Catch missing braces and semicolons intentionally.',
        },
        starterCode: {
          tr: `public class Main {
    public static void main(String[] args) {
        System.out.println("IntelliJ olmadan da yazabiliyorum");
    }
}`,
          en: `public class Main {
    public static void main(String[] args) {
        System.out.println("I can write this without autocomplete");
    }
}`,
        },
        height: 230,
      },
      {
        type: 'heading', text: { tr: '📦 Maven Nedir? Ne Zaman Kurmalıyım?', en: '📦 What Is Maven? When Should I Install It?' },
      },
      {
        type: 'text',
        content: 'Maven, Java projesinin proje yöneticisidir. İlk gün `javac` ile tek dosyayı elle derlemek en doğru öğrenme yoludur. Birden fazla class, JUnit testleri, Selenium/REST Assured gibi dış kütüphaneler, raporlar veya CI/CD gerektiğinde Maven’e geçilir. Maven `pom.xml` dosyasını okur, gerekli dependencyleri indirir, compile/test/package adımlarını standart sırayla çalıştırır.',
      },
      {
        type: 'visual', variant: 'flow',
        title: 'javac → IntelliJ → Maven Öğrenme Sırası',
        steps: [
          { num: 1, label: 'javac', desc: 'tek dosya, compiler mantığı', highlight: true },
          { num: 2, label: 'IntelliJ', desc: 'proje ve debug alışkanlığı' },
          { num: 3, label: 'Maven', desc: 'dependency + test + package', highlight: true },
          { num: 4, label: 'JUnit/Selenium', desc: 'QA automation altyapısı' },
        ],
        note: 'Maven ilk satır Java öğrenmek için değil, proje büyüdüğünde düzeni korumak için gereklidir.',
      },
      {
        type: 'code', language: 'bash',
        label: 'Maven kurulum ve doğrulama',
        code: `# Windows
winget install --id Apache.Maven

# macOS
brew install maven

# Ubuntu/Debian
sudo apt update
sudo apt install -y maven

# Doğrula
mvn -version

# Beklenen çıktı:
# Apache Maven 3.9.x
# Java version: 21.0.x`,
      },
      {
        type: 'simulation',
        scenario: 'java-maven-lifecycle',
        icon: '📦',
        color: '#2563eb',
        title: { tr: 'Maven Lifecycle: pom.xml → compile → test → package', en: 'Maven Lifecycle: pom.xml → compile → test → package' },
        description: {
          tr: 'Maven’in tek komutla dependency planını okumasını, Java kodunu derlemesini, JUnit testlerini çalıştırmasını ve target klasörüne paket üretmesini izle.',
          en: 'Watch Maven read the dependency plan, compile Java code, run JUnit tests, and produce a package under target.',
        },
        language: 'bash',
        code: `mvn package

# Maven sırayla şunları yapar:
# validate → compile → test → package`,
      },
  ],
  en: [
      {
        type: 'heading', text: { en: '🧪 After Installing the JDK: Run Your First .java File with javac' },
      },
      {
        type: 'text',
        content: 'After installing the JDK, you get two core commands: `javac` and `java`. `javac Main.java` compiles source code and creates `Main.class`. `java Main` runs that class on the JVM. The order is always: write the file → compile → run → inspect output.',
      },
      {
        type: 'visual', variant: 'flow',
        title: 'Manual Java Run Order',
        steps: [
          { num: 1, label: 'Create folder', desc: 'java-lab', highlight: true },
          { num: 2, label: 'Write Main.java', desc: 'public class Main' },
          { num: 3, label: 'javac Main.java', desc: 'compile' },
          { num: 4, label: 'Main.class appears', desc: 'bytecode', highlight: true },
          { num: 5, label: 'java Main', desc: 'run' },
          { num: 6, label: 'Console output', desc: 'Hello Java!', highlight: true },
        ],
        note: 'If the file is Main.java, the public class must be Main. Use .java with javac; do not use .java or .class with java Main.',
      },
      {
        type: 'simulation',
        scenario: 'java-javac-workshop',
        icon: '🧪',
        color: '#f97316',
        title: { tr: 'Terminalde javac Atölyesi', en: 'Terminal javac Workshop' },
        description: {
          tr: 'Klasör açma, Main.java oluşturma, javac ile derleme, Main.class dosyasını görme ve java Main ile çalıştırma akışını adım adım izle.',
          en: 'Watch the full flow: create a folder, create Main.java, compile with javac, see Main.class, and run it with java Main.',
        },
        language: 'powershell',
        code: `mkdir java-lab
cd java-lab
notepad Main.java

javac Main.java
dir
java Main`,
      },
      {
        type: 'code', language: 'powershell',
        label: 'Windows — create and run Main.java',
        code: `mkdir C:\\java-lab
cd C:\\java-lab

notepad Main.java

# Save this inside Main.java:
# public class Main {
#     public static void main(String[] args) {
#         System.out.println("Hello Java!");
#     }
# }

javac Main.java
dir
java Main

# Expected:
# Hello Java!`,
      },
      {
        type: 'code', language: 'bash',
        label: 'macOS/Linux — create and run Main.java',
        code: `mkdir -p ~/java-lab
cd ~/java-lab

cat > Main.java <<'EOF'
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}
EOF

javac Main.java
ls
java Main

# Expected:
# Hello Java!`,
      },
      {
        type: 'callout', color: 'yellow', emoji: '⚠️',
        title: 'Top 4 first-day mistakes',
        content: 'Typing `java Main.java` instead of `javac Main.java`; typing `java Main.class` instead of `java Main`; naming the file `main.java` while the class is `Main`; forgetting the `;` after `System.out.println(...)`.',
      },
      {
        type: 'java-practice',
        icon: '✍️',
        title: { tr: 'Kendin Yaz: Main Method ve Semicolon Alışkanlığı', en: 'Write It Yourself: Main Method and Semicolon Habit' },
        intro: {
          tr: 'Aşağıdaki eksik iskeleti tamamla. Her komut satırının sonuna ; koy. Sonra kontrol et.',
          en: 'Complete the skeleton below. End every statement with ;, then check it.',
        },
        starterCode: {
          tr: `public class Main {
    // Buraya main method yaz:

        System.out.println("Merhaba Java")
    }
}`,
          en: `public class Main {
    // Write the main method here:

        System.out.println("Hello Java")
    }
}`,
        },
        height: 250,
      },
      {
        type: 'heading', text: { en: '💻 What Is an IDE? What Types Exist?' },
      },
      {
        type: 'text',
        content: 'An IDE (Integrated Development Environment) is a coding workbench. Notepad only lets you type; an IDE shows the project folder, highlights mistakes, lets you select a JDK, and calls `javac` and `java` behind the Run button. It does not perform magic; it organizes the manual terminal steps into a friendlier interface.',
      },
      {
        type: 'table',
        headers: ['Tool type', 'Examples', 'When to use it'],
        rows: [
          ['Plain text editor', 'Notepad, basic VS Code', 'To understand the first `javac` flow'],
          ['Classic Java IDE', 'IntelliJ IDEA, Eclipse, NetBeans', 'Java classes, packages, run/debug, Maven projects'],
          ['Online IDE', 'Replit, Gitpod-like tools', 'Short experiments without local setup'],
          ['AI-assisted IDE/editor', 'Cursor, Windsurf, Copilot-enabled IDEs', 'To speed up after the basics are solid'],
        ],
      },
      {
        type: 'callout', color: 'orange', emoji: '🧠',
        title: 'Why not start with an AI IDE such as Cursor?',
        content: 'Because the first goal is not fast code generation; it is building muscle memory for `class`, `main`, `{}`, `;`, reading errors, and understanding Run vs Debug. If AI writes too much too early, code may look correct while the reason stays invisible. After 2-3 weeks of basic syntax and error reading, AI-assisted editors become excellent accelerators.',
      },
      {
        type: 'heading', text: { en: '🧠 How to Download and Install IntelliJ IDEA' },
      },
      {
        type: 'text',
        content: 'In JetBrains’ current model, IntelliJ IDEA is downloaded as a unified product. Core usage can continue for free; advanced Ultimate features require a subscription. Free IntelliJ IDEA usage is enough for learning Java. You can install it through JetBrains Toolbox App or a direct installer; Toolbox is more comfortable for updates and multiple JetBrains tools.',
      },
      {
        type: 'visual', variant: 'flow',
        title: 'IntelliJ Install and First Project Flow',
        steps: [
          { num: 1, label: 'Install JDK', desc: 'java/javac work' },
          { num: 2, label: 'Download IntelliJ', desc: 'jetbrains.com/idea/download', highlight: true },
          { num: 3, label: 'New Project', desc: 'choose Java' },
          { num: 4, label: 'Select JDK 21', desc: 'SDK field' },
          { num: 5, label: 'Create Main class', desc: 'src → New → Java Class' },
          { num: 6, label: 'Run', desc: 'green triangle', highlight: true },
        ],
      },
      {
        type: 'code', language: 'text',
        label: 'IntelliJ IDEA — step-by-step install checklist',
        code: `1) Go to https://www.jetbrains.com/idea/download/
2) Download IntelliJ IDEA. Free usage is enough for learning.
3) Windows: run the .exe installer and follow the wizard.
   Useful options:
   - Desktop shortcut: optional
   - Add launchers dir to PATH: optional
   - Open Folder as Project: useful
   - Associate .java files: useful
4) macOS: open the .dmg and drag IntelliJ IDEA to Applications.
5) Linux: use Toolbox or extract the .tar.gz to a clean folder.
6) On first launch, choose theme/keymap. Extra plugins are not required yet.
7) New Project → Java → select JDK 21 → Create.`,
      },
      {
        type: 'simulation',
        scenario: 'java-intellij-project',
        icon: '🧠',
        color: '#7c3aed',
        title: { tr: 'IntelliJ’de İlk Java Projesi', en: 'First Java Project in IntelliJ' },
        description: {
          tr: 'IntelliJ içinde New Project açma, JDK seçme, src altında Main.java class oluşturma, main method yazma ve Run ile console output görme akışını izle.',
          en: 'Watch how to create a new project, select the JDK, create Main.java under src, write the main method, and run it.',
        },
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello IntelliJ!");
    }
}`,
      },
      {
        type: 'java-practice',
        icon: '🧠',
        title: { tr: 'IntelliJ Öncesi Kas Hafızası: Main.java Sen Yaz', en: 'Before IntelliJ Autocomplete: You Write Main.java' },
        intro: {
          tr: 'IntelliJ `psvm` veya `main` kısayolu verebilir ama önce bunu kendin yaz. Eksik parantez ve semicolon hatalarını bilerek yakala.',
          en: 'IntelliJ can generate this with `psvm` or `main`, but write it yourself first. Catch missing braces and semicolons intentionally.',
        },
        starterCode: {
          tr: `public class Main {
    public static void main(String[] args) {
        System.out.println("IntelliJ olmadan da yazabiliyorum");
    }
}`,
          en: `public class Main {
    public static void main(String[] args) {
        System.out.println("I can write this without autocomplete");
    }
}`,
        },
        height: 230,
      },
      {
        type: 'heading', text: { en: '📦 What Is Maven? When Should I Install It?' },
      },
      {
        type: 'text',
        content: 'Maven is the project manager for Java. On day one, compiling one file with `javac` is the right learning path. Move to Maven when you have multiple classes, JUnit tests, external libraries such as Selenium/REST Assured, reports, or CI/CD. Maven reads `pom.xml`, downloads dependencies, and runs compile/test/package in a standard order.',
      },
      {
        type: 'visual', variant: 'flow',
        title: 'javac → IntelliJ → Maven Learning Order',
        steps: [
          { num: 1, label: 'javac', desc: 'single file, compiler logic', highlight: true },
          { num: 2, label: 'IntelliJ', desc: 'project and debug habits' },
          { num: 3, label: 'Maven', desc: 'dependency + test + package', highlight: true },
          { num: 4, label: 'JUnit/Selenium', desc: 'QA automation base' },
        ],
        note: 'Maven is not required for your first line of Java; it becomes essential when the project grows.',
      },
      {
        type: 'code', language: 'bash',
        label: 'Install and verify Maven',
        code: `# Windows
winget install --id Apache.Maven

# macOS
brew install maven

# Ubuntu/Debian
sudo apt update
sudo apt install -y maven

# Verify
mvn -version

# Expected:
# Apache Maven 3.9.x
# Java version: 21.0.x`,
      },
      {
        type: 'simulation',
        scenario: 'java-maven-lifecycle',
        icon: '📦',
        color: '#2563eb',
        title: { tr: 'Maven Lifecycle: pom.xml → compile → test → package', en: 'Maven Lifecycle: pom.xml → compile → test → package' },
        description: {
          tr: 'Maven’in tek komutla dependency planını okumasını, Java kodunu derlemesini, JUnit testlerini çalıştırmasını ve target klasörüne paket üretmesini izle.',
          en: 'Watch Maven read the dependency plan, compile Java code, run JUnit tests, and produce a package under target.',
        },
        language: 'bash',
        code: `mvn package

# Maven runs:
# validate → compile → test → package`,
      },
  ],
}

// ─── S1: KURULUM ──────────────────────────────────────────────────────────────
const s1 = {
  tr: {
    title: '⚙️ Java Kurulumu ve İlk Proje',
    blocks: [
      {
        type: 'simple-box', emoji: '📦',
        content: 'Java öğrenme sırası basittir: önce JDK kurulur, sonra `javac` ile tek dosya elle derlenir, ardından IntelliJ gibi bir IDE ile proje yazma alışkanlığı kazanılır. Maven ise ilk gün şart değildir; proje büyüyüp dependency, test ve paketleme ihtiyacı başladığında devreye girer.',
      },
      {
        type: 'heading', text: { tr: '🪟 Windows Kurulumu', en: '🪟 Windows Installation' },
      },
      {
        type: 'code', language: 'powershell',
        label: 'Windows — winget ile JDK 21 kurulumu',
        code: `# JDK 21 (LTS) kur
winget install --id EclipseAdoptium.Temurin.21.JDK

# Alternatif: Oracle JDK
winget install --id Oracle.JDK.21

# Maven'i şimdilik kurmak zorunda değilsin; aşağıdaki Maven bölümünde ayrıntılı anlatılıyor.`,
      },
      {
        type: 'callout', color: 'yellow', emoji: '⚠️',
        title: 'Output you should see:',
        content: 'Found Eclipse Temurin JDK 21 ... Successfully installed',
      },
      {
        type: 'code', language: 'powershell',
        label: 'JAVA_HOME Environment Variable (PowerShell)',
        code: `# JAVA_HOME ayarla (yönetici olarak çalıştır)
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.x", "Machine")
$env:PATH += ";$env:JAVA_HOME\\bin"

# Doğrulama
java -version
javac -version`,
      },
      {
        type: 'heading', text: { tr: '🍎 macOS Kurulumu', en: '🍎 macOS Installation' },
      },
      {
        type: 'code', language: 'bash',
        label: 'macOS — Homebrew ile kurulum',
        code: `# Homebrew yoksa önce kur
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# JDK 21 kur (Temurin — açık kaynak, ücretsiz)
brew install --cask temurin@21

# JAVA_HOME ayarla (~/.zshrc veya ~/.bash_profile)
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 21)' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# Doğrulama
java -version
javac -version`,
      },
      {
        type: 'heading', text: { tr: '🐧 Linux Kurulumu', en: '🐧 Linux Installation' },
      },
      {
        type: 'code', language: 'bash',
        label: 'Ubuntu/Debian',
        code: `# Paket listesini güncelle
sudo apt update

# JDK 21 kur
sudo apt install -y openjdk-21-jdk

# JAVA_HOME ayarla
echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Doğrulama
java -version
javac -version`,
      },
      {
        type: 'code', language: 'bash',
        label: 'CentOS/RHEL/Fedora',
        code: `# JDK 21 kur
sudo dnf install -y java-21-openjdk-devel

# Doğrulama
java -version
javac -version`,
      },
      {
        type: 'heading', text: { tr: '✅ Verification — Kurulum Doğrulama', en: '✅ Verification — Confirm Installation' },
      },
      {
        type: 'code', language: 'bash',
        label: 'Tüm platformlar — doğrulama komutları',
        code: `java -version
# Beklenen çıktı:
# openjdk version "21.0.x" ...

javac -version
# Beklenen çıktı:
# javac 21.0.x`,
      },
      ...javaSetupWorkshop.tr,
      {
        type: 'heading', text: { tr: '🚀 İlk Maven Projesi', en: '🚀 First Maven Project' },
      },
      {
        type: 'code', language: 'bash',
        label: 'Maven Quickstart Projesi Oluştur',
        code: `mvn archetype:generate \\
  -DgroupId=com.qa.learn \\
  -DartifactId=java-qa-project \\
  -DarchetypeArtifactId=maven-archetype-quickstart \\
  -DarchetypeVersion=1.4 \\
  -DinteractiveMode=false

cd java-qa-project
mvn test`,
      },
      {
        type: 'callout', color: 'green', emoji: '✅',
        title: 'Output you should see:',
        content: 'BUILD SUCCESS — Tests run: 1, Failures: 0, Errors: 0',
      },
      {
        type: 'quiz',
        question: { tr: 'Maven projelerinde tüm bağımlılıkların, eklentilerin ve proje konfigürasyonlarının yönetildiği ana XML dosyası hangisidir?', en: 'Which main XML file is used to manage dependencies, plugins, and project configurations in a Maven project?' },
        options: [
          { id: 'a', text: 'build.gradle' },
          { id: 'b', text: 'pom.xml' },
          { id: 'c', text: 'maven.config' },
          { id: 'd', text: 'settings.xml' },
        ],
        correct: 'b',
        explanation: { tr: 'pom.xml (Project Object Model), Maven\'in kalbidir. Projenin kimliği, bağımlılıkları (dependencies), build ayarları ve eklentileri (plugins) bu dosyada XML formatında tanımlanır.', en: 'pom.xml (Project Object Model) is the heart of Maven. The project identity, dependencies, build settings, and plugins are defined in this XML file.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir Maven projesinde, projenin sahip olduğu dış kütüphaneleri (bağımlılıkları) tanımlamak için kullanılan standart yapılandırma dosyası hangisidir?",
            "en": "Which standard configuration file is used in a Maven project to define the external libraries (dependencies) that the project possesses?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "pom.xml"
            },
            {
                  "id": "b",
                  "text": "manifest.mf"
            },
            {
                  "id": "c",
                  "text": "build.xml"
            },
            {
                  "id": "d",
                  "text": "application.properties"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Maven yapısında pom.xml, projenin yapılandırma merkezidir. Bağımlılıkların versiyonları ve projeye dahil edilmesi burada yönetilir.",
            "en": "In the Maven structure, pom.xml is the project's configuration center. It manages dependency versions and how they are included in the project."
      }
}
},
    ],
  },
  en: {
    title: '⚙️ Java Installation and First Project',
    blocks: [
      {
        type: 'simple-box', emoji: '📦',
        content: 'The Java learning order is simple: install the JDK first, compile one file manually with `javac`, then use an IDE such as IntelliJ to build project habits. Maven is not required on day one; it becomes useful when you need dependencies, tests, and packaging.',
      },
      {
        type: 'heading', text: { tr: '🪟 Windows Kurulumu', en: '🪟 Windows Installation' },
      },
      {
        type: 'code', language: 'powershell',
        label: 'Windows — Install JDK 21 with winget',
        code: `# Install JDK 21 (LTS)
winget install --id EclipseAdoptium.Temurin.21.JDK

# Alternative: Oracle JDK
winget install --id Oracle.JDK.21

# You do not need Maven yet; the Maven section below explains when and how to install it.`,
      },
      {
        type: 'callout', color: 'yellow', emoji: '⚠️',
        title: 'Output you should see:',
        content: 'Found Eclipse Temurin JDK 21 ... Successfully installed',
      },
      {
        type: 'code', language: 'powershell',
        label: 'Set JAVA_HOME (Run as Administrator)',
        code: `[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.x", "Machine")
$env:PATH += ";$env:JAVA_HOME\\bin"

# Verify
java -version
javac -version`,
      },
      {
        type: 'heading', text: { tr: '🍎 macOS Kurulumu', en: '🍎 macOS Installation' },
      },
      {
        type: 'code', language: 'bash',
        label: 'macOS — Install with Homebrew',
        code: `brew install --cask temurin@21

echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 21)' >> ~/.zshrc
source ~/.zshrc

java -version
javac -version`,
      },
      {
        type: 'heading', text: { tr: '🐧 Linux Kurulumu', en: '🐧 Linux Installation' },
      },
      {
        type: 'code', language: 'bash',
        label: 'Ubuntu/Debian',
        code: `sudo apt update && sudo apt install -y openjdk-21-jdk
echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
source ~/.bashrc
java -version && javac -version`,
      },
      {
        type: 'heading', text: { tr: '✅ Verification', en: '✅ Verification' },
      },
      {
        type: 'code', language: 'bash',
        label: 'All platforms — verify commands',
        code: `java -version
# Expected: openjdk version "21.0.x"

javac -version
# Expected: javac 21.0.x`,
      },
      ...javaSetupWorkshop.en,
      {
        type: 'heading', text: { tr: '🚀 İlk Maven Projesi', en: '🚀 First Maven Project' },
      },
      {
        type: 'code', language: 'bash',
        label: 'Create Maven Quickstart Project',
        code: `mvn archetype:generate \\
  -DgroupId=com.qa.learn \\
  -DartifactId=java-qa-project \\
  -DarchetypeArtifactId=maven-archetype-quickstart \\
  -DarchetypeVersion=1.4 \\
  -DinteractiveMode=false

cd java-qa-project && mvn test`,
      },
      {
        type: 'callout', color: 'green', emoji: '✅',
        title: 'Output you should see:',
        content: 'BUILD SUCCESS — Tests run: 1, Failures: 0, Errors: 0',
      },
      {
        type: 'quiz',
        question: { tr: 'Maven projelerinde tüm bağımlılıkların, eklentilerin ve proje konfigürasyonlarının yönetildiği ana XML dosyası hangisidir?', en: 'Which main XML file is used to manage dependencies, plugins, and project configurations in a Maven project?' },
        options: [
          { id: 'a', text: 'build.gradle' },
          { id: 'b', text: 'pom.xml' },
          { id: 'c', text: 'maven.config' },
          { id: 'd', text: 'settings.xml' },
        ],
        correct: 'b',
        explanation: { tr: 'pom.xml (Project Object Model), Maven\'in kalbidir. Projenin kimliği, bağımlılıkları (dependencies), build ayarları ve eklentileri (plugins) bu dosyada XML formatında tanımlanır.', en: 'pom.xml (Project Object Model) is the heart of Maven. The project identity, dependencies, build settings, and plugins are defined in this XML file.' },
      
        retryQuestion: {
      "question": {
            "tr": "Maven yapısında bir projenin bağımlılıklarını ve yapılandırma ayarlarını merkezi bir yerden yönetmek için kullanılan temel yapılandırma dosyası hangisidir?",
            "en": "Which configuration file serves as the central location to manage dependencies and build configuration settings in a Maven project?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "project.json"
            },
            {
                  "id": "b",
                  "text": "pom.xml"
            },
            {
                  "id": "c",
                  "text": "maven.properties"
            },
            {
                  "id": "d",
                  "text": "manifest.mf"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Maven projelerinde Project Object Model (POM) dosyası olan pom.xml, projenin yapılandırmasından, kütüphane bağımlılıklarından ve build süreçlerinden sorumlu ana dosyadır.",
            "en": "In Maven projects, the pom.xml file, which stands for Project Object Model, is the primary file responsible for the project's configuration, library dependencies, and build processes."
      }
}
},
    ],
  },
}

// ─── S2: OOP & COLLECTIONS ────────────────────────────────────────────────────
const s2 = {
  tr: {
    title: '🏗️ OOP & Collections',
    blocks: [
      {
        type: 'simple-box', emoji: '🧱',
        content: 'OOP\'yi LEGO seti gibi düşün. Her LEGO parçası (class) kendi içinde tamamdır — rengi, şekli, yapısı var. Parçaları birbirine takarak (composition) büyük yapılar oluşturuyorsun. Collections ise bu parçaları sakladığın kutu.',
      },
      {
        type: 'visual', variant: 'boxes',
        title: 'Class → Object → Kullanım',
        items: [
          { icon: '🏗️', label: 'Class', desc: 'Object kalıbı', highlight: true },
          { arrow: true },
          { icon: '🧾', label: 'Fields', desc: 'username, email, age' },
          { icon: '⚙️', label: 'Methods', desc: 'open(), login(), logout()' },
          { arrow: true },
          { icon: '🧍', label: 'Object', desc: 'new TestUser(...)', highlight: true },
        ],
        note: 'Pasif özellik = field, aktif davranış = method. QA Page Object modelinde aynı mantık kullanılır.',
      },
      {
        type: 'heading', text: { tr: 'Class & Object', en: 'Class & Object' },
      },
      {
        type: 'code', language: 'java',
        label: 'Class tanımı ve Object oluşturma',
        code: `// Class — şablon / blueprint
public class TestUser {
    // Fields (instance variables)
    private String username;
    private String email;
    private int age;

    // Constructor
    public TestUser(String username, String email, int age) {
        this.username = username;
        this.email   = email;
        this.age     = age;
    }

    // Getter & Setter
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    // toString — @Override
    @Override
    public String toString() {
        return "TestUser{username='" + username + "', email='" + email + "'}";
    }
}

// Object oluşturma
TestUser user1 = new TestUser("admin", "admin@test.com", 30);
TestUser user2 = new TestUser("qa_user", "qa@test.com", 25);
System.out.println(user1); // TestUser{username='admin', email='admin@test.com'}`,
      },
      {
        type: 'heading', text: { tr: 'Interface & Abstract Class', en: 'Interface & Abstract Class' },
      },
      {
        type: 'table',
        headers: ['Özellik', 'Interface', 'Abstract Class'],
        rows: [
          ['Çoklu kalıtım', '✅ implements birden fazla', '❌ sadece 1 extend'],
          ['Constructor', '❌ yok', '✅ var'],
          ['Default method', '✅ Java 8+ (default)', '✅ normal method'],
          ['Field', 'sadece public static final', 'her türlü field'],
          ['QA\'da kullanım', 'Page Object, BasePage contract', 'Ortak setup/teardown'],
        ],
      },
      {
        type: 'code', language: 'java',
        label: 'Interface — Page Object pattern\'de kullanım',
        code: `// Interface — sözleşme tanımlar
public interface PageActions {
    void open();
    boolean isLoaded();
    void waitForElement(String locator);
}

// Abstract Class — ortak davranış
public abstract class BasePage implements PageActions {
    protected WebDriver driver;
    protected WebDriverWait wait;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Ortak metod — alt sınıflar kullanabilir
    public void waitForElement(String locator) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(locator)));
    }
}

// Concrete class — abstract class'tan türer
public class LoginPage extends BasePage {
    public LoginPage(WebDriver driver) { super(driver); }

    @Override
    public void open() { driver.get("https://example.com/login"); }

    @Override
    public boolean isLoaded() {
        return driver.findElement(By.id("loginForm")).isDisplayed();
    }
}`,
      },
      {
        type: 'heading', text: { tr: 'Java Collections — QA\'da En Çok Kullanılanlar', en: 'Java Collections — Most Used in QA' },
      },
      {
        type: 'visual', variant: 'boxes',
        title: 'Collections Hiyerarşisi',
        items: [
          { icon: '📦', label: 'Collection', desc: 'Temel arayüz', highlight: true },
          { arrow: true },
          { icon: '📋', label: 'List', desc: 'ArrayList, LinkedList' },
          { arrow: true },
          { icon: '🔷', label: 'Set', desc: 'HashSet, TreeSet' },
          { arrow: true },
          { icon: '🗺️', label: 'Map', desc: 'HashMap, LinkedHashMap' },
        ],
      },
      {
        type: 'code', language: 'java',
        label: 'ArrayList — Test verisi saklamak için',
        code: `import java.util.*;

// ArrayList — sıralı, tekrarlı, dinamik dizi
List<String> testUrls = new ArrayList<>();
testUrls.add("https://example.com/home");
testUrls.add("https://example.com/login");
testUrls.add("https://example.com/products");

// Döngü ile her URL'yi test et
for (String url : testUrls) {
    driver.get(url);
    assertEquals(200, getStatusCode(url));
}

// Lambda ile filtreleme (Java 8+)
List<String> loginPages = testUrls.stream()
    .filter(url -> url.contains("login"))
    .collect(Collectors.toList());`,
      },
      {
        type: 'code', language: 'java',
        label: 'HashMap — Test data çiftleri için',
        code: `// HashMap — key-value çiftleri, QA'da login data için ideal
Map<String, String> testCredentials = new HashMap<>();
testCredentials.put("admin", "admin123");
testCredentials.put("user", "user456");
testCredentials.put("readonly", "readonly789");

// Entry ile döngü
for (Map.Entry<String, String> entry : testCredentials.entrySet()) {
    loginPage.login(entry.getKey(), entry.getValue());
    assertTrue(dashboard.isLoaded(), "Login failed for: " + entry.getKey());
    loginPage.logout();
}

// Belirli key al
String adminPass = testCredentials.get("admin"); // "admin123"
boolean hasAdmin = testCredentials.containsKey("admin"); // true`,
      },
      {
        type: 'code', language: 'java',
        label: 'Generics — Type-safe koleksiyonlar',
        code: `// Generics — compile time'da tip güvenliği
public class TestDataProvider<T> {
    private List<T> data = new ArrayList<>();

    public void add(T item) { data.add(item); }
    public T get(int index)  { return data.get(index); }
    public int size()         { return data.size(); }
}

// Kullanım — herhangi bir tipte çalışır
TestDataProvider<String> usernames = new TestDataProvider<>();
usernames.add("admin");
usernames.add("user1");

TestDataProvider<Integer> userIds = new TestDataProvider<>();
userIds.add(1001);
userIds.add(1002);`,
      },
      {
        type: 'quiz',
        question: { tr: 'HashMap ile LinkedHashMap arasındaki temel fark nedir?', en: 'What is the key difference between HashMap and LinkedHashMap?' },
        options: [
          { id: 'a', text: 'HashMap thread-safe\'dir' },
          { id: 'b', text: 'LinkedHashMap insertion order\'ı korur, HashMap korumaz' },
          { id: 'c', text: 'LinkedHashMap daha hızlıdır' },
          { id: 'd', text: 'HashMap null key kabul etmez' },
        ],
        correct: 'b',
        explanation: { tr: 'LinkedHashMap, ekleme sırasını (insertion order) korur — test loglarında ve raporlarda adım sırasını görmek istediğinizde kullanışlıdır. HashMap ise sırayı garanti etmez ama genellikle daha hafiftir.', en: 'LinkedHashMap preserves insertion order — useful when you want to see step order in test logs and reports. HashMap doesn\'t guarantee order but is generally lighter.' },
      
        retryQuestion: {
      "question": {
            "tr": "Java'da TreeMap ve HashMap yapılarının sıralama davranışı açısından farkı nedir?",
            "en": "What is the difference between TreeMap and HashMap in terms of ordering behavior in Java?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "HashMap verileri anahtarların doğal sırasına göre sıralar"
            },
            {
                  "id": "b",
                  "text": "TreeMap, anahtarları doğal sıraya (natural order) göre sıralar, HashMap ise sıralama garantisi vermez"
            },
            {
                  "id": "c",
                  "text": "HashMap, verileri eklenme sırasına göre tutar"
            },
            {
                  "id": "d",
                  "text": "Her ikisi de verileri rastgele bir sırayla tutar"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "TreeMap, anahtarları (keys) doğal sıralama düzenine veya tanımlanan bir Comparator'a göre sıralı tutar. HashMap ise performans odaklıdır ve elemanların sıralaması üzerinde herhangi bir garanti sağlamaz.",
            "en": "TreeMap maintains keys in their natural sorted order or according to a provided Comparator, whereas HashMap focuses on performance and provides no guarantee regarding the order of elements."
      }
}
},
    ],
  },
  en: {
    title: '🏗️ OOP & Collections',
    blocks: [
      {
        type: 'simple-box', emoji: '🧱',
        content: 'Think of OOP as a LEGO set. Each LEGO piece (class) is complete in itself — it has color, shape, structure. You connect pieces (composition) to build large structures. Collections is the box where you store these pieces.',
      },
      {
        type: 'visual', variant: 'boxes',
        title: 'Class → Object → Usage',
        items: [
          { icon: '🏗️', label: 'Class', desc: 'Object blueprint', highlight: true },
          { arrow: true },
          { icon: '🧾', label: 'Fields', desc: 'username, email, age' },
          { icon: '⚙️', label: 'Methods', desc: 'open(), login(), logout()' },
          { arrow: true },
          { icon: '🧍', label: 'Object', desc: 'new TestUser(...)', highlight: true },
        ],
        note: 'Passive property = field, active behavior = method. QA Page Object models use the same idea.',
      },
      {
        type: 'heading', text: { tr: 'Class & Object', en: 'Class & Object' },
      },
      {
        type: 'code', language: 'java',
        label: 'Class definition and Object creation',
        code: `public class TestUser {
    private String username;
    private String email;
    private int age;

    public TestUser(String username, String email, int age) {
        this.username = username;
        this.email   = email;
        this.age     = age;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    @Override
    public String toString() {
        return "TestUser{username='" + username + "', email='" + email + "'}";
    }
}

TestUser user1 = new TestUser("admin", "admin@test.com", 30);
System.out.println(user1);`,
      },
      {
        type: 'heading', text: { tr: 'Interface & Abstract Class', en: 'Interface & Abstract Class' },
      },
      {
        type: 'table',
        headers: ['Feature', 'Interface', 'Abstract Class'],
        rows: [
          ['Multiple inheritance', '✅ implements multiple', '❌ only 1 extend'],
          ['Constructor', '❌ none', '✅ yes'],
          ['Default method', '✅ Java 8+ (default)', '✅ normal method'],
          ['Fields', 'public static final only', 'any type of field'],
          ['QA usage', 'Page Object, BasePage contract', 'Common setup/teardown'],
        ],
      },
      {
        type: 'code', language: 'java',
        label: 'Interface — Usage in Page Object pattern',
        code: `public interface PageActions {
    void open();
    boolean isLoaded();
    void waitForElement(String locator);
}

public abstract class BasePage implements PageActions {
    protected WebDriver driver;
    protected WebDriverWait wait;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void waitForElement(String locator) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(locator)));
    }
}`,
      },
      {
        type: 'heading', text: { tr: 'Java Collections — QA\'da En Çok Kullanılanlar', en: 'Java Collections — Most Used in QA' },
      },
      {
        type: 'code', language: 'java',
        label: 'ArrayList — For storing test data',
        code: `List<String> testUrls = new ArrayList<>();
testUrls.add("https://example.com/home");
testUrls.add("https://example.com/login");

for (String url : testUrls) {
    driver.get(url);
    assertEquals(200, getStatusCode(url));
}`,
      },
      {
        type: 'code', language: 'java',
        label: 'HashMap — For test data pairs',
        code: `Map<String, String> credentials = new HashMap<>();
credentials.put("admin", "admin123");
credentials.put("user", "user456");

for (Map.Entry<String, String> entry : credentials.entrySet()) {
    loginPage.login(entry.getKey(), entry.getValue());
    assertTrue(dashboard.isLoaded());
    loginPage.logout();
}`,
      },
      {
        type: 'quiz',
        question: { tr: 'HashMap ile LinkedHashMap arasındaki temel fark nedir?', en: 'What is the key difference between HashMap and LinkedHashMap?' },
        options: [
          { id: 'a', text: 'HashMap is thread-safe' },
          { id: 'b', text: 'LinkedHashMap preserves insertion order, HashMap does not' },
          { id: 'c', text: 'LinkedHashMap is faster' },
          { id: 'd', text: 'HashMap does not accept null keys' },
        ],
        correct: 'b',
        explanation: { tr: 'LinkedHashMap ekleme sırasını korur.', en: 'LinkedHashMap preserves insertion order — useful when you want to see step order in test logs and reports. HashMap doesn\'t guarantee order.' },
      
        retryQuestion: {
      "question": {
            "tr": "Java'da TreeMap ve HashMap yapılarının sıralama davranışı açısından farkı nedir?",
            "en": "What is the difference between TreeMap and HashMap in terms of ordering behavior in Java?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "HashMap stores elements in natural order"
            },
            {
                  "id": "b",
                  "text": "TreeMap stores keys in sorted order, while HashMap does not guarantee any order"
            },
            {
                  "id": "c",
                  "text": "HashMap stores elements based on insertion order"
            },
            {
                  "id": "d",
                  "text": "Both collections store elements in a random order"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "TreeMap elemanları sıralı tutarken, HashMap performans için sıralamayı göz ardı eder.",
            "en": "TreeMap keeps elements sorted according to their keys, whereas HashMap ignores order for the sake of performance."
      }
}
},
    ],
  },
}

// ─── S3: JUNIT5 & TESTNG ─────────────────────────────────────────────────────
const s3 = {
  tr: {
    title: '🧪 JUnit5 & TestNG — Test Framework\'leri',
    blocks: [
      {
        type: 'simple-box', emoji: '🧪',
        content: 'JUnit5 ve TestNG\'yi iki farklı banka gibi düşün. Her ikisi de işini yapıyor — para yatırıp çekebiliyorsun. Ama biri belki daha fazla şube açmış (TestNG\'nin daha fazla annotation\'ı var), diğeri daha modern ve hızlı büyüyor (JUnit5 modüler yapı). Hangisini seçeceğin işvereninin tercihine göre değişir.',
      },
      {
        type: 'table',
        headers: ['Özellik', 'JUnit5', 'TestNG'],
        rows: [
          ['Test annotation', '@Test', '@Test'],
          ['Before all', '@BeforeAll', '@BeforeSuite / @BeforeClass'],
          ['Before each', '@BeforeEach', '@BeforeMethod'],
          ['After each', '@AfterEach', '@AfterMethod'],
          ['After all', '@AfterAll', '@AfterSuite / @AfterClass'],
          ['Parametrize', '@ParameterizedTest + @ValueSource', '@DataProvider'],
          ['Grouping', '@Tag', '@Groups'],
          ['Parallel', '@Execution(CONCURRENT)', 'testng.xml parallel attribute'],
          ['Soft asserts', '3. parti (AssertJ)', 'SoftAssert built-in'],
          ['Selenium ile?', 'JUnit5 + Selenium yaygın', 'TestNG + Selenium çok yaygın'],
        ],
      },
      {
        type: 'heading', text: { tr: 'JUnit5 Temel Annotationlar', en: 'JUnit5 Core Annotations' },
      },
      {
        type: 'code', language: 'java',
        label: 'JUnit5 — Temel yapı',
        code: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Login Sayfası Testleri")
class LoginTest {

    static WebDriver driver;

    @BeforeAll
    static void setupClass() {
        // Tüm testlerden önce bir kez çalışır
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @BeforeEach
    void setUp() {
        // Her test metodundan önce çalışır
        driver.get("https://example.com/login");
    }

    @Test
    @DisplayName("Geçerli kullanıcı ile giriş yapılabilmeli")
    void validLoginShouldSucceed() {
        driver.findElement(By.id("username")).sendKeys("admin");
        driver.findElement(By.id("password")).sendKeys("admin123");
        driver.findElement(By.id("loginBtn")).click();

        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("/dashboard"),
            "Login sonrası dashboard'a yönlendirilmeli");
    }

    @Test
    @DisplayName("Yanlış şifreyle giriş reddedilmeli")
    void invalidPasswordShouldFail() {
        driver.findElement(By.id("username")).sendKeys("admin");
        driver.findElement(By.id("password")).sendKeys("wrongpass");
        driver.findElement(By.id("loginBtn")).click();

        String errorMsg = driver.findElement(By.className("error-msg")).getText();
        assertEquals("Invalid credentials", errorMsg);
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "null"})
    @DisplayName("Boş kullanıcı adı ile giriş yapılamamalı")
    void emptyUsernameShouldFail(String username) {
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("loginBtn")).click();
        assertTrue(driver.findElement(By.className("error")).isDisplayed());
    }

    @AfterEach
    void tearDown() {
        // Her test metodundan sonra çalışır
        driver.manage().deleteAllCookies();
    }

    @AfterAll
    static void tearDownClass() {
        // Tüm testlerden sonra bir kez çalışır
        if (driver != null) driver.quit();
    }
}`,
      },
      {
        type: 'heading', text: { tr: 'TestNG Temel Annotationlar', en: 'TestNG Core Annotations' },
      },
      {
        type: 'code', language: 'java',
        label: 'TestNG — Temel yapı',
        code: `import org.testng.annotations.*;
import org.testng.Assert;
import org.testng.asserts.SoftAssert;

public class LoginTest {

    WebDriver driver;

    @BeforeSuite
    public void globalSetup() {
        System.out.println("Test Suite başlıyor...");
    }

    @BeforeClass
    public void setupClass() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @BeforeMethod
    public void setUp() {
        driver.get("https://example.com/login");
    }

    @Test(priority = 1, description = "Geçerli giriş testi")
    public void validLogin() {
        driver.findElement(By.id("username")).sendKeys("admin");
        driver.findElement(By.id("password")).sendKeys("admin123");
        driver.findElement(By.id("loginBtn")).click();
        Assert.assertTrue(driver.getCurrentUrl().contains("/dashboard"));
    }

    @Test(priority = 2)
    @Parameters({"username", "password"})  // testng.xml'den parametre
    public void parameterizedLogin(String username, String password) {
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("loginBtn")).click();
    }

    @Test
    @DataProvider(name = "invalidCredentials")
    // dataProvider kullanan @Test için:
    public void invalidLoginWithDataProvider(String username, String password) {
        SoftAssert soft = new SoftAssert();
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("loginBtn")).click();
        soft.assertTrue(driver.findElement(By.className("error")).isDisplayed());
        soft.assertAll();
    }

    @DataProvider(name = "invalidCredentials")
    public Object[][] invalidCredentials() {
        return new Object[][] {
            {"",      "admin123"},
            {"admin", ""},
            {"wrong", "wrong"},
        };
    }

    @AfterMethod
    public void tearDown() {
        driver.manage().deleteAllCookies();
    }

    @AfterClass
    public void tearDownClass() {
        if (driver != null) driver.quit();
    }
}`,
      },
      {
        type: 'heading', text: { tr: 'pom.xml — Maven Bağımlılıkları', en: 'pom.xml — Maven Dependencies' },
      },
      {
        type: 'code', language: 'xml',
        label: 'pom.xml — JUnit5 + Selenium bağımlılıkları',
        code: `<dependencies>
    <!-- JUnit 5 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>
    </dependency>

    <!-- Selenium WebDriver -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.20.0</version>
    </dependency>

    <!-- WebDriverManager — driver otomatik indir -->
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.8.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.5</version>
        </plugin>
    </plugins>
</build>`,
      },
      {
        type: 'quiz',
        question: { tr: 'TestNG\'de her test metodundan önce çalışan annotation hangisidir?', en: 'Which TestNG annotation runs before each test method?' },
        options: [
          { id: 'a', text: '@BeforeAll' },
          { id: 'b', text: '@BeforeClass' },
          { id: 'c', text: '@BeforeMethod' },
          { id: 'd', text: '@BeforeTest' },
        ],
        correct: 'c',
        explanation: { tr: '@BeforeMethod her test metodundan önce çalışır — JUnit5\'teki @BeforeEach karşılığıdır. @BeforeClass sınıftaki tüm testlerden önce bir kez çalışır (JUnit5\'te @BeforeAll). @BeforeTest ise testng.xml\'deki <test> tag\'inden öncedir.', en: '@BeforeMethod runs before each test method — it is the equivalent of @BeforeEach in JUnit5. @BeforeClass runs once before all tests in the class (@BeforeAll in JUnit5). @BeforeTest runs before the <test> tag in testng.xml.' },
      
        retryQuestion: {
      "question": {
            "tr": "TestNG'de her test metodundan hemen sonra çalışması gereken temizleme işlemlerini hangi annotation ile yaparsınız?",
            "en": "Which TestNG annotation should you use for cleanup tasks that need to run immediately after each test method?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "@AfterClass"
            },
            {
                  "id": "b",
                  "text": "@AfterSuite"
            },
            {
                  "id": "c",
                  "text": "@AfterMethod"
            },
            {
                  "id": "d",
                  "text": "@AfterTest"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "@AfterMethod, tanımlandığı sınıftaki her bir @Test metodunun yürütülmesinden sonra çalışır. Genellikle test sonrası temizlik işlemleri için kullanılır.",
            "en": "@AfterMethod runs after the execution of each @Test method in the class. It is typically used for post-test cleanup operations."
      }
}
},
    ],
  },
  en: {
    title: '🧪 JUnit5 & TestNG — Test Frameworks',
    blocks: [
      {
        type: 'simple-box', emoji: '🧪',
        content: 'Think of JUnit5 and TestNG as two different banks. Both get the job done. But one has more branches open (TestNG has more annotations), while the other is more modern and growing faster (JUnit5 with modular architecture). Which you choose depends on your employer\'s preference.',
      },
      {
        type: 'table',
        headers: ['Feature', 'JUnit5', 'TestNG'],
        rows: [
          ['Test annotation', '@Test', '@Test'],
          ['Before all', '@BeforeAll', '@BeforeSuite / @BeforeClass'],
          ['Before each', '@BeforeEach', '@BeforeMethod'],
          ['After each', '@AfterEach', '@AfterMethod'],
          ['After all', '@AfterAll', '@AfterSuite / @AfterClass'],
          ['Parameterize', '@ParameterizedTest + @ValueSource', '@DataProvider'],
          ['Grouping', '@Tag', '@Groups'],
          ['Parallel', '@Execution(CONCURRENT)', 'testng.xml parallel attr'],
          ['Soft asserts', '3rd party (AssertJ)', 'SoftAssert built-in'],
          ['With Selenium?', 'JUnit5 + Selenium common', 'TestNG + Selenium very common'],
        ],
      },
      {
        type: 'heading', text: { tr: 'JUnit5 Temel Annotationlar', en: 'JUnit5 Core Annotations' },
      },
      {
        type: 'code', language: 'java',
        label: 'JUnit5 — Basic structure',
        code: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Login Page Tests")
class LoginTest {

    static WebDriver driver;

    @BeforeAll
    static void setupClass() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @BeforeEach
    void setUp() {
        driver.get("https://example.com/login");
    }

    @Test
    @DisplayName("Valid user should be able to login")
    void validLoginShouldSucceed() {
        driver.findElement(By.id("username")).sendKeys("admin");
        driver.findElement(By.id("password")).sendKeys("admin123");
        driver.findElement(By.id("loginBtn")).click();
        assertTrue(driver.getCurrentUrl().contains("/dashboard"));
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "null"})
    void emptyUsernameShouldFail(String username) {
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("loginBtn")).click();
        assertTrue(driver.findElement(By.className("error")).isDisplayed());
    }

    @AfterAll
    static void tearDownClass() {
        if (driver != null) driver.quit();
    }
}`,
      },
      {
        type: 'quiz',
        question: { tr: 'TestNG\'de her test metodundan önce çalışan annotation hangisidir?', en: 'Which TestNG annotation runs before each test method?' },
        options: [
          { id: 'a', text: '@BeforeAll' },
          { id: 'b', text: '@BeforeClass' },
          { id: 'c', text: '@BeforeMethod' },
          { id: 'd', text: '@BeforeTest' },
        ],
        correct: 'c',
        explanation: { tr: '@BeforeMethod her test metodundan önce çalışır.', en: '@BeforeMethod runs before each test method — the equivalent of @BeforeEach in JUnit5.' },
      
        retryQuestion: {
      "question": {
            "tr": "TestNG'de tüm sınıf (class) başlatılmadan önce sadece bir kez çalışması istenen bir kurulum metodu için hangi annotation kullanılmalıdır?",
            "en": "Which TestNG annotation should be used for a setup method that needs to run only once before the entire class is initialized?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "@BeforeMethod"
            },
            {
                  "id": "b",
                  "text": "@BeforeClass"
            },
            {
                  "id": "c",
                  "text": "@BeforeSuite"
            },
            {
                  "id": "d",
                  "text": "@BeforeGroups"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "@BeforeClass, sınıf içindeki test metotlarından önce bir kez çalışır. JUnit5'teki @BeforeAll'a karşılık gelir.",
            "en": "@BeforeClass runs once before any test methods in the current class are executed. It is the equivalent of @BeforeAll in JUnit5."
      }
}
},
    ],
  },
}

// ─── S4: GERÇEK HAYAT ─────────────────────────────────────────────────────────
const s4 = {
  tr: {
    title: '🛠️ Gerçek Hayat — E-Ticaret QA Projesi',
    blocks: [
      {
        type: 'simple-box', emoji: '🛠️',
        content: 'Gerçek bir QA işini düşün: e-ticaret sitesi, günde 10.000 kullanıcı. Her deploy öncesi login, ürün arama, sepete ekleme testlerini elle yapmak imkansız. Java + Selenium + JUnit5 ile 3 dakikada otomatik çalıştırırsın.',
      },
      {
        type: 'heading', text: { tr: 'Proje Yapısı — Maven Page Object Model', en: 'Project Structure — Maven POM' },
      },
      {
        type: 'code', language: 'bash',
        label: 'Dizin yapısı',
        code: `java-qa-project/
├── pom.xml
└── src/
    ├── main/java/com/qa/
    │   ├── base/BasePage.java
    │   ├── pages/LoginPage.java
    │   └── utils/DriverFactory.java
    └── test/java/com/qa/
        ├── tests/LoginTest.java
        └── testng.xml`,
      },
      {
        type: 'code', language: 'java',
        label: 'DriverFactory.java — ThreadLocal ile thread-safe driver',
        code: `import io.github.bonigarcia.wdm.WebDriverManager;

public class DriverFactory {
    private static ThreadLocal<WebDriver> pool = new ThreadLocal<>();

    public static WebDriver getDriver() {
        if (pool.get() == null) {
            WebDriverManager.chromedriver().setup();
            ChromeOptions opts = new ChromeOptions();
            opts.addArguments("--start-maximized");
            pool.set(new ChromeDriver(opts));
        }
        return pool.get();
    }

    public static void quitDriver() {
        if (pool.get() != null) { pool.get().quit(); pool.remove(); }
    }
}`,
      },
      {
        type: 'code', language: 'java',
        label: 'LoginPage.java — Page Object',
        code: `public class LoginPage extends BasePage {
    private final By usernameInput = By.id("username");
    private final By passwordInput = By.id("password");
    private final By loginButton   = By.id("loginBtn");
    private final By errorMessage  = By.className("error-msg");

    public LoginPage(WebDriver driver) { super(driver); }

    public void open() { driver.get(ConfigReader.get("base.url") + "/login"); }
    public boolean isLoaded() { return isElementVisible(loginButton); }

    public void login(String username, String password) {
        open();
        type(usernameInput, username);
        type(passwordInput, password);
        click(loginButton);
    }

    public String getErrorMessage() { return getText(errorMessage); }
}`,
      },
      {
        type: 'heading', text: { tr: 'Rakip Karşılaştırması', en: 'Competitor Comparison' },
      },
      {
        type: 'table',
        headers: ['Özellik', 'Java', 'Python', 'TypeScript'],
        rows: [
          ['Tip güvenliği', '✅ Statik', '❌ Dinamik', '✅ Statik'],
          ['Selenium desteği', '✅ En olgun', '✅ Çok iyi', '⚠️ İyi'],
          ['REST API testi', '✅ REST Assured', '✅ requests', '✅ Playwright API'],
          ['CI/CD', '✅ Her araç', '✅ Her araç', '✅ Her araç'],
          ['Şirket tercihi', 'Kurumsal', 'Startup/Data', 'Frontend odaklı'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Maven\'da testleri çalıştırmak ve test raporları oluşturmak için kullanılan varsayılan yaşam döngüsü aşaması (lifecycle phase) hangisidir?', en: 'Which default Maven lifecycle phase is used to run tests and generate test reports?' },
        options: [
          { id: 'a', text: 'compile' },
          { id: 'b', text: 'test' },
          { id: 'c', text: 'package' },
          { id: 'd', text: 'install' },
        ],
        correct: 'b',
        explanation: { tr: 'Maven\'da `mvn test` komutu test aşamasını (test phase) tetikler. Bu aşama, `src/test/java` altındaki test kodlarını derler ve Surefire eklentisini (plugin) kullanarak testleri çalıştırıp rapor üretir.', en: 'In Maven, the `mvn test` command triggers the test phase. This phase compiles test code under `src/test/java` and executes tests using the Surefire plugin to generate reports.' },
      
        retryQuestion: {
      "question": {
            "tr": "Maven projenizde sadece kodunuzu derlemek (compile) ve testleri atlamak istiyorsanız, hangi komutu kullanırsınız?",
            "en": "Which command would you use if you want to compile your Maven project code but skip running the tests?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "mvn install -DskipTests"
            },
            {
                  "id": "b",
                  "text": "mvn compile"
            },
            {
                  "id": "c",
                  "text": "mvn test -DskipTests"
            },
            {
                  "id": "d",
                  "text": "mvn package -DskipTests"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "`mvn compile` aşaması sadece kaynak kodlarını derler. Testleri çalıştırmak için `test` yaşam döngüsü aşamasına ulaşmanız gerekir.",
            "en": "The `mvn compile` phase only compiles the source code. To run tests, you would need to reach the `test` lifecycle phase."
      }
}
},
    ],
  },
  en: {
    title: '🛠️ Real World — E-Commerce QA Project',
    blocks: [
      {
        type: 'simple-box', emoji: '🛠️',
        content: 'Think of a real QA job: e-commerce site with 10,000 users/day. Running login, search, cart tests manually before every deploy is impossible. With Java + Selenium + JUnit5, run all tests automatically in 3 minutes.',
      },
      {
        type: 'code', language: 'java',
        label: 'DriverFactory.java — ThreadLocal thread-safe driver',
        code: `public class DriverFactory {
    private static ThreadLocal<WebDriver> pool = new ThreadLocal<>();

    public static WebDriver getDriver() {
        if (pool.get() == null) {
            WebDriverManager.chromedriver().setup();
            pool.set(new ChromeDriver(new ChromeOptions().addArguments("--start-maximized")));
        }
        return pool.get();
    }

    public static void quitDriver() {
        if (pool.get() != null) { pool.get().quit(); pool.remove(); }
    }
}`,
      },
      {
        type: 'table',
        headers: ['Feature', 'Java', 'Python', 'TypeScript'],
        rows: [
          ['Type safety', '✅ Static', '❌ Dynamic', '✅ Static'],
          ['Selenium', '✅ Most mature', '✅ Very good', '⚠️ Good'],
          ['REST API', '✅ REST Assured', '✅ requests', '✅ Playwright API'],
          ['Company preference', 'Enterprise', 'Startup/Data', 'Frontend-focused'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Maven\'da testleri çalıştırmak ve test raporları oluşturmak için kullanılan varsayılan yaşam döngüsü aşaması (lifecycle phase) hangisidir?', en: 'Which default Maven lifecycle phase is used to run tests and generate test reports?' },
        options: [
          { id: 'a', text: 'compile' },
          { id: 'b', text: 'test' },
          { id: 'c', text: 'package' },
          { id: 'd', text: 'install' },
        ],
        correct: 'b',
        explanation: { tr: 'Maven\'da `mvn test` komutu test aşamasını (test phase) tetikler. Bu aşama, `src/test/java` altındaki test kodlarını derler ve Surefire eklentisini (plugin) kullanarak testleri çalıştırıp rapor üretir.', en: 'In Maven, the `mvn test` command triggers the test phase. This phase compiles test code under `src/test/java` and executes tests using the Surefire plugin to generate reports.' },
      
        retryQuestion: {
      "question": {
            "tr": "Maven yapısında, `src/test/java` klasörü altındaki test dosyalarının derlenmesini ve Surefire eklentisi aracılığıyla testlerin koşturulmasını sağlayan yaşam döngüsü aşaması (lifecycle phase) aşağıdakilerden hangisidir?",
            "en": "In the Maven structure, which lifecycle phase is responsible for compiling test files located in `src/test/java` and executing the tests via the Surefire plugin?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "validate"
            },
            {
                  "id": "b",
                  "text": "test"
            },
            {
                  "id": "c",
                  "text": "verify"
            },
            {
                  "id": "d",
                  "text": "deploy"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Maven'da `test` aşaması, projenin testlerini yürütmek için tasarlanmıştır. Bu aşama öncesinde `compile` ve `test-compile` aşamaları çalışır, ardından Surefire eklentisi testleri otomatik olarak raporlar.",
            "en": "The `test` phase in Maven is designed to execute the project's tests. Preceding this, the `compile` and `test-compile` phases run, after which the Surefire plugin automatically processes the tests and generates reports."
      }
}
},
    ],
  },
}

// ─── S5: EKOSİSTEM ────────────────────────────────────────────────────────────
const s5 = {
  tr: {
    title: '🔗 Java QA Ekosistemi',
    blocks: [
      {
        type: 'simple-box', emoji: '🔗',
        content: 'Java ekosistemini bir şehir gibi düşün. JDK yollar ve elektrik, Maven lojistik şirket, Selenium araç, TestNG trafik kuralları, Allure şehir haritası. Hepsi bir arada çalışarak seni iş hayatına hazırlar.',
      },
      {
        type: 'visual', variant: 'flow', title: 'Java QA Ekosistemi',
        steps: [
          { num: 1, label: 'JDK 21', desc: 'Temel platform', highlight: true },
          { num: 2, label: 'Maven/Gradle', desc: 'Build & deps' },
          { num: 3, label: 'Selenium/Appium', desc: 'Web & Mobile', highlight: true },
          { num: 4, label: 'JUnit5/TestNG', desc: 'Test runner' },
          { num: 5, label: 'Allure', desc: 'Raporlama', highlight: true },
          { num: 6, label: 'Jenkins/GH Actions', desc: 'CI/CD' },
        ],
      },
      {
        type: 'heading', text: { tr: 'Önemli Kütüphaneler', en: 'Important Libraries' },
      },
      {
        type: 'table',
        headers: ['Kütüphane', 'Ne İşe Yarar?', 'Maven groupId'],
        rows: [
          ['Selenium WebDriver 4', 'Web otomasyon', 'org.seleniumhq.selenium'],
          ['Appium Java Client', 'Mobil otomasyon', 'io.appium'],
          ['REST Assured', 'API testi', 'io.rest-assured'],
          ['JUnit5', 'Test runner', 'org.junit.jupiter'],
          ['TestNG', 'Test runner (alt)', 'org.testng'],
          ['WebDriverManager', 'Driver otomatik indir', 'io.github.bonigarcia'],
          ['Allure', 'Zengin HTML rapor', 'io.qameta.allure'],
          ['Datafaker', 'Test verisi üretimi', 'net.datafaker'],
          ['AssertJ', 'Fluent assertions', 'org.assertj'],
          ['Apache POI', 'Excel okuma/yazma', 'org.apache.poi'],
        ],
      },
      {
        type: 'heading', text: { tr: 'Maven vs Gradle', en: 'Maven vs Gradle' },
      },
      {
        type: 'table',
        headers: ['Özellik', 'Maven', 'Gradle'],
        rows: [
          ['Konfig dili', 'XML (pom.xml)', 'Groovy/Kotlin DSL'],
          ['Hız', '⚠️ Yavaş', '✅ Incremental build'],
          ['Ekosistem', '✅ Çok büyük', '✅ Android zorunlu'],
          ['Okunabilirlik', '⚠️ Verbose XML', '✅ Kısa DSL'],
          ['QA\'da tercih', '✅ Yaygın', '✅ Android testleri'],
        ],
      },
      {
        type: 'code', language: 'xml',
        label: 'pom.xml — Tam QA projesi bağımlılıkları',
        code: `<properties>
    <selenium.version>4.20.0</selenium.version>
    <junit5.version>5.10.2</junit5.version>
</properties>
<dependencies>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>\${selenium.version}</version>
    </dependency>
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.8.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>\${junit5.version}</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>5.4.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-junit5</artifactId>
        <version>2.27.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.assertj</groupId>
        <artifactId>assertj-core</artifactId>
        <version>3.25.3</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>net.datafaker</groupId>
        <artifactId>datafaker</artifactId>
        <version>2.2.2</version>
    </dependency>
</dependencies>`,
      },
      {
        type: 'quiz',
        question: { tr: 'Java projelerinde getter, setter, constructor, toString gibi boilerplate (basmakalıp) kodları yazmadan, sadece anotasyonlar kullanarak otomatik üretilmesini sağlayan popüler kütüphane hangisidir?', en: 'Which popular library allows automatic generation of boilerplate code like getters, setters, constructors, and toString in Java using annotations?' },
        options: [
          { id: 'a', text: 'Lombok' },
          { id: 'b', text: 'Jackson' },
          { id: 'c', text: 'Log4j' },
          { id: 'd', text: 'Apache Commons' },
        ],
        correct: 'a',
        explanation: { tr: 'Project Lombok, `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor` ve `@Data` gibi anotasyonlar sayesinde Java\'daki gereksiz kod kalabalığını ortadan kaldırır. QA projelerinde Page Object ve Data modellerini sadeleştirmek için çok sık kullanılır.', en: 'Project Lombok eliminates boilerplate code in Java using annotations like `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`, and `@Data`. It is widely used in QA to simplify Page Objects and Data Models.' },
      
        retryQuestion: {
      "question": {
            "tr": "Java sınıflarında `@Data` anotasyonunu kullanarak sınıfın tüm private alanlarına otomatik getter ve setter metotları atayan, kodun daha temiz kalmasını sağlayan araç hangisidir?",
            "en": "Which tool enables the automatic creation of getter and setter methods for all private fields in Java classes by using the `@Data` annotation, thus keeping the code cleaner?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "JUnit"
            },
            {
                  "id": "b",
                  "text": "Mockito"
            },
            {
                  "id": "c",
                  "text": "Lombok"
            },
            {
                  "id": "d",
                  "text": "Selenium"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Lombok kütüphanesi, sınıfların üzerine eklenen basit anotasyonlar sayesinde derleme anında getter, setter ve yapıcı metotları oluşturarak sınıfların okunabilirliğini artırır ve bakım maliyetini düşürür.",
            "en": "The Lombok library improves code readability and reduces maintenance costs by generating getters, setters, and constructors at compile time through simple annotations placed on classes."
      }
}
},
    ],
  },
  en: {
    title: '🔗 Java QA Ecosystem',
    blocks: [
      {
        type: 'simple-box', emoji: '🔗',
        content: 'Think of the Java ecosystem as a city. JDK is roads and electricity, Maven is logistics, Selenium is the vehicle, TestNG is traffic rules, Allure is the city map. Together they prepare you for professional QA work.',
      },
      {
        type: 'visual', variant: 'flow', title: 'Java QA Ecosystem',
        steps: [
          { num: 1, label: 'JDK 21', desc: 'Base platform', highlight: true },
          { num: 2, label: 'Maven/Gradle', desc: 'Build & deps' },
          { num: 3, label: 'Selenium/Appium', desc: 'Web & Mobile', highlight: true },
          { num: 4, label: 'JUnit5/TestNG', desc: 'Test runner' },
          { num: 5, label: 'Allure', desc: 'Reporting', highlight: true },
          { num: 6, label: 'Jenkins/GH Actions', desc: 'CI/CD' },
        ],
      },
      {
        type: 'table',
        headers: ['Library', 'Purpose', 'Maven groupId'],
        rows: [
          ['Selenium WebDriver 4', 'Web automation', 'org.seleniumhq.selenium'],
          ['REST Assured', 'API testing', 'io.rest-assured'],
          ['JUnit5', 'Test runner', 'org.junit.jupiter'],
          ['TestNG', 'Test runner (alt)', 'org.testng'],
          ['WebDriverManager', 'Auto driver download', 'io.github.bonigarcia'],
          ['Allure', 'Rich HTML report', 'io.qameta.allure'],
          ['AssertJ', 'Fluent assertions', 'org.assertj'],
          ['Datafaker', 'Test data generation', 'net.datafaker'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Java projelerinde getter, setter, constructor, toString gibi boilerplate (basmakalıp) kodları yazmadan, sadece anotasyonlar kullanarak otomatik üretilmesini sağlayan popüler kütüphane hangisidir?', en: 'Which popular library allows automatic generation of boilerplate code like getters, setters, constructors, and toString in Java using annotations?' },
        options: [
          { id: 'a', text: 'Lombok' },
          { id: 'b', text: 'Jackson' },
          { id: 'c', text: 'Log4j' },
          { id: 'd', text: 'Apache Commons' },
        ],
        correct: 'a',
        explanation: { tr: 'Project Lombok, `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor` ve `@Data` gibi anotasyonlar sayesinde Java\'daki gereksiz kod kalabalığını ortadan kaldırır. QA projelerinde Page Object ve Data modellerini sadeleştirmek için çok sık kullanılır.', en: 'Project Lombok eliminates boilerplate code in Java using annotations like `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`, and `@Data`. It is widely used in QA to simplify Page Objects and Data Models.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir Java nesnesinin sınıf tanımı içerisinde, her bir alan için ayrı ayrı metot yazma zahmetinden kurtulmak ve `@ToString` veya `@Getter` gibi tanımlamalarla kod kalabalığını engellemek için hangi kütüphane kullanılır?",
            "en": "Which library is used to avoid the burden of writing individual methods for each field in a Java class definition, and to prevent boilerplate code using declarations like `@ToString` or `@Getter`?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Apache Maven"
            },
            {
                  "id": "b",
                  "text": "Lombok"
            },
            {
                  "id": "c",
                  "text": "RestAssured"
            },
            {
                  "id": "d",
                  "text": "TestNG"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Lombok, Java dilindeki standart kod kalıplarını (boilerplate) azaltmak için kullanılan bir kütüphanedir. `@ToString` ve `@Getter` gibi anotasyonlar, sınıfın derlenmesi sırasında gerekli metotların gövdelerini otomatik olarak oluşturur.",
            "en": "Lombok is a library used to reduce standard boilerplate code in Java. Annotations like `@ToString` and `@Getter` automatically generate the bodies of the necessary methods during the class compilation process."
      }
}
},
    ],
  },
}


// ─── S6: YAYGIN HATALAR ───────────────────────────────────────────────────────
const s6 = {
  tr: {
    title: '🚨 Yaygın Java QA Hataları',
    blocks: [
      { type: 'simple-box', emoji: '🚨', content: 'Her hata mesajının bir imzası var. Doktor gibi: ateş varsa enfeksiyon olabilir. Hata mesajını oku, imzayı tanı, çözümü uygula.' },
      { type: 'heading', text: { tr: '1. NoSuchElementException', en: '1. NoSuchElementException' } },
      { type: 'code', language: 'bash', label: 'Hata', code: `org.openqa.selenium.NoSuchElementException: 
Unable to locate element: {"method":"id","selector":"loginBtn"}` },
      { type: 'callout', color: 'red', emoji: '❌', title: 'Sebep', content: 'Element DOM\'da yok, yanlış locator, sayfa yüklenmemiş veya iframe içinde.' },
      { type: 'code', language: 'java', label: 'Çözüm', code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(By.id("loginBtn")));
btn.click();` },
      { type: 'heading', text: { tr: '2. StaleElementReferenceException', en: '2. StaleElementReferenceException' } },
      { type: 'callout', color: 'red', emoji: '❌', title: 'Sebep', content: 'Elementi bulduktan sonra sayfa refresh oldu veya DOM güncellendi — referans geçersiz.' },
      { type: 'code', language: 'java', label: 'Çözüm — Retry pattern', code: `public void clickWithRetry(By locator, int max) {
    for (int i = 0; i < max; i++) {
        try { driver.findElement(locator).click(); return; }
        catch (StaleElementReferenceException e) { if (i==max-1) throw e; }
    }
}` },
      { type: 'heading', text: { tr: '3. ElementNotInteractableException', en: '3. ElementNotInteractableException' } },
      { type: 'code', language: 'java', label: 'Çözüm — JavaScript ile tıkla', code: `WebElement el = driver.findElement(By.id("hiddenBtn"));
((JavascriptExecutor)driver).executeScript("arguments[0].scrollIntoView(true);", el);
((JavascriptExecutor)driver).executeScript("arguments[0].click();", el);` },
      { type: 'heading', text: { tr: '4. TimeoutException', en: '4. TimeoutException' } },
      { type: 'code', language: 'bash', label: 'Hata', code: `org.openqa.selenium.TimeoutException: 
Expected condition failed: waiting for element (tried for 10 second(s))` },
      { type: 'code', language: 'java', label: 'Çözüm', code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("dashboard")));` },
      { type: 'heading', text: { tr: '5. NullPointerException — driver null', en: '5. NullPointerException — driver null' } },
      { type: 'code', language: 'java', label: 'Çözüm', code: `public class LoginPage {
    WebDriver driver;
    public LoginPage(WebDriver driver) {
        this.driver = Objects.requireNonNull(driver, "Driver cannot be null");
    }
}` },
      { type: 'heading', text: { tr: '6. WebDriverException — ChromeDriver uyumsuzluğu', en: '6. WebDriverException — ChromeDriver mismatch' } },
      { type: 'code', language: 'bash', label: 'Hata', code: `This version of ChromeDriver only supports Chrome 114
Current browser version is 124.0.6367.207` },
      { type: 'code', language: 'java', label: 'Çözüm', code: `WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();` },
      { type: 'heading', text: { tr: '7. AssertionError — Trailing whitespace', en: '7. AssertionError — Trailing whitespace' } },
      { type: 'code', language: 'java', label: 'Çözüm', code: `assertEquals("Welcome, Admin!", element.getText().trim());
assertThat(element.getText().trim()).isEqualTo("Welcome, Admin!");` },
      { type: 'heading', text: { tr: '8. Maven dependency çakışması', en: '8. Maven dependency conflict' } },
      { type: 'code', language: 'bash', label: 'Tanı', code: `mvn dependency:tree | grep selenium
# pom.xml'de <properties><selenium.version>4.20.0</selenium.version></properties>` },
      {
        type: 'quiz',
        question: { tr: 'Java\'da başlatılmamış (null referansına sahip) bir nesnenin metot veya değişkenlerine erişmeye çalışırken hangi runtime hatası fırlatılır?', en: 'Which runtime exception is thrown in Java when trying to access methods or fields of a null reference?' },
        options: [
          { id: 'a', text: 'NullPointerException' },
          { id: 'b', text: 'NoSuchElementException' },
          { id: 'c', text: 'IllegalArgumentException' },
          { id: 'd', text: 'ClassCastException' },
        ],
        correct: 'a',
        explanation: { tr: 'NullPointerException (NPE), Java\'da en sık karşılaşılan hatalardan biridir. Başlatılmamış (örneğin `WebDriver driver;` deyip `new ChromeDriver()` ataması yapmadan önce) bir referans üzerinden metot çağırmak bu hataya yol açar.', en: 'NullPointerException (NPE) is one of the most common exceptions in Java. It is thrown when trying to access a method or field on an uninitialized reference (e.g. declaring `WebDriver driver;` without assigning `new ChromeDriver()`).' },
      
        retryQuestion: {
      "question": {
            "tr": "Aşağıdaki kod parçası çalıştırıldığında hangi hata fırlatılır? String str = null; int length = str.length();",
            "en": "What exception is thrown when the following code snippet is executed? String str = null; int length = str.length();"
      },
      "options": [
            {
                  "id": "a",
                  "text": "NullPointerException"
            },
            {
                  "id": "b",
                  "text": "ArrayIndexOutOfBoundsException"
            },
            {
                  "id": "c",
                  "text": "ArithmeticException"
            },
            {
                  "id": "d",
                  "text": "NullReferenceException"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Java'da değeri atanmamış (null) bir nesne üzerinde bir metot çağırmaya (bu örnekte .length()) çalışmak NullPointerException'a neden olur.",
            "en": "In Java, attempting to invoke a method (in this case .length()) on an object that is null will result in a NullPointerException."
      }
}
},
    ],
  },
  en: {
    title: '🚨 Common Java QA Errors',
    blocks: [
      { type: 'simple-box', emoji: '🚨', content: 'Each error has a "signature." Like a doctor: fever could mean infection. Read the error message, recognize the signature, apply the solution.' },
      { type: 'heading', text: { en: '1. NoSuchElementException' } },
      { type: 'code', language: 'java', label: 'Solution', code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("loginBtn"))).click();` },
      { type: 'heading', text: { en: '2. StaleElementReferenceException' } },
      { type: 'code', language: 'java', label: 'Solution — Retry pattern', code: `public void clickWithRetry(By l, int max) {
    for (int i=0; i<max; i++) {
        try { driver.findElement(l).click(); return; }
        catch (StaleElementReferenceException e) { if(i==max-1) throw e; }
    }
}` },
      { type: 'heading', text: { en: '6. WebDriverException — ChromeDriver mismatch' } },
      { type: 'code', language: 'java', label: 'Solution', code: `WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();` },
      {
        type: 'quiz',
        question: { tr: 'Java\'da başlatılmamış (null referansına sahip) bir nesnenin metot veya değişkenlerine erişmeye çalışırken hangi runtime hatası fırlatılır?', en: 'Which runtime exception is thrown in Java when trying to access methods or fields of a null reference?' },
        options: [
          { id: 'a', text: 'NullPointerException' },
          { id: 'b', text: 'NoSuchElementException' },
          { id: 'c', text: 'IllegalArgumentException' },
          { id: 'd', text: 'ClassCastException' },
        ],
        correct: 'a',
        explanation: { tr: 'NullPointerException (NPE), Java\'da en sık karşılaşılan hatalardan biridir. Başlatılmamış (örneğin `WebDriver driver;` deyip `new ChromeDriver()` ataması yapmadan önce) bir referans üzerinden metot çağırmak bu hataya yol açar.', en: 'NullPointerException (NPE) is one of the most common exceptions in Java. It is thrown when trying to access a method or field on an uninitialized reference (e.g. declaring `WebDriver driver;` without assigning `new ChromeDriver()`).' },
      
        retryQuestion: {
      "question": {
            "tr": "Java'da `String s = null; System.out.println(s.toString());` kodu hangi hatayı verir?",
            "en": "Which exception is thrown by the code `String s = null; System.out.println(s.toString());` in Java?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "NullPointerException"
            },
            {
                  "id": "b",
                  "text": "StringIndexOutOfBoundsException"
            },
            {
                  "id": "c",
                  "text": "StackOverflowError"
            },
            {
                  "id": "d",
                  "text": "IllegalStateException"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Null bir referans üzerinden herhangi bir instance metodunu çağırmaya çalıştığınızda Java çalışma zamanı (runtime) NullPointerException fırlatır.",
            "en": "Java runtime throws a NullPointerException whenever you attempt to call an instance method on a null reference."
      }
}
},
    ],
  },
}

// ─── S7: MÜLAKAT SORULARI ─────────────────────────────────────────────────────
// Shared questions array — used in both TR and EN sections (bilingual q/a fields)
const _s7Q = [
        // ── BASIC 1-15 ──────────────────────────────────────────────────────────
        {
          level: 'basic',
          q: { tr: 'Maven\'da BUILD FAILURE görüyorsun — ilk hangi adımı atarsın ve neden?', en: 'You see BUILD FAILURE in Maven — what is your first step and why?' },
          a: {
            tr: 'İlk iş terminal çıktısında "Tests run: X, Failures: Y, Errors: Z" satırını bulmak. Failures sayısı > 0 ise assertion hatası var demektir; yani test çalıştı ama beklenen değerle gerçek değer uyuşmadı. Errors > 0 ise test başlamadan önce bir setup problemi var (örn. driver başlatılamadı, dosya bulunamadı). Surefire-reports klasöründeki XML ya da TXT dosyaları her test için ayrı yığın izini içerir; asıl kök nedeni oradan okursun. CI ortamında bu klasörü artifact olarak sakla ki daha sonra analiz edebilelim.',
            en: 'First, find the "Tests run: X, Failures: Y, Errors: Z" line in the terminal output. Failures > 0 means an assertion error — the test ran but expected vs actual values didn\'t match. Errors > 0 means a setup problem before the test even started (e.g. driver couldn\'t be created, file not found). The XML or TXT files in target/surefire-reports contain a separate stack trace for each test — read the root cause from there. In CI, save this folder as an artifact for later analysis.',
          },
          code: {
            tr: `// Surefire raporu kontrol akışı
// 1. Terminal: "BUILD FAILURE" görünce...
// mvn test → target/surefire-reports/*.txt

// 2. Failure örneği (assertion hatası)
// Tests run: 5, Failures: 2, Errors: 0
// → LoginTest.validUser — expected:<200> but was:<401>

// 3. Error örneği (setup hatası)
// Tests run: 5, Failures: 0, Errors: 3
// → SessionNotCreatedException: Chrome version mismatch

// 4. Belirli testi tekrar çalıştır:
// mvn test -Dtest=LoginTest#validUser -X   (-X = debug modu)

// 5. Sadece failed testleri retry et:
// mvn test -Dsurefire.rerunFailingTestsCount=2`,
            en: `// Surefire report flow
// 1. When you see "BUILD FAILURE" in terminal...
// mvn test → target/surefire-reports/*.txt

// 2. Failure example (assertion error)
// Tests run: 5, Failures: 2, Errors: 0
// → LoginTest.validUser — expected:<200> but was:<401>

// 3. Error example (setup error)
// Tests run: 5, Failures: 0, Errors: 3
// → SessionNotCreatedException: Chrome version mismatch

// 4. Run a specific test again:
// mvn test -Dtest=LoginTest#validUser -X   (-X = debug mode)

// 5. Retry only failed tests:
// mvn test -Dsurefire.rerunFailingTestsCount=2`,
          },
          analogy: {
            tr: 'Kod derleme hatası almak tıpkı yemek tarifi kitabında "adım 3\'te hata" demesi gibi — kitabın o sayfasını açıp tam olarak hangi satırda ne yanlış gittiğini okumak gerekir. Surefire raporu da o sayfa gibidir.',
            en: 'A build failure is like a recipe book saying "error at step 3" — you need to open that page and read exactly which line went wrong. The surefire report is that page.',
          },
          keyPoints: [
            { tr: 'Failures = assertion hatası (test çalıştı, sonuç yanlış)', en: 'Failures = assertion error (test ran, wrong result)' },
            { tr: 'Errors = setup/teardown hatası (test hiç çalışmadı)', en: 'Errors = setup/teardown error (test never ran)' },
            { tr: 'target/surefire-reports/*.txt kök nedeni verir', en: 'target/surefire-reports/*.txt gives root cause' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "İlk BUILD FAILURE\'da doğrudan surefire-reports\'a giderim. Failures ile Errors arasındaki farkı bilerek doğru yere odaklanırım — assertion hatasında test mantığına, Error\'da environment\'a bakarım."',
            en: 'Say in interview: "On first BUILD FAILURE I go straight to surefire-reports. Knowing the difference between Failures and Errors lets me focus on the right place — test logic for Failures, environment for Errors."',
          },
        },
        {
          level: 'basic',
          q: { tr: '@BeforeAll ile @BeforeEach arasındaki fark nedir? WebDriver başlatmak için hangisini seçersin ve neden?', en: 'What is the difference between @BeforeAll and @BeforeEach? Which do you choose for WebDriver setup and why?' },
          a: {
            tr: '@BeforeAll, tüm test metodları çalışmadan önce yalnızca bir kez çağrılır ve static olmalıdır (JUnit5\'te). @BeforeEach ise her test metodundan önce ayrı ayrı çalışır. Eğer WebDriver\'ı @BeforeEach\'te başlatırsanız her test için yeni bir tarayıcı penceresi açılır — bu izolasyon sağlar ama süresi uzar. @BeforeAll\'da başlatırsanız aynı tarayıcı oturumu tüm testlerde paylaşılır, dolayısıyla hız artar fakat testler arasındaki yan etkiler de artar. Tercih senaryoya bağlı: bağımsız testler için @BeforeEach, hız öncelikliyse @BeforeAll + @AfterAll kombinasyonu. TestNG\'de karşılıkları @BeforeClass ve @BeforeMethod\'tur.',
            en: '@BeforeAll is called exactly once before all test methods and must be static in JUnit5. @BeforeEach runs before every single test method. Using @BeforeEach for WebDriver gives full isolation (new browser per test) but is slower. @BeforeAll shares one browser session across all tests — faster but side-effects can leak between tests. Choose @BeforeEach for independent tests, @BeforeAll when speed is priority. TestNG equivalents: @BeforeClass and @BeforeMethod.',
          },
          code: {
            tr: `// JUnit5 örneği — @BeforeAll ile paylaşımlı driver
class LoginTest {
    static WebDriver driver;   // static zorunlu
    static WebDriverWait wait;

    @BeforeAll
    static void setupAll() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();           // bir kez açılır
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @BeforeEach
    void goToLoginPage() {
        driver.get("https://example.com/login"); // her testte ana sayfaya dön
    }

    @AfterAll
    static void tearDownAll() {
        if (driver != null) driver.quit();   // bir kez kapatılır
    }
}`,
            en: `// JUnit5 example — shared driver with @BeforeAll
class LoginTest {
    static WebDriver driver;   // must be static
    static WebDriverWait wait;

    @BeforeAll
    static void setupAll() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();           // opened once
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @BeforeEach
    void goToLoginPage() {
        driver.get("https://example.com/login"); // navigate back each test
    }

    @AfterAll
    static void tearDownAll() {
        if (driver != null) driver.quit();   // closed once
    }
}`,
          },
          analogy: {
            tr: '@BeforeAll bir şirkette toplantı odasını sabah bir kez açmak gibidir — herkes aynı odayı kullanır. @BeforeEach ise her toplantı öncesi odayı temizlemek gibi — daha temiz ama zaman alır.',
            en: '@BeforeAll is like opening the meeting room once in the morning — everyone shares it. @BeforeEach is like cleaning the room before each meeting — cleaner but time-consuming.',
          },
          keyPoints: [
            { tr: '@BeforeAll: 1 kez, static zorunlu, paylaşımlı durum riski var', en: '@BeforeAll: once, must be static, risk of shared state' },
            { tr: '@BeforeEach: her test için, tam izolasyon, yavaş ama güvenli', en: '@BeforeEach: per test, full isolation, slow but safe' },
            { tr: 'Paralel testte @BeforeEach + ThreadLocal kombinasyonu ideal', en: 'For parallel tests: @BeforeEach + ThreadLocal is ideal' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Smoke suite\'de @BeforeAll tercih ederim — hız kritik. Regression\'da @BeforeEach kullanırım çünkü testlerin birbirini etkilememesi önemli."',
            en: 'Say in interview: "For smoke suites I prefer @BeforeAll — speed is critical. For regression I use @BeforeEach because test isolation matters."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'Selenium testinde NullPointerException alıyorsun — bunun olası nedenleri ve önleme yöntemleri neler?', en: 'You get NullPointerException in a Selenium test — what are the likely causes and how do you prevent them?' },
          a: {
            tr: 'NPE\'nin en sık nedeni WebDriver referansının null olmasıdır: @BeforeAll/@BeforeEach doğru çalışmamışsa driver null kalır. İkinci yaygın neden, findElement\'in null döneceğini sanmak — oysa null dönmez, NoSuchElementException fırlatır; ama getText() sonucunu null ile karşılaştırırsanız risk oluşur. Üçüncü neden: Optional kullanmadan dönen objelere doğrudan erişmek. Çözüm olarak constructor injection, Objects.requireNonNull() ve Optional<T> kullanılır. Java 14+ ile metin açıklayıcı NullPointerException mesajları gelir, debug kolaylaşır.',
            en: 'The most common cause is a null WebDriver reference: if @BeforeAll/@BeforeEach doesn\'t execute correctly, driver remains null. Second common cause: assuming findElement returns null — it doesn\'t, it throws NoSuchElementException; but comparing getText() result to null is risky. Third: accessing returned objects directly without Optional. Solutions: constructor injection, Objects.requireNonNull(), and Optional<T>. Java 14+ gives helpful NPE messages making debugging easier.',
          },
          code: {
            tr: `// ❌ Kötü — NPE'ye açık
class LoginPage {
    WebDriver driver; // null olabilir

    void login(String user, String pass) {
        driver.findElement(By.id("user")).sendKeys(user); // NPE!
    }
}

// ✅ İyi — constructor injection + null kontrol
class LoginPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    LoginPage(WebDriver driver) {
        this.driver = Objects.requireNonNull(driver, "driver null olamaz");
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Optional ile güvenli getText
    Optional<String> getErrorMessage() {
        try {
            return Optional.of(
                driver.findElement(By.id("error")).getText()
            );
        } catch (NoSuchElementException e) {
            return Optional.empty();
        }
    }
}`,
            en: `// ❌ Bad — prone to NPE
class LoginPage {
    WebDriver driver; // can be null

    void login(String user, String pass) {
        driver.findElement(By.id("user")).sendKeys(user); // NPE!
    }
}

// ✅ Good — constructor injection + null check
class LoginPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    LoginPage(WebDriver driver) {
        this.driver = Objects.requireNonNull(driver, "driver cannot be null");
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Safe getText with Optional
    Optional<String> getErrorMessage() {
        try {
            return Optional.of(
                driver.findElement(By.id("error")).getText()
            );
        } catch (NoSuchElementException e) {
            return Optional.empty();
        }
    }
}`,
          },
          analogy: {
            tr: 'NPE, boş bir sürahi\'den su dökmeye çalışmak gibidir. Java\'da final + constructor ile sürahiyi doldurmadan nesneyi var edemezsiniz — bu Java\'nın güvenli yol gösterme mekanizmasıdır.',
            en: 'NPE is like trying to pour water from an empty jug. With final + constructor in Java, you can\'t create the object without filling the jug first — that\'s Java\'s safe guardrail.',
          },
          keyPoints: [
            { tr: 'Constructor injection: driver null ise nesne hiç oluşturulmaz', en: 'Constructor injection: if driver is null, object is never created' },
            { tr: 'Objects.requireNonNull() hata mesajını erken ve net verir', en: 'Objects.requireNonNull() gives early, clear error messages' },
            { tr: 'Java 14+ NPE mesajları hangi değişkenin null olduğunu söyler', en: 'Java 14+ NPE messages tell you exactly which variable is null' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Projemdeki tüm Page Object\'lere constructor injection uyguladım. Driver null gelirse test setup\'ta fail eder — production koduna ulaşmaz. Bunu Objects.requireNonNull ile garantilerim."',
            en: 'Say in interview: "I applied constructor injection to all Page Objects. If driver is null, the test fails at setup — never reaches production code. I guarantee this with Objects.requireNonNull."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'Test bazen geçiyor bazen geçmiyor (flaky) — nedenleri ve sistematik çözümü nedir?', en: 'Test passes sometimes, fails sometimes (flaky) — what are the causes and systematic solution?' },
          a: {
            tr: 'Flaky testin en sık nedeni timing sorunlarıdır: sayfa yüklenmeden findElement çağrısı yapmak. Buna ek olarak test bağımlılığı (bir test diğerinin bıraktığı duruma güveniyor), environment farklılıkları (CI vs local), ve AJAX/animasyon bitmeden etkileşim sayılabilir. Çözüm birden fazla katmanlıdır: explicit WebDriverWait + ExpectedConditions kullan, implicit wait\'i 0\'a çek (ikisi bir arada kötü), test izolasyonu sağla, ve flaky testleri @Tag("flaky") ile işaretle. CI geçmişini 30 günlük analiz edip hangi testlerin en çok sallandığını ölç.',
            en: 'The most common cause of flaky tests is timing: calling findElement before the page has loaded. Other causes include test dependency (one test relies on state left by another), environment differences (CI vs local), and interacting before AJAX/animations complete. Solution is multi-layered: use explicit WebDriverWait + ExpectedConditions, set implicit wait to 0 (mixing both is bad), ensure test isolation, and tag flaky tests with @Tag("flaky"). Analyze 30-day CI history to measure which tests flake most.',
          },
          code: {
            tr: `// ❌ Kötü — timing hatası
driver.get("https://shop.com");
driver.findElement(By.id("productList")).click(); // henüz yüklenmemiş olabilir!

// ✅ İyi — explicit wait ile güvenli
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Element görünür ve tıklanabilir olana kadar bekle
WebElement productList = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("productList"))
);
productList.click();

// AJAX tamamlanmasını bekle (JS ile)
wait.until(d -> {
    JavascriptExecutor js = (JavascriptExecutor) d;
    return js.executeScript("return document.readyState").equals("complete");
});

// ⚙️ KRİTİK: implicit + explicit birlikte kullanma!
driver.manage().timeouts().implicitlyWait(Duration.ZERO); // 0 yap`,
            en: `// ❌ Bad — timing error
driver.get("https://shop.com");
driver.findElement(By.id("productList")).click(); // may not be loaded yet!

// ✅ Good — safe with explicit wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Wait until element is visible and clickable
WebElement productList = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("productList"))
);
productList.click();

// Wait for AJAX completion (via JS)
wait.until(d -> {
    JavascriptExecutor js = (JavascriptExecutor) d;
    return js.executeScript("return document.readyState").equals("complete");
});

// ⚙️ CRITICAL: do not mix implicit + explicit wait!
driver.manage().timeouts().implicitlyWait(Duration.ZERO); // set to 0`,
          },
          analogy: {
            tr: 'Flaky test, kırmızı ışıkta bazen geçen trafik gibidir — çoğunlukla geçiyor ama ara sıra kaza oluyor. Explicit wait ise yeşil ışığı görmeden hareket etmemek gibidir.',
            en: 'A flaky test is like sometimes running a red light — usually fine but occasionally crashes. Explicit wait is like not moving until you see green.',
          },
          keyPoints: [
            { tr: 'implicit + explicit wait birlikte kullanmak öngörülemeyen davranışa yol açar', en: 'Mixing implicit + explicit wait causes unpredictable behavior' },
            { tr: '@Tag("flaky") ile izole et, retry ekle, ama kök nedeni çöz', en: 'Isolate with @Tag("flaky"), add retry, but fix the root cause' },
            { tr: 'Test izolasyonu: her test kendi verisini oluşturmalı ve temizlemeli', en: 'Test isolation: each test must create and clean its own data' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Flaky testleri doğrudan silmem ya da yok saymam. Önce kategorilendirim (timing/bağımlılık/environment), sonra kök nedenini giderip CI geçmiş analiziyle düzeldiğini doğrularım."',
            en: 'Say in interview: "I don\'t just delete or ignore flaky tests. I categorize them (timing/dependency/environment), fix the root cause, and verify the fix via CI history analysis."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'Test senaryolarında List ve Set\'in farklı kullanım alanlarını örnek vererek açıkla.', en: 'Explain with examples how List and Set are used differently in test scenarios.' },
          a: {
            tr: 'List, sıralı ve mükerrer elemanlara izin veren bir collection\'dır — dropdown seçeneklerini sırasıyla almak veya bir sayfadaki tüm hata mesajlarını toplamak için kullanılır. Set ise benzersiz elemanlar içerir ve tekrar eden değerleri otomatik filtreler — bir sayfadaki tüm linklerin unique olup olmadığını kontrol etmek için idealdir. Stream API ile List\'ten Set\'e dönüşüm çok kolaydır. Özellikle tablo verilerini okurken List, unique değer doğrulamada Set tercih edilir.',
            en: 'List is ordered and allows duplicates — use it to get dropdown options in order or collect all error messages. Set contains unique elements and auto-filters duplicates — ideal for checking that all page links are unique. Converting List to Set via Stream API is easy. Use List when reading tabular data, Set when validating uniqueness.',
          },
          code: {
            tr: `// List kullanım örneği — dropdown seçeneklerini sıralı al
Select dropdown = new Select(driver.findElement(By.id("country")));
List<WebElement> options = dropdown.getOptions();
List<String> optionTexts = options.stream()
    .map(WebElement::getText)
    .collect(Collectors.toList());
// ["Turkey", "Germany", "USA", ...]

// Set kullanım örneği — sayfadaki unique linkleri bul
List<WebElement> links = driver.findElements(By.tagName("a"));
Set<String> uniqueHrefs = links.stream()
    .map(el -> el.getAttribute("href"))
    .filter(Objects::nonNull)
    .collect(Collectors.toSet()); // tekrar edenler otomatik düşer

// Assertion: tüm linkler unique mi?
assertEquals(links.size(), uniqueHrefs.size(), "Duplicate link var!");

// LinkedHashSet ile hem unique hem sıralı
Set<String> orderedUnique = new LinkedHashSet<>(optionTexts);`,
            en: `// List example — get dropdown options in order
Select dropdown = new Select(driver.findElement(By.id("country")));
List<WebElement> options = dropdown.getOptions();
List<String> optionTexts = options.stream()
    .map(WebElement::getText)
    .collect(Collectors.toList());
// ["Turkey", "Germany", "USA", ...]

// Set example — find unique links on page
List<WebElement> links = driver.findElements(By.tagName("a"));
Set<String> uniqueHrefs = links.stream()
    .map(el -> el.getAttribute("href"))
    .filter(Objects::nonNull)
    .collect(Collectors.toSet()); // duplicates automatically removed

// Assertion: are all links unique?
assertEquals(links.size(), uniqueHrefs.size(), "Duplicate link found!");

// LinkedHashSet: unique and ordered
Set<String> orderedUnique = new LinkedHashSet<>(optionTexts);`,
          },
          analogy: {
            tr: 'List bir sıra numaralı bilet gibidir — aynı numara iki kez olabilir ve sıra önemlidir. Set ise parmak izi gibidir — her biri benzersiz olmak zorundadır.',
            en: 'List is like numbered tickets — the same number can appear twice and order matters. Set is like fingerprints — each one must be unique.',
          },
          keyPoints: [
            { tr: 'List: sıra önemli veya mükerrer değer bekleniyor', en: 'List: order matters or duplicates are expected' },
            { tr: 'Set: benzersizlik testi yaparken, uniqueness assertion\'da', en: 'Set: when testing uniqueness or doing uniqueness assertions' },
            { tr: 'LinkedHashSet: sırayı koruyarak unique list ister', en: 'LinkedHashSet: unique list while preserving insertion order' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Bir sayfadaki ürün ID\'lerinin unique olduğunu doğrulamak için List\'i Set\'e çevirip size karşılaştırması yaptım — bu pattern\'i gerçek projede kullandım."',
            en: 'Say in interview: "To verify product IDs on a page are unique, I converted the List to a Set and compared sizes — I used this pattern in a real project."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'pom.xml\'de scope="test" ne anlama gelir ve hangi bağımlılıklar bu scope\'ta olmalıdır?', en: 'What does scope="test" in pom.xml mean, and which dependencies should use this scope?' },
          a: {
            tr: 'scope="test" ile işaretlenmiş bağımlılıklar sadece test derleme ve çalıştırma sürecinde classpath\'e eklenir; production JAR\'ına dahil edilmez. Bu, production bundle\'ının gereksiz kütüphanelerle şişmesini önler ve uygulama güvenliğini artırır. JUnit5, TestNG, Mockito, WebDriverManager, REST Assured gibi kütüphaneler bu scope\'ta tanımlanmalıdır. Eğer scope belirtilmezse varsayılan "compile" olur ve bu kütüphaneler production JAR\'ına girer — bu hem güvenlik riski hem de boyut sorunudur.',
            en: 'Dependencies marked scope="test" are only added to the classpath during test compilation and execution; they are not included in the production JAR. This prevents the production bundle from bloating with unnecessary libraries and improves security. JUnit5, TestNG, Mockito, WebDriverManager, REST Assured should all use this scope. If scope is omitted, it defaults to "compile" and these libraries end up in the production JAR — a security risk and size problem.',
          },
          code: {
            tr: `<!-- pom.xml — doğru scope kullanımı -->
<dependencies>
    <!-- Test için: scope="test" -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>  <!-- sadece test classpath'inde -->
    </dependency>

    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.7.0</version>
        <scope>test</scope>
    </dependency>

    <!-- Production için: scope yok (compile) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- scope belirtilmemiş = compile = production JAR'a girer -->
    </dependency>
</dependencies>`,
            en: `<!-- pom.xml — correct scope usage -->
<dependencies>
    <!-- For tests: scope="test" -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>  <!-- test classpath only -->
    </dependency>

    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.7.0</version>
        <scope>test</scope>
    </dependency>

    <!-- For production: no scope (compile) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- no scope = compile = included in production JAR -->
    </dependency>
</dependencies>`,
          },
          analogy: {
            tr: 'scope="test" tıpkı bir futbol sahasındaki antrenman topu gibidir — sadece pratik sırasında kullanılır, maçta sahaya çıkmaz. Production dağıtımına dahil edilmez.',
            en: 'scope="test" is like a training ball on a football pitch — only used during practice, never brought out for the match. It doesn\'t go into production.',
          },
          keyPoints: [
            { tr: 'scope="test" → production JAR\'ına girmez, güvenli', en: 'scope="test" → not included in production JAR, secure' },
            { tr: 'scope="compile" (default) → her yerde kullanılır', en: 'scope="compile" (default) → available everywhere' },
            { tr: 'scope="provided" → runtime\'da container sağlar (Servlet API)', en: 'scope="provided" → container provides at runtime (Servlet API)' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "pom.xml\'de her bağımlılığın scope\'unu bilinçli seçerim. Test kütüphaneleri her zaman scope=test — production JAR boyutunu ve saldırı yüzeyini minimize etmek için."',
            en: 'Say in interview: "I consciously choose the scope for every dependency in pom.xml. Test libraries always get scope=test — to minimize production JAR size and attack surface."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'WebDriverManager neden kullanılır? Manuel ChromeDriver yönetimine göre avantajları nelerdir?', en: 'Why use WebDriverManager? What are its advantages over manual ChromeDriver management?' },
          a: {
            tr: 'Chrome her birkaç haftada bir güncellenir ve her Chrome versiyonu için uygun ChromeDriver versiyonu farklıdır. Manuel yönetimde her geliştirici kendi makinesine uygun ChromeDriver binary\'sini indirip path\'e eklemek zorundadır — bu, CI/CD sunucularında ve farklı işletim sistemlerinde sürekli bir bakım yükü oluşturur. WebDriverManager, sisteme kurulu Chrome versiyonunu otomatik detect eder, uygun ChromeDriver\'ı indirir ve konfigüre eder. Docker ve GitHub Actions gibi CI ortamlarında ekstra adım gerekmez. Ayrıca Firefox, Edge, Safari gibi diğer tarayıcıları da yönetir.',
            en: 'Chrome updates every few weeks and each Chrome version requires a different ChromeDriver version. With manual management every developer must download the correct ChromeDriver binary and add it to PATH — this creates constant maintenance overhead on CI/CD servers and different operating systems. WebDriverManager automatically detects the installed Chrome version, downloads the matching ChromeDriver, and configures it. No extra step needed in CI environments like Docker or GitHub Actions. It also manages Firefox, Edge, and Safari.',
          },
          code: {
            tr: `// ❌ Manuel — her makinede farklı, bakım yükü
System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver"); // platform bağımlı!
WebDriver driver = new ChromeDriver();

// ✅ WebDriverManager — tek satır, her yerde çalışır
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();

// Diğer tarayıcılar
WebDriverManager.firefoxdriver().setup();
WebDriverManager.edgedriver().setup();

// CI/CD'de headless
ChromeOptions opts = new ChromeOptions();
opts.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver(opts);`,
            en: `// ❌ Manual — different on each machine, maintenance overhead
System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver"); // platform-dependent!
WebDriver driver = new ChromeDriver();

// ✅ WebDriverManager — one line, works everywhere
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();

// Other browsers
WebDriverManager.firefoxdriver().setup();
WebDriverManager.edgedriver().setup();

// Headless mode for CI/CD
ChromeOptions opts = new ChromeOptions();
opts.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver(opts);`,
          },
          analogy: {
            tr: 'WebDriverManager, Java\'daki Maven bağımlılık yönetimi gibidir — doğru versiyonu bul, indir, kullanıma hazır et. Manuel ChromeDriver yönetimi ise her kütüphane için JAR\'ı elle indirmek gibidir.',
            en: 'WebDriverManager is like Maven dependency management in Java — find the right version, download it, make it ready to use. Manual ChromeDriver management is like downloading every JAR by hand.',
          },
          keyPoints: [
            { tr: 'Otomatik versiyon eşleşmesi — Chrome güncellenince ChromeDriver\'ı da günceller', en: 'Automatic version matching — updates ChromeDriver when Chrome updates' },
            { tr: 'CI/CD\'de extra step yok — Docker image\'larda da çalışır', en: 'No extra step in CI/CD — works in Docker images too' },
            { tr: 'Chrome, Firefox, Edge, Safari, Opera\'yı destekler', en: 'Supports Chrome, Firefox, Edge, Safari, Opera' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "WebDriverManager olmadan CI\'da her ChromeDriver güncellemesini manuel yönetmek zorunda kaldık — bu ciddi zaman kaybıydı. WebDriverManager ile bu sorunu tamamen ortadan kaldırdık."',
            en: 'Say in interview: "Without WebDriverManager we had to manually manage every ChromeDriver update in CI — a significant time waste. WebDriverManager eliminated this problem entirely."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'final keyword test projesinde nerede ve neden kullanılır?', en: 'Where and why is the final keyword used in test projects?' },
          a: {
            tr: 'final değişken bir kez atandıktan sonra değiştirilemez. Test projesinde üç kritik yerde kullanılır: (1) Page Object locatorları — bir kez tanımlanır, testten teste değişmez; (2) sabitler — BASE_URL, TIMEOUT gibi değerler; (3) bağımlılık referansları — driver, wait gibi nesneler yanlışlıkla null atanmasın diye. final kullanmak hem kod güvenliğini artırır hem de IDE\'nin "bu değer değişti" uyarısını etkinleştirir. Parallel testlerde final field\'lar thread-safe\'dir.',
            en: 'A final variable cannot be changed after assignment. In test projects it is used in three critical places: (1) Page Object locators — defined once, never changed test to test; (2) constants — values like BASE_URL, TIMEOUT; (3) dependency references — objects like driver, wait so they can\'t accidentally be set to null. Using final improves code safety and enables IDE warnings if the value is accidentally changed. Final fields are thread-safe in parallel tests.',
          },
          code: {
            tr: `// Page Object — final locatorlar
public class LoginPage {
    // ✅ final: yanlışlıkla locator değiştirilemez
    private final By usernameField = By.id("username");
    private final By passwordField = By.id("password");
    private final By loginButton   = By.cssSelector("button[type='submit']");

    private final WebDriver driver;
    private final WebDriverWait wait;

    public LoginPage(WebDriver driver) {
        this.driver = driver; // final: bir kez atanır, null'a çekilemez
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void login(String user, String pass) {
        driver.findElement(usernameField).sendKeys(user);
        driver.findElement(passwordField).sendKeys(pass);
        driver.findElement(loginButton).click();
    }
}

// Sabitler sınıfı
public final class TestConstants {
    private TestConstants() {} // instantiation engeli

    public static final String BASE_URL  = "https://myapp.com";
    public static final int    TIMEOUT   = 15;
    public static final String ADMIN_USER = "admin@test.com";
}`,
            en: `// Page Object — final locators
public class LoginPage {
    // ✅ final: locator cannot be accidentally changed
    private final By usernameField = By.id("username");
    private final By passwordField = By.id("password");
    private final By loginButton   = By.cssSelector("button[type='submit']");

    private final WebDriver driver;
    private final WebDriverWait wait;

    public LoginPage(WebDriver driver) {
        this.driver = driver; // final: assigned once, cannot be set to null
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void login(String user, String pass) {
        driver.findElement(usernameField).sendKeys(user);
        driver.findElement(passwordField).sendKeys(pass);
        driver.findElement(loginButton).click();
    }
}

// Constants class
public final class TestConstants {
    private TestConstants() {} // prevent instantiation

    public static final String BASE_URL   = "https://myapp.com";
    public static final int    TIMEOUT    = 15;
    public static final String ADMIN_USER = "admin@test.com";
}`,
          },
          analogy: {
            tr: 'final, bir Java programındaki sabit mürekkepli kalemdir — bir kez yazdın mı, silerek değiştiremezsin. Java\'daki const kavramının güçlü versiyonudur ve derleme zamanında güvence sağlar.',
            en: 'final is like a permanent marker in a Java program — once written, you can\'t erase and change it. It\'s Java\'s strong version of const and provides compile-time guarantees.',
          },
          keyPoints: [
            { tr: 'final field → constructor\'da atanmalı, sonra değiştirilemez', en: 'final field → must be assigned in constructor, cannot change after' },
            { tr: 'static final = derleme zamanı sabiti, JVM optimize eder', en: 'static final = compile-time constant, JVM optimizes it' },
            { tr: 'Parallel testlerde final field\'lar thread-safe\'dir', en: 'final fields are thread-safe in parallel tests' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Tüm Page Object locatorlarımı final tanımlarım. Bu, testin çalışırken locator\'ın yanlışlıkla değiştirildiği senaryoları imkansız kılar — defensive programming."',
            en: 'Say in interview: "I declare all Page Object locators as final. This makes it impossible for a locator to be accidentally changed during test execution — defensive programming."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'Thread.sleep() yerine neden WebDriverWait kullanılmalı? Gerçek bir test üzerinden açıkla.', en: 'Why should WebDriverWait be used instead of Thread.sleep()? Explain with a real test example.' },
          a: {
            tr: 'Thread.sleep(3000) yazdığınızda test her koşulda tam 3 saniye bekler — element 200ms\'de yüklense bile. Yüzlerce test için bu sabit beklemeler birleştiğinde toplam süre dramatik artar. WebDriverWait ise bir koşulu maksimum N saniye boyunca polling yapar; koşul sağlanınca hemen devam eder. Sonuç olarak WebDriverWait hem hızlıdır (koşul erken sağlanırsa) hem de güvenlidir (koşul hiç sağlanmazsa anlamlı TimeoutException fırlatır). Ayrıca Thread.sleep() InterruptedException fırlatır ve checked exception olarak yönetilmesi gerekir.',
            en: 'When you write Thread.sleep(3000), the test always waits exactly 3 seconds — even if the element loaded in 200ms. With hundreds of tests, these fixed waits add up dramatically. WebDriverWait polls a condition for up to N seconds; it continues immediately when the condition is met. As a result WebDriverWait is both faster (if condition is met early) and safer (throws meaningful TimeoutException if never met). Also Thread.sleep() throws InterruptedException which must be handled as a checked exception.',
          },
          code: {
            tr: `// ❌ Kötü — Thread.sleep
driver.get("https://shop.com/checkout");
Thread.sleep(3000); // her zaman 3 sn bekler — element 100ms'de gelse bile!
driver.findElement(By.id("orderConfirm")).click();

// ✅ İyi — WebDriverWait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Element görünür olur olmaz devam eder (100ms'de gelse 100ms bekler)
WebElement confirmBtn = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("orderConfirm"))
);
confirmBtn.click();

// Custom condition — belirli metni bekle
wait.until(d ->
    d.findElement(By.id("status")).getText().contains("Confirmed")
);

// Fluent wait — polling aralığı ayarlanabilir
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(StaleElementReferenceException.class);`,
            en: `// ❌ Bad — Thread.sleep
driver.get("https://shop.com/checkout");
Thread.sleep(3000); // always waits 3s — even if element loads in 100ms!
driver.findElement(By.id("orderConfirm")).click();

// ✅ Good — WebDriverWait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Continues as soon as element is visible (waits only 100ms if loaded that fast)
WebElement confirmBtn = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("orderConfirm"))
);
confirmBtn.click();

// Custom condition — wait for specific text
wait.until(d ->
    d.findElement(By.id("status")).getText().contains("Confirmed")
);

// Fluent wait — configurable polling interval
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(StaleElementReferenceException.class);`,
          },
          analogy: {
            tr: 'Thread.sleep() yemek pişirirken "10 dakika sonra bak" demek gibidir. WebDriverWait ise mutfak alarmı kurmak gibidir — yemek hazır olunca hemen uyarır, daha fazla beklemeye gerek yok.',
            en: 'Thread.sleep() is like saying "check the food after 10 minutes." WebDriverWait is like setting a kitchen timer — it alerts you the moment the food is ready, no extra waiting.',
          },
          keyPoints: [
            { tr: 'WebDriverWait: koşul sağlanınca devam eder, zaman israfı yok', en: 'WebDriverWait: continues when condition met, no wasted time' },
            { tr: 'Thread.sleep() her zaman tam süreyi bekler + InterruptedException', en: 'Thread.sleep() always waits full duration + InterruptedException' },
            { tr: 'FluentWait ile polling aralığı ve ignore edilecek exception ayarlanır', en: 'FluentWait lets you configure polling interval and ignored exceptions' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "200 testlik bir suite\'de her teste Thread.sleep(3000) koysaydık toplam 600 saniye = 10 dakika sabit bekleme olurdu. WebDriverWait ile bu süreyi 2-3 dakikaya indirdik."',
            en: 'Say in interview: "With 200 tests, if each had Thread.sleep(3000), that\'s 600 seconds = 10 minutes of fixed waiting. With WebDriverWait we reduced this to 2-3 minutes."',
          },
        },
        {
          level: 'basic',
          q: { tr: '@DataProvider ile @Parameters arasındaki fark nedir? Data-driven testing için hangisi tercih edilmeli?', en: 'What is the difference between @DataProvider and @Parameters? Which is preferred for data-driven testing?' },
          a: {
            tr: '@Parameters, testng.xml dosyasından statik değerler alır — bu değerler sadece XML\'i düzenleyerek değiştirilebilir ve runtime\'da programatik olarak üretilemez. @DataProvider ise bir Java metodu aracılığıyla Object[][] formatında test verisi döndürür; her satır ayrı bir test çalışması olarak execute edilir. @DataProvider dinamik ve programatiktir: veritabanından, Excel\'den veya Faker ile üretilmiş verilerle çalışabilir. Gerçek data-driven testing için @DataProvider çok daha güçlüdür. Ayrıca @DataProvider parallel="true" ile eşzamanlı çalıştırılabilir.',
            en: '@Parameters reads static values from testng.xml — these can only be changed by editing the XML and cannot be generated programmatically at runtime. @DataProvider returns test data as Object[][] from a Java method; each row executes as a separate test run. @DataProvider is dynamic and programmatic: it can work with data from a database, Excel, or Faker-generated values. For real data-driven testing @DataProvider is far more powerful. It also supports parallel="true" for concurrent execution.',
          },
          code: {
            tr: `// @Parameters — statik, testng.xml'den
// testng.xml: <parameter name="browser" value="chrome"/>
@Test
@Parameters("browser")
public void crossBrowserTest(String browser) {
    System.out.println("Browser: " + browser); // sadece "chrome" gelir
}

// @DataProvider — dinamik, programatik
@DataProvider(name = "loginData", parallel = true)
public Object[][] getLoginData() {
    return new Object[][] {
        { "admin@test.com",  "Admin123!", true  }, // geçerli kullanıcı
        { "wrong@test.com",  "wrong",     false }, // geçersiz
        { "",                "pass",      false }, // boş email
        { "user@test.com",   "User456!",  true  }, // başka geçerli
    };
}

@Test(dataProvider = "loginData")
public void loginTest(String email, String pass, boolean shouldSucceed) {
    loginPage.login(email, pass);
    if (shouldSucceed) {
        assertTrue(homePage.isLoaded());
    } else {
        assertTrue(loginPage.hasError());
    }
}
// → 4 satır = 4 ayrı test çalışması`,
            en: `// @Parameters — static, from testng.xml
// testng.xml: <parameter name="browser" value="chrome"/>
@Test
@Parameters("browser")
public void crossBrowserTest(String browser) {
    System.out.println("Browser: " + browser); // only "chrome" comes in
}

// @DataProvider — dynamic, programmatic
@DataProvider(name = "loginData", parallel = true)
public Object[][] getLoginData() {
    return new Object[][] {
        { "admin@test.com",  "Admin123!", true  }, // valid user
        { "wrong@test.com",  "wrong",     false }, // invalid
        { "",                "pass",      false }, // empty email
        { "user@test.com",   "User456!",  true  }, // another valid
    };
}

@Test(dataProvider = "loginData")
public void loginTest(String email, String pass, boolean shouldSucceed) {
    loginPage.login(email, pass);
    if (shouldSucceed) {
        assertTrue(homePage.isLoaded());
    } else {
        assertTrue(loginPage.hasError());
    }
}
// → 4 rows = 4 separate test executions`,
          },
          analogy: {
            tr: '@Parameters, bir restoranda menüden tek yemek seçmek gibidir — sabit seçenek. @DataProvider ise şef\'in listeden gelen tüm siparişleri tek tek pişirmesi gibidir — her satır ayrı bir yemek.',
            en: '@Parameters is like choosing one fixed dish from a menu — static choice. @DataProvider is like the chef cooking every item on an order list individually — each row is a separate dish.',
          },
          keyPoints: [
            { tr: '@DataProvider: Object[][] döndürür, her satır ayrı test instance\'ı', en: '@DataProvider: returns Object[][], each row is a separate test instance' },
            { tr: '@Parameters: testng.xml\'den okunur, compile-time sabit', en: '@Parameters: read from testng.xml, compile-time fixed' },
            { tr: '@DataProvider(parallel=true) ile testler eşzamanlı çalışır', en: '@DataProvider(parallel=true) runs tests concurrently' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "@DataProvider\'ı Apache POI ile birleştirerek Excel\'den okunan 50 farklı kullanıcı datasıyla login testimi çalıştırdım. Her satır ayrı bir test olduğundan hangi verinin başarısız olduğunu rapordan direkt gördüm."',
            en: 'Say in interview: "I combined @DataProvider with Apache POI to run my login test with 50 user data rows from Excel. Since each row is a separate test, I could see directly in the report which data failed."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'equals() ile == farkı Selenium testlerinde neden kritik önem taşır?', en: 'Why is the difference between equals() and == critical in Selenium tests?' },
          a: {
            tr: '== operatörü Java\'da referans eşitliğini kontrol eder — iki değişkenin bellekte aynı nesneyi gösterip göstermediğini sınar. equals() ise nesnenin içeriğini karşılaştırır. Selenium\'da driver.findElement(...).getText() her çağrıda yeni bir String nesnesi döndürür; bu nesne == ile test edilirse her zaman false döner çünkü farklı referanslardır. Doğru yol: assertEquals("Login", btn.getText()) — JUnit/TestNG\'nin assertEquals() metodu içeride equals() kullanır. Bu hata özellikle mülakatlarda String karşılaştırmalarında sıkça sorulur.',
            en: 'The == operator in Java checks reference equality — whether two variables point to the same object in memory. equals() compares the content of the object. In Selenium, driver.findElement(...).getText() returns a new String object each call; testing it with == will always return false because they are different references. The correct way: assertEquals("Login", btn.getText()) — JUnit/TestNG\'s assertEquals() uses equals() internally. This mistake is frequently tested in interviews regarding String comparisons.',
          },
          code: {
            tr: `// ❌ YANLIŞ — her zaman false döner (farklı String referansı)
WebElement btn = driver.findElement(By.id("loginBtn"));
if (btn.getText() == "Login") {         // BUG! referans karşılaştırma
    System.out.println("Buton doğru");  // ASLA buraya gelmez
}

// ✅ DOĞRU — içerik karşılaştırma
// Yol 1: equals()
assertTrue(btn.getText().equals("Login"));

// Yol 2: JUnit5 assertEquals (önerilen, hata mesajı daha açıklayıcı)
assertEquals("Login", btn.getText());
// Hata mesajı: expected:<Login> but was:<Sign In>

// Yol 3: equalsIgnoreCase (büyük/küçük harf duyarsız)
assertTrue(btn.getText().equalsIgnoreCase("login"));

// ✅ String interning özel durumu (genelde kullanma)
String a = "Login";
String b = "Login";
System.out.println(a == b); // true (string pool'dan aynı referans)
// Ama: getText() string pool'dan gelmez → == güvensiz`,
            en: `// ❌ WRONG — always returns false (different String reference)
WebElement btn = driver.findElement(By.id("loginBtn"));
if (btn.getText() == "Login") {         // BUG! reference comparison
    System.out.println("Button correct"); // NEVER reaches here
}

// ✅ CORRECT — content comparison
// Option 1: equals()
assertTrue(btn.getText().equals("Login"));

// Option 2: JUnit5 assertEquals (recommended, clearer error message)
assertEquals("Login", btn.getText());
// Error message: expected:<Login> but was:<Sign In>

// Option 3: equalsIgnoreCase (case-insensitive)
assertTrue(btn.getText().equalsIgnoreCase("login"));

// ✅ String interning special case (avoid using this)
String a = "Login";
String b = "Login";
System.out.println(a == b); // true (same reference from string pool)
// But: getText() does not come from the pool → == is unsafe`,
          },
          analogy: {
            tr: '== iki evin adres numarasının aynı olup olmadığını kontrol eder. equals() ise iki evin içindeki eşyaların aynı olup olmadığını kontrol eder. Selenium\'da getText() her çağrıda farklı adrese taşınmış aynı eşyaları döndürür.',
            en: '== checks if two houses have the same address. equals() checks if the furniture inside two houses is the same. In Selenium, getText() returns the same furniture moved to a different address each call.',
          },
          keyPoints: [
            { tr: '== referans karşılaştırma, equals() içerik karşılaştırma', en: '== compares references, equals() compares content' },
            { tr: 'getText() her çağrıda yeni String nesnesi döner → == asla kullanma', en: 'getText() returns new String each call → never use ==' },
            { tr: 'assertEquals hata mesajı daha açıklayıcı: expected vs actual', en: 'assertEquals gives clearer error: expected vs actual' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Testlerde String karşılaştırmalarında daima assertEquals() kullanırım — JUnit\'in assert metodları zaten equals() kullanır ve hata mesajı expected/actual farkını açıkça gösterir."',
            en: 'Say in interview: "In tests I always use assertEquals() for String comparisons — JUnit\'s assert methods use equals() internally and the error message clearly shows expected vs actual."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'config.properties dosyasından test verisi nasıl okunur? CI/CD\'de nasıl yönetilir?', en: 'How is test data read from config.properties? How is it managed in CI/CD?' },
          a: {
            tr: 'Java\'nın standart Properties sınıfı key-value formatındaki .properties dosyalarını okuyabilir. Test projesinde tipik olarak Singleton ConfigReader pattern\'i kullanılır: sınıf ilk kez yüklendiğinde dosyayı okur, sonraki çağrılarda cached değeri döndürür. CI/CD ortamında ortam değişkenleri (environment variables) .properties dosyasına göre öncelikli olmalıdır — bu sayede hassas bilgiler (şifreler, API key\'ler) source code\'a girmez. System.getenv() ile env var kontrol edilir, yoksa properties\'den okunur.',
            en: 'Java\'s standard Properties class can read .properties files in key-value format. Test projects typically use the Singleton ConfigReader pattern: it reads the file when the class first loads and returns cached values on subsequent calls. In CI/CD, environment variables must take priority over the .properties file — this way sensitive data (passwords, API keys) never enters source code. Check env vars with System.getenv(), fall back to properties.',
          },
          code: {
            tr: `// config.properties (src/test/resources/)
// base.url=https://staging.myapp.com
// browser=chrome
// implicit.wait=10

// Singleton ConfigReader
public class ConfigReader {
    private static final Properties props = new Properties();

    static {
        try (InputStream in = ConfigReader.class
                .getClassLoader()
                .getResourceAsStream("config.properties")) {
            props.load(in);
        } catch (IOException e) {
            throw new RuntimeException("config.properties bulunamadı!", e);
        }
    }

    // env var → properties fallback
    public static String get(String key) {
        String envVal = System.getenv(key.toUpperCase().replace(".", "_"));
        return envVal != null ? envVal : props.getProperty(key);
    }

    public static String getBaseUrl() { return get("base.url"); }
    public static int    getTimeout() { return Integer.parseInt(get("implicit.wait")); }
}

// Kullanım
driver.get(ConfigReader.getBaseUrl()); // CI'da env var öncelikli`,
            en: `// config.properties (src/test/resources/)
// base.url=https://staging.myapp.com
// browser=chrome
// implicit.wait=10

// Singleton ConfigReader
public class ConfigReader {
    private static final Properties props = new Properties();

    static {
        try (InputStream in = ConfigReader.class
                .getClassLoader()
                .getResourceAsStream("config.properties")) {
            props.load(in);
        } catch (IOException e) {
            throw new RuntimeException("config.properties not found!", e);
        }
    }

    // env var → properties fallback
    public static String get(String key) {
        String envVal = System.getenv(key.toUpperCase().replace(".", "_"));
        return envVal != null ? envVal : props.getProperty(key);
    }

    public static String getBaseUrl() { return get("base.url"); }
    public static int    getTimeout() { return Integer.parseInt(get("implicit.wait")); }
}

// Usage
driver.get(ConfigReader.getBaseUrl()); // env var takes priority in CI`,
          },
          analogy: {
            tr: 'ConfigReader tıpkı bir şirkette telefon rehberi gibidir — bir kez oluşturulur, herkes aynı kaynaktan okur. CI ortamında env var, rehberin üzerindeki yapışkanlı not gibidir — eski bilginin önüne geçer.',
            en: 'ConfigReader is like a company phone directory — created once, everyone reads from the same source. In CI, env var is like a sticky note on the directory — it overrides the old information.',
          },
          keyPoints: [
            { tr: 'Singleton pattern: dosya bir kez okunur, cache\'de tutulur', en: 'Singleton pattern: file read once, cached for all calls' },
            { tr: 'CI\'da şifreler env var olarak verilmeli — .properties\'de asla', en: 'In CI, passwords go as env vars — never in .properties' },
            { tr: 'getResourceAsStream classpath\'ten okur, path hardcode gerekmez', en: 'getResourceAsStream reads from classpath, no hardcoded path needed' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "BASE_URL\'i hem local hem CI\'da çalışacak şekilde env var → properties fallback ile yönetiyorum. Hassas değerler Jenkins secrets veya GitHub Actions secrets\'ta — config dosyasında asla şifre yok."',
            en: 'Say in interview: "I manage BASE_URL with env var → properties fallback so it works both locally and in CI. Sensitive values are in Jenkins secrets or GitHub Actions secrets — never in the config file."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'Selenium\'da sayfanın tam olarak yüklendiğini nasıl doğrularsın? Farklı yaklaşımları karşılaştır.', en: 'How do you verify a page has fully loaded in Selenium? Compare different approaches.' },
          a: {
            tr: 'Sayfa yüklenme kontrolü için birden fazla yaklaşım vardır. En temel yöntem JavaScript\'in document.readyState değerini "complete" olarak kontrol etmektir — ancak bu sadece DOM\'un hazır olduğunu gösterir, AJAX çağrıları tamamlanmış olmayabilir. İkinci yöntem, sayfanın önemli bir elementinin WebDriverWait ile beklenmesidir — bu hem sayfa yüklemesini hem de UI hazırlığını aynı anda kontrol eder. AJAX-heavy uygulamalarda jQuery.active === 0 veya custom JS kontrolleri gerekebilir. Page Object\'e isLoaded() metodu eklemek en iyi pratiktir.',
            en: 'There are multiple approaches for page load verification. The most basic is checking JavaScript\'s document.readyState value as "complete" — but this only confirms the DOM is ready, AJAX calls may not be complete. Second method is waiting for a key element with WebDriverWait — this simultaneously checks page load and UI readiness. AJAX-heavy apps may need jQuery.active === 0 or custom JS checks. Adding an isLoaded() method to Page Objects is the best practice.',
          },
          code: {
            tr: `// Yöntem 1: document.readyState (temel)
wait.until(d -> ((JavascriptExecutor) d)
    .executeScript("return document.readyState")
    .equals("complete"));

// Yöntem 2: Belirli element bekleme (önerilen)
// → Hem sayfa yüklemesini hem UI hazırlığını kontrol eder
wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.id("dashboardHeader")
));

// Yöntem 3: jQuery AJAX bekleme
wait.until(d -> {
    JavascriptExecutor js = (JavascriptExecutor) d;
    try {
        return (Long) js.executeScript("return jQuery.active") == 0;
    } catch (Exception e) {
        return true; // jQuery yoksa geç
    }
});

// ✅ En iyi pratik — Page Object'e isLoaded() ekle
public class DashboardPage {
    public boolean isLoaded() {
        try {
            return wait.until(ExpectedConditions
                .visibilityOfElementLocated(By.id("dashboardHeader")))
                .isDisplayed();
        } catch (TimeoutException e) {
            return false;
        }
    }
}`,
            en: `// Method 1: document.readyState (basic)
wait.until(d -> ((JavascriptExecutor) d)
    .executeScript("return document.readyState")
    .equals("complete"));

// Method 2: Wait for specific element (recommended)
// → Checks both page load and UI readiness
wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.id("dashboardHeader")
));

// Method 3: jQuery AJAX wait
wait.until(d -> {
    JavascriptExecutor js = (JavascriptExecutor) d;
    try {
        return (Long) js.executeScript("return jQuery.active") == 0;
    } catch (Exception e) {
        return true; // skip if jQuery not present
    }
});

// ✅ Best practice — add isLoaded() to Page Object
public class DashboardPage {
    public boolean isLoaded() {
        try {
            return wait.until(ExpectedConditions
                .visibilityOfElementLocated(By.id("dashboardHeader")))
                .isDisplayed();
        } catch (TimeoutException e) {
            return false;
        }
    }
}`,
          },
          analogy: {
            tr: 'Bir restoranda kapıdan girmek (DOM ready) ile masaya oturup menüyü görmek (element görünür) farklı anlara karşılık gelir. document.readyState kapıdan girdiğini söyler, WebDriverWait ise masanın hazır olduğunu doğrular.',
            en: 'Entering a restaurant (DOM ready) vs sitting at a table and seeing the menu (element visible) are different moments. document.readyState tells you the door is open, WebDriverWait confirms the table is ready.',
          },
          keyPoints: [
            { tr: 'document.readyState="complete" yalnızca DOM yüklenmesini gösterir', en: 'document.readyState="complete" only shows DOM loaded' },
            { tr: 'AJAX uygulamalarda element bekleme daha güvenilirdir', en: 'For AJAX apps, waiting for elements is more reliable' },
            { tr: 'isLoaded() metodu Page Object\'i self-verifying yapar', en: 'isLoaded() method makes Page Objects self-verifying' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Her Page Object\'ime isLoaded() metodu ekliyorum. Bu metot o sayfanın önemli elementinin görünür olup olmadığını kontrol eder. Test navigasyon sonrası hep bu metodu çağırır — readyState\'e güvenmek yerine iş mantığına uygun bekleme yapıyorum."',
            en: 'Say in interview: "I add an isLoaded() method to every Page Object. This method checks if the page\'s key element is visible. Tests always call this after navigation — I wait based on business logic rather than trusting readyState."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'Maven\'da belirli bir test sınıfı veya metodunu nasıl çalıştırırsın? Hangi parametreler kullanılır?', en: 'How do you run a specific test class or method in Maven? What parameters are used?' },
          a: {
            tr: 'Maven Surefire Plugin, -Dtest parametresi ile belirli testlerin çalıştırılmasını destekler. Sınıf adı, metod adı, wildcard pattern ve TestNG group\'u belirtilebilir. Bu özellik özellikle bir testi debug ederken veya CI pipeline\'da sadece belirli bir modülün testlerini çalıştırmak istediğinizde değerlidir. Maven 3+\'ta birden fazla test sınıfı virgülle ayrılarak verilebilir. TestNG kullananlar için -Dgroups ile smoke/regression gibi etiketler de kullanılabilir.',
            en: 'Maven Surefire Plugin supports running specific tests via the -Dtest parameter. You can specify class name, method name, wildcard pattern, and TestNG group. This is especially valuable when debugging a test or when you want to run only a specific module\'s tests in a CI pipeline. In Maven 3+ multiple test classes can be given comma-separated. TestNG users can also use -Dgroups for tags like smoke/regression.',
          },
          code: {
            tr: `# Belirli sınıf
mvn test -Dtest=LoginTest

# Belirli metod
mvn test -Dtest=LoginTest#validUserLogin

# Wildcard — Login ile başlayan tüm sınıflar
mvn test -Dtest="Login*"

# Birden fazla sınıf
mvn test -Dtest="LoginTest,CartTest,CheckoutTest"

# TestNG groups
mvn test -Dgroups=smoke
mvn test -Dgroups="smoke,sanity"

# Belirli suiteXml
mvn test -DsuiteXmlFile=testng-smoke.xml

# Debug modu (detaylı log)
mvn test -Dtest=LoginTest -X

# Testi atla (sadece build)
mvn package -DskipTests`,
            en: `# Specific class
mvn test -Dtest=LoginTest

# Specific method
mvn test -Dtest=LoginTest#validUserLogin

# Wildcard — all classes starting with Login
mvn test -Dtest="Login*"

# Multiple classes
mvn test -Dtest="LoginTest,CartTest,CheckoutTest"

# TestNG groups
mvn test -Dgroups=smoke
mvn test -Dgroups="smoke,sanity"

# Specific suiteXml
mvn test -DsuiteXmlFile=testng-smoke.xml

# Debug mode (verbose log)
mvn test -Dtest=LoginTest -X

# Skip tests (build only)
mvn package -DskipTests`,
          },
          analogy: {
            tr: '-Dtest parametresi, bir kütüphanede sadece belirli kitabı aramak gibidir — tüm rafları taramak yerine direkt o rafa gidersin. CI\'da da tüm suite yerine sadece değişen bölümün testlerini çalıştırmak süreyi kısaltır.',
            en: 'The -Dtest parameter is like searching for a specific book in a library — going straight to that shelf instead of scanning all aisles. In CI, running only the tests for the changed module cuts down time.',
          },
          keyPoints: [
            { tr: '-Dtest=ClassName#methodName — sınıf + metod seviyesinde', en: '-Dtest=ClassName#methodName — class + method level' },
            { tr: '-DskipTests build eder ama çalıştırmaz', en: '-DskipTests builds but does not run tests' },
            { tr: '-Dgroups=smoke sadece o grupla etiketli testleri çalıştırır', en: '-Dgroups=smoke runs only tests tagged with that group' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "CI pipeline\'da commit bazlı smoke testleri çalıştırmak için mvn test -Dgroups=smoke kullanıyoruz. Gece regression\'da ise -DsuiteXmlFile=full-regression.xml. Bu şekilde hem hız hem kapsam dengesini kuruyoruz."',
            en: 'Say in interview: "In our CI pipeline we use mvn test -Dgroups=smoke for per-commit smoke tests. For nightly regression we use -DsuiteXmlFile=full-regression.xml. This balances speed and coverage."',
          },
        },
        {
          level: 'basic',
          q: { tr: 'Java test projesinde try-catch ne zaman kullanılmalı, ne zaman kullanılmamalı?', en: 'When should try-catch be used in a Java test project, and when should it not be?' },
          a: {
            tr: 'try-catch\'in yanlış yerde kullanımı bir testin başarısız olması gereken senaryoda yeşil geçmesine yol açabilir — bu en tehlikeli durumdur. Kullanılması gereken durumlar: opsiyonel bir elementin varlığını kontrol etmek (NoSuchElementException bekleniyor), checked exception zorunluluğu (FileInputStream, Properties.load gibi), ve cleanup kodunda (finally bloğu). Kullanılmaması gereken durumlar: assertion hataları yutmak, test flow\'unun ana yolundaki beklenmedik hatalar, ve exception\'ı log\'layıp devam etmek (exception\'ı yutma antipattern\'i). finally bloğu driver.quit() için idealdir çünkü test başarısız olsa bile çalışır.',
            en: 'Using try-catch in the wrong place can make a test that should fail pass green — this is the most dangerous situation. When to use: checking for optional elements (NoSuchElementException expected), mandatory checked exceptions (FileInputStream, Properties.load), and in cleanup code (finally block). When NOT to use: swallowing assertion errors, unexpected errors in the main test flow, and logging the exception then continuing (exception swallowing anti-pattern). The finally block is ideal for driver.quit() because it runs even when the test fails.',
          },
          code: {
            tr: `// ✅ DOĞRU KULLANIM 1: Opsiyonel element kontrolü
public boolean isCookieBannerVisible() {
    try {
        driver.findElement(By.id("cookieBanner"));
        return true;
    } catch (NoSuchElementException e) {
        return false; // banner yoksa false döner, hata değil
    }
}

// ✅ DOĞRU KULLANIM 2: Checked exception zorunluluğu
@BeforeAll
static void setup() throws IOException { // veya try-catch
    Properties props = new Properties();
    try (InputStream in = new FileInputStream("config.properties")) {
        props.load(in);
    } // IOException için try-catch veya throws
}

// ✅ DOĞRU KULLANIM 3: finally ile cleanup
@AfterEach
void tearDown() {
    if (driver != null) {
        driver.quit(); // test fail olsa bile çalışır
    }
}

// ❌ YANLIŞ — exception yutma (anti-pattern)
@Test
void loginTest() {
    try {
        loginPage.login("user", "pass");
        assertEquals("Dashboard", driver.getTitle());
    } catch (Exception e) {
        // exception yutuldu! test yanlışlıkla yeşil geçer
        System.out.println("Hata: " + e.getMessage());
    }
}`,
            en: `// ✅ CORRECT USE 1: Checking optional element
public boolean isCookieBannerVisible() {
    try {
        driver.findElement(By.id("cookieBanner"));
        return true;
    } catch (NoSuchElementException e) {
        return false; // no banner = false, not an error
    }
}

// ✅ CORRECT USE 2: Mandatory checked exception
@BeforeAll
static void setup() throws IOException { // or try-catch
    Properties props = new Properties();
    try (InputStream in = new FileInputStream("config.properties")) {
        props.load(in);
    } // IOException requires try-catch or throws
}

// ✅ CORRECT USE 3: Cleanup with finally
@AfterEach
void tearDown() {
    if (driver != null) {
        driver.quit(); // runs even when test fails
    }
}

// ❌ WRONG — exception swallowing (anti-pattern)
@Test
void loginTest() {
    try {
        loginPage.login("user", "pass");
        assertEquals("Dashboard", driver.getTitle());
    } catch (Exception e) {
        // exception swallowed! test incorrectly passes green
        System.out.println("Error: " + e.getMessage());
    }
}`,
          },
          analogy: {
            tr: 'try-catch, bir kapının anahtar deliğine bakmak gibidir — içeride biri var mı yok mu? kontrol edersin. Ama kapıdan girip içerideki yangını fark edip görmezden gelmek (exception yutmak) tehlikelidir — yangın raporlanmalıdır.',
            en: 'try-catch is like peering through a keyhole — checking if someone is inside. But entering and ignoring the fire inside (swallowing exceptions) is dangerous — the fire must be reported.',
          },
          keyPoints: [
            { tr: 'Exception yutma en tehlikeli antipattern — fail etmesi gereken test geçer', en: 'Swallowing exceptions is the most dangerous anti-pattern — failing tests pass' },
            { tr: 'finally bloğu her koşulda (başarı/başarısızlık) çalışır', en: 'finally block runs in all cases (success/failure)' },
            { tr: 'Opsiyonel element kontrolünde NoSuchElementException beklenir', en: 'NoSuchElementException is expected when checking optional elements' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Test ana flow\'unda exception catch edip devam etmem. Catch etmek zorunda kalırsam mutlaka rethrow ederim: catch(Exception e) { throw new RuntimeException(e); } — test hata mesajını saklamamalı."',
            en: 'Say in interview: "I never catch an exception in the main test flow and continue. If I must catch, I always rethrow: catch(Exception e) { throw new RuntimeException(e); } — tests must never hide error messages."',
          },
        },
        // ── INTERMEDIATE 16-35 ──────────────────────────────────────────────────
        {
          level: 'intermediate',
          q: { tr: 'BasePage sınıfını nasıl tasarlarsın? Hangi metodlar ve sorumluluklar içermeli?', en: 'How do you design a BasePage class? What methods and responsibilities should it contain?' },
          a: {
            tr: 'BasePage, tüm Page Object\'lerin kalıtım aldığı soyut (abstract) üst sınıftır ve iki temel sorumluluğu vardır: ortak driver/wait referanslarını tutmak ve tüm sayfalarda ihtiyaç duyulan utility metodları sağlamak. Constructor\'ı protected yaparak dışarıdan doğrudan instantiation engellenir. click(), type(), getText(), isVisible() gibi wrapper metodlar WebDriverException hatalarını merkezi olarak yakalar — her alt sınıfın ayrı try-catch yazmasına gerek kalmaz. abstract open() ve abstract isLoaded() metodları her Page Object\'in kendi URL\'ini ve yükleme kontrolünü tanımlamasını zorunlu kılar. Parallel testler için driver ThreadLocal üzerinden alınmalıdır.',
            en: 'BasePage is the abstract parent class all Page Objects extend, with two core responsibilities: holding shared driver/wait references and providing utility methods needed on all pages. Making the constructor protected prevents direct instantiation from outside. Wrapper methods like click(), type(), getText(), isVisible() catch WebDriverExceptions centrally — child classes don\'t need individual try-catch. abstract open() and abstract isLoaded() force each Page Object to define its own URL and load check. For parallel tests, driver should be retrieved via ThreadLocal.',
          },
          code: {
            tr: `public abstract class BasePage {
    protected final WebDriver driver;
    protected final WebDriverWait wait;

    protected BasePage(WebDriver driver) {
        this.driver = Objects.requireNonNull(driver);
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // Subclass'ın tanımlaması zorunlu
    public abstract void open();
    public abstract boolean isLoaded();

    // Merkezi utility metodlar
    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }

    protected void type(By locator, String text) {
        WebElement el = wait.until(
            ExpectedConditions.visibilityOfElementLocated(locator));
        el.clear();
        el.sendKeys(text);
    }

    protected String getText(By locator) {
        return wait.until(
            ExpectedConditions.visibilityOfElementLocated(locator)).getText();
    }

    protected boolean isVisible(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}

// Alt sınıf örneği
public class LoginPage extends BasePage {
    private final By emailField = By.id("email");
    private final By passField  = By.id("password");
    private final By loginBtn   = By.cssSelector("button[type=submit]");

    public LoginPage(WebDriver driver) { super(driver); }

    @Override public void open()         { driver.get(ConfigReader.getBaseUrl() + "/login"); }
    @Override public boolean isLoaded()  { return isVisible(emailField); }

    public void login(String email, String pass) {
        type(emailField, email);
        type(passField, pass);
        click(loginBtn);
    }
}`,
            en: `public abstract class BasePage {
    protected final WebDriver driver;
    protected final WebDriverWait wait;

    protected BasePage(WebDriver driver) {
        this.driver = Objects.requireNonNull(driver);
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // Subclasses must implement
    public abstract void open();
    public abstract boolean isLoaded();

    // Central utility methods
    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }

    protected void type(By locator, String text) {
        WebElement el = wait.until(
            ExpectedConditions.visibilityOfElementLocated(locator));
        el.clear();
        el.sendKeys(text);
    }

    protected String getText(By locator) {
        return wait.until(
            ExpectedConditions.visibilityOfElementLocated(locator)).getText();
    }

    protected boolean isVisible(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}

// Subclass example
public class LoginPage extends BasePage {
    private final By emailField = By.id("email");
    private final By passField  = By.id("password");
    private final By loginBtn   = By.cssSelector("button[type=submit]");

    public LoginPage(WebDriver driver) { super(driver); }

    @Override public void open()         { driver.get(ConfigReader.getBaseUrl() + "/login"); }
    @Override public boolean isLoaded()  { return isVisible(emailField); }

    public void login(String email, String pass) {
        type(emailField, email);
        type(passField, pass);
        click(loginBtn);
    }
}`,
          },
          analogy: {
            tr: 'BasePage, Java\'daki Object sınıfı gibidir — herkes ondan kalıtım alır, ortak metodlar orada tanımlanır. Fark şu: BasePage\'i sen tasarlarsın ve hangi metodların zorunlu olduğuna sen karar verirsin.',
            en: 'BasePage is like Java\'s Object class — everyone inherits from it and common methods are defined there. The difference: you design BasePage and decide which methods are mandatory.',
          },
          keyPoints: [
            { tr: 'abstract zorunlu metodlar: open() ve isLoaded() — her sayfa kendi URL/kontrolünü tanımlar', en: 'abstract required methods: open() and isLoaded() — each page defines its own URL/check' },
            { tr: 'protected utility metodlar: merkezi hata yönetimi sağlar', en: 'protected utility methods: provide centralized error handling' },
            { tr: 'Parallel testlerde driver = DriverFactory.getDriver() şeklinde ThreadLocal\'dan alın', en: 'In parallel tests: driver = DriverFactory.getDriver() from ThreadLocal' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "BasePage\'imi abstract yaptım ve iki abstract metod zorunlu: open() ve isLoaded(). Bu, her Page Object\'in hem URL\'ini tanımlamasını hem de yüklendiğini doğrulayabilmesini garanti eder. Test metodları bu metotları çağırır — driver.get() direkt kullanılmaz."',
            en: 'Say in interview: "I made BasePage abstract with two mandatory abstract methods: open() and isLoaded(). This guarantees every Page Object defines both its URL and its load check. Test methods call these — driver.get() is never called directly."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'WebDriver neden ThreadLocal\'da tutulmalı? Yanlış kullanım ne tür hatalara yol açar?', en: 'Why should WebDriver be stored in ThreadLocal? What bugs does incorrect usage cause?' },
          a: {
            tr: 'Parallel test çalıştırıldığında birden fazla thread aynı anda farklı tarayıcı oturumlarını yönetir. Eğer driver static bir field\'da tutulursa tüm thread\'ler aynı driver örneğini paylaşır; Thread A\'nın açtığı sayfaya Thread B müdahale eder — bu cross-contamination olarak adlandırılır ve test sonuçları güvenilmez hale gelir. ThreadLocal, her thread\'e kendi driver örneğini verir ve thread\'ler arası izolasyonu sağlar. Kritik nokta: test bittikten sonra driver.quit() ve ThreadLocal.remove() birlikte çağrılmalıdır; remove() yapılmazsa thread pool ortamında eski driver referansı sızdırılır ve memory leak oluşur.',
            en: 'When tests run in parallel, multiple threads simultaneously manage different browser sessions. If driver is stored in a static field, all threads share the same driver instance; Thread B interferes with the page Thread A opened — called cross-contamination — making test results unreliable. ThreadLocal gives each thread its own driver instance, ensuring inter-thread isolation. Critical point: after a test ends, driver.quit() and ThreadLocal.remove() must be called together; without remove(), in a thread pool environment the old driver reference leaks causing a memory leak.',
          },
          code: {
            tr: `// ❌ YANLIŞ — static driver, parallel'de cross-contamination
public class DriverFactory {
    private static WebDriver driver; // TÜM THREAD PAYLAŞIR!

    public static WebDriver getDriver() {
        if (driver == null) {
            driver = new ChromeDriver(); // Thread A ve B aynı driver'ı alır!
        }
        return driver;
    }
}

// ✅ DOĞRU — ThreadLocal, her thread kendi driver'ını alır
public class DriverFactory {
    private static final ThreadLocal<WebDriver> tl = new ThreadLocal<>();

    public static WebDriver getDriver() {
        if (tl.get() == null) {
            WebDriverManager.chromedriver().setup();
            tl.set(new ChromeDriver());
        }
        return tl.get(); // bu thread'e ait driver döner
    }

    public static void quitDriver() {
        if (tl.get() != null) {
            tl.get().quit();  // tarayıcıyı kapat
            tl.remove();      // referansı temizle — MEMORY LEAK önler!
        }
    }
}

// Test sınıfında kullanım
@AfterEach
void tearDown() {
    DriverFactory.quitDriver(); // quit + remove birlikte
}`,
            en: `// ❌ WRONG — static driver causes cross-contamination in parallel tests
public class DriverFactory {
    private static WebDriver driver; // ALL THREADS SHARE THIS!

    public static WebDriver getDriver() {
        if (driver == null) {
            driver = new ChromeDriver(); // Thread A and B get the same driver!
        }
        return driver;
    }
}

// ✅ CORRECT — ThreadLocal gives each thread its own driver
public class DriverFactory {
    private static final ThreadLocal<WebDriver> tl = new ThreadLocal<>();

    public static WebDriver getDriver() {
        if (tl.get() == null) {
            WebDriverManager.chromedriver().setup();
            tl.set(new ChromeDriver());
        }
        return tl.get(); // returns the driver belonging to this thread
    }

    public static void quitDriver() {
        if (tl.get() != null) {
            tl.get().quit();  // close the browser
            tl.remove();      // clear reference — prevents MEMORY LEAK!
        }
    }
}

// Usage in test class
@AfterEach
void tearDown() {
    DriverFactory.quitDriver(); // quit + remove always together
}`,
          },
          analogy: {
            tr: 'ThreadLocal, her çalışana kendi masasını vermek gibidir. Static driver ise herkesin aynı masayı paylaşması — biri masayı düzenlerken diğeri de o masayı kullanmaya çalışırsa kaos çıkar.',
            en: 'ThreadLocal is like giving each employee their own desk. Static driver is everyone sharing one desk — chaos when one person rearranges it while another tries to use it.',
          },
          keyPoints: [
            { tr: 'ThreadLocal: her thread kendi driver\'ını görür, izolasyon tam', en: 'ThreadLocal: each thread sees its own driver, full isolation' },
            { tr: 'remove() zorunlu: thread pool\'da eski driver referansı sızmasını önler', en: 'remove() is mandatory: prevents old driver reference leaking in thread pools' },
            { tr: 'Static driver = parallel testlerde kesin hata kaynağı', en: 'Static driver = guaranteed bug source in parallel tests' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "İlk parallel test denemesinde static driver kullandım — testler birbirinin sayfasını açıyordu. ThreadLocal\'a geçtikten sonra çakışmalar tamamen durdu. remove() yapmayı unutunca da memory leak yaşadım, o yüzden quit+remove her zaman birlikte."',
            en: 'Say in interview: "In our first parallel attempt we used static driver — tests were opening each other\'s pages. After switching to ThreadLocal, conflicts completely stopped. I also learned about memory leaks when I forgot remove(), so quit+remove always together."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'REST Assured ile API testinde status code, response body ve JSON schema nasıl doğrulanır?', en: 'How do you verify status code, response body, and JSON schema in a REST Assured API test?' },
          a: {
            tr: 'REST Assured, given-when-then BDD yapısıyla okunabilir API testleri yazmayı sağlar. given() bloğunda request parametreleri (header, body, auth) kurulur; when() bloğunda HTTP metodu ve endpoint çağrılır; then() bloğunda yanıt doğrulanır. statusCode(), body() ve header() metodlarıyla assertion yapılır. body() içinde Hamcrest matcher\'ları (equalTo, notNullValue, hasSize, greaterThan) kullanılır. JSON schema doğrulaması için jsonSchemaValidator() plugin\'i son derece güçlüdür — schema.json dosyası ile tüm response yapısı tek satırda doğrulanır.',
            en: 'REST Assured enables readable API tests with given-when-then BDD structure. given() sets up request parameters (headers, body, auth); when() calls the HTTP method and endpoint; then() validates the response. Assertions use statusCode(), body(), and header() methods. body() uses Hamcrest matchers (equalTo, notNullValue, hasSize, greaterThan). JSON schema validation with the jsonSchemaValidator() plugin is very powerful — a single line validates the entire response structure against a schema.json file.',
          },
          code: {
            tr: `// 1. Temel GET testi
Response response = given()
    .baseUri("https://api.myapp.com")
    .header("Authorization", "Bearer " + token)
    .queryParam("page", 1)
.when()
    .get("/users")
.then()
    .statusCode(200)
    .body("data.size()", greaterThan(0))
    .body("data[0].email", notNullValue())
    .extract().response();

// 2. POST testi — body gönder + doğrula
String requestBody = """
    { "name": "Ali", "email": "ali@test.com", "role": "qa" }
    """;

given()
    .contentType(ContentType.JSON)
    .body(requestBody)
.when()
    .post("/users")
.then()
    .statusCode(201)
    .body("id",    notNullValue())
    .body("email", equalTo("ali@test.com"))
    .header("Location", containsString("/users/"));

// 3. JSON Schema doğrulama
given()
    .get("/users/1")
.then()
    .statusCode(200)
    .body(matchesJsonSchemaInClasspath("schemas/user-schema.json"));
// → user-schema.json tüm alanların tipini ve zorunluluğunu doğrular`,
            en: `// 1. Basic GET test
Response response = given()
    .baseUri("https://api.myapp.com")
    .header("Authorization", "Bearer " + token)
    .queryParam("page", 1)
.when()
    .get("/users")
.then()
    .statusCode(200)
    .body("data.size()", greaterThan(0))
    .body("data[0].email", notNullValue())
    .extract().response();

// 2. POST test — send body + verify
String requestBody = """
    { "name": "Ali", "email": "ali@test.com", "role": "qa" }
    """;

given()
    .contentType(ContentType.JSON)
    .body(requestBody)
.when()
    .post("/users")
.then()
    .statusCode(201)
    .body("id",    notNullValue())
    .body("email", equalTo("ali@test.com"))
    .header("Location", containsString("/users/"));

// 3. JSON Schema validation
given()
    .get("/users/1")
.then()
    .statusCode(200)
    .body(matchesJsonSchemaInClasspath("schemas/user-schema.json"));
// → user-schema.json validates type and required status of all fields`,
          },
          analogy: {
            tr: 'REST Assured, bir API\'ye mektup yazıp cevabı kontrol etmek gibidir. given() zarfı hazırlar, when() mektubu gönderir, then() gelen cevabın doğru içeriğe sahip olduğunu kontrol eder.',
            en: 'REST Assured is like writing a letter to an API and checking the reply. given() prepares the envelope, when() sends the letter, then() verifies the reply has the correct content.',
          },
          keyPoints: [
            { tr: 'given-when-then yapısı testi hem okunabilir hem bakımı kolay kılar', en: 'given-when-then structure makes tests readable and maintainable' },
            { tr: 'Hamcrest matcher\'lar: equalTo, notNullValue, hasSize, containsString', en: 'Hamcrest matchers: equalTo, notNullValue, hasSize, containsString' },
            { tr: 'jsonSchemaValidator tek satırda tüm response yapısını doğrular', en: 'jsonSchemaValidator validates the entire response structure in one line' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "REST Assured\'da sadece statusCode ve basit body kontrolüyle yetinmem. JSON schema validasyonu ekliyorum — böylece response contract değişirse test otomatik yakalanır. Bu özellikle microservice\'ler arası sözleşme testinde kritik."',
            en: 'Say in interview: "I don\'t stop at just statusCode and basic body checks in REST Assured. I add JSON schema validation — so if the response contract changes, the test catches it automatically. This is especially critical for contract testing between microservices."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Allure raporu için test adımları ve ek bilgiler nasıl tanımlanır? Neden önemlidir?', en: 'How do you define test steps and additional information for Allure reports? Why does it matter?' },
          a: {
            tr: 'Allure, @Step, @Description, @Severity ve @Epic/@Feature/@Story annotation\'larıyla zengin raporlama sağlar. @Step("Login sayfasını aç") annotation\'ı bir metoda eklendiğinde Allure raporu bu adımı zaman damgasıyla sıralı olarak gösterir — böylece test başarısız olduğunda hangi adımda durduğu açıkça görülür. Allure.addAttachment() ile screenshot, log veya JSON response rapora eklenir. @Severity(SeverityLevel.CRITICAL) ile test önceliği belirlenir. Bu bilgiler sadece raporlama değil, ekip içi iletişim ve hata ayıklama için kritiktir.',
            en: 'Allure provides rich reporting via @Step, @Description, @Severity, and @Epic/@Feature/@Story annotations. Adding @Step("Open login page") to a method makes Allure display this step sequentially with timestamps — so when a test fails, it\'s clearly visible which step it stopped at. Allure.addAttachment() adds screenshots, logs, or JSON responses to the report. @Severity(SeverityLevel.CRITICAL) sets test priority. This information is critical not just for reporting but for team communication and debugging.',
          },
          code: {
            tr: `// Page Object'te @Step kullanımı
public class LoginPage extends BasePage {

    @Step("Login sayfasına git")
    public void open() {
        driver.get(ConfigReader.getBaseUrl() + "/login");
    }

    @Step("Kullanıcı adı '{email}' ile giriş yap")  // parametre gösterimi
    public void login(String email, String password) {
        type(emailField, email);
        type(passField,  password);
        click(loginBtn);
    }
}

// Test sınıfında zengin annotation'lar
@Epic("Kullanıcı Yönetimi")
@Feature("Login")
class LoginTest {

    @Test
    @Story("Geçerli kullanıcı girişi")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Geçerli email/şifre ile kullanıcı dashboard'a yönlendirilmeli")
    void validLoginRedirectsToDashboard() {
        loginPage.open();
        loginPage.login("admin@test.com", "Admin123!");
        assertTrue(dashboardPage.isLoaded());
    }
}

// TestWatcher ile başarısızlıkta screenshot
class AllureScreenshotExtension implements TestWatcher {
    @Override
    public void testFailed(ExtensionContext ctx, Throwable cause) {
        TakesScreenshot ts = (TakesScreenshot) DriverFactory.getDriver();
        byte[] screenshot  = ts.getScreenshotAs(OutputType.BYTES);
        Allure.addAttachment("Failure Screenshot", "image/png",
            new ByteArrayInputStream(screenshot), "png");
    }
}`,
            en: `// @Step usage in Page Object
public class LoginPage extends BasePage {

    @Step("Navigate to login page")
    public void open() {
        driver.get(ConfigReader.getBaseUrl() + "/login");
    }

    @Step("Login with username '{email}'")  // parameter display
    public void login(String email, String password) {
        type(emailField, email);
        type(passField,  password);
        click(loginBtn);
    }
}

// Rich annotations in test class
@Epic("User Management")
@Feature("Login")
class LoginTest {

    @Test
    @Story("Valid user login")
    @Severity(SeverityLevel.CRITICAL)
    @Description("User should be redirected to dashboard with valid email/password")
    void validLoginRedirectsToDashboard() {
        loginPage.open();
        loginPage.login("admin@test.com", "Admin123!");
        assertTrue(dashboardPage.isLoaded());
    }
}

// Screenshot on failure with TestWatcher
class AllureScreenshotExtension implements TestWatcher {
    @Override
    public void testFailed(ExtensionContext ctx, Throwable cause) {
        TakesScreenshot ts = (TakesScreenshot) DriverFactory.getDriver();
        byte[] screenshot  = ts.getScreenshotAs(OutputType.BYTES);
        Allure.addAttachment("Failure Screenshot", "image/png",
            new ByteArrayInputStream(screenshot), "png");
    }
}`,
          },
          analogy: {
            tr: 'Allure raporu, test filminin kamera kaydı gibidir. @Step her sahneyi, screenshot\'lar ise perde aralarını kaydeder. Hata olduğunda filmi o kareye sarıp "işte tam burada bozuldu" diyebilirsin.',
            en: 'An Allure report is like a camera recording of the test film. @Step records each scene, screenshots capture the scene breaks. When there\'s an error, you rewind to that frame and say "it broke exactly here."',
          },
          keyPoints: [
            { tr: '@Step parametreleri destekler: @Step("Login: \'{email}\'")', en: '@Step supports parameters: @Step("Login: \'{email}\'")', },
            { tr: '@Epic/@Feature/@Story hiyerarşik raporlama sağlar', en: '@Epic/@Feature/@Story provides hierarchical reporting' },
            { tr: 'Allure.addAttachment() — screenshot, log, JSON rapora eklenir', en: 'Allure.addAttachment() — screenshots, logs, JSON added to report' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Allure\'da yalnızca @Step kullanmakla kalmam. Başarısızlıkta otomatik screenshot alıp rapora ekliyorum. Böylece CI\'da hata olduğunda sayfanın tam o andaki görüntüsünü rapordan görebiliyoruz."',
            en: 'Say in interview: "I don\'t just use @Step in Allure. I automatically capture a screenshot on failure and attach it to the report. This way, when a CI failure happens, we can see the exact page state from the report."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'TestNG groups özelliği CI/CD pipeline\'ında nasıl stratejik kullanılır?', en: 'How is TestNG\'s groups feature used strategically in a CI/CD pipeline?' },
          a: {
            tr: 'TestNG groups ile testler smoke, sanity, regression, integration gibi kategorilere ayrılır. Her kategorinin çalışma zamanı ve kapsamı farklıdır: smoke testler her commit\'te çalışır ve 5 dakika içinde tamamlanır (kritik yol kontrolü), regression testler ise gece build\'ında çalışır ve 45-60 dakika sürebilir. Bu strateji CI pipeline\'ının hem hızlı geri bildirim hem de kapsamlı kapsam dengesini kurmasını sağlar. testng.xml dosyasında groups ile include/exclude yapılır, mvn ile -Dgroups=smoke veya -DsuiteXmlFile=smoke-suite.xml parametreleri kullanılır.',
            en: 'TestNG groups divides tests into categories like smoke, sanity, regression, integration. Each category has different runtime and coverage: smoke tests run on every commit and complete within 5 minutes (critical path check), while regression runs in the nightly build and may take 45-60 minutes. This strategy lets the CI pipeline balance fast feedback with comprehensive coverage. Include/exclude in testng.xml via groups, run with mvn -Dgroups=smoke or -DsuiteXmlFile=smoke-suite.xml.',
          },
          code: {
            tr: `// Test sınıfında group tanımlama
@Test(groups = {"smoke", "login"})
void validLoginTest() { ... }

@Test(groups = {"regression", "login"})
void loginWithExpiredPasswordTest() { ... }

@Test(groups = {"smoke", "cart"})
void addToCartTest() { ... }

// smoke-suite.xml — her commit çalışır (hızlı)
/*
<suite name="Smoke" verbose="1" parallel="tests" thread-count="4">
  <test name="Smoke Tests">
    <groups>
      <run>
        <include name="smoke"/>
        <exclude name="slow"/>
      </run>
    </groups>
    <packages>
      <package name="com.myapp.tests"/>
    </packages>
  </test>
</suite>
*/

// Jenkins Declarative Pipeline
/*
pipeline {
  stages {
    stage('Smoke — Her Commit') {
      steps { sh 'mvn test -DsuiteXmlFile=smoke-suite.xml' }
    }
    stage('Regression — Gece') {
      when { cron('0 22 * * *') }  // gece 22:00
      steps { sh 'mvn test -DsuiteXmlFile=regression-suite.xml' }
    }
  }
}
*/`,
            en: `// Defining groups in test class
@Test(groups = {"smoke", "login"})
void validLoginTest() { ... }

@Test(groups = {"regression", "login"})
void loginWithExpiredPasswordTest() { ... }

@Test(groups = {"smoke", "cart"})
void addToCartTest() { ... }

// smoke-suite.xml — runs on every commit (fast)
/*
<suite name="Smoke" verbose="1" parallel="tests" thread-count="4">
  <test name="Smoke Tests">
    <groups>
      <run>
        <include name="smoke"/>
        <exclude name="slow"/>
      </run>
    </groups>
    <packages>
      <package name="com.myapp.tests"/>
    </packages>
  </test>
</suite>
*/

// Jenkins Declarative Pipeline
/*
pipeline {
  stages {
    stage('Smoke — Every Commit') {
      steps { sh 'mvn test -DsuiteXmlFile=smoke-suite.xml' }
    }
    stage('Regression — Nightly') {
      when { cron('0 22 * * *') }  // 10 PM nightly
      steps { sh 'mvn test -DsuiteXmlFile=regression-suite.xml' }
    }
  }
}
*/`,
          },
          analogy: {
            tr: 'TestNG groups, bir hastanenin triage sistemi gibidir. Acil vakalar (smoke) hemen görülür, rutin kontroller (regression) sıraya alınır. Her ikisi de önemlidir ama öncelikleri farklıdır.',
            en: 'TestNG groups is like a hospital triage system. Emergency cases (smoke) are seen immediately, routine checks (regression) are scheduled. Both matter but with different priorities.',
          },
          keyPoints: [
            { tr: 'Smoke: < 5 dk, her commit, kritik yol', en: 'Smoke: < 5 min, every commit, critical path' },
            { tr: 'Regression: 45-60 dk, gece build, tam kapsam', en: 'Regression: 45-60 min, nightly build, full coverage' },
            { tr: 'testng.xml include/exclude ile esnek grup kontrolü', en: 'testng.xml include/exclude for flexible group control' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Ekibimizde PR açıldığında smoke suite otomatik tetikleniyor — 5 dakikada kritik yol kontrolü. Gece regression çalışıyor, sabah raporu görüyoruz. Bu stratejiyle hem hız hem güveni aynı anda sağlıyoruz."',
            en: 'Say in interview: "On our team, smoke suite triggers automatically when a PR is opened — critical path check in 5 minutes. Regression runs nightly, we see the report in the morning. This strategy gives us both speed and confidence simultaneously."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Stream API\'yi Selenium test projesinde nasıl kullanırsın? Somut örnekler ver.', en: 'How do you use Stream API in a Selenium test project? Give concrete examples.' },
          a: {
            tr: 'Java 8\'le gelen Stream API, koleksiyon işlemlerini fonksiyonel tarzda yazmanıza olanak tanır. Selenium\'da en yaygın kullanım alanları şunlardır: WebElement listesinden metin veya attribute çıkarmak, belirli kritere uyan elementleri filtrelemek, tablodaki header satırını atlamak (skip(1)), ve unique değerleri Set\'e toplamak. Stream API ayrıca test veri hazırlamada ve assertion\'larda da kullanılır. orElseThrow() ile null safety sağlanır. Parallel stream ile büyük koleksiyonların hızlı işlenmesi mümkündür ancak Selenium WebElement\'ler thread-safe olmadığından UI testlerinde dikkatli kullanılmalıdır.',
            en: 'The Stream API introduced in Java 8 lets you write collection operations in a functional style. Most common uses in Selenium: extracting text or attributes from WebElement lists, filtering elements matching criteria, skipping header rows in tables (skip(1)), and collecting unique values to a Set. Stream API is also used in test data preparation and assertions. orElseThrow() provides null safety. Parallel streams can speed up large collection processing but use cautiously in UI tests since WebElements are not thread-safe.',
          },
          code: {
            tr: `// 1. Element listesinden metin çıkar
List<WebElement> rows = driver.findElements(By.cssSelector("table tbody tr"));
List<String> productNames = rows.stream()
    .map(row -> row.findElement(By.cssSelector("td:first-child")).getText())
    .collect(Collectors.toList());

// 2. Fiyatı belirli değerin üstünde olanları filtrele
List<String> expensiveProducts = rows.stream()
    .filter(row -> {
        String priceText = row.findElement(By.cssSelector("td.price")).getText();
        double price = Double.parseDouble(priceText.replace("₺", "").trim());
        return price > 500.0;
    })
    .map(row -> row.findElement(By.cssSelector("td.name")).getText())
    .collect(Collectors.toList());

// 3. Tablo header'ını atla + unique değer topla
List<WebElement> allRows = driver.findElements(By.tagName("tr"));
Set<String> uniqueCategories = allRows.stream()
    .skip(1) // header satırını atla
    .map(r -> r.findElement(By.cssSelector("td.category")).getText())
    .collect(Collectors.toSet());

// 4. Belirli metni içeren elementi bul
Optional<WebElement> targetProduct = rows.stream()
    .filter(r -> r.getText().contains("Laptop"))
    .findFirst();

targetProduct.orElseThrow(() ->
    new AssertionError("Laptop ürünü listede bulunamadı!"))
    .click();`,
            en: `// 1. Extract text from element list
List<WebElement> rows = driver.findElements(By.cssSelector("table tbody tr"));
List<String> productNames = rows.stream()
    .map(row -> row.findElement(By.cssSelector("td:first-child")).getText())
    .collect(Collectors.toList());

// 2. Filter products above a price threshold
List<String> expensiveProducts = rows.stream()
    .filter(row -> {
        String priceText = row.findElement(By.cssSelector("td.price")).getText();
        double price = Double.parseDouble(priceText.replace("$", "").trim());
        return price > 500.0;
    })
    .map(row -> row.findElement(By.cssSelector("td.name")).getText())
    .collect(Collectors.toList());

// 3. Skip table header + collect unique values
List<WebElement> allRows = driver.findElements(By.tagName("tr"));
Set<String> uniqueCategories = allRows.stream()
    .skip(1) // skip header row
    .map(r -> r.findElement(By.cssSelector("td.category")).getText())
    .collect(Collectors.toSet());

// 4. Find element containing specific text
Optional<WebElement> targetProduct = rows.stream()
    .filter(r -> r.getText().contains("Laptop"))
    .findFirst();

targetProduct.orElseThrow(() ->
    new AssertionError("Laptop product not found in list!"))
    .click();`,
          },
          analogy: {
            tr: 'Stream API, bir fabrika bant sistemi gibidir. filter() kalite kontrolü yapar, map() ürünü dönüştürür, collect() kutuya doldurur. Her adım birinden sonrakine geçer, yan etkisi olmaz.',
            en: 'Stream API is like a factory conveyor belt. filter() does quality control, map() transforms the product, collect() boxes it up. Each step flows to the next with no side effects.',
          },
          keyPoints: [
            { tr: 'map(): her elementi başka bir tipe dönüştür (WebElement→String)', en: 'map(): transform each element to another type (WebElement→String)' },
            { tr: 'filter(): kritere uyan elementleri seç', en: 'filter(): select elements matching criteria' },
            { tr: 'findFirst().orElseThrow(): null-safe arama', en: 'findFirst().orElseThrow(): null-safe search' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Tablodaki tüm ürün fiyatlarını Stream ile çekip, belirli aralıkta olanları filtreledim ve bunları @DataProvider\'a besleyerek veri bazlı test yazdım — Stream API olmadan bu işlem çok daha karmaşık olurdu."',
            en: 'Say in interview: "I used Stream to extract all product prices from a table, filtered those in a specific range, and fed them into @DataProvider for data-driven tests — without Stream API this would have been much more complex."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Selenium Grid ile cross-browser ve cross-platform testi nasıl kurarsın?', en: 'How do you set up cross-browser and cross-platform testing with Selenium Grid?' },
          a: {
            tr: 'Selenium Grid, testlerin merkezi bir Hub üzerinden farklı Node\'lara (makinelere) dağıtılmasını sağlar. Selenium 4 ile Grid mimarisi sadeleşti: Hub ve Node ayrı başlatmak yerine tek komutla Standalone modda çalışır. Test kodu, RemoteWebDriver\'ı Hub URL\'iyle başlatır ve Capabilities ile hangi tarayıcıda çalışacağını belirtir. TestNG\'de parallel="tests" ile aynı anda farklı tarayıcılarda çalıştırılır. Bulut alternatifleri BrowserStack ve Sauce Labs, yüzlerce tarayıcı/OS kombinasyonunu sunar — kendi Grid kurmanıza gerek yoktur.',
            en: 'Selenium Grid distributes tests from a central Hub to different Nodes (machines). With Selenium 4 the Grid architecture simplified: instead of starting Hub and Node separately, it runs in Standalone mode with one command. Test code initializes RemoteWebDriver with the Hub URL and specifies the target browser via Capabilities. TestNG\'s parallel="tests" runs on different browsers simultaneously. Cloud alternatives BrowserStack and Sauce Labs offer hundreds of browser/OS combinations — no need to set up your own Grid.',
          },
          code: {
            tr: `// Grid başlatma (Selenium 4 Standalone)
// java -jar selenium-server-4.x.jar standalone
// → http://localhost:4444/ui/ (Grid UI)

// Test kodu — RemoteWebDriver
public class CrossBrowserTest {

    @Test(dataProvider = "browsers")
    void productPageTest(String browser) throws MalformedURLException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setBrowserName(browser); // "chrome" | "firefox" | "edge"

        WebDriver driver = new RemoteWebDriver(
            new URL("http://localhost:4444"),
            caps
        );

        driver.get("https://myshop.com");
        assertEquals("Shop", driver.getTitle());
        driver.quit();
    }

    @DataProvider(name = "browsers", parallel = true)
    Object[][] getBrowsers() {
        return new Object[][] {
            {"chrome"},
            {"firefox"},
            {"edge"}
        };
    }
}

// testng.xml — paralel browser
/*
<suite name="CrossBrowser" parallel="tests" thread-count="3">
  <test name="Chrome">  <parameter name="browser" value="chrome"/>  </test>
  <test name="Firefox"> <parameter name="browser" value="firefox"/> </test>
</suite>
*/`,
            en: `// Start Grid (Selenium 4 Standalone)
// java -jar selenium-server-4.x.jar standalone
// → http://localhost:4444/ui/ (Grid UI)

// Test code — RemoteWebDriver
public class CrossBrowserTest {

    @Test(dataProvider = "browsers")
    void productPageTest(String browser) throws MalformedURLException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setBrowserName(browser); // "chrome" | "firefox" | "edge"

        WebDriver driver = new RemoteWebDriver(
            new URL("http://localhost:4444"),
            caps
        );

        driver.get("https://myshop.com");
        assertEquals("Shop", driver.getTitle());
        driver.quit();
    }

    @DataProvider(name = "browsers", parallel = true)
    Object[][] getBrowsers() {
        return new Object[][] {
            {"chrome"},
            {"firefox"},
            {"edge"}
        };
    }
}

// testng.xml — parallel browsers
/*
<suite name="CrossBrowser" parallel="tests" thread-count="3">
  <test name="Chrome">  <parameter name="browser" value="chrome"/>  </test>
  <test name="Firefox"> <parameter name="browser" value="firefox"/> </test>
</suite>
*/`,
          },
          analogy: {
            tr: 'Selenium Grid, bir restoran zincirinin merkezi mutfağı gibidir. Sipariş gelir (test), merkez dağıtır (Hub), her şube kendi mutfağında pişirir (Node). Sonuçlar merkeze raporlanır.',
            en: 'Selenium Grid is like a restaurant chain\'s central kitchen. Orders come in (tests), the center distributes (Hub), each branch cooks in its own kitchen (Node). Results are reported to the center.',
          },
          keyPoints: [
            { tr: 'Selenium 4 Grid: tek komutla Standalone — Hub/Node ayrımı yok', en: 'Selenium 4 Grid: single command Standalone — no separate Hub/Node' },
            { tr: 'RemoteWebDriver + Capabilities: hangi browser/OS belirt', en: 'RemoteWebDriver + Capabilities: specify which browser/OS' },
            { tr: 'BrowserStack/Sauce Labs: kendi Grid kurmadan 2000+ kombinasyon', en: 'BrowserStack/Sauce Labs: 2000+ combinations without your own Grid' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Küçük ekiplerde BrowserStack tercih ederim — Grid bakımı olmadan 3000+ browser/OS kombinasyonuna erişiyoruz. Büyük ekiplerde ise kendi Grid kurarak maliyeti azalttık."',
            en: 'Say in interview: "For small teams I prefer BrowserStack — access to 3000+ browser/OS combinations without Grid maintenance. For larger teams we set up our own Grid to reduce costs."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Datafaker ile test verisi nasıl üretilir? Neden sabit test verisi kullanmak sorunludur?', en: 'How is test data generated with Datafaker? Why is using fixed test data problematic?' },
          a: {
            tr: 'Sabit test verisi (örneğin her testte "test@test.com") birden fazla sorun doğurur: testler birbirinin datasını bozabilir, parallel çalışmada unique constraint ihlali olabilir, ve veri birikimi database\'i kirletir. Datafaker her çalışmada gerçekçi ve unique veri üretir — ad, email, IBAN, adres, telefon, kredi kartı gibi domain-specific veriler lokale göre ayarlanabilir. Java\'da io.github.datafaker:datafaker bağımlılığıyla kullanılır. @DataProvider ile birleştirildiğinde her test farklı verilerle çalışır.',
            en: 'Fixed test data (e.g. "test@test.com" every time) creates multiple problems: tests can corrupt each other\'s data, parallel runs may cause unique constraint violations, and accumulated data pollutes the database. Datafaker generates realistic and unique data each run — names, emails, IBANs, addresses, phones, credit cards are locale-configurable. Used in Java with io.github.datafaker:datafaker dependency. Combined with @DataProvider, each test runs with different data.',
          },
          code: {
            tr: `// pom.xml
/*
<dependency>
    <groupId>net.datafaker</groupId>
    <artifactId>datafaker</artifactId>
    <version>2.1.0</version>
    <scope>test</scope>
</dependency>
*/

// Test sınıfı — Datafaker kullanımı
class RegistrationTest {
    private final Faker faker = new Faker(new Locale("tr")); // Türkçe locale

    @Test
    void newUserCanRegister() {
        String email    = faker.internet().emailAddress();   // abc123@example.com
        String name     = faker.name().fullName();           // Ali Yılmaz
        String phone    = faker.phoneNumber().cellPhone();   // 555-123-4567
        String password = faker.internet().password(8, 20, true, true); // güçlü şifre

        registrationPage.fillForm(name, email, phone, password);
        registrationPage.submit();

        assertTrue(confirmationPage.isLoaded(),
            "Kayıt başarısız. Email: " + email); // başarısızlıkta email log'da görünür
    }

    // Domain-specific veri
    @Test
    void paymentWithValidCard() {
        String cardNumber = faker.finance().creditCard(); // 4532 xxxx xxxx xxxx
        String iban       = faker.finance().iban("TR");   // TR00 xxxx ...

        paymentPage.enterCard(cardNumber);
        paymentPage.submit();
        assertTrue(successPage.isLoaded());
    }
}`,
            en: `// pom.xml
/*
<dependency>
    <groupId>net.datafaker</groupId>
    <artifactId>datafaker</artifactId>
    <version>2.1.0</version>
    <scope>test</scope>
</dependency>
*/

// Test class — Datafaker usage
class RegistrationTest {
    private final Faker faker = new Faker(new Locale("en")); // English locale

    @Test
    void newUserCanRegister() {
        String email    = faker.internet().emailAddress();   // abc123@example.com
        String name     = faker.name().fullName();           // John Smith
        String phone    = faker.phoneNumber().cellPhone();   // 555-123-4567
        String password = faker.internet().password(8, 20, true, true); // strong password

        registrationPage.fillForm(name, email, phone, password);
        registrationPage.submit();

        assertTrue(confirmationPage.isLoaded(),
            "Registration failed. Email: " + email); // email visible in logs on failure
    }

    // Domain-specific data
    @Test
    void paymentWithValidCard() {
        String cardNumber = faker.finance().creditCard(); // 4532 xxxx xxxx xxxx
        String iban       = faker.finance().iban("US");   // US00 xxxx ...

        paymentPage.enterCard(cardNumber);
        paymentPage.submit();
        assertTrue(successPage.isLoaded());
    }
}`,
          },
          analogy: {
            tr: 'Datafaker, sonsuz sahte kimlik kartı basan bir makine gibidir. Her koşuda gerçekçi görünen, ama sistemin bilmediği yeni bir kimlik üretir — conflict yok, kirlilik yok.',
            en: 'Datafaker is like a machine that prints endless fake ID cards. Each run produces a realistic-looking identity the system hasn\'t seen — no conflicts, no pollution.',
          },
          keyPoints: [
            { tr: 'Sabit veri → parallel testlerde unique constraint çakışması', en: 'Fixed data → unique constraint collisions in parallel tests' },
            { tr: 'Faker locale desteği: Türkçe/İngilizce/Almanca isim ve adres', en: 'Faker locale support: Turkish/English/German names and addresses' },
            { tr: 'Başarısızlıkta üretilen veriyi log\'a yaz — reproducibility için', en: 'Log generated data on failure — for reproducibility' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Her testte sabit email kullandığımızda parallel çalışmada unique constraint hatası alıyorduk. Datafaker ile her thread kendi unique email\'ini üretince problem çözüldü. Artık test database\'imiz de temiz kalıyor."',
            en: 'Say in interview: "With fixed emails in every test we got unique constraint errors in parallel runs. When each thread generates its own unique email with Datafaker, the problem was solved. Our test database stays clean too."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Interface mi, abstract class mı? Test projesinde hangisini ne zaman tercih edersin?', en: 'Interface or abstract class? Which do you prefer in a test project and when?' },
          a: {
            tr: 'Interface ve abstract class arasındaki tercih, kullanım senaryosuna bağlıdır. Interface "ne yapabilir" sorusunu cevaplar ve çoklu kalıtıma izin verir — birden fazla reporter türü (EmailReporter, SlackReporter) aynı interface\'i implement edebilir. Abstract class ise "ne içerir" sorusunu cevaplar ve ortak state (driver, wait) ile somut metodlar barındırabilir — BasePage bunun klasik örneğidir. Test projesinde kural şudur: ortak state ve davranış paylaşımı için abstract class, sözleşme tanımlamak ve çoklu kalıtım için interface. Java 8+ ile interface\'e default metodlar eklenebildiğinden sınır biraz bulanıklaştı.',
            en: 'The choice between interface and abstract class depends on the scenario. An interface answers "what can it do" and allows multiple inheritance — multiple reporter types (EmailReporter, SlackReporter) can implement the same interface. An abstract class answers "what does it contain" and can hold shared state (driver, wait) plus concrete methods — BasePage is the classic example. Rule in test projects: use abstract class for shared state and behavior, use interface for defining contracts and multiple inheritance. Since Java 8+ interfaces support default methods, the line has blurred somewhat.',
          },
          code: {
            tr: `// Interface — sözleşme + çoklu kalıtım
public interface TestReporter {
    void reportPass(String testName);
    void reportFail(String testName, Throwable cause);

    // Java 8+ default metod
    default String formatMessage(String testName, String status) {
        return "[" + LocalDateTime.now() + "] " + testName + " → " + status;
    }
}

// Birden fazla implement
public class SlackReporter implements TestReporter {
    @Override public void reportPass(String testName) {
        slackClient.send(formatMessage(testName, "✅ PASS"));
    }
    @Override public void reportFail(String testName, Throwable cause) {
        slackClient.send(formatMessage(testName, "❌ FAIL: " + cause.getMessage()));
    }
}

// Abstract class — ortak state + zorunlu metod
public abstract class BasePage {
    protected final WebDriver driver;   // ortak state — interface'de olamaz
    protected final WebDriverWait wait;

    protected BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // Zorunlu — her subclass kendi URL'ini tanımlar
    public abstract void open();
    public abstract boolean isLoaded();

    // Somut ortak davranış
    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }
}`,
            en: `// Interface — contract + multiple inheritance
public interface TestReporter {
    void reportPass(String testName);
    void reportFail(String testName, Throwable cause);

    // Java 8+ default method
    default String formatMessage(String testName, String status) {
        return "[" + LocalDateTime.now() + "] " + testName + " → " + status;
    }
}

// Multiple implementations
public class SlackReporter implements TestReporter {
    @Override public void reportPass(String testName) {
        slackClient.send(formatMessage(testName, "✅ PASS"));
    }
    @Override public void reportFail(String testName, Throwable cause) {
        slackClient.send(formatMessage(testName, "❌ FAIL: " + cause.getMessage()));
    }
}

// Abstract class — shared state + required methods
public abstract class BasePage {
    protected final WebDriver driver;   // shared state — not possible in interface
    protected final WebDriverWait wait;

    protected BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // Required — each subclass defines its own URL
    public abstract void open();
    public abstract boolean isLoaded();

    // Concrete shared behavior
    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }
}`,
          },
          analogy: {
            tr: 'Interface, iş ilanındaki "gereksinimler" listesi gibidir — ne yapabilmesi gerektiğini söyler. Abstract class ise o işin eğitim kılavuzu gibidir — nasıl yapılacağını ve ortak araçları sağlar.',
            en: 'Interface is like a job listing\'s requirements — what it must be able to do. Abstract class is like the training manual — how to do it and the shared tools.',
          },
          keyPoints: [
            { tr: 'Interface: çoklu kalıtım, sözleşme, default metod (Java 8+)', en: 'Interface: multiple inheritance, contract, default methods (Java 8+)' },
            { tr: 'Abstract class: ortak state, constructor, somut metodlar', en: 'Abstract class: shared state, constructor, concrete methods' },
            { tr: 'BasePage → abstract class; Reporter → interface', en: 'BasePage → abstract class; Reporter → interface' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Reporter sınıflarım için interface seçtim — Email, Slack ve Teams reporter aynı interface\'i implement eder, test framework hangisini kullanacağını runtime\'da belirler. BasePage ise abstract class — driver state paylaşmak zorunda."',
            en: 'Say in interview: "For my reporter classes I chose interface — Email, Slack and Teams reporters implement the same interface, the test framework decides at runtime which to use. BasePage is abstract class — it must share driver state."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Log4j2\'yi test projesine nasıl entegre edersin? Hangi log seviyeleri nerede kullanılır?', en: 'How do you integrate Log4j2 into a test project? Which log levels are used where?' },
          a: {
            tr: 'Test projesinde loglama, sadece konsola yazmak değil; CI raporlarında, Allure\'da ve hata analizinde kritik bilgi sağlamaktır. Log4j2 ile her sınıf kendi Logger\'ını oluşturur. Geliştirme ortamında DEBUG seviyesi kullanılır — tüm detaylar görünür. CI/CD\'de ise yalnızca WARN ve ERROR logları saklanır — noise azalır. Allure entegrasyonuyla loglar test raporuna eklenir. log4j2.xml konfigürasyon dosyasıyla her appender (konsol, dosya, Allure) ayrı ayrı yapılandırılır.',
            en: 'Logging in test projects isn\'t just writing to console; it provides critical information in CI reports, Allure, and error analysis. With Log4j2 each class creates its own Logger. In development, DEBUG level is used — all details visible. In CI/CD only WARN and ERROR logs are kept — reduced noise. Allure integration adds logs to test reports. The log4j2.xml configuration file configures each appender (console, file, Allure) separately.',
          },
          code: {
            tr: `// log4j2.xml (src/test/resources/)
/*
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
        <File name="FileLog" fileName="target/test.log">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5level - %msg%n"/>
        </File>
    </Appenders>
    <Loggers>
        <Root level="DEBUG">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="FileLog"/>
        </Root>
    </Loggers>
</Configuration>
*/

// Sınıfta kullanım
public class LoginPage extends BasePage {
    private static final Logger log = LogManager.getLogger(LoginPage.class);

    public void login(String email, String password) {
        log.info("Login denemesi: {}", email);         // INFO: kim login
        log.debug("Şifre uzunluğu: {}", password.length()); // DEBUG: detay
        try {
            type(emailField, email);
            type(passField,  password);
            click(loginBtn);
            log.info("Login başarılı: {}", email);
        } catch (Exception e) {
            log.error("Login başarısız! Email: {}, Hata: {}", email, e.getMessage(), e);
            throw e; // yutma — test fail etmeli
        }
    }
}`,
            en: `// log4j2.xml (src/test/resources/)
/*
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
        <File name="FileLog" fileName="target/test.log">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5level - %msg%n"/>
        </File>
    </Appenders>
    <Loggers>
        <Root level="DEBUG">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="FileLog"/>
        </Root>
    </Loggers>
</Configuration>
*/

// Usage in class
public class LoginPage extends BasePage {
    private static final Logger log = LogManager.getLogger(LoginPage.class);

    public void login(String email, String password) {
        log.info("Login attempt: {}", email);         // INFO: who is logging in
        log.debug("Password length: {}", password.length()); // DEBUG: detail
        try {
            type(emailField, email);
            type(passField,  password);
            click(loginBtn);
            log.info("Login successful: {}", email);
        } catch (Exception e) {
            log.error("Login failed! Email: {}, Error: {}", email, e.getMessage(), e);
            throw e; // don't swallow — test must fail
        }
    }
}`,
          },
          analogy: {
            tr: 'Log seviyeleri, bir geminin sinyal fenerlerine benzer. DEBUG zayıf mavi ışık (geliştirici görür), INFO yeşil (normal durum), WARN sarı (dikkat), ERROR kırmızı (kurtarma gerekebilir).',
            en: 'Log levels are like a ship\'s signal lights. DEBUG is faint blue (developer sees), INFO is green (normal state), WARN is yellow (attention), ERROR is red (rescue may be needed).',
          },
          keyPoints: [
            { tr: 'DEBUG: geliştirme ortamında, CI\'da kapalı', en: 'DEBUG: in development, off in CI' },
            { tr: 'INFO: test akışı takibi, hangi adım çalıştı', en: 'INFO: test flow tracking, which step ran' },
            { tr: 'ERROR: hata loglanır ve test yeniden fırlatılır — yutulmaz', en: 'ERROR: error logged and re-thrown — never swallowed' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Log4j2\'yi hem konsol hem dosya hem Allure appender\'ı ile yapılandırdım. CI\'da level=WARN — sadece önemli mesajlar. Geliştirmede level=DEBUG. Allure entegrasyonuyla test raporu içinde de loglar görünüyor."',
            en: 'Say in interview: "I configured Log4j2 with console, file, and Allure appenders. In CI level=WARN — only important messages. In development level=DEBUG. With Allure integration, logs are visible inside test reports."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Jenkins Declarative Pipeline\'da Java Selenium testleri nasıl çalıştırılır? Nelere dikkat edilmeli?', en: 'How are Java Selenium tests run in a Jenkins Declarative Pipeline? What should be considered?' },
          a: {
            tr: 'Jenkins Declarative Pipeline, Jenkinsfile ile kodlanır ve her adım açıkça tanımlanır. Selenium testleri için kritik noktalar şunlardır: CI ortamında headless mode zorunludur (ekran yok), Maven ve Java versiyonu tool ile yönetilir, post { always {} } bloğu ile test sonuçları test başarısız olsa bile JUnit XML formatında yayınlanır. Allure plugin ile zengin HTML rapor oluşturulur. Paralel branch\'ler ile farklı browser veya ortamlarda eşzamanlı çalıştırma mümkündür. Hassas veriler Jenkins Credentials ile inject edilir.',
            en: 'Jenkins Declarative Pipeline is written as code in a Jenkinsfile with each step explicitly defined. Critical points for Selenium tests: headless mode is mandatory in CI (no display), Maven and Java version are managed via tool, the post { always {} } block publishes test results in JUnit XML format even when tests fail. The Allure plugin creates rich HTML reports. Parallel branches enable simultaneous runs on different browsers or environments. Sensitive data is injected via Jenkins Credentials.',
          },
          code: {
            tr: `// Jenkinsfile — Declarative Pipeline
pipeline {
    agent any

    tools {
        maven 'Maven-3.9'
        jdk   'JDK-21'
    }

    environment {
        BASE_URL    = credentials('staging-base-url')    // Jenkins secret
        HEADLESS    = 'true'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Smoke Tests') {
            steps {
                sh 'mvn clean test -DsuiteXmlFile=smoke.xml -Dheadless=\${HEADLESS}'
            }
        }

        stage('Regression — Paralel') {
            parallel {
                stage('Chrome') {
                    steps { sh 'mvn test -DsuiteXmlFile=regression.xml -Dbrowser=chrome' }
                }
                stage('Firefox') {
                    steps { sh 'mvn test -DsuiteXmlFile=regression.xml -Dbrowser=firefox' }
                }
            }
        }
    }

    post {
        always {
            // Test başarısız olsa da sonuçları yayınla
            junit 'target/surefire-reports/*.xml'
            allure includeProperties: false,
                   results: [[path: 'target/allure-results']]
        }
        failure {
            emailext to: 'qa-team@company.com',
                     subject: "❌ Test Başarısız: \${env.JOB_NAME}",
                     body:    "Build: \${env.BUILD_URL}"
        }
    }
}`,
            en: `// Jenkinsfile — Declarative Pipeline
pipeline {
    agent any

    tools {
        maven 'Maven-3.9'
        jdk   'JDK-21'
    }

    environment {
        BASE_URL    = credentials('staging-base-url')    // Jenkins secret
        HEADLESS    = 'true'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Smoke Tests') {
            steps {
                sh 'mvn clean test -DsuiteXmlFile=smoke.xml -Dheadless=\${HEADLESS}'
            }
        }

        stage('Regression — Parallel') {
            parallel {
                stage('Chrome') {
                    steps { sh 'mvn test -DsuiteXmlFile=regression.xml -Dbrowser=chrome' }
                }
                stage('Firefox') {
                    steps { sh 'mvn test -DsuiteXmlFile=regression.xml -Dbrowser=firefox' }
                }
            }
        }
    }

    post {
        always {
            // Publish results even when tests fail
            junit 'target/surefire-reports/*.xml'
            allure includeProperties: false,
                   results: [[path: 'target/allure-results']]
        }
        failure {
            emailext to: 'qa-team@company.com',
                     subject: "❌ Test Failed: \${env.JOB_NAME}",
                     body:    "Build: \${env.BUILD_URL}"
        }
    }
}`,
          },
          analogy: {
            tr: 'Jenkins Pipeline, bir fabrika üretim hattının kontrol sistemi gibidir. Her stage bir istasyondur, hata olduğunda hat durur ama raporlama (post.always) her koşulda devam eder — ürünün kalite kartı mutlaka doldurulur.',
            en: 'Jenkins Pipeline is like a factory production line\'s control system. Each stage is a station; when there\'s an error the line stops but reporting (post.always) continues regardless — the quality card is always filled.',
          },
          keyPoints: [
            { tr: 'post.always: test fail olsa bile JUnit XML ve Allure yayınlanır', en: 'post.always: JUnit XML and Allure published even when tests fail' },
            { tr: 'CI\'da headless mode zorunlu: -Dheadless=true', en: 'Headless mode mandatory in CI: -Dheadless=true' },
            { tr: 'Jenkins Credentials: şifreler kaynak koduna girmez', en: 'Jenkins Credentials: passwords never enter source code' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Jenkinsfile\'ı her zaman post.always bloğuyla yapılandırıyorum — test başarısız olsa bile Allure raporu yayınlanıyor. Ekip, CI\'da hata olduğunda direkt rapora bakabiliyor, logu taramak zorunda kalmıyor."',
            en: 'Say in interview: "I always configure Jenkinsfile with post.always block — Allure report is published even when tests fail. When there\'s a CI error, the team can look directly at the report, no need to search through logs."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Yavaş çalışan bir test suite\'ini nasıl hızlandırırsın? Hangi adımları sırayla atarsın?', en: 'How do you speed up a slow-running test suite? What steps do you take in order?' },
          a: {
            tr: 'Hızlandırma çalışmasına önce ölçümle başlanır — neyin yavaş olduğunu bilmeden optimize etmeye çalışmak boşa harcar. Surefire raporlarından en uzun süren testler belirlenir. Sonra şu adımlar sırayla uygulanır: (1) Headless mode — tarayıcı arayüzü CI\'da %30-40 zaman alır; (2) Paralel çalışma — TestNG thread-count veya Maven forkCount ile; (3) Tarayıcı yeniden kullanma — @BeforeAll ile suite başında bir kez aç; (4) Katmanlı koşturma — hızlı unit testler önce, yavaş E2E sonra; (5) Driver pool — N sınırlı driver ile tüm testleri rotate et.',
            en: 'Speed optimization starts with measurement — trying to optimize without knowing what\'s slow wastes effort. Use surefire reports to identify the longest-running tests. Then apply these steps in order: (1) Headless mode — browser UI takes 30-40% of time in CI; (2) Parallel execution — TestNG thread-count or Maven forkCount; (3) Browser reuse — open once at suite start with @BeforeAll; (4) Layered execution — fast unit tests first, slow E2E last; (5) Driver pool — rotate all tests through N limited drivers.',
          },
          code: {
            tr: `// Adım 1: Ölç — hangi test en yavaş?
// target/surefire-reports/*.txt içindeki süreler

// Adım 2: Headless mode
ChromeOptions opts = new ChromeOptions();
opts.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");
driver = new ChromeDriver(opts); // ~%35 hız kazancı

// Adım 3: Maven paralel fork
// pom.xml
/*
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.2.5</version>
    <configuration>
        <forkCount>4</forkCount>        ← 4 paralel JVM
        <reuseForks>true</reuseForks>
    </configuration>
</plugin>
*/

// Adım 4: TestNG paralel thread
/*
<suite name="FastSuite" parallel="methods" thread-count="8">
*/

// Adım 5: @BeforeAll browser reuse (izolasyon riski var, bilinçli kullan)
@BeforeAll
static void setupSuite() {
    WebDriverManager.chromedriver().setup();
    driver = new ChromeDriver(headlessOptions()); // 1 kez aç
}

// Basit benchmark
long start = System.currentTimeMillis();
// ... test kodu
long duration = System.currentTimeMillis() - start;
System.out.printf("Test süresi: %d ms%n", duration);`,
            en: `// Step 1: Measure — which test is slowest?
// Durations in target/surefire-reports/*.txt

// Step 2: Headless mode
ChromeOptions opts = new ChromeOptions();
opts.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");
driver = new ChromeDriver(opts); // ~35% speed gain

// Step 3: Maven parallel forks
// pom.xml
/*
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.2.5</version>
    <configuration>
        <forkCount>4</forkCount>        ← 4 parallel JVMs
        <reuseForks>true</reuseForks>
    </configuration>
</plugin>
*/

// Step 4: TestNG parallel threads
/*
<suite name="FastSuite" parallel="methods" thread-count="8">
*/

// Step 5: @BeforeAll browser reuse (isolation risk — use consciously)
@BeforeAll
static void setupSuite() {
    WebDriverManager.chromedriver().setup();
    driver = new ChromeDriver(headlessOptions()); // open once
}

// Simple benchmark
long start = System.currentTimeMillis();
// ... test code
long duration = System.currentTimeMillis() - start;
System.out.printf("Test duration: %d ms%n", duration);`,
          },
          analogy: {
            tr: 'Test suite hızlandırma, bir şehirde trafik akışını iyileştirmeye benzer. Önce hangi kavşakta tıkanıklık var ölçersin (profiling), sonra yol genişletirsin (paralel), ışıkları optimize edersin (headless), alternatif yollar açarsın (katmanlı koşturma).',
            en: 'Speeding up a test suite is like improving traffic flow in a city. First measure which intersection is clogged (profiling), then widen the road (parallel), optimize lights (headless), open alternative routes (layered execution).',
          },
          keyPoints: [
            { tr: 'Headless mode: UI olmadan %30-40 hız kazancı', en: 'Headless mode: 30-40% speed gain without UI' },
            { tr: 'Paralel çalışma: forkCount=4 ile 4x potansiyel hız', en: 'Parallel execution: forkCount=4 for 4x potential speed' },
            { tr: 'Önce ölç, sonra optimize — kör optimizasyon zaman kaybettirir', en: 'Measure first, then optimize — blind optimization wastes time' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "500 testlik suite\'imiz 45 dakika sürüyordu. Headless + parallel (forkCount=4) ile 12 dakikaya indirdik. Kritik adım ölçmekti — Allure raporu hangi testlerin en uzun sürdüğünü gösterdi."',
            en: 'Say in interview: "Our 500-test suite took 45 minutes. With headless + parallel (forkCount=4) we reduced it to 12 minutes. The critical step was measuring — the Allure report showed which tests took longest."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Lambda expression\'lar Selenium ve WebDriverWait\'te nasıl kullanılır?', en: 'How are lambda expressions used with Selenium and WebDriverWait?' },
          a: {
            tr: 'Lambda expression\'lar, anonim sınıf yazmak yerine fonksiyonel interface\'leri kısa ve okunabilir şekilde implement etmenizi sağlar. WebDriverWait\'in until() metodu Function<WebDriver, T> parametresi alır — bu lambda ile kolayca doldurulur. ExpectedConditions ile karşılanamayan özel koşullar (custom conditions) için lambda ideal seçenektir: belirli bir metnin içeriği, element sayısı, JavaScript değeri gibi. Stream API\'de de WebElement\'leri dönüştürmek ve filtrelemek için lambda kullanılır. Method reference (::) daha da kısa yazım sağlar.',
            en: 'Lambda expressions let you implement functional interfaces concisely and readably without writing anonymous classes. WebDriverWait\'s until() method takes a Function<WebDriver, T> parameter — easily filled with a lambda. Lambdas are ideal for custom conditions not covered by ExpectedConditions: specific text content, element count, JavaScript values. Lambdas are also used in Stream API to transform and filter WebElements. Method references (::) provide even shorter syntax.',
          },
          code: {
            tr: `// 1. Özel WebDriverWait koşulu
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Belirli metin bekleme
wait.until(d ->
    d.findElement(By.id("status")).getText().contains("Onaylandı")
);

// Element sayısı bekleme
wait.until(d ->
    d.findElements(By.cssSelector("table tbody tr")).size() > 5
);

// JavaScript değeri bekleme
wait.until(d ->
    ((JavascriptExecutor) d)
        .executeScript("return window.appState.loaded")
        .equals(true)
);

// 2. Stream + Lambda — WebElement işleme
List<WebElement> rows = driver.findElements(By.cssSelector("tr.product-row"));

// Method reference ile kısa yazım
List<String> names = rows.stream()
    .map(WebElement::getText)         // :: method reference
    .collect(Collectors.toList());

// Lambda ile karmaşık dönüşüm
Map<String, Double> priceMap = rows.stream()
    .collect(Collectors.toMap(
        row -> row.findElement(By.cssSelector(".name")).getText(),    // anahtar
        row -> Double.parseDouble(                                    // değer
            row.findElement(By.cssSelector(".price"))
               .getText().replace("₺", "").trim())
    ));`,
            en: `// 1. Custom WebDriverWait condition
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Wait for specific text
wait.until(d ->
    d.findElement(By.id("status")).getText().contains("Approved")
);

// Wait for element count
wait.until(d ->
    d.findElements(By.cssSelector("table tbody tr")).size() > 5
);

// Wait for JavaScript value
wait.until(d ->
    ((JavascriptExecutor) d)
        .executeScript("return window.appState.loaded")
        .equals(true)
);

// 2. Stream + Lambda — WebElement processing
List<WebElement> rows = driver.findElements(By.cssSelector("tr.product-row"));

// Short syntax with method reference
List<String> names = rows.stream()
    .map(WebElement::getText)         // :: method reference
    .collect(Collectors.toList());

// Complex transformation with lambda
Map<String, Double> priceMap = rows.stream()
    .collect(Collectors.toMap(
        row -> row.findElement(By.cssSelector(".name")).getText(),    // key
        row -> Double.parseDouble(                                    // value
            row.findElement(By.cssSelector(".price"))
               .getText().replace("$", "").trim())
    ));`,
          },
          analogy: {
            tr: 'Lambda expression, Java\'da "bir defaya mahsus küçük araç" gibidir. Büyük bir fabrika (sınıf) kurmak yerine, tek iş için pratik bir el aleti (lambda) kullanırsın.',
            en: 'A lambda expression is like a "one-time small tool" in Java. Instead of building a full factory (class), you use a handy hand tool (lambda) for a single job.',
          },
          keyPoints: [
            { tr: 'until(d -> ...) ExpectedConditions\'ın karşılamadığı koşullar için', en: 'until(d -> ...) for conditions not covered by ExpectedConditions' },
            { tr: 'Method reference (::) lambda\'nın daha kısa hali', en: 'Method reference (::) is an even shorter form of lambda' },
            { tr: 'Stream + lambda: WebElement listesini dönüştür/filtrele', en: 'Stream + lambda: transform/filter WebElement lists' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "wait.until() ile özel koşullar için lambda kullanıyorum. Örneğin ödeme sayfasında sipariş ID\'si DOM\'a yazılana kadar bekliyordum: wait.until(d -> !d.findElement(By.id(\'orderId\')).getText().isEmpty()). ExpectedConditions bunu doğrudan desteklemiyor."',
            en: 'Say in interview: "I use lambdas for custom conditions with wait.until(). For example, on the payment page I waited until the order ID appeared in the DOM: wait.until(d -> !d.findElement(By.id(\'orderId\')).getText().isEmpty()). ExpectedConditions doesn\'t directly support this."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Test başarısız olduğunda otomatik screenshot nasıl alınır ve Allure raporuna nasıl eklenir?', en: 'How do you automatically capture a screenshot on test failure and add it to the Allure report?' },
          a: {
            tr: 'Başarısızlık anında ekran görüntüsü almak, sorunun tam olarak nerede oluştuğunu görsel olarak belgelemek için kritiktir. JUnit5\'te TestWatcher extension\'ı implement edilir ve testFailed() metodu override edilir. TestNG\'de @AfterMethod ile ITestResult.FAILURE durumu kontrol edilir. Screenshot alındıktan sonra Allure.addAttachment() ile rapora eklenir. Bu mekanizma merkezi olarak kurulmalı — her test sınıfında tekrar yazılmamalı. JUnit5\'te @ExtendWith ile tüm sınıflara uygulanabilir.',
            en: 'Capturing a screenshot on failure is critical for visually documenting exactly where the problem occurred. In JUnit5, the TestWatcher extension is implemented and testFailed() overridden. In TestNG, check ITestResult.FAILURE status with @AfterMethod. After capturing, the screenshot is added to the report with Allure.addAttachment(). This mechanism must be set up centrally — not repeated in every test class. In JUnit5 it can be applied to all classes with @ExtendWith.',
          },
          code: {
            tr: `// JUnit5 — TestWatcher extension (merkezi)
public class ScreenshotOnFailureExtension implements TestWatcher {

    @Override
    public void testFailed(ExtensionContext ctx, Throwable cause) {
        WebDriver driver = DriverFactory.getDriver();
        if (driver instanceof TakesScreenshot ts) {  // Java 16+ pattern matching
            byte[] screenshot = ts.getScreenshotAs(OutputType.BYTES);

            // Allure raporuna ekle
            Allure.addAttachment(
                "Failure Screenshot — " + ctx.getDisplayName(),
                "image/png",
                new ByteArrayInputStream(screenshot),
                ".png"
            );

            // Dosyaya da kaydet (opsiyonel)
            String fileName = "target/screenshots/" +
                ctx.getTestMethod().map(Method::getName).orElse("unknown") +
                "_" + System.currentTimeMillis() + ".png";
            try { Files.write(Path.of(fileName), screenshot); }
            catch (IOException e) { /* log */ }
        }
    }
}

// Tüm testlere uygula
@ExtendWith(ScreenshotOnFailureExtension.class)
public abstract class BaseTest {
    // Tüm test sınıfları bu abstract sınıfı extends eder
}

// TestNG versiyonu
public class TestNGListener implements ITestListener {
    @Override
    public void onTestFailure(ITestResult result) {
        WebDriver driver = DriverFactory.getDriver();
        byte[] screenshot = ((TakesScreenshot) driver)
            .getScreenshotAs(OutputType.BYTES);
        Allure.addAttachment("Screenshot", "image/png",
            new ByteArrayInputStream(screenshot), ".png");
    }
}`,
            en: `// JUnit5 — TestWatcher extension (centralized)
public class ScreenshotOnFailureExtension implements TestWatcher {

    @Override
    public void testFailed(ExtensionContext ctx, Throwable cause) {
        WebDriver driver = DriverFactory.getDriver();
        if (driver instanceof TakesScreenshot ts) {  // Java 16+ pattern matching
            byte[] screenshot = ts.getScreenshotAs(OutputType.BYTES);

            // Add to Allure report
            Allure.addAttachment(
                "Failure Screenshot — " + ctx.getDisplayName(),
                "image/png",
                new ByteArrayInputStream(screenshot),
                ".png"
            );

            // Also save to file (optional)
            String fileName = "target/screenshots/" +
                ctx.getTestMethod().map(Method::getName).orElse("unknown") +
                "_" + System.currentTimeMillis() + ".png";
            try { Files.write(Path.of(fileName), screenshot); }
            catch (IOException e) { /* log */ }
        }
    }
}

// Apply to all tests
@ExtendWith(ScreenshotOnFailureExtension.class)
public abstract class BaseTest {
    // All test classes extend this abstract class
}

// TestNG version
public class TestNGListener implements ITestListener {
    @Override
    public void onTestFailure(ITestResult result) {
        WebDriver driver = DriverFactory.getDriver();
        byte[] screenshot = ((TakesScreenshot) driver)
            .getScreenshotAs(OutputType.BYTES);
        Allure.addAttachment("Screenshot", "image/png",
            new ByteArrayInputStream(screenshot), ".png");
    }
}`,
          },
          analogy: {
            tr: 'Otomatik screenshot, bir güvenlik kamerasının hareket algıladığında kayıt başlatması gibidir. Her zaman kayıt yapmaz (performans), sadece olay anında belgeye alır.',
            en: 'Automatic screenshot is like a security camera starting to record when it detects motion. It doesn\'t record constantly (performance), only documents the moment of the event.',
          },
          keyPoints: [
            { tr: 'TestWatcher.testFailed(): JUnit5\'te merkezi screenshot çözümü', en: 'TestWatcher.testFailed(): centralized screenshot solution in JUnit5' },
            { tr: 'Allure.addAttachment(): screenshot rapora gömülür, dosya aramak gerekmez', en: 'Allure.addAttachment(): screenshot embedded in report, no file search needed' },
            { tr: 'abstract BaseTest + @ExtendWith: tüm testlere otomatik uygulanır', en: 'abstract BaseTest + @ExtendWith: automatically applied to all tests' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Screenshot\'ı her test sınıfına yazmak yerine TestWatcher extension\'a taşıdım. @ExtendWith ile BaseTest\'e uyguladım — 50 test sınıfının hiçbiri screenshot kodunu bilmek zorunda değil. CI\'da hata olduğunda Allure raporunu açıyoruz, screenshot direkt orada."',
            en: 'Say in interview: "Instead of writing screenshot code in every test class, I moved it to a TestWatcher extension. Applied to BaseTest with @ExtendWith — none of my 50 test classes need to know about screenshots. When there\'s a CI failure, we open the Allure report and the screenshot is right there."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Apache POI ile Excel\'den test verisi nasıl okunur? @DataProvider ile nasıl birleştirilir?', en: 'How is test data read from Excel with Apache POI? How is it combined with @DataProvider?' },
          a: {
            tr: 'Apache POI, Java\'da Excel (.xlsx) ve eski Excel (.xls) dosyalarını okuyup yazmanıza olanak tanır. Test otomasyonunda en yaygın kullanım: test verisi (kullanıcı bilgileri, ürün ID\'leri, beklenen sonuçlar) Excel\'de tutulur, DataProvider bu veriyi okuyarak test metoduna sağlar. Bu yaklaşım teknik olmayan ekip üyelerinin test verisini düzenlemesine olanak tanır — kod değişikliği gerekmez. Workbook → Sheet → Row → Cell hiyerarşisiyle veri okunur. Boş hücre ve tip dönüşüm kontrolü önemlidir.',
            en: 'Apache POI lets you read and write Excel (.xlsx) and older Excel (.xls) files in Java. Most common use in test automation: test data (user info, product IDs, expected results) stored in Excel, DataProvider reads this data and supplies it to the test method. This approach lets non-technical team members update test data — no code changes needed. Data is read through the Workbook → Sheet → Row → Cell hierarchy. Checking for empty cells and type conversion is important.',
          },
          code: {
            tr: `// pom.xml — Apache POI bağımlılık
/*
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.5</version>
    <scope>test</scope>
</dependency>
*/

// Excel okuyucu utility
public class ExcelReader {
    public static Object[][] readTestData(String filePath, String sheetName)
            throws IOException {
        try (Workbook wb = WorkbookFactory.create(new File(filePath))) {
            Sheet sheet = wb.getSheet(sheetName);
            int rowCount = sheet.getLastRowNum(); // 0-based: son satır index

            // Satır sayısı - 1 (header hariç) x sütun sayısı
            int colCount = sheet.getRow(0).getLastCellNum();
            Object[][] data = new Object[rowCount][colCount];

            for (int r = 1; r <= rowCount; r++) { // 0. satır = header
                Row row = sheet.getRow(r);
                for (int c = 0; c < colCount; c++) {
                    Cell cell = row.getCell(c);
                    if (cell == null) {
                        data[r - 1][c] = "";
                    } else {
                        data[r - 1][c] = switch (cell.getCellType()) {
                            case STRING  -> cell.getStringCellValue().trim();
                            case NUMERIC -> String.valueOf((int) cell.getNumericCellValue());
                            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
                            default      -> "";
                        };
                    }
                }
            }
            return data;
        }
    }
}

// TestNG DataProvider ile kullanım
// login-data.xlsx: | email            | password  | expectedResult |
//                  | admin@test.com   | Admin123! | dashboard      |
//                  | wrong@test.com   | wrong     | error          |

@DataProvider(name = "loginFromExcel")
Object[][] getLoginData() throws IOException {
    return ExcelReader.readTestData(
        "src/test/resources/testdata/login-data.xlsx", "LoginSheet"
    );
}

@Test(dataProvider = "loginFromExcel")
void loginTest(String email, String pass, String expected) {
    loginPage.login(email, pass);
    assertEquals(expected, loginPage.getCurrentPage());
}`,
            en: `// pom.xml — Apache POI dependency
/*
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.5</version>
    <scope>test</scope>
</dependency>
*/

// Excel reader utility
public class ExcelReader {
    public static Object[][] readTestData(String filePath, String sheetName)
            throws IOException {
        try (Workbook wb = WorkbookFactory.create(new File(filePath))) {
            Sheet sheet = wb.getSheet(sheetName);
            int rowCount = sheet.getLastRowNum(); // 0-based: last row index

            // Row count - 1 (excluding header) x column count
            int colCount = sheet.getRow(0).getLastCellNum();
            Object[][] data = new Object[rowCount][colCount];

            for (int r = 1; r <= rowCount; r++) { // row 0 = header
                Row row = sheet.getRow(r);
                for (int c = 0; c < colCount; c++) {
                    Cell cell = row.getCell(c);
                    if (cell == null) {
                        data[r - 1][c] = "";
                    } else {
                        data[r - 1][c] = switch (cell.getCellType()) {
                            case STRING  -> cell.getStringCellValue().trim();
                            case NUMERIC -> String.valueOf((int) cell.getNumericCellValue());
                            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
                            default      -> "";
                        };
                    }
                }
            }
            return data;
        }
    }
}

// Usage with TestNG DataProvider
// login-data.xlsx: | email            | password  | expectedResult |
//                  | admin@test.com   | Admin123! | dashboard      |
//                  | wrong@test.com   | wrong     | error          |

@DataProvider(name = "loginFromExcel")
Object[][] getLoginData() throws IOException {
    return ExcelReader.readTestData(
        "src/test/resources/testdata/login-data.xlsx", "LoginSheet"
    );
}

@Test(dataProvider = "loginFromExcel")
void loginTest(String email, String pass, String expected) {
    loginPage.login(email, pass);
    assertEquals(expected, loginPage.getCurrentPage());
}`,
          },
          analogy: {
            tr: 'Excel DataProvider kombinasyonu, bir kütüphanecinin katalog kartlarından kitap sipariş listesi çıkarması gibidir. Katalog (Excel) değişir, kütüphaneci (DataProvider) her zaman güncel listeyi sunar.',
            en: 'Excel + DataProvider combination is like a librarian pulling an order list from catalog cards. The catalog (Excel) changes, the librarian (DataProvider) always serves the current list.',
          },
          keyPoints: [
            { tr: 'WorkbookFactory.create(): .xlsx ve .xls her ikisini destekler', en: 'WorkbookFactory.create(): supports both .xlsx and .xls' },
            { tr: 'Header satırını atla: row 0 = header, row 1\'den başla', en: 'Skip header row: row 0 = header, start from row 1' },
            { tr: 'Cell tipi kontrolü: STRING/NUMERIC/BOOLEAN ayrı okunur', en: 'Cell type check: STRING/NUMERIC/BOOLEAN read differently' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Excel okuyucuyu generic yazdım — sheet adı parametre, dönüş Object[][]. Böylece tüm data providerlar aynı utility\'yi kullanıyor. QA analistler test datasını Excel\'de düzenleyebiliyor, koda dokunmalarına gerek yok."',
            en: 'Say in interview: "I wrote a generic Excel reader — sheet name as parameter, returns Object[][]. All data providers use the same utility. QA analysts can edit test data in Excel without touching the code."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Enum test projesinde nasıl kullanılır? Magic string problemini nasıl çözer?', en: 'How is enum used in test projects? How does it solve the magic string problem?' },
          a: {
            tr: 'Enum, sınırlı ve bilinen değer kümesini type-safe biçimde temsil eder. Test projesinde en sık kullanım alanları: tarayıcı tipi (CHROME, FIREFOX, EDGE), ortam (DEV, QA, STAGING, PROD), test öncelik seviyesi (LOW, MEDIUM, HIGH, CRITICAL), ve Selenium Select metodları. Magic string — sabit değerlerin string olarak kullanımı — yazım hatalarına ve refactoring zorluğuna yol açar; enum bunu ortadan kaldırır. Enum metodlar (getBaseUrl(), getDbConnection()) ile konfigürasyon mantığı enum içinde kapsüllenebilir.',
            en: 'Enum represents a limited, known set of values in a type-safe way. Most common uses in test projects: browser type (CHROME, FIREFOX, EDGE), environment (DEV, QA, STAGING, PROD), test priority level (LOW, MEDIUM, HIGH, CRITICAL), and Selenium Select methods. Magic strings — using fixed values as strings — lead to typos and refactoring difficulties; enum eliminates this. Configuration logic can be encapsulated inside the enum with methods (getBaseUrl(), getDbConnection()).',
          },
          code: {
            tr: `// Ortam enum — konfigürasyon dahil
public enum Environment {
    DEV     ("https://dev.myapp.com",     "dev-db:5432/devdb"),
    QA      ("https://qa.myapp.com",      "qa-db:5432/qadb"),
    STAGING ("https://staging.myapp.com", "staging-db:5432/stagingdb"),
    PROD    ("https://myapp.com",         "prod-db:5432/proddb");

    private final String baseUrl;
    private final String dbUrl;

    Environment(String baseUrl, String dbUrl) {
        this.baseUrl = baseUrl;
        this.dbUrl   = dbUrl;
    }

    public String getBaseUrl() { return baseUrl; }
    public String getDbUrl()   { return dbUrl;   }

    // String'den enum (testng.xml parametresinden)
    public static Environment fromString(String env) {
        return valueOf(env.toUpperCase());
    }
}

// Browser enum
public enum Browser {
    CHROME, FIREFOX, EDGE, SAFARI;

    public WebDriver createDriver() {
        return switch (this) {
            case CHROME  -> { WebDriverManager.chromedriver().setup();  yield new ChromeDriver(); }
            case FIREFOX -> { WebDriverManager.firefoxdriver().setup(); yield new FirefoxDriver(); }
            case EDGE    -> { WebDriverManager.edgedriver().setup();    yield new EdgeDriver(); }
            default      -> throw new IllegalArgumentException("Desteklenmeyen: " + this);
        };
    }
}

// Kullanım — type-safe, magic string yok
Environment env     = Environment.fromString(System.getProperty("env", "QA"));
Browser     browser = Browser.valueOf(System.getProperty("browser", "CHROME"));

driver.get(env.getBaseUrl()); // ✅
// driver.get("https://qa.myapp.com"); // ❌ magic string`,
            en: `// Environment enum — with configuration
public enum Environment {
    DEV     ("https://dev.myapp.com",     "dev-db:5432/devdb"),
    QA      ("https://qa.myapp.com",      "qa-db:5432/qadb"),
    STAGING ("https://staging.myapp.com", "staging-db:5432/stagingdb"),
    PROD    ("https://myapp.com",         "prod-db:5432/proddb");

    private final String baseUrl;
    private final String dbUrl;

    Environment(String baseUrl, String dbUrl) {
        this.baseUrl = baseUrl;
        this.dbUrl   = dbUrl;
    }

    public String getBaseUrl() { return baseUrl; }
    public String getDbUrl()   { return dbUrl;   }

    // String to enum conversion (from testng.xml parameter)
    public static Environment fromString(String env) {
        return valueOf(env.toUpperCase());
    }
}

// Browser enum
public enum Browser {
    CHROME, FIREFOX, EDGE, SAFARI;

    public WebDriver createDriver() {
        return switch (this) {
            case CHROME  -> { WebDriverManager.chromedriver().setup();  yield new ChromeDriver(); }
            case FIREFOX -> { WebDriverManager.firefoxdriver().setup(); yield new FirefoxDriver(); }
            case EDGE    -> { WebDriverManager.edgedriver().setup();    yield new EdgeDriver(); }
            default      -> throw new IllegalArgumentException("Unsupported: " + this);
        };
    }
}

// Usage — type-safe, no magic strings
Environment env     = Environment.fromString(System.getProperty("env", "QA"));
Browser     browser = Browser.valueOf(System.getProperty("browser", "CHROME"));

driver.get(env.getBaseUrl()); // ✅
// driver.get("https://qa.myapp.com"); // ❌ magic string`,
          },
          analogy: {
            tr: 'Enum, bir şirketin organizasyon şeması gibidir. "IT departmanı" yerine "Department.IT" kullanırsın — yazım hatası imkansız, mevcut departmanlar bellidir, yenisi eklemek merkezden yapılır.',
            en: 'Enum is like a company\'s organizational chart. Instead of "IT department", you use "Department.IT" — typos are impossible, existing departments are known, adding a new one is done centrally.',
          },
          keyPoints: [
            { tr: 'Magic string eliminasyonu: yazım hatası derleme zamanında yakalanır', en: 'Magic string elimination: typos caught at compile time' },
            { tr: 'Enum içinde metod: konfigürasyon mantığını enum\'a kapsülle', en: 'Methods in enum: encapsulate configuration logic inside' },
            { tr: 'valueOf() ile string→enum dönüşümü (testng.xml parametresinden)', en: 'valueOf() for string→enum conversion (from testng.xml parameter)' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Ortam seçimini string yerine Environment enum ile yönetiyorum. testng.xml\'de -Denv=STAGING parametresi gelince Environment.fromString(\"STAGING\") ile enum\'a çeviriyorum — yanlış ortam adı yazılırsa IllegalArgumentException ile hemen yakalanıyor."',
            en: 'Say in interview: "I manage environment selection with Environment enum instead of strings. When -Denv=STAGING comes from testng.xml, I convert it with Environment.fromString(\"STAGING\") — if the wrong environment name is typed, it\'s caught immediately with IllegalArgumentException."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'TestNG ITestListener nasıl implement edilir ve ne tür otomasyonlar sağlar?', en: 'How do you implement TestNG ITestListener and what automations does it enable?' },
          a: {
            tr: 'ITestListener, test yaşam döngüsü olaylarına hook eklemenizi sağlayan bir interface\'dir. onTestStart(), onTestSuccess(), onTestFailure(), onTestSkipped() metodlarını override ederek her olay için özel davranış tanımlanır. En yaygın kullanımlar: başarısızlıkta screenshot alma ve Allure\'a ekleme, Slack/Teams bildirimi gönderme, JIRA\'da otomatik bug açma, ve detaylı log yazma. testng.xml\'de <listeners> ile kayıt edilir veya @Listeners annotation\'ı ile sınıf bazında uygulanır. Listener, test sınıfından tamamen ayrı — separation of concerns.',
            en: 'ITestListener is an interface that lets you add hooks to test lifecycle events. Override onTestStart(), onTestSuccess(), onTestFailure(), onTestSkipped() to define custom behavior for each event. Most common uses: capturing screenshots on failure and adding to Allure, sending Slack/Teams notifications, automatically opening JIRA bugs, and detailed logging. Registered in testng.xml via <listeners> or applied class-by-class with @Listeners annotation. Listener is completely separate from test class — separation of concerns.',
          },
          code: {
            tr: `// ITestListener implementasyonu
public class TestLifecycleListener implements ITestListener {

    @Override
    public void onTestStart(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        LogManager.getLogger(getClass())
            .info("▶ TEST BAŞLADI: {}", testName);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        LogManager.getLogger(getClass())
            .info("✅ BAŞARILI: {}", result.getMethod().getMethodName());
    }

    @Override
    public void onTestFailure(ITestResult result) {
        String testName = result.getMethod().getMethodName();

        // 1. Screenshot al → Allure'a ekle
        WebDriver driver = DriverFactory.getDriver();
        if (driver != null) {
            byte[] screenshot = ((TakesScreenshot) driver)
                .getScreenshotAs(OutputType.BYTES);
            Allure.addAttachment("Screenshot: " + testName,
                "image/png", new ByteArrayInputStream(screenshot), ".png");
        }

        // 2. Slack bildir (opsiyonel)
        // slackClient.send("❌ " + testName + " BAŞARISIZ: "
        //     + result.getThrowable().getMessage());

        LogManager.getLogger(getClass())
            .error("❌ BAŞARISIZ: {} → {}",
                testName, result.getThrowable().getMessage());
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        LogManager.getLogger(getClass())
            .warn("⏭ ATLANDI: {}", result.getMethod().getMethodName());
    }
}

// testng.xml kaydı
/*
<suite name="MySuite">
    <listeners>
        <listener class-name="com.myapp.listeners.TestLifecycleListener"/>
    </listeners>
    <test name="Regression"> ... </test>
</suite>
*/`,
            en: `// ITestListener implementation
public class TestLifecycleListener implements ITestListener {

    @Override
    public void onTestStart(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        LogManager.getLogger(getClass())
            .info("▶ TEST STARTED: {}", testName);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        LogManager.getLogger(getClass())
            .info("✅ PASSED: {}", result.getMethod().getMethodName());
    }

    @Override
    public void onTestFailure(ITestResult result) {
        String testName = result.getMethod().getMethodName();

        // 1. Take screenshot → add to Allure
        WebDriver driver = DriverFactory.getDriver();
        if (driver != null) {
            byte[] screenshot = ((TakesScreenshot) driver)
                .getScreenshotAs(OutputType.BYTES);
            Allure.addAttachment("Screenshot: " + testName,
                "image/png", new ByteArrayInputStream(screenshot), ".png");
        }

        // 2. Notify Slack (optional)
        // slackClient.send("❌ " + testName + " FAILED: "
        //     + result.getThrowable().getMessage());

        LogManager.getLogger(getClass())
            .error("❌ FAILED: {} → {}",
                testName, result.getThrowable().getMessage());
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        LogManager.getLogger(getClass())
            .warn("⏭ SKIPPED: {}", result.getMethod().getMethodName());
    }
}

// testng.xml registration
/*
<suite name="MySuite">
    <listeners>
        <listener class-name="com.myapp.listeners.TestLifecycleListener"/>
    </listeners>
    <test name="Regression"> ... </test>
</suite>
*/`,
          },
          analogy: {
            tr: 'ITestListener, bir maçtaki hakemler gibidir — maçı oynamazlar ama her önemli olayı (gol, sarı kart) kaydeder ve kurallara göre aksiyon alırlar. Test sınıfı maçı oynar, Listener hakemlik yapar.',
            en: 'ITestListener is like the referees in a match — they don\'t play but record every important event (goal, yellow card) and take action according to rules. The test class plays the match, the Listener referees.',
          },
          keyPoints: [
            { tr: 'Separation of concerns: test mantığı ve raporlama mantığı ayrı', en: 'Separation of concerns: test logic and reporting logic separated' },
            { tr: 'testng.xml\'de merkezi kayıt: tüm testlere otomatik uygulanır', en: 'Central registration in testng.xml: automatically applied to all tests' },
            { tr: 'ITestListener vs @AfterMethod: Listener global, @AfterMethod sınıf bazında', en: 'ITestListener vs @AfterMethod: Listener is global, @AfterMethod is class-scoped' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "ITestListener ile her test başarısızlığında otomatik screenshot alıp Allure\'a ekliyorum. @AfterMethod yerine Listener kullandım çünkü bu davranışı tek bir yerde tanımlamak istedim — 30 test sınıfında tekrar yazmak değil."',
            en: 'Say in interview: "With ITestListener I automatically capture a screenshot and add it to Allure on every test failure. I used Listener instead of @AfterMethod because I wanted to define this behavior in one place — not repeat it in 30 test classes."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'GitHub Actions\'ta Java Selenium testleri nasıl çalıştırılır? Workflow YAML nasıl yapılandırılır?', en: 'How do you run Java Selenium tests in GitHub Actions? How is the workflow YAML configured?' },
          a: {
            tr: 'GitHub Actions, GitHub reposuna entegre ücretsiz CI/CD platformudur. Java Selenium testleri için temel adımlar şunlardır: ubuntu-latest runner üzerinde çalışır, actions/setup-java@v4 ile JDK kurulur, Chrome için apt ile google-chrome-stable kurulup headless mode etkinleştirilir, maven komutu ile testler çalıştırılır, ve artifact upload ile test raporları saklanır. Hassas bilgiler (BASE_URL, API key) GitHub Secrets üzerinden inject edilir. Pull Request\'te otomatik tetikleme ve branch koruma kuralları ile birlikte kullanılır.',
            en: 'GitHub Actions is a free CI/CD platform integrated into GitHub repos. Key steps for Java Selenium tests: runs on ubuntu-latest runner, JDK installed with actions/setup-java@v4, Chrome installed via apt with google-chrome-stable and headless mode enabled, tests run with maven command, test reports saved with artifact upload. Sensitive info (BASE_URL, API key) injected via GitHub Secrets. Used with automatic triggering on Pull Requests and branch protection rules.',
          },
          code: {
            tr: `# .github/workflows/selenium-tests.yml
name: Selenium Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 22 * * *'  # Her gece 22:00 regression

jobs:
  selenium-test:
    runs-on: ubuntu-latest
    timeout-minutes: 60

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Java 21 Kur
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'  # Maven cache — hız kazancı

      - name: Chrome Kur
        run: |
          sudo apt-get update
          sudo apt-get install -y google-chrome-stable
          google-chrome --version

      - name: Testleri Çalıştır
        env:
          BASE_URL:  \${{ secrets.STAGING_BASE_URL }}   # GitHub Secret
          DB_PASS:   \${{ secrets.DB_PASSWORD }}
          HEADLESS:  'true'
        run: mvn clean test -DsuiteXmlFile=smoke.xml -Dheadless=$HEADLESS

      - name: Test Raporunu Yükle
        if: always()  # Başarısız olsa da yükle
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: target/allure-results/

      - name: JUnit Sonuçlarını Yayınla
        if: always()
        uses: dorny/test-reporter@v1
        with:
          name:    'Selenium Tests'
          path:    'target/surefire-reports/*.xml'
          reporter: 'java-junit'`,
            en: `# .github/workflows/selenium-tests.yml
name: Selenium Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 22 * * *'  # Nightly regression at 22:00

jobs:
  selenium-test:
    runs-on: ubuntu-latest
    timeout-minutes: 60

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Java 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'  # Maven cache — speed gain

      - name: Install Chrome
        run: |
          sudo apt-get update
          sudo apt-get install -y google-chrome-stable
          google-chrome --version

      - name: Run Tests
        env:
          BASE_URL:  \${{ secrets.STAGING_BASE_URL }}   # GitHub Secret
          DB_PASS:   \${{ secrets.DB_PASSWORD }}
          HEADLESS:  'true'
        run: mvn clean test -DsuiteXmlFile=smoke.xml -Dheadless=$HEADLESS

      - name: Upload Test Report
        if: always()  # Upload even when tests fail
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: target/allure-results/

      - name: Publish JUnit Results
        if: always()
        uses: dorny/test-reporter@v1
        with:
          name:    'Selenium Tests'
          path:    'target/surefire-reports/*.xml'
          reporter: 'java-junit'`,
          },
          analogy: {
            tr: 'GitHub Actions workflow, bir aşçının tarif kartı gibidir — her adım sırayla yazılıdır, hangi malzeme (JDK, Chrome) gerektiği bellidir, ne zaman yapılacağı (push, PR, schedule) tanımlanmıştır.',
            en: 'A GitHub Actions workflow is like a chef\'s recipe card — each step is written in order, what ingredients (JDK, Chrome) are needed is clear, and when to do it (push, PR, schedule) is defined.',
          },
          keyPoints: [
            { tr: 'if: always() — test fail olsa da artifact yüklenir', en: 'if: always() — artifacts uploaded even when tests fail' },
            { tr: 'GitHub Secrets: şifreler env var olarak inject edilir', en: 'GitHub Secrets: passwords injected as env vars' },
            { tr: 'cache: maven — bağımlılıklar cache\'lenince build hızlanır', en: 'cache: maven — dependencies cached for faster builds' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "GitHub Actions workflow\'umu PR tetikleyicili kurdum — her PR\'da smoke suite otomatik çalışıyor. main branch\'i koruyan bir kural da ekledim: testler geçmeden merge edilemiyor."',
            en: 'Say in interview: "I set up my GitHub Actions workflow with PR trigger — smoke suite runs automatically on every PR. I also added a branch protection rule: tests must pass before merging to main."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Page Object Model (POM) neden kullanılır? Doğru POM tasarımının yanlış tasarımdan farkı nedir?', en: 'Why is Page Object Model used? What is the difference between correct and incorrect POM design?' },
          a: {
            tr: 'POM, UI test kodunu iki katmana ayırır: (1) Page Object katmanı — sayfanın element locatorları ve üzerinde yapılabilecek aksiyonlar, (2) Test katmanı — iş senaryosunun adımları. Bu ayrımın en büyük faydası bakım kolaylığıdır: bir butonun ID\'si değiştiğinde sadece Page Object güncellenir, tüm testler otomatik düzelir. Yanlış POM tasarımı: driver.findElement() çağrılarını test sınıfına yazmak, locatorları magic string olarak tekrarlamak, assertion\'ları Page Object\'e koymak. Doğru POM: Page Object yalnızca UI etkileşimi yapar, assertion test sınıfındadır.',
            en: 'POM divides UI test code into two layers: (1) Page Object layer — element locators and actions that can be performed on the page, (2) Test layer — the steps of the business scenario. The biggest benefit is maintainability: if a button\'s ID changes, only the Page Object is updated and all tests automatically fixed. Incorrect POM design: writing driver.findElement() calls in test classes, repeating locators as magic strings, putting assertions in Page Objects. Correct POM: Page Object only handles UI interaction, assertions are in the test class.',
          },
          code: {
            tr: `// ❌ YANLIŞ POM — locator test sınıfında
class LoginTest {
    @Test
    void testLogin() {
        driver.findElement(By.id("email")).sendKeys("user@test.com");  // ❌
        driver.findElement(By.id("password")).sendKeys("pass");         // ❌
        driver.findElement(By.cssSelector("button[type='submit']")).click(); // ❌
        assertTrue(driver.getCurrentUrl().contains("/dashboard"));
        // Email ID değişirse: tüm test sınıflarını güncelle
    }
}

// ✅ DOĞRU POM — locator Page Object'te
public class LoginPage extends BasePage {
    private final By emailField = By.id("email");
    private final By passField  = By.id("password");
    private final By submitBtn  = By.cssSelector("button[type='submit']");
    private final By errorMsg   = By.id("errorMessage");

    public LoginPage(WebDriver driver) { super(driver); }

    // Eylemler Page Object'te — assertion değil!
    public void login(String email, String password) {
        type(emailField, email);
        type(passField,  password);
        click(submitBtn);
    }

    public String getErrorMessage() {
        return getText(errorMsg);
    }
}

// Test sınıfı — sadece senaryo + assertion
class LoginTest extends BaseTest {
    @Test
    void validLoginRedirectsToDashboard() {
        loginPage.open();
        loginPage.login("user@test.com", "password123");

        // Assertion test sınıfında
        assertTrue(dashboardPage.isLoaded(), "Dashboard yüklenmeli");
    }

    @Test
    void invalidLoginShowsError() {
        loginPage.open();
        loginPage.login("bad@test.com", "wrong");

        // Page Object assertion döndürmez, veriyi sağlar
        assertEquals("Geçersiz email veya şifre", loginPage.getErrorMessage());
    }
}`,
            en: `// ❌ INCORRECT POM — locator in test class
class LoginTest {
    @Test
    void testLogin() {
        driver.findElement(By.id("email")).sendKeys("user@test.com");  // ❌
        driver.findElement(By.id("password")).sendKeys("pass");         // ❌
        driver.findElement(By.cssSelector("button[type='submit']")).click(); // ❌
        assertTrue(driver.getCurrentUrl().contains("/dashboard"));
        // If email ID changes: update all test classes
    }
}

// ✅ CORRECT POM — locator in Page Object
public class LoginPage extends BasePage {
    private final By emailField = By.id("email");
    private final By passField  = By.id("password");
    private final By submitBtn  = By.cssSelector("button[type='submit']");
    private final By errorMsg   = By.id("errorMessage");

    public LoginPage(WebDriver driver) { super(driver); }

    // Actions in Page Object — not assertions!
    public void login(String email, String password) {
        type(emailField, email);
        type(passField,  password);
        click(submitBtn);
    }

    public String getErrorMessage() {
        return getText(errorMsg);
    }
}

// Test class — only scenario + assertion
class LoginTest extends BaseTest {
    @Test
    void validLoginRedirectsToDashboard() {
        loginPage.open();
        loginPage.login("user@test.com", "password123");

        // Assertion in test class
        assertTrue(dashboardPage.isLoaded(), "Dashboard should load");
    }

    @Test
    void invalidLoginShowsError() {
        loginPage.open();
        loginPage.login("bad@test.com", "wrong");

        // Page Object returns data, not assertions
        assertEquals("Invalid email or password", loginPage.getErrorMessage());
    }
}`,
          },
          analogy: {
            tr: 'POM, bir ev planı gibidir. Page Object — binanın planı (kapılar, pencereler nerede). Test — orada ne yapılacağı (kahvaltı yapılacak, oturma odası kullanılacak). Plan değişirse sadece planı güncelle, günlük rutini değil.',
            en: 'POM is like a building plan. Page Object — where the doors and windows are. Test — what happens there (breakfast, living room). If the plan changes, update only the plan, not the daily routine.',
          },
          keyPoints: [
            { tr: 'Page Object: locator + aksiyon, assertion YOK', en: 'Page Object: locator + action, NO assertion' },
            { tr: 'Test sınıfı: senaryo akışı + assertion', en: 'Test class: scenario flow + assertion' },
            { tr: 'Locator değişirse: 1 yer güncelleme, yüzlerce test otomatik düzelen', en: 'Locator changes: 1 place to update, hundreds of tests auto-fixed' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "POM kuralım: Page Object assertion döndürmez, veri döndürür. Assertion sadece test sınıfında. Bu ayrım sayesinde aynı Page Object\'i farklı senaryolarda farklı assertionlarla kullanabiliyorum."',
            en: 'Say in interview: "My POM rule: Page Object doesn\'t return assertions, it returns data. Assertions only in test class. This separation lets me use the same Page Object with different assertions in different scenarios."',
          },
        },
        {
          level: 'intermediate',
          q: { tr: 'Selenium testlerinde retry (yeniden deneme) mekanizması nasıl implement edilir?', en: 'How is a retry mechanism implemented in Selenium tests?' },
          a: {
            tr: 'Retry mekanizması flaky testlerin otomatik olarak tekrar denenmesini sağlar. Ancak bu bir bant-aid çözümdür — kök nedeni düzeltmek asıl hedeftir. JUnit5\'te RepeatedTest veya custom Extension ile; TestNG\'de IRetryAnalyzer interface\'i ile implement edilir. Retry en fazla 2-3 kez yapılmalıdır — daha fazlası pipeline süresini uzatır ve sorunun üstünü örter. Retry edilen testler ayrıca raporlanmalı (flaky olarak işaretlenmiş), böylece kök neden analizi yapılabilir. Maven Surefire Plugin\'de -Dsurefire.rerunFailingTestsCount=2 ile de basit retry yapılabilir.',
            en: 'Retry mechanism automatically re-runs flaky tests. However this is a band-aid solution — fixing the root cause is the real goal. Implemented with RepeatedTest or custom Extension in JUnit5; with IRetryAnalyzer interface in TestNG. Retry should happen at most 2-3 times — more extends pipeline time and masks the problem. Retried tests should be separately reported (marked as flaky) so root cause analysis can be done. Simple retry also available with Maven Surefire Plugin via -Dsurefire.rerunFailingTestsCount=2.',
          },
          code: {
            tr: `// TestNG — IRetryAnalyzer
public class RetryAnalyzer implements IRetryAnalyzer {
    private int count   = 0;
    private static final int MAX_RETRY = 2; // maksimum 2 kez dene

    @Override
    public boolean retry(ITestResult result) {
        if (count < MAX_RETRY) {
            count++;
            LogManager.getLogger(getClass())
                .warn("⟳ Retry #{}: {}", count,
                    result.getMethod().getMethodName());
            return true;  // tekrar dene
        }
        return false;     // artık deneme
    }
}

// Test metoduna bağla
@Test(retryAnalyzer = RetryAnalyzer.class)
void checkoutFlowTest() { ... }

// Tüm testlere global uygula — IAnnotationTransformer
public class RetryTransformer implements IAnnotationTransformer {
    @Override
    public void transform(ITestAnnotation annotation,
                          Class testClass, Constructor ctor, Method method) {
        annotation.setRetryAnalyzer(RetryAnalyzer.class); // tümüne
    }
}
// testng.xml: <listener class-name="...RetryTransformer"/>

// JUnit5 — @RepeatedTest
@RepeatedTest(value = 3, failureThreshold = 1)
// failureThreshold=1: 1 başarı yeterliyse geç
void flakyPaymentTest(RepetitionInfo info) {
    System.out.println("Deneme: " + info.getCurrentRepetition());
    paymentPage.completeCheckout();
    assertTrue(confirmationPage.isLoaded());
}

// Maven Surefire — basit yaklaşım
// mvn test -Dsurefire.rerunFailingTestsCount=2`,
            en: `// TestNG — IRetryAnalyzer
public class RetryAnalyzer implements IRetryAnalyzer {
    private int count   = 0;
    private static final int MAX_RETRY = 2; // maximum 2 retries

    @Override
    public boolean retry(ITestResult result) {
        if (count < MAX_RETRY) {
            count++;
            LogManager.getLogger(getClass())
                .warn("⟳ Retry #{}: {}", count,
                    result.getMethod().getMethodName());
            return true;  // retry
        }
        return false;     // no more retries
    }
}

// Attach to test method
@Test(retryAnalyzer = RetryAnalyzer.class)
void checkoutFlowTest() { ... }

// Apply globally to all tests — IAnnotationTransformer
public class RetryTransformer implements IAnnotationTransformer {
    @Override
    public void transform(ITestAnnotation annotation,
                          Class testClass, Constructor ctor, Method method) {
        annotation.setRetryAnalyzer(RetryAnalyzer.class); // for all
    }
}
// testng.xml: <listener class-name="...RetryTransformer"/>

// JUnit5 — @RepeatedTest
@RepeatedTest(value = 3, failureThreshold = 1)
// failureThreshold=1: pass if 1 success is enough
void flakyPaymentTest(RepetitionInfo info) {
    System.out.println("Attempt: " + info.getCurrentRepetition());
    paymentPage.completeCheckout();
    assertTrue(confirmationPage.isLoaded());
}

// Maven Surefire — simple approach
// mvn test -Dsurefire.rerunFailingTestsCount=2`,
          },
          analogy: {
            tr: 'Retry mekanizması, internet bağlantısı kesilince otomatik yeniden bağlanan bir VPN istemcisi gibidir. Geçici kesintilere karşı dayanıklılık sağlar, ama internet altyapısını düzeltmez.',
            en: 'Retry mechanism is like a VPN client that automatically reconnects when the connection drops. It provides resilience against temporary interruptions but doesn\'t fix the internet infrastructure.',
          },
          keyPoints: [
            { tr: 'Retry kök nedenin çözümü değil, geçici çözüm', en: 'Retry is not the root cause fix, it\'s a temporary workaround' },
            { tr: 'MAX_RETRY=2-3: daha fazla pipeline\'ı uzatır ve sorunu maskeler', en: 'MAX_RETRY=2-3: more extends pipeline and masks the problem' },
            { tr: 'Retry\'lanan testler flaky olarak işaretlenmeli — analiz için', en: 'Retried tests should be marked as flaky — for analysis' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Retry mekanizmasını ekledim ama paralel izleme de kurdum: hangi test kaç kez retry edildi raporda görünüyor. Aylık retry sayısı yüksek olan testler kök neden analizi listesine alınıyor. Retry eklendikten 2 hafta sonra 3 flaky testi tamamen düzelttik."',
            en: 'Say in interview: "I added retry but also set up parallel monitoring: which test was retried how many times is visible in the report. Tests with high monthly retry counts go on the root cause analysis list. 2 weeks after adding retry we fixed 3 flaky tests completely."',
          },
        },
        // ── ADVANCED 36-50 ──────────────────────────────────────────────────────
        {
          level: 'advanced',
          q: { tr: 'Flaky testlere sistematik ve profesyonel bir yaklaşım nasıl kurulur?', en: 'How do you establish a systematic and professional approach to flaky tests?' },
          a: {
            tr: 'Flaky test yönetimi bir kere düzeltmekten ibaret değil; süregelen bir süreç gerektirir. İlk adım kategorilendirmedir: Timing (AJAX bitmeden etkileşim), Test bağımlılığı (test sırasına bağımlılık), Environment (CI vs local fark), JS async (animasyon/lazy-load). Her kategorinin farklı çözümü vardır. Sonra her flaky test @Tag("flaky") veya @Disabled ile izole edilmeli, retry eklenmeli ama kök neden analizi yapılmalıdır. 30 günlük CI geçmişi analiz edilerek en çok sallanan testler önceliklendirilir. Deterministic locatorlar, explicit wait ve tam test izolasyonu kalıcı çözümdür.',
            en: 'Flaky test management isn\'t a one-time fix; it requires an ongoing process. First step is categorization: Timing (interaction before AJAX completes), Test dependency (depending on test order), Environment (CI vs local difference), JS async (animation/lazy-load). Each category has different solutions. Then each flaky test should be isolated with @Tag("flaky") or @Disabled, retry added, but root cause analysis performed. Analyzing 30-day CI history prioritizes the most frequently flaking tests. Deterministic locators, explicit wait, and full test isolation are the permanent fix.',
          },
          code: {
            tr: `// Flaky test yönetim süreci

// 1. Kategorilendirme + etiketleme
@Test
@Tag("flaky")
@Tag("timing")  // hangi kategoride?
@Disabled("JIRA-1234: AJAX race condition — explicit wait eklenecek")
void checkoutFlowTest() { ... }

// 2. Timing fix — en sık neden
// ❌ Kötü: AJAX bitmeden
driver.findElement(By.id("totalPrice")).getText(); // "₺0" döner!

// ✅ İyi: Fiyat hesaplandıktan sonra
wait.until(d -> {
    String price = d.findElement(By.id("totalPrice")).getText();
    return !price.equals("₺0") && !price.isEmpty();
});

// 3. Test izolasyonu — state paylaşımı engeli
@BeforeEach
void createFreshTestData() {
    // Her test kendi verisini oluşturur — başkasına bağımlı değil
    testUser = userApi.createUser(faker.internet().emailAddress());
}

@AfterEach
void cleanupTestData() {
    if (testUser != null) userApi.deleteUser(testUser.getId());
}

// 4. CI geçmişi analizi
// mvn test -Dsurefire.rerunFailingTestsCount=3 ile retry etkinleştir
// target/surefire-reports klasöründe hangi test kaç kez fail etti izle
// → Aylık flaky analiz raporu ekibe paylaş`,
            en: `// Flaky test management process

// 1. Categorization + tagging
@Test
@Tag("flaky")
@Tag("timing")  // which category?
@Disabled("JIRA-1234: AJAX race condition — explicit wait to be added")
void checkoutFlowTest() { ... }

// 2. Timing fix — most common cause
// ❌ Bad: interaction before AJAX completes
driver.findElement(By.id("totalPrice")).getText(); // returns "$0"!

// ✅ Good: after price is calculated
wait.until(d -> {
    String price = d.findElement(By.id("totalPrice")).getText();
    return !price.equals("$0") && !price.isEmpty();
});

// 3. Test isolation — prevent state sharing
@BeforeEach
void createFreshTestData() {
    // Each test creates its own data — not dependent on others
    testUser = userApi.createUser(faker.internet().emailAddress());
}

@AfterEach
void cleanupTestData() {
    if (testUser != null) userApi.deleteUser(testUser.getId());
}

// 4. CI history analysis
// Enable retry: mvn test -Dsurefire.rerunFailingTestsCount=3
// Track how many times each test failed in target/surefire-reports
// → Share monthly flaky analysis report with team`,
          },
          analogy: {
            tr: 'Flaky test yönetimi, bir şehrin trafik kazaları azaltma programı gibidir. Tek bir kazayı düzeltmek yeterli değil; yüksek riskli kavşakları (kategorilendirme), tekrarlayan sebepleri (kök neden) ve kalıcı çözümleri (altyapı iyileştirme) ele almak gerekir.',
            en: 'Flaky test management is like a city\'s traffic accident reduction program. Fixing one accident isn\'t enough; you need to address high-risk intersections (categorization), recurring causes (root cause), and permanent fixes (infrastructure improvement).',
          },
          keyPoints: [
            { tr: 'Kategoriler: Timing / Bağımlılık / Environment / JS async', en: 'Categories: Timing / Dependency / Environment / JS async' },
            { tr: '@Tag("flaky") + CI geçmişi: hangi test ne sıklıkta sallanıyor?', en: '@Tag("flaky") + CI history: which test flakes how often?' },
            { tr: 'Retry bant-aid, kök neden analizi kalıcı çözüm', en: 'Retry is a band-aid, root cause analysis is the permanent fix' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Flaky testleri üç aşamada yönetiyorum: Tespit (CI geçmişi), İzole etme (@Tag + @Disabled), Sistematik düzeltme (kategoriye göre çözüm). Düzeltilip düzeltilmediği 2 haftalık CI geçmişiyle doğrulanıyor. Bu süreç sayesinde flaky test oranımızı %15\'ten %2\'ye indirdik."',
            en: 'Say in interview: "I manage flaky tests in three phases: Detection (CI history), Isolation (@Tag + @Disabled), Systematic fix (solution by category). Whether fixed is verified by 2-week CI history. Through this process we reduced our flaky test rate from 15% to 2%."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Java Selenium test projesinde memory leak nasıl oluşur ve nasıl önlenir?', en: 'How does a memory leak occur in a Java Selenium test project and how is it prevented?' },
          a: {
            tr: 'Test projelerinde memory leak\'in en sık üç nedeni vardır: (1) driver.quit() çağrılmaması — tarayıcı process\'i arka planda çalışmaya devam eder; (2) ThreadLocal.remove() unutulması — thread pool ortamında (örn. TestNG parallel) thread yeniden kullanıldığında eski driver referansı hala ThreadLocal\'da yaşar; (3) static WebElement tutmak — sayfa yenilendikten sonra stale reference olur ama GC tarafından temizlenemeyen bağlantılar oluşabilir. Önlemler: try-finally bloğu ile quit+remove garantilenmeli, @AfterEach içinde DriverFactory.quitDriver() çağrılmalı, ve JVM\'e -XX:+HeapDumpOnOutOfMemoryError flag\'i eklenmeli. VisualVM ile heap analizi yapılabilir.',
            en: 'The three most common memory leak causes in test projects: (1) Not calling driver.quit() — browser process continues running in background; (2) Forgetting ThreadLocal.remove() — in thread pool environments (e.g. TestNG parallel), when a thread is reused, the old driver reference still lives in ThreadLocal; (3) Holding static WebElements — after page refresh creates stale references that can\'t be cleaned by GC due to lingering connections. Prevention: guarantee quit+remove with try-finally, call DriverFactory.quitDriver() in @AfterEach, add -XX:+HeapDumpOnOutOfMemoryError JVM flag. VisualVM can be used for heap analysis.',
          },
          code: {
            tr: `// ❌ LEAK 1: driver.quit() unutmak
static WebDriver driver = new ChromeDriver(); // global
// Test sonrası quit() çağrılmazsa: Chrome process arka planda çalışır
// 100 test = 100 zombie Chrome process = OutOfMemoryError

// ❌ LEAK 2: ThreadLocal.remove() unutmak
ThreadLocal<WebDriver> tl = new ThreadLocal<>();
tl.set(new ChromeDriver());
tl.get().quit();
// tl.remove() eksik! → thread pool'da thread recycled, eski referans yaşar

// ✅ ÇÖZÜM — guaranteed cleanup
public class DriverFactory {
    private static final ThreadLocal<WebDriver> TL = new ThreadLocal<>();

    public static WebDriver getDriver() {
        if (TL.get() == null) {
            WebDriverManager.chromedriver().setup();
            TL.set(new ChromeDriver());
        }
        return TL.get();
    }

    public static void quitDriver() {
        WebDriver driver = TL.get();
        if (driver != null) {
            try {
                driver.quit();      // tarayıcıyı kapat
            } finally {
                TL.remove();        // referansı temizle — her koşulda
            }
        }
    }
}

// Test sınıfı
@AfterEach
void tearDown() {
    DriverFactory.quitDriver(); // try-finally içinde quit+remove
}

// JVM flag — heap dump on OOM
// -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heap.hprof
// → Eclipse MAT ile analiz edilir`,
            en: `// ❌ LEAK 1: forgetting driver.quit()
static WebDriver driver = new ChromeDriver(); // global
// If quit() isn't called after test: Chrome process runs in background
// 100 tests = 100 zombie Chrome processes = OutOfMemoryError

// ❌ LEAK 2: forgetting ThreadLocal.remove()
ThreadLocal<WebDriver> tl = new ThreadLocal<>();
tl.set(new ChromeDriver());
tl.get().quit();
// tl.remove() missing! → thread recycled in thread pool, old reference persists

// ✅ SOLUTION — guaranteed cleanup
public class DriverFactory {
    private static final ThreadLocal<WebDriver> TL = new ThreadLocal<>();

    public static WebDriver getDriver() {
        if (TL.get() == null) {
            WebDriverManager.chromedriver().setup();
            TL.set(new ChromeDriver());
        }
        return TL.get();
    }

    public static void quitDriver() {
        WebDriver driver = TL.get();
        if (driver != null) {
            try {
                driver.quit();      // close the browser
            } finally {
                TL.remove();        // clear reference — in all cases
            }
        }
    }
}

// Test class
@AfterEach
void tearDown() {
    DriverFactory.quitDriver(); // quit+remove inside try-finally
}

// JVM flag — heap dump on OOM
// -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heap.hprof
// → analyze with Eclipse MAT`,
          },
          analogy: {
            tr: 'driver.quit() yapmamak, her kullandığın arabayı park edip anahtarı bırakmak ama motoru kapatmamak gibidir. Zamanla tüm araçların motorları çalışıyor olur ve yakıt (bellek) tükenir.',
            en: 'Not calling driver.quit() is like parking every car you use and leaving the key but not turning off the engine. Eventually all cars have running engines and fuel (memory) runs out.',
          },
          keyPoints: [
            { tr: 'quit() + remove() birlikte, finally içinde — her koşulda çalışır', en: 'quit() + remove() together, inside finally — runs in all cases' },
            { tr: 'Thread pool: remove() olmadan eski driver bir sonraki testte kullanılır', en: 'Thread pool: without remove() old driver is used in next test' },
            { tr: '-XX:+HeapDumpOnOutOfMemoryError: OOM hatası heap\'i dosyaya yazar', en: '-XX:+HeapDumpOnOutOfMemoryError: OOM writes heap to file for analysis' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Projemin ilk versiyonunda 200 testten sonra OutOfMemoryError alıyorduk. VisualVM analizi ThreadLocal.remove() eksikliğini gösterdi. Düzeltme sonrası 2000 test sorunsuz çalıştı. Bu nedenle DriverFactory\'nin quitDriver() metodu her zaman try-finally kullanır."',
            en: 'Say in interview: "In the first version of my project we got OutOfMemoryError after 200 tests. VisualVM analysis revealed missing ThreadLocal.remove(). After the fix, 2000 tests ran without issues. That\'s why DriverFactory\'s quitDriver() method always uses try-finally."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Microservices mimarisinde E2E test stratejisi nasıl kurulur? Hangi araçlar kullanılır?', en: 'How do you build an E2E test strategy in a microservices architecture? What tools are used?' },
          a: {
            tr: 'Microservices mimarisinde geleneksel E2E testleri zorlaşır çünkü her servis bağımsız dağıtılır ve testler için tüm servislerin ayakta olması gerekir. Katmanlı strateji şöyledir: (1) Unit testler — her serviste bağımsız; (2) Contract testler (Pact) — servisler arası sözleşme garantisi; (3) Integration testler — WireMock ile bağımlı servisleri mock\'layarak tek servis test; (4) E2E testler — gerçek kullanıcı akışı, Testcontainers veya Docker Compose ile full stack. Bu strateji hem hız (contract testler saniyeler alır) hem güven (E2E gerçek akışı test eder) sağlar.',
            en: 'Traditional E2E tests become difficult in microservices because each service deploys independently and all services must be running for tests. Layered strategy: (1) Unit tests — independent per service; (2) Contract tests (Pact) — inter-service contract guarantee; (3) Integration tests — test single service with WireMock mocking dependent services; (4) E2E tests — real user flow, full stack with Testcontainers or Docker Compose. This strategy provides both speed (contract tests take seconds) and confidence (E2E tests real flows).',
          },
          code: {
            tr: `// Katmanlı test stratejisi

// 1. Contract Test — Pact (Consumer tarafı)
@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "user-service")
class OrderServiceConsumerTest {

    @Pact(consumer = "order-service")
    RequestResponsePact getUserPact(PactDslWithProvider builder) {
        return builder
            .given("user 123 exists")
            .uponReceiving("get user 123")
                .path("/users/123").method("GET")
            .willRespondWith()
                .status(200)
                .body(new PactDslJsonBody()
                    .integerType("id", 123)
                    .stringType("email", "user@test.com"))
            .toPact();
    }

    @Test
    @PactTestFor(pactMethod = "getUserPact")
    void orderServiceCanFetchUser(MockServer mockServer) {
        // order-service, user-service'i mock server üzerinden çağırır
        UserClient client = new UserClient(mockServer.getUrl());
        User user = client.getUser(123);
        assertEquals("user@test.com", user.getEmail());
    }
}

// 2. Integration Test — WireMock ile bağımlı servis mock
@WireMockTest
class OrderServiceIntegrationTest {

    @Test
    void createOrderWithValidUser(WireMockRuntimeInfo wmRuntimeInfo) {
        // Bağımlı user-service'i mock'la
        stubFor(get("/users/123")
            .willReturn(aResponse()
                .withStatus(200)
                .withBody("{\"id\":123,\"email\":\"user@test.com\"}")));

        // order-service'i gerçekten test et
        orderService.createOrder(123, "PRODUCT_001");
        verify(getRequestedFor(urlEqualTo("/users/123")));
    }
}

// 3. E2E — Testcontainers ile full stack
@Testcontainers
class CheckoutFlowE2ETest {

    @Container
    static DockerComposeContainer<?> compose =
        new DockerComposeContainer<>(new File("docker-compose.test.yml"))
            .withExposedService("frontend", 3000)
            .withExposedService("api-gateway", 8080);

    @Test
    void userCanCompleteCheckout() {
        String frontendUrl = "http://localhost:" +
            compose.getServicePort("frontend", 3000);
        // Selenium ile gerçek browser testi
    }
}`,
            en: `// Layered test strategy

// 1. Contract Test — Pact (Consumer side)
@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "user-service")
class OrderServiceConsumerTest {

    @Pact(consumer = "order-service")
    RequestResponsePact getUserPact(PactDslWithProvider builder) {
        return builder
            .given("user 123 exists")
            .uponReceiving("get user 123")
                .path("/users/123").method("GET")
            .willRespondWith()
                .status(200)
                .body(new PactDslJsonBody()
                    .integerType("id", 123)
                    .stringType("email", "user@test.com"))
            .toPact();
    }

    @Test
    @PactTestFor(pactMethod = "getUserPact")
    void orderServiceCanFetchUser(MockServer mockServer) {
        // order-service calls user-service through mock server
        UserClient client = new UserClient(mockServer.getUrl());
        User user = client.getUser(123);
        assertEquals("user@test.com", user.getEmail());
    }
}

// 2. Integration Test — mock dependent service with WireMock
@WireMockTest
class OrderServiceIntegrationTest {

    @Test
    void createOrderWithValidUser(WireMockRuntimeInfo wmRuntimeInfo) {
        // Mock the dependent user-service
        stubFor(get("/users/123")
            .willReturn(aResponse()
                .withStatus(200)
                .withBody("{\"id\":123,\"email\":\"user@test.com\"}")));

        // Actually test the order-service
        orderService.createOrder(123, "PRODUCT_001");
        verify(getRequestedFor(urlEqualTo("/users/123")));
    }
}

// 3. E2E — full stack with Testcontainers
@Testcontainers
class CheckoutFlowE2ETest {

    @Container
    static DockerComposeContainer<?> compose =
        new DockerComposeContainer<>(new File("docker-compose.test.yml"))
            .withExposedService("frontend", 3000)
            .withExposedService("api-gateway", 8080);

    @Test
    void userCanCompleteCheckout() {
        String frontendUrl = "http://localhost:" +
            compose.getServicePort("frontend", 3000);
        // Real browser test with Selenium
    }
}`,
          },
          analogy: {
            tr: 'Microservices test stratejisi, bir şehir elektrik sistemini test etmek gibidir. Her evin kendi sigorta testleri (unit), transformatörler arası bağlantı testleri (contract), mahalle bazlı yük testleri (integration) ve tüm şehir genelinde kriz senaryosu (E2E) ayrı ayrı test edilir.',
            en: 'A microservices test strategy is like testing a city\'s electrical system. Each house has its own fuse tests (unit), transformer connection tests (contract), neighborhood load tests (integration), and a city-wide crisis scenario (E2E) — each tested separately.',
          },
          keyPoints: [
            { tr: 'Contract test (Pact): servis değişikliği tüketiciyi bozar mı — saniyeler', en: 'Contract test (Pact): does service change break consumers — takes seconds' },
            { tr: 'WireMock: bağımlı servisi mock\'la, tek servisi izole test et', en: 'WireMock: mock dependent service, test single service in isolation' },
            { tr: 'Testcontainers: full stack Docker Compose ile gerçek E2E', en: 'Testcontainers: full stack Docker Compose for real E2E' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Microservices\'de E2E testleri son çaredir — yavaş ve kırılgan. Önce contract testlerle servislerin birbirleriyle konuşabildiğini garanti ediyorum. Sadece gerçek kullanıcı senaryolarını E2E\'ye taşıyorum."',
            en: 'Say in interview: "In microservices, E2E tests are the last resort — slow and brittle. First I guarantee services can talk to each other with contract tests. Only real user scenarios get promoted to E2E."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Java 21 Virtual Threads test otomasyonunu nasıl etkiler? Ne zaman kullanmalısın?', en: 'How do Java 21 Virtual Threads affect test automation? When should you use them?' },
          a: {
            tr: 'Java 21 Virtual Thread\'ler, OS thread\'lerine bağlı olmayan hafif thread\'lerdir ve binlerce eşzamanlı thread oluşturabilirsiniz. Test otomasyonunda en büyük fayda API testlerindedir: Executors.newVirtualThreadPerTaskExecutor() ile yüzlerce REST API çağrısı aynı anda yapılabilir. Selenium WebDriver testlerinde fayda sınırlıdır çünkü tarayıcı process\'ler Platform Thread\'leri tükettirmemektedir, asıl darboğaz browser kaynaklarıdır. JUnit5 5.11+ native virtual thread desteğine sahiptir. Platform thread pool ayarlaması gerekmez — JVM otomatik yönetir.',
            en: 'Java 21 Virtual Threads are lightweight threads not bound to OS threads, allowing thousands of concurrent threads. The biggest benefit in test automation is for API tests: hundreds of REST API calls can be made simultaneously with Executors.newVirtualThreadPerTaskExecutor(). Benefits are limited for Selenium WebDriver tests because browser processes are the bottleneck, not Platform Threads. JUnit5 5.11+ has native virtual thread support. No Platform thread pool tuning needed — JVM manages automatically.',
          },
          code: {
            tr: `// Virtual Thread ile paralel API testi
// Java 21 — pom.xml: <java.version>21</java.version>

// 1. Virtual Thread Executor ile yüksek concurrency API testi
List<String> userIds = List.of("u1","u2","u3","u4","u5", /* ... 1000 */);

try (ExecutorService vte = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<ApiResponse>> futures = userIds.stream()
        .map(id -> vte.submit(() -> {
            // Her çağrı ayrı virtual thread'de — OS thread'i bloklamaz
            return given().get("/users/" + id).as(ApiResponse.class);
        }))
        .collect(Collectors.toList());

    List<ApiResponse> results = futures.stream()
        .map(f -> {
            try { return f.get(30, TimeUnit.SECONDS); }
            catch (Exception e) { throw new RuntimeException(e); }
        })
        .collect(Collectors.toList());

    assertEquals(userIds.size(), results.stream()
        .filter(r -> r.statusCode() == 200).count());
}

// 2. JUnit5 5.11+ ile virtual thread
@Test
@Execution(ExecutionMode.CONCURRENT) // JUnit5 5.11+ virtual thread desteği
void concurrentApiTest() {
    // Virtual thread üzerinde çalışır
    given().get("/health").then().statusCode(200);
}

// 3. Selenium'da virtual thread (sınırlı fayda)
// Darboğaz: browser process (platform thread değil)
// → Selenium Grid veya BrowserStack daha etkili`,
            en: `// Parallel API testing with Virtual Threads
// Java 21 — pom.xml: <java.version>21</java.version>

// 1. High concurrency API testing with Virtual Thread Executor
List<String> userIds = List.of("u1","u2","u3","u4","u5", /* ... 1000 */);

try (ExecutorService vte = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<ApiResponse>> futures = userIds.stream()
        .map(id -> vte.submit(() -> {
            // Each call in separate virtual thread — doesn't block OS thread
            return given().get("/users/" + id).as(ApiResponse.class);
        }))
        .collect(Collectors.toList());

    List<ApiResponse> results = futures.stream()
        .map(f -> {
            try { return f.get(30, TimeUnit.SECONDS); }
            catch (Exception e) { throw new RuntimeException(e); }
        })
        .collect(Collectors.toList());

    assertEquals(userIds.size(), results.stream()
        .filter(r -> r.statusCode() == 200).count());
}

// 2. Virtual thread with JUnit5 5.11+
@Test
@Execution(ExecutionMode.CONCURRENT) // JUnit5 5.11+ virtual thread support
void concurrentApiTest() {
    // Runs on virtual thread
    given().get("/health").then().statusCode(200);
}

// 3. Virtual threads in Selenium (limited benefit)
// Bottleneck: browser process (not platform thread)
// → Selenium Grid or BrowserStack is more effective`,
          },
          analogy: {
            tr: 'Virtual Thread, bir call center\'daki müşteri temsilcilerini temsil eder. Geleneksel thread\'ler tam zamanlı çalışan; virtual thread\'ler ise gerçek insan olmadan, ses dosyası oynatan bot gibidir — binlercesi aynı anda çalışabilir ama asıl darboğaz hat sayısıdır (browser/OS).',
            en: 'Virtual Threads represent call center agents. Traditional threads are full-time employees; virtual threads are bots playing voice files — thousands can run simultaneously, but the real bottleneck is the line count (browser/OS).',
          },
          keyPoints: [
            { tr: 'API testleri: virtual thread ile yüzlerce paralel istek — ideal', en: 'API tests: hundreds of parallel requests with virtual thread — ideal' },
            { tr: 'Selenium E2E: darboğaz browser, virtual thread katkısı sınırlı', en: 'Selenium E2E: bottleneck is browser, virtual thread benefit is limited' },
            { tr: 'JVM otomatik yönetir — Platform thread pool ayarı gerekmez', en: 'JVM manages automatically — no Platform thread pool tuning needed' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Virtual Thread\'leri REST Assured API testlerinde kullandım. 500 paralel API çağrısı geleneksel thread pool\'da 45 saniye sürerken Virtual Thread ile 4 saniyeye düştü. Selenium testlerinde ise fayda görmedim — asıl darboğaz tarayıcı process\'leriydi."',
            en: 'Say in interview: "I used Virtual Threads in REST Assured API tests. 500 parallel API calls that took 45 seconds with a traditional thread pool dropped to 4 seconds with Virtual Threads. I didn\'t see benefit in Selenium tests — the real bottleneck was browser processes."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'SOLID prensipleri test projesinde nasıl uygulanır? Her prensip için somut örnek ver.', en: 'How are SOLID principles applied in a test project? Give a concrete example for each principle.' },
          a: {
            tr: 'SOLID prensipleri test kodunu bakımı kolay, genişletilebilir ve güvenilir yapar. SRP (Tek Sorumluluk): LoginPage sadece UI etkileşimi, Reporter sadece raporlama — her sınıf tek iş. OCP (Açık/Kapalı): yeni tarayıcı eklemek mevcut kodu değiştirmez, yeni sınıf ekler. LSP (Liskov): BasePage\'den kalıtım alan her Page Object, BasePage yerine kullanılabilir. ISP (Interface Ayrıştırma): küçük özelleşmiş interface\'ler — Clickable, Typeable ayrı. DIP (Dependency Inversion): test sınıfı somut driver yerine interface üzerinden çalışır. Constructor injection bunların hepsini bir arada uygular.',
            en: 'SOLID principles make test code maintainable, extensible, and reliable. SRP (Single Responsibility): LoginPage only handles UI interaction, Reporter only reporting — each class does one thing. OCP (Open/Closed): adding a new browser doesn\'t modify existing code, adds a new class. LSP (Liskov): every Page Object inheriting from BasePage can be used in place of BasePage. ISP (Interface Segregation): small specialized interfaces — Clickable, Typeable separate. DIP (Dependency Inversion): test class works through an interface rather than a concrete driver. Constructor injection applies all of them together.',
          },
          code: {
            tr: `// S — Single Responsibility
// ❌ LoginPage hem UI etkileşimi hem DB doğrulama yapıyor
// ✅ LoginPage: sadece UI — DB kontrolü ayrı servis

// O — Open/Closed: değiştirme yok, genişletme var
interface BrowserFactory { WebDriver create(); }
class ChromeFactory implements BrowserFactory {
    public WebDriver create() {
        WebDriverManager.chromedriver().setup(); return new ChromeDriver();
    }
}
class FirefoxFactory implements BrowserFactory {
    public WebDriver create() {
        WebDriverManager.firefoxdriver().setup(); return new FirefoxDriver();
    }
}
// Yeni browser = yeni class, mevcut kod değişmez ✅

// L — Liskov Substitution
public abstract class BasePage { abstract boolean isLoaded(); }
public class LoginPage extends BasePage {
    public boolean isLoaded() { return isVisible(By.id("email")); }
}
// LoginPage her yerde BasePage yerine kullanılabilir ✅

// I — Interface Segregation
interface Clickable  { void click(By locator); }
interface Typeable   { void type(By locator, String text); }
interface Verifiable { boolean isVisible(By locator); }

// Sadece ihtiyacı olan interface'i implement et
class ReadOnlyPage implements Verifiable { /* click yok! */ }
class InteractivePage implements Clickable, Typeable, Verifiable { }

// D — Dependency Inversion
// Test sınıfı somut sınıfa bağımlı değil, interface'e bağımlı
class OrderTest {
    private final PaymentService payment; // interface

    OrderTest(PaymentService payment) { // constructor injection
        this.payment = payment;
    }

    @Test void completeOrder() {
        payment.charge(100.0); // gerçek veya mock, test bilmez
    }
}`,
            en: `// S — Single Responsibility
// ❌ LoginPage handles both UI interaction AND DB validation
// ✅ LoginPage: UI only — DB check is a separate service

// O — Open/Closed: extend, don't modify
interface BrowserFactory { WebDriver create(); }
class ChromeFactory implements BrowserFactory {
    public WebDriver create() {
        WebDriverManager.chromedriver().setup(); return new ChromeDriver();
    }
}
class FirefoxFactory implements BrowserFactory {
    public WebDriver create() {
        WebDriverManager.firefoxdriver().setup(); return new FirefoxDriver();
    }
}
// New browser = new class, existing code unchanged ✅

// L — Liskov Substitution
public abstract class BasePage { abstract boolean isLoaded(); }
public class LoginPage extends BasePage {
    public boolean isLoaded() { return isVisible(By.id("email")); }
}
// LoginPage can be used anywhere BasePage is expected ✅

// I — Interface Segregation
interface Clickable  { void click(By locator); }
interface Typeable   { void type(By locator, String text); }
interface Verifiable { boolean isVisible(By locator); }

// Implement only the interface you need
class ReadOnlyPage implements Verifiable { /* no click! */ }
class InteractivePage implements Clickable, Typeable, Verifiable { }

// D — Dependency Inversion
// Test class depends on interface, not concrete class
class OrderTest {
    private final PaymentService payment; // interface

    OrderTest(PaymentService payment) { // constructor injection
        this.payment = payment;
    }

    @Test void completeOrder() {
        payment.charge(100.0); // real or mock, test doesn't know
    }
}`,
          },
          analogy: {
            tr: 'SOLID, iyi bir alet çantasının tasarım ilkeleridir. Her alet tek iş yapar (SRP), yeni alet eklemek mevcut aletleri değiştirmez (OCP), tornavida yerine tornavida kullanılabilir (LSP), küçük tutacaklı aletler özelleşmiş (ISP), ve her alet standart tutacağa uymak zorunda (DIP).',
            en: 'SOLID is the design principles of a good toolbox. Each tool does one job (SRP), adding a new tool doesn\'t change existing ones (OCP), any screwdriver can replace another (LSP), small specialized handles (ISP), and each tool must fit the standard holder (DIP).',
          },
          keyPoints: [
            { tr: 'SRP: sınıf değişme nedeni 1 tane — UI değişti, reporter değişmedi', en: 'SRP: class has 1 reason to change — UI changed, reporter unchanged' },
            { tr: 'OCP: yeni browser = yeni class, switch-case değil', en: 'OCP: new browser = new class, not switch-case' },
            { tr: 'DIP: constructor injection — test, implementasyona değil sözleşmeye bağlı', en: 'DIP: constructor injection — test depends on contract, not implementation' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Test projemdeki en önemli SOLID prensibi DIP. Tüm Page Object\'lerim constructor injection ile driver alıyor. Bu sayede test sınıfı, ChromeDriver mı RemoteWebDriver mı kullandığını bilmiyor — DriverFactory hallediyor."',
            en: 'Say in interview: "The most important SOLID principle in my test project is DIP. All my Page Objects receive the driver via constructor injection. This way test classes don\'t know if ChromeDriver or RemoteWebDriver is used — DriverFactory handles it."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Testcontainers ile veritabanı integration testi nasıl yapılır? Neden production-benzeri ortam önemlidir?', en: 'How do you run database integration tests with Testcontainers? Why is a production-like environment important?' },
          a: {
            tr: 'Geleneksel yaklaşımda integration testleri paylaşılan bir test veritabanına bağlanır — bu testlerin birbirini bozmasına ve CI\'da güvenilmez sonuçlara yol açar. H2 gibi in-memory veritabanları ise gerçek PostgreSQL davranışını tam yansıtmaz. Testcontainers, her test çalışmasında gerçek bir PostgreSQL (veya MySQL, Redis, Kafka) container\'ı başlatır ve test bitince yok eder. Bu tam izolasyon ve production-benzeri ortam sağlar. @Container annotation\'ı JUnit lifecycle ile entegre olur — container test sınıfı yaşarken ayakta, biter bitmez kapatılır. Flyway veya Liquibase ile schema migration da test kapsamına alınır.',
            en: 'In the traditional approach, integration tests connect to a shared test database — tests corrupt each other and CI results become unreliable. In-memory databases like H2 don\'t fully replicate real PostgreSQL behavior. Testcontainers starts a real PostgreSQL (or MySQL, Redis, Kafka) container for each test run and destroys it when done. This provides full isolation and a production-like environment. The @Container annotation integrates with JUnit lifecycle — container stays up while the test class runs, shut down when done. Schema migration with Flyway or Liquibase is also included in test coverage.',
          },
          code: {
            tr: `// pom.xml
/*
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>1.19.6</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <version>1.19.6</version>
    <scope>test</scope>
</dependency>
*/

@Testcontainers  // JUnit5 extension aktif
class UserRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
            // Her test sınıfı için taze container!

    private UserRepository userRepo;

    @BeforeAll
    static void applySchema() {
        // Flyway ile migration uygula — production ile aynı schema
        Flyway.configure()
            .dataSource(postgres.getJdbcUrl(),
                        postgres.getUsername(),
                        postgres.getPassword())
            .load()
            .migrate();
    }

    @BeforeEach
    void setup() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(postgres.getJdbcUrl());
        ds.setUsername(postgres.getUsername());
        ds.setPassword(postgres.getPassword());
        userRepo = new UserRepository(ds);
    }

    @Test
    void savedUserCanBeRetrieved() {
        User user = new User("ali@test.com", "Ali Yılmaz");
        long id = userRepo.save(user);

        Optional<User> found = userRepo.findById(id);
        assertTrue(found.isPresent());
        assertEquals("ali@test.com", found.get().getEmail());
    }

    @Test
    void duplicateEmailThrowsException() {
        userRepo.save(new User("dup@test.com", "User1"));
        assertThrows(DataIntegrityViolationException.class, () ->
            userRepo.save(new User("dup@test.com", "User2")) // UNIQUE constraint
        );
    }
}`,
            en: `// pom.xml
/*
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>1.19.6</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <version>1.19.6</version>
    <scope>test</scope>
</dependency>
*/

@Testcontainers  // JUnit5 extension active
class UserRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
            // Fresh container for each test class!

    private UserRepository userRepo;

    @BeforeAll
    static void applySchema() {
        // Apply migration with Flyway — same schema as production
        Flyway.configure()
            .dataSource(postgres.getJdbcUrl(),
                        postgres.getUsername(),
                        postgres.getPassword())
            .load()
            .migrate();
    }

    @BeforeEach
    void setup() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(postgres.getJdbcUrl());
        ds.setUsername(postgres.getUsername());
        ds.setPassword(postgres.getPassword());
        userRepo = new UserRepository(ds);
    }

    @Test
    void savedUserCanBeRetrieved() {
        User user = new User("alice@test.com", "Alice Smith");
        long id = userRepo.save(user);

        Optional<User> found = userRepo.findById(id);
        assertTrue(found.isPresent());
        assertEquals("alice@test.com", found.get().getEmail());
    }

    @Test
    void duplicateEmailThrowsException() {
        userRepo.save(new User("dup@test.com", "User1"));
        assertThrows(DataIntegrityViolationException.class, () ->
            userRepo.save(new User("dup@test.com", "User2")) // UNIQUE constraint
        );
    }
}`,
          },
          analogy: {
            tr: 'Testcontainers, her test için tek kullanımlık steril bir laboratuvar açmak gibidir. H2 gerçek olmayan plastik model, paylaşılan test DB kirlenmiş ortamdır. Testcontainers gerçek malzemeyle steril ortam sunar.',
            en: 'Testcontainers is like opening a sterile single-use laboratory for each test. H2 is a fake plastic model, a shared test DB is a contaminated environment. Testcontainers provides a real material with a sterile environment.',
          },
          keyPoints: [
            { tr: 'Gerçek PostgreSQL container: H2\'nin desteklemediği özellikler test edilir', en: 'Real PostgreSQL container: tests features H2 doesn\'t support' },
            { tr: '@Container static: sınıf başına 1 container — testler paylaşır', en: '@Container static: 1 container per class — tests share it' },
            { tr: 'Flyway entegrasyonu: migration\'lar da test kapsamında', en: 'Flyway integration: migrations also under test coverage' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "H2 ile çalışan testlerimiz production\'da başarısız oluyordu çünkü PostgreSQL\'e özgü JSON operatörleri H2\'de desteklenmiyordu. Testcontainers\'a geçince bu tür uyumsuzlukları CI\'da yakalamaya başladık."',
            en: 'Say in interview: "Tests that passed with H2 were failing in production because PostgreSQL-specific JSON operators aren\'t supported in H2. After switching to Testcontainers we started catching these incompatibilities in CI."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Generics ile type-safe test utility sınıfları nasıl tasarlanır?', en: 'How do you design type-safe test utility classes with generics?' },
          a: {
            tr: 'Generics, aynı mantığı farklı tipler için tekrar yazmak zorunda kalmadan yeniden kullanılabilir utility\'ler oluşturmanıza olanak tanır. Test projelerinde üç yaygın kullanım alanı vardır: (1) API response wrapper\'ı — ApiResponse<T> ile tip güvenli JSON parse; (2) Test data builder — TestDataBuilder<T> ile fluent API ile nesne oluşturma; (3) Excel/DB reader — DataTableReader<T extends TestData> ile tip güvenli veri okuma. Bounded wildcard (<T extends SomeClass>) ile tip kısıtlaması yapılır. Bu yaklaşım kod tekrarını azaltır ve compile-time type safety sağlar.',
            en: 'Generics let you create reusable utilities without rewriting the same logic for different types. Three common uses in test projects: (1) API response wrapper — type-safe JSON parsing with ApiResponse<T>; (2) Test data builder — object creation with fluent API using TestDataBuilder<T>; (3) Excel/DB reader — type-safe data reading with DataTableReader<T extends TestData>. Type constraints with bounded wildcards (<T extends SomeClass>). This approach reduces code repetition and provides compile-time type safety.',
          },
          code: {
            tr: `// 1. Generic API Response Wrapper
public class ApiResponse<T> {
    private final int    statusCode;
    private final T      body;
    private final String rawJson;

    // Private constructor — static factory method
    private ApiResponse(int statusCode, T body, String rawJson) {
        this.statusCode = statusCode;
        this.body       = body;
        this.rawJson    = rawJson;
    }

    public static <T> ApiResponse<T> of(Response response, Class<T> clazz) {
        T parsed = response.as(clazz);
        return new ApiResponse<>(response.getStatusCode(), parsed,
            response.getBody().asString());
    }

    public T getBody()       { return body; }
    public int getStatus()   { return statusCode; }
    public boolean isOk()    { return statusCode >= 200 && statusCode < 300; }
}

// Kullanım — tip güvenli
ApiResponse<User> response = ApiResponse.of(
    given().get("/users/1"), User.class
);
assertTrue(response.isOk());
assertEquals("user@test.com", response.getBody().getEmail());

// 2. Generic Test Data Builder — fluent API
public class TestDataBuilder<T> {
    private final T instance;

    public TestDataBuilder(Supplier<T> supplier) {
        this.instance = supplier.get();
    }

    public TestDataBuilder<T> with(Consumer<T> modifier) {
        modifier.accept(instance);
        return this; // fluent — zincirleme
    }

    public T build() { return instance; }
}

// Kullanım
User user = new TestDataBuilder<>(User::new)
    .with(u -> u.setEmail(faker.internet().emailAddress()))
    .with(u -> u.setName(faker.name().fullName()))
    .with(u -> u.setRole("QA_ENGINEER"))
    .build();`,
            en: `// 1. Generic API Response Wrapper
public class ApiResponse<T> {
    private final int    statusCode;
    private final T      body;
    private final String rawJson;

    // Private constructor — static factory method
    private ApiResponse(int statusCode, T body, String rawJson) {
        this.statusCode = statusCode;
        this.body       = body;
        this.rawJson    = rawJson;
    }

    public static <T> ApiResponse<T> of(Response response, Class<T> clazz) {
        T parsed = response.as(clazz);
        return new ApiResponse<>(response.getStatusCode(), parsed,
            response.getBody().asString());
    }

    public T getBody()       { return body; }
    public int getStatus()   { return statusCode; }
    public boolean isOk()    { return statusCode >= 200 && statusCode < 300; }
}

// Usage — type safe
ApiResponse<User> response = ApiResponse.of(
    given().get("/users/1"), User.class
);
assertTrue(response.isOk());
assertEquals("user@test.com", response.getBody().getEmail());

// 2. Generic Test Data Builder — fluent API
public class TestDataBuilder<T> {
    private final T instance;

    public TestDataBuilder(Supplier<T> supplier) {
        this.instance = supplier.get();
    }

    public TestDataBuilder<T> with(Consumer<T> modifier) {
        modifier.accept(instance);
        return this; // fluent — chaining
    }

    public T build() { return instance; }
}

// Usage
User user = new TestDataBuilder<>(User::new)
    .with(u -> u.setEmail(faker.internet().emailAddress()))
    .with(u -> u.setName(faker.name().fullName()))
    .with(u -> u.setRole("QA_ENGINEER"))
    .build();`,
          },
          analogy: {
            tr: 'Generics, LEGO\'nun standart delik sistemi gibidir. Her parça (tip) farklı şekil ve renkte olabilir ama aynı bağlantı mekanizmasını (Generic API) kullanır. Farklı LEGO setleri için aynı el aletini kullanırsın.',
            en: 'Generics are like LEGO\'s standard hole system. Each piece (type) can be different shapes and colors but uses the same connection mechanism (Generic API). You use the same hand tool for different LEGO sets.',
          },
          keyPoints: [
            { tr: 'ApiResponse<T>: aynı wrapper, farklı response tipleri', en: 'ApiResponse<T>: same wrapper, different response types' },
            { tr: 'TestDataBuilder<T>: fluent API ile herhangi bir nesne oluştur', en: 'TestDataBuilder<T>: build any object with fluent API' },
            { tr: 'Bounded wildcard <T extends X>: sadece doğru tipleri kabul et', en: 'Bounded wildcard <T extends X>: accept only correct types' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Generic ApiResponse wrapper\'ım sayesinde User, Product, Order response\'larının hepsini aynı utility ile parse ediyorum. Tip güvenliği compile-time\'da — runtime ClassCastException yok."',
            en: 'Say in interview: "With my generic ApiResponse wrapper I parse User, Product, and Order responses all with the same utility. Type safety is at compile-time — no runtime ClassCastException."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Appium ile Android ve iOS için ortak Page Object nasıl tasarlanır?', en: 'How do you design a shared Page Object for both Android and iOS with Appium?' },
          a: {
            tr: 'Android ve iOS\'un UI bileşenleri ve locator stratejileri farklıdır — @AndroidFindBy XPath/resource-id kullanırken @iOSXCUITFindBy erişilebilirlik ID\'si kullanır. Ortak Page Object için Appium\'un PageFactory\'si kullanılır: aynı field\'a hem @AndroidFindBy hem @iOSXCUITFindBy annotation\'ı eklenir, PageFactory.initElements() platform\'a göre doğru locator\'ı seçer. DriverFactory platform kontrolü yaparak doğru driver\'ı döndürür. Ortak aksiyonlar (tap, type, swipe) BaseMobilePage\'de tutulur, platform-specific davranışlar override edilir.',
            en: 'Android and iOS have different UI components and locator strategies — @AndroidFindBy uses XPath/resource-id while @iOSXCUITFindBy uses accessibility IDs. For shared Page Objects, use Appium\'s PageFactory: add both @AndroidFindBy and @iOSXCUITFindBy annotations to the same field, PageFactory.initElements() selects the correct locator based on platform. DriverFactory returns the correct driver with platform checking. Common actions (tap, type, swipe) are kept in BaseMobilePage, platform-specific behaviors are overridden.',
          },
          code: {
            tr: `// Ortak mobil Page Object
public class LoginMobilePage extends BaseMobilePage {

    // Aynı field — her iki platform annotation
    @AndroidFindBy(id = "com.myapp:id/emailInput")
    @iOSXCUITFindBy(accessibility = "emailField")
    private MobileElement emailField;

    @AndroidFindBy(id = "com.myapp:id/passwordInput")
    @iOSXCUITFindBy(accessibility = "passwordField")
    private MobileElement passwordField;

    @AndroidFindBy(id = "com.myapp:id/loginButton")
    @iOSXCUITFindBy(accessibility = "loginButton")
    private MobileElement loginButton;

    public LoginMobilePage(AppiumDriver driver) {
        super(driver);
        // Platform'a göre doğru locator seçilir
        PageFactory.initElements(new AppiumFieldDecorator(driver), this);
    }

    public void login(String email, String password) {
        emailField.clear();
        emailField.sendKeys(email);
        passwordField.sendKeys(password);
        loginButton.click();
    }
}

// BaseMobilePage — platform-agnostic utility
public abstract class BaseMobilePage {
    protected final AppiumDriver driver;
    protected final WebDriverWait wait;

    protected BaseMobilePage(AppiumDriver driver) {
        this.driver = Objects.requireNonNull(driver);
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    protected void swipeUp() {
        // Platform kontrolü gerekirse:
        if (driver instanceof AndroidDriver) {
            // Android swipe
        } else {
            // iOS swipe
        }
    }
}

// DriverFactory — platform kararı
public static AppiumDriver createDriver(Platform platform) {
    return switch (platform) {
        case ANDROID -> new AndroidDriver(appiumUrl, androidCaps());
        case IOS     -> new IOSDriver(appiumUrl, iosCaps());
    };
}`,
            en: `// Shared mobile Page Object
public class LoginMobilePage extends BaseMobilePage {

    // Same field — both platform annotations
    @AndroidFindBy(id = "com.myapp:id/emailInput")
    @iOSXCUITFindBy(accessibility = "emailField")
    private MobileElement emailField;

    @AndroidFindBy(id = "com.myapp:id/passwordInput")
    @iOSXCUITFindBy(accessibility = "passwordField")
    private MobileElement passwordField;

    @AndroidFindBy(id = "com.myapp:id/loginButton")
    @iOSXCUITFindBy(accessibility = "loginButton")
    private MobileElement loginButton;

    public LoginMobilePage(AppiumDriver driver) {
        super(driver);
        // Correct locator selected based on platform
        PageFactory.initElements(new AppiumFieldDecorator(driver), this);
    }

    public void login(String email, String password) {
        emailField.clear();
        emailField.sendKeys(email);
        passwordField.sendKeys(password);
        loginButton.click();
    }
}

// BaseMobilePage — platform-agnostic utility
public abstract class BaseMobilePage {
    protected final AppiumDriver driver;
    protected final WebDriverWait wait;

    protected BaseMobilePage(AppiumDriver driver) {
        this.driver = Objects.requireNonNull(driver);
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    protected void swipeUp() {
        // Platform check if needed:
        if (driver instanceof AndroidDriver) {
            // Android swipe
        } else {
            // iOS swipe
        }
    }
}

// DriverFactory — platform decision
public static AppiumDriver createDriver(Platform platform) {
    return switch (platform) {
        case ANDROID -> new AndroidDriver(appiumUrl, androidCaps());
        case IOS     -> new IOSDriver(appiumUrl, iosCaps());
    };
}`,
          },
          analogy: {
            tr: 'Ortak Appium Page Object, iki dilde de geçerli olan uluslararası bir form gibidir. Formun yapısı aynı (alanlar), ama dil işaretleme sistemi farklı (annotation). Okuyan kişi (PageFactory) hangi dili bildiğine göre doğru alanı okur.',
            en: 'A shared Appium Page Object is like an international form valid in two languages. The form structure is the same (fields) but the language marking system differs (annotation). The reader (PageFactory) reads the correct field based on what language it knows.',
          },
          keyPoints: [
            { tr: '@AndroidFindBy + @iOSXCUITFindBy: aynı field, platform seçer', en: '@AndroidFindBy + @iOSXCUITFindBy: same field, platform selects' },
            { tr: 'PageFactory.initElements(AppiumFieldDecorator): kritik — element\'leri platforma bağlar', en: 'PageFactory.initElements(AppiumFieldDecorator): critical — binds elements to platform' },
            { tr: 'DriverFactory platform kontrolü ile Android/iOS driver döndürür', en: 'DriverFactory returns Android/iOS driver based on platform check' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Android ve iOS için iki ayrı Page Object yazmak yerine ortak Page Object tasarladım. @AndroidFindBy ve @iOSXCUITFindBy aynı field\'da — PageFactory doğru locator\'ı seçiyor. Bakım yükü yarıya indi."',
            en: 'Say in interview: "Instead of writing two separate Page Objects for Android and iOS, I designed a shared one. @AndroidFindBy and @iOSXCUITFindBy on the same field — PageFactory picks the right locator. Maintenance burden halved."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Pact contract testing nedir ve Java projesinde nasıl uygulanır?', en: 'What is Pact contract testing and how is it implemented in a Java project?' },
          a: {
            tr: 'Contract testing, servisler arası sözleşmelerin (API kontratları) her iki tarafça doğrulandığını garanti eden bir test yaklaşımıdır. Pact Framework\'ü bu için kullanılır: Consumer (istemci servis) beklediği yanıt formatını tanımlayan bir Pact dosyası üretir ve bu dosya Pact Broker\'a yüklenir. Provider (sağlayıcı servis) Pact Broker\'dan bu dosyayı indirip gerçek servisiyle doğrular. Böylece provider\'daki bir değişiklik consumer\'ı bozacaksa "can I deploy" kontrolü ile CI\'da dağıtım engellenir. E2E testlerin yüzde seksenini karşılar, sadece saniyeler alır.',
            en: 'Contract testing is a test approach that guarantees the contracts (API contracts) between services are verified by both sides. The Pact Framework is used: Consumer (client service) produces a Pact file defining the expected response format and uploads it to the Pact Broker. Provider (provider service) downloads this file from the Pact Broker and verifies it against the real service. This way, if a provider change would break a consumer, the "can I deploy" check in CI blocks the deployment. Covers 80% of E2E test needs, takes only seconds.',
          },
          code: {
            tr: `// Consumer Tarafı (order-service, user-service'i çağırıyor)
@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "user-service", port = "8080")
class OrderServicePactConsumerTest {

    @Pact(consumer = "order-service")
    RequestResponsePact getUserByIdPact(PactDslWithProvider builder) {
        return builder
            .given("user with id 123 exists")
            .uponReceiving("GET user by id")
                .method("GET")
                .path("/users/123")
                .headers("Accept", "application/json")
            .willRespondWith()
                .status(200)
                .headers(Map.of("Content-Type", "application/json"))
                .body(new PactDslJsonBody()
                    .integerType("id",    123)
                    .stringType("email",  "user@test.com")
                    .stringType("name",   "Ali Yılmaz")
                    .booleanType("active", true))
            .toPact();
    }

    @Test
    @PactTestFor(pactMethod = "getUserByIdPact")
    void orderServiceFetchesUserSuccessfully(MockServer mockServer) {
        UserClient client = new UserClient(mockServer.getUrl());
        User user = client.getUser(123);

        assertNotNull(user);
        assertEquals("user@test.com", user.getEmail());
        // Pact dosyası üretildi: target/pacts/order-service-user-service.json
    }
}

// Provider Tarafı (user-service, pact'ı doğruluyor)
@Provider("user-service")
@PactBroker(url = "http://pact-broker:9292")
class UserServicePactProviderTest {

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void verifyPacts(PactVerificationContext ctx) {
        ctx.verifyInteraction(); // gerçek servisi test eder
    }

    @State("user with id 123 exists")
    void setupUser123() {
        // Test datası hazırla
        userRepository.save(new User(123, "user@test.com", "Ali Yılmaz"));
    }
}`,
            en: `// Consumer Side (order-service calling user-service)
@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "user-service", port = "8080")
class OrderServicePactConsumerTest {

    @Pact(consumer = "order-service")
    RequestResponsePact getUserByIdPact(PactDslWithProvider builder) {
        return builder
            .given("user with id 123 exists")
            .uponReceiving("GET user by id")
                .method("GET")
                .path("/users/123")
                .headers("Accept", "application/json")
            .willRespondWith()
                .status(200)
                .headers(Map.of("Content-Type", "application/json"))
                .body(new PactDslJsonBody()
                    .integerType("id",    123)
                    .stringType("email",  "user@test.com")
                    .stringType("name",   "John Smith")
                    .booleanType("active", true))
            .toPact();
    }

    @Test
    @PactTestFor(pactMethod = "getUserByIdPact")
    void orderServiceFetchesUserSuccessfully(MockServer mockServer) {
        UserClient client = new UserClient(mockServer.getUrl());
        User user = client.getUser(123);

        assertNotNull(user);
        assertEquals("user@test.com", user.getEmail());
        // Pact file generated: target/pacts/order-service-user-service.json
    }
}

// Provider Side (user-service verifying the pact)
@Provider("user-service")
@PactBroker(url = "http://pact-broker:9292")
class UserServicePactProviderTest {

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void verifyPacts(PactVerificationContext ctx) {
        ctx.verifyInteraction(); // tests the real service
    }

    @State("user with id 123 exists")
    void setupUser123() {
        // Prepare test data
        userRepository.save(new User(123, "user@test.com", "John Smith"));
    }
}`,
          },
          analogy: {
            tr: 'Pact contract testing, iki ülke arasındaki ticaret anlaşması gibidir. İthalatçı (consumer) ne istediğini belgeler, ihracatçı (provider) o belgeye göre doğrulama yapar. Bir ülke kuralları değiştirirse diğeri CI\'da anında haberdar olur.',
            en: 'Pact contract testing is like a trade agreement between two countries. The importer (consumer) documents what it wants, the exporter (provider) verifies against that document. If one country changes the rules, the other is immediately notified in CI.',
          },
          keyPoints: [
            { tr: 'Consumer: Pact dosyası üretir, Provider: Pact Broker\'dan doğrular', en: 'Consumer: generates Pact file, Provider: verifies from Pact Broker' },
            { tr: '"can I deploy": provider değişikliği consumer\'ı bozarsa CI durur', en: '"can I deploy": CI stops if provider change would break consumer' },
            { tr: 'E2E\'nin %80\'ini saniyeler içinde karşılar', en: 'Covers 80% of E2E needs in seconds' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Microservices projemizde Pact\'ı 15 consumer-provider çifti için uyguladık. Her deploy öncesi "can I deploy" komutu çalışıyor — provider değişikliği consumer\'ı bozacaksa pipeline durduruyor. Bu kontrol sayesinde production\'da sıfır API uyumsuzluk yaşıyoruz."',
            en: 'Say in interview: "We implemented Pact for 15 consumer-provider pairs in our microservices project. "can I deploy" runs before every deploy — if a provider change would break a consumer, the pipeline stops. Zero API incompatibilities in production thanks to this check."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Maven\'da dependency (bağımlılık) çakışması nasıl tespit edilir ve çözülür?', en: 'How do you detect and resolve dependency conflicts in Maven?' },
          a: {
            tr: 'Maven\'da farklı bağımlılıklar aynı kütüphanenin farklı versiyonlarını gerektirebilir — bu sınıf yükleme hataları (NoSuchMethodError, ClassNotFoundException) oluşturabilir. Tespit için mvn dependency:tree komutu kullanılır ve çakışan versiyonlar belirlenir. Çözüm stratejileri: (1) pom.xml\'de explicit versiyon tanımlama; (2) <dependencyManagement> bölümü ile proje genelinde versiyon kontrolü; (3) sorunlu transitive bağımlılığı <exclusion> ile çıkarma; (4) BOM (Bill of Materials) import etme — selenium-java-bom tüm Selenium bileşenlerinin uyumlu versiyonlarını bir arada yönetir.',
            en: 'Different dependencies in Maven can require different versions of the same library — this can cause class loading errors (NoSuchMethodError, ClassNotFoundException). Use mvn dependency:tree to detect conflicting versions. Resolution strategies: (1) defining explicit version in pom.xml; (2) <dependencyManagement> for project-wide version control; (3) removing problematic transitive dependency with <exclusion>; (4) importing a BOM (Bill of Materials) — selenium-java-bom manages compatible versions of all Selenium components together.',
          },
          code: {
            tr: `# 1. Çakışma tespiti
mvn dependency:tree -Dverbose | grep -i "conflict\|omitted"
# "omitted for conflict with X.Y.Z" — çakışan bağımlılık

# 2. Analiz: hangi bağımlılık hangi versiyonu getiriyor?
mvn dependency:tree -Dincludes=org.slf4j

# pom.xml — çözüm stratejileri

# Strateji 1: Explicit versiyon (en basit)
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.17.0</version>  <!-- Explicit — çakışma kazanır -->
</dependency>

# Strateji 2: dependencyManagement — merkezi versiyon yönetimi
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>2.0.12</version>  <!-- TÜM bağımlılıklar bu versiyonu kullanır -->
        </dependency>
    </dependencies>
</dependencyManagement>

# Strateji 3: Exclusion — sorunlu transitive bağımlılık çıkar
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>

# Strateji 4: BOM import (önerilen)
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-bom</artifactId>
            <version>4.20.0</version>
            <type>pom</type>
            <scope>import</scope>  <!-- tüm Selenium bileşenleri uyumlu -->
        </dependency>
    </dependencies>
</dependencyManagement>`,
            en: `# 1. Detect conflicts
mvn dependency:tree -Dverbose | grep -i "conflict\|omitted"
# "omitted for conflict with X.Y.Z" — conflicting dependency

# 2. Analyze: which dependency brings which version?
mvn dependency:tree -Dincludes=org.slf4j

# pom.xml — resolution strategies

# Strategy 1: Explicit version (simplest)
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.17.0</version>  <!-- Explicit — wins the conflict -->
</dependency>

# Strategy 2: dependencyManagement — central version management
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>2.0.12</version>  <!-- ALL dependencies use this version -->
        </dependency>
    </dependencies>
</dependencyManagement>

# Strategy 3: Exclusion — remove problematic transitive dependency
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>

# Strategy 4: BOM import (recommended)
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-bom</artifactId>
            <version>4.20.0</version>
            <type>pom</type>
            <scope>import</scope>  <!-- all Selenium components compatible -->
        </dependency>
    </dependencies>
</dependencyManagement>`,
          },
          analogy: {
            tr: 'Dependency çakışması, bir ev inşaatında iki farklı yüklenicinin birbirini tutmayan malzeme listesi getirmesi gibidir. dependencyManagement ise baş mimar olarak tüm malzeme listesini merkezi kontrol altına alır.',
            en: 'Dependency conflict is like two contractors on a building site bringing incompatible material lists. dependencyManagement is the head architect taking central control of all material lists.',
          },
          keyPoints: [
            { tr: 'mvn dependency:tree: çakışan versiyonları gösterir', en: 'mvn dependency:tree: shows conflicting versions' },
            { tr: '<dependencyManagement>: tüm modüller aynı versiyonu kullanır', en: '<dependencyManagement>: all modules use the same version' },
            { tr: 'BOM import: Selenium/Spring ekosistemi için önerilen yöntem', en: 'BOM import: recommended method for Selenium/Spring ecosystem' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Projede Selenium versiyonunu yükseltince ClassNotFoundException aldık. mvn dependency:tree ile gördük ki rest-assured\'ın getirdiği eski Jackson versiyonu çakışıyordu. BOM import ile tek seferde tüm Selenium bileşenlerini uyumlu versiyona çektik."',
            en: 'Say in interview: "When upgrading Selenium in the project we got ClassNotFoundException. mvn dependency:tree showed an old Jackson version from rest-assured was conflicting. BOM import aligned all Selenium components to compatible versions in one step."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'OWASP ZAP güvenlik taraması Java test projesine nasıl entegre edilir?', en: 'How do you integrate OWASP ZAP security scanning into a Java test project?' },
          a: {
            tr: 'OWASP ZAP (Zed Attack Proxy), açık kaynaklı bir web uygulama güvenlik tarayıcısıdır. Java test projesine iki şekilde entegre edilir: (1) ZAP API istemcisi — ZAP daemon modunda çalışırken Java API\'si üzerinden tarama başlatılır; (2) Selenium proxy olarak — tüm Selenium trafiği ZAP üzerinden geçer ve pasif tarama yapılır. Aktif tarama (SQL injection, XSS testleri) için api.ascan.scan() çağrılır ve tarama tamamlanınca (status=100) alert\'ler kontrol edilir. HIGH riskli alert varsa test fail edilir. CI\'da ZAP Docker image\'ı ile pipeline\'a entegre edilir.',
            en: 'OWASP ZAP (Zed Attack Proxy) is an open-source web application security scanner. Two ways to integrate into Java test projects: (1) ZAP API client — start scan via Java API while ZAP runs in daemon mode; (2) As a Selenium proxy — all Selenium traffic passes through ZAP for passive scanning. For active scanning (SQL injection, XSS tests), call api.ascan.scan() and check alerts when scanning completes (status=100). Fail the test if HIGH risk alerts exist. In CI, integrate into pipeline with ZAP Docker image.',
          },
          code: {
            tr: `// ZAP Java API entegrasyonu
// pom.xml: <artifactId>zap-clientapi</artifactId>

public class ZapSecurityTest {
    private static final ClientApi ZAP = new ClientApi("localhost", 8080);

    @BeforeAll
    static void startZapAndSpider() throws Exception {
        // 1. ZAP Spider — sitedeki tüm sayfaları keşfet
        ApiResponse spiderResp = ZAP.spider.scan(
            "https://staging.myapp.com", null, null, null, null);
        String spiderId = ((ApiResponseElement) spiderResp).getValue();

        // Spider tamamlanana kadar bekle
        while (true) {
            Thread.sleep(1000);
            int progress = Integer.parseInt(
                ((ApiResponseElement) ZAP.spider.status(spiderId)).getValue());
            if (progress >= 100) break;
        }
    }

    @Test
    void activeScanFindsNoHighRiskAlerts() throws Exception {
        // 2. Aktif tarama başlat (SQL injection, XSS...)
        ApiResponse scanResp = ZAP.ascan.scan(
            "https://staging.myapp.com", "True", "False", null, null, null);
        String scanId = ((ApiResponseElement) scanResp).getValue();

        // Tarama tamamlanana bekle
        while (Integer.parseInt(
            ((ApiResponseElement) ZAP.ascan.status(scanId)).getValue()) < 100) {
            Thread.sleep(2000);
        }

        // 3. Alert'leri kontrol et
        ApiResponseList alerts = (ApiResponseList) ZAP.core.alerts(
            "https://staging.myapp.com", null, null);

        long highRiskAlerts = alerts.getItems().stream()
            .filter(a -> ((ApiResponseSet) a).getValue("risk").equals("High"))
            .count();

        assertEquals(0, highRiskAlerts,
            "HIGH risk güvenlik açığı tespit edildi! ZAP raporunu incele.");
    }
}

# CI pipeline (Docker)
# docker run -d -p 8080:8080 ghcr.io/zaproxy/zaproxy:stable
#     zap.sh -daemon -host 0.0.0.0 -port 8080
#     -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true
# mvn test -Dtest=ZapSecurityTest`,
            en: `// ZAP Java API integration
// pom.xml: <artifactId>zap-clientapi</artifactId>

public class ZapSecurityTest {
    private static final ClientApi ZAP = new ClientApi("localhost", 8080);

    @BeforeAll
    static void startZapAndSpider() throws Exception {
        // 1. ZAP Spider — discover all pages on the site
        ApiResponse spiderResp = ZAP.spider.scan(
            "https://staging.myapp.com", null, null, null, null);
        String spiderId = ((ApiResponseElement) spiderResp).getValue();

        // Wait until spider completes
        while (true) {
            Thread.sleep(1000);
            int progress = Integer.parseInt(
                ((ApiResponseElement) ZAP.spider.status(spiderId)).getValue());
            if (progress >= 100) break;
        }
    }

    @Test
    void activeScanFindsNoHighRiskAlerts() throws Exception {
        // 2. Start active scan (SQL injection, XSS...)
        ApiResponse scanResp = ZAP.ascan.scan(
            "https://staging.myapp.com", "True", "False", null, null, null);
        String scanId = ((ApiResponseElement) scanResp).getValue();

        // Wait until scan completes
        while (Integer.parseInt(
            ((ApiResponseElement) ZAP.ascan.status(scanId)).getValue()) < 100) {
            Thread.sleep(2000);
        }

        // 3. Check alerts
        ApiResponseList alerts = (ApiResponseList) ZAP.core.alerts(
            "https://staging.myapp.com", null, null);

        long highRiskAlerts = alerts.getItems().stream()
            .filter(a -> ((ApiResponseSet) a).getValue("risk").equals("High"))
            .count();

        assertEquals(0, highRiskAlerts,
            "HIGH risk vulnerability detected! Review ZAP report.");
    }
}

# CI pipeline (Docker)
# docker run -d -p 8080:8080 ghcr.io/zaproxy/zaproxy:stable
#     zap.sh -daemon -host 0.0.0.0 -port 8080
#     -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true
# mvn test -Dtest=ZapSecurityTest`,
          },
          analogy: {
            tr: 'ZAP entegrasyonu, bir bina inşa edilirken güvenlik denetçisinin her katı tamamlandıkça kontrol etmesi gibidir. Tüm bina bitmeden önce elektrik, yangın güvenliği kontrol edilir — bina açıldıktan sonra değil.',
            en: 'ZAP integration is like a safety inspector checking each floor as a building is constructed. Electrical and fire safety is checked before the building is complete — not after it opens.',
          },
          keyPoints: [
            { tr: 'Pasif tarama: Selenium trafiği ZAP proxy üzerinden geçer, zero cost', en: 'Passive scanning: Selenium traffic through ZAP proxy, zero cost' },
            { tr: 'Aktif tarama: SQL injection, XSS otomatik test', en: 'Active scanning: SQL injection, XSS automatically tested' },
            { tr: 'HIGH risk alert: test fail et, ekibi uyar — güvenlik gate', en: 'HIGH risk alert: fail test, alert team — security gate' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "ZAP\'ı Selenium testleriyle birleştirdim. Fonksiyonel test çalışırken ZAP pasif tarama yapıyor — ekstra maliyet yok. Haftada bir aktif tarama da çalışıyor. Bu hybrid yaklaşım hem hız hem güvenliği birlikte sağlıyor."',
            en: 'Say in interview: "I combined ZAP with Selenium tests. While functional tests run, ZAP does passive scanning — zero extra cost. Active scanning also runs weekly. This hybrid approach provides both speed and security together."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'QA lider olarak yeni bir proje için test altyapısı kararları nasıl alınır?', en: 'As a QA lead, how do you make test infrastructure decisions for a new project?' },
          a: {
            tr: 'Test altyapısı kararları teknik değil stratejik kararlardır — ekip büyüklüğü, proje türü, CI/CD olgunluğu ve bakım kapasitesi göz önünde bulundurulur. Karar çerçevesi şöyledir: (1) Framework seçimi: Java projesi için JUnit5 (annotation zenginliği, extension mekanizması) veya TestNG (gruplar, paralel, listener) — ikisi birbirini dışlamaz; (2) Build tool: Maven yaygın ekosistem, Gradle esneklik; (3) Raporlama: Allure en zengin, ExtentReport daha basit; (4) CI: GitHub Actions küçük ekip, Jenkins büyük ekip; (5) Kapsam oranı: %70 unit + %20 integration + %10 E2E piramidi; (6) PR standartları: yeni özellik = yeni test zorunlu.',
            en: 'Test infrastructure decisions are strategic, not just technical — team size, project type, CI/CD maturity, and maintenance capacity are considered. Decision framework: (1) Framework: JUnit5 (annotation richness, extension mechanism) or TestNG (groups, parallel, listeners) for Java projects — both can coexist; (2) Build tool: Maven for wide ecosystem, Gradle for flexibility; (3) Reporting: Allure for richest, ExtentReport simpler; (4) CI: GitHub Actions for small teams, Jenkins for large; (5) Coverage ratio: 70% unit + 20% integration + 10% E2E pyramid; (6) PR standards: new feature = new test mandatory.',
          },
          code: {
            tr: `// Karar matrisi — proje başlangıcında değerlendir

/*
┌─────────────────────────────────────────────────────────────────┐
│ KARAR               │ SEÇENEK A          │ SEÇENEK B           │
├─────────────────────┼────────────────────┼─────────────────────┤
│ Test Framework      │ JUnit5 ✅ (önerilen)│ TestNG              │
│                     │ Extension var       │ Groups/parallel güç  │
├─────────────────────┼────────────────────┼─────────────────────┤
│ Raporlama           │ Allure ✅           │ ExtentReport        │
│                     │ Ekosistem zengin    │ Daha basit kurulum  │
├─────────────────────┼────────────────────┼─────────────────────┤
│ CI/CD               │ GitHub Actions ✅  │ Jenkins             │
│                     │ Küçük ekip, ücretsiz│ Büyük ekip, esneklik│
├─────────────────────┼────────────────────┼─────────────────────┤
│ UI Framework        │ Selenium ✅         │ Playwright          │
│                     │ Geniş ekosistem    │ Modern, async hızlı  │
├─────────────────────┼────────────────────┼─────────────────────┤
│ Test Piramidi       │ %70 Unit           │ %20 Integrasyon     │
│                     │ Hızlı feedback     │ %10 E2E             │
└─────────────────────┴────────────────────┴─────────────────────┘
*/

// Katman oranı kararı
// mvn test -pl unit-tests    → her commit (30 saniye)
// mvn test -pl integration   → her PR (5 dakika)
// mvn test -pl e2e           → gece build (45 dakika)

// PR standartları — CLAUDE.md veya CONTRIBUTING.md
// ✅ Her yeni özellik: en az 1 unit + 1 integration test
// ✅ Bug fix: test önce yazılır (TDD), sonra fix
// ✅ Code review: test coverage %80 altına düşürme
// ✅ Flaky test commit: @Tag("flaky") + JIRA ticket`,
            en: `// Decision matrix — evaluate at project start

/*
┌────────────────────────────────────────────────────────────────┐
│ DECISION            │ OPTION A           │ OPTION B            │
├─────────────────────┼────────────────────┼─────────────────────┤
│ Test Framework      │ JUnit5 ✅ (rec.)   │ TestNG              │
│                     │ Extension support   │ Groups/parallel     │
├─────────────────────┼────────────────────┼─────────────────────┤
│ Reporting           │ Allure ✅           │ ExtentReport        │
│                     │ Rich ecosystem     │ Simpler setup        │
├─────────────────────┼────────────────────┼─────────────────────┤
│ CI/CD               │ GitHub Actions ✅  │ Jenkins             │
│                     │ Small team, free   │ Large team, flexible │
├─────────────────────┼────────────────────┼─────────────────────┤
│ UI Framework        │ Selenium ✅         │ Playwright          │
│                     │ Wide ecosystem     │ Modern, fast async   │
├─────────────────────┼────────────────────┼─────────────────────┤
│ Test Pyramid        │ 70% Unit           │ 20% Integration     │
│                     │ Fast feedback      │ 10% E2E             │
└─────────────────────┴────────────────────┴─────────────────────┘
*/

// Layer ratio decision
// mvn test -pl unit-tests    → every commit (30 seconds)
// mvn test -pl integration   → every PR (5 minutes)
// mvn test -pl e2e           → nightly build (45 minutes)

// PR standards — CLAUDE.md or CONTRIBUTING.md
// ✅ Every new feature: at least 1 unit + 1 integration test
// ✅ Bug fix: test written first (TDD), then fix
// ✅ Code review: do not drop test coverage below 80%
// ✅ Flaky test commit: @Tag("flaky") + JIRA ticket`,
          },
          analogy: {
            tr: 'QA lider kararları, bir şehir planlamacısının kararları gibidir. Metro hattı mı (Selenium, kararlı ama yavaş), otobüs mı (Playwright, esnek), bisiklet yolu mu (unit test, hızlı)? Şehrin büyüklüğüne ve bütçesine göre doğru mix bulunur.',
            en: 'QA lead decisions are like a city planner\'s decisions. Metro line (Selenium, stable but slow), bus (Playwright, flexible), or bike lane (unit test, fast)? The right mix is found based on city size and budget.',
          },
          keyPoints: [
            { tr: 'Test piramidi: %70 unit, %20 integration, %10 E2E', en: 'Test pyramid: 70% unit, 20% integration, 10% E2E' },
            { tr: 'Framework seçimi ekip bilgisine göre: herkes JUnit5 biliyorsa JUnit5', en: 'Framework based on team knowledge: if everyone knows JUnit5, use JUnit5' },
            { tr: 'PR standardı: yeni özellik = yeni test — kural değil kültür', en: 'PR standard: new feature = new test — not a rule, a culture' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "QA lider olarak ilk aldığım karar test piramidi oranıydı: %70 unit, %20 integration, %10 E2E. Bu oran hem hız hem güveni optimize ediyor. İkinci karar: yeni özellik gerektiren her PR\'da en az 1 test zorunlu — bu kuralı code review checklist\'ine ekledim."',
            en: 'Say in interview: "The first decision I made as QA lead was the test pyramid ratio: 70% unit, 20% integration, 10% E2E. This ratio optimizes both speed and confidence. Second decision: every PR requiring a new feature must have at least 1 test — I added this rule to the code review checklist."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Immutable test data nesneleri neden önemlidir ve Java\'da nasıl tasarlanır?', en: 'Why are immutable test data objects important and how are they designed in Java?' },
          a: {
            tr: 'Parallel testlerde mutable (değiştirilebilir) test nesneleri ciddi bir risktir: Thread A nesnenin bir alanını değiştirirken Thread B aynı nesneyi okuyor olabilir — race condition ve belirsiz test sonuçları oluşur. Immutable nesneler bir kez oluşturulur ve hiç değiştirilemez; thread-safe\'dir. Java 16+ ile gelen record keyword\'ü, immutable veri sınıfları için mükemmeldir: tüm alanlar final, constructor, equals/hashCode/toString otomatik üretilir. Değişiklik gerektiğinde yeni nesne oluşturulur (wither pattern). Builder pattern ile fluent API\'de immutable nesne oluşturulur.',
            en: 'Mutable (changeable) test objects in parallel tests are a serious risk: Thread A might be changing a field while Thread B reads the same object — race condition and unpredictable test results. Immutable objects are created once and never changed; they are thread-safe. The record keyword introduced in Java 16+ is perfect for immutable data classes: all fields are final, constructor, equals/hashCode/toString automatically generated. When a change is needed, a new object is created (wither pattern). Immutable objects are created with fluent API using Builder pattern.',
          },
          code: {
            tr: `// Java 16+ record — otomatik immutable
public record TestUser(
    String email,
    String name,
    String role,
    boolean active
) {
    // Compact constructor — validation
    public TestUser {
        Objects.requireNonNull(email, "email zorunlu");
        if (!email.contains("@")) throw new IllegalArgumentException("Geçersiz email");
    }

    // Wither pattern — değiştirmek için yeni nesne
    public TestUser withRole(String newRole) {
        return new TestUser(email, name, newRole, active);
    }

    public TestUser withActive(boolean newActive) {
        return new TestUser(email, name, role, newActive);
    }
}

// Kullanım — parallel testlerde thread-safe
@DataProvider(parallel = true)
Object[][] getTestUsers() {
    TestUser adminBase = new TestUser("admin@test.com", "Admin", "ADMIN", true);
    return new Object[][] {
        { adminBase },                          // aktif admin
        { adminBase.withActive(false) },        // pasif admin — yeni nesne
        { adminBase.withRole("READ_ONLY") },    // read-only admin — yeni nesne
    };
}

@Test(dataProvider = "getTestUsers")
void userPermissionTest(TestUser user) {
    // user değiştirilemez — thread-safe
    loginPage.login(user.email(), user.role());
    // user.setRole("HACKER") → derleme hatası! field final
}

// Builder pattern ile karmaşık nesne
public static class TestUserBuilder {
    private String email = new Faker().internet().emailAddress();
    private String name  = new Faker().name().fullName();
    private String role  = "VIEWER";

    public TestUserBuilder email(String e) { this.email = e; return this; }
    public TestUserBuilder role(String r)  { this.role  = r; return this; }
    public TestUser build() { return new TestUser(email, name, role, true); }
}`,
            en: `// Java 16+ record — automatically immutable
public record TestUser(
    String email,
    String name,
    String role,
    boolean active
) {
    // Compact constructor — validation
    public TestUser {
        Objects.requireNonNull(email, "email is required");
        if (!email.contains("@")) throw new IllegalArgumentException("Invalid email");
    }

    // Wither pattern — create new object to change a field
    public TestUser withRole(String newRole) {
        return new TestUser(email, name, newRole, active);
    }

    public TestUser withActive(boolean newActive) {
        return new TestUser(email, name, role, newActive);
    }
}

// Usage — thread-safe in parallel tests
@DataProvider(parallel = true)
Object[][] getTestUsers() {
    TestUser adminBase = new TestUser("admin@test.com", "Admin", "ADMIN", true);
    return new Object[][] {
        { adminBase },                          // active admin
        { adminBase.withActive(false) },        // inactive admin — new object
        { adminBase.withRole("READ_ONLY") },    // read-only admin — new object
    };
}

@Test(dataProvider = "getTestUsers")
void userPermissionTest(TestUser user) {
    // user is immutable — thread-safe
    loginPage.login(user.email(), user.role());
    // user.setRole("HACKER") → compile error! field is final
}

// Complex object with Builder pattern
public static class TestUserBuilder {
    private String email = new Faker().internet().emailAddress();
    private String name  = new Faker().name().fullName();
    private String role  = "VIEWER";

    public TestUserBuilder email(String e) { this.email = e; return this; }
    public TestUserBuilder role(String r)  { this.role  = r; return this; }
    public TestUser build() { return new TestUser(email, name, role, true); }
}`,
          },
          analogy: {
            tr: 'Immutable nesne, bir kez basılmış sertifika gibidir. Üzerine bir şey yazamazsın — değiştirmek istersen yeni sertifika çıkartırsın. Paralel testlerde herkes kendi sertifikasına bakar, kimse diğerinin sertifikasını değiştiremez.',
            en: 'An immutable object is like a printed certificate. You can\'t write on it — if you want to change it, you print a new one. In parallel tests everyone looks at their own certificate, nobody can change anyone else\'s.',
          },
          keyPoints: [
            { tr: 'record: Java 16+ immutable sınıf, tek satır tanım', en: 'record: Java 16+ immutable class, single line definition' },
            { tr: 'Wither pattern: değiştirmek için yeni nesne — orijinal korunur', en: 'Wither pattern: new object to change — original preserved' },
            { tr: 'Thread-safe: parallel testlerde race condition yok', en: 'Thread-safe: no race condition in parallel tests' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Parallel testlere geçtiğimizde bazı testler birbirinin test datasını bozuyordu. TestUser sınıfımı Java record\'a çevirdim — immutable, thread-safe. Artık bir test datasını değiştirmek için wither pattern kullanıyoruz: yeni nesne, orijinal bozulmaz."',
            en: 'Say in interview: "When we moved to parallel tests, some tests were corrupting each other\'s test data. I converted my TestUser class to a Java record — immutable, thread-safe. Now to change test data we use the wither pattern: new object, original unchanged."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Mutation testing nedir ve neden önemlidir?', en: 'What is mutation testing and why is it important?' },
          a: {
            tr: 'Mutation testing, test suite\'in kalitesini ölçmek için kaynak koda küçük değişiklikler (mutantlar) ekler ve testlerin bu değişiklikleri yakalayıp yakalayamadığını kontrol eder. Bir mutant test tarafından yakalanırsa (test fail olursa) mutant "killed" olur. Yakalanmazsa mutant "survived" olur — bu, test coverage\'ın yüksek olsa bile test mantığının yetersiz olduğunu gösterir. PIT (Pitest) Java için en popüler mutation testing aracıdır. QA\'da: mutation score %80+ hedeflenir; survived mutantlar incelenerek eksik test senaryoları eklenir.',
            en: 'Mutation testing measures test suite quality by introducing small code changes (mutants) and checking if tests detect them. A mutant caught by a test (test fails) is "killed." An undetected mutant "survived" — indicating weak test logic even with high coverage. PIT (Pitest) is the most popular Java mutation testing tool. In QA: target mutation score of 80%+; review survived mutants to add missing test scenarios.',
          },
          code: {
            tr: `// pitest-maven plugin
<plugin>
  <groupId>org.pitest</groupId>
  <artifactId>pitest-maven</artifactId>
  <version>1.15.0</version>
  <configuration>
    <targetClasses><param>com.myapp.*</param></targetClasses>
    <targetTests><param>com.myapp.*Test</param></targetTests>
    <mutationThreshold>80</mutationThreshold> <!-- %80 altında build fail -->
  </configuration>
</plugin>

// mvn org.pitest:pitest-maven:mutationCoverage
// Çıktı: >> Generated 150 mutations Killed 128 (85%) Survived 22`,
            en: `// pitest-maven plugin
<plugin>
  <groupId>org.pitest</groupId>
  <artifactId>pitest-maven</artifactId>
  <version>1.15.0</version>
  <configuration>
    <targetClasses><param>com.myapp.*</param></targetClasses>
    <targetTests><param>com.myapp.*Test</param></targetTests>
    <mutationThreshold>80</mutationThreshold> <!-- build fails below 80% -->
  </configuration>
</plugin>

// mvn org.pitest:pitest-maven:mutationCoverage
// Output: >> Generated 150 mutations Killed 128 (85%) Survived 22`,
          },
          analogy: {
            tr: 'Mutation testing, bir güvenlik sisteminin test edilmesi gibidir — kapıyı açık bırakırsanız alarm çalıyor mu? Çalmazsa sistem çalışıyor görünür ama aslında yetersizdir.',
            en: 'Mutation testing is like testing a security system — if you leave the door open, does the alarm go off? If not, the system appears to work but is actually inadequate.',
          },
          keyPoints: [
            { tr: 'Mutation score = killed / total mutants × 100', en: 'Mutation score = killed / total mutants × 100' },
            { tr: 'Survived mutants = eksik test senaryoları', en: 'Survived mutants = missing test scenarios' },
            { tr: 'PIT (Pitest) Java için standart araç', en: 'PIT (Pitest) is the standard Java tool' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Coverage %90 olsa bile mutation testing ile test mantığındaki boşlukları tespit ettim. Survived mutantları inceleyerek 12 eksik edge case ekledim."',
            en: 'Say in interview: "Even with 90% coverage, I used mutation testing to find gaps in test logic. I reviewed survived mutants and added 12 missing edge cases."',
          },
        },
        {
          level: 'advanced',
          q: { tr: 'Singleton DriverFactory parallel testlerde neden sorunludur? Thread-safe çözümü nasıl tasarlanır?', en: 'Why is a Singleton DriverFactory problematic in parallel tests? How do you design a thread-safe solution?' },
          a: {
            tr: 'Klasik Singleton pattern\'de sadece bir nesne örneği vardır ve tüm çağrıcılar bu örneği paylaşır. WebDriver için bu, tüm parallel thread\'lerin aynı tarayıcı oturumunu paylaşmasına yol açar — Thread A login sayfasını açarken Thread B checkout\'u açmaya çalışır, sonuçlar tamamen öngörülemez hale gelir (cross-contamination). Çözüm ThreadLocal Singleton\'dır: her thread kendi driver instance\'ını alır. getInstance() çağrıldığında ThreadLocal\'da değer yoksa yeni driver oluşturulur, varsa aynısı döndürülür. Test bittikten sonra quit() ve remove() birlikte çağrılmalıdır.',
            en: 'In classic Singleton pattern there is only one object instance and all callers share it. For WebDriver this means all parallel threads share the same browser session — Thread A opens the login page while Thread B tries to open checkout, results become completely unpredictable (cross-contamination). Solution is ThreadLocal Singleton: each thread gets its own driver instance. When getInstance() is called, if ThreadLocal has no value a new driver is created, otherwise the same is returned. After the test, quit() and remove() must be called together.',
          },
          code: {
            tr: `// ❌ KLASİK SINGLETON — parallel'de cross-contamination
public class BadDriverFactory {
    private static WebDriver instance; // TÜM THREAD'LER PAYLAŞIR!

    public static WebDriver getInstance() {
        if (instance == null) {
            instance = new ChromeDriver(); // race condition var!
        }
        return instance;
    }
}
// Thread A: instance = Chrome(login sayfası)
// Thread B: instance aynı Chrome! checkout açmaya çalışıyor
// → Her iki test de fail eder

// ✅ THREADLOCAL SINGLETON — her thread kendi driver'ı
public final class DriverFactory {
    // Her thread için ayrı storage
    private static final ThreadLocal<WebDriver> DRIVERS =
        new ThreadLocal<>();

    private DriverFactory() {} // instantiation engeli

    public static WebDriver getDriver() {
        if (DRIVERS.get() == null) {
            // Bu thread için ilk kez — yeni driver oluştur
            WebDriverManager.chromedriver().setup();
            ChromeOptions opts = new ChromeOptions();
            if (Boolean.parseBoolean(System.getProperty("headless", "false"))) {
                opts.addArguments("--headless", "--no-sandbox");
            }
            DRIVERS.set(new ChromeDriver(opts));
        }
        return DRIVERS.get(); // Bu thread'e özgü driver
    }

    public static void quitDriver() {
        WebDriver driver = DRIVERS.get();
        if (driver != null) {
            try {
                driver.quit();    // tarayıcıyı kapat
            } finally {
                DRIVERS.remove(); // ThreadLocal temizle — MEMORY LEAK önler
            }
        }
    }
}

// BaseTest — tüm testler extend eder
public abstract class BaseTest {
    protected WebDriver driver;

    @BeforeEach
    void initDriver() {
        driver = DriverFactory.getDriver(); // bu thread'e ait
        driver.manage().timeouts()
            .implicitlyWait(Duration.ZERO); // explicit wait için 0
    }

    @AfterEach
    void quitDriver() {
        DriverFactory.quitDriver(); // quit + remove
    }
}`,
            en: `// ❌ CLASSIC SINGLETON — cross-contamination in parallel tests
public class BadDriverFactory {
    private static WebDriver instance; // ALL THREADS SHARE THIS!

    public static WebDriver getInstance() {
        if (instance == null) {
            instance = new ChromeDriver(); // race condition!
        }
        return instance;
    }
}
// Thread A: instance = Chrome(login page)
// Thread B: same Chrome instance! tries to open checkout
// → Both tests fail

// ✅ THREADLOCAL SINGLETON — each thread has its own driver
public final class DriverFactory {
    // Separate storage for each thread
    private static final ThreadLocal<WebDriver> DRIVERS =
        new ThreadLocal<>();

    private DriverFactory() {} // prevent instantiation

    public static WebDriver getDriver() {
        if (DRIVERS.get() == null) {
            // First call for this thread — create new driver
            WebDriverManager.chromedriver().setup();
            ChromeOptions opts = new ChromeOptions();
            if (Boolean.parseBoolean(System.getProperty("headless", "false"))) {
                opts.addArguments("--headless", "--no-sandbox");
            }
            DRIVERS.set(new ChromeDriver(opts));
        }
        return DRIVERS.get(); // driver unique to this thread
    }

    public static void quitDriver() {
        WebDriver driver = DRIVERS.get();
        if (driver != null) {
            try {
                driver.quit();    // close the browser
            } finally {
                DRIVERS.remove(); // clean ThreadLocal — prevents MEMORY LEAK
            }
        }
    }
}

// BaseTest — all tests extend this
public abstract class BaseTest {
    protected WebDriver driver;

    @BeforeEach
    void initDriver() {
        driver = DriverFactory.getDriver(); // belongs to this thread
        driver.manage().timeouts()
            .implicitlyWait(Duration.ZERO); // 0 for explicit wait
    }

    @AfterEach
    void quitDriver() {
        DriverFactory.quitDriver(); // quit + remove
    }
}`,
          },
          analogy: {
            tr: 'Klasik Singleton driver, bir şirketteki tek araba gibidir — herkes sırayla kullanır. ThreadLocal Singleton ise her çalışana kendi arabası vermek gibidir. Paralel çalışmada ikinci seçenek tek mantıklı olandır.',
            en: 'A classic Singleton driver is like one shared company car — everyone uses it in turns. ThreadLocal Singleton is giving each employee their own car. In parallel work, the second option is the only logical one.',
          },
          keyPoints: [
            { tr: 'Klasik Singleton: tek instance, tüm thread paylaşır → cross-contamination', en: 'Classic Singleton: one instance, all threads share → cross-contamination' },
            { tr: 'ThreadLocal Singleton: her thread kendi driver\'ı, tam izolasyon', en: 'ThreadLocal Singleton: each thread its own driver, full isolation' },
            { tr: 'quitDriver()=quit()+remove(): her ikisi zorunlu, finally içinde', en: 'quitDriver()=quit()+remove(): both mandatory, inside finally' },
          ],
          tip: {
            tr: 'Mülakata şunu söyle: "Parallel test mimarimde DriverFactory ThreadLocal Singleton kullanıyor. Singleton mi ThreadLocal mı sorusu gelirse: Singleton tüm problemi, ThreadLocal her thread için ayrı instance. quitDriver() her zaman try-finally içinde — thread pool memory leak\'ini önler."',
            en: 'Say in interview: "My parallel test architecture uses ThreadLocal Singleton in DriverFactory. If asked Singleton vs ThreadLocal: Singleton is one for all, ThreadLocal is one per thread. quitDriver() always inside try-finally — prevents thread pool memory leaks."',
          },
        },
]
const s7 = {
  tr: {
    title: '💼 Java QA Mülakat Soruları (50 Soru)',
    blocks: [
      { type: 'simple-box', emoji: '💼', content: 'Bu sorular gerçek mülakatlarda soruldu. Senaryo bazlı — her cevabı kendi projenle ilişkilendir. Önce anla, sonra anlat. Her soru için Java analoji, kod örneği ve mülakat notu içerir.' },
      { type: 'interview-questions', topic: 'Java QA', questions: _s7Q, relatedTopicId: 'java-qa' },
    ],
  },
  en: {
    title: '💼 Java QA Interview Questions (50 Questions)',
    blocks: [
      { type: 'simple-box', emoji: '💼', content: 'Real interview questions in scenario-based format — each answer includes Java analogy, code example, and interview tip. Understand first, then explain.' },
      { type: 'interview-questions', topic: 'Java QA', questions: _s7Q, relatedTopicId: 'java-qa' },
    ],
  },
}

// ─── S-A: TEMEL SÖZDİZİMİ ────────────────────────────────────────────────────
const sA = {
  tr: {
    title: '📝 Temel Sözdizimi — Variables, Data Types, Operators',
    blocks: [
      {
        type: 'simple-box', emoji: '📝',
        content: 'Java\'da bir program yazmak tıpkı bir yemek tarifi yazmak gibi: önce malzemeleri (değişkenler) tanımlarsın, sonra ne yapılacağını (operatörler) belirtirsin. Bilgisayar da bu tarifi adım adım uygular.',
      },
      {
        type: 'visual', variant: 'boxes',
        title: 'Java Programı = Tarif Kartı',
        items: [
          { icon: '📄', label: 'class', desc: 'Tarifin adı ve dış kabı', highlight: true },
          { arrow: true },
          { icon: '🚪', label: 'main()', desc: 'Programın giriş kapısı' },
          { arrow: true },
          { icon: '🧂', label: 'statements', desc: 'Adım adım komutlar' },
          { arrow: true },
          { icon: '🖥️', label: 'output', desc: 'Console sonucu', highlight: true },
        ],
        note: 'Not dosyasındaki class/body/main method parçalama yöntemi burada görsel akışa çevrildi.',
      },
      { type: 'heading', text: { tr: 'Java Sözdizimi — Merhaba Dünya!', en: 'Java Syntax — Hello World!' } },
      {
        type: 'code', language: 'java', label: 'İlk Java programı',
        code: `public class Main {
    public static void main(String[] args) {
        // Bu satır çalışır — // ile başlayan satırlar YORUM (comment)
        System.out.println("Merhaba Dünya!"); // println = yazdır + yeni satır
        System.out.print("Yan yana ");       // print = sadece yazdır
        System.out.print("çıktı");
    }
}`,
        expected: `Merhaba Dünya!\nYan yana çıktı`,
      },
      {
        type: 'editor', lang: 'java', label: 'Temel Sözdizimi',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        // Kendi mesajını yaz:
        System.out.println("Java öğreniyorum!");
        System.out.println("Bugün: Temel Sözdizimi");
    }
}`,
        height: '160px',
      },
      { type: 'heading', text: { tr: 'Değişkenler (Variables)', en: 'Variables' } },
      {
        type: 'text',
        content: 'Java statik tipli bir dildir: her değişken bildirilirken tipi belirtilmelidir. Java 11\'den itibaren `var` ile tip çıkarımı da yapılabilir ama `var` yalnızca local scope\'da geçerlidir.',
      },
      {
        type: 'simulation',
        scenario: 'java-stack-heap',
        icon: '🧠',
        color: '#2563eb',
        title: { tr: 'Variable Bellekte Nasıl Yaşar?', en: 'How Variables Live in Memory' },
        description: {
          tr: 'Primitive değer stack tarafında doğrudan durur; String gibi object tiplerinde stack sadece adresi tutar, object heap tarafındadır.',
          en: 'Primitive values live directly on the stack; object types like String use a stack reference that points to the real object on the heap.',
        },
        code: `int score = 75;
String name = "admin";

score = score + 5;

System.out.println(score); // 80
System.out.println(name);  // admin`,
      },
      {
        type: 'code', language: 'java', label: 'Değişken tipleri ve bildirimi',
        code: `public class Main {
    public static void main(String[] args) {
        // Primitive tipler
        int age = 25;               // tam sayı (-2^31 ile 2^31-1)
        long bigNum = 9_000_000L;   // büyük tam sayı (L suffix)
        double price = 19.99;       // ondalıklı sayı (64-bit)
        float tax = 0.18f;          // ondalıklı sayı (32-bit, f suffix)
        char grade = 'A';           // tek karakter (tek tırnak!)
        boolean isActive = true;    // true / false
        byte smallNum = 127;        // -128 ile 127

        // Non-primitive (nesne) tipler
        String name = "Java";       // metin (çift tırnak!)
        int[] nums = {1, 2, 3};     // dizi

        // Java 11+ var (tip çıkarımı — sadece local)
        var city = "İstanbul";      // compiler String olduğunu anlar

        // Sabit (Constant) — değiştirilemez
        final double PI = 3.14159;

        System.out.println("Ad: " + name + ", Yaş: " + age);
        System.out.println("PI = " + PI);
    }
}`,
        expected: `Ad: Java, Yaş: 25\nPI = 3.14159`,
      },
      {
        type: 'table',
        headers: ['Tip', 'Boyut', 'Değer Aralığı', 'Örnek'],
        rows: [
          ['byte', '1 byte', '-128 to 127', 'byte b = 100'],
          ['short', '2 bytes', '-32,768 to 32,767', 'short s = 30000'],
          ['int', '4 bytes', '-2^31 to 2^31-1', 'int x = 42'],
          ['long', '8 bytes', '-2^63 to 2^63-1', 'long l = 100L'],
          ['float', '4 bytes', '~6-7 decimal digits', 'float f = 3.14f'],
          ['double', '8 bytes', '~15 decimal digits', 'double d = 3.14'],
          ['char', '2 bytes', 'Unicode (0 to 65535)', "char c = 'A'"],
          ['boolean', '1 bit', 'true/false', 'boolean ok = true'],
        ],
      },
      { type: 'heading', text: { tr: 'Type Casting (Tip Dönüşümü)', en: 'Type Casting' } },
      {
        type: 'code', language: 'java', label: 'Widening (otomatik) ve Narrowing (zorunlu) casting',
        code: `public class Main {
    public static void main(String[] args) {
        // WIDENING — küçükten büyüğe, otomatik (bilgi kaybı yok)
        // byte → short → int → long → float → double
        int myInt = 9;
        double myDouble = myInt;  // otomatik: int → double
        System.out.println("int: " + myInt);       // 9
        System.out.println("double: " + myDouble); // 9.0

        // NARROWING — büyükten küçüğe, zorunlu cast (bilgi kaybı olabilir!)
        double pi = 9.99;
        int piInt = (int) pi;  // (int) = zorunlu cast
        System.out.println("double: " + pi);       // 9.99
        System.out.println("int (truncated): " + piInt); // 9 (ondalık kesildi!)

        // String → int
        String numStr = "42";
        int parsed = Integer.parseInt(numStr);
        System.out.println("Parsed: " + parsed + 1); // 43

        // int → String
        String fromInt = String.valueOf(100);
        System.out.println("String: " + fromInt);
    }
}`,
        expected: `int: 9\ndouble: 9.0\ndouble: 9.99\nint (truncated): 9\nParsed: 43\nString: 100`,
      },
      { type: 'heading', text: { tr: 'Operatörler (Operators)', en: 'Operators' } },
      {
        type: 'code', language: 'java', label: 'Tüm Java operatörleri',
        code: `public class Main {
    public static void main(String[] args) {
        // ARİTMETİK operatörler
        int a = 10, b = 3;
        System.out.println(a + b);   // 13
        System.out.println(a - b);   // 7
        System.out.println(a * b);   // 30
        System.out.println(a / b);   // 3 (tam bölme! 3.33 değil)
        System.out.println(a % b);   // 1 (kalan — modulo)
        System.out.println(a++);     // 10 (önce kullan, sonra artır)
        System.out.println(++b);     // 4 (önce artır, sonra kullan)

        // ATAMA operatörleri
        int x = 5;
        x += 3;  System.out.println(x); // 8  (x = x + 3)
        x -= 2;  System.out.println(x); // 6  (x = x - 2)
        x *= 4;  System.out.println(x); // 24 (x = x * 4)
        x /= 6;  System.out.println(x); // 4  (x = x / 6)
        x %= 3;  System.out.println(x); // 1  (x = x % 3)

        // KARŞILAŞTIRMA operatörleri
        System.out.println(5 == 5); // true
        System.out.println(5 != 3); // true
        System.out.println(5 > 3);  // true
        System.out.println(5 < 3);  // false
        System.out.println(5 >= 5); // true
        System.out.println(5 <= 4); // false

        // MANTIKSAL operatörler
        boolean t = true, f = false;
        System.out.println(t && f); // false (AND)
        System.out.println(t || f); // true  (OR)
        System.out.println(!t);     // false (NOT)
    }
}`,
        expected: `13\n7\n30\n3\n1\n10\n4\n8\n6\n24\n4\n1\ntrue\ntrue\ntrue\nfalse\ntrue\nfalse\nfalse\ntrue\nfalse`,
      },
      {
        type: 'editor', lang: 'java', label: 'Operatör pratiği',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        // İki sayı gir ve tüm aritmetik işlemleri yap:
        int x = 15, y = 4;
        System.out.println("Toplam: " + (x + y));
        System.out.println("Fark: " + (x - y));
        System.out.println("Çarpım: " + (x * y));
        System.out.println("Bölüm: " + (x / y));
        System.out.println("Kalan: " + (x % y));
        
        // Burayı değiştir ve çalıştır!
    }
}`,
        height: '200px',
      },
      {
        type: 'quiz',
        question: { tr: 'Java\'da 10 / 3 ifadesinin sonucu nedir?', en: 'What is the result of 10 / 3 in Java?' },
        options: [
          { id: 'a', text: '3.33' },
          { id: 'b', text: '3' },
          { id: 'c', text: '3.0' },
          { id: 'd', text: '1' },
        ],
        correct: 'b',
        explanation: { tr: 'Java\'da int / int = int (tam sayı bölmesi). Sonuç 3\'tür; 3.33 değil. Ondalık sonuç için en az bir taraf double olmalı: 10.0 / 3 → 3.3333...', en: 'In Java, int / int = int (integer division). Result is 3, not 3.33. For decimal result, at least one side must be double: 10.0 / 3 → 3.3333...' },
      
        retryQuestion: {
      "question": {
            "tr": "Java'da `int result = 7 / 2;` işleminden sonra `result` değişkeninin değeri nedir?",
            "en": "What is the value of the `result` variable after the operation `int result = 7 / 2;` in Java?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "3.5"
            },
            {
                  "id": "b",
                  "text": "4"
            },
            {
                  "id": "c",
                  "text": "3"
            },
            {
                  "id": "d",
                  "text": "3.0"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Java'da tamsayı bölmesi (integer division) yapıldığında küsurat kısmı atılır. 7 / 2 işlemi 3.5 sonucunu vermesi gerekirken, tamsayı bölmesi sonucunda 3 olarak döner.",
            "en": "In Java, integer division truncates the fractional part. While 7 / 2 mathematically is 3.5, integer division results in 3."
      }
}
},
    ],
  },
  en: {
    title: '📝 Java Syntax — Variables, Data Types, Operators',
    blocks: [
      {
        type: 'simple-box', emoji: '📝',
        content: 'Writing a Java program is like writing a recipe: first define ingredients (variables), then specify what to do (operators). The computer executes the recipe step by step.',
      },
      {
        type: 'visual', variant: 'boxes',
        title: 'Java Program = Recipe Card',
        items: [
          { icon: '📄', label: 'class', desc: 'Name and outer container', highlight: true },
          { arrow: true },
          { icon: '🚪', label: 'main()', desc: 'Program entry point' },
          { arrow: true },
          { icon: '🧂', label: 'statements', desc: 'Step-by-step commands' },
          { arrow: true },
          { icon: '🖥️', label: 'output', desc: 'Console result', highlight: true },
        ],
        note: 'The notes break class/body/main method into visible parts; this turns that pattern into a visual flow.',
      },
      { type: 'heading', text: { en: 'Java Syntax — Hello World!' } },
      {
        type: 'code', language: 'java', label: 'First Java program',
        code: `public class Main {
    public static void main(String[] args) {
        // Comments start with // — ignored by compiler
        System.out.println("Hello World!"); // println = print + newline
        System.out.print("Side by ");       // print = no newline
        System.out.print("side");
    }
}`,
        expected: `Hello World!\nSide by side`,
      },
      {
        type: 'editor', lang: 'java', label: 'Basic Syntax',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Learning Java!");
        System.out.println("Topic: Basic Syntax");
    }
}`,
        height: '160px',
      },
      { type: 'heading', text: { en: 'Variables & Data Types' } },
      {
        type: 'simulation',
        scenario: 'java-stack-heap',
        icon: '🧠',
        color: '#2563eb',
        title: { tr: 'Variable Bellekte Nasıl Yaşar?', en: 'How Variables Live in Memory' },
        description: {
          tr: 'Primitive değer stack tarafında doğrudan durur; String gibi object tiplerinde stack sadece adresi tutar, object heap tarafındadır.',
          en: 'Primitive values live directly on the stack; object types like String use a stack reference that points to the real object on the heap.',
        },
        code: `int score = 75;
String name = "admin";

score = score + 5;

System.out.println(score); // 80
System.out.println(name);  // admin`,
      },
      {
        type: 'code', language: 'java', label: 'Variable types and declaration',
        code: `public class Main {
    public static void main(String[] args) {
        int age = 25;
        long bigNum = 9_000_000L;
        double price = 19.99;
        float tax = 0.18f;
        char grade = 'A';
        boolean isActive = true;
        String name = "Java";
        final double PI = 3.14159; // constant

        var city = "Istanbul"; // Java 11+ type inference

        System.out.println("Name: " + name + ", Age: " + age);
        System.out.println("PI = " + PI);
    }
}`,
        expected: `Name: Java, Age: 25\nPI = 3.14159`,
      },
      { type: 'heading', text: { en: 'Type Casting' } },
      {
        type: 'code', language: 'java', label: 'Widening (automatic) and Narrowing (forced) casting',
        code: `public class Main {
    public static void main(String[] args) {
        // WIDENING — small to large, automatic
        int myInt = 9;
        double myDouble = myInt; // int → double automatically
        System.out.println("double: " + myDouble); // 9.0

        // NARROWING — large to small, must cast explicitly
        double pi = 9.99;
        int piInt = (int) pi; // decimal truncated!
        System.out.println("int: " + piInt); // 9

        // String to int
        int parsed = Integer.parseInt("42");
        System.out.println("Parsed: " + parsed);
    }
}`,
        expected: `double: 9.0\nint: 9\nParsed: 42`,
      },
      {
        type: 'editor', lang: 'java', label: 'Operators Practice',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        int x = 15, y = 4;
        System.out.println("Sum: " + (x + y));
        System.out.println("Difference: " + (x - y));
        System.out.println("Product: " + (x * y));
        System.out.println("Quotient: " + (x / y));
        System.out.println("Remainder: " + (x % y));
    }
}`,
        height: '200px',
      },
      {
        type: 'quiz',
        question: { en: 'What is the result of 10 / 3 in Java?' },
        options: [
          { id: 'a', text: '3.33' },
          { id: 'b', text: '3' },
          { id: 'c', text: '3.0' },
          { id: 'd', text: '1' },
        ],
        correct: 'b',
        explanation: { en: 'In Java, int / int = int (integer division). Result is 3, not 3.33. For decimal, use 10.0 / 3 → 3.3333...' },
      
        retryQuestion: {
      "question": {
            "en": "What will be the output of 7 / 2 in Java?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "3.5"
            },
            {
                  "id": "b",
                  "text": "4"
            },
            {
                  "id": "c",
                  "text": "3"
            },
            {
                  "id": "d",
                  "text": "1"
            }
      ],
      "correct": "c",
      "explanation": {
            "en": "In Java, integer division discards the remainder. Since both operands are integers, the result is truncated to the nearest whole number. To get 3.5, you would need to perform floating-point division like 7.0 / 2."
      }
}
},
    ],
  },
}

// ─── S-B: STRINGS & MATH ──────────────────────────────────────────────────────
const sB = {
  tr: {
    title: '🔤 Strings & Math — Metin ve Matematik',
    blocks: [
      {
        type: 'simple-box', emoji: '🔤',
        content: 'String\'i bir kelime zinciri gibi düşün — harfleri bir ipe dizdik. Java\'da String nesneleri değiştirilemez (immutable): bir kez oluşturulunca bellekte değişmez, yeni bir string oluşturulur. Bu nedenle çok fazla string birleştirmesi yapıyorsan StringBuilder kullan.',
      },
      { type: 'heading', text: { tr: 'String Metotları', en: 'String Methods' } },
      {
        type: 'code', language: 'java', label: 'En önemli String metotları',
        code: `public class Main {
    public static void main(String[] args) {
        String s = "  Hello, Java World!  ";

        // Uzunluk
        System.out.println(s.length());          // 22

        // Büyük/küçük harf
        System.out.println(s.toUpperCase());     // "  HELLO, JAVA WORLD!  "
        System.out.println(s.toLowerCase());     // "  hello, java world!  "

        // Boşluk temizle
        System.out.println(s.trim());            // "Hello, Java World!"
        System.out.println(s.strip());           // Java 11+ (Unicode-aware)

        // Arama
        System.out.println(s.contains("Java")); // true
        System.out.println(s.indexOf("Java"));  // 9
        System.out.println(s.startsWith("  H")); // true
        System.out.println(s.endsWith("!  "));   // true

        // Değiştirme
        System.out.println(s.replace("Java", "Python")); // " Hello, Python World! "
        System.out.println(s.replaceAll("\\s+", "_"));   // boşlukları _ ile değiştir

        // Parçalama
        String csv = "admin,user,guest";
        String[] parts = csv.split(",");
        for (String p : parts) System.out.println(p);

        // Karşılaştırma
        String a = "hello", b = "hello";
        System.out.println(a.equals(b));          // true (içerik karşılaştır)
        System.out.println(a.equalsIgnoreCase("HELLO")); // true

        // Substring
        System.out.println("Hello".substring(1, 4)); // "ell"
        System.out.println("Hello".charAt(0));        // 'H'

        // Java 11+ metodlar
        System.out.println("  ".isBlank());   // true
        System.out.println("a\nb\nc".lines().count()); // 3
        System.out.println("ha".repeat(3));   // "hahaha"
    }
}`,
        expected: `22\n  HELLO, JAVA WORLD!  \n  hello, java world!  \nHello, Java World!\nHello, Java World!\ntrue\n9\ntrue\ntrue\n  Hello, Python World!  \n__Hello,_Java_World!__\nadmin\nuser\nguest\ntrue\ntrue\nell\nH\ntrue\n3\nhahaha`,
      },
      {
        type: 'editor', lang: 'java', label: 'String metot deneyi',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        String isim = "  Ahmet Yılmaz  ";
        
        // 1. Baş ve sondaki boşlukları temizle
        String temiz = isim.trim();
        System.out.println("Temizlenmiş: " + temiz);
        
        // 2. Büyük harfe çevir
        System.out.println("Büyük: " + temiz.toUpperCase());
        
        // 3. İçinde "Yılmaz" var mı?
        System.out.println("Yılmaz içeriyor mu? " + temiz.contains("Yılmaz"));
        
        // 4. Kaç karakter?
        System.out.println("Uzunluk: " + temiz.length());
        
        // Kendi deneyin buraya ekleyin:
    }
}`,
        height: '220px',
      },
      { type: 'heading', text: { tr: 'StringBuilder — Verimli Metin Birleştirme', en: 'StringBuilder — Efficient String Concatenation' } },
      {
        type: 'code', language: 'java', label: 'StringBuilder vs String + (performance)',
        code: `public class Main {
    public static void main(String[] args) {
        // ❌ YANLIŞ — döngüde String birleştirme (her adımda yeni nesne)
        String result = "";
        for (int i = 0; i < 5; i++) {
            result += i + ", "; // bellekte 5 ayrı String nesnesi
        }
        System.out.println(result);

        // ✅ DOĞRU — StringBuilder (tek nesne, append ile uzar)
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 5; i++) {
            sb.append(i).append(", ");
        }
        System.out.println(sb.toString());

        // StringBuilder metotları
        StringBuilder x = new StringBuilder("Hello");
        x.append(" World");     // ekler
        x.insert(5, ",");       // araya ekler
        x.reverse();            // ters çevirir
        x.delete(0, 3);         // karakter siler
        System.out.println(x);
    }
}`,
      },
      { type: 'heading', text: { tr: 'Math Sınıfı', en: 'Math Class' } },
      {
        type: 'code', language: 'java', label: 'java.lang.Math metotları',
        code: `public class Main {
    public static void main(String[] args) {
        // Temel matematik
        System.out.println(Math.abs(-5));      // 5 (mutlak değer)
        System.out.println(Math.max(10, 20));  // 20
        System.out.println(Math.min(10, 20));  // 10
        System.out.println(Math.pow(2, 10));   // 1024.0 (2^10)
        System.out.println(Math.sqrt(144));    // 12.0 (kare kök)
        System.out.println(Math.cbrt(27));     // 3.0 (küp kök)

        // Yuvarlama
        System.out.println(Math.round(9.4));   // 9
        System.out.println(Math.round(9.5));   // 10
        System.out.println(Math.ceil(9.1));    // 10.0 (yukarı yuvarla)
        System.out.println(Math.floor(9.9));   // 9.0 (aşağı yuvarla)

        // Logaritma ve trigonometri
        System.out.println(Math.log(Math.E));  // 1.0
        System.out.println(Math.log10(1000));  // 3.0
        System.out.println(Math.PI);           // 3.14159...

        // Rastgele sayı (0.0 ile 1.0 arasında)
        double r = Math.random();
        System.out.println("Random: " + r);

        // 1-100 arası rastgele int
        int dice = (int)(Math.random() * 100) + 1;
        System.out.println("Dice: " + dice);
    }
}`,
      },
      { type: 'heading', text: { tr: 'Boolean Mantığı', en: 'Booleans' } },
      {
        type: 'code', language: 'java', label: 'Boolean değişkenler ve operatörler',
        code: `public class Main {
    public static void main(String[] args) {
        boolean isJavaFun = true;
        boolean isFishTasty = false;

        // Mantıksal operatörler
        System.out.println(isJavaFun && isFishTasty); // false (AND)
        System.out.println(isJavaFun || isFishTasty); // true  (OR)
        System.out.println(!isJavaFun);                // false (NOT)

        // Karşılaştırmalar boolean üretir
        int x = 10;
        System.out.println(x > 9);  // true
        System.out.println(x == 15); // false
        System.out.println(x != 0);  // true

        // Boolean expression
        int age = 20;
        boolean canVote = (age >= 18);
        System.out.println("Oy kullanabilir mi? " + canVote); // true
    }
}`,
        expected: `false\ntrue\nfalse\ntrue\nfalse\ntrue\nOy kullanabilir mi? true`,
      },
      {
        type: 'editor', lang: 'java', label: 'String ve Math pratiği',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        // Bir üçgenin alanını hesapla: alan = taban * yükseklik / 2
        double taban = 6.0, yukseklik = 4.0;
        double alan = (taban * yukseklik) / 2;
        System.out.println("Alan: " + alan);
        
        // Hipotenüs: Math.sqrt(a*a + b*b)
        double a = 3, b = 4;
        double hipotenus = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        System.out.println("Hipotenüs: " + hipotenus);
        
        // Kendi hesabını ekle:
    }
}`,
        height: '220px',
      },
      {
        type: 'quiz',
        question: { tr: 'Java\'da iki String\'i içerik açısından karşılaştırmak için hangi metot kullanılmalıdır?', en: 'Which method should be used to compare two String values in Java?' },
        options: [
          { id: 'a', text: '==' },
          { id: 'b', text: '.equals()' },
          { id: 'c', text: '.compare()' },
          { id: 'd', text: '.match()' },
        ],
        correct: 'b',
        explanation: { tr: '== referans eşitliğini karşılaştırır (iki nesne aynı bellekte mi). .equals() içerik eşitliğini karşılaştırır. String karşılaştırmasında HER ZAMAN .equals() veya .equalsIgnoreCase() kullanın.', en: '== compares references (same memory location?). .equals() compares content. ALWAYS use .equals() or .equalsIgnoreCase() for String comparison.' },
      
        retryQuestion: {
      "question": {
            "tr": "Java'da bir String değişkeninin değerinin başka bir String ile aynı olup olmadığını kontrol etmek için en doğru yöntem hangisidir?",
            "en": "Which approach is correct to verify if the value of a String variable matches another String in Java?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "using the equals() method"
            },
            {
                  "id": "b",
                  "text": "using the == operator"
            },
            {
                  "id": "c",
                  "text": "using the isEqualTo() method"
            },
            {
                  "id": "d",
                  "text": "using the sameAs() method"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "== operatörü bellek referanslarını kontrol ederken, .equals() metodu String nesnelerinin karakter dizilerini karşılaştırır. İçerik karşılaştırması için her zaman .equals() kullanılmalıdır.",
            "en": "The == operator checks memory references, while the .equals() method compares the actual character sequences of String objects. Always use .equals() for content comparison."
      }
}
},
    ],
  },
  en: {
    title: '🔤 Strings & Math',
    blocks: [
      {
        type: 'simple-box', emoji: '🔤',
        content: 'Think of a String as a chain of characters — letters threaded on a rope. Java Strings are immutable: once created, they cannot be changed in memory. Use StringBuilder for heavy concatenation.',
      },
      { type: 'heading', text: { en: 'String Methods' } },
      {
        type: 'code', language: 'java', label: 'Most important String methods',
        code: `public class Main {
    public static void main(String[] args) {
        String s = "  Hello, Java World!  ";
        System.out.println(s.length());          // 22
        System.out.println(s.toUpperCase());
        System.out.println(s.trim());
        System.out.println(s.contains("Java"));  // true
        System.out.println(s.indexOf("Java"));   // 9
        System.out.println(s.replace("Java", "Python"));
        System.out.println("hello".equals("hello")); // true
        System.out.println("Hello".substring(1, 4)); // "ell"
        System.out.println("ha".repeat(3));          // "hahaha"
    }
}`,
      },
      {
        type: 'editor', lang: 'java', label: 'String Practice',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        String name = "  John Doe  ";
        System.out.println("Trimmed: " + name.trim());
        System.out.println("Upper: " + name.trim().toUpperCase());
        System.out.println("Contains 'Doe'? " + name.contains("Doe"));
        System.out.println("Length: " + name.trim().length());
    }
}`,
        height: '200px',
      },
      { type: 'heading', text: { en: 'Math Class' } },
      {
        type: 'code', language: 'java', label: 'java.lang.Math methods',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println(Math.abs(-5));     // 5
        System.out.println(Math.max(10, 20)); // 20
        System.out.println(Math.pow(2, 10));  // 1024.0
        System.out.println(Math.sqrt(144));   // 12.0
        System.out.println(Math.round(9.7));  // 10
        System.out.println(Math.PI);          // 3.14159...
        int dice = (int)(Math.random() * 6) + 1;
        System.out.println("Dice: " + dice);
    }
}`,
      },
      {
        type: 'quiz',
        question: { en: 'Which method compares String content in Java?' },
        options: [
          { id: 'a', text: '==' },
          { id: 'b', text: '.equals()' },
          { id: 'c', text: '.compare()' },
          { id: 'd', text: '.match()' },
        ],
        correct: 'b',
        explanation: { en: '== compares references. .equals() compares content. Always use .equals() for String comparison in Java.' },
      
        retryQuestion: {
      "question": {
            "en": "What happens when you use '==' instead of '.equals()' to compare two distinct String objects in Java?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "It always returns true if the content is identical."
            },
            {
                  "id": "b",
                  "text": "It compares memory references and may return false even if content is identical."
            },
            {
                  "id": "c",
                  "text": "It causes a compilation error."
            },
            {
                  "id": "d",
                  "text": "It automatically invokes the .equals() method."
            }
      ],
      "correct": "b",
      "explanation": {
            "en": "The '==' operator checks if two references point to the exact same object instance in memory. '.equals()' is the correct way to compare the actual text content inside the String objects."
      }
}
},
    ],
  },
}

// ─── S-C: AKIŞ KONTROLÜ ───────────────────────────────────────────────────────
const sC = {
  tr: {
    title: '🔀 Akış Kontrolü — If/Else, Switch, Döngüler',
    blocks: [
      {
        type: 'simple-box', emoji: '🔀',
        content: 'Akış kontrolü, programın karar verme mekanizmasıdır. Tıpkı GPS gibi: "Sola mı döneyim, düz mü gideyim?" — if/else karar verir. "Her kavşakta kontrol et" — döngü tekrar eder.',
      },
      { type: 'heading', text: { tr: 'if / else if / else', en: 'if / else if / else' } },
      {
        type: 'code', language: 'java', label: 'if-else yapısı',
        code: `public class Main {
    public static void main(String[] args) {
        int score = 75;

        if (score >= 90) {
            System.out.println("AA");
        } else if (score >= 80) {
            System.out.println("BA");
        } else if (score >= 70) {
            System.out.println("BB");
        } else if (score >= 60) {
            System.out.println("CB");
        } else {
            System.out.println("FF");
        }

        // Kısa if (tek satır — sadece basit durumlar için)
        int time = 22;
        String greeting = (time < 18) ? "Günaydın!" : "İyi akşamlar!";
        System.out.println(greeting);

        // Ternary (üçlü operatör)
        int a = 5, b = 10;
        int bigger = (a > b) ? a : b;
        System.out.println("Büyük olan: " + bigger);
    }
}`,
        expected: `BB\nİyi akşamlar!\nBüyük olan: 10`,
      },
      {
        type: 'simulation',
        scenario: 'java-branch-runner',
        icon: '🔀',
        color: '#0891b2',
        title: { tr: 'if/else Merdiveni Canlı Çalışsın', en: 'Run the if/else Ladder Live' },
        description: {
          tr: 'Notlardaki Scanner + if örneklerini QA bakışıyla gör: kullanıcıdan gelen score değişkeni sırayla koşullardan geçer, ilk true branch output üretir.',
          en: 'See the Scanner + if examples from a QA perspective: the incoming score value moves through conditions, and the first true branch produces output.',
        },
        code: `int score = 75;

if (score >= 90) {
    System.out.println("AA");
} else if (score >= 80) {
    System.out.println("BA");
} else if (score >= 70) {
    System.out.println("BB");
} else {
    System.out.println("FF");
}

// Output: BB`,
      },
      { type: 'heading', text: { tr: 'switch Statement', en: 'switch Statement' } },
      {
        type: 'code', language: 'java', label: 'switch ve switch expression (Java 14+)',
        code: `public class Main {
    public static void main(String[] args) {
        // Geleneksel switch
        int day = 3;
        switch (day) {
            case 1: System.out.println("Pazartesi"); break;
            case 2: System.out.println("Salı"); break;
            case 3: System.out.println("Çarşamba"); break;
            case 4: System.out.println("Perşembe"); break;
            case 5: System.out.println("Cuma"); break;
            default: System.out.println("Hafta Sonu");
        }

        // Java 14+ switch expression (modern)
        String dayName = switch (day) {
            case 1 -> "Pazartesi";
            case 2 -> "Salı";
            case 3 -> "Çarşamba";
            case 4 -> "Perşembe";
            case 5 -> "Cuma";
            default -> "Hafta Sonu";
        };
        System.out.println(dayName);

        // String switch
        String browser = "Chrome";
        switch (browser) {
            case "Chrome": System.out.println("Google tarayıcısı"); break;
            case "Firefox": System.out.println("Mozilla tarayıcısı"); break;
            default: System.out.println("Diğer tarayıcı");
        }
    }
}`,
        expected: `Çarşamba\nÇarşamba\nGoogle tarayıcısı`,
      },
      {
        type: 'editor', lang: 'java', label: 'Switch pratiği — dene!',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        // Tarayıcı adına göre driver URL döndüren switch
        String browser = "Firefox"; // Chrome, Firefox veya Edge dene!

        // Modern switch expression (Java 14+)
        String driverUrl = switch (browser) {
            case "Chrome"  -> "chromedriver.exe";
            case "Firefox" -> "geckodriver.exe";
            case "Edge"    -> "msedgedriver.exe";
            default        -> throw new IllegalArgumentException("Bilinmeyen: " + browser);
        };

        System.out.println(browser + " → " + driverUrl);

        // HTTP status kodu açıklama
        int status = 404;
        String desc = switch (status) {
            case 200 -> "OK — Başarılı";
            case 201 -> "Created — Oluşturuldu";
            case 400 -> "Bad Request";
            case 401 -> "Unauthorized";
            case 403 -> "Forbidden";
            case 404 -> "Not Found";
            case 500 -> "Internal Server Error";
            default  -> "Bilinmeyen status: " + status;
        };
        System.out.println(status + " → " + desc);
    }
}`,
        height: '260px',
      },
      { type: 'heading', text: { tr: 'while ve do-while Döngüleri', en: 'while and do-while Loops' } },
      {
        type: 'code', language: 'java', label: 'while ve do-while',
        code: `public class Main {
    public static void main(String[] args) {
        // while — koşul başta kontrol edilir
        int i = 1;
        while (i <= 5) {
            System.out.print(i + " ");
            i++;
        }
        System.out.println(); // yeni satır

        // do-while — kod önce çalışır, koşul sonra kontrol edilir
        // En az 1 kez çalışması garantidir!
        int j = 1;
        do {
            System.out.print(j + " ");
            j++;
        } while (j <= 5);
        System.out.println();

        // Sonsuz döngü ve break
        int count = 0;
        while (true) {
            count++;
            if (count == 3) break; // döngüden çık
        }
        System.out.println("Count: " + count);
    }
}`,
        expected: `1 2 3 4 5 \n1 2 3 4 5 \nCount: 3`,
      },
      { type: 'heading', text: { tr: 'for ve for-each Döngüleri', en: 'for and for-each Loops' } },
      {
        type: 'code', language: 'java', label: 'for, for-each, nested loops, break/continue',
        code: `public class Main {
    public static void main(String[] args) {
        // Klasik for döngüsü
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Azalan for
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println();

        // For-each (gelişmiş for) — array veya collection için
        String[] fruits = {"Elma", "Armut", "Kiraz"};
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // break — döngüden çık
        for (int k = 0; k < 10; k++) {
            if (k == 5) break;
            System.out.print(k + " ");
        }
        System.out.println();

        // continue — bu adımı atla, devam et
        for (int k = 0; k < 10; k++) {
            if (k % 2 == 0) continue; // çift sayıları atla
            System.out.print(k + " ");
        }
        System.out.println();

        // İç içe döngü (nested loop)
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 3; col++) {
                System.out.print(row * col + "\t");
            }
            System.out.println();
        }
    }
}`,
        expected: `1 2 3 4 5 \n5 4 3 2 1 \nElma\nArmut\nKiraz\n0 1 2 3 4 \n1 3 5 7 9 \n1\t2\t3\t\n2\t4\t6\t\n3\t6\t9\t`,
      },
      {
        type: 'editor', lang: 'java', label: 'Döngü pratiği',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        // Görev 1: 1'den 10'a kadar çift sayıları yazdır
        System.out.println("Çift sayılar:");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
        
        // Görev 2: FizzBuzz — 1'den 20'ye kadar
        // 3'e bölünebiliyorsa "Fizz", 5'e bölünebiliyorsa "Buzz", ikisine de bölünebiliyorsa "FizzBuzz"
        for (int i = 1; i <= 20; i++) {
            if (i % 15 == 0) System.out.print("FizzBuzz ");
            else if (i % 3 == 0) System.out.print("Fizz ");
            else if (i % 5 == 0) System.out.print("Buzz ");
            else System.out.print(i + " ");
        }
    }
}`,
        height: '280px',
      },
      {
        type: 'quiz',
        question: { tr: 'do-while ile while döngüsü arasındaki temel fark nedir?', en: 'What is the key difference between do-while and while loops?' },
        options: [
          { id: 'a', text: 'do-while daha hızlıdır' },
          { id: 'b', text: 'do-while koşul false olsa bile en az 1 kez çalışır' },
          { id: 'c', text: 'while daha modern bir yapıdır' },
          { id: 'd', text: 'do-while sadece sayısal döngüler için kullanılır' },
        ],
        correct: 'b',
        explanation: { tr: 'do-while: önce bloğu çalıştırır, sonra koşulu kontrol eder → garantili en az 1 çalışma. while: önce koşulu kontrol eder → koşul baştan false ise hiç çalışmaz. QA\'da: kullanıcı şifre girişi gibi "en az bir kez dene" senaryoları için do-while kullanılır.', en: 'do-while: executes block first, then checks condition → guaranteed at least 1 execution. while: checks condition first → may never execute if condition is false. QA: use do-while for "retry at least once" scenarios like user password input.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir 'while' döngüsü ile 'do-while' döngüsü arasındaki yürütme mantığı farkı aşağıdakilerden hangisidir?",
            "en": "What is the difference in execution logic between a 'while' loop and a 'do-while' loop?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "while döngüsü koşul yanlış olsa bile en az bir kez çalışır",
                        "en": "while loop runs at least once even if the condition is false"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "do-while döngüsü, koşul denetimini döngü gövdesi çalışmadan önce yapar",
                        "en": "do-while loop performs the condition check before the loop body runs"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "do-while döngüsünde gövde, koşul doğrulanmasa dahi ilk seferde mutlaka çalıştırılır",
                        "en": "do-while loop body is guaranteed to run at least once even if the condition is not met"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "while döngüsü sadece sonsuz döngüler oluşturmak için tasarlanmıştır",
                        "en": "while loop is designed only for creating infinite loops"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "do-while yapısı 'post-test' döngüsüdür; yani kod bloğu önce çalışır, koşul sonra değerlendirilir. while ise 'pre-test' yapısıdır ve koşul hatalıysa döngü hiç başlamaz.",
            "en": "The do-while structure is a 'post-test' loop; the code block executes first, and then the condition is evaluated. while is a 'pre-test' structure, meaning the loop never runs if the condition is false initially."
      }
}
},
    ],
  },
  en: {
    title: '🔀 Control Flow — If/Else, Switch, Loops',
    blocks: [
      {
        type: 'simple-box', emoji: '🔀',
        content: 'Control flow is the program\'s decision-making mechanism. Like a GPS: "Turn left or go straight?" — if/else decides. "Check at every junction" — loops repeat.',
      },
      { type: 'heading', text: { en: 'if / else if / else' } },
      {
        type: 'code', language: 'java', label: 'if-else structure',
        code: `public class Main {
    public static void main(String[] args) {
        int score = 75;
        if (score >= 90) System.out.println("A");
        else if (score >= 80) System.out.println("B");
        else if (score >= 70) System.out.println("C");
        else System.out.println("F");

        // Ternary
        int time = 22;
        String greeting = (time < 18) ? "Good day!" : "Good evening!";
        System.out.println(greeting);
    }
}`,
        expected: `C\nGood evening!`,
      },
      {
        type: 'simulation',
        scenario: 'java-branch-runner',
        icon: '🔀',
        color: '#0891b2',
        title: { tr: 'if/else Merdiveni Canlı Çalışsın', en: 'Run the if/else Ladder Live' },
        description: {
          tr: 'Notlardaki Scanner + if örneklerini QA bakışıyla gör: kullanıcıdan gelen score değişkeni sırayla koşullardan geçer, ilk true branch output üretir.',
          en: 'See the Scanner + if examples from a QA perspective: the incoming score value moves through conditions, and the first true branch produces output.',
        },
        code: `int score = 75;

if (score >= 90) {
    System.out.println("AA");
} else if (score >= 80) {
    System.out.println("BA");
} else if (score >= 70) {
    System.out.println("BB");
} else {
    System.out.println("FF");
}

// Output: BB`,
      },
      { type: 'heading', text: { en: 'for and for-each Loops' } },
      {
        type: 'code', language: 'java', label: 'Loops',
        code: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) System.out.print(i + " ");
        System.out.println();

        String[] fruits = {"Apple", "Banana", "Cherry"};
        for (String fruit : fruits) System.out.println(fruit);

        // break and continue
        for (int k = 0; k < 10; k++) {
            if (k % 2 == 0) continue;
            if (k == 7) break;
            System.out.print(k + " ");
        }
    }
}`,
        expected: `1 2 3 4 5 \nApple\nBanana\nCherry\n1 3 5 `,
      },
      {
        type: 'editor', lang: 'java', label: 'Loop Practice',
        defaultCode: `public class Main {
    public static void main(String[] args) {
        // FizzBuzz 1-20
        for (int i = 1; i <= 20; i++) {
            if (i % 15 == 0) System.out.print("FizzBuzz ");
            else if (i % 3 == 0) System.out.print("Fizz ");
            else if (i % 5 == 0) System.out.print("Buzz ");
            else System.out.print(i + " ");
        }
    }
}`,
        height: '200px',
      },
      {
        type: 'quiz',
        question: { en: 'What is the key difference between do-while and while?' },
        options: [
          { id: 'a', text: 'do-while is faster' },
          { id: 'b', text: 'do-while executes at least once even if condition is false' },
          { id: 'c', text: 'while is more modern' },
          { id: 'd', text: 'do-while only works with numbers' },
        ],
        correct: 'b',
        explanation: { en: 'do-while: runs block first, then checks condition → guaranteed at least 1 execution. while: checks condition first → may never run.' },
      
        retryQuestion: {
      "question": {
            "en": "Why might a tester choose a do-while loop over a while loop when implementing a test retry mechanism?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "It is syntactically shorter than a while loop"
            },
            {
                  "id": "b",
                  "text": "It ensures the test logic inside the block runs at least once before evaluating the retry condition"
            },
            {
                  "id": "c",
                  "text": "It prevents the browser from crashing"
            },
            {
                  "id": "d",
                  "text": "It is the only way to handle asynchronous test steps"
            }
      ],
      "correct": "b",
      "explanation": {
            "en": "In scenarios like retrying a login attempt or re-fetching an element, we always want the action to occur at least once before checking the status/condition; do-while guarantees this execution order."
      }
}
},
    ],
  },
}

// ─── S-D: ARRAYS ──────────────────────────────────────────────────────────────
const sD = {
  tr: {
    title: '📦 Arrays — Diziler',
    blocks: [
      {
        type: 'simple-box', emoji: '📦',
        content: 'Array\'i bir otopark gibi düşün: her otopark yeri (index) numaralıdır ve sadece bir araba (değer) alır. 0\'dan başlar! 5 yerli bir otopark: [0], [1], [2], [3], [4]. Doluluğu baştan belirlenir, sonra değiştirilemez.',
      },
      {
        type: 'visual',
        variant: 'data-structure',
        dataType: 'list',
        title: 'Array Park Yeri Modeli',
        items: [
          { value: '10' },
          { value: '20' },
          { value: '30', highlighted: true },
          { value: '40' },
          { value: '50' },
        ],
        note: 'nums[2] üçüncü kutudur. Java array indexleri 0 ile başlar; nums[5] bu dizide yoktur.',
      },
      { type: 'heading', text: { tr: 'Tek Boyutlu Dizi', en: 'One-Dimensional Array' } },
      {
        type: 'code', language: 'java', label: 'Array tanımlama, erişim, döngü',
        code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // Array tanımlama — yöntem 1
        int[] nums = {10, 20, 30, 40, 50};

        // Array tanımlama — yöntem 2
        String[] fruits = new String[3];
        fruits[0] = "Elma";
        fruits[1] = "Armut";
        fruits[2] = "Kiraz";

        // Elemanlara erişim
        System.out.println(nums[0]);   // 10 (ilk eleman)
        System.out.println(nums[4]);   // 50 (son eleman)
        System.out.println(nums.length); // 5 (uzunluk — metod değil, field!)

        // Eleman güncelle
        nums[2] = 99;

        // for-each ile döngü
        for (int n : nums) {
            System.out.print(n + " ");
        }
        System.out.println();

        // Arrays utility
        System.out.println(Arrays.toString(nums));  // [10, 20, 99, 40, 50]
        Arrays.sort(nums);                          // sıralama
        System.out.println(Arrays.toString(nums));  // [10, 20, 40, 50, 99]

        int idx = Arrays.binarySearch(nums, 40);   // binary search (sıralı dizi)
        System.out.println("40 index: " + idx);

        // Arrays.copyOf
        int[] copy = Arrays.copyOf(nums, 3);        // ilk 3 elemanı kopyala
        System.out.println(Arrays.toString(copy));  // [10, 20, 40]
    }
}`,
        expected: `10\n50\n5\n10 20 99 40 50 \n[10, 20, 99, 40, 50]\n[10, 20, 40, 50, 99]\n40 index: 2\n[10, 20, 40]`,
      },
      { type: 'heading', text: { tr: 'Çok Boyutlu Dizi (2D Array)', en: 'Multi-dimensional Arrays' } },
      {
        type: 'code', language: 'java', label: '2D Array (matris)',
        code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // 2D Array tanımlama — 3 satır, 3 sütun
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // Elemana erişim: [satır][sütun]
        System.out.println(matrix[0][0]); // 1 (sol-üst)
        System.out.println(matrix[1][2]); // 6 (2. satır, 3. sütun)
        System.out.println(matrix[2][2]); // 9 (sağ-alt)

        // 2D döngü
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.print(val + "\t");
            }
            System.out.println();
        }

        // Boyut bilgisi
        System.out.println("Satır: " + matrix.length);       // 3
        System.out.println("Sütun: " + matrix[0].length);    // 3
    }
}`,
        expected: `1\n6\n9\n1\t2\t3\t\n4\t5\t6\t\n7\t8\t9\t\nSatır: 3\nSütun: 3`,
      },
      {
        type: 'editor', lang: 'java', label: 'Array pratiği',
        defaultCode: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // Görev: Bir not dizisinin ortalamasını bul
        double[] notlar = {85.5, 92.0, 78.0, 95.5, 88.0};
        
        double toplam = 0;
        for (double not : notlar) {
            toplam += not;
        }
        double ortalama = toplam / notlar.length;
        System.out.println("Ortalama: " + ortalama);
        
        // En yüksek notu bul
        Arrays.sort(notlar);
        System.out.println("En yüksek: " + notlar[notlar.length - 1]);
        System.out.println("En düşük: " + notlar[0]);
        
        // Kendi deneyin:
    }
}`,
        height: '240px',
      },
      {
        type: 'quiz',
        question: { tr: 'Java\'da 5 elemanlı bir array\'de son elemana erişmek için hangi index kullanılır?', en: 'To access the last element of a 5-element Java array, which index do you use?' },
        options: [
          { id: 'a', text: '5' },
          { id: 'b', text: '4' },
          { id: 'c', text: '-1' },
          { id: 'd', text: 'length' },
        ],
        correct: 'b',
        explanation: { tr: 'Java dizileri 0\'dan başlar. 5 elemanlı dizinin indexleri: 0, 1, 2, 3, 4. Son eleman array[array.length - 1] = array[4]. array[5] → ArrayIndexOutOfBoundsException!', en: 'Java arrays start at index 0. A 5-element array has indices 0, 1, 2, 3, 4. Last element: array[array.length - 1] = array[4]. array[5] → ArrayIndexOutOfBoundsException!' },
      
        retryQuestion: {
      "question": {
            "tr": "Java programlamada, 10 elemanlı bir dizinin (array) sonuncu elemanına hangi indeks numarası ile ulaşılır?",
            "en": "In Java programming, which index number is used to access the last element of an array with 10 elements?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "10",
                        "en": "10"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "9",
                        "en": "9"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "1",
                        "en": "1"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "0",
                        "en": "0"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Java'da diziler sıfır tabanlı indekslemeye sahiptir (0-indexed). Bu nedenle n elemanlı bir dizinin son indeksi her zaman 'n-1'dir. 10 elemanlı bir dizide son indeks 9'dur.",
            "en": "Java uses zero-based indexing for arrays. Therefore, the last index of an array with n elements is always 'n-1'. For an array with 10 elements, the last index is 9."
      }
}
},
    ],
  },
  en: {
    title: '📦 Arrays',
    blocks: [
      {
        type: 'simple-box', emoji: '📦',
        content: 'Think of an array like a numbered parking lot: each spot (index) has a number starting from 0, and holds one value. Size is fixed at creation.',
      },
      {
        type: 'visual',
        variant: 'data-structure',
        dataType: 'list',
        title: 'Array Parking Lot Model',
        items: [
          { value: '10' },
          { value: '20' },
          { value: '30', highlighted: true },
          { value: '40' },
          { value: '50' },
        ],
        note: 'nums[2] is the third box. Java array indices start at 0; nums[5] does not exist in this array.',
      },
      { type: 'heading', text: { en: 'One-Dimensional Array' } },
      {
        type: 'code', language: 'java', label: 'Array basics',
        code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] nums = {10, 20, 30, 40, 50};
        System.out.println(nums[0]);       // 10
        System.out.println(nums.length);   // 5
        
        for (int n : nums) System.out.print(n + " ");
        System.out.println();
        
        Arrays.sort(nums);
        System.out.println(Arrays.toString(nums));
    }
}`,
      },
      {
        type: 'editor', lang: 'java', label: 'Array Practice',
        defaultCode: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        double[] grades = {85.5, 92.0, 78.0, 95.5, 88.0};
        double sum = 0;
        for (double g : grades) sum += g;
        System.out.println("Average: " + (sum / grades.length));
        
        Arrays.sort(grades);
        System.out.println("Max: " + grades[grades.length - 1]);
        System.out.println("Min: " + grades[0]);
    }
}`,
        height: '220px',
      },
      {
        type: 'quiz',
        question: { en: 'Last element index of a 5-element Java array?' },
        options: [
          { id: 'a', text: '5' },
          { id: 'b', text: '4' },
          { id: 'c', text: '-1' },
          { id: 'd', text: 'length' },
        ],
        correct: 'b',
        explanation: { en: 'Java arrays start at 0. 5-element array has indices 0,1,2,3,4. Last: array[4] or array[array.length-1].' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "en": "What is the index of the first element in a Java array containing 10 elements?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "1"
            },
            {
                  "id": "b",
                  "text": "0"
            },
            {
                  "id": "c",
                  "text": "10"
            },
            {
                  "id": "d",
                  "text": "9"
            }
      ],
      "correct": "b",
      "explanation": {
            "en": "Java uses zero-based indexing for arrays. Therefore, the first element of any array is always at index 0, regardless of the array's total size."
      }
}
},
    ],
  },
}

// ─── S-E: METHODS ─────────────────────────────────────────────────────────────
const sE = {
  tr: {
    title: '🔧 Methods — Metodlar & Scanner (User Input)',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Method\'u bir kısa yol tuşu gibi düşün: "Ctrl+S" bastığında aynı birkaç adım her seferinde otomatik yapılır. Metot da böyle: bir kere yaz, istediğin kadar çağır. Kod tekrarını önler ve okunabilirliği artırır.',
      },
      {
        type: 'visual', variant: 'flow',
        title: 'Method Çağrısı Nasıl Akar?',
        steps: [
          { num: 1, label: 'Argument', desc: 'add(5, 3)', highlight: true },
          { num: 2, label: 'Parameter', desc: 'a=5, b=3' },
          { num: 3, label: 'Body', desc: 'a + b hesaplanır' },
          { num: 4, label: 'return', desc: '8 geri döner', highlight: true },
          { num: 5, label: 'Caller', desc: 'result = 8' },
        ],
        note: 'Notlardaki public int myFirstMethod() parçalama mantığı burada çağrı akışı olarak gösteriliyor.',
      },
      { type: 'heading', text: { tr: 'Metot Tanımlama ve Çağırma', en: 'Method Definition and Calling' } },
      {
        type: 'code', language: 'java', label: 'Metot yapısı — parametreler ve return',
        code: `public class Main {

    // Dönüş değersiz metot (void)
    static void greet(String name) {
        System.out.println("Merhaba, " + name + "!");
    }

    // Dönüş değerli metot
    static int add(int a, int b) {
        return a + b;
    }

    // Çoklu parametre, varsayılan hesaplama
    static double calculateBMI(double weight, double height) {
        return weight / (height * height);
    }

    // Recursive (özyinelemeli) metot
    static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1); // kendini çağırır
    }

    public static void main(String[] args) {
        greet("Java");           // Merhaba, Java!
        greet("World");          // Merhaba, World!

        int result = add(5, 3);
        System.out.println("5 + 3 = " + result); // 8

        double bmi = calculateBMI(70, 1.75);
        System.out.printf("BMI: %.2f%n", bmi);   // BMI: 22.86

        System.out.println("5! = " + factorial(5)); // 120
    }
}`,
        expected: `Merhaba, Java!\nMerhaba, World!\n5 + 3 = 8\nBMI: 22.86\n5! = 120`,
      },
      { type: 'heading', text: { tr: 'Method Overloading — Metot Aşırı Yükleme', en: 'Method Overloading' } },
      {
        type: 'code', language: 'java', label: 'Overloading — aynı isim, farklı parametreler',
        code: `public class Main {
    // Aynı isimli metodlar — parametre sayısı/tipi farklı
    static int multiply(int a, int b) {
        return a * b;
    }
    static double multiply(double a, double b) {
        return a * b;
    }
    static int multiply(int a, int b, int c) {
        return a * b * c;
    }

    // QA'da overloading örneği: farklı assertion metodları
    static void assertElement(String id) {
        System.out.println("ID ile bulunuyor: " + id);
    }
    static void assertElement(String id, int timeout) {
        System.out.println("ID: " + id + ", timeout: " + timeout + "s");
    }
    static void assertElement(String id, String text) {
        System.out.println("ID: " + id + " text'i içermeli: " + text);
    }

    public static void main(String[] args) {
        System.out.println(multiply(2, 3));      // 6 (int)
        System.out.println(multiply(2.5, 3.0));  // 7.5 (double)
        System.out.println(multiply(2, 3, 4));   // 24 (3 param)

        assertElement("loginBtn");
        assertElement("loginBtn", 10);
        assertElement("loginBtn", "Giriş Yap");
    }
}`,
        expected: `6\n7.5\n24\nID ile bulunuyor: loginBtn\nID: loginBtn, timeout: 10s\nID: loginBtn text'i içermeli: Giriş Yap`,
      },
      { type: 'heading', text: { tr: 'Scanner — Kullanıcıdan Girdi Alma', en: 'Scanner — User Input' } },
      {
        type: 'code', language: 'java', label: 'java.util.Scanner kullanımı',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Adınızı girin: ");
        String name = sc.nextLine();    // metin okur (boşluk dahil)

        System.out.print("Yaşınızı girin: ");
        int age = sc.nextInt();         // tam sayı okur

        System.out.print("Kilonuzu girin (kg): ");
        double weight = sc.nextDouble(); // ondalıklı sayı okur

        System.out.println("\\nMerhaba " + name + "!");
        System.out.println("Yaşınız: " + age);
        System.out.printf("Kilonuz: %.1f kg%n", weight);

        sc.close(); // Scanner'ı kapat

        // NOT: Simülatörde çalıştıramazsınız (System.in gerekli)
        // Aşağıdaki örnek sabit değerlerle çalışır:
        System.out.println("--- Sabit değer örneği ---");
        String testUser = "Ahmet";
        int testAge = 25;
        System.out.println("Kullanıcı: " + testUser + ", Yaş: " + testAge);
    }
}`,
      },
      {
        type: 'editor', lang: 'java', label: 'Metot pratiği',
        defaultCode: `public class Main {
    
    // Asal sayı kontrolü
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    // Fibonacci dizisi
    static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        // 1'den 20'ye kadar asal sayıları bul
        System.out.println("Asal sayılar (1-20):");
        for (int i = 2; i <= 20; i++) {
            if (isPrime(i)) System.out.print(i + " ");
        }
        System.out.println();
        
        // İlk 10 Fibonacci sayısı
        System.out.println("Fibonacci:");
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
    }
}`,
        height: '300px',
      },
      {
        type: 'quiz',
        question: { tr: 'Method overloading nedir?', en: 'What is method overloading?' },
        options: [
          { id: 'a', text: 'Bir metodu başka bir sınıftan miras almak' },
          { id: 'b', text: 'Aynı isimde farklı parametreli birden fazla metot tanımlamak' },
          { id: 'c', text: 'Bir metodu @Override ile geçersiz kılmak' },
          { id: 'd', text: 'static metot tanımlamak' },
        ],
        correct: 'b',
        explanation: { tr: 'Method overloading: aynı sınıfta aynı isimli ama farklı parametre (sayı, tip, sıra) metotlar. Compiler hangi versiyonu çağıracağını parametreye göre belirler. Overriding\'den farklıdır: overriding alt sınıfta miras alınan metodu yeniden tanımlamaktır.', en: 'Method overloading: same class, same method name, different parameters (count, type, order). Compiler determines which version to call based on parameters. Different from overriding (redefining inherited method in subclass).' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Java'da Method Overriding ne anlama gelir?",
            "en": "What does method overriding mean in Java?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Aynı isimli ama farklı parametrelere sahip metotlar tanımlamak"
            },
            {
                  "id": "b",
                  "text": "Statik bir metodu başka bir sınıftan çağırmak"
            },
            {
                  "id": "c",
                  "text": "Alt sınıfta, üst sınıftan miras alınan bir metodun gövdesini yeniden tanımlamak"
            },
            {
                  "id": "d",
                  "text": "Sınıf içinde özel (private) bir metot oluşturmak"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Method overriding, alt sınıfın üst sınıftaki bir metodun implementasyonunu kendi ihtiyaçlarına göre değiştirmesidir. @Override anatasyonu ile belirtilir ve çok biçimliliğin (polymorphism) bir parçasıdır.",
            "en": "Method overriding is the process where a subclass provides a specific implementation for a method already defined in its superclass. It is indicated by the @Override annotation and is a key component of polymorphism."
      }
}
},
    ],
  },
  en: {
    title: '🔧 Methods & Scanner (User Input)',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Think of a method like a keyboard shortcut: "Ctrl+S" triggers the same sequence every time. Write once, call many times. Prevents code repetition.',
      },
      {
        type: 'visual', variant: 'flow',
        title: 'How a Method Call Flows',
        steps: [
          { num: 1, label: 'Argument', desc: 'add(5, 3)', highlight: true },
          { num: 2, label: 'Parameter', desc: 'a=5, b=3' },
          { num: 3, label: 'Body', desc: 'a + b is calculated' },
          { num: 4, label: 'return', desc: '8 comes back', highlight: true },
          { num: 5, label: 'Caller', desc: 'result = 8' },
        ],
        note: 'The notes split public int myFirstMethod() into visible parts; this shows the runtime call flow.',
      },
      { type: 'heading', text: { en: 'Method Definition and Calling' } },
      {
        type: 'code', language: 'java', label: 'Method structure',
        code: `public class Main {
    static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
    static int add(int a, int b) { return a + b; }
    static int factorial(int n) {
        return (n <= 1) ? 1 : n * factorial(n - 1);
    }

    public static void main(String[] args) {
        greet("Java");
        System.out.println("5 + 3 = " + add(5, 3));
        System.out.println("5! = " + factorial(5));
    }
}`,
        expected: `Hello, Java!\n5 + 3 = 8\n5! = 120`,
      },
      {
        type: 'editor', lang: 'java', label: 'Method Practice',
        defaultCode: `public class Main {
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i <= Math.sqrt(n); i++)
            if (n % i == 0) return false;
        return true;
    }
    
    public static void main(String[] args) {
        System.out.print("Primes (1-30): ");
        for (int i = 2; i <= 30; i++)
            if (isPrime(i)) System.out.print(i + " ");
    }
}`,
        height: '220px',
      },
      {
        type: 'quiz',
        question: { en: 'What is method overloading?' },
        options: [
          { id: 'a', text: 'Inheriting a method from another class' },
          { id: 'b', text: 'Defining multiple methods with the same name but different parameters' },
          { id: 'c', text: 'Overriding a method with @Override' },
          { id: 'd', text: 'Declaring a static method' },
        ],
        correct: 'b',
        explanation: { en: 'Overloading: same class, same name, different parameters (count, type, order). Different from overriding (redefining an inherited method in a subclass).' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "en": "In Java, what occurs when you define multiple methods with the same name but different parameter lists within the same class?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Compilation error"
            },
            {
                  "id": "b",
                  "text": "Method overriding"
            },
            {
                  "id": "c",
                  "text": "Method overloading"
            },
            {
                  "id": "d",
                  "text": "Method encapsulation"
            }
      ],
      "correct": "c",
      "explanation": {
            "en": "This is the definition of method overloading. It allows a class to perform similar tasks using the same name, provided the parameter signatures (type, number, or order) are distinct."
      }
}
},
    ],
  },
}

// ─── S-F: ADVANCED OOP + EXCEPTIONS + LAMBDA ─────────────────────────────────
const sF = {
  tr: {
    title: '🎯 Advanced OOP — Enum, Date/Time, Exceptions, Lambda',
    blocks: [
      {
        type: 'simple-box', emoji: '🎯',
        content: 'Enum\'u trafik ışığı gibi düşün: sadece 3 seçenek var — KIRMIZI, SARI, YEŞİL. Başka şey olamaz. Exceptions ise otoyoldaki kaza gibi: normal akış bozulur, hata yönetimi devreye girer. Lambda ise kısayol yöntemi — tek satırda fonksiyon.',
      },
      { type: 'heading', text: { tr: 'Enums — Sabit Değer Kümeleri', en: 'Enums' } },
      {
        type: 'code', language: 'java', label: 'Enum tanımlama ve kullanma',
        code: `public class Main {

    // Enum — sabit değer kümesi
    enum Day {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }

    // Metodlu Enum (QA'da çok kullanılır: Browser tipi, Environment)
    enum Browser {
        CHROME("chrome"), FIREFOX("firefox"), EDGE("edge");

        private final String driverName;
        Browser(String driverName) { this.driverName = driverName; }
        public String getDriverName() { return driverName; }
    }

    enum Environment {
        DEV("https://dev.example.com"),
        QA("https://qa.example.com"),
        PROD("https://prod.example.com");

        private final String url;
        Environment(String url) { this.url = url; }
        public String getUrl() { return url; }
    }

    public static void main(String[] args) {
        Day today = Day.WEDNESDAY;
        System.out.println("Bugün: " + today);

        // switch ile enum
        switch (today) {
            case SATURDAY:
            case SUNDAY:
                System.out.println("Hafta sonu!"); break;
            default:
                System.out.println("İş günü");
        }

        // Enum metodları
        System.out.println(today.name());     // "WEDNESDAY"
        System.out.println(today.ordinal());  // 2 (0'dan sayılır)

        // Enum array
        for (Day d : Day.values()) System.out.print(d + " ");
        System.out.println();

        // QA Enum kullanımı
        Browser b = Browser.CHROME;
        System.out.println("Driver: " + b.getDriverName());

        Environment env = Environment.QA;
        System.out.println("URL: " + env.getUrl());
    }
}`,
        expected: `Bugün: WEDNESDAY\nİş günü\nWEDNESDAY\n2\nMONDAY TUESDAY WEDNESDAY THURSDAY FRIDAY SATURDAY SUNDAY \nDriver: chrome\nURL: https://qa.example.com`,
      },
      { type: 'heading', text: { tr: 'Date / Time (Java 8+ LocalDate)', en: 'Date / Time (Java 8+ LocalDate)' } },
      {
        type: 'code', language: 'java', label: 'java.time API — modern tarih/saat',
        code: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        // Tarih
        LocalDate today = LocalDate.now();
        System.out.println("Bugün: " + today); // 2024-01-15

        LocalDate tomorrow = today.plusDays(1);
        System.out.println("Yarın: " + tomorrow);

        // Saat
        LocalTime now = LocalTime.now();
        System.out.println("Şimdi: " + now);

        // Tarih + Saat
        LocalDateTime dt = LocalDateTime.now();
        System.out.println("DateTime: " + dt);

        // Formatlama
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        System.out.println("Formatli: " + dt.format(fmt));

        // Belirli tarih oluşturma
        LocalDate birthday = LocalDate.of(1990, 6, 15);
        System.out.println("Doğum: " + birthday);

        // Karşılaştırma
        System.out.println(today.isAfter(birthday));  // true
        System.out.println(today.isBefore(tomorrow)); // true

        // Fark hesaplama
        long days = java.time.temporal.ChronoUnit.DAYS.between(birthday, today);
        System.out.println("Gün farkı: " + days);
    }
}`,
      },
      { type: 'heading', text: { tr: 'Exceptions — İstisna Yönetimi', en: 'Exceptions — Exception Handling' } },
      {
        type: 'code', language: 'java', label: 'try-catch-finally ve custom exception',
        code: `public class Main {

    // Özel exception sınıfı
    static class InvalidAgeException extends RuntimeException {
        public InvalidAgeException(String message) {
            super(message);
        }
    }

    static void validateAge(int age) {
        if (age < 0 || age > 150) {
            throw new InvalidAgeException("Geçersiz yaş: " + age);
        }
        System.out.println("Yaş geçerli: " + age);
    }

    public static void main(String[] args) {
        // try-catch-finally
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]); // ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Dizi sınırı aşıldı: " + e.getMessage());
        } finally {
            System.out.println("finally her zaman çalışır!");
        }

        // Çoklu catch
        try {
            String s = null;
            System.out.println(s.length()); // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Null referans: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Genel hata: " + e.getMessage());
        }

        // Custom exception
        try {
            validateAge(25);
            validateAge(-5);
        } catch (InvalidAgeException e) {
            System.out.println("Hata: " + e.getMessage());
        }

        // try-with-resources (Java 7+) — otomatik kapanır
        // try (Scanner sc = new Scanner(System.in)) { ... }

        // Multi-catch (Java 7+)
        try {
            Object obj = "text";
            Integer n = (Integer) obj; // ClassCastException
        } catch (ClassCastException | IllegalArgumentException e) {
            System.out.println("Cast veya argüman hatası: " + e.getClass().getSimpleName());
        }
    }
}`,
        expected: `Dizi sınırı aşıldı: Index 10 out of bounds for length 3\nfinally her zaman çalışır!\nNull referans: Cannot invoke "String.length()" because "s" is null\nYaş geçerli: 25\nHata: Geçersiz yaş: -5\nCast veya argüman hatası: ClassCastException`,
      },
      { type: 'heading', text: { tr: 'Lambda Expressions & Functional Interface', en: 'Lambda Expressions' } },
      {
        type: 'code', language: 'java', label: 'Lambda ifadeleri ve Stream API',
        code: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // Lambda — anonim fonksiyon kısayolu
        // Syntax: (parametre) -> {gövde}

        // Eski yol (anonim sınıf)
        Runnable r1 = new Runnable() {
            public void run() { System.out.println("Eski yol"); }
        };

        // Lambda ile
        Runnable r2 = () -> System.out.println("Lambda!");
        r1.run();
        r2.run();

        // Functional interface örnekleri
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println(isEven.test(4));  // true
        System.out.println(isEven.test(7));  // false

        Function<String, Integer> strLen = s -> s.length();
        System.out.println(strLen.apply("Java"));   // 4

        Consumer<String> printer = s -> System.out.println(">> " + s);
        printer.accept("Lambda consumer");

        // Stream API — koleksiyonlarla lambda
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Filtrele + topla
        int sumOfEvens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue)
            .sum();
        System.out.println("Çift sayılar toplamı: " + sumOfEvens); // 30

        // Map + collect
        List<String> doubled = numbers.stream()
            .filter(n -> n <= 5)
            .map(n -> n + " -> " + (n * 2))
            .collect(Collectors.toList());
        doubled.forEach(System.out::println);

        // Method reference — ::
        List<String> names = Arrays.asList("Ahmet", "Mehmet", "Ayşe");
        names.forEach(System.out::println); // method reference
    }
}`,
        expected: `Eski yol\nLambda!\ntrue\nfalse\n4\n>> Lambda consumer\nÇift sayılar toplamı: 30\n1 -> 2\n2 -> 4\n3 -> 6\n4 -> 8\n5 -> 10\nAhmet\nMehmet\nAyşe`,
      },
      {
        type: 'editor', lang: 'java', label: 'Exception & Lambda pratiği',
        defaultCode: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // Görev 1: Exception yakalamayı dene
        try {
            int result = 10 / 0;  // ArithmeticException
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Sıfıra bölme hatası: " + e.getMessage());
        }
        
        // Görev 2: Stream API ile kelime listesi
        List<String> words = Arrays.asList("java", "python", "typescript", "sql", "selenium");
        
        // 6 harften uzun kelimeleri büyük harfe çevir ve listele
        words.stream()
            .filter(w -> w.length() > 6)
            .map(String::toUpperCase)
            .sorted()
            .forEach(System.out::println);
    }
}`,
        height: '280px',
      },
      {
        type: 'quiz',
        question: { tr: 'finally bloğu ne zaman çalışır?', en: 'When does the finally block execute?' },
        options: [
          { id: 'a', text: 'Sadece exception fırlatıldığında' },
          { id: 'b', text: 'Sadece exception fırlatılmadığında' },
          { id: 'c', text: 'Her durumda — exception olsun ya da olmasın' },
          { id: 'd', text: 'Sadece try bloğu başarılı olduğunda' },
        ],
        correct: 'c',
        explanation: { tr: 'finally bloğu HER ZAMAN çalışır: try başarılı olsa da, catch yakalasa da. Exception yeniden fırlatılsa bile çalışır. QA\'da driver.quit() ve dosya kapatma işlemleri finally\'de yapılır — test fail etse bile kaynaklar serbest bırakılır.', en: 'The finally block ALWAYS executes: whether try succeeds or catch catches. Even if exception is rethrown. In QA: driver.quit() and file close operations go in finally — resources released even if test fails.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir try-catch yapısında, try bloğu içerisinde hata alınmasa dahi çalışan ve kaynak temizliği için kullanılan blok hangisidir?",
            "en": "In a try-catch structure, which block is guaranteed to run even if no exception is thrown, commonly used for resource cleanup?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "catch bloğu",
                        "en": "catch block"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "throw bloğu",
                        "en": "throw block"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "finally bloğu",
                        "en": "finally block"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "try bloğu",
                        "en": "try block"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "finally bloğu, try ve catch bloklarının sonucundan bağımsız olarak her zaman çalışır. QA süreçlerinde driver.quit() gibi işlemler için en güvenli yerdir.",
            "en": "The finally block always runs regardless of the outcome of try and catch. It is the safest place for cleanup operations like driver.quit() in QA processes."
      }
}
},
    ],
  },
  en: {
    title: '🎯 Advanced OOP — Enum, Date/Time, Exceptions, Lambda',
    blocks: [
      {
        type: 'simple-box', emoji: '🎯',
        content: 'Think of Enum like a traffic light: only 3 options — RED, YELLOW, GREEN. Nothing else. Exceptions are like accidents on the highway: normal flow is disrupted, error handling kicks in. Lambda is a shorthand method — function in one line.',
      },
      { type: 'heading', text: { en: 'Enums' } },
      {
        type: 'code', language: 'java', label: 'Enum definition and usage',
        code: `public class Main {
    enum Browser {
        CHROME("chrome"), FIREFOX("firefox"), EDGE("edge");
        private final String driver;
        Browser(String driver) { this.driver = driver; }
        public String getDriver() { return driver; }
    }

    enum Environment {
        DEV("https://dev.example.com"), QA("https://qa.example.com");
        private final String url;
        Environment(String url) { this.url = url; }
        public String getUrl() { return url; }
    }

    public static void main(String[] args) {
        Browser b = Browser.CHROME;
        System.out.println("Driver: " + b.getDriver());
        System.out.println("URL: " + Environment.QA.getUrl());
        for (Browser br : Browser.values()) System.out.print(br + " ");
    }
}`,
      },
      { type: 'heading', text: { en: 'Exceptions — try-catch-finally' } },
      {
        type: 'code', language: 'java', label: 'Exception handling',
        code: `public class Main {
    static class InvalidAgeException extends RuntimeException {
        public InvalidAgeException(String msg) { super(msg); }
    }

    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]); // throws!
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("finally always runs!");
        }

        try {
            throw new InvalidAgeException("Age -5 is invalid");
        } catch (InvalidAgeException e) {
            System.out.println("Custom: " + e.getMessage());
        }
    }
}`,
      },
      { type: 'heading', text: { en: 'Lambda Expressions & Stream API' } },
      {
        type: 'code', language: 'java', label: 'Lambda and Stream',
        code: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1,2,3,4,5,6,7,8,9,10);
        
        int sumEvens = nums.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue).sum();
        System.out.println("Sum of evens: " + sumEvens);

        List<String> names = Arrays.asList("Alice","Bob","Charlie","Dave");
        names.stream()
            .filter(n -> n.length() > 3)
            .map(String::toUpperCase)
            .sorted()
            .forEach(System.out::println);
    }
}`,
      },
      {
        type: 'editor', lang: 'java', label: 'Exception & Lambda Practice',
        defaultCode: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("Finally runs!");
        }
        
        List<String> langs = Arrays.asList("java","python","typescript","sql");
        langs.stream()
            .filter(l -> l.length() > 4)
            .map(String::toUpperCase)
            .forEach(System.out::println);
    }
}`,
        height: '260px',
      },
      {
        type: 'quiz',
        question: { en: 'When does the finally block execute?' },
        options: [
          { id: 'a', text: 'Only when exception is thrown' },
          { id: 'b', text: 'Only when no exception is thrown' },
          { id: 'c', text: 'Always — whether exception occurs or not' },
          { id: 'd', text: 'Only when try succeeds' },
        ],
        correct: 'c',
        explanation: { en: 'finally ALWAYS executes. Perfect for cleanup: driver.quit(), closing files, releasing resources — even if the test fails.' },
      
        retryQuestion: {
      "question": {
            "en": "Why is the finally block used in test automation frameworks?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "To handle errors that occurred during the test execution"
            },
            {
                  "id": "b",
                  "text": "To stop the test if an error occurs"
            },
            {
                  "id": "c",
                  "text": "To ensure cleanup tasks like closing the browser run regardless of test success or failure"
            },
            {
                  "id": "d",
                  "text": "To repeat the test if it fails"
            }
      ],
      "correct": "c",
      "explanation": {
            "en": "The finally block is critical in QA to guarantee that resources like browser drivers are closed or network connections are terminated, preventing memory leaks or hung processes even if the test fails."
      }
}
},
    ],
  },
}

// ─── S-CUCUMBER: BDD & CUCUMBER ──────────────────────────────────────────────
const sCucumber = {
  tr: {
    title: '🥒 Cucumber — BDD & Gherkin ile Test Otomasyonu',
    blocks: [
      {
        type: 'simple-box', emoji: '🥒',
        content: 'Cucumber\'ı bir çeviri servisi gibi düşün: iş analisti "Kullanıcı giriş yapmalı" yazıyor, QA mühendisi bu cümleyi otomatik teste çeviriyor. Herkes aynı Gherkin dilini konuşuyor. Java\'da JUnit5 veya TestNG runner\'ı ile birlikte çalışır — ikisi de desteklenir.',
      },
      {
        type: 'table',
        headers: ['Özellik', 'JUnit5', 'TestNG', 'Cucumber'],
        rows: [
          ['Amaç', 'Unit/Integration test', 'Test suite yönetimi', 'BDD — İş senaryosu odaklı'],
          ['Test dili', 'Java', 'Java', 'Gherkin (Given/When/Then) + Java'],
          ['Kim okur?', 'Developer / QA', 'Developer / QA', 'Developer + QA + PO + Analist'],
          ['Runner', 'Kendi içinde', 'Kendi içinde', 'JUnit5 veya TestNG runner kullanır'],
          ['Feature file', 'Yok', 'Yok', '.feature uzantılı Gherkin dosyası'],
          ['Data-driven', '@ParameterizedTest', '@DataProvider', 'Scenario Outline + Examples'],
        ],
      },
      { type: 'heading', text: { tr: 'Gherkin Sözdizimi — Feature Dosyası', en: 'Gherkin Syntax — Feature File' } },
      {
        type: 'code', language: 'gherkin', label: 'login.feature — Gherkin örneği',
        code: `# src/test/resources/features/login.feature
Feature: Kullanıcı Giriş İşlemleri
  Bir kullanıcı olarak platforma güvenli şekilde giriş yapabilmeliyim

  Background:
    Given tarayıcı açık ve login sayfasında

  @smoke @critical
  Scenario: Geçerli kullanıcı ile başarılı giriş
    When "admin" kullanıcı adı ve "admin123" şifresiyle giriş yapar
    Then dashboard sayfasına yönlendirilmeli
    And hoş geldiniz mesajı görünmeli

  @regression @negative
  Scenario: Yanlış şifre ile giriş reddedilmeli
    When "admin" kullanıcı adı ve "yanlis" şifresiyle giriş yapar
    Then "Geçersiz kullanıcı adı veya şifre" hata mesajı görünmeli

  Scenario Outline: Çoklu kullanıcı data-driven testi
    When "<username>" kullanıcı adı ve "<password>" şifresiyle giriş yapar
    Then sonuç "<result>" olmalı

    Examples:
      | username | password | result  |
      | admin    | admin123 | SUCCESS |
      | user1    | pass1    | SUCCESS |
      | wrong    | wrong123 | FAILURE |`,
      },
      { type: 'heading', text: { tr: 'Step Definitions — Gherkin → Java', en: 'Step Definitions' } },
      {
        type: 'code', language: 'java', label: 'LoginSteps.java — Step Definitions',
        code: `package com.qa.steps;

import io.cucumber.java.en.*;
import io.cucumber.java.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import static org.junit.jupiter.api.Assertions.*;

public class LoginSteps {

    WebDriver driver;

    @Given("tarayıcı açık ve login sayfasında")
    public void browserIsOpen() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://example.com/login");
    }

    // {string} = tırnak içindeki değeri parametre olarak alır
    @When("{string} kullanıcı adı ve {string} şifresiyle giriş yapar")
    public void userLogsInWith(String username, String password) {
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("loginBtn")).click();
    }

    @Then("dashboard sayfasına yönlendirilmeli")
    public void shouldBeOnDashboard() {
        assertTrue(driver.getCurrentUrl().contains("/dashboard"),
            "URL '/dashboard' içermeli");
    }

    @Then("hoş geldiniz mesajı görünmeli")
    public void welcomeMessageVisible() {
        assertTrue(driver.findElement(By.id("welcome")).isDisplayed());
    }

    @Then("{string} hata mesajı görünmeli")
    public void errorMessageShouldBe(String expectedMsg) {
        String actual = driver.findElement(By.className("error-msg")).getText();
        assertEquals(expectedMsg, actual);
    }

    @Then("sonuç {string} olmalı")
    public void resultShouldBe(String result) {
        if ("SUCCESS".equals(result))
            assertTrue(driver.getCurrentUrl().contains("/dashboard"));
        else
            assertTrue(driver.findElement(By.className("error-msg")).isDisplayed());
    }

    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed() && driver != null) {
            byte[] screenshot = ((TakesScreenshot) driver)
                .getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", "failure");
        }
        if (driver != null) driver.quit();
    }
}`,
      },
      { type: 'heading', text: { tr: 'pom.xml — Cucumber + JUnit5 + TestNG', en: 'pom.xml — Dependencies' } },
      {
        type: 'code', language: 'xml', label: 'pom.xml — Tüm Cucumber bağımlılıkları',
        code: `<dependencyManagement>
  <dependencies>
    <!-- Cucumber BOM — tüm modüller için tek versiyon -->
    <dependency>
      <groupId>io.cucumber</groupId>
      <artifactId>cucumber-bom</artifactId>
      <version>7.15.0</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
  <!-- Cucumber Java core (step definitions) -->
  <dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <scope>test</scope>
  </dependency>

  <!-- JUnit5 + Cucumber entegrasyonu -->
  <dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit-platform-engine</artifactId>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.junit.platform</groupId>
    <artifactId>junit-platform-suite</artifactId>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
  </dependency>

  <!-- TestNG + Cucumber entegrasyonu (JUnit5 yerine) -->
  <dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-testng</artifactId>
    <scope>test</scope>
  </dependency>

  <!-- Selenium + WebDriverManager -->
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.20.0</version>
  </dependency>
  <dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.8.0</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
      },
      { type: 'heading', text: { tr: 'JUnit5 + Cucumber Runner', en: 'JUnit5 + Cucumber Runner' } },
      {
        type: 'code', language: 'java', label: 'RunCucumberTest.java — JUnit5 Suite Runner',
        code: `package com.qa.runner;

import org.junit.platform.suite.api.*;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")          // src/test/resources/features klasörü
@ConfigurationParameter(
    key = "cucumber.plugin",
    value = "pretty, html:target/cucumber-reports/report.html, json:target/cucumber.json"
)
@ConfigurationParameter(key = "cucumber.publish.quiet", value = "true")
// Tag filtresi (isteğe bağlı):
// @ConfigurationParameter(key = "cucumber.filter.tags", value = "@smoke")
public class RunCucumberTest {
    // Bu sınıf boş kalır — @Suite annotation yeterlidir
}

// Çalıştırma komutları:
// Tümü : mvn test -Dtest=RunCucumberTest
// Smoke: mvn test -Dtest=RunCucumberTest -Dcucumber.filter.tags="@smoke"
// Hariç: mvn test -Dtest=RunCucumberTest -Dcucumber.filter.tags="not @wip"`,
      },
      { type: 'heading', text: { tr: 'TestNG + Cucumber Runner', en: 'TestNG + Cucumber Runner' } },
      {
        type: 'code', language: 'java', label: 'TestNGCucumberRunner.java — AbstractTestNGCucumberTests',
        code: `package com.qa.runner;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.DataProvider;

@CucumberOptions(
    features  = "src/test/resources/features",
    glue      = {"com.qa.steps", "com.qa.hooks"},   // step + hook package'ları
    plugin    = {
        "pretty",
        "html:target/cucumber-reports/report.html",
        "json:target/cucumber-reports/cucumber.json",
        "io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm"
    },
    tags      = "@regression",      // hangi tag'leri çalıştır
    monochrome = true
)
public class TestNGCucumberRunner extends AbstractTestNGCucumberTests {

    // Parallel çalışma için — her Scenario ayrı thread'de
    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}

// testng.xml'de:
// <test name="Cucumber Tests">
//   <classes><class name="com.qa.runner.TestNGCucumberRunner"/></classes>
// </test>`,
      },
      { type: 'heading', text: { tr: 'Cucumber Hooks — @Before & @After', en: 'Cucumber Hooks' } },
      {
        type: 'code', language: 'java', label: 'Hooks.java — Senaryo öncesi/sonrası işlemler',
        code: `package com.qa.hooks;

import io.cucumber.java.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

public class Hooks {

    // Her senaryodan önce — Browser aç
    @Before(order = 1)
    public void setUp(Scenario scenario) {
        WebDriverManager.chromedriver().setup();
        ChromeOptions opts = new ChromeOptions();
        opts.addArguments("--start-maximized");
        // opts.addArguments("--headless=new"); // CI için headless
        DriverContext.setDriver(new ChromeDriver(opts));
        DriverContext.getDriver().manage().timeouts()
            .implicitlyWait(Duration.ofSeconds(0)); // Explicit wait tercih
        System.out.println("▶ Senaryo: " + scenario.getName());
    }

    // Sadece @slow tag'li senaryolar için ek timeout
    @Before(value = "@slow", order = 2)
    public void slowSetup() {
        DriverContext.getDriver().manage().timeouts()
            .pageLoadTimeout(Duration.ofSeconds(60));
    }

    // Her senaryodan sonra — Browser kapat, hata varsa screenshot
    @After(order = 1)
    public void tearDown(Scenario scenario) {
        WebDriver driver = DriverContext.getDriver();
        if (driver != null) {
            if (scenario.isFailed()) {
                byte[] ss = ((TakesScreenshot) driver)
                    .getScreenshotAs(OutputType.BYTES);
                scenario.attach(ss, "image/png", "failure-screenshot");
                System.out.println("❌ FAIL: " + scenario.getName());
            } else {
                System.out.println("✅ PASS: " + scenario.getName());
            }
            driver.quit();
            DriverContext.remove();
        }
    }
}

// DriverContext — ThreadLocal ile thread-safe driver yönetimi
class DriverContext {
    private static final ThreadLocal<WebDriver> tl = new ThreadLocal<>();
    public static void setDriver(WebDriver d) { tl.set(d); }
    public static WebDriver getDriver()       { return tl.get(); }
    public static void remove()               { tl.remove(); }
}`,
      },
      { type: 'heading', text: { tr: 'Cucumber Data Tables — Tablo Verisi', en: 'Cucumber Data Tables' } },
      {
        type: 'code', language: 'gherkin', label: 'Data Table — Gherkin + Java implementasyonu',
        code: `# Feature dosyasında Data Table
Scenario: Çoklu ürün sepete ekleme
  Given aşağıdaki ürünler mevcut:
    | ürün adı      | adet | fiyat |
    | Blue Top      | 2    | 29.99 |
    | Men Tshirt    | 1    | 15.00 |
    | Grey Bodysuit | 3    | 45.00 |
  When tüm ürünleri sepete ekliyorum
  Then sepet toplamı "194.97" olmalı`,
      },
      {
        type: 'code', language: 'java', label: 'Data Table — Java Step Definition',
        code: `import io.cucumber.java.en.*;
import io.cucumber.datatable.DataTable;
import java.util.List;
import java.util.Map;

public class CartSteps {

    @Given("aşağıdaki ürünler mevcut:")
    public void productsAreAvailable(DataTable dataTable) {
        // Tablo verisi — her satır bir Map (kolon adı → değer)
        List<Map<String, String>> rows = dataTable.asMaps(String.class, String.class);

        for (Map<String, String> row : rows) {
            String name  = row.get("ürün adı");
            int qty      = Integer.parseInt(row.get("adet"));
            double price = Double.parseDouble(row.get("fiyat"));
            System.out.printf("Ürün: %s | Adet: %d | Fiyat: %.2f%n", name, qty, price);
        }
    }

    @When("tüm ürünleri sepete ekliyorum")
    public void addAllToCart() {
        // Selenium ile sepete ekle
        System.out.println("Sepete ekleniyor...");
    }

    @Then("sepet toplamı {string} olmalı")
    public void cartTotalShouldBe(String expectedTotal) {
        String actual = driver.findElement(By.id("cartTotal")).getText();
        assertEquals(expectedTotal, actual);
    }
}`,
      },
      {
        type: 'quiz',
        question: { tr: 'Cucumber\'da "Scenario Outline" ne işe yarar?', en: 'What does "Scenario Outline" do in Cucumber?' },
        options: [
          { id: 'a', text: 'Testleri parallel çalıştırır' },
          { id: 'b', text: 'Aynı senaryoyu farklı test verileriyle çalıştırır (data-driven)' },
          { id: 'c', text: 'Cucumber\'ı TestNG ile entegre eder' },
          { id: 'd', text: '@Before ve @After hook\'larını tanımlar' },
        ],
        correct: 'b',
        explanation: { tr: 'Scenario Outline + Examples tablosu, aynı testi farklı verilerle çalıştıran parametrik test yapısıdır. Java\'daki @DataProvider (TestNG) veya @ParameterizedTest (JUnit5) eşdeğeridir. Examples tablosundaki her satır ayrı bir Scenario instance\'ı olarak çalışır.', en: 'Scenario Outline + Examples table runs the same test with different data sets — the parametric (data-driven) structure. Equivalent to @DataProvider in TestNG or @ParameterizedTest in JUnit5. Each Examples row runs as a separate Scenario instance.' },
      
        retryQuestion: {
      "question": {
            "tr": "Cucumber'da birden fazla veri seti ile bir testi tekrarlamak için kullanılan yapı hangisidir?",
            "en": "Which structure is used in Cucumber to execute a test repeatedly with multiple sets of data?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Background",
                        "en": "Background"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Scenario Outline",
                        "en": "Scenario Outline"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Step Definition",
                        "en": "Step Definition"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Feature File",
                        "en": "Feature File"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Scenario Outline, Examples anahtar kelimesi ile birleşerek testin tablo içerisindeki her satır için ayrı ayrı parametrelerle çalışmasını sağlar, bu da data-driven test yapısıdır.",
            "en": "Scenario Outline, combined with the Examples keyword, allows the test to run with different parameters for each row in the table, enabling a data-driven testing approach."
      }
}
},
    ],
  },
  en: {
    title: '🥒 Cucumber — BDD & Gherkin Test Automation',
    blocks: [
      {
        type: 'simple-box', emoji: '🥒',
        content: 'Think of Cucumber as a translation service: the business analyst writes "User should log in," the QA engineer converts that sentence into an automated test. Everyone speaks the same Gherkin language. In Java, it works with a JUnit5 or TestNG runner — both are supported.',
      },
      {
        type: 'table',
        headers: ['Feature', 'JUnit5', 'TestNG', 'Cucumber'],
        rows: [
          ['Purpose', 'Unit/Integration test', 'Suite management', 'BDD — Business scenario focused'],
          ['Test language', 'Java', 'Java', 'Gherkin (Given/When/Then) + Java'],
          ['Who reads it', 'Dev/QA', 'Dev/QA', 'Dev + QA + PO + Analyst'],
          ['Runner', 'Built-in', 'Built-in', 'Uses JUnit5 or TestNG runner'],
          ['Feature file', 'None', 'None', '.feature file (Gherkin)'],
          ['Data-driven', '@ParameterizedTest', '@DataProvider', 'Scenario Outline + Examples'],
        ],
      },
      { type: 'heading', text: { en: 'Gherkin Syntax — Feature File' } },
      {
        type: 'code', language: 'gherkin', label: 'login.feature — Gherkin example',
        code: `Feature: User Login
  As a user I should be able to login securely

  Background:
    Given browser is open on the login page

  @smoke @critical
  Scenario: Successful login with valid credentials
    When logs in with username "admin" and password "admin123"
    Then should be redirected to dashboard
    And welcome message should be visible

  @regression @negative
  Scenario: Invalid password should be rejected
    When logs in with username "admin" and password "wrong"
    Then error message "Invalid username or password" should appear

  Scenario Outline: Data-driven multi-user test
    When logs in with username "<username>" and password "<password>"
    Then result should be "<result>"

    Examples:
      | username | password | result  |
      | admin    | admin123 | SUCCESS |
      | user1    | pass1    | SUCCESS |
      | wrong    | wrong123 | FAILURE |`,
      },
      { type: 'heading', text: { en: 'Step Definitions — Gherkin → Java' } },
      {
        type: 'code', language: 'java', label: 'LoginSteps.java — Step Definitions',
        code: `package com.qa.steps;

import io.cucumber.java.en.*;
import io.cucumber.java.*;
import org.openqa.selenium.*;
import static org.junit.jupiter.api.Assertions.*;

public class LoginSteps {

    WebDriver driver;

    @Given("browser is open on the login page")
    public void browserIsOpen() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://example.com/login");
    }

    @When("logs in with username {string} and password {string}")
    public void userLogsIn(String username, String password) {
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("loginBtn")).click();
    }

    @Then("should be redirected to dashboard")
    public void onDashboard() {
        assertTrue(driver.getCurrentUrl().contains("/dashboard"));
    }

    @Then("error message {string} should appear")
    public void errorMessage(String msg) {
        assertEquals(msg, driver.findElement(By.className("error-msg")).getText());
    }

    @Then("result should be {string}")
    public void resultShouldBe(String result) {
        if ("SUCCESS".equals(result))
            assertTrue(driver.getCurrentUrl().contains("/dashboard"));
        else
            assertTrue(driver.findElement(By.className("error-msg")).isDisplayed());
    }

    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed() && driver != null)
            scenario.attach(((TakesScreenshot)driver).getScreenshotAs(OutputType.BYTES),
                "image/png", "failure");
        if (driver != null) driver.quit();
    }
}`,
      },
      { type: 'heading', text: { en: 'JUnit5 + Cucumber Runner' } },
      {
        type: 'code', language: 'java', label: 'RunCucumberTest.java',
        code: `package com.qa.runner;

import org.junit.platform.suite.api.*;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(
    key   = "cucumber.plugin",
    value = "pretty, html:target/cucumber-reports/report.html"
)
public class RunCucumberTest {}

// Run all: mvn test -Dtest=RunCucumberTest
// Run smoke only: mvn test -Dtest=RunCucumberTest -Dcucumber.filter.tags="@smoke"`,
      },
      { type: 'heading', text: { en: 'TestNG + Cucumber Runner' } },
      {
        type: 'code', language: 'java', label: 'TestNGCucumberRunner.java',
        code: `package com.qa.runner;

import io.cucumber.testng.*;
import org.testng.annotations.DataProvider;

@CucumberOptions(
    features  = "src/test/resources/features",
    glue      = {"com.qa.steps", "com.qa.hooks"},
    plugin    = {"pretty", "html:target/cucumber-reports/report.html"},
    tags      = "@regression"
)
public class TestNGCucumberRunner extends AbstractTestNGCucumberTests {

    @Override
    @DataProvider(parallel = true)  // Parallel scenario execution
    public Object[][] scenarios() { return super.scenarios(); }
}`,
      },
      {
        type: 'quiz',
        question: { en: 'What does "Scenario Outline" do in Cucumber?' },
        options: [
          { id: 'a', text: 'Runs tests in parallel' },
          { id: 'b', text: 'Runs the same scenario with different data sets (data-driven)' },
          { id: 'c', text: 'Integrates Cucumber with TestNG' },
          { id: 'd', text: 'Defines @Before and @After hooks' },
        ],
        correct: 'b',
        explanation: { en: 'Scenario Outline + Examples table is the parametric (data-driven) structure — same test, different data. Equivalent to @DataProvider in TestNG or @ParameterizedTest in JUnit5. Each Examples row runs as a separate Scenario instance.' },
      
        retryQuestion: {
      "question": {
            "en": "How is the 'Examples' keyword utilized in Cucumber when paired with a 'Scenario Outline'?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "It provides a configuration file for test execution environments"
            },
            {
                  "id": "b",
                  "text": "It supplies multiple sets of input values, executing the scenario once for each row in the table"
            },
            {
                  "id": "c",
                  "text": "It marks the end of a feature file"
            },
            {
                  "id": "d",
                  "text": "It specifies which browser should be used for the test run"
            }
      ],
      "correct": "b",
      "explanation": {
            "en": "The 'Examples' table provides the data inputs. When combined with 'Scenario Outline', Cucumber iterates through each row of the 'Examples' table, replacing placeholders in the scenario steps with the actual data, effectively performing data-driven testing."
      }
}
},
    ],
  },
}

// ─── S-SELENIUM: ADIM ADIM SELENIUM ──────────────────────────────────────────
const sSelenium = {
  tr: {
    title: '🌐 Selenium WebDriver — Adım Adım Kullanım',
    blocks: [
      {
        type: 'simple-box', emoji: '🌐',
        content: 'Selenium WebDriver\'ı bir robot gibi düşün: "Şu butona tıkla, bu kutuya yaz, yüklenmesini bekle." Java\'da bu komutları yazıyorsun, robot tarayıcıda çalıştırıyor. Selenium 4, Java\'nın en olgun test kütüphanesidir: Chrome, Firefox, Edge, Safari — hepsini destekler.',
      },
      { type: 'heading', text: { tr: 'Adım 1: Maven Kurulumu', en: 'Step 1: Maven Setup' } },
      {
        type: 'code', language: 'xml', label: 'pom.xml — Selenium 4 + WebDriverManager',
        code: `<dependencies>
  <!-- Selenium WebDriver 4 -->
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.20.0</version>
  </dependency>

  <!-- WebDriverManager — driver binary otomatik indir -->
  <dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.8.0</version>
    <scope>test</scope>
  </dependency>

  <!-- JUnit5 runner -->
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
      },
      { type: 'heading', text: { tr: 'Adım 2: Tarayıcı Açma ve Kapatma', en: 'Step 2: Browser Launch' } },
      {
        type: 'code', language: 'java', label: 'Chrome / Firefox / Edge başlatma',
        code: `import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.edge.EdgeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

public class BrowserSetup {
    public static void main(String[] args) {

        // ── Chrome (en yaygın) ──────────────────────────────
        WebDriverManager.chromedriver().setup(); // driver binary otomatik
        ChromeOptions opts = new ChromeOptions();
        opts.addArguments("--start-maximized");
        opts.addArguments("--disable-notifications");
        opts.addArguments("--disable-extensions");
        // CI/CD için headless:
        // opts.addArguments("--headless=new");
        WebDriver driver = new ChromeDriver(opts);

        // ── Firefox ─────────────────────────────────────────
        // WebDriverManager.firefoxdriver().setup();
        // WebDriver driver = new FirefoxDriver();

        // ── Edge ────────────────────────────────────────────
        // WebDriverManager.edgedriver().setup();
        // WebDriver driver = new EdgeDriver();

        // Timeout ayarları
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
        // Implicit wait — dikkatli kullan, explicit wait tercih et
        // driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));

        // Pencere kontrolü
        driver.manage().window().maximize();

        System.out.println("Başlık: " + driver.getTitle());
        System.out.println("URL: " + driver.getCurrentUrl());

        driver.quit(); // !! Her zaman kapat — finally bloğunda!
    }
}`,
      },
      { type: 'heading', text: { tr: 'Adım 3: Sayfa Navigasyonu', en: 'Step 3: Navigation' } },
      {
        type: 'code', language: 'java', label: 'Tüm navigasyon komutları',
        code: `WebDriver driver = /* ... */;

// URL aç (sayfa tam yüklenene kadar bekler)
driver.get("https://automationexercise.com");

// navigate() ile aynı şey — daha fazla seçenek sunar
driver.navigate().to("https://google.com");
driver.navigate().back();       // ← Geri (tarayıcı geri butonu)
driver.navigate().forward();    // → İleri
driver.navigate().refresh();    // ↺ Yenile (F5)

// Sayfa bilgileri
String title   = driver.getTitle();          // "Automation Exercise"
String url     = driver.getCurrentUrl();     // "https://..."
String source  = driver.getPageSource();     // Tüm HTML

// Pencere handle'ları (çoklu sekme/popup için)
String mainWin  = driver.getWindowHandle();      // Mevcut pencere ID
Set<String> all = driver.getWindowHandles();     // Tüm açık pencereler

// Başka pencereye geç
for (String win : all) {
    if (!win.equals(mainWin)) {
        driver.switchTo().window(win);
        break;
    }
}
driver.switchTo().window(mainWin); // Ana pencereye dön`,
      },
      { type: 'heading', text: { tr: 'Adım 4: Element Bulma — 8 Locator Stratejisi', en: 'Step 4: Element Locators — 8 By Strategies' } },
      {
        type: 'simple-box',
        emoji: '🔍',
        content: {
          tr: 'Locator, otomasyon kodunuzun sayfadaki bir elementi "tanımlama yöntemi"dir. Tıpkı bir kütüphanede kitabı rafta bulmak gibi — raf numarasıyla (id) gidersen en hızlı, "kapağı kırmızı" (class) dersen risk var çünkü birden fazla kırmızı kapak olabilir.',
          en: 'A locator is the method your automation code uses to "identify" an element on the page — like finding a book in a library. Going by shelf number (id) is fastest; searching by "red cover" (class) is risky because multiple red covers may exist.',
        },
      },
      {
        type: 'locator-visual',
        htmlExample: `<form id="loginForm" class="login-form">

  <label for="username">Kullanıcı Adı</label>

  <input
    id="username"
    class="form-input"
    name="email"
    type="email"
    placeholder="E-posta"
    data-testid="username-input" />

  <button
    id="loginBtn"
    class="btn btn-primary"
    type="submit"
    data-testid="login-btn">
    Giriş Yap
  </button>

  <a href="/forgot">Şifremi Unuttum</a>

</form>`,
        locators: [
          {
            id: 'by-id', label: 'By.id()', priority: 1, starRating: '⭐⭐⭐', color: '#10b981',
            highlights: ['id="username"'],
            code: `WebElement el = driver.findElement(By.id("username"));
// En hızlı: tarayıcılar id aramasını optimize eder`,
            title: 'En Hızlı & En Güvenilir',
            titleEn: 'Fastest & Most Reliable',
            explanation: 'HTML\'deki id attribute\'ünü direkt hedefler. Tarayıcılar id aramasını optimize ettiği için en hızlı locator\'dır. Her sayfada id benzersiz olmalıdır — tıpkı Java\'da final bir sabit gibi.',
            explanationEn: 'Directly targets the id attribute. Browsers optimize id lookups, making this the fastest locator. id must be unique per page — like a final constant in Java.',
            tip: '✅ Her zaman ilk tercih. id yoksa geliştiriciden eklemesini iste. QA test otomasyonunda "by id" kuralı standarttır.',
            tipEn: '✅ Always first choice. If no id, request the dev team to add one. "By id" is QA automation standard.',
            when: 'Element\'in id attribute\'ü varsa — HER ZAMAN kullan',
            whenEn: 'When element has an id attribute — ALWAYS use it first',
          },
          {
            id: 'by-data-testid', label: '[data-testid]', priority: 1, starRating: '⭐⭐⭐', color: '#06b6d4',
            highlights: ['data-testid="username-input"'],
            code: `WebElement el = driver.findElement(
    By.cssSelector("[data-testid='username-input']")
);
// veya: By.cssSelector("[data-qa='username']")`,
            title: 'Test için Tasarlanmış — En İyi Pratik',
            titleEn: 'Designed for Testing — Best Practice',
            explanation: 'data-testid özellikle QA için eklenir. Stil, id veya class değişse bile test bozulmaz. React / Vue / Angular projelerinde endüstri standardıdır — Java\'da interface gibi: implementasyon değişse kontrat bozulmaz.',
            explanationEn: 'data-testid is added specifically for QA. Tests don\'t break even if styles, ids or classes change. Industry standard in React/Vue/Angular — like an interface in Java: contract stays intact even if implementation changes.',
            tip: '✅ EN İYİ PRATİK: Tüm test elementlerine data-testid eklemesini ekipten iste. Uzun vadede en kararlı locator.',
            tipEn: '✅ BEST PRACTICE: Ask the dev team to add data-testid to all testable elements. Most stable locator long-term.',
            when: 'data-testid varsa id\'den bile önce tercih et',
            whenEn: 'When data-testid exists, prefer it even over id',
          },
          {
            id: 'by-name', label: 'By.name()', priority: 3, starRating: '⭐⭐', color: '#3b82f6',
            highlights: ['name="email"'],
            code: `WebElement el = driver.findElement(By.name("email"));
// Form submit'te backend'e gönderilen alan adı
// Java'da Map.get("email") gibi düşün`,
            title: 'Form Elementleri için Doğal Seçim',
            titleEn: 'Natural Choice for Form Elements',
            explanation: 'HTML form elementlerindeki name attribute\'ünü hedefler. Login, kayıt, arama formlarında çok yaygındır — backend\'e POST edilirken bu isim kullanılır. Java\'da HTTP parametresinin adı gibi.',
            explanationEn: 'Targets the name attribute on HTML form elements. Common in login, register, search forms — same as the field name POSTed to the backend. Like HTTP parameter names in Java.',
            tip: '✅ id yoksa form alanları için 2. seçenek. Sayfada aynı name\'den birden fazla olabilir — dikkatli ol.',
            tipEn: '✅ Second choice for form fields when no id. Multiple elements may share the same name — be careful.',
            when: 'id yoksa form input / select / textarea için',
            whenEn: 'For form input, select, textarea when no id exists',
          },
          {
            id: 'by-class', label: 'By.className()', priority: 5, starRating: '⭐', color: '#f59e0b',
            highlights: ['class="form-input"'],
            code: `// DİKKAT: birden fazla element dönebilir!
List<WebElement> els =
    driver.findElements(By.className("form-input"));
WebElement first = els.get(0); // ilkini al`,
            title: 'Dikkat: Genellikle Birden Fazla Eşleşir',
            titleEn: 'Warning: Usually Matches Multiple Elements',
            explanation: 'CSS class adını hedefler. Aynı class genellikle birden fazla elementte kullanılır — findElement() sayfadaki ilkini, findElements() hepsini getirir. Java\'da List.get(0) gibi: emin olmadıkça riskli.',
            explanationEn: 'Targets a CSS class name. The same class is usually used on multiple elements — findElement() returns the first, findElements() returns all. Like List.get(0) in Java: risky unless you\'re certain.',
            tip: '⚠️ Tek bir class adı alır — "form-input" yaz, "form-input btn" değil. Unique olmayan class için cssSelector combo tercih et.',
            tipEn: '⚠️ Takes a single class name — write "form-input" not "form-input btn". Prefer cssSelector combo for non-unique classes.',
            when: 'Sayfada tam olarak TEK bir elementi olan class için',
            whenEn: 'Only when the class matches exactly one element on the page',
          },
          {
            id: 'by-css-id', label: 'cssSelector #id', priority: 2, starRating: '⭐⭐⭐', color: '#8b5cf6',
            highlights: ['id="loginBtn"'],
            code: `// # = id seçicisi (CSS sözdizimi)
WebElement btn =
    driver.findElement(By.cssSelector("#loginBtn"));
// Kondisyon ekle: #loginBtn[disabled]
// Bu By.id("loginBtn")'in üst kümesidir`,
            title: 'CSS id Seçicisi — By.id() ile Eşdeğer',
            titleEn: 'CSS id Selector — Equivalent to By.id()',
            explanation: 'CSS sözdiziminde # id\'yi seçer. By.id() ile aynı hızda çalışır. Farkı: cssSelector başka attribute\'larla kombinlenebilir. Java\'da method overloading gibi — aynı temel, farklı parametreler.',
            explanationEn: 'In CSS syntax, # selects by id. Same speed as By.id(). Difference: cssSelector can combine with other attributes. Like method overloading in Java — same base, different parameters.',
            tip: '✅ By.id() ile aynı hız — ama cssSelector ekstra filtre ekleyebilir: #loginBtn[type="submit"] gibi.',
            tipEn: '✅ Same speed as By.id() — but cssSelector can add extra filters: #loginBtn[type="submit"] etc.',
            when: 'id ile birlikte başka attribute da kontrol etmek gerektiğinde',
            whenEn: 'When checking id along with additional attribute constraints',
          },
          {
            id: 'by-css-combo', label: 'cssSelector combo', priority: 2, starRating: '⭐⭐⭐', color: '#7c3aed',
            highlights: ['class="form-input"', 'name="email"'],
            code: `// Tag + class + attribute kombinasyonu:
WebElement el = driver.findElement(
    By.cssSelector("input.form-input[name='email']")
);
// input → tag  |  .form-input → class  |  [name='email'] → attr`,
            title: 'Kombine CSS — Çok Spesifik & Güvenilir',
            titleEn: 'Combined CSS — Very Specific & Reliable',
            explanation: 'Tag adı, class ve attribute\'ları tek selector\'da birleştirir. Yanlış element seçme riski minimumdur. Java\'da birden fazla koşul ile HashMap.entrySet() filtrelemek gibi — ne kadar çok kriter, o kadar özgün.',
            explanationEn: 'Combines tag name, class and attributes in one selector. Minimal risk of wrong element selection. Like filtering HashMap.entrySet() with multiple conditions in Java — more criteria, more unique.',
            tip: '✅ data-testid yoksa bu form tercih edilir. Tag + class + attribute kombinasyonu hem güvenilir hem okunabilir.',
            tipEn: '✅ Preferred when data-testid is not available. Tag + class + attribute is both reliable and readable.',
            when: 'Benzersizlik için birden fazla attribute birleştirmek gerektiğinde',
            whenEn: 'When combining multiple attributes for uniqueness is required',
          },
          {
            id: 'by-linktext', label: 'By.linkText()', priority: 6, starRating: '⭐', color: '#ec4899',
            highlights: ['Şifremi Unuttum'],
            code: `// Sadece <a> tag'i için çalışır!
WebElement link =
    driver.findElement(By.linkText("Şifremi Unuttum"));

// Kısmi metin eşleşmesi:
WebElement part =
    driver.findElement(By.partialLinkText("Şifrem"));`,
            title: 'Yalnızca <a> Linkleri — Büyük/Küçük Harf Duyarlı',
            titleEn: 'Only <a> Links — Case Sensitive',
            explanation: 'Sadece <a> (anchor) elementlerinin görünen metnini hedefler. Büyük/küçük harf duyarlıdır. Metin değişirse veya çok dilli uygulama ise test kırılır. Java\'da String.equals() kadar kesin eşleşme ister.',
            explanationEn: 'Only targets visible text of <a> anchor elements. Case-sensitive. Breaks if text changes or if the app is multilingual. Requires exact match like String.equals() in Java.',
            tip: '⚠️ Sadece link elementleri. Dil desteği olan uygulamalarda bu locator testleri kırabilir — href veya data-testid tercih et.',
            tipEn: '⚠️ Links only. In multilingual apps this locator breaks tests — prefer href attribute or data-testid.',
            when: 'Yalnızca statik metin içeren <a> linkleri için',
            whenEn: 'Only for <a> link elements with static, non-translated text',
          },
          {
            id: 'by-xpath', label: 'By.xpath()', priority: 8, starRating: '⭐', color: '#ef4444',
            highlights: ['type="submit"'],
            code: `// Attribute ile:
driver.findElement(
    By.xpath("//button[@type='submit']"));

// Metin ile:
driver.findElement(
    By.xpath("//button[text()='Giriş Yap']"));

// Axis — DOM ilişkisi (en güçlü):
driver.findElement(
    By.xpath("//label[@for='username']/following-sibling::input"));`,
            title: 'En Güçlü — Ama Son Çare',
            titleEn: 'Most Powerful — But Last Resort',
            explanation: 'XML yol ifadelerini kullanır. Parent/child/sibling/ancestor gibi karmaşık DOM ilişkilerini ifade edebilir. En yavaş locator — sayfa yapısı değişince kolayca kırılır. Java\'da reflection gibi: çok güçlü ama kullan-diyince düşün.',
            explanationEn: 'Uses XML path expressions. Can express complex DOM relationships (parent/child/sibling/ancestor). Slowest locator — breaks easily when page structure changes. Like reflection in Java: very powerful but think before using.',
            tip: '⛔ Son tercih. Aynı şey cssSelector ile yapılabiliyorsa xpath kullanma. Kaçınılmaz: shadow DOM, iframe içi, karmaşık DOM ilişkisi.',
            tipEn: '⛔ Last resort. If achievable with cssSelector, avoid xpath. Unavoidable: shadow DOM, inside iframes, complex DOM relationships.',
            when: 'Başka hiçbir locator çalışmadığında — özellikle DOM ilişkisi gerektiğinde',
            whenEn: 'Only when no other locator works — especially for DOM relationship navigation',
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 5: Element İşlemleri', en: 'Step 5: Element Actions' } },
      {
        type: 'code', language: 'java', label: 'Tüm element işlemleri — yazma, tıklama, okuma',
        code: `WebElement el = driver.findElement(By.id("username"));

// ── YAZMA / TIKLAMA ─────────────────────────────────
el.sendKeys("admin@example.com");           // Metin gir
el.clear();                                 // İçeriği temizle
el.sendKeys(Keys.chord(Keys.CONTROL, "a")); // Ctrl+A ile tümünü seç
el.click();                                 // Tıkla
el.submit();                                // Form submit (input/button)

// Özel tuşlar
el.sendKeys(Keys.ENTER);
el.sendKeys(Keys.TAB);
el.sendKeys(Keys.BACK_SPACE);

// ── OKUMA ───────────────────────────────────────────
String text  = el.getText();                     // Görünen metin
String val   = el.getAttribute("value");         // Input değeri
String cls   = el.getAttribute("class");         // CSS class
String href  = el.getAttribute("href");          // Link URL

// ── DURUM KONTROLÜ ──────────────────────────────────
boolean visible  = el.isDisplayed(); // Görünür mü? (display:none değil)
boolean enabled  = el.isEnabled();   // Aktif mi? (disabled değil)
boolean selected = el.isSelected();  // Checkbox/Radio seçili mi?

// ── SELECT DROPDOWN ─────────────────────────────────
import org.openqa.selenium.support.ui.Select;
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("Türkiye");         // Görünen text
dropdown.selectByValue("TR");                    // value attribute
dropdown.selectByIndex(0);                       // Index (0'dan)
String selected = dropdown.getFirstSelectedOption().getText();
List<WebElement> opts = dropdown.getOptions();   // Tüm seçenekler

System.out.println("Seçili: " + selected + " | Görünür: " + visible);`,
      },
      {
        type: 'selenium-visual',
        concept: 'dropdown',
        color: '#f59e0b',
        icon: '🔽',
        title: { tr: 'Select Dropdown — Adım Adım İnteraktif Rehber', en: 'Select Dropdown — Step-by-Step Interactive Guide' },
        steps: [
          {
            id: 'wrap', label: 'Select Wrap', labelEn: 'Select Wrap',
            visualState: 'wrap',
            description: { tr: 'WebElement olarak bulunan <select> elemanını Select sınıfına sarıyoruz. Java\'daki ArrayList\'i Collections.sort() ile sarmak gibi — temel WebElement üzerine dropdown-spesifik yetenekler ekliyoruz.', en: 'We wrap the <select> WebElement with the Select class — like wrapping an ArrayList with Collections.sort() in Java — adding dropdown-specific capabilities on top of the basic WebElement.' },
            code: `import org.openqa.selenium.support.ui.Select;

// Önce WebElement olarak bul
WebElement el = driver.findElement(By.id("country"));

// Select sınıfına sar — artık dropdown metodları kullanılabilir
Select dropdown = new Select(el);

// Çoklu seçime izin veriyor mu? (multiple attribute)
boolean isMulti = dropdown.isMultiple();`,
            tip: { tr: '✅ Select sınıfı sadece <select> elementi için çalışır. Custom dropdown\'lar (ul/li ile yapılmış) için farklı strateji gerekir.', en: '✅ Select class only works for native <select> elements. Custom dropdowns (built with ul/li) require a different strategy.' },
          },
          {
            id: 'byText', label: 'byVisibleText', labelEn: 'byVisibleText',
            visualState: 'byText', selectedValue: 'tr',
            description: { tr: 'Kullanıcının gördüğü metne göre seçim. Java\'da List.stream().filter(s -> s.equals("Türkiye")).findFirst() gibi — tam metin eşleşmesi gerekir, büyük/küçük harf duyarlıdır.', en: 'Select by the text the user sees. Like List.stream().filter(s -> s.equals("Turkey")).findFirst() in Java — requires exact text match, case-sensitive.' },
            code: `// Kullanıcının gördüğü GÖRÜNEN metin ile seç
dropdown.selectByVisibleText("Türkiye");

// Dikkat: Büyük/küçük harf duyarlı!
// "türkiye" veya "TÜRKİYE" çalışmaz — tam "Türkiye" yaz

// Seçili option'ı oku
String secili = dropdown.getFirstSelectedOption().getText();
System.out.println(secili); // "Türkiye"`,
            tip: { tr: '⚠️ Görünen metin değişirse (i18n, A/B test) test kırılır. Mümkünse selectByValue() tercih et — value attribute genellikle daha stabil.', en: '⚠️ Breaks if visible text changes (i18n, A/B testing). Prefer selectByValue() when possible — value attribute is usually more stable.' },
          },
          {
            id: 'byValue', label: 'byValue', labelEn: 'byValue',
            visualState: 'byValue', selectedValue: 'tr',
            description: { tr: 'HTML\'deki value attribute değerine göre seçim — HTML\'de <option value="TR">Türkiye</option>. Java\'da Map.get("TR") gibi doğrudan anahtar ile erişim.', en: 'Select by the HTML value attribute — like <option value="TR">Turkey</option>. Like Map.get("TR") in Java — direct key access, not text search.' },
            code: `// value attribute'ü ile seç (HTML'deki value="tr")
dropdown.selectByValue("tr");

// HTML'de şöyle görünür:
// <option value="tr">Türkiye</option>
// <option value="us">USA</option>

// Value genellikle backend'e gönderilen asıl veri
String val = dropdown.getFirstSelectedOption().getAttribute("value");
System.out.println(val); // "tr"`,
            tip: { tr: '✅ En güvenilir seçim yöntemi. Value attribute metinden bağımsızdır — dil değişse de value "TR" kalır.', en: '✅ Most reliable selection method. Value attribute is independent of display text — even if language changes, value "TR" stays constant.' },
          },
          {
            id: 'byIndex', label: 'byIndex', labelEn: 'byIndex',
            visualState: 'byIndex', selectedValue: 'tr',
            description: { tr: '0\'dan başlayan index ile seçim — Java\'da List.get(0) gibi. En az güvenilir yöntem: yeni bir ülke listeye eklenirse tüm indexler kayar.', en: 'Select by 0-based index — like List.get(0) in Java. Least reliable: if a new country is added to the list, all indexes shift.' },
            code: `// 0'dan başlayan index ile seç (ilk option = 0)
dropdown.selectByIndex(0); // "Türkiye" (listedeki ilk)
dropdown.selectByIndex(2); // "Germany" (0,1,2)

// Tüm option sayısı
int total = dropdown.getOptions().size();
System.out.println("Toplam: " + total); // 4`,
            tip: { tr: '⛔ Son tercih — UI\'da sıra değişirse index yanlış elementi seçer. Sadece selectByValue/Text mümkün değilse kullan.', en: '⛔ Last resort — if the order in UI changes, index selects the wrong element. Use only when selectByValue/Text is not possible.' },
          },
          {
            id: 'firstSelected', label: 'getSelected', labelEn: 'getSelected',
            visualState: 'firstSelected', selectedValue: 'us',
            description: { tr: 'Şu anda seçili option\'ı okuma. Java\'da List.stream().filter(isSelected).findFirst() gibi. Seçimin doğru yapıldığını assertion ile doğrulamak için kullanılır.', en: 'Read the currently selected option. Like List.stream().filter(isSelected).findFirst() in Java. Used to verify the selection was made correctly with assertions.' },
            code: `// Seçili option'ı al
WebElement selected = dropdown.getFirstSelectedOption();

String text = selected.getText();              // "USA"
String value = selected.getAttribute("value"); // "us"

// JUnit assertion ile doğrula
assertEquals("USA", text);
assertEquals("us", value);`,
            tip: { tr: '✅ Test sonunda her zaman assertion ekle: selectByValue("us") sonrası assertEquals("USA", dropdown.getFirstSelectedOption().getText())', en: '✅ Always add an assertion after selection: after selectByValue("us"), assert assertEquals("USA", dropdown.getFirstSelectedOption().getText())' },
          },
          {
            id: 'getOptions', label: 'getOptions()', labelEn: 'getOptions()',
            visualState: 'getOptions',
            description: { tr: 'Tüm option\'ları List<WebElement> olarak döndürür. Java\'da List<String> almak gibi — tüm seçenekleri döngüyle dolaşabilirsin. Dinamik dropdown\'ları test etmek için kullanılır.', en: 'Returns all options as List<WebElement>. Like getting a List<String> in Java — you can loop through all choices. Used to test dynamic dropdowns that load options from the API.' },
            code: `// Tüm option'ları al
List<WebElement> options = dropdown.getOptions();

// Her option'ı yazdır (index ile)
for (int i = 0; i < options.size(); i++) {
    System.out.println(i + ": " + options.get(i).getText()
        + " [value=" + options.get(i).getAttribute("value") + "]");
}
// 0: Türkiye [value=tr]
// 1: USA [value=us]
// ...`,
            tip: { tr: '✅ Dropdown test stratejisi: önce getOptions() ile listeyi doğrula (beklenen sayı var mı?), sonra selectByValue() ile seçim yap.', en: '✅ Dropdown test strategy: first verify the list with getOptions() (expected count?), then make selection with selectByValue().' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 6: Bekleme Stratejileri (Waits)', en: 'Step 6: Wait Strategies' } },
      {
        type: 'code', language: 'java', label: 'Implicit Wait vs Explicit Wait vs Fluent Wait',
        code: `import org.openqa.selenium.support.ui.*;
import java.time.Duration;

// ── 1. IMPLICIT WAIT ────────────────────────────────
// Tüm findElement'ler için global bekleme (10 saniyeye kadar dener)
// !! Explicit wait ile aynı anda KULLANMA — beklenmedik davranış çıkar
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// ── 2. EXPLICIT WAIT (ÖNERİLEN) ─────────────────────
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

// Element görünür olana kadar bekle
WebElement loginBtn = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("loginBtn"))
);

// Element tıklanabilir olana kadar bekle (görünür + enabled)
WebElement btn = wait.until(
    ExpectedConditions.elementToBeClickable(By.cssSelector(".submit-btn"))
);

// URL belirli text içerene kadar bekle
wait.until(ExpectedConditions.urlContains("/dashboard"));

// Belirli metin görünene kadar bekle
wait.until(ExpectedConditions.textToBePresentInElement(
    driver.findElement(By.id("toast")), "Başarıyla kaydedildi"
));

// Loading spinner kaybolana kadar bekle
wait.until(ExpectedConditions.invisibilityOfElementLocated(
    By.className("loading-spinner")
));

// ── 3. FLUENT WAIT ──────────────────────────────────
// Polling interval + ignore edilen exception ile custom bekleme
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))   // 500ms'de bir kontrol et
    .ignoring(NoSuchElementException.class); // element yoksa ignore

WebElement el = fluentWait.until(driver ->
    driver.findElement(By.id("dynamicElement"))
);
System.out.println("Bulundu: " + el.getText());`,
      },
      { type: 'heading', text: { tr: 'Adım 7: Screenshot & JavaScript Executor', en: 'Step 7: Screenshot & JS Executor' } },
      {
        type: 'code', language: 'java', label: { tr: 'Screenshot ve JavaScript işlemleri', en: 'Screenshot and JavaScript operations' },
        code: `import org.openqa.selenium.*;
import java.io.*;
import java.nio.file.*;
import java.time.*;
import java.time.format.DateTimeFormatter;

// ── SCREENSHOT ───────────────────────────────────────
TakesScreenshot ts = (TakesScreenshot) driver;

// Dosyaya kaydet
String stamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
File src = ts.getScreenshotAs(OutputType.FILE);
Files.copy(src.toPath(),
    Paths.get("target/screenshots/ss_" + stamp + ".png"),
    StandardCopyOption.REPLACE_EXISTING);

// Byte array — JUnit/TestNG/Cucumber raporu için
byte[] bytes = ts.getScreenshotAs(OutputType.BYTES);
// Allure: Allure.addAttachment("SS", new ByteArrayInputStream(bytes))
// Cucumber: scenario.attach(bytes, "image/png", "screenshot")

// Selenium 4: Sadece element screenshot
File elSs = driver.findElement(By.id("errorPanel"))
    .getScreenshotAs(OutputType.FILE);

// ── JAVASCRIPT EXECUTOR ──────────────────────────────
JavascriptExecutor js = (JavascriptExecutor) driver;

// Sayfayı kaydır
js.executeScript("window.scrollTo(0, document.body.scrollHeight)"); // en alta
js.executeScript("window.scrollBy(0, 500)");                        // 500px aşağı

// Elemente kaydır
WebElement footer = driver.findElement(By.id("footer"));
js.executeScript("arguments[0].scrollIntoView(true);", footer);

// Elemente JS ile tıkla (Selenium click çalışmadığında)
js.executeScript("arguments[0].click();", footer);

// Input değeri doğrudan set et
js.executeScript("arguments[0].value='test@example.com';",
    driver.findElement(By.id("email")));

// readyState kontrolü
String state = (String) js.executeScript("return document.readyState");
System.out.println("Sayfa: " + state); // "complete"`,
      },
      {
        type: 'selenium-visual',
        concept: 'js-executor',
        color: '#f59e0b',
        icon: '⚡',
        title: { tr: 'JavaScript Executor — İnteraktif Görsel Rehber', en: 'JavaScript Executor — Interactive Visual Guide' },
        steps: [
          {
            id: 'idle', label: 'Neden JS?', labelEn: 'Why JS?',
            visualState: 'idle',
            description: { tr: 'JavascriptExecutor, Selenium\'un ulaşamadığı yerlerde JS komutu çalıştırır. Java\'da native method gibi — JVM\'in yapamadığını işletim sistemine delege eder. Selenium click çalışmıyorsa, scroll gerekirken veya değer doğrudan set edilecekse kullanılır.', en: 'JavascriptExecutor runs JS commands where Selenium cannot reach. Like a native method in Java — delegates to the OS what the JVM cannot do. Use when Selenium click fails, scrolling is needed, or a value must be set directly.' },
            code: `import org.openqa.selenium.JavascriptExecutor;

// Driver'ı JavascriptExecutor'a cast et
JavascriptExecutor js = (JavascriptExecutor) driver;

// Sayfa hazır mı kontrol et
String readyState = (String) js.executeScript(
    "return document.readyState"
);
// "complete" → sayfa tamamen yüklendi
System.out.println(readyState); // "complete"`,
            tip: { tr: '✅ JavascriptExecutor standart WebDriver arayüzünün bir parçası — tüm tarayıcılarda çalışır. Cast işlemi tehlikeli değil: ChromeDriver/FirefoxDriver hepsi bu interface\'i implement eder.', en: '✅ JavascriptExecutor is part of the standard WebDriver interface — works in all browsers. The cast is safe: ChromeDriver/FirefoxDriver all implement this interface.' },
          },
          {
            id: 'scrollTo', label: 'scrollTo', labelEn: 'scrollTo',
            visualState: 'scrollTo',
            description: { tr: 'Sayfayı belirli koordinata kaydırır. window.scrollTo(x, y) ile JS\'in kendi scroll API\'sini kullanıyoruz. document.body.scrollHeight sayfanın toplam yüksekliğini verir — en alta kaydırmak için kullanılır.', en: 'Scrolls the page to specific coordinates. We use JS\'s own scroll API with window.scrollTo(x, y). document.body.scrollHeight gives total page height — use it to scroll to the bottom.' },
            code: `JavascriptExecutor js = (JavascriptExecutor) driver;

// En alta kaydır
js.executeScript(
    "window.scrollTo(0, document.body.scrollHeight)"
);

// Belirli koordinata kaydır
js.executeScript("window.scrollTo(0, 800)");

// En üste dön
js.executeScript("window.scrollTo(0, 0)");`,
            tip: { tr: '✅ Lazy-load sayfalar için zorunlu: sayfa altına inmeden görseller yüklenmez. scrollTo ile önce yükle, sonra test et.', en: '✅ Essential for lazy-load pages: images don\'t load until scrolled into view. Use scrollTo to load first, then test.' },
          },
          {
            id: 'scrollBy', label: 'scrollBy', labelEn: 'scrollBy',
            visualState: 'scrollBy',
            description: { tr: 'Mevcut konumdan görece kaydırma. scrollTo\'nun aksine sayfanın nerede olduğunu bilmene gerek yok — sadece "500px aşağı git" dersin. Java\'da list.add() vs absolute set gibi: biri görece, biri mutlak.', en: 'Relative scroll from the current position. Unlike scrollTo, you don\'t need to know where the page is — just say "go 500px down". Like list.add() vs absolute set in Java: one relative, one absolute.' },
            code: `// Mevcut konumdan 500px aşağı
js.executeScript("window.scrollBy(0, 500)");

// 200px yukarı
js.executeScript("window.scrollBy(0, -200)");

// Yatay kaydırma (carousel için)
js.executeScript("window.scrollBy(300, 0)");

// Yavaş scroll (daha doğal)
// for(int i=0; i<5; i++) {
//   js.executeScript("window.scrollBy(0, 200)");
//   Thread.sleep(100);
// }`,
            tip: { tr: '✅ Infinite scroll sayfalar için ideal: sürekli scrollBy(0, 500) çağrıları ile yeni içerik yüklenebilir. Her çağrıdan sonra yeni elementlerin yüklendiğini explicit wait ile doğrula.', en: '✅ Ideal for infinite scroll pages: repeated scrollBy(0, 500) calls trigger new content loading. Verify new elements are loaded with explicit wait after each call.' },
          },
          {
            id: 'scrollIntoView', label: 'scrollIntoView', labelEn: 'scrollIntoView',
            visualState: 'scrollIntoView',
            description: { tr: 'Belirli bir elementi görünür alana kaydırır. Koordinat hesaplamak yerine "şu elemanı göster" dersin — tarayıcı kendisi scroll eder. Viewport dışındaki element ile etkileşim öncesi zorunludur.', en: 'Scrolls a specific element into the visible viewport. Instead of calculating coordinates, you say "show me this element" — the browser scrolls itself. Required before interacting with off-screen elements.' },
            code: `WebElement footer = driver.findElement(
    By.id("footerNewsletter")
);

// Footer'ı viewport'a getir
js.executeScript(
    "arguments[0].scrollIntoView(true);",
    footer
);

// Elementın görünür olduğunu doğrula
assertTrue(footer.isDisplayed());

// Şimdi güvenle tıkla
footer.findElement(By.name("email"))
      .sendKeys("test@example.com");`,
            tip: { tr: '✅ scrollIntoView(true) elemanı en üste hizalar, scrollIntoView(false) en alta. Viewport ortasına getirmek için scrollIntoView({block:"center"}) kullan.', en: '✅ scrollIntoView(true) aligns element to the top, scrollIntoView(false) to the bottom. Use scrollIntoView({block:"center"}) to center in viewport.' },
          },
          {
            id: 'jsClick', label: 'JS Click', labelEn: 'JS Click',
            visualState: 'jsClick',
            description: { tr: 'Selenium\'un normal click() metodunun çalışmadığı durumlarda JS ile tıklama. Overlay, z-index sorunu veya görünmez element için son çare. Java\'da reflection ile private metod çağırmak gibi — güçlü ama dikkatli kullan.', en: 'Click via JS when Selenium\'s normal click() doesn\'t work. Last resort for overlay, z-index issues or invisible elements. Like calling a private method via reflection in Java — powerful but use carefully.' },
            code: `WebElement btn = driver.findElement(
    By.cssSelector(".submit-btn")
);

// Normal click ÇALIŞMIYORSA bu denenir:
// ElementClickInterceptedException → başka element üstte
// ElementNotInteractableException → görünmüyor

// JS ile doğrudan DOM event tetikle
js.executeScript("arguments[0].click();", btn);

// Veya: scrollIntoView + JS click kombini
js.executeScript(
    "arguments[0].scrollIntoView(true); arguments[0].click();",
    btn
);`,
            tip: { tr: '⚠️ JS click, gerçek kullanıcı davranışını simüle etmez — hover event\'leri tetiklenmez. Önce normal click, çalışmazsa scrollIntoView + normal click, sonra JS click.', en: '⚠️ JS click does not simulate real user behavior — hover events are not triggered. Try normal click first, then scrollIntoView + normal click, then JS click as last resort.' },
          },
          {
            id: 'setValue', label: 'setValue', labelEn: 'setValue',
            visualState: 'setValue',
            description: { tr: 'Input değerini doğrudan DOM\'a yazar — sendKeys() gibi klavye simüle etmez. React/Angular gibi controlled component\'lerde bazen çalışmaz (onInput event tetiklemez). Autocomplete, masked input veya readonly alan için kullanılır.', en: 'Writes a value directly to the DOM — does not simulate keyboard like sendKeys(). Sometimes doesn\'t work in controlled components (React/Angular) as it doesn\'t trigger onInput. Used for autocomplete, masked inputs or readonly fields.' },
            code: `WebElement emailInput = driver.findElement(
    By.id("email")
);

// DOM'a doğrudan yaz (keyboard event yok)
js.executeScript(
    "arguments[0].value='test@example.com';",
    emailInput
);

// React gibi controlled component'lerde
// input event'i de tetiklenmeli:
js.executeScript("""
    arguments[0].value = 'test@example.com';
    arguments[0].dispatchEvent(new Event('input', {bubbles:true}));
    arguments[0].dispatchEvent(new Event('change', {bubbles:true}));
    """, emailInput);`,
            tip: { tr: '⚠️ React controlled input\'larda js.value= yetmez — dispatchEvent ile change/input event\'i tetikle. Yoksa React state güncellenmez ve form submit\'te değer kaybolur.', en: '⚠️ In React controlled inputs, js.value= is not enough — trigger change/input event with dispatchEvent. Otherwise React state doesn\'t update and value is lost on form submit.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 8: Actions Sınıfı (Hover, Drag-Drop, Sağ Tık)', en: 'Step 8: Actions Class' } },
      {
        type: 'code', language: 'java', label: 'Actions — gelişmiş mouse & keyboard işlemleri',
        code: `import org.openqa.selenium.interactions.Actions;

Actions actions = new Actions(driver);

// ── HOVER (Mouse Over) ──────────────────────────────
WebElement navMenu = driver.findElement(By.id("navMenu"));
actions.moveToElement(navMenu).perform();
// Alt menü görünür olana kadar bekle, sonra tıkla
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("subItem")));
driver.findElement(By.id("subItem")).click();

// ── ÇİFT TIKLAMA ────────────────────────────────────
actions.doubleClick(driver.findElement(By.id("editableCell"))).perform();

// ── SAĞ TIKLAMA (Context Menu) ──────────────────────
actions.contextClick(driver.findElement(By.id("fileItem"))).perform();
// Context menü öğesini seç
driver.findElement(By.id("ctxMenuDelete")).click();

// ── DRAG AND DROP ────────────────────────────────────
WebElement source = driver.findElement(By.id("draggable"));
WebElement target = driver.findElement(By.id("droppable"));
actions.dragAndDrop(source, target).perform();

// Koordinat ile sürükleme (drag-drop çalışmazsa offset dene):
// actions.clickAndHold(source).moveByOffset(200, 0).release().perform();

// ── KLAVYE KOMBİNASYONU ──────────────────────────────
WebElement textArea = driver.findElement(By.id("content"));
actions.click(textArea)
       .keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL) // Ctrl+A
       .sendKeys(Keys.DELETE)                                    // Sil
       .sendKeys("Yeni metin")                                   // Yaz
       .perform();

// ── ZİNCİRLEME (Method Chaining) ─────────────────────
actions.moveToElement(navMenu)
       .pause(Duration.ofMillis(300))
       .click()
       .perform();`,
      },
      {
        type: 'selenium-visual',
        concept: 'actions',
        color: '#8b5cf6',
        icon: '🖱️',
        title: { tr: 'Actions Sınıfı — İnteraktif Görsel Rehber', en: 'Actions Class — Interactive Visual Guide' },
        steps: [
          {
            id: 'hover', label: 'Hover', labelEn: 'Hover',
            visualState: 'hover',
            description: { tr: 'moveToElement() fare imlecini elementin üzerine taşır — tıklamaz, sadece üzerine gelir. Java\'da bir metodun içine adım atmadan önce kapının önünde durmak gibi. Hover ile açılan alt menüler için zorunludur.', en: 'moveToElement() moves the mouse cursor over an element — it does not click, just hovers. Like standing in front of a door before stepping inside in Java. Essential for dropdown menus that open on hover.' },
            code: `Actions actions = new Actions(driver);
WebElement navMenu = driver.findElement(By.id("navMenu"));

// Mouse'u üzerine taşı (tıklamıyor!)
actions.moveToElement(navMenu).perform();

// Alt menü görünene kadar bekle
wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.id("subItem")
));

// Şimdi alt menü elemanına tıkla
driver.findElement(By.id("subItem")).click();`,
            tip: { tr: '⚠️ moveToElement() sonrası mutlaka explicit wait kullan — alt menü animate ile açılabilir. Thread.sleep() KULLANMA.', en: '⚠️ Always use explicit wait after moveToElement() — the sub-menu may animate open. DO NOT use Thread.sleep().' },
          },
          {
            id: 'submenu', label: 'Sub-menu', labelEn: 'Sub-menu',
            visualState: 'submenu',
            description: { tr: 'Hover sonrası alt menü açıldı. Driver artık hem ana menüyü hem alt menüyü görebilir. Alt menü elemanını bulmak için normal findElement() yeterlidir — context değişmez (iframe gibi değil).', en: 'After hovering, the sub-menu is now open. The driver can see both the main menu and sub-menu. Normal findElement() is sufficient to locate sub-menu items — context does not change (unlike iframes).' },
            code: `// Alt menü açıkken tüm seçenekleri listele
List<WebElement> subItems = driver.findElements(
    By.cssSelector("#productMenu > li > a")
);

subItems.forEach(item ->
    System.out.println(item.getText())
);
// "Laptops", "Phones", "Tablets"

// Belirli seçeneğe tıkla
driver.findElement(By.linkText("Laptops")).click();`,
            tip: { tr: '✅ Alt menü JS ile açılıyorsa (hover event) Actions gerekir. CSS :hover ile açılıyorsa bazen sadece findElement + click yeterlidir.', en: '✅ If the sub-menu opens via a JS event (hover), Actions is required. If it opens via CSS :hover, sometimes just findElement + click is sufficient.' },
          },
          {
            id: 'dblclick', label: 'doubleClick', labelEn: 'doubleClick',
            visualState: 'dblclick',
            description: { tr: 'İki hızlı tıklama gönderir. Genellikle editable cell\'leri, inline editor\'ları veya dosya açmayı tetikler. Java\'da click().click() ile aynı değildir — tarayıcı çift tıklamayı özel bir olay olarak tanır.', en: 'Sends two rapid clicks. Typically triggers editable cells, inline editors, or file-opening. Not the same as click().click() in Java — the browser recognizes a double-click as a special event.' },
            code: `// Editable tablo hücresi — çift tıkla
WebElement cell = driver.findElement(
    By.cssSelector("td.editable[data-col='price']")
);

actions.doubleClick(cell).perform();

// Düzenleme modu açıldı — input görünür olana bekle
WebElement input = wait.until(
    ExpectedConditions.visibilityOf(
        cell.findElement(By.tagName("input"))
    )
);
input.clear();
input.sendKeys("299.99");
input.sendKeys(Keys.ENTER);`,
            tip: { tr: '✅ doubleClick, tek click\'ten farklı bir DOM event\'i tetikler (dblclick). Editable grid\'lerde click çalışmazsa doubleClick dene.', en: '✅ doubleClick fires a different DOM event (dblclick) than a single click. If click doesn\'t work on editable grids, try doubleClick.' },
          },
          {
            id: 'rightclick', label: 'contextClick', labelEn: 'contextClick',
            visualState: 'rightclick',
            description: { tr: 'Sağ tıklama — context menu (bağlam menüsü) açar. Java\'da MouseEvent.BUTTON3 gibi. Tarayıcının varsayılan sağ-tık menüsü değil, uygulamaya özel context menu için kullanılır.', en: 'Right-click — opens the context menu. Like MouseEvent.BUTTON3 in Java. Used for application-specific context menus, not the browser\'s built-in right-click menu.' },
            code: `// Dosyaya sağ tıkla → context menü aç
WebElement fileItem = driver.findElement(
    By.cssSelector("[data-file='report.pdf']")
);

actions.contextClick(fileItem).perform();

// Context menü belirene kadar bekle
wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.id("ctxMenu")
));

// Menü öğesine tıkla
driver.findElement(By.cssSelector("#ctxMenu [data-action='delete']"))
      .click();`,
            tip: { tr: '⚠️ Browser\'ın varsayılan sağ-tık menüsünü Selenium ile test edemezsin — sadece DOM\'daki custom context menu\'ları test edilebilir.', en: '⚠️ You cannot test the browser\'s native right-click menu with Selenium — only custom context menus in the DOM are testable.' },
          },
          {
            id: 'drag', label: 'dragAndDrop', labelEn: 'dragAndDrop',
            visualState: 'drag',
            description: { tr: 'Bir elementi tutup başka bir yere bırakma. Java\'da List.remove() + List.add() kadar mantıklı ama mouse ile. HTML5 drag-drop event\'leri için bazen JS injection gerekebilir — Actions yetmeyebilir.', en: 'Picking up an element and dropping it somewhere else. Makes as much sense as List.remove() + List.add() in Java but with the mouse. For HTML5 drag-drop events, JS injection may sometimes be needed — Actions might not be enough.' },
            code: `WebElement source = driver.findElement(
    By.id("draggable")
);
WebElement target = driver.findElement(
    By.id("droppable")
);

// Yöntem 1: dragAndDrop (en kolay)
actions.dragAndDrop(source, target).perform();

// Yöntem 2: offset ile (1. yöntem çalışmazsa)
actions.clickAndHold(source)
       .moveByOffset(200, 0) // 200px sağa
       .release()
       .perform();

// Yöntem 3: JS injection (HTML5 drag-drop için)
// ((JavascriptExecutor)driver).executeScript(
//     dragDropScript, source, target);`,
            tip: { tr: '⚠️ HTML5 drag-drop (React DnD, SortableJS) bazen Actions ile çalışmaz — JS injection gerekebilir. Önce Actions dene, çalışmazsa offset, sonra JS.', en: '⚠️ HTML5 drag-drop (React DnD, SortableJS) sometimes doesn\'t work with Actions — JS injection may be needed. Try Actions first, then offset, then JS.' },
          },
          {
            id: 'keyboard', label: 'Keyboard', labelEn: 'Keyboard',
            visualState: 'keyboard',
            description: { tr: 'Klavye kombinasyonları: Ctrl+A, Ctrl+C, Shift+Click vb. Java\'da Robot sınıfı gibi ama tarayıcı context\'inde. keyDown() tuşu basılı tutar, keyUp() bırakır — bu şekilde Ctrl+A gibi kombinasyonlar oluşturulur.', en: 'Keyboard combinations: Ctrl+A, Ctrl+C, Shift+Click etc. Like the Robot class in Java but in browser context. keyDown() holds a key, keyUp() releases — this is how combinations like Ctrl+A are created.' },
            code: `WebElement textArea = driver.findElement(
    By.id("editor")
);

// Ctrl+A → Sil → Yeni metin
actions.click(textArea)
       .keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL)
       .sendKeys(Keys.DELETE)
       .sendKeys("Yeni içerik buraya")
       .perform();

// Shift+Tıkla — çoklu seçim (tablo satırları)
WebElement firstRow = driver.findElement(By.cssSelector("tr:nth-child(1)"));
WebElement lastRow  = driver.findElement(By.cssSelector("tr:nth-child(5)"));
actions.click(firstRow)
       .keyDown(Keys.SHIFT).click(lastRow).keyUp(Keys.SHIFT)
       .perform();`,
            tip: { tr: '✅ keyDown → sendKeys → keyUp sıralaması kritik. keyUp unutulursa Ctrl basılı kalır ve sonraki işlemler beklenmedik davranır.', en: '✅ keyDown → sendKeys → keyUp order is critical. If keyUp is forgotten, Ctrl stays pressed and subsequent operations behave unexpectedly.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 9: Alerts, iFrames ve Çoklu Pencere', en: 'Step 9: Alerts, iFrames, Multiple Windows' } },
      {
        type: 'selenium-visual',
        concept: 'alert',
        color: '#ef4444',
        icon: '⚠️',
        title: { tr: 'Browser Alert / Confirm / Prompt — İnteraktif Rehber', en: 'Browser Alert / Confirm / Prompt — Interactive Guide' },
        steps: [
          {
            id: 'page', label: 'Tetikle', labelEn: 'Trigger',
            visualState: 'page',
            description: { tr: 'Alert, browser\'ın sayfanın önüne çıkardığı yerleşik bir diyalogdur. Açıldığında sayfa etkileşimi tamamen bloke olur. Önce alert\'in belirgin olmasını beklememiz gerekir.', en: 'An alert is a built-in browser dialog that appears over the page. It completely blocks page interaction when open. We must first wait for the alert to be present.' },
            code: `import org.openqa.selenium.Alert;
import org.openqa.selenium.support.ui.ExpectedConditions;

// Alert tetikle (test sayfasında bir butona tıklayarak)
driver.findElement(By.id("triggerAlert")).click();

// Alert belirene kadar bekle (zorunlu!)
wait.until(ExpectedConditions.alertIsPresent());

// Alert nesnesini al
Alert alert = driver.switchTo().alert();`,
            tip: { tr: '⚠️ alertIsPresent() olmadan doğrudan switchTo().alert() çağırırsan NoAlertPresentException alırsın. Her zaman önce bekle!', en: '⚠️ Calling switchTo().alert() without alertIsPresent() throws NoAlertPresentException. Always wait first!' },
          },
          {
            id: 'alert', label: 'alert()', labelEn: 'alert()',
            visualState: 'alert',
            description: { tr: 'En basit alert tipi — sadece mesaj + OK butonu. Java\'da System.exit() gibi: kullanıcıya bir şey bildiriyor ve sadece devam etmesine izin veriyor. dismiss() çalışmaz — sadece accept() var.', en: 'Simplest alert type — just a message + OK button. Like System.exit() in Java: informing the user and only allowing them to continue. dismiss() does not work — only accept() is available.' },
            code: `// Simple alert — sadece OK var, Cancel yok
Alert alert = driver.switchTo().alert();

// Mesajı oku
String msg = alert.getText(); // "Giriş başarılı!"

// OK'a bas → alert kapanır
alert.accept();

// Sonra sayfada işleme devam et
wait.until(ExpectedConditions.urlContains("/dashboard"));`,
            tip: { tr: '✅ alert() için sadece accept() kullan. dismiss() bazı tarayıcılarda çalışır ama standart değildir — simple alert\'te sadece OK var.', en: '✅ For alert(), only use accept(). dismiss() works in some browsers but is not standard — simple alerts only have OK.' },
          },
          {
            id: 'confirm', label: 'confirm()', labelEn: 'confirm()',
            visualState: 'confirm',
            description: { tr: 'İki seçenek sunan onay diyaloğu — OK (evet) ve Cancel (hayır). Java\'da boolean dönen bir metod gibi: accept() = true, dismiss() = false. Test senaryosu: "Sil" butonuna tıkla → confirm → onay ver veya reddet.', en: 'A confirmation dialog with two choices — OK (yes) and Cancel (no). Like a boolean-returning method in Java: accept() = true, dismiss() = false. Test scenario: click Delete → confirm dialog → accept or dismiss.' },
            code: `// confirm() → hem OK hem Cancel var
Alert confirm = driver.switchTo().alert();

String question = confirm.getText();
// "Sepeti temizlemek istediğinize emin misiniz?"

// OK'a bas (silmeyi onayla)
confirm.accept();

// VEYA Cancel'a bas (iptal et)
// confirm.dismiss();`,
            tip: { tr: '✅ Test stratejisi: bir test accept() ile onayla, bir test dismiss() ile iptal et — her iki dal da test edilmiş olur.', en: '✅ Test strategy: one test confirms with accept(), another cancels with dismiss() — both branches get tested.' },
          },
          {
            id: 'prompt', label: 'prompt()', labelEn: 'prompt()',
            visualState: 'prompt',
            description: { tr: 'Kullanıcıdan metin girişi isteyen diyalog. Java\'da Scanner.nextLine() ile kullanıcıdan input almak gibi. sendKeys() ile metin girilir, accept() ile gönderilir.', en: 'A dialog requesting text input from the user. Like Scanner.nextLine() in Java — reading user input. sendKeys() enters the text, accept() submits it.' },
            code: `// prompt() → metin girişi + OK/Cancel
Alert prompt = driver.switchTo().alert();

// Mevcut metni oku (varsa default değer)
String defaultVal = prompt.getText();
// "Kupon kodunu girin:"

// Metin gir
prompt.sendKeys("SAVE20");

// OK'a bas → sendKeys değeri gönderilir
prompt.accept();

// VEYA iptal et (metin gönderilmez)
// prompt.dismiss();`,
            tip: { tr: '⚠️ sendKeys() çağrısı zorunludur — yoksa prompt boş gönderilir. getText() prompt mesajını döndürür, input değerini değil.', en: '⚠️ sendKeys() call is required — otherwise prompt submits empty. getText() returns the prompt message, not the input value.' },
          },
          {
            id: 'accept', label: 'accept()', labelEn: 'accept()',
            visualState: 'accept',
            description: { tr: 'OK butonuna basmak. Tüm alert tipleri için çalışır. Java\'da bir metodu "evet" ile tamamlamak gibi. Alert kapandıktan sonra driver otomatik olarak ana sayfaya döner.', en: 'Presses the OK button. Works for all alert types. Like completing a method with "yes" in Java. After the alert closes, the driver automatically returns to the main page.' },
            code: `Alert alert = driver.switchTo().alert();

// OK butonuna bas
alert.accept(); // ← alert kapanır

// Alert kapandıktan sonra sayfayla devam et
String currentUrl = driver.getCurrentUrl();
assertTrue(currentUrl.contains("/success"));`,
            tip: { tr: '✅ accept() çağrısı sonrası alert kapanır ve driver otomatik olarak sayfaya döner — ayrıca switchTo().defaultContent() çağırman gerekmez.', en: '✅ After accept(), the alert closes and the driver automatically returns to the page — you do not need to call switchTo().defaultContent() separately.' },
          },
          {
            id: 'dismiss', label: 'dismiss()', labelEn: 'dismiss()',
            visualState: 'dismiss',
            description: { tr: 'Cancel butonuna basmak. confirm() ve prompt() için geçerlidir — simple alert\'te etkisi accept() ile aynıdır. Java\'da bir exception\'ı yakalayıp işlemi iptal etmek gibi.', en: 'Presses the Cancel button. Valid for confirm() and prompt() — for simple alert(), has same effect as accept(). Like catching an exception and canceling the operation in Java.' },
            code: `Alert confirm = driver.switchTo().alert();

// Cancel butonuna bas
confirm.dismiss(); // ← alert kapanır, işlem iptal

// Sepet hala dolu olmalı
WebElement cartCount = driver.findElement(By.id("cartCount"));
assertNotEquals("0", cartCount.getText());`,
            tip: { tr: '✅ dismiss() test stratejisi: "vazgeçme" senaryolarını test et. Kullanıcı iptal ettiğinde sistem doğru davranıyor mu? Bu negative test senaryolarında kritik.', en: '✅ dismiss() test strategy: test "cancellation" scenarios. Does the system behave correctly when the user cancels? Critical for negative test scenarios.' },
          },
        ],
      },
      {
        type: 'selenium-visual',
        concept: 'iframe',
        color: '#06b6d4',
        icon: '🖼️',
        title: { tr: 'iFrame Switching — İnteraktif Rehber', en: 'iFrame Switching — Interactive Guide' },
        steps: [
          {
            id: 'outer', label: 'Dış Sayfa', labelEn: 'Outer Page',
            visualState: 'outer',
            description: { tr: 'Varsayılan driver context\'i ana sayfadadır. iFrame\'i sadece bir WebElement olarak görür — içine erişemez. Java\'da farklı bir ClassLoader\'a sahip modül gibi: doğrudan erişim için özel switchTo() gerekir.', en: 'Default driver context is the main page. It sees the iFrame only as a WebElement — cannot access its contents. Like a module with a different ClassLoader in Java: special switchTo() is needed for direct access.' },
            code: `// Driver başlangıçta ana sayfada (outer context)
driver.get("https://shop.com/checkout");

// iFrame elementini BULABİLİRSİN
WebElement frame = driver.findElement(
    By.cssSelector("iframe.payment-frame")
);

// AMA iFrame içindeki elementi BULAMAZSIN!
// driver.findElement(By.id("cardNumber")) → NoSuchElementException!`,
            tip: { tr: '⚠️ iFrame içindeki elementlere erişmeden önce mutlaka switchTo().frame() çağrılmalıdır. Yoksa NoSuchElementException alırsın.', en: '⚠️ switchTo().frame() must be called before accessing elements inside an iFrame. Otherwise you get NoSuchElementException.' },
          },
          {
            id: 'switch-by-id', label: 'switchTo()', labelEn: 'switchTo()',
            visualState: 'switch-by-id',
            description: { tr: 'switchTo().frame() ile driver context\'ini iFrame\'e taşıyoruz. Üç farklı overload var: ID/Name, Index, ve WebElement. En güvenilir olanı WebElement overload\'u — DOM\'daki iframe elementini referans alır.', en: 'We move the driver context into the iFrame with switchTo().frame(). Three overloads: ID/Name, Index, and WebElement. Most reliable is the WebElement overload — references the iframe element in the DOM.' },
            code: `// 3 farklı switchTo() yöntemi:

// 1. ID veya name attribute ile (en yaygın)
driver.switchTo().frame("paymentFrame");

// 2. Sayfa sırasına göre index ile (0'dan başlar)
driver.switchTo().frame(0);

// 3. WebElement ile (en güvenilir)
WebElement iframe = driver.findElement(
    By.cssSelector("iframe.payment-frame")
);
driver.switchTo().frame(iframe); // ← önerilen`,
            tip: { tr: '✅ WebElement overload en güvenilir: iframe\'in id/name attribute\'ü değişse bile eleman CSS selector ile bulunur. Index overload — sıra değişirse yanlış frame.', en: '✅ WebElement overload is most reliable: even if the iframe id/name attribute changes, the element is found by CSS selector. Index overload — breaks if order changes.' },
          },
          {
            id: 'inner', label: 'Frame İçi', labelEn: 'Inside Frame',
            visualState: 'inner',
            description: { tr: 'Driver context artık iFrame içinde. Tüm findElement() çağrıları artık sadece bu frame\'in DOM\'unu tarar — sanki ana sayfa bu frame\'miş gibi. Java\'da farklı bir namespace\'e girmek gibi.', en: 'Driver context is now inside the iFrame. All findElement() calls now only search this frame\'s DOM — as if the main page were this frame. Like entering a different namespace in Java.' },
            code: `// switchTo().frame() sonrası — artık iFrame içindeyiz!
// findElement artık SADECE frame içini tarar

driver.findElement(By.id("cardNumber"))
    .sendKeys("4111 1111 1111 1111");
driver.findElement(By.id("cvv"))
    .sendKeys("123");
driver.findElement(By.id("expiry"))
    .sendKeys("12/26");

// Frame içinde WebDriverWait da çalışır
wait.until(ExpectedConditions.elementToBeClickable(
    By.id("payBtn"))).click();`,
            tip: { tr: '✅ Frame içinde tüm normal Selenium metodları çalışır: click(), sendKeys(), findElements(), waits vb. Farklı bir şey yoktur — sadece context değişmiştir.', en: '✅ All normal Selenium methods work inside the frame: click(), sendKeys(), findElements(), waits, etc. Nothing different — only the context has changed.' },
          },
          {
            id: 'nested', label: 'Nested Frame', labelEn: 'Nested Frame',
            visualState: 'nested',
            description: { tr: 'Frame içinde frame. Her iç frame\'e girmek için ayrı switchTo() gerekir. Java\'da iç içe synchronized bloklar gibi — her girişte bağlamı yönetmek gerekir.', en: 'Frame within a frame. Each inner frame requires a separate switchTo(). Like nested synchronized blocks in Java — context management is required for each entry.' },
            code: `// İlk frame'e geç
driver.switchTo().frame("paymentFrame");

// Birinci frame içindeyiz — ama içinde başka bir frame var
// captcha frame'e geç (payment frame'in içindeki)
driver.switchTo().frame("captchaFrame");

// Şimdi en derin frame'deyiz
driver.findElement(By.id("recaptchaBox")).click();

// Bir üst frame'e dön (parentFrame)
driver.switchTo().parentFrame();
// Şimdi paymentFrame'deyiz tekrar`,
            tip: { tr: '⚠️ Nested frame\'lerde defaultContent() en dışa götürür (tüm frame\'leri çıkar). parentFrame() sadece bir üste çıkar. Hangi context\'te olduğunu takip et.', en: '⚠️ In nested frames, defaultContent() goes all the way out (exits all frames). parentFrame() goes up just one level. Track which context you\'re in.' },
          },
          {
            id: 'back', label: 'defaultContent()', labelEn: 'defaultContent()',
            visualState: 'back',
            description: { tr: 'switchTo().defaultContent() ile driver context\'i ana sayfaya (outer page) geri döndürürüz — iç içe kaç frame olursa olsun tek çağrıda çıkar. Frame işlemleri bittiğinde her zaman çağrılmalıdır.', en: 'switchTo().defaultContent() returns the driver context to the main page (outer page) — exits all frames in one call regardless of how deeply nested. Always call it after frame operations are done.' },
            code: `// Frame içinde işlemi bitirdik
driver.findElement(By.id("payBtn")).click();

// Ana sayfaya dön — TÜM frame'lerden çıkar
driver.switchTo().defaultContent();

// Artık ana sayfadaki elementlere erişebiliriz
wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.id("orderConfirmation")));

String orderNo = driver.findElement(
    By.id("orderNumber")).getText();`,
            tip: { tr: '✅ Her zaman try-finally ile frame\'den çık: try { frame işlemleri } finally { driver.switchTo().defaultContent(); } — exception olsa bile temiz context.', en: '✅ Always exit the frame with try-finally: try { frame operations } finally { driver.switchTo().defaultContent(); } — clean context even on exception.' },
          },
          {
            id: 'parent', label: 'parentFrame()', labelEn: 'parentFrame()',
            visualState: 'parent',
            description: { tr: 'switchTo().parentFrame() sadece bir üst frame\'e çıkar — defaultContent() gibi tüm framelardan çıkmaz. Nested frame\'lerde kademeli çıkış için kullanılır. Java\'da super.method() çağrısı gibi — bir üst seviyeye gider.', en: 'switchTo().parentFrame() goes up only one frame level — unlike defaultContent() which exits all frames. Used for stepwise exit in nested frames. Like super.method() in Java — goes up exactly one level.' },
            code: `// 3 seviye derinlik: main → paymentFrame → captchaFrame

driver.switchTo().frame("paymentFrame");
driver.switchTo().frame("captchaFrame");
// Şimdi captchaFrame'deyiz (en derin)

// Bir üst çıkar → paymentFrame
driver.switchTo().parentFrame();

// Bir üst daha → main page (defaultContent ile aynı)
driver.switchTo().parentFrame();
// ÜST YOK → main page'deyiz

// VEYA direkt ana sayfaya: defaultContent()
// driver.switchTo().defaultContent();`,
            tip: { tr: '✅ 2-3 derinlikli nested frame\'lerde parentFrame() daha kontrollü. Kaç seviye derinlikte olduğundan emin değilsen defaultContent() kullan — her zaman ana sayfaya götürür.', en: '✅ parentFrame() is more controlled for 2-3 level nested frames. If unsure how deep you are, use defaultContent() — always goes to the main page.' },
          },
        ],
      },
      {
        type: 'selenium-visual',
        concept: 'window',
        color: '#8b5cf6',
        icon: '🪟',
        title: { tr: 'Çoklu Pencere & Sekme Yönetimi — İnteraktif Rehber', en: 'Multi-Window & Tab Management — Interactive Guide' },
        steps: [
          {
            id: 'single', label: 'getHandle()', labelEn: 'getHandle()',
            visualState: 'single',
            description: { tr: 'Başlangıçta tek pencere. getWindowHandle() mevcut pencereyi temsil eden benzersiz bir String ID döndürür — Java\'da Thread.currentThread().getId() gibi. Bu ID\'yi kaydetmeli ve geri dönüş için kullanmalısın.', en: 'Start with a single window. getWindowHandle() returns a unique String ID representing the current window — like Thread.currentThread().getId() in Java. Save this ID for returning later.' },
            code: `// Mevcut (ana) pencere handle'ını kaydet
String mainHandle = driver.getWindowHandle();
System.out.println("Ana: " + mainHandle); // "CDw0..."

// Mevcut tüm pencereleri al (şimdilik sadece 1)
Set<String> handles = driver.getWindowHandles();
System.out.println("Pencere sayısı: " + handles.size()); // 1`,
            tip: { tr: '✅ Ana pencere handle\'ını her zaman test başında kaydet — geri dönmek için gerekecek. İnternette "string handle" olarak aranır — benzersiz bir UUID benzeri değerdir.', en: '✅ Always save the main window handle at the start of the test — you\'ll need it to return. Unique UUID-like string per window.' },
          },
          {
            id: 'handles', label: 'getHandles()', labelEn: 'getHandles()',
            visualState: 'handles',
            description: { tr: 'Yeni pencere/popup açıldıktan sonra getWindowHandles() artık 2 (veya daha fazla) handle döndürür. Java\'da Set<String> — sıralı değil, her çalıştırmada farklı sıra olabilir. Ana pencereyi bildiğimiz için farkı bulabiliriz.', en: 'After a new window/popup opens, getWindowHandles() now returns 2 (or more) handles. Java Set<String> — unordered, different order each run. Since we know the main handle, we can find the difference.' },
            code: `// Yeni pencere açıldı (ör. "Yeni Sekmede Aç" linki tıklandı)
driver.findElement(By.linkText("Ürün Detayı")).click();

// Şimdi 2 handle var
Set<String> allHandles = driver.getWindowHandles();
System.out.println("Sayı: " + allHandles.size()); // 2

// Yeni pencere handle'ı = mainHandle dışındaki
String newHandle = allHandles.stream()
    .filter(h -> !h.equals(mainHandle))
    .findFirst().orElseThrow();`,
            tip: { tr: '✅ Set\'ten yeni handle\'ı bulmak için stream().filter() kullan. forEach ile döngü yerine functional yaklaşım daha okunabilir.', en: '✅ Use stream().filter() to find the new handle from the Set. Functional approach is more readable than forEach loop.' },
          },
          {
            id: 'switched', label: 'switchTo()', labelEn: 'switchTo()',
            visualState: 'switched',
            description: { tr: 'switchTo().window(handle) ile yeni pencereye geçiyoruz. Artık tüm driver komutları yeni pencereye uygulanır. Java\'da farklı bir Thread\'in context\'ine geçmek gibi — ThreadLocal değiştirildi.', en: 'We switch to the new window with switchTo().window(handle). All driver commands now apply to the new window. Like switching to a different Thread\'s context in Java — ThreadLocal changed.' },
            code: `// Yeni pencereye geç
driver.switchTo().window(newHandle);

// Artık yeni penceredeyiz — URL doğrula
wait.until(ExpectedConditions.urlContains("/product/"));
String productTitle = driver.findElement(
    By.cssSelector("h1.product-title")).getText();
System.out.println("Ürün: " + productTitle);

// Yeni pencerede istediğin işlemi yap
driver.findElement(By.id("addToCart")).click();`,
            tip: { tr: '✅ switchTo().window() sonrası yeni URL\'in yüklenmesini wait ile bekle. Hemen findElement() çağırırsan StaleElementReferenceException alabilirsin.', en: '✅ After switchTo().window(), wait for the new URL to load. Immediately calling findElement() may throw StaleElementReferenceException.' },
          },
          {
            id: 'back', label: 'Geri Dön', labelEn: 'Switch Back',
            visualState: 'back',
            description: { tr: 'İşimiz bitince ana pencereye geri dönüyoruz. Opsiyonel olarak yeni pencereyi kapatıp (close()) ana pencereye geçebiliriz. Java\'da ExecutorService.shutdown() gibi — açtığın kaynakları temizle.', en: 'When done, we return to the main window. Optionally close the new window (close()) and switch back to main. Like ExecutorService.shutdown() in Java — clean up what you opened.' },
            code: `// Yeni pencereyi kapat (opsiyonel)
driver.close(); // Sadece aktif (yeni) pencereyi kapatır

// Ana pencereye geri dön — ZORUNLU!
driver.switchTo().window(mainHandle);

// Artık ana penceredeyiz — işleme devam et
wait.until(ExpectedConditions.urlContains("/shop"));
String cartCount = driver.findElement(
    By.id("cartCount")).getText();
assertEquals("1", cartCount);`,
            tip: { tr: '⚠️ driver.close() sadece aktif pencereyi kapatır — driver\'ı kapatmaz. Ana pencereye geçmeden close() çağırırsan WebDriverException alırsın!', en: '⚠️ driver.close() only closes the active window — not the driver. Calling close() without switching to main first throws WebDriverException!' },
          },
          {
            id: 'new-tab', label: 'Selenium 4 Tab', labelEn: 'Selenium 4 Tab',
            visualState: 'new-tab',
            description: { tr: 'Selenium 4 ile yeni sekme veya pencereyi programatik olarak açabiliyoruz — JavaScript hack\'ine gerek yok. WindowType.TAB = yeni sekme, WindowType.WINDOW = yeni pencere. Java\'da ExecutorService.submit() ile yeni thread açmak gibi.', en: 'With Selenium 4, we can programmatically open a new tab or window — no JavaScript hack needed. WindowType.TAB = new tab, WindowType.WINDOW = new window. Like ExecutorService.submit() opening a new thread in Java.' },
            code: `import org.openqa.selenium.WindowType;

// Selenium 4: Yeni sekme aç ve geç (tek satırda!)
driver.switchTo().newWindow(WindowType.TAB);

// Yeni sekmede URL'e git
driver.get("https://other-site.com/product");

String newTabTitle = driver.getTitle();
System.out.println("Yeni sekme: " + newTabTitle);

// Yeni pencere açmak için:
// driver.switchTo().newWindow(WindowType.WINDOW);`,
            tip: { tr: '✅ Selenium 4\'ün en güzel özelliklerinden biri. newWindow() otomatik olarak yeni pencereye/sekmeye geçer — ayrıca switchTo().window() çağırman gerekmez.', en: '✅ One of Selenium 4\'s nicest features. newWindow() automatically switches to the new window/tab — no need for a separate switchTo().window() call.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 10: Tam E2E Test — automationexercise.com', en: 'Step 10: Complete E2E Test' } },
      {
        type: 'code', language: 'java', label: 'E2E Testi — Login → Ürün Ara → Sepete Ekle → Doğrula',
        code: `import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.support.ui.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EcommerceE2ETest {

    static WebDriver driver;
    static WebDriverWait wait;
    static final String BASE = "https://automationexercise.com";

    @BeforeAll
    static void setup() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions opts = new ChromeOptions();
        opts.addArguments("--start-maximized", "--disable-notifications");
        driver = new ChromeDriver(opts);
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @Test @Order(1) @DisplayName("1. Ana sayfayı aç ve doğrula")
    void openHomePage() {
        driver.get(BASE);
        wait.until(ExpectedConditions.titleContains("Automation Exercise"));
        assertTrue(driver.getTitle().contains("Automation Exercise"));
        System.out.println("✅ Ana sayfa: " + driver.getTitle());
    }

    @Test @Order(2) @DisplayName("2. Login sayfasına git ve giriş yap")
    void login() {
        driver.findElement(By.cssSelector("a[href='/login']")).click();
        wait.until(ExpectedConditions.urlContains("/login"));

        driver.findElement(By.cssSelector("[data-qa='login-email']"))
              .sendKeys("testuser@example.com");
        driver.findElement(By.cssSelector("[data-qa='login-password']"))
              .sendKeys("TestPass123");
        driver.findElement(By.cssSelector("[data-qa='login-button']")).click();

        wait.until(ExpectedConditions.presenceOfElementLocated(
            By.cssSelector("a[href='/logout']")));
        assertTrue(driver.findElement(By.cssSelector("a[href='/logout']")).isDisplayed());
        System.out.println("✅ Giriş başarılı");
    }

    @Test @Order(3) @DisplayName("3. Ürün sayfasında arama yap")
    void searchProduct() {
        driver.findElement(By.cssSelector("a[href='/products']")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("search_product")));

        driver.findElement(By.id("search_product")).sendKeys("Blue Top");
        driver.findElement(By.id("submit_search")).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".product-image-wrapper")));
        List<WebElement> products = driver.findElements(
            By.cssSelector(".product-image-wrapper"));
        assertFalse(products.isEmpty(), "Ürün listesi boş olmamalı");
        System.out.println("✅ " + products.size() + " ürün bulundu");
    }

    @Test @Order(4) @DisplayName("4. İlk ürünü sepete ekle")
    void addToCart() {
        List<WebElement> addBtns = driver.findElements(
            By.cssSelector(".add-to-cart"));
        assertFalse(addBtns.isEmpty(), "Sepete ekle butonu olmalı");
        addBtns.get(0).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".modal-content")));
        assertTrue(driver.findElement(By.cssSelector(".modal-content")).isDisplayed());

        // "Continue Shopping" tıkla
        driver.findElement(By.cssSelector("button[data-dismiss='modal']")).click();
        System.out.println("✅ Ürün sepete eklendi");
    }

    @AfterAll
    static void teardown() {
        if (driver != null) driver.quit();
        System.out.println("✅ Tarayıcı kapatıldı");
    }
}`,
      },
      {
        type: 'quiz',
        question: { tr: 'Explicit wait ile implicit wait arasındaki temel fark nedir?', en: 'Main difference between explicit and implicit wait?' },
        options: [
          { id: 'a', text: 'Explicit wait daha yavaştır, implicit wait daha hızlı' },
          { id: 'b', text: 'Implicit wait, belirli bir koşulun gerçekleşmesini bekler' },
          { id: 'c', text: 'Explicit wait belirli bir koşul gerçekleşene kadar bekler; implicit wait tüm findElement\'ler için global timeout tanımlar' },
          { id: 'd', text: 'Thread.sleep() ile aynıdır, sadece sözdizimi farklı' },
        ],
        correct: 'c',
        explanation: { tr: 'Explicit wait (WebDriverWait + ExpectedConditions), belirli bir koşul yerine gelene kadar döngüsel olarak kontrol eder — önerilen yaklaşımdır. Implicit wait ise tüm findElement çağrıları için global bir max timeout süresi tanımlar. İkisini birlikte kullanmak beklenmedik gecikmelere yol açar. Thread.sleep() ise koşulsuz olarak N saniye bekler — Selenium ile kullanılmamalıdır.', en: 'Explicit wait (WebDriverWait + ExpectedConditions) polls until a specific condition is met — the recommended approach. Implicit wait defines a global max timeout for all findElement calls. Mixing both causes unpredictable delays. Thread.sleep() unconditionally waits N seconds — avoid it with Selenium.' },
      
        retryQuestion: {
      "question": {
            "tr": "WebDriverWait ile implicit wait kullanımı hakkında hangisi doğrudur?",
            "en": "Which statement is true regarding the usage of WebDriverWait vs implicit wait?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Implicit wait, belirli elementler için daha hassas bir bekleme sağlar",
                  "en": "Implicit wait provides more precise waiting for specific elements"
            },
            {
                  "id": "b",
                  "text": "WebDriverWait (Explicit), kodun geri kalanını duraklatmadan koşullu beklemeye izin verir",
                  "en": "WebDriverWait (Explicit) allows conditional waiting without pausing the rest of the code execution"
            },
            {
                  "id": "c",
                  "text": "Explicit wait kullanırken implicit wait de tanımlanmalıdır",
                  "en": "Implicit wait must be defined while using explicit wait"
            },
            {
                  "id": "d",
                  "text": "Explicit wait ve implicit wait aynı anda kullanıldığında bekleme süreleri birbirini kısaltır",
                  "en": "When used together, explicit wait and implicit wait shorten each other's waiting time"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Explicit wait, sadece ihtiyaç duyulan element için akıllı bir bekleme mekanizması sunar. Implicit wait ise driver düzeyinde tanımlanır ve tüm element arama işlemlerini etkiler; ikisinin bir arada kullanılması Selenium'un davranışını öngörülemez hale getirir.",
            "en": "Explicit wait offers an intelligent waiting mechanism specifically for the required element. Implicit wait is defined at the driver level and affects all element search operations; using them together makes Selenium's behavior unpredictable."
      }
}
},
    ],
  },
  en: {
    title: '🌐 Selenium WebDriver — Step by Step',
    blocks: [
      {
        type: 'simple-box', emoji: '🌐',
        content: 'Think of Selenium WebDriver as a robot: "Click that button, type in this field, wait for the page." You write the commands in Java, the robot runs them in the browser. Selenium 4 is the most mature Java test library: Chrome, Firefox, Edge, Safari — all supported.',
      },
      { type: 'heading', text: { en: 'Step 1: Maven Setup' } },
      {
        type: 'code', language: 'xml', label: 'pom.xml — Selenium 4 + WebDriverManager',
        code: `<dependencies>
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.20.0</version>
  </dependency>
  <dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.8.0</version>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
      },
      { type: 'heading', text: { en: 'Steps 2-3: Browser Launch & Navigation' } },
      {
        type: 'code', language: 'java', label: 'Browser setup and navigation commands',
        code: `WebDriverManager.chromedriver().setup();
ChromeOptions opts = new ChromeOptions();
opts.addArguments("--start-maximized");
// opts.addArguments("--headless=new"); // for CI
WebDriver driver = new ChromeDriver(opts);

// Navigation
driver.get("https://automationexercise.com");
driver.navigate().back();
driver.navigate().forward();
driver.navigate().refresh();

// Page info
System.out.println(driver.getTitle());
System.out.println(driver.getCurrentUrl());

driver.quit(); // always in finally!`,
      },
      { type: 'heading', text: { en: 'Step 4: Finding Elements — 8 By Strategies' } },
      {
        type: 'simple-box',
        emoji: '🔍',
        content: {
          en: 'A locator is how your automation code identifies an element on the page — like finding a book in a library. Going by shelf number (id) is fastest; searching by "red cover" (class) is risky because multiple red covers may exist.',
          tr: 'Locator, otomasyon kodunuzun sayfadaki bir elementi tanımlama yöntemidir. Kütüphanede kitabı raf numarasıyla (id) bulmak en hızlısı; "kırmızı kapaklı" (class) ile aramak riskli çünkü birden fazla kırmızı kapak olabilir.',
        },
      },
      {
        type: 'locator-visual',
        htmlExample: `<form id="loginForm" class="login-form">

  <label for="username">Username</label>

  <input
    id="username"
    class="form-input"
    name="email"
    type="email"
    placeholder="Email"
    data-testid="username-input" />

  <button
    id="loginBtn"
    class="btn btn-primary"
    type="submit"
    data-testid="login-btn">
    Login
  </button>

  <a href="/forgot">Forgot Password</a>

</form>`,
        locators: [
          {
            id: 'by-id', label: 'By.id()', priority: 1, starRating: '⭐⭐⭐', color: '#10b981',
            highlights: ['id="username"'],
            code: `WebElement el = driver.findElement(By.id("username"));
// Fastest: browsers optimize id lookups`,
            title: 'En Hızlı & En Güvenilir',
            titleEn: 'Fastest & Most Reliable',
            explanation: 'Directly targets the id attribute. Browsers optimize id lookups, making this the fastest locator. id must be unique per page — like a final constant in Java.',
            explanationEn: 'Directly targets the id attribute. Browsers optimize id lookups, making this the fastest locator. id must be unique per page — like a final constant in Java.',
            tip: '✅ Always first choice. If no id, request the dev team to add one. "By id" is QA automation standard.',
            tipEn: '✅ Always first choice. If no id, request the dev team to add one. "By id" is QA automation standard.',
            when: 'Element\'in id attribute\'ü varsa — HER ZAMAN kullan',
            whenEn: 'When element has an id attribute — ALWAYS use it first',
          },
          {
            id: 'by-data-testid', label: '[data-testid]', priority: 1, starRating: '⭐⭐⭐', color: '#06b6d4',
            highlights: ['data-testid="username-input"'],
            code: `WebElement el = driver.findElement(
    By.cssSelector("[data-testid='username-input']")
);
// or: By.cssSelector("[data-qa='username']")`,
            title: 'Test için Tasarlanmış — En İyi Pratik',
            titleEn: 'Designed for Testing — Best Practice',
            explanation: 'data-testid is added specifically for QA. Tests don\'t break even if styles, ids or classes change. Industry standard in React/Vue/Angular — like an interface in Java: contract stays intact even if implementation changes.',
            explanationEn: 'data-testid is added specifically for QA. Tests don\'t break even if styles, ids or classes change. Industry standard in React/Vue/Angular — like an interface in Java: contract stays intact even if implementation changes.',
            tip: '✅ BEST PRACTICE: Ask the dev team to add data-testid to all testable elements. Most stable locator long-term.',
            tipEn: '✅ BEST PRACTICE: Ask the dev team to add data-testid to all testable elements. Most stable locator long-term.',
            when: 'data-testid varsa id\'den bile önce tercih et',
            whenEn: 'When data-testid exists, prefer it even over id',
          },
          {
            id: 'by-name', label: 'By.name()', priority: 3, starRating: '⭐⭐', color: '#3b82f6',
            highlights: ['name="email"'],
            code: `WebElement el = driver.findElement(By.name("email"));
// This is the field name submitted to the backend
// Think: like an HTTP request parameter name`,
            title: 'Form Elementleri için Doğal Seçim',
            titleEn: 'Natural Choice for Form Elements',
            explanation: 'Targets the name attribute on HTML form elements. Common in login, register, search forms — same as the field name POSTed to the backend. Like HTTP parameter names in Java.',
            explanationEn: 'Targets the name attribute on HTML form elements. Common in login, register, search forms — same as the field name POSTed to the backend. Like HTTP parameter names in Java.',
            tip: '✅ Second choice for form fields when no id. Multiple elements may share the same name — be careful.',
            tipEn: '✅ Second choice for form fields when no id. Multiple elements may share the same name — be careful.',
            when: 'id yoksa form input / select / textarea için',
            whenEn: 'For form input, select, textarea when no id exists',
          },
          {
            id: 'by-class', label: 'By.className()', priority: 5, starRating: '⭐', color: '#f59e0b',
            highlights: ['class="form-input"'],
            code: `// WARNING: may return multiple elements!
List<WebElement> els =
    driver.findElements(By.className("form-input"));
WebElement first = els.get(0);`,
            title: 'Dikkat: Genellikle Birden Fazla Eşleşir',
            titleEn: 'Warning: Usually Matches Multiple Elements',
            explanation: 'Targets a CSS class name. The same class is usually used on multiple elements — findElement() returns the first, findElements() returns all. Like List.get(0) in Java: risky unless you\'re certain.',
            explanationEn: 'Targets a CSS class name. The same class is usually used on multiple elements — findElement() returns the first, findElements() returns all. Like List.get(0) in Java: risky unless you\'re certain.',
            tip: '⚠️ Takes a single class name — write "form-input" not "form-input btn". Prefer cssSelector combo for non-unique classes.',
            tipEn: '⚠️ Takes a single class name — write "form-input" not "form-input btn". Prefer cssSelector combo for non-unique classes.',
            when: 'Sayfada tam olarak TEK bir elementi olan class için',
            whenEn: 'Only when the class matches exactly one element on the page',
          },
          {
            id: 'by-css-id', label: 'cssSelector #id', priority: 2, starRating: '⭐⭐⭐', color: '#8b5cf6',
            highlights: ['id="loginBtn"'],
            code: `// # = id selector (CSS syntax)
WebElement btn =
    driver.findElement(By.cssSelector("#loginBtn"));
// Can add conditions: #loginBtn[disabled]
// Superset of By.id() — same speed, more options`,
            title: 'CSS id Seçicisi — By.id() ile Eşdeğer',
            titleEn: 'CSS id Selector — Equivalent to By.id()',
            explanation: 'In CSS syntax, # selects by id. Same speed as By.id(). Difference: cssSelector can combine with other attributes. Like method overloading in Java — same base, different parameters.',
            explanationEn: 'In CSS syntax, # selects by id. Same speed as By.id(). Difference: cssSelector can combine with other attributes. Like method overloading in Java — same base, different parameters.',
            tip: '✅ Same speed as By.id() — but cssSelector can add extra filters: #loginBtn[type="submit"] etc.',
            tipEn: '✅ Same speed as By.id() — but cssSelector can add extra filters: #loginBtn[type="submit"] etc.',
            when: 'id ile birlikte başka attribute da kontrol etmek gerektiğinde',
            whenEn: 'When checking id along with additional attribute constraints',
          },
          {
            id: 'by-css-combo', label: 'cssSelector combo', priority: 2, starRating: '⭐⭐⭐', color: '#7c3aed',
            highlights: ['class="form-input"', 'name="email"'],
            code: `// Tag + class + attribute combination:
WebElement el = driver.findElement(
    By.cssSelector("input.form-input[name='email']")
);
// input → tag  |  .form-input → class  |  [name='email'] → attr`,
            title: 'Kombine CSS — Çok Spesifik & Güvenilir',
            titleEn: 'Combined CSS — Very Specific & Reliable',
            explanation: 'Combines tag name, class and attributes in one selector. Minimal risk of wrong element selection. Like filtering HashMap.entrySet() with multiple conditions in Java — more criteria, more unique.',
            explanationEn: 'Combines tag name, class and attributes in one selector. Minimal risk of wrong element selection. Like filtering HashMap.entrySet() with multiple conditions in Java — more criteria, more unique.',
            tip: '✅ Preferred when data-testid is not available. Tag + class + attribute is both reliable and readable.',
            tipEn: '✅ Preferred when data-testid is not available. Tag + class + attribute is both reliable and readable.',
            when: 'Benzersizlik için birden fazla attribute birleştirmek gerektiğinde',
            whenEn: 'When combining multiple attributes for uniqueness is required',
          },
          {
            id: 'by-linktext', label: 'By.linkText()', priority: 6, starRating: '⭐', color: '#ec4899',
            highlights: ['Şifremi Unuttum'],
            code: `// Only works for <a> tags!
WebElement link =
    driver.findElement(By.linkText("Şifremi Unuttum"));

// Partial text match:
WebElement part =
    driver.findElement(By.partialLinkText("Şifrem"));`,
            title: 'Yalnızca <a> Linkleri — Büyük/Küçük Harf Duyarlı',
            titleEn: 'Only <a> Links — Case Sensitive',
            explanation: 'Only targets visible text of <a> anchor elements. Case-sensitive. Breaks if text changes or if the app is multilingual. Requires exact match like String.equals() in Java.',
            explanationEn: 'Only targets visible text of <a> anchor elements. Case-sensitive. Breaks if text changes or if the app is multilingual. Requires exact match like String.equals() in Java.',
            tip: '⚠️ Links only. In multilingual apps this locator breaks tests — prefer href attribute or data-testid.',
            tipEn: '⚠️ Links only. In multilingual apps this locator breaks tests — prefer href attribute or data-testid.',
            when: 'Yalnızca statik metin içeren <a> linkleri için',
            whenEn: 'Only for <a> link elements with static, non-translated text',
          },
          {
            id: 'by-xpath', label: 'By.xpath()', priority: 8, starRating: '⭐', color: '#ef4444',
            highlights: ['type="submit"'],
            code: `// By attribute:
driver.findElement(
    By.xpath("//button[@type='submit']"));

// By text:
driver.findElement(
    By.xpath("//button[text()='Login']"));

// Axis — DOM relationship (most powerful):
driver.findElement(
    By.xpath("//label[@for='username']/following-sibling::input"));`,
            title: 'En Güçlü — Ama Son Çare',
            titleEn: 'Most Powerful — But Last Resort',
            explanation: 'Uses XML path expressions. Can express complex DOM relationships (parent/child/sibling/ancestor). Slowest locator — breaks easily when page structure changes. Like reflection in Java: very powerful but think before using.',
            explanationEn: 'Uses XML path expressions. Can express complex DOM relationships (parent/child/sibling/ancestor). Slowest locator — breaks easily when page structure changes. Like reflection in Java: very powerful but think before using.',
            tip: '⛔ Last resort. If achievable with cssSelector, avoid xpath. Unavoidable: shadow DOM, inside iframes, complex DOM relationships.',
            tipEn: '⛔ Last resort. If achievable with cssSelector, avoid xpath. Unavoidable: shadow DOM, inside iframes, complex DOM relationships.',
            when: 'Başka hiçbir locator çalışmadığında — özellikle DOM ilişkisi gerektiğinde',
            whenEn: 'Only when no other locator works — especially for DOM relationship navigation',
          },
        ],
      },
      { type: 'heading', text: { en: 'Steps 5-8: Actions, Waits, Screenshot, JS, Actions Class' } },
      {
        type: 'code', language: 'java', label: 'Complete Selenium reference',
        code: `// ── ELEMENT ACTIONS ─────────────────────────────────
el.click();                      el.sendKeys("text");
el.clear();                      el.submit();
el.getText();                    el.getAttribute("value");
el.isDisplayed();                el.isEnabled();
el.isSelected();

// ── SELECT ───────────────────────────────────────────
Select sel = new Select(driver.findElement(By.id("country")));
sel.selectByVisibleText("Turkey");
sel.selectByValue("TR");
sel.getFirstSelectedOption().getText();

// ── EXPLICIT WAIT (RECOMMENDED) ──────────────────────
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("btn")));
wait.until(ExpectedConditions.elementToBeClickable(By.id("btn")));
wait.until(ExpectedConditions.urlContains("/dashboard"));
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("spinner")));

// ── SCREENSHOT ───────────────────────────────────────
byte[] bytes = ((TakesScreenshot)driver).getScreenshotAs(OutputType.BYTES);

// ── JAVASCRIPT ───────────────────────────────────────
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("arguments[0].click();", el);
js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
String title = (String) js.executeScript("return document.title");

// ── ACTIONS CLASS ────────────────────────────────────
Actions actions = new Actions(driver);
actions.moveToElement(menu).perform();           // hover
actions.doubleClick(el).perform();               // double click
actions.contextClick(el).perform();              // right click
actions.dragAndDrop(source, target).perform();   // drag & drop`,
      },
      {
        type: 'selenium-visual',
        concept: 'dropdown',
        color: '#f59e0b',
        icon: '🔽',
        title: { en: 'Select Dropdown — Step-by-Step Interactive Guide', tr: 'Select Dropdown — Adım Adım İnteraktif Rehber' },
        steps: [
          { id: 'wrap', label: 'Select Wrap', labelEn: 'Select Wrap', visualState: 'wrap', description: { en: 'Wrap the <select> WebElement with the Select class — like wrapping an ArrayList with Collections.sort() in Java — adding dropdown-specific capabilities on top of the basic WebElement.', tr: 'WebElement olarak bulunan <select> elemanını Select sınıfına sarıyoruz.' }, code: `import org.openqa.selenium.support.ui.Select;\n\nWebElement el = driver.findElement(By.id("country"));\nSelect dropdown = new Select(el);\n\nboolean isMulti = dropdown.isMultiple();`, tip: { en: '✅ Select class only works for native <select> elements. Custom dropdowns (built with ul/li) require a different strategy.', tr: '✅ Select sınıfı sadece <select> elementi için çalışır.' } },
          { id: 'byText', label: 'byVisibleText', labelEn: 'byVisibleText', visualState: 'byText', selectedValue: 'tr', description: { en: 'Select by the text the user sees. Like List.stream().filter(s -> s.equals("Turkey")).findFirst() in Java — requires exact text match, case-sensitive.', tr: 'Kullanıcının gördüğü metne göre seçim.' }, code: `dropdown.selectByVisibleText("Türkiye");\n\n// Case-sensitive! "türkiye" won't work\nString selected = dropdown.getFirstSelectedOption().getText();\nSystem.out.println(selected); // "Türkiye"`, tip: { en: '⚠️ Breaks if visible text changes (i18n, A/B testing). Prefer selectByValue() — value attribute is usually more stable.', tr: '⚠️ Görünen metin değişirse test kırılır.' } },
          { id: 'byValue', label: 'byValue', labelEn: 'byValue', visualState: 'byValue', selectedValue: 'tr', description: { en: 'Select by the HTML value attribute — like <option value="TR">Turkey</option>. Like Map.get("TR") in Java — direct key access, not text search.', tr: 'HTML value attribute değerine göre seçim.' }, code: `dropdown.selectByValue("tr");\n// <option value="tr">Türkiye</option>\n\nString val = dropdown.getFirstSelectedOption().getAttribute("value");\nSystem.out.println(val); // "tr"`, tip: { en: '✅ Most reliable selection method. Value attribute is independent of display text — stays constant even if language changes.', tr: '✅ En güvenilir seçim yöntemi.' } },
          { id: 'byIndex', label: 'byIndex', labelEn: 'byIndex', visualState: 'byIndex', selectedValue: 'tr', description: { en: 'Select by 0-based index — like List.get(0) in Java. Least reliable: if a new country is added to the list, all indexes shift.', tr: '0\'dan başlayan index ile seçim.' }, code: `dropdown.selectByIndex(0); // "Türkiye" (first)\ndropdown.selectByIndex(2); // "Germany"\n\nint total = dropdown.getOptions().size();\nSystem.out.println("Total: " + total); // 4`, tip: { en: '⛔ Last resort — if UI order changes, index selects wrong element. Use only when selectByValue/Text is not possible.', tr: '⛔ Son tercih — UI sırası değişirse yanlış element.' } },
          { id: 'firstSelected', label: 'getSelected', labelEn: 'getSelected', visualState: 'firstSelected', selectedValue: 'us', description: { en: 'Read the currently selected option — like List.stream().filter(isSelected).findFirst() in Java. Used to verify the selection was made correctly with assertions.', tr: 'Şu anda seçili option\'ı okuma.' }, code: `WebElement selected = dropdown.getFirstSelectedOption();\n\nString text = selected.getText();\nString value = selected.getAttribute("value");\n\nassertEquals("USA", text);\nassertEquals("us", value);`, tip: { en: '✅ Always add assertion after selection: assertEquals("USA", dropdown.getFirstSelectedOption().getText())', tr: '✅ Seçim sonrası her zaman assertion ekle.' } },
          { id: 'getOptions', label: 'getOptions()', labelEn: 'getOptions()', visualState: 'getOptions', description: { en: 'Returns all options as List<WebElement>. Like getting a List<String> in Java. Used to test dynamic dropdowns that load options from the API.', tr: 'Tüm option\'ları List<WebElement> olarak döndürür.' }, code: `List<WebElement> options = dropdown.getOptions();\n\nfor (int i = 0; i < options.size(); i++) {\n    System.out.println(i + ": " + options.get(i).getText()\n        + " [value=" + options.get(i).getAttribute("value") + "]");\n}`, tip: { en: '✅ Dropdown test strategy: verify the list with getOptions() first (expected count?), then make selection with selectByValue().', tr: '✅ Önce getOptions() ile listeyi doğrula, sonra selectByValue() ile seçim yap.' } },
        ],
      },
      {
        type: 'selenium-visual',
        concept: 'alert',
        color: '#ef4444',
        icon: '⚠️',
        title: { en: 'Browser Alert / Confirm / Prompt — Interactive Guide', tr: 'Browser Alert / Confirm / Prompt — İnteraktif Rehber' },
        steps: [
          { id: 'page', label: 'Tetikle', labelEn: 'Trigger', visualState: 'page', description: { en: 'An alert is a built-in browser dialog that appears over the page. It completely blocks page interaction. We must wait for it to be present before interacting.', tr: 'Alert, browser\'ın sayfanın önüne çıkardığı yerleşik bir diyalogdur.' }, code: `import org.openqa.selenium.Alert;\n\ndriver.findElement(By.id("triggerAlert")).click();\n\n// Wait for alert\nwait.until(ExpectedConditions.alertIsPresent());\n\nAlert alert = driver.switchTo().alert();`, tip: { en: '⚠️ Always call alertIsPresent() first — calling switchTo().alert() without it throws NoAlertPresentException.', tr: '⚠️ Her zaman önce alertIsPresent() bekle!' } },
          { id: 'alert', label: 'alert()', labelEn: 'alert()', visualState: 'alert', description: { en: 'Simplest alert type — just a message + OK button. Like System.exit() in Java. dismiss() does not work here — only accept() is available.', tr: 'En basit alert tipi — sadece mesaj + OK butonu.' }, code: `Alert alert = driver.switchTo().alert();\n\nString msg = alert.getText(); // "Login successful!"\n\nalert.accept(); // Press OK → alert closes\n\nwait.until(ExpectedConditions.urlContains("/dashboard"));`, tip: { en: '✅ For simple alert(), only use accept(). dismiss() is not standard for alerts — only OK button exists.', tr: '✅ alert() için sadece accept() kullan.' } },
          { id: 'confirm', label: 'confirm()', labelEn: 'confirm()', visualState: 'confirm', description: { en: 'A confirmation dialog with two choices — OK (yes) and Cancel (no). Like a boolean-returning method in Java: accept() = true, dismiss() = false.', tr: 'İki seçenek sunan onay diyaloğu.' }, code: `Alert confirm = driver.switchTo().alert();\n\nString question = confirm.getText();\n\n// Press OK (confirm the action)\nconfirm.accept();\n\n// OR press Cancel (cancel the action)\n// confirm.dismiss();`, tip: { en: '✅ Test strategy: one test confirms with accept(), another cancels with dismiss() — both branches get tested.', tr: '✅ İki test: biri accept(), biri dismiss() — her iki dal test edilir.' } },
          { id: 'prompt', label: 'prompt()', labelEn: 'prompt()', visualState: 'prompt', description: { en: 'A dialog requesting text input from the user. Like Scanner.nextLine() in Java — reading user input. sendKeys() enters the text, accept() submits it.', tr: 'Kullanıcıdan metin girişi isteyen diyalog.' }, code: `Alert prompt = driver.switchTo().alert();\n\nString message = prompt.getText();\n// "Enter coupon code:"\n\nprompt.sendKeys("SAVE20");\n\nprompt.accept(); // Submit with OK\n// prompt.dismiss(); // Cancel (text not sent)`, tip: { en: '⚠️ sendKeys() is required — otherwise prompt submits empty. getText() returns the prompt message, not the typed input.', tr: '⚠️ sendKeys() zorunludur — yoksa prompt boş gönderilir.' } },
          { id: 'accept', label: 'accept()', labelEn: 'accept()', visualState: 'accept', description: { en: 'Presses the OK button. Works for all alert types. After the alert closes, the driver automatically returns to the main page — no need to call defaultContent().', tr: 'OK butonuna basmak. Tüm alert tipleri için çalışır.' }, code: `Alert alert = driver.switchTo().alert();\nalert.accept(); // ← alert closes\n\n// Driver automatically back on page\nString url = driver.getCurrentUrl();\nassertTrue(url.contains("/success"));`, tip: { en: '✅ After accept(), alert closes and driver returns to page automatically — no switchTo().defaultContent() needed.', tr: '✅ accept() sonrası alert kapanır, driver sayafaya döner.' } },
          { id: 'dismiss', label: 'dismiss()', labelEn: 'dismiss()', visualState: 'dismiss', description: { en: 'Presses the Cancel button. Valid for confirm() and prompt(). Like catching an exception and canceling the operation in Java. Negative test scenarios — what happens when user cancels?', tr: 'Cancel butonuna basmak.' }, code: `Alert confirm = driver.switchTo().alert();\n\nconfirm.dismiss(); // Press Cancel\n\n// Cart should still have items\nWebElement count = driver.findElement(By.id("cartCount"));\nassertNotEquals("0", count.getText());`, tip: { en: '✅ dismiss() test strategy: verify negative path — does system behave correctly when user cancels? Critical for negative test scenarios.', tr: '✅ Negative test: kullanıcı iptal ettiğinde sistem doğru davranıyor mu?' } },
        ],
      },
      {
        type: 'selenium-visual',
        concept: 'iframe',
        color: '#06b6d4',
        icon: '🖼️',
        title: { en: 'iFrame Switching — Interactive Guide', tr: 'iFrame Switching — İnteraktif Rehber' },
        steps: [
          { id: 'outer', label: 'Dış Sayfa', labelEn: 'Outer Page', visualState: 'outer', description: { en: 'Default driver context is the main page. It sees the iFrame only as a WebElement — cannot access its contents. Like a module with a different ClassLoader in Java: special switchTo() needed.', tr: 'Varsayılan driver context\'i ana sayfadadır.' }, code: `driver.get("https://shop.com/checkout");\n\n// Can FIND the iframe element\nWebElement frame = driver.findElement(\n    By.cssSelector("iframe.payment-frame")\n);\n\n// But CANNOT access elements inside it!\n// → NoSuchElementException!`, tip: { en: '⚠️ Always call switchTo().frame() before accessing elements inside an iFrame — otherwise NoSuchElementException.', tr: '⚠️ iFrame içine girmeden önce switchTo().frame() çağır.' } },
          { id: 'switch-by-id', label: 'switchTo()', labelEn: 'switchTo()', visualState: 'switch-by-id', description: { en: 'Move the driver context into the iFrame with switchTo().frame(). Three overloads: ID/Name, Index, and WebElement. WebElement overload is most reliable.', tr: 'switchTo().frame() ile driver context\'ini iFrame\'e taşıyoruz.' }, code: `// 3 overloads:\n\n// 1. By id or name attribute\ndriver.switchTo().frame("paymentFrame");\n\n// 2. By page order (0-indexed)\ndriver.switchTo().frame(0);\n\n// 3. By WebElement (recommended)\nWebElement iframe = driver.findElement(\n    By.cssSelector("iframe.payment-frame")\n);\ndriver.switchTo().frame(iframe);`, tip: { en: '✅ WebElement overload is most reliable: even if iframe id/name changes, found by CSS selector. Index overload breaks if order changes.', tr: '✅ WebElement overload en güvenilir.' } },
          { id: 'inner', label: 'Frame İçi', labelEn: 'Inside Frame', visualState: 'inner', description: { en: 'Driver context is now inside the iFrame. All findElement() calls now only search this frame\'s DOM. Like entering a different namespace in Java.', tr: 'Driver context artık iFrame içinde.' }, code: `// After switchTo().frame() — we're inside!\ndriver.findElement(By.id("cardNumber"))\n    .sendKeys("4111 1111 1111 1111");\ndriver.findElement(By.id("cvv"))\n    .sendKeys("123");\n\n// Waits work inside frames too\nwait.until(ExpectedConditions.elementToBeClickable(\n    By.id("payBtn"))).click();`, tip: { en: '✅ All normal Selenium methods work inside the frame — click(), sendKeys(), findElements(), waits, etc. Only the context has changed.', tr: '✅ Frame içinde tüm normal Selenium metodları çalışır.' } },
          { id: 'nested', label: 'Nested Frame', labelEn: 'Nested Frame', visualState: 'nested', description: { en: 'Frame within a frame. Each inner frame requires a separate switchTo(). Like nested synchronized blocks in Java.', tr: 'Frame içinde frame.' }, code: `driver.switchTo().frame("paymentFrame");\n\n// Inside payment frame → another frame here\ndriver.switchTo().frame("captchaFrame");\n\n// Now in deepest frame\ndriver.findElement(By.id("recaptchaBox")).click();\n\n// Go up one level (parentFrame)\ndriver.switchTo().parentFrame();`, tip: { en: '⚠️ defaultContent() goes all the way out. parentFrame() goes up one level. Track which context you\'re in.', tr: '⚠️ defaultContent() en dışa çıkar, parentFrame() bir üste.' } },
          { id: 'back', label: 'defaultContent()', labelEn: 'defaultContent()', visualState: 'back', description: { en: 'switchTo().defaultContent() returns the driver to the main page — exits all frames in one call. Always call it after frame operations are done.', tr: 'switchTo().defaultContent() driver\'ı ana sayfaya döndürür.' }, code: `// Done with frame operations\ndriver.findElement(By.id("payBtn")).click();\n\n// Return to main page\ndriver.switchTo().defaultContent();\n\n// Now access main page elements\nwait.until(ExpectedConditions.visibilityOfElementLocated(\n    By.id("orderConfirmation")));\nString orderNo = driver.findElement(\n    By.id("orderNumber")).getText();`, tip: { en: '✅ Best practice: use try-finally: try { frame ops } finally { driver.switchTo().defaultContent(); }', tr: '✅ try-finally ile her zaman frame\'den temiz çık.' } },
          { id: 'parent', label: 'parentFrame()', labelEn: 'parentFrame()', visualState: 'parent', description: { en: 'switchTo().parentFrame() goes up exactly one frame level — unlike defaultContent() which exits all. Like super.method() in Java — goes up exactly one level.', tr: 'switchTo().parentFrame() sadece bir üst frame\'e çıkar.' }, code: `// 3 levels: main → paymentFrame → captchaFrame\n\ndriver.switchTo().frame("paymentFrame");\ndriver.switchTo().frame("captchaFrame");\n// Now in captchaFrame (deepest)\n\n// Up one level → paymentFrame\ndriver.switchTo().parentFrame();\n\n// Up one more → main page\ndriver.switchTo().parentFrame();`, tip: { en: '✅ parentFrame() is more controlled for 2-3 level nesting. Unsure how deep? Use defaultContent() — always goes to main page.', tr: '✅ 2-3 derinlikte parentFrame() daha kontrollü. Emin değilsen defaultContent() kullan.' } },
        ],
      },
      {
        type: 'selenium-visual',
        concept: 'window',
        color: '#8b5cf6',
        icon: '🪟',
        title: { en: 'Multi-Window & Tab Management — Interactive Guide', tr: 'Çoklu Pencere & Sekme Yönetimi — İnteraktif Rehber' },
        steps: [
          { id: 'single', label: 'getHandle()', labelEn: 'getHandle()', visualState: 'single', description: { en: 'Start with a single window. getWindowHandle() returns a unique String ID. Save it for returning later — like Thread.currentThread().getId() in Java.', tr: 'Başlangıçta tek pencere.' }, code: `String mainHandle = driver.getWindowHandle();\nSystem.out.println("Main: " + mainHandle); // "CDw0..."\n\nSet<String> handles = driver.getWindowHandles();\nSystem.out.println("Count: " + handles.size()); // 1`, tip: { en: '✅ Always save the main window handle at the start of the test — you\'ll need it to return.', tr: '✅ Test başında ana handle\'ı her zaman kaydet.' } },
          { id: 'handles', label: 'getHandles()', labelEn: 'getHandles()', visualState: 'handles', description: { en: 'After a new window/popup opens, getWindowHandles() returns 2+ handles. Java Set<String> — unordered. Find the new one by filtering out the main handle.', tr: 'Yeni pencere açıldıktan sonra getWindowHandles() 2 handle döndürür.' }, code: `driver.findElement(By.linkText("Product Detail")).click();\n\nSet<String> allHandles = driver.getWindowHandles();\nSystem.out.println("Count: " + allHandles.size()); // 2\n\nString newHandle = allHandles.stream()\n    .filter(h -> !h.equals(mainHandle))\n    .findFirst().orElseThrow();`, tip: { en: '✅ Use stream().filter() to find the new handle from the Set — more readable than forEach loop.', tr: '✅ stream().filter() ile yeni handle\'ı bul.' } },
          { id: 'switched', label: 'switchTo()', labelEn: 'switchTo()', visualState: 'switched', description: { en: 'Switch to the new window with switchTo().window(handle). All driver commands now apply to the new window. Like switching to a different Thread\'s context in Java.', tr: 'switchTo().window(handle) ile yeni pencereye geçiyoruz.' }, code: `driver.switchTo().window(newHandle);\n\n// Now we're in the new window\nwait.until(ExpectedConditions.urlContains("/product/"));\nString title = driver.findElement(\n    By.cssSelector("h1.product-title")).getText();\n\ndriver.findElement(By.id("addToCart")).click();`, tip: { en: '✅ After switchTo().window(), wait for the new URL to load before accessing elements.', tr: '✅ switchTo() sonrası yeni URL\'i bekle.' } },
          { id: 'back', label: 'Geri Dön', labelEn: 'Switch Back', visualState: 'back', description: { en: 'Return to the main window. Optionally close the new window first with close(). Like ExecutorService.shutdown() in Java — clean up what you opened.', tr: 'İşimiz bitince ana pencereye geri dönüyoruz.' }, code: `// Optionally close the new window\ndriver.close(); // closes only active window\n\n// Return to main — REQUIRED!\ndriver.switchTo().window(mainHandle);\n\n// Now on main page\nwait.until(ExpectedConditions.urlContains("/shop"));\nassertEquals("1", driver.findElement(\n    By.id("cartCount")).getText());`, tip: { en: '⚠️ driver.close() closes only the active window. Without switching back to main first, you lose the driver connection!', tr: '⚠️ driver.close() sadece aktif pencereyi kapatır — ana pencereye geç yoksa driver bağlantısı kopar!' } },
          { id: 'new-tab', label: 'Selenium 4 Tab', labelEn: 'Selenium 4 Tab', visualState: 'new-tab', description: { en: 'Selenium 4 can programmatically open a new tab or window — no JavaScript needed. WindowType.TAB = new tab, WindowType.WINDOW = new window.', tr: 'Selenium 4 ile yeni sekme programatik olarak açılabilir.' }, code: `import org.openqa.selenium.WindowType;\n\n// Open new tab AND switch to it\ndriver.switchTo().newWindow(WindowType.TAB);\n\ndriver.get("https://other-site.com/product");\nSystem.out.println(driver.getTitle());\n\n// New window:\n// driver.switchTo().newWindow(WindowType.WINDOW);`, tip: { en: '✅ Selenium 4: newWindow() automatically switches to the new tab — no separate switchTo().window() call needed.', tr: '✅ Selenium 4: newWindow() otomatik yeni sekmeye geçer.' } },
        ],
      },
      { type: 'heading', text: { en: 'Step 9: Complete E2E Test Example' } },
      {
        type: 'code', language: 'java', label: 'E2E Test — Login → Search → Add to Cart',
        code: `@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EcommerceE2ETest {

    static WebDriver driver;
    static WebDriverWait wait;

    @BeforeAll
    static void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver(new ChromeOptions()
            .addArguments("--start-maximized"));
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @Test @Order(1) void openHomePage() {
        driver.get("https://automationexercise.com");
        wait.until(ExpectedConditions.titleContains("Automation Exercise"));
        assertTrue(driver.getTitle().contains("Automation Exercise"));
    }

    @Test @Order(2) void searchProduct() {
        driver.findElement(By.cssSelector("a[href='/products']")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("search_product")));
        driver.findElement(By.id("search_product")).sendKeys("Blue Top");
        driver.findElement(By.id("submit_search")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".product-image-wrapper")));
        assertFalse(driver.findElements(By.cssSelector(".product-image-wrapper")).isEmpty());
    }

    @AfterAll
    static void teardown() { if (driver != null) driver.quit(); }
}`,
      },
      {
        type: 'quiz',
        question: { en: 'What is the recommended locator priority in Selenium?' },
        options: [
          { id: 'a', text: 'xpath > cssSelector > id > name' },
          { id: 'b', text: 'id > cssSelector > name > xpath (last resort)' },
          { id: 'c', text: 'className > tagName > id > xpath' },
          { id: 'd', text: 'linkText > partialLinkText > id > cssSelector' },
        ],
        correct: 'b',
        explanation: { en: 'id is the fastest and most reliable locator — unique in the DOM. cssSelector is second fastest and supports attribute selectors (data-testid). xpath is the most powerful but slowest — use only when nothing else works. Avoid tagName and className as primary locators since they often return multiple elements.' },
      
        retryQuestion: {
      "question": {
            "en": "In Selenium automation, why is 'id' generally considered the best locator strategy?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "It is the easiest to type in code"
            },
            {
                  "id": "b",
                  "text": "It is the only locator that can be used with CSS"
            },
            {
                  "id": "c",
                  "text": "It is guaranteed to be unique within a valid HTML document and provides the fastest element resolution"
            },
            {
                  "id": "d",
                  "text": "It automatically bypasses all waiting requirements"
            }
      ],
      "correct": "c",
      "explanation": {
            "en": "According to HTML standards, an 'id' attribute should be unique on a page. Locating by ID is the most efficient and stable method because the browser engine can resolve it directly without traversing the DOM tree extensively, unlike complex XPath expressions."
      }
}
},
    ],
  },
}

// ─── S-PLAYWRIGHT: PLAYWRIGHT JAVA ─────────────────────────────────────────
const sPlaywright = {
  tr: {
    title: '🎭 Playwright Java — Adım Adım Kullanım',
    blocks: [
      {
        type: 'simple-box', emoji: '🎭',
        content: { tr: 'Playwright\'ı akıllı bir dedektif asistan gibi düşün: "Bu butonu bul ve tıkla" dediğinde, o butonu bekler, hazır olana kadar otomatik bekler, sonra tıklar. Selenium\'da kendinin "Bekle şunu, sonra yap bunu" dermen gerekirdi. Playwright\'ta sadece "yap" dersin — o gerisini düşünür.', en: 'Think of Playwright as a smart detective assistant: when you say "find this button and click it," it locates the button, auto-waits until it\'s ready, then clicks. With Selenium you had to say "wait for this, then do that" yourself. With Playwright you just say "do it" — it handles the rest.' },
      },
      { type: 'heading', text: { tr: 'Adım 1: Maven Kurulumu', en: 'Step 1: Maven Setup' } },
      {
        type: 'code', language: 'xml', label: 'pom.xml — Playwright Java',
        code: `<dependencies>
  <!-- Playwright Java (her şey dahil: Chrome, Firefox, WebKit) -->
  <dependency>
    <groupId>com.microsoft.playwright</groupId>
    <artifactId>playwright</artifactId>
    <version>1.44.0</version>
  </dependency>

  <!-- JUnit5 runner -->
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>

<!-- Browser binary'lerini indir (ilk kez) -->
<!-- mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install" -->`,
      },
      { type: 'heading', text: { tr: 'Adım 2: Tarayıcı Açma ve Kapatma', en: 'Step 2: Browser Launch' } },
      {
        type: 'code', language: 'java', label: { tr: 'Chromium / Firefox / WebKit başlatma', en: 'Chromium / Firefox / WebKit Launch' },
        code: { tr: `import com.microsoft.playwright.*;

public class BrowserSetup {
    public static void main(String[] args) {

        // try-with-resources → otomatik kapanır (Java'da AutoCloseable gibi)
        try (Playwright playwright = Playwright.create()) {

            // ── Chromium (Chrome/Edge tabanlı) ──────────────────
            Browser browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions()
                    .setHeadless(false)         // görsel mod (geliştirme)
                    .setSlowMo(100)             // her işlem arası 100ms bekle
            );
            // CI/CD için: .setHeadless(true)

            // ── Firefox ─────────────────────────────────────────
            // Browser browser = playwright.firefox().launch();

            // ── WebKit (Safari) ─────────────────────────────────
            // Browser browser = playwright.webkit().launch();

            // BrowserContext → Page (Selenium'da WebDriver → window)
            BrowserContext context = browser.newContext(
                new Browser.NewContextOptions()
                    .setViewportSize(1280, 720)
                    .setLocale("tr-TR")
            );
            Page page = context.newPage();

            page.navigate("https://automationexercise.com");
            System.out.println("Başlık: " + page.title());
            System.out.println("URL: " + page.url());

            browser.close(); // context ve page'ler otomatik kapanır
        }
    }
}`, en: `import com.microsoft.playwright.*;

public class BrowserSetup {
    public static void main(String[] args) {

        // try-with-resources → auto-closes (like AutoCloseable in Java)
        try (Playwright playwright = Playwright.create()) {

            // ── Chromium (Chrome/Edge based) ─────────────────────
            Browser browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions()
                    .setHeadless(false)         // visual mode (development)
                    .setSlowMo(100)             // wait 100ms between actions
            );
            // For CI/CD: .setHeadless(true)

            // ── Firefox ──────────────────────────────────────────
            // Browser browser = playwright.firefox().launch();

            // ── WebKit (Safari) ──────────────────────────────────
            // Browser browser = playwright.webkit().launch();

            // BrowserContext → Page (like WebDriver → window in Selenium)
            BrowserContext context = browser.newContext(
                new Browser.NewContextOptions()
                    .setViewportSize(1280, 720)
                    .setLocale("en-US")
            );
            Page page = context.newPage();

            page.navigate("https://automationexercise.com");
            System.out.println("Title: " + page.title());
            System.out.println("URL: " + page.url());

            browser.close(); // context and pages close automatically
        }
    }
}` },
      },
      { type: 'heading', text: { tr: 'Adım 3: Sayfa Navigasyonu', en: 'Step 3: Navigation' } },
      {
        type: 'code', language: 'java', label: { tr: 'Tüm navigasyon komutları', en: 'All navigation commands' },
        code: `Page page = context.newPage();

// URL aç — DOM yüklenene kadar otomatik bekler
page.navigate("https://automationexercise.com");

// navigate() seçenekleri
page.navigate("https://google.com",
    new Page.NavigateOptions()
        .setWaitUntil(WaitUntilState.NETWORKIDLE) // ağ sessizleşene kadar bekle
        .setTimeout(30000)                         // 30 saniye timeout
);

// Geri / İleri / Yenile — Selenium'da navigate().back() gibi
page.goBack();
page.goForward();
page.reload();

// Sayfa bilgileri
String title  = page.title();        // "Automation Exercise"
String url    = page.url();          // "https://..."
String source = page.content();      // Tüm HTML (Selenium: getPageSource())

// Popup / Yeni sekme bekle (Selenium'da getWindowHandles() yerine)
Page popup = page.waitForPopup(() -> {
    page.locator("#openPopupBtn").click();
});
System.out.println("Popup URL: " + popup.url());`,
      },
      { type: 'heading', text: { tr: 'Adım 4: Element Bulma — 8 Locator Stratejisi', en: 'Step 4: Element Locators — 8 Strategies' } },
      {
        type: 'simple-box',
        emoji: '🔍',
        content: {
          tr: 'Playwright locator\'ları, Selenium\'un By.* metodlarından çok daha akıllıdır: element DOM\'a eklenene kadar otomatik bekler, ayrıca görünür ve enabled olmasını da bekler. Java\'da bir Future<WebElement> gibi — hazır olunca verir.',
          en: 'Playwright locators are much smarter than Selenium\'s By.* methods: they auto-wait until the element is in the DOM and also wait for it to be visible and enabled. Like a Future<WebElement> in Java — gives it when ready.',
        },
      },
      {
        type: 'locator-visual',
        codeLabel: 'Playwright (Java)',
        htmlExample: {
          tr: `<form id="loginForm" class="login-form">

  <label for="username">Kullanıcı Adı</label>

  <input
    id="username"
    class="form-input"
    name="email"
    type="email"
    placeholder="E-posta"
    data-testid="username-input"
    aria-label="Email Address" />

  <button
    id="loginBtn"
    class="btn btn-primary"
    type="submit"
    data-testid="login-btn">
    Giriş Yap
  </button>

  <a href="/forgot">Şifremi Unuttum</a>

</form>`,
          en: `<form id="loginForm" class="login-form">

  <label for="username">Username</label>

  <input
    id="username"
    class="form-input"
    name="email"
    type="email"
    placeholder="Email"
    data-testid="username-input"
    aria-label="Email Address" />

  <button
    id="loginBtn"
    class="btn btn-primary"
    type="submit"
    data-testid="login-btn">
    Login
  </button>

  <a href="/forgot">Forgot Password</a>

</form>`
        },
        locators: [
          {
            id: 'by-role', label: 'getByRole()', priority: 1, starRating: '⭐⭐⭐', color: '#10b981',
            highlights: ['type="email"'],
            code: `// Playwright'ın EN ÖNERİLEN locator'ı!
Locator el = page.getByRole(
    AriaRole.TEXTBOX,
    new Page.GetByRoleOptions().setName("Email Address")
);
// role → HTML semantic rolü (button, textbox, checkbox...)
// name → aria-label veya label metni`,
            title: 'En Semantik — Erişilebilirlik Odaklı',
            titleEn: 'Most Semantic — Accessibility-Focused',
            explanation: 'HTML\'nin ARIA semantic rollerini hedefler. Kullanıcının sayfayı nasıl gördüğüne göre çalışır — HTML yapısı değişse bile test kırılmaz. Java\'da interface\'le programming gibi: implementasyon değişse kontrat bozulmaz. Playwright takımının 1. tercihi.',
            explanationEn: 'Targets HTML ARIA semantic roles. Works based on how the user sees the page — tests don\'t break even if HTML structure changes. Like programming to an interface in Java: contract stays intact even if implementation changes. Playwright team\'s 1st recommendation.',
            tip: '✅ EN ÖNERİLEN: getByRole() hem semantik hem kırılmaz. AriaRole.BUTTON, TEXTBOX, CHECKBOX, LINK, HEADING, LIST, LISTITEM...',
            tipEn: '✅ MOST RECOMMENDED: getByRole() is both semantic and resilient. AriaRole.BUTTON, TEXTBOX, CHECKBOX, LINK, HEADING, LIST, LISTITEM...',
            when: 'Element\'in ARIA rolü varsa — HER ZAMAN ilk tercih',
            whenEn: 'When element has an ARIA role — ALWAYS first choice',
          },
          {
            id: 'by-testid', label: 'getByTestId()', priority: 1, starRating: '⭐⭐⭐', color: '#06b6d4',
            highlights: ['data-testid="username-input"'],
            code: `// data-testid attribute'ü ile — test için tasarlanmış
Locator el = page.getByTestId("username-input");

// Varsayılan: data-testid attribute'ünü arar
// playwright.config'de özelleştirilebilir:
// use: { testIdAttribute: 'data-qa' }`,
            title: 'Test için Tasarlanmış — En İyi Pratik',
            titleEn: 'Designed for Testing — Best Practice',
            explanation: 'data-testid özellikle QA için eklenir. Stil, class veya yapı değişse bile test bozulmaz. Selenium\'un By.cssSelector("[data-testid=\'...\']") ile aynı şey ama çok daha temiz sözdizimi.',
            explanationEn: 'data-testid is added specifically for QA. Tests don\'t break even if styles, classes or structure change. Same as Selenium\'s By.cssSelector("[data-testid=\'...\']") but much cleaner syntax.',
            tip: '✅ EN İYİ PRATİK: Tüm test elementlerine data-testid eklemesini geliştirici ekipten iste.',
            tipEn: '✅ BEST PRACTICE: Ask the dev team to add data-testid to all testable elements.',
            when: 'data-testid varsa — getByRole() ile eşdeğer öncelik',
            whenEn: 'When data-testid exists — equal priority with getByRole()',
          },
          {
            id: 'by-label', label: 'getByLabel()', priority: 2, starRating: '⭐⭐⭐', color: '#3b82f6',
            highlights: ['for="username"', 'Kullanıcı Adı'],
            code: { tr: `// <label for="username">Kullanıcı Adı</label> ile eşleştirir
Locator el = page.getByLabel("Kullanıcı Adı");

// Kısmi eşleşme:
Locator el2 = page.getByLabel("Kullanıcı", new Page.GetByLabelOptions().setExact(false));

// Selenium'da bunu By ile yapamazsın!
// label → input ilişkisini otomatik çözer`, en: `// Matches via <label for="username">Username</label>
Locator el = page.getByLabel("Username");

// Partial match:
Locator el2 = page.getByLabel("User", new Page.GetByLabelOptions().setExact(false));

// Can't do this with Selenium's By methods!
// Automatically resolves the label → input relationship` },
            title: 'Form Alanları için Doğal Seçim',
            titleEn: 'Natural Choice for Form Fields',
            explanation: 'HTML label elementini bulur ve onun hedeflediği form input\'unu seçer. Selenium\'da bunu yapabilmek için XPath with following-sibling yazmak gerekirdi. Java\'da bir Builder pattern gibi — label adını bil, input\'u otomatik bul.',
            explanationEn: 'Finds the HTML label element and selects the form input it targets. In Selenium, you\'d need XPath with following-sibling to do this. Like a Builder pattern in Java — know the label name, auto-find the input.',
            tip: '✅ Login, kayıt, form sayfaları için ideal. Kullanıcının gördüğü label metnine göre eşleşir — HTML\'nin for/id bağlantısını otomatik çözer.',
            tipEn: '✅ Ideal for login, registration, form pages. Matches by the label text the user sees — automatically resolves the HTML for/id connection.',
            when: 'Form input\'unun ilişkili bir label\'ı varsa',
            whenEn: 'When a form input has an associated label element',
          },
          {
            id: 'by-placeholder', label: 'getByPlaceholder()', priority: 3, starRating: '⭐⭐', color: '#8b5cf6',
            highlights: ['placeholder="E-posta"'],
            code: `// placeholder attribute'ü ile eşleştirir
Locator el = page.getByPlaceholder("E-posta");

// Kısmi eşleşme (exact: false):
Locator el2 = page.getByPlaceholder(
    "E",
    new Page.GetByPlaceholderOptions().setExact(false)
);
// Selenium'da: By.cssSelector("input[placeholder='E-posta']")`,
            title: 'Placeholder Metni ile Eşleşme',
            titleEn: 'Match by Placeholder Text',
            explanation: 'Input elementinin placeholder attribute\'ünü hedefler. label yoksa veya placeholder daha okunaklıysa kullanılır. Selenium\'da By.cssSelector("input[placeholder=\'...\']") ile aynı ama daha temiz.',
            explanationEn: 'Targets the placeholder attribute of input elements. Used when there\'s no label or placeholder is more readable. Same as By.cssSelector("input[placeholder=\'...\']") in Selenium but cleaner.',
            tip: '⚠️ Placeholder metni i18n ile değişebilir. Mümkünse getByLabel() veya getByTestId() tercih et.',
            tipEn: '⚠️ Placeholder text may change with i18n. Prefer getByLabel() or getByTestId() when possible.',
            when: 'label yoksa ve placeholder sabit metinse',
            whenEn: 'When no label exists and placeholder is static text',
          },
          {
            id: 'by-text', label: 'getByText()', priority: 4, starRating: '⭐⭐', color: '#f59e0b',
            highlights: ['Giriş Yap'],
            code: { tr: `// Görünen metin içeriğine göre eşleştirir
Locator btn = page.getByText("Giriş Yap");

// Tam eşleşme (varsayılan):
Locator exact = page.getByText("Giriş Yap", new Page.GetByTextOptions().setExact(true));

// Kısmi eşleşme:
Locator partial = page.getByText("Giriş", new Page.GetByTextOptions().setExact(false));

// Selenium'da: By.xpath("//button[text()='Giriş Yap']")`, en: `// Matches by visible text content
Locator btn = page.getByText("Login");

// Exact match (default):
Locator exact = page.getByText("Login", new Page.GetByTextOptions().setExact(true));

// Partial match:
Locator partial = page.getByText("Log", new Page.GetByTextOptions().setExact(false));

// Selenium equiv: By.xpath("//button[text()='Login']")` },
            title: 'Görünen Metin ile Eşleşme',
            titleEn: 'Match by Visible Text',
            explanation: 'Sayfadaki görünen metni hedefler. Buton, link, label, div — her tür element için çalışır. Selenium\'da linkText() sadece <a> için çalışırdı; getByText() tüm elementlerde çalışır.',
            explanationEn: 'Targets visible text on the page. Works for any element type — button, link, label, div. In Selenium, linkText() only worked for <a>; getByText() works on all elements.',
            tip: '⚠️ Dil değişince test kırılır. i18n uygulamalarında data-testid veya getByRole() tercih et.',
            tipEn: '⚠️ Breaks when language changes. In i18n apps, prefer data-testid or getByRole().',
            when: 'Statik metin içeren buton veya link için, dil değişmiyorsa',
            whenEn: 'For buttons or links with static text when language won\'t change',
          },
          {
            id: 'by-css-id', label: 'locator("#id")', priority: 2, starRating: '⭐⭐⭐', color: '#7c3aed',
            highlights: ['id="username"'],
            code: `// CSS selector — Selenium'da By.id() ve By.cssSelector() gibi
Locator el = page.locator("#username");

// data-testid ile aynı anda (chaining ile filtre):
Locator el2 = page.locator("#loginForm").locator("#username");

// Selenium karşılığı:
// driver.findElement(By.id("username"))`,
            title: 'CSS id Seçicisi — Hızlı ve Güvenilir',
            titleEn: 'CSS id Selector — Fast and Reliable',
            explanation: 'CSS sözdiziminde # id\'yi seçer. Selenium\'un By.id() ile aynı hızda çalışır. page.locator() CSS ve XPath her ikisini de destekler — Selenium\'daki gibi ayrı By metodları yok.',
            explanationEn: 'In CSS syntax, # selects by id. Same speed as Selenium\'s By.id(). page.locator() supports both CSS and XPath — no separate By methods like in Selenium.',
            tip: '✅ id varsa ve getByRole()/getByTestId() uygun değilse kullan. Selenium\'dan geçişte alışkanlık açısından kolay.',
            tipEn: '✅ Use when id exists and getByRole()/getByTestId() are not appropriate. Easy for Selenium migrants by familiarity.',
            when: 'getByRole() veya getByTestId() uygun değilse, id varsa',
            whenEn: 'When getByRole() or getByTestId() is not appropriate and id exists',
          },
          {
            id: 'by-css-combo', label: 'locator(css combo)', priority: 3, starRating: '⭐⭐', color: '#ec4899',
            highlights: ['class="form-input"', 'name="email"'],
            code: `// Tag + class + attribute kombinasyonu
Locator el = page.locator("input.form-input[name='email']");

// data-testid ile kombine (güçlü seçici):
Locator el2 = page.locator("[data-testid='username-input'][type='email']");

// Selenium karşılığı:
// By.cssSelector("input.form-input[name='email']")`,
            title: 'Kombine CSS — Spesifik & Güvenilir',
            titleEn: 'Combined CSS — Specific & Reliable',
            explanation: 'Tag, class ve attribute kombinasyonu. Selenium\'daki By.cssSelector() ile birebir aynı sözdizimi. Playwright\'ta ayrıca :has(), :text(), :near() gibi Playwright-özel pseudo-selectorlar da eklenebilir.',
            explanationEn: 'Combination of tag, class and attributes. Exactly same syntax as Selenium\'s By.cssSelector(). Playwright additionally supports :has(), :text(), :near() pseudo-selectors.',
            tip: '✅ Selenium\'dan geçişte CSS selector syntax aynı — syntax öğrenmene gerek yok. Playwright\'ın :has-text() gibi ek selector\'larını da öğren.',
            tipEn: '✅ CSS selector syntax is identical when migrating from Selenium — no new syntax to learn. Also learn Playwright\'s extra selectors like :has-text().',
            when: 'getByRole()/getByTestId() yoksa ve çoklu attribute filtresi gerekiyorsa',
            whenEn: 'When getByRole()/getByTestId() unavailable and multi-attribute filtering is needed',
          },
          {
            id: 'by-xpath', label: 'locator(xpath=)', priority: 8, starRating: '⭐', color: '#ef4444',
            highlights: ['type="submit"'],
            code: { tr: `// XPath — Playwright'ta "xpath=" prefix ile
Locator btn = page.locator("xpath=//button[@type='submit']");

// Metin ile XPath:
Locator byText = page.locator("xpath=//button[text()='Giriş Yap']");

// DOM ilişkisi:
Locator sibling = page.locator("xpath=//label[@for='username']/following-sibling::input");

// NOT: getByText() XPath'ten çok daha iyidir — önce onu dene!`, en: `// XPath — use "xpath=" prefix in Playwright
Locator btn = page.locator("xpath=//button[@type='submit']");

// By text with XPath:
Locator byText = page.locator("xpath=//button[text()='Login']");

// DOM relationship:
Locator sibling = page.locator("xpath=//label[@for='username']/following-sibling::input");

// NOTE: getByText() is much better than XPath — try it first!` },
            title: 'En Güçlü — Ama Son Çare',
            titleEn: 'Most Powerful — But Last Resort',
            explanation: 'Playwright\'ta XPath, "xpath=" prefix ile kullanılır. Selenium\'daki By.xpath() ile birebir aynı güç — parent/child/sibling ilişkilerini ifade edebilir. Yavaş ve kırılgandır; getByRole(), getByText() veya CSS daha iyi seçenektir.',
            explanationEn: 'In Playwright, XPath is used with "xpath=" prefix. Exactly same power as Selenium\'s By.xpath() — can express parent/child/sibling relationships. Slow and brittle; getByRole(), getByText() or CSS are better options.',
            tip: '⛔ Son tercih. Playwright\'ın kendi özel locator\'ları (getByRole, getByText vb.) çok daha güçlüdür. XPath\'i sadece başka locator çalışmıyorsa kullan.',
            tipEn: '⛔ Last resort. Playwright\'s own locators (getByRole, getByText etc.) are much more powerful. Use XPath only when no other locator works.',
            when: 'Hiçbir Playwright locator çalışmadığında — özellikle karmaşık DOM ilişkisi için',
            whenEn: 'When no Playwright locator works — especially for complex DOM relationships',
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 5: Element İşlemleri', en: 'Step 5: Element Actions' } },
      {
        type: 'code', language: 'java', label: { tr: 'Tüm element işlemleri — fill, click, check, okuma', en: 'All element actions — fill, click, check, reading' },
        code: `Locator input = page.locator("#username");

// ── YAZMA / TIKLAMA ─────────────────────────────────
input.fill("admin@example.com");      // Önce temizler sonra yazar (sendKeys'den üstün!)
input.clear();                        // İçeriği temizle
input.pressSequentially("abc");       // Karakter karakter yaz (masked input için)
input.click();                        // Tıkla
input.dblclick();                     // Çift tıkla

// Özel tuşlar (Selenium'da sendKeys(Keys.ENTER) gibi)
input.press("Enter");
input.press("Tab");
input.press("Control+A");             // Selenium'da keyDown(CONTROL) + sendKeys("a")

// ── OKUMA ───────────────────────────────────────────
String text       = input.textContent();        // Görünen metin
String inputValue = input.inputValue();         // Input value (Selenium: getAttribute("value"))
String cls        = input.getAttribute("class");
String href       = page.locator("a").getAttribute("href");

// ── DURUM KONTROLÜ ──────────────────────────────────
boolean visible  = input.isVisible();   // Görünür mü?
boolean enabled  = input.isEnabled();   // Aktif mi?
boolean checked  = input.isChecked();   // Checkbox/Radio seçili mi?
boolean disabled = input.isDisabled();  // Disabled mı?

// ── CHECKBOX / RADIO ────────────────────────────────
page.locator("#rememberMe").check();    // Selenium: click() ile toggle
page.locator("#rememberMe").uncheck();

// ── SELECT DROPDOWN ─────────────────────────────────
// Selenium'da Select sınıfına sarmaları gerekirdi
page.locator("#country").selectOption("TR");                 // value ile
page.locator("#country").selectOption(new SelectOption().setLabel("Türkiye")); // metin ile
page.locator("#country").selectOption(new SelectOption().setIndex(0));         // index ile`,
      },
      {
        type: 'playwright-visual',
        concept: 'select-option',
        color: '#f59e0b',
        icon: '🔽',
        title: { tr: 'selectOption() — İnteraktif Görsel Rehber', en: 'selectOption() — Interactive Visual Guide' },
        steps: [
          {
            id: 'wrap', label: 'Locator', labelEn: 'Locator',
            visualState: 'wrap',
            description: { tr: 'Playwright\'ta Select dropdown için ayrı bir sınıfa sarma yok! Selenium\'da new Select(element) yapman gerekirdi. Playwright\'ta direkt locator üzerinden .selectOption() çağrırsın. Java\'da stream().filter() gibi — extra wrapper yok.', en: 'In Playwright, no wrapper class for Select dropdown! In Selenium you needed new Select(element). In Playwright, call .selectOption() directly on the locator. Like stream().filter() in Java — no extra wrapper.' },
            code: `// Selenium'da:
// Select dropdown = new Select(driver.findElement(By.id("country")));
// dropdown.selectByValue("TR");

// Playwright'ta — çok daha temiz:
Locator country = page.locator("#country");

// Artık direkt selectOption() çağırabilirsin
country.selectOption("TR"); // value ile`,
            tip: { tr: '✅ Playwright\'ta Select sınıfı yok — locator.selectOption() yeterli. Hem daha kısa hem daha okunabilir.', en: '✅ No Select class in Playwright — locator.selectOption() is enough. Shorter and more readable.' },
          },
          {
            id: 'byValue', label: 'byValue', labelEn: 'byValue',
            visualState: 'byValue', selectedValue: 'tr',
            description: { tr: 'HTML\'deki value attribute değerine göre seçim — en güvenilir yöntem. Java\'da Map.get("TR") gibi: anahtarla direkt erişim. Selenium\'da dropdown.selectByValue("TR") ile aynı sonuç.', en: 'Select by HTML value attribute — most reliable method. Like Map.get("TR") in Java: direct key access. Same result as Selenium\'s dropdown.selectByValue("TR").' },
            code: `// value attribute ile seç
page.locator("#country").selectOption("tr");

// Selenium'da:
// dropdown.selectByValue("tr");

// Seçimi doğrula
String selectedVal = page.locator("#country").inputValue();
assertEquals("tr", selectedVal);`,
            tip: { tr: '✅ En güvenilir seçim yöntemi. Value attribute dil değişse de sabit kalır.', en: '✅ Most reliable selection method. Value attribute stays constant even if display language changes.' },
          },
          {
            id: 'byText', label: 'byLabel', labelEn: 'byLabel',
            visualState: 'byText', selectedValue: 'tr',
            description: { tr: 'Görünen metin (label) ile seçim. Selenium\'da selectByVisibleText() ile aynı. Java\'da Map.getOrDefault gibi: metin eşleşmesi, case-sensitive.', en: 'Select by visible text (label). Same as Selenium\'s selectByVisibleText(). Like Map.getOrDefault in Java: text matching, case-sensitive.' },
            code: `// Görünen metin ile seç
page.locator("#country").selectOption(
    new SelectOption().setLabel("Türkiye")
);

// Selenium'da:
// dropdown.selectByVisibleText("Türkiye");

// Seçili option'ı oku
String text = page.locator("#country option:checked").textContent();`,
            tip: { tr: '⚠️ Görünen metin i18n ile değişirse test kırılır. Mümkünse value ile seç.', en: '⚠️ Breaks if visible text changes with i18n. Prefer selecting by value when possible.' },
          },
          {
            id: 'byIndex', label: 'byIndex', labelEn: 'byIndex',
            visualState: 'byIndex', selectedValue: 'tr',
            description: { tr: '0\'dan başlayan index ile seçim. Selenium\'da selectByIndex(0) ile aynı. En az güvenilir yöntem — yeni option eklenince indexler kayar.', en: 'Select by 0-based index. Same as Selenium\'s selectByIndex(0). Least reliable — indexes shift when new options are added.' },
            code: `// 0'dan başlayan index ile seç
page.locator("#country").selectOption(
    new SelectOption().setIndex(0) // ilk option
);

// Selenium'da:
// dropdown.selectByIndex(0);`,
            tip: { tr: '⛔ Son tercih — sıra değişirse yanlış seçim. Sadece value/label mümkün değilse kullan.', en: '⛔ Last resort — wrong selection if order changes. Use only when value/label is not possible.' },
          },
          {
            id: 'getOptions', label: 'tüm options', labelEn: 'all options',
            visualState: 'getOptions',
            description: { tr: 'Tüm option\'ları okuma. Playwright\'ta count() ve nth() ile tüm seçenekleri dolaşabiliriz. Selenium\'da getOptions() List<WebElement> döndürürdü.', en: 'Read all options. In Playwright, traverse all options with count() and nth(). Selenium\'s getOptions() returned List<WebElement>.' },
            code: `Locator options = page.locator("#country option");
int total = options.count();

for (int i = 0; i < total; i++) {
    String text  = options.nth(i).textContent();
    String value = options.nth(i).getAttribute("value");
    System.out.println(i + ": " + text + " [" + value + "]");
}
// 0: Türkiye [tr]
// 1: USA [us]...`,
            tip: { tr: '✅ count() + nth(i) kombinasyonu — Selenium\'un getOptions() List döngüsüne eşdeğer.', en: '✅ count() + nth(i) combination — equivalent to Selenium\'s getOptions() List loop.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 6: Auto-Wait — Playwright\'ın Süper Gücü', en: 'Step 6: Auto-Wait — Playwright\'s Superpower' } },
      {
        type: 'simple-box',
        emoji: '⏱️',
        content: {
          tr: 'Selenium\'da yüklenmeyi bekleme sorumluluğu sende. Playwright\'ta bu sorumluluk otomatik: her locator işlemi öncesinde element DOM\'da mı, görünür mü, enabled mı diye kontrol eder. Sanki asistan her komutu "hazır olduğunda çalıştır" şeklinde kuyrukta tutuyor.',
          en: 'In Selenium, the responsibility for waiting is yours. In Playwright, it\'s automatic: before each locator action, it checks if the element is in the DOM, visible, and enabled. Like an assistant queuing every command as "execute when ready."',
        },
      },
      {
        type: 'code', language: 'java', label: { tr: 'Auto-Wait karşılaştırma — Selenium vs Playwright', en: 'Auto-Wait comparison — Selenium vs Playwright' },
        code: `// ── SELENIUM: Her action için explicit wait zorunlu ──────────────────
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
WebElement loginBtn = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("loginBtn"))
);
loginBtn.click();

// Loading spinner kaybolana kadar bekle
wait.until(ExpectedConditions.invisibilityOfElementLocated(
    By.className("loading-spinner")
));

// URL değişene kadar bekle
wait.until(ExpectedConditions.urlContains("/dashboard"));
// ...Her adımda bunları tekrar yazmak zorunda!

// ── PLAYWRIGHT: Hiçbir şey yazmana gerek yok ─────────────────────
// Playwright otomatik olarak:
// 1. Element DOM'da görünene kadar bekler
// 2. Element görünür olana kadar bekler
// 3. Element enabled olana kadar bekler
// 4. Animasyonların bitmesini bekler
// 5. SONRA işlemi yapar

page.locator("#loginBtn").click(); // Yeterli! 30s auto-wait dahil

// URL / sayfa bekleme (ihtiyaç olursa)
page.waitForURL("**/dashboard");           // URL pattern bekle
page.waitForLoadState(LoadState.NETWORKIDLE); // Ağ sessizleşene kadar
page.locator(".loading-spinner").waitFor(   // Element kaybolana kadar
    new Locator.WaitForOptions()
        .setState(WaitForSelectorState.HIDDEN)
);`,
      },
      {
        type: 'playwright-visual',
        concept: 'auto-wait',
        color: '#10b981',
        icon: '⏱️',
        title: { tr: 'Auto-Wait Mekanizması — Selenium vs Playwright', en: 'Auto-Wait Mechanism — Selenium vs Playwright' },
        steps: [
          {
            id: 'selenium-way', label: 'Selenium Yolu', labelEn: 'Selenium Way',
            visualState: 'selenium-way',
            description: { tr: 'Selenium\'da her etkileşimden önce explicit wait zorunludur. WebDriverWait + ExpectedConditions yazman gerekir. Her action için tekrar tekrar yazarsın — bu hem zaman kaybı hem de test kırılganlığı demek.', en: 'In Selenium, explicit wait is mandatory before every interaction. You must write WebDriverWait + ExpectedConditions. You write this repeatedly for every action — wasteful and makes tests brittle.' },
            code: `// Her action için tekrar yazılır!
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

// 1. action:
wait.until(ExpectedConditions.elementToBeClickable(
    By.id("loginBtn"))).click();

// 2. action:
wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.id("dashboard"))).getText();`,
            tip: { tr: '⚠️ Selenium\'da implicit wait + explicit wait birlikte kullanma — beklenmedik davranışa yol açar.', en: '⚠️ Don\'t combine implicit wait + explicit wait in Selenium — causes unexpected behavior.' },
          },
          {
            id: 'pw-way', label: 'Playwright Yolu', labelEn: 'Playwright Way',
            visualState: 'pw-way',
            description: { tr: 'Playwright\'ta extra wait kodu yazmana gerek yok. Her locator işlemi başlamadan önce Playwright kendi internal kontrol döngüsünü başlatır: element DOM\'da mı? Görünür mü? Enabled mı? Animasyon bitti mi?', en: 'In Playwright, no extra wait code needed. Before each locator action, Playwright starts its own internal retry loop: Is element in DOM? Is it visible? Is it enabled? Is animation finished?' },
            code: `// Playwright'ta sadece bunu yaz:
page.locator("#loginBtn").click();
// Altında şunlar otomatik olur:
// → element DOM'a eklendi mi? (actionability check)
// → görünür mü? (not hidden)
// → enabled mı? (not disabled)
// → stable mı? (animasyon bitmedi)
// Hepsi OK → CLICK!`,
            tip: { tr: '✅ Playwright default 30 saniye bekler. page.setDefaultTimeout(60000) ile değiştirilebilir.', en: '✅ Playwright waits 30 seconds by default. Change with page.setDefaultTimeout(60000).' },
          },
          {
            id: 'retry', label: 'Retry Döngüsü', labelEn: 'Retry Loop',
            visualState: 'retry',
            description: { tr: 'Playwright, element hazır değilse 100ms aralıklarla tekrar dener. Bu sayede flaky test sayısı dramatik biçimde düşer. Java\'da ScheduledExecutorService ile tekrarlayan görev gibi — ama çok daha akıllı.', en: 'If the element is not ready, Playwright retries every ~100ms. This dramatically reduces flaky test count. Like a ScheduledExecutorService with recurring tasks in Java — but much smarter.' },
            code: `// Playwright iç döngüsü (simplified):
// while (timeout not reached) {
//   if (element is actionable) { DO ACTION; break; }
//   wait 100ms;
//   retry...
// }
// if (timeout) → TimeoutError

// Özel timeout (sadece bu action için):
page.locator("#slowBtn").click(
    new Locator.ClickOptions().setTimeout(60000) // 60s
);`,
            tip: { tr: '✅ Polling interval yaklaşık 100ms. 30 saniyede yaklaşık 300 deneme. Bu yüzden Playwright testleri Selenium\'a göre çok daha az flaky.', en: '✅ Polling interval is approximately 100ms. About 300 attempts in 30 seconds. This is why Playwright tests are far less flaky than Selenium.' },
          },
          {
            id: 'found', label: 'Element Hazır!', labelEn: 'Element Ready!',
            visualState: 'found',
            description: { tr: 'Element tüm actionability kontrollerini geçince işlem gerçekleşir. Başarı durumunu ayrıca doğrulamana gerek yok — action başarılıysa exception fırlatmaz.', en: 'When the element passes all actionability checks, the action is performed. No need to verify success separately — if the action succeeded, no exception is thrown.' },
            code: `// Tüm actionability check'leri geçti → tıklandı
page.locator("#loginBtn").click();
// ^ Exception yoksa başarılı

// Sonraki sayfada assertion:
assertThat(page).hasURL("**/dashboard");
assertThat(page.locator(".welcome")).isVisible();`,
            tip: { tr: '✅ Playwright assertion\'ları da auto-wait içerir: assertThat(locator).isVisible() — element görünene kadar bekler, sonra assertion yapar.', en: '✅ Playwright assertions also have auto-wait: assertThat(locator).isVisible() — waits until element is visible, then asserts.' },
          },
          {
            id: 'timeout', label: 'Timeout', labelEn: 'Timeout',
            visualState: 'timeout',
            description: { tr: '30 saniye içinde actionability sağlanamazsa TimeoutError fırlatılır. Selenium\'daki TimeoutException ile aynı konsept ama mesaj çok daha bilgi verici: hangi locator, hangi koşul başarısız olduğunu söyler.', en: 'If actionability cannot be achieved within 30 seconds, a TimeoutError is thrown. Same concept as Selenium\'s TimeoutException but the message is much more informative: tells you which locator and which condition failed.' },
            code: `// TimeoutError mesajı:
// "page.locator('#loginBtn') → timeout 30000ms exceeded
//  waiting for locator('#loginBtn') to be visible"

// Özel timeout ile:
page.locator("#slowComponent").waitFor(
    new Locator.WaitForOptions()
        .setState(WaitForSelectorState.VISIBLE)
        .setTimeout(60000)
);`,
            tip: { tr: '💡 TimeoutError aldığında: 1) Locator doğru mu? 2) Timeout yeterli mi? 3) Element condition (visible/enabled) doğru mu? Playwright\'ın hata mesajları detaylıdır.', en: '💡 On TimeoutError: 1) Is the locator correct? 2) Is timeout sufficient? 3) Is the element condition (visible/enabled) correct? Playwright\'s error messages are very detailed.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 7: Screenshot & page.evaluate()', en: 'Step 7: Screenshot & page.evaluate()' } },
      {
        type: 'code', language: 'java', label: { tr: 'Screenshot ve JavaScript işlemleri', en: 'Screenshot and JavaScript operations' },
        code: `import java.nio.file.Paths;

// ── SCREENSHOT ───────────────────────────────────────
// Tüm sayfa screenshot
page.screenshot(new Page.ScreenshotOptions()
    .setPath(Paths.get("target/screenshots/full-page.png"))
    .setFullPage(true)    // tüm sayfayı yakala (scroll dahil)
);

// Element screenshot (Selenium 4'te de var)
page.locator("#errorPanel").screenshot(
    new Locator.ScreenshotOptions()
        .setPath(Paths.get("target/screenshots/error-panel.png"))
);

// Byte array (Allure/raporlama için)
byte[] bytes = page.screenshot();
// Allure: Allure.addAttachment("screenshot", "image/png",
//     new ByteArrayInputStream(bytes), ".png");

// ── PAGE.EVALUATE() — JS EXECUTOR KARŞILIĞI ──────────
// Selenium'da: ((JavascriptExecutor) driver).executeScript(...)
// Playwright'ta: page.evaluate()

// Sayfayı kaydır
page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
page.evaluate("window.scrollBy(0, 500)");

// Elemente kaydır
page.locator("#footer").evaluate("el => el.scrollIntoView(true)");

// Değer döndür
String readyState = (String) page.evaluate("() => document.readyState");
System.out.println(readyState); // "complete"

// Element'e JS ile value set et (React controlled input)
page.locator("#email").evaluate(
    "el => { el.value = 'test@test.com'; el.dispatchEvent(new Event('input', {bubbles:true})); }"
);`,
      },
      {
        type: 'playwright-visual',
        concept: 'evaluate',
        color: '#f59e0b',
        icon: '⚡',
        title: { tr: 'page.evaluate() — İnteraktif Görsel Rehber', en: 'page.evaluate() — Interactive Visual Guide' },
        steps: [
          {
            id: 'idle', label: 'Neden evaluate?', labelEn: 'Why evaluate?',
            visualState: 'idle',
            description: { tr: 'page.evaluate(), Selenium\'un JavascriptExecutor\'ına karşılık gelir. Playwright\'ın ulaşamadığı yerlerde JS komutu çalıştırır. Java\'da native method gibi — JVM\'in yapamadığını işletim sistemine delege eder.', en: 'page.evaluate() is the counterpart to Selenium\'s JavascriptExecutor. Runs JS commands where Playwright can\'t reach. Like a native method in Java — delegates to the OS what the JVM cannot do.' },
            code: `// Selenium JavascriptExecutor:
// ((JavascriptExecutor) driver).executeScript("return document.readyState");

// Playwright:
String readyState = (String) page.evaluate(
    "() => document.readyState"
);
// "complete" → sayfa tamamen yüklendi
System.out.println(readyState);`,
            tip: { tr: '✅ Playwright\'ın normal API\'si çoğu durumda yeterlidir. evaluate() sadece Playwright API\'sinin ulaşamadığı custom JS için.', en: '✅ Playwright\'s normal API is sufficient in most cases. evaluate() is only for custom JS that Playwright\'s API can\'t reach.' },
          },
          {
            id: 'scrollTo', label: 'scrollTo', labelEn: 'scrollTo',
            visualState: 'scrollTo',
            description: { tr: 'Sayfayı belirli koordinata kaydırır. Selenium\'da js.executeScript("window.scrollTo(...)") ile aynı. Playwright\'ta çoğunlukla locator.scrollIntoViewIfNeeded() daha iyidir.', en: 'Scrolls to specific coordinates. Same as Selenium\'s js.executeScript("window.scrollTo(...)"). In Playwright, locator.scrollIntoViewIfNeeded() is usually better.' },
            code: `// En alta kaydır
page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

// Belirli koordinata kaydır
page.evaluate("window.scrollTo(0, 800)");

// En üste dön
page.evaluate("window.scrollTo(0, 0)");

// Playwright'ın native yöntemi (önerilen):
page.locator("#target").scrollIntoViewIfNeeded();`,
            tip: { tr: '✅ Lazy-load sayfalar için: evaluate scrollTo + locator count() ile yeni elementler yüklendiğini doğrula.', en: '✅ For lazy-load pages: evaluate scrollTo + locator count() to verify new elements loaded.' },
          },
          {
            id: 'scrollBy', label: 'scrollBy', labelEn: 'scrollBy',
            visualState: 'scrollBy',
            description: { tr: 'Mevcut konumdan görece kaydırma. Selenium\'da js.executeScript("window.scrollBy(...)") ile birebir aynı. Infinite scroll test senaryolarında kullanılır.', en: 'Relative scroll from current position. Exactly same as Selenium\'s js.executeScript("window.scrollBy(...)"). Used in infinite scroll test scenarios.' },
            code: `// 500px aşağı
page.evaluate("window.scrollBy(0, 500)");

// 200px yukarı
page.evaluate("window.scrollBy(0, -200)");

// Infinite scroll için tekrarlayan:
for (int i = 0; i < 5; i++) {
    page.evaluate("window.scrollBy(0, 500)");
    page.waitForTimeout(300); // yüklenmesi için kısa bekle
}`,
            tip: { tr: '✅ waitForTimeout() Playwright\'ta Thread.sleep() yerine kullanılır. Ama mümkünse event bazlı bekleme tercih et.', en: '✅ waitForTimeout() replaces Thread.sleep() in Playwright. But prefer event-based waiting when possible.' },
          },
          {
            id: 'evaluate', label: 'JS Return', labelEn: 'JS Return',
            visualState: 'evaluate',
            description: { tr: 'JS\'den değer döndürme. page.evaluate() bir Java Object döndürür — cast gerekebilir. Selenium\'da executeScript() Object döndürürdü; aynı pattern.', en: 'Return values from JS. page.evaluate() returns a Java Object — casting may be needed. Selenium\'s executeScript() also returned Object; same pattern.' },
            code: `// Değer döndüren JS
String title = (String) page.evaluate("() => document.title");
Long count   = (Long)   page.evaluate("() => document.querySelectorAll('a').length");
Boolean dark = (Boolean) page.evaluate("() => document.body.classList.contains('dark')");

// Parametre geçirme (Selenium'da arguments[0] gibi)
Object result = page.evaluate(
    "el => el.getBoundingClientRect().top",
    page.locator("#target")
);`,
            tip: { tr: '✅ evaluate() için arrow function syntax zorunlu: () => expr. Return keyword olmayan expression dönebilir. Java long → JS number otomatik cast.', en: '✅ Arrow function syntax required for evaluate(): () => expr. Expression without return keyword can return. Java long → JS number auto-cast.' },
          },
          {
            id: 'fill', label: 'JS setValue', labelEn: 'JS setValue',
            visualState: 'fill',
            description: { tr: 'React controlled input\'larda normal fill() çalışmıyorsa JS ile value set etme. Selenium\'da arguments[0].value = ... ile aynı ama Playwright\'ta daha temiz syntax.', en: 'Setting value via JS when normal fill() doesn\'t work on React controlled inputs. Same as arguments[0].value = ... in Selenium but cleaner syntax in Playwright.' },
            code: `// Normal fill() yeterli değilse (React controlled):
page.locator("#email").evaluate("""
    el => {
        el.value = 'test@example.com';
        el.dispatchEvent(new Event('input', {bubbles:true}));
        el.dispatchEvent(new Event('change', {bubbles:true}));
    }
""");

// veya Playwright'ın kendi dispatchEvent metodu:
page.locator("#email").fill("test@example.com");
page.locator("#email").dispatchEvent("input");`,
            tip: { tr: '⚠️ React/Vue controlled input\'larda dispatchEvent zorunlu. Yoksa state güncellenmez, submit\'te değer kaybolur.', en: '⚠️ dispatchEvent required for React/Vue controlled inputs. Otherwise state won\'t update and value is lost on submit.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 8: Actions Sınıfı (Hover, Drag-Drop, Klavye)', en: 'Step 8: Actions (Hover, Drag-Drop, Keyboard)' } },
      {
        type: 'code', language: 'java', label: 'Playwright Actions — hover, drag, keyboard',
        code: `// ── HOVER ───────────────────────────────────────────
// Selenium'da: new Actions(driver).moveToElement(el).perform()
// Playwright'ta: locator.hover()
page.locator("#navMenu").hover();
// Alt menü görünür olana kadar auto-wait çalışır
page.locator("#subItem").click();

// ── ÇİFT TIKLAMA ────────────────────────────────────
page.locator("td.editable").dblclick();

// ── SAĞ TIKLAMA (Context Menu) ──────────────────────
page.locator("[data-file='report.pdf']").click(
    new Locator.ClickOptions().setButton(MouseButton.RIGHT)
);
page.locator("#ctxMenuDelete").click();

// ── DRAG AND DROP ────────────────────────────────────
page.locator("#draggable").dragTo(page.locator("#droppable"));
// veya offset ile:
page.locator("#draggable").dragTo(page.locator("#droppable"),
    new Locator.DragToOptions().setTargetPosition(200, 0)
);

// ── KLAVYE KOMBİNASYONU ──────────────────────────────
// Selenium'da: actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL)
page.locator("#editor").press("Control+A");
page.locator("#editor").press("Delete");
page.locator("#editor").fill("Yeni içerik");

// Shift + Tıkla
page.keyboard.down("Shift");
page.locator("tr:nth-child(5)").click();
page.keyboard.up("Shift");`,
      },
      {
        type: 'playwright-visual',
        concept: 'pw-actions',
        color: '#8b5cf6',
        icon: '🖱️',
        title: { tr: 'Actions — İnteraktif Görsel Rehber', en: 'Actions — Interactive Visual Guide' },
        steps: [
          {
            id: 'hover', label: 'hover()', labelEn: 'hover()',
            visualState: 'hover',
            description: { tr: 'locator.hover() fare imlecini element üzerine taşır. Selenium\'da Actions.moveToElement() ile aynı. Playwright\'ta hover sonrası alt menü otomatik beklenir — WebDriverWait gerekmez.', en: 'locator.hover() moves the mouse cursor over the element. Same as Actions.moveToElement() in Selenium. After hover, Playwright auto-waits for sub-menus — no WebDriverWait needed.' },
            code: `// Selenium:
// new Actions(driver).moveToElement(navMenu).perform();
// wait.until(ExpectedConditions.visibilityOf(subItem));

// Playwright:
page.locator("#navMenu").hover();
// alt menü otomatik beklenir
page.locator("#subItem").click();`,
            tip: { tr: '✅ hover() sonrası explicit wait gerekmez — Playwright alt menüyü auto-wait eder.', en: '✅ No explicit wait needed after hover() — Playwright auto-waits for the sub-menu.' },
          },
          {
            id: 'submenu', label: 'Sub-menu', labelEn: 'Sub-menu',
            visualState: 'submenu',
            description: { tr: 'Hover sonrası alt menü açıldı. Selenium\'da aksine Playwright\'ta context değişmez — alt menü elemanlarını normal locator ile bulursun. switchTo() yok.', en: 'Sub-menu is open after hover. Unlike Selenium, context doesn\'t change in Playwright — find sub-menu items with normal locators. No switchTo().' },
            code: `// Alt menü açık — normal locator ile eriş
page.locator("#productMenu li a").all().forEach(item ->
    System.out.println(item.textContent())
);
// "Laptops", "Phones", "Tablets"

page.getByText("Laptops").click();`,
            tip: { tr: '✅ locator.all() → List<Locator>. Selenium\'un findElements() → List<WebElement> karşılığı.', en: '✅ locator.all() → List<Locator>. Equivalent to Selenium\'s findElements() → List<WebElement>.' },
          },
          {
            id: 'dblclick', label: 'dblclick()', labelEn: 'dblclick()',
            visualState: 'dblclick',
            description: { tr: 'locator.dblclick() çift tıklama gönderir. Selenium\'da Actions.doubleClick() ile aynı. Editable cell, inline editor veya dosya açma için kullanılır.', en: 'locator.dblclick() sends a double-click. Same as Actions.doubleClick() in Selenium. Used for editable cells, inline editors, or file-opening.' },
            code: `// Selenium: actions.doubleClick(cell).perform()
page.locator("td.editable[data-col='price']").dblclick();

// Edit modu açıldı
page.locator("td.editable input").fill("299.99");
page.locator("td.editable input").press("Enter");`,
            tip: { tr: '✅ dblclick() ayrı DOM event (dblclick) tetikler — click() ile aynı değil. Editable grid\'lerde click çalışmazsa dblclick dene.', en: '✅ dblclick() fires separate DOM event (dblclick) — not same as click(). Try dblclick on editable grids when click doesn\'t work.' },
          },
          {
            id: 'rightclick', label: 'rightClick', labelEn: 'rightClick',
            visualState: 'rightclick',
            description: { tr: 'Sağ tıklama, MouseButton.RIGHT ile yapılır. Selenium\'da contextClick() ile aynı. Uygulamaya özel context menu için kullanılır.', en: 'Right-click done with MouseButton.RIGHT. Same as Selenium\'s contextClick(). Used for application-specific context menus.' },
            code: `// Selenium: actions.contextClick(el).perform()
page.locator("[data-file='report.pdf']").click(
    new Locator.ClickOptions().setButton(MouseButton.RIGHT)
);

page.locator("#ctxMenu [data-action='delete']").click();`,
            tip: { tr: '⚠️ Browser\'ın native sağ-tık menüsü test edilemez — sadece DOM context menu\'lar.', en: '⚠️ Browser\'s native right-click menu cannot be tested — only DOM custom context menus.' },
          },
          {
            id: 'drag', label: 'dragTo()', labelEn: 'dragTo()',
            visualState: 'drag',
            description: { tr: 'locator.dragTo(target) sürükle-bırak yapar. Selenium\'da Actions.dragAndDrop() ile aynı. HTML5 drag-drop event\'leri için Playwright çok daha güvenilirdir.', en: 'locator.dragTo(target) performs drag-and-drop. Same as Selenium\'s Actions.dragAndDrop(). Playwright is far more reliable for HTML5 drag-drop events.' },
            code: `// Selenium: actions.dragAndDrop(source, target).perform()
page.locator("#draggable").dragTo(page.locator("#droppable"));

// Offset ile:
page.locator("#draggable").dragTo(
    page.locator("#droppable"),
    new Locator.DragToOptions().setTargetPosition(200, 0)
);`,
            tip: { tr: '✅ Playwright\'ın dragTo() HTML5 drag-drop için Selenium\'dan çok daha güvenilir.', en: '✅ Playwright\'s dragTo() is much more reliable than Selenium for HTML5 drag-drop.' },
          },
          {
            id: 'keyboard', label: 'Keyboard', labelEn: 'Keyboard',
            visualState: 'keyboard',
            description: { tr: 'Klavye kombinasyonları için locator.press() veya page.keyboard. Selenium\'da keyDown() + sendKeys() + keyUp() zinciri gerekirdi.', en: 'For keyboard combinations, use locator.press() or page.keyboard. Selenium required keyDown() + sendKeys() + keyUp() chain.' },
            code: `// Selenium: actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL)
page.locator("#editor").press("Control+A");
page.locator("#editor").press("Delete");
page.locator("#editor").fill("New content here");

// Shift+Click (multi-select):
page.keyboard.down("Shift");
page.locator("tr:nth-child(5)").click();
page.keyboard.up("Shift");`,
            tip: { tr: '✅ press() kombinasyon syntax: "Control+A", "Shift+Enter", "Alt+F4". Selenium\'dan çok daha temiz.', en: '✅ press() combination syntax: "Control+A", "Shift+Enter", "Alt+F4". Much cleaner than Selenium.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 9: Dialoglar (Alert/Confirm/Prompt)', en: 'Step 9: Dialogs (Alert/Confirm/Prompt)' } },
      {
        type: 'playwright-visual',
        concept: 'dialog',
        color: '#ef4444',
        icon: '⚠️',
        title: { tr: 'Dialog Yönetimi — İnteraktif Rehber', en: 'Dialog Management — Interactive Guide' },
        steps: [
          {
            id: 'register', label: 'Handler Kaydet', labelEn: 'Register Handler',
            visualState: 'register',
            description: { tr: 'Playwright\'ta dialog yönetimi olay tabanlıdır. Selenium\'da switchTo().alert() ile dialog açıldıktan sonra müdahale ederdin. Playwright\'ta önce handler\'ı kaydet, sonra dialog\'u tetikle — Java\'da event listener kaydetmek gibi.', en: 'Dialog management in Playwright is event-based. In Selenium, you intervened after the dialog opened with switchTo().alert(). In Playwright, register the handler first, then trigger the dialog — like registering an event listener in Java.' },
            code: `// Selenium'da:
// driver.findElement(By.id("triggerBtn")).click();
// wait.until(ExpectedConditions.alertIsPresent());
// Alert alert = driver.switchTo().alert();
// alert.accept();

// Playwright'ta — event-based:
// 1. Önce handler'ı kaydet
page.onDialog(dialog -> {
    System.out.println("Dialog: " + dialog.message());
    dialog.accept(); // veya dialog.dismiss()
});

// 2. Sonra dialog'u tetikle
page.locator("#triggerAlert").click();`,
            tip: { tr: '✅ Handler, dialog açılmadan önce kayıt edilmelidir. Selenium\'un alertIsPresent() bekleme koşuluna gerek yok.', en: '✅ Handler must be registered before the dialog opens. No need for Selenium\'s alertIsPresent() wait condition.' },
          },
          {
            id: 'dialog-fires', label: 'Dialog Açıldı', labelEn: 'Dialog Fires',
            visualState: 'dialog-fires',
            description: { tr: 'Tetiklenen dialog event handler\'a gelir. dialog.type() dialog tipini söyler: "alert", "confirm", "prompt", "beforeunload". Java\'da instanceof gibi: tipi kontrol et, ona göre davran.', en: 'The triggered dialog arrives at the event handler. dialog.type() tells the dialog type: "alert", "confirm", "prompt", "beforeunload". Like instanceof in Java: check the type, act accordingly.' },
            code: `page.onDialog(dialog -> {
    String type = dialog.type();    // "alert", "confirm", "prompt"
    String msg  = dialog.message(); // Dialog metni

    System.out.println(type + ": " + msg);

    switch (type) {
        case "confirm" -> dialog.accept();
        case "prompt"  -> dialog.accept("SAVE20"); // input gönder
        default        -> dialog.dismiss();
    }
});`,
            tip: { tr: '✅ dialog.message() Selenium\'un alert.getText() karşılığı. dialog.type() ek bilgi — Selenium\'da yoktu.', en: '✅ dialog.message() is Selenium\'s alert.getText() equivalent. dialog.type() is extra info — not available in Selenium.' },
          },
          {
            id: 'handle', label: 'accept()', labelEn: 'accept()',
            visualState: 'handle',
            description: { tr: 'dialog.accept() OK butonuna basar. Tüm dialog tipleri için çalışır — Selenium\'un alert.accept() ile aynı. prompt() için accept("değer") şeklinde input gönderilebilir.', en: 'dialog.accept() presses OK. Works for all dialog types — same as Selenium\'s alert.accept(). For prompt(), input can be sent as accept("value").' },
            code: `// Simple alert — sadece accept
page.onDialog(dialog -> dialog.accept());

// Confirm — accept ile onayla
page.onDialog(dialog -> dialog.accept());

// Prompt — input ile accept
page.onDialog(dialog -> dialog.accept("SAVE20"));

// Sonra doğrula:
assertThat(page).hasURL("**/success");`,
            tip: { tr: '✅ accept() sonrası driver otomatik sayfaya döner — Selenium gibi ayrıca defaultContent() gerekmez.', en: '✅ After accept() driver automatically returns to page — no need for defaultContent() like Selenium.' },
          },
          {
            id: 'dismiss', label: 'dismiss()', labelEn: 'dismiss()',
            visualState: 'dismiss',
            description: { tr: 'dialog.dismiss() Cancel butonuna basar. Selenium\'un alert.dismiss() ile aynı. confirm() ve prompt() için geçerli, alert() için accept() ile aynı sonucu verir.', en: 'dialog.dismiss() presses Cancel. Same as Selenium\'s alert.dismiss(). Valid for confirm() and prompt(); for alert(), same result as accept().' },
            code: `// Sepet temizle butonuna tıkla → confirm
page.onDialog(dialog -> dialog.dismiss()); // iptal et

page.locator("#clearCart").click();

// Sepet hala dolu olmalı
assertThat(page.locator("#cartCount")).not().hasText("0");`,
            tip: { tr: '✅ dismiss() test stratejisi: "vazgeçme" senaryolarını test et. Negative test senaryolarında kritik.', en: '✅ dismiss() test strategy: test "cancellation" scenarios. Critical for negative test scenarios.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 10: frameLocator() — iFrame İçinde Çalışma', en: 'Step 10: frameLocator() — Working Inside iFrames' } },
      {
        type: 'playwright-visual',
        concept: 'frame-locator',
        color: '#06b6d4',
        icon: '🖼️',
        title: { tr: 'frameLocator() — İnteraktif Rehber', en: 'frameLocator() — Interactive Guide' },
        steps: [
          {
            id: 'outer', label: 'Dış Sayfa', labelEn: 'Outer Page',
            visualState: 'outer',
            description: { tr: 'Varsayılan context ana sayfadadır. iFrame\'in içine erişmek için Selenium\'da switchTo().frame() gerekir. Playwright\'ta ise frameLocator() ile context değişimi olmadan zincir kurulur.', en: 'Default context is the main page. In Selenium, switchTo().frame() is needed to access inside an iFrame. In Playwright, frameLocator() builds a chain without context switching.' },
            code: `// Selenium'da bunu yapman gerekir:
// WebElement iframe = driver.findElement(By.id("paymentFrame"));
// driver.switchTo().frame(iframe);
// driver.findElement(By.id("cardNumber")).sendKeys("...");
// driver.switchTo().defaultContent(); // ← unutma!

// Playwright'ta HİÇBİR context değişimi yok:
// frameLocator ile direkt chain`,
            tip: { tr: '⚠️ Playwright\'ta switchTo().frame() ve defaultContent() YOK — bunlara gerek kalmaz.', en: '⚠️ In Playwright there is NO switchTo().frame() or defaultContent() — you don\'t need them.' },
          },
          {
            id: 'frame-locator', label: 'frameLocator()', labelEn: 'frameLocator()',
            visualState: 'frame-locator',
            description: { tr: 'page.frameLocator() ile frame\'i seç, sonra normal locator zinciri kur. switchTo() gerekmez, defaultContent() gerekmez — sanki iFrame yokmuş gibi çalışırsın. Java\'da Optional.map() zinciri gibi.', en: 'Select the frame with page.frameLocator(), then build a normal locator chain. No switchTo(), no defaultContent() — work as if there\'s no iFrame. Like Optional.map() chaining in Java.' },
            code: `// Tek satırda: frameLocator → locator → action
page.frameLocator("#paymentFrame")
    .locator("#cardNumber")
    .fill("4111 1111 1111 1111");

// Selenium'da şunlar gerekirdi:
// driver.switchTo().frame("paymentFrame");    ← gerekir
// driver.findElement(By.id("cardNumber")).sendKeys(...);
// driver.switchTo().defaultContent();          ← unutursan bug!`,
            tip: { tr: '✅ frameLocator() bir LocatorHandle döndürür. Onun üzerinden her türlü locator metodu (getByRole, getByTestId...) kullanılabilir.', en: '✅ frameLocator() returns a FrameLocator. Any locator method (getByRole, getByTestId...) can be chained on it.' },
          },
          {
            id: 'inner', label: 'Frame İçi', labelEn: 'Inside Frame',
            visualState: 'inner',
            description: { tr: 'frameLocator().locator() ile frame içindeki tüm elemanlara normal Playwright API ile erişebilirsin. getByRole, getByLabel, getByTestId — hepsi çalışır!', en: 'With frameLocator().locator() you can access all elements inside the frame with normal Playwright API. getByRole, getByLabel, getByTestId — all work!' },
            code: `FrameLocator frame = page.frameLocator("#paymentFrame");

// Tüm Playwright locator metodları çalışır!
frame.getByLabel("Card Number").fill("4111 1111 1111 1111");
frame.getByLabel("CVV").fill("123");
frame.getByRole(AriaRole.BUTTON, new FrameLocator.GetByRoleOptions()
    .setName("Pay")).click();

// Nested iFrame (frame içinde frame):
page.frameLocator("#outer").frameLocator("#inner")
    .locator("#recaptchaBox").click();`,
            tip: { tr: '✅ Nested iFrame için: page.frameLocator("#outer").frameLocator("#inner").locator(...) — her seviye için ayrı frameLocator() zinciri.', en: '✅ For nested iFrames: page.frameLocator("#outer").frameLocator("#inner").locator(...) — separate frameLocator() chain for each level.' },
          },
          {
            id: 'back', label: 'Temiz Context', labelEn: 'Clean Context',
            visualState: 'back',
            description: { tr: 'frameLocator() zincirleme kullandığın için ana sayfaya dönmek için ekstra kod gerekmez. Selenium\'da defaultContent() unutulursa bug çıkardı. Playwright\'ta bu sorun yoktur.', en: 'Since you use frameLocator() chaining, no extra code is needed to return to the main page. In Selenium, forgetting defaultContent() caused bugs. In Playwright, this problem doesn\'t exist.' },
            code: `// Frame işlemleri bitti — ekstra kod YOK
page.frameLocator("#paymentFrame")
    .locator("#payBtn").click();

// Direkt ana sayfaya devam et — defaultContent() YOK
page.locator("#orderConfirmation").waitFor(
    new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE)
);
String orderNo = page.locator("#orderNumber").textContent();`,
            tip: { tr: '✅ Playwright\'ta try-finally ile defaultContent() gerekmez — kodun çok daha temiz. Selenium\'daki yaygın "frame\'den çıkmayı unutma" bug\'ı artık yok.', en: '✅ No need for try-finally with defaultContent() in Playwright — code is much cleaner. The common Selenium bug of "forgetting to exit the frame" is gone.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 11: Çoklu Sayfa & Sekme Yönetimi', en: 'Step 11: Multi-Page & Tab Management' } },
      {
        type: 'playwright-visual',
        concept: 'multi-page',
        color: '#8b5cf6',
        icon: '🪟',
        title: { tr: 'Çoklu Sayfa — İnteraktif Rehber', en: 'Multi-Page — Interactive Guide' },
        steps: [
          {
            id: 'single', label: 'Tek Sayfa', labelEn: 'Single Page',
            visualState: 'single',
            description: { tr: 'Başlangıçta tek sayfa. context.pages() tüm açık sayfaları List<Page> olarak döndürür — Selenium\'da getWindowHandles() Set<String> döndürürdü. Playwright\'ta her sayfa bir Page nesnesi, String ID değil.', en: 'Start with single page. context.pages() returns all open pages as List<Page> — Selenium\'s getWindowHandles() returned Set<String>. In Playwright, each page is a Page object, not a String ID.' },
            code: { tr: `// context içindeki tüm açık sayfalar
List<Page> pages = context.pages();
System.out.println("Açık sayfa: " + pages.size()); // 1

// Mevcut sayfa
Page currentPage = pages.get(0);

// Selenium'da:
// String mainHandle = driver.getWindowHandle();
// Set<String> all   = driver.getWindowHandles();`, en: `// all open pages in context
List<Page> pages = context.pages();
System.out.println("Open pages: " + pages.size()); // 1

// Current page
Page currentPage = pages.get(0);

// In Selenium:
// String mainHandle = driver.getWindowHandle();
// Set<String> all   = driver.getWindowHandles();` },
            tip: { tr: '✅ Page nesnesi çok daha güçlü — String handle\'ın aksine direkt page.title(), page.url() gibi metodlar kullanılır.', en: '✅ Page object is much more powerful — unlike String handle, directly use methods like page.title(), page.url().' },
          },
          {
            id: 'wait-popup', label: 'waitForPopup()', labelEn: 'waitForPopup()',
            visualState: 'wait-popup',
            description: { tr: 'Popup açıldığında yakalamak için waitForPopup() kullanılır. Selenium\'da getWindowHandles() ile tüm handle\'ları alıp yenisini bulmak gerekirdi. Playwright bunu tek satırda yapar.', en: 'Use waitForPopup() to catch popups when they open. In Selenium, you had to get all handles with getWindowHandles() and find the new one. Playwright does this in one line.' },
            code: `// Selenium'da popup yakalamak:
// String mainHandle = driver.getWindowHandle();
// driver.findElement(By.id("openPopup")).click();
// String popupHandle = driver.getWindowHandles()
//     .stream().filter(h -> !h.equals(mainHandle)).findFirst().get();
// driver.switchTo().window(popupHandle);

// Playwright'ta:
Page popup = page.waitForPopup(() -> {
    page.locator("#openPopupBtn").click();
});
// popup artık ayrı bir Page nesnesi`,
            tip: { tr: '✅ waitForPopup() atom yapısı: action ve bekleme birleşik. Selenium\'daki "click() sonrası handle loop" sorusu artık yok.', en: '✅ waitForPopup() is atomic: action and wait are combined. The Selenium "click() then handle loop" problem is gone.' },
          },
          {
            id: 'new-page', label: 'context.newPage()', labelEn: 'context.newPage()',
            visualState: 'new-page',
            description: { tr: 'Programatik olarak yeni sayfa açma. Selenium\'da driver.switchTo().newWindow(WindowType.TAB) ile yapılırdı. Playwright\'ta context.newPage() çok daha temiz.', en: 'Open a new page programmatically. In Selenium this was done with driver.switchTo().newWindow(WindowType.TAB). In Playwright, context.newPage() is much cleaner.' },
            code: `// Yeni sekme/sayfa aç
Page secondPage = context.newPage();
secondPage.navigate("https://admin.example.com");

// Her iki sayfada da işlem yap
page.locator("#mainAction").click();       // 1. sayfa
secondPage.locator("#adminAction").click(); // 2. sayfa

// Sayfa listesi
System.out.println(context.pages().size()); // 2`,
            tip: { tr: '✅ Her Page nesnesi bağımsız: kendi cookie\'si, kendi local storage\'ı. Selenium\'daki window handle yönetimi kabusu artık yok.', en: '✅ Each Page object is independent: its own cookies, own local storage. The Selenium window handle management nightmare is gone.' },
          },
          {
            id: 'close', label: 'page.close()', labelEn: 'page.close()',
            visualState: 'close',
            description: { tr: 'Sayfayı kapat ve ana sayfaya dön. Selenium\'da driver.close() + switchTo().window(mainHandle) gerekir. Playwright\'ta sadece popup.close() — otomatik ana sayfaya geçiş yok ama Page nesneleri bağımsız.', en: 'Close page and return to main. Selenium required driver.close() + switchTo().window(mainHandle). In Playwright, just popup.close() — no automatic main page switch but Page objects are independent.' },
            code: `// Popup işlemini bitir, kapat
popup.locator("#closeBtn").click();
popup.close();

// Ana sayfada işleme devam et (zaten ana page nesnesi var)
page.locator("#confirmOrder").click();

// context.close() → tüm sayfaları kapatır
// context.close();`,
            tip: { tr: '✅ Playwright\'ta her sayfa Page nesnesi olduğundan switchTo() gerekmez. page ve popup nesneleri eş zamanlı kullanılabilir.', en: '✅ Since each page is a Page object in Playwright, switchTo() is not needed. page and popup objects can be used simultaneously.' },
          },
          {
            id: 'context-pages', label: 'context.pages()', labelEn: 'context.pages()',
            visualState: 'context-pages',
            description: { tr: 'context.pages() tüm açık sayfa listesini döndürür. Selenium\'da getWindowHandles() String ID\'leri döndürür ve her geçiş için switchTo() gerekirdi. Playwright\'ta direkt page.title() vb. çağırırsın.', en: 'context.pages() returns the list of all open pages. Selenium\'s getWindowHandles() returned String IDs and switchTo() was needed for every switch. In Playwright, directly call page.title() etc.' },
            code: `// Tüm açık sayfaları listele
List<Page> allPages = context.pages();

for (Page p : allPages) {
    System.out.println(p.title() + " — " + p.url());
}

// Belirli bir sayfayı bul:
Page adminPage = allPages.stream()
    .filter(p -> p.url().contains("/admin"))
    .findFirst().orElseThrow();
adminPage.locator("#dashboard").click();`,
            tip: { tr: '✅ context.pages() + Stream API: Java\'daki güçlü fonksiyonel programlama Playwright\'la çok iyi çalışır.', en: '✅ context.pages() + Stream API: Java\'s powerful functional programming works great with Playwright.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 12: BrowserContext — İzole Paralel Testler', en: 'Step 12: BrowserContext — Isolated Parallel Tests' } },
      {
        type: 'playwright-visual',
        concept: 'browser-context',
        color: '#0ea5e9',
        icon: '🌐',
        title: { tr: 'BrowserContext — İzole Test Ortamları', en: 'BrowserContext — Isolated Test Environments' },
        steps: [
          {
            id: 'single', label: 'Tek Context', labelEn: 'Single Context',
            visualState: 'single',
            description: { tr: 'Playwright\'ta Browser → BrowserContext → Page hiyerarşisi vardır. Selenium\'da her WebDriver instance tek bir tarayıcı. Playwright\'ta tek browser\'dan izole context\'ler üretebilirsin.', en: 'Playwright has a Browser → BrowserContext → Page hierarchy. In Selenium, each WebDriver instance is a single browser. In Playwright, isolated contexts can be created from a single browser.' },
            code: `Playwright playwright = Playwright.create();
Browser browser = playwright.chromium().launch();

// Tek context — tek kullanıcı oturumu
BrowserContext context = browser.newContext();
Page page = context.newPage();

// Selenium'da: her test için yeni WebDriver
// Playwright'ta: her test için yeni BrowserContext — çok daha hızlı!`,
            tip: { tr: '✅ BrowserContext oluşturmak yeni WebDriver başlatmaktan 10x daha hızlıdır — test suite\'inin hızı dramatik artar.', en: '✅ Creating a BrowserContext is 10x faster than starting a new WebDriver — test suite speed increases dramatically.' },
          },
          {
            id: 'new-context', label: 'newContext()', labelEn: 'newContext()',
            visualState: 'new-context',
            description: { tr: 'browser.newContext() ile izole bir kullanıcı oturumu oluşturulur. Her context kendi cookie\'sini, local storage\'ını ve sessionStorage\'ını taşır. Java\'da ThreadLocal<UserSession> gibi.', en: 'browser.newContext() creates an isolated user session. Each context carries its own cookies, local storage and sessionStorage. Like ThreadLocal<UserSession> in Java.' },
            code: `// Admin oturumu
BrowserContext adminCtx = browser.newContext(
    new Browser.NewContextOptions()
        .setStorageStatePath(Paths.get("admin-state.json"))
);
Page adminPage = adminCtx.newPage();
adminPage.navigate("https://app.com/admin");

// Müşteri oturumu
BrowserContext customerCtx = browser.newContext();
Page customerPage = customerCtx.newPage();
customerPage.navigate("https://app.com/shop");`,
            tip: { tr: '✅ storageStatePath ile login state kaydedebilirsin — her test başında login yapmak gerekmez. Çok büyük süre tasarrufu!', en: '✅ With storageStatePath you can save login state — no need to login at the start of every test. Huge time savings!' },
          },
          {
            id: 'parallel', label: 'Paralel Test', labelEn: 'Parallel Tests',
            visualState: 'parallel',
            description: { tr: 'Farklı context\'lerde testler paralel çalışır — birbirini etkilemez. JUnit5 @Execution(CONCURRENT) ile birleştirildiğinde test süresi dramatik düşer. Selenium Grid\'e gerek kalmaz.', en: 'Tests in different contexts run in parallel — without affecting each other. Combined with JUnit5 @Execution(CONCURRENT), test duration drops dramatically. No need for Selenium Grid.' },
            code: `// JUnit5 paralel test örneği
@TestInstance(Lifecycle.PER_CLASS)
@Execution(ExecutionMode.CONCURRENT)
class ParallelTest {
    static Browser browser;

    @BeforeAll
    static void setup() {
        browser = Playwright.create().chromium().launch();
    }

    @Test
    void adminTest() {
        try (BrowserContext ctx = browser.newContext()) {
            Page page = ctx.newPage();
            // Admin senaryosu
        }
    }

    @Test
    void customerTest() {
        try (BrowserContext ctx = browser.newContext()) {
            Page page = ctx.newPage();
            // Müşteri senaryosu — adminTest ile paralel!
        }
    }
}`,
            tip: { tr: '✅ Her context try-with-resources ile açılırsa test sonunda otomatik kapanır — memory leak yok.', en: '✅ If each context is opened with try-with-resources, it auto-closes after test — no memory leaks.' },
          },
          {
            id: 'isolation', label: 'İzolasyon', labelEn: 'Isolation',
            visualState: 'isolation',
            description: { tr: 'Her context tamamen izole: cookie, localStorage, sessionStorage paylaşılmaz. Admin\'in login cookie\'si müşteri context\'ine geçmez. Java\'da ClassLoader izolasyonu gibi.', en: 'Each context is completely isolated: cookies, localStorage, sessionStorage are not shared. Admin\'s login cookie doesn\'t leak into customer context. Like ClassLoader isolation in Java.' },
            code: `// Aynı site, farklı oturumlar:
BrowserContext adminCtx    = browser.newContext();
BrowserContext customerCtx = browser.newContext();
BrowserContext guestCtx    = browser.newContext();

Page adminPage    = adminCtx.newPage();    // admin cookie
Page customerPage = customerCtx.newPage(); // customer cookie
Page guestPage    = guestCtx.newPage();    // cookie yok

// Üçü aynı anda farklı URL'lerde — tamamen izole!
adminPage.navigate("https://app.com/admin");
customerPage.navigate("https://app.com/orders");
guestPage.navigate("https://app.com/home");`,
            tip: { tr: '✅ Paralel E2E test senaryosu: admin sepete ürün koy → customer aynı anda ödeme yap → guest ana sayfada gez. Birbirini etkilemez.', en: '✅ Parallel E2E test scenario: admin add to cart → customer pay at same time → guest browse home. None affect each other.' },
          },
          {
            id: 'close', label: 'Kapat', labelEn: 'Close',
            visualState: 'close',
            description: { tr: 'context.close() ile context ve içindeki tüm sayfalar kapatılır. browser.close() ile tüm context\'ler ve browser kapanır. Try-with-resources ile otomatik temizlik önerilir.', en: 'context.close() closes the context and all its pages. browser.close() closes all contexts and the browser. Try-with-resources for automatic cleanup is recommended.' },
            code: `// Manuel kapat:
adminCtx.close();     // → adminPage da kapanır
customerCtx.close();

// Otomatik (try-with-resources — önerilen):
try (BrowserContext ctx = browser.newContext()) {
    Page page = ctx.newPage();
    // test işlemleri
} // ctx.close() otomatik çağrılır

// Playwright JUnit5 extension ile:
// @ExtendWith(PlaywrightExtension.class)
// her test için otomatik context + cleanup`,
            tip: { tr: '✅ playwright-junit kullan: context lifecycle otomatik yönetilir. Her @Test metodunda temiz bir context garantilenir.', en: '✅ Use playwright-junit: context lifecycle managed automatically. A clean context is guaranteed for each @Test method.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 13: Trace Viewer — Görsel Test Kaydı', en: 'Step 13: Trace Viewer — Visual Test Recording' } },
      {
        type: 'playwright-visual',
        concept: 'trace',
        color: '#8b5cf6',
        icon: '🎬',
        title: { tr: 'Playwright Trace Viewer — İnteraktif Rehber', en: 'Playwright Trace Viewer — Interactive Guide' },
        steps: [
          {
            id: 'record', label: 'Trace Kayıt', labelEn: 'Record Trace',
            visualState: 'record',
            description: { tr: 'Playwright, test sırasında her etkileşimi DOM snapshot\'ı, ağ trafiği ve console log\'larıyla birlikte kaydeder. Selenium\'da böyle bir özellik yoktu. Debug yaparken inanılmaz güçlüdür.', en: 'Playwright records every interaction during the test with DOM snapshots, network traffic and console logs. No such feature in Selenium. Incredibly powerful for debugging.' },
            code: `// Trace başlat
context.tracing().start(
    new Tracing.StartOptions()
        .setScreenshots(true)   // her action'da screenshot
        .setSnapshots(true)     // DOM snapshot
        .setSources(true)       // kaynak kod satırları
);

// Testler burada...

// Trace kaydet
context.tracing().stop(
    new Tracing.StopOptions()
        .setPath(Paths.get("target/trace.zip"))
);`,
            tip: { tr: '✅ Trace dosyası: screenshots + DOM snapshots + network + console + kaynak satırları. Test nerede neden başarısız oldu anında görülür.', en: '✅ Trace file: screenshots + DOM snapshots + network + console + source lines. Instantly see where and why the test failed.' },
          },
          {
            id: 'screenshot', label: 'Screenshot', labelEn: 'Screenshot',
            visualState: 'screenshot',
            description: { tr: 'Test başarısız olduğunda otomatik screenshot alma. Selenium\'da bunu manuel olarak @AfterEach\'e eklermen gerekirdi. Playwright\'ta Tracing.StartOptions.setScreenshots(true) ile otomatik.', en: 'Automatically take screenshot when test fails. In Selenium, you had to add this manually in @AfterEach. In Playwright, automatic with Tracing.StartOptions.setScreenshots(true).' },
            code: `// Her action'da otomatik screenshot (trace içinde)
// Ayrıca: başarısız test için explict screenshot
@AfterEach
void tearDown(TestInfo testInfo) {
    if (testInfo.getTags().contains("failed")) {
        page.screenshot(new Page.ScreenshotOptions()
            .setPath(Paths.get(
                "target/screenshots/" + testInfo.getDisplayName() + ".png"
            ))
        );
    }
    context.tracing().stop(
        new Tracing.StopOptions()
            .setPath(Paths.get("target/traces/" + testInfo.getDisplayName() + ".zip"))
    );
}`,
            tip: { tr: '✅ Screenshot + Trace birlikte kullan: screenshot "ne?" sorusunu cevaplar, trace "neden?" sorusunu.', en: '✅ Use Screenshot + Trace together: screenshot answers "what?", trace answers "why?".' },
          },
          {
            id: 'video', label: 'Video Kayıt', labelEn: 'Video Recording',
            visualState: 'video',
            description: { tr: 'Tüm test seansını video olarak kaydetme. Selenium\'da sadece 3rd party araçlarla mümkündü. Playwright\'ta newContext() seçeneği olarak dahil.', en: 'Record the entire test session as video. In Selenium this was only possible with 3rd party tools. In Playwright, built-in as newContext() option.' },
            code: `BrowserContext context = browser.newContext(
    new Browser.NewContextOptions()
        .setRecordVideoDir(Paths.get("target/videos/"))
        .setRecordVideoSize(1280, 720)
);

Page page = context.newPage();
// ...testler...

// Video kaydetmek için context.close() şart
context.close();
// target/videos/xxx.webm dosyası oluşur`,
            tip: { tr: '✅ Video debugging: sayfanın tam olarak nasıl göründüğünü, hangi animasyonların çalıştığını frame frame incele. CI/CD\'de test failure analizi için altın değerinde.', en: '✅ Video debugging: inspect frame by frame exactly how the page looked, which animations ran. Gold value for test failure analysis in CI/CD.' },
          },
          {
            id: 'viewer', label: 'Trace Viewer', labelEn: 'Trace Viewer',
            visualState: 'viewer',
            description: { tr: 'Kaydedilen trace\'i Playwright\'ın kendi görsel aracında aç. Her action için DOM\'un tam snapshot\'ını, ağ isteklerini ve console log\'larını zaman çizelgesinde görebilirsin.', en: 'Open the recorded trace in Playwright\'s own visual tool. For each action, see a full DOM snapshot, network requests and console logs on a timeline.' },
            code: `// Terminalde:
// npx playwright show-trace target/trace.zip

// Java'dan programatik:
// Trace dosyasını artifact olarak kaydet
// CI/CD pipeline'da:
// - steps: npx playwright show-trace trace.zip
//   (trace.pw.dev sitesinde de açılabilir)

// Allure ile entegrasyon:
byte[] traceBytes = Files.readAllBytes(Paths.get("trace.zip"));
Allure.addAttachment("Playwright Trace",
    "application/zip",
    new ByteArrayInputStream(traceBytes),
    ".zip"
);`,
            tip: { tr: '✅ trace.pw.dev: trace.zip dosyasını tarayıcıdan yükle, kurulum gerekmez. CI/CD artifact\'ından doğrudan analiz yapılabilir.', en: '✅ trace.pw.dev: upload trace.zip from browser, no installation needed. Can directly analyze from CI/CD artifacts.' },
          },
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright Java API\'sinde, testler arasında tam izolasyon sağlamak (çerezleri, oturum verilerini ve tarayıcı geçmişini temiz tutmak) için her test öncesi oluşturulan nesne hangisidir?', en: 'In Playwright Java API, which object is created before each test to ensure complete test isolation (clean cookies, storage, and history)?' },
        options: [
          { id: 'a', text: 'Browser' },
          { id: 'b', text: 'BrowserContext' },
          { id: 'c', text: 'Page' },
          { id: 'd', text: 'Playwright' },
        ],
        correct: 'b',
        explanation: { tr: 'BrowserContext, tarayıcı içinde izole bir oturum (session) oluşturur. Tıpkı gizli sekme (Incognito) gibi çalışır; çerezler, yerel depolama ve geçmiş tamamen izoledir. Playwright, her test için yeni bir BrowserContext oluşturulmasını önerir.', en: 'BrowserContext creates an isolated session within the browser, functioning like an Incognito window. Cookies, local storage, and history are completely isolated. Playwright recommends creating a new BrowserContext for each test.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright Java'da, birbirlerinden bağımsız (her biri ayrı bir kimlik doğrulamasına sahip) birden fazla kullanıcı oturumunu aynı test senaryosu içerisinde simüle etmek için hangi sınıf kullanılır?",
            "en": "Which class in Playwright Java is used to simulate multiple independent user sessions (each with its own authentication) within the same test scenario?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Browser"
            },
            {
                  "id": "b",
                  "text": "BrowserContext"
            },
            {
                  "id": "c",
                  "text": "Page"
            },
            {
                  "id": "d",
                  "text": "APIRequestContext"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "BrowserContext, her biri bağımsız çerezlere ve depolama alanlarına sahip birden fazla izole ortam oluşturmanıza olanak tanır. Bu sayede aynı tarayıcı örneği içinde farklı kullanıcı oturumlarını kolayca yönetebilirsiniz.",
            "en": "BrowserContext allows you to create multiple isolated environments, each with its own cookies and storage. This enables easy management of different user sessions within the same browser instance."
      }
}
},
    ],
  },
  en: {
    title: '🎭 Playwright Java — Step by Step',
    blocks: [
      {
        type: 'simple-box', emoji: '🎭',
        content: 'Think of Playwright as a smart detective assistant: when you say "find this button and click it," it waits for the button, automatically waits until it\'s ready, then clicks. With Selenium, you had to say "wait for this, then do that." With Playwright, you just say "do it" — it handles the rest.',
      },
      { type: 'heading', text: { tr: 'Adım 1: Maven Kurulumu', en: 'Step 1: Maven Setup' } },
      {
        type: 'code', language: 'xml', label: 'pom.xml — Playwright Java',
        code: `<dependencies>
  <!-- Playwright Java (everything included: Chrome, Firefox, WebKit) -->
  <dependency>
    <groupId>com.microsoft.playwright</groupId>
    <artifactId>playwright</artifactId>
    <version>1.44.0</version>
  </dependency>

  <!-- JUnit5 runner -->
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>

<!-- Download browser binaries (first time only) -->
<!-- mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install" -->`,
      },
      { type: 'heading', text: { tr: 'Adım 2: Tarayıcı Açma ve Kapatma', en: 'Step 2: Browser Launch' } },
      {
        type: 'code', language: 'java', label: 'Chromium / Firefox / WebKit launch',
        code: `import com.microsoft.playwright.*;

public class BrowserSetup {
    public static void main(String[] args) {

        // try-with-resources → auto-closes (like AutoCloseable in Java)
        try (Playwright playwright = Playwright.create()) {

            // ── Chromium (Chrome/Edge-based) ─────────────────────
            Browser browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions()
                    .setHeadless(false)         // visible mode (development)
                    .setSlowMo(100)             // 100ms delay between actions
            );
            // For CI/CD: .setHeadless(true)

            // ── Firefox ─────────────────────────────────────────
            // Browser browser = playwright.firefox().launch();

            // ── WebKit (Safari) ─────────────────────────────────
            // Browser browser = playwright.webkit().launch();

            // BrowserContext → Page (like WebDriver → window in Selenium)
            BrowserContext context = browser.newContext(
                new Browser.NewContextOptions()
                    .setViewportSize(1280, 720)
                    .setLocale("en-US")
            );
            Page page = context.newPage();

            page.navigate("https://automationexercise.com");
            System.out.println("Title: " + page.title());
            System.out.println("URL: " + page.url());

            browser.close(); // context and pages auto-close
        }
    }
}`,
      },
      { type: 'heading', text: { tr: 'Adım 3: Sayfa Navigasyonu', en: 'Step 3: Navigation' } },
      {
        type: 'code', language: 'java', label: 'All navigation commands',
        code: `Page page = context.newPage();

// Open URL — auto-waits until DOM is loaded
page.navigate("https://automationexercise.com");

// navigate() options
page.navigate("https://google.com",
    new Page.NavigateOptions()
        .setWaitUntil(WaitUntilState.NETWORKIDLE) // wait until network is idle
        .setTimeout(30000)                         // 30 second timeout
);

// Back / Forward / Reload — like navigate().back() in Selenium
page.goBack();
page.goForward();
page.reload();

// Page info
String title  = page.title();        // "Automation Exercise"
String url    = page.url();          // "https://..."
String source = page.content();      // Full HTML (Selenium: getPageSource())

// Wait for popup / new tab (replaces getWindowHandles() in Selenium)
Page popup = page.waitForPopup(() -> {
    page.locator("#openPopupBtn").click();
});
System.out.println("Popup URL: " + popup.url());`,
      },
      { type: 'heading', text: { tr: 'Adım 4: Element Bulma — 8 Locator Stratejisi', en: 'Step 4: Element Locators — 8 Strategies' } },
      {
        type: 'simple-box',
        emoji: '🔍',
        content: {
          tr: 'Playwright locator\'ları, Selenium\'un By.* metodlarından çok daha akıllıdır: element DOM\'a eklenene kadar otomatik bekler, ayrıca görünür ve enabled olmasını da bekler. Java\'da bir Future<WebElement> gibi — hazır olunca verir.',
          en: 'Playwright locators are much smarter than Selenium\'s By.* methods: they auto-wait until the element is in the DOM and also wait for it to be visible and enabled. Like a Future<WebElement> in Java — gives it when ready.',
        },
      },
      {
        type: 'locator-visual',
        codeLabel: 'Playwright (Java)',
        htmlExample: {
          tr: `<form id="loginForm" class="login-form">

  <label for="username">Kullanıcı Adı</label>

  <input
    id="username"
    class="form-input"
    name="email"
    type="email"
    placeholder="E-posta"
    data-testid="username-input"
    aria-label="Email Address" />

  <button
    id="loginBtn"
    class="btn btn-primary"
    type="submit"
    data-testid="login-btn">
    Giriş Yap
  </button>

  <a href="/forgot">Şifremi Unuttum</a>

</form>`,
          en: `<form id="loginForm" class="login-form">

  <label for="username">Username</label>

  <input
    id="username"
    class="form-input"
    name="email"
    type="email"
    placeholder="Email"
    data-testid="username-input"
    aria-label="Email Address" />

  <button
    id="loginBtn"
    class="btn btn-primary"
    type="submit"
    data-testid="login-btn">
    Login
  </button>

  <a href="/forgot">Forgot Password</a>

</form>`
        },
        locators: [
          {
            id: 'by-role', label: 'getByRole()', priority: 1, starRating: '⭐⭐⭐', color: '#10b981',
            highlights: ['type="email"'],
            code: `// Playwright's MOST RECOMMENDED locator!
Locator el = page.getByRole(
    AriaRole.TEXTBOX,
    new Page.GetByRoleOptions().setName("Email Address")
);
// role → HTML semantic role (button, textbox, checkbox...)
// name → aria-label or label text`,
            title: 'Most Semantic — Accessibility-Focused',
            titleEn: 'Most Semantic — Accessibility-Focused',
            explanation: 'Targets HTML ARIA semantic roles. Works based on how the user sees the page — tests don\'t break even if HTML structure changes. Like programming to an interface in Java: contract stays intact even if implementation changes. Playwright team\'s 1st recommendation.',
            explanationEn: 'Targets HTML ARIA semantic roles. Works based on how the user sees the page — tests don\'t break even if HTML structure changes. Like programming to an interface in Java: contract stays intact even if implementation changes. Playwright team\'s 1st recommendation.',
            tip: '✅ MOST RECOMMENDED: getByRole() is both semantic and resilient. AriaRole.BUTTON, TEXTBOX, CHECKBOX, LINK, HEADING...',
            tipEn: '✅ MOST RECOMMENDED: getByRole() is both semantic and resilient. AriaRole.BUTTON, TEXTBOX, CHECKBOX, LINK, HEADING...',
            when: 'When element has an ARIA role — ALWAYS first choice',
            whenEn: 'When element has an ARIA role — ALWAYS first choice',
          },
          {
            id: 'by-testid', label: 'getByTestId()', priority: 1, starRating: '⭐⭐⭐', color: '#06b6d4',
            highlights: ['data-testid="username-input"'],
            code: `// data-testid attribute — designed for testing
Locator el = page.getByTestId("username-input");

// Default: searches data-testid attribute
// Customizable in playwright.config:
// use: { testIdAttribute: 'data-qa' }`,
            title: 'Designed for Testing — Best Practice',
            titleEn: 'Designed for Testing — Best Practice',
            explanation: 'data-testid is added specifically for QA. Tests don\'t break even if styles, classes or structure change. Same as Selenium\'s By.cssSelector("[data-testid=\'...\']") but much cleaner syntax.',
            explanationEn: 'data-testid is added specifically for QA. Tests don\'t break even if styles, classes or structure change. Same as Selenium\'s By.cssSelector("[data-testid=\'...\']") but much cleaner syntax.',
            tip: '✅ BEST PRACTICE: Ask the dev team to add data-testid to all testable elements.',
            tipEn: '✅ BEST PRACTICE: Ask the dev team to add data-testid to all testable elements.',
            when: 'When data-testid exists — equal priority with getByRole()',
            whenEn: 'When data-testid exists — equal priority with getByRole()',
          },
          {
            id: 'by-label', label: 'getByLabel()', priority: 2, starRating: '⭐⭐⭐', color: '#3b82f6',
            highlights: ['for="username"', 'Kullanıcı Adı'],
            code: { tr: `// <label for="username">Kullanıcı Adı</label> ile eşleştirir
Locator el = page.getByLabel("Kullanıcı Adı");

// Kısmi eşleşme:
Locator el2 = page.getByLabel("Kullanıcı", new Page.GetByLabelOptions().setExact(false));

// Selenium'da bunu By ile yapamazsın!
// label → input ilişkisini otomatik çözer`, en: `// Matches via <label for="username">Username</label>
Locator el = page.getByLabel("Username");

// Partial match:
Locator el2 = page.getByLabel("User", new Page.GetByLabelOptions().setExact(false));

// Can't do this with Selenium's By methods!
// Automatically resolves the label → input relationship` },
            title: 'Natural Choice for Form Fields',
            titleEn: 'Natural Choice for Form Fields',
            explanation: 'Finds the HTML label element and selects the form input it targets. In Selenium, you\'d need XPath with following-sibling to do this. Like a Builder pattern in Java — know the label name, auto-find the input.',
            explanationEn: 'Finds the HTML label element and selects the form input it targets. In Selenium, you\'d need XPath with following-sibling to do this. Like a Builder pattern in Java — know the label name, auto-find the input.',
            tip: '✅ Ideal for login, registration, form pages. Matches by the label text the user sees.',
            tipEn: '✅ Ideal for login, registration, form pages. Matches by the label text the user sees.',
            when: 'When a form input has an associated label element',
            whenEn: 'When a form input has an associated label element',
          },
          {
            id: 'by-placeholder', label: 'getByPlaceholder()', priority: 3, starRating: '⭐⭐', color: '#8b5cf6',
            highlights: ['placeholder="E-posta"'],
            code: `// Matches by placeholder attribute
Locator el = page.getByPlaceholder("E-posta");

// Partial match (exact: false):
Locator el2 = page.getByPlaceholder(
    "E",
    new Page.GetByPlaceholderOptions().setExact(false)
);
// Selenium equiv: By.cssSelector("input[placeholder='E-posta']")`,
            title: 'Match by Placeholder Text',
            titleEn: 'Match by Placeholder Text',
            explanation: 'Targets the placeholder attribute of input elements. Used when there\'s no label or placeholder is more readable. Same as By.cssSelector("input[placeholder=\'...\']") in Selenium but cleaner.',
            explanationEn: 'Targets the placeholder attribute of input elements. Used when there\'s no label or placeholder is more readable. Same as By.cssSelector("input[placeholder=\'...\']") in Selenium but cleaner.',
            tip: '⚠️ Placeholder text may change with i18n. Prefer getByLabel() or getByTestId() when possible.',
            tipEn: '⚠️ Placeholder text may change with i18n. Prefer getByLabel() or getByTestId() when possible.',
            when: 'When no label exists and placeholder is static text',
            whenEn: 'When no label exists and placeholder is static text',
          },
          {
            id: 'by-text', label: 'getByText()', priority: 4, starRating: '⭐⭐', color: '#f59e0b',
            highlights: ['Giriş Yap'],
            code: { tr: `// Görünen metin içeriğine göre eşleştirir
Locator btn = page.getByText("Giriş Yap");

// Tam eşleşme (varsayılan):
Locator exact = page.getByText("Giriş Yap", new Page.GetByTextOptions().setExact(true));

// Kısmi eşleşme:
Locator partial = page.getByText("Giriş", new Page.GetByTextOptions().setExact(false));

// Selenium'da: By.xpath("//button[text()='Giriş Yap']")`, en: `// Matches by visible text content
Locator btn = page.getByText("Login");

// Exact match (default):
Locator exact = page.getByText("Login", new Page.GetByTextOptions().setExact(true));

// Partial match:
Locator partial = page.getByText("Log", new Page.GetByTextOptions().setExact(false));

// Selenium equiv: By.xpath("//button[text()='Login']")` },
            title: 'Match by Visible Text',
            titleEn: 'Match by Visible Text',
            explanation: 'Targets visible text on the page. Works for any element type — button, link, label, div. In Selenium, linkText() only worked for <a>; getByText() works on all elements.',
            explanationEn: 'Targets visible text on the page. Works for any element type — button, link, label, div. In Selenium, linkText() only worked for <a>; getByText() works on all elements.',
            tip: '⚠️ Breaks when language changes. In i18n apps, prefer data-testid or getByRole().',
            tipEn: '⚠️ Breaks when language changes. In i18n apps, prefer data-testid or getByRole().',
            when: 'For buttons or links with static text when language won\'t change',
            whenEn: 'For buttons or links with static text when language won\'t change',
          },
          {
            id: 'by-css-id', label: 'locator("#id")', priority: 2, starRating: '⭐⭐⭐', color: '#7c3aed',
            highlights: ['id="username"'],
            code: `// CSS selector — like By.id() and By.cssSelector() in Selenium
Locator el = page.locator("#username");

// Scoped locator (chaining):
Locator el2 = page.locator("#loginForm").locator("#username");

// Selenium equivalent:
// driver.findElement(By.id("username"))`,
            title: 'CSS id Selector — Fast and Reliable',
            titleEn: 'CSS id Selector — Fast and Reliable',
            explanation: 'In CSS syntax, # selects by id. Same speed as Selenium\'s By.id(). page.locator() supports both CSS and XPath — no separate By methods like in Selenium.',
            explanationEn: 'In CSS syntax, # selects by id. Same speed as Selenium\'s By.id(). page.locator() supports both CSS and XPath — no separate By methods like in Selenium.',
            tip: '✅ Use when id exists and getByRole()/getByTestId() are not appropriate. Easy for Selenium migrants.',
            tipEn: '✅ Use when id exists and getByRole()/getByTestId() are not appropriate. Easy for Selenium migrants.',
            when: 'When getByRole() or getByTestId() is not appropriate and id exists',
            whenEn: 'When getByRole() or getByTestId() is not appropriate and id exists',
          },
          {
            id: 'by-css-combo', label: 'locator(css combo)', priority: 3, starRating: '⭐⭐', color: '#ec4899',
            highlights: ['class="form-input"', 'name="email"'],
            code: `// Tag + class + attribute combination
Locator el = page.locator("input.form-input[name='email']");

// Combine with data-testid (powerful selector):
Locator el2 = page.locator("[data-testid='username-input'][type='email']");

// Selenium equivalent:
// By.cssSelector("input.form-input[name='email']")`,
            title: 'Combined CSS — Specific & Reliable',
            titleEn: 'Combined CSS — Specific & Reliable',
            explanation: 'Combination of tag, class and attributes. Exactly same syntax as Selenium\'s By.cssSelector(). Playwright also supports :has(), :text(), :near() pseudo-selectors.',
            explanationEn: 'Combination of tag, class and attributes. Exactly same syntax as Selenium\'s By.cssSelector(). Playwright also supports :has(), :text(), :near() pseudo-selectors.',
            tip: '✅ CSS selector syntax is identical when migrating from Selenium. Also learn Playwright\'s extra selectors like :has-text().',
            tipEn: '✅ CSS selector syntax is identical when migrating from Selenium. Also learn Playwright\'s extra selectors like :has-text().',
            when: 'When getByRole()/getByTestId() unavailable and multi-attribute filtering is needed',
            whenEn: 'When getByRole()/getByTestId() unavailable and multi-attribute filtering is needed',
          },
          {
            id: 'by-xpath', label: 'locator(xpath=)', priority: 8, starRating: '⭐', color: '#ef4444',
            highlights: ['type="submit"'],
            code: { tr: `// XPath — Playwright'ta "xpath=" prefix ile
Locator btn = page.locator("xpath=//button[@type='submit']");

// Metin ile XPath:
Locator byText = page.locator("xpath=//button[text()='Giriş Yap']");

// DOM ilişkisi:
Locator sibling = page.locator("xpath=//label[@for='username']/following-sibling::input");

// NOT: getByText() XPath'ten çok daha iyidir — önce onu dene!`, en: `// XPath — use "xpath=" prefix in Playwright
Locator btn = page.locator("xpath=//button[@type='submit']");

// By text with XPath:
Locator byText = page.locator("xpath=//button[text()='Login']");

// DOM relationship:
Locator sibling = page.locator("xpath=//label[@for='username']/following-sibling::input");

// NOTE: getByText() is much better than XPath — try it first!` },
            title: 'Most Powerful — But Last Resort',
            titleEn: 'Most Powerful — But Last Resort',
            explanation: 'In Playwright, XPath is used with "xpath=" prefix. Exactly same power as Selenium\'s By.xpath(). Slow and brittle; getByRole(), getByText() or CSS are better options.',
            explanationEn: 'In Playwright, XPath is used with "xpath=" prefix. Exactly same power as Selenium\'s By.xpath(). Slow and brittle; getByRole(), getByText() or CSS are better options.',
            tip: '⛔ Last resort. Playwright\'s own locators (getByRole, getByText etc.) are much more powerful. Use XPath only when nothing else works.',
            tipEn: '⛔ Last resort. Playwright\'s own locators (getByRole, getByText etc.) are much more powerful. Use XPath only when nothing else works.',
            when: 'When no Playwright locator works — especially for complex DOM relationships',
            whenEn: 'When no Playwright locator works — especially for complex DOM relationships',
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 5: Element İşlemleri', en: 'Step 5: Element Actions' } },
      {
        type: 'code', language: 'java', label: 'All element actions — fill, click, check, read',
        code: `Locator input = page.locator("#username");

// ── WRITE / CLICK ────────────────────────────────────
input.fill("admin@example.com");      // Clear then fill (better than sendKeys!)
input.clear();                        // Clear content
input.pressSequentially("abc");       // Type char by char (for masked inputs)
input.click();                        // Click
input.dblclick();                     // Double click

// Special keys (like sendKeys(Keys.ENTER) in Selenium)
input.press("Enter");
input.press("Tab");
input.press("Control+A");             // Selenium: keyDown(CONTROL) + sendKeys("a")

// ── READ ─────────────────────────────────────────────
String text       = input.textContent();        // Visible text
String inputValue = input.inputValue();         // Input value (Selenium: getAttribute("value"))
String cls        = input.getAttribute("class");
String href       = page.locator("a").getAttribute("href");

// ── STATE CHECK ──────────────────────────────────────
boolean visible  = input.isVisible();   // Is visible?
boolean enabled  = input.isEnabled();   // Is active?
boolean checked  = input.isChecked();   // Checkbox/Radio selected?
boolean disabled = input.isDisabled();  // Is disabled?

// ── CHECKBOX / RADIO ─────────────────────────────────
page.locator("#rememberMe").check();    // Selenium: click() to toggle
page.locator("#rememberMe").uncheck();

// ── SELECT DROPDOWN ──────────────────────────────────
// Selenium: had to wrap with Select class
page.locator("#country").selectOption("TR");                 // by value
page.locator("#country").selectOption(new SelectOption().setLabel("Turkey")); // by text
page.locator("#country").selectOption(new SelectOption().setIndex(0));        // by index`,
      },
      {
        type: 'playwright-visual',
        concept: 'select-option',
        color: '#f59e0b',
        icon: '🔽',
        title: { tr: 'selectOption() — İnteraktif Görsel Rehber', en: 'selectOption() — Interactive Visual Guide' },
        steps: [
          {
            id: 'wrap', label: 'Locator', labelEn: 'Locator',
            visualState: 'wrap',
            description: { tr: 'Playwright\'ta Select dropdown için ayrı bir sınıfa sarma yok! Selenium\'da new Select(element) yapman gerekirdi. Playwright\'ta direkt locator üzerinden .selectOption() çağrırsın.', en: 'No wrapper class for Select dropdown in Playwright! Selenium required new Select(element). In Playwright, call .selectOption() directly on the locator.' },
            code: `// Selenium:
// Select dropdown = new Select(driver.findElement(By.id("country")));
// dropdown.selectByValue("TR");

// Playwright — much cleaner:
Locator country = page.locator("#country");
country.selectOption("TR"); // value`,
            tip: { tr: '✅ No Select class in Playwright — locator.selectOption() is enough. Shorter and more readable.', en: '✅ No Select class in Playwright — locator.selectOption() is enough. Shorter and more readable.' },
          },
          {
            id: 'byValue', label: 'byValue', labelEn: 'byValue',
            visualState: 'byValue', selectedValue: 'tr',
            description: { tr: 'Select by HTML value attribute — most reliable. Like Map.get("TR") in Java: direct key access.', en: 'Select by HTML value attribute — most reliable. Like Map.get("TR") in Java: direct key access.' },
            code: `page.locator("#country").selectOption("tr");

// Selenium:
// dropdown.selectByValue("tr");

String selectedVal = page.locator("#country").inputValue();
assertEquals("tr", selectedVal);`,
            tip: { tr: '✅ Most reliable. Value attribute stays constant even if display language changes.', en: '✅ Most reliable. Value attribute stays constant even if display language changes.' },
          },
          {
            id: 'byText', label: 'byLabel', labelEn: 'byLabel',
            visualState: 'byText', selectedValue: 'tr',
            description: { tr: 'Select by visible text (label). Same as Selenium\'s selectByVisibleText(). Case-sensitive.', en: 'Select by visible text (label). Same as Selenium\'s selectByVisibleText(). Case-sensitive.' },
            code: `page.locator("#country").selectOption(
    new SelectOption().setLabel("Turkey")
);

// Selenium:
// dropdown.selectByVisibleText("Turkey");`,
            tip: { tr: '⚠️ Breaks if visible text changes with i18n. Prefer selecting by value.', en: '⚠️ Breaks if visible text changes with i18n. Prefer selecting by value.' },
          },
          {
            id: 'byIndex', label: 'byIndex', labelEn: 'byIndex',
            visualState: 'byIndex', selectedValue: 'tr',
            description: { tr: 'Select by 0-based index. Same as Selenium\'s selectByIndex(0). Least reliable.', en: 'Select by 0-based index. Same as Selenium\'s selectByIndex(0). Least reliable.' },
            code: `page.locator("#country").selectOption(
    new SelectOption().setIndex(0)
);
// Selenium: dropdown.selectByIndex(0);`,
            tip: { tr: '⛔ Last resort — indexes shift when options are added.', en: '⛔ Last resort — indexes shift when options are added.' },
          },
          {
            id: 'getOptions', label: 'all options', labelEn: 'all options',
            visualState: 'getOptions',
            description: { tr: 'Read all options with count() + nth(). Selenium\'s getOptions() returned List<WebElement>.', en: 'Read all options with count() + nth(). Selenium\'s getOptions() returned List<WebElement>.' },
            code: `Locator options = page.locator("#country option");
int total = options.count();
for (int i = 0; i < total; i++) {
    String text  = options.nth(i).textContent();
    String value = options.nth(i).getAttribute("value");
    System.out.println(i + ": " + text + " [" + value + "]");
}`,
            tip: { tr: '✅ count() + nth(i) — equivalent to Selenium\'s getOptions() List loop.', en: '✅ count() + nth(i) — equivalent to Selenium\'s getOptions() List loop.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 6: Auto-Wait — Playwright\'ın Süper Gücü', en: 'Step 6: Auto-Wait — Playwright\'s Superpower' } },
      {
        type: 'simple-box',
        emoji: '⏱️',
        content: {
          tr: 'Selenium\'da yüklenmeyi bekleme sorumluluğu sende. Playwright\'ta bu sorumluluk otomatik: her locator işlemi öncesinde element DOM\'da mı, görünür mü, enabled mı diye kontrol eder.',
          en: 'In Selenium, the responsibility for waiting is yours. In Playwright, it\'s automatic: before each locator action, it checks if the element is in the DOM, visible, and enabled.',
        },
      },
      {
        type: 'code', language: 'java', label: 'Auto-Wait comparison — Selenium vs Playwright',
        code: `// ── SELENIUM: Explicit wait required for EVERY action ────────────
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
WebElement loginBtn = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("loginBtn"))
);
loginBtn.click();
wait.until(ExpectedConditions.invisibilityOfElementLocated(
    By.className("loading-spinner")));
wait.until(ExpectedConditions.urlContains("/dashboard"));
// ...Must repeat for every step!

// ── PLAYWRIGHT: Nothing extra to write ───────────────────────────
// Playwright automatically:
// 1. Waits until element appears in DOM
// 2. Waits until element is visible
// 3. Waits until element is enabled
// 4. Waits for animations to finish
// 5. THEN performs the action

page.locator("#loginBtn").click(); // That's it! 30s auto-wait included

// URL / page waiting (when needed)
page.waitForURL("**/dashboard");
page.waitForLoadState(LoadState.NETWORKIDLE);
page.locator(".loading-spinner").waitFor(
    new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN)
);`,
      },
      {
        type: 'playwright-visual',
        concept: 'auto-wait',
        color: '#10b981',
        icon: '⏱️',
        title: { tr: 'Auto-Wait Mekanizması — Selenium vs Playwright', en: 'Auto-Wait Mechanism — Selenium vs Playwright' },
        steps: [
          {
            id: 'selenium-way', label: 'Selenium Way', labelEn: 'Selenium Way',
            visualState: 'selenium-way',
            description: { tr: 'Selenium requires explicit wait before every interaction. Must write WebDriverWait + ExpectedConditions repeatedly.', en: 'Selenium requires explicit wait before every interaction. Must write WebDriverWait + ExpectedConditions repeatedly.' },
            code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

wait.until(ExpectedConditions.elementToBeClickable(
    By.id("loginBtn"))).click();

wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.id("dashboard"))).getText();`,
            tip: { tr: '⚠️ Don\'t combine implicit + explicit wait — causes unexpected behavior.', en: '⚠️ Don\'t combine implicit + explicit wait — causes unexpected behavior.' },
          },
          {
            id: 'pw-way', label: 'Playwright Way', labelEn: 'Playwright Way',
            visualState: 'pw-way',
            description: { tr: 'No extra wait code in Playwright. Before each locator action, Playwright starts its internal retry loop automatically.', en: 'No extra wait code in Playwright. Before each locator action, Playwright starts its internal retry loop automatically.' },
            code: `// Just this:
page.locator("#loginBtn").click();
// Internally:
// → Is element in DOM?
// → Is it visible?
// → Is it enabled?
// → Is animation finished?
// All OK → CLICK!`,
            tip: { tr: '✅ Default 30s timeout. Change with page.setDefaultTimeout(60000).', en: '✅ Default 30s timeout. Change with page.setDefaultTimeout(60000).' },
          },
          {
            id: 'retry', label: 'Retry Loop', labelEn: 'Retry Loop',
            visualState: 'retry',
            description: { tr: 'If not ready, Playwright retries every ~100ms. This dramatically reduces flaky test count.', en: 'If not ready, Playwright retries every ~100ms. This dramatically reduces flaky test count.' },
            code: `// Custom timeout (for this action only):
page.locator("#slowBtn").click(
    new Locator.ClickOptions().setTimeout(60000)
);

// Wait for specific state:
page.locator(".spinner").waitFor(
    new Locator.WaitForOptions()
        .setState(WaitForSelectorState.HIDDEN)
);`,
            tip: { tr: '✅ ~300 retries in 30s. Far fewer flaky tests than Selenium.', en: '✅ ~300 retries in 30s. Far fewer flaky tests than Selenium.' },
          },
          {
            id: 'found', label: 'Element Ready!', labelEn: 'Element Ready!',
            visualState: 'found',
            description: { tr: 'When element passes all actionability checks, action is performed. No exception = success.', en: 'When element passes all actionability checks, action is performed. No exception = success.' },
            code: `page.locator("#loginBtn").click(); // success if no exception

// Assertions also have auto-wait:
assertThat(page).hasURL("**/dashboard");
assertThat(page.locator(".welcome")).isVisible();`,
            tip: { tr: '✅ Playwright assertions also auto-wait: assertThat(locator).isVisible() waits then asserts.', en: '✅ Playwright assertions also auto-wait: assertThat(locator).isVisible() waits then asserts.' },
          },
          {
            id: 'timeout', label: 'Timeout', labelEn: 'Timeout',
            visualState: 'timeout',
            description: { tr: 'After 30s, TimeoutError is thrown with very informative message: which locator, which condition failed.', en: 'After 30s, TimeoutError is thrown with very informative message: which locator, which condition failed.' },
            code: `// TimeoutError message:
// "page.locator('#loginBtn') → timeout 30000ms exceeded
//  waiting for locator('#loginBtn') to be visible"

page.locator("#slowComponent").waitFor(
    new Locator.WaitForOptions()
        .setState(WaitForSelectorState.VISIBLE)
        .setTimeout(60000)
);`,
            tip: { tr: '💡 On TimeoutError: 1) Correct locator? 2) Enough timeout? 3) Right condition? Playwright\'s error messages are very detailed.', en: '💡 On TimeoutError: 1) Correct locator? 2) Enough timeout? 3) Right condition? Playwright\'s error messages are very detailed.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Adım 7: Screenshot & page.evaluate()', en: 'Step 7: Screenshot & page.evaluate()' } },
      {
        type: 'code', language: 'java', label: 'Screenshot and JavaScript operations',
        code: `import java.nio.file.Paths;

// ── SCREENSHOT ───────────────────────────────────────
page.screenshot(new Page.ScreenshotOptions()
    .setPath(Paths.get("target/screenshots/full-page.png"))
    .setFullPage(true)
);

page.locator("#errorPanel").screenshot(
    new Locator.ScreenshotOptions()
        .setPath(Paths.get("target/screenshots/error-panel.png"))
);

byte[] bytes = page.screenshot();

// ── PAGE.EVALUATE() — JS EXECUTOR EQUIVALENT ─────────
// Selenium: ((JavascriptExecutor) driver).executeScript(...)
// Playwright: page.evaluate()

page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
page.evaluate("window.scrollBy(0, 500)");
page.locator("#footer").evaluate("el => el.scrollIntoView(true)");

String readyState = (String) page.evaluate("() => document.readyState");
System.out.println(readyState); // "complete"

page.locator("#email").evaluate(
    "el => { el.value = 'test@test.com'; el.dispatchEvent(new Event('input', {bubbles:true})); }"
);`,
      },
      {
        type: 'playwright-visual',
        concept: 'evaluate',
        color: '#f59e0b',
        icon: '⚡',
        title: { tr: 'page.evaluate() — İnteraktif Görsel Rehber', en: 'page.evaluate() — Interactive Visual Guide' },
        steps: [
          {
            id: 'idle', label: 'Why evaluate?', labelEn: 'Why evaluate?',
            visualState: 'idle',
            description: { tr: 'page.evaluate() is the counterpart to Selenium\'s JavascriptExecutor. Runs JS where Playwright can\'t reach.', en: 'page.evaluate() is the counterpart to Selenium\'s JavascriptExecutor. Runs JS where Playwright can\'t reach.' },
            code: `// Selenium:
// ((JavascriptExecutor) driver).executeScript("return document.readyState");

// Playwright:
String readyState = (String) page.evaluate("() => document.readyState");
System.out.println(readyState); // "complete"`,
            tip: { tr: '✅ Playwright\'s normal API is enough most of the time. evaluate() only for custom JS.', en: '✅ Playwright\'s normal API is enough most of the time. evaluate() only for custom JS.' },
          },
          {
            id: 'scrollTo', label: 'scrollTo', labelEn: 'scrollTo',
            visualState: 'scrollTo',
            description: { tr: 'Scroll to coordinates. Same as Selenium\'s js.executeScript("window.scrollTo(...)"). locator.scrollIntoViewIfNeeded() is usually better.', en: 'Scroll to coordinates. Same as Selenium\'s js.executeScript("window.scrollTo(...)"). locator.scrollIntoViewIfNeeded() is usually better.' },
            code: `page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
page.evaluate("window.scrollTo(0, 800)");
page.evaluate("window.scrollTo(0, 0)");

// Playwright native (preferred):
page.locator("#target").scrollIntoViewIfNeeded();`,
            tip: { tr: '✅ For lazy-load: scrollTo + locator count() to verify new elements loaded.', en: '✅ For lazy-load: scrollTo + locator count() to verify new elements loaded.' },
          },
          {
            id: 'scrollBy', label: 'scrollBy', labelEn: 'scrollBy',
            visualState: 'scrollBy',
            description: { tr: 'Relative scroll. Same as Selenium\'s js.executeScript("window.scrollBy(...)"). Good for infinite scroll scenarios.', en: 'Relative scroll. Same as Selenium\'s js.executeScript("window.scrollBy(...)"). Good for infinite scroll scenarios.' },
            code: `page.evaluate("window.scrollBy(0, 500)");
page.evaluate("window.scrollBy(0, -200)");

for (int i = 0; i < 5; i++) {
    page.evaluate("window.scrollBy(0, 500)");
    page.waitForTimeout(300);
}`,
            tip: { tr: '✅ waitForTimeout() replaces Thread.sleep() in Playwright.', en: '✅ waitForTimeout() replaces Thread.sleep() in Playwright.' },
          },
          {
            id: 'evaluate', label: 'JS Return', labelEn: 'JS Return',
            visualState: 'evaluate',
            description: { tr: 'Return values from JS. page.evaluate() returns Object — cast as needed. Same as Selenium\'s executeScript() Object return.', en: 'Return values from JS. page.evaluate() returns Object — cast as needed. Same as Selenium\'s executeScript() Object return.' },
            code: `String title = (String) page.evaluate("() => document.title");
Long count   = (Long)   page.evaluate("() => document.querySelectorAll('a').length");
Boolean dark = (Boolean) page.evaluate("() => document.body.classList.contains('dark')");

// Pass parameters (like arguments[0] in Selenium):
Object result = page.evaluate("el => el.getBoundingClientRect().top", page.locator("#target"));`,
            tip: { tr: '✅ Arrow function syntax required: () => expr. Java long → JS number auto-cast.', en: '✅ Arrow function syntax required: () => expr. Java long → JS number auto-cast.' },
          },
          {
            id: 'fill', label: 'JS setValue', labelEn: 'JS setValue',
            visualState: 'fill',
            description: { tr: 'Set value via JS when normal fill() doesn\'t work on React controlled inputs. Same as arguments[0].value = ... in Selenium.', en: 'Set value via JS when normal fill() doesn\'t work on React controlled inputs. Same as arguments[0].value = ... in Selenium.' },
            code: `page.locator("#email").evaluate("""
    el => {
        el.value = 'test@example.com';
        el.dispatchEvent(new Event('input', {bubbles:true}));
        el.dispatchEvent(new Event('change', {bubbles:true}));
    }
""");`,
            tip: { tr: '⚠️ dispatchEvent required for React/Vue controlled inputs.', en: '⚠️ dispatchEvent required for React/Vue controlled inputs.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Step 8: Actions (Hover, Drag-Drop, Keyboard)', en: 'Step 8: Actions (Hover, Drag-Drop, Keyboard)' } },
      {
        type: 'code', language: 'java', label: 'Playwright Actions — hover, drag, keyboard',
        code: `// ── HOVER ───────────────────────────────────────────
// Selenium: new Actions(driver).moveToElement(el).perform()
// Playwright: locator.hover()
page.locator("#navMenu").hover();
// Sub-menu auto-waited — no WebDriverWait needed
page.locator("#subItem").click();

// ── DOUBLE CLICK ─────────────────────────────────────
page.locator("td.editable").dblclick();

// ── RIGHT CLICK (Context Menu) ──────────────────────
page.locator("[data-file='report.pdf']").click(
    new Locator.ClickOptions().setButton(MouseButton.RIGHT)
);
page.locator("#ctxMenuDelete").click();

// ── DRAG AND DROP ────────────────────────────────────
page.locator("#draggable").dragTo(page.locator("#droppable"));
// Or with offset:
page.locator("#draggable").dragTo(page.locator("#droppable"),
    new Locator.DragToOptions().setTargetPosition(200, 0)
);

// ── KEYBOARD COMBINATION ─────────────────────────────
// Selenium: actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL)
page.locator("#editor").press("Control+A");
page.locator("#editor").press("Delete");
page.locator("#editor").fill("New content");

// Shift+Click
page.keyboard.down("Shift");
page.locator("tr:nth-child(5)").click();
page.keyboard.up("Shift");`,
      },
      {
        type: 'playwright-visual',
        concept: 'pw-actions',
        color: '#8b5cf6',
        icon: '🖱️',
        title: { tr: 'Actions — Interactive Visual Guide', en: 'Actions — Interactive Visual Guide' },
        steps: [
          {
            id: 'hover', label: 'hover()', labelEn: 'hover()',
            visualState: 'hover',
            description: { tr: 'locator.hover() moves the mouse cursor over the element. Same as Selenium\'s Actions.moveToElement(). After hover, Playwright auto-waits for sub-menus — no WebDriverWait needed.', en: 'locator.hover() moves the mouse cursor over the element. Same as Selenium\'s Actions.moveToElement(). After hover, Playwright auto-waits for sub-menus — no WebDriverWait needed.' },
            code: `// Selenium:
// new Actions(driver).moveToElement(navMenu).perform();
// wait.until(ExpectedConditions.visibilityOf(subItem));

// Playwright:
page.locator("#navMenu").hover();
// sub-menu auto-waited
page.locator("#subItem").click();`,
            tip: { tr: '✅ No explicit wait needed after hover() — Playwright auto-waits for the sub-menu.', en: '✅ No explicit wait needed after hover() — Playwright auto-waits for the sub-menu.' },
          },
          {
            id: 'submenu', label: 'Sub-menu', labelEn: 'Sub-menu',
            visualState: 'submenu',
            description: { tr: 'Sub-menu is open after hover. Unlike Selenium, context doesn\'t change in Playwright — find sub-menu items with normal locators. No switchTo().', en: 'Sub-menu is open after hover. Unlike Selenium, context doesn\'t change in Playwright — find sub-menu items with normal locators. No switchTo().' },
            code: `// Sub-menu open — access with normal locator
page.locator("#productMenu li a").all().forEach(item ->
    System.out.println(item.textContent())
);
// "Laptops", "Phones", "Tablets"

page.getByText("Laptops").click();`,
            tip: { tr: '✅ locator.all() → List<Locator>. Equivalent to Selenium\'s findElements() → List<WebElement>.', en: '✅ locator.all() → List<Locator>. Equivalent to Selenium\'s findElements() → List<WebElement>.' },
          },
          {
            id: 'dblclick', label: 'dblclick()', labelEn: 'dblclick()',
            visualState: 'dblclick',
            description: { tr: 'locator.dblclick() sends a double-click. Same as Selenium\'s Actions.doubleClick(). Used for editable cells, inline editors, or file-opening.', en: 'locator.dblclick() sends a double-click. Same as Selenium\'s Actions.doubleClick(). Used for editable cells, inline editors, or file-opening.' },
            code: `// Selenium: actions.doubleClick(cell).perform()
page.locator("td.editable[data-col='price']").dblclick();

// Edit mode opened
page.locator("td.editable input").fill("299.99");
page.locator("td.editable input").press("Enter");`,
            tip: { tr: '✅ dblclick() fires a separate DOM event (dblclick) — not same as click(). Try dblclick on editable grids when click doesn\'t work.', en: '✅ dblclick() fires a separate DOM event (dblclick) — not same as click(). Try dblclick on editable grids when click doesn\'t work.' },
          },
          {
            id: 'rightclick', label: 'rightClick', labelEn: 'rightClick',
            visualState: 'rightclick',
            description: { tr: 'Right-click done with MouseButton.RIGHT. Same as Selenium\'s contextClick(). Used for application-specific context menus.', en: 'Right-click done with MouseButton.RIGHT. Same as Selenium\'s contextClick(). Used for application-specific context menus.' },
            code: `// Selenium: actions.contextClick(el).perform()
page.locator("[data-file='report.pdf']").click(
    new Locator.ClickOptions().setButton(MouseButton.RIGHT)
);

page.locator("#ctxMenu [data-action='delete']").click();`,
            tip: { tr: '⚠️ Browser\'s native right-click menu cannot be tested — only DOM custom context menus.', en: '⚠️ Browser\'s native right-click menu cannot be tested — only DOM custom context menus.' },
          },
          {
            id: 'drag', label: 'dragTo()', labelEn: 'dragTo()',
            visualState: 'drag',
            description: { tr: 'locator.dragTo(target) performs drag-and-drop. Same as Selenium\'s Actions.dragAndDrop(). Playwright is far more reliable for HTML5 drag-drop events.', en: 'locator.dragTo(target) performs drag-and-drop. Same as Selenium\'s Actions.dragAndDrop(). Playwright is far more reliable for HTML5 drag-drop events.' },
            code: `// Selenium: actions.dragAndDrop(source, target).perform()
page.locator("#draggable").dragTo(page.locator("#droppable"));

// With offset:
page.locator("#draggable").dragTo(
    page.locator("#droppable"),
    new Locator.DragToOptions().setTargetPosition(200, 0)
);`,
            tip: { tr: '✅ Playwright\'s dragTo() is much more reliable than Selenium for HTML5 drag-drop.', en: '✅ Playwright\'s dragTo() is much more reliable than Selenium for HTML5 drag-drop.' },
          },
          {
            id: 'keyboard', label: 'Keyboard', labelEn: 'Keyboard',
            visualState: 'keyboard',
            description: { tr: 'For keyboard combinations, use locator.press() or page.keyboard. Selenium required keyDown() + sendKeys() + keyUp() chain.', en: 'For keyboard combinations, use locator.press() or page.keyboard. Selenium required keyDown() + sendKeys() + keyUp() chain.' },
            code: `// Selenium: actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL)
page.locator("#editor").press("Control+A");
page.locator("#editor").press("Delete");
page.locator("#editor").fill("New content here");

// Shift+Click (multi-select):
page.keyboard.down("Shift");
page.locator("tr:nth-child(5)").click();
page.keyboard.up("Shift");`,
            tip: { tr: '✅ press() combination syntax: "Control+A", "Shift+Enter", "Alt+F4". Much cleaner than Selenium.', en: '✅ press() combination syntax: "Control+A", "Shift+Enter", "Alt+F4". Much cleaner than Selenium.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Step 9: Dialogs (Alert/Confirm/Prompt)', en: 'Step 9: Dialogs (Alert/Confirm/Prompt)' } },
      {
        type: 'playwright-visual',
        concept: 'dialog',
        color: '#ef4444',
        icon: '⚠️',
        title: { tr: 'Dialog Management — Interactive Guide', en: 'Dialog Management — Interactive Guide' },
        steps: [
          {
            id: 'register', label: 'Register Handler', labelEn: 'Register Handler',
            visualState: 'register',
            description: { tr: 'Dialog management in Playwright is event-based. In Selenium, you intervened after the dialog opened with switchTo().alert(). In Playwright, register the handler first, then trigger the dialog — like registering an event listener in Java.', en: 'Dialog management in Playwright is event-based. In Selenium, you intervened after the dialog opened with switchTo().alert(). In Playwright, register the handler first, then trigger the dialog — like registering an event listener in Java.' },
            code: `// Selenium:
// driver.findElement(By.id("triggerBtn")).click();
// wait.until(ExpectedConditions.alertIsPresent());
// Alert alert = driver.switchTo().alert();
// alert.accept();

// Playwright — event-based:
// 1. Register handler FIRST
page.onDialog(dialog -> {
    System.out.println("Dialog: " + dialog.message());
    dialog.accept(); // or dialog.dismiss()
});

// 2. Then trigger the dialog
page.locator("#triggerAlert").click();`,
            tip: { tr: '✅ Handler must be registered before the dialog opens. No need for Selenium\'s alertIsPresent() wait condition.', en: '✅ Handler must be registered before the dialog opens. No need for Selenium\'s alertIsPresent() wait condition.' },
          },
          {
            id: 'dialog-fires', label: 'Dialog Fires', labelEn: 'Dialog Fires',
            visualState: 'dialog-fires',
            description: { tr: 'The triggered dialog arrives at the event handler. dialog.type() tells the dialog type: "alert", "confirm", "prompt", "beforeunload". Like instanceof in Java: check the type, act accordingly.', en: 'The triggered dialog arrives at the event handler. dialog.type() tells the dialog type: "alert", "confirm", "prompt", "beforeunload". Like instanceof in Java: check the type, act accordingly.' },
            code: `page.onDialog(dialog -> {
    String type = dialog.type();    // "alert", "confirm", "prompt"
    String msg  = dialog.message(); // Dialog text

    System.out.println(type + ": " + msg);

    switch (type) {
        case "confirm" -> dialog.accept();
        case "prompt"  -> dialog.accept("SAVE20"); // send input
        default        -> dialog.dismiss();
    }
});`,
            tip: { tr: '✅ dialog.message() is Selenium\'s alert.getText() equivalent. dialog.type() is extra info — not available in Selenium.', en: '✅ dialog.message() is Selenium\'s alert.getText() equivalent. dialog.type() is extra info — not available in Selenium.' },
          },
          {
            id: 'handle', label: 'accept()', labelEn: 'accept()',
            visualState: 'handle',
            description: { tr: 'dialog.accept() presses OK. Works for all dialog types — same as Selenium\'s alert.accept(). For prompt(), input can be sent as accept("value").', en: 'dialog.accept() presses OK. Works for all dialog types — same as Selenium\'s alert.accept(). For prompt(), input can be sent as accept("value").' },
            code: `// Simple alert
page.onDialog(dialog -> dialog.accept());

// Confirm — accept to confirm
page.onDialog(dialog -> dialog.accept());

// Prompt — accept with input value
page.onDialog(dialog -> dialog.accept("SAVE20"));

// Then validate:
assertThat(page).hasURL("**/success");`,
            tip: { tr: '✅ After accept() driver automatically returns to page — no need for defaultContent() like Selenium.', en: '✅ After accept() driver automatically returns to page — no need for defaultContent() like Selenium.' },
          },
          {
            id: 'dismiss', label: 'dismiss()', labelEn: 'dismiss()',
            visualState: 'dismiss',
            description: { tr: 'dialog.dismiss() presses Cancel. Same as Selenium\'s alert.dismiss(). Valid for confirm() and prompt(); for alert(), same result as accept().', en: 'dialog.dismiss() presses Cancel. Same as Selenium\'s alert.dismiss(). Valid for confirm() and prompt(); for alert(), same result as accept().' },
            code: `// Click clear cart button → confirm
page.onDialog(dialog -> dialog.dismiss()); // cancel

page.locator("#clearCart").click();

// Cart should still have items
assertThat(page.locator("#cartCount")).not().hasText("0");`,
            tip: { tr: '✅ dismiss() test strategy: test "cancellation" scenarios. Critical for negative test scenarios.', en: '✅ dismiss() test strategy: test "cancellation" scenarios. Critical for negative test scenarios.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Step 10: frameLocator() — Working Inside iFrames', en: 'Step 10: frameLocator() — Working Inside iFrames' } },
      {
        type: 'playwright-visual',
        concept: 'frame-locator',
        color: '#06b6d4',
        icon: '🖼️',
        title: { tr: 'frameLocator() — Interactive Guide', en: 'frameLocator() — Interactive Guide' },
        steps: [
          {
            id: 'outer', label: 'Outer Page', labelEn: 'Outer Page',
            visualState: 'outer',
            description: { tr: 'Default context is the main page. In Selenium, switchTo().frame() is needed to access inside an iFrame. In Playwright, frameLocator() builds a chain without context switching.', en: 'Default context is the main page. In Selenium, switchTo().frame() is needed to access inside an iFrame. In Playwright, frameLocator() builds a chain without context switching.' },
            code: `// Selenium required:
// WebElement iframe = driver.findElement(By.id("paymentFrame"));
// driver.switchTo().frame(iframe);
// driver.findElement(By.id("cardNumber")).sendKeys("...");
// driver.switchTo().defaultContent(); // ← easy to forget!

// Playwright: NO context switching at all`,
            tip: { tr: '⚠️ In Playwright there is NO switchTo().frame() or defaultContent() — you don\'t need them.', en: '⚠️ In Playwright there is NO switchTo().frame() or defaultContent() — you don\'t need them.' },
          },
          {
            id: 'frame-locator', label: 'frameLocator()', labelEn: 'frameLocator()',
            visualState: 'frame-locator',
            description: { tr: 'Select the frame with page.frameLocator(), then build a normal locator chain. No switchTo(), no defaultContent() — work as if there\'s no iFrame. Like Optional.map() chaining in Java.', en: 'Select the frame with page.frameLocator(), then build a normal locator chain. No switchTo(), no defaultContent() — work as if there\'s no iFrame. Like Optional.map() chaining in Java.' },
            code: `// One line: frameLocator → locator → action
page.frameLocator("#paymentFrame")
    .locator("#cardNumber")
    .fill("4111 1111 1111 1111");

// Selenium required:
// driver.switchTo().frame("paymentFrame");    ← needed
// driver.findElement(By.id("cardNumber")).sendKeys(...);
// driver.switchTo().defaultContent();          ← forget = bug!`,
            tip: { tr: '✅ frameLocator() returns a FrameLocator. Any locator method (getByRole, getByTestId...) can be chained on it.', en: '✅ frameLocator() returns a FrameLocator. Any locator method (getByRole, getByTestId...) can be chained on it.' },
          },
          {
            id: 'inner', label: 'Inside Frame', labelEn: 'Inside Frame',
            visualState: 'inner',
            description: { tr: 'With frameLocator().locator() you can access all elements inside the frame with normal Playwright API. getByRole, getByLabel, getByTestId — all work!', en: 'With frameLocator().locator() you can access all elements inside the frame with normal Playwright API. getByRole, getByLabel, getByTestId — all work!' },
            code: `FrameLocator frame = page.frameLocator("#paymentFrame");

// All Playwright locator methods work!
frame.getByLabel("Card Number").fill("4111 1111 1111 1111");
frame.getByLabel("CVV").fill("123");
frame.getByRole(AriaRole.BUTTON, new FrameLocator.GetByRoleOptions()
    .setName("Pay")).click();

// Nested iFrame (frame inside frame):
page.frameLocator("#outer").frameLocator("#inner")
    .locator("#recaptchaBox").click();`,
            tip: { tr: '✅ For nested iFrames: page.frameLocator("#outer").frameLocator("#inner").locator(...) — separate frameLocator() chain for each level.', en: '✅ For nested iFrames: page.frameLocator("#outer").frameLocator("#inner").locator(...) — separate frameLocator() chain for each level.' },
          },
          {
            id: 'back', label: 'Clean Context', labelEn: 'Clean Context',
            visualState: 'back',
            description: { tr: 'Since you use frameLocator() chaining, no extra code is needed to return to the main page. In Selenium, forgetting defaultContent() caused bugs. In Playwright, this problem doesn\'t exist.', en: 'Since you use frameLocator() chaining, no extra code is needed to return to the main page. In Selenium, forgetting defaultContent() caused bugs. In Playwright, this problem doesn\'t exist.' },
            code: `// Frame operations done — NO extra code
page.frameLocator("#paymentFrame")
    .locator("#payBtn").click();

// Continue directly on main page — NO defaultContent()
page.locator("#orderConfirmation").waitFor(
    new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE)
);
String orderNo = page.locator("#orderNumber").textContent();`,
            tip: { tr: '✅ No need for try-finally with defaultContent() in Playwright — code is much cleaner. The common Selenium bug of "forgetting to exit the frame" is gone.', en: '✅ No need for try-finally with defaultContent() in Playwright — code is much cleaner. The common Selenium bug of "forgetting to exit the frame" is gone.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Step 11: Multi-Page & Tab Management', en: 'Step 11: Multi-Page & Tab Management' } },
      {
        type: 'playwright-visual',
        concept: 'multi-page',
        color: '#8b5cf6',
        icon: '🪟',
        title: { tr: 'Multi-Page — Interactive Guide', en: 'Multi-Page — Interactive Guide' },
        steps: [
          {
            id: 'single', label: 'Single Page', labelEn: 'Single Page',
            visualState: 'single',
            description: { tr: 'Start with single page. context.pages() returns all open pages as List<Page> — Selenium\'s getWindowHandles() returned Set<String>. In Playwright, each page is a Page object, not a String ID.', en: 'Start with single page. context.pages() returns all open pages as List<Page> — Selenium\'s getWindowHandles() returned Set<String>. In Playwright, each page is a Page object, not a String ID.' },
            code: `// All open pages in context
List<Page> pages = context.pages();
System.out.println("Open pages: " + pages.size()); // 1

// Current page
Page currentPage = pages.get(0);

// Selenium:
// String mainHandle = driver.getWindowHandle();
// Set<String> all   = driver.getWindowHandles();`,
            tip: { tr: '✅ Page object is much more powerful — unlike String handle, directly use methods like page.title(), page.url().', en: '✅ Page object is much more powerful — unlike String handle, directly use methods like page.title(), page.url().' },
          },
          {
            id: 'wait-popup', label: 'waitForPopup()', labelEn: 'waitForPopup()',
            visualState: 'wait-popup',
            description: { tr: 'Use waitForPopup() to catch popups when they open. In Selenium, you had to get all handles with getWindowHandles() and find the new one. Playwright does this in one line.', en: 'Use waitForPopup() to catch popups when they open. In Selenium, you had to get all handles with getWindowHandles() and find the new one. Playwright does this in one line.' },
            code: `// Selenium popup catching:
// String mainHandle = driver.getWindowHandle();
// driver.findElement(By.id("openPopup")).click();
// String popupHandle = driver.getWindowHandles()
//     .stream().filter(h -> !h.equals(mainHandle)).findFirst().get();
// driver.switchTo().window(popupHandle);

// Playwright:
Page popup = page.waitForPopup(() -> {
    page.locator("#openPopupBtn").click();
});
// popup is now a separate Page object`,
            tip: { tr: '✅ waitForPopup() is atomic: action and wait are combined. The Selenium "click() then handle loop" problem is gone.', en: '✅ waitForPopup() is atomic: action and wait are combined. The Selenium "click() then handle loop" problem is gone.' },
          },
          {
            id: 'new-page', label: 'context.newPage()', labelEn: 'context.newPage()',
            visualState: 'new-page',
            description: { tr: 'Open a new page programmatically. In Selenium this was done with driver.switchTo().newWindow(WindowType.TAB). In Playwright, context.newPage() is much cleaner.', en: 'Open a new page programmatically. In Selenium this was done with driver.switchTo().newWindow(WindowType.TAB). In Playwright, context.newPage() is much cleaner.' },
            code: `// Open new tab/page
Page secondPage = context.newPage();
secondPage.navigate("https://admin.example.com");

// Work on both pages
page.locator("#mainAction").click();       // page 1
secondPage.locator("#adminAction").click(); // page 2

// Page count
System.out.println(context.pages().size()); // 2`,
            tip: { tr: '✅ Each Page object is independent: its own cookies, own local storage. The Selenium window handle management nightmare is gone.', en: '✅ Each Page object is independent: its own cookies, own local storage. The Selenium window handle management nightmare is gone.' },
          },
          {
            id: 'close', label: 'page.close()', labelEn: 'page.close()',
            visualState: 'close',
            description: { tr: 'Close page and return to main. Selenium required driver.close() + switchTo().window(mainHandle). In Playwright, just popup.close() — no automatic main page switch but Page objects are independent.', en: 'Close page and return to main. Selenium required driver.close() + switchTo().window(mainHandle). In Playwright, just popup.close() — no automatic main page switch but Page objects are independent.' },
            code: `// Finish popup operations, close
popup.locator("#closeBtn").click();
popup.close();

// Continue on main page (already have main page object)
page.locator("#confirmOrder").click();

// context.close() → closes all pages
// context.close();`,
            tip: { tr: '✅ Since each page is a Page object in Playwright, switchTo() is not needed. page and popup objects can be used simultaneously.', en: '✅ Since each page is a Page object in Playwright, switchTo() is not needed. page and popup objects can be used simultaneously.' },
          },
          {
            id: 'context-pages', label: 'context.pages()', labelEn: 'context.pages()',
            visualState: 'context-pages',
            description: { tr: 'context.pages() returns the list of all open pages. Selenium\'s getWindowHandles() returned String IDs and switchTo() was needed for every switch. In Playwright, directly call page.title() etc.', en: 'context.pages() returns the list of all open pages. Selenium\'s getWindowHandles() returned String IDs and switchTo() was needed for every switch. In Playwright, directly call page.title() etc.' },
            code: `// List all open pages
List<Page> allPages = context.pages();

for (Page p : allPages) {
    System.out.println(p.title() + " — " + p.url());
}

// Find a specific page:
Page adminPage = allPages.stream()
    .filter(p -> p.url().contains("/admin"))
    .findFirst().orElseThrow();
adminPage.locator("#dashboard").click();`,
            tip: { tr: '✅ context.pages() + Stream API: Java\'s powerful functional programming works great with Playwright.', en: '✅ context.pages() + Stream API: Java\'s powerful functional programming works great with Playwright.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Step 12: BrowserContext — Isolated Parallel Tests', en: 'Step 12: BrowserContext — Isolated Parallel Tests' } },
      {
        type: 'playwright-visual',
        concept: 'browser-context',
        color: '#0ea5e9',
        icon: '🌐',
        title: { tr: 'BrowserContext — Isolated Test Environments', en: 'BrowserContext — Isolated Test Environments' },
        steps: [
          {
            id: 'single', label: 'Single Context', labelEn: 'Single Context',
            visualState: 'single',
            description: { tr: 'Playwright has a Browser → BrowserContext → Page hierarchy. In Selenium, each WebDriver instance is a single browser. In Playwright, isolated contexts can be created from a single browser.', en: 'Playwright has a Browser → BrowserContext → Page hierarchy. In Selenium, each WebDriver instance is a single browser. In Playwright, isolated contexts can be created from a single browser.' },
            code: `Playwright playwright = Playwright.create();
Browser browser = playwright.chromium().launch();

// Single context — single user session
BrowserContext context = browser.newContext();
Page page = context.newPage();

// Selenium: new WebDriver() for each test
// Playwright: new BrowserContext for each test — 10x faster!`,
            tip: { tr: '✅ Creating a BrowserContext is 10x faster than starting a new WebDriver — test suite speed increases dramatically.', en: '✅ Creating a BrowserContext is 10x faster than starting a new WebDriver — test suite speed increases dramatically.' },
          },
          {
            id: 'new-context', label: 'newContext()', labelEn: 'newContext()',
            visualState: 'new-context',
            description: { tr: 'browser.newContext() creates an isolated user session. Each context carries its own cookies, local storage and sessionStorage. Like ThreadLocal<UserSession> in Java.', en: 'browser.newContext() creates an isolated user session. Each context carries its own cookies, local storage and sessionStorage. Like ThreadLocal<UserSession> in Java.' },
            code: `// Admin session
BrowserContext adminCtx = browser.newContext(
    new Browser.NewContextOptions()
        .setStorageStatePath(Paths.get("admin-state.json"))
);
Page adminPage = adminCtx.newPage();
adminPage.navigate("https://app.com/admin");

// Customer session
BrowserContext customerCtx = browser.newContext();
Page customerPage = customerCtx.newPage();
customerPage.navigate("https://app.com/shop");`,
            tip: { tr: '✅ With storageStatePath you can save login state — no need to login at the start of every test. Huge time savings!', en: '✅ With storageStatePath you can save login state — no need to login at the start of every test. Huge time savings!' },
          },
          {
            id: 'parallel', label: 'Parallel Tests', labelEn: 'Parallel Tests',
            visualState: 'parallel',
            description: { tr: 'Tests in different contexts run in parallel — without affecting each other. Combined with JUnit5 @Execution(CONCURRENT), test duration drops dramatically. No need for Selenium Grid.', en: 'Tests in different contexts run in parallel — without affecting each other. Combined with JUnit5 @Execution(CONCURRENT), test duration drops dramatically. No need for Selenium Grid.' },
            code: `@TestInstance(Lifecycle.PER_CLASS)
@Execution(ExecutionMode.CONCURRENT)
class ParallelTest {
    static Browser browser;

    @BeforeAll
    static void setup() {
        browser = Playwright.create().chromium().launch();
    }

    @Test
    void adminTest() {
        try (BrowserContext ctx = browser.newContext()) {
            Page page = ctx.newPage();
            // Admin scenario
        }
    }

    @Test
    void customerTest() {
        try (BrowserContext ctx = browser.newContext()) {
            Page page = ctx.newPage();
            // Customer scenario — runs parallel with adminTest!
        }
    }
}`,
            tip: { tr: '✅ If each context is opened with try-with-resources, it auto-closes after test — no memory leaks.', en: '✅ If each context is opened with try-with-resources, it auto-closes after test — no memory leaks.' },
          },
          {
            id: 'isolation', label: 'Isolation', labelEn: 'Isolation',
            visualState: 'isolation',
            description: { tr: 'Each context is completely isolated: cookies, localStorage, sessionStorage are not shared. Admin\'s login cookie doesn\'t leak into customer context. Like ClassLoader isolation in Java.', en: 'Each context is completely isolated: cookies, localStorage, sessionStorage are not shared. Admin\'s login cookie doesn\'t leak into customer context. Like ClassLoader isolation in Java.' },
            code: `// Same site, different sessions:
BrowserContext adminCtx    = browser.newContext();
BrowserContext customerCtx = browser.newContext();
BrowserContext guestCtx    = browser.newContext();

Page adminPage    = adminCtx.newPage();    // admin cookie
Page customerPage = customerCtx.newPage(); // customer cookie
Page guestPage    = guestCtx.newPage();    // no cookie

// All three in different URLs at the same time — fully isolated!
adminPage.navigate("https://app.com/admin");
customerPage.navigate("https://app.com/orders");
guestPage.navigate("https://app.com/home");`,
            tip: { tr: '✅ Parallel E2E test scenario: admin add to cart → customer pay at same time → guest browse home. None affect each other.', en: '✅ Parallel E2E test scenario: admin add to cart → customer pay at same time → guest browse home. None affect each other.' },
          },
          {
            id: 'close', label: 'Close', labelEn: 'Close',
            visualState: 'close',
            description: { tr: 'context.close() closes the context and all its pages. browser.close() closes all contexts and the browser. Try-with-resources for automatic cleanup is recommended.', en: 'context.close() closes the context and all its pages. browser.close() closes all contexts and the browser. Try-with-resources for automatic cleanup is recommended.' },
            code: `// Manual close:
adminCtx.close();     // → adminPage closes too
customerCtx.close();

// Automatic (try-with-resources — recommended):
try (BrowserContext ctx = browser.newContext()) {
    Page page = ctx.newPage();
    // test operations
} // ctx.close() called automatically

// With Playwright JUnit5 extension:
// @ExtendWith(PlaywrightExtension.class)
// automatic context + cleanup for each test`,
            tip: { tr: '✅ Use playwright-junit: context lifecycle managed automatically. A clean context is guaranteed for each @Test method.', en: '✅ Use playwright-junit: context lifecycle managed automatically. A clean context is guaranteed for each @Test method.' },
          },
        ],
      },
      { type: 'heading', text: { tr: 'Step 13: Trace Viewer — Visual Test Recording', en: 'Step 13: Trace Viewer — Visual Test Recording' } },
      {
        type: 'playwright-visual',
        concept: 'trace',
        color: '#8b5cf6',
        icon: '🎬',
        title: { tr: 'Playwright Trace Viewer — Interactive Guide', en: 'Playwright Trace Viewer — Interactive Guide' },
        steps: [
          {
            id: 'record', label: 'Record Trace', labelEn: 'Record Trace',
            visualState: 'record',
            description: { tr: 'Playwright records every interaction during the test with DOM snapshots, network traffic and console logs. No such feature in Selenium. Incredibly powerful for debugging.', en: 'Playwright records every interaction during the test with DOM snapshots, network traffic and console logs. No such feature in Selenium. Incredibly powerful for debugging.' },
            code: `// Start trace
context.tracing().start(
    new Tracing.StartOptions()
        .setScreenshots(true)   // screenshot on each action
        .setSnapshots(true)     // DOM snapshot
        .setSources(true)       // source code lines
);

// Tests here...

// Save trace
context.tracing().stop(
    new Tracing.StopOptions()
        .setPath(Paths.get("target/trace.zip"))
);`,
            tip: { tr: '✅ Trace file: screenshots + DOM snapshots + network + console + source lines. Instantly see where and why the test failed.', en: '✅ Trace file: screenshots + DOM snapshots + network + console + source lines. Instantly see where and why the test failed.' },
          },
          {
            id: 'screenshot', label: 'Screenshot', labelEn: 'Screenshot',
            visualState: 'screenshot',
            description: { tr: 'Automatically take screenshot when test fails. In Selenium, you had to add this manually in @AfterEach. In Playwright, automatic with Tracing.StartOptions.setScreenshots(true).', en: 'Automatically take screenshot when test fails. In Selenium, you had to add this manually in @AfterEach. In Playwright, automatic with Tracing.StartOptions.setScreenshots(true).' },
            code: `// Explicit screenshot on failure
@AfterEach
void tearDown(TestInfo testInfo) {
    if (testInfo.getTags().contains("failed")) {
        page.screenshot(new Page.ScreenshotOptions()
            .setPath(Paths.get(
                "target/screenshots/" + testInfo.getDisplayName() + ".png"
            ))
        );
    }
    context.tracing().stop(
        new Tracing.StopOptions()
            .setPath(Paths.get("target/traces/" + testInfo.getDisplayName() + ".zip"))
    );
}`,
            tip: { tr: '✅ Use Screenshot + Trace together: screenshot answers "what?", trace answers "why?".', en: '✅ Use Screenshot + Trace together: screenshot answers "what?", trace answers "why?".' },
          },
          {
            id: 'video', label: 'Video Recording', labelEn: 'Video Recording',
            visualState: 'video',
            description: { tr: 'Record the entire test session as video. In Selenium this was only possible with 3rd party tools. In Playwright, built-in as newContext() option.', en: 'Record the entire test session as video. In Selenium this was only possible with 3rd party tools. In Playwright, built-in as newContext() option.' },
            code: `BrowserContext context = browser.newContext(
    new Browser.NewContextOptions()
        .setRecordVideoDir(Paths.get("target/videos/"))
        .setRecordVideoSize(1280, 720)
);

Page page = context.newPage();
// ...tests...

// context.close() is required to save video
context.close();
// target/videos/xxx.webm is created`,
            tip: { tr: '✅ Video debugging: inspect frame by frame exactly how the page looked, which animations ran. Gold value for test failure analysis in CI/CD.', en: '✅ Video debugging: inspect frame by frame exactly how the page looked, which animations ran. Gold value for test failure analysis in CI/CD.' },
          },
          {
            id: 'viewer', label: 'Trace Viewer', labelEn: 'Trace Viewer',
            visualState: 'viewer',
            description: { tr: 'Open the recorded trace in Playwright\'s own visual tool. For each action, see a full DOM snapshot, network requests and console logs on a timeline.', en: 'Open the recorded trace in Playwright\'s own visual tool. For each action, see a full DOM snapshot, network requests and console logs on a timeline.' },
            code: `// In terminal:
// npx playwright show-trace target/trace.zip

// With Allure integration:
byte[] traceBytes = Files.readAllBytes(Paths.get("trace.zip"));
Allure.addAttachment("Playwright Trace",
    "application/zip",
    new ByteArrayInputStream(traceBytes),
    ".zip"
);

// CI/CD artifact analysis:
// Upload trace.zip → open at trace.pw.dev (no install needed)`,
            tip: { tr: '✅ trace.pw.dev: upload trace.zip from browser, no installation needed. Can directly analyze from CI/CD artifacts.', en: '✅ trace.pw.dev: upload trace.zip from browser, no installation needed. Can directly analyze from CI/CD artifacts.' },
          },
        ],
      },
    ],
  },
}
sPlaywright.en = {
  title: '🎭 Playwright Java — Step-by-Step Guide',
  blocks: sPlaywright.tr.blocks
};

// ─── S-FILEIO: FILE HANDLING, ITERATOR, GENERICS, THREADS ──────────────────
const sFileIO = {
  tr: {
    title: '📁 File Handling, Iterator, Generics & Threads',
    blocks: [
      {
        type: 'simple-box', emoji: '📁',
        content: 'Dosya işlemleri tıpkı bir kasadan belge çıkarıp koymak gibi: önce kasayı aç, belgeyi yaz, oku, işin bitince kapat. Iterator ise bir kitaplıktaki kitapları sırayla gösteren tur rehberi — koleksiyonu manuel döngü olmadan gezer. Generics ise "her tür için çalışan kalıp" — tek kod, tüm tipler.',
      },
      { type: 'heading', text: { tr: 'File Oluşturma ve Yazma', en: 'File Creation and Writing' } },
      {
        type: 'code', language: 'java', label: 'java.nio.file.Files — modern dosya API',
        code: `import java.nio.file.*;
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // ── DOSYA OLUŞTURMA ──────────────────────────────
        Path path = Paths.get("test-data.txt");

        // Dosya yoksa oluştur
        if (!Files.exists(path)) {
            Files.createFile(path);
            System.out.println("Dosya oluşturuldu: " + path.toAbsolutePath());
        }

        // ── YAZMA ────────────────────────────────────────
        // Tüm içeriği yaz (varsa üzerine yazar)
        List<String> lines = Arrays.asList(
            "username=admin",
            "password=admin123",
            "base.url=https://example.com"
        );
        Files.write(path, lines, StandardCharsets.UTF_8);

        // Tek satır yaz (Java 11+)
        Files.writeString(path, "yeni içerik\\n", StandardOpenOption.APPEND);

        // BufferedWriter ile yaz (büyük dosyalar için verimli)
        try (BufferedWriter bw = Files.newBufferedWriter(path,
                StandardOpenOption.APPEND)) {
            bw.write("Ek satır 1");
            bw.newLine();
            bw.write("Ek satır 2");
        }
        System.out.println("Yazma tamamlandı");
    }
}`,
        expected: `Dosya oluşturuldu: ...\nYazma tamamlandı`,
      },
      {
        type: 'editor', lang: 'java', label: 'File yazma pratiği',
        defaultCode: `import java.nio.file.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Path path = Paths.get("testfile.txt");

        // Dosyaya 3 satır yaz
        List<String> lines = Arrays.asList(
            "Java öğreniyorum",
            "Selenium kullanıyorum",
            "QA mühendisiyim"
        );
        Files.write(path, lines);
        System.out.println("Yazıldı!");

        // Geri oku ve yazdır
        List<String> readBack = Files.readAllLines(path);
        for (String line : readBack) {
            System.out.println(">> " + line);
        }
    }
}`,
        height: '230px',
      },
      { type: 'heading', text: { tr: 'File Okuma', en: 'File Reading' } },
      {
        type: 'code', language: 'java', label: 'Files.readAllLines, BufferedReader',
        code: `import java.nio.file.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("config.properties");

        // ── TÜM SATIRLAR (küçük dosyalar için) ───────────
        List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
        for (String line : lines) {
            System.out.println(line);
        }

        // ── TAM İÇERİK (Java 11+) ────────────────────────
        String content = Files.readString(path);
        System.out.println("İçerik:\\n" + content);

        // ── BÜYÜK DOSYALAR İÇİN — BufferedReader ─────────
        try (BufferedReader br = Files.newBufferedReader(path)) {
            String line;
            int lineNum = 1;
            while ((line = br.readLine()) != null) {
                System.out.printf("%d: %s%n", lineNum++, line);
            }
        }

        // ── PROPERTIES DOSYASI OKUMA ──────────────────────
        // (QA'da config.properties okumak için çok kullanılır)
        Properties props = new Properties();
        try (InputStream is = new FileInputStream("config.properties")) {
            props.load(is);
        }
        String baseUrl = props.getProperty("base.url");
        System.out.println("Base URL: " + baseUrl);
    }
}`,
      },
      { type: 'heading', text: { tr: 'File Kontrol, Silme ve Taşıma', en: 'File Check, Delete, Move' } },
      {
        type: 'code', language: 'java', label: 'Files utility metodları',
        code: `import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Path file = Paths.get("data.txt");
        Path dir  = Paths.get("reports");

        // ── KONTROL ──────────────────────────────────────
        System.out.println(Files.exists(file));          // var mı?
        System.out.println(Files.isDirectory(dir));      // klasör mü?
        System.out.println(Files.isReadable(file));      // okunabilir mi?
        System.out.println(Files.size(file));            // byte cinsinden boyut

        // ── SİLME ────────────────────────────────────────
        Files.deleteIfExists(file);  // yoksa hata vermez
        // Files.delete(file);       // yoksa NoSuchFileException

        // ── KOPYALAMA ────────────────────────────────────
        Files.copy(file, Paths.get("backup.txt"),
            StandardCopyOption.REPLACE_EXISTING);

        // ── TAŞIMA / YENİDEN ADLANDIRMA ──────────────────
        Files.move(file, Paths.get("new_name.txt"),
            StandardCopyOption.REPLACE_EXISTING);

        // ── KLASÖRLERİ YÖNETİM ───────────────────────────
        Files.createDirectories(dir);       // iç içe klasör oluştur
        Files.createTempFile("test", ".log"); // geçici dosya

        System.out.println("İşlem tamamlandı");
    }
}`,
      },
      { type: 'heading', text: { tr: 'Iterator — Koleksiyon Gezici', en: 'Iterator' } },
      {
        type: 'code', language: 'java', label: 'Iterator ile List ve Map gezme',
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // ── LIST ITERATOR ────────────────────────────────
        List<String> browsers = new ArrayList<>(
            Arrays.asList("Chrome", "Firefox", "Safari", "Edge")
        );

        Iterator<String> it = browsers.iterator();
        while (it.hasNext()) {
            String browser = it.next();
            if (browser.equals("Safari")) {
                it.remove(); // ConcurrentModificationException olmadan sil!
                System.out.println("Safari kaldırıldı");
            } else {
                System.out.println("Tarayıcı: " + browser);
            }
        }

        // ── MAP ITERATOR (entrySet) ──────────────────────
        Map<String, Integer> scores = new LinkedHashMap<>();
        scores.put("Test A", 95);
        scores.put("Test B", 87);
        scores.put("Test C", 92);

        Iterator<Map.Entry<String, Integer>> mapIt = scores.entrySet().iterator();
        while (mapIt.hasNext()) {
            Map.Entry<String, Integer> entry = mapIt.next();
            System.out.printf("%s → %d%n", entry.getKey(), entry.getValue());
            if (entry.getValue() < 90) {
                mapIt.remove(); // Test B kaldırılır
            }
        }
        System.out.println("Kalan: " + scores);

        // ── LİSTİTERATOR — geri ileri gezme ─────────────
        ListIterator<String> listIt = browsers.listIterator();
        while (listIt.hasNext()) {
            String b = listIt.next();
            listIt.set(b.toUpperCase()); // Yerinde değiştir
        }
        System.out.println("Büyük harf: " + browsers);
    }
}`,
        expected: `Tarayıcı: Chrome\nTarayıcı: Firefox\nSafari kaldırıldı\nTarayıcı: Edge\nTest A → 95\nTest B → 87\nTest C → 92\nKalan: {Test A=95, Test C=92}\nBüyük harf: [CHROME, FIREFOX, EDGE]`,
      },
      {
        type: 'editor', lang: 'java', label: 'Iterator pratiği',
        defaultCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(
            Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        );

        // Iterator ile çift sayıları listeden kaldır
        Iterator<Integer> it = numbers.iterator();
        while (it.hasNext()) {
            int n = it.next();
            if (n % 2 == 0) {
                it.remove();
            }
        }
        System.out.println("Tek sayılar: " + numbers);
    }
}`,
        height: '200px',
      },
      { type: 'heading', text: { tr: 'Wrapper Classes — Primitive Tip Sarmalayıcıları', en: 'Wrapper Classes' } },
      {
        type: 'code', language: 'java', label: 'Integer, Double, Boolean, Character',
        code: `public class Main {
    public static void main(String[] args) {
        // ── AUTOBOXING / UNBOXING ──────────────────────
        int primitive = 42;
        Integer wrapped = primitive;     // autoboxing (otomatik)
        int back = wrapped;              // unboxing (otomatik)

        // ── INTEGER METODLARI ─────────────────────────
        System.out.println(Integer.MAX_VALUE);        // 2147483647
        System.out.println(Integer.MIN_VALUE);        // -2147483648
        System.out.println(Integer.parseInt("123"));  // String → int
        System.out.println(Integer.toBinaryString(10)); // "1010"
        System.out.println(Integer.toHexString(255)); // "ff"
        System.out.println(Integer.compare(5, 10));   // -1 (5 < 10)

        // ── DOUBLE ────────────────────────────────────
        System.out.println(Double.parseDouble("3.14")); // 3.14
        System.out.println(Double.isNaN(0.0 / 0.0));    // true
        System.out.println(Double.isInfinite(1.0 / 0)); // true
        System.out.println(Double.MAX_VALUE);

        // ── BOOLEAN ───────────────────────────────────
        System.out.println(Boolean.parseBoolean("true"));  // true
        System.out.println(Boolean.parseBoolean("TRUE"));  // true
        System.out.println(Boolean.parseBoolean("1"));     // false! (sadece "true")

        // ── CHARACTER ─────────────────────────────────
        System.out.println(Character.isLetter('A'));    // true
        System.out.println(Character.isDigit('5'));     // true
        System.out.println(Character.isWhitespace(' ')); // true
        System.out.println(Character.toUpperCase('a')); // A
        System.out.println(Character.toLowerCase('Z')); // z
    }
}`,
        expected: `2147483647\n-2147483648\n123\n1010\nff\n-1\n3.14\ntrue\ntrue\n9.223372036854776E18\ntrue\ntrue\nfalse\ntrue\ntrue\ntrue\nA\nz`,
      },
      { type: 'heading', text: { tr: 'Generics — Tip-Güvenli Genel Programlama', en: 'Generics' } },
      {
        type: 'code', language: 'java', label: 'Generic sınıf ve metot — QA örneği ile',
        code: `import java.util.*;

// Generic sınıf: T herhangi bir tip olabilir
class ApiResponse<T> {
    private int statusCode;
    private T body;
    private String message;

    public ApiResponse(int statusCode, T body, String message) {
        this.statusCode = statusCode;
        this.body = body;
        this.message = message;
    }

    public int getStatusCode() { return statusCode; }
    public T getBody() { return body; }
    public String getMessage() { return message; }
    public boolean isSuccess() { return statusCode >= 200 && statusCode < 300; }
}

public class Main {

    // Generic metot
    static <T> void printList(List<T> list) {
        for (T item : list) System.out.print(item + " ");
        System.out.println();
    }

    // Bounded generic (sadece Number ve alt tipleri kabul eder)
    static <T extends Number> double sum(List<T> numbers) {
        return numbers.stream().mapToDouble(Number::doubleValue).sum();
    }

    public static void main(String[] args) {
        // String body ile API response
        ApiResponse<String> strResp = new ApiResponse<>(200, "Login successful", "OK");
        System.out.println(strResp.getStatusCode() + ": " + strResp.getBody());
        System.out.println("Başarılı: " + strResp.isSuccess());

        // Integer body ile
        ApiResponse<Integer> intResp = new ApiResponse<>(201, 42, "Created");
        System.out.println("ID: " + intResp.getBody());

        // Generic metot
        printList(Arrays.asList("Selenium", "JUnit5", "TestNG", "Cucumber"));
        printList(Arrays.asList(1, 2, 3, 4, 5));

        // Bounded generic
        System.out.println("Toplam: " + sum(Arrays.asList(1.5, 2.5, 3.0))); // 7.0
    }
}`,
        expected: `200: Login successful\nBaşarılı: true\nID: 42\nSelenium JUnit5 TestNG Cucumber \n1 2 3 4 5 \nToplam: 7.0`,
      },
      {
        type: 'editor', lang: 'java', label: 'Generics pratiği',
        defaultCode: `import java.util.*;

// Generic Stack (Yığın) sınıfı
class Stack<T> {
    private List<T> items = new ArrayList<>();

    public void push(T item) { items.add(item); }
    public T pop() {
        if (items.isEmpty()) throw new RuntimeException("Stack boş!");
        return items.remove(items.size() - 1);
    }
    public T peek() { return items.get(items.size() - 1); }
    public int size() { return items.size(); }
    public boolean isEmpty() { return items.isEmpty(); }
}

public class Main {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<>();
        stack.push("Selenium");
        stack.push("JUnit5");
        stack.push("Cucumber");

        System.out.println("Boyut: " + stack.size());
        System.out.println("Üstteki: " + stack.peek());
        System.out.println("Çıkarılan: " + stack.pop());
        System.out.println("Yeni üst: " + stack.peek());
    }
}`,
        height: '270px',
      },
      { type: 'heading', text: { tr: 'Threads — Çok İş Parçacıklı Programlama', en: 'Threads' } },
      {
        type: 'code', language: 'java', label: 'Thread, Runnable ve ExecutorService',
        code: `import java.util.concurrent.*;

public class Main {

    // ── 1. Thread sınıfını extend et ─────────────────
    static class WorkerThread extends Thread {
        private String name;
        WorkerThread(String name) { this.name = name; }

        @Override
        public void run() {
            System.out.println(name + " çalışıyor: " + Thread.currentThread().getName());
        }
    }

    // ── 2. Runnable interface implement et ────────────
    static class PrintTask implements Runnable {
        private String msg;
        PrintTask(String msg) { this.msg = msg; }

        @Override
        public void run() {
            System.out.println("Görev: " + msg);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        // Thread sınıfından
        WorkerThread t1 = new WorkerThread("Thread-1");
        WorkerThread t2 = new WorkerThread("Thread-2");
        t1.start();
        t2.start();
        t1.join(); // t1 bitene kadar bekle
        t2.join();

        // Lambda ile Runnable
        Thread t3 = new Thread(() -> System.out.println("Lambda thread"));
        t3.start();
        t3.join();

        // ExecutorService — thread pool (QA'da parallel test için)
        ExecutorService pool = Executors.newFixedThreadPool(3);
        for (int i = 1; i <= 5; i++) {
            final int taskNum = i;
            pool.submit(() -> System.out.println("Test " + taskNum + " çalışıyor"));
        }
        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);
        System.out.println("Tüm görevler tamamlandı");
    }
}`,
      },
      {
        type: 'editor', lang: 'java', label: 'Thread pratiği',
        defaultCode: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        // 3 thread oluştur, her biri 1-10 arası sayıları yazdırsın
        ExecutorService pool = Executors.newFixedThreadPool(3);

        for (int t = 1; t <= 3; t++) {
            final int threadId = t;
            pool.submit(() -> {
                for (int i = 1; i <= 5; i++) {
                    System.out.printf("Thread-%d: %d%n", threadId, i);
                }
            });
        }

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("Bitti!");
    }
}`,
        height: '220px',
      },
      { type: 'heading', text: { tr: 'RegEx — Düzenli İfadeler', en: 'RegEx — Regular Expressions' } },
      {
        type: 'code', language: 'java', label: 'Pattern ve Matcher — QA ile doğrulama',
        code: `import java.util.regex.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // ── TEMEL DESEN EŞLEŞMESI ─────────────────────
        String email = "test@example.com";
        String emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$";
        System.out.println(email.matches(emailPattern)); // true

        // ── PATTERN ve MATCHER ────────────────────────
        Pattern p = Pattern.compile("\\\\d{3}-\\\\d{3}-\\\\d{4}"); // Telefon: 555-123-4567
        Matcher m = p.matcher("Beni 555-123-4567 ara veya 666-777-8888");

        while (m.find()) {
            System.out.println("Bulundu: " + m.group() + " (pozisyon " + m.start() + ")");
        }

        // ── GRUPLAMA ─────────────────────────────────
        Pattern dateP = Pattern.compile("(\\\\d{4})-(\\\\d{2})-(\\\\d{2})");
        Matcher dateM = dateP.matcher("Tarih: 2024-06-15");
        if (dateM.find()) {
            System.out.println("Yıl: " + dateM.group(1));
            System.out.println("Ay: " + dateM.group(2));
            System.out.println("Gün: " + dateM.group(3));
        }

        // ── REPLACE ───────────────────────────────────
        String text = "Java Java Java";
        String replaced = text.replaceAll("Java", "Python");
        System.out.println(replaced); // Python Python Python

        // ── SPLIT ────────────────────────────────────
        String csv = "admin,test123,ROLE_ADMIN";
        String[] parts = csv.split(",");
        for (String part : parts) System.out.println(part);

        // QA kullanım: API response doğrulama
        String apiDate = "2024-01-15T10:30:00Z";
        System.out.println(apiDate.matches("\\\\d{4}-\\\\d{2}-\\\\d{2}T\\\\d{2}:\\\\d{2}:\\\\d{2}Z"));
    }
}`,
      },
      {
        type: 'editor', lang: 'java', label: 'RegEx pratiği',
        defaultCode: `import java.util.regex.*;

public class Main {
    public static void main(String[] args) {
        // Email, telefon ve URL doğrulama
        String[] inputs = {
            "test@example.com",
            "gecersiz-email",
            "555-123-4567",
            "1234",
            "https://www.google.com",
            "not-a-url"
        };

        String emailRegex = "^[\\w._%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$";
        String phoneRegex = "\\d{3}-\\d{3}-\\d{4}";
        String urlRegex = "https?://[\\w.-]+\\.[a-zA-Z]{2,}.*";

        for (String input : inputs) {
            String type = input.matches(emailRegex) ? "EMAIL" :
                          input.matches(phoneRegex) ? "PHONE" :
                          input.matches(urlRegex)   ? "URL" : "UNKNOWN";
            System.out.println(input + " → " + type);
        }
    }
}`,
        height: '260px',
      },
      {
        type: 'quiz',
        question: { tr: 'Java\'da Iterator kullanmanın for-each döngüsüne göre önemli avantajı nedir?', en: 'Key advantage of Iterator over for-each loop?' },
        options: [
          { id: 'a', text: 'Iterator daha hızlıdır' },
          { id: 'b', text: 'Iterator, döngü sırasında güvenli eleman silmeye izin verir (it.remove())' },
          { id: 'c', text: 'Iterator sadece Map için kullanılır' },
          { id: 'd', text: 'Iterator paralel çalışmayı destekler' },
        ],
        correct: 'b',
        explanation: { tr: 'for-each döngüsünde koleksiyon üzerinde değişiklik (silme/ekleme) yapmak ConcurrentModificationException fırlatır. Iterator\'ün it.remove() metodu ise döngü sırasında güvenli silmeye olanak tanır. Java Collections Framework\'te bu pattern çok sık kullanılır: Selenium testlerinde stale element listesini temizlemek, null element kaldırmak gibi.', en: 'Modifying a collection during a for-each loop (add/remove) throws ConcurrentModificationException. Iterator\'s it.remove() enables safe removal during iteration. This pattern is common in Java: cleaning stale element lists, removing nulls, filtering during traversal.' },
      
        retryQuestion: {
      "question": {
            "tr": "Java'da bir liste üzerinde döngü kurarken ConcurrentModificationException hatası almamak için koleksiyonu değiştirmenin en güvenli yolu nedir?",
            "en": "What is the safest way to modify a collection while iterating in Java to avoid ConcurrentModificationException?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "for-each döngüsü kullanıp listeyi doğrudan temizlemek"
            },
            {
                  "id": "b",
                  "text": "Iterator.remove() metodunu kullanmak"
            },
            {
                  "id": "c",
                  "text": "Listeyi while döngüsü ile index kullanarak gezmek"
            },
            {
                  "id": "d",
                  "text": "Döngüyü paralel (parallelStream) olarak çalıştırmak"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "For-each döngüsü sırasında doğrudan listeyi değiştirmek (add/remove) çalışma zamanı hatalarına yol açar. Iterator arayüzü, listenin yapısını bozmadan elemanları güvenli bir şekilde kaldırmak için özel olarak tasarlanmıştır.",
            "en": "Modifying a list (add/remove) directly during a for-each loop leads to runtime errors. The Iterator interface is specifically designed to safely remove elements without disrupting the collection's structure."
      }
}
},
    ],
  },
  en: {
    title: '📁 File Handling, Iterator, Generics & Threads',
    blocks: [
      {
        type: 'simple-box', emoji: '📁',
        content: 'File operations are like putting documents in and out of a safe: open the safe (Files.createFile), write the document (Files.write), read it (Files.readAllLines), close when done. Iterator is like a tour guide through a library — visits each item in a collection without a manual loop. Generics is "one template, all types."',
      },
      { type: 'heading', text: { en: 'File Write & Read' } },
      {
        type: 'code', language: 'java', label: 'Files API — write, read, check, delete',
        code: `import java.nio.file.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Path path = Paths.get("test-data.txt");

        // Write
        Files.write(path, Arrays.asList("line1", "line2", "line3"));
        Files.writeString(path, "\\nextra", StandardOpenOption.APPEND); // Java 11+

        // Read
        List<String> lines = Files.readAllLines(path);
        lines.forEach(System.out::println);
        String all = Files.readString(path);     // Java 11+

        // Check & Delete
        System.out.println(Files.exists(path));
        System.out.println(Files.size(path));
        Files.deleteIfExists(path);
        System.out.println(Files.exists(path));  // false

        // Properties (common in QA config reading)
        Properties props = new Properties();
        props.load(new java.io.FileInputStream("config.properties"));
        String baseUrl = props.getProperty("base.url");
    }
}`,
      },
      { type: 'heading', text: { en: 'Iterator' } },
      {
        type: 'code', language: 'java', label: 'Iterator — safe removal during iteration',
        code: `List<String> list = new ArrayList<>(Arrays.asList("a","b","c","d"));
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.equals("b")) it.remove(); // Safe! No ConcurrentModificationException
}
System.out.println(list); // [a, c, d]

// Map iteration
Map<String, Integer> map = new HashMap<>();
map.put("A", 1); map.put("B", 2); map.put("C", 3);
Iterator<Map.Entry<String, Integer>> mapIt = map.entrySet().iterator();
while (mapIt.hasNext()) {
    Map.Entry<String, Integer> e = mapIt.next();
    if (e.getValue() < 2) mapIt.remove();
}
System.out.println(map); // {B=2, C=3}`,
      },
      { type: 'heading', text: { en: 'Generics & Threads' } },
      {
        type: 'code', language: 'java', label: 'Generics and basic Thread usage',
        code: `// Generics — type-safe container
class ApiResponse<T> {
    private final int status;
    private final T body;
    ApiResponse(int status, T body) { this.status = status; this.body = body; }
    public T getBody() { return body; }
    public boolean isSuccess() { return status >= 200 && status < 300; }
}

// Thread — parallel task execution
ExecutorService pool = Executors.newFixedThreadPool(4);
for (int i = 1; i <= 4; i++) {
    final int taskId = i;
    pool.submit(() -> System.out.println("Task " + taskId + " running"));
}
pool.shutdown();
pool.awaitTermination(10, TimeUnit.SECONDS);

// RegEx
Pattern p = Pattern.compile("\\\\d{4}-\\\\d{2}-\\\\d{2}");
Matcher m = p.matcher("Date: 2024-06-15");
if (m.find()) System.out.println("Found date: " + m.group()); // 2024-06-15`,
      },
      {
        type: 'editor', lang: 'java', label: 'File & Iterator practice',
        defaultCode: `import java.nio.file.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Write test data
        Path p = Paths.get("browsers.txt");
        Files.write(p, Arrays.asList("Chrome", "Firefox", "Edge", "Safari"));

        // Read and filter with Iterator
        List<String> browsers = new ArrayList<>(Files.readAllLines(p));
        Iterator<String> it = browsers.iterator();
        while (it.hasNext()) {
            String b = it.next();
            if (!b.equals("Chrome") && !b.equals("Firefox")) {
                it.remove(); // remove others
            }
        }
        System.out.println("Supported: " + browsers);
        Files.deleteIfExists(p);
    }
}`,
        height: '220px',
      },
      {
        type: 'quiz',
        question: { en: 'Why use Iterator instead of for-each when modifying a collection?' },
        options: [
          { id: 'a', text: 'Iterator is faster' },
          { id: 'b', text: 'it.remove() allows safe removal without ConcurrentModificationException' },
          { id: 'c', text: 'Iterator only works with Maps' },
          { id: 'd', text: 'Iterator supports parallel execution' },
        ],
        correct: 'b',
        explanation: { en: 'Removing elements inside a for-each loop throws ConcurrentModificationException. Iterator\'s it.remove() is the safe, designed way to delete during traversal. This is a frequent pattern in QA: cleaning null WebElements, removing processed items, filtering results in place.' },
      
        retryQuestion: {
      "question": {
            "en": "If you need to filter a list of elements while iterating, why is an Iterator preferred over an enhanced for-loop?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Iterator offers better memory management"
            },
            {
                  "id": "b",
                  "text": "Iterator's it.remove() avoids throwing a ConcurrentModificationException"
            },
            {
                  "id": "c",
                  "text": "Iterator supports more complex loop structures"
            },
            {
                  "id": "d",
                  "text": "For-each loops are deprecated in newer Java versions"
            }
      ],
      "correct": "b",
      "explanation": {
            "en": "An enhanced for-loop provides read-only access to the collection and throws an exception if you attempt structural modifications. Iterator's remove() method handles the pointer updates correctly, ensuring the loop remains stable during modification."
      }
}
},
    ],
  },
}

const sInteractivePractice = {
  tr: {
    title: '🧠 Adım Adım Soru Çözücü',
    blocks: [
      {
        type: 'interactive-solver'
      }
    ]
  },
  en: {
    title: '🧠 Step-by-Step Solver',
    blocks: [
      {
        type: 'interactive-solver'
      }
    ]
  }
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
const javaPlaygroundMainMethod = {
  type: 'code-playground',
    relatedTopicId: 'java-syntax-main-01',
  id: 'java-syntax-main-01',
  xpReward: 15,
  label: { tr: '☕ Egzersiz 1 — JVM\'nin giriş noktası: main method', en: '☕ Exercise 1 — JVM entry point: main method' },
  task: {
    tr: '1️⃣  "▶ Çalıştır" butonuna bas → kodun terminalde ne yazdırdığını gör.\n2️⃣  "🐛 Bozuk Testi Düzelt" butonuna geç → kasıtlı bozulmuş bir versiyon açılır; eksik karakteri bulup ekle.\n3️⃣  Takıldıysan "💡 İpucu" ile adım adım yönlendir.\n\n💡 Hedef: Java\'da her programın public static void main(String[] args) ile başlaması gerektiğini ve her satırın noktalı virgülle (;) bitmesi gerektiğini hisset.',
    en: '1️⃣  Press "▶ Run" → see what the code prints in the terminal.\n2️⃣  Switch to "🐛 Fix the Failing Test" → a deliberately broken version opens; find and add the missing character.\n3️⃣  If stuck, use "💡 Hint" for step-by-step guidance.\n\n💡 Goal: Feel why every Java program must start with public static void main(String[] args) and why every statement must end with a semicolon (;).',
  },
  language: 'java',
  code: `public class Main {
    public static void main(String[] args) {
        int passed = 3;
        int failed = 1;

        System.out.println("Passed: " + passed);
        System.out.println("Failed: " + failed);
    }
}`,
  expected: 'Passed: 3\nFailed: 1',
  explanation: {
    tr: '✅ Çalıştı! JVM önce public class Main\'i bulur, sonra içindeki public static void main(String[] args) metodunu çağırır. static olması kritik — JVM henüz hiç Main nesnesi oluşturmadan bu metodu çağırabilir. Her System.out.println satırı sırayla çalışır ve konsola bir satır yazar.',
    en: '✅ It ran! The JVM first finds public class Main, then calls the public static void main(String[] args) method inside it. static is critical — the JVM can call this method without creating any Main object first. Each System.out.println line runs in order and writes one line to the console.',
  },
  hints: [
    { tr: '🔍 İpucu 1 — Neye bak: Her değişken tanımı (int x = 5), her method çağrısı (println(...)) bir statement\'tır. Java\'da her statement noktalı virgülle (;) biter.', en: '🔍 Hint 1 — What to look for: Every variable declaration (int x = 5) and every method call (println(...)) is a statement. In Java every statement ends with a semicolon (;).' },
    { tr: '🔍 İpucu 2 — Hangi satır sorunlu: int failed = 1 satırının sonuna bak. Diğer satırlarla farkı ne?', en: '🔍 Hint 2 — Which line is the problem: Look at the end of the int failed = 1 line. What is different about it compared to the others?' },
    { tr: '✏️ İpucu 3 — Çözüm: int failed = 1 → int failed = 1; yap. Tek karakter fark Java compiler için kritik!', en: '✏️ Hint 3 — Solution: Change int failed = 1 → int failed = 1; One character makes the difference for the Java compiler!' },
  ],
  buggyCode: `public class Main {
    public static void main(String[] args) {
        int passed = 3;
        int failed = 1

        System.out.println("Passed: " + passed);
        System.out.println("Failed: " + failed);
    }
}`,
  fixedCode: `public class Main {
    public static void main(String[] args) {
        int passed = 3;
        int failed = 1;

        System.out.println("Passed: " + passed);
        System.out.println("Failed: " + failed);
    }
}`,
}

const javaPlaygroundJUnitAssertion = {
  type: 'code-playground',
    relatedTopicId: 'java-junit-assertion-01',
  id: 'java-junit-assertion-01',
  xpReward: 20,
  label: { tr: '🧪 Egzersiz 2 — JUnit5 ile test yaz ve geçir', en: '🧪 Exercise 2 — Write and pass a JUnit5 test' },
  task: {
    tr: '1️⃣  "▶ Çalıştır" butonuna bas → testin geçtiğini gör (TEST PASSED).\n2️⃣  "🐛 Bozuk Testi Düzelt" butonuna geç → assertEquals\'in ilk parametresi yanlış ayarlanmış; gerçek değerle eşleştir.\n3️⃣  Java\'da assertEquals(expected, actual) sırası Python\'dan farklı — ilk parametre beklenen değer.\n\n💡 Hedef: System.out.println ile "görsel kontrol" yerine assertEquals ile "otomatik karar" arasındaki farkı anla. CI/CD pipeline\'ı bir println\'e bakıp testi fail yapmaz; sadece assertion\'a bakar.',
    en: '1️⃣  Press "▶ Run" → see the test pass (TEST PASSED).\n2️⃣  Switch to "🐛 Fix the Failing Test" → the first parameter of assertEquals is set incorrectly; match it to the real value.\n3️⃣  In Java, assertEquals(expected, actual) order differs from Python — first parameter is the expected value.\n\n💡 Goal: Understand the difference between "visual check" with System.out.println and "automated decision" with assertEquals. The CI/CD pipeline does not look at a println to fail a test; it only looks at assertions.',
  },
  language: 'java',
  code: `import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class CartTest {
    @Test
    void totalShouldIncludeTax() {
        int total = 120;
        assertEquals(120, total, "Total should include tax");
    }
}`,
  expected: 'TEST PASSED: totalShouldIncludeTax',
  explanation: {
    tr: '✅ Test geçti! assertEquals(120, total) → 120 == 120 → PASS. Bu method bozulursa JUnit "expected: <120> but was: <100>" gibi açıklayıcı bir hata mesajı üretir; seni tam hatanın olduğu yere götürür. Java\'da bu, Python\'daki assert total == 120 satırının karşılığıdır.',
    en: '✅ Test passed! assertEquals(120, total) → 120 == 120 → PASS. If this method breaks, JUnit generates a descriptive message like "expected: <120> but was: <100>"; it takes you exactly where the bug is. In Java, this is the equivalent of the Python line assert total == 120.',
  },
  hints: [
    { tr: '🔍 İpucu 1 — Sıra önemli: assertEquals(expected, actual) → ilk parametre BEKLENEN değer, ikinci gerçek/hesaplanan değer. Karıştırmak hata mesajını yanıltıcı yapar.', en: '🔍 Hint 1 — Order matters: assertEquals(expected, actual) → first parameter is EXPECTED value, second is real/calculated value. Mixing them makes error messages misleading.' },
    { tr: '🔍 İpucu 2 — Bozuk versiyonda: assertEquals(100, total) yazıyor ama total değişkeni 120. Beklenen değer ne olmalı?', en: '🔍 Hint 2 — In the broken version: assertEquals(100, total) is written but total variable is 120. What should the expected value be?' },
    { tr: '✏️ İpucu 3 — Çözüm: 100 yerine 120 yaz. assertEquals(120, total) → beklenen ile gerçek eşleşir → TEST PASSED.', en: '✏️ Hint 3 — Solution: Replace 100 with 120. assertEquals(120, total) → expected matches actual → TEST PASSED.' },
  ],
  buggyCode: `import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class CartTest {
    @Test
    void totalShouldIncludeTax() {
        int total = 120;
        assertEquals(100, total, "Total should include tax");
    }
}`,
  fixedCode: `import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class CartTest {
    @Test
    void totalShouldIncludeTax() {
        int total = 120;
        assertEquals(120, total, "Total should include tax");
    }
}`,
}

const javaGoodVsBadPrintAssert = {
  type: 'good-vs-bad',
  title: { tr: 'Console kontrolü vs gerçek assertion', en: 'Console check vs real assertion' },
  bad: {
    code: `String actualUrl = driver.getCurrentUrl();
System.out.println(actualUrl);`,
    explanation: {
      tr: 'System.out.println sadece ekrana yazar. CI/CD pipeline bu çıktıya bakıp testi fail yapmaz; insan gözüne bağımlı kalırsın.',
      en: 'System.out.println only writes to the console. The CI/CD pipeline will not fail the test from that output; you stay dependent on human inspection.',
    },
  },
  good: {
    code: `String actualUrl = driver.getCurrentUrl();
assertTrue(actualUrl.contains("/dashboard"));`,
    explanation: {
      tr: 'assertTrue koşul bozulduğunda testi otomatik FAILED yapar. Sonuç terminalde, raporda ve pipeline kararında görünür olur.',
      en: 'assertTrue automatically marks the test FAILED when the condition breaks. The result becomes visible in the terminal, report, and pipeline decision.',
    },
  },
}

const javaGoodVsBadSleepWait = {
  type: 'good-vs-bad',
  title: { tr: 'Thread.sleep vs WebDriverWait', en: 'Thread.sleep vs WebDriverWait' },
  bad: {
    code: `driver.findElement(By.id("submit")).click();
Thread.sleep(5000);
String message = driver.findElement(By.id("result")).getText();`,
    explanation: {
      tr: 'Thread.sleep her zaman sabit bekler. Hızlı ortamda zamanı boşa harcar, yavaş ortamda yine de yetmeyebilir.',
      en: 'Thread.sleep always waits a fixed amount. It wastes time in fast environments and can still be insufficient in slow ones.',
    },
  },
  good: {
    code: `driver.findElement(By.id("submit")).click();
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
String message = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("result"))
).getText();`,
    explanation: {
      tr: 'WebDriverWait gerçek hazır olma sinyalini bekler. Element görünür olduğu anda devam eder ve flaky test riskini azaltır.',
      en: 'WebDriverWait waits for the real readiness signal. It continues as soon as the element is visible and reduces flaky test risk.',
    },
  },
}

const javaStepAnimationObjectLifecycle = {
  type: 'step-animation',
  title: { tr: 'Object oluşturma akışı', en: 'Object creation flow' },
  steps: [
    {
      id: 1,
      icon: '1',
      label: { tr: 'Class okunur', en: 'Class is read' },
      detail: {
        tr: 'Java önce TestUser class kalıbını bilir: field, constructor ve methodlar burada tanımlıdır.',
        en: 'Java first knows the TestUser class blueprint: fields, constructor, and methods are defined there.',
      },
    },
    {
      id: 2,
      icon: '2',
      label: { tr: 'new çalışır', en: 'new runs' },
      detail: {
        tr: 'new TestUser(...) heap üzerinde yeni object alanı ayırır. Reference değişkeni bu object adresini tutar.',
        en: 'new TestUser(...) allocates a new object on the heap. The reference variable stores that object address.',
      },
    },
    {
      id: 3,
      icon: '3',
      label: { tr: 'Constructor çağrılır', en: 'Constructor is called' },
      detail: {
        tr: 'Constructor parametreleri alır ve object field değerlerini ilk güvenli hale getirir.',
        en: 'The constructor receives parameters and initializes the object fields into a safe first state.',
      },
    },
    {
      id: 4,
      icon: '4',
      label: { tr: 'Method kullanılır', en: 'Methods are used' },
      detail: {
        tr: 'Test kodu artık user.getEmail() veya page.login() gibi davranışları çağırabilir.',
        en: 'The test code can now call behavior such as user.getEmail() or page.login().',
      },
    },
  ],
}

const javaStepAnimationJUnitLifecycle = {
  type: 'step-animation',
  title: { tr: 'JUnit5 test yaşam döngüsü', en: 'JUnit5 test lifecycle' },
  steps: [
    {
      id: 1,
      icon: '1',
      label: { tr: '@BeforeAll', en: '@BeforeAll' },
      detail: {
        tr: 'Test sınıfı için bir kez çalışır. Driver, database veya pahalı setup burada kurulabilir.',
        en: 'Runs once for the test class. Driver, database, or expensive setup can be initialized here.',
      },
    },
    {
      id: 2,
      icon: '2',
      label: { tr: '@BeforeEach', en: '@BeforeEach' },
      detail: {
        tr: 'Her testten önce temiz başlangıç sağlar. Login sayfasını açmak veya test verisini hazırlamak için uygundur.',
        en: 'Gives each test a clean start. It is suitable for opening the login page or preparing test data.',
      },
    },
    {
      id: 3,
      icon: '3',
      label: { tr: '@Test', en: '@Test' },
      detail: {
        tr: 'Asıl davranış kontrol edilir. Assertion yoksa test sadece kod çalıştırmış olur, kalite kararı vermez.',
        en: 'The actual behavior is verified. Without an assertion, the test only runs code and does not make a quality decision.',
      },
    },
    {
      id: 4,
      icon: '4',
      label: { tr: '@AfterEach', en: '@AfterEach' },
      detail: {
        tr: 'Her testten sonra temizlik yapar. Cookie silme, ekran görüntüsü alma veya geçici veri temizleme burada yapılır.',
        en: 'Cleans up after each test. Cookie cleanup, screenshot capture, or temporary data cleanup belongs here.',
      },
    },
    {
      id: 5,
      icon: '5',
      label: { tr: '@AfterAll', en: '@AfterAll' },
      detail: {
        tr: 'Sınıf bitince bir kez çalışır. Driver kapatma ve ortak kaynakları bırakma adımıdır.',
        en: 'Runs once when the class is finished. This is where the driver and shared resources are released.',
      },
    },
  ],
}

const javaStepAnimationMavenLifecycle = {
  type: 'step-animation',
  title: { tr: 'Maven test akışı', en: 'Maven test flow' },
  steps: [
    {
      id: 1,
      icon: 'A',
      label: { tr: 'pom.xml okunur', en: 'pom.xml is read' },
      detail: {
        tr: 'Maven önce bağımlılıkları, pluginleri ve project metadata bilgisini pom.xml dosyasından okur.',
        en: 'Maven first reads dependencies, plugins, and project metadata from pom.xml.',
      },
    },
    {
      id: 2,
      icon: 'B',
      label: { tr: 'dependencies iner', en: 'dependencies download' },
      detail: {
        tr: 'JUnit, Selenium veya REST Assured gibi kütüphaneler local Maven cache içine indirilir.',
        en: 'Libraries such as JUnit, Selenium, or REST Assured are downloaded into the local Maven cache.',
      },
    },
    {
      id: 3,
      icon: 'C',
      label: { tr: 'compile', en: 'compile' },
      detail: {
        tr: 'src/main/java altındaki üretim kodu derlenir. Syntax veya type hatası varsa akış burada durur.',
        en: 'Production code under src/main/java is compiled. Syntax or type errors stop the flow here.',
      },
    },
    {
      id: 4,
      icon: 'D',
      label: { tr: 'test', en: 'test' },
      detail: {
        tr: 'src/test/java altındaki JUnit/TestNG testleri çalışır ve assertion sonuçları rapora yazılır.',
        en: 'JUnit/TestNG tests under src/test/java run and assertion results are written to reports.',
      },
    },
    {
      id: 5,
      icon: 'E',
      label: { tr: 'package', en: 'package' },
      detail: {
        tr: 'Testler geçerse jar/war paketi üretilir. CI/CD genelde bu adımdan sonra deploy kararını verir.',
        en: 'If tests pass, a jar/war package is produced. CI/CD usually makes the deployment decision after this step.',
      },
    },
  ],
}

const javaInteractiveDiagramTestLayers = {
  type: 'interactive-diagram',
  variant: 'pyramid',
  title: { tr: 'Java otomasyon test katmanları', en: 'Java automation test layers' },
  nodes: [
    {
      id: 'ui',
      label: { tr: 'UI E2E', en: 'UI E2E' },
      color: '#ef4444',
      detail: {
        tr: 'Selenium veya Playwright Java ile gerçek kullanıcı akışı test edilir. Az sayıda tutulmalı çünkü yavaş ve bakım maliyeti yüksektir.',
        en: 'Selenium or Playwright Java tests a real user flow. Keep these few because they are slow and expensive to maintain.',
      },
      stats: { speed: { tr: 'Yavaş', en: 'Slow' }, count: { tr: 'Az', en: 'Few' }, risk: { tr: 'Flaky riski yüksek', en: 'High flaky risk' } },
    },
    {
      id: 'api',
      label: { tr: 'API / Integration', en: 'API / Integration' },
      color: '#f59e0b',
      detail: {
        tr: 'REST Assured ile servis cevabı, status code, schema ve database etkisi doğrulanır. UI testinden hızlıdır.',
        en: 'REST Assured verifies service response, status code, schema, and database impact. It is faster than UI testing.',
      },
      stats: { speed: { tr: 'Orta', en: 'Medium' }, count: { tr: 'Orta', en: 'Medium' }, feedback: { tr: 'Güçlü', en: 'Strong' } },
    },
    {
      id: 'unit',
      label: { tr: 'Unit / Component', en: 'Unit / Component' },
      color: '#22c55e',
      detail: {
        tr: 'JUnit5 ile küçük method veya service davranışı hızlıca test edilir. En hızlı feedback burada gelir.',
        en: 'JUnit5 quickly tests small method or service behavior. This layer gives the fastest feedback.',
      },
      stats: { speed: { tr: 'Hızlı', en: 'Fast' }, count: { tr: 'Çok', en: 'Many' }, cost: { tr: 'Düşük', en: 'Low' } },
    },
  ],
}

const javaChallengeMainSignature = {
  type: 'challenge',
  variant: 'multiple-choice',
  id: 'ch-java-main-signature-01',
  question: {
    tr: '🎯 JVM bir Java programını başlatırken tam olarak hangi method imzasını arar? Yanlış bir imza yazılırsa JVM programı çalıştırmayı reddeder — hangi seçenek doğru?',
    en: '🎯 Which exact method signature does the JVM look for when starting a Java program? If the wrong signature is written the JVM refuses to run it — which option is correct?',
  },
  options: [
    {
      id: 'a',
      text: 'public static void main(String[] args)',
      correct: true,
      explanation: {
        tr: '✅ Doğru! Her anahtar kelime bir anlam taşır: public → JVM dışarıdan erişebilir, static → nesne oluşturmadan çağırabilir, void → geri dönüş değeri yok, String[] args → komut satırından parametre alabilir. Bunlardan herhangi birini çıkar veya değiştir → JVM programı başlatamaz.',
        en: '✅ Correct! Each keyword carries meaning: public → JVM can access from outside, static → can call without creating an object, void → no return value, String[] args → can receive parameters from the command line. Remove or change any of these → JVM cannot start the program.',
      },
    },
    {
      id: 'b',
      text: 'public void main(String args)',
      correct: false,
      explanation: {
        tr: '❌ İki hata var: (1) static eksik — JVM nesne oluşturmadan çağıramaz, (2) String args yerine String[] args olmalı — tek String değil, String dizisi beklenir. Her ikisi de compile hatasına değil runtime hatasına yol açar: "Main method not found."',
        en: '❌ Two errors: (1) static is missing — JVM cannot call without an object, (2) must be String[] args not String args — an array of Strings is expected, not a single String. Both cause a runtime error not a compile error: "Main method not found."',
      },
    },
    {
      id: 'c',
      text: 'static int start(String[] args)',
      correct: false,
      explanation: {
        tr: '❌ İki hata var: (1) method adı start, main değil — JVM sadece main arar, (2) dönüş tipi int, void olmalı. Java giriş noktası için tam ve değişmez bir imza gereklidir.',
        en: '❌ Two errors: (1) method name is start not main — the JVM only looks for main, (2) return type is int, must be void. Java requires an exact and unchangeable entry-point signature.',
      },
    },
  ],
  xpReward: 10,
}

const javaChallengeFillAssertEquals = {
  type: 'challenge',
  variant: 'fill-blank',
  id: 'ch-java-fill-assert-equals-01',
  instruction: {
    tr: '📝 Boşluğu doldur: JUnit5\'te iki değerin birbirine eşit olup olmadığını kontrol eden method "assert" ile başlar ve "Equals" ile biter. Bu method yoksa test çalışır ama hiçbir zaman FAILED olmaz — sadece kod çalıştırmış olur, kalite kararı vermez.',
    en: '📝 Fill in the blank: In JUnit5, the method that checks whether two values are equal starts with "assert" and ends with "Equals". Without this method the test runs but never becomes FAILED — it only executes code, it makes no quality decision.',
  },
  codeTemplate: 'assert{BLANK}(expected, actual);',
  answer: 'Equals',
  alternatives: [],
  explanation: {
    tr: '✅ assertEquals(expected, actual) — JUnit5\'te en çok kullanılan eşitlik kontrolü. Python\'daki assert total == 120 yerine Java\'da assertEquals(120, total) yazılır. İkisi de aynı amaca hizmet eder: değer yanlışsa testi otomatik FAILED yapar ve seni hatanın tam yerine götürür.',
    en: '✅ assertEquals(expected, actual) — the most used equality check in JUnit5. Instead of Python assert total == 120, in Java you write assertEquals(120, total). Both serve the same purpose: if the value is wrong it automatically makes the test FAILED and takes you to the exact location of the bug.',
  },
  xpReward: 10,
}

const javaChallengeMavenOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-maven-01',
  question: {
    tr: '🔀 mvn test komutunu terminale yazdın — Maven arka planda 5 adımı sırayla gerçekleştirir. Bu adımları doğru sıraya sürükle. Sıra yanlışsa Maven gerçekte de aynı hatayı verir: "test kodu derlenmeden önce production kod derlenmeli".',
    en: '🔀 You typed mvn test in the terminal — Maven performs 5 steps in sequence behind the scenes. Drag them into the correct order. If the order is wrong, Maven actually gives the same error: "production code must be compiled before test code can be compiled".',
  },
  items: [
    { id: '1', text: { tr: '📄 pom.xml okunur — bağımlılıklar ve ayarlar belirlenir', en: '📄 pom.xml is read — dependencies and settings are determined' }, order: 1 },
    { id: '2', text: { tr: '⬇️ Bağımlılıklar (JUnit, Selenium vb.) local cache\'e indirilir', en: '⬇️ Dependencies (JUnit, Selenium etc.) are downloaded to the local cache' }, order: 2 },
    { id: '3', text: { tr: '🔨 src/main/java production kodu compile edilir', en: '🔨 src/main/java production code is compiled' }, order: 3 },
    { id: '4', text: { tr: '🔨 src/test/java test kodu compile edilir', en: '🔨 src/test/java test code is compiled' }, order: 4 },
    { id: '5', text: { tr: '🧪 JUnit/TestNG testleri çalışır, sonuçlar rapora yazılır', en: '🧪 JUnit/TestNG tests run, results are written to report' }, order: 5 },
  ],
  xpReward: 20,
}

const javaChallengeBugSpotSemicolon = {
  type: 'challenge',
  variant: 'bug-spot',
  id: 'ch-java-bugspot-semicolon-01',
  instruction: {
    tr: '🔍 Java compiler bu kodu derlemeye çalışıyor ve "error: \';\' expected" hatası veriyor. Her satırı incele: değişken tanımı veya method çağrısı olan satırların sonunda noktalı virgül (;) olmalı. Hatanın olduğu satıra tıkla.',
    en: '🔍 The Java compiler is trying to compile this code and gives an "error: \';\' expected" error. Examine each line: lines with a variable declaration or method call must end with a semicolon (;). Click the line that has the bug.',
  },
  lines: [
    { id: 1, code: 'public class Main {', hasBug: false },
    { id: 2, code: '    public static void main(String[] args) {', hasBug: false },
    {
      id: 3,
      code: '        int failed = 1',
      hasBug: true,
      explanation: {
        tr: 'Java statement sonunda noktalı virgül bekler. Bu satır int failed = 1; olmalı.',
        en: 'Java expects a semicolon at the end of a statement. This line should be int failed = 1;.',
      },
    },
    { id: 4, code: '        System.out.println(failed);', hasBug: false },
    { id: 5, code: '    }', hasBug: false },
    { id: 6, code: '}', hasBug: false },
  ],
  xpReward: 15,
}

// ─── YENİ BLOKLAR: step-animation + order-sort (her kod anlatımı sonrası) ──────

const javaStepAnimationMainExecution = {
  type: 'step-animation',
  title: { tr: '🎬 JVM bu kodu nasıl çalıştırır? — Adım adım izle', en: '🎬 How does JVM execute this code? — Watch step by step' },
  steps: [
    {
      id: 1,
      icon: '🚀',
      label: { tr: 'java Main komutu verilir', en: 'java Main command is given' },
      detail: {
        tr: 'Terminal\'e java Main yazdığında JVM başlatılır. JVM, Java Virtual Machine — Java kodunu gerçek makine koduna çeviren ve çalıştıran araç. Tıpkı bir tercüman gibi.',
        en: 'When you type java Main in the terminal, the JVM starts. JVM, Java Virtual Machine — the tool that translates and runs Java code as real machine code. Just like an interpreter.',
      },
    },
    {
      id: 2,
      icon: '🔍',
      label: { tr: 'public class Main bulunur', en: 'public class Main is found' },
      detail: {
        tr: 'JVM önce public class Main\'i arar. Dosya adı Main.java ise class adı da Main olmalıdır — bunlar eşleşmezse "class Main is public, should be declared in a file named Main.java" hatası gelir.',
        en: 'The JVM first looks for public class Main. If the file is named Main.java, the class must also be named Main — if these do not match you get "class Main is public, should be declared in a file named Main.java".',
      },
    },
    {
      id: 3,
      icon: '🎯',
      label: { tr: 'main metodu aranır', en: 'main method is searched' },
      detail: {
        tr: 'JVM class içinde public static void main(String[] args) metodunu arar. static olmak zorunda — JVM nesne oluşturmadan çağırır. Bu imza yanlışsa "Main method not found in class Main" hatası verir.',
        en: 'The JVM looks for public static void main(String[] args) inside the class. It must be static — the JVM calls it without creating an object. If this signature is wrong you get "Main method not found in class Main".',
      },
    },
    {
      id: 4,
      icon: '💾',
      label: { tr: 'int passed = 3 çalışır', en: 'int passed = 3 runs' },
      detail: {
        tr: 'İlk satır: int (tamsayı) tipinde passed adında bir değişken oluşturulur ve 3 değeri RAM\'e yazılır. Java Python\'dan farklı olarak tipi açıkça belirtmeni ister.',
        en: 'First line: a variable named passed of type int (integer) is created and value 3 is written to RAM. Unlike Python, Java requires you to explicitly declare the type.',
      },
    },
    {
      id: 5,
      icon: '🖨️',
      label: { tr: 'System.out.println çalışır', en: 'System.out.println runs' },
      detail: {
        tr: '"Passed: " + passed ifadesi "Passed: 3" string\'ine dönüştürülür (string concatenation) ve konsola yazdırılır. İkinci println de aynı şekilde çalışır. main metodunun sonu → JVM durur, exit code 0 döner.',
        en: 'The expression "Passed: " + passed is converted to the string "Passed: 3" (string concatenation) and printed to the console. The second println works the same way. End of main method → JVM stops, returns exit code 0.',
      },
    },
  ],
}

const javaChallengeOrderMainStructure = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-main-structure-01',
  question: {
    tr: '🔀 Çalışan bir Java programının 4 temel parçasını doğru sıraya sürükle. Sıra yanlış olursa Java compiler "class expected" veya "illegal start of expression" hatası verir.',
    en: '🔀 Drag the 4 basic parts of a working Java program into the correct order. If the order is wrong the Java compiler gives "class expected" or "illegal start of expression" errors.',
  },
  items: [
    { id: '1', text: { tr: '📦 public class Main {  ← tüm kodu saran class bildirimi', en: '📦 public class Main {  ← class declaration wrapping all code' }, order: 1 },
    { id: '2', text: { tr: '🎯 public static void main(String[] args) {  ← JVM giriş noktası', en: '🎯 public static void main(String[] args) {  ← JVM entry point' }, order: 2 },
    { id: '3', text: { tr: '💾 int passed = 3;  ← değişken tanımı, noktalı virgülle biter', en: '💾 int passed = 3;  ← variable declaration, ends with semicolon' }, order: 3 },
    { id: '4', text: { tr: '🖨️ System.out.println(passed);  ← çıktı; sonra } } ile her iki blok kapatılır', en: '🖨️ System.out.println(passed);  ← output; then } } closes both blocks' }, order: 4 },
  ],
  xpReward: 15,
}

const javaStepAnimationAssertionFlow = {
  type: 'step-animation',
  title: { tr: '🎬 assertEquals perde arkasında ne yapar? — Adım adım izle', en: '🎬 What does assertEquals do behind the scenes? — Watch step by step' },
  steps: [
    {
      id: 1,
      icon: '🏃',
      label: { tr: '@Test annotation tetikler', en: '@Test annotation triggers' },
      detail: {
        tr: 'Maven veya IDE @Test annotation\'ını görünce totalShouldIncludeTax() metodunu otomatik çalıştırır. Metodun adı önemli değil — sadece @Test işareti yeterli. Python\'da pytest fonksiyon adının test_ ile başlamasını ister; Java\'da annotation daha esnek.',
        en: 'When Maven or the IDE sees the @Test annotation, it automatically runs the totalShouldIncludeTax() method. The method name does not matter — only the @Test marker is needed. In Python pytest requires the function name to start with test_; in Java the annotation is more flexible.',
      },
    },
    {
      id: 2,
      icon: '📦',
      label: { tr: 'int total = 120 RAM\'e yazılır', en: 'int total = 120 is written to RAM' },
      detail: {
        tr: 'Metod içinde ilk satır çalışır: total değişkeni 120 değeriyle RAM\'e yazılır. Bu, testin kontrol edeceği "actual" (gerçek) değerdir.',
        en: 'The first line inside the method runs: the total variable is written to RAM with value 120. This is the "actual" (real) value the test will verify.',
      },
    },
    {
      id: 3,
      icon: '⚖️',
      label: { tr: 'assertEquals iki değeri karşılaştırır', en: 'assertEquals compares two values' },
      detail: {
        tr: 'assertEquals(120, total) çağrısı: ilk parametre expected (beklenen) = 120, ikinci parametre actual (gerçek) = total değişkeni = 120. JUnit bu iki değeri karşılaştırır: 120 == 120 → PASS.',
        en: 'The call assertEquals(120, total): first parameter expected = 120, second parameter actual = total variable = 120. JUnit compares these two values: 120 == 120 → PASS.',
      },
    },
    {
      id: 4,
      icon: '✅',
      label: { tr: 'TEST PASSED → rapor güncellenir', en: 'TEST PASSED → report is updated' },
      detail: {
        tr: 'Değerler eşit olduğu için test PASSED olur. Maven raporu güncellenir. CI/CD pipeline bir sonraki adıma geçebilir. Ekibe yeşil işaret gider.',
        en: 'Since the values are equal the test becomes PASSED. Maven updates its report. The CI/CD pipeline can proceed to the next step. A green signal goes to the team.',
      },
    },
    {
      id: 5,
      icon: '❌',
      label: { tr: 'Değer yanlışsa: açıklayıcı hata mesajı', en: 'If value is wrong: descriptive error message' },
      detail: {
        tr: 'assertEquals(100, total) yazılsaydı → 100 ≠ 120 → JUnit: "expected: <100> but was: <120>" mesajı üretirdi. Bu mesaj seni tam hatanın olduğu yere götürür; System.out.println\'nin aksine insan gözüne muhtaç değilsin.',
        en: 'If assertEquals(100, total) was written → 100 ≠ 120 → JUnit would produce: "expected: <100> but was: <120>". This message takes you exactly where the bug is; unlike System.out.println you do not depend on human eyes.',
      },
    },
  ],
}

const javaChallengeOrderJUnitTest = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-junit-test-01',
  question: {
    tr: '🔀 Bir JUnit5 test sınıfını sıfırdan yazmak için 5 adımı doğru sıraya sürükle. Sıra yanlışsa "cannot find symbol" veya "annotation not applicable" hataları alırsın.',
    en: '🔀 Drag the 5 steps of writing a JUnit5 test class from scratch into the correct order. Wrong order gives you "cannot find symbol" or "annotation not applicable" errors.',
  },
  items: [
    { id: '1', text: { tr: '📥 import static org.junit.jupiter.api.Assertions.*;  ← assertEquals erişimi', en: '📥 import static org.junit.jupiter.api.Assertions.*;  ← assertEquals access' }, order: 1 },
    { id: '2', text: { tr: '📥 import org.junit.jupiter.api.Test;  ← @Test annotation erişimi', en: '📥 import org.junit.jupiter.api.Test;  ← @Test annotation access' }, order: 2 },
    { id: '3', text: { tr: '📦 class CartTest {  ← test sınıfı bildirimi', en: '📦 class CartTest {  ← test class declaration' }, order: 3 },
    { id: '4', text: { tr: '🏷️ @Test  ← metodu test olarak işaretle', en: '🏷️ @Test  ← mark method as a test' }, order: 4 },
    { id: '5', text: { tr: '⚖️ void totalShouldBe120() { assertEquals(120, total); }  ← assertion ile test metodu', en: '⚖️ void totalShouldBe120() { assertEquals(120, total); }  ← test method with assertion' }, order: 5 },
  ],
  xpReward: 20,
}

// ─── Selenium: step-animation + order-sort ────────────────────────────────────

const javaStepAnimationWebDriverWait = {
  type: 'step-animation',
  title: { tr: '🎬 WebDriverWait perde arkasında ne yapar? — Thread.sleep ile farkını izle', en: '🎬 What does WebDriverWait do behind the scenes? — See the difference from Thread.sleep' },
  steps: [
    {
      id: 1,
      icon: '🖱️',
      label: { tr: 'click() tetiklendi', en: 'click() triggered' },
      detail: {
        tr: 'driver.findElement(By.id("submit")).click() çalıştı. Sunucu isteği aldı. Cevap henüz gelmedi — sayfa güncelleniyor. Thread.sleep bu noktada körü körüne sayar; WebDriverWait ise izler.',
        en: 'driver.findElement(By.id("submit")).click() ran. Server received the request. Response has not arrived yet — the page is updating. Thread.sleep blindly counts down from here; WebDriverWait watches instead.',
      },
    },
    {
      id: 2,
      icon: '⏱️',
      label: { tr: 'WebDriverWait oluşturuldu', en: 'WebDriverWait is created' },
      detail: {
        tr: 'new WebDriverWait(driver, Duration.ofSeconds(10)) → "10 saniyeye kadar sabırla bekle, ama koşul sağlanırsa hemen devam et" demek. Thread.sleep(5000) ise ne olursa olsun tam 5 saniye bekler — ne fazla ne az.',
        en: 'new WebDriverWait(driver, Duration.ofSeconds(10)) → means "wait patiently up to 10 seconds, but continue immediately if the condition is met". Thread.sleep(5000) always waits exactly 5 seconds regardless — no more no less.',
      },
    },
    {
      id: 3,
      icon: '🔄',
      label: { tr: 'Her 500ms koşul kontrol edilir', en: 'Condition checked every 500ms' },
      detail: {
        tr: 'WebDriverWait her 500 milisaniyede bir sorar: "visibilityOfElementLocated(By.id(\'result\')) koşulu doğru mu?" Hayırsa: bekle. Evetse: hemen devam et. 10 saniye geçerse: TimeoutException fırlatır.',
        en: 'WebDriverWait asks every 500 milliseconds: "is the visibilityOfElementLocated(By.id(\'result\')) condition true?" If no: wait. If yes: continue immediately. If 10 seconds pass: throws TimeoutException.',
      },
    },
    {
      id: 4,
      icon: '👁️',
      label: { tr: 'Element görünür oldu → hemen devam', en: 'Element became visible → continue immediately' },
      detail: {
        tr: 'Sunucu 1.5 saniyede cevap verdi, #result elementi sayfada göründü. WebDriverWait koşulun doğru olduğunu gördü ve kalan 8.5 saniyeyi beklemeden devam etti. Thread.sleep bunu bilemezdi — ne az ne fazla, tam 5 saniye beklerdi.',
        en: 'The server responded in 1.5 seconds, the #result element appeared on the page. WebDriverWait saw the condition was true and continued without waiting the remaining 8.5 seconds. Thread.sleep could not know this — it would always wait exactly 5 seconds.',
      },
    },
    {
      id: 5,
      icon: '📝',
      label: { tr: 'getText() güvenle çalışır', en: 'getText() runs safely' },
      detail: {
        tr: 'WebDriverWait element\'in gerçekten görünür olduğunu garanti etti. getText() çağrısı artık güvenli — StaleElementReferenceException veya boş string riski minimize edildi. Flaky test ihtimali önemli ölçüde azaldı.',
        en: 'WebDriverWait guaranteed the element is truly visible. The getText() call is now safe — the risk of StaleElementReferenceException or an empty string is minimized. The chance of a flaky test is significantly reduced.',
      },
    },
  ],
}

const javaChallengeOrderWebDriverWait = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-webdriverwait-01',
  question: {
    tr: '🔀 Selenium testinde WebDriverWait kullanımının 5 adımını doğru sıraya sürükle. Sıra yanlış olursa ya element bulunamaz ya da beklemeden önce aksiyon alınır ve test flaky olur.',
    en: '🔀 Drag the 5 steps of using WebDriverWait in a Selenium test into the correct order. Wrong order either causes "element not found" or takes action before waiting, making the test flaky.',
  },
  items: [
    { id: '1', text: { tr: '🖱️ Aksiyon tetiklenir: driver.findElement(...).click()', en: '🖱️ Action triggered: driver.findElement(...).click()' }, order: 1 },
    { id: '2', text: { tr: '⏱️ WebDriverWait nesnesi oluşturulur: new WebDriverWait(driver, Duration.ofSeconds(10))', en: '⏱️ WebDriverWait object created: new WebDriverWait(driver, Duration.ofSeconds(10))' }, order: 2 },
    { id: '3', text: { tr: '🎯 Koşul tanımlanır: wait.until(ExpectedConditions.visibilityOfElementLocated(...))', en: '🎯 Condition defined: wait.until(ExpectedConditions.visibilityOfElementLocated(...))' }, order: 3 },
    { id: '4', text: { tr: '✅ Koşul sağlandığında WebElement otomatik döner', en: '✅ When condition is met WebElement is automatically returned' }, order: 4 },
    { id: '5', text: { tr: '📝 Dönen WebElement üzerinde getText() veya assertion yapılır', en: '📝 getText() or assertion is performed on the returned WebElement' }, order: 5 },
  ],
  xpReward: 20,
}

// ─── OOP: order-sort ──────────────────────────────────────────────────────────

const javaChallengeOrderOopCreation = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-oop-creation-01',
  question: {
    tr: '🔀 Java\'da bir nesneyi oluşturup kullanmanın 5 adımını doğru sıraya sürükle. Class tanımı olmadan new çalışamaz; constructor olmadan field\'lar başlangıç değeri almaz.',
    en: '🔀 Drag the 5 steps of creating and using an object in Java into the correct order. new cannot run without a class definition; fields cannot receive initial values without a constructor.',
  },
  items: [
    { id: '1', text: { tr: '📐 Class yazılır: field\'lar ve constructor tanımlanır', en: '📐 Class is written: fields and constructor are defined' }, order: 1 },
    { id: '2', text: { tr: '🏗️ new ile heap\'te alan ayrılır: TestUser user = new TestUser("ali@test.com")', en: '🏗️ Space is allocated on the heap with new: TestUser user = new TestUser("ali@test.com")' }, order: 2 },
    { id: '3', text: { tr: '⚙️ Constructor çalışır: this.email = "ali@test.com" field\'a yazılır', en: '⚙️ Constructor runs: this.email = "ali@test.com" is written to the field' }, order: 3 },
    { id: '4', text: { tr: '📌 Reference değişkeni (user) heap\'teki nesneye işaret eder', en: '📌 Reference variable (user) points to the object on the heap' }, order: 4 },
    { id: '5', text: { tr: '🔧 Nesne metotları çağrılabilir: user.getEmail(), page.login(user)', en: '🔧 Object methods can be called: user.getEmail(), page.login(user)' }, order: 5 },
  ],
  xpReward: 15,
}

// ─── sB: Strings & Math Teaching Blocks ─────────────────────────────────────

const javaPlaygroundStringMethods = {
  type: 'code-playground',
    relatedTopicId: 'java-strings-01',
  id: 'java-strings-01',
  xpReward: 15,
  label: { tr: '🔤 Egzersiz 3 — String karşılaştırma tuzağı: trim() + equals()', en: '🔤 Exercise 3 — String comparison trap: trim() + equals()' },
  task: {
    tr: '1️⃣ "▶ Çalıştır" ile çıktıyı gör — 3 satır çıkar.\n2️⃣ "🐛 Bozuk Testi Düzelt" moduna geç — rawTitle üzerinde trim() yapılmadığı için endsWith ve equals false dönüyor. Önce temizle, sonra karşılaştır.\n3️⃣ Hedef: QA testlerinde driver.getTitle().trim().equals("Login") zincirini anla; trim() olmadan boşluklar her assertion\'ı patlatır.',
    en: '1️⃣ Press "▶ Run" to see output — 3 lines appear.\n2️⃣ Switch to "🐛 Fix the Failing Test" — endsWith and equals return false because trim() was not called on rawTitle. Clean first, then compare.\n3️⃣ Goal: Understand the driver.getTitle().trim().equals("Login") chain in QA tests; without trim() spaces blow up every assertion.',
  },
  language: 'java',
  code: `public class Main {
    public static void main(String[] args) {
        String rawTitle = "  Login Page  ";

        String title = rawTitle.trim(); // önce temizle
        System.out.println(title.endsWith("Login Page")); // true
        System.out.println(title.equals("Login Page"));   // true
        System.out.println(title.toUpperCase());          // LOGIN PAGE
    }
}`,
  expected: 'true\ntrue\nLOGIN PAGE',
  explanation: {
    tr: '✅ Çalıştı! .trim() yeni bir String döndürür — orijinal rawTitle değişmez (immutability). .equals() içerik karşılaştırır, == ise referans. QA\'da driver.getTitle().trim().equalsIgnoreCase("login page") kombinasyonu en güvenli doğrulama yöntemidir.',
    en: '✅ It ran! .trim() returns a new String — the original rawTitle is unchanged (immutability). .equals() compares content, == compares references. In QA driver.getTitle().trim().equalsIgnoreCase("login page") is the safest verification approach.',
  },
  hints: [
    { tr: '🔍 İpucu 1 — Neden false: rawTitle = "  Login Page  " — başta ve sonda boşluk var. rawTitle.endsWith("Login Page") → son karakter boşluk; "Page" değil. Sonuç false.', en: '🔍 Hint 1 — Why false: rawTitle = "  Login Page  " — spaces at start and end. rawTitle.endsWith("Login Page") → last character is space, not "Page". Result false.' },
    { tr: '🔍 İpucu 2 — Hangi adım eksik: rawTitle.endsWith(...) yazmadan önce String title = rawTitle.trim() ile boşlukları temizle; sonra title üzerinde işlem yap.', en: '🔍 Hint 2 — Which step is missing: Before writing rawTitle.endsWith(...) clean whitespace with String title = rawTitle.trim(); then work on title.' },
    { tr: '✏️ İpucu 3 — Çözüm: String title = rawTitle.trim() ekle; rawTitle.endsWith → title.endsWith ve rawTitle.equals → title.equals yap.', en: '✏️ Hint 3 — Solution: Add String title = rawTitle.trim(); change rawTitle.endsWith → title.endsWith and rawTitle.equals → title.equals.' },
  ],
  buggyCode: `public class Main {
    public static void main(String[] args) {
        String rawTitle = "  Login Page  ";

        // trim() yok — boşluklar soruna yol açıyor
        System.out.println(rawTitle.endsWith("Login Page")); // false!
        System.out.println(rawTitle.equals("Login Page"));   // false!
        System.out.println(rawTitle.toUpperCase().trim());   // yanlış sıra
    }
}`,
  fixedCode: `public class Main {
    public static void main(String[] args) {
        String rawTitle = "  Login Page  ";

        String title = rawTitle.trim(); // önce temizle
        System.out.println(title.endsWith("Login Page")); // true
        System.out.println(title.equals("Login Page"));   // true
        System.out.println(title.toUpperCase());          // LOGIN PAGE
    }
}`,
}

const javaStepAnimationStringImmutable = {
  type: 'step-animation',
  title: { tr: '🎬 String immutability — .trim() neden yeni nesne döner?', en: '🎬 String immutability — why does .trim() return a new object?' },
  steps: [
    {
      id: 1,
      icon: '💾',
      label: { tr: '"  Login Page  " belleğe yazıldı', en: '"  Login Page  " written to memory' },
      detail: {
        tr: 'String rawTitle = "  Login Page  " → bu metin belleğe yazıldı. Java\'da String nesneleri IMMUTABLE — değiştirilemez. Bu nesne sonsuza kadar "  Login Page  " olarak kalır.',
        en: 'String rawTitle = "  Login Page  " → this text is written to memory. In Java String objects are IMMUTABLE — they cannot be changed. This object stays "  Login Page  " forever.',
      },
    },
    {
      id: 2,
      icon: '✂️',
      label: { tr: '.trim() → YENİ String üretir', en: '.trim() → produces a NEW String' },
      detail: {
        tr: 'rawTitle.trim() orijinali DEĞİŞTİRMEZ. Boşlukları kesilmiş yeni bir String nesnesi oluşturur: "Login Page". Python\'da da str.strip() aynı şekilde yeni string döndürür.',
        en: 'rawTitle.trim() does NOT change the original. It creates a new String object with spaces stripped: "Login Page". In Python str.strip() also returns a new string the same way.',
      },
    },
    {
      id: 3,
      icon: '📌',
      label: { tr: 'Dönen değeri yakalamazsan kaybolur', en: 'If you don\'t capture the return value it is lost' },
      detail: {
        tr: 'rawTitle.trim() yaptıktan sonra hâlâ rawTitle.equals("Login Page") yazarsan → FALSE. rawTitle hâlâ boşluklu orijinali gösteriyor. String title = rawTitle.trim() yazarak yeni değişkene atamalısın.',
        en: 'If you write rawTitle.equals("Login Page") after rawTitle.trim() → FALSE. rawTitle still points to the original with spaces. You must write String title = rawTitle.trim() to capture the new value.',
      },
    },
    {
      id: 4,
      icon: '⛓️',
      label: { tr: 'Zincir çağrısı: trim().toLowerCase().contains()', en: 'Chaining: trim().toLowerCase().contains()' },
      detail: {
        tr: 'rawTitle.trim().toLowerCase().contains("login") — her metot yeni String döndürür; bir sonraki metot o yeni String üzerinde çalışır. Güvenli çünkü rawTitle\'ı kullanan başka kodlar etkilenmez.',
        en: 'rawTitle.trim().toLowerCase().contains("login") — each method returns a new String; the next method works on that new String. Safe because other code using rawTitle is not affected.',
      },
    },
    {
      id: 5,
      icon: '🧪',
      label: { tr: 'QA\'da neden kritik?', en: 'Why is it critical in QA?' },
      detail: {
        tr: 'driver.getTitle() bazen başlıkta boşluk döndürür. .trim().equals("Login") yazmadan assertEquals başarısız olur — flaky test! Her string assertion\'ından önce .trim() al; .equalsIgnoreCase() ile büyük/küçük harf farkını da ortadan kaldır.',
        en: 'driver.getTitle() sometimes returns the title with whitespace. Without .trim().equals("Login") the assertEquals fails — flaky test! Always call .trim() before any string assertion; use .equalsIgnoreCase() to also eliminate case differences.',
      },
    },
  ],
}

const javaChallengeOrderStringChain = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-string-chain-01',
  question: {
    tr: '🔀 QA testinde sayfa başlığını güvenli doğrulamak için 4 adımı doğru sıraya sürükle. Sıra yanlışsa boşluklar veya büyük/küçük harf farkı assertion\'ı patlatır.',
    en: '🔀 Drag the 4 steps for safely validating a page title in a QA test into the correct order. Wrong order causes assertion failure due to spaces or letter casing.',
  },
  items: [
    { id: '1', text: { tr: 'String rawTitle = driver.getTitle()  ← ham başlığı al', en: 'String rawTitle = driver.getTitle()  ← get raw title' }, order: 1 },
    { id: '2', text: { tr: 'String title = rawTitle.trim()  ← baş/son boşlukları sil', en: 'String title = rawTitle.trim()  ← remove leading/trailing spaces' }, order: 2 },
    { id: '3', text: { tr: 'String normalized = title.toLowerCase()  ← büyük/küçük eşitle', en: 'String normalized = title.toLowerCase()  ← equalize upper/lower case' }, order: 3 },
    { id: '4', text: { tr: 'assertTrue(normalized.contains("login"))  ← assertion', en: 'assertTrue(normalized.contains("login"))  ← assertion' }, order: 4 },
  ],
  xpReward: 15,
}

// ─── sC: Control Flow Teaching Blocks ────────────────────────────────────────

const javaPlaygroundIfElse = {
  type: 'code-playground',
    relatedTopicId: 'java-ifelse-01',
  id: 'java-ifelse-01',
  xpReward: 15,
  label: { tr: '🔀 Egzersiz 4 — if/else merdiveni: koşul sırası kritik', en: '🔀 Exercise 4 — if/else ladder: condition order is critical' },
  task: {
    tr: '1️⃣ "▶ Çalıştır" — score=75 için hangi not çıkıyor görünsün.\n2️⃣ "🐛 Bozuk Testi Düzelt" moduna geç — koşullar ters sırada; 75 alan öğrenci "AA" alıyor! Büyükten küçüğe sırala.\n3️⃣ Hedef: Java if/else merdiveninde yukarıdan aşağı değerlendirir; ilk TRUE koşul kazanır, kalanlar hiç çalışmaz.',
    en: '1️⃣ Press "▶ Run" — see which grade score=75 gets.\n2️⃣ Switch to "🐛 Fix the Failing Test" — conditions are in reverse order; a student with 75 gets "AA"! Order from highest to lowest.\n3️⃣ Goal: Java evaluates an if/else ladder top to bottom; the first TRUE condition wins, the rest never run.',
  },
  language: 'java',
  code: `public class Main {
    public static void main(String[] args) {
        int score = 75;

        if (score >= 90) {
            System.out.println("AA");
        } else if (score >= 80) {
            System.out.println("BA");
        } else if (score >= 70) {
            System.out.println("BB");
        } else {
            System.out.println("FF");
        }
    }
}`,
  expected: 'BB',
  explanation: {
    tr: '✅ BB çıktı! score=75 → >= 90 false → >= 80 false → >= 70 TRUE → "BB" yazdırıldı, kalan bloklar atlandı. Kritik kural: eşikler büyükten küçüğe sıralanmalı. Ters yazılırsa 60 alan öğrenci de "AA" alır.',
    en: '✅ BB! score=75 → >= 90 false → >= 80 false → >= 70 TRUE → "BB" printed, remaining blocks skipped. Critical rule: thresholds must be ordered high to low. If reversed even a student with 60 gets "AA".',
  },
  hints: [
    { tr: '🔍 İpucu 1 — Neden yanlış: Bozuk versiyonda ilk koşul score >= 60. 75 >= 60 → TRUE → hemen "AA" yazdırır; diğer else if\'lere hiç bakılmaz.', en: '🔍 Hint 1 — Why it is wrong: In the broken version the first condition is score >= 60. 75 >= 60 → TRUE → prints "AA" immediately; other else ifs are never checked.' },
    { tr: '🔍 İpucu 2 — Kural: en kısıtlayıcı (en büyük eşikli) koşul en üste gelmeli. >= 90 → >= 80 → >= 70 → >= 60 → else.', en: '🔍 Hint 2 — Rule: the most restrictive condition (highest threshold) must come first. >= 90 → >= 80 → >= 70 → >= 60 → else.' },
    { tr: '✏️ İpucu 3 — Sıra: if(>=90) … else if(>=80) … else if(>=70) … else if(>=60) … else. Koşulları bu sıraya getir.', en: '✏️ Hint 3 — Order: if(>=90) … else if(>=80) … else if(>=70) … else if(>=60) … else. Reorder the conditions to this sequence.' },
  ],
  buggyCode: `public class Main {
    public static void main(String[] args) {
        int score = 75;

        if (score >= 60) {            // ilk TRUE: 75>=60
            System.out.println("AA"); // yanlış not!
        } else if (score >= 70) {
            System.out.println("BB");
        } else if (score >= 80) {
            System.out.println("BA");
        } else {
            System.out.println("FF");
        }
    }
}`,
  fixedCode: `public class Main {
    public static void main(String[] args) {
        int score = 75;

        if (score >= 90) {
            System.out.println("AA");
        } else if (score >= 80) {
            System.out.println("BA");
        } else if (score >= 70) {
            System.out.println("BB"); // 75>=70 → BB
        } else {
            System.out.println("FF");
        }
    }
}`,
}

const javaStepAnimationIfElse = {
  type: 'step-animation',
  title: { tr: '🎬 Java if/else merdiveni nasıl değerlendirir? — score=75 yolculuğu', en: '🎬 How does Java evaluate an if/else ladder? — journey of score=75' },
  steps: [
    {
      id: 1,
      icon: '📥',
      label: { tr: 'score = 75 hazır', en: 'score = 75 ready' },
      detail: {
        tr: 'int score = 75 çalıştı. Java şimdi if bloğuna giriyor ve koşulları YUKARIDAN AŞAĞI değerlendiriyor.',
        en: 'int score = 75 ran. Java is now entering the if block and evaluating conditions TOP TO BOTTOM.',
      },
    },
    {
      id: 2,
      icon: '❌',
      label: { tr: 'score >= 90 → FALSE, atlandı', en: 'score >= 90 → FALSE, skipped' },
      detail: {
        tr: '75 >= 90 → false. Bu bloğun içindeki System.out.println("AA") HİÇ ÇALIŞMAZ. Java bir sonraki else if\'e geçer.',
        en: '75 >= 90 → false. The System.out.println("AA") inside this block NEVER RUNS. Java moves to the next else if.',
      },
    },
    {
      id: 3,
      icon: '❌',
      label: { tr: 'score >= 80 → FALSE, atlandı', en: 'score >= 80 → FALSE, skipped' },
      detail: {
        tr: '75 >= 80 → false. "BA" bloğu da atlandı. Java bir sonraki else if\'e geçer.',
        en: '75 >= 80 → false. "BA" block also skipped. Java moves to the next else if.',
      },
    },
    {
      id: 4,
      icon: '✅',
      label: { tr: 'score >= 70 → TRUE → BB!', en: 'score >= 70 → TRUE → BB!' },
      detail: {
        tr: '75 >= 70 → true! "BB" yazdırıldı. Bu blok çalıştı — artık kalan else if ve else blokları ATLANIR. Java tek bir blok çalıştırır.',
        en: '75 >= 70 → true! "BB" is printed. This block ran — all remaining else if and else blocks are SKIPPED. Java runs exactly one block.',
      },
    },
    {
      id: 5,
      icon: '⏭️',
      label: { tr: 'Kalan koşullar hiç kontrol edilmedi', en: 'Remaining conditions never checked' },
      detail: {
        tr: 'Java >= 60 ve else bloğuna bakmadı bile. if/else zincirinin garantisi: en fazla 1 blok çalışır. Bu, test durumu değerlendirme kodu için de geçerli — PASS/FAIL/SKIP merdivenini aynı mantıkla kur.',
        en: 'Java never even looked at >= 60 and else blocks. Guarantee of the if/else chain: at most 1 block runs. This applies to test status evaluation code too — build PASS/FAIL/SKIP ladders with the same logic.',
      },
    },
  ],
}

const javaChallengeOrderIfElse = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-ifelse-01',
  question: {
    tr: '🔀 Test durumuna göre mesaj veren bir if/else bloğunun 5 parçasını doğru sıraya sürükle.',
    en: '🔀 Drag the 5 parts of an if/else block that gives a message based on test status into the correct order.',
  },
  items: [
    { id: '1', text: { tr: 'if (status.equals("PASS")) {  ← en spesifik koşul ilk', en: 'if (status.equals("PASS")) {  ← most specific condition first' }, order: 1 },
    { id: '2', text: { tr: '    System.out.println("✅ Test geçti");', en: '    System.out.println("✅ Test passed");' }, order: 2 },
    { id: '3', text: { tr: '} else if (status.equals("FAIL")) {', en: '} else if (status.equals("FAIL")) {' }, order: 3 },
    { id: '4', text: { tr: '    System.out.println("❌ Test başarısız");', en: '    System.out.println("❌ Test failed");' }, order: 4 },
    { id: '5', text: { tr: '} else { System.out.println("⏳ Bekliyor"); }  ← catch-all', en: '} else { System.out.println("⏳ Pending"); }  ← catch-all' }, order: 5 },
  ],
  xpReward: 15,
}

// ─── sD: Arrays Teaching Blocks ──────────────────────────────────────────────

const javaPlaygroundArrays = {
  type: 'code-playground',
    relatedTopicId: 'java-arrays-01',
  id: 'java-arrays-01',
  xpReward: 15,
  label: { tr: '📦 Egzersiz 5 — Array: index ve for-each döngüsü', en: '📦 Exercise 5 — Array: index and for-each loop' },
  task: {
    tr: '1️⃣ "▶ Çalıştır" — 3 test sonucunu ve son elemanı gör.\n2️⃣ "🐛 Bozuk Testi Düzelt" moduna geç — scores[3] yazılmış; 3 elemanlı dizide geçerli indexler 0-1-2. ArrayIndexOutOfBoundsException alırsın. Son elemanı doğru şekilde eriş.\n3️⃣ Hedef: n elemanlı dizide son geçerli index n-1. scores.length eleman sayısı (3), scores[scores.length-1] son eleman.',
    en: '1️⃣ Press "▶ Run" — see 3 test results and the last element.\n2️⃣ Switch to "🐛 Fix the Failing Test" — scores[3] is written; valid indexes in a 3-element array are 0-1-2. You get ArrayIndexOutOfBoundsException. Access the last element correctly.\n3️⃣ Goal: Last valid index in an n-element array is n-1. scores.length is element count (3), scores[scores.length-1] is the last element.',
  },
  language: 'java',
  code: `public class Main {
    public static void main(String[] args) {
        int[] scores = {85, 92, 78};

        for (int score : scores) {
            System.out.println("Score: " + score);
        }

        System.out.println("Son: " + scores[scores.length - 1]);
    }
}`,
  expected: 'Score: 85\nScore: 92\nScore: 78\nSon: 78',
  explanation: {
    tr: '✅ Çalıştı! int[] scores = {85, 92, 78} → 3 element, index 0-1-2. scores.length = 3 (eleman sayısı), son index = 2. for-each her elemanı sırayla verir — index takip etmene gerek yok.',
    en: '✅ It ran! int[] scores = {85, 92, 78} → 3 elements, indexes 0-1-2. scores.length = 3 (count), last index = 2. for-each gives each element in order — no need to track the index yourself.',
  },
  hints: [
    { tr: '🔍 İpucu 1 — Hata nereden: scores[3] yazılmış ama 3 elemanlı dizide geçerli indexler 0, 1, 2. Index 3 yoktur → ArrayIndexOutOfBoundsException.', en: '🔍 Hint 1 — Where the error comes from: scores[3] is written but valid indexes in a 3-element array are 0, 1, 2. Index 3 does not exist → ArrayIndexOutOfBoundsException.' },
    { tr: '🔍 İpucu 2 — Kural: n elemanlı dizide son geçerli index n-1. scores.length 3 döndürür, son geçerli index 3-1 = 2.', en: '🔍 Hint 2 — Rule: Last valid index in an n-element array is n-1. scores.length returns 3, last valid index is 3-1 = 2.' },
    { tr: '✏️ İpucu 3 — Çözüm: scores[3] → scores[scores.length - 1] yap.', en: '✏️ Hint 3 — Solution: Change scores[3] → scores[scores.length - 1].' },
  ],
  buggyCode: `public class Main {
    public static void main(String[] args) {
        int[] scores = {85, 92, 78};

        for (int score : scores) {
            System.out.println("Score: " + score);
        }

        System.out.println("Son: " + scores[3]); // IndexOutOfBounds!
    }
}`,
  fixedCode: `public class Main {
    public static void main(String[] args) {
        int[] scores = {85, 92, 78};

        for (int score : scores) {
            System.out.println("Score: " + score);
        }

        System.out.println("Son: " + scores[scores.length - 1]); // 78
    }
}`,
}

const javaStepAnimationArrayMemory = {
  type: 'step-animation',
  title: { tr: '🎬 Array bellekte nasıl durur? — index sıfırdan başlar', en: '🎬 How does an array sit in memory? — index starts from zero' },
  steps: [
    {
      id: 1,
      icon: '🏗️',
      label: { tr: 'int[] scores = {85, 92, 78}', en: 'int[] scores = {85, 92, 78}' },
      detail: {
        tr: 'JVM bellekte 3 kutulu ardışık alan ayırır: [0]=85, [1]=92, [2]=78. Sabit boyut — oluşturduktan sonra büyütemezsin. Dinamik boyut gerekiyorsa ArrayList<Integer> kullan.',
        en: 'JVM allocates 3 consecutive boxes in memory: [0]=85, [1]=92, [2]=78. Fixed size — you cannot grow it after creation. For dynamic size use ArrayList<Integer>.',
      },
    },
    {
      id: 2,
      icon: '🎯',
      label: { tr: 'scores[0]=85, scores[2]=78', en: 'scores[0]=85, scores[2]=78' },
      detail: {
        tr: 'scores[0] ilk kutuya erişir → 85. scores[2] üçüncü kutu → 78. Java 0\'dan sayar. Python\'daki scores[-1] ÇALIŞMAZ — Java negatif index kabul etmez.',
        en: 'scores[0] accesses the first box → 85. scores[2] is the third box → 78. Java counts from 0. Python\'s scores[-1] DOES NOT WORK — Java does not accept negative indexes.',
      },
    },
    {
      id: 3,
      icon: '📏',
      label: { tr: 'scores.length = 3 (field, metod değil)', en: 'scores.length = 3 (field, not method)' },
      detail: {
        tr: 'scores.length eleman sayısını döndürür: 3. METOD DEĞİL — field. Parantez yok: scores.length, not scores.length(). String\'de length() metod (parantezli); array\'de length field (parentezsiz) — bu fark sıkça sorulur.',
        en: 'scores.length returns element count: 3. NOT a method — a field. No parentheses: scores.length, not scores.length(). String has length() method (with parentheses); array has length field (no parentheses) — this difference is frequently asked.',
      },
    },
    {
      id: 4,
      icon: '🔄',
      label: { tr: 'for-each: her adım sonraki kutuyu açar', en: 'for-each: each step opens the next box' },
      detail: {
        tr: 'for (int score : scores) → adım 1: score=85, adım 2: score=92, adım 3: score=78, bitti. Python\'daki for score in scores ile aynı. Index takip etmek gerekmez.',
        en: 'for (int score : scores) → step 1: score=85, step 2: score=92, step 3: score=78, done. Same as Python\'s for score in scores. No need to track the index.',
      },
    },
    {
      id: 5,
      icon: '💥',
      label: { tr: 'scores[3] → ArrayIndexOutOfBoundsException', en: 'scores[3] → ArrayIndexOutOfBoundsException' },
      detail: {
        tr: 'scores[3] → 4. kutuya erişmeye çalışıyor ama dizi 3 kutulu (0,1,2). JVM ArrayIndexOutOfBoundsException fırlatır. Compile zamanında yakalanmaz — runtime hatası. QA\'da test datası array boyutunu geçerse bu hata çıkabilir.',
        en: 'scores[3] → tries to access the 4th box but array has 3 boxes (0,1,2). JVM throws ArrayIndexOutOfBoundsException. Not caught at compile time — runtime error. In QA this error can appear when test data exceeds the array size.',
      },
    },
  ],
}

const javaChallengeOrderArrayLifecycle = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-array-lifecycle-01',
  question: {
    tr: '🔀 Bir array oluşturup doldurup okumak için 5 adımı doğru sıraya sürükle.',
    en: '🔀 Drag the 5 steps for creating, filling, and reading an array into the correct order.',
  },
  items: [
    { id: '1', text: { tr: 'int[] arr = new int[3]  ← 3 kutulu sabit alan ayır', en: 'int[] arr = new int[3]  ← allocate 3 fixed boxes' }, order: 1 },
    { id: '2', text: { tr: 'arr[0] = 85; arr[1] = 92; arr[2] = 78  ← değerleri yaz', en: 'arr[0] = 85; arr[1] = 92; arr[2] = 78  ← write values' }, order: 2 },
    { id: '3', text: { tr: 'System.out.println(arr.length)  ← 3 (eleman sayısı, field)', en: 'System.out.println(arr.length)  ← 3 (element count, field)' }, order: 3 },
    { id: '4', text: { tr: 'for (int v : arr) println(v)  ← for-each ile tüm elemanları oku', en: 'for (int v : arr) println(v)  ← read all elements with for-each' }, order: 4 },
    { id: '5', text: { tr: 'arr[arr.length-1]  ← son elemanı oku (length-1 = 2)', en: 'arr[arr.length-1]  ← read last element (length-1 = 2)' }, order: 5 },
  ],
  xpReward: 15,
}

// ─── sE: Methods Teaching Blocks ─────────────────────────────────────────────

const javaPlaygroundMethods = {
  type: 'code-playground',
    relatedTopicId: 'java-methods-01',
  id: 'java-methods-01',
  xpReward: 20,
  label: { tr: '🔧 Egzersiz 6 — Method: return değeri ve void farkı', en: '🔧 Exercise 6 — Method: return value vs void difference' },
  task: {
    tr: '1️⃣ "▶ Çalıştır" — greet ve add metodlarının sonuçlarını gör.\n2️⃣ "🐛 Bozuk Testi Düzelt" moduna geç — add metodu return ifadesini içermiyor; "missing return statement" compile hatası. Eksik satırı ekle.\n3️⃣ Hedef: void metod hiçbir şey döndürmez; int metod mutlaka return ile int döndürmeli — compile zorunluluğu.',
    en: '1️⃣ Press "▶ Run" — see results from greet and add methods.\n2️⃣ Switch to "🐛 Fix the Failing Test" — add method has no return statement; "missing return statement" compile error. Add the missing line.\n3️⃣ Goal: void method returns nothing; int method must always return an int with return — a compile requirement.',
  },
  language: 'java',
  code: `public class Main {

    static void greet(String name) {
        System.out.println("Merhaba, " + name + "!");
    }

    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        greet("QA");
        int result = add(5, 3);
        System.out.println("5 + 3 = " + result);
    }
}`,
  expected: 'Merhaba, QA!\n5 + 3 = 8',
  explanation: {
    tr: '✅ Çalıştı! greet void — sadece konsola yazar, değer döndürmez, çağıran değişkene atayamaz. add int — hesaplar ve return ile döndürür. Python\'daki def add(a, b): return a+b ile birebir aynı mantık.',
    en: '✅ It ran! greet is void — only writes to console, returns no value, caller cannot assign it. add is int — calculates and returns with return. Exact same logic as Python\'s def add(a, b): return a+b.',
  },
  hints: [
    { tr: '🔍 İpucu 1 — Neden hata: static int add(...) yazıyor — bu metod int döndürmek ZORUNDA. Ama metodun içinde return yok → "missing return statement" compile hatası.', en: '🔍 Hint 1 — Why the error: static int add(...) is declared — this method MUST return an int. But there is no return inside → "missing return statement" compile error.' },
    { tr: '🔍 İpucu 2 — Neyi döndür: a ve b parametreleri toplamı döndürmeli.', en: '🔍 Hint 2 — What to return: the sum of parameters a and b must be returned.' },
    { tr: '✏️ İpucu 3 — Çözüm: int sum = a + b; satırından sonra return sum; veya doğrudan return a + b; yaz.', en: '✏️ Hint 3 — Solution: After int sum = a + b; write return sum; or directly write return a + b;' },
  ],
  buggyCode: `public class Main {

    static void greet(String name) {
        System.out.println("Merhaba, " + name + "!");
    }

    static int add(int a, int b) {
        int sum = a + b;
        // return eksik! compile hatası: missing return statement
    }

    public static void main(String[] args) {
        greet("QA");
        int result = add(5, 3);
        System.out.println("5 + 3 = " + result);
    }
}`,
  fixedCode: `public class Main {

    static void greet(String name) {
        System.out.println("Merhaba, " + name + "!");
    }

    static int add(int a, int b) {
        return a + b; // hesapla VE döndür
    }

    public static void main(String[] args) {
        greet("QA");
        int result = add(5, 3);
        System.out.println("5 + 3 = " + result);
    }
}`,
}

const javaStepAnimationMethodCall = {
  type: 'step-animation',
  title: { tr: '🎬 add(5, 3) çağrısı nasıl akar? — parametre → body → return', en: '🎬 How does the add(5, 3) call flow? — parameter → body → return' },
  steps: [
    {
      id: 1,
      icon: '📞',
      label: { tr: 'int result = add(5, 3) çağrıldı', en: 'int result = add(5, 3) is called' },
      detail: {
        tr: 'main metodunda bu satır çalıştı. Java yürütme kontrolünü add metoduna devreder. 5 ve 3 argümanları birlikte gönderilir.',
        en: 'This line ran inside main. Java transfers execution control to the add method. Arguments 5 and 3 are sent along.',
      },
    },
    {
      id: 2,
      icon: '📥',
      label: { tr: 'a=5, b=3 parametrelere atandı', en: 'a=5, b=3 assigned to parameters' },
      detail: {
        tr: 'add metoduna girildi: int a = 5, int b = 3. a ve b yerel değişken — sadece bu metod içinde yaşar. main\'deki değişkenler etkilenmez.',
        en: 'Entered the add method: int a = 5, int b = 3. a and b are local variables — they only live inside this method. Variables in main are not affected.',
      },
    },
    {
      id: 3,
      icon: '⚙️',
      label: { tr: 'a + b = 8 hesaplandı', en: 'a + b = 8 calculated' },
      detail: {
        tr: 'return a + b satırı: önce a + b = 5 + 3 = 8 hesaplanır. Sonra bu değer çağırana gönderilir.',
        en: 'Line return a + b: first a + b = 5 + 3 = 8 is calculated. Then this value is sent back to the caller.',
      },
    },
    {
      id: 4,
      icon: '↩️',
      label: { tr: 'return 8 → main\'e döndü', en: 'return 8 → returned to main' },
      detail: {
        tr: 'Dönen 8 değeri main\'deki int result değişkenine atandı. add metodunun stack frame\'i temizlendi — a ve b artık yok.',
        en: 'The returned value 8 is assigned to int result in main. The add method\'s stack frame is cleared — a and b no longer exist.',
      },
    },
    {
      id: 5,
      icon: '🖨️',
      label: { tr: 'println("5 + 3 = 8") çalıştı', en: 'println("5 + 3 = 8") runs' },
      detail: {
        tr: '"5 + 3 = " + result → result=8 olduğu için "5 + 3 = 8" yazdırıldı. Python\'da def add(a,b): return a+b → result = add(5,3) ile birebir aynı akış.',
        en: '"5 + 3 = " + result → since result=8, "5 + 3 = 8" is printed. Exact same flow as Python\'s def add(a,b): return a+b → result = add(5,3).',
      },
    },
  ],
}

const javaChallengeOrderMethodAnatomy = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-method-anatomy-01',
  question: {
    tr: '🔀 static int add(int a, int b) { return a+b; } metodunun 5 anatomik parçasını doğru sıraya sürükle.',
    en: '🔀 Drag the 5 anatomical parts of the method static int add(int a, int b) { return a+b; } into the correct order.',
  },
  items: [
    { id: '1', text: { tr: 'static  ← erişim/davranış belirleyici (nesnesiz çağrılır)', en: 'static  ← access/behavior modifier (called without object)' }, order: 1 },
    { id: '2', text: { tr: 'int  ← dönüş tipi (void ise hiçbir şey dönmez)', en: 'int  ← return type (void means nothing is returned)' }, order: 2 },
    { id: '3', text: { tr: 'add  ← metod adı (camelCase, fiil)', en: 'add  ← method name (camelCase, verb)' }, order: 3 },
    { id: '4', text: { tr: '(int a, int b)  ← parametre listesi (tip + isim)', en: '(int a, int b)  ← parameter list (type + name)' }, order: 4 },
    { id: '5', text: { tr: '{ return a + b; }  ← gövde ve return ifadesi', en: '{ return a + b; }  ← body and return statement' }, order: 5 },
  ],
  xpReward: 15,
}

// ─── sF: Advanced OOP Teaching Blocks ────────────────────────────────────────

const javaPlaygroundEnum = {
  type: 'code-playground',
    relatedTopicId: 'java-enum-01',
  id: 'java-enum-01',
  xpReward: 20,
  label: { tr: '🎯 Egzersiz 7 — switch fall-through tuzağı: break eksikliği', en: '🎯 Exercise 7 — switch fall-through trap: missing break' },
  task: {
    tr: '1️⃣ "▶ Çalıştır" — QA ortamının URL\'si görünsün.\n2️⃣ "🐛 Bozuk Testi Düzelt" moduna geç — case "QA"\'da break eksik; QA URL yazdıktan sonra PROD URL da yazdırılıyor (fall-through).\n3️⃣ Hedef: switch\'te her case break ile bitmeli. break olmadan Java bir sonraki case\'e düşer (fall-through) — bu QA testinde yanlış ortam URL\'si kullanılmasına neden olabilir.',
    en: '1️⃣ Press "▶ Run" — see the QA environment URL.\n2️⃣ Switch to "🐛 Fix the Failing Test" — break is missing in case "QA"; after printing QA URL it also prints PROD URL (fall-through).\n3️⃣ Goal: Every case in switch must end with break. Without break Java falls through to the next case — in QA testing this can mean the wrong environment URL is used.',
  },
  language: 'java',
  code: `public class Main {
    public static void main(String[] args) {
        String env = "QA";
        switch (env) {
            case "QA":
                System.out.println("URL: https://qa.example.com");
                break;
            case "PROD":
                System.out.println("URL: https://prod.example.com");
                break;
            default:
                System.out.println("URL: https://dev.example.com");
        }
    }
}`,
  expected: 'URL: https://qa.example.com',
  explanation: {
    tr: '✅ Sadece QA URL yazdırıldı! break switch\'ten çıkışı sağlar. Java 14+ switch expression sözdizimi (case "QA" -> ...) fall-through sorununu tamamen ortadan kaldırır — break yazmana gerek kalmaz.',
    en: '✅ Only QA URL was printed! break exits the switch. Java 14+ switch expression syntax (case "QA" -> ...) completely eliminates the fall-through problem — no need to write break.',
  },
  hints: [
    { tr: '🔍 İpucu 1 — Fall-through nedir: case "QA": bloğundan sonra break yoksa Java otomatik olarak case "PROD": bloğuna geçer ve onu da çalıştırır. Her iki URL da yazdırılır.', en: '🔍 Hint 1 — What is fall-through: if there is no break after the case "QA": block Java automatically moves to the case "PROD": block and runs it too. Both URLs are printed.' },
    { tr: '🔍 İpucu 2 — Nereye break ekle: println("URL: https://qa.example.com") satırından hemen sonra break; ekle.', en: '🔍 Hint 2 — Where to add break: add break; immediately after the println("URL: https://qa.example.com") line.' },
    { tr: '✏️ İpucu 3 — Çözüm: case "QA": bloğuna break; ekle. Ya da Java 14+ sözdizimini kullan: case "QA" -> System.out.println("URL: https://qa.example.com");', en: '✏️ Hint 3 — Solution: Add break; to case "QA": block. Or use Java 14+ syntax: case "QA" -> System.out.println("URL: https://qa.example.com");' },
  ],
  buggyCode: `public class Main {
    public static void main(String[] args) {
        String env = "QA";
        switch (env) {
            case "QA":
                System.out.println("URL: https://qa.example.com");
                // break eksik! fall-through başlıyor
            case "PROD":
                System.out.println("URL: https://prod.example.com");
                break;
            default:
                System.out.println("URL: https://dev.example.com");
        }
    }
}`,
  fixedCode: `public class Main {
    public static void main(String[] args) {
        String env = "QA";
        switch (env) {
            case "QA":
                System.out.println("URL: https://qa.example.com");
                break; // fall-through önlendi
            case "PROD":
                System.out.println("URL: https://prod.example.com");
                break;
            default:
                System.out.println("URL: https://dev.example.com");
        }
    }
}`,
}

const javaStepAnimationEnum = {
  type: 'step-animation',
  title: { tr: '🎬 switch fall-through — break olmayınca ne olur?', en: '🎬 switch fall-through — what happens without break?' },
  steps: [
    {
      id: 1,
      icon: '🔀',
      label: { tr: 'switch(env) başladı', en: 'switch(env) started' },
      detail: {
        tr: 'env = "QA". Java switch\'e girdi ve case\'leri yukarıdan aşağı eşleştiriyor. case "DEV": → eşleşme yok, atlandı.',
        en: 'env = "QA". Java entered switch and is matching cases from top to bottom. case "DEV": → no match, skipped.',
      },
    },
    {
      id: 2,
      icon: '✅',
      label: { tr: 'case "QA": eşleşti', en: 'case "QA": matched' },
      detail: {
        tr: '"QA" == "QA" → eşleşme! case "QA": bloğu çalışır. println yazdırıldı.',
        en: '"QA" == "QA" → match! The case "QA": block runs. println is printed.',
      },
    },
    {
      id: 3,
      icon: '⚠️',
      label: { tr: 'break yok → fall-through!', en: 'No break → fall-through!' },
      detail: {
        tr: 'case "QA": bloğunun sonunda break yoksa Java durmaz. Bir sonraki case "PROD": bloğuna GİRER — koşulu kontrol ETMEDEN! Bu Java\'nın tasarım özelliği — eski C dilinden miras.',
        en: 'If there is no break at the end of case "QA": Java does not stop. It ENTERS the next case "PROD": block — WITHOUT checking the condition! This is a Java design feature inherited from old C language.',
      },
    },
    {
      id: 4,
      icon: '❌',
      label: { tr: 'case "PROD": de çalıştı!', en: 'case "PROD": also ran!' },
      detail: {
        tr: 'PROD URL da yazdırıldı. env = "QA" olmasına rağmen! Bu QA testinde yanlış ortam URL\'si kullanılması demek — kritik hata. break ile case\'ten çık veya Java 14+ → syntax kullan.',
        en: 'PROD URL was also printed. Even though env = "QA"! This means using the wrong environment URL in QA testing — critical bug. Exit case with break or use Java 14+ → syntax.',
      },
    },
    {
      id: 5,
      icon: '🛡️',
      label: { tr: 'break ile korunma', en: 'Protection with break' },
      detail: {
        tr: 'case "QA": bloğuna break; eklendi → Java switch\'ten çıkar, case "PROD": asla çalışmaz. Java 14+: case "QA" -> println("...") sözdizimi otomatik break içerir, fall-through mümkün değildir.',
        en: 'break; added to case "QA": block → Java exits switch, case "PROD": never runs. Java 14+: case "QA" -> println("...") syntax includes automatic break, fall-through is not possible.',
      },
    },
  ],
}

const javaChallengeOrderTryCatch = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-try-catch-01',
  question: {
    tr: '🔀 Java try-catch-finally bloğunun 3 kısmını doğru sıraya sürükle. Yanlış sırada compile hatası alırsın.',
    en: '🔀 Drag the 3 parts of a Java try-catch-finally block into the correct order. Wrong order gives a compile error.',
  },
  items: [
    { id: '1', text: { tr: 'try { driver.findElement(By.id("btn")).click(); }  ← riskli kod', en: 'try { driver.findElement(By.id("btn")).click(); }  ← risky code' }, order: 1 },
    { id: '2', text: { tr: 'catch (NoSuchElementException e) { System.out.println(e.getMessage()); }  ← hata yakala', en: 'catch (NoSuchElementException e) { System.out.println(e.getMessage()); }  ← catch error' }, order: 2 },
    { id: '3', text: { tr: 'finally { driver.quit(); }  ← her durumda çalışır, kaynakları kapat', en: 'finally { driver.quit(); }  ← always runs, close resources' }, order: 3 },
  ],
  xpReward: 15,
}

// ─── sCucumber: BDD Teaching Blocks ──────────────────────────────────────────

const javaPlaygroundCucumber = {
  type: 'code-playground',
    relatedTopicId: 'java-cucumber-01',
  id: 'java-cucumber-01',
  xpReward: 20,
  label: { tr: '🥒 Egzersiz 8 — Cucumber: Given→When→Then adım sırası', en: '🥒 Exercise 8 — Cucumber: Given→When→Then step order' },
  task: {
    tr: '1️⃣ "▶ Çalıştır" — BDD akışının 3 adımını sırayla göster.\n2️⃣ "🐛 Bozuk Testi Düzelt" moduna geç — When, Given\'dan önce çağrılıyor; tarayıcı açılmadan giriş yapılmaya çalışılıyor.\n3️⃣ Hedef: Given (ortam kur) → When (aksiyon) → Then (sonuç doğrula) sırasını anla. Bu sıra hem okunabilirliği hem de test mantığını sağlar.',
    en: '1️⃣ Press "▶ Run" — show 3 steps of BDD flow in order.\n2️⃣ Switch to "🐛 Fix the Failing Test" — When is called before Given; trying to log in before the browser opens.\n3️⃣ Goal: Understand Given (set up environment) → When (action) → Then (verify result). This order provides both readability and test logic.',
  },
  language: 'java',
  code: {
    tr: `public class LoginSteps {

    void givenBrowserOpen() {
        System.out.println("1. Given: Tarayıcı açık, login sayfasında");
    }

    void whenUserLogsIn() {
        System.out.println("2. When: admin/admin123 ile giriş yapıldı");
    }

    void thenDashboardVisible() {
        System.out.println("3. Then: Dashboard göründü ✅");
    }

    public static void main(String[] args) {
        LoginSteps s = new LoginSteps();
        s.givenBrowserOpen();
        s.whenUserLogsIn();
        s.thenDashboardVisible();
    }
}`,
    en: `public class LoginSteps {

    void givenBrowserOpen() {
        System.out.println("1. Given: Browser open, on login page");
    }

    void whenUserLogsIn() {
        System.out.println("2. When: logged in with admin/admin123");
    }

    void thenDashboardVisible() {
        System.out.println("3. Then: Dashboard appeared ✅");
    }

    public static void main(String[] args) {
        LoginSteps s = new LoginSteps();
        s.givenBrowserOpen();
        s.whenUserLogsIn();
        s.thenDashboardVisible();
    }
}`,
  },
  expected: '1. Given: Tarayıcı açık, login sayfasında\n2. When: admin/admin123 ile giriş yapıldı\n3. Then: Dashboard göründü ✅',
  explanation: {
    tr: '✅ Given → When → Then sırası doğru! Bu sıra iş gereksinimini yansıtır: ortam hazır → aksiyon → kontrol. Cucumber feature dosyasında da aynı sıra hem PO\'ların hem QA\'nın anlayabileceği yaşayan belge oluşturur.',
    en: '✅ Given → When → Then order is correct! This order reflects the business requirement: environment ready → action → check. Same order in Cucumber feature files creates a living document both POs and QA can understand.',
  },
  hints: [
    { tr: '🔍 İpucu 1 — Mantık bozuldu: Bozuk versiyonda önce whenUserLogsIn() (giriş yap), sonra givenBrowserOpen() (tarayıcı aç). Tarayıcı açık değilken nasıl giriş yapılır?', en: '🔍 Hint 1 — Logic broken: In broken version whenUserLogsIn() (log in) comes before givenBrowserOpen() (open browser). How can you log in when the browser is not open?' },
    { tr: '🔍 İpucu 2 — Doğru sıra: 1.Given — ortamı hazırla 2.When — aksiyonu gerçekleştir 3.Then — sonucu doğrula.', en: '🔍 Hint 2 — Correct order: 1.Given — prepare environment 2.When — perform action 3.Then — verify result.' },
    { tr: '✏️ İpucu 3 — Çözüm: main içindeki çağrı sırasını givenBrowserOpen → whenUserLogsIn → thenDashboardVisible yap.', en: '✏️ Hint 3 — Solution: Reorder main calls to givenBrowserOpen → whenUserLogsIn → thenDashboardVisible.' },
  ],
  buggyCode: `public class LoginSteps {

    void givenBrowserOpen() {
        System.out.println("1. Given: Tarayıcı açık");
    }

    void whenUserLogsIn() {
        System.out.println("2. When: Giriş yapıldı");
    }

    void thenDashboardVisible() {
        System.out.println("3. Then: Dashboard ✅");
    }

    public static void main(String[] args) {
        LoginSteps s = new LoginSteps();
        s.whenUserLogsIn();      // yanlış sıra!
        s.givenBrowserOpen();   // yanlış sıra!
        s.thenDashboardVisible();
    }
}`,
  fixedCode: `public class LoginSteps {

    void givenBrowserOpen() {
        System.out.println("1. Given: Tarayıcı açık");
    }

    void whenUserLogsIn() {
        System.out.println("2. When: Giriş yapıldı");
    }

    void thenDashboardVisible() {
        System.out.println("3. Then: Dashboard ✅");
    }

    public static void main(String[] args) {
        LoginSteps s = new LoginSteps();
        s.givenBrowserOpen();   // doğru: önce ortam
        s.whenUserLogsIn();     // sonra aksiyon
        s.thenDashboardVisible(); // sonra doğrulama
    }
}`,
}

const javaStepAnimationCucumberFlow = {
  type: 'step-animation',
  title: { tr: '🎬 Cucumber perde arkasında nasıl çalışır? — Feature → Step Def → Test', en: '🎬 How does Cucumber work behind the scenes? — Feature → Step Def → Test' },
  steps: [
    {
      id: 1,
      icon: '📄',
      label: { tr: 'Feature dosyası okunur', en: 'Feature file is read' },
      detail: {
        tr: 'login.feature okunur. Cucumber her Scenario: altındaki Given/When/Then satırlarını metin olarak ayrıştırır. Bu metinler Java metodlarına bağlanacak.',
        en: 'login.feature is read. Cucumber parses Given/When/Then lines under each Scenario: as text. These texts will be bound to Java methods.',
      },
    },
    {
      id: 2,
      icon: '🔍',
      label: { tr: '@Given annotation eşleşmesi aranır', en: '@Given annotation match is searched' },
      detail: {
        tr: '"tarayıcı açık ve login sayfasında" metni → @Given("tarayıcı açık ve login sayfasında") annotasyonlu Java metodunu ara. Eşleşme bulunmazsa Cucumber "Undefined step" hatası verir.',
        en: '"browser open on login page" text → look for a Java method annotated with @Given("browser open on login page"). If no match: Cucumber gives "Undefined step" error.',
      },
    },
    {
      id: 3,
      icon: '🚀',
      label: { tr: 'Step Definition metodu çalışır', en: 'Step Definition method runs' },
      detail: {
        tr: 'Eşleşen metod çalıştırılır: ChromeDriver başlatılır, URL\'ye gidilir. Selenium/Playwright komutları bu metodun içindedir. Cucumber akışı yönetir, teknik implementasyon Java\'da.',
        en: 'The matching method is executed: ChromeDriver starts, navigates to URL. Selenium/Playwright commands are inside this method. Cucumber manages the flow, technical implementation is in Java.',
      },
    },
    {
      id: 4,
      icon: '📊',
      label: { tr: 'Given → When → Then sırasıyla çalışır', en: 'Given → When → Then runs in sequence' },
      detail: {
        tr: 'Her adım için step def bulunur ve çalışır. Bir adım hata verirse Scenario FAILED olur, kalan adımlar atlanır. Hata mesajı feature dosyasındaki satıra işaret eder.',
        en: 'For each step a step def is found and runs. If a step throws an error the Scenario is FAILED, remaining steps are skipped. The error message points to the line in the feature file.',
      },
    },
    {
      id: 5,
      icon: '📋',
      label: { tr: 'HTML/JSON rapor üretilir', en: 'HTML/JSON report is generated' },
      detail: {
        tr: 'Her Scenario PASSED/FAILED olarak işaretlenir. Rapor iş analistleri için okunabilir Gherkin formatında. CI/CD bu raporun tamamına bakarak deploy kararı verir.',
        en: 'Each Scenario is marked PASSED/FAILED. Report is in readable Gherkin format for business analysts. CI/CD looks at this complete report to make the deploy decision.',
      },
    },
  ],
}

const javaChallengeOrderCucumber = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-cucumber-01',
  question: {
    tr: '🔀 Cucumber ile BDD testi yazmak için 5 adımı doğru sıraya sürükle.',
    en: '🔀 Drag the 5 steps for writing a BDD test with Cucumber into the correct order.',
  },
  items: [
    { id: '1', text: { tr: 'Feature: başlığını yaz — iş gereksinimi (.feature dosyası)', en: 'Write Feature: title — business requirement (.feature file)' }, order: 1 },
    { id: '2', text: { tr: 'Scenario: adını yaz — test senaryosu tanımı', en: 'Write Scenario: name — test scenario definition' }, order: 2 },
    { id: '3', text: { tr: 'Given / When / Then adımlarını yaz — Gherkin sözdizimi', en: 'Write Given / When / Then steps — Gherkin syntax' }, order: 3 },
    { id: '4', text: { tr: '@Given @When @Then step definition metodlarını yaz — Java bağlaması', en: 'Write @Given @When @Then step definition methods — Java binding' }, order: 4 },
    { id: '5', text: { tr: 'Runner sınıfı oluştur, mvn test ile çalıştır, raporu kontrol et', en: 'Create Runner class, run with mvn test, check report' }, order: 5 },
  ],
  xpReward: 20,
}

// ─── sPlaywright: Java Teaching Blocks ────────────────────────────────────────

const javaPlaygroundPlaywright = {
  type: 'code-playground',
    relatedTopicId: 'java-playwright-01',
  id: 'java-playwright-01',
  xpReward: 20,
  label: { tr: '🎭 Egzersiz 9 — Playwright Java: test adım sırası', en: '🎭 Exercise 9 — Playwright Java: test step order' },
  task: {
    tr: '1️⃣ "▶ Çalıştır" — Playwright test akışının 5 adımını sırayla göster.\n2️⃣ "🐛 Bozuk Testi Düzelt" moduna geç — assertThat navigate\'ten önce çağrılıyor; sayfa yüklenmeden title kontrolü yapılıyor, test yanlış FAIL.\n3️⃣ Hedef: navigate → locator → assert sırası zorunlu. Assert daima sayfa içeriği hazır olduktan SONRA gelir.',
    en: '1️⃣ Press "▶ Run" — show 5 steps of Playwright test flow in order.\n2️⃣ Switch to "🐛 Fix the Failing Test" — assertThat is called before navigate; title is checked before page loads, test incorrectly fails.\n3️⃣ Goal: navigate → locator → assert order is mandatory. Assert always comes AFTER page content is ready.',
  },
  language: 'java',
  code: {
    tr: `public class LoginTest {
    public static void main(String[] args) {
        System.out.println("1. Playwright.create() + browser.launch()");
        System.out.println("2. browser.newPage()");
        System.out.println("3. page.navigate('https://learnqa.dev/login')");
        System.out.println("4. assertThat(page).hasTitle('Login') → PASS ✅");
        System.out.println("5. try-with-resources → browser kapandı");
    }
}`,
    en: `public class LoginTest {
    public static void main(String[] args) {
        System.out.println("1. Playwright.create() + browser.launch()");
        System.out.println("2. browser.newPage()");
        System.out.println("3. page.navigate('https://learnqa.dev/login')");
        System.out.println("4. assertThat(page).hasTitle('Login') → PASS ✅");
        System.out.println("5. try-with-resources → browser closed");
    }
}`,
  },
  expected: '1. Playwright.create() + browser.launch()\n2. browser.newPage()\n3. page.navigate(\'https://learnqa.dev/login\')\n4. assertThat(page).hasTitle(\'Login\') → PASS ✅\n5. try-with-resources → browser kapandı',
  explanation: {
    tr: '✅ Doğru sıra! Playwright\'ta assertThat(page).hasTitle() akıllı bekleme içerir — başlık hazır olana kadar otomatik bekler. Selenium\'da buna explicit WebDriverWait gerekirdi. Sıra önemli: navigate olmadan title undefined.',
    en: '✅ Correct order! In Playwright assertThat(page).hasTitle() includes smart waiting — it auto-waits until the title is ready. Selenium would need an explicit WebDriverWait for this. Order matters: title is undefined without navigate.',
  },
  hints: [
    { tr: '🔍 İpucu 1 — Neden fail: Bozuk versiyonda assertThat navigate\'ten önce. Sayfa henüz yüklenmemiş — title boş ya da hatalı. Playwright assertion başarısız, test FAIL.', en: '🔍 Hint 1 — Why fail: In broken version assertThat comes before navigate. Page not loaded yet — title is empty or wrong. Playwright assertion fails, test FAIL.' },
    { tr: '🔍 İpucu 2 — Kural: Her zaman önce navigate, sonra assert. Playwright otomatik bekleyebilir ama içerik yokken bekleyecek bir şey de yok.', en: '🔍 Hint 2 — Rule: Always navigate first, then assert. Playwright can auto-wait but there is nothing to wait for if there is no content.' },
    { tr: '✏️ İpucu 3 — Çözüm: navigate satırını assertThat satırından ÖNCE koy.', en: '✏️ Hint 3 — Solution: Place the navigate line BEFORE the assertThat line.' },
  ],
  buggyCode: `public class LoginTest {
    public static void main(String[] args) {
        System.out.println("1. Playwright.create() + browser.launch()");
        System.out.println("2. browser.newPage()");
        // Yanlış: navigate OLMADAN assert!
        System.out.println("3. assertThat(page).hasTitle('Login') → FAIL ❌");
        System.out.println("4. page.navigate('https://learnqa.dev/login')");
        System.out.println("5. try-with-resources → browser kapandı");
    }
}`,
  fixedCode: `public class LoginTest {
    public static void main(String[] args) {
        System.out.println("1. Playwright.create() + browser.launch()");
        System.out.println("2. browser.newPage()");
        System.out.println("3. page.navigate('https://learnqa.dev/login')");
        System.out.println("4. assertThat(page).hasTitle('Login') → PASS ✅");
        System.out.println("5. try-with-resources → browser kapandı");
    }
}`,
}

const javaStepAnimationPlaywrightFlow = {
  type: 'step-animation',
  title: { tr: '🎬 Playwright Java test yaşam döngüsü — adım adım', en: '🎬 Playwright Java test lifecycle — step by step' },
  steps: [
    {
      id: 1,
      icon: '🚀',
      label: { tr: 'Playwright.create() + browser.launch()', en: 'Playwright.create() + browser.launch()' },
      detail: {
        tr: 'try(Playwright pw = Playwright.create()) → Playwright kontrolör başlatıldı. pw.chromium().launch() → Chromium binary çalıştırıldı. Selenium\'da ChromeDriver başlatmakla aynı, ama binary otomatik yönetilir.',
        en: 'try(Playwright pw = Playwright.create()) → Playwright controller started. pw.chromium().launch() → Chromium binary runs. Same as starting ChromeDriver in Selenium, but binary is managed automatically.',
      },
    },
    {
      id: 2,
      icon: '🌐',
      label: { tr: 'browser.newPage() + page.navigate(url)', en: 'browser.newPage() + page.navigate(url)' },
      detail: {
        tr: 'Page page = browser.newPage() → yeni sekme. page.navigate("https://...") → URL\'ye git. Playwright sayfa tam yüklenene kadar otomatik bekler — Selenium\'daki pageLoadStrategy gibi ama daha akıllı.',
        en: 'Page page = browser.newPage() → new tab. page.navigate("https://...") → go to URL. Playwright auto-waits until the page is fully loaded — like Selenium\'s pageLoadStrategy but smarter.',
      },
    },
    {
      id: 3,
      icon: '🔍',
      label: { tr: 'page.locator() — tarif tutar, arama yapmaz', en: 'page.locator() — holds recipe, does not search' },
      detail: {
        tr: 'page.locator("#username") → CSS/text/XPath selector. Locator hemen DOM\'da aramaz — sadece tarifi tutar. .click() .fill() .textContent() gibi aksiyon yapıldığında element aranır ve hazır olana kadar otomatik beklenir.',
        en: 'page.locator("#username") → CSS/text/XPath selector. Locator does not search the DOM immediately — it just holds the recipe. When an action like .click() .fill() .textContent() is performed, element is searched and auto-waited until ready.',
      },
    },
    {
      id: 4,
      icon: '⚖️',
      label: { tr: 'assertThat(locator) akıllı bekler', en: 'assertThat(locator) waits smartly' },
      detail: {
        tr: 'assertThat(page.locator(".message")).isVisible() → Playwright koşul sağlanana kadar bekler (default 5sn). Selenium\'da assertEquals + WebDriverWait gerekirdi. Fail olursa JUnit test FAILED.',
        en: 'assertThat(page.locator(".message")).isVisible() → Playwright waits until condition is met (default 5s). Selenium would need assertEquals + WebDriverWait. If it fails JUnit marks test FAILED.',
      },
    },
    {
      id: 5,
      icon: '🔒',
      label: { tr: 'try-with-resources → otomatik temizlik', en: 'try-with-resources → automatic cleanup' },
      detail: {
        tr: 'try(Playwright pw = ...) bloğu bitince pw.close() otomatik çağrılır, browser ve tüm sayfalar kapanır. AfterAll\'da browser.close() yazmana gerek yok. Java AutoCloseable garantisi.',
        en: 'When try(Playwright pw = ...) block ends, pw.close() is automatically called, browser and all pages close. No need to write browser.close() in AfterAll. Java AutoCloseable guarantee.',
      },
    },
  ],
}

const javaChallengeOrderPlaywright = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-java-order-playwright-01',
  question: {
    tr: '🔀 Bir Playwright Java testinin 5 adımını doğru sıraya sürükle. assert navigate\'ten önce gelirse test yanlış FAIL olur.',
    en: '🔀 Drag the 5 steps of a Playwright Java test into the correct order. If assert comes before navigate the test incorrectly fails.',
  },
  items: [
    { id: '1', text: { tr: 'Playwright.create() + browser.launch()  ← browser başlat', en: 'Playwright.create() + browser.launch()  ← start browser' }, order: 1 },
    { id: '2', text: { tr: 'browser.newPage() + page.navigate(url)  ← sayfayı yükle', en: 'browser.newPage() + page.navigate(url)  ← load the page' }, order: 2 },
    { id: '3', text: { tr: 'page.locator(selector)  ← element tarifi yaz (arama yapmaz)', en: 'page.locator(selector)  ← write element recipe (does not search)' }, order: 3 },
    { id: '4', text: { tr: 'assertThat(locator).isVisible()  ← akıllı bekleme + assertion', en: 'assertThat(locator).isVisible()  ← smart wait + assertion' }, order: 4 },
    { id: '5', text: { tr: 'try-with-resources biter → browser otomatik kapanır', en: 'try-with-resources ends → browser auto-closes' }, order: 5 },
  ],
  xpReward: 20,
}

// ─── Blok grupları ─────────────────────────────────────────────────────────────

const javaSyntaxTeachingBlocks = [
  javaPlaygroundMainMethod,
  javaStepAnimationMainExecution,
  javaChallengeOrderMainStructure,
  javaChallengeMainSignature,
  javaChallengeBugSpotSemicolon,
]

const javaStringsTeachingBlocks = [
  javaPlaygroundStringMethods,
  javaStepAnimationStringImmutable,
  javaChallengeOrderStringChain,
]

const javaControlFlowTeachingBlocks = [
  javaPlaygroundIfElse,
  javaStepAnimationIfElse,
  javaChallengeOrderIfElse,
]

const javaArraysTeachingBlocks = [
  javaPlaygroundArrays,
  javaStepAnimationArrayMemory,
  javaChallengeOrderArrayLifecycle,
]

const javaMethodsTeachingBlocks = [
  javaPlaygroundMethods,
  javaStepAnimationMethodCall,
  javaChallengeOrderMethodAnatomy,
]

const javaOopTeachingBlocks = [
  javaStepAnimationObjectLifecycle,
  javaChallengeOrderOopCreation,
]

const javaAdvancedOopTeachingBlocks = [
  javaPlaygroundEnum,
  javaStepAnimationEnum,
  javaChallengeOrderTryCatch,
]

const javaFrameworkTeachingBlocks = [
  javaInteractiveDiagramTestLayers,
  javaStepAnimationJUnitLifecycle,
  javaStepAnimationMavenLifecycle,
  javaPlaygroundJUnitAssertion,
  javaStepAnimationAssertionFlow,
  javaChallengeOrderJUnitTest,
  javaGoodVsBadPrintAssert,
  javaChallengeFillAssertEquals,
  javaChallengeMavenOrder,
]

const javaCucumberTeachingBlocks = [
  javaPlaygroundCucumber,
  javaStepAnimationCucumberFlow,
  javaChallengeOrderCucumber,
]

const javaSeleniumTeachingBlocks = [
  javaGoodVsBadSleepWait,
  javaStepAnimationWebDriverWait,
  javaChallengeOrderWebDriverWait,
]

const javaPlaywrightTeachingBlocks = [
  javaPlaygroundPlaywright,
  javaStepAnimationPlaywrightFlow,
  javaChallengeOrderPlaywright,
]

const javaRealWorldTeachingBlocks = [
  javaInteractiveDiagramTestLayers,
  javaStepAnimationMavenLifecycle,
]

function withExtraBlocks(section, extraBlocks) {
  return {
    ...section,
    blocks: [...section.blocks, ...extraBlocks],
  }
}

export const javaData = {
  tr: {
    hero: {
      title: '☕ Java — QA Mühendisi Rehberi',
      subtitle: 'JDK 21 · Maven · JUnit5 · TestNG · Cucumber · Selenium · Playwright · REST Assured',
      intro: 'Java\'yı QA perspektifinden öğren: temel sözdiziminden production-grade altyapıya, Cucumber BDD\'den Selenium ve Playwright adım adım kullanımına, 50 mülakat sorusuyla hazır ol.',
    },
    tabs: [
      '☕ Giriş',
      '⚙️ Kurulum',
      '📝 Temel Sözdizimi',
      '🔤 Strings & Math',
      '🔀 Akış Kontrolü',
      '📦 Arrays',
      '🔧 Methods',
      '🏗️ OOP & Collections',
      '🎯 Advanced OOP',
      '🧪 Test Frameworkleri',
      '🥒 Cucumber',
      '🌐 Selenium',
      '🎭 Playwright',
      '🛠️ Gerçek Hayat',
      '🔗 Ekosistem',
      '🚨 Yaygın Hatalar',
      '📁 File & Threads',
      '🧠 Adım Adım Soru Çözücü',
      '💼 Mülakat Soruları',
    ],
    sections: [
      s0.tr,
      s1.tr,
      withExtraBlocks(sA.tr, javaSyntaxTeachingBlocks),
      withExtraBlocks(sB.tr, javaStringsTeachingBlocks),
      withExtraBlocks(sC.tr, javaControlFlowTeachingBlocks),
      withExtraBlocks(sD.tr, javaArraysTeachingBlocks),
      withExtraBlocks(sE.tr, javaMethodsTeachingBlocks),
      withExtraBlocks(s2.tr, javaOopTeachingBlocks),
      withExtraBlocks(sF.tr, javaAdvancedOopTeachingBlocks),
      withExtraBlocks(s3.tr, javaFrameworkTeachingBlocks),
      withExtraBlocks(sCucumber.tr, javaCucumberTeachingBlocks),
      withExtraBlocks(sSelenium.tr, javaSeleniumTeachingBlocks),
      withExtraBlocks(sPlaywright.tr, javaPlaywrightTeachingBlocks),
      withExtraBlocks(s4.tr, javaRealWorldTeachingBlocks),
      s5.tr,
      s6.tr,
      sFileIO.tr,
      sInteractivePractice.tr,
      s7.tr,
    ],
  },
  en: {
    hero: {
      title: '☕ Java — QA Engineer\'s Guide',
      subtitle: 'JDK 21 · Maven · JUnit5 · TestNG · Cucumber · Selenium · Playwright · REST Assured',
      intro: 'Learn Java from a QA perspective: basic syntax to production-grade infrastructure, BDD with Cucumber, step-by-step Selenium & Playwright, ready with 50 interview questions.',
    },
    tabs: [
      '☕ Introduction',
      '⚙️ Installation',
      '📝 Basic Syntax',
      '🔤 Strings & Math',
      '🔀 Control Flow',
      '📦 Arrays',
      '🔧 Methods',
      '🏗️ OOP & Collections',
      '🎯 Advanced OOP',
      '🧪 Test Frameworks',
      '🥒 Cucumber',
      '🌐 Selenium',
      '🎭 Playwright',
      '🛠️ Real World',
      '🔗 Ecosystem',
      '🚨 Common Errors',
      '📁 File & Threads',
      '🧠 Step-by-Step Solver',
      '💼 Interview Questions',
    ],
    sections: [
      s0.en,
      s1.en,
      withExtraBlocks(sA.en, javaSyntaxTeachingBlocks),
      withExtraBlocks(sB.en, javaStringsTeachingBlocks),
      withExtraBlocks(sC.en, javaControlFlowTeachingBlocks),
      withExtraBlocks(sD.en, javaArraysTeachingBlocks),
      withExtraBlocks(sE.en, javaMethodsTeachingBlocks),
      withExtraBlocks(s2.en, javaOopTeachingBlocks),
      withExtraBlocks(sF.en, javaAdvancedOopTeachingBlocks),
      withExtraBlocks(s3.en, javaFrameworkTeachingBlocks),
      withExtraBlocks(sCucumber.en, javaCucumberTeachingBlocks),
      withExtraBlocks(sSelenium.en, javaSeleniumTeachingBlocks),
      withExtraBlocks(sPlaywright.en, javaPlaywrightTeachingBlocks),
      withExtraBlocks(s4.en, javaRealWorldTeachingBlocks),
      s5.en,
      s6.en,
      sFileIO.en,
      sInteractivePractice.en,
      s7.en,
    ],
  },
}

fillMissingCodeTrios(javaData, 'java')


