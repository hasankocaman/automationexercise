// QA Shop — "bu dükkân hangi veriyle çalışıyor?" içeriği
//
// ── NEDEN AYRI BİR DOSYA ────────────────────────────────────────────────────
// Aynı anlatım İKİ yerde gösteriliyor: dükkânın mod rozetine tıklayınca açılan
// katmanda ve kurulum rehberinin en başında ("Docker'a gerçekten ihtiyacın var
// mı?"). Metni bileşene gömmek iki kopya demekti ve kopyalar sessizce ayrışır.
//
// ── NE ANLATIR, NE ANLATMAZ ─────────────────────────────────────────────────
// Yalnızca BU uygulamaya mahsus olan şey anlatılır: bu dükkânın iki çalışma
// kipi, verinin hangisinde nerede durduğu ve hangi pratiğin hangisini
// gerektirdiği. "Docker nedir", "API nedir", "veritabanı nedir" burada
// AÇIKLANMAZ — bunlar her yerde bulunabilen genel bilgidir ve okuyanın
// zamanını alıp asıl bilinmeyeni gölgeler.
//
// Aynı sebeple burada hiçbir status kodu, hata sabiti ya da "şunu dene, şu
// cevabı bekle" reçetesi geçmez: bu bir yön tarifidir, cevap anahtarı değil.

// ─── İki kip, üç durak ──────────────────────────────────────────────────────
// Duraklar veri yolunun GERÇEK duraklarıdır; süs değildir. Tarayıcı kipinde
// istek gerçekten ağ katmanına iner ve Service Worker tarafından karşılanır —
// bu yüzden geliştirici araçlarının Network sekmesinde normal bir satır olarak
// görünür. Docker kipinde aynı istek makinedeki sunucuya gider.
export const QA_SHOP_MODLARI = {
    tarayici: {
        id: 'tarayici',
        ikon: '🌐',
        ad: { tr: 'Tarayıcı kipi', en: 'Browser mode' },
        etiket: { tr: 'Hiçbir şey kurmadın', en: 'You installed nothing' },
        ozet: {
            tr: 'Dükkânın tamamı bu sekmenin içinde çalışıyor: hem uygulama hem veritabanı burada. Bir şey indirmedin, bir şey kurmadın, bir şey başlatmadın — sayfayı açtın ve çalıştı.',
            en: 'The entire shop runs inside this tab: both the application and the database live here. You downloaded nothing, installed nothing, started nothing — you opened the page and it worked.',
        },
        duraklar: [
            {
                ikon: '🖥️',
                ad: { tr: 'Dükkân sayfası', en: 'The shop page' },
                not: { tr: 'Tıkladığın düğme isteği başlatır.', en: 'The button you click starts the request.' },
            },
            {
                ikon: '⚙️',
                ad: { tr: 'Service Worker', en: 'Service Worker' },
                not: {
                    tr: 'İsteği tarayıcının içinde karşılar. Network sekmesinde gerçek bir satır olarak görünür.',
                    en: 'Answers the request inside the browser. It shows up as a real row in the Network tab.',
                },
            },
            {
                ikon: '🗃️',
                ad: { tr: 'Sekmedeki veritabanı', en: 'Database in this tab' },
                not: {
                    tr: 'Gerçek bir ilişkisel veritabanı, ama yalnızca bu sekmede yaşıyor.',
                    en: 'A real relational database, but it lives only in this tab.',
                },
            },
        ],
        nerede: { tr: 'Hepsi bu sekmenin içinde', en: 'All inside this tab' },
    },

    docker: {
        id: 'docker',
        ikon: '🐳',
        ad: { tr: 'Docker kipi', en: 'Docker mode' },
        etiket: { tr: 'Yığını kendi makinende çalıştırdın', en: 'You are running the stack yourself' },
        ozet: {
            tr: 'Dükkân artık kendi makinende çalışan gerçek bir sunucuya bağlanıyor. Veri sekmenin dışına çıktı: aynı veriye başka programlarla da ulaşabilirsin.',
            en: 'The shop now talks to a real server running on your own machine. The data left the tab: other programs can reach the same data too.',
        },
        duraklar: [
            {
                ikon: '🖥️',
                ad: { tr: 'Dükkân sayfası', en: 'The shop page' },
                not: { tr: 'Aynı düğme, aynı istek.', en: 'The same button, the same request.' },
            },
            {
                ikon: '🐳',
                ad: { tr: 'localhost:4000', en: 'localhost:4000' },
                not: {
                    tr: 'Makinende çalışan sunucu. Postman ve REST Assured de buraya vurabilir.',
                    en: 'The server running on your machine. Postman and REST Assured can hit it too.',
                },
            },
            {
                ikon: '🐘',
                ad: { tr: 'PostgreSQL', en: 'PostgreSQL' },
                not: {
                    tr: 'Diskteki gerçek veritabanı. DBeaver ile bağlanıp tabloları kendi gözünle görürsün.',
                    en: 'A real database on disk. Connect with DBeaver and see the tables with your own eyes.',
                },
            },
        ],
        nerede: { tr: 'Sekmenin dışında, makinende', en: 'Outside the tab, on your machine' },
    },
}

// ─── Kullanıcının üç sorusu ─────────────────────────────────────────────────
// Sırayla: "kurulum yok ne demek", "Docker'sız ne yapmalıyım", "Docker
// kurduysam neye gerek var neye yok". Üçü de gerçekten soruldu.
export const QA_SHOP_MOD_SORULARI = [
    {
        id: 'kurulum-yok',
        ikon: '❓',
        soru: { tr: '"Kurulum yok" ne demek?', en: 'What does "no setup" mean?' },
        cevap: {
            tr: 'Bu dükkânın çalışması için makinene hiçbir şey kurman gerekmedi. Ürünler, sepet, sipariş ve kullanıcılar sahte ekran görüntüsü değil — sayfayı ilk açtığında tarayıcının içine gerçek bir veritabanı kuruldu ve dükkân ona bağlandı. Sayfayı yenilesen bile sepetin durur.',
            en: 'Nothing had to be installed on your machine for this shop to run. The products, cart, orders and users are not fake screenshots — when you first opened the page a real database was created inside your browser and the shop connected to it. Your cart survives a refresh.',
        },
    },
    {
        id: 'dockersiz',
        ikon: '🚀',
        soru: { tr: 'Docker kurmadan ne yapmam gerekiyor?', en: 'What do I need to do without Docker?' },
        cevap: {
            tr: 'Hiçbir şey. Şu an okuduğun hâliyle dükkân çalışıyor: giriş yapabilir, sepete ürün atabilir, sipariş verebilir, defect anahtarlarını açıp testinin kırmızıya dönüp dönmediğini görebilirsin. Selenium, Playwright ya da Cypress testlerini bu adrese doğrultup bugün yazmaya başlayabilirsin.',
            en: 'Nothing. The shop works exactly as you see it: you can sign in, add items to the cart, place an order, flip the defect switches and watch whether your test turns red. You can point Selenium, Playwright or Cypress at this address and start writing today.',
        },
    },
    {
        id: 'docker-kurduysam',
        ikon: '🐳',
        soru: { tr: 'Docker kurup çalıştırdıysam ne değişir?', en: 'What changes once Docker is running?' },
        cevap: {
            tr: 'Dükkân kendiliğinden makinendeki sunucuya geçer — bir düğmeye basman gerekmez, sağ üstteki rozetten hangi kipte olduğunu görürsün. Değişen tek şey verinin nerede durduğudur: artık sekmenin dışında olduğu için DBeaver ile veritabanına bağlanabilir, Postman ve REST Assured ile dışarıdan istek atabilirsin. Tarayıcıdan yaptığın hiçbir pratik kaybolmaz, üstüne yenileri eklenir.',
            en: 'The shop switches to the server on your machine by itself — you do not press anything, and the badge at the top right shows which mode you are in. The only thing that changes is where the data lives: now that it is outside the tab you can connect to the database with DBeaver and send requests from Postman or REST Assured. Nothing you could practise in the browser goes away; more is added on top.',
        },
    },
]

// ─── Neye Docker gerekiyor, neye gerekmiyor ─────────────────────────────────
// Bu tablo bir yetenek listesidir, test reçetesi değil: neyin YAPILABİLDİĞİNİ
// söyler, o şeyi nasıl sınayacağını değil.
export const QA_SHOP_MOD_YETENEKLERI = [
    {
        id: 'ui-otomasyonu',
        is: { tr: 'Selenium / Playwright / Cypress ile arayüz otomasyonu', en: 'UI automation with Selenium / Playwright / Cypress' },
        tarayici: true, docker: true,
    },
    {
        id: 'alisveris-akisi',
        is: { tr: 'Giriş, sepet, kupon, adres, sipariş ve ödeme akışı', en: 'Sign-in, cart, coupon, address, order and payment flow' },
        tarayici: true, docker: true,
    },
    {
        id: 'defectler',
        is: { tr: 'Defect anahtarları ve gizli av turu', en: 'Defect switches and the hidden hunt round' },
        tarayici: true, docker: true,
    },
    {
        id: 'network',
        is: { tr: 'Her isteği geliştirici araçlarının Network sekmesinde görmek', en: 'Seeing every request in the dev tools Network tab' },
        tarayici: true, docker: true,
    },
    {
        id: 'sifirlama',
        is: { tr: 'Veriyi tohum hâline geri döndürmek', en: 'Resetting the data back to its seed state' },
        tarayici: true, docker: true,
    },
    {
        id: 'dis-api',
        is: { tr: 'Postman, Newman veya REST Assured ile dışarıdan API testi', en: 'API testing from outside with Postman, Newman or REST Assured' },
        tarayici: false, docker: true,
        neden: {
            tr: 'Veri sekmenin içinde olduğu için dışarıdaki bir program ona ulaşamaz.',
            en: 'The data lives inside the tab, so a program outside cannot reach it.',
        },
    },
    {
        id: 'dbeaver',
        is: { tr: 'DBeaver veya JDBC ile veritabanına bağlanmak', en: 'Connecting to the database with DBeaver or JDBC' },
        tarayici: false, docker: true,
        neden: {
            tr: 'Bağlanılacak bir sunucu adresi ancak Docker kipinde vardır.',
            en: 'There is a server address to connect to only in Docker mode.',
        },
    },
    {
        id: 'sql',
        is: { tr: 'Doğrulama sorgularını SQL ile koşturmak', en: 'Running the validation queries in SQL' },
        tarayici: false, docker: true,
        neden: {
            tr: 'Sorguyu yazacağın istemci veritabanını göremez.',
            en: 'The client you would write the query in cannot see the database.',
        },
    },
    {
        id: 'eksik-uclar',
        is: { tr: 'Fatura, yorum yazma, adres güncelleme ve marka listesi uçları', en: 'The invoice, write-a-review, update-address and brand list endpoints' },
        tarayici: false, docker: true,
        neden: {
            tr: 'Bu uçlar yalnızca Docker yığınında var; tarayıcı katmanı bunu sessizce gizlemez, açıkça söyler.',
            en: 'These endpoints exist only on the Docker stack; the browser layer does not hide this silently, it says so.',
        },
    },
    {
        id: 'anahtarli-alan',
        is: { tr: 'Anahtarla korunan, cihazlar arası taşınabilen kendi veri alanı', en: 'Your own key-protected data area, portable across devices' },
        tarayici: false, docker: true,
        neden: {
            tr: 'Tarayıcı kipinde veri zaten yalnızca sana ait, o yüzden anahtar diye bir şey yok.',
            en: 'In browser mode the data is already yours alone, so there is no such thing as a key.',
        },
    },
]

// Kurulum rehberinin başındaki karar kutusu: rehberi açan kişi, KURMADAN önce
// kurup kurmaması gerektiğini öğrenmeli. "Rehberi açtıysa zaten karar vermiştir"
// varsayımı yanlış — çoğu kişi ne kazanacağını bilmeden buraya geliyor.
export const QA_SHOP_KURULUM_KARARI = {
    baslik: { tr: 'Docker\'a gerçekten ihtiyacın var mı?', en: 'Do you actually need Docker?' },
    giris: {
        tr: 'Dükkân, sen hiçbir şey kurmadan da çalışıyor. Aşağıdaki kurulum yalnızca belirli pratikler için gerekiyor — hangisini yapacağına göre karar ver.',
        en: 'The shop already works without you installing anything. The setup below is needed only for certain kinds of practice — decide based on what you are going to do.',
    },
    dallar: [
        {
            id: 'gerekmiyor',
            ikon: '🌐',
            durum: { tr: 'Gerekmiyor', en: 'Not needed' },
            kosul: { tr: 'Arayüz otomasyonu öğreniyorsan', en: 'If you are learning UI automation' },
            aciklama: {
                tr: 'Selenium, Playwright veya Cypress ile dükkânı sürmek, defect anahtarlarıyla testinin gerçekten bir şeye baktığını kanıtlamak — bunların hiçbiri kurulum istemiyor. Dükkâna dön ve yazmaya başla.',
                en: 'Driving the shop with Selenium, Playwright or Cypress, and proving with the defect switches that your test really checks something — none of this needs any setup. Go back to the shop and start writing.',
            },
        },
        {
            id: 'gerekiyor',
            ikon: '🐳',
            durum: { tr: 'Gerekiyor', en: 'Needed' },
            kosul: { tr: 'API testi veya veritabanı doğrulaması yapacaksan', en: 'If you are doing API testing or database validation' },
            aciklama: {
                tr: 'Postman, Newman ve REST Assured ile dışarıdan istek atmak, DBeaver ile tabloları görmek, doğrulama sorgularını SQL ile koşturmak. Bunlar sekmenin dışında bir sunucu ve gerçek bir veritabanı ister — aşağıdaki adımlarla devam et.',
                en: 'Sending requests from outside with Postman, Newman and REST Assured, seeing the tables in DBeaver, running the validation queries in SQL. These need a server outside the tab and a real database — continue with the steps below.',
            },
        },
    ],
}
