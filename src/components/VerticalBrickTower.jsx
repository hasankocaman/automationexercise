import React from 'react'
import { Link } from 'react-router-dom'
import { getCompletedRoutes } from '../lib/progressStore'

/**
 * VerticalBrickTower Component (Anasayfa Dikey 3D Tuğla Kulesi)
 * Kullanıcının genel ilerlemesini tek bir dikey 3D tuğla sütunu/kulesi şeklinde gösterir.
 */
export default function VerticalBrickTower({ language = 'tr', className = '' }) {
  const isTr = language === 'tr'
  const completedRoutes = getCompletedRoutes()

  // Tüm müfredat ders tuğlaları — doğal (Temel → ileri seviye) sırayla render edilir,
  // temel konular İLK görülür (bkz. aşağıdaki bug fix yorumu).
  const topicBricks = [
    { route: '/java', title: 'Java Core', icon: '☕', level: 'Temel' },
    { route: '/git-github', title: 'Git & GitHub', icon: '🐙', level: 'Temel' },
    { route: '/linux', title: 'Linux Bash', icon: '🐧', level: 'Temel' },
    { route: '/manual-testing', title: 'Manuel Test', icon: '📋', level: 'Temel' },
    { route: '/algorithms', title: 'Algoritmalar', icon: '🧩', level: 'Temel' },
    { route: '/selenium', title: 'Selenium', icon: '🌐', level: 'Web' },
    { route: '/playwright', title: 'Playwright', icon: '🎭', level: 'Web' },
    { route: '/cypress', title: 'Cypress', icon: '🌲', level: 'Web' },
    { route: '/python', title: 'Python QA', icon: '🐍', level: 'Web' },
    { route: '/typescript', title: 'TypeScript', icon: '📘', level: 'Web' },
    { route: '/javascript', title: 'JavaScript', icon: '🟨', level: 'Web' },
    { route: '/postman', title: 'Postman', icon: '🚀', level: 'API' },
    { route: '/bruno', title: 'Bruno Client', icon: '🐕', level: 'API' },
    { route: '/rest-assured', title: 'REST Assured', icon: '☕', level: 'API' },
    { route: '/sql', title: 'SQL Practice', icon: '🗄️', level: 'API' },
    { route: '/docker', title: 'Docker', icon: '🐳', level: 'DevOps' },
    { route: '/jenkins', title: 'Jenkins', icon: '⚙️', level: 'DevOps' },
    { route: '/kubernetes', title: 'Kubernetes', icon: '☸️', level: 'DevOps' },
    { route: '/appium', title: 'Appium Mobile', icon: '📱', level: 'Mobil' },
    { route: '/aws', title: 'AWS QA', icon: '☁️', level: 'Cloud' },
    { route: '/azure', title: 'Azure DevOps', icon: '🌩️', level: 'Cloud' },
    { route: '/kafka', title: 'Kafka', icon: '📨', level: 'Streaming' },
    { route: '/jmeter', title: 'JMeter', icon: '📊', level: 'Performans' },
  ]

  const total = topicBricks.length
  const completedCount = topicBricks.filter((b) => completedRoutes.includes(b.route)).length
  const heightPercentage = Math.round((completedCount / total) * 100)

  return (
    <div className={`p-4 md:p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-teal-500/30 text-slate-100 shadow-2xl brick-pattern-bg ${className}`}>
      {/* Kule Başlığı ve Metrikler */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-teal-400 uppercase font-bold">
            <span>🏗️</span>
            <span>{isTr ? 'DİKEY 3D TUĞLA KULESI' : 'VERTICAL 3D BRICK TOWER'}</span>
          </div>
          <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
            {isTr ? 'QA Mühendisliği Yapı İlerlemesi' : 'QA Engineering Structure Progress'}
          </h3>
        </div>

        {/* Kule Yükseklik Yüzdesi */}
        <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-2 rounded-xl border border-teal-500/40">
          <span className="text-2xl">🧱</span>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
              {isTr ? 'Kule Yüksekliği' : 'Tower Height'}
            </div>
            <div className="text-base font-extrabold font-mono text-teal-300">
              %{heightPercentage} <span className="text-xs text-slate-400 font-normal">({completedCount}/{total} Tuğla)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dikey 3D Tuğla Sütunu (Vertical Stack) — bug fix (kullanıcı bildirimi
          2026-07-22): liste ÖNCEDEN ters çevriliyordu ("en gelişmiş ders üstte,
          temel altta" — gerçek bir binanın fiziksel mantığı) ama bu, harita
          oluşur oluşmaz kullanıcının İLK gördüğü şeyin Kafka/JMeter/Azure gibi
          gözünü korkutan ileri seviye konular olmasına yol açıyordu. Artık liste
          DOĞAL sırada (Temel → Web → API → DevOps → Mobil → Cloud → Streaming →
          Performans) — kullanıcı ilk açılışta Java/Git/Linux gibi tanıdık,
          rahatlatıcı konuları görür; ileri seviye konulara ancak aşağı
          kaydırınca ulaşır. "Zemin Temeli" banner'ı bu yüzden yukarı, "Kule
          Yükseliyor" banner'ı aşağı taşındı (okuma yönüyle tutarlı: temelden
          başla, yukarı doğru inşa et). */}
      <div className="relative max-w-xl mx-auto flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner">
        {/* Zemin / Temel Etiketi — artık İLK görülen şey */}
        <div className="text-center py-2 text-xs font-bold font-mono text-slate-400 bg-slate-900 rounded-lg border border-slate-800">
          🏛️ {isTr ? 'ZEMİN TEMELİ (JAVA & BASH & GIT) — BURADAN BAŞLA' : 'GROUND FOUNDATION — START HERE'}
        </div>

        {/* 3D Tuğlalar (doğal sırayla, temelden yukarı doğru) */}
        {topicBricks.map((brick, index) => {
          const isDone = completedRoutes.includes(brick.route)
          const brickNumber = index + 1

          return (
            <Link
              key={brick.route}
              to={brick.route}
              title={`${brick.title} (${isDone ? (isTr ? 'Tuğla Örüldü ✓' : 'Brick Laid ✓') : (isTr ? 'Tuğla Bekliyor' : 'Pending Brick')})`}
              className={`group relative flex items-center justify-between px-3.5 py-2 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 ${
                isDone
                  ? 'bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 text-slate-950 border-teal-300/60 shadow-md brick-bevel hover:scale-[1.01] hover:brightness-110'
                  : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {/* Sol: Tuğla Numarası ve İkon */}
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-[10px] ${
                    isDone ? 'bg-slate-950/40 text-teal-200' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  #{brickNumber}
                </span>
                <span className="text-base group-hover:scale-110 transition-transform">{brick.icon}</span>
                <span className={`font-bold ${isDone ? 'text-slate-950' : 'text-slate-200'}`}>{brick.title}</span>
              </div>

              {/* Sağ: Durum Badge ve Seviye */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    isDone
                      ? 'bg-slate-950/30 text-slate-950 font-bold border border-slate-950/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {brick.level}
                </span>
                {isDone ? (
                  <span className="w-5 h-5 rounded-full bg-slate-950 text-teal-400 font-bold text-xs flex items-center justify-center shadow">
                    ✓
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-slate-700 text-slate-600 text-[10px] flex items-center justify-center">
                    🧱
                  </span>
                )}
              </div>
            </Link>
          )
        })}

        {/* Çatı / İnşaat Tepesi — artık SON görülen şey (aşağı kaydırınca ulaşılır) */}
        <div className="text-center py-1.5 text-xs font-extrabold font-mono text-amber-400 bg-amber-500/10 rounded-lg border border-amber-500/30 flex items-center justify-center gap-2">
          <span>🚩</span>
          <span>{heightPercentage === 100 ? (isTr ? 'ÇATILAR ÖRÜLDÜ - TAMAMLANDI!' : 'ROOF COMPLETED!') : (isTr ? 'KULE YÜKSELİYOR' : 'TOWER RISING')}</span>
          <span>🚩</span>
        </div>
      </div>
    </div>
  )
}
