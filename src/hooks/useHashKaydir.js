// Adresteki `#bolum-id` çapasına kaydırma.
//
// ── NEDEN GEREKLİ ───────────────────────────────────────────────────────────
// Tarayıcı, sayfa AÇILIRKEN adreste bir çapa varsa oraya kendisi kaydırır —
// ama bu yalnızca hedef element o anda DOM'da varsa çalışır. Bu projede
// sayfalar React ile sonradan basılıyor: tarayıcı kaydırmayı denediğinde
// hedef bölüm henüz yok, kaydırma sessizce hiçbir şey yapmıyor ve kullanıcı
// sayfanın en üstünde kalıyor.
//
// Sonuç somut: "User Story'ler" düğmesine basan kullanıcı şartname sayfasının
// TEPESİNE düşüyordu; aradığı bölüm yüzlerce satır aşağıdaydı ve onu kaydırarak
// bulması bekleniyordu — yani düğme sözünü tutmuyordu.
//
// ── NEDEN YOKLAMA (polling) ─────────────────────────────────────────────────
// Tek bir `setTimeout` yeterli değil: bölümün ne zaman basılacağı veriye ve
// makineye göre değişir. Sabit bir gecikme yavaş makinede erken, hızlı
// makinede gereksiz uzun olurdu. Bunun yerine hedef bulunana kadar kısa
// aralıklarla yoklanır ve bir üst sınırda vazgeçilir — hedef hiç gelmezse
// (yanlış çapa) sayfa sonsuza kadar beklemez.
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const YOKLAMA_ARALIGI_MS = 60
const UST_SINIR_MS = 4000

export default function useHashKaydir(hazir = true) {
    const { hash } = useLocation()

    useEffect(() => {
        if (!hazir || !hash) return

        const hedefId = decodeURIComponent(hash.slice(1))
        if (!hedefId) return

        let birakildi = false
        const basladi = Date.now()

        const dene = () => {
            if (birakildi) return
            const hedef = document.getElementById(hedefId)
            if (hedef) {
                // `scroll-mt-*` sınıfları yapışkan başlığın altında kalmayı
                // önlüyor; bu yüzden hizalama `start` bırakıldı.
                hedef.scrollIntoView({ behavior: 'smooth', block: 'start' })
                return
            }
            if (Date.now() - basladi > UST_SINIR_MS) return
            setTimeout(dene, YOKLAMA_ARALIGI_MS)
        }

        dene()
        return () => { birakildi = true }
    }, [hash, hazir])
}
