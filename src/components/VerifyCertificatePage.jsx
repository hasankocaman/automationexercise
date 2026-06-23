// src/components/VerifyCertificatePage.jsx
// Public certificate verification page — anyone with the link can confirm a
// certificate is real without needing an account (reads via get_certificate RPC,
// SECURITY DEFINER, so no broad public RLS policy on certificates is needed).
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { ALL_MAPS } from '../data/qaMentorData'
import TopicHeader from './TopicHeader'

function useDarkModeState() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        document.documentElement.classList.toggle('dark-mode', isDark)
        document.documentElement.classList.toggle('light-mode-forced', !isDark)
        return isDark
    })
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.classList.toggle('dark-mode', darkMode)
        document.documentElement.classList.toggle('light-mode-forced', !darkMode)
    }, [darkMode])
    return [darkMode, setDarkMode]
}

function VerifyCertificatePage() {
    const { id } = useParams()
    const { language } = useLanguage()
    const lang = language
    const [darkMode, setDarkMode] = useDarkModeState()
    const [status, setStatus] = useState('loading')
    const [certificate, setCertificate] = useState(null)

    useEffect(() => {
        if (!isSupabaseConfigured || !id) { setStatus('not-found'); return }
        let cancelled = false
        supabase.rpc('get_certificate', { p_id: id }).then(({ data, error }) => {
            if (cancelled) return
            if (error || !data || !data.length) {
                setStatus('not-found')
                return
            }
            setCertificate(data[0])
            setStatus('ready')
        })
        return () => { cancelled = true }
    }, [id])

    const pathTitle = certificate ? ALL_MAPS[certificate.career_goal]?.title : null
    const issuedDate = certificate
        ? new Date(certificate.created_at).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
        })
        : null

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-50'}`}>
            <div className="print:hidden">
                <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>

            <main className="container mx-auto max-w-xl px-3 py-8 md:px-6">
                {status === 'loading' && (
                    <p className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lang === 'tr' ? 'Doğrulanıyor...' : 'Verifying...'}
                    </p>
                )}

                {status === 'not-found' && (
                    <div className={`rounded-2xl border p-8 text-center shadow-xl ${darkMode ? 'bg-gray-800 border-red-700/50' : 'bg-white border-red-200'}`}>
                        <div className="text-3xl mb-2">❌</div>
                        <h1 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {lang === 'tr' ? 'Sertifika bulunamadı' : 'Certificate not found'}
                        </h1>
                        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {lang === 'tr'
                                ? 'Bu bağlantı geçersiz veya sertifika kaldırılmış olabilir.'
                                : 'This link is invalid, or the certificate may have been removed.'}
                        </p>
                    </div>
                )}

                {status === 'ready' && certificate && (
                    <>
                        <div
                            className={`rounded-2xl border-4 p-8 text-center shadow-2xl ${darkMode ? 'bg-gray-800 border-indigo-500' : 'bg-white border-indigo-400'}`}
                            style={{ backgroundImage: darkMode ? 'none' : 'radial-gradient(circle at top, rgba(99,102,241,0.06), transparent 60%)' }}
                        >
                            <div className="text-4xl mb-2">📜</div>
                            <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
                                LearnQA.dev
                            </div>
                            <h1 className={`text-xl md:text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {lang === 'tr' ? 'Başarı Sertifikası' : 'Certificate of Completion'}
                            </h1>

                            <p className={`mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {lang === 'tr' ? 'Bu sertifika şu kişiye verilmiştir:' : 'This certifies that'}
                            </p>
                            <p className={`mt-1 text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {certificate.display_name || (lang === 'tr' ? 'İsimsiz üye' : 'Unnamed member')}
                            </p>

                            <p className={`mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {lang === 'tr' ? 'aşağıdaki yol haritasını başarıyla tamamlamıştır:' : 'has successfully completed the learning roadmap:'}
                            </p>
                            <p className={`mt-1 text-lg font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
                                {pathTitle ? (lang === 'tr' ? pathTitle.tr : pathTitle.en) : certificate.career_goal}
                            </p>

                            <div className={`mt-6 flex items-center justify-center gap-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <span>{lang === 'tr' ? 'Veriliş tarihi:' : 'Issued on:'} {issuedDate}</span>
                            </div>
                            <div className={`mt-1 text-[10px] font-mono break-all ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                ID: {certificate.id}
                            </div>

                            <div className={`mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${darkMode ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700' : 'bg-emerald-50 text-emerald-700 border border-emerald-300'}`}>
                                ✅ {lang === 'tr' ? 'Doğrulandı' : 'Verified'}
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-105 shadow-lg"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                            >
                                🖨️ {lang === 'tr' ? 'Yazdır / PDF' : 'Print / PDF'}
                            </button>
                            <Link
                                to="/qa-mentor"
                                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:scale-105 border ${darkMode ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                            >
                                🗺️ {lang === 'tr' ? 'Kendi Yol Haritamı Çıkar' : 'Get My Own Roadmap'}
                            </Link>
                        </div>
                    </>
                )}
            </main>

            <style>{`
                @media print {
                    header, button, a[href="/qa-mentor"] { display: none !important; }
                }
            `}</style>
        </div>
    )
}

export default VerifyCertificatePage
