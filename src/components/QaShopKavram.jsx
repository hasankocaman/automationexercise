// QA Shop — kavram baloncuğu (hover + tıkla + klavye)
//
// ── NE İŞE YARAR ────────────────────────────────────────────────────────────
// Dükkândaki ve API sayfasındaki opak düğme/etiketlerin yanına küçük bir ⓘ
// koyar; üzerine gelince ya da tıklayınca kavramın ne olduğunu gösterir.
//
// ── OKUNABİLİRLİK: NEDEN PORTAL VE SABİT KONUM ─────────────────────────────
// İlk sürüm baloncuğu tetikleyicinin İÇİNDE, `position: absolute` ve
// `bottom: 100%` ile açıyordu. Sayfanın üst şeridindeki mod rozetinde
// (localhost:4000 rozeti) baloncuk yukarı açılıp görüş alanının dışında
// kalıyordu — açıklama vardı ama kullanıcı onu OKUYAMIYORDU.
//
// İki ayrı sebep vardı ve ikisini birden çözmek gerekti:
//   1. Yer yokluğu — üstte boşluk kalmadığında baloncuk taşıyor.
//   2. Kırpılma — konumlandırılmış bir öğe, üstündeki `overflow` sınırlarına
//      takılır. Yalnızca "yer yoksa aşağı çevir" demek bunu çözmez.
//
// Çözüm: baloncuk `createPortal` ile `document.body`'ye taşınır ve
// `position: fixed` ile konumlandırılır. Böylece hiçbir üst öğenin taşma
// sınırına takılmaz. Açılırken ölçülüp yer varsa üstte, yoksa altta gösterilir;
// yatayda da görüş alanının dışına taşmayacak şekilde sıkıştırılır. Açıkken
// kaydırma ve boyut değişimi yeniden ölçüm tetikler.
//
// ── OTOMASYONU BOZMAMA KISITI (bu kritik) ───────────────────────────────────
// `/qa-shop` bir Selenium/Playwright HEDEFİDİR. Playwright `.click()` çağrısı
// tıklamadan ÖNCE hover yapar; düğmenin üstünü kapatan bir katman açılırsa
// tıklama kesilir ("element intercepted pointer events") ve pratik hedefi
// FLAKY olur. Bir QA öğrenme platformunda kazara flakiness öğretmek,
// öğretilebilecek en kötü şeydir.
//
// Üç koruma birden:
//   1. Baloncuk `pointer-events: none` taşır — hiçbir zaman tıklama hedefi
//      olmaz, hit-test onu görmez, altındaki düğme tıklanabilir kalır.
//      ⚠ Bu satır artık GERÇEKTEN taşıyıcı: baloncuk yer yokken AŞAĞI
//      açılıyor ve o durumda düğmenin üstünü örtebiliyor. (Eskiden yalnızca
//      yukarı açıldığı için ölçümde örtüşme çıkmıyordu; artık çıkabilir.)
//   2. ⓘ tetikleyicisi düğmenin İÇİNE değil YANINA konur; düğmenin kendi
//      DOM'u ve `data-testid`'si değişmez.
//   3. Tetikleyici `tabIndex={0}` ile klavyeye açık ve otomasyonun aradığı
//      `data-testid`'lerle çakışmayan ayrı bir test id'si taşır.
//
// ── DOKUNMATİK ──────────────────────────────────────────────────────────────
// Yalnızca `:hover` ile açılan bir ipucu dokunmatik cihazda ERİŞİLEMEZ olur.
// Bu yüzden tıklama da açar/kapatır; ESC ve dışarı-tık kapatır.
import { useEffect, useLayoutEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { QA_SHOP_KAVRAMLAR } from '../data/qaShopKavramlarData'

const tx = (v, isTr) => {
    if (v == null) return ''
    if (typeof v === 'string') return v
    return isTr ? (v.tr ?? v.en ?? '') : (v.en ?? v.tr ?? '')
}

const KENAR_BOSLUGU = 8    // görüş alanı kenarına bırakılan pay
const ARALIK = 8           // tetikleyici ile baloncuk arası

// `children` verilirse SARMALAYICI kip: baloncuk, sarılan öğenin (düğmenin)
// üzerine gelince de açılır — kullanıcı ⓘ'yi nişan almak zorunda kalmaz.
// `tamGenislik`: sarılan öğe `w-full` ise sarmalayıcı da tam genişlik olmalı.
export default function Kavram({ k, isTr, darkMode, hizala = 'sol', children, tamGenislik = false }) {
    const kavram = QA_SHOP_KAVRAMLAR[k]

    // İKİ AYRI DURUM, tek bir `acik` değil. Tek durumla yazıldığında iki hata
    // birden çıktı ve ikisini de test yakaladı:
    //   · Tıklamadan önce fare zaten üstteydi → hover açıyor, tıklama TERSİNE
    //     çeviriyor, yani tıklamak baloncuğu KAPATIYORDU.
    //   · Fare rozetten sarılan düğmeye geçince rozetin onMouseLeave'i
    //     ateşleniyor, sarmalayıcının onMouseEnter'ı ateşlenmiyor (fare
    //     sarmalayıcıdan hiç çıkmadı) → baloncuk kapanıyordu.
    // Fare olayları YALNIZCA sarmalayıcıda durur.
    const [uzerinde, setUzerinde] = useState(false)
    const [sabit, setSabit] = useState(false)
    const acik = uzerinde || sabit

    const sarmalRef = useRef(null)
    const balonRef = useRef(null)
    const popId = useId()

    // Ölçülene kadar görünmez: konumlanmamış baloncuk bir kare boyunca
    // yanlış yerde parlar ve bu göz için sıçrama olarak görünür.
    const [konum, setKonum] = useState(null)

    useEffect(() => {
        if (!acik) return
        const kapat = () => { setUzerinde(false); setSabit(false) }
        const esc = (e) => { if (e.key === 'Escape') kapat() }
        const disari = (e) => {
            if (sarmalRef.current && !sarmalRef.current.contains(e.target)) kapat()
        }
        document.addEventListener('keydown', esc)
        document.addEventListener('mousedown', disari)
        document.addEventListener('touchstart', disari)
        return () => {
            document.removeEventListener('keydown', esc)
            document.removeEventListener('mousedown', disari)
            document.removeEventListener('touchstart', disari)
        }
    }, [acik])

    // Konumu ölç ve gerekirse çevir. Kaydırma/boyut değişiminde yenile —
    // sabit konumlu bir katman sayfayla birlikte kaymaz, elle takip gerekir.
    useLayoutEffect(() => {
        if (!acik) { setKonum(null); return }

        const hesapla = () => {
            const tetik = sarmalRef.current
            const balon = balonRef.current
            if (!tetik || !balon) return

            const t = tetik.getBoundingClientRect()
            const b = balon.getBoundingClientRect()
            const gorusG = window.innerWidth
            const gorusY = window.innerHeight

            // Dikey: üstte yer varsa üstte, yoksa altta. "Yer" derken
            // baloncuğun GERÇEK yüksekliği ölçülüyor, sabit bir tahmin değil.
            const ustBosluk = t.top - ARALIK - KENAR_BOSLUGU
            const altBosluk = gorusY - t.bottom - ARALIK - KENAR_BOSLUGU
            const altta = ustBosluk < b.height && altBosluk > ustBosluk
            const top = altta ? t.bottom + ARALIK : t.top - ARALIK - b.height

            // Yatay: tercih edilen hizalamadan başla, taşarsa içeri çek.
            let left = hizala === 'sag' ? t.right - b.width : t.left
            if (left + b.width > gorusG - KENAR_BOSLUGU) left = gorusG - KENAR_BOSLUGU - b.width
            if (left < KENAR_BOSLUGU) left = KENAR_BOSLUGU

            setKonum({ top: Math.max(KENAR_BOSLUGU, top), left, altta })
        }

        hesapla()
        // `capture: true` — iç içe kaydırılabilir bir kapsayıcı içindeysek
        // pencereye baloncuk gelmeyen kaydırmaları da yakalamak için.
        window.addEventListener('scroll', hesapla, { passive: true, capture: true })
        window.addEventListener('resize', hesapla, { passive: true })
        return () => {
            window.removeEventListener('scroll', hesapla, { capture: true })
            window.removeEventListener('resize', hesapla)
        }
    }, [acik, hizala, isTr])

    // Sözlükte olmayan bir anahtar sessizce kaybolmasın: geliştirme sırasında
    // yazım hatasını görünür kılar, üretimde hiçbir şey render etmez.
    // (Build kapısı da bunu kırar: scripts/check-qa-shop-kavramlar.mjs)
    if (!kavram) {
        if (import.meta.env?.DEV) console.warn(`[QaShopKavram] tanımsız kavram: ${k}`)
        return null
    }

    const vurgu = darkMode ? '#818cf8' : '#4f46e5'
    const zemin = darkMode ? '#0b1220' : '#ffffff'
    const kenar = darkMode ? '#334155' : '#c7d2fe'
    const anaMetin = darkMode ? '#e2e8f0' : '#1e293b'
    const altMetin = darkMode ? '#94a3b8' : '#475569'

    const balon = acik && typeof document !== 'undefined' ? createPortal(
        <div
            ref={balonRef}
            data-testid={`kavram-balonu-${k}`}
            data-yon={konum?.altta ? 'alt' : 'ust'}
            id={popId}
            role="tooltip"
            style={{
                position: 'fixed',
                top: konum ? konum.top : 0,
                left: konum ? konum.left : 0,
                // Ölçüm bitene kadar görünmez ama YER KAPLAR — yoksa
                // yüksekliği ölçülemez ve çevirme kararı verilemez.
                visibility: konum ? 'visible' : 'hidden',
                zIndex: 9999,
                width: 'max-content',
                minWidth: 200,
                maxWidth: `min(320px, calc(100vw - ${KENAR_BOSLUGU * 2}px))`,
                padding: '10px 12px',
                background: zemin,
                border: `1px solid ${kenar}`,
                borderRadius: 12,
                boxShadow: darkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(15,23,42,0.15)',
                textAlign: 'left',
                whiteSpace: 'normal',
                lineHeight: 1.5,
                fontWeight: 400,
                // Otomasyonun tıklamasını ASLA kesmesin (yukarıdaki not).
                pointerEvents: 'none',
            }}
        >
            <strong style={{ display: 'block', fontSize: 13, color: vurgu, marginBottom: 5 }}>
                {tx(kavram.ad, isTr)}
            </strong>
            <span style={{ display: 'block', fontSize: 13, color: anaMetin }}>
                {tx(kavram.ozet, isTr)}
            </span>
            {kavram.detay && (
                <span style={{ display: 'block', fontSize: 12, color: altMetin, marginTop: 6 }}>
                    {tx(kavram.detay, isTr)}
                </span>
            )}
        </div>,
        document.body,
    ) : null

    return (
        <span
            ref={sarmalRef}
            style={{
                position: 'relative',
                display: tamGenislik ? 'flex' : 'inline-flex',
                width: tamGenislik ? '100%' : undefined,
                alignItems: 'center',
                verticalAlign: 'middle',
            }}
            onMouseEnter={() => setUzerinde(true)}
            onMouseLeave={() => setUzerinde(false)}
        >
            {children}
            <span
                data-testid={`kavram-${k}`}
                data-kavram={k}
                role="button"
                tabIndex={0}
                aria-expanded={acik}
                aria-label={`${tx(kavram.ad, isTr)} — ${isTr ? 'ne demek' : 'what it means'}`}
                aria-describedby={acik ? popId : undefined}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSabit((v) => !v) }}
                onFocus={() => setUzerinde(true)}
                onBlur={() => setUzerinde(false)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSabit((v) => !v) }
                }}
                style={{
                    display: 'inline-grid',
                    placeItems: 'center',
                    width: 18,
                    height: 18,
                    marginLeft: 4,
                    borderRadius: 999,
                    border: `1px solid ${kenar}`,
                    color: vurgu,
                    fontSize: 11,
                    fontWeight: 700,
                    lineHeight: 1,
                    cursor: 'help',
                    userSelect: 'none',
                    flexShrink: 0,
                }}
            >
                i
            </span>
            {balon}
        </span>
    )
}
