import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

// --- Search Highlighter ---
function highlightText(html, query) {
    if (!query || !query.trim()) return html;
    const escapedQuery = query.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return html.replace(regex, '<mark class="bg-yellow-400/40 text-yellow-100 rounded px-0.5 font-semibold">$1</mark>');
}

// --- Text Formatter Helper ---
function parseFormatting(text, darkMode, searchQuery) {
    if (!text) return '';
    // HTML Escaping
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    // Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-orange-500">$1</strong>');
    // Italic: *text* -> <em>text</em>
    html = html.replace(/\*(.*?)\*/g, '<em class="italic opacity-90 text-amber-500/95">$1</em>');
    // Inline Code: `code` or \`code\`
    html = html.replace(/\\?`(.*?)\\?`/g, (match, p1) => {
        const bg = darkMode ? 'bg-slate-950/90 text-orange-400 border-slate-700' : 'bg-orange-50 text-orange-600 border-orange-200';
        return `<code class="px-1.5 py-0.5 rounded border font-mono text-xs ${bg}">${p1}</code>`;
    });

    if (searchQuery) {
        html = highlightText(html, searchQuery);
    }
    return html;
}

// --- Prism CodeBlock ---
function CodeBlock({ code, darkMode }) {
    const [copied, setCopied] = useState(false)
    const codeRef = useRef(null)
    const { language } = useLanguage()

    useEffect(() => {
        if (codeRef.current && window.Prism) {
            window.Prism.highlightElement(codeRef.current)
        }
    }, [code, darkMode])

    return (
        <div className="relative mt-2 mb-4 group">
            <pre className="p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-700" style={{ background: '#11121d' }}>
                <code ref={codeRef} className="language-java">{(code || '').trim()}</code>
            </pre>
            <button
                onClick={() => { navigator.clipboard.writeText((code || '').trim()); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                className="absolute top-2 right-2 px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow border border-slate-700 cursor-pointer"
            >
                {copied 
                    ? (language === 'tr' ? '✅ Kopyalandı' : '✅ Copied') 
                    : (language === 'tr' ? '📋 Kopyala' : '📋 Copy')}
            </button>
        </div>
    )
}

// --- Scroll Progress Bar ---
function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const pct = (scrollTop / (scrollHeight - clientHeight)) * 100
            setProgress(Math.min(100, Math.max(0, pct)))
        }
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'transparent', zIndex: 9999 }}>
            <div style={{
                height: '100%', width: `${progress}%`,
                background: 'linear-gradient(90deg, #ea580c, #f59e0b)',
                transition: 'width 0.1s linear',
            }} />
        </div>
    )
}

// --- Home Button ---
function HomeButton() {
    const { language } = useLanguage()
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title={language === 'tr' ? 'Başa dön' : 'Back to top'}
            className="fixed bottom-4 right-4 w-11 h-11 rounded-full bg-orange-600 hover:bg-orange-500 text-white border-none cursor-pointer text-xl z-50 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-orange-600/30"
        >
            🏠
        </button>
    )
}

// --- Skeleton Loader ---
const SkeletonLoader = ({ darkMode }) => (
    <div className="animate-pulse space-y-6">
        <div className={`h-8 w-1/3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className="space-y-3">
            <div className={`h-4 w-full rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-4 w-5/6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-4 w-4/5 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
        <div className={`h-32 w-full rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className="space-y-3">
            <div className={`h-4 w-full rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-4 w-3/4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
    </div>
);

// --- Chapter Translations Dictionary ---
const CHAPTER_TRANSLATIONS = {
    "Getting started with Java Language": "Java Dilini Kullanmaya Başlarken",
    "Type Conversion": "Tip Dönüşümleri (Casting)",
    "Getters and Setters": "Getters ve Setters Metotları",
    "Reference Data Types": "Referans Veri Tipleri",
    "Java Compiler - 'javac'": "Java Derleyicisi - 'javac'",
    "Documenting Java Code": "Java Kodunu Belgelendirme (Javadoc)",
    "Command line Argument Processing": "Komut Satırı Argümanlarını İşleme",
    "The Java Command - 'java' and 'javaw'": "Java Çalıştırma Komutları ('java' & 'javaw')",
    "Literals": "Literaller (Sabit Değerler)",
    "Primitive Data Types": "İlkel (Primitive) Veri Tipleri",
    "Strings": "Metinler (Strings)",
    "StringBuffer": "StringBuffer Sınıfı",
    "StringBuilder": "StringBuilder Sınıfı",
    "String Tokenizer": "StringTokenizer Sınıfı",
    "Splitting a string into fixed length parts": "Metinleri Belirli Uzunlukta Parçalara Bölme",
    "Date Class": "Date Sınıfı",
    "Dates and Time (java.time.*)": "Tarih ve Saat İşlemleri (java.time)",
    "LocalTime": "LocalTime Sınıfı",
    "BigDecimal": "BigDecimal Sınıfı (Yüksek Hassasiyetli Ondalık)",
    "BigInteger": "BigInteger Sınıfı (Büyük Sayılar)",
    "NumberFormat": "Sayı Formatlama (NumberFormat)",
    "Bit Manipulation": "Bit Düzeyinde İşlemler (Bitwise)",
    "Arrays": "Diziler (Arrays)",
    "Collections": "Koleksiyonlar (Collections Genel)",
    "Lists": "Listeler (Lists)",
    "Sets": "Kümeler (Sets)",
    "List vs Set": "List ve Set Koleksiyonları Farkları",
    "Maps": "Eşlemeler (Maps)",
    "LinkedHashMap": "LinkedHashMap Sınıfı",
    "WeakHashMap": "WeakHashMap Sınıfı",
    "SortedMap": "SortedMap Arayüzü",
    "TreeMap and TreeSet": "TreeMap ve TreeSet Sınıfları",
    "Queues and Deques": "Kuyruklar ve Çift Uçlu Kuyruklar (Queue & Deque)",
    "Dequeue Interface": "Deque Arayüzü Detayları",
    "Enums": "Enum Yapıları (Numaralandırmalar)",
    "Enum Map": "EnumMap Sınıfı",
    "EnumSet class": "EnumSet Sınıfı",
    "Enum starting with number": "Sayıyla Başlayan Enum Tanımlama",
    "Hashtable": "Hashtable Sınıfı",
    "Operators": "Operatörler (Operators)",
    "Constructors": "Yapıcı Metotlar (Constructors)",
    "Object Class Methods and Constructor": "Object Sınıfı Metotları ve Yapıcıları",
    "Annotations": "Anotasyonlar (Annotations)",
    "Immutable Class": "Değiştirilemez (Immutable) Sınıflar",
    "Immutable Objects": "Değiştirilemez Nesneler",
    "Visibility (controlling access to members of a class)": "Erişim Belirteçleri (Visibility/Access Modifiers)",
    "Generics": "Genel Tipler (Generics)",
    "Classes and Objects": "Sınıflar ve Nesneler (OOP Temelleri)",
    "Local Inner Class": "Yerel Dahili Sınıflar (Local Inner Class)",
    "Nested and Inner Classes": "İç İçe ve Dahili Sınıflar",
    "The static keyword": "static Anahtar Kelimesi",
    "The final keyword": "final Anahtar Kelimesi",
    "Interfaces": "Arayüzler (Interfaces)",
    "Default Methods": "Default Metotlar (Java 8+ Arayüz Özelliği)",
    "Inheritance": "Kalıtım (Inheritance)",
    "Reference Types": "Referans Tipleri",
    "Object References": "Nesne Referansları",
    "Exceptions and exception handling": "Hata Yönetimi (Exceptions & try-catch)",
    "Calendar and its Subclasses": "Calendar Sınıfı ve Alt Sınıfları",
    "Using the static keyword": "static Anahtar Kelimesinin Kullanımı",
    "Properties Class": "Properties Sınıfı (Yapılandırma Dosyaları)",
    "Lambda Expressions": "Lambda İfadeleri (Java 8+)",
    "Java Native Access": "Java Native Access (JNA)",
    "Modules": "Modüller (Java 9+ Modules)",
    "Concurrent Programming (Threads)": "Eşzamanlı Programlama (Threads / Çoklu İş Parçacığı)",
    "Executor, ExecutorService and Thread pools": "Executor, ExecutorService ve Thread Havuzları",
    "ThreadLocal": "ThreadLocal Kullanımı",
    "Using ThreadPoolExecutor in MultiThreaded applications.": "ThreadPoolExecutor Kullanımı",
    "Common Java Pitfalls": "Sık Yapılan Java Hataları ve Tuzaklar",
    "Java Pitfalls - Exception usage": "Java Tuzakları - Exception Kullanım Hataları",
    "Java Pitfalls - Language syntax": "Java Tuzakları - Dil Sözdizimi Hataları",
    "Java Pitfalls - Threads and Concurrency": "Java Tuzakları - Thread ve Concurrency Hataları",
    "Java Pitfalls - Nulls and NullPointerException": "Java Tuzakları - Null ve NPE Hataları",
    "Java Pitfalls - Performance Issues": "Java Tuzakları - Performans Sorunları",
    "File I/O": "Dosya Giriş/Çıkış İşlemleri",
    "Stream API": "Stream API (Akış İşlemleri - Java 8+)",
    "Collections Loop": "Koleksiyon Döngüleri ve Eleme Yöntemleri"
};

// English titles for chapters 12-181 (from original TOC — used in EN sidebar mode)
const CHAPTER_EN_TITLES = {
    12: "StringBuffer", 13: "StringBuilder", 14: "String Tokenizer",
    15: "Splitting a string into fixed length parts", 16: "Date Class",
    17: "Dates and Time (java.time.*)", 18: "LocalTime", 19: "BigDecimal",
    20: "BigInteger", 21: "NumberFormat", 22: "Bit Manipulation", 23: "Arrays",
    24: "Collections", 25: "Lists", 26: "Sets", 27: "List vs Set", 28: "Maps",
    29: "LinkedHashMap", 30: "WeakHashMap", 31: "SortedMap",
    32: "TreeMap and TreeSet", 33: "Queues and Deques", 34: "Dequeue Interface",
    35: "Enums", 36: "Enum Map", 37: "EnumSet class",
    38: "Enum starting with number", 39: "Hashtable", 40: "Operators",
    41: "Constructors", 42: "Object Class Methods and Constructor",
    43: "Annotations", 44: "Immutable Class", 45: "Immutable Objects",
    46: "Visibility (controlling access to members of a class)", 47: "Generics",
    48: "Classes and Objects", 49: "Local Inner Class",
    50: "Nested and Inner Classes", 51: "The java.util.Objects Class",
    52: "Default Methods", 53: "Packages", 54: "Inheritance",
    55: "Reference Types", 56: "Console I/O", 57: "Streams",
    58: "InputStreams and OutputStreams", 59: "Readers and Writers",
    60: "Preferences", 61: "Collection Factory Methods",
    62: "Alternative Collections", 63: "Concurrent Collections",
    64: "Choosing Collections", 65: "super keyword", 66: "Serialization",
    67: "Optional", 68: "Object References",
    69: "Exceptions and exception handling",
    70: "Calendar and its Subclasses", 71: "Using the static keyword",
    72: "Properties Class", 73: "Lambda Expressions",
    74: "Basic Control Structures", 75: "BufferedWriter", 76: "New File I/O",
    77: "File I/O", 78: "Scanner", 79: "Interfaces", 80: "Regular Expressions",
    81: "Comparable and Comparator", 82: "Java Floating Point Operations",
    83: "Currency and Money", 84: "Object Cloning", 85: "Recursion",
    86: "Converting to and from Strings", 87: "Random Number Generation",
    88: "Singletons", 89: "Autoboxing", 90: "2D Graphics in Java",
    91: "JAXB", 92: "Class - Java Reflection", 93: "Networking",
    94: "NIO - Networking", 95: "HttpURLConnection", 96: "JAX-WS",
    97: "Nashorn JavaScript engine", 98: "Java Native Interface",
    99: "Functional Interfaces", 100: "Fluent Interface",
    101: "Remote Method Invocation (RMI)", 102: "Iterator and Iterable",
    103: "Reflection API", 104: "ByteBuffer", 105: "Applets",
    106: "Expressions", 107: "JSON in Java",
    108: "XML Parsing using the JAXP APIs", 109: "XML XPath Evaluation",
    110: "XOM - XML Object Model", 111: "Polymorphism", 112: "Encapsulation",
    113: "Java Agents", 114: "Varargs (Variable Argument)",
    115: "Logging (java.util.logging)", 116: "log4j / log4j2",
    117: "Oracle Official Code Standard", 118: "Character encoding",
    119: "Apache Commons Lang", 120: "Localization and Internationalization",
    121: "Parallel programming with Fork/Join framework",
    122: "Non-Access Modifiers", 123: "Process", 124: "Java Native Access",
    125: "Modules", 126: "Concurrent Programming (Threads)",
    127: "Executor, ExecutorService and Thread pools", 128: "ThreadLocal",
    129: "Using ThreadPoolExecutor in MultiThreaded applications",
    130: "Common Java Pitfalls", 131: "Java Pitfalls - Exception usage",
    132: "Java Pitfalls - Language syntax",
    133: "Java Pitfalls - Threads and Concurrency",
    134: "Java Pitfalls - Nulls and NullPointerException",
    135: "Java Pitfalls - Performance Issues", 136: "ServiceLoader",
    137: "Classloaders", 138: "Creating Images Programmatically",
    139: "Atomic Types", 140: "RSA Encryption", 141: "Secure objects",
    142: "Security & Cryptography", 143: "Security & Cryptography (JCE)",
    144: "SecurityManager", 145: "JNDI", 146: "sun.misc.Unsafe",
    147: "Java Memory Model", 148: "Java deployment",
    149: "Java plugin system implementations", 150: "JavaBean",
    151: "Java SE 7 Features", 152: "Java SE 8 Features",
    153: "Dynamic Method Dispatch", 154: "Generating Java Code",
    155: "JShell", 156: "Stack-Walking API", 157: "Sockets",
    158: "Java Sockets", 159: "FTP (File Transfer Protocol)",
    160: "Using Other Scripting Languages in Java", 161: "C++ Comparison",
    162: "Audio", 163: "Java Print Service", 164: "CompletableFuture",
    165: "Runtime Commands", 166: "Unit Testing", 167: "Asserting",
    168: "Multi-Release JAR Files", 169: "Just in Time (JIT) compiler",
    170: "Bytecode Modification", 171: "Disassembling and Decompiling",
    172: "JMX", 173: "Java Virtual Machine (JVM)", 174: "XJC",
    175: "JVM Flags", 176: "JVM Tool Interface", 177: "Java Memory Management",
    178: "Java Performance Tuning", 179: "Benchmarks",
    180: "FileUpload to AWS",
    181: "AppDynamics and TIBCO BusinessWorks Instrumentation"
};

// Get bilingual chapter label
function getChapterLabel(title, lang) {
    if (lang === 'tr') {
        const trTitle = CHAPTER_TRANSLATIONS[title];
        return trTitle ? `${trTitle} (${title})` : title;
    }
    return title;
}

// --- Document Logic Parser ---
function parseMarkdownDocument(text) {
    const lines = text.split('\n');
    const parsedChapters = [];
    let currentChapter = null;
    let currentSection = null;

    const shouldCleanLine = (line) => {
        const trimmed = line.trim();
        return trimmed.includes('GoalKicker.com') || 
               trimmed.includes('Notes for Professionals') || 
               trimmed.includes('web@petercv.com') || 
               trimmed.includes('feedback and corrections');
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (shouldCleanLine(line)) continue;

        // Match Chapter Header (e.g. **Chapter 1: Getting started**)
        const chapterMatch = line.match(/^\s*(?:\*\*|)?Chapter\s+(\d+)\s*:\s*(.*?)(?:\*\*|)?\s*$/i);
        if (chapterMatch && !line.includes('...')) {
            const num = parseInt(chapterMatch[1], 10);
            const title = chapterMatch[2].replace(/[\*\s]+$/, '').trim();
            currentChapter = {
                id: num,
                title: title,
                sections: [],
                content: [],
                startIndex: i
            };
            parsedChapters.push(currentChapter);
            currentSection = null;
            continue;
        }

        // Match Section Header (e.g. **Section 1.1: Hello**)
        const sectionMatch = line.match(/^\s*(?:\*\*|)?Section\s+(\d+\.\d+)\s*:\s*(.*?)(?:\*\*|)?\s*$/i);
        if (sectionMatch && !line.includes('...') && currentChapter) {
            const numStr = sectionMatch[1];
            const title = sectionMatch[2].replace(/[\*\s]+$/, '').trim();
            currentSection = {
                id: numStr,
                title: title,
                content: [],
                startIndex: i
            };
            currentChapter.sections.push(currentSection);
            continue;
        }

        // Append line content
        if (currentSection) {
            currentSection.content.push(line);
        } else if (currentChapter) {
            currentChapter.content.push(line);
        }
    }
    return parsedChapters;
}

// Group lines into semantic blocks (text, code, headers, etc.)
function groupLinesIntoBlocks(lines) {
    const blocks = [];
    let i = 0;

    const isCodeLine = (line) => {
        const trimmed = line.trim();
        if (!trimmed) return false;

        // Starts/ends check for Java Code
        if (trimmed.endsWith(';') || trimmed.endsWith('{') || trimmed.endsWith('}') ||
            trimmed.startsWith('import ') || trimmed.startsWith('package ') ||
            trimmed.startsWith('@Override') || trimmed.startsWith('public ') ||
            trimmed.startsWith('private ') || trimmed.startsWith('protected ') ||
            trimmed.startsWith('class ') || trimmed.startsWith('interface ') ||
            trimmed.startsWith('enum ') || trimmed.startsWith('@Test')) {
            return true;
        }

        // Common Java commands or syntax
        if (trimmed.includes('System.out.print') || trimmed.includes('new ') ||
            trimmed.includes('String[]') || trimmed.includes('List<') ||
            trimmed.includes('Map<') || trimmed.includes('//') ||
            trimmed.includes('/*') || trimmed.startsWith('* ')) {
            if (trimmed.startsWith('//') || trimmed.startsWith('/*')) return true;
        }

        // Indentation checks
        if (line.startsWith(' ') && (trimmed.includes('(') || trimmed.includes(')') || trimmed.includes('='))) {
            return true;
        }
        return false;
    };

    const isBoldHeader = (line) => {
        const trimmed = line.trim();
        return trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 100 && !trimmed.includes(';');
    };

    const cleanCodeLine = (l) => {
        return l
            .replace(/\*\*/g, '')
            .replace(/\*(.*?)\*/g, '$1');
    };

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) {
            i++;
            continue;
        }

        // ``` code fence support (explicit block)
        if (trimmed.startsWith('```')) {
            const codeLines = [];
            i++; // skip opening fence
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            i++; // skip closing fence
            if (codeLines.length > 0) {
                blocks.push({ type: 'code', lines: codeLines });
            }
            continue;
        }

        if (isBoldHeader(line)) {
            blocks.push({ type: 'header', text: trimmed.replace(/\*\*/g, '') });
            i++;
            continue;
        }

        if (isCodeLine(line)) {
            const codeLines = [cleanCodeLine(line)];
            i++;

            while (i < lines.length) {
                const nextLine = lines[i];
                const nextTrimmed = nextLine.trim();

                if (!nextTrimmed) {
                    // Peek ahead
                    let j = i + 1;
                    let foundCodeAfter = false;
                    while (j < lines.length) {
                        const peekLine = lines[j];
                        if (peekLine.trim()) {
                            if (isCodeLine(peekLine)) {
                                foundCodeAfter = true;
                            }
                            break;
                        }
                        j++;
                    }
                    if (foundCodeAfter) {
                        codeLines.push(nextLine); // Keep empty line inside code structure
                        i++;
                    } else {
                        break;
                    }
                } else if (isCodeLine(nextLine)) {
                    codeLines.push(cleanCodeLine(nextLine));
                    i++;
                } else if (isBoldHeader(nextLine)) {
                    break;
                } else {
                    // Peek ahead to see if code resumes shortly (max 3 lines)
                    let j = i + 1;
                    let foundCodeAfter = false;
                    while (j < lines.length && j < i + 3) {
                        const peekLine = lines[j];
                        if (peekLine.trim()) {
                            if (isCodeLine(peekLine)) {
                                foundCodeAfter = true;
                            }
                            break;
                        }
                        j++;
                    }
                    if (foundCodeAfter) {
                        codeLines.push(cleanCodeLine(nextLine));
                        i++;
                    } else {
                        break;
                    }
                }
            }
            blocks.push({ type: 'code', lines: codeLines });
        } else {
            const textLines = [line];
            i++;

            while (i < lines.length) {
                const nextLine = lines[i];
                const nextTrimmed = nextLine.trim();

                if (!nextTrimmed) {
                    break;
                }
                if (isBoldHeader(nextLine) || isCodeLine(nextLine)) {
                    break;
                }
                textLines.push(nextLine);
                i++;
            }
            blocks.push({ type: 'text', lines: textLines });
        }
    }
    return blocks;
}

export default function JavaDocPage() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved !== null ? JSON.parse(saved) : true
    })
    const { language, t, toggleLanguage } = useLanguage()
    const navigate = useNavigate()

    const [trChapters, setTrChapters] = useState([])
    const [enChapters, setEnChapters] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeChapterIndex, setActiveChapterIndex] = useState(0)
    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedChapters, setExpandedChapters] = useState({ 0: true })
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // TR file = all 181 chapters (always sidebar source)
    // EN file = chapters 1-11 with EN content
    // Merged: EN mode → EN content for 1-11, TR structure + EN title for 12-181
    const chapters = useMemo(() => {
        if (trChapters.length === 0) return [];
        if (language === 'tr') return trChapters;
        return trChapters.map(trChap => {
            if (trChap.id <= 11) {
                const enChap = enChapters.find(c => c.id === trChap.id);
                if (enChap) return enChap;
            }
            // Chapters 12-181: keep TR content but use EN title for sidebar/header
            const enTitle = CHAPTER_EN_TITLES[trChap.id];
            return enTitle ? { ...trChap, title: enTitle } : trChap;
        });
    }, [trChapters, enChapters, language]);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    // Load both files once on mount
    useEffect(() => {
        setLoading(true);
        const clean = text => text.replace(/\\(!|\[|\]|=|\+|>|<|-|&|'|")/g, '$1');
        Promise.all([
            fetch('/documents/JavaNotesForProfessionals_tr.md').then(r => r.text()),
            fetch('/documents/JavaNotesForProfessionals.md').then(r => r.text())
        ]).then(([trText, enText]) => {
            setTrChapters(parseMarkdownDocument(clean(trText)));
            setEnChapters(parseMarkdownDocument(clean(enText)));
            setLoading(false);
        }).catch(err => {
            console.error('Error loading Java documents', err);
            setLoading(false);
        });
    }, [])

    // Reset navigation when language changes
    useEffect(() => {
        setActiveChapterIndex(0);
        setActiveSectionIndex(0);
        setExpandedChapters({ 0: true });
        setSearchQuery('');
    }, [language])

    const toggleChapterExpand = (idx, e) => {
        e.stopPropagation();
        setExpandedChapters(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    }

    const selectChapter = (idx) => {
        setActiveChapterIndex(idx);
        const chap = chapters[idx];
        if (chap && chap.sections.length > 0) {
            setActiveSectionIndex(0); // Default to first section
        } else {
            setActiveSectionIndex(-1);
        }
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const selectSection = (cIdx, sIdx) => {
        setActiveChapterIndex(cIdx);
        setActiveSectionIndex(sIdx);
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Search results computation
    const searchResults = useMemo(() => {
        if (!searchQuery || !searchQuery.trim()) return null;
        const q = searchQuery.toLowerCase().trim();
        const results = [];

        chapters.forEach((chap, cIdx) => {
            // Match in chapter title
            const chapterMatch = chap.title.toLowerCase().includes(q) || 
                                 getChapterLabel(chap.title, 'tr').toLowerCase().includes(q);
            
            if (chapterMatch) {
                results.push({
                    type: 'chapter',
                    chapterIndex: cIdx,
                    title: chap.title,
                    label: `Chapter ${chap.id}: ${getChapterLabel(chap.title, language)}`
                });
            }

            // Match in sections
            chap.sections.forEach((sec, sIdx) => {
                const sectionTitleMatch = sec.title.toLowerCase().includes(q);
                const contentMatch = sec.content.some(line => line.toLowerCase().includes(q));

                if (sectionTitleMatch || contentMatch) {
                    results.push({
                        type: 'section',
                        chapterIndex: cIdx,
                        sectionIndex: sIdx,
                        title: sec.title,
                        label: `Section ${sec.id}: ${sec.title}`,
                        chapterLabel: `Chapter ${chap.id}: ${getChapterLabel(chap.title, language)}`,
                        snippet: contentMatch 
                            ? sec.content.find(line => line.toLowerCase().includes(q)).trim() 
                            : ''
                    });
                }
            });
        });

        return results;
    }, [searchQuery, chapters, language])

    // Compute active content
    const activeContentBlocks = useMemo(() => {
        if (chapters.length === 0) return [];
        const activeChapter = chapters[activeChapterIndex];
        if (!activeChapter) return [];

        if (activeSectionIndex === -1) {
            // Main chapter intro blocks
            return groupLinesIntoBlocks(activeChapter.content);
        } else {
            // Specific section blocks
            const activeSection = activeChapter.sections[activeSectionIndex];
            return activeSection ? groupLinesIntoBlocks(activeSection.content) : [];
        }
    }, [chapters, activeChapterIndex, activeSectionIndex])

    const activeTitle = useMemo(() => {
        if (chapters.length === 0) return '';
        const chap = chapters[activeChapterIndex];
        if (activeSectionIndex === -1) {
            return `Chapter ${chap.id}: ${getChapterLabel(chap.title, language)}`;
        } else {
            const sec = chap.sections[activeSectionIndex];
            return sec ? `Section ${sec.id}: ${sec.title}` : '';
        }
    }, [chapters, activeChapterIndex, activeSectionIndex, language])

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50 text-gray-800'}`}>
            <ScrollProgressBar />
            <HomeButton />

            {/* Custom Header */}
            <header className={`sticky top-0 z-50 shadow-md border-b transition-all duration-300 backdrop-blur-md ${darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
                <div className="container mx-auto px-4 py-3.5 flex justify-between items-center gap-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/java')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 hover:scale-105 ${darkMode
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                            }`}
                        >
                            ← {language === 'tr' ? 'Java Rehberine Dön' : 'Back to Java Page'}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`md:hidden p-2 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-gray-100 text-gray-700'}`}
                        >
                            📋 {language === 'tr' ? 'Bölümler' : 'Index'}
                        </button>
                    </div>

                    <div className="flex gap-2.5 items-center">
                        {/* Language Selection */}
                        <div className={`flex rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                            <button
                                onClick={() => language === 'tr' && toggleLanguage()}
                                className={`border-none px-3 py-1.5 text-xs font-bold transition-all duration-300 ${language === 'en' ? 'bg-orange-600 text-white' : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            >
                                ENG
                            </button>
                            <button
                                onClick={() => language === 'en' && toggleLanguage()}
                                className={`border-none px-3 py-1.5 text-xs font-bold transition-all duration-300 ${language === 'tr' ? 'bg-orange-600 text-white' : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            >
                                TR
                            </button>
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`border-none px-3 py-1.5 rounded-lg font-bold text-xs md:text-sm transition-all duration-300 ${darkMode
                                ? 'bg-yellow-400 text-gray-950 hover:bg-yellow-300'
                                : 'bg-gray-900 text-white hover:bg-gray-800'
                            }`}
                        >
                            {darkMode ? `☀️` : `🌙`}
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="flex gap-6 items-start relative">
                    
                    {/* Collapsible Sidebar (TOC) */}
                    <aside className={`
                        flex-shrink-0 w-80 rounded-2xl p-4 shadow-xl border transition-all duration-300
                        md:sticky md:top-20 md:block max-h-[80vh] overflow-y-auto z-40
                        ${mobileMenuOpen ? 'fixed inset-y-0 left-0 top-16 w-80 block bg-slate-900/95 md:bg-transparent backdrop-blur-md' : 'hidden'}
                        ${darkMode 
                            ? 'bg-gray-800/90 border-gray-700/80 scrollbar-dark' 
                            : 'bg-white/95 border-orange-200/60 scrollbar-light'
                        }
                    `}>
                        {/* Search Box */}
                        <div className="mb-4 relative">
                            <input
                                type="text"
                                placeholder={language === 'tr' ? "Bölüm veya konu ara..." : "Search chapters, sections..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none transition-all duration-200 ${darkMode
                                    ? 'bg-gray-950 border-gray-700 text-white focus:border-orange-500'
                                    : 'bg-orange-50/30 border-orange-200 text-gray-800 focus:border-orange-500'
                                }`}
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200 text-sm font-bold border-none bg-transparent cursor-pointer"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Search Results / Chapters Accordion */}
                        {searchQuery ? (
                            <div className="space-y-2">
                                <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2 px-1">
                                    {language === 'tr' ? 'Arama Sonuçları' : 'Search Results'} ({searchResults?.length || 0})
                                </div>
                                {searchResults && searchResults.length > 0 ? (
                                    <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                                        {searchResults.map((res, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    if (res.type === 'chapter') selectChapter(res.chapterIndex);
                                                    else selectSection(res.chapterIndex, res.sectionIndex);
                                                }}
                                                className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${darkMode
                                                    ? 'bg-transparent hover:bg-slate-900 border-gray-700/50'
                                                    : 'bg-transparent hover:bg-orange-50/50 border-orange-100'
                                                }`}
                                            >
                                                <div className="font-bold text-orange-500">{res.label}</div>
                                                {res.chapterLabel && (
                                                    <div className="text-[10px] text-gray-400 mt-0.5">{res.chapterLabel}</div>
                                                )}
                                                {res.snippet && (
                                                    <div className="text-[10px] text-gray-500 mt-1 italic line-clamp-2" dangerouslySetInnerHTML={{ __html: highlightText(res.snippet, searchQuery) }} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-xs text-gray-500 text-center py-4">
                                        {language === 'tr' ? 'Sonuç bulunamadı.' : 'No results found.'}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-1 max-h-[68vh] overflow-y-auto pr-1">
                                {chapters.map((chap, cIdx) => {
                                    const isChapterActive = activeChapterIndex === cIdx;
                                    const isExpanded = expandedChapters[cIdx];
                                    return (
                                        <div key={chap.id} className="mb-1">
                                            <div
                                                onClick={() => selectChapter(cIdx)}
                                                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${isChapterActive
                                                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold shadow'
                                                    : darkMode ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-orange-50/50 text-gray-700'
                                                }`}
                                            >
                                                <span className="text-xs truncate flex-1 leading-snug">
                                                    {chap.id}. {getChapterLabel(chap.title, language)}
                                                </span>
                                                {chap.sections.length > 0 && (
                                                    <button
                                                        onClick={(e) => toggleChapterExpand(cIdx, e)}
                                                        className="border-none bg-transparent p-1 ml-1 rounded hover:bg-black/10 text-xs transition-transform duration-200 cursor-pointer"
                                                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
                                                    >
                                                        ▼
                                                    </button>
                                                )}
                                            </div>

                                            {isExpanded && chap.sections.length > 0 && (
                                                <div className="pl-4 mt-1 space-y-0.5 border-l border-orange-500/25 ml-2">
                                                    {chap.sections.map((sec, sIdx) => {
                                                        const isSecActive = isChapterActive && activeSectionIndex === sIdx;
                                                        return (
                                                            <button
                                                                key={sec.id}
                                                                onClick={() => selectSection(cIdx, sIdx)}
                                                                className={`w-full text-left p-1.5 rounded-lg text-[11px] transition-all truncate block cursor-pointer border-none bg-transparent ${isSecActive
                                                                    ? 'text-orange-500 font-bold bg-orange-500/10'
                                                                    : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'
                                                                }`}
                                                            >
                                                                {sec.id} {sec.title}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-grow min-w-0">
                        {loading ? (
                            <div className={`p-6 md:p-8 rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'}`}>
                                <SkeletonLoader darkMode={darkMode} />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                
                                {/* Info Banner */}
                                <div className={`p-4 rounded-xl border flex gap-3 items-start ${darkMode ? 'bg-orange-950/20 border-orange-900/60 text-orange-200' : 'bg-orange-50/50 border-orange-200 text-orange-800'}`}>
                                    <span className="text-lg">💡</span>
                                    <div className="text-xs leading-relaxed">
                                        {language === 'tr' ? (
                                            <p>
                                                <strong>Not:</strong> Java referans dokümanının içeriği, konu indeksleri ve açıklamaları Türkçe dil seçeneğinde <strong>Türkçe</strong> olarak sunulmaktadır. Teknik bütünlüğü ve standartları korumak amacıyla yalnızca kod blokları orijinal Java formatında bırakılmıştır.
                                            </p>
                                        ) : (
                                            <p>
                                                <strong>Tip:</strong> The Java reference document content, indexes, and explanations are fully localized when <strong>English</strong> language is active. Code blocks are kept in their original Java format to maintain technical accuracy.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Active Chapter Content */}
                                <div className={`p-6 md:p-10 rounded-2xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700/80' : 'bg-white border-orange-100/80'}`}>
                                    <h1 className={`text-xl md:text-3xl font-extrabold mb-6 pb-4 border-b ${darkMode ? 'text-white border-gray-700' : 'text-gray-900 border-orange-100'}`}>
                                        {activeTitle}
                                    </h1>

                                    <div className="space-y-4">
                                        {activeContentBlocks.length > 0 ? (
                                            activeContentBlocks.map((block, bIdx) => {
                                                if (block.type === 'header') {
                                                    return (
                                                        <h3 
                                                            key={bIdx} 
                                                            className={`text-base md:text-lg font-bold mt-6 mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                                                            dangerouslySetInnerHTML={{ __html: highlightText(block.text, searchQuery) }}
                                                        />
                                                    );
                                                } else if (block.type === 'code') {
                                                    return (
                                                        <CodeBlock 
                                                            key={bIdx} 
                                                            code={block.lines.join('\n')} 
                                                            darkMode={darkMode} 
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <div key={bIdx} className="space-y-2">
                                                            {block.lines.map((line, lIdx) => (
                                                                <p 
                                                                    key={lIdx} 
                                                                    className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                                                    dangerouslySetInnerHTML={{ __html: parseFormatting(line, darkMode, searchQuery) }}
                                                                />
                                                            ))}
                                                        </div>
                                                    );
                                                }
                                            })
                                        ) : (
                                            <div className="text-sm text-gray-500 italic py-6 text-center">
                                                {language === 'tr' ? 'Bu bölümün alt detaylarını görmek için sol taraftaki alt bölümlerden (Section) birine tıklayınız.' : 'Click on one of the sections on the left side to view the details.'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    )
}
