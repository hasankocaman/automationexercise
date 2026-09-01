// src/components/QaShopModAnlatimi.jsx
//
// "Bu dükkân hangi veriyle çalışıyor?" — iki çalışma kipinin görsel anlatımı.
//
// ── NEDEN VAR ───────────────────────────────────────────────────────────────
// Kullanıcı raporu: rozetteki "Tarayıcı modu · kurulum yok" ifadesi anlaşılmaz
// bulundu ve üç soru soruldu — kurulum yok ne demek, Docker'sız ne yapmalıyım,
// Docker kurduysam neye gerek var neye yok. Önceki anlatım düz metin bir
// paragraftı ve üçünden yalnızca birine, o da kısmen cevap veriyordu.
//
// ── NEDEN ANİMASYON ─────────────────────────────────────────────────────────
// Anlatılan şey bir YOL farkı: aynı tıklama iki kipte farklı duraklardan
// geçiyor ve veri farklı yerde duruyor. Bunu cümleyle anlatmak okuyucudan
// zihninde bir diyagram kurmasını istemek demek; paketi rayda yürütmek aynı
// bilgiyi tek bakışta veriyor. Dış kütüphane yok, saf CSS — `prefers-reduced-
// motion` açıkken paket durur, her şey aynen okunur.
//
// ── İKİ YERDE KULLANILIR ────────────────────────────────────────────────────
// Dükkânda mod rozetinin katmanında ve kurulum rehberinin başında. Metin
// `qaShopModData.js`'te durur; bileşen kopyalanmaz, içeri alınır.
import { Link } from 'react-router-dom'
import {
    QA_SHOP_MODLARI,
    QA_SHOP_MOD_SORULARI,
    QA_SHOP_MOD_YETENEKLERI,
} from '../data/qaShopModData.js'

const tx = (deger, isTr) => {
    if (deger && typeof deger === 'object') return isTr ? deger.tr : (deger.en ?? deger.tr)
    return deger
}

// Paket üç durak arasında gidip gelir. Süre bilinçli olarak yavaş (6 sn):
// okuyucunun gözü metne dönebilsin, hareket dikkat çalmasın.
const MOD_CSS = `
@keyframes qsModPaket {
  0%   { top: 6%;  opacity: 0; }
  6%   { opacity: 1; }
  44%  { top: 44%; opacity: 1; }
  56%  { top: 44%; opacity: 1; }
  94%  { top: 82%; opacity: 1; }
  100% { top: 82%; opacity: 0; }
}
@keyframes qsModNabiz {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.10); }
}
.qs-mod-paket  { animation: qsModPaket 6s ease-in-out infinite; }
.qs-mod-durak-0 { animation: qsModNabiz 6s ease-in-out infinite; }
.qs-mod-durak-1 { animation: qsModNabiz 6s ease-in-out infinite 2s; }
.qs-mod-durak-2 { animation: qsModNabiz 6s ease-in-out infinite 4s; }
@media (prefers-reduced-motion: reduce) {
  .qs-mod-paket { animation: none; top: 44%; }
  .qs-mod-durak-0, .qs-mod-durak-1, .qs-mod-durak-2 { animation: none; }
}
`

// ─── Tek kipin veri yolu ────────────────────────────────────────────────────
// `aktif` yalnızca dükkânda anlamlıdır (orada hangi kipte olduğumuz ÖLÇÜLÜR);
// kurulum rehberinde iki kip de eşit ağırlıkta gösterilir çünkü orada henüz
// bir ölçüm yok ve birini öne çıkarmak yanlış yönlendirme olurdu.
function KipYolu({ kip, aktif, isTr, darkMode }) {
    const tarayici = kip.id === 'tarayici'
    const vurgu = tarayici
        ? { kenar: 'border-sky-500', zemin: darkMode ? 'bg-sky-500/10' : 'bg-sky-50', yazi: darkMode ? 'text-sky-300' : 'text-sky-700', ray: darkMode ? 'bg-sky-500/40' : 'bg-sky-300' }
        : { kenar: 'border-emerald-500', zemin: darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50', yazi: darkMode ? 'text-emerald-300' : 'text-emerald-700', ray: darkMode ? 'bg-emerald-500/40' : 'bg-emerald-300' }

    return (
        <div
            data-testid={`mod-yolu-${kip.id}`}
            data-aktif={aktif ? 'evet' : 'hayir'}
            className={`rounded-2xl border-2 p-3 transition md:p-4 ${
                aktif
                    ? `${vurgu.kenar} ${vurgu.zemin}`
                    : darkMode ? 'border-slate-800 bg-slate-900/40 opacity-70' : 'border-slate-200 bg-slate-50 opacity-80'
            }`}
        >
            <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-lg" aria-hidden="true">{kip.ikon}</span>
                <h3 className={`text-sm font-bold md:text-base ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {tx(kip.ad, isTr)}
                </h3>
                {aktif && (
                    <span data-testid={`mod-buradasin-${kip.id}`}
                          className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${vurgu.kenar} ${vurgu.yazi}`}>
                        {isTr ? 'ŞU AN BURADASIN' : 'YOU ARE HERE'}
                    </span>
                )}
            </div>
            <p className={`mb-3 text-xs font-semibold ${vurgu.yazi}`}>{tx(kip.etiket, isTr)}</p>

            {/* Ray: üç durak alt alta, paket yukarıdan aşağı iner */}
            <div className={`relative rounded-xl border px-3 py-3 ${
                darkMode ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-white'
            }`}>
                <div className={`absolute bottom-8 left-[26px] top-8 w-[2px] ${vurgu.ray}`} aria-hidden="true" />
                {aktif && (
                    <div className="qs-mod-paket pointer-events-none absolute left-[17px] z-10 text-sm" aria-hidden="true">📦</div>
                )}

                <ol className="relative space-y-3">
                    {kip.duraklar.map((d, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className={`${aktif ? `qs-mod-durak-${i}` : ''} grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border-2 text-base ${
                                aktif ? `${vurgu.kenar} ${vurgu.zemin}` : darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-slate-100'
                            }`}>
                                <span aria-hidden="true">{d.ikon}</span>
                            </span>
                            <div className="min-w-0 pt-1">
                                <p className={`text-xs font-bold md:text-sm ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                    {tx(d.ad, isTr)}
                                </p>
                                <p className={`mt-0.5 text-[11px] leading-relaxed md:text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {tx(d.not, isTr)}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <p className={`mt-2 text-[11px] font-semibold ${vurgu.yazi}`}>
                📍 {tx(kip.nerede, isTr)}
            </p>
        </div>
    )
}

// ─── Ana bileşen ────────────────────────────────────────────────────────────
// `mod`: 'tarayici' | 'yerel' | null. null ise hiçbir kip "şu an buradasın"
// işareti almaz (kurulum rehberi böyle kullanır).
export default function QaShopModAnlatimi({ mod = null, isTr, darkMode, kurulumLinki = true }) {
    const aktifKip = mod === 'tarayici' ? 'tarayici' : mod === 'yerel' ? 'docker' : null
    const kutu = darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'

    return (
        <div data-testid="mod-anlatimi" className="min-w-0">
            <style>{MOD_CSS}</style>

            {/* 1) İki yol yan yana */}
            <div className="grid gap-3 md:grid-cols-2">
                <KipYolu kip={QA_SHOP_MODLARI.tarayici} aktif={aktifKip === 'tarayici'} isTr={isTr} darkMode={darkMode} />
                <KipYolu kip={QA_SHOP_MODLARI.docker} aktif={aktifKip === 'docker'} isTr={isTr} darkMode={darkMode} />
            </div>

            {/* 2) Üç soru — kullanıcının gerçekten sorduğu sırayla */}
            <div data-testid="mod-sorulari" className="mt-4 space-y-2">
                {QA_SHOP_MOD_SORULARI.map((s) => (
                    <details key={s.id} data-testid={`mod-soru-${s.id}`}
                             open={s.id === 'kurulum-yok'}
                             className={`rounded-xl border p-3 ${kutu}`}>
                        <summary data-testid={`mod-soru-ac-${s.id}`}
                                 className={`cursor-pointer text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                            <span aria-hidden="true">{s.ikon}</span> {tx(s.soru, isTr)}
                        </summary>
                        <p data-testid={`mod-cevap-${s.id}`}
                           className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {tx(s.cevap, isTr)}
                        </p>
                    </details>
                ))}
            </div>

            {/* 3) Neye gerek var, neye yok — tek bakışta */}
            <div className="mt-4">
                <h3 className={`mb-2 text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {isTr ? 'Neye Docker gerekiyor, neye gerekmiyor' : 'What needs Docker and what does not'}
                </h3>
                {/* `min-w-0` ZORUNLU: onsuz kaydırma kabı kendi asgari
                    genişliğini içeriğin asgarisine eşitler, tablo tüm katmanı
                    genişletir ve dar ekranda katman iki kenardan birden taşar.
                    Ölçüldü: 375 px'te katman 420 px oluyor ve taşan kısma
                    kaydırarak da ulaşılamıyordu. */}
                <div className="min-w-0 overflow-x-auto">
                    <table data-testid="mod-yetenek-tablosu" className="w-full min-w-[300px] border-collapse text-sm">
                        <thead>
                            <tr className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                                <th className="border-b px-2 py-1.5 text-left text-xs font-semibold">
                                    {isTr ? 'Ne yapacaksın' : 'What you want to do'}
                                </th>
                                <th className="border-b px-2 py-1.5 text-center text-xs font-semibold">🌐</th>
                                <th className="border-b px-2 py-1.5 text-center text-xs font-semibold">🐳</th>
                            </tr>
                        </thead>
                        <tbody>
                            {QA_SHOP_MOD_YETENEKLERI.map((y) => (
                                <tr key={y.id} data-testid={`mod-yetenek-${y.id}`}>
                                    <td className={`border-b px-2 py-1.5 align-top ${darkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'}`}>
                                        <span className="text-xs md:text-sm">{tx(y.is, isTr)}</span>
                                        {y.neden && (
                                            <span className={`mt-0.5 block text-[11px] leading-relaxed ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                                {tx(y.neden, isTr)}
                                            </span>
                                        )}
                                    </td>
                                    <td className={`border-b px-2 py-1.5 text-center ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                                        <span data-testid={`mod-yetenek-tarayici-${y.id}`}
                                              title={y.tarayici ? (isTr ? 'Çalışıyor' : 'Works') : (isTr ? 'Bu kipte yok' : 'Not in this mode')}>
                                            {y.tarayici ? '✅' : '—'}
                                        </span>
                                    </td>
                                    <td className={`border-b px-2 py-1.5 text-center ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                                        <span data-testid={`mod-yetenek-docker-${y.id}`}>{y.docker ? '✅' : '—'}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {kurulumLinki && (
                <Link to="/qa-shop-setup" data-testid="mod-kuruluma-git"
                      className="mt-4 inline-block text-sm font-semibold text-indigo-400 hover:underline">
                    {isTr ? 'Gerçek veritabanı istiyorum → kurulum rehberi' : 'I want a real database → setup guide'} →
                </Link>
            )}
        </div>
    )
}
