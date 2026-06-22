export const algorithmsData = {
    tr: {
        hero: {
            eyebrow: "Gor, Anla, Dene",
            title: "Algoritmalar: QA Muhendisinin Gorsel Problem Cozme Atolyesi",
            subtitle: "Sorting, binary search, graph traversal, state machine ve complexity kavramlarini test otomasyonu senaryolariyla ogren.",
            intro: "Algoritma, bir isi yaparken izledigin net tarif gibidir. QA'da bu tarif; flaky test bulmak, hata onceliklendirmek, checkout akislarini gezmek ve test suite'i hizlandirmak icin kullanilir.",
        },
        tabs: ["Baslangic", "Sorting", "Binary Search", "Graph Traversal", "State Machine", "Complexity"],
        page: {
            navTitle: "Algoritma Haritasi",
            markDone: "Tamamlandi olarak isaretle",
            done: "Tamamlandi",
            reset: "Sifirla",
            run: "Calistir",
            again: "Tekrar calistir",
            check: "Kontrol et",
            correct: "Dogru",
            moveUp: "Yukari",
            moveDown: "Asagi",
            selected: "Secildi",
            javaCompare: "Java baglantisi",
            qaUse: "QA'da nerede kullanilir?",
            algorithmIdea: "Algoritma fikri",
            complexity: "Complexity",
            quizTitle: "Mini kontrol",
            answer: "Cevapla",
            glossaryTitle: "Algoritma sozlugu",
            visualTitle: "Gorsel lab",
        },
        principles: [
            {
                label: "Input",
                text: "Test datasi, hata listesi, commit araligi veya kullanici akisi.",
            },
            {
                label: "Steps",
                text: "Ayni sonucu uretecek kadar net sirali adimlar.",
            },
            {
                label: "Output",
                text: "Oncelikli bug listesi, bulunan kok neden, gezilen flow veya performans karari.",
            },
        ],
        sections: [
            {
                id: "intro",
                shortTitle: "Baslangic",
                title: "1. Algoritmik dusunme: once problemi parcalara ayir",
                difficulty: "beginner",
                accent: "violet",
                tag: "Problem solving",
                analogy: "Bir yemek tarifi gibi dusun: malzemeler input, tarif adimlari algorithm, tabaktaki yemek output olur. QA'da malzeme bazen test datasi, bazen hata raporu, bazen de sayfa akisidir.",
                definition: "Algorithm, belirli bir problemi cozmek icin sonlu ve sirali adimlardan olusan plandir. Iyi algorithm; tekrar edilebilir, gozlemlenebilir ve edge case'leri dusunulmus plandir.",
                qaUse: "Test case tasarlarken path'leri ayirirsin, bug triage yaparken kriterlere gore siralarsin, flaky test ararken ihtimal alanini daraltirsin.",
                javaCompare: "Java'da bir method nasil input alip sonuc donduruyorsa, algorithm de ayni zihinsel modeldir. Method body'si adimlarin kod hali, unit test'ler de bu adimlarin dogrulamasidir.",
                visualKind: "flow",
                feynman: {
                    keywords: ['parca', 'problem', 'adim', 'tarif', 'cozum'],
                    forbiddenWords: ['recursive', 'function', 'class', 'object', 'data'],
                    modelAnswer: 'Algoritmik düşünme, büyük ve karmaşık bir problemi daha küçük, çözülebilir parçalara bölerek adım adım bir tarif oluşturmaktır.'
                },
                recall: {
                    question: 'Algoritmik düşünmede "tarif" (adım adım yaklaşım) neden önemlidir?',
                    answer: 'Çünkü bilgisayar tahmin etmez. Karmaşık bir problemi çözmek için sıralı, net ve edge case\'leri düşünülmüş adımlar tasarlamak zorundayız.'
                },
                complexity: ["Net adim", "Tekrar edilebilir sonuc", "Edge case farkindaligi"],
                blocks: [
                    {
                        type: "simple-box",
                        content: "Algoritma, bir isi kaybolmadan yapmak icin izlenen tarif gibidir. QA'da bu tarif sayesinde ayni hatayi tekrar bulabilir, ayni testi guvenle calistirabilir ve nerede yavasladigini gorebilirsin.",
                    },
                    {
                        type: "text",
                        content: "Algoritmik dusunme QA muhendisinin gunluk kararlarini netlestirir: once veriyi gor, sonra kurali sec, sonra sonucu test et.",
                    },
                ],
                code: `public BugDecision classifyBug(BugReport bug) {          // Bug raporunu tek bir karar fonksiyonuna veririz
    if (bug.isBlockingPayment()) {                     // Odeme akisi duruyorsa en yuksek risk kabul edilir
        return BugDecision.STOP_RELEASE;               // Release durdurma karari dondurulur
    }                                                  // Kritik kosul bitti
    if (bug.hasWorkaround()) {                         // Kullanici icin gecici cozum var mi kontrol edilir
        return BugDecision.FIX_AFTER_RELEASE;          // Release sonrasi fix edilebilir
    }                                                  // Workaround kontrolu bitti
    return BugDecision.ADD_TO_BACKLOG;                 // Geri kalanlar backlog'a eklenir
}`,
                quiz: {
                    question: "Bir QA algoritmasinda output ne olabilir?",
                    options: [
                        { id: "a", text: "Sadece kod satiri sayisi" },
                        { id: "b", text: "Oncelikli bug listesi veya bulunan kok neden" },
                        { id: "c", text: "Sadece browser adi" },
                    ],
                    correct: "b",
                    explanation: "QA'da algorithm sonucu genellikle karar veya kanittir: hangi bug once cozulmeli, hangi commit sorunlu, hangi flow eksik gezildi gibi.",
                },
            },
            {
                id: "sorting",
                shortTitle: "Sorting",
                title: "2. Sorting: bug'lari riske gore sirala",
                difficulty: "beginner",
                accent: "emerald",
                tag: "Priority queue",
                analogy: "Hastanede acil servis sirasi gibi: herkes siraya girer ama nefes alamayan hasta, bas agrisi olan kisiden once bakilir. Bug triage'da da siralama riskle yapilir.",
                definition: "Sorting, elemanlari bir kurala gore yeniden duzenleme isidir. Kural sayisal olabilir, tarih olabilir, risk skoru olabilir.",
                qaUse: "Release oncesi hata listesini impact, frequency ve workaround durumuna gore siralamak icin kullanilir.",
                javaCompare: "Java'da `Collections.sort(list, comparator)` ile yaptigin sey budur. Comparator QA dunyasinda `payment > auth > cosmetic` gibi is kurali tasir.",
                visualKind: "sort",
                feynman: {
                    keywords: ['siralamak', 'kural', 'karsilastirmak', 'oncelik', 'buyuk'],
                    forbiddenWords: ['sort', 'collections', 'comparator', 'complexity', 'array'],
                    modelAnswer: 'Sıralama, elimizdeki elemanları belirli bir kurala (büyüklük, risk, önem derecesi vb.) göre yan yana dizip karşılaştırarak düzene sokma işidir.'
                },
                recall: {
                    question: 'QA mülakatlarında ve triage işlemlerinde sıralama (sorting) nasıl kullanılır?',
                    answer: 'Hataları (bug) risk puanı, frekans ve etki durumlarına göre karşılaştırıp en kritik olandan en hafife doğru sıralamak için kullanılır.'
                },
                complexity: ["Comparison sort: O(n log n)", "Tek tek arama: O(n)", "Yanlis kriter: dogru siralama degil"],
                blocks: [
                    {
                        type: "simple-box",
                        content: "Bir oyuncak kutusunu boy sirasina dizmek gibi dusun. QA'da oyuncaklar bug'lardir; en tehlikeli olanlar kutunun en ustune gelmelidir.",
                    },
                    {
                        type: "text",
                        content: "Sorting, ekip dikkatini dogru yere tasir. QA icin onceliklendirme sadece 'kim once yazdi' degil, 'kullaniciya en cok ne zarar verir' sorusudur.",
                    },
                ],
                lab: {
                    title: "Bug triage siralama oyunu",
                    prompt: "Kartlari en kritik bug en ustte olacak sekilde sirala.",
                    success: "Release risk sirasi dogru. Bu liste artik stand-up'ta savunulabilir.",
                    hint: "Kullanici parasini, login'i ve veri kaybini cosmetic problemlerden once dusun.",
                    expectedOrder: ["payment-500", "auth-lock", "data-loss", "checkout-timeout", "visual-badge"],
                    items: [
                        {
                            id: "visual-badge",
                            title: "Badge rengi yanlis",
                            meta: "Cosmetic / workaround var",
                            score: 18,
                            color: "slate",
                        },
                        {
                            id: "checkout-timeout",
                            title: "Checkout 12 sn suruyor",
                            meta: "Performance / sepet etkileniyor",
                            score: 72,
                            color: "amber",
                        },
                        {
                            id: "payment-500",
                            title: "Odeme 500 donuyor",
                            meta: "Revenue blocker / workaround yok",
                            score: 99,
                            color: "red",
                        },
                        {
                            id: "data-loss",
                            title: "Adres kaydi siliniyor",
                            meta: "Data integrity / siklik dusuk",
                            score: 84,
                            color: "orange",
                        },
                        {
                            id: "auth-lock",
                            title: "Login denemesi hesabi kilitliyor",
                            meta: "Access blocker / cok kullanici",
                            score: 91,
                            color: "rose",
                        },
                    ],
                },
                code: `List<BugReport> bugs = loadReleaseBugs();              // Release oncesi acik bug listesini al
bugs.sort((left, right) -> {                            // Iki bug'i karsilastiran comparator yaz
    int byRisk = right.riskScore() - left.riskScore();   // Yuksek risk en uste gelsin
    if (byRisk != 0) return byRisk;                      // Risk farkliysa siralama tamam
    return left.createdAt().compareTo(right.createdAt()); // Risk esitse eski bug once gelsin
});                                                      // Sorting algoritmasi listeyi yeniden dizer
assert bugs.get(0).isReleaseBlocker();                   // Ilk siradaki bug release blocker olmali`,
                quiz: {
                    question: "Bug triage icin en saglam sorting kriteri hangisidir?",
                    options: [
                        { id: "a", text: "Bug'i kimin actigi" },
                        { id: "b", text: "Impact + frequency + workaround varligi" },
                        { id: "c", text: "Basligin uzunlugu" },
                    ],
                    correct: "b",
                    explanation: "QA onceligi kullanici etkisi, siklik ve alternatif cozum olup olmadigina gore savunulur.",
                },
            },
            {
                id: "binary-search",
                shortTitle: "Binary Search",
                title: "3. Binary Search: flaky test'in kok nedenini hizli bul",
                difficulty: "intermediate",
                accent: "cyan",
                tag: "Search space",
                analogy: "Sicak-soguk oyununda her seferinde alanin yarisini elemek gibi dusun. Tum odalara tek tek bakmak yerine once evin hangi yarisi sorunlu onu bulursun.",
                definition: "Binary search, sirali bir arama alanini her adimda ikiye bolerek hedefe ulasma algoritmasidir.",
                qaUse: "Regression hangi commit'te basladi, hangi test data araligi patliyor, hangi config degeri timeout uretir gibi durumlarda kullanilir.",
                javaCompare: "Java'daki `Collections.binarySearch` sadece sirali listede calisir. QA'daki karsiligi da ayni: commit'ler zaman sirasinda, test datalari artan degerde olmalidir.",
                visualKind: "binary",
                feynman: {
                    keywords: ['arama', 'ikiye', 'orta', 'sirali', 'eleman'],
                    forbiddenWords: ['binary', 'index', 'pointer', 'search', 'recursion'],
                    modelAnswer: 'İkili arama (binary search), sıralı bir listenin ortasındaki elemana bakıp, aradığımız şeyden büyükse sol yarısını, küçükse sağ yarısını seçerek arama alanını her adımda yarı yarıya daraltma yöntemidir.'
                },
                recall: {
                    question: 'Binary search yapmak için arama yapacağımız listenin en önemli şartı nedir?',
                    answer: 'Listenin mutlaka sıralı (sorted) olması gerekir. Aksi takdirde sağa mı sola mı gideceğimizi belirleyemeyiz.'
                },
                complexity: ["Linear search: O(n)", "Binary search: O(log n)", "On kosul: sirali alan"],
                blocks: [
                    {
                        type: "simple-box",
                        content: "Bir kitapta kelime ararken her sayfaya bakmak yerine ortadan acarsin. Kelime daha ilerideyse sol yarinin hepsini elersin.",
                    },
                    {
                        type: "text",
                        content: "Binary search QA'da 'her seyi dene' panigini azaltir. Sorunlu alan her adimda yarilanir ve ekip daha az build calistirarak kok nedene yaklasir.",
                    },
                ],
                lab: {
                    title: "Regression commit avcisi",
                    prompt: "12 commit icinde checkout testini bozan commit'i yarilayarak bul.",
                    success: "Kok neden bulundu: commit C07 timeout davranisini degistirmis.",
                    targetIndex: 6,
                    targetLabel: "C07",
                    items: ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12"],
                },
                code: `int low = 0;                                            // Arama araliginin baslangici
int high = commits.size() - 1;                          // Arama araliginin sonu
while (low < high) {                                    // Aralik tek commit'e dusene kadar devam et
    int mid = (low + high) / 2;                         // Ortadaki commit'i sec
    boolean fails = runCheckoutTest(commits.get(mid));  // Test bu commit'te fail oluyor mu bak
    if (fails) {                                        // Fail varsa sorun bu commit veya solundadir
        high = mid;                                     // Sag yarinin tamamini ele
    } else {                                            // Pass varsa sorun daha yeni commit'lerdedir
        low = mid + 1;                                  // Sol yarinin tamamini ele
    }                                                   // Bir adimda alan yariya indi
}                                                       // Dongu bitti
Commit firstBadCommit = commits.get(low);               // Ilk bozan commit bulundu`,
                quiz: {
                    question: "Binary search QA'da ne zaman guvenle kullanilir?",
                    options: [
                        { id: "a", text: "Arama alani sirali ve sonuc monotonic ise" },
                        { id: "b", text: "Bug raporlari rastgele siradaysa" },
                        { id: "c", text: "Hedef her adimda yer degistiriyorsa" },
                    ],
                    correct: "a",
                    explanation: "Pass -> fail gecisi gibi sirali ve monotonic bir davranis yoksa binary search yanlis tarafi eleyebilir.",
                },
            },
            {
                id: "graph",
                shortTitle: "Graph",
                title: "4. Graph Traversal: kullanici akislarini kapsa",
                difficulty: "intermediate",
                accent: "blue",
                tag: "BFS / DFS",
                analogy: "Metro haritasinda istasyon istasyon gezmek gibi dusun. Bir istasyondan hangi istasyonlara gidilebildigini bilerek tum olasi yollari kontrol edersin.",
                definition: "Graph, node ve edge'lerden olusan baglanti modelidir. Traversal ise bu baglantilari BFS veya DFS gibi stratejilerle gezmektir.",
                qaUse: "E-commerce checkout, onboarding wizard, role-based menu ve microservice dependency akislari graph gibi modellenebilir.",
                javaCompare: "Java'da `Map<Page, List<Page>>` adjacency list yazarsin. BFS icin `Queue`, DFS icin `Stack` veya recursion kullanirsin.",
                visualKind: "graph",
                feynman: {
                    keywords: ['agac', 'akis', 'gezmek', 'derinlik', 'genislik'],
                    forbiddenWords: ['dfs', 'bfs', 'node', 'graph', 'tree', 'queue', 'stack'],
                    modelAnswer: 'Graf veya ağaç gezme, birbirine oklarla/bağlarla bağlı noktalar (sayfalar, adımlar) arasında kaybolmadan tüm yolları adım adım tarama işidir.'
                },
                recall: {
                    question: 'Test otomasyonunda web sayfalarındaki checkout akışlarını veya linkleri gezerken DFS ve BFS nasıl kullanılır?',
                    answer: 'Derinlemesine arama (DFS) bir yolu sonuna kadar gidip test etmek için, enlemesine arama (BFS) ise önce tüm yakın sayfaları (ana menü elemanlarını) test etmek için kullanılır.'
                },
                complexity: ["BFS/DFS: O(V + E)", "V: sayfa/state sayisi", "E: gecis sayisi"],
                blocks: [
                    {
                        type: "simple-box",
                        content: "Bir oyun haritasinda odalar ve kapilar vardir. Her odaya ugramak istiyorsan hangi kapidan nereye gidildigini takip etmen gerekir.",
                    },
                    {
                        type: "text",
                        content: "Graph traversal, test coverage'i gozle gorulur hale getirir. Sadece happy path degil, login failure, coupon error, payment retry gibi yan yollar da haritada gorunur.",
                    },
                ],
                lab: {
                    title: "Checkout flow BFS animasyonu",
                    prompt: "BFS calistirildiginda kuyruk ve ziyaret edilen sayfalar nasil degisir izle.",
                    success: "Tum ulasilabilir checkout flow'lari gezildi.",
                    start: "Home",
                    nodes: [
                        { id: "Home", x: 56, y: 46 },
                        { id: "Search", x: 208, y: 46 },
                        { id: "Product", x: 360, y: 46 },
                        { id: "Cart", x: 208, y: 154 },
                        { id: "Login", x: 56, y: 154 },
                        { id: "Payment", x: 360, y: 154 },
                        { id: "Success", x: 208, y: 260 },
                        { id: "Retry", x: 360, y: 260 },
                    ],
                    edges: [
                        ["Home", "Search"],
                        ["Home", "Login"],
                        ["Search", "Product"],
                        ["Product", "Cart"],
                        ["Cart", "Payment"],
                        ["Login", "Cart"],
                        ["Payment", "Success"],
                        ["Payment", "Retry"],
                        ["Retry", "Payment"],
                    ],
                    order: ["Home", "Search", "Login", "Product", "Cart", "Payment", "Success", "Retry"],
                },
                code: `Queue<Page> queue = new ArrayDeque<>();                // BFS icin kuyruk olustur
Set<Page> visited = new HashSet<>();                    // Gezilen sayfalari tekrar etmemek icin sakla
queue.add(Page.HOME);                                   // Baslangic sayfasini kuyruga ekle
visited.add(Page.HOME);                                 // Home artik ziyaret edildi
while (!queue.isEmpty()) {                              // Kuyruk bosalana kadar devam et
    Page current = queue.remove();                      // Siradaki sayfayi al
    assertPageLoads(current);                           // Sayfanin yuklendigini test et
    for (Page next : graph.get(current)) {              // Bu sayfadan gidilebilen sayfalari gez
        if (visited.add(next)) {                        // Daha once gezilmediyse isaretle
            queue.add(next);                            // Sonra test etmek icin kuyruga ekle
        }                                               // Tekrar ziyaret engellendi
    }                                                   // Komşu sayfalar bitti
}                                                       // Tum ulasilabilir flow'lar gezildi`,
                quiz: {
                    question: "Checkout flow'u graph olarak modellemek neyi kolaylastirir?",
                    options: [
                        { id: "a", text: "Sadece CSS renklerini degistirmeyi" },
                        { id: "b", text: "Hangi sayfa/state gecislerinin test edildigini gormeyi" },
                        { id: "c", text: "Tarayiciyi tamamen kaldirmayi" },
                    ],
                    correct: "b",
                    explanation: "Graph modeli coverage'i node ve edge olarak gosterir; eksik path'ler kolay fark edilir.",
                },
            },
            {
                id: "state-machine",
                shortTitle: "State Machine",
                title: "5. State Machine: UI testlerinde bekleme stratejisini netlestir",
                difficulty: "advanced",
                accent: "amber",
                tag: "Deterministic UI",
                analogy: "Trafik lambasi gibi dusun: kirmizidan direkt yesil yanabilir ama her durumun izin verilen gecisleri vardir. Yanlis anda hareket edersen kaza olur.",
                definition: "State machine, sistemin hangi state'lerde bulunabilecegini ve hangi event ile hangi state'e gececegini tanimlar.",
                qaUse: "Button disabled -> loading -> enabled -> submitted akisini modelleyerek flaky click ve premature assertion problemlerini azaltir.",
                javaCompare: "Java'da enum tabanli state machine yazarsin: `DISABLED`, `LOADING`, `READY`, `SUBMITTED`. Testte her transition icin assertion koyarsin.",
                visualKind: "state",
                feynman: {
                    keywords: ['durum', 'gecis', 'kural', 'tetikleyici', 'makine'],
                    forbiddenWords: ['state', 'machine', 'transition', 'automata', 'enum'],
                    modelAnswer: 'Durum makinesi, bir sistemin o an hangi konumda (durumda) olduğunu ve hangi eylemlerle (tetikleyicilerle) hangi yeni duruma geçebileceğini belirleyen kurallar bütünüdür.'
                },
                recall: {
                    question: 'Bir e-ticaret sepet otomasyonunda durum makinesi (state machine) neden kullanılır?',
                    answer: 'Sipariş durumlarının (Ödeme Bekliyor -> Hazırlanıyor -> Kargoda -> Teslim Edildi) geçersiz geçişler yapmasını (örn: ödenmeden kargoya verilme) engellemek ve testi bu kurallara göre koordine etmek için.'
                },
                complexity: ["State sayisi: kontrollu", "Yanlis transition: bug sinyali", "Flaky test azalir"],
                blocks: [
                    {
                        type: "simple-box",
                        content: "Bir asansor once kapisini kapatir, sonra hareket eder, sonra tekrar kapisini acar. Sirayi bozarsan yolculuk guvenli olmaz.",
                    },
                    {
                        type: "text",
                        content: "State machine UI otomasyonunda beklemeyi rastgele sleep olmaktan cikarir. Test, kullanicinin gorecegi state degisimlerini dogrular.",
                    },
                ],
                lab: {
                    title: "Login button state machine",
                    prompt: "Dogru event sirasi ile login butonunu submitted state'ine gotur.",
                    success: "State gecisleri temiz. Bu test sleep yerine state bekliyor.",
                    states: ["disabled", "ready", "loading", "submitted"],
                    events: [
                        { id: "type-email", label: "Email yaz", from: "disabled", to: "disabled" },
                        { id: "type-password", label: "Password yaz", from: "disabled", to: "ready" },
                        { id: "click-login", label: "Login'e tikla", from: "ready", to: "loading" },
                        { id: "api-200", label: "API 200 dondu", from: "loading", to: "submitted" },
                    ],
                    traps: [
                        { id: "early-click", label: "Disabled iken tikla", message: "ElementNotInteractableException riski" },
                        { id: "assert-too-soon", label: "Loading bitmeden assert", message: "Flaky assertion riski" },
                    ],
                },
                code: `LoginState state = LoginState.DISABLED;                // Baslangic state'i form eksik
state = form.typeEmail("qa@learnqa.dev");               // Email yazilir ama password yoksa disabled kalabilir
state = form.typePassword("Secret123");                 // Password yazilinca buton ready olur
wait.until(buttonIsEnabled());                          // Sleep yerine state beklenir
state = form.clickLogin();                              // Click loading state'ini baslatir
wait.until(responseStatusIs(200));                      // API sonucu beklenir
state = LoginState.SUBMITTED;                           // Basarili gecis submitted state'idir
assertEquals(LoginState.SUBMITTED, state);              // Beklenen son state dogrulanir`,
                quiz: {
                    question: "State machine neden flaky testleri azaltir?",
                    options: [
                        { id: "a", text: "Her adimi rastgele geciktirdigi icin" },
                        { id: "b", text: "Beklenen UI state'lerini ve gecisleri acikca tanimladigi icin" },
                        { id: "c", text: "Assertion kullanmayi gereksiz yaptigi icin" },
                    ],
                    correct: "b",
                    explanation: "Test artik '2 saniye bekle' demez; 'button enabled olana kadar bekle' der. Bu daha deterministiktir.",
                },
            },
            {
                id: "complexity",
                shortTitle: "Complexity",
                title: "6. Complexity: test suite yavaslamadan once kok nedeni gor",
                difficulty: "advanced",
                accent: "rose",
                tag: "Big O",
                analogy: "Market kasasinda tek sira mi, her urun icin tekrar magazayi gezmek mi? Kisi sayisi artinca kotu plan hemen yavaslar.",
                definition: "Complexity, input buyudukce algoritmanin zaman veya bellek ihtiyacinin nasil buyudugunu anlatir.",
                qaUse: "Test data temizleme, locator arama, API response validation ve rapor parsing buyudukce test suite suresini kontrol etmek icin kullanilir.",
                javaCompare: "Java Collections secimi burada belirleyicidir. `HashSet.contains` ortalama O(1), `ArrayList.contains` O(n) davranir; test datasi buyuyunce fark buyur.",
                visualKind: "complexity",
                feynman: {
                    keywords: ['zaman', 'buyume', 'hiz', 'hafiza', 'olcek'],
                    forbiddenWords: ['big o', 'notation', 'complexity', 'polynomial', 'logarithmic'],
                    modelAnswer: 'Karmaşıklık, veri miktarı arttıkça yazdığımız tarifin (algoritmanın) çalışma süresinin ve harcadığı hafıza miktarının nasıl büyüdüğünü gösteren ölçüdür.'
                },
                recall: {
                    question: 'O(1), O(N) ve O(N^2) arasındaki farkı zihinsel bir analojiyle açıklayın.',
                    answer: 'O(1) sabit hızdır, veri ne kadar büyük olursa olsun tek adımda çalışır (örn: kutudan eleman alma). O(N) linear hızdır, veri kadar adım gerektirir (örn: tek tek arama). O(N^2) ise veri arttıkça adımların karesiyle artan yavaş hızdır (örn: nested loop).'
                },
                complexity: ["O(1): sabit", "O(log n): cok yavas buyur", "O(n): input kadar", "O(n^2): hizla pahalanir"],
                blocks: [
                    {
                        type: "simple-box",
                        content: "10 karti tek tek kontrol etmek kolaydir. Ama 10.000 kartta ayni yontem cok uzar; daha akilli bir duzen gerekir.",
                    },
                    {
                        type: "text",
                        content: "Complexity, QA otomasyonunda 'neden lokal test 20 saniye, CI test 12 dakika' sorusunu teknik olarak aciklar.",
                    },
                ],
                lab: {
                    title: "Test data buyuyunce ne olur?",
                    prompt: "Input sayisini degistir ve farkli complexity egilimlerini karsilastir.",
                    success: "Hash tabanli lookup, buyuk test datasinda nested loop'tan cok daha saglamdir.",
                    min: 10,
                    max: 1000,
                    defaultValue: 120,
                },
                code: `Set<String> expectedIds = new HashSet<>(apiIds);       // Beklenen ID'leri HashSet'e koy
for (String dbId : databaseIds) {                         // DB'deki her ID icin tek tur gez
    assertTrue(expectedIds.contains(dbId));                // HashSet contains ortalama O(1) calisir
}                                                         // Toplam davranis yaklasik O(n)

for (String dbId : databaseIds) {                         // Ilk liste tekrar gezilir
    for (String apiId : apiIds) {                          // Her eleman icin ikinci liste tekrar gezilir
        compare(dbId, apiId);                              // Nested loop O(n^2) pahali hale gelir
    }                                                      // Ikinci dongu bitti
}                                                          // Buyuk datada CI suresi patlayabilir`,
                quiz: {
                    question: "1000 kayitlik API ve DB listesini karsilastirirken hangi yaklasim daha saglamdir?",
                    options: [
                        { id: "a", text: "Her DB kaydi icin tum API listesini tekrar gezmek" },
                        { id: "b", text: "API ID'lerini HashSet'e alip contains ile kontrol etmek" },
                        { id: "c", text: "Assertion'lari tamamen kaldirmak" },
                    ],
                    correct: "b",
                    explanation: "HashSet lookup buyuk veri setlerinde nested loop'a gore cok daha iyi olceklenir.",
                },
            },
        ],
        glossary: [
            { term: "Algorithm", definition: "Bir problemi cozmek icin izlenen sonlu ve sirali adimlar." },
            { term: "Sorting", definition: "Elemanlari belirli bir kurala gore yeniden siralama." },
            { term: "Binary Search", definition: "Sirali alani her adimda ikiye bolerek arama yapma." },
            { term: "Graph", definition: "Node ve edge'lerle baglantilari modelleyen yapi." },
            { term: "BFS", definition: "Graph'i seviye seviye, queue kullanarak gezme stratejisi." },
            { term: "State Machine", definition: "Sistemin izin verilen state ve transition'larini tanimlama modeli." },
            { term: "Big O", definition: "Input buyudukce zaman veya bellek ihtiyacinin nasil arttigini anlatan notasyon." },
        ],
    },
    en: {
        hero: {
            eyebrow: "See, Understand, Try",
            title: "Algorithms: A Visual Problem-Solving Workshop for QA Engineers",
            subtitle: "Learn sorting, binary search, graph traversal, state machines, and complexity through test automation scenarios.",
            intro: "An algorithm is a clear recipe for solving a task. In QA, that recipe helps you find flaky tests, prioritize defects, cover user flows, and speed up a growing test suite.",
        },
        tabs: ["Start", "Sorting", "Binary Search", "Graph Traversal", "State Machine", "Complexity"],
        page: {
            navTitle: "Algorithm Map",
            markDone: "Mark as completed",
            done: "Completed",
            reset: "Reset",
            run: "Run",
            again: "Run again",
            check: "Check",
            correct: "Correct",
            moveUp: "Move up",
            moveDown: "Move down",
            selected: "Selected",
            javaCompare: "Java connection",
            qaUse: "Where QA uses it",
            algorithmIdea: "Algorithm idea",
            complexity: "Complexity",
            quizTitle: "Mini check",
            answer: "Answer",
            glossaryTitle: "Algorithm glossary",
            visualTitle: "Visual lab",
        },
        principles: [
            { label: "Input", text: "Test data, defect lists, commit ranges, or user flows." },
            { label: "Steps", text: "Ordered steps clear enough to produce the same result again." },
            { label: "Output", text: "A prioritized bug list, root cause, traversed flow, or performance decision." },
        ],
        sections: [
            {
                id: "intro",
                shortTitle: "Start",
                title: "1. Algorithmic thinking: split the problem first",
                difficulty: "beginner",
                accent: "violet",
                tag: "Problem solving",
                analogy: "Think of a recipe: ingredients are input, cooking steps are the algorithm, and the meal is the output. In QA, the ingredients may be test data, bug reports, or page flows.",
                definition: "An algorithm is a finite, ordered plan for solving a specific problem. A good algorithm is repeatable, observable, and aware of edge cases.",
                qaUse: "You use it when designing test cases, ranking defects, narrowing flaky test causes, or choosing which flow to automate first.",
                javaCompare: "In Java, a method receives input and returns output. An algorithm is the same mental model: the method body is the coded form of the steps, and unit tests verify those steps.",
                visualKind: "flow",
                feynman: {
                    keywords: ['part', 'problem', 'step', 'recipe', 'solve'],
                    forbiddenWords: ['recursive', 'function', 'class', 'object', 'data'],
                    modelAnswer: 'Algorithmic thinking is breaking down a large, complex problem into smaller, solvable parts to build a step-by-step recipe.'
                },
                recall: {
                    question: 'Why is a "recipe" (step-by-step approach) important in algorithmic thinking?',
                    answer: 'Because computers do not guess. To solve a complex problem, we must design ordered, clear steps that account for edge cases.'
                },
                complexity: ["Clear steps", "Repeatable result", "Edge-case awareness"],
                blocks: [
                    { type: "simple-box", content: "An algorithm is like a recipe that keeps you from getting lost. In QA, it helps you find the same bug again, run the same test reliably, and see where the process slows down." },
                    { type: "text", content: "Algorithmic thinking makes QA decisions concrete: see the data, choose the rule, then test the result." },
                ],
                code: `public BugDecision classifyBug(BugReport bug) {          // Pass the bug report into one decision function
    if (bug.isBlockingPayment()) {                     // If payment is blocked, treat it as the highest risk
        return BugDecision.STOP_RELEASE;               // Return a stop-release decision
    }                                                  // Critical condition is finished
    if (bug.hasWorkaround()) {                         // Check whether users have a temporary workaround
        return BugDecision.FIX_AFTER_RELEASE;          // It can be fixed after release
    }                                                  // Workaround check is finished
    return BugDecision.ADD_TO_BACKLOG;                 // Everything else goes to backlog
}`,
                quiz: {
                    question: "What can be the output of a QA algorithm?",
                    options: [
                        { id: "a", text: "Only the number of code lines" },
                        { id: "b", text: "A prioritized bug list or a discovered root cause" },
                        { id: "c", text: "Only a browser name" },
                    ],
                    correct: "b",
                    explanation: "In QA, the result is often a decision or evidence: which bug is first, which commit broke the flow, or which path remains untested.",
                },
            },
            {
                id: "sorting",
                shortTitle: "Sorting",
                title: "2. Sorting: rank bugs by release risk",
                difficulty: "beginner",
                accent: "emerald",
                tag: "Priority queue",
                analogy: "Think of an emergency room. Everyone waits, but a breathing problem is handled before a mild headache. Bug triage should work the same way.",
                definition: "Sorting rearranges items according to a rule. The rule may be numeric value, date, severity, or a calculated risk score.",
                qaUse: "Use sorting to rank release bugs by impact, frequency, and whether a workaround exists.",
                javaCompare: "In Java, this is `Collections.sort(list, comparator)`. The comparator carries the QA business rule, such as `payment > auth > cosmetic`.",
                visualKind: "sort",
                feynman: {
                    keywords: ['sort', 'rule', 'compare', 'priority', 'order'],
                    forbiddenWords: ['collections', 'comparator', 'complexity', 'array', 'index'],
                    modelAnswer: 'Sorting is rearranging elements side-by-side by comparing them based on a specific rule (size, risk, importance, etc.) to put them in order.'
                },
                recall: {
                    question: 'How is sorting used in QA triage and interview scenarios?',
                    answer: 'It is used to compare bugs based on risk score, frequency, and impact to order them from most critical to least critical.'
                },
                complexity: ["Comparison sort: O(n log n)", "Single scan: O(n)", "Wrong rule: wrong priority"],
                blocks: [
                    { type: "simple-box", content: "Imagine sorting toys by size. In QA the toys are bugs, and the most dangerous ones must move to the top of the box." },
                    { type: "text", content: "Sorting moves team attention to the right place. QA priority is not who reported first; it is what can hurt users most." },
                ],
                lab: {
                    title: "Bug triage sorting game",
                    prompt: "Reorder the cards so the most critical defect is at the top.",
                    success: "Release risk order is correct. This list can be defended in stand-up.",
                    hint: "Protect money, access, and data before cosmetic problems.",
                    expectedOrder: ["payment-500", "auth-lock", "data-loss", "checkout-timeout", "visual-badge"],
                    items: [
                        { id: "visual-badge", title: "Wrong badge color", meta: "Cosmetic / workaround exists", score: 18, color: "slate" },
                        { id: "checkout-timeout", title: "Checkout takes 12 seconds", meta: "Performance / cart affected", score: 72, color: "amber" },
                        { id: "payment-500", title: "Payment returns 500", meta: "Revenue blocker / no workaround", score: 99, color: "red" },
                        { id: "data-loss", title: "Address record disappears", meta: "Data integrity / low frequency", score: 84, color: "orange" },
                        { id: "auth-lock", title: "Login attempts lock accounts", meta: "Access blocker / many users", score: 91, color: "rose" },
                    ],
                },
                code: `List<BugReport> bugs = loadReleaseBugs();              // Load open bugs before release
bugs.sort((left, right) -> {                            // Write a comparator for two bugs
    int byRisk = right.riskScore() - left.riskScore();   // Higher risk should appear first
    if (byRisk != 0) return byRisk;                      // If risk differs, sorting is decided
    return left.createdAt().compareTo(right.createdAt()); // If risk ties, older bug goes first
});                                                      // The sorting algorithm reorders the list
assert bugs.get(0).isReleaseBlocker();                   // The first bug must block release`,
                quiz: {
                    question: "Which sorting criterion is strongest for bug triage?",
                    options: [
                        { id: "a", text: "Who created the bug" },
                        { id: "b", text: "Impact + frequency + workaround availability" },
                        { id: "c", text: "Length of the title" },
                    ],
                    correct: "b",
                    explanation: "QA priority is defensible when it is based on user impact, frequency, and available workaround.",
                },
            },
            {
                id: "binary-search",
                shortTitle: "Binary Search",
                title: "3. Binary Search: find a flaky test root cause faster",
                difficulty: "intermediate",
                accent: "cyan",
                tag: "Search space",
                analogy: "It is like a hot-cold game where each guess removes half the room. You first learn which half contains the problem, then keep narrowing.",
                definition: "Binary search splits an ordered search space in half on every step until the target is found.",
                qaUse: "Use it to find the first bad commit, the failing test data boundary, or the configuration value where a timeout starts.",
                javaCompare: "Java's `Collections.binarySearch` works only on sorted lists. QA has the same rule: commits must be ordered, and the pass/fail behavior must have a clear boundary.",
                visualKind: "binary",
                feynman: {
                    keywords: ['search', 'half', 'middle', 'sorted', 'element'],
                    forbiddenWords: ['binary', 'index', 'pointer', 'recursion', 'split'],
                    modelAnswer: 'Binary search is looking at the middle element of a sorted list, then choosing the left half if it is larger or the right half if it is smaller, narrowing the search space by half at each step.'
                },
                recall: {
                    question: 'What is the absolute requirement for running a binary search on a list?',
                    answer: 'The list must be sorted. Otherwise, we cannot determine whether to look at the left half or the right half.'
                },
                complexity: ["Linear search: O(n)", "Binary search: O(log n)", "Requirement: ordered space"],
                blocks: [
                    { type: "simple-box", content: "When searching a word in a book, you do not inspect every page. You open the middle and decide which half can be ignored." },
                    { type: "text", content: "Binary search turns 'try everything' into a controlled investigation. Each run removes half of the remaining suspects." },
                ],
                lab: {
                    title: "Regression commit hunt",
                    prompt: "Find the commit that broke checkout among 12 commits by halving the range.",
                    success: "Root cause found: commit C07 changed timeout behavior.",
                    targetIndex: 6,
                    targetLabel: "C07",
                    items: ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12"],
                },
                code: `int low = 0;                                            // Start of the search range
int high = commits.size() - 1;                          // End of the search range
while (low < high) {                                    // Continue until one commit remains
    int mid = (low + high) / 2;                         // Pick the middle commit
    boolean fails = runCheckoutTest(commits.get(mid));  // Check whether the test fails here
    if (fails) {                                        // If it fails, the bad commit is here or earlier
        high = mid;                                     // Remove the right half
    } else {                                            // If it passes, the bad commit is newer
        low = mid + 1;                                  // Remove the left half
    }                                                   // One step halves the search space
}                                                       // Loop is finished
Commit firstBadCommit = commits.get(low);               // First bad commit is found`,
                quiz: {
                    question: "When is binary search safe for QA investigation?",
                    options: [
                        { id: "a", text: "The search space is ordered and the result has a boundary" },
                        { id: "b", text: "Bug reports are in random order" },
                        { id: "c", text: "The target moves on every step" },
                    ],
                    correct: "a",
                    explanation: "Without an ordered and monotonic pass/fail boundary, binary search can discard the wrong half.",
                },
            },
            {
                id: "graph",
                shortTitle: "Graph",
                title: "4. Graph Traversal: cover user flows visually",
                difficulty: "intermediate",
                accent: "blue",
                tag: "BFS / DFS",
                analogy: "Think of a metro map. Stations are pages, lines are transitions, and traversal tells you how to visit reachable stations.",
                definition: "A graph is made of nodes and edges. Traversal means visiting those connections with a strategy such as BFS or DFS.",
                qaUse: "E-commerce checkout, onboarding wizards, role-based menus, and microservice dependencies can all be modeled as graphs.",
                javaCompare: "In Java, you can represent this with `Map<Page, List<Page>>`. BFS uses a `Queue`; DFS uses a `Stack` or recursion.",
                visualKind: "graph",
                feynman: {
                    keywords: ['tree', 'flow', 'visit', 'depth', 'breadth'],
                    forbiddenWords: ['dfs', 'bfs', 'node', 'graph', 'queue', 'stack', 'traversal'],
                    modelAnswer: 'Graph traversal is walking step-by-step through connected points (pages, steps) using lines or links to visit all paths without getting lost.'
                },
                recall: {
                    question: 'How are DFS and BFS used when traversing web checkout flows or links in test automation?',
                    answer: 'DFS is used to follow a single path to its very end before backtracking, while BFS is used to test all immediate neighbor pages first.'
                },
                complexity: ["BFS/DFS: O(V + E)", "V: pages/states", "E: transitions"],
                blocks: [
                    { type: "simple-box", content: "A game map has rooms and doors. If you want to visit every room, you need to track which door leads where." },
                    { type: "text", content: "Graph traversal makes test coverage visible. It shows not only the happy path but also login failure, coupon error, and payment retry branches." },
                ],
                lab: {
                    title: "Checkout flow BFS animation",
                    prompt: "Run BFS and watch the queue and visited pages change.",
                    success: "All reachable checkout flows were visited.",
                    start: "Home",
                    nodes: [
                        { id: "Home", x: 56, y: 46 },
                        { id: "Search", x: 208, y: 46 },
                        { id: "Product", x: 360, y: 46 },
                        { id: "Cart", x: 208, y: 154 },
                        { id: "Login", x: 56, y: 154 },
                        { id: "Payment", x: 360, y: 154 },
                        { id: "Success", x: 208, y: 260 },
                        { id: "Retry", x: 360, y: 260 },
                    ],
                    edges: [
                        ["Home", "Search"],
                        ["Home", "Login"],
                        ["Search", "Product"],
                        ["Product", "Cart"],
                        ["Cart", "Payment"],
                        ["Login", "Cart"],
                        ["Payment", "Success"],
                        ["Payment", "Retry"],
                        ["Retry", "Payment"],
                    ],
                    order: ["Home", "Search", "Login", "Product", "Cart", "Payment", "Success", "Retry"],
                },
                code: `Queue<Page> queue = new ArrayDeque<>();                // Create a queue for BFS
Set<Page> visited = new HashSet<>();                    // Store visited pages to avoid repeats
queue.add(Page.HOME);                                   // Add the starting page
visited.add(Page.HOME);                                 // Mark Home as visited
while (!queue.isEmpty()) {                              // Continue until the queue is empty
    Page current = queue.remove();                      // Take the next page
    assertPageLoads(current);                           // Test that the page loads
    for (Page next : graph.get(current)) {              // Visit pages reachable from here
        if (visited.add(next)) {                        // If it was not visited before
            queue.add(next);                            // Add it to the queue for later
        }                                               // Duplicate visit is prevented
    }                                                   // Neighbor pages are done
}                                                       // All reachable flows are covered`,
                quiz: {
                    question: "What does modeling checkout as a graph make easier?",
                    options: [
                        { id: "a", text: "Changing only CSS colors" },
                        { id: "b", text: "Seeing which page/state transitions are tested" },
                        { id: "c", text: "Removing the browser completely" },
                    ],
                    correct: "b",
                    explanation: "A graph shows coverage as nodes and edges, so missing paths are easier to spot.",
                },
            },
            {
                id: "state-machine",
                shortTitle: "State Machine",
                title: "5. State Machine: make UI waits deterministic",
                difficulty: "advanced",
                accent: "amber",
                tag: "Deterministic UI",
                analogy: "Think of traffic lights. States and allowed transitions decide when movement is safe. Moving at the wrong state causes trouble.",
                definition: "A state machine defines possible states and which event can move the system from one state to another.",
                qaUse: "Model disabled -> loading -> enabled -> submitted flows to reduce flaky clicks and premature assertions.",
                javaCompare: "In Java, you often use enums such as `DISABLED`, `LOADING`, `READY`, and `SUBMITTED`. Tests assert each transition.",
                visualKind: "state",
                feynman: {
                    keywords: ['state', 'transition', 'rule', 'trigger', 'machine'],
                    forbiddenWords: ['automata', 'enum', 'switch', 'class', 'object'],
                    modelAnswer: 'A state machine is a set of rules that defines what status a system is currently in, and what triggers are allowed to move it to a new status.'
                },
                recall: {
                    question: 'Why do we use a state machine in an e-commerce cart automation test?',
                    answer: 'To prevent invalid transitions of order states (e.g., shipping a product before payment) and to model the test flow based on these state rules.'
                },
                complexity: ["Controlled states", "Invalid transition: bug signal", "Less flaky automation"],
                blocks: [
                    { type: "simple-box", content: "An elevator closes its door, moves, then opens again. If the order is broken, the ride is unsafe." },
                    { type: "text", content: "A state machine turns waiting into a visible contract. The test waits for the state a user would actually see." },
                ],
                lab: {
                    title: "Login button state machine",
                    prompt: "Use the correct event order to reach the submitted state.",
                    success: "Transitions are clean. This test waits for state, not sleep.",
                    states: ["disabled", "ready", "loading", "submitted"],
                    events: [
                        { id: "type-email", label: "Type email", from: "disabled", to: "disabled" },
                        { id: "type-password", label: "Type password", from: "disabled", to: "ready" },
                        { id: "click-login", label: "Click login", from: "ready", to: "loading" },
                        { id: "api-200", label: "API returned 200", from: "loading", to: "submitted" },
                    ],
                    traps: [
                        { id: "early-click", label: "Click while disabled", message: "ElementNotInteractableException risk" },
                        { id: "assert-too-soon", label: "Assert before loading ends", message: "Flaky assertion risk" },
                    ],
                },
                code: `LoginState state = LoginState.DISABLED;                // Initial state has an incomplete form
state = form.typeEmail("qa@learnqa.dev");               // Typing email may still keep the form disabled
state = form.typePassword("Secret123");                 // Typing password moves the button to ready
wait.until(buttonIsEnabled());                          // Wait for state, not a fixed sleep
state = form.clickLogin();                              // Clicking starts loading state
wait.until(responseStatusIs(200));                      // Wait for the API result
state = LoginState.SUBMITTED;                           // Successful transition reaches submitted
assertEquals(LoginState.SUBMITTED, state);              // Assert the expected final state`,
                quiz: {
                    question: "Why do state machines reduce flaky tests?",
                    options: [
                        { id: "a", text: "They add random delays to every step" },
                        { id: "b", text: "They explicitly define expected UI states and transitions" },
                        { id: "c", text: "They make assertions unnecessary" },
                    ],
                    correct: "b",
                    explanation: "The test no longer says 'wait 2 seconds'; it says 'wait until the button is enabled'. That is more deterministic.",
                },
            },
            {
                id: "complexity",
                shortTitle: "Complexity",
                title: "6. Complexity: see why a test suite slows down",
                difficulty: "advanced",
                accent: "rose",
                tag: "Big O",
                analogy: "At a store checkout, one clean line is different from walking through the whole store for every item. Bad plans become painful as the crowd grows.",
                definition: "Complexity describes how time or memory grows as input gets larger.",
                qaUse: "Use it for test data cleanup, locator search, API response validation, and report parsing as the suite grows.",
                javaCompare: "Java collection choice matters: `HashSet.contains` is average O(1), while `ArrayList.contains` is O(n). The difference grows with test data.",
                visualKind: "complexity",
                feynman: {
                    keywords: ['time', 'growth', 'speed', 'memory', 'scale'],
                    forbiddenWords: ['big o', 'notation', 'complexity', 'polynomial', 'logarithmic'],
                    modelAnswer: 'Complexity is a measure of how the running time and memory usage of our recipe grows as the size of the input data increases.'
                },
                recall: {
                    question: 'Explain the difference between O(1), O(N), and O(N^2) using a simple mental analogy.',
                    answer: 'O(1) is constant speed, taking one step regardless of size. O(N) is linear speed, taking steps equal to the size of data. O(N^2) is quadratic speed, where steps grow by the square of data size (like nested loops).'
                },
                complexity: ["O(1): constant", "O(log n): grows slowly", "O(n): grows with input", "O(n^2): gets expensive fast"],
                blocks: [
                    { type: "simple-box", content: "Checking 10 cards one by one is easy. With 10,000 cards, the same plan becomes slow and needs a smarter structure." },
                    { type: "text", content: "Complexity explains why a local 20-second test can become a 12-minute CI job when data grows." },
                ],
                lab: {
                    title: "What happens when test data grows?",
                    prompt: "Change the input size and compare complexity trends.",
                    success: "Hash-based lookup scales much better than nested loops on large test data.",
                    min: 10,
                    max: 1000,
                    defaultValue: 120,
                },
                code: `Set<String> expectedIds = new HashSet<>(apiIds);       // Put expected IDs into a HashSet
for (String dbId : databaseIds) {                         // Loop through each database ID once
    assertTrue(expectedIds.contains(dbId));                // HashSet contains is average O(1)
}                                                         // Total behavior is roughly O(n)

for (String dbId : databaseIds) {                         // Loop through the first list
    for (String apiId : apiIds) {                          // Loop through the second list for every item
        compare(dbId, apiId);                              // Nested loop becomes O(n^2)
    }                                                      // Inner loop is finished
}                                                          // CI time can explode on large data`,
                quiz: {
                    question: "Which approach is stronger when comparing 1000 API IDs with DB IDs?",
                    options: [
                        { id: "a", text: "Scan the full API list for every DB row" },
                        { id: "b", text: "Put API IDs into a HashSet and use contains" },
                        { id: "c", text: "Remove all assertions" },
                    ],
                    correct: "b",
                    explanation: "HashSet lookup scales far better than a nested loop for large data sets.",
                },
            },
        ],
        glossary: [
            { term: "Algorithm", definition: "A finite, ordered set of steps for solving a problem." },
            { term: "Sorting", definition: "Reordering items according to a rule." },
            { term: "Binary Search", definition: "Searching an ordered range by splitting it in half each step." },
            { term: "Graph", definition: "A structure that models relationships with nodes and edges." },
            { term: "BFS", definition: "A graph traversal strategy that uses a queue and visits level by level." },
            { term: "State Machine", definition: "A model of allowed states and transitions." },
            { term: "Big O", definition: "Notation for how time or memory grows with input size." },
        ],
    },
}
