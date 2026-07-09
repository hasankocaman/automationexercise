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
            dragDropTitle: '🔀 Sürükle-Bırak: Süreci Sırala',
            practiceTitle: '✍️ Pratik: Sen Yaz ve Karşılaştır',
            practiceCheck: 'Cevabımı Kontrol Et',
            practiceKeywords: 'Değinmen gereken anahtar noktalar:',
            practiceModelLabel: 'Örnek Cevap',
            practiceSuccess: 'Kendi cevabını örnek cevapla karşılaştır — birebir aynı olmak zorunda değil, mantığı yakalaman yeterli.',
        },
        lessons: [
            {
                id: 'mindset',
                shortTitle: 'Bakis Acisi',
                color: '#0ea5e9',
                title: '1. Manuel test = urunu kullanici gibi yasamak',
                analogy: 'Yeni bir kahve makinesi aldigini dusun. Sadece dugmeye basmazsin; su haznesi bosken ne oluyor, bardak yokken uyari geliyor mu, sicak kahve tasiyor mu diye bakarsin. Peki "Buton calisiyor mu?" sorusu neden yetmez? Cunku kullanici makineyi aldiginda zaten dugmenin calistigini varsayar — gercek risk, beklentisi karsilandi mi sorusundadir. Manuel test de tam olarak bu bakis acisiyla calisir: urunun var oldugunu degil, kullanicinin beklentisini karsilayip karsilamadigini kanit uzerinden gosterir.',
                why: 'Java unit test yazarken sadece beklenen happy-path inputu degil; null, bos liste ve sinir degerlerini de `assertThrows`, `assertNull` ile kontrol edersin. Manuel test de ayni dusunce yapisiyla ama UI katmaninda calisir: "Bu ekran gecerli veriyle dogru mu?" sorusunun yanina "Bu ekran gecersiz veriyle ne yapiyor?" sorusunu da ekler. Bir fark var: unit test tek bir methodu izole test eder; manuel test kullanicinin tum akim boyunca hissettigi deneyimi test eder.',
                realLife: 'E-ticaret checkout sayfasinda QA sadece "Odeme basarili mi?" diye bakmaz; kupon suresi bitti mi, stok son anda tukendi mi, kart reddedildi mi, adres eksikse hata mesaji Turkce mi diye de bakar. Bu testlerin hic biri yazilmayan bir production release, gercek kullaniciyi ilk "sicak" anda yaralayan hatayla yuzlestirmek demektir.',
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
                },
                dragDrop: {
                    title: 'Kullanici zihniyetiyle test surecini sirala',
                    prompt: 'Bir ozelligi kullanici gozuyle test ederken izlenecek dogru dusunce sirasini olustur.',
                    success: 'Dogru sira. Once gozlemle, sonra beklentiyi dusun, riskleri hayal et, dene ve karsilastir.',
                    expected: ['observe', 'expect', 'imagine', 'try', 'compare'],
                    items: [
                        { id: 'try', text: 'Hayal ettigin riskli senaryolari gercekten dene' },
                        { id: 'observe', text: 'Ozelligin ne yaptigini gozlemle (buton calisiyor mu?)' },
                        { id: 'compare', text: 'Sonucu kullanicinin beklentisiyle karsilastir' },
                        { id: 'expect', text: 'Kullanicinin bu ozellikten ne bekledigini dusun' },
                        { id: 'imagine', text: 'Neyin ters gidebilecegini hayal et (su bitmesi, bardak olmamasi gibi)' },
                    ],
                },
                practice: {
                    prompt: 'Gunluk kullandigin bir uygulamayi (ornegin bir yemek siparis uygulamasi) dusun. Happy path disinda test etmen gereken 2 edge case yaz.',
                    keywords: ['bos', 'hata', 'sinir', 'beklenmeyen'],
                    modelAnswer: 'Ornek: Sepette hic urun yokken "Siparis Ver" butonuna basilirsa ne olur? Teslimat adresi secilmeden odeme ekranina gecilmeye calisilirsa ne olur? Bu ikisi de happy path\'in disinda kalan, kullaniciyi gercekten yaralayabilecek edge case\'lerdir.',
                },
            },
            {
                id: 'test-case',
                shortTitle: 'Test Case',
                color: '#22c55e',
                title: '2. Test case = kanitlanabilir kucuk deney',
                analogy: 'Doktor tahlil isterken "bir bak bakalim" demez: hangi test, hangi numune, beklenen aralik acikcadir. Test case de ayni netlikte calisir — hangi on kosul, hangi adimlar, hangi beklenen sonuc. Burada dusundurucu soru su: "Giris yap" yazmak neden test case sayilmaz? Cunku ayni adi tasiyan iki kisi bu "tarifi" okusaydi, biri sifre alanini birakip sadece email yazabilir, digeri farkli bir tarayici kullanabilirdi. Test case, her calistiranda ayni deneyi uretilebilir kilmak icindir.',
                why: 'Java JUnit metodlarinda Arrange (on kosul kurma), Act (eylemi calistirma), Assert (sonucu dogrulama) uclusu standart yapidadir. Manuel test case de tam olarak bu yapiyi IC kullanir: Precondition (kayitli aktif kullanici), Steps (sayfa ac → email gir → sifre gir → Login bas), Expected Result (dashboard gorunur, kullanici adi gorunur). Fark: JUnit otomatik calisir; manuel case insanin elinde ayni hassasliyi saglar.',
                realLife: 'Production\'da bir login hatasi raporlandiginda "ben denedim calisti" tartismasini kazananlar, test case\'in ekran goruntusunu sunanlardir. Net precondition + steps + expected result olmadan QA kanit uretmez, takim "yeniden uretilemiyor" diyerek kapatiyor.',
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
                },
                dragDrop: {
                    title: 'Iyi bir test case yazma surecini sirala',
                    prompt: 'Bir test case yazmadan once ve yazarken izlenen dusunce sirasini olustur.',
                    success: 'Dogru sira. Once ozelligi anla, sonra precondition, adimlar ve beklenen sonucu netlestir, en son calistir.',
                    expected: ['understand', 'precondition', 'steps', 'expected', 'run'],
                    items: [
                        { id: 'run', text: 'Test case\'i calistir ve sonucu dogrula' },
                        { id: 'understand', text: 'Test edilecek ozelligi ve amacini anla' },
                        { id: 'expected', text: 'Beklenen sonucu net bir cumleyle tanimla' },
                        { id: 'precondition', text: 'Testten once sistemin hangi durumda olmasi gerektigini belirle' },
                        { id: 'steps', text: 'Numarali, tekrarlanabilir adimlari yaz' },
                    ],
                },
                practice: {
                    prompt: 'Bir "sifremi unuttum" akisi icin precondition / steps / expected result formatinda kisa bir test case yaz.',
                    keywords: ['precondition', 'adim', 'beklenen'],
                    modelAnswer: 'Precondition: Kayitli bir email adresi var. Steps: 1) Login sayfasinda "Sifremi unuttum" linkine tikla, 2) Email adresini gir, 3) Gonder butonuna bas. Expected Result: "Sifre sifirlama linki email adresinize gonderildi" mesaji gorunur.',
                },
            },
            {
                id: 'exploratory',
                shortTitle: 'Kesif',
                color: '#f59e0b',
                title: '3. Exploratory test = haritayla gezmek, ezberle degil',
                analogy: 'Bir alisveris merkezine ilk kez giren kisi her magaza icin onceden hazir senaryo aramaz; ama rastgele de yurumuyor. "Cikis nerede, asansor bu katta mi, yemek kati nerede?" diye bir zihinsel harita olusturup kesfediyor. Peki hazir test senaryolari varken neden ek kesif? Cunku yazilan senaryolar, yazani bilen birinin hayal edebildigi yollari kapsayabilir — ancak kullanicinin gercekte ne yapacagini yazan kisi bilmez. Exploratory testing bu kaygani gecmeyi yakalar: onceden yazilmayan, ama gercek kullanicinin yapabiliyor oldugunun farkedilmesiyle.',
                why: 'Java debugger\'i kullanan deneyimli bir gelistirici once bir hipotez kurar ("bu NPE muhtemelen bu null check\'ten geliyor"), sonra kodu adim adim izler, beklentisini dogrular veya revize eder. Exploratory testing de ayni zihinsel model: charter (hedef), hipotez (risk nerede olabilir?), gozlem (ne goruyorum?) ve not (ne buldugumu belgele). Fark: Java debugger tek bir cagri yigini izler; exploratory test tum urun katmanlarini, veri kombinasyonlarini ve kullanici tiplerini gezer.',
                realLife: 'Bir QA mühendisi siparis akisini test ederken 1 urun / 20 urun / stokta olmayan urun / indirimli urun / adres eksik kullanici kombinasyonlarini kesfettiginde, scripted test\'te hic yazilmayan "20 urun eklenince sayfa scroll mu ediyor, yoksa layout mi kiriyor?" gibi bir bug bulabiliyor.',
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
                },
                dragDrop: {
                    title: 'Kesifci test oturumunun adimlarini sirala',
                    prompt: 'Bir exploratory test oturumunu (session) sistematik hale getiren adim sirasini olustur.',
                    success: 'Dogru sira. Charter, hipotez, kesif ve not alma dongusu kesifci testi rastgele tiklamadan ayirir.',
                    expected: ['charter', 'hypothesis', 'explore', 'note', 'newHypothesis'],
                    items: [
                        { id: 'newHypothesis', text: 'Bulgulara gore yeni bir hipotez uret ve tekrar kesfet' },
                        { id: 'charter', text: 'Oturumun hedefini (charter) belirle' },
                        { id: 'note', text: 'Bulduklarini not al veya belgeler' },
                        { id: 'hypothesis', text: 'Riskin nerede olabilecegine dair bir hipotez kur' },
                        { id: 'explore', text: 'Urunu kurcalayarak hipotezini gozlemle' },
                    ],
                },
                practice: {
                    prompt: 'Bir arama kutusu icin 5 dakikalik bir exploratory test charter\'i (hedef) ve deneyecegin 2 farkli girdi yaz.',
                    keywords: ['hedef', 'charter', 'dene'],
                    modelAnswer: 'Charter: Arama kutusunun ozel karakterlere ve bos girdiye nasil tepki verdigini kesfet. Denenecekler: 1) Sadece bosluk karakteri girip aratmak, 2) SQL karakterleri iceren bir metin (%, \' gibi) girip aratmak.',
                },
            },
            {
                id: 'bug-report',
                shortTitle: 'Bug Raporu',
                color: '#ef4444',
                title: '4. Bug report = ekibin hatayi yeniden uretmesini saglayan tarif',
                analogy: 'Araban bozuldugunda ustaya "calismiyor" demek tek basina islevsizdir; usta tahmin yurutur, zaman kaybeder. Ama "sabah sogukta 80 km/s\'de iken sag onde titreme basladi ve motor isik yandi" dediginde usta hangi parcayi kontrol edecegini cok daha hizli daraltir. Bug report da ayni sebeple net adim ve kanit ister. Burada dusundurucu soru su: "Developer zaten stack trace\'e bakmiyor mu, neden ayrica adimlar yazayim?" Stack trace hata noktasini gosterir; ama o noktaya ulasmak icin kullanicinin hangi veri ve sirayla ilerlemesi gerektigini gostermez.',
                why: 'Java\'da bir exception firladiginda stack trace hata sinifini, satir numarasini ve cagri yigini verir — bu "actual" ile "where" sorusunu cevaplar. Ama "nasil uretilir?" sorusunu cevaplamaz. Iyi bug report bu bolumu tamamlar: Environment (tarayici, OS, app version), Steps to Reproduce (sirasiz degil, numarali), Expected Result (ne olmasi gerekiyordu?), Actual Result (ne oldu?), Evidence (ekran goruntusu, log, video). Stack trace olmadan da anlasilabilir; adimlar olmadan developer sadece tahmin eder.',
                realLife: 'Mobil uygulamada odeme sonrasi bos ekran gorunen bir bug icin "bos ekran geliyor" yazmak yerine cihaz modeli (Pixel 8), app version (2.8.1), kullanici tipi (misafir odeme), odeme yontemi (Visa ile Ode) ve network durumu (4G, VPN olmadan) rapora girdigi anda bug severity ve yeniden uretme suresi dramatik sekilde azalir.',
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
                },
                dragDrop: {
                    title: 'Eksiksiz bug raporu yazma sirasini olustur',
                    prompt: 'Bir developer\'in hatayi hemen anlayabilecegi bug raporunu yazma sirasini kur.',
                    success: 'Dogru sira. Ortam, adimlar, beklenen, gerceklesen ve kanit — bu sira developer\'in tahmin yurutmesini engeller.',
                    expected: ['environment', 'steps', 'expected', 'actual', 'evidence'],
                    items: [
                        { id: 'evidence', text: 'Ekran goruntusu veya log ekle (Evidence)' },
                        { id: 'environment', text: 'Cihaz, tarayici ve app versiyonunu not et (Environment)' },
                        { id: 'actual', text: 'Ne oldugunu yaz (Actual Result)' },
                        { id: 'steps', text: 'Numarali yeniden uretme adimlarini yaz (Steps to Reproduce)' },
                        { id: 'expected', text: 'Ne olmasi gerektigini yaz (Expected Result)' },
                    ],
                },
                practice: {
                    prompt: '"Profil fotografi yuklenmiyor" hatasi icin eksiksiz bir bug raporu yaz (ortam, adimlar, beklenen, gerceklesen).',
                    keywords: ['ortam', 'adim', 'beklenen', 'gerceklesen'],
                    modelAnswer: 'Ortam: iPhone 14, app v3.2.0. Adimlar: 1) Profil sayfasini ac, 2) Fotograf ikonuna bas, 3) Galeriden bir fotograf sec. Beklenen: Fotograf profile yuklenir. Gerceklesen: Yukleme cubugu donuyor ama fotograf hic gorunmuyor.',
                },
            },
            {
                id: 'severity',
                shortTitle: 'Severity',
                color: '#8b5cf6',
                title: '5. Severity = hatanin kullaniciya ve is akisina etkisi',
                analogy: 'Restoranda tuzluk yoksa musteri rahatsiz olur ama restoran kapanmaz. Yangin alarmi calismiyorsa can riski var demektir. Ikisi de "sorun" ama biri hemen yanit ister, digeri bekliyebilir. Burada kritik soru su: "Her bug critical degil mi, neden siniflandiriyoruz?" Cunku gelistirme ekibinin dikkatini ve sprint kapasitesini sonlu. QA severity atamadan "her sey onemli" dersen ekip hangisini once cozeceğini bilemez, can alici bug gorunmez kalir.',
                why: 'Java dunyasinda exception hiyerarsisini dusun: bir UI label\'daki null degeri sadece bos gorunum uretir (Minor), ama PaymentService\'in `processPayment()` metodundaki NullPointerException tum odeme akisini cokertir (Critical). QA severity siniflandirmasi da ayni mantikla calisir: "Bu hata hangi is akisini engelliyor, kac kullaniciy etkileyecek, workaround var mi?" sorulari severity karar agacini olusturur.',
                realLife: 'Checkout butonu hic calismiyorsa Critical (tum satin alim durdu), kupon kodu gecerli olmasina ragmen indirim uygulanmiyorsa Major (alternatif yol var ama para kaybedilebilir), profil sayfasinda kucuk bir yazim hatasi varsa Minor (kullanici deneyimini etkiler ama is akisi devam eder). Bu listeyi netce dokumeden stand-up\'ta "hangisini once cozuyoruz" tartismasi saatlerce surer.',
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
                },
                dragDrop: {
                    title: 'Severity belirleme sorularini sirala',
                    prompt: 'Bir hataya severity atarken sordugun sorularin mantikli sirasini kur.',
                    success: 'Dogru sira. Once etki, sonra kapsam, sonra workaround — bu sira dogru severity kararini uretir.',
                    expected: ['impact', 'scope', 'workaround', 'assign', 'notify'],
                    items: [
                        { id: 'notify', text: 'Belirlenen severity ile ekibi bilgilendir' },
                        { id: 'impact', text: 'Bu hata hangi is akisini engelliyor?' },
                        { id: 'assign', text: 'Toplanan bilgilerle severity degerini sec' },
                        { id: 'scope', text: 'Kac kullaniciyi/senaryoyu etkiliyor?' },
                        { id: 'workaround', text: 'Gecici bir cozum (workaround) var mi?' },
                    ],
                },
                practice: {
                    prompt: '"Arama sonuclari sayfasi 2 saniye gec aciliyor" hatasina bir severity ver ve nedenini yaz.',
                    keywords: ['etki', 'kullanici', 'is akisi'],
                    modelAnswer: 'Severity: Minor/Major sinirinda. Ana is akisini (satin alma) tamamen durdurmuyor, kullanici sonucta arama sonucunu goruyor; ama kullanici deneyimini ve donusum oranini olumsuz etkiledigi icin Major olarak da savunulabilir — karar, sirket icin arama ozelliginin ne kadar kritik oldugunu etkiler.',
                },
            },
            {
                id: 'regression',
                shortTitle: 'Regression',
                color: '#14b8a6',
                title: '6. Regression test = eski calisan seyin hala calistigini kanitlamak',
                analogy: 'Evde muslugu tamir ettikten sonra sadece yeni parcaya bakmazsin; lavabo gideri tikali mi, sicak su hala calisiyor mu, banyo duvari titremiyor mu diye de kontrol edersin. Peki "biz sadece o bolumu duzeltik, neden baska yerlere bakalim?" sorusu akla gelir. Yazilim modulleri birbirine o kadar bagli ki, bir yerden yapilan degisiklik tamamen ilgisiz gorundugu bir baska is akisini kırabilir; buna side effect denir ve QA bunu onceden koklemezse production\'da gorulur.',
                why: 'Java\'da bir sinifa yeni bir metod eklendiginde ya da refactor yapildiginda `mvn test` veya `gradle test` komutuyla tum test suite yeniden kosulur. Bu tam anlamiyla regression test uygulamasidir: eski garantilerin hala gecerli olup olmadigini sistematik dogrulama. Manuel regression da ayni ilkeyi izler: yeni fix sonrasinda, degisiklikle iliski kurulabilecek tum kritik akislar smoke testten gecirilir; risk degerlendirmesine gore derinlestirilir.',
                realLife: 'Kupon bugI duzeltildiginde QA sadece kuponu degil; normal kart odemesini, havale akisini, kapida odeyi, iade formunu ve siparis onay mailini de duman testiyle kontrol eder. Bu adim atlanirsa "biz sadece kupon fix ettik" diye kapatilan ticket, bir hafta sonra iade akisini kirdigi icin yeniden acilabilir.',
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
                },
                dragDrop: {
                    title: 'Regression surecinin adimlarini sirala',
                    prompt: 'Bir fix sonrasi izlenmesi gereken regression test surecinin dogru sirasini kur.',
                    success: 'Dogru sira. Once etkilenen akislari belirle, once smoke, sonra derin regression uygula.',
                    expected: ['identify', 'list', 'smoke', 'deep', 'report'],
                    items: [
                        { id: 'report', text: 'Sonuclari raporla' },
                        { id: 'identify', text: 'Degisen kodu veya moduli belirle' },
                        { id: 'deep', text: 'Riskli alanlara derinlemesine regression uygula' },
                        { id: 'list', text: 'Bu degisiklikle iliskili is akislarini listele' },
                        { id: 'smoke', text: 'Once kritik akislari smoke test ile hizlica kontrol et' },
                    ],
                },
                practice: {
                    prompt: '"Sepete urun ekleme" ozelliginde kucuk bir fix yapildi. Hangi 3 akisi regression olarak test edersin, yaz.',
                    keywords: ['odeme', 'sepet', 'fiyat'],
                    modelAnswer: 'Ornek: 1) Sepete birden fazla urun eklenince toplam fiyat dogru mu hesaplaniyor? 2) Sepetten urun silinince fiyat guncelleniyor mu? 3) Sepetteki urunlerle odeme (checkout) akisi hala sorunsuz tamamlaniyor mu?',
                },
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
            dragDropTitle: '🔀 Drag & Drop: Order the Process',
            practiceTitle: '✍️ Practice: Write It Yourself',
            practiceCheck: 'Check My Answer',
            practiceKeywords: 'Key points you should cover:',
            practiceModelLabel: 'Model Answer',
            practiceSuccess: 'Compare your answer with the model answer — it does not need to match word for word, just capture the reasoning.',
        },
        lessons: [
            {
                id: 'mindset',
                shortTitle: 'Mindset',
                color: '#0ea5e9',
                title: '1. Manual testing = experiencing the product like a user',
                analogy: 'Imagine buying a coffee machine. You do not just press the button — you check what happens when water runs out, when there is no cup, when coffee overflows. But here is the key question: why is "does the button work?" not enough? Because the user already assumes the button works when they buy the machine. The real risk is whether their expectation is met. Manual testing operates with this exact mindset: it does not just verify the product exists and runs — it proves, with evidence, whether the product meets real user expectations.',
                why: 'In Java unit tests you cover not only the happy-path input but also null, empty list, and boundary values using assertThrows, assertNull, and assertEquals. Manual testing applies the same thinking at the UI layer: alongside "does this screen work with valid data?" it also asks "what does this screen do with invalid data?" One key difference: a unit test isolates a single method; a manual test covers the full experience across the flow a user actually goes through.',
                realLife: 'On an e-commerce checkout page, QA does not only check "did the payment go through?" — it also checks coupon expiry, last-stock race conditions, declined card messages, and whether error messages are in the right language. Any of these untested scenarios can become the first painful experience a real user encounters on release day.',
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
                },
                dragDrop: {
                    title: 'Order the user-mindset testing process',
                    prompt: 'Build the correct thinking order for testing a feature through the user\'s eyes.',
                    success: 'Correct order. Observe first, then think about expectation, imagine risks, try them, and compare.',
                    expected: ['observe', 'expect', 'imagine', 'try', 'compare'],
                    items: [
                        { id: 'try', text: 'Actually try the risky scenarios you imagined' },
                        { id: 'observe', text: 'Observe what the feature does (does the button work?)' },
                        { id: 'compare', text: 'Compare the result with the user\'s expectation' },
                        { id: 'expect', text: 'Think about what the user expects from this feature' },
                        { id: 'imagine', text: 'Imagine what could go wrong (water running out, no cup, etc.)' },
                    ],
                },
                practice: {
                    prompt: 'Think of an app you use daily (for example, a food delivery app). Write 2 edge cases you should test beyond the happy path.',
                    keywords: ['empty', 'error', 'boundary', 'unexpected'],
                    modelAnswer: 'Example: What happens if the user taps "Place Order" with an empty cart? What happens if they try to proceed to payment without selecting a delivery address? Both fall outside the happy path and could genuinely hurt the user experience.',
                },
            },
            {
                id: 'test-case',
                shortTitle: 'Test Case',
                color: '#22c55e',
                title: '2. Test case = a small experiment with proof',
                analogy: 'A doctor does not order a vague test — the specific panel, sample type, and expected reference range are all written down. A test case works the same way: every run must produce the same experiment. Here is the key question: why is "log in and check" not a test case? Because two people reading that instruction would do different things — one might skip the password field, another might use a different browser. A test case exists to make the experiment reproducible by anyone, anytime.',
                why: 'A JUnit test method follows Arrange (set up preconditions), Act (run the action), Assert (verify the result) — this is the standard Java testing contract. A manual test case mirrors exactly that structure: Precondition (a registered, active user exists), Steps (open page → enter email → enter password → click Login), Expected Result (dashboard is visible, username appears in header). The difference: JUnit runs automatically; a manual test case delivers the same precision in human hands.',
                realLife: 'When a login bug is reported in production, the person who wins the "I tested it and it worked" argument is the one who can show a test case with a screenshot. Without a clear precondition, numbered steps, and expected result, QA produces no evidence, and the team closes the ticket as "cannot reproduce."',
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
                },
                dragDrop: {
                    title: 'Order the process of writing a good test case',
                    prompt: 'Build the thinking order followed before and while writing a test case.',
                    success: 'Correct order. Understand the feature first, then nail down precondition, steps, and expected result, then run it.',
                    expected: ['understand', 'precondition', 'steps', 'expected', 'run'],
                    items: [
                        { id: 'run', text: 'Run the test case and verify the result' },
                        { id: 'understand', text: 'Understand the feature under test and its purpose' },
                        { id: 'expected', text: 'Define the expected result in a clear sentence' },
                        { id: 'precondition', text: 'Decide what state the system must be in before testing' },
                        { id: 'steps', text: 'Write numbered, repeatable steps' },
                    ],
                },
                practice: {
                    prompt: 'Write a short test case for a "forgot password" flow using precondition / steps / expected result format.',
                    keywords: ['precondition', 'step', 'expected'],
                    modelAnswer: 'Precondition: A registered email address exists. Steps: 1) Click "Forgot password" on the login page, 2) Enter the email address, 3) Click Submit. Expected Result: A "Password reset link sent to your email" message is displayed.',
                },
            },
            {
                id: 'exploratory',
                shortTitle: 'Explore',
                color: '#f59e0b',
                title: '3. Exploratory testing = navigating with a map, not by memorizing',
                analogy: 'The first time you enter a shopping mall, you do not have a pre-written script for every store — but you are not wandering randomly either. You form a mental map: where is the exit, is there an elevator, which floor has food? The thought-provoking question here is: if we already have scripted test cases, why do we need exploratory testing on top? Because scripted tests only cover what the person writing them could imagine. Exploratory testing catches the scenarios no one thought to write — the ones real users actually hit.',
                why: 'An experienced Java developer using a debugger does not step through every line blindly. They form a hypothesis ("this NPE probably comes from this null check"), step through to confirm or revise, and note what they find. Exploratory testing uses exactly that mental model: a charter (target area), a hypothesis (where might the risk be?), observation (what am I seeing?), and notes (what did I find?). The difference from scripted testing is the same as the difference between reading a book and writing one — the tester learns and generates new tests at the same time.',
                realLife: 'A QA engineer exploring the checkout flow discovers that adding 20 items causes a layout break that was never tested — because the script only ever added 1 item. Exploratory sessions with unusual data volumes, expired tokens, slow networks, and interrupted flows regularly uncover bugs that scripted suites completely miss.',
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
                },
                dragDrop: {
                    title: 'Order the exploratory testing session steps',
                    prompt: 'Build the step order that makes an exploratory session systematic.',
                    success: 'Correct order. The charter, hypothesis, explore, and note loop is what separates exploratory testing from random clicking.',
                    expected: ['charter', 'hypothesis', 'explore', 'note', 'newHypothesis'],
                    items: [
                        { id: 'newHypothesis', text: 'Form a new hypothesis from findings and explore again' },
                        { id: 'charter', text: 'Define the session goal (charter)' },
                        { id: 'note', text: 'Take notes or document findings' },
                        { id: 'hypothesis', text: 'Form a hypothesis about where the risk might be' },
                        { id: 'explore', text: 'Poke at the product to observe your hypothesis' },
                    ],
                },
                practice: {
                    prompt: 'Write a 5-minute exploratory test charter (goal) for a search box, plus 2 different inputs you would try.',
                    keywords: ['goal', 'charter', 'try'],
                    modelAnswer: 'Charter: Discover how the search box reacts to special characters and empty input. Inputs to try: 1) Searching with only a space character, 2) Searching with SQL-like characters (%, \') in the text.',
                },
            },
            {
                id: 'bug-report',
                shortTitle: 'Bug Report',
                color: '#ef4444',
                title: '4. Bug report = a recipe that lets the team reproduce the failure',
                analogy: 'When your car breaks down, telling the mechanic "it does not work" leads to guesswork and wasted time. But saying "yesterday morning in the cold, at 80 km/h, the front right started vibrating and the engine light came on" immediately narrows down the likely component. A bug report works exactly the same way: the more precisely you describe the conditions, the faster the developer can stop guessing and start fixing. The key question to ask yourself: if the developer does not have my browser, my account, and my exact data — can they still reproduce this?',
                why: 'A Java stack trace answers "what broke and where" — it gives the exception class, the line number, and the call stack. But it does not answer "how do I get there?" A good bug report fills that gap: Environment (browser, OS, app version), Steps to Reproduce (numbered, precise), Expected Result (what should have happened), Actual Result (what actually happened), Evidence (screenshot, video, log). A stack trace without reproduction steps is like a GPS coordinate without directions — you know where the crash happened, but not how to get there.',
                realLife: 'For a blank screen appearing after mobile payment, reporting the device model (Pixel 8), app version (2.8.1), user type (guest checkout), payment method (Visa via Google Pay), and network condition (4G, no VPN) reduces reproduction time from hours to minutes and makes it possible to assign the ticket to the right team immediately.',
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
                },
                dragDrop: {
                    title: 'Order the parts of a complete bug report',
                    prompt: 'Build the order for writing a bug report a developer can act on immediately.',
                    success: 'Correct order. Environment, steps, expected, actual, and evidence — this order stops the developer from guessing.',
                    expected: ['environment', 'steps', 'expected', 'actual', 'evidence'],
                    items: [
                        { id: 'evidence', text: 'Attach a screenshot or log (Evidence)' },
                        { id: 'environment', text: 'Note the device, browser, and app version (Environment)' },
                        { id: 'actual', text: 'Write what actually happened (Actual Result)' },
                        { id: 'steps', text: 'Write numbered reproduction steps (Steps to Reproduce)' },
                        { id: 'expected', text: 'Write what should have happened (Expected Result)' },
                    ],
                },
                practice: {
                    prompt: 'Write a complete bug report for "profile photo fails to upload" (environment, steps, expected, actual).',
                    keywords: ['environment', 'step', 'expected', 'actual'],
                    modelAnswer: 'Environment: iPhone 14, app v3.2.0. Steps: 1) Open profile page, 2) Tap the photo icon, 3) Choose a photo from the gallery. Expected: The photo uploads to the profile. Actual: The loading spinner keeps spinning but the photo never appears.',
                },
            },
            {
                id: 'severity',
                shortTitle: 'Severity',
                color: '#8b5cf6',
                title: '5. Severity = the impact of a defect on users and business flow',
                analogy: 'In a restaurant, missing salt is annoying — but a broken fire alarm is life-critical. Both are problems, but they demand completely different response times and resources. The thought-provoking question here is: "Why should QA classify bugs at all — is not everything important?" The answer is that a development team has finite capacity. Without severity, "everything is important" means the team cannot decide what to fix first, and the critical bug that blocks all payments stays invisible behind a pile of cosmetic issues.',
                why: 'In Java, think of the exception hierarchy: a NullPointerException in a UI label produces an empty display (Minor), but a NullPointerException inside PaymentService.processPayment() crashes the entire payment flow (Critical). QA severity classification uses exactly the same reasoning: "Which business flow does this block? How many users are affected? Is there a workaround?" These three questions form the decision tree that maps defects to severity levels — and they make the priority conversation in stand-up take minutes instead of hours.',
                realLife: 'A checkout button that never works is Critical (all purchases blocked), a coupon that does not apply its discount is Major (money is at risk and there is no clean workaround), a typo in the help text is Minor (experience affected, but the flow continues). Presenting this list clearly is what turns a QA report into a prioritized action plan rather than a list of complaints.',
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
                },
                dragDrop: {
                    title: 'Order the severity-decision questions',
                    prompt: 'Build the logical order of questions you ask when assigning severity to a bug.',
                    success: 'Correct order. Impact first, then scope, then workaround — this order produces the right severity decision.',
                    expected: ['impact', 'scope', 'workaround', 'assign', 'notify'],
                    items: [
                        { id: 'notify', text: 'Notify the team with the assigned severity' },
                        { id: 'impact', text: 'Which business flow does this block?' },
                        { id: 'assign', text: 'Assign the severity value using the gathered facts' },
                        { id: 'scope', text: 'How many users or scenarios are affected?' },
                        { id: 'workaround', text: 'Is there a temporary workaround?' },
                    ],
                },
                practice: {
                    prompt: 'The "search results page loads 2 seconds slower" bug is reported. Assign it a severity and write why.',
                    keywords: ['impact', 'user', 'workflow'],
                    modelAnswer: 'Severity: borderline Minor/Major. It does not fully block the core flow (purchase) since the user eventually sees results; but it can also be argued as Major because it hurts user experience and conversion — the final call depends on how business-critical search is for the product.',
                },
            },
            {
                id: 'regression',
                shortTitle: 'Regression',
                color: '#14b8a6',
                title: '6. Regression testing = proving old behavior still works',
                analogy: 'After fixing a leaky faucet, you do not just check the new washer — you also check for drips under the sink, run the hot water, and make sure the drain still flows. The key question to ask yourself: "We only changed that one part, why check everything else?" Because software modules are far more interconnected than faucet pipes. A change in one service or module can silently break something that appears completely unrelated — this is called a side effect, and QA catches it before the user does.',
                why: 'In Java development, after any new code addition or refactor, the test suite is run with `mvn test` or `gradle test`. This is regression testing in its purest form: systematically verifying that old guarantees still hold. Manual regression applies the same principle at the UI layer: after a fix, all flows that could plausibly be affected are smoke-tested, and the highest-risk adjacent areas are tested more deeply. The difference from automated regression is that a human tester can notice visual glitches, layout shifts, and UX degradations that automated scripts simply skip.',
                realLife: 'When a coupon bug is fixed, QA does not only re-test the coupon — it also smoke-tests normal card payment, bank transfer, cash on delivery, order confirmation email, and the refund flow. Skipping this step is how "we only fixed the coupon" becomes a ticket reopened a week later when it turns out the fix broke the refund calculation.',
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
                },
                dragDrop: {
                    title: 'Order the regression testing process',
                    prompt: 'Build the correct order for the regression process to follow after a fix.',
                    success: 'Correct order. Identify affected flows first, smoke test, then go deeper on regression.',
                    expected: ['identify', 'list', 'smoke', 'deep', 'report'],
                    items: [
                        { id: 'report', text: 'Report the results' },
                        { id: 'identify', text: 'Identify the changed code or module' },
                        { id: 'deep', text: 'Apply deeper regression on risky areas' },
                        { id: 'list', text: 'List the business flows related to this change' },
                        { id: 'smoke', text: 'Smoke test critical flows quickly first' },
                    ],
                },
                practice: {
                    prompt: 'A small fix was made to the "add item to cart" feature. Write 3 flows you would test as regression.',
                    keywords: ['payment', 'cart', 'price'],
                    modelAnswer: 'Example: 1) Is the total price still calculated correctly when multiple items are added? 2) Does the price update correctly when an item is removed? 3) Does checkout with items in the cart still complete without errors?',
                },
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
