// QA Shop — SQL doğrulama paketinin HERKESE AÇIK dizini.
//
// Kaynak dosya: qa-shop/db/validation-queries.sql
//
// Buradaki her satır yalnızca "bu sorgu neye bakar" der. Hangi iş kuralına ya
// da hangi user story'ye karşılık geldiği BİLEREK yazılmaz — o eşlemeyi test
// eden kişi kendisi kurar; hazır verilirse analiz işi ortadan kalkar. Eşleme
// qaShopSqlMap.js'te ve yalnızca admin'e açıktır.
//
// Bu dosya ile SQL dosyası arasındaki tutarlılığı build'de
// scripts/check-qa-shop-sql-map.mjs doğrular: SQL'de olup burada olmayan (ya
// da tersi) bir sorgu build'i kırar.

export const SQL_PACK_GROUPS = [
    {
        id: 'A',
        kind: 'passfail',
        title: { tr: 'Mutabakat', en: 'Reconciliation' },
        purpose: {
            tr: 'Tutarların birbirinden türetilip türetilmediğine bakar. Arayüz bu sayıları olduğu gibi bastığı için bu grubun tamamı yalnızca veritabanından görülebilir.',
            en: 'Looks at whether amounts are derived from one another. The interface prints these numbers as they are, so this whole group is visible only from the database.',
        },
        queries: [
            {
                id: 'A1',
                bakar: {
                    tr: 'Siparişin genel toplamı, kendi bileşenlerinden (ara toplam, indirim, kargo) türetiliyor mu.',
                    en: 'Whether an order’s grand total is derived from its own components (subtotal, discount, shipping).',
                },
            },
            {
                id: 'A2',
                bakar: {
                    tr: 'Sipariş başlığında yazan ara toplam, o siparişin satır toplamlarının toplamıyla aynı mı.',
                    en: 'Whether the subtotal on the order header equals the sum of that order’s line totals.',
                },
            },
            {
                id: 'A3',
                bakar: {
                    tr: 'Her sipariş satırının kendi toplamı, o satırın adedi ile birim fiyatının çarpımına eşit mi.',
                    en: 'Whether each order line’s total equals that line’s quantity times its unit price.',
                },
            },
            {
                id: 'A4',
                bakar: {
                    tr: 'Başarılı ya da iade edilmiş bir ödemenin tutarı, bağlı olduğu siparişin genel toplamıyla aynı mı.',
                    en: 'Whether the amount of a successful or refunded payment matches the grand total of the order it belongs to.',
                },
            },
        ],
    },
    {
        id: 'B',
        kind: 'passfail',
        title: { tr: 'Referans bütünlüğü ve tenant izolasyonu', en: 'Referential integrity and tenant isolation' },
        purpose: {
            tr: 'Kayıtların doğru kapsama bağlı olup olmadığına ve olması gereken ama olmayan satırlara bakar. Foreign key kısıtı bu soruların hiçbirine cevap vermez.',
            en: 'Looks at whether records are attached to the right scope, and at rows that should exist but do not. A foreign key constraint answers none of these questions.',
        },
        queries: [
            {
                id: 'B1',
                bakar: {
                    tr: 'Bir sipariş satırının tenant kapsamı, bağlı olduğu siparişin kapsamıyla aynı mı.',
                    en: 'Whether an order line’s tenant scope matches the scope of the order it belongs to.',
                },
            },
            {
                id: 'B2',
                bakar: {
                    tr: 'Bir sepet satırının tenant kapsamı, bağlı olduğu sepetin kapsamıyla aynı mı.',
                    en: 'Whether a cart line’s tenant scope matches the scope of the cart it belongs to.',
                },
            },
            {
                id: 'B3',
                bakar: {
                    tr: 'Bir varyantın tenant kapsamı, bağlı olduğu ürünün kapsamıyla aynı mı.',
                    en: 'Whether a variant’s tenant scope matches the scope of the product it belongs to.',
                },
            },
            {
                id: 'B4',
                bakar: {
                    tr: 'Hiç satırı olmayan bir sipariş başlığı var mı.',
                    en: 'Whether there is an order header with no lines at all.',
                },
            },
            {
                id: 'B5',
                bakar: {
                    tr: 'Her varyantın bir envanter kaydı var mı.',
                    en: 'Whether every variant has an inventory record.',
                },
            },
        ],
    },
    {
        id: 'C',
        kind: 'passfail',
        title: { tr: 'İş kuralı ihlalleri', en: 'Business rule violations' },
        purpose: {
            tr: 'Stok, kupon ve sipariş yaşam döngüsü kurallarının veriye yansımış hâline bakar.',
            en: 'Looks at how the stock, coupon and order lifecycle rules are reflected in the data.',
        },
        queries: [
            {
                id: 'C1',
                bakar: {
                    tr: 'Bir varyantta rezerve edilmiş adet, eldeki stok adedini aşıyor mu.',
                    en: 'Whether the reserved quantity on a variant exceeds the stock on hand.',
                },
            },
            {
                id: 'C2',
                bakar: {
                    tr: 'Bir kuponun kullanım sayısı, tanımlı üst sınırını aşmış mı.',
                    en: 'Whether a coupon’s usage count has passed its defined maximum.',
                },
            },
            {
                id: 'C3',
                bakar: {
                    tr: 'İndirim almış siparişlerde kupon, siparişin verildiği ANDA geçerlilik aralığının içinde miydi.',
                    en: 'For discounted orders, whether the coupon was inside its validity window AT the moment the order was placed.',
                },
            },
            {
                id: 'C4',
                bakar: {
                    tr: 'İndirim uygulanmış siparişlerde sepet tutarı, kuponun istediği alt sınırı karşılıyor mu.',
                    en: 'For discounted orders, whether the cart total meets the minimum the coupon requires.',
                },
            },
            {
                id: 'C5',
                bakar: {
                    tr: 'İptal edilmiş bir siparişe bağlı kargo kaydı var mı.',
                    en: 'Whether a cancelled order has a shipment record attached to it.',
                },
            },
            {
                id: 'C6',
                bakar: {
                    tr: 'Kargolanmış ya da teslim edilmiş her siparişin başarılı bir ödemesi var mı.',
                    en: 'Whether every shipped or delivered order has a successful payment.',
                },
            },
            {
                id: 'C7',
                rapor: true,
                bakar: {
                    tr: 'Onaylı yorumlardan hesaplanan ortalama ile tüm yorumlardan hesaplanan ortalamanın ayrıştığı ürünleri listeler.',
                    en: 'Lists products where the average computed from approved reviews diverges from the average computed from all reviews.',
                },
            },
            {
                id: 'C8',
                rapor: true,
                bakar: {
                    tr: 'Pasif (soft delete edilmiş) ürünlerden geçmişte sipariş verilmiş olanları listeler.',
                    en: 'Lists inactive (soft-deleted) products that were ordered in the past.',
                },
            },
        ],
    },
    {
        id: 'D',
        kind: 'passfail',
        title: { tr: 'Veri kalitesi', en: 'Data quality' },
        purpose: {
            tr: 'Verinin kendi içindeki tutarlılığına bakar: tekrarlar, boş bağlantılar, aralık dışı değerler.',
            en: 'Looks at the data’s internal consistency: duplicates, empty links, out-of-range values.',
        },
        queries: [
            {
                id: 'D1',
                bakar: {
                    tr: 'Yalnızca büyük/küçük harf yazımıyla ayrışan e-postaları gruplar. Veritabanının UNIQUE kısıtı harf duyarlıdır.',
                    en: 'Groups emails that differ only by letter case. The database’s UNIQUE constraint is case-sensitive.',
                },
            },
            {
                id: 'D2',
                rapor: true,
                bakar: {
                    tr: 'Marka bağlantısı NULL olan ürünlerin sayısını verir. INNER JOIN kullanan bir listede bu ürünler sessizce kaybolur.',
                    en: 'Gives the count of products whose brand link is NULL. Such products vanish silently from a list built with an INNER JOIN.',
                },
            },
            {
                id: 'D3',
                bakar: {
                    tr: 'Fiyatı sıfır ya da negatif olan ürünler.',
                    en: 'Products with a price of zero or below.',
                },
            },
            {
                id: 'D4',
                bakar: {
                    tr: 'Her kullanıcının varsayılan adres sayısı tam olarak bir mi.',
                    en: 'Whether every user has exactly one default address.',
                },
            },
            {
                id: 'D5',
                bakar: {
                    tr: 'Sipariş tarihi şu andan ileride olan kayıtlar.',
                    en: 'Records whose order date is in the future.',
                },
            },
        ],
    },
    {
        id: 'E',
        kind: 'rapor',
        title: { tr: 'Log analizi', en: 'Log analysis' },
        purpose: {
            tr: 'Denetim kaydı üzerinden kök neden arama pratiği. Bu grup geçti/kaldı üretmez; nereye bakacağını daraltır.',
            en: 'Root-cause practice over the audit log. This group produces no pass/fail; it narrows down where to look.',
        },
        queries: [
            {
                id: 'E1',
                bakar: {
                    tr: 'İşlem (action) başına toplam ve hatalı istek sayısını, hata yüzdesine göre sıralar.',
                    en: 'Ranks total and failed request counts per action, ordered by error rate.',
                },
            },
            {
                id: 'E2',
                bakar: {
                    tr: 'Tek bir correlation_id’nin tüm log satırlarını zaman sırasıyla getirir.',
                    en: 'Fetches every log line for a single correlation_id in time order.',
                },
            },
            {
                id: 'E3',
                bakar: {
                    tr: 'Her işlemin kendi p95 eşiğini hesaplar ve o eşiğin üstünde kalan istekleri listeler.',
                    en: 'Computes each action’s own p95 threshold and lists the requests above it.',
                },
            },
            {
                id: 'E4',
                bakar: {
                    tr: 'Hataları saat kovalarına bölerek yoğunlaştıkları saatleri gösterir.',
                    en: 'Buckets errors by hour to show when they cluster.',
                },
            },
        ],
    },
    {
        id: 'G',
        kind: 'rapor',
        title: { tr: 'Analiz ve raporlama', en: 'Analysis and reporting' },
        purpose: {
            tr: 'Geçti/kaldı üretmeyen, mülakatta ve sprint raporunda sık istenen SQL kalıpları.',
            en: 'SQL patterns that produce no pass/fail, commonly asked for in interviews and sprint reports.',
        },
        queries: [
            {
                id: 'G1',
                bakar: {
                    tr: 'İptal ve iade dışındaki siparişlerden ürün başına ciroyu hesaplar, window function ile sıra numarası verir.',
                    en: 'Computes revenue per product from non-cancelled, non-returned orders and ranks it with a window function.',
                },
            },
            {
                id: 'G2',
                bakar: {
                    tr: 'Ay kovalarına göre sipariş adedi, ciro ve ortalama sepet tutarı.',
                    en: 'Order count, revenue and average basket value bucketed by month.',
                },
            },
            {
                id: 'G3',
                bakar: {
                    tr: 'Hiçbir siparişe bağlanmamış kullanıcılar (LEFT JOIN + IS NULL kalıbı).',
                    en: 'Users not attached to any order (the LEFT JOIN + IS NULL pattern).',
                },
            },
            {
                id: 'G4',
                bakar: {
                    tr: 'Üst-alt kategori çiftlerini ve alt kategori başına aktif ürün sayısını (self-join).',
                    en: 'Parent-child category pairs and the active product count per child category (a self-join).',
                },
            },
        ],
    },
]

export const SQL_PACK_IDS = SQL_PACK_GROUPS.flatMap((g) => g.queries.map((q) => q.id))
