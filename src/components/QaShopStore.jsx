// src/components/QaShopStore.jsx — /qa-shop mağaza yüzeyi
//
// NEDEN AYRI DOSYA: QaShopPage.jsx veri ve API mantığını taşır (istek, sandbox,
// defect anahtarları, olay günlüğü). Mağaza YÜZEYİ ondan ayrıldı çünkü ikisi
// farklı hızda değişir: endpoint'ler oturmuş durumda, vitrin ise gerçek bir dükkâna
// benzedikçe benzemeli.
//
// TASARIM AMACI — ekran GERÇEK bir alışveriş sitesi gibi görünmeli:
// kullanıcı buraya "test hedefi" görmeye değil, alışveriş yapmaya gelir gibi
// gelmeli. Teknik panel (bağlantı, defect anahtarları, olay günlüğü) sayfanın
// ALTINDA ve kapalı durur — açan görür, aramayan görmez.
//
// Görseller DIŞ DOSYA DEĞİL: her ürün görseli kategorisinden ve adından
// türetilen inline SVG'dir. Bu bilinçli — projede dışa bağımlı görsel dosyası
// kullanılmaz, ayrıca üretilen görsel her makinede aynı çıkar.
//
// GÖRSEL GERÇEKÇİLİK (2026-08-19, kullanıcı talebi — "trendyol.com'daki gibi
// gerçek bir mağaza hissi"): tek renkli düz siluetler yerine her kategori
// kendi YAPISAL detaylarıyla (yaka, düğme, dikiş, taban, bağcık, toka) ve
// kumaşı üç boyutlu gösteren highlight/shadow gradyanıyla çiziliyor. Zemin
// gerçek ürün fotoğrafçılığındaki gibi NÖTR stüdyo beyazı — ürüne göre
// renklenmiyor, çünkü gerçek bir sitede her ürün fotoğrafının arka planı
// aynıdır; bu tutarlılığın kendisi "gerçek" hissi veren şeydir.
import { useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FREE_SHIPPING_THRESHOLD } from '../data/generated/qaShopCore/pricing.js'
import { URUN_GORSELLERI } from '../data/generated/qaShopUrunGorselleri.js'

// ─── Renk paleti (HSL) ──────────────────────────────────────────────────────
//
// HSL tutuluyor çünkü kumaş artık TEK ton değil: highlight/base/shadow üç
// durağı buradan türetiliyor. Ad içindeki renk kelimesi eşleşirse o kullanılır
// ("Red Shirt" → kırmızı), yoksa addan türetilen sabit bir ton (hash) devreye
// girer — aynı ürün her zaman aynı rengi taşır.
const RENK_PALETI = {
    red: [0, 68, 46], blue: [217, 68, 52], navy: [222, 45, 28], black: [222, 15, 20],
    white: [210, 16, 90], beige: [32, 32, 70], green: [142, 55, 34], olive: [82, 24, 36],
    grey: [220, 8, 46], gray: [220, 8, 46], brown: [25, 42, 33], pink: [330, 72, 62],
    yellow: [45, 88, 50], purple: [262, 60, 56], orange: [21, 85, 50], cream: [42, 38, 86],
}

function adHash(metin) {
    let h = 0
    for (let i = 0; i < metin.length; i += 1) h = (h * 31 + metin.charCodeAt(i)) % 360
    return h
}

function paletHSL(ad = '') {
    const kucuk = ad.toLowerCase()
    for (const [kelime, hsl] of Object.entries(RENK_PALETI)) {
        if (kucuk.includes(kelime)) return hsl
    }
    return [adHash(ad), 50, 46]
}

const klemp = (n, min, max) => Math.min(max, Math.max(min, n))

// Bir üründen üç kumaş tonu üretir: parlak (ışık alan taraf), taban, gölge
// (ışıktan uzak taraf) — gradyan bunlardan kurulur. `line` kontur/dikiş
// çizgileri için koyu ama siyah olmayan bir ton verir.
function kumasTonlari(ad) {
    const [h, s, l] = paletHSL(ad)
    return {
        highlight: `hsl(${h} ${klemp(s - 8, 8, 88)}% ${klemp(l + 30, 0, 94)}%)`,
        base: `hsl(${h} ${s}% ${l}%)`,
        // Kenar artık İNCE ÇİZGİ ile değil GÖLGE ile okunuyor: bu ton kontur
        // olarak değil, kumaşın kendi gölge tarafı olarak kullanılıyor —
        // "çizilmiş" değil "fotoğraflanmış" hissi buradan geliyor.
        shadow: `hsl(${h} ${klemp(s + 8, 10, 92)}% ${klemp(l - 27, 4, 88)}%)`,
        // Yalnızca dikiş/düğme gibi GERÇEK yapısal ayrıntılar için — artık
        // siluetin tamamını çeviren kalın bir mürekkep çizgisi DEĞİL.
        line: `hsl(${h} ${klemp(s - 4, 0, 70)}% ${klemp(l - 30, 4, 40)}%)`,
    }
}

// Geriye dönük uyumluluk: tek bir taban rengi isteyen çağıran için.
export function urunRengi(ad = '') {
    return kumasTonlari(ad).base
}

// ─── Kategori tespiti ───────────────────────────────────────────────────────
//
// Siluet ONCE ÜRÜN ADINDAN seçilir, kategoriden değil. Sebebi ölçüldü: seed
// verisinde ad ile kategori her zaman örtüşmüyor — "Slim Fit Red Shirt" adlı
// ürünün kategorisi `boots`. Kategoriye güvenilirse vitrinde gömlek yazan
// kartta BOT resmi çıkıyor. Kullanıcının okuduğu şey ADDIR; görüntü ona
// uymalı. Kategori yalnızca ad bir şey söylemediğinde devreye girer.
const AD_ANAHTARLARI = [
    [/\b(t-?shirt|tee)\b/i, 'tshirts'],
    [/\bshirt\b/i, 'shirts'],
    [/\bdress\b/i, 'dresses'],
    [/\b(coat|jacket|parka)\b/i, 'coats'],
    [/\b(jean|jeans|denim|pant|trouser)\b/i, 'jeans'],
    [/\b(boot|boots)\b/i, 'boots'],
    [/\b(sneaker|sneakers|trainer)\b/i, 'sneakers'],
    [/\b(bag|backpack|tote)\b/i, 'bags'],
]

export function siluetTipi(urun) {
    const ad = urun?.name ?? ''
    for (const [kalip, tip] of AD_ANAHTARLARI) if (kalip.test(ad)) return tip
    return KIYAFET_CIZIMLERI[urun?.category] ? urun.category : 'tshirts'
}

// ─── Paylaşılan çizim yardımcıları ──────────────────────────────────────────

const METAL = '#cbd5e1'
const METAL_KENAR = '#64748b'
const DIKIS_RENGI = '#c9973a'   // sıcak kontrast dikiş ipliği (kot/çanta)

function Dugme({ cx, cy, r = 1.5, ton = '#f8f4ec', kenar = 'rgba(15,23,42,.35)' }) {
    return (
        <g>
            <circle cx={cx} cy={cy} r={r} fill={ton} stroke={kenar} strokeWidth="0.3" />
            <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.3} fill="rgba(255,255,255,.65)" />
        </g>
    )
}

// Her kategorinin DIŞ gövde yolu — TEK YERDE tanımlı. Kategori çizimi kumaşı
// bununla doldurur, UrunGorseli ise AYNI yolu bir clipPath olarak kullanıp
// üstüne yumuşak bir "stüdyo ışığı" lekesi bindirir. İki ayrı yerde aynı
// koordinatları elle tutmak, biri değişip diğeri unutulduğunda ışığın
// kumaşın dışına taşmasına yol açardı — bu yüzden tek kaynak.
const GOVDE_YOLU = {
    shirts: 'M32,20 Q38,15.5 44,14 L50,19 L56,14 Q62,15.5 68,20 Q77,22.5 83,25 Q75,33 71,41 L67,87 L33,87 L29,41 Q25,33 17,25 Q23,22.5 32,20 Z',
    tshirts: 'M30,25 Q35,20.5 42,18 Q50,25 58,18 Q65,20.5 70,25 Q75,32 77,40 L66,44 L64,86 L36,86 L34,44 L23,40 Q25,32 30,25 Z',
    dresses: 'M38,16 Q50,23 62,16 Q65,26 67,37 L59,39 L65,87 L35,87 L41,39 L33,37 Q35,26 38,16 Z',
    coats: 'M26,23 Q34,17.5 42,14 L50,23 L58,14 Q66,17.5 74,23 Q80,27.5 85,32 Q80,35 75,37 L75,89 L25,89 L25,37 Q20,35 15,32 Q20,27.5 26,23 Z',
    jeans: 'M32,20 L68,20 L72,44 L66,88 L56,88 L52,54 L48,88 L38,88 L34,44 Z',
    // Bot/spor ayakkabıda yalnızca ÜST (deri/kumaş) kısmın yolu — taban ayrı
    // bir renkte çizildiği için ışık lekesi de yalnızca üste düşmeli.
    boots: 'M33,16 L51,16 L51,54 Q51,62 61,66 L71,72 L71,76 L29,76 L29,16 Z',
    sneakers: 'M24,54 L42,52 L52,60 L70,64 Q78,66 80,72 L80,77 L22,77 L20,68 L22,58 Z',
    bags: 'M30,42 L70,42 L74,86 L26,86 Z',
}

// ─── Kategori çizimleri ─────────────────────────────────────────────────────
//
// Her fonksiyon `tones` alır (fill = kumaş gradyanı, highlight/shadow/line =
// detay tonları) ve o kategoriye özgü YAPISAL ayrıntıları çizer. Ayrıntı
// gerçekliği tek renkli bir silüetin veremediği şeyi verir: yaka, düğme,
// cep, dikiş, taban, bağcık — göz bunlardan "gerçek ürün" okur.

function GomlekCizimi({ tones }) {
    return (
        <g>
            <path d={GOVDE_YOLU.shirts}
                  fill={tones.fill} stroke={tones.shadow} strokeWidth="0.55" strokeOpacity="0.55" strokeLinejoin="round" />
            <path d="M44,14 L50,25 L38,20 Z" fill={tones.shadow} opacity="0.85" />
            <path d="M56,14 L50,25 L62,20 Z" fill={tones.shadow} opacity="0.85" />
            <line x1="50" y1="24" x2="50" y2="85" stroke={tones.line} strokeWidth="0.6" opacity="0.5" />
            <rect x="55" y="30" width="10" height="11" rx="1.4" fill={tones.highlight} opacity="0.35" stroke={tones.line} strokeWidth="0.4" />
            {[30, 42, 54, 66, 78].map((y) => <Dugme key={y} cx={50} cy={y} r={1.3} />)}
            <path d="M70,41 Q61,52 67,63" stroke="rgba(255,255,255,.35)" strokeWidth="1" fill="none" />
            <path d="M30,41 Q39,52 33,63" stroke="rgba(255,255,255,.35)" strokeWidth="1" fill="none" />
            <line x1="76" y1="23" x2="84" y2="27" stroke={tones.line} strokeWidth="0.6" opacity="0.5" />
            <line x1="24" y1="23" x2="16" y2="27" stroke={tones.line} strokeWidth="0.6" opacity="0.5" />
        </g>
    )
}

function TisortCizimi({ tones }) {
    return (
        <g>
            <path d={GOVDE_YOLU.tshirts}
                  fill={tones.fill} stroke={tones.shadow} strokeWidth="0.55" strokeOpacity="0.55" strokeLinejoin="round" />
            <path d="M41,19 Q50,27 59,19" stroke={tones.line} strokeWidth="1.3" fill="none" opacity="0.45" />
            <path d="M42,21 Q50,28 58,21" stroke="rgba(255,255,255,.4)" strokeWidth="0.8" fill="none" />
            <rect x="48.5" y="26" width="3" height="56" fill="rgba(0,0,0,.06)" />
            <line x1="24" y1="37" x2="31" y2="41" stroke={tones.line} strokeWidth="0.6" opacity="0.45" />
            <line x1="76" y1="37" x2="69" y2="41" stroke={tones.line} strokeWidth="0.6" opacity="0.45" />
        </g>
    )
}

function ElbiseCizimi({ tones }) {
    return (
        <g>
            <path d={GOVDE_YOLU.dresses}
                  fill={tones.fill} stroke={tones.shadow} strokeWidth="0.55" strokeOpacity="0.55" strokeLinejoin="round" />
            <path d="M44,17 Q50,22 56,17" stroke={tones.line} strokeWidth="0.9" fill="none" opacity="0.5" />
            <path d="M40,41 Q50,45 60,41" stroke={tones.line} strokeWidth="0.7" fill="none" opacity="0.4" />
            <path d="M46,43 Q40,65 38,85" stroke="rgba(255,255,255,.3)" strokeWidth="1" fill="none" />
            <path d="M54,43 Q60,65 62,85" stroke="rgba(0,0,0,.12)" strokeWidth="1.4" fill="none" />
        </g>
    )
}

function KabanCizimi({ tones }) {
    return (
        <g>
            <path d={GOVDE_YOLU.coats}
                  fill={tones.fill} stroke={tones.shadow} strokeWidth="0.55" strokeOpacity="0.55" strokeLinejoin="round" />
            <path d="M42,14 L50,32 L33,23 Z" fill={tones.shadow} opacity="0.85" />
            <path d="M58,14 L50,32 L67,23 Z" fill={tones.shadow} opacity="0.85" />
            <rect x="26" y="57" width="48" height="6" rx="1.4" fill={tones.shadow} opacity="0.6" />
            <rect x="47" y="55" width="6" height="9" rx="1" fill={METAL} stroke={METAL_KENAR} strokeWidth="0.4" />
            {[42, 56, 70].map((y) => <Dugme key={y} cx={50} cy={y} r={1.6} ton={METAL} kenar={METAL_KENAR} />)}
            <rect x="30" y="66" width="15" height="4" rx="2" fill="none" stroke={tones.line} strokeWidth="0.6" opacity="0.5" />
            <rect x="55" y="66" width="15" height="4" rx="2" fill="none" stroke={tones.line} strokeWidth="0.6" opacity="0.5" />
        </g>
    )
}

function KotCizimi({ tones }) {
    return (
        <g>
            <path d={GOVDE_YOLU.jeans}
                  fill={tones.fill} stroke={tones.shadow} strokeWidth="0.55" strokeOpacity="0.55" strokeLinejoin="round" />
            <rect x="30" y="16" width="40" height="6" rx="1.6" fill={tones.shadow} opacity="0.55" stroke={tones.line} strokeWidth="0.5" />
            {[34, 42, 50, 58, 66].map((x) => <rect key={x} x={x - 1} y="14" width="2" height="4" fill={tones.shadow} />)}
            {/* Kontrast dikiş — kot pantolonun imzası */}
            <path d="M65,22 Q59,29 63,37" stroke={DIKIS_RENGI} strokeWidth="0.8" strokeDasharray="1.6,1.4" fill="none" />
            <path d="M35,22 Q41,29 37,37" stroke={DIKIS_RENGI} strokeWidth="0.8" strokeDasharray="1.6,1.4" fill="none" />
            <line x1="50" y1="22" x2="50" y2="34" stroke={DIKIS_RENGI} strokeWidth="0.8" strokeDasharray="1.6,1.4" />
            <Dugme cx={50} cy={21} r={1.3} ton={METAL} kenar={METAL_KENAR} />
            <line x1="52" y1="56" x2="52" y2="86" stroke={tones.line} strokeWidth="0.5" opacity="0.35" />
            <path d="M46,50 Q50,58 54,50" stroke="rgba(0,0,0,.15)" strokeWidth="1.6" fill="none" />
            <line x1="34" y1="86" x2="38" y2="88" stroke={DIKIS_RENGI} strokeWidth="0.8" strokeDasharray="1.4,1.2" />
            <line x1="66" y1="86" x2="62" y2="88" stroke={DIKIS_RENGI} strokeWidth="0.8" strokeDasharray="1.4,1.2" />
        </g>
    )
}

function BotCizimi({ tones }) {
    return (
        <g>
            <path d={GOVDE_YOLU.boots}
                  fill={tones.fill} stroke={tones.shadow} strokeWidth="0.55" strokeOpacity="0.55" strokeLinejoin="round" />
            <path d="M69,68 L77,74 L77,84 L69,84 Z" fill={tones.shadow} />
            <path d="M23,78 L77,78 L79,86 L21,86 Z" fill="#2a2016" stroke="#1a1410" strokeWidth="0.5" />
            {[27, 35, 43, 51, 59, 67].map((x) => <line key={x} x1={x} y1="80" x2={x + 3} y2="84" stroke="#3d2f21" strokeWidth="0.6" />)}
            <ellipse cx="42" cy="16" rx="9" ry="2.6" fill={tones.shadow} opacity="0.5" stroke={tones.line} strokeWidth="0.5" />
            {[22, 29, 36, 43].map((y) => (
                <g key={y}>
                    <circle cx="36" cy={y} r="1" fill={METAL} stroke={METAL_KENAR} strokeWidth="0.3" />
                    <circle cx="46" cy={y} r="1" fill={METAL} stroke={METAL_KENAR} strokeWidth="0.3" />
                </g>
            ))}
            <path d="M36,22 L46,29 L36,36 L46,43" stroke="#4a3423" strokeWidth="0.9" fill="none" />
            <ellipse cx="39" cy="70" rx="8" ry="4" fill={tones.highlight} opacity="0.4" />
        </g>
    )
}

function SporAyakkabiCizimi({ tones }) {
    return (
        <g>
            <path d={GOVDE_YOLU.sneakers}
                  fill={tones.fill} stroke={tones.shadow} strokeWidth="0.55" strokeOpacity="0.55" strokeLinejoin="round" />
            <path d="M28,62 Q45,58 62,66 L60,70 Q44,63 30,67 Z" fill={tones.shadow} opacity="0.8" />
            <rect x="17" y="76" width="66" height="4" rx="1.5" fill={tones.highlight} opacity="0.5" />
            <path d="M17,80 L83,80 L85,86 Q85,87.5 83,87.5 L17,87.5 Q15,87.5 15,86 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.6" />
            {[24, 32, 40, 48, 56, 64, 72].map((x) => <line key={x} x1={x} y1="83" x2={x + 3} y2="87" stroke="#cbd5e1" strokeWidth="0.6" />)}
            <path d="M22,58 Q19,68 23,77 L30,77 Q26,67 28,58 Z" fill={tones.highlight} opacity="0.4" />
            <path d="M36,56 L42,60 L36,64 L42,68" stroke={tones.line} strokeWidth="0.9" fill="none" opacity="0.6" />
            {[54, 60, 66].map((y) => <circle key={y} cx="36" cy={y - 2} r="0.9" fill={METAL} stroke={METAL_KENAR} strokeWidth="0.25" />)}
        </g>
    )
}

function CantaCizimi({ tones }) {
    return (
        <g>
            <path d="M40,42 Q40,20 50,18 Q60,20 60,42" fill="none" stroke={tones.line} strokeWidth="2.2" strokeLinecap="round" />
            <path d="M43,42 Q43,24 50,22 Q57,24 57,42" fill="none" stroke={tones.highlight} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d={GOVDE_YOLU.bags} fill={tones.fill} stroke={tones.shadow} strokeWidth="0.55" strokeOpacity="0.55" strokeLinejoin="round" />
            <path d="M32,44 L68,44 L71,84 L29,84 Z" fill="none" stroke={DIKIS_RENGI} strokeWidth="0.7" strokeDasharray="1.8,1.4" opacity="0.7" />
            <line x1="32" y1="42" x2="68" y2="42" stroke={METAL_KENAR} strokeWidth="0.6" strokeDasharray="1.2,1" />
            <rect x="47" y="40.5" width="5" height="3.5" rx="0.8" fill={METAL} stroke={METAL_KENAR} strokeWidth="0.4" />
            <rect x="39" y="56" width="22" height="17" rx="2" fill={tones.highlight} opacity="0.28" stroke={tones.line} strokeWidth="0.5" />
            <circle cx="35" cy="43" r="1.4" fill={METAL} stroke={METAL_KENAR} strokeWidth="0.3" />
            <circle cx="65" cy="43" r="1.4" fill={METAL} stroke={METAL_KENAR} strokeWidth="0.3" />
        </g>
    )
}

const KIYAFET_CIZIMLERI = {
    shirts: GomlekCizimi,
    tshirts: TisortCizimi,
    dresses: ElbiseCizimi,
    coats: KabanCizimi,
    jeans: KotCizimi,
    boots: BotCizimi,
    sneakers: SporAyakkabiCizimi,
    bags: CantaCizimi,
}

// Zemin gölgesinin genişliği: her siluet artık x≈50 etrafında ortalanmış
// olarak çizildi (böylece tek bir gölge merkezi hepsine uyuyor); genişlik
// yalnızca kategorinin GERÇEK tabanı ne kadar geniş görünüyorsa ona göre
// ayarlanıyor — geniş bir kaban dar bir kot pantolondan daha geniş gölge düşürür.
const GOLGE_GENISLIK = {
    shirts: 24, tshirts: 22, dresses: 20, coats: 26,
    jeans: 20, boots: 24, sneakers: 26, bags: 20,
}

// ─── Gerçek ürün fotoğrafı ──────────────────────────────────────────────────
//
// Fotoğraflar `public/qa-shop/urunler/` altında durur ve manifest build öncesi
// üretilir (scripts/build-qa-shop-images.mjs). Manifest boşsa hiç `<img>`
// denenmez — dosya olmayan ortamda (CI) 404 ve konsol hatası üretmemek için.
//
// Kategori eşlemesi YENİDEN YAZILMAZ: `siluetTipi()` ad öncelikli çalışır,
// kategoriye yalnızca ad hiçbir kalıba uymazsa düşer. Fotoğraf da aynı
// karardan beslenir ki vitrinde gömlek yazan kartta bot fotoğrafı çıkmasın.
//
// Bu sıralama BİR ZAMANLAR bir veri hatasını maskeliyordu: seed üretecinde tip
// ile kategori kayıktı ("Shirt adlı ürün boots kategorisinde") ve burası onu
// görünmez kılıyordu. Kayma kaynağında düzeltildi; ad önceliği yine de
// korunuyor — ürünün ADI, kategori etiketinden daha güvenilir bir sinyaldir.
function fotografYolu(urun, tip) {
    const secenekler = URUN_GORSELLERI[tip]
    if (!secenekler?.length) return null
    // Seçim ürün id'sine göre belirlenimci: aynı ürün her açılışta aynı
    // fotoğrafı gösterir. Rastgele olsaydı kullanıcı sayfayı yenilediğinde
    // ürünün "değiştiğini" sanırdı.
    const sira = Math.abs(Number(urun?.id) || 0) % secenekler.length
    return `${import.meta.env.BASE_URL}${secenekler[sira]}`
}

export function UrunGorseli({ urun, boyut = 'kart' }) {
    // useId her <svg> örneğine gerçekten benzersiz bir kimlik verir; gradyan/
    // filtre id'leri ürün id'sine bağlı kalsaydı aynı ürün aynı sayfada iki
    // farklı boyutta render edildiğinde (kart + detay) id çakışması olurdu.
    const uidHam = useId()
    const uid = uidHam.replace(/[^a-zA-Z0-9]/g, '')
    const tip = siluetTipi(urun)
    const renkler = useMemo(() => kumasTonlari(urun?.name ?? ''), [urun?.name])
    const tones = useMemo(() => ({ ...renkler, fill: `url(#kumas-${uid})` }), [renkler, uid])
    const Cizim = KIYAFET_CIZIMLERI[tip] ?? KIYAFET_CIZIMLERI.tshirts
    const golgeRx = GOLGE_GENISLIK[tip] ?? 22
    const buyuk = boyut === 'detay'

    // Kart da detay da KARE.
    //
    // Ölçüldü: kart 4:5 iken kare kaynak görseller `object-cover` ile
    // kenarlarından %20 kırpılıyordu — geniş ürünlerde (sneaker, çanta) ürünün
    // burnu ve topuğu kesiliyordu. Kaynak görseller kare (optimizer 800×800
    // üretiyor) ve SVG çizimlerinin viewBox'ı da kare; kabı da kare yapmak
    // kırpmayı tamamen bitiriyor.
    const oran = 'aspect-square'

    // Manifest bir fotoğraf gösteriyorsa onu kullan. `dustu` bayrağı, manifest
    // güncel olsa bile dosya bozuk/erişilemez olduğunda SVG'ye dönmeyi sağlar —
    // kullanıcı boş bir kutu görmesin.
    const [dustu, setDustu] = useState(false)
    const fotograf = dustu ? null : fotografYolu(urun, tip)

    if (fotograf) {
        return (
            <img
                src={fotograf}
                alt={urun?.name ?? ''}
                data-testid={`urun-gorsel-${urun?.id}`}
                loading="lazy"
                decoding="async"
                onError={() => setDustu(true)}
                /* `object-contain` + beyaz zemin: kare olmayan bir dosya elle
                   eklenirse ürün KIRPILMAK yerine sığdırılır. Ürün fotoğrafları
                   zaten beyaz zeminli olduğu için oluşan boşluk görünmez.
                   Sabit oran ayrıca fotoğraf inerken kart yüksekliğinin
                   zıplamasını (düzen kayması) önler. */
                className={`w-full ${oran} bg-white object-contain`}
            />
        )
    }

    return (
        <svg
            viewBox="0 0 100 100"
            role="img"
            aria-label={urun?.name ?? ''}
            data-testid={`urun-gorsel-${urun?.id}`}
            className={`w-full ${oran}`}
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                {/* Kumaş gradyanı: sol-üstten ışık alır, sağ-alta doğru gölgeye
                    döner — düz tek renk yerine kumaşın üç boyutlu okunmasını
                    sağlayan tek değişiklik budur. */}
                <linearGradient id={`kumas-${uid}`} x1="0" y1="0" x2="0.65" y2="1">
                    <stop offset="0%" stopColor={renkler.highlight} />
                    <stop offset="52%" stopColor={renkler.base} />
                    <stop offset="100%" stopColor={renkler.shadow} />
                </linearGradient>
                {/* Stüdyo zemini ÜRÜNE GÖRE RENKLENMEZ — gerçek bir sitede her
                    ürün fotoğrafının arka planı aynıdır; bu tutarlılık "gerçek
                    fotoğraf" hissi veren şeydir, renkli zemin değil. */}
                <radialGradient id={`studyo-${uid}`} cx="50%" cy="42%" r="75%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="65%" stopColor="#f6f7f9" />
                    <stop offset="100%" stopColor="#e6eaf0" />
                </radialGradient>
                <filter id={`blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.4" />
                </filter>
                {/* Ürünün kendi gölgesi: sert bir kontur çizgisi yerine
                    zeminden hafifçe ayrılan yumuşak bir gölge — gerçek
                    ürün fotoğraflarında kenarı BU tanımlar, mürekkep
                    çizgisi değil. */}
                <filter id={`esya-golgesi-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0.6" dy="1.1" stdDeviation="0.9" floodColor="#0f172a" floodOpacity="0.22" />
                </filter>
                {/* Stüdyo spotu: kumaşın sol-üst köşesine düşen yumuşak beyaz
                    leke. Kırpma yolu GOVDE_YOLU ile AYNI kaynaktan geldiği için
                    ışık asla kumaşın dışına taşmaz. */}
                <radialGradient id={`isik-${uid}`} cx="32%" cy="22%" r="55%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <clipPath id={`kirp-${uid}`}>
                    <path d={GOVDE_YOLU[tip] ?? GOVDE_YOLU.tshirts} />
                </clipPath>
                {/* İnce kumaş tanesi: düz vektör dolgusunun "basılmış ikon"
                    hissini kırar, yüzeye fotoğrafik bir pürüz katar. */}
                <filter id={`tane-${uid}`}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="doku" />
                    <feColorMatrix in="doku" type="matrix"
                                   values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
                </filter>
            </defs>

            <rect width="100" height="100" fill={`url(#studyo-${uid})`} />

            {/* İki katmanlı zemin gölgesi: geniş+yumuşak (ambiyans) ve
                dar+koyu (temas noktası) — stüdyo ürün fotoğrafçılığının
                standart ışık kurulumu. */}
            <ellipse cx="50" cy="90" rx={golgeRx} ry="3" fill="rgba(15,23,42,0.16)" filter={`url(#blur-${uid})`} />
            <ellipse cx="50" cy="89" rx={golgeRx * 0.5} ry="1.4" fill="rgba(15,23,42,0.24)" />

            <g filter={`url(#esya-golgesi-${uid})`}>
                <Cizim tones={tones} />
                <rect width="100" height="100" fill={`url(#isik-${uid})`} clipPath={`url(#kirp-${uid})`} />
                <rect width="100" height="100" filter={`url(#tane-${uid})`} clipPath={`url(#kirp-${uid})`} />
            </g>
        </svg>
    )
}

// ─── Yıldız puanı ───────────────────────────────────────────────────────────

export function Yildizlar({ puan = 0, adet = 0, id, isTr }) {
    const tam = Math.round(Number(puan) || 0)
    return (
        <span data-testid={`urun-puan-${id}`} className="flex items-center gap-1 text-xs">
            <span aria-hidden="true" className="tracking-tight text-amber-400">
                {'★★★★★'.slice(0, tam)}
                <span className="opacity-30">{'★★★★★'.slice(tam)}</span>
            </span>
            <span className="opacity-60">
                {Number(puan ?? 0).toFixed(1)} ({adet} {isTr ? 'yorum' : 'reviews'})
            </span>
        </span>
    )
}

// ─── Ürün kartı ─────────────────────────────────────────────────────────────

// ⚠ GÖRSEL VE AD BİRER <Link> — düğme DEĞİL.
//
// Düğmeyken ürünün adresi yoktu: yeni sekmede açma, orta tık, bağlantıyı
// kopyala ve tarayıcı geri tuşu çalışmıyordu; `getByRole('link')` de hiçbir
// şey bulamıyordu. Otomasyon hedefi olarak bu, öğretilecek "link mi button
// mu" ayrımını da yok ediyordu.
//
// ⚠ Sınıf yerleşimine dikkat: index.css'te KATMANSIZ bir kural var —
// `.flex > a, li > a { display: inline-block }` — ve katmansız kurallar
// Tailwind yardımcılarını özgüllükten bağımsız YENER. Bu yüzden `line-clamp-2`
// bağlantının KENDİSİNE değil içindeki <span>'e verilir; anchor'a verilseydi
// kırpma sessizce çalışmazdı. Görsel bağlantısında sorun yok: her ikisi de
// flex öğesi olduğu için display zaten `block`a çevriliyor.
//
// `onDetay` artık YALNIZCA iyimser ön-yerleştirme yapar; adresi <Link> yazar.
// İkisi de adres yazsaydı tek tıkta iki geçmiş kaydı oluşur ve geri tuşu iki
// kez basmayı gerektirirdi.
export function UrunKarti({ urun, isTr, darkMode, para, onDetay, onHizliEkle, mesgul, urunAdresi }) {
    const [favori, setFavori] = useState(false)
    const kart = darkMode
        ? 'border-slate-800 bg-slate-900 hover:border-slate-700'
        : 'border-slate-200 bg-white hover:border-slate-300'

    // Ücretsiz kargo rozeti UYDURULMUŞ bir eşik değil: checkout'ta gerçekten
    // uygulanan FREE_SHIPPING_THRESHOLD'dan (§tek kaynak) okunuyor. "Bu ürünü
    // tek başına alırsan kargo bedava" — gerçek e-ticaret sitelerinin de
    // ürün kartında gösterdiği kural budur.
    const ucretsizKargo = Number(urun.price) >= FREE_SHIPPING_THRESHOLD

    return (
        <li
            data-testid={`urun-${urun.id}`}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border transition hover:shadow-lg ${kart}`}
        >
            <Link
                to={urunAdresi(urun)}
                data-testid={`urun-detay-${urun.id}`}
                onClick={() => onDetay(urun)}
                className="block w-full overflow-hidden text-left"
                aria-label={urun.name}
            >
                <span className="block overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:scale-105">
                        <UrunGorseli urun={urun} />
                    </span>
                </span>
            </Link>

            <button
                type="button"
                data-testid={`urun-favori-${urun.id}`}
                onClick={(e) => { e.stopPropagation(); setFavori((f) => !f) }}
                aria-pressed={favori}
                aria-label={isTr ? 'Favorilere ekle' : 'Add to favorites'}
                className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full text-base shadow transition ${
                    favori ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-500 hover:text-rose-500'}`}
            >
                {favori ? '♥' : '♡'}
            </button>

            {ucretsizKargo && (
                <span data-testid={`urun-kargo-${urun.id}`}
                      className="absolute left-2 top-2 rounded-full bg-emerald-600/95 px-2 py-1 text-[10px] font-bold text-white shadow">
                    🚚 {isTr ? 'Ücretsiz Kargo' : 'Free shipping'}
                </span>
            )}

            <div className="flex flex-1 flex-col gap-1 p-3">
                <span data-testid={`urun-marka-${urun.id}`} className="text-[11px] font-bold uppercase tracking-wide opacity-60">
                    {urun.brand}
                </span>
                <Link
                    to={urunAdresi(urun)}
                    data-testid={`urun-ad-${urun.id}`}
                    onClick={() => onDetay(urun)}
                    className="text-left text-sm font-semibold hover:underline"
                >
                    <span className="line-clamp-2">{urun.name}</span>
                </Link>

                <Yildizlar puan={urun.rating_avg} adet={urun.rating_count} id={urun.id} isTr={isTr} />

                <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                    <span data-testid={`urun-fiyat-${urun.id}`} className="text-base font-extrabold">
                        {para(urun.price)}
                    </span>
                    {urun.total_stock === 0 && (
                        <span data-testid={`urun-tukendi-${urun.id}`}
                              className="rounded-full bg-slate-500/20 px-2 py-1 text-[11px] font-semibold">
                            {isTr ? 'Tükendi' : 'Sold out'}
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    data-testid={`urun-sepete-${urun.id}`}
                    onClick={() => onHizliEkle(urun)}
                    disabled={mesgul || urun.total_stock === 0}
                    className="mt-2 min-h-[36px] w-full rounded-lg bg-orange-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isTr ? 'Sepete Ekle' : 'Add to Cart'}
                </button>
            </div>
        </li>
    )
}
