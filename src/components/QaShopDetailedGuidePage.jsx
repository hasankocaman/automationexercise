import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { qaShopDetailedGuideData } from '../data/qaShopDetailedGuideData'

export default function QaShopDetailedGuidePage() {
  const { language } = useLanguage()
  const [expandedId, setExpandedId] = useState('intro')

  const t = (obj) => {
    if (typeof obj === 'string') return obj
    return language === 'tr' ? obj.tr || obj.en : obj.en || obj.tr
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-indigo-500/30 pb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-400/50 rounded-full text-sm text-indigo-300">
              {language === 'tr' ? '🔐 Admin Only' : '🔐 Admin Only'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t(qaShopDetailedGuideData.title)}
          </h1>
          <p className="text-lg text-slate-300">
            {t(qaShopDetailedGuideData.description)}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {qaShopDetailedGuideData.sections.map((section) => (
            <div key={section.id} className="border border-slate-700 rounded-lg overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => setExpandedId(expandedId === section.id ? null : section.id)}
                className="w-full px-6 py-4 bg-slate-800/50 hover:bg-slate-800 transition-colors text-left flex items-center justify-between group"
              >
                <div>
                  <h2 className="text-xl font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors">
                    {t(section.titleTr ? { tr: section.titleTr, en: section.titleEn } : section.title)}
                  </h2>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform ${expandedId === section.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Section Content */}
              {expandedId === section.id && (
                <div className="px-6 py-6 bg-slate-900/30 border-t border-slate-700 space-y-6">
                  {section.blocks.map((block, idx) => (
                    <div key={idx} className={block.type === 'text' ? 'text-slate-300 space-y-4' : ''}>
                      {block.type === 'text' && (
                        <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                          {t(block.tr ? { tr: block.tr, en: block.en } : block.text)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            {language === 'tr'
              ? '💡 Tester bağımsızlığı — API sözleşmesi, user story\'ler ve bu rehber yeterlidir.'
              : '💡 Tester independence — API contract, user stories, and this guide are sufficient.'}
          </p>
        </div>
      </div>
    </div>
  )
}
