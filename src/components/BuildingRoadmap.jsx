import React from 'react'
import { Link } from 'react-router-dom'
import { getCompletedRoutes } from '../lib/progressStore'

/**
 * BuildingRoadmap Component (Katmanlı Bina / Tuğla Yol Haritası)
 * QA Mühendisi Kariyer Haritasını yükselen bir Bina İnşaatı şeklinde görselleştirir.
 */
export default function BuildingRoadmap({ language = 'tr', className = '' }) {
  const isTr = language === 'tr'
  const completedRoutes = getCompletedRoutes()

  // Bina Katları & Ders Tuğlaları Tanımı
  const floors = [
    {
      level: 3,
      name: isTr ? '3. Kat: DevOps, Mobil & Çatı Mimari' : 'Floor 3: DevOps, Mobile & Architecture',
      description: isTr ? 'CI/CD, Konteynerizasyon & Bulut Koşumu' : 'CI/CD, Containerization & Cloud Execution',
      icon: '🏗️',
      bricks: [
        { route: '/docker', title: 'Docker', icon: '🐳' },
        { route: '/jenkins', title: 'Jenkins', icon: '⚙️' },
        { route: '/kubernetes', title: 'Kubernetes', icon: '☸️' },
        { route: '/appium', title: 'Appium', icon: '📱' },
        { route: '/aws', title: 'AWS QA', icon: '☁️' },
        { route: '/azure', title: 'Azure DevOps', icon: '🌩️' },
        { route: '/kafka', title: 'Kafka', icon: '📨' },
        { route: '/jmeter', title: 'JMeter', icon: '📊' }
      ]
    },
    {
      level: 2,
      name: isTr ? '2. Kat: API & Veritabanı Katı' : 'Floor 2: API & Database Floor',
      description: isTr ? 'Servis Testleri & SQL Veri Doğrulama' : 'Service Testing & SQL Validation',
      icon: '⚡',
      bricks: [
        { route: '/postman', title: 'Postman', icon: '🚀' },
        { route: '/bruno', title: 'Bruno Client', icon: '🐕' },
        { route: '/rest-assured', title: 'REST Assured', icon: '☕' },
        { route: '/sql', title: 'SQL Practice', icon: '🗄️' }
      ]
    },
    {
      level: 1,
      name: isTr ? '1. Kat: Web Otomasyon & Diller' : 'Floor 1: Web Automation & Languages',
      description: isTr ? 'E2E Test Araçları & Programlama' : 'E2E Testing Tools & Programming',
      icon: '🧱',
      bricks: [
        { route: '/selenium', title: 'Selenium', icon: '🌐' },
        { route: '/playwright', title: 'Playwright', icon: '🎭' },
        { route: '/cypress', title: 'Cypress', icon: '🌲' },
        { route: '/python', title: 'Python', icon: '🐍' },
        { route: '/typescript', title: 'TypeScript', icon: '📘' },
        { route: '/javascript', title: 'JavaScript', icon: '🟨' }
      ]
    },
    {
      level: 0,
      name: isTr ? 'Zemin Kat: Temel QA & Araçlar' : 'Ground Floor: Core QA & Fundamentals',
      description: isTr ? 'Sağlam Temel: Java, Git, Mantık & Metodoloji' : 'Solid Foundation: Java, Git, Logic & Methodology',
      icon: '🏛️',
      bricks: [
        { route: '/java', title: 'Java Core', icon: '☕' },
        { route: '/git-github', title: 'Git & GitHub', icon: '🐙' },
        { route: '/linux', title: 'Linux Bash', icon: '🐧' },
        { route: '/manual-testing', title: 'Manuel Test', icon: '📋' },
        { route: '/algorithms', title: 'Algoritmalar', icon: '🧩' }
      ]
    }
  ]

  // Hesaplamalar
  const allBricks = floors.flatMap((f) => f.bricks)
  const totalBricksCount = allBricks.length
  const completedBricksCount = allBricks.filter((b) => completedRoutes.includes(b.route)).length
  const overallPercentage = Math.round((completedBricksCount / totalBricksCount) * 100)

  // Şantiye durumu özeti
  const getStatusBadge = () => {
    if (overallPercentage >= 90) return isTr ? '🎉 Çatı Çatıldı — Kıdemli Yapı Ustası!' : '🎉 Roof Completed — Senior Builder!'
    if (overallPercentage >= 60) return isTr ? '🚧 3. Kat Yükseliyor — Harika İlerleme' : '🚧 Floor 3 Rising — Great Progress'
    if (overallPercentage >= 30) return isTr ? '🧱 1. ve 2. Kat Örülüyor' : '🧱 Building Floors 1 & 2'
    return isTr ? '🏛️ Temeller Atılıyor — İlk Tuğlaları Diz' : '🏛️ Laying Foundations — Place First Bricks'
  }

  return (
    <div className={`p-4 md:p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-xl brick-pattern-bg ${className}`}>
      {/* Üst İnşaat Başlığı & Genel Durum */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-400 uppercase">
            <span>🏗️</span>
            <span>{isTr ? 'QA Mühendisi Bina İnşaatı' : 'QA Engineer Building Roadmap'}</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-1">
            {isTr ? 'Bina İlerlemesi & Tuğla Katları' : 'Building Progress & Brick Floors'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isTr
              ? 'Her ders tamamlandığında binana sağlam bir tuğla eklenir.'
              : 'Each completed lesson adds a solid brick to your structure.'}
          </p>
        </div>

        {/* Bina Tamamlanma Rozeti */}
        <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
          <div className="text-3xl">🏛️</div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{getStatusBadge()}</div>
            <div className="text-lg font-bold font-mono text-teal-400">
              %{overallPercentage} <span className="text-xs text-slate-300">({completedBricksCount}/{totalBricksCount} Tuğla)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bina Katları (Yukarıdan Aşağıya - Çatıdan Zemine) */}
      <div className="mt-6 flex flex-col gap-5">
        {floors.map((floor) => {
          const floorCompletedCount = floor.bricks.filter((b) => completedRoutes.includes(b.route)).length
          const floorTotal = floor.bricks.length
          const isFloorDone = floorCompletedCount === floorTotal

          return (
            <div
              key={floor.level}
              className={`p-4 rounded-xl border transition-all ${
                isFloorDone
                  ? 'bg-teal-950/20 border-teal-500/30'
                  : 'bg-slate-950/40 border-slate-800'
              }`}
            >
              {/* Kat Başlığı */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{floor.icon}</span>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-slate-200">{floor.name}</h4>
                    <p className="text-xs text-slate-400">{floor.description}</p>
                  </div>
                </div>
                <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-teal-300 border border-slate-700">
                  {floorCompletedCount}/{floorTotal} Tuğla
                </div>
              </div>

              {/* Tuğla Dizilimi (Grid) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {floor.bricks.map((brick) => {
                  const isDone = completedRoutes.includes(brick.route)
                  return (
                    <Link
                      key={brick.route}
                      to={brick.route}
                      className={`group relative p-3 rounded-lg border text-left transition-all duration-200 flex items-center justify-between ${
                        isDone
                          ? 'bg-gradient-to-r from-teal-900/60 to-cyan-900/40 border-teal-500/50 hover:border-teal-400 text-teal-100 shadow-md brick-bevel'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base group-hover:scale-110 transition-transform">{brick.icon}</span>
                        <span className="text-xs font-semibold truncate max-w-[90px]">{brick.title}</span>
                      </div>

                      {/* Tuğla Durumu İkonu */}
                      <span className="text-xs">
                        {isDone ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-500 text-slate-950 font-bold text-[10px]" title="Tuğla Yerleşti">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-slate-700 text-slate-600 text-[10px]">
                            🧱
                          </span>
                        )}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
