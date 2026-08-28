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
            { icon: '🧩', value: '32', label: { tr: 'frontend + backend story', en: 'frontend + backend stories' }, tone: 'indigo' },
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
            split: 'full',
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
            split: 'full',
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
            split: 'full',
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
            split: 'full',
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

        // ═══ EP-02 · US-03 ═══════════════════════════════════════════════════
        {
            id: 'FE-03',
            parent: 'US-03',
            epic: 'EP-02',
            kind: 'frontend',
            difficulty: 'basic',
            layers: ['UI'],
            title: { tr: 'Katalog listesi yalnızca alınabilir ürünleri gösterir', en: 'The catalog list shows only products that can be bought' },
            story: {
                tr: 'Bir müşteri olarak katalogda yalnızca satın alabileceğim ürünleri görmek istiyorum; böylece beğendiğim bir ürünün aslında alınamaz olduğunu sepette öğrenmem.',
                en: 'As a customer, I want to see only the products I can actually buy in the catalog, so that I do not discover at the cart that something I liked cannot be bought.',
            },
            acceptance: [
                { tr: 'Satıştan kalkmış ürünler listede yer almaz.', en: 'Withdrawn products do not appear in the list.' },
                { tr: 'Liste boş döndüğünde kullanıcı bunun bir hata değil, sonuç olduğunu anlar.', en: 'When the list comes back empty the user understands it is a result, not an error.' },
                { tr: 'Uzun listeler sayfalara bölünür ve kullanıcı hangi sayfada olduğunu görür.', en: 'Long lists are paginated and the user can see which page they are on.' },
                { tr: 'Satıştan kalkmış bir ürünün sayfasına gidilirse kullanıcı sebebini görür, boş bir ekranla kalmaz.', en: 'If the page of a withdrawn product is opened the user sees why, rather than being left with a blank screen.' },
            ],
            criteria: [
                { tr: 'Given katalog açık\nWhen liste yüklenir\nThen GET /products cevabındaki ürünler basılır, istemcide ayrıca süzülmez', en: 'Given the catalog is open\nWhen the list loads\nThen the products from the GET /products response are rendered, not filtered again on the client' },
                { tr: 'Given servis boş liste döner\nWhen ekran çizilir\nThen sonuç yok metni görünür ve yükleniyor göstergesi takılı kalmaz', en: 'Given the service returns an empty list\nWhen the screen renders\nThen a no-results message appears and the loading indicator does not stay stuck' },
                { tr: 'Given satıştan kalkmış bir ürünün sayfası açılır ve servis 404 döner\nWhen cevap işlenir\nThen kullanıcıya ürünün artık satışta olmadığı söylenir', en: 'Given the page of a withdrawn product is opened and the service returns 404\nWhen the response is handled\nThen the user is told the product is no longer on sale' },
                { tr: 'Given sayfa boyutu üst sınırın üstünde istenir\nWhen liste döner\nThen ekran servisin döndürdüğü kadarını gösterir, kendi sayısını uydurmaz', en: 'Given a page size above the cap is requested\nWhen the list returns\nThen the screen shows as many as the service returned and does not invent its own count' },
            ],
            screens: [{ tr: 'Katalog listesi', en: 'Catalog list' }, { tr: 'Ürün sayfası', en: 'Product page' }],
        },
        {
            id: 'BE-03',
            parent: 'US-03',
            epic: 'EP-02',
            kind: 'backend',
            difficulty: 'intermediate',
            layers: ['API', 'DB'],
            title: { tr: 'Katalog servisi satıştan kalkmışı gizler ve liste boyutunu tavanlar', en: 'The catalog service hides withdrawn items and caps the list size' },
            story: {
                tr: 'Bir müşteri olarak katalogdan gelen listenin gerçekten satılabilir ürünleri içerdiğinden emin olmak istiyorum; böylece gördüğüm her ürünü sepete atabilirim.',
                en: 'As a customer, I want to be sure the list coming from the catalog really contains sellable products, so that I can add anything I see to my cart.',
            },
            acceptance: [
                { tr: 'Satıştan kalkmış ürünler varsayılan listede dönmez.', en: 'Withdrawn products are not returned in the default list.' },
                { tr: 'İstenirse satıştan kalkmış ürünler de listelenebilir.', en: 'Withdrawn products can be listed when they are explicitly asked for.' },
                { tr: 'Satıştan kalkmış bir ürünün ayrıntısı açılamaz.', en: 'The detail of a withdrawn product cannot be opened.' },
                { tr: 'Tek bir listede dönen ürün sayısının bir üst sınırı vardır; aşan istek reddedilmez, sonuç tavanlanır.', en: 'There is a cap on how many products one list returns; a request above it is not rejected, the result is capped.' },
            ],
            criteria: [
                { tr: 'Given katalogda satıştan kalkmış ürünler var\nWhen GET /products çağrılır\nThen 200 döner ve o ürünler listede YOKTUR', en: 'Given the catalog contains withdrawn products\nWhen GET /products is called\nThen 200 is returned and those products are NOT in the list' },
                { tr: 'Given satıştan kalkmışları da isteyen parametre gönderilir\nWhen liste çağrılır\nThen o ürünler de döner', en: 'Given the parameter asking for withdrawn products too is sent\nWhen the list is called\nThen those products are returned as well' },
                { tr: 'Given satıştan kalkmış bir ürün kimliği\nWhen GET /products/{id} çağrılır\nThen 404 döner', en: 'Given the id of a withdrawn product\nWhen GET /products/{id} is called\nThen 404 is returned' },
                { tr: 'Given sayfa boyutu üst sınırın çok üstünde istenir\nWhen liste çağrılır\nThen 200 döner ve kayıt sayısı üst sınırda TAVANLANIR - istek reddedilmez', en: 'Given a page size far above the cap is requested\nWhen the list is called\nThen 200 is returned and the record count is CAPPED at the limit - the request is not rejected' },
            ],
            endpoints: ['GET /products', 'GET /products/{id}'],
        },

        // ═══ EP-02 · US-04 ═══════════════════════════════════════════════════
        {
            id: 'FE-04',
            parent: 'US-04',
            epic: 'EP-02',
            kind: 'frontend',
            difficulty: 'basic',
            layers: ['UI'],
            title: { tr: 'Arama sonucu boş kalınca sebebi anlaşılır', en: 'When a search comes back empty the reason is clear' },
            story: {
                tr: 'Bir müşteri olarak aradığım ürünü bulamadığımda bunun arama terimimden mi yoksa üründen mi kaynaklandığını anlamak istiyorum; böylece boşuna aynı aramayı tekrarlamam.',
                en: 'As a customer, when I cannot find what I searched for I want to know whether it was my search term or the product, so that I do not repeat the same search for nothing.',
            },
            acceptance: [
                { tr: 'Çok kısa bir terim girildiğinde kullanıcı arama yapılmadığını ve neden yapılmadığını görür.', en: 'When a very short term is entered the user sees that no search ran and why.' },
                { tr: 'Sonuç bulunamadığında bu bir hata gibi değil, boş sonuç olarak gösterilir.', en: 'When nothing matches it is shown as an empty result, not as an error.' },
                { tr: 'Kullanıcı yazarken her tuşta yeni bir arama tetiklenmez.', en: 'A new search is not fired on every keystroke while the user types.' },
                { tr: 'Sonuçlar hangi terim için döndüğünü belli eder.', en: 'The results make clear which term they came back for.' },
            ],
            criteria: [
                { tr: 'Given arama kutusuna alt sınırın altında bir terim yazılır\nWhen arama tetiklenir\nThen istek HİÇ gitmez ve kullanıcıya terimin kısa olduğu söylenir', en: 'Given a term below the minimum length is typed\nWhen the search is triggered\nThen the request is NEVER sent and the user is told the term is too short' },
                { tr: 'Given servis boş sonuç döner\nWhen ekran çizilir\nThen eşleşme yok gösterilir, hata rengi ya da uyarısı kullanılmaz', en: 'Given the service returns an empty result\nWhen the screen renders\nThen a no-match message is shown without error colouring or an alert' },
                { tr: 'Given kullanıcı hızlıca yazıyor\nWhen bekleme süresi dolmadan yeni harf gelirse\nThen önceki istek iptal edilir ya da hiç başlatılmaz', en: 'Given the user is typing quickly\nWhen another character arrives before the debounce elapses\nThen the previous request is cancelled or never started' },
            ],
            screens: [{ tr: 'Arama kutusu', en: 'Search box' }, { tr: 'Arama sonuçları', en: 'Search results' }],
        },
        {
            id: 'BE-04',
            parent: 'US-04',
            epic: 'EP-02',
            kind: 'backend',
            difficulty: 'basic',
            layers: ['API', 'DB'],
            title: { tr: 'Arama servisi boş sonucu hata saymaz', en: 'The search service does not treat an empty result as an error' },
            story: {
                tr: 'Bir müşteri olarak aramamın her seferinde aynı kurala göre çalışmasını istiyorum; böylece bir gün bulduğum ürünü ertesi gün aynı terimle bulabilirim.',
                en: 'As a customer, I want my search to work by the same rule every time, so that a product I found one day can be found with the same term the next.',
            },
            acceptance: [
                { tr: 'Arama terimiyle eşleşen ürünler döner.', en: 'Products matching the search term are returned.' },
                { tr: 'Alt sınırın altındaki bir terim kabul edilmez.', en: 'A term below the minimum length is not accepted.' },
                { tr: 'Hiçbir ürün eşleşmezse boş liste döner; bu bir hata değildir.', en: 'If nothing matches an empty list is returned; that is not an error.' },
                { tr: 'Arama büyük ve küçük harf farkına takılmaz.', en: 'The search does not trip over a difference in letter case.' },
            ],
            criteria: [
                { tr: 'Given katalogda terimle eşleşen ürünler var\nWhen GET /search çağrılır\nThen 200 döner ve eşleşenler listelenir', en: 'Given the catalog has products matching the term\nWhen GET /search is called\nThen 200 is returned and the matches are listed' },
                { tr: 'Given terim alt sınırın altında\nWhen arama çağrılır\nThen 422 döner ve arama YAPILMAZ', en: 'Given the term is below the minimum length\nWhen the search is called\nThen 422 is returned and NO search runs' },
                { tr: 'Given hiçbir ürün eşleşmiyor\nWhen arama çağrılır\nThen 200 ve BOŞ liste döner - 404 DEĞİL', en: 'Given nothing matches\nWhen the search is called\nThen 200 and an EMPTY list are returned - NOT 404' },
                { tr: 'Given terim büyük harfle gönderilir\nWhen arama çağrılır\nThen küçük harfle aynı sonuç döner', en: 'Given the term is sent in upper case\nWhen the search is called\nThen the same result comes back as in lower case' },
            ],
            endpoints: ['GET /search'],
        },

        // ═══ EP-04 · US-09 ═══════════════════════════════════════════════════
        {
            id: 'FE-09',
            parent: 'US-09',
            epic: 'EP-04',
            kind: 'frontend',
            difficulty: 'intermediate',
            layers: ['UI'],
            title: { tr: 'Sipariş sonucu hiç şüpheye yer bırakmaz', en: 'The order outcome leaves no room for doubt' },
            story: {
                tr: 'Bir müşteri olarak siparişimin oluşup oluşmadığını hiç şüpheye yer bırakmadan görmek istiyorum; böylece emin olmak için ikinci kez sipariş vermem.',
                en: 'As a customer, I want to see beyond doubt whether my order was created, so that I do not place a second one just to be sure.',
            },
            acceptance: [
                { tr: 'Sipariş oluştuğunda kullanıcı sipariş numarasını görür.', en: 'When the order is created the user sees the order number.' },
                { tr: 'Sipariş isteği sürerken düğme ikinci bir sipariş göndermeye izin vermez.', en: 'While the order request is in flight the button does not allow a second order to be sent.' },
                { tr: 'Boş sepetle sipariş adımına geçilemez.', en: 'The order step cannot be entered with an empty cart.' },
                { tr: 'Sipariş oluşmadığında kullanıcı sebebini görür ve sepeti yerinde durur.', en: 'When no order is created the user sees why and their cart stays where it was.' },
            ],
            criteria: [
                { tr: 'Given dolu sepet ve sipariş 201 ile oluşur\nWhen cevap işlenir\nThen sipariş numarası ekranda gösterilir', en: 'Given a full cart and the order is created with 201\nWhen the response is handled\nThen the order number is shown on screen' },
                { tr: 'Given sipariş isteği sürüyor\nWhen düğmeye tekrar basılır\nThen ikinci POST /orders isteği GİTMEZ', en: 'Given the order request is in flight\nWhen the button is pressed again\nThen a second POST /orders request is NOT sent' },
                { tr: 'Given sepet boş\nWhen sipariş adımı açılmak istenir\nThen adım açılmaz ve kullanıcıya sepetin boş olduğu söylenir', en: 'Given the cart is empty\nWhen the order step is opened\nThen it does not open and the user is told the cart is empty' },
                { tr: 'Given sipariş 422 ile reddedilir\nWhen cevap işlenir\nThen sepet temizlenmez ve sebep gösterilir', en: 'Given the order is rejected with 422\nWhen the response is handled\nThen the cart is not cleared and the reason is shown' },
            ],
            screens: [{ tr: 'Sipariş adımı', en: 'Order step' }, { tr: 'Sipariş sonucu', en: 'Order result' }],
        },
        {
            id: 'BE-09',
            parent: 'US-09',
            epic: 'EP-04',
            kind: 'backend',
            difficulty: 'advanced',
            layers: ['API', 'DB'],
            title: { tr: 'Sipariş servisi stoğu gerçekten düşer ve tutarı kendisi hesaplar', en: 'The order service really decrements stock and computes the total itself' },
            story: {
                tr: 'Bir müşteri olarak sipariş verdiğimde ayrılan ürünlerin gerçekten benim adıma düşülmesini istiyorum; böylece siparişim sonradan stok yok diye iptal edilmez.',
                en: 'As a customer, I want the items set aside to be genuinely deducted for me when I order, so that my order is not cancelled later for lack of stock.',
            },
            acceptance: [
                { tr: 'Dolu bir sepetten sipariş oluşur ve siparişe bir numara verilir.', en: 'An order is created from a full cart and is given a number.' },
                { tr: 'Sipariş oluştuğunda stok gerçekten düşer ve ayrılan miktar serbest kalır.', en: 'When the order is created stock really decreases and the reserved amount is released.' },
                { tr: 'Sipariş tutarı, ara toplam eksi indirim artı kargo ile birebir uyuşur.', en: 'The order total matches subtotal minus discount plus shipping exactly.' },
                { tr: 'Aynı sepetten ikinci kez sipariş oluşmaz.', en: 'A second order is not created from the same cart.' },
                { tr: 'Boş sepetten sipariş oluşmaz.', en: 'No order is created from an empty cart.' },
            ],
            criteria: [
                { tr: 'Given dolu sepet\nWhen POST /orders çağrılır\nThen 201 döner ve sipariş numarası verilir', en: 'Given a full cart\nWhen POST /orders is called\nThen 201 is returned and an order number is issued' },
                { tr: 'Given sipariş oluştu\nWhen ürün stoğu SQL ile okunur\nThen gerçek stok düşmüş ve rezerve miktar sıfırlanmıştır', en: 'Given the order was created\nWhen product stock is read with SQL\nThen the real stock has decreased and the reserved amount is back to zero' },
                { tr: 'Given siparişte indirim ve kargo var\nWhen tutarlar okunur\nThen toplam, ara toplam eksi indirim artı kargo ile BİREBİR uyuşur', en: 'Given the order has a discount and shipping\nWhen the amounts are read\nThen the total matches subtotal minus discount plus shipping EXACTLY' },
                { tr: 'Given aynı sepetten ikinci kez sipariş istenir\nWhen çağrı yapılır\nThen 409 döner ve ikinci sipariş OLUŞMAZ', en: 'Given a second order is requested from the same cart\nWhen the call is made\nThen 409 is returned and NO second order is created' },
                { tr: 'Given sepet boş\nWhen sipariş istenir\nThen 422 döner', en: 'Given the cart is empty\nWhen an order is requested\nThen 422 is returned' },
            ],
            endpoints: ['POST /orders', 'GET /products/{id}/variants'],
        },

        // ═══ EP-04 · US-10 ═══════════════════════════════════════════════════
        {
            id: 'FE-10',
            parent: 'US-10',
            epic: 'EP-04',
            kind: 'frontend',
            difficulty: 'intermediate',
            layers: ['UI'],
            title: { tr: 'Başarısız ödeme sessiz kalmaz', en: 'A failed payment is never silent' },
            story: {
                tr: 'Bir müşteri olarak ödemem başarısız olduğunda bunu net biçimde görmek istiyorum; böylece ödedim sanıp kargo beklemeye başlamam.',
                en: 'As a customer, I want to clearly see when my payment fails, so that I do not think I paid and start waiting for a delivery.',
            },
            acceptance: [
                { tr: 'Ödeme başarısız olduğunda kullanıcı bunu açıkça görür; sayfa sessizce ilerlemez.', en: 'When the payment fails the user sees it plainly; the page does not quietly move on.' },
                { tr: 'Ödeme başarısızken siparişin durumu ekranda ödenmiş gibi gösterilmez.', en: 'While the payment has failed the order is not shown as paid on screen.' },
                { tr: 'Ödenmiş bir siparişte ödeme düğmesi tekrar sunulmaz.', en: 'The pay button is not offered again on an order that is already paid.' },
                { tr: 'Kullanıcı başarısız ödemeden sonra yeniden deneyebilir.', en: 'The user can try again after a failed payment.' },
            ],
            criteria: [
                { tr: 'Given ödeme servisi 402 döner\nWhen cevap işlenir\nThen kullanıcıya ödemenin alınamadığı söylenir ve sipariş durumu değişmemiş gösterilir', en: 'Given the payment service returns 402\nWhen the response is handled\nThen the user is told the payment was not taken and the order status is shown unchanged' },
                { tr: 'Given sipariş zaten ödenmiş\nWhen sipariş ekranı açılır\nThen ödeme düğmesi sunulmaz', en: 'Given the order is already paid\nWhen the order screen opens\nThen the pay button is not offered' },
                { tr: 'Given ödeme başarısız oldu\nWhen kullanıcı tekrar dener\nThen yeni bir ödeme isteği gider', en: 'Given the payment failed\nWhen the user tries again\nThen a fresh payment request is sent' },
            ],
            screens: [{ tr: 'Ödeme adımı', en: 'Payment step' }, { tr: 'Sipariş detayı', en: 'Order detail' }],
        },
        {
            id: 'BE-10',
            parent: 'US-10',
            epic: 'EP-04',
            kind: 'backend',
            difficulty: 'intermediate',
            layers: ['API', 'DB'],
            title: { tr: 'Ödeme servisi başarısızlıkta siparişi ilerletmez, iki kez tahsil etmez', en: 'The payment service neither advances the order on failure nor charges twice' },
            story: {
                tr: 'Bir müşteri olarak başarısız bir ödemenin siparişimi ilerletmemesini ve aynı sipariş için iki kez tahsilat yapılmamasını istiyorum.',
                en: 'As a customer, I want a failed payment not to advance my order, and I do not want to be charged twice for the same order.',
            },
            acceptance: [
                { tr: 'Ödeme başarısız olabilir ve bu normal bir sonuçtur.', en: 'A payment can fail, and that is a normal outcome.' },
                { tr: 'Ödeme başarısız olduğunda sipariş ödenmiş sayılmaz, olduğu yerde kalır.', en: 'When the payment fails the order is not counted as paid and stays where it was.' },
                { tr: 'Ödenmiş bir sipariş ikinci kez ödenemez.', en: 'An order that is already paid cannot be paid again.' },
                { tr: 'Başarısız ödeme ikinci bir ödeme kaydı oluşturmaz.', en: 'A failed payment does not create a second payment record.' },
            ],
            criteria: [
                { tr: 'Given ödemenin başarısız olduğu senaryo\nWhen POST /orders/{id}/pay çağrılır\nThen 402 döner', en: 'Given the scenario where the payment fails\nWhen POST /orders/{id}/pay is called\nThen 402 is returned' },
                { tr: 'Given ödeme başarısız oldu\nWhen GET /orders/{id} okunur\nThen sipariş durumu ödeme öncesi durumda KALIR', en: 'Given the payment failed\nWhen GET /orders/{id} is read\nThen the order status STAYS at its pre-payment state' },
                { tr: 'Given sipariş ödenmiş\nWhen tekrar ödeme istenir\nThen 409 döner', en: 'Given the order is paid\nWhen payment is requested again\nThen 409 is returned' },
                { tr: 'Given ikinci ödeme reddedildi\nWhen ödeme kayıtları SQL ile sayılır\nThen tek kayıt vardır', en: 'Given the second payment was refused\nWhen payment records are counted with SQL\nThen there is exactly one record' },
            ],
            endpoints: ['POST /orders/{id}/pay', 'GET /orders/{id}'],
        },

        // ═══ EP-04 · US-11 ═══════════════════════════════════════════════════
        {
            id: 'FE-11',
            parent: 'US-11',
            epic: 'EP-04',
            kind: 'frontend',
            difficulty: 'intermediate',
            layers: ['UI'],
            title: { tr: 'Sipariş ekranı yalnızca gerçekten mümkün olan işlemleri sunar', en: 'The order screen offers only the actions that are genuinely possible' },
            story: {
                tr: 'Bir müşteri olarak siparişimin hangi aşamada olduğunu ve sırada ne olduğunu görmek istiyorum; böylece ne zaman ne bekleyeceğimi bilirim.',
                en: 'As a customer, I want to see what stage my order is at and what comes next, so that I know what to expect and when.',
            },
            acceptance: [
                { tr: 'Sipariş detayı siparişin bulunduğu aşamayı açıkça gösterir.', en: 'The order detail clearly shows the stage the order is at.' },
                { tr: 'O anda mümkün olmayan işlemler kullanıcıya sunulmaz.', en: 'Actions that are not possible at that moment are not offered to the user.' },
                { tr: 'Bir işlem servis tarafından reddedilirse kullanıcı sebebini görür.', en: 'If an action is refused by the service the user sees why.' },
                { tr: 'Durum değiştiğinde ekran servisten okunan yeni durumu gösterir, tahmin etmez.', en: 'When the status changes the screen shows the new status read from the service rather than guessing it.' },
            ],
            criteria: [
                { tr: 'Given sipariş ödenmemiş durumda\nWhen sipariş detayı açılır\nThen kargola işlemi kullanıcıya SUNULMAZ', en: 'Given the order is unpaid\nWhen the order detail opens\nThen the ship action is NOT offered to the user' },
                { tr: 'Given bir geçiş servis tarafından 409 ile reddedilir\nWhen cevap işlenir\nThen kullanıcıya bu aşamada bu işlemin yapılamayacağı söylenir', en: 'Given a transition is refused by the service with 409\nWhen the response is handled\nThen the user is told this action is not possible at this stage' },
                { tr: 'Given kargolama başarılı oldu\nWhen ekran güncellenir\nThen yeni durum servisten yeniden okunur, istemcide ilerletilmez', en: 'Given shipping succeeded\nWhen the screen updates\nThen the new status is re-read from the service rather than advanced on the client' },
            ],
            screens: [{ tr: 'Sipariş detayı', en: 'Order detail' }, { tr: 'Sipariş durumu şeridi', en: 'Order status bar' }],
        },
        {
            id: 'BE-11',
            parent: 'US-11',
            epic: 'EP-04',
            kind: 'backend',
            difficulty: 'intermediate',
            layers: ['API', 'DB'],
            title: { tr: 'Durum geçiş servisi yalnızca anlamlı sıraya izin verir', en: 'The state transition service allows only a meaningful sequence' },
            story: {
                tr: 'Bir müşteri olarak siparişimin yalnızca anlamlı sırayla ilerlemesini istiyorum; böylece ödemediğim bir sipariş kargoya verilip hesabım karışmaz.',
                en: 'As a customer, I want my order to advance only in a meaningful sequence, so that an order I never paid for is not shipped and my account left in a mess.',
            },
            acceptance: [
                { tr: 'Ödenmemiş bir sipariş kargolanamaz.', en: 'An unpaid order cannot be shipped.' },
                { tr: 'Ödenmemiş bir sipariş teslim edilmiş sayılamaz.', en: 'An unpaid order cannot be counted as delivered.' },
                { tr: 'Ödenmiş bir sipariş kargolanabilir.', en: 'A paid order can be shipped.' },
                { tr: 'Kargolanmış bir sipariş ikinci kez kargolanamaz.', en: 'An order that has been shipped cannot be shipped again.' },
            ],
            criteria: [
                { tr: 'Given sipariş ödenmemiş\nWhen POST /orders/{id}/ship çağrılır\nThen 409 ve INVALID_TRANSITION döner', en: 'Given the order is unpaid\nWhen POST /orders/{id}/ship is called\nThen 409 and INVALID_TRANSITION are returned' },
                { tr: 'Given sipariş ödenmemiş\nWhen teslim edildi işaretlenmek istenir\nThen reddedilir ve durum DEĞİŞMEZ', en: 'Given the order is unpaid\nWhen it is marked delivered\nThen it is refused and the status does NOT change' },
                { tr: 'Given sipariş ödenmiş\nWhen kargolanır\nThen 200 döner ve durum kargolandı olur', en: 'Given the order is paid\nWhen it is shipped\nThen 200 is returned and the status becomes shipped' },
                { tr: 'Given sipariş zaten kargolanmış\nWhen tekrar kargolanmak istenir\nThen 409 döner', en: 'Given the order is already shipped\nWhen shipping is requested again\nThen 409 is returned' },
            ],
            endpoints: ['POST /orders/{id}/ship', 'POST /orders/{id}/deliver'],
        },

        // ═══ EP-04 · US-12 ═══════════════════════════════════════════════════
        {
            id: 'FE-12',
            parent: 'US-12',
            epic: 'EP-04',
            kind: 'frontend',
            difficulty: 'advanced',
            layers: ['UI'],
            title: { tr: 'İptal ve iade hakkı zamanında görünür', en: 'The right to cancel or return is visible while it still applies' },
            story: {
                tr: 'Bir müşteri olarak siparişimi iptal veya iade edebileceğim durumları ve süreyi görmek istiyorum; böylece hakkımı zamanında kullanırım.',
                en: 'As a customer, I want to see when and for how long I can cancel or return my order, so that I use that right in time.',
            },
            acceptance: [
                { tr: 'İptal ve iade seçenekleri yalnızca gerçekten mümkün olduklarında sunulur.', en: 'Cancel and return options are offered only when they are genuinely possible.' },
                { tr: 'İade süresi geçmişse kullanıcı bunu işlemi denemeden önce görür.', en: 'If the return window has passed the user sees that before attempting the action.' },
                { tr: 'İşlem tamamlandığında kullanıcı sonucu görür ve ekranda eski durum kalmaz.', en: 'When the action completes the user sees the outcome and the old status does not linger on screen.' },
            ],
            criteria: [
                { tr: 'Given sipariş kargolanmış\nWhen sipariş detayı açılır\nThen iptal seçeneği SUNULMAZ', en: 'Given the order has been shipped\nWhen the order detail opens\nThen the cancel option is NOT offered' },
                { tr: 'Given iade süresi geçmiş\nWhen sipariş detayı açılır\nThen iade seçeneği sunulmaz ve süre bilgisi gösterilir', en: 'Given the return window has passed\nWhen the order detail opens\nThen the return option is not offered and the window information is shown' },
                { tr: 'Given iptal 200 ile tamamlandı\nWhen ekran güncellenir\nThen sipariş durumu servisten yeniden okunur', en: 'Given the cancellation completed with 200\nWhen the screen updates\nThen the order status is re-read from the service' },
            ],
            screens: [{ tr: 'Sipariş detayı', en: 'Order detail' }, { tr: 'İade formu', en: 'Return form' }],
        },
        {
            id: 'BE-12',
            parent: 'US-12',
            epic: 'EP-04',
            kind: 'backend',
            difficulty: 'advanced',
            layers: ['API', 'DB'],
            title: { tr: 'İptal ve iade servisi stoğu geri verir ve iade kaydı oluşturur', en: 'The cancel and return service gives stock back and creates a refund record' },
            story: {
                tr: 'Bir müşteri olarak siparişimi iptal ettiğimde ayrılan ürünlerin serbest kalmasını ve paramın bir iade kaydına bağlanmasını istiyorum.',
                en: 'As a customer, when I cancel my order I want the reserved items released and my money tied to a refund record.',
            },
            acceptance: [
                { tr: 'Henüz kargolanmamış bir sipariş iptal edilebilir ve stok geri gelir.', en: 'An order not yet shipped can be cancelled and its stock comes back.' },
                { tr: 'Kargolanmış bir sipariş iptal edilemez.', en: 'An order that has shipped cannot be cancelled.' },
                { tr: 'Teslim edilmiş bir sipariş, iade süresi içindeyse iade edilebilir ve stok geri gelir.', en: 'A delivered order can be returned while it is inside the return window, and its stock comes back.' },
                { tr: 'Ödenmiş bir sipariş iptal edildiğinde bir iade kaydı oluşur.', en: 'When a paid order is cancelled a refund record is created.' },
            ],
            criteria: [
                { tr: 'Given sipariş kargolanmamış\nWhen POST /orders/{id}/cancel çağrılır\nThen 200 döner ve stok SQL ile bakıldığında geri gelmiştir', en: 'Given the order has not shipped\nWhen POST /orders/{id}/cancel is called\nThen 200 is returned and stock has come back when read with SQL' },
                { tr: 'Given sipariş kargolanmış\nWhen iptal istenir\nThen 409 döner', en: 'Given the order has shipped\nWhen cancellation is requested\nThen 409 is returned' },
                { tr: 'Given sipariş teslim edilmiş ve iade süresi geçmiş\nWhen iade istenir\nThen reddedilir', en: 'Given the order is delivered and the return window has passed\nWhen a return is requested\nThen it is refused' },
                { tr: 'Given ödenmiş sipariş iptal edildi\nWhen iade kayıtları SQL ile okunur\nThen bir iade kaydı vardır', en: 'Given a paid order was cancelled\nWhen refund records are read with SQL\nThen a refund record exists' },
            ],
            endpoints: ['POST /orders/{id}/cancel', 'POST /orders/{id}/return'],
        },

        // ═══ EP-05 · US-14 ═══════════════════════════════════════════════════
        {
            id: 'FE-14',
            parent: 'US-14',
            epic: 'EP-05',
            kind: 'frontend',
            difficulty: 'intermediate',
            layers: ['UI'],
            title: { tr: 'Yorumun onay bekleyeceği yazarken bellidir', en: 'It is clear at writing time that a review will wait for approval' },
            story: {
                tr: 'Bir müşteri olarak yazdığım yorumun hemen yayınlanmayıp onay bekleyeceğini bilmek istiyorum; böylece yorumum kaybolmuş sanıp tekrar yazmam.',
                en: 'As a customer, I want to know my review will wait for approval rather than appear at once, so that I do not think it was lost and write it again.',
            },
            acceptance: [
                { tr: 'Yorum gönderildiğinde kullanıcı onay bekleyeceğini görür.', en: 'When a review is submitted the user sees that it will wait for approval.' },
                { tr: 'Yorum listesinde yalnızca onaylanmış yorumlar görünür.', en: 'Only approved reviews appear in the review list.' },
                { tr: 'Ürün puanı listedeki yorumlardan istemcide hesaplanmaz.', en: 'The product rating is not computed on the client from the listed reviews.' },
            ],
            criteria: [
                { tr: 'Given yorum 201 ile kaydedildi\nWhen cevap işlenir\nThen kullanıcıya yorumun onay beklediği söylenir ve yorum listeye EKLENMEZ', en: 'Given the review was saved with 201\nWhen the response is handled\nThen the user is told it is awaiting approval and it is NOT added to the list' },
                { tr: 'Given ürün sayfası açık\nWhen puan gösterilir\nThen değer GET /products/{id}/rating cevabından gelir, listedeki yorumlardan hesaplanmaz', en: 'Given the product page is open\nWhen the rating is shown\nThen the value comes from the GET /products/{id}/rating response and is not computed from the listed reviews' },
            ],
            screens: [{ tr: 'Ürün yorumları', en: 'Product reviews' }, { tr: 'Yorum formu', en: 'Review form' }],
        },
        {
            id: 'BE-14',
            parent: 'US-14',
            epic: 'EP-05',
            kind: 'backend',
            difficulty: 'intermediate',
            layers: ['API', 'DB'],
            title: { tr: 'Puan yalnızca onaylanmış yorumlardan oluşur', en: 'The rating is built only from approved reviews' },
            story: {
                tr: 'Bir müşteri olarak gördüğüm ürün puanının yalnızca onaylanmış yorumlardan oluşmasını istiyorum; böylece puana bakarak verdiğim karar yanıltıcı olmaz.',
                en: 'As a customer, I want the product rating I see to be built only from approved reviews, so that a decision I make by looking at it is not misleading.',
            },
            acceptance: [
                { tr: 'Eklenen yorum önce onay bekler, hemen yayınlanmaz.', en: 'A new review waits for approval and is not published immediately.' },
                { tr: 'Onay bekleyen bir yorum ürünün puan ortalamasını değiştirmez.', en: 'A review awaiting approval does not change the product rating average.' },
                { tr: 'Yorum listesinde yalnızca onaylanmış yorumlar döner.', en: 'Only approved reviews are returned in the review list.' },
                { tr: 'Onay bekleyen yorumlar moderasyon için ayrıca listelenebilir.', en: 'Reviews awaiting approval can be listed separately for moderation.' },
            ],
            criteria: [
                { tr: 'Given ürünün bilinen bir puan ortalaması var\nWhen yeni bir yorum eklenir\nThen 201 döner ama ortalama DEĞİŞMEZ', en: 'Given the product has a known rating average\nWhen a new review is added\nThen 201 is returned but the average does NOT change' },
                { tr: 'Given onay bekleyen bir yorum var\nWhen GET /products/{id}/reviews çağrılır\nThen o yorum listede YOKTUR', en: 'Given a review is awaiting approval\nWhen GET /products/{id}/reviews is called\nThen that review is NOT in the list' },
                { tr: 'Given yorum PATCH /reviews/{id} ile onaylanır\nWhen puan yeniden okunur\nThen ortalama artık bu yorumu içerir', en: 'Given the review is approved with PATCH /reviews/{id}\nWhen the rating is read again\nThen the average now includes that review' },
            ],
            endpoints: ['POST /products/{id}/reviews', 'GET /products/{id}/reviews', 'GET /products/{id}/rating', 'PATCH /reviews/{id}'],
        },

        // ═══ EP-05 · US-15 ═══════════════════════════════════════════════════
        {
            id: 'FE-15',
            parent: 'US-15',
            epic: 'EP-05',
            kind: 'frontend',
            difficulty: 'basic',
            layers: ['UI'],
            title: { tr: 'Varsayılan adres bir bakışta görünür', en: 'The default address is visible at a glance' },
            story: {
                tr: 'Bir müşteri olarak hangi adresimin varsayılan olduğunu bir bakışta görmek istiyorum; böylece siparişimin yanlış adrese gitmesi riskini taşımam.',
                en: 'As a customer, I want to see at a glance which of my addresses is the default, so that I do not risk my order going to the wrong place.',
            },
            acceptance: [
                { tr: 'Varsayılan adres listede açıkça işaretlidir ve en başta görünür.', en: 'The default address is clearly marked in the list and appears first.' },
                { tr: 'Varsayılan değiştirildiğinde ekran servisten okunan yeni duruma göre güncellenir.', en: 'When the default changes the screen updates from the new state read from the service.' },
                { tr: 'Hiçbir alanı değiştirmeden gönderilen güncelleme isteği yollanmaz.', en: 'An update request with no field actually changed is not sent.' },
            ],
            criteria: [
                { tr: 'Given birden çok adres var\nWhen adres defteri açılır\nThen varsayılan olan ilk sırada ve işaretli görünür', en: 'Given there are several addresses\nWhen the address book opens\nThen the default one appears first and marked' },
                { tr: 'Given kullanıcı başka bir adresi varsayılan yapar\nWhen işlem tamamlanır\nThen liste GET ile yeniden okunur, istemcide yeniden sıralanmaz', en: 'Given the user makes another address the default\nWhen the action completes\nThen the list is re-read with GET rather than reordered on the client' },
                { tr: 'Given formda hiçbir alan değişmedi\nWhen kaydet denenir\nThen istek HİÇ gitmez', en: 'Given no field on the form changed\nWhen save is attempted\nThen the request is NEVER sent' },
            ],
            screens: [{ tr: 'Adres defteri', en: 'Address book' }, { tr: 'Adres formu', en: 'Address form' }],
        },
        {
            id: 'BE-15',
            parent: 'US-15',
            epic: 'EP-05',
            kind: 'backend',
            difficulty: 'intermediate',
            layers: ['API', 'DB'],
            title: { tr: 'Adres servisi her zaman tek bir varsayılan bırakır', en: 'The address service always leaves exactly one default' },
            story: {
                tr: 'Bir müşteri olarak her zaman kullanılabilir tek bir varsayılan adresimin olmasını istiyorum; böylece adres seçmeyi unutsam da siparişim kargolanabilir.',
                en: 'As a customer, I want to always have exactly one usable default address, so that my order can still be shipped even if I forget to pick one.',
            },
            acceptance: [
                { tr: 'Müşterinin ilk adresi otomatik olarak varsayılan olur.', en: "A customer's first address automatically becomes the default." },
                { tr: 'Yeni bir adres varsayılan yapıldığında eski varsayılan bu sıfatı kaybeder.', en: 'When a new address is made the default the previous one loses that status.' },
                { tr: 'Varsayılan adres silinirse kalan adreslerden biri varsayılan olur.', en: 'If the default address is deleted one of the remaining addresses becomes the default.' },
                { tr: 'Boş bir güncelleme isteği kabul edilmez.', en: 'An empty update request is not accepted.' },
            ],
            criteria: [
                { tr: 'Given müşterinin hiç adresi yok\nWhen ilk adres eklenir\nThen 201 döner ve o adres varsayılan olur', en: 'Given the customer has no addresses\nWhen the first address is added\nThen 201 is returned and that address becomes the default' },
                { tr: 'Given iki adres var ve biri varsayılan\nWhen diğeri varsayılan yapılır\nThen SQL ile bakıldığında varsayılan sayısı TAM OLARAK BİRDİR', en: 'Given two addresses exist and one is the default\nWhen the other is made the default\nThen reading with SQL shows EXACTLY ONE default' },
                { tr: 'Given varsayılan adres silinir ve başka adresler var\nWhen liste okunur\nThen kalanlardan biri varsayılandır', en: 'Given the default address is deleted and other addresses remain\nWhen the list is read\nThen one of the remaining ones is the default' },
                { tr: 'Given güncelleme gövdesi boş\nWhen PATCH /addresses/{id} çağrılır\nThen 422 döner', en: 'Given the update body is empty\nWhen PATCH /addresses/{id} is called\nThen 422 is returned' },
            ],
            endpoints: ['GET /addresses', 'POST /addresses', 'PATCH /addresses/{id}', 'DELETE /addresses/{id}'],
        },

        // ═══ EP-06 · US-13 ═══════════════════════════════════════════════════
        {
            id: 'FE-13',
            parent: 'US-13',
            epic: 'EP-06',
            kind: 'frontend',
            difficulty: 'basic',
            layers: ['UI'],
            title: { tr: 'Sipariş listesi boşken de kendini açıklar', en: 'The order list explains itself even when empty' },
            story: {
                tr: 'Bir müşteri olarak sipariş listemde yalnızca kendi siparişlerimi görmek ve hiç siparişim yoksa bunu anlamak istiyorum; böylece listemin yüklenmediğini sanıp beklemem.',
                en: 'As a customer, I want to see only my own orders and to understand when I have none, so that I do not sit waiting thinking the list failed to load.',
            },
            acceptance: [
                { tr: 'Sipariş listesi yalnızca oturum sahibinin siparişlerini gösterir.', en: 'The order list shows only the orders of the signed-in person.' },
                { tr: 'Liste boşken kullanıcı bunun henüz sipariş olmadığı anlamına geldiğini görür.', en: 'When the list is empty the user sees that it means there are no orders yet.' },
                { tr: 'Erişilemeyen bir siparişe gidildiğinde kullanıcı boş bir ekranla kalmaz.', en: 'Navigating to an order that cannot be accessed does not leave the user with a blank screen.' },
            ],
            criteria: [
                { tr: 'Given servis boş liste döner\nWhen ekran çizilir\nThen henüz sipariş yok metni görünür, yükleniyor göstergesi kalmaz', en: 'Given the service returns an empty list\nWhen the screen renders\nThen a no-orders-yet message appears and the loading indicator is gone' },
                { tr: 'Given başka bir müşterinin sipariş adresine gidilir ve servis 403 döner\nWhen cevap işlenir\nThen kullanıcıya bu siparişe erişemeyeceği söylenir', en: "Given another customer's order address is opened and the service returns 403\nWhen the response is handled\nThen the user is told they cannot access this order" },
            ],
            screens: [{ tr: 'Sipariş listesi', en: 'Order list' }, { tr: 'Sipariş detayı', en: 'Order detail' }],
        },
        {
            id: 'BE-13',
            parent: 'US-13',
            epic: 'EP-06',
            kind: 'backend',
            difficulty: 'advanced',
            layers: ['API', 'DB'],
            title: { tr: 'Sipariş erişimi sahibine bağlıdır, bağlantının varlığına değil', en: 'Order access depends on ownership, not on whether a link exists' },
            story: {
                tr: 'Bir müşteri olarak siparişlerimi yalnızca benim görebilmesini istiyorum; böylece adresi tahmin eden biri alışveriş geçmişime ulaşamaz.',
                en: 'As a customer, I want only me to be able to see my orders, so that someone who guesses the address cannot reach my shopping history.',
            },
            acceptance: [
                { tr: 'Bir müşteri başka bir müşterinin siparişini göremez.', en: "A customer cannot see another customer's order." },
                { tr: 'Hiç siparişi olmayan müşteri boş bir liste görür; başkasının siparişleri sızmaz.', en: "A customer with no orders sees an empty list; nobody else's orders leak in." },
                { tr: 'Bir müşterinin siparişi yalnızca kendi veri alanına bağlıdır.', en: "A customer's order belongs only to their own data area." },
            ],
            criteria: [
                { tr: 'Given B müşterisinin token değeri ve A müşterisinin sipariş kimliği\nWhen GET /orders/{id} çağrılır\nThen 403 döner - kaynak vardır ama yetki yoktur, 404 ile karıştırma', en: "Given customer B's token and customer A's order id\nWhen GET /orders/{id} is called\nThen 403 is returned - the resource exists but the permission does not, do not confuse it with 404" },
                { tr: 'Given hiç siparişi olmayan bir müşteri\nWhen GET /orders çağrılır\nThen 200 ve BOŞ liste döner', en: 'Given a customer with no orders\nWhen GET /orders is called\nThen 200 and an EMPTY list are returned' },
                { tr: 'Given iki farklı veri alanında aynı numaralı siparişler var\nWhen her biri kendi token değeriyle okunur\nThen her müşteri yalnızca kendi kaydını görür', en: 'Given orders with the same number exist in two different data areas\nWhen each is read with its own token\nThen each customer sees only their own record' },
            ],
            endpoints: ['GET /orders', 'GET /orders/{id}'],
        },

        // ═══ EP-06 · US-16 ═══════════════════════════════════════════════════
        {
            id: 'FE-16',
            parent: 'US-16',
            epic: 'EP-06',
            kind: 'frontend',
            difficulty: 'intermediate',
            layers: ['UI'],
            title: { tr: 'Veri alanının durumu ekranda görünür', en: 'The state of the data area is visible on screen' },
            story: {
                tr: 'Bir test eden kişi olarak kendi veri alanımın açık olup olmadığını ve ne zaman sıfırlandığını ekranda görmek istiyorum; böylece testimin neden farklı sonuç verdiğini başka yerde aramam.',
                en: 'As someone testing, I want to see on screen whether my own data area is open and when it was reset, so that I do not go looking elsewhere for why my test behaved differently.',
            },
            acceptance: [
                { tr: 'Kendi veri alanının açık olup olmadığı ekranda görünür.', en: 'Whether your own data area is open is visible on screen.' },
                { tr: 'Sıfırlama sonrası açık oturumun kapandığı kullanıcıya bildirilir.', en: 'After a reset the user is told that the open session has ended.' },
                { tr: 'Yalnızca okuma yetkisi olan biri yazma işlemlerini sunulmuş görmez.', en: 'Someone with read-only access is not offered write actions.' },
            ],
            criteria: [
                { tr: 'Given kendi veri alanı açılmamış\nWhen dükkân açılır\nThen rozet paylaşılan alanda olunduğunu gösterir', en: 'Given no personal data area has been opened\nWhen the store opens\nThen the badge shows that you are on the shared area' },
                { tr: 'Given veri alanı sıfırlandı\nWhen sonraki istek 401 döner\nThen kullanıcıya oturumun sıfırlama nedeniyle kapandığı söylenir', en: 'Given the data area was reset\nWhen the next request returns 401\nThen the user is told the session ended because of the reset' },
            ],
            screens: [{ tr: 'QA paneli', en: 'QA panel' }, { tr: 'Veri alanı rozeti', en: 'Data area badge' }],
        },
        {
            id: 'BE-16',
            parent: 'US-16',
            epic: 'EP-06',
            kind: 'backend',
            difficulty: 'advanced',
            layers: ['API', 'DB'],
            title: { tr: 'Veri alanı servisi her koşuma temiz bir başlangıç verir', en: 'The data area service gives every run a clean start' },
            story: {
                tr: 'Bir test eden kişi olarak her koşuma bilinen ve temiz bir durumdan başlamak istiyorum; böylece testimin sonucu önceki koşumun değil ürünün fonksiyonu olur.',
                en: 'As someone testing, I want to start every run from a known, clean state, so that my result is a function of the product rather than of the previous run.',
            },
            acceptance: [
                { tr: 'Veri alanı sıfırlandığında içerik başlangıç durumuna döner.', en: 'When the data area is reset its contents return to the starting state.' },
                { tr: 'Sıfırlama açık oturumları da sonlandırır.', en: 'A reset also ends any open sessions.' },
                { tr: 'Sıfırlamadan sonra kayıt numaraları değişmiş olabilir.', en: 'Record numbers may have changed after a reset.' },
                { tr: 'Kendi veri alanı olmayan biri yalnızca okuma yapabilir.', en: 'Someone without their own data area can only read.' },
            ],
            criteria: [
                { tr: 'Given veri alanında değişiklik yapıldı\nWhen POST /sandbox/reset çağrılır\nThen içerik tohum verisine döner', en: 'Given changes were made in the data area\nWhen POST /sandbox/reset is called\nThen the contents return to the seed data' },
                { tr: 'Given sıfırlama öncesi alınmış bir token\nWhen sıfırlamadan sonra korumalı bir uç çağrılır\nThen 401 döner - token bayattır', en: 'Given a token taken before the reset\nWhen a protected endpoint is called after the reset\nThen 401 is returned - the token is stale' },
                { tr: 'Given sıfırlama öncesi okunmuş bir ürün kimliği\nWhen sıfırlamadan sonra aynı kimlik çağrılır\nThen kayıt numaraları kaymış olabilir - id ONBELLEKLENMEZ, listeden yeniden okunur', en: 'Given a product id read before the reset\nWhen the same id is called after the reset\nThen record numbers may have shifted - ids are NOT cached, they are re-read from the list' },
                { tr: 'Given kendi veri alanı olmayan bir istemci\nWhen yazma işlemi denenir\nThen reddedilir; okuma çalışmaya devam eder', en: 'Given a client without its own data area\nWhen a write is attempted\nThen it is refused; reading keeps working' },
            ],
            endpoints: ['POST /sandbox', 'POST /sandbox/reset', 'GET /sandbox/state'],
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
            q: {
                tr: "Business story'yi test ettim; frontend ve backend story'lerini ayrıca test etmem şart mı?",
                en: 'I tested the business story - do I really need to test the frontend and backend stories separately?',
            },
            a: {
                tr: 'Business story\'yi arayüzden uçtan uca test etmek, kuralın SERVİSTE de geçerli olduğunu kanıtlamaz. Arayüz sepet adedini sıfıra indirmene izin vermiyor olabilir ama aynı isteği doğrudan servise gönderdiğinde kabul ediliyor olabilir; bu durumda uçtan uca testin yeşildir ve kusur canlıda durur. Tersi de olur: servis kuralı doğru uygular, arayüz reddi kullanıcıya hiç göstermez ve işlem başarılı görünür. Bu yüzden aynı kural iki katmanda ayrı ayrı sınanır — bu tekrar değil, iki farklı iddiadır.',
                en: 'Testing the business story end to end through the interface does not prove the rule also holds in the SERVICE. The interface may refuse to let you take a cart quantity down to zero while the very same request, sent straight to the service, is accepted; your end-to-end test is green and the defect is live. The reverse happens too: the service enforces the rule correctly but the interface never shows the refusal, so the action looks successful. That is why the same rule is exercised separately at both layers - it is not repetition, it is two different claims.',
            },
        },
    ],
}

