// Karanlık/aydınlık tema durumu — sitenin geri kalanıyla AYNI mekanizma.
//
// NEDEN AYRI DOSYA: bu kanca dört QA Shop sayfasına ayrı ayrı kopyalanmıştı ve
// kopyalar ayrışmıştı. İkisi kök öğeye `dark-mode`/`light-mode-forced` yazıyor
// (sitenin her yerinde kullanılan çift), ikisi ise yalnızca `dark` yazıyordu.
// Sonuç: o iki sayfada tema düğmesine basmak sayfanın kendi renklerini
// çeviriyor ama global CSS'e dayanan başlık ve ortak parçalar karanlık
// kalıyordu. Kopya varken bu tür bir ayrışmayı hiçbir kapı göremez.
//
// Davranış `TopicPage` ile birebir aynı: localStorage `darkMode` anahtarı,
// varsayılan karanlık.
import { useEffect, useState } from 'react'

export default function useKaranlikMod() {
    const [karanlik, setKaranlik] = useState(() => {
        const kayitli = localStorage.getItem('darkMode')
        const acik = kayitli !== null ? JSON.parse(kayitli) : true
        document.documentElement.classList.toggle('dark-mode', acik)
        document.documentElement.classList.toggle('light-mode-forced', !acik)
        return acik
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(karanlik))
        document.documentElement.classList.toggle('dark-mode', karanlik)
        document.documentElement.classList.toggle('light-mode-forced', !karanlik)
    }, [karanlik])

    return [karanlik, setKaranlik]
}
