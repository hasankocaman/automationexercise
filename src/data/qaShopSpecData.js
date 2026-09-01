// src/data/qaShopSpecData.js
// QA Shop — Ürün Analizi ve User Story'ler (/qa-shop-spec)
//
// Bu dosya bir DERS içeriği değil, bir ÜRÜN ŞARTNAMESİdir: test yazacak
// kişinin "sistem nasıl davranmalı" sorusuna bakacağı yer.
//
// ⚠ BURADAKİ HER KABUL KRİTERİ CANLI YIĞINDA ÖLÇÜLDÜ (2026-08-17).
// Hiçbir HTTP kodu, hata kodu veya kupon kodu sözleşmeden TAHMİN EDİLMEDİ;
// hepsi çalışan sisteme istek atılarak doğrulandı. Bir kriteri değiştirirken
// aynı disiplini koru — burada yazan bir kod gerçekte farklıysa, test yazan
// kişi kendi testini haftalarca yanlış sanır.
//
// Ölçüm sırasında düzeltilen üç yanlış varsayım (tekrar düşülmesin diye):
//   1. Kupon kodları uydurulamaz — seed verideki gerçek 12 kod kullanılır.
//   2. Ürün listesi 100 kayıtta tavanlanır; "kaç ürün döndü" ile pasif ürün
//      filtresi ölçülemez, `total` alanına bakılır.
//   3. "İlk adres otomatik varsayılan" ancak TOHUM ADRESİ OLMAYAN bir
//      kullanıcıda ölçülebilir; demo hesabının zaten bir adresi var.

// ─── Sipariş yaşam döngüsü: durum makinesi verisi ───────────────────────────
// Diyagram bu veriden çizilir. İki yerde (metin + SVG) elle tutulsaydı biri
// değiştiğinde diğeri sessizce eskirdi.
const ORDER_STATES = [
    { id: 'placed', label: { tr: 'placed', en: 'placed' }, x: 60, y: 40, tone: 'sky' },
    { id: 'paid', label: { tr: 'paid', en: 'paid' }, x: 240, y: 40, tone: 'indigo' },
    { id: 'shipped', label: { tr: 'shipped', en: 'shipped' }, x: 420, y: 40, tone: 'violet' },
    { id: 'delivered', label: { tr: 'delivered', en: 'delivered' }, x: 600, y: 40, tone: 'emerald' },
    { id: 'returned', label: { tr: 'returned', en: 'returned' }, x: 600, y: 150, tone: 'amber' },
    { id: 'cancelled', label: { tr: 'cancelled', en: 'cancelled' }, x: 150, y: 150, tone: 'rose' },
]

const ORDER_TRANSITIONS = [
    { from: 'placed', to: 'paid', label: { tr: 'pay', en: 'pay' } },
    { from: 'paid', to: 'shipped', label: { tr: 'ship', en: 'ship' } },
    { from: 'shipped', to: 'delivered', label: { tr: 'deliver', en: 'deliver' } },
    { from: 'delivered', to: 'returned', label: { tr: 'return', en: 'return' } },
    { from: 'placed', to: 'cancelled', label: { tr: 'cancel', en: 'cancel' } },
    { from: 'paid', to: 'cancelled', label: { tr: 'cancel', en: 'cancel' } },
]

export const qaShopSpecData = {
    meta: {
        title: {
            tr: 'QA Shop — Ürün Analizi ve User Story\'ler',
            en: 'QA Shop — Product Analysis and User Stories',
        },
        subtitle: {
            tr: 'Test yazmadan önce okunacak belge. Sistem ne yapar, hangi kuralı garanti eder, hangi ihlalde hangi hatayı döndürür — ve senin yazacağın test case\'lerin çıkış noktası olan user story\'ler.',
            en: 'The document to read before writing tests. What the system does, which rules it guarantees, which error it returns on each violation — and the user stories your test cases start from.',
        },
        measuredNote: {
            tr: 'Buradaki kurallar ve veri modeli çalışan sisteme karşı doğrulandı — sözleşmeden tahmin edilmedi. Beklediğin sonucu ALMIYORSAN iki ihtimal var: ya kural sandığın gibi değil, ya da bu alanda açık bir defect var. Hangisi olduğunu ayırmak testin kendisidir.',
            en: 'The rules and the data model here were verified against a running system — not guessed from the contract. If you are NOT getting the result you expected there are two possibilities: either the rule is not what you assumed, or a defect is live in your area. Telling those apart is the test itself.',
        },
        statCards: [
            { icon: '🗄️', value: '18', label: { tr: 'veritabanı tablosu', en: 'database tables' }, tone: 'sky' },
            { icon: '🔌', value: '41', label: { tr: 'iş endpoint\'i', en: 'business endpoints' }, tone: 'indigo' },
            { icon: '🐞', value: '10', label: { tr: 'kontrollü defect', en: 'controlled defects' }, tone: 'rose' },
            { icon: '📋', value: '16', label: { tr: 'user story', en: 'user stories' }, tone: 'emerald' },
        ],

        // ─── BÜYÜK RESİM ────────────────────────────────────────────────────
        // Sayfanın ilk ekranı. Okuyucu detaya inmeden ÖNCE ne olduğunu, neden
        // farklı olduğunu ve beş dakikada ne yapabileceğini görmeli. Detay
        // bölümleri bundan SONRA gelir — merak uyandıktan sonra.
        bigPicture: {
            pitch: {
                tr: 'QA Shop, test pratiği yapman için kurulmuş ücretsiz bir e-ticaret sistemidir: gerçek bir PostgreSQL veritabanı, ona bağlı 41 endpoint\'li bir REST API ve ikisini kullanan bir dükkân arayüzü. Kendi makinende tek komutla ayağa kalkar, kayıt istemez, ve içindeki veri gerçektir — sepete eklediğin ürünün stoğu gerçekten düşer.',
                en: 'QA Shop is a free e-commerce system built for you to practice testing on: a real PostgreSQL database, a REST API with 41 endpoints on top of it, and a store interface that uses both. It comes up on your own machine with one command, needs no signup, and its data is real — the stock of an item you add to your cart genuinely decreases.',
            },
            // Animasyon veri akışını GÖSTERİR, süs değildir: paket arayüzden
            // çıkar, serviste iş kuralına çarpar, veritabanında satır yazar.
            flow: {
                title: { tr: 'Bir tıklama üç katmandan geçer', en: 'One click travels through three layers' },
                steps: [
                    {
                        key: 'UI', icon: '🖥️', tone: 'violet',
                        label: { tr: 'Arayüz', en: 'Interface' },
                        detail: {
                            tr: '"Sepete ekle" düğmesine basılır. Her etkileşimli öğe kararlı bir data-testid taşır.',
                            en: 'The "add to cart" button is pressed. Every interactive element carries a stable data-testid.',
                        },
                    },
                    {
                        key: 'API', icon: '🔌', tone: 'indigo',
                        label: { tr: 'Servis', en: 'Service' },
                        detail: {
                            tr: 'İstek iş kuralına çarpar: stok yetmiyorsa reddedilir, yetiyorsa rezervasyon yazılır.',
                            en: 'The request hits a business rule: if stock is short the request is rejected, otherwise a reservation is written.',
                        },
                    },
                    {
                        key: 'DB', icon: '🗄️', tone: 'sky',
                        label: { tr: 'Veritabanı', en: 'Database' },
                        detail: {
                            tr: 'Satır transaction içinde yazılır. DBeaver ile bağlanıp aynı satırı SQL ile görebilirsin.',
                            en: 'The row is written inside a transaction. You can connect with DBeaver and see that same row in SQL.',
                        },
                    },
                ],
                footnote: {
                    tr: 'Aynı hatayı üç katmanda üç farklı şekilde görürsün — ve çoğu zaman yalnızca birinde açıkça yakalanır. Test stratejisi kurmak tam olarak bunu bilmektir.',
                    en: 'You see the same bug three different ways across three layers — and often it is clearly caught in only one. Building a test strategy is exactly knowing which one.',
                },
            },
            comparison: {
                title: { tr: 'Sabit cevap döndüren deneme API\'lerinden farkı', en: 'How it differs from canned-response practice APIs' },
                intro: {
                    tr: 'İnternetteki ücretsiz test API\'lerinin çoğu sabit cevap döndürür. HTTP metotlarını, durum kodlarını ve JSON okumayı öğrenmek için iyidirler ve bu iş için hâlâ doğru araçtırlar. Ama bir iş kuralını orada test edemezsin: stok azalmaz, sipariş bir tabloya yazılmaz, iki kullanıcı birbirinin verisini göremez çünkü zaten veri yoktur.',
                    en: 'Most free testing APIs on the internet return canned responses. They are good for learning HTTP methods, status codes and reading JSON, and they remain the right tool for that. But you cannot test a business rule there: stock does not decrease, an order is never written to a table, and two users cannot see each other\'s data because there is no data.',
                },
                headers: {
                    tr: ['Ne sorabilirsin', 'Sabit cevaplı deneme API\'si', 'QA Shop'],
                    en: ['What you can ask', 'Canned-response practice API', 'QA Shop'],
                },
                rows: [
                    [
                        { tr: 'Yazdığım kayıt kalıcı mı?', en: 'Does the record I wrote persist?' },
                        { tr: 'Hayır — POST ettiğin kayıt bir daha bulunamaz', en: 'No — the record you POST cannot be found again' },
                        { tr: 'Evet, gerçek PostgreSQL, 18 tablo', en: 'Yes, a real PostgreSQL with 18 tables' },
                    ],
                    [
                        { tr: 'İş kuralı test edebilir miyim?', en: 'Can I test a business rule?' },
                        { tr: 'Hayır, kural yok', en: 'No, there are no rules' },
                        { tr: 'Stok rezervasyonu, kupon doğrulama, durum geçişleri', en: 'Stock reservation, coupon validation, state transitions' },
                    ],
                    [
                        { tr: 'Sonucu SQL ile doğrulayabilir miyim?', en: 'Can I verify the result with SQL?' },
                        { tr: 'Veritabanı yok', en: 'There is no database' },
                        { tr: 'DBeaver ile bağlan, hazır sorgu paketini çalıştır', en: 'Connect with DBeaver and run the ready query suite' },
                    ],
                    [
                        { tr: 'Testimin gerçekten baktığını kanıtlayabilir miyim?', en: 'Can I prove my test really checks something?' },
                        { tr: 'Yolu yok', en: 'There is no way to' },
                        { tr: '10 kontrollü defect: birini aç, testin kırmızıya dönmeli', en: '10 controlled defects: turn one on, your test must go red' },
                    ],
                    [
                        { tr: 'Verimi başkası bozar mı?', en: 'Can someone else corrupt my data?' },
                        { tr: 'Herkes aynı veriyi paylaşır', en: 'Everyone shares the same data' },
                        { tr: 'Kendi izole alanın, tek istekle sıfırlanır', en: 'Your own isolated area, reset with one request' },
                    ],
                    [
                        { tr: 'Arayüz otomasyonu yapabilir miyim?', en: 'Can I automate a user interface?' },
                        { tr: 'Arayüz yok', en: 'There is no interface' },
                        { tr: 'Kararlı test id taşıyan dükkân ekranı', en: 'A store screen carrying stable test ids' },
                    ],
                ],
            },
            quickStart: {
                title: { tr: 'Beş dakikada ilk isteğin', en: 'Your first request in five minutes' },
                steps: [
                    {
                        n: 1, icon: '🐳',
                        title: { tr: 'Stack\'i başlat', en: 'Start the stack' },
                        detail: { tr: 'Tek gereksinim Docker. Kurulum rehberi hiçbir şeyi kurulu varsaymaz.', en: 'The only requirement is Docker. The setup guide assumes nothing is installed.' },
                        code: 'docker compose up -d',
                    },
                    {
                        n: 2, icon: '💚',
                        title: { tr: 'Ayakta mı diye bak', en: 'Check that it is up' },
                        detail: { tr: 'Health endpoint\'i veritabanının da bağlı olduğunu söyler.', en: 'The health endpoint also tells you the database is connected.' },
                        code: 'curl http://localhost:4000/health',
                    },
                    {
                        n: 3, icon: '🔑',
                        title: { tr: 'Kendi veri alanını aç', en: 'Open your own data area' },
                        detail: { tr: 'Dönen anahtarı sonraki isteklere X-Sandbox-Key başlığıyla ekle.', en: 'Add the returned key to later requests with the X-Sandbox-Key header.' },
                        code: 'curl -X POST http://localhost:4000/api/v1/sandbox',
                    },
                    {
                        n: 4, icon: '📋',
                        title: { tr: 'Bir story seç, test case yaz', en: 'Pick a story, write a test case' },
                        detail: { tr: 'Aşağıdaki 16 user story\'den biriyle başla — kabul kriterleri hazır.', en: 'Start with one of the 16 user stories below — the acceptance criteria are ready.' },
                        code: null,
                    },
                ],
            },
        },
    },

    sections: [
        // ═══════════════════════════════════════════════════════════════════
        {
            id: 'urun',
            number: 1,
            icon: '🛒',
            title: { tr: 'Ürün ne yapar?', en: 'What does the product do?' },
            blocks: [
                {
                    type: 'why',
                    title: { tr: 'Neden gerçek bir ürün gibi yazıldı?', en: 'Why is it written like a real product?' },
                    content: {
                        tr: 'Çoğu test alıştırması sahte veri döndüren bir endpoint verir; orada stok düşmez, sipariş bir tabloya yazılmaz, iki kullanıcı birbirinin verisini göremez çünkü zaten veri yoktur. Böyle bir yerde yazdığın test geçer ama hiçbir şeyi kanıtlamaz. QA Shop bilerek tersini yapar: gerçek bir PostgreSQL, transaction içinde çalışan işlemler, gerçekten azalan stok. Bu yüzden burada yazdığın test, işyerinde yazacağın testin aynısıdır.',
                        en: 'Most testing exercises give you an endpoint that returns fake data; there, stock never drops, an order is never written to a table, and two users cannot see each other\'s data because there is no data. A test you write in such a place passes but proves nothing. QA Shop deliberately does the opposite: a real PostgreSQL, operations inside transactions, stock that genuinely decreases. That is why a test you write here is the same test you will write at work.',
                    },
                },
                {
                    type: 'text',
                    content: {
                        tr: 'QA Shop bir giyim e-ticaret sistemidir. Kullanıcı kayıt olur, giriş yapar, katalogda arama yapar, sepetine ürün ekler, kupon uygular, sipariş verir; sipariş ödenir, kargolanır, teslim edilir, gerektiğinde iade edilir. Yorum yazılır ama yayına girmesi için onay gerekir. Bunların hepsi tek bir veri modeli üzerinde çalışır.',
                        en: 'QA Shop is a clothing e-commerce system. A user registers, signs in, searches the catalog, adds items to a cart, applies a coupon and places an order; the order is paid, shipped, delivered and returned when needed. Reviews can be written but need approval to go live. All of this runs on a single data model.',
                    },
                },
                {
                    type: 'layerLegend',
                    title: { tr: 'Aynı davranışı üç katmanda test edebilirsin', en: 'You can test the same behavior at three layers' },
                    items: [
                        {
                            key: 'UI',
                            icon: '🖥️',
                            tone: 'violet',
                            label: { tr: 'Arayüz', en: 'Interface' },
                            what: {
                                tr: 'Dükkân ekranı. Her etkileşimli öğe kararlı bir data-testid taşır; Selenium, Playwright veya Cypress ile otomatikleştirilir.',
                                en: 'The shop screen. Every interactive element carries a stable data-testid; automate it with Selenium, Playwright or Cypress.',
                            },
                            catches: {
                                tr: 'Kullanıcının gerçekten görebildiği hatalar: yanlış toplam, kaybolan buton, yanlış mesaj.',
                                en: 'Bugs the user can actually see: a wrong total, a missing button, a wrong message.',
                            },
                        },
                        {
                            key: 'API',
                            icon: '🔌',
                            tone: 'indigo',
                            label: { tr: 'Servis', en: 'Service' },
                            what: {
                                tr: 'REST endpoint\'leri. Postman, Newman veya REST Assured ile; sözleşme OpenAPI olarak yayınlanıyor.',
                                en: 'REST endpoints. With Postman, Newman or REST Assured; the contract is published as OpenAPI.',
                            },
                            catches: {
                                tr: 'Arayüzün hiç göstermediği hatalar: yanlış HTTP kodu, eksik yetki kontrolü, yanlış hata gövdesi.',
                                en: 'Bugs the interface never shows: a wrong HTTP code, a missing authorization check, a wrong error body.',
                            },
                        },
                        {
                            key: 'DB',
                            icon: '🗄️',
                            tone: 'sky',
                            label: { tr: 'Veritabanı', en: 'Database' },
                            what: {
                                tr: 'PostgreSQL. DBeaver ile bağlanıp SQL yazılır; hazır doğrulama sorgu paketi de var.',
                                en: 'PostgreSQL. Connect with DBeaver and write SQL; a ready validation query suite is included too.',
                            },
                            catches: {
                                tr: 'Ne arayüzün ne servisin gösterebildiği hatalar: mutabakatsız tutar, tenant sızıntısı, yetim satır.',
                                en: 'Bugs neither the interface nor the service can show: an unreconciled amount, a tenant leak, an orphan row.',
                            },
                        },
                    ],
                },
                {
                    type: 'callout',
                    tone: 'insight',
                    title: { tr: 'Üç katmanı yan yana koymanın asıl dersi', en: 'The real lesson of putting three layers side by side' },
                    content: {
                        tr: 'Bir siparişin toplamı yanlış hesaplanıyorsa arayüz bunu doğru gösterebilir (aynı yanlış hesabı tekrarlar), servis başarı cevabı dönebilir, ama veritabanında satır toplamları genel toplamla tutmaz. Aynı defect üç katmanda üç farklı şekilde görünür — ve yalnızca birinde açıkça yakalanır. Hangi katmanın hangi hatayı gördüğünü bilmek, test stratejisi kurmanın kendisidir.',
                        en: 'If an order total is miscalculated, the interface may display it correctly (it repeats the same wrong math), the service may return a success response, but in the database the line totals will not reconcile with the grand total. The same defect appears three different ways across three layers — and is clearly caught in only one. Knowing which layer sees which bug is what building a test strategy actually is.',
                    },
                },
            ],
        },

        // ═══════════════════════════════════════════════════════════════════
        {
            id: 'veri-modeli',
            number: 2,
            icon: '🗺️',
            title: { tr: 'Veri modeli', en: 'Data model' },
            blocks: [
                {
                    type: 'why',
                    title: { tr: 'Veri modelini okumadan test yazılmaz', en: 'You cannot write tests without reading the data model' },
                    content: {
                        tr: 'Bir siparişin neden iki değil üç tabloya yazıldığını bilmeyen kişi, "sipariş oluştu" kontrolünü tek tabloya bakarak yazar ve satırları hiç kontrol etmez. O test, satırların yazılmadığı bir defect\'i yeşil geçer. Model bilgisi, kontrol edilecek yeri belirler.',
                        en: 'Someone who does not know why an order is written to three tables rather than two writes the "order created" check against a single table and never verifies the line items. That test passes green on a defect where the lines were never written. Knowing the model determines what to check.',
                    },
                },
                { type: 'entityMap' },
                {
                    type: 'table',
                    title: { tr: 'Seed verideki test seam noktaları', en: 'Test seams in the seed data' },
                    headers: { tr: ['Tablo', 'Adet', 'Bilerek konmuş seam'], en: ['Table', 'Count', 'Deliberate seam'] },
                    rows: [
                        [
                            { tr: 'products', en: 'products' },
                            '120',
                            { tr: '9 tanesi pasif (soft delete) — varsayılan listede görünmez, `total` 111 döner. 10 tanesinin markası NULL: LEFT JOIN yazmayan sorgu bu ürünleri kaybeder.', en: '9 are inactive (soft delete) — hidden from the default listing, `total` returns 111. 10 have a NULL brand: a query without LEFT JOIN loses those products.' },
                        ],
                        [
                            { tr: 'product_variants', en: 'product_variants' },
                            '360',
                            { tr: 'Her üründe beden/renk kırılımı. Fiyat üründe değil VARYANTTA — bedene göre değişiyor.', en: 'Size/color breakdown per product. Price lives on the VARIANT, not the product — it varies by size.' },
                        ],
                        [
                            { tr: 'inventory', en: 'inventory' },
                            '360',
                            { tr: '~21 varyant tükenmiş (satılabilir 0), bir kısmında son 1 adet kalmış — yarış koşulu senaryosu için.', en: '~21 variants are out of stock (0 available), some have a single unit left — for race-condition scenarios.' },
                        ],
                        [
                            { tr: 'users', en: 'users' },
                            '41',
                            { tr: '2 hesap pasif: girişleri reddedilmeli. Tüm seed hesapların parolası `Password123!`', en: '2 accounts are inactive: their sign-in must be rejected. All seed accounts use the password `Password123!`' },
                        ],
                        [
                            { tr: 'orders', en: 'orders' },
                            '150',
                            { tr: '6 farklı durumda, yaklaşık 6 aya yayılmış — tarih aralığı sorguları için gerçek veri.', en: 'Across 6 different statuses, spread over roughly 6 months — real data for date-range queries.' },
                        ],
                        [
                            { tr: 'order_items', en: 'order_items' },
                            '300',
                            { tr: 'Sipariş toplamları elle yazılmadı, satırlardan HESAPLANDI — yani seed veri kendi mutabakat kuralını ihlal etmiyor.', en: 'Order totals were not written by hand, they were COMPUTED from the lines — so the seed data does not violate its own reconciliation rule.' },
                        ],
                        [
                            { tr: 'coupons', en: 'coupons' },
                            '12',
                            { tr: '5 tanesi FARKLI nedenle geçersiz: süresi geçmiş, henüz başlamamış, limiti dolmuş, minimum tutar şartı var. Her biri ayrı hata kodu döndürür.', en: '5 are invalid for DIFFERENT reasons: expired, not yet started, usage limit reached, minimum-total requirement. Each returns a distinct error code.' },
                        ],
                        [
                            { tr: 'reviews', en: 'reviews' },
                            '200',
                            { tr: '~%30 onaysız. Ortalama puana YALNIZCA onaylılar girer; ortalamayı kendisi hesaplayan test bunu yakalar.', en: '~30% unapproved. ONLY approved ones count toward the average rating; a test that computes the average itself catches this.' },
                        ],
                        [
                            { tr: 'audit_log', en: 'audit_log' },
                            '300',
                            { tr: '~%8 ERROR seviyesinde, correlation zincirleriyle — kök neden analizi pratiği için.', en: '~8% at ERROR level, with correlation chains — for root-cause analysis practice.' },
                        ],
                    ],
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'Veri deterministic — ama id\'ler değil', en: 'The data is deterministic — but the ids are not' },
                    content: {
                        tr: 'Seed veride hiçbir yerde rastgelelik yok: aynı dosya her makinede aynı veriyi kurar, yani "bazen 12 satır dönüyor" diyen bir test yazılamaz. Ama satır kimlikleri (id) böyle değil: kendi veri alanını açtığında satırlar kopyalanır ve id\'ler kayar. Bu yüzden testinde id sabit yazılmaz, listeden okunur.',
                        en: 'There is no randomness anywhere in the seed data: the same file builds the same data on every machine, so you cannot write a test that says "sometimes 12 rows come back". Row ids are different, though: when you open your own data area the rows are copied and the ids shift. That is why your test must read ids from a listing instead of hardcoding them.',
                    },
                },
            ],
        },

        // ═══════════════════════════════════════════════════════════════════
        {
            id: 'yasam-dongusu',
            number: 3,
            icon: '🔄',
            title: { tr: 'Sipariş yaşam döngüsü', en: 'Order lifecycle' },
            blocks: [
                {
                    type: 'why',
                    title: { tr: 'Durum makineleri en verimli test alanıdır', en: 'State machines are the most productive test surface' },
                    content: {
                        tr: 'Altı durum ve altı izinli geçiş var. Geriye kalan her kombinasyon YASAK — ve yasak geçişler, geliştiricilerin en sık atladığı yerdir çünkü mutlu yol testleri onlara hiç uğramaz. "Ödenmemiş siparişi kargolamayı dene" gibi tek bir istek, günlerce fark edilmeyecek bir defect\'i anında ortaya çıkarır.',
                        en: 'There are six states and six allowed transitions. Every remaining combination is FORBIDDEN — and forbidden transitions are where developers slip most often, because happy-path tests never visit them. A single request like "try to ship an unpaid order" instantly surfaces a defect that would otherwise go unnoticed for days.',
                    },
                },
                { type: 'stateMachine', states: ORDER_STATES, transitions: ORDER_TRANSITIONS },
                {
                    type: 'table',
                    title: { tr: 'İzinli ve yasak geçişler', en: 'Allowed and forbidden transitions' },
                    headers: { tr: ['Geçiş', 'Durum', 'Envanter ve ödemeye etkisi'], en: ['Transition', 'Status', 'Effect on inventory and payment'] },
                    rows: [
                        [{ tr: '`placed` → `paid` (ödeme)', en: '`placed` → `paid` (payment)' }, { tr: '✔ İzinli', en: '✔ Allowed' }, { tr: 'Ödeme kaydı oluşur', en: 'A payment record is created' }],
                        [{ tr: 'Ödeme başarısız olursa', en: 'When the payment fails' }, { tr: '— (kural)', en: '— (rule)' }, { tr: 'Sipariş `placed` KALIR — başarısız ödeme durumu ilerletmez', en: 'The order STAYS `placed` — a failed payment does not advance the state' }],
                        [{ tr: 'Ödenmiş siparişi tekrar ödemek', en: 'Paying an order that is already paid' }, { tr: '✖ Yasak', en: '✖ Forbidden' }, { tr: 'İkinci bir ödeme kaydı OLUŞMAZ', en: 'No second payment record is created' }],
                        [{ tr: '`placed` → `shipped` (ödemeden kargo)', en: '`placed` → `shipped` (shipping before payment)' }, { tr: '✖ Yasak', en: '✖ Forbidden' }, { tr: 'Yok — en klasik iş kuralı ihlali', en: 'None — the most classic business rule violation' }],
                        [{ tr: 'Kargolanmış siparişi tekrar kargolamak', en: 'Shipping an order that already shipped' }, { tr: '✖ Yasak', en: '✖ Forbidden' }, { tr: 'Yok', en: 'None' }],
                        [{ tr: '`delivered` → `returned` (iade penceresi açıkken)', en: '`delivered` → `returned` (while the return window is open)' }, { tr: '✔ İzinli', en: '✔ Allowed' }, { tr: 'Stok GERİ YÜKLENİR, ödeme iade edilir', en: 'Stock IS RESTORED and the payment is refunded' }],
                        [{ tr: '`placed` → `cancelled`', en: '`placed` → `cancelled`' }, { tr: '✔ İzinli', en: '✔ Allowed' }, { tr: 'Rezervasyon serbest kalır, stok geri yüklenir', en: 'The reservation is released and stock is restored' }],
                        [{ tr: 'Kargolanmış siparişi iptal etmek', en: 'Cancelling an order that already shipped' }, { tr: '✖ Yasak', en: '✖ Forbidden' }, { tr: 'Yok — yolda olan ürün iptal edilemez, iade süreci gerekir', en: 'None — an item in transit cannot be cancelled; the return flow is required' }],
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════════════════════
        {
            id: 'kurallar',
            number: 4,
            icon: '⚖️',
            title: { tr: 'Test edilebilir iş kuralları', en: 'Testable business rules' },
            blocks: [
                {
                    type: 'why',
                    title: { tr: 'Her kuralın yanında onu kıran anahtar var', en: 'Each rule comes with the flag that breaks it' },
                    content: {
                        tr: 'Bir kontrolün gerçekten baktığını görmenin tek yolu, kuralı bilerek bozup kontrolün kırmızıya döndüğünü görmektir. Çünkü her zaman yeşil kalan bir kontrol ile hiçbir şeye bakmayan bozuk bir kontrol, rapor ekranında birbirinin aynısıdır. Aşağıdaki her kuralın yanında, o kuralı ihlal eden bir anahtar yazıyor: aç, testini koştur, kırmızıya döndüğünü gör, kapat.',
                        en: 'The only way to see that a check really looks at something is to break the rule on purpose and watch the check turn red. Because a check that always stays green and a broken check that looks at nothing are identical on a report screen. Next to each rule below is a flag that violates it: turn it on, run your test, watch it go red, turn it off.',
                    },
                },
                {
                    type: 'ruleCard',
                    tone: 'sky',
                    id: 'K1',
                    title: { tr: 'Sepete ekleme stoğu REZERVE eder, düşürmez', en: 'Adding to a cart RESERVES stock, it does not decrement it' },
                    rule: {
                        tr: 'Sepete 2 adet eklediğinde `stock_qty` değişmez, `reserved_qty` 2 artar, `available` (stok − rezerve) 2 azalır. Stok ancak SİPARİŞ verildiğinde gerçekten düşer ve rezervasyon serbest kalır.',
                        en: 'When you add 2 units to a cart, `stock_qty` does not change, `reserved_qty` increases by 2, and `available` (stock − reserved) decreases by 2. Stock only truly drops when the ORDER is placed, and the reservation is released.',
                    },
                    verify: {
                        tr: 'Eklemeden önce ve sonra varyantı oku, üç alanı karşılaştır. Ölçülen: stok 35 → 35, rezerve 0 → 2, satılabilir 35 → 33. Sipariş sonrası: stok 35 → 32, rezerve 2 → 0.',
                        en: 'Read the variant before and after adding, compare all three fields. Measured: stock 35 → 35, reserved 0 → 2, available 35 → 33. After the order: stock 35 → 32, reserved 2 → 0.',
                    },
                    breaks: ['skip_reserve', 'oversell'],
                    layers: ['API', 'DB'],
                },
                {
                    type: 'ruleCard',
                    tone: 'rose',
                    id: 'K2',
                    title: { tr: 'Kupon CHECKOUT anında yeniden doğrulanır', en: 'A coupon is REVALIDATED at checkout' },
                    rule: {
                        tr: 'Sepete uygulanan kupon, sipariş verilirken bir kez daha kontrol edilir. Aradan geçen sürede koşullar bozulduysa (sepet minimum tutarın altına düştü, kuponun süresi bitti) sipariş REDDEDİLİR.',
                        en: 'A coupon applied to the cart is checked once more when the order is placed. If conditions have since broken (the cart fell below the minimum, the coupon expired) the order is REJECTED.',
                    },
                    verify: {
                        tr: 'Ölçülen ve çok öğretici: 458,97 TL\'lik sepete `SAVE50` (minimum 300) uygulandı → 200, indirim 50. Sonra miktar düşürülerek sepet 152,99\'a indirildi — SEPET HÂLÂ 50 TL İNDİRİM GÖSTERİYOR. Sipariş verilince `422 COUPON_MIN_TOTAL_NOT_MET`. Yani arayüzdeki tutar yanlış, checkout doğru. Sadece arayüze bakan bir test bu kuralı hiç görmez.',
                        en: 'Measured, and highly instructive: `SAVE50` (minimum 300) was applied to a cart of 458.97 → 200, discount 50. Then the quantity was lowered, bringing the cart to 152.99 — THE CART STILL SHOWS A 50 DISCOUNT. Placing the order returns `422 COUPON_MIN_TOTAL_NOT_MET`. So the interface amount is wrong and checkout is right. A test that only looks at the interface never sees this rule.',
                    },
                    breaks: ['ignore_coupon_expiry'],
                    layers: ['UI', 'API'],
                },
                {
                    type: 'ruleCard',
                    tone: 'indigo',
                    id: 'K3',
                    title: { tr: 'Tutar mutabakatı: genel = ara − indirim + kargo', en: 'Amount reconciliation: grand = subtotal − discount + shipping' },
                    rule: {
                        tr: 'Her sipariş ve her fatura bu eşitliği sağlamak zorundadır. Ayrıca satır toplamları (`line_total`) ara toplamı vermelidir ve `line_total` = birim fiyat × adet olmalıdır.',
                        en: 'Every order and every invoice must satisfy this equation. In addition, the line totals (`line_total`) must add up to the subtotal, and `line_total` must equal unit price × quantity.',
                    },
                    verify: {
                        tr: 'Fatura endpoint\'indeki `reconciled` alanı mutabakatı beyan eder ama ona GÜVENME — kendin hesapla. Ölçülen: 458,97 − 45,90 + 29,90 = 442,97 ve `reconciled: true`. Veritabanı tarafında aynı kontrolü SQL ile yazmak, arayüzün asla gösteremeyeceği bir hata sınıfını yakalar.',
                        en: 'The `reconciled` field on the invoice endpoint declares reconciliation, but do NOT trust it — compute it yourself. Measured: 458.97 − 45.90 + 29.90 = 442.97 with `reconciled: true`. Writing the same check in SQL on the database side catches a class of bug the interface can never show.',
                    },
                    breaks: ['discount_twice', 'wrong_line_total'],
                    layers: ['API', 'DB'],
                },
                {
                    type: 'ruleCard',
                    tone: 'violet',
                    id: 'K4',
                    title: { tr: 'Çıkış yapmak oturumu GERÇEKTEN iptal eder', en: 'Signing out GENUINELY revokes the session' },
                    rule: {
                        tr: 'Token durum tutmayan (stateless) bir JWT olsaydı, `logout` sahte bir başarı cevabı döner ve token süresi bitene kadar çalışmaya devam ederdi. Burada oturum veritabanında iptal ediliyor.',
                        en: 'If the token were a stateless JWT, `logout` would return a fake success response and the token would keep working until it expired. Here the session is revoked in the database.',
                    },
                    verify: {
                        tr: 'Ölçülen: `logout` → 204; ardından AYNI token ile `/auth/me` → 401. Kritik nokta şu: yalnızca "logout 204 döndü mü" diye bakan bir test, iptal hiç çalışmasa da yeşil geçer. Testin çıkıştan SONRA token\'ı tekrar kullanması gerekir.',
                        en: 'Measured: `logout` → 204; then `/auth/me` with the SAME token → 401. The critical point: a test that only checks "did logout return 204" passes green even if revocation never happens. Your test must reuse the token AFTER signing out.',
                    },
                    breaks: [],
                    layers: ['API'],
                },
                {
                    type: 'ruleCard',
                    tone: 'amber',
                    id: 'K5',
                    title: { tr: 'Yorum `pending` doğar; kaydedilmiş olmak yayınlanmış olmak değildir', en: 'A review is born `pending`; being saved is not the same as being published' },
                    rule: {
                        tr: 'Yorum eklendiğinde kaydedilir ama durumu `pending` olur. Ürün ortalamasına YALNIZCA onaylanmış yorumlar girer; onay bekleyen bir yorum ortalamayı değiştirmez.',
                        en: 'When a review is added it is saved, but its status is `pending`. ONLY approved reviews count toward the product average; a pending review does not change it.',
                    },
                    verify: {
                        tr: 'Ölçülen: 1 puanlı yorum eklendi → 201, `status: pending`. Ortalama önce ve sonra AYNI kaldı, cevaptaki `basis` alanı `approved` diyor. Onaylı liste 1, bekleyen liste 1 kayıt döndürüyor — yani iki liste ayrı.',
                        en: 'Measured: a 1-star review was added → 201, `status: pending`. The average stayed the SAME before and after, and the `basis` field in the response says `approved`. The approved list returns 1 record and the pending list returns 1 — the two lists are separate.',
                    },
                    breaks: ['pending_reviews_in_average'],
                    layers: ['API', 'DB'],
                },
                {
                    type: 'ruleCard',
                    tone: 'emerald',
                    id: 'K6',
                    title: { tr: 'Kimse başkasının siparişini göremez', en: 'Nobody can see someone else\'s order' },
                    rule: {
                        tr: 'Sipariş listesi her zaman istek atan kullanıcıya göre filtrelenir. Başka bir kullanıcının siparişini id ile doğrudan çağırmak yasaktır.',
                        en: 'The order list is always filtered by the requesting user. Fetching another user\'s order directly by id is forbidden.',
                    },
                    verify: {
                        tr: 'Ölçülen: B kullanıcısı A\'nın sipariş id\'sini çağırdı → `403 FORBIDDEN`. B\'nin kendi listesi 0 kayıt döndü. Dikkat: 404 yerine 403 dönmesi bilinçli bir tercih — bu ayrımı test ederken beklediğin kodu sabitle.',
                        en: 'Measured: user B requested A\'s order id → `403 FORBIDDEN`. B\'s own list returned 0 records. Note: returning 403 rather than 404 is a deliberate choice — pin the expected code when you test this distinction.',
                    },
                    breaks: ['leak_other_users_orders'],
                    layers: ['API', 'DB'],
                },
                {
                    type: 'ruleCard',
                    tone: 'sky',
                    id: 'K7',
                    title: { tr: 'Varsayılan adres her zaman tek ve her zaman vardır', en: 'The default address is always exactly one, and always exists' },
                    rule: {
                        tr: 'İlk eklenen adres otomatik varsayılan olur. `isDefault: true` ile eklenen yeni adres, eskisinin varsayılanlığını DÜŞÜRÜR. Varsayılan adres silinirse kalanlardan biri varsayılan olur — yani kullanıcı hiçbir zaman varsayılansız kalmaz.',
                        en: 'The first address added automatically becomes the default. A new address added with `isDefault: true` DEMOTES the previous one. If the default address is deleted, one of the remaining ones becomes default — so the user is never left without one.',
                    },
                    verify: {
                        tr: 'Bu kural ancak TOHUM ADRESİ OLMAYAN yeni bir kullanıcıda ölçülebilir; demo hesabının zaten bir adresi var ve "ilk adres" testi orada yanlış sonuç verir. Yeni hesapla ölçülen: 1. adres `is_default: true`, 2. adres `false`, `isDefault: true` ile eklenen 3. adres `true` olurken diğerleri düştü. Varsayılan silindiğinde kalanlardan biri varsayılan oldu ve listede başa geçti.',
                        en: 'This rule can only be measured with a new user who has NO seed address; the demo account already has one and an "first address" test gives a wrong result there. Measured with a fresh account: address 1 `is_default: true`, address 2 `false`, address 3 added with `isDefault: true` became `true` while the others were demoted. When the default was deleted, one of the remaining became default and moved to the top of the list.',
                    },
                    breaks: [],
                    layers: ['API', 'DB'],
                },
            ],
        },

        // ═══════════════════════════════════════════════════════════════════
        {
            id: 'hata-katalogu',
            number: 5,
            icon: '🚨',
            title: { tr: 'Hata sözlüğü', en: 'Error glossary' },
            blocks: [
                {
                    type: 'why',
                    title: { tr: '"Hata döndü" bir doğrulama değildir', en: '"An error was returned" is not an assertion' },
                    content: {
                        tr: 'Bir testin "4xx aldım, demek ki doğru çalışıyor" demesi, kuponun süresi bittiği için mi yoksa kupon hiç bulunamadığı için mi reddedildiğini ayırt etmez. İkisi aynı HTTP kodunu döndürebilir ama bambaşka iki defect\'i gösterir. Bu yüzden testin HTTP kodunu değil, gövdedeki hata KODUNU doğrulaması gerekir.',
                        en: 'A test that says "I got a 4xx, so it works" cannot tell whether the coupon was rejected because it expired or because it was never found. Both can return the same HTTP code but point to two entirely different defects. That is why your test must assert the error CODE in the body, not the HTTP status.',
                    },
                },
                {
                    type: 'table',
                    title: { tr: 'Hata kodu sözlüğü', en: 'Error code glossary' },
                    headers: { tr: ['Hata kodu', 'Ne anlama gelir'], en: ['Error code', 'What it means'] },
                    rows: [
                        ['`WEAK_PASSWORD`', { tr: 'Parola, sistemin parola politikasını karşılamıyor.', en: 'The password does not meet the system\u2019s password policy.' }],
                        ['`EMAIL_ALREADY_EXISTS`', { tr: 'Bu e-posta ile bir hesap zaten var. Karşılaştırma harf duyarsızdır.', en: 'An account with this email already exists. The comparison is case-insensitive.' }],
                        ['`UNAUTHORIZED`', { tr: 'Kimlik doğrulanamadı: bilgiler hatalı, oturum yok ya da oturum artık geçerli değil.', en: 'Identity could not be established: wrong credentials, no session, or a session that is no longer valid.' }],
                        ['`FORBIDDEN`', { tr: 'Kimlik doğru ama bu kaynağa erişim yetkisi yok.', en: 'The identity is valid but has no right to this resource.' }],
                        ['`BAD_REQUEST`', { tr: 'İstek biçimsel olarak eksik ya da hatalı.', en: 'The request is malformed or incomplete.' }],
                        ['`NOT_FOUND`', { tr: 'İstenen kayıt yok — ya hiç olmadı ya da artık erişilebilir değil.', en: 'The requested record does not exist — either it never did, or it is no longer reachable.' }],
                        ['`OUT_OF_STOCK`', { tr: 'İstenen adet, satılabilir adedi (stok eksi rezerve) aşıyor.', en: 'The requested quantity exceeds the sellable quantity (stock minus reserved).' }],
                        ['`INVALID_QTY`', { tr: 'Adet, izin verilen aralığın dışında.', en: 'The quantity is outside the permitted range.' }],
                        ['`COUPON_NOT_FOUND`', { tr: 'Böyle bir kupon kodu tanımlı değil.', en: 'No coupon is defined with that code.' }],
                        ['`COUPON_EXPIRED`', { tr: 'Kuponun geçerlilik süresi dolmuş.', en: 'The coupon\u2019s validity period has ended.' }],
                        ['`COUPON_NOT_STARTED`', { tr: 'Kuponun geçerlilik süresi henüz başlamamış.', en: 'The coupon\u2019s validity period has not started yet.' }],
                        ['`COUPON_USAGE_LIMIT_REACHED`', { tr: 'Kupon, tanımlı kullanım sayısına ulaşmış.', en: 'The coupon has reached its defined usage count.' }],
                        ['`COUPON_MIN_TOTAL_NOT_MET`', { tr: 'Sepet tutarı, kuponun istediği alt sınırın altında.', en: 'The cart total is below the minimum the coupon requires.' }],
                        ['`EMPTY_CART`', { tr: 'Sepette hiç satır yok.', en: 'The cart has no lines.' }],
                        ['`CART_NOT_OPEN`', { tr: 'Sepet artık açık değil — üzerinden sipariş verilmiş ya da kapatılmış.', en: 'The cart is no longer open — an order was placed from it, or it was closed.' }],
                        ['`ALREADY_PAID`', { tr: 'Sipariş zaten ödenmiş.', en: 'The order has already been paid.' }],
                        ['`INVALID_TRANSITION`', { tr: 'İstenen durum geçişi, sipariş yaşam döngüsünde izinli değil.', en: 'The requested state transition is not allowed in the order lifecycle.' }],
                        ['`EMPTY_PATCH`', { tr: 'Güncelleme isteği hiçbir alan taşımıyor.', en: 'The update request carries no fields.' }],
                        ['`UNKNOWN_BUG_FLAG`', { tr: 'Gönderilen defect anahtarı tanımlı değil.', en: 'The defect flag that was sent is not defined.' }],
                    ],
                },
                {
                    type: 'callout',
                    tone: 'warning',
                    title: { tr: 'Sessizce başarılı olan iki davranış', en: 'Two behaviors that succeed silently' },
                    content: {
                        tr: 'Bu sistemde her sınır ihlali bir hataya dönüşmez. Ürün listelemesinde sayfa boyutunun bir ÜST SINIRI vardır ve sınırın üstündeki istek reddedilmez — sonuç tavanlanır. Geçersiz sayfa numarası da benzer şekilde ele alınır. İkisi de bilinçli tasarım kararıdır; sınırın kaç olduğu ve isteğin nasıl karşılandığı API sözleşmesinde parametrenin kendi kısıtı olarak yazılı.',
                        en: 'In this system not every boundary violation turns into an error. The product listing has an UPPER LIMIT on page size, and a request above it is not rejected — the result is capped. An invalid page number is handled similarly. Both are deliberate design decisions; what the limit is and how the request is handled is written in the API contract as the parameter\'s own constraint.',
                    },
                },
            ],
        },

        // ═══════════════════════════════════════════════════════════════════
        {
            id: 'user-stories',
            number: 6,
            icon: '📋',
            title: { tr: 'User story\'ler — test case\'lerini buradan yaz', en: 'User stories — write your test cases from here' },
            blocks: [

                // ─── Kimlik ───────────────────────────────────────────────
                {
                    type: 'userStory',
                    id: 'US-01',
                    difficulty: 'basic',
                    layers: ['UI', 'API'],
                    theme: { tr: 'Kimlik', en: 'Identity' },
                    title: { tr: 'Yeni müşteri hesap açar', en: 'A new customer creates an account' },
                    story: {
                        tr: 'Alışveriş yapmak isteyen bir ziyaretçi olarak, e-posta ve parolamla hesap açmak istiyorum; böylece sepetim ve siparişlerim bana ait olur.',
                        en: 'As a visitor who wants to shop, I want to create an account with my email and password, so that my cart and orders belong to me.',
                    },
                    acceptance: [
                        { tr: "Geçerli bir e-posta ve güçlü bir parolayla hesap açılabilir.", en: "An account can be created with a valid email and a strong password." },
                        { tr: "Politikayı karşılamayan bir parola kabul edilmez.", en: "A password that does not meet the policy is rejected." },
                        { tr: "Aynı e-posta ile ikinci bir hesap açılamaz.", en: "A second account cannot be created with the same email." },
                        { tr: "E-postanın büyük/küçük harf yazımı farklı olsa da aynı e-posta sayılır.", en: "An email counts as the same even when its letter case differs." },
                    ],
                    criteria: [
                        { tr: 'Given geçerli bir e-posta ve güçlü bir parola\nWhen kayıt isteği gönderilir\nThen 201 döner ve hesap oluşur', en: 'Given a valid email and a strong password\nWhen the registration request is sent\nThen 201 is returned and the account is created' },
                        { tr: 'Given parola politikayı karşılamıyor (örneğin "123")\nWhen kayıt isteği gönderilir\nThen 422 ve WEAK_PASSWORD döner', en: 'Given the password does not meet the policy (for example "123")\nWhen the registration request is sent\nThen 422 and WEAK_PASSWORD are returned' },
                        { tr: 'Given e-posta sistemde zaten kayıtlı\nWhen aynı e-posta ile kayıt denenir\nThen 409 ve EMAIL_ALREADY_EXISTS döner', en: 'Given the email is already registered\nWhen registration is attempted with the same email\nThen 409 and EMAIL_ALREADY_EXISTS are returned' },
                        { tr: 'Given e-posta yalnızca büyük-küçük harf farkıyla aynı\nWhen kayıt denenir\nThen yine 409 döner - karşılaştırma harf duyarsız olmalıdır', en: 'Given the email differs only by letter case\nWhen registration is attempted\nThen 409 is still returned - the comparison must be case-insensitive' },
                    ],
                    endpoints: ['POST /auth/register'],
                    breaks: ['weak_password_accepted'],
                    hint: {
                        tr: 'Harf duyarsızlık kriterini atlamak çok kolay ve gerçek hayatta en sık kaçan mükerrer kayıt nedeni budur. Testine `Ayse@x.com` ve `ayse@x.com` çiftini ekle.',
                        en: 'The case-insensitivity criterion is easy to skip, and it is the most common cause of duplicate accounts in real life. Add the pair `Ayse@x.com` and `ayse@x.com` to your test.',
                    },
                },
                {
                    type: 'userStory',
                    id: 'US-02',
                    difficulty: 'basic',
                    layers: ['UI', 'API'],
                    theme: { tr: 'Kimlik', en: 'Identity' },
                    title: { tr: 'Müşteri giriş yapar ve çıkar', en: 'A customer signs in and out' },
                    story: {
                        tr: 'Kayıtlı bir müşteri olarak giriş yapmak ve işim bitince güvenle çıkmak istiyorum; böylece oturumum başkasının eline geçmez.',
                        en: 'As a registered customer, I want to sign in and sign out safely when I am done, so that my session cannot be taken over by someone else.',
                    },
                    acceptance: [
                        { tr: "Doğru e-posta ve parolayla giriş yapılabilir.", en: "Signing in works with the correct email and password." },
                        { tr: "Parola yanlışsa giriş yapılamaz.", en: "Signing in fails when the password is wrong." },
                        { tr: "Pasif bir hesapla giriş yapılamaz.", en: "An inactive account cannot sign in." },
                        { tr: "Çıkış yapıldıktan sonra o oturum bir daha kullanılamaz.", en: "Once signed out, that session can no longer be used." },
                    ],
                    criteria: [
                        { tr: 'Given doğru e-posta ve parola\nWhen giriş yapılır\nThen 200 döner ve bir token verilir', en: 'Given the correct email and password\nWhen signing in\nThen 200 is returned and a token is issued' },
                        { tr: 'Given parola hatalı\nWhen giriş denenir\nThen 401 ve UNAUTHORIZED döner', en: 'Given the password is wrong\nWhen signing in is attempted\nThen 401 and UNAUTHORIZED are returned' },
                        { tr: 'Given hesap pasif durumda\nWhen doğru parolayla giriş denenir\nThen giriş reddedilir', en: 'Given the account is inactive\nWhen signing in with the correct password is attempted\nThen the sign-in is rejected' },
                        { tr: 'Given geçerli bir oturum açık\nWhen çıkış yapılır ve AYNI token ile korumalı bir endpoint çağrılır\nThen 401 döner - token gerçekten iptal edilmiş olmalıdır', en: 'Given a valid session is open\nWhen signing out and then calling a protected endpoint with the SAME token\nThen 401 is returned - the token must be genuinely revoked' },
                    ],
                    endpoints: ['POST /auth/login', 'POST /auth/logout', 'GET /auth/me'],
                    breaks: [],
                    hint: {
                        tr: 'Dördüncü kriter bu story\'nin bütün değeri. "Çıkış 204 döndü" kontrolü, iptal hiç çalışmasa bile yeşil geçer — token\'ı çıkıştan sonra tekrar kullanmayan bir test bu kurala bakmıyor demektir.',
                        en: 'The fourth criterion is the whole value of this story. A "sign-out returned 204" check passes green even if revocation never happens — a test that does not reuse the token after signing out is not looking at this rule.',
                    },
                },

                // ─── Katalog ──────────────────────────────────────────────
                {
                    type: 'userStory',
                    id: 'US-03',
                    difficulty: 'basic',
                    layers: ['UI', 'API', 'DB'],
                    theme: { tr: 'Katalog', en: 'Catalog' },
                    title: { tr: 'Müşteri katalogu gezer, satıştan kalkan ürünü görmez', en: 'A customer browses the catalog and does not see withdrawn products' },
                    story: {
                        tr: 'Alışveriş yapan bir müşteri olarak yalnızca satışta olan ürünleri görmek istiyorum; böylece satın alamayacağım bir ürüne zaman harcamam.',
                        en: 'As a shopping customer, I want to see only products that are on sale, so that I do not waste time on something I cannot buy.',
                    },
                    acceptance: [
                        { tr: "Satıştan kalkmış ürünler katalogda görünmez.", en: "Products withdrawn from sale do not appear in the catalog." },
                        { tr: "İstenirse satıştan kalkmış ürünler de listelenebilir.", en: "Withdrawn products can be listed on request." },
                        { tr: "Satıştan kalkmış bir ürünün sayfası açılamaz.", en: "The page of a withdrawn product cannot be opened." },
                        { tr: "Tek bir listede dönen ürün sayısının bir üst sınırı vardır.", en: "There is an upper limit on how many products a single listing returns." },
                    ],
                    criteria: [
                        { tr: 'Given katalogda 120 ürün var ve 9 tanesi pasif\nWhen ürün listesi varsayılan ayarla çağrılır\nThen total alanı 111 döner - pasif ürünler gizlenir', en: 'Given the catalog has 120 products and 9 of them are inactive\nWhen the product list is requested with default settings\nThen the total field returns 111 - inactive products are hidden' },
                        { tr: 'Given includeInactive parametresi true verilir\nWhen liste çağrılır\nThen total 120 döner', en: 'Given the includeInactive parameter is set to true\nWhen the list is requested\nThen total returns 120' },
                        { tr: 'Given pasif bir ürünün id değeri bilinir\nWhen o ürün doğrudan çağrılır\nThen 404 döner', en: 'Given the id of an inactive product is known\nWhen that product is requested directly\nThen 404 is returned' },
                        { tr: 'Given sayfa boyutu 100 değerinin üzerinde istenir\nWhen liste çağrılır\nThen hata DEĞİL 200 döner ve en fazla 100 kayıt gelir', en: 'Given a page size above 100 is requested\nWhen the list is requested\nThen 200 is returned rather than an error, and at most 100 records come back' },
                    ],
                    endpoints: ['GET /products', 'GET /products/{id}'],
                    breaks: [],
                    hint: {
                        tr: 'Kaç ürün döndüğüne değil `total` alanına bak: sayfa boyutu 100\'de tavanlandığı için "kaç kayıt geldi" ile pasif filtresini ölçemezsin. Bu tuzağa ölçüm sırasında ben de düştüm.',
                        en: 'Look at the `total` field rather than how many products came back: because the page size caps at 100, you cannot measure the inactive filter by counting records. I fell into this trap during measurement too.',
                    },
                },
                {
                    type: 'userStory',
                    id: 'US-04',
                    difficulty: 'basic',
                    layers: ['UI', 'API'],
                    theme: { tr: 'Katalog', en: 'Catalog' },
                    title: { tr: 'Müşteri ürün arar', en: 'A customer searches for a product' },
                    story: {
                        tr: 'Aradığını bilen bir müşteri olarak ürün adıyla arama yapmak istiyorum; böylece katalogu tek tek gezmem gerekmez.',
                        en: 'As a customer who knows what they want, I want to search by product name, so that I do not have to browse the whole catalog.',
                    },
                    acceptance: [
                        { tr: "Arama, terimle eşleşen ürünleri getirir.", en: "Search returns the products matching the term." },
                        { tr: "Çok kısa bir arama terimi kabul edilmez.", en: "A search term that is too short is not accepted." },
                        { tr: "Hiçbir ürün eşleşmezse sonuç listesi boş gelir; bu bir hata değildir.", en: "When nothing matches, the result list comes back empty — that is not an error." },
                    ],
                    criteria: [
                        { tr: 'Given en az 2 karakterlik bir arama terimi\nWhen arama yapılır\nThen 200 döner ve eşleşen ürünler listelenir', en: 'Given a search term of at least 2 characters\nWhen the search runs\nThen 200 is returned and matching products are listed' },
                        { tr: 'Given arama terimi 2 karakterden kısa\nWhen arama yapılır\nThen 400 ve BAD_REQUEST döner', en: 'Given the search term is shorter than 2 characters\nWhen the search runs\nThen 400 and BAD_REQUEST are returned' },
                        { tr: 'Given hiçbir ürünle eşleşmeyen bir terim\nWhen arama yapılır\nThen 200 ve BOŞ liste döner - boş sonuç bir hata değildir', en: 'Given a term that matches no product\nWhen the search runs\nThen 200 and an EMPTY list are returned - an empty result is not an error' },
                    ],
                    endpoints: ['GET /search'],
                    breaks: [],
                    hint: {
                        tr: 'Üçüncü kriter sık atlanır: "sonuç bulunamadı" bir hata değildir. 404 bekleyen test, doğru çalışan sistemde kırmızı olur.',
                        en: 'The third criterion is often skipped: "no results" is not an error. A test expecting 404 will fail against a correctly working system.',
                    },
                },

                // ─── Sepet ────────────────────────────────────────────────
                {
                    type: 'userStory',
                    id: 'US-05',
                    difficulty: 'intermediate',
                    layers: ['UI', 'API', 'DB'],
                    theme: { tr: 'Sepet', en: 'Cart' },
                    title: { tr: 'Müşteri sepete ürün ekler, stok rezerve edilir', en: 'A customer adds an item and stock is reserved' },
                    story: {
                        tr: 'Sepetine ürün koyan bir müşteri olarak, ödeme adımına gelene kadar o ürünün bana ayrılmasını istiyorum; böylece son adımda "tükendi" cevabı almam.',
                        en: 'As a customer putting an item in the cart, I want it held for me until I reach checkout, so that I do not get an "out of stock" answer at the last step.',
                    },
                    acceptance: [
                        { tr: "Satılabilir adet yettiği sürece ürün sepete eklenebilir.", en: "A product can be added to the cart as long as the sellable quantity allows." },
                        { tr: "Sepette duran ürün başkasına satılamaz; satılabilir adet o kadar azalır.", en: "What sits in a cart cannot be sold to someone else; the sellable quantity drops by that much." },
                        { tr: "Satılabilir adetten fazlası sepete eklenemez.", en: "More than the sellable quantity cannot be added to the cart." },
                        { tr: "Olmayan bir ürün sepete eklenemez.", en: "A product that does not exist cannot be added to the cart." },
                        { tr: "Sepetten çıkarılan ürün yeniden satılabilir hâle gelir.", en: "A product removed from the cart becomes sellable again." },
                    ],
                    criteria: [
                        { tr: 'Given satılabilir adedi 2 adetten fazla bir varyant\nWhen sepete 2 adet eklenir\nThen 201 döner, stock_qty DEĞİŞMEZ, reserved_qty 2 artar, available 2 azalır', en: 'Given a variant with more than 2 units available\nWhen 2 units are added to the cart\nThen 201 is returned, stock_qty does NOT change, reserved_qty increases by 2, available decreases by 2' },
                        { tr: 'Given satılabilir adetten fazlası istenir\nWhen sepete eklenir\nThen 409 ve OUT_OF_STOCK döner', en: 'Given more than the available quantity is requested\nWhen it is added to the cart\nThen 409 and OUT_OF_STOCK are returned' },
                        { tr: 'Given olmayan bir varyant id değeri\nWhen sepete eklenir\nThen 404 ve NOT_FOUND döner', en: 'Given a non-existent variant id\nWhen it is added to the cart\nThen 404 and NOT_FOUND are returned' },
                        { tr: 'Given sepette bir satır var\nWhen satır silinir\nThen 204 döner ve rezervasyon serbest kalır', en: 'Given the cart has a line\nWhen the line is deleted\nThen 204 is returned and the reservation is released' },
                    ],
                    endpoints: ['POST /carts', 'POST /carts/{id}/items', 'DELETE /carts/{id}/items/{itemId}'],
                    breaks: ['skip_reserve', 'oversell'],
                    hint: {
                        tr: 'Birinci kriterin üç alanı ayrı ayrı doğrulanmalı. Yalnızca `available` düştü mü diye bakan test, stoğun yanlışlıkla düşürüldüğü (rezerve yerine) bir defect\'i fark etmez.',
                        en: 'The three fields in the first criterion must be asserted separately. A test that only checks whether `available` dropped will not notice a defect where stock was decremented instead of reserved.',
                    },
                },
                {
                    type: 'userStory',
                    id: 'US-06',
                    difficulty: 'basic',
                    layers: ['UI', 'API'],
                    theme: { tr: 'Sepet', en: 'Cart' },
                    title: { tr: 'Müşteri sepetteki adedi değiştirir', en: 'A customer changes a quantity in the cart' },
                    story: {
                        tr: 'Kararını değiştiren bir müşteri olarak sepetteki adedi güncellemek istiyorum; böylece sepeti boşaltıp baştan doldurmam gerekmez.',
                        en: 'As a customer changing their mind, I want to update the quantity in the cart, so that I do not have to empty it and start over.',
                    },
                    acceptance: [
                        { tr: "Sepetteki adet değiştirilebilir ve tutarlar yeniden hesaplanır.", en: "A quantity in the cart can be changed and the totals are recalculated." },
                        { tr: "Adet sıfır yapılamaz; satırı kaldırmak ayrı bir işlemdir.", en: "The quantity cannot be set to zero; removing a line is a separate action." },
                        { tr: "Adet negatif olamaz.", en: "The quantity cannot be negative." },
                    ],
                    criteria: [
                        { tr: 'Given sepette bir satır var\nWhen adet geçerli bir sayıya güncellenir\nThen 200 döner ve toplamlar yeniden hesaplanır', en: 'Given the cart has a line\nWhen the quantity is updated to a valid number\nThen 200 is returned and the totals are recalculated' },
                        { tr: 'Given adet 0 verilir\nWhen güncelleme yapılır\nThen 422 ve INVALID_QTY döner - satır silmek için ayrı bir işlem var', en: 'Given the quantity is set to 0\nWhen the update runs\nThen 422 and INVALID_QTY are returned - deleting a line is a separate operation' },
                        { tr: 'Given adet negatif verilir\nWhen güncelleme yapılır\nThen 422 ve INVALID_QTY döner', en: 'Given the quantity is negative\nWhen the update runs\nThen 422 and INVALID_QTY are returned' },
                    ],
                    endpoints: ['PATCH /carts/{id}/items/{itemId}'],
                    breaks: [],
                    hint: {
                        tr: 'Sınır değer analizi için ders niteliğinde bir endpoint: 0 ve −1 reddedilirken 1 kabul edilir. Sınırın tam üstünü, tam altını ve tam kendisini test et.',
                        en: 'A textbook endpoint for boundary-value analysis: 0 and −1 are rejected while 1 is accepted. Test just above, just below and exactly on the boundary.',
                    },
                },

                // ─── Kupon ────────────────────────────────────────────────
                {
                    type: 'userStory',
                    id: 'US-07',
                    difficulty: 'intermediate',
                    layers: ['UI', 'API'],
                    theme: { tr: 'Kupon', en: 'Coupon' },
                    title: { tr: 'Müşteri kupon uygular, geçersiz kupon nedeniyle reddedilir', en: 'A customer applies a coupon and is rejected with a reason' },
                    story: {
                        tr: 'İndirim kodu olan bir müşteri olarak kuponumu uygulamak, çalışmıyorsa NEDEN çalışmadığını öğrenmek istiyorum; böylece hatanın bende mi kuponda mı olduğunu anlarım.',
                        en: 'As a customer with a discount code, I want to apply my coupon and, if it fails, learn WHY, so that I can tell whether the problem is mine or the coupon\'s.',
                    },
                    acceptance: [
                        { tr: "Koşulları sağlayan bir kupon indirim üretir ve tutarlara yansır.", en: "A coupon whose conditions are met produces a discount and it shows in the totals." },
                        { tr: "Süresi geçmiş bir kupon kabul edilmez.", en: "An expired coupon is not accepted." },
                        { tr: "Henüz başlamamış bir kupon kabul edilmez.", en: "A coupon that has not started yet is not accepted." },
                        { tr: "Kullanım limiti dolmuş bir kupon kabul edilmez.", en: "A coupon that has reached its usage limit is not accepted." },
                        { tr: "Sepet tutarı kuponun alt sınırının altındaysa kupon kabul edilmez.", en: "A coupon is not accepted when the cart total is below its minimum." },
                    ],
                    criteria: [
                        { tr: 'Given geçerli bir kupon ve koşulları sağlayan bir sepet\nWhen kupon uygulanır\nThen 200 döner ve indirim tutarı toplamlara yansır', en: 'Given a valid coupon and a cart meeting its conditions\nWhen the coupon is applied\nThen 200 is returned and the discount is reflected in the totals' },
                        { tr: 'Given süresi geçmiş bir kupon\nWhen uygulanır\nThen 422 ve COUPON_EXPIRED döner', en: 'Given an expired coupon\nWhen it is applied\nThen 422 and COUPON_EXPIRED are returned' },
                        { tr: 'Given başlangıç tarihi gelecekte olan bir kupon\nWhen uygulanır\nThen 422 ve COUPON_NOT_STARTED döner', en: 'Given a coupon whose start date is in the future\nWhen it is applied\nThen 422 and COUPON_NOT_STARTED are returned' },
                        { tr: 'Given kullanım limiti dolmuş bir kupon\nWhen uygulanır\nThen 422 ve COUPON_USAGE_LIMIT_REACHED döner', en: 'Given a coupon whose usage limit is reached\nWhen it is applied\nThen 422 and COUPON_USAGE_LIMIT_REACHED are returned' },
                        { tr: 'Given minimum tutar şartı sepet tarafından sağlanmıyor\nWhen uygulanır\nThen 422 ve COUPON_MIN_TOTAL_NOT_MET döner', en: 'Given the cart does not meet the minimum-total requirement\nWhen it is applied\nThen 422 and COUPON_MIN_TOTAL_NOT_MET are returned' },
                    ],
                    endpoints: ['POST /carts/{id}/coupon'],
                    breaks: ['ignore_coupon_expiry'],
                    testData: {
                        title: { tr: 'Seed verideki gerçek kupon kodları', en: 'Real coupon codes in the seed data' },
                        rows: [
                            ['WELCOME10', { tr: 'geçerli, %10', en: 'valid, 10%' }],
                            ['FREESHIP', { tr: 'geçerli, sabit 30', en: 'valid, fixed 30' }],
                            ['NOLIMIT', { tr: 'geçerli, %5, limitsiz', en: 'valid, 5%, no limit' }],
                            ['ALMOSTGONE', { tr: 'geçerli, %40 — ama 10 kullanımdan 9\'u bitmiş (yarış koşulu)', en: 'valid, 40% — but 9 of 10 uses are gone (race condition)' }],
                            ['SAVE50', { tr: 'geçerli, sabit 50 — minimum 300 ister', en: 'valid, fixed 50 — requires a minimum of 300' }],
                            ['EXPIRED20', { tr: 'süresi geçmiş', en: 'expired' }],
                            ['OLDCAMPAIGN', { tr: 'süresi geçmiş', en: 'expired' }],
                            ['FUTURE15', { tr: 'henüz başlamamış', en: 'not started yet' }],
                            ['MAXEDOUT', { tr: 'limiti dolmuş (5/5)', en: 'usage limit reached (5/5)' }],
                            ['SUMMER25', { tr: 'minimum 500 ister', en: 'requires a minimum of 500' }],
                            ['BIGSPENDER', { tr: 'minimum 1500 ister', en: 'requires a minimum of 1500' }],
                            ['VIP1000', { tr: 'minimum 4000 ister', en: 'requires a minimum of 4000' }],
                        ],
                    },
                    hint: {
                        tr: 'Beş ret nedeninin beşi de 422 döner ama hata KODLARI farklıdır. Yalnızca "422 aldım" diyen bir test, kuponun süresi bittiği için mi limiti dolduğu için mi reddedildiğini ayırt edemez — ve bu ikisi bambaşka defect\'lerdir.',
                        en: 'All five rejection reasons return 422 but their error CODES differ. A test that only says "I got 422" cannot tell whether the coupon was rejected for expiry or for a usage limit — and those are entirely different defects.',
                    },
                },
                {
                    type: 'userStory',
                    id: 'US-08',
                    difficulty: 'advanced',
                    layers: ['UI', 'API'],
                    theme: { tr: 'Kupon', en: 'Coupon' },
                    title: { tr: 'Sepette geçerli olan kupon checkout\'ta reddedilir', en: 'A coupon valid in the cart is rejected at checkout' },
                    story: {
                        tr: 'Sistemin sahibi olarak, sepete uygulandığı anda geçerli olan bir kuponun sipariş anında koşulları bozulduysa kullanılmasını engellemek istiyorum; böylece indirim kaçağı yaşamayız.',
                        en: 'As the system owner, I want to prevent a coupon that was valid when applied from being used if its conditions have since broken, so that we do not leak discounts.',
                    },
                    acceptance: [
                        { tr: "Kupon uygulandıktan sonra sepet küçülse bile sepet ekranı indirimi göstermeye devam eder.", en: "Once a coupon is applied, the cart screen keeps showing the discount even if the cart shrinks." },
                        { tr: "Sipariş verilirken kupon yeniden değerlendirilir; koşul artık sağlanmıyorsa sipariş oluşmaz.", en: "The coupon is re-evaluated when the order is placed; if the condition no longer holds, no order is created." },
                    ],
                    criteria: [
                        { tr: 'Given minimum 300 isteyen bir kupon 458 TL lik sepete uygulanmış ve kabul edilmiş\nWhen sepetteki adet düşürülüp ara toplam 152 TL ye indirilir\nThen sepet görünümü HÂLÂ indirimi gösterir - bu beklenen davranıştır', en: 'Given a coupon requiring a minimum of 300 was applied and accepted on a cart of 458\nWhen the quantity is lowered so the subtotal drops to 152\nThen the cart view STILL shows the discount - this is the expected behavior' },
                        { tr: 'Given sepet artık minimum tutarın altında\nWhen sipariş verilmeye çalışılır\nThen 422 ve COUPON_MIN_TOTAL_NOT_MET döner ve sipariş OLUŞMAZ', en: 'Given the cart is now below the minimum total\nWhen the order is attempted\nThen 422 and COUPON_MIN_TOTAL_NOT_MET are returned and no order is created' },
                    ],
                    endpoints: ['POST /carts/{id}/coupon', 'PATCH /carts/{id}/items/{itemId}', 'POST /orders'],
                    breaks: ['ignore_coupon_expiry'],
                    hint: {
                        tr: 'Bu story sayfadaki en öğretici olanı: arayüzün gösterdiği tutar ile sistemin kabul ettiği tutar birbirinden AYRILIYOR. Yalnızca arayüze bakan bir test kuralı hiç görmez; yalnızca servise bakan bir test ise kullanıcının yanlış tutar gördüğünü kaçırır. İkisini birlikte test etmek gerektiğinin kanıtı.',
                        en: 'This is the most instructive story on the page: the amount the interface shows and the amount the system accepts DIVERGE. A test that only looks at the interface never sees the rule; a test that only looks at the service misses that the user saw a wrong amount. Proof that both must be tested together.',
                    },
                },

                // ─── Sipariş ──────────────────────────────────────────────
                {
                    type: 'userStory',
                    id: 'US-09',
                    difficulty: 'intermediate',
                    layers: ['UI', 'API', 'DB'],
                    theme: { tr: 'Sipariş', en: 'Order' },
                    title: { tr: 'Müşteri sipariş verir, stok gerçekten düşer', en: 'A customer places an order and stock really drops' },
                    story: {
                        tr: 'Sipariş veren bir müşteri olarak ödediğim ürünün bana ayrılmasını istiyorum; sistemin sahibi olarak da stoğun gerçekten azalmasını istiyorum ki aynı ürünü iki kez satmayalım.',
                        en: 'As a customer placing an order, I want the item I paid for to be allocated to me; as the system owner, I want stock to actually decrease so we do not sell the same unit twice.',
                    },
                    acceptance: [
                        { tr: "Dolu bir sepetten sipariş verilebilir ve siparişe bir numara verilir.", en: "An order can be placed from a full cart and it receives an order number." },
                        { tr: "Sipariş verildiğinde stok gerçekten düşer ve ayrılan miktar serbest kalır.", en: "Placing the order genuinely decreases stock and releases the reserved amount." },
                        { tr: "Sipariş tutarı, ara toplam eksi indirim artı kargo ile birebir uyuşur.", en: "The order total matches subtotal minus discount plus shipping exactly." },
                        { tr: "Aynı sepetten ikinci kez sipariş verilemez.", en: "A second order cannot be placed from the same cart." },
                        { tr: "Boş sepetten sipariş verilemez.", en: "An order cannot be placed from an empty cart." },
                    ],
                    criteria: [
                        { tr: 'Given içinde satır olan açık bir sepet\nWhen sipariş verilir\nThen 201 döner, durum placed olur ve bir sipariş numarası üretilir', en: 'Given an open cart with lines in it\nWhen the order is placed\nThen 201 is returned, the status becomes placed and an order number is generated' },
                        { tr: 'Given sipariş oluştu\nWhen varyantın envanteri okunur\nThen stock_qty sipariş adedi kadar DÜŞMÜŞ ve reserved_qty serbest kalmış olmalıdır', en: 'Given the order was created\nWhen the variant inventory is read\nThen stock_qty must have DROPPED by the ordered amount and reserved_qty must have been released' },
                        { tr: 'Given sipariş oluştu\nWhen toplamlar kontrol edilir\nThen genel toplam = ara toplam - indirim + kargo eşitliği sağlanmalıdır', en: 'Given the order was created\nWhen the totals are checked\nThen the equation grand total = subtotal - discount + shipping must hold' },
                        { tr: 'Given sepetten zaten sipariş verilmiş\nWhen aynı sepetten tekrar sipariş denenir\nThen 409 ve CART_NOT_OPEN döner', en: 'Given an order was already placed from the cart\nWhen ordering from the same cart is attempted again\nThen 409 and CART_NOT_OPEN are returned' },
                        { tr: 'Given boş bir sepet\nWhen sipariş denenir\nThen 422 ve EMPTY_CART döner', en: 'Given an empty cart\nWhen an order is attempted\nThen 422 and EMPTY_CART are returned' },
                    ],
                    endpoints: ['POST /orders', 'GET /products/{id}/variants'],
                    breaks: ['skip_stock_decrement', 'discount_twice', 'wrong_line_total'],
                    hint: {
                        tr: 'İkinci kriter için sipariş ÖNCESİ ve SONRASI stoğu ayrı ayrı okuyup karşılaştırman gerekir. Tek bir okuma yapan test, stoğun hiç düşmediği defect\'i göremez.',
                        en: 'For the second criterion you must read the stock BEFORE and AFTER the order separately and compare. A test that reads only once cannot see the defect where stock never drops.',
                    },
                },
                {
                    type: 'userStory',
                    id: 'US-10',
                    difficulty: 'intermediate',
                    layers: ['API'],
                    theme: { tr: 'Sipariş', en: 'Order' },
                    title: { tr: 'Ödeme başarısız olur, sipariş ilerlemez', en: 'A payment fails and the order does not advance' },
                    story: {
                        tr: 'Sistemin sahibi olarak ödemesi başarısız olan bir siparişin ilerlememesini istiyorum; böylece parası alınmamış bir ürünü kargoya vermeyiz.',
                        en: 'As the system owner, I want an order whose payment failed not to advance, so that we do not ship goods we were never paid for.',
                    },
                    acceptance: [
                        { tr: "Ödeme başarısız olabilir.", en: "A payment can fail." },
                        { tr: "Ödeme başarısız olduğunda sipariş ödendi sayılmaz, olduğu yerde kalır.", en: "When a payment fails the order is not treated as paid; it stays where it was." },
                        { tr: "Ödenmiş bir sipariş ikinci kez ödenemez ve ikinci bir ödeme kaydı oluşmaz.", en: "A paid order cannot be paid a second time and no second payment record appears." },
                    ],
                    criteria: [
                        { tr: 'Given placed durumunda bir sipariş\nWhen ödeme bilerek başarısız kılınır\nThen 402 döner', en: 'Given an order in the placed state\nWhen the payment is deliberately failed\nThen 402 is returned' },
                        { tr: 'Given ödeme başarısız oldu\nWhen sipariş tekrar okunur\nThen durum HÂLÂ placed olmalıdır - başarısız ödeme durumu ilerletmemeli', en: 'Given the payment failed\nWhen the order is read again\nThen the status must STILL be placed - a failed payment must not advance the state' },
                        { tr: 'Given sipariş başarıyla ödendi\nWhen aynı sipariş tekrar ödenmeye çalışılır\nThen 409 ve ALREADY_PAID döner ve ikinci bir ödeme kaydı oluşmaz', en: 'Given the order was paid successfully\nWhen paying the same order again is attempted\nThen 409 and ALREADY_PAID are returned and no second payment record is created' },
                    ],
                    endpoints: ['POST /orders/{id}/pay', 'GET /orders/{id}'],
                    breaks: [],
                    hint: {
                        tr: 'İkinci kriter kritik: 402 aldıktan sonra durumu OKUMAYAN bir test, ödeme başarısızken siparişi `paid` yapan bir defect\'i kaçırır. Hata kodunu doğrulamak yetmez, yan etkinin olmadığını da doğrula.',
                        en: 'The second criterion is critical: a test that does not READ the status after getting 402 will miss a defect that marks the order `paid` on a failed payment. Asserting the error code is not enough — also assert the absence of the side effect.',
                    },
                },
                {
                    type: 'userStory',
                    id: 'US-11',
                    difficulty: 'intermediate',
                    layers: ['API', 'DB'],
                    theme: { tr: 'Sipariş', en: 'Order' },
                    title: { tr: 'Ödemesiz sipariş kargolanamaz', en: 'An unpaid order cannot be shipped' },
                    story: {
                        tr: 'Sistemin sahibi olarak yalnızca ödenmiş siparişlerin kargolanmasını istiyorum; böylece ürünü bedava göndermeyiz.',
                        en: 'As the system owner, I want only paid orders to be shipped, so that we do not give goods away for free.',
                    },
                    acceptance: [
                        { tr: "Ödenmemiş bir sipariş kargolanamaz.", en: "An unpaid order cannot be shipped." },
                        { tr: "Ödenmemiş bir sipariş teslim edilmiş sayılamaz.", en: "An unpaid order cannot be marked as delivered." },
                        { tr: "Ödenmiş bir sipariş kargolanabilir.", en: "A paid order can be shipped." },
                        { tr: "Kargolanmış bir sipariş ikinci kez kargolanamaz.", en: "An order already shipped cannot be shipped again." },
                    ],
                    criteria: [
                        { tr: 'Given placed durumunda ödenmemiş bir sipariş\nWhen kargolanmaya çalışılır\nThen 409 ve INVALID_TRANSITION döner', en: 'Given an unpaid order in the placed state\nWhen shipping is attempted\nThen 409 and INVALID_TRANSITION are returned' },
                        { tr: 'Given ödenmemiş bir sipariş\nWhen teslim edilmeye çalışılır\nThen 409 ve INVALID_TRANSITION döner', en: 'Given an unpaid order\nWhen delivery is attempted\nThen 409 and INVALID_TRANSITION are returned' },
                        { tr: 'Given ödenmiş bir sipariş\nWhen kargolanır\nThen 200 döner ve durum shipped olur', en: 'Given a paid order\nWhen it is shipped\nThen 200 is returned and the status becomes shipped' },
                        { tr: 'Given zaten kargolanmış bir sipariş\nWhen tekrar kargolanmaya çalışılır\nThen 409 ve INVALID_TRANSITION döner', en: 'Given an already shipped order\nWhen shipping is attempted again\nThen 409 and INVALID_TRANSITION are returned' },
                    ],
                    endpoints: ['POST /orders/{id}/ship', 'POST /orders/{id}/deliver'],
                    breaks: [],
                    hint: {
                        tr: 'Bu kural veritabanı tarafından da doğrulanabilir: "ödemesi olmayan ama kargo kaydı olan sipariş" sorgusu 0 satır döndürmeli. Aynı kuralı iki katmanda test etmek, birinin gözden kaçırdığını diğerinin yakalamasını sağlar.',
                        en: 'This rule can also be verified from the database: a query for "orders with a shipment but no payment" must return 0 rows. Testing the same rule at two layers lets one catch what the other misses.',
                    },
                },
                {
                    type: 'userStory',
                    id: 'US-12',
                    difficulty: 'advanced',
                    layers: ['API', 'DB'],
                    theme: { tr: 'Sipariş', en: 'Order' },
                    title: { tr: 'İptal ve iade stoğu geri yükler', en: 'Cancellation and return restore stock' },
                    story: {
                        tr: 'Siparişinden vazgeçen bir müşteri olarak iptal edebilmek istiyorum; sistemin sahibi olarak da iptal edilen ürünün tekrar satılabilir hâle gelmesini istiyorum.',
                        en: 'As a customer who changed their mind, I want to be able to cancel; as the system owner, I want the cancelled item to become sellable again.',
                    },
                    acceptance: [
                        { tr: "Henüz kargolanmamış bir sipariş iptal edilebilir ve stok geri gelir.", en: "An order that has not shipped yet can be cancelled and the stock comes back." },
                        { tr: "Kargolanmış bir sipariş iptal edilemez.", en: "An order that has already shipped cannot be cancelled." },
                        { tr: "Teslim edilmiş bir sipariş, iade süresi içindeyse iade edilebilir; stok geri gelir ve para iade edilir.", en: "A delivered order can be returned while the return window is open; stock comes back and the payment is refunded." },
                        { tr: "Ödenmiş bir sipariş iptal edildiğinde bir iade kaydı oluşur.", en: "Cancelling a paid order creates a refund record." },
                    ],
                    criteria: [
                        { tr: 'Given placed durumunda bir sipariş\nWhen iptal edilir\nThen 200 döner, durum cancelled olur ve stok GERİ YÜKLENİR', en: 'Given an order in the placed state\nWhen it is cancelled\nThen 200 is returned, the status becomes cancelled and stock is RESTORED' },
                        { tr: 'Given kargolanmış bir sipariş\nWhen iptal edilmeye çalışılır\nThen 409 döner - yolda olan ürün iptal edilemez', en: 'Given a shipped order\nWhen cancellation is attempted\nThen 409 is returned - goods in transit cannot be cancelled' },
                        { tr: 'Given teslim edilmiş bir sipariş ve iade penceresi henüz kapanmamış\nWhen iade edilir\nThen 200 döner, durum returned olur, stok geri yüklenir ve ödeme iade edilir', en: 'Given a delivered order and the return window is still open\nWhen it is returned\nThen 200 is returned, the status becomes returned, stock is restored and the payment is refunded' },
                        { tr: 'Given ödenmiş bir sipariş iptal edildi\nWhen ödeme kayıtları okunur\nThen bir iade kaydı bulunmalıdır', en: 'Given a paid order was cancelled\nWhen the payment records are read\nThen a refund record must be present' },
                    ],
                    endpoints: ['POST /orders/{id}/cancel', 'POST /orders/{id}/return'],
                    breaks: ['no_stock_restore_on_cancel'],
                    hint: {
                        tr: 'Ölçülen: iade sonrası stok 32\'den 35\'e döndü. Testin iptal/iade ÖNCESİ stoğu kaydetmesi, sonra karşılaştırması gerekir — sabit bir sayı beklemek işe yaramaz çünkü başlangıç stoğu senin kaç adet aldığına bağlıdır.',
                        en: 'Measured: after the return, stock went from 32 back to 35. Your test must record the stock BEFORE the cancellation/return and compare afterwards — expecting a fixed number will not work, because the starting stock depends on how many units you took.',
                    },
                },

                // ─── Yetki ────────────────────────────────────────────────
                {
                    type: 'userStory',
                    id: 'US-13',
                    difficulty: 'advanced',
                    layers: ['API', 'DB'],
                    theme: { tr: 'Yetki', en: 'Authorization' },
                    title: { tr: 'Bir müşteri başkasının siparişini göremez', en: 'One customer cannot see another\'s order' },
                    story: {
                        tr: 'Müşteri olarak sipariş geçmişimin bana özel kalmasını istiyorum; başka bir müşteri adresini bilse bile siparişimi görememeli.',
                        en: 'As a customer, I want my order history to stay private; another customer must not be able to see my order even if they know its address.',
                    },
                    acceptance: [
                        { tr: "Bir müşteri başka bir müşterinin siparişini göremez.", en: "A customer cannot see another customer's order." },
                        { tr: "Hiç siparişi olmayan müşteri boş bir liste görür; başkasının siparişleri sızmaz.", en: "A customer with no orders sees an empty list; nobody else's orders leak in." },
                        { tr: "Bir müşterinin siparişi yalnızca kendi veri alanına bağlıdır.", en: "A customer's order belongs only to their own data area." },
                    ],
                    criteria: [
                        { tr: 'Given A kullanıcısının bir siparişi var ve B kullanıcısı giriş yapmış\nWhen B, A kullanıcısının sipariş id değerini doğrudan çağırır\nThen 403 ve FORBIDDEN döner', en: 'Given user A has an order and user B is signed in\nWhen B requests A\'s order id directly\nThen 403 and FORBIDDEN are returned' },
                        { tr: 'Given B kullanıcısının hiç siparişi yok\nWhen B sipariş listesini çağırır\nThen 200 ve BOŞ liste döner - başkasının siparişleri sızmaz', en: 'Given B has no orders\nWhen B requests the order list\nThen 200 and an EMPTY list are returned - nobody else\'s orders leak in' },
                        { tr: 'Given veritabanına doğrudan bağlanılır\nWhen bir kullanıcının siparişi başka bir veri alanına bağlı mı diye sorgulanır\nThen 0 satır dönmelidir', en: 'Given a direct database connection\nWhen you query whether a user\'s order is linked to a different data area\nThen 0 rows must be returned' },
                    ],
                    endpoints: ['GET /orders', 'GET /orders/{id}'],
                    breaks: ['leak_other_users_orders'],
                    hint: {
                        tr: 'Üçüncü kriter neden önemli: yabancı anahtar kısıtı "bir yere bağlı mı" diye bakar, "DOĞRU yere bağlı mı" diye bakmaz. Kiracı sızıntısını yalnızca veri tarafında yazılmış bir kontrol yakalar.',
                        en: 'Why the third criterion matters: a foreign key checks whether a row is linked to something, not whether it is linked to the RIGHT something. Only a check written on the data side catches a tenant leak.',
                    },
                },

                // ─── Yorum ────────────────────────────────────────────────
                {
                    type: 'userStory',
                    id: 'US-14',
                    difficulty: 'intermediate',
                    layers: ['UI', 'API', 'DB'],
                    theme: { tr: 'Yorum', en: 'Review' },
                    title: { tr: 'Yorum onaydan geçmeden ortalamaya girmez', en: 'A review does not count toward the average before approval' },
                    story: {
                        tr: 'Sistemin sahibi olarak yorumların yayına girmeden önce onaylanmasını istiyorum; böylece ürün puanı denetlenmemiş içerikle oynanamaz.',
                        en: 'As the system owner, I want reviews approved before publication, so that the product rating cannot be gamed with unmoderated content.',
                    },
                    acceptance: [
                        { tr: "Eklenen yorum önce onay bekler, hemen yayınlanmaz.", en: "A new review waits for approval; it is not published immediately." },
                        { tr: "Onay bekleyen bir yorum ürünün puan ortalamasını değiştirmez.", en: "A review awaiting approval does not change the product's average rating." },
                        { tr: "Yorum listesinde yalnızca onaylanmış yorumlar görünür.", en: "Only approved reviews appear in the review list." },
                        { tr: "Onay bekleyen yorumlar moderasyon için ayrıca listelenebilir.", en: "Reviews awaiting approval can be listed separately for moderation." },
                    ],
                    criteria: [
                        { tr: 'Given giriş yapmış bir kullanıcı\nWhen ürüne yorum eklenir\nThen 201 döner ama yorumun durumu pending olur', en: 'Given a signed-in user\nWhen a review is added to a product\nThen 201 is returned but the review status is pending' },
                        { tr: 'Given onay bekleyen bir yorum eklendi\nWhen ürün puanı okunur\nThen ortalama DEĞİŞMEMİŞ olmalıdır', en: 'Given a pending review was added\nWhen the product rating is read\nThen the average must be UNCHANGED' },
                        { tr: 'Given hem onaylı hem bekleyen yorumlar var\nWhen yorum listesi varsayılan ayarla çağrılır\nThen yalnızca onaylılar döner', en: 'Given there are both approved and pending reviews\nWhen the review list is requested with default settings\nThen only approved ones are returned' },
                        { tr: 'Given moderasyon kuyruğu görüntülenmek isteniyor\nWhen status parametresi pending verilir\nThen onay bekleyen yorumlar döner', en: 'Given the moderation queue needs to be viewed\nWhen the status parameter is set to pending\nThen the pending reviews are returned' },
                    ],
                    endpoints: ['POST /products/{id}/reviews', 'GET /products/{id}/reviews', 'GET /products/{id}/rating', 'PATCH /reviews/{id}'],
                    breaks: ['pending_reviews_in_average'],
                    hint: {
                        tr: 'Ortalamayı sistemin döndürdüğü değerle karşılaştırmakla yetinme — kendin hesapla. Cevaptaki `basis` alanı `approved` diyor; bu iddiayı onaylı yorumları toplayıp bölerek doğrula.',
                        en: 'Do not settle for comparing against the average the system returns — compute it yourself. The `basis` field in the response says `approved`; verify that claim by summing and dividing the approved reviews.',
                    },
                },

                // ─── Adres ────────────────────────────────────────────────
                {
                    type: 'userStory',
                    id: 'US-15',
                    difficulty: 'intermediate',
                    layers: ['UI', 'API'],
                    theme: { tr: 'Adres', en: 'Address' },
                    title: { tr: 'Müşterinin her zaman tam bir varsayılan adresi vardır', en: 'A customer always has exactly one default address' },
                    story: {
                        tr: 'Sık sipariş veren bir müşteri olarak birden fazla adres kaydetmek ve birini varsayılan yapmak istiyorum; böylece her siparişte adres seçmem gerekmez.',
                        en: 'As a frequent customer, I want to save multiple addresses and mark one as default, so that I do not have to pick an address on every order.',
                    },
                    acceptance: [
                        { tr: "Müşterinin ilk adresi otomatik olarak varsayılan olur.", en: "A customer's first address automatically becomes the default." },
                        { tr: "Yeni bir adres varsayılan yapıldığında eski varsayılan bu sıfatı kaybeder.", en: "When a new address is made the default, the previous one loses that status." },
                        { tr: "Varsayılan adres silinirse kalan adreslerden biri varsayılan olur.", en: "If the default address is deleted, one of the remaining addresses becomes the default." },
                        { tr: "Boş bir güncelleme isteği kabul edilmez.", en: "An empty update request is not accepted." },
                        { tr: "Adres listesinde varsayılan adres en başta gelir.", en: "The default address comes first in the address list." },
                    ],
                    criteria: [
                        { tr: 'Given hiç adresi olmayan bir kullanıcı\nWhen ilk adres eklenir\nThen adres otomatik olarak varsayılan olur', en: 'Given a user with no addresses\nWhen the first address is added\nThen it automatically becomes the default' },
                        { tr: 'Given bir varsayılan adres zaten var\nWhen isDefault true ile yeni bir adres eklenir\nThen yeni adres varsayılan olur ve eskisi varsayılanlığını KAYBEDER', en: 'Given a default address already exists\nWhen a new address is added with isDefault true\nThen the new one becomes default and the old one LOSES its default status' },
                        { tr: 'Given birden fazla adres var ve biri varsayılan\nWhen varsayılan adres silinir\nThen kalanlardan biri varsayılan olur', en: 'Given several addresses exist and one is default\nWhen the default address is deleted\nThen one of the remaining becomes default' },
                        { tr: 'Given bir adres güncellenmek isteniyor\nWhen tamamen boş bir gövde gönderilir\nThen 422 ve EMPTY_PATCH döner', en: 'Given an address needs updating\nWhen a completely empty body is sent\nThen 422 and EMPTY_PATCH are returned' },
                        { tr: 'Given adres listesi çağrılır\nWhen sıra kontrol edilir\nThen varsayılan adres listenin BAŞINDA olmalıdır', en: 'Given the address list is requested\nWhen the ordering is checked\nThen the default address must be at the TOP of the list' },
                    ],
                    endpoints: ['GET /addresses', 'POST /addresses', 'PATCH /addresses/{id}', 'DELETE /addresses/{id}'],
                    breaks: [],
                    hint: {
                        tr: 'Birinci kriteri demo hesabıyla test ETME: o hesabın seed verisinde zaten bir adresi var, dolayısıyla eklediğin adres "ilk" olmaz ve testin yanlış sonuç verir. Kendi hesabını kaydedip onunla test et. Ben de ilk ölçümde bu tuzağa düştüm.',
                        en: 'Do NOT test the first criterion with the demo account: it already has a seeded address, so the one you add is not the "first" and your test gives a wrong result. Register your own account and test with that. I fell into this trap on my first measurement too.',
                    },
                },

                // ─── Sandbox ──────────────────────────────────────────────
                {
                    type: 'userStory',
                    id: 'US-16',
                    difficulty: 'advanced',
                    layers: ['API', 'DB'],
                    theme: { tr: 'Test altyapısı', en: 'Test infrastructure' },
                    title: { tr: 'Her koşum temiz durumdan başlar', en: 'Every run starts from a clean state' },
                    story: {
                        tr: 'Test yazan biri olarak her koşumdan önce veriyi bilinen bir başlangıç durumuna döndürmek istiyorum; böylece önceki koşumun bıraktığı artıklar testimi rastgele başarısız yapmaz.',
                        en: 'As someone writing tests, I want to reset the data to a known starting state before each run, so that leftovers from a previous run do not fail my test at random.',
                    },
                    acceptance: [
                        { tr: "Veri alanı sıfırlandığında içerik başlangıç durumuna döner.", en: "Resetting the data area returns its contents to the starting state." },
                        { tr: "Sıfırlama açık oturumları da sonlandırır.", en: "A reset also ends open sessions." },
                        { tr: "Sıfırlamadan sonra kayıt numaraları değişmiş olabilir.", en: "Record identifiers may have changed after a reset." },
                        { tr: "Kendi veri alanı olmayan biri yalnızca okuma yapabilir.", en: "Someone without their own data area can only read." },
                    ],
                    criteria: [
                        { tr: 'Given kendi veri alanımda değişiklikler yapılmış\nWhen sıfırlama çağrılır\nThen 200 döner ve satır sayıları seed değerlerine geri gelir', en: 'Given changes were made in my own data area\nWhen the reset is called\nThen 200 is returned and the row counts return to their seed values' },
                        { tr: 'Given sıfırlamadan önce alınmış bir oturum tokeni var\nWhen sıfırlama sonrası o token ile korumalı bir endpoint çağrılır\nThen 401 döner - sıfırlama oturumları da iptal eder', en: 'Given a session token obtained before the reset\nWhen a protected endpoint is called with that token after the reset\nThen 401 is returned - the reset revokes sessions too' },
                        { tr: 'Given sıfırlamadan önce bir ürün id değeri not edilmiş\nWhen sıfırlama sonrası aynı ürün aranır\nThen id DEĞİŞMİŞ olabilir - satırlar yeniden kopyalandığı için id ler kayar', en: 'Given a product id was noted before the reset\nWhen the same product is looked up after the reset\nThen the id may have CHANGED - ids shift because the rows are re-cloned' },
                        { tr: 'Given anahtarsız istek atılır\nWhen yazma işlemi denenir\nThen 401 döner - anahtarsız erişim SALT OKUNURDUR', en: 'Given a request is sent without a key\nWhen a write operation is attempted\nThen 401 is returned - keyless access is READ-ONLY' },
                    ],
                    endpoints: ['POST /sandbox', 'POST /sandbox/reset', 'GET /sandbox/state'],
                    breaks: [],
                    hint: {
                        tr: 'Üçüncü kriter en çok zaman kaybettiren tuzağı anlatıyor: sıfırlamadan önce aldığın id ve token, sıfırlamadan sonra geçersizdir. Test altyapında sıfırlamayı çağıran kod, ondan sonra HER ŞEYİ yeniden okumalı — id\'leri veya token\'ı önbelleğe alan bir yardımcı sınıf, açıklanamayan 404\'ler üretir.',
                        en: 'The third criterion describes the most time-wasting trap: ids and tokens obtained before a reset are invalid after it. Code in your test infrastructure that calls the reset must re-read EVERYTHING afterwards — a helper class that caches ids or the token will produce unexplainable 404s.',
                    },
                },
            ],
        },
    ],

    // ─── SIK SORULAN SORULAR ────────────────────────────────────────────────
    // ⚠ Bu sorular sayfada GÖRÜNÜR olarak basılır VE arama motoru şemasının
    // kaynağıdır. İkisi birbirinden AYRILAMAZ: kullanıcının göremediği bir
    // soruyu şemaya koymak arama motoru politikasını ihlal eder. Buraya soru
    // eklerken hem sayfada göründüğünü hem statik kabukta basıldığını doğrula.
    faq: [
        {
            q: { tr: 'QA Shop ücretsiz mi, kayıt olmam gerekiyor mu?', en: 'Is QA Shop free, and do I need to sign up?' },
            a: {
                tr: 'Ücretsizdir ve kayıt gerektirmez. Stack tamamen kendi makinende çalışır: bir hesap açmazsın, bir anahtar satın almazsın ve kullanım kotası yoktur. Sistemin içindeki "giriş yap" adımı pratik ettiğin e-ticaret uygulamasının kendi kullanıcılarıdır, bu sitenin üyeliği değil.',
                en: 'It is free and requires no signup. The stack runs entirely on your own machine: you do not create an account, you do not buy a key, and there is no usage quota. The "sign in" step inside the system belongs to the e-commerce application you are practising on, not to this site.',
            },
        },
        {
            q: { tr: 'Sabit cevap döndüren ücretsiz test API\'lerinden farkı ne?', en: 'How is it different from free testing APIs that return canned responses?' },
            a: {
                tr: 'Onlar sabit cevap döndürür; HTTP metotlarını ve durum kodlarını öğrenmek için iyidirler. QA Shop\'ta ise gerçek bir PostgreSQL var: sepete eklediğin ürünün stoğu düşer, sipariş satırları tabloya yazılır, kupon checkout anında yeniden doğrulanır ve sonucu DBeaver ile SQL yazarak kontrol edebilirsin. Yani burada iş kuralı test edebilirsin, yalnızca istek biçimi değil.',
                en: 'Those return canned responses and are good for learning HTTP methods and status codes. QA Shop has a real PostgreSQL behind it: the stock of an item you add to your cart decreases, order lines are written to a table, coupons are revalidated at checkout, and you can check the result by writing SQL in DBeaver. So here you can test business rules, not just request shapes.',
            },
        },
        {
            q: { tr: 'Ne kurmam gerekiyor?', en: 'What do I need to install?' },
            a: {
                tr: 'Yalnızca Docker. Kurulum rehberi Docker\'ın kendisinin kurulumundan başlar ve hiçbir şeyi kurulu varsaymaz. Depoyu indirmek bile istemiyorsan yayınlanmış imajlarla tek bir compose dosyası indirerek ya da üç docker run komutuyla da başlatabilirsin. SQL pratiği için DBeaver, API pratiği için Postman önerilir ama zorunlu değildir.',
                en: 'Only Docker. The setup guide starts from installing Docker itself and assumes nothing is already present. If you would rather not even download the repository, you can start it from the published images with a single compose file or three docker run commands. DBeaver for SQL practice and Postman for API practice are recommended but not required.',
            },
        },
        {
            q: { tr: 'Hangi test türlerini pratik edebilirim?', en: 'Which kinds of testing can I practise?' },
            a: {
                tr: 'Üçünü birden: veritabanı testi (DBeaver ile SQL, hazır doğrulama sorgu paketiyle), API testi (41 iş endpoint\'i, OpenAPI sözleşmesi, Postman ve REST Assured örnek paketleri) ve arayüz otomasyonu (kararlı test id taşıyan dükkân ekranı, Selenium/Playwright/Cypress ile). Aynı iş kuralını üç katmandan test etmek, her aracın neyi kolaylaştırdığını ve neyi gizlediğini yan yana gösterir.',
                en: 'All three: database testing (SQL in DBeaver, with a ready validation query suite), API testing (41 business endpoints, an OpenAPI contract, plus Postman and REST Assured sample suites) and UI automation (a store screen with stable test ids, driven by Selenium, Playwright or Cypress). Testing one business rule from three layers shows side by side what each tool makes easy and what it hides.',
            },
        },
        {
            q: { tr: 'Testimin gerçekten çalıştığını nasıl anlarım?', en: 'How do I know my test actually works?' },
            a: {
                tr: 'Sistemde açılıp kapatılabilen 10 kontrollü defect var. Testini yazıp yeşil geçtikten sonra ilgili defect\'i açarsın ve aynı testi tekrar koşarsın: kırmızıya dönmüyorsa test o kurala hiç bakmıyordur. Her zaman yeşil kalan bir kontrol ile hiçbir şeye bakmayan bozuk bir kontrol rapor ekranında birbirinin aynısıdır; aradaki farkı görmenin tek yolu defect\'i bilerek üretmektir.',
                en: 'The system has 10 controlled defects you can switch on and off. After your test passes green, you turn on the matching defect and run the same test again: if it does not go red, your test is not looking at that rule at all. A check that always stays green and a broken check that looks at nothing are identical on a report screen; the only way to tell them apart is to produce the defect deliberately.',
            },
        },
        {
            q: { tr: 'Verimi bozarsam ne olur?', en: 'What happens if I corrupt my data?' },
            a: {
                tr: 'Hiçbir şey — bozman zaten beklenen davranıştır. Her kullanıcı kendi izole veri alanını açar ve kimse başkasının verisini göremez veya bozamaz. Tek bir istekle seed veriye dönersin, bu yüzden test paketinin hazırlık adımına sıfırlamayı koyabilirsin. Sıfırlamanın satır kimliklerini kaydırdığını ve açık oturumları iptal ettiğini unutma.',
                en: 'Nothing — corrupting it is the expected behaviour. Every user opens their own isolated data area, and nobody can see or damage anyone else\'s data. One request returns you to the seed data, so you can put the reset into your suite\'s setup step. Keep in mind that the reset shifts row ids and revokes open sessions.',
            },
        },
    ],

    next: {
        title: { tr: 'Sırada ne var?', en: 'What is next?' },
        content: {
            tr: 'Bir story seç — başlangıç seviyesinden başlamak iyi bir fikir — ve kabul kriterlerini test case\'e çevir. Aynı story\'yi önce servis katmanında (Postman ya da REST Assured), sonra arayüzde (Playwright, Selenium veya Cypress) yazmayı dene: aynı kuralı iki yerden test etmek, her aracın neyi kolaylaştırdığını ve neyi gizlediğini yan yana gösterir. Sonunda defect anahtarını açıp testinin gerçekten kırmızıya döndüğünü görmeyi ihmal etme — bu adım atlanırsa testin yeşil olması hiçbir şey kanıtlamaz.',
            en: 'Pick a story — starting at the basic level is a good idea — and turn its acceptance criteria into test cases. Try writing the same story first at the service layer (Postman or REST Assured) and then in the interface (Playwright, Selenium or Cypress): testing one rule from two places shows side by side what each tool makes easy and what it hides. And do not skip turning on the bug flag at the end to watch your test genuinely go red — without that step, a green test proves nothing.',
        },
    },
}
