// ─── Ziyaretçi ölçümü (opsiyonel, varsayılan KAPALI) ─────────────────────────
// Site şu an hiçbir ölçüm taşımıyor: hangi sayfaya kimin geldiği, hangi arama
// sorgusunun işe yaradığı bilinmiyor. Arama görünürlüğü üzerinde çalışırken bu
// körlük en pahalı eksiklik — yapılan bir değişikliğin işe yarayıp yaramadığı
// ancak ölçümle anlaşılır.
//
// Neden env değişkenine bağlı: ölçüm hesabı henüz açılmadı. Kanca şimdiden
// hazır dursun ama hesap yokken HİÇBİR dış istek gitmesin istiyoruz — aksi
// halde her ziyaretçi tarayıcısında başarısız bir istek denenir ve testler
// tanımadıkları bir ağ çağrısıyla uğraşır.
//
// Açmak için `.env` dosyasına (veya deploy ortamına) şunu ekle:
//   VITE_PLAUSIBLE_DOMAIN=learnqa.dev
// İsteğe bağlı olarak kendi barındırdığın bir örnek için:
//   VITE_PLAUSIBLE_SRC=https://plausible.io/js/script.js
//
// Neden Plausible: çerez kullanmaz, kişisel veri toplamaz — çerez onayı
// gerektirmediği için kullanıcı deneyimine hiçbir şey eklemez.

const DEFAULT_SRC = 'https://plausible.io/js/script.js'

export function initAnalytics() {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
    if (!domain) return false

    // Aynı script iki kez eklenirse her ziyaret iki kez sayılır.
    if (document.querySelector('script[data-analytics="plausible"]')) return true

    const script = document.createElement('script')
    script.defer = true
    script.dataset.domain = domain
    script.dataset.analytics = 'plausible'
    script.src = import.meta.env.VITE_PLAUSIBLE_SRC || DEFAULT_SRC
    document.head.appendChild(script)
    return true
}
