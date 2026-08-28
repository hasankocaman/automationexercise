// Odak modu durumu — dekoratif efektleri kapatan anahtar.
//
// NEDEN AYRI DOSYA: `TopicHeader` odak modu düğmesini KOŞULSUZ render eder ama
// durumu dışarıdan alır. `setFocusMode` verilmeyen bir sayfada düğme ekranda
// durur, tıklanınca "is not a function" ile patlar ve sayfa sessizce bozulur —
// QA Shop'un dört sayfasında tam olarak bu oluyordu. Durum tek bir yerde
// tanımlı olsun ki başlığı kullanan yeni bir sayfa aynı tuzağa düşmesin.
//
// Davranış `TopicPage` ile birebir aynı: localStorage `focusMode` anahtarı ve
// kök öğedeki `focus-mode` sınıfı (bkz. src/focus-mode.css).
import { useEffect, useState } from 'react'

export default function useOdakModu() {
    const [odakModu, setOdakModu] = useState(() => {
        const kayitli = localStorage.getItem('focusMode')
        const acik = kayitli !== null ? JSON.parse(kayitli) : false
        document.documentElement.classList.toggle('focus-mode', acik)
        return acik
    })

    useEffect(() => {
        localStorage.setItem('focusMode', JSON.stringify(odakModu))
        document.documentElement.classList.toggle('focus-mode', odakModu)
    }, [odakModu])

    return [odakModu, setOdakModu]
}
