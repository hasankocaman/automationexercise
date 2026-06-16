import TopicPage from './TopicPage'
import { javaData } from '../data/javaData'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'

const JavaDocBanner = () => {
    const { language } = useLanguage()
    const navigate = useNavigate()
    const isTr = language === 'tr'
    return (
        <button
            onClick={() => navigate('/java-document')}
            className="group w-full text-left block mb-6 rounded-2xl overflow-hidden border-2 border-orange-500/30 hover:border-orange-400/70 transition-all duration-300 shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 bg-transparent cursor-pointer"
        >
            <div className="bg-gradient-to-r from-orange-950 via-amber-950 to-slate-900 p-5 flex items-center gap-5">
                <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">📖</div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">
                        {isTr ? 'Profesyonel Başvuru Kütüphanesi' : 'Professional Reference Library'}
                    </div>
                    <div className="text-lg font-bold text-white leading-tight">
                        {isTr ? 'Java® Notes for Professionals Kitabı' : 'Java® Notes for Professionals Book'}
                    </div>
                    <div className="text-sm text-orange-200/80 mt-1 leading-relaxed">
                        {isTr
                            ? '900+ sayfalık profesyonel Java ipuçları, detaylı kod örnekleri ve konu anlatımları (Arama ve Çeviri Desteği)'
                            : '900+ pages of professional Java tips, detailed code examples, and explanations (Search & Translation support)'}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2.5">
                        {(isTr 
                            ? ['☕ Java SE', '📚 100+ Bölüm', '🔍 Arama Desteği', '🌐 EN / TR İndeks'] 
                            : ['☕ Java SE', '📚 100+ Chapters', '🔍 Search Support', '🌐 EN / TR Index']
                        ).map(tag => (
                            <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="text-3xl text-orange-400 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0">→</div>
            </div>
        </button>
    )
}

function JavaPage() {
    return (
        <TopicPage
            data={javaData}
            gradient="from-orange-600 to-amber-600"
            bgLight="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
            extraBanner={<JavaDocBanner />}
        />
    )
}

export default JavaPage
