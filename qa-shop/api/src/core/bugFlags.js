// Bug anahtarları — kontrollü kusur enjeksiyonu.
//
// NEDEN VAR: bir testin gerçekten bir şeye baktığını kanıtlamanın tek yolu,
// kusuru bilerek üretip testin KIRMIZIYA döndüğünü görmektir. Her zaman yeşil
// kalan bir test ile hiçbir şeyi doğrulamayan bozuk bir test, rapor ekranında
// birbirinin aynısıdır. Burada her anahtar, sistemin gerçek bir yerinde gerçek
// bir kusur açar; kullanıcı testini koşar ve yakalayıp yakalayamadığını görür.
//
// TASARIM: anahtarlar sandbox BAZINDA tutulur (sandbox.bug_flags jsonb).
// Yani bir kullanıcının açtığı kusur, başkasının verisini etkilemez. Sıfırlama
// (reset_sandbox) anahtarları da temizler — temiz durum, kusursuz durumdur.
//
// SAF MODÜL: veritabanı ve Express bilmez. Route'lar yalnızca `isBugOn` çağırır.

// Her anahtar: hangi kusuru açar, hangi doğrulama onu yakalamalı.
// `catchableBy` alanı kullanıcıya "bunu yakalayan kontrol şu" der — anahtarı
// açıp o kontrolü koşmak, pratiğin tam olarak kendisi.
export const BUG_FLAGS = {
    oversell: {
        title: {
            tr: 'Stok kontrolü sepette atlanır',
            en: 'Stock check is skipped in the cart',
        },
        breaks: {
            tr: 'Sepete ekleme, satılabilir adet (stok - rezerve) yerine yalnızca ham stoğa bakar. Aynı son ürünü iki kullanıcı sepetine atabilir.',
            en: 'Adding to cart looks only at raw stock instead of the sellable quantity (stock - reserved). Two users can put the same last item in their carts.',
        },
        catchableBy: {
            tr: 'Sepete stoktan fazla eklemeyi deneyen API testi 409 beklerken 201 alır.',
            en: 'An API test that tries to add more than the stock expects 409 but receives 201.',
        },
    },

    skip_reserve: {
        title: {
            tr: 'Sepete eklerken rezervasyon yazılmaz',
            en: 'No reservation is written when adding to the cart',
        },
        breaks: {
            tr: 'Ürün sepete girer ama reserved_qty artmaz. Stok herkese boşmuş gibi görünür; oversell checkout anında patlar.',
            en: 'The item enters the cart but reserved_qty does not increase. Stock looks free to everyone; the oversell surfaces at checkout.',
        },
        catchableBy: {
            tr: 'Sepete ekledikten sonra envantere bakan SQL kontrolü: rezerve adedi değişmemiş olur.',
            en: 'A SQL check that inspects inventory after adding to the cart: the reserved quantity has not moved.',
        },
    },

    discount_twice: {
        title: {
            tr: 'Kupon indirimi iki kez uygulanır',
            en: 'The coupon discount is applied twice',
        },
        breaks: {
            tr: 'Sipariş toplamı hesaplanırken indirim iki kez düşülür. Arayüz yine yeşil bir onay gösterir; fark yalnızca kayıtta görünür.',
            en: 'The discount is subtracted twice while computing the order total. The interface still shows a green confirmation; the difference is visible only in the record.',
        },
        catchableBy: {
            tr: 'Mutabakat kontrolü: grand_total, subtotal - discount + shipping formülünü tutmaz.',
            en: 'The reconciliation check: grand_total no longer matches subtotal - discount + shipping.',
        },
    },

    wrong_line_total: {
        title: {
            tr: 'Satır toplamı yanlış hesaplanır',
            en: 'Line totals are computed incorrectly',
        },
        breaks: {
            tr: 'Sipariş satırının line_total değeri adet × birim fiyat yerine yalnızca birim fiyat olarak yazılır. Tek adetlik satırlarda fark GÖRÜNMEZ — çok adetli satırlarda ortaya çıkar.',
            en: 'A line item\'s line_total is written as the unit price alone instead of quantity times unit price. The difference is INVISIBLE on single-quantity lines and only shows up on multi-quantity ones.',
        },
        catchableBy: {
            tr: 'Satır toplamı kontrolü: line_total, qty × unit_price ile eşit değil.',
            en: 'The line total check: line_total does not equal qty times unit_price.',
        },
    },

    skip_stock_decrement: {
        title: {
            tr: 'Sipariş sonrası stok düşmez',
            en: 'Stock is not decremented after an order',
        },
        breaks: {
            tr: 'Sipariş oluşur, satırlar yazılır, ama envanterdeki stok aynı kalır. Dükkân sonsuz ürün satar.',
            en: 'The order is created and its lines are written, but inventory stock stays the same. The shop sells infinite items.',
        },
        catchableBy: {
            tr: 'Sipariş öncesi ve sonrası stoğu karşılaştıran test; ya da satılan adetle stok hareketini kıyaslayan SQL kontrolü.',
            en: 'A test comparing stock before and after the order, or a SQL check comparing sold quantity against stock movement.',
        },
    },

    ignore_coupon_expiry: {
        title: {
            tr: 'Kupon checkout anında yeniden doğrulanmaz',
            en: 'The coupon is not revalidated at checkout',
        },
        breaks: {
            tr: 'Sepete eklendiğinde geçerli olan kupon, süresi dolduktan sonra bile indirim üretmeye devam eder. Sepeti bir hafta açık bırakan kullanıcı süresi geçmiş kuponu kullanır.',
            en: 'A coupon that was valid when it was applied keeps producing a discount even after it expires. A user who leaves the cart open for a week redeems an expired coupon.',
        },
        catchableBy: {
            tr: 'İş kuralı kontrolü: süresi geçmiş kuponla indirim almış sipariş var mı.',
            en: 'The business rule check: is there an order that received a discount from an expired coupon.',
        },
    },

    leak_other_users_orders: {
        title: {
            tr: 'Sipariş listesi kullanıcıya göre filtrelenmez',
            en: 'The order list is not filtered by user',
        },
        breaks: {
            tr: 'GET /orders çağrısı sandbox\'taki TÜM siparişleri döndürür, yalnızca giriş yapanın siparişlerini değil. Çok kiracılı sistemlerin en tehlikeli açığı.',
            en: 'GET /orders returns EVERY order in the sandbox rather than only the signed-in user\'s. The most dangerous flaw in a multi-tenant system.',
        },
        catchableBy: {
            tr: 'Yetki testi: A kullanıcısının listesinde B kullanıcısının siparişi görünüyor mu.',
            en: 'An authorization test: does user A\'s list contain user B\'s order.',
        },
    },

    weak_password_accepted: {
        title: {
            tr: 'Zayıf parola kabul edilir',
            en: 'Weak passwords are accepted',
        },
        breaks: {
            tr: 'Kayıt ucu parola politikasını hiç uygulamaz; "123" ile hesap açılır. 422 beklenen yerde 201 döner.',
            en: 'The register endpoint stops enforcing the password policy; an account can be created with "123". Where 422 is expected, 201 comes back.',
        },
        catchableBy: {
            tr: 'Negatif test: geçersiz girdinin reddedildiğini doğrulayan kayıt testi.',
            en: 'A negative test: the registration test asserting that invalid input is rejected.',
        },
    },

    pending_reviews_in_average: {
        title: {
            tr: 'Onaysız yorumlar ortalama puana girer',
            en: 'Unapproved reviews count toward the average rating',
        },
        breaks: {
            tr: 'Yorum LİSTESİ doğru filtrelenmeye devam eder, ama ortalama puan hesabı onaysız yorumları da sayar. Listede göremediğin bir yorum puanı aşağı çeker.',
            en: 'The review LIST stays correctly filtered, but the average rating calculation also counts unapproved reviews. A review you cannot see in the list drags the score down.',
        },
        catchableBy: {
            tr: 'Ortalamayı onaylı yorumlardan kendisi hesaplayıp uçla karşılaştıran test; listeye bakan test bunu göremez.',
            en: 'A test that computes the average from approved reviews itself and compares it with the endpoint; a test that only reads the list cannot see it.',
        },
    },

    no_stock_restore_on_cancel: {
        title: {
            tr: 'İptalde stok geri yüklenmez',
            en: 'Stock is not restored on cancellation',
        },
        breaks: {
            tr: 'Sipariş iptal edilir ama düşen stok geri gelmez. Envanter her iptalde biraz daha gerçeklikten kopar — yavaş ve fark edilmesi zor bir kayıp.',
            en: 'The order is cancelled but the decremented stock never returns. Inventory drifts a little further from reality with every cancellation — a slow loss that is hard to notice.',
        },
        catchableBy: {
            tr: 'İptal akışı testi: iptal öncesi ve sonrası stok eşit olmalı.',
            en: 'A cancellation flow test: stock before and after the cancellation should match.',
        },
    },
}

export const BUG_FLAG_KEYS = Object.keys(BUG_FLAGS)

// Bilinmeyen anahtar sessizce yok sayılmaz — kullanıcı yazım hatası yaptığında
// "açtım ama hiçbir şey olmadı" demesin diye çağıran taraf doğrular.
export function unknownFlagKeys(keys) {
    return keys.filter((k) => !Object.hasOwn(BUG_FLAGS, k))
}

// Route'ların kullandığı tek fonksiyon. `flags` doğrudan sandbox.bug_flags'tir;
// jsonb sütunu okunurken null/undefined gelebilir, bu yüzden savunmacı.
export function isBugOn(flags, key) {
    if (!flags || typeof flags !== 'object') return false
    return flags[key] === true
}

// Açık anahtarların listesi — cevaplarda ve denetim kaydında kullanılır.
export function activeFlags(flags) {
    if (!flags || typeof flags !== 'object') return []
    return BUG_FLAG_KEYS.filter((k) => flags[k] === true)
}

// Katalog: kullanıcıya ne açabileceğini anlatır (GET /sandbox/bugs).
export function describeFlags(flags = {}) {
    return BUG_FLAG_KEYS.map((key) => ({
        key,
        enabled: flags?.[key] === true,
        ...BUG_FLAGS[key],
    }))
}
