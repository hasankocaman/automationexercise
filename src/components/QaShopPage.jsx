// src/components/QaShopPage.jsx — /qa-shop
//
// Kendi makinende çalışan QA Shop API'sine (varsayılan http://localhost:4000)
// bağlanan DÜKKÂN. Selenium, Playwright veya Cypress ile otomatikleştirmek
// için tasarlandı.
//
// TASARIM AMACI — ekran gerçek bir alışveriş sitesi gibi görünür:
//   · Kullanıcı önce VİTRİNİ görür: ürün kartları, görsel, puan, fiyat.
//     Otomasyon pratiği ancak gerçeğe benzeyen bir ekranda anlamlıdır; test
//     hedefi bir kontrol paneline benzerse öğrenilen şey de o kadar kalır.
//   · Akış gerçek dükkânın akışıdır: vitrin → ürün → sepet → adres → ödeme
//     → sipariş onayı → siparişlerim.
//   · Teknik panel (bağlantı, defect anahtarları, olay günlüğü) sayfanın
//     ALTINDA ve KAPALI durur. Kaybolmadı — arayan bulur, aramayan görmez.
//   · Her etkileşimli öğe KARARLI bir `data-testid` taşır. Locator'ın CSS
//     sınıfına veya metne bağlanması en sık kırılan alışkanlıktır.
//   · Her istek "Olay günlüğü"ne düşer: kullanıcı arayüzdeki bir hareketin
//     API'de HANGİ çağrıya dönüştüğünü görür.
//   · Stack kapalıyken sayfa boş bir hata göstermez; ne yapılacağını söyler.
//
// TopicPage KULLANILMAZ: bu bir ders sayfası değil, canlı bir uygulama.
import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'
import { UrunKarti, UrunGorseli, Yildizlar } from './QaShopStore'
import QaShopManuelTur from './QaShopManuelTur'
import QaShopGecis from './QaShopGecis'
import QaShopHizliGecis from './QaShopHizliGecis'
import StoryIpucu, { useStoryModu, StoryModuAnahtari, StoryModuSeridi } from './QaShopStoryIpucu'
import Kavram from './QaShopKavram'

// Tarayıcı katmanı (sql.js WASM + 328 KB tohum veri) YALNIZCA gerekince
// yüklenir; ana sayfa paketine girmemesi için statik import edilmez.
const tarayiciModunuBaslat = async () => {
    const m = await import('../qa-shop-browser/handlers.js')
    return m.tarayiciModunuBaslat()
}

const VARSAYILAN_API = 'http://localhost:4000'

// Anahtar tarayıcıda saklanır: sayfa yenilendiğinde pratiğin baştan
// başlaması, otomasyon yazarken en can sıkıcı sürtünmelerden biri olurdu.
const DEPO_ANAHTARI = 'qaShopSandboxKey'
const DEPO_ADRES = 'qaShopApiBase'
// Oturum da saklanır: sayfayı yenileyen kullanıcının sepetini kaybetmesi,
// pratiğin ortasında en can sıkıcı kopuş. Gerçek dükkânlar da oturumu korur.
const DEPO_TOKEN = 'qaShopToken'

// Bu alanda bir av turunun BAŞLATILDIĞINI işaretler.
//
// NEDEN GEREKLİ: dükkân, kendi veri alanını ilk kez açan kullanıcıya
// kendiliğinden gizli bir tur açar (hangi defect'lerin canlı olduğu
// söylenmez). İşaret olmasaydı sayfa her yenilendiğinde YENİ bir tur
// açılırdı: kullanıcının yarım kalan avı sıfırlanır, elindeki bulgu
// anlamsızlaşırdı. Cevabı görüp turu bitiren kullanıcıya da tur yeniden
// dayatılmaz — değer, avı kendi istediğinde başlatabilmesindedir.
const DEPO_AV = 'qaShopAvAlani'
// Kaç defect canlı olacak. Üç, on ihtimalin içinde aramayı anlamlı tutacak
// kadar çok; bulguları birbirine karıştırmayacak kadar az.
const VARSAYILAN_AV_ADEDI = 3

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

const M = {
    baslik: { tr: 'QA Shop', en: 'QA Shop' },
    slogan: {
        tr: 'Otomasyon pratiği için gerçek bir dükkân',
        en: 'A real shop for automation practice',
    },
    ara: { tr: 'Ürün, marka veya kategori ara', en: 'Search products, brands or categories' },
    aramaBtn: { tr: 'Ara', en: 'Search' },
    hesabim: { tr: 'Hesabım', en: 'Account' },
    girisYap: { tr: 'Giriş yap', en: 'Sign in' },
    cikisYap: { tr: 'Çıkış yap', en: 'Sign out' },
    siparislerim: { tr: 'Siparişlerim', en: 'My orders' },
    sepet: { tr: 'Sepet', en: 'Cart' },
    tumu: { tr: 'Tümü', en: 'All' },
    tumUrunler: { tr: 'Tüm ürünler', en: 'All products' },
    aramaSonucu: { tr: 'Arama sonuçları', en: 'Search results' },
    sirala: { tr: 'Sırala', en: 'Sort' },
    siralaUcuz: { tr: 'Fiyat: düşükten yükseğe', en: 'Price: low to high' },
    siralaPahali: { tr: 'Fiyat: yüksekten düşüğe', en: 'Price: high to low' },
    siralaYeni: { tr: 'En yeniler', en: 'Newest' },
    urunBulunamadi: { tr: 'Aramanla eşleşen ürün yok.', en: 'No products match your search.' },
    sonucAdet: { tr: 'ürün', en: 'products' },
    geriVitrin: { tr: 'Vitrine dön', en: 'Back to store' },
    beden: { tr: 'Beden', en: 'Size' },
    renk: { tr: 'Renk', en: 'Color' },
    stok: { tr: 'satılabilir', en: 'available' },
    tukendi: { tr: 'Tükendi', en: 'Sold out' },
    sepeteEkle: { tr: 'Sepete Ekle', en: 'Add to Cart' },
    bedenSec: { tr: 'Önce beden seç', en: 'Pick a size first' },
    aciklama: { tr: 'Ürün açıklaması', en: 'Product description' },
    yorumlar: { tr: 'Değerlendirmeler', en: 'Reviews' },
    yorumYok: { tr: 'Bu ürüne henüz yorum yapılmamış.', en: 'No reviews yet for this product.' },
    sepetim: { tr: 'Sepetim', en: 'My Cart' },
    sepetBos: { tr: 'Sepetin boş.', en: 'Your cart is empty.' },
    sepetBosBtn: { tr: 'Alışverişe başla', en: 'Start shopping' },
    kaldir: { tr: 'Kaldır', en: 'Remove' },
    adet: { tr: 'Adet', en: 'Qty' },
    kupon: { tr: 'İndirim kodu', en: 'Coupon code' },
    kuponUygula: { tr: 'Uygula', en: 'Apply' },
    araToplam: { tr: 'Ara toplam', en: 'Subtotal' },
    indirim: { tr: 'İndirim', en: 'Discount' },
    kargo: { tr: 'Kargo', en: 'Shipping' },
    genelToplam: { tr: 'Toplam', en: 'Total' },
    odemeyeGec: { tr: 'Ödemeye geç', en: 'Proceed to checkout' },
    odeme: { tr: 'Ödeme', en: 'Checkout' },
    teslimatAdresi: { tr: 'Teslimat adresi', en: 'Delivery address' },
    adresYok: { tr: 'Kayıtlı adresin yok. Aşağıdan ekleyebilirsin.', en: 'You have no saved address. Add one below.' },
    yeniAdres: { tr: 'Yeni adres ekle', en: 'Add a new address' },
    adresBaslik: { tr: 'Adres başlığı', en: 'Address label' },
    ulke: { tr: 'Ülke kodu', en: 'Country code' },
    sehir: { tr: 'Şehir', en: 'City' },
    adresSatiri: { tr: 'Adres', en: 'Address line' },
    postaKodu: { tr: 'Posta kodu', en: 'Postal code' },
    adresKaydet: { tr: 'Adresi kaydet', en: 'Save address' },
    odemeYontemi: { tr: 'Ödeme yöntemi', en: 'Payment method' },
    kart: { tr: 'Kredi / banka kartı', en: 'Credit / debit card' },
    havale: { tr: 'Havale / EFT', en: 'Bank transfer' },
    kapida: { tr: 'Kapıda ödeme', en: 'Cash on delivery' },
    kartNo: { tr: 'Kart numarası', en: 'Card number' },
    kartAd: { tr: 'Kart üzerindeki isim', en: 'Name on card' },
    sonKullanma: { tr: 'Son kullanma', en: 'Expiry' },
    siparisiOnayla: { tr: 'Siparişi onayla', en: 'Place order' },
    siparisOzeti: { tr: 'Sipariş özeti', en: 'Order summary' },
    basarisizSimule: {
        tr: 'Ödemeyi başarısız simüle et (test için)',
        en: 'Simulate a failed payment (for testing)',
    },
    basarisizAnlat: {
        tr: 'Ödeme reddedilir, sipariş oluşur ama ödenmemiş kalır. Başarısız ödeme yolunu test etmek için.',
        en: 'The payment is declined; the order is created but stays unpaid. For testing the failed-payment path.',
    },
    siparisAlindi: { tr: 'Siparişin alındı', en: 'Your order is placed' },
    siparisNo: { tr: 'Sipariş numarası', en: 'Order number' },
    siparisDurum: { tr: 'Durum', en: 'Status' },
    alisverisDevam: { tr: 'Alışverişe devam et', en: 'Continue shopping' },
    siparisleriGor: { tr: 'Siparişlerimi gör', en: 'View my orders' },
    siparisYok: { tr: 'Henüz siparişin yok.', en: 'You have no orders yet.' },
    girisGerekli: {
        tr: 'Sepete ürün eklemek için giriş yapman gerekiyor.',
        en: 'You need to sign in to add items to your cart.',
    },
    eposta: { tr: 'E-posta', en: 'Email' },
    parola: { tr: 'Parola', en: 'Password' },
    demoHesap: { tr: 'Demo hesap hazır — doğrudan giriş yapabilirsin.', en: 'A demo account is ready — you can sign in directly.' },
    kapat: { tr: 'Kapat', en: 'Close' },
    modTarayici: { tr: 'Tarayıcı modu · kurulum yok', en: 'Browser mode · no setup' },
    modYerel: { tr: 'Lokal API · localhost:4000', en: 'Local API · localhost:4000' },
    modYukleniyor: { tr: 'Bağlanıyor…', en: 'Connecting…' },
    modBaslik: { tr: 'Bu dükkân hangi veriyle çalışıyor?', en: 'What data is this shop running on?' },
    modTarayiciAnlat: {
        tr: 'Dükkân şu an tamamen tarayıcının içinde çalışıyor: veritabanı sekmende, istekler Service Worker üzerinden geçiyor. Hiçbir kurulum gerekmedi ve DevTools → Network sekmesinde her isteği gerçek status koduyla görebilirsin.',
        en: 'The shop is running entirely inside your browser: the database lives in your tab and requests pass through a Service Worker. No setup was needed, and you can see every request with its real status code in DevTools → Network.',
    },
    modTarayiciSinir: {
        tr: 'Sınırı: bu katmana DBeaver veya JDBC ile bağlanamazsın; Postman, Newman ve REST Assured de dışarıdan erişemez, çünkü veri yalnızca bu sekmede yaşıyor. Bunlar için Docker katmanı gerekiyor.',
        en: 'The limit: you cannot connect to this layer with DBeaver or JDBC, and Postman, Newman or REST Assured cannot reach it from outside, because the data lives only in this tab. Those need the Docker layer.',
    },
    modYerelAnlat: {
        tr: 'Kendi makinendeki stack ayakta, dükkân ona bağlandı. Aynı veriye DBeaver ile bağlanabilir, Postman ve REST Assured ile dışarıdan istek atabilirsin.',
        en: 'Your local stack is up and the shop connected to it. You can reach the same data with DBeaver and send requests from Postman or REST Assured.',
    },
    kurulumaGit: { tr: 'Gerçek veritabanı istiyorum → kurulum rehberi', en: 'I want a real database → setup guide' },
    alaniSifirla: { tr: 'Alanı sıfırla', en: 'Reset data' },

    // ── Teknik panel ──
    qaPaneli: { tr: 'QA paneli — bağlantı, defect\'ler, olay günlüğü', en: 'QA panel — connection, defects, event log' },
    qaPaneliAnlat: {
        tr: 'Buradan ötesi dükkânın müşterisine değil, testini yazan kişiye ait: bağlantı ayarı, kendi veri alanın, defect anahtarları ve her isteğin kaydı.',
        en: 'Beyond this point belongs to the person writing the tests, not the shopper: connection settings, your own data area, defect switches and the log of every request.',
    },
    baglanti: { tr: 'Bağlantı', en: 'Connection' },
    apiAdresi: { tr: 'API adresi', en: 'API address' },
    anahtar: { tr: 'Sandbox anahtarı', en: 'Sandbox key' },
    anahtarYok: { tr: 'Henüz anahtar yok', en: 'No key yet' },
    alanAc: { tr: 'Kendi alanımı aç', en: 'Open my own area' },
    sifirla: { tr: 'Veriyi sıfırla', en: 'Reset data' },
    baglantiKes: { tr: 'Anahtarı unut', en: 'Forget key' },
    anahtarGerekli: {
        tr: 'Yazma işlemleri için kendi veri alanını açman gerekiyor. Anahtarsız bağlantı demo verisine SALT OKUNUR erişir.',
        en: 'You need your own data area for write operations. Without a key you get READ-ONLY access to the demo data.',
    },
    ulasilamiyor: { tr: 'API\'ye ulaşılamıyor', en: 'Cannot reach the API' },
    ulasilamiyorNe: {
        tr: 'Stack ayakta değil ya da adres yanlış. Terminalde qa-shop klasörüne gir ve şu komutu ver:',
        en: 'The stack is not running or the address is wrong. Go to the qa-shop folder in a terminal and run:',
    },
    kurulumRehberi: { tr: 'Kurulum rehberini aç', en: 'Open the setup guide' },
    gunluk: { tr: 'Olay günlüğü', en: 'Event log' },
    gunlukBos: { tr: 'Henüz istek atılmadı', en: 'No requests yet' },
    temizle: { tr: 'Temizle', en: 'Clear' },
    testIpucu: { tr: 'Otomasyon ipucu', en: 'Automation tip' },
    testIpucuMetin: {
        tr: 'Bu sayfadaki her etkileşimli öğe kararlı bir data-testid taşır. Locator\'ı CSS sınıfına veya görünen metne bağlamak yerine onu kullan: metin dil değiştirince, sınıf ise tasarım değişince kırılır.',
        en: 'Every interactive element here carries a stable data-testid. Bind your locator to that instead of a CSS class or visible text: text breaks when the language changes, classes break when the design does.',
    },
    kusurlar: { tr: 'Defect anahtarları', en: 'Defect switches' },
    kusurNedir: {
        tr: 'Her anahtar sistemin gerçek bir yerinde gerçek bir defect açar. Bir testin gerçekten bir şeye baktığını kanıtlamanın tek yolu, defect\'i bilerek üretip testin KIRMIZIYA döndüğünü görmektir: anahtarı aç, testini koş, yakalayıp yakalamadığına bak.',
        en: 'Each switch opens a real defect in a real part of the system. The only way to prove a test actually checks something is to inject the defect on purpose and watch the test turn RED: flip the switch, run your test, see whether it catches it.',
    },
    kusurAnahtarGerekli: {
        tr: 'Defect\'ler yalnızca kendi veri alanında açılabilir. Yukarıdan "Kendi alanımı aç" düğmesine bas; demo verisi salt okunurdur, açtığın defect başka hiç kimseyi etkilemez.',
        en: 'Defects can only be opened in your own data area. Use the "Open my own area" button above; the demo data is read-only, so a defect you open never affects anyone else.',
    },
    gizliTur: { tr: 'Gizli tur', en: 'Hidden round' },
    gizliTurBaslat: { tr: 'Gizli tur başlat', en: 'Start a hidden round' },
    gizliTurYeni: { tr: 'Yeni gizli tur', en: 'New hidden round' },
    gizliTurAnlat: {
        tr: 'Adını bilerek açtığın defect "testim kırmızıya dönüyor mu?" sorusunu cevaplar. Gizli tur başka bir soru sorar: defect\'i BULABİLİYOR musun? Sistem birkaç defect açar, hangileri olduğunu söylemez. Sahada da kimse söylemez.',
        en: 'A defect you switch on by name answers one question: does my test turn red? A hidden round asks a different one: can you FIND the defect? The system turns a few on and does not say which. On the job, nobody says either.',
    },
    gizliTurAcik: {
        tr: 'Bu alanda {n} defect açık. Hangileri olduğu SÖYLENMİYOR — testlerinle bul. Aşağıdaki liste av listendir: on ihtimal, {n} tanesi canlı.',
        en: '{n} defects are live in this area. Which ones is NOT disclosed — hunt them with your tests. The list below is your hunting list: ten candidates, {n} of them live.',
    },
    gizliTurSayi: { tr: 'Kaç defect', en: 'How many' },
    cevabiGoster: { tr: 'Cevabı göster', en: 'Reveal the answer' },
    cevapBasligi: { tr: 'Açık olan defect\'ler', en: 'The live defects were' },
    cevapNot: {
        tr: 'Kaçırdığın her defect, onu yakalaması gereken kontrolün henüz yazılmadığı anlamına gelir. Defect\'ler hâlâ açık; kapatmak için "Hepsini kapat" ya da "Veriyi sıfırla".',
        en: 'Every defect you missed means the check that should have caught it is not written yet. The defects are still on; use "Turn all off" or "Reset data" to clear them.',
    },
    gizliTurKilit: {
        tr: 'Gizli tur sürerken anahtarlar tek tek açılıp kapatılamaz — öyle olsaydı cevap deneme yanılmayla bulunurdu.',
        en: 'Switches cannot be flipped one by one during a hidden round — otherwise the answer could be found by trial and error.',
    },
    avSeridi: {
        tr: 'Bu dükkânda {n} defect canlı. Hangileri olduğu söylenmiyor.',
        en: '{n} defects are live in this shop. Which ones is not disclosed.',
    },
    avSeridiNe: {
        tr: 'Sipariş ver, kupon dene, stoğu zorla. Beklediğinden başka bir şey olduğunda not al — bulgunu sonra kendin doğrulayacaksın.',
        en: 'Place an order, try a coupon, push the stock. When something differs from what you expected, write it down — you will verify your own finding later.',
    },
    avSeridiPanel: { tr: 'Av panelini aç', en: 'Open the hunt panel' },
    avOtomatikNot: {
        tr: 'Kendi veri alanın açıldı ve içine {n} defect yerleştirildi. Hangileri olduğu söylenmez; testlerinle bul.',
        en: 'Your own data area is ready and {n} defects were planted in it. Which ones is not disclosed; find them with your tests.',
    },
    adliListeAc: { tr: 'Adlı listeyi göster', en: 'Show the named list' },
    adliListeKapat: { tr: 'Adlı listeyi gizle', en: 'Hide the named list' },
    adliListeUyari: {
        tr: 'Bu liste on defect\'in tamamını adıyla ve anahtarıyla gösterir. Av sürerken açman gerekmez — defect\'i arayarak bulmak, listeden okumaktan daha çok öğretir.',
        en: 'This list shows all ten defects by name and switch. You do not need it during a hunt — finding a defect by searching teaches more than reading it from a list.',
    },
    ipucuAc: { tr: 'Hangi kontrol yakalar?', en: 'Which check catches it?' },
    ogrenmeModu: { tr: 'Adlı anahtarlar (öğrenme modu)', en: 'Named switches (learning mode)' },
    kusurAcik: { tr: 'açık', en: 'on' },
    kusurKapali: { tr: 'kapalı', en: 'off' },
    kusurAc: { tr: 'Aç', en: 'Turn on' },
    kusurKapat: { tr: 'Kapat', en: 'Turn off' },
    kusurHepsiniKapat: { tr: 'Hepsini kapat', en: 'Turn all off' },
    kusurNeyiBozar: { tr: 'Neyi bozar', en: 'What it breaks' },
    kusurNeYakalar: { tr: 'Hangi kontrol yakalar', en: 'Which check catches it' },
    kusurAcikSayisi: { tr: 'açık defect', en: 'active' },
    kusurYok: { tr: 'Hepsi kapalı — sistem kurallara uyuyor.', en: 'All off — the system follows its rules.' },
    kusurUyari: {
        tr: 'Defect açıkken bu dükkân bilerek yanlış davranır. Sıfırlama hepsini kapatır.',
        en: 'While a defect is on, this shop misbehaves on purpose. A reset turns them all off.',
    },
}

// ─── Küçük yardımcılar ──────────────────────────────────────────────────────

const para = (n) => `${Number(n ?? 0).toFixed(2)} TL`

const DURUM_RENK = {
    placed: 'bg-sky-500/20 text-sky-300',
    paid: 'bg-emerald-500/20 text-emerald-300',
    shipped: 'bg-indigo-500/20 text-indigo-300',
    delivered: 'bg-teal-500/20 text-teal-300',
    cancelled: 'bg-rose-500/20 text-rose-300',
    returned: 'bg-amber-500/20 text-amber-300',
}

function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const max = Math.max(1, scrollHeight - clientHeight)
            setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)))
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div className="fixed left-0 right-0 top-0 z-[9999] h-[3px] bg-transparent">
            <div className="h-full transition-[width] duration-100"
                 style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #0ea5e9, #14b8a6)' }} />
        </div>
    )
}

function useDarkModeState() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved ? JSON.parse(saved) : true
    })
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.classList.toggle('dark', darkMode)
    }, [darkMode])
    return [darkMode, setDarkMode]
}

// ════════════════════════════════════════════════════════════════════════════

export default function QaShopPage() {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const [darkMode, setDarkMode] = useDarkModeState()

    // ── Bağlantı ve oturum ───────────────────────────────────────────────────
    const [apiBase, setApiBase] = useState(() => localStorage.getItem(DEPO_ADRES) || VARSAYILAN_API)
    const [sandboxKey, setSandboxKey] = useState(() => localStorage.getItem(DEPO_ANAHTARI) || '')
    const [token, setToken] = useState(() => localStorage.getItem(DEPO_TOKEN) || '')
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (token) localStorage.setItem(DEPO_TOKEN, token)
        else localStorage.removeItem(DEPO_TOKEN)
    }, [token])

    // Supabase üyesi → otomatik QA Shop girişi
    // Supabase token localStorage'da varsa (site üyesi), QA Shop sandbox'ı
    // otomatik oluştur ve giriş yap. Yoksa manuel giriş akışı devam eder.
    useEffect(() => {
        const trySupabaseBridge = async () => {
            if (token) return // Zaten giriş yapmışsa, tekrar yapma

            try {
                // Supabase token'ı kontrol et
                const supabaseToken = localStorage.getItem('sb-token')
                const supabaseUser = localStorage.getItem('sb-user-email')
                const supabaseUserName = localStorage.getItem('sb-user-name')

                if (!supabaseToken || !supabaseUser || !supabaseUserName) return

                // Bridge endpoint'i çağır
                const res = await fetch(`${apiBase}/api/v1/auth/supabase-bridge`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        supabaseToken,
                        userEmail: supabaseUser,
                        userName: supabaseUserName,
                    }),
                })

                if (!res.ok) return // Başarısız olursa, manuel giriş

                const data = await res.json()
                setToken(data.token)
                setSandboxKey(data.sandboxId)
                setUser({ email: supabaseUser, name: supabaseUserName })
            } catch (e) {
                // Hata olsa bile devam et — manuel giriş yapabilir
                console.debug('Supabase bridge failed (normal), manual login available')
            }
        }

        if (apiBase) trySupabaseBridge()
    }, [apiBase])

    const [saglik, setSaglik] = useState('bilinmiyor')   // bilinmiyor | ok | kapali
    // mod: 'yukleniyor' | 'tarayici' | 'yerel'
    const [mod, setMod] = useState('yukleniyor')
    const [modAcik, setModAcik] = useState(false)

    // Şartname modu: dükkân öğelerini user story'lere bağlar. Varsayılan
    // KAPALI — açıkken bile ipucu katmanı tıklama kesmez (bkz. QaShopStoryIpucu).
    const { aktif: storyModu, setAktif: setStoryModu, storyler } = useStoryModu()
    const sp = { storyler, aktif: storyModu, isTr, darkMode }
    const [mesgul, setMesgul] = useState(false)
    const [mesaj, setMesaj] = useState(null)

    // ── Mağaza ───────────────────────────────────────────────────────────────
    const [gorunum, setGorunum] = useState('katalog')
    const [urunler, setUrunler] = useState([])
    const [toplamUrun, setToplamUrun] = useState(0)
    const [kategoriler, setKategoriler] = useState([])
    const [aktifKategori, setAktifKategori] = useState('')
    const [arama, setArama] = useState('')
    const [aramaGirdi, setAramaGirdi] = useState('')
    const [siralama, setSiralama] = useState('price:asc')

    const [secilenUrun, setSecilenUrun] = useState(null)
    const [detayVaryantlar, setDetayVaryantlar] = useState([])
    const [secilenVaryant, setSecilenVaryant] = useState(null)
    const [yorumlar, setYorumlar] = useState([])

    const [cart, setCart] = useState(null)
    const [kuponGirdi, setKuponGirdi] = useState('')
    const [siparisler, setSiparisler] = useState([])
    const [sonSiparis, setSonSiparis] = useState(null)

    // ── Ödeme ────────────────────────────────────────────────────────────────
    const [adresler, setAdresler] = useState([])
    const [secilenAdres, setSecilenAdres] = useState(null)
    const [yeniAdres, setYeniAdres] = useState({ label: 'Ev', line1: '', city: '', postal_code: '', country: 'TR' })
    const [odemeYontemi, setOdemeYontemi] = useState('card')
    const [odemeBasarisiz, setOdemeBasarisiz] = useState(false)

    // ── Giriş kutusu ─────────────────────────────────────────────────────────
    const [girisAcik, setGirisAcik] = useState(false)
    const [epostaGirdi, setEpostaGirdi] = useState('demo@qashop.test')
    const [parolaGirdi, setParolaGirdi] = useState('Password123!')

    // ── Defect'ler ─────────────────────────────────────────────────────────────
    const [kusurlar, setKusurlar] = useState([])
    const [kusurModu, setKusurModu] = useState('demo-readonly')
    const [kusurGizli, setKusurGizli] = useState(false)
    const [gizliSayi, setGizliSayi] = useState(0)
    const [gizliAdet, setGizliAdet] = useState(VARSAYILAN_AV_ADEDI)
    const [cevap, setCevap] = useState(null)
    // Adlı defect listesi CEVAP ANAHTARIDIR: on defect'i adıyla, anahtarıyla ve
    // hangi kontrolün yakalayacağıyla gösterir. Varsayılan olarak kapalıdır —
    // görünür durması, aramayı okumaya çevirir. Açmak kullanıcının kararı.
    const [adliListe, setAdliListe] = useState(false)
    // Otomatik av turu alan başına BİR kez denenir.
    const avDenendi = useRef(false)
    // Av şeridindeki düğme, varsayılan kapalı gelen QA panelini açar.
    const qaPaneliRef = useRef(null)

    // ── Günlük ───────────────────────────────────────────────────────────────
    const [gunluk, setGunluk] = useState([])
    const gunlukSayac = useRef(0)

    // Tarayıcı modunda istek AYNI KÖKENE, `/api/v1` yoluna gider — lokal
    // Docker API'siyle birebir aynı yol. Kullanıcı iki modda da DevTools'ta
    // aynı path'i görür; tek fark host sütunudur.
    const api = mod === 'tarayici'
        ? '/api/v1'
        : `${apiBase.replace(/\/+$/, '')}/api/v1`

    // ── Tek giriş noktası: her istek buradan geçer ve günlüğe düşer ──────────
    const istek = useCallback(async (yol, secenekler = {}) => {
        const { method = 'GET', body, auth = false, anahtar } = secenekler
        const baslangic = performance.now()
        const headers = {}
        if (body !== undefined) headers['Content-Type'] = 'application/json'
        // `anahtar` acikca gecildiginde state'teki degeri EZER: alan yeni
        // acildiysa state henuz guncellenmemis olur (useCallback kapanisi
        // bir sonraki render'a kadar eski degeri tasir).
        const kullanilacakAnahtar = anahtar ?? sandboxKey
        if (kullanilacakAnahtar) headers['X-Sandbox-Key'] = kullanilacakAnahtar
        if (auth && token) headers.Authorization = `Bearer ${token}`

        let res, govde
        try {
            res = await fetch(`${api}${yol}`, {
                method, headers,
                body: body === undefined ? undefined : JSON.stringify(body),
            })
        } catch (err) {
            setSaglik('kapali')
            // ⚠ Kayıt numarası güncelleyicinin İÇİNDE okunmaz, ÖNCE yakalanır.
            // Ölçüldü: içeride okununca iki eşzamanlı istek aynı id'yi alıyordu
            // (6 iki kez, 5 hiç yok) — çünkü React güncelleyiciyi sıraya alıp
            // sonra çalıştırdığında ref başka bir istek tarafından çoktan
            // artırılmış oluyor. Sonuç: React "iki çocuk aynı key" uyarısı ve
            // konsolda kalıcı hata.
            gunlukSayac.current += 1
            const kayitId = gunlukSayac.current
            setGunluk((g) => [{ id: kayitId, method, yol, durum: '—', sure: 0, hata: err.message }, ...g].slice(0, 40))
            return { ok: false, agKopuk: true }
        }

        const sure = Math.round(performance.now() - baslangic)
        try { govde = res.status === 204 ? null : await res.json() } catch { govde = null }

        gunlukSayac.current += 1
        const kayitId = gunlukSayac.current
        setGunluk((g) => [{
            id: kayitId, method, yol,
            durum: res.status, sure,
            hataKodu: govde?.error?.code ?? null,
            correlationId: res.headers.get('X-Correlation-Id'),
        }, ...g].slice(0, 40))

        setSaglik('ok')
        return { ok: res.ok, status: res.status, govde }
    }, [api, sandboxKey, token])

    const hataGoster = (sonuc, varsayilan) => {
        if (sonuc.agKopuk) return
        const kod = sonuc.govde?.error?.code
        const metin = sonuc.govde?.error?.message || varsayilan
        setMesaj({ tip: 'hata', metin: kod ? `${kod} — ${metin}` : metin })
    }

    // ── Sağlık ve katalog ────────────────────────────────────────────────────
    // Mod tespiti: lokal stack KISA bir timeout ile yoklanır.
    //
    // Ayaktaysa lokal API modu (gerçek Postgres, dışarıdan erişilebilir).
    // Değilse tarayıcı modu SESSİZCE ve ANINDA devreye girer — hata ekranı
    // gösterilmez. Docker kurmamış ziyaretçi için burası bir arıza değil,
    // normal çalışma hâlidir.
    const saglikKontrol = useCallback(async () => {
        const kontrolcu = new AbortController()
        const zaman = setTimeout(() => kontrolcu.abort(), 1200)
        try {
            const res = await fetch(`${apiBase.replace(/\/+$/, '')}/health`, { signal: kontrolcu.signal })
            const b = await res.json()
            if (res.ok && b.database === 'up') {
                setSaglik('ok'); setMod('yerel'); return
            }
            throw new Error('saglik degil')
        } catch {
            const basladi = await tarayiciModunuBaslat()
            setMod(basladi ? 'tarayici' : 'yerel')
            setSaglik(basladi ? 'ok' : 'kapali')
        } finally {
            clearTimeout(zaman)
        }
    }, [apiBase])

    const urunleriYukle = useCallback(async () => {
        const [alan, yon] = siralama.split(':')
        const q = new URLSearchParams({ size: '24', sort: alan, order: yon })
        if (arama.trim().length >= 2) q.set('q', arama.trim())
        const yol = aktifKategori
            ? `/categories/${aktifKategori}/products?${q}`
            : `/products?${q}`
        const sonuc = await istek(yol)
        if (sonuc.ok) {
            setUrunler(sonuc.govde.items ?? [])
            setToplamUrun(sonuc.govde.total ?? 0)
        }
    }, [istek, siralama, arama, aktifKategori])

    const kategorileriYukle = useCallback(async () => {
        const sonuc = await istek('/categories')
        if (!sonuc.ok) return
        // Yalnızca ürünü OLAN alt kategoriler gösterilir: boş bir kategori
        // sekmesine basan kullanıcı boş vitrin görür ve bunu hata sanır.
        const duz = []
        const gez = (c) => { if (c.product_count > 0) duz.push(c); (c.children ?? []).forEach(gez) }
        ;(sonuc.govde.categories ?? []).forEach(gez)
        setKategoriler(duz)
    }, [istek])

    const kusurlariYukle = useCallback(async () => {
        const sonuc = await istek('/sandbox/bugs')
        if (!sonuc.ok) return
        setKusurlar(sonuc.govde?.available ?? [])
        setKusurModu(sonuc.govde?.mode ?? 'demo-readonly')
        // Gizli turda sunucu `enabled` alanını HİÇ göndermez; arayüz de
        // bilmediği için gösteremez. Cevap tarayıcıda hiçbir yerde durmaz.
        setKusurGizli(sonuc.govde?.hidden === true)
        setGizliSayi(sonuc.govde?.hiddenCount ?? 0)
    }, [istek])

    useEffect(() => { saglikKontrol() }, [saglikKontrol])
    useEffect(() => { urunleriYukle() }, [urunleriYukle])
    useEffect(() => { kategorileriYukle() }, [kategorileriYukle])
    useEffect(() => { kusurlariYukle() }, [kusurlariYukle])

    // ── Sandbox ──────────────────────────────────────────────────────────────
    // Alan açma. `sessiz` true ise kullanıcıya bildirim gösterilmez —
    // otomatik açılışta "alanın açıldı" bildirimi, kullanıcının istemediği
    // bir işlemi duyurmak olurdu.
    const alanAc = async ({ sessiz = false } = {}) => {
        if (!sessiz) setMesgul(true)
        const res = await fetch(`${api}/sandbox`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label: 'ui-pratigi' }),
        }).catch(() => null)
        if (!sessiz) setMesgul(false)
        if (!res || !res.ok) { setSaglik('kapali'); return null }
        const b = await res.json()
        setSandboxKey(b.apiKey)
        localStorage.setItem(DEPO_ANAHTARI, b.apiKey)
        if (!sessiz) {
            setMesaj({
                tip: 'basari',
                metin: isTr
                    ? `Kendi alanın açıldı. Demo hesap: ${b.demoUser.email} / ${b.demoUser.password}`
                    : `Your area is ready. Demo account: ${b.demoUser.email} / ${b.demoUser.password}`,
            })
        }
        return b.apiKey
    }

    // Yazma yapmadan önce kendi veri alanının VAR OLDUĞUNU garanti eder.
    //
    // NEDEN GEREKLİ (ölçüldü): lokal API modunda `POST /auth/login` sunucuda
    // `requireWritableSandbox` arkasında. Anahtarsız istek 401 döner:
    //   "Demo verisi salt okunurdur. Kendi alanını aç: POST /api/v1/sandbox"
    // Yani kullanıcı QA panelini açıp "Kendi alanımı aç" demeden giriş
    // YAPAMIYORDU — dükkâna gelen biri bu paneli aramak zorunda kalıyordu.
    //
    // Alan açmak ücretsiz ve kayıt istemiyor; sürtünme yaratmasının hiçbir
    // karşılığı yok. Bu yüzden ilk yazma denemesinde sessizce açılır. QA
    // panelindeki düğme elle kontrol olarak kalır.
    //
    // Tarayıcı modunda gerekmez: orada veri alanı zaten kişiye özeldir.
    const alanSagla = async () => {
        if (mod === 'tarayici' || sandboxKey) return sandboxKey || null
        return alanAc({ sessiz: true })
    }

    const veriSifirla = async () => {
        const sonuc = await istek('/sandbox/reset', { method: 'POST' })
        if (sonuc.ok) {
            setCart(null); setSiparisler([]); setToken(''); setUser(null)
            setCevap(null); setKusurGizli(false)
            setMesaj({ tip: 'basari', metin: isTr
                ? 'Veri seed haline döndü. Açık oturumlar kapandı, tekrar giriş gerekiyor.'
                : 'Data is back to the seed state. Sessions were revoked, sign in again.' })
            urunleriYukle(); kusurlariYukle()
        } else hataGoster(sonuc, 'reset')
    }

    const anahtariUnut = () => {
        setSandboxKey(''); setToken(''); setUser(null); setCart(null); setSiparisler([])
        localStorage.removeItem(DEPO_ANAHTARI)
        setKusurlar([]); setKusurModu('demo-readonly'); setKusurGizli(false); setCevap(null)
    }

    // ── Defect anahtarları ────────────────────────────────────────────────────
    const kusurDegistir = async (anahtar, yeniDeger) => {
        const sonuc = await istek('/sandbox/bugs', { method: 'PATCH', body: { [anahtar]: yeniDeger } })
        if (!sonuc.ok) { hataGoster(sonuc, anahtar); return }
        const flags = sonuc.govde?.flags ?? {}
        setKusurlar((liste) => liste.map((k) => ({ ...k, enabled: flags[k.key] === true })))
        setMesaj({
            tip: yeniDeger ? 'hata' : 'basari',
            metin: yeniDeger
                ? `${isTr ? 'Defect açıldı' : 'Defect on'}: ${anahtar} — ${tx(M.kusurUyari, isTr)}`
                : `${isTr ? 'Defect kapatıldı' : 'Defect off'}: ${anahtar}`,
        })
    }

    const kusurlariKapat = async () => {
        const acik = kusurlar.filter((k) => k.enabled).map((k) => k.key)
        if (!acik.length) return
        const sonuc = await istek('/sandbox/bugs', { method: 'PATCH', body: Object.fromEntries(acik.map((k) => [k, false])) })
        if (!sonuc.ok) { hataGoster(sonuc, 'bugs'); return }
        const flags = sonuc.govde?.flags ?? {}
        setKusurlar((liste) => liste.map((k) => ({ ...k, enabled: flags[k.key] === true })))
        setCevap(null)
        setMesaj({ tip: 'basari', metin: tx(M.kusurYok, isTr) })
    }

    // "otomatik" bayrağı YALNIZCA dükkânın kendiliğinden açtığı ilk turda
    // true olur. Düğmeye basıldığında React olay nesnesi geçer ve ondan böyle
    // bir alan çıkmaz; yani elle başlatılan tur her zaman kullanıcının
    // seçtiği adedi kullanır.
    const gizliTurBaslat = async ({ otomatik = false } = {}) => {
        const adet = otomatik ? VARSAYILAN_AV_ADEDI : gizliAdet
        const sonuc = await istek('/sandbox/bugs/hidden', { method: 'POST', body: { count: adet } })
        // Otomatik tur sessizce başarısız olur: kullanıcı bunu istemedi, bu
        // yüzden anlamadığı bir hata mesajıyla karşılaşmamalı.
        if (!sonuc.ok) { if (!otomatik) hataGoster(sonuc, 'hidden'); return }
        const canli = sonuc.govde?.hiddenCount ?? adet
        setCevap(null); setKusurGizli(true)
        setGizliSayi(canli)
        kusurlariYukle()
        setMesaj({
            tip: 'hata',
            metin: otomatik
                ? tx(M.avOtomatikNot, isTr).replaceAll('{n}', String(canli))
                : (sonuc.govde?.message ?? tx(M.gizliTur, isTr)),
        })
    }

    const cevabiGoster = async () => {
        const sonuc = await istek('/sandbox/bugs/reveal', { method: 'POST' })
        if (!sonuc.ok) { hataGoster(sonuc, 'reveal'); return }
        setCevap(sonuc.govde?.active ?? [])
        setKusurGizli(false)
        kusurlariYukle()
    }

    // ── Kimlik ───────────────────────────────────────────────────────────────

    // Anahtarın ARTIK GEÇERLİ OLMADIĞINI söyleyen cevaplar.
    //
    // Sandbox anahtarı tarayıcıda saklanıyor ve ömrü var: 7 gün sonra sunucu
    // 410 döner, veri temizlendiyse 401. İkisinde de elimizdeki anahtar
    // çöptür — ama `alanSagla()` "anahtar var" diye erken döndüğü için
    // kullanıcı sonsuza kadar giriş yapamaz hâle gelirdi. Tek çare anahtarı
    // atıp yenisini almak.
    const anahtarOlmus = (sonuc) => {
        if (sonuc.status === 410) return true
        if (sonuc.status !== 401) return false
        const mesaj = sonuc.govde?.error?.message ?? ''
        return /X-Sandbox-Key|sandbox/i.test(mesaj)
    }

    const girisYap = async (e) => {
        e.preventDefault()
        setMesgul(true)

        const dene = async (anahtar) => istek('/auth/login', {
            method: 'POST', body: { email: epostaGirdi, password: parolaGirdi }, anahtar,
        })

        // Anahtar yeni açıldıysa state'e yazılması bir sonraki render'a kalır;
        // bu yüzden isteğe ACIKCA geçilir.
        let anahtar = await alanSagla()
        let sonuc = await dene(anahtar)

        // Bayat anahtar: bir kez temizleyip yeniden dene. "Bir kez" bilinçli —
        // döngüye girip kullanıcıyı bekletmek yerine ikinci denemede de
        // başarısızsa gerçek hatayı göstermek doğru.
        if (!sonuc.ok && anahtarOlmus(sonuc)) {
            setSandboxKey('')
            localStorage.removeItem(DEPO_ANAHTARI)
            anahtar = await alanAc({ sessiz: true })
            if (anahtar) sonuc = await dene(anahtar)
        }

        setMesgul(false)
        if (sonuc.ok) {
            setToken(sonuc.govde.token)
            setUser({ email: epostaGirdi })
            setGirisAcik(false)
            setMesaj({ tip: 'basari', metin: isTr ? 'Giriş yapıldı.' : 'Signed in.' })
        } else hataGoster(sonuc, isTr ? 'Giriş başarısız' : 'Sign-in failed')
    }

    const cikisYap = async () => {
        await istek('/auth/logout', { method: 'POST', auth: true })
        localStorage.removeItem(DEPO_TOKEN)
        oturumGeriYuklendi.current = false
        setToken(''); setUser(null); setCart(null); setSiparisler([]); setGorunum('katalog')
    }

    // ── Ürün detayı ──────────────────────────────────────────────────────────
    const urunAc = async (urun) => {
        setSecilenUrun(urun); setSecilenVaryant(null); setDetayVaryantlar([]); setYorumlar([])
        setGorunum('urun')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        const [v, y] = await Promise.all([
            istek(`/products/${urun.id}/variants`),
            istek(`/products/${urun.id}/reviews`),
        ])
        if (v.ok) {
            const liste = v.govde.variants ?? []
            setDetayVaryantlar(liste)
            // İlk SATILABİLİR varyant otomatik seçilir: gerçek dükkânlarda da
            // beden seçili gelir, kullanıcı hiçbir şey seçmeden fiyat görür.
            setSecilenVaryant(liste.find((x) => x.available > 0) ?? liste[0] ?? null)
        }
        if (y.ok) setYorumlar(y.govde.items ?? [])
    }

    // ── Sepet ────────────────────────────────────────────────────────────────
    const sepetGetirVeyaAc = async () => {
        if (cart?.cart?.id) return cart.cart.id
        const sonuc = await istek('/carts', { method: 'POST', auth: true })
        if (!sonuc.ok) { hataGoster(sonuc, 'cart'); return null }
        setCart(sonuc.govde)
        return sonuc.govde.cart.id
    }

    const sepeteEkle = async (variantId, qty = 1) => {
        if (!token) { setGirisAcik(true); setMesaj({ tip: 'hata', metin: tx(M.girisGerekli, isTr) }); return }
        setMesgul(true)
        const cartId = await sepetGetirVeyaAc()
        if (!cartId) { setMesgul(false); return }
        const sonuc = await istek(`/carts/${cartId}/items`, { method: 'POST', auth: true, body: { variantId, qty } })
        setMesgul(false)
        if (sonuc.ok) {
            setCart(sonuc.govde)
            setMesaj({ tip: 'basari', metin: isTr
                ? 'Sepete eklendi. Bu hareket stoğu REZERVE etti — henüz düşürmedi.'
                : 'Added to cart. This action RESERVED stock — it has not decremented it yet.' })
            if (secilenUrun) {
                const v = await istek(`/products/${secilenUrun.id}/variants`)
                if (v.ok) {
                    const liste = v.govde.variants ?? []
                    setDetayVaryantlar(liste)
                    setSecilenVaryant((s) => liste.find((x) => x.id === s?.id) ?? s)
                }
            }
        } else hataGoster(sonuc, isTr ? 'Sepete eklenemedi' : 'Could not add to cart')
    }

    // Vitrinden hızlı ekleme: ilk satılabilir varyantı bulur. Gerçek
    // dükkânlarda da kart üstünden ekleme bedeni kendisi seçer.
    const hizliEkle = async (urun) => {
        if (!token) { setGirisAcik(true); setMesaj({ tip: 'hata', metin: tx(M.girisGerekli, isTr) }); return }
        const v = await istek(`/products/${urun.id}/variants`)
        if (!v.ok) return
        const uygun = (v.govde.variants ?? []).find((x) => x.available > 0)
        if (!uygun) { setMesaj({ tip: 'hata', metin: tx(M.tukendi, isTr) }); return }
        await sepeteEkle(uygun.id, 1)
    }

    const adetDegistir = async (itemId, yeniAdet) => {
        const cartId = cart?.cart?.id
        if (!cartId || yeniAdet < 1) return
        const sonuc = await istek(`/carts/${cartId}/items/${itemId}`, { method: 'PATCH', auth: true, body: { qty: yeniAdet } })
        if (sonuc.ok) setCart(sonuc.govde)
        else hataGoster(sonuc, 'qty')
    }

    const satirSil = async (itemId) => {
        const cartId = cart?.cart?.id
        if (!cartId) return
        const sonuc = await istek(`/carts/${cartId}/items/${itemId}`, { method: 'DELETE', auth: true })
        if (sonuc.ok || sonuc.status === 204) {
            const yeni = await istek(`/carts/${cartId}`, { auth: true })
            if (yeni.ok) setCart(yeni.govde)
        } else hataGoster(sonuc, 'delete')
    }

    const kuponUygula = async (e) => {
        e.preventDefault()
        const cartId = cart?.cart?.id
        if (!cartId) return
        const sonuc = await istek(`/carts/${cartId}/coupon`, { method: 'POST', auth: true, body: { code: kuponGirdi } })
        if (sonuc.ok) { setCart(sonuc.govde); setMesaj({ tip: 'basari', metin: isTr ? 'Kupon uygulandı.' : 'Coupon applied.' }) }
        else hataGoster(sonuc, isTr ? 'Kupon geçersiz' : 'Invalid coupon')
    }

    // ── Adres ────────────────────────────────────────────────────────────────
    const adresleriYukle = useCallback(async () => {
        if (!token) return
        const sonuc = await istek('/addresses', { auth: true })
        if (!sonuc.ok) return
        const liste = sonuc.govde.items ?? sonuc.govde.addresses ?? []
        setAdresler(liste)
        setSecilenAdres((s) => s ?? liste.find((a) => a.is_default) ?? liste[0] ?? null)
    }, [istek, token])

    const adresKaydet = async (e) => {
        e.preventDefault()
        const sonuc = await istek('/addresses', { method: 'POST', auth: true, body: yeniAdres })
        if (sonuc.ok) {
            setMesaj({ tip: 'basari', metin: isTr ? 'Adres kaydedildi.' : 'Address saved.' })
            setYeniAdres({ label: 'Ev', line1: '', city: '', postal_code: '', country: 'TR' })
            adresleriYukle()
        } else hataGoster(sonuc, isTr ? 'Adres kaydedilemedi' : 'Could not save the address')
    }

    // ── Sipariş ──────────────────────────────────────────────────────────────
    const siparisleriYukle = useCallback(async () => {
        if (!token) { setSiparisler([]); return }
        const sonuc = await istek('/orders?size=10', { auth: true })
        if (sonuc.ok) setSiparisler(sonuc.govde.items ?? [])
    }, [istek, token])

    // Açılışta oturumu geri yükle: saklanan token hâlâ geçerliyse kullanıcı
    // ve açık sepeti geri gelir. Geçersizse (sıfırlama sonrası) sessizce
    // temizlenir — kullanıcıya "oturumun düştü" demek yerine giriş kutusu
    // gösterilir.
    // ⚠ `user` BİLEREK bağımlılık listesinde değil ve iş bir ref ile bir kez
    // kilitleniyor. İlk sürümde effect kendi içinde `setUser` çağırıyor ve
    // `user` bağımlılığı yüzünden yeniden koşarken temizleyicisi kendini
    // iptal ediyordu: oturum geri geliyor ama sepet asla gelmiyordu.
    const oturumGeriYuklendi = useRef(false)
    useEffect(() => {
        if (!token || mod === 'yukleniyor' || oturumGeriYuklendi.current) return
        oturumGeriYuklendi.current = true
        ;(async () => {
            const ben = await istek('/auth/me', { auth: true })
            if (!ben.ok) { setToken(''); oturumGeriYuklendi.current = false; return }
            setUser({ email: ben.govde?.user?.email ?? '' })
            const sepet = await istek('/carts', { method: 'POST', auth: true })
            if (sepet.ok) setCart(sepet.govde)
        })()
    }, [token, mod, istek])

    useEffect(() => { siparisleriYukle() }, [siparisleriYukle])
    useEffect(() => { adresleriYukle() }, [adresleriYukle])

    // Sipariş oluşturma ve ödeme AYRI iki uçtur; arayüz ikisini arka arkaya
    // çağırır çünkü kullanıcı için tek bir eylemdir. Olay günlüğünde iki satır
    // görünür — arayüzdeki bir düğmenin API'de kaç çağrıya döndüğü tam olarak
    // burada somutlaşır.
    const siparisiOnayla = async () => {
        const cartId = cart?.cart?.id
        if (!cartId) return
        setMesgul(true)
        const olustur = await istek('/orders', { method: 'POST', auth: true, body: { cartId } })
        if (!olustur.ok) { setMesgul(false); hataGoster(olustur, isTr ? 'Sipariş oluşturulamadı' : 'Could not create the order'); return }

        const siparis = olustur.govde.order
        const ode = await istek(`/orders/${siparis.id}/pay`, {
            method: 'POST', auth: true,
            body: { method: odemeYontemi, simulateFailure: odemeBasarisiz || undefined },
        })
        setMesgul(false)

        setCart(null)
        // Onay ekrani ODEME cevabindaki siparisi gosterir, olusturma
        // cevabindakini DEGIL: olusturma aninda durum 'placed'tir, odeme onu
        // 'paid'e tasir. Ilk cevaba guvenilseydi ekran veritabaniyla celisir
        // ve kullanici odemesinin gecmedigini sanirdi.
        const guncelSiparis = ode.ok ? (ode.govde?.order ?? siparis) : siparis
        setSonSiparis({ ...guncelSiparis, odeme: ode.ok ? ode.govde?.payment : null, odemeHatasi: !ode.ok })
        setGorunum('onay')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        siparisleriYukle()
        urunleriYukle()
    }

    const siparisEylem = async (orderId, eylem) => {
        const sonuc = await istek(`/orders/${orderId}/${eylem}`, {
            method: 'POST', auth: true,
            body: eylem === 'pay' ? { method: 'card' } : undefined,
        })
        if (sonuc.ok) {
            setMesaj({ tip: 'basari', metin: `${eylem} → ${sonuc.govde.order?.status ?? 'ok'}` })
            siparisleriYukle()
        } else hataGoster(sonuc, eylem)
    }

    // ── Görsel kabuk ─────────────────────────────────────────────────────────
    const shell = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
    const input = `min-h-[36px] w-full rounded-lg border px-3 py-2 text-base md:text-sm ${
        darkMode ? 'border-slate-700 bg-slate-800 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`
    const btn = 'min-h-[36px] rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-50'
    const btnBirincil = `${btn} bg-indigo-600 text-white hover:bg-indigo-500`
    const btnIkincil = `${btn} ${darkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`
    const btnSatis = `${btn} bg-orange-600 text-white hover:bg-orange-500`

    const sepetAdet = (cart?.items ?? []).reduce((t, i) => t + Number(i.qty ?? 0), 0)
    // Tarayıcı modunda ayrı bir anahtar almaya gerek yok: alan zaten kişiye özel.
    const kusurYazilabilir = mod === 'tarayici' || kusurModu === 'private'

    // ── Av turu, VARSAYILAN durum ────────────────────────────────────────────
    //
    // Bu dükkân defect'i AÇMAK için değil BULMAK için var. Adlı defect listesi
    // ekranda dururken kimse defect'i aramaz — okur. Bu yüzden kendi veri alanı
    // yazılabilir hâle gelir gelmez gizli bir tur kendiliğinden başlar:
    // birkaç defect canlıdır, hangileri olduğu söylenmez.
    //
    // NEDEN SUNUCUDA DEĞİL: "POST /sandbox" temiz bir alan döndürmeye devam
    // etmeli. Postman koleksiyonu, REST Assured paketi ve API testleri kendi
    // alanlarını doğrudan o uçtan açıyor ve KUSURSUZ bir başlangıç bekliyor;
    // beklemedikleri bir defect, kendi kodunu hatalı sanan bir öğrenen üretir.
    // Av dükkânın kararıdır, sözleşmenin değil.
    //
    // Tur alan başına BİR kez açılır. İşaret olmasaydı her sayfa yenilemesi
    // yeni bir tur açar, kullanıcının yarım kalan avı sıfırlanırdı.
    const avAlanKimligi = mod === 'tarayici' ? 'tarayici' : (sandboxKey || '')
    useEffect(() => {
        if (!kusurYazilabilir || !avAlanKimligi) return
        if (avDenendi.current === avAlanKimligi) return
        // Katalog daha gelmediyse "hiç defect açık değil" sonucuna varılamaz.
        if (kusurlar.length === 0) return

        // Sürmekte olan bir tur, elle açılmış bir defect ya da bu alanda daha
        // önce başlatılmış bir tur varsa karışma: hepsi kullanıcının durumu.
        const zatenBaslamis = kusurGizli
            || kusurlar.some((k) => k.enabled)
            || localStorage.getItem(DEPO_AV) === avAlanKimligi
        avDenendi.current = avAlanKimligi
        if (zatenBaslamis) return

        localStorage.setItem(DEPO_AV, avAlanKimligi)
        gizliTurBaslat({ otomatik: true })
        // gizliTurBaslat bilerek bağımlılık değil: her render'da yeniden
        // oluşan bir fonksiyon, etkiyi sonsuz döngüye sokardı. Tekilliği
        // avDenendi sağlıyor.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kusurYazilabilir, avAlanKimligi, kusurGizli, kusurlar])
    const acikKusurSayisi = kusurlar.filter((k) => k.enabled).length
    const gorunenAcikSayi = kusurGizli ? gizliSayi : acikKusurSayisi

    const Bolum = ({ id, baslik, children, ek }) => (
        <section id={id} data-testid={`bolum-${id}`} className={`mb-5 rounded-2xl border p-4 md:p-5 ${card}`}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold">{baslik}</h2>
                {ek}
            </div>
            {children}
        </section>
    )

    return (
        <div className={`min-h-screen ${shell}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* ═══ MAĞAZA BAŞLIĞI ═══════════════════════════════════════════ */}
            <div data-testid="magaza-basligi"
                 className={`sticky top-0 z-40 border-b backdrop-blur ${
                     darkMode ? 'border-slate-800 bg-slate-950/90' : 'border-slate-200 bg-white/90'}`}>
                <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-3 py-3 md:px-6">
                    <button type="button" data-testid="magaza-logo"
                            onClick={() => { setGorunum('katalog'); setAktifKategori(''); setArama(''); setAramaGirdi('') }}
                            className="flex shrink-0 items-center gap-2">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-600 text-lg">🛍️</span>
                        <span className="text-left leading-tight">
                            <span className="block text-base font-extrabold">{tx(M.baslik, isTr)}</span>
                            <span className="hidden text-[11px] opacity-60 md:block">{tx(M.slogan, isTr)}</span>
                        </span>
                    </button>

                    <form className="order-3 flex w-full items-center gap-2 md:order-2 md:flex-1"
                          onSubmit={(e) => { e.preventDefault(); setArama(aramaGirdi); setGorunum('katalog') }}>
                        <StoryIpucu storyId="US-04" {...sp}>
                            <input data-testid="urun-ara" className={input} placeholder={tx(M.ara, isTr)}
                                   value={aramaGirdi} onChange={(e) => setAramaGirdi(e.target.value)} />
                        </StoryIpucu>
                        <button type="submit" data-testid="arama-btn" className={btnSatis}>{tx(M.aramaBtn, isTr)}</button>
                    </form>

                    <div className="order-2 ml-auto flex items-center gap-2 md:order-3">
                        {user ? (
                            <div className="flex items-center gap-2">
                                <button type="button" data-testid="hesap-butonu" className={btnIkincil}
                                        onClick={() => { setGorunum('hesap'); siparisleriYukle() }}>
                                    <span data-testid="oturum-eposta">👤 {user.email.split('@')[0]}</span>
                                </button>
                                <button type="button" data-testid="cikis-yap" className={btnIkincil} onClick={cikisYap}>
                                    {tx(M.cikisYap, isTr)}
                                </button>
                            </div>
                        ) : (
                            <button type="button" data-testid="giris-ac" className={btnIkincil} onClick={() => setGirisAcik(true)}>
                                👤 {tx(M.girisYap, isTr)}
                            </button>
                        )}

                        <StoryModuAnahtari aktif={storyModu} setAktif={setStoryModu} isTr={isTr} darkMode={darkMode} />

                        <Kavram k="tarayiciModu" isTr={isTr} darkMode={darkMode} hizala="sag">
                            <button type="button" data-testid="mod-rozeti"
                                    onClick={() => setModAcik(true)}
                                    className={`min-h-[36px] rounded-full px-3 py-2 text-xs font-bold transition ${
                                        mod === 'tarayici' ? 'bg-sky-500/20 text-sky-300 hover:bg-sky-500/30'
                                            : mod === 'yerel' ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                                                : 'bg-slate-500/20 text-slate-300'}`}>
                                {mod === 'tarayici' ? `🌐 ${tx(M.modTarayici, isTr)}`
                                    : mod === 'yerel' ? `🐳 ${tx(M.modYerel, isTr)}`
                                        : `… ${tx(M.modYukleniyor, isTr)}`}
                            </button>
                        </Kavram>

                        <button type="button" data-testid="sepet-butonu" className={`${btnSatis} relative`}
                                onClick={() => setGorunum('sepet')}>
                            🛒 <span className="hidden md:inline">{tx(M.sepet, isTr)}</span>
                            <span data-testid="sepet-sayaci"
                                  className="ml-1 inline-grid h-5 min-w-[20px] place-items-center rounded-full bg-white px-1 text-xs font-extrabold text-orange-700">
                                {sepetAdet}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Kategori şeridi */}
                {gorunum === 'katalog' && (
                    <div className="mx-auto max-w-6xl overflow-x-auto px-3 pb-2 md:px-6">
                        <div className="flex gap-2">
                            <button type="button" data-testid="kategori-tumu"
                                    onClick={() => setAktifKategori('')}
                                    className={`min-h-[36px] shrink-0 rounded-full px-3 py-1 text-sm font-semibold transition ${
                                        !aktifKategori ? 'bg-orange-600 text-white' : darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                                {tx(M.tumu, isTr)}
                            </button>
                            {kategoriler.map((k) => (
                                <button key={k.id} type="button" data-testid={`kategori-${k.slug}`}
                                        onClick={() => setAktifKategori(k.slug)}
                                        className={`min-h-[36px] shrink-0 rounded-full px-3 py-1 text-sm font-semibold transition ${
                                            aktifKategori === k.slug ? 'bg-orange-600 text-white' : darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                                    {k.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <main className="mx-auto max-w-6xl px-3 py-5 md:px-6 md:py-8">
                {/* Stack kapalı uyarısı */}
                {saglik === 'kapali' && mod !== 'tarayici' && (
                    <div data-testid="api-kapali" className="mb-5 rounded-xl border border-amber-500/60 bg-amber-500/10 p-4">
                        <p className="font-bold">⚠️ {tx(M.ulasilamiyor, isTr)}</p>
                        <p className="mt-1 text-sm opacity-90">{tx(M.ulasilamiyorNe, isTr)}</p>
                        <pre className="mt-2 overflow-x-auto rounded-lg bg-black/40 p-3 text-xs text-emerald-300">
                            <code>cd qa-shop{'\n'}docker compose up -d</code>
                        </pre>
                        <Link to="/qa-shop-setup" className="mt-2 inline-block text-sm font-semibold text-indigo-400 hover:underline">
                            {tx(M.kurulumRehberi, isTr)} →
                        </Link>
                    </div>
                )}

                {/* Bildirim */}
                {mesaj && (
                    <div data-testid="bildirim"
                         className={`mb-4 flex items-start justify-between gap-3 rounded-xl border p-3 text-sm ${
                             mesaj.tip === 'basari'
                                 ? 'border-emerald-500/60 bg-emerald-500/10'
                                 : 'border-rose-500/60 bg-rose-500/10'}`}>
                        <span data-testid="bildirim-metin">{mesaj.metin}</span>
                        <button type="button" data-testid="bildirim-kapat" onClick={() => setMesaj(null)}
                                className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold opacity-70 hover:opacity-100">✕</button>
                    </div>
                )}

                <StoryModuSeridi aktif={storyModu} isTr={isTr} darkMode={darkMode} />

                {/* Av şeridi — kaç defect canlı, HANGİLERİ değil.
                    Teknik panelin içinde değil dükkânın kendi ekranında:
                    kapalı bir panelin dibindeki davet, davet sayılmaz. */}
                {kusurGizli && gizliSayi > 0 && (
                    <div data-testid="av-seridi"
                         className="mb-4 rounded-xl border border-amber-500/60 bg-amber-500/10 p-3 md:p-4">
                        <p data-testid="av-seridi-sayi" className="text-sm font-bold">
                            🐞 {tx(M.avSeridi, isTr).replaceAll('{n}', String(gizliSayi))}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed opacity-85 md:text-sm">
                            {tx(M.avSeridiNe, isTr)}
                        </p>
                        <button type="button" data-testid="av-panele-git"
                                className="mt-2 min-h-[36px] rounded-lg px-3 py-2 text-sm font-semibold text-amber-500 underline-offset-2 hover:underline"
                                onClick={() => {
                                    if (!qaPaneliRef.current) return
                                    qaPaneliRef.current.open = true
                                    qaPaneliRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }}>
                            {tx(M.avSeridiPanel, isTr)} →
                        </button>
                    </div>
                )}

                {/* ═══ VİTRİN ═══════════════════════════════════════════════ */}
                {gorunum === 'katalog' && (
                    <>
                        <h1 data-testid="vitrin-basligi" className="mb-3 text-2xl font-extrabold">
                            {arama.trim()
                                ? `${tx(M.aramaSonucu, isTr)}: ${arama.trim()}`
                                : aktifKategori
                                    ? (kategoriler.find((k) => k.slug === aktifKategori)?.name ?? tx(M.tumUrunler, isTr))
                                    : tx(M.tumUrunler, isTr)}
                        </h1>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm opacity-70">
                                <b data-testid="urun-sayisi">{toplamUrun}</b> {tx(M.sonucAdet, isTr)}
                            </p>
                            <StoryIpucu storyId="US-16" {...sp}>
                                <button type="button" data-testid="alani-sifirla" className={btnIkincil}
                                        onClick={veriSifirla}>
                                    ↺ {tx(M.alaniSifirla, isTr)}
                                </button>
                            </StoryIpucu>
                            <select data-testid="urun-sirala" className={`${input} md:max-w-[240px]`}
                                    value={siralama} onChange={(e) => setSiralama(e.target.value)}>
                                <option value="price:asc">{tx(M.siralaUcuz, isTr)}</option>
                                <option value="price:desc">{tx(M.siralaPahali, isTr)}</option>
                                <option value="created_at:desc">{tx(M.siralaYeni, isTr)}</option>
                            </select>
                        </div>

                        {urunler.length === 0 ? (
                            <p data-testid="urun-bulunamadi" className="rounded-xl border border-dashed p-8 text-center text-sm opacity-70">
                                {tx(M.urunBulunamadi, isTr)}
                            </p>
                        ) : (
                            <ul data-testid="urun-listesi" className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                                {urunler.map((u) => (
                                    <UrunKarti key={u.id} urun={u} isTr={isTr} darkMode={darkMode} para={para}
                                               onDetay={urunAc} onHizliEkle={hizliEkle} mesgul={mesgul} />
                                ))}
                            </ul>
                        )}
                    </>
                )}

                {/* ═══ ÜRÜN DETAYI ══════════════════════════════════════════ */}
                {gorunum === 'urun' && secilenUrun && (
                    <>
                        <button type="button" data-testid="geri-vitrin" className={`${btnIkincil} mb-4`}
                                onClick={() => setGorunum('katalog')}>
                            ← {tx(M.geriVitrin, isTr)}
                        </button>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className={`overflow-hidden rounded-2xl border ${card}`}>
                                <UrunGorseli urun={secilenUrun} boyut="detay" />
                            </div>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide opacity-60">{secilenUrun.brand}</p>
                                <h1 data-testid="detay-ad" className="mt-1 text-2xl font-extrabold">{secilenUrun.name}</h1>
                                <div className="mt-2">
                                    <Yildizlar puan={secilenUrun.rating_avg} adet={secilenUrun.rating_count}
                                               id={secilenUrun.id} isTr={isTr} />
                                </div>

                                <p data-testid="detay-fiyat" className="mt-4 text-3xl font-extrabold">
                                    {para(secilenVaryant?.price ?? secilenUrun.price)}
                                </p>

                                {/* Beden seçimi */}
                                <p className="mt-5 text-sm font-bold">{tx(M.beden, isTr)}</p>
                                <div data-testid="beden-listesi" className="mt-2 flex flex-wrap gap-2">
                                    {detayVaryantlar.map((v) => (
                                        <button key={v.id} type="button" data-testid={`beden-${v.id}`}
                                                onClick={() => setSecilenVaryant(v)}
                                                disabled={v.available === 0}
                                                className={`min-h-[36px] min-w-[52px] rounded-lg border px-3 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                                                    secilenVaryant?.id === v.id
                                                        ? 'border-orange-600 bg-orange-600 text-white'
                                                        : darkMode ? 'border-slate-700 hover:border-slate-500' : 'border-slate-300 hover:border-slate-400'}`}>
                                            {v.size}
                                        </button>
                                    ))}
                                </div>

                                {secilenVaryant && (
                                    <p className="mt-3 text-sm opacity-80">
                                        {tx(M.renk, isTr)}: <b>{secilenVaryant.color}</b> ·{' '}
                                        <b data-testid={`varyant-stok-${secilenVaryant.id}`}>{secilenVaryant.available}</b>{' '}
                                        {tx(M.stok, isTr)}
                                    </p>
                                )}

                                <StoryIpucu storyId="US-05" {...sp}>
                                <Kavram k="sepeteEkle" isTr={isTr} darkMode={darkMode} hizala="sag" tamGenislik>
                                    <button type="button"
                                            data-testid={secilenVaryant ? `sepete-ekle-${secilenVaryant.id}` : 'sepete-ekle'}
                                            className={`${btnSatis} mt-5 w-full py-3 text-base`}
                                            disabled={mesgul || !secilenVaryant || secilenVaryant.available === 0}
                                            onClick={() => secilenVaryant && sepeteEkle(secilenVaryant.id, 1)}>
                                        {!secilenVaryant ? tx(M.bedenSec, isTr)
                                            : secilenVaryant.available === 0 ? tx(M.tukendi, isTr)
                                                : `🛒 ${tx(M.sepeteEkle, isTr)}`}
                                    </button>
                                </Kavram>
                                </StoryIpucu>

                                <div className={`mt-6 rounded-xl border p-4 ${card}`}>
                                    <p className="text-sm font-bold">{tx(M.aciklama, isTr)}</p>
                                    <p data-testid="detay-aciklama" className="mt-1 text-sm opacity-80">{secilenUrun.description}</p>
                                    <p className="mt-2 text-xs opacity-60">SKU: {secilenUrun.sku}</p>
                                </div>
                            </div>
                        </div>

                        {/* Yorumlar */}
                        <section className={`mt-6 rounded-2xl border p-4 md:p-5 ${card}`}>
                            <h2 className="mb-3 text-lg font-bold">{tx(M.yorumlar, isTr)}<Kavram k="yorumOnayi" isTr={isTr} darkMode={darkMode} /></h2>
                            {yorumlar.length === 0 ? (
                                <p data-testid="yorum-yok" className="text-sm opacity-70">{tx(M.yorumYok, isTr)}</p>
                            ) : (
                                <ul data-testid="yorum-listesi" className="space-y-3">
                                    {yorumlar.map((y) => (
                                        <li key={y.id} data-testid={`yorum-${y.id}`}
                                            className={`rounded-xl border p-3 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-sm font-bold">{y.author}</span>
                                                <span className="text-amber-400" aria-label={`${y.rating}/5`}>
                                                    {'★★★★★'.slice(0, y.rating)}
                                                    <span className="opacity-30">{'★★★★★'.slice(y.rating)}</span>
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm opacity-85">{y.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </>
                )}

                {/* ═══ SEPET ════════════════════════════════════════════════ */}
                {gorunum === 'sepet' && (
                    <>
                        <h1 className="mb-4 text-2xl font-extrabold">🛒 {tx(M.sepetim, isTr)}</h1>
                        {!cart?.items?.length ? (
                            <div className={`rounded-2xl border p-8 text-center ${card}`}>
                                <p data-testid="sepet-bos" className="text-sm opacity-70">{tx(M.sepetBos, isTr)}</p>
                                <button type="button" data-testid="sepet-bos-vitrin" className={`${btnSatis} mt-4`}
                                        onClick={() => setGorunum('katalog')}>
                                    {tx(M.sepetBosBtn, isTr)}
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                                <ul data-testid="sepet-satirlari" className="space-y-3">
                                    {cart.items.map((it) => (
                                        <li key={it.id} data-testid={`sepet-satir-${it.id}`}
                                            className={`flex flex-wrap items-center gap-3 rounded-2xl border p-3 ${card}`}>
                                            <div className="w-16 shrink-0 overflow-hidden rounded-lg">
                                                <UrunGorseli urun={{ id: it.variant_id, name: it.product_name, category: 'tshirts' }} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-bold">{it.product_name}</p>
                                                <p className="text-xs opacity-60">
                                                    {it.size} · {it.color} · {para(it.unit_price)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button type="button" data-testid={`adet-azalt-${it.id}`} className={btnIkincil}
                                                        onClick={() => adetDegistir(it.id, Number(it.qty) - 1)}
                                                        disabled={Number(it.qty) <= 1}>−</button>
                                                <span data-testid={`adet-${it.id}`} className="min-w-[36px] text-center text-sm font-bold">{it.qty}</span>
                                                <button type="button" data-testid={`adet-artir-${it.id}`} className={btnIkincil}
                                                        onClick={() => adetDegistir(it.id, Number(it.qty) + 1)}>+</button>
                                            </div>
                                            <span className="w-24 text-right text-sm font-extrabold">{para(it.line_total)}</span>
                                            <button type="button" data-testid={`sepet-sil-${it.id}`} className={btnIkincil}
                                                    onClick={() => satirSil(it.id)}>
                                                {tx(M.kaldir, isTr)}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <aside className={`h-fit rounded-2xl border p-4 ${card}`}>
                                    <StoryIpucu storyId="US-07" {...sp}>
                                    <form onSubmit={kuponUygula} className="mb-4 flex gap-2">
                                        <input data-testid="kupon-kodu" className={input} placeholder={tx(M.kupon, isTr)}
                                               value={kuponGirdi} onChange={(e) => setKuponGirdi(e.target.value)} />
                                        <Kavram k="kupon" isTr={isTr} darkMode={darkMode} hizala="sag">
                                            <button type="submit" data-testid="kupon-uygula" className={btnIkincil}>
                                                {tx(M.kuponUygula, isTr)}
                                            </button>
                                        </Kavram>
                                    </form>
                                    </StoryIpucu>
                                    <dl className="space-y-2 text-sm">
                                        <div className="flex justify-between"><dt>{tx(M.araToplam, isTr)}</dt>
                                            <dd data-testid="toplam-ara">{para(cart.totals?.subtotal)}</dd></div>
                                        <div className="flex justify-between"><dt>{tx(M.indirim, isTr)}</dt>
                                            <dd data-testid="toplam-indirim" className="text-emerald-400">−{para(cart.totals?.discount_total)}</dd></div>
                                        <div className="flex justify-between"><dt>{tx(M.kargo, isTr)}</dt>
                                            <dd data-testid="toplam-kargo">{para(cart.totals?.shipping_total)}</dd></div>
                                        <div className="flex justify-between border-t pt-2 text-base font-extrabold">
                                            <dt>{tx(M.genelToplam, isTr)}</dt>
                                            <dd data-testid="toplam-genel">{para(cart.totals?.grand_total)}</dd></div>
                                    </dl>
                                    <button type="button" data-testid="odemeye-gec" className={`${btnSatis} mt-4 w-full py-3`}
                                            onClick={() => { setGorunum('odeme'); adresleriYukle(); window.scrollTo({ top: 0 }) }}>
                                        {tx(M.odemeyeGec, isTr)} →
                                    </button>
                                </aside>
                            </div>
                        )}
                    </>
                )}

                {/* ═══ ÖDEME ════════════════════════════════════════════════ */}
                {gorunum === 'odeme' && (
                    <>
                        <h1 className="mb-4 text-2xl font-extrabold">💳 {tx(M.odeme, isTr)}</h1>
                        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                            <div className="space-y-4">
                                {/* Adres */}
                                <section className={`rounded-2xl border p-4 ${card}`}>
                                    <h2 className="mb-3 text-base font-bold">
                                        <StoryIpucu storyId="US-15" {...sp}>
                                            <span>📍 {tx(M.teslimatAdresi, isTr)}</span>
                                        </StoryIpucu><Kavram k="varsayilanAdres" isTr={isTr} darkMode={darkMode} />
                                    </h2>
                                    {adresler.length === 0 ? (
                                        <p data-testid="adres-yok" className="text-sm opacity-70">{tx(M.adresYok, isTr)}</p>
                                    ) : (
                                        <ul data-testid="adres-listesi" className="space-y-2">
                                            {adresler.map((a) => (
                                                <li key={a.id}>
                                                    <label data-testid={`adres-${a.id}`}
                                                           className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                                                               secilenAdres?.id === a.id
                                                                   ? 'border-orange-600 bg-orange-500/10'
                                                                   : darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                                                        <input type="radio" name="adres" className="mt-1"
                                                               checked={secilenAdres?.id === a.id}
                                                               onChange={() => setSecilenAdres(a)} />
                                                        <span className="text-sm">
                                                            <b>{a.label}</b>
                                                            {a.is_default && (
                                                                <span className="ml-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                                                                    {isTr ? 'varsayılan' : 'default'}
                                                                </span>
                                                            )}
                                                            <br />
                                                            <span className="opacity-70">
                                                                {a.line1}, {a.city} {a.postal_code} · {a.country}
                                                            </span>
                                                        </span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <details className="mt-3">
                                        <summary data-testid="yeni-adres-ac" className="cursor-pointer text-sm font-semibold text-indigo-400">
                                            + {tx(M.yeniAdres, isTr)}
                                        </summary>
                                        <form onSubmit={adresKaydet} className="mt-3 grid gap-2 md:grid-cols-2">
                                            {[
                                                ['label', M.adresBaslik], ['line1', M.adresSatiri],
                                                ['city', M.sehir], ['postal_code', M.postaKodu],
                                                ['country', M.ulke],
                                            ].map(([alan, etiket]) => (
                                                <label key={alan} className="block">
                                                    <span className="mb-1 block text-xs font-semibold opacity-70">{tx(etiket, isTr)}</span>
                                                    <input data-testid={`yeni-adres-${alan}`} className={input}
                                                           value={yeniAdres[alan]}
                                                           onChange={(e) => setYeniAdres((y) => ({ ...y, [alan]: e.target.value }))} />
                                                </label>
                                            ))}
                                            <button type="submit" data-testid="adres-kaydet" className={`${btnBirincil} md:col-span-2`}>
                                                {tx(M.adresKaydet, isTr)}
                                            </button>
                                        </form>
                                    </details>
                                </section>

                                {/* Ödeme yöntemi */}
                                <section className={`rounded-2xl border p-4 ${card}`}>
                                    <h2 className="mb-3 text-base font-bold">💳 {tx(M.odemeYontemi, isTr)}</h2>
                                    <ul data-testid="odeme-yontemleri" className="space-y-2">
                                        {[
                                            ['card', M.kart, '💳'],
                                            ['transfer', M.havale, '🏦'],
                                            ['cod', M.kapida, '💵'],
                                        ].map(([kod, etiket, ikon]) => (
                                            <li key={kod}>
                                                <label data-testid={`odeme-yontemi-${kod}`}
                                                       className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                                                           odemeYontemi === kod
                                                               ? 'border-orange-600 bg-orange-500/10'
                                                               : darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                                                    <input type="radio" name="odeme" checked={odemeYontemi === kod}
                                                           onChange={() => setOdemeYontemi(kod)} />
                                                    <span className="text-sm font-semibold">{ikon} {tx(etiket, isTr)}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Kart alanları — yalnızca görsel gerçekçilik için; kart verisi
                                        hiçbir yere GÖNDERİLMEZ, uç yalnızca yöntemi ister. */}
                                    {odemeYontemi === 'card' && (
                                        <div data-testid="kart-alanlari" className="mt-3 grid gap-2 md:grid-cols-2">
                                            <label className="block md:col-span-2">
                                                <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.kartNo, isTr)}</span>
                                                <input data-testid="kart-no" className={input} placeholder="4242 4242 4242 4242" />
                                            </label>
                                            <label className="block">
                                                <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.kartAd, isTr)}</span>
                                                <input data-testid="kart-ad" className={input} placeholder="QA Tester" />
                                            </label>
                                            <label className="block">
                                                <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.sonKullanma, isTr)}</span>
                                                <input data-testid="kart-tarih" className={input} placeholder="12/29" />
                                            </label>
                                        </div>
                                    )}

                                    <Kavram k="odemeBasarisiz" isTr={isTr} darkMode={darkMode} tamGenislik>
                                    <label data-testid="odeme-basarisiz-etiket"
                                           className="mt-4 flex w-full cursor-pointer items-start gap-2 rounded-xl border border-dashed p-3 text-sm">
                                        <input type="checkbox" data-testid="odeme-basarisiz" className="mt-1"
                                               checked={odemeBasarisiz} onChange={(e) => setOdemeBasarisiz(e.target.checked)} />
                                        <span>
                                            <b>{tx(M.basarisizSimule, isTr)}</b>
                                            <span className="mt-1 block text-xs opacity-70">{tx(M.basarisizAnlat, isTr)}</span>
                                        </span>
                                    </label>
                                    </Kavram>
                                </section>
                            </div>

                            <aside className={`h-fit rounded-2xl border p-4 ${card}`}>
                                <h2 className="mb-3 text-base font-bold">{tx(M.siparisOzeti, isTr)}</h2>
                                <dl className="space-y-2 text-sm">
                                    <div className="flex justify-between"><dt>{tx(M.araToplam, isTr)}</dt>
                                        <dd>{para(cart?.totals?.subtotal)}</dd></div>
                                    <div className="flex justify-between"><dt>{tx(M.indirim, isTr)}</dt>
                                        <dd className="text-emerald-400">−{para(cart?.totals?.discount_total)}</dd></div>
                                    <div className="flex justify-between"><dt>{tx(M.kargo, isTr)}</dt>
                                        <dd>{para(cart?.totals?.shipping_total)}</dd></div>
                                    <div className="flex justify-between border-t pt-2 text-base font-extrabold">
                                        <dt>{tx(M.genelToplam, isTr)}</dt>
                                        <dd data-testid="odeme-toplam">{para(cart?.totals?.grand_total)}</dd></div>
                                </dl>
                                <StoryIpucu storyId="US-10" {...sp}>
                                <button type="button" data-testid="siparis-tamamla" className={`${btnSatis} mt-4 w-full py-3`}
                                        disabled={mesgul || !cart?.items?.length}
                                        onClick={siparisiOnayla}>
                                    {tx(M.siparisiOnayla, isTr)}
                                </button>
                                </StoryIpucu>
                            </aside>
                        </div>
                    </>
                )}

                {/* ═══ SİPARİŞ ONAYI ════════════════════════════════════════ */}
                {gorunum === 'onay' && sonSiparis && (
                    <div data-testid="siparis-onay" className={`mx-auto max-w-xl rounded-2xl border p-6 text-center ${card}`}>
                        <p className="text-5xl">{sonSiparis.odemeHatasi ? '⚠️' : '✅'}</p>
                        <h1 className="mt-3 text-2xl font-extrabold">{tx(M.siparisAlindi, isTr)}</h1>
                        <p className="mt-3 text-sm opacity-70">{tx(M.siparisNo, isTr)}</p>
                        <p data-testid="siparis-no" className="text-lg font-extrabold">{sonSiparis.order_no}</p>
                        <p className="mt-3 text-sm opacity-70">{tx(M.siparisDurum, isTr)}</p>
                        <span data-testid="onay-durum"
                              className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${DURUM_RENK[sonSiparis.status] ?? 'bg-slate-500/20'}`}>
                            {sonSiparis.status}
                        </span>
                        {sonSiparis.odemeHatasi && (
                            <p data-testid="odeme-hatasi" className="mt-3 rounded-xl border border-rose-500/60 bg-rose-500/10 p-3 text-sm">
                                {isTr ? 'Ödeme başarısız oldu — sipariş ödenmemiş durumda.' : 'The payment failed — the order is unpaid.'}
                            </p>
                        )}
                        <div className="mt-5 flex flex-wrap justify-center gap-2">
                            <button type="button" data-testid="onay-vitrin" className={btnIkincil} onClick={() => setGorunum('katalog')}>
                                {tx(M.alisverisDevam, isTr)}
                            </button>
                            <button type="button" data-testid="onay-siparisler" className={btnBirincil}
                                    onClick={() => { setGorunum('hesap'); siparisleriYukle() }}>
                                {tx(M.siparisleriGor, isTr)}
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══ SİPARİŞLERİM ═════════════════════════════════════════ */}
                {gorunum === 'hesap' && (
                    <>
                        <h1 className="mb-4 text-2xl font-extrabold">📦 {tx(M.siparislerim, isTr)}<Kavram k="siparisDurumlari" isTr={isTr} darkMode={darkMode} /></h1>
                        {siparisler.length === 0 ? (
                            <p data-testid="siparis-yok" className={`rounded-2xl border p-8 text-center text-sm opacity-70 ${card}`}>
                                {tx(M.siparisYok, isTr)}
                            </p>
                        ) : (
                            <ul data-testid="siparis-listesi" className="space-y-3">
                                {siparisler.map((o) => (
                                    <li key={o.id} data-testid={`siparis-${o.id}`}
                                        className={`rounded-2xl border p-4 ${card}`}>
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-extrabold">{o.order_no}</p>
                                                <p className="text-xs opacity-60">{new Date(o.created_at).toLocaleString()}</p>
                                            </div>
                                            <span data-testid={`siparis-durum-${o.id}`}
                                                  className={`rounded-full px-3 py-1 text-xs font-bold ${DURUM_RENK[o.status] ?? 'bg-slate-500/20'}`}>
                                                {o.status}
                                            </span>
                                            <span className="text-base font-extrabold">{para(o.grand_total)}</span>
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {['pay', 'ship', 'deliver', 'cancel', 'return'].map((eylem) => (
                                                <button key={eylem} type="button" data-testid={`siparis-${eylem}-${o.id}`}
                                                        className={btnIkincil} onClick={() => siparisEylem(o.id, eylem)}>
                                                    {eylem}
                                                </button>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}

                {/* ═══ QA PANELİ — kapalı gelir ═════════════════════════════ */}
                <QaShopGecis aktif="shop" isTr={isTr} darkMode={darkMode} />

                <details ref={qaPaneliRef} data-testid="qa-paneli" className={`mt-10 rounded-2xl border ${card}`}>
                    <summary data-testid="qa-paneli-ac" className="cursor-pointer p-4 text-base font-bold">
                        🧪 {tx(M.qaPaneli, isTr)}
                        <span data-testid="saglik-durumu"
                              className={`ml-3 rounded-full px-2 py-1 text-xs font-semibold ${
                                  saglik === 'ok' ? 'bg-emerald-500/20 text-emerald-300'
                                      : saglik === 'kapali' ? 'bg-rose-500/20 text-rose-300'
                                          : 'bg-slate-500/20 text-slate-300'}`}>
                            {saglik === 'ok' ? 'API: up' : saglik === 'kapali' ? 'API: down' : 'API: ?'}
                        </span>
                    </summary>

                    <div className="border-t p-4 md:p-5">
                        <p className="mb-4 text-sm opacity-75">{tx(M.qaPaneliAnlat, isTr)}</p>

                        <div className="mb-4 rounded-xl border border-indigo-500/40 bg-indigo-500/10 p-3">
                            <p className="text-sm font-bold">💡 {tx(M.testIpucu, isTr)}</p>
                            <p className="mt-1 text-sm opacity-85">{tx(M.testIpucuMetin, isTr)}</p>
                        </div>

                        {/* Bağlantı */}
                        <Bolum id="baglanti" baslik={`🔌 ${tx(M.baglanti, isTr)}`}>
                            {/* Etiketlerin ve düğmelerin yanındaki ⓘ: "sandbox",
                                "kendi alanımı aç" gibi kavramlar ilk kez gören
                                için opak. Baloncuk kavramın NE OLDUĞUNU söyler;
                                hangi testi yazacağını söylemez. */}
                            <div className="grid gap-3 md:grid-cols-2">
                                <label className="block">
                                    <span className="mb-1 flex items-center text-xs font-semibold opacity-70">
                                        {tx(M.apiAdresi, isTr)}
                                        <Kavram k="apiAdresi" isTr={isTr} darkMode={darkMode} />
                                        <Kavram k="docker" isTr={isTr} darkMode={darkMode} />
                                    </span>
                                    <input data-testid="api-adresi" className={input} value={apiBase}
                                           onChange={(e) => { setApiBase(e.target.value); localStorage.setItem(DEPO_ADRES, e.target.value) }} />
                                </label>
                                <label className="block">
                                    <span className="mb-1 flex items-center text-xs font-semibold opacity-70">
                                        {tx(M.anahtar, isTr)}
                                        <Kavram k="sandboxAnahtari" isTr={isTr} darkMode={darkMode} />
                                        <Kavram k="sandbox" isTr={isTr} darkMode={darkMode} />
                                    </span>
                                    <input data-testid="sandbox-anahtari" className={input} value={sandboxKey}
                                           placeholder={tx(M.anahtarYok, isTr)}
                                           onChange={(e) => { setSandboxKey(e.target.value); localStorage.setItem(DEPO_ANAHTARI, e.target.value) }} />
                                </label>
                            </div>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <Kavram k="alanAc" isTr={isTr} darkMode={darkMode}>
                                    <button type="button" data-testid="alan-ac" className={btnBirincil} onClick={alanAc} disabled={mesgul}>
                                        {tx(M.alanAc, isTr)}
                                    </button>
                                </Kavram>
                                <Kavram k="veriSifirla" isTr={isTr} darkMode={darkMode}>
                                    <button type="button" data-testid="veri-sifirla" className={btnIkincil} onClick={veriSifirla} disabled={!sandboxKey}>
                                        {tx(M.sifirla, isTr)}
                                    </button>
                                </Kavram>
                                <Kavram k="anahtariUnut" isTr={isTr} darkMode={darkMode}>
                                    <button type="button" data-testid="anahtari-unut" className={btnIkincil} onClick={anahtariUnut} disabled={!sandboxKey}>
                                        {tx(M.baglantiKes, isTr)}
                                    </button>
                                </Kavram>
                            </div>
                            {!sandboxKey && (
                                <p data-testid="anahtar-uyarisi" className="mt-3 flex flex-wrap items-center text-sm opacity-80">
                                    ℹ️ {tx(M.anahtarGerekli, isTr)}
                                    <Kavram k="saltOkunur" isTr={isTr} darkMode={darkMode} />
                                </p>
                            )}
                        </Bolum>

                        {/* Defect anahtarları — VARSAYILAN av, opsiyonel adlı liste */}
                        <Bolum
                            id="kusurlar"
                            baslik={<>🐞 {tx(M.kusurlar, isTr)}<Kavram k="defectAnahtari" isTr={isTr} darkMode={darkMode} /></>}
                            ek={
                                <div className="flex items-center gap-2">
                                    <span data-testid="kusur-sayaci"
                                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                              gorunenAcikSayi > 0 ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                                        {gorunenAcikSayi} {tx(M.kusurAcikSayisi, isTr)}{kusurGizli ? ' · 🎲' : ''}
                                    </span>
                                    {!kusurGizli && acikKusurSayisi > 0 && (
                                        <button type="button" data-testid="kusur-hepsini-kapat" className={btnIkincil} onClick={kusurlariKapat}>
                                            {tx(M.kusurHepsiniKapat, isTr)}
                                        </button>
                                    )}
                                </div>
                            }
                        >
                            <p className="mb-3 text-sm leading-relaxed opacity-80">{tx(M.kusurNedir, isTr)}</p>

                            {kusurYazilabilir ? null : (
                                <p data-testid="kusur-anahtar-uyarisi" className="mb-3 text-sm opacity-80">
                                    ℹ️ {tx(M.kusurAnahtarGerekli, isTr)}
                                </p>
                            )}

                            {kusurYazilabilir && (
                                <div data-testid="gizli-tur-kumanda"
                                     className={`mb-4 rounded-xl border p-3 ${
                                         kusurGizli ? 'border-amber-500/60 bg-amber-500/10'
                                             : darkMode ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50'}`}>
                                    {kusurGizli ? (
                                        <>
                                            <p data-testid="gizli-tur-durum" className="text-sm font-semibold">
                                                🎲 {tx(M.gizliTurAcik, isTr).replaceAll('{n}', String(gizliSayi))}
                                            </p>
                                            <p className="mt-2 text-xs opacity-75">{tx(M.gizliTurKilit, isTr)}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <button type="button" data-testid="cevabi-goster" className={btnBirincil}
                                                        onClick={cevabiGoster} disabled={mesgul}>
                                                    {tx(M.cevabiGoster, isTr)}
                                                </button>
                                                <button type="button" data-testid="gizli-tur-yeni" className={btnIkincil}
                                                        onClick={gizliTurBaslat} disabled={mesgul}>
                                                    {tx(M.gizliTurYeni, isTr)}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="flex items-center text-sm font-semibold">
                                                🎲 {tx(M.gizliTur, isTr)}
                                                <Kavram k="gizliTur" isTr={isTr} darkMode={darkMode} />
                                            </p>
                                            <p className="mt-1 text-xs leading-relaxed opacity-80">{tx(M.gizliTurAnlat, isTr)}</p>
                                            <div className="mt-3 flex flex-wrap items-end gap-2">
                                                <label className="block">
                                                    <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.gizliTurSayi, isTr)}</span>
                                                    <select data-testid="gizli-tur-adet" className={`${input} md:max-w-[90px]`}
                                                            value={gizliAdet} onChange={(e) => setGizliAdet(Number(e.target.value))}>
                                                        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                                                    </select>
                                                </label>
                                                <button type="button" data-testid="gizli-tur-baslat" className={btnBirincil}
                                                        onClick={gizliTurBaslat} disabled={mesgul}>
                                                    {tx(M.gizliTurBaslat, isTr)}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {cevap && (
                                <div data-testid="gizli-tur-cevap" className="mb-4 rounded-xl border border-emerald-500/60 bg-emerald-500/10 p-3">
                                    <p className="text-sm font-bold">✅ {tx(M.cevapBasligi, isTr)}:</p>
                                    <ul className="mt-2 flex flex-wrap gap-2">
                                        {cevap.map((k) => (
                                            <li key={k} data-testid={`cevap-${k}`}
                                                className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-300">{k}</li>
                                        ))}
                                    </ul>
                                    <p className="mt-2 text-xs leading-relaxed opacity-80">{tx(M.cevapNot, isTr)}</p>
                                </div>
                            )}

                            {/* ── Adlı liste: CEVAP ANAHTARI, opt-in ──────────────────
                                Av sürerken bu liste defect'in ADINI ve hangi kontrolün
                                onu yakalayacağını söyler. Görünür durursa arama biter,
                                okuma başlar; bu yüzden varsayılan KAPALI ve kullanıcı
                                ne açtığını bilerek açar. */}
                            <button type="button" data-testid="adli-liste-anahtari"
                                    aria-expanded={adliListe}
                                    aria-controls="kusur-listesi-govde"
                                    className={`${btnIkincil} mb-2`}
                                    onClick={() => setAdliListe((a) => !a)}>
                                {adliListe ? `▾ ${tx(M.adliListeKapat, isTr)}` : `▸ ${tx(M.adliListeAc, isTr)}`}
                            </button>

                            {adliListe && (
                                <div id="kusur-listesi-govde">
                                    <p data-testid="adli-liste-uyarisi" className="mb-3 text-xs leading-relaxed opacity-75">
                                        ⚠️ {tx(M.adliListeUyari, isTr)}
                                    </p>
                                    {!kusurGizli && kusurYazilabilir && (
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-60">{tx(M.ogrenmeModu, isTr)}</p>
                                    )}

                                    <ul data-testid="kusur-listesi" className="space-y-2">
                                        {kusurlar.map((k) => (
                                            <li key={k.key} data-testid={`kusur-${k.key}`}
                                                className={`rounded-xl border p-3 ${
                                                    k.enabled ? 'border-rose-500/60 bg-rose-500/10'
                                                        : darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                                                <div className="flex flex-wrap items-start justify-between gap-2">
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold">
                                                            <code data-testid={`kusur-ad-${k.key}`} className="text-xs opacity-70">{k.key}</code>
                                                            {' · '}{tx(k.title, isTr)}
                                                        </p>
                                                        <p className="mt-1 text-xs leading-relaxed opacity-80">
                                                            <b>{tx(M.kusurNeyiBozar, isTr)}:</b> {tx(k.breaks, isTr)}
                                                        </p>
                                                        {/* "Hangi kontrol yakalar" bir sonraki adımın CEVABIDIR.
                                                            Tıklamayla açılır — hover'a bağlanamaz, dokunmatik
                                                            cihazda hover yoktur ve ipucu erişilemez kalırdı. */}
                                                        <details className="mt-1">
                                                            <summary data-testid={`kusur-ipucu-ac-${k.key}`}
                                                                     className="cursor-pointer text-xs font-semibold text-indigo-400">
                                                                💡 {tx(M.ipucuAc, isTr)}
                                                            </summary>
                                                            <p data-testid={`kusur-ipucu-${k.key}`} className="mt-1 text-xs leading-relaxed opacity-80">
                                                                {tx(k.catchableBy, isTr)}
                                                            </p>
                                                        </details>
                                                    </div>
                                                    {kusurGizli ? null : (
                                                        <div className="flex shrink-0 items-center gap-2">
                                                            <span data-testid={`kusur-durum-${k.key}`}
                                                                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                                      k.enabled ? 'bg-rose-500/20 text-rose-300'
                                                                          : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                                                                {k.enabled ? tx(M.kusurAcik, isTr) : tx(M.kusurKapali, isTr)}
                                                            </span>
                                                            <button type="button" data-testid={`kusur-anahtar-${k.key}`}
                                                                    aria-pressed={k.enabled}
                                                                    className={`${k.enabled ? btnIkincil : btnBirincil} disabled:cursor-not-allowed`}
                                                                    disabled={!kusurYazilabilir || mesgul}
                                                                    onClick={() => kusurDegistir(k.key, !k.enabled)}>
                                                                {k.enabled ? tx(M.kusurKapat, isTr) : tx(M.kusurAc, isTr)}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Bolum>

                        {/* Olay günlüğü */}
                        <Bolum id="gunluk" baslik={<>📜 {tx(M.gunluk, isTr)}<Kavram k="olayGunlugu" isTr={isTr} darkMode={darkMode} /></>}
                               ek={<button type="button" data-testid="gunluk-temizle" className={btnIkincil}
                                           onClick={() => setGunluk([])}>{tx(M.temizle, isTr)}</button>}>
                            {gunluk.length === 0 ? (
                                <p className="text-sm opacity-70">{tx(M.gunlukBos, isTr)}</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table data-testid="gunluk-tablosu" className="w-full min-w-[520px] text-left text-xs">
                                        <thead className="opacity-60">
                                            <tr><th className="py-1">Method</th><th>Path</th><th>Status</th><th>ms</th><th>Code</th></tr>
                                        </thead>
                                        <tbody>
                                            {gunluk.map((g) => (
                                                <tr key={g.id} data-testid={`gunluk-satir-${g.id}`}
                                                    className={darkMode ? 'border-t border-slate-800' : 'border-t border-slate-200'}>
                                                    <td className="py-1 font-bold">{g.method}</td>
                                                    <td className="font-mono">{g.yol}</td>
                                                    <td className={String(g.durum).startsWith('2') ? 'text-emerald-400' : 'text-rose-400'}>{g.durum}</td>
                                                    <td>{g.sure}</td>
                                                    <td className="font-mono opacity-70">{g.hataKodu ?? ''}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Bolum>
                    </div>
                </details>
            </main>

            {/* ═══ GİRİŞ KUTUSU ═════════════════════════════════════════════ */}
            {girisAcik && (
                <div data-testid="giris-katman"
                     className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
                     onClick={(e) => { if (e.target === e.currentTarget) setGirisAcik(false) }}>
                    <div className={`w-full max-w-sm rounded-2xl border p-5 ${card}`}>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-bold">👤 {tx(M.girisYap, isTr)}</h2>
                            <button type="button" data-testid="giris-kapat" onClick={() => setGirisAcik(false)}
                                    className="rounded-lg px-2 py-1 text-sm opacity-70 hover:opacity-100">✕</button>
                        </div>
                        <p className="mb-3 text-xs opacity-70">{tx(M.demoHesap, isTr)}</p>
                        <form onSubmit={girisYap} className="space-y-3">
                            <label className="block">
                                <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.eposta, isTr)}</span>
                                <input data-testid="giris-eposta" type="email" className={input}
                                       value={epostaGirdi} onChange={(e) => setEpostaGirdi(e.target.value)} />
                            </label>
                            <label className="block">
                                <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.parola, isTr)}</span>
                                <input data-testid="giris-parola" type="password" className={input}
                                       value={parolaGirdi} onChange={(e) => setParolaGirdi(e.target.value)} />
                            </label>
                            <button type="submit" data-testid="giris-yap" className={`${btnSatis} w-full py-3`} disabled={mesgul}>
                                {tx(M.girisYap, isTr)}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Mod açıklaması — rozete tıklanınca */}
            {modAcik && (
                <div data-testid="mod-katman" className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
                     onClick={(e) => { if (e.target === e.currentTarget) setModAcik(false) }}>
                    <div className={`w-full max-w-lg rounded-2xl border p-5 ${card}`}>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-bold">{tx(M.modBaslik, isTr)}</h2>
                            <button type="button" data-testid="mod-katman-kapat" onClick={() => setModAcik(false)}
                                    className="rounded-lg px-2 py-1 text-sm opacity-70 hover:opacity-100">✕</button>
                        </div>
                        <p data-testid="mod-aciklama" className="text-sm leading-relaxed">
                            {mod === 'tarayici' ? tx(M.modTarayiciAnlat, isTr) : tx(M.modYerelAnlat, isTr)}
                        </p>
                        {mod === 'tarayici' && (
                            <p data-testid="mod-sinir" className="mt-3 rounded-xl border border-amber-500/50 bg-amber-500/10 p-3 text-sm leading-relaxed">
                                {tx(M.modTarayiciSinir, isTr)}
                            </p>
                        )}
                        <Link to="/qa-shop-setup" data-testid="mod-kuruluma-git"
                              className="mt-4 inline-block text-sm font-semibold text-indigo-400 hover:underline">
                            {tx(M.kurulumaGit, isTr)} →
                        </Link>
                    </div>
                </div>
            )}

            <QaShopManuelTur isTr={isTr} darkMode={darkMode} mod={mod} />

            <QaShopHizliGecis aktif="shop" isTr={isTr} darkMode={darkMode} />
        </div>
    )
}
