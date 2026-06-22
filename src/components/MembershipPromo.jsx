import { useNavigate } from 'react-router-dom'
import { Bookmark, Award, MessageCircle, MessageSquare, ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const SLACK_INVITE_URL = 'https://join.slack.com/t/turkiyetester/shared_invite/zt-41mixupcm-kTkgWHb6~KRUNfstml3fiA'

const BENEFITS = [
    {
        Icon: Bookmark,
        tr: { title: 'Kaldığın yeri kaydet', body: 'Hangi derste, hangi sekmede olduğun otomatik kaydedilir; geri geldiğinde tam oradan devam edersin.' },
        en: { title: 'Save your progress', body: 'We remember exactly which lesson and tab you were on, so you can pick up right where you left off.' },
    },
    {
        Icon: Award,
        tr: { title: 'Rozet kazan', body: 'Dersleri tamamladıkça rozetler kazanırsın; ilerlemen profilinde görünür kalır.' },
        en: { title: 'Earn badges', body: 'Finish lessons to unlock badges that show off your progress on your profile.' },
    },
    {
        Icon: MessageCircle,
        tr: { title: 'Diğer üyelerle sohbet et', body: 'Canlı sohbet odasında diğer öğrenenlerle anlık yazışabilirsin.' },
        en: { title: 'Chat with other members', body: 'Talk live with other learners in the member chat room.' },
        link: { url: SLACK_INVITE_URL, tr: 'Daha uzun/birebir sohbet için Slack', en: 'For longer 1-on-1 chats, join Slack' },
    },
    {
        Icon: MessageSquare,
        tr: { title: 'Yorum yaz', body: 'Dersler ve uygulama hakkındaki görüşünü yorum olarak paylaşabilirsin.' },
        en: { title: 'Leave comments', body: 'Share your thoughts on lessons and the app by leaving a comment.' },
    },
]

export default function MembershipPromo({ darkMode }) {
    const { language } = useLanguage()
    const navigate = useNavigate()
    const isTr = language === 'tr'

    return (
        <div className="container mx-auto px-3 pt-4 md:px-6 md:pt-6">
            <div
                className={`overflow-hidden rounded-2xl border-2 p-5 md:p-8 ${
                    darkMode
                        ? 'border-indigo-700/50 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950'
                        : 'border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50'
                }`}
            >
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h2 className={`text-lg font-black md:text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {isTr ? '🎓 Ücretsiz üye ol, öğrenmeni kişiselleştir' : '🎓 Join for free and personalize your learning'}
                        </h2>
                        <p className={`mt-1 text-xs md:text-sm ${darkMode ? 'text-indigo-200/80' : 'text-indigo-700'}`}>
                            {isTr
                                ? 'Üyelik tamamen ücretsizdir — kredi kartı gerekmez.'
                                : 'Membership is completely free — no credit card required.'}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/login')}
                        data-testid="membership-promo-cta"
                        className="flex-shrink-0 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-transform hover:scale-105 hover:bg-indigo-500"
                    >
                        {isTr ? 'Üye Ol / Giriş Yap →' : 'Join / Sign In →'}
                    </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {BENEFITS.map(({ Icon, tr, en, link }, i) => {
                        const text = isTr ? tr : en
                        return (
                            <div
                                key={i}
                                className={`rounded-xl p-3.5 ${darkMode ? 'bg-white/5' : 'bg-white/70'}`}
                            >
                                <div className={`mb-2 inline-flex rounded-lg p-2 ${darkMode ? 'bg-indigo-600/30 text-indigo-300' : 'bg-indigo-100 text-indigo-600'}`}>
                                    <Icon size={18} />
                                </div>
                                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{text.title}</h3>
                                <p className={`mt-1 text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{text.body}</p>
                                {link && (
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${darkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-700'}`}
                                    >
                                        <ExternalLink size={11} />
                                        {isTr ? link.tr : link.en}
                                    </a>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
