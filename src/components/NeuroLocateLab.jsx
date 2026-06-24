import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Brain,
  Terminal,
  Shuffle,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  Info,
  ArrowRight,
  Code
} from 'lucide-react';

// Required keywords for Feynman explanations in each module
const FEYNMAN_KEYWORDS = {
  shadowDom: {
    tr: ['host', 'root', 'pierce', 'js', 'javascript', 'shadow', 'gölge', 'erişim', 'otomasyon'],
    en: ['host', 'root', 'pierce', 'js', 'javascript', 'shadow', 'access', 'dom', 'automation'],
    minCount: 2,
    hint: {
      tr: "İpucu: Açıklamanızda 'shadow host', 'shadow root', 'pierce/aşmak' veya 'javascript/JS' kavramlarından en az ikisini kullanın.",
      en: "Hint: Use at least two concepts like 'shadow host', 'shadow root', 'pierce', 'access', or 'javascript/JS' in your explanation."
    }
  },
  iframes: {
    tr: ['switch', 'bağlam', 'context', 'geçiş', 'default', 'parent', 'çerçeve', 'içinde'],
    en: ['switch', 'context', 'frame', 'parent', 'default', 'inside', 'document', 'focus'],
    minCount: 2,
    hint: {
      tr: "İpucu: Açıklamanızda 'switch/geçiş', 'bağlam/context', 'parent/default' veya 'çerçeve/frame' kavramlarından en az ikisini kullanın.",
      en: "Hint: Use at least two concepts like 'switch', 'context', 'frame', 'parent', or 'defaultContent' in your explanation."
    }
  },
  dynamicElements: {
    tr: ['contains', 'starts-with', 'xpath', 'css', 'bekleme', 'wait', 'dinamik', 'sabit', 'düzenli'],
    en: ['contains', 'starts-with', 'xpath', 'css', 'wait', 'dynamic', 'selector', 'partial', 'attribute'],
    minCount: 2,
    hint: {
      tr: "İpucu: Açıklamanızda 'contains/starts-with', 'wait/bekleme', 'dynamic/dinamik' veya 'xpath/css' kavramlarından en az ikisini kullanın.",
      en: "Hint: Use at least two concepts like 'contains', 'starts-with', 'wait', 'dynamic', or 'xpath/css' in your explanation."
    }
  },
  pseudoElements: {
    tr: ['before', 'after', 'getcomputedstyle', 'js', 'javascript', 'css', 'içerik', 'content', 'erişilemez'],
    en: ['before', 'after', 'getcomputedstyle', 'js', 'javascript', 'css', 'content', 'pseudo', 'style'],
    minCount: 2,
    hint: {
      tr: "İpucu: Açıklamanızda '::before/::after', 'getComputedStyle', 'js/javascript' veya 'content/içerik' kavramlarından en az ikisini kullanın.",
      en: "Hint: Use at least two concepts like '::before/::after', 'getComputedStyle', 'js/javascript', or 'content' in your explanation."
    }
  },
  staleElement: {
    tr: ['re-render', 'yenileme', 'değişme', 'detached', 're-fetch', 'referans', 'stale', 'eski', 'bellek'],
    en: ['re-render', 'refresh', 'detach', 're-fetch', 'reference', 'stale', 'cache', 'invalid', 'update'],
    minCount: 2,
    hint: {
      tr: "İpucu: Açıklamanızda 're-render/yenileme', 're-fetch/tekrar çekme', 'referans/eski' veya 'stale/bayat' kavramlarından en az ikisini kullanın.",
      en: "Hint: Use at least two concepts like 're-render', 're-fetch', 'reference', 'stale', or 'detach' in your explanation."
    }
  },
  svgs: {
    tr: ['local-name', 'namespace', 'xpath', 'css', 'xml', 'etiket', 'tag', 'özel', 'svg'],
    en: ['local-name', 'namespace', 'xpath', 'css', 'xml', 'tag', 'svg', 'attribute', 'prefix'],
    minCount: 2,
    hint: {
      tr: "İpucu: Açıklamanızda 'local-name', 'namespace/alan', 'xpath/css' veya 'svg' kavramlarından en az ikisini kullanın.",
      en: "Hint: Use at least two concepts like 'local-name', 'namespace', 'xpath/css', or 'svg' in your explanation."
    }
  },
  xpathCss: {
    tr: ['parent', 'sibling', 'text', 'metin', 'kardeş', 'üst', 'has', 'yol', 'esneklik'],
    en: ['parent', 'sibling', 'text', 'match', 'has', 'xpath', 'css', 'axes', 'navigation'],
    minCount: 2,
    hint: {
      tr: "İpucu: Açıklamanızda 'parent/üst', 'sibling/kardeş', 'text/metin' veya 'xpath/css' kavramlarından en az ikisini kullanın.",
      en: "Hint: Use at least two concepts like 'parent', 'sibling', 'text', or 'xpath/css' in your explanation."
    }
  }
};

const NeuroLocateLab = ({ darkMode }) => {
  const { t, language } = useLanguage();
  const isTr = language === 'tr';

  // --- States ---
  const [activeTool, setActiveTool] = useState('playwright'); // playwright, selenium, cypress
  const [isInterleaved, setIsInterleaved] = useState(false); // interleaved mode
  const [activeTopic, setActiveTopic] = useState('shadowDom'); // shadowDom, iframes, dynamicElements, pseudoElements, staleElement, svgs, xpathCss
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedTopics, setCompletedTopics] = useState([]);
  
  // Challenge inputs & verification states
  const [inputs, setInputs] = useState({
    shadowDom: { host: '', inner: '' },
    iframes: { parent: '', child: '', target: '' },
    dynamicElements: { triggerClicked: false, selector: '' },
    pseudoElements: { hostSelector: '', pseudoType: '::after', jsProperty: '' },
    staleElement: { elementFound: false, selector: '' },
    svgs: { selector: '' },
    xpathCss: { selector: '' }
  });

  const [feynmanExplanations, setFeynmanExplanations] = useState({
    shadowDom: '',
    iframes: '',
    dynamicElements: '',
    pseudoElements: '',
    staleElement: '',
    svgs: '',
    xpathCss: ''
  });

  const [testResult, setTestResult] = useState({ status: 'idle', message: '', details: null });
  const [feynmanResult, setFeynmanResult] = useState({ status: 'idle', message: '' });
  const [shakeInput, setShakeInput] = useState(false);

  // Animations & UI helpers
  const [pulseElement, setPulseElement] = useState(false);
  const [showDomBarrier, setShowDomBarrier] = useState(false);
  const [showIframeBounds, setShowIframeBounds] = useState(false);
  const [staleRefBroken, setStaleRefBroken] = useState(false);
  const [dynamicLoading, setDynamicLoading] = useState(false);
  const [dynamicVisible, setDynamicVisible] = useState(false);
  const [dynamicId, setDynamicId] = useState('dynamic-1000');

  // Refs for sandbox
  const shadowHostRef = useRef(null);
  const iframeContainerRef = useRef(null);
  const dynamicContainerRef = useRef(null);
  const pseudoContainerRef = useRef(null);
  const staleContainerRef = useRef(null);
  const svgContainerRef = useRef(null);
  const xpathCssContainerRef = useRef(null);

  // List of all topics
  const topics = [
    { id: 'shadowDom', nameTr: '🌑 Shadow DOM', nameEn: '🌑 Shadow DOM', color: 'purple' },
    { id: 'iframes', nameTr: '🖼️ Nested iFrames', nameEn: '🖼️ Nested iFrames', color: 'blue' },
    { id: 'dynamicElements', nameTr: '⚡ Dinamik Öğeler', nameEn: '⚡ Dynamic Elements', color: 'amber' },
    { id: 'pseudoElements', nameTr: '🎭 Pseudo-elements', nameEn: '🎭 Pseudo-elements', color: 'rose' },
    { id: 'staleElement', nameTr: '🔄 Stale Element', nameEn: '🔄 Stale Element', color: 'orange' },
    { id: 'svgs', nameTr: '📐 SVG Yapıları', nameEn: '📐 SVG Elements', color: 'cyan' },
    { id: 'xpathCss', nameTr: '🔀 XPath vs CSS', nameEn: '🔀 XPath vs CSS', color: 'emerald' }
  ];

  // Randomize active topic in Interleaved Mode
  const shuffleTopic = () => {
    const uncompleted = topics.filter(t => !completedTopics.includes(t.id));
    const pool = uncompleted.length > 0 ? uncompleted : topics;
    const nextList = pool.filter(t => t.id !== activeTopic);
    const selected = nextList.length > 0 
      ? nextList[Math.floor(Math.random() * nextList.length)]
      : pool[0];
    
    if (selected) {
      handleTopicChange(selected.id);
    }
  };

  const handleTopicChange = (topicId) => {
    setActiveTopic(topicId);
    setTestResult({ status: 'idle', message: '', details: null });
    setFeynmanResult({ status: 'idle', message: '' });
    setShakeInput(false);
    setPulseElement(false);
    setShowDomBarrier(false);
    setShowIframeBounds(false);
    setStaleRefBroken(false);
    
    // Custom resets per topic
    if (topicId === 'dynamicElements') {
      setInputs(prev => ({ ...prev, dynamicElements: { triggerClicked: false, selector: '' } }));
      setDynamicVisible(false);
      setDynamicLoading(false);
    } else if (topicId === 'staleElement') {
      setInputs(prev => ({ ...prev, staleElement: { elementFound: false, selector: '' } }));
      setStaleRefBroken(false);
    }
  };

  // Generate dynamic ID for dynamicElements topic
  useEffect(() => {
    if (activeTopic === 'dynamicElements') {
      setDynamicId(`dynamic-${Math.floor(Math.random() * 90000) + 10000}`);
    }
  }, [activeTopic, inputs.dynamicElements.triggerClicked]);

  // Handle Dynamic Element creation delay
  const triggerDynamicCreation = () => {
    setDynamicLoading(true);
    setDynamicVisible(false);
    setInputs(prev => ({ ...prev, dynamicElements: { ...prev.dynamicElements, triggerClicked: true } }));
    setTimeout(() => {
      setDynamicLoading(false);
      setDynamicVisible(true);
    }, 2500);
  };

  // --- active recall and verification ---
  const verifySelector = () => {
    setTestResult({ status: 'checking', message: isTr ? 'Sorgulanıyor...' : 'Querying...' });
    setShakeInput(false);
    setPulseElement(false);
    setShowDomBarrier(false);
    setShowIframeBounds(false);
    
    setTimeout(() => {
      let isSuccess = false;
      let errorMsg = '';
      let explanation = '';

      switch (activeTopic) {
        case 'shadowDom': {
          const { host, inner } = inputs.shadowDom;
          if (host.trim() === '#shadow-host' && inner.trim() === '#secret-btn') {
            isSuccess = true;
            setPulseElement(true);
            explanation = isTr 
              ? "Harika! Önce gölge konakçıyı (Shadow Host) seçip ardından onun shadowRoot özelliğine eriştiniz ve alt elemanı yakaladınız."
              : "Awesome! You targeted the Shadow Host, accessed its shadowRoot, and located the internal element.";
          } else {
            if (host.trim() !== '#shadow-host') {
              setShowDomBarrier(true);
              errorMsg = isTr 
                ? "Hata: Shadow Host (#shadow-host) doğru hedeflenmedi. Dış DOM bariyeri aşılamadı!"
                : "Error: The Shadow Host (#shadow-host) was not targeted. The outer DOM barrier blocked the query!";
            } else {
              errorMsg = isTr
                ? "Hata: Shadow Host doğru ancak gölge kök (Shadow Root) içindeki buton kimliği yanlış."
                : "Error: Shadow Host is correct, but the button ID inside the Shadow Root is incorrect.";
            }
          }
          break;
        }

        case 'iframes': {
          const { parent, child, target } = inputs.iframes;
          if (parent.trim() === '#parent-frame' && child.trim() === '#child-frame' && target.trim() === '#target-btn') {
            isSuccess = true;
            setPulseElement(true);
            explanation = isTr
              ? "Tebrikler! Çift katmanlı iFrame hiyerarşisini adım adım switch ederek hedefe başarıyla ulaştınız."
              : "Congratulations! You successfully switched through the double-layer iFrame hierarchy to reach the target.";
          } else {
            setShowIframeBounds(true);
            if (parent.trim() !== '#parent-frame') {
              errorMsg = isTr 
                ? "Hata: En dıştaki iFrame (#parent-frame) bağlamına geçiş yapılmadı."
                : "Error: Failed to switch to the outermost iFrame (#parent-frame) context.";
            } else if (child.trim() !== '#child-frame') {
              errorMsg = isTr 
                ? "Hata: İçteki iFrame (#child-frame) bağlamına geçiş yapılmadı."
                : "Error: Failed to switch to the nested child iFrame (#child-frame) context.";
            } else {
              errorMsg = isTr 
                ? "Hata: iFrame bağlamları doğru fakat hedef buton (.btn-target / #target-btn) bulunamadı."
                : "Error: iFrame contexts are correct, but the target button (#target-btn) was not found.";
            }
          }
          break;
        }

        case 'dynamicElements': {
          const { selector } = inputs.dynamicElements;
          const trimmed = selector.trim();
          
          if (!dynamicVisible) {
            errorMsg = isTr 
              ? "Hata: Eleman henüz DOM'da mevcut değil! Önce 'Öğeyi Tetikle' butonuna basın ve yüklenmesini bekleyin."
              : "Error: Element is not in the DOM yet! Click 'Trigger Creation' first and wait for it to load.";
            break;
          }

          // Check if user is using a static id with dynamic suffix
          if (trimmed.includes(dynamicId)) {
            errorMsg = isTr
              ? `Hata: Statik seçici (${dynamicId}) kullanıldı! Bu kimlik her sayfa yenilendiğinde değiştiği için testiniz bir sonraki sefer kırılacaktır.`
              : `Error: Static selector (${dynamicId}) used! This ID changes on every reload, so your test will break next time.`;
            setShakeInput(true);
          } else if (
            // Correct dynamic strategies
            (trimmed.includes('^=') && trimmed.includes('dynamic-')) || 
            (trimmed.includes('*=') && trimmed.includes('dynamic-')) || 
            (trimmed.includes('starts-with') && trimmed.includes('dynamic-')) ||
            (trimmed.includes('contains') && trimmed.includes('dynamic-')) ||
            trimmed === '.success-btn' || trimmed === 'button.success-btn'
          ) {
            isSuccess = true;
            setPulseElement(true);
            explanation = isTr
              ? "Mükemmel! Sabit olmayan kimlik eklerini temizleyerek dinamik önek veya sınıf tabanlı kalıcı bir strateji kurdunuz."
              : "Excellent! You avoided the volatile suffix and built a robust dynamic prefix or class-based strategy.";
          } else {
            errorMsg = isTr 
              ? "Hata: Geçersiz seçici. Kısmi eşleşme attributes (starts-with, contains) veya stabil sınıfları deneyin."
              : "Error: Invalid selector. Try partial attribute matchers (starts-with, contains) or stable classes.";
            setShakeInput(true);
          }
          break;
        }

        case 'pseudoElements': {
          const { hostSelector, pseudoType, jsProperty } = inputs.pseudoElements;
          const cleanSelector = hostSelector.trim();
          const cleanProp = jsProperty.trim().toLowerCase();

          if (cleanSelector === '#alert-btn' && pseudoType === '::after' && (cleanProp === 'content' || cleanProp === 'getpropertyvalue("content")' || cleanProp === 'getpropertyvalue(\'content\')')) {
            isSuccess = true;
            setPulseElement(true);
            explanation = isTr
              ? "Harika! Pseudo-elementler gerçek DOM düğümleri olmadığından onları doğrudan seçemezsiniz; getComputedStyle JS API'sini kullanmak tek kararlı yoldur."
              : "Splendid! Since pseudo-elements are not actual DOM nodes, you cannot select them directly; using the getComputedStyle JS API is the only reliable way.";
          } else {
            if (cleanSelector !== '#alert-btn') {
              errorMsg = isTr ? "Hata: Pseudo-elementi barındıran ana öğe (#alert-btn) yanlış." : "Error: The host element (#alert-btn) is incorrect.";
            } else if (cleanProp !== 'content') {
              errorMsg = isTr ? "Hata: Pseudo-elementin görsel metnini tutan CSS özelliği 'content' olmalıdır." : "Error: The CSS property holding the pseudo-element text must be 'content'.";
            } else {
              errorMsg = isTr ? "Hata: Parametreleri tekrar kontrol edin." : "Error: Double check the parameters.";
            }
            setShakeInput(true);
          }
          break;
        }

        case 'staleElement': {
          const { selector } = inputs.staleElement;
          const trimmed = selector.trim();

          if (staleRefBroken) {
            if (trimmed === '#live-row' || trimmed === '.table-row' || trimmed === 'tr.table-row') {
              isSuccess = true;
              setPulseElement(true);
              setStaleRefBroken(false);
              explanation = isTr
                ? "Tebrikler! Yeniden üretilen DOM öğesini yeni bir sorguyla (re-fetch) tekrar arayarak stale durumundan kurtardınız."
                : "Congratulations! You bypassed the stale reference by re-fetching the updated DOM node with a new query.";
            } else {
              errorMsg = isTr
                ? "Hata: Stale referansı aşmak için öğeyi güncel haliyle yeniden sorgulamanız (re-fetch) gerekir."
                : "Error: To resolve the stale reference, you must re-fetch the element using its current locator.";
              setShakeInput(true);
            }
          } else {
            errorMsg = isTr
              ? "Önce 'Tabloyu Yenile' butonuna basarak DOM'u güncelleyin ve eski referansı bozun (Stale durumuna düşürün)!"
              : "Click 'Refresh Table' first to trigger DOM re-rendering and invalidate the cached element reference!";
          }
          break;
        }

        case 'svgs': {
          const { selector } = inputs.svgs;
          const trimmed = selector.trim();

          if (trimmed === "//*[local-name()='svg']/*[local-name()='path' and @class='bar-path']" || 
              trimmed === "//*[local-name()='svg']/*[local-name()='path']" ||
              trimmed === ".chart-svg .bar-path" ||
              trimmed === "svg.chart-svg path.bar-path") {
            isSuccess = true;
            setPulseElement(true);
            explanation = isTr
              ? "Tebrikler! SVG öğeleri için XML isim alanlarını (namespace) aşan local-name() XPath fonksiyonunu veya doğrudan CSS yollarını kullandınız."
              : "Congratulations! You successfully targeted the SVG elements using local-name() XPath functions or direct CSS hierarchy.";
          } else {
            errorMsg = isTr
              ? "Hata: XPath içindeki standart '//svg' veya '//path' ad alanı (namespace) çakışması nedeniyle çalışmayabilir. local-name() veya CSS deneyin."
              : "Error: Standard '//svg' or '//path' tags in XPath fail due to XML namespace mismatches. Try local-name() or CSS selectors.";
            setShakeInput(true);
          }
          break;
        }

        case 'xpathCss': {
          const { selector } = inputs.xpathCss;
          const trimmed = selector.trim();

          // Target: delete button of "John Doe"
          if (trimmed === "//div[span[text()='John Doe']]/button" ||
              trimmed === "//span[text()='John Doe']/following-sibling::button" ||
              trimmed === "//span[text()='John Doe']/..//button" ||
              trimmed === "div:has(span:contains('John Doe')) button" || // Playwright custom CSS
              trimmed === "div:has-text('John Doe') button" || // Playwright has-text CSS
              trimmed === "span:has-text('John Doe') + button") {
            isSuccess = true;
            setPulseElement(true);
            explanation = isTr
              ? "Mükemmel! Kardeş (sibling) veya Ebeveyn (parent) eksenlerini kullanarak John Doe satırındaki doğru butonu hedeflerden kaçırmadınız."
              : "Excellent! By leveraging sibling or parent axes, you precisely targeted the delete button corresponding to John Doe.";
          } else {
            errorMsg = isTr
              ? "Hata: Bu seçici John Doe satırını veya kardeş butonu dinamik olarak hedeflemiyor. Ebeveyn ya da kardeş eksenlerini (following-sibling / parent) kullanın."
              : "Error: This selector does not dynamically tie the delete button to John Doe. Use sibling/parent axes (following-sibling / parent).";
            setShakeInput(true);
          }
          break;
        }

        default:
          break;
      }

      if (isSuccess) {
        setTestResult({
          status: 'success',
          message: isTr ? '✅ Başarılı! Element başarıyla doğrulandı.' : '✅ Success! Element successfully verified.',
          details: explanation
        });
        setStreak(prev => prev + 1);
        setScore(prev => prev + 25);
      } else {
        setTestResult({
          status: 'error',
          message: errorMsg
        });
        setStreak(0);
      }
    }, 800);
  };

  // Verify Feynman Explanation using keyword checking
  const verifyFeynmanExplanation = () => {
    const text = feynmanExplanations[activeTopic];
    const validationRules = FEYNMAN_KEYWORDS[activeTopic];
    const keywords = isTr ? validationRules.tr : validationRules.en;
    
    // Clean and split words
    const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    
    let matchedKeywords = [];
    keywords.forEach(kw => {
      if (cleanText.includes(kw)) {
        matchedKeywords.push(kw);
      }
    });

    if (matchedKeywords.length >= validationRules.minCount) {
      setFeynmanResult({
        status: 'success',
        message: isTr 
          ? `🎉 Tebrikler! Harika bir anlatım. Öğrenme kalıcılığı sağlandı. (+50 XP)`
          : `🎉 Excellent explanation! Real learning achieved. (+50 XP)`
      });
      setScore(prev => prev + 50);
      
      // Mark topic as completed
      if (!completedTopics.includes(activeTopic)) {
        const nextCompleted = [...completedTopics, activeTopic];
        setCompletedTopics(nextCompleted);
      }
    } else {
      setFeynmanResult({
        status: 'error',
        message: validationRules.hint[isTr ? 'tr' : 'en']
      });
    }
  };

  return (
    <div className={`p-4 md:p-6 rounded-2xl border shadow-lg space-y-6 ${
      darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-100 text-gray-800'
    }`}>
      
      {/* --- TOP BAR: Header & Stats --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-850">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-400">
              <Brain className="h-6 w-6 animate-pulse" />
            </div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              {isTr ? '🧠 Nöro-Otomasyon Atölyesi' : '🧠 Neuro-Locate Lab'}
            </h1>
          </div>
          <p className="text-xs text-gray-400">
            {isTr 
              ? 'Karmaşık DOM yapılarını ve locate stratejilerini nöro-optimizasyonlu tekniklerle deneyimleyin.' 
              : 'Master complex DOM tree traversal and locator strategies using neuro-optimized learning techniques.'}
          </p>
        </div>

        {/* Scoreboard */}
        <div className="flex items-center gap-3 bg-gray-950 p-2.5 rounded-xl border border-gray-800">
          <div className="text-center px-3 border-r border-gray-800">
            <span className="block text-[10px] uppercase text-gray-500 font-bold">{isTr ? 'TOPLAM XP' : 'TOTAL XP'}</span>
            <span className="text-sm font-black text-indigo-400 flex items-center justify-center gap-1">
              <Award className="h-3.5 w-3.5" /> {score}
            </span>
          </div>
          <div className="text-center px-3 border-r border-gray-800">
            <span className="block text-[10px] uppercase text-gray-500 font-bold">STREAK</span>
            <span className="text-sm font-black text-amber-400 flex items-center justify-center gap-1">
              ⚡ {streak}
            </span>
          </div>
          <div className="text-center px-2">
            <span className="block text-[10px] uppercase text-gray-500 font-bold">{isTr ? 'DURUM' : 'PROGRESS'}</span>
            <span className="text-xs font-bold text-emerald-400">
              {completedTopics.length} / {topics.length}
            </span>
          </div>
        </div>
      </div>

      {/* --- PREFERENCES & CONFIG BAR --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs">
        {/* Tool selector */}
        <div className="space-y-2">
          <span className="font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-indigo-400" /> {isTr ? 'Hedef Test Aracı:' : 'Target Test Tool:'}
          </span>
          <div className="flex gap-2">
            {[
              { id: 'playwright', label: '🎭 Playwright' },
              { id: 'selenium', label: '🟢 Selenium' },
              { id: 'cypress', label: '🌲 Cypress' }
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${
                  activeTool === tool.id
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200'
                }`}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector (Interleaved / Shifter vs Standard) */}
        <div className="space-y-2">
          <span className="font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
            <Shuffle className="h-3.5 w-3.5 text-purple-400" /> {isTr ? 'Öğrenme Modu:' : 'Learning Mode:'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsInterleaved(false);
                handleTopicChange('shadowDom');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${
                !isInterleaved
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                  : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              📋 {isTr ? 'Standart Sıralı' : 'Standard Linear'}
            </button>
            <button
              onClick={() => {
                setIsInterleaved(true);
                shuffleTopic();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold border transition-all flex items-center gap-1 ${
                isInterleaved
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                  : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              🔀 {isTr ? 'Zihinsel Vites Değiştirici' : 'Mental Gear Shifter'}
              <span className="bg-purple-800 text-[9px] px-1 rounded font-normal">Interleaved</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN SPLIT CONTAINER: sidebar + active workspace --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Tabs (Hidden in Interleaved Mode unless finished) */}
        <div className="lg:col-span-3 space-y-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2 px-1">
            {isTr ? 'KAPSAM / MODÜLLER' : 'CHALLENGE TOPICS'}
          </span>
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 pb-2 lg:pb-0">
            {topics.map(tItem => {
              const isCompleted = completedTopics.includes(tItem.id);
              const isActive = activeTopic === tItem.id;
              return (
                <button
                  key={tItem.id}
                  disabled={isInterleaved && !isActive}
                  onClick={() => handleTopicChange(tItem.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold border flex items-center justify-between transition-all whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300 shadow-sm'
                      : isCompleted
                        ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-400'
                        : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-gray-300'
                  } ${isInterleaved && !isActive ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <span>{isTr ? tItem.nameTr : tItem.nameEn}</span>
                  {isCompleted && <span className="text-emerald-500 text-xs ml-1">✓</span>}
                </button>
              );
            })}
          </div>
          {isInterleaved && (
            <div className="p-3 bg-purple-950/10 border border-purple-900/40 rounded-xl mt-3">
              <p className="text-[11px] text-purple-300 leading-relaxed font-sans">
                💡 <strong>Zihinsel Vites Değiştirici Aktif:</strong> Sorular karışık olarak sunulur. Farklı DOM yapıları arasında vites değiştirerek beyninizi zorlayın!
              </p>
            </div>
          )}
        </div>

        {/* Workspace Workspace (Interactive Visualizer + Selector Test Bed) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Active Recall Challenge Card */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-md">
            
            {/* Header Description */}
            <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-start gap-2.5">
              <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="bg-indigo-900 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                  {isTr ? 'Aktif Hatırlama Mücadelesi' : 'Active Recall Challenge'}
                </span>
                <h3 className="text-sm font-bold text-white font-sans">
                  {activeTopic === 'shadowDom' && (isTr ? 'Gölgedeki Butonu Bulun' : 'Pierce the Shadow DOM Boundary')}
                  {activeTopic === 'iframes' && (isTr ? 'İç İçe Geçmiş Çerçeveleri Aşın' : 'Traverse Nested iFrames')}
                  {activeTopic === 'dynamicElements' && (isTr ? 'Uçucu Kimliklerin İzini Sürün' : 'Target Volatile & Delayed ID Elements')}
                  {activeTopic === 'pseudoElements' && (isTr ? 'Sahte Öğelerin CSS Değerini Okuyun' : 'Read Pseudo-Element Values')}
                  {activeTopic === 'staleElement' && (isTr ? 'Bayat Referansı (Stale Element) Canlandırın' : 'Resolve Stale Element Reference Exception')}
                  {activeTopic === 'svgs' && (isTr ? 'SVG Vektör Noktalarını Hedefleyin' : 'Query Inside XML SVG Namespaces')}
                  {activeTopic === 'xpathCss' && (isTr ? 'Dinamik Metin İlişkisi ve Kardeş Öğeler' : 'XPath vs CSS Parent-Sibling Axes')}
                </h3>
                <p className="text-xs text-gray-405 leading-relaxed font-sans">
                  {activeTopic === 'shadowDom' && (
                    isTr 
                      ? 'Selenium veya Playwright doğrudan sayfa genelinde findElement/locator çalıştırınca Shadow DOM içini göremez. Shadow Host\'a ulaşıp gölge kökü (shadowRoot) açmalı, ardından butonu hedeflemelisiniz.'
                      : 'Standard top-level selector engines cannot pierce Shadow DOM roots. First query the Shadow Host, access its shadowRoot, and find the target button.'
                  )}
                  {activeTopic === 'iframes' && (
                    isTr
                      ? 'Sayfanın ana bağlamı (default content) iFrame sınırlarının içini sorgulayamaz. Butona ulaşmak için adım adım parent ve child iFrame bağlamlarına switch olmanız gerekir.'
                      : 'The top-level document cannot find elements embedded inside nested frame contexts. You must switch context into the parent frame, then the child frame, to query the target button.'
                  )}
                  {activeTopic === 'dynamicElements' && (
                    isTr
                      ? 'Kimliklerin (ID) sonundaki rastgele sayısal uzantılar her sayfa yenilendiğinde değişir. Kısmi eşleşme yöntemleri (starts-with, contains, ^=) kullanarak stabil bir locator tasarlamalısınız.'
                      : 'Random numeric suffixes appended to element IDs change on every page reload. Build a stable locator using partial attribute prefix/suffix matchers or unique classes.'
                  )}
                  {activeTopic === 'pseudoElements' && (
                    isTr
                      ? 'Pseudo-elementler (::before, ::after) DOM ağacında fiziksel birer düğüm olmadıkları için locator ile bulunamazlar. Değerlerini okumak için JavaScript execute_script ile getComputedStyle API\'sini tetikleyin.'
                      : 'Pseudo-elements (::before, ::after) do not exist as concrete nodes in the DOM tree, meaning locators cannot query them directly. Read their values using getComputedStyle JS execution.'
                  )}
                  {activeTopic === 'staleElement' && (
                    isTr
                      ? 'Bir öğe DOM\'dan çıkarılıp aynısı tekrar eklendiğinde, elinizdeki eski referans kırılır ve Stale hatası fırlatılır. Çözüm için locator referansını yenileyin (re-fetch).'
                      : 'When a DOM node is destroyed and re-created, any cached reference goes stale. Prevent StaleElementReferenceException by re-querying (re-fetching) the element from the DOM.'
                  )}
                  {activeTopic === 'svgs' && (
                    isTr
                      ? 'XML Namespace farklılıkları nedeniyle normal XPath sorguları (örn: //svg) SVG elemanlarını bulamayabilir. local-name() XPath fonksiyonu veya CSS seçicileri kullanarak bu engeli aşın.'
                      : 'Mismatches in XML document namespaces can cause standard XPath queries (e.g. //svg) to miss. Use CSS hierarchy or local-name() functions in XPath.'
                  )}
                  {activeTopic === 'xpathCss' && (
                    isTr
                      ? "CSS seçicilerde (henüz yaygınlaşmamış :has() hariç) geriye doğru ebeveyne (parent) çıkmak veya doğrudan metin içeriği (text) eşleştirmek zordur. XPath ile John Doe hücresini bulup onun yanındaki silme butonunu locate edin."
                      : "Standard CSS cannot query text content directly or navigate back up to a parent (without :has). Use XPath parent/sibling axes to find John Doe's delete button."
                  )}
                </p>
              </div>
            </div>

            {/* Visual DOM Interactive Sandbox & Inspector Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-800">
              
              {/* Left Column: Live Sandbox Rendering */}
              <div className="p-4 border-r border-gray-800 flex flex-col justify-between bg-gray-900/40 min-h-[260px]">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-3 font-sans">
                  🖥️ {isTr ? 'CANLI ELEMENT SİMÜLASYONU' : 'LIVE ELEMENT SANDBOX'}
                </span>

                <div className="flex-grow flex items-center justify-center p-4">
                  {/* Topic 1: Shadow DOM Sandbox */}
                  {activeTopic === 'shadowDom' && (
                    <div className="text-center space-y-4">
                      <div 
                        ref={shadowHostRef}
                        id="shadow-host-box"
                        className={`p-5 rounded-xl border transition-all duration-300 relative ${
                          showDomBarrier 
                            ? 'bg-red-950/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-shake' 
                            : 'bg-purple-950/15 border-purple-900/50 hover:border-purple-500'
                        }`}
                      >
                        <span className="absolute -top-2.5 left-3 px-2 py-0.5 bg-purple-900 text-purple-200 text-[9px] font-black rounded border border-purple-700">
                          #shadow-host
                        </span>
                        
                        {/* Visual barrier indicator */}
                        {showDomBarrier && (
                          <div className="absolute inset-0 bg-red-950/80 rounded-xl flex items-center justify-center text-xs font-bold text-red-400 border border-red-500 animate-pulse z-15">
                            ⛔ DOM BARRIER (Shadow Root Closed)
                          </div>
                        )}

                        <div className="p-3 bg-gray-900 rounded-lg border border-purple-800/40 text-center">
                          <button
                            id="secret-btn"
                            className={`px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-lg transition-all ${
                              pulseElement ? 'animate-bounce shadow-[0_0_15px_rgba(139,92,246,0.6)] border-2 border-green-400' : 'opacity-80'
                            }`}
                          >
                            Verify Access
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] text-purple-400 italic">
                        {isTr ? '*Bu buton gölge ağaç (Shadow Root) içindedir.' : '*This button is nested inside a Shadow Root.'}
                      </p>
                    </div>
                  )}

                  {/* Topic 2: Nested iFrames Sandbox */}
                  {activeTopic === 'iframes' && (
                    <div className="w-full space-y-2">
                      <div 
                        ref={iframeContainerRef}
                        className={`p-4 rounded-xl border relative transition-all duration-300 ${
                          showIframeBounds ? 'border-red-500 bg-red-950/10 shadow-[0_0_12px_rgba(239,68,68,0.3)] animate-shake' : 'border-blue-900/40 bg-blue-950/5'
                        }`}
                      >
                        <span className="absolute -top-2.5 left-3 px-2 py-0.5 bg-blue-900 text-blue-200 text-[9px] font-black rounded border border-blue-700">
                          iframe #parent-frame
                        </span>

                        <div className="p-4 border border-dashed border-blue-800 rounded-lg relative bg-blue-950/10 mt-2">
                          <span className="absolute -top-2.5 left-3 px-1.5 py-0.5 bg-blue-950 text-blue-300 text-[8px] font-bold rounded border border-blue-900">
                            iframe #child-frame
                          </span>

                          <div className="py-4 text-center mt-2">
                            <button
                              id="target-btn"
                              className={`px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg transition-all ${
                                pulseElement ? 'animate-pulse ring-4 ring-green-400 bg-emerald-600' : ''
                              }`}
                            >
                              Click Me
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Topic 3: Dynamic Elements Sandbox */}
                  {activeTopic === 'dynamicElements' && (
                    <div className="text-center space-y-4 w-full">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={triggerDynamicCreation}
                          disabled={dynamicLoading}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg disabled:opacity-50 transition-all flex items-center gap-1.5"
                        >
                          <Play className="h-3 w-3" />
                          {isTr ? 'Öğeyi Tetikle' : 'Trigger Creation'}
                        </button>
                        <button
                          onClick={() => {
                            setDynamicVisible(false);
                            setDynamicLoading(false);
                            setInputs(prev => ({ ...prev, dynamicElements: { ...prev.dynamicElements, triggerClicked: false } }));
                          }}
                          className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Displaying Loading state */}
                      {dynamicLoading && (
                        <div className="flex items-center justify-center gap-2 py-4">
                          <div className="h-4 w-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                          <span className="text-xs text-amber-400">{isTr ? 'Yükleniyor (Gecikme: 2.5s)...' : 'Loading (Delay: 2.5s)...'}</span>
                        </div>
                      )}

                      {/* Dynamic Output Box */}
                      <div 
                        ref={dynamicContainerRef}
                        className="min-h-[60px] flex items-center justify-center"
                      >
                        {dynamicVisible && (
                          <div className="p-3 bg-gray-900 rounded-lg border border-amber-500/50 flex flex-col items-center gap-1 text-[11px] animate-fade-in">
                            <span className="text-gray-500 font-mono">id="{dynamicId}"</span>
                            <button
                              id={dynamicId}
                              className={`success-btn px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-lg ${
                                pulseElement ? 'animate-bounce border-2 border-green-400' : ''
                              }`}
                            >
                              Target Action
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Topic 4: Pseudo-elements Sandbox */}
                  {activeTopic === 'pseudoElements' && (
                    <div className="text-center space-y-3">
                      <div 
                        ref={pseudoContainerRef}
                        className="flex flex-col items-center gap-4"
                      >
                        <div className="relative group">
                          {/* Alert Badge Pseudo-element representation */}
                          <button
                            id="alert-btn"
                            className={`px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 relative ${
                              pulseElement ? 'ring-2 ring-emerald-500 border-emerald-500' : ''
                            }`}
                          >
                            Click
                            {/* Visual representation of ::after pseudo element */}
                            <span className="absolute -top-2 -right-3 px-2 py-0.5 bg-rose-600 text-white text-[9px] font-black rounded-full shadow-lg border border-rose-800 animate-pulse">
                              New Notification
                            </span>
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-500 italic max-w-xs leading-normal">
                          {isTr 
                            ? 'Yukarıdaki kırmızı "New Notification" yazısı DOM ağacında bulunmaz. Butonun ::after pseudo-elementi üzerinden CSS ile eklenmiştir.' 
                            : 'The red "New Notification" badge text is not inside the DOM tree. It is injected via CSS on the ::after pseudo-element.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Topic 5: Stale Element Sandbox */}
                  {activeTopic === 'staleElement' && (
                    <div className="w-full space-y-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setStaleRefBroken(true)}
                          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-all"
                        >
                          🔄 {isTr ? 'Tabloyu Yenile (DOM Detached)' : 'Refresh Table (Detach DOM)'}
                        </button>
                        <button
                          onClick={() => setStaleRefBroken(false)}
                          className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div 
                        ref={staleContainerRef}
                        className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-2 relative"
                      >
                        {/* Connection line showing cache link state */}
                        <div className="flex justify-between items-center text-[10px] bg-gray-950 p-2 rounded-lg border border-gray-800 mb-2">
                          <span className="text-gray-400 font-bold font-mono">CACHE REGISTRY:</span>
                          <span className={`font-mono font-bold ${staleRefBroken ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                            {staleRefBroken ? '❌ REFERENCE BROKEN (STALE)' : '✅ CACHE REFERENCE OK'}
                          </span>
                        </div>

                        <div 
                          className={`p-3 rounded-lg border transition-all duration-300 ${
                            staleRefBroken 
                              ? 'border-red-900/50 bg-red-950/5 text-gray-500 line-through' 
                              : 'border-orange-900/50 bg-orange-950/5 text-gray-300'
                          } ${pulseElement ? 'border-green-500 bg-emerald-950/15' : ''}`}
                        >
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="font-bold">ID: #live-row</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${staleRefBroken ? 'bg-red-900 text-red-200' : 'bg-orange-900 text-orange-200'}`}>
                              {staleRefBroken ? 'DOM Node Replaced' : 'DOM Node Active'}
                            </span>
                          </div>
                          <p className="text-[11px] mt-1 text-gray-400 font-sans">
                            {isTr ? 'Veri: Sistem test raporu yüklenmiştir.' : 'Data: System test report loaded.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Topic 6: SVGs Sandbox */}
                  {activeTopic === 'svgs' && (
                    <div 
                      ref={svgContainerRef}
                      className="text-center w-full max-w-[200px]"
                    >
                      <svg 
                        className={`chart-svg w-full h-36 p-2 bg-gray-950 rounded-xl border border-gray-800 transition-all ${
                          pulseElement ? 'border-emerald-500 ring-2 ring-emerald-500/50' : ''
                        }`}
                        viewBox="0 0 100 100"
                      >
                        <rect x="10" y="20" width="12" height="60" fill="#3b82f6" opacity="0.3" rx="2" />
                        <rect x="30" y="40" width="12" height="40" fill="#3b82f6" opacity="0.3" rx="2" />
                        <rect x="50" y="10" width="12" height="70" fill="#3b82f6" opacity="0.3" rx="2" />
                        {/* Target path */}
                        <path 
                          d="M 16 50 L 36 60 L 56 45" 
                          fill="none" 
                          strokeWidth="4" 
                          className={`bar-path transition-all cursor-pointer ${
                            pulseElement ? 'stroke-emerald-400 stroke-[5px]' : 'stroke-cyan-500'
                          }`}
                        />
                        <circle cx="16" cy="50" r="3.5" fill="#22d3ee" />
                        <circle cx="36" cy="60" r="3.5" fill="#22d3ee" />
                        <circle cx="56" cy="45" r="3.5" fill="#22d3ee" className={pulseElement ? 'animate-ping' : ''} />
                      </svg>
                      <span className="text-[9px] text-gray-500 font-mono mt-1 block">
                        &lt;svg class="chart-svg"&gt;&lt;path class="bar-path"&gt;
                      </span>
                    </div>
                  )}

                  {/* Topic 7: XPath vs CSS Sandbox */}
                  {activeTopic === 'xpathCss' && (
                    <div 
                      ref={xpathCssContainerRef}
                      className="w-full space-y-2 text-xs"
                    >
                      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-2 bg-gray-950 p-2 border-b border-gray-800 text-[10px] font-bold text-gray-400 font-mono">
                          <span>{isTr ? 'KULLANICI SATIRI' : 'USER'}</span>
                          <span className="text-right">{isTr ? 'AKSİYON' : 'ACTION'}</span>
                        </div>
                        
                        {/* User Row 1 */}
                        <div className="grid grid-cols-2 p-3 border-b border-gray-800/50 items-center">
                          <span className="font-medium text-gray-400">Sarah Connor</span>
                          <div className="text-right">
                            <button className="px-2.5 py-1 bg-gray-800 text-gray-500 rounded font-bold text-[10px] cursor-not-allowed">
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* User Row 2 (Target) */}
                        <div className={`grid grid-cols-2 p-3 items-center transition-all duration-300 ${
                          pulseElement ? 'bg-emerald-950/20' : ''
                        }`}>
                          <span className={`font-bold ${pulseElement ? 'text-emerald-400' : 'text-gray-200'}`}>John Doe</span>
                          <div className="text-right">
                            <button className={`delete-btn px-2.5 py-1 font-bold text-[10px] rounded transition-all ${
                              pulseElement ? 'bg-emerald-600 text-white shadow-md' : 'bg-red-950/40 text-red-400 border border-red-900/60 hover:bg-red-900 hover:text-white'
                            }`}>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Simulated DOM Inspector tree */}
              <div className="p-4 bg-gray-950/70 flex flex-col justify-between font-mono text-[11px] leading-relaxed overflow-y-auto max-h-[300px]">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-3 font-sans">
                    🔍 {isTr ? 'DOM AĞACI İNCELEYİCİ' : 'DOM TREE INSPECTOR'}
                  </span>

                  <div className="space-y-1 text-gray-400">
                    <div>&lt;div class="container"&gt;</div>
                    
                    {/* Shadow DOM Inspector view */}
                    {activeTopic === 'shadowDom' && (
                      <div className="pl-4 space-y-1">
                        <div className="text-purple-400 font-bold">&lt;div id="shadow-host"&gt;</div>
                        <div className="pl-4 text-purple-300 font-bold border-l-2 border-purple-800/50">
                          {isTr ? '#shadow-root (open)' : '#shadow-root (open)'}
                          <div className="pl-4 text-gray-300 font-normal">
                            &lt;style&gt;...&lt;/style&gt;
                          </div>
                          <div className={`pl-4 text-yellow-200 font-bold transition-all duration-300 ${pulseElement ? 'bg-emerald-950/40 p-0.5 rounded border border-emerald-800' : ''}`}>
                            &lt;button id="secret-btn"&gt;Verify Access&lt;/button&gt;
                          </div>
                        </div>
                        <div className="text-purple-400 font-bold">&lt;/div&gt;</div>
                      </div>
                    )}

                    {/* iFrames Inspector view */}
                    {activeTopic === 'iframes' && (
                      <div className="pl-4 space-y-1">
                        <div className="text-blue-400 font-bold">&lt;iframe id="parent-frame"&gt;</div>
                        <div className="pl-4 text-blue-300 border-l border-blue-800/40">
                          #document
                          <div className="pl-4 text-blue-400 font-bold">&lt;iframe id="child-frame"&gt;</div>
                          <div className="pl-8 text-blue-200 border-l border-blue-900/60">
                            #document
                            <div className={`pl-4 transition-all duration-300 ${pulseElement ? 'bg-emerald-950/40 p-0.5 rounded border border-emerald-800' : 'text-yellow-200'}`}>
                              &lt;button id="target-btn"&gt;Click Me&lt;/button&gt;
                            </div>
                          </div>
                          <div className="pl-4 text-blue-400 font-bold">&lt;/iframe&gt;</div>
                        </div>
                        <div className="text-blue-400 font-bold">&lt;/iframe&gt;</div>
                      </div>
                    )}

                    {/* Dynamic Elements Inspector view */}
                    {activeTopic === 'dynamicElements' && (
                      <div className="pl-4 space-y-1">
                        <div className="text-amber-400 font-bold">&lt;button onclick="trigger()"&gt;Trigger&lt;/button&gt;</div>
                        {dynamicVisible ? (
                          <div className={`pl-4 border-l border-amber-800/40 transition-all ${pulseElement ? 'bg-emerald-950/40 p-0.5 rounded border border-emerald-800' : ''}`}>
                            <div className="text-yellow-200">&lt;button id="{dynamicId}" class="success-btn"&gt;</div>
                            <div className="pl-4 text-gray-500">Target Action</div>
                            <div className="text-yellow-200">&lt;/button&gt;</div>
                          </div>
                        ) : (
                          <div className="pl-4 text-gray-600 italic">
                            {isTr ? '<!-- Öğe tetikleme bekliyor -->' : '<!-- Element pending trigger -->'}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pseudo-elements Inspector view */}
                    {activeTopic === 'pseudoElements' && (
                      <div className="pl-4 space-y-1">
                        <div className={`transition-all ${pulseElement ? 'bg-emerald-950/40 p-0.5 rounded border border-emerald-800' : ''}`}>
                          <div className="text-yellow-200">&lt;button id="alert-btn" class="has-badge"&gt;</div>
                          <div className="pl-4 text-gray-400">Click</div>
                          <div className="pl-4 text-rose-400 font-bold">
                            ::after <span className="text-gray-500 font-normal">(content: "New Notification")</span>
                          </div>
                          <div className="text-yellow-200">&lt;/button&gt;</div>
                        </div>
                      </div>
                    )}

                    {/* Stale Element Inspector view */}
                    {activeTopic === 'staleElement' && (
                      <div className="pl-4 space-y-1">
                        <div className="text-orange-400 font-bold">&lt;button onclick="refresh()"&gt;Refresh&lt;/button&gt;</div>
                        <div className={`pl-4 border-l border-orange-800/40 transition-all ${pulseElement ? 'bg-emerald-950/40 p-0.5 rounded border border-emerald-800' : ''}`}>
                          <div className={staleRefBroken ? "text-red-400/70" : "text-yellow-200"}>
                            &lt;tr id="live-row" class="table-row"&gt;
                          </div>
                          <div className="pl-4 text-gray-500">Data: System report loaded.</div>
                          <div className={staleRefBroken ? "text-red-400/70" : "text-yellow-200"}>
                            &lt;/tr&gt;
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SVGs Inspector view */}
                    {activeTopic === 'svgs' && (
                      <div className="pl-4 space-y-1">
                        <div className="text-cyan-400">&lt;svg class="chart-svg"&gt;</div>
                        <div className="pl-4 text-gray-600 border-l border-cyan-800/30">
                          &lt;rect ... /&gt; (x3)
                        </div>
                        <div className={`pl-4 border-l border-cyan-800/30 transition-all ${pulseElement ? 'bg-emerald-950/40 p-0.5 rounded border border-emerald-800' : ''}`}>
                          <div className="text-yellow-200">&lt;path class="bar-path" d="..." /&gt;</div>
                        </div>
                        <div className="text-cyan-400">&lt;/svg&gt;</div>
                      </div>
                    )}

                    {/* XPath vs CSS Inspector view */}
                    {activeTopic === 'xpathCss' && (
                      <div className="pl-4 space-y-1">
                        <div className="text-gray-500">&lt;!-- Sarah Connor Row --&gt;</div>
                        <div className="text-gray-600 pl-4">&lt;div class="user-row"&gt;...&lt;/div&gt;</div>
                        <div className="text-gray-500">&lt;!-- John Doe Row (Target) --&gt;</div>
                        <div className={`pl-4 border-l border-emerald-800/30 transition-all ${pulseElement ? 'bg-emerald-950/40 p-0.5 rounded border border-emerald-800' : ''}`}>
                          <div className="text-emerald-400">&lt;div class="user-row"&gt;</div>
                          <div className="pl-4 text-yellow-200">&lt;span class="user-name"&gt;John Doe&lt;/span&gt;</div>
                          <div className="pl-4 text-yellow-200">&lt;button class="delete-btn"&gt;Delete&lt;/button&gt;</div>
                          <div className="text-emerald-400">&lt;/div&gt;</div>
                        </div>
                      </div>
                    )}

                    <div>&lt;/div&gt;</div>
                  </div>
                </div>

                <div className="mt-4 p-2 bg-gray-900 border border-gray-800 rounded text-[10px] text-gray-400 font-sans leading-normal">
                  📍 {isTr ? 'Fiziksel DOM ağacı hiyerarşisi. Seçicinizin bu yapıyı eşleştirdiğini doğrulayın.' : 'Simulated physical DOM structure. Verify your selector query matches this topology.'}
                </div>
              </div>

            </div>

            {/* Selector Input and Test Action Center */}
            <div className="p-4 bg-gray-900/60 space-y-4">
              
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block font-sans">
                  ⌨️ {isTr ? 'SEÇİCİ GİRİŞİ' : 'LOCATOR CODE / INPUT'}
                </span>

                {/* Sub-inputs per topic */}
                <div className="space-y-3">
                  
                  {activeTopic === 'shadowDom' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-purple-400 uppercase tracking-wide font-sans">
                          Host Selector (Shadow Host)
                        </label>
                        <input
                          type="text"
                          value={inputs.shadowDom.host}
                          onChange={(e) => setInputs(prev => ({ ...prev, shadowDom: { ...prev.shadowDom, host: e.target.value } }))}
                          placeholder="#shadow-host"
                          className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-purple-900/50 rounded-lg text-purple-200 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-purple-400 uppercase tracking-wide font-sans">
                          Target Selector (Inside Shadow DOM)
                        </label>
                        <input
                          type="text"
                          value={inputs.shadowDom.inner}
                          onChange={(e) => setInputs(prev => ({ ...prev, shadowDom: { ...prev.shadowDom, inner: e.target.value } }))}
                          placeholder="#secret-btn"
                          className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-purple-900/50 rounded-lg text-purple-200 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeTopic === 'iframes' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-blue-400 uppercase tracking-wide font-sans">
                          Outer Frame (Parent)
                        </label>
                        <input
                          type="text"
                          value={inputs.iframes.parent}
                          onChange={(e) => setInputs(prev => ({ ...prev, iframes: { ...prev.iframes, parent: e.target.value } }))}
                          placeholder="#parent-frame"
                          className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-blue-900/50 rounded-lg text-blue-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-blue-400 uppercase tracking-wide font-sans">
                          Inner Frame (Child)
                        </label>
                        <input
                          type="text"
                          value={inputs.iframes.child}
                          onChange={(e) => setInputs(prev => ({ ...prev, iframes: { ...prev.iframes, child: e.target.value } }))}
                          placeholder="#child-frame"
                          className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-blue-900/50 rounded-lg text-blue-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-blue-400 uppercase tracking-wide font-sans">
                          Target Element
                        </label>
                        <input
                          type="text"
                          value={inputs.iframes.target}
                          onChange={(e) => setInputs(prev => ({ ...prev, iframes: { ...prev.iframes, target: e.target.value } }))}
                          placeholder="#target-btn"
                          className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-blue-900/50 rounded-lg text-blue-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeTopic === 'dynamicElements' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wide font-sans">
                        Dynamic Selector (CSS or XPath that bypasses dynamic ID numbers)
                      </label>
                      <input
                        type="text"
                        value={inputs.dynamicElements.selector}
                        onChange={(e) => setInputs(prev => ({ ...prev, dynamicElements: { ...prev.dynamicElements, selector: e.target.value } }))}
                        placeholder="[id^='dynamic-'] or .success-btn"
                        className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-amber-900/50 rounded-lg text-amber-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

                  {activeTopic === 'pseudoElements' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-rose-400 uppercase tracking-wide font-sans">
                          Host Element Selector
                        </label>
                        <input
                          type="text"
                          value={inputs.pseudoElements.hostSelector}
                          onChange={(e) => setInputs(prev => ({ ...prev, pseudoElements: { ...prev.pseudoElements, hostSelector: e.target.value } }))}
                          placeholder="#alert-btn"
                          className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-rose-900/50 rounded-lg text-rose-200 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-rose-400 uppercase tracking-wide font-sans">
                          Pseudo-Element Type
                        </label>
                        <select
                          value={inputs.pseudoElements.pseudoType}
                          onChange={(e) => setInputs(prev => ({ ...prev, pseudoElements: { ...prev.pseudoElements, pseudoType: e.target.value } }))}
                          className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-rose-900/50 rounded-lg text-rose-200 focus:outline-none focus:border-rose-500"
                        >
                          <option value="::after">::after</option>
                          <option value="::before">::before</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-rose-400 uppercase tracking-wide font-sans">
                          JS style target property
                        </label>
                        <input
                          type="text"
                          value={inputs.pseudoElements.jsProperty}
                          onChange={(e) => setInputs(prev => ({ ...prev, pseudoElements: { ...prev.pseudoElements, jsProperty: e.target.value } }))}
                          placeholder="content"
                          className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-rose-900/50 rounded-lg text-rose-200 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeTopic === 'staleElement' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-orange-400 uppercase tracking-wide font-sans">
                        Re-fetch Selector
                      </label>
                      <input
                        type="text"
                        value={inputs.staleElement.selector}
                        onChange={(e) => setInputs(prev => ({ ...prev, staleElement: { ...prev.staleElement, selector: e.target.value } }))}
                        placeholder="#live-row"
                        className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-orange-900/50 rounded-lg text-orange-200 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  )}

                  {activeTopic === 'svgs' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-wide font-sans">
                        SVG Path Selector (XPath local-name() or CSS)
                      </label>
                      <input
                        type="text"
                        value={inputs.svgs.selector}
                        onChange={(e) => setInputs(prev => ({ ...prev, svgs: { selector: e.target.value } }))}
                        placeholder="//*[local-name()='svg']/*[local-name()='path' and @class='bar-path']"
                        className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-cyan-900/50 rounded-lg text-cyan-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  )}

                  {activeTopic === 'xpathCss' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide font-sans">
                        Dinamik Sibling XPath/CSS (Target: Delete button of John Doe)
                      </label>
                      <input
                        type="text"
                        value={inputs.xpathCss.selector}
                        onChange={(e) => setInputs(prev => ({ ...prev, xpathCss: { selector: e.target.value } }))}
                        placeholder="//span[text()='John Doe']/following-sibling::button"
                        className="w-full font-mono text-xs px-3 py-2 bg-gray-955 border border-emerald-900/50 rounded-lg text-emerald-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  )}

                </div>

                {/* API Method Output preview box */}
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-indigo-400" />
                    <span className="text-gray-400 font-sans">API Preview:</span>
                    <span className="text-indigo-300">
                      {activeTool === 'playwright' && (
                        activeTopic === 'shadowDom' && `await page.locator('${inputs.shadowDom.host || '#shadow-host'}').locator('${inputs.shadowDom.inner || '#secret-btn'}').click()`
                      )}
                      {activeTool === 'playwright' && (
                        activeTopic === 'iframes' && `await page.frameLocator('${inputs.iframes.parent || '#parent-frame'}').frameLocator('${inputs.iframes.child || '#child-frame'}').locator('${inputs.iframes.target || '#target-btn'}').click()`
                      )}
                      {activeTool === 'playwright' && (
                        activeTopic === 'dynamicElements' && `await page.locator('${inputs.dynamicElements.selector || '.success-btn'}').click()`
                      )}
                      {activeTool === 'playwright' && (
                        activeTopic === 'pseudoElements' && `await page.evaluate(() => window.getComputedStyle(document.querySelector('${inputs.pseudoElements.hostSelector || '#alert-btn'}'), '${inputs.pseudoElements.pseudoType || '::after'}').content)`
                      )}
                      {activeTool === 'playwright' && (
                        activeTopic === 'staleElement' && `await page.locator('${inputs.staleElement.selector || '#live-row'}').click()`
                      )}
                      {activeTool === 'playwright' && (
                        activeTopic === 'svgs' && `await page.locator('${inputs.svgs.selector || '.bar-path'}').click()`
                      )}
                      {activeTool === 'playwright' && (
                        activeTopic === 'xpathCss' && `await page.locator("${inputs.xpathCss.selector || "//span[text()='John Doe']/following-sibling::button"}").click()`
                      )}

                      {activeTool === 'selenium' && (
                        activeTopic === 'shadowDom' && `driver.findElement(By.cssSelector("${inputs.shadowDom.host || '#shadow-host'}")).getShadowRoot().findElement(By.cssSelector("${inputs.shadowDom.inner || '#secret-btn'}"))`
                      )}
                      {activeTool === 'selenium' && (
                        activeTopic === 'iframes' && `driver.switchTo().frame("${inputs.iframes.parent || '#parent-frame'}");\\ndriver.switchTo().frame("${inputs.iframes.child || '#child-frame'}");\\ndriver.findElement(By.id("${inputs.iframes.target || '#target-btn'}"));`
                      )}
                      {activeTool === 'selenium' && (
                        activeTopic === 'dynamicElements' && `driver.findElement(By.cssSelector("${inputs.dynamicElements.selector || "[id^='dynamic-']"}"))`
                      )}
                      {activeTool === 'selenium' && (
                        activeTopic === 'pseudoElements' && `((JavascriptExecutor) driver).executeScript("return window.getComputedStyle(arguments[0], '${inputs.pseudoElements.pseudoType || '::after'}').getPropertyValue('${inputs.pseudoElements.jsProperty || 'content'}');", element)`
                      )}
                      {activeTool === 'selenium' && (
                        activeTopic === 'staleElement' && `driver.findElement(By.cssSelector("${inputs.staleElement.selector || '#live-row'}")).click(); // Re-fetched`
                      )}
                      {activeTool === 'selenium' && (
                        activeTopic === 'svgs' && `driver.findElement(By.xpath("${inputs.svgs.selector || "//*[local-name()='svg']/*[local-name()='path']"}"))`
                      )}
                      {activeTool === 'selenium' && (
                        activeTopic === 'xpathCss' && `driver.findElement(By.xpath("${inputs.xpathCss.selector || "//span[text()='John Doe']/following-sibling::button"}"))`
                      )}

                      {activeTool === 'cypress' && (
                        activeTopic === 'shadowDom' && `cy.get('${inputs.shadowDom.host || '#shadow-host'}').shadow().find('${inputs.shadowDom.inner || '#secret-btn'}').click()`
                      )}
                      {activeTool === 'cypress' && (
                        activeTopic === 'iframes' && `cy.get('${inputs.iframes.parent || '#parent-frame'}').its('0.contentDocument.body').find('${inputs.iframes.child || '#child-frame'}').its('0.contentDocument.body').find('${inputs.iframes.target || '#target-btn'}').click()`
                      )}
                      {activeTool === 'cypress' && (
                        activeTopic === 'dynamicElements' && `cy.get('${inputs.dynamicElements.selector || '.success-btn'}').click()`
                      )}
                      {activeTool === 'cypress' && (
                        activeTopic === 'pseudoElements' && `cy.get('${inputs.pseudoElements.hostSelector || '#alert-btn'}').then(($el) => {\\n  const win = $el[0].ownerDocument.defaultView;\\n  const content = win.getComputedStyle($el[0], '${inputs.pseudoElements.pseudoType || '::after'}').getPropertyValue('${inputs.pseudoElements.jsProperty || 'content'}');\\n})`
                      )}
                      {activeTool === 'cypress' && (
                        activeTopic === 'staleElement' && `cy.get('${inputs.staleElement.selector || '#live-row'}').click()`
                      )}
                      {activeTool === 'cypress' && (
                        activeTopic === 'svgs' && `cy.get('${inputs.svgs.selector || '.bar-path'}').click()`
                      )}
                      {activeTool === 'cypress' && (
                        activeTopic === 'xpathCss' && `cy.xpath("${inputs.xpathCss.selector || "//span[text()='John Doe']/following-sibling::button"}").click()`
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={verifySelector}
                    disabled={testResult.status === 'checking'}
                    className="flex-grow py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer font-sans"
                  >
                    <Play className="h-3.5 w-3.5" />
                    {isTr ? 'SEÇİCİYİ DOĞRULA (TEST)' : 'VALIDATE SELECTOR (RUN)'}
                  </button>
                </div>
              </div>

              {/* Validation feedback logs */}
              {testResult.status !== 'idle' && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                  testResult.status === 'success'
                    ? 'bg-emerald-955/20 border-emerald-900 text-emerald-300'
                    : testResult.status === 'error'
                      ? 'bg-red-955/20 border-red-900 text-red-300'
                      : 'bg-gray-900 border-gray-800 text-gray-400'
                }`}>
                  <div className="flex items-start gap-2">
                    {testResult.status === 'success' ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : testResult.status === 'error' ? (
                      <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin flex-shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 font-sans">
                      <p className="font-bold">{testResult.message}</p>
                      {testResult.details && <p className="opacity-90">{testResult.details}</p>}
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Feynman Checkpoint Section (Renders when challenge passes) */}
          {testResult.status === 'success' && (
            <div className="bg-gray-950 border border-emerald-900/50 rounded-xl p-4 md:p-5 space-y-4 animate-fade-in shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 font-sans">
                    🎓 {isTr ? 'Feynman Tekniği Checkpoint\'i' : 'Feynman Technique Checkpoint'}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-sans">
                    {isTr 
                      ? 'Bu DOM yapısının otomasyon araçları karşısındaki davranışını 5 yaşındaki bir çocuğa (veya sektöre yeni giren birine) anlatır gibi özetleyin.' 
                      : 'Explain this DOM structure and why automation tools behave this way to a 5-year-old (or a junior tester).'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <textarea
                  value={feynmanExplanations[activeTopic]}
                  onChange={(e) => setFeynmanExplanations(prev => ({ ...prev, [activeTopic]: e.target.value }))}
                  placeholder={
                    isTr 
                      ? 'Teknik terim boğuntusuna girmeden, mantığı kendi kelimelerinizle açıklayın...' 
                      : 'Explain the core logic in simple terms using your own words...'
                  }
                  rows="3"
                  className="w-full text-xs p-3 rounded-lg bg-gray-900 border border-gray-800 text-gray-205 focus:outline-none focus:border-emerald-500 font-sans"
                />

                <div className="flex justify-between items-center gap-2 font-sans">
                  <span className="text-[10px] text-gray-500 font-medium">
                    ⚠️ {isTr ? 'Açıklamanız anahtar kavramların eşleşmesiyle doğrulanacaktır.' : 'Your explanation will be matched against core semantic terms.'}
                  </span>
                  <button
                    onClick={verifyFeynmanExplanation}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    {isTr ? 'AÇIKLAMAYI DOĞRULA' : 'SUBMIT EXPLANATION'}
                  </button>
                </div>
              </div>

              {feynmanResult.status !== 'idle' && (
                <div className={`p-3 rounded-lg border text-xs leading-relaxed animate-fade-in ${
                  feynmanResult.status === 'success'
                    ? 'bg-emerald-955/30 border-emerald-800 text-emerald-300'
                    : 'bg-amber-955/20 border-amber-900 text-amber-300'
                }`}>
                  <div className="flex items-start gap-2">
                    {feynmanResult.status === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 font-sans">
                      <p className="font-bold">{feynmanResult.message}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Challenge button if Feynman passes */}
              {feynmanResult.status === 'success' && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      if (isInterleaved) {
                        shuffleTopic();
                      } else {
                        // linear index increment
                        const currIndex = topics.findIndex(t => t.id === activeTopic);
                        const nextIndex = (currIndex + 1) % topics.length;
                        handleTopicChange(topics[nextIndex].id);
                      }
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white text-xs font-black rounded-lg flex items-center gap-1.5 shadow-lg shadow-indigo-950/50 hover:shadow-xl transition-all scale-105 font-sans"
                  >
                    <span>{isTr ? 'SONRAKİ MODÜLE GEÇ' : 'PROCEED TO NEXT TOPIC'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default NeuroLocateLab;
