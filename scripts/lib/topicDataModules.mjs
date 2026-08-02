// Ders sayfası → veri modülü eşlemesi. TEK KAYNAK: hem statik shell üretimi
// (generate-static-routes.mjs) hem sekme-URL katmanı (sectionSeo.mjs) buradan
// okur. Daha önce bu tablo generate-static-routes.mjs içinde gömülüydü; sekme
// URL'leri eklenince ikinci bir kopya çıkacaktı — iki listenin sessizce
// ayrışması (yeni sayfa birine eklenip diğerine eklenmemesi) bu projede
// tekrarlayan bir hata sınıfı olduğu için tablo tek yere alındı.
//
// `file` yolları BU dosyaya görelidir; import'u loadDataModule() yapar
// (çağıran script'in konumu ne olursa olsun doğru çözülsün diye).

export const DATA_MODULES = {
    '/selenium': { file: '../../src/data/seleniumData.js', exportName: 'seleniumData' },
    '/playwright': { file: '../../src/data/playwrightData.js', exportName: 'playwrightData' },
    '/cypress': { file: '../../src/data/cypressData.js', exportName: 'cypressData' },
    '/python': { file: '../../src/data/pythonData.js', exportName: 'pythonData' },
    '/typescript': { file: '../../src/data/typescriptData.js', exportName: 'typescriptData' },
    '/javascript': { file: '../../src/data/javascriptData.js', exportName: 'javascriptData' },
    '/sql': { file: '../../src/data/sqlData.js', exportName: 'sqlData' },
    '/java': { file: '../../src/data/javaData.js', exportName: 'javaData' },
    '/jmeter': { file: '../../src/data/jmeterData.js', exportName: 'jmeterData' },
    '/postman': { file: '../../src/data/postmanData.js', exportName: 'postmanData' },
    '/api-testing': { file: '../../src/data/apiTestingData.js', exportName: 'apiTestingData' },
    '/qa-frontend': { file: '../../src/data/qaFrontendData.js', exportName: 'qaFrontendData' },
    '/bruno': { file: '../../src/data/brunoData.js', exportName: 'brunoData' },
    '/rest-assured': { file: '../../src/data/restAssuredData.js', exportName: 'restAssuredData' },
    '/gauge': { file: '../../src/data/gaugeData.js', exportName: 'gaugeData' },
    '/docker': { file: '../../src/data/dockerData.js', exportName: 'dockerData' },
    '/jenkins': { file: '../../src/data/jenkinsData.js', exportName: 'jenkinsData' },
    '/kubernetes': { file: '../../src/data/kubernetesData.js', exportName: 'kubernetesData' },
    '/kafka': { file: '../../src/data/kafkaData.js', exportName: 'kafkaData' },
    '/appium': { file: '../../src/data/appiumData.js', exportName: 'appiumData' },
    '/browserstack': { file: '../../src/data/browserstackData.js', exportName: 'browserstackData' },
    '/git-github': { file: '../../src/data/gitGithubData.js', exportName: 'gitGithubData' },
    '/linux': { file: '../../src/data/linuxData.js', exportName: 'linuxData' },
    '/aws': { file: '../../src/data/awsData.js', exportName: 'awsData' },
    '/azure': { file: '../../src/data/azureData.js', exportName: 'azureData' },
    '/what-is-testing': { file: '../../src/data/whatIsTestingData.js', exportName: 'whatIsTestingData' },
    '/security': { file: '../../src/data/securityData.js', exportName: 'securityData' },
    '/manual-testing': { file: '../../src/data/manualTestingData.js', exportName: 'manualTestingData' },
    '/algorithms': { file: '../../src/data/beginnerAlgorithmsData.js', exportName: 'beginnerAlgorithmsData' },
    '/advanced-algorithms': { file: '../../src/data/algorithmsData.js', exportName: 'algorithmsData' },
    '/qa-mentor': { file: '../../src/data/qaMentorData.js', exportName: null },
    '/backend': { file: '../../src/data/backendData.js', exportName: 'backendData' },
    '/basit-backend': { file: '../../src/data/basitBackendData.js', exportName: 'basitBackendData' },
    '/claude-ai': { file: '../../src/data/claudeAiData.js', exportName: 'claudeAiData' },
    '/llm-agents': { file: '../../src/data/llmAgentsData.js', exportName: 'llmAgentsData' },
}

const moduleCache = new Map()

/** Route path'inin veri modülünü (varsa) import eder. Aynı build içinde tekrar import etmez. */
export async function loadDataModule(routePath) {
    const config = DATA_MODULES[routePath]
    if (!config) return null
    if (moduleCache.has(routePath)) return moduleCache.get(routePath)

    try {
        const module = await import(new URL(config.file, import.meta.url).href)
        const result = { data: config.exportName ? module[config.exportName] : undefined, config }
        moduleCache.set(routePath, result)
        return result
    } catch (error) {
        console.warn(`Could not load data module for ${routePath}: ${error.message}`)
        moduleCache.set(routePath, null)
        return null
    }
}

/** `data.tr` / `data.en` ağacından locale'e uygun içeriği seçer (yoksa öbür dile düşer). */
export function contentForLocale(data, locale) {
    if (!data) return null
    const other = locale === 'tr' ? 'en' : 'tr'
    return data[locale] || data[other] || data
}
