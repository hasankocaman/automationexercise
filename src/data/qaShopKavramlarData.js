// QA Shop — arayüz kavram sözlüğü (hover/tıkla açılan açıklamalar).
//
// ── ÖLÇÜT (kullanıcı kararı, 2026-08-28) ────────────────────────────────────
// Burada YALNIZCA bu uygulamaya mahsus davranışlar açıklanır.
//
//   ❌ Açıklanmaz: herkesin bildiği genel kavramlar — API, database, Swagger,
//      endpoint, istek gövdesi, sepet, kupon, sipariş. Bunları anlatmak
//      okuyanın zamanını çalar ve asıl bilinmeyeni gölgeler.
//   ✅ Açıklanır: "kupon BU UYGULAMADA nasıl davranır", "sandbox burada neye
//      karşılık gelir", "Docker başlamazsa ne olur, sonucu nasıl görürüm".
//
// Pratik testi: cümleyi başka bir e-ticaret sitesi için de yazabiliyorsan,
// o kavram buraya ait değildir.
//
// ── İKİNCİ SINIR ────────────────────────────────────────────────────────────
// Anlatılan şey KURALIN KENDİSİDİR ("ödenmemiş sipariş kargolanamaz"),
// o kuralı sınama reçetesi DEĞİL ("şunu dene, şu kodu bekle"). Buradaki
// kurallar zaten şartname sayfasında herkese açık; gizli tutulan tek şey
// hangi defect'in açık olduğudur.
//
// Alanlar: ad · ozet (tek cümle) · detay (isteğe bağlı ikinci satır)

export const QA_SHOP_KAVRAMLAR = {
    // ── Kurulum ve çalışma kipi ─────────────────────────────────────────────
    docker: {
        ad: { tr: 'Docker gerekliliği', en: 'The Docker requirement' },
        ozet: {
            tr: 'Gerçek veritabanı ve API senin makinende Docker ile çalışır; Docker kurulu ve BAŞLATILMIŞ olmalıdır.',
            en: 'The real database and API run on your own machine through Docker; Docker must be installed AND started.',
        },
        detay: {
            tr: 'Docker kapalıysa sayfa boş bir hata vermez: tarayıcı kipine düşer ve dükkân çalışmaya devam eder. Ama o kipte veritabanına DBeaver ile bağlanamaz, Postman ya da REST Assured\'ı da bu adrese yönlendiremezsin.',
            en: 'If Docker is down the page does not show a blank error: it falls back to browser mode and the store keeps working. But in that mode you cannot connect with DBeaver, nor point Postman or REST Assured at this address.',
        },
    },
    tarayiciModu: {
        ad: { tr: 'Tarayıcı kipi', en: 'Browser mode' },
        ozet: {
            tr: 'Docker yığını kapalıyken devreye giren, aynı API\'yi tarayıcının içinde çalıştıran yedek kip.',
            en: 'A fallback that starts when the Docker stack is down, running the same API inside the browser.',
        },
        detay: {
            tr: 'İstekler gerçekten ağ katmanına iner: tarayıcı geliştirici araçlarında Network sekmesinde method, path ve status ile görürsün. Yani Docker kurmadan da sonuç GÖRÜLEBİLİR — görülemeyen tek şey veritabanının kendisidir.',
            en: 'Requests genuinely reach the network layer: you see them in the browser dev tools Network tab with method, path and status. So results ARE visible without Docker — the only thing you cannot see is the database itself.',
        },
    },
    apiAdresi: {
        ad: { tr: 'Bu sayfanın bağlandığı adres', en: 'The address this page connects to' },
        ozet: {
            tr: 'Dükkânın isteklerini gönderdiği yer. Varsayılan olarak kendi makinendeki Docker yığınını gösterir.',
            en: 'Where the store sends its requests. By default it points at the Docker stack on your own machine.',
        },
        detay: {
            tr: 'Değiştirebilirsin: yığını başka bir portta çalıştırıyorsan buraya yazarsın. Adres yanıt vermezse sayfa tarayıcı kipine düşer ve üstteki rozet bunu söyler.',
            en: 'You can change it: if you run the stack on another port, you type it here. If the address does not answer, the page falls back to browser mode and the badge above says so.',
        },
    },

    // ── Sandbox: bu uygulamanın izolasyon modeli ────────────────────────────
    sandbox: {
        ad: { tr: 'Sandbox — burada ne demek', en: 'Sandbox — what it means here' },
        ozet: {
            tr: 'Bu uygulamada sandbox ayrı bir sunucu ya da ayrı bir veritabanı DEĞİL: aynı veritabanının içinde, tohum verinin sana kopyalanmış hâli.',
            en: 'In this application a sandbox is NOT a separate server or database: it is a copy of the seed data made for you inside the same database.',
        },
        detay: {
            tr: 'Her tablo satırı hangi alana ait olduğunu taşır; izolasyonu sağlayan şey budur. Bozduğun veri, aynı anda dükkânı kullanan başka hiç kimseyi etkilemez.',
            en: 'Every table row carries which area it belongs to; that is what provides the isolation. Data you corrupt affects nobody else using the store at the same time.',
        },
    },
    sandboxAnahtari: {
        ad: { tr: 'Sandbox anahtarı', en: 'Sandbox key' },
        ozet: {
            tr: 'Hangi veri alanının senin olduğunu söyleyen değer; her isteğe bir başlık olarak eklenir.',
            en: 'The value that says which data area is yours; it is attached to every request as a header.',
        },
        detay: {
            tr: 'Tarayıcında saklanır ve ömrü sınırlıdır. Postman, REST Assured ya da kendi test kodundan AYNI alana bağlanmak istiyorsan bu değeri oraya da yazman gerekir — yoksa farklı bir alana bakarsın ve verini bulamazsın.',
            en: 'It is stored in your browser and expires. To reach the SAME area from Postman, REST Assured or your own test code you must copy this value there too — otherwise you look at a different area and cannot find your data.',
        },
    },
    alanAc: {
        ad: { tr: 'Kendi alanımı aç', en: 'Open my own area' },
        ozet: {
            tr: 'Tohum verinin sana ait yazılabilir bir kopyasını oluşturur ve anahtarını kaydeder.',
            en: 'Creates a writable copy of the seed data that belongs to you, and stores its key.',
        },
        detay: {
            tr: 'Bunu yapmadan yalnızca demo veriyi okuyabilirsin. Sepete ekleme, sipariş verme, adres kaydetme ve defect açma yazma işlemidir; hepsi kendi alanını gerektirir.',
            en: 'Until you do this you can only read the demo data. Adding to a cart, ordering, saving an address and enabling defects are all writes; each needs your own area.',
        },
    },
    veriSifirla: {
        ad: { tr: 'Veriyi sıfırla', en: 'Reset data' },
        ozet: {
            tr: 'Kendi alanındaki veriyi tohum hâline döndürür ve açık defect\'leri kapatır.',
            en: 'Returns the data in your own area to its seed state and switches off any enabled defects.',
        },
        detay: {
            tr: 'Sıfırlama satırları yeniden ürettiği için kayıt id\'leri KAYAR ve oturumun iptal olur. Elinde tuttuğun bir ürün id\'si ya da token varsa sıfırlamadan sonra artık geçerli değildir — testin bunları sıfırlamanın ötesine taşımamalı.',
            en: 'Because the reset recreates rows, record ids SHIFT and your session is revoked. Any product id or token you were holding is no longer valid afterwards — your tests must not carry them across a reset.',
        },
    },
    anahtariUnut: {
        ad: { tr: 'Anahtarı unut', en: 'Forget key' },
        ozet: {
            tr: 'Anahtarı bu tarayıcıdan siler; üyeysen hesabındaki kayıttan da siler. Sunucudaki veri alanını SİLMEZ.',
            en: 'Removes the key from this browser, and from your account if you are signed in. It does NOT delete your data area on the server.',
        },
        detay: {
            tr: 'Anahtarsız kalınca demo veriye geri dönersin. Anahtarı bir yere kopyaladıysan yukarıdaki alana yapıştırıp kaldığın yerden devam edebilirsin. Üyeysen açtığın alan hesabında hatırlanır; başka bir makinede giriş yapınca aynı alana dönersin.',
            en: 'Without a key you fall back to the demo data. If you copied the key somewhere you can paste it into the field above and pick up where you left off. If you are signed in, the area you opened is remembered on your account, so signing in on another machine brings you back to it.',
        },
    },
    saltOkunur: {
        ad: { tr: 'Anahtarsız erişim', en: 'Access without a key' },
        ozet: {
            tr: 'Anahtarın yokken demo veriyi görürsün ama hiçbir şeyi değiştiremezsin.',
            en: 'Without a key you can see the demo data but change nothing.',
        },
        detay: {
            tr: 'Demo veri dükkâna giren herkesle paylaşıldığı için yazmaya kapalıdır; biri onu bozarsa herkesin pratiği bozulurdu.',
            en: 'The demo data is shared with everyone who opens the store, so it is closed to writes; if one person corrupted it, everyone\'s practice would break.',
        },
    },

    // ── Bu uygulamanın iş kuralları (şartnamede zaten açık) ─────────────────
    kupon: {
        ad: { tr: 'Kupon burada nasıl davranır', en: 'How a coupon behaves here' },
        ozet: {
            tr: 'Kupon sepete uygulandığında bir kez, sipariş verilirken BİR KEZ DAHA doğrulanır.',
            en: 'A coupon is validated once when applied to the cart, and ONCE MORE when the order is placed.',
        },
        detay: {
            tr: 'Aradan geçen sürede koşullar bozulduysa — sepet kuponun istediği alt tutarın altına düştü ya da kuponun süresi bitti — sipariş reddedilir. Yani sepette görünen indirim, siparişin kabul edileceğinin garantisi değildir.',
            en: 'If conditions broke in the meantime — the cart fell below the coupon\'s minimum, or the coupon expired — the order is rejected. So a discount showing in the cart is no guarantee the order will be accepted.',
        },
    },
    sepeteEkle: {
        ad: { tr: 'Sepete eklemek stoğa ne yapar', en: 'What adding to the cart does to stock' },
        ozet: {
            tr: 'Sepete eklemek stoğu DÜŞÜRMEZ, rezerve eder. Stok ancak sipariş verildiğinde gerçekten azalır.',
            en: 'Adding to the cart does not DECREMENT stock, it reserves it. Stock only truly drops when the order is placed.',
        },
        detay: {
            tr: 'Satılabilir adet, stoktan rezerve düşülerek bulunur. Bu yüzden sepete ekledikten sonra ürünün stok sayısını değişmemiş görmen bir hata değil, tasarımın kendisidir.',
            en: 'The sellable quantity is stock minus reserved. So seeing the product\'s stock number unchanged after adding to the cart is not a bug, it is the design.',
        },
    },

    siparisDurumlari: {
        ad: { tr: 'Sipariş durumu burada nasıl ilerler', en: 'How an order status moves here' },
        ozet: {
            tr: 'Sipariş durumları sırayla ilerler ve atlanamaz: verildi → ödendi → kargolandı → teslim edildi. İptal ve iade bu hattın ayrı çıkışlarıdır.',
            en: 'Order statuses advance in sequence and cannot be skipped: placed → paid → shipped → delivered. Cancellation and return are separate exits from that line.',
        },
        detay: {
            tr: 'Kargoya çıkmış bir sipariş artık iptal edilmez, iade edilir — ikisi stok ve ödeme tarafında farklı sonuç doğurur. İade de süresizce açık değildir. Dükkân arayüzü siparişi yalnızca verir; kalan geçişleri API üzerinden yürütürsün.',
            en: 'An order that has shipped can no longer be cancelled, only returned — the two have different effects on stock and payment. The return window does not stay open forever either. The store interface only places the order; you drive the remaining transitions through the API.',
        },
    },
    odemeBasarisiz: {
        ad: { tr: 'Ödeme başarısız senaryosu', en: 'The failed payment scenario' },
        ozet: {
            tr: 'Bu kutu işaretliyken sipariş yine oluşur, ama ödemesi başarısız düşer ve sipariş ödenmemiş kalır.',
            en: 'With this box ticked the order is still created, but its payment fails and the order stays unpaid.',
        },
        detay: {
            tr: 'Gerçek bir ödeme sağlayıcısı bağlı olmadığı için başarısızlık böyle üretilir; kart alanlarına ne yazdığın sonucu değiştirmez, o alanlar yalnızca vitrin. Ödenmemiş sipariş kaybolmaz — sistemde ödenmemiş hâliyle durur ve o hâlde ilerleyemez.',
            en: 'No real payment provider is connected, so failure is produced this way; what you type into the card fields changes nothing, they are decorative. An unpaid order does not disappear — it stays in the system as unpaid and cannot move on in that state.',
        },
    },
    varsayilanAdres: {
        ad: { tr: 'Varsayılan adres nasıl belirlenir', en: 'How the default address is decided' },
        ozet: {
            tr: 'Kaydettiğin ilk adres kendiliğinden varsayılan olur ve varsayılan her zaman TEK adrestir.',
            en: 'The first address you save automatically becomes the default, and there is always exactly ONE default.',
        },
        detay: {
            tr: 'Başka bir adresi varsayılan yaptığında öncekinin varsayılanlığı düşer. Varsayılan adresi silersen kalanlardan biri onun yerine geçer; yani hiç varsayılanı olmayan bir hesap durumu bilerek bırakılmaz.',
            en: 'Making another address the default drops the flag from the previous one. If you delete the default, one of the remaining addresses takes its place; an account with no default at all is deliberately never left behind.',
        },
    },
    yorumOnayi: {
        ad: { tr: 'Yorumlar burada onaydan geçer', en: 'Reviews go through approval here' },
        ozet: {
            tr: 'Bu listede yalnızca onaylanmış yorumlar görünür; yeni yazılan bir yorum önce onay bekler ve ürünün puan ortalamasına girmez.',
            en: 'Only approved reviews appear in this list; a newly written review waits for approval first and does not count toward the product rating.',
        },
        detay: {
            tr: 'Dükkân arayüzünde yorum yazma alanı yoktur — yorum eklemek ve onay durumunu değiştirmek API üzerinden yapılır. Onay bekleyenler ayrı listelenebilir, yani iki liste aynı şey değildir.',
            en: 'The store interface has no review form — adding a review and changing its approval state happen through the API. Those awaiting approval can be listed separately, so the two lists are not the same thing.',
        },
    },

    // ── Pratik mekaniği: yalnızca bu uygulamada var ─────────────────────────
    defectAnahtari: {
        ad: { tr: 'Defect anahtarı', en: 'Defect flag' },
        ozet: {
            tr: 'Sistemin belirli bir yerinde gerçek bir kusur açan aç/kapa düğmesi — yalnızca senin alanında.',
            en: 'An on/off switch that opens a genuine defect at a specific place in the system — in your area only.',
        },
        detay: {
            tr: 'Bir testin gerçekten bir şeye baktığını görmenin tek yolu, kusuru açıp testin kırmızıya döndüğünü görmektir. Her zaman yeşil kalan bir test ile hiçbir şeye bakmayan bozuk bir test, rapor ekranında birbirinin aynısıdır.',
            en: 'The only way to see that a test really looks at something is to switch a defect on and watch it go red. A test that always stays green and a broken test that looks at nothing are identical on a report screen.',
        },
    },
    gizliTur: {
        ad: { tr: 'Gizli tur', en: 'Hidden round' },
        ozet: {
            tr: 'Sistem birkaç defect açar ve hangilerini açtığını SÖYLEMEZ.',
            en: 'The system enables a few defects and does NOT tell you which ones.',
        },
        detay: {
            tr: 'Sahada da kimse söylemez; kusuru bulmak testi yazan kişinin işidir. Tur sürerken defect listesi kilitlenir, böylece tek tek açıp kapatarak cevabı bulamazsın.',
            en: 'Nobody tells you in the field either; finding the defect is the job of the person writing the tests. While a round runs the defect list is locked, so you cannot find the answer by toggling them one by one.',
        },
    },
    olayGunlugu: {
        ad: { tr: 'Olay günlüğü', en: 'Event log' },
        ozet: {
            tr: 'Arayüzde yaptığın her hareketin hangi API çağrısına dönüştüğünü satır satır gösterir.',
            en: 'Shows, line by line, which API call each action in the interface turned into.',
        },
        detay: {
            tr: 'Bir düğmeye basmanın tek bir istek mi yoksa birkaç istek mi ürettiğini burada görürsün — arayüz testi ile API testinin aynı işin iki yarısı olması bu tabloda somutlaşır.',
            en: 'Here you see whether pressing a button produced one request or several — this table is where UI testing and API testing become visibly two halves of the same job.',
        },
    },

    // ── API sözleşmesi sayfası ──────────────────────────────────────────────
    kimlikBasliklari: {
        ad: { tr: 'Bu API\'de kimlik iki katmanlı', en: 'Identity here has two layers' },
        ozet: {
            tr: 'İki ayrı başlık iki ayrı soruya cevap verir: hangi veri alanındasın, ve o alanda kimsin.',
            en: 'Two separate headers answer two separate questions: which data area you are in, and who you are inside it.',
        },
        detay: {
            tr: 'Alan anahtarı yazma yapan neredeyse her istekte gerekir; oturum bilgisi ise yalnızca kullanıcıya bağlı işlemlerde. Birini gönderip diğerini unutmak, ilk kurulumda en sık yapılan hatadır.',
            en: 'The area key is needed on almost every request that writes; the session applies only to user-scoped operations. Sending one and forgetting the other is the most common first-setup mistake.',
        },
    },
}

export const QA_SHOP_KAVRAM_ANAHTARLARI = Object.keys(QA_SHOP_KAVRAMLAR)
