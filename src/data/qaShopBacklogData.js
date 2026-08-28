// src/data/qaShopBacklogData.js
//
// QA Shop backlog'u — gerçek bir şirketteki belge zinciri:
//   gereksinim → analiz dokümanı → epic → user story → test
//
// TEK KAYNAK İLKESİ: 16 business story'nin metni BURADA DEĞİL,
// `qaShopSpecData.js`'tedir. Bu dosya onları yalnızca id ile REFERANS eder ve
// üstüne gereksinim/epic katmanını, altına da frontend/backend story'lerini
// ekler. Kopyalasaydık şartname güncellendiğinde backlog sessizce eskirdi.
//
// Analiz dokümanı da ayrı bir belgedir (`/qa-shop-spec`): veri modeli, sipariş
// durum makinesi, iş kuralları ve hata kataloğu orada durur. Burada tekrar
// edilmez, oraya bağlanır.
//
// ⚠ KABUL KRİTERİ DİLİ (bağlayıcı): `acceptance` alanı herkese açıktır ve
// sahada bir tester'ın eline geldiği hâlde yazılır — iş dilinde, tek cümle.
// Beklenen status kodu, hata sabiti ve Given/When/Then dökümü oraya YAZILMAZ;
// onlar `criteria` alanındadır ve yalnızca admin'e açılır. Bunu build zamanında
// `scripts/check-qa-shop-backlog.mjs`, tarayıcıda `tests/qa-shop-backlog.spec.ts`
// denetler.

import { qaShopSpecData } from './qaShopSpecData.js'

// ─────────────────────────────────────────────────────────────────────────────
// Business story'ler şartnameden TÜRETİLİR, kopyalanmaz.
// ─────────────────────────────────────────────────────────────────────────────
const specStorySection = qaShopSpecData.sections.find((s) => s.id === 'user-stories')

export const businessStories = specStorySection.blocks.filter((b) => b.type === 'userStory')

export const businessStoryById = businessStories.reduce((acc, s) => {
    acc[s.id] = s
    return acc
}, {})

export const qaShopBacklogData = {
    meta: {
        title: {
            tr: "QA Shop — Gereksinimden Test Case'e Backlog",
            en: 'QA Shop — Backlog from Requirement to Test Case',
        },
        subtitle: {
            tr: "Gerçek bir şirkette bir özellik tek başına doğmaz: önce iş gereksinimi yazılır, analiz edilir, epic'e bölünür, epic user story'lere ayrılır ve her story frontend ile backend tarafında ayrı ayrı hayata geçer. Test eden kişi bu zincirin tamamını okur. Burası o zincir.",
            en: 'In a real company a feature is not born on its own: a business requirement is written, analysed, split into epics, epics are broken into user stories, and each story is built separately on the frontend and the backend. The person testing reads that whole chain. This is that chain.',
        },
        measuredNote: {
            tr: "Bu backlog çalışan sisteme karşı yazıldı — uydurulmadı. Bir story'nin kabul kriterini karşılamadığını görürsen iki ihtimal var: ya kural sandığın gibi değil, ya da o alanda açık bir defect var. Hangisi olduğunu ayırmak testin kendisidir.",
            en: 'This backlog was written against a running system — it was not invented. If you see a story failing its acceptance criteria there are two possibilities: either the rule is not what you assumed, or a defect is live in that area. Telling those apart is the test itself.',
        },
        statCards: [
            { icon: '📜', value: '8', label: { tr: 'iş gereksinimi', en: 'business requirements' }, tone: 'amber' },
            { icon: '🗂️', value: '6', label: { tr: 'epic', en: 'epics' }, tone: 'violet' },
            { icon: '📋', value: '16', label: { tr: 'business story', en: 'business stories' }, tone: 'emerald' },
            { icon: '🧩', value: '12', label: { tr: 'frontend + backend story', en: 'frontend + backend stories' }, tone: 'indigo' },
        ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Zincirin kendisi — sayfanın ilk ekranı. Okuyucu detaya inmeden önce
    // belgelerin birbirini nasıl doğurduğunu görmeli.
    // ─────────────────────────────────────────────────────────────────────────
    chain: {
        title: { tr: 'Bir özellik beş belgeden geçer', en: 'A feature travels through five documents' },
        intro: {
            tr: 'Her halka bir öncekinin cevabıdır. Bir testin neden var olduğunu sorduğunda cevap yukarı doğru zincirde bulunur; bir gereksinimin karşılanıp karşılanmadığını sorduğunda cevap aşağı doğru bulunur. Test eden kişi bu zinciri iki yönde de yürüyebilmelidir.',
            en: 'Each link is the answer to the one before it. When you ask why a test exists, the answer is found upward along the chain; when you ask whether a requirement is met, the answer is found downward. The person testing must be able to walk this chain in both directions.',
        },
        steps: [
            {
                key: 'BR', icon: '📜', tone: 'amber',
                label: { tr: 'İş gereksinimi', en: 'Business requirement' },
                detail: {
                    tr: 'İşin sistemden ne istediği. Çözümü değil ihtiyacı anlatır: "müşteri kendine ait bir hesapla alışveriş yapabilmeli".',
                    en: 'What the business wants from the system. It states the need, not the solution: "a customer must be able to shop with an account of their own".',
                },
            },
            {
                key: 'AN', icon: '📐', tone: 'sky',
                label: { tr: 'Analiz dokümanı', en: 'Analysis document' },
                detail: {
                    tr: 'İhtiyacın sisteme nasıl oturduğu: veri modeli, sipariş durum makinesi, iş kuralları. Ayrı bir belgedir, bu sayfadan bağlanır.',
                    en: 'How the need maps onto the system: the data model, the order state machine, the business rules. It is a separate document, linked from this page.',
                },
            },
            {
                key: 'EP', icon: '🗂️', tone: 'violet',
                label: { tr: 'Epic', en: 'Epic' },
                detail: {
                    tr: "Tek sprint'e sığmayan büyük parça. Birden çok story'yi bir arada tutar ve hangi gereksinimlere hizmet ettiğini söyler.",
                    en: 'A large chunk that does not fit in one sprint. It holds several stories together and states which requirements it serves.',
                },
            },
            {
                key: 'US', icon: '📋', tone: 'emerald',
                label: { tr: 'Business story', en: 'Business story' },
                detail: {
                    tr: 'Müşteri için değer üreten en küçük parça. Müşteri gözünden yazılır ve uçtan uca test edilir.',
                    en: "The smallest piece that produces value for the customer. It is written from the customer's point of view and tested end to end.",
                },
            },
            {
                key: 'DEV', icon: '🧩', tone: 'indigo',
                label: { tr: 'Frontend + backend story', en: 'Frontend + backend story' },
                detail: {
                    tr: "Business story'nin iki tarafta hayata geçen hâli. Ayrı ayrı test edilir; çünkü bir kural arayüzde tutulup serviste tutulmayabilir.",
                    en: 'The business story as it is built on each side. They are tested separately, because a rule can hold in the interface and not hold in the service.',
                },
            },
        ],
        closing: {
            tr: 'Bu ayrımın test açısından bedeli şudur: arayüzde engellenen bir işlem, serviste de engelleniyor mu? Aynı kuralı iki katmanda ayrı ayrı sınamazsan, yalnızca arayüzün nazik davrandığını doğrulamış olursun.',
            en: 'The testing cost of this separation is this: is an action blocked in the interface also blocked in the service? Unless you exercise the same rule at both layers separately, all you have verified is that the interface was polite.',
        },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // KATMAN 1 — İş gereksinimleri
    // İhtiyacı anlatır, çözümü değil. Her biri en az bir epic'e düşer.
    // ─────────────────────────────────────────────────────────────────────────
    requirements: [
        {
            id: 'BR-01',
            title: { tr: 'Müşterinin kendine ait bir hesabı olmalı', en: 'A customer must have an account of their own' },
            need: {
                tr: 'Alışveriş yapan kişi kendini sisteme tanıtabilmeli; sepeti, adresleri ve siparişleri başkasınınkiyle karışmamalı.',
                en: "A shopper must be able to identify themselves to the system; their cart, addresses and orders must not be mixed up with anyone else's.",
            },
            rationale: {
                tr: 'Hesap olmadan siparişin kime ait olduğu bilinemez, iade ve destek süreçleri işlemez.',
                en: 'Without an account there is no way to know whose order it is, and returns and support processes cannot work.',
            },
            epics: ['EP-01'],
        },
        {
            id: 'BR-02',
            title: { tr: 'Müşteri yalnızca gerçekten alınabilir ürünleri görmeli', en: 'A customer must only see products that can actually be bought' },
            need: {
                tr: 'Katalog ve arama sonuçları, satın alınamayacak ürünleri müşterinin karşısına çıkarmamalı.',
                en: 'The catalog and search results must not put products in front of the customer that cannot be purchased.',
            },
            rationale: {
                tr: 'Alınamayan ürünü göstermek müşteriyi sepete kadar götürüp orada reddetmek demektir; bu, terk edilen sepetin en pahalı sebebidir.',
                en: 'Showing an unbuyable product means walking the customer all the way to the cart and rejecting them there, which is the most expensive cause of cart abandonment.',
            },
            epics: ['EP-02'],
        },
        {
            id: 'BR-03',
            title: { tr: 'Gösterilen stok satılabilir stok olmalı', en: 'The stock shown must be the stock that can be sold' },
            need: {
                tr: 'Bir ürünün stoğu, aynı anda alışveriş yapan başka müşteriler varken de doğru kalmalı; iki müşteriye aynı son ürün satılmamalı.',
                en: "A product's stock must stay correct even while other customers are shopping at the same time; the same last item must not be sold to two customers.",
            },
            rationale: {
                tr: 'Fazla satış, sipariş alındıktan sonra iptal edilmesi anlamına gelir — müşteri açısından en yıkıcı hata sınıfı budur.',
                en: 'Overselling means cancelling an order after it was accepted, which is the most damaging class of failure from the customer side.',
            },
            epics: ['EP-03', 'EP-04'],
        },
        {
            id: 'BR-04',
            title: { tr: 'Ödenecek tutarı her zaman sistem belirlemeli', en: 'The amount to be paid must always be decided by the system' },
            need: {
                tr: 'Fiyat, indirim ve toplam tutar sipariş anında sunucu tarafında yeniden hesaplanmalı; arayüzün gösterdiği rakam bağlayıcı olmamalı.',
                en: 'Price, discount and the total must be recalculated on the server at the moment of ordering; the figure shown by the interface must not be binding.',
            },
            rationale: {
                tr: 'Arayüzden gelen tutara güvenen bir sistem, tarayıcıdan değiştirilen bir sayıyla ürününü bedavaya verir.',
                en: 'A system that trusts the amount coming from the interface gives its product away for free to a number edited in the browser.',
            },
            epics: ['EP-03', 'EP-04'],
        },
        {
            id: 'BR-05',
            title: { tr: 'Siparişin yaşam döngüsü tutarlı olmalı', en: 'The order lifecycle must stay consistent' },
            need: {
                tr: 'Bir sipariş yalnızca anlamlı sırayla ilerleyebilmeli; ödenmemiş bir sipariş kargolanamamalı, iptal edilen sipariş stoğu geri vermeli.',
                en: 'An order must only advance in a meaningful sequence; an unpaid order must not be shipped, and a cancelled order must return its stock.',
            },
            rationale: {
                tr: 'Durum atlamaları muhasebe ile depoyu birbirinden ayırır; bu tür bozulmalar aylar sonra ve elle düzeltilir.',
                en: 'Skipped states pull accounting and the warehouse apart, and that kind of corruption gets fixed months later, by hand.',
            },
            epics: ['EP-04'],
        },
        {
            id: 'BR-06',
            title: { tr: 'Müşteri verisi yalnızca sahibine görünmeli', en: 'Customer data must only be visible to its owner' },
            need: {
                tr: 'Bir müşteri hiçbir yoldan başka bir müşterinin siparişine, adresine veya sepetine erişememeli.',
                en: "A customer must not be able to reach another customer's order, address or cart by any route.",
            },
            rationale: {
                tr: 'Arayüzde bağlantı olmaması yetki değildir; adresi tahmin eden biri de aynı veriyi ister.',
                en: 'The absence of a link in the interface is not authorization; someone who guesses the address asks for the same data.',
            },
            epics: ['EP-06'],
        },
        {
            id: 'BR-07',
            title: { tr: 'Müşteriye gösterilen içerik denetimden geçmeli', en: 'Content shown to customers must pass review' },
            need: {
                tr: 'Yorum gibi müşteri üretimi içerik onaylanmadan yayına ve ürün puanına girmemeli; adres bilgisi eksik kaydedilememeli.',
                en: 'Customer-generated content such as reviews must not go live or affect the product rating before approval, and address data must not be saved incomplete.',
            },
            rationale: {
                tr: 'Onaysız yorum ürün puanını anında bozar; eksik adres ise siparişi kargo aşamasında öldürür.',
                en: 'An unreviewed comment corrupts the product rating instantly, and an incomplete address kills the order at the shipping stage.',
            },
            epics: ['EP-05'],
        },
        {
            id: 'BR-08',
            title: { tr: 'Sistem tekrar edilebilir test koşumlarını desteklemeli', en: 'The system must support repeatable test runs' },
            need: {
                tr: 'Test eden kişi her koşuma bilinen ve temiz bir durumdan başlayabilmeli; kendi verisi başkasınınkini etkilememeli.',
                en: "The person testing must be able to start every run from a known, clean state, and their data must not affect anyone else's.",
            },
            rationale: {
                tr: 'Önceki koşumdan kalan veri, testi ürünün değil geçmişin fonksiyonu yapar — güvenilmez sonuçların en sık sebebidir.',
                en: 'Data left over from a previous run makes the test a function of history rather than of the product, which is the most common source of untrustworthy results.',
            },
            epics: ['EP-06'],
        },
    ],

    // ─────────────────────────────────────────────────────────────────────────
    // KATMAN 2 — Epic'ler
    // `stories` alanı şartnamedeki business story id'lerini REFERANS eder.
    // `split: 'full'` → altındaki story'lerin frontend/backend bölünmesi yazıldı.
    // `split: 'pending'` → henüz bölünmedi; sayfa bunu dürüstçe söyler.
    // ─────────────────────────────────────────────────────────────────────────
    epics: [
        {
            id: 'EP-01',
            icon: '🔐',
            tone: 'violet',
            title: { tr: 'Kimlik ve Oturum', en: 'Identity and Session' },
            goal: {
                tr: 'Müşteri kendini sisteme tanıtabilsin, oturumu güvenle açılıp kapansın.',
                en: 'Let a customer identify themselves to the system, with a session that opens and closes safely.',
            },
            requirements: ['BR-01'],
            stories: ['US-01', 'US-02'],
            split: 'full',
        },
        {
            id: 'EP-02',
            icon: '🛍️',
            tone: 'sky',
            title: { tr: 'Katalog ve Arama', en: 'Catalog and Search' },
            goal: {
                tr: 'Müşteri satın alabileceği ürünleri bulabilsin, alamayacaklarıyla vakit kaybetmesin.',
                en: 'Let a customer find the products they can buy, without wasting time on the ones they cannot.',
            },
            requirements: ['BR-02'],
            stories: ['US-03', 'US-04'],
            split: 'pending',
        },
        {
            id: 'EP-03',
            icon: '🧺',
            tone: 'emerald',
            title: { tr: 'Sepet ve Kupon', en: 'Cart and Coupons' },
            goal: {
                tr: 'Sepet stoğu gerçekten rezerve etsin, indirim sipariş anında yeniden doğrulansın.',
                en: 'Let the cart genuinely reserve stock, and let discounts be revalidated at the moment of ordering.',
            },
            requirements: ['BR-03', 'BR-04'],
            stories: ['US-05', 'US-06', 'US-07', 'US-08'],
            split: 'full',
        },
        {
            id: 'EP-04',
            icon: '📦',
            tone: 'indigo',
            title: { tr: 'Sipariş ve Ödeme', en: 'Orders and Payment' },
            goal: {
                tr: 'Sipariş yalnızca anlamlı sırayla ilerlesin, stok ve para her adımda tutarlı kalsın.',
                en: 'Let an order advance only in a meaningful sequence, keeping stock and money consistent at every step.',
            },
            requirements: ['BR-03', 'BR-04', 'BR-05'],
            stories: ['US-09', 'US-10', 'US-11', 'US-12'],
            split: 'pending',
        },
        {
            id: 'EP-05',
            icon: '🏠',
            tone: 'amber',
            title: { tr: 'Adres ve Yorumlar', en: 'Addresses and Reviews' },
            goal: {
                tr: 'Müşterinin her zaman kullanılabilir bir adresi olsun, yayına giren yorum denetimden geçsin.',
                en: 'Let a customer always have a usable address, and let any published review pass through moderation.',
            },
            requirements: ['BR-07'],
            stories: ['US-14', 'US-15'],
            split: 'pending',
        },
        {
            id: 'EP-06',
            icon: '🛡️',
            tone: 'rose',
            title: { tr: 'Veri Güvenliği ve Test Altyapısı', en: 'Data Safety and Test Infrastructure' },
            goal: {
                tr: 'Müşteri verisi yalnızca sahibine açılsın, her test koşumu temiz bir durumdan başlasın.',
                en: 'Let customer data open only to its owner, and let every test run start from a clean state.',
            },
            requirements: ['BR-06', 'BR-08'],
            stories: ['US-13', 'US-16'],
            split: 'pending',
        },
    ],

    // ─────────────────────────────────────────────────────────────────────────
    // KATMAN 4 — Frontend / backend story'leri
    //
    // Her biri bir business story'nin ALTINDA durur ve o story'nin bir tarafta
    // hayata geçen hâlidir. Ayrı olmalarının test açısından sebebi tek cümleyle:
    // bir kural arayüzde tutulup serviste tutulmayabilir. Arayüz sıfır adedi
    // engelliyor diye servis de engelliyor sanmak, sahada en sık yapılan
    // varsayımdır.
    //
    // ⚠ AKTÖR HER ZAMAN KULLANICIDIR. "Bir frontend geliştirici olarak ...
    // istiyorum" bir user story DEĞİLDİR; kılık değiştirmiş bir task'tır.
    // Bir story'nin değeri her zaman kullanıcıya akar — `kind` alanı işin
    // NEREDE yaşadığını söyler, KİMİN faydalandığını değil. Bu kural
    // `check-qa-shop-backlog.mjs` Kontrol [F] ile makineyle zorlanır.
    //
    // `acceptance` herkese açık ve iş dilindedir; `criteria` yalnızca admin'e
    // açılır ve teknik dökümü orada tutar.
    // ─────────────────────────────────────────────────────────────────────────
    childStories: [

        // ═══ EP-01 · US-01 ═══════════════════════════════════════════════════
        {
            id: 'FE-01',
            parent: 'US-01',
            epic: 'EP-01',
            kind: 'frontend',
            difficulty: 'basic',
            layers: ['UI'],
            title: { tr: 'Kayıt formu kullanıcıyı gönderim öncesinde uyarır', en: 'The sign-up form warns the user before submitting' },
            story: {
                tr: 'Bir ziyaretçi olarak kayıt sırasındaki hatamı formu göndermeden önce görmek istiyorum; böylece neyi düzelteceğimi deneme yanılmayla aramam.',
                en: 'As a visitor, I want to see my mistake while filling in the sign-up form rather than after submitting it, so that I do not have to hunt for what to fix by trial and error.',
            },
            acceptance: [
                { tr: 'Parola politikası, kullanıcı yazmaya başlamadan önce formun üzerinde okunabilir.', en: 'The password policy is readable on the form before the user starts typing.' },
                { tr: 'Eksik veya biçimi bozuk alanlar, gönderim beklenmeden kullanıcıya belirtilir.', en: 'Missing or malformed fields are pointed out to the user without waiting for submission.' },
                { tr: 'Sunucu kaydı reddettiğinde sebep kullanıcıya okunur bir mesajla gösterilir; form sessizce durmaz.', en: 'When the server rejects the registration the reason is shown to the user in a readable message; the form does not just sit there silently.' },
                { tr: 'Kayıt sürerken düğme ikinci bir gönderime izin vermez.', en: 'While registration is in flight the button does not allow a second submission.' },
            ],
            criteria: [
                { tr: 'Given kayıt formu açık\nWhen parola alanına politikayı karşılamayan bir değer yazılır\nThen kayıt isteği HİÇ atılmaz ve alanın altında hata metni görünür', en: 'Given the sign-up form is open\nWhen a value that does not meet the policy is typed into the password field\nThen the registration request is NEVER sent and an error message appears under the field' },
                { tr: 'Given form geçerli doldurulmuş\nWhen gönderilir ve servis 422 WEAK_PASSWORD döner\nThen bu sebep kullanıcıya çevrilmiş bir mesaj olarak gösterilir', en: 'Given the form is filled in validly\nWhen it is submitted and the service returns 422 WEAK_PASSWORD\nThen that reason is shown to the user as a translated message' },
                { tr: 'Given form geçerli doldurulmuş\nWhen gönder düğmesine arka arkaya iki kez basılır\nThen yalnızca BİR POST /auth/register isteği gider', en: 'Given the form is filled in validly\nWhen the submit button is pressed twice in a row\nThen only ONE POST /auth/register request is sent' },
                { tr: 'Given servis 409 EMAIL_ALREADY_EXISTS döner\nWhen cevap işlenir\nThen kullanıcı e-postanın kayıtlı olduğunu görür ve girdiği değerler temizlenmez', en: 'Given the service returns 409 EMAIL_ALREADY_EXISTS\nWhen the response is handled\nThen the user sees that the email is already registered and the values they typed are not cleared' },
            ],
            screens: [{ tr: 'Kayıt formu', en: 'Sign-up form' }],
        },
        {
            id: 'BE-01',
            parent: 'US-01',
            epic: 'EP-01',
            kind: 'backend',
            difficulty: 'basic',
            layers: ['API', 'DB'],
            title: { tr: 'Kayıt servisi hesabı tek ve güvenli biçimde oluşturur', en: 'The registration service creates the account once and safely' },
            story: {
                tr: 'Bir müşteri olarak hesabımın yalnızca bana ait olduğundan ve parolamın okunabilir hâlde saklanmadığından emin olmak istiyorum; böylece başkası benim e-postamla hesap açamaz.',
                en: 'As a customer, I want to be sure my account is mine alone and that my password is not kept in readable form, so that nobody else can open an account with my email.',
            },
            acceptance: [
                { tr: 'Politikayı karşılamayan bir parola kabul edilmez.', en: 'A password that does not meet the policy is not accepted.' },
                { tr: 'Aynı e-posta ile ikinci bir hesap oluşmaz.', en: 'A second account with the same email does not come into existence.' },
                { tr: 'E-posta karşılaştırması büyük ve küçük harf farkını yok sayar.', en: 'The email comparison ignores any difference in letter case.' },
                { tr: 'Parola veritabanında hiçbir zaman okunabilir hâlde durmaz.', en: 'The password is never stored in a readable form in the database.' },
            ],
            criteria: [
                { tr: 'Given geçerli e-posta ve güçlü parola\nWhen POST /auth/register çağrılır\nThen 201 döner ve kullanıcı tablosunda tek satır oluşur', en: 'Given a valid email and a strong password\nWhen POST /auth/register is called\nThen 201 is returned and exactly one row appears in the users table' },
                { tr: 'Given parola politikayı karşılamıyor\nWhen kayıt istenir\nThen 422 ve WEAK_PASSWORD döner, hiçbir satır oluşmaz', en: 'Given the password does not meet the policy\nWhen registration is requested\nThen 422 and WEAK_PASSWORD are returned and no row is created' },
                { tr: 'Given e-posta zaten kayıtlı\nWhen aynı e-posta ile kayıt istenir\nThen 409 ve EMAIL_ALREADY_EXISTS döner', en: 'Given the email is already registered\nWhen registration is requested with the same email\nThen 409 and EMAIL_ALREADY_EXISTS are returned' },
                { tr: 'Given kayıtlı e-posta yalnızca harf büyüklüğüyle farklı yazılır\nWhen kayıt istenir\nThen yine 409 döner - karşılaştırma harf duyarsızdır', en: 'Given the registered email is written differing only in letter case\nWhen registration is requested\nThen 409 is still returned - the comparison is case-insensitive' },
                { tr: 'Given hesap oluşmuş\nWhen kullanıcı tablosu SQL ile okunur\nThen parola sütunu düz metin İÇERMEZ', en: 'Given the account was created\nWhen the users table is read with SQL\nThen the password column does NOT contain plain text' },
            ],
            endpoints: ['POST /auth/register'],
        },

        // ═══ EP-01 · US-02 ═══════════════════════════════════════════════════
        {
            id: 'FE-02',
            parent: 'US-02',
            epic: 'EP-01',
            kind: 'frontend',
            difficulty: 'basic',
            layers: ['UI'],
            title: { tr: 'Arayüz oturumun açık mı kapalı mı olduğunu her zaman doğru gösterir', en: 'The interface always shows correctly whether the session is open or closed' },
            story: {
                tr: 'Bir müşteri olarak giriş yapmış olup olmadığımı ekrana bakarak anlamak istiyorum; böylece işlemimi yarıda kesen bir sürprizle karşılaşmam.',
                en: 'As a customer, I want to tell whether I am signed in just by looking at the screen, so that I am not surprised half way through what I am doing.',
            },
            acceptance: [
                { tr: 'Girişli ve girişsiz durumlar arayüzde birbirinden ayırt edilebilir.', en: 'The signed-in and signed-out states are distinguishable in the interface.' },
                { tr: 'Sayfa yenilendiğinde açık oturum korunur.', en: 'An open session survives a page refresh.' },
                { tr: 'Çıkış yapıldığında oturuma bağlı ekranlar erişilebilir kalmaz.', en: 'Once signed out, screens that depend on the session do not stay reachable.' },
                { tr: 'Hatalı giriş denemesinde kullanıcı ne olduğunu görür ve girdiği e-posta silinmez.', en: 'On a failed sign-in the user sees what happened and the email they typed is not wiped.' },
            ],
            criteria: [
                { tr: 'Given saklanmış bir oturum anahtarı yok\nWhen dükkân açılır\nThen giriş düğmesi görünür, çıkış düğmesi görünmez', en: 'Given there is no stored session key\nWhen the store is opened\nThen the sign-in button is visible and the sign-out button is not' },
                { tr: 'Given başarılı giriş yapıldı\nWhen sayfa yenilenir\nThen oturum korunur ve kullanıcı GET /auth/me ile geri okunur', en: 'Given a successful sign-in happened\nWhen the page is refreshed\nThen the session is kept and the user is read back with GET /auth/me' },
                { tr: 'Given oturum açık\nWhen çıkış yapılır\nThen saklanan anahtar silinir ve giriş düğmesi geri gelir', en: 'Given the session is open\nWhen signing out\nThen the stored key is deleted and the sign-in button returns' },
                { tr: 'Given parola hatalı ve servis 401 döner\nWhen cevap işlenir\nThen hata mesajı gösterilir, e-posta alanının değeri korunur', en: 'Given the password is wrong and the service returns 401\nWhen the response is handled\nThen an error message is shown and the email field keeps its value' },
            ],
            screens: [{ tr: 'Üst şerit oturum alanı', en: 'Top bar session area' }, { tr: 'Giriş formu', en: 'Sign-in form' }],
        },
        {
            id: 'BE-02',
            parent: 'US-02',
            epic: 'EP-01',
            kind: 'backend',
            difficulty: 'intermediate',
            layers: ['API', 'DB'],
            title: { tr: 'Oturum servisi anahtarı yalnızca hak edene verir ve çıkışta geri alır', en: 'The session service issues the key only to those entitled and revokes it on sign-out' },
            story: {
                tr: 'Bir müşteri olarak çıkış yaptıktan sonra oturumumun gerçekten kapanmasını istiyorum; böylece cihazımı kullanan başka biri hesabıma giremez.',
                en: 'As a customer, I want my session to genuinely close after I sign out, so that someone else using my device cannot get into my account.',
            },
            acceptance: [
                { tr: 'Yanlış parolayla oturum açılmaz.', en: 'A session does not open with the wrong password.' },
                { tr: 'Pasif bir hesap oturum açamaz.', en: 'An inactive account cannot open a session.' },
                { tr: 'Çıkış yapılan oturumun anahtarı bir daha kabul edilmez.', en: 'The key of a signed-out session is never accepted again.' },
                { tr: 'Anahtar, hangi hesaba ait olduğunu doğrulanabilir biçimde taşır.', en: 'The key carries which account it belongs to in a verifiable way.' },
            ],
            criteria: [
                { tr: 'Given doğru e-posta ve parola\nWhen POST /auth/login çağrılır\nThen 200 döner ve bir token verilir', en: 'Given the correct email and password\nWhen POST /auth/login is called\nThen 200 is returned and a token is issued' },
                { tr: 'Given parola hatalı\nWhen giriş denenir\nThen 401 ve UNAUTHORIZED döner', en: 'Given the password is wrong\nWhen sign-in is attempted\nThen 401 and UNAUTHORIZED are returned' },
                { tr: 'Given hesap pasif\nWhen doğru parolayla giriş denenir\nThen giriş reddedilir', en: 'Given the account is inactive\nWhen sign-in is attempted with the correct password\nThen the sign-in is rejected' },
                { tr: 'Given geçerli bir token var\nWhen POST /auth/logout çağrılır ve AYNI token ile GET /auth/me denenir\nThen 401 döner - iptal gerçekten yazılmıştır', en: 'Given a valid token exists\nWhen POST /auth/logout is called and GET /auth/me is attempted with the SAME token\nThen 401 is returned - the revocation was genuinely persisted' },
            ],
            endpoints: ['POST /auth/login', 'POST /auth/logout', 'GET /auth/me'],
        },

        // ═══ EP-03 · US-05 ═══════════════════════════════════════════════════
        {
            id: 'FE-05',
            parent: 'US-05',
            epic: 'EP-03',
            kind: 'frontend',
            difficulty: 'intermediate',
            layers: ['UI'],
            title: { tr: 'Sepete ekleme sonucu kullanıcıya anında ve dürüstçe yansır', en: 'The result of adding to the cart reaches the user immediately and honestly' },
            story: {
                tr: 'Bir müşteri olarak sepete eklediğim ürünün gerçekten eklenip eklenmediğini anında görmek istiyorum; böylece aynı ürünü ikinci kez eklemek zorunda kalmam.',
                en: 'As a customer, I want to see immediately whether the item I added really went into my cart, so that I do not end up adding the same item twice.',
            },
            acceptance: [
                { tr: 'Sepete eklenen ürün, sayfa yenilenmeden sepet sayacına yansır.', en: 'An item added to the cart is reflected in the cart counter without a page refresh.' },
                { tr: 'Servis eklemeyi reddettiğinde kullanıcı sebebini görür; başarısızlık sessiz kalmaz.', en: 'When the service rejects the addition the user sees why; the failure is not silent.' },
                { tr: 'İstek sürerken düğme aynı ürünü ikinci kez göndermeye izin vermez.', en: 'While the request is in flight the button does not allow the same item to be sent a second time.' },
                { tr: 'Sepet ekranı, sepetin servisteki hâlini gösterir; arayüzde tutulan tahmini değil.', en: 'The cart screen shows the cart as it stands in the service, not an estimate held in the interface.' },
            ],
            criteria: [
                { tr: 'Given ürün listesi açık\nWhen sepete ekle düğmesine basılır ve servis 201 döner\nThen sepet sayacı sayfa yenilenmeden artar', en: 'Given the product list is open\nWhen the add-to-cart button is pressed and the service returns 201\nThen the cart counter increases without a page refresh' },
                { tr: 'Given stok yetersiz ve servis 409 OUT_OF_STOCK döner\nWhen cevap işlenir\nThen kullanıcıya stok yetersizliği bildirilir ve sayaç ARTMAZ', en: 'Given stock is short and the service returns 409 OUT_OF_STOCK\nWhen the response is handled\nThen the user is told stock is short and the counter does NOT increase' },
                { tr: 'Given istek sürüyor\nWhen düğmeye tekrar basılır\nThen ikinci bir sepete ekleme isteği gitmez', en: 'Given the request is in flight\nWhen the button is pressed again\nThen a second add-to-cart request is not sent' },
                { tr: 'Given sepete ekleme başarılı\nWhen sepet ekranı açılır\nThen içerik servisten okunur, yerel sayaçtan üretilmez', en: 'Given the addition succeeded\nWhen the cart screen is opened\nThen its content is read from the service, not produced from a local counter' },
            ],
            screens: [{ tr: 'Ürün kartı', en: 'Product card' }, { tr: 'Sepet ekranı', en: 'Cart screen' }],
        },
        {
            id: 'BE-05',
            parent: 'US-05',
            epic: 'EP-03',
            kind: 'backend',
            difficulty: 'advanced',
            layers: ['API', 'DB'],
            title: { tr: 'Sepet servisi stoğu gerçekten rezerve eder', en: 'The cart service genuinely reserves stock' },
            story: {
                tr: 'Bir müşteri olarak sepetime aldığım ürünün bana ayrıldığından emin olmak istiyorum; böylece ödeme adımında ürün elimden alınmaz.',
                en: 'As a customer, I want the item in my cart to be genuinely set aside for me, so that it is not taken away from me at the payment step.',
            },
            acceptance: [
                { tr: 'Satılabilir adetten fazlası sepete alınamaz.', en: 'More than the sellable quantity cannot be taken into the cart.' },
                { tr: 'Sepette duran adet kadar ürün başka müşteriye satılamaz hâle gelir.', en: 'As many items as sit in the cart become unsellable to another customer.' },
                { tr: 'Sepetten çıkarılan ürün yeniden satılabilir olur.', en: 'An item removed from the cart becomes sellable again.' },
                { tr: 'Olmayan bir ürün sepete eklenemez.', en: 'A product that does not exist cannot be added to the cart.' },
                { tr: 'Rezervasyon ile stok düşümü tek bir işlemde yapılır; yarım kalmaz.', en: 'The reservation and the stock decrement happen in a single operation; they do not stop half way.' },
            ],
            criteria: [
                { tr: 'Given ürünün satılabilir adedi 5\nWhen 3 adet sepete eklenir\nThen 201 döner ve satılabilir adet 2 olur', en: 'Given the sellable quantity is 5\nWhen 3 are added to the cart\nThen 201 is returned and the sellable quantity becomes 2' },
                { tr: 'Given satılabilir adet 2\nWhen 3 adet istenir\nThen 409 ve OUT_OF_STOCK döner, stok DEĞİŞMEZ', en: 'Given the sellable quantity is 2\nWhen 3 are requested\nThen 409 and OUT_OF_STOCK are returned and stock does NOT change' },
                { tr: 'Given sepette 3 adet var\nWhen sepet satırı silinir\nThen satılabilir adet eski değerine geri döner', en: 'Given 3 sit in the cart\nWhen the cart line is deleted\nThen the sellable quantity returns to its former value' },
                { tr: 'Given var olmayan bir ürün kimliği\nWhen sepete eklenmek istenir\nThen 404 ve PRODUCT_NOT_FOUND döner', en: 'Given a product id that does not exist\nWhen it is added to the cart\nThen 404 and PRODUCT_NOT_FOUND are returned' },
                { tr: 'Given ekleme sırasında hata oluşur\nWhen işlem geri alınır\nThen ne sepet satırı ne stok düşümü kalır - ikisi aynı transaction içindedir', en: 'Given an error occurs during the addition\nWhen the operation is rolled back\nThen neither the cart line nor the stock decrement remains - both are in the same transaction' },
            ],
            endpoints: ['POST /carts', 'POST /carts/{id}/items', 'DELETE /carts/{id}/items/{itemId}'],
        },

        // ═══ EP-03 · US-06 ═══════════════════════════════════════════════════
        {
            id: 'FE-06',
            parent: 'US-06',
            epic: 'EP-03',
            kind: 'frontend',
            difficulty: 'basic',
            layers: ['UI'],
            title: { tr: 'Adet kontrolü kullanıcıyı geçersiz bir değerle baş başa bırakmaz', en: 'The quantity control never leaves the user alone with an invalid value' },
            story: {
                tr: 'Bir müşteri olarak sepetteki adedi değiştirdiğimde geçerli olup olmadığını ve yeni tutarı hemen görmek istiyorum; böylece geçersiz bir adetle ilerlediğimi sanmam.',
                en: 'As a customer, I want to see straight away whether my new cart quantity is valid and what the new total is, so that I do not believe I am proceeding with an invalid quantity.',
            },
            acceptance: [
                { tr: 'Adet kutusuna elle yazılan değer de artı ve eksi düğmeleriyle aynı kurala tabidir.', en: 'A value typed into the quantity box obeys the same rule as the plus and minus buttons.' },
                { tr: 'Adet değişince tutarlar servisin döndürdüğü değerle güncellenir.', en: 'When the quantity changes the amounts are updated with the values the service returns.' },
                { tr: 'Adet sıfıra indirilemez ve kullanıcı bunun neden olmadığını görür.', en: 'The quantity cannot be taken down to zero, and the user sees why that did not happen.' },
                { tr: 'Satırı kaldırmak, adedi azaltmaktan ayrı ve açıkça görünen bir işlemdir.', en: 'Removing a line is a separate, clearly visible action from decreasing the quantity.' },
            ],
            criteria: [
                { tr: 'Given sepet satırında 2 adet var\nWhen kutuya elle sıfır yazılır\nThen değer kabul edilmez ve güncelleme isteği gitmez', en: 'Given a cart line holds 2\nWhen zero is typed into the box\nThen the value is not accepted and no update request is sent' },
                { tr: 'Given kutuya elle negatif bir değer yazılır\nWhen alan terk edilir\nThen değer önceki geçerli adede geri döner', en: 'Given a negative value is typed into the box\nWhen the field is left\nThen the value reverts to the previous valid quantity' },
                { tr: 'Given adet 2den 4e çıkarılır ve servis 200 döner\nWhen cevap işlenir\nThen satır ve sepet toplamı servisin döndürdüğü tutarla güncellenir, istemcide çarpılarak değil', en: 'Given the quantity goes from 2 to 4 and the service returns 200\nWhen the response is handled\nThen the line and cart totals are updated with the amounts the service returned, not multiplied on the client' },
                { tr: 'Given satır kaldırılmak isteniyor\nWhen kaldır işlemi seçilir\nThen ayrı bir silme çağrısı yapılır - adet düşürme yoluyla YAPILMAZ', en: 'Given the line is to be removed\nWhen the remove action is chosen\nThen a separate delete call is made - it is NOT done by decreasing the quantity' },
            ],
            screens: [{ tr: 'Sepet satırı', en: 'Cart line' }],
        },
        {
            id: 'BE-06',
            parent: 'US-06',
            epic: 'EP-03',
            kind: 'backend',
            difficulty: 'intermediate',
            layers: ['API', 'DB'],
            title: { tr: 'Sepet satırı servisi geçersiz adedi ve yabancı sepeti reddeder', en: 'The cart line service rejects invalid quantities and carts that are not yours' },
            story: {
                tr: 'Bir müşteri olarak sepetimin yalnızca benim değiştirebildiğim ve tutarların doğru hesaplandığı bir yer olmasını istiyorum; böylece ödediğim rakam gördüğüm rakam olur.',
                en: 'As a customer, I want my cart to be something only I can change, with amounts computed correctly, so that what I pay is what I saw.',
            },
            acceptance: [
                { tr: 'Adet sıfır veya negatif yapılamaz.', en: 'The quantity cannot be set to zero or a negative number.' },
                { tr: 'Adet artırıldığında satılabilir stok yeniden kontrol edilir.', en: 'When the quantity is increased the sellable stock is checked again.' },
                { tr: 'Başka bir müşterinin sepet satırı değiştirilemez.', en: "Another customer's cart line cannot be changed." },
                { tr: 'Tutarlar her güncellemede sunucuda yeniden hesaplanır.', en: 'The amounts are recalculated on the server at every update.' },
            ],
            criteria: [
                { tr: 'Given sepet satırı var\nWhen adet sıfır olarak gönderilir\nThen 422 ve INVALID_QUANTITY döner', en: 'Given a cart line exists\nWhen the quantity is sent as zero\nThen 422 and INVALID_QUANTITY are returned' },
                { tr: 'Given satılabilir adet 2\nWhen adet 5 istenir\nThen 409 ve OUT_OF_STOCK döner, satır DEĞİŞMEZ', en: 'Given the sellable quantity is 2\nWhen a quantity of 5 is requested\nThen 409 and OUT_OF_STOCK are returned and the line does NOT change' },
                { tr: 'Given B müşterisinin token değeri ve A müşterisinin sepet satırı kimliği\nWhen güncelleme denenir\nThen 403 döner - 404 ile karıştırma, kaynak vardır ama yetki yoktur', en: "Given customer B's token and customer A's cart line id\nWhen the update is attempted\nThen 403 is returned - do not confuse this with 404, the resource exists but the permission does not" },
                { tr: 'Given adet güncellendi\nWhen cevap gövdesi okunur\nThen satır toplamı sunucunun hesabıdır, istemciden gelen bir tutar DEĞİLDİR', en: 'Given the quantity was updated\nWhen the response body is read\nThen the line total is the server calculation, NOT an amount sent by the client' },
            ],
            endpoints: ['PATCH /carts/{id}/items/{itemId}'],
        },

        // ═══ EP-03 · US-07 ═══════════════════════════════════════════════════
        {
            id: 'FE-07',
            parent: 'US-07',
            epic: 'EP-03',
            kind: 'frontend',
            difficulty: 'intermediate',
            layers: ['UI'],
            title: { tr: 'Kupon alanı reddedilme sebebini kullanıcıya ayırt ettirir', en: 'The coupon field lets the user tell the rejection reasons apart' },
            story: {
                tr: 'Bir müşteri olarak kuponum kabul edilmediğinde bunun sebebini görmek istiyorum; böylece elimdeki başka bir kuponu denemem gerektiğini anlarım.',
                en: 'As a customer, I want to see why my coupon was not accepted, so that I know whether to try a different one I hold.',
            },
            acceptance: [
                { tr: 'Kodun başındaki ve sonundaki boşluklar kullanıcıyı cezalandırmaz.', en: 'Leading and trailing spaces in the code do not punish the user.' },
                { tr: 'Reddedilen kuponun sebebi ayırt edilebilir; tek bir genel hata metni değildir.', en: 'The reason a coupon was rejected is distinguishable; it is not one generic error message.' },
                { tr: 'Kabul edilen kuponun indirimi sepet toplamında görünür.', en: 'The discount from an accepted coupon is visible in the cart total.' },
                { tr: 'Kupon kaldırıldığında tutarlar indirimsiz hâline geri döner.', en: 'When the coupon is removed the amounts return to their undiscounted state.' },
            ],
            criteria: [
                { tr: 'Given kupon kutusuna baştaki ve sondaki boşluklarla bir kod yazılır\nWhen uygulanır\nThen kod kırpılarak gönderilir ve kabul edilir', en: 'Given a code is typed into the coupon box with leading and trailing spaces\nWhen it is applied\nThen the code is sent trimmed and accepted' },
                { tr: 'Given servis 422 COUPON_EXPIRED döner\nWhen cevap işlenir\nThen kullanıcı sürenin dolduğunu görür - genel bir geçersiz kupon metni YETMEZ', en: 'Given the service returns 422 COUPON_EXPIRED\nWhen the response is handled\nThen the user sees that it expired - a generic invalid-coupon message is NOT enough' },
                { tr: 'Given servis alt limit sebebiyle 422 döner\nWhen cevap işlenir\nThen kullanıcı alt limitin altında kaldığını görür', en: 'Given the service returns 422 because of the minimum total\nWhen the response is handled\nThen the user sees they are under the minimum' },
                { tr: 'Given kupon uygulandı\nWhen kaldırılır\nThen sepet toplamı indirimsiz değere döner ve servisten yeniden okunur', en: 'Given the coupon was applied\nWhen it is removed\nThen the cart total returns to the undiscounted value and is re-read from the service' },
            ],
            screens: [{ tr: 'Sepet kupon alanı', en: 'Cart coupon field' }],
        },
        {
            id: 'BE-07',
            parent: 'US-07',
            epic: 'EP-03',
            kind: 'backend',
            difficulty: 'intermediate',
            layers: ['API', 'DB'],
            title: { tr: 'Kupon servisi her koşulu ayrı sebeple doğrular', en: 'The coupon service validates every condition with its own reason' },
            story: {
                tr: 'Bir müşteri olarak kuponumun koşullarının her seferinde aynı şekilde değerlendirilmesini istiyorum; böylece bir gün geçen kupon ertesi gün sebepsizce reddedilmez.',
                en: 'As a customer, I want my coupon conditions to be judged the same way every time, so that a coupon that worked one day is not refused the next for no reason.',
            },
            acceptance: [
                { tr: 'Süresi geçmiş bir kupon kabul edilmez.', en: 'An expired coupon is not accepted.' },
                { tr: 'Henüz başlamamış bir kupon kabul edilmez.', en: 'A coupon that has not started yet is not accepted.' },
                { tr: 'Kullanım limiti dolmuş bir kupon kabul edilmez.', en: 'A coupon whose usage limit is exhausted is not accepted.' },
                { tr: 'Sepet tutarı alt sınırın altındaysa kupon kabul edilmez.', en: 'If the cart total is under the minimum the coupon is not accepted.' },
                { tr: 'Kupon kodu büyük ve küçük harf farkına takılmaz.', en: 'The coupon code does not trip over a difference in letter case.' },
            ],
            criteria: [
                { tr: 'Given koşulları sağlayan bir kupon\nWhen POST /carts/{id}/coupon çağrılır\nThen 200 döner ve sepet tutarları indirimli hâliyle döner', en: 'Given a coupon that meets the conditions\nWhen POST /carts/{id}/coupon is called\nThen 200 is returned and the cart amounts come back discounted' },
                { tr: 'Given kuponun bitiş tarihi geçmiş\nWhen uygulanmak istenir\nThen 422 ve COUPON_EXPIRED döner', en: 'Given the coupon end date has passed\nWhen it is applied\nThen 422 and COUPON_EXPIRED are returned' },
                { tr: 'Given kuponun başlangıç tarihi gelecekte\nWhen uygulanmak istenir\nThen reddedilir ve sebebi süresi dolmuş kupondan FARKLI bir sabittir', en: 'Given the coupon start date is in the future\nWhen it is applied\nThen it is rejected and the reason is a DIFFERENT constant from the expired one' },
                { tr: 'Given kuponun kullanım limiti dolmuş\nWhen uygulanmak istenir\nThen kendi sebebiyle reddedilir', en: 'Given the coupon usage limit is exhausted\nWhen it is applied\nThen it is rejected with its own reason' },
                { tr: 'Given sepet tutarı kuponun alt sınırının altında\nWhen uygulanmak istenir\nThen kendi sebebiyle reddedilir', en: 'Given the cart total is under the coupon minimum\nWhen it is applied\nThen it is rejected with its own reason' },
                { tr: 'Given kupon kodu küçük harfle gönderilir\nWhen uygulanır\nThen kabul edilir - karşılaştırma harf duyarsızdır', en: 'Given the coupon code is sent in lower case\nWhen it is applied\nThen it is accepted - the comparison is case-insensitive' },
            ],
            endpoints: ['POST /carts/{id}/coupon'],
        },

        // ═══ EP-03 · US-08 ═══════════════════════════════════════════════════
        {
            id: 'FE-08',
            parent: 'US-08',
            epic: 'EP-03',
            kind: 'frontend',
            difficulty: 'advanced',
            layers: ['UI'],
            title: { tr: 'Sepette gösterilen indirim bir sözdür, garanti değildir', en: 'The discount shown in the cart is a promise, not a guarantee' },
            story: {
                tr: 'Bir müşteri olarak ödemeden önce ödeyeceğim son tutarı görmek istiyorum; böylece sepette gördüğüm indirim kaybolduysa bunu sipariş verdikten sonra öğrenmem.',
                en: 'As a customer, I want to see the final amount before I pay, so that if the discount I saw in the cart has gone I do not find out after placing the order.',
            },
            acceptance: [
                { tr: 'Sipariş adımında tutar sepette gösterilenden farklıysa kullanıcı onaylamadan önce farkı görür.', en: 'If the amount at the order step differs from the one shown in the cart, the user sees the difference before confirming.' },
                { tr: 'Kupon sipariş anında reddedilirse sipariş sessizce indirimsiz tamamlanmaz.', en: 'If the coupon is rejected at order time the order is not silently completed without the discount.' },
                { tr: 'Sepet ekranı, indirimin sipariş anında yeniden değerlendirileceğini kullanıcıya belli eder.', en: 'The cart screen makes clear to the user that the discount will be re-evaluated at order time.' },
            ],
            criteria: [
                { tr: 'Given kupon sepette kabul edilmiş\nWhen sepet küçültülür ve sipariş adımına geçilir\nThen ekrandaki indirim servisten yeniden okunur, sepetteki değerden KOPYALANMAZ', en: 'Given the coupon was accepted in the cart\nWhen the cart is shrunk and the order step is entered\nThen the discount on screen is re-read from the service, NOT copied from the cart value' },
                { tr: 'Given sipariş isteği kupon reddi sebebiyle 422 döner\nWhen cevap işlenir\nThen siparişin oluşmadığı ve sebebi gösterilir; kullanıcı sipariş verdim sanmaz', en: 'Given the order request returns 422 because the coupon was refused\nWhen the response is handled\nThen it is shown that no order was created and why; the user does not think they ordered' },
                { tr: 'Given tutar sipariş adımında değişti\nWhen onay ekranı gösterilir\nThen yeni tutar kullanıcı onaylamadan ÖNCE görünür', en: 'Given the amount changed at the order step\nWhen the confirmation screen is shown\nThen the new amount is visible BEFORE the user confirms' },
            ],
            screens: [{ tr: 'Sepet özeti', en: 'Cart summary' }, { tr: 'Sipariş onay adımı', en: 'Order confirmation step' }],
        },
        {
            id: 'BE-08',
            parent: 'US-08',
            epic: 'EP-03',
            kind: 'backend',
            difficulty: 'advanced',
            layers: ['API', 'DB'],
            title: { tr: 'Sipariş servisi kuponu ve tutarı sipariş anında yeniden hesaplar', en: 'The order service recalculates the coupon and the total at order time' },
            story: {
                tr: 'Bir müşteri olarak siparişimin tutarının sipariş anında yeniden hesaplanmasını istiyorum; böylece ne fazla ödemiş ne de siparişim sonradan iptal edilmiş olurum.',
                en: 'As a customer, I want my order total to be recalculated at the moment I order, so that I neither overpay nor have my order cancelled afterwards.',
            },
            acceptance: [
                { tr: 'Kupon sipariş anında yeniden değerlendirilir; koşul artık sağlanmıyorsa sipariş oluşmaz.', en: 'The coupon is re-evaluated at order time; if the condition no longer holds no order is created.' },
                { tr: 'Sipariş toplamı istemcinin gönderdiği tutara göre değil, sunucunun hesabına göre yazılır.', en: 'The order total is written from the server calculation, not from the amount the client sent.' },
                { tr: 'Sipariş oluşmadığında stok ve kupon kullanım sayacı etkilenmez.', en: 'When no order is created, stock and the coupon usage counter are left untouched.' },
            ],
            criteria: [
                { tr: 'Given kupon alt limitle sepette kabul edildi\nWhen sepet limitin altına düşürülüp POST /orders çağrılır\nThen 422 döner ve sipariş satırı OLUŞMAZ', en: 'Given the coupon was accepted in the cart with a minimum total\nWhen the cart is dropped below the minimum and POST /orders is called\nThen 422 is returned and NO order row is created' },
                { tr: 'Given istemci gövdede kendi hesapladığı bir toplam gönderir\nWhen sipariş oluşur\nThen kaydedilen tutar sunucunun hesabıdır, gönderilen değer YOK SAYILIR', en: 'Given the client sends a total it computed itself in the body\nWhen the order is created\nThen the stored amount is the server calculation and the sent value is IGNORED' },
                { tr: 'Given sipariş kupon reddi sebebiyle başarısız\nWhen stok ve kupon kullanım sayacı SQL ile okunur\nThen ikisi de değişmemiştir', en: 'Given the order failed because the coupon was refused\nWhen stock and the coupon usage counter are read with SQL\nThen neither has changed' },
            ],
            endpoints: ['POST /carts/{id}/coupon', 'PATCH /carts/{id}/items/{itemId}', 'POST /orders'],
        },
    ],

    // ─────────────────────────────────────────────────────────────────────────
    // KATMAN 5 — Test edenin bu zinciri nasıl yürüdüğü
    // Kuralı anlatır, reçeteyi değil: hangi story'ye hangi gözle bakılacağını
    // söyler, hangi isteği atıp hangi cevabı bekleyeceğini söylemez.
    // ─────────────────────────────────────────────────────────────────────────
    testerFlow: {
        title: { tr: 'Test eden kişi bu zinciri nasıl yürür', en: 'How the person testing walks this chain' },
        intro: {
            tr: 'Backlog bir okuma listesi değil, çalışma sırasıdır. Aşağıdaki adımlar sahada bir tester story alırken izlediği sıradır; her adımın çıktısı bir sonrakinin girdisidir.',
            en: 'A backlog is not a reading list, it is a working order. The steps below are the order a tester follows when they pick up a story, and each step feeds the next.',
        },
        steps: [
            {
                icon: '📜', tone: 'amber',
                title: { tr: 'Gereksinimi oku — sistem neyi vaat ediyor?', en: 'Read the requirement - what does the system promise?' },
                detail: {
                    tr: 'Story bir vaadin parçasıdır. Vaadi bilmeden yazılan test, kodun yaptığını tekrar eder; kodun yapması gerekeni değil.',
                    en: 'A story is part of a promise. A test written without knowing the promise repeats what the code does, not what the code ought to do.',
                },
            },
            {
                icon: '📐', tone: 'sky',
                title: { tr: 'Analiz dokümanını aç — kural tam olarak nasıl tanımlı?', en: 'Open the analysis document - how exactly is the rule defined?' },
                detail: {
                    tr: 'Veri modeli, sipariş durum makinesi ve iş kuralları burada. Bir davranışın kusur mu yoksa kuralın kendisi mi olduğunu ancak buraya bakarak ayırırsın.',
                    en: 'The data model, the order state machine and the business rules live there. Only by looking there can you tell whether a behaviour is a defect or the rule itself.',
                },
            },
            {
                icon: '📋', tone: 'emerald',
                title: { tr: 'Business story\'yi uçtan uca sına — müşteri değeri gerçekten oluşuyor mu?', en: 'Exercise the business story end to end - is the customer value really produced?' },
                detail: {
                    tr: 'Arayüzden başlayıp veritabanına kadar git. Ekranda başarılı görünen bir işlemin satır yazmamış olması bu adımda ortaya çıkar.',
                    en: 'Start at the interface and go all the way to the database. An action that looks successful on screen but wrote no row shows itself at this step.',
                },
            },
            {
                icon: '🔌', tone: 'indigo',
                title: { tr: 'Backend story\'yi servis seviyesinde sına — kural arayüzsüz de tutuyor mu?', en: 'Exercise the backend story at service level - does the rule hold without the interface?' },
                detail: {
                    tr: 'Arayüzü atlayıp doğrudan servise git. En sık kaçan kusur sınıfı budur: kuralı yalnızca arayüz uygular, servis herkese açıktır.',
                    en: 'Skip the interface and go straight to the service. This is the most commonly missed class of defect: only the interface enforces the rule while the service is open to everyone.',
                },
            },
            {
                icon: '🖥️', tone: 'violet',
                title: { tr: 'Frontend story\'yi davranış olarak sına — arayüz servisin dediğini doğru gösteriyor mu?', en: 'Exercise the frontend story as behaviour - does the interface show what the service said?' },
                detail: {
                    tr: 'Servis reddettiğinde kullanıcı bunu görüyor mu, yoksa işlem başarılı mı görünüyor? Sessiz başarısızlık burada yakalanır.',
                    en: 'When the service refuses, does the user see it, or does the action still look successful? Silent failure is caught here.',
                },
            },
            {
                icon: '🔗', tone: 'rose',
                title: { tr: 'Bulduğunu zincire geri bağla — hangi gereksinim karşılanmadı?', en: 'Tie your finding back to the chain - which requirement went unmet?' },
                detail: {
                    tr: 'Bir bulgunun ağırlığı, kırdığı gereksinimle ölçülür. Zincire bağlanmayan bulgu, öncelik tartışmasında en önce düşen bulgudur.',
                    en: 'The weight of a finding is measured by the requirement it breaks. A finding that is not tied to the chain is the first one dropped in a prioritisation discussion.',
                },
            },
        ],
    },

    faq: [
        {
            q: { tr: 'Frontend ve backend story\'leri ayrı yazmak neyi değiştirir?', en: 'What does writing separate frontend and backend stories change?' },
            a: {
                tr: 'Test edilecek yüzeyi ikiye ayırır. Bir kural arayüzde tutulup serviste tutulmayabilir: adet kutusu sıfırı reddederken servis aynı isteği kabul ediyor olabilir. Story\'ler tek parça yazıldığında bu ayrım görünmez ve test genellikle yalnızca arayüzü sınar.',
                en: 'It splits the surface to be tested in two. A rule can hold in the interface and not in the service: the quantity box may refuse zero while the service accepts the same request. When stories are written as one piece that distinction is invisible, and the testing usually exercises only the interface.',
            },
        },
        {
            q: {
                tr: "Frontend story'si neden \"bir frontend geliştirici olarak\" diye başlamıyor?",
                en: 'Why does a frontend story not begin with "as a frontend developer"?',
            },
            a: {
                tr: 'Çünkü o zaman user story olmaktan çıkar, kılık değiştirmiş bir task olur. Bir story her zaman kullanıcı gözünden yazılır ve değeri kullanıcıya akar; geliştirme zaten kullanıcı için yapılır. Frontend ve backend etiketi işin NEREDE yaşadığını söyler, KİMİN faydalandığını değil. Aktörü geliştirici yapmak, test edeni "bu kim için?" sorusundan koparır — oysa bir kabul kriterinin karşılanıp karşılanmadığı ancak o soruyla ölçülür.',
                en: 'Because it would stop being a user story and become a task in disguise. A story is always written from the user\'s point of view and its value flows to the user; development is done for the user in the first place. The frontend and backend labels say WHERE the work lives, not WHO benefits. Making the developer the actor cuts the tester off from the question "who is this for?" - and that is the only question by which an acceptance criterion can be judged.',
            },
        },
        {
            q: { tr: 'Kabul kriterlerinde neden beklenen status kodu yazmıyor?', en: 'Why do the acceptance criteria not state the expected status code?' },
            a: {
                tr: 'Sahada bir tester\'ın eline gelen kriter iş dilindedir. Hangi kodun beklendiğine karar vermek, kriteri test case\'e çevirmek test edenin işidir — hazır verildiğinde o beceri hiç gelişmez. Hangi endpoint\'in hangi kodu döndürebileceği API sözleşmesinde zaten yazılıdır.',
                en: 'The criteria a tester receives in the field are in business language. Deciding which code to expect, turning a criterion into a test case, is the tester\'s job - handed over ready-made, that skill never develops. Which endpoint can return which code is already written in the API contract.',
            },
        },
        {
            q: { tr: 'Epic ile user story arasındaki fark nedir?', en: 'What is the difference between an epic and a user story?' },
            a: {
                tr: 'Epic tek bir sprint\'e sığmayan, birden çok story\'yi bir arada tutan büyük parçadır ve tek başına test edilmez. User story ise müşteri için değer üreten en küçük parçadır; kabul kriterleri vardır ve uçtan uca test edilebilir. Burada her epic hangi iş gereksinimlerine hizmet ettiğini de söyler.',
                en: 'An epic is a large chunk that does not fit into a single sprint, holds several stories together and is not tested on its own. A user story is the smallest piece that produces value for the customer; it has acceptance criteria and can be tested end to end. Here, every epic also states which business requirements it serves.',
            },
        },
        {
            q: { tr: 'Neden altı epic\'ten yalnızca ikisinin frontend/backend bölünmesi var?', en: 'Why do only two of the six epics have a frontend/backend split?' },
            a: {
                tr: 'Bölünme elle yazılır ve her story iki taraf için ayrı kabul kriteri ister. Kimlik ve Oturum ile Sepet ve Kupon epic\'leri kalıbı kanıtlamak için seçildi: biri en basit, diğeri kuralın iki katmanda ayrıştığı en zor durumu içeriyor. Kalan epic\'ler aynı kalıpla sırayla bölünüyor.',
                en: 'The split is written by hand and every story needs its own acceptance criteria on each side. Identity and Session plus Cart and Coupons were chosen to prove the pattern: one is the simplest case, the other contains the hardest one, where the rule diverges across the two layers. The remaining epics are being split in turn with the same pattern.',
            },
        },
    ],
}

