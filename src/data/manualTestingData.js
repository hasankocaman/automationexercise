export const manualTestingData = {
    tr: {
        hero: {
            eyebrow: 'Manuel Test Atolyesi',
            title: 'Manuel Test Nedir? Bir Kullanici Like Dusun, QA Gibi Kanitla',
            subtitle: 'Test senaryosu yazmayi, risk gormeyi, bug raporlamayi ve regression kararini gorsel oyunlarla ogren.',
            intro: 'Manuel test sadece ekrana tiklamak degildir. Bir urunu gercek kullanici gozuyle inceler, beklenen davranisi kanitlarla karsilastirir ve ekibin dogru karari vermesi icin net bilgi uretirsin.',
            cta: 'Ilk goreve basla',
        },
        ui: {
            navTitle: 'Manuel Test Yolu',
            learn: 'Ogren',
            realLife: 'Gercek hayat',
            javaBridge: 'Java analojisi',
            tryIt: 'Sen dene',
            check: 'Kontrol et',
            reset: 'Sifirla',
            moveUp: 'Yukari',
            moveDown: 'Asagi',
            result: 'Sonuc',
            correct: 'Dogru',
            wrong: 'Tekrar dene',
            severityHint: 'Kartlari dogru severity kolonuna yerlestir.',
            quizTitle: 'Mini karar testi',
            qaBasics: 'QA Temelleri',
            progressLabel: 'Atolye ilerlemesi',
            complete: 'Tamamlandi',
            columns: {
                critical: 'Critical',
                major: 'Major',
                minor: 'Minor',
            },
            flow: {
                observe: 'Observe',
                compare: 'Compare',
                report: 'Report',
                retest: 'Retest',
            },
            // Neuro-Optimization UI translations
            neuroModeToggle: '🧠 Nöro-Öğrenim Modu',
            neuroModeDesc: 'Aralıklı tekrar, Feynman tekniği ve aktif hatırlama ile 10 kat hızlı öğren.',
            spacedRepTitle: 'Aralıklı Tekrar Takipçisi',
            spacedRepStart: 'Öğrenme Döngüsünü Başlat',
            spacedRepReset: 'Döngüyü Sıfırla',
            spacedRepDay1: '1. Gün: İlk Öğrenim',
            spacedRepDay3: '3. Gün: Aktif Geri Çağırma',
            spacedRepDay7: '7. Gün: Yapısal Pekiştirme',
            spacedRepDay30: '30. Gün: Kalıcılık Kontrolü',
            spacedRepTodayDone: 'Bugünkü Tekrarı Tamamla',
            spacedRepDone: 'Tamamlandı ✓',
            spacedRepPending: 'Bekliyor',
            spacedRepLocked: 'Kilitli',
            feynmanTitle: '🧠 Feynman Tekniği Pratiği',
            feynmanPrompt: 'Bu konuyu 10 yaşındaki bir çocuğa açıklar gibi kendi cümlelerinle yaz:',
            feynmanCheck: 'Açıklarımı Bul',
            feynmanKeywords: 'İçermen gereken anahtar kelimeler:',
            feynmanSelfCheck: 'Kendi açıklamanı değerlendir:',
            feynmanSuccess: 'Harika! Bilgi açıklarını kapatmak, Feynman tekniğinin en güçlü yanıdır.',
            activeRecallTitle: '🔄 Aktif Hatırlama Kartı',
            activeRecallPrompt: 'Sorunun cevabını zihninde canlandır, sonra kartı çevir:',
            activeRecallFlip: 'Kartı Çevir',
            activeRecallGotIt: 'Hatırladım ✓',
            activeRecallFailed: 'Tekrar Bak ✗',
        },
        lessons: [
            {
                id: 'mindset',
                shortTitle: 'Bakis Acisi',
                color: '#0ea5e9',
                title: '1. Manuel test = urunu kullanici gibi yasamak',
                analogy: 'Yeni bir kahve makinesi aldigini dusun. Sadece dugmeye basmazsin; su haznesi bosken ne oluyor, bardak yokken uyari geliyor mu, sicak kahve tasiyor mu diye bakarsin.',
                why: 'Manuel tester, happy path kadar ters kosullari da dener. Java unit test yazarken sadece beklenen input degil, null, bos liste ve sinir degerleri de kontrol edersin; manuel testte de ayni dusunce UI uzerinden uygulanir.',
                realLife: 'E-ticaret checkout sayfasinda kullanici kupon girer, adres secer, kartla oder. QA olarak sadece odeme basarili mi diye degil, kupon suresi bitti mi, stok son anda tukendi mi, kart reddedildi mi diye de bakarsin.',
                game: {
                    type: 'checklist',
                    title: 'Kahve makinesi risklerini sec',
                    prompt: 'Gercek bir kullanici deneyiminde test edilmesi gereken riskleri isaretle.',
                    success: 'Guzel. Manuel test, urunun sadece calisip calismadigini degil, kullaniciyi nerede yaralayabilecegini de gormektir.',
                    required: ['emptyWater', 'noCup', 'overflow'],
                    options: [
                        { id: 'color', label: 'Makinenin rengi mavi mi?' },
                        { id: 'emptyWater', label: 'Su yokken uyari veriyor mu?' },
                        { id: 'noCup', label: 'Bardak yokken akitmayi durduruyor mu?' },
                        { id: 'overflow', label: 'Bardak dolunca tasma oluyor mu?' },
                    ],
                },
                feynman: {
                    keywords: ['kullanici', 'risk', 'mutlu yol', 'edge case'],
                    modelAnswer: 'Manuel test sadece ekrana basmak degildir. Urunu gercek bir kullanici gibi denerken, islerin yolunda gittigi mutlu yol (happy path) disindaki su bitmesi veya bardak olmamasi gibi riskleri ve edge case\'leri (sinir durumlarini) kesfetme ve kanitlama surecidir.'
                },
                recall: {
                    question: 'Manuel test neden sadece ekrana rastgele tiklamak degildir?',
                    answer: 'Cunku sistemli bir risk arama surecidir. Kullanici zihniyetiyle dusunup urunun nerelerde hata verebilecegini (edge case\'ler) bulmayi ve bunlari somut adimlarla kanitlamayi gerektirir.'
                }
            },
            {
                id: 'test-case',
                shortTitle: 'Test Case',
                color: '#22c55e',
                title: '2. Test case = kanitlanabilir kucuk deney',
                analogy: 'Doktor tahlil isterken belirsiz konusmaz: hangi test, hangi ornek, beklenen aralik bellidir. Test case de ayni sekilde net adim ve beklenen sonuc ister.',
                why: 'Java tarafinda bir JUnit test methodu nasil Arrange, Act, Assert yapisina sahipse manuel test case de precondition, steps ve expected result yapisina sahiptir.',
                realLife: 'Login testinde sadece "giris yap" yazmak zayiftir. Dogru case: kayitli kullanici, dogru sifre, Login butonu, beklenen dashboard ve kullanici adi gorunurlugu.',
                game: {
                    type: 'sequence',
                    title: 'Login test case adimlarini sirala',
                    prompt: 'Bir login testini kanitlanabilir hale getirmek icin adimlari dogru siraya al.',
                    success: 'Harika. Precondition, action ve expected result netlesince test tekrar edilebilir hale gelir.',
                    expected: ['precondition', 'open', 'credentials', 'submit', 'assert'],
                    items: [
                        { id: 'assert', text: 'Dashboard ve kullanici adinin gorundugunu kontrol et' },
                        { id: 'credentials', text: 'Gecerli email ve sifre gir' },
                        { id: 'precondition', text: 'Kayitli ve aktif bir kullanici hazirla' },
                        { id: 'submit', text: 'Login butonuna bas' },
                        { id: 'open', text: 'Login sayfasini ac' },
                    ],
                },
                feynman: {
                    keywords: ['adim', 'beklenen sonuc', 'precondition', 'tekrarlanabilir'],
                    modelAnswer: 'Test case, bir testin herkes tarafindan ayni sekilde yapilabilmesi icin yazilan tariftir. Icinde testten once neyin hazir olmasi gerektigi (precondition), hangi adimlarin izlenecegi (steps) ve sonucun ne olacagi (expected result) net sekilde yazilir.'
                },
                recall: {
                    question: 'Bir test case\'i kaliteli ve kanitlanabilir yapan uc temel bilesen nedir?',
                    answer: '1. On Kosul (Precondition): Testten onceki sistem durumu. 2. Adimlar (Steps): Yapilacak eylemler. 3. Beklenen Sonuc (Expected Result): Sistemden beklenen dogru tepki.'
                }
            },
            {
                id: 'exploratory',
                shortTitle: 'Kesif',
                color: '#f59e0b',
                title: '3. Exploratory test = haritayla gezmek, ezberle degil',
                analogy: 'Yeni bir alisveris merkezine girdiginde sadece tek koridordan yurumazsin. Magazalari, cikislari, asansoru ve kalabalik anlari kesfedersin.',
                why: 'Exploratory testing plansiz tiklamak degildir. Java debugger ile bir bugi takip ederken hipotez kurarsin; burada da urun davranisi icin hipotez kurar, gozlem ve notla ilerlersin.',
                realLife: 'Sepete 1 urun, 20 urun, stokta olmayan urun, indirimli urun ve adresi eksik kullanici ile ayni checkout akisini kesfedebilirsin.',
                game: {
                    type: 'map',
                    title: 'Checkout risk rotasini sec',
                    prompt: 'En riskli yolu sec; amac sadece mutlu yolu degil, problem cikarma ihtimali yuksek yolu bulmak.',
                    success: 'Dogru rota. Manuel tester, kullanicinin sikisacagi yolu onceden gormeye calisir.',
                    correct: 'expiredCoupon',
                    options: [
                        { id: 'happy', label: 'Tek urun, gecerli kart, sorunsuz odeme', output: 'Happy path gerekli ama tek basina yeterli degil.' },
                        { id: 'expiredCoupon', label: 'Son kullanma tarihi gecmis kupon + stoktaki son urun', output: 'Yuksek risk: fiyat, stok ve hata mesaji ayni anda test edilir.' },
                        { id: 'browse', label: 'Sadece urun listesini gez', output: 'Kesif icin iyi ama checkout riskini dogrudan zorlamiyor.' },
                    ],
                },
                feynman: {
                    keywords: ['planli', 'hipotez', 'not almak', 'kesif'],
                    modelAnswer: 'Kesifci test, ezbere hazir senaryolarla degil, urunu ogrenirken ayni anda test tasarlama yontemidir. Plansiz degildir; test uzmani bir hedef ve hipotez belirler, urunu kurcalar, buldugu riskleri ve yollari not alarak ilerler.'
                },
                recall: {
                    question: 'Kesifci test (exploratory testing) ile rastgele tiklama (adhoc) arasindaki fark nedir?',
                    answer: 'Kesifci test sistematiktir. Bir charter (hedef) etrafinda donecegimiz hipotezleri kurariz, test esnasinda ogrendiklerimizle yeni testler uretiriz ve sureci mutlaka gunluk veya notla belgeleriz.'
                }
            },
            {
                id: 'bug-report',
                shortTitle: 'Bug Raporu',
                color: '#ef4444',
                title: '4. Bug report = ekibin hatayi yeniden uretmesini saglayan tarif',
                analogy: 'Araban bozuldugunda "calismiyor" demek ustaya yetmez. Ne zaman, hangi hizda, hangi isik yandi, ses nereden geldi anlatirsan cozum hizlanir.',
                why: 'Java stack trace nasil hata sinifini, satiri ve kosulu verirse iyi bug report da environment, steps, expected, actual, evidence ve impact bilgisi verir.',
                realLife: 'Mobil uygulamada odeme sonrasi bos ekran varsa cihaz modeli, app version, kullanici tipi, odeme yontemi ve ekran kaydi rapora girer.',
                game: {
                    type: 'bug',
                    title: 'Bug raporunu tamamla',
                    prompt: 'Eksik bilgiyi sec. Rapor: "Odeme sonrasi bos ekran geliyor."',
                    success: 'Evet. Yeniden uretme adimlari olmadan developer sadece tahmin eder.',
                    correct: 'steps',
                    options: [
                        { id: 'angry', label: 'Bu cok kotu, acil duzeltin' },
                        { id: 'steps', label: 'Sepete urun ekle, Visa kart sec, Ode butonuna bas, bos ekran gor' },
                        { id: 'personal', label: 'Bence tasarim daha guzel olmali' },
                    ],
                },
                feynman: {
                    keywords: ['adim', 'beklenen', 'gerceklesen', 'ekran goruntusu', 'yeniden uret'],
                    modelAnswer: 'Bug raporu, yazilimdaki hatanin nasil ortaya ciktigini gosteren tarif kartidir. Developer\'in hatayi kendi bilgisayarinda yeniden uretebilmesi (reproduce) icin hangi ortamda, hangi adimlarla yapildigini, beklenen durum ile gerceklesen hatayi ve ekran goruntusu kanitini icerir.'
                },
                recall: {
                    question: 'Yazilimcinin hatayi hemen anlayabilmesi icin bug raporundaki en kritik alan hangisidir?',
                    answer: 'Yeniden Uretme Adimlari (Steps to Reproduce). Net adimlar olmadan yazilimci hatanin nerede ve nasil tetiklendigini bulamaz ve vakit kaybeder.'
                }
            },
            {
                id: 'severity',
                shortTitle: 'Severity',
                color: '#8b5cf6',
                title: '5. Severity = hatanin kullaniciya ve is akisina etkisi',
                analogy: 'Restoranda tuzluk eksikse rahatsiz edici ama yangin alarmi calismiyorsa kritik risktir. Her hata ayni oncelikte degildir.',
                why: 'Java exception dusun: ekranda typo minor olabilir, payment servisinin NullPointerException ile cokmesi critical olabilir. QA severity ile etkiyi gorunur yapar.',
                realLife: 'Checkout butonu hic calismiyorsa Critical, urun fotografi bazen yuklenmiyorsa Major, yardim metninde yazim hatasi varsa Minor olabilir.',
                game: {
                    type: 'severity',
                    title: 'Defect kartlarini siniflandir',
                    prompt: 'Her karti uygun severity kolonuna tasi veya kolon butonlariyla yerlestir.',
                    success: 'Guzel siniflandirma. Severity, ekibin once hangi yangini sondurecegini gosterir.',
                    cards: [
                        { id: 'payCrash', label: 'Odeme butonu 500 hatasi veriyor', severity: 'critical' },
                        { id: 'wrongTotal', label: 'Kupon sonrasi toplam fiyat yanlis', severity: 'major' },
                        { id: 'typo', label: 'Profil sayfasinda yazim hatasi var', severity: 'minor' },
                    ],
                },
                feynman: {
                    keywords: ['etki', 'is akisi', 'kullanici', 'kritik'],
                    modelAnswer: 'Severity, hatanin uygulamanin calismasina ve sirketin is akisina verdigi zararin buyuklugudur. Odeme sisteminin cokmesi gibi durumlar kritik (critical), bir yazim hatasi ise minor etkilidir. Hatanin ne kadar acil cozuleceginden ziyade, teknik olarak yarattigi etkiyi olcer.'
                },
                recall: {
                    question: 'Severity (Hata Derecesi) nedir ve nasil belirlenir?',
                    answer: 'Hatanin fonksiyonel etkisidir. Eger ana is akisi (core flow) engelleniyorsa Critical, alternatif akislarda hata varsa Major, sadece görsel/typo ise Minor derecesindedir.'
                }
            },
            {
                id: 'regression',
                shortTitle: 'Regression',
                color: '#14b8a6',
                title: '6. Regression test = eski calisan seyin hala calistigini kanitlamak',
                analogy: 'Evde muslugu tamir ettikten sonra sadece yeni parcaya bakmazsin; su sizintisi, lavabo gideri ve sicak su hala iyi mi diye de kontrol edersin.',
                why: 'Java projesinde yeni koddan sonra tum test suite kosulur. Manuel regression da yeni fix sonrasinda ilgili eski akislarin bozulmadigini kanitlar.',
                realLife: 'Kupon bugi duzeltildiyse sadece kuponu degil; normal odeme, havale, kapida odeme, iade ve siparis mailini de duman testiyle kontrol edersin.',
                game: {
                    type: 'quiz',
                    title: 'Smoke mi regression mi?',
                    prompt: 'Release oncesi 20 dakikan var. En mantikli karar hangisi?',
                    success: 'Dogru. Kisa zamanda kritik akislari smoke test ile tarar, sonra riskli alanlara regression eklersin.',
                    correct: 'smoke',
                    options: [
                        { id: 'all', label: 'Butun uygulamayi bastan sona manuel test et' },
                        { id: 'smoke', label: 'Login, checkout, payment gibi kritik akislari hizli smoke test et' },
                        { id: 'none', label: 'Developer test ettiyse QA testine gerek yok' },
                    ],
                
        retryQuestion: {
      "title": "Smoke testi mi, regression testi mi?",
      "prompt": "Canliya cikisa 15 dakika kala kritik bir bug duzeltmesi yapildi. Izlenmesi gereken en saglikli strateji nedir?",
      "success": "Dogru. Sistem kararliligini hizli bir sekilde dogrulamak icin temel islevleri (smoke) kontrol etmek, ardindan degisikligin etkiledigi yerleri test etmek en dogrusudur.",
      "correct": "c",
      "options": [
            {
                  "id": "a",
                  "text": "Tum regression paketini otomatik olarak calistir ve bitmesini bekle"
            },
            {
                  "id": "b",
                  "text": "Sadece hata giderilen sayfayi manuel kontrol et, gerisine bakma"
            },
            {
                  "id": "c",
                  "text": "Kritik is akislarini (smoke) hizlica dogrula ve ilgili modulun regresyonuna odaklan"
            },
            {
                  "id": "d",
                  "text": "Hata giderildigi icin sistemin diger bolumlerinin bozulmayacagini varsay"
            }
      ],
      "explanation": "Kisa sureli kriz anlarinda tum uygulamayi test etmek imkansizdir. Oncelik, uygulamanin calisir oldugundan emin olmak (smoke) ve yapilan degisikligin yan etki yaratmadigini kontrol etmektir (regression)."
}
},
                feynman: {
                    keywords: ['yeni kod', 'eski calisan', 'bozulma', 'duman testi'],
                    modelAnswer: 'Regresyon testi, uygulamaya yeni bir kod veya fix eklendikten sonra, daha onceden calisan diger ozelliklerin bozulup bozulmadigini kontrol etmektir. Yeni yapilan tamiratin baska bir muslugu patlatip patlatmadigini dogrulama surecidir.'
                },
                recall: {
                    question: 'Yeni bir kod veya hata duzeltmesi sonrasi neden regression testi yapariz?',
                    answer: 'Yazilim karmasik bir ag gibidir. Bir yerdeki degisiklik alakasiz baska bir yeri bozabilir (side effect). Regression testi, eski calisan yerlerin hala saglam oldugunu garanti eder.'
                }
            },
        ],
        quiz: [
            {
                question: 'Kullanicinin parasi cekiliyor ama siparis olusmuyorsa severity ne olmali?',
                answer: 'critical',
                options: ['critical', 'minor', 'cosmetic'],
                feedback: 'Para ve siparis akisi is kritik oldugu icin Critical.',
            },
            {
                question: 'Iyi bug report icin en kritik bilgi hangisi?',
                answer: 'steps',
                options: ['steps', 'renk tercihi', 'takim yorumu'],
                feedback: 'Yeniden uretme adimlari developer icin en hizli kanittir.',
            },
            {
                question: 'Manuel tester happy path disinda neye bakmali?',
                answer: 'edge cases',
                options: ['edge cases', 'sadece logo', 'sadece hiz'],
                feedback: 'Edge case ve riskli kosullar manuel testin gucudur.',
            },
        ],
    },
    en: {
        hero: {
            eyebrow: 'Manual Testing Workshop',
            title: 'What Is Manual Testing? Think Like a User, Prove Like QA',
            subtitle: 'Learn test scenarios, risk thinking, bug reporting, and regression decisions through visual games.',
            intro: 'Manual testing is not random clicking. You inspect a product from a real user perspective, compare behavior with expectations, and produce clear evidence for the team.',
            cta: 'Start first task',
        },
        ui: {
            navTitle: 'Manual Testing Path',
            learn: 'Learn',
            realLife: 'Real life',
            javaBridge: 'Java analogy',
            tryIt: 'Try it',
            check: 'Check',
            reset: 'Reset',
            moveUp: 'Move up',
            moveDown: 'Move down',
            result: 'Result',
            correct: 'Correct',
            wrong: 'Try again',
            severityHint: 'Place the cards into the right severity column.',
            quizTitle: 'Mini decision quiz',
            qaBasics: 'QA Basics',
            progressLabel: 'Workshop progress',
            complete: 'Complete',
            columns: {
                critical: 'Critical',
                major: 'Major',
                minor: 'Minor',
            },
            flow: {
                observe: 'Observe',
                compare: 'Compare',
                report: 'Report',
                retest: 'Retest',
            },
            // Neuro-Optimization UI translations
            neuroModeToggle: '🧠 Neuro-Learning Mode',
            neuroModeDesc: 'Learn 10x faster with spaced repetition, Feynman technique, and active recall.',
            spacedRepTitle: 'Spaced Repetition Tracker',
            spacedRepStart: 'Start Learning Cycle',
            spacedRepReset: 'Reset Cycle',
            spacedRepDay1: 'Day 1: Initial Learning',
            spacedRepDay3: 'Day 3: Active Recall',
            spacedRepDay7: 'Day 7: Structural Reinforcement',
            spacedRepDay30: 'Day 30: Retention Check',
            spacedRepTodayDone: 'Complete Today\'s Review',
            spacedRepDone: 'Completed ✓',
            spacedRepPending: 'Pending',
            spacedRepLocked: 'Locked',
            feynmanTitle: '🧠 Feynman Practice',
            feynmanPrompt: 'Explain this topic in your own words as if explaining to a 10-year-old child:',
            feynmanCheck: 'Find My Gaps',
            feynmanKeywords: 'Key keywords you should include:',
            feynmanSelfCheck: 'Evaluate your own explanation:',
            feynmanSuccess: 'Great! Closing knowledge gaps is the strongest part of the Feynman technique.',
            activeRecallTitle: '🔄 Active Recall Flashcard',
            activeRecallPrompt: 'Visualize the answer in your mind, then flip the card:',
            activeRecallFlip: 'Flip Card',
            activeRecallGotIt: 'I Recalled ✓',
            activeRecallFailed: 'Review Again ✗',
        },
        lessons: [
            {
                id: 'mindset',
                shortTitle: 'Mindset',
                color: '#0ea5e9',
                title: '1. Manual testing = experiencing the product like a user',
                analogy: 'Imagine buying a coffee machine. You do not only press the button; you check what happens with no water, no cup, and an overflowing cup.',
                why: 'Manual testers test unhappy paths as well as happy paths. In Java unit tests you check nulls, empty lists, and boundaries; manual testing applies the same thinking through the UI.',
                realLife: 'On an e-commerce checkout page, QA checks coupon expiry, last-stock race conditions, declined cards, and error messages, not only successful payment.',
                game: {
                    type: 'checklist',
                    title: 'Select coffee machine risks',
                    prompt: 'Mark the risks a real user experience should cover.',
                    success: 'Nice. Manual testing looks for where the product can hurt the user, not only whether it basically runs.',
                    required: ['emptyWater', 'noCup', 'overflow'],
                    options: [
                        { id: 'color', label: 'Is the machine blue?' },
                        { id: 'emptyWater', label: 'Does it warn when water is empty?' },
                        { id: 'noCup', label: 'Does it stop when there is no cup?' },
                        { id: 'overflow', label: 'Does coffee overflow the cup?' },
                    ],
                },
                feynman: {
                    keywords: ['user', 'risk', 'happy path', 'edge case'],
                    modelAnswer: 'Manual testing is not just clicking buttons. It is experiencing the product like a user while exploring and proving risks and edge cases (boundary conditions) beyond the happy path (like water running out or missing cups).'
                },
                recall: {
                    question: 'Why is manual testing not just randomly clicking on the screen?',
                    answer: 'Because it is a systematic risk-finding process. It requires user empathy to find where things can break (edge cases) and proving them with concrete, repeatable steps.'
                }
            },
            {
                id: 'test-case',
                shortTitle: 'Test Case',
                color: '#22c55e',
                title: '2. Test case = a small experiment with proof',
                analogy: 'A doctor does not ask for a vague test. The sample, test type, and expected range are clear. A test case also needs clear steps and expected results.',
                why: 'A JUnit method has Arrange, Act, Assert. A manual test case has preconditions, steps, and expected result.',
                realLife: 'A weak login case says "log in." A strong case names the active user, valid password, Login action, expected dashboard, and visible username.',
                game: {
                    type: 'sequence',
                    title: 'Order the login test case steps',
                    prompt: 'Put the steps into a repeatable login test case.',
                    success: 'Great. Once precondition, action, and expected result are clear, the test can be repeated.',
                    expected: ['precondition', 'open', 'credentials', 'submit', 'assert'],
                    items: [
                        { id: 'assert', text: 'Check dashboard and username are visible' },
                        { id: 'credentials', text: 'Enter valid email and password' },
                        { id: 'precondition', text: 'Prepare a registered active user' },
                        { id: 'submit', text: 'Click the Login button' },
                        { id: 'open', text: 'Open the login page' },
                    ],
                },
                feynman: {
                    keywords: ['step', 'expected result', 'precondition', 'repeatable'],
                    modelAnswer: 'A test case is a recipe written so that anyone can run the test the same way. It defines what must be set up beforehand (preconditions), what actions to take (steps), and what the expected outcome is (expected result).'
                },
                recall: {
                    question: 'What are the three main components that make a test case high quality and verifiable?',
                    answer: '1. Precondition: The system state before testing. 2. Steps: The actions to execute. 3. Expected Result: The expected correct system behavior.'
                }
            },
            {
                id: 'exploratory',
                shortTitle: 'Explore',
                color: '#f59e0b',
                title: '3. Exploratory testing = navigating with a map, not by memorizing',
                analogy: 'When you enter a new shopping mall, you do not walk one corridor only. You explore stores, exits, elevators, and crowded moments.',
                why: 'Exploratory testing is not unplanned clicking. Like using a Java debugger, you form a hypothesis, observe behavior, and take notes.',
                realLife: 'You can explore the same checkout with 1 item, 20 items, out-of-stock items, discounted products, and users with incomplete addresses.',
                game: {
                    type: 'map',
                    title: 'Choose the checkout risk route',
                    prompt: 'Pick the riskiest route; the goal is to find where problems are likely.',
                    success: 'Correct route. A manual tester tries to see where users will get stuck before release.',
                    correct: 'expiredCoupon',
                    options: [
                        { id: 'happy', label: 'One item, valid card, clean payment', output: 'Happy path is needed, but not enough alone.' },
                        { id: 'expiredCoupon', label: 'Expired coupon plus the last item in stock', output: 'High risk: price, stock, and error messaging are tested together.' },
                        { id: 'browse', label: 'Only browse the product list', output: 'Useful exploration, but it does not stress checkout risk directly.' },
                    ],
                },
                feynman: {
                    keywords: ['planned', 'hypothesis', 'take notes', 'explore'],
                    modelAnswer: 'Exploratory testing is designing and running tests at the same time while learning the product, instead of following pre-written scripts. It is structured: the tester has a target charter and hypothesis, explores features, and notes down risks and findings.'
                },
                recall: {
                    question: 'What is the main difference between exploratory testing and random (ad-hoc) clicking?',
                    answer: 'Exploratory testing is systematic. We set charters (targets), establish hypotheses, generate tests based on real-time learning, and record findings in logs or session reports.'
                }
            },
            {
                id: 'bug-report',
                shortTitle: 'Bug Report',
                color: '#ef4444',
                title: '4. Bug report = a recipe that lets the team reproduce the failure',
                analogy: 'If your car fails, saying "it does not work" is not enough. The speed, warning light, sound, and timing help the mechanic fix it faster.',
                why: 'A Java stack trace gives exception type, line, and condition. A good bug report gives environment, steps, expected, actual, evidence, and impact.',
                realLife: 'For a blank screen after mobile payment, report device model, app version, user type, payment method, and a screen recording.',
                game: {
                    type: 'bug',
                    title: 'Complete the bug report',
                    prompt: 'Choose the missing information. Report: "Blank screen after payment."',
                    success: 'Yes. Without reproduction steps, the developer can only guess.',
                    correct: 'steps',
                    options: [
                        { id: 'angry', label: 'This is terrible, fix it now' },
                        { id: 'steps', label: 'Add item to cart, choose Visa, click Pay, observe blank screen' },
                        { id: 'personal', label: 'I think the design should be prettier' },
                    ],
                },
                feynman: {
                    keywords: ['step', 'expected', 'actual', 'screenshot', 'reproduce'],
                    modelAnswer: 'A bug report is a detailed card explaining how a defect occurs. To help developers reproduce the bug, it includes the test environment, the step-by-step actions, what was expected versus what actually broke, and screenshot or log evidence.'
                },
                recall: {
                    question: 'What is the most critical area of a bug report so developers can understand it instantly?',
                    answer: 'Steps to Reproduce. Without clear, numbered steps, a developer cannot recreate the exact environment or trigger conditions that lead to the bug.'
                }
            },
            {
                id: 'severity',
                shortTitle: 'Severity',
                color: '#8b5cf6',
                title: '5. Severity = the impact of a defect on users and business flow',
                analogy: 'Missing salt in a restaurant is annoying, but a broken fire alarm is critical. Not every problem has the same priority.',
                why: 'Think of Java exceptions: a typo is minor, but a payment service crashing with NullPointerException is critical. QA makes impact visible through severity.',
                realLife: 'A checkout button that never works is Critical, a product image that sometimes fails is Major, and a typo in help text is Minor.',
                game: {
                    type: 'severity',
                    title: 'Classify defect cards',
                    prompt: 'Drag each card to the right severity column or use the column buttons.',
                    success: 'Good classification. Severity shows which fire the team should handle first.',
                    cards: [
                        { id: 'payCrash', label: 'Payment button returns 500', severity: 'critical' },
                        { id: 'wrongTotal', label: 'Total price is wrong after coupon', severity: 'major' },
                        { id: 'typo', label: 'Typo on profile page', severity: 'minor' },
                    ],
                },
                feynman: {
                    keywords: ['impact', 'workflow', 'user', 'critical'],
                    modelAnswer: 'Severity measures the functional impact of a bug on the application and business flow. A payment crash is critical, while a profile page typo is minor. It evaluates the technical damage rather than how urgently a fix is desired.'
                },
                recall: {
                    question: 'What is Severity and how is it determined?',
                    answer: 'It is the functional impact of a defect. If the core user flow is blocked (e.g., cannot check out), it is Critical. If alternative flows fail, it is Major. If it is only cosmetic or minor text, it is Minor.'
                }
            },
            {
                id: 'regression',
                shortTitle: 'Regression',
                color: '#14b8a6',
                title: '6. Regression testing = proving old behavior still works',
                analogy: 'After fixing a faucet, you do not check only the new part. You also check leaks, drain flow, and hot water.',
                why: 'After new code, a Java project runs the test suite. Manual regression proves related old flows did not break after a fix.',
                realLife: 'If a coupon bug is fixed, also smoke test normal payment, bank transfer, cash on delivery, refund, and order email.',
                game: {
                    type: 'quiz',
                    title: 'Smoke or regression?',
                    prompt: 'You have 20 minutes before release. Which decision is strongest?',
                    success: 'Correct. In limited time, smoke test critical flows, then add regression around risky areas.',
                    correct: 'smoke',
                    options: [
                        { id: 'all', label: 'Manually retest the entire app from start to end' },
                        { id: 'smoke', label: 'Quickly smoke test critical flows like login, checkout, payment' },
                        { id: 'none', label: 'If developers tested it, QA testing is unnecessary' },
                    ],
                
        retryQuestion: {
      "title": "Smoke test or regression test?",
      "prompt": "A critical hotfix was applied 15 minutes before the production deployment. What is the most effective approach?",
      "success": "Correct. Verifying core functionality (smoke) followed by targeted regression around the affected module is the most efficient strategy under time pressure.",
      "correct": "c",
      "options": [
            {
                  "id": "a",
                  "text": "Run the entire full regression suite and wait for it to complete"
            },
            {
                  "id": "b",
                  "text": "Only check the specific page where the bug was fixed"
            },
            {
                  "id": "c",
                  "text": "Quickly verify critical flows (smoke) and then perform targeted regression on the affected area"
            },
            {
                  "id": "d",
                  "text": "Assume that since the bug was fixed, no other parts of the system will be affected"
            }
      ],
      "explanation": "In time-constrained scenarios, exhaustive testing is not feasible. The focus must remain on ensuring the core system viability (smoke) while validating that the specific change did not introduce regressions in related components."
}
},
                feynman: {
                    keywords: ['new code', 'previously working', 'breakage', 'smoke test'],
                    modelAnswer: 'Regression testing is verifying that previously working features did not break after new code changes or bug fixes are deployed. It ensures that fixing one leak did not cause another pipe to burst elsewhere.'
                },
                recall: {
                    question: 'Why do we perform regression testing after new code is added or a bug is fixed?',
                    answer: 'Software is highly interconnected. A change in one area can cause unintended side effects elsewhere. Regression testing guarantees that existing stable features remain working.'
                }
            },
        ],
        quiz: [
            {
                question: 'Money is charged but the order is not created. What is the severity?',
                answer: 'critical',
                options: ['critical', 'minor', 'cosmetic'],
                feedback: 'Money and order creation are business critical, so this is Critical.',
            },
            {
                question: 'What is the most important part of a useful bug report?',
                answer: 'steps',
                options: ['steps', 'color preference', 'team opinion'],
                feedback: 'Reproduction steps are the fastest evidence for developers.',
            },
            {
                question: 'What should a manual tester check beyond happy path?',
                answer: 'edge cases',
                options: ['edge cases', 'only the logo', 'only speed'],
                feedback: 'Edge cases and risky conditions are where manual testing shines.',
            },
        ],
    },
}
