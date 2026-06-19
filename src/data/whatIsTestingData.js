const sections = [
  // ── 0. INTRO & WHY ──────────────────────────────────────────────────────────
  {
    title: { tr: '🎯 Giriş & Yazılım Testinin Önemi', en: '🎯 Intro & Why Testing Matters' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🛡️',
        content: {
          tr: "Yazılım testi, yeni üretilen bir arabanın otobana çıkmadan önce frenlerinin, hava yastıklarının ve motorunun kontrol edilmesine benzer. Test edilmemiş bir yazılım, ne zaman çökeceği bilinmeyen bir saatli bomba gibidir. Test uzmanları (tester'lar), sistemin sadece 'çalıştığını' değil, en zor koşullarda bile 'doğru çalıştığını' garanti eder.",
          en: "Software testing is like checking a new car's brakes, airbags, and engine before it hits the highway. Untested software is a ticking time bomb. Software testers ensure that the system not only 'works' but 'works correctly' under the toughest conditions."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Testi Nedir?', en: 'What is Software Testing?' }
      },
      {
        type: 'text',
        content: {
          tr: 'Yazılım testi; bir yazılım uygulamasının kalitesini ölçmek, hataları (bug) tespit etmek ve yazılımın iş gereksinimlerine uygun olduğunu doğrulamak amacıyla yürütülen sistematik bir süreçtir. Sadece kod yazıldıktan sonra yapılan bir aktivite değil, yazılım geliştirme yaşam döngüsünün (SDLC) her aşamasında yer alan kritik bir disiplindir.',
          en: 'Software testing is a systematic process conducted to measure the quality of a software application, identify defects (bugs), and verify that it meets business requirements. It is not just an activity performed after coding, but a critical discipline integrated throughout the Software Development Life Cycle (SDLC).'
        }
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Testinin Amaçları Nelerdir?', en: 'What are the Objectives of Testing?' }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🐛',
            label: { tr: 'Hataları Bulmak', en: 'Finding Defects' },
            desc: { tr: 'Uygulama canlıya çıkmadan önce gizli hataları tespit edip düzeltilmesini sağlamak.', en: 'Detecting hidden issues and ensuring they are fixed before the application goes live.' }
          },
          {
            icon: '🤝',
            label: { tr: 'Güven Kazanmak', en: 'Gaining Confidence' },
            desc: { tr: 'Yazılımın kalitesi ve belirlenen gereksinimleri karşıladığı konusunda paydaşlara güven vermek.', en: 'Providing stakeholders with confidence in the quality and compliance of the software.' }
          },
          {
            icon: '🛑',
            label: { tr: 'Hataları Önlemek', en: 'Preventing Defects' },
            desc: { tr: 'Gereksinimler analiz edilirken mantık hatalarını erken fark edip kodlama aşamasında hata yapılmasını önlemek.', en: 'Identifying logic flaws early during requirement analysis to prevent bugs from being coded.' }
          },
          {
            icon: '📊',
            label: { tr: 'Kalite Seviyesini Raporlamak', en: 'Reporting Quality Level' },
            desc: { tr: 'Yöneticilere ve müşterilere ürünün durumu hakkında objektif veri sunmak.', en: 'Providing managers and clients with objective data about the state of the product.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Testi Olmasaydı Ne Olurdu? (Somut Felaket Örnekleri)', en: 'What If We Didn\'t Test? (Real-World Disasters)' }
      },
      {
        type: 'text',
        content: {
          tr: 'Tarih, yeterince test edilmeyen yazılımların şirketleri iflasa sürüklediği, milyonlarca dolarlık kayıplara ve hatta can kayıplarına yol açtığı somut örneklerle doludur:',
          en: 'History is full of concrete examples where insufficiently tested software drove companies to bankruptcy, caused millions of dollars in losses, or even resulted in loss of life:'
        }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Olay', en: 'Event' },
          { tr: 'Hatanın Nedeni', en: 'Root Cause' },
          { tr: 'Sonuç & Zarar', en: 'Impact & Cost' }
        ],
        rows: [
          [
            { tr: 'Knight Capital Group (2012)', en: 'Knight Capital Group (2012)' },
            { tr: 'Yeni kod canlıya alınırken eski sistemdeki bir bayrağın (flag) yanlış yorumlanması ve regression testlerinin eksikliği.', en: 'An unused configuration flag was re-enabled in a deployment without adequate regression testing.' },
            { tr: 'Sistem 45 dakikada milyonlarca hatalı işlem yaptı; şirket 440 Milyon Dolar zarar ederek iflas etti.', en: 'The system made millions of unintended trades in 45 minutes; the firm lost $440 Million and collapsed.' }
          ],
          [
            { tr: 'Ariane 5 Roketi (1996)', en: 'Ariane 5 Flight 501 (1996)' },
            { tr: '64-bitlik kayan noktalı (double) bir sayının 16-bitlik tam sayıya (integer) dönüştürülmesi sırasında oluşan taşma (overflow) hatası. Entegrasyon testi yapılmadı.', en: 'A 64-bit floating-point value was cast to a 16-bit signed integer, causing a data overflow. Missing integration testing.' },
            { tr: 'Roket kalkıştan 40 saniye sonra patladı. Kayıp: 370 Milyon Dolar.', en: 'The launcher self-destructed 40 seconds after launch. Cost: $370 Million.' }
          ],
          [
            { tr: 'Therac-25 Cihazı (1985)', en: 'Therac-25 Radiation Machine (1985)' },
            { tr: 'Yazılımdaki eşzamanlılık (race condition) hatası nedeniyle dozaj hesaplamasının yanlış yapılması. Yetersiz sistem testi.', en: 'A race condition in the software caused incorrect dosage calculations. Lack of end-to-end system testing.' },
            { tr: 'Hastalara aşırı dozda radyasyon verildi; 3 kişi hayatını kaybetti, birçok kişi ağır yaralandı.', en: 'Patients received massive radiation overdoses; 3 deaths and multiple severe injuries.' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Firmalara Faydası Nedir? (ROI - Yatırım Getirisi)', en: 'What is the Business Benefit? (ROI - Return on Investment)' }
      },
      {
        type: 'text',
        content: {
          tr: "Bir hatayı kod yazılırken bulmanın maliyeti 1 birim ise, test aşamasında bulmak 10 birim, canlıya (üretime) çıktıktan sonra bulup düzeltmek 100 birimdir. Erken test etmek şirketlere doğrudan milyonlarca lira tasarruf sağlar, marka itibarını korur ve müşteri memnuniyetini en üst düzeyde tutar.",
          en: "If finding a bug during coding costs 1 unit, finding it during testing costs 10 units, and fixing it in production costs 100 units. Early testing saves companies millions of dollars, protects brand reputation, and keeps customers satisfied."
        }
      },
      {
        type: 'visual',
        variant: 'boxes',
        title: { tr: 'Hata Bulma Maliyetinin SDLC Aşamalarına Göre Artışı', en: 'Cost of Finding a Bug Across SDLC Phases' },
        items: [
          { icon: '📝', label: { tr: 'Gereksinimler', en: 'Requirements' }, desc: { tr: '1x Maliyet', en: '1x Cost' } },
          { arrow: true },
          { icon: '💻', label: { tr: 'Kodlama / Geliştirme', en: 'Development' }, desc: { tr: '5x Maliyet', en: '5x Cost' } },
          { arrow: true },
          { icon: '🧪', label: { tr: 'QA / Test Aşaması', en: 'QA / Testing' }, desc: { tr: '15x Maliyet', en: '15x Cost' } },
          { arrow: true },
          { icon: '🚀', label: { tr: 'Üretim / Canlı', en: 'Production' }, desc: { tr: '100x+ Maliyet', en: '100x+ Cost' }, highlight: true }
        ],
        note: {
          tr: 'Hata ne kadar geç bulunursa, mimari değişiklik, yeniden kodlama, veritabanı temizleme ve müşteri kaybı gibi faktörlerden dolayı düzeltme maliyeti katlanarak artar.',
          en: 'The later a bug is caught, the cost of correction increases exponentially due to redesign, recoding, data cleanup, and customer attrition.'
        }
      },
      {
        type: 'quiz',
        question: {
          tr: 'Yazılım testinin en önemli finansal gerekçesi aşağıdakilerden hangisidir?',
          en: 'What is the primary financial justification for software testing?'
        },
        options: [
          { id: 'a', text: { tr: 'Test uzmanlarının geliştiricilerden daha az maaş alması.', en: 'Testers earn lower salaries than developers.' } },
          { id: 'b', text: { tr: 'Hataları erken bulmanın düzeltme maliyetini katlanarak düşürmesi.', en: 'Finding defects early reduces the cost of correction exponentially.' } },
          { id: 'c', text: { tr: 'Müşterilerin hatasız yazılımlara daha çok para ödemesi.', en: 'Customers pay more money for bug-free software.' } },
          { id: 'd', text: { tr: 'Test araçlarının tamamen ücretsiz olması.', en: 'Testing tools are completely free of charge.' } }
        ],
        correct: 'b',
        explanation: {
          tr: 'Yazılım geliştirme yaşam döngüsünde (SDLC) hataları analiz veya geliştirme aşamasında bulup çözmek, canlı ortamda (production) bulmaktan kat kat daha ucuzdur.',
          en: 'Catching and resolving bugs during requirements or development is orders of magnitude cheaper than resolving them in production.'
        }
      }
    ]
  },

  // ── 1. ISTQB & FOUNDATIONS ──────────────────────────────────────────────────
  {
    title: { tr: '📖 ISTQB & Test Temelleri', en: '📖 ISTQB & Testing Core' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '📖',
        content: {
          tr: "ISTQB, dünya genelinde yazılım testi standartlarını belirleyen uluslararası bir kuruluştur. Tıpkı tıp veya inşaat mühendisliğinde olduğu gibi, yazılım testinin de evrensel kuralları (7 İlke), test seviyeleri ve test tipleri vardır. Bu standartları bilmek, dünyanın her yerindeki ekiplerle ortak dilde konuşmanızı sağlar.",
          en: "ISTQB is the international organization that standardizes software testing principles globally. Just like medicine or civil engineering, software testing has universal rules (7 Principles), test levels, and test types. Knowing these standards helps you communicate effectively in any engineering team worldwide."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Testinin 7 Temel İlkesi', en: 'The 7 Principles of Software Testing' }
      },
      {
        type: 'text',
        content: {
          tr: 'ISTQB tarafından tanımlanan bu 7 kural, her test mühendisinin felsefesi olmalıdır:',
          en: 'These 7 principles defined by ISTQB should guide every test engineer\'s mindset:'
        }
      },
      {
        type: 'list',
        icon: '📌',
        items: [
          {
            label: { tr: '1. Test hataların varlığını gösterir, yokluğunu değil', en: '1. Testing shows the presence of defects, not their absence' },
            desc: { tr: 'Testler sistemde hata bulabilir ama sistemin %100 hatasız olduğunu kanıtlayamaz.', en: 'Testing can show that defects are present, but cannot prove that there are no remaining defects.' }
          },
          {
            label: { tr: '2. Eksiksiz (tüm olasılıkları) test etmek imkansızdır', en: '2. Exhaustive testing is impossible' },
            desc: { tr: 'Her kombinasyonu test etmek sonsuz zaman alır. Risk analizi ve önceliklendirme şarttır.', en: 'Testing everything (all combinations of inputs and preconditions) is not feasible. Risk analysis is required.' }
          },
          {
            label: { tr: '3. Erken test zaman ve para kazandırır', en: '3. Early testing saves time and money' },
            desc: { tr: 'Test faaliyetleri SDLC başlar başlamaz, henüz kod yazılmadan (doküman inceleme ile) başlamalıdır.', en: 'Testing should start as early as possible in the SDLC to find issues before they are coded.' }
          },
          {
            label: { tr: '4. Hatalar belirli alanlarda kümelenir', en: '4. Defects cluster together' },
            desc: { tr: 'Hataların %80\'i sistemin %20\'lik karmaşık modüllerinde bulunur (Pareto İlkesi).', en: 'A small number of modules usually contain most of the defects discovered (80/20 rule).' }
          },
          {
            label: { tr: '5. Tarım ilacı paradoksuna dikkat edin (Pesticide Paradox)', en: '5. Beware of the pesticide paradox' },
            desc: { tr: 'Aynı testleri defalarca koşarsanız yeni hatalar bulamazsınız. Test senaryoları sürekli güncellenmelidir.', en: 'If the same tests are repeated, they will eventually stop finding new defects. Tests must be revised.' }
          },
          {
            label: { tr: '6. Test bağlama bağımlıdır', en: '6. Testing is context dependent' },
            desc: { tr: 'Bir e-ticaret sitesiyle, bir kalp pili yazılımı veya nükleer santral kontrol yazılımı aynı yöntemlerle test edilemez.', en: 'Testing is done differently in different contexts (e.g., e-commerce app vs. safety-critical medical software).' }
          },
          {
            label: { tr: '7. Hata olmaması yanılgısı', en: '7. Absence-of-errors fallacy' },
            desc: { tr: 'Sıfır hatalı bir uygulama yapsanız bile, eğer kullanıcı ihtiyaçlarını karşılamıyorsa o sistem başarısızdır.', en: 'Finding and fixing defects does not help if the system is unusable and does not fulfill user needs.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Statik Test vs Dinamik Test', en: 'Static Testing vs Dynamic Testing' }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Özellik', en: 'Feature' },
          { tr: 'Statik Test (Static Testing)', en: 'Static Testing' },
          { tr: 'Dinamik Test (Dynamic Testing)', en: 'Dynamic Testing' }
        ],
        rows: [
          [
            { tr: 'Kodun Çalıştırılması', en: 'Code Execution' },
            { tr: 'Kod veya doküman çalıştırılmaz.', en: 'Code is NOT executed.' },
            { tr: 'Kod çalıştırılarak test edilir.', en: 'Code IS executed.' }
          ],
          [
            { tr: 'Yapılan Aktivite', en: 'Activity' },
            { tr: 'Gereksinim analizi, kod inceleme (code review), tasarım kontrolü.', en: 'Requirements review, design check, code reviews.' },
            { tr: 'Fonksiyonel testler, performans testleri, otomasyon koşumları.', en: 'Functional testing, performance runs, UI/API automation.' }
          ],
          [
            { tr: 'Amaç', en: 'Goal' },
            { tr: 'Daha kodlama yapılmadan mantık hatalarını ve eksiklikleri bulmak.', en: 'To prevent bugs and logical flaws before coding begins.' },
            { tr: 'Uygulamanın çalışma anındaki hatalarını ve çökmelerini yakalamak.', en: 'To identify runtime failures, UI glitches, and API errors.' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Test Seviyeleri', en: 'Levels of Software Testing' }
      },
      {
        type: 'grid',
        cols: 4,
        items: [
          {
            icon: '📦',
            label: { tr: 'Birim Testi (Unit Testing)', en: 'Unit Testing' },
            desc: { tr: 'En küçük kod parçalarının (metotlar, sınıflar) genellikle yazılımcılar tarafından izole şekilde test edilmesidir. Java\'da JUnit ile yazılır.', en: 'Testing individual components (methods, classes) in isolation. Typically written by developers using JUnit/TestNG.' }
          },
          {
            icon: '⚙️',
            label: { tr: 'Entegrasyon (Integration)', en: 'Integration Testing' },
            desc: { tr: 'Farklı modüllerin birbirleriyle iletişiminin test edilmesidir. Örneğin, UI\'ın veritabanına veri yazması veya API\'ların birbiriyle konuşması.', en: 'Testing the interactions between integrated modules or systems, such as database or API connections.' }
          },
          {
            icon: '🖥️',
            label: { tr: 'Sistem Testi (System Testing)', en: 'System Testing' },
            desc: { tr: 'Uygulamanın uçtan uca (E2E), tüm özellikleri entegre edilmiş şekilde, gerçek kullanıcı senaryolarıyla fonksiyonel ve performans yönüyle test edilmesidir.', en: 'Testing the fully integrated software product end-to-end to verify it meets functional and non-functional specifications.' }
          },
          {
            icon: '🎓',
            label: { tr: 'Kabul Testi (Acceptance)', en: 'Acceptance Testing' },
            desc: { tr: 'Sistemin teslimata hazır olup olmadığını doğrulamak amacıyla son kullanıcılar (UAT) veya iş birimleri tarafından yapılan son test seviyesidir.', en: 'Determining whether the system satisfies its acceptance criteria and is ready for production deployment.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Test Tipleri: Fonksiyonel vs Fonksiyonel Olmayan', en: 'Test Types: Functional vs Non-Functional' }
      },
      {
        type: 'text',
        content: {
          tr: 'Yazılım testleri, testin odağına göre iki ana gruba ayrılır. Fonksiyonel testler sistemin ne yaptığını (sayfa açılıyor mu, login olunuyor mu), fonksiyonel olmayan testler ise sistemin bu işi ne kadar iyi yaptığını (hızlı mı, güvenli mi, yük altında çöküyor mu) ölçer.',
          en: 'Tests are divided into two categories. Functional testing verifies *what* the system does (e.g. login, payment). Non-functional testing evaluates *how well* the system performs (speed, security, stability under heavy load).'
        }
      },
      {
        type: 'quiz',
        question: {
          tr: 'Bir web sitesine 10.000 kullanıcının aynı anda girmesi durumunda sitenin yanıt verme hızını ölçen test türü aşağıdakilerden hangisine girer?',
          en: 'Which testing category evaluates a website\'s response time under 10,000 concurrent users?'
        },
        options: [
          { id: 'a', text: { tr: 'Fonksiyonel Test (Kullanıcı Giriş Testi)', en: 'Functional Testing (Login Flow)' } },
          { id: 'b', text: { tr: 'Birim Testi (Unit Testing)', en: 'Unit Testing' } },
          { id: 'c', text: { tr: 'Fonksiyonel Olmayan Test (Performans/Yük Testi)', en: 'Non-Functional Testing (Performance/Load Test)' } },
          { id: 'd', text: { tr: 'Kabul Testi (Acceptance Testing)', en: 'Acceptance Testing' } }
        ],
        correct: 'c',
        explanation: {
          tr: 'Sistemin yük, stres, yanıt süresi ve ölçeklenebilirlik gibi davranışlarını inceleyen testler, fonksiyonel olmayan testlerin (Non-Functional Testing) altındaki Performans Testleri alanına girer.',
          en: 'Evaluating system behavior under heavy load, stress, and response times falls under Performance Testing, which is a subcategory of Non-Functional Testing.'
        }
      }
    ]
  },

  // ── 2. QA vs QC ─────────────────────────────────────────────────────────────
  {
    title: { tr: '🛡️ Quality Assurance (QA) Nedir?', en: '🛡️ Quality Assurance (QA) vs QC' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🍳',
        content: {
          tr: "Bunu bir mutfak örneğiyle açıklayalım: Kalite Güvence (QA), mutfağın temiz olmasını, aşçıların bone takmasını ve malzemelerin taze olmasını sağlayan süreçtir (Önleyici). Kalite Kontrol (QC), pişen yemeği masaya gitmeden önce tadan ve tuzu azsa mutfağa geri gönderen süreçtir (Bulucu). Test ise yemeği tabağa koyup kaşığı daldırma eyleminin kendisidir.",
          en: "Let's use a kitchen analogy: Quality Assurance (QA) is the set of processes that ensures the kitchen is sanitary, chefs wear hairnets, and ingredients are fresh (Preventative). Quality Control (QC) is tasting the cooked dish before it goes to the customer, rejecting it if it is too salty (Detective). Testing is the actual act of taking a bite to check it."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Quality Assurance (QA) ne demektir?', en: 'What does Quality Assurance mean?' }
      },
      {
        type: 'text',
        content: {
          tr: 'Quality Assurance (Kalite Güvence), yazılım geliştirme sürecinin kalitesini artırmaya ve standartları belirlemeye odaklanan, süreç yönelimli (process-oriented) bir disiplindir. Amacı, geliştirme aşamasında hataların en başından ortaya çıkmasını önlemektir (Defect Prevention).',
          en: 'Quality Assurance (QA) is a process-oriented discipline focused on improving the software development process and setting quality standards. Its primary goal is to prevent defects from occurring in the first place (Defect Prevention).'
        }
      },
      {
        type: 'heading',
        text: { tr: 'QA, QC ve Test Arasındaki Farklar', en: 'Differences Between QA, QC, and Testing' }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Karşılaştırma Noktası', en: 'Comparison point' },
          { tr: 'Kalite Güvence (QA)', en: 'Quality Assurance (QA)' },
          { tr: 'Kalite Kontrol (QC)', en: 'Quality Control (QC)' },
          { tr: 'Yazılım Testi (Testing)', en: 'Software Testing' }
        ],
        rows: [
          [
            { tr: 'Odak Noktası', en: 'Focus' },
            { tr: 'Süreç (Süreci iyileştirerek hata oluşumunu önlemek)', en: 'Process (Preventing defects by improving the process)' },
            { tr: 'Ürün (Nihai üründeki hataları bulup ayıklamak)', en: 'Product (Finding defects in the final product)' },
            { tr: 'Aktivite (Kodu çalıştırıp bug aramak)', en: 'Activity (Running code and looking for bugs)' }
          ],
          [
            { tr: 'Yaklaşım', en: 'Approach' },
            { tr: 'Önleyici (Proactive - Preventative)', en: 'Preventative (Proactive)' },
            { tr: 'Bulucu (Reactive - Detective)', en: 'Detective (Reactive)' },
            { tr: 'Doğrulayıcı (Verification)', en: 'Verification' }
          ],
          [
            { tr: 'Sorumluluk', en: 'Responsibility' },
            { tr: 'Tüm proje ekibi (Analist, Geliştirici, Test Uzmanı)', en: 'Entire project team (Analyst, Dev, Tester)' },
            { tr: 'Test Uzmanları / Kalite Ekibi', en: 'Testing Team / QC inspectors' },
            { tr: 'Test Mühendisleri', en: 'Test Engineers' }
          ],
          [
            { tr: 'Örnek Aktivite', en: 'Example Activity' },
            { tr: 'Kod standartlarını belirleme, dokümantasyon inceleme, süreç denetimi.', en: 'Defining code standards, reviewing specs, auditing processes.' },
            { tr: 'Çalışan uygulamanın gereksinimlere uyup uymadığını kontrol etme.', en: 'Verifying if the working application meets the specifications.' },
            { tr: 'Selenium/Playwright ile script koşma, butonları tıklama, log inceleme.', en: 'Executing Selenium/Playwright scripts, clicking buttons, inspecting logs.' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Geliştirme Yaşam Döngüsünde (SDLC) QA\'in Yeri', en: 'The Role of QA in the SDLC' }
      },
      {
        type: 'text',
        content: {
          tr: 'Modern yazılım dünyasında test uzmanları artık kod yazımı bittikten sonra devreye giren kişiler değildir. Çevik (Agile/Scrum) yöntemlerde QA mühendisleri gereksinimlerin yazıldığı ilk günden itibaren projededir. Yanlış veya eksik yazılmış bir gereksinimi analiz toplantısında fark edip düzeltmek, kod yazıldıktan sonra çıkacak onlarca hatayı daha doğmadan engeller.',
          en: 'In modern software teams, QA engineers are no longer downstream operators waiting for coding to finish. In Agile/Scrum environments, QA engineers participate from day one. Catching a requirement error during design saves dozens of future coding bugs from being created.'
        }
      },
      {
        type: 'quiz',
        question: {
          tr: 'Yazılım geliştirme sürecinin kalitesini iyileştirerek hataların oluşmasını en baştan önlemeyi hedefleyen disiplin hangisidir?',
          en: 'Which discipline focuses on preventing defects by improving the software development process itself?'
        },
        options: [
          { id: 'a', text: { tr: 'Kalite Kontrol (Quality Control)', en: 'Quality Control (QC)' } },
          { id: 'b', text: { tr: 'Yazılım Testi (Testing)', en: 'Software Testing' } },
          { id: 'c', text: { tr: 'Kalite Güvence (Quality Assurance)', en: 'Quality Assurance (QA)' } },
          { id: 'd', text: { tr: 'Sistem Entegrasyonu (System Integration)', en: 'System Integration' } }
        ],
        correct: 'c',
        explanation: {
          tr: 'Quality Assurance (QA) süreç odaklıdır ve hataları önlemeye (defect prevention) odaklanır. Quality Control (QC) ise ürün odaklıdır ve mevcut hataları bulmaya (defect detection) çalışır.',
          en: 'Quality Assurance (QA) is process-oriented and focuses on defect prevention. Quality Control (QC) is product-oriented and focuses on defect detection.'
        }
      }
    ]
  },

  // ── 3. SDET & AUTOMATION ────────────────────────────────────────────────────
  {
    title: { tr: '💻 SDET ve Otomasyon Nedir?', en: '💻 What is SDET & Automation?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '💻',
        content: {
          tr: "Manuel Test uzmanı, kapıdaki güvenlik görevlisinin gelen herkesi tek tek aramasına benzer. Test Otomasyon Mühendisi, kişilerin kart basarak geçebileceği otomatik turnikeyi kuran kişidir. SDET (Software Development Engineer in Test) ise turnikenin yazılımını yazan, bunu şirketin veritabanıyla konuşturan, sunucu çöktüğünde otomatik ayağa kalkacak sistemi kuran mühendistir.",
          en: "A Manual Tester is like a security guard manually checking everyone at the gate. An Automation Engineer builds an automatic badge scanner. An SDET (Software Development Engineer in Test) is the engineer who writes the scanner firmware, integrates it with the employee database, and builds a self-healing cluster for when servers fail."
        }
      },
      {
        type: 'heading',
        text: { tr: 'SDET Ne Demektir?', en: 'What does SDET mean?' }
      },
      {
        type: 'text',
        content: {
          tr: "SDET (Software Development Engineer in Test), hem yazılım geliştirici (developer) seviyesinde kod yazabilen hem de bir test uzmanının ürün kalitesini sorgulayan vizyonuna sahip hibrit bir mühendislik rolüdür. SDET'ler sadece test koşmazlar; testleri koşturacak otomasyon altyapılarını, test framework'lerini ve CI/CD (Continuous Integration/Continuous Deployment) entegrasyonlarını sıfırdan inşa ederler.",
          en: "SDET stands for Software Development Engineer in Test. It is a hybrid role requiring the coding skills of a software developer combined with the quality-focused mindset of a test engineer. SDETs do not just execute test cases; they architect test automation frameworks and build continuous integration (CI/CD) pipelines from scratch."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Manuel Tester vs Otomasyon Mühendisi vs SDET', en: 'Manual Tester vs Automation Engineer vs SDET' }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Kriter', en: 'Criteria' },
          { tr: 'Manuel Test Uzmanı', en: 'Manual Tester' },
          { tr: 'Otomasyon Mühendisi', en: 'Automation Engineer' },
          { tr: 'SDET', en: 'SDET' }
        ],
        rows: [
          [
            { tr: 'Kod Yazma Becerisi', en: 'Coding Skill' },
            { tr: 'Gerekmiyor (Temel seviye)', en: 'No programming (Basic scripting)' },
            { tr: 'Orta Seviye (Selenium/Playwright ile test yazma)', en: 'Intermediate (Writing scripts in Selenium/Playwright)' },
            { tr: 'İleri Seviye (OOP, Tasarım Şablonları, Algoritmalar)', en: 'Advanced (OOP, Design Patterns, Algorithms)' }
          ],
          [
            { tr: 'Ana Sorumluluk', en: 'Core Focus' },
            { tr: 'Kullanıcı gözüyle test, UX kontrolü, keşif testleri.', en: 'Exploratory testing, usability, manual execution.' },
            { tr: 'Mevcut manuel senaryoları kod diline dönüştürmek.', en: 'Automating existing manual test cases.' },
            { tr: 'Test altyapısı kurmak, framework yazmak, birim testleri incelemek.', en: 'Architecting frameworks, code review, performance testing, tooling.' }
          ],
          [
            { tr: 'CI/CD & DevOps Katılımı', en: 'CI/CD & DevOps' },
            { tr: 'Çok az / Yok', en: 'Minimal / None' },
            { tr: 'Orta (Jenkins\'te hazır test tetiklemek)', en: 'Moderate (Triggering tests in Jenkins)' },
            { tr: 'Çok Yüksek (Pipeline kurma, Dockerize etme, Kubernetes yönetimi)', en: 'High (Designing pipelines, Dockerization, Kubernetes clusters)' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'SDET Olmak İçin Hangi Beceriler Gerekir?', en: 'Required Skills for an SDET' }
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          {
            icon: '☕',
            label: { tr: 'Programlama Dilleri', en: 'Programming Languages' },
            desc: { tr: "Java, Python, TypeScript gibi en az bir dilde 'Temiz Kod' yazabilmek.", en: "Strong command of at least one programming language like Java, Python, or TypeScript." }
          },
          {
            icon: '🚀',
            label: { tr: 'Otomasyon Araçları', en: 'Automation Frameworks' },
            desc: { tr: 'Selenium WebDriver, Playwright, REST Assured, Appium gibi sektör standartlarında uzmanlık.', en: 'Expertise in industry-standard tools like Selenium, Playwright, REST Assured, and Appium.' }
          },
          {
            icon: '♾️',
            label: { tr: 'CI/CD & DevOps', en: 'CI/CD & DevOps' },
            desc: { tr: 'Jenkins, GitHub Actions, Docker ve Git kullanımı ile testleri pipeline\'a bağlamak.', en: 'Integrating tests into automation pipelines using Jenkins, GitHub Actions, Docker, and Git.' }
          },
          {
            icon: '🗄️',
            label: { tr: 'SQL & Veritabanı', en: 'SQL & Database' },
            desc: { tr: 'Veritabanı düzeyinde sorgular yazıp backend durumunu doğrulayabilmek.', en: 'Writing database queries to validate backend state and ensure data integrity.' }
          },
          {
            icon: '🧠',
            label: { tr: 'Tasarım Şablonları', en: 'Design Patterns' },
            desc: { tr: "Page Object Model (POM), Singleton, Factory gibi otomasyonda kod tekrarını azaltan yapılar.", en: 'Implementing Page Object Model (POM), Singleton, and Factory patterns to reduce code duplication.' }
          },
          {
            icon: '🛡️',
            label: { tr: 'Mülakat & Kalite Vizyonu', en: 'Quality Mindset' },
            desc: { tr: 'Nerede bug çıkabileceğini kestirme, risk analizi yapma ve sınır değerleri (boundary) test edebilme.', en: 'Understanding edge cases, boundary values, risk analysis, and software architecture.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Java Kullanan QA Mühendisleri İçin SDET Perspektifi', en: 'SDET Perspective for Java-Based QA Engineers' }
      },
      {
        type: 'text',
        content: {
          tr: "Java, kurumsal şirketlerin test otomasyonlarında en çok tercih ettiği dildir. Bir Java QA mühendisi, sadece `driver.findElement` yazmakla kalmaz; Java'nın OOP (Nesne Yönelimli Programlama) prensiplerini kullanarak ölçeklenebilir, bakımı kolay framework'ler yazar. Örneğin, test raporlarını otomatik gönderen, paralel çalışabilen ve hata anında otomatik ekran görüntüsü alan sistemleri Java Collection ve Concurrency yapılarıyla inşa eder.",
          en: "Java is the most popular language for enterprise test automation. A Java QA engineer does not just write `driver.findElement`. They leverage OOP (Object-Oriented Programming) concepts to build robust, scalable frameworks. Using Java Collections and Concurrency, they design frameworks that run tests in parallel, handle failures gracefully, and auto-capture screenshots upon test failures."
        }
      },
      {
        type: 'quiz',
        question: {
          tr: "Bir yazılım projesinde test otomasyon mimarisini sıfırdan tasarlayan, testleri Docker üzerinde ayağa kaldıran ve CI/CD pipeline'ını kurgulayan role ne ad verilir?",
          en: "Which role is responsible for designing automation architectures from scratch, dockerizing test suites, and setting up CI/CD pipelines?"
        },
        options: [
          { id: 'a', text: { tr: 'Manuel Test Uzmanı (Manual QA)', en: 'Manual QA Tester' } },
          { id: 'b', text: { tr: 'SDET (Software Development Engineer in Test)', en: 'SDET' } },
          { id: 'c', text: { tr: 'İş Analisti (Business Analyst)', en: 'Business Analyst' } },
          { id: 'd', text: { tr: 'Proje Yöneticisi (Project Manager)', en: 'Project Manager' } }
        ],
        correct: 'b',
        explanation: {
          tr: "SDET'ler ileri seviye kodlama, mimari tasarım, DevOps araçları (Docker, CI/CD) entegrasyonu ve framework oluşturma yetkinliklerine sahip test mühendisleridir.",
          en: "SDETs are test engineers equipped with advanced software development capabilities, systems design, DevOps integration (Docker, CI/CD), and framework engineering."
        }
      }
    ]
  },

  // ── 4. WEB, MOBILE & PROCESS ────────────────────────────────────────────────
  {
    title: { tr: '🌐 Web, Mobil Test & Süreçler', en: '🌐 Web, Mobile Testing & Process' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🍽️',
        content: {
          tr: "Bir web sitesini restoran gibi düşün: müşterinin gördüğü masalar, menü ve dekorasyon UI/Frontend'dir. Siparişi hazırlayan mutfak Backend'dir. Malzemelerin saklandığı depo Database'dir. Garson ise siparişi mutfağa taşıyıp yemeği müşteriye getiren API'dir — iki tarafın birbirini görmeden konuşmasını sağlar.",
          en: "Think of a website like a restaurant: the dining room, menu, and decor the customer sees is the UI/Frontend. The kitchen preparing the order is the Backend. The pantry storing ingredients is the Database. The waiter carrying orders between the kitchen and the customer is the API — letting two sides talk without seeing each other directly."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Bir Web Uygulaması Hangi Katmanlardan Oluşur?', en: 'What Layers Make Up a Web Application?' }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🎨',
            label: { tr: 'UI / Frontend Nedir?', en: 'What is UI / Frontend?' },
            desc: { tr: "Kullanıcının tarayıcıda gördüğü ve etkileşime girdiği her şey: butonlar, formlar, sayfa tasarımı. HTML/CSS/JavaScript (React, Angular, Vue) ile yazılır. Test ederken locator'larla element bulunup tıklama/yazma işlemleri doğrulanır.", en: 'Everything the user sees and interacts with in the browser: buttons, forms, page layout. Built with HTML/CSS/JavaScript (React, Angular, Vue). Testing it means locating elements and verifying clicks/inputs behave correctly.' }
          },
          {
            icon: '⚙️',
            label: { tr: 'Backend Nedir?', en: 'What is the Backend?' },
            desc: { tr: 'Kullanıcının görmediği, iş mantığını çalıştıran sunucu tarafı kod. İstekleri (request) işler, kuralları uygular, veritabanıyla konuşur. Java (Spring Boot), Python (Django/Flask), Node.js gibi dillerle yazılır.', en: 'The server-side code the user never sees, running business logic. Processes requests, applies rules, talks to the database. Written in Java (Spring Boot), Python (Django/Flask), Node.js, etc.' }
          },
          {
            icon: '🗄️',
            label: { tr: 'Database Nedir?', en: 'What is a Database?' },
            desc: { tr: 'Kullanıcı bilgileri, siparişler, ürünler gibi verilerin kalıcı olarak saklandığı sistem. MySQL/PostgreSQL gibi ilişkisel (SQL) veya MongoDB gibi NoSQL olabilir. Test ederken UI üzerinde yapılan işlemin veritabanına doğru yazılıp yazılmadığı kontrol edilir.', en: 'The system where user info, orders, products, etc. are permanently stored. Can be relational (SQL) like MySQL/PostgreSQL or NoSQL like MongoDB. Testing it means verifying that UI actions are correctly persisted in the database.' }
          },
          {
            icon: '🔌',
            label: { tr: 'API Nedir?', en: 'What is an API?' },
            desc: { tr: "Frontend ile Backend'in veya iki farklı sistemin birbiriyle konuşmasını sağlayan kurallar bütünü. Genellikle REST (HTTP + JSON) şeklindedir. Postman veya REST Assured ile UI'a hiç dokunmadan doğrudan test edilebilir.", en: 'The set of rules that lets the frontend and backend (or two different systems) talk to each other. Usually REST (HTTP + JSON). Can be tested directly with Postman or REST Assured without touching the UI at all.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Web Testi Nedir?', en: 'What is Web Testing?' }
      },
      {
        type: 'text',
        content: {
          tr: 'Web testi; bir web uygulamasının fonksiyonel olarak doğru çalıştığını (linkler, formlar, butonlar), farklı tarayıcılarda (Chrome, Firefox, Safari) ve farklı ekran boyutlarında (responsive) doğru göründüğünü, hızlı yüklendiğini ve güvenli olduğunu doğrulayan test sürecidir. Selenium ve Playwright gibi araçlar, bir kullanıcının yapacağı tıklama ve yazma işlemlerini otomatik olarak tekrarlayarak bu testleri yapar.',
          en: 'Web testing verifies that a web application works correctly functionally (links, forms, buttons), renders correctly across browsers (Chrome, Firefox, Safari) and screen sizes (responsive), loads fast, and is secure. Tools like Selenium and Playwright automate the clicks and inputs a real user would perform to run these checks.'
        }
      },
      {
        type: 'heading',
        text: { tr: 'Mobil Uygulama Testi Nedir, Nasıl Yapılır?', en: 'What is Mobile App Testing & How is it Done?' }
      },
      {
        type: 'text',
        content: {
          tr: "Mobil test, bir uygulamanın Android ve iOS gibi farklı işletim sistemlerinde, farklı ekran boyutu ve donanımlara sahip cihazlarda doğru çalıştığını doğrular. Üç uygulama tipi vardır: Native (Kotlin/Swift ile yazılan, mağazadan indirilen), Hybrid (tek kod tabanından hem Android hem iOS'a derlenen, React Native/Flutter gibi) ve Mobil Web (tarayıcıda açılan responsive site). Appium gibi araçlar, Selenium'a çok benzer bir mantıkla gerçek cihaz veya emülatör üzerinde dokunma, kaydırma (swipe) gibi gerçek kullanıcı hareketlerini otomatikleştirir.",
          en: "Mobile testing verifies that an app works correctly across different operating systems (Android, iOS) and devices with varying screen sizes and hardware. There are three app types: Native (written in Kotlin/Swift, downloaded from a store), Hybrid (compiled from one codebase to both platforms, e.g. React Native/Flutter), and Mobile Web (a responsive site opened in a browser). Tools like Appium, working very similarly to Selenium, automate real user gestures like tapping and swiping on real devices or emulators."
        }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Uygulama Tipi', en: 'App Type' },
          { tr: 'Nasıl Yazılır?', en: 'How is it Built?' },
          { tr: 'Nasıl Test Edilir?', en: 'How is it Tested?' }
        ],
        rows: [
          [
            { tr: 'Native', en: 'Native' },
            { tr: 'Kotlin/Java (Android), Swift (iOS) ile platforma özel yazılır.', en: 'Written natively per platform: Kotlin/Java (Android), Swift (iOS).' },
            { tr: 'Appium + platforma özel locator (resource-id, accessibility id) ile.', en: 'With Appium, using platform-specific locators (resource-id, accessibility id).' }
          ],
          [
            { tr: 'Hybrid', en: 'Hybrid' },
            { tr: 'React Native, Flutter gibi tek kod tabanıyla her iki platforma derlenir.', en: 'Compiled to both platforms from one codebase, e.g. React Native, Flutter.' },
            { tr: 'Appium aynı test mantığıyla çoğunlukla her iki platformda da çalışır.', en: 'Appium tests largely work on both platforms with the same logic.' }
          ],
          [
            { tr: 'Mobil Web', en: 'Mobile Web' },
            { tr: 'Normal web teknolojileriyle (HTML/CSS/JS) yazılır, tarayıcıda açılır.', en: 'Built with standard web tech (HTML/CSS/JS), opened in a browser.' },
            { tr: 'Selenium/Playwright ile, mobil tarayıcı emülasyonu (responsive mode) kullanılarak.', en: 'With Selenium/Playwright, using mobile browser emulation (responsive mode).' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'DevOps Nedir? Amacı Nedir?', en: 'What is DevOps and What is its Purpose?' }
      },
      {
        type: 'text',
        content: {
          tr: "DevOps (Development + Operations), yazılımı geliştiren (Dev) ve canlı ortamda çalıştıran (Ops) ekipleri birleştiren bir kültür ve pratikler bütünüdür. Amacı, kod yazıldıktan sonra üretime (production) çıkana kadar geçen süreci otomatikleştirip hızlandırmak, hataları erken yakalamak ve sık, güvenli sürümler (release) yapabilmektir. Jenkins gibi araçlarla kurulan CI/CD (Continuous Integration/Continuous Deployment) pipeline'ları, kod her push edildiğinde otomatik build + test + deploy adımlarını çalıştırır. Docker ve Kubernetes ise bu uygulamaların her ortamda (geliştirici bilgisayarı, test sunucusu, canlı) aynı şekilde çalışmasını garanti eder.",
          en: "DevOps (Development + Operations) is a culture and set of practices that unifies the teams building software (Dev) and running it in production (Ops). Its goal is to automate and accelerate the path from code to production, catch issues early, and enable frequent, safe releases. CI/CD (Continuous Integration/Continuous Deployment) pipelines built with tools like Jenkins automatically run build + test + deploy steps on every code push. Docker and Kubernetes guarantee that these applications run identically across every environment (a developer's laptop, a test server, production)."
        }
      },
      {
        type: 'visual',
        variant: 'boxes',
        title: { tr: 'DevOps Döngüsü (Basitleştirilmiş)', en: 'The DevOps Loop (Simplified)' },
        items: [
          { icon: '📝', label: { tr: 'Planla', en: 'Plan' }, desc: { tr: 'Gereksinim', en: 'Requirement' } },
          { arrow: true },
          { icon: '💻', label: { tr: 'Geliştir', en: 'Code' }, desc: { tr: 'Backend/Frontend', en: 'Backend/Frontend' } },
          { arrow: true },
          { icon: '🧪', label: { tr: 'Test Et', en: 'Test' }, desc: { tr: 'Selenium/API', en: 'Selenium/API' } },
          { arrow: true },
          { icon: '📦', label: { tr: 'Paketle', en: 'Build' }, desc: { tr: 'Docker image', en: 'Docker image' } },
          { arrow: true },
          { icon: '🚀', label: { tr: 'Dağıt', en: 'Deploy' }, desc: { tr: 'Kubernetes', en: 'Kubernetes' }, highlight: true },
          { arrow: true },
          { icon: '📡', label: { tr: 'İzle', en: 'Monitor' }, desc: { tr: 'Loglar/Metrikler', en: 'Logs/Metrics' } }
        ],
        note: {
          tr: "Bu döngü Jenkins/GitHub Actions gibi CI/CD araçlarıyla otomatikleştirilir; her adımda otomatik test koşulmazsa hatalar canlıya kadar fark edilmeyebilir.",
          en: "This loop is automated with CI/CD tools like Jenkins/GitHub Actions; without automated tests at each step, defects may go unnoticed until production."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Agile Nedir? Scrum Nedir?', en: 'What is Agile? What is Scrum?' }
      },
      {
        type: 'text',
        content: {
          tr: "Agile (Çevik), büyük bir projeyi tek seferde teslim etmek yerine küçük, sürekli geri bildirim alınan parçalara (sprint) bölerek geliştirme felsefesidir. Scrum ise Agile felsefesini uygulamak için kullanılan en yaygın çerçevedir (framework): iş genellikle 2 haftalık sprint'lere bölünür, her sprint planlama, günlük kısa toplantı (daily stand-up), sprint sonu demo (review) ve retrospektif ile yönetilir. Eski Waterfall (Şelale) modelinde ise tüm gereksinimler en başta belirlenir, test aşaması en sona bırakılır — bu da hataların çok geç fark edilmesine yol açar.",
          en: "Agile is a development philosophy that breaks a large project into small, continuously reviewed pieces (sprints) instead of delivering everything at once. Scrum is the most common framework for applying Agile: work is typically split into 2-week sprints, each managed with sprint planning, daily stand-ups, a sprint review/demo, and a retrospective. In the older Waterfall model, all requirements are fixed upfront and testing is pushed to the very end — meaning bugs are caught far too late."
        }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Özellik', en: 'Feature' },
          { tr: 'Waterfall (Şelale)', en: 'Waterfall' },
          { tr: 'Agile / Scrum', en: 'Agile / Scrum' }
        ],
        rows: [
          [
            { tr: 'Test ne zaman yapılır?', en: 'When is testing done?' },
            { tr: 'Sadece en sonda, geliştirme bitince.', en: 'Only at the very end, after development finishes.' },
            { tr: 'Her sprint içinde, sürekli (continuous testing).', en: 'Continuously, inside every sprint.' }
          ],
          [
            { tr: 'Değişikliklere uyum', en: 'Adapting to change' },
            { tr: 'Zor — plan baştan belirlenir ve değişmez.', en: 'Hard — the plan is fixed upfront and rarely changes.' },
            { tr: 'Kolay — her sprint sonunda yön değiştirilebilir.', en: 'Easy — direction can shift after every sprint.' }
          ],
          [
            { tr: 'Müşteriye teslimat', en: 'Customer delivery' },
            { tr: 'Tek seferde, proje sonunda (aylar/yıllar sonra).', en: 'Once, at project end (months/years later).' },
            { tr: 'Sık sık, her sprint sonunda çalışan bir parça.', en: 'Frequently — a working increment after every sprint.' }
          ],
          [
            { tr: "QA'in rolü", en: "QA's role" },
            { tr: 'Ayrı bir "test fazı"nda devreye girer.', en: 'Joins in a separate, late "testing phase".' },
            { tr: 'Geliştirmeyle iç içe, en baştan katılır (shift-left).', en: 'Embedded with development from day one (shift-left).' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Bir Yazılım Geliştirme (Development) Takımı Kimlerden Oluşur?', en: 'Who Makes Up a Software Development Team?' }
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          { icon: '🧭', label: { tr: 'Product Owner', en: 'Product Owner' }, desc: { tr: 'Neyin yapılacağına karar verir, önceliklendirir; iş birimi ile geliştirme ekibi arasındaki köprüdür.', en: 'Decides what gets built and prioritizes it; bridges the business side with the dev team.' } },
          { icon: '🌀', label: { tr: 'Scrum Master', en: 'Scrum Master' }, desc: { tr: 'Ekibin Scrum sürecini doğru uygulamasına yardım eder, engelleri (blocker) kaldırır.', en: 'Helps the team follow the Scrum process correctly and removes blockers.' } },
          { icon: '👨‍💻', label: { tr: 'Developer', en: 'Developer' }, desc: { tr: 'Frontend, Backend veya Full-stack kod yazan, özellikleri (feature) hayata geçiren kişidir.', en: 'Writes frontend, backend, or full-stack code that implements features.' } },
          { icon: '🛡️', label: { tr: 'QA / Test Mühendisi', en: 'QA / Test Engineer' }, desc: { tr: 'Geliştirilen özelliklerin doğru çalıştığını manuel veya otomasyonla doğrular, hata raporlar.', en: 'Verifies features work correctly — manually or via automation — and reports bugs.' } },
          { icon: '🤖', label: { tr: 'SDET / Otomasyon Mühendisi', en: 'SDET / Automation Engineer' }, desc: { tr: 'Test süreçlerini hızlandıran otomasyon framework\'leri ve CI/CD entegrasyonları kurar.', en: 'Builds automation frameworks and CI/CD integrations that speed up testing.' } },
          { icon: '🐳', label: { tr: 'DevOps Mühendisi', en: 'DevOps Engineer' }, desc: { tr: 'Build, deploy ve sunucu altyapısını (Docker, Kubernetes, Jenkins) kurar ve yönetir.', en: 'Sets up and maintains build, deploy, and infrastructure (Docker, Kubernetes, Jenkins).' } },
          { icon: '🎨', label: { tr: 'UI/UX Tasarımcı', en: 'UI/UX Designer' }, desc: { tr: 'Kullanıcının göreceği arayüzü ve deneyimi tasarlar, geliştiriciye mockup/prototip sağlar.', en: 'Designs the interface and experience users see, providing mockups/prototypes to developers.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'SDLC Nedir? (Software Development Life Cycle)', en: 'What is SDLC? (Software Development Life Cycle)' }
      },
      {
        type: 'text',
        content: {
          tr: "SDLC (Yazılım Geliştirme Yaşam Döngüsü), bir yazılımın fikir aşamasından emekli edilmesine kadar geçirdiği tüm aşamaları tanımlayan standart süreçtir. Her aşamada test uzmanlarının farklı bir görevi vardır — sadece 'Test' aşamasında değil, 'Gereksinim Analizi' aşamasında bile (gereksinim dokümanını inceleyip belirsizlikleri sorgulayarak) devrededirler.",
          en: "SDLC (Software Development Life Cycle) is the standard process describing every phase a piece of software goes through, from idea to retirement. Testers have a role at every phase — not just the 'Testing' phase, but even during 'Requirement Analysis' (reviewing the requirements doc and questioning ambiguities)."
        }
      },
      {
        type: 'visual',
        variant: 'boxes',
        title: { tr: 'SDLC Aşamaları', en: 'SDLC Phases' },
        items: [
          { icon: '📋', label: { tr: 'Gereksinim Analizi', en: 'Requirement Analysis' } },
          { arrow: true },
          { icon: '📐', label: { tr: 'Tasarım', en: 'Design' } },
          { arrow: true },
          { icon: '💻', label: { tr: 'Geliştirme', en: 'Development' } },
          { arrow: true },
          { icon: '🧪', label: { tr: 'Test', en: 'Testing' }, highlight: true },
          { arrow: true },
          { icon: '🚀', label: { tr: 'Dağıtım', en: 'Deployment' } },
          { arrow: true },
          { icon: '🔧', label: { tr: 'Bakım', en: 'Maintenance' } }
        ],
        note: {
          tr: 'Çevik (Agile) ekiplerde bu aşamalar sırayla bir kere değil, her sprint içinde küçük döngüler halinde tekrar tekrar yaşanır.',
          en: 'In Agile teams these phases do not happen once in sequence — they repeat in small loops inside every sprint.'
        }
      },
      {
        type: 'quiz',
        question: {
          tr: "Bir e-ticaret sitesinde kullanıcı 'Sepete Ekle' butonuna tıkladığında, ürün bilgisinin kalıcı olarak saklandığı katman hangisidir?",
          en: "On an e-commerce site, when a user clicks 'Add to Cart', which layer is responsible for permanently storing that product information?"
        },
        options: [
          { id: 'a', text: { tr: 'UI / Frontend', en: 'UI / Frontend' } },
          { id: 'b', text: { tr: 'API', en: 'API' } },
          { id: 'c', text: { tr: 'Database', en: 'Database' } },
          { id: 'd', text: { tr: 'DevOps pipeline', en: 'DevOps pipeline' } }
        ],
        correct: 'c',
        explanation: {
          tr: 'UI tıklamayı yakalar, API isteği backend\'e taşır, backend mantığı işler ve veriyi kalıcı olarak saklayan katman Database\'dir.',
          en: 'The UI captures the click, the API carries the request to the backend, backend logic processes it, and the Database is the layer that permanently stores the data.'
        }
      }
    ]
  },

  // ── 5. SITE MAP ──────────────────────────────────────────────────────────────
  {
    title: { tr: '🗺️ Site Haritası — Bu Platformda Neler Var?', en: '🗺️ Site Map — What\'s on This Platform?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🗺️',
        content: {
          tr: "Bu sekmeyi bir alışveriş merkezinin giriş katındaki kat planı gibi düşün: hangi konuda ne öğreneceğini bilmiyorsan, aşağıdaki kategorilere bakıp doğru 'mağazaya' (sayfaya) doğrudan gidebilirsin. Her kart, ilgili konunun detaylı anlatıldığı sayfayı açar.",
          en: "Think of this tab like the directory board at the entrance of a shopping mall: if you're not sure what to learn next, browse the categories below and jump straight to the right 'store' (page). Each card opens the page with the full, detailed lesson."
        }
      },
      {
        type: 'heading',
        text: { tr: '🎨 UI / Web Test Otomasyonu', en: '🎨 UI / Web Test Automation' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '🟢', route: '/selenium', label: { tr: 'Selenium WebDriver', en: 'Selenium WebDriver' }, desc: { tr: "En yaygın web otomasyon aracı: locator stratejileri, wait'ler, gerçek senaryolar ve 50+ mülakat sorusu.", en: 'The most widely used web automation tool: locator strategies, waits, real scenarios, and 50+ interview questions.' } },
          { icon: '🎭', route: '/playwright', label: { tr: 'Playwright', en: 'Playwright' }, desc: { tr: 'Modern, hızlı ve otomatik bekleyen (auto-wait) yeni nesil web test aracı.', en: 'A modern, fast, auto-waiting next-generation web testing tool.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '🔌 API Testi', en: '🔌 API Testing' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '📮', route: '/postman', label: { tr: 'Postman', en: 'Postman' }, desc: { tr: "Collection, environment, script ve Newman ile CI'a entegre API testi.", en: 'API testing with collections, environments, scripts, and CI integration via Newman.' } },
          { icon: '☕', route: '/rest-assured', label: { tr: 'REST Assured', en: 'REST Assured' }, desc: { tr: 'Java ile kod tabanlı API otomasyonu: given-when-then zinciri ve assertion\'lar.', en: 'Code-based API automation in Java: the given-when-then chain and assertions.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '🗄️ Database Testi', en: '🗄️ Database Testing' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '🗃️', route: '/sql', label: { tr: 'SQL & Veri Doğrulama', en: 'SQL & Data Validation' }, desc: { tr: 'SELECT, JOIN, GROUP BY ve interaktif sorgu pratiğiyle backend veri doğrulama.', en: 'Validate backend data with SELECT, JOIN, GROUP BY, and interactive query practice.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '📱 Mobil Test', en: '📱 Mobile Testing' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '📱', route: '/appium', label: { tr: 'Appium', en: 'Appium' }, desc: { tr: 'Android ve iOS\'ta gerçek cihaz/emülatör üzerinde dokunma, kaydırma gibi gerçek kullanıcı hareketlerini otomatikleştirme.', en: 'Automate real user gestures like tapping and swiping on real devices or emulators for Android and iOS.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '⚡ Performans & Bulut Test Çalıştırma', en: '⚡ Performance & Cloud Test Execution' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '⚡', route: '/jmeter', label: { tr: 'JMeter', en: 'JMeter' }, desc: { tr: 'Yük testi (load testing), test planları ve performans raporları.', en: 'Load testing, test plans, and performance reports.' } },
          { icon: '☁️', route: '/browserstack', label: { tr: 'BrowserStack', en: 'BrowserStack' }, desc: { tr: 'Selenium/Playwright/Appium testlerini gerçek cihaz bulutunda çalıştırma.', en: 'Run Selenium/Playwright/Appium tests on a real device cloud.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '🐳 DevOps, CI/CD & Cloud', en: '🐳 DevOps, CI/CD & Cloud' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '🐳', route: '/docker', label: { tr: 'Docker', en: 'Docker' }, desc: { tr: 'Container, image, Selenium Grid ve test ortamlarını izole şekilde ayağa kaldırma.', en: 'Containers, images, Selenium Grid, and spinning up isolated test environments.' } },
          { icon: '🔧', route: '/jenkins', label: { tr: 'Jenkins', en: 'Jenkins' }, desc: { tr: 'Pipeline, build aşamaları, test raporları ve otomatik tetiklenen CI/CD akışları.', en: 'Pipelines, build stages, test reports, and automatically triggered CI/CD flows.' } },
          { icon: '☸️', route: '/kubernetes', label: { tr: 'Kubernetes', en: 'Kubernetes' }, desc: { tr: 'Pod, deployment, service kavramları ve kubectl ile test ortamı yönetimi.', en: 'Pods, deployments, services, and managing test environments with kubectl.' } },
          { icon: '📨', route: '/kafka', label: { tr: 'Kafka', en: 'Kafka' }, desc: { tr: 'Producer/consumer, topic/partition kavramları ve event-driven sistemlerde test.', en: 'Producers/consumers, topics/partitions, and testing event-driven systems.' } },
          { icon: '🟧', route: '/aws', label: { tr: 'AWS', en: 'AWS' }, desc: { tr: 'QA otomasyonu için bulut servisleri, CI pipeline\'ları ve ölçeklenebilir test çalıştırma.', en: 'Cloud services for QA automation, CI pipelines, and scalable test execution.' } },
          { icon: '🔷', route: '/azure', label: { tr: 'Azure', en: 'Azure' }, desc: { tr: 'Azure DevOps pipeline\'ları, bulut test ortamları ve CI/CD iş akışları.', en: 'Azure DevOps pipelines, cloud test environments, and CI/CD workflows.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '💻 Programlama Dilleri', en: '💻 Programming Languages' }
      },
      {
        type: 'link-grid',
        cols: 3,
        items: [
          { icon: '☕', route: '/java', label: { tr: 'Java', en: 'Java' }, desc: { tr: 'Selenium/REST Assured otomasyonu ve mülakatlar için Java temelleri.', en: 'Java fundamentals for Selenium/REST Assured automation and interviews.' } },
          { icon: '🐍', route: '/python', label: { tr: 'Python', en: 'Python' }, desc: { tr: 'pytest, Selenium ve Playwright ile sıfırdan Python otomasyonu.', en: 'Python automation from scratch with pytest, Selenium, and Playwright.' } },
          { icon: '🔷', route: '/typescript', label: { tr: 'TypeScript', en: 'TypeScript' }, desc: { tr: 'Playwright TS ile tip güvenli (type-safe) test otomasyonu.', en: 'Type-safe test automation with Playwright TS.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '📚 Karşılaştırma & Referans', en: '📚 Comparison & Reference' }
      },
      {
        type: 'link-grid',
        cols: 3,
        items: [
          { icon: '⚖️', route: '/test-frameworks', label: { tr: 'pytest vs Selenium vs Playwright', en: 'pytest vs Selenium vs Playwright' }, desc: { tr: 'Üç framework\'ün güçlü/zayıf yönlerini ve ne zaman hangisinin seçileceğini karşılaştırma.', en: 'Compare the strengths, trade-offs, and when to choose each of the three frameworks.' } },
          { icon: '📖', route: '/java-document', label: { tr: 'Java Referans Dokümanı', en: 'Java Reference Document' }, desc: { tr: 'Collections, OOP, exception ve concurrency konularını kapsayan aranabilir Java rehberi.', en: 'A searchable Java reference covering collections, OOP, exceptions, and concurrency.' } },
          { icon: '🐙', route: '/git-document', label: { tr: 'Git Referans Dokümanı', en: 'Git Reference Document' }, desc: { tr: 'Git kurulumu, hesap açma, branching, conflict ve gelişmiş Git konularını içeren rehber.', en: 'A searchable Git reference covering installation, account creation, branching, conflict resolution, and advanced Git concepts.' } }
        ]
      }
    ]
  }
]

const trHero = {
  title: '🛡️ Yazılım Testi ve QA Temelleri',
  subtitle: 'Sıfırdan Başlayanlar İçin Test Mühendisliği Kılavuzu',
  intro: "Yazılım testinin ne olduğunu, modern yazılımdaki hayati önemini, ISTQB temellerini, Kalite Güvencesi (QA) ve SDET rollerinin ne anlama geldiğini somut örnekler ve günlük hayat benzetmeleriyle öğrenin.",
}

const trTabs = ['🎯 Giriş & Neden', '📖 ISTQB & Temeller', '🛡️ QA vs QC', '💻 SDET & Otomasyon', '🌐 Web, Mobil & Süreçler', '🗺️ Site Haritası']

const enHero = {
  title: '🛡️ Software Testing & QA Fundamentals',
  subtitle: 'A Beginner\'s Guide to Software Test Engineering',
  intro: 'Learn what software testing is, its vital role in modern software development, ISTQB fundamentals, and the differences between QA, QC, and SDET roles with concrete real-world examples.',
}

const enTabs = ['🎯 Intro & Why', '📖 ISTQB & Core', '🛡️ QA vs QC', '💻 SDET & Automation', '🌐 Web, Mobile & Process', '🗺️ Site Map']

export const whatIsTestingData = {
  en: { hero: enHero, tabs: enTabs, sections },
  tr: { hero: trHero, tabs: trTabs, sections },
}
