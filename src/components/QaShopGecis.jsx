// QA Shop — sayfalar arası geçiş şeridi
//
// ── NEDEN VAR ───────────────────────────────────────────────────────────────
// QA Shop üç sayfadan oluşuyor ve öğrenme sırası **şartname → kurulum →
// dükkân**. Ama kullanıcı bu sıraya mahkûm değil: şartnameyi okurken "peki
// bu ekran neye benziyor?" diye merak eder, dükkânda gezerken "bu kuralın
// tanımı neydi?" diye geri döner.
//
// Bu şerit olmadan üç sayfa birbirini bilmiyordu; kullanıcı adres çubuğunu
// elle düzenlemek zorundaydı. Kullanıcının kendi sözleriyle: "uygulama linki
// nerede?"
//
// ── TASARIM ─────────────────────────────────────────────────────────────────
// Bulunulan sayfa pasif bir etiket olarak gösterilir (kaybolmaz) — kullanıcı
// üçlünün neresinde olduğunu görmeli. Diğer ikisi tıklanabilir.
//
// "Mağazayı Aç" birincil eylem rengiyle (turuncu) ayrılır: üçü arasında tek
// ÇALIŞAN uygulama odur, diğer ikisi belgedir.
import { Link } from 'react-router-dom'

// Şerit beş sayfayı bağlar. `yol` DERİN bağlantı taşır: kullanıcı
// "Şartname"ye bastığında sayfanın en üstüne değil, aradığı yere düşmeli —
// user story'ler o sayfanın çok aşağısında ve tepeden başlamak, aramayı
// kullanıcıya yaptırmak demektir.
//
// Hedef bölüm id'leri sayfaların KENDİ bölüm id'leridir (spec sayfasında
// `id={section.id}`, kurulum sayfasında `id={step.id}`) — burada uydurulmuş
// bir çapa yok. Kaydırmayı `useHashKaydir` yapar.
const SAYFALAR = [
    {
        id: 'backlog',
        yol: '/qa-shop-backlog#epics',
        ikon: '🗂️',
        etiket: { tr: 'Backlog', en: 'Backlog' },
        aciklama: { tr: 'gereksinim, epic, frontend/backend', en: 'requirements, epics, frontend/backend' },
    },
    {
        id: 'spec',
        yol: '/qa-shop-spec#user-stories',
        ikon: '📋',
        etiket: { tr: 'User Story\'ler', en: 'User Stories' },
        aciklama: { tr: '16 story ve kabul kriterleri', en: '16 stories and acceptance criteria' },
    },
    {
        id: 'setup',
        yol: '/qa-shop-setup#step-1-docker',
        ikon: '🛠️',
        etiket: { tr: 'Kurulum', en: 'Setup' },
        aciklama: { tr: 'Docker, DBeaver, Postman', en: 'Docker, DBeaver, Postman' },
    },
    {
        id: 'api',
        yol: '/qa-shop-api',
        ikon: '🔌',
        etiket: { tr: 'Swagger / API', en: 'Swagger / API' },
        aciklama: { tr: '46 endpoint, status kodlarıyla', en: '46 endpoints with status codes' },
    },
    {
        id: 'shop',
        yol: '/qa-shop',
        ikon: '🛍️',
        etiket: { tr: 'Mağazayı Aç', en: 'Open the Shop' },
        aciklama: { tr: 'çalışan dükkân — kurulum gerekmez', en: 'the running shop — no setup needed' },
        birincil: true,
    },
]

const tx = (v, isTr) => (typeof v === 'string' ? v : (isTr ? v.tr : v.en))

export default function QaShopGecis({ aktif, isTr, darkMode }) {
    const kutu = darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'

    return (
        <nav
            data-testid="qa-shop-gecis"
            aria-label={isTr ? 'QA Shop sayfaları' : 'QA Shop pages'}
            className={`mb-6 rounded-2xl border p-3 ${kutu}`}
        >
            <ul className="flex flex-wrap items-stretch gap-2">
                {SAYFALAR.map((s) => {
                    const buradasin = s.id === aktif

                    if (buradasin) {
                        return (
                            <li key={s.id} className="min-w-[140px] flex-1">
                                <span
                                    data-testid={`gecis-${s.id}`}
                                    aria-current="page"
                                    className={`flex h-full flex-col justify-center rounded-xl border px-3 py-2 ${
                                        darkMode
                                            ? 'border-slate-600 bg-slate-800 text-slate-300'
                                            : 'border-slate-400 bg-white text-slate-700'}`}
                                >
                                    <span className="block text-sm font-bold">
                                        {s.ikon} {tx(s.etiket, isTr)}
                                    </span>
                                    <span className="block text-[11px] opacity-70">
                                        {isTr ? 'buradasın' : 'you are here'}
                                    </span>
                                </span>
                            </li>
                        )
                    }

                    return (
                        <li key={s.id} className="min-w-[140px] flex-1">
                            <Link
                                to={s.yol}
                                data-testid={`gecis-${s.id}`}
                                className={`flex h-full flex-col justify-center rounded-xl px-3 py-2 transition ${
                                    s.birincil
                                        ? 'bg-orange-600 text-white hover:bg-orange-500'
                                        : darkMode
                                            ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                                            : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}
                            >
                                <span className="block text-sm font-bold">
                                    {s.ikon} {tx(s.etiket, isTr)} →
                                </span>
                                <span className="block text-[11px] opacity-80">{tx(s.aciklama, isTr)}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
